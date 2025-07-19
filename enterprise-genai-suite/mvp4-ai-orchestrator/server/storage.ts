import { 
  users, 
  generatedImages, 
  generatedContent, 
  generatedCode,
  type User, 
  type InsertUser,
  type GeneratedImage,
  type InsertGeneratedImage,
  type GeneratedContent,
  type InsertGeneratedContent,
  type GeneratedCode,
  type InsertGeneratedCode
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createGeneratedImage(image: InsertGeneratedImage): Promise<GeneratedImage>;
  getGeneratedImages(limit?: number): Promise<GeneratedImage[]>;
  
  createGeneratedContent(content: InsertGeneratedContent): Promise<GeneratedContent>;
  getGeneratedContent(limit?: number): Promise<GeneratedContent[]>;
  
  createGeneratedCode(code: InsertGeneratedCode): Promise<GeneratedCode>;
  getGeneratedCode(limit?: number): Promise<GeneratedCode[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createGeneratedImage(insertImage: InsertGeneratedImage): Promise<GeneratedImage> {
    const [image] = await db
      .insert(generatedImages)
      .values(insertImage)
      .returning();
    return image;
  }

  async getGeneratedImages(limit = 50): Promise<GeneratedImage[]> {
    const images = await db
      .select()
      .from(generatedImages)
      .orderBy(desc(generatedImages.createdAt))
      .limit(limit);
    return images;
  }

  async createGeneratedContent(insertContent: InsertGeneratedContent): Promise<GeneratedContent> {
    const [content] = await db
      .insert(generatedContent)
      .values(insertContent)
      .returning();
    return content;
  }

  async getGeneratedContent(limit = 50): Promise<GeneratedContent[]> {
    const content = await db
      .select()
      .from(generatedContent)
      .orderBy(desc(generatedContent.createdAt))
      .limit(limit);
    return content;
  }

  async createGeneratedCode(insertCode: InsertGeneratedCode): Promise<GeneratedCode> {
    const [code] = await db
      .insert(generatedCode)
      .values(insertCode)
      .returning();
    return code;
  }

  async getGeneratedCode(limit = 50): Promise<GeneratedCode[]> {
    const code = await db
      .select()
      .from(generatedCode)
      .orderBy(desc(generatedCode.createdAt))
      .limit(limit);
    return code;
  }
}

export const storage = new DatabaseStorage();
