import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Truck, Bike, Package, Wallet } from 'lucide-react'
import { useState } from 'react'
import type { CreateOrderPayload } from '@chocopix/shared'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Вкажіть імʼя та прізвище'),
  phone: z.string().min(10, 'Вкажіть коректний номер телефону'),
  email: z.string().email('Некоректний email').optional().or(z.literal('')),
  region: z.string().min(2, 'Вкажіть область').optional(),
  city: z.string().min(2, 'Вкажіть населений пункт').optional(),
  branch: z.string().min(2, 'Вкажіть відділення або адресу'),
  paymentMethod: z.enum(['cod', 'card-transfer']),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: (payload: CreateOrderPayload) => Promise<void>
  items: CreateOrderPayload['items']
  promoCode?: string
}

export const CheckoutForm = ({ onSubmit, items, promoCode }: CheckoutFormProps) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'warehouse' | 'courier'>('warehouse')
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cod',
    },
  })

  const watchedPaymentMethod = watch('paymentMethod')

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
            city: values.city || '',
            branch: values.branch,
            method: deliveryMethod,
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
          <Input label="Ім'я та прізвище" placeholder="Іван Петренко" error={errors.fullName?.message} {...register('fullName')} />
          <Input label="Номер телефону" placeholder="+38 (0__) ___ __ __" error={errors.phone?.message} {...register('phone')} />
          <Input label="Email" placeholder="you@email.com" error={errors.email?.message} {...register('email')} />
        </div>
      </section>

      <section>
        <div className="mb-5 mt-6 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a98a74] text-lg font-bold text-[#6a4331]">2</div>
          <h2 className="text-[36px] font-medium tracking-[-0.04em] text-[#5e3926]">Спосіб доставки</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#d8c2b0] bg-[#fbf5ea] px-4 py-8 text-center text-[#6b4331] shadow-sm transition hover:border-[#7d4a37] hover:bg-[#f5ebe0] has-[:checked]:border-[#7d4a37] has-[:checked]:bg-[#f0e4d4]">
            <input
              type="radio"
              className="sr-only"
              name="delivery"
              value="warehouse"
              checked={deliveryMethod === 'warehouse'}
              onChange={() => setDeliveryMethod('warehouse')}
            />
            <Truck size={48} className="mb-3 text-[#7d4a37]" />
            <span className="mt-3 text-sm font-bold uppercase">Нова Пошта</span>
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#eadfcb] bg-[#fbf5ea] px-4 py-8 text-center text-[#6b4331] shadow-sm transition hover:border-[#7d4a37] hover:bg-[#f5ebe0] has-[:checked]:border-[#7d4a37] has-[:checked]:bg-[#f0e4d4]">
            <input
              type="radio"
              className="sr-only"
              name="delivery"
              value="courier"
              checked={deliveryMethod === 'courier'}
              onChange={() => setDeliveryMethod('courier')}
            />
            <Bike size={48} className="mb-3 text-[#7d4a37]" />
            <span className="mt-3 text-sm font-bold uppercase">Кур'єр</span>
          </label>
        </div>
        {deliveryMethod === 'warehouse' ? (
          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Область" placeholder="Ваша область" error={errors.region?.message} {...register('region')} />
              <Input label="Населений пункт" placeholder="Ваше місто" error={errors.city?.message} {...register('city')} />
            </div>
            <Input label="Номер відділення" placeholder="№ відділення" error={errors.branch?.message} {...register('branch')} />
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Область" placeholder="Ваша область" error={errors.region?.message} {...register('region')} />
              <Input label="Населений пункт" placeholder="Ваше місто" error={errors.city?.message} {...register('city')} />
            </div>
            <Input label="Адреса доставки" placeholder="Вулиця, будинок, квартира" error={errors.branch?.message} {...register('branch')} />
          </div>
        )}
      </section>

      <section>
        <div className="mb-5 mt-6 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a98a74] text-lg font-bold text-[#6a4331]">3</div>
          <h2 className="text-[36px] font-medium tracking-[-0.04em] text-[#5e3926]">Оплата</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#d8c2b0] bg-[#fbf5ea] px-4 py-6 text-center text-[#6b4331] shadow-sm transition hover:border-[#7d4a37] hover:bg-[#f5ebe0] has-[:checked]:border-[#7d4a37] has-[:checked]:bg-[#f0e4d4]">
            <input
              type="radio"
              className="sr-only"
              name="payment"
              value="cod"
              checked={watchedPaymentMethod === 'cod'}
              {...register('paymentMethod')}
            />
            <Package size={32} className="mb-2 text-[#7d4a37]" />
            <span className="text-xs font-bold uppercase">Накладений платіж</span>
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#eadfcb] bg-[#fbf5ea] px-4 py-6 text-center text-[#6b4331] shadow-sm transition hover:border-[#7d4a37] hover:bg-[#f5ebe0] has-[:checked]:border-[#7d4a37] has-[:checked]:bg-[#f0e4d4]">
            <input
              type="radio"
              className="sr-only"
              name="payment"
              value="card-transfer"
              checked={watchedPaymentMethod === 'card-transfer'}
              {...register('paymentMethod')}
            />
            <Wallet size={32} className="mb-2 text-[#7d4a37]" />
            <span className="text-xs font-bold uppercase">Переказ на картку</span>
          </label>
        </div>
      </section>

      <div className="pt-4">
        <Button type="submit" className="min-h-16 rounded-[20px] bg-[#7d4a37] px-10 text-lg font-extrabold hover:bg-[#6f4232]" disabled={isSubmitting}>
          {isSubmitting ? 'Обробка...' : 'Підтвердити замовлення'}
        </Button>
      </div>
    </form>
  )
}
