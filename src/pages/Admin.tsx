
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Separator } from "@/components/ui/separator";
import AdminSidebar from "@/components/admin/AdminSidebar";

const Admin = () => {
  const user = useUser();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  // If no user, don't render admin content
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-ranch-dark">Moffatt Ranch Admin</h1>
          <p className="text-gray-500">Manage your website content and products</p>
        </div>
        <Separator className="my-6" />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
