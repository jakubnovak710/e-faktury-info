/**
 * Database module placeholder.
 * Enable with: features.database = true in config/features.config.ts
 *
 * When implementing:
 * 1. pnpm add drizzle-orm @neondatabase/serverless
 * 2. pnpm add -D drizzle-kit
 * 3. Create schema in src/lib/db/schema.ts
 * 4. Add DATABASE_URL to .env.local
 * 5. Run: pnpm drizzle-kit generate && pnpm drizzle-kit migrate
 *
 * Example schema:
 * ```ts
 * import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
 *
 * export const users = pgTable('users', {
 *   id: uuid('id').primaryKey().defaultRandom(),
 *   email: text('email').notNull().unique(),
 *   name: text('name'),
 *   createdAt: timestamp('created_at').defaultNow(),
 * });
 * ```
 *
 * See: https://orm.drizzle.team/docs/get-started/neon-new
 */

export const DB_READY = false;
