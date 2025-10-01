import { useState } from 'react';
import ModeSelector from '@/components/ModeSelector';
import ListenerInterface from '@/components/ListenerInterface';
import DeafInterface from '@/components/DeafInterface';

type Mode = 'selection' | 'listener' | 'deaf';

const Index = () => {
  const [mode, setMode] = useState<Mode>('selection');

  const handleSelectMode = (selectedMode: 'listener' | 'deaf') => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    setMode('selection');
  };

  return (
    <>
      {mode === 'selection' && <ModeSelector onSelectMode={handleSelectMode} />}
      {mode === 'listener' && <ListenerInterface onBack={handleBack} />}
      {mode === 'deaf' && <DeafInterface onBack={handleBack} />}
    </>
  );
};

export default Index;
