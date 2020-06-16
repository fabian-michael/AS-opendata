interface obj {
	[s: string]: string;
}

export function objectToURLParams(obj: obj): URLSearchParams {
	return new URLSearchParams(
		Object.entries(obj).filter(
			(p: Array<string>) => typeof p[1] !== 'undefined' && p[1] !== null
		)
	);
}

export function URLParamsToObject(params: URLSearchParams): obj {
	const obj = {};
	for (const [key, value] of params.entries()) {
		obj[key] = value;
	}
	return obj;
}
