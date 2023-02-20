import React, {useState} from "react";
import { Breadcrumb, Layout, Menu, theme} from "antd";
import {
    AppstoreOutlined,
    LaptopOutlined,
    MailOutlined,
    NotificationOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import 'antd/dist/reset.css';
import "./index.css";
import SerialPanel from "./componets/serialPanel";
import SensorPanel from "./componets/sensorPanel";
import InfoPanel from "./componets/infoPanel";
import ChartsSet from "./componets/chartsSet";

const { Header, Content, Sider } = Layout;

const headerItems: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const items: MenuProps['items'] = [
    {
        label: '页面1',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: '页面2',
        key: 'app',
        icon: <AppstoreOutlined />,
    },
];
const App: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Layout>
            {/*顶部配置*/}
            <Header className="header">
                <div className="logo" />
            </Header>
            <Layout>
                <Sider width={260} style={{ background: colorBgContainer }}>
                    {/*串口配置卡片*/}
                    <SerialPanel/>
                    {/*传感器配置卡片*/}
                    <SensorPanel/>
                    {/*软件说明卡片*/}
                    <InfoPanel/>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            maxHeight: 640,
                            background: colorBgContainer,
                        }}
                    >
                        {/*图标组, based on echarts*/}
                        <ChartsSet/>
                    </Content>
                </Layout>
            </Layout>

        </Layout>
    );
};

export default App;