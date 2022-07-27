import React from "react";
import { graphql, useStaticQuery } from "gatsby";

export const Footer = () => {
    const year = new Date().getFullYear();
    const { site } = useStaticQuery<GatsbyTypes.SiteAuthorQuery>(
        graphql`
            query SiteAuthor {
                site {
                    siteMetadata {
                        author {
                            name
                        }
                    }
                }
            }
        `
    );

    const name = site?.siteMetadata?.author?.name || "";

    return (
        <footer className="text-base mt-32 text-gray-400 dark:text-gray-600">
            <div className="max-w-5xl text-center m-auto">
                <p>
                    {name} © {year}, powered by
                    {` `}
                    <a
                        className="text-blue-400 hover:text-blue-800"
                        href="https://www.gatsbyjs.com"
                    >
                        Gatsby
                    </a>
                </p>
            </div>
        </footer>
    );
};
