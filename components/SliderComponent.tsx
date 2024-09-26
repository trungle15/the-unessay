"use client"; // Necessary for client-side interactivity in App Router

import React, { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, PlayIcon } from "lucide-react";

function getPlaceholderSVG(
  width: number,
  height: number,
  text: string
): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='%23333333'%3E${text}%3C/text%3E%3C/svg%3E`;
}

type SlideType = "fullText" | "imageCaption" | "imageQuote" | "title";

interface Slide {
  type: SlideType;
  content: {
    text?: string;
    image?: string;
    caption?: string;
    quote?: string;
    author?: string;
    title?: string;
    subtitle?: string;
  };
}

const slides: Slide[] = [
  // Slide 1
  {
    type: "title",
    content: {
      title: "The Digital Self",
      subtitle: "Who We Are in The Age of the Algorithm",
      author: "By Trung Le",
      image: "/images/Slide1.png",
    },
  },
  // Slide 2
  {
    type: "fullText",
    content: {
      text: "Every interaction we have online leaves a trace, a digital shadow that algorithms use to construct a model of who we are. This model - a collection of data points, preferences, and behaviors - becomes the lens through which the digital world sees us. Search engines anticipate our queries, social media platforms curate our feeds, and recommendation systems guide our choices. But how accurate is this algorithmic reflection? And what happens when we start to see ourselves through this algorithmically constructed lens?",
    },
  },

  // Slide 3
  {
    type: "imageCaption",
    content: {
      image: "/images/image2.webp",
      caption:
        "If the algorithm knows you better than you know yourself, whose story is it?",
    },
  },

  // Slide 4
  {
    type: "imageQuote",
    content: {
      image: "/images/Tiktok.jpg",
      quote:
        "'We don't see things as they are, we see them as we are - amplified and curated.'",
      author: "Anais Nin",
    },
  },
  // Slide 5
  {
    type: "fullText",
    content: {
      text: "The rise of wearable technology and health apps has ushered in the era of the 'quantified self.' Our steps, heart rates, sleep patterns, and even moods are tracked, analyzed, and quantified. This data-driven approach to self-understanding offers unprecedented insights into our physical and mental states. But as we reduce our complex lives to charts and graphs, what nuances are we losing? Does quantifying our experiences enhance our self-awareness, or does it create a reductionist view of human experience? As we optimize our lives based on data, we must consider whether we're enhancing our humanity or slowly transforming ourselves into algorithmic beings.",
    },
  },

  // Slide 6
  {
    type: "imageCaption",
    content: {
      image: "/images/data-point-human-being.png",
      caption: "When life becomes a series of data points.",
    },
  },
  {
    type: "fullText",
    content: {
      text: "As algorithms curate our feeds and make predictions based on our data, we must ask ourselves: are we shaping technology, or is technology shaping us?",
    },
  },
  {
    type: "fullText",
    content: {
      text: "AI is no longer just a tool; it has become a collaborator in the creative process, blurring the lines between human and machine creativity.",
    },
  },
  {
    type: "imageQuote",
    content: {
      image: "/images/llm.webp",
      quote:
        "This project is inspired, empowered, and liberated by the work of AI",
      author: "Trung Le",
    },
  },
];

export default function SliderComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    },
    [nextSlide, prevSlide]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderSlide = (slide: Slide) => {
    switch (slide.type) {
      case "fullText":
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <p className="text-2xl text-left font-mono w-4/5 max-w-4xl">
              {slide.content.text}
            </p>
          </div>
        );
      case "imageCaption":
        return (
          <div className="w-full h-full flex">
            <div className="w-4/5 h-full relative">
              <img
                src={slide.content.image}
                alt="Slide image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/5 h-full flex items-center justify-center p-4">
              <p className="text-lg text-left font-mono">
                {slide.content.caption}
              </p>
            </div>
          </div>
        );
      case "imageQuote":
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/2 h-3/4 relative">
              <img
                src={slide.content.image}
                alt="Slide image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-1/2 h-3/4 flex flex-col justify-center p-8">
              <h2 className="text-xl mb-4 font-mono font-bold">
                {/* WHAT WERE YOU THINKING WHEN YOU GOT HERE TODAY? */}
              </h2>
              <p className="text-3xl mb-4 font-mono">{slide.content.quote}</p>
              <div className="flex items-center">
                <PlayIcon className="w-6 h-6 mr-2" />
                <p className="text-lg font-mono">{slide.content.author}</p>
              </div>
            </div>
          </div>
        );
      case "title":
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <img
                src={
                  slide.content.image ||
                  getPlaceholderSVG(1920, 1080, "Placeholder")
                }
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">
                  {slide.content.title}
                </h1>
                <p className="text-2xl mb-8">{slide.content.subtitle}</p>
                <p className="text-xl">{slide.content.author}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen">
      {renderSlide(slides[currentSlide])}

      <button
        onClick={prevSlide}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
