import React, { createContext, useContext, useState } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  editCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...category
    };
    setCategories([...categories, newCategory]);
  };

  const editCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        editCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
