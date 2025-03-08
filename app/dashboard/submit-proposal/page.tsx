"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, FileText, Upload, Leaf, Heart, Cpu, Cloud, Brain, Plus, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Research agenda categories with descriptions
const RESEARCH_AGENDAS = [
  {
    id: "aanr",
    name: "AANR",
    fullName: "Agriculture, Aquatic and Natural Resources",
    icon: Leaf,
    color: "bg-green-100 text-green-800 border-green-200",
    description: "Research focused on sustainable agriculture, aquatic resources, and natural resource management.",
  },
  {
    id: "health",
    name: "Health",
    fullName: "Health Research and Development",
    icon: Heart,
    color: "bg-red-100 text-red-800 border-red-200",
    description: "Research addressing health challenges, medical innovations, and healthcare systems.",
  },
  {
    id: "ieet",
    name: "IEET",
    fullName: "Industry, Energy and Emerging Technology",
    icon: Cpu,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Research on industrial innovation, energy solutions, and emerging technologies.",
  },
  {
    id: "drrcc",
    name: "DRRCC",
    fullName: "Disaster Risk Reduction and Climate Change",
    icon: Cloud,
    color: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Research on disaster preparedness, risk reduction, and climate change adaptation.",
  },
  {
    id: "scinnb",
    name: "SCINNB",
    fullName: "Science, Innovation and Nation Building",
    icon: Brain,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Research contributing to scientific advancement, innovation, and national development.",
  },
]

export default function SubmitProposalPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    researchAgenda: "",
    abstract: "",
    objectives: "",
    methodology: "",
    timeline: "",
    budget: "",
    team: "",
    files: [] as File[],
    collaborationType: "individual",
    collaborators: [{ id: "1", name: "", email: "", role: "", institution: "" }],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files || [])],
      }))
    }
  }

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleCollaboratorChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedCollaborators = [...prev.collaborators]
      updatedCollaborators[index] = { ...updatedCollaborators[index], [field]: value }
      return { ...prev, collaborators: updatedCollaborators }
    })
  }

  const addCollaborator = () => {
    if (formData.collaborators.length < 5) {
      setFormData((prev) => ({
        ...prev,
        collaborators: [
          ...prev.collaborators,
          { id: Date.now().toString(), name: "", email: "", role: "", institution: "" },
        ],
      }))
    }
  }

  const removeCollaborator = (index: number) => {
    if (formData.collaborators.length > 1) {
      setFormData((prev) => ({
        ...prev,
        collaborators: prev.collaborators.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/my-proposals")
      }, 2000)
    } catch (error) {
      console.error("Error submitting proposal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard/my-proposals")
    } catch (error) {
      console.error("Error saving draft:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Alert className="max-w-md border-green-500">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your proposal has been submitted successfully. It will now go through the initial screening process.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const selectedAgenda = RESEARCH_AGENDAS.find((agenda) => agenda.id === formData.researchAgenda)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit Research Proposal</h1>
        <p className="text-muted-foreground">Complete the form below to submit your research proposal for review.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Proposal Details</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="review">Review & Submit</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the basic details of your research proposal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter the title of your research proposal"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="researchAgenda">Research Agenda</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                  {RESEARCH_AGENDAS.map((agenda) => {
                    const AgendaIcon = agenda.icon
                    return (
                      <div
                        key={agenda.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          formData.researchAgenda === agenda.id
                            ? `border-2 ${agenda.color.split(" ")[0]} shadow-sm`
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleSelectChange("researchAgenda", agenda.id)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded-md ${agenda.color.split(" ")[0]}`}>
                            <AgendaIcon className={`h-4 w-4 ${agenda.color.split(" ")[1]}`} />
                          </div>
                          <div className="font-medium">{agenda.name}</div>
                          {formData.researchAgenda === agenda.id && (
                            <Badge variant="outline" className={agenda.color}>
                              Selected
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{agenda.fullName}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {selectedAgenda && (
                <Alert className={`${selectedAgenda.color} border`}>
                  <selectedAgenda.icon className="h-4 w-4" />
                  <AlertTitle>{selectedAgenda.fullName}</AlertTitle>
                  <AlertDescription className="text-sm">{selectedAgenda.description}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="category">Research Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health Sciences</SelectItem>
                    <SelectItem value="technology">Technology & Engineering</SelectItem>
                    <SelectItem value="social">Social Sciences</SelectItem>
                    <SelectItem value="natural">Natural Sciences</SelectItem>
                    <SelectItem value="humanities">Humanities</SelectItem>
                    <SelectItem value="business">Business & Economics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  placeholder="Provide a brief summary of your research proposal"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Research Details</CardTitle>
              <CardDescription>
                Provide detailed information about your research methodology and objectives.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objectives">Research Objectives</Label>
                <Textarea
                  id="objectives"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  placeholder="List the main objectives of your research"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="methodology">Methodology</Label>
                <Textarea
                  id="methodology"
                  name="methodology"
                  value={formData.methodology}
                  onChange={handleChange}
                  placeholder="Describe your research methodology"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Textarea
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="Outline the timeline for your research"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Textarea
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Provide a breakdown of your research budget"
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
                Save as Draft
              </Button>
              <Button onClick={() => setActiveTab("collaboration")} disabled={isSubmitting}>
                Next: Collaboration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Team</CardTitle>
              <CardDescription>Specify if this is an individual or collaborative research project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Collaboration Type</Label>
                <RadioGroup
                  value={formData.collaborationType}
                  onValueChange={(value) => handleSelectChange("collaborationType", value)}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="font-normal cursor-pointer">
                      Individual Research
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="collaborative" id="collaborative" />
                    <Label htmlFor="collaborative" className="font-normal cursor-pointer">
                      Collaborative Research (1-5 members)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.collaborationType === "collaborative" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Research Team Members</h3>
                      <p className="text-xs text-muted-foreground">Add up to 5 team members including yourself</p>
                    </div>
                    {formData.collaborators.length < 5 && (
                      <Button size="sm" variant="outline" onClick={addCollaborator} className="flex items-center gap-1">
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Member</span>
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {formData.collaborators.map((collaborator, index) => (
                      <Card key={collaborator.id} className="relative">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {index === 0 ? "PI" : `C${index}`}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">
                                  {index === 0 ? "Principal Investigator" : `Co-Investigator ${index}`}
                                </CardTitle>
                                {index === 0 && <CardDescription className="text-xs">This is you</CardDescription>}
                              </div>
                            </div>
                            {index > 0 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 absolute top-3 right-3"
                                onClick={() => removeCollaborator(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`name-${index}`}>Full Name</Label>
                              <Input
                                id={`name-${index}`}
                                value={collaborator.name}
                                onChange={(e) => handleCollaboratorChange(index, "name", e.target.value)}
                                placeholder="Enter full name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`email-${index}`}>Email Address</Label>
                              <Input
                                id={`email-${index}`}
                                type="email"
                                value={collaborator.email}
                                onChange={(e) => handleCollaboratorChange(index, "email", e.target.value)}
                                placeholder="Enter email address"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`role-${index}`}>Role in Research</Label>
                              <Input
                                id={`role-${index}`}
                                value={collaborator.role}
                                onChange={(e) => handleCollaboratorChange(index, "role", e.target.value)}
                                placeholder="e.g., Data Analyst, Field Researcher"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`institution-${index}`}>Institution/Organization</Label>
                              <Input
                                id={`institution-${index}`}
                                value={collaborator.institution}
                                onChange={(e) => handleCollaboratorChange(index, "institution", e.target.value)}
                                placeholder="Enter affiliated institution"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")} disabled={isSubmitting}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("documents")} disabled={isSubmitting}>
                Next: Documents
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>Upload all required documents for your research proposal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="files">Research Proposal Document</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Supported formats: PDF, DOCX, PPT (Max size: 10MB)
                  </p>
                  <Input
                    id="files"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.docx,.doc,.ppt,.pptx"
                  />
                  <Button variant="outline" onClick={() => document.getElementById("files")?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-2 mt-4">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("collaboration")} disabled={isSubmitting}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("review")} disabled={isSubmitting}>
                Next: Review
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Your Submission</CardTitle>
              <CardDescription>Please review all information before submitting your proposal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Once submitted, your proposal will go through the initial screening process. You will be notified of
                  the results via email.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium">Proposal Title</h3>
                  <p className="text-sm">{formData.title || "Not provided"}</p>
                </div>

                <div>
                  <h3 className="font-medium">Research Agenda</h3>
                  {selectedAgenda ? (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={selectedAgenda.color}>
                        <selectedAgenda.icon className="h-3.5 w-3.5 mr-1" />
                        {selectedAgenda.name}
                      </Badge>
                      <span className="text-sm">{selectedAgenda.fullName}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not selected</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium">Research Category</h3>
                  <p className="text-sm capitalize">{formData.category || "Not selected"}</p>
                </div>

                <div>
                  <h3 className="font-medium">Abstract</h3>
                  <p className="text-sm">{formData.abstract || "Not provided"}</p>
                </div>

                <div>
                  <h3 className="font-medium">Collaboration Type</h3>
                  <p className="text-sm capitalize">
                    {formData.collaborationType === "individual" ? "Individual Research" : "Collaborative Research"}
                  </p>
                </div>

                {formData.collaborationType === "collaborative" && (
                  <div>
                    <h3 className="font-medium">Research Team</h3>
                    <div className="mt-2 space-y-2">
                      {formData.collaborators.map((collaborator, index) => (
                        <div key={collaborator.id} className="text-sm border rounded-md p-2">
                          <div className="font-medium">
                            {index === 0 ? "Principal Investigator" : `Co-Investigator ${index}`}
                          </div>
                          <div className="text-muted-foreground">
                            {collaborator.name || "Name not provided"} • {collaborator.email || "Email not provided"}
                          </div>
                          {(collaborator.role || collaborator.institution) && (
                            <div className="text-muted-foreground mt-1">
                              {collaborator.role && <span>{collaborator.role}</span>}
                              {collaborator.role && collaborator.institution && <span> • </span>}
                              {collaborator.institution && <span>{collaborator.institution}</span>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium">Uploaded Documents</h3>
                  {formData.files.length > 0 ? (
                    <ul className="text-sm list-disc pl-5">
                      {formData.files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No documents uploaded</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("documents")} disabled={isSubmitting}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

