import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  onChangeValue?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  (props: ICheckboxProps, ref) => {
    const {
      checked = false,
      indeterminate = false,
      onChangeValue,
      ...rest
    } = props;

    // const checkboxRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChangeValue && onChangeValue(event.target.checked);
    };

    // useEffect(() => {
    //   if (ref.current) {
    //     ref.current.indeterminate = indeterminate;
    //   }
    // }, [indeterminate]);

    return (
      <label
        className="hover:bg-[#307679]/50 hover:bg- h-10 w-10 grid place-items-center rounded-full cursor-pointer flex-none"
      >
        <input
          ref={ref}
          type="checkbox"
          // checked={checked !== undefined ? checked : undefined}
          onChange={handleChange}
          {...rest}
          className="h-4 w-4 pointer-events-none"
        />
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
