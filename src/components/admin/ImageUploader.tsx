
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  path: string;
  onUploaded: (url: string) => void;
  existingUrl?: string;
}

export const ImageUploader = ({ path, onUploaded, existingUrl }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    setUploading(true);

    try {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Upload to supabase
      const { error: uploadError, data } = await supabase.storage
        .from('moffatt-ranch')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from('moffatt-ranch')
        .getPublicUrl(filePath);

      if (publicUrl && publicUrl.publicUrl) {
        onUploaded(publicUrl.publicUrl);
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      // Reset preview on error
      setPreview(existingUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploaded('');
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative w-40 h-40">
          <img 
            src={preview} 
            alt="Preview" 
            className="object-cover w-full h-full rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <label 
            htmlFor="image-upload"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            <span>Upload image</span>
            <Input 
              id="image-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
          {uploading && <span className="ml-3 text-sm text-gray-500">Uploading...</span>}
        </div>
      )}
    </div>
  );
};
