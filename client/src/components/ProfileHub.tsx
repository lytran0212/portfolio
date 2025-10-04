import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { Heart, Target, Code, Lightbulb, Sparkles, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProfileSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
  planetColor: string;
  orbitRadius: number;
  speed: number;
}

export default function ProfileHub() {
  const [selectedPlanet, setSelectedPlanet] = useState<ProfileSection | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      planetColor: "from-chart-2 to-orange-400",
      orbitRadius: 180,
      speed: 20
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
      planetColor: "from-primary to-blue-500",
      orbitRadius: 240,
      speed: 25
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
      planetColor: "from-chart-1 to-indigo-600",
      orbitRadius: 300,
      speed: 30
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
      color: "hsl(20, 50%, 75%)",
      planetColor: "from-chart-3 to-amber-400",
      orbitRadius: 360,
      speed: 35
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
          x: (e.clientX - centerX) / 50,
          y: (e.clientY - centerY) / 50
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="profile" className="py-24 px-4 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            Profile Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An orbital view of my interests, goals, and aspirations
          </p>
        </div>

        {/* Orbital System */}
        <div className="relative w-full min-h-[800px] flex items-center justify-center mb-16">
          <div
            className="relative"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            {/* Center Sun */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative group cursor-pointer" data-testid="profile-center-sun">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-chart-2 flex items-center justify-center shadow-2xl animate-pulse">
                  <Sparkles className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl -z-10 animate-pulse" />
                
                {/* Sun Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 blur-2xl -z-20 scale-150 animate-pulse" />
                
                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="text-sm font-bold text-primary-foreground drop-shadow-lg whitespace-nowrap">
                    Thao Ly
                  </div>
                </div>
              </div>
            </div>

            {/* Orbits and Planets */}
            {profileSections.map((section, index) => (
              <div key={section.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Orbit Path */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-muted-foreground/20"
                  style={{
                    width: section.orbitRadius * 2,
                    height: section.orbitRadius * 2
                  }}
                />

                {/* Planet */}
                <div
                  className={`orbital-planet ${isPaused ? 'paused' : ''}`}
                  style={{
                    '--orbit-radius': `${section.orbitRadius}px`,
                    '--orbit-speed': `${section.speed}s`,
                    '--orbit-delay': `${-index * (section.speed / 4)}s`
                  } as React.CSSProperties}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div
                    className="planet-content cursor-pointer transform transition-all duration-300 hover:scale-125"
                    onClick={() => setSelectedPlanet(section)}
                    data-testid={`planet-${section.id}`}
                  >
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${section.planetColor} flex items-center justify-center shadow-xl border-2 border-background`}
                      style={{ backgroundColor: section.color }}
                    >
                      <div className="text-white">{section.icon}</div>
                    </div>
                    
                    {/* Planet Glow */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg -z-10 opacity-60"
                      style={{ backgroundColor: section.color }}
                    />
                    
                    {/* Planet Label */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
                      {section.title}
                    </div>

                    {/* Satellites (mini dots) */}
                    {section.items.slice(0, 3).map((_, satIndex) => (
                      <div
                        key={satIndex}
                        className="satellite"
                        style={{
                          '--satellite-radius': '45px',
                          '--satellite-speed': `${3 + satIndex}s`,
                          '--satellite-delay': `${-satIndex * 1}s`
                        } as React.CSSProperties}
                      >
                        <div className="w-2 h-2 rounded-full bg-foreground/40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planet Details Dialog */}
        <Dialog open={selectedPlanet !== null} onOpenChange={() => setSelectedPlanet(null)}>
          <DialogContent className="max-w-2xl" data-testid="planet-details-dialog">
            {selectedPlanet && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-serif">
                    <div
                      className="p-3 rounded-full bg-gradient-to-br text-white"
                      style={{ backgroundColor: selectedPlanet.color }}
                    >
                      {selectedPlanet.icon}
                    </div>
                    {selectedPlanet.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-3 mt-4">
                  {selectedPlanet.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      data-testid={`planet-item-${index}`}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: selectedPlanet.color }}
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
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
          }
        }

        @keyframes satellite-orbit {
          from {
            transform: rotate(0deg) translateX(var(--satellite-radius)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--satellite-radius)) rotate(-360deg);
          }
        }

        .orbital-planet {
          position: absolute;
          animation: orbit var(--orbit-speed) linear infinite;
          animation-delay: var(--orbit-delay);
        }

        .orbital-planet.paused {
          animation-play-state: paused;
        }

        .orbital-planet.paused .satellite {
          animation-play-state: paused;
        }

        .planet-content {
          position: relative;
          width: fit-content;
        }

        .satellite {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -4px;
          margin-top: -4px;
          animation: satellite-orbit var(--satellite-speed) linear infinite;
          animation-delay: var(--satellite-delay);
        }
      `}</style>
    </section>
  );
}
