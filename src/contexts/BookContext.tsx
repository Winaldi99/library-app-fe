import React, { createContext, useContext, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  isFavorite: boolean;
}

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, "id" | "isFavorite">) => void;
  editBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (book: Omit<Book, "id" | "isFavorite">) => {
    const newBook: Book = {
      id: Date.now().toString(),
      ...book,
      isFavorite: false
    };
    setBooks([...books, newBook]);
  };

  const editBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
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
