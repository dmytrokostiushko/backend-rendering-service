import { NextPageContext } from 'next/dist/shared/lib/utils';
import { SESSION_INSTANCE } from '@/services/session.service';


export function findQueryParam(url: string, paramName: string) {
  const queryStringStart = url?.indexOf('?');
  if (queryStringStart != -1 && queryStringStart != undefined) {
    const queryParams = new URLSearchParams(url?.substring(queryStringStart));
    return queryParams.get(paramName);
  }
  return null;
}

export function getSessionId(url: string): string | null {
  let paramName = 'session_id';
  return findQueryParam(url, paramName);
}


