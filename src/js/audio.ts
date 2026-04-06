export function playCancelSoundEffect(){
    const audio = new Audio("/sound_effects/cancel.mp3")
    audio.volume = 0.35
    audio.play()
}

export function playHoverSoundEffect(){
    const audio = new Audio("/sound_effects/hover.mp3")
    audio.volume = 0.35
    audio.play()
}

export function playSelectSoundEffect(){
    const audio = new Audio("/sound_effects/select.mp3")
    audio.volume = 0.35
    audio.play()
}