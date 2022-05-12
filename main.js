const {
	BrowserWindow,
	app,
	ipcMain,
	Notification,
	powerMonitor,
} = require('electron')
const path = require('path')
require('./server/app')

const isDev = !app.isPackaged

// app.on('ready', function() {
//   express();
//   mainWindow = new BrowserWindow({
//     width: 1280,
//     height: 720,
//     autoHideMenuBar: true,
//     useContentSize: true,
//     resizable: false,
//   });
//mainWindow.loadURL("http://localhost:5000/");
//   mainWindow.focus();

// });

function createWindow() {
	// express();
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		backgroundColor: 'white',
		webPreferences: {
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	// win.loadFile("./public/index.html");
	win.loadURL('http://localhost:8080/')
}

if (isDev) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
	})
}

ipcMain.on('notify', (_, message) => {
	new Notification({ title: 'Spineify', body: message }).show()
})

ipcMain.handle('getState', () => {
	console.log('icpMain')
	let state = powerMonitor.getSystemIdleState(2)
	console.log('state', state)
	return state
})

app.whenReady().then(createWindow)
