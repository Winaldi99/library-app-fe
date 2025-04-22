import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Descriptions, Space } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Contoh data buku (dalam aplikasi nyata, data akan diambil dari API)
  const book: Book = {
    id: id || "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    description: "A story of wealth, love, and the American Dream"
  };

  return (
    <Card
      title="Book Details"
      extra={
        <Space>
          <Link to="/books">
            <Button icon={<ArrowLeftOutlined />}>Back to List</Button>
          </Link>
          <Link to={`/books/edit/${id}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
        </Space>
      }
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Title">{book.title}</Descriptions.Item>
        <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
        <Descriptions.Item label="Category">{book.category}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {book.description}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BookDetail;
