import { v4 as uuid } from 'uuid';
import { DiceGroup } from '@/components/dice-group';
import { Button } from '@/components/button';
import { useDiceGroupState } from '@/hooks/use-dice-group-state';
import {
  readFromLocalStorage,
  saveToLocalStorage,
} from '@/hooks/use-local-storage';
import { useState } from 'react';
import { Inter } from 'next/font/google';

import { Presets, storedPreset } from '@/components/presets';
import { EditableHeading } from './group-heading';

const inter = Inter({ subsets: ['latin'] });

export const Main = () => {
  const {
    diceGroups,
    removeGroup,
    setGroupLabel,
    rollAllDice,
    addDie,
    rollSingleDie,
    removeDie,
    addGroup,
    setDiceGroups,
  } = useDiceGroupState();
  const [key, setKey] = useState(`dice-group-${uuid()}`);
  const [label, setLabel] = useState('');

  const load = ({ key, label, diceGroups }: storedPreset) => {
    setDiceGroups(diceGroups);
    setKey(key);
    setLabel(label);
  };

  return (
    <div className={`${inter.className} main`}>
      <EditableHeading
        label={label}
        setLabel={setLabel}
        placeholder="New Preset"
        className="h1 main-heading"
        h="2"
      />
      <main className="outer-layout">
        <div className="groups">
          {Object.entries(diceGroups).map(([id, group]) => (
            <div key={id}>
              <DiceGroup
                {...group}
                removeGroup={() => removeGroup(id)}
                setLabel={(label) => setGroupLabel(id, label)}
                rollAllDice={() => rollAllDice(id)}
                addDie={(type) => addDie(id, type)}
                rollDie={(dieID) => rollSingleDie(id, dieID)}
                removeDie={(dieID) => removeDie(id, dieID)}
              />
            </div>
          ))}
        </div>

        <div className="outer-actions">
          <Button onClick={addGroup} title="Add group">
            +
          </Button>
        </div>
      </main>

      <footer>
        <h2>Presets</h2>
        <Presets loadPreset={load} preset={{ key, label, diceGroups }} />
      </footer>
    </div>
  );
};
