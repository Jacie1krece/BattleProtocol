//=============================================================================
// VisuStella MZ - Steal Items
// VisuMZ_3_StealItems.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StealItems = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StealItems = VisuMZ.StealItems || {};
VisuMZ.StealItems.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [StealItems]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Steal_Items_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Thieves with the ability to steal items from enemies aren't an uncommon
 * class in RPG's. This plugin lets you set up enemies with items that can be
 * stolen from with different types of effects that can occur upon stealing.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create a pool of stealable items for each enemy.
 * * Make skills or items that have stealing properties attached to them.
 * * Some skills/items can be dedicated towards stealing specific types of loot
 *   (Gold, Items, Weapons, and/or Armor).
 * * Have different success rates for skills and items.
 * * Actors can gain trait effects that increase or decrease success rates.
 * * Enemies can gain resistance towards stealing.
 * * JavaScript uses can enable special effects to occur upon successfully
 *   stealing, failing, or emptying out an enemy's loot.
 * * Automatically translate drop items from the database into stealable loot.
 * * If weapons or armors are stolen, they can debuff the enemy and lower their
 *   parameters by their base bonuses.
 * * Use a Snatch effect to directly target a specific item to be stolen from
 *   the enemy.
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
 * Gold and Item Drop Removals
 * 
 * This is an optional effect that can be enabled from the Plugin Parameters.
 * 
 * If you have enabled Automatic Gold Drop and Item Drop inclusions from the
 * plugin parameters as well as enabled their respective "Loot Removal" plugin
 * parameters, then once the gold/items have been stolen a target enemy, that
 * enemy will not drop the specific gold value or specific item drop during the
 * victory aftermath phase.
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
 * === Steal Action-Related Notetags ===
 * 
 * The following are notetags that are used to place on skills/items that you
 * want to have stealing properties for.
 * 
 * ---
 *
 * <Steal>
 * <Steal type>
 * <Steal type, type, type>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 *
 * ---
 *
 * <Steal type: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   multiplicative success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal type: +x%>
 * <Steal type: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Gives the skill/item stealing properties with increased/decreased
 *   additive success rates.
 * - Replace 'type' with 'All', 'Gold', 'Item', 'Weapon', 'Armor' to restrict
 *   steal targets to those types.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 * 
 * <Snatch>
 * <Targeting Steal>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the steal action from targeting a random item from the stealable
 *   types pool to a specific item that the player can select.
 * - If the snatch attempt fails, it will not attempt to steal other items.
 * - Both the <Snatch> and <Targeting Steal> notetags do the same thing.
 * - This does not work with abilities that target multiple enemies, random
 *   enemies, or actors.
 * - Use this in addition to the <Steal>, <Steal type>, or
 *   <Steal type, type, type> notetags as this does not have any steal
 *   properties on its own.
 * 
 * ---
 * 
 * === JavaScript Notetags: Steal Action-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * apply special effects for steal-related skills/items.
 * 
 * ---
 *
 * <JS Steal Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to all steal target types.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Gold Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Gold Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable gold type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Item Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Item Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable item type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Weapon Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Weapon Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable weapon type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS Steal Armor Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Steal Armor Rate>
 *
 * - Used for: Skill, Item Notetags
 * - Uses JavaScript code to determine the success rate of the steal action.
 *   - The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 *   - This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * - This applies to only the stealable armor type.
 * - The 'rate' variable starts at a value equal to the current success rate.
 * - The 'rate' variable will be returned as the declared success rate.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 *
 * ---
 *
 * <JS On Steal Success>
 *  code
 *  code
 *  code
 * </JS On Steal Success>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon successfully stealing.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was stolen from.
 * - The 'item' variable represents the item that was stolen if there is one.
 *   This will return a null value if gold was stolen instead.
 * - The 'gold' variable represents the gold quantity that was stolen if any.
 *   This will return a 0 value if there was no gold stolen.
 *
 * ---
 *
 * <JS On Steal Failure>
 *  code
 *  code
 *  code
 * </JS On Steal Failure>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code upon failing a stealth attempt.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 *
 * <JS On Steal Empty>
 *  code
 *  code
 *  code
 * </JS On Steal Empty>
 *
 * - Used for: Skill, Item Notetags
 * - Runs the inserted JavaScript code if there was nothing to steal.
 * - The 'user' variable represents the user who will perform the skill/item.
 * - The 'target' variable represents the target who was the theft target.
 *
 * ---
 * 
 * === Steal Loot Setup-Related Notetags ===
 * 
 * The following notetags are made for enemies and used to set up the loot that
 * can be stolen.
 * 
 * ---
 *
 * <Steal Gold value: x%>
 * 
 * <Steal Item id: x%>
 * <Steal Item name: x%>
 * 
 * <Steal Weapon id: x%>
 * <Steal Weapon name: x%>
 * 
 * <Steal Armor id: x%>
 * <Steal Armor name: x%>
 *
 * - Used for: Enemy Notetags
 * - Sets up droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert multiple notetags for multiple loot entries to be stolen.
 *
 * ---
 *
 * <Steal>
 *  Gold value: x%
 * 
 *  Item id: x%
 *  Item name: x%
 * 
 *  Weapon id: x%
 *  Weapon name: x%
 * 
 *  Armor id: x%
 *  Armor name: x%
 * </Steal>
 *
 * - Used for: Enemy Notetags
 * - Sets up a batch setup of droppable loot for the enemy.
 * - When setting up gold loot, replace 'value' with the amount of gold that
 *   will be stolen from this loot entry.
 * - When setting up items, weapons, or armors, replace 'id' with the ID of the
 *   item, weapon, or armor for the loot entry.
 * - When setting up items, weapons, or armors, replace 'name' with the name of
 *   the item, weapon, or armor for the loot entry.
 * - Replace 'x' with a number value representing the base percent chance of
 *   successfully stealing this loot entry.
 * - Insert/remove multiple copies of the loot entries inside the <Steal>
 *   notetags to add more or reduce entries.
 *
 * ---
 * 
 * === Steal Rate Traits-Related Notetags ===
 * 
 * The following notetags are made for trait objects that can alter the
 * success rates of steal skills/items.
 * 
 * ---
 *
 * <Steal Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate multiplicatively by.
 * 
 * ---
 *
 * <Steal Rate: +x%>
 * <Steal Rate: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Alters the steal rate for the stealing actor multiplicatively.
 * - Replace 'x' with a number representing the percent value to alter the
 *   success rate additively by.
 *
 * ---
 *
 * <Steal Resist: +x%>
 * <Steal Resist: -x%>
 *
 * - Used for: Enemy Notetags
 * - Alters the steal resistance for enemies. Higher numbers mean higher steal
 *   resistance.
 * - Replace 'x' with a number representing the percent value to alter the
 *   steal resistance by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Automatic Settings
 * ============================================================================
 *
 * Automatic settings pertaining to the steal mechanics of the game.
 *
 * ---
 *
 * Settings
 * 
 *   Add Gold Drop?:
 *   - Automatically include enemy gold drop into stealable items?
 * 
 *     Success Rate:
 *     - If automatically include gold drop, what is the steal rate?
 *     - Use a number between 0 and 1.
 * 
 *     Loot Removal:
 *     - If using automatic gold, remove the rewards from the enemy gold
 *       when defeated?
 * 
 *   Add Item Drops?:
 *   - Automatically include enemy item drop into stealable items?
 * 
 *     Success Modifier:
 *     - If automatically include item drops, how much do you want to alter
 *       their drop modifiers by?
 * 
 *     Loot Removal:
 *     - If using automatic drops, remove the rewards from the enemy items
 *       when defeated?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * Settings pertaining to the steal-related messages that appear in the Battle
 * Log Window.
 *
 * ---
 *
 * Settings
 * 
 *   Show Messages:
 *   - Show messages regarding stolen items in the Battle Log window?
 * 
 *   Steal Item:
 *   - Message displayed when stealing an item.
 *   - %1 - Item's Name, %2 - Item's Icon
 * 
 *   Steal Gold:
 *   - Message displayed when stealing gold.
 *   - %1 - Gold Name, %2 - Gold Amount
 * 
 *   Steal Fail:
 *   - Message displayed when a steal attempt fails.
 * 
 *   Steal Empty:
 *   - Message displayed when there is nothing to steal.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Special game mechanics related to stealing.
 *
 * ---
 *
 * General
 * 
 *   Equip Debuff:
 *   - When weapons/armors are stolen, decrease the enemy's parameters based
 *     on the weapon/armor parameters?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Bonus Steal %:
 *   - Code used to determine an additive bonus steal rate.
 * 
 *   JS: Steal Resist %:
 *   - Code used to determine an additive steal resistance.
 * 
 *   JS: On Steal Success:
 *   - What kind of code do you want to run when stealing succeeds?
 * 
 *   JS: On Steal Failure:
 *   - What kind of code do you want to run when stealing fails?
 * 
 *   JS: On Steal Empty:
 *   - What kind of code do you want to run when there is nothing to steal?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popup settings related to stealing.
 *
 * ---
 *
 * Success
 * 
 * Failure
 * 
 * Empty
 * 
 *   Text:
 *   - Text displayed upon stealing an item.
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
 * Plugin Parameters: Snatch Settings
 * ============================================================================
 *
 * These are the settings for the effect when used with the <Snatch> notetag.
 * When snatching an item, the player can target a specific item in the enemy's
 * loot to be stolen from. The success rates and lists of items will be visible
 * at the expense of only being able to steal just that item.
 *
 * ---
 *
 * Gold
 * 
 *   Icon:
 *   - Icon used to represent gold.
 *   - Ignore if VisuMZ_0_CoreEngine is present.
 * 
 *   Name Format:
 *   - Name format on how gold is displayed.
 *   - %1 - Icon, %2 - Quantity, %3 - Current Name
 * 
 *   Help Text:
 *   - Text that's displayed in the help window when gold is selected in the
 *     Snatch window.
 *
 * ---
 *
 * Success Rate
 * 
 *   Display Success Rate:
 *   - Display success rates in the Snatch window?
 * 
 *   Already Stolen:
 *   - Text displayed when an item has already been stolen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Determine the sound effects played related to stealing.
 *
 * ---
 *
 * Successful Gold Steal
 * 
 * Successful Item Steal
 * 
 * Successful Weapon Steal
 * 
 * Successful Armor Steal
 * 
 * Failure
 * 
 * Empty
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
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
 * Version 1.10: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash if an enemy has no items that can be
 *    stolen when using snatch functionality. Fix made by Arisu.
 * 
 * Version 1.09: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Frontview Battle UI.
 * 
 * Version 1.08: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for action crash during Active TPB/ATB. Fix by Olivia.
 * 
 * Version 1.07: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.06: January 13, 2022
 * * Compatibility Update!
 * ** Better compatibility update with Extra Enemy Drops. Update made by Irina.
 * 
 * Version 1.05: July 23, 2021
 * * Bug Fixes!
 * ** Fixed <JS Steal Armor Rate> notetag. It did not work properly.
 * * Documentation Update!
 * ** Added notes for the various <JS Steal Rate> notetags:
 * *** The 'rate' value is multiplied against the success rate of the target
 *     item being stolen. This is a multiplicative stack.
 * *** This means an item's default steal rate of 5% and a 200% steal rate on
 *     this notetag's 'rate' variable will yield 10%. Alternatively, if the
 *     default steal rate is 0%, it will yield 0% regardless of this notetag's
 *     'rate' variable value.
 * 
 * Version 1.04: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Steal Rate> should now work properly. Fix by Arisu.
 * * Documentation Update!
 * ** Added clarity to <JS Steal Rate> to mention it affects all types.
 * ** Help file updated for new features.
 * * New Features!
 * ** New JS notetags added by Arisu.
 * *** <JS Steal Gold Rate>
 * *** <JS Steal Item Rate>
 * *** <JS Steal Weapon Rate>
 * *** <JS Steal Armor Rate>
 * **** Similar to the <JS Steal Rate> notetag but works only for specific
 *      categories of items.
 * 
 * Version 1.02: April 2, 2021
 * * Feature Update!
 * ** Success rate calculation should no longer be skewed by JavaScript's float
 *    value math quirks. Update made by Yanfly.
 * 
 * Version 1.01: December 11, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: December 9, 2020
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
 * @param StealItems
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Auto:struct
 * @text Automatic Settings
 * @type struct<Auto>
 * @desc Automatic settings pertaining to the steal mechanics of the game.
 * @default {"AutoGold:eval":"true","GoldRate:num":"0.50","GoldRemoval:eval":"true","AutoItem:eval":"true","ItemRate:num":"1.50","ItemRemoval:eval":"true"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings pertaining to the steal-related messages that appear in the Battle Log Window.
 * @default {"ShowMessages:eval":"true","StealItem:str":"Stole %2%1!","StealGold:str":"Stole %2 \\C[16]%1\\C[0]!","StealFail:str":"Steal attempt unsuccessful!","StealEmpty:str":"Nothing to steal!"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Special game mechanics related to stealing.
 * @default {"General":"","EquipDebuff:eval":"true","JavaScript":"","JsBonusSteal:func":"\"// Declare Variables\\nconst user = this;\\nlet bonusRate = 0;\\n\\n// Calculate Bonus Rate\\nbonusRate = (user.luk / (512 + user.luk)) / 3;\\n\\n// Return Bonus Rate\\nreturn bonusRate;\"","JsStealResist:func":"\"// Declare Variables\\nconst user = this;\\nlet resistRate = 0;\\n\\n// Calculate Resist Rate\\nresistRate = (user.luk / (512 + user.luk)) / 8;\\n\\n// Return Resist Rate\\nreturn resistRate;\"","JsOnStealSuccess:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealFail:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\"","JsOnStealEmpty:func":"\"// Declare Variables\\nconst user = arguments[0];\\nconst target = arguments[1];\\nconst a = user;\\nconst b = target;\\n\\n// Perform Action\\n\""}
 *
 * @param Popup:struct
 * @text Popup Settings
 * @type struct<Popup>
 * @desc Popup settings related to stealing.
 * @default {"Success":"","SuccessPopupText:str":"STOLEN","SuccessItemName:eval":"true","SuccessTextColor:str":"0","SuccessFlashColor:eval":"[255, 255, 255, 0]","SuccessFlashDuration:num":"60","Failure":"","FailurePopupText:str":"FAILED","FailureTextColor:str":"8","FailureFlashColor:eval":"[255, 255, 255, 0]","FailureFlashDuration:num":"60","Empty":"","EmptyPopupText:str":"EMPTY","EmptyTextColor:str":"8","EmptyFlashColor:eval":"[255, 255, 255, 0]","EmptyFlashDuration:num":"60"}
 *
 * @param Snatch:struct
 * @text Snatch Settings
 * @type struct<Snatch>
 * @desc Settings related to the snatch mechanic.
 * @default {"Gold":"","GoldIcon:num":"314","GoldNameFmt:str":"%1%2\\C[16]%3\\C[0]","GoldHelp:json":"\"Steal gold from this target!\"","Success":"","DisplaySuccess:eval":"true","AlreadyStolen:str":"Stolen"}
 *
 * @param Sound:struct
 * @text Sound Settings
 * @type struct<Sound>
 * @desc Determine the sound effects played related to stealing.
 * @default {"Successful":"","SuccessGold":"","gold_name:str":"Shop2","gold_volume:num":"90","gold_pitch:num":"120","gold_pan:num":"0","SuccessItem":"","item_name:str":"Item1","item_volume:num":"90","item_pitch:num":"120","item_pan:num":"0","SuccessWeapon":"","weapon_name:str":"Equip1","weapon_volume:num":"90","weapon_pitch:num":"120","weapon_pan:num":"0","SuccessArmor":"","armor_name:str":"Equip2","armor_volume:num":"90","armor_pitch:num":"120","armor_pan:num":"0","Failure":"","fail_name:str":"Buzzer2","fail_volume:num":"90","fail_pitch:num":"120","fail_pan:num":"0","Empty":"","empty_name:str":"Evasion1","empty_volume:num":"90","empty_pitch:num":"120","empty_pan:num":"0"}
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
 * Auto Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Auto:
 *
 * @param AutoGold:eval
 * @text Add Gold Drop?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy gold drop into stealable items?
 * @default true
 *
 * @param GoldRate:num
 * @text Success Rate
 * @parent AutoGold:eval
 * @desc If automatically include gold drop, what is the steal rate?
 * Use a number between 0 and 1.
 * @default 0.50
 *
 * @param GoldRemoval:eval
 * @text Loot Removal
 * @parent AutoGold:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated?
 * @default true
 *
 * @param AutoItem:eval
 * @text Add Item Drops?
 * @parent Auto
 * @type boolean
 * @on Include
 * @off Don't Include
 * @desc Automatically include enemy item drop into stealable items?
 * @default true
 *
 * @param ItemRate:num
 * @text Success Modifier
 * @parent AutoItem:eval
 * @desc If automatically include item drops, how much do you want
 * to alter their drop modifiers by?
 * @default 1.50
 *
 * @param ItemRemoval:eval
 * @text Loot Removal
 * @parent AutoItem:eval
 * @type boolean
 * @on Remove
 * @off Keep
 * @desc If using automatic drops, remove the rewards from the
 * enemy items when defeated?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param ShowMessages:eval
 * @text Show Messages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show messages regarding stolen items in the Battle Log window?
 * @default true
 * 
 * @param StealItem:str
 * @text Steal Item
 * @desc Message displayed when stealing an item.
 * %1 - Item's Name, %2 - Item's Icon
 * @default Stole %2%1!
 * 
 * @param StealGold:str
 * @text Steal Gold
 * @desc Message displayed when stealing gold.
 * %1 - Gold Name, %2 - Gold Amount
 * @default Stole %2 \C[16]%1\C[0]!
 * 
 * @param StealFail:str
 * @text Steal Fail
 * @desc Message displayed when a steal attempt fails.
 * @default Steal attempt unsuccessful!
 * 
 * @param StealEmpty:str
 * @text Steal Empty
 * @desc Message displayed when there is nothing to steal.
 * @default Nothing to steal!
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
 * @param EquipDebuff:eval
 * @text Equip Debuff
 * @parent General
 * @type boolean
 * @on Debuff
 * @off No Effects
 * @desc When weapons/armors are stolen, decrease the enemy's
 * parameters based on the weapon/armor parameters?
 * @default true
 *
 * @param JavaScript
 *
 * @param JsBonusSteal:func
 * @text JS: Bonus Steal %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive bonus steal rate.
 * @default "// Declare Variables\nconst user = this;\nlet bonusRate = 0;\n\n// Calculate Bonus Rate\nbonusRate = (user.luk / (512 + user.luk)) / 3;\n\n// Return Bonus Rate\nreturn bonusRate;"
 *
 * @param JsStealResist:func
 * @text JS: Steal Resist %
 * @parent JavaScript
 * @type note
 * @desc Code used to determine an additive steal resistance.
 * @default "// Declare Variables\nconst user = this;\nlet resistRate = 0;\n\n// Calculate Resist Rate\nresistRate = (user.luk / (512 + user.luk)) / 8;\n\n// Return Resist Rate\nreturn resistRate;"
 *
 * @param JsOnStealSuccess:func
 * @text JS: On Steal Success
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing succeeds?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealFail:func
 * @text JS: On Steal Failure
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when stealing fails?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 * @param JsOnStealEmpty:func
 * @text JS: On Steal Empty
 * @parent JavaScript
 * @type note
 * @desc What kind of code do you want to run when there is nothing to steal?
 * @default "// Declare Variables\nconst user = arguments[0];\nconst target = arguments[1];\nconst a = user;\nconst b = target;\n\n// Perform Action\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param Success
 *
 * @param SuccessPopupText:str
 * @text Text
 * @parent Success
 * @desc Text displayed upon successfully stealing an item.
 * @default STOLEN
 *
 * @param SuccessItemName:eval
 * @text Show Item Name
 * @parent SuccessPopupText:str
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the name of the item that is stolen, too?
 * @default true
 *
 * @param SuccessTextColor:str
 * @text Text Color
 * @parent Success
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param SuccessFlashColor:eval
 * @text Flash Color
 * @parent Success
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param SuccessFlashDuration:num
 * @text Flash Duration
 * @parent Success
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Failure
 *
 * @param FailurePopupText:str
 * @text Text
 * @parent Failure
 * @desc Text displayed upon failing a steal attempt.
 * @default FAILED
 *
 * @param FailureTextColor:str
 * @text Text Color
 * @parent Failure
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param FailureFlashColor:eval
 * @text Flash Color
 * @parent Failure
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param FailureFlashDuration:num
 * @text Flash Duration
 * @parent Failure
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Empty
 *
 * @param EmptyPopupText:str
 * @text Text
 * @parent Empty
 * @desc Text displayed upon there is nothing to steal.
 * @default EMPTY
 *
 * @param EmptyTextColor:str
 * @text Text Color
 * @parent Empty
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 * @param EmptyFlashColor:eval
 * @text Flash Color
 * @parent Empty
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 0]
 * 
 * @param EmptyFlashDuration:num
 * @text Flash Duration
 * @parent Empty
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Snatch Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Snatch:
 *
 * @param Gold
 *
 * @param GoldIcon:num
 * @text Icon
 * @parent Gold
 * @desc Icon used to represent gold.
 * Ignore if VisuMZ_0_CoreEngine is present.
 * @default 314
 *
 * @param GoldNameFmt:str
 * @text Name Format
 * @parent Gold
 * @desc Name format on how gold is displayed.
 * %1 - Icon, %2 - Quantity, %3 - Current Name
 * @default %1%2\C[16]%3\C[0]
 *
 * @param GoldHelp:json
 * @text Help Text
 * @type note
 * @parent Gold
 * @desc Text that's displayed in the help window when gold is selected in the Snatch window.
 * @default "Steal gold from this target!"
 *
 * @param Success
 * @text Success Rate
 *
 * @param DisplaySuccess:eval
 * @text Display Success Rate
 * @parent Success
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display success rates in the Snatch window?
 * @default true
 *
 * @param AlreadyStolen:str
 * @text Already Stolen
 * @parent Success
 * @desc Text displayed when an item has already been stolen.
 * @default Stolen
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param Successful
 * 
 * @param SuccessGold
 * @text Gold Steal
 * @parent Successful
 *
 * @param gold_name:str
 * @text Filename
 * @parent SuccessGold
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Shop2
 *
 * @param gold_volume:num
 * @text Volume
 * @parent SuccessGold
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param gold_pitch:num
 * @text Pitch
 * @parent SuccessGold
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param gold_pan:num
 * @text Pan
 * @parent SuccessGold
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessItem
 * @text Item Steal
 * @parent Successful
 *
 * @param item_name:str
 * @text Filename
 * @parent SuccessItem
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Item1
 *
 * @param item_volume:num
 * @text Volume
 * @parent SuccessItem
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param item_pitch:num
 * @text Pitch
 * @parent SuccessItem
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param item_pan:num
 * @text Pan
 * @parent SuccessItem
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessWeapon
 * @text Weapon Steal
 * @parent Successful
 *
 * @param weapon_name:str
 * @text Filename
 * @parent SuccessWeapon
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip1
 *
 * @param weapon_volume:num
 * @text Volume
 * @parent SuccessWeapon
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param weapon_pitch:num
 * @text Pitch
 * @parent SuccessWeapon
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param weapon_pan:num
 * @text Pan
 * @parent SuccessWeapon
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param SuccessArmor
 * @text Armor Steal
 * @parent Successful
 *
 * @param armor_name:str
 * @text Filename
 * @parent SuccessArmor
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param armor_volume:num
 * @text Volume
 * @parent SuccessArmor
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param armor_pitch:num
 * @text Pitch
 * @parent SuccessArmor
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param armor_pan:num
 * @text Pan
 * @parent SuccessArmor
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Failure
 *
 * @param fail_name:str
 * @text Filename
 * @parent Failure
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Buzzer2
 *
 * @param fail_volume:num
 * @text Volume
 * @parent Failure
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param fail_pitch:num
 * @text Pitch
 * @parent Failure
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param fail_pan:num
 * @text Pan
 * @parent Failure
 * @desc Pan of the sound effect played.
 * @default 0
 * 
 * @param Empty
 *
 * @param empty_name:str
 * @text Filename
 * @parent Empty
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Evasion1
 *
 * @param empty_volume:num
 * @text Volume
 * @parent Empty
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param empty_pitch:num
 * @text Pitch
 * @parent Empty
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param empty_pan:num
 * @text Pan
 * @parent Empty
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
//=============================================================================

const _0x547046=_0x3539;(function(_0x3d3cd5,_0x37ea56){const _0x18ff17=_0x3539,_0x28db10=_0x3d3cd5();while(!![]){try{const _0x212328=parseInt(_0x18ff17(0x177))/0x1*(-parseInt(_0x18ff17(0x1e3))/0x2)+parseInt(_0x18ff17(0x1a6))/0x3+-parseInt(_0x18ff17(0x227))/0x4+parseInt(_0x18ff17(0x231))/0x5*(-parseInt(_0x18ff17(0x1b2))/0x6)+parseInt(_0x18ff17(0x215))/0x7+parseInt(_0x18ff17(0x1c6))/0x8+-parseInt(_0x18ff17(0x16e))/0x9;if(_0x212328===_0x37ea56)break;else _0x28db10['push'](_0x28db10['shift']());}catch(_0x42b171){_0x28db10['push'](_0x28db10['shift']());}}}(_0x3d41,0x66f73));function _0x3539(_0x4ac330,_0xb4a85b){const _0x3d4121=_0x3d41();return _0x3539=function(_0x35399a,_0x1b61c7){_0x35399a=_0x35399a-0x14a;let _0x5c7b3b=_0x3d4121[_0x35399a];return _0x5c7b3b;},_0x3539(_0x4ac330,_0xb4a85b);}var label=_0x547046(0x1d4),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x547046(0x169)](function(_0xe3f47c){const _0x3a1880=_0x547046;return _0xe3f47c[_0x3a1880(0x256)]&&_0xe3f47c[_0x3a1880(0x236)][_0x3a1880(0x1d1)]('['+label+']');})[0x0];VisuMZ[label][_0x547046(0x1f6)]=VisuMZ[label][_0x547046(0x1f6)]||{},VisuMZ['ConvertParams']=function(_0x4af964,_0x4b2f94){const _0x4e0e19=_0x547046;for(const _0x3c2b8e in _0x4b2f94){if(_0x3c2b8e['match'](/(.*):(.*)/i)){const _0x4e3561=String(RegExp['$1']),_0x129093=String(RegExp['$2'])[_0x4e0e19(0x245)]()['trim']();let _0xdea723,_0x5f37ca,_0x414e4c;switch(_0x129093){case _0x4e0e19(0x19d):_0xdea723=_0x4b2f94[_0x3c2b8e]!==''?Number(_0x4b2f94[_0x3c2b8e]):0x0;break;case _0x4e0e19(0x1ca):_0x5f37ca=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):[],_0xdea723=_0x5f37ca['map'](_0x4f5444=>Number(_0x4f5444));break;case _0x4e0e19(0x254):_0xdea723=_0x4b2f94[_0x3c2b8e]!==''?eval(_0x4b2f94[_0x3c2b8e]):null;break;case'ARRAYEVAL':_0x5f37ca=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):[],_0xdea723=_0x5f37ca[_0x4e0e19(0x1ac)](_0x27a9fa=>eval(_0x27a9fa));break;case _0x4e0e19(0x1fa):_0xdea723=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):'';break;case _0x4e0e19(0x239):_0x5f37ca=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):[],_0xdea723=_0x5f37ca['map'](_0x11fb00=>JSON['parse'](_0x11fb00));break;case _0x4e0e19(0x229):_0xdea723=_0x4b2f94[_0x3c2b8e]!==''?new Function(JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e])):new Function('return\x200');break;case _0x4e0e19(0x23f):_0x5f37ca=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):[],_0xdea723=_0x5f37ca[_0x4e0e19(0x1ac)](_0x9d893b=>new Function(JSON[_0x4e0e19(0x166)](_0x9d893b)));break;case _0x4e0e19(0x1c2):_0xdea723=_0x4b2f94[_0x3c2b8e]!==''?String(_0x4b2f94[_0x3c2b8e]):'';break;case _0x4e0e19(0x192):_0x5f37ca=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):[],_0xdea723=_0x5f37ca['map'](_0x517a33=>String(_0x517a33));break;case _0x4e0e19(0x1c7):_0x414e4c=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):{},_0xdea723=VisuMZ[_0x4e0e19(0x165)]({},_0x414e4c);break;case'ARRAYSTRUCT':_0x5f37ca=_0x4b2f94[_0x3c2b8e]!==''?JSON[_0x4e0e19(0x166)](_0x4b2f94[_0x3c2b8e]):[],_0xdea723=_0x5f37ca[_0x4e0e19(0x1ac)](_0x333fde=>VisuMZ['ConvertParams']({},JSON[_0x4e0e19(0x166)](_0x333fde)));break;default:continue;}_0x4af964[_0x4e3561]=_0xdea723;}}return _0x4af964;},(_0x4c2d12=>{const _0x549af7=_0x547046,_0x302305=_0x4c2d12['name'];for(const _0x30025a of dependencies){if(!Imported[_0x30025a]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x302305,_0x30025a)),SceneManager['exit']();break;}}const _0x36d15c=_0x4c2d12[_0x549af7(0x236)];if(_0x36d15c['match'](/\[Version[ ](.*?)\]/i)){const _0x4b4663=Number(RegExp['$1']);_0x4b4663!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x549af7(0x184)](_0x302305,_0x4b4663)),SceneManager[_0x549af7(0x219)]());}if(_0x36d15c[_0x549af7(0x15d)](/\[Tier[ ](\d+)\]/i)){const _0x5f26b3=Number(RegExp['$1']);_0x5f26b3<tier?(alert(_0x549af7(0x230)[_0x549af7(0x184)](_0x302305,_0x5f26b3,tier)),SceneManager[_0x549af7(0x219)]()):tier=Math[_0x549af7(0x23d)](_0x5f26b3,tier);}VisuMZ[_0x549af7(0x165)](VisuMZ[label][_0x549af7(0x1f6)],_0x4c2d12[_0x549af7(0x202)]);})(pluginData),VisuMZ[_0x547046(0x1d4)][_0x547046(0x217)]=Scene_Boot[_0x547046(0x180)][_0x547046(0x1ce)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x4f78f6=_0x547046;VisuMZ['StealItems'][_0x4f78f6(0x217)][_0x4f78f6(0x25c)](this),this[_0x4f78f6(0x22f)]();},Scene_Boot[_0x547046(0x180)]['process_VisuMZ_StealItems']=function(){const _0x1b42fd=_0x547046;if(VisuMZ[_0x1b42fd(0x241)])return;this[_0x1b42fd(0x15e)]();},VisuMZ[_0x547046(0x1d4)][_0x547046(0x1f8)]={'StealAction1':/<STEAL>/i,'StealAction2':/<STEAL[ ](.*)>/gi,'Snatch':/<(?:SNATCH|TARGETING STEAL)>/i,'JsStealRate':/<JS STEAL RATE>\s*([\s\S]*)\s*<\/JS STEAL RATE>/i,'JsStealRateGold':/<JS STEAL GOLD RATE>\s*([\s\S]*)\s*<\/JS STEAL GOLD RATE>/i,'JsStealRateItem':/<JS STEAL ITEM RATE>\s*([\s\S]*)\s*<\/JS STEAL ITEM RATE>/i,'JsStealRateWeapon':/<JS STEAL WEAPON RATE>\s*([\s\S]*)\s*<\/JS STEAL WEAPON RATE>/i,'JsStealRateArmor':/<JS STEAL ARMOR RATE>\s*([\s\S]*)\s*<\/JS STEAL ARMOR RATE>/i,'JsOnStealSuccess':/<JS ON STEAL SUCCESS>\s*([\s\S]*)\s*<\/JS ON STEAL SUCCESS>/i,'JsOnStealFail':/<JS ON STEAL FAILURE>\s*([\s\S]*)\s*<\/JS ON STEAL FAILURE>/i,'JsOnStealNothing':/<JS ON STEAL EMPTY>\s*([\s\S]*)\s*<\/JS ON STEAL EMPTY>/i,'StealableItemSingle':/<STEAL[ ](.*):[ ](.*)([%％])>/gi,'StealableItemBatch':/<STEAL>\s*([\s\S]*)\s*<\/STEAL>/i,'StealRate':/<STEAL RATE:[ ](\d+)([%％])>/i,'StealPlus':/<STEAL RATE:[ ]([\+\-]\d+)([%％])>/i,'StealResist':/<STEAL RESIST:[ ]([\+\-]\d+)([%％])>/i},Scene_Boot[_0x547046(0x180)][_0x547046(0x15e)]=function(){const _0x2cdd98=_0x547046,_0x2a8130=$dataSkills[_0x2cdd98(0x209)]($dataItems);for(const _0xdba095 of _0x2a8130){if(!_0xdba095)continue;VisuMZ['StealItems'][_0x2cdd98(0x262)](_0xdba095);}},VisuMZ[_0x547046(0x1d4)][_0x547046(0x1ae)]=VisuMZ[_0x547046(0x1ae)],VisuMZ[_0x547046(0x1ae)]=function(_0x53beff){const _0x50c42e=_0x547046;VisuMZ[_0x50c42e(0x1d4)][_0x50c42e(0x1ae)]['call'](this,_0x53beff),VisuMZ[_0x50c42e(0x1d4)][_0x50c42e(0x262)](_0x53beff);},VisuMZ['StealItems'][_0x547046(0x252)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x547046(0x252)]=function(_0x405a20){const _0x148e1c=_0x547046;VisuMZ[_0x148e1c(0x1d4)][_0x148e1c(0x252)]['call'](this,_0x405a20),VisuMZ[_0x148e1c(0x1d4)]['Parse_Notetags_JS'](_0x405a20);},VisuMZ['StealItems']['Parse_Notetags_JS']=function(_0x5e20f4){const _0x29b9ee=_0x547046,_0x5757ed=VisuMZ[_0x29b9ee(0x1d4)][_0x29b9ee(0x1f8)];let _0x181c63='JsStealRate',_0x153029=_0x5757ed[_0x29b9ee(0x23e)];VisuMZ[_0x29b9ee(0x1d4)][_0x29b9ee(0x14a)](_0x5e20f4,_0x181c63,_0x153029),_0x181c63=_0x29b9ee(0x214),_0x153029=_0x5757ed[_0x29b9ee(0x214)],VisuMZ[_0x29b9ee(0x1d4)][_0x29b9ee(0x14a)](_0x5e20f4,_0x181c63,_0x153029),_0x181c63=_0x29b9ee(0x17e),_0x153029=_0x5757ed['JsStealRateItem'],VisuMZ[_0x29b9ee(0x1d4)][_0x29b9ee(0x14a)](_0x5e20f4,_0x181c63,_0x153029),_0x181c63=_0x29b9ee(0x216),_0x153029=_0x5757ed[_0x29b9ee(0x216)],VisuMZ['StealItems'][_0x29b9ee(0x14a)](_0x5e20f4,_0x181c63,_0x153029),_0x181c63='JsStealRateArmor',_0x153029=_0x5757ed['JsStealRateArmor'],VisuMZ[_0x29b9ee(0x1d4)][_0x29b9ee(0x14a)](_0x5e20f4,_0x181c63,_0x153029),_0x181c63=_0x29b9ee(0x18f),_0x153029=_0x5757ed['JsOnStealSuccess'],VisuMZ[_0x29b9ee(0x1d4)]['createOnStealJS'](_0x5e20f4,_0x181c63,_0x153029),_0x181c63='JsOnStealFail',_0x153029=_0x5757ed[_0x29b9ee(0x1bd)],VisuMZ['StealItems'][_0x29b9ee(0x17a)](_0x5e20f4,_0x181c63,_0x153029),_0x181c63=_0x29b9ee(0x158),_0x153029=_0x5757ed[_0x29b9ee(0x158)],VisuMZ[_0x29b9ee(0x1d4)][_0x29b9ee(0x17a)](_0x5e20f4,_0x181c63,_0x153029);},VisuMZ['StealItems']['JS']={},VisuMZ[_0x547046(0x1d4)][_0x547046(0x14a)]=function(_0x672a35,_0x2f1966,_0xaa1d4a){const _0x786e1d=_0x547046,_0x309ad8=_0x672a35['note'];if(_0x309ad8[_0x786e1d(0x15d)](_0xaa1d4a)){const _0x2006bc=String(RegExp['$1']),_0x548f1b=_0x786e1d(0x150)['format'](_0x2006bc),_0x4c04e7=VisuMZ[_0x786e1d(0x1d4)][_0x786e1d(0x181)](_0x672a35,_0x2f1966);VisuMZ['StealItems']['JS'][_0x4c04e7]=new Function(_0x548f1b);}},VisuMZ['StealItems'][_0x547046(0x17a)]=function(_0x29fc3b,_0x121c0b,_0xd7e65){const _0x194fb1=_0x547046,_0x458e4d=_0x29fc3b[_0x194fb1(0x1d2)];if(_0x458e4d[_0x194fb1(0x15d)](_0xd7e65)){const _0x6bb152=String(RegExp['$1']),_0x2d18d2=_0x194fb1(0x167)['format'](_0x6bb152),_0x36c703=VisuMZ['StealItems'][_0x194fb1(0x181)](_0x29fc3b,_0x121c0b);VisuMZ[_0x194fb1(0x1d4)]['JS'][_0x36c703]=new Function(_0x2d18d2);}},VisuMZ['StealItems'][_0x547046(0x181)]=function(_0x4f1daf,_0x1610aa){const _0x4bc818=_0x547046;if(VisuMZ['createKeyJS'])return VisuMZ[_0x4bc818(0x181)](_0x4f1daf,_0x1610aa);let _0x14d562='';if($dataActors[_0x4bc818(0x1d1)](_0x4f1daf))_0x14d562=_0x4bc818(0x250)['format'](_0x4f1daf['id'],_0x1610aa);if($dataClasses['includes'](_0x4f1daf))_0x14d562='Class-%1-%2'[_0x4bc818(0x184)](_0x4f1daf['id'],_0x1610aa);if($dataSkills[_0x4bc818(0x1d1)](_0x4f1daf))_0x14d562=_0x4bc818(0x1ff)[_0x4bc818(0x184)](_0x4f1daf['id'],_0x1610aa);if($dataItems['includes'](_0x4f1daf))_0x14d562=_0x4bc818(0x14e)[_0x4bc818(0x184)](_0x4f1daf['id'],_0x1610aa);if($dataWeapons['includes'](_0x4f1daf))_0x14d562='Weapon-%1-%2'['format'](_0x4f1daf['id'],_0x1610aa);if($dataArmors['includes'](_0x4f1daf))_0x14d562=_0x4bc818(0x1b0)[_0x4bc818(0x184)](_0x4f1daf['id'],_0x1610aa);if($dataEnemies[_0x4bc818(0x1d1)](_0x4f1daf))_0x14d562='Enemy-%1-%2'[_0x4bc818(0x184)](_0x4f1daf['id'],_0x1610aa);if($dataStates[_0x4bc818(0x1d1)](_0x4f1daf))_0x14d562=_0x4bc818(0x200)[_0x4bc818(0x184)](_0x4f1daf['id'],_0x1610aa);return _0x14d562;},DataManager[_0x547046(0x16f)]=function(_0x46bb6a){const _0x24de41=_0x547046;_0x46bb6a=_0x46bb6a['toUpperCase']()[_0x24de41(0x196)](),this[_0x24de41(0x153)]=this['_itemIDs']||{};if(this[_0x24de41(0x153)][_0x46bb6a])return this[_0x24de41(0x153)][_0x46bb6a];for(const _0x20dc37 of $dataItems){if(!_0x20dc37)continue;this[_0x24de41(0x153)][_0x20dc37[_0x24de41(0x176)][_0x24de41(0x245)]()[_0x24de41(0x196)]()]=_0x20dc37['id'];}return this[_0x24de41(0x153)][_0x46bb6a]||0x0;},DataManager[_0x547046(0x18e)]=function(_0x4ff1b2){const _0x3d84ed=_0x547046;_0x4ff1b2=_0x4ff1b2[_0x3d84ed(0x245)]()[_0x3d84ed(0x196)](),this[_0x3d84ed(0x175)]=this[_0x3d84ed(0x175)]||{};if(this['_weaponIDs'][_0x4ff1b2])return this[_0x3d84ed(0x175)][_0x4ff1b2];for(const _0x4873f5 of $dataWeapons){if(!_0x4873f5)continue;this[_0x3d84ed(0x175)][_0x4873f5['name']['toUpperCase']()['trim']()]=_0x4873f5['id'];}return this[_0x3d84ed(0x175)][_0x4ff1b2]||0x0;},DataManager[_0x547046(0x1c5)]=function(_0x2fb7e4){const _0x4c7c01=_0x547046;_0x2fb7e4=_0x2fb7e4['toUpperCase']()['trim'](),this[_0x4c7c01(0x20c)]=this['_armorIDs']||{};if(this['_armorIDs'][_0x2fb7e4])return this[_0x4c7c01(0x20c)][_0x2fb7e4];for(const _0x30418e of $dataArmors){if(!_0x30418e)continue;this['_armorIDs'][_0x30418e[_0x4c7c01(0x176)][_0x4c7c01(0x245)]()[_0x4c7c01(0x196)]()]=_0x30418e['id'];}return this['_armorIDs'][_0x2fb7e4]||0x0;},ImageManager[_0x547046(0x1de)]=Imported[_0x547046(0x1e4)]?VisuMZ['CoreEngine']['Settings'][_0x547046(0x1ba)][_0x547046(0x1b8)]:VisuMZ['StealItems'][_0x547046(0x1f6)][_0x547046(0x261)][_0x547046(0x1b8)],TextManager[_0x547046(0x16c)]=VisuMZ[_0x547046(0x1d4)][_0x547046(0x1f6)]['Snatch'][_0x547046(0x1d7)],TextManager[_0x547046(0x1a8)]=VisuMZ['StealItems']['Settings'][_0x547046(0x261)][_0x547046(0x1a7)],TextManager['snatchAlreadyStolen']=VisuMZ['StealItems'][_0x547046(0x1f6)][_0x547046(0x261)][_0x547046(0x20d)],VisuMZ[_0x547046(0x1d4)][_0x547046(0x206)]=Game_Action[_0x547046(0x180)][_0x547046(0x24e)],Game_Action[_0x547046(0x180)][_0x547046(0x24e)]=function(_0x193dad){const _0x3e6f12=_0x547046;VisuMZ[_0x3e6f12(0x1d4)][_0x3e6f12(0x206)]['call'](this,_0x193dad),this[_0x3e6f12(0x23c)](_0x193dad);},Game_Action[_0x547046(0x180)][_0x547046(0x23c)]=function(_0x259a36){const _0x55fb81=_0x547046;if(!this[_0x55fb81(0x191)]())return;if(!_0x259a36[_0x55fb81(0x1e7)]())return;if(this['subject']()[_0x55fb81(0x1e7)]())return;const _0x25d819=VisuMZ[_0x55fb81(0x1d4)][_0x55fb81(0x197)](this,_0x259a36);if(_0x25d819[_0x55fb81(0x204)][_0x55fb81(0x255)]<=0x0)return;const _0x592b0f=_0x259a36[_0x55fb81(0x24b)]();if(_0x592b0f['length']<=0x0)return;let _0x390c10=[];this[_0x55fb81(0x1f7)]()?_0x390c10=this[_0x55fb81(0x1dd)](_0x259a36):_0x390c10=_0x592b0f[_0x55fb81(0x169)](_0x4e79a8=>{const _0x22db08=_0x55fb81;return _0x25d819['types']['includes'](_0x4e79a8[_0x22db08(0x20f)]);});_0x390c10=_0x390c10[_0x55fb81(0x169)](_0x1e8074=>{const _0x4eebaa=_0x55fb81;return!_0x1e8074[_0x4eebaa(0x1f4)];});if(_0x390c10[_0x55fb81(0x255)]<=0x0)return this[_0x55fb81(0x1fd)](_0x259a36);this[_0x55fb81(0x1e6)](_0x259a36,_0x25d819,_0x390c10);},VisuMZ[_0x547046(0x1d4)]['DetermineStealData']=function(_0x3f9d95,_0x33db33){const _0x1fc1ec=_0x547046,_0x23d0b5=VisuMZ['StealItems']['RegExp'],_0x373671=_0x3f9d95['item']()['note'];let _0x52789d=[],_0xaffc85={'all':_0x3f9d95[_0x1fc1ec(0x162)]()[_0x1fc1ec(0x1e2)](),'gold':0x1,'item':0x1,'weapon':0x1,'armor':0x1},_0x119c67={'all':_0x3f9d95[_0x1fc1ec(0x162)]()[_0x1fc1ec(0x1fb)]()-_0x33db33[_0x1fc1ec(0x243)](),'gold':0x0,'item':0x0,'weapon':0x0,'armor':0x0};_0x373671[_0x1fc1ec(0x15d)](_0x23d0b5[_0x1fc1ec(0x25f)])&&(_0x52789d=['GOLD','ITEM',_0x1fc1ec(0x213),_0x1fc1ec(0x18c)]);const _0x3db4e7=_0x373671[_0x1fc1ec(0x15d)](_0x23d0b5[_0x1fc1ec(0x171)]);if(_0x3db4e7)for(const _0x32836b of _0x3db4e7){if(!_0x32836b)continue;if(_0x32836b['match'](/ALL/i)){_0x52789d=['GOLD',_0x1fc1ec(0x221),'WEAPON',_0x1fc1ec(0x18c)];if(_0x32836b[_0x1fc1ec(0x15d)](/([\+\-]\d+)([%％])/i))_0x119c67['all']+=Number(RegExp['$1'])*0.01;else _0x32836b[_0x1fc1ec(0x15d)](/(\d+)([%％])/i)&&(_0xaffc85['all']*=Number(RegExp['$1'])*0.01);}if(_0x32836b['match'](/GOLD/i)){_0x52789d[_0x1fc1ec(0x190)](_0x1fc1ec(0x151));if(_0x32836b[_0x1fc1ec(0x15d)](/([\+\-]\d+)([%％])/i))_0x119c67[_0x1fc1ec(0x1ee)]+=Number(RegExp['$1'])*0.01;else _0x32836b[_0x1fc1ec(0x15d)](/(\d+)([%％])/i)&&(_0xaffc85[_0x1fc1ec(0x1ee)]*=Number(RegExp['$1'])*0.01);}if(_0x32836b[_0x1fc1ec(0x15d)](/ITEM/i)){_0x52789d[_0x1fc1ec(0x190)](_0x1fc1ec(0x221));if(_0x32836b[_0x1fc1ec(0x15d)](/([\+\-]\d+)([%％])/i))_0x119c67[_0x1fc1ec(0x191)]+=Number(RegExp['$1'])*0.01;else _0x32836b[_0x1fc1ec(0x15d)](/(\d+)([%％])/i)&&(_0xaffc85['item']*=Number(RegExp['$1'])*0.01);}if(_0x32836b[_0x1fc1ec(0x15d)](/WEAPON/i)){_0x52789d[_0x1fc1ec(0x190)](_0x1fc1ec(0x213));if(_0x32836b[_0x1fc1ec(0x15d)](/([\+\-]\d+)([%％])/i))_0x119c67[_0x1fc1ec(0x164)]+=Number(RegExp['$1'])*0.01;else _0x32836b[_0x1fc1ec(0x15d)](/(\d+)([%％])/i)&&(_0xaffc85[_0x1fc1ec(0x164)]*=Number(RegExp['$1'])*0.01);}if(_0x32836b[_0x1fc1ec(0x15d)](/ARMOR/i)){_0x52789d['push'](_0x1fc1ec(0x18c));if(_0x32836b[_0x1fc1ec(0x15d)](/([\+\-]\d+)([%％])/i))_0x119c67['armor']+=Number(RegExp['$1'])*0.01;else _0x32836b[_0x1fc1ec(0x15d)](/(\d+)([%％])/i)&&(_0xaffc85[_0x1fc1ec(0x1c0)]*=Number(RegExp['$1'])*0.01);}}let _0x4bf2a1=VisuMZ[_0x1fc1ec(0x1d4)][_0x1fc1ec(0x181)](_0x3f9d95[_0x1fc1ec(0x191)](),'JsStealRate');return VisuMZ['StealItems']['JS'][_0x4bf2a1]&&(_0xaffc85[_0x1fc1ec(0x1cd)]=VisuMZ['StealItems']['JS'][_0x4bf2a1][_0x1fc1ec(0x25c)](_0x3f9d95,_0x3f9d95[_0x1fc1ec(0x162)](),_0x33db33,_0xaffc85[_0x1fc1ec(0x1cd)])),_0x4bf2a1=VisuMZ[_0x1fc1ec(0x1d4)][_0x1fc1ec(0x181)](_0x3f9d95['item'](),_0x1fc1ec(0x214)),VisuMZ[_0x1fc1ec(0x1d4)]['JS'][_0x4bf2a1]&&(_0xaffc85[_0x1fc1ec(0x1ee)]=VisuMZ[_0x1fc1ec(0x1d4)]['JS'][_0x4bf2a1]['call'](_0x3f9d95,_0x3f9d95[_0x1fc1ec(0x162)](),_0x33db33,_0xaffc85['gold'])),_0x4bf2a1=VisuMZ['StealItems']['createKeyJS'](_0x3f9d95[_0x1fc1ec(0x191)](),'JsStealRateItem'),VisuMZ[_0x1fc1ec(0x1d4)]['JS'][_0x4bf2a1]&&(_0xaffc85[_0x1fc1ec(0x191)]=VisuMZ[_0x1fc1ec(0x1d4)]['JS'][_0x4bf2a1][_0x1fc1ec(0x25c)](_0x3f9d95,_0x3f9d95[_0x1fc1ec(0x162)](),_0x33db33,_0xaffc85[_0x1fc1ec(0x191)])),_0x4bf2a1=VisuMZ[_0x1fc1ec(0x1d4)][_0x1fc1ec(0x181)](_0x3f9d95[_0x1fc1ec(0x191)](),_0x1fc1ec(0x216)),VisuMZ[_0x1fc1ec(0x1d4)]['JS'][_0x4bf2a1]&&(_0xaffc85['weapon']=VisuMZ['StealItems']['JS'][_0x4bf2a1][_0x1fc1ec(0x25c)](_0x3f9d95,_0x3f9d95[_0x1fc1ec(0x162)](),_0x33db33,_0xaffc85['weapon'])),_0x4bf2a1=VisuMZ['StealItems']['createKeyJS'](_0x3f9d95[_0x1fc1ec(0x191)](),_0x1fc1ec(0x19e)),VisuMZ[_0x1fc1ec(0x1d4)]['JS'][_0x4bf2a1]&&(_0xaffc85[_0x1fc1ec(0x1c0)]=VisuMZ['StealItems']['JS'][_0x4bf2a1]['call'](_0x3f9d95,_0x3f9d95[_0x1fc1ec(0x162)](),_0x33db33,_0xaffc85[_0x1fc1ec(0x1c0)])),{'types':_0x52789d,'rate':_0xaffc85,'plus':_0x119c67};},VisuMZ[_0x547046(0x1d4)][_0x547046(0x21b)]=function(_0x5dc0eb){const _0x37e3dd=_0x547046;var _0x5b3ffe,_0x53849d,_0x4fc380;for(_0x4fc380=_0x5dc0eb['length']-0x1;_0x4fc380>0x0;_0x4fc380--){_0x5b3ffe=Math['floor'](Math[_0x37e3dd(0x1e1)]()*(_0x4fc380+0x1)),_0x53849d=_0x5dc0eb[_0x4fc380],_0x5dc0eb[_0x4fc380]=_0x5dc0eb[_0x5b3ffe],_0x5dc0eb[_0x5b3ffe]=_0x53849d;}return _0x5dc0eb;},Game_Action[_0x547046(0x180)]['processStealItemsAttempt']=function(_0x38044e,_0x4db8a5,_0x58e44d){const _0x3ca3cc=_0x547046;VisuMZ[_0x3ca3cc(0x1d4)]['ShuffleArray'](_0x58e44d),this[_0x3ca3cc(0x1d3)](_0x38044e);for(const _0x1dc242 of _0x58e44d){if(!_0x1dc242)continue;let _0x1f2d1e=_0x4db8a5[_0x3ca3cc(0x24c)][_0x3ca3cc(0x1cd)]*_0x1dc242[_0x3ca3cc(0x24c)],_0x3bb7d7=_0x4db8a5['plus']['all'];_0x1f2d1e*=_0x4db8a5[_0x3ca3cc(0x24c)][_0x1dc242[_0x3ca3cc(0x20f)]['toLowerCase']()],_0x3bb7d7+=_0x4db8a5['plus'][_0x1dc242[_0x3ca3cc(0x20f)][_0x3ca3cc(0x1d9)]()];const _0x377ae9=_0x1f2d1e+_0x3bb7d7;if(Math[_0x3ca3cc(0x1e1)]()<_0x377ae9)return this[_0x3ca3cc(0x1bb)](_0x38044e,_0x1dc242);}this['processStealItemsFailure'](_0x38044e);},Game_Action['prototype'][_0x547046(0x1f7)]=function(){const _0x300e0a=_0x547046;if(!this[_0x300e0a(0x191)]())return![];if(!this[_0x300e0a(0x179)]())return![];if(!this['isForOpponent']())return![];if(!this[_0x300e0a(0x25d)]())return![];const _0x46908d=VisuMZ['StealItems'][_0x300e0a(0x1f8)],_0x2577fe=this[_0x300e0a(0x191)]()['note'];return _0x2577fe[_0x300e0a(0x15d)](_0x46908d['Snatch'])&&(_0x2577fe[_0x300e0a(0x15d)](_0x46908d[_0x300e0a(0x25f)])||_0x2577fe[_0x300e0a(0x15d)](_0x46908d[_0x300e0a(0x171)]));},Game_Action[_0x547046(0x180)][_0x547046(0x1b1)]=function(_0x4ed84f,_0x322d22){const _0x3df0cd=_0x547046;this[_0x3df0cd(0x1cc)]=_0x4ed84f[_0x3df0cd(0x232)]();const _0x8e01b3=_0x4ed84f[_0x3df0cd(0x24b)]();this[_0x3df0cd(0x15b)]=_0x8e01b3[_0x3df0cd(0x16a)](_0x322d22);},Game_Action['prototype']['getSnatchTarget']=function(_0x5b4cd4){const _0x22d32d=_0x547046;if(_0x5b4cd4['index']()!==this['_snatchEnemyIndex'])return[];this['_snatchItemIndex']=this['_snatchItemIndex']||0x0;const _0x4d6660=_0x5b4cd4[_0x22d32d(0x24b)]();return[_0x4d6660[this['_snatchItemIndex']]];},Game_Action['prototype']['processStealItemsSuccess']=function(_0x34f4e2,_0x1af757){const _0x53e8b3=_0x547046;_0x1af757['stolen']=!![],this[_0x53e8b3(0x16d)](_0x34f4e2,_0x1af757),this['processStealItemsSuccessSFX'](_0x1af757),this[_0x53e8b3(0x187)](_0x34f4e2,_0x1af757),this[_0x53e8b3(0x1bc)](_0x34f4e2,_0x1af757),this[_0x53e8b3(0x23b)](_0x34f4e2,_0x1af757);},Game_Action['prototype']['processStealItemsSuccessLogWindow']=function(_0x44b88a,_0x75a3d8){const _0x29f4d7=_0x547046,_0x1eccf0=VisuMZ[_0x29f4d7(0x1d4)][_0x29f4d7(0x1f6)][_0x29f4d7(0x186)];let _0x1da084=_0x1eccf0[_0x29f4d7(0x210)],_0xb19f01='';if(_0x75a3d8[_0x29f4d7(0x20f)]===_0x29f4d7(0x151)){$gameParty[_0x29f4d7(0x1f0)](_0x75a3d8['id']);if(Imported[_0x29f4d7(0x168)]){const _0x31be7a=Window_Base[_0x29f4d7(0x1d0)],_0x17235b=VisuMZ[_0x29f4d7(0x25b)]['CreateVisualGoldText'](_0x75a3d8['id'],_0x31be7a,![]);_0xb19f01=_0x1da084[_0x29f4d7(0x184)](_0x17235b,'');}else _0x1da084=_0x1eccf0[_0x29f4d7(0x18d)],_0xb19f01=_0x1da084[_0x29f4d7(0x184)](TextManager['currencyUnit'],_0x75a3d8['id']);if(Imported[_0x29f4d7(0x163)]){const _0x540ed=VisuMZ['StealItems'][_0x29f4d7(0x1f6)][_0x29f4d7(0x172)];_0x540ed[_0x29f4d7(0x194)]&&_0x540ed[_0x29f4d7(0x17b)]&&(_0x44b88a[_0x29f4d7(0x235)]=_0x44b88a[_0x29f4d7(0x235)]||{},_0x44b88a['_visualDrops'][_0x29f4d7(0x1ee)]=0x0);}}else{if(_0x75a3d8[_0x29f4d7(0x20f)]===_0x29f4d7(0x221)){const _0x42cd90=$dataItems[_0x75a3d8['id']];if(!_0x42cd90)return;$gameParty[_0x29f4d7(0x1ab)](_0x42cd90,0x1);const _0x3bbce7=_0x29f4d7(0x1c8)['format'](_0x42cd90[_0x29f4d7(0x1ef)]);_0xb19f01=_0x1da084[_0x29f4d7(0x184)](_0x42cd90[_0x29f4d7(0x176)],_0x3bbce7);}else{if(_0x75a3d8['type']===_0x29f4d7(0x213)){const _0x1e86c3=$dataWeapons[_0x75a3d8['id']];if(!_0x1e86c3)return;$gameParty[_0x29f4d7(0x1ab)](_0x1e86c3,0x1);const _0xcff80c=_0x29f4d7(0x1c8)[_0x29f4d7(0x184)](_0x1e86c3[_0x29f4d7(0x1ef)]);_0xb19f01=_0x1da084['format'](_0x1e86c3[_0x29f4d7(0x176)],_0xcff80c);}else{if(_0x75a3d8[_0x29f4d7(0x20f)]===_0x29f4d7(0x18c)){const _0x4abc13=$dataArmors[_0x75a3d8['id']];if(!_0x4abc13)return;$gameParty['gainItem'](_0x4abc13,0x1);const _0x456cf8=_0x29f4d7(0x1c8)[_0x29f4d7(0x184)](_0x4abc13['iconIndex']);_0xb19f01=_0x1da084['format'](_0x4abc13[_0x29f4d7(0x176)],_0x456cf8);}}}}if(_0x1eccf0['ShowMessages']){const _0x590c67=SceneManager[_0x29f4d7(0x242)][_0x29f4d7(0x161)];if(_0x590c67&&_0xb19f01!=='')_0x590c67[_0x29f4d7(0x22e)](_0xb19f01);}},Game_Action['prototype'][_0x547046(0x157)]=function(_0x591c45){const _0x374300=_0x547046,_0x472a18=VisuMZ[_0x374300(0x1d4)][_0x374300(0x1f6)][_0x374300(0x249)];if(!_0x472a18)return;const _0x1eaca2=_0x591c45[_0x374300(0x20f)][_0x374300(0x1d9)]()[_0x374300(0x196)](),_0x1e8b3e={'name':_0x472a18[_0x374300(0x17c)[_0x374300(0x184)](_0x1eaca2)]||'','volume':_0x472a18[_0x374300(0x201)['format'](_0x1eaca2)]||0x0,'pitch':_0x472a18[_0x374300(0x15c)[_0x374300(0x184)](_0x1eaca2)]||0x0,'pan':_0x472a18[_0x374300(0x185)[_0x374300(0x184)](_0x1eaca2)]||0x0};if(_0x1e8b3e[_0x374300(0x176)]!=='')AudioManager[_0x374300(0x203)](_0x1e8b3e);},Game_Action['prototype'][_0x547046(0x187)]=function(_0x505ccb,_0x344169){const _0x33cfab=_0x547046;if(!_0x344169)return;if(!_0x505ccb)return;const _0x3970eb=VisuMZ[_0x33cfab(0x1d4)][_0x33cfab(0x1f6)][_0x33cfab(0x237)];if(!_0x3970eb)return;if(_0x3970eb[_0x33cfab(0x1df)]==='')return;const _0x6423ab=_0x3970eb['SuccessPopupText'],_0x3c487f={'textColor':_0x3970eb[_0x33cfab(0x208)]||0x0,'flashColor':_0x3970eb[_0x33cfab(0x226)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x3970eb['SuccessFlashDuration']||0x3c};_0x505ccb[_0x33cfab(0x205)](_0x6423ab,_0x3c487f);if(_0x3970eb[_0x33cfab(0x238)]&&_0x344169[_0x33cfab(0x20f)]!==_0x33cfab(0x151)){let _0x47e3f0=null;if(_0x344169[_0x33cfab(0x20f)]===_0x33cfab(0x221))_0x47e3f0=$dataItems[_0x344169['id']];else{if(_0x344169[_0x33cfab(0x20f)]===_0x33cfab(0x213))_0x47e3f0=$dataWeapons[_0x344169['id']];else _0x344169['type']===_0x33cfab(0x18c)&&(_0x47e3f0=$dataArmors[_0x344169['id']]);}_0x47e3f0&&_0x505ccb[_0x33cfab(0x21a)](_0x47e3f0[_0x33cfab(0x1ef)],_0x47e3f0['name'],_0x3c487f);}},Game_Action[_0x547046(0x180)][_0x547046(0x1bc)]=function(_0xdda78a,_0x35cb05){const _0x5ee8e8=_0x547046;if(!_0xdda78a)return;const _0x5de573=VisuMZ[_0x5ee8e8(0x1d4)][_0x5ee8e8(0x1f6)][_0x5ee8e8(0x1e0)];if(!_0x5de573)return;if(!_0x5de573[_0x5ee8e8(0x156)])return;if(!['WEAPON',_0x5ee8e8(0x18c)]['includes'](_0x35cb05[_0x5ee8e8(0x20f)]))return;let _0x5e9541=null;if(_0x35cb05[_0x5ee8e8(0x20f)]===_0x5ee8e8(0x213))_0x5e9541=$dataWeapons[_0x35cb05['id']];else _0x35cb05[_0x5ee8e8(0x20f)]===_0x5ee8e8(0x18c)&&(_0x5e9541=$dataArmors[_0x35cb05['id']]);if(!_0x5e9541)return;for(let _0x29cd4d=0x0;_0x29cd4d<0x8;_0x29cd4d++){const _0x44a5a2=_0x5e9541[_0x5ee8e8(0x257)][_0x29cd4d];_0xdda78a[_0x5ee8e8(0x1a2)](_0x29cd4d,-_0x44a5a2);}},Game_Action['prototype']['processStealItemsSuccessJS']=function(_0x34a025,_0x5e3544){const _0x451917=_0x547046;if(!_0x34a025)return;let _0x2a858c=null,_0x49b7b2=0x0;if(_0x5e3544['type']===_0x451917(0x151))_0x49b7b2=_0x5e3544['id'];else{if(_0x5e3544[_0x451917(0x20f)]===_0x451917(0x221))_0x2a858c=$dataItems[_0x5e3544['id']];else{if(_0x5e3544[_0x451917(0x20f)]==='WEAPON')_0x2a858c=$dataWeapons[_0x5e3544['id']];else _0x5e3544[_0x451917(0x20f)]===_0x451917(0x18c)&&(_0x2a858c=$dataArmors[_0x5e3544['id']]);}}const _0xc5765c=VisuMZ[_0x451917(0x1d4)][_0x451917(0x1f6)]['Mechanics'];_0xc5765c&&_0xc5765c[_0x451917(0x18f)]&&_0xc5765c[_0x451917(0x18f)]['call'](this,this[_0x451917(0x162)](),_0x34a025,_0x2a858c,_0x49b7b2);const _0x45ab3f=VisuMZ['StealItems'][_0x451917(0x181)](this[_0x451917(0x191)](),_0x451917(0x18f));VisuMZ['StealItems']['JS'][_0x45ab3f]&&VisuMZ[_0x451917(0x1d4)]['JS'][_0x45ab3f][_0x451917(0x25c)](this,this['subject'](),_0x34a025,_0x2a858c,_0x49b7b2);},Game_Action[_0x547046(0x180)][_0x547046(0x170)]=function(_0x1390bc){const _0x54e664=_0x547046;this[_0x54e664(0x188)](_0x1390bc),this[_0x54e664(0x1eb)](),this[_0x54e664(0x154)](_0x1390bc),this['processStealItemsFailureJS'](_0x1390bc);},Game_Action['prototype'][_0x547046(0x188)]=function(_0x3dd7a9){const _0x2ebc04=_0x547046,_0x3b50e7=VisuMZ[_0x2ebc04(0x1d4)]['Settings'][_0x2ebc04(0x186)];if(_0x3b50e7['ShowMessages']){const _0x3da980=_0x3b50e7['StealFail'],_0x2d2a8a=SceneManager[_0x2ebc04(0x242)]['_logWindow'];if(_0x2d2a8a&&_0x3da980!=='')_0x2d2a8a[_0x2ebc04(0x22e)](_0x3da980);}},Game_Action[_0x547046(0x180)][_0x547046(0x1eb)]=function(){const _0x10b7a4=_0x547046,_0x1656df=VisuMZ[_0x10b7a4(0x1d4)][_0x10b7a4(0x1f6)][_0x10b7a4(0x249)];if(!_0x1656df)return;const _0x516da5=_0x10b7a4(0x24a),_0x2041d2={'name':_0x1656df[_0x10b7a4(0x17c)['format'](_0x516da5)]||'','volume':_0x1656df[_0x10b7a4(0x201)[_0x10b7a4(0x184)](_0x516da5)]||0x0,'pitch':_0x1656df['%1_pitch'['format'](_0x516da5)]||0x0,'pan':_0x1656df['%1_pan'[_0x10b7a4(0x184)](_0x516da5)]||0x0};if(_0x2041d2[_0x10b7a4(0x176)]!=='')AudioManager[_0x10b7a4(0x203)](_0x2041d2);},Game_Action[_0x547046(0x180)][_0x547046(0x154)]=function(_0x50b6c9){const _0x167c0b=_0x547046;if(!_0x50b6c9)return;const _0x5dd5af=VisuMZ[_0x167c0b(0x1d4)]['Settings'][_0x167c0b(0x237)];if(!_0x5dd5af)return;if(_0x5dd5af['FailurePopupText']==='')return;const _0x355d38=_0x5dd5af[_0x167c0b(0x20a)],_0x4088d6={'textColor':_0x5dd5af[_0x167c0b(0x195)]||0x0,'flashColor':_0x5dd5af[_0x167c0b(0x1b6)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x5dd5af['FailureFlashDuration']||0x3c};_0x50b6c9[_0x167c0b(0x205)](_0x355d38,_0x4088d6);},Game_Action[_0x547046(0x180)][_0x547046(0x258)]=function(_0x186799){const _0x3458f8=_0x547046;if(!_0x186799)return;const _0x5d64fa=VisuMZ[_0x3458f8(0x1d4)][_0x3458f8(0x1f6)][_0x3458f8(0x1e0)];_0x5d64fa&&_0x5d64fa['JsOnStealFail']&&_0x5d64fa[_0x3458f8(0x1bd)][_0x3458f8(0x25c)](this,this['subject'](),_0x186799);const _0x35a739=VisuMZ[_0x3458f8(0x1d4)][_0x3458f8(0x181)](this[_0x3458f8(0x191)](),_0x3458f8(0x1bd));VisuMZ[_0x3458f8(0x1d4)]['JS'][_0x35a739]&&VisuMZ['StealItems']['JS'][_0x35a739]['call'](this,this[_0x3458f8(0x162)](),_0x186799);},Game_Action[_0x547046(0x180)][_0x547046(0x1fd)]=function(_0x8aa6f1){const _0x40c04c=_0x547046;this[_0x40c04c(0x1ad)](_0x8aa6f1),this[_0x40c04c(0x16b)](),this[_0x40c04c(0x247)](_0x8aa6f1),this['processStealItemsNothingJS'](_0x8aa6f1);},Game_Action[_0x547046(0x180)][_0x547046(0x1ad)]=function(_0x22efb5){const _0x194b03=_0x547046,_0x478165=VisuMZ[_0x194b03(0x1d4)]['Settings'][_0x194b03(0x186)];if(_0x478165[_0x194b03(0x223)]){const _0x345d1d=_0x478165[_0x194b03(0x189)],_0x4f7525=SceneManager['_scene'][_0x194b03(0x161)];if(_0x4f7525&&_0x345d1d!=='')_0x4f7525[_0x194b03(0x22e)](_0x345d1d);}},Game_Action[_0x547046(0x180)][_0x547046(0x16b)]=function(){const _0x534d38=_0x547046,_0x17d866=VisuMZ[_0x534d38(0x1d4)][_0x534d38(0x1f6)][_0x534d38(0x249)];if(!_0x17d866)return;const _0x2a46dc=_0x534d38(0x234),_0x247e8a={'name':_0x17d866[_0x534d38(0x17c)[_0x534d38(0x184)](_0x2a46dc)]||'','volume':_0x17d866[_0x534d38(0x201)[_0x534d38(0x184)](_0x2a46dc)]||0x0,'pitch':_0x17d866['%1_pitch'[_0x534d38(0x184)](_0x2a46dc)]||0x0,'pan':_0x17d866[_0x534d38(0x185)[_0x534d38(0x184)](_0x2a46dc)]||0x0};if(_0x247e8a['name']!=='')AudioManager[_0x534d38(0x203)](_0x247e8a);},Game_Action[_0x547046(0x180)]['processStealItemsNothingPopup']=function(_0x55a17b){const _0x170d23=_0x547046;if(!_0x55a17b)return;const _0x3f19e9=VisuMZ[_0x170d23(0x1d4)]['Settings'][_0x170d23(0x237)];if(!_0x3f19e9)return;if(_0x3f19e9['FailurePopupText']==='')return;const _0x5a6296=_0x3f19e9[_0x170d23(0x19b)],_0x37a27a={'textColor':_0x3f19e9[_0x170d23(0x178)]||0x0,'flashColor':_0x3f19e9['EmptyFlashColor']||[0x0,0x0,0x0,0x0],'flashDuration':_0x3f19e9[_0x170d23(0x14b)]||0x3c};_0x55a17b[_0x170d23(0x205)](_0x5a6296,_0x37a27a);},Game_Action[_0x547046(0x180)][_0x547046(0x1bf)]=function(_0x3f53c3){const _0x3da8b8=_0x547046;if(!_0x3f53c3)return;const _0x15623d=VisuMZ[_0x3da8b8(0x1d4)][_0x3da8b8(0x1f6)][_0x3da8b8(0x1e0)];_0x15623d&&_0x15623d[_0x3da8b8(0x1e9)]&&_0x15623d['JsOnStealEmpty'][_0x3da8b8(0x25c)](this,this[_0x3da8b8(0x162)](),_0x3f53c3);const _0x35c25c=VisuMZ[_0x3da8b8(0x1d4)][_0x3da8b8(0x181)](this[_0x3da8b8(0x191)](),_0x3da8b8(0x158));VisuMZ['StealItems']['JS'][_0x35c25c]&&VisuMZ[_0x3da8b8(0x1d4)]['JS'][_0x35c25c][_0x3da8b8(0x25c)](this,this[_0x3da8b8(0x162)](),_0x3f53c3);},VisuMZ[_0x547046(0x1d4)][_0x547046(0x21f)]=Game_BattlerBase['prototype'][_0x547046(0x14f)],Game_BattlerBase['prototype'][_0x547046(0x14f)]=function(){const _0x260f21=_0x547046;this[_0x260f21(0x18b)]={},VisuMZ['StealItems'][_0x260f21(0x21f)][_0x260f21(0x25c)](this);},Game_BattlerBase['prototype'][_0x547046(0x1f2)]=function(_0x5458b0){const _0x5ae85c=_0x547046;return this[_0x5ae85c(0x18b)]=this[_0x5ae85c(0x18b)]||{},this[_0x5ae85c(0x18b)][_0x5458b0]!==undefined;},Game_BattlerBase[_0x547046(0x180)]['stealRate']=function(){const _0x393b06=_0x547046;let _0x2e13af='stealRate';if(this['checkCacheKey'](_0x2e13af))return this[_0x393b06(0x18b)][_0x2e13af];return this[_0x393b06(0x18b)][_0x2e13af]=this['createStealRate'](),this[_0x393b06(0x18b)][_0x2e13af];},Game_BattlerBase[_0x547046(0x180)][_0x547046(0x246)]=function(){const _0x4ac0de=_0x547046,_0xcfe97d=VisuMZ[_0x4ac0de(0x1d4)][_0x4ac0de(0x1f8)];let _0x427fbe=0x1;for(const _0x46df10 of this[_0x4ac0de(0x159)]()){if(!_0x46df10)continue;const _0x24f1e3=_0x46df10[_0x4ac0de(0x1d2)];_0x24f1e3[_0x4ac0de(0x15d)](_0xcfe97d[_0x4ac0de(0x1db)])&&(_0x427fbe*=Number(RegExp['$1'])*0.01);}return Math[_0x4ac0de(0x23d)](0x0,_0x427fbe);},Game_BattlerBase[_0x547046(0x180)][_0x547046(0x1fb)]=function(){const _0x5c4434=_0x547046;let _0x462682='stealPlus';if(this[_0x5c4434(0x1f2)](_0x462682))return this[_0x5c4434(0x18b)][_0x462682];return this[_0x5c4434(0x18b)][_0x462682]=this[_0x5c4434(0x1c9)](),this['_cache'][_0x462682];},Game_BattlerBase[_0x547046(0x180)][_0x547046(0x1c9)]=function(){const _0x473a66=_0x547046,_0x1359ab=VisuMZ[_0x473a66(0x1d4)][_0x473a66(0x1f8)];let _0x174b08=0x0;const _0x3fa9af=VisuMZ['StealItems'][_0x473a66(0x1f6)][_0x473a66(0x1e0)];_0x3fa9af&&_0x3fa9af[_0x473a66(0x1a4)]&&(_0x174b08+=_0x3fa9af[_0x473a66(0x1a4)][_0x473a66(0x25c)](this));for(const _0x198794 of this[_0x473a66(0x159)]()){if(!_0x198794)continue;const _0x48c7b8=_0x198794[_0x473a66(0x1d2)];_0x48c7b8[_0x473a66(0x15d)](_0x1359ab['StealPlus'])&&(_0x174b08+=Number(RegExp['$1'])*0.01);}return _0x174b08;},Game_BattlerBase['prototype'][_0x547046(0x243)]=function(){const _0x17f626=_0x547046;let _0x272a5c=_0x17f626(0x243);if(this[_0x17f626(0x1f2)](_0x272a5c))return this[_0x17f626(0x18b)][_0x272a5c];return this[_0x17f626(0x18b)][_0x272a5c]=this['createStealResist'](),this[_0x17f626(0x18b)][_0x272a5c];},Game_BattlerBase[_0x547046(0x180)][_0x547046(0x1b4)]=function(){const _0x279de2=_0x547046,_0x25ebcd=VisuMZ['StealItems'][_0x279de2(0x1f8)];let _0x52cd71=0x0;const _0x1d61b1=VisuMZ[_0x279de2(0x1d4)]['Settings']['Mechanics'];_0x1d61b1&&_0x1d61b1[_0x279de2(0x240)]&&(_0x52cd71+=_0x1d61b1[_0x279de2(0x240)][_0x279de2(0x25c)](this));for(const _0x16b7b2 of this[_0x279de2(0x159)]()){if(!_0x16b7b2)continue;const _0x1ad306=_0x16b7b2[_0x279de2(0x1d2)];_0x1ad306[_0x279de2(0x15d)](_0x25ebcd[_0x279de2(0x260)])&&(_0x52cd71+=Number(RegExp['$1'])*0.01);}return _0x52cd71;},VisuMZ[_0x547046(0x1d4)]['Game_Enemy_setup']=Game_Enemy[_0x547046(0x180)][_0x547046(0x18a)],Game_Enemy[_0x547046(0x180)]['setup']=function(_0x40e45b,_0xf92934,_0x27cc02){const _0x19c20b=_0x547046;VisuMZ[_0x19c20b(0x1d4)]['Game_Enemy_setup'][_0x19c20b(0x25c)](this,_0x40e45b,_0xf92934,_0x27cc02),!Imported[_0x19c20b(0x1d8)]&&this['setupStealableItems']();},VisuMZ[_0x547046(0x1d4)][_0x547046(0x1aa)]=Game_Enemy[_0x547046(0x180)][_0x547046(0x244)],Game_Enemy[_0x547046(0x180)][_0x547046(0x244)]=function(){const _0x3fe56a=_0x547046;VisuMZ[_0x3fe56a(0x1d4)]['Game_Enemy_setupEnemyLevels'][_0x3fe56a(0x25c)](this),this[_0x3fe56a(0x218)]();},Game_Enemy[_0x547046(0x180)][_0x547046(0x24b)]=function(){const _0x261452=_0x547046;if(this[_0x261452(0x25e)]===undefined)this[_0x261452(0x218)]();return this[_0x261452(0x25e)];},Game_Enemy[_0x547046(0x180)][_0x547046(0x218)]=function(){const _0x299c35=_0x547046,_0x22f3c0=this['enemy']();if(!_0x22f3c0)return;this['_stealableItems']=VisuMZ[_0x299c35(0x1d4)][_0x299c35(0x14d)](this,_0x22f3c0);},VisuMZ[_0x547046(0x1d4)][_0x547046(0x21d)]={},VisuMZ[_0x547046(0x1d4)]['StealableItems']=function(_0xa6f49c,_0x2bde94){const _0x34aecc=_0x547046;if(!_0x2bde94)return[];if(VisuMZ['StealItems']['StealData'][_0x2bde94['id']])return JsonEx['makeDeepCopy'](VisuMZ[_0x34aecc(0x1d4)]['StealData'][_0x2bde94['id']]);VisuMZ[_0x34aecc(0x1d4)]['StealData'][_0x2bde94['id']]=[];const _0x940aa6=VisuMZ[_0x34aecc(0x1d4)][_0x34aecc(0x1f6)][_0x34aecc(0x172)],_0x1ca18a=VisuMZ[_0x34aecc(0x1d4)][_0x34aecc(0x1f8)],_0x4ff06b=_0x2bde94[_0x34aecc(0x1d2)];if(_0x940aa6[_0x34aecc(0x194)]&&_0x2bde94[_0x34aecc(0x1ee)]>0x0){const _0x3ac115={'type':_0x34aecc(0x151),'id':_0x2bde94[_0x34aecc(0x1ee)],'rate':_0x940aa6[_0x34aecc(0x174)],'stolen':![],'drop':!![]};VisuMZ['StealItems'][_0x34aecc(0x21d)][_0x2bde94['id']]['push'](_0x3ac115);}if(_0x940aa6[_0x34aecc(0x198)]){const _0x1751c2=_0x2bde94[_0x34aecc(0x19c)];for(const _0x46d458 of _0x1751c2){if(_0x46d458){const _0x924e0={'type':'none','id':_0x46d458['dataId'],'rate':0x1/Math['max'](0x1,_0x46d458[_0x34aecc(0x199)])*_0x940aa6[_0x34aecc(0x1be)],'stolen':![],'drop':!![],'dropIndex':_0x1751c2['indexOf'](_0x46d458)};_0x924e0[_0x34aecc(0x20f)]=[_0x34aecc(0x22a),_0x34aecc(0x221),_0x34aecc(0x213),'ARMOR'][_0x46d458[_0x34aecc(0x212)]];if(_0x924e0['type']==='none')continue;VisuMZ['StealItems'][_0x34aecc(0x21d)][_0x2bde94['id']][_0x34aecc(0x190)](_0x924e0);}}}const _0xa418b9=_0x4ff06b[_0x34aecc(0x15d)](_0x1ca18a[_0x34aecc(0x1a5)]);if(_0xa418b9)for(const _0x11e3d3 of _0xa418b9){if(!_0x11e3d3)continue;_0x11e3d3['match'](_0x1ca18a[_0x34aecc(0x1a5)]);const _0x3e0304=String(RegExp['$1'])['trim'](),_0x5d1ab7=Number(RegExp['$2'])*0.01,_0x202e99=VisuMZ[_0x34aecc(0x1d4)][_0x34aecc(0x1d6)](_0x3e0304,_0x5d1ab7);if(!!_0x202e99)VisuMZ[_0x34aecc(0x1d4)][_0x34aecc(0x21d)][_0x2bde94['id']]['push'](_0x202e99);}if(_0x4ff06b[_0x34aecc(0x15d)](_0x1ca18a[_0x34aecc(0x251)])){const _0x33b2d0=String(RegExp['$1'])[_0x34aecc(0x1c3)](/[\r\n]+/);for(const _0x37cf30 of _0x33b2d0){if(_0x37cf30[_0x34aecc(0x15d)](/(.*):[ ](.*)([%％])/i)){const _0x21d564=String(RegExp['$1'])[_0x34aecc(0x196)](),_0x24ddda=Number(RegExp['$2'])*0.01,_0x13710a=VisuMZ[_0x34aecc(0x1d4)][_0x34aecc(0x1d6)](_0x21d564,_0x24ddda);if(!!_0x13710a)VisuMZ[_0x34aecc(0x1d4)]['StealData'][_0x2bde94['id']][_0x34aecc(0x190)](_0x13710a);}}}return JsonEx[_0x34aecc(0x21c)](VisuMZ['StealItems']['StealData'][_0x2bde94['id']]);},VisuMZ[_0x547046(0x1d4)][_0x547046(0x1d6)]=function(_0x70dc8d,_0x102688){const _0x4f5409=_0x547046,_0x4ea2a9={'type':'none','id':0x0,'rate':_0x102688,'stolen':![],'drop':![]};_0x70dc8d[_0x4f5409(0x15d)](/GOLD[ ](\d+)/i)&&(_0x4ea2a9['type']=_0x4f5409(0x151),_0x4ea2a9['id']=Number(RegExp['$1']));if(_0x70dc8d[_0x4f5409(0x15d)](/ITEM[ ](\d+)/i))_0x4ea2a9[_0x4f5409(0x20f)]=_0x4f5409(0x221),_0x4ea2a9['id']=Number(RegExp['$1']);else _0x70dc8d['match'](/ITEM[ ](.*)/i)&&(_0x4ea2a9[_0x4f5409(0x20f)]='ITEM',_0x4ea2a9['id']=DataManager[_0x4f5409(0x16f)](RegExp['$1']));if(_0x70dc8d[_0x4f5409(0x15d)](/WEAPON[ ](\d+)/i))_0x4ea2a9[_0x4f5409(0x20f)]=_0x4f5409(0x213),_0x4ea2a9['id']=Number(RegExp['$1']);else _0x70dc8d[_0x4f5409(0x15d)](/WEAPON[ ](.*)/i)&&(_0x4ea2a9[_0x4f5409(0x20f)]='WEAPON',_0x4ea2a9['id']=DataManager[_0x4f5409(0x18e)](RegExp['$1']));if(_0x70dc8d[_0x4f5409(0x15d)](/ARMOR[ ](\d+)/i))_0x4ea2a9[_0x4f5409(0x20f)]='ARMOR',_0x4ea2a9['id']=Number(RegExp['$1']);else _0x70dc8d[_0x4f5409(0x15d)](/ARMOR[ ](.*)/i)&&(_0x4ea2a9[_0x4f5409(0x20f)]='ARMOR',_0x4ea2a9['id']=DataManager[_0x4f5409(0x1c5)](RegExp['$1']));return _0x4ea2a9;},VisuMZ['StealItems'][_0x547046(0x225)]=Game_Enemy[_0x547046(0x180)]['gold'],Game_Enemy[_0x547046(0x180)][_0x547046(0x1ee)]=function(){const _0x46d364=_0x547046,_0x3a1ef9=VisuMZ[_0x46d364(0x1d4)][_0x46d364(0x1f6)][_0x46d364(0x172)];if(_0x3a1ef9[_0x46d364(0x194)]&&_0x3a1ef9['GoldRemoval']){const _0xa7db0d=this[_0x46d364(0x24b)]();for(const _0x48a15b of _0xa7db0d){if(!_0x48a15b)continue;if(_0x48a15b[_0x46d364(0x15a)]&&_0x48a15b[_0x46d364(0x20f)]===_0x46d364(0x151)){if(_0x48a15b[_0x46d364(0x1f4)])return 0x0;}}}return VisuMZ[_0x46d364(0x1d4)]['Game_Enemy_gold']['call'](this);},VisuMZ[_0x547046(0x1d4)]['Game_Enemy_makeDropItems']=Game_Enemy['prototype'][_0x547046(0x222)],Game_Enemy[_0x547046(0x180)][_0x547046(0x222)]=function(){const _0x5b59f8=_0x547046,_0x17a6a4=JsonEx[_0x5b59f8(0x21c)](this[_0x5b59f8(0x1da)]()[_0x5b59f8(0x19c)]),_0x35d9c4=VisuMZ['StealItems'][_0x5b59f8(0x1f6)]['Auto'];if(_0x35d9c4[_0x5b59f8(0x198)]&&_0x35d9c4[_0x5b59f8(0x1b7)]){const _0x877268=this['getStealableItems']();for(const _0x50bc08 of _0x877268){if(!_0x50bc08)continue;if(_0x50bc08[_0x5b59f8(0x15a)]&&_0x50bc08[_0x5b59f8(0x20f)]!==_0x5b59f8(0x151)){if(!_0x50bc08[_0x5b59f8(0x1f4)])continue;const _0x2fbfa7=_0x50bc08['dropIndex'],_0x283b9a=this[_0x5b59f8(0x1da)]()[_0x5b59f8(0x19c)][_0x2fbfa7];_0x283b9a[_0x5b59f8(0x212)]=0x0;}}}let _0x34a7c2=VisuMZ['StealItems'][_0x5b59f8(0x152)]['call'](this);return this[_0x5b59f8(0x1da)]()[_0x5b59f8(0x19c)]=_0x17a6a4,_0x34a7c2;},VisuMZ[_0x547046(0x1d4)][_0x547046(0x19a)]=Scene_Battle[_0x547046(0x180)][_0x547046(0x1f3)],Scene_Battle[_0x547046(0x180)][_0x547046(0x1f3)]=function(){const _0x19d76a=_0x547046;VisuMZ[_0x19d76a(0x1d4)][_0x19d76a(0x19a)][_0x19d76a(0x25c)](this),this[_0x19d76a(0x1f5)]();},Scene_Battle[_0x547046(0x180)][_0x547046(0x1f5)]=function(){const _0x5513e0=_0x547046,_0x578564=this[_0x5513e0(0x24d)]();this[_0x5513e0(0x1f1)]=new Window_StealSnatch(_0x578564),this['_stealSnatchWindow'][_0x5513e0(0x1a9)](this['_helpWindow']),this['_stealSnatchWindow']['setHandler']('ok',this['onStealSnatchOk'][_0x5513e0(0x211)](this)),this[_0x5513e0(0x1f1)][_0x5513e0(0x1a0)](_0x5513e0(0x20e),this[_0x5513e0(0x207)][_0x5513e0(0x211)](this)),this['addWindow'](this['_stealSnatchWindow']);},VisuMZ['StealItems'][_0x547046(0x155)]=Scene_Battle[_0x547046(0x180)]['isAnyInputWindowActive'],Scene_Battle[_0x547046(0x180)][_0x547046(0x1ed)]=function(){const _0x19d70e=_0x547046;if(this[_0x19d70e(0x1f1)]&&this[_0x19d70e(0x1f1)][_0x19d70e(0x1b3)])return!![];return VisuMZ[_0x19d70e(0x1d4)][_0x19d70e(0x155)][_0x19d70e(0x25c)](this);},VisuMZ['StealItems'][_0x547046(0x193)]=Scene_Battle[_0x547046(0x180)][_0x547046(0x183)],Scene_Battle[_0x547046(0x180)][_0x547046(0x183)]=function(){const _0x3de9d8=_0x547046;VisuMZ[_0x3de9d8(0x1d4)]['Scene_Battle_hideSubInputWindows']['call'](this),this[_0x3de9d8(0x1f1)]&&(this[_0x3de9d8(0x1f1)][_0x3de9d8(0x233)](),this['_stealSnatchWindow'][_0x3de9d8(0x14c)]());},VisuMZ['StealItems'][_0x547046(0x19f)]=Scene_Battle['prototype'][_0x547046(0x259)],Scene_Battle['prototype'][_0x547046(0x259)]=function(){const _0x177a36=_0x547046,_0x3056bc=BattleManager['inputtingAction']();this['_stealSnatchWindow']&&_0x3056bc[_0x177a36(0x1f7)]()?this[_0x177a36(0x23a)]():VisuMZ[_0x177a36(0x1d4)]['Scene_Battle_onEnemyOk'][_0x177a36(0x25c)](this);},Scene_Battle[_0x547046(0x180)][_0x547046(0x23a)]=function(){const _0xd8ccf5=_0x547046,_0x44906a=$gameTroop[_0xd8ccf5(0x1dc)]()[this['_enemyWindow'][_0xd8ccf5(0x15f)]()],_0x5944f4=BattleManager[_0xd8ccf5(0x1ec)]();this['_stealSnatchWindow'][_0xd8ccf5(0x1b9)](_0x44906a,_0x5944f4),this[_0xd8ccf5(0x1f1)]['refresh'](),this['_stealSnatchWindow'][_0xd8ccf5(0x22d)](),this[_0xd8ccf5(0x1f1)][_0xd8ccf5(0x20b)]();},Scene_Battle[_0x547046(0x180)]['onStealSnatchOk']=function(){const _0x426ee8=_0x547046,_0xe9a24a=BattleManager['inputtingAction'](),_0x52f954=$gameTroop['members']()[this[_0x426ee8(0x1cb)]['enemyIndex']()],_0x3b4944=this[_0x426ee8(0x1f1)]['item']();_0xe9a24a[_0x426ee8(0x1b1)](_0x52f954,_0x3b4944),VisuMZ[_0x426ee8(0x1d4)][_0x426ee8(0x19f)]['call'](this);},Scene_Battle[_0x547046(0x180)][_0x547046(0x207)]=function(){const _0x25d3df=_0x547046;this['_stealSnatchWindow']['hide'](),this[_0x25d3df(0x1f1)][_0x25d3df(0x233)](),this[_0x25d3df(0x1cb)]['show'](),this['_enemyWindow'][_0x25d3df(0x20b)](),Imported[_0x25d3df(0x228)]&&this[_0x25d3df(0x1cb)]['autoSelect']();},Window_BattleLog[_0x547046(0x180)][_0x547046(0x22e)]=function(_0x3b3bc8){const _0x40f8e3=_0x547046;this[_0x40f8e3(0x22c)][_0x40f8e3(0x190)](_0x3b3bc8),this[_0x40f8e3(0x14f)]();};function Window_StealSnatch(){this['initialize'](...arguments);}Window_StealSnatch['prototype']=Object['create'](Window_ItemList['prototype']),Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1a1)]=Window_StealSnatch,Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1d5)]=function(_0x3735b2){const _0x53f7be=_0x547046;Window_ItemList[_0x53f7be(0x180)][_0x53f7be(0x1d5)][_0x53f7be(0x25c)](this,_0x3735b2),this['hide'](),this[_0x53f7be(0x1c4)]=null,this[_0x53f7be(0x1fe)]=null;},Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1b9)]=function(_0x58a59a,_0x3926c0){const _0x159071=_0x547046;this['_enemy']=_0x58a59a,this[_0x159071(0x1fe)]=_0x3926c0,this[_0x159071(0x14f)](),this[_0x159071(0x22d)](),this[_0x159071(0x22b)](0x0);},Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1ea)]=function(){const _0x447896=_0x547046;this[_0x447896(0x1b5)]=[];if(!this[_0x447896(0x1c4)])return;const _0xaac308=VisuMZ[_0x447896(0x1d4)][_0x447896(0x197)](this[_0x447896(0x1fe)],this[_0x447896(0x1c4)]);if(_0xaac308[_0x447896(0x204)][_0x447896(0x255)]<=0x0)return;this[_0x447896(0x1b5)]=this[_0x447896(0x1c4)]['getStealableItems']()['filter'](_0x251a61=>{const _0x5b98e6=_0x447896;return _0xaac308[_0x5b98e6(0x204)][_0x5b98e6(0x1d1)](_0x251a61['type']);}),Imported[_0x447896(0x253)]&&this[_0x447896(0x24f)]();},Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1af)]=function(_0x5be972){const _0x32d15e=_0x547046;return _0x5be972&&!_0x5be972[_0x32d15e(0x1f4)];},Window_StealSnatch[_0x547046(0x180)]['numberWidth']=function(){const _0x31cfbe=_0x547046;if(this['_numberWidth'])return this[_0x31cfbe(0x21e)];return this[_0x31cfbe(0x21e)]=this[_0x31cfbe(0x1f9)](_0x31cfbe(0x17d)),this[_0x31cfbe(0x21e)]=Math[_0x31cfbe(0x23d)](this[_0x31cfbe(0x21e)],this['textSizeEx'](TextManager[_0x31cfbe(0x220)])[_0x31cfbe(0x1e8)]),this[_0x31cfbe(0x21e)];},Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1e5)]=function(_0x864570,_0x3997cd,_0x88b71f,_0x39bf65){const _0x564469=_0x547046;if(!_0x864570)return;switch(_0x864570['type'][_0x564469(0x245)]()['trim']()){case _0x564469(0x151):const _0x5e02d=TextManager[_0x564469(0x16c)][_0x564469(0x184)]('\x5cI[%1]'[_0x564469(0x184)](ImageManager[_0x564469(0x1de)]),_0x864570['id'],TextManager[_0x564469(0x25a)]);this[_0x564469(0x160)](_0x5e02d,_0x3997cd,_0x88b71f);break;case'ITEM':Window_Base['prototype'][_0x564469(0x1e5)][_0x564469(0x25c)](this,$dataItems[_0x864570['id']],_0x3997cd,_0x88b71f,_0x39bf65);break;case _0x564469(0x213):Window_Base[_0x564469(0x180)][_0x564469(0x1e5)][_0x564469(0x25c)](this,$dataWeapons[_0x864570['id']],_0x3997cd,_0x88b71f,_0x39bf65);break;case'ARMOR':Window_Base[_0x564469(0x180)]['drawItemName'][_0x564469(0x25c)](this,$dataArmors[_0x864570['id']],_0x3997cd,_0x88b71f,_0x39bf65);break;}},Window_StealSnatch[_0x547046(0x180)]['drawItemNumber']=function(_0x2bc15f,_0x1a1703,_0x2772f6,_0x5c78c6){const _0x53e124=_0x547046;if(_0x2bc15f[_0x53e124(0x1f4)]){const _0x289d3d=TextManager[_0x53e124(0x220)];_0x1a1703+=_0x5c78c6-this[_0x53e124(0x17f)](_0x289d3d)['width'],this['drawTextEx'](_0x289d3d,_0x1a1703,_0x2772f6);}else{if(VisuMZ['StealItems']['Settings'][_0x53e124(0x261)][_0x53e124(0x1fc)]){const _0x1cd2e8=VisuMZ[_0x53e124(0x1d4)]['DetermineStealData'](this[_0x53e124(0x1fe)],this['_enemy']);let _0x35f8c1=_0x1cd2e8['rate'][_0x53e124(0x1cd)]*_0x2bc15f[_0x53e124(0x24c)],_0x1157bf=_0x1cd2e8[_0x53e124(0x182)][_0x53e124(0x1cd)];_0x35f8c1*=_0x1cd2e8[_0x53e124(0x24c)][_0x2bc15f['type'][_0x53e124(0x1d9)]()],_0x1157bf+=_0x1cd2e8['plus'][_0x2bc15f[_0x53e124(0x20f)][_0x53e124(0x1d9)]()];let _0x22ebd8=(_0x35f8c1+_0x1157bf)[_0x53e124(0x1a3)](0x0,0x1)*0x64;_0x22ebd8>0x0&&_0x22ebd8<0x64&&(_0x22ebd8=_0x22ebd8[_0x53e124(0x224)](0x2)),_0x22ebd8=String(_0x22ebd8)+'%',_0x1a1703+=_0x5c78c6-this[_0x53e124(0x17f)](_0x22ebd8)[_0x53e124(0x1e8)],this[_0x53e124(0x160)](_0x22ebd8,_0x1a1703,_0x2772f6);}}},Window_StealSnatch[_0x547046(0x180)][_0x547046(0x1c1)]=function(_0xfe57a6){const _0x56d719=_0x547046;if(this[_0x56d719(0x173)]&&_0xfe57a6)switch(_0xfe57a6[_0x56d719(0x20f)][_0x56d719(0x245)]()[_0x56d719(0x196)]()){case _0x56d719(0x151):this['_helpWindow'][_0x56d719(0x1cf)](TextManager[_0x56d719(0x1a8)]);break;case _0x56d719(0x221):this['_helpWindow'][_0x56d719(0x248)]($dataItems[_0xfe57a6['id']]);break;case'WEAPON':this[_0x56d719(0x173)][_0x56d719(0x248)]($dataWeapons[_0xfe57a6['id']]);break;case _0x56d719(0x18c):this[_0x56d719(0x173)][_0x56d719(0x248)]($dataArmors[_0xfe57a6['id']]);break;}};function _0x3d41(){const _0x42d76c=['gainGold','_stealSnatchWindow','checkCacheKey','createEnemyWindow','stolen','createStealSnatchWindow','Settings','isSnatchEffect','RegExp','textWidth','JSON','stealPlus','DisplaySuccess','processStealItemsNothing','_action','Skill-%1-%2','State-%1-%2','%1_volume','parameters','playSe','types','setupTextPopup','Game_Action_applyItemUserEffect','onStealSnatchCancel','SuccessTextColor','concat','FailurePopupText','activate','_armorIDs','AlreadyStolen','cancel','type','StealItem','bind','kind','WEAPON','JsStealRateGold','4235035RJUlNa','JsStealRateWeapon','Scene_Boot_onDatabaseLoaded','setupStealableItems','exit','setupIconTextPopup','ShuffleArray','makeDeepCopy','StealData','_numberWidth','Game_BattlerBase_refresh','snatchAlreadyStolen','ITEM','makeDropItems','ShowMessages','toFixed','Game_Enemy_gold','SuccessFlashColor','1426864HThJdv','VisuMZ_1_BattleCore','FUNC','none','forceSelect','_lines','show','addStealText','process_VisuMZ_StealItems','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','1458025ZPWrOn','index','deactivate','empty','_visualDrops','description','Popup','SuccessItemName','ARRAYJSON','startStealSnatchSelection','processStealItemsSuccessJS','startStealItemsUserEffect','max','JsStealRate','ARRAYFUNC','JsStealResist','ParseAllNotetags','_scene','stealResist','setupEnemyLevels','toUpperCase','createStealRate','processStealItemsNothingPopup','setItem','Sound','fail','getStealableItems','rate','itemWindowRect','applyItemUserEffect','adjustForFrontviewUi','Actor-%1-%2','StealableItemBatch','ParseItemNotetags','VisuMZ_3_FrontviewBattleUI','EVAL','length','status','params','processStealItemsFailureJS','onEnemyOk','currencyUnit','VisualGoldDisplay','call','needsSelection','_stealableItems','StealAction1','StealResist','Snatch','Parse_Notetags_JS','createStealRateJS','EmptyFlashDuration','hide','StealableItems','Item-%1-%2','refresh','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Rate\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','GOLD','Game_Enemy_makeDropItems','_itemIDs','processStealItemsFailurePopup','Scene_Battle_isAnyInputWindowActive','EquipDebuff','processStealItemsSuccessSFX','JsOnStealNothing','traitObjects','drop','_snatchItemIndex','%1_pitch','match','process_VisuMZ_StealItems_JS','enemyIndex','drawTextEx','_logWindow','subject','VisuMZ_4_ExtraEnemyDrops','weapon','ConvertParams','parse','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20gold\x20=\x20arguments[3];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','VisuMZ_3_VisualGoldDisplay','filter','indexOf','processStealItemsNothingSFX','snatchGoldNameFmt','processStealItemsSuccessLogWindow','1155393rBRlgc','getItemIdWithName','processStealItemsFailure','StealAction2','Auto','_helpWindow','GoldRate','_weaponIDs','name','336395mZGAAK','EmptyTextColor','isForOne','createOnStealJS','GoldRemoval','%1_name','88.88%','JsStealRateItem','textSizeEx','prototype','createKeyJS','plus','hideSubInputWindows','format','%1_pan','BattleLog','processStealItemsSuccessPopup','processStealItemsFailureLogWindow','StealEmpty','setup','_cache','ARMOR','StealGold','getWeaponIdWithName','JsOnStealSuccess','push','item','ARRAYSTR','Scene_Battle_hideSubInputWindows','AutoGold','FailureTextColor','trim','DetermineStealData','AutoItem','denominator','Scene_Battle_createEnemyWindow','EmptyPopupText','dropItems','NUM','JsStealRateArmor','Scene_Battle_onEnemyOk','setHandler','constructor','addParam','clamp','JsBonusSteal','StealableItemSingle','1931784bHditf','GoldHelp','snatchGoldHelpText','setHelpWindow','Game_Enemy_setupEnemyLevels','gainItem','map','processStealItemsNothingLogWindow','ParseSkillNotetags','isEnabled','Armor-%1-%2','registerSnatchTarget','6wHILJz','active','createStealResist','_data','FailureFlashColor','ItemRemoval','GoldIcon','setDetails','Gold','processStealItemsSuccess','processStealItemsSuccessEquipDebuff','JsOnStealFail','ItemRate','processStealItemsNothingJS','armor','setHelpWindowItem','STR','split','_enemy','getArmorIdWithName','4978416ovFPki','STRUCT','\x5cI[%1]','createStealPlus','ARRAYNUM','_enemyWindow','_snatchEnemyIndex','all','onDatabaseLoaded','setText','VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT','includes','note','makeSuccess','StealItems','initialize','ParseStealObject','GoldNameFmt','VisuMZ_3_EnemyLevels','toLowerCase','enemy','StealRate','members','getSnatchTarget','snatchGoldIcon','SuccessPopupText','Mechanics','random','stealRate','4paUEhq','VisuMZ_0_CoreEngine','drawItemName','processStealItemsAttempt','isEnemy','width','JsOnStealEmpty','makeItemList','processStealItemsFailureSFX','inputtingAction','isAnyInputWindowActive','gold','iconIndex'];_0x3d41=function(){return _0x42d76c;};return _0x3d41();}