import {objectToURLParams} from "@Utilities";

//@ts-ignore
const BaseUrl: string = `${process.env.API_URL}`;

export const API = {
    async request(method: string, slug: string, params?: object, payload?: any): Promise<Response> {
        return new Promise<Response>(async (resolve, reject) => {
            const query = params ? `?${objectToURLParams(params).toString()}` : '';

            try {
                let response = await fetch(`${BaseUrl}${slug}${query}`, {
                    body: JSON.stringify(payload),
                    cache: 'no-cache',
                    headers: {
                        'content-type': 'application/geo+json',
                    },
                    method,
                });

                if (response.status === 200) {
                    return resolve(response);
                } else {
                    return reject(response);
                }
            } catch(e) {
                reject(e);
            }
        });
	},
	
	async get(slug: string, params?: object, payload?: any): Promise<Response> {
		return this.request('GET', slug, params, payload);
	},

    async post(slug: string, params?: object, payload?: any): Promise<Response> {
        return this.request('POST', slug, params, payload);
    }
};
