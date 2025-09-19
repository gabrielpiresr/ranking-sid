import { Player } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface RankingTableProps {
  players: Player[];
}

export const RankingTable = ({ players }: RankingTableProps) => {
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
    <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-16">Pos.</TableHead>
            <TableHead>Jogador</TableHead>
            <TableHead className="text-right">Total depositado</TableHead>
            <TableHead className="text-right">Total de trades</TableHead>
            <TableHead className="text-right">Resultado</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => {
            const profitLoss = player.result ;
            const isProfit = profitLoss >= 0;

            return (
              <TableRow key={player.id} className="hover:bg-muted/50 border-border">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {player.position <= 3 && (
                      <Trophy className={`w-4 h-4 ${getPositionColor(player.position)}`} />
                    )}
                    <span className={`font-bold ${getPositionColor(player.position)}`}>
                      {player.position}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div>
                    <p className="font-medium">{player.playerId}</p>
                    {player.name && (
                      <p className="text-xs text-muted-foreground">{player.name}</p>
                    )}
                  </div>
                </TableCell>
                
                <TableCell className="text-right font-mono text-sm">
                  {formatCurrency(player.depositedAmount)}
                </TableCell>
                
                <TableCell className="text-right font-mono text-sm">
                  {player.bettedAmount}
                </TableCell>
              

                
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {isProfit ? (
                      <TrendingUp className="w-3 h-3 text-profit" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-loss" />
                    )}
                    <span className={`font-mono text-sm font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
                      {formatCurrency(profitLoss)}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell className="text-center">
                  <Badge 
                    variant={player.isEligible ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {player.isEligible ? "Apto" : "Inapto"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
