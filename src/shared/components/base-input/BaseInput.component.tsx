interface BaseInputProps {
	type: string;
	placeholder: string;
	inputChanged: () => void;
}

const BaseInput = ({ type, placeholder, inputChanged }: BaseInputProps) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			autoComplete="off"
			className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
			onChange={inputChanged}
		/>
	);
};

export default BaseInput;
