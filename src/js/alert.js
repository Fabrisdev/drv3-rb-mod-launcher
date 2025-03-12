const alertImage = document.getElementById("alert-image")
const alertText = document.getElementById('installation_started_text')

export function showAlert({ text, buttons, isCancellable }){
    alertImage.style.visibility = 'visible'
    alertText.innerHTML = text
}