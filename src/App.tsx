
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Fruit from "./pages/Fruit";
import Visit from "./pages/Visit";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin Pages
import Admin from "./pages/Admin";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ContentManager from "./pages/admin/ContentManager";
import ProductManager from "./pages/admin/ProductManager";
import SettingsManager from "./pages/admin/SettingsManager";
import FruitManager from "./pages/admin/FruitManager";

const queryClient = new QueryClient();

const App = () => {
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseError, setSupabaseError] = useState(false);

  // Initialize Supabase client
  useEffect(() => {
    const initializeSupabase = () => {
      try {
        // Get environment variables
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        // Check if environment variables are available
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error("Supabase environment variables are missing. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.");
          setSupabaseError(true);
          setIsLoading(false);
          return;
        }

        // Create Supabase client
        const client = createClient(supabaseUrl, supabaseAnonKey);
        setSupabaseClient(client);
      } catch (error) {
        console.error("Failed to initialize Supabase client:", error);
        setSupabaseError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSupabase();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-xl text-gray-500">Loading application...</p>
      </div>
    );
  }

  // Show error state if Supabase could not be initialized
  if (supabaseError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Configuration Error</h1>
        <p className="text-lg text-gray-700 max-w-md mb-6">
          Unable to connect to database services. Please ensure Supabase is properly configured.
        </p>
        <p className="text-sm text-gray-500">
          If you're the developer, check that your Supabase environment variables are correctly set.
        </p>
      </div>
    );
  }

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="fruit" element={<FruitManager />} />
                <Route path="products" element={<ProductManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Route>
              
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/fruit" element={<Fruit />} />
                        <Route path="/visit" element={<Visit />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
