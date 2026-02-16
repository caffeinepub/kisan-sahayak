import { Search, AlertTriangle, Heart, Lightbulb, Smartphone, CheckCircle, TrendingUp, Rocket, Target } from 'lucide-react';

export const slideIcons = {
  1: null, // Title slide - no icon
  2: Search, // Research
  3: AlertTriangle, // Problem
  4: Heart, // Empathy
  5: Lightbulb, // Solution
  6: Smartphone, // Prototype
  7: CheckCircle, // Features
  8: TrendingUp, // Justification
  9: Rocket, // Future
  10: Target, // Conclusion
  11: Smartphone // Access
} as const;

export function getSlideIcon(slideId: number) {
  return slideIcons[slideId as keyof typeof slideIcons] || null;
}
