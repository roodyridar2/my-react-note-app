import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Typography, Space, Table, Card } from "antd";
import api from "../service/api";

const { Title } = Typography;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link to={`/admin/user/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button danger type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button primary type="link">
            <Link to={`/admin/user/${record.id}`}>User Detail</Link>
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/admin/all-users`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (user) => {
    try {
      await api.delete(`/admin/delete-user/${user.id}`);
      const res = await api.get(`/admin/all-users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card>
        <Title level={2} style={{ textAlign: "left" }}>
          Users
        </Title>
        <Table
          columns={columns}
          dataSource={users}
          style={{
            height: users.length > 4 ? "100%" : "55vh",
          }}
        />
      </Card>
    </div>
  );
};

export default AllUsers;
