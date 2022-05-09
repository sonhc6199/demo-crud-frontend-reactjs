import React from "react";
import { Layout, Menu, Button, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
const { SubMenu } = Menu;

class HeaderCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: window.location.pathname
    };
  }

  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Row>
          <Col span={20}>
            <div
              className="logo"
              style={{ float: "left", color: "#ffffff", marginRight: "50px" }}
            >
              FPT.WORK
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
            >
              <Menu.Item key="/">
                <Link to="/">
                  <Icon type="home" />
                  Trang chủ
                </Link>
              </Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <Icon type="setting" />
                    Cài đặt
                  </span>
                }
              >
                <Menu.ItemGroup title="Theme">
                  <Menu.Item key="setting:1">Dark</Menu.Item>
                  <Menu.Item key="setting:2">Light</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key="/test-page">
                <Link to="/test-page">
                  <Icon type="dashboard" /> TestPage
                </Link>
              </Menu.Item>
              <Menu.Item key="/customer">
                <Link to="/customer">
                  <Icon type="team" /> Customer
                </Link>
              </Menu.Item>
              <Menu.Item key="/users">
                <Link to="/users">
                  <Icon type="solution" /> Users
                </Link>
              </Menu.Item>
              <Menu.Item key="/categories">
                <Link to="/categories">
                  <Icon type="folder-open" /> Categories
                </Link>
              </Menu.Item>
              <Menu.Item key="/products">
                <Link to="/products">
                  <Icon type="shop" /> Products
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={2} offset={2}>
            <Button
              type="primary"
              icon="login"
              // onClick={this.enterIconLoading}
            >
              Đăng nhập
            </Button>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderCustom;
