from lib import *
import webview
from ctypes import windll
import sys

class Api:
    def exit(self):
        webview.windows[0].destroy()

def get_window_border_size():
    user32 = windll.user32
    screen = user32.GetSystemMetrics
    border_width = screen(32)  # Ancho del borde
    border_height = screen(33)  # Alto del borde
    title_bar_height = screen(4)  # Altura de la barra de título
    return border_width * 2, border_height * 2 + title_bar_height

border_width, border_height = get_window_border_size()
print(border_width, border_height)
webview.create_window(
    'Danganronpa V3: Resolute Rebellion', 
    resource_path('src/index.html'),
    js_api=Api(),
    resizable=False,
    width=1280 + border_width + 8,
    height=720 + border_height + 8,
)
webview.start()


sys.exit(0)
print("Downloading mod...")
download_mod()
print('Finished downloading mod. Copying Reloaded Installation and installing the mod...')
extract_and_store_reloaded_installation()
try_delete_old_reloaded_configs()
try_delete_old_mod_versions()
extract_and_store_mod()
print('Finished installing the mod. Creating shortcut...')
create_shortcut()
print('All done!')