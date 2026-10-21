export const categories = [
  'All Projects',
  'Apartments',
  'Houses',
  'Kitchens',
  'Bathrooms',
  'Commercial Spaces',
] as const;
export type Category = (typeof categories)[number];
export type Project = {
  slug: string;
  title: string;
  location: string;
  area: number;
  category: Category;
  image: string;
  alt: string;
  subtitle: string;
  description: string;
  gallery: string[];
  scope: string;
};
export const projects: Project[] = [
  {
    slug: 'casa-calma',
    title: 'Casa Calma',
    location: 'Eixample, Barcelona',
    area: 120,
    category: 'Apartments',
    image: 'living',
    alt: 'Light-filled neutral living room with natural textures and contemporary furnishings',
    subtitle: 'A quieter way of city living.',
    description:
      'An imagined Eixample apartment, rethought around light and the rituals of everyday life. Open sightlines connect living and dining, while a restrained palette of warm plaster, oak and natural stone brings a sense of calm to the city. The concept explores how thoughtful proportions can make an apartment feel generous without adding a single square metre.',
    gallery: ['dining', 'bedroom', 'detail'],
    scope: 'Interior design · Full renovation',
  },
  {
    slug: 'the-mediterranean-house',
    title: 'The Mediterranean House',
    location: 'Sant Cugat, Barcelona',
    area: 210,
    category: 'Houses',
    image: 'house',
    alt: 'Contemporary house opening onto a sunlit garden',
    subtitle: 'Inside, outside. Beautifully connected.',
    description:
      'A concept home shaped by the Mediterranean rhythm of life. Generous openings frame the garden and bring daylight deep into the plan. Honest materials and simple volumes allow the landscape to become part of every room, with spaces that move naturally from shared moments to quiet retreat.',
    gallery: ['villa', 'hero', 'bedroom'],
    scope: 'Space planning · Interior design',
  },
  {
    slug: 'a-place-to-gather',
    title: 'A Place to Gather',
    location: 'Gràcia, Barcelona',
    area: 32,
    category: 'Kitchens',
    image: 'kitchen',
    alt: 'Light-filled kitchen with a marble island, white cabinetry and warm walnut details',
    subtitle: 'Made for the everyday, and everyone.',
    description:
      'The kitchen as the heart of a home. This design study pairs practical storage and generous preparation space with natural finishes that belong in a living room. An island becomes a place for a morning coffee, a conversation, or a meal that takes a little longer.',
    gallery: ['villa', 'dining', 'detail'],
    scope: 'Kitchen remodeling · Interior design',
  },
  {
    slug: 'the-daily-retreat',
    title: 'The Daily Retreat',
    location: 'Sarrià, Barcelona',
    area: 18,
    category: 'Bathrooms',
    image: 'bathroom',
    alt: 'Quiet contemporary bathroom with natural materials and a freestanding bath',
    subtitle: 'A small space. A deeper breath.',
    description:
      'An imagined bathroom designed around the feeling of slowing down. Textured surfaces, considered lighting and clean geometry create a private daily retreat. The proposal balances a generous shower, discreet storage and tactile finishes within a compact footprint.',
    gallery: ['detail', 'bedroom', 'bathroom'],
    scope: 'Bathroom remodeling · Space planning',
  },
  {
    slug: 'studio-north',
    title: 'Studio North',
    location: 'Poblenou, Barcelona',
    area: 165,
    category: 'Commercial Spaces',
    image: 'workspace',
    alt: 'Bright creative workspace with plants, communal tables and large windows',
    subtitle: 'Room for good ideas.',
    description:
      'A workplace concept with the warmth of a home. Flexible shared areas sit alongside quieter corners, giving people a choice of how to work. Natural light and simple, durable materials provide the backdrop for creative routines and unexpected conversations.',
    gallery: ['studio', 'dining', 'detail'],
    scope: 'Commercial interiors · Project management',
  },
  {
    slug: 'light-on-the-wall',
    title: 'Light on the Wall',
    location: 'El Born, Barcelona',
    area: 85,
    category: 'Apartments',
    image: 'hero',
    alt: 'Warm modern living room with soft seating, a timber coffee table and natural light',
    subtitle: 'A home with room to pause.',
    description:
      'A compact apartment concept that makes room for what matters. Warm neutrals, low furniture and a sequence of open spaces amplify the available light. A small collection of tactile materials gives the home a coherent character, from the first step inside to its most private corner.',
    gallery: ['living', 'bedroom', 'dining'],
    scope: 'Full renovation · Interior design',
  },
];
export const services = [
  {
    title: 'Interior Design',
    slug: 'interior-design',
    description:
      'A considered home, down to the last detail. We connect your way of living with a cohesive palette of materials, furniture and light.',
    benefits: [
      'Concept & material palettes',
      'Furniture & lighting selection',
      'Detailed drawings & specifications',
    ],
    image: 'detail',
  },
  {
    title: 'Full Apartment Renovation',
    slug: 'renovation',
    description:
      'A fresh perspective on your entire home. From the first layout to the finishing touches, every decision belongs to one clear vision.',
    benefits: [
      'Complete renovation planning',
      'Coordinated materials & finishes',
      'A cohesive vision for every room',
    ],
    image: 'living',
  },
  {
    title: 'Kitchen & Bathroom Remodeling',
    slug: 'kitchen-bathroom',
    description:
      'Spaces that work beautifully, every day. Intelligent storage, tactile surfaces and thoughtful details make everyday rituals feel effortless.',
    benefits: [
      'Purposeful storage & layouts',
      'Durable, tactile material selection',
      'Fixture & appliance planning',
    ],
    image: 'kitchen',
  },
  {
    title: 'Space Planning',
    slug: 'space-planning',
    description:
      'More possibility in the space you already have. We explore light, circulation and proportion to create a layout that feels naturally right.',
    benefits: [
      'Layout studies & zoning',
      'Light & circulation analysis',
      'Flexible solutions for daily life',
    ],
    image: 'dining',
  },
  {
    title: 'Project Management',
    slug: 'project-management',
    description:
      'One clear thread from idea to completion. A structured approach to schedules, decisions and details keeps the whole picture in focus.',
    benefits: [
      'Schedule & milestone planning',
      'Trade & supplier coordination',
      'Design reviews & quality checks',
    ],
    image: 'studio',
  },
];
