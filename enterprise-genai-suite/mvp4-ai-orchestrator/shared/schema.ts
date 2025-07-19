import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const generatedImages = pgTable("generated_images", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  brandStyle: text("brand_style").notNull(),
  imageUrl: text("image_url").notNull(),
  qualityScore: integer("quality_score").notNull(),
  aspectRatio: text("aspect_ratio").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generatedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  contentType: text("content_type").notNull(),
  prompt: text("prompt").notNull(),
  generatedText: text("generated_text").notNull(),
  tone: text("tone").notNull(),
  length: text("length").notNull(),
  keywords: text("keywords"),
  qualityScore: integer("quality_score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generatedCode = pgTable("generated_code", {
  id: serial("id").primaryKey(),
  componentType: text("component_type").notNull(),
  requirements: text("requirements").notNull(),
  framework: text("framework").notNull(),
  code: text("code").notNull(),
  complexity: text("complexity").notNull(),
  includeTypeScript: boolean("include_typescript").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertImageSchema = createInsertSchema(generatedImages).omit({
  id: true,
  createdAt: true,
});

export const insertContentSchema = createInsertSchema(generatedContent).omit({
  id: true,
  createdAt: true,
});

export const insertCodeSchema = createInsertSchema(generatedCode).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GeneratedImage = typeof generatedImages.$inferSelect;
export type InsertGeneratedImage = z.infer<typeof insertImageSchema>;
export type GeneratedContent = typeof generatedContent.$inferSelect;
export type InsertGeneratedContent = z.infer<typeof insertContentSchema>;
export type GeneratedCode = typeof generatedCode.$inferSelect;
export type InsertGeneratedCode = z.infer<typeof insertCodeSchema>;
