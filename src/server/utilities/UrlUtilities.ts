import {ParsedQs} from "qs";


type QueryParameter = string | string[] | ParsedQs | ParsedQs[];

type AcceptableFormats = "html" | "pdf";


export function getFileName(reqUrl: string) {
    return reqUrl.substring(reqUrl.lastIndexOf("/") + 1);
}

export function getSessionId(sessionId: QueryParameter): string {
    if (sessionId != undefined) {
        if (typeof sessionId === 'string') {
            return sessionId;
        }
    }
    throw new Error('Unexpected value of session_id: ' + sessionId)
}


export function getFormat(queryFormat: QueryParameter): AcceptableFormats {
    if (queryFormat == undefined) {
        return 'html';
    }
    if (queryFormat === 'html' || queryFormat === 'pdf') {
        return queryFormat;
    }
}
