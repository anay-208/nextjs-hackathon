# LifeLog

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/actions-reference/cli/create-next-app).

Life Log is your personal operating system for real life — bringing your thoughts, goals, finances, and reflections into one cozy, secure space. Designed for clarity and control, Life Log gives you a beautiful dashboard to track your life at a glance, a journal to write about your day, a smart goal planner to remind you of deadlines, and an expense tracker that tracks your spending to help you work on them. Whether you're reflecting on your day, planning your next big thing, or keeping tabs on your spending — Life Log helps you do it all in one place. Clean, focused, and intentionally designed for peace of mind.

This project is made for Next.js Hackathon 2025.



Note: If you're using Ai features, please don't input any personal information as this is a part of hackathon, and google might use the info to train their Ai(as they mentioned in their free plan)

## Testing

To test the application, visit the link mentioned on the repo.
There is a "Preview as anonymous feature", powered by better-auth, used in this.


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

## Env Variables
Add the following Env Variables


| Name                   | Description                                                                                              | Required? |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | --------- |
| `DATABASE_URL`         | The read-only connection string to connect to the DB, used to query the posts and messages               | ✔️        |
| `BETTER_AUTH_SECRET`    | Any random text or secret, required by better-auth. You can generate one from https://www.better-auth.com/docs/installation#set-environment-variables | ✔️        |
| `GOOGLE_GENERATIVE_AI_API_KEY`    | Google Ai studio Api key to use Ai features powered by Gemini | ✔️        |


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
