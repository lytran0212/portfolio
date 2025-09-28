import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Palette, Code, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  color: string;
}

export default function JourneyTimeline() {
  const timelineEvents: TimelineEvent[] = [
    {
      year: "2022",
      title: "Finding Direction",
      description:
        "11th grade. Started focusing more on studying and searching for personal direction.",
      highlights: ["Academic Focus", "Self Discovery"],
      icon: <GraduationCap className="h-5 w-5" />,
      color: "bg-chart-3",
    },
    {
      year: "2023",
      title: "Creative Balance",
      description:
        "Busy with high school subjects, but still spent time watching anime and following others playing games for entertainment.",
      highlights: ["Digital Art", "Japanese Practice", "Final Exam Prep"],
      icon: <Palette className="h-5 w-5" />,
      color: "bg-chart-2",
    },
    {
      year: "2024",
      title: "University Breakthrough",
      description:
        "Passed university entrance, started freshman year. Completed the DigiDye project for computer graphics class.",
      highlights: [
        "DigiDye Project",
        "Python & TKinter",
        "Oil Painting",
        "Sketching",
      ],
      icon: <Code className="h-5 w-5" />,
      color: "bg-primary",
    },
    {
      year: "2025",
      title: "AI & Interactive Art",
      description:
        "Second-year student, 19 years old. Studied interactive art, developed interactive processing interfaces using MediaPipe.",
      highlights: ["Interactive Art", "MediaPipe", "AI in Digital Art"],
      icon: <Brain className="h-5 w-5" />,
      color: "bg-chart-1",
    },
  ];

  // Create duplicated events for seamless loop
  const duplicatedEvents = [...timelineEvents, ...timelineEvents];

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section id="journey" className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            My Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From finding my direction to combining art with technology
          </p>
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/30 transform -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-1 transform -translate-y-1/2 z-0" />

          {/* Scrolling Timeline */}
          <motion.div
            className="flex gap-8 py-12"
            animate={{
              x: [0, -100 * timelineEvents.length + "%"],
            }}
            transition={{
              duration: 200, // 200 seconds for full cycle - slower
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedEvents.map((event, index) => (
              <motion.div
                key={`${event.year}-${index}`}
                className="flex-shrink-0 w-80 relative"
                variants={cardVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                data-testid={`timeline-${event.year}-${index}`}
              >
                {/* Timeline Node */}
                <motion.div
                  className="absolute top-[60px] left-1/2 transform -translate-x-1/2 z-[5]"
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div
                    className={`w-6 h-6 rounded-full ${event.color} border-4 border-background shadow-lg relative`}
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-full ${event.color} opacity-30`}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Year Badge - positioned above timeline */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Badge
                    variant="default"
                    className={`${event.color} text-white font-bold px-3 py-1 shadow-lg`}
                  >
                    {event.year}
                  </Badge>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="mt-20 relative z-10"
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="hover-elevate transition-all duration-300 h-full">
                    <CardHeader>
                      <motion.div
                        className="flex items-center gap-3 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <motion.div
                          className={`p-2 rounded-lg ${event.color} text-white`}
                          whileHover={{
                            rotate: 360,
                            transition: { duration: 0.6 },
                          }}
                        >
                          {event.icon}
                        </motion.div>
                        <div>
                          <CardTitle className="text-lg font-serif">
                            {event.title}
                          </CardTitle>
                        </div>
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <motion.p
                        className="text-muted-foreground mb-4 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {event.description}
                      </motion.p>
                      <motion.div
                        className="flex flex-wrap gap-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {event.highlights.map((highlight, badgeIndex) => (
                          <motion.div
                            key={highlight}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.6 + badgeIndex * 0.1,
                              duration: 0.3,
                              ease: "backOut",
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {timelineEvents.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-border"
              animate={{
                backgroundColor: [
                  "hsl(var(--border))",
                  "hsl(var(--primary))",
                  "hsl(var(--border))",
                ],
              }}
              transition={{
                duration: 60 / timelineEvents.length,
                delay: (index * 60) / timelineEvents.length,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
