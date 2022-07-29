import _ from "lodash";
import path from "path";

export const createPages = async ({ graphql, actions, reporter }) => {
    await createPostItemPage({ graphql, actions, reporter });
    await createTaggedListPage({ graphql, actions, reporter });
};

const createPostItemPage = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query PostItems {
            allFile(
                sort: { order: DESC, fields: childMdx___frontmatter___date }
                filter: { sourceInstanceName: { eq: "posts" } }
            ) {
                edges {
                    node {
                        childMdx {
                            id
                            frontmatter {
                                date
                                slug
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
                component: path.resolve(`./src/templates/post-template.tsx`),
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
                group(field: frontmatter___tags) {
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
            component: path.resolve("./src/templates/tag-template.tsx"),
            context: {
                tag: tag.fieldValue,
            },
        });
    });
};
