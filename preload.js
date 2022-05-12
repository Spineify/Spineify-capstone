const { ipcRenderer, contextBridge, powerMonitor } = require('electron')

contextBridge.exposeInMainWorld('electron', {
	notificationApi: {
		sendNotification(message) {
			ipcRenderer.send('notify', message)
		},
	},
	systemState: {
		async getSystemState() {
			console.log('hi')
			let state = await ipcRenderer.invoke('getState')
			console.log('state in contextbridge:', state)
			return state
			// let time = powerMonitor.getSystemIdleTime()
			// console.log('time:', time)
			// //returns active, idle, locked, or unknown
			// console.log('state in main.js', state)
			// return state
		},
	},
	// batteryApi: {},
	// filesApi: {},
})
