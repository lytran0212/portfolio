import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Heart, Target, Code, Lightbulb, Star, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
  position: { x: number; y: number };
}

export default function ProfileHub() {
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<ProfileSection | null>(null);
  const [isConstellationComplete, setIsConstellationComplete] = useState(false);

  const profileSections: ProfileSection[] = [
    {
      id: "hobbies",
      title: "Hobbies & Passion",
      icon: <Heart className="h-6 w-6" />,
      items: [
        "Watching anime & exploring Japanese culture",
        "Watching others play games / livestream",
        "Digital Art & Painting",
        "Designing & editing graphics",
        "New technology - AI, web/app"
      ],
      color: "hsl(14, 85%, 60%)",
      position: { x: 20, y: 25 }
    },
    {
      id: "goals",
      title: "Goals",
      icon: <Target className="h-6 w-6" />,
      items: [
        "Combining Art & Tech",
        "AI in interactive webcam art",
        "Multilingual applications",
        "Developing a career in the game industry"
      ],
      color: "hsl(220, 60%, 45%)",
      position: { x: 75, y: 30 }
    },
    {
      id: "current",
      title: "Current Skills",
      icon: <Code className="h-6 w-6" />,
      items: [
        "Coding by AI",
        "Web / Desktop App Development",
        "Python Script development",
        "Subtitle & Language Tools",
        "Pixel Art & Image Processing",
        "Layout & Composition"
      ],
      color: "hsl(220, 60%, 20%)",
      position: { x: 25, y: 70 }
    },
    {
      id: "development",
      title: "Desire to Develop",
      icon: <Lightbulb className="h-6 w-6" />,
      items: [
        "Master Full-stack & AI Coding",
        "Master graphic design",
        "Develop Digital Painting",
        "Accompany the Triple-A game industry",
        "Creative art & technology community"
      ],
      color: "hsl(45, 90%, 65%)",
      position: { x: 70, y: 75 }
    }
  ];

  const handleStarClick = (section: ProfileSection) => {
    if (!selectedStars.includes(section.id)) {
      setSelectedStars([...selectedStars, section.id]);
    }
    setActiveSection(section);
  };

  useEffect(() => {
    if (selectedStars.length === profileSections.length && !isConstellationComplete) {
      setIsConstellationComplete(true);
      // Show completion effect
      setTimeout(() => {
        // Keep it complete but allow re-interaction
      }, 3000);
    }
  }, [selectedStars, profileSections.length, isConstellationComplete]);

  const getStarPosition = (section: ProfileSection) => {
    return {
      left: `${section.position.x}%`,
      top: `${section.position.y}%`
    };
  };

  const isStarSelected = (id: string) => selectedStars.includes(id);

  // Calculate connection lines between selected stars
  const getConnectionLines = () => {
    const lines = [];
    for (let i = 0; i < selectedStars.length - 1; i++) {
      const fromStar = profileSections.find(s => s.id === selectedStars[i]);
      const toStar = profileSections.find(s => s.id === selectedStars[i + 1]);
      if (fromStar && toStar) {
        lines.push({ from: fromStar, to: toStar });
      }
    }
    // If constellation is complete, connect last to first
    if (isConstellationComplete && selectedStars.length === profileSections.length) {
      const lastStar = profileSections.find(s => s.id === selectedStars[selectedStars.length - 1]);
      const firstStar = profileSections.find(s => s.id === selectedStars[0]);
      if (lastStar && firstStar) {
        lines.push({ from: lastStar, to: firstStar });
      }
    }
    return lines;
  };

  return (
    <section id="profile" className="py-24 px-4 relative overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background">
        {/* Background stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Profile Constellation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on each star to discover my journey {selectedStars.length > 0 && `(${selectedStars.length}/${profileSections.length})`}
          </p>
        </div>

        {/* Constellation Map */}
        <div className="relative w-full h-[600px] border border-primary/20 rounded-2xl bg-gradient-to-br from-primary/5 to-chart-2/5 overflow-hidden">
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {getConnectionLines().map((line, index) => (
              <line
                key={index}
                x1={`${line.from.position.x}%`}
                y1={`${line.from.position.y}%`}
                x2={`${line.to.position.x}%`}
                y2={`${line.to.position.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="animate-draw-line"
                style={{
                  animationDelay: `${index * 0.3}s`
                }}
              />
            ))}
            {/* Define gradient for lines */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Stars */}
          {profileSections.map((section) => {
            const selected = isStarSelected(section.id);
            return (
              <div
                key={section.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={getStarPosition(section)}
                onClick={() => handleStarClick(section)}
                data-testid={`star-${section.id}`}
              >
                {/* Star Glow */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
                    selected ? 'scale-150 opacity-100' : 'scale-100 opacity-60'
                  }`}
                  style={{
                    backgroundColor: section.color,
                    width: '80px',
                    height: '80px',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%'
                  }}
                />

                {/* Star Icon */}
                <div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selected
                      ? 'scale-125 animate-pulse'
                      : 'scale-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: section.color }}
                >
                  <Star className="h-8 w-8 text-white fill-white" />
                  {selected && (
                    <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" />
                  )}
                </div>

                {/* Star Label */}
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300 ${
                      selected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background/80 text-foreground'
                    }`}
                  >
                    {section.title}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Constellation Complete Effect */}
          {isConstellationComplete && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-in">
              <div className="text-center">
                <Sparkles className="h-20 w-20 text-accent mx-auto mb-4 animate-spin-slow" />
                <h3 className="text-3xl font-serif font-bold text-primary mb-2 animate-bounce">
                  Constellation Complete!
                </h3>
                <p className="text-lg text-muted-foreground">
                  You've discovered my complete profile
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Star Details Dialog */}
        <Dialog open={activeSection !== null} onOpenChange={() => setActiveSection(null)}>
          <DialogContent className="max-w-2xl" data-testid="star-details-dialog">
            {activeSection && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-serif">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: activeSection.color }}
                    >
                      <Star className="h-6 w-6 text-white fill-white" />
                    </div>
                    {activeSection.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-3 mt-4">
                  {activeSection.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      data-testid={`star-item-${index}`}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: activeSection.color }}
                      />
                      <p className="text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

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

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes draw-line {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-twinkle {
          animation: twinkle linear infinite;
        }

        .animate-draw-line {
          animation: draw-line 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
