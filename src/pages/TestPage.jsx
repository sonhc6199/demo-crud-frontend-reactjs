import React from 'react';
import { Table, PageHeader } from 'antd';
import { connect } from 'react-redux';
import { getDataTest } from '../redux/actions/testAction';
import { columnTest } from '../common/columnTable';

class TestPage extends React.Component {
  componentDidMount () {
    this.props.getDataTest();
  }

  handleTableChange = (pagination, filters, sorter) => {
    console.log('handleTableChange: ', pagination, filters, sorter);
    this.props.getDataTest({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  render () {
    const { test } = this.props;
    // console.log('ctm: ', test);
    return (
      <div style={{ background: '#fff', padding: 24 }}>
        <PageHeader title="Lấy dữ liệu từ API bất kỳ"
        />
        <br/>
        <Table
          columns={columnTest}
          rowKey={record => record.login.uuid}
          dataSource={test.data}
          pagination={test.paginationTest}
          loading={test.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    test: state.test
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getDataTest: (params) => dispatch(getDataTest(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
