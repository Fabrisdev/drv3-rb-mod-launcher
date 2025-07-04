let language = 'en'

export function setLanguage(newLanguage) {
    language = newLanguage
}

export function getLanguage() {
    return language
}

window.setLanguage = setLanguage