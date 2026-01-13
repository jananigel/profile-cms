import clsx from 'clsx';
import { Loader2, type LucideIcon } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonSize = 'full' | 'md';
type ButtonVariant = 'primary' | 'secondary';

interface IconTextButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
	label: string;
	size?: ButtonSize;
	variant?: ButtonVariant;
	isLoading?: boolean;
	icon?: LucideIcon;
}

const sizeClasses: Record<ButtonSize, string> = {
	full: 'w-full py-3',
	md: 'px-4 py-2 text-sm',
};

const variantClasses: Record<ButtonVariant, string> = {
	primary: 'bg-blue-600 text-white font-bold hover:bg-blue-700',
	secondary: 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-700 hover:text-white',
};

const IconTextButton = forwardRef<HTMLButtonElement, IconTextButtonProps>(
	(
		{
			label,
			size = 'full',
			variant = 'primary',
			isLoading = false,
			icon = undefined,
			disabled,
			onClick,
			className,
			...rest
		},
		ref,
	) => {
		const isDisabled = disabled || isLoading;
		const Icon = icon ?? undefined;
		return (
			<button
				ref={ref}
				type="button"
				{...rest}
				disabled={isDisabled}
				aria-disabled={isDisabled}
				aria-busy={isLoading}
				onClick={isDisabled ? undefined : onClick}
				className={clsx(
					sizeClasses[size],
					variantClasses[variant],
					'flex items-center justify-center gap-2 rounded-xl transition-colors shadow-lg shadow-blue-200',
					'disabled:cursor-not-allowed disabled:opacity-60',
					className,
				)}>
				{isLoading ? (
					<>
						<Loader2 className="animate-spin" aria-hidden />
						<span className="sr-only">Loading</span>
					</>
				) : (
					<div className="flex gap-2 items-center justify-center">
						{Icon && <Icon />}
						<span>{label}</span>
					</div>
				)}
			</button>
		);
	},
);

IconTextButton.displayName = 'IconTextButton';

export default IconTextButton;
