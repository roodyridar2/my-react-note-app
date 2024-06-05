import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Row, Select, Typography } from "antd";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import api from "../service/api";
import DOMPurify from "dompurify";

const { Title } = Typography;

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);

  const userId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/admin/userPosts/${userId}`);
        const user = await api.get(`/admin/user/${userId}`);
        setUser(user.data);
        setPosts(res.data);
        setFilteredPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [userId]);
  const onChange = (value) => {
    // filter base delete or not delete
    // -1 all posts
    // 0 active posts
    // 1 deleted posts
    if (value === "-1") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.deleted == value);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div>
      {/* show user name and email */}
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              marginLeft: "20px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <FaUser size={22} /> {user.username}
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                gap: "5px",
              }}
            >
              <MdEmail size={22} />
              {user.email}
            </div>
          </div>
          <Select
            // showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            style={{ width: 150, marginRight: "20px" }}
            defaultValue={"-1"}
            // filterOption={filterOption}
            options={[
              {
                label: "All Posts",
                value: "-1",
              },
              {
                label: "Active Posts",
                value: "0",
              },
              {
                label: "Deleted Posts",
                value: "1",
              },
            ]}
          />
        </div>
      </Card>

      <Row
        style={{
          padding: filteredPosts.length !== 0 ? "40px" : 0,
          marginBottom: filteredPosts.length !== 0 ? "60px" : 0,
        }}
      >
        {filteredPosts.length !== 0 ? (
          filteredPosts.map((post) => (
            <Col xs={24} sm={12} md={6} key={post.id}>
              <div style={{ margin: "10px" }}>
                <Link to={`/admin/single/${post.id}`}>
                  <Card
                    style={{ backgroundColor: post.deleted ? "#FF0000" : "" }}
                    cover={
                        <img
                          alt="example"
                          src={"http://localhost:8800/uploads/" + post.img}
                          height={200}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "200px",
                            borderRadius: "5px",
                          }}
                        />
                    }
                    hoverable
                  >
                    <Card.Meta
                      title={
                        <Link to={`/post/${post.id}`}>
                          <Title
                            level={4}
                            style={{ color: post.deleted ? "#F9F6EE" : "" }}
                          >
                            {post.title}
                          </Title>
                        </Link>
                      }
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          post.content.length > 90
                            ? post.content.substring(0, 90) + "..."
                            : post.content
                        ),
                      }}
                      style={{
                        margin: "10px 0",
                        color: post.deleted ? "#F9F6EE" : "",
                      }}
                    />
                    <Link
                      to={`/post/${post.id}`}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#4096ff",
                        borderRadius: "5px",
                      }}
                    ></Link>
                  </Card>
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",

              height: "70vh",
            }}
          >
            <Title level={2}>No Posts Found</Title>
          </div>
        )}
      </Row>
    </div>
  );
};

export default UserPosts;
