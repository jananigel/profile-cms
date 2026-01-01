import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface BaseCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string;
	error?: ReactNode;
}

const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(
	({ label, error, className = '', ...rest }, ref) => {
		return (
			<div className="relative">
				<label className="flex items-center gap-2 cursor-pointer group">
					<input
						ref={ref}
						type="checkbox"
						className={`w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer ${className}`.trim()}
						{...rest}
					/>
					<span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
						{label}
					</span>
				</label>
				{error ? <p className="text-sm text-[#f00]">{error}</p> : null}
			</div>
		);
	},
);

BaseCheckbox.displayName = 'BaseCheckbox';

export default BaseCheckbox;
