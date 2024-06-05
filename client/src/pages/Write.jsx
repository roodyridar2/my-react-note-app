import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Input,
  Upload,
  Button,
  Radio,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;
const { Title, Text } = Typography;

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState(state?.visibility || "private");
  const navigate = useNavigate();

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/uploads", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await uploadFile();
    const post = {
      title,
      content: value,
      img: imgUrl,
      visibility,
    };
    try {
      state
        ? await api.put(`/posts/${state.id}`, post)
        : await api.post("/posts", post);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Content
        style={{ padding: "20px", marginTop: "30px", marginBottom: "64px" }}
      >
        <Typography style={{ textAlign: "left", marginBottom:"30px" }}>
          <Title>{state ? "Update" : "Write"} Post</Title>
        </Typography>
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Write something amazing..."
                style={{ height: "200px" }}
              />
            </Space>
          </Col>
          <Col span={8}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Title level={4}>---#_#----@-@----*_*---</Title>
                <Text>
                  <b>Visibility: </b>
                  {visibility === "public" ? "Public" : "Private"}
                </Text>
                <Upload
                  beforeUpload={() => false}
                  onChange={(info) => setFile(info.file)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            
              <div>
                <Title level={4}>Visibility</Title>
                <Radio.Group
                  onChange={(e) => setVisibility(e.target.value)}
                  value={visibility}
                >
                  <Radio value="private">Private</Radio>
                  <Radio value="public">Public</Radio>
                </Radio.Group>
              </div>
              <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={{ marginTop: "10px" }}
                >
                  {state ? "Update" : "Publish"}
                </Button>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Write;
