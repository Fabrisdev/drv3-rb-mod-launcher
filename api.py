import webview
from lib import *

class Api:
    def exit(self):
        webview.windows[0].destroy()
    def install(self):
        download_mod()
        print('Finished downloading mod. Copying Reloaded Installation and installing the mod...')
        extract_and_store_reloaded_installation()
        try_delete_old_reloaded_configs()
        try_delete_old_mod_versions()
        extract_and_store_mod()
        print('Finished installing the mod. Creating shortcut...')
        create_shortcut()
        print('All done!')