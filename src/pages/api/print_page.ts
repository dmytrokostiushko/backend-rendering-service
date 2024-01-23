import { NextApiRequest, NextApiResponse } from 'next';
import { puppeteerInstance } from '@/services/puppeteer.instance';
import { SESSION_INSTANCE } from '@/services/session.service';

type AppHealth = { status: 'up' | 'down' }


const _makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>) {


  const sessionId = _makeid(10);
  SESSION_INSTANCE.put(sessionId, req.body);

  const pupperteerService = await puppeteerInstance.getPuppeteerService();

  const queryParams = req.query;
  const pageName = queryParams['page_name'];

  const buffer = await pupperteerService.renderPage(`http://${process.env.HOST}:${process.env.PORT}/${pageName}?session_id=${sessionId}`);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${pageName}"`);
  res.status(200).send(buffer);
}
