import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCategoryContext } from "../contexts/CategoryContext";

const CategoryManagement: React.FC = () => {
  const { categories, addCategory, editCategory, deleteCategory } =
    useCategoryContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleAddCategory = (values: any) => {
    if (editingId) {
      editCategory(editingId, values);
      message.success("Category updated successfully");
    } else {
      addCategory(values);
      message.success("Category added successfully");
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingId(null);
  };

  const handleEditCategory = (record: any) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
    message.success("Category deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => handleEditCategory(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingId(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
        style={{ marginBottom: "16px" }}
      >
        Add New Category
      </Button>

      <Table dataSource={categories} columns={columns} rowKey="id" />

      <Modal
        title={editingId ? "Edit Category" : "Add New Category"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingId(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddCategory} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
