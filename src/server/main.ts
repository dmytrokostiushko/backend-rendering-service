import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

export const port = process.env.PORT;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', "warn", 'error', 'verbose']
    });
    await app.listen(port, async () => {
        console.log(`Server started at: http://localhost:${process.env.PORT}`);
    });
}

bootstrap();
