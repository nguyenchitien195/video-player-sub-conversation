import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode | string;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx('container mx-auto max-w-[1131px] px-5', className)}>
      {children}
    </div>
  );
}
