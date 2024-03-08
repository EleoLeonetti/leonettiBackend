const socket = io()
let user
let chatBox = document.querySelector('#chatBox')

Swal.fire({
    text: 'Ingresá tu email',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'Ingresá tu email para continuar'
    }
}).then(result => {
    user = result.value
})

chatBox.addEventListener('keyup', e =>{
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user, message: chatBox.value})
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', data =>{
    let messageLogs = document.querySelector('#messageLogs')
    const messageElement = document.createElement('p')
    messageElement.textContent = `${data.user}: ${data.message}`
    messageLogs.appendChild(messageElement)


})