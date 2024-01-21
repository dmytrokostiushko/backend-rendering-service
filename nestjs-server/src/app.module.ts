import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ViewModule} from './modules/view/view.module';
import {PuppeteerModule} from "./modules/puppeteer/puppeteer.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ViewModule,
        PuppeteerModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
