import { faker } from "@faker-js/faker";
import { InferInsertModel, sql } from "drizzle-orm";
import { db } from "./index";
import { categories, journalingTable, transactions } from "./schema";

const getRandomDateInRange = (start: Date, end: Date) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date;
};

const seedJournalingTable = async () => {
  const journalEntries = Array.from({ length: 50 }).map(() => {
    const createdAt = getRandomDateInRange(new Date(2020, 0, 1), new Date());
    const updatedAt =
      Math.random() > 0.5
        ? createdAt
        : getRandomDateInRange(createdAt, new Date());
    return {
      id: faker.string.uuid(),
      author_id: faker.string.uuid(),
      title: faker.commerce.productName(),
      content: faker.lorem.paragraphs(),
      is_pinned: faker.datatype.boolean(),
      is_public: faker.datatype.boolean(),
      summary: faker.lorem.sentence(),
      tags: faker.lorem.words(3).split(" "),
      created_at: createdAt,
      updated_at: updatedAt,
    };
  });

  await db.insert(journalingTable).values(journalEntries);
};

const seedCategories = async () => {
  const categoriesData = Array.from({ length: 10 }).map(() => {
    const createdAt = getRandomDateInRange(new Date(2020, 0, 1), new Date());
    const updatedAt =
      Math.random() > 0.5
        ? createdAt
        : getRandomDateInRange(createdAt, new Date());
    return {
      id: faker.string.uuid(),
      user_id: faker.string.uuid(),
      label: faker.commerce.department(),
      budget: parseFloat(faker.finance.amount()),
      created_at: createdAt,
      updated_at: updatedAt,
    } satisfies InferInsertModel<typeof categories>;
  });

  await db.insert(categories).values(categoriesData);
  return categoriesData;
};

const seedTransactions = async (
  categoriesData: Awaited<ReturnType<typeof seedCategories>>,
) => {
  const transactionsData = Array.from({ length: 100 }).map(() => {
    const createdAt = getRandomDateInRange(new Date(2020, 0, 1), new Date());
    const updatedAt =
      Math.random() > 0.5
        ? createdAt
        : getRandomDateInRange(createdAt, new Date());
    return {
      id: faker.string.uuid(),
      user_id: faker.string.uuid(),
      category_id: faker.helpers.arrayElement(categoriesData).id,
      label: faker.commerce.productName(),
      amount: parseFloat(faker.finance.amount()),
      type: faker.helpers.arrayElement(["income", "expense"]),
      notes: faker.lorem.sentence(),
      created_at: createdAt,
      updated_at: updatedAt,
    } satisfies InferInsertModel<typeof transactions>;
  });

  await db.insert(transactions).values(transactionsData);
};

const cleanUpTables = async () => {
  await db.execute(
    sql`TRUNCATE TABLE ${journalingTable}, ${transactions}, ${categories} RESTART IDENTITY CASCADE`,
  );
};

export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    await cleanUpTables();
    await seedJournalingTable();
    const categoriesData = await seedCategories();
    await seedTransactions(categoriesData);
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
};

// seedDatabase();
