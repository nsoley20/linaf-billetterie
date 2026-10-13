export interface Team {
  id: string;
  name: string;
  city: string;
  stadiumId: string;
  logo?: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  stadiumId: string;
  date: Date;
  time: string;
  price: number;
  availableSeats: number;
}

export interface Ticket {
  id: string;
  matchId: string;
  userId: string;
  uniqueId: string;
  qrData: string;
  status: 'available' | 'used' | 'cancelled';
  createdAt: Date;
}

export type UserRole = 'supporter' | 'admin' | 'agent';

