import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, Mail, MessageCircle, ExternalLink, X } from "lucide-react";
import digidyeImage from "@assets/digidye.png";
import mediapipeImage from "@assets/mediapipe.png";
import { useState } from "react";

export default function Contact() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleContact = (method: string) => {
    if (method === 'email') {
      window.location.href = 'mailto:lytran.31241021372@st.ueh.edu.vn';
    } else {
      console.log(`Contact via ${method} clicked`);
      // todo: remove mock functionality - implement real contact methods
    }
  };

  const handleProjectView = (projectIndex: number) => {
    setSelectedProject(projectIndex);
  };

  const projects = [
    {
      name: "DigiDye Project",
      description: "Computer graphics class project showcasing digital art techniques",
      tech: ["Computer Graphics", "Digital Art"],
      year: "2024",
      image: digidyeImage,
      detailDescription: "A digital pixel-coloring software that allows users to import images, apply various mood filters, and color individual pixels or pixel clusters using different tools. It also supports tracking the number of colored pixels and downloading the final image at any time.",
      role: "Backend and frontend — responsible for processing pixelation algorithms and pixel-coloring data algorithms."
    },
    {
      name: "MediaPipe Interactive Art",
      description: "Interactive processing interfaces using MediaPipe for group projects",
      tech: ["MediaPipe", "Interactive Art", "AI"],
      year: "2025",
      image: mediapipeImage,
      detailDescription: "An interactive interface that tracks hand movements. When the hand forms a bird-wing gesture, it activates the bird's flight path around the globe, illuminating the Earth and conveying a message of peace.",
      role: "Processing software — responsible for collaborative logic tracking and flight motion algorithms."
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating or discussing art, technology, and creative projects?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-6">
                  I'm always excited to connect with fellow creators, developers, and anyone interested in the intersection of art and technology.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover-elevate"
                    onClick={() => handleContact('email')}
                    data-testid="contact-email"
                  >
                    <Mail className="h-4 w-4 mr-3" />
                    Email Me
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover-elevate"
                    onClick={() => handleContact('github')}
                    data-testid="contact-github"
                  >
                    <Github className="h-4 w-4 mr-3" />
                    View My Code
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start hover-elevate"
                    onClick={() => handleContact('message')}
                    data-testid="contact-message"
                  >
                    <MessageCircle className="h-4 w-4 mr-3" />
                    Send a Message
                  </Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Areas of Interest</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Digital Art</Badge>
                    <Badge variant="secondary">AI Development</Badge>
                    <Badge variant="secondary">Interactive Media</Badge>
                    <Badge variant="secondary">Game Industry</Badge>
                    <Badge variant="secondary">Japanese Culture</Badge>
                    <Badge variant="secondary">Creative Coding</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Projects */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">Featured Projects</h3>
            <div className="space-y-4">
              {projects.map((project, index) => {
                const getBackgroundStyle = () => {
                  if (index === 0) { // DigiDye Project
                    return {
                      backgroundImage: `url(${digidyeImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative' as const
                    };
                  }
                  if (index === 1) { // MediaPipe Interactive Art
                    return {
                      backgroundImage: `url(${mediapipeImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative' as const
                    };
                  }
                  return {};
                };

                return (
                  <Card 
                    key={index} 
                    className="hover-elevate transition-all duration-300 overflow-hidden" 
                    data-testid={`project-${index}`}
                    style={getBackgroundStyle()}
                  >
                    {(index === 0 || index === 1) && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    )}
                    <div className="relative z-10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className={`text-lg font-serif ${(index === 0 || index === 1) ? 'text-white' : ''}`}>
                              {project.name}
                            </CardTitle>
                            <Badge variant="outline" className={`mt-1 ${(index === 0 || index === 1) ? 'border-white/30 text-white bg-white/10' : ''}`}>
                              {project.year}
                            </Badge>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleProjectView(index)}
                            data-testid={`view-project-${index}`}
                            className={`hover-elevate ${(index === 0 || index === 1) ? 'text-white hover:bg-white/20' : ''}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className={`mb-3 ${(index === 0 || index === 1) ? 'text-white/90' : 'text-muted-foreground'}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary" 
                              className={`text-xs ${(index === 0 || index === 1) ? 'bg-white/20 text-white border-white/30' : ''}`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full hover-elevate"
                onClick={() => console.log('View all projects clicked')}
                data-testid="view-all-projects"
              >
                View All Projects
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            © 2025 Thao Ly. Combining art, language, and technology to create wonders.
          </p>
        </div>

        {/* Project Details Modal */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl w-full">
            {selectedProject !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl text-primary">
                    {projects[selectedProject].name}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Left side - Image */}
                  <div className="space-y-4">
                    <img 
                      src={projects[selectedProject].image} 
                      alt={projects[selectedProject].name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right side - Description */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Project Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {projects[selectedProject].detailDescription}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-2">My Role</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {projects[selectedProject].role}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Badge variant="outline" className="text-sm">
                        {projects[selectedProject].year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}