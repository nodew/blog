
import { ReactNode } from "react";

export type RenderCallback = (data: any) => ReactNode;

export type Entry = (ss: [string]) => string;

export type WidgetFor = (s: string) => string;

export interface PageContext {
  tag: string;
  category: string;
  currentPage: number;
  prevPagePath: string;
  nextPagePath: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface Node {
  fields: {
    slug: string,
    categorySlug?: string,
    tagSlugs?: string[],
  };
  frontmatter: {
    title: string,
    date: string,
    description?: string,
    category?: string,
    tags?: string[],
    keywords?: string
  };
  html: string;
  id: string;
}

export interface Edge {
  node: Node;
}

export type Edges = [Edge];

export interface AllMarkdownRemark {
  allMarkdownRemark: {
    edges: Edges,
  };
  group: Array<{
    fieldValue: string,
    totalCount: number,
  }>;
}

export type MarkdownRemark = Node;
