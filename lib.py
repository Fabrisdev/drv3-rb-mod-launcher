from urllib.request import urlretrieve
import py7zr
import os
import shutil
import tempfile
from win32com.client import Dispatch
import sys
import webview
import json
import hashlib

mod_foldername = "drv3.rewrite.resoluterebellion"
mod_download_link = "https://github.com/silicon-git/ResoluteRebellion-releases/releases/download/release/drv3.rewrite.resoluterebellion.7z"

reloaded_installation_foldername = "Reloaded II (Resolute Rebellion)"
documents_folder_path = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Documents') 
temp_folder_path = tempfile.gettempdir()
program_files_x86_folder_path = os.environ["ProgramFiles(x86)"]
game_executable = os.path.join(program_files_x86_folder_path, "Steam", "steamapps", "common", "Danganronpa V3 Killing Harmony", "Dangan3Win.exe")

def download_mod():
    urlretrieve(mod_download_link, os.path.join(temp_folder_path, "resolute_rebellion.7z"), show_progress)

def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def extract_and_store_reloaded_installation(reloaded_path):
    archive = py7zr.SevenZipFile(resource_path("Reloaded-II.7z"), mode='r')
    if reloaded_path != "": archive.extractall(path=reloaded_path)
    else: archive.extractall(path=os.path.join(documents_folder_path, reloaded_installation_foldername))

def try_delete_old_reloaded_configs():
    try: shutil.rmtree(os.path.join(os.getenv('APPDATA'), "Reloaded-Mod-Loader-II"))
    except: print('No old configs found.')

def has_old_mod_version_installed():
    return os.path.exists(os.path.join(documents_folder_path, reloaded_installation_foldername, 'Mods', mod_foldername))

def delete_old_mod_versions():
    shutil.rmtree(os.path.join(documents_folder_path, reloaded_installation_foldername, 'Mods', mod_foldername))

def try_delete_old_mod_versions():
    try: shutil.rmtree(os.path.join(documents_folder_path, reloaded_installation_foldername, 'Mods', mod_foldername))
    except: print('No old mod versions were found.')

def extract_and_store_mod(reloaded_path):
    archive = py7zr.SevenZipFile(os.path.join(temp_folder_path, "resolute_rebellion.7z"), mode='r')
    if reloaded_path != "": archive.extractall(path=os.path.join(reloaded_path, "Mods", mod_foldername))
    else: archive.extractall(path=os.path.join(documents_folder_path, reloaded_installation_foldername, "Mods", mod_foldername))

def create_shortcut(danganronpa_path, reloaded_path):
    game_executable = os.path.join(program_files_x86_folder_path, "Steam", "steamapps", "common", "Danganronpa V3 Killing Harmony", "Dangan3Win.exe")
    if danganronpa_path != "STEAM_PATH": game_executable = danganronpa_path
    if reloaded_path != "": reloaded_executable = os.path.join(reloaded_path, "Reloaded-II.exe")
    else: reloaded_executable = os.path.join(documents_folder_path, reloaded_installation_foldername, "Reloaded-II.exe")
    shutil.copy(resource_path('maki.ico'), os.path.dirname(reloaded_executable))
    desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop') 
    if not os.path.exists(desktop): desktop = os.path.join(os.environ["USERPROFILE"], "OneDrive", "Desktop")
    shell = Dispatch('WScript.Shell')
    shortcut = shell.CreateShortCut(f'{desktop}/Danganronpa V3 Resolute Rebellion.lnk')
    shortcut.TargetPath = f'{reloaded_executable}'
    shortcut.Arguments = f'--launch "{game_executable}"'
    shortcut.IconLocation = os.path.join(os.path.dirname(reloaded_executable), 'maki.ico')
    if reloaded_path != "": shortcut.WorkingDirectory = reloaded_path
    else: shortcut.WorkingDirectory = os.path.join(documents_folder_path, reloaded_installation_foldername)
    shortcut.save()

def show_progress(block_num, block_size, total_size):
    percentage = round(block_num * block_size / total_size *100,2)
    send_message_about_installation_status(f"Download of the mod has started. Current percentage: <br>{percentage}%")

def has_danganronpa_installed():
    return os.path.exists(game_executable)

def send_message_about_installation_status(message):
    webview.windows[0].evaluate_js(f'showInstallationStatus("{message}")')

def finish_install():
    send_message_about_installation_status("INSTALL FINISHED")

def update_reloaded_app_location(reloaded_path, danganronpa_path):
    file_location = os.path.join(documents_folder_path, reloaded_installation_foldername, 'Apps', 'dangan3win.exe', 'AppConfig.json')
    if reloaded_path != "": file_location = os.path.join(reloaded_path, 'Apps', 'dangan3win.exe', 'AppConfig.json')
    with open(file_location, "r", encoding="utf-8") as f:
        data = json.load(f)
    if danganronpa_path != "":
        data["AppLocation"] = danganronpa_path
        data["WorkingDirectory"] = os.path.dirname(danganronpa_path)
    else:
        data["AppLocation"] = game_executable
        data["WorkingDirectory"] = os.path.join(program_files_x86_folder_path, "Steam", "steamapps", "common", "Danganronpa V3 Killing Harmony")
    with open(file_location, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)  

def check_file_with_sha512(file_path):
    block_size = 1048576
    hasher = hashlib.sha512()
    file_size = os.path.getsize(file_path)
    read = 0 
    with open(file_path, "rb") as f:
        for bloque in iter(lambda: f.read(block_size), b""):
            hasher.update(bloque)
            read += len(bloque)
            read_percentage = (read / file_size) * 100
            send_message_about_game_integrity_check_status(file_path, read_percentage)
    return hasher.hexdigest()

def send_message_about_game_integrity_check_status(file_path, read_percentage):
    file_name_with_extension = os.path.basename(file_path)
    text = f"Checking game's integrity {read_percentage:.2f}%"
    check_order = {
        "partition_data_win.cpk": f"{text} (1/3)",
        "partition_data_win_us.cpk": f"{text} (2/3)",
        "partition_resident_win.cpk": f"{text} (3/3)"
    }
    send_message_about_installation_status(check_order[file_name_with_extension])

def check_game_integrity(danganronpa_path):
    game_executable = os.path.join(program_files_x86_folder_path, "Steam", "steamapps", "common", "Danganronpa V3 Killing Harmony", "Dangan3Win.exe")
    if danganronpa_path != "STEAM_PATH": game_executable = danganronpa_path
    path_to_game_data = os.path.join(os.path.dirname(game_executable), "data", "win")
    if not os.path.exists(path_to_game_data): return send_message_about_installation_status("INSTALL FAILED MODIFIED GAME")
    files_to_check = ["partition_data_win.cpk", "partition_data_win_us.cpk", "partition_resident_win.cpk"]
    for file in files_to_check:
        path_to_file = os.path.abspath(os.path.join(path_to_game_data, file))
        if not os.path.exists(path_to_file): return send_message_about_installation_status("INSTALL FAILED MODIFIED GAME")
        check_file_with_sha512(path_to_file)