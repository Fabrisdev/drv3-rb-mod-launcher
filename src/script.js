const installSelectedImage = document.getElementById('install_selected_image')
const optionsSelectedImage = document.getElementById('options_selected_image')
const exitSelectedImage = document.getElementById('exit_selected_image')
const installHitbox = document.getElementById('install_hitbox')
const optionsHitbox = document.getElementById('options_hitbox')
const exitHitbox = document.getElementById('exit_hitbox')
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

installHitbox.addEventListener('click', () => {
    playSelectSoundEffect()
    pywebview.api.install()
})

exitHitbox.addEventListener('click', () => {
    pywebview.api.exit()
})

function showAlreadyExistingInstallationAlert(){
    const warningNo = document.getElementById('warning_existing_installation_found_no')
    const warningYes = document.getElementById('warning_existing_installation_found_yes')
    const noHitbox = document.getElementById('no_hitbox')
    const yesHitbox = document.getElementById('yes_hitbox')
    installHitbox.style.visibility = 'hidden'
    optionsHitbox.style.visibility = 'hidden'
    exitHitbox.style.visibility = 'hidden'
    warningNo.style.visibility = 'visible'
    warningNo.classList.add('show_alert')
    const noHitboxMouseover = function(){
        warningYes.style.visibility = 'hidden'
        warningNo.style.visibility = 'visible'
        playHoverSoundEffect()
    }
    const yesHitboxMouseover = function(){
        warningNo.style.visibility = 'hidden'
        warningYes.style.visibility = 'visible'
        playHoverSoundEffect()
    }
    noHitbox.addEventListener('mouseover', noHitboxMouseover)
    yesHitbox.addEventListener('mouseover', yesHitboxMouseover)
    getAnswer()
        .then(() => pywebview.api.answered_yes())
        .catch(() => pywebview.api.answered_no())
        .finally(() => {
            playSelectSoundEffect()
            warningNo.style.visibility = 'hidden'
            warningYes.style.visibility = 'hidden'
            noHitbox.removeEventListener('mouseover', noHitboxMouseover)
            yesHitbox.removeEventListener('mouseover', yesHitboxMouseover)
            installHitbox.style.visibility = 'visible'
            optionsHitbox.style.visibility = 'visible'
            exitHitbox.style.visibility = 'visible'
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