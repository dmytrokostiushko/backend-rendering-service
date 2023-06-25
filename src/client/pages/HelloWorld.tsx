import * as React from 'react';
import { getInitialPropsFromRequestBody } from '../utilities/NextJsUtilities';
import { NextPage } from 'next';

type HelloWorldTemplateProps = {
  name: string
}


const HelloWorld: NextPage<HelloWorldTemplateProps> = props => {

  const initialProps = props as HelloWorldTemplateProps;

  return (
    <div id='root'>
      <h1>Hello {initialProps.name}</h1>
    </div>
  );
};

HelloWorld.getInitialProps = getInitialPropsFromRequestBody;
export default HelloWorld;
