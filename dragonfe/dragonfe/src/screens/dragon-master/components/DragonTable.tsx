import type { DragonResponse } from '../data/dragon.types';

type Props = {
  dragons: DragonResponse[];
};

export default function DragonTable({ dragons }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Element</th>
          <th>Name</th>
          <th>Rarity</th>
          <th>Level</th>
          <th>Power</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {dragons.map(dragon => (
          <tr key={dragon.id}>
            <td>{dragon.elementType}</td>
            <td>{dragon.name}</td>
            <td style={{ color: dragon.rarityColor }}>
              {dragon.rarityDisplayName}
            </td>
            <td>{dragon.level}</td>
            <td>{dragon.power}</td>
            <td>{dragon.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}