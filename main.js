const { app, BrowserWindow} = require('electron');
const path = require("path");
// 浏览器引用
let window;

function serial(){

}
// 创建浏览器窗口函数
let createWindow = () => {
    console.log("Mevis")
    // 创建浏览器窗口
    window = new BrowserWindow({
        width: 1200,
        height: 760,
        icon: path.join(__dirname, './src/res/mevis_icon.ico'),
        // 隐藏菜单栏
        autoHideMenuBar: true,
        // 禁用菜单缩放
        resizable: false,
    });

    // 添加串口相关功能
    window.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {

        //Add listeners to handle ports being added or removed before the callback for `select-serial-port`
        //is called.
        window.webContents.session.on('serial-port-added', (event, port) => {
            console.log('serial-port-added FIRED WITH', port)
            //Optionally update portList to add the new port
        })

        window.webContents.session.on('serial-port-removed', (event, port) => {
            console.log('serial-port-removed FIRED WITH', port)
            //Optionally update portList to remove the port
        })

        event.preventDefault()
        if (portList && portList.length > 0) {
            callback(portList[0].portId)
        } else {
            console.log("Could not find any matching devices")
            callback('') //Could not find any matching devices
        }
    })

    window.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
        if (permission === 'serial' && details.securityOrigin === 'file:///') {
            return true
        }

        return false
    })

    window.webContents.session.setDevicePermissionHandler((details) => {
        if (details.deviceType === 'serial' && details.origin === 'file://') {
            return true
        }

        return false
    })

    // 加载应用中的index.html文件
    window.loadFile('./build/index.html/');

    window.webContents.openDevTools()
    // 当window被关闭时，除掉window的引用
    window.on('closed', () => {
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