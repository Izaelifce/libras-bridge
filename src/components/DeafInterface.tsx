import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, VideoOff, ArrowLeft } from 'lucide-react';
import { findSignByText } from '@/data/librasSignsData';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'listener' | 'deaf';
  timestamp: Date;
  sign?: string;
}

interface DeafInterfaceProps {
  onBack: () => void;
}

const DeafInterface = ({ onBack }: DeafInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [currentSign, setCurrentSign] = useState<string>('');
  const [detectedGesture, setDetectedGesture] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsVideoActive(true);
        
        toast({
          title: "Câmera ativada",
          description: "Comece a sinalizar em Libras",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao acessar câmera",
        description: "Verifique as permissões do navegador",
        variant: "destructive"
      });
    }
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoActive(false);
  };

  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  // Simulate gesture detection (would be replaced with MediaPipe)
  useEffect(() => {
    if (!isVideoActive) return;

    const interval = setInterval(() => {
      // This would be replaced with actual MediaPipe hand tracking
      // For now, just a simulation
      const gestures = ['olá', 'obrigado', 'sim', 'não', 'ajuda'];
      const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
      setDetectedGesture(randomGesture);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVideoActive]);

  const handleReceiveMessage = (text: string) => {
    const sign = findSignByText(text);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'listener',
      timestamp: new Date(),
      sign: sign?.emoji
    };

    setMessages(prev => [...prev, newMessage]);
    if (sign) {
      setCurrentSign(sign.emoji);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Modo Surdo</h1>
            <p className="text-sm text-muted-foreground">Sinalize e veja a tradução</p>
          </div>
        </div>

        {/* Video Feed */}
        <Card className="border-2 border-secondary">
          <CardContent className="p-6">
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
              {isVideoActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform scale-x-[-1]"
                  />
                  {detectedGesture && (
                    <div className="absolute bottom-4 left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium">
                      Detectado: {detectedGesture}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Clique para ativar a câmera</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button
                size="lg"
                className={`h-16 px-8 ${isVideoActive ? 'bg-destructive hover:bg-destructive/90' : 'bg-secondary hover:bg-secondary/90'}`}
                onClick={isVideoActive ? stopVideo : startVideo}
              >
                {isVideoActive ? (
                  <>
                    <VideoOff className="w-5 h-5 mr-2" />
                    Parar Câmera
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5 mr-2" />
                    Iniciar Câmera
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Sign from Listener */}
        {currentSign && (
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Mensagem recebida</p>
                <div className="text-6xl mb-2">{currentSign}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico da Conversa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-80 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Aguardando mensagens...
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.sender === 'deaf'
                      ? 'bg-secondary/10 ml-8'
                      : 'bg-primary/10 mr-8'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {msg.sign && <span className="text-3xl">{msg.sign}</span>}
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">
                        {msg.sender === 'deaf' ? 'Você' : 'Ouvinte'}
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
      </div>
    </div>
  );
};

export default DeafInterface;
