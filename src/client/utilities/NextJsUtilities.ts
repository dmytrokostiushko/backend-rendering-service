import { NextPage } from 'next';
import { Request } from 'express';


export const getInitialPropsFromRequestBody: NextPage<any>['getInitialProps'] = (context) => {
  const expressRequest = context.req as Request;
  return expressRequest.body;
};
