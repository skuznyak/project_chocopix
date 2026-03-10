import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { CreateOrderPayload } from '@chocopix/shared'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Вкажіть імʼя та прізвище'),
  phone: z.string().min(10, 'Вкажіть коректний номер телефону'),
  email: z.string().email('Некоректний email').optional().or(z.literal('')),
  city: z.string().min(2, 'Вкажіть місто'),
  branch: z.string().min(2, 'Вкажіть відділення або адресу'),
  paymentMethod: z.enum(['online', 'cod', 'card-transfer']),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: (payload: CreateOrderPayload) => Promise<void>
  items: CreateOrderPayload['items']
  promoCode?: string
}

export const CheckoutForm = ({ onSubmit, items, promoCode }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'online',
    },
  })

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit({
          items,
          customer: {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email || undefined,
          },
          delivery: {
            city: values.city,
            branch: values.branch,
            method: 'warehouse',
            estimatedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
          },
          paymentMethod: values.paymentMethod,
          promoCode,
        })
      })}
    >
      <section>
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a98a74] text-lg font-bold text-[#6a4331]">1</div>
          <h2 className="text-[36px] font-medium tracking-[-0.04em] text-[#5e3926]">Контактні дані</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Ваше ім'я" placeholder="Іван" error={errors.fullName?.message} {...register('fullName')} />
          <Input label="Номер телефону" placeholder="+38 (0__) ___ __ __" error={errors.phone?.message} {...register('phone')} />
          <Input label="Email" placeholder="you@email.com" error={errors.email?.message} {...register('email')} />
          <Input label="Місто" placeholder="Київ" error={errors.city?.message} {...register('city')} />
        </div>
      </section>

      <section>
        <div className="mb-5 mt-6 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a98a74] text-lg font-bold text-[#6a4331]">2</div>
          <h2 className="text-[36px] font-medium tracking-[-0.04em] text-[#5e3926]">Спосіб доставки</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#d8c2b0] bg-[#fbf5ea] px-4 py-8 text-center text-[#6b4331] shadow-sm">
            <input type="radio" className="sr-only" checked readOnly />
            <span className="text-sm font-bold uppercase">Нова Пошта</span>
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#eadfcb] bg-[#fbf5ea] px-4 py-8 text-center text-[#6b4331] shadow-sm">
            <input type="radio" className="sr-only" readOnly />
            <span className="text-sm font-bold uppercase">Кур'єр</span>
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#eadfcb] bg-[#fbf5ea] px-4 py-8 text-center text-[#6b4331] shadow-sm">
            <input type="radio" className="sr-only" readOnly />
            <span className="text-sm font-bold uppercase">Самовивіз</span>
          </label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Місто" placeholder="Ваше місто" error={errors.city?.message} {...register('city')} />
          <Input label="Відділення" placeholder="Номер відділення" error={errors.branch?.message} {...register('branch')} />
        </div>
      </section>

      <section>
        <div className="mb-5 mt-6 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a98a74] text-lg font-bold text-[#6a4331]">3</div>
          <h2 className="text-[36px] font-medium tracking-[-0.04em] text-[#5e3926]">Оплата</h2>
        </div>
        <label className="flex flex-col gap-2 text-sm font-semibold text-[#5f3925]">
          <span>Спосіб оплати</span>
          <select
            className="min-h-14 rounded-[18px] border border-[#e3d7c6] bg-[#fbf5ea] px-4 py-3 text-base text-[#5f3925]"
            {...register('paymentMethod')}
          >
            <option value="online">Онлайн-оплата</option>
            <option value="cod">Накладений платіж</option>
            <option value="card-transfer">Переказ на картку</option>
          </select>
        </label>
      </section>

      <div className="pt-4">
        <Button type="submit" className="min-h-16 rounded-[20px] bg-[#7d4a37] px-10 text-lg font-extrabold hover:bg-[#6f4232]" disabled={isSubmitting}>
          {isSubmitting ? 'Обробка...' : 'Підтвердити замовлення'}
        </Button>
      </div>
    </form>
  )
}
