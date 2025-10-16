//=============================================================================
// Open Digital World - Multi-Language System Plugin v2.0.0
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v2.0.0] - Manage game texts in several languages.
 * @author Open Digital World
 * @url https://opendigitalworld.itch.io/rmmz-plugin-multi-language-system
 * 
 * @base ODW_Core
 * @orderAfter ODW_Core
 * 
 * @help
 *-----------------------------------------------------------------------------
 * Open Digital World - Multi-Language System Plugin
 *-----------------------------------------------------------------------------
 * 
 * This plugin lets you translate game texts to suit your needs. Texts are
 * simply written in JSON files, grouped in language-specific folders. It is
 * also possible to configure fonts specifically for each language. The active
 * language can be selected from the game options window, or at game startup.
 * 
 *-----------------------------------------------------------------------------
 * How to use
 *-----------------------------------------------------------------------------
 * 
 * 1. Install and configure your plugin. Please note that the first language
 * in the "Languages" settings list will be the default language of the game.
 * You can reorder them as you want in the option box.
 * 
 * 2. Create the language folders and files according to your plugin settings,
 * as follows (folder and file names are case sensitive):
 * 
 *    RMMZ Project Folder
 *    |_ Root Folder
 *       |_ Language Folder => Language [0]
 *          |_ Language File [0].json
 *          |_ Language File [1].json
 *          |_ ...
 *       |_ Language Folder => Language [1]
 *          |_ Language File [0].json
 *          |_ Language File [1].json
 *          |_ ...
 * 
 * 3. Develop your game, and for each text you want to translate, make sure
 * you follow the correct syntax below:
 * 
 * => In a text field of the RMMZ editor (database, message, plugin settings):
 * 
 *    ${text code}
 * 
 * => In a language file (JSON syntax):
 * 
 *    "text code": "text to display"
 * 
 * => To use the the control characters in translated texts (like color, icon,
 * variable, ...), double escape them like this in the "text to display":
 * 
 *    \C[0] -> \\C[0] or \V[1] -> \\V[1] or \. -> \\.
 * 
 * => You can also nest translated texts like this in the "text to display":
 * 
 *    "Text1": "an example",
 *    "Text2": "My text 1 is ${Text1}."
 * 
 *    -> Displayed result = My text is an example.
 * 
 * 4. During a game play, you can change the current active language in the
 * game option window, or at game startup (depending on the global plugin
 * settings).
 * 
 * See also README.md for more information about settings, commands, ...
 * 
 *-----------------------------------------------------------------------------
 * Known incompatibilities with other plugins
 *-----------------------------------------------------------------------------
 * 
 * Possibly with plugins that translate texts on the fly, but also those that
 * customize fonts.
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
 * NOTE: This plugin is a full rewritten and extended version of the "Ignis
 * Text Database" plugin by Raizen. Also inspired by some features present in
 * the "DKTools Localization" plugin by DK.
 * 
 * Original sources:
 *   - https://github.com/comuns-rpgmaker/Ignis-Engine/blob/master/IgnisTextDatabase.js
 *   - https://dk-plugins.ru/mz/system/localization/
 * 
 *-----------------------------------------------------------------------------
 * Version history
 *-----------------------------------------------------------------------------
 * 
 * 21.10.2021 v1.0.0
 *   - Initial release.
 * 19.09.2022 v1.0.1
 *   - Fixed a processing bug when the text has the ${} pattern twice or more.
 * 03.08.2023 v1.0.2
 *   - Fixed a syntax error in the $.updateIndex() function.
 * 01.09.2023 v1.0.3
 *   - Rewritten the text database load process.
 * 19.11.2023 v1.0.4
 *   - Reverted the changes made in v1.0.3, to load the text database later in the game boot process.
 * 25.05.2024 v1.1.0
 *   - Improved the documentation.
 *   - Improved the code for parsing language settings.
 *   - Added new font settings per language.
 *   - Added a new global parameter to display/hide the error log in the console.
 *   - Removed the $.getCodes() and $.getLabels() functions.
 *   - Removed the $._isDatabaseLoaded property and $.isDatabaseLoaded() function.
 *   - Removed the compatibility code for VisuStellaMZ plugins (replaced by a patch).
 * 01.12.2024 v2.0.0
 *   - Improved the global code.
 *   - Added the core plugin functions and features.
 *   - Added a startup scene for language selection.
 *   - Removed general font settings.
 *   - Removed general error log settings.
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
 * @param general
 * @text General Settings
 * @desc General settings for language configuration.
 * 
 * @param option
 * @parent general
 * @text Option Label
 * @desc The label for the language selection option. Can be a translatable text ${<text code>}.
 * @type string
 * @default Languages
 * 
 * @param folder
 * @parent general
 * @text Root Folder
 * @desc The folder containing all the languages files stored in subdirectories per language.
 * @type string
 * @default languages
 * 
 * @param languages
 * @parent general
 * @text Languages
 * @desc The list of the languages used in the game.
 * @type struct<Language>[]
 * @default []
 * 
 * @param scene
 * @text Selection Scene
 * @desc Settings for the language selection scene during game statup.
 * 
 * @param sceneActive
 * @parent scene
 * @text Active On Startup
 * @desc Indicates whether the language selection scene is displayed or not when the game starts.
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 * 
 * @param sceneBackground
 * @parent scene
 * @text Background
 * @desc The image file displayed in the background of the language selection scene.
 * @type file
 * @dir img/pictures
 * 
 * @param sceneWindow
 * @parent scene
 * @text Window
 * @desc Settings for the language selection scene window.
 * 
 * @param sceneWindowOrientation
 * @parent sceneWindow
 * @text Orientation
 * @desc The orientation of the language selection window.
 * @type select
 * @option Vertical
 * @option Horizontal
 * @default Vertical
 * 
 * @param sceneWindowWidth
 * @parent sceneWindow
 * @text Width
 * @desc The width of the language selection window. A number in [pixel].
 * @type number
 * @default 240
 * 
 * @param sceneWindowOrigin
 * @parent sceneWindow
 * @text Origin
 * @desc The origin point for positioning the language selection window.
 * @type select
 * @option Top Left
 * @option Top Center
 * @option Top Right
 * @option Middle Left
 * @option Middle Center
 * @option Middle Right
 * @option Bottom Left
 * @option Bottom Center
 * @option Bottom Right
 * @default Top Left
 * 
 * @param sceneWindowPositionX
 * @parent sceneWindow
 * @text Position X
 * @desc The X position the language selection window relative to the screen. A number in [pixel].
 * @type number
 * @default 0
 * 
 * @param sceneWindowPositionY
 * @parent sceneWindow
 * @text Position Y
 * @desc The Y position the language selection window relative to the screen. A number in [pixel].
 * @type number
 * @default 0
 * 
 * @param sceneWindowBackground
 * @parent sceneWindow
 * @text Background
 * @desc The background of the language selection window.
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @default Window
 * 
 * @param sceneWindowSkin
 * @parent sceneWindow
 * @text Skin
 * @desc The skin of the language selection window (leave blank for default window skin).
 * @type file
 * @dir img/system
 * 
 * @param sceneItem
 * @parent scene
 * @text Item
 * @desc Settings for the language selection scene items.
 * 
 * @param sceneItemAlign
 * @parent sceneItem
 * @text Alignment
 * @desc The alignement of the language selection items.
 * @type select
 * @option Left
 * @option Center
 * @option Right
 * @default Center
 * 
 * @param sceneItemFontName
 * @parent sceneItem
 * @text Font Name
 * @desc The font name of the language selection items. A value from the list of custom fonts (leave blank for default font name).
 * @type string
 * 
 * @param sceneItemFontSize
 * @parent sceneItem
 * @text Font Size
 * @desc The font size of the language selection items. A number between 0 and 108 (0 uses default font size).
 * @type number
 * @min 0
 * @max 108
 * @default 0
 * 
 * @param sceneItemFontStyle
 * @parent sceneItem
 * @text Font Style
 * @desc The font style of the language selection items.
 * @type select
 * @option Normal
 * @option Italic
 * @option Bold
 * @option Italic Bold
 * @default Normal
 * 
 * @param sceneItemTextColor
 * @parent sceneItem
 * @text Text Color
 * @desc The main color of the language selection items. Can be #HEX, rgba() or a color code from the window skin (0 to 31).
 * @type string
 * 
 * @param sceneItemOutlineColor
 * @parent sceneItem
 * @text Outline Color
 * @desc The outline color of the language selection items. Can be #HEX, rgba() or a color code from the window skin (0 to 31).
 * @type string
 * 
 * @param sceneItemOutlineWidth
 * @parent sceneItem
 * @text Outline Width
 * @desc The outline width of the language selection items. A number between 0 and 12.
 * @type number
 * @min 0
 * @max 12
 * @default 0
 * 
 */

/*~struct~Language:
 * @param code
 * @text Language Code
 * @desc The code of this language such as the ISO format.
 * @type string
 * @default en
 * 
 * @param label
 * @text Language Label
 * @desc The label of this language in its original translation (displayed as a language selection item).
 * @type string
 * @default English
 * 
 * @param folder
 * @text Language Folder
 * @desc The folder containing the JSON files for this language (put inside the <Root Folder>).
 * @type string
 * @default eng
 * 
 * @param fontName
 * @text Language Font Name
 * @desc The font name used as the main font for this language. A value from the list of custom fonts (leave blank for default font name).
 * @type string
 * 
 * @param fontSize
 * @text Language Font Size
 * @desc The font size used for the main font for this language. A number between 0 and 108 (0 uses default font size).
 * @type number
 * @min 0
 * @max 108
 * @default 0
 * 
 * @param files
 * @text Language Files
 * @desc The list of the JSON files (without extension) for this language (put inside the <Language Folder>).
 * @type string[]
 * @default ["main"]
 * 
 * @param coreTexts
 * @text Language Core Texts
 * @desc Hardcoded game engine texts that cannot be translated from the database.
 * 
 * @param miss
 * @parent coreTexts
 * @text Miss Label
 * @desc The label of the "Miss" text in its original translation.
 * @type string
 * @default Miss
 * 
 * @param on
 * @parent coreTexts
 * @text ON Label
 * @desc The "ON" wording of the option value in its original translation.
 * @type string
 * @default ON
 * 
 * @param off
 * @parent coreTexts
 * @text OFF Label
 * @desc The "OFF" wording of the option value in its original translation.
 * @type string
 * @default OFF
 */

var Imported = Imported || {};
Imported.ODW_MultiLanguageSystem = true;

var ODW = ODW || {};
ODW.MLS = ODW.MLS || {};
ODW.MLS.pluginName = "ODW_MultiLanguageSystem";
ODW.MLS.pluginVersion = [2, 0, 0];

(($) => {

	'use strict';

	/*
	 *-----------------------------------------------------------------------------
	 * PLUGIN SETTINGS
	 *-----------------------------------------------------------------------------
	 */

	const pluginParams = PluginManager.parameters(ODW.MLS.pluginName);

	// Declare plugin params.
	$._option = pluginParams.option;
	$._folder = pluginParams.folder;
	$._languages = pluginParams.languages;
	$._sceneActive = pluginParams.sceneActive;
	$._sceneBackground = pluginParams.sceneBackground;
	$._sceneWindowOrientation = pluginParams.sceneWindowOrientation;
	$._sceneWindowWidth = pluginParams.sceneWindowWidth;
	$._sceneWindowOrigin = pluginParams.sceneWindowOrigin;
	$._sceneWindowPositionX = pluginParams.sceneWindowPositionX;
	$._sceneWindowPositionY = pluginParams.sceneWindowPositionY;
	$._sceneWindowBackground = pluginParams.sceneWindowBackground;
	$._sceneWindowSkin = pluginParams.sceneWindowSkin;
	$._sceneItemAlign = pluginParams.sceneItemAlign;
	$._sceneItemFontName = pluginParams.sceneItemFontName;
	$._sceneItemFontSize = pluginParams.sceneItemFontSize;
	$._sceneItemFontStyle = pluginParams.sceneItemFontStyle;
	$._sceneItemTextColor = pluginParams.sceneItemTextColor;
	$._sceneItemOutlineColor = pluginParams.sceneItemOutlineColor;
	$._sceneItemOutlineWidth = pluginParams.sceneItemOutlineWidth;
	
	// Declare the language database.
	$.database = {};

	/*
	 *-----------------------------------------------------------------------------
	 * OPTION
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the label of the languages option.
	 * 
	 * @return string
	 */
	$.optionLabel = function() {
		return ODW.string(this._option);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * FOLDER
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the root folder of the languages files.
	 * 
	 * @return string
	 */
	$.rootFolder = function() {
		return ODW.string(this._folder);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGES
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return all the languages.
	 * 
	 * @return array of objects
	 */
	$.languages = function() {
		return ODW.arrayObject(this._languages);
	};

	/*
	 * Return the language object for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return object
	 */
	$.language = function(index) {
		const languages = this.languages();
		if (languages.length > 0) {
			if (0 <= index && index < languages.length) {
				return languages[index];
			} else {
				ODW.logError(this.pluginName, "No language configured for this index: " + index + ".");
			}
		} else {
			ODW.logError(this.pluginName, "No languages configured.");
		}
		return {
			index: index,
			code: "",
			label: "",
			folder: "",
			files: "",
			fontName: "",
			fontSize: 0,
			miss: "Miss",
			on: "ON",
			off: "OFF"
		};
	};

	/*
	 *-----------------------------------------------------------------------------
	 * SCENE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the indicator whether the language selection scene is displayed or not when the game starts.
	 * 
	 * @return boolean
	 */
	$.sceneActive = function() {
		return ODW.boolean(this._sceneActive);
	};

	/*
	 * Return the image file displayed in the background of the language selection scene.
	 * 
	 * @return string
	 */
	$.sceneBackground = function() {
		return ODW.string(this._sceneBackground);
	};

	/*
	 * Return the orientation of the language selection window.
	 * 
	 * @return string
	 */
	$.sceneWindowOrientation = function() {
		return ODW.orientation(this._sceneWindowOrientation);
	};

	/*
	 * Return the width of the language selection window.
	 * 
	 * @return number
	 */
	$.sceneWindowWidth = function() {
		return ODW.integer(this._sceneWindowWidth);
	};

	/*
	 * Return the origin point for positioning the language selection window.
	 * 
	 * @return object
	 */
	$.sceneWindowOrigin = function() {
		return ODW.origin(this._sceneWindowOrigin);
	};

	/*
	 * Return the X position the language selection window relative to the screen.
	 * 
	 * @return number
	 */
	$.sceneWindowPositionX = function() {
		return ODW.integer(this._sceneWindowPositionX);
	};

	/*
	 * Return the Y position the language selection window relative to the screen.
	 * 
	 * @return number
	 */
	$.sceneWindowPositionY = function() {
		return ODW.integer(this._sceneWindowPositionY);
	};

	/*
	 * Return the background of the language selection window.
	 * 
	 * @return number
	 */
	$.sceneWindowBackground = function() {
		return ODW.backgroundType(this._sceneWindowBackground);
	};

	/*
	 * Return the skin of the language selection window.
	 * 
	 * @return string
	 */
	$.sceneWindowSkin = function() {
		return ODW.string(this._sceneWindowSkin);
	};

	/*
	 * Return the alignement of the language selection items.
	 * 
	 * @return string
	 */
	$.sceneItemAlign = function() {
		return ODW.align(this._sceneItemAlign);
	};

	/*
	 * Return the font name of the language selection items.
	 * 
	 * @return string
	 */
	$.sceneItemFontName = function() {
		return ODW.fontName(this._sceneItemFontName);
	};

	/*
	 * Return the font size of the language selection items.
	 * 
	 * @return number
	 */
	$.sceneItemFontSize = function() {
		return ODW.fontSize(this._sceneItemFontSize);
	};

	/*
	 * Return the font style of the language selection items.
	 * 
	 * @return string
	 */
	$.sceneItemFontStyle = function() {
		return ODW.fontStyle(this._sceneItemFontStyle);
	};

	/*
	 * Return the main color of the language selection items.
	 * 
	 * @return string
	 */
	$.sceneItemTextColor = function() {
		return ODW.textColor(this._sceneItemTextColor);
	};

	/*
	 * Return the outline color of the language selection items.
	 * 
	 * @return string
	 */
	$.sceneItemOutlineColor = function() {
		return ODW.outlineColor(this._sceneItemOutlineColor);
	};

	/*
	 * Return the outline width of the language selection items.
	 * 
	 * @return number
	 */
	$.sceneItemOutlineWidth = function() {
		return ODW.outlineWidth(this._sceneItemOutlineWidth);
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE INDEX
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the current active language index.
	 * 
	 * @return number
	 */
	$.currentIndex = function() {
		return ConfigManager["mlsLanguageIndex"];
	};

	/*
	 * Return the previous language index in the list.
	 * 
	 * @return number
	 */
	$.prevIndex = function() {
		const languages = this.languages();
		let newIndex = ConfigManager["mlsLanguageIndex"] - 1;
		if (newIndex < 0) {
			newIndex = languages.length - 1;
		}
		return newIndex;
	};

	/*
	 * Return the next language index in the list.
	 * 
	 * @return number
	 */
	$.nextIndex = function() {
		const languages = this.languages();
		let newIndex = ConfigManager["mlsLanguageIndex"] + 1;
		if (newIndex >= languages.length) {
			newIndex = 0;
		}
		return newIndex;
	};

	/*
	 * Update the current active language index.
	 * 
	 * @param number The new language index
	 * 
	 * @return void
	 */
	$.updateIndex = function(newIndex) {
		const languages = this.languages();
		if (languages.length > 0) {
			if (0 <= newIndex && newIndex < languages.length) {
				ConfigManager["mlsLanguageIndex"] = newIndex;
				ConfigManager.save();
			} else {
				ODW.logError(this.pluginName, "No language configured for this new index: " + newIndex + ".");
			}
		} else {
			ODW.logError(this.pluginName, "No languages configured.");
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE CODE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language code for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return string
	 */
	$.code = function(index) {
		const language = this.language(index);
		const languageCode = ODW.string(language.code);
		if (languageCode !== "") {
			return languageCode;
		} else {
			ODW.logError(this.pluginName, "Language code is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language code for the current active language index.
	 * 
	 * @return string
	 */
	$.currentCode = function() {
		return this.code(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE LABEL
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language label for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return string
	 */
	$.label = function(index) {
		const language = this.language(index);
		const languageLabel = ODW.string(language.label);
		if (languageLabel !== "") {
			return languageLabel;
		} else {
			ODW.logError(this.pluginName, "Language label is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language label for the current active language index.
	 * 
	 * @return string
	 */
	$.currentLabel = function() {
		return this.label(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE FOLDER
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language folder for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return string
	 */
	$.folder = function(index) {
		const language = this.language(index);
		const languageFolder = ODW.string(language.folder);
		if (languageFolder !== "") {
			return languageFolder;
		} else {
			ODW.logError(this.pluginName, "Language folder is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language folder for the current active language index.
	 * 
	 * @return string
	 */
	$.currentFolder = function() {
		return this.folder(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE FILES
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language files for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return array
	 */
	$.files = function(index) {
		const language = this.language(index);
		const languageFiles = ODW.arrayString(language.files);
		if (languageFiles.length > 0) {
			return languageFiles;
		} else {
			ODW.logError(this.pluginName, "Language files is missing for this index: " + index + ".");
		}
		return [];
	};

	/*
	 * Return the language files for the current active language index.
	 * 
	 * @return string
	 */
	$.currentFiles = function() {
		return this.files(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE FONT NAME
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language font name for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return string
	 */
	$.fontName = function(index) {
		const language = this.language(index);
		const languageFontName = ODW.fontName(language.fontName);
		if (languageFontName !== "") {
			return languageFontName;
		} else {
			ODW.logError(this.pluginName, "Language font name is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language font name for the current active language index.
	 * 
	 * @return string
	 */
	$.currentFontName = function() {
		return this.fontName(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE FONT SIZE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language font size for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return number
	 */
	$.fontSize = function(index) {
		const language = this.language(index);
		const languageFontSize = ODW.fontSize(language.fontSize);
		if (languageFontSize > 0) {
			return languageFontSize;
		} else {
			ODW.logError(this.pluginName, "Language font size is missing for this index: " + index + ".");
		}
		return 0;
	};

	/*
	 * Return the language font size for the current active language index.
	 * 
	 * @return number
	 */
	$.currentFontSize = function() {
		return this.fontSize(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE MISS
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language <MISS> label for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return number
	 */
	$.labelMiss = function(index) {
		const language = this.language(index);
		const languageMiss = ODW.string(language.miss);
		if (languageMiss !== "") {
			return languageMiss;
		} else {
			ODW.logError(this.pluginName, "Language <MISS> label is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language <MISS> label for the current active language index.
	 * 
	 * @return number
	 */
	$.currentLabelMiss = function() {
		return this.labelMiss(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE ON
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language <ON> label for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return number
	 */
	$.labelOn = function(index) {
		const language = this.language(index);
		const languageOn = ODW.string(language.on);
		if (languageOn !== "") {
			return languageOn;
		} else {
			ODW.logError(this.pluginName, "Language <ON> label is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language <ON> label for the current active language index.
	 * 
	 * @return number
	 */
	$.currentLabelOn = function() {
		return this.labelOn(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * LANGUAGE OFF
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the language <OFF> label for a specific language index.
	 * 
	 * @param number The language index
	 * 
	 * @return number
	 */
	$.labelOff = function(index) {
		const language = this.language(index);
		const languageOff = ODW.string(language.off);
		if (languageOff !== "") {
			return languageOff;
		} else {
			ODW.logError(this.pluginName, "Language <OFF> label is missing for this index: " + index + ".");
		}
		return "";
	};

	/*
	 * Return the language <OFF> label for the current active language index.
	 * 
	 * @return number
	 */
	$.currentLabelOff = function() {
		return this.labelOff(this.currentIndex());
	};

	/*
	 *-----------------------------------------------------------------------------
	 * DATABASE
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Load the database with the texts of the files corresponding to the current active language index.
	 * 
	 * @return void
	 */
	$.loadDatabase = function() {
		this.database = {};
		const rootFolder = this.rootFolder();
		const languageIndex = this.currentIndex();
		const languageFiles = this.currentFiles();
		const languageFolder = this.currentFolder();
		if (languageFiles.length > 0) {
			for (const languageFile of languageFiles) {
				DataManager.mlsLoadLanguageFile(languageIndex, rootFolder.concat('/') + languageFolder.concat( '/' ) + languageFile.concat( '.json'));
			}
		} else {
			ODW.logError(this.pluginName, "No language database loaded for this index: " + languageIndex + ".");
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * TEXT
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Return the text corresponding to the ${text code} included in the language files for the current active language index.
	 * 
	 * @param string The text code as set in the editor text field
	 * 
	 * @return string
	 */
	$.getText = function(oldText) {
		const regex = /\${([\w|\.]+)}/gm;
		let regexParts;
		let newText = oldText;
		while ((regexParts = regex.exec(oldText)) != null) {
			newText = newText.replace(regexParts[0], this.getTextDatabase(regexParts[1]));
		}
		return newText;
	};

	/*
	 * Return the text found in the databae corresponding to the text code.
	 * 
	 * @param string The text code to find in the language file
	 * 
	 * @return string
	 */
	$.getTextDatabase = function(textCode) {
		if (this.database.hasOwnProperty(textCode)) {
			return this.database[textCode];
		} else {
			return textCode;
		}
	};

	/*
	 *-----------------------------------------------------------------------------
	 * TO REWRITE CORE SCRIPT
	 *-----------------------------------------------------------------------------
	 */

	/*
	 * Update the game title.
	 * 
	 * @return void
	 */
	$.updateGameTitle = function() {
		document.title = this.getText($dataSystem.gameTitle);
	};

})(ODW.MLS);

//=============================================================================
//  00000    00000   000000   0000000
// 0     0  0     0  0     0  0
// 0        0     0  0     0  0
// 0        0     0  000000   00000
// 0        0     0  0   0    0
// 0     0  0     0  0    0   0
//  00000    00000   0     0  0000000
//=============================================================================

//=============================================================================
// Bitmap
//=============================================================================

ODW.MLS.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
	ODW.MLS.Bitmap_drawText.call(this, ODW.MLS.getText(text), x, y, maxWidth, lineHeight, align);
};

//=============================================================================
// DataManager
//=============================================================================

// New function.
DataManager.mlsLoadLanguageFile = function(index, src) {
	const xhr = new XMLHttpRequest();
	const url = src;
	xhr.open("GET", url);
	xhr.responseType = 'json';
	xhr.onload = () => this.mlsOnXhrLanguageFileLoad(xhr, index, src, url);
	xhr.onerror = () => this.mlsOnXhrLanguageFileError(index, src, url, "File not found.");
	xhr.send();
};

// New function.
DataManager.mlsOnXhrLanguageFileLoad = function(xhr, index, src, url) {
	if (xhr.status < 400) {
		try {
			const languageDatabase = ODW.MLS.database;
			const languageDatafile = xhr.response;
			if (languageDatafile) {
				ODW.MLS.database = {...languageDatabase, ...languageDatafile};
			} else {
				this.mlsOnXhrLanguageFileError(index, src, url, "JSON file structure incorrect.");
			}
		} catch (e) {
			this.mlsOnXhrLanguageFileError(index, src, url, e);
		}
	} else {
		this.mlsOnXhrLanguageFileError(index, src, url, "Xhr status " + xhr.status);
	}
};

// New function.
DataManager.mlsOnXhrLanguageFileError = function(index, src, url, errorMessage) {
	ODW.logError(ODW.MLS.pluginName, errorMessage + "\nFile: " + src);
	const error = {index: index, src: src, url: url};
	this._errors.push(error);
};

//=============================================================================
// ConfigManager
//=============================================================================

// New property.
ConfigManager.mlsLanguageIndex = 0;

ODW.MLS.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
	const config = ODW.MLS.ConfigManager_makeData.call(this);
	config.mlsLanguageIndex = this.mlsLanguageIndex;
	return config;
};

ODW.MLS.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
	ODW.MLS.ConfigManager_applyData.call(this, config);
	this.mlsLanguageIndex = this.mlsReadLanguageIndex(config, "mlsLanguageIndex", 0);
};

// New function.
ConfigManager.mlsReadLanguageIndex = function(config, name, defaultValue) {
	if (name in config) {
		return config[name];
	} else {
		return defaultValue;
	}
};

//=============================================================================
// TextManager
//=============================================================================

ODW.MLS.TextManager_basic = TextManager.basic;
TextManager.basic = function(basicId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_basic.call(this, basicId));
};

ODW.MLS.TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_param.call(this, paramId));
};

ODW.MLS.TextManager_command = TextManager.command;
TextManager.command = function(commandId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_command.call(this, commandId));
};

ODW.MLS.TextManager_message = TextManager.message;
TextManager.message = function(messageId) {
	return ODW.MLS.getText(ODW.MLS.TextManager_message.call(this, messageId));
};

// Rewrite.
Object.defineProperty(TextManager, "currencyUnit", {
	get: function() {
		return ODW.MLS.getText($dataSystem.currencyUnit);
	},
	configurable: true
});

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
// Game_System
//=============================================================================

ODW.MLS.Game_System_mainFontFace = Game_System.prototype.mainFontFace;
Game_System.prototype.mainFontFace = function() {
	const languageFontName = ODW.MLS.currentFontName();
	if (languageFontName) {
		return languageFontName + ", " + $dataSystem.advanced.fallbackFonts;
	} else {
		return ODW.MLS.Game_System_mainFontFace.call(this);
	}
};

ODW.MLS.Game_System_mainFontSize = Game_System.prototype.mainFontSize;
Game_System.prototype.mainFontSize = function() {
	const languageFontSize = ODW.MLS.currentFontSize();
	if (languageFontSize > 0) {
		return languageFontSize;
	} else {
		return ODW.MLS.Game_System_mainFontSize.call(this);
	}
};

//=============================================================================
// Game_Message
//=============================================================================

ODW.MLS.Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
	ODW.MLS.Game_Message_add.call(this, ODW.MLS.getText(text));
};

ODW.MLS.Game_Message_setChoices = Game_Message.prototype.setChoices;
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
	choices = choices.map(choice => ODW.MLS.getText(choice));
	ODW.MLS.Game_Message_setChoices.call(this, choices, defaultType, cancelType);
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

ODW.MLS.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
	ODW.MLS.Scene_Boot_start.call(this);
	ODW.MLS.loadDatabase();
	setTimeout(function(){
		ODW.MLS.updateGameTitle();
	}, 100);
};

// Rewrite.
Scene_Boot.prototype.updateDocumentTitle = function() {
	ODW.MLS.updateGameTitle();
};

//=============================================================================
// Scene_Splash
//=============================================================================

ODW.MLS.Scene_Splash_gotoTitle = Scene_Splash.prototype.gotoTitle;
Scene_Splash.prototype.gotoTitle = function() {
	if (ODW.MLS.sceneActive()) {
		SceneManager.goto(MLS_Scene_Languages);
	} else {
		ODW.MLS.Scene_Splash_gotoTitle.call(this);
	}
};

//=============================================================================
// MLS_Scene_Languages
//=============================================================================

function MLS_Scene_Languages() {
	this.initialize(...arguments);
};

MLS_Scene_Languages.prototype = Object.create(Scene_Base.prototype);
MLS_Scene_Languages.prototype.constructor = MLS_Scene_Languages;

MLS_Scene_Languages.prototype.initialize = function() {
	Scene_Base.prototype.initialize.call(this);
};

MLS_Scene_Languages.prototype.create = function() {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createWindowLayer();
	this.createLanguagesWindow();
};

MLS_Scene_Languages.prototype.start = function() {
	Scene_Base.prototype.start.call(this);
	SceneManager.clearStack();
	this.adjustBackground();
	this.startFadeIn(this.fadeSpeed(), false);
};

MLS_Scene_Languages.prototype.update = function() {
	if (!this.isBusy()) {
		this._languagesWindow.open();
	}
	Scene_Base.prototype.update.call(this);
};

MLS_Scene_Languages.prototype.isBusy = function() {
	return (this._languagesWindow.isClosing() || Scene_Base.prototype.isBusy.call(this));
};

MLS_Scene_Languages.prototype.terminate = function() {
	Scene_Base.prototype.terminate.call(this);
	SceneManager.snapForBackground();
	ConfigManager.save();
};

MLS_Scene_Languages.prototype.createBackground = function() {
	this._backSprite = new Sprite(ImageManager.loadPicture(ODW.MLS.sceneBackground()));
	this.addChild(this._backSprite);
};

MLS_Scene_Languages.prototype.adjustBackground = function() {
	this.scaleSprite(this._backSprite);
	this.centerSprite(this._backSprite);
};

MLS_Scene_Languages.prototype.createLanguagesWindow = function() {
	const rect = this.languagesWindowRect();
	this._languagesWindow = new MLS_Window_Languages(rect);
	this._languagesWindow.setBackgroundType(ODW.MLS.sceneWindowBackground());
	this._languagesWindow.setHandler("ok", this.commandToTitle.bind(this));
	this.addWindow(this._languagesWindow);
};

MLS_Scene_Languages.prototype.languagesWindowRect = function() {
	const origin = ODW.MLS.sceneWindowOrigin();
	const ww = ODW.MLS.sceneWindowWidth();
	const wh = ODW.isOrientationHorizontal(ODW.MLS.sceneWindowOrientation()) ? this.calcWindowHeight(1, true) : this.calcWindowHeight(ODW.MLS.languages().length, true);
	const wx = ODW.MLS.sceneWindowPositionX() - origin.x * ww;
	const wy = ODW.MLS.sceneWindowPositionY() - origin.y * wh;
	return new Rectangle(wx, wy, ww, wh);
};

MLS_Scene_Languages.prototype.commandToTitle = function() {
	this._languagesWindow.close();
	SceneManager.goto(Scene_Title);
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
// Sprite_Damage
//=============================================================================

// Rewrite.
Sprite_Damage.prototype.createMiss = function() {
	const h = this.fontSize();
	const w = Math.floor(h * 3.0);
	const sprite = this.createChildSprite(w, h);
	sprite.bitmap.drawText(ODW.MLS.currentLabelMiss(), 0, 0, w, h, "center");
	sprite.dy = 0;
};

//=============================================================================
// 0     0  0000000  0     0  000000    00000   0     0
// 0     0     0     00    0  0     0  0     0  0     0
// 0     0     0     0 0   0  0     0  0     0  0     0
// 0  0  0     0     0  0  0  0     0  0     0  0  0  0
// 0  0  0     0     0   0 0  0     0  0     0  0  0  0
// 0  0  0     0     0    00  0     0  0     0  0  0  0
//  00000   0000000  0     0  000000    00000    00000
//=============================================================================

//=============================================================================
// Window_Base
//=============================================================================

ODW.MLS.Window_Base_textWidth = Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
	return ODW.MLS.Window_Base_textWidth.call(this, ODW.MLS.getText(text));
};

ODW.MLS.Window_Base_createTextState = Window_Base.prototype.createTextState;
Window_Base.prototype.createTextState = function(text, x, y, width) {
	return ODW.MLS.Window_Base_createTextState.call(this, ODW.MLS.getText(text), x, y, width);
};

ODW.MLS.Window_Base_actorName = Window_Base.prototype.actorName;
Window_Base.prototype.actorName = function(n)  {
	return ODW.MLS.getText(ODW.MLS.Window_Base_actorName.call(this, n));
};

ODW.MLS.Window_Base_partyMemberName = Window_Base.prototype.partyMemberName;
Window_Base.prototype.partyMemberName = function(n) {
	return ODW.MLS.getText(ODW.MLS.Window_Base_partyMemberName.call(this, n));
};

ODW.MLS.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	return ODW.MLS.getText(ODW.MLS.Window_Base_convertEscapeCharacters.call(this, text));
};

//=============================================================================
// Window_Options
//=============================================================================

// Rewrite.
Window_Options.prototype.booleanStatusText = function(value) {
	return value ? ODW.MLS.currentLabelOn() : ODW.MLS.currentLabelOff();
};

ODW.MLS.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
	this.addCommand(ODW.MLS.getText(ODW.MLS.optionLabel()), "mlsLanguageIndex");
	ODW.MLS.Window_Options_addGeneralOptions.call(this);
};

ODW.MLS.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	const symbol = this.commandSymbol(index);
	const value = this.getConfigValue(symbol);
	if (symbol === "mlsLanguageIndex") {
		return ODW.MLS.label(value);
	} else {
		return ODW.MLS.Window_Options_statusText.call(this, index);
	}
};

ODW.MLS.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "mlsLanguageIndex") {
		this.changeValue(symbol, ODW.MLS.nextIndex());
		this.mlsRefreshLanguage();
	} else {
		ODW.MLS.Window_Options_processOk.call(this);
	}
};

ODW.MLS.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "mlsLanguageIndex") {
		this.changeValue(symbol, ODW.MLS.nextIndex());
		this.mlsRefreshLanguage();
	} else {
		ODW.MLS.Window_Options_cursorRight.call(this);
	}
};

ODW.MLS.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
	const index = this.index();
	const symbol = this.commandSymbol(index);
	if (symbol === "mlsLanguageIndex") {
		this.changeValue(symbol, ODW.MLS.prevIndex());
		this.mlsRefreshLanguage();
	} else {
		ODW.MLS.Window_Options_cursorLeft.call(this);
	}
};

// New function.
Window_Options.prototype.mlsRefreshLanguage = function() {
	ODW.MLS.loadDatabase();
	this.resetFontSettings();
	setTimeout(() => {
		ODW.MLS.updateGameTitle();
		if (SceneManager._scene._optionsWindow) {
			SceneManager._scene._optionsWindow.refresh();
		}
	}, 100);
};

//=============================================================================
// Window_NameEdit
//=============================================================================

ODW.MLS.Window_NameEdit_setup = Window_NameEdit.prototype.setup;
Window_NameEdit.prototype.setup = function(actor, maxLength) {
	ODW.MLS.Window_NameEdit_setup.call(this, actor, maxLength);
	this._name = ODW.MLS.getText(this._name).slice(0, this._maxLength);
	this._index = this._name.length;
	this._defaultName = this._name;
};

//=============================================================================
// MLS_Window_Languages
//=============================================================================

function MLS_Window_Languages() {
	this.initialize(...arguments);
};

MLS_Window_Languages.prototype = Object.create(Window_Command.prototype);
MLS_Window_Languages.prototype.constructor = MLS_Window_Languages;

MLS_Window_Languages.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this.openness = 0;
	this.selectLast();
};

MLS_Window_Languages.prototype.maxCols = function() {
	if (ODW.isOrientationHorizontal(ODW.MLS.sceneWindowOrientation())) {
		return ODW.MLS.languages().length;
	} else {
		return 1;
	}
};

MLS_Window_Languages.prototype.makeCommandList = function() {
	for (let index in ODW.MLS.languages()) {
		this.addCommand(ODW.MLS.label(index), ODW.MLS.code(index));
	}
};

MLS_Window_Languages.prototype.processOk = function() {
	ODW.MLS.updateIndex(this.index());
	ODW.MLS.loadDatabase();
	this.resetFontSettings();
	setTimeout(() => {
		ODW.MLS.updateGameTitle();
	}, 100);
	Window_Command.prototype.processOk.call(this);
};

MLS_Window_Languages.prototype.selectLast = function() {
	this.selectSymbol(ODW.MLS.currentCode());
};


MLS_Window_Languages.prototype.loadWindowskin = function() {
	const windowskin = ODW.MLS.sceneWindowSkin();
	if (windowskin !== "") {
		this.windowskin = ImageManager.loadSystem(windowskin);
	} else {
		Window_Command.prototype.loadWindowskin.call(this);
	}
};

MLS_Window_Languages.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	const align = this.itemTextAlign();
	this.resetFontSettings();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

MLS_Window_Languages.prototype.itemTextAlign = function() {
	return ODW.MLS.sceneItemAlign();
};

MLS_Window_Languages.prototype.drawBackgroundRect = function(rect) {
	if (ODW.MLS.sceneWindowBackground() === 2) {
		// DON'T DRAW ITEM BACKGROUND IF WINDOW IS TRANSPARENT
	} else {
		Window_Command.prototype.drawBackgroundRect.call(this, rect);
	}
};

MLS_Window_Languages.prototype.resetFontSettings = function() {
	this.contents.fontFace = ODW.MLS.sceneItemFontName();
	this.contents.fontSize = ODW.MLS.sceneItemFontSize();
	this.contents.fontItalic = ODW.isFontStyleItalic(ODW.MLS.sceneItemFontStyle());
	this.contents.fontBold = ODW.isFontStyleBold(ODW.MLS.sceneItemFontStyle());
	this.contents.textColor = ODW.MLS.sceneItemTextColor();
	this.contents.outlineColor = ODW.MLS.sceneItemOutlineColor();
	this.contents.outlineWidth = ODW.MLS.sceneItemOutlineWidth();
};
