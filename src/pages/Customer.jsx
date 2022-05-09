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
  DatePicker,
  Icon,
  Tag,
  Popconfirm
} from "antd";
import { connect } from "react-redux";
import {
  getDataCustomer,
  addCustomer,
  deleteCustomer
} from "../redux/actions/customerAction";
import moment from "moment";
const { Option } = Select;
const ButtonGroup = Button.Group;

class Customer extends React.Component {
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
        title: "Gender",
        dataIndex: "gender",
        render: gender => {
          if (gender === "female") {
            return (
              <Tag color="#5CD8B4">
                {" "}
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Tag>
            );
          } else {
            // male
            return (
              <Tag color="#DE5BAB">
                {" "}
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Tag>
            );
          }
        },
        width: "10%"
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%"
      },
      {
        title: "Phone",
        dataIndex: "phone",
        width: "10%"
      },
      {
        title: "Service rent",
        dataIndex: "serviceRent",
        render: serviceRent => {
          switch (serviceRent) {
            case "office":
              return "Office";
            case "hr":
              return "HR";
            case "booking":
              return "Booking";
            case "wiki":
              return "Wiki";
            default:
              return serviceRent;
          }
        },
        width: "10%"
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        render: date => {
          return moment(date).format("DD-MM-YYYY HH:mm:ss");
        },
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
    this.props.getDataCustomer();
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
    this.props.getDataCustomer({
      pageSize: pagination.pageSize,
      pageCurrent: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
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
    const { getFieldDecorator } = this.props.form;
    const { customer } = this.props;
    // console.log('ctm: ', customer);
    return (
      <div style={{ background: "#fff", padding: 24 }}>
        <PageHeader
          title="Bảng khách hàng"
          extra={[
            <Button key="add" type="primary" onClick={this.showDrawer}>
              <Icon type="plus" /> Thêm khách hàng
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
          title="Thêm khách hàng mới"
          width={720}
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visibleDrawer}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tên">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Hãy nhập tên khách hàng!" }
                    ]
                  })(<Input placeholder="Nhập tên khách hàng" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "Không đúng định dạng Email !"
                      },
                      { required: true, message: "Nhập email khách hàng !" }
                    ]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      addonBefore="http://"
                      placeholder="Nhập email ở đây"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Giới tính">
                  {getFieldDecorator("gender", {
                    rules: [{ required: true, message: "Hãy chọn giới tính" }]
                  })(
                    <Select placeholder="Chọn giới tính">
                      <Option value="female">Nam</Option>
                      <Option value="male">Nữ</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại">
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "Hãy nhập số điện thoại khách hàng"
                      }
                    ]
                  })(<Input placeholder="Nhập số điện thoại khách hàng" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thuê dịch vụ">
                  {getFieldDecorator("service", {
                    rules: [
                      { required: true, message: "Chọn gói dich vụ thuê" }
                    ]
                  })(
                    <Select placeholder="Chọn gói dịch vụ thuê">
                      <Option value="office">Office</Option>
                      <Option value="booking">Booking</Option>
                      <Option value="wiki">Wiki</Option>
                      <Option value="HR">HR</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Đăng ký">
                  {getFieldDecorator("dateTime", {
                    rules: [
                      { required: false, message: "Chọn khoảng thời gian thuê" }
                    ]
                  })(
                    <DatePicker.RangePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Mô tả">
                  {getFieldDecorator("description", {
                    rules: [
                      { required: false, message: "Mô tả thêm về khách hàng" }
                    ]
                  })(
                    <Input.TextArea
                      rows={4}
                      placeholder="Mô tả thêm về khách hàng"
                    />
                  )}
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
    getDataCustomer: params => dispatch(getDataCustomer(params)),
    addCustomer: params => dispatch(addCustomer(params)),
    deleteCustomer: id => dispatch(deleteCustomer(id))
  };
}

const CustomerPage = Form.create({ name: "add_customer" })(Customer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerPage);
