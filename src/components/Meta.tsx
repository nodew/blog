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
    type = "website",
    image = "",
}: MetaProps) => {
    const { site } = useStaticQuery<GatsbyTypes.SiteMetaQuery>(
        graphql`
            query SiteMeta {
                site {
                    siteMetadata {
                        title
                        siteUrl
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
    let thumbnail_url = image;
    if (!!image && site?.siteMetadata?.siteUrl && !/^(http|https)/.test(image)) {
        thumbnail_url = site.siteMetadata.siteUrl + image;
    }

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={defaultTitle ? `${defaultTitle} | %s` : undefined}
            link={[{
                type: "image/png",
                rel: "icon",
                href: "/images/favicon-32x32.png",
            }]}
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
                    property: `og:image`,
                    content: thumbnail_url,
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
