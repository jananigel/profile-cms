import { useEffect, useState } from 'react';

interface AnimatedArcProgressProp {
	percentage: number;
	color: string;
}

const AnimatedArcProgress = ({ percentage, color }: AnimatedArcProgressProp) => {
	const radius = 70;
	const circumference = Math.PI * radius; // 半圓周長
	const [offset, setOffset] = useState(circumference);

	useEffect(() => {
		const timer = setTimeout(() => {
			setOffset(circumference - (percentage / 100) * circumference);
		}, 100);
		return () => clearTimeout(timer);
	}, [percentage, circumference]);

	return (
		<div className="relative w-48 h-32 flex justify-center items-end">
			<svg width="180" height="100" viewBox="0 0 180 100" className="overflow-visible">
				<path
					d="M 20 85 A 70 70 0 0 1 160 85"
					fill="none"
					stroke="#f1f5f9"
					strokeWidth="12"
					strokeLinecap="round"
				/>
				<path
					d="M 20 85 A 70 70 0 0 1 160 85"
					fill="none"
					stroke={color}
					strokeWidth="12"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
				/>
			</svg>
			<div className="absolute bottom-2 flex flex-col items-center">
				<span className="text-3xl font-black text-slate-800 leading-none">{percentage}%</span>
				<span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
					Completeness
				</span>
			</div>
		</div>
	);
};

export default AnimatedArcProgress;
