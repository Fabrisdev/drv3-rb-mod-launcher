from urllib.request import urlretrieve

download_links = {
    "reloaded": "https://github.com/Reloaded-Project/Reloaded-II/releases/download/1.28.6/Setup.exe",
    "cri_filesystem_hook": "https://gamebanana.com/dl/875046",
    "resolute_rebellion": "https://gamebanana.com/dl/1319908"
}

urlretrieve(download_links["reloaded"], "reloaded.exe")