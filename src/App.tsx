import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './App.routes';
import { store } from './stores/store';

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	);
}

export default App;
