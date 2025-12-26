export interface MainLayoutContextVal {
	activeNav: string;
	setActiveNav: React.Dispatch<React.SetStateAction<string>>;

	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
