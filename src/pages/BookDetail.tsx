import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, message } from "antd";
import { bookAPI } from "../services/api";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await bookAPI.getById(id!);
        setBook(response.data);
      } catch {
        message.error("Failed to fetch book details!");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (!book) {
    return <p>No book found!</p>;
  }

  return (
    <Card title={book.title}>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Category:</strong> {book.category}
      </p>
      <img src={book.imageUrl} alt={book.title} style={{ width: "200px" }} />
    </Card>
  );
};

export default BookDetail;
