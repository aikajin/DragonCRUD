import type { DragonResponse } from '../data/dragon.types';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

type Props = {
  dragons: DragonResponse[];
  onView?: (dragon: DragonResponse) => void;
  onEdit?: (dragon: DragonResponse) => void;
};

export default function DragonTable({ dragons, onView, onEdit }: Props) {
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {dragons.map(dragon => (
          <tr key={dragon.id}>
            <td>{dragon.elementType}</td>
            <td>{dragon.name}</td>
            <td>{dragon.rarity}</td>
            <td>{dragon.level}</td>
            <td>{dragon.power}</td>
            <td>{dragon.description}</td>
            <td>
              <EyeOutlined
                style={{ cursor: 'pointer', marginRight: 12 }}
                onClick={() => onView && onView(dragon)}
                title="View"
              />
              <EditOutlined
                style={{ cursor: 'pointer', color: '#1890ff' }}
                onClick={() => onEdit && onEdit(dragon)}
                title="Edit"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}