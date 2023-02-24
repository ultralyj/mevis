import {Button, Card, Col, Row, Descriptions, Divider, Select, Switch, Collapse} from "antd";
import React, {useState} from "react";
import {CodeOutlined} from "@ant-design/icons";
const { Panel } = Collapse;

function InfoPanel(props) {

    return (
        <Collapse style={{margin:4}}>
            <Panel header={<div><CodeOutlined /> 关于 Mevis</div>} key="1">
                <Descriptions
                    size={"small"}
                >
                    <Descriptions.Item label="版本" span={1}>0.1</Descriptions.Item>
                    <Descriptions.Item label="作者" span={2}>ultralyj</Descriptions.Item>
                    <Descriptions.Item label="简介" span={3}>磁触觉传感器上位机框架</Descriptions.Item>

                </Descriptions>
            </Panel>
        </Collapse>

    );
}

export default InfoPanel;