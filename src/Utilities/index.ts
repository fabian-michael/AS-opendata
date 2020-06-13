export function objectToURLParams(obj: object) {
	return new URLSearchParams(Object.entries(obj).filter((p: Array<any>) => typeof p[1] !== 'undefined' && p[1] !== null));
}