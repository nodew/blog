import * as React from "react";
import { Link, graphql } from "gatsby";

import { MDXRenderer } from "gatsby-plugin-mdx";

const BlogPostTemplate = ({ data, location }: any) => {
    const post = data.mdx;
    const siteTitle = data.site.siteMetadata?.title || `Title`;
    const { previous, next } = data;

    return (
        <div>Hello world</div>
    );
};

export default BlogPostTemplate;

