import _ from "lodash";
import path from "path";

const postTemplate = path.resolve(`./src/templates/post-template.tsx`);
const tagTemplate = path.resolve(`./src/templates/tag-template.tsx`);

export const createPages = async ({ graphql, actions, reporter }) => {
    await createPostItemPage({ graphql, actions, reporter });
    await createTaggedListPage({ graphql, actions, reporter });
};

const createPostItemPage = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query PostItems {
            allFile(
                filter: { sourceInstanceName: { eq: "posts" } }
                sort: { childMdx: { frontmatter: { date: DESC } } }
            ) {
                edges {
                    node {
                        childMdx {
                            id
                            frontmatter {
                                date
                                slug
                            }
                            internal {
                                contentFilePath
                            }
                        }
                    }
                    previous {
                        childMdx {
                            id
                        }
                    }
                    next {
                        childMdx {
                            id
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        );
        return;
    }

    const items = result.data.allFile.edges;

    if (items.length > 0) {
        items.forEach((item: any) => {
            const post = item.node.childMdx;
            const postId = post.id;
            const slug = post.frontmatter.slug;

            const previousPostId = item.previous?.childMdx?.id;
            const nextPostId = item.next?.childMdx?.id;

            createPage({
                path: `/posts/${slug}`,
                component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
                context: {
                    id: postId,
                    previousPostId,
                    nextPostId,
                },
            });
        });
    }
};

const createTaggedListPage = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query Tags {
            allMdx {
                group(field: { frontmatter: { tags: SELECT } }) {
                    fieldValue
                    totalCount
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading post tags`,
            result.errors
        );
        return;
    }

    _.each(result.data.allMdx.group, (tag) => {
        createPage({
            path: `/tags/${_.kebabCase(tag.fieldValue)}`,
            component: tagTemplate,
            context: {
                tag: tag.fieldValue,
            },
        });
    });
};
