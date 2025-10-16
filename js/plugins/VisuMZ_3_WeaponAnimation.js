//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.13] [WeaponAnimation]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Animation_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 * 
 * This plugin allows you to go past the standard weapon images and even using
 * custom images.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select different weapon animation from the weapon sprite sheets.
 * * Use custom images for weapon animations.
 * * Allow weapons to have their own unique weapon animation sprites.
 * * Customize hues and motions for the weapon animations.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sprite_Weapon loadBitmap function Change
 * 
 * Due to how this plugin works, loading bitmaps for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the bitmap data will be loaded differently to
 * accommodate the differences in file structure.
 *
 * ---
 * 
 * Sprite_Weapon updateFrame function Change
 * 
 * Due to how this plugin works, updating frames for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the frame data will be setup differently to
 * accommodate the differences in file structure.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Weapon Image-Related Notetags ===
 * 
 * ---
 *
 * <Weapon Image: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a numeric type.
 * - Replace 'x' with a number representing the weapon image's ID.
 * - You'll get an image from "img/system/" folder's weapon sheets.
 * - Each sheet contains 12 weapon images. If you wish to load a weapon from
 *   the first sheet, it'll be within 1-12.
 * - If you wish to load a weapon from the second sheet, it'll be within 13-24,
 *   and so on.
 * - The weapon sheets increase in increments of 12, which means that if you
 *   wish to load a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 * 
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 * ---
 *
 * <Weapon Image: filename>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a unique file.
 * - Replace 'filename' with the name of the file found in the "img/weapons/"
 *   folder (or whichever folder you've set it to in the plugin parameters).
 * - This is case sensitive.
 * - Do not include the file extension.
 * 
 *   Example:
 * 
 *   <Weapon Image: Beam Sword>
 *
 * ---
 *
 * <Weapon Motion: thrust>
 * <Weapon Motion: swing>
 * <Weapon Motion: missile>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Forces the weapon to play a specific motion when attacking.
 * - If this is not defined, the played motion will be the custom motion
 *   declared in the plugin parameters.
 * - You can also replace the motion type with the following:
 * 
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 * ---
 *
 * <Weapon Hue: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Changes the hue of the custom weapon image.
 * - Replace 'x' with a hue number between 0 and 255.
 *
 * ---
 * 
 * === State Attack Animation-Related Notetags ===
 * 
 * ---
 * 
 * <Attack Animation: x>
 * <Weapon Animation: x>
 * 
 * - Used for: State Notetags
 * - When the battler attacks while having a state with this notetag, the
 *   battler's attack animation will be changed to 'x'.
 * - This can be used for things like a "Burning Weapon" state that turns the
 *   attack animation into a flame attack instead of the normal attack.
 * - This only applies when a skill/item's animation is set to "Normal Attack".
 * - Replace 'x' with a number representing the animation's ID.
 * - If a battler is affected by multiple states with these notetags, then the
 *   state with the highest priority number will have its effect take place.
 * - There are no differences between the notetags. They both achieve the same
 *   functionality. <Weapon Animation: x> happens to be a legacy notetag
 *   carried from YEP's library.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There's a couple of plugin parameters that can be adjusted for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Image Filepath:
 *   - The filepath used for custom weapon images folder.
 *   - This defaults to "img/weapons/"
 * 
 *   Default Motion:
 *   - Default motion used for custom weapon images.
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
 * Version 1.13: April 18, 2024
 * * Feature Update!
 * ** <Weapon Image: filename> notetag will automatically register sideview
 *    weapon type without needing <Sideview Weapon: x> notetag if used by an
 *    enemy database object.
 * ** This does not enforce the motion type. You will need to do that
 *    separately.
 * 
 * Version 1.12: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where attack motions made through Action Sequences while
 *    having weapons that have a <Weapon Image: x> notetag will override the
 *    attack motion. Fix made by Olivia.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a problem that made weapons appear even when Action Sequences would
 *    tell it to hide the weapon otherwise. Fix made by Irina.
 * 
 * Version 1.10: July 21, 2022
 * * Feature Update!
 * ** For those who did not set up their weapon attack motions, this plugin
 *    will now default the weapon attack type to "Thrust" and weapon attack
 *    image to "Dagger". Update made by Irina.
 * 
 * Version 1.09: April 7, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New state-only notetags added by Arisu:
 * *** <Attack Animation: x>
 * *** <Weapon Animation: x>
 * **** Both notetags do the same thing, just that one is a legacy notetag from
 *      the past YEP library.
 * **** When the battler attacks while having a state with this notetag, the
 *      battler's attack animation will be changed to 'x'.
 * **** This can be used for things like a "Burning Weapon" state that turns
 *      the attack animation into a flame attack instead of the normal attack.
 * **** This only applies when a skill/item's animation is set to
 *      "Normal Attack".
 * 
 * Version 1.08: February 17, 2022
 * * Bug Fixes!
 * ** Added a fail safe to prevent freeze motion frames on items trying to use
 *    custom weapon sprites, but do not actually have them in the game project.
 *    Fix made by Olivia.
 * 
 * Version 1.07: January 27, 2022
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will default to the enforced
 *    weapon graphic if there is no custom weapon sprite on the weapon, but on
 *    a piece of armor instead. Update made by Olivia.
 * 
 * Version 1.06: June 11, 2021
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will no longer cause crashes if
 *    the user does not have a weapon equipped. Fix made by Olivia.
 * 
 * Version 1.05: April 9, 2021
 * * Bug Fixes!
 * ** Freeze Motions should now hide weapons instead of always displaying them
 *    when the hide option is enabled. Fix made by Olivia.
 * 
 * Version 1.04: February 12, 2021
 * * Bug Fixes!
 * ** Freeze frame now supports enemy custom weapon images. Fix made by Irina.
 * 
 * Version 1.03: January 29, 2021
 * * Bug Fixes!
 * ** Basic weapon animations should now show the proper weapon image.
 *    Fix made by Olivia.
 * ** Freeze frame now supports custom non-attack animations. Fix by Olivia.
 * 
 * Version 1.02: January 22, 2021
 * * Compatibility Update
 * ** Plugin is now compatible with Battle Core's Freeze Motion.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** If battlers with custom weapon animations perform an Action Sequence with
 *    "Show Weapon" set to false, they will no longer force the attack motion.
 *    Fix made by Yanfly.
 *
 * Version 1.00: November 25, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WeaponAnimation
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param filepath:str
 * @text Image Filepath
 * @desc The filepath used for custom weapon images folder.
 * @default img/weapons/
 *
 * @param motion:str
 * @text Default Motion
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Default motion used for custom weapon images.
 * @default swing
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

const _0x41bf80=_0x5d73;(function(_0x45f2ec,_0x3880c2){const _0x79e204=_0x5d73,_0xdb5a50=_0x45f2ec();while(!![]){try{const _0x359533=parseInt(_0x79e204(0x22c))/0x1*(parseInt(_0x79e204(0x23a))/0x2)+parseInt(_0x79e204(0x205))/0x3*(parseInt(_0x79e204(0x274))/0x4)+parseInt(_0x79e204(0x204))/0x5*(-parseInt(_0x79e204(0x21d))/0x6)+parseInt(_0x79e204(0x1e9))/0x7*(-parseInt(_0x79e204(0x210))/0x8)+parseInt(_0x79e204(0x1f9))/0x9+parseInt(_0x79e204(0x234))/0xa+-parseInt(_0x79e204(0x1f1))/0xb;if(_0x359533===_0x3880c2)break;else _0xdb5a50['push'](_0xdb5a50['shift']());}catch(_0x3728e0){_0xdb5a50['push'](_0xdb5a50['shift']());}}}(_0x27c1,0x33bff));var label=_0x41bf80(0x1e7),tier=tier||0x0,dependencies=[_0x41bf80(0x1eb)],pluginData=$plugins['filter'](function(_0x44c8aa){const _0x4d3c75=_0x41bf80;return _0x44c8aa[_0x4d3c75(0x236)]&&_0x44c8aa[_0x4d3c75(0x207)][_0x4d3c75(0x235)]('['+label+']');})[0x0];VisuMZ[label][_0x41bf80(0x201)]=VisuMZ[label][_0x41bf80(0x201)]||{},VisuMZ['ConvertParams']=function(_0x45eecd,_0x2de06e){const _0x3c3a1a=_0x41bf80;for(const _0x58d16e in _0x2de06e){if('fCFMe'!==_0x3c3a1a(0x1e2))this[_0x3c3a1a(0x21e)]['preloadCustomWeaponImage']();else{if(_0x58d16e[_0x3c3a1a(0x26a)](/(.*):(.*)/i)){const _0x433f46=String(RegExp['$1']),_0x37d6cd=String(RegExp['$2'])[_0x3c3a1a(0x244)]()['trim']();let _0x1df496,_0x4f3374,_0x45171e;switch(_0x37d6cd){case _0x3c3a1a(0x254):_0x1df496=_0x2de06e[_0x58d16e]!==''?Number(_0x2de06e[_0x58d16e]):0x0;break;case _0x3c3a1a(0x227):_0x4f3374=_0x2de06e[_0x58d16e]!==''?JSON[_0x3c3a1a(0x238)](_0x2de06e[_0x58d16e]):[],_0x1df496=_0x4f3374[_0x3c3a1a(0x221)](_0x6ebbe8=>Number(_0x6ebbe8));break;case _0x3c3a1a(0x226):_0x1df496=_0x2de06e[_0x58d16e]!==''?eval(_0x2de06e[_0x58d16e]):null;break;case _0x3c3a1a(0x20b):_0x4f3374=_0x2de06e[_0x58d16e]!==''?JSON[_0x3c3a1a(0x238)](_0x2de06e[_0x58d16e]):[],_0x1df496=_0x4f3374[_0x3c3a1a(0x221)](_0x1af7a1=>eval(_0x1af7a1));break;case _0x3c3a1a(0x26f):_0x1df496=_0x2de06e[_0x58d16e]!==''?JSON[_0x3c3a1a(0x238)](_0x2de06e[_0x58d16e]):'';break;case _0x3c3a1a(0x24f):_0x4f3374=_0x2de06e[_0x58d16e]!==''?JSON[_0x3c3a1a(0x238)](_0x2de06e[_0x58d16e]):[],_0x1df496=_0x4f3374['map'](_0x33838d=>JSON[_0x3c3a1a(0x238)](_0x33838d));break;case _0x3c3a1a(0x1f8):_0x1df496=_0x2de06e[_0x58d16e]!==''?new Function(JSON[_0x3c3a1a(0x238)](_0x2de06e[_0x58d16e])):new Function(_0x3c3a1a(0x215));break;case'ARRAYFUNC':_0x4f3374=_0x2de06e[_0x58d16e]!==''?JSON[_0x3c3a1a(0x238)](_0x2de06e[_0x58d16e]):[],_0x1df496=_0x4f3374[_0x3c3a1a(0x221)](_0x4fa9fd=>new Function(JSON[_0x3c3a1a(0x238)](_0x4fa9fd)));break;case'STR':_0x1df496=_0x2de06e[_0x58d16e]!==''?String(_0x2de06e[_0x58d16e]):'';break;case _0x3c3a1a(0x1e5):_0x4f3374=_0x2de06e[_0x58d16e]!==''?JSON['parse'](_0x2de06e[_0x58d16e]):[],_0x1df496=_0x4f3374[_0x3c3a1a(0x221)](_0x4e3099=>String(_0x4e3099));break;case _0x3c3a1a(0x1f3):_0x45171e=_0x2de06e[_0x58d16e]!==''?JSON['parse'](_0x2de06e[_0x58d16e]):{},_0x1df496=VisuMZ[_0x3c3a1a(0x206)]({},_0x45171e);break;case _0x3c3a1a(0x250):_0x4f3374=_0x2de06e[_0x58d16e]!==''?JSON['parse'](_0x2de06e[_0x58d16e]):[],_0x1df496=_0x4f3374['map'](_0x37b742=>VisuMZ['ConvertParams']({},JSON[_0x3c3a1a(0x238)](_0x37b742)));break;default:continue;}_0x45eecd[_0x433f46]=_0x1df496;}}}return _0x45eecd;},(_0x2a6fb3=>{const _0x408f84=_0x41bf80,_0x1c260c=_0x2a6fb3[_0x408f84(0x208)];for(const _0xc54eba of dependencies){if(_0x408f84(0x211)!==_0x408f84(0x1e4)){if(!Imported[_0xc54eba]){if(_0x408f84(0x1fc)===_0x408f84(0x265))_0x4ca9f4(_0x408f84(0x1fe)[_0x408f84(0x26c)](_0x30b28f,_0x398ea2)),_0x182c93[_0x408f84(0x229)]();else{alert(_0x408f84(0x218)[_0x408f84(0x26c)](_0x1c260c,_0xc54eba)),SceneManager[_0x408f84(0x229)]();break;}}}else this['updateFrameCustomWeaponGraphic']();}const _0x41c613=_0x2a6fb3[_0x408f84(0x207)];if(_0x41c613['match'](/\[Version[ ](.*?)\]/i)){const _0x1e2e44=Number(RegExp['$1']);_0x1e2e44!==VisuMZ[label][_0x408f84(0x1fa)]&&(alert(_0x408f84(0x1fe)['format'](_0x1c260c,_0x1e2e44)),SceneManager[_0x408f84(0x229)]());}if(_0x41c613['match'](/\[Tier[ ](\d+)\]/i)){if(_0x408f84(0x1e1)==='Ziqpa'){const _0x561ece=Number(RegExp['$1']);if(_0x561ece<tier)alert(_0x408f84(0x232)[_0x408f84(0x26c)](_0x1c260c,_0x561ece,tier)),SceneManager[_0x408f84(0x229)]();else{if(_0x408f84(0x258)!=='HQnAs')return _0xf611f5[_0x408f84(0x1e7)][_0x408f84(0x25a)][_0x408f84(0x268)](this);else tier=Math['max'](_0x561ece,tier);}}else return _0x22a0b9['WeaponAnimation'][_0x408f84(0x228)]['call'](this);}VisuMZ[_0x408f84(0x206)](VisuMZ[label][_0x408f84(0x201)],_0x2a6fb3[_0x408f84(0x1ff)]);})(pluginData),VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x200)]={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i,'AttackAni':/<(?:WEAPON|ATTACK) ANIMATION:[ ](\d+)>/i},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x269)]=Scene_Boot[_0x41bf80(0x21a)][_0x41bf80(0x212)],Scene_Boot[_0x41bf80(0x21a)]['process_VisuMZ_BattleCore_Failsafes']=function(){const _0x491536=_0x41bf80,_0x4af733=$dataSystem[_0x491536(0x20d)][_0x491536(0x219)];for(let _0x354698=0x0;_0x354698<_0x4af733;_0x354698++){const _0x202421=$dataSystem['attackMotions'][_0x354698];if(_0x202421)continue;$dataSystem[_0x491536(0x22e)][_0x354698]={'type':0x1,'weaponImageId':0x1};}VisuMZ[_0x491536(0x1e7)][_0x491536(0x269)][_0x491536(0x268)](this);if(VisuMZ[_0x491536(0x261)][_0x491536(0x1fa)]<1.79){if(_0x491536(0x214)!==_0x491536(0x214))return this[_0x491536(0x213)]()||_0x15d33e[_0x491536(0x1e7)]['Game_Actor_attackAnimationId1']['call'](this);else{let _0x16492b='';_0x16492b+=_0x491536(0x23d),_0x16492b+=_0x491536(0x251),alert(_0x16492b),SceneManager[_0x491536(0x229)]();}}},ImageManager[_0x41bf80(0x22a)]=function(_0x4e7e69){const _0x3fbe89=_0x41bf80,_0x241e38=VisuMZ[_0x3fbe89(0x1e7)]['Settings'][_0x3fbe89(0x24e)];return this[_0x3fbe89(0x223)](_0x241e38,_0x4e7e69);},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x267)]=BattleManager[_0x41bf80(0x216)],BattleManager[_0x41bf80(0x216)]=function(){const _0x383474=_0x41bf80;VisuMZ['WeaponAnimation'][_0x383474(0x267)][_0x383474(0x268)](this),this['_subject']&&this['_subject'][_0x383474(0x259)]();},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x231)]=Game_BattlerBase[_0x41bf80(0x21a)][_0x41bf80(0x1fd)],Game_BattlerBase[_0x41bf80(0x21a)][_0x41bf80(0x1fd)]=function(){const _0x574d54=_0x41bf80;this[_0x574d54(0x252)]={},VisuMZ['WeaponAnimation']['Game_BattlerBase_initMembers'][_0x574d54(0x268)](this);},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x202)]=Game_BattlerBase['prototype'][_0x41bf80(0x270)],Game_BattlerBase['prototype'][_0x41bf80(0x270)]=function(){const _0x5b90b5=_0x41bf80;this['_cache']={},VisuMZ[_0x5b90b5(0x1e7)][_0x5b90b5(0x202)][_0x5b90b5(0x268)](this);},Game_BattlerBase['prototype'][_0x41bf80(0x26b)]=function(_0x40b568){const _0x41c859=_0x41bf80;return this[_0x41c859(0x252)]=this[_0x41c859(0x252)]||{},this['_cache'][_0x40b568]!==undefined;},Game_BattlerBase[_0x41bf80(0x21a)][_0x41bf80(0x256)]=function(){const _0x5801eb=_0x41bf80;let _0x5c0049='customWeaponGraphic';if(this['checkCacheKey'](_0x5c0049))return this[_0x5801eb(0x252)][_0x5c0049];return this['_cache'][_0x5c0049]=this[_0x5801eb(0x1f6)](),this['_cache'][_0x5c0049];},Game_BattlerBase['prototype'][_0x41bf80(0x1f6)]=function(){const _0x246724=_0x41bf80;for(const _0x4d61d5 of this['traitObjects']()){if(!_0x4d61d5)continue;const _0xd60d75=this[_0x246724(0x1f0)](_0x4d61d5);if(_0xd60d75[_0x246724(0x208)]!==0x0){if(this['isEnemy']()&&$dataEnemies['includes'](_0x4d61d5)){const _0xd2f7fe=this[_0x246724(0x246)]();_0xd2f7fe[_0x246724(0x22b)]=_0xd2f7fe['wtypeId']||0x1;}return{'name':_0xd60d75[_0x246724(0x208)],'hue':_0xd60d75[_0x246724(0x263)],'motion':_0xd60d75[_0x246724(0x23b)]};}}return 0x0;},Game_BattlerBase[_0x41bf80(0x21a)][_0x41bf80(0x1f0)]=function(_0x2b78d1){const _0x5dddb8=_0x41bf80,_0x36ff83=VisuMZ['WeaponAnimation'][_0x5dddb8(0x200)];let _0x3c1d60=0x0,_0x31b9be=0x0,_0x136650=VisuMZ[_0x5dddb8(0x1e7)][_0x5dddb8(0x201)][_0x5dddb8(0x23b)];const _0x2290b5=_0x2b78d1?_0x2b78d1[_0x5dddb8(0x245)]:'';if(_0x2290b5[_0x5dddb8(0x26a)](_0x36ff83[_0x5dddb8(0x1e0)]))_0x5dddb8(0x26d)===_0x5dddb8(0x26d)?_0x3c1d60=Number(RegExp['$1'])||0x1:(this[_0x5dddb8(0x1f5)]=![],_0x407020[_0x5dddb8(0x1e7)][_0x5dddb8(0x25f)][_0x5dddb8(0x268)](this),this[_0x5dddb8(0x1f4)](0x0));else _0x2290b5[_0x5dddb8(0x26a)](_0x36ff83['ImageStr'])&&(_0x3c1d60=String(RegExp['$1']));if(_0x2290b5[_0x5dddb8(0x26a)](_0x36ff83['Hue'])){if(_0x5dddb8(0x242)===_0x5dddb8(0x25d))return this['hasStateAttackAnimation']()&&!!this[_0x5dddb8(0x240)]()[0x1]?this[_0x5dddb8(0x213)]()||_0x198788[_0x5dddb8(0x1e7)][_0x5dddb8(0x25a)][_0x5dddb8(0x268)](this):_0xf6cf41[_0x5dddb8(0x1e7)]['Game_Actor_attackAnimationId2'][_0x5dddb8(0x268)](this);else _0x31b9be=Number(RegExp['$1'])['clamp'](0x0,0xff);}return _0x2290b5[_0x5dddb8(0x26a)](_0x36ff83[_0x5dddb8(0x266)])&&(_0x136650=String(RegExp['$1'])[_0x5dddb8(0x21f)]()[_0x5dddb8(0x260)]()),{'name':_0x3c1d60,'hue':_0x31b9be,'motion':_0x136650};},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x24d)]=Game_Battler['prototype'][_0x41bf80(0x247)],Game_Battler[_0x41bf80(0x21a)][_0x41bf80(0x247)]=function(_0x10f684){const _0x5621b6=_0x41bf80;if(this[_0x5621b6(0x22f)])return;let _0x32295c=![];if(this[_0x5621b6(0x256)]()&&_0x10f684>0x0){if('EfvKV'!=='yBscn')_0x10f684=this['customWeaponGraphic'](),_0x32295c=!![];else{this[_0x5621b6(0x1f5)]=!![];const _0x4dd2dd=this[_0x5621b6(0x255)][_0x5621b6(0x208)]?this[_0x5621b6(0x255)][_0x5621b6(0x208)]:this[_0x5621b6(0x255)];this[_0x5621b6(0x20c)]=_0x1e3b70['loadWeapon'](_0x4dd2dd||'');}}VisuMZ[_0x5621b6(0x1e7)][_0x5621b6(0x24d)][_0x5621b6(0x268)](this,_0x10f684);if(!_0x32295c)return;if(_0x10f684===0x0)return;this[_0x5621b6(0x22f)]=!![],this[_0x5621b6(0x249)](_0x10f684['motion']||'swing'),this[_0x5621b6(0x22f)]=![];},VisuMZ[_0x41bf80(0x1e7)]['Game_Actor_performWeaponAnimation']=Game_Actor[_0x41bf80(0x21a)][_0x41bf80(0x1fb)],Game_Actor[_0x41bf80(0x21a)][_0x41bf80(0x1fb)]=function(){const _0x20d939=_0x41bf80;if(this[_0x20d939(0x275)]===![])return;VisuMZ[_0x20d939(0x1e7)][_0x20d939(0x21b)][_0x20d939(0x268)](this);},Game_Battler['prototype']['preloadCustomWeaponImage']=function(){const _0x132fd3=_0x41bf80;if(!this['customWeaponGraphic']())return;const _0x529fb3=this[_0x132fd3(0x256)]();if(typeof _0x529fb3[_0x132fd3(0x208)]===_0x132fd3(0x225)){if(_0x132fd3(0x25c)===_0x132fd3(0x224))return this[_0x132fd3(0x213)]()||_0x1d5850[_0x132fd3(0x1e7)][_0x132fd3(0x20e)][_0x132fd3(0x268)](this);else{const _0x95a9ec=Math[_0x132fd3(0x24a)]((_0x529fb3['name']-0x1)/0xc)+0x1;ImageManager['loadSystem'](_0x132fd3(0x24c)+_0x95a9ec);}}else{if(_0x132fd3(0x1e8)!==_0x132fd3(0x237))ImageManager[_0x132fd3(0x22a)](_0x529fb3[_0x132fd3(0x208)]);else return typeof this[_0x132fd3(0x255)]!==_0x132fd3(0x225);}},VisuMZ['WeaponAnimation'][_0x41bf80(0x23e)]=Game_Battler[_0x41bf80(0x21a)][_0x41bf80(0x1ec)],Game_Battler[_0x41bf80(0x21a)]['freezeMotion']=function(_0x4067f5,_0x54c74a,_0x473f5d){const _0x206f97=_0x41bf80;VisuMZ['WeaponAnimation']['Game_Battler_freezeMotion'][_0x206f97(0x268)](this,_0x4067f5,_0x54c74a,_0x473f5d);if(!_0x54c74a){if(_0x206f97(0x21c)!==_0x206f97(0x20a))return;else return this['getStateAttackAnimation']()||_0x29a570[_0x206f97(0x1e7)]['Game_Enemy_attackAnimationId2'][_0x206f97(0x268)](this);}let _0x25e90f=0x0;_0x4067f5[_0x206f97(0x26a)](/ATTACK[ ](\d+)/i)&&(_0x25e90f=Number(RegExp['$1']),_0x25e90f--);if(this['isActor']()){if(_0x206f97(0x1f7)!==_0x206f97(0x1f7))_0x6c56ba=_0x4c2c58['max'](_0x35746d,_0x47ac01);else{const _0x4fe611=this[_0x206f97(0x240)](),_0x7e77fe=_0x4fe611[_0x25e90f]||null,_0x53ba62=this[_0x206f97(0x1f0)](_0x7e77fe);if(_0x53ba62['name']!==0x0){if('uiifL'!==_0x206f97(0x241)){if(!this[_0x206f97(0x255)])return;if(typeof this[_0x206f97(0x255)][_0x206f97(0x208)]===_0x206f97(0x225)){const _0x4504a5=(this['_weaponImageId'][_0x206f97(0x208)]-0x1)%0xc,_0x469742=0x60,_0x256d44=0x40,_0x1e4bad=(_0x2d8aa8[_0x206f97(0x24a)](_0x4504a5/0x6)*0x3+this[_0x206f97(0x1ef)])*_0x469742,_0x2c2681=_0x6b520a[_0x206f97(0x24a)](_0x4504a5%0x6)*_0x256d44;this[_0x206f97(0x230)](_0x1e4bad,_0x2c2681,_0x469742,_0x256d44);}else{const _0x5a3754=_0x165fd4['floor'](this[_0x206f97(0x20c)][_0x206f97(0x1e3)]/0x3),_0x1a03f4=this[_0x206f97(0x20c)]['height'],_0x20b404=this[_0x206f97(0x1ef)]*_0x5a3754,_0xdedbff=0x0;this['setFrame'](_0x20b404,_0xdedbff,_0x5a3754,_0x1a03f4);}}else _0x4067f5[_0x206f97(0x26a)](/ATTACK/i)&&(this[_0x206f97(0x243)][_0x206f97(0x233)]=_0x53ba62[_0x206f97(0x23b)]),this[_0x206f97(0x243)][_0x206f97(0x222)]=_0x53ba62[_0x206f97(0x208)];}else{if(_0x206f97(0x257)!==_0x206f97(0x257)){const _0xcacb72=(this[_0x206f97(0x255)][_0x206f97(0x208)]-0x1)%0xc,_0x1b0da6=0x60,_0x1cbfae=0x40,_0x3510b5=(_0xab793[_0x206f97(0x24a)](_0xcacb72/0x6)*0x3+this[_0x206f97(0x1ef)])*_0x1b0da6,_0x53570b=_0x260e8e['floor'](_0xcacb72%0x6)*_0x1cbfae;this[_0x206f97(0x230)](_0x3510b5,_0x53570b,_0x1b0da6,_0x1cbfae);}else{const _0x3fae01=this[_0x206f97(0x256)]();_0x3fae01['name']!==0x0&&(_0x4067f5[_0x206f97(0x26a)](/ATTACK/i)&&(this[_0x206f97(0x243)][_0x206f97(0x233)]=_0x3fae01['motion']),this[_0x206f97(0x243)][_0x206f97(0x222)]=_0x3fae01['name']);}}}}else{if(this[_0x206f97(0x220)]()){const _0x52ac2f=this[_0x206f97(0x1f0)](this[_0x206f97(0x271)]());_0x52ac2f[_0x206f97(0x208)]!==0x0&&(_0x206f97(0x22d)!==_0x206f97(0x22d)?(_0x2b386b(_0x206f97(0x232)[_0x206f97(0x26c)](_0x2ac87b,_0x266ca6,_0x1bd819)),_0x3c0f4e['exit']()):(_0x4067f5[_0x206f97(0x26a)](/ATTACK/i)&&(this[_0x206f97(0x243)][_0x206f97(0x233)]=_0x52ac2f[_0x206f97(0x23b)]),this[_0x206f97(0x243)][_0x206f97(0x222)]=_0x52ac2f[_0x206f97(0x208)]));}}},Game_Battler[_0x41bf80(0x21a)][_0x41bf80(0x213)]=function(){const _0x1a8c3d=_0x41bf80,_0x2efcbd=VisuMZ['WeaponAnimation']['RegExp'],_0x12d4f7=_0x2efcbd[_0x1a8c3d(0x1ea)];for(const _0x1a1772 of this['states']()){if(_0x1a8c3d(0x203)===_0x1a8c3d(0x203)){if(!_0x1a1772)continue;if(_0x1a1772[_0x1a8c3d(0x245)]['match'](_0x12d4f7)){if(_0x1a8c3d(0x277)!==_0x1a8c3d(0x239)){const _0x3b0aa9=Number(RegExp['$1'])||0x0;if(_0x3b0aa9>0x0)return _0x3b0aa9;}else _0x3b0a30=this['customWeaponGraphic'](),_0xf8be08=!![];}}else{const _0x21d13f=_0xf4b4d1[_0x1a8c3d(0x24a)](this[_0x1a8c3d(0x20c)]['width']/0x3),_0x130c54=this[_0x1a8c3d(0x20c)][_0x1a8c3d(0x1ed)],_0x4eab6d=this[_0x1a8c3d(0x1ef)]*_0x21d13f,_0x2731ea=0x0;this[_0x1a8c3d(0x230)](_0x4eab6d,_0x2731ea,_0x21d13f,_0x130c54);}}return 0x0;},Game_Battler[_0x41bf80(0x21a)][_0x41bf80(0x24b)]=function(){const _0x1981c3=_0x41bf80,_0x5db86f=VisuMZ[_0x1981c3(0x1e7)]['RegExp'],_0x3f7874=_0x5db86f['AttackAni'];return this['states']()['some'](_0x3a5754=>_0x3a5754&&_0x3a5754[_0x1981c3(0x245)][_0x1981c3(0x26a)](_0x3f7874));},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x20f)]=Game_Actor[_0x41bf80(0x21a)][_0x41bf80(0x25b)],Game_Actor[_0x41bf80(0x21a)]['attackAnimationId1']=function(){const _0x1fe4ca=_0x41bf80;return this[_0x1fe4ca(0x24b)]()?this['getStateAttackAnimation']()||VisuMZ[_0x1fe4ca(0x1e7)]['Game_Actor_attackAnimationId1']['call'](this):VisuMZ[_0x1fe4ca(0x1e7)][_0x1fe4ca(0x20f)]['call'](this);},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x25a)]=Game_Actor[_0x41bf80(0x21a)][_0x41bf80(0x25e)],Game_Actor[_0x41bf80(0x21a)][_0x41bf80(0x25e)]=function(){const _0x303a36=_0x41bf80;return this[_0x303a36(0x24b)]()&&!!this[_0x303a36(0x240)]()[0x1]?this[_0x303a36(0x213)]()||VisuMZ[_0x303a36(0x1e7)][_0x303a36(0x25a)]['call'](this):VisuMZ['WeaponAnimation']['Game_Actor_attackAnimationId2'][_0x303a36(0x268)](this);},VisuMZ['WeaponAnimation']['Game_Enemy_attackAnimationId1']=Game_Enemy[_0x41bf80(0x21a)][_0x41bf80(0x25b)],Game_Enemy[_0x41bf80(0x21a)][_0x41bf80(0x25b)]=function(){const _0x4da6cb=_0x41bf80;if(this[_0x4da6cb(0x24b)]()){if('TiCBb'!==_0x4da6cb(0x217))_0xbb4b3[_0x4da6cb(0x1e7)][_0x4da6cb(0x267)][_0x4da6cb(0x268)](this),this[_0x4da6cb(0x21e)]&&this[_0x4da6cb(0x21e)][_0x4da6cb(0x259)]();else return this['getStateAttackAnimation']()||VisuMZ[_0x4da6cb(0x1e7)][_0x4da6cb(0x20e)][_0x4da6cb(0x268)](this);}else return VisuMZ[_0x4da6cb(0x1e7)]['Game_Enemy_attackAnimationId1'][_0x4da6cb(0x268)](this);},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x228)]=Game_Enemy[_0x41bf80(0x21a)][_0x41bf80(0x25e)],Game_Enemy[_0x41bf80(0x21a)][_0x41bf80(0x25e)]=function(){const _0x52b5dd=_0x41bf80;if(this['hasStateAttackAnimation']())return this[_0x52b5dd(0x213)]()||VisuMZ[_0x52b5dd(0x1e7)][_0x52b5dd(0x228)][_0x52b5dd(0x268)](this);else{if(_0x52b5dd(0x26e)!==_0x52b5dd(0x26e))return;else return VisuMZ[_0x52b5dd(0x1e7)][_0x52b5dd(0x228)][_0x52b5dd(0x268)](this);}},Sprite_Weapon[_0x41bf80(0x21a)][_0x41bf80(0x23c)]=function(){const _0x21d967=_0x41bf80;return typeof this[_0x21d967(0x255)]!==_0x21d967(0x225);},VisuMZ[_0x41bf80(0x1e7)][_0x41bf80(0x25f)]=Sprite_Weapon[_0x41bf80(0x21a)][_0x41bf80(0x223)],Sprite_Weapon['prototype']['loadBitmap']=function(){const _0x201559=_0x41bf80;if(this[_0x201559(0x23c)]()){if(_0x201559(0x262)===_0x201559(0x1e6)){const _0x199b0b=this[_0x201559(0x256)]();_0x199b0b[_0x201559(0x208)]!==0x0&&(_0x1f99a2['match'](/ATTACK/i)&&(this[_0x201559(0x243)][_0x201559(0x233)]=_0x199b0b[_0x201559(0x23b)]),this[_0x201559(0x243)][_0x201559(0x222)]=_0x199b0b['name']);}else this[_0x201559(0x273)]();}else this[_0x201559(0x1f5)]=![],VisuMZ[_0x201559(0x1e7)]['Sprite_Weapon_loadBitmap']['call'](this),this[_0x201559(0x1f4)](0x0);},Sprite_Weapon[_0x41bf80(0x21a)][_0x41bf80(0x273)]=function(){const _0x3227da=_0x41bf80;if(!this[_0x3227da(0x255)])return;if(typeof this[_0x3227da(0x255)]['name']==='number'){if(_0x3227da(0x253)!==_0x3227da(0x253))_0x58f77f[_0x3227da(0x26a)](/ATTACK/i)&&(this[_0x3227da(0x243)][_0x3227da(0x233)]=_0x1a641b[_0x3227da(0x23b)]),this['_freezeMotionData'][_0x3227da(0x222)]=_0x99ef47[_0x3227da(0x208)];else{const _0x297287=Math[_0x3227da(0x24a)]((this['_weaponImageId'][_0x3227da(0x208)]-0x1)/0xc)+0x1;_0x297287>=0x1?_0x3227da(0x276)!==_0x3227da(0x1f2)?this[_0x3227da(0x20c)]=ImageManager[_0x3227da(0x209)]('Weapons'+_0x297287):_0x4fdb7e=_0x1058e5(_0x38b0f5['$1'])||0x1:_0x3227da(0x1ee)!==_0x3227da(0x1ee)?this['loadBitmapCustomWeapon']():this['bitmap']=ImageManager[_0x3227da(0x209)]('');}}else{this[_0x3227da(0x1f5)]=!![];const _0x2d6dc5=this[_0x3227da(0x255)]['name']?this[_0x3227da(0x255)][_0x3227da(0x208)]:this[_0x3227da(0x255)];this['bitmap']=ImageManager['loadWeapon'](_0x2d6dc5||'');}this['setHue'](this[_0x3227da(0x255)]['hue']||0x0);},VisuMZ['WeaponAnimation'][_0x41bf80(0x248)]=Sprite_Weapon[_0x41bf80(0x21a)][_0x41bf80(0x264)],Sprite_Weapon[_0x41bf80(0x21a)][_0x41bf80(0x264)]=function(){const _0x312883=_0x41bf80;if(this[_0x312883(0x23c)]()){if('MCzHI'===_0x312883(0x272))this[_0x312883(0x23f)]();else return this[_0x312883(0x24b)]()?this['getStateAttackAnimation']()||_0x2cbeb4['WeaponAnimation']['Game_Enemy_attackAnimationId1'][_0x312883(0x268)](this):_0x34fc81[_0x312883(0x1e7)]['Game_Enemy_attackAnimationId1'][_0x312883(0x268)](this);}else VisuMZ[_0x312883(0x1e7)][_0x312883(0x248)][_0x312883(0x268)](this);},Sprite_Weapon[_0x41bf80(0x21a)]['updateFrameCustomWeaponGraphic']=function(){const _0x1208a2=_0x41bf80;if(!this[_0x1208a2(0x255)])return;if(typeof this[_0x1208a2(0x255)][_0x1208a2(0x208)]===_0x1208a2(0x225)){const _0x59c516=(this[_0x1208a2(0x255)][_0x1208a2(0x208)]-0x1)%0xc,_0x26060d=0x60,_0xef0295=0x40,_0x113922=(Math[_0x1208a2(0x24a)](_0x59c516/0x6)*0x3+this[_0x1208a2(0x1ef)])*_0x26060d,_0x5e628f=Math['floor'](_0x59c516%0x6)*_0xef0295;this['setFrame'](_0x113922,_0x5e628f,_0x26060d,_0xef0295);}else{const _0xcb0000=Math['floor'](this[_0x1208a2(0x20c)][_0x1208a2(0x1e3)]/0x3),_0x5ac9fb=this[_0x1208a2(0x20c)][_0x1208a2(0x1ed)],_0x636512=this[_0x1208a2(0x1ef)]*_0xcb0000,_0x5ca684=0x0;this[_0x1208a2(0x230)](_0x636512,_0x5ca684,_0xcb0000,_0x5ac9fb);}};function _0x5d73(_0x30c329,_0x6db8f6){const _0x27c1b4=_0x27c1();return _0x5d73=function(_0x5d73f4,_0x41b0af){_0x5d73f4=_0x5d73f4-0x1e0;let _0x361cd3=_0x27c1b4[_0x5d73f4];return _0x361cd3;},_0x5d73(_0x30c329,_0x6db8f6);}function _0x27c1(){const _0x3f234b=['_showWeapon','zWaof','VENhW','ImageNum','Ziqpa','fCFMe','width','bOlkq','ARRAYSTR','mjGus','WeaponAnimation','MSSYP','14VupxtQ','AttackAni','VisuMZ_1_BattleCore','freezeMotion','height','mZXrg','_pattern','createCustomWeaponGraphicFromObj','1620168MjitDh','GKcvM','STRUCT','setHue','_customFrames','createCustomWeaponGraphic','wqbcc','FUNC','1140003zrUzhY','version','performWeaponAnimation','IuapL','initMembers','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','parameters','RegExp','Settings','Game_BattlerBase_refresh','jfPvy','209815nwbLTL','1185oERbwr','ConvertParams','description','name','loadSystem','gQCum','ARRAYEVAL','bitmap','weaponTypes','Game_Enemy_attackAnimationId1','Game_Actor_attackAnimationId1','240696qXHRcG','RLZSc','process_VisuMZ_BattleCore_Failsafes','getStateAttackAnimation','ndbkp','return\x200','startAction','TiCBb','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','length','prototype','Game_Actor_performWeaponAnimation','MCPNo','48izjDkU','_subject','toLowerCase','isEnemy','map','weaponImageId','loadBitmap','YPSBS','number','EVAL','ARRAYNUM','Game_Enemy_attackAnimationId2','exit','loadWeapon','wtypeId','160233nydzUB','GacJQ','attackMotions','_uniqueStartWeaponAnimation','setFrame','Game_BattlerBase_initMembers','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','motionType','500650NKcIhG','includes','status','nVYFL','parse','BQxzL','4AeizCD','motion','isCustomWeaponGraphic','VisuMZ_1_BattleCore\x20needs\x20to\x20be\x20updated\x20','Game_Battler_freezeMotion','updateFrameCustomWeaponGraphic','weapons','uiifL','AfeRo','_freezeMotionData','toUpperCase','note','svBattlerData','startWeaponAnimation','Sprite_Weapon_updateFrame','requestMotion','floor','hasStateAttackAnimation','Weapons','Game_Battler_startWeaponAnimation','filepath','ARRAYJSON','ARRAYSTRUCT','in\x20order\x20for\x20VisuMZ_3_WeaponAnimation\x20to\x20work.','_cache','dQJSk','NUM','_weaponImageId','customWeaponGraphic','qRBiE','HQnAs','preloadCustomWeaponImage','Game_Actor_attackAnimationId2','attackAnimationId1','MBaXe','UQDam','attackAnimationId2','Sprite_Weapon_loadBitmap','trim','BattleCore','FQKRY','hue','updateFrame','OaGWR','Motion','BattleManager_startAction','call','Scene_Boot_process_VisuMZ_BattleCore_Failsafes','match','checkCacheKey','format','NZHNN','EwzIr','JSON','refresh','enemy','MCzHI','loadBitmapCustomWeapon','2612kTkTkG'];_0x27c1=function(){return _0x3f234b;};return _0x27c1();}