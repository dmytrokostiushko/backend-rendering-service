import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import puppeteer, { Browser, HTTPResponse, Page, PDFOptions } from 'puppeteer';


@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {

  private readonly logger = new Logger(PuppeteerService.name);
  private browser: Browser;


  async onModuleInit(): Promise<void> {
    this.browser = await this.initializeBrowser();
  }

  async onModuleDestroy(): Promise<void> {
    await this.closeBrowser();
  }

  async renderPage(pageUrl: string, options: PDFOptions = { format: 'A4' }): Promise<Buffer> {
    const page = await this.createNewPage();
    await this.navigateToPage(pageUrl, page);
    const pdf = await this.printPage(pageUrl, page, options);
    await this.closePage(page);
    return pdf;
  }

  private createNewPage(): Promise<Page> {
    this.logger.log('Attempting to create new browser page');
    return this.browser.newPage().then(resp => {
      this.logger.log('Successfully created new browser page');
      return resp;
    });
  }

  private navigateToPage(pageUrl: string, page: Page): Promise<HTTPResponse | null> {
    this.logger.log(`Attempting to navigate to the ${pageUrl}`);
    return page.goto(pageUrl, { waitUntil: 'networkidle0' }).then(resp => {
      this.logger.log(`Successfully navigated to the ${pageUrl}`);
      return resp;
    });
  }

  private printPage(pageUrl: string,
                    page: Page,
                    options: PDFOptions): Promise<Buffer> {
    this.logger.log(`Attempting to create pdf representation of the page ${pageUrl}:`);
    return page.pdf(options).then(resp => {
      this.logger.log(`Successfully created pdf representation of the page ${pageUrl}:`);
      return resp;
    });
  }

  private closePage(page: Page): Promise<void> {
    this.logger.log(`Attempting to close browser page url: ${page.url()}`);
    return page.close().then(resp => {
      this.logger.log(`Browser page closed url: ${page.url()}`);
      return resp;
    });
  }

  private async initializeBrowser(): Promise<Browser> {
    this.logger.log('Attempting to start the puppeteer browser');
    return await puppeteer.launch({
      headless: 'new',
      args: ['--disable-dev-shm-usage'],
    }).then(resp => {
      this.logger.log('Browser launched');
      return resp;
    });
  }

  private closeBrowser(): Promise<void> {
    this.logger.log('Attempting to close browser');
    return this.browser.close()
      .then(resp => {
        this.logger.log('Browser closed');
        return resp;
      });
  }

}
