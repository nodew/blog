--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid (mappend)
import           Hakyll hiding (getTags)

import           BlogRules
--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
    matchImages
    matchJs
    matchCss
    tags <- getTags "tags/*.html"
    categories <- getCategories "categories/*.html"
    buildUpTags tags
    buildUpCategories categories
    matchPosts tags categories
    buildStaticPages ["about.rst", "contact.markdown", "404.md"]
    createArchives
    createHomePage
    matchTemplates