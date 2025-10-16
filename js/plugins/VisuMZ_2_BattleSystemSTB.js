//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.21] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 *
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Standard Turn Battle
 * is in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * VisuMZ_4_BreakShields
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
 *
 * ---
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Forced Actions:
 *   - Apply exploit system to Forced Actions?
 *   - We added this function because forced actions can disrupt player
 *     strategies when used with the exploit system.
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * Version 1.21: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where auto-battle would not give ONE MORE! bonus to actors.
 *    Fix made by Olivia.
 * 
 * Version 1.20: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving auto-battle that would give infinite actions if
 *    cancelled at specific timings. Fix made by Olivia.
 * 
 * Version 1.19: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the STB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.16: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.15: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Exploit System Settings > Forced Actions
 * **** Apply exploit system to Forced Actions?
 * **** We added this function because forced actions can disrupt player
 *      strategies when used with the exploit system.
 * 
 * Version 1.14: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
 * @default true
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
/* ----------------------------------------------------------------------------
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param ForcedActions:eval
 * @text Forced Actions
 * @parent Exploit
 * @type boolean
 * @on Apply
 * @off Don't Apply
 * @desc Apply exploit system to Forced Actions?
 * @default false
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x5a9383=_0x4be3;function _0x1a54(){const _0x426794=['TurnOrder','StbTurnOrderActorIcon','Scene_Battle_commandFight','top','VisuMZ_0_CoreEngine','children','_ogWindowLayerY','min','shift','registerCommand','startTurn','checkPosition','NUM','StbTurnOrderClearActorGraphic','containerPosition','_stbTurnOrderFaceName','_homeX','executeDamageSTB','executeDamage','push','members','Exploited','StbTurnOrderEnemyIcon','addChildAt','1EZzpGz','actions','CannotBeExploiter','createChildren','changeSvActorGraphicBitmap','getSTBNextTurnSpeed','isSTBExploited','addChild','EnemyBattlerFaceIndex','getBattleSystem','allBattleMembers','Actors','ARRAYEVAL','updateSelectionEffect','item','isAutoBattle','addState','setSTBExploited','_graphicFaceName','center','_stbExploitAdvantageFlag','loadSvEnemy','_isBattleOver','createInitialPositions','#000000','loadSvActor','setItem','removeActionBattlersSTB','displayExploitedEffects','match','957mLfvDh','VisuMZ_1_BattleCore','_stbExploited','ARRAYSTR','Exploiter','%1SystemBorder','initialize','isActionValid','_actions','clear','faceIndex','clearSTBExploit','processTurnSTB','isActor','_containerWidth','selectNextCommand','MaxVertSprites','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','map','subject','BattleManager_battleSys','BattleManager_processTurn','Game_Party_removeActor','BattleManager_makeActionOrders','Visible','_turnOrderInnerSprite','removeActor','setBlendColor','split','endAction','createBattlerSprites','changeFaceGraphicBitmap','getNextSubject','setupTextPopup','stepForward','calculateTargetPositions','setAutoBattleStb','3934806mMRDtS','%1BgColor2','SpriteThin','AddedStates','CustomJS','becomeSTBExploited','opacity','Speed','boxHeight','performCollapse','actor','TurnOrderSTBGraphicIconIndex','BattleManager_isActiveTpb','MaxHorzSprites','startInputSTB','FaceName','performSTBExploiter','_containerHeight','faceHeight','isAppeared','defaultPosition','appear','finishActorInput','loadEnemy','Scene_Battle_commandCancel','right','BattleManager_endAction','Exploit','endActionSTB','_currentActor','bitmap','1803540TKdfmk','startActorCommandSelection','performActionEnd','onBattleStart','createSTBTurnOrderWindow','Game_Actor_selectNextCommand','EVAL','bitmapHeight','_homeY','anchor','ExploiterStates','_logWindow','CannotBeExploited','TurnResetExploits','_unit','fontSize','TurnOrderSTBGraphicType','_surprise','return\x200','_stbNextTurnSpeed','addInnerChild','areAllActorsExploited','trim','description','setSTBExploitedFlag','checkTargetPositions','update','updateGraphic','AllowRandomSpeed','_graphicEnemy','Game_Action_executeDamage','max','padding','sort','_fadeTarget','EnemyBattlerType','ARRAYJSON','updateHomePosition','numActions','updateOpacity','_positionTargetY','_graphicType','getStateTooltipBattler','currentClass','_actionBattlers','EnemyBattlerDrawLetter','BattleSystemSTB','createActorCommandWindow','checkOpacity','applyGlobalBattleSystemSTB','clearSTB','_graphicHue','clearNextTurnSpeedSTB','updateVisibility','isAutoBattleStb','name','Game_Action_clear','Window_Help_setItem','TurnOrderSTBGraphicFaceIndex','enemy','isSceneBattle','stbExploitedStates','_ogWindowLayerX','_position','processUpdateGraphic','onTurnEnd','createActorCommandWindowSTB','makeSTBSpeed','recalculateHome','version','Actor','%1BorderColor','parameters','BattleManager_isTurnBased','_graphicSprite','_positionTargetX','applyGlobal','ExtraActions','BattleManager_finishActorInput','round','IconIndex','DisplayPosition','_plural','SubjectDistance','RepositionTopForHelp','STRUCT','_graphicFaceIndex','Game_BattlerBase_initMembers','IconSet','AnimationID','visible','OrderDirection','boxWidth','canMove','updateBattleContainerOrder','loadSystem','face','vsEnemiesFullExploit','format','ForcedActions','_stbTurnOrderWindow','updatePadding','SystemTurnOrderVisibility','_inputting','ExploitEleRate','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EnemyBattlerFaceName','stbCannotBeExploiter','maxBattleMembers','PopupText','_forcing','_speed','allowRandomSpeed','STB','areAllEnemiesExploited','initMembers','battlerName','414834WtvToZ','_positionDuration','bitmapWidth','processTurn','battleEnd','width','%1\x20%2\x20%3','canInput','requestFauxAnimation','changeEnemyGraphicBitmap','ExploitEleWeakness','Game_Actor_makeAutoBattleActions','faceWidth','call','EnemyBattlerIcon','_stbTurnOrderGraphicType','initHomePositions','cancel','JSON','updatePosition','Game_Battler_performActionEnd','constructor','Game_Actor_isAutoBattle','createGraphicSprite','_homeDuration','Instant','ceil','performActionEndSTB','isBattleSystemSTBTurnOrderVisible','setSTBNextTurnSpeed','commandCancelSTB','changeIconGraphicBitmap','result','ShowMarkerBorder','RegExp','battler','startFade','7619171VxZuAi','traitObjects','3878676frpnhS','isSTBExploitSystemEnabled','svActorVertCells','_statusWindow','createBackgroundSprite','_graphicSv','bind','_subject','battlerHue','_fadeDuration','onBattleStartSTB','_blendColor','floor','createTurnOrderSTBGraphicFaceName','Game_Action_speed','makeActionOrders','ParseStateData','createTestBitmap','speed','Enemies','hide','initMembersBattleSystemSTB','isTurnBased','initBattleSystemSTB','gradientFillRect','faceName','getStateIdWithName','stbGainInstant','blt','Game_Action_applyGlobal','stbExploiterStates','_isAppeared','_phase','toUpperCase','setup','updateGraphicHue','Game_BattlerBase_hide','_stbTurnOrderFaceIndex','friendsUnit','isSTB','clearSTBNextTurnSpeed','_stbAutoBattle','Mirror','selectNextActorSTB','_backgroundSprite','SpriteLength','FUNC','svActorHorzCells','320510nsWXAW','FlashColor','createBattlerRect','reserveCommonEvent','hasSvBattler','compareBattlerSprites','filter','create','Game_Battler_onTurnEnd','ScreenBuffer','addLoadListener','vsActorsFullExploit','%1BgColor1','updateLetter','BorderThickness','fontFace','UpdateFrames','windowRect','MultipleExploits','createBorderSprite','_graphicIconIndex','mainFontFace','_targetHomeX','getColor','isPartyCommandWindowDisabled','ExploitCritical','8kRUCWN','startActorInput','_letter','Scene_Battle_createActorCommandWindow','StbTurnOrderClearEnemyGraphic','svBattlerName','currentAction','getChildIndex','drawText','Scene_Battle_createAllWindows','Game_BattlerBase_appear','clearTurnOrderSTBGraphics','selectNextActor','isHorz','parse','createAllWindows','ARRAYSTRUCT','_actorCommandWindow','height','BattleManager_selectNextActor','1427455YWnJrH','containerWindow','Game_Battler_makeSpeed','makeAutoBattleActions','commandFight','_stbTurnOrderIconIndex','isAlive','setBattleSystemSTBTurnOrderVisible','left','mainSprite','fillRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Settings','EnemyBattlerFontFace','Game_Battler_performCollapse','exit','_index','ActorBattlerIcon','clearRect','updateSidePosition','isTpb','8kktjlB','_letterSprite','ConvertParams','updateTurnOrder','createTurnOrderSTBGraphicIconIndex','RepositionTopHelpX','_scene','note','loadFace','createTurnOrderSTBGraphicType','Game_Battler_onBattleStart','createTurnOrderSTBGraphicFaceIndex','_turnOrderContainer','makeSpeed','iconHeight','battleSys','_partyCommandWindow','BattleManager_startInput','Enemy','remove','icon','_fullHeight','includes','TurnOrderSTBGraphicFaceName','_windowLayer','svactor','BattleManager_isTpb','commandCancel','isEnemy','_helpWindow','_isAlive','_stbTurnOrderVisible','DisplayOffsetY','_stateIDs','length','prototype','isActiveTpb','_targetHomeY','Game_System_initialize','bottom','unshift'];_0x1a54=function(){return _0x426794;};return _0x1a54();}(function(_0xa7c3de,_0x427b18){const _0x17900b=_0x4be3,_0x14b4d8=_0xa7c3de();while(!![]){try{const _0x3b7d66=-parseInt(_0x17900b(0x133))/0x1*(-parseInt(_0x17900b(0x195))/0x2)+parseInt(_0x17900b(0x176))/0x3+parseInt(_0x17900b(0xf2))/0x4*(parseInt(_0x17900b(0x28f))/0x5)+parseInt(_0x17900b(0x20a))/0x6+parseInt(_0x17900b(0x22f))/0x7+parseInt(_0x17900b(0x27b))/0x8*(-parseInt(_0x17900b(0x231))/0x9)+parseInt(_0x17900b(0x261))/0xa*(-parseInt(_0x17900b(0x151))/0xb);if(_0x3b7d66===_0x427b18)break;else _0x14b4d8['push'](_0x14b4d8['shift']());}catch(_0x48b7f6){_0x14b4d8['push'](_0x14b4d8['shift']());}}}(_0x1a54,0xb0671));var label=_0x5a9383(0x1c3),tier=tier||0x0,dependencies=[_0x5a9383(0x11f),_0x5a9383(0x152)],pluginData=$plugins['filter'](function(_0x12e887){const _0xf409ca=_0x5a9383;return _0x12e887['status']&&_0x12e887[_0xf409ca(0x1ac)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5a9383(0x29b)]=VisuMZ[label][_0x5a9383(0x29b)]||{},VisuMZ[_0x5a9383(0xf4)]=function(_0x2b2544,_0x5440c2){const _0x5098d8=_0x5a9383;for(const _0x5bf423 in _0x5440c2){if(_0x5bf423[_0x5098d8(0x150)](/(.*):(.*)/i)){const _0x5e2150=String(RegExp['$1']),_0x686546=String(RegExp['$2'])[_0x5098d8(0x252)]()[_0x5098d8(0x1ab)]();let _0x205142,_0x4f072b,_0x3a99c1;switch(_0x686546){case _0x5098d8(0x127):_0x205142=_0x5440c2[_0x5bf423]!==''?Number(_0x5440c2[_0x5bf423]):0x0;break;case'ARRAYNUM':_0x4f072b=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):[],_0x205142=_0x4f072b[_0x5098d8(0x163)](_0x52964d=>Number(_0x52964d));break;case _0x5098d8(0x19b):_0x205142=_0x5440c2[_0x5bf423]!==''?eval(_0x5440c2[_0x5bf423]):null;break;case _0x5098d8(0x13f):_0x4f072b=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):[],_0x205142=_0x4f072b['map'](_0x2697ac=>eval(_0x2697ac));break;case _0x5098d8(0x21c):_0x205142=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):'';break;case _0x5098d8(0x1b9):_0x4f072b=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):[],_0x205142=_0x4f072b[_0x5098d8(0x163)](_0x31e115=>JSON['parse'](_0x31e115));break;case _0x5098d8(0x25f):_0x205142=_0x5440c2[_0x5bf423]!==''?new Function(JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423])):new Function(_0x5098d8(0x1a7));break;case'ARRAYFUNC':_0x4f072b=_0x5440c2[_0x5bf423]!==''?JSON['parse'](_0x5440c2[_0x5bf423]):[],_0x205142=_0x4f072b[_0x5098d8(0x163)](_0x563675=>new Function(JSON['parse'](_0x563675)));break;case'STR':_0x205142=_0x5440c2[_0x5bf423]!==''?String(_0x5440c2[_0x5bf423]):'';break;case _0x5098d8(0x154):_0x4f072b=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):[],_0x205142=_0x4f072b[_0x5098d8(0x163)](_0x53dc9e=>String(_0x53dc9e));break;case _0x5098d8(0x1ea):_0x3a99c1=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):{},_0x205142=VisuMZ['ConvertParams']({},_0x3a99c1);break;case _0x5098d8(0x28b):_0x4f072b=_0x5440c2[_0x5bf423]!==''?JSON[_0x5098d8(0x289)](_0x5440c2[_0x5bf423]):[],_0x205142=_0x4f072b[_0x5098d8(0x163)](_0x3b7cb7=>VisuMZ[_0x5098d8(0xf4)]({},JSON[_0x5098d8(0x289)](_0x3b7cb7)));break;default:continue;}_0x2b2544[_0x5e2150]=_0x205142;}}return _0x2b2544;},(_0x2c7b70=>{const _0x2e4fe5=_0x5a9383,_0x344f06=_0x2c7b70[_0x2e4fe5(0x1cc)];for(const _0x583cf8 of dependencies){if(!Imported[_0x583cf8]){alert(_0x2e4fe5(0x29a)[_0x2e4fe5(0x1f7)](_0x344f06,_0x583cf8)),SceneManager['exit']();break;}}const _0x4ca70f=_0x2c7b70['description'];if(_0x4ca70f[_0x2e4fe5(0x150)](/\[Version[ ](.*?)\]/i)){const _0x398ae2=Number(RegExp['$1']);_0x398ae2!==VisuMZ[label][_0x2e4fe5(0x1da)]&&(alert(_0x2e4fe5(0x1fe)[_0x2e4fe5(0x1f7)](_0x344f06,_0x398ae2)),SceneManager[_0x2e4fe5(0x29e)]());}if(_0x4ca70f[_0x2e4fe5(0x150)](/\[Tier[ ](\d+)\]/i)){const _0x5c615c=Number(RegExp['$1']);_0x5c615c<tier?(alert(_0x2e4fe5(0x162)[_0x2e4fe5(0x1f7)](_0x344f06,_0x5c615c,tier)),SceneManager['exit']()):tier=Math[_0x2e4fe5(0x1b4)](_0x5c615c,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x2c7b70[_0x2e4fe5(0x1dd)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x5a9383(0x11c),_0x3fddbc=>{const _0x4bc3af=_0x5a9383;VisuMZ[_0x4bc3af(0xf4)](_0x3fddbc,_0x3fddbc);const _0x1714fc=_0x3fddbc[_0x4bc3af(0x13e)],_0x93cfae=_0x3fddbc[_0x4bc3af(0x1e5)];for(const _0xed8e64 of _0x1714fc){const _0x492412=$gameActors[_0x4bc3af(0x180)](_0xed8e64);if(!_0x492412)continue;_0x492412[_0x4bc3af(0x219)]=_0x4bc3af(0x106),_0x492412[_0x4bc3af(0x294)]=_0x93cfae;}}),PluginManager[_0x5a9383(0x124)](pluginData[_0x5a9383(0x1cc)],'StbTurnOrderActorFace',_0x570e89=>{const _0x5943b5=_0x5a9383;VisuMZ[_0x5943b5(0xf4)](_0x570e89,_0x570e89);const _0x1f8067=_0x570e89['Actors'],_0x324bf5=_0x570e89[_0x5943b5(0x185)],_0x216ec6=_0x570e89['FaceIndex'];for(const _0x4f4b00 of _0x1f8067){const _0x325f46=$gameActors['actor'](_0x4f4b00);if(!_0x325f46)continue;_0x325f46[_0x5943b5(0x219)]='face',_0x325f46[_0x5943b5(0x12a)]=_0x324bf5,_0x325f46[_0x5943b5(0x256)]=_0x216ec6;}}),PluginManager[_0x5a9383(0x124)](pluginData[_0x5a9383(0x1cc)],_0x5a9383(0x128),_0x103ca8=>{const _0x2d28e4=_0x5a9383;VisuMZ['ConvertParams'](_0x103ca8,_0x103ca8);const _0x32c348=_0x103ca8['Actors'];for(const _0x599245 of _0x32c348){const _0x50dc57=$gameActors[_0x2d28e4(0x180)](_0x599245);if(!_0x50dc57)continue;_0x50dc57['clearTurnOrderSTBGraphics']();}}),PluginManager[_0x5a9383(0x124)](pluginData[_0x5a9383(0x1cc)],_0x5a9383(0x131),_0x2cbb96=>{const _0x395b55=_0x5a9383;VisuMZ[_0x395b55(0xf4)](_0x2cbb96,_0x2cbb96);const _0x5a23f1=_0x2cbb96[_0x395b55(0x244)],_0x395ecb=_0x2cbb96[_0x395b55(0x1e5)];for(const _0x5004e5 of _0x5a23f1){const _0x1c331d=$gameTroop[_0x395b55(0x12f)]()[_0x5004e5];if(!_0x1c331d)continue;_0x1c331d[_0x395b55(0x219)]=_0x395b55(0x106),_0x1c331d['_stbTurnOrderIconIndex']=_0x395ecb;}}),PluginManager[_0x5a9383(0x124)](pluginData['name'],'StbTurnOrderEnemyFace',_0x2efc00=>{const _0x4cd588=_0x5a9383;VisuMZ[_0x4cd588(0xf4)](_0x2efc00,_0x2efc00);const _0x5cefa2=_0x2efc00[_0x4cd588(0x244)],_0x39f548=_0x2efc00['FaceName'],_0x1bc3c0=_0x2efc00['FaceIndex'];for(const _0xb10282 of _0x5cefa2){const _0x3bc082=$gameTroop[_0x4cd588(0x12f)]()[_0xb10282];if(!_0x3bc082)continue;_0x3bc082[_0x4cd588(0x219)]=_0x4cd588(0x1f5),_0x3bc082[_0x4cd588(0x12a)]=_0x39f548,_0x3bc082[_0x4cd588(0x256)]=_0x1bc3c0;}}),PluginManager[_0x5a9383(0x124)](pluginData[_0x5a9383(0x1cc)],_0x5a9383(0x27f),_0x4b493c=>{const _0x312957=_0x5a9383;VisuMZ[_0x312957(0xf4)](_0x4b493c,_0x4b493c);const _0x3e9b06=_0x4b493c[_0x312957(0x244)];for(const _0x5a2061 of _0x3e9b06){const _0x32f799=$gameTroop['members']()[_0x5a2061];if(!_0x32f799)continue;_0x32f799['clearTurnOrderSTBGraphics']();}}),PluginManager[_0x5a9383(0x124)](pluginData[_0x5a9383(0x1cc)],_0x5a9383(0x1fb),_0x183112=>{const _0x5d9c44=_0x5a9383;VisuMZ[_0x5d9c44(0xf4)](_0x183112,_0x183112);const _0x164ca4=_0x183112[_0x5d9c44(0x169)];$gameSystem['setBattleSystemSTBTurnOrderVisible'](_0x164ca4);}),VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x22c)]={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x5a9383(0x24b)]=function(_0x85cdf8){const _0x573fa3=_0x5a9383;_0x85cdf8=_0x85cdf8['toUpperCase']()[_0x573fa3(0x1ab)](),this[_0x573fa3(0x113)]=this[_0x573fa3(0x113)]||{};if(this['_stateIDs'][_0x85cdf8])return this[_0x573fa3(0x113)][_0x85cdf8];for(const _0x23db16 of $dataStates){if(!_0x23db16)continue;this['_stateIDs'][_0x23db16['name'][_0x573fa3(0x252)]()[_0x573fa3(0x1ab)]()]=_0x23db16['id'];}return this['_stateIDs'][_0x85cdf8]||0x0;},ImageManager[_0x5a9383(0x260)]=ImageManager[_0x5a9383(0x260)]||0x9,ImageManager[_0x5a9383(0x233)]=ImageManager[_0x5a9383(0x233)]||0x6,SceneManager[_0x5a9383(0x1d1)]=function(){const _0x3e812c=_0x5a9383;return this['_scene']&&this[_0x3e812c(0xf8)]['constructor']===Scene_Battle;},VisuMZ['BattleSystemSTB'][_0x5a9383(0x165)]=BattleManager[_0x5a9383(0x101)],BattleManager[_0x5a9383(0x101)]=function(){const _0x59f474=_0x5a9383;if(this[_0x59f474(0x258)]())return'STB';return VisuMZ['BattleSystemSTB'][_0x59f474(0x165)]['call'](this);},BattleManager[_0x5a9383(0x258)]=function(){const _0x33b3d2=_0x5a9383;return $gameSystem[_0x33b3d2(0x13c)]()===_0x33b3d2(0x206);},VisuMZ['BattleSystemSTB'][_0x5a9383(0x10c)]=BattleManager[_0x5a9383(0xf1)],BattleManager[_0x5a9383(0xf1)]=function(){const _0x42cc94=_0x5a9383;if(this[_0x42cc94(0x258)]())return![];return VisuMZ[_0x42cc94(0x1c3)][_0x42cc94(0x10c)]['call'](this);},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x182)]=BattleManager[_0x5a9383(0x116)],BattleManager[_0x5a9383(0x116)]=function(){const _0x5a6311=_0x5a9383;if(this['isSTB']())return![];return VisuMZ[_0x5a6311(0x1c3)]['BattleManager_isActiveTpb']['call'](this);},VisuMZ['BattleSystemSTB'][_0x5a9383(0x1de)]=BattleManager[_0x5a9383(0x247)],BattleManager[_0x5a9383(0x247)]=function(){const _0x536ac6=_0x5a9383;if(this['isSTB']())return!![];return VisuMZ[_0x536ac6(0x1c3)][_0x536ac6(0x1de)][_0x536ac6(0x217)](this);},VisuMZ['BattleSystemSTB'][_0x5a9383(0x103)]=BattleManager['startInput'],BattleManager['startInput']=function(){const _0x2e338f=_0x5a9383;VisuMZ[_0x2e338f(0x1c3)][_0x2e338f(0x103)][_0x2e338f(0x217)](this);if(this[_0x2e338f(0x258)]()&&$gameParty[_0x2e338f(0x211)]()&&!this[_0x2e338f(0x1a6)])this[_0x2e338f(0x184)]();},BattleManager[_0x5a9383(0x184)]=function(){const _0x493bab=_0x5a9383;this[_0x493bab(0x125)]();},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x166)]=BattleManager['processTurn'],BattleManager[_0x5a9383(0x20d)]=function(){const _0x4baedc=_0x5a9383;this[_0x4baedc(0x258)]()?this[_0x4baedc(0x15d)]():VisuMZ[_0x4baedc(0x1c3)][_0x4baedc(0x166)][_0x4baedc(0x217)](this);},BattleManager[_0x5a9383(0x15d)]=function(){const _0x100055=_0x5a9383,_0x114c55=this[_0x100055(0x238)];if(_0x114c55['isActor']()&&_0x114c55[_0x100055(0x211)]()){const _0x521132=_0x114c55[_0x100055(0x281)]();if(!_0x521132)VisuMZ[_0x100055(0x1c3)]['BattleManager_processTurn'][_0x100055(0x217)](this);else _0x521132['_forceAction']?VisuMZ['BattleSystemSTB'][_0x100055(0x166)][_0x100055(0x217)](this):(this[_0x100055(0x193)]=_0x114c55,this[_0x100055(0x27c)]());}else VisuMZ[_0x100055(0x1c3)][_0x100055(0x166)][_0x100055(0x217)](this);},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x1e3)]=BattleManager[_0x5a9383(0x18c)],BattleManager[_0x5a9383(0x18c)]=function(){const _0x322e88=_0x5a9383;this['isSTB']()?VisuMZ[_0x322e88(0x1c3)][_0x322e88(0x166)]['call'](this):VisuMZ['BattleSystemSTB'][_0x322e88(0x1e3)][_0x322e88(0x217)](this);},VisuMZ['BattleSystemSTB'][_0x5a9383(0x28e)]=BattleManager[_0x5a9383(0x287)],BattleManager[_0x5a9383(0x287)]=function(){const _0x42fdbb=_0x5a9383;this[_0x42fdbb(0x258)]()?this[_0x42fdbb(0x25c)]():VisuMZ[_0x42fdbb(0x1c3)][_0x42fdbb(0x28e)][_0x42fdbb(0x217)](this);},BattleManager['selectNextActorSTB']=function(){const _0x43a7fb=_0x5a9383;this['_currentActor']=null,this[_0x43a7fb(0x1fc)]=![];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x190)]=BattleManager[_0x5a9383(0x16e)],BattleManager[_0x5a9383(0x16e)]=function(){const _0x247408=_0x5a9383;VisuMZ['BattleSystemSTB'][_0x247408(0x190)]['call'](this),this[_0x247408(0x192)]();},BattleManager[_0x5a9383(0x192)]=function(){const _0x1de434=_0x5a9383;if(!this[_0x1de434(0x258)]())return;this['removeActionBattlersSTB']();this['_forcedBattlers'][_0x1de434(0x114)]>0x0&&(this[_0x1de434(0x238)]&&(!this['_actionBattlers'][_0x1de434(0x108)](this[_0x1de434(0x238)])&&this[_0x1de434(0x1c1)][_0x1de434(0x11a)](this[_0x1de434(0x238)])),this[_0x1de434(0x238)]=this[_0x1de434(0x171)]());;},BattleManager[_0x5a9383(0x232)]=function(){const _0x2bf2d4=_0x5a9383;return VisuMZ[_0x2bf2d4(0x1c3)][_0x2bf2d4(0x29b)][_0x2bf2d4(0x191)]['EnableExploit'];},BattleManager[_0x5a9383(0x1aa)]=function(){const _0x3278c2=_0x5a9383,_0x32e185=$gameParty['aliveMembers']()[_0x3278c2(0x267)](_0x5d1215=>_0x5d1215['isAppeared']()),_0x459900=_0x32e185['filter'](_0x314470=>_0x314470[_0x3278c2(0x139)]());return _0x32e185[_0x3278c2(0x114)]===_0x459900['length'];},BattleManager[_0x5a9383(0x207)]=function(){const _0x27a930=_0x5a9383,_0x363f48=$gameTroop['aliveMembers']()[_0x27a930(0x267)](_0x19952e=>_0x19952e[_0x27a930(0x189)]()),_0x5109a9=_0x363f48['filter'](_0x2b659f=>_0x2b659f[_0x27a930(0x139)]());return _0x363f48[_0x27a930(0x114)]===_0x5109a9[_0x27a930(0x114)];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x168)]=BattleManager['makeActionOrders'],BattleManager[_0x5a9383(0x240)]=function(){const _0x441e8e=_0x5a9383;VisuMZ['BattleSystemSTB'][_0x441e8e(0x168)][_0x441e8e(0x217)](this),this[_0x441e8e(0x258)]()&&(this[_0x441e8e(0x14e)](),this['updateTurnOrderSTB'](),this[_0x441e8e(0x1c9)]());},BattleManager[_0x5a9383(0x14e)]=function(){const _0x598b56=_0x5a9383;if(!this['isSTB']())return;this['_actionBattlers']=this[_0x598b56(0x1c1)]||[],this[_0x598b56(0x1c1)]=this[_0x598b56(0x1c1)]['filter'](_0x39bc40=>_0x39bc40&&_0x39bc40[_0x598b56(0x189)]()&&_0x39bc40[_0x598b56(0x295)]()),this['updateTurnOrderSTB']();},BattleManager['updateTurnOrderSTB']=function(_0x2edb56){const _0x22cfb7=_0x5a9383;if(!this[_0x22cfb7(0x258)]())return;const _0x49fe0b=SceneManager['_scene'][_0x22cfb7(0x1f9)];if(!_0x49fe0b)return;_0x49fe0b[_0x22cfb7(0xf5)](_0x2edb56);},BattleManager[_0x5a9383(0x1c9)]=function(){const _0x5c4b69=_0x5a9383;for(const _0x4c6ae1 of this[_0x5c4b69(0x13d)]()){if(!_0x4c6ae1)continue;_0x4c6ae1[_0x5c4b69(0x227)](0x0);}},VisuMZ['BattleSystemSTB'][_0x5a9383(0x118)]=Game_System['prototype']['initialize'],Game_System[_0x5a9383(0x115)][_0x5a9383(0x157)]=function(){const _0x4bf823=_0x5a9383;VisuMZ[_0x4bf823(0x1c3)]['Game_System_initialize']['call'](this),this[_0x4bf823(0x248)]();},Game_System['prototype'][_0x5a9383(0x248)]=function(){this['_stbTurnOrderVisible']=!![];},Game_System[_0x5a9383(0x115)]['isBattleSystemSTBTurnOrderVisible']=function(){const _0x21bb10=_0x5a9383;return this[_0x21bb10(0x111)]===undefined&&this[_0x21bb10(0x248)](),this[_0x21bb10(0x111)];},Game_System[_0x5a9383(0x115)][_0x5a9383(0x296)]=function(_0x270bf7){const _0x3348d4=_0x5a9383;this[_0x3348d4(0x111)]===undefined&&this['initBattleSystemSTB'](),this[_0x3348d4(0x111)]=_0x270bf7;},VisuMZ['BattleSystemSTB']['Game_Action_speed']=Game_Action[_0x5a9383(0x115)][_0x5a9383(0x243)],Game_Action['prototype'][_0x5a9383(0x243)]=function(){const _0xa262b=_0x5a9383;return BattleManager[_0xa262b(0x258)]()?0x0:VisuMZ[_0xa262b(0x1c3)][_0xa262b(0x23f)][_0xa262b(0x217)](this);},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x24e)]=Game_Action[_0x5a9383(0x115)]['applyGlobal'],Game_Action[_0x5a9383(0x115)][_0x5a9383(0x1e1)]=function(){const _0x32fe94=_0x5a9383;VisuMZ[_0x32fe94(0x1c3)][_0x32fe94(0x24e)]['call'](this),this[_0x32fe94(0x1c6)]();},Game_Action['prototype']['applyGlobalBattleSystemSTB']=function(){const _0x574d25=_0x5a9383;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x574d25(0x258)]())return;const _0x4a33e5=this[_0x574d25(0x141)](),_0x3920d1=VisuMZ[_0x574d25(0x1c3)][_0x574d25(0x22c)],_0x41fb50=VisuMZ[_0x574d25(0x1c3)][_0x574d25(0x29b)][_0x574d25(0x17d)];_0x4a33e5&&_0x4a33e5[_0x574d25(0xf9)][_0x574d25(0x150)](_0x3920d1[_0x574d25(0x223)])&&this[_0x574d25(0x164)]()[_0x574d25(0x24c)](0x1);const _0xfb08dc=_0x41fb50['NextTurnSavedSpeedJS'][_0x574d25(0x217)](this);this[_0x574d25(0x164)]()['addSTBNextTurnSpeed'](_0xfb08dc);},VisuMZ['BattleSystemSTB'][_0x5a9383(0x1cd)]=Game_Action[_0x5a9383(0x115)][_0x5a9383(0x15a)],Game_Action[_0x5a9383(0x115)][_0x5a9383(0x15a)]=function(){const _0x2dfdc0=_0x5a9383;VisuMZ[_0x2dfdc0(0x1c3)]['Game_Action_clear'][_0x2dfdc0(0x217)](this),this['clearSTB']();},Game_Action[_0x5a9383(0x115)][_0x5a9383(0x1c7)]=function(){const _0x201120=_0x5a9383;this['_stbExploitAdvantageFlag']=![],this[_0x201120(0x25a)]=![];},Game_Action[_0x5a9383(0x115)]['hasSTBExploited']=function(){const _0x19a123=_0x5a9383;return this[_0x19a123(0x147)]===undefined&&this[_0x19a123(0x1c7)](),this['_stbExploitAdvantageFlag'];},Game_Action[_0x5a9383(0x115)]['setSTBExploitedFlag']=function(_0x143230){const _0x357937=_0x5a9383;this[_0x357937(0x147)]===undefined&&this['clearSTB'](),this[_0x357937(0x147)]=_0x143230;},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x1b3)]=Game_Action['prototype'][_0x5a9383(0x12d)],Game_Action[_0x5a9383(0x115)][_0x5a9383(0x12d)]=function(_0x431463,_0x2b5e07){const _0x488fee=_0x5a9383;VisuMZ[_0x488fee(0x1c3)][_0x488fee(0x1b3)][_0x488fee(0x217)](this,_0x431463,_0x2b5e07),this[_0x488fee(0x12c)](_0x431463);},Game_Action[_0x5a9383(0x115)][_0x5a9383(0x12c)]=function(_0x5272ee){const _0x4bb63f=_0x5a9383;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x4bb63f(0x258)]())return;if(!BattleManager[_0x4bb63f(0x232)]())return;if(_0x5272ee[_0x4bb63f(0x257)]()===this[_0x4bb63f(0x164)]()['friendsUnit']())return;const _0x71b5b8=VisuMZ['BattleSystemSTB'][_0x4bb63f(0x29b)][_0x4bb63f(0x191)],_0x4f597b=_0x5272ee[_0x4bb63f(0x22a)]();if(!_0x71b5b8[_0x4bb63f(0x1f8)]&&this[_0x4bb63f(0x203)])return;_0x71b5b8[_0x4bb63f(0x27a)]&&_0x4f597b['critical']&&(this['subject']()[_0x4bb63f(0x186)](_0x5272ee,this),_0x5272ee[_0x4bb63f(0x17b)](this[_0x4bb63f(0x164)](),this));if(_0x71b5b8[_0x4bb63f(0x214)]){const _0xa68f64=this['calcElementRate'](_0x5272ee);_0xa68f64>=_0x71b5b8[_0x4bb63f(0x1fd)]&&(this[_0x4bb63f(0x164)]()[_0x4bb63f(0x186)](_0x5272ee,this),_0x5272ee[_0x4bb63f(0x17b)](this['subject'](),this));}},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x1ec)]=Game_BattlerBase['prototype'][_0x5a9383(0x208)],Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x208)]=function(){const _0x5d3e83=_0x5a9383;VisuMZ[_0x5d3e83(0x1c3)][_0x5d3e83(0x1ec)][_0x5d3e83(0x217)](this),this[_0x5d3e83(0x246)]();},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x246)]=function(){const _0x40881e=_0x5a9383;this[_0x40881e(0x259)](),this[_0x40881e(0x15c)]();},Game_BattlerBase[_0x5a9383(0x115)]['clearSTBNextTurnSpeed']=function(){const _0x29d5ec=_0x5a9383;this[_0x29d5ec(0x1a8)]=0x0;},Game_BattlerBase['prototype']['getSTBNextTurnSpeed']=function(){const _0x28f130=_0x5a9383;return this[_0x28f130(0x1a8)]===undefined&&this['initMembersBattleSystemSTB'](),this[_0x28f130(0x1a8)];},Game_BattlerBase[_0x5a9383(0x115)]['setSTBNextTurnSpeed']=function(_0x2fff67){const _0x33e35c=_0x5a9383;this[_0x33e35c(0x1a8)]===undefined&&this[_0x33e35c(0x246)](),this[_0x33e35c(0x1a8)]=_0x2fff67;},Game_BattlerBase[_0x5a9383(0x115)]['addSTBNextTurnSpeed']=function(_0x4967dd){const _0x392a9b=_0x5a9383;this[_0x392a9b(0x1a8)]===undefined&&this[_0x392a9b(0x246)](),_0x4967dd+=this[_0x392a9b(0x138)](),this['setSTBNextTurnSpeed'](_0x4967dd);},Game_BattlerBase[_0x5a9383(0x115)]['clearSTBExploit']=function(){const _0x129b57=_0x5a9383;this[_0x129b57(0x153)]=![];},Game_BattlerBase['prototype'][_0x5a9383(0x139)]=function(){const _0x3628e2=_0x5a9383;return this['_stbExploited']===undefined&&this[_0x3628e2(0x246)](),this[_0x3628e2(0x153)];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x144)]=function(_0x54cddd){const _0x20a75=_0x5a9383;this[_0x20a75(0x153)]===undefined&&this[_0x20a75(0x246)](),this[_0x20a75(0x153)]=_0x54cddd;},Game_BattlerBase[_0x5a9383(0x115)]['stbCannotBeExploited']=function(){const _0x188c92=_0x5a9383,_0x3e91fe=VisuMZ[_0x188c92(0x1c3)][_0x188c92(0x22c)][_0x188c92(0x1a1)];return this[_0x188c92(0x230)]()['some'](_0x4ac5c0=>_0x4ac5c0['note']['match'](_0x3e91fe));},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x200)]=function(){const _0x5afe60=_0x5a9383,_0x693b2d=VisuMZ[_0x5afe60(0x1c3)]['RegExp'][_0x5afe60(0x135)];return this[_0x5afe60(0x230)]()['some'](_0x1daab8=>_0x1daab8[_0x5afe60(0xf9)][_0x5afe60(0x150)](_0x693b2d));},Game_BattlerBase['prototype'][_0x5a9383(0x286)]=function(){const _0x1e5eee=_0x5a9383;delete this[_0x1e5eee(0x219)],delete this[_0x1e5eee(0x12a)],delete this[_0x1e5eee(0x256)],delete this[_0x1e5eee(0x294)];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x1a5)]=function(){const _0x5c59ff=_0x5a9383;return this[_0x5c59ff(0x219)]===undefined&&(this[_0x5c59ff(0x219)]=this['createTurnOrderSTBGraphicType']()),this[_0x5c59ff(0x219)];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0xfb)]=function(){const _0x297461=_0x5a9383;return Window_STB_TurnOrder[_0x297461(0x29b)]['EnemyBattlerType'];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x109)]=function(){const _0x30c379=_0x5a9383;return this[_0x30c379(0x12a)]===undefined&&(this[_0x30c379(0x12a)]=this['createTurnOrderSTBGraphicFaceName']()),this[_0x30c379(0x12a)];},Game_BattlerBase['prototype'][_0x5a9383(0x23e)]=function(){const _0x20d077=_0x5a9383;return Window_STB_TurnOrder[_0x20d077(0x29b)][_0x20d077(0x1ff)];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x1cf)]=function(){const _0x4e9f07=_0x5a9383;return this[_0x4e9f07(0x256)]===undefined&&(this[_0x4e9f07(0x256)]=this[_0x4e9f07(0xfd)]()),this[_0x4e9f07(0x256)];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0xfd)]=function(){const _0x434bbd=_0x5a9383;return Window_STB_TurnOrder['Settings'][_0x434bbd(0x13b)];},Game_BattlerBase['prototype'][_0x5a9383(0x181)]=function(){const _0x2d9bae=_0x5a9383;return this[_0x2d9bae(0x294)]===undefined&&(this[_0x2d9bae(0x294)]=this[_0x2d9bae(0xf6)]()),this['_stbTurnOrderIconIndex'];},Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0xf6)]=function(){const _0x5a8e1d=_0x5a9383;return Window_STB_TurnOrder['Settings'][_0x5a8e1d(0x218)];},Game_BattlerBase[_0x5a9383(0x115)]['setSTBGraphicIconIndex']=function(_0x4d5cf6){const _0x13d02d=_0x5a9383;this[_0x13d02d(0x294)]=_0x4d5cf6;},VisuMZ[_0x5a9383(0x1c3)]['Game_BattlerBase_hide']=Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x245)],Game_BattlerBase[_0x5a9383(0x115)]['hide']=function(){const _0x57553d=_0x5a9383;VisuMZ[_0x57553d(0x1c3)][_0x57553d(0x255)][_0x57553d(0x217)](this),BattleManager[_0x57553d(0x14e)]();},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x285)]=Game_BattlerBase[_0x5a9383(0x115)]['appear'],Game_BattlerBase[_0x5a9383(0x115)][_0x5a9383(0x18b)]=function(){const _0x336eb8=_0x5a9383;VisuMZ[_0x336eb8(0x1c3)][_0x336eb8(0x285)]['call'](this),BattleManager['removeActionBattlersSTB']();},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x29d)]=Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x17f)],Game_Battler[_0x5a9383(0x115)]['performCollapse']=function(){const _0x518793=_0x5a9383;VisuMZ['BattleSystemSTB']['Game_Battler_performCollapse'][_0x518793(0x217)](this),BattleManager[_0x518793(0x14e)]();},VisuMZ[_0x5a9383(0x1c3)]['Game_Battler_onBattleStart']=Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x198)],Game_Battler['prototype']['onBattleStart']=function(_0x374c12){const _0x58e87c=_0x5a9383;VisuMZ[_0x58e87c(0x1c3)][_0x58e87c(0xfc)][_0x58e87c(0x217)](this,_0x374c12),this['onBattleStartSTB'](_0x374c12);},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x23b)]=function(_0x3eb45a){const _0xc903e4=_0x5a9383;if(!BattleManager[_0xc903e4(0x258)]())return;this[_0xc903e4(0x15c)]();const _0x58a505=new Game_Action(this);this[_0xc903e4(0x227)](0x0);},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x269)]=Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x1d6)],Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x1d6)]=function(){const _0x31921c=_0x5a9383;VisuMZ[_0x31921c(0x1c3)][_0x31921c(0x269)][_0x31921c(0x217)](this),BattleManager[_0x31921c(0x258)]()&&VisuMZ[_0x31921c(0x1c3)][_0x31921c(0x29b)]['Exploit'][_0x31921c(0x1a2)]&&this[_0x31921c(0x15c)]();},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x21e)]=Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x197)],Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x197)]=function(){const _0x19a245=_0x5a9383;VisuMZ[_0x19a245(0x1c3)][_0x19a245(0x21e)][_0x19a245(0x217)](this),BattleManager[_0x19a245(0x258)]()&&this[_0x19a245(0x225)]();},Game_Battler['prototype'][_0x5a9383(0x225)]=function(){const _0x386ff4=_0x5a9383;if(this[_0x386ff4(0x1bb)]()>0x0&&this===BattleManager[_0x386ff4(0x238)]){const _0x5d3f29=BattleManager['_forcedBattlers'];if(_0x5d3f29['length']>0x0&&_0x5d3f29[0x0]!==this)return;const _0x47a8e2=this[_0x386ff4(0x22d)]();if(_0x47a8e2)_0x47a8e2[_0x386ff4(0x173)]();}},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x205)]=function(){const _0x36bb41=_0x5a9383;return VisuMZ['BattleCore'][_0x36bb41(0x29b)]['Mechanics'][_0x36bb41(0x1b1)];},VisuMZ[_0x5a9383(0x1c3)]['Game_Battler_makeSpeed']=Game_Battler[_0x5a9383(0x115)][_0x5a9383(0xff)],Game_Battler[_0x5a9383(0x115)]['makeSpeed']=function(){const _0x483d61=_0x5a9383;BattleManager['isSTB']()?this[_0x483d61(0x1d8)]():VisuMZ['BattleSystemSTB'][_0x483d61(0x291)]['call'](this);},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x1d8)]=function(){const _0x3d5c23=_0x5a9383;this[_0x3d5c23(0x204)]=VisuMZ[_0x3d5c23(0x1c3)][_0x3d5c23(0x29b)]['Speed']['InitialSpeedJS'][_0x3d5c23(0x217)](this);},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x1d2)]=function(){const _0xfe7e24=_0x5a9383,_0x3b0fad=this[_0xfe7e24(0x15e)]()?this[_0xfe7e24(0x1c0)]()[_0xfe7e24(0xf9)]:this['enemy']()[_0xfe7e24(0xf9)];if(_0x3b0fad[_0xfe7e24(0x150)](VisuMZ[_0xfe7e24(0x1c3)][_0xfe7e24(0x22c)]['ExploitedStates']))return VisuMZ['BattleSystemSTB']['ParseStateData'](RegExp['$1']);return VisuMZ['BattleSystemSTB'][_0xfe7e24(0x29b)][_0xfe7e24(0x130)]['AddedStates']||[];},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x24f)]=function(){const _0x296a83=_0x5a9383,_0x499a9e=this['isActor']()?this['currentClass']()[_0x296a83(0xf9)]:this['enemy']()[_0x296a83(0xf9)];if(_0x499a9e[_0x296a83(0x150)](VisuMZ[_0x296a83(0x1c3)][_0x296a83(0x22c)][_0x296a83(0x19f)]))return VisuMZ[_0x296a83(0x1c3)]['ParseStateData'](RegExp['$1']);return VisuMZ[_0x296a83(0x1c3)]['Settings']['Exploiter'][_0x296a83(0x179)]||[];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x241)]=function(_0x1e3c4c){const _0x570dc0=_0x5a9383,_0x293583=_0x1e3c4c[_0x570dc0(0x16d)](','),_0x5b97c9=[];for(let _0x16a9ad of _0x293583){_0x16a9ad=(String(_0x16a9ad)||'')[_0x570dc0(0x1ab)]();const _0x531e8a=/^\d+$/['test'](_0x16a9ad);_0x531e8a?_0x5b97c9['push'](Number(_0x16a9ad)):_0x5b97c9[_0x570dc0(0x12e)](DataManager[_0x570dc0(0x24b)](_0x16a9ad));}return _0x5b97c9;},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x17b)]=function(_0x1421dd,_0x2bd1d2){const _0x181b8a=_0x5a9383;if(!BattleManager[_0x181b8a(0x258)]())return;if(!BattleManager[_0x181b8a(0x232)]())return;if(this[_0x181b8a(0x139)]())return;const _0x5b336c=VisuMZ[_0x181b8a(0x1c3)][_0x181b8a(0x29b)][_0x181b8a(0x130)];!_0x5b336c['UnlimitedExploits']&&this[_0x181b8a(0x144)](!![]);if(this['stbCannotBeExploited']())return;if(this['hp']<=0x0)return;this[_0x181b8a(0x14f)](_0x5b336c);if(this['hp']>0x0||!this['isImmortal']())for(const _0xd91ad2 of this[_0x181b8a(0x1d2)]()){if(!$dataStates[_0xd91ad2])continue;this[_0x181b8a(0x143)](_0xd91ad2);}_0x5b336c['CustomJS']&&_0x5b336c[_0x181b8a(0x17a)][_0x181b8a(0x217)](this,_0x1421dd,_0x2bd1d2);if(this[_0x181b8a(0x15e)]()&&BattleManager[_0x181b8a(0x1aa)]()){const _0x2e2c15=_0x5b336c[_0x181b8a(0x26c)];_0x2e2c15>0x0&&$dataCommonEvents[_0x2e2c15]&&$gameTemp[_0x181b8a(0x264)](_0x2e2c15);}else{if(this['isEnemy']()&&BattleManager[_0x181b8a(0x207)]()){const _0xe361f0=_0x5b336c[_0x181b8a(0x1f6)];_0xe361f0>0x0&&$dataCommonEvents[_0xe361f0]&&$gameTemp['reserveCommonEvent'](_0xe361f0);}}},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x186)]=function(_0x5c9139,_0x153e3e){const _0x216cad=_0x5a9383;if(!BattleManager[_0x216cad(0x258)]())return;if(!BattleManager[_0x216cad(0x232)]())return;if(_0x153e3e['hasSTBExploited']())return;if(_0x5c9139[_0x216cad(0x139)]())return;const _0x2d8e1b=VisuMZ[_0x216cad(0x1c3)]['Settings'][_0x216cad(0x155)];!_0x2d8e1b[_0x216cad(0x273)]&&_0x153e3e[_0x216cad(0x1ad)](!![]);if(this['stbCannotBeExploiter']())return;this['displayExploitedEffects'](_0x2d8e1b);_0x2d8e1b[_0x216cad(0x1e2)]>0x0&&this['stbGainInstant'](_0x2d8e1b['ExtraActions']);for(const _0x564a99 of this[_0x216cad(0x24f)]()){if(!$dataStates[_0x564a99])continue;this[_0x216cad(0x143)](_0x564a99);}_0x2d8e1b[_0x216cad(0x17a)]&&_0x2d8e1b[_0x216cad(0x17a)][_0x216cad(0x217)](this,_0x5c9139,_0x153e3e);},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x14f)]=function(_0x3b6461){const _0x6962a9=_0x5a9383;if(!_0x3b6461)return;if(_0x3b6461[_0x6962a9(0x1ee)]){const _0x1af175=_0x3b6461[_0x6962a9(0x1ee)],_0x330382=_0x3b6461[_0x6962a9(0x25b)],_0x4899d2=_0x3b6461['Mute'];$gameTemp[_0x6962a9(0x212)]([this],_0x1af175,_0x330382,_0x4899d2);}if(this[_0x6962a9(0x22d)]()&&_0x3b6461[_0x6962a9(0x202)][_0x6962a9(0x114)]>0x0){const _0x5ebf35=_0x3b6461['PopupText'],_0x30931b={'textColor':ColorManager['getColor'](_0x3b6461['TextColor']),'flashColor':_0x3b6461[_0x6962a9(0x262)],'flashDuration':_0x3b6461['FlashDuration']};this[_0x6962a9(0x172)](_0x5ebf35,_0x30931b);}},Game_Battler[_0x5a9383(0x115)][_0x5a9383(0x24c)]=function(_0x590069){const _0xff74b5=_0x5a9383;if(!this[_0xff74b5(0x1f2)]())return;this['_actions']=this['_actions']||[];const _0x50f118=this['_actions'][_0xff74b5(0x114)]<=0x0;for(let _0x374b6b=0x0;_0x374b6b<_0x590069;_0x374b6b++){this['_actions'][_0xff74b5(0x12e)](new Game_Action(this));}this['isActor']()&&this[_0xff74b5(0x142)]()&&this[_0xff74b5(0x292)]();if(!this[_0xff74b5(0x10e)]())return;const _0x4b8c2f=this[_0xff74b5(0x1d0)]()[_0xff74b5(0x134)][_0xff74b5(0x267)](_0x106300=>this[_0xff74b5(0x158)](_0x106300));if(_0x4b8c2f[_0xff74b5(0x114)]>0x0){let _0x5c53a8;!_0x50f118&&(_0x5c53a8=this[_0xff74b5(0x159)][_0xff74b5(0x123)]()),this['selectAllActions'](_0x4b8c2f),!_0x50f118&&this[_0xff74b5(0x159)][_0xff74b5(0x11a)](_0x5c53a8);}},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x19a)]=Game_Actor[_0x5a9383(0x115)][_0x5a9383(0x160)],Game_Actor[_0x5a9383(0x115)]['selectNextCommand']=function(){const _0x1d4859=_0x5a9383;if(BattleManager[_0x1d4859(0x258)]()){if(this['battler']())this['battler']()[_0x1d4859(0x173)]();return![];}return VisuMZ['BattleSystemSTB'][_0x1d4859(0x19a)][_0x1d4859(0x217)](this);},Game_Actor[_0x5a9383(0x115)][_0x5a9383(0xfb)]=function(){const _0x3fe573=_0x5a9383,_0x346e94=this[_0x3fe573(0x180)]()[_0x3fe573(0xf9)];if(_0x346e94['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x3fe573(0x1f5);else{if(_0x346e94[_0x3fe573(0x150)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_STB_TurnOrder['Settings']['ActorBattlerType'];},Game_Actor[_0x5a9383(0x115)][_0x5a9383(0x23e)]=function(){const _0x38be6e=_0x5a9383,_0x39a737=this[_0x38be6e(0x180)]()['note'];if(_0x39a737[_0x38be6e(0x150)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x38be6e(0x24a)]();},Game_Actor[_0x5a9383(0x115)]['createTurnOrderSTBGraphicFaceIndex']=function(){const _0x78c42a=_0x5a9383,_0x229a15=this[_0x78c42a(0x180)]()['note'];if(_0x229a15[_0x78c42a(0x150)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x78c42a(0x15b)]();},Game_Actor['prototype']['createTurnOrderSTBGraphicIconIndex']=function(){const _0x4ff557=_0x5a9383,_0x2f834b=this[_0x4ff557(0x180)]()['note'];if(_0x2f834b[_0x4ff557(0x150)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder['Settings'][_0x4ff557(0x2a0)];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x220)]=Game_Actor[_0x5a9383(0x115)][_0x5a9383(0x142)],Game_Actor['prototype'][_0x5a9383(0x142)]=function(){const _0x25cd37=_0x5a9383;if(BattleManager[_0x25cd37(0x258)]()){if(this[_0x25cd37(0x281)]()&&this[_0x25cd37(0x281)]()['isAutoBattleStb']())return!![];}return VisuMZ['BattleSystemSTB']['Game_Actor_isAutoBattle']['call'](this);},Game_Action[_0x5a9383(0x115)][_0x5a9383(0x175)]=function(){const _0x4ed71a=_0x5a9383;this[_0x4ed71a(0x25a)]=!![];},Game_Action['prototype'][_0x5a9383(0x1cb)]=function(){return this['_stbAutoBattle'];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x215)]=Game_Actor['prototype'][_0x5a9383(0x292)],Game_Actor[_0x5a9383(0x115)][_0x5a9383(0x292)]=function(){const _0x2326bb=_0x5a9383;VisuMZ[_0x2326bb(0x1c3)]['Game_Actor_makeAutoBattleActions'][_0x2326bb(0x217)](this);if(BattleManager['isSTB']())for(const _0x2712fe of this[_0x2326bb(0x159)]){if(!_0x2712fe)continue;_0x2712fe[_0x2326bb(0x175)]();}},Game_Enemy['prototype'][_0x5a9383(0xfb)]=function(){const _0x50253d=_0x5a9383,_0x2db1f9=this['enemy']()['note'];if(_0x2db1f9[_0x50253d(0x150)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x50253d(0x1f5);else{if(_0x2db1f9[_0x50253d(0x150)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x50253d(0x106);}return Window_STB_TurnOrder[_0x50253d(0x29b)][_0x50253d(0x1b8)];},Game_Enemy[_0x5a9383(0x115)][_0x5a9383(0x23e)]=function(){const _0x56201f=_0x5a9383,_0x48710e=this[_0x56201f(0x1d0)]()[_0x56201f(0xf9)];if(_0x48710e[_0x56201f(0x150)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_STB_TurnOrder[_0x56201f(0x29b)][_0x56201f(0x1ff)];},Game_Enemy[_0x5a9383(0x115)][_0x5a9383(0xfd)]=function(){const _0x2cdb5a=_0x5a9383,_0x564138=this['enemy']()['note'];if(_0x564138[_0x2cdb5a(0x150)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_STB_TurnOrder['Settings'][_0x2cdb5a(0x13b)];},Game_Enemy[_0x5a9383(0x115)][_0x5a9383(0xf6)]=function(){const _0x155788=_0x5a9383,_0x50662e=this['enemy']()[_0x155788(0xf9)];if(_0x50662e['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder['Settings'][_0x155788(0x218)];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x167)]=Game_Party[_0x5a9383(0x115)][_0x5a9383(0x16b)],Game_Party[_0x5a9383(0x115)][_0x5a9383(0x16b)]=function(_0x48bd6f){const _0x162ef3=_0x5a9383;VisuMZ[_0x162ef3(0x1c3)][_0x162ef3(0x167)][_0x162ef3(0x217)](this,_0x48bd6f),SceneManager[_0x162ef3(0x1d1)]()&&BattleManager[_0x162ef3(0x258)]()&&BattleManager['_actionBattlers'][_0x162ef3(0x105)]($gameActors[_0x162ef3(0x180)](_0x48bd6f));},VisuMZ['BattleSystemSTB'][_0x5a9383(0x27e)]=Scene_Battle[_0x5a9383(0x115)][_0x5a9383(0x1c4)],Scene_Battle['prototype'][_0x5a9383(0x1c4)]=function(){const _0x3cc7f9=_0x5a9383;VisuMZ[_0x3cc7f9(0x1c3)][_0x3cc7f9(0x27e)][_0x3cc7f9(0x217)](this),BattleManager[_0x3cc7f9(0x258)]()&&this['createActorCommandWindowSTB']();},Scene_Battle[_0x5a9383(0x115)][_0x5a9383(0x1d7)]=function(){const _0xa9af9b=_0x5a9383,_0x39cb23=this[_0xa9af9b(0x28c)];this[_0xa9af9b(0x279)]()&&delete _0x39cb23['_handlers'][_0xa9af9b(0x21b)];},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x18e)]=Scene_Battle[_0x5a9383(0x115)][_0x5a9383(0x10d)],Scene_Battle['prototype']['commandCancel']=function(){const _0x3a22e3=_0x5a9383;BattleManager[_0x3a22e3(0x258)]()?this[_0x3a22e3(0x228)]():VisuMZ[_0x3a22e3(0x1c3)][_0x3a22e3(0x18e)][_0x3a22e3(0x217)](this);},Scene_Battle[_0x5a9383(0x115)][_0x5a9383(0x228)]=function(){const _0x22cea6=_0x5a9383;this[_0x22cea6(0x102)][_0x22cea6(0x253)](),this[_0x22cea6(0x28c)]['close']();},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x11d)]=Scene_Battle['prototype']['commandFight'],Scene_Battle[_0x5a9383(0x115)][_0x5a9383(0x293)]=function(){const _0x154c70=_0x5a9383;BattleManager['isSTB']()?this[_0x154c70(0x196)]():VisuMZ[_0x154c70(0x1c3)][_0x154c70(0x11d)][_0x154c70(0x217)](this);},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x284)]=Scene_Battle[_0x5a9383(0x115)][_0x5a9383(0x28a)],Scene_Battle[_0x5a9383(0x115)]['createAllWindows']=function(){const _0x22c1e4=_0x5a9383;VisuMZ[_0x22c1e4(0x1c3)][_0x22c1e4(0x284)][_0x22c1e4(0x217)](this),this[_0x22c1e4(0x199)]();},Scene_Battle[_0x5a9383(0x115)]['createSTBTurnOrderWindow']=function(){const _0xd973bd=_0x5a9383;if(!BattleManager[_0xd973bd(0x258)]())return;this['_stbTurnOrderWindow']=new Window_STB_TurnOrder();const _0x4d4d00=this[_0xd973bd(0x282)](this[_0xd973bd(0x10a)]);this[_0xd973bd(0x132)](this[_0xd973bd(0x1f9)],_0x4d4d00),this['repositionLogWindowSTB'](),BattleManager['updateTurnOrderSTB'](!![]);},Scene_Battle[_0x5a9383(0x115)]['repositionLogWindowSTB']=function(){const _0x13fd88=_0x5a9383,_0x21ee80=Window_STB_TurnOrder[_0x13fd88(0x29b)];if(_0x21ee80[_0x13fd88(0x1e6)]!==_0x13fd88(0x11e))return;if(!_0x21ee80['RepositionLogWindow'])return;if(!this[_0x13fd88(0x1a0)])return;const _0x1e56b5=this[_0x13fd88(0x1f9)]['y']-Math['round']((Graphics[_0x13fd88(0x28d)]-Graphics[_0x13fd88(0x17e)])/0x2),_0x4d52de=_0x1e56b5+this[_0x13fd88(0x1f9)]['height'];this['_logWindow']['y']=_0x4d52de+_0x21ee80[_0x13fd88(0x26a)];};function Sprite_STB_TurnOrder_Battler(){const _0x1e6b42=_0x5a9383;this[_0x1e6b42(0x157)](...arguments);}Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)]=Object[_0x5a9383(0x268)](Sprite_Clickable[_0x5a9383(0x115)]),Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x21f)]=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x157)]=function(_0x13aac6,_0x6a8a9c){const _0x43cf69=_0x5a9383;this[_0x43cf69(0x208)](_0x13aac6,_0x6a8a9c),Sprite_Clickable[_0x43cf69(0x115)][_0x43cf69(0x157)]['call'](this),this['opacity']=0x0,this[_0x43cf69(0x136)](),this[_0x43cf69(0x1c5)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x5a9383(0x208)]=function(_0x5da1c9,_0x109ae9){const _0x3f6937=_0x5a9383;this[_0x3f6937(0x1a3)]=_0x5da1c9,this[_0x3f6937(0x29f)]=_0x109ae9;const _0x5cc49e=Window_STB_TurnOrder[_0x3f6937(0x29b)],_0x3ef0d6=this[_0x3f6937(0x288)](),_0x1c5acf=this[_0x3f6937(0x18a)]();this['_positionDuration']=0x0,this[_0x3f6937(0x1e0)]=_0x3ef0d6?_0x5cc49e[_0x3f6937(0x178)]*_0x1c5acf:0x0,this[_0x3f6937(0x1bd)]=_0x3ef0d6?0x0:_0x5cc49e['SpriteThin']*_0x1c5acf,this[_0x3f6937(0x23a)]=0x0,this[_0x3f6937(0x1b7)]=0xff,this['_isAlive']=![],this[_0x3f6937(0x250)]=![],this[_0x3f6937(0x15f)]=0x0,this[_0x3f6937(0x187)]=0x0;},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x136)]=function(){const _0x2e5e0d=_0x5a9383;this[_0x2e5e0d(0x14a)](),this[_0x2e5e0d(0x235)](),this[_0x2e5e0d(0x221)](),this[_0x2e5e0d(0x274)](),this['createLetterSprite']();},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x14a)]=function(){const _0x32c6ad=_0x5a9383;this['x']=this[_0x32c6ad(0x1e0)],this['y']=this['_positionTargetY'];},Sprite_STB_TurnOrder_Battler['prototype'][_0x5a9383(0x288)]=function(){const _0x18a03f=_0x5a9383,_0x2acd5e=Window_STB_TurnOrder[_0x18a03f(0x29b)],_0x3e985d=[_0x18a03f(0x11e),'bottom'][_0x18a03f(0x108)](_0x2acd5e[_0x18a03f(0x1e6)]);return _0x3e985d;},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x20c)]=function(){const _0x4dd8ca=_0x5a9383,_0x4209c8=Window_STB_TurnOrder[_0x4dd8ca(0x29b)];return this[_0x4dd8ca(0x288)]()?_0x4209c8[_0x4dd8ca(0x178)]:_0x4209c8[_0x4dd8ca(0x25e)];},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x19c)]=function(){const _0x22bba3=_0x5a9383,_0x28bd73=Window_STB_TurnOrder['Settings'];return this['isHorz']()?_0x28bd73['SpriteLength']:_0x28bd73[_0x22bba3(0x178)];},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x242)]=function(){const _0x2f83b8=_0x5a9383;this[_0x2f83b8(0x194)]=new Bitmap(0x48,0x24);const _0x3b05d9=this[_0x2f83b8(0x22d)]()?this['battler']()[_0x2f83b8(0x1cc)]():_0x2f83b8(0x210)['format'](this['_unit'],this[_0x2f83b8(0x29f)]);this[_0x2f83b8(0x194)]['drawText'](_0x3b05d9,0x0,0x0,0x48,0x24,_0x2f83b8(0x146));},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x235)]=function(){const _0x1b3151=_0x5a9383;if(!Window_STB_TurnOrder[_0x1b3151(0x29b)]['ShowMarkerBg'])return;const _0x2f7d94=Window_STB_TurnOrder[_0x1b3151(0x29b)],_0x3aa41f=this[_0x1b3151(0x1a3)]===$gameParty?_0x1b3151(0x1db):_0x1b3151(0x104),_0x3382b1='%1SystemBg'[_0x1b3151(0x1f7)](_0x3aa41f),_0x4f5846=new Sprite();_0x4f5846[_0x1b3151(0x19e)]['x']=this[_0x1b3151(0x19e)]['x'],_0x4f5846[_0x1b3151(0x19e)]['y']=this['anchor']['y'];if(_0x2f7d94[_0x3382b1])_0x4f5846[_0x1b3151(0x194)]=ImageManager[_0x1b3151(0x1f4)](_0x2f7d94[_0x3382b1]);else{const _0x3bb1d7=this[_0x1b3151(0x20c)](),_0x683aed=this[_0x1b3151(0x19c)]();_0x4f5846['bitmap']=new Bitmap(_0x3bb1d7,_0x683aed);const _0x368cfd=ColorManager[_0x1b3151(0x278)](_0x2f7d94[_0x1b3151(0x26d)['format'](_0x3aa41f)]),_0x304a9c=ColorManager[_0x1b3151(0x278)](_0x2f7d94[_0x1b3151(0x177)['format'](_0x3aa41f)]);_0x4f5846[_0x1b3151(0x194)][_0x1b3151(0x249)](0x0,0x0,_0x3bb1d7,_0x683aed,_0x368cfd,_0x304a9c,!![]);}this[_0x1b3151(0x25d)]=_0x4f5846,this[_0x1b3151(0x13a)](this[_0x1b3151(0x25d)]),this['width']=this[_0x1b3151(0x25d)]['width'],this[_0x1b3151(0x28d)]=this['_backgroundSprite'][_0x1b3151(0x28d)];},Sprite_STB_TurnOrder_Battler['prototype'][_0x5a9383(0x221)]=function(){const _0x5a2d08=_0x5a9383,_0x1a7e3a=new Sprite();_0x1a7e3a['anchor']['x']=this[_0x5a2d08(0x19e)]['x'],_0x1a7e3a[_0x5a2d08(0x19e)]['y']=this[_0x5a2d08(0x19e)]['y'],this[_0x5a2d08(0x1df)]=_0x1a7e3a,this['addChild'](this['_graphicSprite']),this[_0x5a2d08(0x1d5)]();},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)]['createBorderSprite']=function(){const _0xb818c9=_0x5a9383;if(!Window_STB_TurnOrder[_0xb818c9(0x29b)][_0xb818c9(0x22b)])return;const _0x5eee58=Window_STB_TurnOrder[_0xb818c9(0x29b)],_0xcb8801=this[_0xb818c9(0x1a3)]===$gameParty?_0xb818c9(0x1db):'Enemy',_0x245be1=_0xb818c9(0x156)[_0xb818c9(0x1f7)](_0xcb8801),_0x4fb61f=new Sprite();_0x4fb61f['anchor']['x']=this[_0xb818c9(0x19e)]['x'],_0x4fb61f[_0xb818c9(0x19e)]['y']=this['anchor']['y'];if(_0x5eee58[_0x245be1])_0x4fb61f[_0xb818c9(0x194)]=ImageManager[_0xb818c9(0x1f4)](_0x5eee58[_0x245be1]);else{let _0x489c0c=this[_0xb818c9(0x20c)](),_0x598249=this['bitmapHeight'](),_0x5c8060=_0x5eee58[_0xb818c9(0x26f)];_0x4fb61f['bitmap']=new Bitmap(_0x489c0c,_0x598249);const _0x247bf6=_0xb818c9(0x14b),_0xb32e22=ColorManager['getColor'](_0x5eee58[_0xb818c9(0x1dc)[_0xb818c9(0x1f7)](_0xcb8801)]);_0x4fb61f[_0xb818c9(0x194)]['fillRect'](0x0,0x0,_0x489c0c,_0x598249,_0x247bf6),_0x489c0c-=0x2,_0x598249-=0x2,_0x4fb61f[_0xb818c9(0x194)][_0xb818c9(0x299)](0x1,0x1,_0x489c0c,_0x598249,_0xb32e22),_0x489c0c-=_0x5c8060*0x2,_0x598249-=_0x5c8060*0x2,_0x4fb61f[_0xb818c9(0x194)]['fillRect'](0x1+_0x5c8060,0x1+_0x5c8060,_0x489c0c,_0x598249,_0x247bf6),_0x489c0c-=0x2,_0x598249-=0x2,_0x5c8060+=0x1,_0x4fb61f[_0xb818c9(0x194)][_0xb818c9(0x2a1)](0x1+_0x5c8060,0x1+_0x5c8060,_0x489c0c,_0x598249);}this['_backgroundSprite']=_0x4fb61f,this[_0xb818c9(0x13a)](this[_0xb818c9(0x25d)]);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)]['createLetterSprite']=function(){const _0x109b3c=_0x5a9383,_0x3568b7=Window_STB_TurnOrder[_0x109b3c(0x29b)];if(!_0x3568b7[_0x109b3c(0x1c2)])return;if(this['_unit']===$gameParty)return;const _0x35ac30=this['bitmapWidth'](),_0x4f0169=this[_0x109b3c(0x19c)](),_0x3ac8d2=new Sprite();_0x3ac8d2[_0x109b3c(0x19e)]['x']=this['anchor']['x'],_0x3ac8d2[_0x109b3c(0x19e)]['y']=this[_0x109b3c(0x19e)]['y'],_0x3ac8d2['bitmap']=new Bitmap(_0x35ac30,_0x4f0169),this['_letterSprite']=_0x3ac8d2,this[_0x109b3c(0x13a)](this[_0x109b3c(0xf3)]);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x22d)]=function(){const _0x2a1e28=_0x5a9383;return this['_unit']?this[_0x2a1e28(0x1a3)][_0x2a1e28(0x12f)]()[this[_0x2a1e28(0x29f)]]:null;},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x1af)]=function(){const _0x373cdf=_0x5a9383;Sprite_Clickable[_0x373cdf(0x115)][_0x373cdf(0x1af)][_0x373cdf(0x217)](this),this[_0x373cdf(0x126)](),this[_0x373cdf(0x21d)](),this[_0x373cdf(0x1c5)](),this[_0x373cdf(0x1bc)](),this[_0x373cdf(0x1b0)](),this[_0x373cdf(0x254)](),this[_0x373cdf(0x26e)](),this['updateSelectionEffect']();},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x126)]=function(){const _0x4be4b6=_0x5a9383,_0x262887=this[_0x4be4b6(0x129)]();if(this['_position']===_0x262887)return;this[_0x4be4b6(0x1d4)]=_0x262887;this[_0x4be4b6(0x17c)]<0xff&&this[_0x4be4b6(0x22d)]()&&_0x262887!==this[_0x4be4b6(0x18a)]()&&this[_0x4be4b6(0x22e)](0xff);if(_0x262887===this[_0x4be4b6(0x18a)]()&&this[_0x4be4b6(0x23a)]<=0x0&&this['opacity']>0x0)this[_0x4be4b6(0x22e)](0x0);else this[_0x4be4b6(0x23a)]<=0x0&&this['opacity']<0xff&&this[_0x4be4b6(0x1c5)]();this['calculateTargetPositions']();},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x1ae)]=function(){const _0x1c9b54=_0x5a9383,_0x40c576=this[_0x1c9b54(0x290)]();if(!_0x40c576)return;let _0x203370=![];if(this[_0x1c9b54(0x15f)]!==_0x40c576[_0x1c9b54(0x20f)])_0x203370=!![];else this[_0x1c9b54(0x187)]!==_0x40c576[_0x1c9b54(0x28d)]&&(_0x203370=!![]);_0x203370&&this[_0x1c9b54(0x174)]();},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x174)]=function(){const _0x4d4f5a=_0x5a9383,_0x3ff21b=Window_STB_TurnOrder['Settings'],_0x1d78a3=this[_0x4d4f5a(0x288)](),_0x2a0217=_0x3ff21b[_0x4d4f5a(0x1f0)],_0x1d8692=_0x3ff21b[_0x4d4f5a(0x1e8)],_0x402fe5=SceneManager['_scene'][_0x4d4f5a(0x1f9)];if(!_0x402fe5)return;const _0x1357fb=this[_0x4d4f5a(0x129)]();this[_0x4d4f5a(0x20b)]=_0x3ff21b[_0x4d4f5a(0x271)],this[_0x4d4f5a(0x1e0)]=_0x1d78a3?_0x3ff21b['SpriteThin']*_0x1357fb:0x0,this[_0x4d4f5a(0x1bd)]=_0x1d78a3?0x0:_0x3ff21b[_0x4d4f5a(0x178)]*_0x1357fb,_0x1357fb>0x0&&(this[_0x4d4f5a(0x1e0)]+=_0x1d78a3?_0x1d8692:0x0,this[_0x4d4f5a(0x1bd)]+=_0x1d78a3?0x0:_0x1d8692),_0x2a0217?this[_0x4d4f5a(0x1e0)]=_0x1d78a3?_0x402fe5[_0x4d4f5a(0x20f)]-this[_0x4d4f5a(0x1e0)]-_0x3ff21b[_0x4d4f5a(0x178)]:0x0:this[_0x4d4f5a(0x1bd)]=_0x1d78a3?0x0:_0x402fe5[_0x4d4f5a(0x28d)]-this[_0x4d4f5a(0x1bd)]-_0x3ff21b[_0x4d4f5a(0x178)];},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x21d)]=function(){const _0x5857be=_0x5a9383;if(this[_0x5857be(0x23a)]>0x0)return;if(this[_0x5857be(0x20b)]>0x0){const _0x3acac3=this[_0x5857be(0x20b)];this['x']=(this['x']*(_0x3acac3-0x1)+this[_0x5857be(0x1e0)])/_0x3acac3,this['y']=(this['y']*(_0x3acac3-0x1)+this['_positionTargetY'])/_0x3acac3,this[_0x5857be(0x20b)]--;}if(this[_0x5857be(0x20b)]<=0x0){this['x']=this[_0x5857be(0x1e0)],this['y']=this[_0x5857be(0x1bd)];if(this[_0x5857be(0x17c)]<0xff&&!this[_0x5857be(0x149)]&&this[_0x5857be(0x23a)]<=0x0){const _0x1759a6=this[_0x5857be(0x22d)]();_0x1759a6&&(this[_0x5857be(0x1b7)]=_0x1759a6['isAlive']()&&_0x1759a6['isAppeared']()?0xff:0x0);}}},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x18a)]=function(){const _0x180d20=_0x5a9383,_0x2703dc=Window_STB_TurnOrder[_0x180d20(0x29b)],_0x7d60fb=this['isHorz']()?_0x2703dc[_0x180d20(0x183)]:_0x2703dc[_0x180d20(0x161)];return _0x7d60fb+0x1;},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x290)]=function(){const _0x3c21fa=_0x5a9383;return SceneManager[_0x3c21fa(0xf8)][_0x3c21fa(0x1f9)];},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x129)]=function(){const _0x26e63e=_0x5a9383,_0x1645a9=this[_0x26e63e(0x22d)]();if(!_0x1645a9)return this[_0x26e63e(0x18a)]();if(_0x1645a9===BattleManager['_subject'])return 0x0;if(BattleManager[_0x26e63e(0x1c1)][_0x26e63e(0x108)](_0x1645a9)){const _0x1ee308=BattleManager[_0x26e63e(0x1c1)]['indexOf'](_0x1645a9)+0x1;return _0x1ee308;}return this['defaultPosition']();},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)]['startFade']=function(_0x27a3d0){const _0xbae5a1=_0x5a9383,_0x262ace=Window_STB_TurnOrder[_0xbae5a1(0x29b)];this['_fadeDuration']=_0x262ace[_0xbae5a1(0x271)],this[_0xbae5a1(0x1b7)]=_0x27a3d0;},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x1c5)]=function(){const _0x2e8033=_0x5a9383,_0x3c4ee0=this[_0x2e8033(0x22d)]();if(!_0x3c4ee0)return;if(this[_0x2e8033(0x110)]===_0x3c4ee0[_0x2e8033(0x295)]()&&this['_isAppeared']===_0x3c4ee0[_0x2e8033(0x189)]())return;this[_0x2e8033(0x110)]=_0x3c4ee0[_0x2e8033(0x295)](),this[_0x2e8033(0x250)]=_0x3c4ee0['isAppeared']();let _0x1204f1=this[_0x2e8033(0x110)]&&this[_0x2e8033(0x250)]?0xff:0x0;this['startFade'](_0x1204f1);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x1bc)]=function(){const _0x126de9=_0x5a9383;if(this[_0x126de9(0x23a)]>0x0){const _0x1c46df=this[_0x126de9(0x23a)];this[_0x126de9(0x17c)]=(this[_0x126de9(0x17c)]*(_0x1c46df-0x1)+this[_0x126de9(0x1b7)])/_0x1c46df,this[_0x126de9(0x23a)]--,this['_fadeDuration']<=0x0&&(this['checkPosition'](),this[_0x126de9(0x20b)]=0x0,this[_0x126de9(0x21d)](),this[_0x126de9(0x17c)]=this[_0x126de9(0x1b7)]);}if(this['_isBattleOver'])return;BattleManager[_0x126de9(0x251)]===_0x126de9(0x20e)&&(this['_isBattleOver']=!![],this['startFade'](0x0));},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x1b0)]=function(){const _0x312a08=_0x5a9383,_0x9e7f41=this['battler']();if(!_0x9e7f41)return;const _0x15639e=Window_STB_TurnOrder[_0x312a08(0x29b)],_0x9d7f6d=this[_0x312a08(0x1a3)]===$gameParty?_0x312a08(0x1db):'Enemy';let _0x6cf8d0=_0x9e7f41[_0x312a08(0x1a5)]();if(_0x9e7f41[_0x312a08(0x15e)]()&&_0x6cf8d0===_0x312a08(0x1d0))_0x6cf8d0='face';else _0x9e7f41['isEnemy']()&&_0x6cf8d0==='svactor'&&(_0x6cf8d0=_0x312a08(0x1d0));if(this[_0x312a08(0x1be)]!==_0x6cf8d0)return this[_0x312a08(0x1d5)]();switch(this[_0x312a08(0x1be)]){case _0x312a08(0x1f5):if(this['_graphicFaceName']!==_0x9e7f41['TurnOrderSTBGraphicFaceName']())return this[_0x312a08(0x1d5)]();if(this['_graphicFaceIndex']!==_0x9e7f41[_0x312a08(0x1cf)]())return this[_0x312a08(0x1d5)]();break;case _0x312a08(0x106):if(this['_graphicIconIndex']!==_0x9e7f41[_0x312a08(0x181)]())return this[_0x312a08(0x1d5)]();break;case _0x312a08(0x1d0):if(_0x9e7f41[_0x312a08(0x265)]()){if(this['_graphicSv']!==_0x9e7f41[_0x312a08(0x280)]())return this['processUpdateGraphic']();}else{if(this[_0x312a08(0x1b2)]!==_0x9e7f41[_0x312a08(0x209)]())return this[_0x312a08(0x1d5)]();}break;case _0x312a08(0x10b):if(_0x9e7f41[_0x312a08(0x15e)]()){if(this[_0x312a08(0x236)]!==_0x9e7f41[_0x312a08(0x209)]())return this[_0x312a08(0x1d5)]();}else{if(this[_0x312a08(0x1b2)]!==_0x9e7f41[_0x312a08(0x209)]())return this[_0x312a08(0x1d5)]();}break;}},Sprite_STB_TurnOrder_Battler['prototype'][_0x5a9383(0x1d5)]=function(){const _0x24e752=_0x5a9383,_0x578baa=this[_0x24e752(0x22d)]();if(!_0x578baa)return;this['_graphicType']=_0x578baa[_0x24e752(0x1a5)]();if(_0x578baa['isActor']()&&this[_0x24e752(0x1be)]==='enemy')this[_0x24e752(0x1be)]=_0x24e752(0x1f5);else _0x578baa[_0x24e752(0x10e)]()&&this[_0x24e752(0x1be)]===_0x24e752(0x10b)&&(this[_0x24e752(0x1be)]='enemy');let _0x44fa27;switch(this[_0x24e752(0x1be)]){case _0x24e752(0x1f5):this[_0x24e752(0x145)]=_0x578baa[_0x24e752(0x109)](),this[_0x24e752(0x1eb)]=_0x578baa[_0x24e752(0x1cf)](),_0x44fa27=ImageManager[_0x24e752(0xfa)](this[_0x24e752(0x145)]),_0x44fa27[_0x24e752(0x26b)](this[_0x24e752(0x170)][_0x24e752(0x237)](this,_0x44fa27));break;case _0x24e752(0x106):this[_0x24e752(0x275)]=_0x578baa[_0x24e752(0xf6)](),_0x44fa27=ImageManager['loadSystem'](_0x24e752(0x1ed)),_0x44fa27[_0x24e752(0x26b)](this[_0x24e752(0x229)]['bind'](this,_0x44fa27));break;case'enemy':if(_0x578baa[_0x24e752(0x265)]())this[_0x24e752(0x236)]=_0x578baa[_0x24e752(0x280)](),_0x44fa27=ImageManager[_0x24e752(0x14c)](this[_0x24e752(0x236)]),_0x44fa27[_0x24e752(0x26b)](this[_0x24e752(0x137)][_0x24e752(0x237)](this,_0x44fa27));else $gameSystem['isSideView']()?(this[_0x24e752(0x1b2)]=_0x578baa[_0x24e752(0x209)](),_0x44fa27=ImageManager[_0x24e752(0x148)](this[_0x24e752(0x1b2)]),_0x44fa27[_0x24e752(0x26b)](this[_0x24e752(0x213)][_0x24e752(0x237)](this,_0x44fa27))):(this[_0x24e752(0x1b2)]=_0x578baa[_0x24e752(0x209)](),_0x44fa27=ImageManager[_0x24e752(0x18d)](this['_graphicEnemy']),_0x44fa27[_0x24e752(0x26b)](this[_0x24e752(0x213)][_0x24e752(0x237)](this,_0x44fa27)));break;case'svactor':this[_0x24e752(0x236)]=_0x578baa[_0x24e752(0x209)](),_0x44fa27=ImageManager[_0x24e752(0x14c)](this[_0x24e752(0x236)]),_0x44fa27['addLoadListener'](this[_0x24e752(0x137)][_0x24e752(0x237)](this,_0x44fa27));break;}},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)]['changeFaceGraphicBitmap']=function(_0x14ff7d){const _0x383815=_0x5a9383,_0x3091f3=this[_0x383815(0x1eb)],_0x45a045=this[_0x383815(0x20c)](),_0xef51c9=this[_0x383815(0x19c)](),_0x5de823=Math[_0x383815(0x1b4)](_0x45a045,_0xef51c9);this[_0x383815(0x1df)][_0x383815(0x194)]=new Bitmap(_0x45a045,_0xef51c9);const _0x2dcb46=this['_graphicSprite'][_0x383815(0x194)],_0x376dc3=ImageManager['faceWidth'],_0x21fffa=ImageManager[_0x383815(0x188)],_0x56f527=_0x5de823/Math[_0x383815(0x1b4)](_0x376dc3,_0x21fffa),_0x4534cd=ImageManager[_0x383815(0x216)],_0x57857f=ImageManager[_0x383815(0x188)],_0x3231a1=_0x3091f3%0x4*_0x376dc3+(_0x376dc3-_0x4534cd)/0x2,_0x557ac6=Math[_0x383815(0x23d)](_0x3091f3/0x4)*_0x21fffa+(_0x21fffa-_0x57857f)/0x2,_0x27c9c9=(_0x45a045-_0x376dc3*_0x56f527)/0x2,_0x7c2ec3=(_0xef51c9-_0x21fffa*_0x56f527)/0x2;_0x2dcb46['blt'](_0x14ff7d,_0x3231a1,_0x557ac6,_0x4534cd,_0x57857f,_0x27c9c9,_0x7c2ec3,_0x5de823,_0x5de823);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x229)]=function(_0x1c6090){const _0x17e429=_0x5a9383,_0x583170=this[_0x17e429(0x275)],_0x3a7133=this[_0x17e429(0x20c)](),_0x2d2f85=this[_0x17e429(0x19c)]();this[_0x17e429(0x1df)][_0x17e429(0x194)]=new Bitmap(_0x3a7133,_0x2d2f85);const _0x42c53f=this[_0x17e429(0x1df)][_0x17e429(0x194)],_0x449c0c=ImageManager['iconWidth'],_0x21aaef=ImageManager[_0x17e429(0x100)],_0x20ae9b=Math[_0x17e429(0x122)](_0x449c0c,_0x21aaef,_0x3a7133,_0x2d2f85),_0x18b777=_0x583170%0x10*_0x449c0c,_0x5926b0=Math[_0x17e429(0x23d)](_0x583170/0x10)*_0x21aaef,_0xca8076=Math[_0x17e429(0x23d)](Math['max'](_0x3a7133-_0x20ae9b,0x0)/0x2),_0x478275=Math['floor'](Math[_0x17e429(0x1b4)](_0x2d2f85-_0x20ae9b,0x0)/0x2);_0x42c53f['blt'](_0x1c6090,_0x18b777,_0x5926b0,_0x449c0c,_0x21aaef,_0xca8076,_0x478275,_0x20ae9b,_0x20ae9b);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x137)]=function(_0x1697e3){const _0x5a19cb=_0x5a9383,_0x4854a8=this[_0x5a19cb(0x20c)](),_0x4af59e=this['bitmapHeight'](),_0x2ab731=Math[_0x5a19cb(0x122)](_0x4854a8,_0x4af59e);this['_graphicSprite'][_0x5a19cb(0x194)]=new Bitmap(_0x4854a8,_0x4af59e);const _0x1e6216=this['_graphicSprite'][_0x5a19cb(0x194)],_0x576c71=this[_0x5a19cb(0x236)][_0x5a19cb(0x150)](/\$/i),_0x1f7e30=_0x576c71?0x1:ImageManager[_0x5a19cb(0x260)],_0x4b17a0=_0x576c71?0x1:ImageManager[_0x5a19cb(0x233)],_0x3fa7a5=_0x1697e3['width']/_0x1f7e30,_0x2d0f7e=_0x1697e3[_0x5a19cb(0x28d)]/_0x4b17a0,_0x156adf=Math['min'](0x1,_0x2ab731/_0x3fa7a5,_0x2ab731/_0x2d0f7e),_0x11784c=_0x3fa7a5*_0x156adf,_0x494dec=_0x2d0f7e*_0x156adf,_0x161b15=Math[_0x5a19cb(0x1e4)]((_0x4854a8-_0x11784c)/0x2),_0x383cf2=Math[_0x5a19cb(0x1e4)]((_0x4af59e-_0x494dec)/0x2);_0x1e6216[_0x5a19cb(0x24d)](_0x1697e3,0x0,0x0,_0x3fa7a5,_0x2d0f7e,_0x161b15,_0x383cf2,_0x11784c,_0x494dec);},Sprite_STB_TurnOrder_Battler['prototype'][_0x5a9383(0x213)]=function(_0x227833){const _0x13f9a0=_0x5a9383,_0x2232ac=Window_STB_TurnOrder[_0x13f9a0(0x29b)],_0x30807a=this[_0x13f9a0(0x20c)](),_0x2cab7f=this['bitmapHeight'](),_0x50e820=Math[_0x13f9a0(0x122)](_0x30807a,_0x2cab7f);this[_0x13f9a0(0x1df)]['bitmap']=new Bitmap(_0x30807a,_0x2cab7f);const _0x1c680b=this['_graphicSprite'][_0x13f9a0(0x194)],_0x19ecca=Math['min'](0x1,_0x50e820/_0x227833['width'],_0x50e820/_0x227833[_0x13f9a0(0x28d)]),_0x16df88=_0x227833['width']*_0x19ecca,_0x31653a=_0x227833[_0x13f9a0(0x28d)]*_0x19ecca,_0x54c85b=Math[_0x13f9a0(0x1e4)]((_0x30807a-_0x16df88)/0x2),_0x5323f9=Math[_0x13f9a0(0x1e4)]((_0x2cab7f-_0x31653a)/0x2);_0x1c680b['blt'](_0x227833,0x0,0x0,_0x227833[_0x13f9a0(0x20f)],_0x227833[_0x13f9a0(0x28d)],_0x54c85b,_0x5323f9,_0x16df88,_0x31653a);},Sprite_STB_TurnOrder_Battler['prototype'][_0x5a9383(0x254)]=function(){const _0x4b7686=_0x5a9383,_0x5f347b=this['battler']();if(!_0x5f347b)return;if(!_0x5f347b[_0x4b7686(0x10e)]())return;if(this[_0x4b7686(0x1c8)]===_0x5f347b[_0x4b7686(0x239)]())return;this[_0x4b7686(0x1c8)]=_0x5f347b[_0x4b7686(0x239)](),this['_graphicSprite']['setHue'](_0x5f347b[_0x4b7686(0x265)]()?0x0:this[_0x4b7686(0x1c8)]);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x26e)]=function(){const _0x20395b=_0x5a9383;if(!this[_0x20395b(0xf3)])return;const _0x28335d=this[_0x20395b(0x22d)]();if(!_0x28335d)return;if(this[_0x20395b(0x27d)]===_0x28335d['_letter']&&this[_0x20395b(0x1e7)]===_0x28335d['_plural'])return;this[_0x20395b(0x27d)]=_0x28335d[_0x20395b(0x27d)],this['_plural']=_0x28335d['_plural'];const _0x21ac58=Window_STB_TurnOrder[_0x20395b(0x29b)],_0x40eaed=this['isHorz'](),_0x51d1e6=this['bitmapWidth'](),_0x3b4f40=this[_0x20395b(0x19c)](),_0x3c99e5=this[_0x20395b(0xf3)]['bitmap'];_0x3c99e5[_0x20395b(0x15a)]();if(!this['_plural'])return;_0x3c99e5[_0x20395b(0x270)]=_0x21ac58[_0x20395b(0x29c)]||$gameSystem[_0x20395b(0x276)](),_0x3c99e5[_0x20395b(0x1a4)]=_0x21ac58['EnemyBattlerFontSize']||0x10,_0x40eaed?_0x3c99e5[_0x20395b(0x283)](this['_letter'][_0x20395b(0x1ab)](),0x0,_0x3b4f40/0x2,_0x51d1e6,_0x3b4f40/0x2,_0x20395b(0x146)):_0x3c99e5['drawText'](this[_0x20395b(0x27d)][_0x20395b(0x1ab)](),0x0,0x2,_0x51d1e6-0x8,_0x3b4f40-0x4,_0x20395b(0x18f));},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x140)]=function(){const _0x442fdf=_0x5a9383,_0x4e3bfe=this[_0x442fdf(0x22d)]();if(!_0x4e3bfe)return;const _0xa37eb4=_0x4e3bfe[_0x442fdf(0x22d)]();if(!_0xa37eb4)return;const _0x4f86f2=_0xa37eb4[_0x442fdf(0x298)]();if(!_0x4f86f2)return;this[_0x442fdf(0x16c)](_0x4f86f2[_0x442fdf(0x23c)]);},Sprite_STB_TurnOrder_Battler[_0x5a9383(0x115)][_0x5a9383(0x1bf)]=function(){const _0x486ce3=_0x5a9383;return this[_0x486ce3(0x22d)]();},VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x1ce)]=Window_Help[_0x5a9383(0x115)][_0x5a9383(0x14d)],Window_Help[_0x5a9383(0x115)]['setItem']=function(_0xee97f5){const _0x55c58d=_0x5a9383;BattleManager[_0x55c58d(0x258)]()&&_0xee97f5&&_0xee97f5[_0x55c58d(0xf9)]&&_0xee97f5[_0x55c58d(0xf9)]['match'](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ[_0x55c58d(0x1c3)][_0x55c58d(0x1ce)]['call'](this,_0xee97f5);};function _0x4be3(_0x26c026,_0x43b219){const _0x1a54c9=_0x1a54();return _0x4be3=function(_0x4be3e7,_0x328cb9){_0x4be3e7=_0x4be3e7-0xf0;let _0x3ed00f=_0x1a54c9[_0x4be3e7];return _0x3ed00f;},_0x4be3(_0x26c026,_0x43b219);}function Window_STB_TurnOrder(){const _0x144063=_0x5a9383;this[_0x144063(0x157)](...arguments);}Window_STB_TurnOrder[_0x5a9383(0x115)]=Object['create'](Window_Base[_0x5a9383(0x115)]),Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x21f)]=Window_STB_TurnOrder,Window_STB_TurnOrder[_0x5a9383(0x29b)]=VisuMZ[_0x5a9383(0x1c3)][_0x5a9383(0x29b)][_0x5a9383(0x11b)],Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x157)]=function(){const _0xd1b028=_0x5a9383,_0x2f6c98=this['windowRect']();this[_0xd1b028(0x21a)](_0x2f6c98),Window_Base[_0xd1b028(0x115)][_0xd1b028(0x157)][_0xd1b028(0x217)](this,_0x2f6c98),this['createBattlerSprites'](),this[_0xd1b028(0x1ca)](),this['opacity']=0x0;},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x272)]=function(){const _0x58466d=_0x5a9383;return this[_0x58466d(0x263)]($gameParty[_0x58466d(0x201)](),0x9,!![]);},Window_STB_TurnOrder[_0x5a9383(0x115)]['initHomePositions']=function(_0x535ff4){const _0x5c1e78=_0x5a9383;this[_0x5c1e78(0x277)]=this[_0x5c1e78(0x12b)]=_0x535ff4['x'],this[_0x5c1e78(0x117)]=this[_0x5c1e78(0x19d)]=_0x535ff4['y'],this['_fullWidth']=_0x535ff4[_0x5c1e78(0x20f)],this[_0x5c1e78(0x107)]=_0x535ff4[_0x5c1e78(0x28d)],this[_0x5c1e78(0x222)]=0x0;},Window_STB_TurnOrder[_0x5a9383(0x115)]['createBattlerRect']=function(_0x206ffa,_0x463b97,_0x9be356){const _0x5aa5c5=_0x5a9383,_0x682f43=Window_STB_TurnOrder['Settings'],_0xe73321=this[_0x5aa5c5(0x288)]()?_0x682f43[_0x5aa5c5(0x183)]:_0x682f43[_0x5aa5c5(0x161)],_0x10cfee=Math['min'](_0xe73321,_0x206ffa+_0x463b97),_0x30ae8a=SceneManager[_0x5aa5c5(0xf8)][_0x5aa5c5(0x234)][_0x5aa5c5(0x28d)],_0x19a6b2=SceneManager[_0x5aa5c5(0xf8)][_0x5aa5c5(0x10f)][_0x5aa5c5(0x28d)],_0x2971c3=_0x682f43['SubjectDistance'],_0x1db2c4=Graphics['height']-_0x30ae8a-_0x19a6b2;let _0x26f641=0x0,_0x216210=0x0,_0x304c69=0x0,_0x5e83cf=0x0;switch(_0x682f43[_0x5aa5c5(0x1e6)]){case _0x5aa5c5(0x11e):_0x26f641=_0x682f43['SpriteThin']*_0x10cfee+_0x2971c3,_0x216210=_0x682f43[_0x5aa5c5(0x25e)],_0x304c69=Math[_0x5aa5c5(0x224)]((Graphics[_0x5aa5c5(0x20f)]-_0x26f641)/0x2),_0x5e83cf=_0x682f43[_0x5aa5c5(0x26a)];break;case _0x5aa5c5(0x119):_0x26f641=_0x682f43['SpriteThin']*_0x10cfee+_0x2971c3,_0x216210=_0x682f43[_0x5aa5c5(0x25e)],_0x304c69=Math[_0x5aa5c5(0x224)]((Graphics[_0x5aa5c5(0x20f)]-_0x26f641)/0x2),_0x5e83cf=Graphics['height']-_0x30ae8a-_0x216210-_0x682f43['ScreenBuffer'];break;case _0x5aa5c5(0x297):_0x26f641=_0x682f43['SpriteLength'],_0x216210=_0x682f43[_0x5aa5c5(0x178)]*_0x10cfee+_0x2971c3,_0x304c69=_0x682f43[_0x5aa5c5(0x26a)],_0x5e83cf=Math[_0x5aa5c5(0x224)]((_0x1db2c4-_0x216210)/0x2),_0x5e83cf+=_0x19a6b2;break;case _0x5aa5c5(0x18f):_0x26f641=_0x682f43[_0x5aa5c5(0x25e)],_0x216210=_0x682f43['SpriteThin']*_0x10cfee+_0x2971c3,_0x304c69=Graphics['width']-_0x26f641-_0x682f43[_0x5aa5c5(0x26a)],_0x5e83cf=Math[_0x5aa5c5(0x224)]((_0x1db2c4-_0x216210)/0x2),_0x5e83cf+=_0x19a6b2;break;}if(!_0x9be356){const _0x58c7db=Window_STB_TurnOrder[_0x5aa5c5(0x29b)][_0x5aa5c5(0x1f0)];let _0x27ff3c=Math['min'](_0xe73321,Math[_0x5aa5c5(0x122)]($gameParty[_0x5aa5c5(0x201)]()+0x8)-_0x10cfee);switch(_0x682f43[_0x5aa5c5(0x1e6)]){case _0x5aa5c5(0x11e):case _0x5aa5c5(0x119):_0x58c7db&&(_0x304c69-=_0x27ff3c*_0x682f43[_0x5aa5c5(0x178)]);break;}}return _0x304c69+=_0x682f43['DisplayOffsetX'],_0x5e83cf+=_0x682f43[_0x5aa5c5(0x112)],new Rectangle(_0x304c69,_0x5e83cf,_0x26f641,_0x216210);},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x1fa)]=function(){const _0x37d06a=_0x5a9383;this[_0x37d06a(0x1b5)]=0x0;},Window_STB_TurnOrder[_0x5a9383(0x115)]['isHorz']=function(){const _0x562f1c=_0x5a9383,_0x47ed52=Window_STB_TurnOrder['Settings'],_0x35d923=[_0x562f1c(0x11e),_0x562f1c(0x119)]['includes'](_0x47ed52[_0x562f1c(0x1e6)]);return _0x35d923;},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x16f)]=function(){const _0x5601ac=_0x5a9383;this[_0x5601ac(0x16a)]=new Sprite(),this[_0x5601ac(0x1a9)](this['_turnOrderInnerSprite']),this['_turnOrderContainer']=[];for(let _0x3440ac=0x0;_0x3440ac<$gameParty['maxBattleMembers']();_0x3440ac++){const _0x1f0490=new Sprite_STB_TurnOrder_Battler($gameParty,_0x3440ac);this[_0x5601ac(0x16a)][_0x5601ac(0x13a)](_0x1f0490),this[_0x5601ac(0xfe)][_0x5601ac(0x12e)](_0x1f0490);}for(let _0x8c28b9=0x0;_0x8c28b9<$gameTroop[_0x5601ac(0x12f)]()['length'];_0x8c28b9++){const _0x414b63=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x8c28b9);this[_0x5601ac(0x16a)][_0x5601ac(0x13a)](_0x414b63),this['_turnOrderContainer'][_0x5601ac(0x12e)](_0x414b63);}},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x1af)]=function(){const _0x2b960b=_0x5a9383;Window_Base[_0x2b960b(0x115)][_0x2b960b(0x1af)][_0x2b960b(0x217)](this),this['updateHomePosition'](),this['updatePosition'](),this[_0x2b960b(0xf0)](),this[_0x2b960b(0x1f3)](),this['updateVisibility']();},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x1ba)]=function(){const _0x28ac98=_0x5a9383;if(this[_0x28ac98(0x222)]>0x0){const _0x2910fc=this[_0x28ac98(0x222)];this['_homeX']=(this[_0x28ac98(0x12b)]*(_0x2910fc-0x1)+this[_0x28ac98(0x277)])/_0x2910fc,this[_0x28ac98(0x19d)]=(this[_0x28ac98(0x19d)]*(_0x2910fc-0x1)+this['_targetHomeY'])/_0x2910fc,this[_0x28ac98(0x222)]--,this[_0x28ac98(0x222)]<=0x0&&(this['_homeX']=this['_targetHomeX'],this['_homeY']=this[_0x28ac98(0x117)]);}},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x21d)]=function(){const _0x1419a6=_0x5a9383,_0x497d11=Window_STB_TurnOrder[_0x1419a6(0x29b)];if(_0x497d11['DisplayPosition']!=='top')return;if(!_0x497d11[_0x1419a6(0x1e9)])return;const _0x262fb7=SceneManager[_0x1419a6(0xf8)][_0x1419a6(0x10f)];if(!_0x262fb7)return;_0x262fb7[_0x1419a6(0x1ef)]?(this['x']=this[_0x1419a6(0x12b)]+(_0x497d11[_0x1419a6(0xf7)]||0x0),this['y']=this[_0x1419a6(0x19d)]+(_0x497d11['RepositionTopHelpY']||0x0)):(this['x']=this[_0x1419a6(0x12b)],this['y']=this[_0x1419a6(0x19d)]);const _0x1b36ee=SceneManager[_0x1419a6(0xf8)][_0x1419a6(0x10a)];Window_STB_TurnOrder['_ogWindowLayerX']===undefined&&(Window_STB_TurnOrder[_0x1419a6(0x1d3)]=Math[_0x1419a6(0x1e4)]((Graphics[_0x1419a6(0x20f)]-Math[_0x1419a6(0x122)](Graphics[_0x1419a6(0x1f1)],_0x1b36ee['width']))/0x2),Window_STB_TurnOrder[_0x1419a6(0x121)]=Math[_0x1419a6(0x1e4)]((Graphics[_0x1419a6(0x28d)]-Math[_0x1419a6(0x122)](Graphics[_0x1419a6(0x17e)],_0x1b36ee[_0x1419a6(0x28d)]))/0x2)),this['x']+=_0x1b36ee['x']-Window_STB_TurnOrder[_0x1419a6(0x1d3)],this['y']+=_0x1b36ee['y']-Window_STB_TurnOrder[_0x1419a6(0x121)];},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0xf0)]=function(){const _0x2e85c8=_0x5a9383,_0x562421=Window_STB_TurnOrder[_0x2e85c8(0x29b)];if([_0x2e85c8(0x11e)]['includes'](_0x562421[_0x2e85c8(0x1e6)]))return;this['x']=this[_0x2e85c8(0x12b)],this['y']=this[_0x2e85c8(0x19d)];const _0x5b4773=SceneManager['_scene'][_0x2e85c8(0x10a)];this['x']+=_0x5b4773['x'],this['y']+=_0x5b4773['y'];},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x1f3)]=function(){const _0x32349c=_0x5a9383;if(!this['_turnOrderInnerSprite'])return;const _0x316831=this[_0x32349c(0x16a)][_0x32349c(0x120)];if(!_0x316831)return;_0x316831['sort'](this[_0x32349c(0x266)][_0x32349c(0x237)](this));},Window_STB_TurnOrder['prototype'][_0x5a9383(0x266)]=function(_0x18833f,_0x5bb921){const _0x355db5=_0x5a9383,_0x4b1be3=this[_0x355db5(0x288)](),_0x3acff0=Window_STB_TurnOrder[_0x355db5(0x29b)][_0x355db5(0x1f0)];if(_0x4b1be3&&!_0x3acff0)return _0x18833f['x']-_0x5bb921['x'];else{if(_0x4b1be3&&_0x3acff0)return _0x5bb921['x']-_0x18833f['x'];else{if(!_0x4b1be3&&_0x3acff0)return _0x18833f['y']-_0x5bb921['y'];else{if(!_0x4b1be3&&!_0x3acff0)return _0x5bb921['y']-_0x18833f['y'];}}}},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x1ca)]=function(){const _0x223b26=_0x5a9383;this[_0x223b26(0x1ef)]=$gameSystem[_0x223b26(0x226)]();},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0xf5)]=function(_0x17026b){const _0x87fb84=_0x5a9383;this[_0x87fb84(0xfe)][_0x87fb84(0x1b6)]((_0x10d076,_0x43ef73)=>{const _0x45bc6c=_0x87fb84;return _0x10d076[_0x45bc6c(0x129)]()-_0x43ef73[_0x45bc6c(0x129)]();}),this[_0x87fb84(0x1d9)]();if(!_0x17026b)return;for(const _0x1cd04b of this[_0x87fb84(0xfe)]){if(!_0x1cd04b)continue;_0x1cd04b[_0x87fb84(0x1af)](),_0x1cd04b[_0x87fb84(0x20b)]=0x0;}},Window_STB_TurnOrder[_0x5a9383(0x115)][_0x5a9383(0x1d9)]=function(){const _0x4b4624=_0x5a9383;if(!this[_0x4b4624(0x288)]())return;const _0xc721e0=VisuMZ['BattleSystemSTB']['Settings'][_0x4b4624(0x11b)];if(!_0xc721e0['CenterHorz'])return;const _0x11a36e=$gameParty['members']()[_0x4b4624(0x267)](_0x39be72=>_0x39be72&&_0x39be72[_0x4b4624(0x295)]()&&_0x39be72['isAppeared']())[_0x4b4624(0x114)],_0x5a2dc1=$gameTroop[_0x4b4624(0x12f)]()[_0x4b4624(0x267)](_0x44e40e=>_0x44e40e&&_0x44e40e[_0x4b4624(0x295)]()&&_0x44e40e[_0x4b4624(0x189)]())[_0x4b4624(0x114)],_0x1cd184=this['createBattlerRect'](_0x11a36e,_0x5a2dc1);this[_0x4b4624(0x277)]=_0x1cd184['x'],this[_0x4b4624(0x117)]=_0x1cd184['y'],(this[_0x4b4624(0x277)]!==this[_0x4b4624(0x12b)]||this[_0x4b4624(0x117)]!==this[_0x4b4624(0x19d)])&&(this[_0x4b4624(0x222)]=_0xc721e0[_0x4b4624(0x271)]);};