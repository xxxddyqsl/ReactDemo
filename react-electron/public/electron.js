const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
  // 引入模块
  const url = require('url');
const IsDev = require("electron-is-dev")
let mainWindow;
console.log(__dirname)
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        /*
            解决页面白屏问题
            方式：1  show:false, + ready-to-show 事件
                show: false, 默认值为 true。  窗口是否在创建时显示。
                缺点：false创建时不显示 网速慢或下载资源慢时会较长时间看不到打开的应用 测试 如窗口打开github地址 mainWindow.loadURL('https://github.com');
                优点： false禁止页面在创建时显示 配合下方的 ready-to-show 事件页面资源下载完成后打开
        */
        show: false,
        /*
            解决页面白屏问题
            方式：2 设置 页面背景色 backgroundColor 属性
                对于一个复杂的应用，ready-to-show 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor
                请注意，即使对于使用 ready-to-show 事件的应用，仍建议 设置 backgroundColor，以使应用感觉更接近原生。
                backgroundColor: '#2e2c29',
        */
        // backgroundColor: '#2e2c29',
        resizable: true,//是否调整大小 最大化
        webPreferences: {
            webSecurity: false, // 使用electron开发本地应用build之后，加载从http:\\变为 file://xxx,需要设置成false
            //nodeIntegration:true, //是否使用nodejs集成
            //contextIsolation:false, //上下文隔离，设置false之后可以使用require
            // enableRemoteModule:true // 启用remote功能，启用之后可以在渲染进程中使用remote
            preload: path.join(__dirname, './preload.js')
        }
    })
    // 加载应用----react 打包 并且装载应用的index.html页面
       // 加载应用----react 打包
       mainWindow.loadURL(IsDev ? 'http://localhost:3000/' :url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
        }))

    // 加载应用----适用于 react 项目和开发阶段npm run electron
    // mainWindow.loadURL(IsDev ? 'http://localhost:3000/' : `file://${__dirname}/public/index.html`);

    // mainWindow.loadURL('https://github.com');

    // 解决页面白屏问题 -  show:false 窗口是否在创建时不显示。, + ready-to-show 事件
    mainWindow.once('ready-to-show', () => {
        // 页面资源 加载完后 显示该窗口
        mainWindow.show();
    })
    // did-finish-load 事件，无论网页加载成功或者失败都会调用
    mainWindow.webContents.on('did-finish-load',()=>{
        console.log('did-finish-load');
    })
    // did-fail-load在网页加载失败的时候调用，在这里我们可以重新加载网页，或者可以自定义错误404页面
    mainWindow.webContents.on('did-fail-load',()=>{
        console.log('did-fail-load => 网页加载失败触发 => 调用reload重新加载网页');
        // 重新加载网页
        mainWindow.reload();
    })
    // 默认打开 调试器
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// 应用生命周期 - 开始
app.whenReady().then(() => {
    /*
        主进程-收到渲染进程发送的消息
        方式1：使用 ipcMain.on 监听事件 -收到渲染进程发送的消息 并且给渲染进程发送回调 (  ipcMain.on 同步通信-  - 主进程->渲染进程 )
        方式2： 使用 ipcMain.handle (  ipcMain.handle 异步通信 - 主进程->渲染进程)
    */
    ipcMain.handle('some-name', async (event, someArgument) => {
        if (someArgument) return '主进程(handle事件)收到消息返回给===>' + someArgument;
    });
    ipcMain.on('some-name', async (event, ...args) => {
        if (args) return '主进程(on事件)收到消息返回给===>' + args;
    });

    // 默认创建窗口并设置宽高 默认打开
    createWindow()
    // 在 macOS 系统上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    app.on('activate', function () {
        // BrowserWindow.getAllWindows() 获取当前 窗口数  如果窗口都关闭了 重新创建index 窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    // console.log(app.getPath('desktop'))// 获取桌面路径
    // console.log(app.getPath('music'))// 获取音乐路径
    // console.log(app.getPath('temp'))// 获取临时文件夹路径
    // console.log(app.getPath('userData'))// 获取用户数据路径
})
//生命周期 - 窗口即将关闭之前触发
app.on('before-quit', (e) => {
    // console.log('窗口即将关闭之前触发:APP is quiting');
});
//生命周期 - 窗口失去焦点触发
app.on('browser-window-blur', (e) => {
    console.log('窗口失去焦点触发:APP is browser-window-blur');
    // 失去焦点3秒之后关闭窗口
    setTimeout(() => {
        // app.quit();
    }, 3000);
});
//生命周期 - 窗口获得焦点触发
app.on('browser-window-focus', (e) => {
    console.log('窗口获得焦点触发:APP is browser-window-focus');
});

//生命周期 -  监听窗口全部关闭的事件 当所有的窗口都被关闭时触发
app.on('window-all-closed', function () {
    console.log('window-all-closed==>', '窗口全部关闭')
    // 对于 macOS 系统 关闭时不会直接退出应用，除非用户用 Cmd + Q 确定地退出，  app.quit()彻底关闭应用
    if (process.platform !== 'darwin') app.quit();
});