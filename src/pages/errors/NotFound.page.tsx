import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import IconTextButton from '../../shared/widgets/icon-text-button/IconTextButton.widget';

const NotFound = () => {
	const navigate = useNavigate();
	const routeError = useRouteError();
	const isErrorResponse = isRouteErrorResponse(routeError);
	const statusCode = isErrorResponse ? routeError.status : 404;
	const displayStatus = Number.isFinite(statusCode) ? statusCode : 404;
	const isMissingPage = displayStatus === 404;

	const headline = isMissingPage ? '找不到頁面' : '系統發生錯誤';
	const description = isMissingPage
		? '您想要前往的頁面可能已被移除、名稱改變或暫時無法使用。'
		: '處理您的請求時發生了非預期的情況，請稍後再試試看。';

	const technicalMessage = isErrorResponse
		? `${routeError.status} ${routeError.statusText}`
		: routeError instanceof Error
			? routeError.message
			: typeof routeError === 'string'
				? routeError
				: undefined;

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 flex items-center justify-center px-6 py-16">
			<motion.div
				className="max-w-3xl w-full"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.65, ease: 'easeOut' }}>
				<motion.div
					className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center shadow-2xl"
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}>
					<div className="pointer-events-none absolute inset-0" aria-hidden="true">
						<motion.div
							className="absolute -top-10 right-0 h-48 w-48 rounded-full bg-blue-50 blur-3xl"
							aria-hidden="true"
							animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
							transition={{
								duration: 8,
								repeat: Infinity,
								repeatType: 'mirror',
								ease: 'easeInOut',
							}}
						/>
						<motion.div
							className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-50 blur-3xl"
							aria-hidden="true"
							animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
							transition={{
								duration: 7,
								repeat: Infinity,
								repeatType: 'mirror',
								ease: 'easeInOut',
								delay: 0.5,
							}}
						/>
					</div>
					<motion.div
						className="relative space-y-8"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}>
						<motion.div
							className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500"
							transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
							<motion.span
								className="flex items-center"
								animate={{ scale: [1, 1.12, 1] }}
								transition={{
									duration: 3,
									repeat: Infinity,
									repeatType: 'mirror',
									ease: 'easeInOut',
								}}>
								<AlertTriangle className="text-amber-500" size={16} aria-hidden="true" />
							</motion.span>
							<span>ERROR {displayStatus}</span>
						</motion.div>
						<div className="space-y-3">
							<motion.p
								className="text-7xl font-black tracking-tight text-slate-900"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.25, duration: 0.45, ease: 'easeOut' }}>
								{displayStatus}
							</motion.p>
							<motion.h1
								className="text-3xl font-bold text-slate-900"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}>
								{headline}
							</motion.h1>
							<motion.p
								className="text-base text-slate-500"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.35, duration: 0.35, ease: 'easeOut' }}>
								{description}
							</motion.p>
						</div>
						{technicalMessage && (
							<motion.div
								className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm text-slate-600"
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.45, duration: 0.35, ease: 'easeOut' }}>
								<p className="font-semibold text-slate-700">技術資訊</p>
								<p className="mt-1 whitespace-pre-wrap break-words">{technicalMessage}</p>
							</motion.div>
						)}
						<motion.div
							className="flex flex-col gap-4 sm:flex-row sm:justify-center"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.35, ease: 'easeOut' }}>
							<IconTextButton
								label="上一頁"
								icon={ArrowLeft}
								size="md"
								variant="secondary"
								className="w-full sm:w-auto"
								onClick={() => navigate(-1)}
							/>
						</motion.div>
						<p className="text-xs text-slate-400">若問題持續發生，請聯絡系統管理員協助處理。</p>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default NotFound;
