const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const windowOptions = {
  webPreferences: { // Configuramos características de nuestro navegador.
    nodeIntegration: false, // Impedimos el acceso directo a NodeJS / S.O.
    contextIsolation: true, // Para garantizar la separación entre interfáz y lógica interna de la app.
    enableRemoteModule: false, // Evitar que se acceda a módulos de main desde la interfaz.
    preload: path.join(__dirname, 'preload.js') // Cargar un script antes de iniciar la interfaz.
  }
}

app.on('ready', () => {
  const mainWindow = new BrowserWindow(windowOptions)

  mainWindow.loadURL(path.join('file://', __dirname, 'interface', 'index.html'))

  ipcMain.on('toMain', (_event, oper1, oper2) => {
    const suma = oper1 + oper2
    mainWindow.webContents.send('fromMain', suma)
  })
})
