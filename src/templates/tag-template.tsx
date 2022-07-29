import * as React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { TagIcon } from "../components/TagIcon";

dayjs.extend(localizedFormat);

interface TaggedPostsPageProps {
    data: GatsbyTypes.PostsByTagQuery;
    pageContext: {
        tag: string;
    };
}

export default ({ data, pageContext }: TaggedPostsPageProps) => {
    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                <Meta title={`Tag - ${pageContext.tag}`} />
                <h1 className="text-3xl font-bold block mb-8 mt-12 flex items-center">
                    <TagIcon />
                    <span className="ml-2">{pageContext.tag}</span>
                </h1>
                <ul>
                    {data.posts.nodes.map((post) => (
                        <li key={post.id} className="text-base mb-4">
                            <div className="text-2xl">
                                <Link
                                    to={`/posts/${
                                        post.frontmatter!.slug || ""
                                    }`}
                                >
                                    {post.frontmatter!.title}
                                </Link>
                            </div>
                            <div className="text-gray-400 dark:text-gray-700 italic">
                                {dayjs(post.frontmatter!.date).format("LL")}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query PostsByTag($tag: String) {
        posts: allMdx(
            filter: { frontmatter: { tags: { in: [$tag] } } }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            nodes {
                id
                frontmatter {
                    slug
                    title
                    date
                }
            }
        }
    }
`;
