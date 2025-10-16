//=============================================================================
// VisuStella MZ - Animated Pictures
// VisuMZ_4_AnimatedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AnimatedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AnimatedPictures = VisuMZ.AnimatedPictures || {};
VisuMZ.AnimatedPictures.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [AnimatedPictures]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Pictures_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that gives functionality to Show Picture
 * events to display animated pictures. Animated pictures are shown in a sprite
 * sheet format. There are looping controls and speed controls that can be used
 * with these animated pictures.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to make pictures animated as long as they follow the
 *   animated cell format.
 * * Control the looping properties and speed of the animated picture through
 *   the usage of plugin commands.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures folder.
 * The filename must be named with the following format:
 *
 * filename[ANI][HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Parrot[ANI][3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated pictures.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * Animated Picture: Change Properties
 * - Changes the properties used for the animated picture.
 *
 *   Picture ID:
 *   - Select which Picture ID to affect.
 *
 *   Loop?:
 *   - Animated pictures will loop back to beginning once it reaches the
 *     last frame.
 *
 *   Wait Frames:
 *   - Number of frames to wait before moving to next picture cell.
 *
 * ---
 *
 * ============================================================================
 * Good Practices
 * ============================================================================
 *
 * Animated pictures, if used incorrectly, can bog down the game client. Here
 * are some good practices that you can follow when making animated pictures
 * to make them run more smoothly in-game.
 *
 * ---
 *
 * 1. Use animated pictures sparingly if possible. RPG Maker MZ's cache has a
 * limited size to it, which means the more animated pictures you use, the
 * faster it will fill up. And the faster it fills up, the more it needs to be
 * emptied to allow other assets in your game to load at all.
 *
 * ---
 *
 * 2. If you do use animated pictures, trim down as much empty space as
 * possible and keep picture cells to a minimum size to reduce bloating
 * the cache.
 *
 * ---
 *
 * 3. If it is practical, make your sprite sheet cells work towards a power of
 * 2 (ie: sizes of 32x32, 64x64, 128x128, 256x256, etc). Bitmaps render best
 * when it works in this cell range. This is not necessary, but it is a thing
 * to keep in mind.
 *
 * ---
 *
 * 4. Limit the amount of colors used in the animated picture to reduce the
 * filesize of the image and reduce the strain on the cache. Use more flat
 * colors instead of gradients. These work better for the engine.
 *
 * ---
 *
 * 5. When you are done using the animated picture, use the Erase Picture
 * command to clear the picture from use. This will stop the animation frame
 * calculating and reduce strain on your game.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters are the only ones available with this plugin. These
 * adjust the default settings of animated pictures. If you wish to change how
 * some animated pictures behave from others, 
 *
 * ---
 *
 * Defaults
 * 
 *   Default Loop?:
 *   - Animated pictures will loop back to beginning by default once it reaches
 *     the last frame.
 * 
 *   Default Wait Frames:
 *   - Default number of frames to wait before moving to next picture cell.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * 
 * Version 1.04: October 12, 2023
 * * Feature Update!
 * ** Added failsafes for loading extremely large images that may or may not
 *    load bitmaps properly and causing crashes. Update made by Arisu.
 * 
 * Version 1.03: August 11, 2022
 * * Feature Update!
 * ** Reduced frame count load to hide the spritesheet for event attached
 *    animated pictures. Update made by Arisu.
 * 
 * Version 1.02: April 28, 2022
 * * Compatibility Update
 * ** Added compatibility with Events & Movement Core version 1.38's new
 *    <Picture Filename: filename> related notetags.
 * 
 * Version 1.01: December 4, 2020
 * * Bug Fixes!
 * ** Plugin Command "Animated Picture: Change Properties" wait frames will no
 *    longer cap at 1 frame. Fixed by Irina and Shaz.
 *
 * Version 1.00: October 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeProperties
 * @text Animated Picture: Change Properties
 * @desc Changes the properties used for the animated picture.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Select which Picture ID to affect.
 * @default 1
 *
 * @arg Loop:eval
 * @text Loop?
 * @parent PictureID:num
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning once it reaches the last frame.
 * @default true
 *
 * @arg WaitFrames:num
 * @text Wait Frames
 * @parent PictureID:num
 * @type number
 * @min 1
 * @desc Number of frames to wait before moving to next picture cell.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AnimatedPictures
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Loop:eval
 * @text Default Loop?
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning by default once it reaches the last frame.
 * @default true
 *
 * @param WaitFrames:num
 * @text Default Wait Frames
 * @desc Default number of frames to wait before moving to next picture cell.
 * @default 4
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x26cfbc=_0x59bc;(function(_0x42bc97,_0x1f549c){const _0x55ec12=_0x59bc,_0x2947f4=_0x42bc97();while(!![]){try{const _0x51b3b2=parseInt(_0x55ec12(0xae))/0x1*(parseInt(_0x55ec12(0xc6))/0x2)+parseInt(_0x55ec12(0xc8))/0x3+-parseInt(_0x55ec12(0xb6))/0x4+-parseInt(_0x55ec12(0xe5))/0x5*(parseInt(_0x55ec12(0xee))/0x6)+-parseInt(_0x55ec12(0xcd))/0x7*(-parseInt(_0x55ec12(0xc7))/0x8)+-parseInt(_0x55ec12(0xd3))/0x9+-parseInt(_0x55ec12(0xdf))/0xa;if(_0x51b3b2===_0x1f549c)break;else _0x2947f4['push'](_0x2947f4['shift']());}catch(_0x314e02){_0x2947f4['push'](_0x2947f4['shift']());}}}(_0x50a3,0x3f53a));var label=_0x26cfbc(0xaf),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x141b4e){const _0x4c5f48=_0x26cfbc;return _0x141b4e[_0x4c5f48(0x98)]&&_0x141b4e['description']['includes']('['+label+']');})[0x0];function _0x59bc(_0x4d9b33,_0x5a1303){const _0x50a393=_0x50a3();return _0x59bc=function(_0x59bcd7,_0x418b16){_0x59bcd7=_0x59bcd7-0x88;let _0xea456a=_0x50a393[_0x59bcd7];return _0xea456a;},_0x59bc(_0x4d9b33,_0x5a1303);}function _0x50a3(){const _0x3b5716=['call','4rQAUjY','AnimatedPictures','_animationMaxCells','update','ARRAYEVAL','bitmap','_attachPictureAnimationMaxCells','PictureID','716632cXfLFo','FUNC','setFrame','addLoadListener','isAnimatedPicture','initAnimatedPicture','getAttachPictureBitmapWidth','format','ChangeProperties','WaitFrames','match','ARRAYJSON','updateAnimatedPictureCount','_attachPictureSprite','_attachPicture','exit','237128RkRTgW','360224BtHzXx','1224147hLUKyl','description','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','initialize','loadBitmap','49EdRxqX','checkEventsMoveCoreStringTags','animationWaitFrames','ARRAYSTRUCT','Settings','setAnimatedPictureWaitFrames','4483989tcKker','initAnimatedPictureSettings','STRUCT','STR','JSON','bind','EVAL','map','_pictureId','_isAttachPictureAnimatedPicture','Sprite_Character_getAttachPictureBitmapHeight','_animationCount','417770xWNAmn','Sprite_Picture_update','_attachPictureAnimationWaitFrames','_animationHorzCells','_isAnimatedPicture','floor','1094795UAmWJR','realPictureId','isAnimationLooping','ARRAYNUM','Game_Event_checkEventsMoveCoreStringTags','Loop','_animationIndex','updateAnimatedPictureFrame','getAttachPictureBitmapHeight','6SMoHNF','version','Sprite_Character_getAttachPictureBitmapWidth','max','_animatedPictureWait','registerCommand','_animationVertCells','onLoadAttachPicture','_attachPictureAnimationHorzCells','_character','updateAttachedPictureAnimatedPictureFrame','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_pictureName','visible','ARRAYSTR','_animatedPictureLoop','_attachPictureAnimationCount','updateAttachPictureBitmap','clearAttachPictureSettings','prototype','toUpperCase','status','Game_CharacterBase_clearAttachPictureSettings','isAnimatedPictureLooping','updateAnimatedAttachPictureBitmap','_attachPictureAnimationVertCells','height','attachPictureAniWaitFrames','setAnimatedPictureLooping','Sprite_Picture_initialize','aniWaitFrames','_attachPictureAnimationIndex','Sprite_Character_updateAttachPictureBitmap','attachPictureFilename','ConvertParams','getAnimatedPictureWaitFrames','Sprite_Picture_loadBitmap','Game_Screen_initialize','Sprite_Character_onLoadAttachPicture','NUM','parse','width'];_0x50a3=function(){return _0x3b5716;};return _0x50a3();}VisuMZ[label][_0x26cfbc(0xd1)]=VisuMZ[label][_0x26cfbc(0xd1)]||{},VisuMZ[_0x26cfbc(0xa5)]=function(_0x424fef,_0x136ad7){const _0x4a08f5=_0x26cfbc;for(const _0x35ac87 in _0x136ad7){if(_0x35ac87['match'](/(.*):(.*)/i)){const _0xb19f6f=String(RegExp['$1']),_0x1714dc=String(RegExp['$2'])[_0x4a08f5(0x97)]()['trim']();let _0x53f10f,_0x444929,_0x385bb9;switch(_0x1714dc){case _0x4a08f5(0xaa):_0x53f10f=_0x136ad7[_0x35ac87]!==''?Number(_0x136ad7[_0x35ac87]):0x0;break;case _0x4a08f5(0xe8):_0x444929=_0x136ad7[_0x35ac87]!==''?JSON['parse'](_0x136ad7[_0x35ac87]):[],_0x53f10f=_0x444929['map'](_0x1f590e=>Number(_0x1f590e));break;case _0x4a08f5(0xd9):_0x53f10f=_0x136ad7[_0x35ac87]!==''?eval(_0x136ad7[_0x35ac87]):null;break;case _0x4a08f5(0xb2):_0x444929=_0x136ad7[_0x35ac87]!==''?JSON[_0x4a08f5(0xab)](_0x136ad7[_0x35ac87]):[],_0x53f10f=_0x444929[_0x4a08f5(0xda)](_0x2d9dfc=>eval(_0x2d9dfc));break;case _0x4a08f5(0xd7):_0x53f10f=_0x136ad7[_0x35ac87]!==''?JSON['parse'](_0x136ad7[_0x35ac87]):'';break;case _0x4a08f5(0xc1):_0x444929=_0x136ad7[_0x35ac87]!==''?JSON[_0x4a08f5(0xab)](_0x136ad7[_0x35ac87]):[],_0x53f10f=_0x444929[_0x4a08f5(0xda)](_0x28c06a=>JSON[_0x4a08f5(0xab)](_0x28c06a));break;case _0x4a08f5(0xb7):_0x53f10f=_0x136ad7[_0x35ac87]!==''?new Function(JSON['parse'](_0x136ad7[_0x35ac87])):new Function('return\x200');break;case'ARRAYFUNC':_0x444929=_0x136ad7[_0x35ac87]!==''?JSON[_0x4a08f5(0xab)](_0x136ad7[_0x35ac87]):[],_0x53f10f=_0x444929[_0x4a08f5(0xda)](_0x35b718=>new Function(JSON[_0x4a08f5(0xab)](_0x35b718)));break;case _0x4a08f5(0xd6):_0x53f10f=_0x136ad7[_0x35ac87]!==''?String(_0x136ad7[_0x35ac87]):'';break;case _0x4a08f5(0x91):_0x444929=_0x136ad7[_0x35ac87]!==''?JSON[_0x4a08f5(0xab)](_0x136ad7[_0x35ac87]):[],_0x53f10f=_0x444929[_0x4a08f5(0xda)](_0xd95328=>String(_0xd95328));break;case _0x4a08f5(0xd5):_0x385bb9=_0x136ad7[_0x35ac87]!==''?JSON[_0x4a08f5(0xab)](_0x136ad7[_0x35ac87]):{},_0x53f10f=VisuMZ[_0x4a08f5(0xa5)]({},_0x385bb9);break;case _0x4a08f5(0xd0):_0x444929=_0x136ad7[_0x35ac87]!==''?JSON[_0x4a08f5(0xab)](_0x136ad7[_0x35ac87]):[],_0x53f10f=_0x444929[_0x4a08f5(0xda)](_0x3fb6f4=>VisuMZ[_0x4a08f5(0xa5)]({},JSON['parse'](_0x3fb6f4)));break;default:continue;}_0x424fef[_0xb19f6f]=_0x53f10f;}}return _0x424fef;},(_0x3e3dbb=>{const _0xa1fdf9=_0x26cfbc,_0x425e60=_0x3e3dbb['name'];for(const _0x2d4943 of dependencies){if(!Imported[_0x2d4943]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xa1fdf9(0xbd)](_0x425e60,_0x2d4943)),SceneManager[_0xa1fdf9(0xc5)]();break;}}const _0x1c0e2d=_0x3e3dbb[_0xa1fdf9(0xc9)];if(_0x1c0e2d[_0xa1fdf9(0xc0)](/\[Version[ ](.*?)\]/i)){const _0x3a731a=Number(RegExp['$1']);_0x3a731a!==VisuMZ[label][_0xa1fdf9(0xef)]&&(alert(_0xa1fdf9(0xca)[_0xa1fdf9(0xbd)](_0x425e60,_0x3a731a)),SceneManager[_0xa1fdf9(0xc5)]());}if(_0x1c0e2d[_0xa1fdf9(0xc0)](/\[Tier[ ](\d+)\]/i)){const _0x130c1c=Number(RegExp['$1']);_0x130c1c<tier?(alert(_0xa1fdf9(0x8e)[_0xa1fdf9(0xbd)](_0x425e60,_0x130c1c,tier)),SceneManager['exit']()):tier=Math[_0xa1fdf9(0xf1)](_0x130c1c,tier);}VisuMZ[_0xa1fdf9(0xa5)](VisuMZ[label]['Settings'],_0x3e3dbb['parameters']);})(pluginData),PluginManager[_0x26cfbc(0x88)](pluginData['name'],_0x26cfbc(0xbe),_0x36a603=>{const _0x452f86=_0x26cfbc;VisuMZ[_0x452f86(0xa5)](_0x36a603,_0x36a603);const _0x5e6bc1=_0x36a603[_0x452f86(0xb5)],_0x12989f=_0x36a603[_0x452f86(0xea)],_0x49f46e=_0x36a603[_0x452f86(0xbf)];$gameScreen[_0x452f86(0x9f)](_0x5e6bc1,_0x12989f),$gameScreen['setAnimatedPictureWaitFrames'](_0x5e6bc1,_0x49f46e);}),VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xa8)]=Game_Screen['prototype'][_0x26cfbc(0xcb)],Game_Screen['prototype'][_0x26cfbc(0xcb)]=function(){const _0x178c38=_0x26cfbc;VisuMZ[_0x178c38(0xaf)][_0x178c38(0xa8)][_0x178c38(0xad)](this),this[_0x178c38(0xd4)]();},Game_Screen[_0x26cfbc(0x96)][_0x26cfbc(0xd4)]=function(){const _0x5edb02=_0x26cfbc;this['_animatedPictureLoop']=[],this[_0x5edb02(0xf2)]=[];},Game_Screen[_0x26cfbc(0x96)][_0x26cfbc(0x9a)]=function(_0x2d48e3){const _0x1f18d1=_0x26cfbc;this[_0x1f18d1(0x92)]===undefined&&this[_0x1f18d1(0xd4)]();const _0x51d14c=this[_0x1f18d1(0xe6)](_0x2d48e3);return this['_animatedPictureLoop'][_0x51d14c]===undefined&&(this[_0x1f18d1(0x92)][_0x51d14c]=VisuMZ['AnimatedPictures'][_0x1f18d1(0xd1)][_0x1f18d1(0xea)]),this[_0x1f18d1(0x92)][_0x51d14c];},Game_Screen[_0x26cfbc(0x96)][_0x26cfbc(0x9f)]=function(_0x189ec2,_0x4cc8df){const _0x5065f4=_0x26cfbc;this['_animatedPictureLoop']===undefined&&this['initAnimatedPictureSettings']();const _0xc0083e=this['realPictureId'](_0x189ec2);this[_0x5065f4(0x92)][_0xc0083e]=_0x4cc8df;},Game_Screen[_0x26cfbc(0x96)]['getAnimatedPictureWaitFrames']=function(_0x189b1b){const _0x29119a=_0x26cfbc;this[_0x29119a(0xf2)]===undefined&&this[_0x29119a(0xd4)]();const _0x4ccb34=this[_0x29119a(0xe6)](_0x189b1b);return this['_animatedPictureWait'][_0x4ccb34]===undefined&&(this['_animatedPictureWait'][_0x4ccb34]=VisuMZ[_0x29119a(0xaf)][_0x29119a(0xd1)][_0x29119a(0xbf)]),this[_0x29119a(0xf2)][_0x4ccb34];},Game_Screen[_0x26cfbc(0x96)][_0x26cfbc(0xd2)]=function(_0x2a457c,_0x244fc0){const _0xdd2fec=_0x26cfbc;this[_0xdd2fec(0xf2)]===undefined&&this['initAnimatedPictureSettings']();const _0x3e241c=this[_0xdd2fec(0xe6)](_0x2a457c);this[_0xdd2fec(0xf2)][_0x3e241c]=_0x244fc0;},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0x99)]=Game_CharacterBase['prototype'][_0x26cfbc(0x95)],Game_CharacterBase['prototype'][_0x26cfbc(0x95)]=function(){const _0x2fd666=_0x26cfbc;VisuMZ[_0x2fd666(0xaf)]['Game_CharacterBase_clearAttachPictureSettings'][_0x2fd666(0xad)](this),this[_0x2fd666(0xc4)][_0x2fd666(0xa1)]=VisuMZ[_0x2fd666(0xaf)][_0x2fd666(0xd1)][_0x2fd666(0xbf)]||0x1;},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xe9)]=Game_Event[_0x26cfbc(0x96)][_0x26cfbc(0xce)],Game_Event[_0x26cfbc(0x96)][_0x26cfbc(0xce)]=function(_0x5dc2ff){const _0x2dd704=_0x26cfbc;VisuMZ['AnimatedPictures'][_0x2dd704(0xe9)][_0x2dd704(0xad)](this,_0x5dc2ff),_0x5dc2ff[_0x2dd704(0xc0)](/<(?:ATTACH PICTURE|PICTURE) (?:WAIT|DELAY) (?:FRAME|FRAMES):[ ](\d+)>/i)&&(this[_0x2dd704(0xc4)]['aniWaitFrames']=Math['max'](0x1,Number(RegExp['$1'])));},Game_CharacterBase[_0x26cfbc(0x96)][_0x26cfbc(0x9e)]=function(){return this['attachPictureSettings']()['aniWaitFrames']??0x1;},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xa3)]=Sprite_Character[_0x26cfbc(0x96)][_0x26cfbc(0x94)],Sprite_Character['prototype'][_0x26cfbc(0x94)]=function(){const _0x5a8a72=_0x26cfbc;VisuMZ[_0x5a8a72(0xaf)][_0x5a8a72(0xa3)][_0x5a8a72(0xad)](this),this[_0x5a8a72(0x9b)]();},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xa9)]=Sprite_Character['prototype']['onLoadAttachPicture'],Sprite_Character[_0x26cfbc(0x96)][_0x26cfbc(0x8a)]=function(_0x3a94a1){const _0x47ea32=_0x26cfbc;this[_0x47ea32(0x93)]=0x0,this[_0x47ea32(0xa2)]=0x0,VisuMZ['AnimatedPictures'][_0x47ea32(0xa9)][_0x47ea32(0xad)](this,_0x3a94a1);const _0x5cd4a9=this[_0x47ea32(0x8c)][_0x47ea32(0xa4)]();_0x5cd4a9['match'](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this[_0x47ea32(0xdc)]=!![],this['_attachPictureAnimationHorzCells']=Math['max'](0x1,parseInt(RegExp['$1'])),this[_0x47ea32(0x9c)]=Math[_0x47ea32(0xf1)](0x1,parseInt(RegExp['$2'])),this[_0x47ea32(0xb4)]=this[_0x47ea32(0x8b)]*this[_0x47ea32(0x9c)],this[_0x47ea32(0xe1)]=this['_character'][_0x47ea32(0x9e)](),this[_0x47ea32(0x8d)]()):(this[_0x47ea32(0xc3)][_0x47ea32(0x90)]=![],this[_0x47ea32(0xdc)]=![],this[_0x47ea32(0x8b)]=0x1,this[_0x47ea32(0x9c)]=0x1,this[_0x47ea32(0xb4)]=0x1,this[_0x47ea32(0xc3)][_0x47ea32(0xb8)](0x0,0x0,_0x3a94a1?_0x3a94a1[_0x47ea32(0xac)]:0x0,_0x3a94a1?_0x3a94a1['height']:0x0),this[_0x47ea32(0xc3)][_0x47ea32(0x90)]=!![]);},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xf0)]=Sprite_Character[_0x26cfbc(0x96)][_0x26cfbc(0xbc)],Sprite_Character[_0x26cfbc(0x96)]['getAttachPictureBitmapWidth']=function(){const _0x29437d=_0x26cfbc;let _0x1c5657=VisuMZ[_0x29437d(0xaf)][_0x29437d(0xf0)][_0x29437d(0xad)](this);return _0x1c5657/(this[_0x29437d(0x8b)]||0x1);},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xdd)]=Sprite_Character[_0x26cfbc(0x96)][_0x26cfbc(0xed)],Sprite_Character['prototype'][_0x26cfbc(0xed)]=function(){const _0x4902f1=_0x26cfbc;let _0x32e524=VisuMZ[_0x4902f1(0xaf)]['Sprite_Character_getAttachPictureBitmapHeight'][_0x4902f1(0xad)](this);return _0x32e524/(this[_0x4902f1(0x9c)]||0x1);},Sprite_Character[_0x26cfbc(0x96)]['updateAnimatedAttachPictureBitmap']=function(){const _0x4c68f8=_0x26cfbc;if(!this[_0x4c68f8(0xdc)])return;this['_attachPictureAnimationCount']+=0x1,this['_attachPictureAnimationCount']>=this[_0x4c68f8(0xe1)]&&(this['_attachPictureAnimationCount']=0x0,this[_0x4c68f8(0xa2)]+=0x1,this[_0x4c68f8(0xa2)]>=this['_attachPictureAnimationMaxCells']&&(this[_0x4c68f8(0xa2)]=0x0),this[_0x4c68f8(0x8d)]());},Sprite_Character[_0x26cfbc(0x96)]['updateAttachedPictureAnimatedPictureFrame']=function(){const _0x5646d8=_0x26cfbc,_0x379d19=this[_0x5646d8(0xc3)],_0x4cb88c=_0x379d19['bitmap'],_0x3e13f2=(_0x4cb88c?_0x4cb88c[_0x5646d8(0xac)]:0x0)/this[_0x5646d8(0x8b)],_0x2b5085=(_0x4cb88c?_0x4cb88c[_0x5646d8(0x9d)]:0x0)/this[_0x5646d8(0x9c)],_0x4aced9=this['_attachPictureAnimationIndex']%this[_0x5646d8(0x8b)]*_0x3e13f2,_0xddb5fa=Math[_0x5646d8(0xe4)](this['_attachPictureAnimationIndex']/this['_attachPictureAnimationHorzCells'])*_0x2b5085;_0x379d19['setFrame'](_0x4aced9,_0xddb5fa,_0x3e13f2,_0x2b5085),_0x379d19['visible']=!![];},VisuMZ[_0x26cfbc(0xaf)][_0x26cfbc(0xa0)]=Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xcb)],Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xcb)]=function(_0x2fb476){const _0x15f9bd=_0x26cfbc;this[_0x15f9bd(0xbb)](),VisuMZ[_0x15f9bd(0xaf)]['Sprite_Picture_initialize'][_0x15f9bd(0xad)](this,_0x2fb476);},Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xbb)]=function(){const _0x3dc6f7=_0x26cfbc;this['_isAnimatedPicture']=![],this['_animationHorzCells']=0x1,this[_0x3dc6f7(0x89)]=0x1,this[_0x3dc6f7(0xb0)]=0x1,this['_animationCount']=0x0,this[_0x3dc6f7(0xeb)]=0x0;},Sprite_Picture['prototype']['isAnimatedPicture']=function(){const _0x57b218=_0x26cfbc;if(this[_0x57b218(0xe3)]===undefined)this['initAnimatedPicture']();return this['_isAnimatedPicture'];},VisuMZ[_0x26cfbc(0xaf)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xcc)],Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xcc)]=function(){const _0x3a5eaa=_0x26cfbc;this['setupAnimatedPictureData'](),VisuMZ['AnimatedPictures'][_0x3a5eaa(0xa7)]['call'](this),this['isAnimatedPicture']()?this[_0x3a5eaa(0xb3)]['addLoadListener'](this[_0x3a5eaa(0xec)]['bind'](this)):this[_0x3a5eaa(0xb3)][_0x3a5eaa(0xb9)](this['resetFrame'][_0x3a5eaa(0xd8)](this));},Sprite_Picture[_0x26cfbc(0x96)]['resetFrame']=function(){const _0x1ab680=_0x26cfbc;this[_0x1ab680(0xb8)](0x0,0x0,this[_0x1ab680(0xb3)]?this[_0x1ab680(0xb3)][_0x1ab680(0xac)]:0x0,this[_0x1ab680(0xb3)]?this[_0x1ab680(0xb3)][_0x1ab680(0x9d)]:0x0);},Sprite_Picture['prototype']['setupAnimatedPictureData']=function(){const _0x73d503=_0x26cfbc;this[_0x73d503(0x8f)][_0x73d503(0xc0)](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this['_isAnimatedPicture']=!![],this[_0x73d503(0xe2)]=Math[_0x73d503(0xf1)](0x1,parseInt(RegExp['$1'])),this[_0x73d503(0x89)]=Math[_0x73d503(0xf1)](0x1,parseInt(RegExp['$2'])),this[_0x73d503(0xb0)]=this[_0x73d503(0xe2)]*this[_0x73d503(0x89)]):(this['_isAnimatedPicture']=![],this[_0x73d503(0xe2)]=0x1,this['_animationVertCells']=0x1,this[_0x73d503(0xb0)]=0x1),this['_animationCount']=0x0,this[_0x73d503(0xeb)]=0x0;},VisuMZ['AnimatedPictures'][_0x26cfbc(0xe0)]=Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xb1)],Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xb1)]=function(){const _0x2fc2af=_0x26cfbc;VisuMZ[_0x2fc2af(0xaf)]['Sprite_Picture_update']['call'](this),this[_0x2fc2af(0x90)]&&this[_0x2fc2af(0xba)]()&&this['updateAnimatedPictureCount']();},Sprite_Picture['prototype'][_0x26cfbc(0xc2)]=function(){const _0x462e41=_0x26cfbc;this['_animationCount']+=0x1,this[_0x462e41(0xde)]>=this[_0x462e41(0xcf)]()&&(this[_0x462e41(0xde)]=0x0,this['_animationIndex']+=0x1,this[_0x462e41(0xeb)]>=this[_0x462e41(0xb0)]&&(this[_0x462e41(0xe7)]()?this['_animationIndex']=0x0:this[_0x462e41(0xeb)]=this[_0x462e41(0xb0)]-0x1),this[_0x462e41(0xec)]());},Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xec)]=function(){const _0x89f28f=_0x26cfbc,_0x3e4512=(this[_0x89f28f(0xb3)]?this['bitmap'][_0x89f28f(0xac)]:0x0)/this[_0x89f28f(0xe2)],_0x4c4e8b=(this['bitmap']?this['bitmap'][_0x89f28f(0x9d)]:0x0)/this['_animationVertCells'],_0x45ca4e=this['_animationIndex']%this['_animationHorzCells']*_0x3e4512,_0x353d6d=Math[_0x89f28f(0xe4)](this[_0x89f28f(0xeb)]/this['_animationHorzCells'])*_0x4c4e8b;this['setFrame'](_0x45ca4e,_0x353d6d,_0x3e4512,_0x4c4e8b);},Sprite_Picture[_0x26cfbc(0x96)][_0x26cfbc(0xe7)]=function(){const _0x98dada=_0x26cfbc;return $gameScreen[_0x98dada(0x9a)](this[_0x98dada(0xdb)]);},Sprite_Picture['prototype'][_0x26cfbc(0xcf)]=function(){const _0x3743aa=_0x26cfbc;return $gameScreen[_0x3743aa(0xa6)](this[_0x3743aa(0xdb)]);};