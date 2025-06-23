import React, { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";
import GlobalInput from "../../../components/input/input";
import { fetchElementTypes, fetchRarities } from "../services/enum.services";
import type { DragonResponse } from "../data/dragon.types";

type DragonEditProps = {
  visible: boolean;
  dragon: DragonResponse | null;
  onEdit: (values: any) => void;
  onCancel: () => void;
};

const DragonEdit: React.FC<DragonEditProps> = ({ visible, dragon, onEdit, onCancel }) => {
  const [form] = Form.useForm();
  const [elementTypes, setElementTypes] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);

  useEffect(() => {
    fetchElementTypes().then(setElementTypes);
    fetchRarities().then(setRarities);
  }, []);

  useEffect(() => {
    if (dragon) {
      form.setFieldsValue({
        name: dragon.name,
        elementType: dragon.elementType,
        rarity: dragon.rarity,
        description: dragon.description,
      });
    } else {
      form.resetFields();
    }
  }, [dragon, form]);

  return (
    <Modal
      open={visible}
      title="Edit Dragon"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onEdit(values);
          })
          .catch(() => {});
      }}
    >
      <Form form={form} layout="vertical" name="dragon_edit_form">
        <Form.Item
          name="name"
          label="Dragon Name"
          rules={[{ required: true, message: "Please input the dragon's name!" }]}
        >
          <GlobalInput placeholder="Enter dragon name" />
        </Form.Item>
        <Form.Item
          name="elementType"
          label="Element Type"
          rules={[{ required: true, message: "Please select an element type!" }]}
        >
          <Select placeholder="Select element type">
            {elementTypes.map(type => (
              <Select.Option key={type} value={type}>{type}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="rarity"
          label="Rarity"
          rules={[{ required: true, message: "Please select rarity!" }]}
        >
          <Select placeholder="Select rarity">
            {rarities.map(rarity => (
              <Select.Option key={rarity} value={rarity}>{rarity}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <GlobalInput placeholder="Enter description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DragonEdit;