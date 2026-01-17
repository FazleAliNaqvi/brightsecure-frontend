'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, User, Phone, Building2, Briefcase, CreditCard, Check } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { getErrorMessage } from '@/lib/errors';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    id: 'business',
    name: 'Business',
    price: 79,
    lines: 1,
    minutes: 250,
    description: 'Perfect for solo practitioners',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 189,
    lines: 2,
    minutes: 750,
    description: 'For growing practices',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 599,
    lines: 10,
    minutes: 2500,
    description: 'Multi-location clinics',
  },
];

const INDUSTRY_TYPES = [
  { value: 'legal', label: 'Legal / Law Firm' },
  { value: 'medical', label: 'Medical Practice' },
  { value: 'dental', label: 'Dental Office' },
  { value: 'accounting', label: 'Accounting Firm' },
  { value: 'financial', label: 'Financial Advisory' },
  { value: 'chiropractic', label: 'Chiropractic' },
  { value: 'therapy', label: 'Therapy / Counseling' },
  { value: 'veterinary', label: 'Veterinary' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'other', label: 'Other' },
];

const registerSchema = z.object({
  // User fields
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  password_confirm: z.string(),
  // Organization fields
  organization_name: z.string().min(2, 'Organization name is required'),
  industry_type: z.string().min(1, 'Please select an industry'),
  // Plan selection
  plan: z.string().min(1, 'Please select a plan'),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ['password_confirm'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: User info, 2: Organization, 3: Plan

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      plan: 'pro',
      industry_type: '',
    },
  });

  const selectedPlan = watch('plan');

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger(['first_name', 'last_name', 'email', 'phone', 'password', 'password_confirm']);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger(['organization_name', 'industry_type']);
      if (valid) setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Strip formatting from phone number (keep + and digits only)
  const formatPhone = (phone?: string) => {
    if (!phone) return undefined;
    const cleaned = phone.replace(/[^\d+]/g, '');
    return cleaned || undefined;
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: formatPhone(data.phone),
        password: data.password,
        password_confirm: data.password_confirm,
        organization: {
          name: data.organization_name,
          industry_type: data.industry_type,
        },
        plan: data.plan,
      });
      toast.success('Account created! Please verify your email.');
      router.push('/verification-required');
    } catch (error: any) {
      toast.error(getErrorMessage(error, 'Registration failed'));
    }
  };

  return (
    <Card padding="lg" className="animate-fade-in max-w-xl w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-dark">Create your account</h1>
        <p className="mt-2 text-light">Start your 14-day free trial</p>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  step >= s
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    'w-12 h-1 mx-1',
                    step > s ? 'bg-primary-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 mt-2 text-xs text-light">
          <span className={step >= 1 ? 'text-primary-500' : ''}>Your Info</span>
          <span className={step >= 2 ? 'text-primary-500' : ''}>Organization</span>
          <span className={step >= 3 ? 'text-primary-500' : ''}>Select Plan</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 1: User Information */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                placeholder="John"
                leftIcon={<User className="h-5 w-5" />}
                error={errors.first_name?.message}
                {...register('first_name')}
              />
              <Input
                label="Last name"
                placeholder="Doe"
                error={errors.last_name?.message}
                {...register('last_name')}
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="+15551234567"
              hint="Used for 2FA and account recovery"
              leftIcon={<Phone className="h-5 w-5" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              leftIcon={<Lock className="h-5 w-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
              hint="Min 8 characters with uppercase, lowercase, and number"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              leftIcon={<Lock className="h-5 w-5" />}
              error={errors.password_confirm?.message}
              {...register('password_confirm')}
            />

            <div className="pt-2">
              <Button
                type="button"
                className="w-full"
                size="lg"
                onClick={nextStep}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {/* Step 2: Organization Information */}
        {step === 2 && (
          <>
            <Input
              label="Organization / Practice Name"
              placeholder="Smith Law Firm"
              leftIcon={<Building2 className="h-5 w-5" />}
              error={errors.organization_name?.message}
              {...register('organization_name')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  Industry Type
                </div>
              </label>
              <select
                {...register('industry_type')}
                className={cn(
                  'w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                  errors.industry_type ? 'border-red-500' : 'border-gray-300'
                )}
              >
                <option value="">Select your industry...</option>
                {INDUSTRY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.industry_type && (
                <p className="mt-1 text-sm text-red-500">{errors.industry_type.message}</p>
              )}
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                type="button"
                className="flex-1"
                size="lg"
                onClick={nextStep}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {/* Step 3: Plan Selection */}
        {step === 3 && (
          <>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  Select Your Plan
                </div>
              </label>

              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setValue('plan', plan.id)}
                  className={cn(
                    'relative p-4 border-2 rounded-xl cursor-pointer transition-all',
                    selectedPlan === plan.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 right-4 bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                          selectedPlan === plan.id
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        )}
                      >
                        {selectedPlan === plan.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-dark">{plan.name}</div>
                        <div className="text-sm text-light">{plan.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-dark">
                        CAD ${plan.price}<span className="text-sm font-normal text-light">/mo</span>
                      </div>
                      <div className="text-xs text-light">
                        {plan.lines} {plan.lines === 1 ? 'line' : 'lines'} • {plan.minutes} min
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {errors.plan && (
                <p className="text-sm text-red-500">{errors.plan.message}</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-light">14-day free trial</span>
                <span className="font-medium text-dark">No credit card required</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </div>
          </>
        )}
      </form>

      <p className="mt-4 text-xs text-center text-light">
        By signing up, you agree to our{' '}
        <a href="#" className="underline hover:text-dark">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="underline hover:text-dark">Privacy Policy</a>.
      </p>

      <div className="mt-6 text-center text-sm">
        <span className="text-light">Already have an account? </span>
        <Link
          href="/login"
          className="text-primary-500 hover:text-primary-600 font-medium"
        >
          Sign in
        </Link>
      </div>
    </Card>
  );
}
