import React, { Component } from "react";
import { Form, Input, Row, Col, Select, Checkbox } from "antd";
const { Option } = Select;
export default class FormModal extends Component {
  render() {
    const {
      getFieldDecorator,
      handleClickChangePassword,
      handleValidatePassword,
      handleComparePassword,
      changePassword,
      isAddUser,
      roles
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col>
            <Form.Item label="Email">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: (
                      <span style={{ color: "red" }}>
                        The input your Email!
                      </span>
                    )
                  },
                  {
                    required: true,
                    message: (
                      <span style={{ color: "red" }}>
                        Please input your Email!
                      </span>
                    ),
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Enter your email" />)}
            </Form.Item>
          </Col>

          {!isAddUser ? (
            <Col>
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator("checkBox", {
                  valuePropName: "checked",
                  initialValue: false
                })(
                  <Checkbox onClick={handleClickChangePassword} name="checkBox">
                    Change Password
                  </Checkbox>
                )}
              </Form.Item>
            </Col>
          ) : (
            ""
          )}
          <Col span={12}>
            <Form.Item label="Password">
              {getFieldDecorator(
                "password",
                changePassword || isAddUser
                  ? {
                      rules: [
                        {
                          required: true,
                          message: (
                            <span style={{ color: "red" }}>
                              Please input your password!
                            </span>
                          ),
                          whitespace: true
                        },
                        {
                          validator: handleValidatePassword
                        }
                      ]
                    }
                  : {}
              )(
                <Input.Password
                  placeholder="Enter your password!"
                  disabled={!isAddUser ? !changePassword : changePassword}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Confirm Password">
              {getFieldDecorator(
                "confirmPassword",
                changePassword || isAddUser
                  ? {
                      rules: [
                        {
                          required: true,
                          message: (
                            <span style={{ color: "red" }}>
                              Please confirm your password!
                            </span>
                          )
                        },
                        {
                          validator: handleComparePassword
                        }
                      ]
                    }
                  : {}
              )(
                <Input.Password
                  placeholder="Please confirm your password!"
                  disabled={!isAddUser ? !changePassword : changePassword}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="User name">
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "Please input your uername!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Enter your userame" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Role">
              {getFieldDecorator("role", {
                // initialValue: "User",
                rules: [
                  {
                    required: true,
                    message: "Please input your role!"
                  }
                ]
              })(
                <Select placeholder="Please choose your role">
                  {roles.map((item, key) => {
                    return (
                      <Option value={item._id} key={key}>
                        {item.roleName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!"
                  }
                ]
              })(<Input placeholder="Enter your name" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone number">
              {getFieldDecorator("phoneNumber", {
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Enter your phone number" />)}
            </Form.Item>
          </Col>
          {!isAddUser ? (
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("id", {})(<Input type="hidden" />)}
              </Form.Item>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Form>
    );
  }
}
