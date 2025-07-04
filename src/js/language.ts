let language = 'en'

export function setLanguage(newLanguage: string) {
    const selectedLanguageEvent = new CustomEvent('language-selected', {
        detail: {
            language: newLanguage
        }
    })
    window.dispatchEvent(selectedLanguageEvent)
    language = newLanguage
}

export function getLanguage() {
    return language
}

window.setLanguage = setLanguage