import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionId } from '@/utilities/NextJsUtilities';
import { SESSION_INSTANCE } from '@/services/session.service';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>) {
  const url = req?.url;
  if (url != undefined) {
    console.log('searching for session url: ' + url);
    const sessionId = getSessionId(url);
    console.log('searching for session session id: ' + sessionId);
    if (sessionId != null) {
      const session = SESSION_INSTANCE.get(sessionId);
      if (session != null) {
        console.log('Session found: ' + sessionId);
        SESSION_INSTANCE.remove(sessionId);
      }
      res.status(200).json(session);
    }
  }
  res.status(400);
}
