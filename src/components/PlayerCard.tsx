import { Player } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const profitLoss = player.result;
  const isProfit = profitLoss >= 0;
  
  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-400';
    if (position === 2) return 'text-gray-300';
    if (position === 3) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className="p-4 bg-gradient-card border-border hover:shadow-card transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {player.position <= 3 && <Trophy className={`w-5 h-5 ${getPositionColor(player.position)}`} />}
            <span className={`text-lg font-bold ${getPositionColor(player.position)}`}>
              #{player.position}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{player.playerId}</p>
            {player.name && (
              <p className="text-xs text-muted-foreground">{player.name}</p>
            )}
          </div>
        </div>
        
        <Badge 
          variant={player.isEligible ? "default" : "destructive"}
          className="text-xs"
        >
          {player.isEligible ? "Apto" : "Inapto"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-muted-foreground">Total Depositado</p>
          <p className="font-medium">{formatCurrency(player.depositedAmount)}</p>
        </div>
        
        <div>
          <p className="text-muted-foreground">Total de trades</p>
          <p className="font-medium">{player.bettedAmount}</p>
        </div>
        
        
        <div>
          <p className="text-muted-foreground">Resultado</p>
          <div className="flex items-center gap-1">
            {isProfit ? (
              <TrendingUp className="w-3 h-3 text-profit" />
            ) : (
              <TrendingDown className="w-3 h-3 text-loss" />
            )}
            <p className={`font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(profitLoss)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
