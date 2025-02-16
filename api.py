import webview
from lib import *
from tkinter import filedialog

drv3_user_configured_path = ""
mod_user_configured_path = ""

class Api:
    def exit(self):
        webview.windows[0].destroy()

    def install(self, danganronpa_path):
        if drv3_user_configured_path != "": check_game_integrity(drv3_user_configured_path)
        else: check_game_integrity(danganronpa_path)
        download_mod()
        send_message_about_installation_status('Finished downloading mod. Copying Reloaded Installation and installing the mod...')
        extract_and_store_reloaded_installation(mod_user_configured_path)
        update_reloaded_app_location(mod_user_configured_path, drv3_user_configured_path)
        send_message_about_installation_status('Deleting old configs and/or mod installations...')
        try_delete_old_reloaded_configs()
        try_delete_old_mod_versions()
        extract_and_store_mod(mod_user_configured_path)
        send_message_about_installation_status('Finished installing the mod. Creating shortcut...')
        if drv3_user_configured_path != "": create_shortcut(drv3_user_configured_path, mod_user_configured_path)
        else: create_shortcut(danganronpa_path, mod_user_configured_path)
        send_message_about_installation_status('All done! The mod has been installed. A launcher has been added on your desktop')
        finish_install()

    def check_has_old_mod_version_installed(self):
        return has_old_mod_version_installed() and mod_user_configured_path == ""

    def check_has_danganronpa_installed(self):
        return has_danganronpa_installed() or drv3_user_configured_path != ""
    
    def ask_for_danganronpa_file_path(self):
        return filedialog.askopenfilename(
            title="Select Danganronpa's .EXE", 
            filetypes=[("Danganronpa's executable", "*.exe")]
        )
    
    def change_drv3_path(self):
        drv3_path = filedialog.askopenfilename(
            title="Select Danganronpa's .EXE", 
            filetypes=[("Danganronpa's executable", "*.exe")]
        )
        if drv3_path == "": return
        global drv3_user_configured_path
        drv3_user_configured_path = drv3_path

    def change_mod_path(self):
        mod_path = filedialog.askdirectory(
            title="Select installation directory"
        )
        global mod_user_configured_path
        if mod_path == "": return
        mod_user_configured_path = mod_path