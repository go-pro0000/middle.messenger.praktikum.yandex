interface Option {
    headers: object,
	data: object,
    tries: number,
    timeout: number,
}

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data) {
if (typeof data !== 'object') {
        throw new Error('Data must be object');
}

const keys = Object.keys(data);
return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

type HTTPMethod = (url: string, options?: Option) => Promise<unknown>

class HTTPTransport {
    get: HTTPMethod = (url: string, options: Option) => {
        const { data } = options;
        url = `${url}${queryStringify(data)}`;
        this.request(url, { ...options, method: METHODS.GET }, options.timeout)};

    post: HTTPMethod = (url: string, options: Option) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    put: HTTPMethod = (url: string, options: Option) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    delete: HTTPMethod = (url: string, options: Option) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    request: HTTPMethod = (url: string, options: any, timeout = 5000) => {
            const { headers, method, data } = options;

            return new Promise((resolve, reject) => {
                    if (!method) {
                            reject('No method');
                            return;
                    }

                const xhr = new XMLHttpRequest();

                xhr.open(
                            method,
                            url
                    );

                    Object.keys(headers).forEach((key) => {
                            xhr.setRequestHeader(key, headers[key]);
                    });

                xhr.onload = function () {
                      resolve(xhr);
                };

                xhr.onabort = reject;
                xhr.onerror = reject;

                xhr.timeout = timeout;
                xhr.ontimeout = reject;

                  if (isGet || !data) {
                        xhr.send();
                    } else {
                            xhr.send(data);
                    }
          });
    };

    fetchWithRetry(url: string, options: Option) {
        const { tries = 1 } = options;

          function onError(err) {
              const triesLeft = tries - 1;
              if (!triesLeft) {
                  throw err;
              }

              return this.fetchWithRetry(url, { ...options, tries: triesLeft });
          }

          return this.request(url, options).catch(onError);
      }
}
