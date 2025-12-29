import type { LucideIcon } from 'lucide-react';

export interface DashboardStatCard {
	label: string;
	icon: LucideIcon;
	iconBg: string;
	iconColor: string;
	value: number;
	path: string;
	tab: string;
}
