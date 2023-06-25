import {Module} from '@nestjs/common';
import {PuppeteerService} from "./puppeteer.service";

@Module({
    imports: [],
    providers: [PuppeteerService],
    controllers: [],
    exports:[PuppeteerService]
})
export class PuppeteerModule {}
