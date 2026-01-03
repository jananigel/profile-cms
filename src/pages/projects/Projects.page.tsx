import { useState } from 'react';

import PageHeader from '../../shared/components/page-header/PageHeader.component';

const ProjectsPage = () => {
	const [isEditing, setIsEditing] = useState(false);

	const createNew = () => {
		setIsEditing(true);
	};
	return (
		<div className="space-y-6">
			<PageHeader
				title="Projects"
				description="Portfolio pieces and open source work."
				onAdd={createNew}
			/>
		</div>
	);
};

export default ProjectsPage;
