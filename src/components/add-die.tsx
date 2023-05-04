import { Button } from './button';
import { DieType, dieTypes } from './die';

const typesArr = Object.keys(dieTypes) as DieType[];

export interface AddDieProps {
  addDie: (type: DieType) => void;
}

export const AddDie = ({ addDie }: AddDieProps) => {
  return (
    <div className="dice-actions">
      Add{' '}
      {typesArr.map((type) => {
        return (
          <Button key={type} className="add" onClick={() => addDie(type)}>
            {type}
          </Button>
        );
      })}
    </div>
  );
};
