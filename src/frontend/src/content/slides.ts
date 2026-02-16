// Verbatim slide content as provided by the user
export interface SlideContent {
  id: number;
  title: string;
  bullets: string[];
  type: 'title' | 'content';
}

export const slides: SlideContent[] = [
  {
    id: 1,
    title: 'Kisan Sahayak: Tackling Field Labourers\' Daily Challenges',
    bullets: [
      'IDTL Lab Project',
      'Team Members: [Names]',
      'Department / College',
      'Guided by: Dr. Priyanka'
    ],
    type: 'title'
  },
  {
    id: 2,
    title: 'Research Done',
    bullets: [
      'Field study of daily labour conditions',
      'Interaction with agricultural workers',
      'Study of safety & health issues',
      'Awareness gaps in government schemes',
      'Observation of work productivity challenges'
    ],
    type: 'content'
  },
  {
    id: 3,
    title: 'Problem Definition',
    bullets: [
      'Workers lack awareness of welfare schemes',
      'Outdated farming practices reduce productivity',
      'Poor sanitation & unsafe work conditions',
      'No emergency contact support',
      'Weather uncertainty affects planning'
    ],
    type: 'content'
  },
  {
    id: 4,
    title: 'Empathy Findings',
    bullets: [
      'Workers struggle to access reliable information',
      'Language & literacy barriers exist',
      'Continuous work with little safety awareness',
      'Need for simple training & guidance',
      'Desire for secure and dignified work'
    ],
    type: 'content'
  },
  {
    id: 5,
    title: 'Proposed Solution',
    bullets: [
      'Awareness sessions in local language',
      'Modern farming skill programs',
      'Emergency contact & buddy system',
      'Hygiene & safety education',
      'Visual learning materials'
    ],
    type: 'content'
  },
  {
    id: 6,
    title: 'Prototype Suggested',
    bullets: [
      'Mobile-friendly website: Kisan Sahayak',
      'Designed for field labourers',
      'Easy navigation interface',
      'Local language support',
      'Low-literacy friendly design'
    ],
    type: 'content'
  },
  {
    id: 7,
    title: 'Prototype Features',
    bullets: [
      'Government scheme information',
      'Health & first-aid guidance',
      'Farming techniques & tips',
      'Emergency contact access',
      'Audio & visual learning content'
    ],
    type: 'content'
  },
  {
    id: 8,
    title: 'Justification',
    bullets: [
      'Scalable digital platform',
      'Accessible via smartphones',
      'Easy to update information',
      'Cost-effective solution',
      'Wider reach than offline methods'
    ],
    type: 'content'
  },
  {
    id: 9,
    title: 'Future Scope',
    bullets: [
      'Dedicated mobile app version',
      'Real-time weather alerts',
      'Community training integration',
      'Multi-language expansion',
      'Partnership with NGOs'
    ],
    type: 'content'
  },
  {
    id: 10,
    title: 'Conclusion',
    bullets: [
      'Improves worker safety',
      'Increases awareness',
      'Enhances productivity',
      'Promotes dignity of labour',
      'Sustainable long-term impact'
    ],
    type: 'content'
  },
  {
    id: 11,
    title: 'Prototype Access',
    bullets: [
      'Live prototype demonstration',
      'Platform: Mobile website',
      'Scan QR / Click link'
    ],
    type: 'content'
  }
];
