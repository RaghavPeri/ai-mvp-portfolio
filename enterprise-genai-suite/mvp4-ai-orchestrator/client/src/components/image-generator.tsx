import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { WandSparkles, Download, Share, Eye, Edit, RotateCcw, Palette, Crop } from "lucide-react";
import type { GeneratedImage } from "@shared/schema";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [brandStyle, setBrandStyle] = useState("Williams-Sonoma Classic");
  const [aspectRatio, setAspectRatio] = useState("Square (1:1)");
  const [quality, setQuality] = useState("High Quality");
  const [batchSize, setBatchSize] = useState([4]);
  const [currentSessionImages, setCurrentSessionImages] = useState<GeneratedImage[]>([]);
  
  const { toast } = useToast();

  const { data: recentImages, isLoading: loadingImages } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/generated-images"],
    staleTime: 0, // Don't cache to show only fresh results
    refetchOnMount: true,
  });

  const generateImagesMutation = useMutation({
    mutationFn: async (data: {
      prompt: string;
      brandStyle: string;
      aspectRatio: string;
      quality: string;
      batchSize: number;
    }) => {
      const response = await apiRequest("POST", "/api/generate-images", data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/generated-images"] });
      // Store current session images to show them prominently
      setCurrentSessionImages(data.images || []);
      toast({
        title: "Images Generated Successfully",
        description: "Your product images have been created and are ready for download.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate images. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Description",
        description: "Please provide a product description to generate images.",
        variant: "destructive",
      });
      return;
    }

    generateImagesMutation.mutate({
      prompt: prompt.trim(),
      brandStyle,
      aspectRatio,
      quality,
      batchSize: batchSize[0],
    });
  };

  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getQualityBadgeColor = (score: number) => {
    if (score >= 95) return "bg-green-500";
    if (score >= 90) return "bg-green-500";
    if (score >= 85) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleRefinement = (type: string) => {
    if (!recentImages || recentImages.length === 0) {
      toast({
        title: "No Images Available",
        description: "Please generate some images first before using refinement tools.",
        variant: "destructive",
      });
      return;
    }

    switch (type) {
      case 'lighting':
        generateRefinedImage("adjust lighting and exposure for better product visibility");
        break;
      case 'color':
        generateRefinedImage("create color variations with different tones and hues");
        break;
      case 'crop':
        toast({
          title: "Crop & Resize",
          description: "This feature would open an image editor for manual cropping and resizing.",
        });
        break;
      case 'background':
        generateRefinedImage("remove background and place on clean white studio background");
        break;
      default:
        break;
    }
  };

  const generateRefinedImage = (refinementPrompt: string) => {
    const latestImage = recentImages?.[0];
    if (!latestImage) return;

    const refinedPrompt = `${latestImage.prompt}, ${refinementPrompt}`;
    
    generateImagesMutation.mutate({
      prompt: refinedPrompt,
      brandStyle: latestImage.brandStyle,
      aspectRatio,
      quality,
      batchSize: 2, // Generate fewer for refinements
    });

    toast({
      title: "Refining Images",
      description: "Creating improved versions based on your latest image...",
    });
  };

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-ws-forest mb-2">AI Product Image Generator</h2>
        <p className="text-ws-gray text-lg">Create stunning product imagery with AI-powered generation and Williams-Sonoma brand styling.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-ws-forest mb-4">Generate Product Images</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Product Description</Label>
                  <Textarea 
                    className="h-24 resize-none focus:ring-ws-forest focus:border-transparent"
                    placeholder="Describe your product (e.g., 'Modern ceramic dinner plate with organic shape, white with subtle texture')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Brand Style</Label>
                  <Select value={brandStyle} onValueChange={setBrandStyle}>
                    <SelectTrigger className="focus:ring-ws-forest focus:border-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Williams-Sonoma Classic">Williams-Sonoma Classic</SelectItem>
                      <SelectItem value="West Elm Modern">West Elm Modern</SelectItem>
                      <SelectItem value="Pottery Barn Rustic">Pottery Barn Rustic</SelectItem>
                      <SelectItem value="Williams-Sonoma Home Luxury">Williams-Sonoma Home Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Image Settings</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Select value={aspectRatio} onValueChange={setAspectRatio}>
                      <SelectTrigger className="focus:ring-ws-forest focus:border-transparent text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Square (1:1)">Square (1:1)</SelectItem>
                        <SelectItem value="Landscape (16:9)">Landscape (16:9)</SelectItem>
                        <SelectItem value="Portrait (4:5)">Portrait (4:5)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger className="focus:ring-ws-forest focus:border-transparent text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High Quality">High Quality</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">Batch Size</Label>
                  <div className="flex items-center space-x-3">
                    <Slider
                      value={batchSize}
                      onValueChange={setBatchSize}
                      max={4}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-ws-gray w-8">{batchSize[0]}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={generateImagesMutation.isPending}
                  className="w-full bg-ws-forest text-white hover:bg-ws-forest/90 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {generateImagesMutation.isPending ? (
                    <>
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <WandSparkles className="mr-2 h-4 w-4" />
                      Generate Images
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-ws-forest">Generated Images</h3>
                  {currentSessionImages.length > 0 && (
                    <p className="text-sm text-ws-gray mt-1">
                      Latest generation: "{prompt.substring(0, 50)}..."
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-ws-gold text-white hover:bg-ws-gold/90 border-ws-gold"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Download All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentSessionImages([])}
                  >
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {generateImagesMutation.isPending ? (
                  Array.from({ length: batchSize[0] }).map((_, i) => (
                    <div key={i} className="aspect-square">
                      <Skeleton className="w-full h-full rounded-lg" />
                    </div>
                  ))
                ) : currentSessionImages.length > 0 ? (
                  currentSessionImages.map((image) => (
                    <div key={image.id} className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer hover:shadow-lg transition-all duration-200">
                      <img 
                        src={image.imageUrl} 
                        alt={image.prompt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                          <Button size="sm" variant="secondary" className="p-2 rounded-full shadow-lg">
                            <Eye className="h-4 w-4 text-ws-forest" />
                          </Button>
                          <Button size="sm" variant="secondary" className="p-2 rounded-full shadow-lg">
                            <Edit className="h-4 w-4 text-ws-forest" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            className="p-2 rounded-full shadow-lg"
                            onClick={() => downloadImage(image.imageUrl, `product-image-${image.id}.png`)}
                          >
                            <Download className="h-4 w-4 text-ws-forest" />
                          </Button>
                        </div>
                      </div>
                      <div className={`absolute top-2 right-2 ${getQualityBadgeColor(image.qualityScore)} text-white px-2 py-1 rounded text-xs font-medium`}>
                        {image.qualityScore}%
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-12">
                    <p className="text-ws-gray">No images generated yet. Create your first product image above!</p>
                    {recentImages && recentImages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs text-ws-gray mb-2">Previous generations:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {recentImages.slice(0, 4).map((image) => (
                            <div key={image.id} className="relative">
                              <img 
                                src={image.imageUrl} 
                                alt="Previous generation"
                                className="w-full h-16 object-cover rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={() => setCurrentSessionImages([image])}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Image Refinement Tools */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-ws-forest mb-4">Refinement Tools</h4>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-ws-forest border-ws-forest hover:bg-ws-forest hover:text-white"
                    onClick={() => handleRefinement('lighting')}
                  >
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Adjust Lighting
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-ws-forest border-ws-forest hover:bg-ws-forest hover:text-white"
                    onClick={() => handleRefinement('color')}
                  >
                    <Palette className="mr-1 h-4 w-4" />
                    Color Variants
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-ws-forest border-ws-forest hover:bg-ws-forest hover:text-white"
                    onClick={() => handleRefinement('crop')}
                  >
                    <Crop className="mr-1 h-4 w-4" />
                    Crop & Resize
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-ws-forest border-ws-forest hover:bg-ws-forest hover:text-white"
                    onClick={() => handleRefinement('background')}
                  >
                    <WandSparkles className="mr-1 h-4 w-4" />
                    Background Removal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
