import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

interface AboutPageProps {
    data: GatsbyTypes.AboutPageQuery;
}

export default ({ data }: AboutPageProps) => {
    const githubUrl = `github.com/${data.site?.siteMetadata?.social?.github}`;
    const twitterUrl = `twitter.com/${data.site?.siteMetadata?.social?.twitter}`;
    const email = data.site?.siteMetadata?.author?.email;

    return (
        <Layout activeNavItem="about">
            <div className="max-w-5xl mx-auto">
                <Meta title="About me" />
                <h1 className="text-5xl font-bold block text-center mb-14">
                    About me
                </h1>
                <div className="prose xl:prose-xl dark:prose-invert dark:xl:prose-dark-xl max-w-none">
                    <p>I'm Qiao Wang, a software developer living in China.</p>

                    <p>
                        I got my bachelor's degree at Xiamen University, majored
                        in micro-electronics. Currently I'm working for
                        Microsoft. I'm experienced in NodeJS/JavaScript and .NET
                        development and I’ve been working in the field of web
                        development for 10 years.
                    </p>

                    <p>My favorite languages are Haskell, C# and TypeScript.</p>

                    <h2 className="text-center">Get in touch</h2>
                    <div>
                        <ul className="text-center list-none">
                            <li>
                                <a href={`mailto:${email}`}>{email}</a>
                            </li>
                            <li>
                                <a href={`https://${githubUrl}`}>{githubUrl}</a>
                            </li>
                            <li>
                                <a href={`https://${twitterUrl}`}>
                                    {twitterUrl}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query AboutPage {
        site {
            siteMetadata {
                author {
                    name
                    email
                }
                social {
                    github
                    twitter
                }
            }
        }
    }
`;
