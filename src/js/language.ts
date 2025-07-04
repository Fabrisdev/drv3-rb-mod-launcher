let language: SupportedLanguages = 'en'

export type SupportedLanguages = 'en' | 'es' | 'fr'

export function setLanguage(newLanguage: SupportedLanguages) {
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