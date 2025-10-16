//=============================================================================
// Open Digital World - Core Plugin v1.1.0
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.1.0] - Core functions and features for all ODW plugins.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-plugin-core
 * 
 * @help
 *-----------------------------------------------------------------------------
 * Open Digital World - Core Plugin
 *-----------------------------------------------------------------------------
 * 
 * This plugin is required by all ODW plugins to take advantage of the many
 * functions and features it offers, such as an automatic debug mode and the
 * loading of custom fonts for your game.
 * 
 *-----------------------------------------------------------------------------
 * How to use
 *-----------------------------------------------------------------------------
 * 
 * 1. Install and configure your plugin.
 * 
 * 2. If debug mode is active, the system will automatically activate the
 * following functions in playtest mode:
 *   - open the debug console
 *   - display the FPS counter
 * 
 * 3. Place your custom font files in the "fonts" folder at the root of your
 * game project, like this:
 * 
 *    RMMZ Project Folder
 *    |_ Fonts Folder
 *       |_ Font 0.woff
 *       |_ Font 1.woff
 * 
 * Important: the font names specified in the core plugin settings are those
 * to be used in other ODW plugins when you want to use them.
 * 
 * 4. Enable or disable 8-directions movement for map characters (player,
 * follower, event, vehicle). However, be sure to use 8-directions character
 * sprites, otherwise some movements may behave incorrectly (e.g. turning
 * towards the player).
 * 
 * 5. You can still manage player controls in 4 or 8 directions via the
 * plugin's commands without activating 8-direction movement for all characters
 * on the map.
 * 
 * See also README.md for more information about settings, commands, ...
 * 
 *-----------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *-----------------------------------------------------------------------------
 * 
 * Possibly with plugins that manage debugging tools and load custom fonts.
 * 
 * DISCLAIMER: This plugin offers no guarantee of compatibility with VisuStella
 * plugins or those of other creators. However, patches can be made available
 * on the itch.io download platform on request.
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
 * 01.12.2024 v1.0.0
 *   - Initial release.
 * 13.12.2024 v1.1.0
 *   - Improved the global code.
 *   - Fixed issue with follower movement when player is dashing.
 *   - Added management of map character movements in 8 directions.
 *   - Added plugin commands to enable/disable 8 directions input for player controls.
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
 * 
 * 
 * @param debugMode
 * @text Debug Mode
 * @desc Indicates whether the debug mode is enabled or not.
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * 
 * @param customFonts
 * @text Custom Fonts
 * @desc The list of custom fonts.
 * @type struct<customFont>[]
 * @default []
 * 
 * @param character8D
 * @text Character 8D Movements
 * @desc Indicates whether the 8-directional movements of characters on maps are enabled or not.
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * 
 * 
 * @command enableInput8D
 * @text Enable 8-Directional Input
 * @desc Enables the 8-directional input for player controls.
 * 
 * 
 * @command disableInput8D
 * @text Disable 8-Directional Input
 * @desc Disables the 8-directional input for player controls.
 */

/*~struct~customFont:
 * @param name
 * @text Font Name
 * @desc The name that will be used to recognize the font.
 * @type string
 * 
 * @param file
 * @text Font File
 * @desc The font file in the /fonts folder.
 * @type string
 */

var Imported = Imported || {};
Imported.ODW = true;
Imported.ODW_Core = true;

var ODW = ODW || {};
ODW.Core = ODW.Core || {};
ODW.Core.pluginName = "ODW_Core";
ODW.Core.pluginVersion = [1, 1, 0];

//=============================================================================
// Core Functions
//=============================================================================

(($) => {

	'use strict';

	/*
	 *-----------------------------------------------------------------------------
	 * DATA
	 *-----------------------------------------------------------------------------
	 * These functions can be used to format data from plugin settings or plugin
	 * command parameters into the desired output type.
	 */

	/*
	 * Convert a text into a formated string.
	 * 
	 * @param string The text to convert
	 * 
	 * @return string
	 */
	$.string = function(text) {
		if (text) {
			return String(text).trim();
		}
		return "";
	};

	/*
	 * Convert a text into an integer number.
	 * 
	 * @param string The text to convert
	 * 
	 * @return number
	 */
	$.integer = function(text) {
		if (text) {
			const number = Number.parseInt(text);
			if (!isNaN(number)) {
				return number;
			}
		}
		return 0;
	};

	/*
	 * Convert a text into an float number.
	 * 
	 * @param string The text to convert
	 * 
	 * @return number
	 */
	$.float = function(text) {
		if (text) {
			const number = Number.parseFloat(text);
			if (!isNaN(number)) {
				return number;
			}
		}
		return 0;
	};

	/*
	 * Convert a text into a boolean.
	 * 
	 * @param string The text to convert
	 * 
	 * @return boolean
	 */
	$.boolean = function(text) {
		if (text === "true") {
			return true;
		}
		return false;
	};

	/*
	 * Convert a JSON text into an array.
	 * 
	 * @param string The text to convert
	 * 
	 * @return array
	 */
	$.array = function(text) {
		if (text) {
			return JSON.parse(text);
		}
		return [];
	};

	/*
	 * Convert a JSON text into an array of strings.
	 * 
	 * @param string The text to convert
	 * 
	 * @return array of strings
	 */
	$.arrayString = function(text) {
		if (text) {
			return JSON.parse(text).map((e) => {return this.string(e)});
		}
		return [];
	};

	/*
	 * Convert a JSON text into an array of integers.
	 * 
	 * @param string The text to convert
	 * 
	 * @return array of integers
	 */
	$.arrayInteger = function(text) {
		if (text) {
			return JSON.parse(text).map((e) => {return this.integer(e)});
		}
		return [];
	};

	/*
	 * Convert a JSON text into an array of floats.
	 * 
	 * @param string The text to convert
	 * 
	 * @return array of floats
	 */
	$.arrayFloat = function(text) {
		if (text) {
			return JSON.parse(text).map((e) => {return this.float(e)});
		}
		return [];
	};

	/*
	 * Convert a JSON text into an array of booleans.
	 * 
	 * @param string The text to convert
	 * 
	 * @return array of booleans
	 */
	$.arrayBoolean = function(text) {
		if (text) {
			return JSON.parse(text).map((e) => {return this.boolean(e)});
		}
		return [];
	};

	/*
	 * Convert a JSON text into an array of objects.
	 * 
	 * @param string The text to convert
	 * 
	 * @return array of objects
	 */
	$.arrayObject = function(text) {
		if (text) {
			return JSON.parse(text).map((e) => {return JSON.parse(e)});
		}
		return [];
	};

	/*
	 * Convert a JSON text into script.
	 * 
	 * @param string The text to convert
	 * 
	 * @return string
	 */
	$.script = function(text) {
		return JSON.parse(text);
	};

	/*
	 * Convert a text v[id] into a variable value.
	 * 
	 * @param string The text to convert
	 * 
	 * @return string|number|boolean|array
	 */
	$.variable = function(text){
		let variable = this.string(text);
		if (variable.match(/V\u005B\d+\u005D/gi)) {
			variable = variable.replace("V[", "").replace("v[", "").replace("]", "");
			variable = this.integer(variable);
			if (variable > 0) {
				return $gameVariables.value(variable);
			}
		}
		return text; // Return the original text for recursive conversion.
	};

	/*
	 * Convert a text into a color string.
	 *
	 * @param string The text to convert
	 * @param string The type of color
	 *
	 * @return string
	 */
	$.color = function(text, type = "text") {
		let color = this.string(text);
		if (color !== "") {
			if (color.match(/#[0-9ABCDEF]{6}/i)) {
				return color;
			}
			if (color.match(/rgba\(\d+,\s?\d+,\s?\d+,\s?\d+.?\d*\)$/)) {
				return color;
			}
			color = this.integer(color);
			if (0 <= color && color <= 31) {
				return ColorManager.textColor(color);
			}
		}
		switch (type) {
			case "text":    return ColorManager.normalColor();
			case "outline": return ColorManager.outlineColor();
			default:        return ColorManager.normalColor();
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * CORE SETTINGS
	 *-----------------------------------------------------------------------------
	 * These functions can be used to format specific data from the RMMZ editor.
	 */

	/*
	 * Convert an origin point into coordinates.
	 * 
	 * @param string The origin point to convert
	 * 
	 * @return object
	 */
	$.origin = function(origin = "Top Left") {
		switch (origin) {
			case "Top Left":      return {x: 0, y: 0};
			case "Top Center":    return {x: 0.5, y: 0};
			case "Top Right":     return {x: 1, y: 0};
			case "Middle Left":   return {x: 0, y: 0.5};
			case "Middle Center": return {x: 0.5, y: 0.5};
			case "Middle Right":  return {x: 1, y: 0.5};
			case "Bottom Left":   return {x: 0, y: 1};
			case "Bottom Center": return {x: 0.5, y: 1};
			case "Bottom Right":  return {x: 1, y: 1};
			default:              return {x: 0, y: 0};
		}
	};

	/*
	 * Convert a blend mode into a number.
	 * 
	 * @param string The blend mode to convert
	 * 
	 * @return number
	 */
	$.blendMode = function(blendMode = "Normal") {
		switch (blendMode) {
			case "Normal":   return 0;
			case "Additive": return 1;
			case "Multiply": return 2;
			case "Screen":   return 3;
			default:         return 0;
		}
	};

	/*
	 * Convert an easing type into a number.
	 * 
	 * @param string The easing type to convert
	 * 
	 * @return number
	 */
	$.easingType = function(easingType = "Linear") {
		switch (easingType) {
			case "Linear":         return 0;
			case "Slow Start":     return 1;
			case "Slow End":       return 2;
			case "Slow Start End": return 3;
			default:               return 0;
		}
	};

	/*
	 * Convert a background type into a number.
	 * 
	 * @param string The background type to convert
	 * 
	 * @return number
	 */
	$.backgroundType = function(backgroundType = "Window") {
		switch (backgroundType) {
			case "Window":      return 0;
			case "Dim":         return 1;
			case "Transparent": return 2;
			default:            return 0;
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * PLUGIN SETTINGS
	 *-----------------------------------------------------------------------------
	 * These functions can be used to format specific data from ODW plugins.
	 */

	/*
	 * Convert an alignement.
	 * 
	 * @param string The alignement to convert (Left, Center, Right)
	 * 
	 * @return string
	 */
	$.align = function(align = "Center") {
		const alignTemp = this.string(align);
		const alignCheck = ["Left", "Center", "Right"];
		if (alignCheck.includes(alignTemp)) {
			return alignTemp.toLowerCase();
		}
		return "center";
	};

	/*
	 * Return whether the alignement type is left.
	 * 
	 * @param string The alignement
	 * 
	 * @return boolean
	 */
	$.isAlignLeft = function(align) {
		return align === "left";
	};

	/*
	 * Return whether the alignement type is center.
	 * 
	 * @param string The alignement
	 * 
	 * @return boolean
	 */
	$.isAlignCenter = function(align) {
		return align === "center";
	};

	/*
	 * Return whether the alignement type is right.
	 * 
	 * @param string The alignement
	 * 
	 * @return boolean
	 */
	$.isAlignRight = function(align) {
		return align === "right";
	};

	/*
	 * Convert an orientation.
	 * 
	 * @param string The orientation to convert (Vertical, Horizontal)
	 * 
	 * @return string
	 */
	$.orientation = function(orientation = "Vertical") {
		const orientationTemp = this.string(orientation);
		const orientationCheck = ["Vertical", "Horizontal"];
		if (orientationCheck.includes(orientationTemp)) {
			return orientationTemp.toLowerCase();
		}
		return "vertical";
	};

	/*
	 * Return whether the orientation is vertical.
	 * 
	 * @param string The orientation
	 * 
	 * @return boolean
	 */
	$.isOrientationVertical = function(orientation) {
		return orientation === "vertical";
	};

	/*
	 * Return whether the orientation is horizontal.
	 * 
	 * @param string The orientation
	 * 
	 * @return boolean
	 */
	$.isOrientationHorizontal = function(orientation) {
		return orientation === "horizontal";
	};

	/*
	 * Convert a reference.
	 * 
	 * @param string The reference to convert (Absolute, Relative)
	 * 
	 * @return string
	 */
	$.reference = function(reference = "Absolute") {
		const referenceTemp = this.string(reference);
		const referenceCheck = ["Absolute", "Relative"];
		if (referenceCheck.includes(referenceTemp)) {
			return referenceTemp.toLowerCase();
		}
		return "absolute";
	};

	/*
	 * Return whether the reference is absolute.
	 * 
	 * @param string The reference
	 * 
	 * @return boolean
	 */
	$.isReferenceAbsolute = function(reference) {
		return reference === "absolute";
	};

	/*
	 * Return whether the reference is relative.
	 * 
	 * @param string The reference
	 * 
	 * @return boolean
	 */
	$.isReferenceRelative = function(reference) {
		return reference === "relative";
	};

	/*
	 *-----------------------------------------------------------------------------
	 * FONTS
	 *-----------------------------------------------------------------------------
	 * These functions can be used to format fonts.
	 */

	/*
	 * Convert a font name.
	 * 
	 * @param string The font name to convert
	 * 
	 * @return string
	 */
	$.fontName = function(fontName = "") {
		const fontNameTemp = this.string(fontName);
		return fontNameTemp !== "" ? fontNameTemp : "rmmz-mainfont";
	};

	/*
	 * Convert a font size.
	 * 
	 * @param string The font size to convert
	 * 
	 * @return number
	 */
	$.fontSize = function(fontSize = "0") {
		const fontSizeTemp = this.integer(fontSize);
		return fontSizeTemp > 0 ? fontSizeTemp : $dataSystem.advanced.fontSize;
	};

	/*
	 * Convert a font style.
	 * 
	 * @param string The font style to convert (Normal, Italic, Bold, Italic Bold)
	 * 
	 * @return string
	 */
	$.fontStyle = function(fontStyle = "Normal") {
		const fontStyleTemp = this.string(fontStyle);
		const fontStyleCheck = ["Normal", "Italic", "Bold", "Italic Bold"];
		if (fontStyleCheck.includes(fontStyleTemp)) {
			return fontStyleTemp.toLowerCase();
		}
		return "normal";
	};

	/*
	 * Return whether the font style is italic.
	 * 
	 * @param string The font style
	 * 
	 * @return boolean
	 */
	$.isFontStyleItalic = function(fontStyle) {
		return fontStyle === "italic" || fontStyle === "italic bold";
	};

	/*
	 * Return whether the font style is bold.
	 * 
	 * @param string The font style
	 * 
	 * @return boolean
	 */
	$.isFontStyleBold = function(fontStyle) {
		return fontStyle === "bold" || fontStyle === "italic bold";
	};

	/*
	 * Convert a text color.
	 * 
	 * @param string The text color to convert
	 * 
	 * @return string
	 */
	$.textColor = function(textColor = "") {
		return this.color(textColor, "text");
	};

	/*
	 * Convert an outline color.
	 * 
	 * @param string The outline color to convert
	 * 
	 * @return string
	 */
	$.outlineColor = function(outlineColor = "") {
		return this.color(outlineColor, "outline");
	};

	/*
	 * Convert an outline width.
	 * 
	 * @param string The outline width to convert
	 * 
	 * @return number
	 */
	$.outlineWidth = function(outlineWidth = "0") {
		const outlineWidthTemp = this.integer(outlineWidth);
		if (0 <= outlineWidthTemp && outlineWidthTemp <= 12) {
			return outlineWidthTemp;
		}
		return 0;
	};

	/*
	 *-----------------------------------------------------------------------------
	 * DIRECTIONS
	 *-----------------------------------------------------------------------------
	 * These functions can be used to format character directions.
	 */

	/*
	 * Return the coordinates from its direction.
	 * 
	 * @param number The direction
	 * 
	 * @return array
	 */
	$.directionCoordinates = function(direction) {
		switch (direction) {
			case 1:  return [4,2];	// Down Left
			case 2:  return [0,2];	// Down
			case 3:  return [6,2];	// Down Right
			case 4:  return [4,0];	// Left
			case 6:  return [6,0];	// Right
			case 7:  return [4,8];	// Up Left
			case 8:  return [0,8];	// Up
			case 9:  return [6,8];	// Up Right
			default: return [0,0];	// No direction / Current direction
		}
	};

	/*
	 * Return the numpad key from its direction.
	 * 
	 * @param number The direction
	 * 
	 * @return string
	 */
	$.directionNumpad = function(direction) {
		switch (direction) {
			case 1:  return "1";	// Down Left
			case 2:  return "2";	// Down
			case 3:  return "3";	// Down Right
			case 4:  return "4";	// Left
			case 6:  return "6";	// Right
			case 7:  return "7";	// Up Left
			case 8:  return "8";	// Up
			case 9:  return "9";	// Up Right
			default: return "";		// No direction / Current direction
		}
	};

	/*
	 * Return the cardinal points from its direction.
	 * 
	 * @param number The direction
	 * 
	 * @return string
	 */
	$.directionCompass = function(direction) {
		switch (direction) {
			case 1:  return "sw";	// Down Left
			case 2:  return "s";	// Down
			case 3:  return "se";	// Down Right
			case 4:  return "w";	// Left
			case 6:  return "e";	// Right
			case 7:  return "nw";	// Up Left
			case 8:  return "n";	// Up
			case 9:  return "ne";	// Up Right
			default: return "";		// No direction / Current direction
		}
	};

	/*
	 * Return the direction from its coordinates.
	 * 
	 * @param number The horizontal input
	 * @param number The vertical input
	 * 
	 * @return number
	 */
	$.coordinatesDirection = function(horz, vert) {
		if (horz === 4 && vert === 2) return 1;	// Down Left
		if (horz === 0 && vert === 2) return 2;	// Down
		if (horz === 6 && vert === 2) return 3;	// Down Right
		if (horz === 4 && vert === 0) return 4;	// Left
		if (horz === 6 && vert === 0) return 6;	// Right
		if (horz === 4 && vert === 8) return 7;	// Up Left
		if (horz === 0 && vert === 8) return 8;	// Up
		if (horz === 6 && vert === 8) return 9;	// Up Right
		return 0;								// No direction / Current direction
	};

	/*
	 * Return the direction from its delta position.
	 * 
	 * @param number The delta X
	 * @param number The delta Y
	 * 
	 * @return number
	 */
	$.deltaDirection = function(deltaX, deltaY) {
		if (deltaX < 0 && deltaY > 0)   return 1;	// Down Left
		if (deltaX === 0 && deltaY > 0) return 2;	// Down
		if (deltaX > 0 && deltaY > 0)   return 3;	// Down Right
		if (deltaX < 0 && deltaY === 0) return 4;	// Left
		if (deltaX > 0 && deltaY === 0) return 6;	// Right
		if (deltaX < 0 && deltaY < 0)   return 7;	// Up Left
		if (deltaX === 0 && deltaY < 0) return 8;	// Up
		if (deltaX > 0 && deltaY < 0)   return 9;	// Up Right
		return 0;									// No direction / Current direction
	};

	/*
	 * Return the direction from its from its label.
	 * 
	 * @param string The label
	 * 
	 * @return number
	 */
	$.labelDirection = function(label) {
		switch (label) {
			case "Down Left":  return 1;	// Down Left
			case "Down":       return 2;	// Down
			case "Down Right": return 3;	// Down Right
			case "Left":       return 4;	// Left
			case "Right":      return 6;	// Right
			case "Up Left":    return 7;	// Up Left
			case "Up":         return 8;	// Up
			case "Up Right":   return 9;	// Up Right
			default:           return 0;	// No direction / Current direction
		}
	};

	/*
	 * Return a random direction.
	 * 
	 * @return number
	 */
	$.randomDirection = function() {
		let direction = Math.randomInt(10);
		if (direction === 0) {
			direction = 1;
		}
		if (direction === 5) {
			direction = 4 + Math.randomInt(2) * 2;
		}
		return direction;
	};

	/*
	 * Return the indication of a straight direction.
	 * 
	 * @param number The direction
	 * 
	 * @return boolean
	 */
	$.isStraightDirection = function(direction) {
		return [2, 4, 6, 8].includes(direction);
	};

	/*
	 * Return the indication of a diagonal direction.
	 * 
	 * @param number The direction
	 * 
	 * @return boolean
	 */
	$.isDiagonalDirection = function(direction) {
		return [1, 3, 7, 9].includes(direction);
	};

	/*
	 * Return the indication of a lower direction.
	 * 
	 * @param number The direction
	 * 
	 * @return boolean
	 */
	$.isLowDirection = function(direction) {
		return [1, 2, 3].includes(direction);
	};	

	/*
	 * Return the indication of a left direction.
	 * 
	 * @param number The direction
	 * 
	 * @return boolean
	 */
	$.isLeftDirection = function(direction) {
		return [1, 4, 7].includes(direction);
	};

	/*
	 * Return the indication of a right direction.
	 * 
	 * @param number The direction
	 * 
	 * @return boolean
	 */
	$.isRightDirection = function(direction) {
		return [3, 6, 9].includes(direction);
	};

	/*
	 * Return the indication of an upper direction.
	 * 
	 * @param number The direction
	 * 
	 * @return boolean
	 */
	$.isUpDirection = function(direction) {
		return [7, 8, 9].includes(direction);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * CHARACTERS
	 *-----------------------------------------------------------------------------
	 * These functions can be used to manage character objects.
	 */

	/*
	 * Return the game character object from a character ID.
	 * 
	 * @param number The character ID
	 * @param number The current event ID
	 * 
	 * @return object|null
	 */
	$.character = function(characterId, currentEventId) {
		if (characterId === 0 && currentEventId > 0) {
			return $gameMap.event(currentEventId);
		}
		if (characterId === -1) {
			return $gamePlayer;
		}
		if (characterId < -1) {
			return $gamePlayer.followers().follower(Math.abs(characterId) - 2);
		}
		if (characterId > 0 && characterId <= $gameMap.events().length) {
			return $gameMap.event(characterId);
		}
		return null;
	};

	/*
	 * Refresh all the characters settings.
	 * 
	 * @return void
	 */
	$.refreshCharacters = function() {
		$gamePlayer.refresh();
		for (const event of $gameMap.events()) {
			event.refresh();
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LOG
	 *-----------------------------------------------------------------------------
	 * These functions can be used to log informations into the console.
	 */

	/*
	 * Log the plugin errors.
	 * 
	 * @param string The plugin name
	 * @param string The plugin error
	 * 
	 * @return void
	 */
	$.logError = function(pluginName, pluginError) {
		if ($gameTemp.isPlaytest()) {
			console.log("Plugin: " + pluginName + "\nError: " + pluginError);
		}
	};

})(ODW);

//=============================================================================
// Core Features
//=============================================================================

(($) => {

	'use strict';

	/*
	 *-----------------------------------------------------------------------------
	 * PLUGIN SETTINGS
	 *-----------------------------------------------------------------------------
	 */

	const pluginParams = PluginManager.parameters(ODW.Core.pluginName);

	// Declare plugin params.
	$._debugMode = pluginParams.debugMode;
	$._customFonts = pluginParams.customFonts;
	$._character8D = pluginParams.character8D;

	/*
	 *-----------------------------------------------------------------------------
	 * DEBUG
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the indicator whether the debug mode is active or not.
	 * 
	 * @return boolean
	 */
	$.debugMode = function() {
		return ODW.boolean(this._debugMode);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * FONTS
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the list of custom fonts.
	 * 
	 * @return array of objects
	 */
	$.customFonts = function() {
		return ODW.arrayObject(this._customFonts);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * CHARACTER 8D
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the indicator whether the 8-directional movements of characters on maps are enabled or not.
	 * 
	 * @return boolean
	 */
	$.character8D = function() {
		return ODW.boolean(this._character8D);
	};

})(ODW.Core);

//=============================================================================
// PluginManager
//=============================================================================

PluginManager.registerCommand(ODW.Core.pluginName, "enableInput8D", args => {
	$gamePlayer.enableInput8D();
});

PluginManager.registerCommand(ODW.Core.pluginName, "disableInput8D", args => {
	$gamePlayer.disableInput8D();
});

//=============================================================================
//  00000    00000   000000   0000000
// 0     0  0     0  0     0  0
// 0        0     0  0     0  0
// 0        0     0  000000   00000
// 0        0     0  0   0    0
// 0     0  0     0  0    0   0
//  00000    00000   0     0  0000000
//=============================================================================

// New global variables.
$gameEnemies = null;

//=============================================================================
// DataManager
//=============================================================================

ODW.Core.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
	ODW.Core.DataManager_createGameObjects.call(this);
	$gameEnemies = new Game_Enemies();
};

ODW.Core.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	const contents = ODW.Core.DataManager_makeSaveContents.call(this);
	contents.enemies = $gameEnemies;
	return contents;
};

ODW.Core.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	ODW.Core.DataManager_extractSaveContents.call(this, contents);
	$gameEnemies = contents.enemies;
};

//=============================================================================
//  00000   000000   0000000  0000000   00000   0000000
// 0     0  0     0        0  0        0     0     0
// 0     0  0     0        0  0        0           0
// 0     0  000000         0  00000    0           0
// 0     0  0     0        0  0        0           0
// 0     0  0     0  0     0  0        0     0     0
//  00000   000000    00000   0000000   00000      0
//=============================================================================

//=============================================================================
// Game_Map
//=============================================================================

ODW.Core.Game_Map_xWithDirection = Game_Map.prototype.xWithDirection;
Game_Map.prototype.xWithDirection = function(x, d) {
	if (ODW.Core.character8D() || $gamePlayer.input8D()) {
		if (ODW.isLeftDirection(d)) {
			return x - 1;
		}
		if (ODW.isRightDirection(d)) {
			return x + 1;
		}
		return x;
	} else {
		return ODW.Core.Game_Map_xWithDirection.call(this, x, d);
	}
};

ODW.Core.Game_Map_yWithDirection = Game_Map.prototype.yWithDirection;
Game_Map.prototype.yWithDirection = function(y, d) {
	if (ODW.Core.character8D() || $gamePlayer.input8D()) {
		if (ODW.isLowDirection(d)) {
			return y + 1;
		}
		if (ODW.isUpDirection(d)) {
			return y - 1;
		}
		return y;
	} else {
		return ODW.Core.Game_Map_yWithDirection.call(this, y, d);
	}
};

ODW.Core.Game_Map_roundXWithDirection = Game_Map.prototype.roundXWithDirection;
Game_Map.prototype.roundXWithDirection = function(x, d) {
	if (ODW.Core.character8D() || $gamePlayer.input8D()) {
		if (ODW.isLeftDirection(d)) {
			return this.roundX(x - 1);
		}
		if (ODW.isRightDirection(d)) {
			return this.roundX(x + 1);
		}
		return this.roundX(x);
	} else {
		return ODW.Core.Game_Map_roundXWithDirection.call(this, x, d);
	}
};

ODW.Core.Game_Map_roundYWithDirection = Game_Map.prototype.roundYWithDirection;
Game_Map.prototype.roundYWithDirection = function(y, d) {
	if (ODW.Core.character8D() || $gamePlayer.input8D()) {
		if (ODW.isLowDirection(d)) {
			return this.roundY(y + 1);
		}
		if (ODW.isUpDirection(d)) {
			return this.roundY(y - 1);
		}
		return this.roundY(y);
	} else {
		return ODW.Core.Game_Map_roundYWithDirection.call(this, y, d);
	}
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

ODW.Core.Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function(d) {
	if (ODW.Core.character8D()) {
		this.setMovementSuccess(this.canPass(this._x, this._y, d));
		if (this.isMovementSucceeded()) {
			this._x = $gameMap.roundXWithDirection(this._x, d);
			this._y = $gameMap.roundYWithDirection(this._y, d);
			this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
			this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
			this.increaseSteps();
		} else {
			this.checkEventTriggerTouchFront(d);
		}
		this.setDirection(d);
	} else {
		ODW.Core.Game_CharacterBase_moveStraight.call(this, d);
	}
};

ODW.Core.Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
	if (ODW.Core.character8D()) {
		this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));
		if (this.isMovementSucceeded()) {
			this._x = $gameMap.roundXWithDirection(this._x, horz);
			this._y = $gameMap.roundYWithDirection(this._y, vert);
			this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
			this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
			this.increaseSteps();
		} else {
			this.checkEventTriggerTouchFront(ODW.coordinatesDirection(horz, vert));
		}
		if (this._direction === this.reverseDir(horz)) {
			this.setDirection(horz);
		}
		if (this._direction === this.reverseDir(vert)) {
			this.setDirection(vert);
		}
	} else {
		ODW.Core.Game_CharacterBase_moveDiagonally.call(this, horz, vert);
	}
};

ODW.Core.Game_CharacterBase_jump = Game_CharacterBase.prototype.jump;
Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
	if (ODW.Core.character8D()) {
		this._x += xPlus;
		this._y += yPlus;
		const distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
		this._jumpPeak = 10 + distance - this.moveSpeed();
		this._jumpCount = this._jumpPeak * 2;
		this.resetStopCount();
		this.straighten();
		if (Math.abs(xPlus) > Math.abs(yPlus)) {
			if (xPlus !== 0) {
				this.setDirection(xPlus < 0 ? 4 : 6);
			}
		} else {
			if (yPlus !== 0) {
				this.setDirection(yPlus < 0 ? 8 : 2);
			}
		}
	} else {
		ODW.Core.Game_CharacterBase_jump.call(this, xPlus, yPlus);
	}
};

// New function.
Game_CharacterBase.prototype.enableDashing = function() {
	this._dashing = true;
};

// New function.
Game_CharacterBase.prototype.disableDashing = function() {
	this._dashing = false;
};

//=============================================================================
// Game_Character
//=============================================================================

ODW.Core.Game_Character_moveRandom = Game_Character.prototype.moveRandom;
Game_Character.prototype.moveRandom = function() {
	if (ODW.Core.character8D()) {
		const direction = ODW.randomDirection();
		const coordinates = ODW.directionCoordinates(direction);
		if (ODW.isStraightDirection(direction) && this.canPass(this.x, this.y, direction)) {
			this.moveStraight(direction);
		}
		if (ODW.isDiagonalDirection(direction) && this.canPassDiagonally(this.x, this.y, coordinates[0], coordinates[1])) {
			this.moveDiagonally(coordinates[0], coordinates[1]);
		}
	} else {
		ODW.Core.Game_Character_moveRandom.call(this);
	}
};

ODW.Core.Game_Character_moveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
Game_Character.prototype.moveTowardCharacter = function(character) {
	if (ODW.Core.character8D()) {
		const sx = -1 * this.deltaXFrom(character.x);
		const sy = -1 * this.deltaYFrom(character.y);
		const direction = ODW.deltaDirection(sx, sy);
		const coordinates = ODW.directionCoordinates(direction);
		if (ODW.isStraightDirection(direction) && this.canPass(this.x, this.y, direction)) {
			this.moveStraight(direction);
		}
		if (ODW.isDiagonalDirection(direction) && this.canPassDiagonally(this.x, this.y, coordinates[0], coordinates[1])) {
			this.moveDiagonally(coordinates[0], coordinates[1]);
		}
	} else {
		ODW.Core.Game_Character_moveTowardCharacter.call(this, character);
	}
};

ODW.Core.Game_Character_moveAwayFromCharacter = Game_Character.prototype.moveAwayFromCharacter;
Game_Character.prototype.moveAwayFromCharacter = function(character) {
	if (ODW.Core.character8D()) {
		const sx = this.deltaXFrom(character.x);
		const sy = this.deltaYFrom(character.y);
		const direction = ODW.deltaDirection(sx, sy);
		const coordinates = ODW.directionCoordinates(direction);
		if (ODW.isStraightDirection(direction) && this.canPass(this.x, this.y, direction)) {
			this.moveStraight(direction);
		}
		if (ODW.isDiagonalDirection(direction) && this.canPassDiagonally(this.x, this.y, coordinates[0], coordinates[1])) {
			this.moveDiagonally(coordinates[0], coordinates[1]);
		}
	} else {
		ODW.Core.Game_Character_moveAwayFromCharacter.call(this, character);
	}
};

ODW.Core.Game_Character_turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
Game_Character.prototype.turnTowardCharacter = function(character) {
	if (ODW.Core.character8D()) {
		const sx = -1 * this.deltaXFrom(character.x);
		const sy = -1 * this.deltaYFrom(character.y);
		this.setDirection(ODW.deltaDirection(sx, sy));
	} else {
		ODW.Core.Game_Character_turnTowardCharacter.call(this, character);
	}
};

ODW.Core.Game_Character_turnAwayFromCharacter = Game_Character.prototype.turnAwayFromCharacter;
Game_Character.prototype.turnAwayFromCharacter = function(character) {
	if (ODW.Core.character8D()) {
		const sx = this.deltaXFrom(character.x);
		const sy = this.deltaYFrom(character.y);
		this.setDirection(ODW.deltaDirection(sx, sy));
	} else {
		ODW.Core.Game_Character_turnAwayFromCharacter.call(this, character);
	}
};

ODW.Core.Game_Character_moveForward = Game_Character.prototype.moveForward;
Game_Character.prototype.moveForward = function() {
	if (ODW.Core.character8D()) {
		const direction = this.direction();
		const coordinates = ODW.directionCoordinates(direction);
		if (ODW.isStraightDirection(direction)) {
			this.moveStraight(direction);
		}
		if (ODW.isDiagonalDirection(direction)) {
			this.moveDiagonally(coordinates[0], coordinates[1]);
		}
	} else {
		ODW.Core.Game_Character_moveForward.call(this);
	}
};

ODW.Core.Game_Character_moveBackward = Game_Character.prototype.moveBackward;
Game_Character.prototype.moveBackward = function() {
	if (ODW.Core.character8D()) {
		const direction = this.reverseDir(this.direction());
		const coordinates = ODW.directionCoordinates(direction);
		const lastDirectionFix = this.isDirectionFixed();
		this.setDirectionFix(true);
		if (ODW.isStraightDirection(direction)) {
			this.moveStraight(direction);
		}
		if (ODW.isDiagonalDirection(direction)) {
			this.moveDiagonally(coordinates[0], coordinates[1]);
		}
		this.setDirectionFix(lastDirectionFix);
	} else {
		ODW.Core.Game_Character_moveBackward.call(this);
	}
};

ODW.Core.Game_Character_turnRight90 = Game_Character.prototype.turnRight90;
Game_Character.prototype.turnRight90 = function() {
	if (ODW.Core.character8D()) {
		switch (this.direction()) {
			case 1:
				this.setDirection(7);
				break;
			case 2:
				this.setDirection(4);
				break;
			case 3:
				this.setDirection(1);
				break;
			case 4:
				this.setDirection(8);
				break;
			case 6:
				this.setDirection(2);
				break;
			case 7:
				this.setDirection(9);
				break;
			case 8:
				this.setDirection(6);
				break;
			case 9:
				this.setDirection(3);
				break;
		}
	} else {
		ODW.Core.Game_Character_turnRight90.call(this);
	}
};

ODW.Core.Game_Character_turnLeft90 = Game_Character.prototype.turnLeft90;
Game_Character.prototype.turnLeft90 = function() {
	if (ODW.Core.character8D()) {
		switch (this.direction()) {
			case 1:
				this.setDirection(3);
				break;
			case 2:
				this.setDirection(6);
				break;
			case 3:
				this.setDirection(9);
				break;
			case 4:
				this.setDirection(2);
				break;
			case 6:
				this.setDirection(8);
				break;
			case 7:
				this.setDirection(1);
				break;
			case 8:
				this.setDirection(4);
				break;
			case 9:
				this.setDirection(7);
				break;
		}
	} else {
		ODW.Core.Game_Character_turnLeft90.call(this);
	}
};

ODW.Core.Game_Character_turnRandom = Game_Character.prototype.turnRandom;
Game_Character.prototype.turnRandom = function() {
	if (ODW.Core.character8D()) {
		this.setDirection(ODW.randomDirection());
	} else {
		ODW.Core.Game_Character_turnRandom.call(this);
	}
};

// New function.
Game_Character.prototype.findDirectionTo8D = function(goalX, goalY) {
	const searchLimit = this.searchLimit();
	const mapWidth = $gameMap.width();
	const nodeList = [];
	const openList = [];
	const closedList = [];
	const start = {};
	let best = start;

	if (this.x === goalX && this.y === goalY) {
		return 0;
	}

	start.parent = null;
	start.x = this.x;
	start.y = this.y;
	start.g = 0;
	start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
	nodeList.push(start);
	openList.push(start.y * mapWidth + start.x);

	while (nodeList.length > 0) {
		let bestIndex = 0;
		for (let i = 0; i < nodeList.length; i++) {
			if (nodeList[i].f < nodeList[bestIndex].f) {
				bestIndex = i;
			}
		}

		const current = nodeList[bestIndex];
		const x1 = current.x;
		const y1 = current.y;
		const pos1 = y1 * mapWidth + x1;
		const g1 = current.g;

		nodeList.splice(bestIndex, 1);
		openList.splice(openList.indexOf(pos1), 1);
		closedList.push(pos1);

		if (current.x === goalX && current.y === goalY) {
			best = current;
			break;
		}

		if (g1 >= searchLimit) {
			continue;
		}

		for (let j = 1; j < 10; j++) {
			if (j !== 5) {
				const direction = j;
				const x2 = $gameMap.roundXWithDirection(x1, direction);
				const y2 = $gameMap.roundYWithDirection(y1, direction);
				const pos2 = y2 * mapWidth + x2;
	
				if (closedList.includes(pos2)) {
					continue;
				}
				if (!this.canPass(x1, y1, direction)) {
					continue;
				}
	
				const g2 = g1 + 1;
				const index2 = openList.indexOf(pos2);
	
				if (index2 < 0 || g2 < nodeList[index2].g) {
					let neighbor = {};
					if (index2 >= 0) {
						neighbor = nodeList[index2];
					} else {
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) {
						best = neighbor;
					}
				}
			}
		}
	}

	let node = best;
	while (node.parent && node.parent !== start) {
		node = node.parent;
	}

	const deltaX = $gameMap.deltaX(node.x, start.x);
	const deltaY = $gameMap.deltaY(node.y, start.y);
	return ODW.deltaDirection(deltaX, deltaY);

};

// New function.
Game_Character.prototype.moveToXY = function(x, y) {
	const direction = ODW.Core.character8D() ? this.findDirectionTo8D(x, y) : this.findDirectionTo(x, y);
	if (direction > 0) {
		if (ODW.Core.character8D()) {
			if (ODW.isStraightDirection(direction)) {
				this.moveStraight(direction);
			}
			if (ODW.isDiagonalDirection(direction)) {
				const coordinates = ODW.directionCoordinates(direction);
				this.moveDiagonally(coordinates[0], coordinates[1]);
			}
		} else {
			this.moveStraight(direction);
		}
	}
};

// New function.
Game_Character.prototype.jumpDistance = function(distance) {
	let xPlus = 0;
	let yPlus = 0;
	switch (this.direction()) {
		case 1:
			xPlus = -1 * distance;
			yPlus = distance;
			break;
		case 2:
			xPlus = 0;
			yPlus = distance;
			break;
		case 3:
			xPlus = distance;
			yPlus = distance;
			break;
		case 4:
			xPlus = -1 * distance;
			yPlus = 0;
			break;
		case 6:
			xPlus = distance;
			yPlus = 0;
			break;
		case 7:
			xPlus = -1 * distance;
			yPlus = -1 * distance;
			break;
		case 8:
			xPlus = 0;
			yPlus = -1 * distance;
			break;
		case 9:
			xPlus = distance;
			yPlus = -1 * distance;
			break;
	}
	this.jump(xPlus, yPlus);
};

// New function.
Game_Character.prototype.turnRight45 = function() {
	if (ODW.Core.character8D()) {
		switch (this.direction()) {
			case 1:
				this.setDirection(4);
				break;
			case 2:
				this.setDirection(1);
				break;
			case 3:
				this.setDirection(2);
				break;
			case 4:
				this.setDirection(7);
				break;
			case 6:
				this.setDirection(3);
				break;
			case 7:
				this.setDirection(8);
				break;
			case 8:
				this.setDirection(9);
				break;
			case 9:
				this.setDirection(6);
				break;
		}
	} else {
		this.turnRight90();
	}
};

// New function.
Game_Character.prototype.turnLeft45 = function() {
	if (ODW.Core.character8D()) {
		switch (this.direction()) {
			case 1:
				this.setDirection(2);
				break;
			case 2:
				this.setDirection(3);
				break;
			case 3:
				this.setDirection(6);
				break;
			case 4:
				this.setDirection(1);
				break;
			case 6:
				this.setDirection(9);
				break;
			case 7:
				this.setDirection(4);
				break;
			case 8:
				this.setDirection(7);
				break;
			case 9:
				this.setDirection(8);
				break;
		}
	} else {
		this.turnLeft90();
	}
};

// New function.
Game_Character.prototype.turnRightOrLeft45 = function() {
	switch (Math.randomInt(2)) {
		case 0:
			this.turnRight45();
			break;
		case 1:
			this.turnLeft45();
			break;
	}
};

//=============================================================================
// Game_Player
//=============================================================================

ODW.Core.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	ODW.Core.Game_Player_initMembers.call(this);
	this._input8D = false || ODW.Core.character8D();
};

ODW.Core.Game_Player_findDirectionTo = Game_Player.prototype.findDirectionTo;
Game_Player.prototype.findDirectionTo = function(goalX, goalY) {
	if (this.input8D()) {
		return this.findDirectionTo8D(goalX, goalY);
	} else {
		return ODW.Core.Game_Player_findDirectionTo.call(this, goalX, goalY);
	}
};

ODW.Core.Game_Player_getInputDirection = Game_Player.prototype.getInputDirection;
Game_Player.prototype.getInputDirection = function() {
	if (this.input8D()) {
		return Input.dir8;
	} else {
		return ODW.Core.Game_Player_getInputDirection.call(this);
	}
};

ODW.Core.Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
	if (this.input8D()) {
		if (ODW.isStraightDirection(direction)) {
			this.moveStraight(direction);
		}
		if (ODW.isDiagonalDirection(direction)) {
			const coordinates = ODW.directionCoordinates(direction);
			this.moveDiagonally(coordinates[0], coordinates[1]);
		}
	} else {
		ODW.Core.Game_Player_executeMove.call(this, direction);
	}
};

// New function.
Game_Player.prototype.input8D = function() {
	return this._input8D;
};

// New function.
Game_Player.prototype.enableInput8D = function() {
	this._input8D = true;
};

// New function.
Game_Player.prototype.disableInput8D = function() {
	this._input8D = false;
};

// New function.
Game_Player.prototype.actor = function() {
	return $gameParty.leader();
};

//=============================================================================
// Game_Follower
//=============================================================================

ODW.Core.Game_Follower_initMembers = Game_Follower.prototype.initMembers;
Game_Follower.prototype.initMembers = function() {
	ODW.Core.Game_Follower_initMembers.call(this);
	this._dashing = false;
};

ODW.Core.Game_Follower_isDashing = Game_Follower.prototype.isDashing;
Game_Follower.prototype.isDashing = function() {
	return ODW.Core.Game_Follower_isDashing.call(this) || this._dashing;
};

ODW.Core.Game_Follower_update = Game_Follower.prototype.update;
Game_Follower.prototype.update = function() {
	ODW.Core.Game_Follower_update.call(this);
	this.setMoveSpeed($gamePlayer.moveSpeed());
	if ($gamePlayer.isDashing()) {
		this.enableDashing();
	} else {
		this.disableDashing();
	}
};

ODW.Core.Game_Follower_chaseCharacter = Game_Follower.prototype.chaseCharacter;
Game_Follower.prototype.chaseCharacter = function(character) {
	ODW.Core.Game_Follower_chaseCharacter.call(this, character);
	this.setMoveSpeed($gamePlayer.moveSpeed());
};

// New function.
Game_Follower.prototype.memberIndex = function() {
	return this._memberIndex;
};

//=============================================================================
// Game_Event
//=============================================================================

ODW.Core.Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
	ODW.Core.Game_Event_initMembers.call(this);
	this._dashing = false;
};

ODW.Core.Game_Event_isDashing = Game_Event.prototype.isDashing;
Game_Event.prototype.isDashing = function() {
	return ODW.Core.Game_Event_isDashing.call(this) || this._dashing;
};

// New function.
Game_Event.prototype.isErased = function() {
	return this._erased;
};

// New function.
Game_Event.prototype.moveToPlayerXY = function() {
	this.moveToXY($gamePlayer.x, $gamePlayer.y);
};

// New function.
Game_Event.prototype.moveToFollowerXY = function(followerId) {
	const follower = $gamePlayer.followers().follower(followerId);
	this.moveToXY(follower.x, follower.y);
};

//=============================================================================
// Game_Enemies
//=============================================================================

// New object.
function Game_Enemies() {
	this.initialize(...arguments);
};

// New function.
Game_Enemies.prototype.initialize = function() {
	this._data = [];
};

// New function.
Game_Enemies.prototype.enemy = function(enemyId) {
	if ($dataEnemies[enemyId]) {
		if (!this._data[enemyId]) {
			this._data[enemyId] = new Game_Enemy(enemyId, 0, 0);
		}
		return this._data[enemyId];
	}
	return null;
};

//=============================================================================
//  00000    00000   0000000  0     0  0000000
// 0     0  0     0  0        00    0  0
// 0        0        0        0 0   0  0
//  00000   0        00000    0  0  0  00000
//       0  0        0        0   0 0  0
// 0     0  0     0  0        0    00  0
//  00000    00000   0000000  0     0  0000000
//=============================================================================

//=============================================================================
// Scene_Boot
//=============================================================================

ODW.Core.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
	ODW.Core.Scene_Boot_loadGameFonts.call(this);
	const customFonts = ODW.Core.customFonts();
	for (const customFont of customFonts) {
		FontManager.load(customFont.name, customFont.file);
	}
};

ODW.Core.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	ODW.Core.Scene_Boot_start.call(this);
	if ($gameTemp.isPlaytest() && ODW.Core.debugMode()) {
		// Show console.
		SceneManager.showDevTools();
		// Show FPS.
		Graphics._switchFPSCounter();
	}
};

//=============================================================================
//  00000   000000   000000   0000000  0000000  0000000
// 0     0  0     0  0     0     0        0     0
// 0        0     0  0     0     0        0     0
//  00000   000000   000000      0        0     00000
//       0  0        0   0       0        0     0
// 0     0  0        0    0      0        0     0
//  00000   0        0     0  0000000     0     0000000
//=============================================================================

//=============================================================================
// 0     0  0000000  0     0  000000    00000   0     0
// 0     0     0     00    0  0     0  0     0  0     0
// 0     0     0     0 0   0  0     0  0     0  0     0
// 0  0  0     0     0  0  0  0     0  0     0  0  0  0
// 0  0  0     0     0   0 0  0     0  0     0  0  0  0
// 0  0  0     0     0    00  0     0  0     0  0  0  0
//  00000   0000000  0     0  000000    00000    00000
//=============================================================================
