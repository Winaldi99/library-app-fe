import React from "react";
import { List } from "antd";
import BookCard from "./BookCard";
import { useBookContext } from "../contexts/BookContext";

const BookList: React.FC = () => {
  const { books, loading } = useBookContext();

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={books}
      loading={loading}
      renderItem={(book) => (
        <List.Item>
          <BookCard book={book} />
        </List.Item>
      )}
    />
  );
};

export default BookList;
