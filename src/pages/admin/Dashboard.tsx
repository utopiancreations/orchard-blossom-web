
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit as EditIcon, Database as DatabaseIcon, Tag as TagIcon, Settings as SettingsIcon } from "lucide-react";

const Dashboard = () => {
  const user = useUser();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-serif font-semibold text-ranch-dark">Dashboard</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Content Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-gray-500">Editable website pages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Fruit Varieties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15+</p>
            <p className="text-sm text-gray-500">Peaches, nectarines & pears</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-500">Merchandise items</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Quick Access</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/content">
              <EditIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Edit Content</div>
                <div className="text-sm text-gray-500">Update page content</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/fruit">
              <DatabaseIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Manage Fruit</div>
                <div className="text-sm text-gray-500">Update fruit varieties & seasonality</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/products">
              <TagIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Manage Products</div>
                <div className="text-sm text-gray-500">Add or edit merchandise</div>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
            <Link to="/admin/settings">
              <SettingsIcon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Ranch Settings</div>
                <div className="text-sm text-gray-500">Hours, contact info & social links</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
