import PageHeader from '../../shared/components/page-header/PageHeader.component';

import SkillEditor from './SkillEdittor.component';

const SkillsPage = () => {
	return (
		<div className="space-y-8">
			<PageHeader
				title="Skills & Competencies"
				description="Your technical stack categorized with proficiency details."
			/>
			<SkillEditor />
		</div>
	);
};

export default SkillsPage;
