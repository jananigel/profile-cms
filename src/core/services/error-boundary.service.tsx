import React from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends React.Component<
	React.PropsWithChildren<object>,
	ErrorBoundaryState
> {
	constructor(props: React.PropsWithChildren<object>) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error | null) {
		// update state to trigger the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error | null, errorInfo: React.ErrorInfo) {
		// record the information to the log / Sentry
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 24 }}>
					<h1>系統發生錯誤</h1>
					<p>請重新整理或稍後再試</p>
				</div>
			);
		}

		return this.props.children;
	}
}
