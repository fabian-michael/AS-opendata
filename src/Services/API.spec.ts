import { API } from './API';

describe('Http request tests', () => {
	test('200 test', async () => {
		const result = await API.get('');
		expect(result.ok).toEqual(true);
	});

	test('404 test', async () => {
		try {
			await API.get('/some-not-existing-url');
		} catch (error) {
			expect(error.status).toBeGreaterThanOrEqual(400);
			expect(error.status).toBeLessThan(500);
		}
	});

	test('Catch test', async () => {
		try {
			await API.get('');
		} catch (error) {
			expect(error.code).toBeUndefined();
		}
	});
});
