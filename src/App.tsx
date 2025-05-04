
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

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

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const App = () => (
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

export default App;
