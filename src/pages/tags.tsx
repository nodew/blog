import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

interface TagsPageProps {
    data: GatsbyTypes.TagsPageQuery;
}

export default ({ data }: TagsPageProps) => {
    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                <Meta title="Tags" />
                <h1 className="text-3xl font-bold block mb-8 mt-12">Tags</h1>
                <ul>
                    {data.tags.group.map((tag: any) => (
                        <li className="float-left mr-6 my-2 font-semibold">
                            <Link
                                className="text-blue-400 hover:text-blue-800"
                                to={`/tags/${_.kebabCase(tag.fieldValue)}`}
                            >
                                {tag.fieldValue} ({tag.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query TagsPage {
        tags: allMdx {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
