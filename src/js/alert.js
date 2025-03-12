const alertImage = document.getElementById("alert-image")
const alertText = document.getElementById('installation_started_text')
const firstButton = document.getElementById('button-container-1')
const secondButton = document.getElementById('button-container-2')
const thirdButton = document.getElementById('button-container-3')
const buttonIfOnlyOne = document.getElementById('button-container-if-only-one')

export function showAlert({ text, buttons, isCancellable }){
    alertImage.style.visibility = 'visible'
    alertText.innerHTML = text
    if(buttons.length === 1){
        buttonIfOnlyOne.style.visibility = 'visible'
        buttonIfOnlyOne.children[1].innerHTML = buttons[0].text
    }
    if(buttons.length > 1){
        firstButton.style.visibility = 'visible'
        firstButton.children[1].innerHTML = buttons[0].text
    }
    if(buttons.length >= 2){
        secondButton.style.visibility = 'visible'
        secondButton.children[1].innerHTML = buttons[1].text
    }
    if(buttons.length >= 3){
        thirdButton.style.visibility = 'visible'
        thirdButton.children[1].innerHTML = buttons[2].text
    }
}