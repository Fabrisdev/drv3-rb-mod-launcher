from lib import *

print("Downloading mod...")
download_mod()
print('Finished downloading mod. Copying Reloaded Installation and installing the mod...')
extract_reloaded_installation()
copy_reloaded_installation_to_documents()
try_delete_old_reloaded_configs()
try_delete_old_mod_versions()
extract_and_store_mod()
print('Finished installing the mod. Creating shortcut...')
create_shortcut()
print('All done!')