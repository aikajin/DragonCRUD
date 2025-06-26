import type { DragonResponse } from '../data/dragon.types';
import { Spin, Empty, message, Button, Input, Space, Select } from 'antd';
import DragonTable from '../components/DragonTable';
import React, { useEffect, useState } from 'react';
import {
  updateDragonWithImage,
  deleteDragon,
  uploadDragonWithImage,
  searchDragonsByName,
  fetchTopDragons,
  fetchDragonStats,
  fetchElementTypes,
  fetchRarities,
  fetchDragonsByElement,
  fetchDragonsByRarity
} from '../services/dragon.services';
import DragonCreate from '../components/DragonCreate';
import DragonEdit from '../components/DragonEdit';
import DragonView from '../components/DragonView';
import GlobalButton from '../../../components/button/button';
import '../style/dragon-master-view.css';

type Props = {
  dragons: DragonResponse[];
  loading: boolean;
  refetch?: () => void;
};

const DragonMasterView: React.FC<Props> = ({ dragons, loading, refetch }) => {
  // --- State Management ---
  const [showCreate, setShowCreate] = useState(false);
  const [editingDragon, setEditingDragon] = useState<DragonResponse | null>(null);
  const [viewingDragon, setViewingDragon] = useState<DragonResponse | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDragons, setFilteredDragons] = useState<DragonResponse[] | null>(null);
  const [topDragons, setTopDragons] = useState<DragonResponse[]>([]);
  const [showTop, setShowTop] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const [elements, setElements] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string>('All Elements');
  const [selectedRarity, setSelectedRarity] = useState<string>('All Rarities');

  // Fetch filter options on mount 
  useEffect(() => {
    fetchElementTypes().then(setElements);
    fetchRarities().then(setRarities);
  }, []);

  // --- Handlers ---
  const handleSearch = async () => {
    if (!searchTerm) return;
    setLocalLoading(true);
    try {
      const result = await searchDragonsByName(searchTerm);
      setFilteredDragons(result);
      setShowTop(false);
      setStats(null);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleShowTop = async () => {
    setLocalLoading(true);
    try {
      const result = await fetchTopDragons();
      setTopDragons(result);
      setShowTop(true);
      setStats(null);
      setFilteredDragons(null);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleShowStats = async () => {
    setLocalLoading(true);
    try {
      const result = await fetchDragonStats();
      setStats(result);
      setShowTop(false);
      setFilteredDragons(null);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleFilterElement = async (element: string) => {
    setSelectedElement(element);
    setLocalLoading(true);
    try {
      if (element === 'All Elements') {
        setFilteredDragons(null);
        setShowTop(false);
        setStats(null);
      } else {
        const result = await fetchDragonsByElement(element);
        setFilteredDragons(result);
        setShowTop(false);
        setStats(null);
      }
    } finally {
      setLocalLoading(false);
    }
  };

  const handleFilterRarity = async (rarity: string) => {
    setSelectedRarity(rarity);
    if (rarity === 'All Rarities') {
      setFilteredDragons(null);
      setShowTop(false);
      setStats(null);
      return;
    }
    setLocalLoading(true);
    try {
      const result = await fetchDragonsByRarity(rarity);
      setFilteredDragons(result);
      setShowTop(false);
      setStats(null);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilteredDragons(null);
    setShowTop(false);
    setStats(null);
    setSearchTerm('');
    setSelectedElement('All Elements');
    setSelectedRarity('All Rarities');
  };

  const handleCreate = async (values: any) => {
    try {
      await uploadDragonWithImage(values);
      message.success('Dragon created successfully!');
      setShowCreate(false);
      await refreshDragons();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          'Failed to create dragon. Please check your input.'
      );
    }
  };

  const handleEdit = async (values: any) => {
    if (!editingDragon) return;
    try {
      const dragonData = {
        name: values.name ?? editingDragon.name,
        elementType: values.elementType ?? editingDragon.elementType,
        rarity: values.rarity ?? editingDragon.rarity,
        description: values.description ?? editingDragon.description,
      };
      await updateDragonWithImage(editingDragon.id, {
        ...dragonData,
        dragonPic: values.dragonPic,
      });
      message.success('Dragon updated successfully!');
      setEditingDragon(null);
      await refreshDragons();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          'Failed to update dragon. Please check your input.'
      );
    }
  };

  const handleDelete = async (dragon: DragonResponse) => {
    try {
      await deleteDragon(dragon.id);
      message.success('Dragon deleted successfully!');
      setViewingDragon(null);
      await refreshDragons();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || 'Failed to delete dragon.'
      );
    }
  };

  //refreshing
  const refreshDragons = async () => {
  // If a filter is active, re-apply it
  if (selectedElement !== "All Elements") {
    await handleFilterElement(selectedElement);
  } else if (selectedRarity !== "All Rarities") {
    await handleFilterRarity(selectedRarity);
  } else if (searchTerm) {
    await handleSearch();
  } else if (showTop) {
    await handleShowTop();
  } else if (stats) {
    await handleShowStats();
  } else if (refetch) {
    refetch();
  }
};


  // --- Decide which dragons to show ---
  let dragonsToShow: DragonResponse[] = dragons;
  if (filteredDragons !== null) dragonsToShow = filteredDragons;
  if (showTop) dragonsToShow = topDragons;
  if (loading || localLoading) return <Spin tip="Loading dragons..." />;

  // 
  return (
    <div className="dragon-master-container">
      
      <div className="dragon-header">
        <h2>Dragon Collection</h2>
        <GlobalButton type="primary" onClick={() => setShowCreate(true)}>
          Create New Dragon
        </GlobalButton>
      </div>

      {/* para filter */}
      <div className="dragon-filter-section">
        <div className="search-row">
          <Input
            className="dragon-search-input"
            placeholder="Search Dragons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            size="large"
          />
        </div>

        <div className="element-filter-row">
          <div className="element-buttons">
            <Button
              className={`element-btn ${selectedElement === 'All Elements' ? 'active' : ''}`}
              onClick={() => handleFilterElement('All Elements')}
            >
              All Elements
            </Button>
            {elements.map((element) => (
              <Button
                key={element}
                className={`element-btn element-${element.toLowerCase()} ${selectedElement === element ? 'active' : ''}`}
                onClick={() => handleFilterElement(element)}
              >
                {element}
              </Button>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <Space>
            <Button className="action-btn" onClick={handleShowTop}>
              Top Dragons
            </Button>
            <Button className="action-btn" onClick={handleShowStats}>
              Dragon Stats
            </Button>
            <Button className="clear-btn" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Select
              className="dragon-rarity-select"
              value={selectedRarity}
              onChange={handleFilterRarity}
              style={{ minWidth: 140 }}
            >
              <Select.Option value="All Rarities">All Rarities</Select.Option>
              {rarities.map((rarity) => (
                <Select.Option key={rarity} value={rarity}>
                  {rarity}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>
      </div>

      {/* Content Section */}
      <div className="dragon-content">
        {stats ? (
          <div className="stats-container">
            <h3>Dragon Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total Dragons</span>
                <span className="stat-value">{stats.totalDragons}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Level</span>
                <span className="stat-value">{stats.averageLevel}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Power</span>
                <span className="stat-value">{stats.averagePower}</span>
              </div>
            </div>
          </div>
        ) : dragonsToShow.length === 0 ? (
          <Empty description="No dragons found." />
        ) : (
          <DragonTable
            dragons={dragonsToShow}
            onView={setViewingDragon}
            onEdit={setEditingDragon}
          />
        )}
      </div>

      {/* Modals */}
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
      <DragonView
        visible={!!viewingDragon}
        dragon={viewingDragon}
        onClose={() => setViewingDragon(null)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DragonMasterView;