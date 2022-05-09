import { Tag, Divider, Popconfirm, Icon } from "antd";
import React from "react";
import moment from "moment";

export const columnTest = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: "30%"
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" }
    ],
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
  }
];

export const columnCustomer = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: name => name.charAt(0).toUpperCase() + name.slice(1),
    width: "20%"
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
    width: "20%"
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    render: date => {
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
    },
    width: "20%"
  }
];

export const columnUser = [
  {
    title: "STT",
    key: "stt",
    dataIndex: "stt",
    render: (text, record, index) => {
      var stt = record.current * record.limit - record.limit + 1;
      return index + stt;
    }
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    editable: true,
    sorter: true
    // sorter: (a, b) => {
    //   if (a.email > b.email) {
    //     return 1;
    //   }
    //   if (a.email < b.email) {
    //     return -1;
    //   }
    //   return 0;
    // },
    // sortDirections: ["descend", "ascend"]
  },
  {
    title: "User name",
    dataIndex: "userName",
    key: "userName",
    editable: true,
    sorter: true

    // sorter: (a, b) => {
    //   if (a.userName > b.userName) {
    //     return 1;
    //   }
    //   if (a.userName < b.userName) {
    //     return -1;
    //   }
    //   return 0;
    // },
    // sortDirections: ["descend", "ascend"]
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    editable: true,
    sorter: true

    // sorter: (a, b) => {
    //   if (a.name > b.name) {
    //     return 1;
    //   }
    //   if (a.name < b.name) {
    //     return -1;
    //   }
    //   return 0;
    // },
    // sortDirections: ["descend", "ascend"]
  },
  {
    title: "Phone number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    editable: true,
    sorter: true

    // sorter: (a, b) => {
    //   a = parseInt(a.phoneNumber);
    //   b = parseInt(b.phoneNumber);

    //   if (a > b) {
    //     return 1;
    //   }
    //   if (a < b) {
    //     return -1;
    //   }
    //   return 0;
    // },
    // sortDirections: ["descend", "ascend"]
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: roles => {
      let color;
      if (roles.roleName == "administrator") {
        color = "red";
      } else if (roles.roleName == "manager") {
        color = "green";
      } else {
        color = "blue";
      }
      return (
        <Tag color={color} key={roles.roleName}>
          {roles.roleName.toUpperCase()}
        </Tag>
      );
    },
    sorter: true

    // sorter: (a, b) => {
    //   if (a.role.roleName > b.role.roleName) {
    //     return 1;
    //   }
    //   if (a.role.roleName < b.role.roleName) {
    //     return -1;
    //   }
    //   return 0;
    // },
    // sortDirections: ["descend", "ascend"]
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: date => {
      return moment(date).format("DD-MM-YYYY HH:mm:ss");
    },
    sorter: true

    // sorter: (a, b) => {
    //   if (moment(a.createdAt).valueOf() > moment(b.createdAt).valueOf()) {
    //     return 1;
    //   }
    //   if (moment(a.createdAt).valueOf() < moment(b.createdAt).valueOf()) {
    //     return -1;
    //   }
    //   return 0;
    // }
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => {
      return (
        <span>
          <a href="#">
            <Icon
              type="edit"
              style={{ color: "#ffa940" }}
              onClick={record.handleEditUser}
            />
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={record.handleDelete}
          >
            <a href="#">
              <Icon type="delete" style={{ color: "#f5222d" }} />
            </a>
          </Popconfirm>
        </span>
      );
    }
  }
];
