import { auth } from "@/auth";
import { faker } from "@faker-js/faker";
import { InferInsertModel, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "./index";
import { categoriesTable, journalingTable, transactionsTable } from "./schema";

const getRandomDateInRange = (start: Date, end: Date) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date;
};

const generateCreatedAtAndUpdatedAt = () => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );
  const createdAt = getRandomDateInRange(startOfMonth, new Date());
  const updatedAt =
    Math.random() > 0.8
      ? createdAt
      : getRandomDateInRange(createdAt, new Date());
  return { createdAt, updatedAt };
};

const seedJournalingTable = async (user_id: string) => {
  const journalEntries = Array.from({ length: 50 }).map(() => {
    const { createdAt, updatedAt } = generateCreatedAtAndUpdatedAt();
    return {
      id: faker.string.uuid(),
      user_id: user_id,
      title: faker.commerce.productName(),
      content: faker.lorem.paragraphs(),
      is_pinned: faker.datatype.boolean(),
      is_public: faker.datatype.boolean(),
      summary: faker.lorem.sentence(),
      created_at: createdAt,
      updated_at: updatedAt,
      mood: faker.number.int({ min: 1, max: 10 }),
      energy: faker.number.int({ min: 1, max: 10 }),
      productivity: faker.number.int({ min: 1, max: 10 }),
    } satisfies InferInsertModel<typeof journalingTable>;
  });

  await db.insert(journalingTable).values(journalEntries);
  return journalEntries;
};

const seedCategories = async (user_id: string) => {
  const categoriesData = Array.from({ length: 10 }).map(() => {
    const { createdAt, updatedAt } = generateCreatedAtAndUpdatedAt();

    return {
      id: faker.string.uuid(),
      user_id: user_id,
      label: faker.commerce.department(),
      budget: parseFloat(faker.finance.amount()),
      created_at: createdAt,
      updated_at: updatedAt,
    } satisfies InferInsertModel<typeof categoriesTable>;
  });

  await db.insert(categoriesTable).values(categoriesData);
  return categoriesData;
};

const seedTransactions = async (
  user_id: string,
  categoriesData: Awaited<ReturnType<typeof seedCategories>>,
) => {
  const transactionsData = Array.from({ length: 100 }).map(() => {
    const { createdAt, updatedAt } = generateCreatedAtAndUpdatedAt();

    return {
      id: faker.string.uuid(),
      user_id: user_id,
      category_id: faker.helpers.arrayElement(categoriesData).id,
      label: faker.commerce.productName(),
      amount: parseFloat(faker.finance.amount()),
      type: faker.helpers.arrayElement(["income", "expense"]),
      notes: faker.lorem.sentence(),
      created_at: createdAt,
      updated_at: updatedAt,
    } satisfies InferInsertModel<typeof transactionsTable>;
  });

  await db.insert(transactionsTable).values(transactionsData);
  return transactionsData;
};

const cleanUpTables = async () => {
  await db.execute(
    sql`TRUNCATE TABLE ${journalingTable}, ${transactionsTable}, ${categoriesTable} RESTART IDENTITY CASCADE`,
  );
};

export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    const headerList = await headers();
    const session = await auth.api.getSession({ headers: headerList });
    if (!session || !session.user)
      throw new Error("No user available. Please sign in.");

    await cleanUpTables();
    const journalEntries = await seedJournalingTable(session.user.id);
    const categoriesData = await seedCategories(session.user.id);
    const transactionsData = await seedTransactions(
      session.user.id,
      categoriesData,
    );
    console.log("Database seeding completed successfully.");

    return { journalEntries, categoriesData, transactionsData };
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
};
