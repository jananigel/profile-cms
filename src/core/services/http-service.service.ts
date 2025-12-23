import httpClient from './http-client.service';

import type { AxiosProgressEvent } from 'axios';

type RequestOptions = {
	params?: object;
	body?: unknown;
	headers?: Record<string, string>;
	responseType?: 'blob';
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
	onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
};

const request = async <T>(
	method: 'get' | 'post' | 'put' | 'patch' | 'delete',
	url: string,
	options: RequestOptions = {},
): Promise<T> => {
	const res = await httpClient.request<T>({
		method,
		url,
		...options,
		onUploadProgress: options.onUploadProgress,
		onDownloadProgress: options.onDownloadProgress,
	});
	return res.data;
};

export const httpService = {
	get: <T, U extends object>(url: string, params?: U): Promise<T> =>
		request<T>('get', url, { params }),
	post: <T, U = unknown>(url: string, body: U): Promise<T> =>
		request('post', url, { body, headers: { 'Content-Type': 'application/json' } }),
	put: <T, U>(url: string, body: U): Promise<T> =>
		request('put', url, { body, headers: { 'Content-Type': 'application/json' } }),
	patch: <T, U>(url: string, body: U): Promise<T> =>
		request('patch', url, { body, headers: { 'Content-Type': 'application/json' } }),
	delete: <T, U extends object>(url: string, params?: U): Promise<T> =>
		request('delete', url, { params }),
	download: (
		url: string,
		params?: object,
		onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void,
	): Promise<Blob> => request('get', url, { params, responseType: 'blob', onDownloadProgress }),
	upload: <T>(
		url: string,
		formData: FormData,
		onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
	): Promise<T> => request('post', url, { body: formData, onUploadProgress }),
};
