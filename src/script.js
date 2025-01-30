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

function playHoverSoundEffect(){
    const audio = new Audio("sound_effects/hover.mp3")
    audio.play()
}

function playSelectSoundEffect(){
    const audio = new Audio("sound_effects/select.mp3")
    audio.play()
}

installHitbox.addEventListener('click', async () => {
    playSelectSoundEffect()
    const hasDanganronpaInstalled = await pywebview.api.check_has_danganronpa_installed()
    let danganronpaFilePath = "STEAM_PATH"
    if(!hasDanganronpaInstalled) {
        const answerToNoDanganronpaInstalled = await showNoDanganronpaInstalledAlert()
        if(answerToNoDanganronpaInstalled === "yes") {
            danganronpaFilePath = await pywebview.api.ask_for_danganronpa_file_path()
            if(danganronpaFilePath === "") return
        }
        if(answerToNoDanganronpaInstalled === "no") return
    }
    const hasOldModInstallation = await pywebview.api.check_has_old_mod_version_installed()
    if(hasOldModInstallation){
        const answerToOldModInstallation = await showAlreadyExistingInstallationAlert()
        if(answerToOldModInstallation === "no") return
    }
    showInstallationStartedAlert()
    pywebview.api.install(danganronpaFilePath)
})

function showInstallationStatus(status){
    if(status === "INSTALL FINISHED"){
        const installationStartedImage = document.getElementById('installation_started')
        const installationFinishedImage = document.getElementById('installation_finished')
        const okHitbox = document.getElementById('ok_hitbox')
        installationStartedImage.style.visibility = 'hidden'
        installationFinishedImage.style.visibility = 'visible'
        installationStartedImage.classList.remove('show_alert')
        okHitbox.style.visibility = 'visible'
        okHitbox.addEventListener('mouseover', () => {
            playHoverSoundEffect()
        })
        okHitbox.addEventListener('click', () => {
            playSelectSoundEffect()
            okHitbox.style.visibility = 'hidden'
            installationFinishedImage.style.visibility = 'hidden'
            installHitbox.style.visibility = 'visible'
            optionsHitbox.style.visibility = 'visible'
            exitHitbox.style.visibility = 'visible'
            installationStartedText.innerHTML = ""
        })
        return
    }
    installationStartedText.innerHTML = status
}

exitHitbox.addEventListener('click', () => {
    pywebview.api.exit()
})

function showInstallationStartedAlert(){
    installHitbox.style.visibility = 'hidden'
    optionsHitbox.style.visibility = 'hidden'
    exitHitbox.style.visibility = 'hidden'
    const installationStartedImage = document.getElementById('installation_started')
    installationStartedImage.style.visibility = 'visible'
    installationStartedImage.classList.add('show_alert')
    installationStartedText.innerHTML = "Starting download of the mod..."
}

async function showNoDanganronpaInstalledAlert(){
    const warningNo = document.getElementById('warning_no_danganronpa_installation_found_no')
    const warningYes = document.getElementById('warning_no_danganronpa_installation_found_yes')
    return await showAlert(warningNo, warningYes)
}

async function showAlreadyExistingInstallationAlert(){
    const warningNo = document.getElementById('warning_existing_installation_found_no')
    const warningYes = document.getElementById('warning_existing_installation_found_yes')
    return await showAlert(warningNo, warningYes)
}

function showAlert(noImage, yesImage){
    const noHitbox = document.getElementById('no_hitbox')
    const yesHitbox = document.getElementById('yes_hitbox')
    installHitbox.style.visibility = 'hidden'
    optionsHitbox.style.visibility = 'hidden'
    exitHitbox.style.visibility = 'hidden'
    noImage.style.visibility = 'visible'
    noImage.classList.add('show_alert')
    const noHitboxMouseover = function(){
        if(noImage.style.visibility === 'visible') return
        yesImage.style.visibility = 'hidden'
        noImage.style.visibility = 'visible'
        playHoverSoundEffect()
    }
    const yesHitboxMouseover = function(){
        if(yesImage.style.visibility === 'visible') return
        noImage.style.visibility = 'hidden'
        yesImage.style.visibility = 'visible'
        playHoverSoundEffect()
    }
    noHitbox.addEventListener('mouseover', noHitboxMouseover)
    yesHitbox.addEventListener('mouseover', yesHitboxMouseover)
    return getAnswer()
        .then(() => "yes")
        .catch(() => {
            selected = "options"
            return "no"
        })
        .finally(() => {
            playSelectSoundEffect()
            noImage.style.visibility = 'hidden'
            yesImage.style.visibility = 'hidden'
            noHitbox.removeEventListener('mouseover', noHitboxMouseover)
            yesHitbox.removeEventListener('mouseover', yesHitboxMouseover)
            installHitbox.style.visibility = 'visible'
            optionsHitbox.style.visibility = 'visible'
            exitHitbox.style.visibility = 'visible'
            noImage.classList.remove('show_alert')
        })
}

function getAnswer(){
    const noHitbox = document.getElementById('no_hitbox')
    const yesHitbox = document.getElementById('yes_hitbox')
    const answer = new Promise((resolve, reject) => {
        noHitbox.addEventListener('click', () => {
            reject()
        })
        yesHitbox.addEventListener('click', () => {
            resolve()
        })
    })
    return answer
}