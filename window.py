import webview
from lib import resource_path
from api import Api
from ctypes import windll
windll.user32.SetProcessDPIAware()

def get_window_border_size():
    user32 = windll.user32
    screen = user32.GetSystemMetrics
    border_width = screen(32)
    border_height = screen(33)
    title_bar_height = screen(4)
    return border_width * 2, border_height * 2 + title_bar_height

def start_gui():
    border_width, border_height = get_window_border_size()
    webview.create_window(
        'Danganronpa V3: Resolute Rebellion', 
        resource_path('src/index.html'),
        js_api=Api(),
        resizable=False,
        width=1280 + border_width + 8,
        height=720 + border_height + 8,
    )
    webview.start()