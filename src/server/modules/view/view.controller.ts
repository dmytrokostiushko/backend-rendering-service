import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {ViewService} from './view.service';
import {ViewSessionService} from "./view-session.service";
import {ViewPdfService} from "./view-pdf.service";
import {getFormat, getSessionId} from "../../utilities/UrlUtilities";


export const session_id_query_name = 'session_id';
export const format_query_name = 'format';


@Controller('/')
export class ViewController {
    constructor(private viewService: ViewService,
                private viewSessionService: ViewSessionService,
                private viewPdfService: ViewPdfService) {
    }

    @Get([
        '/view/*'
    ])
    public async showHome(@Req() req: Request,
                          @Res() res: Response) {
        const session_id_query = req.query[session_id_query_name]
        if (session_id_query && session_id_query.length) {
            const sessionId = getSessionId(session_id_query);
            req.body = this.viewSessionService.getOrThrow(sessionId);

        }
        await this.viewService.renderNextJsPage(req, res);
    }


    @Post([
        '/view/*'
    ])
    public async showUspsTemplate(@Req() req: Request,
                                  @Res() res: Response) {
        const queryFormat = req.query[format_query_name];
        const requestFormat: 'html' | 'pdf' = getFormat(queryFormat);
        switch (requestFormat) {
            case "html":
                await this.viewService.renderNextJsPage(req, res);
                break;
            case "pdf":
                await this.viewPdfService.renderPdfPage(req, res);
                break;
        }
    }


}
