import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import api from "../service/api";
import DOMPurify from "dompurify";

const { Title } = Typography;

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Row
        style={{
          padding: posts.length !== 0 ? "40px" : 0,
          marginBottom: posts.length !== 0 ? "60px" : 0,
        }}
      >
        {posts.length !== 0 ? (
          posts.map((post) => (
            <Col xs={24} sm={12} md={6} key={post.id}>
              <div style={{ margin: "10px" }}>
                <Card
                  cover={
                    <Link to={`/post/${post.id}`}>
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
                    </Link>
                  }
                  hoverable
                >
                  <Card.Meta
                    title={
                      <Link to={`/post/${post.id}`}>
                        <Title level={4}>{post.title}</Title>
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
                    style={{ margin: "10px 0" }}
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

export default Home;

{
  /* <Card
hoverable
style={cardStyle}
styles={{
  body: {
    padding: 0,
    overflow: "hidden",
  },
}}
>
<Flex justify="space-between">
  <img alt="avatar" src={post.img} style={imgStyle} />
  <Flex
    vertical
    align="flex-end"
    justify="space-between"
    style={{
      padding: 32,
    }}
  >
    <div>
      <Link to={`/post/${post.id}`}>
        <Title  level={4}>{post.title}</Title>
      </Link>
      <Typography.Title level={5}>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              post.content.length > 100
                ? post.content.substring(0, 100) + "..."
                : post.content
            ),
          }}
          style={{ margin: "10px 0" }}
        />
      </Typography.Title>
    </div>
    <Button
      type="primary"
      href="https://ant.design"
      target="_blank"
    >
      Get Started
    </Button>
  </Flex>
</Flex>
</Card> */
}
