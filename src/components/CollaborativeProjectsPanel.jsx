import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Users, Plus, Film, DollarSign, Calendar, Clock, Percent } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const CollaborativeProjectsPanel = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const { user, filmmakerProfiles } = useAuth();
  const { toast } = useToast();
  
  // Mock data for collaborative projects
  const mockProjects = [
    {
      id: 1,
      title: "The Last Frontier",
      description: "A documentary about the last untouched wilderness areas on Earth.",
      status: "active",
      deadline: "2023-12-31",
      budget: 5000,
      royaltySplit: [
        { filmmaker: "John Doe", role: "Director", percentage: 40 },
        { filmmaker: "Jane Smith", role: "Producer", percentage: 30 },
        { filmmaker: "Alex Johnson", role: "Cinematographer", percentage: 30 }
      ],
      thumbnail: "/placeholder.svg",
      progress: 65
    },
    {
      id: 2,
      title: "Urban Legends",
      description: "A series of short films exploring modern urban myths.",
      status: "pending",
      deadline: "2024-03-15",
      budget: 3000,
      royaltySplit: [
        { filmmaker: "John Doe", role: "Writer", percentage: 50 },
        { filmmaker: "Sarah Williams", role: "Director", percentage: 50 }
      ],
      thumbnail: "/placeholder.svg",
      progress: 25
    },
    {
      id: 3,
      title: "Beyond the Horizon",
      description: "A sci-fi anthology exploring possible futures of humanity.",
      status: "completed",
      deadline: "2023-08-01",
      budget: 8000,
      royaltySplit: [
        { filmmaker: "John Doe", role: "Executive Producer", percentage: 20 },
        { filmmaker: "Michael Chen", role: "Director", percentage: 40 },
        { filmmaker: "Lisa Garcia", role: "Writer", percentage: 40 }
      ],
      thumbnail: "/placeholder.svg",
      progress: 100,
      earnings: 12500,
      nftsSold: 25
    }
  ];

  const [projects, setProjects] = useState(mockProjects);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    deadline: "",
    budget: 0,
    collaborators: []
  });
  
  const handleCreateProject = () => {
    // Validate form
    if (!newProject.title || !newProject.description || !newProject.deadline) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields."
      });
      return;
    }
    
    // Create new project
    const createdProject = {
      id: projects.length + 1,
      ...newProject,
      status: "pending",
      progress: 0,
      thumbnail: "/placeholder.svg",
      royaltySplit: [
        { filmmaker: user?.name || "You", role: "Creator", percentage: 100 }
      ]
    };
    
    setProjects([...projects, createdProject]);
    setIsCreateDialogOpen(false);
    setNewProject({
      title: "",
      description: "",
      deadline: "",
      budget: 0,
      collaborators: []
    });
    
    toast({
      title: "Project Created",
      description: "Your collaborative project has been created successfully."
    });
  };
  
  const filteredProjects = projects.filter(project => {
    if (activeTab === "all") return true;
    return project.status === activeTab;
  });
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-100">Collaborative Projects</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 bg-gray-800/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-500/20">All Projects</TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-purple-500/20">Active</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-purple-500/20">Pending</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-purple-500/20">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-lg">
          <Film className="h-12 w-12 mx-auto text-purple-400 opacity-50" />
          <p className="mt-4 text-purple-200">No {activeTab !== 'all' ? activeTab : ''} projects found.</p>
          <Button onClick={() => setIsCreateDialogOpen(true)} variant="outline" className="mt-4 border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <Plus className="h-4 w-4 mr-2" />
            Create a Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="w-full transition-all hover:shadow-lg bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-purple-100">{project.title}</CardTitle>
                  {getStatusBadge(project.status)}
                </div>
                <CardDescription className="text-purple-200">
                  {project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <div className="w-full">
                      <div className="flex justify-between text-white text-xs mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-purple-200">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span>Deadline:</span>
                    </div>
                    <span className="font-medium text-purple-100">{new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-purple-200">
                      <DollarSign className="h-4 w-4 mr-2 text-purple-400" />
                      <span>Budget:</span>
                    </div>
                    <span className="font-medium text-purple-100">{project.budget.toLocaleString()} FILM</span>
                  </div>
                  
                  {project.status === "completed" && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-purple-200">
                        <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                        <span>Earnings:</span>
                      </div>
                      <span className="font-medium text-green-400">{project.earnings.toLocaleString()} FILM</span>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center text-purple-200 text-sm mb-2">
                      <Users className="h-4 w-4 mr-2 text-purple-400" />
                      <span>Collaborators:</span>
                    </div>
                    <div className="flex -space-x-2 overflow-hidden">
                      {project.royaltySplit.map((collaborator, index) => (
                        <div key={index} className="relative group">
                          <Avatar className="h-8 w-8 border-2 border-purple-500">
                            <AvatarFallback className="bg-purple-800 text-white text-xs">
                              {collaborator.filmmaker.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {collaborator.filmmaker} ({collaborator.percentage}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  View Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Create Project Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl bg-gray-900/95 border-purple-500/30 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-100">Create Collaborative Project</DialogTitle>
            <DialogDescription className="text-purple-200">
              Create a new film project and invite other filmmakers to collaborate.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh]">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200">Project Title</label>
                <Input
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  placeholder="Enter project title"
                  className="bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  placeholder="Describe your project"
                  rows={4}
                  className="w-full rounded-md bg-white/10 backdrop-blur-lg border border-purple-500/20 text-purple-100 p-3"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200">Deadline</label>
                <Input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                  className="bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-200">Budget (FILM)</label>
                <Input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({...newProject, budget: parseFloat(e.target.value) || 0})}
                  placeholder="Enter budget amount"
                  className="bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-100"
                />
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter className="bg-gray-800/50 px-6 py-4">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              Cancel
            </Button>
            <Button onClick={handleCreateProject} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaborativeProjectsPanel;
