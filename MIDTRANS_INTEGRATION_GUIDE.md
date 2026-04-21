# Midtrans di Laravel + React Inertia (Versi Project Ini)

Guide ini fokus ke yang **sudah lu terapin di project ini** (pakai **Snap Pop-up**), terus gw kasih juga opsi singkat kalau mau pindah ke **Snap Redirect** atau **Core API (VT-Direct)**.

## 1) Install package Midtrans

```bash
composer require midtrans/midtrans-php
```

Kalau class Midtrans belum kebaca, biasanya cukup:

```bash
composer dumpautoload
```

## 2) Siapin ENV

Isi `.env`:

```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx
MIDTRANS_IS_PRODUCTION=false
```

> Di code lu sekarang `isProduction` masih hardcoded `false`. Aman buat sandbox.

## 3) Konfigurasi Midtrans di Controller

Di `SubscriptionPlanController`, constructor udah set config ini:

- `\Midtrans\Config::$serverKey`
- `\Midtrans\Config::$isProduction = false`
- `\Midtrans\Config::$isSanitized = false`
- `\Midtrans\Config::$is3ds = false`

Untuk best practice, ke depannya bisa diambil dari config/env biar gak hardcoded.

## 4) Flow utama yang lu pakai: Snap Token

### A. User klik subscribe

Endpoint: `POST /dashboard/subscription-plan/{subscriptionPlan}/user-subscribe`

Yang terjadi:

1. Simpan data subscription ke `user_subscriptions` status `pending`.
2. Generate `order_id` dari `user_subscription_id + random string`.
3. Panggil:

```php
\Midtrans\Snap::getSnapToken($params)
```

4. Simpan `snap_token` ke database.
5. Return lagi ke halaman Inertia dengan data token.

### B. Frontend panggil Snap JS

Di page Inertia React (`User/Subscription/Index.jsx`), konsepnya:

1. Load script Snap:
   `https://app.sandbox.midtrans.com/snap/snap.js`
2. Set `data-client-key` pakai `MIDTRANS_CLIENT_KEY`.
3. Panggil `snap.pay(snapToken)` saat user lanjut bayar.

Callback `onSuccess / onPending / onError` bisa lu pakai buat UX, tapi **source of truth final tetap webhook Midtrans**.

## 5) Webhook notification (ini paling penting)

Route webhook lu:

- `POST /midtrans/notification`

Di `bootstrap/app.php`, route ini udah dikecualikan dari CSRF:

- `midtrans/notification`

Jadi Midtrans bisa hit endpoint lu tanpa token CSRF.

Di method `midtransCallback()`:

1. Parse notifikasi:
   `new \Midtrans\Notification`
2. Ambil `transaction_status`, `fraud_status`, dan `order_id`.
3. Mapping status ke `payment_status` lokal:
   - `capture + accept` -> `paid`
   - `settlement` -> `paid`
   - `pending` -> `pending`
   - `cancel/deny/expire` -> `failed`
4. Kalau `paid`, set `expired_at` berdasarkan `active_period_in_months`.
5. Simpan perubahan.

## 6) Test yang udah ada di project

Lu udah bikin test:

- `tests/Feature/MidtransWebhookCsrfTest.php`

Isinya ngecek webhook Midtrans **tidak kena 419 CSRF**. Ini penting banget biar callback dari Midtrans gak mental.

Run test-nya:

```bash
php artisan test --compact tests/Feature/MidtransWebhookCsrfTest.php
```

## 7) Mapping ke repo Midtrans (biar nyambung)

Di repo `midtrans-php`, ada 3 opsi:

1. **Snap** (yang lu pakai sekarang)
   - Backend minta `snap_token`
   - Frontend munculin popup Snap
2. **Snap Redirect**
   - Backend minta `redirect_url`
   - User diarahkan ke hosted payment page Midtrans
3. **Core API (VT-Direct)**
   - Lebih custom
   - Lu handle charge dari backend + flow frontend sendiri

## 8) Kalau mau switch dari Snap ke Snap Redirect

Gampang, backend tinggal ganti dari:

```php
\Midtrans\Snap::getSnapToken($params)
```

ke:

```php
\Midtrans\Snap::createTransaction($params)->redirect_url
```

Lalu frontend tinggal `window.location.href = redirectUrl;`.
Webhook handler **tetap dipakai** (status final tetap dari notifikasi server-to-server).

## 9) Kalau mau ke Core API (VT-Direct)

Step high-level:

1. Frontend collect payment token/card token sesuai metode.
2. Backend kirim `\Midtrans\CoreApi::charge($transactionData)`.
3. Handle response (capture/challenge/deny).
4. Tetap maintain endpoint webhook buat update status final.

Flow ini paling fleksibel, tapi implementasi dan tanggung jawab logic lu jadi lebih banyak.

## 10) Checklist implementasi biar aman dipakai

- Pastikan Server Key & Client Key sesuai environment (sandbox/production).
- Set callback notification URL di dashboard Midtrans ke:
  `https://domain-lu.com/midtrans/notification`
- Jangan update status final cuma dari callback JS frontend.
- Validasi transaksi berdasarkan `order_id` yang lu generate.
- Simpan log payload webhook kalau lagi debugging.
- Saat production, set `isProduction=true` + pakai key production.

---

Kalau lu mau, next step gw bisa bikinin versi lanjutan:
- refactor config Midtrans ke `config/services.php`,
- tambah verifikasi signature webhook,
- dan rapihin status mapping biar lebih clean pakai enum.
