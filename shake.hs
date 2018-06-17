#!/usr/bin/env stack
-- stack --resolver lts-10.4 script

import Development.Shake
import Development.Shake.Command
import Development.Shake.FilePath
import Development.Shake.Util
import System.Console.GetOpt
import Data.Maybe
import Data.Either

newtype Flags = Flags { message :: String } deriving (Eq, Show)

options :: [OptDescr (Either String Flags)]
options = [ Option
            ['m']
            ["message"]
            (OptArg
                ((\m -> if null m
                            then Left "empty"
                            else Right $ Flags m
                    ) . fromMaybe "")
                "MESSAGE")
            "commit message"
        ]

main = shakeArgsWith shakeOptions options $ \opts targets -> return $ Just $ do
    want $ if null targets then ["build"] else targets

    phony "clean" $ cmd_ "stack exec site clean"

    phony "build" $ do
        need ["build-exe"]
        need ["clean"]
        need ["build-static"]
        cmd_ "stack exec site build"

    phony "build-static" $ cmd_ "npm run build"

    phony "build-exe" $ cmd_ "stack build"

    phony "publish" $ do
        cmd_ ["git", "checkout", "gh-pages"]
        cmd_ "cp -r _site/* ./"
        cmd_ ["git add", "."]
        cmd_ ["git commit", "-m"] [message opts]
        cmd_ "git push origin gh-pages"
        cmd_ "git checkout master"

