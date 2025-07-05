import { getCurrentAlert, showAlert } from "./js/alert.js"
import { playSelectSoundEffect, playHoverSoundEffect } from "./js/audio.js"
import { setLanguage } from "./js/language.js"

const installSelectedImage = document.getElementById('install_selected_image')!
const optionsSelectedImage = document.getElementById('options_selected_image')!
const exitSelectedImage = document.getElementById('exit_selected_image')!
const installHitbox = document.getElementById('install_hitbox')!
const optionsHitbox = document.getElementById('options_hitbox')!
const exitHitbox = document.getElementById('exit_hitbox')!
const installationStartedText = document.getElementById('installation_started_text')!

installHitbox.addEventListener('mouseenter', () => {
    exitSelectedImage.style.visibility = 'hidden'
    optionsSelectedImage.style.visibility = 'hidden'
    installSelectedImage.style.visibility = 'visible'
    playHoverSoundEffect()
})

optionsHitbox.addEventListener('mouseenter', () => {
    exitSelectedImage.style.visibility = 'hidden'
    installSelectedImage.style.visibility = 'hidden'
    optionsSelectedImage.style.visibility = 'visible'
    playHoverSoundEffect()
})

exitHitbox.addEventListener('mouseenter', () => {
    installSelectedImage.style.visibility = 'hidden'
    optionsSelectedImage.style.visibility = 'hidden'
    exitSelectedImage.style.visibility = 'visible'
    playHoverSoundEffect()
})

async function checkForOldModVersionAndInstall(danganronpaFilePath: string){
    const hasOldModInstallation = await pywebview.api.check_has_old_mod_version_installed()
    if(hasOldModInstallation){
        showAlert({
            text: {
                en: "An already existing installation of the mod was found. Proceeding will overwrite it. Are you sure?",
                es: "Se ha encontrado una instalación previa del mod. Al proceder esta se sobrescribirá. ¿Estás seguro?",
                fr: "Une installation du mod déjà existante a été trouvé. En poursuivant, celle-ci sera écrasé. Êtes vous sur ?"
            },
            buttons: [
                {
                    text: {
                        en: "Yes",
                        es: "Sí",
                        fr: "Oui"
                    },
                    onClick: () => {
                        pywebview.api.install(danganronpaFilePath)
                    }
                },
                {
                    text: {
                        en: "No",
                        es: "No",
                        fr: "Non"
                    },
                    onClick: () => {}
                }
            ]
        })
        return
    }
    pywebview.api.install(danganronpaFilePath)
}

installHitbox.addEventListener('click', async () => {
    playSelectSoundEffect()
    if(!navigator.onLine){
        return showAlert({
            text: {
                en: "You don't seem to have an internet connection. Please check your network and try again",
                es: "No pareces que tengas conexión a internet. Por favor, revisa tu red e inténtalo de nuevo",
                fr: "NOT YET DONE"
            },
            buttons: [
                {
                    text: {
                        en: "OK",
                        es: "Vale",
                        fr: "NOT YET DONE"
                    },
                    onClick: () => {}
                }
            ]
        })
    }
    const hasDanganronpaInstalled = await pywebview.api.check_has_danganronpa_installed()
    if(!hasDanganronpaInstalled) {
        showAlert({
            text: {
                en: "No previous installation of Danganronpa V3: Killing Harmony was found. Proceeding will ask you to specify where it is currently installed. Is that OK?",
                es: "No se ha encontrado una instalación previa de Danganronpa V3: Killing Harmony. Al proceder se te pedirá que especifiques donde está actualmente instalado. ¿Está bien?",
                fr: "Aucune installation de Danganronpa V3: Killing Harmony n'a été trouvée. En poursuivantil vous sera demandé de specifier ou le jeu est actuellement installé. Est ce que c'est bon pour vous ?"
            },
            buttons: [
                {
                    text: {
                        en: "Yes",
                        es: "Sí",
                        fr: "Oui"
                    },
                    onClick: async () => {
                        const danganronpaFilePath = await pywebview.api.ask_for_danganronpa_file_path() 
                        if(danganronpaFilePath === "") return
                        checkForOldModVersionAndInstall(danganronpaFilePath)
                    }
                },
                {
                    text: {
                        en: "No",
                        es: "No",
                        fr: "Non"
                    },
                    onClick: () => {}
                }
            ]
        })
        return
    }
    checkForOldModVersionAndInstall("STEAM_PATH")
})

function showInstallationStatus(status: string){
    if(status === "INSTALL FINISHED"){
        const { buttons } = getCurrentAlert()
        const button = buttons.get("...") ?? buttons.get("SKIP") ?? buttons.get("SALTAR") ?? buttons.get("PASSER")
        if(button === undefined) return
        button.setText({
            en: "OK",
            es: "Vale",
            fr: "NOT YET DONE"
        })
        button.onClick(() => {})
        button.setClickable(true)
        return
    }
    installationStartedText.innerHTML = status
}

window.showInstallationStatus = showInstallationStatus

function showStartedCheckingGameIntegrityAlert(){
    showAlert({
        text: {
            en: "Starting game integrity check...",
            es: "Comenzando chequeo de integridad del juego...",
            fr: "Démarrage de la vérification de l'intégrité des fichiers du jeu..."
        },
        buttons: [
            {
                text: {
                    en: "SKIP",
                    es: "SALTAR",
                    fr: "PASSER"
                },
                onClick: () => {
                    pywebview.api.skip_game_integrity_check()
                    showAlert({
                        text: {
                            en: "Starting download of the mod...",
                            es: "Iniciando descarga del mod...",
                            fr: "Démarrage du téléchargement du mod..."
                        },
                        buttons: [
                            {
                                text: {
                                    en: "...",
                                    es: "...",
                                    fr: "..."
                                },
                                onClick: () => {},
                                isClickable: false
                            }
                        ]
                    })
                }
            }
        ]
    })
}

window.showStartedCheckingGameIntegrityAlert = showStartedCheckingGameIntegrityAlert

function stopShowingCheckingGameIntegrityAlert(){
    const { buttons } = getCurrentAlert()
    const button = buttons.get("SKIP") ?? buttons.get("SALTAR") ?? buttons.get("PASSER")
    if(button === undefined) return
    button.setClickable(false)
    button.setText({
        en: "...",
        es: "...",
        fr: "..."
    })
}

window.stopShowingCheckingGameIntegrityAlert = stopShowingCheckingGameIntegrityAlert

function showIntegrityCheckStatus(status: string){
    installationStartedText.innerHTML = status
}

window.showIntegrityCheckStatus = showIntegrityCheckStatus

exitHitbox.addEventListener('click', () => {
    pywebview.api.exit()
})

optionsHitbox.addEventListener('click', async () => {
    showAlert({
        text: {
            en: "You can either change the mod's installation path or Danganronpa V3: Killing Harmony's current installation path",
            es: "Puedes cambiar donde se instalará el mod o donde está actualmente instalado Danganronpa V3: Killing Harmony",
            fr: "Vous pouvez soit changer le chemin d'installation du mod, soit changer le chemin d'installation actuel de Danganronpa V3: Killing Harmony"
        },
        buttons: [
            {
                text: {
                    en: "MOD",
                    es: "MOD",
                    fr: "MOD"
                },
                onClick: () => {
                    pywebview.api.change_mod_path()
                } 
            },
            {
                text: {
                    en: "DRV3",
                    es: "DRV3",
                    fr: "DRV3"
                },
                onClick: () => {
                    pywebview.api.change_drv3_path()
                }
            }
        ],
        isCancellable: true
    })
})

showAlert({
    text: {
        en: "Before starting, please choose your preferred language. The game will also be installed in that language",
        es: "Before starting, please choose your preferred language. The game will also be installed in that language",
        fr: "Before starting, please choose your preferred language. The game will also be installed in that language"
    },
    buttons: [
        {
            text: {
                en: "English",
                es: "English",
                fr: "English"
            },
            onClick: () => {
                setLanguage('en')
            }
        },
                {
            text: {
                en: "Spanish",
                es: "Spanish",
                fr: "Spanish"
            },
            onClick: () => {
                setLanguage('es')
            }
        },
                {
            text: {
                en: "French",
                es: "French",
                fr: "French"
            },
            onClick: () => {
                setLanguage('fr')
            }
        }
    ]
})