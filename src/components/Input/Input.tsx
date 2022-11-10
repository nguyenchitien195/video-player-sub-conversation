import clsx from 'clsx';
import {
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  LegacyRef,
} from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  className?: string;
  customClassName?: {
    wrap?: string;
    leftIcon?: string;
    rightIcon?: string;
  };
  icon?: ReactElement;
  rightIcon?: ReactElement;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => {
    const {
      error = false,
      errorMessage,
      className,
      customClassName,
      icon,
      rightIcon,
      value,
      ...rest
    } = props;

    const {
      wrap,
      leftIcon,
      rightIcon: rightIconClass,
    } = customClassName
      ? customClassName
      : { wrap: '', leftIcon: '', rightIcon: '' };

    const wrapClass = clsx(
      'relative flex items-center',
      {
        'border-1 border-red-600': error,
      },
      wrap
    );

    const inputClass = clsx(
      'p-2 focus-visible:outline-[#008FD5] w-full',
      { 'pl-10': icon },
      { 'pr-10': rightIcon },
      className
    );

    return (
      <>
        <div className={wrapClass}>
          {icon && (
            <div
              className={clsx(
                'px-3 absolute top-0 left-0 h-full flex items-center',
                leftIcon
              )}
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            value={value !== undefined ? value : undefined}
            {...rest}
            className={inputClass}
          />
          {rightIcon && (
            <div
              className={clsx(
                'px-3 absolute top-0 right-0 h-full flex items-center',
                rightIconClass
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="text-sm text-red-500 pt-1 pl-1">{errorMessage}</p>
        )}
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
