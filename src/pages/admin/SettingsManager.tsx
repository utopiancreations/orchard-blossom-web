
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type RanchSettings = {
  id?: string;
  hours_weekday: string;
  hours_weekend: string;
  season_start: string;
  season_end: string;
  phone: string;
  email: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
};

const SettingsManager = () => {
  const [settings, setSettings] = useState<RanchSettings>({
    hours_weekday: "9:00 AM - 5:00 PM",
    hours_weekend: "9:00 AM - 5:00 PM",
    season_start: "May 1",
    season_end: "September 30",
    phone: "(925) 555-1234",
    email: "info@moffattranch.com",
    address: "10 Balfour Rd, Brentwood, CA 94513",
    facebook_url: "https://facebook.com/",
    instagram_url: "https://instagram.com/"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }
      
      if (data) {
        setSettings(data);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (field: keyof RanchSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      if (settings.id) {
        // Update existing settings
        const { error } = await supabase
          .from("settings")
          .update({
            hours_weekday: settings.hours_weekday,
            hours_weekend: settings.hours_weekend,
            season_start: settings.season_start,
            season_end: settings.season_end,
            phone: settings.phone,
            email: settings.email,
            address: settings.address,
            facebook_url: settings.facebook_url,
            instagram_url: settings.instagram_url
          })
          .eq("id", settings.id);

        if (error) throw error;
      } else {
        // Create settings
        const { error } = await supabase
          .from("settings")
          .insert([{
            hours_weekday: settings.hours_weekday,
            hours_weekend: settings.hours_weekend,
            season_start: settings.season_start,
            season_end: settings.season_end,
            phone: settings.phone,
            email: settings.email,
            address: settings.address,
            facebook_url: settings.facebook_url,
            instagram_url: settings.instagram_url
          }]);

        if (error) throw error;
      }
      
      toast({
        title: "Settings saved",
        description: "Your ranch settings have been updated successfully",
      });
      
      // Refresh settings
      fetchSettings();
      
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-serif font-semibold text-ranch-dark mb-6">Ranch Settings</h2>
      
      <Tabs defaultValue="hours">
        <TabsList className="mb-6">
          <TabsTrigger value="hours">Hours & Season</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Ranch Hours & Season</CardTitle>
              <CardDescription>Manage your operating hours and season information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hours_weekday">Weekday Hours (Mon-Fri)</Label>
                <Input
                  id="hours_weekday"
                  value={settings.hours_weekday}
                  onChange={(e) => handleSettingChange("hours_weekday", e.target.value)}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hours_weekend">Weekend Hours (Sat-Sun)</Label>
                <Input
                  id="hours_weekend"
                  value={settings.hours_weekend}
                  onChange={(e) => handleSettingChange("hours_weekend", e.target.value)}
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="season_start">Season Start Date</Label>
                <Input
                  id="season_start"
                  value={settings.season_start}
                  onChange={(e) => handleSettingChange("season_start", e.target.value)}
                  placeholder="May 1"
                />
                <p className="text-sm text-gray-500">Format as Month Day (e.g., May 1)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="season_end">Season End Date</Label>
                <Input
                  id="season_end"
                  value={settings.season_end}
                  onChange={(e) => handleSettingChange("season_end", e.target.value)}
                  placeholder="September 30"
                />
                <p className="text-sm text-gray-500">Format as Month Day (e.g., September 30)</p>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={saving || loading}
                className="bg-peach hover:bg-peach/90"
              >
                {saving ? "Saving..." : "Save Hours & Season"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your ranch's contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleSettingChange("phone", e.target.value)}
                  placeholder="(925) 555-1234"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange("email", e.target.value)}
                  placeholder="info@moffattranch.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Ranch Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleSettingChange("address", e.target.value)}
                  placeholder="10 Balfour Rd, Brentwood, CA 94513"
                  rows={3}
                />
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={saving || loading}
                className="bg-peach hover:bg-peach/90"
              >
                {saving ? "Saving..." : "Save Contact Information"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Manage your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  value={settings.facebook_url}
                  onChange={(e) => handleSettingChange("facebook_url", e.target.value)}
                  placeholder="https://facebook.com/your-ranch"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  value={settings.instagram_url}
                  onChange={(e) => handleSettingChange("instagram_url", e.target.value)}
                  placeholder="https://instagram.com/your-ranch"
                />
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={saving || loading}
                className="bg-peach hover:bg-peach/90"
              >
                {saving ? "Saving..." : "Save Social Media Links"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
