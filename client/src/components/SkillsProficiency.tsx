import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import photoshopIcon from "@assets/Photoshop.png";
import vsIcon from "@assets/VS.png";
import illustratorIcon from "@assets/illustrator.png";
import premiereIcon from "@assets/Premiere.png";

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  description: string;
  icon: string;
}

export default function SkillsProficiency() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const skills: Skill[] = [
    {
      name: "Photoshop",
      category: "Design",
      proficiency: 85,
      description: "Proficient in editing & post-production",
      icon: photoshopIcon
    },
    {
      name: "Visual Studio Code",
      category: "Development",
      proficiency: 25,
      description: "Beginner – learning editor basics, extensions & workflows",
      icon: vsIcon
    },
    {
      name: "Illustrator",
      category: "Design",
      proficiency: 60,
      description: "Basic, vector graphic drawing",
      icon: illustratorIcon
    },
    {
      name: "Premiere",
      category: "Video",
      proficiency: 55,
      description: "Basic video editing",
      icon: premiereIcon
    }
  ];

  const categories = ["all", "Design", "Development", "Video"];
  
  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 80) return "bg-chart-1";
    if (proficiency >= 70) return "bg-chart-2";
    if (proficiency >= 60) return "bg-chart-3";
    return "bg-chart-4";
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 80) return "Expert";
    if (proficiency >= 70) return "Advanced";
    if (proficiency >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <section id="skills" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Skills & Proficiency
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Software expertise and technical capabilities
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover-elevate capitalize px-4 py-2"
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <Card key={skill.name} className="hover-elevate transition-all duration-300" data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={skill.icon} 
                      alt={`${skill.name} icon`}
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <h3 className="font-serif text-xl">{skill.name}</h3>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{skill.proficiency}%</div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getProficiencyColor(skill.proficiency)} text-white`}
                    >
                      {getProficiencyLabel(skill.proficiency)}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{skill.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proficiency</span>
                    <span className="font-medium">{skill.proficiency}%</span>
                  </div>
                  <Progress 
                    value={skill.proficiency} 
                    className="h-2"
                    data-testid={`progress-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-primary">
                Why I'm Learning to Code
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
                <div>
                  <p className="mb-2">• Creating practical tools that simplify everyday tasks</p>
                  <p className="mb-2">• Developing Chrome extensions to enhance browsing efficiency</p>
                </div>
                <div>
                  <p className="mb-2">• Simple .bat scripts to automate file processing</p>
                  <p className="mb-2">• Building add-ons and plugins for existing software</p>
                </div>
              </div>
              <p className="text-center mt-6 text-foreground font-medium">
                Learning to code to combine creativity with technology, making both personal projects and professional tasks more efficient and enjoyable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}