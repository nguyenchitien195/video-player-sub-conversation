import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

interface RHFFormProviderProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  formId?: string;
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
}

export default function RHFFormProvider<T extends FieldValues>(
  props: RHFFormProviderProps<T>
) {
  const { methods, formId, children, onSubmit } = props;
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
