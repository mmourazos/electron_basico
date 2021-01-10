// En este script estableceremos las funciones (con acceso al S.O. vía NodeJS) a
// las que tendrá acceso nuestra interfaz (proceso del navegador)
// Sólo habrá dos funciones, una para enviar mensajes al proceso main y otra para
// recibir mensajes de main
const { ipcRenderer, contextBridge } = require('electron')

// Dentro del navegador tendremos acceso a las funciones "send" y "receive"
contextBridge.exposeInMainWorld('api', {
  send: (channel, ...args) => {
    console.log(`message sent to main: ${args}`)
    const validChannels = ['toMain']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...args)
    }
  },
  receive: (channel, listener) => {
    console.log('message received from main')
    const validChannels = ['fromMain']
    if (validChannels.includes(channel)) {
      // Escucha al channel. Cuando llega un nuevo mensaje invoca a listener "listener(event, ...args)"
      ipcRenderer.on(channel, (_event, ...args) => listener(...args))
    }
  }
})
