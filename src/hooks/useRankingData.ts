import { useQuery } from '@tanstack/react-query';
import { RankingService, Player } from '@/services/rankingService';
import { API_CONFIG } from '@/config/api';

export const useRankingData = (btag: string, minDeposit: number) => {
  return useQuery<Player[], Error>({
    queryKey: ['ranking-data', btag, minDeposit],
    queryFn: () => RankingService.fetchRankingData(btag, minDeposit),
    staleTime: 5 * 60 * 1000,   // 5 minutos
    gcTime: 10 * 60 * 1000,     // 10 minutos
    retry: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: (i) => Math.min(1000 * 2 ** i, 30000),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    placeholderData: [], // array vazio até vir dado real
    onSuccess(players) {
      console.debug('[useRankingData] success', { btag, minDeposit, count: players.length });
    },
    onError(err) {
      console.error('[useRankingData] error', err);
    },
  });
};
