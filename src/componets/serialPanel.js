/**
 * @brief 串口配置面板
 * @author ultralyj(1951578@tongji.edu.cn)
 * @date 2023/2/19
 */

import {Button, Card, Col, Row, Select, Avatar, Divider} from "antd";
import React, {useState} from "react";
import App from "../layout";
import {ApiOutlined, PoweroffOutlined} from "@ant-design/icons";
const { Meta } = Card;

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};



function SerialPanel(props) {

    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    return (
        <Card
            title= {<div><ApiOutlined /> 串口配置</div>}
            extra = {<a href="#">高级</a>}
            style = {{ margin:4 }}
            headStyle = {{backgroundColor:'#f0f0fe', verticalAlign:"middle"}}
        >

            <Row gutter={[8, 8]}>
                <Col span={10}>端口：</Col>
                <Col span={14}>
                    <Select
                        defaultValue="-1"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={[
                            { value: '-1', label: '未搜索到端口', disabled: true },
                        ]}
                    />
                </Col>
                <Col span={10}>波特率：</Col>
                <Col span={14}>
                    <Select
                        defaultValue="9600"
                        style={{width: '100%'}}
                        onChange={handleChange}
                        options={[
                            { value: '9600', label: '9600'},
                            { value: '115200', label: '115200'},
                        ]}
                    />
                </Col>
                <Divider style={{marginBottom: 0, marginTop: 0}}/>
                <Col span={10}/>
                <Col span={14}>
                    <Button
                        type="primary"
                        block={true}
                        icon={<PoweroffOutlined />}
                        loading={loadings[1]}
                        onClick={() => enterLoading(1)}

                    >
                        打开串口
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default SerialPanel;