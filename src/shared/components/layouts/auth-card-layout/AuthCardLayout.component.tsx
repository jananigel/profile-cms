import clsx from 'clsx';

interface ComponentProps {
	children: React.ReactNode;
	header: React.ReactNode;
}

export const AuthCard = ({ children, header }: ComponentProps) => (
	<div
		className={clsx(
			'bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-500 w-full max-w-md',
		)}>
		<div className="p-8 text-center bg-slate-50 border-b border-slate-100">{header}</div>
		<div className="p-8">{children}</div>
		<div className="p-4 text-center bg-slate-50 border-t border-slate-100">
			<p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
				Portfolio Admin CMS v2.5
			</p>
		</div>
	</div>
);
