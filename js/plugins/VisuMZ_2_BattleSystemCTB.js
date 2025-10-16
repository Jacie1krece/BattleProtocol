//=============================================================================
// VisuStella MZ - Battle System - CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.24] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
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
 * Update Settings
 * 
 *   Adjust Similar AGI:
 *   - v1.22 update. Adjust turn order calculations for battlers with very
 *     similar AGI.
 * 
 *   Force Active Slot:
 *   - v1.24 update. Force active battler to the active slot.
 *   - This can be used to offset calculations that are too miniscule.
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
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
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
 * Version 1.24: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Parameters > Turn Order Settings > Updates > Adjust Similar AGI
 * **** v1.22 update. Adjust turn order calculations for battlers with very
 *      similar AGI.
 * *** Parameters > Turn Order Settings > Updates > Force Active Slot
 * **** v1.24 update. Force active battler to the active slot. This can be used
 *      to offset calculations that are too miniscule.
 * 
 * Version 1.23: July 18, 2024
 * * Bug Fixes!
 * ** Fixed a softlock that is caused from surprise attacks involving 100% CTB
 *    After Speed. Fix made by Olivia.
 * 
 * Version 1.22: July 13, 2023
 * * Bug Fixes!
 * ** Fixed turn order gauge sprite swapping bug for battlers with similar AGI
 *    values. Fix made by Olivia.
 * 
 * Version 1.21: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the CTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <CTB After Speed: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS CTB After Speed> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: May 2, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: April 28, 2022
 * * Feature Update!
 * ** Added update for CTB-specific idle time to allow a more consistent turn
 *    end processing for actors and enemies with higher than normal AGI values.
 *    Update made by Olivia.
 * 
 * Version 1.15: April 21, 2022
 * * Bug Fixes!
 * ** The endless softlock has been fixed! Much thanks to AndyL for providing a
 *    project that can easily replicate it! Fix made by Yanfly.
 * * Feature Update!
 * ** Slightly more accurate turn order forecasting. However, there is only so
 *    much I can do due to JavaScript's "accuracy" with decimal values. Update
 *    made by Yanfly.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Updated anti-softlock check at 180 frames (3 seconds) to automatically
 *    clear any battle states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 300 frames (5 seconds) to automatically
 *    clear all states to see if they're the cause of the hangup.
 * ** Updated anti-softlock check at 600 frames (10 seconds) to automatically
 *    abort the battle to salvage the game from freezing.
 * 
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 *
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
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
 * @param Updates
 * @text Update Settings
 *
 * @param SimilarAgi:eval
 * @text Adjust Similar AGI
 * @parent Updates
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc v1.22 update. Adjust turn order calculations for battlers
 * with very similar AGI.
 * @default true
 *
 * @param ForceSubject:eval
 * @text Force Active Slot
 * @parent Updates
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc v1.24 update. Force active battler to the active slot.
 * This can be used to offset calculations that are too miniscule.
 * @default true
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
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
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

function _0x502a(){const _0x174bb6=['_positionDuration','FaceName','updatePadding','%1SystemBorder','iconWidth','ceil','windowRect','_turnOrderInnerSprite','updateTpbCastTimeCTB','410jXDiQk','setItem','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','name','tpbRelativeSpeed','fillRect','onBattleStart','Effect','_positionTargetY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','faceHeight','appear','createTurnOrderCTBGraphicIconIndex','OrderDirection','clearRect','isAppeared','clearTpbChargeTimeCTB','_tpbCastTime','ShowMarkerBorder','match','SubjectDistance','_onRestrictBypassCtbReset','enemy','isSceneBattle','BattleManager_updateAllTpbBattlers','acting','battleSys','Game_Battler_onRestrict','isPlaytest','isActiveTpb','updateTpbInput','4705295IPPuRK','TotalHorzSprites','createTurnOrderCTBGraphicType','EnemyBattlerFontFace','STRUCT','updateTpbIdleTime','%1BgColor2','log','ActorBattlerType','BattleManager_updateTpb','setCtbAfterSpeed','_actionState','item','%1AnimationID','subject','_isAlive','Scene_Boot_onDatabaseLoaded','After','_fadeTarget','return\x200','icon','exit','includes','Window_StatusBase_placeGauge','updateTurnOrder','_ctbTurnOrderWindow','startAction','isSideView','setCtbChargeTime','BattleManager_startActorInput','isCTB','Scene_Battle_createAllWindows','RepositionTopHelpY','_subject','Scene_Battle_selectNextCommand','updateTpbIdleTimeCTB','_helpWindow','STR','min','createLetterSprite','hide','DisplayPosition','bitmapHeight','_phase','Mechanics','clamp','updateSelectionEffect','blt','DisplayOffsetY','processAbort','isActor','EnemyBattlerFontSize','_plural','applyCTBPenalty','CTB','applyGlobal','TotalVertSprites','trim','Game_Battler_tpbSpeed','skills','#000000','VisuMZ_1_BattleCore','ready','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_blendColor','bitmap','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_dupe','changeCtbChargeTime','TurnOrder','ctbHasInstantActionAfter','startFade','onTpbCharged','IconSet','Game_Battler_tpbBaseSpeed','_tpbTurnCount','BattleManager_isTpb','version','IconIndex','_graphicType','_ogWindowLayerY','updateTurn','isBattleSystemCTBTurnOrderVisible','tpbRequiredCastTime','Game_Battler_applyTpbPenalty','_fadeDuration','TurnOrderCTBGraphicType','padding','Game_Battler_updateTpbIdleTime','initTpbChargeTime','isPassCTB','isTpbCharged','isAlive','_letter','changeEnemyGraphicBitmap','changeTurnOrderByCTB','ActorBattlerIcon','updatePosition','call','updateBattleContainerOrder','Game_Battler_initTpbChargeTime','_graphicFaceIndex','initialize','ARRAYSTRUCT','filter','toUpperCase','length','processTurn','battler','%1Mirror','createBattlerSprites','createRateJS','selectNextCommand','_isAppeared','prototype','numActions','_graphicSv','TpbCastTimeJS','DeviceFriendly','processTurnCTB','find','CtbTurnOrderEnemyIcon','svActorHorzCells','gradientFillRect','svActorVertCells','%1Mute','loadSvActor','getBattleSystem','setCtbCastTime','isCtbChargingState','createGraphicSprite','clearTurnOrderCTBGraphics','Game_Battler_tpbAcceleration','updateTpbBattler','charging','Settings','Rush','_unit','isHorz','CtbTurnOrderClearEnemyGraphic','_statusWindow','_turnOrderContainer','EnemyBattlerFaceName','SpriteLength','%1FlashColor','tpbChargeTime','updateTpbCtb','createBorderSprite','tpbAcceleration','round','setTurnOrderCTB','ARRAYNUM','SystemTurnOrderVisibility','BattleManager_updateTurn','updateTpbChargeTime','process_VisuMZ_BattleSystemCTB_CreateRegExp','isCommonEventReserved','setActionState','BorderThickness','applyGlobalBattleSystemCTBEffects','CtbTurnOrderActorIcon','description','maxBattleMembers','Game_Battler_clearTpbChargeTime','Game_Battler_updateTpb','getCtbCastTimeRate','postEndActionCTB','removeBattleStates','faceIndex','battlerHue','checkPosition','svBattlerName','processTurnOrderChangeCTB','sort','VisuMZ_0_CoreEngine','_letterSprite','ParseItemNotetags','_antiCtbSoftlockInstantActionAfter','rotateCTBSprite','createCTBTurnOrderWindow','clear','bottom','_position','battleEnd','isEnemy','(?:CTB)','getColor','actor','defaultPosition','ticksLeft','isActing','createChildren','FaceIndex','_ctbTurnOrderVisible','turn','applyItemBattleSystemCTBUserEffect','isSubject','top','loadFace','parameters','_forcing','isRestricted','clearStates','placeGauge','_graphicEnemy','checkOpacity','preEndActionCTB','EnemyBattlerIcon','_anti_CTB_SoftlockCount','79074vTZEzm','EVAL','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','EnemyBattlerType','Parse_Notetags_CreateJS','Game_Battler_updateTpbChargeTime','changeFaceGraphicBitmap','allBattleMembers','ctbTicksToGoal','BattleManager_battleSys','BattleSystemCTB','BattleManager_updateTpbInput','drawText','_graphicFaceName','ctbTicksToGoalAddedCastTime','right','_graphicSprite','_ctbAfterSpeed','setBattleSystemCTBTurnOrderVisible','createTurnOrderCTBGraphicFaceIndex','traitObjects','Game_Battler_tpbRelativeSpeed','loadEnemy','BattleManager_startBattle','Actors','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','createTurnOrderCTBGraphicFaceName','fontSize','iconHeight','startBattle','isAttack','updateAllTpbBattlersCTB','_windowLayer','constructor','concat','15gfrOUk','updateGraphic','%1TextColor','RegExp','Game_Battler_updateTpbCastTime','JSON','_ctbTurnOrderGraphicType','Game_Action_applyGlobal','ParseSkillNotetags','anchor','isCtbCastingState','Enemy','CtbTurnOrderEnemyFace','status','parse','_isBattleOver','_logWindow','time','Actor-%1-%2','initMembers','_actionBattlers','createKeyJS','max','Window_Help_setItem','RepositionLogWindow','bind','undecided','changeSvActorGraphicBitmap','initBattleSystemCTB','members','indexOf','reduce','_ctbTurnOrderIconIndex','endAction','_backgroundSprite','setupTextPopup','currentAction','applyTpbPenalty','Game_System_initialize','opacity','applyBattleSystemCTBUserEffect','repositionLogWindowCTB','_ctbTurnOrderFaceName','initTpbChargeTimeCTB','svactor','_index','battlerName','BattleManager_isActiveTpb','getStateTooltipBattler','ParseAllNotetags','Charge','_ogWindowLayerX','ConvertParams','Order','mainFontFace','otherCtbChecksPassed','onCtbOrderChange','requestFauxAnimation','_positionTargetX','hasSvBattler','Enemies','NUM','ScreenBuffer','MIN_SAFE_INTEGER','children','addLoadListener','12066HXHibC','%1SystemBg','Cast','changeCtbCastTime','startActorInput','addChild','45012vfiuMV','floor','compareBattlerSprites','getCurrentTurnOrderPositionCTB','attackSpeed','Game_BattlerBase_hide','Game_Battler_isTpbReady','State-%1-%2','_graphicHue','loadSystem','updateTpb','checkTpbTurnEnd','_tpbIdleTime','UpdateFrames','updateTurnOrderForSubject','width','_scene','_autoBattle','onDatabaseLoaded','update','TpbAccelerationJS','_homeX','boxWidth','speed','casting','visible','updateAllTpbBattlers','rotateDupeNumber','registerCommand','some','setHue','ARRAYFUNC','isAnyBattlerReadyCTB','onRestrict','ARRAYEVAL','applyItemUserEffect','bitmapWidth','CtbTurnOrderClearActorGraphic','face','_homeY','createAllWindows','isDead','ARRAYSTR','changeIconGraphicBitmap','1492020fKievw','height','%1\x20%2\x20%3','updateGraphicHue','Weapon-%1-%2','EnemyBattlerDrawLetter','TurnOrderCTBGraphicIconIndex','createBackgroundSprite','EnemyBattlerFaceIndex','containerWindow','createInitialPositions','_tpbState','updateTurnOrderCTB','process_VisuMZ_BattleSystemCTB_JS_Notetags','TurnOrderCTBGraphicFaceName','CtbTurnOrderActorFace','updateLetter','updateTpbChargeTimeCTB','tpbBaseSpeed','DisplayOffsetX','SpriteThin','Anti-CTB\x20Softlock\x20Count:','ARRAYJSON','MAX_SAFE_INTEGER','RepositionTopHelpX','push','OrderJS','note','TpbBaseSpeedCalcJS','updateTurnOrderCTBforSubject','faceWidth','2077872UapSsO','_graphicIconIndex','%1BorderColor','%1PopupText','updateVisibility','map','format','canMove','FUNC','setCTBGraphicIconIndex','processUpdateGraphic','updateTurnCTB','isTpb','TurnOrderCTBGraphicFaceIndex','Actor','boxHeight','3165388riSbpD','mainSprite','Skill-%1-%2','BattleManager_endAction','_tpbChargeTime','Class-%1-%2','_ctbTurnOrderFaceIndex','updateOpacity','isTpbReady','ForceSubject'];_0x502a=function(){return _0x174bb6;};return _0x502a();}const _0x5a0093=_0x36a5;(function(_0x2aa4d4,_0xddb2c9){const _0x2746f6=_0x36a5,_0x23cd52=_0x2aa4d4();while(!![]){try{const _0x56a764=-parseInt(_0x2746f6(0x1aa))/0x1+-parseInt(_0x2746f6(0x215))/0x2*(-parseInt(_0x2746f6(0x1cd))/0x3)+parseInt(_0x2746f6(0x270))/0x4+parseInt(_0x2746f6(0x283))/0x5*(parseInt(_0x2746f6(0x20f))/0x6)+-parseInt(_0x2746f6(0x2a2))/0x7+parseInt(_0x2746f6(0x260))/0x8+-parseInt(_0x2746f6(0x241))/0x9;if(_0x56a764===_0xddb2c9)break;else _0x23cd52['push'](_0x23cd52['shift']());}catch(_0x3b32dd){_0x23cd52['push'](_0x23cd52['shift']());}}}(_0x502a,0x64752));function _0x36a5(_0x3d66fe,_0x245616){const _0x502a4a=_0x502a();return _0x36a5=function(_0x36a562,_0x1da0fe){_0x36a562=_0x36a562-0x175;let _0x790789=_0x502a4a[_0x36a562];return _0x790789;},_0x36a5(_0x3d66fe,_0x245616);}var label=_0x5a0093(0x1b4),tier=tier||0x0,dependencies=[_0x5a0093(0x187),_0x5a0093(0x2df)],pluginData=$plugins[_0x5a0093(0x30a)](function(_0x39f2ab){const _0x394df4=_0x5a0093;return _0x39f2ab[_0x394df4(0x1da)]&&_0x39f2ab[_0x394df4(0x17a)][_0x394df4(0x2b8)]('['+label+']');})[0x0];VisuMZ[label][_0x5a0093(0x329)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x3389c8,_0x4c7e33){const _0x50af7e=_0x5a0093;for(const _0x35a884 in _0x4c7e33){if(_0x35a884[_0x50af7e(0x296)](/(.*):(.*)/i)){const _0x137b17=String(RegExp['$1']),_0x4c5483=String(RegExp['$2'])['toUpperCase']()[_0x50af7e(0x2db)]();let _0x170b4d,_0x4a5c1d,_0x4d0ef9;switch(_0x4c5483){case _0x50af7e(0x20a):_0x170b4d=_0x4c7e33[_0x35a884]!==''?Number(_0x4c7e33[_0x35a884]):0x0;break;case _0x50af7e(0x339):_0x4a5c1d=_0x4c7e33[_0x35a884]!==''?JSON[_0x50af7e(0x1db)](_0x4c7e33[_0x35a884]):[],_0x170b4d=_0x4a5c1d[_0x50af7e(0x265)](_0xba5f95=>Number(_0xba5f95));break;case _0x50af7e(0x1ab):_0x170b4d=_0x4c7e33[_0x35a884]!==''?eval(_0x4c7e33[_0x35a884]):null;break;case _0x50af7e(0x237):_0x4a5c1d=_0x4c7e33[_0x35a884]!==''?JSON['parse'](_0x4c7e33[_0x35a884]):[],_0x170b4d=_0x4a5c1d['map'](_0x41612d=>eval(_0x41612d));break;case _0x50af7e(0x1d2):_0x170b4d=_0x4c7e33[_0x35a884]!==''?JSON[_0x50af7e(0x1db)](_0x4c7e33[_0x35a884]):'';break;case _0x50af7e(0x257):_0x4a5c1d=_0x4c7e33[_0x35a884]!==''?JSON['parse'](_0x4c7e33[_0x35a884]):[],_0x170b4d=_0x4a5c1d['map'](_0x244bd8=>JSON[_0x50af7e(0x1db)](_0x244bd8));break;case _0x50af7e(0x268):_0x170b4d=_0x4c7e33[_0x35a884]!==''?new Function(JSON['parse'](_0x4c7e33[_0x35a884])):new Function(_0x50af7e(0x2b5));break;case _0x50af7e(0x234):_0x4a5c1d=_0x4c7e33[_0x35a884]!==''?JSON[_0x50af7e(0x1db)](_0x4c7e33[_0x35a884]):[],_0x170b4d=_0x4a5c1d[_0x50af7e(0x265)](_0x4df9e0=>new Function(JSON[_0x50af7e(0x1db)](_0x4df9e0)));break;case _0x50af7e(0x2c7):_0x170b4d=_0x4c7e33[_0x35a884]!==''?String(_0x4c7e33[_0x35a884]):'';break;case _0x50af7e(0x23f):_0x4a5c1d=_0x4c7e33[_0x35a884]!==''?JSON['parse'](_0x4c7e33[_0x35a884]):[],_0x170b4d=_0x4a5c1d[_0x50af7e(0x265)](_0x53d220=>String(_0x53d220));break;case _0x50af7e(0x2a6):_0x4d0ef9=_0x4c7e33[_0x35a884]!==''?JSON[_0x50af7e(0x1db)](_0x4c7e33[_0x35a884]):{},_0x170b4d=VisuMZ[_0x50af7e(0x201)]({},_0x4d0ef9);break;case _0x50af7e(0x309):_0x4a5c1d=_0x4c7e33[_0x35a884]!==''?JSON[_0x50af7e(0x1db)](_0x4c7e33[_0x35a884]):[],_0x170b4d=_0x4a5c1d[_0x50af7e(0x265)](_0x51850c=>VisuMZ[_0x50af7e(0x201)]({},JSON[_0x50af7e(0x1db)](_0x51850c)));break;default:continue;}_0x3389c8[_0x137b17]=_0x170b4d;}}return _0x3389c8;},(_0xb40403=>{const _0x1b47da=_0x5a0093,_0x19c55c=_0xb40403['name'];for(const _0x17229c of dependencies){if(!Imported[_0x17229c]){alert(_0x1b47da(0x2e1)[_0x1b47da(0x266)](_0x19c55c,_0x17229c)),SceneManager[_0x1b47da(0x2b7)]();break;}}const _0x5201e1=_0xb40403[_0x1b47da(0x17a)];if(_0x5201e1['match'](/\[Version[ ](.*?)\]/i)){const _0x1d7682=Number(RegExp['$1']);_0x1d7682!==VisuMZ[label][_0x1b47da(0x2ef)]&&(alert(_0x1b47da(0x285)[_0x1b47da(0x266)](_0x19c55c,_0x1d7682)),SceneManager[_0x1b47da(0x2b7)]());}if(_0x5201e1[_0x1b47da(0x296)](/\[Tier[ ](\d+)\]/i)){const _0x34a532=Number(RegExp['$1']);_0x34a532<tier?(alert(_0x1b47da(0x28c)[_0x1b47da(0x266)](_0x19c55c,_0x34a532,tier)),SceneManager[_0x1b47da(0x2b7)]()):tier=Math['max'](_0x34a532,tier);}VisuMZ[_0x1b47da(0x201)](VisuMZ[label][_0x1b47da(0x329)],_0xb40403[_0x1b47da(0x1a0)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x5a0093(0x179),_0x45d0d4=>{const _0x1913c7=_0x5a0093;VisuMZ[_0x1913c7(0x201)](_0x45d0d4,_0x45d0d4);const _0x47d0ab=_0x45d0d4['Actors'],_0x366f2c=_0x45d0d4['IconIndex'];for(const _0x4e0037 of _0x47d0ab){const _0xcc5cde=$gameActors[_0x1913c7(0x194)](_0x4e0037);if(!_0xcc5cde)continue;_0xcc5cde[_0x1913c7(0x1d3)]=_0x1913c7(0x2b6),_0xcc5cde[_0x1913c7(0x1ed)]=_0x366f2c;}}),PluginManager[_0x5a0093(0x231)](pluginData[_0x5a0093(0x286)],_0x5a0093(0x250),_0x2e9fa7=>{const _0x22cf51=_0x5a0093;VisuMZ['ConvertParams'](_0x2e9fa7,_0x2e9fa7);const _0x3ec429=_0x2e9fa7[_0x22cf51(0x1c2)],_0x402c60=_0x2e9fa7['FaceName'],_0x3a3034=_0x2e9fa7[_0x22cf51(0x199)];for(const _0x161bbb of _0x3ec429){const _0x34f7ed=$gameActors[_0x22cf51(0x194)](_0x161bbb);if(!_0x34f7ed)continue;_0x34f7ed[_0x22cf51(0x1d3)]=_0x22cf51(0x23b),_0x34f7ed[_0x22cf51(0x1f7)]=_0x402c60,_0x34f7ed['_ctbTurnOrderFaceIndex']=_0x3a3034;}}),PluginManager[_0x5a0093(0x231)](pluginData[_0x5a0093(0x286)],_0x5a0093(0x23a),_0x3b2576=>{const _0x280163=_0x5a0093;VisuMZ[_0x280163(0x201)](_0x3b2576,_0x3b2576);const _0x3fe319=_0x3b2576[_0x280163(0x1c2)];for(const _0x594393 of _0x3fe319){const _0x3ea9ce=$gameActors[_0x280163(0x194)](_0x594393);if(!_0x3ea9ce)continue;_0x3ea9ce[_0x280163(0x325)]();}}),PluginManager[_0x5a0093(0x231)](pluginData[_0x5a0093(0x286)],_0x5a0093(0x31b),_0x253106=>{const _0x2d212c=_0x5a0093;VisuMZ[_0x2d212c(0x201)](_0x253106,_0x253106);const _0x589bb0=_0x253106['Enemies'],_0x17d273=_0x253106[_0x2d212c(0x2f0)];for(const _0x24fc49 of _0x589bb0){const _0x1b3e69=$gameTroop[_0x2d212c(0x1ea)]()[_0x24fc49];if(!_0x1b3e69)continue;_0x1b3e69[_0x2d212c(0x1d3)]=_0x2d212c(0x2b6),_0x1b3e69[_0x2d212c(0x1ed)]=_0x17d273;}}),PluginManager[_0x5a0093(0x231)](pluginData[_0x5a0093(0x286)],_0x5a0093(0x1d9),_0x466c8a=>{const _0x3e7097=_0x5a0093;VisuMZ[_0x3e7097(0x201)](_0x466c8a,_0x466c8a);const _0x350282=_0x466c8a[_0x3e7097(0x209)],_0x45ef39=_0x466c8a[_0x3e7097(0x27b)],_0x3b3637=_0x466c8a[_0x3e7097(0x199)];for(const _0x236e55 of _0x350282){const _0x3a378e=$gameTroop['members']()[_0x236e55];if(!_0x3a378e)continue;_0x3a378e['_ctbTurnOrderGraphicType']=_0x3e7097(0x23b),_0x3a378e[_0x3e7097(0x1f7)]=_0x45ef39,_0x3a378e['_ctbTurnOrderFaceIndex']=_0x3b3637;}}),PluginManager[_0x5a0093(0x231)](pluginData[_0x5a0093(0x286)],_0x5a0093(0x32d),_0x1dff6e=>{const _0x3b520e=_0x5a0093;VisuMZ[_0x3b520e(0x201)](_0x1dff6e,_0x1dff6e);const _0x55e01a=_0x1dff6e[_0x3b520e(0x209)];for(const _0x3a0f4f of _0x55e01a){const _0x3e6f7f=$gameTroop['members']()[_0x3a0f4f];if(!_0x3e6f7f)continue;_0x3e6f7f[_0x3b520e(0x325)]();}}),PluginManager['registerCommand'](pluginData[_0x5a0093(0x286)],_0x5a0093(0x33a),_0x1e34b7=>{const _0x4b33eb=_0x5a0093;VisuMZ[_0x4b33eb(0x201)](_0x1e34b7,_0x1e34b7);const _0x182116=_0x1e34b7['Visible'];$gameSystem[_0x4b33eb(0x1bc)](_0x182116);}),VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2b2)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x5a0093(0x314)][_0x5a0093(0x227)]=function(){const _0x1f1c5f=_0x5a0093;this[_0x1f1c5f(0x33d)](),VisuMZ[_0x1f1c5f(0x1b4)][_0x1f1c5f(0x2b2)][_0x1f1c5f(0x304)](this),this['process_VisuMZ_BattleSystemCTB_JS_Notetags']();},VisuMZ[_0x5a0093(0x1b4)]['RegExp']={},Scene_Boot[_0x5a0093(0x314)][_0x5a0093(0x33d)]=function(){const _0xfb8f74=_0x5a0093,_0x3269ec=VisuMZ[_0xfb8f74(0x1b4)][_0xfb8f74(0x1d0)],_0x72b0a0=_0xfb8f74(0x1ac),_0xd7a556=[_0xfb8f74(0x1ff),_0xfb8f74(0x211),_0xfb8f74(0x2b3)];for(const _0xa7d951 of _0xd7a556){const _0xb5c816=_0x72b0a0[_0xfb8f74(0x266)](_0xa7d951[_0xfb8f74(0x30b)]()[_0xfb8f74(0x2db)](),_0xfb8f74(0x192),'(?:GAUGE|TIME|SPEED)'),_0x3f7cd6=new RegExp(_0xb5c816,'i');VisuMZ['BattleSystemCTB'][_0xfb8f74(0x1d0)][_0xa7d951]=_0x3f7cd6;}VisuMZ[_0xfb8f74(0x1b4)][_0xfb8f74(0x1d0)][_0xfb8f74(0x25b)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x5a0093(0x314)][_0x5a0093(0x24e)]=function(){const _0xc42025=_0x5a0093;if(VisuMZ[_0xc42025(0x1fe)])return;const _0x347f01=$dataSkills[_0xc42025(0x1cc)]($dataItems);for(const _0x3f3080 of _0x347f01){if(!_0x3f3080)continue;VisuMZ[_0xc42025(0x1b4)]['Parse_Notetags_CreateJS'](_0x3f3080);}},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1d5)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x5a0093(0x1d5)]=function(_0x23282b){const _0x390a14=_0x5a0093;VisuMZ['BattleSystemCTB'][_0x390a14(0x1d5)][_0x390a14(0x304)](this,_0x23282b),VisuMZ[_0x390a14(0x1b4)][_0x390a14(0x1ae)](_0x23282b);},VisuMZ['BattleSystemCTB'][_0x5a0093(0x189)]=VisuMZ[_0x5a0093(0x189)],VisuMZ[_0x5a0093(0x189)]=function(_0x3b7db6){const _0x51fa8c=_0x5a0093;VisuMZ[_0x51fa8c(0x1b4)]['ParseItemNotetags']['call'](this,_0x3b7db6),VisuMZ['BattleSystemCTB'][_0x51fa8c(0x1ae)](_0x3b7db6);},VisuMZ['BattleSystemCTB'][_0x5a0093(0x1ae)]=function(_0x55f6fb){const _0x129f64=_0x5a0093,_0x356af9=[_0x129f64(0x1ff),'Cast',_0x129f64(0x2b3)];for(const _0x209dc8 of _0x356af9){VisuMZ[_0x129f64(0x1b4)]['createRateJS'](_0x55f6fb,_0x209dc8);}VisuMZ[_0x129f64(0x1b4)]['createOrderJS'](_0x55f6fb,_0x129f64(0x202));},VisuMZ[_0x5a0093(0x1b4)]['JS']={},VisuMZ['BattleSystemCTB'][_0x5a0093(0x311)]=function(_0x62e685,_0x2cc159){const _0x2b928d=_0x5a0093,_0x4622cc=_0x62e685[_0x2b928d(0x25c)];if(_0x4622cc['match'](VisuMZ[_0x2b928d(0x1b4)]['RegExp'][_0x2cc159])){const _0x4f4be7=String(RegExp['$1']),_0x457c36=_0x2b928d(0x1c3)['format'](_0x4f4be7,_0x2cc159),_0x2f96ef=VisuMZ[_0x2b928d(0x1b4)]['createKeyJS'](_0x62e685,_0x2cc159);VisuMZ[_0x2b928d(0x1b4)]['JS'][_0x2f96ef]=new Function(_0x457c36);}},VisuMZ['BattleSystemCTB']['createOrderJS']=function(_0x26ac8f,_0x3a5fa5){const _0x7d4e76=_0x5a0093,_0x44168a=_0x26ac8f[_0x7d4e76(0x25c)];if(_0x44168a[_0x7d4e76(0x296)](VisuMZ[_0x7d4e76(0x1b4)][_0x7d4e76(0x1d0)][_0x7d4e76(0x25b)])){const _0x2be9de=String(RegExp['$1']),_0x18f0a4=_0x7d4e76(0x2e4)[_0x7d4e76(0x266)](_0x2be9de,_0x3a5fa5),_0x58083b=VisuMZ[_0x7d4e76(0x1b4)][_0x7d4e76(0x1e2)](_0x26ac8f,_0x3a5fa5);VisuMZ[_0x7d4e76(0x1b4)]['JS'][_0x58083b]=new Function(_0x18f0a4);}},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1e2)]=function(_0xbb3c22,_0x120d18){const _0x426045=_0x5a0093;if(VisuMZ[_0x426045(0x1e2)])return VisuMZ[_0x426045(0x1e2)](_0xbb3c22,_0x120d18);let _0x314897='';if($dataActors[_0x426045(0x2b8)](_0xbb3c22))_0x314897=_0x426045(0x1df)[_0x426045(0x266)](_0xbb3c22['id'],_0x120d18);if($dataClasses[_0x426045(0x2b8)](_0xbb3c22))_0x314897=_0x426045(0x275)['format'](_0xbb3c22['id'],_0x120d18);if($dataSkills[_0x426045(0x2b8)](_0xbb3c22))_0x314897=_0x426045(0x272)[_0x426045(0x266)](_0xbb3c22['id'],_0x120d18);if($dataItems['includes'](_0xbb3c22))_0x314897='Item-%1-%2'[_0x426045(0x266)](_0xbb3c22['id'],_0x120d18);if($dataWeapons[_0x426045(0x2b8)](_0xbb3c22))_0x314897=_0x426045(0x245)[_0x426045(0x266)](_0xbb3c22['id'],_0x120d18);if($dataArmors[_0x426045(0x2b8)](_0xbb3c22))_0x314897='Armor-%1-%2'['format'](_0xbb3c22['id'],_0x120d18);if($dataEnemies[_0x426045(0x2b8)](_0xbb3c22))_0x314897='Enemy-%1-%2'[_0x426045(0x266)](_0xbb3c22['id'],_0x120d18);if($dataStates['includes'](_0xbb3c22))_0x314897=_0x426045(0x21c)[_0x426045(0x266)](_0xbb3c22['id'],_0x120d18);return _0x314897;},ImageManager[_0x5a0093(0x31c)]=ImageManager[_0x5a0093(0x31c)]||0x9,ImageManager['svActorVertCells']=ImageManager['svActorVertCells']||0x6,VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1b3)]=BattleManager[_0x5a0093(0x29d)],BattleManager['battleSys']=function(){const _0x576524=_0x5a0093;if(this['isCTB']())return'CTB';return VisuMZ[_0x576524(0x1b4)][_0x576524(0x1b3)][_0x576524(0x304)](this);},BattleManager['isCTB']=function(){const _0x58e47f=_0x5a0093;return $gameSystem[_0x58e47f(0x321)]()===_0x58e47f(0x2d8);},VisuMZ['BattleSystemCTB'][_0x5a0093(0x2ee)]=BattleManager[_0x5a0093(0x26c)],BattleManager['isTpb']=function(){const _0x3b41bf=_0x5a0093;if(this['isCTB']())return!![];return VisuMZ[_0x3b41bf(0x1b4)]['BattleManager_isTpb'][_0x3b41bf(0x304)](this);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1fc)]=BattleManager['isActiveTpb'],BattleManager[_0x5a0093(0x2a0)]=function(){const _0x53ff42=_0x5a0093;if(this[_0x53ff42(0x2c0)]())return![];return VisuMZ[_0x53ff42(0x1b4)][_0x53ff42(0x1fc)][_0x53ff42(0x304)](this);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x33b)]=BattleManager['updateTurn'],BattleManager[_0x5a0093(0x2f3)]=function(_0x1a9576){const _0x302e1d=_0x5a0093;this[_0x302e1d(0x2c0)]()?this['updateTurnCTB'](_0x1a9576):VisuMZ[_0x302e1d(0x1b4)][_0x302e1d(0x33b)][_0x302e1d(0x304)](this,_0x1a9576);},BattleManager[_0x5a0093(0x26b)]=function(_0x47d54b){const _0x1d2f6b=_0x5a0093;return VisuMZ[_0x1d2f6b(0x1b4)][_0x1d2f6b(0x33b)]['call'](this,_0x47d54b);},VisuMZ[_0x5a0093(0x1b4)]['BattleManager_processTurn']=BattleManager[_0x5a0093(0x30d)],BattleManager[_0x5a0093(0x30d)]=function(){const _0xb195d0=_0x5a0093;this['isCTB']()?this[_0xb195d0(0x319)]():VisuMZ[_0xb195d0(0x1b4)]['BattleManager_processTurn'][_0xb195d0(0x304)](this);},BattleManager['processTurnCTB']=function(){const _0x3da1e5=_0x5a0093;this['updateTurnOrderCTBforSubject']();const _0x4cca6d=this[_0x3da1e5(0x2c3)],_0x5881ec=_0x4cca6d[_0x3da1e5(0x1f1)]();_0x5881ec?(_0x5881ec['prepare'](),_0x5881ec['isValid']()&&this[_0x3da1e5(0x2bc)](),_0x4cca6d['removeCurrentAction']()):(_0x4cca6d[_0x3da1e5(0x2ac)](0x0),this[_0x3da1e5(0x1ee)](),this['_subject']=null);},BattleManager['isAnyBattlerReadyCTB']=function(){const _0x30ba89=_0x5a0093;if(this[_0x30ba89(0x2c3)])return!![];if(this[_0x30ba89(0x2cd)]!=='turn')return!![];if(this[_0x30ba89(0x226)])return![];const _0x10aba1=this['allBattleMembers']()['filter'](_0x1fd068=>_0x1fd068&&_0x1fd068['isAppeared']());return _0x10aba1['some'](_0x43a06a=>_0x43a06a[_0x30ba89(0x2fc)]());},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2fc)]=function(){const _0x22e6b9=_0x5a0093;if(this[_0x22e6b9(0x2fd)]())return!![];if(this[_0x22e6b9(0x278)]())return!![];if(this[_0x22e6b9(0x197)]())return!![];return![];},BattleManager['checkCtbAntiSoftlock']=function(){const _0x5a81d0=_0x5a0093;let _0x2fe202=VisuMZ[_0x5a81d0(0x1b4)]['Settings'][_0x5a81d0(0x2ce)][_0x5a81d0(0x318)]?0x1e:0xa;this[_0x5a81d0(0x235)]()&&this[_0x5a81d0(0x204)]()?(this[_0x5a81d0(0x1a9)]=this[_0x5a81d0(0x1a9)]||0x0,this[_0x5a81d0(0x1a9)]++,this[_0x5a81d0(0x1a9)]>=_0x2fe202&&this['processCtbAntiSoftlock']()):this[_0x5a81d0(0x1a9)]=0x0;},BattleManager['otherCtbChecksPassed']=function(){const _0x4813e9=_0x5a0093;if(this[_0x4813e9(0x2c3)])return![];if(this[_0x4813e9(0x2cd)]!=='turn')return![];if(this['isInputting']())return![];return!![];},BattleManager['processCtbAntiSoftlock']=function(){const _0x33d60c=_0x5a0093;$gameTemp[_0x33d60c(0x29f)]()&&this[_0x33d60c(0x1a9)]>=0x14&&console[_0x33d60c(0x2a9)](_0x33d60c(0x256),this[_0x33d60c(0x1a9)]);this[_0x33d60c(0x2c3)]=null,this[_0x33d60c(0x2cd)]=_0x33d60c(0x19b),this['_inputting']=![],this['_debutCTB']=!![];for(const _0xd9127c of this[_0x33d60c(0x1b1)]()){if(!_0xd9127c)continue;if(_0xd9127c['isAlive']()){_0xd9127c[_0x33d60c(0x176)](_0x33d60c(0x1e7)),_0xd9127c['_tpbState']=_0x33d60c(0x328);const _0xc7391a=_0xd9127c[_0x33d60c(0x2ed)],_0x224a24=_0xd9127c[_0x33d60c(0x274)]||0x0;_0xd9127c[_0x33d60c(0x289)](![]),_0xd9127c[_0x33d60c(0x2ed)]=_0xc7391a,_0xd9127c['_tpbChargeTime']=Math[_0x33d60c(0x2c8)](_0x224a24,0.99),_0xd9127c[_0x33d60c(0x21f)]();}}this[_0x33d60c(0x1a9)]===0xb4&&($gameParty['removeBattleStates'](),$gameParty[_0x33d60c(0x180)][_0x33d60c(0x304)]($gameTroop));if(this[_0x33d60c(0x1a9)]===0x12c)for(const _0x55420c of this['allBattleMembers']()){if(!_0x55420c)continue;if(_0x55420c[_0x33d60c(0x23e)]())continue;_0x55420c[_0x33d60c(0x1a3)]();}this[_0x33d60c(0x1a9)]>=0x258&&(BattleManager[_0x33d60c(0x2d3)](),$gameTemp[_0x33d60c(0x29f)]()&&console['log']('Aborting\x20Battle.\x20Softlock\x20cannot\x20be\x20fixed.'));},VisuMZ['BattleSystemCTB']['BattleManager_updateAllTpbBattlers']=BattleManager['updateAllTpbBattlers'],BattleManager[_0x5a0093(0x22f)]=function(){const _0x4625cc=_0x5a0093;this['isCTB']()?this[_0x4625cc(0x1c9)]():VisuMZ['BattleSystemCTB'][_0x4625cc(0x29b)][_0x4625cc(0x304)](this);},BattleManager[_0x5a0093(0x1c9)]=function(){const _0x4906fa=_0x5a0093;if(this[_0x4906fa(0x1e1)][_0x4906fa(0x30c)]>0x0)return;const _0x3e4c47=this[_0x4906fa(0x1b1)]();_0x3e4c47[_0x4906fa(0x186)]((_0x513d52,_0x563d02)=>{const _0x5c44fa=_0x4906fa;return _0x513d52[_0x5c44fa(0x1b2)](0x1)-_0x563d02[_0x5c44fa(0x1b2)](0x1);});for(const _0x11df58 of _0x3e4c47){if(this[_0x4906fa(0x1e1)]['length']>0x0)return;this[_0x4906fa(0x327)](_0x11df58);}},VisuMZ[_0x5a0093(0x1b4)]['BattleManager_startBattle']=BattleManager['startBattle'],BattleManager[_0x5a0093(0x1c7)]=function(){const _0x57db25=_0x5a0093;VisuMZ[_0x57db25(0x1b4)][_0x57db25(0x1c1)][_0x57db25(0x304)](this),this[_0x57db25(0x24d)](!![]);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x273)]=BattleManager['endAction'],BattleManager[_0x5a0093(0x1ee)]=function(){const _0x338f61=_0x5a0093;this['preEndActionCTB'](),VisuMZ['BattleSystemCTB']['BattleManager_endAction'][_0x338f61(0x304)](this),this[_0x338f61(0x17f)]();},BattleManager[_0x5a0093(0x1a7)]=function(){const _0x40b77e=_0x5a0093;if(!this[_0x40b77e(0x2c0)]())return;this[_0x40b77e(0x2c3)]&&this['_subject'][_0x40b77e(0x315)]()<=0x0&&(this['rotateCTBSprites'](),this[_0x40b77e(0x2c3)][_0x40b77e(0x176)](_0x40b77e(0x1e7))),BattleManager['_antiCtbSoftlockInstantActionAfter']=0x0;},BattleManager[_0x5a0093(0x17f)]=function(){const _0x19ec4e=_0x5a0093;if(!this[_0x19ec4e(0x2c0)]())return;if(this[_0x19ec4e(0x2c3)]&&$gameTemp[_0x19ec4e(0x175)]()){this['_subject']['_tpbState']=_0x19ec4e(0x2e0),this['_subject'][_0x19ec4e(0x2ad)]=_0x19ec4e(0x29c);return;}this['updateTurnOrderCTB'](),this[_0x19ec4e(0x2c3)]&&this[_0x19ec4e(0x30d)]();},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2bf)]=BattleManager[_0x5a0093(0x213)],BattleManager[_0x5a0093(0x213)]=function(){const _0x34aa51=_0x5a0093;this[_0x34aa51(0x24d)](),VisuMZ[_0x34aa51(0x1b4)]['BattleManager_startActorInput'][_0x34aa51(0x304)](this);},BattleManager[_0x5a0093(0x24d)]=function(_0xcf9801){const _0x37e70f=_0x5a0093;if(!this['isCTB']())return;const _0xecd786=SceneManager['_scene'][_0x37e70f(0x2bb)];if(!_0xecd786)return;_0xecd786[_0x37e70f(0x2ba)](_0xcf9801);},BattleManager[_0x5a0093(0x25e)]=function(_0x4349b0){const _0x28ea08=_0x5a0093;if(!(VisuMZ[_0x28ea08(0x1b4)][_0x28ea08(0x329)]['TurnOrder'][_0x28ea08(0x279)]??!![]))return;if(!this[_0x28ea08(0x2c0)]())return;const _0x23fe34=SceneManager[_0x28ea08(0x225)][_0x28ea08(0x2bb)];if(!_0x23fe34)return;_0x23fe34['updateTurnOrderForSubject'](_0x4349b0);},BattleManager['rotateCTBSprites']=function(){const _0x5f17af=_0x5a0093;if(!this[_0x5f17af(0x2c0)]())return;const _0xa9380f=SceneManager['_scene'][_0x5f17af(0x2bb)];if(!_0xa9380f)return;_0xa9380f[_0x5f17af(0x18b)](this[_0x5f17af(0x2c3)]);},BattleManager['logCtbData']=function(){const _0x3eb826=_0x5a0093,_0x398935=this[_0x3eb826(0x1b1)]()[_0x3eb826(0x265)](_0x53049f=>String([_0x53049f['name'](),'Ticks\x20to\x20Goal:\x20'+_0x53049f[_0x3eb826(0x1b2)](0x1)]));console[_0x3eb826(0x2a9)](_0x398935);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2ab)]=BattleManager[_0x5a0093(0x21f)],BattleManager[_0x5a0093(0x21f)]=function(){const _0xbb3e64=_0x5a0093;this[_0xbb3e64(0x2c0)]()?this[_0xbb3e64(0x334)]():VisuMZ[_0xbb3e64(0x1b4)][_0xbb3e64(0x2ab)]['call'](this);},BattleManager['updateTpbCtb']=function(){const _0x2a1f17=_0x5a0093,_0x4e35b6=this[_0x2a1f17(0x1b1)]();_0x4e35b6[_0x2a1f17(0x186)]((_0x3bd849,_0x32d894)=>{const _0xc7079b=_0x2a1f17;return _0x3bd849['ctbTicksToGoal'](0x1)-_0x32d894[_0xc7079b(0x1b2)](0x1);});for(const _0xb1c100 of _0x4e35b6){_0xb1c100[_0x2a1f17(0x21f)]();}this[_0x2a1f17(0x22f)](),this[_0x2a1f17(0x220)]();},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1b5)]=BattleManager[_0x5a0093(0x2a1)],BattleManager[_0x5a0093(0x2a1)]=function(){const _0x1fe416=_0x5a0093;if(this[_0x1fe416(0x2c0)]()){const _0x4432ec=this[_0x1fe416(0x1b1)]()[_0x1fe416(0x30a)](_0x108750=>_0x108750[_0x1fe416(0x2fd)]());_0x4432ec[_0x1fe416(0x186)]((_0x25c1e5,_0x2119da)=>{return _0x25c1e5['ctbTicksToGoal'](0x1)-_0x2119da['ctbTicksToGoal'](0x1);});if(_0x4432ec['length']>0x0&&!_0x4432ec[0x0]['isActor']())return;}VisuMZ['BattleSystemCTB'][_0x1fe416(0x1b5)][_0x1fe416(0x304)](this);},VisuMZ['BattleSystemCTB'][_0x5a0093(0x1f3)]=Game_System['prototype'][_0x5a0093(0x308)],Game_System[_0x5a0093(0x314)]['initialize']=function(){const _0x11b9e2=_0x5a0093;VisuMZ[_0x11b9e2(0x1b4)][_0x11b9e2(0x1f3)][_0x11b9e2(0x304)](this),this[_0x11b9e2(0x1e9)]();},Game_System[_0x5a0093(0x314)][_0x5a0093(0x1e9)]=function(){this['_ctbTurnOrderVisible']=!![];},Game_System[_0x5a0093(0x314)][_0x5a0093(0x2f4)]=function(){const _0x758d1d=_0x5a0093;return this[_0x758d1d(0x19a)]===undefined&&this[_0x758d1d(0x1e9)](),this['_ctbTurnOrderVisible'];},Game_System[_0x5a0093(0x314)][_0x5a0093(0x1bc)]=function(_0x4a4714){const _0x278509=_0x5a0093;this[_0x278509(0x19a)]===undefined&&this[_0x278509(0x1e9)](),this[_0x278509(0x19a)]=_0x4a4714;},VisuMZ[_0x5a0093(0x1b4)]['Game_Action_applyItemUserEffect']=Game_Action[_0x5a0093(0x314)][_0x5a0093(0x238)],Game_Action[_0x5a0093(0x314)]['applyItemUserEffect']=function(_0x5e4042){const _0x48a637=_0x5a0093;VisuMZ[_0x48a637(0x1b4)]['Game_Action_applyItemUserEffect'][_0x48a637(0x304)](this,_0x5e4042),this[_0x48a637(0x1f5)](_0x5e4042);},Game_Action['prototype'][_0x5a0093(0x1f5)]=function(_0x5483c1){const _0xe69584=_0x5a0093;if(!SceneManager[_0xe69584(0x29a)]())return;if(!BattleManager[_0xe69584(0x2c0)]())return;if(this['item']())this[_0xe69584(0x19c)](_0x5483c1);},Game_Action[_0x5a0093(0x314)][_0x5a0093(0x19c)]=function(_0x835f65){const _0x476e86=_0x5a0093,_0x6be79e=this[_0x476e86(0x2ae)]()[_0x476e86(0x25c)];if(_0x835f65[_0x476e86(0x323)]()){const _0x26791d=VisuMZ[_0x476e86(0x1b4)][_0x476e86(0x1e2)](this[_0x476e86(0x2ae)](),_0x476e86(0x1ff));if(VisuMZ[_0x476e86(0x1b4)]['JS'][_0x26791d]){const _0x51d29e=VisuMZ['BattleSystemCTB']['JS'][_0x26791d][_0x476e86(0x304)](this,this[_0x476e86(0x2b0)](),_0x835f65);_0x835f65[_0x476e86(0x2be)](_0x51d29e);}_0x6be79e['match'](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x835f65[_0x476e86(0x2be)](Number(RegExp['$1'])*0.01),_0x6be79e[_0x476e86(0x296)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x835f65[_0x476e86(0x2e6)](Number(RegExp['$1'])*0.01);}else{if(_0x835f65[_0x476e86(0x1d7)]()){const _0x2c5f5c=VisuMZ['BattleSystemCTB'][_0x476e86(0x1e2)](this[_0x476e86(0x2ae)](),'Cast');if(VisuMZ[_0x476e86(0x1b4)]['JS'][_0x2c5f5c]){const _0x175ef7=VisuMZ[_0x476e86(0x1b4)]['JS'][_0x2c5f5c][_0x476e86(0x304)](this,this[_0x476e86(0x2b0)](),_0x835f65);_0x835f65[_0x476e86(0x322)](_0x175ef7);}_0x6be79e['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x835f65[_0x476e86(0x322)](Number(RegExp['$1'])*0.01),_0x6be79e[_0x476e86(0x296)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x835f65[_0x476e86(0x212)](Number(RegExp['$1'])*0.01);}}const _0x5c870f=VisuMZ[_0x476e86(0x1b4)]['createKeyJS'](this['item'](),'Order');if(VisuMZ[_0x476e86(0x1b4)]['JS'][_0x5c870f]){const _0x1c7224=VisuMZ[_0x476e86(0x1b4)]['JS'][_0x5c870f]['call'](this,this[_0x476e86(0x2b0)](),_0x835f65);_0x835f65['setTurnOrderCTB'](_0x1c7224);}_0x6be79e[_0x476e86(0x296)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x835f65[_0x476e86(0x338)](Number(RegExp['$1'])),_0x6be79e[_0x476e86(0x296)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x835f65[_0x476e86(0x301)](Number(RegExp['$1']));},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1d4)]=Game_Action[_0x5a0093(0x314)][_0x5a0093(0x2d9)],Game_Action['prototype'][_0x5a0093(0x2d9)]=function(){const _0xbebc53=_0x5a0093;VisuMZ['BattleSystemCTB'][_0xbebc53(0x1d4)][_0xbebc53(0x304)](this),this[_0xbebc53(0x178)]();},Game_Action[_0x5a0093(0x314)][_0x5a0093(0x178)]=function(){const _0x1bd21d=_0x5a0093;if(!this[_0x1bd21d(0x2ae)]())return;if(!BattleManager[_0x1bd21d(0x2c0)]())return;const _0x528957=this['item']()[_0x1bd21d(0x25c)];let _0x3676c6=0x0;this[_0x1bd21d(0x1a1)]&&(_0x3676c6=this[_0x1bd21d(0x2b0)]()[_0x1bd21d(0x274)]);const _0x33c7fb=VisuMZ['BattleSystemCTB']['createKeyJS'](this['item'](),_0x1bd21d(0x2b3));VisuMZ[_0x1bd21d(0x1b4)]['JS'][_0x33c7fb]&&(_0x3676c6=VisuMZ[_0x1bd21d(0x1b4)]['JS'][_0x33c7fb][_0x1bd21d(0x304)](this,this['subject'](),this[_0x1bd21d(0x2b0)]()));let _0x254507=this[_0x1bd21d(0x2ae)]()[_0x1bd21d(0x22c)]>0x0?this['item']()[_0x1bd21d(0x22c)]:0x0;if(this[_0x1bd21d(0x1c8)]())_0x254507+=this[_0x1bd21d(0x2b0)]()[_0x1bd21d(0x219)]();_0x3676c6+=(_0x254507/0xfa0)['clamp'](0x0,0x1);_0x528957[_0x1bd21d(0x296)](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x3676c6=Number(RegExp['$1'])*0.01);const _0x39095a=this['subject']()[_0x1bd21d(0x1be)]()[_0x1bd21d(0x1cc)](this[_0x1bd21d(0x2b0)]()[_0x1bd21d(0x2dd)]()),_0x2fca93=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x3728e4=_0x39095a[_0x1bd21d(0x265)](_0x1c9458=>_0x1c9458&&_0x1c9458[_0x1bd21d(0x25c)][_0x1bd21d(0x296)](_0x2fca93)?Number(RegExp['$1'])*0.01:0x0);_0x3676c6=_0x3728e4[_0x1bd21d(0x1ec)]((_0x14cd28,_0x2b994f)=>_0x14cd28+_0x2b994f,_0x3676c6),this[_0x1bd21d(0x2b0)]()[_0x1bd21d(0x2ac)](_0x3676c6);},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x2be)]=function(_0x2f67c5){this['_tpbChargeTime']=_0x2f67c5;},Game_BattlerBase['prototype']['changeCtbChargeTime']=function(_0x27a61e){const _0x12ff59=_0x5a0093;this['setCtbChargeTime'](this[_0x12ff59(0x274)]+_0x27a61e);},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x322)]=function(_0x1691ce){const _0x4fe0aa=_0x5a0093,_0x16cc29=this[_0x4fe0aa(0x2f5)]();this['_tpbCastTime']=_0x16cc29*_0x1691ce;},Game_BattlerBase[_0x5a0093(0x314)]['changeCtbCastTime']=function(_0x3444a0){const _0x570ab4=_0x5a0093,_0x4bf61a=this[_0x570ab4(0x2f5)](),_0x48ed68=_0x4bf61a*_0x3444a0;this[_0x570ab4(0x294)]=this[_0x570ab4(0x294)]+_0x48ed68;},VisuMZ['BattleSystemCTB']['Game_BattlerBase_appear']=Game_BattlerBase['prototype'][_0x5a0093(0x28e)],Game_BattlerBase['prototype'][_0x5a0093(0x28e)]=function(){const _0x4d18e5=_0x5a0093;VisuMZ[_0x4d18e5(0x1b4)]['Game_BattlerBase_appear'][_0x4d18e5(0x304)](this),BattleManager[_0x4d18e5(0x24d)]();},VisuMZ[_0x5a0093(0x1b4)]['Game_BattlerBase_hide']=Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x2ca)],Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x2ca)]=function(){const _0x3cc8a6=_0x5a0093;VisuMZ[_0x3cc8a6(0x1b4)][_0x3cc8a6(0x21a)][_0x3cc8a6(0x304)](this),BattleManager[_0x3cc8a6(0x24d)]();},Game_BattlerBase['prototype']['clearTurnOrderCTBGraphics']=function(){const _0x165973=_0x5a0093;delete this['_ctbTurnOrderGraphicType'],delete this[_0x165973(0x1f7)],delete this[_0x165973(0x276)],delete this[_0x165973(0x1ed)];},Game_BattlerBase[_0x5a0093(0x314)]['TurnOrderCTBGraphicType']=function(){const _0x4ca85d=_0x5a0093;return this[_0x4ca85d(0x1d3)]===undefined&&(this['_ctbTurnOrderGraphicType']=this[_0x4ca85d(0x2a4)]()),this[_0x4ca85d(0x1d3)];},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x2a4)]=function(){const _0x25e524=_0x5a0093;return Window_CTB_TurnOrder[_0x25e524(0x329)]['EnemyBattlerType'];},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x24f)]=function(){const _0x1835b9=_0x5a0093;return this[_0x1835b9(0x1f7)]===undefined&&(this['_ctbTurnOrderFaceName']=this['createTurnOrderCTBGraphicFaceName']()),this['_ctbTurnOrderFaceName'];},Game_BattlerBase['prototype']['createTurnOrderCTBGraphicFaceName']=function(){const _0x502d8b=_0x5a0093;return Window_CTB_TurnOrder[_0x502d8b(0x329)]['EnemyBattlerFaceName'];},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x26d)]=function(){const _0x3b8d24=_0x5a0093;return this[_0x3b8d24(0x276)]===undefined&&(this['_ctbTurnOrderFaceIndex']=this[_0x3b8d24(0x1bd)]()),this[_0x3b8d24(0x276)];},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x1bd)]=function(){const _0x4877fb=_0x5a0093;return Window_CTB_TurnOrder[_0x4877fb(0x329)][_0x4877fb(0x249)];},Game_BattlerBase[_0x5a0093(0x314)]['TurnOrderCTBGraphicIconIndex']=function(){const _0x19f624=_0x5a0093;return this[_0x19f624(0x1ed)]===undefined&&(this[_0x19f624(0x1ed)]=this['createTurnOrderCTBGraphicIconIndex']()),this[_0x19f624(0x1ed)];},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x28f)]=function(){const _0x55f377=_0x5a0093;return Window_CTB_TurnOrder[_0x55f377(0x329)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x269)]=function(_0x4a61b7){const _0x291140=_0x5a0093;this[_0x291140(0x1ed)]=_0x4a61b7;},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x1b2)]=function(_0x42d02e,_0x561098){const _0x6c99c3=_0x5a0093;if(this[_0x6c99c3(0x23e)]())return Number[_0x6c99c3(0x258)];if(!this[_0x6c99c3(0x292)]())return Number[_0x6c99c3(0x258)];const _0x2897c9=VisuMZ[_0x6c99c3(0x1b4)][_0x6c99c3(0x329)][_0x6c99c3(0x2e7)]['SimilarAgi']??!![],_0x1ad81a=0x1;_0x42d02e*=_0x1ad81a;if(_0x42d02e===_0x1ad81a&&!_0x561098){if(this===BattleManager['_subject'])return Number[_0x6c99c3(0x20c)]/0xa;if(this===BattleManager['actor']())return Number['MIN_SAFE_INTEGER']/0xa;if(BattleManager[_0x6c99c3(0x1e1)]&&BattleManager[_0x6c99c3(0x1e1)][_0x6c99c3(0x2b8)](this)){let _0x109fdd=Number[_0x6c99c3(0x20c)]/0x1388;return _0x109fdd+=BattleManager['_actionBattlers'][_0x6c99c3(0x1eb)](this)*0x5,_0x109fdd;}if(this['_tpbState']===_0x6c99c3(0x22d)&&this[_0x6c99c3(0x1f1)]()&&this[_0x6c99c3(0x1f1)]()[_0x6c99c3(0x2ae)]()&&this[_0x6c99c3(0x1f1)]()[_0x6c99c3(0x2ae)]()[_0x6c99c3(0x22c)]<0x0){if(_0x2897c9)return(this['tpbRequiredCastTime']()*_0x1ad81a-this[_0x6c99c3(0x294)])/this[_0x6c99c3(0x336)]();}}_0x42d02e-=this[_0x6c99c3(0x333)]()*_0x1ad81a;if(this[_0x6c99c3(0x24c)]===_0x6c99c3(0x22d)&&this[_0x6c99c3(0x1f1)]()&&this[_0x6c99c3(0x1f1)]()['item']()&&this['currentAction']()['item']()[_0x6c99c3(0x22c)]<0x0){if(_0x2897c9)_0x42d02e+=this['tpbRequiredCastTime']()*_0x1ad81a-this[_0x6c99c3(0x294)];}return _0x42d02e/=this[_0x6c99c3(0x336)]()*_0x1ad81a,_0x42d02e||0x0;},Game_BattlerBase[_0x5a0093(0x314)][_0x5a0093(0x1b8)]=function(){const _0x5d53e8=_0x5a0093;return this[_0x5d53e8(0x24c)]===_0x5d53e8(0x22d)?(this[_0x5d53e8(0x2f5)]()-this[_0x5d53e8(0x294)])/this['tpbAcceleration']():0x0;},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x306)]=Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2fb)],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2fb)]=function(_0x3899b8){const _0x2c42e5=_0x5a0093;BattleManager['isCTB']()?this['initTpbChargeTimeCTB'](_0x3899b8):VisuMZ[_0x2c42e5(0x1b4)][_0x2c42e5(0x306)][_0x2c42e5(0x304)](this,_0x3899b8);},Game_Battler['prototype'][_0x5a0093(0x1f8)]=function(_0x3ec5ed){const _0x38cffd=_0x5a0093,_0x2c860b=VisuMZ[_0x38cffd(0x1b4)][_0x38cffd(0x329)]['Mechanics'];let _0x1a2c61=this[_0x38cffd(0x287)]()*eval(_0x2c860b['InitialGaugeJS']);const _0x47a451=this[_0x38cffd(0x1be)]()[_0x38cffd(0x1cc)](this[_0x38cffd(0x2dd)]()),_0x580e4c=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x3b7534=_0x47a451[_0x38cffd(0x265)](_0x143010=>_0x143010&&_0x143010['note']['match'](_0x580e4c)?Number(RegExp['$1'])*0.01:0x0);_0x1a2c61=_0x3b7534[_0x38cffd(0x1ec)]((_0x32fd40,_0x31c0cd)=>_0x32fd40+_0x31c0cd,_0x1a2c61),this['_tpbState']=_0x38cffd(0x328),this[_0x38cffd(0x274)]=(_0x3ec5ed?0x1:_0x1a2c61)[_0x38cffd(0x2cf)](0x0,0x1),this[_0x38cffd(0x1a2)]()&&(this[_0x38cffd(0x274)]=0x0);},Game_Battler['prototype'][_0x5a0093(0x323)]=function(){const _0x2c50f5=_0x5a0093;return this[_0x2c50f5(0x24c)]==='charging';},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x1d7)]=function(){const _0x1cb9e1=_0x5a0093;return this[_0x1cb9e1(0x24c)]===_0x1cb9e1(0x22d)&&this['currentAction']()&&this[_0x1cb9e1(0x1f1)]()[_0x1cb9e1(0x2ae)]()&&this['currentAction']()[_0x1cb9e1(0x2ae)]()[_0x1cb9e1(0x22c)]<0x0;},Game_BattlerBase['prototype'][_0x5a0093(0x17e)]=function(){const _0x195bdf=_0x5a0093;return this['isCtbCastingState']()?this[_0x195bdf(0x294)]/this[_0x195bdf(0x2f5)]():0x0;},Game_Battler['prototype']['ctbStopped']=function(){const _0x54beb5=_0x5a0093;return!this[_0x54beb5(0x267)]();},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2ac)]=function(_0x5f03d1){const _0x447a3d=_0x5a0093;this[_0x447a3d(0x1bb)]=_0x5f03d1,_0x5f03d1>=0x1&&(BattleManager[_0x447a3d(0x1e1)]=[]);},VisuMZ['BattleSystemCTB']['Game_Battler_updateTpbIdleTime']=Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2a7)],Game_Battler[_0x5a0093(0x314)]['updateTpbIdleTime']=function(){const _0x1847e6=_0x5a0093;BattleManager[_0x1847e6(0x2c0)]()?this[_0x1847e6(0x2c5)]():VisuMZ[_0x1847e6(0x1b4)][_0x1847e6(0x2fa)][_0x1847e6(0x304)](this);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2c5)]=function(){const _0x3104d1=_0x5a0093;!this['canMove']()&&(this[_0x3104d1(0x221)]+=this[_0x3104d1(0x336)]());},VisuMZ['BattleSystemCTB']['Game_Battler_isTpbReady']=Game_Battler[_0x5a0093(0x314)]['isTpbReady'],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x278)]=function(){const _0x1dc9cd=_0x5a0093;if(!VisuMZ[_0x1dc9cd(0x1b4)][_0x1dc9cd(0x21b)][_0x1dc9cd(0x304)](this))return![];if(BattleManager[_0x1dc9cd(0x2c0)]()){if(BattleManager[_0x1dc9cd(0x1e1)][_0x1dc9cd(0x2b8)](this))return!![];return BattleManager[_0x1dc9cd(0x1e1)][_0x1dc9cd(0x30c)]<=0x0;}else return!![];},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x29e)]=Game_Battler['prototype'][_0x5a0093(0x236)],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x236)]=function(){const _0xfee952=_0x5a0093;this[_0xfee952(0x298)]=BattleManager[_0xfee952(0x2c0)](),VisuMZ[_0xfee952(0x1b4)][_0xfee952(0x29e)][_0xfee952(0x304)](this),this['_onRestrictBypassCtbReset']=undefined;},VisuMZ[_0x5a0093(0x1b4)]['Game_Battler_clearTpbChargeTime']=Game_Battler['prototype']['clearTpbChargeTime'],Game_Battler[_0x5a0093(0x314)]['clearTpbChargeTime']=function(){const _0x224949=_0x5a0093;BattleManager[_0x224949(0x2c0)]()?this[_0x224949(0x293)]():VisuMZ[_0x224949(0x1b4)][_0x224949(0x17c)][_0x224949(0x304)](this);},Game_Battler['prototype'][_0x5a0093(0x293)]=function(){const _0x5db37f=_0x5a0093;if(this[_0x5db37f(0x298)])return;this['_tpbState']=_0x5db37f(0x328),this['_tpbChargeTime']-=0x1,this[_0x5db37f(0x274)]+=this[_0x5db37f(0x1bb)]||0x0;},VisuMZ[_0x5a0093(0x1b4)]['Game_Battler_applyTpbPenalty']=Game_Battler[_0x5a0093(0x314)]['applyTpbPenalty'],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x1f2)]=function(){const _0x3ddb9c=_0x5a0093;BattleManager['isCTB']()?this[_0x3ddb9c(0x2d7)]():VisuMZ[_0x3ddb9c(0x1b4)][_0x3ddb9c(0x2f6)]['call'](this);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2d7)]=function(){const _0x27273e=_0x5a0093;this[_0x27273e(0x24c)]=_0x27273e(0x328),this[_0x27273e(0x274)]+=VisuMZ[_0x27273e(0x1b4)][_0x27273e(0x329)][_0x27273e(0x2ce)]['EscapeFailPenalty']||0x0;},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2dc)]=Game_Battler[_0x5a0093(0x314)]['tpbSpeed'],Game_Battler[_0x5a0093(0x314)]['tpbSpeed']=function(){const _0x24f6cf=_0x5a0093;return BattleManager[_0x24f6cf(0x2c0)]()?VisuMZ['BattleSystemCTB'][_0x24f6cf(0x329)]['Mechanics']['TpbSpeedCalcJS'][_0x24f6cf(0x304)](this,this):VisuMZ[_0x24f6cf(0x1b4)][_0x24f6cf(0x2dc)][_0x24f6cf(0x304)](this);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2ec)]=Game_Battler['prototype'][_0x5a0093(0x253)],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x253)]=function(){const _0xe2d07a=_0x5a0093;return BattleManager['isCTB']()?VisuMZ[_0xe2d07a(0x1b4)][_0xe2d07a(0x329)][_0xe2d07a(0x2ce)][_0xe2d07a(0x25d)][_0xe2d07a(0x304)](this,this):VisuMZ[_0xe2d07a(0x1b4)]['Game_Battler_tpbBaseSpeed'][_0xe2d07a(0x304)](this);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1bf)]=Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x287)],Game_Battler[_0x5a0093(0x314)]['tpbRelativeSpeed']=function(){const _0x13ec4a=_0x5a0093;return BattleManager[_0x13ec4a(0x2c0)]()?VisuMZ[_0x13ec4a(0x1b4)][_0x13ec4a(0x329)]['Mechanics']['BattlerRelativeSpeedJS'][_0x13ec4a(0x304)](this,this):VisuMZ[_0x13ec4a(0x1b4)][_0x13ec4a(0x1bf)][_0x13ec4a(0x304)](this);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x326)]=Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x336)],Game_Battler['prototype'][_0x5a0093(0x336)]=function(){const _0x3ff8f4=_0x5a0093;if(BattleManager[_0x3ff8f4(0x2c0)]()){let _0x1ccd7f=VisuMZ[_0x3ff8f4(0x1b4)][_0x3ff8f4(0x329)][_0x3ff8f4(0x2ce)][_0x3ff8f4(0x229)][_0x3ff8f4(0x304)](this,this);const _0x5f3a46=0x0;return _0x1ccd7f+_0x5f3a46;}else return VisuMZ['BattleSystemCTB'][_0x3ff8f4(0x326)][_0x3ff8f4(0x304)](this);},VisuMZ[_0x5a0093(0x1b4)]['Game_Battler_tpbRequiredCastTime']=Game_Battler['prototype']['tpbRequiredCastTime'],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x2f5)]=function(){const _0x48adaf=_0x5a0093;return BattleManager[_0x48adaf(0x2c0)]()?VisuMZ[_0x48adaf(0x1b4)][_0x48adaf(0x329)]['Mechanics'][_0x48adaf(0x317)][_0x48adaf(0x304)](this,this):VisuMZ[_0x48adaf(0x1b4)]['Game_Battler_tpbRequiredCastTime']['call'](this);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x218)]=function(){const _0x4573ff=_0x5a0093,_0x65c1a2=SceneManager[_0x4573ff(0x225)][_0x4573ff(0x2bb)];if(!_0x65c1a2)return-0x1;const _0x489ca0=_0x65c1a2[_0x4573ff(0x32f)];if(!_0x489ca0)return-0x1;const _0x406afb=_0x489ca0[_0x4573ff(0x31a)](_0x24cd4a=>_0x24cd4a[_0x4573ff(0x30e)]()===this);return _0x489ca0['indexOf'](_0x406afb);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x301)]=function(_0xf2a909){const _0x235c71=_0x5a0093;if(!BattleManager[_0x235c71(0x2c0)]())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager[_0x235c71(0x194)]())return;if(this===BattleManager[_0x235c71(0x2c3)])return;const _0x417fa8=this[_0x235c71(0x218)]();if(_0x417fa8<0x0)return;this[_0x235c71(0x338)](_0x417fa8+_0xf2a909);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x338)]=function(_0x1a92b3){const _0x351981=_0x5a0093;if(!BattleManager[_0x351981(0x2c0)]())return;if(!SceneManager[_0x351981(0x29a)]())return;if(this===BattleManager[_0x351981(0x194)]())return;if(this===BattleManager[_0x351981(0x2c3)])return;_0x1a92b3=Math['max'](_0x1a92b3,0x1),this[_0x351981(0x185)](_0x1a92b3);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x185)]=function(_0x308b1e){const _0x584c24=_0x5a0093;if(!BattleManager[_0x584c24(0x2c0)]())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x584c24(0x2c3)])return;const _0x5ec3b7=SceneManager[_0x584c24(0x225)]['_ctbTurnOrderWindow'];if(!_0x5ec3b7)return;const _0x4e244d=_0x5ec3b7[_0x584c24(0x32f)];if(!_0x4e244d)return;const _0x5b924c=this[_0x584c24(0x218)]();_0x5b924c!==_0x308b1e&&this[_0x584c24(0x205)](_0x308b1e-_0x5b924c);let _0x153584=_0x308b1e,_0x505f62=_0x308b1e;_0x5b924c>_0x308b1e?_0x153584-=0x1:_0x505f62+=0x1;const _0xf6e62f=_0x4e244d[_0x153584]['ticksLeft'](!![]),_0x401131=_0x4e244d[_0x505f62][_0x584c24(0x196)](!![]),_0x2fff3e=(_0xf6e62f+_0x401131)/0x2;let _0x2e2c1b=_0x2fff3e*this[_0x584c24(0x336)]();if(this[_0x584c24(0x24c)]===_0x584c24(0x328))this[_0x584c24(0x274)]=0x1-_0x2e2c1b;else this['_tpbState']===_0x584c24(0x22d)&&(this[_0x584c24(0x294)]=this[_0x584c24(0x2f5)]()-_0x2e2c1b);BattleManager[_0x584c24(0x1e1)]=[],BattleManager[_0x584c24(0x24d)]();},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x205)]=function(_0x4c5eaa){const _0x4c9d4f=_0x5a0093,_0x579af4=VisuMZ[_0x4c9d4f(0x1b4)]['Settings'][_0x4c9d4f(0x28a)],_0x29dce5=_0x4c5eaa>0x0?'Delay':_0x4c9d4f(0x32a);if(_0x579af4[_0x4c9d4f(0x2af)[_0x4c9d4f(0x266)](_0x29dce5)]){const _0x641b68=_0x579af4[_0x4c9d4f(0x2af)[_0x4c9d4f(0x266)](_0x29dce5)],_0x37b154=_0x579af4[_0x4c9d4f(0x30f)[_0x4c9d4f(0x266)](_0x29dce5)],_0x361744=_0x579af4[_0x4c9d4f(0x31f)[_0x4c9d4f(0x266)](_0x29dce5)];$gameTemp[_0x4c9d4f(0x206)]([this],_0x641b68,_0x37b154,_0x361744);}if(this[_0x4c9d4f(0x30e)]()&&_0x579af4['%1PopupText'[_0x4c9d4f(0x266)](_0x29dce5)]['length']>0x0){const _0x37417d=_0x579af4[_0x4c9d4f(0x263)[_0x4c9d4f(0x266)](_0x29dce5)],_0x3ad1a9={'textColor':ColorManager[_0x4c9d4f(0x193)](_0x579af4[_0x4c9d4f(0x1cf)['format'](_0x29dce5)]),'flashColor':_0x579af4[_0x4c9d4f(0x332)[_0x4c9d4f(0x266)](_0x29dce5)],'flashDuration':_0x579af4['%1FlashDuration'[_0x4c9d4f(0x266)](_0x29dce5)]};this[_0x4c9d4f(0x1f0)](_0x37417d,_0x3ad1a9);}},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x17d)]=Game_Battler['prototype'][_0x5a0093(0x21f)],Game_Battler['prototype'][_0x5a0093(0x21f)]=function(){const _0x21ab92=_0x5a0093;if(BattleManager[_0x21ab92(0x2e8)](this)){BattleManager[_0x21ab92(0x18a)]=BattleManager[_0x21ab92(0x18a)]||0x0,BattleManager[_0x21ab92(0x18a)]++;if(BattleManager[_0x21ab92(0x18a)]<0x3c)return;}VisuMZ['BattleSystemCTB'][_0x21ab92(0x17d)][_0x21ab92(0x304)](this);},BattleManager['ctbHasInstantActionAfter']=function(_0x32ce52){const _0xc82f37=_0x5a0093;return BattleManager[_0xc82f37(0x1b1)]()['filter'](_0x5e4112=>_0x5e4112!==_0x32ce52)[_0xc82f37(0x232)](_0x24367c=>_0x24367c[_0xc82f37(0x2fe)]()&&_0x24367c[_0xc82f37(0x267)]()&&_0x24367c['_ctbAfterSpeed']>=0x1);},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1af)]=Game_Battler[_0x5a0093(0x314)]['updateTpbChargeTime'],Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x33c)]=function(){const _0x2fcfc6=_0x5a0093;BattleManager[_0x2fcfc6(0x2c0)]()?this[_0x2fcfc6(0x252)]():VisuMZ['BattleSystemCTB'][_0x2fcfc6(0x1af)][_0x2fcfc6(0x304)](this);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x252)]=function(){const _0x27537b=_0x5a0093;this['_tpbState']===_0x27537b(0x328)&&(this[_0x27537b(0x274)]+=this[_0x27537b(0x336)](),this[_0x27537b(0x274)]>=0x1&&this[_0x27537b(0x2ea)]());},VisuMZ[_0x5a0093(0x1b4)]['Game_Battler_updateTpbCastTime']=Game_Battler[_0x5a0093(0x314)]['updateTpbCastTime'],Game_Battler['prototype']['updateTpbCastTime']=function(){const _0x1f05e2=_0x5a0093;BattleManager[_0x1f05e2(0x2c0)]()?this['updateTpbCastTimeCTB']():VisuMZ[_0x1f05e2(0x1b4)][_0x1f05e2(0x1d1)][_0x1f05e2(0x304)](this);},Game_Battler[_0x5a0093(0x314)][_0x5a0093(0x282)]=function(){const _0x326db9=_0x5a0093;this[_0x326db9(0x24c)]===_0x326db9(0x22d)&&(this[_0x326db9(0x294)]+=this[_0x326db9(0x336)](),this['_tpbCastTime']>=this[_0x326db9(0x2f5)]()&&(this[_0x326db9(0x24c)]=_0x326db9(0x2e0)));},Game_Actor[_0x5a0093(0x314)][_0x5a0093(0x2a4)]=function(){const _0x310aed=_0x5a0093,_0x2e2734=this[_0x310aed(0x194)]()[_0x310aed(0x25c)];if(_0x2e2734[_0x310aed(0x296)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x310aed(0x23b);else{if(_0x2e2734['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x310aed(0x2b6);}return Window_CTB_TurnOrder[_0x310aed(0x329)][_0x310aed(0x2aa)];},Game_Actor[_0x5a0093(0x314)][_0x5a0093(0x1c4)]=function(){const _0x21fa1f=_0x5a0093,_0x20f59b=this['actor']()[_0x21fa1f(0x25c)];if(_0x20f59b[_0x21fa1f(0x296)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x5a0093(0x314)][_0x5a0093(0x1bd)]=function(){const _0x178535=_0x5a0093,_0x28a35c=this[_0x178535(0x194)]()[_0x178535(0x25c)];if(_0x28a35c[_0x178535(0x296)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x178535(0x181)]();},Game_Actor[_0x5a0093(0x314)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x109fa8=_0x5a0093,_0xa41657=this[_0x109fa8(0x194)]()[_0x109fa8(0x25c)];if(_0xa41657[_0x109fa8(0x296)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x109fa8(0x302)];},Game_Enemy[_0x5a0093(0x314)][_0x5a0093(0x2a4)]=function(){const _0x23cee8=_0x5a0093,_0x2c1edb=this[_0x23cee8(0x299)]()['note'];if(_0x2c1edb[_0x23cee8(0x296)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x23cee8(0x23b);else{if(_0x2c1edb[_0x23cee8(0x296)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x23cee8(0x2b6);}return Window_CTB_TurnOrder[_0x23cee8(0x329)][_0x23cee8(0x1ad)];},Game_Enemy[_0x5a0093(0x314)][_0x5a0093(0x1c4)]=function(){const _0xaef6b6=_0x5a0093,_0x53e263=this[_0xaef6b6(0x299)]()['note'];if(_0x53e263['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0xaef6b6(0x329)][_0xaef6b6(0x330)];},Game_Enemy[_0x5a0093(0x314)][_0x5a0093(0x1bd)]=function(){const _0x56c1f3=_0x5a0093,_0x16bdda=this[_0x56c1f3(0x299)]()[_0x56c1f3(0x25c)];if(_0x16bdda[_0x56c1f3(0x296)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder['Settings'][_0x56c1f3(0x249)];},Game_Enemy[_0x5a0093(0x314)][_0x5a0093(0x28f)]=function(){const _0x1238f7=_0x5a0093,_0x41db03=this[_0x1238f7(0x299)]()[_0x1238f7(0x25c)];if(_0x41db03['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x1238f7(0x329)][_0x1238f7(0x1a8)];},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2c1)]=Scene_Battle[_0x5a0093(0x314)][_0x5a0093(0x23d)],Scene_Battle['prototype']['createAllWindows']=function(){const _0xc38c30=_0x5a0093;VisuMZ[_0xc38c30(0x1b4)][_0xc38c30(0x2c1)][_0xc38c30(0x304)](this),this['createCTBTurnOrderWindow']();},Scene_Battle['prototype'][_0x5a0093(0x18c)]=function(){const _0x9d2806=_0x5a0093;if(!BattleManager['isCTB']())return;this[_0x9d2806(0x2bb)]=new Window_CTB_TurnOrder();const _0x4977c0=this['getChildIndex'](this[_0x9d2806(0x1ca)]);this['addChildAt'](this[_0x9d2806(0x2bb)],_0x4977c0),this['repositionLogWindowCTB'](),BattleManager['updateTurnOrderCTB'](!![]);},Scene_Battle['prototype'][_0x5a0093(0x1f6)]=function(){const _0x1dc1cf=_0x5a0093,_0x40fbb0=Window_CTB_TurnOrder[_0x1dc1cf(0x329)];if(_0x40fbb0['DisplayPosition']!==_0x1dc1cf(0x19e))return;if(!_0x40fbb0[_0x1dc1cf(0x1e5)])return;if(!this['_logWindow'])return;const _0x27c392=this[_0x1dc1cf(0x2bb)]['y']-Math[_0x1dc1cf(0x337)]((Graphics[_0x1dc1cf(0x242)]-Graphics['boxHeight'])/0x2),_0x46627e=_0x27c392+this['_ctbTurnOrderWindow'][_0x1dc1cf(0x242)];this[_0x1dc1cf(0x1dd)]['y']=_0x46627e+_0x40fbb0[_0x1dc1cf(0x20b)];};function Sprite_CTB_TurnOrder_Battler(){this['initialize'](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]=Object['create'](Sprite_Clickable[_0x5a0093(0x314)]),Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1cb)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x308)]=function(_0x274f81,_0x1f40a4,_0x3f7bb4){const _0x5f260b=_0x5a0093;this[_0x5f260b(0x1e0)](_0x274f81,_0x1f40a4,_0x3f7bb4),Sprite_Clickable[_0x5f260b(0x314)][_0x5f260b(0x308)][_0x5f260b(0x304)](this),this[_0x5f260b(0x198)]();},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1e0)]=function(_0x4e995b,_0x2405ed,_0x45426f){const _0x41ae87=_0x5a0093;this['_unit']=_0x4e995b,this[_0x41ae87(0x1fa)]=_0x2405ed,this[_0x41ae87(0x2e5)]=_0x45426f;const _0x5ed84f=Window_CTB_TurnOrder['Settings'],_0x160c25=this['isHorz'](),_0x299bc8=this['defaultPosition']();this[_0x41ae87(0x27a)]=0x0,this[_0x41ae87(0x207)]=_0x160c25?_0x5ed84f[_0x41ae87(0x255)]*_0x299bc8:0x0,this['_positionTargetY']=_0x160c25?0x0:_0x5ed84f['SpriteThin']*_0x299bc8,this[_0x41ae87(0x2f7)]=0x0,this[_0x41ae87(0x2b4)]=0xff,this[_0x41ae87(0x2b1)]=!![],this['_isAppeared']=!![];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x198)]=function(){const _0x2a6549=_0x5a0093;this['createInitialPositions'](),this[_0x2a6549(0x248)](),this[_0x2a6549(0x324)](),this[_0x2a6549(0x335)](),this[_0x2a6549(0x2c9)]();},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x24b)]=function(){const _0x424e45=_0x5a0093;this['x']=this[_0x424e45(0x207)],this['y']=this[_0x424e45(0x28b)];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x32c)]=function(){const _0x552af6=_0x5a0093,_0x12fd7f=Window_CTB_TurnOrder[_0x552af6(0x329)],_0x4752d2=[_0x552af6(0x19e),'bottom'][_0x552af6(0x2b8)](_0x12fd7f[_0x552af6(0x2cb)]);return _0x4752d2;},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x239)]=function(){const _0xf41cec=_0x5a0093,_0x104339=Window_CTB_TurnOrder['Settings'];return this[_0xf41cec(0x32c)]()?_0x104339[_0xf41cec(0x255)]:_0x104339['SpriteLength'];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]['bitmapHeight']=function(){const _0x1615c8=_0x5a0093,_0x42777f=Window_CTB_TurnOrder[_0x1615c8(0x329)];return this['isHorz']()?_0x42777f['SpriteLength']:_0x42777f[_0x1615c8(0x255)];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]['createTestBitmap']=function(){const _0x59ee28=_0x5a0093;this['bitmap']=new Bitmap(0x48,0x24);const _0x488247=this[_0x59ee28(0x30e)]()?this[_0x59ee28(0x30e)]()[_0x59ee28(0x286)]():_0x59ee28(0x243)[_0x59ee28(0x266)](this[_0x59ee28(0x32b)],this[_0x59ee28(0x1fa)],this['_dupe']);this[_0x59ee28(0x2e3)][_0x59ee28(0x1b6)](_0x488247,0x0,0x0,0x48,0x24,'center');},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x248)]=function(){const _0x1a63fe=_0x5a0093;if(!Window_CTB_TurnOrder[_0x1a63fe(0x329)]['ShowMarkerBg'])return;const _0x3f6337=Window_CTB_TurnOrder['Settings'],_0x34882e=this[_0x1a63fe(0x32b)]===$gameParty?'Actor':_0x1a63fe(0x1d8),_0x5294d5=_0x1a63fe(0x210)[_0x1a63fe(0x266)](_0x34882e),_0xf34388=new Sprite();_0xf34388[_0x1a63fe(0x1d6)]['x']=this[_0x1a63fe(0x1d6)]['x'],_0xf34388[_0x1a63fe(0x1d6)]['y']=this[_0x1a63fe(0x1d6)]['y'];if(_0x3f6337[_0x5294d5])_0xf34388[_0x1a63fe(0x2e3)]=ImageManager[_0x1a63fe(0x21e)](_0x3f6337[_0x5294d5]);else{const _0x46f45c=this['bitmapWidth'](),_0x3fef9a=this[_0x1a63fe(0x2cc)]();_0xf34388[_0x1a63fe(0x2e3)]=new Bitmap(_0x46f45c,_0x3fef9a);const _0x4b3760=ColorManager[_0x1a63fe(0x193)](_0x3f6337['%1BgColor1'['format'](_0x34882e)]),_0x747e34=ColorManager[_0x1a63fe(0x193)](_0x3f6337[_0x1a63fe(0x2a8)[_0x1a63fe(0x266)](_0x34882e)]);_0xf34388[_0x1a63fe(0x2e3)][_0x1a63fe(0x31d)](0x0,0x0,_0x46f45c,_0x3fef9a,_0x4b3760,_0x747e34,!![]);}this[_0x1a63fe(0x1ef)]=_0xf34388,this[_0x1a63fe(0x214)](this[_0x1a63fe(0x1ef)]),this['width']=this['_backgroundSprite'][_0x1a63fe(0x224)],this[_0x1a63fe(0x242)]=this[_0x1a63fe(0x1ef)][_0x1a63fe(0x242)];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x324)]=function(){const _0x16a684=_0x5a0093,_0x30e7d6=new Sprite();_0x30e7d6[_0x16a684(0x1d6)]['x']=this[_0x16a684(0x1d6)]['x'],_0x30e7d6[_0x16a684(0x1d6)]['y']=this['anchor']['y'],this['_graphicSprite']=_0x30e7d6,this[_0x16a684(0x214)](this[_0x16a684(0x1ba)]),this[_0x16a684(0x26a)]();},Sprite_CTB_TurnOrder_Battler['prototype']['createBorderSprite']=function(){const _0x3d5210=_0x5a0093;if(!Window_CTB_TurnOrder['Settings'][_0x3d5210(0x295)])return;const _0x22018c=Window_CTB_TurnOrder[_0x3d5210(0x329)],_0xd2ab47=this[_0x3d5210(0x32b)]===$gameParty?_0x3d5210(0x26e):_0x3d5210(0x1d8),_0xa67b30=_0x3d5210(0x27d)[_0x3d5210(0x266)](_0xd2ab47),_0x448d57=new Sprite();_0x448d57[_0x3d5210(0x1d6)]['x']=this['anchor']['x'],_0x448d57[_0x3d5210(0x1d6)]['y']=this[_0x3d5210(0x1d6)]['y'];if(_0x22018c[_0xa67b30])_0x448d57['bitmap']=ImageManager['loadSystem'](_0x22018c[_0xa67b30]);else{let _0x31a375=this[_0x3d5210(0x239)](),_0x4c3269=this[_0x3d5210(0x2cc)](),_0x3e2801=_0x22018c[_0x3d5210(0x177)];_0x448d57[_0x3d5210(0x2e3)]=new Bitmap(_0x31a375,_0x4c3269);const _0x121226=_0x3d5210(0x2de),_0x799598=ColorManager[_0x3d5210(0x193)](_0x22018c[_0x3d5210(0x262)[_0x3d5210(0x266)](_0xd2ab47)]);_0x448d57[_0x3d5210(0x2e3)][_0x3d5210(0x288)](0x0,0x0,_0x31a375,_0x4c3269,_0x121226),_0x31a375-=0x2,_0x4c3269-=0x2,_0x448d57[_0x3d5210(0x2e3)][_0x3d5210(0x288)](0x1,0x1,_0x31a375,_0x4c3269,_0x799598),_0x31a375-=_0x3e2801*0x2,_0x4c3269-=_0x3e2801*0x2,_0x448d57['bitmap'][_0x3d5210(0x288)](0x1+_0x3e2801,0x1+_0x3e2801,_0x31a375,_0x4c3269,_0x121226),_0x31a375-=0x2,_0x4c3269-=0x2,_0x3e2801+=0x1,_0x448d57['bitmap'][_0x3d5210(0x291)](0x1+_0x3e2801,0x1+_0x3e2801,_0x31a375,_0x4c3269);}this['_backgroundSprite']=_0x448d57,this[_0x3d5210(0x214)](this[_0x3d5210(0x1ef)]);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x2c9)]=function(){const _0x5602ce=_0x5a0093,_0x21f161=Window_CTB_TurnOrder['Settings'];if(!_0x21f161[_0x5602ce(0x246)])return;if(this['_unit']===$gameParty)return;const _0x2bb445=this[_0x5602ce(0x239)](),_0x292742=this[_0x5602ce(0x2cc)](),_0x25eb8e=new Sprite();_0x25eb8e[_0x5602ce(0x1d6)]['x']=this[_0x5602ce(0x1d6)]['x'],_0x25eb8e['anchor']['y']=this[_0x5602ce(0x1d6)]['y'],_0x25eb8e[_0x5602ce(0x2e3)]=new Bitmap(_0x2bb445,_0x292742),this['_letterSprite']=_0x25eb8e,this[_0x5602ce(0x214)](this['_letterSprite']);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]['battler']=function(){const _0x38c932=_0x5a0093;return this[_0x38c932(0x32b)]?this[_0x38c932(0x32b)][_0x38c932(0x1ea)]()[this['_index']]:null;},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x196)]=function(_0x2dc88a){const _0x585594=_0x5a0093,_0x3ecec0=this['battler']();if(!_0x3ecec0)return Number[_0x585594(0x258)];const _0xf0556f=0x1*(this[_0x585594(0x2e5)]+0x1);return _0x3ecec0[_0x585594(0x1b2)](_0xf0556f,_0x2dc88a);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5a0093(0x19d)]=function(){const _0x59ec52=_0x5a0093;return this[_0x59ec52(0x30e)]()&&this['battler']()===BattleManager[_0x59ec52(0x2c3)]&&this[_0x59ec52(0x2e5)]<=0x0;},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x228)]=function(){const _0x103ef0=_0x5a0093;Sprite_Clickable[_0x103ef0(0x314)][_0x103ef0(0x228)]['call'](this),this[_0x103ef0(0x183)](),this[_0x103ef0(0x303)](),this[_0x103ef0(0x1a6)](),this[_0x103ef0(0x277)](),this['updateGraphic'](),this[_0x103ef0(0x244)](),this[_0x103ef0(0x251)](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5a0093(0x183)]=function(){const _0x3185c0=_0x5a0093,_0x479d6d=this['containerPosition']();if(this[_0x3185c0(0x18f)]===_0x479d6d)return;this[_0x3185c0(0x18f)]=_0x479d6d;const _0x35acba=Window_CTB_TurnOrder['Settings'],_0x472837=this[_0x3185c0(0x32c)](),_0x42314f=_0x35acba[_0x3185c0(0x290)],_0x1bd202=_0x35acba[_0x3185c0(0x297)],_0x357543=SceneManager[_0x3185c0(0x225)]['_ctbTurnOrderWindow'];if(!_0x357543)return;this[_0x3185c0(0x27a)]=_0x35acba[_0x3185c0(0x222)],this[_0x3185c0(0x207)]=_0x472837?_0x35acba[_0x3185c0(0x255)]*_0x479d6d:0x0,this[_0x3185c0(0x28b)]=_0x472837?0x0:_0x35acba['SpriteThin']*_0x479d6d,_0x479d6d>0x0&&(this[_0x3185c0(0x207)]+=_0x472837?_0x1bd202:0x0,this[_0x3185c0(0x28b)]+=_0x472837?0x0:_0x1bd202),_0x42314f?this[_0x3185c0(0x207)]=_0x472837?_0x357543[_0x3185c0(0x224)]-this['_positionTargetX']-_0x35acba['SpriteThin']:0x0:this['_positionTargetY']=_0x472837?0x0:_0x357543[_0x3185c0(0x242)]-this[_0x3185c0(0x28b)]-_0x35acba[_0x3185c0(0x255)];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x303)]=function(){const _0xbf5f6b=_0x5a0093;if(this['_fadeDuration']>0x0)return;if(this[_0xbf5f6b(0x27a)]>0x0){const _0x474851=this['_positionDuration'];this['x']=(this['x']*(_0x474851-0x1)+this[_0xbf5f6b(0x207)])/_0x474851,this['y']=(this['y']*(_0x474851-0x1)+this['_positionTargetY'])/_0x474851,this[_0xbf5f6b(0x27a)]--;}this[_0xbf5f6b(0x27a)]<=0x0&&this[_0xbf5f6b(0x2b1)]&&(this['x']=this['_positionTargetX'],this['y']=this[_0xbf5f6b(0x28b)],this[_0xbf5f6b(0x1f4)]<=0x0&&!this[_0xbf5f6b(0x1dc)]&&this[_0xbf5f6b(0x2e9)](0xff));},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x195)]=function(){const _0xef1efc=_0x5a0093;return Window_CTB_TurnOrder[_0xef1efc(0x329)]['TotalHorzSprites']*0x14;},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x24a)]=function(){const _0x46cdbf=_0x5a0093;return SceneManager[_0x46cdbf(0x225)]['_ctbTurnOrderWindow'];},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]['containerPosition']=function(){const _0x3eef1f=_0x5a0093;if(!this['containerWindow']())return this[_0x3eef1f(0x195)]();const _0x2682f3=this[_0x3eef1f(0x24a)]()[_0x3eef1f(0x32f)];return _0x2682f3[_0x3eef1f(0x1eb)](this);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x230)]=function(){const _0x371c21=_0x5a0093,_0x36d8e5=Window_CTB_TurnOrder['Settings'],_0x415157=this[_0x371c21(0x32c)](),_0x105717=_0x415157?_0x36d8e5['TotalHorzSprites']:_0x36d8e5[_0x371c21(0x2da)];this[_0x371c21(0x2e5)]-=0x1,this[_0x371c21(0x2e5)]<0x0&&(this[_0x371c21(0x2e5)]=_0x105717-0x1,this['startFade'](0x0));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5a0093(0x2e9)]=function(_0x46c6c6){const _0x34c725=_0x5a0093,_0x1859d3=Window_CTB_TurnOrder['Settings'];this[_0x34c725(0x2f7)]=_0x1859d3[_0x34c725(0x222)],this[_0x34c725(0x2b4)]=_0x46c6c6;},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1a6)]=function(){const _0x42964f=_0x5a0093,_0x450550=this[_0x42964f(0x30e)]();if(!_0x450550)return;if(this[_0x42964f(0x2b1)]===_0x450550[_0x42964f(0x2fe)]()&&this['_isAppeared']===_0x450550[_0x42964f(0x292)]())return;this[_0x42964f(0x2b1)]=_0x450550[_0x42964f(0x2fe)](),this[_0x42964f(0x313)]=_0x450550[_0x42964f(0x292)]();let _0x227eda=this['_isAlive']&&this[_0x42964f(0x313)]?0xff:0x0;this[_0x42964f(0x2e9)](_0x227eda);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]['updateOpacity']=function(){const _0x552f22=_0x5a0093;if(this[_0x552f22(0x2f7)]>0x0){const _0x44e841=this[_0x552f22(0x2f7)];this[_0x552f22(0x1f4)]=(this['opacity']*(_0x44e841-0x1)+this[_0x552f22(0x2b4)])/_0x44e841,this['_fadeDuration']--,this[_0x552f22(0x2f7)]<=0x0&&(this['checkPosition'](),this[_0x552f22(0x27a)]=0x0,this['updatePosition'](),this[_0x552f22(0x1f4)]=this[_0x552f22(0x2b4)]);}if(this[_0x552f22(0x1dc)])return;BattleManager[_0x552f22(0x2cd)]===_0x552f22(0x190)&&(this['_isBattleOver']=!![],this[_0x552f22(0x2e9)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1ce)]=function(){const _0x158241=_0x5a0093,_0x244163=this[_0x158241(0x30e)]();if(!_0x244163)return;const _0x3d71e3=Window_CTB_TurnOrder[_0x158241(0x329)],_0xc630f5=this[_0x158241(0x32b)]===$gameParty?_0x158241(0x26e):'Enemy';let _0x22f639=_0x244163[_0x158241(0x2f8)]();if(_0x244163[_0x158241(0x2d4)]()&&_0x22f639===_0x158241(0x299))_0x22f639=_0x158241(0x23b);else _0x244163['isEnemy']()&&_0x22f639===_0x158241(0x1f9)&&(_0x22f639=_0x158241(0x299));if(this[_0x158241(0x2f1)]!==_0x22f639)return this['processUpdateGraphic']();switch(this['_graphicType']){case _0x158241(0x23b):if(this[_0x158241(0x1b7)]!==_0x244163[_0x158241(0x24f)]())return this[_0x158241(0x26a)]();if(this[_0x158241(0x307)]!==_0x244163[_0x158241(0x26d)]())return this['processUpdateGraphic']();break;case _0x158241(0x2b6):if(this[_0x158241(0x261)]!==_0x244163[_0x158241(0x247)]())return this[_0x158241(0x26a)]();break;case _0x158241(0x299):if(_0x244163[_0x158241(0x208)]()){if(this[_0x158241(0x316)]!==_0x244163['svBattlerName']())return this['processUpdateGraphic']();}else{if(this[_0x158241(0x1a5)]!==_0x244163[_0x158241(0x1fb)]())return this[_0x158241(0x26a)]();}break;case _0x158241(0x1f9):if(_0x244163[_0x158241(0x2d4)]()){if(this['_graphicSv']!==_0x244163[_0x158241(0x1fb)]())return this['processUpdateGraphic']();}else{if(this[_0x158241(0x1a5)]!==_0x244163[_0x158241(0x1fb)]())return this[_0x158241(0x26a)]();}break;}},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x26a)]=function(){const _0x2da7d0=_0x5a0093,_0x4ffac8=this[_0x2da7d0(0x30e)]();if(!_0x4ffac8)return;this[_0x2da7d0(0x2f1)]=_0x4ffac8[_0x2da7d0(0x2f8)]();if(_0x4ffac8[_0x2da7d0(0x2d4)]()&&this[_0x2da7d0(0x2f1)]===_0x2da7d0(0x299))this['_graphicType']=_0x2da7d0(0x23b);else _0x4ffac8[_0x2da7d0(0x191)]()&&this[_0x2da7d0(0x2f1)]===_0x2da7d0(0x1f9)&&(this[_0x2da7d0(0x2f1)]='enemy');let _0x4827a3;switch(this['_graphicType']){case'face':this[_0x2da7d0(0x1b7)]=_0x4ffac8[_0x2da7d0(0x24f)](),this['_graphicFaceIndex']=_0x4ffac8['TurnOrderCTBGraphicFaceIndex'](),_0x4827a3=ImageManager[_0x2da7d0(0x19f)](this[_0x2da7d0(0x1b7)]),_0x4827a3[_0x2da7d0(0x20e)](this[_0x2da7d0(0x1b0)][_0x2da7d0(0x1e6)](this,_0x4827a3));break;case _0x2da7d0(0x2b6):this['_graphicIconIndex']=_0x4ffac8[_0x2da7d0(0x28f)](),_0x4827a3=ImageManager[_0x2da7d0(0x21e)](_0x2da7d0(0x2eb)),_0x4827a3[_0x2da7d0(0x20e)](this[_0x2da7d0(0x240)][_0x2da7d0(0x1e6)](this,_0x4827a3));break;case _0x2da7d0(0x299):if(_0x4ffac8['hasSvBattler']())this[_0x2da7d0(0x316)]=_0x4ffac8[_0x2da7d0(0x184)](),_0x4827a3=ImageManager['loadSvActor'](this[_0x2da7d0(0x316)]),_0x4827a3[_0x2da7d0(0x20e)](this[_0x2da7d0(0x1e8)][_0x2da7d0(0x1e6)](this,_0x4827a3));else $gameSystem[_0x2da7d0(0x2bd)]()?(this[_0x2da7d0(0x1a5)]=_0x4ffac8[_0x2da7d0(0x1fb)](),_0x4827a3=ImageManager['loadSvEnemy'](this[_0x2da7d0(0x1a5)]),_0x4827a3[_0x2da7d0(0x20e)](this[_0x2da7d0(0x300)][_0x2da7d0(0x1e6)](this,_0x4827a3))):(this[_0x2da7d0(0x1a5)]=_0x4ffac8[_0x2da7d0(0x1fb)](),_0x4827a3=ImageManager[_0x2da7d0(0x1c0)](this[_0x2da7d0(0x1a5)]),_0x4827a3[_0x2da7d0(0x20e)](this[_0x2da7d0(0x300)][_0x2da7d0(0x1e6)](this,_0x4827a3)));break;case _0x2da7d0(0x1f9):this['_graphicSv']=_0x4ffac8[_0x2da7d0(0x1fb)](),_0x4827a3=ImageManager[_0x2da7d0(0x320)](this[_0x2da7d0(0x316)]),_0x4827a3['addLoadListener'](this[_0x2da7d0(0x1e8)]['bind'](this,_0x4827a3));break;}},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1b0)]=function(_0x43ef9a){const _0x18e91d=_0x5a0093,_0xc637e8=this[_0x18e91d(0x307)],_0x4ba609=this[_0x18e91d(0x239)](),_0x3394ef=this[_0x18e91d(0x2cc)](),_0x3b0e1d=Math[_0x18e91d(0x1e3)](_0x4ba609,_0x3394ef);this['_graphicSprite']['bitmap']=new Bitmap(_0x4ba609,_0x3394ef);const _0x2c97ac=this[_0x18e91d(0x1ba)][_0x18e91d(0x2e3)],_0x13777f=ImageManager['faceWidth'],_0x147737=ImageManager[_0x18e91d(0x28d)],_0x229a3b=_0x3b0e1d/Math['max'](_0x13777f,_0x147737),_0x4bc17c=ImageManager[_0x18e91d(0x25f)],_0x4f4681=ImageManager[_0x18e91d(0x28d)],_0x11ad32=_0xc637e8%0x4*_0x13777f+(_0x13777f-_0x4bc17c)/0x2,_0x2fceb6=Math[_0x18e91d(0x216)](_0xc637e8/0x4)*_0x147737+(_0x147737-_0x4f4681)/0x2,_0x1b942b=(_0x4ba609-_0x13777f*_0x229a3b)/0x2,_0x231e8e=(_0x3394ef-_0x147737*_0x229a3b)/0x2;_0x2c97ac['blt'](_0x43ef9a,_0x11ad32,_0x2fceb6,_0x4bc17c,_0x4f4681,_0x1b942b,_0x231e8e,_0x3b0e1d,_0x3b0e1d);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x240)]=function(_0x4e6639){const _0x131a1b=_0x5a0093,_0x366ff9=this[_0x131a1b(0x261)],_0x12a149=this[_0x131a1b(0x239)](),_0x1857cb=this['bitmapHeight']();this[_0x131a1b(0x1ba)]['bitmap']=new Bitmap(_0x12a149,_0x1857cb);const _0x2d10ad=this['_graphicSprite']['bitmap'],_0x2716c5=ImageManager[_0x131a1b(0x27e)],_0x4199e2=ImageManager[_0x131a1b(0x1c6)],_0x43e721=Math[_0x131a1b(0x2c8)](_0x2716c5,_0x4199e2,_0x12a149,_0x1857cb),_0x2f3e74=_0x366ff9%0x10*_0x2716c5,_0x198e77=Math[_0x131a1b(0x216)](_0x366ff9/0x10)*_0x4199e2,_0x59cc17=Math[_0x131a1b(0x216)](Math[_0x131a1b(0x1e3)](_0x12a149-_0x43e721,0x0)/0x2),_0x5d9973=Math[_0x131a1b(0x216)](Math[_0x131a1b(0x1e3)](_0x1857cb-_0x43e721,0x0)/0x2);_0x2d10ad['blt'](_0x4e6639,_0x2f3e74,_0x198e77,_0x2716c5,_0x4199e2,_0x59cc17,_0x5d9973,_0x43e721,_0x43e721);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1e8)]=function(_0x23d753){const _0x1b5cf5=_0x5a0093,_0x280616=this[_0x1b5cf5(0x239)](),_0xa63804=this['bitmapHeight'](),_0x54d5f6=Math[_0x1b5cf5(0x2c8)](_0x280616,_0xa63804);this[_0x1b5cf5(0x1ba)][_0x1b5cf5(0x2e3)]=new Bitmap(_0x280616,_0xa63804);const _0x22dcb2=this[_0x1b5cf5(0x1ba)][_0x1b5cf5(0x2e3)],_0x332375=this[_0x1b5cf5(0x316)][_0x1b5cf5(0x296)](/\$/i),_0xb89cd3=_0x332375?0x1:ImageManager[_0x1b5cf5(0x31c)],_0x3b73c1=_0x332375?0x1:ImageManager[_0x1b5cf5(0x31e)],_0x4ee929=_0x23d753[_0x1b5cf5(0x224)]/_0xb89cd3,_0x45721a=_0x23d753[_0x1b5cf5(0x242)]/_0x3b73c1,_0x5ec6f9=Math[_0x1b5cf5(0x2c8)](0x1,_0x54d5f6/_0x4ee929,_0x54d5f6/_0x45721a),_0x198f77=_0x4ee929*_0x5ec6f9,_0x7561f6=_0x45721a*_0x5ec6f9,_0x6261d2=Math[_0x1b5cf5(0x337)]((_0x280616-_0x198f77)/0x2),_0x2efdf0=Math[_0x1b5cf5(0x337)]((_0xa63804-_0x7561f6)/0x2);_0x22dcb2[_0x1b5cf5(0x2d1)](_0x23d753,0x0,0x0,_0x4ee929,_0x45721a,_0x6261d2,_0x2efdf0,_0x198f77,_0x7561f6);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x300)]=function(_0x39bf87){const _0x3093e9=_0x5a0093,_0xd5d72d=Window_CTB_TurnOrder[_0x3093e9(0x329)],_0x33c2b7=this[_0x3093e9(0x239)](),_0x543891=this['bitmapHeight'](),_0x2fd645=Math[_0x3093e9(0x2c8)](_0x33c2b7,_0x543891);this[_0x3093e9(0x1ba)]['bitmap']=new Bitmap(_0x33c2b7,_0x543891);const _0x1c4fc2=this[_0x3093e9(0x1ba)][_0x3093e9(0x2e3)],_0x34e1af=Math['min'](0x1,_0x2fd645/_0x39bf87['width'],_0x2fd645/_0x39bf87['height']),_0x393cfc=_0x39bf87[_0x3093e9(0x224)]*_0x34e1af,_0x5dd836=_0x39bf87[_0x3093e9(0x242)]*_0x34e1af,_0x4f201b=Math[_0x3093e9(0x337)]((_0x33c2b7-_0x393cfc)/0x2),_0x541c98=Math[_0x3093e9(0x337)]((_0x543891-_0x5dd836)/0x2);_0x1c4fc2['blt'](_0x39bf87,0x0,0x0,_0x39bf87['width'],_0x39bf87[_0x3093e9(0x242)],_0x4f201b,_0x541c98,_0x393cfc,_0x5dd836);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)]['updateGraphicHue']=function(){const _0x339ad1=_0x5a0093,_0x2e4804=this[_0x339ad1(0x30e)]();if(!_0x2e4804)return;if(!_0x2e4804[_0x339ad1(0x191)]())return;if(this['_graphicHue']===_0x2e4804['battlerHue']())return;this[_0x339ad1(0x21d)]=_0x2e4804[_0x339ad1(0x182)](),this['_graphicSprite'][_0x339ad1(0x233)](_0x2e4804[_0x339ad1(0x208)]()?0x0:this[_0x339ad1(0x21d)]);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x251)]=function(){const _0x439773=_0x5a0093;if(!this[_0x439773(0x188)])return;const _0x4bf2ae=this[_0x439773(0x30e)]();if(!_0x4bf2ae)return;if(this[_0x439773(0x2ff)]===_0x4bf2ae[_0x439773(0x2ff)]&&this['_plural']===_0x4bf2ae['_plural'])return;this[_0x439773(0x2ff)]=_0x4bf2ae[_0x439773(0x2ff)],this['_plural']=_0x4bf2ae[_0x439773(0x2d6)];const _0x26df6d=Window_CTB_TurnOrder['Settings'],_0xa3b004=this[_0x439773(0x32c)](),_0x176eb6=this[_0x439773(0x239)](),_0x5991be=this[_0x439773(0x2cc)](),_0x1cc8cd=this['_letterSprite'][_0x439773(0x2e3)];_0x1cc8cd[_0x439773(0x18d)]();if(!this[_0x439773(0x2d6)])return;_0x1cc8cd['fontFace']=_0x26df6d[_0x439773(0x2a5)]||$gameSystem[_0x439773(0x203)](),_0x1cc8cd[_0x439773(0x1c5)]=_0x26df6d[_0x439773(0x2d5)]||0x10,_0xa3b004?_0x1cc8cd['drawText'](this[_0x439773(0x2ff)][_0x439773(0x2db)](),0x0,_0x5991be/0x2,_0x176eb6,_0x5991be/0x2,'center'):_0x1cc8cd[_0x439773(0x1b6)](this[_0x439773(0x2ff)][_0x439773(0x2db)](),0x0,0x2,_0x176eb6-0x8,_0x5991be-0x4,'right');},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5a0093(0x2d0)]=function(){const _0x208653=_0x5a0093,_0x350ac9=this[_0x208653(0x30e)]();if(!_0x350ac9)return;const _0x2a30b1=_0x350ac9['battler']();if(!_0x2a30b1)return;const _0x1111b8=_0x2a30b1[_0x208653(0x271)]();if(!_0x1111b8)return;this['setBlendColor'](_0x1111b8[_0x208653(0x2e2)]);},Sprite_CTB_TurnOrder_Battler[_0x5a0093(0x314)][_0x5a0093(0x1fd)]=function(){const _0x1cb3d9=_0x5a0093;return this[_0x1cb3d9(0x30e)]();},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x1e4)]=Window_Help[_0x5a0093(0x314)][_0x5a0093(0x284)],Window_Help[_0x5a0093(0x314)][_0x5a0093(0x284)]=function(_0x68efab){const _0x124d4d=_0x5a0093;BattleManager[_0x124d4d(0x2c0)]()&&_0x68efab&&_0x68efab['note']&&_0x68efab[_0x124d4d(0x25c)][_0x124d4d(0x296)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ[_0x124d4d(0x1b4)][_0x124d4d(0x1e4)][_0x124d4d(0x304)](this,_0x68efab);},VisuMZ['BattleSystemCTB'][_0x5a0093(0x2b9)]=Window_StatusBase['prototype'][_0x5a0093(0x1a4)],Window_StatusBase['prototype']['placeGauge']=function(_0x47dc01,_0x1da2ec,_0x34ba8d,_0x37f5b6){const _0x29742f=_0x5a0093;if(BattleManager['isCTB']()&&_0x1da2ec===_0x29742f(0x1de))return;VisuMZ[_0x29742f(0x1b4)]['Window_StatusBase_placeGauge'][_0x29742f(0x304)](this,_0x47dc01,_0x1da2ec,_0x34ba8d,_0x37f5b6);};function Window_CTB_TurnOrder(){const _0x1e18d1=_0x5a0093;this[_0x1e18d1(0x308)](...arguments);}Window_CTB_TurnOrder['prototype']=Object['create'](Window_Base['prototype']),Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x1cb)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder['Settings']=VisuMZ[_0x5a0093(0x1b4)]['Settings']['TurnOrder'],Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x308)]=function(){const _0x2ba697=_0x5a0093,_0x466986=this[_0x2ba697(0x280)]();this[_0x2ba697(0x22a)]=_0x466986['x'],this['_homeY']=_0x466986['y'],Window_Base[_0x2ba697(0x314)][_0x2ba697(0x308)]['call'](this,_0x466986),this[_0x2ba697(0x310)](),this[_0x2ba697(0x264)](),this[_0x2ba697(0x1f4)]=0x0;},Window_CTB_TurnOrder[_0x5a0093(0x314)]['windowRect']=function(){const _0x5170ac=_0x5a0093,_0x41e5a4=Window_CTB_TurnOrder[_0x5170ac(0x329)],_0x4b67af=SceneManager[_0x5170ac(0x225)][_0x5170ac(0x32e)][_0x5170ac(0x242)],_0x26ff76=SceneManager['_scene'][_0x5170ac(0x2c6)][_0x5170ac(0x242)],_0x53d775=_0x41e5a4[_0x5170ac(0x297)];let _0x328535=0x0,_0x3e94fb=0x0,_0x127446=0x0,_0x269495=0x0;switch(_0x41e5a4[_0x5170ac(0x2cb)]){case _0x5170ac(0x19e):_0x328535=_0x41e5a4[_0x5170ac(0x255)]*_0x41e5a4[_0x5170ac(0x2a3)]+_0x53d775,_0x3e94fb=_0x41e5a4[_0x5170ac(0x331)],_0x127446=Math[_0x5170ac(0x27f)]((Graphics[_0x5170ac(0x224)]-_0x328535)/0x2),_0x269495=_0x41e5a4['ScreenBuffer'];break;case _0x5170ac(0x18e):_0x328535=_0x41e5a4[_0x5170ac(0x255)]*_0x41e5a4[_0x5170ac(0x2a3)]+_0x53d775,_0x3e94fb=_0x41e5a4[_0x5170ac(0x331)],_0x127446=Math[_0x5170ac(0x27f)]((Graphics['width']-_0x328535)/0x2),_0x269495=Graphics[_0x5170ac(0x242)]-_0x4b67af-_0x3e94fb-_0x41e5a4[_0x5170ac(0x20b)];break;case'left':_0x328535=_0x41e5a4[_0x5170ac(0x331)],_0x3e94fb=_0x41e5a4['SpriteThin']*_0x41e5a4[_0x5170ac(0x2da)]+_0x53d775,_0x127446=_0x41e5a4[_0x5170ac(0x20b)],_0x269495=Math[_0x5170ac(0x27f)]((Graphics[_0x5170ac(0x242)]-_0x4b67af+_0x26ff76-_0x3e94fb)/0x2);break;case _0x5170ac(0x1b9):_0x328535=_0x41e5a4[_0x5170ac(0x331)],_0x3e94fb=_0x41e5a4[_0x5170ac(0x255)]*_0x41e5a4['TotalVertSprites']+_0x53d775,_0x127446=Graphics['width']-_0x328535-_0x41e5a4[_0x5170ac(0x20b)],_0x269495=Math[_0x5170ac(0x27f)]((Graphics[_0x5170ac(0x242)]-_0x4b67af+_0x26ff76-_0x3e94fb)/0x2);break;}return _0x127446+=_0x41e5a4[_0x5170ac(0x254)],_0x269495+=_0x41e5a4[_0x5170ac(0x2d2)],new Rectangle(_0x127446,_0x269495,_0x328535,_0x3e94fb);},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x27c)]=function(){const _0x1b4146=_0x5a0093;this[_0x1b4146(0x2f9)]=0x0;},Window_CTB_TurnOrder[_0x5a0093(0x314)]['isHorz']=function(){const _0x128aa4=_0x5a0093,_0x55b4c2=Window_CTB_TurnOrder['Settings'],_0x31250a=[_0x128aa4(0x19e),_0x128aa4(0x18e)][_0x128aa4(0x2b8)](_0x55b4c2[_0x128aa4(0x2cb)]);return _0x31250a;},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x310)]=function(){const _0x45f50e=_0x5a0093,_0x20dcdf=Window_CTB_TurnOrder[_0x45f50e(0x329)],_0x51be06=this[_0x45f50e(0x32c)](),_0x4d256f=_0x51be06?_0x20dcdf[_0x45f50e(0x2a3)]:_0x20dcdf[_0x45f50e(0x2da)];this[_0x45f50e(0x281)]=new Sprite(),this['addInnerChild'](this[_0x45f50e(0x281)]),this['_turnOrderContainer']=[];for(let _0x7ba92e=0x0;_0x7ba92e<$gameParty[_0x45f50e(0x17b)]();_0x7ba92e++){for(let _0x4f644d=0x0;_0x4f644d<_0x4d256f;_0x4f644d++){const _0x44a166=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x7ba92e,_0x4f644d);this[_0x45f50e(0x281)][_0x45f50e(0x214)](_0x44a166),this[_0x45f50e(0x32f)][_0x45f50e(0x25a)](_0x44a166);}}for(let _0x2b72e8=0x0;_0x2b72e8<$gameTroop[_0x45f50e(0x1ea)]()[_0x45f50e(0x30c)];_0x2b72e8++){for(let _0x1aa50f=0x0;_0x1aa50f<_0x4d256f;_0x1aa50f++){const _0x540b68=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x2b72e8,_0x1aa50f);this[_0x45f50e(0x281)]['addChild'](_0x540b68),this[_0x45f50e(0x32f)][_0x45f50e(0x25a)](_0x540b68);}}},Window_CTB_TurnOrder[_0x5a0093(0x314)]['update']=function(){const _0x5c5387=_0x5a0093;Window_Base[_0x5c5387(0x314)][_0x5c5387(0x228)][_0x5c5387(0x304)](this),this[_0x5c5387(0x303)](),this['updateVisibility']();},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x303)]=function(){const _0x5cc89f=_0x5a0093,_0x146ee1=Window_CTB_TurnOrder[_0x5cc89f(0x329)];if(_0x146ee1[_0x5cc89f(0x2cb)]!=='top')return;if(!_0x146ee1['RepositionTopForHelp'])return;const _0x1ba64e=SceneManager[_0x5cc89f(0x225)][_0x5cc89f(0x2c6)];if(!_0x1ba64e)return;_0x1ba64e[_0x5cc89f(0x22e)]?(this['x']=this[_0x5cc89f(0x22a)]+(_0x146ee1[_0x5cc89f(0x259)]||0x0),this['y']=this[_0x5cc89f(0x23c)]+(_0x146ee1[_0x5cc89f(0x2c2)]||0x0)):(this['x']=this[_0x5cc89f(0x22a)],this['y']=this[_0x5cc89f(0x23c)]);const _0x20304d=SceneManager['_scene'][_0x5cc89f(0x1ca)];Window_CTB_TurnOrder['_ogWindowLayerX']===undefined&&(Window_CTB_TurnOrder[_0x5cc89f(0x200)]=Math['round']((Graphics[_0x5cc89f(0x224)]-Math[_0x5cc89f(0x2c8)](Graphics[_0x5cc89f(0x22b)],_0x20304d[_0x5cc89f(0x224)]))/0x2),Window_CTB_TurnOrder[_0x5cc89f(0x2f2)]=Math[_0x5cc89f(0x337)]((Graphics['height']-Math[_0x5cc89f(0x2c8)](Graphics[_0x5cc89f(0x26f)],_0x20304d[_0x5cc89f(0x242)]))/0x2)),this['x']+=_0x20304d['x']-Window_CTB_TurnOrder[_0x5cc89f(0x200)],this['y']+=_0x20304d['y']-Window_CTB_TurnOrder[_0x5cc89f(0x2f2)];},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x305)]=function(){const _0x252e22=_0x5a0093;if(!this[_0x252e22(0x281)])return;const _0x7e15d2=this['_turnOrderInnerSprite'][_0x252e22(0x20d)];if(!_0x7e15d2)return;_0x7e15d2['sort'](this[_0x252e22(0x217)]['bind'](this));},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x217)]=function(_0xeb8577,_0x406dfd){const _0x47701d=_0x5a0093,_0x5780df=this[_0x47701d(0x32c)](),_0x47519b=Window_CTB_TurnOrder[_0x47701d(0x329)][_0x47701d(0x290)];if(_0x5780df&&!_0x47519b)return _0xeb8577['x']-_0x406dfd['x'];else{if(_0x5780df&&_0x47519b)return _0x406dfd['x']-_0xeb8577['x'];else{if(!_0x5780df&&_0x47519b)return _0xeb8577['y']-_0x406dfd['y'];else{if(!_0x5780df&&!_0x47519b)return _0x406dfd['y']-_0xeb8577['y'];}}}},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x264)]=function(){const _0x1f7809=_0x5a0093;this['visible']=$gameSystem[_0x1f7809(0x2f4)]();},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x2ba)]=function(_0x25b9a2){const _0x29a54e=_0x5a0093;this[_0x29a54e(0x305)](),this[_0x29a54e(0x32f)][_0x29a54e(0x186)]((_0x350e31,_0x30f4c1)=>{const _0x1e6bef=_0x29a54e;return _0x350e31[_0x1e6bef(0x196)]()-_0x30f4c1[_0x1e6bef(0x196)]();});![]&&console[_0x29a54e(0x2a9)](this[_0x29a54e(0x32f)][_0x29a54e(0x30a)](_0x1be20f=>_0x1be20f[_0x29a54e(0x30e)]())['map'](_0x265a2d=>_0x265a2d['battler']()[_0x29a54e(0x286)]()+':\x20'+_0x265a2d[_0x29a54e(0x196)]()));if(!_0x25b9a2)return;for(const _0x48764a of this[_0x29a54e(0x32f)]){if(!_0x48764a)continue;_0x48764a[_0x29a54e(0x228)](),_0x48764a[_0x29a54e(0x27a)]=0x0;}},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x223)]=function(_0x3e592f){const _0x347855=_0x5a0093;this[_0x347855(0x305)](),this[_0x347855(0x32f)][_0x347855(0x186)]((_0x443b4d,_0x564f33)=>{const _0x4dd0df=_0x347855;if(_0x443b4d[_0x4dd0df(0x19d)]())return-0x1;return 0x0;});if(!_0x3e592f)return;for(const _0x19502e of this[_0x347855(0x32f)]){if(!_0x19502e)continue;_0x19502e[_0x347855(0x228)](),_0x19502e[_0x347855(0x27a)]=0x0;}},VisuMZ[_0x5a0093(0x1b4)][_0x5a0093(0x2c4)]=Scene_Battle[_0x5a0093(0x314)][_0x5a0093(0x312)],Scene_Battle[_0x5a0093(0x314)][_0x5a0093(0x312)]=function(){const _0x24a899=_0x5a0093;VisuMZ[_0x24a899(0x1b4)]['Scene_Battle_selectNextCommand'][_0x24a899(0x304)](this),BattleManager['updateTurnOrderCTB']();},Window_CTB_TurnOrder[_0x5a0093(0x314)][_0x5a0093(0x18b)]=function(_0x577094){const _0x3efaad=_0x5a0093;for(const _0x365099 of this[_0x3efaad(0x32f)]){if(!_0x365099)continue;if(_0x365099[_0x3efaad(0x30e)]()!==_0x577094)continue;_0x365099[_0x3efaad(0x230)]();}};