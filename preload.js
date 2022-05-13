const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
	notificationApi: {
		sendNotification(message) {
			ipcRenderer.send('notify', message)
		},
	},
	systemState: {
		async getSystemState() {
			let state = await ipcRenderer.invoke('getState')
			return state
		},
	},
})

// add ipcMain.handle to listen for the cron message
// also add another  ipcRenderer
//two context bridges - 1. to listen to cron message, 2. use sendNotification to send info/message back to front-end

//OR

//have a cron job in the server to update info for each user
