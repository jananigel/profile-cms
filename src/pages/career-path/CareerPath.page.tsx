import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uuid } from '../../core/utilts';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import PageHeader from '../../shared/components/page-header/PageHeader.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

import { addItem, removeItem } from './career-path.slice';

import type { RootState } from '../../stores/store';

const CareerPathPage = () => {
	const [newItem, setNewItem] = useState('');
	const dispatch = useDispatch();
	const careerPaths = useSelector((state: RootState) => state.careerPath.careerPaths);
	const addCareerPath = () => {
		dispatch(addItem({ id: uuid(), title: newItem }));
	};

	const removeCareerPath = (id: string) => {
		dispatch(removeItem(id));
	};

	return (
		<div className="space-y-6">
			<PageHeader title="Career Paths" description="List major career roles or milestones." />

			<div className="flex gap-2">
				<div className="flex-1">
					<BaseInput
						type="text"
						placeholder="E.g. Full Stack Engineer, UX Specialist..."
						value={newItem}
						onKeyDown={(e) => e.key === 'Enter' && addCareerPath()}
						onChange={(e) => setNewItem(e.target.value)}
					/>
				</div>
				<TextButton label="Add" callback={addCareerPath} size={'md'} />
			</div>

			<div className="space-y-3">
				{careerPaths.map((item) => (
					<div
						key={item.id}
						className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-blue-200">
						<GripVertical className="text-slate-300 group-hover:text-slate-400" size={18} />
						<span className="flex-1 font-medium text-slate-700">{item.title}</span>
						<button
							onClick={() => removeCareerPath(item.id)}
							className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
							<Trash2 size={18} />
						</button>
					</div>
				))}
				{careerPaths.length === 0 && (
					<div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200">
						<p className="text-slate-400">No career paths added yet.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CareerPathPage;
