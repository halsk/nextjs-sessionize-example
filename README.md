# A NextJS template for displaying Sessionize content from their API.

I created this template because I wanted to customize Sessionize sessions. This template helps conference organizers display their Sessionize-managed content in a customized way.
To use this template, you have to enable Sessionize API and add your Sessionize ID on `.env.local` from the API settings.

## Getting Started

Requires Node.js 20.9 or later.

1. Install libraries

```bash
npm install
```

2. Enable Sessionize API from Sessionize API setting.
Create JSON API end point and retrieve your session id.
Then set the ID to the `.env.local` file as `NEXT_PUBLIC_SESSIONIZE_ID`.
If you have a session type as an extra Submission field of Sessionize, you can specify it as `NEXT_PUBLIC_SESSIONTYPE_CATEGORY_ID`.

```bash
cp .env.example .env.local
vi .env.local
```

3. Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run test:e2e   # Playwright E2E tests (first time: npx playwright install chromium)
```

The E2E tests mock the Sessionize API with the synthetic data in `e2e/fixtures/`,
so they do not depend on the real event data or the network.

## Learn More

This template is using Japanese language, especially the order of the full name is `{Last Name} {First Name}` order.
