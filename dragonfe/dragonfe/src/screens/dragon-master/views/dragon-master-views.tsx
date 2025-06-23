import type { DragonResponse } from '../data/dragon.types';
import { Spin, Empty, message } from 'antd';
import DragonTable from '../components/DragonTable';
import React, { useState } from 'react';
import { createDragon } from '../services/dragon.services';
import { updateDragon } from '../services/dragon.services';
import { deleteDragon } from '../services/dragon.services';
import { Modal } from 'antd';
import DragonCreate from '../components/DragonCreate';
import DragonEdit from '../components/DragonEdit';
import DragonView from '../components/DragonView';
import GlobalButton from '../../../components/button/button';


type Props = {
  dragons: DragonResponse[];
  loading: boolean;
  refetch?: () => void; // Optional: if you want to trigger fetch from parent
};

const DragonMasterView: React.FC<Props> = ({ dragons, loading, refetch }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [editingDragon, setEditingDragon] = useState<DragonResponse | null>(null);
  const [viewingDragon, setViewingDragon] = useState<DragonResponse | null>(null);

 const handleCreate = async (values: any) => {
  console.log(values); // Check the payload in your browser console
  try {
    await createDragon(values); // POST to backend
    message.success("Dragon created successfully!");
    setShowCreate(false);
    if (refetch) refetch(); // Refresh the list
  } catch (error: any) {
    message.error(
      error?.response?.data?.message ||
      "Failed to create dragon. Please check your input."
    );
  }
};

  const handleEdit = async (values: any) => {
    if (!editingDragon) return;
    try {
      await updateDragon(editingDragon.id, values);
      message.success("Dragon updated successfully!");
      setEditingDragon(null);
      if (refetch) refetch();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
        "Failed to update dragon. Please check your input."
      );
    }
  };

const handleDelete = async (dragon: DragonResponse) => {
  try {
    await deleteDragon(dragon.id);
    message.success("Dragon deleted successfully!");
    setViewingDragon(null); // Close the DragonView modal
    if (refetch) refetch();
  } catch (error: any) {
    message.error(
      error?.response?.data?.message ||
      "Failed to delete dragon."
    );
  }
};
  
  if (loading) return <Spin tip="Loading dragons..." />;


return (
  <div>
    <h2>All Dragons</h2>
    <GlobalButton type="primary" onClick={() => setShowCreate(true)}>
      Create New Dragon
    </GlobalButton>
    <DragonCreate
      visible={showCreate}
      onCreate={handleCreate}
      onCancel={() => setShowCreate(false)}
    />
    <DragonEdit
      visible={!!editingDragon}
      dragon={editingDragon}
      onEdit={handleEdit}
      onCancel={() => setEditingDragon(null)}
    />
    {dragons.length === 0 ? (
      <Empty description="No dragons found." />
    ) : (
      <DragonTable
        dragons={dragons}
        onView={setViewingDragon}
        onEdit={setEditingDragon}
      />
    )}
   <DragonView
      visible={!!viewingDragon}
      dragon={viewingDragon}
      onClose={() => setViewingDragon(null)}
      onDelete={handleDelete}
    />
  </div>
);
}

export default DragonMasterView;

