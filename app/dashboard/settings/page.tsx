"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, Moon, Palette, Sun } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [settings, setSettings] = useState({
    appearance: {
      theme: "system",
      fontSize: "medium",
      reducedMotion: false,
      highContrast: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showInstitution: true,
      allowDataCollection: true,
    },
    accessibility: {
      screenReader: false,
      keyboardNavigation: true,
      textToSpeech: false,
    },
  })

  useEffect(() => {
    // Get user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        router.push("/signin")
      }
      setIsLoading(false)
    }
  }, [router])

  const handleAppearanceChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value,
      },
    }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const handleAccessibilityChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Apply theme change
      if (typeof document !== "undefined") {
        const htmlElement = document.documentElement

        if (settings.appearance.theme === "dark") {
          htmlElement.classList.add("dark")
        } else if (settings.appearance.theme === "light") {
          htmlElement.classList.remove("dark")
        }

        if (settings.appearance.highContrast) {
          htmlElement.classList.add("high-contrast")
        } else {
          htmlElement.classList.remove("high-contrast")
        }
      }

      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and account settings</p>
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

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how ResearchHub looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
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
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select
                    value={settings.appearance.fontSize}
                    onValueChange={(value) => handleAppearanceChange("fontSize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    id="reduced-motion"
                    checked={settings.appearance.reducedMotion}
                    onCheckedChange={(checked) => handleAppearanceChange("reducedMotion", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={settings.appearance.highContrast}
                    onCheckedChange={(checked) => handleAppearanceChange("highContrast", checked)}
                  />
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

        <TabsContent value="privacy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="researchers">Researchers Only - Visible to other researchers</SelectItem>
                      <SelectItem value="private">Private - Visible only to you</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Control who can see your profile information</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Information Sharing</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-email">Show Email Address</Label>
                      <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                    </div>
                    <Switch
                      id="show-email"
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-institution">Show Institution</Label>
                      <p className="text-sm text-muted-foreground">Allow others to see your institution</p>
                    </div>
                    <Switch
                      id="show-institution"
                      checked={settings.privacy.showInstitution}
                      onCheckedChange={(checked) => handlePrivacyChange("showInstitution", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Data Collection</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Allow Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow ResearchHub to collect usage data to improve the platform
                      </p>
                    </div>
                    <Switch
                      id="data-collection"
                      checked={settings.privacy.allowDataCollection}
                      onCheckedChange={(checked) => handlePrivacyChange("allowDataCollection", checked)}
                    />
                  </div>
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

        <TabsContent value="accessibility" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>Configure accessibility settings to improve your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="screen-reader">Screen Reader Support</Label>
                    <p className="text-sm text-muted-foreground">Optimize the interface for screen readers</p>
                  </div>
                  <Switch
                    id="screen-reader"
                    checked={settings.accessibility.screenReader}
                    onCheckedChange={(checked) => handleAccessibilityChange("screenReader", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="keyboard-navigation">Keyboard Navigation</Label>
                    <p className="text-sm text-muted-foreground">Enable enhanced keyboard navigation</p>
                  </div>
                  <Switch
                    id="keyboard-navigation"
                    checked={settings.accessibility.keyboardNavigation}
                    onCheckedChange={(checked) => handleAccessibilityChange("keyboardNavigation", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="text-to-speech">Text-to-Speech</Label>
                    <p className="text-sm text-muted-foreground">Enable text-to-speech functionality</p>
                  </div>
                  <Switch
                    id="text-to-speech"
                    checked={settings.accessibility.textToSpeech}
                    onCheckedChange={(checked) => handleAccessibilityChange("textToSpeech", checked)}
                  />
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
      </Tabs>
    </div>
  )
}

