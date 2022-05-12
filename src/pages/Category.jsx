import React from "react";
import {
  Table,
  PageHeader,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  Icon,
  Popconfirm
} from "antd";
import { connect } from "react-redux";
import {
  getDataCategory,
  addCategory,
  editCategory,
  deleteCategory
} from "../redux/actions/categoryAction";
import { useState, useEffect } from "react";
import moment from "moment";
const { Option } = Select;
const ButtonGroup = Button.Group;

const Category = ({
  category,
  getDataCategory,
  editCategory,
  addCategory,
  deleteCategory,
  form
}) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [recordSeleted, setRecordSeleted] = useState(null);

  const [method, setMethod] = useState("post");

  const [page, setPage] = useState(1);

  const columnCategory = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, record, index) => {
        return index + 1;
      },
      width: "5%"
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (name) => name,
      width: "15%"
    },

    {
      title: "Action",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <div>
            <Button onClick={() => handleEditRow(record)}>
              <Icon type="edit" theme="twoTone" />
            </Button>
            <Popconfirm
              title="Sure to remove row?"
              onConfirm={() => handleRemoveRow(record._id)}
            >
              <Button>
                <Icon type="delete" theme="twoTone" twoToneColor="#D02A2F" />
              </Button>
            </Popconfirm>
          </div>
        );
      },
      width: "10%"
    }
  ];

  useEffect(() => {
    getDataCategory({ page: 1, limit: 10 });
  }, []);
  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const handleAddRow = () => {
    setMethod("post");
    showDrawer();
  };
  const handleEditRow = (record) => {
    setMethod("put");
    setRecordSeleted(record);
    showDrawer();
  };

  const handleRemoveRow = (id) => {
    deleteCategory(id, category.paginationCategory);
  };

  const onClose = () => {
    setRecordSeleted(null);
    setVisibleDrawer(false);
    handleReset();
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("handleTableChange: ", pagination, filters, sorter);
    getDataCategory({
      limit: pagination.pageSize,
      page: pagination.current
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (method == "post") {
          addCategory(values);
        } else {
          if (recordSeleted.name == values.name) return;
          editCategory(recordSeleted._id, values);
        }
        onClose();
      } else {
        console.log("error: ", err);
      }
    });
  };

  const handleReset = () => {
    form.resetFields(); // clear All data in form
  };

  const { getFieldDecorator } = form;

  // render
  return (
    <div style={{ background: "#fff", padding: 24 }}>
      <PageHeader
        title="Bảng danh mục"
        extra={[
          <Button key="add" type="primary" onClick={handleAddRow}>
            <Icon type="plus" /> Thêm danh mục
          </Button>
        ]}
      />
      <br />

      <Table
        columns={columnCategory}
        rowKey={(record) => record._id}
        dataSource={category.data}
        pagination={category.paginationCategory}
        loading={category.loading}
        onChange={handleTableChange}
      />
      <Drawer
        title={method == "post" ? "Thêm danh mục mới" : "Sửa danh mục"}
        width={540}
        onClose={onClose}
        maskClosable={false}
        visible={visibleDrawer}
      >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col>
              <Form.Item label="Tên">
                {getFieldDecorator("name", {
                  initialValue: recordSeleted ? recordSeleted.name : null,
                  rules: [{ required: true, message: "Hãy nhập tên danh mục!" }]
                })(<Input placeholder="Nhập tên danh mục" />)}
              </Form.Item>
            </Col>
          </Row>
          <div className="footer-drawer">
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    category: state.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataCategory: (params) => dispatch(getDataCategory(params)),
    addCategory: (params) => dispatch(addCategory(params)),
    editCategory: (id, params) => dispatch(editCategory(id, params)),
    deleteCategory: (id, currentCategory) =>
      dispatch(deleteCategory(id, currentCategory))
  };
}

const CategoryPage = Form.create({ name: "add_category" })(Category);
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
