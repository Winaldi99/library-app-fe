import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space, message, Image } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  isFavorite: boolean;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(storedBooks);
  }, []);

  const handleToggleFavorite = (id: string) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    message.success("Book favorite status updated!");
  };

  const handleEdit = (id: string) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    message.success("Book deleted successfully!");
  };

  const columns = [
    {
      title: "Cover",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <Image
          src={imageUrl}
          alt="Book cover"
          style={{ width: 50, height: 75, objectFit: "cover" }}
          fallback="https://via.placeholder.com/50x75?text=No+Image"
        />
      )
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Book) => (
        <Space size="middle">
          <Button
            type="text"
            icon={
              record.isFavorite ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined />
              )
            }
            onClick={() => handleToggleFavorite(record.id)}
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Card
      title="Books"
      extra={
        <Button type="primary" onClick={() => navigate("/books/add")}>
          Add New Book
        </Button>
      }
    >
      <Table
        dataSource={books}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default Books;
