import type { SupportedLanguages } from "./language"

export {}

declare global {
    interface Window {
        setLanguage: (newLanguage: SupportedLanguages) => void
        getCurrentAlert: () => { buttons: Map<TranslatedText, ButtonWrapper> },
        showInstallationStatus: (status: string) => void,
        showStartedCheckingGameIntegrityAlert: () => void,
        stopShowingCheckingGameIntegrityAlert: () => void,
        showIntegrityCheckStatus: (status: string) => void
    }
    interface WindowEventMap {
        'language-selected': CustomEvent<{ language: SupportedLanguages }>
    }
    const pywebview: {
        api: {
            check_has_old_mod_version_installed: () => Promise<string>,
            install: (path: string) => void,
            check_has_danganronpa_installed: () => Promise<boolean>,
            ask_for_danganronpa_file_path: () => Promise<string>,
            skip_game_integrity_check: () => void,
            exit: () => void,
            change_mod_path: () => void,
            change_drv3_path: () => void
        }
    }
}