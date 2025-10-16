//=============================================================================
// VisuStella MZ - Enhanced TP System
// VisuMZ_2_EnhancedTpSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EnhancedTpSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EnhancedTP = VisuMZ.EnhancedTP || {};
VisuMZ.EnhancedTP.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [EnhancedTP]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Enhanced_TP_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
 * hardcoded in giving RPG Maker MZ users very little control over how much TP
 * gain a battler can receive from particular actions and situations. This
 * plugin gives you the ability to adjust how much TP battlers will acquire
 * various actions, different TP modes, and letting players selecting and pick
 * what TP mode they want for each actor.
 *
 * Features include all (but not limited to) the following:
 * 
 * * TP Modes that allow actors and enemies to have different ways of
 *   generating TP through battle.
 * * 30 pre-made TP Modes for you to use and/or learn from.
 * * Functionality for skills and items to change a target's TP Mode.
 * * The ability to teach actors new TP modes upon learning new skills.
 * * Unlock new TP Modes from becoming the target of skills and/or items.
 * * Trait Objects (like states) that will enforce a specific TP Mode when
 *   applied.
 * * TP Gauge can flash a variety of colors once a certain percentile range
 *   has been met.
 * * Integrated TP Mode changer for players within Scene_Skill.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * MaxTP Overwrite
 *
 * - There was nothing altering MaxTP before and this plugin offers TP Modes
 * that change up the MaxTP total. The function has been overwritten for more
 * plugin functionality.
 *
 * ---
 *
 * Preserve TP
 *
 * - Preserve TP function has been overwritten so it is no longer determined by
 * the presence of the Preserve TP trait, but instead, determined by whether or
 * not the current TP Mode has TP Preservation as its property. This is to keep
 * the consistency in the TP Modes and to give the game dev more control over
 * this aspect.
 *
 * ---
 * 
 * Initial TP Gain in Battle Reworked
 *
 * - If 'Preserve TP' was off, battlers would normally have a random amount of
 * TP given to them at the start of battle by default. However, there was no
 * place to control this value in the RPG Maker MZ editor itself so this has
 * been overwritten to give you, the game dev, full control over this aspect,
 * and whether or not it requires the 'Preserve TP' flag or not.
 *
 * ---
 *
 * On Damage TP Gain
 *
 * - The on Damage function has been overwritten to remove the default TP gain
 * aspect in favor of custom TP gain aspect granted by the current equipped TP
 * Mode to keep functionality under control.
 *
 * ---
 * 
 * Sprite_Gauge Changes
 * 
 * - The sprite gauge has been changed slightly to allow for flashing gauges.
 * They're separated into different layers now when it comes strictly to a TP
 * gauge. There shouldn't be any noticeable compatibility problems with them
 * unless there are plugins that alter the TP gauge completely.
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
 * === General TP Mode Notetags ===
 *
 * These are TP Mode-related notatags that affect both actors and enemies.
 *
 * ---
 *
 * <TP Mode: name>
 *
 * - Used for: Actor Enemy, State Notetags
 * - Sets the starting TP Mode for this actor/enemy to be 'name'.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Starting TP Modes>
 *  name
 *  name
 *  name
 *  name
 * </Starting TP Modes>
 *
 * - Used for: Actor Notetags
 * - Adds TP Modes to the actor's available list of TP Modes from the start.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Change Target TP Mode: name>
 *
 * <Change User TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target/user's TP Mode to the target TP Mode upon using this
 *   item/skill.
 * - For <Change Target TP Mode: name>, the action must successfully hit the
 *   target in order for the TP Mode to change.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * === Actor-Only TP Mode Notetags ===
 *
 * These are TP Mode-related notetags that only affect actors.
 *
 * ---
 *
 * <Learn TP Mode: name>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Insert multiple copies of this notetag to have the skill learn more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Keep in mind that learning the skill is required for the TP Mode to be
 *   learned. Adding the skill through a trait will not teach the TP Mode.
 *
 * ---
 *
 * <Learn TP Modes>
 *  name
 *  name
 *  name
 * </Learn TP Modes>
 *
 * - Used for: Skill Notetags
 * - Causes the target selected actor to learn the specific TP Mode when the
 *   skill is learned.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Unlock TP Mode: name>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Insert multiple copies of this notetag to have the item/skill unlock more
 *   TP Modes for the target actor.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 *
 * ---
 *
 * <Unlock TP Modes>
 *  name
 *  name
 *  name
 * </Unlock TP Modes>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the target selected actor to unlock the specific TP Mode.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
 * - Insert more 'name' entries for more TP Modes.
 *
 * ---
 *
 * <Force TP Mode: name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Forces the affected battler to use the specific named TP Mode in battle.
 * - Priority is given based the ordering of trait objects if multiple forced
 *   TP Mode effects are present.
 * - Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
 *   TP Modes listing.
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
 * Actor: Change TP Mode
 * - Changes target actor(s) TP Mode.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock TP Mode
 * - Unlocks TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 *   TP Modes:
 *   - Change to this TP Mode for selected actor(s).
 *
 * ---
 *
 * Actor: Unlock All TP Modes
 * - Unlocks all TP Modes for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which actor(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change TP Mode
 * - Changes target enemy(ies) TP Mode.
 *
 *   Enemy Index(es):
 *   - Select which enemy(ies) to affect.
 *
 *   TP Mode Name:
 *   - Change to this TP Mode for selected enemy(ies).
 *
 * ---
 *
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: Show/Hide TP Mode
 * - Shows/Hides TP Mode from Scene_Skill.
 *
 *   Show TP Mode?:
 *   - Shows/Hides TP Mode in Scene_Skill.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings for the Enhanced TP System plugin. These
 * control the default settings for TP Modes and TP Mode option appearing in
 * Scene_Skill for the player.
 *
 * ---
 *
 * Defaults
 * 
 *   Default TP Mode:
 *   - Which TP mode should actors and enemies have by default?
 * 
 *   Global TP Modes:
 *   - TP Modes available to the all actors to pick from.
 *
 * ---
 *
 * Scene_Skill
 * 
 *   Show TP Mode?:
 *   - Show TP Mode in Scene_Skill by default?
 * 
 *   TP Mode Command:
 *   - The command name format shown in Scene_Skill.
 *   - %1 - TP Text
 * 
 *   TP Mode Icon:
 *   - Icon used for TP Mode shown in Scene_Skill.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP Modes
 * ============================================================================
 *
 * TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
 * how TP is earned as well as the maximum TP value the actor/enemy can have.
 * Players can switch between TP Modes if granted the option, too.
 *
 * TP Modes can be added, removed, and editted by you the game dev. Each TP
 * Mode will have the following Plugin Parameters for you to adjust:
 *
 * ---
 *
 * General
 * 
 *   TP Mode Name:
 *   - The name for this TP Mode.
 *   - Used for notetag reference.
 * 
 *   Icon:
 *   - Icon used for this TP Mode.
 * 
 *   Help:
 *   - Help description used for this TP Mode.
 *   - %1 - In-game TP vocabulary.
 * 
 *   MaxTP Formula:
 *   - What's the MaxTP for this TP Mode?
 * 
 *   TCR Multiplier:
 *   - Multiplier on how much TP is earned.
 *   - Stacks multiplicatively with TCR.
 * 
 *   Preserve TP?:
 *   - If preserved, carry TP to the next battle.
 *   - If not, TP resets each battle.
 *
 * ---
 * 
 * Gauge
 * 
 *   Flash Gauge?:
 *   - Let this gauge flash once it reaches a certain percentage value.
 *   - Requires VisuMZ_1_SkillsStatesCore!
 * 
 *   Required Rate:
 *   - What rate does this gauge need to be over in order for it to flash?
 * 
 *   Flash Speed:
 *   - How fast should the gauge flash different colors?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   Color Lightness:
 *   - How light should the flash color be?
 *   - Lower numbers are darker. Higher numbers are lighter.
 * 
 *   Custom Label:
 *   - Instead of displaying "TP", what label do you want to display here?
 *   - Leave empty to keep using "TP".
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 *   Custom Color 1:
 *   Custom Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Empty for default colors.
 *   - This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * ---
 *
 * TP Formulas > Generic
 * 
 *   Initial TP:
 *   - How much TP is gained at the start of battle?
 * 
 *   Critical Hit:
 *   - How much TP is gained when landing a critical hit?
 * 
 *   Evasion:
 *   - How much TP is gained when evading an action?
 * 
 *   Use Item:
 *   - How much TP is gained when using an item in battle?
 * 
 *   Use Skill:
 *   - How much TP is gained when using a skill in battle that isn't
 *     Attack or Guard?
 *
 * ---
 *
 * TP Formulas > During Regen
 * 
 *   TP Regen:
 *   - How much TP is gained each turn during regeneration?
 * 
 *   Critical HP:
 *   - How much TP is gained when user is in critical HP (25%)
 *     during regeneration.
 * 
 *   Full HP:
 *   - How much TP is gained when user has full HP
 *     during regeneration.
 * 
 *   Critical MP:
 *   - How much TP is gained when user is in critical MP (25%)
 *     during regeneration.
 * 
 *   Full MP:
 *   - How much TP is gained when user has full MP
 *     during regeneration.
 * 
 *   Only Member:
 *   - How much TP is gained when user is the only alive party member
 *     during regeneration.
 *
 * ---
 *
 * TP Formulas > HP Damage
 * 
 *   Take HP Damage:
 *   - How much TP is gained when receiving HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal HP Damage:
 *   - How much TP is gained when dealing HP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally HP Damage:
 *   - How much TP is gained when an ally receives HP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > HP Heal
 * 
 *   Take HP Heal:
 *   - How much TP is gained when receiving HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal HP Heal:
 *   - How much TP is gained when dealing HP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally HP Heal:
 *   - How much TP is gained when an ally receives HP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Damage
 * 
 *   Take MP Damage:
 *   - How much TP is gained when receiving MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Deal MP Damage:
 *   - How much TP is gained when dealing MP damage?
 *   - Damage value is stored in 'value' variable.
 * 
 *   Ally MP Damage:
 *   - How much TP is gained when an ally receives MP damage?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > MP Heal
 * 
 *   Take MP Heal:
 *   - How much TP is gained when receiving MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Deal MP Heal:
 *   - How much TP is gained when dealing MP heals?
 *   - Heal value is stored in 'value' variable.
 * 
 *   Ally MP Heal:
 *   - How much TP is gained when an ally receives MP heals?
 *   - Damage value is stored in 'value' variable.
 *
 * ---
 *
 * TP Formulas > Buffs
 * 
 *   Deal Ally Buff:
 *   - How much TP is gained when user inflicts a buff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Buff:
 *   - How much TP is gained when user inflicts a buff on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Buff:
 *   - How much TP is gained when user gains a buff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Buff:
 *   - How much TP is gained when user gains a buff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Debuffs
 * 
 *   Deal Ally Debuff:
 *   - How much TP is gained when user inflicts a debuff on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy Debuff:
 *   - How much TP is gained when user inflicts a debuff on an enemy through
 *     an Item/Skill Effect (code does not count).
 * 
 *   Gain Ally Debuff:
 *   - How much TP is gained when user gains a debuff from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy Debuff:
 *   - How much TP is gained when user gains a debuff from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > States
 * 
 *   Deal Ally State:
 *   - How much TP is gained when user inflicts a state on an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Deal Enemy State:
 *   - How much TP is gained when user inflicts a state on an enemy through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Ally State:
 *   - How much TP is gained when user gains a state from an ally through an
 *     Item/Skill Effect (code does not count).
 * 
 *   Gain Enemy State:
 *   - How much TP is gained when user gains a state from an enemy through an
 *     Item/Skill Effect (code does not count).
 *
 * ---
 *
 * TP Formulas > Death
 * 
 *   Ally Death:
 *   - How much TP is gained when an allied member dies.
 *   - Does not matter who the killer is.
 * 
 *   Enemy Death:
 *   - How much TP is gained when an enemy member dies.
 *   - Does not matter who the killer is.
 *
 * ---
 *
 * TP Formulas > Battle
 * 
 *   Win Battle:
 *   - How much TP is gained when the player wins a battle.
 * 
 *   Flee Battle:
 *   - How much TP is gained when the player escapes a battle.
 * 
 *   Lose Battle:
 *   - How much TP is gained when the player loses a battle.
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
 * Version 1.17: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where TP was not properly preserved. Fix made by Arisu.
 * 
 * Version 1.16: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.15: August 29, 2024
 * * Feature Update!
 * ** Added failsafes for Bad JavaScript TP Formulas to prevent them from
 *    becoming NaN values, undefined values, or null values. Bad values will
 *    default to 0 and an error message will appear telling which actor, mode,
 *    and key's formula has bad code. Update made by Arisu.
 * 
 * Version 1.14: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the icon of the TP Modes command in the Skill Scene
 *    would still appear even if command types are set to text only through the
 *    VisuStella MZ Skills & States Core plugin. Fixed by Olivia.
 * 
 * Version 1.13: September 29, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: August 18, 2022
 * * Feature Update!
 * ** Regenerate TP functions no longer occur outside of battle. Update made
 *    by Olivia.
 * 
 * Version 1.11: July 16, 2021
 * * Bug Fixes!
 * ** Fixed a problem that bypassed teaching TP modes through item usage.
 *    Fix made by Arisu.
 * 
 * Version 1.10: July 9, 2021
 * * Bug Fixes!
 * ** Fixed bugs regarding the TP Mode Unlock notetags not being detected
 *    properly. Fix made by Olivia.
 * 
 * Version 1.09: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: May 7, 2021
 * * Bug Fixes!
 * ** Normal Attack States will no longer trigger state gains if no states are
 *    applied. Fix made by Irina.
 * 
 * Version 1.07: April 23, 2021
 * * Bug Fixes!
 * ** Death effects for TP should now only trigger once. Fix made by Olivia.
 * 
 * Version 1.06: February 12, 2021
 * * Feature Update!
 * ** <Force TP Mode: name> notetag is now updated to be enforced outside of
 *    battle as well. Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Documentation Update!
 * ** Add notes to the "Custom Label" and "Custom Color" Plugin Parameters:
 * *** This applies to gauges only. This does NOT change the way TP costs are
 *     displayed in the skill windows.
 * 
 * Version 1.04: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > General Settings > Background Type
 * 
 * Version 1.03: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New plugin parameters added by Arisu:
 * *** Custom Label
 * **** Instead of displaying "TP", what label do you want to display here?
 *      Leave empty to keep using "TP".
 * *** Custom Color 1, Custom Color 2
 * **** Use #rrggbb for custom colors or regular numbers for text colors from
 *      the Window Skin. Empty for default colors.
 * *** These plugin parameters are added onto TP Modes.
 * 
 * Version 1.02: November 8, 2020
 * * Bug Fixes!
 * ** Turning off Preserve TP will no longer generate random amounts of TP at
 *    the start of battle. Fix made by Arisu.
 * 
 * Version 1.01: November 1, 2020
 * * Bug Fixes!
 * ** Skill & States Core is no longer a dependency for Enhanced TP System.
 *    Fix made by Olivia.
 *
 * Version 1.00: October 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeTPMode
 * @text Actor: Change TP Mode
 * @desc Changes target actor(s) TP Mode.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected actor(s).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockTPMode
 * @text Actor: Unlock TP Mode
 * @desc Unlocks TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @arg TPModes:arraystr
 * @text TP Modes
 * @type string[]
 * @desc Change to this TP Mode for selected actor(s).
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorUnlockAllTPModes
 * @text Actor: Unlock All TP Modes
 * @desc Unlocks all TP Modes for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeTPMode
 * @text Enemy: Change TP Mode
 * @desc Changes target enemy(ies) TP Mode.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @min 0
 * @desc Select which enemy(ies) to affect.
 * @default ["0"]
 *
 * @arg TPModeName:str
 * @text TP Mode Name
 * @desc Change to this TP Mode for selected enemy(ies).
 * @default Stoic
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SceneSkillTpMode
 * @text System: Show/Hide TP Mode
 * @desc Shows/Hides TP Mode from Scene_Skill.
 *
 * @arg Show:eval
 * @text Show TP Mode?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/Hides TP Mode in Scene_Skill.
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
 * @param EnhancedTP
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
 * @desc General settings pertaining to TP.
 * @default {"Defaults":"","DefaultTpMode:str":"Stoic","GlobalTPModes:arraystr":"[\"Stoic\",\"Comrade\",\"Warrior\",\"Healer\"]","SceneSkill":"","ShowTpMode:eval":"true","TpModeCmdName:str":"%1 Mode","TpModeIcon:num":"164"}
 *
 * @param TpMode:arraystruct
 * @text TP Modes
 * @type struct<TpMode>[]
 * @desc TP Modes available in the game.
 * @default ["{\"Name:str\":\"Stoic\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 when receiving damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Comrade\",\"Icon:num\":\"76\",\"Help:json\":\"\\\"Raise %1 whenever allies take damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"20 * user.tcr\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Warrior\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Raise %1 by attacking and dealing HP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Healer\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Raise %1 by healing HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Breaker\",\"Icon:num\":\"171\",\"Help:json\":\"\\\"Raise %1 whenever user deals MP damage\\\\nor receives MP damage.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"50 * (value / Math.max(1, this.mmp)) * user.tcr\",\"DealMpDmg:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Battery\",\"Icon:num\":\"165\",\"Help:json\":\"\\\"Raise %1 whenever use helps an ally restore MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"Math.min(16, value / 4) * user.tcr\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Slayer\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Raise %1 whenever an enemy is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"25 * user.tcr\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Avenger\",\"Icon:num\":\"17\",\"Help:json\":\"\\\"Raise %1 whenever an ally is killed.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"50 * user.tcr\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Winner\",\"Icon:num\":\"87\",\"Help:json\":\"\\\"Raise %1 whenever your party wins a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"20 * user.tcr\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Coward\",\"Icon:num\":\"89\",\"Help:json\":\"\\\"Raise %1 whenever your party escapes from battle\\\\nor loses a battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"20 * user.tcr\",\"LoseBattle:str\":\"20 * user.tcr\"}","{\"Name:str\":\"Cautious\",\"Icon:num\":\"32\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"10 * user.tcr\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Thrifty\",\"Icon:num\":\"33\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with full MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"10 * user.tcr\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Daredevil\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low HP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"16 * user.tcr\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Splurger\",\"Icon:num\":\"49\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn with low MP.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"16 * user.tcr\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Caster\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Raise %1 whenever user performs a skill.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"16 * user.tcr\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Alchemist\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Raise %1 whenever user uses an item.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"16 * user.tcr\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Enchanter\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a buff\\\\nor status effect to an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"16 * user.tcr\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"16 * user.tcr\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Tactician\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Gains %1 TP whenever user applies a debuff\\\\nor status effect to a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"16 * user.tcr\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"16 * user.tcr\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Boosted\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Raise %1 whenever user receives a buff or\\\\nstatus effect from an ally.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"16 * user.tcr\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"16 * user.tcr\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Sufferer\",\"Icon:num\":\"2\",\"Help:json\":\"\\\"Raise %1 whenever user receives a debuff or\\\\nstatus effect from a foe.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"16 * user.tcr\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"16 * user.tcr\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Striker\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Raise %1 whenever user lands a critical hit.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"16 * user.tcr\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Dancer\",\"Icon:num\":\"82\",\"Help:json\":\"\\\"Raise %1 whenever user evades an attack.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"16 * user.tcr\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Loner\",\"Icon:num\":\"166\",\"Help:json\":\"\\\"Raise %1 whenever user ends a turn as the\\\\nlast remaining alive member.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"16 * user.tcr\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Initiator\",\"Icon:num\":\"164\",\"Help:json\":\"\\\"User gains %1 at the start of battle.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20 * user.tcr\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Charger\",\"Icon:num\":\"311\",\"Help:json\":\"\\\"User loses all %1 at the start of battle but\\\\ngains more each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"-1 * user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"2 ** user.turnCount() * user.tcr\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Berserker\",\"Icon:num\":\"5\",\"Help:json\":\"\\\"User starts with full %1 at the start of battle,\\\\nbut loses 20 %1 each passing turn.\\\"\",\"MaxFormula:str\":\"100\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"user.maxTp()\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"-20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Maximizer\",\"Icon:num\":\"239\",\"Help:json\":\"\\\"User's Max%1 is raised to 300 gains %1 from\\\\ndealing/receiving HP damage at a slower rate.\\\"\",\"MaxFormula:str\":\"300\",\"MultiplierTCR:num\":\"0.5\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Minimizer\",\"Icon:num\":\"236\",\"Help:json\":\"\\\"User's Max%1 is lowered to 50 gains %1 from\\\\ndealing/receiving HP damage at a faster rate.\\\"\",\"MaxFormula:str\":\"50\",\"MultiplierTCR:num\":\"2.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"0\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"50 * (value / user.mhp) * user.tcr\",\"DealHpHeal:str\":\"Math.min(16, value * 100 / target.mhp) * user.tcr\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Recycler\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"User's Max%1 becomes 20. User starts with 20 %1\\\\nand regenerates 20 %1 each turn.\\\"\",\"MaxFormula:str\":\"20\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"20\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"20\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"0\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"0\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}","{\"Name:str\":\"Assassin\",\"Icon:num\":\"10\",\"Help:json\":\"\\\"User's Max%1 becomes 500. User starts with 500 %1,\\\\nbut receiving healing or damage halves user's %1.\\\"\",\"MaxFormula:str\":\"500\",\"MultiplierTCR:num\":\"1.0\",\"Preserve:eval\":\"true\",\"Gauge\":\"\",\"FlashGauge:eval\":\"true\",\"FlashRequirement:num\":\"1.0\",\"FlashSpeed:num\":\"16\",\"FlashLightness:num\":\"160\",\"Formulas\":\"\",\"Generic\":\"\",\"Initial:str\":\"500\",\"CriticalHit:str\":\"0\",\"Evasion:str\":\"0\",\"UseItem:str\":\"0\",\"UseSkill:str\":\"0\",\"Regen\":\"\",\"TpRegen:str\":\"0\",\"CriticalHp:str\":\"0\",\"FullHp:str\":\"0\",\"CriticalMp:str\":\"0\",\"FullMp:str\":\"0\",\"OnlyMember:str\":\"0\",\"HPDmg\":\"\",\"TakeHpDmg:str\":\"user.tp / -2\",\"DealHpDmg:str\":\"0\",\"AllyHpDmg:str\":\"0\",\"HPHeal\":\"\",\"TakeHpHeal:str\":\"user.tp / -2\",\"DealHpHeal:str\":\"0\",\"AllyHpHeal:str\":\"0\",\"MPDmg\":\"\",\"TakeMpDmg:str\":\"0\",\"DealMpDmg:str\":\"0\",\"AllyMpDmg:str\":\"0\",\"MPHeal\":\"\",\"TakeMpHeal:str\":\"0\",\"DealMpHeal:str\":\"0\",\"AllyMpHeal:str\":\"0\",\"Buffs\":\"\",\"DealAllyBuff:str\":\"0\",\"DealEnemyBuff:str\":\"0\",\"GainAllyBuff:str\":\"0\",\"GainEnemyBuff:str\":\"0\",\"Debuffs\":\"\",\"DealAllyDebuff:str\":\"0\",\"DealEnemyDebuff:str\":\"0\",\"GainAllyDebuff:str\":\"0\",\"GainEnemyDebuff:str\":\"0\",\"States\":\"\",\"DealAllyState:str\":\"0\",\"DealEnemyState:str\":\"0\",\"GainAllyState:str\":\"0\",\"GainEnemyState:str\":\"0\",\"Death\":\"\",\"KillAlly:str\":\"0\",\"KillEnemy:str\":\"0\",\"Battle\":\"\",\"WinBattle:str\":\"0\",\"FleeBattle:str\":\"0\",\"LoseBattle:str\":\"0\"}"]
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
 * @param Defaults
 *
 * @param DefaultTpMode:str
 * @text Default TP Mode
 * @parent Defaults
 * @desc Which TP mode should actors and enemies have by default?
 * @default Stoic
 *
 * @param GlobalTPModes:arraystr
 * @text Global TP Modes
 * @type string[]
 * @parent Defaults
 * @desc TP Modes available to the all actors to pick from.
 * @default ["Stoic","Comrade","Warrior","Healer"]
 *
 * @param SceneSkill
 * @text Scene_Skill
 *
 * @param ShowTpMode:eval
 * @text Show TP Mode?
 * @parent SceneSkill
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show TP Mode in Scene_Skill by default?
 * @default true
 *
 * @param TpModeCmdName:str 
 * @text TP Mode Command
 * @parent SceneSkill
 * @desc The command name format shown in Scene_Skill.
 * %1 - TP Text
 * @default %1 Mode
 *
 * @param TpModeIcon:num
 * @text TP Mode Icon
 * @parent SceneSkill
 * @desc Icon used for TP Mode shown in Scene_Skill.
 * @default 164
 *
 * @param TpWindowBgType:num
 * @text Background Type
 * @parent SceneSkill
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * TP Modes
 * ----------------------------------------------------------------------------
 */
/*~struct~TpMode:
 *
 * @param Name:str 
 * @text TP Mode Name
 * @desc The name for this TP Mode.
 * Used for notetag reference.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent Name:str
 * @desc Icon used for this TP Mode.
 * @default 160
 *
 * @param Help:json
 * @text Help
 * @parent Name:str
 * @type note
 * @desc Help description used for this TP Mode.
 * %1 - In-game TP vocabulary.
 * @default "Help Line 1\nHelp Line 2"
 *
 * @param MaxFormula:str
 * @text MaxTP Formula
 * @parent Name:str
 * @desc What's the MaxTP for this TP Mode?
 * @default 100
 *
 * @param MultiplierTCR:num
 * @text TCR Multiplier
 * @parent Name:str
 * @desc Multiplier on how much TP is earned.
 * Stacks multiplicatively with TCR.
 * @default 1.0
 *
 * @param Preserve:eval
 * @text Preserve TP?
 * @parent Name:str
 * @type boolean
 * @on Preserve
 * @off Don't
 * @desc If preserved, carry TP to the next battle.
 * If not, TP resets each battle.
 * @default true
 *
 * @param Gauge
 *
 * @param FlashGauge:eval
 * @text Flash Gauge?
 * @parent Gauge
 * @type boolean
 * @on Flash
 * @off Don't Flash
 * @desc Let this gauge flash once it reaches a certain percentage 
 * value. Requires VisuMZ_1_SkillsStatesCore!
 * @default true
 *
 * @param FlashRequirement:num
 * @text Required Rate
 * @parent Gauge
 * @desc What rate does this gauge need to be over in order for it to flash?
 * @default 1.0
 *
 * @param FlashSpeed:num
 * @text Flash Speed
 * @parent Gauge
 * @type number
 * @min 1
 * @max 255
 * @desc How fast should the gauge flash different colors?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param FlashLightness:num
 * @text Color Lightness
 * @parent Gauge
 * @type number
 * @min 0
 * @max 255
 * @desc How light should the flash color be?
 * Lower numbers are darker. Higher numbers are lighter.
 * @default 160
 *
 * @param CustomLabel:str
 * @text Custom Label
 * @parent Gauge
 * @desc Instead of displaying "TP", what label do you want
 * to display here? Leave empty to keep using "TP".
 * @default 
 *
 * @param CustomColor1:str
 * @text Custom Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param CustomColor2:str
 * @text Custom Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin. Empty for default.
 * @default 
 *
 * @param Formulas
 * @text TP Formulas
 *
 * @param Generic
 * @parent Formulas
 *
 * @param Initial:str
 * @text Initial TP
 * @parent Generic
 * @desc How much TP is gained at the start of battle?
 * @default 0
 *
 * @param CriticalHit:str
 * @text Critical Hit
 * @parent Generic
 * @desc How much TP is gained when landing a critical hit?
 * @default 0
 *
 * @param Evasion:str
 * @text Evasion
 * @parent Generic
 * @desc How much TP is gained when evading an action?
 * @default 0
 *
 * @param UseItem:str
 * @text Use Item
 * @parent Generic
 * @desc How much TP is gained when using an item in battle?
 * @default 0
 *
 * @param UseSkill:str
 * @text Use Skill
 * @parent Generic
 * @desc How much TP is gained when using a skill in battle that isn't Attack or Guard?
 * @default 0
 *
 * @param Regen
 * @text During Regen
 * @parent Formulas
 *
 * @param TpRegen:str
 * @text TP Regen
 * @parent Regen
 * @desc How much TP is gained each turn during regeneration?
 * @default 0
 *
 * @param CriticalHp:str
 * @text Critical HP
 * @parent Regen
 * @desc How much TP is gained when user is in critical HP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullHp:str
 * @text Full HP
 * @parent Regen
 * @desc How much TP is gained when user has full HP
 * during regeneration.
 * @default 0
 *
 * @param CriticalMp:str
 * @text Critical MP
 * @parent Regen
 * @desc How much TP is gained when user is in critical MP (25%)
 * during regeneration.
 * @default 0
 *
 * @param FullMp:str
 * @text Full MP
 * @parent Regen
 * @desc How much TP is gained when user has full MP
 * during regeneration.
 * @default 0
 *
 * @param OnlyMember:str
 * @text Only Member
 * @parent Regen
 * @desc How much TP is gained when user is the only alive party member during regeneration.
 * @default 0
 *
 * @param HPDmg
 * @text HP Damage
 * @parent Formulas
 *
 * @param TakeHpDmg:str
 * @text Take HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when receiving HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpDmg:str
 * @text Deal HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when dealing HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpDmg:str
 * @text Ally HP Damage
 * @parent HPDmg
 * @desc How much TP is gained when an ally receives HP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param HPHeal
 * @text HP Heal
 * @parent Formulas
 *
 * @param TakeHpHeal:str
 * @text Take HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when receiving HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealHpHeal:str
 * @text Deal HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when dealing HP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyHpHeal:str
 * @text Ally HP Heal
 * @parent HPHeal
 * @desc How much TP is gained when an ally receives HP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPDmg
 * @text MP Damage
 * @parent Formulas
 *
 * @param TakeMpDmg:str
 * @text Take MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when receiving MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpDmg:str
 * @text Deal MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when dealing MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpDmg:str
 * @text Ally MP Damage
 * @parent MPDmg
 * @desc How much TP is gained when an ally receives MP damage?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param MPHeal
 * @text MP Heal
 * @parent Formulas
 *
 * @param TakeMpHeal:str
 * @text Take MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when receiving MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param DealMpHeal:str
 * @text Deal MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when dealing MP heals?
 * Heal value is stored in 'value' variable.
 * @default 0
 *
 * @param AllyMpHeal:str
 * @text Ally MP Heal
 * @parent MPHeal
 * @desc How much TP is gained when an ally receives MP heals?
 * Damage value is stored in 'value' variable.
 * @default 0
 *
 * @param Buffs
 * @parent Formulas
 *
 * @param DealAllyBuff:str
 * @text Deal Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyBuff:str
 * @text Deal Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user inflicts a buff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyBuff:str
 * @text Gain Ally Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyBuff:str
 * @text Gain Enemy Buff
 * @parent Buffs
 * @desc How much TP is gained when user gains a buff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Debuffs
 * @parent Formulas
 *
 * @param DealAllyDebuff:str
 * @text Deal Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyDebuff:str
 * @text Deal Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user inflicts a debuff on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyDebuff:str
 * @text Gain Ally Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyDebuff:str
 * @text Gain Enemy Debuff
 * @parent Debuffs
 * @desc How much TP is gained when user gains a debuff from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param States
 * @parent Formulas
 *
 * @param DealAllyState:str
 * @text Deal Ally State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param DealEnemyState:str
 * @text Deal Enemy State
 * @parent States
 * @desc How much TP is gained when user inflicts a state on an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainAllyState:str
 * @text Gain Ally State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * ally through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param GainEnemyState:str
 * @text Gain Enemy State
 * @parent States
 * @desc How much TP is gained when user gains a state from an
 * enemy through an Item/Skill Effect (code does not count).
 * @default 0
 *
 * @param Death
 * @parent Formulas
 *
 * @param KillAlly:str
 * @text Ally Death
 * @parent Death
 * @desc How much TP is gained when an allied member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param KillEnemy:str
 * @text Enemy Death
 * @parent Death
 * @desc How much TP is gained when an enemy member dies.
 * Does not matter who the killer is.
 * @default 0
 *
 * @param Battle
 * @parent Formulas
 *
 * @param WinBattle:str
 * @text Win Battle
 * @parent Battle
 * @desc How much TP is gained when the player wins a battle.
 * @default 0
 *
 * @param FleeBattle:str
 * @text Flee Battle
 * @parent Battle
 * @desc How much TP is gained when the player escapes a battle.
 * @default 0
 *
 * @param LoseBattle:str
 * @text Lose Battle
 * @parent Battle
 * @desc How much TP is gained when the player loses a battle.
 * @default 0
 *
 */
//=============================================================================

function _0x58fb(_0x2cc122,_0x424e46){const _0x11fbcb=_0x11fb();return _0x58fb=function(_0x58fbfa,_0x3dcc2c){_0x58fbfa=_0x58fbfa-0x1ac;let _0x249ca4=_0x11fbcb[_0x58fbfa];return _0x249ca4;},_0x58fb(_0x2cc122,_0x424e46);}const _0x4e2355=_0x58fb;(function(_0x1738fc,_0x8d11c9){const _0x4fe217=_0x58fb,_0x4d5cbf=_0x1738fc();while(!![]){try{const _0x364330=parseInt(_0x4fe217(0x231))/0x1+-parseInt(_0x4fe217(0x269))/0x2+-parseInt(_0x4fe217(0x1ea))/0x3+parseInt(_0x4fe217(0x1b0))/0x4+parseInt(_0x4fe217(0x20f))/0x5+parseInt(_0x4fe217(0x2a0))/0x6+-parseInt(_0x4fe217(0x2e2))/0x7*(parseInt(_0x4fe217(0x1c7))/0x8);if(_0x364330===_0x8d11c9)break;else _0x4d5cbf['push'](_0x4d5cbf['shift']());}catch(_0x16a7a3){_0x4d5cbf['push'](_0x4d5cbf['shift']());}}}(_0x11fb,0xef2cc));var label=_0x4e2355(0x1d7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4e2355(0x253)](function(_0x2a1b65){const _0x3ca1a4=_0x4e2355;return _0x2a1b65[_0x3ca1a4(0x28f)]&&_0x2a1b65[_0x3ca1a4(0x27b)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4e2355(0x2fb)]=VisuMZ[label][_0x4e2355(0x2fb)]||{},VisuMZ[_0x4e2355(0x2b9)]=function(_0x388aa4,_0x33453c){const _0x3f1ee8=_0x4e2355;for(const _0x3db5b0 in _0x33453c){if(_0x3db5b0[_0x3f1ee8(0x2c8)](/(.*):(.*)/i)){const _0x166302=String(RegExp['$1']),_0xeb5e1b=String(RegExp['$2'])[_0x3f1ee8(0x227)]()[_0x3f1ee8(0x200)]();let _0x16ae3a,_0x1cd530,_0x2c9196;switch(_0xeb5e1b){case _0x3f1ee8(0x25d):_0x16ae3a=_0x33453c[_0x3db5b0]!==''?Number(_0x33453c[_0x3db5b0]):0x0;break;case'ARRAYNUM':_0x1cd530=_0x33453c[_0x3db5b0]!==''?JSON[_0x3f1ee8(0x2e3)](_0x33453c[_0x3db5b0]):[],_0x16ae3a=_0x1cd530[_0x3f1ee8(0x2a4)](_0x5ead97=>Number(_0x5ead97));break;case _0x3f1ee8(0x1d9):_0x16ae3a=_0x33453c[_0x3db5b0]!==''?eval(_0x33453c[_0x3db5b0]):null;break;case _0x3f1ee8(0x1d2):_0x1cd530=_0x33453c[_0x3db5b0]!==''?JSON[_0x3f1ee8(0x2e3)](_0x33453c[_0x3db5b0]):[],_0x16ae3a=_0x1cd530[_0x3f1ee8(0x2a4)](_0x10c30e=>eval(_0x10c30e));break;case _0x3f1ee8(0x2b1):_0x16ae3a=_0x33453c[_0x3db5b0]!==''?JSON['parse'](_0x33453c[_0x3db5b0]):'';break;case _0x3f1ee8(0x256):_0x1cd530=_0x33453c[_0x3db5b0]!==''?JSON[_0x3f1ee8(0x2e3)](_0x33453c[_0x3db5b0]):[],_0x16ae3a=_0x1cd530['map'](_0xd08cf4=>JSON[_0x3f1ee8(0x2e3)](_0xd08cf4));break;case _0x3f1ee8(0x288):_0x16ae3a=_0x33453c[_0x3db5b0]!==''?new Function(JSON['parse'](_0x33453c[_0x3db5b0])):new Function(_0x3f1ee8(0x245));break;case _0x3f1ee8(0x239):_0x1cd530=_0x33453c[_0x3db5b0]!==''?JSON[_0x3f1ee8(0x2e3)](_0x33453c[_0x3db5b0]):[],_0x16ae3a=_0x1cd530[_0x3f1ee8(0x2a4)](_0x41c0df=>new Function(JSON[_0x3f1ee8(0x2e3)](_0x41c0df)));break;case _0x3f1ee8(0x2d1):_0x16ae3a=_0x33453c[_0x3db5b0]!==''?String(_0x33453c[_0x3db5b0]):'';break;case _0x3f1ee8(0x234):_0x1cd530=_0x33453c[_0x3db5b0]!==''?JSON['parse'](_0x33453c[_0x3db5b0]):[],_0x16ae3a=_0x1cd530['map'](_0x27ec17=>String(_0x27ec17));break;case _0x3f1ee8(0x2c9):_0x2c9196=_0x33453c[_0x3db5b0]!==''?JSON[_0x3f1ee8(0x2e3)](_0x33453c[_0x3db5b0]):{},_0x16ae3a=VisuMZ[_0x3f1ee8(0x2b9)]({},_0x2c9196);break;case'ARRAYSTRUCT':_0x1cd530=_0x33453c[_0x3db5b0]!==''?JSON['parse'](_0x33453c[_0x3db5b0]):[],_0x16ae3a=_0x1cd530[_0x3f1ee8(0x2a4)](_0x23348c=>VisuMZ[_0x3f1ee8(0x2b9)]({},JSON[_0x3f1ee8(0x2e3)](_0x23348c)));break;default:continue;}_0x388aa4[_0x166302]=_0x16ae3a;}}return _0x388aa4;},(_0x1c93a4=>{const _0x19e8c0=_0x4e2355,_0x354458=_0x1c93a4[_0x19e8c0(0x2cf)];for(const _0x21e67f of dependencies){if(!Imported[_0x21e67f]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x19e8c0(0x1ae)](_0x354458,_0x21e67f)),SceneManager[_0x19e8c0(0x2d9)]();break;}}const _0x13741b=_0x1c93a4[_0x19e8c0(0x27b)];if(_0x13741b[_0x19e8c0(0x2c8)](/\[Version[ ](.*?)\]/i)){const _0x348543=Number(RegExp['$1']);_0x348543!==VisuMZ[label][_0x19e8c0(0x2f5)]&&(alert(_0x19e8c0(0x2d0)[_0x19e8c0(0x1ae)](_0x354458,_0x348543)),SceneManager[_0x19e8c0(0x2d9)]());}if(_0x13741b[_0x19e8c0(0x2c8)](/\[Tier[ ](\d+)\]/i)){const _0x477a5c=Number(RegExp['$1']);_0x477a5c<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x19e8c0(0x1ae)](_0x354458,_0x477a5c,tier)),SceneManager[_0x19e8c0(0x2d9)]()):tier=Math[_0x19e8c0(0x230)](_0x477a5c,tier);}VisuMZ[_0x19e8c0(0x2b9)](VisuMZ[label][_0x19e8c0(0x2fb)],_0x1c93a4['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x4e2355(0x207),_0x3a2a6f=>{const _0x34ae9e=_0x4e2355;VisuMZ['ConvertParams'](_0x3a2a6f,_0x3a2a6f);const _0xa9e3bb=_0x3a2a6f[_0x34ae9e(0x1cc)][_0x34ae9e(0x2a4)](_0x5db359=>$gameActors[_0x34ae9e(0x2a2)](_0x5db359))['remove'](null),_0x1ad3c5=_0x3a2a6f['TPModeName'];for(const _0x5e57ce of _0xa9e3bb){if(!_0x5e57ce)continue;_0x5e57ce['changeTpMode'](_0x1ad3c5);}}),PluginManager['registerCommand'](pluginData['name'],_0x4e2355(0x2e1),_0x2f647a=>{const _0x24c591=_0x4e2355;VisuMZ[_0x24c591(0x2b9)](_0x2f647a,_0x2f647a);const _0x40a253=_0x2f647a['Actors'][_0x24c591(0x2a4)](_0x556dbc=>$gameActors[_0x24c591(0x2a2)](_0x556dbc))[_0x24c591(0x26d)](null),_0x32b7a3=_0x2f647a[_0x24c591(0x1ec)];for(const _0x2f40f6 of _0x40a253){if(!_0x2f40f6)continue;for(const _0x2a0123 of _0x32b7a3){_0x2f40f6[_0x24c591(0x205)](_0x2a0123);}}}),PluginManager[_0x4e2355(0x1df)](pluginData['name'],'ActorUnlockAllTPModes',_0x324c72=>{const _0x3c1fc2=_0x4e2355;VisuMZ[_0x3c1fc2(0x2b9)](_0x324c72,_0x324c72);const _0x3d1a94=_0x324c72[_0x3c1fc2(0x1cc)][_0x3c1fc2(0x2a4)](_0x127603=>$gameActors['actor'](_0x127603))[_0x3c1fc2(0x26d)](null),_0x17d42c=VisuMZ['EnhancedTP'][_0x3c1fc2(0x273)];for(const _0x7c2d61 of _0x3d1a94){if(!_0x7c2d61)continue;for(const _0xfcec27 of _0x17d42c){_0x7c2d61[_0x3c1fc2(0x205)](_0xfcec27);}}}),PluginManager[_0x4e2355(0x1df)](pluginData[_0x4e2355(0x2cf)],'EnemyChangeTPMode',_0x4f7795=>{const _0x3ec979=_0x4e2355;VisuMZ['ConvertParams'](_0x4f7795,_0x4f7795);const _0x5eb282=_0x4f7795['Enemies'][_0x3ec979(0x2a4)](_0x48167a=>$gameTroop['members']()[_0x48167a])[_0x3ec979(0x26d)](null),_0x56af3c=_0x4f7795[_0x3ec979(0x2ef)];for(const _0x2b8e2e of _0x5eb282){if(!_0x2b8e2e)continue;_0x2b8e2e[_0x3ec979(0x1d3)](_0x56af3c);}}),PluginManager[_0x4e2355(0x1df)](pluginData['name'],_0x4e2355(0x270),_0x10ae22=>{const _0x4fcfcb=_0x4e2355;VisuMZ[_0x4fcfcb(0x2b9)](_0x10ae22,_0x10ae22),$gameSystem[_0x4fcfcb(0x1f8)](_0x10ae22[_0x4fcfcb(0x29e)]);}),VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x1c4)]=Scene_Boot[_0x4e2355(0x1e0)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x4e2355(0x252)]=function(){const _0x149d03=_0x4e2355;VisuMZ[_0x149d03(0x1d7)][_0x149d03(0x1c4)]['call'](this),this[_0x149d03(0x2da)]();},Scene_Boot['prototype'][_0x4e2355(0x2da)]=function(){const _0x2a195f=_0x4e2355;VisuMZ[_0x2a195f(0x1d7)][_0x2a195f(0x2b7)]={},VisuMZ[_0x2a195f(0x1d7)][_0x2a195f(0x273)]=[];for(const _0x35d64c of VisuMZ[_0x2a195f(0x1d7)]['Settings'][_0x2a195f(0x2f3)]){if(!_0x35d64c)continue;_0x35d64c[_0x2a195f(0x27b)]=_0x35d64c[_0x2a195f(0x1dc)][_0x2a195f(0x1ae)](TextManager['tp']),this[_0x2a195f(0x1ca)](_0x35d64c);const _0x32945b=_0x35d64c['Name'][_0x2a195f(0x227)]()[_0x2a195f(0x200)]();VisuMZ[_0x2a195f(0x1d7)][_0x2a195f(0x2b7)][_0x32945b]=_0x35d64c,VisuMZ[_0x2a195f(0x1d7)][_0x2a195f(0x273)]['push'](_0x32945b);}},Scene_Boot[_0x4e2355(0x1e0)][_0x4e2355(0x1ca)]=function(_0x2f079e){const _0x1c8514=_0x4e2355,_0x2aad98=[_0x1c8514(0x222),_0x1c8514(0x1fa),_0x1c8514(0x223),_0x1c8514(0x1da),_0x1c8514(0x23e),_0x1c8514(0x214),'TpRegen',_0x1c8514(0x1f5),_0x1c8514(0x2b4),_0x1c8514(0x1bd),_0x1c8514(0x22b),_0x1c8514(0x2d7),_0x1c8514(0x20b),_0x1c8514(0x1ef),_0x1c8514(0x2c0),_0x1c8514(0x29d),'DealHpHeal',_0x1c8514(0x25f),_0x1c8514(0x2a6),_0x1c8514(0x259),_0x1c8514(0x20d),_0x1c8514(0x290),_0x1c8514(0x2b5),_0x1c8514(0x2e0),_0x1c8514(0x1eb),'DealEnemyBuff',_0x1c8514(0x1f9),_0x1c8514(0x2a7),'DealAllyDebuff',_0x1c8514(0x28b),_0x1c8514(0x215),_0x1c8514(0x2b3),_0x1c8514(0x1d5),_0x1c8514(0x241),_0x1c8514(0x27f),'GainEnemyState','KillAlly',_0x1c8514(0x257),_0x1c8514(0x1d1),'FleeBattle',_0x1c8514(0x1fc)];for(const _0x58b6c9 of _0x2aad98){const _0x4d3614=_0x1c8514(0x2a9)[_0x1c8514(0x1ae)](_0x2f079e[_0x58b6c9]);_0x2f079e[_0x1c8514(0x21d)[_0x1c8514(0x1ae)](_0x58b6c9)]=new Function(_0x1c8514(0x1f0),_0x1c8514(0x2a5),_0x1c8514(0x2e9),_0x4d3614);}},TextManager['tpModesCommandText']=VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2fb)][_0x4e2355(0x208)][_0x4e2355(0x1dd)],ColorManager['getColor']=function(_0x1fc123){const _0x251157=_0x4e2355;return _0x1fc123=String(_0x1fc123),_0x1fc123[_0x251157(0x2c8)](/#(.*)/i)?_0x251157(0x298)['format'](String(RegExp['$1'])):this['textColor'](Number(_0x1fc123));},ImageManager[_0x4e2355(0x210)]=VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2fb)]['General']['TpModeIcon'],VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2b2)]=BattleManager[_0x4e2355(0x280)],BattleManager[_0x4e2355(0x280)]=function(){const _0xb051cd=_0x4e2355;VisuMZ[_0xb051cd(0x1d7)][_0xb051cd(0x2b2)][_0xb051cd(0x2c7)](this),$gameParty['gainTpFromTpMode'](_0xb051cd(0x1d1),$gameParty[_0xb051cd(0x2ab)](),0x0);},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x204)]=BattleManager['onEscapeSuccess'],BattleManager[_0x4e2355(0x209)]=function(){const _0x33cf40=_0x4e2355;VisuMZ['EnhancedTP'][_0x33cf40(0x204)][_0x33cf40(0x2c7)](this),$gameParty[_0x33cf40(0x2ba)]('FleeBattle',$gameParty[_0x33cf40(0x2ab)](),0x0);},VisuMZ['EnhancedTP'][_0x4e2355(0x1fe)]=BattleManager[_0x4e2355(0x26a)],BattleManager[_0x4e2355(0x26a)]=function(){const _0xe4f216=_0x4e2355;VisuMZ[_0xe4f216(0x1d7)]['BattleManager_processDefeat'][_0xe4f216(0x2c7)](this),$gameParty[_0xe4f216(0x2ba)]('LoseBattle',$gameParty[_0xe4f216(0x2ab)](),0x0);},VisuMZ['EnhancedTP'][_0x4e2355(0x243)]=Game_System[_0x4e2355(0x1e0)][_0x4e2355(0x1c1)],Game_System['prototype'][_0x4e2355(0x1c1)]=function(){const _0x294554=_0x4e2355;VisuMZ['EnhancedTP'][_0x294554(0x243)][_0x294554(0x2c7)](this),this[_0x294554(0x22c)]();},Game_System[_0x4e2355(0x1e0)]['initEnhancedTP']=function(){const _0x1f0516=_0x4e2355;this[_0x1f0516(0x25e)]=VisuMZ['EnhancedTP'][_0x1f0516(0x2fb)][_0x1f0516(0x208)]['ShowTpMode'];},Game_System[_0x4e2355(0x1e0)]['showTpModeInSceneSkill']=function(){const _0x17828a=_0x4e2355;if(this['_tpMode_SceneSkill']===undefined)this['initEnhancedTP']();return this[_0x17828a(0x25e)];},Game_System[_0x4e2355(0x1e0)][_0x4e2355(0x1f8)]=function(_0x198563){const _0x1a83e4=_0x4e2355;if(this[_0x1a83e4(0x25e)]===undefined)this[_0x1a83e4(0x22c)]();this[_0x1a83e4(0x25e)]=_0x198563;},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x294)]=Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x22e)],Game_Action['prototype'][_0x4e2355(0x22e)]=function(_0x71a20a){const _0x587592=_0x4e2355;VisuMZ[_0x587592(0x1d7)]['Game_Action_apply'][_0x587592(0x2c7)](this,_0x71a20a),this[_0x587592(0x285)](_0x71a20a);},Game_Action[_0x4e2355(0x1e0)]['applyEnhancedTP']=function(_0x320bc8){const _0x1bee4e=_0x4e2355,_0x28f9a8=_0x320bc8[_0x1bee4e(0x2c5)]();_0x28f9a8[_0x1bee4e(0x1b4)]&&this[_0x1bee4e(0x27a)]()[_0x1bee4e(0x2ba)]('CriticalHit',_0x320bc8,0x0),(_0x28f9a8[_0x1bee4e(0x1d6)]||_0x28f9a8[_0x1bee4e(0x26e)])&&_0x320bc8[_0x1bee4e(0x2ba)](_0x1bee4e(0x1da),_0x320bc8,0x0);},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2f9)]=Game_Action[_0x4e2355(0x1e0)]['executeHpDamage'],Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x2c4)]=function(_0x4a42c3,_0x218d4f){const _0x491a29=_0x4e2355;VisuMZ['EnhancedTP'][_0x491a29(0x2f9)][_0x491a29(0x2c7)](this,_0x4a42c3,_0x218d4f);const _0x3be37c=this[_0x491a29(0x27a)]();_0x218d4f>0x0?(_0x4a42c3[_0x491a29(0x2ba)](_0x491a29(0x20b),_0x4a42c3,_0x218d4f),_0x3be37c['gainTpFromTpMode'](_0x491a29(0x1ef),_0x4a42c3,_0x218d4f),_0x4a42c3[_0x491a29(0x2bc)]()[_0x491a29(0x2ba)]('AllyHpDmg',_0x4a42c3,_0x218d4f)):(_0x218d4f=Math[_0x491a29(0x1bb)](_0x218d4f),_0x4a42c3[_0x491a29(0x2ba)](_0x491a29(0x29d),_0x4a42c3,_0x218d4f),_0x3be37c[_0x491a29(0x2ba)](_0x491a29(0x2e4),_0x4a42c3,_0x218d4f),_0x4a42c3['friendsUnit']()[_0x491a29(0x2ba)](_0x491a29(0x25f),_0x4a42c3,_0x218d4f));},VisuMZ[_0x4e2355(0x1d7)]['Game_Action_executeMpDamage']=Game_Action['prototype'][_0x4e2355(0x1fb)],Game_Action['prototype'][_0x4e2355(0x1fb)]=function(_0x2c2170,_0x224b67){const _0x2714de=_0x4e2355;VisuMZ[_0x2714de(0x1d7)][_0x2714de(0x28e)][_0x2714de(0x2c7)](this,_0x2c2170,_0x224b67);const _0x39789b=this[_0x2714de(0x27a)]();_0x224b67>0x0?(_0x2c2170[_0x2714de(0x2ba)]('TakeMpDmg',_0x2c2170,_0x224b67),_0x39789b['gainTpFromTpMode'](_0x2714de(0x259),_0x2c2170,_0x224b67),_0x2c2170[_0x2714de(0x2bc)]()[_0x2714de(0x2ba)]('AllyMpDmg',_0x2c2170,_0x224b67)):(_0x224b67=Math['abs'](_0x224b67),_0x2c2170[_0x2714de(0x2ba)](_0x2714de(0x290),_0x2c2170,_0x224b67),_0x39789b[_0x2714de(0x2ba)]('DealMpHeal',_0x2c2170,_0x224b67),_0x2c2170[_0x2714de(0x2bc)]()[_0x2714de(0x2ba)](_0x2714de(0x2e0),_0x2c2170,_0x224b67));},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x1bf)]=Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x1fd)],Game_Action[_0x4e2355(0x1e0)]['itemEffectAddBuff']=function(_0x413355,_0x582889){const _0x5272b6=_0x4e2355;VisuMZ[_0x5272b6(0x1d7)][_0x5272b6(0x1bf)][_0x5272b6(0x2c7)](this,_0x413355,_0x582889);if(!_0x413355['result']()['success'])return;const _0x4303b2=this[_0x5272b6(0x27a)]();_0x4303b2[_0x5272b6(0x20a)]()===_0x413355[_0x5272b6(0x20a)]()?(_0x4303b2['gainTpFromTpMode']('DealAllyBuff',_0x413355,0x0),_0x413355[_0x5272b6(0x2ba)](_0x5272b6(0x1f9),_0x413355,0x0)):(_0x4303b2[_0x5272b6(0x2ba)](_0x5272b6(0x23d),_0x413355,0x0),_0x413355['gainTpFromTpMode'](_0x5272b6(0x2a7),_0x413355,0x0));},VisuMZ['EnhancedTP'][_0x4e2355(0x2cb)]=Game_Action['prototype'][_0x4e2355(0x284)],Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x284)]=function(_0x48db2a,_0x45b43d){const _0x3aef3c=_0x4e2355;VisuMZ[_0x3aef3c(0x1d7)][_0x3aef3c(0x2cb)][_0x3aef3c(0x2c7)](this,_0x48db2a,_0x45b43d);if(!_0x48db2a[_0x3aef3c(0x2c5)]()[_0x3aef3c(0x2e5)])return;const _0x3e3b21=this[_0x3aef3c(0x27a)]();_0x3e3b21['isActor']()===_0x48db2a[_0x3aef3c(0x20a)]()?(_0x3e3b21[_0x3aef3c(0x2ba)](_0x3aef3c(0x2fa),_0x48db2a,0x0),_0x48db2a[_0x3aef3c(0x2ba)](_0x3aef3c(0x215),_0x48db2a,0x0)):(_0x3e3b21[_0x3aef3c(0x2ba)](_0x3aef3c(0x28b),_0x48db2a,0x0),_0x48db2a['gainTpFromTpMode']('GainEnemyDebuff',_0x48db2a,0x0));},VisuMZ['EnhancedTP'][_0x4e2355(0x263)]=Game_Action['prototype'][_0x4e2355(0x26f)],Game_Action['prototype'][_0x4e2355(0x26f)]=function(_0x1d08b0,_0x30f013){const _0x15ef92=_0x4e2355,_0x2f9814=_0x1d08b0[_0x15ef92(0x2c5)]()[_0x15ef92(0x2e5)];_0x1d08b0['result']()[_0x15ef92(0x2e5)]=![],VisuMZ[_0x15ef92(0x1d7)]['Game_Action_itemEffectAddState'][_0x15ef92(0x2c7)](this,_0x1d08b0,_0x30f013);if(!_0x1d08b0[_0x15ef92(0x2c5)]()['success']){_0x1d08b0[_0x15ef92(0x2c5)]()[_0x15ef92(0x2e5)]=_0x2f9814;return;}const _0x356a4c=this['subject']();_0x356a4c['isActor']()===_0x1d08b0[_0x15ef92(0x20a)]()?(_0x356a4c[_0x15ef92(0x2ba)](_0x15ef92(0x1d5),_0x1d08b0,0x0),_0x1d08b0['gainTpFromTpMode'](_0x15ef92(0x27f),_0x1d08b0,0x0)):(_0x356a4c[_0x15ef92(0x2ba)](_0x15ef92(0x241),_0x1d08b0,0x0),_0x1d08b0[_0x15ef92(0x2ba)](_0x15ef92(0x264),_0x1d08b0,0x0));},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x24c)]=Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x23b)],Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x23b)]=function(_0x5001dc){const _0x588f72=_0x4e2355;VisuMZ[_0x588f72(0x1d7)][_0x588f72(0x24c)]['call'](this,_0x5001dc),this[_0x588f72(0x1ee)](_0x5001dc);},Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x1ee)]=function(_0x5a046f){const _0x5c7362=_0x4e2355;if(!_0x5a046f)return;const _0x194253=this[_0x5c7362(0x22f)]()['note'],_0x2a0aa9=this[_0x5c7362(0x27a)]();_0x194253[_0x5c7362(0x2c8)](/<CHANGE TARGET TP MODE: (.*)>/i)&&_0x5a046f[_0x5c7362(0x1d3)](String(RegExp['$1']));if(!_0x5a046f[_0x5c7362(0x20a)]())return;const _0x35d80b=_0x194253['match'](/<UNLOCK TP MODE: (.*)>/gi);if(_0x35d80b)for(const _0x577378 of _0x35d80b){_0x577378[_0x5c7362(0x2c8)](/<UNLOCK TP MODE: (.*)>/i),_0x5a046f[_0x5c7362(0x205)](String(RegExp['$1']));}if(_0x194253[_0x5c7362(0x2c8)](/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i)){const _0x47eff5=String(RegExp['$1'])[_0x5c7362(0x295)](/[\r\n]+/);for(const _0x2dc180 of _0x47eff5){_0x5a046f['learnTpMode'](_0x2dc180);}}},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x249)]=Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x2dd)],Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x2dd)]=function(){const _0x4f32d9=_0x4e2355;VisuMZ['EnhancedTP']['Game_Action_applyGlobal'][_0x4f32d9(0x2c7)](this),this[_0x4f32d9(0x1f6)]();},Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x1f6)]=function(){const _0x37e123=_0x4e2355,_0x7fcf38=this[_0x37e123(0x22f)]()[_0x37e123(0x250)],_0x1714c4=this['subject']();_0x7fcf38['match'](/<CHANGE USER TP MODE: (.*)>/i)&&_0x1714c4[_0x37e123(0x1d3)](String(RegExp['$1']));},VisuMZ['EnhancedTP'][_0x4e2355(0x2be)]=Game_Action['prototype'][_0x4e2355(0x22d)],Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x22d)]=function(_0x36e63d){const _0x9ecdc9=_0x4e2355;if(this[_0x9ecdc9(0x2d8)](_0x36e63d))return!![];return VisuMZ[_0x9ecdc9(0x1d7)][_0x9ecdc9(0x2be)][_0x9ecdc9(0x2c7)](this,_0x36e63d);},Game_Action[_0x4e2355(0x1e0)][_0x4e2355(0x2d8)]=function(_0x2c76b6){const _0x49abb9=_0x4e2355;if(!this['item']())return![];const _0x5a00d1=this[_0x49abb9(0x22f)]()['note'],_0x250859=[/<CHANGE USER TP MODE: (.*)>/i,/<CHANGE TARGET TP MODE: (.*)>/i,/<UNLOCK TP MODE: (.*)>/gi,/<UNLOCK TP MODES>\s*([\s\S]*)\s*<\/UNLOCK TP MODES>/i];for(const _0x1ba839 of _0x250859){if(_0x5a00d1['match'](_0x1ba839))return!![];}return![];},Game_BattlerBase['prototype'][_0x4e2355(0x22c)]=function(){const _0x5ba714=_0x4e2355;this[_0x5ba714(0x1d3)](this[_0x5ba714(0x28c)]());},Game_BattlerBase[_0x4e2355(0x1e0)]['changeTpMode']=function(_0x3dc710){const _0x2af9a6=_0x4e2355;_0x3dc710=_0x3dc710['toUpperCase']()[_0x2af9a6(0x200)]();if(!VisuMZ[_0x2af9a6(0x1d7)]['TpModes'][_0x3dc710])return;this[_0x2af9a6(0x1cb)]=_0x3dc710,this[_0x2af9a6(0x2ec)](_0x3dc710);},Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x28c)]=function(){const _0x46b020=_0x4e2355;return VisuMZ['EnhancedTP'][_0x46b020(0x2fb)][_0x46b020(0x208)][_0x46b020(0x260)][_0x46b020(0x227)]()[_0x46b020(0x200)]();},Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x1f2)]=function(){const _0x4565aa=_0x4e2355;if(this[_0x4565aa(0x1cb)]===undefined)this[_0x4565aa(0x22c)]();let _0x1c6042=this[_0x4565aa(0x1cb)];for(const _0x2044ab of this['traitObjects']()){if(!_0x2044ab)continue;if(_0x2044ab[_0x4565aa(0x250)]['match'](/<FORCE TP MODE: (.*)>/i)){const _0x3330cf=String(RegExp['$1'])[_0x4565aa(0x227)]()[_0x4565aa(0x200)]();if(!VisuMZ['EnhancedTP'][_0x4565aa(0x2b7)][_0x3330cf])continue;_0x1c6042=_0x3330cf;break;}}return VisuMZ['EnhancedTP'][_0x4565aa(0x2b7)][_0x1c6042[_0x4565aa(0x227)]()[_0x4565aa(0x200)]()];},Game_BattlerBase[_0x4e2355(0x1e0)]['tpModeValue']=function(_0x3df4c,_0x273406,_0xd0d52c){const _0x4e7430=_0x4e2355,_0x5c995f=this[_0x4e7430(0x1f2)]();if(!_0x5c995f)return 0x0;_0x3df4c=_0x4e7430(0x21d)[_0x4e7430(0x1ae)](_0x3df4c);if(!_0x5c995f[_0x3df4c])return 0x0;try{let _0xaf858e=_0x5c995f[_0x3df4c](this,_0x273406,_0xd0d52c);if(isNaN(_0xaf858e)||_0xaf858e===undefined||_0xaf858e===null){if($gameTemp[_0x4e7430(0x2e7)]()){const _0x1d477f=_0x273406[_0x4e7430(0x1cb)]||'Unnamed\x20Mode';console[_0x4e7430(0x25c)]('ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3'[_0x4e7430(0x1ae)](_0x273406[_0x4e7430(0x2cf)](),_0x1d477f,_0x3df4c));}_0xaf858e=0x0;}return _0xaf858e;}catch(_0xc72a9b){if($gameTemp[_0x4e7430(0x2e7)]()){const _0x61b614=_0x273406[_0x4e7430(0x1cb)]||_0x4e7430(0x2f2);console['log']('ERROR\x20-\x20Bad\x20JavaScript\x20TP\x20Formula:\x20%1,\x20%2,\x20%3'[_0x4e7430(0x1ae)](_0x273406['name'](),_0x61b614,_0x3df4c));}return 0x0;}},VisuMZ['EnhancedTP'][_0x4e2355(0x219)]=Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x282)],Game_Battler[_0x4e2355(0x1e0)]['gainSilentTp']=function(_0x1a4477){const _0x5c9510=_0x4e2355;this[_0x5c9510(0x23f)]?this[_0x5c9510(0x2ea)]=(this['_tp']+_0x1a4477)[_0x5c9510(0x287)](0x0,this['maxTp']()):VisuMZ[_0x5c9510(0x1d7)][_0x5c9510(0x219)][_0x5c9510(0x2c7)](this,_0x1a4477);},Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x2ba)]=function(_0x1c7852,_0x4db4bc,_0x38d21d){const _0x5c0f5f=_0x4e2355,_0x3dd841=Math['floor'](this['tpModeValue'](_0x1c7852,_0x4db4bc,_0x38d21d));this[_0x5c0f5f(0x282)](_0x3dd841);},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x1f1)]=Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x29a)],Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x29a)]=function(){const _0xdabda5=_0x4e2355;if(this['tpMode']())return Math['floor'](this[_0xdabda5(0x1f2)]()[_0xdabda5(0x1f7)](this,this,0x0));return VisuMZ[_0xdabda5(0x1d7)][_0xdabda5(0x1f1)][_0xdabda5(0x2c7)](this);},VisuMZ['EnhancedTP'][_0x4e2355(0x2db)]=Game_BattlerBase['prototype'][_0x4e2355(0x29c)],Game_BattlerBase[_0x4e2355(0x1e0)]['isPreserveTp']=function(){const _0x45a880=_0x4e2355;if(!$gameParty[_0x45a880(0x2af)]())return!![];if(this[_0x45a880(0x1f2)]())return this[_0x45a880(0x1f2)]()[_0x45a880(0x232)];return VisuMZ[_0x45a880(0x1d7)][_0x45a880(0x2db)]['call'](this);},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x1e3)]=Game_Actor[_0x4e2355(0x1e0)][_0x4e2355(0x29c)],Game_Actor[_0x4e2355(0x1e0)]['isPreserveTp']=function(){const _0x3fdcbc=_0x4e2355;if(!$gameParty[_0x3fdcbc(0x2af)]())return!![];if(this[_0x3fdcbc(0x1f2)]())return this[_0x3fdcbc(0x1f2)]()[_0x3fdcbc(0x232)];return VisuMZ[_0x3fdcbc(0x1d7)][_0x3fdcbc(0x1e3)][_0x3fdcbc(0x2c7)](this);},VisuMZ[_0x4e2355(0x1d7)]['Game_Unit_onBattleStart']=Game_Unit[_0x4e2355(0x1e0)][_0x4e2355(0x28d)],Game_Unit[_0x4e2355(0x1e0)]['onBattleStart']=function(_0x413520){const _0x520fb2=_0x4e2355;this[_0x520fb2(0x1b9)]=!![],VisuMZ['EnhancedTP'][_0x520fb2(0x2ed)][_0x520fb2(0x2c7)](this,_0x413520);},VisuMZ['EnhancedTP'][_0x4e2355(0x274)]=Game_Unit['prototype'][_0x4e2355(0x212)],Game_Unit[_0x4e2355(0x1e0)][_0x4e2355(0x212)]=function(){const _0x305f90=_0x4e2355;if(this===$gameParty)for(const _0x2f1dde of this[_0x305f90(0x283)]()){if(!_0x2f1dde)continue;if(_0x2f1dde[_0x305f90(0x29c)]())continue;_0x2f1dde[_0x305f90(0x2f6)]();}VisuMZ[_0x305f90(0x1d7)][_0x305f90(0x274)][_0x305f90(0x2c7)](this);},VisuMZ['EnhancedTP'][_0x4e2355(0x2e8)]=Game_BattlerBase[_0x4e2355(0x1e0)]['sparam'],Game_BattlerBase['prototype'][_0x4e2355(0x23a)]=function(_0x5b957b){const _0x23b194=_0x4e2355;let _0xd87fe6=VisuMZ[_0x23b194(0x1d7)][_0x23b194(0x2e8)][_0x23b194(0x2c7)](this,_0x5b957b);return _0x5b957b===0x5&&this[_0x23b194(0x1f2)]()&&(_0xd87fe6*=this['tpMode']()[_0x23b194(0x1d0)]),_0xd87fe6;},Game_BattlerBase['prototype']['isTpGaugeFlashing']=function(){const _0x59ecc7=_0x4e2355;if(!Imported[_0x59ecc7(0x1d8)])return![];const _0x26ea17=this[_0x59ecc7(0x1f2)]();if(!_0x26ea17)return![];if(!_0x26ea17[_0x59ecc7(0x1e9)])return![];const _0x4810ee=_0x26ea17['FlashRequirement']||0x0;return this['tpRate']()>=_0x4810ee;},Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x2bf)]=function(){const _0x3d7c25=this['tpMode']();if(!_0x3d7c25)return![];return(_0x3d7c25['FlashSpeed']||0x1)['clamp'](0x1,0xff);},Game_BattlerBase[_0x4e2355(0x1e0)][_0x4e2355(0x27d)]=function(){const _0x1ed911=_0x4e2355,_0xbc5348=this[_0x1ed911(0x1f2)]();if(!_0xbc5348)return![];return(_0xbc5348[_0x1ed911(0x1c6)]||0x0)[_0x1ed911(0x287)](0x0,0xff);},Game_Battler['prototype'][_0x4e2355(0x29b)]=function(){},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2e6)]=Game_Battler['prototype'][_0x4e2355(0x28d)],Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x28d)]=function(_0x337bdf){const _0x3600f7=_0x4e2355;VisuMZ['EnhancedTP'][_0x3600f7(0x2e6)][_0x3600f7(0x2c7)](this,_0x337bdf),this['gainTpFromTpMode'](_0x3600f7(0x1fa),this,0x0);},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x1cf)]=Game_Battler['prototype']['useItem'],Game_Battler[_0x4e2355(0x1e0)]['useItem']=function(_0x163d8e){const _0x15514d=_0x4e2355;VisuMZ[_0x15514d(0x1d7)][_0x15514d(0x1cf)][_0x15514d(0x2c7)](this,_0x163d8e),this['skillIsNotAttackGuard'](_0x163d8e)&&this[_0x15514d(0x2ba)](_0x15514d(0x214),this,0x0),DataManager[_0x15514d(0x2b0)](_0x163d8e)&&this[_0x15514d(0x2ba)](_0x15514d(0x23e),this,0x0);},Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x25a)]=function(_0xb6a91){const _0x3c51aa=_0x4e2355;if(!_0xb6a91)return![];if(!DataManager['isSkill'](_0xb6a91))return![];if(_0xb6a91['id']===this[_0x3c51aa(0x2a3)]())return![];if(_0xb6a91['id']===this[_0x3c51aa(0x292)]())return![];return!![];},VisuMZ[_0x4e2355(0x1d7)]['Game_Battler_regenerateTp']=Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x1c9)],Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x1c9)]=function(){const _0x177a3c=_0x4e2355;if(!$gameParty[_0x177a3c(0x2af)]())return![];;this['_regeneratingTp']=!![];const _0x54824c=Math[_0x177a3c(0x1e7)](this['maxTp']()*this['trg']);this[_0x177a3c(0x282)](_0x54824c),this[_0x177a3c(0x2ba)]('TpRegen',this,0x0),this['_hp']<this[_0x177a3c(0x2ac)]/0x4&&this['gainTpFromTpMode'](_0x177a3c(0x1f5),this,0x0),this[_0x177a3c(0x1cd)]>=this['mhp']&&this[_0x177a3c(0x2ba)]('FullHp',this,0x0),this[_0x177a3c(0x24e)]<this[_0x177a3c(0x1c0)]/0x4&&this[_0x177a3c(0x2ba)]('CriticalMp',this,0x0),this[_0x177a3c(0x24e)]>=this[_0x177a3c(0x1c0)]&&this[_0x177a3c(0x2ba)]('FullMp',this,0x0),this[_0x177a3c(0x2bc)]()[_0x177a3c(0x217)]()[_0x177a3c(0x2c1)]<=0x1&&this['gainTpFromTpMode'](_0x177a3c(0x2d7),this,0x0),this[_0x177a3c(0x23f)]=undefined,this['refresh']();},Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x237)]=function(_0x37f0c8){},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x258)]=Game_Battler[_0x4e2355(0x1e0)]['addState'],Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x1ad)]=function(_0x52a178){const _0xcf598b=_0x4e2355,_0x1b127d=this[_0xcf598b(0x266)]();VisuMZ[_0xcf598b(0x1d7)][_0xcf598b(0x258)][_0xcf598b(0x2c7)](this,_0x52a178),_0x52a178===this[_0xcf598b(0x247)]()&&this[_0xcf598b(0x29f)]()&&_0x1b127d&&(this['friendsUnit']()['gainTpFromTpMode'](_0xcf598b(0x240),this,0x0),this[_0xcf598b(0x1f4)]()[_0xcf598b(0x2ba)](_0xcf598b(0x257),this,0x0));},Game_Battler[_0x4e2355(0x1e0)][_0x4e2355(0x2ec)]=function(_0x1425c1){const _0x5a3f24=_0x4e2355;this[_0x5a3f24(0x220)]={},this['_tp']=Math[_0x5a3f24(0x1bc)](this[_0x5a3f24(0x2ea)],this[_0x5a3f24(0x29a)]());},VisuMZ['EnhancedTP'][_0x4e2355(0x2a1)]=Game_Actor['prototype']['setup'],Game_Actor[_0x4e2355(0x1e0)][_0x4e2355(0x226)]=function(_0x97491c){const _0x26a005=_0x4e2355;VisuMZ[_0x26a005(0x1d7)][_0x26a005(0x2a1)][_0x26a005(0x2c7)](this,_0x97491c),this[_0x26a005(0x22c)]();},Game_Actor[_0x4e2355(0x1e0)][_0x4e2355(0x22c)]=function(){const _0x77fb5=_0x4e2355;this[_0x77fb5(0x2d2)]=[],Game_Battler[_0x77fb5(0x1e0)][_0x77fb5(0x22c)][_0x77fb5(0x2c7)](this),this[_0x77fb5(0x265)](),this[_0x77fb5(0x255)]();},Game_Actor['prototype'][_0x4e2355(0x28c)]=function(){const _0x20fb5d=_0x4e2355;return this[_0x20fb5d(0x2a2)]()&&this[_0x20fb5d(0x2a2)]()['note']['match'](/<TP MODE: (.*)>/i)?String(RegExp['$1'])['toUpperCase']()[_0x20fb5d(0x200)]():Game_Battler[_0x20fb5d(0x1e0)][_0x20fb5d(0x28c)]['call'](this);},Game_Actor['prototype'][_0x4e2355(0x2ec)]=function(_0x266c09){const _0x79c278=_0x4e2355;_0x266c09=_0x266c09[_0x79c278(0x227)]()[_0x79c278(0x200)](),Game_Battler[_0x79c278(0x1e0)][_0x79c278(0x2ec)][_0x79c278(0x2c7)](this,_0x266c09),this[_0x79c278(0x205)](_0x266c09);},Game_Actor['prototype'][_0x4e2355(0x205)]=function(_0x1047bc){const _0x159297=_0x4e2355;_0x1047bc=_0x1047bc['toUpperCase']()['trim']();if(!VisuMZ[_0x159297(0x1d7)][_0x159297(0x2b7)][_0x1047bc])return;this[_0x159297(0x2d2)]=this[_0x159297(0x2d2)]||[],!this[_0x159297(0x2d2)]['includes'](_0x1047bc)&&(this[_0x159297(0x2d2)]['push'](_0x1047bc),this[_0x159297(0x2f0)]());},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2f0)]=function(_0x168f00){const _0x2efc03=_0x4e2355,_0x129e03=[];for(const _0x5e58f6 of VisuMZ[_0x2efc03(0x1d7)][_0x2efc03(0x273)]){if(_0x168f00[_0x2efc03(0x21a)](_0x5e58f6))_0x129e03[_0x2efc03(0x2bd)](_0x5e58f6);}return _0x129e03;},Game_Actor['prototype'][_0x4e2355(0x2f0)]=function(){const _0x208cbd=_0x4e2355;if(this[_0x208cbd(0x2d2)]===undefined)this[_0x208cbd(0x22c)]();this[_0x208cbd(0x2d2)]=VisuMZ[_0x208cbd(0x1d7)][_0x208cbd(0x2f0)](this[_0x208cbd(0x2d2)]);},Game_Actor['prototype'][_0x4e2355(0x2b8)]=function(){const _0x46ad40=_0x4e2355;if(this['_availableTpModes']===undefined)this[_0x46ad40(0x22c)]();this[_0x46ad40(0x265)]();let _0x2295c5=this[_0x46ad40(0x2d2)][_0x46ad40(0x2a4)](_0x34af90=>VisuMZ[_0x46ad40(0x1d7)]['TpModes'][_0x34af90]);return _0x2295c5[_0x46ad40(0x26d)](null);},Game_Actor[_0x4e2355(0x1e0)][_0x4e2355(0x265)]=function(){const _0x3fb876=_0x4e2355;for(const _0x56a5e3 of $gameParty[_0x3fb876(0x1e4)]()){this[_0x3fb876(0x205)](_0x56a5e3[_0x3fb876(0x227)]()[_0x3fb876(0x200)]());}},Game_Actor[_0x4e2355(0x1e0)][_0x4e2355(0x255)]=function(){const _0x375fea=_0x4e2355;if(this[_0x375fea(0x2a2)]()&&this[_0x375fea(0x2a2)]()[_0x375fea(0x250)][_0x375fea(0x2c8)](/<STARTING TP (?:MODE|MODES)>\s*([\s\S]*)\s*<\/STARTING TP (?:MODE|MODES)>/i)){const _0x552c80=String(RegExp['$1'])[_0x375fea(0x295)](/[\r\n]+/);for(const _0xdeb913 of _0x552c80){this[_0x375fea(0x205)](_0xdeb913[_0x375fea(0x227)]()[_0x375fea(0x200)]());}}},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x1f3)]=Game_Actor[_0x4e2355(0x1e0)][_0x4e2355(0x2d5)],Game_Actor['prototype'][_0x4e2355(0x2d5)]=function(_0x36c9d8){const _0x7783c=_0x4e2355;VisuMZ[_0x7783c(0x1d7)][_0x7783c(0x1f3)][_0x7783c(0x2c7)](this,_0x36c9d8),this[_0x7783c(0x20c)](_0x36c9d8);},Game_Actor[_0x4e2355(0x1e0)]['learnSkillEnhancedTP']=function(_0x2e9751){const _0x3d0616=_0x4e2355;if(!$dataSkills[_0x2e9751])return;const _0xda989a=$dataSkills[_0x2e9751]['note'],_0x80c05d=_0xda989a['match'](/<LEARN TP MODE: (.*)>/gi);if(_0x80c05d)for(const _0x2d371f of _0x80c05d){_0x2d371f[_0x3d0616(0x2c8)](/<LEARN TP MODE: (.*)>/i),this[_0x3d0616(0x205)](String(RegExp['$1']));}if(_0xda989a[_0x3d0616(0x2c8)](/<LEARN TP MODES>\s*([\s\S]*)\s*<\/LEARN TP MODES>/i)){const _0x2e4a25=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x28da77 of _0x2e4a25){this[_0x3d0616(0x205)](_0x28da77);}}},Game_Enemy[_0x4e2355(0x1e0)][_0x4e2355(0x28c)]=function(){const _0x75dd1d=_0x4e2355;return this[_0x75dd1d(0x2bb)]()[_0x75dd1d(0x250)][_0x75dd1d(0x2c8)](/<TP MODE: (.*)>/i)?String(RegExp['$1'])[_0x75dd1d(0x227)]()['trim']():Game_Battler['prototype']['defaultTpMode'][_0x75dd1d(0x2c7)](this);},Game_Unit[_0x4e2355(0x1e0)]['gainTpFromTpMode']=function(_0x28f897,_0x124d95,_0x5a6e70){const _0x53fb95=_0x4e2355;for(const _0x93fda of this[_0x53fb95(0x217)]()){if(!_0x93fda)continue;_0x93fda[_0x53fb95(0x2ba)](_0x28f897,_0x124d95,_0x5a6e70);}},VisuMZ['EnhancedTP'][_0x4e2355(0x1b6)]=Game_Party[_0x4e2355(0x1e0)][_0x4e2355(0x1c1)],Game_Party[_0x4e2355(0x1e0)]['initialize']=function(){const _0x452d41=_0x4e2355;VisuMZ[_0x452d41(0x1d7)]['Game_Party_initialize'][_0x452d41(0x2c7)](this),this[_0x452d41(0x1c5)]();},Game_Party[_0x4e2355(0x1e0)][_0x4e2355(0x1c5)]=function(){const _0x28a6a1=_0x4e2355;this[_0x28a6a1(0x267)]=[];for(const _0x3272a3 of VisuMZ[_0x28a6a1(0x1d7)][_0x28a6a1(0x2fb)]['General'][_0x28a6a1(0x1b7)]){this[_0x28a6a1(0x267)][_0x28a6a1(0x2bd)](_0x3272a3['toUpperCase']()[_0x28a6a1(0x200)]());}},Game_Party[_0x4e2355(0x1e0)][_0x4e2355(0x1e4)]=function(){const _0xc02c79=_0x4e2355;if(this[_0xc02c79(0x267)]===undefined)this[_0xc02c79(0x1c5)]();return this['_tpModes'];},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2f7)]=Scene_Skill[_0x4e2355(0x1e0)][_0x4e2355(0x23c)],Scene_Skill[_0x4e2355(0x1e0)]['create']=function(){const _0x145896=_0x4e2355;VisuMZ['EnhancedTP'][_0x145896(0x2f7)][_0x145896(0x2c7)](this),this['createTpModeWindow']();},VisuMZ[_0x4e2355(0x1d7)]['Scene_Skill_createSkillTypeWindow']=Scene_Skill['prototype'][_0x4e2355(0x202)],Scene_Skill[_0x4e2355(0x1e0)]['createSkillTypeWindow']=function(){const _0x3efa35=_0x4e2355;VisuMZ[_0x3efa35(0x1d7)][_0x3efa35(0x286)][_0x3efa35(0x2c7)](this),this[_0x3efa35(0x2dc)][_0x3efa35(0x1e2)](_0x3efa35(0x1f2),this[_0x3efa35(0x1af)][_0x3efa35(0x221)](this));},Scene_Skill['prototype'][_0x4e2355(0x25b)]=function(){const _0xe065f2=_0x4e2355,_0x17784c=this[_0xe065f2(0x2aa)]();this[_0xe065f2(0x2c2)]=new Window_TpModes(_0x17784c),this[_0xe065f2(0x2c2)][_0xe065f2(0x248)](this['_helpWindow']),this[_0xe065f2(0x2c2)][_0xe065f2(0x1e2)]('ok',this[_0xe065f2(0x1b1)]['bind'](this)),this[_0xe065f2(0x2c2)]['setHandler'](_0xe065f2(0x201),this['onTpModeCancel'][_0xe065f2(0x221)](this)),this[_0xe065f2(0x242)](this['_tpModeWindow']);const _0x47a27a=VisuMZ[_0xe065f2(0x1d7)][_0xe065f2(0x2fb)]['General'][_0xe065f2(0x26c)];this['_tpModeWindow']['setBackgroundType'](_0x47a27a||0x0);},Scene_Skill[_0x4e2355(0x1e0)][_0x4e2355(0x2aa)]=function(){const _0x165ae7=_0x4e2355,_0x394045=0x0,_0x2230f5=this[_0x165ae7(0x24d)]['y']+this['_statusWindow']['height'],_0x16c69a=Graphics[_0x165ae7(0x2ad)],_0x324ec0=this['mainAreaHeight']()-this[_0x165ae7(0x24d)]['height'];return new Rectangle(_0x394045,_0x2230f5,_0x16c69a,_0x324ec0);},Scene_Skill['prototype']['commandTpMode']=function(){const _0x2af356=_0x4e2355;this[_0x2af356(0x2c2)]['activate'](),this[_0x2af356(0x2c2)]['selectLast']();},Scene_Skill['prototype']['onTpModeOk']=function(){const _0x39d06f=_0x4e2355;this[_0x39d06f(0x2c2)][_0x39d06f(0x291)]();const _0x459246=this[_0x39d06f(0x2c2)][_0x39d06f(0x22f)]();if(!_0x459246)return;this[_0x39d06f(0x2a2)]()[_0x39d06f(0x1d3)](_0x459246['Name']),this[_0x39d06f(0x2c2)][_0x39d06f(0x2d4)](),this[_0x39d06f(0x24d)][_0x39d06f(0x2d4)]();},Scene_Skill['prototype'][_0x4e2355(0x1e8)]=function(){const _0x5046e7=_0x4e2355;this[_0x5046e7(0x2c2)][_0x5046e7(0x2f4)](),this['_skillTypeWindow'][_0x5046e7(0x291)]();},VisuMZ['EnhancedTP'][_0x4e2355(0x277)]=Scene_Skill[_0x4e2355(0x1e0)][_0x4e2355(0x268)],Scene_Skill[_0x4e2355(0x1e0)]['refreshActor']=function(){const _0x5842f2=_0x4e2355;VisuMZ[_0x5842f2(0x1d7)][_0x5842f2(0x277)][_0x5842f2(0x2c7)](this);if(this[_0x5842f2(0x2c2)])this['_tpModeWindow']['setActor'](this[_0x5842f2(0x2a2)]());},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x27c)]=Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x226)],Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x226)]=function(_0x1ed0fe,_0x19a087){const _0x898de5=_0x4e2355;VisuMZ['EnhancedTP'][_0x898de5(0x27c)]['call'](this,_0x1ed0fe,_0x19a087),this[_0x898de5(0x1de)]==='tp'&&(this[_0x898de5(0x1be)](),this[_0x898de5(0x2cc)]());},Sprite_Gauge[_0x4e2355(0x1e0)]['createEnhancedTpChildSprites']=function(){const _0x4071e1=_0x4e2355;!this[_0x4071e1(0x1b8)]&&(this[_0x4071e1(0x1b8)]=new Sprite(),this['addChild'](this['_tpGaugeBack'])),!this[_0x4071e1(0x2de)]&&(this[_0x4071e1(0x2de)]=new Sprite(),this['addChild'](this[_0x4071e1(0x2de)])),!this[_0x4071e1(0x216)]&&(this[_0x4071e1(0x216)]=new Sprite(),this[_0x4071e1(0x2f8)](this[_0x4071e1(0x216)]));},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x2a8)]=Sprite_Gauge[_0x4e2355(0x1e0)]['redraw'],Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x238)]=function(){const _0x2538d9=_0x4e2355;let _0x5a74b7=$dataSystem[_0x2538d9(0x235)][_0x2538d9(0x21f)][0x7];this[_0x2538d9(0x1de)]==='tp'&&this[_0x2538d9(0x1db)](),VisuMZ['EnhancedTP'][_0x2538d9(0x2a8)][_0x2538d9(0x2c7)](this),this[_0x2538d9(0x1de)]==='tp'&&this[_0x2538d9(0x246)](),this[_0x2538d9(0x1de)]==='tp'&&($dataSystem['terms'][_0x2538d9(0x21f)][0x7]=_0x5a74b7);},Sprite_Gauge['prototype'][_0x4e2355(0x246)]=function(){const _0x2d1a85=_0x4e2355;this[_0x2d1a85(0x216)]&&(this[_0x2d1a85(0x216)]['bitmap']=this[_0x2d1a85(0x2ca)]),this[_0x2d1a85(0x2ee)](0x0,0x0,0x0,0x0);},VisuMZ['EnhancedTP']['Sprite_Gauge_drawFullGauge']=Sprite_Gauge['prototype'][_0x4e2355(0x203)],Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x203)]=function(_0xcb4b77,_0x5e2a2b,_0x4eb79b,_0x2a797a,_0x1c21e3,_0x165fcb){const _0xfd0927=_0x4e2355;this[_0xfd0927(0x1de)]==='tp'&&this[_0xfd0927(0x2de)]?this[_0xfd0927(0x2ae)](_0xcb4b77,_0x5e2a2b,_0x4eb79b,_0x2a797a,_0x1c21e3,_0x165fcb):VisuMZ[_0xfd0927(0x1d7)][_0xfd0927(0x289)][_0xfd0927(0x2c7)](this,_0xcb4b77,_0x5e2a2b,_0x4eb79b,_0x2a797a,_0x1c21e3,_0x165fcb);},Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x24b)]=function(_0x3d6142){const _0x39c309=_0x4e2355;!this['_tpGaugeBack'][_0x39c309(0x2ca)]&&(this[_0x39c309(0x1b8)][_0x39c309(0x2ca)]=new Bitmap(this['bitmap'][_0x39c309(0x296)],this[_0x39c309(0x2ca)]['height'])),!this[_0x39c309(0x2de)][_0x39c309(0x2ca)]&&(this[_0x39c309(0x2de)][_0x39c309(0x2ca)]=new Bitmap(this[_0x39c309(0x2ca)][_0x39c309(0x296)],this[_0x39c309(0x2ca)][_0x39c309(0x2cd)])),_0x3d6142&&(this[_0x39c309(0x1b8)][_0x39c309(0x2ca)][_0x39c309(0x24a)](),this[_0x39c309(0x2de)][_0x39c309(0x2ca)][_0x39c309(0x24a)]());},Sprite_Gauge['prototype'][_0x4e2355(0x2ae)]=function(_0x278aa5,_0x5d81db,_0xddeec8,_0x4e1e31,_0x4725a1,_0xee9996){const _0x3f7ade=_0x4e2355;this[_0x3f7ade(0x24b)](!![]);const _0x3da988=this[_0x3f7ade(0x2df)](),_0x34c7fc=Math[_0x3f7ade(0x1e7)]((_0x4725a1-0x2)*_0x3da988),_0x249b11=_0xee9996-0x2,_0x53ffb9=this[_0x3f7ade(0x22a)]();this[_0x3f7ade(0x1b8)]['bitmap'][_0x3f7ade(0x20e)](_0xddeec8,_0x4e1e31,_0x4725a1,_0xee9996,_0x53ffb9),_0x278aa5=this['changeTpCustomColor'](_0x278aa5,0x1),_0x5d81db=this[_0x3f7ade(0x1c2)](_0x5d81db,0x2),this['_tpGaugeSprite'][_0x3f7ade(0x2ca)]['gradientFillRect'](_0xddeec8+0x1,_0x4e1e31+0x1,_0x34c7fc,_0x249b11,_0x278aa5,_0x5d81db);},VisuMZ[_0x4e2355(0x1d7)]['Sprite_Gauge_drawGaugeRect']=Sprite_Gauge['prototype'][_0x4e2355(0x278)],Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x278)]=function(_0x5a3f04,_0x727638,_0x265898,_0x435512){const _0x32600b=_0x4e2355;this[_0x32600b(0x1de)]==='tp'&&this[_0x32600b(0x2de)]?this['drawGaugeRectEnhancedTp'](_0x5a3f04,_0x727638,_0x265898,_0x435512):VisuMZ['EnhancedTP']['Sprite_Gauge_drawGaugeRect'][_0x32600b(0x2c7)](this,_0x5a3f04,_0x727638,_0x265898,_0x435512);},Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x2eb)]=function(_0x127568,_0x39336a,_0x523a32,_0x12b46a){const _0x4f21b6=_0x4e2355;this[_0x4f21b6(0x24b)](!![]);const _0x2532e7=this[_0x4f21b6(0x2df)](),_0x51d76c=Math[_0x4f21b6(0x1e7)]((_0x523a32-0x2)*_0x2532e7),_0xbf5e76=_0x12b46a-0x2,_0x109b39=this[_0x4f21b6(0x22a)](),_0x429d65=this[_0x4f21b6(0x1c2)](this[_0x4f21b6(0x1c8)](),0x1),_0x40804e=this['changeTpCustomColor'](this[_0x4f21b6(0x299)](),0x2);this[_0x4f21b6(0x1b8)][_0x4f21b6(0x2ca)][_0x4f21b6(0x20e)](_0x127568,_0x39336a,_0x523a32,_0x12b46a,_0x109b39),this[_0x4f21b6(0x2de)][_0x4f21b6(0x2ca)]['gradientFillRect'](_0x127568+0x1,_0x39336a+0x1,_0x51d76c,_0xbf5e76,_0x429d65,_0x40804e);},VisuMZ['EnhancedTP']['Sprite_Gauge_update']=Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x2cc)],Sprite_Gauge['prototype'][_0x4e2355(0x2cc)]=function(){const _0x13b8e2=_0x4e2355;VisuMZ[_0x13b8e2(0x1d7)][_0x13b8e2(0x254)][_0x13b8e2(0x2c7)](this),this['updateEnhancedTp']();},Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x206)]=function(){const _0x3cd954=_0x4e2355;if(this['_statusType']!=='tp')return;if(!this[_0x3cd954(0x2de)])return;if(!this['_battler'])return;const _0x72e79e=this[_0x3cd954(0x244)][_0x3cd954(0x1f2)]();this[_0x3cd954(0x1e6)]!==_0x72e79e&&(this[_0x3cd954(0x1e6)]=_0x72e79e,this['redraw']());if(this['_battler']['isTpGaugeFlashing']()){const _0x4b3c49=this[_0x3cd954(0x244)][_0x3cd954(0x2bf)]();this[_0x3cd954(0x2de)]['setHue'](this[_0x3cd954(0x2de)][_0x3cd954(0x24f)]+_0x4b3c49);const _0x2bb795=this[_0x3cd954(0x244)]['tpGaugeFlashLightness']();this[_0x3cd954(0x2de)]['setBlendColor']([0xff,0xff,0xff,_0x2bb795]);}else this[_0x3cd954(0x2de)][_0x3cd954(0x279)]([0xff,0xff,0xff,0x0]),this[_0x3cd954(0x2de)]['setHue'](0x0);},Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x1db)]=function(){const _0x603159=_0x4e2355;if(!this[_0x603159(0x244)])return;const _0x597345=this['_battler'][_0x603159(0x1f2)]();_0x597345['CustomLabel']&&($dataSystem[_0x603159(0x235)][_0x603159(0x21f)][0x7]=_0x597345[_0x603159(0x281)][_0x603159(0x200)]());},Sprite_Gauge[_0x4e2355(0x1e0)][_0x4e2355(0x1c2)]=function(_0x3b4b5e,_0x5b462c){const _0xcf2db4=_0x4e2355;if(!this[_0xcf2db4(0x244)])return _0x3b4b5e;const _0x53ae01=this[_0xcf2db4(0x244)][_0xcf2db4(0x1f2)](),_0x3bb85a=_0xcf2db4(0x228)['format'](_0x5b462c);return _0x53ae01[_0x3bb85a]?ColorManager['getColor'](_0x53ae01[_0x3bb85a]):_0x3b4b5e;},Window_Base[_0x4e2355(0x1e0)][_0x4e2355(0x26b)]=function(_0x41b89b,_0x518d9f,_0x47f2fa,_0x21a8e,_0x54700c){const _0x5a52ce=_0x4e2355;if(!_0x41b89b)return;const _0x116108=ImageManager[_0x5a52ce(0x233)]||0x20,_0x4d2b06=_0x116108-ImageManager['iconWidth'],_0x4b2866=_0x116108+0x4,_0x44cae6=_0x47f2fa+(this[_0x5a52ce(0x224)]()-ImageManager[_0x5a52ce(0x2c3)])/0x2,_0x41f362=Math[_0x5a52ce(0x230)](0x0,_0x21a8e-_0x4b2866);this[_0x5a52ce(0x1e1)](),_0x54700c&&_0x54700c[_0x5a52ce(0x1f2)]()===_0x41b89b&&this[_0x5a52ce(0x2ce)](ColorManager[_0x5a52ce(0x261)]()),this[_0x5a52ce(0x262)](_0x41b89b[_0x5a52ce(0x21c)],_0x518d9f+Math[_0x5a52ce(0x21e)](_0x4d2b06/0x2),_0x44cae6),this[_0x5a52ce(0x1c3)](_0x41b89b[_0x5a52ce(0x28a)],_0x518d9f+_0x4b2866,_0x47f2fa,_0x41f362);},VisuMZ[_0x4e2355(0x1d7)][_0x4e2355(0x211)]=Window_SkillType[_0x4e2355(0x1e0)][_0x4e2355(0x2c6)],Window_SkillType['prototype'][_0x4e2355(0x2c6)]=function(){const _0x5a5313=_0x4e2355;VisuMZ[_0x5a5313(0x1d7)][_0x5a5313(0x211)][_0x5a5313(0x2c7)](this),this['addTpModeCommand']();},Window_SkillType[_0x4e2355(0x1e0)][_0x4e2355(0x27e)]=function(){const _0x1ef7cc=_0x4e2355;if(!this[_0x1ef7cc(0x293)]())return;let _0x1e081e=TextManager[_0x1ef7cc(0x225)][_0x1ef7cc(0x1ae)](TextManager['tp']);Imported[_0x1ef7cc(0x1d8)]&&(this[_0x1ef7cc(0x2b6)]()!==_0x1ef7cc(0x251)&&(_0x1e081e=_0x1ef7cc(0x2f1)['format'](ImageManager[_0x1ef7cc(0x210)],_0x1e081e))),this[_0x1ef7cc(0x2d3)](_0x1e081e,_0x1ef7cc(0x1f2),!![],'tpMode');},Window_SkillType[_0x4e2355(0x1e0)][_0x4e2355(0x293)]=function(){return $gameSystem['showTpModeInSceneSkill']();},VisuMZ['EnhancedTP'][_0x4e2355(0x1b5)]=Window_SkillList[_0x4e2355(0x1e0)][_0x4e2355(0x1ba)],Window_SkillList[_0x4e2355(0x1e0)][_0x4e2355(0x1ba)]=function(_0x5ae68a){const _0x1bb732=_0x4e2355,_0x5d2f2e=this[_0x1bb732(0x1b3)]!==_0x5ae68a;if(!_0x5d2f2e)return;this[_0x1bb732(0x275)]();const _0x5c8f2f=SceneManager['_scene']['_tpModeWindow'];if(_0x5c8f2f)_0x5c8f2f[_0x1bb732(0x1ce)]();const _0x15404e=this[_0x1bb732(0x24d)];if(_0x15404e)_0x15404e[_0x1bb732(0x275)]();VisuMZ[_0x1bb732(0x1d7)][_0x1bb732(0x1b5)][_0x1bb732(0x2c7)](this,_0x5ae68a);if(_0x5d2f2e&&_0x5c8f2f&&_0x5ae68a===_0x1bb732(0x1f2)){if(_0x15404e)_0x15404e[_0x1bb732(0x1ce)]();this['hide'](),_0x5c8f2f[_0x1bb732(0x275)]();}};function Window_TpModes(){this['initialize'](...arguments);}Window_TpModes['prototype']=Object['create'](Window_Selectable[_0x4e2355(0x1e0)]),Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x1d4)]=Window_TpModes,Window_TpModes[_0x4e2355(0x1e0)]['initialize']=function(_0xa8b860){const _0x5b9f68=_0x4e2355;Window_Selectable[_0x5b9f68(0x1e0)][_0x5b9f68(0x1c1)][_0x5b9f68(0x2c7)](this,_0xa8b860),this[_0x5b9f68(0x276)]=null,this['_data']=[],this[_0x5b9f68(0x1ce)]();},Window_TpModes['prototype']['setActor']=function(_0x58b4ef){const _0x1b0f7c=_0x4e2355;this[_0x1b0f7c(0x276)]!==_0x58b4ef&&(this['_actor']=_0x58b4ef,this[_0x1b0f7c(0x2d4)](),this['scrollTo'](0x0,0x0));},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x21b)]=function(){return 0x2;},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x271)]=function(){return 0x10;},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x1ac)]=function(){const _0x12c45b=_0x4e2355;return this[_0x12c45b(0x1ff)]?this['_data']['length']:0x1;},Window_TpModes['prototype'][_0x4e2355(0x22f)]=function(){const _0x37649f=_0x4e2355;return this['itemAt'](this[_0x37649f(0x236)]());},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x213)]=function(_0x59be71){const _0x2dda5c=_0x4e2355;return this[_0x2dda5c(0x1ff)]&&_0x59be71>=0x0?this[_0x2dda5c(0x1ff)][_0x59be71]:null;},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x1b2)]=function(){const _0x1cf607=_0x4e2355;this[_0x1cf607(0x276)]?this[_0x1cf607(0x1ff)]=this[_0x1cf607(0x276)]['availableTpModes']():this[_0x1cf607(0x1ff)]=[];},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x297)]=function(){this['forceSelect'](0x0);},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x2d6)]=function(_0xa09dd3){const _0x4a17bc=_0x4e2355,_0x2999c5=this[_0x4a17bc(0x213)](_0xa09dd3);if(!_0x2999c5)return;const _0x2640f7=this[_0x4a17bc(0x272)](_0xa09dd3);this[_0x4a17bc(0x26b)](_0x2999c5,_0x2640f7['x'],_0x2640f7['y'],_0x2640f7[_0x4a17bc(0x296)],this['_actor']);},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x229)]=function(){const _0x565441=_0x4e2355;this[_0x565441(0x1ed)](this[_0x565441(0x22f)]());},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x2d4)]=function(){const _0x2dfbf8=_0x4e2355;this[_0x2dfbf8(0x1b2)](),Window_Selectable['prototype'][_0x2dfbf8(0x2d4)][_0x2dfbf8(0x2c7)](this);},Window_TpModes[_0x4e2355(0x1e0)][_0x4e2355(0x218)]=function(){const _0x1a381b=_0x4e2355;SoundManager[_0x1a381b(0x1e5)]();};function _0x11fb(){const _0xc835e1=['executeHpDamage','result','makeCommandList','call','match','STRUCT','bitmap','Game_Action_itemEffectAddDebuff','update','height','changeTextColor','name','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','STR','_availableTpModes','addCommand','refresh','learnSkill','drawItem','OnlyMember','testApplyEnhancedTP','exit','process_VisuMZ_EnhancedTP_Settings','Game_BattlerBase_isPreserveTp','_skillTypeWindow','applyGlobal','_tpGaugeSprite','gaugeRate','AllyMpHeal','ActorUnlockTPMode','14hlYMqF','parse','DealHpHeal','success','Game_Battler_onBattleStart','isPlaytest','Game_BattlerBase_sparam','value','_tp','drawGaugeRectEnhancedTp','onChangeTpMode','Game_Unit_onBattleStart','setFrame','TPModeName','sortTpModes','\x5cI[%1]%2','Unnamed\x20Mode','TpMode','deselect','version','clearTp','Scene_Skill_create','addChild','Game_Action_executeHpDamage','DealAllyDebuff','Settings','maxItems','addState','format','commandTpMode','5593032ShzbkN','onTpModeOk','makeItemList','_stypeId','critical','Window_SkillList_setStypeId','Game_Party_initialize','GlobalTPModes','_tpGaugeBack','_inBattle','setStypeId','abs','min','CriticalMp','createEnhancedTpChildSprites','Game_Action_itemEffectAddBuff','mmp','initialize','changeTpCustomColor','drawText','Scene_Boot_onDatabaseLoaded','initTpModes','FlashLightness','8492568pHPTci','gaugeColor1','regenerateTp','convertEnhancedTpFunctions','_tpMode','Actors','_hp','hide','Game_Battler_useItem','MultiplierTCR','WinBattle','ARRAYEVAL','changeTpMode','constructor','DealAllyState','evaded','EnhancedTP','VisuMZ_1_SkillsStatesCore','EVAL','Evasion','changeBattlerTpLabel','Help','TpModeCmdName','_statusType','registerCommand','prototype','resetTextColor','setHandler','Game_Actor_isPreserveTp','tpModes','playEquip','_tpModeCache','floor','onTpModeCancel','FlashGauge','1115922nQvOgf','DealAllyBuff','TPModes','setHelpWindowItem','applyItemEnhancedTPEffect','DealHpDmg','user','Game_BattlerBase_maxTp','tpMode','Game_Actor_learnSkill','opponentsUnit','CriticalHp','applyGlobalEnhancedTP','MaxFormulaFunc','setTpModeInSceneSkill','GainAllyBuff','Initial','executeMpDamage','LoseBattle','itemEffectAddBuff','BattleManager_processDefeat','_data','trim','cancel','createSkillTypeWindow','drawFullGauge','BattleManager_onEscapeSuccess','learnTpMode','updateEnhancedTp','ActorChangeTPMode','General','onEscapeSuccess','isActor','TakeHpDmg','learnSkillEnhancedTP','AllyMpDmg','fillRect','3938065vYjeHb','tpModesCommandIcon','Window_SkillType_makeCommandList','onBattleEnd','itemAt','UseSkill','GainAllyDebuff','_tpTextSprite','aliveMembers','playOkSound','Game_Battler_gainSilentTp','includes','maxCols','Icon','%1Func','ceil','basic','_cache','bind','MaxFormula','CriticalHit','lineHeight','tpModesCommandText','setup','toUpperCase','CustomColor%1','updateHelp','gaugeBackColor','FullMp','initEnhancedTP','testApply','apply','item','max','1246215KACcMA','Preserve','standardIconWidth','ARRAYSTR','terms','index','chargeTpByDamage','redraw','ARRAYFUNC','sparam','applyItemUserEffect','create','DealEnemyBuff','UseItem','_regeneratingTp','KillAlly','DealEnemyState','addWindow','Game_System_initialize','_battler','return\x200','redrawEnhancedTp','deathStateId','setHelpWindow','Game_Action_applyGlobal','clear','createTpGaugeBitmaps','Game_Action_applyItemUserEffect','_statusWindow','_mp','_hue','note','text','onDatabaseLoaded','filter','Sprite_Gauge_update','learnAvailableActorTpModes','ARRAYJSON','KillEnemy','Game_Battler_addState','DealMpDmg','skillIsNotAttackGuard','createTpModeWindow','log','NUM','_tpMode_SceneSkill','AllyHpHeal','DefaultTpMode','tpCostColor','drawIcon','Game_Action_itemEffectAddState','GainEnemyState','learnAvailablePartyTpModes','isAlive','_tpModes','refreshActor','1109916QQOOMh','processDefeat','drawTpMode','TpWindowBgType','remove','missed','itemEffectAddState','SceneSkillTpMode','colSpacing','itemLineRect','TpModeOrder','Game_Unit_onBattleEnd','show','_actor','Scene_Skill_refreshActor','drawGaugeRect','setBlendColor','subject','description','Sprite_Gauge_setup','tpGaugeFlashLightness','addTpModeCommand','GainAllyState','processVictory','CustomLabel','gainSilentTp','members','itemEffectAddDebuff','applyEnhancedTP','Scene_Skill_createSkillTypeWindow','clamp','FUNC','Sprite_Gauge_drawFullGauge','Name','DealEnemyDebuff','defaultTpMode','onBattleStart','Game_Action_executeMpDamage','status','TakeMpHeal','activate','guardSkillId','isTpModeCommandVisible','Game_Action_apply','split','width','selectLast','#%1','gaugeColor2','maxTp','initTp','isPreserveTp','TakeHpHeal','Show','isDead','3585888TsJYHN','Game_Actor_setup','actor','attackSkillId','map','target','TakeMpDmg','GainEnemyBuff','Sprite_Gauge_redraw','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20damage\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20heal\x20=\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20%1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','tpModeWindowRect','leader','mhp','boxWidth','drawFullGaugeEnhancedTp','inBattle','isItem','JSON','BattleManager_processVictory','GainEnemyDebuff','FullHp','DealMpHeal','commandStyle','TpModes','availableTpModes','ConvertParams','gainTpFromTpMode','enemy','friendsUnit','push','Game_Action_testApply','tpGaugeFlashSpeed','AllyHpDmg','length','_tpModeWindow','iconHeight'];_0x11fb=function(){return _0xc835e1;};return _0x11fb();}