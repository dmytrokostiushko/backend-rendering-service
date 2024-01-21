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
    this.logger.verbose('Attempting to create new browser page');
    return this.browser.newPage().then(resp => {
      this.logger.verbose('Successfully created new browser page');
      return resp;
    });
  }

  private navigateToPage(pageUrl: string, page: Page): Promise<HTTPResponse | null> {
    this.logger.verbose(`Attempting to navigate to the ${pageUrl}`);
    return page.goto(pageUrl, { waitUntil: 'networkidle0' }).then(resp => {
      this.logger.verbose(`Successfully navigated to the ${pageUrl}`);
      return resp;
    });
  }

  private printPage(pageUrl: string,
                    page: Page,
                    options: PDFOptions): Promise<Buffer> {
    this.logger.verbose(`Attempting to create pdf representation of the page ${pageUrl}:`);
    return page.pdf(options).then(resp => {
      this.logger.verbose(`Successfully created pdf representation of the page ${pageUrl}:`);
      return resp;
    });
  }

  private closePage(page: Page): Promise<void> {
    this.logger.verbose(`Attempting to close browser page url: ${page.url()}`);
    return page.close().then(resp => {
      this.logger.verbose(`Browser page closed url: ${page.url()}`);
      return resp;
    });
  }

  private initializeBrowser(): Promise<Browser> {
    this.logger.verbose('Attempting to start the puppeteer browser');
    try {
      return puppeteer.launch({
        headless: 'new',
        args: ['--disable-dev-shm-usage', '--disable-gpu', '--no-sandbox'],
      })
        .catch(e => {
          this.logger.error('Failed to start browser');
          this.logger.error(e);
          throw e;
        })
        .then(resp => {
          this.logger.verbose('Browser launched');
          return resp;
        });
    } catch (e) {
      this.logger.error('Failed to start browser');
      this.logger.error(e);
    }
  }

  private closeBrowser(): Promise<void> {
    this.logger.verbose('Attempting to close browser');
    return this.browser.close()
      .then(resp => {
        this.logger.verbose('Browser closed');
        return resp;
      });
  }

}
