import { Layout, Typography } from 'antd';
// import Logo from "../img/logo.png";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center', height:"20vh"
      
     }}>
      <img src={"https://lezzoo.com/images/Group.png"} alt="logo" style={{ height: '40px' }} />
      <Text style={{ display: 'block', marginTop: '10px' }}>
         <b>We deliver</b>
      </Text>
    </AntFooter>
  );
};

export default Footer;
