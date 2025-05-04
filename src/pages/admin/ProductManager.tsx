
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

type Product = {
  id?: string;
  name: string;
  description: string;
  price: string;
  image_url?: string;
  category: string;
  in_stock: boolean;
};

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    category: "merchandise",
    in_stock: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;
      
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (field: keyof Product, value: string | boolean) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProduct = async () => {
    try {
      if (isEditing && currentProduct.id) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update({
            name: currentProduct.name,
            description: currentProduct.description,
            price: currentProduct.price,
            image_url: currentProduct.image_url,
            category: currentProduct.category,
            in_stock: currentProduct.in_stock
          })
          .eq("id", currentProduct.id);

        if (error) throw error;
        
        toast({
          title: "Product updated",
          description: "Your product has been updated successfully",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from("products")
          .insert([
            {
              name: currentProduct.name,
              description: currentProduct.description,
              price: currentProduct.price,
              image_url: currentProduct.image_url,
              category: currentProduct.category,
              in_stock: currentProduct.in_stock
            }
          ]);

        if (error) throw error;
        
        toast({
          title: "Product created",
          description: "Your product has been added successfully",
        });
      }
      
      // Reset form and refresh products
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        category: "merchandise",
        in_stock: true,
      });
      setIsEditing(false);
      setDialogOpen(false);
      fetchProducts();
      
    } catch (error: any) {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully",
      });
      
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct({...product});
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleAddNewProduct = () => {
    setCurrentProduct({
      name: "",
      description: "",
      price: "",
      category: "merchandise",
      in_stock: true,
    });
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleImageUploaded = (url: string) => {
    setCurrentProduct(prev => ({ ...prev, image_url: url }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif font-semibold text-ranch-dark">Product Manager</h2>
        <Button onClick={handleAddNewProduct} className="bg-peach hover:bg-peach/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <Tabs defaultValue="merchandise">
        <TabsList className="mb-6">
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          <TabsTrigger value="fruit">Fruit Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="merchandise">
          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : products.filter(p => p.category === "merchandise").length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No merchandise products found.</p>
              <Button onClick={handleAddNewProduct} className="mt-4">
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(product => product.category === "merchandise")
                .map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    {product.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">No image</p>
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{product.name}</span>
                        <span className="text-peach">${product.price}</span>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3">{product.description}</p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => product.id && handleDeleteProduct(product.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="fruit">
          {/* Similar content for fruit products */}
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Fruit product management coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={currentProduct.name}
                onChange={(e) => handleProductChange("name", e.target.value)}
                placeholder="Product name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentProduct.description}
                onChange={(e) => handleProductChange("description", e.target.value)}
                placeholder="Product description"
                rows={4}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                value={currentProduct.price}
                onChange={(e) => handleProductChange("price", e.target.value)}
                placeholder="29.99"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={currentProduct.category}
                onChange={(e) => handleProductChange("category", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="merchandise">Merchandise</option>
                <option value="fruit">Fruit</option>
              </select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="in_stock">Availability</Label>
              <select
                id="in_stock"
                value={currentProduct.in_stock ? "true" : "false"}
                onChange={(e) => handleProductChange("in_stock", e.target.value === "true")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            
            <div className="grid gap-2">
              <Label>Product Image</Label>
              <ImageUploader 
                path="products" 
                onUploaded={handleImageUploaded} 
                existingUrl={currentProduct.image_url}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveProduct} className="bg-peach hover:bg-peach/90">
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
