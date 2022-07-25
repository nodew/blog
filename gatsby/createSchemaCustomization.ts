export const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type SiteSiteMetadata {
            author: Author
            siteUrl: String
            social: Social
        }

        type Author {
            name: String
            bio: String
            email: String
        }

        type Social {
            twitter: String
            github: String
        }

        type Frontmatter {
            title: String
            description: String
            date: Date @dateformat
            slug: String
            tags: [String]
            keywords: [String]
        }
    `);
};
