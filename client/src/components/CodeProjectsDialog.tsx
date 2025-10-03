import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import digidyeImage from "@assets/digidye.png";
import mediapipeImage from "@assets/mediapipe.png";
import React from "react";

interface CodeProjectsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const codeProjects = [
  {
    id: 'digidye',
    title: 'DigiDye',
    href: 'https://github.com/lytran0212/digidye',
    image: digidyeImage,
    description: 'Pixel-coloring software supporting filters & export.'
  },
  {
    id: 'mediapipe',
    title: 'MediaPipe',
    href: 'https://github.com/lytran0212/mediapipe',
    image: mediapipeImage,
    description: 'Interactive hand-tracking art interface.'
  }
];

export function CodeProjectsDialog({ open, onOpenChange }: CodeProjectsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-primary">Select a Project</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {codeProjects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => {
                window.open(proj.href, '_blank', 'noopener,noreferrer');
                onOpenChange(false);
              }}
              className="group border rounded-lg p-4 text-left bg-gradient-to-br from-primary/5 to-primary/0 hover:from-primary/10 hover:to-primary/5 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              data-testid={`code-project-${proj.id}`}
              aria-label={`Open ${proj.title} repository`}
            >
              <div className="aspect-video w-full overflow-hidden rounded-md mb-3 bg-muted flex items-center justify-center">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                {proj.title} <ExternalLink className="h-3 w-3 opacity-70" />
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{proj.description}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-1" /> Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CodeProjectsDialog;
