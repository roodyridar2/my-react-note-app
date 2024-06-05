import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../service/api";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { Typography, Avatar } from "antd";
import { MdDelete, MdModeEdit } from "react-icons/md";

const { Title, Text } = Typography;

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

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
            {currentUser?.username === post.username && (
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to={`/write?edit=${postId}`} state={post}>
                  <MdModeEdit size={22} color="#001529" />
                </Link>
                <MdDelete onClick={handleDelete} size={22} color="red" />
              </div>
            )}
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

export default Single;
