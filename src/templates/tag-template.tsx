import * as React from "react";
import { graphql } from "gatsby";

export default () => {
    return <div>Not implemented yet.</div>;
};

export const query = graphql`
    query PostsByTag($tag: String) {
        allMdx(
            filter: { frontmatter: { tags: { in: [$tag] } } }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                frontmatter {
                    slug
                }
            }
        }
    }
`;
