import React, { useState, useEffect } from "react";
import { Table, Card, Button, Space, message } from "antd";
import { HeartOutlined, DeleteOutlined } from "@ant-design/icons";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isFavorite: boolean;
}

const Favorites: React.FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load all books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    // Filter only favorite books
    const favorites = storedBooks.filter((book: Book) => book.isFavorite);
    setFavoriteBooks(favorites);
  }, []);

  const handleRemoveFavorite = (id: string) => {
    // Update the book's favorite status in localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = storedBooks.map((book: Book) =>
      book.id === id ? { ...book, isFavorite: false } : book
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    // Update the local state
    setFavoriteBooks(favoriteBooks.filter((book) => book.id !== id));
    message.success("Book removed from favorites!");
  };

  const columns = [
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
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveFavorite(record.id)}
          >
            Remove from Favorites
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Card
      title={
        <Space>
          <HeartOutlined style={{ color: "red" }} />
          Favorite Books
        </Space>
      }
    >
      <Table
        dataSource={favoriteBooks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{
          emptyText: "No favorite books yet. Add some books to your favorites!"
        }}
      />
    </Card>
  );
};

export default Favorites;
