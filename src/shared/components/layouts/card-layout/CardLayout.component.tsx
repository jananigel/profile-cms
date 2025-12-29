interface CardLayoutProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

const CardLayout = ({ children, className, style, onClick }: CardLayoutProps) => {
	return (
		<div
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					if (onClick) {
						onClick();
					}
				}
			}}
			onClick={onClick}
			style={style}
			className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
			{children}
		</div>
	);
};

export default CardLayout;
