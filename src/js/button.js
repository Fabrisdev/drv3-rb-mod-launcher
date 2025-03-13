import { hideAlert } from "./alert.js"
import { playSelectSoundEffect } from "./audio.js"

export function button(element){
    return {
        setVisible: (isVisible) => {
            element.style.visibility = isVisible ? 'visible' : 'hidden'
        },
        setText: (text) => {
            element.children[1].innerHTML = text
        },
        onClick: (callback, controller) => {
            element.addEventListener('click', () => {
                callback()
                hideAlert()
                controller.abort()
                playSelectSoundEffect()
            }, { signal: controller.signal})
        }
    }
}