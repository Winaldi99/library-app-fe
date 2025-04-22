import React, { useState } from "react";
import { Row, Col, Button, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BookCard from "../components/BookCard";
import { useBookContext } from "../contexts/BookContext";
import { useCategoryContext } from "../contexts/CategoryContext";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  isFavorite: boolean;
}

const BookList: React.FC = () => {
  const { books, addBook, editBook, deleteBook, toggleFavorite } =
    useBookContext();
  const { categories } = useCategoryContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAddBook = (values: any) => {
    if (editingId) {
      editBook(editingId, values);
      message.success("Book updated successfully");
    } else {
      addBook(values);
      message.success("Book added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingId(null);
  };

  const handleEditBook = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      setEditingId(id);
      form.setFieldsValue(book);
      setIsModalVisible(true);
    }
  };

  const handleDeleteBook = (id: string) => {
    deleteBook(id);
    message.success("Book deleted successfully");
  };

  return (
    <div style={{ padding: "24px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingId(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
        style={{ marginBottom: "16px" }}
      >
        Add New Book
      </Button>

      <Row gutter={[16, 16]}>
        {books.map((book) => (
          <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
            <BookCard
              {...book}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              onToggleFavorite={toggleFavorite}
            />
          </Col>
        ))}
      </Row>

      <Modal
        title={editingId ? "Edit Book" : "Add New Book"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingId(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddBook} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="cover"
            label="Cover Image URL"
            rules={[
              { required: true, message: "Please input cover image URL" },
              { type: "url", message: "Please enter a valid URL" }
            ]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookList;
