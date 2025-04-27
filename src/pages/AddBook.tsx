import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../contexts/BookContext";

const { Option } = Select;

const AddBook: React.FC = () => {
  const { addBook } = useBookContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await addBook(values);
      message.success("Book added successfully!");
      navigate("/books");
    } catch {
      message.error("Failed to add book!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Author" name="author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Category" name="category" rules={[{ required: true }]}>
        <Select>
          <Option value="Fiction">Fiction</Option>
          <Option value="Non-Fiction">Non-Fiction</Option>
          <Option value="Science">Science</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Image URL" name="imageUrl">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBook;
