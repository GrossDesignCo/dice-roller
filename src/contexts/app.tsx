import { DieType } from '@/components/die';
import { createContext, useContext, useState } from 'react';

type DiceGroup = {
  id: number;
  label: string;
  dice: DieType[];
};

type DiceContextType = {
  diceGroups: DiceGroup[];
  addDiceGroup: (label: string) => void;
  removeDiceGroup: (id: number) => void;
  addDieToGroup: (groupId: number, dieType: DieType) => void;
  removeDieFromGroup: (groupId: number, index: number) => void;
};

const DiceContext = createContext<DiceContextType>({
  diceGroups: [],
  addDiceGroup: () => {},
  removeDiceGroup: () => {},
  addDieToGroup: () => {},
  removeDieFromGroup: () => {},
});

type DiceProviderProps = { children: React.ReactNode };

export const DiceProvider = ({ children }: DiceProviderProps) => {
  const [diceGroups, setDiceGroups] = useState<DiceGroup[]>([]);

  const addDiceGroup = (label: string) => {
    setDiceGroups((prev) => [...prev, { id: Date.now(), label, dice: ['D6'] }]);
  };

  const removeDiceGroup = (id: number) => {
    setDiceGroups((prev) => prev.filter((group) => group.id !== id));
  };

  const addDieToGroup = (groupId: number, dieType: DieType) => {
    setDiceGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            dice: [...group.dice, dieType],
          };
        }
        return group;
      })
    );
  };

  const removeDieFromGroup = (groupId: number, index: number) => {
    setDiceGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          const dice = [...group.dice];
          dice.splice(index, 1);
          return {
            ...group,
            dice,
          };
        }
        return group;
      })
    );
  };

  return (
    <DiceContext.Provider
      value={{
        diceGroups,
        addDiceGroup,
        removeDiceGroup,
        addDieToGroup,
        removeDieFromGroup,
      }}
    >
      {children}
    </DiceContext.Provider>
  );
};
