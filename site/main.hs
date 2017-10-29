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

    match "posts/*" $ do
        route $ setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate (getTpl "post")    postCtx
            >>= loadAndApplyTemplate (getTpl "default") postCtx

    match (fromList ["src/pages/about.rst", "src/pages/contact.markdown"]) $ do
        route $ gsubRoute "src/pages/" (const "") `composeRoutes` setExtension "html"
        compile $ pandocCompiler
            >>= loadAndApplyTemplate (getTpl "default") defaultContext
            >>= relativizeUrls
            >>= relativizeUrls

    create ["archive.html"] $ do
        route idRoute
        compile $ do
            posts <- recentFirst =<< loadAll "posts/*"
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

getTpl :: String -> Identifier
getTpl name = fromFilePath $ "src/templates/" ++ name ++ ".html"