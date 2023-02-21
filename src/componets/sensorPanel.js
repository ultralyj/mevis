import {Button, Card, Col, Row, Radio, Divider, Select, Switch} from "antd";
import React, {useState} from "react";
import type { RadioChangeEvent } from 'antd';
import {RocketOutlined} from "@ant-design/icons";

const optionsWithDisabled = [
    { label: '默认输出', value: 'Apple' },
    { label: '事件驱动', value: 'Pear' },
    { label: '测试', value: 'Orange', disabled: true },
];

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

function SensorPanel(props) {
    const [value4, setValue4] = useState('Apple');

    const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio4 checked', value);
        setValue4(value);
    };
    return (
        <Card
            title={<div><RocketOutlined /> 传感器配置</div>}
            style={{ margin:4 }}
        >
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    输出模式
                </Col>
                <Col span={24}>
                    <Radio.Group
                        options={optionsWithDisabled}
                        onChange={onChange4}
                        value={value4}
                        optionType="button"
                        buttonStyle="solid"
                        size={"small"}
                    />
                </Col>
                <Divider style={{marginBottom: 0, marginTop: 0}}/>
                <Col span={10}>推理模型：</Col>
                <Col span={14}>
                    <Select
                        defaultValue="ReSkin"
                        style={{width: '100%'}}
                        onChange={handleChange}
                        options={[
                            { value: 'LSTM', label: 'LSTM'},
                            { value: 'CNN', label: 'CNN'},
                            { value: 'ReSkin', label: 'ReSkin'},
                        ]}
                    />
                </Col>
                <Col span={10}>推理使能：</Col>
                <Col span={14}>
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        defaultChecked
                        style={{float:"left"}}
                    />
                </Col>
            </Row>
        </Card>

    );
}

export default SensorPanel;