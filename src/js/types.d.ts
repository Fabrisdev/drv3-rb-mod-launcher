export {}

declare global {
    interface Window {
        setLanguage: (newLanguage: string) => void
    }
}