//=============================================================================
// Plugin Name: Achievements
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Create global game Achievements and pop-ups
// Terms of Use: By using this plugin you agree at our ToU (https://drive.google.com/file/d/1lG2Lep2Unme80ghZD7-fA-hPGWKLsiR7/view)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Achievements Plugin for RPG Maker MZ
 * @version 1.0
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 * @param paramLine1
 * @text === Graphic Options ===
 * @desc Select your graphics options here
 * @default ==============
 *
 * @param picIconSel
 * @text Use Icons or Pics?
 * @type select
 * @option Pictures (48x48 px)
 * @value pictures
 * @option Icons
 * @value icons
 * @desc Choose if you want to use icons or pictures for your Achievements
 * @default pictures
 *
 * @param autoGray
 * @text Autogray Settings
 * @type struct<autogr>
 * @desc Select the Autogray settings for locked pictures
 * @default {"autoGrayFlag":"false","autoGrayBright":"0","autoGrayGrayscale":"255"}
 *
 * @param rewardsCol
 * @text Number of Columns in Rewards Windows
 * @type number
 * @min 1
 * @desc How many columns are used in the rewards informations (if used)
 * @default 2
 *
 * @param paramLine2
 * @text === Pop Up Options ===
 * @desc Select your pop up options here
 * @default ==============
 *
 * @param usePop
 * @text Show pop up when Achievement is done?
 * @type boolean
 * @desc Choose if you want to show popups for completed achievements
 * @default true
 *
 * @param unlockText
 * @text Unlock Text
 * @desc What text is shown when an achievement is completed?
 * @default Achievement Unlocked:
 *
 * @param unlockSE
 * @text Unlock Sound Effect
 * @type file
 * @dir audio/se
 * @desc Play an SE when the pop up is called? (Leave blank if no SE is played)
 * @default
 *
 * @param paramLine3
 * @text === Commands Options ===
 * @desc Select your commands options here
 * @default ==============
 *
 * @param titleCommand
 * @text Show Command in Title Menu?
 * @type boolean
 * @desc Show Command in Title Menu?
 * @default true
 *
 * @param menuCommand
 * @text Show Command in Game Menu?
 * @type boolean
 * @desc Show Command in Game Menu?
 * @default false
 *
 * @param commandName
 * @text Command Text
 * @desc The text for the command
 * @default Achievements
 *
 * @param paramLine4
 * @text === Utility Options ===
 * @desc Select your utility options here
 * @default ==============
 *
 * @param hiddenDefaults
 * @text Hidden Default Settings
 * @type struct<hiddenDef>
 * @desc Default Settings for Hidden Achievements
 * @default {"hiddenDefPic":"","hiddenDefIco":"0","hiddenDefSmallT":"","hiddenDefBigT":"","hiddenDefSmallD":"","hiddenDefBigD":""}
 *
 * @param encryptionFlag
 * @text Encrypt JSON data?
 * @type boolean
 * @desc Allow the plugin to soft encrypt the JSON to avoid tampering from non programmer users?
 * @default false
 *
 * @param compatibilitySlot
 * @text Add space for other commands in Title Menu?
 * @type number
 * @min 0
 * @desc Compatibility: If the plugin affects other plugins title commands layout, add more slots here
 * @default 0
 *
 * @param highlightPref
 * @text Highlight Preference
 * @type boolean
 * @on Highlight 1st Achievement
 * @off Start without highlight
 * @desc Choose if the achievement showroom starts highlighted or not
 * @default false
 *
 * @command openAchi
 * @text Open achievements menu
 * @desc Opens the achievements scene
 *
 * @command AddAchievement
 * @text Add an Achievement
 * @desc Let the developer add an achievement.
 *
 * @arg id
 * @text ID
 * @type number
 * @min 0
 * @desc The Achievement ID and Index, it must be unique
 * @default 0
 *
 * @arg achiPic
 * @text Achievement Pictures
 * @type struct<achipics>
 * @desc Select the Pictures for your achievement
 * @default {"unlockPic":"","lockPic":"","hiddenPic":""}
 *
 * @arg achiIco
 * @text Achievement Icons
 * @type struct<achiicons>
 * @desc Select the Icons for your achievement
 * @default {"unlockIco":"0","lockIco":"0","hiddenIco":"0"}
 *
 * @arg achiTitles
 * @text Achievement Titles
 * @type struct<achititles>
 * @desc Select the Titles for your achievement
 * @default {"unlockSmallT":"","lockSmallT":"","hiddenSmallT":"","unlockBigT":"","lockBigT":"","hiddenBigT":""}
 *
 * @arg achiDescriptions
 * @text Achievement Descriptions
 * @type struct<achidescs>
 * @desc Select the Descriptions for your achievement
 * @default {"unlockSmallD":"","lockSmallD":"","hiddenSmallD":"","unlockBigD":"","lockBigD":"","hiddenBigD":""}
 *
 * @arg achiFulfill
 * @text Achievement Fulfillment
 * @type struct<achifullf>
 * @desc Choose if you want to display up to 3 fulfillment data
 * @default {"achiFulfill1":"{\"isActive\":\"false\",\"graphType\":\"text\",\"description\":\"\",\"startVal\":\"0\",\"targetVal\":\"10\"}","achiFulfill2":"{\"isActive\":\"false\",\"graphType\":\"text\",\"description\":\"\",\"startVal\":\"0\",\"targetVal\":\"10\"}","achiFulfill3":"{\"isActive\":\"false\",\"graphType\":\"text\",\"description\":\"\",\"startVal\":\"0\",\"targetVal\":\"10\"}"}
 *
 * @arg achiRewards
 * @text Achievement Rewards
 * @type struct<achireward>
 * @desc Select the Rewards for your achievement
 * @default {"achiExpRew":"[]","achiGoldRew":"[]","achiItemRew":"[]","achiWeaponRew":"[]","achiArmorRew":"[]","achiEventRew":"[]"}
 *
 * @arg isHidden
 * @text is Hidden?
 * @type boolean
 * @desc If true the Achievement will be an Hidden Achievement
 * @default false
 *
 * @command completeAchievement
 * @text Complete Achievement
 * @desc Unlock an achievement, setting it as "Done".
 *
 * @arg id
 * @text ID
 * @type number
 * @min 0
 * @desc The Achievement ID
 * @default 0
 *
 * @command dehiddenAchievement
 * @text Remove Hidden from Achievement
 * @desc Change an Achievement from hidden to locked (if not already done)
 *
 * @arg id
 * @text ID
 * @type number
 * @min 0
 * @desc The Achievement ID
 * @default 0
 *
 * @command rehiddenAchievement
 * @text Set an Achievement "Hidden"
 * @desc Change an Achievement to hidden (unless it's completed)
 *
 * @arg id
 * @text ID
 * @type number
 * @min 0
 * @desc The Achievement ID
 * @default 0
 *
 * @command changeFulfillment
 * @text Change Achievement Fulfillment
 * @desc Change the value for the fulfillment (must be active)
 *
 * @arg id
 * @text ID
 * @type number
 * @min 0
 * @desc The Achievement ID
 * @default 0
 *
 * @arg ful1
 * @text Value change for 1st fulfillment
 * @type number
 * @desc The value will be ADDED (or subtracted if negative) to the current value
 * @default 0
 *
 * @arg ful2
 * @text Value change for 2nd fulfillment
 * @type number
 * @desc The value will be ADDED (or subtracted if negative) to the current value
 * @default 0
 *
 * @arg ful3
 * @text Value change for 3rd fulfillment
 * @type number
 * @desc The value will be ADDED (or subtracted if negative) to the current value
 * @default 0
 *
 * @command showLoadedAchi
 * @text (DEVS ONLY) Show Loaded Achievements
 * @desc Get a list of the achievements from the JSON in the RMMZ console
 *
 * @command undoneAll
 * @text (DEVS ONLY) Reset all Achievements to "Not Done"
 * @desc It will turn all achievements as not done (if you manually de-hidden an achievement you must manually re-hide it)
 *
 * @command dataWipe
 * @text (DEVS ONLY) Wipe the Achievements JSON
 * @desc This will wipe the JSON to a blank state, NO TURNING BACK!
 *
 * @help
 * This plugin allows you to add Achievements to your game. Those Achievements will be 
 * store in a JSON and will be shared among all plays and savegames of your project
 *
 * Be sure to have installed the .js file in the js/plugins folder of your project and 
 * the .JSON file in the data folder of your project.
 * If at any time you want to wipe your achievements data, just open the JSON and write []
 *
 * PRO TIP: As the Achievments changes are PERMANENT it's useful to keep a hidden event in 
 *          that adds all the achievements, once you are ready to distribute your game you 
 *          can wipe and re-add the achievements to reset them.
 *
 * This plugin comes with the following features:
 * - Pictures or Icons: You can use pictures (48x48 px) or RMMZ icons for your achievements
 * - AutoGray Feature (only pictures): If you use pictures and you enable Autogray, the plugin 
 *                                     will turn pictures to grayscale if the achievement is 
 *                                     locked
 * - Fulfillments: You can add up to 3 fulfillments per Achievement and you can decide how 
 *                 every each of them is displayed (text, gauge or combination of both).
 *                 If ALL active fulfillments are met, the plugin will auto-unlock the 
 *                 achievement
 * - Hidden achievements: You can set Achievements to "Hidden", they will use a standard 
 *                        format and will hide fulfillments and rewards in the menu 
 * - PopUp Window: You can choose to show a popUp message when the achievement is unlocked,
 *                 it can also play a Sound Effect when popping. PopUp window have a built 
 *                 in queque and will display multiple unlocked achievements one by one
 * - JSON Auto-Encryption: The plugin offer the option to soft encrypt the JSON file, it's 
 *                         nothing a programmer can't decrypt but it should stop average
 *                         users from just changing "false" with "true" in the isDone field
 * 
 * //IMPORTANT NOTE:
 * When making drastic changes to the data (for example wiping the database and rewriting all
 * the achievements) consider leaving some time between one operation and the other to avoid
 * problems with the JSON writer function that may be slower than the actual JavaScript code.
 * 
 * //CALLING THE PLUGIN FROM EXTERNAL SOURCES:
 * The achievement completion can be also called from outside the plugin, for example you could
 * call it from the Title Screen if you want to create a "Start the game" achievement! 
 * To do so, just write the script call: window.WD_Interplugin_Achievements.complete(id);
 * Where "id" is the ID of the achievement!
 * Please make sure the database is ready and plugins are loaded before the external script call
 * commence.
 *
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 *
 * //////////////////////////////////////////////////
 * VERSION 1.5:
 * - Fixed a bug that would cause a crash to the plugin if the player hit the Ok
 *   button before highlighting an achievement, thanks to Frog-rz4ot for the report!
 * - Considering the problem above, added the possibility to choose if you want
 *   the achievement showroom to start not highlighted or with the first achievement
 *   highlighted
 * VERSION 1.4:
 * - Fixed a problem that would save achievements in both format (encrypted and clear)
 *   if the dev switched Encryption flag while adding them, this would result in a 
 *   fatal crash once the plugin tries to load the JSON with both encrypted and
 *   clear data. The new load method now prevents another fatal crash that would
 *   happen when adding an achievement right after wiping the JSON. Thanks to 
 *   F.O.X. Development for the report.
 * - Changed the sprite generation function for the achievements pictures, now they
 *   anchor to the windows instead of the scene, this should solve once for all the
 *   misplacement bug when the UI resolution is different from screen resolution. 
 *   Plus it should avoid conflict with other plugins that manipulate the windows
 *   behaviour (but this is something I can only guarantee to an extent)
 * VERSION 1.3:
 * - Fixed pictures misplacements if using a different Screen vs UI resolution
 * - Investigated the possible issue of teleporting to another map while popping the
 *   achievement complete window, no issues have been recorded
 * - Investigated the possible issue of changing scene (menu, save, game over, title screen)
 *   while achievement windows is popping. No fatal error, but it would be better to
 *   avoid such simultaneous events or the pop window might be lost
 * - Added a script call to run the "Complete Achievement" command outside the plugin
 *   (see instructions in the description). Be sure to have the database and plugins
 *   ready before doing so.
 * - Investigated the possible issue about giving out rewards while not in the game.
 *   The game will IGNORE all the rewards, there is no way to recover them. That said,
 *   popping an achievement outside the game need the special external script call to
 *   be doable. So shame on you if you pop a rewarding achievement outside the game!
 * VERSION 1.2.1:
 * - Fixed a minor bug in the data load that shouldn't have caused any issues anyway
 * - Removed a couple of dead variables that were implemented but never used
 * VERSION 1.2:
 * - Added two Quality of Life plugin commands: Re-Hide an achievement (useful if you manually 
 *   de-hidden an achievement) and Reset all Achievements to Not Done, you can simply hit this 
 *   command to undo all achievements, hopefully this will speed up the pre-distribution process
 *   of your project
 * VERSION 1.1:
 * - Hotfix for a problem reported by Rizky Fauzy Ananda. The save/load feature of the JSON
 *   would crash on web distribution. Added a check to control if the game is played on a 
 *   local machine and added a new save/load method by key foraging in the event the game is 
 *   a web distribution. Thanks to Aerosys and caethyril for the help with this fix!
 * //////////////////////////////////////////////////
 *
 */
/*~struct~achipics:
 * @param unlockPic
 * @text Unlocked Picture
 * @type file
 * @dir img/pictures
 * @desc Select a pictures for when the achievement is Unlocked
 * @default
 *
 * @param lockPic
 * @text Locked Picture (if different)
 * @type file
 * @dir img/pictures
 * @desc Select a pictures for when the achievement is Locked (if different from unlocked)
 * @default
 *
 * @param hiddenPic
 * @text Hidden Picture (if different)
 * @type file
 * @dir img/pictures
 * @desc Select a pictures for when the achievement is Hidden (if different from standard hidden parameters)
 * @default
 */
/*~struct~achiicons:
 * @param unlockIco
 * @text Unlocked Icon
 * @type icon
 * @desc Select an icon for when the achievement is Unlocked
 * @default
 *
 * @param lockIco
 * @text Locked Icon (if different)
 * @type icon
 * @desc Select an icon for when the achievement is Locked (if different from unlocked)
 * @default
 *
 * @param hiddenIco
 * @text Hidden Icon (if different)
 * @type icon
 * @desc Select an icon for when the achievement is Hidden (if different from standard hidden parameters)
 * @default
 */
/*~struct~achititles:
 * @param unlockSmallT
 * @text Unlocked Short Title
 * @desc Short Title for the Achievement list (when unlocked)
 * @default
 *
 * @param lockSmallT
 * @text Locked Short Title (if different)
 * @desc Short Title for the Achievement list (when locked, if different from unlocked)
 * @default
 *
 * @param hiddenSmallT
 * @text Hidden Short Title (if different)
 * @desc Short Title for the Achievement list (when hidden, if not standard)
 * @default
 *
 * @param unlockBigT
 * @text Unlocked Long Title
 * @desc Long Title for the Achievement info (when unlocked)
 * @default
 *
 * @param lockBigT
 * @text Locked Long Title (if different)
 * @desc Long Title for the Achievement info (when locked, if different from unlocked)
 * @default
 *
 * @param hiddenBigT
 * @text Hidden Long Title (if different)
 * @desc Long Title for the Achievement info (when hidden, if not standard)
 * @default
 */
/*~struct~achidescs:
 * @param unlockSmallD
 * @text Unlocked Short Description
 * @desc Short Description for the Achievement list (when unlocked)
 * @default
 *
 * @param lockSmallD
 * @text Locked Short Description (if different)
 * @desc Short Description for the Achievement list (when locked, if different from unlocked)
 * @default
 *
 * @param hiddenSmallD
 * @text Hidden Short Description (if different)
 * @desc Short Description for the Achievement list (when hidden, if not standard)
 * @default
 *
 * @param unlockBigD
 * @text Unlocked Long Description
 * @desc Long Description for the Achievement info (when unlocked)
 * @default
 *
 * @param lockBigD
 * @text Locked Long Description (if different)
 * @desc Long Description for the Achievement info (when locked, if different from unlocked)
 * @default
 *
 * @param hiddenBigD
 * @text Hidden Long Description (if different)
 * @desc Long Description for the Achievement info (when hidden, if not standard)
 * @default
 */
/*~struct~achireward:
 * @param achiExpRew
 * @text Experience Rewards
 * @type struct<achiexp>[]
 * @desc Select the Experience for your achievement
 * @default []
 *
 * @param achiGoldRew
 * @text Gold Rewards
 * @type struct<achigold>[]
 * @desc Select the Gold for your achievement
 * @default []
 *
 * @param achiItemRew
 * @text Item Rewards
 * @type struct<achiitem>[]
 * @desc Select the Item for your achievement
 * @default []
 *
 * @param achiWeaponRew
 * @text Weapon Rewards
 * @type struct<achiwea>[]
 * @desc Select the Weapon for your achievement
 * @default []
 *
 * @param achiArmorRew
 * @text Armor Rewards
 * @type struct<achiarm>[]
 * @desc Select the Armor for your achievement
 * @default []
 *
 * @param achiEventRew
 * @text Common Event Rewards
 * @type struct<achievent>[]
 * @desc Select the Common Event for your achievement
 * @default []
 */
/*~struct~achiexp:
 * @param unlockExp
 * @type number
 * @min 0
 * @text Experience
 * @desc How much Experience is earned on Achievement completion
 * @default 0
 */
/*~struct~achigold:
 * @param unlockGold
 * @type number
 * @min 0
 * @text Gold
 * @desc How much Gold is earned on Achievement completion
 * @default 0
 */
/*~struct~achiitem:
 * @param unlockItem
 * @type item
 * @min
 * @text Item
 * @desc What Item is earned on Achievement completion
 * @default
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc How many are unlocked?
 * @default 1
 */
/*~struct~achiwea:
 * @param unlockWeapon
 * @type weapon
 * @text Weapon
 * @desc What Weapon is earned on Achievement completion
 * @default
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc How many are unlocked?
 * @default 1
 */
/*~struct~achiarm:
 * @param unlockArmor
 * @type armor
 * @text Armor
 * @desc What Armor is earned on Achievement completion
 * @default
 *
 * @param quantity
 * @type number
 * @min 1
 * @text Quantity
 * @desc How many are unlocked?
 * @default 1
 */
/*~struct~achievent:
 * @param unlockId
 * @type number
 * @min 1
 * @text Common Event ID
 * @desc The ID of the common event as in the Editor
 * @default 1
 *
 * @param textReward
 * @text Text to show
 * @desc The text to show in the reward recap
 * @default
 *
 * @param iconReward
 * @text Icon to show
 * @type icon
 * @desc The icon to show in the reward recap
 * @default
 */
/*~struct~autogr:
 * @param autoGrayFlag
 * @text Enable Automatic Gray Tint?
 * @type boolean
 * @desc Change locked pictures to gray tint automatically? (Doesn't work for Icons)
 * @default false
 *
 * @param autoGrayBright
 * @text Brightness Change
 * @type number
 * @min -255
 * @max 255
 * @desc Change in brightness for locked pictures
 * @default 0
 *
 * @param autoGrayGrayscale
 * @text Grayscale Change
 * @type number
 * @min -255
 * @max 255
 * @desc Change in grayscale for locked pictures
 * @default 255
 */
/*~struct~hiddenDef:
 * @param hiddenDefPic
 * @text Default Picture
 * @type file
 * @dir img/pictures
 * @desc Select the default picture for when an achievement is Hidden
 * @default
 *
 * @param hiddenDefIco
 * @text Default Icon
 * @type icon
 * @desc Select the default icon for when an achievement is Hidden
 * @default
 *
 * @param hiddenDefSmallT
 * @text Default Hidden Short Title
 * @desc Default Short Title for the Achievement list
 * @default
 *
 * @param hiddenDefBigT
 * @text Default Hidden Long Title
 * @desc Default Long Title for the Achievement info
 * @default
 *
 * @param hiddenDefSmallD
 * @text Default Hidden Short Description
 * @desc Default Short Description for the Achievement list
 * @default
 *
 * @param hiddenDefBigD
 * @text Default Hidden Long Description
 * @desc Default Long Description for the Achievement info
 * @default
 */
/*~struct~achifullf:
 * @param achiFulfill1
 * @text 1st Fulfillment
 * @type struct<achifulldet>
 * @desc Choose the details of first fulfillment
 * @default {"isActive":"false","graphType":"text","description":"","startVal":"0","targetVal":"10"}
 *
 * @param achiFulfill2
 * @text 2nd Fulfillment
 * @type struct<achifulldet>
 * @desc Choose the details of first fulfillment
 * @default {"isActive":"false","graphType":"text","description":"","startVal":"0","targetVal":"10"}
 *
 * @param achiFulfill3
 * @text 3rd Fulfillment
 * @type struct<achifulldet>
 * @desc Choose the details of first fulfillment
 * @default {"isActive":"false","graphType":"text","description":"","startVal":"0","targetVal":"10"}
 */
/*~struct~achifulldet:
 * @param isActive
 * @text Show this fulfillment?
 * @type boolean
 * @desc Choose if you want to show this fulfillment
 * @default false
 *
 * @param graphType
 * @text Graphic Style
 * @type select
 * @option Text Only (ex: Get 50 Potions: 0/50)
 * @value text
 * @option Gauge Only
 * @value gauge
 * @option Text over gauge
 * @value combo
 * @desc Choose how the progression is displayed
 * @default text
 *
 * @param description
 * @text Description
 * @desc The descritpion of the goal
 * @default 
 *
 * @param startVal
 * @text Starting Value
 * @type number
 * @desc The initial value
 * @default 0
 * @min 0
 *
 * @param targetVal
 * @text Target Value
 * @type number
 * @desc The target value
 * @default 10
 */
 
 //Pushing Plugin JSON in DataManager
 var $dataWDAchievements = null;
 
 DataManager._databaseFiles.push({name: '$dataWDAchievements', src: 'WD_Achievements.json'});

!function(){var e=PluginManager.parameters("WD_Achievements");let P=e.unlockText||"Achievement Unlocked:";const d="pictures"===e.picIconSel;var t=JSON.parse(e.autoGray);const u="true"===t.autoGrayFlag,f=parseInt(t.autoGrayBright),p=parseInt(t.autoGrayGrayscale),N=parseInt(e.rewardsCol)||2,i="true"===e.titleCommand,n="true"===e.menuCommand,o=e.commandName||"Achievements",r=function(e){e=JSON.parse(e);return e.hiddenDefIco=isNaN(parseInt(e.hiddenDefIco))?0:parseInt(e.hiddenDefIco),e}(e.hiddenDefaults),E="true"===e.encryptionFlag,G=i?4+parseInt(e.compatibilitySlot):3+parseInt(e.compatibilitySlot),s="true"===e.usePop,a=e.unlockSE||"",O=void 0!==e.highlightPref&&"true"===e.highlightPref;let l=!1,h=[],m,c=!1,w=-1,g=[],y,W=[],v=!1;function I(){if(l)h.sort((e,t)=>e.iD-t.iD);else{let t=$dataWDAchievements;StorageManager.isLocalMode()?(h=k(t)?A(t,"decrypt"):t,l=!0,h.sort((e,t)=>e.iD-t.iD)):StorageManager.loadObject("WD_Achievements").then(e=>{null!==e&&(t=e),h=k(t)?A(t,"decrypt"):t,l=!0,h.sort((e,t)=>e.iD-t.iD)}).catch(()=>{h=k(t)?A(t,"decrypt"):t,l=!0,h.sort((e,t)=>e.iD-t.iD)})}}function k(e){return 0!==e.length&&e[0].hasOwnProperty("code")}function D(){h.sort((e,t)=>e.iD-t.iD);var e,t,i,n=E?A(h,"encrypt"):h,o="WD_Achievements",a=JSON.stringify(n);StorageManager.isLocalMode()?(e=require("fs"),i=(t=require("path")).dirname(process.mainModule.filename),i=(t=t.join(i,"data/"))+o+".json",e.existsSync(t)||e.mkdirSync(t),e.writeFileSync(i,a)):StorageManager.saveObject(o,n)}function A(n,e){if(0===n.length)return[];function o(i,n){let o="";for(let t=0;t<i.length;t++){let e=i[t];var a;e.match(/[a-z]/i)&&(65<=(a=i.charCodeAt(t))&&a<=90?e=String.fromCharCode((a-65+n)%26+65):97<=a&&a<=122&&(e=String.fromCharCode((a-97+n)%26+97))),o+=e}return o}switch(e){case"encrypt":var a=[],r=[],l=[0,1,2,3,4,5,6,7,8,9],c=(l.sort(()=>Math.random()-.5),Math.floor(25*Math.random())+1);let e,t=(e=c<10?"X":10<=c&&c<=99?"R":"G","A");for(let e=0;e<l.length;e++)t+=l[e];a.push({code:e+c+t});for(const g of n){r=[];for(let e=0;e<l.length;e++)switch(l[e]){case 0:r.push(g.iD);break;case 1:r.push(g.pictures);break;case 2:r.push(g.icons);break;case 3:r.push(g.titles);break;case 4:r.push(g.descriptions);break;case 5:r.push(g.isDone);break;case 6:r.push(g.isHidden);break;case 7:r.push(g.rewards);break;case 8:r.push(g.fulfillment);break;case 9:r.push({isDone:!1,isHidden:!1})}var s=JSON.stringify(r);a.push({code:o(s,c)})}return a;case"decrypt":if("object"!=typeof n[0]||!n[0].hasOwnProperty("code"))return n;let i;var h=[],d=[];switch((decryptionKeys=n[0].code)[0]){case"X":i=parseInt(decryptionKeys[1]);break;case"R":i=parseInt(decryptionKeys[1]+decryptionKeys[2]);break;case"G":i=parseInt(decryptionKeys[1]+decryptionKeys[2]+decryptionKeys[3])}var u=decryptionKeys.split("A")[1];for(let e=0;e<u.length;e++)h.push(parseInt(u[e]));for(let e=1;e<n.length;e++){var f={iD:0,pictures:{},icons:{},titles:{},descriptions:{},fulfillment:{},rewards:{},isHidden:{},isDone:!1},p=JSON.parse((m=n[e].code,w=i,o(m,26-w)));for(let e=0;e<h.length;e++)switch(h[e]){case 0:f.iD=p[e];break;case 1:f.pictures=p[e];break;case 2:f.icons=p[e];break;case 3:f.titles=p[e];break;case 4:f.descriptions=p[e];break;case 5:f.isDone=p[e];break;case 6:f.isHidden=p[e];break;case 7:f.rewards=p[e];break;case 8:f.fulfillment=p[e]}d.push(f)}return d}var m,w}function _(){if(m&&void 0!==m&&null!==m&&!m.isHidden)for(const e in m.rewards)if(0!==m.rewards[e].length)return!0;return!1}function S(e,t){let i,n,o,a;return a=e.isDone?(i=e.icons.unlockIco,n=e.pictures.unlockPic,o="Small"===t?e.titles.unlockSmallT:e.titles.unlockBigT,"Small"===t?e.descriptions.unlockSmallD:e.descriptions.unlockBigD):e.isHidden?(i=b(e.icons.hiddenIco)?r.hiddenDefIco:e.icons.hiddenIco,n=b(e.pictures.hiddenPic)?r.hiddenDefPic:e.pictures.hiddenPic,"Small"===t?(o=b(e.titles.lockSmallT)?r.hiddenDefSmallT:e.titles.lockSmallT,b(e.descriptions.lockSmallD)?r.hiddenDefSmallD:e.descriptions.lockSmallD):(o=b(e.titles.lockBigT)?r.hiddenDefBigT:e.titles.lockBigT,b(e.descriptions.lockBigD)?r.hiddenDefBigD:e.descriptions.lockBigD)):(i=b(e.icons.lockIco)?e.icons.unlockIco:e.icons.lockIco,n=b(e.pictures.lockPic)?e.pictures.unlockPic:e.pictures.lockPic,"Small"===t?(o=b(e.titles.lockSmallT)?e.titles.unlockSmallT:e.titles.lockSmallT,b(e.descriptions.lockSmallD)?e.descriptions.unlockSmallD:e.descriptions.lockSmallD):(o=b(e.titles.lockBigT)?e.titles.unlockBigT:e.titles.lockBigT,b(e.descriptions.lockBigD)?e.descriptions.unlockBigD:e.descriptions.lockBigD)),{currentIcon:i,currentPicture:n,currentTitle:o,currentDescription:a}}function b(e){return""===e||"0"===e||e<1}function C(){let e=0;if(!m||void 0===m||null===m)return 0;if(m.isHidden)return 0;for(const t in m.fulfillment)m.fulfillment[t].isActive&&e++;return e}function x(){var e=m;let t,i;return i=e.isDone?(t=e.icons.unlockIco,e.pictures.unlockPic):e.isHidden?(t=b(e.icons.hiddenIco)?r.hiddenDefIco:e.icons.hiddenIco,b(e.pictures.hiddenPic)?r.hiddenDefPic:e.pictures.hiddenPic):(t=b(e.icons.lockIco)?e.icons.unlockIco:e.icons.lockIco,b(e.pictures.lockPic)?e.pictures.unlockPic:e.pictures.lockPic),d?""!==i:""!==t&&0!==t}function T(t){if(v){let e=!1;for(const i of W)if(i===t){e=!0;break}e||(W.push(t),function t(){z(100).then(function(){if(0<W.length&&v)t();else if(0<W.length&&!v){const e=W.splice(0,1)[0];B(e),0<W.length&&t()}else 0<W.length&&v}).catch(function(){console.warn("WD_Achievements: Error in popUp Listener!")})}())}else B(t)}function B(e){v=!0,""!==a&&AudioManager.playSe({name:a,volume:90,pitch:100,pan:0}),y=e;var e=SceneManager._scene,t=new Rectangle((Graphics.boxWidth-350)/2,-110,350,110);e._WDApopWindow=new V(t),e.addWindow(e._WDApopWindow)}function q(i){return new Promise(function(e,t){setTimeout(function(){e()},1e3*i)})}function z(i){return new Promise(function(e,t){setTimeout(function(){e()},i)})}function $(e){for(const t of e.rewards.achiExpRew)if(!t.isCollected){t.isCollected=!0;for(let e=1;e<$dataActors.length;e++)$gameActors.actor(e).gainExp(t.unlockExp)}for(const i of e.rewards.achiGoldRew)i.isCollected||(i.isCollected=!0,$gameParty.gainGold(i.unlockGold));for(const n of e.rewards.achiItemRew)0<n.unlockItem&&!n.isCollected&&(n.isCollected=!0,$gameParty.gainItem($dataItems[n.unlockItem],n.quantity));for(const o of e.rewards.achiWeaponRew)0<o.unlockWeapon&&!o.isCollected&&(o.isCollected=!0,$gameParty.gainItem($dataWeapons[o.unlockWeapon],o.quantity));for(const a of e.rewards.achiArmorRew)0<a.unlockArmor&&!a.isCollected&&(a.isCollected=!0,$gameParty.gainItem($dataArmors[a.unlockArmor],a.quantity));for(const r of e.rewards.achiEventRew)r.isCollected||(r.isCollected=!0,$gameTemp.reserveCommonEvent(r.unlockId))}function J(t){if(!(0<=t)||isNaN(t))throw new Error("WD_Achievements: Error in the Achievement ID, invalid entry: Text or below 0");{I();let e=!1;for(const i of h)if(i.iD===t){e=!0,i.isDone||(i.isDone=!0,$(i),s&&T(i));break}e?D():console.warn("WD_Achievements: Unable to find desidered ID in Complete Achievement command")}}PluginManager.registerCommand("WD_Achievements","AddAchievement",function(t){var i=parseInt(t.id),n=JSON.parse(t.achiPic),o=JSON.parse(t.achiIco),a=JSON.parse(t.achiTitles),r=JSON.parse(t.achiDescriptions),l=function(e){var t=JSON.parse(e);for(const i in t)t[i]=JSON.parse(t[i]),t[i].isActive="true"===t[i].isActive,t[i].startVal=parseInt(t[i].startVal),t[i].targetVal=parseInt(t[i].targetVal);return t}(t.achiFulfill),c=function(e){var t=JSON.parse(e);var i={type:"Temp",set:!1};for(const n in t){t[n]=JSON.parse(t[n]);for(let e=0;e<t[n].length;e++){switch(t[n][e]=JSON.parse(t[n][e]),n){case"achiArmorRew":i.type="unlockArmor",i.set=!0;case"achiWeaponRew":i.set||(i.type="unlockWeapon",i.set=!0);case"achiItemRew":i.set||(i.type="unlockItem",i.set=!0),t[n][e].quantity=parseInt(t[n][e].quantity),t[n][e][i.type]=parseInt(t[n][e][i.type]),i.set=!1;break;case"achiExpRew":t[n][e].unlockExp=parseInt(t[n][e].unlockExp);break;case"achiGoldRew":t[n][e].unlockGold=parseInt(t[n][e].unlockGold);break;case"achiEventRew":t[n][e].unlockId=parseInt(t[n][e].unlockId),t[n][e].iconReward=parseInt(t[n][e].iconReward)}t[n][e].isCollected=!1}}return t}(t.achiRewards),t="true"===t.isHidden;for(const e in o)""===o[e]||isNaN(parseInt(o[e]))?o[e]="":o[e]=parseInt(o[e]);if(!(0<=i)||isNaN(i))throw new Error("WD_Achievements: Error in the Achievement ID, invalid entry: Text or below 0");{I();let e=!1;for(const s of h)if(s.iD===i){e=!0;break}e?console.warn("WD_Achievements: Achievement has not been added, non-unique ID used"):(h.push({iD:i,pictures:n,icons:o,titles:a,descriptions:r,fulfillment:l,rewards:c,isHidden:t,isDone:!1}),D())}}),PluginManager.registerCommand("WD_Achievements","completeAchievement",function(e){J(parseInt(e.id))}),PluginManager.registerCommand("WD_Achievements","dehiddenAchievement",function(e){var t=parseInt(e.id);if(!(0<=t)||isNaN(t))throw new Error("WD_Achievements: Error in the Achievement ID, invalid entry: Text or below 0");{I();let e=!1;for(const i of h)if(i.iD===t){e=!0,i.isHidden=!1;break}e?D():console.warn("WD_Achievements: Unable to find desidered ID in Remove Hidden from Achievement command")}}),PluginManager.registerCommand("WD_Achievements","rehiddenAchievement",function(e){var t=parseInt(e.id);if(!(0<=t)||isNaN(t))throw new Error("WD_Achievements: Error in the Achievement ID, invalid entry: Text or below 0");{I();let e=!1;for(const i of h)if(i.iD===t){e=!0,i.isHidden=!0;break}e?D():console.warn("WD_Achievements: Unable to find desidered ID in Remove Hidden from Achievement command")}}),PluginManager.registerCommand("WD_Achievements","undoneAll",function(e){I();for(const t of h)t.isDone=!1;D()}),PluginManager.registerCommand("WD_Achievements","dataWipe",function(e){h=[],D()}),PluginManager.registerCommand("WD_Achievements","showLoadedAchi",function(e){I(),console.log("WD_Achievements: Here is the list of the current loaded Achievements"),console.dir(h)}),PluginManager.registerCommand("WD_Achievements","openAchi",function(e){SceneManager.push(F)}),PluginManager.registerCommand("WD_Achievements","changeFulfillment",function(e){var t=parseInt(e.id),i=parseInt(e.ful1),n=parseInt(e.ful2),o=parseInt(e.ful3);if(!(0<=t)||isNaN(t))throw new Error("WD_Achievements: Error in the Achievement ID, invalid entry: Text or below 0");{I();let e=!1;for(const c of h)if(c.iD===t){if(e=!0,c.fulfillment.achiFulfill1.isActive||c.fulfillment.achiFulfill1.isActive||c.fulfillment.achiFulfill1.isActive){c.fulfillment.achiFulfill1.startVal=c.fulfillment.achiFulfill1.startVal+i,c.fulfillment.achiFulfill1.startVal<0?c.fulfillment.achiFulfill1.startVal=0:c.fulfillment.achiFulfill1.startVal=c.fulfillment.achiFulfill1.startVal,c.fulfillment.achiFulfill1.startVal>c.fulfillment.achiFulfill1.targetVal?c.fulfillment.achiFulfill1.startVal=c.fulfillment.achiFulfill1.targetVal:c.fulfillment.achiFulfill1.startVal=c.fulfillment.achiFulfill1.startVal,c.fulfillment.achiFulfill2.startVal=c.fulfillment.achiFulfill2.startVal+n,c.fulfillment.achiFulfill2.startVal<0?c.fulfillment.achiFulfill2.startVal=0:c.fulfillment.achiFulfill2.startVal=c.fulfillment.achiFulfill2.startVal,c.fulfillment.achiFulfill2.startVal>c.fulfillment.achiFulfill2.targetVal?c.fulfillment.achiFulfill2.startVal=c.fulfillment.achiFulfill2.targetVal:c.fulfillment.achiFulfill2.startVal=c.fulfillment.achiFulfill2.startVal,c.fulfillment.achiFulfill3.startVal=c.fulfillment.achiFulfill3.startVal+o,c.fulfillment.achiFulfill3.startVal<0?c.fulfillment.achiFulfill3.startVal=0:c.fulfillment.achiFulfill3.startVal=c.fulfillment.achiFulfill3.startVal,c.fulfillment.achiFulfill3.startVal>c.fulfillment.achiFulfill3.targetVal?c.fulfillment.achiFulfill3.startVal=c.fulfillment.achiFulfill3.targetVal:c.fulfillment.achiFulfill3.startVal=c.fulfillment.achiFulfill3.startVal;var a=c.fulfillment.achiFulfill1.isActive?1:0,r=c.fulfillment.achiFulfill2.isActive?1:0,l=c.fulfillment.achiFulfill3.isActive?1:0;let e=0;c.fulfillment.achiFulfill1.isActive&&c.fulfillment.achiFulfill1.startVal===c.fulfillment.achiFulfill1.targetVal&&e++,c.fulfillment.achiFulfill2.isActive&&c.fulfillment.achiFulfill2.startVal===c.fulfillment.achiFulfill2.targetVal&&e++,c.fulfillment.achiFulfill3.isActive&&c.fulfillment.achiFulfill3.startVal===c.fulfillment.achiFulfill3.targetVal&&e++,e!==a+r+l||c.isDone||(c.isDone=!0,$(c),s&&T(c));break}e=!1,console.warn("WD_Achievements: Selected achievement for fulfillment changes has no fulfillment rules active!");break}e?D():console.warn("WD_Achievements: Unable to find desidered ID in Remove Hidden from Achievement command")}});let U=Scene_Title.prototype.createCommandWindow,j=(Scene_Title.prototype.createCommandWindow=function(){U.call(this),i&&this._commandWindow.setHandler("achievements",this.commandWDAchi.bind(this))},Window_TitleCommand.prototype.makeCommandList);Window_TitleCommand.prototype.makeCommandList=function(){j.call(this),i&&this.addCommand(o,"achievements")},Scene_Title.prototype.commandWindowRect=function(){var e=$dataSystem.titleCommandWindow.offsetX,t=$dataSystem.titleCommandWindow.offsetY,i=this.mainCommandWidth(),n=this.calcWindowHeight(G,!0),e=(Graphics.boxWidth-i)/2+e;return new Rectangle(e,Graphics.boxHeight-n-96+t,i,n)},Scene_Title.prototype.commandWDAchi=function(){this._commandWindow.close(),SceneManager.push(F)};const L=Window_MenuCommand.prototype.addOriginalCommands,K=(Window_MenuCommand.prototype.addOriginalCommands=function(){L.call(this),n&&this.addCommand(o,"WD_AchiMenu",!0)},Scene_Menu.prototype.createCommandWindow);function F(){this.initialize(...arguments)}function R(){this.initialize(...arguments)}function M(){this.initialize(...arguments)}function H(){this.initialize(...arguments)}function V(){this.initialize(...arguments)}Scene_Menu.prototype.createCommandWindow=function(){K.call(this),n&&this._commandWindow.setHandler("WD_AchiMenu",this.commandWDachiMenu.bind(this))},Scene_Menu.prototype.commandWDachiMenu=function(){SceneManager.push(F)},((F.prototype=Object.create(Scene_MenuBase.prototype)).constructor=F).prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this),I()},F.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),this.createAchiShowroomWindow()},F.prototype.createAchiShowroomWindow=function(){var e=this.achiShowroomWindowRect();this._achiShowroomWindow=new R(e),this._achiShowroomWindow.setHandler("ok",this.onAchiShowroomOk.bind(this)),this._achiShowroomWindow.setHandler("cancel",this.onAchiShowroomCancel.bind(this)),this.addWindow(this._achiShowroomWindow)},F.prototype.achiShowroomWindowRect=function(){var e=.1*Graphics.boxWidth;return new Rectangle(e,.1*Graphics.boxHeight,.8*Graphics.boxWidth,.8*Graphics.boxHeight)},F.prototype.onAchiShowroomOk=function(){var e=this._achiShowroomWindow.index();if(0<=e){c=!1;for(const t of g)SceneManager._scene.removeChild(t);g=[],this.createAchiInfoWindow(),_()&&this.createAchiRewardWindow(),w=e,this._achiShowroomWindow.destroy()}else this._achiShowroomWindow.activate()},F.prototype.onAchiShowroomCancel=function(){this.popScene()},F.prototype.createAchiInfoWindow=function(){var e=_(),e=this.achiInfoWindowRect(e);this._achiInfoWindow=new M(e),this._achiInfoWindow.setHandler("cancel",this.onAchiInfoCancel.bind(this)),this.addWindow(this._achiInfoWindow)},F.prototype.achiInfoWindowRect=function(e){var t=x()?0:.1,i=.1*Graphics.boxWidth,e=e?.1*Graphics.boxHeight:.25*Graphics.boxHeight,n=.8*Graphics.boxWidth,t=Graphics.boxHeight*(.35+.1*C()-t);return new Rectangle(i,e,n,t)},F.prototype.createAchiRewardWindow=function(){var e=this.achiRewardWindowRect();this._achiRewardWindow=new H(e),this._achiRewardWindow.setHandler("ok",this.onRewardOk.bind(this)),this._achiRewardWindow.setHandler("cancel",this.onAchiInfoCancel.bind(this)),this.addWindow(this._achiRewardWindow)},F.prototype.achiRewardWindowRect=function(){var e=x()?0:.1,t=.1*Graphics.boxWidth,i=Graphics.boxHeight*(.45+.1*C()-e),n=.8*Graphics.boxWidth,e=Graphics.boxHeight*(.45-.1*C()+e);return new Rectangle(t,i,n,e)},F.prototype.onAchiInfoCancel=function(){c||(c=!0,this.createAchiShowroomWindow(),this._achiInfoWindow.destroy(),_()&&this._achiRewardWindow.destroy(),m=void 0,this._achiShowroomWindow.select(w),this._achiShowroomWindow.activate())},F.prototype.onRewardOk=function(){this._achiRewardWindow.activate()},SceneManager.Scene_WDAchi=F,((R.prototype=Object.create(Window_Selectable.prototype)).constructor=R).prototype.initialize=function(e){Window_Selectable.prototype.initialize.call(this,e),this.paint(),this.activate(),O&&0<h.length&&this.select(0)},R.prototype.maxItems=function(){return h.length},R.prototype.paint=function(){const e=this;this.preloader().then(function(){e.contents&&(e.contents.clear(),e.contentsBack.clear(),e.drawAllItems())}).catch(function(e){throw new Error("WD_Achievements: Error while loading pictures graphics: "+e.stack)})},R.prototype.preloader=function(){return new Promise(function(e){let t=0;function i(){var e=S(h[t],"Small").currentPicture;""!==e?ImageManager.loadPicture(e).addLoadListener(function(){n()}.bind(this)):n()}function n(){(++t<h.length?i:e)()}(d?(0===h.length&&e(),i):e)()})},R.prototype.drawItem=function(e){var t=h[e],e=this.itemRect(e),i=S(t,"Small"),n=i.currentIcon,o=i.currentPicture,a=i.currentTitle,i=i.currentDescription;let r=0;d?""!==o&&(o=new Sprite(ImageManager.loadPicture(o)),r=56,t.isDone||t.isHidden||!u||(o._colorTone=[f,f,f,p],o._updateColorFilter()),o.x=e.x+8,o.y=e.y+16,this.addInnerChild(o),g.push(o)):""!==n&&0!==n&&(this.drawIcon(n,e.x+16,e.y+24),r=48),t.isDone||this.changeTextColor("#696969"),this.drawText(a,e.x+r,e.y+8,e.width-r-8,"center"),this.drawText(i,e.x+r,e.y+40,e.width-r-8,"center"),this.resetTextColor()},R.prototype.maxCols=function(){return 2},R.prototype.itemHeight=function(){return Window_Scrollable.prototype.itemHeight.call(this)+48},R.prototype.processOk=function(){var e;this.isCurrentItemEnabled()?(e=this.index(),m=h[e],this.playOkSound(),this.updateInputData(),this.deactivate(),this.callOkHandler()):this.playBuzzerSound()},((M.prototype=Object.create(Window_Base.prototype)).constructor=M).prototype.initialize=function(e){Window_Base.prototype.initialize.call(this,e),this._handlers={},this.drawAchievementInformations()},M.prototype.drawAchievementInformations=function(){var e=S(m,"Big"),t=e.currentIcon,i=e.currentPicture,n=e.currentTitle,e=e.currentDescription,o=C();let a=0;if(d?""!==i&&((i=new Sprite(ImageManager.loadPicture(i))).x=(this.width-48)/2,i.y=24,m.isDone||m.isHidden||!u||(i._colorTone=[f,f,f,p],i._updateColorFilter()),this.addInnerChild(i),a=80):""!==t&&0!==t&&(i=(this.contentsWidth()-ImageManager.iconWidth)/2,this.drawIcon(t,i,8),a=ImageManager.iconHeight+8+8),m.isDone||this.changeTextColor("#696969"),this.drawText(n,0,a,this.contentsWidth(),"center"),this.drawText(e,0,a+64,this.contentsWidth(),"center"),0<o&&!m.isHidden){var r=m.fulfillment,l=[];for(const h in r)r[h].isActive&&l.push(h);for(let e=0;e<l.length;e++){var c,s=l[e];this.drawText(r[s].description,5,a+128+64*e,this.contentsWidth()/2-10,"center"),"gauge"!==r[s].graphType&&"combo"!==r[s].graphType||this.drawFfBar(this.contentsWidth()/2+5,a+128+64*e,this.contentsWidth()/2-10,40,r[s].startVal,r[s].targetVal),"text"!==r[s].graphType&&"combo"!==r[s].graphType||(c=r[s].startVal+"/"+r[s].targetVal,s="text"===r[s].graphType?"left":"center",this.drawText(c,this.contentsWidth()/2+5,a+128+64*e,this.contentsWidth()/2-10,s))}}this.resetTextColor()},M.prototype.drawFfBar=function(e,t,i,n,o,a){var r=this.contents.outlineColor,o=(this.contents.clearRect(e,t,i,n),this.contents.clearRect(e+1,t+1,i-2,n-2),1<o/a?1:o/a),a=i*o<2?2:i*o;this.contents.fillRect(e,t,i,n,r),this.contents.fillRect(e+1,t+1,a-2,n-2,"#1AA7EC")},M.prototype.processCancel=function(){SoundManager.playCancel(),this.callCancelHandler()},M.prototype.callCancelHandler=function(){this.callHandler("cancel")},M.prototype.callHandler=function(e){this.isHandled(e)&&this._handlers[e]()},M.prototype.setHandler=function(e,t){this._handlers[e]=t},M.prototype.update=function(){this.processHandling(),this.processTouch()},M.prototype.processHandling=function(){if(this.isCancelEnabled()&&this.isCancelTriggered())return this.processCancel()},M.prototype.isCancelEnabled=function(){return this.isHandled("cancel")},M.prototype.isCancelTriggered=function(){return Input.isRepeated("cancel")},M.prototype.isHandled=function(e){return!!this._handlers[e]},M.prototype.processTouch=function(){TouchInput.isClicked()||TouchInput.isCancelled()&&this.onTouchCancel()},M.prototype.onTouchCancel=function(){this.isCancelEnabled()&&this.processCancel()},((H.prototype=Object.create(Window_Selectable.prototype)).constructor=H).prototype.initialize=function(e){Window_Scrollable.prototype.initialize.call(this,e),this._rewards=[],this.createRewardsList(),this._index=0,this._cursorFixed=!1,this._cursorAll=!1,this._helpWindow=null,this._handlers={},this._doubleTouch=!1,this._canRepeat=!0,this.paint(),this.activate()},H.prototype.createRewardsList=function(){var e=[];for(const t of m.rewards.achiExpRew)e.push({type:"Exp",item:"None",quantity:t.unlockExp,icon:"None"});for(const i of m.rewards.achiGoldRew)e.push({type:"Gold",item:"None",quantity:i.unlockGold,icon:"None"});for(const n of m.rewards.achiItemRew)0<n.unlockItem&&e.push({type:"Item",item:n.unlockItem,quantity:n.quantity,icon:"None"});for(const o of m.rewards.achiWeaponRew)0<o.unlockWeapon&&e.push({type:"Weapon",item:o.unlockWeapon,quantity:o.quantity,icon:"None"});for(const a of m.rewards.achiArmorRew)0<a.unlockArmor&&e.push({type:"Armor",item:a.unlockArmor,quantity:a.quantity,icon:"None"});for(const r of m.rewards.achiEventRew)e.push({type:"Event",item:r.textReward,quantity:r.unlockId,icon:r.iconReward});this._rewards=e},H.prototype.maxItems=function(){return this._rewards.length},H.prototype.drawItem=function(e){var t=this._rewards[e],i=this.itemRect(e);switch(t.type){case"Exp":var n=TextManager.exp;this.drawCurrencyValue(t.quantity,n,i.x+10,i.y,i.width-20);break;case"Gold":n=TextManager.currencyUnit;this.drawCurrencyValue(t.quantity,n,i.x+10,i.y,i.width-20);break;case"Item":n=$dataItems[t.item];this.drawItemName(n,i.x+10,i.y,i.width-20);break;case"Weapon":n=$dataWeapons[t.item];this.drawItemName(n,i.x+10,i.y,i.width-20);break;case"Armor":n=$dataArmors[t.item];this.drawItemName(n,i.x+10,i.y,i.width-20);break;case"Event":this.drawEventModName(t,i.x+10,i.y,i.width-20)}},H.prototype.maxCols=function(){return N},H.prototype.drawEventModName=function(e,t,i,n){var o,a;e&&(o=i+(this.lineHeight()-ImageManager.iconHeight)/2,a=ImageManager.iconWidth+4,n=Math.max(0,n-a),this.resetTextColor(),this.drawIcon(e.icon,t,o),this.drawText(e.item,t+a,i,n))},((V.prototype=Object.create(Window_Base.prototype)).constructor=V).prototype.initialize=function(e){Window_Base.prototype.initialize.call(this,e),this.infoWrite(),this.popUp(-109)},V.prototype.infoWrite=function(){var e=S(y,"Small"),t=e.currentIcon,i=e.currentPicture,e=e.currentTitle;let n=0;d?""!==i&&((i=new Sprite(ImageManager.loadPicture(i))).x=5,i.y=36,y.isDone||y.isHidden||!u||(i._colorTone=[f,f,f,p],i._updateColorFilter()),this.addInnerChild(i),n=i.width+25):""!==t&&0!==t&&(this.drawIcon(t,10,36),n=ImageManager.iconWidth+20),this.drawText(P,0,0,this.contentsWidth(),"center"),this.drawText(e,n,36,this.contentsWidth()-n,"center")},V.prototype.popUp=function(e){const t=this;this.move(this.x,e,350,110),(0===e?q(1).then(function(){t.destroy(),v=!1}):(e++,q(.01).then(function(){t.popUp(e)}))).catch(function(){console.warn("WD_Achievements: Error in Window PopUp!")})},window.WD_Interplugin_Achievements={complete:function(e){J(e)}}}();