Full Stack Spotify Clone with Next.js App Router: React, Tailwind, Supabase, PostgreSQL, Stripe

For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)


## Features
- Song upload
- Stripe integration
- Credential authentication with Supabase
- Full responsiveness for mobile devices
- Server error handling with react-toast
- Play song audio
- Favorites system
- Playlists / Liked songs system
- Advanced Player component
- Stripe recurring payment integration
- Handling relations between Server and Child components in a real-time env
- Cancelling subscriptions

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
