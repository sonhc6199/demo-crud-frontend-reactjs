import React, { Component } from "react";
import { PageHeader, Button, Icon, Modal, Table } from "antd";

export default class User extends Component {
  render() {
    const {
      columnUser,
      userList,
      modalTitle,
      visible,
      content,
      total,
      current,
      loading,
      handleChangeTable,
      handleOkModal,
      handleCancelModal,
      handleAddUser,
      limit
    } = this.props;
    return (
      <div className="UserComponent">
        <PageHeader
          title="User List"
          extra={[
            <Button key="add" type="primary" onClick={handleAddUser}>
              <Icon type="plus" /> Add user
            </Button>
          ]}
        />
        <Table
          columns={columnUser}
          dataSource={userList}
          onChange={handleChangeTable}
          pagination={{
            total,
            current,
            pageSize: limit
          }}
          loading={total == 0 ? true : loading}
          rowKey="_id"
        />
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={handleOkModal}
          onCancel={handleCancelModal}
          width="800px"
          okText="Submit"
        >
          {content}
        </Modal>
      </div>
    );
  }
}
