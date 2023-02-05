import readingTime from "reading-time";

export const onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
        createNodeField({
            node,
            name: `timeToRead`,
            value: readingTime(node.body)
        });
    }
};
