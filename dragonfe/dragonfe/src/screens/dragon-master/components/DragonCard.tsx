import type { DragonResponse } from '../data/dragon.types';

type Props = {
  dragon: DragonResponse;
};

export default function DragonCard({ dragon }: Props) {
  return (
    <div>
      <div>
        {dragon.elementEmoji} {dragon.name}
        <span style={{ color: dragon.rarityColor, marginLeft: 8 }}>
          [{dragon.rarityDisplayName}]
        </span>
      </div>
      <div>Level: {dragon.level} | Power: {dragon.power}</div>
      <div>{dragon.description}</div>
    </div>
  );
}