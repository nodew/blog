import React from "react";
import { graphql, Link } from "gatsby";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

dayjs.extend(localizedFormat);

interface BooksPageProps {
    data: GatsbyTypes.BooksPageQuery;
}

export default ({ data }: BooksPageProps) => {
    return (
        <Layout activeNavItem="books">
            <div className="max-w-5xl mx-auto">
                <Meta title="All publications" />
                <h1 className="text-3xl font-bold block mb-8 mt-12">All publications</h1>
                <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {data.books.edges.map(item => item.node.childMdx).map((book) => (
                        <li key={book!.id}>
                            <a href={`/books/${book?.frontmatter?.slug}`}>
                                <div className="rounded overflow-hidden shadow-lg dark:bg-gray-700 hover:dark:text-gray-300">
                                    <img className="w-full" src={book?.frontmatter?.cover || ""} alt="Cover of framework design guidelines" />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{book?.frontmatter?.name}</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query BooksPage {
        books: allFile(
            filter: {
                sourceInstanceName: { eq: "books" }
                childMdx: { id: { ne: null } }
            }
            sort: { childMdx: { frontmatter: { date: DESC } } }
        ) {
            edges {
                node {
                    childMdx {
                        id
                        frontmatter {
                            slug
                            name
                            cover
                        }
                    }
                }
            }
        }
    }
`;
