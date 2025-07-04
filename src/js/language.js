let language = localStorage.getItem('language')

export function setLanguage(newLanguage) {
    language = newLanguage
    localStorage.setItem('language', language)
}

export function getLanguage() {
    return language
}