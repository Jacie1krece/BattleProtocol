//=============================================================================
// Plugin Name: QuestLog
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Create a questlog to manage your quests
// Use: Feel free to use for private and commercial projects. Feel free to edit. Please give credits.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Custom Quest Plugin for RPG Maker MZ
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 * @param linebreak1
 * @text ===Main options===
 * @desc The main window options
 * @default ================
 *
 * @param fontsize
 * @parent linebreak1
 * @text Title Font Size
 * @type number
 * @desc The size of the font for the Scene Title
 * @default 40
 * @min 1
 *
 * @param textManagement
 * @parent linebreak1
 * @text Description text management
 * @type select
 * @desc Choose how to manage text
 * @option Manual Text
 * @value manual
 * @option Auto Sizer (change font size but doesn't break lines)
 * @value size
 * @option Auto Wrap (fit both by breaking lines and resizing font)
 * @value wrap
 * @default wrap
 *
 * @param paddingValue
 * @parent linebreak1
 * @text Auto Text Padding
 * @type number
 * @desc The padding from the left/right border for Auto Size and Auto Wrap
 * @default 50
 *
 * @param descriptionSize
 * @parent linebreak1
 * @text Quest Description Font Size
 * @type number
 * @desc The size of the font for the description of the Quest (If not Dynamic)
 * @default 20
 * @min 1
 *
 * @param infoalign
 * @parent linebreak1
 * @text Quest Info Alignment
 * @desc Select how to align the informations in the quest description
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default center
 *
 * @param listSize
 * @parent linebreak1
 * @text Font Size in the list
 * @type number
 * @desc The size of the font of the Quest's name in the quests list
 * @default 20
 * @min 1
 *
 * @param listAlign
 * @parent linebreak1
 * @text Quest List Align
 * @desc Select how to align the quest in the QuestLog list
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default center
 * 
 * @param linebreak6
 * @text ===Category Options===
 * @desc Organize your Quests
 * @default ================
 *
 * @param categoryFlag
 * @parent linebreak6
 * @type boolean
 * @text Use Categories?
 * @desc Decide if you want to organize in categories
 * @default false
 * @on Use them
 * @off Don't use them
 * 
 * @param categoryPriority
 * @parent linebreak6
 * @text Categories Priority
 * @desc Select how categories are organized
 * @type select
 * @option Category group all the ongoing-completed-failed quests
 * @value category
 * @option First show the ongoing quests by category, then completed, then failed
 * @value status
 * @default category
 * 
 * @param categoryDatabase
 * @parent linebreak6
 * @text Categories Database
 * @type struct<catData>
 * @desc The settings of the Categories
 * @default {"uncategorizedName":"--No Category--","uncategorizedNameTrans":"[]","uncategoryIndex":"999","categoriesDatabase":"[]"}
 * 
 * @param linebreak2
 * @text ===Text Options===
 * @desc Select your terms
 * @default ================
 *
 * @param Title
 * @parent linebreak2
 * @text Title
 * @desc Set the title of the QuestLog
 * @default QuestLog
 *
 * @param giverprefix
 * @parent linebreak2
 * @text Giver Prefix
 * @desc How the "From:" prefix is shown in the Quest Giver
 * @default From:
 *
 * @param areaprefix
 * @parent linebreak2
 * @text Area Prefix
 * @desc How the "Area:" prefix is shown in the Quest Area
 * @default Area:
 *
 * @param statusname
 * @parent linebreak2
 * @text Status Name
 * @desc How the "Status:" is shown for Quest Completion
 * @default Status:
 *
 * @param questcompleted
 * @parent linebreak2
 * @text Quest Completed
 * @desc Word to show if quest is completed
 * @default Completed
 *
 * @param questongoing
 * @parent linebreak2
 * @text Quest Ongoing
 * @desc Word to show if quest is ongoing
 * @default Ongoing
 *
 * @param questfailed
 * @parent linebreak2
 * @text Quest Failed
 * @desc Word to show if quest is failed
 * @default Failed
 * 
 * @param linebreakExtra
 * @text ===Extra Features===
 * @desc Set the preferences for extra features
 * @default ================
 * 
 * @param logsFlag
 * @parent linebreakExtra
 * @type boolean
 * @text Use Detailed Logs?
 * @desc Decide if you want to show the command to open quest's detailed logs
 * @default false
 * @on Use them
 * @off Don't use them
 * 
 * @param logsDefText
 * @parent logsFlag
 * @text Command Name for Logs
 * @desc The text of the command to open the detailed logs
 * @default Logs
 * 
 * @param trackSetting
 * @parent linebreakExtra
 * @type select
 * @text Use Quest HUD Tracking?
 * @desc Decide if you want to show the command to open quest's detailed logs
 * @default no
 * @option Don't use Tracking
 * @value no
 * @option Allow player to decide the quest to track
 * @value player
 * @option Use tracking set by the developer
 * @value dev
 *
 * @param trackConfiguration
 * @parent trackSetting
 * @text Quest HUD Tracking Options
 * @type struct<trackOpt>
 * @desc The settings of HUD tracking
 * @default {"maxQuest":"3","textColor":"#ffffff","maxFont":"16","hudSize":"{\"width\":\"20\",\"height\":\"20\",\"x\":\"0\",\"y\":\"0\"}"}
 * 
 * @param trackDefText
 * @parent trackSetting
 * @text Command Name for Quest Tracking (Track)
 * @desc The text of the command to start tracking a quest
 * @default Track Quest
 * 
 * @param untrackDefText
 * @parent trackSetting
 * @text Command Name for Quest Tracking (Remove Track)
 * @desc The text of the command to stop tracking a quest
 * @default Don't Track
 * 
 * @param linebreak3
 * @text ===Command Button===
 * @desc Set the preferences for the menu command
 * @default ================
 *
 * @param menucommand
 * @parent linebreak3
 * @type boolean
 * @text Menu Command
 * @desc Add the Quest command to the game menu
 * @default False
 * @on Show
 * @off Hide
 *
 * @param commandname
 * @parent linebreak3
 * @text Command Name
 * @desc Set the name of the command (if activated)
 * @default QuestLog
 * 
 * @param linebreak5
 * @text ===Translation Settings===
 * @desc Set the translation options
 * @default ================
 *
 * @param defaultLanguage
 * @parent linebreak5
 * @text Default Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param autoDetectFlag
 * @parent linebreak5
 * @text Use language auto-detection?
 * @type boolean
 * @desc Choose if you want to auto-detect the user language(s)
 * @default true
 * @on Auto-Detect
 * @off Manual Change
 *
 * @param translationPacks
 * @parent linebreak5
 * @text Translation Packs (for Settings)
 * @type struct<settingsTransPack>[]
 * @desc The translation packs for the plugin settings (not the quests)
 * @default []
 * 
 * @param linebreak4
 * @text ===Graphic Settings===
 * @desc Set the graphic preferences
 * @default ================
 *
 * @param titleFlag
 * @parent linebreak4
 * @text Show QuestLog Title?
 * @type boolean
 * @desc Choose if you want to show the QuestLog title
 * @default true
 * @on Show
 * @off Hide
 *
 * @param layoutAlign
 * @parent linebreak4
 * @text QuestLog Layout
 * @desc Select the QuestLog Layout
 * @type select
 * @option Quest List on left, Info on right
 * @value layout1
 * @option Quest List on right, Info on left
 * @value layout2
 * @default layout1
 *
 * @param layoutSize
 * @parent linebreak4
 * @text Layout Size
 * @desc Select the QuestLog Layout size
 * @type select
 * @option 100% of the Graphic Box (classic)
 * @value size1
 * @option 90% of the Graphic Box (RMMZ style)
 * @value size2
 * @default size1
 *
 * @param touchCancel
 * @parent linebreak4
 * @text Show Touch Cancel Button?
 * @type boolean
 * @desc Choose if you want to show the touch cancel button (make sure the player has non touch commands if you don't)
 * @default true
 * @on Show
 * @off Hide
 *
 * @param skinSettings
 * @parent linebreak4
 * @text Custom Skin
 * @type struct<skinSet>
 * @desc If you want to use a custom skin use this settings
 * @default {"skinFlag":"false","skinName":"","redT":"0","greenT":"0","blueT":"0"}
 *
 * @param linebreak7
 * @text ===Management Settings===
 * @desc How the plugin works
 * @default ================
 * 
 * @param errorManagement
 * @parent linebreak7
 * @text Error Management
 * @desc How the plugin handles the errors
 * @type select
 * @option Throw an Error (will break the game, safer)
 * @value err1
 * @option Show a warning in the console (Must keep an eye at the console)
 * @value err2
 * @option Do nothing (really? why?)
 * @value err3
 * @default err1
 * 
 * @command line1
 * @text --- Quest Management ---
 * @desc Series of commands to manage your quests 
 *
 * @command newCreateQuest
 * @text Create Quest
 * @desc Create a new quest
 * @arg id
 * @type number
 * @text ID
 * @desc The ID of the quest. (Minimum 1)
 * @min 1
 *
 * @arg icon
 * @type icon
 * @text Icon
 * @desc The icon index to display for the quest
 * 
 * @arg cat
 * @type number
 * @text Quest Category ID
 * @desc If in use, select a category (0 for no category)
 * @min 0
 *
 * @arg short
 * @type string
 * @text Name (short)
 * @desc The name of the quest
 *
 * @arg long
 * @type string
 * @text Long Title
 * @desc A longer title for the description page, leave blank to use the Quest Name
 *
 * @arg index
 * @type number
 * @text Index
 * @desc The indexing number for the quest in the list
 *
 * @arg giver
 * @type string
 * @text Giver
 * @desc Information on the quest giver
 *
 * @arg area
 * @type string
 * @text Area
 * @desc Information on the location of the quest
 *
 * @arg desc
 * @type string
 * @text Description
 * @desc Information on the quest
 * 
 * @arg questTrans
 * @text Quest Translations
 * @desc Translations for the Quest
 * @default []
 * @type struct<questTxtTrans>[]
 *
 * @arg status
 * @text Status
 * @type select
 * @option Ongoing
 * @value ongoing
 * @option Completed
 * @value completed
 * @option Failed
 * @value failed
 * @desc Whether the quest is completed, ongoing or failed
 * @default ongoing
 * 
 * @arg logs
 * @text Detailed Logs (if active)
 * @type struct<detLogs>[]
 * @default []
 * @desc The detailed Logs for the quest
 * 
 * @arg track
 * @text Tracking Settings
 * @type struct<detTrack>
 * @default {"isTrackable":"true","text":"","textTrans":"[]"}
 * @desc The setting for tracking
 *
 * @command RemoveQuestNew
 * @text Remove Quest
 * @desc Removes quest searching by ID or Name.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to remove (leave 0 if using Name).
 *
 * @arg questName
 * @text Quest Name
 * @desc Name of the quest to be removed (leave blank if using ID).
 * @type text
 *
 * @command SetCompletion
 * @text Set Quest Completion Parameter
 * @desc Sets if a quest is completed or not searching by ID or Name.
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to edit. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to edit. (Must be exact name, leave blank if you use ID)
 * @default
 *
 * @arg status
 * @text Status
 * @type select
 * @option Ongoing
 * @value ongoing
 * @option Completed
 * @value completed
 * @option Failed
 * @value failed
 * @desc Whether the quest is completed, ongoing or failed.
 * @default ongoing
 *
 * @command editQuestDescriptors
 * @text Edit Quest Descriptors (name, description, icon, ...)
 * @desc Edit the Quest descriptors, leave them blank if no changes
 * 
 * @arg questID
 * @text Search by Quest ID
 * @type number
 * @default 0
 * @desc Search Quest by ID, leave 0 if you search by name
 * 
 * @arg questName
 * @text Search by Quest Name (not advised)
 * @default
 * @desc Search Quest by name (short title), it's advised to use Quest ID as it never changes. Leave blank if not used
 * 
 * @arg icon
 * @type icon
 * @text Icon
 * @desc The icon index to display for the quest, leave 0 if no changes
 * @default 0
 * 
 * @arg cat
 * @type number
 * @text Quest Category ID
 * @desc If in use, select a category (0 for no category), -1 for no changes
 * @min -1
 * @default -1
 *
 * @arg short
 * @type string
 * @text Name (short)
 * @desc The name of the quest (Blank for no changes)
 *
 * @arg long
 * @type string
 * @text Long Title
 * @desc A longer title for the description page, leave blank to use the Quest Name (Blank for no changes)
 *
 * @arg giver
 * @type string
 * @text Giver
 * @desc Information on the quest giver (Blank for no changes)
 *
 * @arg area
 * @type string
 * @text Area
 * @desc Information on the location of the quest (Blank for no changes)
 *
 * @arg desc
 * @type string
 * @text Description
 * @desc Information on the quest (Blank for no changes)
 * 
 * @arg questTrans
 * @text Quest Translations
 * @desc Translations for the Quest
 * @default []
 * @type struct<questTxtTrans>[]
 *
 * @command line2
 * @text --- Plugin Functionality ---
 * @desc Series of command to change words and fonts.
 *
 * @command newSetTitle
 * @text Set QuestLog Title
 * @desc Set the title of the QuestLog.
 *
 * @arg title
 * @text New Title (Default Language)
 * @desc The new title of the QuestLog.
 * 
 * @arg transTitle
 * @text New Title (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 *
 * @command SetQuestTitleFontSize
 * @text Set QuestLog Title's Font Size
 * @desc Sets the font size of the quest title
 *
 * @arg fontSize
 * @type number
 * @text Font Size
 * @desc The new font size value for the quest title
 * @min 1
 *
 * @command SetQuestInfoFontSize
 * @text Set Quest Description Font Size
 * @desc Set the Font Size of the Quest Description
 *
 * @arg fontSize
 * @type number
 * @text Font Size
 * @desc The new font size value for the quest title
 * @min 1
 *
 * @command SetQuestListFontSize
 * @text Set Quest List Font Size
 * @desc Set Quests' Name Font Size in the Quest List
 *
 * @arg fontSize
 * @type number
 * @min 1
 * @text Font Size
 * @desc The new font size value for the quest title
 *
 * @command newSetGiverPrefix
 * @text Set Giver Prefix
 * @desc Set the prefix for the quest's "Giver:" descriptor
 *
 * @arg prefix
 * @text New Prefix
 * @desc The new prefix for the quest giver (include ":" if you want them).
 * @type string
 * 
 * @arg transPrefix
 * @text New Prefix (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 *
 * @command newSetAreaPrefix
 * @text Set Area Prefix
 * @desc Set the prefix for the quest's "Area:" descriptor
 *
 * @arg prefix
 * @text New Prefix
 * @desc The new prefix for the quest area (include ":" if you want them).
 * @type string
 * 
 * @arg transPrefix
 * @text New Prefix (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 *
 * @command newSetStatusName
 * @text Set Status Prefix
 * @desc Set the name for the quest "Status:" prefix
 *
 * @arg name
 * @text New Status Name
 * @desc The new name for the quest status (include ":" if you want them).
 * @type string
 * 
 * @arg transName
 * @text New Status Name (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 *
 * @command newSetQuestCompleted
 * @text Set word for "Completed"
 * @desc Set the word for a completed quest
 *
 * @arg completed
 * @text New Completed
 * @desc The word to show for a completed quest
 * @type string
 * 
 * @arg transCompleted
 * @text New Completed (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 *
 * @command newSetQuestOngoing
 * @text Set word for "Ongoing"
 * @desc Set the word for an ongoing quest
 *
 * @arg ongoing
 * @text New Ongoing
 * @desc The word to show for an ongoing quest
 * @type string
 * 
 * @arg transOngoing
 * @text New Ongoing (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 *
 * @command newSetQuestFailed
 * @text Set word for "Failed"
 * @desc Set the word for a failed quest
 *
 * @arg failed
 * @text New Failed
 * @desc The word to show for a failed quest
 * @type string
 * 
 * @arg transFailed
 * @text New Failed (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 * 
 * @command newSetCommandName  
 * @text Set Command Name
 * @desc Sets the name of the quest command in the game menu
 *
 * @arg commandName
 * @type string
 * @text New Command Name
 * @desc The name to set for the quest command in the game menu
 * 
 * @arg transCommandName
 * @text New Command Name (Translations)
 * @default []
 * @type struct<genericSingleTrans>[]
 * 
 * @command line3
 * @text --- Game Editor Functionality ---
 * @desc Series of command to change words and fonts
 *
 * @command OpenQuestScene
 * @text Open Quest Scene
 * @desc Opens the Quest Scene.
 *
 * @command CheckQuestCompletion
 * @text Check if Quest is completed
 * @desc Checks if Quest is completed and stores result in a Switch or Variable
 *
 * @arg selectMode
 * @text Use Switch or Variable
 * @type select
 * @option Switch
 * @option Variable
 * @desc Switch is TRUE if completed, FALSE if not. Variable is 0 (ongoing), 1 (completed) or 2 (failed)
 * @default Switch
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to check. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to check. (Must be exact name, leave blank if you use ID)
 * @default
 *
 * @arg switchID
 * @type number
 * @text Switch/Variable ID
 * @desc The ID of the switch or variable to set
 * @default 1
 * @min 1
 *
 * @command line4
 * @text --- Graphic Changes ---
 * @desc Plugin command to change the Graphic settings
 *
 * @command changeGraphics
 * @text Change Graphic Settings
 * @desc Change to the desired Graphic Settings
 *
 * @arg titleFlag
 * @text Show QuestLog Title?
 * @type select
 * @option Don't change
 * @value title0
 * @option Show Title Window
 * @value title1
 * @option Hide Title Window
 * @value title2
 * @default title0
 * @desc Choose if you want to show the QuestLog title
 *
 * @arg layoutAlign
 * @text QuestLog Layout
 * @desc Select the QuestLog Layout
 * @type select
 * @option Don't change
 * @value layout0
 * @option Quest List on left, Info on right
 * @value layout1
 * @option Quest List on right, Info on left
 * @value layout2
 * @default layout0
 *
 * @arg layoutSize
 * @text Layout Size
 * @desc Select the QuestLog Layout size
 * @type select
 * @option Don't change
 * @value size0
 * @option 100% of the Graphic Box (classic)
 * @value size1
 * @option 90% of the Graphic Box (RMMZ style)
 * @value size2
 * @default size0
 *
 * @arg touchCancel
 * @text Show Touch Cancel Button?
 * @type select
 * @option Don't change
 * @value cancel0
 * @option Show Touch Cancel
 * @value cancel1
 * @option Hide Touch Cancel
 * @value cancel2
 * @default cancel0
 * @desc Choose if you want to show the touch cancel button (make sure the player has non touch commands if you don't)
 *
 * @arg skinSettings
 * @text Custom Skin
 * @type struct<skinSetArg>
 * @desc If you want to use a custom skin use this settings
 * @default {"skinFlag":"skin0","skinName":"","redT":"0","greenT":"0","blueT":"0"}
 * 
 * @command line5
 * @text --- Quest Extra Features Management ---
 * @desc Plugin command to change the extra features like Logs and Tracking
 * 
 * @command activateLog
 * @text Activate\Deactivate existing Logs
 * @desc Turn visible or invisible a log that is already in the Quest extra Logs
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to check. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to check. (Must be exact name, leave blank if you use ID)
 * @default
 * 
 * @arg logID
 * @text Log ID
 * @desc The ID of the log
 * @default
 * 
 * @arg visibleFlag
 * @text Turn it Visible?
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Make the log visible or invisible
 * @default true
 * 
 * @command addLog
 * @text Add a log to a quest
 * @desc Add a new log to a quest (its better practice to create all together and use visible/hidden flag)
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to check. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to check. (Must be exact name, leave blank if you use ID)
 * @default
 * 
 * @arg logSettings
 * @text Log properties
 * @type struct<detLogs>
 * @default {"logID":"Log000","logTitle":"Short tile here","logTitleTrans":"[]","isVisible":"true","graphStyle":"no","graphAlign":"center","graphPlacement":"above","iconID":"0","picID":"","picScale":"100","faceID":"","faceIndex":"0","charID":"","charSpecial":"false","charIndex":"0","textStyle":"true","textAlign":"center","textData":"","textDataTrans":"[]"}
 * @desc The detailed Log for the quest
 *
 * @command removeLog
 * @text Remove existing Log
 * @desc REMOVE (doesn't hide, it completely deletes) a log from a quest
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to check. (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to check. (Must be exact name, leave blank if you use ID)
 * @default
 * 
 * @arg logID
 * @text Log ID
 * @desc The ID of the log
 * @default
 * 
 * @command enableTracking
 * @text Enable/Disable Tracking
 * @desc Enable or Disable the Quest HUD Tracking
 *
 * @arg trackingFlag
 * @text Enable Tracking?
 * @on Enable
 * @off Disable
 * @default true
 * @desc Enable or Disable the Quest HUD Tracking
 * 
 * @command enablePlayerTracking
 * @text Enable/Disable Player Tracking
 * @desc Give or remove the authorization to manually track quest to the player
 *
 * @arg trackingFlag
 * @text Enable Player Tracking?
 * @on Enable
 * @off Disable
 * @default true
 * @desc Enable or Disable the Quest HUD Tracking by the player
 * 
 * @arg wipeFlag
 * @text Wipe previous tracking?
 * @on Remove tracking
 * @off Keep tracking
 * @default true
 * @desc Clear all the current tracked quest (Useful if removing player authorization)
 * 
 * @command addRemoveTracking
 * @text Add or Remove Quest Tracking
 * @desc Add / Remove quest HUD Tracking from a Dev side (ignores max quest restriction)
 *
 * @arg addFlag
 * @text Add or Remove?
 * @on Add
 * @off Remove
 * @default true
 * @desc Choose if you want to add or remove the tracking
 * 
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to track (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to track.(Must be exact name, leave blank if you use ID)
 * @default
 * 
 * @command changeTrackingText
 * @text Change Tracking Text
 * @desc Change the tracking text for a quest
 *
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc The ID of the quest to track (Leave 0 if you use the name)
 * @default 0
 *
 * @arg questName
 * @text Quest Name
 * @desc The name of the quest to track.(Must be exact name, leave blank if you use ID)
 * @default
 * 
 * @arg text
 * @text New HUD Text
 * @desc The tracking text to show, keep it short (You can use RMMZ text codes)
 * @default
 * 
 * @arg textTrans
 * @parent text
 * @text New HUD Text (Translations)
 * @desc Translations for the HUD Text
 * @default []
 * @type struct<trackTxtTrans>[]
 * 
 * @help WD_Quest.js
 *
 * The plugin creates a QuestLog that can will store your quests.
 *
 * The QuestLog can be called via script SceneManager.push(SceneManager.Scene_Quest);
 * or via Plugin Command or you can set the Parameter Menu Command true
 * to add a command in the game Menu
 *
 * You can edit both via parameter or plugin command (useful for translations)
 * the QuestLog title, the menu command text, the From: prefix, the Area:
 * prefix, the Status: prefix and the text used for "Completed" or "Ongoing"
 * quests
 *
 * The quest can be added via Plugin Command "Create Quest" and then they
 * will be displayed in the QuestLog ordered by their index.
 * Completed quest will still be visible but grayed out and pushed to the 
 * bottom of the list.
 *
 * Quests completion can be changed via Plugin Command, either by name
 * (must be exact name) or by quest ID
 *
 * Quests can also be completely removed (if you don't want to keep them
 * visible once completed or for whatever reason) via Plugin Command
 * either by name (must be exact name) or by quest ID
 *
 * If your game has a lot of quests I strongly advice to keep track of 
 * quest ID in some kind of note as the plugin doesn't show a full
 * list of the stored quest and their IDs
 *
 * NOTE: The Quest Description text can be split in different lines
 * by adding \n in the string. This works only for that field.
 * 
 * EXTERNAL SCRIPT CALL: You can call for "Check Quest Completion" from
 * any plugin or RPG MAKER MZ's Script Call:
 * - use window.WD_Interplugin_Quest.checkCompletionID(#) to search
 *   quest ID # completion
 * - use window.WD_Interplugin_Quest.checkCompletionName(#) to search
 *   quest name # completion
 * The script call will result true if completed or false if failed or
 * ongoing
 *
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 * And if you want a direct line with me, you can join my Discord:
 * https://discord.gg/AZR38kGG4F
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 *
 * //////////////////////////////////////////////////
 * VERSION 2.0.2 Changelog
 * - Corrected a typo that would block the "Edit Quest Descriptor" command,
 *   thanks to tinribs26 for the report!
 * - Also correct a misplaced code line that would crash the above command
 *   when launched
 * VERSION 2.0.1 Changelog
 * - The plugin wasn't saving correctly the quests! Thanks to kricu for the
 *   report, now it's all correct. NOTE: Old savefiles won't work, sadly,
 *   only work with new saves.
 * - The tracking system now correctly saves the tracking preference and
 *   loads them when the player loads a savefile!
 * VERSION 2.0.0 Changelog
 * - Code rebuilt and updated but kept compatible with older versions
 * - Updated the Discord invite link in the help file that was invalid,
 *   embarassing!
 * - Added translations managed via WD_Core
 * - Dynamic Resize has been moved to WD_Core, plus a new text management
 *   option has been added: AutoWrap. Just write your sentence (supports RMMZ
 *   text codes) and the code will automatically wrap the text in the 
 *   designed area. No need to manually use the \n code (but you still can
 *   if you want to force a new line). If the text is still too big, the
 *   AutoWrap will try to shrink the font size to the minimum required.
 * - Added the optional rule to display an expanded data log if the player
 *   clicks on the quest
 * - Added the optional rule to activate a small Quest List on the map
 *   scene (either managed by the player or by the dev)
 * - Added Quest Categories to group quests together
 * VERSION 1.6.1 Changelog
 * - Changed the Quest Title from DrawText to DrawTextEx. The text will
 *   still be centered but now you can add the standard RMMZ commands 
 *   such as \I for Icons or \C for colours
 * VERSION 1.6 Changelog
 * - Fixed a bug were the old quest files would be deleted if any quest
 *   action (like accepting a quest) would be done after reloading a 
 *   save and before opening the questlog. (Thanks to TewiInaba for the
 *   report)
 * - Fixed a minor bug in the "Complete Quest" command
 * - Changed the Icon selection parameters from a number to an icon
 *   selector
 * - Added an external script call to check quest completion, see help
 * VERSION 1.5 Changelog
 * - Fixed an unexpected behaviour in the Auto Size description text 
 *   that resets the font size after correctly finding the fitting 
 *   value
 * - Added a padding value to the text to have the desired look to 
 *   the text graphic
 * - Added a full support for RMMZ text codes while keeping the alignment
 *   options
 * - Minor tweaks to the Plugin Parameters
 * - Now the plugin will automatically support compatibility with v1.1
 *   or lower without having to choose different files
 * VERSION 1.4 Changelog
 * - Added the setting to show or hide the title in the QuestLog
 * - Added the possibility to switch the quest list / quest info layout
 * - Added the option to use 100% of the graphic box (standard setting
 *   for this plugin) or 90% (standard RPG Maker MZ scene compatible 
 *   with cancel touch button)
 * - Added the possibility to hide the cancel touch button (useful for 
 *   100% size, but make sure the player has access to non touch controls)
 * - Added the possibility to change the windows skin for the QuestLog only,
 *   also you can change the colors tone (by re-selecting the default skin 
 *   you can apply different color tones to it)
 * - Added a new plugin command to change all the above mid-game
 * VERSION 1.3.2 Changelog
 * - Fixed an old part of the code creating two problems: A black layer under
 *   the scene and no centering if the Game UI was changed from the System 2
 *   tab as reported from ryf and Puppet Knight
 * VERSION 1.3.1 Changelog
 * - Hotfix for a small bug that would turn the menu command name to "true",
 *   thanks to ryf for the report!
 * VERSION 1.3 Changelog
 * - Updated the code to a newer version with, but not limited to, tweaks
 *   to the save and load functionality.
 * - Added the "Failed" status to the Quests with the needed changes to 
 *   "Add Quest", "Set Completion" and "Check Completion". Added bits of
 *   code to allow retrocompatibility with the older versions.
 * - Added the option to Autoset the Description Font Size, the plugin will
 *   range from a font size of 100 to a font size of 10, trying to fit the
 *   text both in width and height. You still need to break the lines with
 *   \n as before. The autosize text is only left aligned due to a limitation
 *   of the DrawTextEx feature used. (On the positive side, it should accept
 *   the usual RMMZ text code like \I for icons, didn't tried it)
 * - Added the possibility to add a longer title that will be displayed in the
 *   Quest Informations window (while the short name will be used for the quest
 *   list on the left). If you don't need it just leave blank the field.
 * - Minor fix on a bug that could cause the menu button to change name due to
 *   a conflict with the Quest List items
 * VERSION 1.2.2 Changelog 
 * - Hotfix for changes made in 1.2.1 as Plugin Parameters from Plugin Manager
 *   where not correctly loaded (Report by Grillmonger)
 * VERSION 1.2.1 Changelog 
 * - Fixed an issue reported by Grillmonger where QuestList would wipe if game 
 *   was closed entrely and then reloaded. Upon further investigation the fix 
 *   was extended to the other Plugin Parameters too (Such as Title Font, etc..)
 *   who would not carry over the changes if done via Plugin Command
 * VERSION 1.2 Changelog
 * - Merged "Set Completion by ID / by Name" and "Remove Quest by ID / by Name"
 * - Changed font size for the Quest List and Quest Description, you can change
 *   them via Plugin Parameters or Plugin Command 
 * - Changed the alignemnt con Quest List from "left" to "Center", can be 
 *   changed via Plugin Parameter
 * - Created a command that checks if a quest is completed and stores the
 *   result in a Switch of your choice (ON for Complete, OFF for Ongoing)
 * - Created a plugin command to change the Quest Icon searching it by ID or 
 *   Name
 * VERSION 1.1 Changelog
 * - Added new plugin command to edit an existing quest 
 *   description by ID or Quest Name
 * - Added new Plugin Command to change FontSize
 * //////////////////////////////////////////////////
 *
 */
 /*~struct~skinSet:
 * @param skinFlag
 * @text Use special Window Skin?
 * @type boolean
 * @desc Choose if you want to use a different skin for the QuestLog
 * @default false
 *
 * @param skinName
 * @text Select the Skin
 * @type file
 * @dir img/system
 * @desc The new skin you want to use
 * @default
 * 
 * @param redT
 * @text Red Tone Regulation
 * @type number
 * @desc (Optional) Choose the red tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param greenT
 * @text Green Tone Regulation
 * @type number
 * @desc (Optional) Choose the green tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param blueT
 * @text Blue Tone Regulation
 * @type number
 * @desc (Optional) Choose the blue tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 */
 /*~struct~skinSetArg:
 * @param skinFlag
 * @text Use special Window Skin?
 * @type select
 * @option Don't change
 * @value skin0
 * @option Use Custom
 * @value skin1
 * @option Use Default
 * @value skin2
 * @default skin0
 * @desc Choose if you want to use a different skin for the QuestLog
 *
 * @param skinName
 * @text Select the Skin
 * @type file
 * @dir img/system
 * @desc The new skin you want to use
 * @default
 * 
 * @param redT
 * @text Red Tone Regulation
 * @type number
 * @desc (Optional) Choose the red tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param greenT
 * @text Green Tone Regulation
 * @type number
 * @desc (Optional) Choose the green tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 *
 * @param blueT
 * @text Blue Tone Regulation
 * @type number
 * @desc (Optional) Choose the blue tone correction (from -255 to 255)
 * @default 0
 * @min -255
 * @max 255
 */
 /*~struct~settingsTransPack:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param questTitle
 * @text Title
 * @desc Set the title of the QuestLog
 * @default QuestLog
 *
 * @param giverPrefix
 * @text Giver Prefix
 * @desc How the "From:" prefix is shown in the Quest Giver
 * @default From:
 *
 * @param areaPrefix
 * @text Area Prefix
 * @desc How the "Area:" prefix is shown in the Quest Area
 * @default Area:
 *
 * @param statusName
 * @text Status Name
 * @desc How the "Status:" is shown for Quest Completion
 * @default Status:
 *
 * @param questCompleted
 * @text Quest Completed
 * @desc Word to show if quest is completed
 * @default Completed
 *
 * @param questOngoing
 * @text Quest Ongoing
 * @desc Word to show if quest is ongoing
 * @default Ongoing
 *
 * @param questFailed
 * @text Quest Failed
 * @desc Word to show if quest is failed
 * @default Failed
 * 
 * @param questMenuCommandName
 * @text Command Name
 * @desc Set the name of the command (if activated)
 * @default QuestLog
 * 
 * @param logText
 * @text Command Name for Logs
 * @desc The text of the command to open the detailed logs
 * @default Logs
 * 
 * @param trackText
 * @text Command Name for Quest Tracking (Track)
 * @desc The text of the command to start tracking a quest
 * @default Track Quest
 * 
 * @param untrackText
 * @text Command Name for Quest Tracking (Remove Track)
 * @desc The text of the command to stop tracking a quest
 * @default Don't Track
 */ 
 /*~struct~catData:
 * @param uncategorizedName
 * @text No Category Name
 * @desc The "category" where the quest with no category are grouped
 * @default --No Category--
 * 
 * @param uncategorizedNameTrans
 * @parent uncategorizedName
 * @text No Category Name (Translations)
 * @type struct<uncatTrans>[]
 * @desc The translations for No Categories
 * @default []
 * 
 * @param uncategoryIndex
 * @text No Category Index
 * @desc The Indexing order of no category group
 * @default 999
 * @type number
 * @min 1
 * 
 * @param categoriesDatabase
 * @text Categories Database
 * @type struct<catList>[]
 * @desc The various Categories
 * @default []
 */
 /*~struct~uncatTrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param uncategorizedName
 * @text No Category Name (Translation)
 * @desc The "category" where the quest with no category are grouped (Translation)
 * @default --No Category--
 */
 /*~struct~catList:
 * @param categoryID
 * @text Category ID (Unique)
 * @desc The Category ID, must be unique
 * @default 1
 * @type number
 * @min 1
 * 
 * @param categoryIndex
 * @text Category Index
 * @desc The Indexing order of this category
 * @default 1
 * @type number
 * @min 1
 * 
 * @param categoryName
 * @text Category Name
 * @desc The name of the category
 * @default Important
 * 
 * @param categoryNameTrans
 * @parent categoryName
 * @text Category Name (Translations)
 * @type struct<catTrans>[]
 * @desc The translations for this category
 * @default []
 */ 
 /*~struct~catTrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param categoryName
 * @text Category Name (Translation)
 * @desc The name of the category (Translation)
 * @default Important
 */
 /*~struct~detLogs:
 * @param logID
 * @text Log ID (Unique for the quest)
 * @desc The ID of the Log (must be unique for the quest)
 * @default Log000
 * 
 * @param logTitle
 * @text Log Small Title
 * @desc The small title in the log list (accept RMMZ code)
 * @default Short tile here
 * 
 * @param logTitleTrans
 * @parent logTitle
 * @text Log Small Title (Translations)
 * @desc The small title in the log list (translatations)
 * @default []
 * @type struct<logTitleTrans>[]
 * 
 * @param isVisible
 * @text Is Visible?
 * @desc Is the log visible?
 * @default true
 * @type boolean
 * @on Visible
 * @off Hidden
 * 
 * @param graphStyle
 * @text Graphic Image
 * @type select
 * @option No Image
 * @value no
 * @option Icon
 * @value icon
 * @option Face Image
 * @value face
 * @option Character Image
 * @value char
 * @option Picture
 * @value pic
 * @default no
 * @desc Choose the Graphic Element (if any)
 * 
 * @param graphAlign
 * @parent graphStyle
 * @text Graphic Alignment
 * @type select
 * @option Center
 * @value center
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default center
 * @desc Choose the Graphic Element alignment
 * 
 * @param graphPlacement
 * @parent graphStyle
 * @text Graphic Placement
 * @type select
 * @option Above Text
 * @value above
 * @option Below Text
 * @value below
 * @default above
 * @desc Choose the Graphic Element placement
 * 
 * @param iconID
 * @parent graphStyle
 * @text Icon Selection (if icon)
 * @type icon
 * @default 0
 * @desc Choose the icon
 * 
 * @param picID
 * @parent graphStyle
 * @text Picture Selection (if picture)
 * @type file
 * @dir img/pictures
 * @default
 * @desc Choose the picture file
 * 
 * @param picScale
 * @parent graphStyle
 * @text Picture Size (Percentage)
 * @type number
 * @default 100
 * @min 1
 * @max 9999
 * @desc The resize percentage of the Picture in percentage (by default 100%)
 * 
 * @param faceID
 * @parent graphStyle
 * @text Face Selection (if face)
 * @type file
 * @dir img/faces
 * @default
 * @desc Choose the face file
 * 
 * @param faceIndex
 * @parent graphStyle
 * @text Face Index (if face)
 * @type number
 * @default 0
 * @min 0
 * @max 7
 * @desc Choose the face index for the file (0 top-left .. 7 bottom-right)
 * 
 * @param charID
 * @parent graphStyle
 * @text Character Selection (if character)
 * @type file
 * @dir img/characters
 * @default
 * @desc Choose the character file
 * 
 * @param charIndex
 * @parent graphStyle
 * @text Character Index (if character)
 * @type number
 * @default 0
 * @min 0
 * @max 7
 * @desc Choose the character index for the file (0 top-left .. 7 bottom-right)
 * 
 * @param charSpecial
 * @parent charID
 * @text Is Character Sheet Special?
 * @desc Does the character sheet have the $ symbol? Meaning only 1 set insted of 8?
 * @default false
 * @type boolean
 * @on Special ($ symbol)
 * @off Normal
 * 
 * @param textStyle
 * @text Show Text Description
 * @type select
 * @default true
 * @type boolean
 * @on show Text
 * @off No Text
 * @desc Show text?
 * 
 * @param textAlign
 * @parent textStyle
 * @text Text Alignment
 * @type select
 * @option Center
 * @value center
 * @option Left
 * @value left
 * @option Right
 * @value right
 * @default center
 * @desc Choose the Text Element alignment
 * 
 * @param textData
 * @parent textStyle
 * @text Text Description
 * @type multiline_string
 * @default
 * @desc The text to show (compatible with RMMZ text codes)
 * 
 * @param textDataTrans
 * @parent textData
 * @text Text Description (Translations)
 * @type struct<txtDatatrans>[]
 * @default []
 * @desc The text to show (translations)
 */
 /*~struct~logTitleTrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param logTitle
 * @text Log Title (Translation)
 * @desc The log title (Translation)
 * @default
 */
 /*~struct~txtDatatrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param textData
 * @parent textStyle
 * @text Text Description
 * @type multiline_string
 * @default
 * @desc The text to show (compatible with RMMZ text codes)
 */
 /*~struct~trackOpt:
 * @param maxQuest
 * @type number
 * @text Max Trackable Quests
 * @desc The number of quests that can be tracked, choose a sensible value based on the size of the HUD
 * @default 3
 * @min 1
 *
 * @param textColor
 * @text Text Color
 * @desc Hex Code for the HUD color (#ffffff default Rpg Maker white)
 * @default #ffffff
 * 
 * @param maxFont
 * @text Max Font Size
 * @type number
 * @desc The max font size fo the HUD elements (can be reduce to fit the descriptions)
 * @default 16
 * @min 5
 * 
 * @param hudSize
 * @text HUD Area Size
 * @type struct<trackOptSize>
 * @desc Set the area of the HUD
 * @default {"width":"20","height":"20","x":"0","y":"0"}
 */
 /*~struct~trackOptSize:
 * @param width
 * @type number
 * @text HUD Width
 * @desc The width of the HUD area
 * @default 20
 * @min 10
 * @max 100
 *
 * @param height
 * @type number
 * @text HUD Height
 * @desc The height of the HUD area
 * @default 20
 * @min 10
 * @max 100
 * 
 * @param x
 * @type number
 * @text HUD X Start
 * @desc The X start of the HUD area (leftmost pixel)
 * @default 0
 * 
 * @param y
 * @type number
 * @text HUD Y Start
 * @desc The Y start of the HUD area (uppermost pixel)
 * @default 0
 */
 /*~struct~detTrack:
 * @param isTrackable
 * @type boolean
 * @text Can be tracked (only for Player Tracking)
 * @desc Player can track the quest? (Dev can always track quests)
 * @default true
 * @on Allow
 * @off Deny
 *
 * @param text
 * @text HUD Text
 * @desc The tracking text to show, keep it short (You can use RMMZ text codes)
 * @default
 * 
 * @param textTrans
 * @parent text
 * @text HUD Text (Translations)
 * @desc Translations for the HUD Text
 * @default []
 * @type struct<trackTxtTrans>[]
 */
 /*~struct~trackTxtTrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param text
 * @text HUD Text (Translated)
 * @desc The tracking text to show, keep it short
 * @default
 */
 /*~struct~questTxtTrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param short
 * @type string
 * @text Name (short)
 * @desc The name of the quest
 *
 * @param long
 * @type string
 * @text Long Title
 * @desc A longer title for the description page, leave blank to use the Quest Name
 *
 * @param giver
 * @type string
 * @text Giver
 * @desc Information on the quest giver
 *
 * @param area
 * @type string
 * @text Area
 * @desc Information on the location of the quest
 *
 * @param desc
 * @type string
 * @text Description
 * @desc Information on the quest
 */
 /*~struct~genericSingleTrans:
 * @param language
 * @text Translation Language
 * @type select
 * @default English
 * @option 	Abkhazian
 * @option 	Afar
 * @option 	Afrikaans
 * @option 	Akan
 * @option 	Albanian
 * @option 	Amharic
 * @option 	Arabic
 * @option 	Aragonese
 * @option 	Armenian
 * @option 	Assamese
 * @option 	Avaric
 * @option 	Avestan
 * @option 	Aymara
 * @option 	Azerbaijani
 * @option 	Bambara
 * @option 	Bashkir
 * @option 	Basque
 * @option 	Belarusian
 * @option 	Bengali
 * @option 	Bislama
 * @option 	Bosnian
 * @option 	Breton
 * @option 	Bulgarian
 * @option 	Burmese
 * @option 	Catalan, Valencian
 * @option 	Chamorro
 * @option 	Chechen
 * @option 	Chichewa, Chewa, Nyanja
 * @option 	Chinese
 * @option 	Church Slavonic, Old Slavonic, Old Church Slavonic
 * @option 	Chuvash
 * @option 	Cornish
 * @option 	Corsican
 * @option 	Cree
 * @option 	Croatian
 * @option 	Czech
 * @option 	Danish
 * @option 	Divehi, Dhivehi, Maldivian
 * @option 	Dutch, Flemish
 * @option 	Dzongkha
 * @option 	English
 * @option 	Esperanto
 * @option 	Estonian
 * @option 	Ewe
 * @option 	Faroese
 * @option 	Fijian
 * @option 	Finnish
 * @option 	French
 * @option 	Western Frisian
 * @option 	Fulah
 * @option 	Gaelic, Scottish Gaelic
 * @option 	Galician
 * @option 	Ganda
 * @option 	Georgian
 * @option 	German
 * @option 	Greek, Modern (1453–)
 * @option 	Kalaallisut, Greenlandic
 * @option 	Guarani
 * @option 	Gujarati
 * @option 	Haitian, Haitian Creole
 * @option 	Hausa
 * @option 	Hebrew
 * @option 	Herero
 * @option 	Hindi
 * @option 	Hiri Motu
 * @option 	Hungarian
 * @option 	Icelandic
 * @option 	Ido
 * @option 	Igbo
 * @option 	Indonesian
 * @option 	Interlingua (International Auxiliary Language Association)
 * @option 	Interlingue, Occidental
 * @option 	Inuktitut
 * @option 	Inupiaq
 * @option 	Irish
 * @option 	Italian
 * @option 	Japanese
 * @option 	Javanese
 * @option 	Kannada
 * @option 	Kanuri
 * @option 	Kashmiri
 * @option 	Kazakh
 * @option 	Central Khmer
 * @option 	Kikuyu, Gikuyu
 * @option 	Kinyarwanda
 * @option 	Kirghiz, Kyrgyz
 * @option 	Komi
 * @option 	Kongo
 * @option 	Korean
 * @option 	Kuanyama, Kwanyama
 * @option 	Kurdish
 * @option 	Lao
 * @option 	Latin
 * @option 	Latvian
 * @option 	Limburgan, Limburger, Limburgish
 * @option 	Lingala
 * @option 	Lithuanian
 * @option 	Luba-Katanga
 * @option 	Luxembourgish, Letzeburgesch
 * @option 	Macedonian
 * @option 	Malagasy
 * @option 	Malay
 * @option 	Malayalam
 * @option 	Maltese
 * @option 	Manx
 * @option 	Maori
 * @option 	Marathi
 * @option 	Marshallese
 * @option 	Mongolian
 * @option 	Nauru
 * @option 	Navajo, Navaho
 * @option 	North Ndebele
 * @option 	South Ndebele
 * @option 	Ndonga
 * @option 	Nepali
 * @option 	Norwegian
 * @option 	Norwegian Bokmål
 * @option 	Norwegian Nynorsk
 * @option 	Occitan
 * @option 	Ojibwa
 * @option 	Oriya
 * @option 	Oromo
 * @option 	Ossetian, Ossetic
 * @option 	Pali
 * @option 	Pashto, Pushto
 * @option 	Persian
 * @option 	Polish
 * @option 	Portuguese
 * @option 	Punjabi, Panjabi
 * @option 	Quechua
 * @option 	Romanian, Moldavian, Moldovan
 * @option 	Romansh
 * @option 	Rundi
 * @option 	Russian
 * @option 	Northern Sami
 * @option 	Samoan
 * @option 	Sango
 * @option 	Sanskrit
 * @option 	Sardinian
 * @option 	Serbian
 * @option 	Shona
 * @option 	Sindhi
 * @option 	Sinhala, Sinhalese
 * @option 	Slovak
 * @option 	Slovenian
 * @option 	Somali
 * @option 	Southern Sotho
 * @option 	Spanish, Castilian
 * @option 	Sundanese
 * @option 	Swahili
 * @option 	Swati
 * @option 	Swedish
 * @option 	Tagalog
 * @option 	Tahitian
 * @option 	Tajik
 * @option 	Tamil
 * @option 	Tatar
 * @option 	Telugu
 * @option 	Thai
 * @option 	Tibetan
 * @option 	Tigrinya
 * @option 	Tonga (Tonga Islands)
 * @option 	Tsonga
 * @option 	Tswana
 * @option 	Turkish
 * @option 	Turkmen
 * @option 	Twi
 * @option 	Uighur, Uyghur
 * @option 	Ukrainian
 * @option 	Urdu
 * @option 	Uzbek
 * @option 	Venda
 * @option 	Vietnamese
 * @option 	Volapük
 * @option 	Walloon
 * @option 	Welsh
 * @option 	Wolof
 * @option 	Xhosa
 * @option 	Sichuan Yi, Nuosu
 * @option 	Yiddish
 * @option 	Yoruba
 * @option 	Zhuang, Chuang
 * @option 	Zulu
 * 
 * @param transl
 * @type string
 * @text Translated Term
 * @desc The translation of the term in the selected language
 */

!function(){const t=PluginManager.parameters("WD_Quest");class p{constructor(t,e,a,i,s,n,r,o,u,g,c,l,d,h){this.id=e,this.icon=a,this.shortTitle=i,this.longTitle=s,this.index=n,this.giver=r,this.area=o,this.description=u,this.status=g,this.trackData=this.buildTrackData(t?null:c,this.id),this.logs=this.buildLogs(t?null:l),this.translationPacks=d,this.categoryID=t?0:h}buildTrackData(t,e){e={id:e,isTrackable:!1,trackText:null,trackTextTranslations:[]};if(null!=t){var t=JSON.parse(t),a=(e.isTrackable="true"===t.isTrackable,e.trackText=t.text,JSON.parse(t.textTrans));for(let t=0;t<a.length;t++)a[t]=JSON.parse(a[t]);e.trackTextTranslations=a}return e}buildLogs(t){var a=[];if(null!=t){var i=JSON.parse(t);for(let e=0;e<i.length;e++){i[e]=JSON.parse(i[e]),i[e].isVisible="true"===i[e].isVisible,i[e].textStyle="true"===i[e].textStyle,i[e].charSpecial="true"===i[e].charSpecial,i[e].charIndex=parseInt(i[e].charIndex),i[e].faceIndex=parseInt(i[e].faceIndex),i[e].iconID=parseInt(i[e].iconID),i[e].picScale=parseInt(i[e].picScale),i[e].textDataTrans=JSON.parse(i[e].textDataTrans);for(let t=0;t<i[e].textDataTrans.length;t++)i[e].textDataTrans[t]=JSON.parse(i[e].textDataTrans[t]);i[e].logTitleTrans=JSON.parse(i[e].logTitleTrans);for(let t=0;t<i[e].logTitleTrans.length;t++)i[e].logTitleTrans[t]=JSON.parse(i[e].logTitleTrans[t]);var s=i[e],s={id:s.logID,isVisible:s.isVisible,graphics:{style:s.graphStyle,align:s.graphAlign,placement:s.graphPlacement,icon:{id:s.iconID},face:{id:s.faceID,index:s.faceIndex},character:{id:s.charID,index:s.charIndex,isSpecial:s.charSpecial},picture:{id:s.picID,scale:s.picScale}},text:{showText:s.textStyle,align:s.textAlign,data:s.textData,transData:s.textDataTrans},title:{default:s.logTitle,trans:s.logTitleTrans}};a.push(s)}}return a}}class e{constructor(){this.textData={defaultLanguage:t.defaultLanguage||"English",autoLanguage:"true"===t.autoDetectFlag,forcedLanguage:null,defaultData:{questTitle:t.Title||"QuestLog",giverPrefix:t.giverprefix||"From:",areaPrefix:t.areaprefix||"Area:",statusName:t.statusname||"Status:",questCompleted:t.questcompleted||"Completed",questOngoing:t.questongoing||"Ongoing",questFailed:t.questfailed||"Failed",questMenuCommandName:t.commandname||"QuestLog",logText:t.logsDefText||"Logs",trackText:t.trackDefText||"Track Quest",untrackText:t.untrackDefText||"Don't Track"},translationData:[],currentLanguage:{questTitle:"",giverPrefix:"",areaPrefix:"",statusName:"",questCompleted:"",questOngoing:"",questFailed:"",questMenuCommandName:"",logText:"",trackText:"",untrackText:""}},this.loadTranslationsPack(),this.textSettings={infoAlign:t.infoalign||"center",listAlign:t.listAlign||"center",textManagement:t.textManagement||"wrap",fontSize:Number(t.fontsize)||40,descriptionSize:Number(t.descriptionSize)||20,listSize:Number(t.listSize)||20,paddingValue:Number(t.paddingValue)||50},this.layoutSettings={showMenuCommand:"true"===t.menucommand,titleFlag:"true"===t.titleFlag,layoutAlign:t.layoutAlign||"layout1",layoutSize:t.layoutSize||"size1",touchCancel:"true"===t.touchCancel,skinSettings:s(t.skinSettings)},this.categoriesSettings=this.elaborateCategoriesParameters(),this.compatibilityLoad=!1,this.extraSettings=this.eleborateExtraParameters(),this.errorManagement=t.errorManagement||"err1"}eleborateExtraParameters(){return{logs:{isActive:"true"===t.logsFlag},tracking:{isActive:"no"!==t.trackSetting,allowPlayerTracking:"player"===t.trackSetting,trackingSettings:this.extractTrackingConfig(JSON.parse(t.trackConfiguration),!0),hudSettings:this.extractTrackingConfig(JSON.parse(t.trackConfiguration),!1),currentlyTracked:[]}}}extractTrackingConfig(t,e){return e?{maxQuest:parseInt(t.maxQuest)||3,color:t.textColor||"#ffffff",maxFont:parseInt(t.maxFont)||16}:(e=JSON.parse(t.hudSize),{width:parseInt(e.width)||20,height:parseInt(e.height)||20,x:parseInt(e.x)||0,y:parseInt(e.y)||0})}elaborateCategoriesParameters(){return{isActive:"true"===t.categoryFlag,displayType:function(t){switch(t){case"category":return 0;case"status":return 1;default:return 0}}(t.categoryPriority),categories:function(t){var a=JSON.parse(t);a.uncategorizedNameTrans=JSON.parse(a.uncategorizedNameTrans);for(let t=0;t<a.uncategorizedNameTrans.length;t++)a.uncategorizedNameTrans[t]=JSON.parse(a.uncategorizedNameTrans[t]);a.uncategoryIndex=parseInt(a.uncategoryIndex),a.categoriesDatabase=JSON.parse(a.categoriesDatabase);for(let e=0;e<a.categoriesDatabase.length;e++){a.categoriesDatabase[e]=JSON.parse(a.categoriesDatabase[e]),a.categoriesDatabase[e].categoryID=parseInt(a.categoriesDatabase[e].categoryID),a.categoriesDatabase[e].categoryIndex=parseInt(a.categoriesDatabase[e].categoryIndex),a.categoriesDatabase[e].categoryNameTrans=JSON.parse(a.categoriesDatabase[e].categoryNameTrans);for(let t=0;t<a.categoriesDatabase[e].categoryNameTrans.length;t++)a.categoriesDatabase[e].categoryNameTrans[t]=JSON.parse(a.categoriesDatabase[e].categoryNameTrans[t])}var e=new Set,i=[{id:0,index:a.uncategoryIndex,name:a.uncategorizedName,trans:a.uncategorizedNameTrans}];e.add(0);for(const n of a.categoriesDatabase){var s={id:n.categoryID,index:n.categoryIndex,name:n.categoryName,trans:n.categoryNameTrans};e.has(n.categoryID)?c(n,1):(e.add(n.categoryID),i.push(s))}return i}(t.categoryDatabase)}}loadTranslationsPack(){var e=JSON.parse(t.translationPacks);for(let t=0;t<e.length;t++)e[t]=JSON.parse(e[t]);this.textData.translationData=e,this.changeLanguage(!0,null)}saveSettings(){_(this)}loadSettings(){this.compatibilityLoad||this.checkOldSaves(),W()}checkOldSaves(){this.compatibilityLoad=!0;var t=C();null!==t&&(this.textData.defaultData.questTitle=t.questTitle,this.textData.defaultData.areaPrefix=t.areaPrefix,this.textData.defaultData.giverPrefix=t.giverPrefix,this.textData.defaultData.statusName=t.statusName,this.textData.defaultData.questCompleted=t.questCompleted,this.textData.defaultData.questOngoing=t.questOngoing,this.textData.defaultData.questFailed=t.questFailed,this.textData.defaultData.questMenuCommandName=t.questMenuCommandName,this.textSettings.fontSize=t.fontSize,this.textSettings.descriptionSize=t.descriptionSize,this.textSettings.listSize=t.listSize,this.layoutSettings.titleFlag=t.titleFlag,this.layoutSettings.layoutAlign=t.layoutAlign,this.layoutSettings.layoutSize=t.layoutSize,this.layoutSettings.skinSettings=t.skinSettings,this.layoutSettings.touchCancel=t.touchCancel,this.changeLanguage(!0,null))}changeLanguage(t,e){var a={questTitle:this.textData.defaultData.questTitle,giverPrefix:this.textData.defaultData.giverPrefix,areaPrefix:this.textData.defaultData.areaPrefix,statusName:this.textData.defaultData.statusName,questCompleted:this.textData.defaultData.questCompleted,questOngoing:this.textData.defaultData.questOngoing,questFailed:this.textData.defaultData.questFailed,questMenuCommandName:this.textData.defaultData.questMenuCommandName,logText:this.textData.defaultData.logText,trackText:this.textData.defaultData.trackText,untrackText:this.textData.defaultData.untrackText,language:this.textData.defaultLanguage},i=this.textData.translationData;t?this.textData.autoLanguage?this.textData.currentLanguage=window.WD_Interplugin_Core.translateData(a,i):null!==this.textData.forcedLanguage?this.textData.currentLanguage=window.WD_Interplugin_Core.forceLanguage(a,i,this.textData.forcedLanguage):this.textData.currentLanguage={questTitle:this.textData.defaultData.questTitle,giverPrefix:this.textData.defaultData.giverPrefix,areaPrefix:this.textData.defaultData.areaPrefix,statusName:this.textData.defaultData.statusName,questCompleted:this.textData.defaultData.questCompleted,questOngoing:this.textData.defaultData.questOngoing,questFailed:this.textData.defaultData.questFailed,questMenuCommandName:this.textData.defaultData.questMenuCommandName,logText:this.textData.defaultData.logText,trackText:this.textData.defaultData.trackText,untrackText:this.textData.defaultData.untrackText}:this.textData.currentLanguage=window.WD_Interplugin_Core.forceLanguage(a,i,e)}updateLanguageTerms(e,t,a){if(t)this.textData.defaultData[e]=a;else for(const s of a){var i=s.language;let t=null;for(const n of this.textData.translationData)if(n.language===i){t=n;break}t&&(t[e]=s.transl)}this.textData.autoLanguage?this.changeLanguage(!0,null):this.textData.forcedLanguage?this.changeLanguage(!1,this.textData.forcedLanguage):this.changeLanguage(!1,null)}}var a=PluginManager._scripts,i={coreFound:!1,coreIndex:-1,coreVersion:{major:0,minor:0,hotfix:0},thisIndex:-1};for(let t=0;t<a.length;t++)"WD_Core"===a[t]&&(i.coreFound=!0,i.coreIndex=t,i.coreVersion=window.WD_Interplugin_Core.coreVersion),"WD_Quest"===a[t]&&(i.thisIndex=t);if(!i.coreFound)throw new Error("WD_Quest: The plugin WD_Core has not been found! WD_Core is needed to run this plugin, please dowload on Itch or Ko-fi for free (see help file)");if(i.thisIndex<i.coreIndex)throw new Error("WD_Quest: The plugin WD_Core is loaded after this plugin, please move the plugin WD_Core ABOVE this plugin in the Rpg Maker Plugin Manager");if(1===i.coreVersion.major&&i.coreVersion.minor<1)throw new Error("WD_Quest: The plugin WD_Core is outdated! WD_Core needs to be at least v1.1 for this plugin, please dowload on Itch or Ko-fi for free (see help file)");const f=new class{constructor(){this.compatibilityLoad=!1,this.questsArray=[]}loadQuests(){Q(),this.compatibilityLoad||(this.compatibilityLoad=!0,this.searchOldVersionSave())}searchOldVersionSave(){var t=L();if(0<t.length){for(const e of t){let t=null;t=e.hasOwnProperty("complete")&&!e.hasOwnProperty("status")?quest.complete?"completed":"ongoing":e.status,this.addQuest(!0,e.id,e.icon,e.name,e.longTitle,e.index,e.giver,e.area,e.description,t,null,null,[],0)}this.saveQuests()}}saveQuests(){q()}addQuest(t,e,a,i,s,n,r,o,u,g,c,l,d,h){t=new p(t,e,a,i,s,n,r,o,u,g,c,l,d,h);this.noDuplicate(t)&&this.questsArray.push(t)}noDuplicate(t){var e=new Set;for(const a of this.questsArray)e.add(a.id);return!e.has(t.id)||(c(t,0),!1)}removeQuest(e,a){var i={found:!1,index:0};for(let t=0;t<this.questsArray.length;t++)if(!isNaN(e)&&0<e&&this.questsArray[t].id===e||""!==a&&this.questsArray[t].shortTitle===a){i.found=!0,i.index=t;break}i.found&&this.questsArray.splice(i.index,1)}},w=new e;let r=!1;function n(t){return"Width"===t?"size1"===w.layoutSettings.layoutSize?Graphics.boxWidth:.9*Graphics.boxWidth:"Height"===t?"size1"===w.layoutSettings.layoutSize?Graphics.boxHeight:.9*Graphics.boxHeight:"Anchor"===t?"size1"===w.layoutSettings.layoutSize?0:.1:"MaxLines"===t?"size1"===w.layoutSettings.layoutSize?11+(w.layoutSettings.titleFlag?0:4):10+(w.layoutSettings.titleFlag?0:3):void 0}function s(t){t=JSON.parse(t);return t.skinFlag="true"===t.skinFlag,t.redT=parseInt(t.redT),t.greenT=parseInt(t.greenT),t.blueT=parseInt(t.blueT),t}function o(){return w.layoutSettings.skinSettings.skinFlag&&""!==w.layoutSettings.skinSettings.skinName?ImageManager.loadSystem(w.layoutSettings.skinSettings.skinName):ImageManager.loadSystem("Window")}function u(){return w.layoutSettings.skinSettings.skinFlag&&""!==w.layoutSettings.skinSettings.skinName?[w.layoutSettings.skinSettings.redT,w.layoutSettings.skinSettings.greenT,w.layoutSettings.skinSettings.blueT]:$gameSystem.windowTone()}function c(t,e){switch(e){case 0:switch(w.errorManagement){case"err1":throw new Error("WD_Quest: This quest ID already exist! Use unique Quest ID! ID: "+t);case"err2":console.error("WD_Quest: Added a quest with a non-unique Quest ID! Bad plugin behaviour expected!!! ID: "+t);break;case"err3":break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected error argument: "+w.errorManagement)}break;case 1:switch(w.errorManagement){case"err1":throw new Error("WD_Quest: The categories have a duplicated ID! Use only unique ID! ID: "+t);case"err2":console.error("WD_Quest: Tracked a duplicate ID in the categories database! Bad Plugin behaviour expected!! ID: "+t);break;case"err3":break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected error argument: "+w.errorManagement)}break;case 2:switch(w.errorManagement){case"err1":throw new Error("WD_Quest: Searching By ID in the Quest Container, no quests or more than one quest found. ID: "+t);case"err2":console.error("WD_Quest: Search returned no result or more than one result while searching for ID "+t+" bad behaviour expected!");break;case"err3":break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected error argument: "+w.errorManagement)}break;case 3:switch(w.errorManagement){case"err1":throw new Error("WD_Quest: TextManager argument is invalid! Argument: "+t);case"err2":console.error("WD_Quest: TextManager argument is invalid! Argument: "+t);break;case"err3":break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected error argument: "+w.errorManagement)}break;case 4:switch(w.errorManagement){case"err1":throw new Error("WD_Quest: Unable to find Category ID for translation. ID: "+t);case"err2":console.error("WD_Quest: Unable to find Category ID for translation. ID: "+t);break;case"err3":break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected error argument: "+w.errorManagement)}break;case 6:switch(w.errorManagement){case"err1":throw new Error("WD_Quest: Trying to add a log with an already existing ID! Please use an unique ID for every log (in the quest)! ID: "+t);case"err2":console.error("WD_Quest: Added a log with an already existing ID! Bad behaviour expected! ID: "+t);break;case"err3":break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected error argument: "+w.errorManagement)}break;default:throw new Error("WD_Quest: Error, in the Call Error Manager, that's ironic! Unexpected type: "+e)}}function g(a,t){var i=w.extraSettings.tracking.currentlyTracked;if(t){let t=null;for(const s of f.questsArray)if(s.id===a){t=s;break}if(t){var e={id:t.id,defaultText:t.trackData.trackText,translationText:t.trackData.trackTextTranslations,needRefresh:function(t,e){var a=[t];let i=!1;for(const s of e)a.push(s.text);for(const n of a)if(n){if(n.includes("V[")){i=!0;break}if(n.includes("N[")){i=!0;break}if(n.includes("P[")){i=!0;break}if(n.includes("G")){i=!0;break}}return i}(t.trackData.trackText,t.trackData.trackTextTranslations)};for(const n of i)if(n.id===e.id)return;i.push(e)}}else{let e=null;for(let t=0;t<i.length;t++)if(i[t].id===a){e=t;break}null!==e&&i.splice(e,1)}w.saveSettings()}const l=Scene_Menu.prototype.create,d=(Scene_Menu.prototype.create=function(){l.call(this),w.loadSettings()},Window_MenuCommand.prototype.addOriginalCommands),h=(Window_MenuCommand.prototype.addOriginalCommands=function(){d.call(this),w.layoutSettings.showMenuCommand&&this.addCommand(w.textData.currentLanguage.questMenuCommandName,"quest",!0)},Scene_Menu.prototype.createCommandWindow),m=(Scene_Menu.prototype.createCommandWindow=function(){h.call(this),w.layoutSettings.showMenuCommand&&this._commandWindow.setHandler("quest",this.commandQuest.bind(this))},Scene_Menu.prototype.commandQuest=function(){SceneManager.push(D)},Game_Map.prototype.refresh),x=(Game_Map.prototype.refresh=function(){m.call(this),this.checkWdQuestHudRefresh()},Game_Map.prototype.checkWdQuestHudRefresh=function(){if(r){r=!1;var e=SceneManager._scene;e._wdQuestHud&&e._wdQuestHud.updateText()}else{let t=!1;if(0<w.extraSettings.tracking.currentlyTracked.length)for(const a of w.extraSettings.tracking.currentlyTracked)if(a.needRefresh){t=!0;break}t&&(e=SceneManager._scene)._wdQuestHud&&e._wdQuestHud.updateText()}},Scene_Map.prototype.createDisplayObjects);function S(){this.initialize(...arguments)}function D(){this.initialize(...arguments)}function y(){this.initialize(...arguments)}function T(){this.initialize(...arguments)}function I(){this.initialize(...arguments)}function k(){this.initialize(...arguments)}function v(){this.initialize(...arguments)}function q(){$gameSystem.saveQuestContainer(f)}function Q(){var t=$gameSystem.getQuestContainer();null!==t&&(f.compatibilityLoad=t.compatibilityLoad,f.questsArray=t.questsArray)}function _(t){t=JSON.parse(JSON.stringify(t));$gameSystem.saveWdQuestPluginSettings(t)}function W(){var t=$gameSystem.getWdQuestPluginSettings();null!==t&&(t=JSON.parse(JSON.stringify(t)),w.textData=t.textData,w.textSettings=t.textSettings,w.layoutSettings=t.layoutSettings,w.categoriesSettings=t.categoriesSettings,w.compatibilityLoad=t.compatibilityLoad,w.extraSettings=t.extraSettings,w.errorManagement=t.errorManagement)}function L(){return $gameSystem.getQuestList()}function C(){return $gameSystem.getPluginParams()}function b(t,e){var a=parseInt(t),i=String(e);let s=null;f.loadQuests();for(const quest of f.questsArray)if(!isNaN(a)&&0<a&&quest.id===a||""!==i&&quest.shortTitle===i){s=quest;break}if(s){let t=null;return"completed"===(t=quest.hasOwnProperty("complete")&&!quest.hasOwnProperty("status")?quest.complete?"completed":"ongoing":quest.status)}return!1}Scene_Map.prototype.createDisplayObjects=function(){w.loadSettings(),f.loadQuests(),x.call(this),w.extraSettings.tracking.isActive&&this.wdQuestCreateTrackingHud()},Scene_Map.prototype.wdQuestCreateTrackingHud=function(){var t;this._wdQuestHud||(t=this.wdQuestCreateTrackingHudRect(),this._wdQuestHud=new S(t),this.addWindow(this._wdQuestHud))},Scene_Map.prototype.wdQuestCreateTrackingHudRect=function(){var t=w.extraSettings.tracking.hudSettings.x,e=w.extraSettings.tracking.hudSettings.y,a=Graphics.boxWidth*(w.extraSettings.tracking.hudSettings.width/100),i=Graphics.boxHeight*(w.extraSettings.tracking.hudSettings.height/100);return new Rectangle(t,e,a,i)},((S.prototype=Object.create(Window_Base.prototype)).constructor=S).prototype.initialize=function(t){Window_Base.prototype.initialize.call(this,t),this.setBackgroundType(2),this.updateText()},S.prototype.updateText=function(){if(this.contents&&(this.contents.clear(),this.contentsBack.clear()),w.extraSettings.tracking.isActive){let t="";for(const i of w.extraSettings.tracking.currentlyTracked){var e,a;""!==t&&(t+="\n"),0<i.translationText.length?w.textData.forcedLanguage?(e={language:w.textData.defaultLanguage,text:i.defaultText},e=window.WD_Interplugin_Core.forceLanguage(e,i.translationText,w.textData.forcedLanguage),t+=e.text):(e={language:w.textData.defaultLanguage,text:i.defaultText},a=window.WD_Interplugin_Core.translateData(e,i.translationText),t+=a.text):t+=i.defaultText}this.changeTextColor(w.extraSettings.tracking.trackingSettings.color),window.WD_Interplugin_Core.autoWrap(this,0,0,this.innerWidth,this.innerHeight,t,w.extraSettings.tracking.trackingSettings.maxFont,"left"),this.resetTextColor()}},((D.prototype=Object.create(Scene_MenuBase.prototype)).constructor=D).prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this),w.loadSettings(),f.loadQuests()},D.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),w.layoutSettings.titleFlag&&this.createTitleWindow(),this.createQuestListWindow(),this.createQuestInfoWindow()},D.prototype.createTitleWindow=function(){var t=this.titleWindowRect();this._titleWindow=new y(t),this.addWindow(this._titleWindow)},D.prototype.titleWindowRect=function(){var t=Graphics.boxHeight*n("Anchor"),e=Graphics.boxWidth,a=.2*n("Height");return new Rectangle(0,t,e,a)},D.prototype.createQuestListWindow=function(){var t=this.questListWindowRect();this._questListWindow=new T(t),this._questListWindow.setHandler("ok",this.onQuestListOk.bind(this)),this._questListWindow.setHandler("cancel",this.onQuestListCancel.bind(this)),this.addWindow(this._questListWindow)},D.prototype.questListWindowRect=function(){var t="layout1"===w.layoutSettings.layoutAlign?0:.7*Graphics.boxWidth,e=Graphics.boxHeight*n("Anchor")+(w.layoutSettings.titleFlag?.2*n("Height"):0),a=.3*Graphics.boxWidth,i=w.layoutSettings.titleFlag?.8*n("Height"):n("Height");return new Rectangle(t,e,a,i)},D.prototype.createQuestInfoWindow=function(){var t=this.questInfoWindowRect();this._questInfoWindow=new I(t),this._questInfoWindow.setHandler("logs",this.onQuestLogs.bind(this)),this._questInfoWindow.setHandler("track",this.onQuestTrack.bind(this)),this._questInfoWindow.setHandler("cancel",this.onQuestInfoCancel.bind(this)),this.addWindow(this._questInfoWindow)},D.prototype.questInfoWindowRect=function(){var t="layout1"===w.layoutSettings.layoutAlign?.3*Graphics.boxWidth:0,e=Graphics.boxHeight*n("Anchor")+(w.layoutSettings.titleFlag?.2*n("Height"):0),a=.7*Graphics.boxWidth,i=w.layoutSettings.titleFlag?.8*n("Height"):n("Height");return new Rectangle(t,e,a,i)},D.prototype.onQuestListOk=function(){(w.extraSettings.logs.isActive||w.extraSettings.tracking.isActive&&w.extraSettings.tracking.allowPlayerTracking?(this._questInfoWindow.select(0),this._questInfoWindow):this._questListWindow).activate()},D.prototype.createQuestLogsExtraWindow=function(){var t=this.questInfoWindowRect();this._questLogExtraWindow=new k(t),this._questLogExtraWindow.setHandler("ok",this.onQuestLogOk.bind(this)),this._questLogExtraWindow.setHandler("cancel",this.onQuestLogCancel.bind(this)),this.addWindow(this._questLogExtraWindow)},D.prototype.createQuestLogsDetailWindow=function(t){var e=this.questInfoWindowRect();this._questLogDetailWindow=new v(e,t),this._questLogDetailWindow.setHandler("ok",this.onQuestDetLogOk.bind(this)),this._questLogDetailWindow.setHandler("cancel",this.onQuestDetLogCancel.bind(this)),this.addWindow(this._questLogDetailWindow)},D.prototype.onQuestLogs=function(){this._questLogExtraWindow?(this._questLogExtraWindow.open(),this._questLogExtraWindow.activate()):this.createQuestLogsExtraWindow()},D.prototype.onQuestTrack=function(){var t=this._questInfoWindow.questItem.id;g(t,!this._questInfoWindow.checkIfTracked(t)),this._questInfoWindow.refreshCommands(),this._questInfoWindow.activate()},D.prototype.onQuestInfoCancel=function(){this._questInfoWindow.select(-1),this._questInfoWindow.deactivate(),this._questListWindow.activate()},D.prototype.onQuestLogOk=function(){var t=this._questLogExtraWindow._index;0<=t?this._questLogDetailWindow?(this._questLogDetailWindow.loadIndex(t),this._questLogDetailWindow.open(),this._questLogDetailWindow.activate()):this.createQuestLogsDetailWindow(t):this._questLogExtraWindow.activate()},D.prototype.onQuestLogCancel=function(){this._questLogExtraWindow.close(),this._questInfoWindow.activate()},D.prototype.onQuestDetLogOk=function(){this._questLogDetailWindow.activate()},D.prototype.onQuestDetLogCancel=function(){this._questLogDetailWindow.close(),this._questLogExtraWindow.activate()},D.prototype.onQuestListCancel=function(){this.popScene()},D.prototype.needsCancelButton=function(){return w.layoutSettings.touchCancel},SceneManager.Scene_Quest=D,((y.prototype=Object.create(Window_Base.prototype)).constructor=y).prototype.initialize=function(t){Window_Base.prototype.initialize.call(this,t);var t=window.WD_Interplugin_Core.realTextDimensions(this,w.textData.currentLanguage.questTitle,w.textSettings.fontSize),e=(this.innerWidth-t.width)/2,t=(this.innerHeight-t.height)/2;window.WD_Interplugin_Core.drawTextExSize(this,w.textData.currentLanguage.questTitle,e,t,this.innerWidth,w.textSettings.fontSize)},y.prototype.loadWindowskin=function(){this.windowskin=o()},y.prototype.updateTone=function(){var t=u();this.setTone(t[0],t[1],t[2])},((T.prototype=Object.create(Window_Selectable.prototype)).constructor=T).prototype.initialize=function(t){Window_Selectable.prototype.initialize.call(this,t),this.questArray=this.hardCopyAndTranslate(f.questsArray),this.sortedQuests=[],this.contents.fontSize=w.textSettings.listSize,0<this.questArray.length&&(this.sortQuests(),this.paint()),this.activate()},T.prototype.hardCopyAndTranslate=function(t){t=JSON.parse(JSON.stringify(t));for(const a of t)if(0<a.translationPacks.length){var e={short:a.shortTitle,long:a.longTitle,giver:a.giver,area:a.area,desc:a.description,language:w.textData.defaultLanguage};let t=null;(t=null!==w.textData.forcedLanguage?window.WD_Interplugin_Core.forceLanguage(e,a.translationPacks,w.textData.forcedLanguage):window.WD_Interplugin_Core.translateData(e,a.translationPacks))&&(a.shortTitle=t.short,a.longTitle=t.long,a.giver=t.giver,a.area=t.area,a.description=t.desc)}return t},T.prototype.maxItems=function(){return this.sortedQuests.length},T.prototype.sortQuests=function(){let t=this.questArray.filter(t=>"ongoing"===t.status),e=this.questArray.filter(t=>"completed"===t.status),a=this.questArray.filter(t=>"failed"===t.status);if(t.sort(function(t,e){return t.index-e.index}),e.sort(function(t,e){return t.index-e.index}),a.sort(function(t,e){return t.index-e.index}),w.categoriesSettings.isActive){var i=w.categoriesSettings.categories;if(i.sort(function(t,e){return t.index-e.index}),0===w.categoriesSettings.displayType)for(const u of i){var s=this.questArray.filter(t=>t.categoryID===u.id);if(0<s.length){t=s.filter(t=>"ongoing"===t.status),e=s.filter(t=>"completed"===t.status),a=s.filter(t=>"failed"===t.status),t.sort(function(t,e){return t.index-e.index}),e.sort(function(t,e){return t.index-e.index}),a.sort(function(t,e){return t.index-e.index}),this.sortedQuests.push({isCategory:!0,questID:u.id,questStatus:null});for(const g of t)this.sortedQuests.push({isCategory:!1,questID:g.id,questStatus:"ongoing"});for(const c of e)this.sortedQuests.push({isCategory:!1,questID:c.id,questStatus:"completed"});for(const l of a)this.sortedQuests.push({isCategory:!1,questID:l.id,questStatus:"failed"})}}else{for(const d of i){var n=t.filter(t=>t.categoryID===d.id);if(0<n.length){this.sortedQuests.push({isCategory:!0,questID:d.id,questStatus:null}),n.sort(function(t,e){return t.index-e.index});for(const h of n)this.sortedQuests.push({isCategory:!1,questID:h.id,questStatus:"ongoing"})}}for(const p of i){var r=e.filter(t=>t.categoryID===p.id);if(0<r.length){this.sortedQuests.push({isCategory:!0,questID:p.id,questStatus:null}),r.sort(function(t,e){return t.index-e.index});for(const f of r)this.sortedQuests.push({isCategory:!1,questID:f.id,questStatus:"ongoing"})}}for(const m of i){var o=a.filter(t=>t.categoryID===m.id);if(0<o.length){this.sortedQuests.push({isCategory:!0,questID:m.id,questStatus:null}),o.sort(function(t,e){return t.index-e.index});for(const x of o)this.sortedQuests.push({isCategory:!1,questID:x.id,questStatus:"ongoing"})}}}}else{for(const S of t)this.sortedQuests.push({isCategory:!1,questID:S.id,questStatus:"ongoing"});for(const D of e)this.sortedQuests.push({isCategory:!1,questID:D.id,questStatus:"completed"});for(const y of a)this.sortedQuests.push({isCategory:!1,questID:y.id,questStatus:"failed"})}},T.prototype.paint=function(){this.contents&&(this.contents.clear(),this.contentsBack.clear(),this.drawAllItems(),w.categoriesSettings.isActive)&&this.drawStatics()},T.prototype.drawStatics=function(){var e=[];for(let t=0;t<this.sortedQuests.length;t++)this.sortedQuests[t].isCategory&&e.push({index:t,id:this.sortedQuests[t].questID});if(0<e.length)for(const o of e){var t=this.maxCols(),a=this.itemWidth(),i=this.itemHeight(),s=this.colSpacing(),n=this.rowSpacing(),r=o.index%t,t=Math.floor(o.index/t),r=r*a+s/2-this.scrollBaseX(),t=t*i+n/2-this.scrollBaseY(),i=a-s,n=this.getCategoryName(o.id);this.changePaintOpacity(!0),this.resetTextColor(),this.drawText(n,r,t,i,this.itemTextAlign())}},T.prototype.getCategoryName=function(t){let e=null;for(const n of w.categoriesSettings.categories)if(n.id===t){e=n;break}e||(c(t,4),e=w.categoriesSettings.categories[0]);var a={categoryName:e.name,language:w.textData.defaultLanguage},i=e.trans;let s;return(s=w.textData.forcedLanguage?window.WD_Interplugin_Core.forceLanguage(a,i,w.textData.forcedLanguage):window.WD_Interplugin_Core.translateData(a,i)).categoryName},T.prototype.drawItem=function(e){var t,a;this.sortedQuests[e].isCategory||(t=this.itemRect(e),1!==(a=this.questArray.filter(t=>t.id===this.sortedQuests[e].questID)).length&&c(this.sortedQuests[e],2),"completed"===(a=a[0]).status?(this.changePaintOpacity(!1),this.changeTextColor("#808080")):"ongoing"===a.status?(this.changePaintOpacity(!0),this.resetTextColor()):(this.changePaintOpacity(!1),this.changeTextColor("#B22222")),this.drawText(a.shortTitle,t.x,t.y,t.width,this.itemTextAlign()))},T.prototype.itemRect=function(t){var e,a,i,s,n,r;return this.sortedQuests[t].isCategory?new Rectangle(-5e3,-5e3,0,0):(n=this.maxCols(),e=this.itemWidth(),a=this.itemHeight(),i=this.colSpacing(),s=this.rowSpacing(),r=t%n,t=Math.floor(t/n),n=r*e+i/2-this.scrollBaseX(),r=t*a+s/2-this.scrollBaseY(),new Rectangle(n,r,e-i,a-s))},T.prototype.itemTextAlign=function(){return w.textSettings.listAlign.toLowerCase()},T.prototype.callInfoWindow=function(e){var t;SceneManager._scene._questInfoWindow&&(-1===e||this.sortedQuests[e].isCategory?SceneManager._scene._questInfoWindow.eraseInfoes():(1!==(t=this.questArray.filter(t=>t.id===this.sortedQuests[e].questID)).length&&c(this.sortedQuests[e],2),SceneManager._scene._questInfoWindow.drawQuest(t[0])))},T.prototype.processTouch=function(){this.isOpenAndActive()&&(this.isHoverEnabled()&&TouchInput.isHovered()?(this.callInfoWindow(this.index()),this.onTouchSelect(!1)):TouchInput.isTriggered()&&this.onTouchSelect(!0),TouchInput.isClicked()?this.onTouchOk():TouchInput.isCancelled()&&this.onTouchCancel())},T.prototype.processCursorMove=function(){var t;this.isCursorMovable()&&(t=this.index(),Input.isRepeated("down")&&this.cursorDown(Input.isTriggered("down")),Input.isRepeated("up")&&this.cursorUp(Input.isTriggered("up")),Input.isRepeated("right")&&this.cursorRight(Input.isTriggered("right")),Input.isRepeated("left")&&this.cursorLeft(Input.isTriggered("left")),!this.isHandled("pagedown")&&Input.isTriggered("pagedown")&&this.cursorPagedown(),!this.isHandled("pageup")&&Input.isTriggered("pageup")&&this.cursorPageup(),this.index()!==t)&&(this.callInfoWindow(this.index()),this.playCursorSound())},T.prototype.cursorDown=function(t){var e,a,i;w.categoriesSettings.isActive?(e=this.checkNextIndex(!0),this.smoothSelect(e)):((e=this.index())<(a=this.maxItems())-(i=this.maxCols())||t&&1===i)&&this.smoothSelect((e+i)%a)},T.prototype.cursorUp=function(t){var e,a,i;w.categoriesSettings.isActive?(e=this.checkNextIndex(!1),this.smoothSelect(e)):(e=Math.max(0,this.index()),a=this.maxItems(),((i=this.maxCols())<=e||t&&1===i)&&this.smoothSelect((e-i+a)%a))},T.prototype.checkNextIndex=function(t){var e=this.index();if(0===this.sortedQuests.length)return-1;if(t){for(let t=e+1;t<this.sortedQuests.length;t++)if(!this.sortedQuests[t].isCategory)return t;this.scrollTo(0,0);for(let t=0;t<this.sortedQuests.length;t++)if(!this.sortedQuests[t].isCategory)return t}else{for(let t=e-1;0<=t;t--)if(!this.sortedQuests[t].isCategory)return t;for(let t=this.sortedQuests.length-1;0<=t;t--)if(!this.sortedQuests[t].isCategory)return t}},((I.prototype=Object.create(Window_HorzCommand.prototype)).constructor=I).prototype.initialize=function(t){Window_HorzCommand.prototype.initialize.call(this,t),this.select(-1),this.deactivate(),this.questItem=null,this.lineAdjust=0},I.prototype.makeCommandList=function(){var t;w.extraSettings.logs.isActive&&this.questItem&&this.addCommand(w.textData.currentLanguage.logText,"logs",!0),w.extraSettings.tracking.isActive&&w.extraSettings.tracking.allowPlayerTracking&&this.questItem&&this.questItem.trackData.isTrackable&&(t=this.checkIfTracked(this.questItem.id),this.addCommand(t?w.textData.currentLanguage.untrackText:w.textData.currentLanguage.trackText,"track",this.checkTrackEnabled(t)))},I.prototype.checkTrackEnabled=function(t){return!!this.questItem&&(!!t||w.extraSettings.tracking.currentlyTracked.length<w.extraSettings.tracking.trackingSettings.maxQuest)},I.prototype.checkIfTracked=function(e){if(0<w.extraSettings.tracking.currentlyTracked.length){let t=!1;for(const a of w.extraSettings.tracking.currentlyTracked)if(a.id===e){t=!0;break}return t}return!1},I.prototype.drawItem=function(t){var e=this.itemLineRect(t),a=this.itemTextAlign();this.resetTextColor(),this.changePaintOpacity(this.isCommandEnabled(t)),this.drawText(this.commandName(t),e.x,e.y,e.width,a)},I.prototype.itemLineRect=function(t){return this.specialRect(t)},I.prototype.itemRect=function(t){return this.specialRect(t)},I.prototype.specialRect=function(t){var e=this.commandsOnScreenCount(),a=0<e?.15*Graphics.boxWidth:0,e=0<e?.1*Graphics.boxHeight:0,i=this.innerHeight-e-12;return new Rectangle(1===t?24+a:12,i,a,e)},I.prototype.commandsOnScreenCount=function(){let t=0;return w.extraSettings.logs.isActive&&t++,w.extraSettings.tracking.isActive&&w.extraSettings.tracking.allowPlayerTracking&&t++,t},I.prototype.loadWindowskin=function(){this.windowskin=o()},I.prototype.updateTone=function(){var t=u();this.setTone(t[0],t[1],t[2])},I.prototype.eraseInfoes=function(){null!==this.questItem&&(this.contents.clear(),this.lineAdjust=0,this.questItem=null,this.refresh())},I.prototype.drawQuest=function(t){this.questItem!==t&&(this.contents.clear(),this.lineAdjust=0,this.questItem=t,this.refresh(),this.resetFontSettings(),this.drawQuestIcon(this.questItem.icon),this.drawQuestName(this.questItem.shortTitle,this.questItem.longTitle),this.drawQuestGiver(this.questItem.giver),this.drawQuestArea(this.questItem.area),this.drawQuestInfo(this.questItem.description),this.drawQuestStatus(this.questItem.status))},I.prototype.refreshCommands=function(){this.contents.clear(),this.lineAdjust=0,this.refresh(),this.resetFontSettings(),this.drawQuestIcon(this.questItem.icon),this.drawQuestName(this.questItem.shortTitle,this.questItem.longTitle),this.drawQuestGiver(this.questItem.giver),this.drawQuestArea(this.questItem.area),this.drawQuestInfo(this.questItem.description),this.drawQuestStatus(this.questItem.status)},I.prototype.drawQuestIcon=function(t){var e=(this.width-ImageManager.iconWidth)/2;this.drawIcon(t,e,10)},I.prototype.drawQuestName=function(t,e){var a=1.5*this.lineHeight(),i=this.innerWidth;this.drawText(e||t,0,a,i,"center")},I.prototype.drawQuestGiver=function(t){var e,a,i;t?(e=3*this.lineHeight(),a=this.innerWidth,i=w.textData.currentLanguage.giverPrefix,this.drawText(i?i+" "+t:t,0,e,a,"left")):this.lineAdjust--},I.prototype.drawQuestArea=function(t){var e,a,i;t?(e=this.lineHeight()*(4+this.lineAdjust),a=this.innerWidth,i=w.textData.currentLanguage.areaPrefix,this.drawText(i?i+" "+t:t,0,e,a,"left")):this.lineAdjust--},I.prototype.drawQuestInfo=function(t){var e=this._padding,a=this.lineHeight()*(6+this.lineAdjust),i=this.questItem.status?2*this.lineHeight():0,s=this.innerWidth,n=a-i,r=w.textSettings.infoAlign,o=this.prepInfoText(t,r),u=w.textSettings.descriptionSize;switch(w.textSettings.textManagement){case"wrap":window.WD_Interplugin_Core.autoWrap(this,e,a,s,n,t,u,r);break;case"size":this.contents.fontSize=u;const g=window.WD_Interplugin_Core.autoTextSize(this,o,s,n);window.WD_Interplugin_Core.drawTextExSize(this,o,e,a,s,g);break;case"manual":this.contents.fontSize=u,window.WD_Interplugin_Core.drawTextExSize(this,o,e,a,s,g);break;default:c(w.textSettings.textManagement,3)}this.resetFontSettings()},I.prototype.prepInfoText=function(t,e){return window.WD_Interplugin_Core.improvedTextExAligner(this,t,e)},I.prototype.drawQuestStatus=function(t){var e=this.lineHeight()*n("MaxLines"),a=this.innerWidth;let i;var s=w.textData.currentLanguage.statusName;switch(t){case"ongoing":i=s?s+" "+w.textData.currentLanguage.questOngoing:w.textData.currentLanguage.questOngoing;break;case"completed":i=s?s+" "+w.textData.currentLanguage.questCompleted:w.textData.currentLanguage.questCompleted;break;case"failed":i=s?s+" "+w.textData.currentLanguage.questFailed:w.textData.currentLanguage.questFailed}""!==i&&" "!==i&&this.drawText(i,0,e,a,"right")},((k.prototype=Object.create(Window_Selectable.prototype)).constructor=k).prototype.initialize=function(t){Window_Selectable.prototype.initialize.call(this,t),this.visibleLogs=this.getVisibleLogsArray(),this.paint(),0<this.visibleLogs.length&&this.select(0),this.activate()},k.prototype.getVisibleLogsArray=function(){return SceneManager._scene._questInfoWindow.questItem.logs.filter(t=>t.isVisible)},k.prototype.maxItems=function(){return this.visibleLogs.length},k.prototype.drawItem=function(t){var e=this.itemRect(t),t=this.getLogTitleTrans(this.visibleLogs[t].title);window.WD_Interplugin_Core.autoWrap(this,e.x,e.y,e.width,e.height,t,this.contents.fontSize,"left")},k.prototype.getLogTitleTrans=function(t){var e,a=t.default,t=t.trans;return t&&0!==t.length?(t=t,(e={logTitle:a}).language=w.textData.defaultLanguage,(!w.textData.autoLanguage&&null!==w.textData.forcedLanguage?window.WD_Interplugin_Core.forceLanguage(e,t,w.textData.forcedLanguage):window.WD_Interplugin_Core.translateData(e,t)).logTitle):a},((v.prototype=Object.create(Window_Selectable.prototype)).constructor=v).prototype.initialize=function(t,e){Window_Selectable.prototype.initialize.call(this,t),this.currentIndex=e,this.currentLogData=this.getLogData(e),this.drawLog(),this.activate()},v.prototype.getLogData=function(t){return SceneManager._scene._questLogExtraWindow.visibleLogs[t]},v.prototype.maxItems=function(){return 0},v.prototype.clearResidualLogPic=function(){let t=null;for(const e of this.children)if(e.hasOwnProperty("isWdLogSprite")){t=e;break}t&&this.removeChild(t)},v.prototype.drawLog=function(){this.contents&&(this.contents.clear(),this.contentsBack.clear(),this.clearResidualLogPic());let e=0;const a={isNeeded:!1,imageBitmap:void 0};switch(this.currentLogData.graphics.style){case"no":break;case"icon":e=24+ImageManager.iconHeight;break;case"face":e=24+ImageManager.faceHeight;break;case"char":a.isNeeded=!0,a.imageBitmap=ImageManager.loadCharacter(this.currentLogData.graphics.character.id);break;case"pic":a.isNeeded=!0,a.imageBitmap=ImageManager.loadPicture(this.currentLogData.graphics.picture.id);break;default:throw new Error("WD_Quest: Unexpected value for graphic style: "+this.currentLogData.graphics.style)}a.isNeeded?a.imageBitmap.addLoadListener(()=>{var t;e="pic"===this.currentLogData.graphics.style?(t=this.currentLogData.graphics.picture.scale/100,24+a.imageBitmap.height*t):(t=ImageManager.isBigCharacter(this.currentLogData.graphics.character.id),24+a.imageBitmap.height/(t?4:8)),this.drawLogStepTwo(e)}):this.drawLogStepTwo(e)},v.prototype.drawLogStepTwo=function(t){var e;switch(this.currentLogData.text.showText&&(e=this.getTranslatedLogBodyText(this.currentLogData.text.data,this.currentLogData.text.transData),window.WD_Interplugin_Core.autoWrap(this,this._padding,"above"===this.currentLogData.graphics.placement?t:0,this.innerWidth,this.innerHeight-t,e,this.contents.fontSize,this.currentLogData.text.align),this.resetFontSettings()),this.currentLogData.graphics.style){case"no":break;case"icon":var a=(this.width-ImageManager.iconWidth)/2,i="above"===this.currentLogData.graphics.placement?12:this.innerHeight-24-ImageManager.iconHeight;this.drawIcon(this.currentLogData.graphics.icon.id,a,i);break;case"face":ImageManager.loadFace(this.currentLogData.graphics.face.id).addLoadListener(()=>{var t=(this.width-ImageManager.faceWidth)/2,e="above"===this.currentLogData.graphics.placement?12:this.innerHeight-24-ImageManager.faceHeight;this.drawFace(this.currentLogData.graphics.face.id,this.currentLogData.graphics.face.index,t,e,ImageManager.faceWidth,ImageManager.faceHeight)});break;case"char":const s=ImageManager.loadCharacter(this.currentLogData.graphics.character.id);s.addLoadListener(()=>{var t=ImageManager.isBigCharacter(this.currentLogData.graphics.character.id),e=s.width/(t?3:12),t=s.height/(t?4:8),e=(this.width-e/2)/2,t="above"===this.currentLogData.graphics.placement?12+t:this.innerHeight-24;this.drawCharacter(this.currentLogData.graphics.character.id,this.currentLogData.graphics.character.index,e,t)});break;case"pic":const n=new Sprite,r=this.currentLogData.graphics.picture.scale/100;n.bitmap=ImageManager.loadPicture(this.currentLogData.graphics.picture.id),n.isWdLogSprite=!0,n.scale.set(r),n.bitmap.addLoadListener(()=>{n.x=(this.width-n.width*r)/2,n.y="above"===this.currentLogData.graphics.placement?12:this.innerHeight-24-n.height*r}),this.addChild(n);break;default:throw new Error("WD_Quest: Unexpected value for graphic style: "+this.currentLogData.graphics.style)}},v.prototype.getTranslatedLogBodyText=function(t,e){if(0===e.length)return t;t={textData:t,language:w.textData.defaultLanguage};let a=null;return(a=w.textData.forcedLanguage?window.WD_Interplugin_Core.forceLanguage(t,e,w.textData.forcedLanguage):window.WD_Interplugin_Core.translateData(t,e)).textData},v.prototype.loadIndex=function(t){t!==this.currentIndex&&(this.currentIndex=t,this.currentLogData=this.getLogData(t),this.drawLog())},v.prototype.cursorRight=function(t){this.searchNewIndex(!0)},v.prototype.cursorLeft=function(t){this.searchNewIndex(!1)},v.prototype.searchNewIndex=function(t){var e=SceneManager._scene._questLogExtraWindow.visibleLogs.length-1,a=this.currentIndex,t=t?a+1:a-1;e<t?this.loadIndex(0):t<0?this.loadIndex(e):this.loadIndex(t)},v.prototype.isCursorMovable=function(){return this.isOpenAndActive()&&!this._cursorFixed&&!this._cursorAll},PluginManager.registerCommand("WD_Quest","newCreateQuest",function(t){var e=parseInt(t.id),a=parseInt(t.icon),i=parseInt(t.index),s=parseInt(t.cat),n=JSON.parse(t.questTrans).map(t=>JSON.parse(t));if(isNaN(e)||isNaN(a)||isNaN(i)||isNaN(s))throw new Error("WD_Quest: ID, icon, index and / or category ID are not a number");f.loadQuests(),f.addQuest(!1,e,a,t.short,t.long,i,t.giver,t.area,t.desc,t.status,t.track,t.logs,n,s),f.saveQuests()}),PluginManager.registerCommand("WD_Quest","newSetTitle",function(t){var e=t.title,t=JSON.parse(t.transTitle).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("questTitle",!0,e),0<t.length&&w.updateLanguageTerms("questTitle",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetGiverPrefix",function(t){var e=t.prefix,t=JSON.parse(t.transPrefix).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("giverPrefix",!0,e),0<t.length&&w.updateLanguageTerms("giverPrefix",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetAreaPrefix",function(t){var e=t.prefix,t=JSON.parse(t.transPrefix).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("areaPrefix",!0,e),0<t.length&&w.updateLanguageTerms("areaPrefix",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetStatusName",function(t){var e=t.name,t=JSON.parse(t.transName).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("statusName",!0,e),0<t.length&&w.updateLanguageTerms("statusName",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetQuestCompleted",function(t){var e=t.completed,t=JSON.parse(t.transCompleted).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("questCompleted",!0,e),0<t.length&&w.updateLanguageTerms("questCompleted",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetQuestOngoing",function(t){var e=t.ongoing,t=JSON.parse(t.transOngoing).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("questOngoing",!0,e),0<t.length&&w.updateLanguageTerms("questOngoing",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetQuestFailed",function(t){var e=t.failed,t=JSON.parse(t.transFailed).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("questFailed",!0,e),0<t.length&&w.updateLanguageTerms("questFailed",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","newSetCommandName",function(t){var e=t.commandName,t=JSON.parse(t.transCommandName).map(t=>JSON.parse(t));e&&w.updateLanguageTerms("questMenuCommandName",!0,e),0<t.length&&w.updateLanguageTerms("questMenuCommandName",!1,t),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","OpenQuestScene",function(){SceneManager.push(D)}),PluginManager.registerCommand("WD_Quest","SetQuestTitleFontSize",function(t){t=parseInt(t.fontSize);isNaN(t)||(w.textSettings.fontSize=t,w.saveSettings())}),PluginManager.registerCommand("WD_Quest","SetQuestInfoFontSize",function(t){t=parseInt(t.fontSize);isNaN(t)||(w.textSettings.descriptionSize=t,w.saveSettings())}),PluginManager.registerCommand("WD_Quest","SetQuestListFontSize",function(t){t=parseInt(t.fontSize);isNaN(t)||(w.textSettings.listSize=t,w.saveSettings())}),PluginManager.registerCommand("WD_Quest","editQuestDescriptors",function(t){var e=parseInt(t.questID),a=t.questName,i=parseInt(t.icon),s=parseInt(t.cat),n=t.short,r=t.long,o=t.giver,u=t.area,g=t.desc,t=JSON.parse(t.questTrans).map(t=>JSON.parse(t));let c=null;f.loadQuests();for(const h of f.questsArray)if(!isNaN(e)&&0<e&&h.id===e||""!==a&&h.shortTitle===a){c=h;break}if(c&&(!isNaN(i)&&0<i&&(c.icon=i),!isNaN(s)&&-1<s&&(c.categoryID=s),n&&""!==n&&(c.shortTitle=n),r&&""!==r&&(c.longTitle=r),o&&""!==o&&(c.giver=o),u&&""!==u&&(c.area=u),g&&""!==g&&(c.description=g),0<t.length))for(const p of t){var l=p.language,d={found:!1,index:0};for(let t=0;t<c.translationPacks.length;t++)if(c.translationPacks[t].language===l){d.found=!0,d.index=t;break}d.found&&(p.short&&""!==p.short&&(c.translationPacks[d.index].shortTitle=p.short),p.long&&""!==p.long&&(c.translationPacks[d.index].longTitle=p.long),p.giver&&""!==p.giver&&(c.translationPacks[d.index].giver=p.giver),p.area&&""!==p.area&&(c.translationPacks[d.index].area=p.area),p.desc)&&""!==p.desc&&(c.translationPacks[d.index].description=p.desc)}f.saveQuests()}),PluginManager.registerCommand("WD_Quest","SetCompletion",function(t){var e=parseInt(t.questID),a=String(t.questName);let i=t.status,s=null;void 0!==t.completion&&(i=i||("true"===t.completion?"completed":"ongoing")),f.loadQuests();for(const n of f.questsArray)if(!isNaN(e)&&0<e&&n.id===e||""!==a&&n.shortTitle===a){s=n;break}s&&(s.status=i,f.saveQuests())}),PluginManager.registerCommand("WD_Quest","RemoveQuestNew",function(t){var e=Number(t.questID),t=String(t.questName);f.loadQuests(),f.removeQuest(e,t),f.saveQuests()}),PluginManager.registerCommand("WD_Quest","CheckQuestCompletion",function(e){var t=parseInt(e.questID),a=String(e.questName),i=parseInt(e.switchID),e=String(e.selectMode);let s=null;f.loadQuests();for(const n of f.questsArray)if(!isNaN(t)&&0<t&&n.id===t||""!==a&&n.shortTitle===a){s=n;break}if(s){let t=null;if(t=s.hasOwnProperty("complete")&&!s.hasOwnProperty("status")?s.complete?"completed":"ongoing":s.status,"Variable"===e)switch(t){case"completed":$gameVariables.setValue(i,0);break;case"ongoing":$gameVariables.setValue(i,1);break;case"failed":$gameVariables.setValue(i,2)}else"completed"===t?$gameSwitches.setValue(i,!0):$gameSwitches.setValue(i,!1)}}),PluginManager.registerCommand("WD_Quest","changeGraphics",function(t){var e=t.titleFlag,a=t.layoutAlign,i=t.layoutSize,s=t.touchCancel,n=function(t){t=JSON.parse(t);return t.redT=parseInt(t.redT),t.greenT=parseInt(t.greenT),t.blueT=parseInt(t.blueT),t}(t.skinSettings);switch(w.loadSettings(),e){case"title1":w.layoutSettings.titleFlag=!0;break;case"title2":w.layoutSettings.titleFlag=!1}switch(a){case"layout1":case"layout2":w.layoutSettings.layoutAlign=a}switch(i){case"size1":case"size2":w.layoutSettings.layoutSize=i}switch(s){case"cancel1":w.layoutSettings.touchCancel=!0;break;case"cancel2":w.layoutSettings.touchCancel=!1}switch(n.skinFlag){case"skin1":w.layoutSettings.skinSettings.skinFlag=!0,w.layoutSettings.skinSettings.skinName=n.skinName,w.layoutSettings.skinSettings.redT=n.redT,w.layoutSettings.skinSettings.greenT=n.greenT,w.layoutSettings.skinSettings.blueT=n.blueT;break;case"skin2":w.layoutSettings.skinSettings.skinFlag=!1}w.saveSettings()}),PluginManager.registerCommand("WD_Quest","activateLog",function(t){var e=parseInt(t.questID),a=String(t.questName),i=t.logID;let s=null;f.loadQuests();for(const n of f.questsArray)if(!isNaN(e)&&0<e&&n.id===e||""!==a&&n.shortTitle===a){s=n;break}if(s){for(const r of s.logs)if(r.id===i){r;break}f.saveQuests()}}),PluginManager.registerCommand("WD_Quest","addLog",function(e){var t=parseInt(e.questID),a=String(e.questName),i=e.logSettings;let s=null;f.loadQuests();for(const r of f.questsArray)if(!isNaN(t)&&0<t&&r.id===t||""!==a&&r.shortTitle===a){s=r;break}if(s){(i=JSON.parse(i)).isVisible="true"===i.isVisible,i.textStyle="true"===i.textStyle,i.charSpecial="true"===i.charSpecial,i.charIndex=parseInt(i.charIndex),i.faceIndex=parseInt(i.faceIndex),i.iconID=parseInt(i.iconID),i.picScale=parseInt(i.picScale),i.textDataTrans=JSON.parse(i.textDataTrans);for(let t=0;t<i.textDataTrans.length;t++)i.textDataTrans[t]=JSON.parse(i.textDataTrans[t]);i.logTitleTrans=JSON.parse(i.logTitleTrans);for(let t=0;t<i.logTitleTrans.length;t++)i.logTitleTrans[t]=JSON.parse(i.logTitleTrans[t]);var e=i,n={id:e.logID,isVisible:e.isVisible,graphics:{style:e.graphStyle,align:e.graphAlign,placement:e.graphPlacement,icon:{id:e.iconID},face:{id:e.faceID,index:e.faceIndex},character:{id:e.charID,index:e.charIndex,isSpecial:e.charSpecial},picture:{id:e.picID,scale:e.picScale}},text:{showText:e.textStyle,align:e.textAlign,data:e.textData,transData:e.textDataTrans},title:{default:e.logTitle,trans:e.logTitleTrans}};let t=!1;for(const o of s.logs)if(o.id===n.id){t=!0;break}t?c(n.id,6):s.logs.push(n),f.saveQuests()}}),PluginManager.registerCommand("WD_Quest","removeLog",function(t){var e=parseInt(t.questID),a=String(t.questName),i=t.logID;let s=null;f.loadQuests();for(const r of f.questsArray)if(!isNaN(e)&&0<e&&r.id===e||""!==a&&r.shortTitle===a){s=r;break}if(s){var n={found:!1,index:0};for(let t=0;t<s.logs.length;t++)if(s.logs[t].id===i){n.found=!0,n.index=t;break}n.found&&(s.logs.splice(n.index,1),f.saveQuests())}}),PluginManager.registerCommand("WD_Quest","enableTracking",function(t){t="true"===t.trackingFlag;w.loadSettings(),w.extraSettings.tracking.isActive=t,w.saveSettings(),t||(r=!0,$gameMap.requestRefresh())}),PluginManager.registerCommand("WD_Quest","enablePlayerTracking",function(t){var e="true"===t.trackingFlag,t="true"===t.wipeFlag;w.loadSettings(),w.extraSettings.tracking.allowPlayerTracking=e,t&&0<w.extraSettings.tracking.currentlyTracked.length&&(w.extraSettings.tracking.currentlyTracked.length=0,r=!0,$gameMap.requestRefresh()),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","addRemoveTracking",function(t){var e="true"===t.addFlag,a=parseInt(t.questID),i=t.questName;let s=null;f.loadQuests();for(const n of f.questsArray)if(!isNaN(a)&&0<a&&n.id===a||""!==i&&n.shortTitle===i){s=n;break}s&&(w.loadSettings(),g(s.id,e),w.saveSettings(),r=!0,$gameMap.requestRefresh())}),PluginManager.registerCommand("WD_Quest","changeTrackingText",function(t){var e=parseInt(t.questID),a=t.questName,i=t.text,t=JSON.parse(t.textTrans).map(t=>JSON.parse(t));let s=null;f.loadQuests();for(const n of f.questsArray)if(!isNaN(e)&&0<e&&n.id===e||""!==a&&n.shortTitle===a){s=n;break}s&&(s.trackData.trackText=i,s.trackData.trackTextTranslations=t,f.saveQuests())}),PluginManager.registerCommand("WD_Quest","CreateQuest",function(t){let e=t.status;void 0!==t.complete&&(e="true"===t.complete?"completed":"ongoing");t={id:Number(t.id),icon:Number(t.icon),name:t.name?String(t.name):"",longTitle:t.longTitle?String(t.longTitle):"",index:Number(t.index),giver:t.giver?String(t.giver):"",area:t.area?String(t.area):"",description:t.description?String(t.description):"",status:String(e)};f.loadQuests(),f.addQuest(!0,t.id,t.icon,t.name,t.longTitle,t.index,t.giver,t.area,t.description,t.status,null,null,[],0),f.saveQuests()}),PluginManager.registerCommand("WD_Quest","SetTitle",function(t){w.updateLanguageTerms("questTitle",!0,t.title),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","SetGiverPrefix",function(t){w.updateLanguageTerms("giverPrefix",!0,t.prefix),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","SetAreaPrefix",function(t){w.updateLanguageTerms("areaPrefix",!0,t.title),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","SetStatusName",function(t){w.updateLanguageTerms("statusName",!0,t.name),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","SetQuestCompleted",function(t){w.updateLanguageTerms("questCompleted",!0,t.completed),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","SetQuestOngoing",function(t){w.updateLanguageTerms("questOngoing",!0,t.ongoing),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","EditQuestDescription",function(t){var e=parseInt(t.questID),a=String(t.questName),t=String(t.newDescription);let i=null;f.loadQuests();for(const s of f.questsArray)if(!isNaN(e)&&0<e&&s.id===e||""!==a&&s.shortTitle===a){i=s;break}i&&(i.description=t),f.saveQuests()}),PluginManager.registerCommand("WD_Quest","EditQuestIcon",function(t){var e=Number(t.questID),a=String(t.questName),t=Number(t.iconID);f.loadQuests();for(const i of f.questsArray)if(!isNaN(e)&&0<e&&i.id===e||""!==a&&i.shortTitle===a){questObj=i;break}questObj&&(questObj.icon=t),f.saveQuests()}),PluginManager.registerCommand("WD_Quest","SetCommandName",function(t){w.updateLanguageTerms("questMenuCommandName",!0,t.commandName),w.saveSettings()}),PluginManager.registerCommand("WD_Quest","SetCompletionByName",function(t){var e=t.questName,t="true"===t.completion?"completed":"ongoing";let a=null;f.loadQuests();for(const i of f.questsArray)if(isNaN(0),""!==e&&i.shortTitle===e){a=i;break}a&&(a.status=t,f.saveQuests())}),PluginManager.registerCommand("WD_Quest","SetCompletionByID",function(t){var e=parseInt(t.questID),t="true"===t.completion?"completed":"ongoing";let a=null;f.loadQuests();for(const i of f.questsArray)if(!isNaN(e)&&0<e&&i.id===e){a=i;break}a&&(a.status=t,f.saveQuests())}),PluginManager.registerCommand("WD_Quest","RemoveQuestByID",function(t){t=Number(t.questID);f.loadQuests(),f.removeQuest(t,""),f.saveQuests()}),PluginManager.registerCommand("WD_Quest","RemoveQuest",function(t){t=t.questName;f.loadQuests(),f.removeQuest(0,t),f.saveQuests()}),Game_System.prototype.saveQuestContainer=function(t){this._questContainer=t},Game_System.prototype.getQuestContainer=function(){return this._questContainer||null},Game_System.prototype.saveWdQuestPluginSettings=function(t){this._savedWdQuestSettings=t},Game_System.prototype.getWdQuestPluginSettings=function(){return this._savedWdQuestSettings||null},Game_System.prototype.getQuestList=function(){return this._questList||[]},Game_System.prototype.getPluginParams=function(){return this._questPluginParams||null},window.WD_Interplugin_Quest={checkCompletionID:function(t){return b(t,"")},checkCompletionName:function(t){return b(0,t)}}}();