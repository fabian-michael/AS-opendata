import {objectToURLParams} from "@Utilities";

//@ts-ignore
const BaseUrl: string = `https://cors-anywhere.herokuapp.com/${process.env.API_URL}`;

export const API = {
    async request(method: string, slug: string, params?: object, payload?: any) {
        return new Promise(async (resolve, reject) => {
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
                    return response.json().then(resolve);
                } else {
                    return reject(response);
                }
            } catch(e) {
                reject(e);
            }
        });
	},
	
	async get(slug: string, params?: object, payload?: any) {
		return this.request('GET', slug, params, payload);
	},

    async post(slug: string, params?: object, payload?: any) {
        return this.request('POST', slug, params, payload);
    }
};
