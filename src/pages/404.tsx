import { Link } from "gatsby";
import React from "react";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

export default () => {
    return (
        <Layout>
            <div>
                <Meta title="404" />
                <h1 className="mx-auto font-bold text-5xl text-center mt-32 md:mt-36 lg:mt-48">
                    404
                </h1>
                <div className="mx-auto font-bold text-gray-600 dark:text-gray-200 text-xl text-center mt-8">
                    Hi, the page you're looking for doesn't exist.
                </div>
                <div className="flex justify-center mt-8">
                    <button className="mx-auto px-4 pt-1 pb-2 text-base text-blue-600 dark:text-blue-400 font-semibold rounded-full border border-blue-200 hover:text-white dark:hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        <Link to="/">Go to home page</Link>
                    </button>
                </div>
            </div>
        </Layout>
    );
};
