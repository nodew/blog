import React from "react";
import { graphql, Link } from "gatsby";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

import { Layout } from "../components/Layout";
import { Meta } from "../components/Meta";

interface HomePageProps {
    data: GatsbyTypes.HomePageQuery;
}

export default ({ data }: HomePageProps) => {
    return (
        <Layout activeNavItem="home">
            <div className="max-w-5xl mx-auto">
                <Meta title="Home" />
                <h1 className="text-5xl font-bold block mb-8 mt-12">
                    Hi, I'm Qiao Wang
                </h1>
                <div className="text-3xl block mb-12 text-gray-600 dark:text-gray-300">
                    A software developer
                </div>
                <div></div>
                <div>
                    <h2 className="text-3xl font-bold block mb-4">
                        Latest posts
                    </h2>
                    <div className="text-xl block">
                        You can also browse all my posts by tags{" "}
                        <Link
                            className="text-blue-400 hover:text-blue-800"
                            to="/tags"
                        >
                            here
                        </Link>
                        .
                    </div>
                    <ul className="mt-4">
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
            </div>
        </Layout>
    );
};

export const query = graphql`
    query HomePage {
        posts: allMdx(
            limit: 3
            sort: { fields: [frontmatter___date], order: DESC }
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
