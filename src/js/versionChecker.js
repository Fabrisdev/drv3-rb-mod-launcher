const modReleases = await fetch("https://api.github.com/repos/silicon-git/ResoluteRebellion-releases/releases")
const data = await modReleases.json()
const lastRelease = data[0]
const version = lastRelease.name
const releaseLink = data[0].html_url
const modVersionText = document.getElementById('mod-version')
modVersionText.innerHTML = `Mod version: <a target="_blank" href="${releaseLink}">${version}</a>`
