import type { DragonResponse } from '../data/dragon.types';
import { Spin, Empty } from 'antd';
import DragonTable from '../components/DragonTable';

type Props = {
  dragons: DragonResponse[];
  loading: boolean;
};

export default function DragonMasterView({ dragons, loading }: Props) {
  if (loading) return <Spin tip="Loading dragons..." />;

  return (
    <div>
      <h2>All Dragons</h2>
      {dragons.length === 0 ? (
        <Empty description="No dragons found." />
      ) : (
        <DragonTable dragons={dragons} />
      )}
    </div>
  );
}