import clsx from 'clsx';

interface AvatarProps {
  img: string;
  alt?: string;
  className?: string;
}

export default function Avatar(props: AvatarProps) {
  const { img, alt = 'avatar', className = '' } = props;

  return (
    <img className={clsx('rounded-full h-full aspect-square object-cover', className)} src={img} alt={alt} />
  );
}
