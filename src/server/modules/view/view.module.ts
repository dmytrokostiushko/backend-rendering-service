import { Module } from '@nestjs/common';

import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import {PuppeteerModule} from "../puppeteer/puppeteer.module";
import {ViewSessionService} from "./view-session.service";
import {ViewPdfService} from "./view-pdf.service";

@Module({
  imports: [PuppeteerModule],
  providers: [ViewService, ViewSessionService, ViewPdfService],
  controllers: [ViewController],
})
export class ViewModule {}
