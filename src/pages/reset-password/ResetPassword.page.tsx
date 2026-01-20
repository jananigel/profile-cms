import { ArrowLeft, CheckCircle2, Lock, type LucideIcon } from 'lucide-react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { type RegisterOptions, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../core/constants';
import { AuthCard } from '../../shared/components';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

interface ResetPasswordForm {
	password: string;
	confirmPassword: string;
}

interface FormField {
	name: keyof ResetPasswordForm;
	label: string;
	fieldIcon: LucideIcon;
	setting: RegisterOptions<ResetPasswordForm>;
}

const passwordValidators = {
	hasUppercase: (value: string) =>
		/[A-Z]/.test(value) || 'Must include at least one uppercase letter',
	hasLowercase: (value: string) =>
		/[a-z]/.test(value) || 'Must include at least one lowercase letter',
	hasNumber: (value: string) => /\d/.test(value) || 'Must include at least one number',
	hasSpecialChar: (value: string) =>
		/[^A-Za-z0-9]/.test(value) || 'Must include at least one special character',
};

const form: FormField[] = [
	{
		name: 'password',
		label: '新密碼',
		fieldIcon: Lock as LucideIcon,
		setting: {
			value: '',
			required: { value: true, message: 'This field is required' },
			minLength: { value: 6, message: 'Password must be at least 6 characters' },
			validate: passwordValidators,
		},
	},
	{
		name: 'confirmPassword',
		label: '再次輸入新密碼',
		fieldIcon: Lock as LucideIcon,
		setting: {
			value: '',
			required: { value: true, message: 'This field is required' },
			minLength: { value: 6, message: 'Password must be at least 6 characters' },
			validate: {
				...passwordValidators,
				matchesPassword: (value: string, formValues) =>
					value === formValues.password || '兩次輸入的密碼必須相同',
			},
		},
	},
];

const renderHeader = () => (
	<>
		<div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-100">
			<Lock className="text-white" size={32} />
		</div>
		<h1 className="text-2xl font-bold text-slate-900">重設密碼</h1>
		<p className="text-slate-500 mt-2">請輸入新的密碼並確認，完成後即可重新登入</p>
	</>
);

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const [isResetting, setIsResetting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [autoRedirectToLogin, setAutoRedirectToLogin] = useState(5);
	const {
		formState: { errors },
		register,
		reset,
		handleSubmit,
	} = useForm<ResetPasswordForm>();

	const onSubmit: SubmitHandler<ResetPasswordForm> = (data, event) => {
		event?.preventDefault();
		setIsResetting(true);
		setTimeout(() => {
			setIsResetting(false);
			setIsSuccess(true);
			reset();
		}, 1500);
	};

	useEffect(() => {
		if (!isSuccess) {
			return;
		}

		const timer = setInterval(() => {
			setAutoRedirectToLogin((prev) => {
				if (prev - 1 < 0) {
					clearInterval(timer!);
					return prev;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [isSuccess]);

	useEffect(() => {
		if (autoRedirectToLogin === 0) {
			navigate('/');
		}
	}, [autoRedirectToLogin, navigate]);

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<AuthCard header={renderHeader()}>
					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						{isSuccess && (
							<div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex flex-col gap-1">
								<div className="flex items-center gap-2 font-semibold">
									<CheckCircle2 size={18} />
									密碼已更新完成
								</div>
								<p className="text-xs opacity-80">請使用新密碼重新登入系統。</p>
								<button
									type="button"
									className="text-xs underline font-medium"
									onClick={() => navigate(ROUTES.root)}>
									返回登入頁 ({autoRedirectToLogin} 秒後自動返回登入頁)
								</button>
							</div>
						)}
						{!isSuccess &&
							form.map(({ name, setting, label, fieldIcon }) => {
								const Icon = fieldIcon;
								const fieldRegister = register(name, setting);
								const { ref, onChange, ...fieldProps } = fieldRegister;
								const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
									if (isSuccess) {
										setIsSuccess(false);
									}
									onChange(event);
								};
								return (
									<BaseInput
										key={name}
										type="password"
										autoComplete="new-password"
										placeholder={label}
										leftIcon={<Icon className="text-slate-400" size={18} />}
										error={errors[name]?.message}
										ref={ref}
										onChange={handleInputChange}
										{...fieldProps}
									/>
								);
							})}
						{!isSuccess && (
							<TextButton
								label="更新密碼"
								btnType="submit"
								btnStyle="emerald"
								isDisabled={isResetting}
								isLoading={isResetting}
							/>
						)}
						<button
							type="button"
							className="cursor-pointer w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
							onClick={() => navigate(ROUTES.root)}>
							<ArrowLeft size={16} />
							<span>返回登入</span>
						</button>
					</form>
				</AuthCard>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
