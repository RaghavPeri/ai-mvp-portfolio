import { useState } from "react";
import Navigation from "@/components/navigation";
import ImageGenerator from "@/components/image-generator";
import ContentStudio from "@/components/content-studio";
import CodeAssistant from "@/components/code-assistant";
import AIOrchestrator from "@/components/ai-orchestrator";
import { Button } from "@/components/ui/button";
import { Image, NotebookPen, Code, Rocket } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("image-gen");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "image-gen":
        return <ImageGenerator />;
      case "content-studio":
        return <ContentStudio />;
      case "code-assistant":
        return <CodeAssistant />;
      case "ai-orchestrator":
        return <AIOrchestrator />;
      default:
        return <ImageGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-ws-cream">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveSection()}

        {/* Integration Overview */}
        <section className="bg-gradient-to-r from-ws-forest to-ws-forest/80 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair font-bold mb-4">Unified AI Content Platform</h2>
            <p className="text-lg opacity-90">Seamlessly integrate visual, textual, and functional content generation into your workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-ws-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <Image className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Generation</h3>
              <p className="opacity-90">AI-powered product imagery with brand-consistent styling and automated quality assessment.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-ws-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <NotebookPen className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Creation</h3>
              <p className="opacity-90">Intelligent copywriting for product descriptions, marketing materials, and customer communications.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-ws-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="text-white h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Generation</h3>
              <p className="opacity-90">Automated React component creation with TypeScript support and accessibility compliance.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-ws-gold text-ws-forest px-8 py-3 font-semibold hover:bg-ws-gold/90 shadow-lg">
              <Rocket className="mr-2 h-5 w-5" />
              Start Building with AI
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ws-forest text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-playfair font-semibold">Williams-Sonoma AI Studio</h3>
              <p className="text-white/70 text-sm">Powered by Generative AI • Built for Creators</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Documentation</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">API Reference</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
