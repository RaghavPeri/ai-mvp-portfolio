import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Workflow, 
  Brain, 
  Zap, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Users,
  Activity
} from "lucide-react";

interface WorkflowStep {
  step: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}

interface CampaignResult {
  images: any[];
  content: any[];
  code: any[];
  workflow: string[];
  qualityAssessment: {
    overallScore: number;
    brandAlignment: number;
    consistency: number;
    strengths: string[];
    improvements: string[];
    optimizations: {
      imageOptimizations: string[];
      contentOptimizations: string[];
      codeOptimizations: string[];
      workflowImprovements: string[];
    };
  };
}

export default function AIOrchestrator() {
  const [productInfo, setProductInfo] = useState("");
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [campaignResult, setCampaignResult] = useState<CampaignResult | null>(null);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();

  const generateCampaignMutation = useMutation({
    mutationFn: async (data: { productInfo: string }) => {
      const response = await apiRequest("POST", "/api/generate-campaign", data);
      return response.json();
    },
    onSuccess: (data) => {
      setCampaignResult(data);
      setProgress(100);
      toast({
        title: "AI Campaign Generated",
        description: "Multi-agent workflow completed successfully with quality assessment.",
      });
    },
    onError: (error) => {
      toast({
        title: "Campaign Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate campaign. Please try again.",
        variant: "destructive",
      });
      setProgress(0);
    },
  });

  const handleGenerateCampaign = () => {
    if (!productInfo.trim()) {
      toast({
        title: "Missing Product Information",
        description: "Please provide detailed product information for the AI agents to work with.",
        variant: "destructive",
      });
      return;
    }

    // Simulate workflow steps for UI feedback
    const steps = [
      "🤖 Content Strategy Agent: Analyzing product requirements...",
      "🎨 Visual Asset Agent: Generating product imagery...", 
      "✍️ Copy Generation Agent: Creating marketing content...",
      "⚙️ Component Agent: Building React components...",
      "🔍 QA Agent: Evaluating content quality and brand alignment...",
      "🚀 Optimization Agent: Suggesting improvements..."
    ];

    setWorkflowSteps(steps.map(step => ({ step, status: 'pending' })));
    setCampaignResult(null);
    setProgress(0);

    // Simulate step progression
    steps.forEach((_, index) => {
      setTimeout(() => {
        setWorkflowSteps(prev => 
          prev.map((s, i) => ({
            ...s,
            status: i < index ? 'completed' : i === index ? 'running' : 'pending'
          }))
        );
        setProgress(((index + 1) / steps.length) * 90); // 90% for steps, 10% for completion
      }, index * 1000);
    });

    generateCampaignMutation.mutate({ productInfo: productInfo.trim() });
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <RotateCcw className="h-4 w-4 text-ws-gold animate-spin" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-ws-forest mb-2">AI Campaign Orchestrator</h2>
        <p className="text-ws-gray text-lg">Multi-agent AI system with MCP context sharing and agentic workflows for comprehensive content generation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Input Panel */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-ws-forest">
              <Brain className="mr-2 h-5 w-5" />
              Agentic Workflow Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">Product Information</Label>
              <Textarea 
                className="h-32 resize-none focus:ring-ws-forest focus:border-transparent"
                placeholder="Describe your product in detail for the AI agents to analyze and create a complete marketing campaign..."
                value={productInfo}
                onChange={(e) => setProductInfo(e.target.value)}
              />
            </div>

            <div className="bg-ws-cream rounded-lg p-4">
              <h4 className="font-semibold text-ws-forest mb-2 flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Agent Capabilities
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Badge variant="secondary">🤖 Strategy Agent</Badge>
                <Badge variant="secondary">🎨 Visual Agent</Badge>
                <Badge variant="secondary">✍️ Copy Agent</Badge>
                <Badge variant="secondary">⚙️ Code Agent</Badge>
                <Badge variant="secondary">🔍 QA Agent</Badge>
                <Badge variant="secondary">🚀 Optimization Agent</Badge>
              </div>
            </div>

            <Button 
              onClick={handleGenerateCampaign}
              disabled={generateCampaignMutation.isPending}
              className="w-full bg-ws-forest text-white hover:bg-ws-forest/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {generateCampaignMutation.isPending ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-pulse" />
                  Agents Working...
                </>
              ) : (
                <>
                  <Workflow className="mr-2 h-4 w-4" />
                  Generate Full Campaign
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Workflow Status Panel */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-ws-forest">
              <Activity className="mr-2 h-5 w-5" />
              Multi-Agent Workflow Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generateCampaignMutation.isPending && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  {getStepIcon(step.status)}
                  <span className={`text-sm ${step.status === 'completed' ? 'text-green-700' : step.status === 'running' ? 'text-ws-gold' : 'text-gray-600'}`}>
                    {step.step}
                  </span>
                </div>
              ))}
            </div>

            {campaignResult && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-ws-forest mb-3 flex items-center">
                  <Target className="mr-2 h-4 w-4" />
                  Quality Assessment
                </h4>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-semibold text-green-700">{campaignResult.qualityAssessment.overallScore}%</div>
                    <div className="text-green-600">Overall</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-700">{campaignResult.qualityAssessment.brandAlignment}%</div>
                    <div className="text-blue-600">Brand Alignment</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-700">{campaignResult.qualityAssessment.consistency}%</div>
                    <div className="text-purple-600">Consistency</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results Display */}
      {campaignResult && (
        <Card className="mt-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center text-ws-forest">
              <Sparkles className="mr-2 h-5 w-5" />
              Generated Campaign Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Images */}
              <div>
                <h4 className="font-semibold text-ws-forest mb-3">Generated Images ({campaignResult.images.length})</h4>
                <div className="space-y-2">
                  {campaignResult.images.map((image, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Image {index + 1}</span>
                        <Badge variant="secondary" className="text-xs">Quality: {image.qualityScore}%</Badge>
                      </div>
                      {image.url && (
                        <img src={image.url} alt={`Generated ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <h4 className="font-semibold text-ws-forest mb-3">Generated Content ({campaignResult.content.length})</h4>
                {campaignResult.content.map((content, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">{content.contentType || 'Content'}</span>
                      <Badge variant="secondary" className="text-xs">Quality: {content.qualityScore}%</Badge>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">{content.content}</p>
                  </div>
                ))}
              </div>

              {/* Code */}
              <div>
                <h4 className="font-semibold text-ws-forest mb-3">Generated Components ({campaignResult.code.length})</h4>
                {campaignResult.code.map((code, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">React Component</span>
                      <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    </div>
                    <pre className="text-xs bg-gray-900 text-gray-300 p-2 rounded overflow-hidden">
                      {code.code?.substring(0, 100)}...
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Optimizations */}
            {campaignResult.qualityAssessment.optimizations && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-ws-forest mb-4 flex items-center">
                  <Zap className="mr-2 h-4 w-4" />
                  AI-Recommended Optimizations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Strengths</h5>
                    <ul className="space-y-1">
                      {campaignResult.qualityAssessment.strengths?.map((strength, index) => (
                        <li key={index} className="text-sm text-green-600 flex items-center">
                          <CheckCircle className="mr-2 h-3 w-3" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Improvements</h5>
                    <ul className="space-y-1">
                      {campaignResult.qualityAssessment.improvements?.map((improvement, index) => (
                        <li key={index} className="text-sm text-orange-600 flex items-center">
                          <ArrowRight className="mr-2 h-3 w-3" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  );
}