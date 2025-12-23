import './App.scss';
import { RouterProvider } from 'react-router-dom';

import { router } from './App.routes';

function App() {
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
