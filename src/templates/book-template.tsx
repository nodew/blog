import * as React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

dayjs.extend(localizedFormat);

interface BookTemplateProps {
    data: GatsbyTypes.BookQuery;
    children: React.ReactNode
}

const BookTemplate = ({ data: { mdx }, children }: BookTemplateProps) => {
    if (mdx === null) {
        return null;
    }

    return (
        <Layout activeNavItem="books">
            <div className="max-w-5xl mx-auto">
                <Meta
                    title={mdx.frontmatter!.name || ""}
                    description={mdx.frontmatter!.excerpt || ""}
                    type="article"
                    extras={[
                        {
                            name: "keywords",
                            content:
                                mdx.frontmatter!.keywords!.join(","),
                        },
                    ]}
                    image={mdx?.frontmatter?.thumbnail || ""}
                />
                <div className="prose xl:prose-xl dark:prose-invert dark:xl:prose-dark-xl max-w-none">
                    <h1 className="mb-0 xl:mb-2">
                        {mdx.frontmatter!.name}
                    </h1>
                    {children}
                </div>
            </div>
        </Layout>
    );
};

export const pageQuery = graphql`
    query Book($id: String!) {
        mdx(id: { eq: $id }) {
            id
            frontmatter {
                name
                slug
                thumbnail
                excerpt
                keywords
            }
        }
    }
`;

export default BookTemplate;
