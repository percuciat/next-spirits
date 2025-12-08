import type { TSpirit } from '@/entities/spirit';

// In-memory store for spirits (shared across API routes)
export const spirits: TSpirit[] = [
  {
    id: '1',
    name: 'Kitsune',
    threatLevel: 'High',
    location: 'Shibuya',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Oni',
    threatLevel: 'Critical',
    location: 'Shinjuku',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Tengu',
    threatLevel: 'Medium',
    location: 'Akihabara',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Kappa',
    threatLevel: 'Low',
    location: 'Asakusa',
    status: 'Captured',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Yurei',
    threatLevel: 'High',
    location: 'Roppongi',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Nekomata',
    threatLevel: 'Medium',
    location: 'Ginza',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Jorogumo',
    threatLevel: 'Critical',
    location: 'Ikebukuro',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Tanuki',
    threatLevel: 'Low',
    location: 'Harajuku',
    status: 'Active',
    lastSeen: new Date().toISOString(),
  },
];

