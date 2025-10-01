import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ear, Hand } from "lucide-react";

interface ModeSelectorProps {
  onSelectMode: (mode: 'listener' | 'deaf') => void;
}

const ModeSelector = ({ onSelectMode }: ModeSelectorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Comunicador Libras
          </h1>
          <p className="text-xl text-muted-foreground">
            Tradução automática e em tempo real entre fala e Libras
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-primary" 
                onClick={() => onSelectMode('listener')}>
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Ear className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-center text-2xl">Modo Ouvinte</CardTitle>
              <CardDescription className="text-center text-base">
                Para quem fala e quer se comunicar com pessoas surdas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Fale normalmente
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Veja os sinais em Libras
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Receba resposta em áudio
                </li>
              </ul>
              <Button className="w-full" size="lg" onClick={() => onSelectMode('listener')}>
                Começar como Ouvinte
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-secondary" 
                onClick={() => onSelectMode('deaf')}>
            <CardHeader>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Hand className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-center text-2xl">Modo Surdo</CardTitle>
              <CardDescription className="text-center text-base">
                Para quem usa Libras e quer se comunicar com ouvintes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Sinalize em Libras
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Veja o texto traduzido
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Veja sinais da resposta
                </li>
              </ul>
              <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg" onClick={() => onSelectMode('deaf')}>
                Começar como Surdo
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>🔊 Certifique-se de permitir acesso ao microfone e câmera</p>
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
