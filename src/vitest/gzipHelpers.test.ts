import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { decompressGzipToJson } from '$lib/functions/gzipHelpers';

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe('decompressGzipToJson', () => {
	it.each(['en', 'ja', 'zh'])('loads the gzipped %s character data', async (language) => {
		const url = `/data/characters_${language}.gz`;
		const compressed = readFileSync(`static${url}`);
		const expected = JSON.parse(gunzipSync(compressed).toString('utf8'));
		const fetchMock = vi.fn().mockResolvedValue(new Response(compressed));
		vi.stubGlobal('fetch', fetchMock);
		vi.spyOn(console, 'warn').mockImplementation(() => {});

		const characters = await decompressGzipToJson(url);

		expect(characters).toEqual(expected);
		expect(characters.length).toBeGreaterThan(0);
		expect(fetchMock).toHaveBeenCalledWith(url);
	});

	it('loads JSON that has already been decompressed by fetch', async () => {
		const characters = [{ name: 'アーミヤ' }];
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify(characters), {
					headers: { 'Content-Encoding': 'gzip' }
				})
			)
		);

		expect(await decompressGzipToJson('/data/characters_ja.gz')).toEqual(characters);
	});
});
