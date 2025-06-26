import type { DragonResponse } from "../data/dragon.types";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import "../style/dragon-master-view.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
  dragons: DragonResponse[];
  onView?: (dragon: DragonResponse) => void;
  onEdit?: (dragon: DragonResponse) => void;
  onCreate?: () => void;
};

export default function DragonTable({
  dragons,
  onView,
  onEdit,
  onCreate,
}: Props) {
  return (
    <div className="dragon-cards-grid">
      {dragons.map((dragon) => {
        const dragonPicUrl = dragon.dragonPic
          ? dragon.dragonPic.startsWith("http")
            ? dragon.dragonPic
            : `${BACKEND_URL}${dragon.dragonPic.startsWith("/") ? "" : "/"}${
                dragon.dragonPic
              }`
          : "/placeholder.svg";

        return (
          <Card
            key={dragon.id}
            className="dragon-card"
            cover={
              <div className="dragon-card-img-bg">
                <img
                  src={dragonPicUrl}
                  alt={dragon.name}
                  className="dragon-image"
                />
              </div>
            }
            actions={[
              <Button
                key="view"
                type="text"
                icon={<EyeOutlined />}
                onClick={() => onView && onView(dragon)}
              />,
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEdit && onEdit(dragon)}
              />,
            ]}
          >
            <div className="dragon-card-content">
              <div>
                <h3 className="dragon-card-title">{dragon.name}</h3>
                <span
                  className={`dragon-badge rarity-${dragon.rarity
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {dragon.rarityEmoji} {dragon.rarity}
                </span>
              </div>
              <div className="dragon-card-meta">
                <div className="dragon-card-meta-row">
                  <span>Level: {dragon.level}</span>
                  <span>Power: {dragon.power}</span>
                </div>
                <div className="dragon-card-element">
                  <span className="text-orange">
                    {dragon.elementTypeEmoji} {dragon.elementType}
                  </span>
                </div>
              </div>
              <div className="dragon-card-desc">{dragon.description}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
