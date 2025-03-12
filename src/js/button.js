export function button(element){
    return {
        setVisible: (isVisible) => {
            element.style.visibility = isVisible ? 'visible' : 'hidden'
        },
        setText: (text) => {
            element.children[1].innerHTML = text
        }
    }
}