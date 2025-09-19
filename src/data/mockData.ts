import { RankingData } from '@/types';

export const mockRankingData: RankingData = {
  title: "Campeonato de Trading Elite",
  description: "Ranking oficial dos melhores traders do campeonato. Acompanhe o desempenho em tempo real.",
  players: [
    {
      id: "1",
      position: 1,
      playerId: "TRADER001",
      depositedAmount: 10000,
      bettedAmount: 8500,
      result: 15750,
      isEligible: true,
      name: "João Silva"
    },
    {
      id: "2", 
      position: 2,
      playerId: "TRADER042",
      depositedAmount: 8000,
      bettedAmount: 7200,
      result: 12400,
      isEligible: true,
      name: "Maria Santos"
    },
    {
      id: "3",
      position: 3,
      playerId: "TRADER123",
      depositedAmount: 12000,
      bettedAmount: 11000,
      result: 11800,
      isEligible: true,
      name: "Carlos Mendes"
    },
    {
      id: "4",
      position: 4,
      playerId: "TRADER007",
      depositedAmount: 5000,
      bettedAmount: 4800,
      result: 7200,
      isEligible: true,
      name: "Ana Costa"
    },
    {
      id: "5",
      position: 5,
      playerId: "TRADER099",
      depositedAmount: 15000,
      bettedAmount: 13500,
      result: 6750,
      isEligible: false,
      name: "Pedro Oliveira"
    },
    {
      id: "6",
      position: 6,
      playerId: "TRADER256",
      depositedAmount: 7500,
      bettedAmount: 6800,
      result: 5100,
      isEligible: true,
      name: "Lucia Ferreira"
    },
    {
      id: "7",
      position: 7,
      playerId: "TRADER777",
      depositedAmount: 9000,
      bettedAmount: 8200,
      result: 4100,
      isEligible: true,
      name: "Rafael Lima"
    },
    {
      id: "8",
      position: 8,
      playerId: "TRADER321",
      depositedAmount: 6000,
      bettedAmount: 5500,
      result: 2750,
      isEligible: false,
      name: "Fernanda Rocha"
    }
  ]
};