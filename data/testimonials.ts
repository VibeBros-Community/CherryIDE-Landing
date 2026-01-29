export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    role: 'Senior Full-Stack Developer',
    company: 'Tech Startup',
    avatar: '/images/avatars/sarah.jpg',
    content: 'Finally, an AI IDE that respects my privacy. Cherry IDE runs entirely on my machine, and the code suggestions are just as good as the cloud alternatives.',
    rating: 5,
  },
  {
    id: '2',
    author: 'Marcus Johnson',
    role: 'DevOps Engineer',
    company: 'Fortune 500',
    avatar: '/images/avatars/marcus.jpg',
    content: 'The ability to switch between different AI models is a game-changer. I use Llama for complex refactoring and Mistral for quick completions.',
    rating: 5,
  },
  {
    id: '3',
    author: 'Aisha Patel',
    role: 'Indie Developer',
    company: 'Freelance',
    avatar: '/images/avatars/aisha.jpg',
    content: 'As a freelancer, the zero subscription cost is amazing. Cherry IDE gives me enterprise-level AI assistance without the enterprise price tag.',
    rating: 5,
  },
  {
    id: '4',
    author: 'Tom Anderson',
    role: 'Security Researcher',
    company: 'CyberSec Corp',
    avatar: '/images/avatars/tom.jpg',
    content: 'For security-sensitive projects, Cherry IDE is the only option. My code never leaves my machine, and I can audit the entire stack.',
    rating: 5,
  },
];
