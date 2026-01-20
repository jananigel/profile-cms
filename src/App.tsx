import './App.scss';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './App.routes';
import { store } from './stores/store';

function App() {
	useEffect(() => {
		const handleGlobalError = (e: ErrorEvent) => {
			console.error(`Global error caught: ${e.error}`);
		};

		const handlePromiseRejection = (e: PromiseRejectionEvent) => {
			console.error(`Unhandled promise rejection: ${e.reason}`);
		};

		window.addEventListener('error', handleGlobalError);
		window.addEventListener('unhandledrejection', handlePromiseRejection);

		return () => {
			window.removeEventListener('error', handleGlobalError);
			window.removeEventListener('unhandledrejection', handlePromiseRejection);
		};
	}, []);
	return (
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	);
}

export default App;
