import React from "react";
import { Card, Button, Popconfirm, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled
} from "@ant-design/icons";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  isFavorite: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover,
  category,
  isFavorite,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  const handleDelete = () => {
    onDelete(id);
    message.success("Book deleted successfully");
  };

  return (
    <Card
      hoverable
      cover={
        <div style={{ height: "200px", overflow: "hidden" }}>
          <img
            alt={title}
            src={cover}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/200x300?text=No+Image";
            }}
          />
        </div>
      }
      actions={[
        <Button
          type="text"
          icon={
            isFavorite ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={() => onToggleFavorite(id)}
        />,
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(id)}
        />,
        <Popconfirm
          title="Are you sure you want to delete this book?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ]}
    >
      <Card.Meta
        title={title}
        description={
          <>
            <div>Author: {author}</div>
            <div>Category: {category}</div>
          </>
        }
      />
    </Card>
  );
};

export default BookCard;
