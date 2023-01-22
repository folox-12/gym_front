export interface dataTypeForHTTP {
    id: number,
    page?: number
}

export interface AXIOS_COLLECTION {
    url: string,
    method: string,
    data?: dataTypeForHTTP;
}

export enum HTTP_REQUESTS {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
}
