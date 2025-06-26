import React, { useEffect, useState } from "react";
import { Form, Modal, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import GlobalInput from "../../../components/input/input";
import { fetchElementTypes, fetchRarities } from "../services/enum.services";
import type { DragonResponse } from "../data/dragon.types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

  // For Upload component
  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  useEffect(() => {
    fetchElementTypes().then(setElementTypes);
    fetchRarities().then(setRarities);
  }, []);

  useEffect(() => {
    if (dragon) {
      // Fix the image URL for preview
      let dragonPicUrl = dragon.dragonPic;
      if (dragonPicUrl && !dragonPicUrl.startsWith("http")) {
        dragonPicUrl = `${BACKEND_URL}${dragonPicUrl.startsWith("/") ? "" : "/"}${dragonPicUrl}`;
      }
      form.setFieldsValue({
        name: dragon.name,
        elementType: dragon.elementType,
        rarity: dragon.rarity,
        description: dragon.description,
        dragonPic: dragonPicUrl
          ? [
              {
                uid: "-1",
                name: "Current Image",
                status: "done",
                url: dragonPicUrl,
              },
            ]
          : [],
      });
    } else {
      form.resetFields();
    }
  }, [dragon, form]);

  // Only send changed fields
  const getChangedFields = (values: any) => {
    if (!dragon) return values;
    const changed: any = {};
    if (values.name !== dragon.name) changed.name = values.name;
    if (values.elementType !== dragon.elementType) changed.elementType = values.elementType;
    if (values.rarity !== dragon.rarity) changed.rarity = values.rarity;
    if (values.description !== dragon.description) changed.description = values.description;
    // Only send new image if uploaded
    if (
      values.dragonPic &&
      values.dragonPic[0] &&
      values.dragonPic[0].originFileObj
    ) {
      changed.dragonPic = values.dragonPic;
    }
    return changed;
  };

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
      if (dragon && dragon.id) values.id = dragon.id;
      onEdit(values);
    })
    .catch(() => {});
}}
  >
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Left: Form */}
      <div style={{ flex: 1 }}>
        <Form form={form} layout="vertical" name="dragon_edit_form">
          <Form.Item name="name" label="Dragon Name">
  <GlobalInput placeholder="Enter dragon name" />
</Form.Item>
<Form.Item name="elementType" label="Element Type">
  <Select placeholder="Select element type">
    {elementTypes.map(type => (
      <Select.Option key={type} value={type}>{type}</Select.Option>
    ))}
  </Select>
</Form.Item>
<Form.Item name="rarity" label="Rarity">
  <Select placeholder="Select rarity">
    {rarities.map(rarity => (
      <Select.Option key={rarity} value={rarity}>{rarity}</Select.Option>
    ))}
  </Select>
</Form.Item>
<Form.Item name="description" label="Description">
  <GlobalInput placeholder="Enter description" />
</Form.Item>
          <Form.Item
            name="dragonPic"
            label="Dragon Picture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="dragonPic"
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </div>
      {/* Right: Image Preview */}
      <div style={{ minWidth: 180, maxWidth: 220, textAlign: "center" }}>
        {dragon && dragon.dragonPic && (
          <img
            src={
              dragon.dragonPic.startsWith("http")
                ? dragon.dragonPic
                : `${BACKEND_URL}${dragon.dragonPic.startsWith("/") ? "" : "/"}${dragon.dragonPic}`
            }
            alt={dragon.name}
            style={{
              width: 180,
              height: 180,
              objectFit: "contain",
              borderRadius: 12,
              background: "#f5f5f5",
              marginBottom: 8,
            }}
          />
        )}
      </div>
    </div>
  </Modal>
);
}

export default DragonEdit;