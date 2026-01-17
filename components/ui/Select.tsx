'use client';

import { Fragment, forwardRef } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder = 'Select an option',
  error,
  disabled,
  className,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-dark mb-2">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={cn(
              'relative w-full cursor-pointer rounded-lg py-3 pl-4 pr-10 text-left',
              'border transition-colors duration-200',
              'focus:outline-none focus:ring-1',
              disabled && 'opacity-50 cursor-not-allowed',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-border focus:border-dark focus:ring-dark'
            )}
          >
            <span
              className={cn(
                'block truncate',
                selectedOption ? 'text-dark' : 'text-light'
              )}
            >
              {selectedOption?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-5 w-5 text-light" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={cn(
                'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg',
                'bg-white py-1 shadow-airbnb-lg border border-border',
                'focus:outline-none'
              )}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ active, selected }) =>
                    cn(
                      'relative cursor-pointer select-none py-3 pl-10 pr-4',
                      active && 'bg-surface',
                      selected && 'bg-primary-50',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          'block truncate',
                          selected ? 'font-medium text-dark' : 'font-normal'
                        )}
                      >
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}
