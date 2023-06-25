import {Injectable, Logger, StreamableFile} from '@nestjs/common';
import {PuppeteerService} from "../puppeteer/puppeteer.service";
import {format_query_name, session_id_query_name} from "./view.controller";
import {port} from "../../main";
import {getFileName} from "../../utilities/UrlUtilities";
import {ViewSessionService} from "./view-session.service";
import {Request, Response} from 'express';


@Injectable()
export class ViewPdfService {

    private readonly logger = new Logger(ViewPdfService.name);

    constructor(private puppeteerService: PuppeteerService,
                private viewSessionService: ViewSessionService) {
    }

    async renderPdfPage(req: Request,
                        res: Response): Promise<void> {
        const sessionId = this.viewSessionService.put(req.body);
        const pdfBuffer = await this.renderPdf(req.url, sessionId);
        if (Buffer.isBuffer(pdfBuffer) && pdfBuffer.length === 0) {
            throw new Error('Buffer is empty')
        }
        const fileName = getFileName(req.url);
        res.set({
            'Content-Type': "application/pdf",
            'Content-Disposition': `attachment; filename="${fileName}"`
        })
        res.end(pdfBuffer);
    }

    private async renderPdf(reqUrl: string, sessionId: string): Promise<Buffer> {
        const localParsedUrl = this._convertUrlToLocal(reqUrl, sessionId);
        const localUrl = localParsedUrl.toString();
        this.logger.log(`Attempting to create a pdf: Localized URL ${localUrl}, url: ${reqUrl} session id: ${sessionId}`);
        return await this.puppeteerService.renderPage(localUrl);
    }


    private _convertUrlToLocal(reqUrl: string, sessionId: string): URL {
        const parsedUrl = new URL(reqUrl, `http://localhost:${port}`);
        parsedUrl.hostname = 'localhost'
        parsedUrl.protocol = 'http'
        parsedUrl.port = port
        parsedUrl.searchParams.delete(format_query_name)
        parsedUrl.search = parsedUrl.search + "&" + session_id_query_name + '=' + encodeURIComponent(sessionId);
        return parsedUrl;
    }


}
