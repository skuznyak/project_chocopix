import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Truck, Bike, Package, Wallet, Phone, MessageCircle, PhoneOff } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { CreateOrderPayload } from '@chocopix/shared'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AreaSelect } from '@/components/checkout/AreaSelect'
import { CitySelect } from '@/components/checkout/CitySelect'
import { BranchSelect } from '@/components/checkout/BranchSelect'
import { useCart } from '@/hooks/useCart'

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Вкажіть імʼя та прізвище'),
  phone: z.string().min(10, 'Вкажіть коректний номер телефону'),
  email: z.string().email('Некоректний email').optional().or(z.literal('')),
  areaRef: z.string().optional(),
  area: z.string().optional(),
  cityRef: z.string().optional(),
  city: z.string().optional(),
  branchRef: z.string().optional(),
  branch: z.string().min(2, 'Вкажіть відділення або адресу'),
  paymentMethod: z.enum(['cod', 'card-transfer']),
  contactMethod: z.object({
    noCall: z.boolean().default(false),
    messenger: z.boolean().default(false),
    phoneCall: z.boolean().default(false),
  }).optional(),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: (payload: CreateOrderPayload) => Promise<void>
  items: CreateOrderPayload['items']
  promoCode?: string
}

export const CheckoutForm = ({ onSubmit, items, promoCode }: CheckoutFormProps) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'warehouse' | 'courier'>('warehouse')
  const [areaRef, setAreaRef] = useState<string>('')
  const [cityRef, setCityRef] = useState<string>('')
  const [contactMethod, setContactMethod] = useState({
    noCall: false,
    messenger: true,
    phoneCall: false,
  })
  const [comment, setComment] = useState<string>('')
  const [contactError, setContactError] = useState<string>('')
  
  const { totals } = useCart()

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card-transfer',
      area: '',
      areaRef: '',
      city: '',
      cityRef: '',
      branch: '',
      branchRef: '',
    },
  })

  const watchedPaymentMethod = watch('paymentMethod')
  const watchedCityRef = watch('cityRef')
  const watchedBranchRef = watch('branchRef')

  // Автоматична зміна contactMethod при зміні методу оплати
  useEffect(() => {
    if (watchedPaymentMethod === 'cod') {
      setContactMethod({
        noCall: true,
        messenger: false,
        phoneCall: false,
      })
    } else if (watchedPaymentMethod === 'card-transfer') {
      setContactMethod({
        noCall: false,
        messenger: true,
        phoneCall: false,
      })
    }
  }, [watchedPaymentMethod])

  // Оновлення contactMethod при зміні методу оплати
  const updateContactMethod = (method: 'noCall' | 'messenger' | 'phoneCall') => {
    setContactMethod({
      noCall: method === 'noCall',
      messenger: method === 'messenger',
      phoneCall: method === 'phoneCall',
    })
    setContactError('')
  }

  // Валідація перед відправкою
  const validateContactMethod = () => {
    if (!contactMethod.noCall && !contactMethod.messenger && !contactMethod.phoneCall) {
      setContactError("Оберіть спосіб зв'язку")
      return false
    }
    return true
  }

  return (
    <form
      className="space-y-8 pb-8 md:pb-0"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        if (!validateContactMethod()) {
          return
        }
        await onSubmit({
          items,
          customer: {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email || undefined,
          },
          delivery: {
            city: values.city || '',
            cityRef: values.cityRef || '',
            branch: values.branch,
            branchRef: values.branchRef || '',
            region: values.area || '',
            method: deliveryMethod,
            estimatedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
          },
          paymentMethod: values.paymentMethod,
          promoCode,
          contactMethod: (values.paymentMethod === 'cod' || values.paymentMethod === 'card-transfer') ? contactMethod : undefined,
          comment: comment || undefined,
          total: totals.total,
          subtotal: totals.subtotal,
          discount: totals.discount,
        })
      })}
    >
      <section>
        <div className="mb-5 flex items-center gap-3 sm:gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#a98a74] text-base font-bold text-[#6a4331] sm:h-10 sm:w-10 sm:text-lg">1</div>
          <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#5e3926] sm:text-[36px]">Контактні дані</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Ім'я та прізвище" placeholder="Олена Петренко" error={errors.fullName?.message} {...register('fullName')} />
          <Input label="Номер телефону" placeholder="+38 (0__) ___ __ __" error={errors.phone?.message} {...register('phone')} />
          <Input label="Email" placeholder="you@email.com" error={errors.email?.message} {...register('email')} />
        </div>
      </section>

      <section>
        <div className="mb-5 mt-6 flex items-center gap-3 sm:gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#a98a74] text-base font-bold text-[#6a4331] sm:h-10 sm:w-10 sm:text-lg">2</div>
          <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#5e3926] sm:text-[36px]">Спосіб доставки</h2>
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
            <AreaSelect
              value={areaRef}
              onChange={(ref, description) => {
                setAreaRef(ref)
                setValue('areaRef', ref)
                setValue('area', description)
                setCityRef('')
                setValue('cityRef', '')
                setValue('city', '')
                setValue('branchRef', '')
                setValue('branch', '')
              }}
              error={errors.areaRef?.message}
            />
            <CitySelect
              areaRef={areaRef}
              value={cityRef}
              onChange={(ref, description) => {
                setCityRef(ref)
                setValue('cityRef', ref)
                setValue('city', description)
                setValue('branchRef', '')
                setValue('branch', '')
              }}
              error={errors.cityRef?.message}
              disabled={!areaRef}
            />
            <BranchSelect
              cityRef={watchedCityRef}
              value={watchedBranchRef}
              onChange={(ref, description) => {
                setValue('branchRef', ref)
                setValue('branch', description)
              }}
              error={errors.branch?.message}
              disabled={!watchedCityRef}
            />
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <AreaSelect
              value={areaRef}
              onChange={(ref, description) => {
                setAreaRef(ref)
                setValue('areaRef', ref)
                setValue('area', description)
                setCityRef('')
                setValue('cityRef', '')
                setValue('city', '')
              }}
              error={errors.areaRef?.message}
            />
            <CitySelect
              areaRef={areaRef}
              value={cityRef}
              onChange={(ref, description) => {
                setCityRef(ref)
                setValue('cityRef', ref)
                setValue('city', description)
              }}
              error={errors.cityRef?.message}
              disabled={!areaRef}
            />
            <Input label="Адреса доставки" placeholder="Вулиця, будинок, квартира" error={errors.branch?.message} {...register('branch')} />
          </div>
        )}
      </section>

      <section>
        <div className="mb-5 mt-6 flex items-center gap-3 sm:gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#a98a74] text-base font-bold text-[#6a4331] sm:h-10 sm:w-10 sm:text-lg">3</div>
          <h2 className="text-[28px] font-medium tracking-[-0.04em] text-[#5e3926] sm:text-[36px]">Оплата</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#eadfcb] bg-[#fbf5ea] px-4 py-6 text-center text-[#6b4331] shadow-sm transition hover:border-[#7d4a37] hover:bg-[#f5ebe0] has-[:checked]:border-[#7d4a37] has-[:checked]:bg-[#f0e4d4]">
            <input
              type="radio"
              className="sr-only"
              value="card-transfer"
              checked={watchedPaymentMethod === 'card-transfer'}
              {...register('paymentMethod')}
            />
            <Wallet size={32} className="mb-2 text-[#7d4a37]" />
            <span className="text-xs font-bold uppercase">Переказ на картку</span>
          </label>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[22px] border border-[#d8c2b0] bg-[#fbf5ea] px-4 py-6 text-center text-[#6b4331] shadow-sm transition hover:border-[#7d4a37] hover:bg-[#f5ebe0] has-[:checked]:border-[#7d4a37] has-[:checked]:bg-[#f0e4d4]">
            <input
              type="radio"
              className="sr-only"
              value="cod"
              checked={watchedPaymentMethod === 'cod'}
              {...register('paymentMethod')}
            />
            <Package size={32} className="mb-2 text-[#7d4a37]" />
            <span className="text-xs font-bold uppercase">Накладений платіж</span>
          </label>
        </div>
        {(watchedPaymentMethod === 'cod' || watchedPaymentMethod === 'card-transfer') && (
          <div className="mt-6 rounded-[24px] border border-[#eadfcb] bg-[#fbf5ea]/70 p-5">
            <p className="text-sm font-semibold text-[#5f3925]">Як з вами зв'язатися?</p>
            <div className="mt-4 space-y-3">
              {watchedPaymentMethod === 'cod' && (
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={contactMethod.noCall}
                      onChange={() => updateContactMethod('noCall')}
                    />
                    <div className="relative flex h-6 w-6 items-center justify-center rounded-[8px] border-2 border-[#c79263] bg-[#f5f5f5] transition-all peer-checked:border-[#8c5328] peer-checked:bg-[#8c5328] after:absolute after:h-2.5 after:w-1.5 after:-translate-y-px after:rotate-45 after:border-b-[2.5px] after:border-r-[2.5px] after:border-white after:opacity-0 after:transition-opacity peer-checked:after:opacity-100 after:content-['']" />
                  </div>
                  <PhoneOff size={20} className="text-[#7d4a37]" />
                  <span className="text-sm text-[#5f3925]">Не дзвонити мені</span>
                </label>
              )}
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={contactMethod.messenger}
                    onChange={() => updateContactMethod('messenger')}
                  />
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-[8px] border-2 border-[#c79263] bg-[#f5f5f5] transition-all peer-checked:border-[#8c5328] peer-checked:bg-[#8c5328] after:absolute after:h-2.5 after:w-1.5 after:-translate-y-px after:rotate-45 after:border-b-[2.5px] after:border-r-[2.5px] after:border-white after:opacity-0 after:transition-opacity peer-checked:after:opacity-100 after:content-['']" />
                </div>
                <MessageCircle size={20} className="text-[#7d4a37]" />
                <span className="text-sm text-[#5f3925]">
                  {watchedPaymentMethod === 'card-transfer'
                    ? 'Надіслати реквізити для оплати в месенджер (Viber / Telegram / WhatsApp)'
                    : 'Написати в месенджер (Viber / Telegram / WhatsApp)'}
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={contactMethod.phoneCall}
                    onChange={() => updateContactMethod('phoneCall')}
                  />
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-[8px] border-2 border-[#c79263] bg-[#f5f5f5] transition-all peer-checked:border-[#8c5328] peer-checked:bg-[#8c5328] after:absolute after:h-2.5 after:w-1.5 after:-translate-y-px after:rotate-45 after:border-b-[2.5px] after:border-r-[2.5px] after:border-white after:opacity-0 after:transition-opacity peer-checked:after:opacity-100 after:content-['']" />
                </div>
                <Phone size={20} className="text-[#7d4a37]" />
                <span className="text-sm text-[#5f3925]">Подзвонити мені</span>
              </label>
            </div>
            {contactError && (
              <p className="mt-3 text-sm text-rose-600 font-medium">{contactError}</p>
            )}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-[#5f3925]">Коментар до замовлення</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Напишіть ваші побажання або коментар..."
                rows={3}
                className="mt-2 w-full rounded-[18px] border border-[#ddd9d5] bg-[#f5f5f5] px-4 py-3 text-sm text-[#2d1f1a] placeholder:text-[#9a8b7f] outline-none focus:border-[#c79263] focus:ring-2 focus:ring-[#ead3bb] transition"
              />
              <p className="mt-2 text-xs text-[#8a6b59]">Наприклад: "Не дзвоніть, напишіть у Viber" або інше побажання</p>
            </div>
          </div>
        )}
      </section>

      <div className="hidden pt-4 md:block">
        <Button type="submit" className="min-h-16 w-full rounded-[20px] bg-[#7d4a37] px-10 text-lg font-extrabold hover:bg-[#6f4232] sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? 'Обробка...' : 'Підтвердити замовлення'}
        </Button>
      </div>

      <div className="sticky bottom-4 z-30 rounded-[24px] border border-[#e6dac6] bg-[#f4eddc]/95 px-4 py-3 shadow-[0_18px_40px_rgba(92,55,28,0.14)] backdrop-blur supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Button type="submit" className="min-h-14 w-full rounded-[16px] bg-[#7d4a37] px-6 text-base font-extrabold hover:bg-[#6f4232]" disabled={isSubmitting}>
          {isSubmitting ? 'Обробка...' : 'Підтвердити замовлення'}
        </Button>
      </div>
    </form>
  )
}
