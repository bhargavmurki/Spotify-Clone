# Full Stack Spotify Clone with Next.js

For testing, use [Stripe Testing Cards](https://stripe.com/docs/testing)

### Prerequisites
**Node version 14.x**

### Clone the repo
```shell
git clone https://github.com/bhargavmurki/Spotify-Clone.git
```

### Install packages
```shell
npm i
```

### Setup .env file
```js
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Add SQL Tables
Use `database.sql` file, create songs and liked_songs table (there is a video tutorial)

### Start the app
```shell
npm run dev
```
