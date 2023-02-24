import {Button, Card, Col, Row, Descriptions, Divider, Select, Switch} from "antd";
import React, {useState, Component} from "react";
import { Line } from '@ant-design/charts';
import PlotTactile from "./charts/plotTactile";
import ScatterTactile from "./charts/scatterTactile";
import HeatmapNet from "./charts/heatmapNet";
import BoardGraph from "./charts/boardGraph";
function ChartsSet(props) {

    return (
        <Row gutter={[8,8]}>
            <Col span={12}>
                <Card bodyStyle={{height:"260px",paddingBottom:"24px"}}>
                    <div id={"chart1"} style={{height:"220px"}}>
                        <PlotTactile/>
                    </div>
                </Card>
            </Col>
            <Col span={12}>
                <Card bodyStyle={{height:"260px",paddingBottom:"24px"}}>
                    <div id={"chart2"} style={{height:"220px"}}>
                        <ScatterTactile/>
                    </div>
                </Card>

            </Col>
            <Col span={12}>
                <Card bodyStyle={{height:"260px",paddingBottom:"24px"}}>
                    <div id={"chart3"} style={{height:"220px"}}>
                        <HeatmapNet/>
                    </div>
                </Card>
            </Col>
            <Col span={12}>
                <Card bodyStyle={{height:"260px", paddingBottom:"24px",}} >
                    <div id={"chart4"} style={{height:"220px"}}>
                        <BoardGraph/>
                    </div>
                </Card>

            </Col>
        </Row>
    );
}

export default ChartsSet;