import {Injectable, Logger} from "@nestjs/common";
import puppeteer, {Browser, HTTPResponse, Page, PDFOptions} from 'puppeteer';


@Injectable()
export class PuppeteerService {

    private readonly logger = new Logger(PuppeteerService.name);

    async renderPage(pageUrl: string, options: PDFOptions = {format: 'A4'}): Promise<Buffer> {
        const browser = await this.initializeBrowser();
        const page = await this.createNewPage(browser);
        await this.navigateToPage(pageUrl, page);
        const pdf = await this.printPage(pageUrl, page, options);
        await this.closePage(page);
        await this.closeBrowser(browser);
        return pdf;
    }

    private closeBrowser(browser): Promise<void> {
        console.log('Attempting to close browser')
        return browser.close();
    }

    private async initializeBrowser(): Promise<Browser> {
        this.logger.log('Attempting to start the puppeteer browser')
        return await puppeteer.launch({
            headless: 'new',
            args: ['--disable-dev-shm-usage']
        });
    }

    private closePage(page: Page): Promise<void> {
        this.logger.log(`Closing browser page url: ${page.url()}`)
        return page.close();
    }

    private printPage(pageUrl: string,
                      page: Page,
                      options: PDFOptions): Promise<Buffer> {
        this.logger.log(`Attempting to create to the page ${pageUrl} pdf representation:`)
        return page.pdf(options);
    }

    private createNewPage(browser): Promise<Page> {
        this.logger.log('Attempting to create new browser page')
        return browser.newPage();
    }

    private navigateToPage(pageUrl: string, page: Page): Promise<HTTPResponse | null> {
        this.logger.log(`Attempting to navigate to the ${pageUrl}`)
        return page.goto(pageUrl, {waitUntil: 'networkidle0'})
    }
}
