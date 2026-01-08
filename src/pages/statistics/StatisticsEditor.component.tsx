import BaseInput from '../../shared/components/base-input/BaseInput.component';
import CardLayout from '../../shared/components/layouts/card-layout/CardLayout.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

const StatisticsEditor = () => {
	return (
		<CardLayout className="p-6">
			<form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
				<BaseInput label="Label (Key)" placeholder="e.g. Years Exp" />
				<BaseInput label="Value" placeholder="e.g. 5+" />
				<BaseInput label="Color Hex" />
				<TextButton label={'Add Stat'} btnType={'submit'} />
			</form>
		</CardLayout>
	);
};

export default StatisticsEditor;
