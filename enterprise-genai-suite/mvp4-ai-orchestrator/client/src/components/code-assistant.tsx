import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Code, Play, Copy, FileDown, GitBranch, TestTube, CheckCircle, Smartphone, Eye, RotateCcw } from "lucide-react";
import type { GeneratedCode } from "@shared/schema";

interface CodeAnalysis {
  typeSafe: boolean;
  responsive: boolean;
  accessible: boolean;
}

export default function CodeAssistant() {
  const [componentType, setComponentType] = useState("Product Card");
  const [requirements, setRequirements] = useState("Create a responsive product card with image, title, price, rating, and add to cart button. Include hover effects and Williams-Sonoma brand styling.");
  const [framework, setFramework] = useState("React + Tailwind");
  const [complexity, setComplexity] = useState("Intermediate");
  const [includeTypeScript, setIncludeTypeScript] = useState(true);
  const [includeComments, setIncludeComments] = useState(true);
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  
  const { toast } = useToast();

  const { data: recentCode, isLoading: loadingCode } = useQuery<GeneratedCode[]>({
    queryKey: ["/api/generated-code"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const generateCodeMutation = useMutation({
    mutationFn: async (data: {
      componentType: string;
      requirements: string;
      framework: string;
      complexity: string;
      includeTypeScript: boolean;
      includeComments: boolean;
    }) => {
      const response = await apiRequest("POST", "/api/generate-code", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data.analysis || null);
      queryClient.invalidateQueries({ queryKey: ["/api/generated-code"] });
      toast({
        title: "Code Generated Successfully",
        description: "Your component code has been created and is ready for use.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!requirements.trim()) {
      toast({
        title: "Missing Requirements",
        description: "Please provide component requirements to generate code.",
        variant: "destructive",
      });
      return;
    }

    generateCodeMutation.mutate({
      componentType,
      requirements: requirements.trim(),
      framework,
      complexity,
      includeTypeScript,
      includeComments,
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "Code has been copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const latestCode = recentCode?.[0];

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-ws-forest mb-2">AI Code Assistant</h2>
        <p className="text-ws-gray text-lg">Generate React components, CSS styles, and JavaScript functions for e-commerce applications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Generation Panel */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-ws-forest mb-4">Code Generator</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Component Type</Label>
                <Select value={componentType} onValueChange={setComponentType}>
                  <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Card">Product Card</SelectItem>
                    <SelectItem value="Shopping Cart">Shopping Cart</SelectItem>
                    <SelectItem value="Product Gallery">Product Gallery</SelectItem>
                    <SelectItem value="Checkout Form">Checkout Form</SelectItem>
                    <SelectItem value="Filter Component">Filter Component</SelectItem>
                    <SelectItem value="Navigation Menu">Navigation Menu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Requirements</Label>
                <Textarea 
                  className="h-24 resize-none font-mono text-sm focus:ring-ws-forest focus:border-transparent"
                  placeholder="Describe the component requirements, props, styling preferences, etc."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Framework</Label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="React + Tailwind">React + Tailwind</SelectItem>
                      <SelectItem value="Vue.js">Vue.js</SelectItem>
                      <SelectItem value="Angular">Angular</SelectItem>
                      <SelectItem value="Vanilla JS">Vanilla JS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Complexity</Label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="typescript" 
                    checked={includeTypeScript}
                    onCheckedChange={(checked) => setIncludeTypeScript(checked as boolean)}
                  />
                  <Label htmlFor="typescript" className="text-sm text-gray-700">Include TypeScript</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="comments" 
                    checked={includeComments}
                    onCheckedChange={(checked) => setIncludeComments(checked as boolean)}
                  />
                  <Label htmlFor="comments" className="text-sm text-gray-700">Add comments</Label>
                </div>
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={generateCodeMutation.isPending}
                className="w-full bg-ws-forest text-white hover:bg-ws-forest/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {generateCodeMutation.isPending ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Code className="mr-2 h-4 w-4" />
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Code Panel */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-ws-forest">Generated Code</h3>
              {latestCode && (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-ws-gold text-white hover:bg-ws-gold/90 border-ws-gold"
                  >
                    <Play className="mr-1 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(latestCode.code)}
                  >
                    <Copy className="mr-1 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              )}
            </div>

            {/* Code Editor Mockup */}
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto" style={{ maxHeight: "400px" }}>
              {loadingCode || generateCodeMutation.isPending ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                  <Skeleton className="h-4 w-2/3 bg-gray-700" />
                  <Skeleton className="h-4 w-4/5 bg-gray-700" />
                </div>
              ) : latestCode ? (
                <pre className="text-gray-300 whitespace-pre-wrap">
                  {latestCode.code}
                </pre>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No code generated yet. Create your first component above!
                </div>
              )}
            </div>

            {/* Code Analysis */}
            {analysis && (
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className={`p-3 rounded-lg ${analysis.typeSafe ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center mb-1">
                    <CheckCircle className={`mr-1 h-4 w-4 ${analysis.typeSafe ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-medium">Type Safe</span>
                  </div>
                  <p className="text-gray-600">
                    {analysis.typeSafe ? 'Full TypeScript support' : 'JavaScript only'}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${analysis.responsive ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center mb-1">
                    <Smartphone className={`mr-1 h-4 w-4 ${analysis.responsive ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-medium">Responsive</span>
                  </div>
                  <p className="text-gray-600">
                    {analysis.responsive ? 'Mobile-first design' : 'Desktop only'}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${analysis.accessible ? 'bg-green-50' : 'bg-red-50'}`}>
                  <div className="flex items-center mb-1">
                    <Eye className={`mr-1 h-4 w-4 ${analysis.accessible ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-medium">Accessible</span>
                  </div>
                  <p className="text-gray-600">
                    {analysis.accessible ? 'WCAG compliant' : 'Needs accessibility review'}
                  </p>
                </div>
              </div>
            )}

            {/* Code Actions */}
            {latestCode && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-gray-700 hover:bg-gray-200">
                    <FileDown className="mr-1 h-4 w-4" />
                    Export to CodeSandbox
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-700 hover:bg-gray-200">
                    <GitBranch className="mr-1 h-4 w-4" />
                    Create Variations
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-700 hover:bg-gray-200">
                    <TestTube className="mr-1 h-4 w-4" />
                    Generate Tests
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
