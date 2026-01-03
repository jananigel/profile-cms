import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';

interface BaseSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	error?: ReactNode;
	containerClassName?: string;
	label?: string;
	options?: { key: string; label: string }[];
	className?: string;
}

const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
	({ label, options, className, containerClassName, ...rest }, ref) => (
		<div className={`flex flex-col gap-1.5 w-full ${containerClassName}`.trim()}>
			<label className="text-sm font-medium text-slate-700">{label}</label>
			<select
				{...rest}
				ref={ref}
				className={`px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all ${className}`}>
				{options &&
					options.map((opt) => (
						<option key={opt.key} value={opt.key}>
							{opt.label}
						</option>
					))}
			</select>
		</div>
	),
);

export default BaseSelect;
