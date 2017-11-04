{-# LANGUAGE OverloadedStrings #-}
module BlogRules (
  matchImages
, matchJs
, matchCss
, matchPosts
, matchTemplates
, getTags
, getCategories
, buildUpCategories
, buildUpTags
, buildStaticPages
, createArchives
, createHomePage
) where

import Hakyll hiding (getTags)

imagesGlob :: Pattern
imagesGlob = fromGlob "images/*"

jsGlob :: Pattern
jsGlob = fromGlob "js/*"

cssGlob :: Pattern
cssGlob = fromGlob "css/*"

postsGlob :: Pattern
postsGlob = fromGlob "posts/**"

templatesGlob :: Pattern
templatesGlob = fromGlob "templates/*"

matchStatic :: Pattern -> Rules ()
matchStatic glob = match glob $ do
  route $ idRoute
  compile copyFileCompiler

matchImages :: Rules ()
matchImages = matchStatic imagesGlob

matchJs :: Rules ()
matchJs = matchStatic jsGlob

matchCss :: Rules ()
matchCss = match cssGlob $ do
  route $ idRoute
  compile compressCssCompiler

matchTemplates :: Rules ()
matchTemplates = match templatesGlob $ compile templateBodyCompiler

matchPosts :: Tags -> Tags -> Rules ()
matchPosts tags categories = match postsGlob $ do
  route $ setExtension "html"
  compile $ pandocCompiler
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
  compile $ do
      posts <- recentFirst =<< loadAll pattern
      let ctx = constField "tag" tag
              `mappend` constField "type" collectionType
              `mappend` listField "posts" postCtx (return posts)
              `mappend` defaultContext
      makeItem ""
        >>= loadAndApplyTemplate "templates/tag.html" ctx
        >>= loadAndApplyTemplate "templates/default.html" ctx
        >>= relativizeUrls

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
    identifiers = map (fromFilePath . (++ prefix)) xs

createArchives :: Rules ()
createArchives = create ["archive.html"] $ do
  route idRoute
  compile $ do
      posts <- recentFirst =<< loadAll "posts/**"
      let archiveCtx =
              listField "posts" postCtx (return posts) `mappend`
              constField "title" "Archives"            `mappend`
              defaultContext

      makeItem ""
          >>= loadAndApplyTemplate "templates/archive.html" archiveCtx
          >>= loadAndApplyTemplate "templates/default.html" archiveCtx
          >>= relativizeUrls

createHomePage :: Rules ()
createHomePage = match "pages/index.html" $ do
    route $ gsubRoute "pages/" $ const ""
    compile $ do
        posts <- recentFirst =<< loadAll postsGlob
        let indexCtx =
                listField "posts" postCtx (return posts) `mappend`
                constField "title" "Home"                `mappend`
                defaultContext

        getResourceBody
            >>= applyAsTemplate indexCtx
            >>= loadAndApplyTemplate "templates/default.html" indexCtx
            >>= relativizeUrls

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