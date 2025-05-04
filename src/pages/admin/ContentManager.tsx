
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ImageUploader } from "@/components/admin/ImageUploader";

type ContentSection = {
  id: string;
  page: string;
  section: string;
  title: string;
  content: string;
  image_url?: string;
};

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, [activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("page", activeTab);

      if (error) throw error;
      
      setSections(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContent = async (sectionId: string) => {
    const sectionToUpdate = sections.find(s => s.id === sectionId);
    if (!sectionToUpdate) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("content")
        .update({
          title: sectionToUpdate.title,
          content: sectionToUpdate.content,
          image_url: sectionToUpdate.image_url
        })
        .eq("id", sectionId);

      if (error) throw error;
      
      toast({
        title: "Content updated",
        description: "Your changes have been saved",
      });
    } catch (error: any) {
      toast({
        title: "Error updating content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSectionField = (id: string, field: keyof ContentSection, value: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleImageUploaded = (id: string, url: string) => {
    updateSectionField(id, "image_url", url);
  };

  return (
    <div>
      <h2 className="text-xl font-serif font-semibold text-ranch-dark mb-6">Content Manager</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="visit">Visit Us</TabsTrigger>
          <TabsTrigger value="fruit">Our Fruit</TabsTrigger>
          <TabsTrigger value="home">Homepage</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {loading ? (
            <div className="text-center py-12">Loading content...</div>
          ) : sections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No content sections found for this page.</p>
              <p className="text-sm text-gray-500 mt-2">You may need to initialize content for this page.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {sections.map(section => (
                <Card key={section.id} className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle>{section.section}</CardTitle>
                    <CardDescription>Edit this content section</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${section.id}`}>Title</Label>
                      <Input
                        id={`title-${section.id}`}
                        value={section.title}
                        onChange={(e) => updateSectionField(section.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`content-${section.id}`}>Content</Label>
                      <Textarea
                        id={`content-${section.id}`}
                        value={section.content}
                        onChange={(e) => updateSectionField(section.id, "content", e.target.value)}
                        rows={8}
                      />
                    </div>
                    
                    {section.image_url !== undefined && (
                      <div className="space-y-4">
                        <Separator />
                        <Label>Section Image</Label>
                        
                        {section.image_url && (
                          <div className="relative rounded-lg overflow-hidden mb-4 w-40 h-40">
                            <img 
                              src={section.image_url} 
                              alt={section.title} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        
                        <ImageUploader 
                          path={`content/${activeTab}`} 
                          onUploaded={(url) => handleImageUploaded(section.id, url)}
                        />
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <Button
                        onClick={() => handleUpdateContent(section.id)}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
