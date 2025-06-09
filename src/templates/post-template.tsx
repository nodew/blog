import * as React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { TagIcon } from "../components/TagIcon";

dayjs.extend(localizedFormat);

interface PostItemTemplateProps {
    data: GatsbyTypes.PostItemQuery;
    children: React.ReactNode
}

const PostTemplate = ({ data: { mdx }, children }: PostItemTemplateProps) => {
    if (mdx === null) {
        return null;
    }

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                <Meta
                    title={mdx.frontmatter!.title || ""}
                    description={mdx.frontmatter!.excerpt || ""}
                    type="article"
                    extras={[
                        {
                            name: "keywords",
                            content:
                                mdx.frontmatter!.keywords!.join(","),
                        },
                    ]}
                />
                <div className="prose xl:prose-xl dark:prose-invert dark:xl:prose-dark-xl max-w-none">
                    <h1 className="mb-0 xl:mb-2">
                        {mdx.frontmatter?.title}
                    </h1>
                    <ul className="list-none flex flex-wrap p-0 xl:p-0 my-0 xl:my-0">
                        {mdx.frontmatter!.tags!.map((tag) => (
                            <li key={tag} className="flex-none ml-0 mr-4">
                                <Link to={`/tags/${_.kebabCase(tag || "")}`}>
                                    <div className="flex flex-row items-center">
                                        <TagIcon />
                                        <span className="ml-1">{tag}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="text-gray-400 dark:text-gray-700 italic mb-12">
                        {dayjs(mdx.frontmatter!.date).format("LL")}
                    </div>
                    {children}
                </div>
            </div>
        </Layout>
    );
};

export const pageQuery = graphql`
    query PostItem($id: String!) {
        mdx(id: { eq: $id }) {
            id
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

export default PostTemplate;
