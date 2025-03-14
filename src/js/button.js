import { hideAlert, updateButtonsMappedText } from "./alert.js"
import { playHoverSoundEffect, playSelectSoundEffect } from "./audio.js"

export function button(element){
    let isClickable = true
    handleMouseHover()
    function handleMouseHover(){
        element.addEventListener('mouseenter', () => {
            if(!isClickable) return
            playHoverSoundEffect()
            element.classList.add('hovered')
        })
    
        element.addEventListener('mouseleave', () => {
            element.classList.remove('hovered')
        })
    }

    return {
        setVisible: (isVisible) => {
            element.style.visibility = isVisible ? 'visible' : 'hidden'
        },
        setText: (text) => {
            updateButtonsMappedText(element.children[1].innerHTML, text)
            element.children[1].innerHTML = text
        },
        onClick: (callback) => {
            const newElement = element.cloneNode(true)
            element.replaceWith(newElement)
            element = newElement
            handleMouseHover()
            element.addEventListener('click', () => {
                if(!isClickable) return
                hideAlert()
                callback()
                playSelectSoundEffect()
            })
        },
        setClickable: (clickable) => {
            isClickable = clickable
        }
    }
}