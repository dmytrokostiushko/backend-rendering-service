import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import { Request, Response } from 'express';
import { parse } from 'url';


@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  private readonly logger = new Logger(ViewService.name);

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
      });
      await this.server.prepare();
      this.logger.log('Nest.js service initialized');
    } catch (error) {
      this.logger.error(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }

  async renderNextJsPage(req: Request,
                         res: Response) {
    const parsedUrl = parse(req.url, true);
    return await this.getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query)
      .catch(e => {
        this.logger.error('Failed to process');
        this.logger.error(e);
      });
  }

}
