import React from "react";
// import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from "react-router-dom";
// add
import { Layout, BackTop } from "antd";
import HeaderCustom from "./Header/HeaderCustom";
import Home from "../pages/Home";
import TestPage from "../pages/TestPage";
import Customer from "../pages/Customer";
import User from "../pages/User";
import Category from "../pages/Category";
import Product from "../pages/Product";

const { Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  render() {
    return (
      <Layout className="layout">
        <HeaderCustom />
        <Layout
          style={{
            padding: "30px 50px 0 50px",
            marginTop: 64,
            minHeight: "calc(100vh - 64px - 67px)"
          }}
        >
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/test-page" component={TestPage} />
              <Route path="/customer" component={Customer} />
              <Route path="/users" component={User} />
              <Route path="/categories" component={Category} />
              <Route path="/products" component={Product} />
            </Switch>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>FPT Work ©2019</Footer>
        <BackTop />
      </Layout>
    );
  }
}

export default withRouter(App);
