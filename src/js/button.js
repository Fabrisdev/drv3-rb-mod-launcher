import { hideAlert } from "./alert.js"
import { playHoverSoundEffect, playSelectSoundEffect } from "./audio.js"

export function button(element){
    element.addEventListener('mouseover', () => {
        playHoverSoundEffect()
        element.classList.add('hovered')
    })

    element.addEventListener('mouseout', () => {
        element.classList.remove('hovered')
    })

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