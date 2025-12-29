import { useSelector } from 'react-redux';

import CardLayout from '../../../../shared/components/layouts/card-layout/CardLayout.component';
import { selectProfileSnapshot } from '../../../dashboard/dashboard.selector';

const ProfileSnapshotCard = () => {
	const data = useSelector(selectProfileSnapshot);
	return (
		<CardLayout className="p-6">
			<h3 className="font-bold text-slate-800 mb-4">Profile Snapshot</h3>
			<div className="space-y-4">
				<div className="flex justify-between border-b border-slate-100 pb-2">
					<span className="text-slate-500 text-sm">Full Name</span>
					<span className="text-slate-900 font-medium text-sm">{data.profile.fullName}</span>
				</div>
				<div className="flex justify-between border-b border-slate-100 pb-2">
					<span className="text-slate-500 text-sm">Status</span>
					<span
						className={`text-xs px-2 py-0.5 rounded-full font-bold ${data.profile.isOpenToOpportunities ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
						{data.profile.isOpenToOpportunities ? 'OPEN TO WORK' : 'HIRED'}
					</span>
				</div>
				<div className="flex justify-between border-b border-slate-100 pb-2">
					<span className="text-slate-500 text-sm">Skills Total</span>
					<span className="text-slate-900 font-medium text-sm">{data.skills.length} Items</span>
				</div>
			</div>
		</CardLayout>
	);
};

export default ProfileSnapshotCard;
