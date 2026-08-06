export const roleOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'devops', label: 'DevOps / SRE' },
  { value: 'ai-ml', label: 'AI / ML' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design / UI / UX' },
  { value: 'product', label: 'Product Manager' },
  { value: 'blockchain', label: 'Web3 / Blockchain' },
  { value: 'other', label: 'Other' },
];

const titles = {
  frontend: [
    'The Pixel Perfectionist',
    'CSS Sunset Whisperer',
    'The DOM Surfer',
    'Component Beach Bum',
    'The Flex-Box Guru',
    'Master of the Viewport',
    'State Management Sailor',
  ],
  backend: [
    'The Midnight Deployer',
    'API Tide Rider',
    'The Database Whisperer',
    'Server-Side Sorcerer',
    'The Query Quester',
    'Route Navigator',
    'Cache Crusader',
  ],
  fullstack: [
    'The Full Stack Surfer',
    'Beach-Mode Architect',
    'The End-to-End Explorer',
    'Stack Overflow Survivor',
    'The Bridge Builder',
    'Captain of the Stack',
    'Tide & Server Master',
  ],
  devops: [
    'Container Captain',
    'Pipeline Pilot',
    'The Uptime Oracle',
    'Cloud Surfer',
    'Infrastructure Illusionist',
  ],
  'ai-ml': [
    'Model Mariner',
    'Prompt Pirate',
    'The Data Diver',
    'Tensor Flow Rider',
    'Neural Net Navigator',
  ],
  mobile: [
    'App Store Adventurer',
    'The React Native Rider',
    'Swift Sea Captain',
    'Mobile Nomad',
    'Pocket Pixel Painter',
  ],
  design: [
    'Figma Freelancer',
    'The Vector Voyager',
    'UX Unicorn',
    'Palette Pirate',
    'Gradient Guru',
  ],
  product: [
    'Roadmap Ranger',
    'Sprint Surfer',
    'User Story Skipper',
    'The Scope Sculptor',
    'Feature Mariner',
  ],
  blockchain: [
    'Smart Contract Sailor',
    'The Hash Hacker',
    'Node Navigator',
    'Web3 Wanderer',
    'Decentralized Diver',
  ],
  other: [
    'The Vibe Coder',
    'Goa\'s Favorite Builder',
    'The Sunset Shipper',
    'The Coconut Coder',
    'Chief Vibe Officer',
    'Tropical Tinkerer',
    'The Hackathon Hero',
  ],
};

export function getRoleCategory(roleValue) {
  const option = roleOptions.find((opt) => opt.value === roleValue);
  return option ? option.label : 'Other';
}

export function getRandomTitle(role) {
  const roleTitles = titles[role] || titles.other;
  const randomIndex = Math.floor(Math.random() * roleTitles.length);
  return roleTitles[randomIndex];
}
