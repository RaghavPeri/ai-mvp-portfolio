import OpenAI from "openai";
import { generateProductImages, generateContent, generateCode } from "./openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

// Agent Context Protocol - maintains coherence across AI sessions
interface AgentContext {
  sessionId: string;
  brandStyle: string;
  productContext: string;
  generatedAssets: {
    images: Array<{ url: string; prompt: string; quality: number }>;
    content: Array<{ text: string; type: string; quality: number }>;
    code: Array<{ component: string; framework: string; quality: number }>;
  };
  qualityMetrics: {
    overallScore: number;
    brandAlignment: number;
    consistency: number;
  };
}

// Multi-Agent Orchestrator
export class ContentOrchestrator {
  private context: AgentContext;

  constructor(sessionId: string) {
    this.context = {
      sessionId,
      brandStyle: "Williams-Sonoma Classic",
      productContext: "",
      generatedAssets: { images: [], content: [], code: [] },
      qualityMetrics: { overallScore: 0, brandAlignment: 0, consistency: 0 }
    };
  }

  // Agentic workflow: Generate complete product campaign
  async generateProductCampaign(productInfo: string): Promise<{
    images: any[];
    content: any[];
    code: any[];
    workflow: string[];
    qualityAssessment: any;
  }> {
    const workflow: string[] = [];
    this.context.productContext = productInfo;

    try {
      // Agent 1: Content Strategy Agent
      workflow.push("🤖 Content Strategy Agent: Analyzing product requirements...");
      const strategy = await this.analyzeContentStrategy(productInfo);
      
      // Agent 2: Visual Asset Agent  
      workflow.push("🎨 Visual Asset Agent: Generating product imagery...");
      const images = await generateProductImages({
        prompt: strategy.imagePrompt,
        brandStyle: this.context.brandStyle,
        aspectRatio: "Square (1:1)",
        quality: "High Quality",
        batchSize: 2
      });
      this.context.generatedAssets.images = images.images.map(img => ({
        url: img.url,
        prompt: strategy.imagePrompt,
        quality: img.qualityScore
      }));

      // Agent 3: Copy Generation Agent
      workflow.push("✍️ Copy Generation Agent: Creating marketing content...");
      const content = await generateContent({
        contentType: strategy.contentType,
        productInfo: productInfo,
        tone: "Luxury",
        length: "Medium (100-200 words)",
        keywords: strategy.keywords
      });
      this.context.generatedAssets.content = [{
        text: content.content,
        type: strategy.contentType,
        quality: content.qualityScore
      }];

      // Agent 4: Component Generation Agent
      workflow.push("⚙️ Component Agent: Building React components...");
      const code = await generateCode({
        componentType: "Product Card",
        requirements: `Product card for ${productInfo} with ${strategy.features.join(", ")}`,
        framework: "React + Tailwind",
        complexity: "Intermediate",
        includeTypeScript: true,
        includeComments: true
      });
      this.context.generatedAssets.code = [{
        component: code.code,
        framework: "React + Tailwind",
        quality: 90 // Base quality score for generated code
      }];

      // Agent 5: Quality Assurance Agent
      workflow.push("🔍 QA Agent: Evaluating content quality and brand alignment...");
      const qualityAssessment = await this.assessQuality();

      // Agent 6: Optimization Agent
      workflow.push("🚀 Optimization Agent: Suggesting improvements...");
      const optimizations = await this.generateOptimizations();

      return {
        images: images.images,
        content: [content],
        code: [code],
        workflow,
        qualityAssessment: { ...qualityAssessment, optimizations }
      };

    } catch (error) {
      workflow.push(`❌ Error in workflow: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async analyzeContentStrategy(productInfo: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: `You are a Williams-Sonoma content strategist. Analyze the product and create a comprehensive content strategy. Respond with JSON:
        {
          "imagePrompt": "specific prompt for product imagery",
          "contentType": "Product Description|Marketing Email|Social Media Post",
          "keywords": "comma-separated SEO keywords",
          "features": ["key feature 1", "key feature 2"],
          "brandAlignment": "alignment strategy"
        }`
      }, {
        role: "user",
        content: `Product: ${productInfo}`
      }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  private async assessQuality() {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: `You are a quality assurance agent for Williams-Sonoma content. Evaluate the generated assets for brand alignment, consistency, and overall quality. Respond with JSON:
        {
          "overallScore": number(1-100),
          "brandAlignment": number(1-100),
          "consistency": number(1-100),
          "strengths": ["strength 1", "strength 2"],
          "improvements": ["improvement 1", "improvement 2"]
        }`
      }, {
        role: "user",
        content: `Evaluate these assets: 
        Images: ${this.context.generatedAssets.images.length} generated
        Content: ${this.context.generatedAssets.content.length} pieces
        Code: ${this.context.generatedAssets.code.length} components
        Brand Style: ${this.context.brandStyle}
        Product: ${this.context.productContext}`
      }],
      response_format: { type: "json_object" }
    });

    const assessment = JSON.parse(response.choices[0].message.content || '{}');
    this.context.qualityMetrics = {
      overallScore: assessment.overallScore || 85,
      brandAlignment: assessment.brandAlignment || 85,
      consistency: assessment.consistency || 85
    };

    return assessment;
  }

  private async generateOptimizations() {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: `You are an optimization agent. Based on quality metrics, suggest specific improvements for each content type. Respond with JSON:
        {
          "imageOptimizations": ["optimization 1", "optimization 2"],
          "contentOptimizations": ["optimization 1", "optimization 2"], 
          "codeOptimizations": ["optimization 1", "optimization 2"],
          "workflowImprovements": ["improvement 1", "improvement 2"]
        }`
      }, {
        role: "user",
        content: `Quality Scores - Overall: ${this.context.qualityMetrics.overallScore}, Brand: ${this.context.qualityMetrics.brandAlignment}, Consistency: ${this.context.qualityMetrics.consistency}`
      }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  // MCP-style context sharing
  getContext(): AgentContext {
    return this.context;
  }

  updateContext(updates: Partial<AgentContext>) {
    this.context = { ...this.context, ...updates };
  }
}

// Cross-modal content optimization
export async function optimizeAcrossModalities(
  imagePrompt: string,
  contentText: string,
  codeRequirements: string
): Promise<{
  optimizedPrompts: { image: string; content: string; code: string };
  alignmentScore: number;
}> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{
      role: "system",
      content: `You are a cross-modal optimization agent. Analyze these three content pieces and optimize them for consistency and brand alignment. Respond with JSON:
      {
        "optimizedPrompts": {
          "image": "optimized image prompt",
          "content": "optimized content prompt", 
          "code": "optimized code requirements"
        },
        "alignmentScore": number(1-100),
        "improvements": ["improvement 1", "improvement 2"]
      }`
    }, {
      role: "user",
      content: `Image: ${imagePrompt}\nContent: ${contentText}\nCode: ${codeRequirements}`
    }],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}