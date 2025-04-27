import React, { createContext, useContext, useState, useEffect } from "react";
import { bookAPI } from "../services/api";

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  category: string;
  isFavorite: boolean;
}

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  addBook: (book: Omit<Book, "id" | "isFavorite">) => Promise<void>;
  editBook: (id: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAll();
      setBooks(response.data);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, "id" | "isFavorite">) => {
    try {
      const response = await bookAPI.create(book);
      setBooks([...books, response.data]);
    } catch (err) {
      setError("Failed to add book");
    }
  };

  const editBook = async (id: string, updatedBook: Partial<Book>) => {
    try {
      const response = await bookAPI.update(id, updatedBook);
      setBooks(books.map((book) => (book.id === id ? response.data : book)));
    } catch (err) {
      setError("Failed to update book");
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await bookAPI.delete(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const response = await bookAPI.toggleFavorite(id);
      setBooks(books.map((book) => (book.id === id ? response.data : book)));
    } catch (err) {
      setError("Failed to toggle favorite");
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        addBook,
        editBook,
        deleteBook,
        toggleFavorite
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
