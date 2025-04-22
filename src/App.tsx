import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  BookOutlined,
  HeartOutlined,
  AppstoreOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";
import "./App.css";

const { Header, Content, Footer } = Layout;

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BookOutlined
            style={{
              fontSize: "24px",
              color: "white",
              marginRight: "16px"
            }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "Books",
                icon: <BookOutlined />,
                onClick: () => navigate("/books")
              },
              {
                key: "2",
                label: "Categories",
                icon: <AppstoreOutlined />,
                onClick: () => navigate("/categories")
              },
              {
                key: "3",
                label: "Favorites",
                icon: <HeartOutlined />,
                onClick: () => navigate("/favorites")
              }
            ]}
          />
        </div>
        <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/books" replace />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Digital Book Management System ©{new Date().getFullYear()} Created with
        Ant Design
      </Footer>
    </Layout>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <AppContent />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
