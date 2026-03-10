# ТЗ: Лендінг-сайт «Шоколадні бомбочки з маршмелоу»

**Версія:** 1.1 (Node.js backend-ready)
**Дата:** 2026-03-09
**Стек:** React 18 + Vite + TypeScript + Tailwind CSS + Node.js (Express/Fastify)

---

## 1. Загальний опис проєкту

Одностороній лендінг-сайт для продажу шоколадних бомбочок з маршмелоу. Сайт повинен бути легким, адаптивним, сучасним, з WOW-ефектом для залучення покупців.

---

## 2. Технічний стек

### Frontend
| Технологія | Призначення |
|---|---|
| React 18 | UI-фреймворк |
| Vite | Збірка проєкту |
| TypeScript | Типізація (спільні типи з бекендом) |
| Tailwind CSS | Стилізація |
| React Router v6 | Роутинг між сторінками |
| Zustand | Стан кошика (cart store) |
| Framer Motion | Анімації та 3D-ефекти |
| Three.js / React Three Fiber | 3D Bounty-ефект |
| React Hook Form + Zod | Форма оформлення замовлення |
| Axios | HTTP-запити до Node.js API |
| TanStack Query (React Query) | Кешування запитів до API |

### Backend (Node.js)
| Технологія | Призначення |
|---|---|
| Node.js 20+ | Runtime |
| Express.js або Fastify | HTTP-фреймворк |
| TypeScript | Типізація |
| Prisma | ORM для бази даних |
| PostgreSQL | База даних (замовлення, товари) |
| Zod | Валідація запитів на бекенді |
| dotenv | Змінні середовища (.env) |
| cors | CORS між фронтом і бекендом |
| helmet | Базова безпека |

---

## 3. Структура сторінок (роутинг)

```
/                    → Головна (лендінг)
/product/:id         → Сторінка товару
/cart                → Кошик
/checkout            → Оформлення замовлення
/order-success       → Підтвердження замовлення
```

---

## 4. Структура головної сторінки (`/`)

### 4.1 Hero-секція
- Повноекранний банер із 3D-анімацією шоколадної бомбочки (React Three Fiber)
- **Bounty 3D-ефект**: бомбочка обертається при скролі/наведенні миші, відблиски шоколаду, пар при розчиненні
- Заголовок: «Шоколадні бомбочки з маршмелоу» + підзаголовок
- CTA-кнопка «Обрати смак» → плавний скрол до каталогу
- Партикли (сніжинки або крихти шоколаду) на фоні

### 4.2 Переваги (USP)
- 4 іконки з перевагами: «Ручна робота», «Натуральний склад», «Доставка по Україні», «Ідеальний подарунок»
- Анімація появи при скролі (Framer Motion)

### 4.3 Каталог товарів
- Grid-сітка карток: 3 колонки (desktop) / 2 (tablet) / 1 (mobile)
- Фільтрація за смаком / набором / ціною
- Сортування: за популярністю, за ціною (зростання/спадання)
- Lazy loading зображень

### 4.4 Як це працює
- Секція з 3 кроками: «Кидаєш бомбочку в гаряче молоко» → «Чекаєш 30 секунд» → «Насолоджуєшся»
- Анімовані іконки

### 4.5 Відгуки покупців
- Карусель відгуків з фото, ім'ям, оцінкою (5 зірок)
- Авто-прокрутка + ручна навігація

### 4.6 FAQ
- Акордеон з відповідями на популярні питання
- «Як зберігати?», «Склад», «Чи можна дітям?» тощо

### 4.7 Footer
- Логотип, соцмережі (Instagram, TikTok, Facebook)
- Контакти (телефон, email)
- Посилання: Умови повернення, Політика конфіденційності

---

## 5. Картка товару (компонент)

### Відображення в каталозі:
- Фото товару (квадратне, з hover-zoom ефектом)
- Назва товару
- Короткий опис (1 рядок)
- Ціна (грн)
- Рейтинг (зірочки)
- Кнопка «В кошик» + кнопка «Детальніше»
- Бейдж «Хіт» / «Новинка» / «Знижка» (опціонально)

---

## 6. Сторінка товару (`/product/:id`)

- **Галерея фото**: головне фото + 3-5 мініатюр знизу, клік → збільшення (lightbox)
- **3D-preview**: можливість прокрутити товар в 3D (React Three Fiber, опціонально)
- Назва, опис (розгорнутий), склад, вага, смак
- Ціна + кількість (+ / -)
- Кнопка «Додати в кошик» (анімація додавання)
- Кнопка «Купити зараз» → одразу на `/checkout`
- Блок «З цим також купують» (схожі товари)
- Хлібні крихти: Головна > Каталог > Назва товару

---

## 7. Кошик (`/cart`)

- Список доданих товарів: фото, назва, ціна, кількість (редагується), кнопка видалення
- Підсумок: сума товарів + вартість доставки (якщо менше порогу — безкоштовна)
- Промокод (поле вводу + застосування знижки)
- Кнопка «Оформити замовлення» → `/checkout`
- Кнопка «Продовжити покупки» → назад до каталогу
- Якщо кошик порожній → ілюстрація + CTA «Перейти до каталогу»
- **Іконка кошика в хедері** із лічильником кількості товарів (бейдж)

---

## 8. Оформлення замовлення (`/checkout`)

### 8.1 Форма покупця
- Ім'я та прізвище (обов'язково)
- Номер телефону (обов'язково, маска +38 (0XX) XXX-XX-XX)
- Email (опціонально)

### 8.2 Доставка — Нова Пошта
- Вибір міста (автокомпліт через API Нової Пошти або статичний список)
- Вибір відділення / поштомату (залежить від міста)
- Або «Кур'єрська доставка» (адреса вручну)
- Очікувана дата доставки (розрахунок: +2-3 дні)
- Вартість доставки: відображається автоматично (або «безкоштовно від 500 грн»)

### 8.3 Способи оплати
- 💳 **Онлайн-оплата** (Monobank / LiqPay / WayForPay) — рекомендовано
- 🏦 **Оплата при отриманні** (накладений платіж Нова Пошта) — +20 грн комісія НП
- 💰 **Переказ на картку** (ПриватБанк / Monobank) — вручну після підтвердження

### 8.4 Підсумок замовлення
- Міні-список товарів (праворуч або знизу)
- Сума + доставка + знижка = **Разом**
- Кнопка «Підтвердити замовлення»

### 8.5 Валідація форми
- React Hook Form + Zod
- Підсвічування помилок під полями
- Заборона сабміту з пустими обов'язковими полями

---

## 9. Сторінка підтвердження (`/order-success`)

- Анімована іконка ✅ (Framer Motion)
- «Дякуємо за замовлення! Ми зв'яжемося з вами найближчим часом»
- Номер замовлення
- Кнопка «На головну»

---

## 10. UX / UI вимоги

### Загальний стиль
- Теплі тони: шоколадний (#3D1C02), бежевий (#F5E6D3), золотий (#D4A017)
- Шрифт: `Playfair Display` (заголовки) + `Inter` (текст)
- Округлені кути (border-radius: 16-24px)
- Тіні, glassmorphism-ефекти для карток

### Анімації
- Framer Motion: fade-in при скролі, hover-ефекти карток (підйом + тінь)
- 3D Bounty-ефект у Hero: шоколадна бомбочка з Three.js, реагує на рух миші (parallax)
- Анімація додавання товару в кошик (літає до іконки кошика)
- Page transitions між сторінками

### Адаптивність (Breakpoints)
| Пристрій | Ширина |
|---|---|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

- Mobile-first підхід
- Touch-friendly: кнопки мінімум 44x44px
- Swipe-підтримка для каруселі відгуків

---

## 11. SEO та продуктивність

### 11.1 Мета-теги для кожної сторінки

Використовувати бібліотеку `react-helmet-async` для динамічного керування `<head>`.

| Сторінка | title | description |
|---|---|---|
| Головна | Шоколадні бомбочки з маршмелоу — ручна робота | Купити шоколадні бомбочки з маршмелоу з доставкою по Україні. Ручна робота, натуральний склад. Ідеальний подарунок! |
| Товар | {Назва товару} — купити з доставкою | {Короткий опис товару}. Ціна {ціна} грн. Доставка Новою Поштою. |
| Кошик | Кошик — Шоколадні бомбочки | — |
| Checkout | Оформлення замовлення | — |

```tsx
// Приклад використання
import { Helmet } from 'react-helmet-async'

<Helmet>
  <title>Шоколадні бомбочки з маршмелоу — ручна робота</title>
  <meta name="description" content="Купити шоколадні бомбочки..." />
  <meta name="keywords" content="шоколадні бомбочки, маршмелоу, гарячий шоколад, подарунок" />
  <link rel="canonical" href="https://chocopix.store/" />
</Helmet>
```

### 11.2 Open Graph (соцмережі)

```html
<meta property="og:title" content="Шоколадні бомбочки з маршмелоу" />
<meta property="og:description" content="Ручна робота. Доставка по Україні." />
<meta property="og:image" content="https://chocopix.store/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://chocopix.store/" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="uk_UA" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Шоколадні бомбочки з маршмелоу" />
<meta name="twitter:image" content="https://chocopix.store/og-image.jpg" />
```

> OG-зображення: 1200×630px, показує товар на красивому фоні з логотипом

### 11.3 Структуровані дані (Schema.org / JSON-LD)

На сторінці товару додати розмітку для Google Shopping і багатих сніпетів:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Шоколадна бомбочка «Карамель»",
  "image": "https://chocopix.store/images/caramel-bomb.jpg",
  "description": "Шоколадна бомбочка з карамельним маршмелоу",
  "brand": { "@type": "Brand", "name": "ChocoPix" },
  "offers": {
    "@type": "Offer",
    "price": "85",
    "priceCurrency": "UAH",
    "availability": "https://schema.org/InStock",
    "url": "https://chocopix.store/product/caramel"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47"
  }
}
</script>
```

На головній сторінці — розмітка організації:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ChocoPix",
  "url": "https://chocopix.store",
  "logo": "https://chocopix.store/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+38-0XX-XXX-XX-XX",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://instagram.com/chocopix_ua",
    "https://facebook.com/chocopix"
  ]
}
</script>
```

### 11.4 Технічне SEO

- **`robots.txt`** — дозволити індексацію, заблокувати `/cart`, `/checkout`, `/order-success`
- **`sitemap.xml`** — генерувати автоматично (включає головну + всі сторінки товарів)
- **Canonical URL** — на кожній сторінці, щоб уникнути дублів
- **`hreflang`** — якщо буде мультимовність (uk / ru)
- **`lang="uk"`** — на тегу `<html>`

```
# robots.txt
User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Disallow: /order-success
Sitemap: https://chocopix.store/sitemap.xml
```

### 11.5 Продуктивність (Core Web Vitals)

| Метрика | Ціль |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction) | < 100ms |
| CLS (Layout Shift) | < 0.1 |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 90 |

Для досягнення:
- Зображення у форматі **WebP** + атрибути `width` і `height` (запобігає CLS)
- **Lazy loading** зображень нижче fold (`loading="lazy"`)
- **Preload** головного зображення Hero (`<link rel="preload">`)
- Шрифти через `font-display: swap`
- Код-сплітинг по сторінках (React lazy + Suspense)
- 3D-сцена (Three.js) завантажується асинхронно, не блокує рендер

---

## 12. Структура проєкту (монорепо)

```
chocopix/                        ← корінь монорепо
├── package.json                    ← workspaces: ["frontend", "backend"]
├── .env                            ← спільні змінні (або окремі в папках)
│
├── shared/                         ← спільні TypeScript-типи
│   ├── types/
│   │   ├── product.ts              # Product, ProductVariant
│   │   ├── order.ts                # Order, OrderItem, OrderStatus
│   │   ├── cart.ts                 # CartItem
│   │   └── api.ts                  # ApiResponse<T>, PaginatedResponse<T>
│   └── package.json
│
├── frontend/                       ← React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/             # Header, Footer, Layout
│   │   │   ├── ui/                 # Button, Badge, Input, Modal
│   │   │   ├── product/            # ProductCard, ProductGallery
│   │   │   ├── cart/               # CartItem, CartSummary
│   │   │   ├── checkout/           # CheckoutForm, DeliveryForm, PaymentForm
│   │   │   └── 3d/                 # HeroBomb, ProductViewer3D
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── OrderSuccessPage.tsx
│   │   ├── api/                    ← всі запити до бекенду в одному місці
│   │   │   ├── client.ts           # axios instance (baseURL, interceptors)
│   │   │   ├── products.ts         # getProducts(), getProductById()
│   │   │   ├── orders.ts           # createOrder(), getOrderStatus()
│   │   │   └── novaposhta.ts       # getCities(), getWarehouses()
│   │   ├── store/
│   │   │   └── cartStore.ts        # Zustand store
│   │   ├── hooks/
│   │   │   ├── useProducts.ts      # TanStack Query хуки
│   │   │   ├── useCart.ts
│   │   │   └── useNovaPoshta.ts
│   │   ├── types/                  # імпортуються з shared/
│   │   ├── utils/                  # formatPrice, validatePhone
│   │   └── assets/                 # images, icons, 3d-models (.glb)
│   ├── vite.config.ts
│   └── package.json
│
└── backend/                        ← Node.js + Express/Fastify
    ├── src/
    │   ├── routes/
    │   │   ├── products.ts         # GET /api/products, GET /api/products/:id
    │   │   ├── orders.ts           # POST /api/orders, GET /api/orders/:id
    │   │   ├── novaposhta.ts       # GET /api/np/cities, GET /api/np/warehouses
    │   │   └── payments.ts         # POST /api/payments/liqpay (webhook)
    │   ├── controllers/
    │   │   ├── productsController.ts
    │   │   ├── ordersController.ts
    │   │   └── paymentsController.ts
    │   ├── services/
    │   │   ├── novaPoshtaService.ts  # обгортка над API НП
    │   │   ├── paymentService.ts     # LiqPay / WayForPay
    │   │   └── telegramService.ts    # нотифікація в Telegram при новому замовленні
    │   ├── middleware/
    │   │   ├── validate.ts           # Zod валідація body/params
    │   │   ├── errorHandler.ts
    │   │   └── auth.ts               # JWT (для адмін-панелі, Phase 3)
    │   ├── prisma/
    │   │   └── schema.prisma         # моделі Product, Order, OrderItem
    │   └── app.ts                    # ініціалізація Express + middleware
    ├── .env
    └── package.json
```

### API ендпоінти (Node.js)

| Метод | URL | Опис |
|---|---|---|
| GET | `/api/products` | Список товарів (фільтр, сортування) |
| GET | `/api/products/:id` | Один товар з фото |
| POST | `/api/orders` | Створити замовлення |
| GET | `/api/orders/:id` | Статус замовлення |
| GET | `/api/np/cities?q=Київ` | Міста Нової Пошти |
| GET | `/api/np/warehouses?cityRef=...` | Відділення |
| POST | `/api/payments/webhook` | Callback від LiqPay/WayForPay |

### MVP без бекенду (Phase 1)

На старті можна запустити фронт **без бекенду** — дані беруться з моків:

```ts
// frontend/src/api/client.ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const getProducts = USE_MOCK
  ? () => import('../data/products.mock.ts')  // локальний JSON
  : () => axios.get('/api/products')           // реальний бекенд
```

Коли бекенд готовий — змінюєш `.env`:
```
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:3000
```

---

## 13. Що варто додати (розширення)

- **Instagram-стрічка** — виведення останніх постів
- **Таймер акції** — «Знижка діє ще: 02:34:59»
- **Pop-up з подарунком** — з'являється через 30 сек або при спробі закрити сторінку
- **Чат-підтримка** — Telegram-бот або Tawk.to
- **Програма лояльності** — накопичувальні бонуси
- **Мультимовність** — UA / RU (i18next)
- **PWA** — встановлення як застосунок на телефон
- **Трекінг замовлення** — статус через API Нової Пошти

---

## 14. Зовнішні API та сервіси

| Сервіс | Призначення |
|---|---|
| Nova Poshta API | Відділення, трекінг |
| LiqPay / WayForPay | Онлайн-оплата |
| Google Analytics 4 | Аналітика |
| Meta Pixel | Ретаргетинг реклами |
| Cloudinary / ImgBB | Зберігання зображень |

---

## 15. Пріоритети розробки (MVP → Full)

**Phase 1 — Frontend MVP (без бекенду):**
1. Монорепо + shared типи
2. Головна сторінка з каталогом (mock-дані)
3. Картка товару + сторінка товару
4. Кошик (Zustand)
5. Форма замовлення (збереження в localStorage або відправка на email)
6. Адаптивність

**Phase 2 — Підключення Node.js бекенду:**
1. Express/Fastify + Prisma + PostgreSQL
2. REST API: товари, замовлення
3. Інтеграція Нової Пошти
4. Telegram-нотифікація при новому замовленні
5. Заміна моків на реальний API (перемикання через .env)

**Phase 3 — Розширення:**
1. 3D Bounty-ефект (Three.js)
2. Онлайн-оплата (LiqPay / WayForPay)
3. SEO-оптимізація
4. PWA
5. Аналітика + Meta Pixel

---

## 16. Інструкція для AI-генерації (GPT-4.5)

### 16.1 Стек і версії (вказувати явно)

```
React 18, Vite 6, TypeScript 5, Tailwind CSS 3
React Router v6, Zustand 4, Framer Motion 11
React Three Fiber 8, Three.js r128
TanStack Query v5, React Hook Form v7, Zod v3
Node.js 20, Express 5, Prisma 5, PostgreSQL 16
```

### 16.2 Стиль коду

```
- Тільки функціональні компоненти (без class components)
- Тільки TypeScript (без any, без as unknown)
- Іменовані експорти для компонентів, default export для сторінок
- Абсолютні імпорти через @ (@ = src/)
- Tailwind CSS для стилів (без inline styles, без CSS-модулів)
- async/await скрізь (без .then/.catch)
- Описові назви змінних і функцій українською логікою, код англійською
```

### 16.3 Що НЕ робити

```
- Не використовувати застарілий синтаксис (useHistory → useNavigate)
- Не писати placeholder lorem ipsum — використовувати реальний контент про ChocoPix
- Не спрощувати компоненти — генерувати production-ready код
- Не ігнорувати типи — всі props, state, API-відповіді мають бути типізовані
- Не використовувати !important в стилях
- Не робити все в одному файлі — дотримуватись структури проєкту з розділу 12
```

### 16.4 Порядок генерації (файл за файлом)

Просити GPT генерувати строго в такому порядку:

```
1. shared/types/product.ts
2. shared/types/order.ts
3. shared/types/cart.ts
4. shared/types/api.ts
5. frontend/src/store/cartStore.ts
6. frontend/src/api/client.ts
7. frontend/src/api/products.ts
8. frontend/src/api/orders.ts
9. frontend/src/data/products.mock.ts
10. frontend/src/components/ui/* (Button, Badge, Input, Modal)
11. frontend/src/components/layout/* (Header, Footer, Layout)
12. frontend/src/components/product/* (ProductCard, ProductGallery)
13. frontend/src/components/cart/*
14. frontend/src/components/checkout/*
15. frontend/src/pages/* (по одній сторінці)
16. backend/src/app.ts
17. backend/prisma/schema.prisma
18. backend/src/routes/*
19. backend/src/controllers/*
20. backend/src/services/*
```

### 16.5 Шаблон промпту для кожної сесії

Копіювати на початку кожного нового чату з GPT:

```
Ти senior React/Node.js розробник. Ми розробляємо проєкт ChocoPix —
лендінг для продажу шоколадних бомбочок з маршмелоу.

Сайт: chocopix.store
Стек: React 18, Vite 6, TypeScript 5, Tailwind CSS 3, Zustand 4,
      Framer Motion 11, React Three Fiber 8, Node.js 20, Express 5, Prisma 5

Структура монорепо:
choco-bombs/
├── shared/types/
├── frontend/src/
└── backend/src/

Вже згенеровано: [список файлів]

Зараз потрібно згенерувати: [назва файлу]
Вимоги до файлу: [опис з ТЗ]

Генеруй тільки цей файл, повністю, без скорочень.
```

### 16.6 Як передавати контекст між сесіями

GPT не пам'ятає попередні чати. Щоразу передавати:

1. **Типи** — вміст `shared/types/*.ts` (GPT має знати структуру даних)
2. **Вже готові залежності** — наприклад, якщо генеруєш сторінку, передай готовий `cartStore.ts` і `api/products.ts`
3. **Список готових файлів** — щоб не генерував повторно

```
Ось вже готові файли які ти можеш імпортувати:

// shared/types/product.ts
[вміст файлу]

// frontend/src/store/cartStore.ts
[вміст файлу]
```

### 16.7 Перевірка згенерованого коду

Після кожного файлу перевіряти:

- [ ] TypeScript не має помилок (`npx tsc --noEmit`)
- [ ] Імпорти існують і правильні
- [ ] Компонент відповідає структурі з ТЗ
- [ ] Немає хардкоду (URL, ключі API — через `.env`)
- [ ] Адаптивність присутня (mobile-first Tailwind класи)

---

*ТЗ складено для команди розробки. При виникненні питань — уточнювати до початку кожного етапу.*
