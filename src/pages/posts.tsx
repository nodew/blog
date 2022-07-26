import React from "react";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";

export default () => {
    return (
        <Layout activeNavItem="posts">
            <Meta title="Posts" />
        </Layout>
    );
}
