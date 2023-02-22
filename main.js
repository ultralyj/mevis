const { app, BrowserWindow, ipcMain} = require('electron');
const path = require("path");
const { serial, listSerialPorts, handleSerialOpen, handleRequestList} = require('./src/components/serial')
// 浏览器引用
require('./src/components/window')


// 创建浏览器窗口函数
let createWindow = () => {
    // 创建浏览器窗口
    // eslint-disable-next-line no-global-assign
    window = new BrowserWindow({
        width: 1200,
        height: 760,
        icon: path.join(__dirname, './src/res/mevis_icon.ico'),
        // 隐藏菜单栏
        autoHideMenuBar: true,
        // 禁用菜单缩放
        resizable: false,
        // 禁止上下文隔离
        contextIsolation: false,
        webPreferences:{
            preload:path.join(__dirname, 'src/preload.js')
        }
    });

    // 添加串口相关功能
    serial();
    // 加载进程间通信
    ipcMain.handle('serial:open', handleSerialOpen);
    ipcMain.handle('serial:request', handleRequestList);
    // 加载应用中的index.html文件
    // window.loadFile('./build/index.html/');
    window.loadURL('http://localhost:3000');

    // 打开调试工具
    window.webContents.openDevTools()

    // 加载完成触发事件，载入串口列表等数据
    window.webContents.on('did-finish-load', () => {
        listSerialPorts().then();
    })
    // 当window被关闭时，除掉window的引用
    window.on('closed', () => {
        // eslint-disable-next-line no-global-assign
        window = null;
    });
};

// 当app准备就绪时候开启窗口
app.on('ready', createWindow);

// 当全部窗口都被关闭之后退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 在macos上，单击dock图标并且没有其他窗口打开的时候，重新创建一个窗口
app.on('activate', () => {
    if (window == null) {
        createWindow();
    }
});