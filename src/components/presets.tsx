import {
  readFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '@/hooks/use-local-storage';
import { useEffect, useState } from 'react';
import { DiceGroups } from '@/hooks/use-dice-group-state';
import { Button } from './button';
import { RemoveButton } from './remove-button';

export type storedPreset = {
  key: string;
  label: string;
  diceGroups: DiceGroups;
};

interface PresetsProps {
  preset: storedPreset;
  loadPreset: (preset: storedPreset) => void;
}

export const Presets = ({ preset, loadPreset }: PresetsProps) => {
  // Only get presets client-side
  const [presets, setPresets] = useState<[string, storedPreset][]>([]);

  const update = () => {
    console.log('storage updates');
    const presetKeys = Object.keys(localStorage).filter((key) =>
      key.includes('dice-group-')
    );
    const presetEntries: [string, storedPreset][] = presetKeys.map((key) => [
      key,
      readFromLocalStorage(key),
    ]);

    setPresets(presetEntries);
  };

  // Update once at the beginning to load client-side
  useEffect(() => {
    update();
  }, []);

  const save = () => {
    saveToLocalStorage(preset.key, preset);
    update();
  };

  const remove = (key: string) => {
    removeFromLocalStorage(key);
    update();
  };

  return (
    <div className="presets">
      {presets.map(([key, preset]) => (
        <div key={key}>
          {preset.label || 'Untitled'}
          <Button onClick={() => loadPreset(preset)}>Load</Button>
          <RemoveButton onClick={() => remove(key)} />
        </div>
      ))}

      <Button onClick={save}>Save current as preset</Button>
    </div>
  );
};
