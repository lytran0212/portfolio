import React, { useState, useEffect, useCallback, useRef } from "react";
import { Heart, Target, Code, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type RoadmapNode = {
  id: string;
  title: string;
  icon: React.ReactNode;
  points: string[];
  colorClass: string; // Tailwind bg-* utility leveraging existing palette
  depth: number; // 0 (nearest) .. 3 (farthest)
  position: { x: number; y: number }; // percentages in container
};

// 3D Roadmap replacing original Profile Hub (mindmap)
export default function ProfileHub() {
  // Order kept as user requested: hobbies & passion → goals → current skills → desire to develop
  // Centered serpentine path: starts far (top-center), zigzags down to near (bottom-center)
  // Updated roadmap node positions (user-defined)
  const initialNodes: RoadmapNode[] = [
    {
      id: "hobbies",
      title: "Hobbies & Passion",
      icon: <Heart className="h-5 w-5" />,
      points: [
        "Watching gameplay / livestreams",
        "Graphic design & editing",
        "Watching anime & Japanese culture",
        "Digital Art & Painting",
        "Exploring new AI / web tech"
      ],
      colorClass: "bg-chart-2",
      depth: 3,
      // Far (top-center, shifted right, lowered more)
      position: { x: 42.1, y: 28.0 }
    },
    {
      id: "goals",
      title: "Goals",
      icon: <Target className="h-5 w-5" />,
      points: [
        "Fuse Art × Tech",
        "AI for interactive webcam art",
        "Multilingual apps",
        "Career path in game industry"
      ],
      colorClass: "bg-primary",
      depth: 2,
      // Curve to right (shifted more right)
      position: { x: 65.9, y: 36.5 }
    },
    {
      id: "current",
      title: "Current Skills",
      icon: <Code className="h-5 w-5" />,
      points: [
        "AI-assisted coding",
        "Web / Desktop app dev",
        "Python scripting",
        "Subtitle & language tooling",
        "Pixel art & image processing",
        "Layout & composition"
      ],
      colorClass: "bg-chart-1",
      depth: 1,
      // Curve back to left (shifted more left)
      position: { x: 25.4, y: 60.6 }
    },
    {
      id: "development",
      title: "Desire to Develop",
      icon: <Lightbulb className="h-5 w-5" />,
      points: [
        "Master full‑stack & AI",
        "Advanced graphic design",
        "Digital painting mastery",
        "Contribute to AAA games",
        "Grow creative tech community"
      ],
      colorClass: "bg-chart-3",
      depth: 0,
      // Near (bottom-center-right) - closest
      position: { x: 71.4, y: 83.2 }
    }
  ];

  const [nodes, setNodes] = useState<RoadmapNode[]>(() => initialNodes);
  const [activeId, setActiveId] = useState(initialNodes[0].id);
  const activeNode = nodes.find(n => n.id === activeId)!;
  // Spirit avatar position / animation state
  const [spiritPos, setSpiritPos] = useState<{x:number;y:number}>({ x: activeNode.position.x, y: activeNode.position.y });
  const [spiritMode, setSpiritMode] = useState<'idle'|'walking'|'celebrate'>('idle');

  // Precompute min/max Y for perspective scaling of spirit avatar
  const minY = React.useMemo(() => Math.min(...nodes.map(n => n.position.y)), [nodes]);
  const maxY = React.useMemo(() => Math.max(...nodes.map(n => n.position.y)), [nodes]);
  const avatarScale = React.useMemo(() => {
    const range = maxY - minY || 1;
    const tRaw = (spiritPos.y - minY) / range; // 0 (far) -> 1 (near)
    // Smoothstep easing for nicer interpolation
    const t = Math.min(1, Math.max(0, tRaw));
    const eased = t * t * (3 - 2 * t);
    // Scale range: far 0.38 -> near 1.02 (adjustable constants)
    return 0.38 + eased * (1.02 - 0.38);
  }, [spiritPos.y, minY, maxY]);

  // ===== Geometry helpers for smooth tapered road =====
  type Pt = { x: number; y: number }

  const geometry = React.useMemo(() => {
    if (nodes.length < 2) return null;
    const ctrl: Pt[] = nodes.map(n => ({ x: n.position.x, y: n.position.y }));
    // Duplicate endpoints for spline boundary handling
    const extended: Pt[] = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];

    const samplePerSegment = 18; // smoothness (segments * samples)
    const samples: Pt[] = [];
    const tangents: Pt[] = [];

    const catmullPoint = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
      };
    };
    const catmullDeriv = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
      const t2 = t * t;
      return {
        x: 0.5 * ((-p0.x + p2.x) + 2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t + 3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t2),
        y: 0.5 * ((-p0.y + p2.y) + 2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t + 3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t2)
      };
    };

    for (let seg = 0; seg < ctrl.length - 1; seg++) {
      const p0 = extended[seg];
      const p1 = extended[seg + 1];
      const p2 = extended[seg + 2];
      const p3 = extended[seg + 3];
      for (let i = 0; i < samplePerSegment; i++) {
        const t = i / samplePerSegment;
        const pt = catmullPoint(p0, p1, p2, p3, t);
        const d = catmullDeriv(p0, p1, p2, p3, t);
        samples.push(pt);
        tangents.push(d);
      }
    }
    // include final endpoint
    samples.push(ctrl[ctrl.length - 1]);
    tangents.push({ x: 1, y: 0 });

    const minW = 2;
    const maxW = 12;
    const left: Pt[] = [];
    const right: Pt[] = [];
    const centerPath = samples.reduce((acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`), '');

    samples.forEach((p, i) => {
      const tan = tangents[i];
      const len = Math.hypot(tan.x, tan.y) || 1;
      let nx = -tan.y / len;
      let ny = tan.x / len;
      const t = i / (samples.length - 1);
      const w = minW + (maxW - minW) * Math.pow(t, 1.15);
      left.push({ x: p.x - nx * w / 2, y: p.y - ny * w / 2 });
      right.push({ x: p.x + nx * w / 2, y: p.y + ny * w / 2 });
    });

    const leftPath = left.reduce((acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`), '');
    const rightPath = right.reduce((acc, p, i) => acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`), '');

    // Polygon: left forward then right reversed
    let polygonPath = leftPath + right.slice().reverse().map(p => ` L ${p.x} ${p.y}`).join('') + ' Z';

    return { polygonPath, centerPath, leftEdge: leftPath, rightEdge: rightPath };
  }, [nodes]);

  // Drag state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const { toast } = useToast();

  // Keyboard navigation (ArrowLeft / ArrowRight)
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const idx = nodes.findIndex(n => n.id === activeId);
      const nextIndex = e.key === "ArrowRight" ? (idx + 1) % nodes.length : (idx - 1 + nodes.length) % nodes.length;
      setActiveId(nodes[nextIndex].id);
    }
  }, [activeId, nodes]);

  // Drag handlers
  useEffect(() => {
    if (!draggingId) return;
    const handleMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * 100;
      const relY = ((e.clientY - rect.top) / rect.height) * 100;
      const clampedX = Math.min(95, Math.max(5, relX));
      const clampedY = Math.min(95, Math.max(5, relY));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setNodes(prev => prev.map(n => n.id === draggingId ? { ...n, position: { x: clampedX, y: clampedY } } : n));
      });
    };
    const handleUp = () => setDraggingId(null);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [draggingId]);

  const onPointerDownNode = (e: React.PointerEvent, id: string) => {
    e.preventDefault();
    setDraggingId(id);
    setActiveId(id); // focus node when start dragging
  };

  const copyPositions = () => {
    const snippet = `// Updated roadmap node positions\nconst nodes: RoadmapNode[] = [\n${nodes.map(n => `  { id: "${n.id}", title: "${n.title}", position: { x: ${n.position.x.toFixed(1)}, y: ${n.position.y.toFixed(1)} }, depth: ${n.depth} }`).join(',\n')}\n];`;
    navigator.clipboard.writeText(snippet).then(() => {
      toast({ description: 'Đã copy toạ độ các checkpoint vào clipboard.' });
    }).catch(() => {
      toast({ description: 'Copy thất bại', variant: 'destructive' });
    });
  };

  // Animate spirit when activeId changes
  useEffect(() => {
    const target = nodes.find(n => n.id === activeId);
    if (!target) return;
    // distance in percentage space
    const dx = target.position.x - spiritPos.x;
    const dy = target.position.y - spiritPos.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.5) {
      setSpiritPos({ x: target.position.x, y: target.position.y });
      setSpiritMode('celebrate');
      const celebrateTimer = setTimeout(() => setSpiritMode('idle'), 1200);
      return () => clearTimeout(celebrateTimer);
    }
    const speed = 35; // % units per second (tunable)
    const duration = (dist / speed) * 1000;
    setSpiritMode('walking');
    let start: number | null = null;
    const startX = spiritPos.x;
    const startY = spiritPos.y;
    const animate = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      // ease in-out
      const ease = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
      setSpiritPos({ x: startX + dx * ease, y: startY + dy * ease });
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpiritMode('celebrate');
        setSpiritPos({ x: target.position.x, y: target.position.y });
        setTimeout(() => setSpiritMode('idle'), 1400);
      }
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <section id="profile" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Roadmap</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            3D perspective journey highlighting passion, goals, present abilities and future development.
          </p>
        </div>

        {/* 3D Roadmap Canvas (editable) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 relative">
          {/* Left: Roadmap */}
          <div className="roadmap-3d" aria-label="Personal growth roadmap" role="list" ref={containerRef}>
            <Button size="sm" variant="outline" onClick={copyPositions} className="absolute top-3 right-3 z-20">Copy Positions</Button>
            {/* Ribbon Road SVG (tapered polygon + dashed center lane + depth fade) */}
            <svg className="roadmap-3d-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              {/* Asphalt gradient (darker near viewer) */}
              <linearGradient id="asphalt" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--background) / 0.15)" />
                <stop offset="55%" stopColor="hsl(var(--background) / 0.35)" />
                <stop offset="100%" stopColor="hsl(var(--background) / 0.55)" />
              </linearGradient>
              {/* Edge glow gradient */}
              <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-2) / .35)" />
                <stop offset="55%" stopColor="hsl(var(--primary) / .4)" />
                <stop offset="100%" stopColor="hsl(var(--chart-3) / .45)" />
              </linearGradient>
              {/* Lane fade: far (transparent) -> near (opaque) */}
              <linearGradient id="laneFade" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--foreground) / 0)" />
                <stop offset="70%" stopColor="hsl(var(--foreground) / .35)" />
                <stop offset="100%" stopColor="hsl(var(--foreground) / .55)" />
              </linearGradient>
              {/* Atmospheric depth fade mask (far lighter / more transparent) */}
              <linearGradient id="depthMask" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.25" />
                <stop offset="50%" stopColor="white" stopOpacity="0.65" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
              <mask id="depthMaskRef">
                <rect x="0" y="0" width="100" height="100" fill="url(#depthMask)" />
              </mask>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Road polygon (two edges) - centered serpentine from far to near */}
            {geometry && (
              <>
                <path
                  className="road-shape"
                  d={geometry.polygonPath}
                  fill="url(#asphalt)"
                  mask="url(#depthMaskRef)"
                  filter="url(#softGlow)"
                />
                <path
                  d={geometry.leftEdge}
                  fill="none"
                  stroke="url(#edgeGlow)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d={geometry.rightEdge}
                  fill="none"
                  stroke="url(#edgeGlow)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d={geometry.centerPath}
                  fill="none"
                  stroke="url(#laneFade)"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 4.5"
                  strokeLinecap="round"
                  className="road-lane"
                />
              </>
            )}
          </svg>

          {nodes.map((node) => {
            const scale = 1 - node.depth * 0.13; // farther nodes smaller
            const z = -node.depth * 140; // translateZ for perspective illusion
            const isActive = node.id === activeId;
            return (
              <button
                key={node.id}
                role="listitem"
                aria-current={isActive}
                onClick={() => setActiveId(node.id)}
                onPointerDown={(e) => onPointerDownNode(e, node.id)}
                className={`roadmap-node group ${isActive ? "is-active" : ""}`}
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`,
                  transform: `translate(-50%, -50%) translateZ(${z}px) scale(${scale})`,
                  zIndex: 50 - node.depth
                }}
                data-depth={node.depth}
                data-testid={`roadmap-${node.id}`}
              >
                <span className="node-base-shadow" aria-hidden />
                <span className="node-glow-ring" aria-hidden />
                <span className={`icon-wrapper ${node.colorClass} text-white`}>{node.icon}</span>
                <span className="title font-medium font-serif">{node.title}</span>
                <span className="ring-focus" />
              </button>
            );
          })}
          {/* Spirit Avatar */}
          <div
            className={`spirit-avatar spirit-${spiritMode}`}
            style={{
              left: `${spiritPos.x}%`,
              top: `${spiritPos.y}%`,
              transform: `translate(-50%, -50%) scale(${avatarScale.toFixed(3)})`
            }}
            aria-hidden="true"
          >
            <div className="spirit-core">
              <div className="spirit-head" />
              <div className="spirit-body">
                <div className="arm left" />
                <div className="arm right" />
                <div className="leg left" />
                <div className="leg right" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Node Detail */}
        <Card className="relative overflow-hidden border-primary/30 lg:sticky lg:top-24 lg:self-start">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl ${activeNode.colorClass} text-white shadow-lg`}>{activeNode.icon}</div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
                  {activeNode.title}
                </h3>
              </div>
              <ul className="grid gap-3" aria-label={`${activeNode.title} details`}>
                {activeNode.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover-elevate transition-[background,transform]">
                    <div className={`w-2 h-2 mt-2 rounded-full ${activeNode.colorClass}`} />
                    <p className="text-sm md:text-base leading-relaxed">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

        {/* Core concept / identity */}
        <div className="max-w-5xl mx-auto text-center">
          <h4 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            <span className="text-primary">Art</span> <span className="opacity-70">×</span> <span className="text-chart-2">Language</span> <span className="opacity-70">×</span> <span className="text-chart-3">Technology</span>
          </h4>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            "I believe the synergy of artistic vision, linguistic diversity and modern technology can create immersive experiences."
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="px-3 py-1">19 years old</Badge>
            <Badge variant="outline" className="px-3 py-1">Second-year student</Badge>
            <Badge variant="outline" className="px-3 py-1">Digital Artist</Badge>
            <Badge variant="outline" className="px-3 py-1">AI Enthusiast</Badge>
            <Badge variant="outline" className="px-3 py-1">Japanese Culture</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}