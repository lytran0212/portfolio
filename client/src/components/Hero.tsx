import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail } from "lucide-react";
import heroImage from "@assets/generated_images/Japanese_artistic_hero_background_46deff62.png";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Japanese artistic background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-4">
            Thao Ly
          </h1>
          
          <div className="text-2xl md:text-3xl font-light text-foreground mb-6">
            <span className="font-serif">Art</span>
            <span className="mx-3 text-chart-2">×</span>
            <span className="font-serif">Language</span>
            <span className="mx-3 text-chart-2">×</span>
            <span className="font-serif">Technology</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            "I believe that the combination of art, language, and technology can create wonders."
          </p>

          <p className="text-base md:text-lg text-foreground max-w-2xl mx-auto mb-8">
            Second-year student passionate about combining creativity with technology, 
            developing AI-powered digital art and interactive applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="hover-elevate active-elevate-2"
              onClick={() => scrollToSection('journey')}
              data-testid="button-explore"
            >
              Explore My Journey
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="outline"
                className="hover-elevate bg-background/80 backdrop-blur-sm"
                data-testid="button-github"
                onClick={() => console.log('GitHub clicked')}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                className="hover-elevate bg-background/80 backdrop-blur-sm"
                data-testid="button-email"
                onClick={() => console.log('Email clicked')}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}