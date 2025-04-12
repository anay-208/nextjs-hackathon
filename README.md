This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

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
GOOGLE_GENERATIVE_AI_API_KEY='YOUR_API_KEY_HERE'
```

To receive a key for local developement, generate one here: [Google AI Studio](https://aistudio.google.com/apikey)

## Migrate DB

To migrate DB, run

```sh
pnpm migration:generate
pnpm migration:push
```
