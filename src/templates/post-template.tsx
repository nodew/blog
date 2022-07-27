import * as React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

dayjs.extend(localizedFormat);

interface PostItemTemplateProps {
    data: GatsbyTypes.PostItemQuery;
}

export default ({ data }: PostItemTemplateProps) => {
    return (
        <Layout activeNavItem="home">
            <div className="max-w-5xl mx-auto">
                <Meta title="Home" />
                <div className="prose xl:prose-xl dark:prose-dark dark:xl:prose-dark-xl max-w-none">
                    <h1>{data.post?.frontmatter?.title}</h1>
                    <div className="text-gray-400 dark:text-gray-700 italic">
                        {dayjs(data.post?.frontmatter!.date).format("LL")}
                    </div>
                    <MDXRenderer>{data.post!.body}</MDXRenderer>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query PostItem($id: String!) {
        post: mdx(id: { eq: $id }) {
            id
            slug
            body
            frontmatter {
                date
                excerpt
                keywords
                slug
                tags
                title
            }
        }
    }
`;
