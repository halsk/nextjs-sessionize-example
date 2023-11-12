# A NextJS template for displaying Sessionize contetnt from their API.

I created this template because I wanted to customize Sessionize sessions.
To use this template, you have to enable Sessionize API and add your Sessionize ID on `.env.local` from the API settings.

## Getting Started

1. Install libraries

```bash
yarn install
```

2. Enable Sessionize API from Sessionize API setting.
Create JSON API end point and retrieve your session id.
Then set the ID to the `.env.local` file as `NEXT_PUBLIC_SESSIONIZE_ID`.
If you have a session type as an extra Submission field of Sessionize, you can specify it as `NEXT_PUBLIC_SESSIONTYPE_CATEGORY_ID`.

```bash
cp .env.examle .env.local
vi .env.local
```

3. Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

This template is using Japanese language, especially the order of the full name is `{Last Name} {First Name}` order.
