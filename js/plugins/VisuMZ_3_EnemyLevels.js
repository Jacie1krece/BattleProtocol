//=============================================================================
// VisuStella MZ - Enemy Levels
// VisuMZ_3_EnemyLevels.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_EnemyLevels = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnemyLevel = VisuMZ.EnemyLevel || {};
VisuMZ.EnemyLevel.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [EnemyLevel]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enemy_Levels_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Enemies in RPG Maker MZ do not have levels by default, but instead are given
 * static parameters that do not change throughout the game. This plugin adds
 * the functionality to apply levels and level-based parameter changes to all
 * of your enemies, along with control over how their levels are handled.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assign levels to each enemy from exact values to dynamic values based on
 *   the party's levels, variables, etc.
 * * Level variance and and bonus modifiers to make enemies dynamically leveled
 *   even if they're in the same battle.
 * * Decide enemy levels based on the map the player is in.
 * * Have enemies use different images based on what level they are.
 * * Skill effects, item effects, and Plugin Commands that alter the levels
 *   of enemies mid-battle.
 * * Notetags to prevent certain skills from being used until the enemy reaches
 *   a specific level.
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
 * enemy.level
 *
 * - A new property, 'level' is defined for Game_Enemy and it used to determine
 * the enemy's current level. This allows you, the game dev, to use a.level or
 * b.level in damage formulas and other calculations.
 *
 * ---
 *
 * ============================================================================
 * Parameter Calculations
 * ============================================================================
 *
 * To understand how parameter calculations are made, refer to the formula
 * below for all base parameters, EXP, gold, and drop rate.
 *
 * ---
 *
 * base + (level * base * rate) + (level * flat)
 *
 * Where:
 * - 'base' is the original base value of the parameter found in the database.
 * - 'level' is the previous level of the enemy (minimum: 0).
 * - 'rate' is the rate of growth determined by notetags or Plugin Parameters.
 * - 'flat' is the flat growth value also determined by notetags/parameters.
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
 * === Setup Enemy Level Notetags ===
 *
 * These are the notetags that determine an enemy's level upon creation.
 *
 * ---
 *
 * <Show Level>
 * <Hide Level>
 *
 * - Used for: Enemy Notetags
 * - Lets you show or hide an enemy's level from their name.
 * - This will override the Plugin Parameters => General => Show Enemy Level?
 *   setting.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a static level of 'x' whenever it's created.
 * - Replace 'x' with a numeric value representing its level.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level: x to y>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a level between 'x' and 'y'  whenever the enemy
 *   is created.
 * - Replace 'x' and 'y' with a numeric values representing its level range.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level Variable: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a level represented by the value used inside
 *   Game Variable x.
 * - Replace 'x' with the ID of the Game Variable to reference its value.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level: Highest Actor Level>
 * <Level: Highest Party Level>
 *
 * <Level: Average Actor Level>
 * <Level: Average Party Level>
 *
 * <Level: Lowest Actor Level>
 * <Level: Lowest Party Level>
 *
 * - Used for: Enemy Notetags
 * - Sets the base level of this enemy equal to either (respectively:
 *   - The highest level of any actor in the player's party.
 *   - The highest level of any actor in the battling party.
 *   - The average level of any actor in the player's party.
 *   - The average level of any actor in the battling party.
 *   - The lowest level of any actor in the player's party.
 *   - The lowest level of any actor in the battling party.
 * - This will bypass the default level settings and ignore map levels.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Level Bonus: +x>
 * <Level Bonus: -x>
 *
 * - Used for: Enemy
 * - This will add/subtrack the base level decided using the above notetags
 *   with a specific value.
 * - Replace 'x' with a numeric value on how much to adjust the base level by.
 *
 * ---
 *
 * <Level Variance: x>
 *
 * - Used for: Enemy Notetags
 * - This can allow the level range for the enemy to be anywhere from 'x' less
 *   than the base to 'x' more than the base.
 * - Replace 'x' with a numeric value indicating how much level variance there
 *   is from the base level.
 *
 * ---
 *
 * <Positive Level Variance: x>
 * <Negative Level Variance: x>
 *
 * - Used for: Enemy Notetags
 * - This specifies the positive and negative level variances applied to the
 *   base level, specifying a change anywhere between the negative and positive
 *   modifiers to the base level.
 * - Replace 'x' with a numeric value indicating how much level variance there
 *   is from the base level (negatively or positively).
 *
 * ---
 *
 * <Minimum Level: x>
 * <Maximum Level: x>
 *
 * - Used for: Enemy Notetags
 * - These notetags determine the absolute lowest and absolute highest level
 *   the enemy can be after all other modifiers.
 * - Even if the bonus, variance, and manual level changes are applied, the
 *   enemy's level cannot be less than the minimum or larger than the maximum.
 * - Replace 'x' with numeric values representing the limits of the enemy's
 *   level ranges.
 *
 * ---
 *
 * === JavaScript Notetags: Setup Enemy Level ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine dynamic enemy level setup notetags.
 *
 * ---
 *
 * <JS Level: code>
 *
 * - Used for: Enemy Notetags
 * - Sets the enemy's level to a static level determined by code whenever
 *   it's created.
 * - Replace 'code' with JavaScript code to determine the enemy's base level.
 *
 * ---
 *
 * <JS Level Bonus: code>
 *
 * - Used for: Enemy Notetags
 * - This will add/subtrack the base level decided using the above notetags
 *   by a value determined by JavaScript code.
 * - Replace 'code' with JavaScript code to determine the level bonus.
 *
 * ---
 *
 * <JS Level Variance: code>
 *
 * - Used for: Enemy Notetags
 * - This can allow the level range for the enemy determined by JavaScript code
 *   as variance.
 * - Replace 'code' with JavaScript code to determine the level variance.
 *
 * ---
 *
 * <JS Positive Level Variance: code>
 * <JS Negative Level Variance: code>
 *
 * - Used for: Enemy Notetags
 * - This specifies the positive and negative level variances applied to the
 *   base level, specifying a change anywhere between the negative and positive
 *   modifiers to the base level.
 * - Replace 'code' with JavaScript code to determine the level variance.
 *
 * ---
 * 
 * === Enemy Appearance-Related Notetags ===
 * 
 * These notetags allow you to adjust how enemies look based on their level.
 * These settings will always start with level 1 being the default appearance
 * while changing appearances once they reach a specific level.
 * 
 * ---
 * 
 * <Level x Image: filename>
 *
 * - Used for: Enemy Notetags
 * - Once the enemy reaches level 'x' and above, its image will change to
 *   whatever 'filename' is used until it reaches the next appearance setting.
 * - Replace 'x' with a number representing the level required to reach.
 * - Replace 'filename' with the filename of the enemy in the img/enemies/
 *   and/or img/sv_enemies folder.
 * - Insert multiples of these notetags to give them different image settings
 *   throughout various levels.
 * - If multiple notetags are used, the settings will be arranged from lowest
 *   to highest, giving priority to the highest met level.
 * - If using VisuMZ_1_ElementStatusCore and the enemy uses a custom trait-
 *   related notetag that alters its battler, this notetag will be suppressed
 *   unless it's the original battler name being used.
 * 
 * ---
 * 
 * <Level Images>
 *  x: filename
 *  x: filename
 *  x: filename
 * </Level Images>
 *
 * - Used for: Enemy Notetags
 * - Once the enemy reaches level 'x' and above, its image will change to
 *   whatever 'filename' is used until it reaches the next appearance setting.
 * - Replace 'x' with a number representing the level required to reach.
 * - Replace 'filename' with the filename of the enemy in the img/enemies/
 *   and/or img/sv_enemies folder.
 * - Insert multiple lines of the 'x: filename' portion of the notetag to
 *   designate multiple settings.
 * - If multiple settings are used, the settings will be arranged from lowest
 *   to highest, giving priority to the highest met level.
 * - If using VisuMZ_1_ElementStatusCore and the enemy uses a custom trait-
 *   related notetag that alters its battler, this notetag will be suppressed
 *   unless it's the original battler name being used.
 * 
 * ---
 *
 * === Map Notetags that Determine Enemy Levels ===
 *
 * The following are notetags that are placed inside of a map's notebox to
 * determine the levels of enemies fought on that map. These notetags cannot
 * bypass the <Level: x> notetags but will take priority over the default
 * Plugin Parameter settings.
 *
 * ---
 *
 * <Enemy Level: x>
 *
 * - Used for: Map Notetags
 * - Sets the levels of the map's enemies to a static level of 'x' whenever
 *   they're created.
 * - Replace 'x' with a numeric value representing its level.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Enemy Level: x to y>
 *
 * - Used for: Map Notetags
 * - Sets the map's enemy levels to a level between 'x' and 'y'  whenever they
 *   are created.
 * - Replace 'x' and 'y' with a numeric values representing its level range.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * <Enemy Level: Highest Actor Level>
 * <Enemy Level: Highest Party Level>
 *
 * <Enemy Level: Average Actor Level>
 * <Enemy Level: Average Party Level>
 *
 * <Enemy Level: Lowest Actor Level>
 * <Enemy Level: Lowest Party Level>
 *
 * - Used for: Map Notetags
 * - Sets the base level of this map's levels equal to either (respectively:
 *   - The highest level of any actor in the player's party.
 *   - The highest level of any actor in the battling party.
 *   - The average level of any actor in the player's party.
 *   - The average level of any actor in the battling party.
 *   - The lowest level of any actor in the player's party.
 *   - The lowest level of any actor in the battling party.
 * - This will bypass the default level settings but cannot bypass any of the
 *   <Level: x> notetags.
 * - This is affected by the Level Bonus and Level Variance modifiers.
 *
 * ---
 *
 * === JavaScript Notetags: Map Notetags that Determine Enemy Levels ===
 *
 * The following are notetags made for users with JavaScript knowledge to make
 * map-related notetags that determine enemy levels. These notetags cannot
 * bypass the <Level: x> notetags but will take priority over the default
 * Plugin Parameter settings.
 *
 * ---
 *
 * <JS Enemy Level: code>
 *
 * - Used for: Map Notetags
 * - Sets the levels of the map enemies to a static level determined by code
 *   whenever it's created.
 * - Replace 'code' with JavaScript code to determine the enemy's base level.
 *
 * ---
 *
 * === Enemy Level Parameter Notetags ===
 *
 * The growth rate and flat growth amounts can be determined by default in
 * Plugin Parameters => Parameters Growth. However, if you wish for enemies to
 * have special or unique growth, use the following notetags.
 *
 * ---
 *
 * <Growth Rate Per Level>
 *  MaxHP: +x.x
 *  MaxMP: +x.x
 *  ATK: +x.x
 *  DEF: +x.x
 *  MAT: +x.x
 *  MDF: +x.x
 *  AGI: +x.x
 *  LUK: +x.x
 *  EXP: +x.x
 *  Gold: +x.x
 *  Drop: +x.x
 * </Growth Rate Per Level>
 *
 * - Used for: Enemy Notetags
 * - Changes the rate of growth per level for the enemy.
 * - Replace 'x.x' with a positive or negative value on how much to raise the
 *   parameter by for each level relative to the base value.
 *
 * ---
 *
 * <Growth Flat Per Level>
 *  MaxHP: +x.x
 *  MaxMP: +x.x
 *  ATK: +x.x
 *  DEF: +x.x
 *  MAT: +x.x
 *  MDF: +x.x
 *  AGI: +x.x
 *  LUK: +x.x
 *  EXP: +x.x
 *  Gold: +x.x
 *  Drop: +x.x
 * </Growth Flat Per Level>
 *
 * - Used for: Enemy Notetags
 * - Changes the flat growth value per level for the enemy.
 * - Replace 'x.x' with a positive or negative value on how much to raise the
 *   parameter by for each level as a flat value.
 *
 * ---
 *
 * <Static Level Parameters>
 *
 * - Used for: Enemy Notetags
 * - Insert this notetag if you do not wish for the growth modifiers to affect
 *   the enemy and just use the database's parameters as its current parameters
 *   no matter the level.
 *
 * ---
 * 
 * === Enemy Level Skill Requirement Notetags ===
 * 
 * ---
 * 
 * <Enemy Skill id Require Level: x>
 * <Enemy Skill name Require Level: x>
 *
 * - Used for: Enemy Notetags
 * - To make actions for enemies require specific levels, use the above notetag
 *   to define what level the enemy can use the identified skill at.
 * - Replace 'id' with the ID of the skill to assign a level to.
 * - Replace 'name' with the name of the skill to assign a level to.
 * - Insert multiples of this notetag to assign levels to multiple skills.
 * 
 * ---
 *
 * === Enemy Level Change Notetags ===
 *
 * These notetags affect mid-battle level changing effects for enemies.
 *
 * ---
 *
 * <Change Enemy Level: +x>
 * <Change Enemy Level: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the enemy's level by 'x' positively or negatively mid-battle.
 * - This will also alter the enemy's parameters.
 * - Replace 'x' with the amount to raise/drop the level by.
 *
 * ---
 *
 * <Reset Enemy Level>
 *
 * - Used for: Skill, Item Notetags
 * - Resets any level changes made to the enemy from the start of battle.
 *
 * ---
 *
 * <Resist Level Change>
 *
 * - Used for: Enemy, State Notetags
 * - Makes the affected enemy resist level changes.
 *
 * ---
 *
 * === JavaScript Notetags: Enemy Level Change ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * affect mid-battle level changing effects for enemies.
 *
 * ---
 *
 * <JS Change Enemy Level: code>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the enemy's level by a value determined by JavaScript code either
 *   positively or negatively mid-battle.
 * - This will also alter the enemy's parameters.
 * - Replace 'code' with JavaScript code to determine the amount to change the
 *   enemy's level by.
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
 * === Enemy-Related Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Level
 * - Change target enemy(ies) level by a value.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Level:
 *   - Changes level by this value.
 *   - You may use JavaScript code.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 *
 * Enemy: Reset Level
 * - Reset target enemy(ies) level to its original level.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 *
 * Enemy: Set Level
 * - Set target enemy(ies) level to a specific value.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   Level:
 *   - Sets level to this value.
 *   - You may use JavaScript code.
 *
 *   Bypass Resist?:
 *   - Bypasses <Resist Level Change> effect?
 *
 * ---
 * 
 * === Debug-Related Plugin Commands ===
 * 
 * ---
 *
 * DEBUG: View Level Stats
 * - View the stats of specific enemies for each level.
 * - This will appear in the Debug Console.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to view.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that pertain to enemy levels, letting you
 * adjust the defaults to how some mechanics work as well as the vocabulary
 * shown for the enemy levels.
 *
 * ---
 *
 * Levels
 * 
 *   Level Type:
 *   - Choose the default level type for all enemies.
 *     - Highest Actor Level
 *     - Highest Party Level
 *     - Average Actor Level
 *     - Average Party Level
 *     - Lowest Actor Level
 *     - Lowest Party Level
 *     - Variable x
 *     - Static x
 *   - Replace 'x' with a number if present.
 * 
 *   Minimum Level:
 *   - Default minimum level for enemies.
 * 
 *   Maximum Level:
 *   - Default maximum level for enemies.
 * 
 *   Negative Variance:
 *   - Default negative level variance.
 * 
 *   Positive Variance:
 *   - Default positive level variance.
 *
 * ---
 *
 * Mechanics
 * 
 *   Preserve HP/MP Rates?:
 *   - If level changing, preserve the enemy's HP/MP rates?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Show Enemy Level?:
 *   - Show enemy levels by default? Use the notetags <Show Level> and
 *     <Hide Level> to determine otherwise.
 * 
 *   Enemy Name Format:
 *   - Text format used for enemy names in battle.
 *   - %1 - Level, %2 - Enemy's Name
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Growth Settings
 * ============================================================================
 *
 * Determine how much growth for each parameter enemies gain by default. These
 * growth settings can be relative to the enemy's base value or increases at a
 * flat amount each level. The formula for each increase is the following:
 *
 *   base + (level * base * rate) + (level * flat)
 *
 * Where:
 * - 'base' is the original base value of the parameter found in the database.
 * - 'level' is the previous level of the enemy (minimum: 0).
 * - 'rate' is the rate of growth determined by notetags or Plugin Parameters.
 * - 'flat' is the flat growth value also determined by notetags/parameters.
 *
 * Build around that formula for the best results.
 *
 * ---
 *
 * MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK, EXP, Gold, Drop Rate
 * 
 *   Growth Rate:
 *   - Default rate of growth relative to parameter base value.
 * 
 *   Flat Growth:
 *   - Default flat growth amount based on level.
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
 * Version 1.06: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where this plugin would suppress Elements & Status Menu Core
 *    trait image properties.
 * * Documentation Update!
 * ** Added notes for <Level x Image: filename> and <Level Images>
 * *** If using VisuMZ_1_ElementStatusCore and the enemy uses a custom trait-
 *     related notetag that alters its battler, this notetag will be suppressed
 *     unless it's the original battler name being used.
 * 
 * Version 1.05: June 16, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.04: January 1, 2021
 * * Bug Fixes!
 * ** Average Actor/Party Levels should now work properly. Fix made by Yanfly.
 * 
 * Version 1.03: November 29, 2020
 * * Feature Update!
 * ** Minimum level can no longer go under 1 for calculation purposes. Change
 *    made by Arisu. Anything below is unintended usage.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Average Actor Level and Average Party Level will now calculate levels
 *    properly if there is only one actor in the party. Fix made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Documentation Update!
 * ** Added notetag information for <Enemy Skill id Require Level: x> which
 *    was previously left out by accident. Update made by Yanfly.
 *
 * Version 1.00 Official Release: October 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelChange
 * @text Enemy: Change Level
 * @desc Change target enemy(ies) level by a value.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg Level:eval
 * @text Level
 * @desc Changes level by this value.
 * You may use JavaScript code.
 * @default +1
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelReset
 * @text Enemy: Reset Level
 * @desc Reset target enemy(ies) level to its original level.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyLevelSet
 * @text Enemy: Set Level
 * @desc Set target enemy(ies) level to a specific value.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg Level:eval
 * @text Level
 * @desc Sets level to this value.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg BypassResist:eval
 * @text Bypass Resist?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypasses <Resist Level Change> effect?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugEnemyLevels
 * @text DEBUG: View Level Stats
 * @desc View the stats of specific enemies for each level.
 * This will appear in the Debug Console.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to view.
 * @default ["0"]
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
 * @param EnemyLevel
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding enemy levels.
 * @default {"Levels":"","DefaultLevelType:str":"Highest Actor Level","DefaultMinLevel:num":"1","DefaultMaxLevel:num":"99","DefaultNegLevelVariance:num":"2","DefaultPositiveVariance:num":"2","Mechanics":"","PreserveRates:eval":"true","Vocabulary":"","ShowEnemyLv:eval":"true","EnemyNameFmt:str":"Lv%1 %2"}
 *
 * @param Param:struct
 * @text Parameter Growth
 * @type struct<Param>
 * @desc The default parameter growth values for Enemy Levels.
 * @default {"MaxHP":"","MaxHP_Rate:num":"0.32","MaxHP_Flat:num":"0.00","MaxMP":"","MaxMP_Rate:num":"0.16","MaxMP_Flat:num":"0.00","ATK":"","ATK_Rate:num":"0.08","ATK_Flat:num":"0.00","DEF":"","DEF_Rate:num":"0.08","DEF_Flat:num":"0.00","MAT":"","MAT_Rate:num":"0.08","MAT_Flat:num":"0.00","MDF":"","MDF_Rate:num":"0.08","MDF_Flat:num":"0.00","AGI":"","AGI_Rate:num":"0.08","AGI_Flat:num":"0.00","LUK":"","LUK_Rate:num":"0.08","LUK_Flat:num":"0.00","EXP":"","EXP_Rate:num":"0.12","EXP_Flat:num":"0.00","Gold":"","Gold_Rate:num":"0.16","Gold_Flat:num":"0.00","Drop":"","Drop_Rate:num":"0.00","Drop_Flat:num":"0.008"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Levels
 *
 * @param DefaultLevelType:str
 * @text Level Type
 * @parent Levels
 * @type combo
 * @option Highest Actor Level
 * @option Highest Party Level
 * @option Average Actor Level
 * @option Average Party Level
 * @option Lowest Actor Level
 * @option Lowest Party Level
 * @option Variable x
 * @option Static x
 * @desc Choose the default level type for all enemies.
 * Replace 'x' with a number if present.
 * @default Highest Actor Level
 *
 * @param DefaultMinLevel:num
 * @text Minimum Level
 * @parent Levels
 * @desc Default minimum level for enemies.
 * @default 1
 *
 * @param DefaultMaxLevel:num
 * @text Maximum Level
 * @parent Levels
 * @desc Default maximum level for enemies.
 * @default 99
 *
 * @param DefaultNegLevelVariance:num
 * @text Negative Variance
 * @parent Levels
 * @desc Default negative level variance.
 * @default 2
 *
 * @param DefaultPositiveVariance:num
 * @text Positive Variance
 * @parent Levels
 * @desc Default positive level variance.
 * @default 2
 *
 * @param Mechanics
 *
 * @param PreserveRates:eval
 * @text Preserve HP/MP Rates?
 * @parent Mechanics
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If level changing, preserve the enemy's HP/MP rates?
 * @default true
 *
 * @param Vocabulary
 *
 * @param ShowEnemyLv:eval
 * @text Show Enemy Level?
 * @parent Vocabulary
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show enemy levels by default? Use the notetags
 * <Show Level> and <Hide Level> to determine otherwise.
 * @default true
 *
 * @param EnemyNameFmt:str
 * @text Enemy Name Format
 * @parent Vocabulary
 * @desc Text format used for enemy names in battle.
 * %1 - Level, %2 - Enemy's Name
 * @default Lv%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Growth Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 *
 * @param MaxHP_Rate:num
 * @text Growth Rate
 * @parent MaxHP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.32
 *
 * @param MaxHP_Flat:num
 * @text Flat Growth
 * @parent MaxHP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MaxMP
 *
 * @param MaxMP_Rate:num
 * @text Growth Rate
 * @parent MaxMP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.16
 *
 * @param MaxMP_Flat:num
 * @text Flat Growth
 * @parent MaxMP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param ATK
 *
 * @param ATK_Rate:num
 * @text Growth Rate
 * @parent ATK
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param ATK_Flat:num
 * @text Flat Growth
 * @parent ATK
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param DEF
 *
 * @param DEF_Rate:num
 * @text Growth Rate
 * @parent DEF
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param DEF_Flat:num
 * @text Flat Growth
 * @parent DEF
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MAT
 *
 * @param MAT_Rate:num
 * @text Growth Rate
 * @parent MAT
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param MAT_Flat:num
 * @text Flat Growth
 * @parent MAT
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param MDF
 *
 * @param MDF_Rate:num
 * @text Growth Rate
 * @parent MDF
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param MDF_Flat:num
 * @text Flat Growth
 * @parent MDF
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param AGI
 *
 * @param AGI_Rate:num
 * @text Growth Rate
 * @parent AGI
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param AGI_Flat:num
 * @text Flat Growth
 * @parent AGI
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param LUK
 *
 * @param LUK_Rate:num
 * @text Growth Rate
 * @parent LUK
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.08
 *
 * @param LUK_Flat:num
 * @text Flat Growth
 * @parent LUK
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param EXP
 *
 * @param EXP_Rate:num
 * @text Growth Rate
 * @parent EXP
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.12
 *
 * @param EXP_Flat:num
 * @text Flat Growth
 * @parent EXP
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param Gold
 *
 * @param Gold_Rate:num
 * @text Growth Rate
 * @parent Gold
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.16
 *
 * @param Gold_Flat:num
 * @text Flat Growth
 * @parent Gold
 * @desc Default flat growth amount based on level.
 * @default 0.00
 *
 * @param Drop
 *
 * @param Drop_Rate:num
 * @text Growth Rate
 * @parent Drop
 * @desc Default rate of growth relative to parameter base value.
 * @default 0.00
 *
 * @param Drop_Flat:num
 * @text Flat Growth
 * @parent Drop
 * @desc Default flat growth amount based on level.
 * @default 0.008
 *
 */
//=============================================================================

function _0x3e8f(){const _0x408625=['hasSetEnemyLevels','NUM','value','Weapon-%1-%2','createBaseLevel','setLevel','level','Drop_Rate','MDF_Rate','params','ATK','mpRate','isShowEnemyLevel','Game_Enemy_paramBase','_enemyLevelRequired_SkillID','battleMembers','maxLevel','_enemyLevelRequired_SkillName','Drop_Flat','Actor-%1-%2','getLevelType','_level','235SjOabB','match','ARRAYSTR','createJS','paramBase','applyItemUserEffect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','EnemyLevel','STRUCT','LUK_Flat','dropItemRate','exp','createKeyJS','createEnemyLevelParamGrowth','345516cjSwbO','EXP_Flat','GOLD','VisuMZ_0_CoreEngine','ShowEnemyLv','createOriginalLevel','General','Game_Enemy_gold','includes','DEF_Flat','battlerName','Item-%1-%2','parse','getLevel','EXP','Game_Action_applyItemUserEffect','AVERAGE\x20ACTOR\x20LEVEL','createLevel','map','ATK_Flat','AGI_Flat','EnemyNameFmt','jsLevel','defaultEnemyLevel','MaxHP_Flat','format','2594952SBjbHC','16hKTUOb','call','some','parseLevelImageNotetags','Enemy-%1-%2','setup','JSON','EVAL','image','AGI','ATK_Rate','isStaticLevelParameters','onDatabaseLoaded','max','isEnemy','Gold_Flat','ceil','PreserveRates','DefaultMinLevel','_levelBattlerName','668ZQKpGH','DebugEnemyLevels','applyItemUserEffectEnemyLevel','setupEnemyLevels','Game_Enemy_dropItemRate','transform','LUK_Rate','exit','Scene_Boot_onDatabaseLoaded','trim','DefaultMaxLevel','Game_Enemy_name','meetsSkillConditionsEnemyLevel','name','EnemyLevelReset','406RkAHsN','createEnemyLevelSkillRequirements','split','mmp','_levelImages','randomInt','State-%1-%2','floor','RegExp','gainLevel','dropItemRateApplyEnemyLevel','MAXHP','EXP_Rate','MAXMP','FUNC','meetsSkillConditions','Game_Enemy_battlerName','refresh','30zPBfoD','status','ARRAYEVAL','indexOf','goldApplyEnemyLevel','215809fRxaDZ','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','recoverAll','ARRAYJSON','Game_Enemy_transform','Game_BattlerBase_meetsSkillConditions','clamp','expApplyEnemyLevel','note','_levelMax','toUpperCase','createLevelBonus','_enemyLevel_GrowthRate','setMp','inBattle','ARRAYNUM','_levelMin','reduce','version','_originalLevel','DefaultPositiveVariance','LUK','gold','isPlaytest','paramBaseApplyEnemyLevel','Skill-%1-%2','resetLevel','concat','createLevelImages','remove','AVERAGE\x20PARTY\x20LEVEL','log','Settings','push','DROP','MAT_Rate','_enemyLevel_GrowthFlat','66368phcwLG','Enemies','description','HIGHEST\x20ACTOR\x20LEVEL','refreshLevelImages','DefaultLevelType','sort','enemyLevelNameFmt','7881LJYBzZ','registerCommand','drop','Gold_Rate','process_VisuMZ_EnemyLevel_JS','minLevel','MaxMP_Rate','MAT_Flat','enemyLevel','Class-%1-%2','BypassResist','572bhUAVc','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','min','defineProperty','clampLevel','createLevelModifiers','DEF','enemy','27372jSFstG','members','Game_Enemy_exp','return\x200','filter','Param','isResistLevelChange','process_VisuMZ_EnemyLevel_Notetags','round','table','MDF_Flat','HIGHEST\x20PARTY\x20LEVEL','\x27s\x20Base\x20Parameters\x20for\x20Each\x20Level','length','EnemyLevelSet','22760ApJYgk','prototype','ConvertParams'];_0x3e8f=function(){return _0x408625;};return _0x3e8f();}const _0x1498b3=_0x4e56;(function(_0x27a22f,_0x240f1){const _0x373359=_0x4e56,_0x2d85ba=_0x27a22f();while(!![]){try{const _0x3b780a=-parseInt(_0x373359(0x14a))/0x1*(-parseInt(_0x373359(0xeb))/0x2)+parseInt(_0x373359(0x152))/0x3*(parseInt(_0x373359(0xff))/0x4)+parseInt(_0x373359(0xc2))/0x5*(parseInt(_0x373359(0x165))/0x6)+-parseInt(_0x373359(0x10e))/0x7*(-parseInt(_0x373359(0xa9))/0x8)+parseInt(_0x373359(0xea))/0x9+parseInt(_0x373359(0x120))/0xa*(-parseInt(_0x373359(0x125))/0xb)+parseInt(_0x373359(0xd0))/0xc*(-parseInt(_0x373359(0x15d))/0xd);if(_0x3b780a===_0x240f1)break;else _0x2d85ba['push'](_0x2d85ba['shift']());}catch(_0x488f82){_0x2d85ba['push'](_0x2d85ba['shift']());}}}(_0x3e8f,0x4c168));function _0x4e56(_0x3d1c7d,_0x3349af){const _0x3e8f90=_0x3e8f();return _0x4e56=function(_0x4e56c1,_0x2b439a){_0x4e56c1=_0x4e56c1-0x9f;let _0x315dbf=_0x3e8f90[_0x4e56c1];return _0x315dbf;},_0x4e56(_0x3d1c7d,_0x3349af);}var label='EnemyLevel',tier=tier||0x0,dependencies=[_0x1498b3(0xd3)],pluginData=$plugins[_0x1498b3(0x169)](function(_0x394b2f){const _0xc80747=_0x1498b3;return _0x394b2f[_0xc80747(0x121)]&&_0x394b2f[_0xc80747(0x14c)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1498b3(0x145)]=VisuMZ[label][_0x1498b3(0x145)]||{},VisuMZ[_0x1498b3(0xab)]=function(_0x11f840,_0x1352f8){const _0xa48f15=_0x1498b3;for(const _0x1891fa in _0x1352f8){if(_0x1891fa['match'](/(.*):(.*)/i)){const _0x42b48a=String(RegExp['$1']),_0x34aaac=String(RegExp['$2'])['toUpperCase']()[_0xa48f15(0x108)]();let _0x49fb32,_0x1d6690,_0xa962e4;switch(_0x34aaac){case _0xa48f15(0xad):_0x49fb32=_0x1352f8[_0x1891fa]!==''?Number(_0x1352f8[_0x1891fa]):0x0;break;case _0xa48f15(0x134):_0x1d6690=_0x1352f8[_0x1891fa]!==''?JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa]):[],_0x49fb32=_0x1d6690[_0xa48f15(0xe2)](_0x2cf8e0=>Number(_0x2cf8e0));break;case _0xa48f15(0xf2):_0x49fb32=_0x1352f8[_0x1891fa]!==''?eval(_0x1352f8[_0x1891fa]):null;break;case _0xa48f15(0x122):_0x1d6690=_0x1352f8[_0x1891fa]!==''?JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa]):[],_0x49fb32=_0x1d6690['map'](_0x4b26ad=>eval(_0x4b26ad));break;case _0xa48f15(0xf1):_0x49fb32=_0x1352f8[_0x1891fa]!==''?JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa]):'';break;case _0xa48f15(0x128):_0x1d6690=_0x1352f8[_0x1891fa]!==''?JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa]):[],_0x49fb32=_0x1d6690[_0xa48f15(0xe2)](_0x739daa=>JSON['parse'](_0x739daa));break;case _0xa48f15(0x11c):_0x49fb32=_0x1352f8[_0x1891fa]!==''?new Function(JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa])):new Function(_0xa48f15(0x168));break;case'ARRAYFUNC':_0x1d6690=_0x1352f8[_0x1891fa]!==''?JSON['parse'](_0x1352f8[_0x1891fa]):[],_0x49fb32=_0x1d6690[_0xa48f15(0xe2)](_0x2fa5f1=>new Function(JSON['parse'](_0x2fa5f1)));break;case'STR':_0x49fb32=_0x1352f8[_0x1891fa]!==''?String(_0x1352f8[_0x1891fa]):'';break;case _0xa48f15(0xc4):_0x1d6690=_0x1352f8[_0x1891fa]!==''?JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa]):[],_0x49fb32=_0x1d6690[_0xa48f15(0xe2)](_0x27fef8=>String(_0x27fef8));break;case _0xa48f15(0xca):_0xa962e4=_0x1352f8[_0x1891fa]!==''?JSON['parse'](_0x1352f8[_0x1891fa]):{},_0x49fb32=VisuMZ[_0xa48f15(0xab)]({},_0xa962e4);break;case'ARRAYSTRUCT':_0x1d6690=_0x1352f8[_0x1891fa]!==''?JSON[_0xa48f15(0xdc)](_0x1352f8[_0x1891fa]):[],_0x49fb32=_0x1d6690[_0xa48f15(0xe2)](_0xffe643=>VisuMZ['ConvertParams']({},JSON[_0xa48f15(0xdc)](_0xffe643)));break;default:continue;}_0x11f840[_0x42b48a]=_0x49fb32;}}return _0x11f840;},(_0x3c1afd=>{const _0x1ffe05=_0x1498b3,_0x4a41f0=_0x3c1afd[_0x1ffe05(0x10c)];for(const _0x6b2010 of dependencies){if(!Imported[_0x6b2010]){alert(_0x1ffe05(0x126)[_0x1ffe05(0xe9)](_0x4a41f0,_0x6b2010)),SceneManager[_0x1ffe05(0x106)]();break;}}const _0x3996bd=_0x3c1afd['description'];if(_0x3996bd[_0x1ffe05(0xc3)](/\[Version[ ](.*?)\]/i)){const _0x5c4269=Number(RegExp['$1']);_0x5c4269!==VisuMZ[label][_0x1ffe05(0x137)]&&(alert(_0x1ffe05(0xc8)['format'](_0x4a41f0,_0x5c4269)),SceneManager[_0x1ffe05(0x106)]());}if(_0x3996bd['match'](/\[Tier[ ](\d+)\]/i)){const _0x22274f=Number(RegExp['$1']);_0x22274f<tier?(alert(_0x1ffe05(0x15e)[_0x1ffe05(0xe9)](_0x4a41f0,_0x22274f,tier)),SceneManager['exit']()):tier=Math[_0x1ffe05(0xf8)](_0x22274f,tier);}VisuMZ[_0x1ffe05(0xab)](VisuMZ[label][_0x1ffe05(0x145)],_0x3c1afd['parameters']);})(pluginData),PluginManager[_0x1498b3(0x153)](pluginData[_0x1498b3(0x10c)],'EnemyLevelChange',_0x4016eb=>{const _0x466025=_0x1498b3;if(!$gameParty['inBattle']())return;VisuMZ[_0x466025(0xab)](_0x4016eb,_0x4016eb);const _0x13c1bc=_0x4016eb['Enemies'][_0x466025(0xe2)](_0x32ee82=>$gameTroop['members']()[_0x32ee82])[_0x466025(0x142)](null),_0x3ad98b=_0x4016eb['Level'],_0x5e76f0=_0x4016eb[_0x466025(0x15c)];for(const _0x156a93 of _0x13c1bc){if(!_0x156a93)continue;if(!_0x5e76f0&&_0x156a93[_0x466025(0xa0)]())continue;_0x156a93[_0x466025(0x117)](_0x3ad98b);}}),PluginManager[_0x1498b3(0x153)](pluginData[_0x1498b3(0x10c)],_0x1498b3(0x10d),_0x100a50=>{const _0x129717=_0x1498b3;if(!$gameParty['inBattle']())return;VisuMZ[_0x129717(0xab)](_0x100a50,_0x100a50);const _0x258b52=_0x100a50[_0x129717(0x14b)][_0x129717(0xe2)](_0x13caaa=>$gameTroop[_0x129717(0x166)]()[_0x13caaa])[_0x129717(0x142)](null),_0x32240c=_0x100a50[_0x129717(0x15c)];for(const _0x30dc12 of _0x258b52){if(!_0x30dc12)continue;if(!_0x32240c&&_0x30dc12[_0x129717(0xa0)]())continue;_0x30dc12[_0x129717(0x13f)]();}}),PluginManager[_0x1498b3(0x153)](pluginData['name'],_0x1498b3(0xa8),_0x41f100=>{const _0x112c31=_0x1498b3;if(!$gameParty[_0x112c31(0x133)]())return;VisuMZ[_0x112c31(0xab)](_0x41f100,_0x41f100);const _0x1120a5=_0x41f100[_0x112c31(0x14b)][_0x112c31(0xe2)](_0x13cdc0=>$gameTroop['members']()[_0x13cdc0])[_0x112c31(0x142)](null),_0x288652=_0x41f100['Level'],_0x1f5bd6=_0x41f100[_0x112c31(0x15c)];for(const _0x10569c of _0x1120a5){if(!_0x10569c)continue;if(!_0x1f5bd6&&_0x10569c['isResistLevelChange']())continue;_0x10569c[_0x112c31(0xb1)](_0x288652);}}),PluginManager[_0x1498b3(0x153)](pluginData['name'],_0x1498b3(0x100),_0x346499=>{const _0x51672f=_0x1498b3;if(!$gameParty[_0x51672f(0x133)]())return;if(!$gameTemp[_0x51672f(0x13c)]())return;VisuMZ[_0x51672f(0xab)](_0x346499,_0x346499);const _0x3f3260=_0x346499[_0x51672f(0x14b)][_0x51672f(0xe2)](_0x2d5c1b=>$gameTroop[_0x51672f(0x166)]()[_0x2d5c1b])[_0x51672f(0x142)](null);for(const _0x3efb76 of _0x3f3260){if(!_0x3efb76)continue;const _0x5136b0=[];for(let _0x15c88f=_0x3efb76[_0x51672f(0x157)]();_0x15c88f<=_0x3efb76[_0x51672f(0xbc)]();_0x15c88f++){const _0x38f9bf=_0x3efb76[_0x51672f(0x164)](),_0x3767f7=_0x15c88f-0x1,_0x1b4425={'MaxHP':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x13d)](0x0,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x0])),'MaxMP':Math['round'](_0x3efb76[_0x51672f(0x13d)](0x1,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x1])),'ATK':Math[_0x51672f(0xa2)](_0x3efb76['paramBaseApplyEnemyLevel'](0x2,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x2])),'DEF':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x13d)](0x3,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x3])),'MAT':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x13d)](0x4,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x4])),'MDF':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x13d)](0x5,_0x3767f7,_0x38f9bf['params'][0x5])),'AGI':Math[_0x51672f(0xa2)](_0x3efb76['paramBaseApplyEnemyLevel'](0x6,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x6])),'LUK':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x13d)](0x7,_0x3767f7,_0x38f9bf[_0x51672f(0xb5)][0x7])),'Exp':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x12c)](_0x38f9bf['exp'],_0x3767f7)),'Gold':Math['round'](_0x3efb76['goldApplyEnemyLevel'](_0x38f9bf[_0x51672f(0x13b)],_0x3767f7)),'Drop':Math[_0x51672f(0xa2)](_0x3efb76[_0x51672f(0x118)](0x1,_0x3767f7)*0x64)+'%'};_0x5136b0[_0x15c88f]=_0x1b4425;}console[_0x51672f(0x144)](_0x3efb76['name']()+_0x51672f(0xa6)),console[_0x51672f(0xa3)](_0x5136b0);}}),VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0x116)]={'jsLevel':/<JS LEVEL: (.*)>/i},VisuMZ[_0x1498b3(0xc9)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1498b3(0xaa)][_0x1498b3(0xf7)],Scene_Boot[_0x1498b3(0xaa)][_0x1498b3(0xf7)]=function(){const _0x8710ed=_0x1498b3;VisuMZ[_0x8710ed(0xc9)][_0x8710ed(0x107)][_0x8710ed(0xec)](this),this['process_VisuMZ_EnemyLevel_Notetags']();},Scene_Boot[_0x1498b3(0xaa)][_0x1498b3(0xa1)]=function(){const _0x1ca6c1=_0x1498b3;this[_0x1ca6c1(0x156)]();},VisuMZ[_0x1498b3(0xc9)]['JS']={},Scene_Boot['prototype']['process_VisuMZ_EnemyLevel_JS']=function(){const _0xdad197=_0x1498b3,_0xe7e822=$dataActors[_0xdad197(0x140)]($dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x2f05f4 of _0xe7e822){if(!_0x2f05f4)continue;const _0x45b33b=_0xdad197(0xe6),_0x14e767=VisuMZ[_0xdad197(0xc9)]['RegExp'][_0xdad197(0xe6)];VisuMZ[_0xdad197(0xc9)][_0xdad197(0xc5)](_0x2f05f4,_0x45b33b,_0x14e767);}},VisuMZ['EnemyLevel'][_0x1498b3(0xc5)]=function(_0x38853c,_0x38d693,_0x5ab7df){const _0xcda04b=_0x1498b3,_0x4e1104=_0x38853c[_0xcda04b(0x12d)];if(_0x4e1104[_0xcda04b(0xc3)](_0x5ab7df)){const _0x5061f9=String(RegExp['$1']),_0xf4a6d0='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x201;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0xcda04b(0xe9)](_0x5061f9),_0x48a507=VisuMZ[_0xcda04b(0xc9)][_0xcda04b(0xce)](_0x38853c,_0x38d693);VisuMZ['EnemyLevel']['JS'][_0x48a507]=new Function(_0xf4a6d0);}},VisuMZ[_0x1498b3(0xc9)]['createKeyJS']=function(_0x5288f8,_0x21049f){const _0x17097a=_0x1498b3;if(VisuMZ[_0x17097a(0xce)])return VisuMZ[_0x17097a(0xce)](_0x5288f8,_0x21049f);let _0x2b6d43='';if($dataActors[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0xbf)[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);if($dataClasses[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0x15b)[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);if($dataSkills[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0x13e)[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);if($dataItems[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0xdb)[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);if($dataWeapons[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0xaf)[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);if($dataArmors[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43='Armor-%1-%2'[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);if($dataEnemies[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0xef)['format'](_0x5288f8['id'],_0x21049f);if($dataStates[_0x17097a(0xd8)](_0x5288f8))_0x2b6d43=_0x17097a(0x114)[_0x17097a(0xe9)](_0x5288f8['id'],_0x21049f);return _0x2b6d43;},TextManager[_0x1498b3(0x151)]=VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0x145)]['General'][_0x1498b3(0xe5)],VisuMZ[_0x1498b3(0xc9)]['Game_Action_applyItemUserEffect']=Game_Action[_0x1498b3(0xaa)][_0x1498b3(0xc7)],Game_Action[_0x1498b3(0xaa)]['applyItemUserEffect']=function(_0x3148c1){const _0x4491e1=_0x1498b3;VisuMZ['EnemyLevel'][_0x4491e1(0xdf)]['call'](this,_0x3148c1),this[_0x4491e1(0x101)](_0x3148c1);},Game_Action[_0x1498b3(0xaa)][_0x1498b3(0x101)]=function(_0x114120){const _0x52534f=_0x1498b3;if(!_0x114120)return;if(!_0x114120[_0x52534f(0xf9)]())return;if(_0x114120[_0x52534f(0xa0)]())return;const _0x3892ec=this['item']()[_0x52534f(0x12d)];if(_0x3892ec[_0x52534f(0xc3)](/<CHANGE ENEMY LEVEL: ([\+\-]\d+)>/i))_0x114120[_0x52534f(0x117)](Number(RegExp['$1']));else{if(_0x3892ec[_0x52534f(0xc3)](/<JS CHANGE ENEMY LEVEL: (.*)>/i))try{_0x114120[_0x52534f(0x117)](eval(RegExp['$1'])||0x0);}catch(_0x58fa60){if($gameTemp[_0x52534f(0x13c)]())console['log'](_0x58fa60);}}_0x3892ec[_0x52534f(0xc3)](/<RESET ENEMY LEVEL>/i)&&_0x114120[_0x52534f(0x13f)]();},VisuMZ[_0x1498b3(0xc9)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x1498b3(0xaa)][_0x1498b3(0x11d)],Game_BattlerBase[_0x1498b3(0xaa)][_0x1498b3(0x11d)]=function(_0x2890c2){const _0x2e5c0b=_0x1498b3;return this[_0x2e5c0b(0x10b)](_0x2890c2)&&VisuMZ[_0x2e5c0b(0xc9)][_0x2e5c0b(0x12a)]['call'](this,_0x2890c2);},Game_BattlerBase[_0x1498b3(0xaa)][_0x1498b3(0x10b)]=function(_0x2a8d10){return!![];},Object[_0x1498b3(0x160)](Game_Enemy[_0x1498b3(0xaa)],_0x1498b3(0xb2),{'get':function(){const _0x39b306=_0x1498b3;return this[_0x39b306(0xdd)]();},'configurable':!![]}),Game_Enemy[_0x1498b3(0xaa)]['getLevel']=function(){const _0x2b4303=_0x1498b3;return this[_0x2b4303(0xc1)]=this[_0x2b4303(0xc1)]||this[_0x2b4303(0xe1)](),this['clampLevel']();},VisuMZ['EnemyLevel']['Game_Enemy_setup']=Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xf0)],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xf0)]=function(_0x2168bf,_0x371eea,_0x309534){const _0xbd6305=_0x1498b3;VisuMZ[_0xbd6305(0xc9)]['Game_Enemy_setup'][_0xbd6305(0xec)](this,_0x2168bf,_0x371eea,_0x309534),this[_0xbd6305(0x102)]();},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x102)]=function(){const _0x97de60=_0x1498b3;this[_0x97de60(0xe1)](),this[_0x97de60(0x141)](),this[_0x97de60(0xcf)](![]),this[_0x97de60(0x10f)](![]),this[_0x97de60(0x11f)](),this[_0x97de60(0x127)]();},Game_Enemy[_0x1498b3(0xaa)]['createLevel']=function(){const _0x250e32=_0x1498b3;this[_0x250e32(0xb0)](),this['createLevelBonus'](),this['createLevelModifiers'](),this['createOriginalLevel']();},Game_Enemy['prototype'][_0x1498b3(0xb0)]=function(){const _0x25fa6=_0x1498b3,_0x52c874=this[_0x25fa6(0x164)]()['note'];this[_0x25fa6(0xc1)]=this[_0x25fa6(0xe7)]();const _0x24bac0=VisuMZ[_0x25fa6(0xc9)][_0x25fa6(0xce)](this[_0x25fa6(0x164)](),'jsLevel');if(_0x52c874[_0x25fa6(0xc3)](/<LEVEL: (\d+)>/i))this['_level']=Number(RegExp['$1'])||0x1;else{if(_0x52c874['match'](/<LEVEL: (\d+) TO (\d+)>/i)){const _0x24cbe7=Number(RegExp['$1']),_0x1aa0eb=Number(RegExp['$2']),_0x3eb49e=Math[_0x25fa6(0x15f)](_0x24cbe7,_0x1aa0eb),_0x20e4f0=Math['max'](_0x24cbe7,_0x1aa0eb);this[_0x25fa6(0xc1)]=Math['floor'](_0x3eb49e+Math[_0x25fa6(0x113)](_0x20e4f0-_0x3eb49e+0x1));}else{if(_0x52c874[_0x25fa6(0xc3)](/LEVEL VARIABLE: (\d+)/i))this['_level']=$gameVariables[_0x25fa6(0xae)](Number(RegExp['$1'])||0x1);else{if(_0x52c874[_0x25fa6(0xc3)](/<LEVEL: (.*)>/i)){const _0x5d5dde=String(RegExp['$1'])['toUpperCase']()['trim']();this[_0x25fa6(0xc1)]=$gameParty[_0x25fa6(0xc0)](_0x5d5dde)||0x1;}else{if(VisuMZ[_0x25fa6(0xc9)]['JS'][_0x24bac0])this[_0x25fa6(0xc1)]=Math[_0x25fa6(0x115)](VisuMZ[_0x25fa6(0xc9)]['JS'][_0x24bac0][_0x25fa6(0xec)](this,this,this))||0x1;else $gameMap&&$gameMap[_0x25fa6(0xac)]()&&(this[_0x25fa6(0xc1)]=$gameMap[_0x25fa6(0x15a)]());}}}}},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xe7)]=function(){const _0x559e67=_0x1498b3,_0x1b42d7=VisuMZ[_0x559e67(0xc9)][_0x559e67(0x145)]['General'][_0x559e67(0x14f)][_0x559e67(0x12f)]()[_0x559e67(0x108)]();if(_0x1b42d7[_0x559e67(0xc3)](/STATIC (\d+)/i))return Number(RegExp['$1'])||0x1;else{if(_0x1b42d7['match'](/VARIABLE (\d+)/i))return $gameVariables['value'](Number(RegExp['$1'])||0x1);else return _0x1b42d7[_0x559e67(0xc3)](/(ACTOR|PARTY) LEVEL/i)?$gameParty[_0x559e67(0xc0)](_0x1b42d7):0x1;}},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x130)]=function(){const _0x19caa0=_0x1498b3,_0x322539=this[_0x19caa0(0x164)]()[_0x19caa0(0x12d)];if(_0x322539['match'](/<LEVEL BONUS: ([\+\-]\d+)>/i))this['_level']+=Number(RegExp['$1']);else{if(_0x322539[_0x19caa0(0xc3)](/<JS LEVEL BONUS: (.*)>/i))try{this[_0x19caa0(0xc1)]+=Math['floor'](Number(eval(RegExp['$1'])||0x0));}catch(_0x831dc9){if($gameTemp[_0x19caa0(0x13c)]())console[_0x19caa0(0x144)](_0x831dc9);}}},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x162)]=function(){const _0x21f674=_0x1498b3;let _0x52fe=VisuMZ['EnemyLevel']['Settings'][_0x21f674(0xd6)]['DefaultNegLevelVariance']*-0x1,_0x52f605=VisuMZ[_0x21f674(0xc9)][_0x21f674(0x145)]['General'][_0x21f674(0x139)];const _0x4e49ef=this[_0x21f674(0x164)]()[_0x21f674(0x12d)];if(_0x4e49ef[_0x21f674(0xc3)](/<LEVEL VARIANCE: (\d+)>/i))_0x52fe=-0x1*Number(RegExp['$1']),_0x52f605=Number(RegExp['$1']);else{if(_0x4e49ef[_0x21f674(0xc3)](/<JS LEVEL VARIANCE: (.*)>/i)){let _0x20c0ab=0x0;try{_0x20c0ab=Math['floor'](eval(RegExp['$1'])||0x0);}catch(_0x785543){if($gameTemp['isPlaytest']())console[_0x21f674(0x144)](_0x785543);}_0x52fe=-0x1*_0x20c0ab,_0x52f605=_0x20c0ab;}}if(_0x4e49ef['match'](/<NEGATIVE LEVEL VARIANCE: (\d+)>/i))_0x52fe=-0x1*Number(RegExp['$1']);else{if(_0x4e49ef[_0x21f674(0xc3)](/<JS NEGATIVE LEVEL VARIANCE: (.*)>/i))try{_0x52fe=-0x1*Math[_0x21f674(0x115)](eval(RegExp['$1'])||0x0);}catch(_0x271e7b){if($gameTemp[_0x21f674(0x13c)]())console[_0x21f674(0x144)](_0x271e7b);}}if(_0x4e49ef['match'](/<POSITIVE LEVEL VARIANCE: (\d+)>/i))_0x52f605=Number(RegExp['$1']);else{if(_0x4e49ef[_0x21f674(0xc3)](/<JS POSITIVE LEVEL VARIANCE: (.*)>/i))try{_0x52f605=Math[_0x21f674(0x115)](eval(RegExp['$1'])||0x0);}catch(_0x5517b5){if($gameTemp[_0x21f674(0x13c)]())console[_0x21f674(0x144)](_0x5517b5);}}if(_0x52fe>_0x52f605)_0x52f605=_0x52fe;this['_level']+=Math[_0x21f674(0x115)](_0x52fe+Math[_0x21f674(0x113)](_0x52f605-_0x52fe+0x1));},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xd5)]=function(){const _0x1ae23a=_0x1498b3;this[_0x1ae23a(0x138)]=this['_level'];},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x13f)]=function(){const _0x2c62aa=_0x1498b3;this[_0x2c62aa(0xb1)](this[_0x2c62aa(0x138)]);},Game_Enemy[_0x1498b3(0xaa)]['clampLevel']=function(){const _0x19a2d3=_0x1498b3;if(this[_0x19a2d3(0xc1)]===undefined)this[_0x19a2d3(0xe1)]();return this['_level']=this[_0x19a2d3(0xc1)][_0x19a2d3(0x12b)](this[_0x19a2d3(0x157)](),this[_0x19a2d3(0xbc)]()),this['_level'];},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x157)]=function(){const _0x23a89d=_0x1498b3;if(this[_0x23a89d(0x135)]!==undefined)return this[_0x23a89d(0x135)];const _0x5a0e3b=this[_0x23a89d(0x164)]()[_0x23a89d(0x12d)],_0x42acad=this;this[_0x23a89d(0x135)]=VisuMZ[_0x23a89d(0xc9)]['Settings'][_0x23a89d(0xd6)][_0x23a89d(0xfd)];if(_0x5a0e3b[_0x23a89d(0xc3)](/<MINIMUM LEVEL: (\d+)>/i))this[_0x23a89d(0x135)]=Number(RegExp['$1'])||0x1;else{if(_0x5a0e3b[_0x23a89d(0xc3)](/<JS MINIMUM LEVEL: (.*)>/i))try{this[_0x23a89d(0x135)]=Math[_0x23a89d(0x115)](eval(RegExp['$1'])||0x1);}catch(_0x36e4ea){if($gameTemp['isPlaytest']())console[_0x23a89d(0x144)](_0x36e4ea);}}return this[_0x23a89d(0x135)]=Math[_0x23a89d(0xf8)](0x1,this[_0x23a89d(0x135)]),this[_0x23a89d(0x135)];},Game_Enemy['prototype'][_0x1498b3(0xbc)]=function(){const _0x151ed2=_0x1498b3;if(this['_levelMax']!==undefined)return this[_0x151ed2(0x12e)];const _0x1565e2=this[_0x151ed2(0x164)]()[_0x151ed2(0x12d)],_0x3d2c38=this;this[_0x151ed2(0x12e)]=VisuMZ[_0x151ed2(0xc9)]['Settings'][_0x151ed2(0xd6)][_0x151ed2(0x109)];if(_0x1565e2['match'](/<MAXIMUM LEVEL: (\d+)>/i))this[_0x151ed2(0x12e)]=Number(RegExp['$1'])||0x1;else{if(_0x1565e2['match'](/<JS MAXIMUM LEVEL: (.*)>/i))try{this['_levelMax']=Math[_0x151ed2(0x115)](eval(RegExp['$1'])||0x1);}catch(_0x5add91){if($gameTemp[_0x151ed2(0x13c)]())console[_0x151ed2(0x144)](_0x5add91);}}return this['_levelMax'];},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xb1)]=function(_0x471408){const _0x35d969=_0x1498b3;if(this[_0x35d969(0xc1)]===undefined)this[_0x35d969(0xe1)]();const _0x579971=this['hpRate'](),_0x28b508=this[_0x35d969(0xb7)]();this[_0x35d969(0xc1)]=_0x471408,this[_0x35d969(0x161)](),this[_0x35d969(0x14e)](),VisuMZ[_0x35d969(0xc9)][_0x35d969(0x145)][_0x35d969(0xd6)][_0x35d969(0xfc)]?(this['setHp'](Math[_0x35d969(0xfb)](this['mhp']*_0x579971)),this[_0x35d969(0x132)](Math[_0x35d969(0xfb)](this[_0x35d969(0x111)]*_0x28b508))):this['refresh']();},Game_Enemy['prototype'][_0x1498b3(0x117)]=function(_0x2d0c14){const _0x17d0bc=_0x1498b3;if(this['_level']===undefined)this[_0x17d0bc(0xe1)]();this['setLevel'](this[_0x17d0bc(0xc1)]+_0x2d0c14);},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xa0)]=function(){const _0x31314e=_0x1498b3;return this['traitObjects']()[_0x31314e(0xed)](_0x2ae064=>_0x2ae064&&_0x2ae064[_0x31314e(0x12d)]['match'](/<RESIST LEVEL CHANGE>/i));},VisuMZ[_0x1498b3(0xc9)]['Game_Enemy_name']=Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x10c)],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x10c)]=function(){const _0x3dbe0a=_0x1498b3,_0x1a2b77=VisuMZ[_0x3dbe0a(0xc9)][_0x3dbe0a(0x10a)][_0x3dbe0a(0xec)](this);if(!this['isShowEnemyLevel']())return _0x1a2b77;return TextManager[_0x3dbe0a(0x151)][_0x3dbe0a(0xe9)](this[_0x3dbe0a(0xb2)],_0x1a2b77);},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xb8)]=function(){const _0xb047f1=_0x1498b3,_0x4c38e8=this['enemy']()[_0xb047f1(0x12d)];if(_0x4c38e8['match'](/<SHOW LEVEL>/i))return!![];else return _0x4c38e8[_0xb047f1(0xc3)](/<HIDE LEVEL>/i)?![]:VisuMZ[_0xb047f1(0xc9)][_0xb047f1(0x145)][_0xb047f1(0xd6)][_0xb047f1(0xd4)];},Game_Enemy[_0x1498b3(0xaa)]['isStaticLevelParameters']=function(){const _0x1e58ad=_0x1498b3;return this[_0x1e58ad(0x164)]()&&this[_0x1e58ad(0x164)]()[_0x1e58ad(0x12d)][_0x1e58ad(0xc3)](/<STATIC LEVEL PARAMETERS>/i);},VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0xb9)]=Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xc6)],Game_Enemy[_0x1498b3(0xaa)]['paramBase']=function(_0x42efed){const _0x1e6baa=_0x1498b3,_0x528edf=VisuMZ[_0x1e6baa(0xc9)][_0x1e6baa(0xb9)]['call'](this,_0x42efed),_0x2ae969=this['otherParamBaseModifiers'](),_0x56ed17=this[_0x1e6baa(0xb2)]-0x1;return this[_0x1e6baa(0x13d)](_0x42efed,_0x56ed17,_0x528edf+_0x2ae969);},Game_Enemy['prototype']['otherParamBaseModifiers']=function(_0x5e5add){return 0x0;},Game_Enemy['prototype'][_0x1498b3(0x141)]=function(){const _0x26b423=_0x1498b3;this['_levelImages']=[{'level':0x1,'image':this[_0x26b423(0x164)]()[_0x26b423(0xda)]}],this[_0x26b423(0xee)](),this['_levelImages'][_0x26b423(0x150)]((_0x9674c2,_0x328ae6)=>_0x9674c2[_0x26b423(0xb2)]-_0x328ae6[_0x26b423(0xb2)]),this['refreshLevelImages']();},Game_Enemy[_0x1498b3(0xaa)]['parseLevelImageNotetags']=function(){const _0x4a35a7=_0x1498b3,_0x47c36a=this['enemy']()[_0x4a35a7(0x12d)],_0x23acbe=_0x47c36a['match'](/<LEVEL[ ](\d+)[ ]IMAGE:[ ](.*)>/gi);if(_0x23acbe)for(const _0xe56e68 of _0x23acbe){if(!_0xe56e68)continue;_0xe56e68[_0x4a35a7(0xc3)](/<LEVEL[ ](\d+)[ ]IMAGE:[ ](.*)>/i);const _0x32a9f4=Number(RegExp['$1'])||0x1,_0x2ca193=String(RegExp['$2']);this['_levelImages'][_0x4a35a7(0x146)]({'level':_0x32a9f4,'image':_0x2ca193});}if(_0x47c36a['match'](/<LEVEL (?:IMAGE|IMAGES)>\s*([\s\S]*)\s*<\/LEVEL (?:IMAGE|IMAGES)>/i)){const _0x44e1a5=String(RegExp['$1'])[_0x4a35a7(0x110)](/[\r\n]+/);for(const _0x4ada08 of _0x44e1a5){if(!_0x4ada08)continue;if(_0x4ada08[_0x4a35a7(0xc3)](/(\d+):[ ](.*)/i)){const _0x1aab7c=Number(RegExp['$1'])||0x1,_0x4ae904=String(RegExp['$2']);this[_0x4a35a7(0x112)]['push']({'level':_0x1aab7c,'image':_0x4ae904});}}}},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x14e)]=function(){const _0xb9eae=_0x1498b3;this[_0xb9eae(0xfe)]=this['enemy']()[_0xb9eae(0xda)];for(const _0x3a6615 of this[_0xb9eae(0x112)]){if(!_0x3a6615)continue;this['_level']>=_0x3a6615['level']&&(this[_0xb9eae(0xfe)]=_0x3a6615[_0xb9eae(0xf3)]);}},VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0x11e)]=Game_Enemy['prototype'][_0x1498b3(0xda)],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xda)]=function(){const _0x7bbb70=_0x1498b3;if(this['_specialBattler']!==undefined&&this['_specialBattler']['name']!==this[_0x7bbb70(0x164)]()[_0x7bbb70(0xda)]){return VisuMZ['EnemyLevel'][_0x7bbb70(0x11e)][_0x7bbb70(0xec)](this);;}return this[_0x7bbb70(0xfe)]||VisuMZ[_0x7bbb70(0xc9)][_0x7bbb70(0x11e)][_0x7bbb70(0xec)](this);},Game_Enemy[_0x1498b3(0xaa)]['createEnemyLevelParamGrowth']=function(_0x1cf688){const _0x2b4848=_0x1498b3;if(_0x1cf688&&this[_0x2b4848(0x131)]&&this[_0x2b4848(0x149)])return;const _0x1b9c7e=VisuMZ[_0x2b4848(0xc9)][_0x2b4848(0x145)][_0x2b4848(0x9f)];this[_0x2b4848(0x131)]={0x0:_0x1b9c7e['MaxHP_Rate'],0x1:_0x1b9c7e[_0x2b4848(0x158)],0x2:_0x1b9c7e[_0x2b4848(0xf5)],0x3:_0x1b9c7e['DEF_Rate'],0x4:_0x1b9c7e[_0x2b4848(0x148)],0x5:_0x1b9c7e[_0x2b4848(0xb4)],0x6:_0x1b9c7e['AGI_Rate'],0x7:_0x1b9c7e[_0x2b4848(0x105)],'exp':_0x1b9c7e[_0x2b4848(0x11a)],'gold':_0x1b9c7e[_0x2b4848(0x155)],'drop':_0x1b9c7e[_0x2b4848(0xb3)]},this['_enemyLevel_GrowthFlat']={0x0:_0x1b9c7e[_0x2b4848(0xe8)],0x1:_0x1b9c7e['MaxMP_Flat'],0x2:_0x1b9c7e[_0x2b4848(0xe3)],0x3:_0x1b9c7e[_0x2b4848(0xd9)],0x4:_0x1b9c7e[_0x2b4848(0x159)],0x5:_0x1b9c7e[_0x2b4848(0xa4)],0x6:_0x1b9c7e[_0x2b4848(0xe4)],0x7:_0x1b9c7e[_0x2b4848(0xcb)],'exp':_0x1b9c7e[_0x2b4848(0xd1)],'gold':_0x1b9c7e[_0x2b4848(0xfa)],'drop':_0x1b9c7e[_0x2b4848(0xbe)]};const _0x2e837a=[_0x2b4848(0x119),_0x2b4848(0x11b),_0x2b4848(0xb6),_0x2b4848(0x163),'MAT','MDF',_0x2b4848(0xf4),_0x2b4848(0x13a),_0x2b4848(0xde),_0x2b4848(0xd2),_0x2b4848(0x147)],_0x185364=this[_0x2b4848(0x164)]()['note'];if(_0x185364[_0x2b4848(0xc3)](/<GROWTH RATE PER LEVEL>\s*([\s\S]*)\s*<\/GROWTH RATE PER LEVEL>/i)){const _0x1ca843=String(RegExp['$1'])[_0x2b4848(0x110)](/[\r\n]+/);for(const _0x3f7c4c of _0x1ca843){if(_0x3f7c4c[_0x2b4848(0xc3)](/(.*): (.*)/i)){const _0x10630a=String(RegExp['$1'])[_0x2b4848(0x12f)]()[_0x2b4848(0x108)](),_0x5b6fde=Number(eval(RegExp['$2'])||0x0),_0x4891af=_0x2e837a[_0x2b4848(0x123)](_0x10630a);if(_0x4891af<0x8)this['_enemyLevel_GrowthRate'][_0x4891af]=_0x5b6fde;else{if(_0x4891af===0x8)this[_0x2b4848(0x131)][_0x2b4848(0xcd)]=_0x5b6fde;else{if(_0x4891af===0x9)this['_enemyLevel_GrowthRate'][_0x2b4848(0x13b)]=_0x5b6fde;else{if(_0x4891af===0xa)this[_0x2b4848(0x131)][_0x2b4848(0x154)]=_0x5b6fde;else continue;}}}}}}if(_0x185364[_0x2b4848(0xc3)](/<GROWTH FLAT PER LEVEL>\s*([\s\S]*)\s*<\/GROWTH FLAT PER LEVEL>/i)){const _0x32fcd3=String(RegExp['$1'])[_0x2b4848(0x110)](/[\r\n]+/);for(const _0x4a9edc of _0x32fcd3){if(_0x4a9edc['match'](/(.*): (.*)/i)){const _0x5ac491=String(RegExp['$1'])[_0x2b4848(0x12f)]()['trim'](),_0x2c76e2=Number(eval(RegExp['$2'])||0x0),_0x3c6931=_0x2e837a[_0x2b4848(0x123)](_0x5ac491);if(_0x3c6931<0x8)this['_enemyLevel_GrowthFlat'][_0x3c6931]=_0x2c76e2;else{if(_0x3c6931===0x8)this[_0x2b4848(0x149)]['exp']=_0x2c76e2;else{if(_0x3c6931===0x9)this['_enemyLevel_GrowthFlat'][_0x2b4848(0x13b)]=_0x2c76e2;else{if(_0x3c6931===0xa)this[_0x2b4848(0x149)][_0x2b4848(0x154)]=_0x2c76e2;else continue;}}}}}}},Game_Enemy[_0x1498b3(0xaa)]['paramBaseApplyEnemyLevel']=function(_0x62fe4,_0x486dec,_0x29ca7b){const _0x585aca=_0x1498b3;if(this['isStaticLevelParameters']())return _0x29ca7b;this[_0x585aca(0xcf)](!![]);const _0x289f49=this;let _0x52fe2b=_0x29ca7b;const _0x307fe7=this['_enemyLevel_GrowthRate'][_0x62fe4],_0x327b4a=this[_0x585aca(0x149)][_0x62fe4];return _0x52fe2b=_0x29ca7b+_0x486dec*_0x29ca7b*_0x307fe7+_0x486dec*_0x327b4a,_0x52fe2b;},VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0x167)]=Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xcd)],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xcd)]=function(){const _0x4008d9=_0x1498b3,_0x5b6dad=VisuMZ[_0x4008d9(0xc9)][_0x4008d9(0x167)]['call'](this),_0xfe8519=this[_0x4008d9(0xb2)]-0x1;return this[_0x4008d9(0x12c)](_0x5b6dad,_0xfe8519);},Game_Enemy['prototype'][_0x1498b3(0x12c)]=function(_0x41471e,_0x5b4e98){const _0x2eef10=_0x1498b3;if(this[_0x2eef10(0xf6)]())return _0x41471e;this[_0x2eef10(0xcf)](!![]);const _0x375192=this;let _0x419694=_0x41471e;const _0x4938e8=this['_enemyLevel_GrowthRate'][_0x2eef10(0xcd)],_0x281fe8=this[_0x2eef10(0x149)][_0x2eef10(0xcd)];return _0x419694=_0x41471e+_0x5b4e98*_0x41471e*_0x4938e8+_0x5b4e98*_0x281fe8,Math[_0x2eef10(0xa2)](_0x419694);},VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0xd7)]=Game_Enemy['prototype'][_0x1498b3(0x13b)],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x13b)]=function(){const _0x231d28=_0x1498b3,_0x3a6c36=VisuMZ[_0x231d28(0xc9)]['Game_Enemy_gold'][_0x231d28(0xec)](this),_0x5e14e0=this[_0x231d28(0xb2)]-0x1;return this[_0x231d28(0x124)](_0x3a6c36,_0x5e14e0);},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x124)]=function(_0x125ed6,_0x5f3df3){const _0x277de4=_0x1498b3;if(this[_0x277de4(0xf6)]())return _0x125ed6;this['createEnemyLevelParamGrowth'](!![]);const _0x9835fe=this;let _0x419e6d=_0x125ed6;const _0x5e97a4=this[_0x277de4(0x131)][_0x277de4(0x13b)],_0x1bc934=this[_0x277de4(0x149)][_0x277de4(0x13b)];return _0x419e6d=_0x125ed6+_0x5f3df3*_0x125ed6*_0x5e97a4+_0x5f3df3*_0x1bc934,Math[_0x277de4(0xa2)](_0x419e6d);},VisuMZ[_0x1498b3(0xc9)][_0x1498b3(0x103)]=Game_Enemy[_0x1498b3(0xaa)]['dropItemRate'],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0xcc)]=function(){const _0x441ef0=_0x1498b3,_0x24c5b6=VisuMZ[_0x441ef0(0xc9)][_0x441ef0(0x103)][_0x441ef0(0xec)](this),_0x11fd2a=this[_0x441ef0(0xb2)]-0x1;return this[_0x441ef0(0x118)](_0x24c5b6,_0x11fd2a);},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x118)]=function(_0x5d6274,_0x10bcfd){const _0x17a4b1=_0x1498b3;if(this[_0x17a4b1(0xf6)]())return _0x5d6274;this['createEnemyLevelParamGrowth'](!![]);const _0x3d6ea5=this;let _0x725424=_0x5d6274;const _0x4c713a=this[_0x17a4b1(0x131)][_0x17a4b1(0x154)],_0x224ca9=this[_0x17a4b1(0x149)][_0x17a4b1(0x154)];return _0x725424=_0x5d6274+_0x10bcfd*_0x5d6274*_0x4c713a+_0x10bcfd*_0x224ca9,_0x725424;},Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x10b)]=function(_0x16698a){const _0x2d9f33=_0x1498b3;if(!_0x16698a)return![];this['createEnemyLevelSkillRequirements'](!![]);const _0x2e0d5c=_0x16698a['name'][_0x2d9f33(0x12f)]()[_0x2d9f33(0x108)]();if(this[_0x2d9f33(0xbd)][_0x2e0d5c])return this[_0x2d9f33(0xb2)]>=this['_enemyLevelRequired_SkillName'][_0x2e0d5c];const _0x3e99dd=_0x16698a['id'];if(this[_0x2d9f33(0xba)][_0x3e99dd])return this[_0x2d9f33(0xb2)]>=this['_enemyLevelRequired_SkillID'][_0x3e99dd];return!![];},Game_Enemy[_0x1498b3(0xaa)]['createEnemyLevelSkillRequirements']=function(_0x240090){const _0x42ebfa=_0x1498b3;if(_0x240090&&this[_0x42ebfa(0xbd)]&&this['_enemyLevelRequired_SkillID'])return;this['_enemyLevelRequired_SkillName']={},this[_0x42ebfa(0xba)]={};const _0x46ab6e=this['enemy']()[_0x42ebfa(0x12d)]['match'](/<ENEMY SKILL (.*) REQUIRE LEVEL: (\d+)>/gi);if(_0x46ab6e)for(const _0x3db4fb of _0x46ab6e){_0x3db4fb[_0x42ebfa(0xc3)](/<ENEMY SKILL (.*) REQUIRE LEVEL: (\d+)>/i);const _0x28d35f=String(RegExp['$1'])['toUpperCase']()[_0x42ebfa(0x108)](),_0x2d36fb=Number(RegExp['$2']);_0x28d35f[_0x42ebfa(0xc3)](/\b(\d+)\b/i)?this[_0x42ebfa(0xba)][_0x28d35f]=_0x2d36fb:this[_0x42ebfa(0xbd)][_0x28d35f]=_0x2d36fb;}},VisuMZ['EnemyLevel'][_0x1498b3(0x129)]=Game_Enemy['prototype'][_0x1498b3(0x104)],Game_Enemy[_0x1498b3(0xaa)][_0x1498b3(0x104)]=function(_0x47ce8f){const _0x300843=_0x1498b3;VisuMZ[_0x300843(0xc9)][_0x300843(0x129)][_0x300843(0xec)](this,_0x47ce8f),this[_0x300843(0x141)](),this[_0x300843(0xcf)](![]),this[_0x300843(0x10f)](![]);},Game_Party[_0x1498b3(0xaa)][_0x1498b3(0xc0)]=function(_0x2e9594){const _0x4427b6=_0x1498b3,_0x5e67d6=this['allMembers']()[_0x4427b6(0x169)](_0x5cd552=>!!_0x5cd552)['map'](_0x4598d1=>_0x4598d1[_0x4427b6(0xb2)]),_0x41e2a7=this[_0x4427b6(0xbb)]()[_0x4427b6(0x169)](_0x45eb90=>!!_0x45eb90)['map'](_0xc0ca9=>_0xc0ca9['level']);switch(_0x2e9594[_0x4427b6(0x12f)]()[_0x4427b6(0x108)]()){case _0x4427b6(0x14d):return Math[_0x4427b6(0xf8)](..._0x5e67d6);break;case _0x4427b6(0xa5):return Math[_0x4427b6(0xf8)](..._0x41e2a7);break;case _0x4427b6(0xe0):if(_0x5e67d6['length']<=0x1)return _0x5e67d6[0x0]||0x1;return Math[_0x4427b6(0xa2)](_0x5e67d6[_0x4427b6(0x136)]((_0x2d6095,_0x246b9f)=>_0x2d6095+_0x246b9f)/_0x5e67d6[_0x4427b6(0xa7)]);break;case _0x4427b6(0x143):if(_0x41e2a7[_0x4427b6(0xa7)]<=0x1)return _0x41e2a7[0x0]||0x1;return Math[_0x4427b6(0xa2)](_0x41e2a7[_0x4427b6(0x136)]((_0x1ab2b1,_0x29aa61)=>_0x1ab2b1+_0x29aa61)/_0x41e2a7['length']);break;case'LOWEST\x20ACTOR\x20LEVEL':return Math[_0x4427b6(0x15f)](..._0x5e67d6['map'](_0x2ed15e=>_0x2ed15e));break;case'LOWEST\x20PARTY\x20LEVEL':return Math[_0x4427b6(0x15f)](..._0x41e2a7[_0x4427b6(0xe2)](_0x3701a9=>_0x3701a9));break;default:return 0x1;break;}},Game_Map['prototype'][_0x1498b3(0xac)]=function(){if(!$dataMap)return![];return!!this['enemyLevel']();},Game_Map[_0x1498b3(0xaa)][_0x1498b3(0x15a)]=function(){const _0x500c27=_0x1498b3;if(!$dataMap)return 0x0;const _0x5ae113=$dataMap[_0x500c27(0x12d)];if(_0x5ae113[_0x500c27(0xc3)](/<ENEMY LEVEL: (\d+)>/i))return Number(RegExp['$1'])||0x1;else{if(_0x5ae113[_0x500c27(0xc3)](/<ENEMY LEVEL: (\d+) TO (\d+)>/i)){const _0x2f40d4=Number(RegExp['$1']),_0x5114bd=Number(RegExp['$2']),_0x4d0fb4=Math['min'](_0x2f40d4,_0x5114bd),_0x6af42e=Math[_0x500c27(0xf8)](_0x2f40d4,_0x5114bd);return Math[_0x500c27(0x115)](_0x4d0fb4+Math['randomInt'](_0x6af42e-_0x4d0fb4+0x1));}else{if(_0x5ae113[_0x500c27(0xc3)](/<ENEMY LEVEL: (.*)>/i)){const _0x53950a=String(RegExp['$1'])[_0x500c27(0x12f)]()['trim']();this['_level']=$gameParty[_0x500c27(0xc0)](_0x53950a)||0x1;}else{if(_0x5ae113[_0x500c27(0xc3)](/<JS ENEMY LEVEL: (.*)>/i))try{return Math[_0x500c27(0x115)](eval(RegExp['$1'])||0x0);}catch(_0x106461){if($gameTemp[_0x500c27(0x13c)]())console[_0x500c27(0x144)](_0x106461);return 0x0;}else return 0x0;}}}};