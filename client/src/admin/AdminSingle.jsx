import {  useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../service/api";
import moment from "moment";
import DOMPurify from "dompurify";
import { Typography, Avatar } from "antd";

const { Title, Text } = Typography;

const AdminSingle = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/admin/userPost/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {post.img && (
        <img
          src={"http://localhost:8800/uploads/" + post.img}
          alt="post"
          style={{
            objectFit: "cover",
            width: "98%",
            height: "300px",
            borderRadius: "5px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        />
      )}
      <div style={{ padding: "10px", width: "98%", marginBottom: "50px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {post.userImg && (
            <Avatar
              src={post.userImg}
              size="large"
              style={{ marginRight: "10px" }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "ventricle",
              gap: "100px",
            }}
          >
            <div>
              <Text>{post.username}</Text>
              <Text type="secondary" style={{ display: "block" }}>
                Posted {moment(post.created_at).fromNow()}
              </Text>
            </div>
           
          </div>
        </div>

        <Title level={2}>{post.title}</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      </div>
    </div>
  );
};

export default AdminSingle;
