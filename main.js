const {
	BrowserWindow,
	app,
	ipcMain,
	Notification,
	powerMonitor,
	systemPreferences,
} = require('electron')
const path = require('path')

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

async function createWindow() {
	// express();
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		backgroundColor: 'white',
		webPreferences: {
			nodeIntegration: true,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	})

	// win.loadFile("./public/index.html");
	win.loadURL(
		isDev ? 'http://localhost:8080/' : 'https://spineify.herokuapp.com/'
	)

	const success = await systemPreferences.askForMediaAccess('camera')
	console.log('media access:', success)
}

if (isDev) {
	require('electron-reload')(__dirname, {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
	})
}

ipcMain.on('notify', (_, message) => {
	new Notification({ title: 'Notification', body: message }).show()
})

ipcMain.handle('getState', () => {
	let state = powerMonitor.getSystemIdleState(2)
	return state
})

app.whenReady().then(createWindow)

//set up cron and ipcRenderer in main
//cron to send message to bridge
