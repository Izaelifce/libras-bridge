import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModeSelector from '@/components/ModeSelector';
import ListenerInterface from '@/components/ListenerInterface';
import DeafInterface from '@/components/DeafInterface';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

type Mode = 'selection' | 'listener' | 'deaf';

const Index = () => {
  const [mode, setMode] = useState<Mode>('selection');
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSelectMode = (selectedMode: 'listener' | 'deaf') => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    setMode('selection');
  };

  return (
    <div className="relative min-h-screen">
      {user && (
        <div className="absolute top-4 right-4 z-50">
          <Button onClick={handleSignOut} variant="outline">
            Sair
          </Button>
        </div>
      )}
      {mode === 'selection' && <ModeSelector onSelectMode={handleSelectMode} />}
      {mode === 'listener' && <ListenerInterface onBack={handleBack} />}
      {mode === 'deaf' && <DeafInterface onBack={handleBack} />}
    </div>
  );
};

export default Index;
