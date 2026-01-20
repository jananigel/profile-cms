import { Loader2 } from 'lucide-react';

import type { MouseEventHandler } from 'react';

interface TextButtonProps {
	label: string;
	size?: 'auto' | 'full' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
	btnType?: 'submit' | 'reset' | 'button';
	btnStyle?: 'primary' | 'secondary' | 'amber' | 'emerald';
	callback?: MouseEventHandler<HTMLButtonElement>;
	isDisabled?: boolean;
	isLoading?: boolean;
}
const TextButton = ({
	label,
	callback,
	size = 'full',
	btnType = 'button',
	btnStyle = 'primary',
	isDisabled: isDisabled = false,
	isLoading = false,
}: TextButtonProps) => {
	const btnSizeMap = {
		full: 'w-full py-3',
		md: 'px-4 py-2 text-sm',
	} as const;

	const getBtnSize = (): string => {
		return btnSizeMap[size as keyof typeof btnSizeMap] || size;
	};

	const stylesMap = {
		primary: 'bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-blue-200 ',
		secondary:
			'bg-white text-blue-600 border border-blue-600 hover:bg-blue-700 hover:text-white shadow-blue-200 ',
		amber:
			'w-full py-3 text-white rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 bg-amber-500 hover:bg-amber-600 shadow-amber-100',
		emerald: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100 text-white ',
	} as const;

	const getBtnStyle = (): string => {
		return stylesMap[btnStyle as keyof typeof stylesMap] || btnStyle;
	};

	const computedDisabled = isDisabled || isLoading;

	return (
		<button
			type={btnType}
			onClick={callback}
			disabled={computedDisabled}
			aria-disabled={computedDisabled}
			aria-busy={isLoading}
			className={`${getBtnSize()} ${getBtnStyle()} flex justify-center items-center rounded-xl transition-colors shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`}>
			{isLoading ? <Loader2 className="animate-spin"></Loader2> : label}
		</button>
	);
};

export default TextButton;
