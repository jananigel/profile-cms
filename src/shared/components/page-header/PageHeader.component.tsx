import TextButton from '../../widgets/text-button/TextButton.widget';

interface PageHeaderProps {
	title: string;
	description: string;
	onAdd: () => void;
	addLabel?: string;
}

const PageHeader = ({ title, description, onAdd, addLabel = 'Add New' }: PageHeaderProps) => (
	<div className="flex items-center justify-between mb-6">
		<div>
			<h3 className="text-lg font-bold text-slate-800">{title}</h3>
			{description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
		</div>
		{onAdd && <TextButton label={addLabel} callback={onAdd} size={'md'}></TextButton>}
	</div>
);

export default PageHeader;
