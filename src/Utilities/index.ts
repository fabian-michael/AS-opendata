export function objectToURLParams(obj: object): URLSearchParams {
	return new URLSearchParams(Object.entries(obj).filter((p: Array<any>) => typeof p[1] !== 'undefined' && p[1] !== null));
}

export function URLParamsToObject(params: URLSearchParams): object {
	let obj = {};
	for(let [key, value] of params.entries()) {
		obj[key] = value;
	}
	return obj;
}