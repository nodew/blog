import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        siteUrl: `https://wangqiao.me`,
        title: "Qiao Wang",
        author: {
            name: "Qiao Wang",
            bio: "谁非过客，花是主人",
            email: "wangqiao11@hotmail.com"
        },
        social: {
            twitter: `wangqiao11`,
            github: `nodew`
        }
    },
    graphqlTypegen: true,
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `pages`,
              path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `posts`,
              path: `${__dirname}/posts`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.md`, `.mdx`],
            },
        },
        {
            resolve: `gatsby-plugin-typegen`,
            options: {
                outputPath: 'src/__generated__/gatsby-types.d.ts',
                emitSchema: {
                    'src/__generated__/gatsby-introspection.json': true,
                    'src/__generated__/gatsby-schema.graphql': true,
                },
                emitPluginDocument: {
                    'src/__generated__/gatsby-plugin-documents.graphql': true,
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-remark-prismjs`,
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-122703565-1",
                head: false,
                anonymize: true,
                respectDNT: true,
                exclude: [],
                pageTransitionDelay: 300,
                defer: false,
                sampleRate: 5,
                siteSpeedSampleRate: 10,
                cookieDomain: "wangqiao.me",
                enableWebVitalsTracking: true,
            },
        },
    ],
};

export default config;
