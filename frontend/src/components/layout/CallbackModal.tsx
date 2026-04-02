import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { CheckCircle2, MessageSquareText, Phone, User, X } from 'lucide-react'
import { createCallbackRequest } from '@/api/callback'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

const callbackSchema = z.object({
  name: z.string().min(2, 'Вкажіть імʼя'),
  phone: z.string().min(10, 'Вкажіть номер телефону'),
  comment: z.string().max(250, 'До 250 символів').optional(),
})

type CallbackFormValues = z.infer<typeof callbackSchema>

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CallbackModal = ({ isOpen, onClose }: CallbackModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackSchema),
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="max-w-[440px] p-0 md:p-0">
      {isSuccess ? (
        <div className="rounded-[34px] bg-[#f8f1e4] p-6 text-center md:p-7">
          <CheckCircle2 className="mx-auto h-14 w-14 text-[#8b4f2c]" />
          <h3 className="mt-4 text-4xl font-semibold uppercase tracking-[-0.03em] text-[#5a3625]">Готово</h3>
          <p className="mx-auto mt-3 max-w-md text-base text-[#7d4d35]">
            Ми отримали заявку і передзвонимо вам найближчим часом.
          </p>
          <Button
            className="mt-6 bg-[#8b4f2c] hover:bg-[#764125]"
            onClick={() => {
              setIsSuccess(false)
              reset()
              onClose()
            }}
          >
            Закрити
          </Button>
        </div>
      ) : (
        <div className="relative rounded-[34px] bg-[#f8f1e4] p-6 md:p-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-black transition hover:bg-black/5"
            aria-label="Закрити"
          >
            <X size={20} />
          </button>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fbf5ea] text-[#a96f45]">
            <Phone size={24} />
          </div>
          <h3 className="mt-7 text-center text-[26px] font-medium uppercase tracking-[-0.04em] text-[#6a4331] md:text-[30px]">
            Замовити дзвінок
          </h3>
          <p className="mx-auto mt-3 max-w-md text-center text-[15px] leading-7 text-[#7d6558]">
            Залиште ваші контакти і ми зв'яжемося з вами найближчим часом
          </p>
          <form
            className="mt-7 space-y-4"
            onSubmit={handleSubmit(async (values) => {
              try {
                setSubmitError(null)
                await createCallbackRequest(values)
                setIsSuccess(true)
              } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 500) {
                  setSubmitError('Не вдалося надіслати заявку. Спробуйте ще раз трохи пізніше.')
                  return
                }

                setSubmitError('Не вдалося надіслати заявку. Спробуйте ще раз.')
              }
            })}
          >
            <label className="flex flex-col gap-2">
              <div className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[#fbf5ea] px-4">
                <User size={20} className="text-[#6a4331]" />
                <input
                  placeholder="Ваше ім'я"
                  className="w-full bg-transparent text-lg text-[#5f3925] outline-none placeholder:text-[#9d9792]"
                  {...register('name')}
                />
              </div>
              {errors.name ? <span className="text-xs text-rose-600">{errors.name.message}</span> : null}
            </label>
            <label className="flex flex-col gap-2">
              <div className="flex min-h-14 items-center gap-3 rounded-[18px] bg-[#fbf5ea] px-4">
                <Phone size={20} className="text-[#6a4331]" />
                <input
                  placeholder="+38 (0__) ___ __ __"
                  className="w-full bg-transparent text-lg text-[#5f3925] outline-none placeholder:text-[#9d9792]"
                  {...register('phone')}
                />
              </div>
              {errors.phone ? <span className="text-xs text-rose-600">{errors.phone.message}</span> : null}
            </label>
            <label className="flex flex-col gap-2">
              <div className="flex gap-3 rounded-[18px] bg-[#fbf5ea] px-4 py-4">
                <MessageSquareText size={20} className="mt-1 text-[#6a4331]" />
                <textarea
                  rows={4}
                  placeholder="Коментар або запитання"
                  className="w-full resize-none bg-transparent text-lg text-[#5f3925] outline-none placeholder:text-[#9d9792]"
                  {...register('comment')}
                />
              </div>
              {errors.comment ? <span className="text-xs text-rose-600">{errors.comment.message}</span> : null}
            </label>
            {submitError ? <p className="text-sm text-rose-600">{submitError}</p> : null}
            <Button
              type="submit"
              fullWidth
              className="mt-2 min-h-14 rounded-[20px] bg-[#7d4a37] text-[18px] font-extrabold hover:bg-[#6f4232]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Надсилаємо...' : 'Передзвоніть мені'}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  )
}
