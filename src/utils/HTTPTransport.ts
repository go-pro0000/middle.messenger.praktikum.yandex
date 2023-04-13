export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete',
}

type Option = {
    method: Method;
    data?: any;
}

function queryStringify(data: any) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';

    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get<Response>(path: string): Promise<Response> {
        return this.request<Response>(this.endpoint + path);
    }

    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Post,
            data,
        });
    }

    public put<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Put,
            data,
        });
    }

    public patch<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Patch,
            data,
        });
    }

    public delete<Response>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Delete,
            data,
        });
    }

    private request<Response>(url: string, options: Option = { method: Method.Get }): Promise<Response> {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            const isGet = method === Method.Get;
            xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({ reason: 'abort' });
            xhr.onerror = () => reject({ reason: 'network error' });
            xhr.ontimeout = () => reject({ reason: 'timeout' });

            xhr.withCredentials = true;
            xhr.responseType = 'json';
            if (method === Method.Get || !data) {
                xhr.send();
            } else if (method === Method.Put && (data instanceof FormData || data.avatar instanceof FormData)) {
                console.log(data, 'formdata');
                xhr.send(data);
            } else {
                console.log(data, 'json');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    }

    // fetchWithRetry(url: string, options: Option) {
    //     const { tries = 1 } = options;

    //     function onError(err) {
    //         const triesLeft = tries - 1;
    //         if (!triesLeft) {
    //             throw err;
    //         }

    //         return this.fetchWithRetry(url, { ...options, tries: triesLeft });
    //     }

    //     return this.request(url, options).catch(onError);
    // }
}
