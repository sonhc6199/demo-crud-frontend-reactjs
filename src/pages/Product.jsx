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
  deleteProduct,
  getDataCategory
} from "../redux/actions/productAction";
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
    deleteProduct(id, product.paginationProduct);
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
        title="B???ng danh m???c"
        extra={[
          <Button key="add" type="primary" onClick={handleAddRow}>
            <Icon type="plus" /> Th??m danh m???c
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
        title={method == "post" ? "Th??m danh m???c m???i" : "S???a danh m???c"}
        width={540}
        onClose={onClose}
        maskClosable={false}
        visible={visibleDrawer}
      >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col>
              <Form.Item label="H??nh ???nh">
                {getFieldDecorator("file", {
                  initialValue: uploadFile ? uploadFile : null,
                  rules: [
                    (rule, value, callback) => {
                      if (recordSeleted || value) {
                        return callback();
                      }
                      callback("Vui l??ng ch???n h??nh ???nh!");
                    }
                  ]
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    maxCount={1}
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
              <Form.Item label="T??n">
                {getFieldDecorator("name", {
                  initialValue: recordSeleted ? recordSeleted.name : null,
                  rules: [{ required: true, message: "H??y nh???p t??n s???n ph???m!" }]
                })(<Input placeholder="Nh???p t??n s???n ph???m" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Ch???n danh m???c">
                {getFieldDecorator("categoryId", {
                  initialValue: recordSeleted ? recordSeleted.categoryId : null,
                  rules: [{ required: true, message: "H??y nh???p t??n danh m???c!" }]
                })(
                  <Select
                    showSearch
                    placeholder="L???a ch???n danh m???c"
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
              <Form.Item label="Dung L?????ng">
                {getFieldDecorator("memory", {
                  initialValue: recordSeleted ? recordSeleted.memory : 64
                })(
                  <Select
                    showSearch
                    placeholder="L???a ch???n dung l?????ng"
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
              <Form.Item label="M??u s???c">
                {getFieldDecorator("color", {
                  initialValue: recordSeleted ? recordSeleted.color : "white"
                })(
                  <Select
                    showSearch
                    placeholder="L???a ch???n M??u s???c"
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
              <Form.Item label="Khuy???n m???i">
                {getFieldDecorator("salePercent", {
                  initialValue: recordSeleted ? recordSeleted.salePercent : 0,
                  rules: [
                    { required: true, message: "H??y nh???p khuy???n m???i!" },
                    (rule, value, callback) => {
                      if (value >= 0) {
                        return callback();
                      }
                      callback("Khuy???n m???i l?? m???t s??? l???n h??n ho???c b???ng 0!");
                    }
                  ]
                })(<Input placeholder="Nh???p khuy???n m???i" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="K??ch c??? m??n h??nh">
                {getFieldDecorator("screenSize", {
                  initialValue: recordSeleted ? recordSeleted.screenSize : 0,
                  rules: [
                    { required: true, message: "H??y nh???p k??ch c??? m??n h??nh!" },
                    (rule, value, callback) => {
                      if (value > 0) {
                        return callback();
                      }
                      callback("K??ch c??? m??n h??nh l?? m???t s??? l???n h??n 0!");
                    }
                  ]
                })(<Input placeholder="Nh???p k??ch c???" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Gi?? b??n">
                {getFieldDecorator("price", {
                  initialValue: recordSeleted ? recordSeleted.price : 0,
                  rules: [
                    { required: true, message: "H??y nh???p gi?? b??n!" },
                    (rule, value, callback) => {
                      if (value > 100000) {
                        return callback();
                      }
                      callback("Gi?? b??n l?? m???t s??? l???n h??n 100.000!");
                    }
                  ]
                })(<Input placeholder="Nh???p Gi?? b??n" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="S??? l?????ng">
                {getFieldDecorator("amount", {
                  initialValue: recordSeleted ? recordSeleted.amount : 0,
                  rules: [
                    { required: true, message: "H??y nh???p s??? l?????ng s???n ph???m!" },
                    (rule, value, callback) => {
                      if (value > 0) {
                        return callback();
                      }
                      callback("S??? l?????ng l?? m???t s??? l???n h??n 0");
                    }
                  ]
                })(<Input placeholder="Nh???p s??? l?????ng" />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="M?? t???">
                {getFieldDecorator("description", {
                  initialValue: recordSeleted
                    ? recordSeleted.description
                    : null,
                  rules: [
                    { required: true, message: "H??y nh???p m?? t??? s???n ph???m!" }
                  ]
                })(<TextArea rows={4} placeholder="Nh???p m?? t??? s???n ph???m" />)}
              </Form.Item>
            </Col>
          </Row>
          <div className="footer-drawer">
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              H???y
            </Button>
            <Button type="primary" htmlType="submit">
              L??u
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
    deleteProduct: (id, params) => dispatch(deleteProduct(id, params))
  };
}

const ProductPage = Form.create({ name: "add_product" })(Product);
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
