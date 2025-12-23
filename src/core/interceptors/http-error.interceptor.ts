import type { AxiosInstance } from 'axios';

export const HttpErrorInterceptor = (httpClient: AxiosInstance) => {
	const interceptorId = httpClient.interceptors.response.use(
		(res) => res,
		(err) => {
			const { status } = err.response || {};

			switch (status) {
				case 401:
					console.error('Unauthorized');
					break;
				case 500:
					console.error('Internal server error');
					break;
				default:
					console.error('Something wrong occurred from the server');
					break;
			}

			return Promise.reject(err);
		},
	);

	httpClient.interceptors.request.eject(interceptorId);
};
