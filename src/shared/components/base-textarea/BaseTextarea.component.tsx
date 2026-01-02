import { forwardRef, type ReactNode, type TextareaHTMLAttributes } from 'react';

interface BaseTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: ReactNode;
	containerClassName?: string;
	label?: string;
	rows?: number;
}

const BaseTextArea = forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
	({ containerClassName, className, label, rows, error, ...rest }, ref) => {
		return (
			<div className={`flex flex-col gap-1.5 w-full ${containerClassName}`.trim()}>
				<label className="text-sm font-medium text-slate-700">{label}</label>
				<textarea
					{...rest}
					ref={ref}
					rows={rows || 3}
					className={`px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all ${className}`}
				/>
				{error ? <p className="text-sm text-[#f00]">{error}</p> : null}
			</div>
		);
	},
);

export default BaseTextArea;
