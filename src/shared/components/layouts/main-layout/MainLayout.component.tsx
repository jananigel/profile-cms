import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<div className="flex h-screen bg-slate-50 overflow-hidden">
			<Outlet></Outlet>
		</div>
	);
};

export default MainLayout;
