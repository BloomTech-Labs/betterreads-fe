import React from 'react';
// Ant Design
import { Layout, Menu, Typography, Row, Col } from 'antd';
// Ant Design Icons
import {
  ExperimentOutlined,
  HddOutlined,
  LayoutOutlined,
} from '@ant-design/icons';
// Utils
import history from '../../utils/history';
// Image
import banner from '../../img/book-banner.jpg';
// Axios
import axios from 'axios';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const LandingPage = () => {
  const [stats, setStats] = React.useState({
    message: '',
    toBeRead: 0,
    inProgress: 0,
    completed: 0,
  });

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <Header
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: 48,
        }}
      >
        <Title style={{ color: '#D44808' }}>Readrr</Title>
        <Menu
          style={{ position: 'fixed', right: 0, top: 0 }}
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={['0']}
        >
          <Menu.Item key='0' onClick={(_e) => history.push('/landing')}>
            Why Readrr?
          </Menu.Item>
          <Menu.Item key='1' onClick={(_e) => history.push('/signin')}>
            Login
          </Menu.Item>
          <Menu.Item key='2' onClick={(_e) => history.push('/signup')}>
            Signup
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ backgroundColor: 'white' }}>
        <Row style={{ textAlign: 'center' }}>
          <Col span={1}></Col>
          <Col span={6} style={{ paddingTop: '20vh' }}>
            <Title>A Platform for Readers</Title>
            <Text style={{ fontSize: 21 }}>
              Whether you are looking to further your reading habits, or build
              upon an existing habit, the right technolgy can make all the
              difference. At Readrr we combine in-depth data science with a
              friendly, easy to navigate application to provide a robust, never
              before seen experience!
            </Text>
          </Col>
          <Col span={1}></Col>
          <Col
            span={16}
            style={{
              backgroundImage: `url(${banner})`,
              height: '60vh',
              borderRadius: 10,
            }}
          ></Col>
        </Row>
        <Row style={{ paddingTop: 40 }}>
          <Col span={8} style={{ textAlign: 'center', padding: 20 }}>
            <HddOutlined style={{ fontSize: 42, color: '#D44808' }} />
            <Title level={3}>Endless Library</Title>
            <Text style={{ fontSize: 21 }}>
              With our library of over 100,000 books we feel you will be able to
              find everything you are looking for! Future updates will aim to
              provide a even more diverse selection of books!
            </Text>
          </Col>
          <Col span={8} style={{ textAlign: 'center', padding: 20 }}>
            <ExperimentOutlined style={{ fontSize: 42, color: '#D44808' }} />
            <Title level={3}>Tailored Recommendations</Title>
            <Text style={{ fontSize: 21 }}>
              Our recommendation engine is the heart of our application. The
              main goal is to assist in expanding your libraries by providing
              useful and insightful recommendations.
            </Text>
          </Col>
          <Col span={8} style={{ textAlign: 'center', padding: 20 }}>
            <LayoutOutlined style={{ fontSize: 42, color: '#D44808' }} />
            <Title level={3}>Custom Libraries</Title>
            <Text style={{ fontSize: 21 }}>
              With custom shelves, and user libraries you have the power to
              curate your personalized selection of books in a way you feel
              relevant while also receiving custom recommendations.
            </Text>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LandingPage;
