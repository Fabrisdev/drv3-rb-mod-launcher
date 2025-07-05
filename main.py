from window import start_gui
import sys

args = sys.argv[1:]
devMode = '--dev' in args
debugMode = '--debug' in args
start_gui(devMode, debugMode)