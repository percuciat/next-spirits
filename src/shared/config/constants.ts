export const API_BASE_URL = '/api';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';

export const THREAT_LEVELS = ['Low', 'Medium', 'High', 'Critical'] as const;
export const SPIRIT_STATUSES = ['Active', 'Captured'] as const;

export const TOKYO_DISTRICTS = [
  'Shibuya',
  'Shinjuku',
  'Akihabara',
  'Roppongi',
  'Ginza',
  'Asakusa',
  'Ikebukuro',
  'Harajuku',
] as const;

export const YOKAI_NAMES = [
  'Kitsune',
  'Oni',
  'Tengu',
  'Kappa',
  'Yurei',
  'Nekomata',
  'Jorogumo',
  'Tanuki',
  'Yuki-onna',
  'Rokurokubi',
] as const;

