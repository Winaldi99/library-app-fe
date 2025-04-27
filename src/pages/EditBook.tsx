import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useBookContext } from "../contexts/BookContext";
import { bookAPI } from "../services/api";

const { Option } = Select;

const EditBook: React.FC = () => {
  const { editBook } = useBookContext();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await bookAPI.getById(id!);
        form.setFieldsValue(response.data);
      } catch {
        message.error("Failed to fetch book details!");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await editBook(id!, values);
      message.success("Book updated successfully!");
      navigate("/books");
    } catch {
      message.error("Failed to update book!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
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
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditBook;
