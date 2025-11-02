import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnyObjectSchema } from 'yup'

interface UseFormManagerProps<T extends Record<string, any>>
  extends Omit<UseFormProps<T>, 'resolver'> {
  schema?: AnyObjectSchema
  onSubmit?: (data: T) => void | Promise<void>
}

interface UseFormManagerReturn<T extends Record<string, any>>
  extends Omit<UseFormReturn<T>, 'handleSubmit'> {
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  isSubmitting: boolean
}

export function useFormManager<T extends Record<string, any>>({
  schema,
  onSubmit,
  ...useFormProps
}: UseFormManagerProps<T> = {}): UseFormManagerReturn<T> {
  const formMethods = useForm<T>({
    ...useFormProps,
    resolver: schema ? yupResolver(schema) : undefined
  })

  const {
    handleSubmit: handleSubmitRHF,
    formState: { isSubmitting }
  } = formMethods

  const handleSubmit = handleSubmitRHF(async (data: T) => {
    if (onSubmit) {
      try {
        await onSubmit(data)
      } catch (error) {
        console.error('Erro ao submeter formulário:', error)
        throw error
      }
    }
  })

  return {
    ...formMethods,
    handleSubmit,
    isSubmitting
  }
}
