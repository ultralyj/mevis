import {Button, Card, Col, Row, Descriptions, Divider, Select, Switch} from "antd";
import React, {useState, Component} from "react";
import { Line } from '@ant-design/charts';
import ScatterTactile from "./charts/scatterTactile";
import HeatmapNet from "./charts/heatmapNet";

function ChartsSet(props) {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };
    return (
        <Row gutter={[8,8]}>
            <Col span={12}>
                <Card bodyStyle={{height:"300px",paddingBottom:"24px"}}>
                    <div id={"chart1"} style={{height:"260px"}}>
                        <Line {...config} />
                    </div>
                </Card>
            </Col>
            <Col span={12}>
                <Card bodyStyle={{height:"300px",paddingBottom:"24px"}}>
                    <div id={"chart2"} style={{height:"260px"}}>
                        <ScatterTactile/>
                    </div>
                </Card>

            </Col>
            <Col span={12}>
                <Card bodyStyle={{height:"300px",paddingBottom:"24px"}}>
                    <div id={"chart1"} style={{height:"260px"}}>
                        <HeatmapNet/>
                    </div>
                </Card>
            </Col>
            <Col span={12}>
                <Card bodyStyle={{height:"300px",paddingBottom:"24px"}} cover={}>
                    <div id={"chart2"} style={{height:"260px"}}>
                        jhfjsdhfjdhkjdhsjk
                    </div>
                </Card>

            </Col>
        </Row>
    );
}

export default ChartsSet;