import { playCancelSoundEffect } from "./audio.js"
import { button } from "./button.js"

const alertImage = document.getElementById("alert-image")
const alertText = document.getElementById('installation_started_text')
const firstButton = button(document.getElementById('button-container-1'))
const secondButton = button(document.getElementById('button-container-2'))
const thirdButton = button(document.getElementById('button-container-3'))
const buttonIfOnlyOne = button(document.getElementById('button-container-if-only-one'))

export function showAlert({ text, buttons, isCancellable }){
    alertImage.style.visibility = 'visible'
    alertImage.classList.add('show_alert')
    alertText.innerHTML = text
    const controller = new AbortController()
    if(buttons.length === 1){
        buttonIfOnlyOne.setVisible(true)
        buttonIfOnlyOne.setText(buttons[0].text)
        buttonIfOnlyOne.onClick(buttons[0].onClick, controller)
    }
    if(buttons.length > 1){
        firstButton.setVisible(true)
        firstButton.setText(buttons[0].text)
        firstButton.onClick(buttons[0].onClick, controller)
    }
    if(buttons.length >= 2){
        secondButton.setVisible(true)
        secondButton.setText(buttons[1].text)
        secondButton.onClick(buttons[1].onClick, controller)
    }
    if(buttons.length >= 3){
        thirdButton.setVisible(true)
        thirdButton.setText(buttons[2].text)
        thirdButton.onClick(buttons[2].onClick, controller)
    }
    document.addEventListener("keyup", event => {
        if(event.key === "Escape" && isCancellable) {
            hideAlert()
            playCancelSoundEffect()
            controller.abort()
        }
    }, { signal: controller.signal })
}

export function hideAlert(){
    alertImage.style.visibility = 'hidden'
    alertImage.classList.remove('show_alert')
    alertText.innerHTML = ""
    buttonIfOnlyOne.setVisible(false)
    firstButton.setVisible(false)
    secondButton.setVisible(false)
    thirdButton.setVisible(false)
}