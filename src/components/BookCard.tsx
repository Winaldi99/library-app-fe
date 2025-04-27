import React from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();

  return (
    <Card
      cover={<img alt={book.title} src={book.imageUrl} />}
      actions={[
        <Button type="link" onClick={() => navigate(`/books/${book.id}`)}>
          View Details
        </Button>
      ]}
    >
      <Card.Meta title={book.title} description={book.author} />
    </Card>
  );
};

export default BookCard;
