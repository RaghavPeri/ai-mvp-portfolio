import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { NotebookPen, Copy, Edit, Download, Search, Languages, TrendingUp, Star, RotateCcw } from "lucide-react";
import type { GeneratedContent } from "@shared/schema";

interface ContentAlternative {
  content: string;
  variant: string;
}

export default function ContentStudio() {
  const [contentType, setContentType] = useState("Product Description");
  const [productInfo, setProductInfo] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium (100-200 words)");
  const [keywords, setKeywords] = useState("");
  const [alternatives, setAlternatives] = useState<ContentAlternative[]>([]);
  
  const { toast } = useToast();

  const { data: recentContent, isLoading: loadingContent } = useQuery<GeneratedContent[]>({
    queryKey: ["/api/generated-content"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const generateContentMutation = useMutation({
    mutationFn: async (data: {
      contentType: string;
      productInfo: string;
      tone: string;
      length: string;
      keywords?: string;
    }) => {
      const response = await apiRequest("POST", "/api/generate-content", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAlternatives(data.alternatives || []);
      queryClient.invalidateQueries({ queryKey: ["/api/generated-content"] });
      toast({
        title: "Content Generated Successfully",
        description: "Your content has been created and is ready for use.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!productInfo.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide product information to generate content.",
        variant: "destructive",
      });
      return;
    }

    generateContentMutation.mutate({
      contentType,
      productInfo: productInfo.trim(),
      tone,
      length,
      keywords: keywords.trim() || undefined,
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "Content has been copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadContent = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getWordCount = (text: string) => {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  const latestContent = recentContent?.[0];

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-ws-forest mb-2">AI Content Creation Studio</h2>
        <p className="text-ws-gray text-lg">Generate compelling product descriptions, marketing copy, and brand content with AI assistance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Generation Panel */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-ws-forest mb-4">Content Generator</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Description">Product Description</SelectItem>
                    <SelectItem value="Marketing Email">Marketing Email</SelectItem>
                    <SelectItem value="Social Media Post">Social Media Post</SelectItem>
                    <SelectItem value="Blog Article">Blog Article</SelectItem>
                    <SelectItem value="SEO Meta Description">SEO Meta Description</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Product Information</Label>
                <Textarea 
                  className="h-20 resize-none focus:ring-ws-forest focus:border-transparent"
                  placeholder="Enter key product details, features, materials, dimensions, etc."
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Short (50-100 words)">Short (50-100 words)</SelectItem>
                      <SelectItem value="Medium (100-200 words)">Medium (100-200 words)</SelectItem>
                      <SelectItem value="Long (200+ words)">Long (200+ words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2">Target Keywords</Label>
                <Input 
                  className="focus:ring-ws-forest focus:border-transparent"
                  placeholder="kitchen, dining, ceramic, dishware"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={generateContentMutation.isPending}
                className="w-full bg-ws-forest text-white hover:bg-ws-forest/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {generateContentMutation.isPending ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <NotebookPen className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Content Panel */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-ws-forest">Generated Content</h3>
              {latestContent && (
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(latestContent.generatedText)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => downloadContent(latestContent.generatedText, `content-${latestContent.id}.txt`)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {loadingContent || generateContentMutation.isPending ? (
                <div className="bg-ws-cream rounded-lg p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : latestContent ? (
                <div className="bg-ws-cream rounded-lg p-4">
                  <h4 className="font-semibold text-ws-forest mb-2">
                    {latestContent.contentType}
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {latestContent.generatedText}
                  </p>
                  <div className="flex items-center justify-between text-sm text-ws-gray">
                    <span>{getWordCount(latestContent.generatedText)} words • {latestContent.tone} tone</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-ws-gold" />
                      <span>Quality Score: {latestContent.qualityScore}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-ws-gray">No content generated yet. Create your first content above!</p>
                </div>
              )}

              {/* Alternative versions */}
              {alternatives.map((alt, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-gray-800">Alternative Version {index + 1}</h5>
                    <Badge variant="secondary" className="text-xs">
                      {alt.variant}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {alt.content}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(alt.content)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Optimization Tools */}
            {latestContent && (
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-semibold text-ws-forest mb-3">Optimization Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-blue-50 text-blue-800 hover:bg-blue-100">
                    <Search className="mr-1 h-4 w-4" />
                    SEO Check
                  </Button>
                  <Button variant="outline" size="sm" className="bg-green-50 text-green-800 hover:bg-green-100">
                    <Languages className="mr-1 h-4 w-4" />
                    Translate
                  </Button>
                  <Button variant="outline" size="sm" className="bg-purple-50 text-purple-800 hover:bg-purple-100">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    A/B Test
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
