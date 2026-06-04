export type Role = 'volunteer' | 'organizer' | 'org_admin' | 'platform_admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface CleanupEvent {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  date: Date;
  location: {
    lat: number;
    lng: number;
  };
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
}
