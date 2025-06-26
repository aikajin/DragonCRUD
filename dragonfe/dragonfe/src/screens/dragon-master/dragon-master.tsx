import { useDragons } from './hooks/useDragon';
import DragonMasterView from './views/dragon-master-views';

export default function DragonMaster() {
  const { dragons, loading, refetch } = useDragons(); 

  return (
    <DragonMasterView dragons={dragons} loading={loading} refetch={refetch} />
  );
}