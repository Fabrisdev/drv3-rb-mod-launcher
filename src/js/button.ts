import { hideAlert, updateButtonsMappedText } from "./alert.ts"
import { playHoverSoundEffect, playSelectSoundEffect } from "./audio.ts"
import { getLanguage, type TranslatedText } from "./language.ts"


export type Button = {
    text: TranslatedText,
    onClick: () => void,
    isClickable?: boolean,
}

export type ButtonWrapper = {
    setVisible: (isVisible: any) => void;
    setText: (text: any) => void;
    onClick: (callback: any) => void;
    setClickable: (clickable: any) => void;
}

export function button(element: HTMLElement){
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
        setVisible: (isVisible: boolean) => {
            element.style.visibility = isVisible ? 'visible' : 'hidden'
        },
        setText: (text: TranslatedText) => {
            const selectedLanguage = getLanguage()
            updateButtonsMappedText(element.children[1].innerHTML, text[selectedLanguage])
            element.children[1].innerHTML = text[selectedLanguage]
        },
        onClick: (callback: () => void) => {
            const newElement = element.cloneNode(true) as HTMLElement
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
        setClickable: (clickable: boolean) => {
            isClickable = clickable
        }
    }
}