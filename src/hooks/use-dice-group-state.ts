import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DiceGroupData } from '@/components/dice-group';
import { DieType } from '@/components/die';
import { rollDie } from '@/utils/roll-die';

export type DiceGroups = {
  [id: string]: DiceGroupData;
};

export const useDiceGroupState = () => {
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
        die.value = rollDie(die.type);
      });

      return newGroups;
    });
  };

  const rollSingleDie = (id: string, dieID: string) => {
    setDiceGroups((prev) => {
      const newGroups = structuredClone(prev);
      const die = newGroups[id].dice[dieID];
      die.value = rollDie(die.type);

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

  return {
    diceGroups,
    setDiceGroups,
    addGroup,
    setGroupLabel,
    removeGroup,
    rollAllDice,
    rollSingleDie,
    addDie,
    removeDie,
  };
};
