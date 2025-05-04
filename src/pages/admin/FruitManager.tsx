
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Edit, Trash, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Fruit = {
  id?: string;
  name: string;
  description: string;
  type: "yellow_peach" | "white_peach" | "yellow_nectarine" | "white_nectarine" | "asian_pear";
  available_from: string;
  available_to: string;
  image_url?: string;
  is_featured: boolean;
};

const fruitTypeOptions = [
  { value: "yellow_peach", label: "Yellow Peach" },
  { value: "white_peach", label: "White Peach" },
  { value: "yellow_nectarine", label: "Yellow Nectarine" },
  { value: "white_nectarine", label: "White Nectarine" },
  { value: "asian_pear", label: "Asian Pear" },
];

const FruitManager = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("yellow_peach");
  const [currentFruit, setCurrentFruit] = useState<Fruit>({
    name: "",
    description: "",
    type: "yellow_peach",
    available_from: "",
    available_to: "",
    is_featured: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("fruits")
        .select("*")
        .order("name");

      if (error) throw error;
      
      setFruits(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching fruits",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFruitChange = (field: keyof Fruit, value: any) => {
    setCurrentFruit(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveFruit = async () => {
    try {
      if (isEditing && currentFruit.id) {
        // Update existing fruit
        const { error } = await supabase
          .from("fruits")
          .update({
            name: currentFruit.name,
            description: currentFruit.description,
            type: currentFruit.type,
            available_from: currentFruit.available_from,
            available_to: currentFruit.available_to,
            image_url: currentFruit.image_url,
            is_featured: currentFruit.is_featured
          })
          .eq("id", currentFruit.id);

        if (error) throw error;
        
        toast({
          title: "Fruit updated",
          description: "Your fruit has been updated successfully",
        });
      } else {
        // Create new fruit
        const { error } = await supabase
          .from("fruits")
          .insert([
            {
              name: currentFruit.name,
              description: currentFruit.description,
              type: currentFruit.type,
              available_from: currentFruit.available_from,
              available_to: currentFruit.available_to,
              image_url: currentFruit.image_url,
              is_featured: currentFruit.is_featured
            }
          ]);

        if (error) throw error;
        
        toast({
          title: "Fruit created",
          description: "Your fruit has been added successfully",
        });
      }
      
      // Reset form and refresh fruits
      setCurrentFruit({
        name: "",
        description: "",
        type: "yellow_peach",
        available_from: "",
        available_to: "",
        is_featured: false,
      });
      setIsEditing(false);
      setDialogOpen(false);
      fetchFruits();
      
    } catch (error: any) {
      toast({
        title: "Error saving fruit",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteFruit = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fruit?")) return;
    
    try {
      const { error } = await supabase
        .from("fruits")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Fruit deleted",
        description: "The fruit has been removed successfully",
      });
      
      fetchFruits();
    } catch (error: any) {
      toast({
        title: "Error deleting fruit",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditFruit = (fruit: Fruit) => {
    setCurrentFruit({...fruit});
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleAddNewFruit = () => {
    setCurrentFruit({
      name: "",
      description: "",
      type: activeTab as any,
      available_from: "",
      available_to: "",
      is_featured: false,
    });
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleImageUploaded = (url: string) => {
    setCurrentFruit(prev => ({ ...prev, image_url: url }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif font-semibold text-ranch-dark">Fruit Varieties</h2>
        <Button onClick={handleAddNewFruit} className="bg-peach hover:bg-peach/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Fruit
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {fruitTypeOptions.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {fruitTypeOptions.map((fruitType) => (
          <TabsContent key={fruitType.value} value={fruitType.value}>
            {loading ? (
              <div className="text-center py-12">Loading fruits...</div>
            ) : fruits.filter(f => f.type === fruitType.value).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No {fruitType.label.toLowerCase()} varieties found.</p>
                <Button onClick={handleAddNewFruit} className="mt-4">
                  Add Your First {fruitType.label}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fruits
                  .filter(fruit => fruit.type === fruitType.value)
                  .map(fruit => (
                    <Card key={fruit.id} className="overflow-hidden">
                      {fruit.image_url ? (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={fruit.image_url} 
                            alt={fruit.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                          <p className="text-gray-500">No image</p>
                        </div>
                      )}
                      
                      <CardHeader>
                        <CardTitle className="flex justify-between">
                          <span>{fruit.name}</span>
                          {fruit.is_featured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-peach/10 text-peach">
                              Featured
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3">{fruit.description}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          Available: {fruit.available_from} - {fruit.available_to}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditFruit(fruit)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => fruit.id && handleDeleteFruit(fruit.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Fruit' : 'Add New Fruit'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your fruit variety. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Fruit Name</Label>
              <Input
                id="name"
                value={currentFruit.name}
                onChange={(e) => handleFruitChange("name", e.target.value)}
                placeholder="Red Haven"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentFruit.description}
                onChange={(e) => handleFruitChange("description", e.target.value)}
                placeholder="Sweet and juicy peach with a beautiful red blush..."
                rows={4}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Fruit Type</Label>
              <select
                id="type"
                value={currentFruit.type}
                onChange={(e) => handleFruitChange("type", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                {fruitTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="available_from">Available From</Label>
                <Input
                  id="available_from"
                  value={currentFruit.available_from}
                  onChange={(e) => handleFruitChange("available_from", e.target.value)}
                  placeholder="Early June"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="available_to">Available To</Label>
                <Input
                  id="available_to"
                  value={currentFruit.available_to}
                  onChange={(e) => handleFruitChange("available_to", e.target.value)}
                  placeholder="Late June"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={currentFruit.is_featured}
                  onChange={(e) => handleFruitChange("is_featured", e.target.checked)}
                  className="rounded border-gray-300 text-peach focus:ring-peach"
                />
                <Label htmlFor="is_featured">Feature this variety on the homepage</Label>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Fruit Image</Label>
              <ImageUploader 
                path="fruits" 
                onUploaded={handleImageUploaded} 
                existingUrl={currentFruit.image_url}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveFruit} className="bg-peach hover:bg-peach/90">
              {isEditing ? 'Update Fruit' : 'Add Fruit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FruitManager;
