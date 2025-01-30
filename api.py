import webview
from lib import *
from tkinter import filedialog

class Api:
    def exit(self):
        webview.windows[0].destroy()
    def install(self, danganronpa_path):
        download_mod()
        send_message_about_installation_status('Finished downloading mod. Copying Reloaded Installation and installing the mod...')
        extract_and_store_reloaded_installation()
        send_message_about_installation_status('Deleting old configs and/or mod installations...')
        try_delete_old_reloaded_configs()
        try_delete_old_mod_versions()
        extract_and_store_mod()
        send_message_about_installation_status('Finished installing the mod. Creating shortcut...')
        create_shortcut(danganronpa_path)
        send_message_about_installation_status('All done! The mod has been installed. A launcher has been added on your desktop')
        finish_install()

    def check_has_old_mod_version_installed(self):
        return has_old_mod_version_installed()

    def check_has_danganronpa_installed(self):
        return has_danganronpa_installed()
    
    def ask_for_danganronpa_file_path(self):
        return filedialog.askopenfilename(
            title="Select Danganronpa's .EXE", 
            filetypes=[("Danganronpa's executable", "*.exe")]
        )