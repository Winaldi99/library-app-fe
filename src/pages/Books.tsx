import React, { useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../contexts/BookContext";

const Books: React.FC = () => {
  const { books, deleteBook, loading, error } = useBookContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleEdit = (id: string) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      message.success("Book deleted successfully!");
    } catch {
      message.error("Failed to delete book!");
    }
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
      render: (_: any, record: any) => (
        <Space size="middle">
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
    <Table
      dataSource={books}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default Books;
