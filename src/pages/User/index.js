import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addUser,
  getUserList,
  getRoleList,
  editUser,
  deleteUser
} from "../../redux/actions/userAction";
import { columnUser } from "../../common/columnTable";
import User from "./User";
import FormModal from "./FormModal";

class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmDirty: false,
      changePassword: false,
      // statusUser: false,
      content: null,
      modalTitle: "Add new user",
      submitModal: false
    };
  }

  render() {
    return <User {...this._extract()} />;
  }

  componentDidMount() {
    this.props.getRoleList();
    this.props.getUserList({});
  }

  _extract = () => {
    return {
      columnUser,
      userList: this._mapUserList(),
      total: this.props.total,
      loading: this.props.loading,
      current: this.props.current,
      limit: this.props.limit,
      handleChangeTable: this._handleChangeTable,
      handleOkModal: this._handleOkModal,
      handleCancelModal: this._handleCancelModal,
      handleAddUser: this._handleAddUser,
      ...this.state
    };
  };

  _handleChangeTable = (pagination, filters, sorter) => {
    this.props.getUserList({
      pageCurrent: pagination.current,
      order: sorter.order,
      field: sorter.field
    });
  };
  _handleOkModal = () => {
    const { form, isAddUser } = this.refForm.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (isAddUser) {
          return this.props.addUser(values, () => {
            this.setState({
              visible: false,
              content: null
            });
          });
        }
        return this.props.editUser(values, () => {
          this.setState({
            visible: false,
            content: null
          });
        });
      } else {
      }
    });
  };
  _handleCancelModal = () => {
    this.setState({
      visible: false,
      content: null,
      modalTitle: "Add new user"
    });
  };
  _handleEditUser = record => {
    this.setState({
      // statusUser: true,
      changePassword: false,
      modalTitle: "Edit User"
    });

    this._showModal(
      <FormModal
        wrappedComponentRef={form => (this.refForm = form)}
        record={record}
      />
    );
  };
  _handleDeleteUser = id => {
    const { userList, current } = this.props;
    const length = userList.length;

    this.props.deleteUser({
      id,
      params: { pageCurrent: length === 1 ? current - 1 : current }
    });
  };
  _handleAddUser = () => {
    this._showModal(
      <FormModal
        record={{}}
        isAddUser={true}
        wrappedComponentRef={form => (this.refForm = form)}
      />
    );
  };
  _showModal = content => {
    this.setState({
      visible: true,
      content
    });
  };
  _mapUserList = () => {
    const { userList, current, limit } = this.props;
    return userList.map((item, index) => {
      return Object.assign({}, item, {
        handleEditUser: () => {
          this._handleEditUser(item);
        },
        handleDelete: () => {
          this._handleDeleteUser(item._id);
        },
        current,
        limit
        // stt: current * limit + (index + 1) - limit
      });
    });
  };
}

function mapStateToProps({ user }) {
  return { ...user };
}

function mapDispatchToProps(dispatch) {
  return {
    editUser: (params, cb) => dispatch(editUser(params, cb)),
    addUser: (params, cb) => dispatch(addUser(params, cb)),
    getRoleList: () => dispatch(getRoleList()),
    getUserList: params => dispatch(getUserList(params)),
    deleteUser: id => dispatch(deleteUser(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
