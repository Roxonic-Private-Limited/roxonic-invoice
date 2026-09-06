
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");

let win;
function createWindow(){
  win=new BrowserWindow({
    width:1500,height:950,minWidth:1100,minHeight:720,
    title:"Roxonic Invoice",backgroundColor:"#f5f7fb",icon:path.join(__dirname,"../build/icon.ico"),
    webPreferences:{preload:path.join(__dirname,"preload.js"),contextIsolation:true,nodeIntegration:false,sandbox:false}
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname,"../src/index.html"));
}

function safeFileName(s){
  return String(s||"Invoice").replace(/[<>:"/\\|?*\x00-\x1F]/g," ").replace(/\s+/g," ").trim().slice(0,120)||"Invoice";
}

async function exportInvoicePDF(payload){
  const pdfWin=new BrowserWindow({
    show:false,width:794,height:1123,
    webPreferences:{sandbox:true}
  });
  const cssPath=path.join(__dirname,"../src/style.css");
  const appCss=fs.readFileSync(cssPath,"utf8");
  const html=`<!doctype html><html><head><meta charset="utf-8">
  <style>${appCss}
  @page{size:A4;margin:0}
  html,body{margin:0!important;padding:0!important;background:#fff!important;width:210mm;min-height:297mm}
  .pdf-page{width:210mm;min-height:297mm;background:#fff;padding:13mm 14mm;overflow:hidden}
  .paper{width:100%!important;min-height:0!important;margin:0!important;padding:0!important;box-shadow:none!important;border:0!important;border-radius:0!important}
  .p-logo{width:55px!important;height:55px!important;max-width:55px!important;max-height:55px!important;object-fit:contain!important;display:block!important}
  .p-head{page-break-inside:avoid}.p-items{page-break-inside:auto}.totals{page-break-inside:avoid}.p-notes{page-break-inside:avoid}
  </style></head><body><div class="pdf-page"><div class="paper">${payload.invoiceHtml}</div></div></body></html>`;
  await pdfWin.loadURL("data:text/html;charset=utf-8,"+encodeURIComponent(html));
  await new Promise(r=>setTimeout(r,400));
  const pdf=await pdfWin.webContents.printToPDF({
    printBackground:true,
    pageSize:"A4",
    margins:{marginType:"none"},
    preferCSSPageSize:true
  });
  const defaultName=safeFileName(payload.customerName)+"_"+safeFileName(payload.invoiceNo)+".pdf";
  const result=await dialog.showSaveDialog(win,{
    title:"Download Invoice PDF",
    defaultPath:defaultName,
    filters:[{name:"PDF Document",extensions:["pdf"]}]
  });
  if(!result.canceled && result.filePath){
    fs.writeFileSync(result.filePath,pdf);
    pdfWin.close();
    return {ok:true,path:result.filePath};
  }
  pdfWin.close();
  return {ok:false,canceled:true};
}

app.whenReady().then(()=>{
  ipcMain.handle("print",async()=>{
    if(win) win.webContents.print({silent:false,printBackground:true,margins:{marginType:"none"}});
    return {ok:true};
  });
  ipcMain.handle("pdf",async(_,payload)=>exportInvoicePDF(payload));
  ipcMain.handle("open-external",async(_,url)=>{await shell.openExternal(url);return true});
  ipcMain.handle("choose-logo",async()=>{
    const r=await dialog.showOpenDialog(win,{title:"Choose Business Logo",properties:["openFile"],filters:[{name:"Images",extensions:["png","jpg","jpeg","webp","svg"]}]});
    if(r.canceled||!r.filePaths[0])return null;
    const file=r.filePaths[0],ext=path.extname(file).slice(1).toLowerCase(),mime=ext==="svg"?"image/svg+xml":`image/${ext==="jpg"?"jpeg":ext}`;
    return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
  });
  createWindow();
  app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});
