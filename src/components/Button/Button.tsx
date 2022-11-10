import clsx from 'clsx';

interface ButtonProps {
  className?: string;
  children: React.ReactNode | string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const { children, className = '', type = 'button', onClick } = props;

  const btnClass = clsx(
    'text-white font-roboto rounded-sm bg-primary py-2 px-4',
    className
  );

  return (
    <button type={type} className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
}
