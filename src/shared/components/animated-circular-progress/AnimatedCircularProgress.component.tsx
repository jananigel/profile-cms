import { useEffect, useState } from 'react';

interface AnimatedCircularProgressProps {
	percentage: number;
	color: string;
	size?: 'sm' | 'md';
}

const AnimatedCircularProgress = ({
	percentage,
	color,
	size = 'md',
}: AnimatedCircularProgressProps) => {
	const radius = size === 'md' ? 40 : 16;
	const circumference = 2 * Math.PI * radius;
	const [offset, setOffset] = useState(circumference);
	const strokeWidth = size === 'md' ? 8 : 3;
	const viewBoxSize = size === 'md' ? 96 : 40;
	const center = viewBoxSize / 2;

	useEffect(() => {
		const timer = setTimeout(() => {
			setOffset(circumference - (percentage / 100) * circumference);
		}, 50);
		return () => clearTimeout(timer);
	}, [percentage, circumference]);

	return (
		<div className="relative" style={{ width: viewBoxSize, height: viewBoxSize }}>
			<svg className="w-full h-full transform -rotate-90">
				<circle
					cx={center}
					cy={center}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="transparent"
					className="text-slate-100"
				/>
				<circle
					cx={center}
					cy={center}
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					style={{
						transition: 'stroke-dashoffset 1s ease-out',
					}}
					strokeLinecap="round"
				/>
			</svg>
			<div
				className={`absolute inset-0 flex items-center justify-center font-bold text-slate-700 ${size === 'md' ? 'text-sm' : 'text-[10px]'}`}>
				{percentage}%
			</div>
		</div>
	);
};

export default AnimatedCircularProgress;
