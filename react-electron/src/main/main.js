/*
    main.js - 主进程
    使用 CommonJS 语法导入了两个 Electron 模块
    app，它控制您的应用的事件生命周期。
    BrowserWindow，它负责创建和管理应用的窗口。
    ipcMain 进程间通信
    dialog-  显示用于打开和保存文件、警报等的本机系统对话框。
    globalShortcut // 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。注意: 快捷方式是全局的; 即使应用程序没有键盘焦点, 它也仍然在持续监听键盘事件。 在 app 模块的 ready 事件就绪之前，这个模块不能使用。
    Menu //创建原生应用菜单和上下文菜单。

*/
const { app, BrowserWindow, ipcMain,dialog,globalShortcut } = require('electron')
/*
    electron-win-state
        保存窗口的状态 - 如 窗口大小 - 窗口在屏幕的x y 位置等
    注：electron-win-state 未给nodejs这一侧 做require的构造函数暴露 直接引入会报错 
    需要在require('electron-win-state')后加一个.default手动暴露构造函数拿electron-win-state 模块的类
    或者使用es6的 import 导入 如： import WinState from "electron-win-state"
*/
const WinState = require('electron-win-state').default
const path = require("path")
 // 引入模块
const url = require('url');
const IsDev = require("electron-is-dev")

let mainWindow;
console.log(__dirname)
const createWindow = () => {
    //  保存窗口的状态 
    const winState= new WinState({
        defaultWidth:800,
        defaultHeight:600,
    })
    mainWindow = new BrowserWindow({
        ...winState.winOptions,
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
        frame: false,//创建一个无边框窗口 默认值为 true。 false 无边框窗口 去除顶部菜单栏 缺点无法拖动窗口 并且无关闭窗口按钮 需自己写逻辑
        // parent:mainWindow,// 设置此窗口的父窗口 mainWindow 为 BrowserWindow 对象的变量
        // modal:true,// modal:true,设置此窗口的无法拖动 相当于模态窗口 mac window 上并没有此方法
        webPreferences: {
            webSecurity: false, // 使用electron开发本地应用build之后，加载从http:\\变为 file://xxx,需要设置成false
            //nodeIntegration:true, //是否使用nodejs集成
            //contextIsolation:false, //上下文隔离，设置false之后可以使用require
            // enableRemoteModule:true // 启用remote功能，启用之后可以在渲染进程中使用remote
            preload: path.join(__dirname, '../preload/preload.js')
        }
    })
    // 加载应用----react 打包
    mainWindow.loadURL(IsDev ? 'http://localhost:3000/' : url.format({
        pathname: path.join(__dirname, './build/index.html'),
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
    // 监听 页面 dom 加载完毕执行 (页面内的标签加载完毕 ，如img标签加载完 但引入的资源不管)
    mainWindow.webContents.on('dom-ready', (event) => {
        // console.log(event)
        console.log('dom-ready.')
    })
    // 监听 页面 是否打开新窗口
    mainWindow.webContents.on('new-window', (event) => {
        // console.log(event)
        console.log('new-window')
    })
     // 监听创建渲染进程全部加载完毕（含外部资源 如img 引入的外部图片资源）
     mainWindow.webContents.on('did-finish-load', (event) => {
        console.log('finish.')
        // //页面名
        // mainWindow.webContents.getTitle()
        // // 页面id
        // mainWidow.webContents.id
        // reload()重新加载
        // mainWidow.webContents.reload()
    })
    // 监测鼠标按下右键 可获取上下文信息 params
    mainWindow.webContents.on('context-menu', (event, params) => {
        console.log(params);
         //  mainWindow.webContents.executeJavaScript 往页面内注入js 例如-下例：鼠标按下右键弹出alert
         mainWindow.webContents.executeJavaScript(`alert('${'选择的文本：' + params.selectionText + '，url:' + params.pageURL}')`)

        // dialog 显示用于打开和保存文件、警报等的本机系统对话框。
        // showOpenDialog - 返回选择的文件 路径等
        //  dialog.showOpenDialog({
        //     title:'测试',//title string (可选) - 对话框窗口的标题
        //     /* filters: [] (可选)指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。
        //     filters:[ { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        //     { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        //     { name: 'Custom File Type', extensions: ['as'] },
        //     { name: 'All Files', extensions: ['*'] }],*/
        //     buttonLabel:'选择测试',//确认按钮的自定义标签, 当为空时, 将使用默认标签。 
        //     defaultPath:app.getPath('desktop'),//默认情况下 打开桌面文件夹 ，可以设置本地任意路径 也可以打开音乐文件夹 如 app.getPath('music') 
        //     // openFile-允许选择文件,  openDirectory-允许选择文件夹, multiSelections-是否可以选择多个文件, showHiddenFiles-显示对话框中的隐藏文件, createDirectory 仅macOS支持 -允许你通过对话框的形式创建新的目录。
        //     properties: ['openFile', 'multiSelections']  
        //  }).then((result)=>{
        //     // 点击确认按钮 回调打印 选择的文件
        //     console.log(result,result.filePaths)
        // })
        // showSaveDialog  保存 存储文件对本地
        // dialog.showSaveDialog({}).then((result)=>{
        //     console.log(result)
        // })

        // 系统 自带的弹窗口
        const answers=['Yes',"No","Maybe"]
        dialog.showMessageBox({
            title:'Message Box',
            message:'Message box 的内容',
            detail:'Message details 详情',
            buttons:answers,//buttons string[] (可选) - 按钮文本数组。 在 Windows上，一个空数组将导致按钮被标为“OK”。
        }).then(({response})=>{
            // 点击确认按钮 response返回选择的下标 通过answers[response] 下标得到选择
            console.log(`User selected: ${answers[response]}`)
        })
    })
    // did-finish-load 事件，无论网页加载成功或者失败都会调用
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('did-finish-load');
    })
    // did-fail-load在网页加载失败的时候调用，在这里我们可以重新加载网页，或者可以自定义错误404页面
    mainWindow.webContents.on('did-fail-load', () => {
        console.log('did-fail-load => 网页加载失败触发 => 调用reload重新加载网页');
        // 重新加载网页
        mainWindow.reload();
    })
    // 默认打开 调试器
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });


      // 安装node模块 electron-win-state  保存窗口的状态 （--save）
    // npm install --save electron-win-state  管理窗口（窗口的宽高 位置等）
    WinState.manage(mainWindow);

    // 注册创建快捷键 - globalShortcut.register
    /*
        globalShortcut.register(accelerator, callback) 
        accelerator 快捷键名 callback返回的回调函数
    */
    globalShortcut.register('G',()=>{
        console.log('创建快捷键=>Ctrl+G')
    })

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
        // BrowserWindow.getAllWindows() 获取当前打开的窗口数  如果窗口都关闭了 重新创建index 窗口
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
// 当所有的窗口都被关闭时触发。如果你没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序；但如果你监听了此事件，你可以控制是否退出程序。 如果用户按下了 Cmd + Q，或者开发者调用了 app.quit()，Electron 会首先关闭所有的窗口然后触发 will-quit 事件，在这种情况下 window-all-closed 事件不会被触发。
app.on('window-all-closed', function () {
    console.log('window-all-closed==>', '窗口全部关闭')
    // 对于 macOS 系统 关闭时不会直接退出应用，除非用户用 Cmd + Q 确定地退出，  app.quit()彻底关闭应用
    if (process.platform !== 'darwin') app.quit();
});

//生命周期 - 当所有窗口被关闭后触发，同时应用程序将退出。
// 注:在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。
app.on('will-quit', (e) => {
    console.log(globalShortcut)
    // 注销指定快捷键
    globalShortcut.unregister('CommandOrControl+G')

    // 注销所有快捷键
    globalShortcut.unregisterAll()
})