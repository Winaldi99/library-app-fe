import React, { useState } from "react";
import { Form, Input, Button, Card, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  isFavorite: boolean;
}

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // Get existing books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");

    // Create new book object
    const newBook: Book = {
      id: Date.now().toString(),
      title: values.title,
      author: values.author,
      category: values.category,
      imageUrl: values.imageUrl,
      isFavorite: false
    };

    // Add new book to the list
    const updatedBooks = [...storedBooks, newBook];
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    message.success("Book added successfully!");
    navigate("/books");
  };

  return (
    <Card title="Add New Book" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Form form={form} name="addBook" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the book title!" }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please input the author name!" }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            {/* Load categories from localStorage */}
            {JSON.parse(localStorage.getItem("categories") || "[]").map(
              (category: any) => (
                <Select.Option key={category.id} value={category.name}>
                  {category.name}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="Image URL"
          rules={[
            { required: true, message: "Please input the image URL!" },
            { type: "url", message: "Please enter a valid URL!" }
          ]}
        >
          <Input placeholder="Enter image URL (e.g., https://example.com/image.jpg)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBook;
