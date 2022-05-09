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
  addCustomer,
  deleteCustomer
} from "../redux/actions/categoryAction";
import moment from "moment";
const { Option } = Select;
const ButtonGroup = Button.Group;

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDrawer: false
    };
    this.columnCustomer = [
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
        render: name => name.charAt(0).toUpperCase() + name.slice(1),
        width: "15%"
      },
     
      {
        title: "Action",
        dataIndex: "operation",
        render: (text, record) => {
          return (
            <div>
              <Button onClick={() => this.handleEditRow(record)}>
                <Icon type="edit" theme="twoTone" />
              </Button>
              <Popconfirm
                title="Sure to remove row?"
                onConfirm={() => this.handleRemoveRow(record._id)}
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
  }

  componentDidMount() {
    this.props.getDataCategory();
  }

  showDrawer = () => {
    this.setState({
      visibleDrawer: true
    });
  };

  handleEditRow = record => {
    console.log("edit record ", record);
    this.showDrawer();
  };

  handleRemoveRow = id => {
    console.log("remove ", id);
    this.props.deleteCustomer(id);
  };

  onClose = () => {
    this.setState({
      visibleDrawer: false
    });
    this.handleReset();
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log("handleTableChange: ", pagination, filters, sorter);
    this.props.getDataCategory();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // send data
        this.props.addCustomer(values);
        this.onClose();
      } else {
        console.log("error: ", err);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields(); // clear All data in form
  };

  render() {
    console.log("this.props: ",this.props)
    const { getFieldDecorator } = this.props.form;
    const { customer } = this.props;

    console.log('ctm: ', customer);
    return (
      <div style={{ background: "#fff", padding: 24 }}>
        <PageHeader
          title="Bảng danh mục"
          extra={[
            <Button key="add" type="primary" onClick={this.showDrawer}>
              <Icon type="plus" /> Thêm danh mục
            </Button>
          ]}
        />
        <br />
        <Table
          columns={this.columnCustomer}
          rowKey={record => record._id}
          dataSource={customer.data}
          pagination={customer.paginationCustomer}
          loading={customer.loading}
          onChange={this.handleTableChange}
        />
        <Drawer
          title="Thêm danh mục mới"
          width={540}
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visibleDrawer}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col>
                <Form.Item label="Tên">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Hãy nhập tên danh mục!" }
                    ]
                  })(<Input placeholder="Nhập tên danh mục" />)}
                </Form.Item>
              </Col>
            </Row>
            <div className="footer-drawer">
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
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
  }
}

function mapStateToProps(state) {
  return {
    customer: state.customer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataCategory: params => dispatch(getDataCategory(params)),
    addCustomer: params => dispatch(addCustomer(params)),
    deleteCustomer: id => dispatch(deleteCustomer(id))
  };
}

const CategoryPage = Form.create({ name: "add_customer" })(Category);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPage);
