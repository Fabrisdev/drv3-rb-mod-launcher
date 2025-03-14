import { getCurrentAlert, showAlert } from "./js/alert.js"
import { playSelectSoundEffect, playHoverSoundEffect, playCancelSoundEffect } from "./js/audio.js"

const installSelectedImage = document.getElementById('install_selected_image')
const optionsSelectedImage = document.getElementById('options_selected_image')
const exitSelectedImage = document.getElementById('exit_selected_image')
const installHitbox = document.getElementById('install_hitbox')
const optionsHitbox = document.getElementById('options_hitbox')
const exitHitbox = document.getElementById('exit_hitbox')
const installationStartedText = document.getElementById('installation_started_text')
let selected = "install"

installHitbox.addEventListener('mouseover', () => {
    exitSelectedImage.style.visibility = 'hidden'
    optionsSelectedImage.style.visibility = 'hidden'
    installSelectedImage.style.visibility = 'visible'
    if(selected === "install") return
    playHoverSoundEffect()
    selected = "install"
})

optionsHitbox.addEventListener('mouseover', () => {
    exitSelectedImage.style.visibility = 'hidden'
    installSelectedImage.style.visibility = 'hidden'
    optionsSelectedImage.style.visibility = 'visible'
    if(selected === "options") return
    playHoverSoundEffect()
    selected = "options"
})

exitHitbox.addEventListener('mouseover', () => {
    installSelectedImage.style.visibility = 'hidden'
    optionsSelectedImage.style.visibility = 'hidden'
    exitSelectedImage.style.visibility = 'visible'
    if(selected === "exit") return
    playHoverSoundEffect()
    selected = "exit"
})

installHitbox.addEventListener('click', async () => {
    playSelectSoundEffect()
    const hasDanganronpaInstalled = await pywebview.api.check_has_danganronpa_installed()
    //let danganronpaFilePath = "STEAM_PATH"
    if(!hasDanganronpaInstalled) {
        /*
        const answerToNoDanganronpaInstalled = await showNoDanganronpaInstalledAlert()
        if(answerToNoDanganronpaInstalled === "yes") {
            danganronpaFilePath = await pywebview.api.ask_for_danganronpa_file_path()
            if(danganronpaFilePath === "") return
        }
        if(answerToNoDanganronpaInstalled === "no") return
        const hasOldModInstallation = await pywebview.api.check_has_old_mod_version_installed()
        if(hasOldModInstallation){
            const answerToOldModInstallation = await showAlreadyExistingInstallationAlert()
            if(answerToOldModInstallation === "no") return
        }
        showInstallationStartedAlert()
        pywebview.api.install(danganronpaFilePath)
        */
        showAlert({
            text: "No previous installation of Danganronpa V3: Killing Harmony was found. Proceeding will ask you to specify where it is currently installed. Is that OK?",
            buttons: [
                {
                    text: "Yes",
                    onClick: async () => {
                        const danganronpaFilePath = await pywebview.api.ask_for_danganronpa_file_path() 
                        if(danganronpaFilePath === "") return
                        const hasOldModInstallation = await pywebview.api.check_has_old_mod_version_installed()
                        if(hasOldModInstallation){
                            showAlert({
                                text: "An already existing installation of the mod was found. Proceeding will overwrite it. Are you sure?",
                                buttons: [
                                    {
                                        text: "Yes",
                                        onClick: () => {
                                            pywebview.api.install(danganronpaFilePath)
                                        }
                                    },
                                    {
                                        text: "No",
                                        onClick: () => {}
                                    }
                                ]
                            })
                        }
                    }
                },
                {
                    text: "No",
                    onClick: () => {}
                }
            ]
        })
        return
    }
    //lo tiene en STEAM_PATH
})

function showInstallationStatus(status){
    if(status === "INSTALL FINISHED"){
        const { buttons } = getCurrentAlert()
        const button = buttons.get("...")
        button.setText("OK")
        button.setClickable(true)
        return
    }
    installationStartedText.innerHTML = status
}

window.showInstallationStatus = showInstallationStatus

function skipHitboxMouseOver() {
    const integrityCheckHoverSkipImage = document.getElementById('integrity_check_hover_skip')
    const integrityCheckImage = document.getElementById('integrity_check_skip')
    playHoverSoundEffect()
    integrityCheckHoverSkipImage.style.visibility = 'visible'
    integrityCheckImage.style.visibility = 'hidden'
}
function skipHitboxClick() {
    const integrityCheckHoverSkipImage = document.getElementById('integrity_check_hover_skip')
    const skipHitbox = document.getElementById('ok_hitbox')
    const integrityCheckImage = document.getElementById('integrity_check_skip')
    pywebview.api.skip_game_integrity_check()
    showIntegrityCheckStatus('STOP')
    integrityCheckHoverSkipImage.style.visibility = 'hidden'
    integrityCheckImage.style.visibility = 'hidden'
    skipHitbox.removeEventListener('mouseover', skipHitboxMouseOver)
    skipHitbox.removeEventListener('click', skipHitboxClick)
    skipHitbox.style.visibility = 'hidden'
}

function showStartedCheckingGameIntegrityAlert(){
    showAlert({
        text: "Starting game integrity check...",
        buttons: [
            {
                text: "SKIP",
                onClick: () => {
                    pywebview.api.skip_game_integrity_check()
                    showAlert({
                        text: "Starting download of the mod...",
                        buttons: [
                            {
                                text: "...",
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
    const button = buttons.get("SKIP")
    button.setClickable(false)
    button.setText("...")
}

window.stopShowingCheckingGameIntegrityAlert = stopShowingCheckingGameIntegrityAlert

let shouldContinueUpdatingIntegrityStatus = true

function showIntegrityCheckStatus(status){
    if (status === "STOP") shouldContinueUpdatingIntegrityStatus = false
    if (shouldContinueUpdatingIntegrityStatus === false) return installationStartedText.innerHTML = "Integrity check has been skipped. Stopping integrity check..."
    installationStartedText.innerHTML = status
}

window.showIntegrityCheckStatus = showIntegrityCheckStatus

exitHitbox.addEventListener('click', () => {
    pywebview.api.exit()
})

optionsHitbox.addEventListener('click', async () => {
    showAlert({
        text: "You can either change the mod's installation path or Danganronpa V3: Killing Harmony's current installation path",
        buttons: [
            {
                text: "MOD",
                onClick: () => {
                    pywebview.api.change_mod_path()
                } 
            },
            {
                text: "DRV3",
                onClick: () => {
                    pywebview.api.change_drv3_path()
                }
            }
        ]
    })
})