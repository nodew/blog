--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid (mappend)
import           Hakyll


--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
    match "src/images/*" $ do
        route $ gsubRoute "src/" (const "")
        compile copyFileCompiler

    match "src/css/*" $ do
        route $ gsubRoute "src/" (const "")
        compile compressCssCompiler

    tags <- buildTags "posts/**" (fromCapture "tags/*.html")
    categories <- buildCategories "post/**" (fromCapture "categories/*.html")

    tagsRules tags $ \tag pattern -> do
        let title = "Posts tagged \"" ++ tag ++ "\""
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll pattern
            let ctx = constField "title" title
                        `mappend` listField "posts" (postCtx' categories tags) (return posts)
                        `mappend` defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "src/templates/tag.html" ctx
                >>= loadAndApplyTemplate "src/templates/default.html" ctx
                >>= relativizeUrls

    tagsRules categories $ \tag pattern -> do
        let title = "Posts tagged \"" ++ tag ++ "\""
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll pattern
            let ctx = constField "title" title
                        `mappend` listField "posts" (postCtx' categories tags) (return posts)
                        `mappend` defaultContext

            makeItem ""
                >>= loadAndApplyTemplate "src/templates/tag.html" ctx
                >>= loadAndApplyTemplate "src/templates/default.html" ctx
                >>= relativizeUrls

    match "posts/**" $ do
        route $ setExtension "html"
        -- build up tags
        compile $ pandocCompiler
            >>= loadAndApplyTemplate (getTpl "post") (postCtx' categories tags)
            >>= loadAndApplyTemplate (getTpl "default") (postCtx' categories tags)


    match (fromList ["src/pages/about.rst", "src/pages/contact.markdown"]) $ do
        route $ gsubRoute "src/pages/" (const "") `composeRoutes` setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate (getTpl "default") defaultContext
            >>= relativizeUrls

    create ["archive.html"] $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/**"
            let archiveCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Archives"            `mappend`
                    defaultContext

            makeItem ""
                >>= loadAndApplyTemplate (getTpl "archive") archiveCtx
                >>= loadAndApplyTemplate (getTpl "default") archiveCtx
                >>= relativizeUrls


    match "src/pages/index.html" $ do
        route $ gsubRoute "src/pages/" $ const ""
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
            let indexCtx =
                    listField "posts" postCtx (return posts) `mappend`
                    constField "title" "Home"                `mappend`
                    defaultContext

            getResourceBody
                >>= applyAsTemplate indexCtx
                >>= loadAndApplyTemplate (getTpl "default") indexCtx
                >>= relativizeUrls

    match "src/templates/*" $ compile templateCompiler


--------------------------------------------------------------------------------
postCtx :: Context String
postCtx =
    dateField "date" "%B %e, %Y" `mappend`
    defaultContext

postCtx' :: Tags -> Tags -> Context String
postCtx' categories tags = postCtxWithCategories categories `mappend`
                           postCtxWithTags tags             `mappend`
                           postCtx

postCtxWithTags :: Tags -> Context String
postCtxWithTags tags = tagsField "tags" tags

postCtxWithCategories :: Tags -> Context String
postCtxWithCategories categories = categoryField "categories" categories

getTpl :: String -> Identifier
getTpl name = fromFilePath $ "src/templates/" ++ name ++ ".html"
