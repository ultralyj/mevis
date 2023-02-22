/**
 * @brief 串口配置面板
 * @author ultralyj(1951578@tongji.edu.cn)
 * @date 2023/2/19
 */

import {Button, Card, Col, Row, Select, Avatar, Divider} from "antd";
import React, {useState} from "react";
import {ApiOutlined, PoweroffOutlined, SearchOutlined} from "@ant-design/icons";
import sensorBoard from "../res/merci_sersorboardv1.0.png";
const { Meta } = Card;



async function testIt() {
    try {
        const port = await navigator.serial.requestPort();
        const portInfo = port.getInfo();
        console.log(`vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `)
    } catch (ex) {
        if (ex.name === 'NotFoundError') {
            console.log('Device NOT found')
        } else {
            console.log(ex)
        }
    }
}

class SerialPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            port:0,
            baud:115200,
            serialList:[{ value: '-1', label: '未搜索到端口', disabled: true }],
            serialCom:'未搜索到端口',
            opened:false,
            openButton:  '打开串口',
        };

    }
    componentDidMount() {
        /**
         * @brief 更新端口列表
         */
        window.electronAPI.onListSerial((_event, ports) => {
            if(ports.length>0){
                let comList = ports.map((item,index) => {
                    return Object.assign({},{'value':item.path,'label':item.friendlyName})
                })
                this.setState({serialList:comList});
                if(this.state.serialCom == '未搜索到端口'){
                    this.setState({serialCom:comList[0].value});
                    this.setState({port:comList[0].value});
                }
            }
            else {
                this.setState({serialList:[{ value: '-1', label: '未搜索到端口', disabled: true }]});
                this.setState({serialCom:'未搜索到端口'});
            }

        })
    }

    componentWillUnmount() {
    }

    render(){
        return(
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
                            defaultValue={this.state.serialList[0].value}
                            dropdownMatchSelectWidth={false}
                            style={{ width: '100%' }}
                            onChange={this.handlePortChange}
                            options={this.state.serialList}
                            value={this.state.serialCom}
                        />
                    </Col>
                    <Col span={10}>波特率：</Col>
                    <Col span={14}>
                        <Select
                            defaultValue="115200"
                            style={{width: '100%'}}
                            onChange={this.handleBaudChange}
                            options={[
                                { value: '9600', label: '9600'},
                                { value: '14400', label: '14400'},
                                { value: '19200', label: '19200'},
                                { value: '38400', label: '38400'},
                                { value: '115200', label: '115200'},
                                { value: '460800', label: '460800'},
                            ]}
                        />
                    </Col>
                    <Divider style={{marginBottom: 0, marginTop: 0}}/>
                    <Col span={10}>
                        <Button icon={<SearchOutlined />} onClick={() => window.electronAPI.requestList()}/>
                    </Col>
                    <Col span={14}>
                        <Button
                            id={"serial-open-button"}
                            type="primary"
                            block={true}
                            icon={<PoweroffOutlined />}
                            loading= {this.state.loading}
                            onClick={() => this.enterLoading(1)}

                        >
                            {this.state.openButton}
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    };

    async enterLoading(index: number)  {
        if(this.state.opened === false){
            // 关闭状态，开启串口
            if(this.state.serialCom !== '未搜索到端口'){
                let portInfo = {path:this.state.port,baud:this.state.baud};
                // 进入打开串口的加载状态
                this.setState({loading:true});
                await window.electronAPI.openSerial(portInfo)
                this.setState({loading:false});
                this.setState({openButton:'关闭串口'})
            }
        }

    }

    handlePortChange = (value: string) => {
        console.log(`port ${value}`);
        this.setState({port:parseInt(value)});
    };

    handleBaudChange = (value: string) => {
        console.log(`baud ${value}`);
        this.setState({baud:parseInt(value)});
    };
}


export default SerialPanel;