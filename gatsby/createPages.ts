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
            allMdx(
                sort: { order: DESC, fields: frontmatter___date }
                limit: 1000
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            slug
                        }
                    }
                    next {
                        id
                    }
                    previous {
                        id
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

    const posts = result.data.allMdx.edges;

    if (posts.length > 0) {
        posts.forEach((post: any, index: number) => {
            const postId = post.node.id;
            const slug = post.node.frontmatter.slug;

            const previousPostId = post.previous?.id;
            const nextPostId = post.next?.id;

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
