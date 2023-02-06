import * as React from 'react';
import { useEffect, useState } from 'react';
import * as runtime from "react/jsx-runtime";
import {compile, run} from '@mdx-js/mdx';

export interface IMdxRendererProps {
    content: string;
}

export default ({ content }: IMdxRendererProps) => {
  var [body, setBody] = useState<React.ReactElement>(<></>);

  useEffect(() => {
    (async () => {
        const compiledMdx = await compile(content, { outputFormat: 'function-body' });
        const {default: MdxContent } = await run(compiledMdx, runtime)
        setBody(<MdxContent />);
    })();
  }, [content]);

  return body;
}
