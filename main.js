const {
	BrowserWindow,
	app,
	ipcMain,
	Notification,
	powerMonitor,
	Tray,
	systemPreferences,
} = require('electron')
const path = require('path')

const isDev = !app.isPackaged

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

	const tray = new Tray('./public/gamification/tray_icon.png')
	tray.setToolTip('Spineify')
	tray.on('click', () => {
		win.isVisible() ? win.hide() : win.show()
	})

	const success = await systemPreferences.askForMediaAccess('camera')
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
