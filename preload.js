const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  systemState: {
    async getSystemState() {
      let state = await ipcRenderer.invoke("getState");
      return state;
    },
  },
});
