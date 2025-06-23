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

const DragonView: React.FC<DragonViewProps> = ({ visible, dragon, onClose, onDelete }) => {
  if (!dragon) return null;

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
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{dragon.name}</Descriptions.Item>
        <Descriptions.Item label="Element">{dragon.elementType}</Descriptions.Item>
        <Descriptions.Item label="Rarity">{dragon.rarity}</Descriptions.Item>
        <Descriptions.Item label="Level">{dragon.level}</Descriptions.Item>
        <Descriptions.Item label="Power">{dragon.power}</Descriptions.Item>
        <Descriptions.Item label="Description">{dragon.description}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DragonView;