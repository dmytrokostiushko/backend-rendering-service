import { PuppeteerService } from '@/services/puppeteer.service';

class PuppeteerInstance {

  private service?: PuppeteerService;

  async getPuppeteerService(): Promise<PuppeteerService> {
    if (this.service == null) {
      const browser = await PuppeteerService.initializeBrowser();
      this.service = new PuppeteerService(browser);
    }
    return this.service;
  }

}

export const puppeteerInstance = new PuppeteerInstance();
