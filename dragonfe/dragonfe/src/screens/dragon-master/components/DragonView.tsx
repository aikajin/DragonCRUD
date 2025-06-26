import React from "react";
import { Modal, Descriptions, Button } from "antd";
import type { DragonResponse } from "../data/dragon.types";
import { DeleteOutlined } from "@ant-design/icons";

type DragonViewProps = {
  visible: boolean;
  dragon: DragonResponse | null;
  onClose: () => void;
  onDelete?: (dragon: DragonResponse) => void;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DragonView: React.FC<DragonViewProps> = ({ visible, dragon, onClose, onDelete }) => {
  if (!dragon) return null;

  
  const dragonPicUrl = dragon.dragonPic
    ? dragon.dragonPic.startsWith("http")
      ? dragon.dragonPic
      : `${BACKEND_URL}${dragon.dragonPic.startsWith("/") ? "" : "/"}${dragon.dragonPic}`
    : undefined;

  return (
    <Modal
      open={visible}
      title="Dragon Details"
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="delete"
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete && onDelete(dragon)}
        >
          Delete
        </Button>
      ]}
    >
      {/* Display dragon image  */}
      {dragonPicUrl && (
  <div style={{ textAlign: "center", marginBottom: 16 }}>
    <img
      src={dragonPicUrl}
      alt={dragon.name}
      style={{
        width: 180,
        height: 180,
        objectFit: "contain", 
        borderRadius: 12,
        background: "#f5f5f5" 
      }}
    />
  </div>
)}
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{dragon.name}</Descriptions.Item>
        <Descriptions.Item label="Element">
          <span style={{ fontSize: 20 }}>{dragon.elementTypeEmoji}</span> {dragon.elementType}
        </Descriptions.Item>
        <Descriptions.Item label="Rarity">
          <span style={{ color: dragon.rarityColor }}>
            {dragon.rarityEmoji} {dragon.rarity}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Level">{dragon.level}</Descriptions.Item>
        <Descriptions.Item label="Power">{dragon.power}</Descriptions.Item>
        <Descriptions.Item label="Description">{dragon.description}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DragonView;