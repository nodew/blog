import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export interface MetaProps {
    title: string;
    description?: string;
    lang?: string;
    extras?: any[];
    image?: string;
    type?: "website" | "article";
}

export const Meta = ({
    title,
    description = "",
    lang = "en",
    extras = [],
    type = "website"
}: MetaProps) => {
    const { site } = useStaticQuery<GatsbyTypes.SiteMetaQuery>(
        graphql`
            query SiteMeta {
                site {
                    siteMetadata {
                        title
                        description
                        social {
                            twitter
                        }
                    }
                }
            }
        `
    );

    const _description = description || site?.siteMetadata?.description || "";
    const defaultTitle = site?.siteMetadata?.title;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={defaultTitle ? `${defaultTitle} | %s` : undefined}
            meta={[
                {
                    name: `description`,
                    content: _description,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: _description,
                },
                {
                    property: `og:type`,
                    content: type,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site?.siteMetadata?.social?.twitter || ``,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: _description,
                },
            ].concat(extras)}
        />
    );
};
