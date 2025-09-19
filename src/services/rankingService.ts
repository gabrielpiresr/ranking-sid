// src/services/rankingService.ts
import { API_CONFIG } from '@/config/api';

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

export class RankingService {
  // Wrapper com timeout + logs
  private static async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = API_CONFIG.TIMEOUT
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    console.debug('[RankingService] fetch', { url, options });

    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      console.debug('[RankingService] response', {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        url: response.url,
      });

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('[RankingService] network error', error);
      throw error;
    }
  }

  // Chama o Apps Script e retorna players[]
  static async fetchRankingData(btag: string, minDeposit: number): Promise<Player[]> {
    try {
      const url =
        `${API_CONFIG.GOOGLE_SCRIPT_BASE_URL}` +
        `?btag=${encodeURIComponent(btag)}&minDeposit=${encodeURIComponent(String(minDeposit))}`;

      const response = await this.fetchWithTimeout(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Se o endpoint for JSONP por algum motivo, isso evita crash no parse:
      const text = await response.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        // tenta extrair JSON de callback JSONP: callback({...});
        const match = text.match(/\(\s*({[\s\S]*})\s*\)\s*;?\s*$/);
        if (match) json = JSON.parse(match[1]);
      }

      console.debug('[RankingService] parsed json', json);

      if (!json || !Array.isArray(json.players)) {
        throw new Error('Formato inesperado: faltou "players" array no payload');
      }

      return json.players as Player[];
    } catch (error) {
      console.error('[RankingService] parse/error', error);
      throw error instanceof Error ? error : new Error('Failed to fetch ranking data');
    }
  }
}
