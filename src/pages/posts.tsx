import React from "react";
import { graphql, Link } from "gatsby";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

dayjs.extend(localizedFormat);

interface PostsPageProps {
    data: GatsbyTypes.PostsPageQuery;
}

export default ({ data }: PostsPageProps) => {
    return (
        <Layout activeNavItem="posts">
            <div className="max-w-5xl mx-auto">
                <Meta title="All posts" />
                <h1 className="text-3xl font-bold block mb-8 mt-12">All posts</h1>
                <ul>
                    {data.posts.edges.map(item => item.node.childMdx).map((post) => (
                        <li key={post!.id} className="text-base mb-8">
                            <div className="text-2xl">
                                <Link
                                    to={`/posts/${
                                        post!.frontmatter!.slug || ""
                                    }`}
                                >
                                    {post!.frontmatter!.title}
                                </Link>
                            </div>
                            <div className="text-gray-400 dark:text-gray-700 italic">
                                {dayjs(post!.frontmatter!.date).format("LL")}
                            </div>
                            <div className="text-gray-600 mt-2 dark:text-gray-400">
                                {post!.frontmatter!.excerpt}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query PostsPage {
        posts: allFile(
            filter: { sourceInstanceName: { eq: "posts" } }
            sort: { childMdx: { frontmatter: { date: DESC } } }
        ) {
            edges {
                node {
                    childMdx {
                        id
                        frontmatter {
                            slug
                            title
                            date
                            excerpt
                        }
                    }
                }
            }
        }
    }
`;
