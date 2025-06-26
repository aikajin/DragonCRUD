import type { DragonResponse } from '../data/dragon.types';

type Props = {
  dragon: DragonResponse;
};

export default function DragonCard({ dragon }: Props) {
  return (
    <div>
      <div>
        {/* Show dragon image */}
        {dragon.dragonPic && (
          <img
            src={dragon.dragonPic}
            alt={dragon.name}
            style={{ width: 80, height: 80, objectFit: "cover", marginRight: 12, borderRadius: 8 }}
          />
        )}
        {/* Show element emoji and name */}
        <span style={{ fontSize: 24, marginRight: 8 }}>{dragon.elementTypeEmoji}</span>
        {dragon.name}
        {/* Show rarity emoji and colored rarity name */}
        <span style={{ color: dragon.rarityColor, marginLeft: 8 }}>
          {dragon.rarityEmoji} [{dragon.rarity}]
        </span>
      </div>
      <div>Level: {dragon.level} | Power: {dragon.power}</div>
      <div>{dragon.description}</div>
    </div>
  );
}