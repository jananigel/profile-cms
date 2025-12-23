import axios from 'axios';

import { HttpErrorInterceptor } from '../interceptors';

const httpClient = axios.create({
	baseURL: import.meta.env.BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

HttpErrorInterceptor(httpClient);

export default httpClient;
