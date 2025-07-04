import type { SupportedLanguages } from "./language"

const modReleases = await fetch("https://api.github.com/repos/silicon-git/ResoluteRebellion-releases/releases")
const data = await modReleases.json()
const lastRelease = data[0]
const version = lastRelease.name
const releaseLink = data[0].html_url
const modVersionText = document.getElementById('mod-version')!
const installerVersionText = document.getElementById('installer-version')!
modVersionText.innerHTML = `Mod version: <a target="_blank" href="${releaseLink}">${version}</a>`
window.addEventListener('language-selected', (event) => {
    const { language } = event.detail
    const modVersionTranslation = {
        en: "Mod version",
        es: "Versión del mod",
        fr: "Version du mod"
    }
    modVersionText.innerHTML = `${modVersionTranslation[language]}: <a target="_blank" href="${releaseLink}">${version}</a>`
    const installerVersionTranslation = {
        en: "Installer version",
        es: "Versión del instalador",
        fr: "Version de l'installateur"
    }
    installerVersionText.innerHTML = `${installerVersionTranslation[language]}: <a target="_blank" href="https://github.com/Fabrisdev/drv3-rb-mod-launcher/releases/latest">v1.5</a>`
})
