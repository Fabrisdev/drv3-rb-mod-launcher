const alertImage = document.getElementById("alert-image")

export function showAlert({ text, buttons, isCancellable }){
    alertImage.style.visibility = 'visible'
}