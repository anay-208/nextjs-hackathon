This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Creating the database

This project uses PostgreSQL for the database, the easiest way to get it up and running is by using Docker. Start the database with this command:

```sh
docker compose up -d
```

Create a `.env.local` file in your project folder (parent of src/).

And add the following environment variable:

```sh
DATABASE_URL='postgresql://nextjsuser:nextjspassword@localhost:5432/nextjs-hackathon'
```

If for some reason you want to start the database from scratch you can use the following command (this will erase all the data!):

```sh
docker compose down -v
```

## Using AI features
When you want to use AI features, you need to add the following variable to your `.env.local`

```sh
GOOGLE_GENERATIVE_AI_API_KEY='YOURKEYHERE'
```

To receive a key for local developement, generate one here: [Google AI Studio](https://aistudio.google.com/apikey)

## Migrate DB

To migrate DB, run

```sh
pnpm migration:generate
pnpm migration:push
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
