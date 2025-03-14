import { getCurrentAlert, showAlert } from "./js/alert.js"
import { playSelectSoundEffect, playHoverSoundEffect } from "./js/audio.js"

const installSelectedImage = document.getElementById('install_selected_image')
const optionsSelectedImage = document.getElementById('options_selected_image')
const exitSelectedImage = document.getElementById('exit_selected_image')
const installHitbox = document.getElementById('install_hitbox')
const optionsHitbox = document.getElementById('options_hitbox')
const exitHitbox = document.getElementById('exit_hitbox')
const installationStartedText = document.getElementById('installation_started_text')

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

async function checkForOldModVersionAndInstall(danganronpaFilePath){
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

installHitbox.addEventListener('click', async () => {
    playSelectSoundEffect()
    const hasDanganronpaInstalled = await pywebview.api.check_has_danganronpa_installed()
    if(!hasDanganronpaInstalled) {
        showAlert({
            text: "No previous installation of Danganronpa V3: Killing Harmony was found. Proceeding will ask you to specify where it is currently installed. Is that OK?",
            buttons: [
                {
                    text: "Yes",
                    onClick: async () => {
                        const danganronpaFilePath = await pywebview.api.ask_for_danganronpa_file_path() 
                        if(danganronpaFilePath === "") return
                        checkForOldModVersionAndInstall(danganronpaFilePath)
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
    checkForOldModVersionAndInstall("STEAM_PATH")
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

function showIntegrityCheckStatus(status){
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
        ],
        isCancellable: true
    })
})