"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, Loader2, Moon, Palette, Sun, Upload, Globe, Shield, Mail } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [settings, setSettings] = useState({
    general: {
      siteName: "ResearchHub",
      siteDescription: "A modern platform for research and knowledge sharing",
      contactEmail: "admin@researchhub.example",
      maxUploadSize: 10,
      defaultLanguage: "en",
      maintenanceMode: false,
    },
    appearance: {
      theme: "system",
      primaryColor: "#FDC830",
      logoUrl: "/logo.png",
      favicon: "/favicon.ico",
      customCss: "",
    },
    notifications: {
      emailNotifications: true,
      proposalSubmissions: true,
      userRegistrations: true,
      systemAlerts: true,
      digestFrequency: "daily",
    },
    security: {
      twoFactorAuth: true,
      passwordPolicy: "strong",
      sessionTimeout: 60,
      ipRestriction: false,
      allowedIps: "",
    },
  })

  const handleGeneralChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [key]: value,
      },
    }))
  }

  const handleAppearanceChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value,
      },
    }))
  }

  const handleNotificationsChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handleSecurityChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings for the ResearchHub platform</p>
        </div>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-md"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Settings saved successfully</span>
          </motion.div>
        )}
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic settings for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => handleGeneralChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleGeneralChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => handleGeneralChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxUploadSize">Maximum Upload Size (MB)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="maxUploadSize"
                      min={1}
                      max={50}
                      step={1}
                      value={[settings.general.maxUploadSize]}
                      onValueChange={(value) => handleGeneralChange("maxUploadSize", value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{settings.general.maxUploadSize} MB</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={settings.general.defaultLanguage}
                    onValueChange={(value) => handleGeneralChange("defaultLanguage", value)}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to temporarily disable the site for users
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) => handleGeneralChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 cursor-pointer hover:border-primary transition-colors ${
                      settings.appearance.theme === "light" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleAppearanceChange("theme", "light")}
                  >
                    <div className="rounded-full bg-background p-2 shadow-sm">
                      <Sun className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 cursor-pointer hover:border-primary transition-colors ${
                      settings.appearance.theme === "dark" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleAppearanceChange("theme", "dark")}
                  >
                    <div className="rounded-full bg-background p-2 shadow-sm">
                      <Moon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 cursor-pointer hover:border-primary transition-colors ${
                      settings.appearance.theme === "system" ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleAppearanceChange("theme", "system")}
                  >
                    <div className="rounded-full bg-background p-2 shadow-sm">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logoUpload">Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 border rounded-md flex items-center justify-center overflow-hidden bg-background">
                      {settings.appearance.logoUrl ? (
                        <img
                          src={settings.appearance.logoUrl || "/placeholder.svg"}
                          alt="Logo"
                          className="max-h-full max-w-full"
                        />
                      ) : (
                        <Globe className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUpload">Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 border rounded-md flex items-center justify-center overflow-hidden bg-background">
                      {settings.appearance.favicon ? (
                        <img
                          src={settings.appearance.favicon || "/placeholder.svg"}
                          alt="Favicon"
                          className="max-h-full max-w-full"
                        />
                      ) : (
                        <Globe className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Favicon
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCss">Custom CSS</Label>
                <Textarea
                  id="customCss"
                  value={settings.appearance.customCss}
                  onChange={(e) => handleAppearanceChange("customCss", e.target.value)}
                  placeholder=":root { /* Custom CSS variables */ }"
                  rows={5}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Add custom CSS to override the default styles of the platform
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how notifications are sent to users and administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Enable email notifications for system events</p>
                    </div>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationsChange("emailNotifications", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Events</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="proposalSubmissions">Proposal Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify administrators when new proposals are submitted
                      </p>
                    </div>
                    <Switch
                      id="proposalSubmissions"
                      checked={settings.notifications.proposalSubmissions}
                      onCheckedChange={(checked) => handleNotificationsChange("proposalSubmissions", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="userRegistrations">User Registrations</Label>
                      <p className="text-sm text-muted-foreground">Notify administrators when new users register</p>
                    </div>
                    <Switch
                      id="userRegistrations"
                      checked={settings.notifications.userRegistrations}
                      onCheckedChange={(checked) => handleNotificationsChange("userRegistrations", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemAlerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify administrators about system issues and alerts
                      </p>
                    </div>
                    <Switch
                      id="systemAlerts"
                      checked={settings.notifications.systemAlerts}
                      onCheckedChange={(checked) => handleNotificationsChange("systemAlerts", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="digestFrequency">Digest Frequency</Label>
                  <RadioGroup
                    id="digestFrequency"
                    value={settings.notifications.digestFrequency}
                    onValueChange={(value) => handleNotificationsChange("digestFrequency", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="realtime" id="realtime" />
                      <Label htmlFor="realtime">Real-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily Digest</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly Digest</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require two-factor authentication for all admin accounts
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select
                    value={settings.security.passwordPolicy}
                    onValueChange={(value) => handleSecurityChange("passwordPolicy", value)}
                  >
                    <SelectTrigger id="passwordPolicy">
                      <SelectValue placeholder="Select password policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="sessionTimeout"
                      min={15}
                      max={240}
                      step={15}
                      value={[settings.security.sessionTimeout]}
                      onValueChange={(value) => handleSecurityChange("sessionTimeout", value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{settings.security.sessionTimeout}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Time in minutes before an inactive session is automatically logged out
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ipRestriction">IP Restriction</Label>
                    <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                  </div>
                  <Switch
                    id="ipRestriction"
                    checked={settings.security.ipRestriction}
                    onCheckedChange={(checked) => handleSecurityChange("ipRestriction", checked)}
                  />
                </div>

                {settings.security.ipRestriction && (
                  <div className="space-y-2">
                    <Label htmlFor="allowedIps">Allowed IP Addresses</Label>
                    <Textarea
                      id="allowedIps"
                      value={settings.security.allowedIps}
                      onChange={(e) => handleSecurityChange("allowedIps", e.target.value)}
                      placeholder="Enter IP addresses, one per line"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter IP addresses or CIDR ranges, one per line (e.g., 192.168.1.1 or 192.168.1.0/24)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

