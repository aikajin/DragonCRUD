import { useDragons } from './hooks/useDragon';
import DragonMasterView from './views/dragon-master-views';

export default function DragonMaster() {
  const { dragons, loading, refetch } = useDragons(); // Add refetch to your hook if not present

  return (
    <DragonMasterView dragons={dragons} loading={loading} refetch={refetch} />
  );
}