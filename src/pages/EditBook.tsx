import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  isFavorite: boolean;
}

const EditBook: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // Load book data from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const bookToEdit = storedBooks.find((book: Book) => book.id === id);

    if (bookToEdit) {
      setBook(bookToEdit);
      form.setFieldsValue(bookToEdit);
    } else {
      message.error("Book not found!");
      navigate("/books");
    }
  }, [id, form, navigate]);

  const onFinish = (values: any) => {
    // Get existing books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");

    // Update the book
    const updatedBooks = storedBooks.map((book: Book) =>
      book.id === id ? { ...book, ...values } : book
    );

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    message.success("Book updated successfully!");
    navigate("/books");
  };

  if (!book) {
    return null;
  }

  return (
    <Card title="Edit Book" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Form
        form={form}
        name="editBook"
        onFinish={onFinish}
        layout="vertical"
        initialValues={book}
      >
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
            Update Book
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditBook;
