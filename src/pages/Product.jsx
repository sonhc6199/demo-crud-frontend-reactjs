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
  Upload,
  Icon,
  Popconfirm,
  Avatar
} from "antd";
import { connect } from "react-redux";
import {
  getDataProduct,
  addProduct,
  editProduct,
  deleteProduct
} from "../redux/actions/productAction";
import { getDataCategory } from "../redux/actions/categoryAction";
import { useState, useEffect } from "react";
const { Option } = Select;
const { TextArea } = Input;
const memories = [
  { text: "32 GB", value: 32 },
  { text: "64 GB", value: 64 },
  { text: "128 GB", value: 128 },
  { text: "256 GB", value: 256 },
  { text: "512 GB", value: 512 }
];

const colors = [
  { text: "Blue", value: "blue" },
  { text: "Red", value: "red" },
  { text: "Gold", value: "gold" },
  { text: "Purple", value: "purple" },
  { text: "White", value: "white" },
  { text: "Black", value: "black" }
];

const Product = ({
  product,
  getDataProduct,
  editProduct,
  addProduct,
  deleteProduct,
  form,
  category,
  getDataCategory
}) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [recordSeleted, setRecordSeleted] = useState(null);

  const [uploadFile, setUploadFile] = useState(null);

  const [method, setMethod] = useState("post");

  const columnProduct = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (text, record, index) => {
        return index + 1;
      },
      width: "5%"
    },

    {
      title: "Avatar",
      dataIndex: "avatar",
      sorter: true,
      render: (avatar) => (
        <Avatar
          shape="square"
          size={64}
          src={`http://localhost:4000/images/${avatar}`}
        />
      ),
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
      title: "Memory",
      dataIndex: "memory",
      sorter: true,
      render: (memory) => memory + " GB",
      width: "5%"
    },

    {
      title: "Sale",
      dataIndex: "salePercent",
      sorter: true,
      render: (salePercent) => salePercent + " %",
      width: "5%"
    },

    {
      title: "Screen Size",
      dataIndex: "screenSize",
      sorter: true,
      render: (screenSize) => screenSize + " inches",
      width: "5%"
    },

    {
      title: "Price (VND)",
      dataIndex: "price",
      sorter: true,
      render: (price) => price,
      width: "15%"
    },

    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      render: (amount) => amount,
      width: "5%"
    },

    {
      title: "Color",
      dataIndex: "color",
      sorter: true,
      render: (color) => color,
      width: "15%"
    },
    {
      title: "categoryId",
      dataIndex: "categoryId",
      sorter: true,
      render: (categoryId) => categoryId,
      width: "15%"
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: true,
      render: (description) => description,
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
    getDataProduct({ page: 1, limit: 10 });
    getDataCategory({ page: 1, limit: 10000 });
  }, []);

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const handleAddRow = () => {
    setMethod("post");
    setUploadFile(null);
    setRecordSeleted(null);
    showDrawer();
  };

  const handleEditRow = (record) => {
    setMethod("put");
    setRecordSeleted(record);
    showDrawer();
  };

  const handleRemoveRow = (id) => {
    deleteProduct(id);
  };

  const onClose = () => {
    setRecordSeleted(null);
    setUploadFile(null);
    setVisibleDrawer(false);
    handleReset();
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    setUploadFile(file);
    return isJpgOrPng && isLt2M;
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("handleTableChange: ", pagination, filters, sorter);
    getDataProduct({
      limit: pagination.pageSize,
      page: pagination.current
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (method == "post") {
          addProduct(values);
        } else {
          editProduct(recordSeleted._id, values);
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

  const categories = category.data.map((item) => ({
    text: item.name,
    value: item._id
  }));

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
        columns={columnProduct}
        rowKey={(record) => record._id}
        dataSource={product.data}
        pagination={product.paginationProduct}
        loading={product.loading}
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
              <Form.Item label="Hình ảnh">
                {getFieldDecorator("file", {
                  initialValue: uploadFile,
                  rules: [
                    (rule, value, callback) => {
                      if (recordSeleted || value) {
                        return callback();
                      }
                      callback("Vui lòng chọn hình ảnh!");
                    }
                  ]
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                  >
                    <img
                      src={
                        uploadFile
                          ? URL.createObjectURL(uploadFile)
                          : recordSeleted
                          ? `http://localhost:4000/images/${recordSeleted.avatar}`
                          : "https://www.usbforwindows.com/storage/img/images_3/function_set_default_image_when_image_not_present.png"
                      }
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  </Upload>
                )}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Tên">
                {getFieldDecorator("name", {
                  initialValue: recordSeleted ? recordSeleted.name : null,
                  rules: [{ required: true, message: "Hãy nhập tên sản phẩm!" }]
                })(<Input placeholder="Nhập tên sản phẩm" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Chọn danh mục">
                {getFieldDecorator("categoryId", {
                  initialValue: recordSeleted ? recordSeleted.categoryId : null,
                  rules: [{ required: true, message: "Hãy nhập tên danh mục!" }]
                })(
                  <Select
                    showSearch
                    placeholder="Lựa chọn danh mục"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {categories.map((cate) => (
                      <Option key={cate.value} value={cate.value}>
                        {cate.text}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Dung Lượng">
                {getFieldDecorator("memory", {
                  initialValue: recordSeleted ? recordSeleted.memory : 64
                })(
                  <Select
                    showSearch
                    placeholder="Lựa chọn dung lượng"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {memories.map((memory) => (
                      <Option key={memory.value} value={memory.value}>
                        {memory.text}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Màu sắc">
                {getFieldDecorator("color", {
                  initialValue: recordSeleted ? recordSeleted.color : "white"
                })(
                  <Select
                    showSearch
                    placeholder="Lựa chọn Màu sắc"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {colors.map((color) => (
                      <Option key={color.value} value={color.value}>
                        {color.text}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Khuyến mại">
                {getFieldDecorator("salePercent", {
                  initialValue: recordSeleted ? recordSeleted.salePercent : 0,
                  rules: [
                    { required: true, message: "Hãy nhập khuyến mại!" },
                    (rule, value, callback) => {
                      if (value >= 0) {
                        return callback();
                      }
                      callback("Khuyến mại là một số lớn hơn hoặc bằng 0!");
                    }
                  ]
                })(<Input placeholder="Nhập khuyến mại" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Kích cỡ màn hình">
                {getFieldDecorator("screenSize", {
                  initialValue: recordSeleted ? recordSeleted.screenSize : 0,
                  rules: [
                    { required: true, message: "Hãy nhập kích cỡ màn hình!" },
                    (rule, value, callback) => {
                      if (value > 0) {
                        return callback();
                      }
                      callback("Kích cỡ màn hình là một số lớn hơn 0!");
                    }
                  ]
                })(<Input placeholder="Nhập kích cỡ" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Giá bán">
                {getFieldDecorator("price", {
                  initialValue: recordSeleted ? recordSeleted.price : 0,
                  rules: [
                    { required: true, message: "Hãy nhập giá bán!" },
                    (rule, value, callback) => {
                      if (value > 100000) {
                        return callback();
                      }
                      callback("Giá bán là một số lớn hơn 100.000!");
                    }
                  ]
                })(<Input placeholder="Nhập Giá bán" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Số lượng">
                {getFieldDecorator("price", {
                  initialValue: recordSeleted ? recordSeleted.amount : 0,
                  rules: [
                    { required: true, message: "Hãy nhập số lượng sản phẩm!" },
                    (rule, value, callback) => {
                      if (value > 0) {
                        return callback();
                      }
                      callback("Số lượng là một số lớn hơn 100.000!");
                    }
                  ]
                })(<Input placeholder="Nhập số lượng" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Mô tả">
                {getFieldDecorator("description", {
                  initialValue: recordSeleted
                    ? recordSeleted.description
                    : null,
                  rules: [
                    { required: true, message: "Hãy nhập mô tả sản phẩm!" }
                  ]
                })(<TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />)}
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
    product: state.product,
    category: state.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataProduct: (params) => dispatch(getDataProduct(params)),
    getDataCategory: (params) => dispatch(getDataCategory(params)),
    addProduct: (params) => dispatch(addProduct(params)),
    editProduct: (id, params) => dispatch(editProduct(id, params)),
    deleteProduct: (id) => dispatch(deleteProduct(id))
  };
}

const ProductPage = Form.create({ name: "add_product" })(Product);
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
