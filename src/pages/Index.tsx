import { useEffect, useMemo, useState } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { SearchBar } from '@/components/SearchBar';
import { PlayerCard } from '@/components/PlayerCard';
import { RankingTable } from '@/components/RankingTable';
import { PageLoader } from '@/components/LoadingSpinner';
import { useRankingData } from '@/hooks/useRankingData';
import { useToast } from '@/hooks/use-toast';
import { Trophy, ShieldCheck } from 'lucide-react';


const Index = () => {
  const { toast } = useToast();

  // lê ?btag=&minDeposit= da URL, com defaults
  const [btag, setBtag] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('btag') ?? '27116';
  });
  const [minDeposit, setMinDeposit] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const n = Number(params.get('minDeposit'));
    return Number.isFinite(n) ? n : 500;
  });

  // chama o hook com parâmetros
  const {
    data: players = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useRankingData(btag, minDeposit);


  

  // aviso se falhar a busca (mantém UX)
  useEffect(() => {
    if (isError && error) {
      toast({
        title: 'Aviso',
        description: 'Falha ao buscar dados. Verifique a conexão ou os parâmetros.',
        variant: 'destructive',
      });
    }
  }, [isError, error, toast]);

  // busca/filtra por texto
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPlayers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return players;
    return players.filter((p) =>
      p.playerId.toLowerCase().includes(term) ||
      (typeof (p as any).name === 'string' &&
        ((p as any).name as string).toLowerCase().includes(term))
    );
  }, [players, searchTerm]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (

    
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Banner (texto estático para não depender mais do payload) */}
        <HeroBanner
          title="Ranking de Traders - Suzana"
          description={`Faça um depósito de pelo menos R$ ${minDeposit} para se tornar apto ao torneio!`}
        />
        {/* Premiação & Regras */}
<section className="grid md:grid-cols-2 gap-4">
  {/* Premiação */}
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center gap-2 mb-2">
      <Trophy className="w-5 h-5" />
      <h3 className="font-semibold text-lg">Premiação</h3>
    </div>

    <ul className="space-y-1 text-sm">
      <li><span className="font-medium">1º lugar:</span> Banca de R$ 3.000</li>
      <li><span className="font-medium">2º lugar:</span> Banca de R$ 500</li>
      <li><span className="font-medium">3º lugar:</span> Banca de R$ 500</li>
    </ul>
  </div>

  {/* Regras */}
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center gap-2 mb-2">
      <ShieldCheck className="w-5 h-5" />
      <h3 className="font-semibold text-lg">Regras</h3>
    </div>

    <ol className="list-decimal list-inside space-y-1 text-sm">
      <li>Necessário depositar pelo menos <span className="font-medium">R$ {minDeposit} entre 11/09 e 30/09</span>.</li>
      <li>Ganha o trader que tiver o maior <span className="font-medium">Resultado no período</span>.</li>
      <li>A banca será fornecida em até 5 dias úteis após o termino do torneio e terá um rollover de 5x para o saque.</li>
    </ol>
  </div>
</section>


        {/* Search Bar */}
        <div className="flex justify-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por ID ou nome do jogador..."
          />
        </div>

        {isFetching && (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 w-full bg-primary/20">
        <div className="h-1 w-1/3 animate-[progress_1.2s_ease-in-out_infinite] bg-primary" />
      </div>
      {/* animação simples */}
      <style>{`
        @keyframes progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )}

        {/* Contador de resultados */}
        <div className="text-center text-muted-foreground text-sm">
          {filteredPlayers.length}{' '}
          {filteredPlayers.length === 1 ? 'jogador encontrado' : 'jogadores encontrados'}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Tabela desktop */}
        <RankingTable players={filteredPlayers} />

        {/* Empty state */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum jogador encontrado para &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
