import { DiceGroup, DiceGroupData } from '@/components/dice-group';
import { useState } from 'react';
import { Button } from '@/components/button';
import { v4 as uuid } from 'uuid';
import { DieType, dieTypes } from '@/components/die';

type DiceGroups = {
  [id: string]: DiceGroupData;
};

export const Main = () => {
  const newGroup = () => ({ label: '', dice: {} });
  const initialGroups: DiceGroups = {
    [uuid()]: newGroup(),
  };
  const [diceGroups, setDiceGroups] = useState<DiceGroups>(initialGroups);

  const addGroup = () => {
    setDiceGroups((prev) => ({ ...prev, [uuid()]: newGroup() }));
  };

  const setGroupLabel = (id: string, label: string) => {
    setDiceGroups((prev) => {
      const group = prev[id];
      group.label = label;
      return { ...prev, [id]: group };
    });
  };

  const removeGroup = (id: string) => {
    setDiceGroups((prev) => {
      const newGroups = { ...prev };
      delete newGroups[id];
      return newGroups;
    });
  };

  const rollAllDice = (id: string) => {
    setDiceGroups((prev) => {
      const newGroups = structuredClone(prev);
      const group = newGroups[id];

      // Roll all the dice in this group
      Object.values(group.dice).forEach((die) => {
        die.value = Math.floor(Math.random() * dieTypes[die.type]) + 1;
      });

      return newGroups;
    });
  };

  const rollDie = (id: string, dieID: string) => {
    setDiceGroups((prev) => {
      const newGroups = structuredClone(prev);
      const die = newGroups[id].dice[dieID];
      die.value = Math.floor(Math.random() * dieTypes[die.type]) + 1;

      return newGroups;
    });
  };

  const addDie = (id: string, type: DieType) => {
    setDiceGroups((prev) => {
      // Clone is obnoxiously necessary because of React's double-render in dev-mode,
      // which otherwise double-adds each die after the first one
      const newGroups = structuredClone(prev);
      const group = newGroups[id];
      group.dice = { ...group.dice, [uuid()]: { type, value: 1 } };

      return { ...newGroups, [id]: group };
    });
  };

  const removeDie = (id: string, dieID: string) => {
    setDiceGroups((prev) => {
      const newGroups = structuredClone(prev);
      delete newGroups[id].dice[dieID];

      return newGroups;
    });
  };

  return (
    <>
      <div className="groups">
        {Object.entries(diceGroups).map(([id, group]) => (
          <div key={id}>
            <DiceGroup
              {...group}
              removeGroup={() => removeGroup(id)}
              setLabel={(label) => setGroupLabel(id, label)}
              rollAllDice={() => rollAllDice(id)}
              addDie={(type) => addDie(id, type)}
              rollDie={(dieID) => rollDie(id, dieID)}
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
    </>
  );
};
