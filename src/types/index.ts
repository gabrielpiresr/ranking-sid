export interface Player {
  id: string;
  position: number;
  playerId: string;
  depositedAmount: number;
  bettedAmount: number;
  result: number;
  isEligible: boolean;
  name?: string;
}

export interface RankingData {
  title: string;
  description: string;
  players: Player[];
}