import {
	cloneElement,
	forwardRef,
	type InputHTMLAttributes,
	type ReactElement,
	type ReactNode,
} from 'react';

type IconElement = ReactElement<{ className?: string }>;

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
	leftIcon?: IconElement;
	error?: ReactNode;
	containerClassName?: string;
	label?: string;
	required?: boolean;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
	(
		{
			leftIcon,
			error,
			label = '',
			containerClassName = '',
			className = '',
			required = false,
			...rest
		},
		ref,
	) => {
		const iconElement = leftIcon
			? cloneElement(leftIcon, {
					className:
						`absolute left-3 top-1/2 -translate-y-1/2 ${leftIcon.props.className ?? ''}`.trim(),
				})
			: null;

		const inputClassName =
			`w-full pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
				leftIcon ? 'pl-10' : 'pl-4'
			} ${className}`.trim();

		return (
			<div className="flex flex-col gap-1.5 w-full">
				{label && <label className="text-sm font-medium text-slate-700">{label}</label>}
				<div className={`space-y-1 ${containerClassName}`.trim()}>
					<div className="relative">
						{iconElement}
						<input ref={ref} className={inputClassName} {...rest} required={required} />
					</div>
					{error ? <p className="text-sm text-[#f00]">{error}</p> : null}
				</div>
			</div>
		);
	},
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
