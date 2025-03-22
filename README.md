![Main menu of the installer](https://i.imgur.com/ACjfFlC.png)
# Important information
This project is both a mod installer AND launcher for the Danganronpa V3 Killing Harmony's mod [Resolute Rebellion](https://gamebanana.com/mods/554968). In there, you can find the official and manual way of installing the mod. Also, a link to their Discord server can be found [here](https://discord.gg/CjV2GtRrP7).

No, this program adds nothing new to the mod. It just simplifies the installation process and makes it user friendly so anybody with no need for technical knowledge can try out their amazing mod. 
# Is it safe?
You can just go ahead and take a look on [VirusTotal](https://www.virustotal.com/gui/file/8a81554c6fda00e2702cd86570add6a42ac78693df73a1e3cc2a62fed52dc264) *(uploaded v1.4 game integrity checking update)*. Sadly it's not a perfect 0, 3/72 vendors flag it as malicious so if you happen to have one of those 3 vendors (most likely McAfee as it's widely known), you'll have to pause your antivirus temporarily before running it. I'm sorry for this but there's not much I can do. Antiviruses can be pretty stupid sometimes.
# Installation
It's simple! Just head to the `Releases` section of this repository and click on the latest **stable** version out. You'll find the executable *(.exe)* there. Just click on it to download it and once it downloaded it's as easy as double clicking it to run it!

However please note, that if you're using `Microsoft Edge` while downloading you may get a popup like this one
![Popup that may appear on Microsoft Edge](https://i.imgur.com/x8V2emS.png)

This is simply because it has not yet been downloaded enough times for `Edge` to trust it. Simply click on the three dots and then `Keep`.
![Keep anyway](https://i.imgur.com/77aijA7.png)

Or if you're feeling generous you can even click on `Report this file as safe` to help `Edge` flag it as safe.
# Compiling yourself
Do you not trust the prebuilt executable or would you like to help by contributing new features? Here's the steps to follow in order to download the source code and compile it yourself!
1. Get the source code
```sh
git clone https://github.com/Fabrisdev/drv3-rb-mod-launcher
```
2. Head into the just created directory
```sh
cd drv3-rb-mod-launcher
```
3. Open `autopytoexe`. This is a tool for compiling `Python` code into an exe.
```sh
.venv/Scripts/autopytoexe.exe
```
Once you open it you should see something like this:
![Autopytoexe opened](https://i.imgur.com/wVM6ISd.png)

4. Open up the settings section
![Settings section opened](https://i.imgur.com/ekZ1eTx.png)
5. Click on  `Import Config from JSON File`. A file picker will appear. You must select the file named `auto-py-to-exe-config.json`
![File selected](https://i.imgur.com/xj3K2um.png)
6. Once you've done that, it should now look like this:
![How it looks in the end](https://i.imgur.com/EcUpHpJ.png)

It's now ready for compiling. Just click on `CONVERT .PY TO .EXE` and wait for it to finish. The resulting .exe will be found in a folder named `output` in the same directory.
# Showcase
![Options section](https://i.imgur.com/3znHvgR.png)
![Alert that pops up when an already existing installation was found](https://i.imgur.com/sEl8SuL.png)
