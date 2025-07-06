import webview
from lib import *
from tkinter import filedialog

drv3_user_configured_path = ""
mod_user_configured_path = ""

class Api:
    def exit(self):
        webview.windows[0].destroy()

    def install(self, danganronpa_path, language):
        if drv3_user_configured_path != "": 
            game_integrity_status = check_game_integrity(drv3_user_configured_path, language)
            if(game_integrity_status == "MODIFIED"): return
        else: 
            game_integrity_status = check_game_integrity(danganronpa_path, language)
            if(game_integrity_status == "MODIFIED"): return
        download_mod(language)
        if language == 'en':
            send_message_about_installation_status('Finished downloading mod. Copying Reloaded Installation and installing the mod...')
        if language == 'es':
            send_message_about_installation_status('Finalizando descarga del mod. Copiando la instalación de Reloaded e instalando el mod...')
        if language == 'fr':
            send_message_about_installation_status("Téléchargement du mod terminé. Copie de l'installation de Reloaded et installation du mod...")
        extract_and_store_reloaded_installation(mod_user_configured_path)
        update_reloaded_app_location(mod_user_configured_path, drv3_user_configured_path)
        if language == 'en':
            send_message_about_installation_status('Deleting old configs and/or mod installations...')
        if language == 'es':
            send_message_about_installation_status('Eliminando configuraciones y/o instalaciones del mod viejas...')
        if language == 'fr':
            send_message_about_installation_status("Supression d'anciennes configurations et/ou d'installations de mod...")
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
    
    def ask_for_danganronpa_file_path(self, language):
        messagesTranslated = {
            "en": {
                "title": "Select Danganronpa's .EXE",
                "filetypes": "Danganronpa's executable"
            },
            "es": {
                "title": "Selecciona el .EXE de Danganronpa",
                "filetypes": "Ejecutable de Danganronpa"
            },
            "fr": {
                "title": "Selectionnez le .EXE de Danganronpa",
                "filetypes": "Fichier executable de Danganronpa"
            }
        }
        message = messagesTranslated[language]
        return filedialog.askopenfilename(
            title=message['title'], 
            filetypes=[(message['filetypes'], "*.exe")]
        )
    
    def change_drv3_path(self, language):
        messagesTranslated = {
            "en": {
                "title": "Select Danganronpa's .EXE",
                "filetypes": "Danganronpa's executable"
            },
            "es": {
                "title": "Selecciona el .EXE de Danganronpa",
                "filetypes": "Ejecutable de Danganronpa"
            },
            "fr": {
                "title": "Selectionnez le .EXE de Danganronpa",
                "filetypes": "Fichier executable de Danganronpa"
            }
        }
        message = messagesTranslated[language]
        drv3_path = filedialog.askopenfilename(
            title=message['title'], 
            filetypes=[(message['filetypes'], "*.exe")]
        )
        if drv3_path == "": return
        global drv3_user_configured_path
        drv3_user_configured_path = drv3_path

    def change_mod_path(self, language):
        titlesTranslated = {
            "en": "Select the installation directory for the mod",
            "es": "Elige la carpeta de instalación del mod",
            "fr": "Selectionnez le repertoire d'installation pour le mod."
        }
        title = titlesTranslated[language]
        mod_path = filedialog.askdirectory(
            title=title
        )
        global mod_user_configured_path
        if mod_path == "": return
        mod_user_configured_path = mod_path

    def skip_game_integrity_check(self):
        skip_game_integrity_check()