//=============================================================================
// Open Digital World - Multi-Language System Plugin - VisuStella MZ Patch
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.0.0] - Patch for VisuStella MZ plugins.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-plugin-multi-language-system
 * 
 * @orderAfter ODW_MultiLanguageSystem
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_OptionsCore
 * 
 * @help
 *-----------------------------------------------------------------------------
 * Open Digital World - Multi-Language System Plugin - VisuStella MZ Patch
 *-----------------------------------------------------------------------------
 * 
 * Plugin that corrects conflicts detected with VisuStella MZ plugins.
 * 
 * Compatibility:
 *   - ODW_MultiLanguageSystem v2.0.0+
 *   - VisuMZ_0_CoreEngine v1.76+
 *   - VisuMZ_1_OptionsCore v1.23+
 * 
 *-----------------------------------------------------------------------------
 * How to use
 *-----------------------------------------------------------------------------
 * 
 * Plug & play plugin to be installed in the right order into the list of
 * plugins. No further action required.
 * 
 * === You use VisuMZ_1_OptionsCore plugin? ===
 * 
 * Follow the instructions below to configure the language option in your
 * game. Only the parameters to be changed are shown. The others can remain at
 * their default values.
 * 
 * Symbol: mlsLanguageIndex
 *   - JS Text:
 *      return ODW.MLS.optionLabel();
 * Functions:
 *   - JS Draw Option:
 *      // Declare Constants
 *      const index = arguments[1];
 *      const title = this.commandName(index);
 *      const rect = this.itemLineRect(index);
 *      const halfWidth = rect.width / 2;
 *      // Draw Command Name
 *      this.resetFontSettings();
 *      this.changePaintOpacity(true);
 *      this.drawTextEx(title, rect.x, rect.y, halfWidth, "left");
 *      // Draw Status Text
 *      this.drawText(this.statusText(index), rect.x + halfWidth, rect.y, halfWidth, "center");
 *   - JS Process OK:
 *      // Perform Actions
 *      this.processOk();
 *   - JS Cursor Right:
 *      // Perform Actions
 *      this.cursorRight();
 *   - JS Cursor Left:
 *      // Perform Actions
 *      this.cursorLeft();
 * Data:
 *   - JS Default Value:
 *      // Declare Constants
 *      const symbol = arguments[1];
 *      // Perform Actions
 *      ConfigManager[symbol] = 0;
 * 
 *-----------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *-----------------------------------------------------------------------------
 * 
 * In principle, none.
 * 
 *-----------------------------------------------------------------------------
 * Support and feedbacks
 *-----------------------------------------------------------------------------
 * 
 * For plugin support, please join us here:
 * 
 * https://forums.rpgmakerweb.com/index.php?threads/odw-plugins-collection-releases.173595/
 * 
 *-----------------------------------------------------------------------------
 * Version history
 *-----------------------------------------------------------------------------
 * 
 * 25.05.2024 v1.0.0
 *   - Initial release.
 * 01.12.2024 v2.0.0
 *   - Bump to main plugin v2.0.0.
 *   - Updated plugin "how to use" header part.
 * 
 *-----------------------------------------------------------------------------
 * Terms of use - MIT License
 *-----------------------------------------------------------------------------
 * 
 * Copyright (c) 2024 Open Digital World
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 *-----------------------------------------------------------------------------
 */

var Imported = Imported || {};
Imported.ODW_MultiLanguageSystem_VisuStellaMZ = true;

var ODW = ODW || {};
ODW.MLS = ODW.MLS || {};
ODW.MLS.VisuStellaMZ = ODW.MLS.VisuStellaMZ || {};
ODW.MLS.VisuStellaMZ.pluginName = "ODW_MultiLanguageSystem_VisuStellaMZ";
ODW.MLS.VisuStellaMZ.pluginVersion = [2, 0, 0];

//=============================================================================
// Sprite_Name
//=============================================================================

ODW.MLS.VisuStellaMZ.Sprite_Name_name = Sprite_Name.prototype.name
Sprite_Name.prototype.name = function() {
	let name = ODW.MLS.VisuStellaMZ.Sprite_Name_name.call(this);
	if (Imported.VisuMZ_0_CoreEngine) {
		name = ODW.MLS.getText(name);
	}
	return name;
};

//=============================================================================
// Window_Options
//=============================================================================

ODW.MLS.VisuStellaMZ.Window_Options_refreshLanguage = Window_Options.prototype.refreshLanguage;
Window_Options.prototype.refreshLanguage = function() {
	ODW.MLS.VisuStellaMZ.Window_Options_refreshLanguage.call(this);
	if (Imported.VisuMZ_1_OptionsCore) {
		if (SceneManager._scene._categoryWindow) {
			SceneManager._scene._categoryWindow.refresh();
		}
		if (SceneManager._scene._helpWindow) {
			SceneManager._scene._helpWindow.refresh();
		}
	}
};
