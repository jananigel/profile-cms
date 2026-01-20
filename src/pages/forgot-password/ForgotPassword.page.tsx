import { AlertCircle, ArrowLeft, CheckCircle2, type LucideIcon, Mail } from 'lucide-react';
import { useState } from 'react';
import { type RegisterOptions, type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../core/constants';
import { AuthCard } from '../../shared/components';
import BaseInput from '../../shared/components/base-input/BaseInput.component';
import TextButton from '../../shared/widgets/text-button/TextButton.widget';

interface ForgotPasswordForm {
	email: string;
}

interface FormField {
	name: keyof ForgotPasswordForm;
	label: string;
	fieldIcon: LucideIcon;
	setting: RegisterOptions<ForgotPasswordForm>;
}

const form: FormField[] = [
	{
		name: 'email',
		label: '輸入您的 Email',
		fieldIcon: Mail as LucideIcon,
		setting: {
			value: '',
			required: { value: true, message: 'This field is required' },
			pattern: {
				value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: 'Please enter a valid email address',
			},
		},
	},
];

const pageHeader = () => {
	return (
		<>
			<div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-100">
				<Mail className="text-white" size={32} />
			</div>
			<h1 className="text-2xl font-bold text-slate-900">忘記密碼</h1>
			<p className="text-slate-500 mt-2">請輸入您的註冊 Email 來重設密碼</p>
		</>
	);
};

const ForgotPasswordPage = () => {
	const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const navigator = useNavigate();
	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<ForgotPasswordForm>();

	const onSubmit: SubmitHandler<ForgotPasswordForm> = (data, e) => {
		e?.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			if (data.email === 'admin@mail.com') {
				setMessage({
					type: 'success',
					text: '重設連結已發送',
				});
			} else {
				setMessage({
					type: 'error',
					text: '找不到此 Email 關聯的帳號',
				});
			}
			setIsLoading(false);
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				<AuthCard header={pageHeader()}>
					<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
						{message && (
							<div
								className={`px-4 py-3 rounded-lg text-sm border flex flex-col gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
								<div className="flex items-center gap-2 font-medium">
									{message.type === 'error' ? (
										<AlertCircle size={16} />
									) : (
										<CheckCircle2 size={16} />
									)}
									{message.text}
								</div>
								{message.type === 'success' && (
									<button
										type="button"
										className="text-xs underline text-left opacity-80"
										onClick={() => navigator(ROUTES.resetPassword)}>
										點此進入重設密碼頁面
									</button>
								)}
							</div>
						)}
						{form.map(({ name, setting, label, fieldIcon }) => {
							const Icon = fieldIcon;
							const fieldRegister = register(name, setting);
							const { ref, onChange, ...fieldProps } = fieldRegister;
							const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
								setMessage(undefined);
								onChange(event);
							};
							return (
								<BaseInput
									key={name}
									type="text"
									{...fieldProps}
									placeholder={label}
									ref={ref}
									onChange={handleInputChange}
									error={errors[name]?.message}
									leftIcon={<Icon className="text-slate-400" />}
								/>
							);
						})}
						<TextButton
							label={'發送重設連結'}
							isLoading={isLoading}
							isDisabled={isLoading}
							btnType="submit"
							btnStyle={'amber'}></TextButton>
						<button className="cursor-pointer w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors mt-4">
							<ArrowLeft></ArrowLeft>
							<span>返回登入</span>
						</button>
					</form>
				</AuthCard>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
