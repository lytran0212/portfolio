import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Heart, Target, Code, Lightbulb } from "lucide-react";

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}

export default function ProfileHub() {
  const [activeSection, setActiveSection] = useState<string>("hobbies");

  const profileSections: ProfileSection[] = [
    {
      id: "hobbies",
      title: "Hobbies & Passion",
      icon: <Heart className="h-5 w-5" />,
      items: [
        "Watching anime & exploring Japanese culture",
        "Watching others play games / livestream",
        "Digital Art & Painting",
        "Designing & editing graphics",
        "New technology - AI, web/app"
      ],
      color: "bg-chart-2"
    },
    {
      id: "goals",
      title: "Goals",
      icon: <Target className="h-5 w-5" />,
      items: [
        "Combining Art & Tech",
        "AI in interactive webcam art",
        "Multilingual applications",
        "Developing a career in the game industry"
      ],
      color: "bg-primary"
    },
    {
      id: "current",
      title: "Current Skills",
      icon: <Code className="h-5 w-5" />,
      items: [
        "Coding by AI",
        "Web / Desktop App Development",
        "Python Script development",
        "Subtitle & Language Tools",
        "Pixel Art & Image Processing",
        "Layout & Composition"
      ],
      color: "bg-chart-1"
    },
    {
      id: "development",
      title: "Desire to Develop",
      icon: <Lightbulb className="h-5 w-5" />,
      items: [
        "Master Full-stack & AI Coding",
        "Master graphic design",
        "Develop Digital Painting",
        "Accompany the Triple-A game industry",
        "Creative art & technology community"
      ],
      color: "bg-chart-3"
    }
  ];

  const activeData = profileSections.find(section => section.id === activeSection);

  return (
    <section id="profile" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Profile Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A mindmap of my interests, goals, and aspirations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Buttons */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {profileSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  className={`w-full justify-start h-auto p-4 hover-elevate ${
                    activeSection === section.id ? section.color : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                  data-testid={`profile-${section.id}`}
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="lg:col-span-2">
            {activeData && (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-serif">
                    <div className={`p-3 rounded-lg ${activeData.color} text-white`}>
                      {activeData.icon}
                    </div>
                    {activeData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {activeData.items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover-elevate transition-all duration-200"
                        data-testid={`profile-item-${index}`}
                      >
                        <div className={`w-2 h-2 rounded-full ${activeData.color} mt-2 flex-shrink-0`} />
                        <p className="text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Central Concept Display */}
        <div className="mt-16">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-chart-2/5 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-4 text-3xl md:text-4xl font-serif font-bold">
                  <span className="text-primary">Art</span>
                  <span className="text-chart-2">×</span>
                  <span className="text-primary">Language</span>
                  <span className="text-chart-2">×</span>
                  <span className="text-primary">Technology</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                "I believe that the combination of art, language, and technology can create wonders."
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="px-3 py-1">19 years old</Badge>
                <Badge variant="outline" className="px-3 py-1">Second-year student</Badge>
                <Badge variant="outline" className="px-3 py-1">Digital Artist</Badge>
                <Badge variant="outline" className="px-3 py-1">AI Enthusiast</Badge>
                <Badge variant="outline" className="px-3 py-1">Japanese Culture</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}