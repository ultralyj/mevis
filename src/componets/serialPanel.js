/**
 * @brief 串口配置面板
 * @author ultralyj(1951578@tongji.edu.cn)
 * @date 2023/2/19
 */

import {Button, Card, Col, Row, Select, Avatar, Divider} from "antd";
import React, {useState} from "react";
import {ApiOutlined, PoweroffOutlined} from "@ant-design/icons";
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
        };
    }
    componentDidMount() {
        navigator.serial.getPorts().then((ports) => {
            console.log(ports)
            console.log(ports.length)
            if (this.port === null) {
                console.log("@")
                if (ports.length > 0) {
                    console.log(ports.length)
                }
                // 提示用户选择一个串口
                // this.port = await navigator.serial.requestPort()
                // this.open()
            }
        });


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
                            defaultValue="-1"
                            style={{ width: '100%' }}
                            onChange={this.handlePortChange}
                            options={[
                                { value: '-1', label: '未搜索到端口', disabled: true },
                            ]}
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
                    <Col span={10}/>
                    <Col span={14}>
                        <Button
                            id={"serial-open-button"}
                            type="primary"
                            block={true}
                            icon={<PoweroffOutlined />}
                            loading= {this.state.loading}
                            onClick={() => this.enterLoading(1)}

                        >
                            打开串口
                        </Button>
                    </Col>
                </Row>
            </Card>
        );
    };

    async enterLoading(index: number)  {
        let keepReading = true;
        let reader;
        let writer;
        this.setState({loading:true});
        try {
            const port = await navigator.serial.requestPort();
            const portInfo = port.getInfo();
            console.log(`vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `)
            await port.open({
                baudRate: this.state.baud,     // 波特率
                dataBits: 8,        // 每帧的数据位数(7或8)
                stopBits: 1,        // 停止位数(1或2)
                parity: 'none',     // 校验模式，可以是none，偶数，奇数
                flowControl: 'none' // 流控模式(none或hardware)。
            });
            keepReading = true;
            reader = port.readable.getReader();
            writer = port.writable.getWriter();
            const writeInt = setInterval(async () => {
                const commandframe = new Uint8Array([
                    0x00,
                    0xff /*...some bytes to be sent*/,
                ]);
                await writer.write(commandframe);
            }, 300);
        } catch (ex) {
            if (ex.name === 'NotFoundError') {
                console.log('Device NOT found')
            } else {
                console.log(ex)
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