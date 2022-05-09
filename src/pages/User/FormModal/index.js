import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "antd";

import FormModal from "./FormModal";
import { resetError } from "../../../redux/actions/userAction";

class FormModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      changePassword: false,
      isFetchingError: false,
      errors: {}
    };
  }

  render() {
    return <FormModal {...this._extract()} />;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isFetchingError) {
      return nextProps.isFetchingError;
    }
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.isFetchingError !== this.props.isFetchingError) {
      return true;
    }
    return null;
  }
  componentDidMount() {
    const { record, roles } = this.props;
    this.props.form.setFieldsValue({
      email: record.email || "",
      userName: record.userName || "",
      role: record.role ? record.role._id : roles[2]._id,
      name: record.name || "",
      phoneNumber: record.phoneNumber || "",
      id: record._id
    });
  }
  componentDidUpdate(prevProps, prevState, snap) {
    if (snap) {
      const { errors } = this.props;
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (errors && errors.fe) {
          for (const key in errors.fe) {
            if (errors.fe.hasOwnProperty(key)) {
              this.props.form.setFields({
                [key]: {
                  value: values[key],
                  errors: [new Error(errors.fe[key])]
                }
              });
            }
          }
        }
        this.props.resetError();
      });
    }
  }

  _handleValidatePassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  _handleComparePassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  _handleClickChangePassword = () => {
    this.setState({
      changePassword: !this.state.changePassword
    });

    this.props.form.setFields({
      password: {
        value: ""
      },
      confirmPassword: {
        value: ""
      }
    });
  };

  _extract = () => {
    return {
      getFieldDecorator: this.props.form.getFieldDecorator,
      setFields: this.props.form.setFields,
      isAddUser: this.props.isAddUser,
      roles: this.props.roles,
      errors: this.props.errors,
      handleValidatePassword: this._handleValidatePassword,
      handleClickChangePassword: this._handleClickChangePassword,
      handleComparePassword: this._handleComparePassword,
      ...this.state
    };
  };
}

const mapStateToProps = ({ user }) => ({
  errors: user.errors,
  roles: user.roles,
  isFetchingError: user.isFetchingError
});

const mapDispatchToProps = dispatch => ({
  resetError: () => dispatch(resetError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "add_user" })(FormModalContainer));
