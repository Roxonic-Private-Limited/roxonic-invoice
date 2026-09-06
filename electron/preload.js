
const {contextBridge,ipcRenderer}=require("electron");
contextBridge.exposeInMainWorld("roxonic",{
 print:()=>ipcRenderer.invoke("print"),
 exportPDF:html=>ipcRenderer.invoke("pdf",html),
 openExternal:url=>ipcRenderer.invoke("open-external",url),
 chooseLogo:()=>ipcRenderer.invoke("choose-logo")
});
