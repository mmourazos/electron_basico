
function initInterface () {
  // Seleccionamos los elementos de la interfaz.
  const operando1 = document.getElementById('oper1')
  const operando2 = document.getElementById('oper2')
  const btnSuma = document.getElementById('btnSuma')
  const resultado = document.getElementById('resultado')

  // Añadimos un event listener al botón que envíe a "main" los operandos.
  btnSuma.addEventListener('click', (_event) => {
    // Gracias al código de preload.js tendemos las funciones "send" y "receive"
    // accesibles mediante el objeto "api" de "window"
    window.api.send('toMain', parseInt(operando1.value), parseInt(operando2.value))

    // Establecemos otro lístener que atienda a los mensajes que vengan de main ('fromMain')
    window.api.receive('fromMain', (resultadoSuma) => {
      resultado.innerText = resultadoSuma
    })
  })
}

initInterface()
