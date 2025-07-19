import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertImageSchema, insertContentSchema, insertCodeSchema } from "@shared/schema";
import { generateProductImages, generateContent, generateCode } from "./services/openai";
import { ContentOrchestrator, optimizeAcrossModalities } from "./services/agents";

export async function registerRoutes(app: Express): Promise<Server> {
  // Image generation routes
  app.post("/api/generate-images", async (req, res) => {
    try {
      const { images } = await generateProductImages(req.body);
      
      const savedImages = [];
      for (const image of images) {
        const imageData = insertImageSchema.parse({
          prompt: req.body.prompt,
          brandStyle: req.body.brandStyle,
          imageUrl: image.url,
          qualityScore: image.qualityScore,
          aspectRatio: req.body.aspectRatio,
        });
        
        const savedImage = await storage.createGeneratedImage(imageData);
        savedImages.push(savedImage);
      }
      
      res.json({ images: savedImages });
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate images" 
      });
    }
  });

  app.get("/api/generated-images", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const images = await storage.getGeneratedImages(limit);
      res.json(images);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to fetch images" 
      });
    }
  });

  // Content generation routes
  app.post("/api/generate-content", async (req, res) => {
    try {
      const result = await generateContent(req.body);
      
      const contentData = insertContentSchema.parse({
        contentType: req.body.contentType,
        prompt: req.body.productInfo,
        generatedText: result.content,
        tone: req.body.tone,
        length: req.body.length,
        keywords: req.body.keywords || null,
        qualityScore: result.qualityScore,
      });
      
      const savedContent = await storage.createGeneratedContent(contentData);
      
      res.json({ 
        content: savedContent,
        alternatives: result.alternatives 
      });
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate content" 
      });
    }
  });

  app.get("/api/generated-content", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const content = await storage.getGeneratedContent(limit);
      res.json(content);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to fetch content" 
      });
    }
  });

  // Code generation routes
  app.post("/api/generate-code", async (req, res) => {
    try {
      const result = await generateCode(req.body);
      
      const codeData = insertCodeSchema.parse({
        componentType: req.body.componentType,
        requirements: req.body.requirements,
        framework: req.body.framework,
        code: result.code,
        complexity: req.body.complexity,
        includeTypeScript: req.body.includeTypeScript,
      });
      
      const savedCode = await storage.createGeneratedCode(codeData);
      
      res.json({ 
        code: savedCode,
        analysis: result.analysis 
      });
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate code" 
      });
    }
  });

  app.get("/api/generated-code", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const code = await storage.getGeneratedCode(limit);
      res.json(code);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to fetch code" 
      });
    }
  });

  // Agentic AI workflow routes
  app.post("/api/generate-campaign", async (req, res) => {
    try {
      const { productInfo } = req.body;
      
      if (!productInfo) {
        return res.status(400).json({ message: "Product information is required" });
      }

      const orchestrator = new ContentOrchestrator(`session_${Date.now()}`);
      const campaign = await orchestrator.generateProductCampaign(productInfo);
      
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate campaign" 
      });
    }
  });

  app.post("/api/optimize-content", async (req, res) => {
    try {
      const { imagePrompt, contentText, codeRequirements } = req.body;
      
      const optimization = await optimizeAcrossModalities(
        imagePrompt, 
        contentText, 
        codeRequirements
      );
      
      res.json(optimization);
    } catch (error) {
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to optimize content" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
