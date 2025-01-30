from urllib.request import urlretrieve
import py7zr
import os
import shutil
import tempfile
from win32com.client import Dispatch
import sys
import webview

mod_foldername = "drv3.rewrite.resoluterebellion"
mod_download_link = "https://gamebanana.com/dl/1319908"

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

def extract_and_store_reloaded_installation():
    archive = py7zr.SevenZipFile(resource_path("Reloaded-II.7z"), mode='r')
    archive.extractall(path=os.path.join(documents_folder_path, reloaded_installation_foldername))

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

def extract_and_store_mod():
    archive = py7zr.SevenZipFile(os.path.join(temp_folder_path, "resolute_rebellion.7z"), mode='r')
    archive.extractall(path=f"{documents_folder_path}/{reloaded_installation_foldername}/Mods/{mod_foldername}")

def create_shortcut(danganronpa_path):
    if danganronpa_path != "STEAM_PATH": game_executable = danganronpa_path
    reloaded_executable = os.path.join(documents_folder_path, reloaded_installation_foldername, "Reloaded-II.exe")
    desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop') 
    shell = Dispatch('WScript.Shell')
    shortcut = shell.CreateShortCut(f'{desktop}/Danganronpa V3 Resolute Rebellion.lnk')
    shortcut.TargetPath = f'{reloaded_executable}'
    shortcut.Arguments = f'--launch "{game_executable}"'
    shortcut.IconLocation = game_executable
    shortcut.WorkingDirectory = os.path.join(documents_folder_path, reloaded_installation_foldername)
    shortcut.save()

def show_progress(block_num, block_size, total_size):
    percentage = round(block_num * block_size / total_size *100,2)
    webview.windows[0].evaluate_js(f'showInstallationStatus("Download of the mod has started. Current percentage: <br>{percentage}%")')

def has_danganronpa_installed():
    return os.path.exists(game_executable)

def send_message_about_installation_status(message):
    webview.windows[0].evaluate_js(f'showInstallationStatus("{message}")')

def finish_install():
    send_message_about_installation_status("INSTALL FINISHED")