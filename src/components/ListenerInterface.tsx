import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, ArrowLeft } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { findSignByText } from '@/data/librasSignsData';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'listener' | 'deaf';
  timestamp: Date;
  sign?: string;
}

interface ListenerInterfaceProps {
  onBack: () => void;
}

const ListenerInterface = ({ onBack }: ListenerInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSign, setCurrentSign] = useState<string>('');
  const { toast } = useToast();
  const { speak, isSpeaking } = useSpeechSynthesis();

  const handleTranscript = (transcript: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: transcript,
      sender: 'listener',
      timestamp: new Date()
    };

    // Find corresponding Libras sign
    const sign = findSignByText(transcript);
    if (sign) {
      setCurrentSign(sign.emoji);
      newMessage.sign = sign.emoji;
    }

    setMessages(prev => [...prev, newMessage]);

    toast({
      title: "Mensagem enviada",
      description: sign ? `Sinal: ${sign.word}` : "Aguardando tradução...",
    });
  };

  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition({
    onResult: handleTranscript,
    continuous: true
  });

  // Simulate receiving message from deaf user
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with real-time communication
      // For now, it's just a placeholder
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleReceiveMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'deaf',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    speak(text);
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Navegador não suportado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Seu navegador não suporta reconhecimento de voz. Tente usar Chrome ou Edge.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Modo Ouvinte</h1>
            <p className="text-sm text-muted-foreground">Fale e veja os sinais em Libras</p>
          </div>
        </div>

        {/* Current Sign Display */}
        {currentSign && (
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Último sinal enviado</p>
                <div className="text-8xl mb-2">{currentSign}</div>
                <p className="text-lg font-medium">Sinal em Libras</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico da Conversa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Clique no botão abaixo para começar a falar
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.sender === 'listener'
                      ? 'bg-primary/10 ml-8'
                      : 'bg-secondary/10 mr-8'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.sign && <span className="text-3xl">{msg.sign}</span>}
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">
                        {msg.sender === 'listener' ? 'Você' : 'Surdo'}
                      </p>
                      <p className="text-foreground">{msg.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {msg.timestamp.toLocaleTimeString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                className={`h-20 w-20 rounded-full ${isListening ? 'bg-destructive hover:bg-destructive/90' : ''}`}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-lg font-medium">
                  {isListening ? 'Ouvindo...' : 'Clique para falar'}
                </p>
                {isSpeaking && (
                  <div className="flex items-center gap-2 text-secondary mt-2">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">Reproduzindo resposta...</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListenerInterface;
