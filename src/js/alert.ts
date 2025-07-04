import { playCancelSoundEffect } from "./audio.ts"
import { button } from "./button.ts"
import { getLanguage, type TranslatedText } from "./language.ts"
import type { Button, ButtonWrapper } from "./button.ts"

const alertImage = document.getElementById("alert-image")!
const alertText = document.getElementById('installation_started_text')!
const firstButton = button(document.getElementById('button-container-1')!)
const secondButton = button(document.getElementById('button-container-2')!)
const thirdButton = button(document.getElementById('button-container-3')!)
const buttonIfOnlyOne = button(document.getElementById('button-container-if-only-one')!)
const installHitbox = document.getElementById('install_hitbox')!
const optionsHitbox = document.getElementById('options_hitbox')!
const exitHitbox = document.getElementById('exit_hitbox')!

let buttonsMapped = new Map<string, ButtonWrapper>()

type Alert = {
    text: TranslatedText,
    buttons: Button[],
    isCancellable?: boolean
}

export function showAlert({ text, buttons, isCancellable = false }: Alert){
    buttonsMapped = new Map()
    installHitbox.style.visibility = 'hidden'
    optionsHitbox.style.visibility = 'hidden'
    exitHitbox.style.visibility = 'hidden'
    alertImage.style.visibility = 'visible'
    alertImage.classList.add('show_alert')
    const selectedLanguage = getLanguage()
    alertText.innerHTML = text[selectedLanguage]
    if(buttons.length === 1){
        buttonIfOnlyOne.setVisible(true)
        buttonIfOnlyOne.setText(buttons[0].text)
        buttonIfOnlyOne.onClick(buttons[0].onClick)
        buttonIfOnlyOne.setClickable(buttons[0].isClickable ?? true)
        buttonsMapped.set(buttons[0].text[selectedLanguage], buttonIfOnlyOne)
    }
    if(buttons.length > 1){
        firstButton.setVisible(true)
        firstButton.setText(buttons[0].text)
        firstButton.onClick(buttons[0].onClick)
        firstButton.setClickable(buttons[0].isClickable ?? true)
        buttonsMapped.set(buttons[0].text[selectedLanguage], firstButton)
    }
    if(buttons.length >= 2){
        secondButton.setVisible(true)
        secondButton.setText(buttons[1].text)
        secondButton.onClick(buttons[1].onClick)
        secondButton.setClickable(buttons[1].isClickable ?? true)
        buttonsMapped.set(buttons[1].text[selectedLanguage], secondButton)
    }
    if(buttons.length >= 3){
        thirdButton.setVisible(true)
        thirdButton.setText(buttons[2].text)
        thirdButton.onClick(buttons[2].onClick)
        thirdButton.setClickable(buttons[2].isClickable ?? true)
        buttonsMapped.set(buttons[2].text[selectedLanguage], thirdButton)
    }
    function handleEscapePressed(event: KeyboardEvent){
        if(event.key === "Escape" && isCancellable) {
            hideAlert()
            playCancelSoundEffect()
        }
    }
    document.removeEventListener("keyup", handleEscapePressed)
    document.addEventListener("keyup", handleEscapePressed)
    return { buttons: buttonsMapped }
}

export function hideAlert(){
    alertImage.style.visibility = 'hidden'
    alertImage.classList.remove('show_alert')
    alertText.innerHTML = ""
    buttonIfOnlyOne.setVisible(false)
    firstButton.setVisible(false)
    secondButton.setVisible(false)
    thirdButton.setVisible(false)
    installHitbox.style.visibility = 'visible'
    optionsHitbox.style.visibility = 'visible'
    exitHitbox.style.visibility = 'visible'
}

export function getCurrentAlert(){
    return { buttons: buttonsMapped }
}

export function updateButtonsMappedText(oldText: string, newText: string){
    const button = buttonsMapped.get(oldText)
    if(button === undefined) return
    buttonsMapped.set(newText, button)
    buttonsMapped.delete(oldText)
}

window.getCurrentAlert = getCurrentAlert