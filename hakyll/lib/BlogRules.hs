{-# LANGUAGE Arrows             #-}
{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE OverloadedStrings  #-}

module BlogRules (
  staticGlog
, postsGlob
, templatesGlob
, matchStatics
, matchPosts
, matchTemplates
, getTags
, getCategories
, buildUpCategories
, buildUpTags
, buildStaticPages
, createArchives
, createHomePage
, buildPagination
, createAtomXML
, createRSS
) where

import Data.Monoid (mappend, (<>))
import Hakyll hiding (getTags)

-- pageSize = 3

staticGlog :: Pattern
staticGlog = fromGlob "static_dist/**"

postsGlob :: Pattern
postsGlob = fromGlob "posts/**"

templatesGlob :: Pattern
templatesGlob = fromGlob "templates/**"

matchStatics :: Rules ()
matchStatics = match staticGlog $ do
  route $ idRoute
  compile copyFileCompiler

matchTemplates :: Rules ()
matchTemplates = match templatesGlob $ compile templateBodyCompiler

matchPosts :: Tags -> Tags -> Rules ()
matchPosts tags categories = match postsGlob $ do
  route $ setExtension "html"
  compile $ pandocCompiler
              >>= saveSnapshot "content"
              >>= loadAndApplyTemplate "templates/post.html"    (postCtxWithTags tags categories)
              >>= loadAndApplyTemplate "templates/default.html" (postCtxWithTags tags categories)
              >>= relativizeUrls

getTags :: Pattern -> Rules Tags
getTags url = buildTags postsGlob (fromCapture url)

getCategories :: Pattern -> Rules Tags
getCategories url = buildCategories postsGlob (fromCapture url)

buildUpCollections :: String -> Tags -> Rules ()
buildUpCollections collectionType tags = tagsRules tags $ \tag pattern -> do
  route idRoute
  buildPagination (collectionType <> "/") tag pattern "templates/tag.html"
    -- posts <- recentFirst =<< loadAll pattern
    -- let ctx = constField "tag" tag
    --         <> constField "type" collectionType
    --         <> listField "posts" postCtx (return posts)
    --         <> defaultContext
    -- makeItem ""
    --   >>= loadAndApplyTemplate "templates/tag.html" ctx
    --   >>= loadAndApplyTemplate "templates/default.html" ctx
    --   >>= relativizeUrls

buildUpTags :: Tags -> Rules ()
buildUpTags = buildUpCollections "tag"

buildUpCategories :: Tags -> Rules ()
buildUpCategories = buildUpCollections "category"

buildStaticPages :: [String] -> Rules ()
buildStaticPages xs = match (fromList identifiers) $ do
  route $ gsubRoute prefix (const "") `composeRoutes` setExtension "html"
  compile $ pandocCompiler
      >>= loadAndApplyTemplate "templates/default.html" defaultContext
      >>= relativizeUrls
  where
    prefix = "pages/"
    identifiers = map (fromFilePath . ((++) prefix)) xs

createArchives :: Rules ()
createArchives = create ["archive.html"] $ do
  route idRoute
  compile $ do
    posts <- recentFirst =<< loadAll postsGlob
    let archiveCtx = listField "posts" postCtx (return posts)
                  <> constField "title" "Archives"
                  <> defaultContext

    makeItem ""
      >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
      >>= loadAndApplyTemplate "templates/default.html" archiveCtx
      >>= relativizeUrls

createHomePage :: Tags -> Tags -> Rules ()
createHomePage cats tags = match "pages/index.html" $ do
    route $ gsubRoute "pages/" $ const ""
    compile $ do
      posts <- fmap (take 3) . recentFirst =<< loadAll postsGlob
      let indexCtx = listField "posts" postCtx (return posts)
                  <> constField "title" "Home"
                  <> field "tags" (\_ -> renderTagList tags)
                  <> field "categories" (\_ -> renderTagList cats)
                  <> defaultContext

      getResourceBody
        >>= applyAsTemplate indexCtx
        >>= loadAndApplyTemplate "templates/default.html" indexCtx
        >>= relativizeUrls

buildPagination :: String -> String -> Pattern -> Identifier -> Rules ()
buildPagination prefix tag glob template = do
  pages <- buildPaginateWith
            (\ids -> sortRecentFirst ids >>= return . paginateEvery 1)
            glob
            (\n ->
              if n == 1 then
                fromFilePath (prefix <> tag <> ".html")
              else
                fromCapture (fromGlob (prefix <> tag <> "/*.html")) (show n))

  paginateRules pages $ \pageNum pattern -> do
    route idRoute
    compile $ do
      posts <- recentFirst =<< loadAll pattern
      let paginateCtx = paginateContext pages pageNum
      let ctx         = constField "title" "Posts"
                      <> listField "posts" postCtx (return posts)
                      <> paginateCtx
                      <> defaultContext
      makeItem ""
        >>= loadAndApplyTemplate template ctx
        >>= loadAndApplyTemplate "templates/default.html" ctx
        >>= relativizeUrls

createFeed :: [Identifier]
           -> (FeedConfiguration
              -> Context String
              -> [Item String]
              -> Compiler (Item String))
           -> Rules ()
createFeed ids render = create ids $ do
  route idRoute
  compile $ do
    let feedCtx = postCtx <> bodyField "description"
    posts <- fmap (take 10) . recentFirst =<< loadAllSnapshots postsGlob "content"
    render feedConfiguration feedCtx posts

createAtomXML :: Rules ()
createAtomXML = createFeed ["atom.xml"] renderAtom

createRSS :: Rules ()
createRSS = createFeed ["rss.xml"] renderRss

postCtx :: Context String
postCtx = mconcat
  [ dateField "date" "%B %e, %Y"
  , constField "author" "Joe Wang"
  , defaultContext
  ]

postCtxWithTags :: Tags -> Tags -> Context String
postCtxWithTags tags cats = mconcat
  [
    tagsField "tags" tags
  , categoryField "categories" cats
  , postCtx
  ]

feedConfiguration :: FeedConfiguration
feedConfiguration = FeedConfiguration
  { feedTitle       = "wangqiao.me"
  , feedDescription = "A Blog of Joe Wang"
  , feedAuthorName  = "Joe Wang"
  , feedAuthorEmail = "wangqiao11@hotmail.com"
  , feedRoot        = "https://wangqiao.me"
  }
