import type { SupportedLanguages } from "./language"

export {}

declare global {
    interface Window {
        setLanguage: (newLanguage: SupportedLanguages) => void
        getCurrentAlert: () => { buttons: Map<TranslatedText, ButtonWrapper> }
    }
}