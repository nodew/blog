--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Hakyll hiding (getTags)
-- import           Control.Monad.Reader
import           BlogRules
--------------------------------------------------------------------------------

main :: IO ()
main = hakyllWith config $ do
  matchStatics
  tags <- getTags "tags/*.html"
  categories <- getCategories "categories/*.html"
  buildUpTags tags
  buildUpCategories categories
  matchPosts tags categories
  buildStaticPages ["about.html", "404.html"]
  createArchives
  createHomePage categories tags
  createPostList
  matchTemplates
  createAtomXML
  createRSS

config :: Configuration
config = defaultConfiguration
  { previewPort = 8100
  }