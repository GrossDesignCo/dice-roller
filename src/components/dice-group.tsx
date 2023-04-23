import { GroupHeading } from './group-heading';
import { Dice } from './dice';
import { RemoveButton } from './remove-button';

interface DiceGroupProps {
  onRemove: () => void;
}

export const DiceGroup = ({ onRemove }: DiceGroupProps) => {
  return (
    <section className="dice-group">
      <div className="dice-group-heading">
        <GroupHeading />
        <RemoveButton onClick={() => onRemove()} />
      </div>

      <Dice />
    </section>
  );
};
