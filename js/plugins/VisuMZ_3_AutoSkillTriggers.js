//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.17] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * - VisuMZ_1_BattleCore
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
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * Battle System - FTB
 * Battle System - ETB
 * Battle System - PTB
 * 
 * These battle systems are incompatible with Auto Skill Triggers. This is due
 * to their turn structures, making them highly incompatible with the way that
 * Auto Skill Triggers work.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are general settings used for this plugin. These are primarily used to
 * impose a limit on the number of auto skill triggers that can happen per
 * battler per turn (meaning each member in battle has that limit individually
 * and not as a whole). Generally speaking, we recommend imposing limits limits
 * like MP costs, TP costs, cooldowns, and the like.
 * 
 * This is because auto skill triggers, when left unchecked and reacting to
 * everything, can cause a runaway effect where the player no longer inputs
 * anything. Instead, it is best to put a limit (even if high) on the number of
 * auto triggers to prevent such a thing from happening.
 * 
 * If you still want seemingly unlimited auto skill triggers, change the
 * numbers to 100 or something, but keep in mind that we're not responsible for
 * runaway effects when the risk of it happening is already mentioned.
 *
 * ---
 *
 * Settings
 * 
 *   Limit Per Turn (Turn-Based):
 *   - Turn-Based Only.
 *   - How many triggers per battler per turn?
 *   - Higher risk of runaway auto triggers at higher counts.
 * 
 *   Limit Per Turn (TPB-Based):
 *   - TPB-Only.
 *   - How many triggers per battler per turn?
 *   - Higher risk of runaway auto triggers at higher counts.
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
 * Verison 1.17: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > General Settings:
 * **** These are general settings used for this plugin. These are primarily
 *      used to impose a limit on the number of auto skill triggers that can
 *      happen per battler per turn (meaning each member in battle has that
 *      limit individually and not as a whole). Generally speaking, we
 *      recommend imposing limits limits like MP costs, TP costs, cooldowns,
 *      and the like.
 * **** This is because auto skill triggers, when left unchecked and reacting
 *      to everything, can cause a runaway effect where the player no longer
 *      inputs anything. Instead, it is best to put a limit (even if high) on
 *      the number of auto triggers to prevent such a thing from happening.
 * **** If you still want seemingly unlimited auto skill triggers, change the
 *      numbers to 100 or something, but keep in mind that we're not
 *      responsible for runaway effects when the risk of it happening is
 *      already mentioned.
 * *** Plugin Parameters > Limit Per Turn (Turn-Based)
 * **** Turn-Based Only. How many triggers per battler per turn? Higher risk of
 *      runaway auto triggers at higher counts.
 * *** Plugin Parameters > Limit Per Turn (TPB-Based)
 * **** TPB-Only. How many triggers per battler per turn? Higher risk of
 *      runaway auto triggers at higher counts.
 * 
 * Version 1.16: January 18, 2024
 * * Compatibility Update!
 * ** Added better compatibiliy with Battle System - OTB when using states with
 *    Action Times+. Update made by Olivia.
 * 
 * Version 1.15: August 17, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System - ATB's wait setting.
 *    Update made by Olivia.
 * 
 * Version 1.14: July 13, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System - ATB's active setting.
 *    Update made by Olivia.
 * ** Added better compatibility with Battle System - OTB for battle start and
 *    enemy responses. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System OTB's forced action update.
 *    Update made by Olivia.
 * 
 * Version 1.12: June 30, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.11: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 16, 2021
 * * Compatibility Update!
 * ** Auto Skill Triggers is now disabled with the following battle systems:
 *    ETB, FTB, and PTB. This is due to the way their turn structures work,
 *    making them highly incompatible with one another.
 * ** We may revisit this in the future, but for now, Auto Skill Triggers are
 *    to be disabled by code when any of the battle systems are detected.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section.
 * 
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param AutoSkillTriggers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param LimitPerTurn:num
 * @text Limit Per Turn (Turn-Base)
 * @type number
 * @min 1
 * @desc Turn-Based Only. How many triggers per battler per turn?
 * Higher risk of runaway auto triggers at higher counts.
 * @default 10
 *
 * @param LimitPerTurnTPB:num
 * @text Limit Per Turn (TPB-Base)
 * @type number
 * @min 1
 * @desc TPB-Only. How many triggers per battler per turn?
 * Higher risk of runaway auto triggers at higher counts.
 * @default 5
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

const _0x140bf2=_0x33f8;(function(_0x24ddbe,_0x1fdeba){const _0x2e195e=_0x33f8,_0x3f7a20=_0x24ddbe();while(!![]){try{const _0x4f3d60=parseInt(_0x2e195e(0x25d))/0x1+-parseInt(_0x2e195e(0x289))/0x2*(parseInt(_0x2e195e(0x255))/0x3)+-parseInt(_0x2e195e(0x1b9))/0x4*(-parseInt(_0x2e195e(0x23b))/0x5)+-parseInt(_0x2e195e(0x22e))/0x6*(parseInt(_0x2e195e(0x254))/0x7)+parseInt(_0x2e195e(0x234))/0x8+-parseInt(_0x2e195e(0x1f9))/0x9+parseInt(_0x2e195e(0x25f))/0xa;if(_0x4f3d60===_0x1fdeba)break;else _0x3f7a20['push'](_0x3f7a20['shift']());}catch(_0x199db0){_0x3f7a20['push'](_0x3f7a20['shift']());}}}(_0x4ade,0x3870a));var label='AutoSkillTriggers',tier=tier||0x0,dependencies=[_0x140bf2(0x1c2)],pluginData=$plugins['filter'](function(_0x2836a2){return _0x2836a2['status']&&_0x2836a2['description']['includes']('['+label+']');})[0x0];function _0x4ade(){const _0x4e9e2e=['hasDeathAutoSkillTrigger','OPPONENTS','canPerformAutoSkillTriggers','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','1614344sMVlWj','returnSavedAutoSkillTriggerActions','meetsDeathAutoSkillTrigger','FUNC','CreateNotetag','clearTpbChargeTime','isBattleSys','1046205JapwZh','VisuMZ_3_LifeStateEffects','damage','otbProcessActionCheck','JSON','Game_Actor_makeActions','on%1Item','processAutoSkillTrigger','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','parse','prototype','ARRAYSTR','clear','isOTB','(?:ITEM\x20%1|ITEM\x20%1)','constructAutoSkillTriggerOTB','Game_BattlerBase_addNewState','onBattleStart','clone','Game_Action_isValid','replace','Game_Battler_onBattleStart','opponentsUnit','processOnBattleWinAutoSkillTriggers','_scene','87941WdHGmV','140355IlSsdJ','isItem','onBattleWin','max','isSkill','STRUCT','_tpbChargeTime','isAllDead','324499XqzRFe','CreateNotetags','7285130QRZblF','isImmortal','startTurn','version','_CHANCE','on%1Magical','filter','otbAddActions','Ally','ETB','name','User','checkBattleEnd','isAlive','_lastAutoTriggerTurn','format','Opponents','elementId','makeActions','stripNameTextCodes','onAllActionsEnd','BattleManager_startTurn','isAttack','battler','_otbTurnOrderWindow','AutoSkillTriggers','aliveMembers','ConvertParams','ALLY','onDeath','revive','getAutoSkillTriggerElements','call','Game_Battler_otbProcessActionCheck','ARRAYFUNC','in\x20order\x20for\x20VisuMZ_3_AutoSkillTriggers\x20to\x20work.','(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)','FRIENDS','applyAutoSkillTriggers','_forceAction','_instance','onDatabaseLoaded','18mILQmC','return\x200','requestUpdateTurnOrders','Scene_Boot_onDatabaseLoaded','map','skills','indexOf','on%1SType%2','constructAutoSkillTriggerATB','AUTO_TRIGGER_LIMIT_PER_TURN_NORMAL','_tpbTurnCount','forceAutoSkillTrigger','attackElements','BattleSystemOTB','<AUTO\x20TRIGGER:[\x20]%1>','forceAction','Game_Action_applyGlobal','VisuMZ_2_BattleSystemOTB','Settings','stypeId','idleTime','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_subject','_action','4DUTGKz','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','BattleManager_endAction','VisuMZ_3_InputComboSkills','chargeTime','FRIENDS\x20ONLY','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','performAutoSkillTriggers','applyGlobal','VisuMZ_1_BattleCore','_savedAutoSkillTriggerActions','_forcedBattlers','toUpperCase','refresh','on%1Physical','Game_BattlerBase_isImmortal','BattleManager_checkBattleEnd','process_VisuMZ_AutoSkillTriggers_Notetags','subject','isEnemy','endActionAutoTriggerATB','canUse','item','USER','exit','(?:ATTACK\x20%1|STRIKE\x20%1)','_onBattleWinAutoSkillTriggerOn','_deathAutoSkillTriggerPerformed','deathStateId','_autoSkillTrigger_otbProcessActionCheck','hasDeathTransform','Game_Unit_onBattleStart','isActiveChainSkillsUiVisible','constructAutoSkillTrigger','VisuMZ_1_ElementStatusCore','_tpbTurnEnd','adjustTurnOrderAutoSkillTrigger','on%1Attack','turnCount','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','parameters','skillTypes','constructor','note','Game_Enemy_makeActions','setAutoSkillTrigger','_deathAutoSkillTriggerActive','isMagical','unshift','elements','ARRAYEVAL','charged','_tpbState','_tpbIdleTime','hasOtbForcedActionAutoSkillBattler','isPhysical','Game_Battler_clearTpbChargeTime','trim','log','isTpb','_autoTriggerAtbReturn','LimitPerTurnTPB','RegExp','isATB','3801150stmYkG','FriendsOnly','Game_BattlerBase_revive','processDeathAutoSkillTriggerEffects','isAutoSkillTrigger','acting','clearDeathAutoSkillTrigger','isValid','_preventMakeActionsOtb','on%2Element%1','castTime','length','canMove','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_targets','getAutoSkillTriggerSTypes','isSceneBattle','AUTO_TRIGGER_LIMIT_PER_TURN_TPB','_actions','_inBattle','some','getSkillTypeNameFromID','Game_Action_clear','FTB','on%1Guard','on%2SType%1','ARRAYNUM','_actionBattlers','Enemy','processAutoSkillTriggers','addNewState','match','PTB','onBattleEnd','_autoSkillTriggerBypassTpbClear','_currentTurn','isAutoSkillTriggerCompatible','turnEnd','VisuMZ_2_BattleSystemATB','isActor','getElementNameFromID','canActivateDeathAutoSkillTrigger','on%1Element%2','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','occasion','push','endAction','Friends','description','VisuMZ_3_ActiveChainSkills','pop','ONDEATH','LimitPerTurn','186HeNWNF','_autoTriggersThisTurn'];_0x4ade=function(){return _0x4e9e2e;};return _0x4ade();}VisuMZ[label]['Settings']=VisuMZ[label][_0x140bf2(0x29b)]||{},VisuMZ['ConvertParams']=function(_0x1f449f,_0x1d71dc){const _0x76eef4=_0x140bf2;for(const _0x4121e5 in _0x1d71dc){if(_0x4121e5[_0x76eef4(0x218)](/(.*):(.*)/i)){const _0x427c23=String(RegExp['$1']),_0x40bb6c=String(RegExp['$2'])[_0x76eef4(0x1c5)]()[_0x76eef4(0x1f2)]();let _0x4b76f3,_0x4d7348,_0x560288;switch(_0x40bb6c){case'NUM':_0x4b76f3=_0x1d71dc[_0x4121e5]!==''?Number(_0x1d71dc[_0x4121e5]):0x0;break;case _0x76eef4(0x213):_0x4d7348=_0x1d71dc[_0x4121e5]!==''?JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5]):[],_0x4b76f3=_0x4d7348[_0x76eef4(0x28d)](_0x23c694=>Number(_0x23c694));break;case'EVAL':_0x4b76f3=_0x1d71dc[_0x4121e5]!==''?eval(_0x1d71dc[_0x4121e5]):null;break;case _0x76eef4(0x1eb):_0x4d7348=_0x1d71dc[_0x4121e5]!==''?JSON['parse'](_0x1d71dc[_0x4121e5]):[],_0x4b76f3=_0x4d7348['map'](_0x1b0fd7=>eval(_0x1b0fd7));break;case _0x76eef4(0x23f):_0x4b76f3=_0x1d71dc[_0x4121e5]!==''?JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5]):'';break;case'ARRAYJSON':_0x4d7348=_0x1d71dc[_0x4121e5]!==''?JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5]):[],_0x4b76f3=_0x4d7348['map'](_0x44fe83=>JSON[_0x76eef4(0x244)](_0x44fe83));break;case _0x76eef4(0x237):_0x4b76f3=_0x1d71dc[_0x4121e5]!==''?new Function(JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5])):new Function(_0x76eef4(0x28a));break;case _0x76eef4(0x281):_0x4d7348=_0x1d71dc[_0x4121e5]!==''?JSON['parse'](_0x1d71dc[_0x4121e5]):[],_0x4b76f3=_0x4d7348[_0x76eef4(0x28d)](_0xa9b00=>new Function(JSON[_0x76eef4(0x244)](_0xa9b00)));break;case'STR':_0x4b76f3=_0x1d71dc[_0x4121e5]!==''?String(_0x1d71dc[_0x4121e5]):'';break;case _0x76eef4(0x246):_0x4d7348=_0x1d71dc[_0x4121e5]!==''?JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5]):[],_0x4b76f3=_0x4d7348[_0x76eef4(0x28d)](_0x3f6df9=>String(_0x3f6df9));break;case _0x76eef4(0x25a):_0x560288=_0x1d71dc[_0x4121e5]!==''?JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5]):{},_0x4b76f3=VisuMZ['ConvertParams']({},_0x560288);break;case'ARRAYSTRUCT':_0x4d7348=_0x1d71dc[_0x4121e5]!==''?JSON[_0x76eef4(0x244)](_0x1d71dc[_0x4121e5]):[],_0x4b76f3=_0x4d7348[_0x76eef4(0x28d)](_0x527d0d=>VisuMZ[_0x76eef4(0x27a)]({},JSON[_0x76eef4(0x244)](_0x527d0d)));break;default:continue;}_0x1f449f[_0x427c23]=_0x4b76f3;}}return _0x1f449f;},(_0x290bfd=>{const _0xdd49b1=_0x140bf2,_0x1a2f70=_0x290bfd[_0xdd49b1(0x269)];for(const _0x3450a7 of dependencies){if(!Imported[_0x3450a7]){alert(_0xdd49b1(0x206)['format'](_0x1a2f70,_0x3450a7)),SceneManager[_0xdd49b1(0x1d1)]();break;}}const _0x3bb0ac=_0x290bfd[_0xdd49b1(0x229)];if(_0x3bb0ac[_0xdd49b1(0x218)](/\[Version[ ](.*?)\]/i)){const _0x5f4f3f=Number(RegExp['$1']);_0x5f4f3f!==VisuMZ[label][_0xdd49b1(0x262)]&&(alert(_0xdd49b1(0x233)[_0xdd49b1(0x26e)](_0x1a2f70,_0x5f4f3f)),SceneManager['exit']());}if(_0x3bb0ac[_0xdd49b1(0x218)](/\[Tier[ ](\d+)\]/i)){const _0x1cfbd0=Number(RegExp['$1']);_0x1cfbd0<tier?(alert(_0xdd49b1(0x29e)[_0xdd49b1(0x26e)](_0x1a2f70,_0x1cfbd0,tier)),SceneManager[_0xdd49b1(0x1d1)]()):tier=Math[_0xdd49b1(0x258)](_0x1cfbd0,tier);}VisuMZ[_0xdd49b1(0x27a)](VisuMZ[label][_0xdd49b1(0x29b)],_0x290bfd[_0xdd49b1(0x1e1)]);})(pluginData);if(Imported[_0x140bf2(0x29a)]&&VisuMZ[_0x140bf2(0x296)][_0x140bf2(0x262)]<1.13){let text='';text+='VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20',text+=_0x140bf2(0x282),alert(text),SceneManager[_0x140bf2(0x1d1)]();}VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x28c)]=Scene_Boot['prototype'][_0x140bf2(0x288)],Scene_Boot[_0x140bf2(0x245)][_0x140bf2(0x288)]=function(){const _0x19dd3a=_0x140bf2;VisuMZ['AutoSkillTriggers']['Scene_Boot_onDatabaseLoaded'][_0x19dd3a(0x27f)](this),this[_0x19dd3a(0x1ca)]();},Scene_Boot[_0x140bf2(0x245)][_0x140bf2(0x1ca)]=function(){const _0x1420da=_0x140bf2;VisuMZ[_0x1420da(0x278)][_0x1420da(0x25e)]();},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x1f7)]={},VisuMZ[_0x140bf2(0x278)]['CreateNotetags']=function(){const _0x4c0a70=_0x140bf2;let _0x237d74=[[_0x4c0a70(0x26a),_0x4c0a70(0x1d0)],['Target','TARGET'],['Ally',_0x4c0a70(0x27b)],[_0x4c0a70(0x215),'ENEMY'],[_0x4c0a70(0x228),_0x4c0a70(0x284)],['FriendsOnly',_0x4c0a70(0x1be)],[_0x4c0a70(0x26f),_0x4c0a70(0x231)]],_0x1dac42=[[_0x4c0a70(0x24c),_0x4c0a70(0x1ba)],[_0x4c0a70(0x257),'(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)'],[_0x4c0a70(0x27c),'(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)']];for(const _0x4ad251 of _0x237d74){if(!_0x4ad251)continue;_0x1dac42[_0x4c0a70(0x226)]([_0x4c0a70(0x1de)[_0x4c0a70(0x26e)](_0x4ad251[0x0]),_0x4c0a70(0x1d2)[_0x4c0a70(0x26e)](_0x4ad251[0x1])]),_0x1dac42[_0x4c0a70(0x226)]([_0x4c0a70(0x211)[_0x4c0a70(0x26e)](_0x4ad251[0x0]),'(?:GUARD\x20%1|GUARD\x20%1)'['format'](_0x4ad251[0x1])]),_0x1dac42['push']([_0x4c0a70(0x241)[_0x4c0a70(0x26e)](_0x4ad251[0x0]),_0x4c0a70(0x249)[_0x4c0a70(0x26e)](_0x4ad251[0x1])]),_0x1dac42[_0x4c0a70(0x226)]([_0x4c0a70(0x1c7)[_0x4c0a70(0x26e)](_0x4ad251[0x0]),_0x4c0a70(0x283)[_0x4c0a70(0x26e)](_0x4ad251[0x1])]),_0x1dac42[_0x4c0a70(0x226)]([_0x4c0a70(0x264)[_0x4c0a70(0x26e)](_0x4ad251[0x0]),'(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)'[_0x4c0a70(0x26e)](_0x4ad251[0x1])]),_0x1dac42[_0x4c0a70(0x226)](['on%1Certain'['format'](_0x4ad251[0x0]),'(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)'[_0x4c0a70(0x26e)](_0x4ad251[0x1])]);}for(const _0x2248b5 of $dataSystem[_0x4c0a70(0x1e2)]){if(!_0x2248b5)continue;let _0x3f6db8=DataManager[_0x4c0a70(0x272)](_0x2248b5);for(const _0x4654e3 of _0x237d74){if(!_0x4654e3)continue;_0x1dac42['push']([_0x4c0a70(0x212)[_0x4c0a70(0x26e)](_0x3f6db8[_0x4c0a70(0x24f)](/[ ]/gi,''),_0x4654e3[0x0]),_0x4c0a70(0x224)[_0x4c0a70(0x26e)](_0x3f6db8,_0x4654e3[0x1])]);}}for(const _0x1b8f7c of $dataSystem[_0x4c0a70(0x1ea)]){if(!_0x1b8f7c)continue;let _0x2a96fc=DataManager['stripNameTextCodes'](_0x1b8f7c);for(const _0x2fd75a of _0x237d74){if(!_0x2fd75a)continue;_0x1dac42[_0x4c0a70(0x226)]([_0x4c0a70(0x202)[_0x4c0a70(0x26e)](_0x2a96fc['replace'](/[ ]/gi,''),_0x2fd75a[0x0]),'(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)'[_0x4c0a70(0x26e)](_0x2a96fc,_0x2fd75a[0x1])]);}}for(const _0x51284b of _0x1dac42){this[_0x4c0a70(0x238)](_0x51284b[0x0],_0x51284b[0x1]);}},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x238)]=function(_0x578fff,_0x4a75be){const _0x52de8c=_0x140bf2;_0x578fff=_0x578fff[_0x52de8c(0x1c5)]()['trim']();const _0x5788d7=_0x52de8c(0x297)[_0x52de8c(0x26e)](_0x4a75be),_0x307dfd=_0x578fff+_0x52de8c(0x263),_0x2b5987=_0x52de8c(0x1bf)['format'](_0x4a75be);try{VisuMZ['AutoSkillTriggers'][_0x52de8c(0x1f7)][_0x578fff]=new RegExp(_0x5788d7,'i'),VisuMZ[_0x52de8c(0x278)]['RegExp'][_0x307dfd]=new RegExp(_0x2b5987,'i');}catch(_0x32f725){Utils['isOptionValid']('test')&&(console[_0x52de8c(0x1f3)]('===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20==='),console['log'](_0x52de8c(0x243)[_0x52de8c(0x26e)](_0x5788d7,_0x2b5987)),console['log'](_0x52de8c(0x1e0)),console[_0x52de8c(0x1f3)]('\x20\x20\x20'));}},DataManager[_0x140bf2(0x20e)]=function(_0x50559a){const _0x523ecd=_0x140bf2;return this[_0x523ecd(0x272)]($dataSystem[_0x523ecd(0x1e2)][_0x50559a]);},DataManager[_0x140bf2(0x272)]=function(_0x2c9d8e){const _0x4513c7=_0x140bf2;if(!_0x2c9d8e)return'';return _0x2c9d8e=_0x2c9d8e[_0x4513c7(0x24f)](/\\V\[(\d+)\]/gi,''),_0x2c9d8e=_0x2c9d8e[_0x4513c7(0x24f)](/\\I\[(\d+)\]/gi,''),_0x2c9d8e=_0x2c9d8e[_0x4513c7(0x24f)](/\\C\[(\d+)\]/gi,''),_0x2c9d8e=_0x2c9d8e['replace'](/\\N\[(\d+)\]/gi,''),_0x2c9d8e=_0x2c9d8e[_0x4513c7(0x24f)](/\\P\[(\d+)\]/gi,''),(_0x2c9d8e||'')[_0x4513c7(0x1c5)]()['trim']();},DataManager[_0x140bf2(0x221)]=function(_0x2a32d7){const _0x4a121e=_0x140bf2;return this['stripNameTextCodes']($dataSystem[_0x4a121e(0x1ea)][_0x2a32d7]);},BattleManager[_0x140bf2(0x21d)]=function(){const _0x4bcba1=_0x140bf2;if(this[_0x4bcba1(0x23a)](_0x4bcba1(0x268)))return![];if(this[_0x4bcba1(0x23a)](_0x4bcba1(0x210)))return![];if(this[_0x4bcba1(0x23a)](_0x4bcba1(0x219)))return![];if(Imported[_0x4bcba1(0x22a)]){const _0x3dccf6=SceneManager[_0x4bcba1(0x253)];if(_0x3dccf6&&_0x3dccf6[_0x4bcba1(0x1d9)]())return![];}if(Imported[_0x4bcba1(0x1bc)]){const _0x5d9ae3=SceneManager['_scene'];if(_0x5d9ae3&&_0x5d9ae3['canPerformInputComboSkills']())return![];}return!![];},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x1bb)]=BattleManager['endAction'],BattleManager[_0x140bf2(0x227)]=function(){const _0x5e325e=_0x140bf2,_0x295ff0=this[_0x5e325e(0x2a0)]&&this['_action'][_0x5e325e(0x1fd)](),_0x2fd7b4=this[_0x5e325e(0x29f)];_0x295ff0&&(this[_0x5e325e(0x29f)]['_autoSkillTriggerBypassTpbClear']=!![]),VisuMZ['AutoSkillTriggers'][_0x5e325e(0x1bb)][_0x5e325e(0x27f)](this),_0x2fd7b4&&_0x295ff0&&(_0x2fd7b4[_0x5e325e(0x235)](),_0x2fd7b4[_0x5e325e(0x1cd)]());},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x1c9)]=BattleManager[_0x140bf2(0x26b)],BattleManager[_0x140bf2(0x26b)]=function(){const _0x3f029d=_0x140bf2;$gameTroop[_0x3f029d(0x25c)]()&&$gameParty['processOnBattleWinAutoSkillTriggers']();if(this[_0x3f029d(0x1c4)][_0x3f029d(0x204)]>0x0)return![];if(BattleManager[_0x3f029d(0x1ef)]())return![];return VisuMZ['AutoSkillTriggers']['BattleManager_checkBattleEnd'][_0x3f029d(0x27f)](this);},BattleManager[_0x140bf2(0x1ef)]=function(){const _0x5eb731=_0x140bf2;if(!Imported[_0x5eb731(0x29a)])return![];if(!BattleManager[_0x5eb731(0x248)]())return![];return this[_0x5eb731(0x214)][_0x5eb731(0x20d)](_0x5042f7=>_0x5042f7[_0x5eb731(0x20b)][_0x5eb731(0x20d)](_0x2454d9=>_0x2454d9&&_0x2454d9[_0x5eb731(0x286)]));},Game_Action[_0x140bf2(0x292)]=VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x29b)][_0x140bf2(0x22d)]??0xa,Game_Action[_0x140bf2(0x20a)]=VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x29b)][_0x140bf2(0x1f6)]??0x5,VisuMZ['AutoSkillTriggers'][_0x140bf2(0x20f)]=Game_Action[_0x140bf2(0x245)]['clear'],Game_Action['prototype'][_0x140bf2(0x247)]=function(){const _0x52bb6f=_0x140bf2;VisuMZ[_0x52bb6f(0x278)]['Game_Action_clear'][_0x52bb6f(0x27f)](this),this[_0x52bb6f(0x1e6)](![]);},Game_Action[_0x140bf2(0x245)][_0x140bf2(0x1e6)]=function(_0x4ae494){this['_autoSkillTrigger']=_0x4ae494;},Game_Action['prototype']['isAutoSkillTrigger']=function(){return!!this['_autoSkillTrigger'];},VisuMZ[_0x140bf2(0x278)]['Game_Action_isValid']=Game_Action['prototype'][_0x140bf2(0x200)],Game_Action[_0x140bf2(0x245)][_0x140bf2(0x200)]=function(){const _0x4675e2=_0x140bf2;let _0x4dbbb1=VisuMZ[_0x4675e2(0x278)][_0x4675e2(0x24e)][_0x4675e2(0x27f)](this),_0xad45f7=this[_0x4675e2(0x1cf)]()?this[_0x4675e2(0x1cf)]()[_0x4675e2(0x225)]:-0x1;return this[_0x4675e2(0x1cf)]()&&this[_0x4675e2(0x1fd)]()?(this[_0x4675e2(0x1cf)]()[_0x4675e2(0x225)]=0x0,_0x4dbbb1=_0x4dbbb1&&this[_0x4675e2(0x1cb)]()[_0x4675e2(0x1ce)](this[_0x4675e2(0x1cf)]()),this[_0x4675e2(0x1cf)]()[_0x4675e2(0x225)]=_0xad45f7,_0x4dbbb1&&(this['subject']()[_0x4675e2(0x22f)]+=0x1),_0x4dbbb1):_0x4dbbb1;},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x299)]=Game_Action[_0x140bf2(0x245)][_0x140bf2(0x1c1)],Game_Action['prototype']['applyGlobal']=function(){const _0x10fe7a=_0x140bf2;VisuMZ[_0x10fe7a(0x278)][_0x10fe7a(0x299)][_0x10fe7a(0x27f)](this),this['applyAutoSkillTriggers']();},Game_Action['prototype'][_0x140bf2(0x208)]=function(){const _0x324f03=_0x140bf2;if(!this[_0x324f03(0x259)]())return[];let _0x181e7f=[];return Imported['VisuMZ_1_SkillsStatesCore']?_0x181e7f=DataManager['getSkillTypes'](this[_0x324f03(0x1cf)]()):_0x181e7f['push'](this['item']()[_0x324f03(0x29c)]),_0x181e7f[_0x324f03(0x28d)](_0x3c7413=>DataManager[_0x324f03(0x20e)](_0x3c7413));},Game_Action[_0x140bf2(0x245)][_0x140bf2(0x27e)]=function(){const _0x4cdb32=_0x140bf2;let _0x4cb310=[];if(Imported[_0x4cdb32(0x1db)])_0x4cb310=this[_0x4cdb32(0x1ea)]();else{if(this[_0x4cdb32(0x1cf)]()['damage'][_0x4cdb32(0x270)]<0x0){const _0x5db1be=this[_0x4cdb32(0x1cb)]();_0x4cb310=_0x5db1be[_0x4cdb32(0x295)]();}else _0x4cb310=[this[_0x4cdb32(0x1cf)]()[_0x4cdb32(0x23d)][_0x4cdb32(0x270)]];}return _0x4cb310[_0x4cdb32(0x28d)](_0x13ec6a=>DataManager[_0x4cdb32(0x221)](_0x13ec6a));},Game_Action[_0x140bf2(0x245)][_0x140bf2(0x285)]=function(){const _0x1bfd51=_0x140bf2;if(!SceneManager[_0x1bfd51(0x209)]())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this['item']())return;if(this[_0x1bfd51(0x1cf)]()[_0x1bfd51(0x1e4)]['match'](/<NO AUTO SKILL TRIGGER>/i))return;if(this[_0x1bfd51(0x1cf)]()[_0x1bfd51(0x1e4)][_0x1bfd51(0x218)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x1118f3=this[_0x1bfd51(0x1cb)](),_0x5d8de1=BattleManager[_0x1bfd51(0x207)]['filter']((_0x440e61,_0x1a3250,_0x52ca58)=>_0x52ca58[_0x1bfd51(0x28f)](_0x440e61)===_0x1a3250),_0x45387f=_0x1118f3['friendsUnit']()[_0x1bfd51(0x279)](),_0x5128e4=_0x1118f3[_0x1bfd51(0x251)]()[_0x1bfd51(0x279)]();this['performAutoSkillTriggers'](_0x1118f3,_0x1bfd51(0x26a));for(const _0x129c8b of _0x5d8de1){this[_0x1bfd51(0x1c0)](_0x129c8b,'Target');if(_0x129c8b[_0x1bfd51(0x220)]()===_0x1118f3['isActor']())this['performAutoSkillTriggers'](_0x129c8b,_0x1bfd51(0x267));else _0x129c8b['isActor']()!==_0x1118f3[_0x1bfd51(0x220)]()&&this[_0x1bfd51(0x1c0)](_0x129c8b,'Enemy');}for(const _0x162aae of _0x45387f){this[_0x1bfd51(0x1c0)](_0x162aae,_0x1bfd51(0x228)),_0x162aae!==_0x1118f3&&this[_0x1bfd51(0x1c0)](_0x162aae,_0x1bfd51(0x1fa));}for(const _0x52b6b2 of _0x5128e4){this[_0x1bfd51(0x1c0)](_0x52b6b2,_0x1bfd51(0x26f));}},Game_Action[_0x140bf2(0x245)]['performAutoSkillTriggers']=function(_0x4a54be,_0xdb9f8b){const _0x36cf40=_0x140bf2;if(!_0x4a54be)return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(this[_0x36cf40(0x275)]())_0x4a54be['processAutoSkillTrigger'](_0x36cf40(0x1de)[_0x36cf40(0x26e)](_0xdb9f8b));if(this['isGuard']())_0x4a54be[_0x36cf40(0x242)](_0x36cf40(0x211)[_0x36cf40(0x26e)](_0xdb9f8b));if(this[_0x36cf40(0x256)]())_0x4a54be['processAutoSkillTrigger'](_0x36cf40(0x241)['format'](_0xdb9f8b));if(this[_0x36cf40(0x1f0)]())_0x4a54be['processAutoSkillTrigger'](_0x36cf40(0x1c7)[_0x36cf40(0x26e)](_0xdb9f8b));if(this[_0x36cf40(0x1e8)]())_0x4a54be[_0x36cf40(0x242)](_0x36cf40(0x264)[_0x36cf40(0x26e)](_0xdb9f8b));if(this['isCertainHit']())_0x4a54be[_0x36cf40(0x242)]('on%1Certain'[_0x36cf40(0x26e)](_0xdb9f8b));const _0x26f2bc=this[_0x36cf40(0x208)]();for(let _0x16ff14 of _0x26f2bc){if(!_0x16ff14)continue;_0x16ff14=_0x16ff14[_0x36cf40(0x24f)](/[ ]/gi,''),_0x4a54be[_0x36cf40(0x242)](_0x36cf40(0x290)[_0x36cf40(0x26e)](_0xdb9f8b,_0x16ff14));}const _0x2fdaef=this['getAutoSkillTriggerElements']();for(let _0x35d987 of _0x2fdaef){if(!_0x35d987)continue;_0x35d987=_0x35d987['replace'](/[ ]/gi,''),_0x4a54be[_0x36cf40(0x242)](_0x36cf40(0x223)[_0x36cf40(0x26e)](_0xdb9f8b,_0x35d987));}},VisuMZ['AutoSkillTriggers']['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x217)],Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x217)]=function(_0x1cb72b){const _0x4a3a4d=_0x140bf2;if(this[_0x4a3a4d(0x222)](_0x1cb72b))return this[_0x4a3a4d(0x1fc)]();VisuMZ['AutoSkillTriggers'][_0x4a3a4d(0x24b)]['call'](this,_0x1cb72b);},Game_BattlerBase['prototype'][_0x140bf2(0x222)]=function(_0x17f5c2){const _0x554158=_0x140bf2;if(_0x17f5c2!==this[_0x554158(0x1d5)]())return![];if(Imported[_0x554158(0x23c)]){if(this['hasLifeStateAutoLifeEffect']())return![];if(this[_0x554158(0x1cc)]()&&this[_0x554158(0x1d7)]())return![];}return this[_0x554158(0x230)]();},Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x230)]=function(){const _0x2364e2=_0x140bf2;if(!SceneManager['isSceneBattle']())return![];if(!this['canMove']())return![];if(this[_0x2364e2(0x1d4)])return![];return this[_0x2364e2(0x28e)]()['some'](_0x3dd28d=>this[_0x2364e2(0x236)](_0x3dd28d));},Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x236)]=function(_0x664f31){const _0x2f6407=_0x140bf2,_0x47e029=VisuMZ[_0x2f6407(0x278)][_0x2f6407(0x1f7)][_0x2f6407(0x22c)];return _0x664f31&&_0x664f31['note'][_0x2f6407(0x218)](_0x47e029)&&this[_0x2f6407(0x1ce)](_0x664f31);},VisuMZ['AutoSkillTriggers'][_0x140bf2(0x1c8)]=Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x260)],Game_BattlerBase[_0x140bf2(0x245)]['isImmortal']=function(){const _0x1891f9=_0x140bf2;if(this['_deathAutoSkillTriggerActive'])return!![];return VisuMZ[_0x1891f9(0x278)][_0x1891f9(0x1c8)][_0x1891f9(0x27f)](this);},Game_Battler['prototype'][_0x140bf2(0x242)]=function(_0x1e38cb){const _0x38f339=_0x140bf2;if(!SceneManager[_0x38f339(0x209)]())return;if(!this['canPerformAutoSkillTriggers']())return;if(!BattleManager[_0x38f339(0x21d)]())return;_0x1e38cb=_0x1e38cb['toUpperCase']()[_0x38f339(0x1f2)]();const _0x8c7b5=VisuMZ[_0x38f339(0x278)]['RegExp'][_0x1e38cb],_0x6b22f9=_0x1e38cb+'_CHANCE',_0x9e0f0d=VisuMZ[_0x38f339(0x278)][_0x38f339(0x1f7)][_0x6b22f9];if(!_0x8c7b5&&!_0x9e0f0d)return;if(!this[_0x38f339(0x205)]())return;for(const _0x2397ef of this['skills']()){if(!_0x2397ef)continue;if(!this['canUse'](_0x2397ef))continue;let _0x2d0194=![];if(_0x2397ef['note'][_0x38f339(0x218)](_0x8c7b5))_0x2d0194=!![];else{if(_0x2397ef[_0x38f339(0x1e4)][_0x38f339(0x218)](_0x9e0f0d)){const _0x1d55b2=(Number(RegExp['$1'])||0x0)*0.01;_0x2d0194=Math['random']()<_0x1d55b2;}}if(_0x2d0194){if(Imported[_0x38f339(0x21f)]&&BattleManager[_0x38f339(0x21d)]())this[_0x38f339(0x291)](_0x2397ef);else Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager['isOTB']()?this[_0x38f339(0x24a)](_0x2397ef):this[_0x38f339(0x1da)](_0x2397ef);}}},Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x1da)]=function(_0x209a81){const _0x2533e7=_0x140bf2;this['forceAutoSkillTrigger'](_0x209a81['id']);const _0x3409c2=BattleManager['_actionBattlers'][_0x2533e7(0x24d)](),_0x356ace=BattleManager[_0x2533e7(0x29f)];BattleManager[_0x2533e7(0x29f)]=null,BattleManager[_0x2533e7(0x298)](this),BattleManager[_0x2533e7(0x214)]=_0x3409c2,BattleManager[_0x2533e7(0x29f)]=_0x356ace;},Game_Battler['prototype'][_0x140bf2(0x291)]=function(_0x4fed67,_0x475be9){const _0x5033fb=_0x140bf2;this[_0x5033fb(0x1f5)]={'state':this['_tpbState'],'chargeTime':this[_0x5033fb(0x25b)],'castTime':this['_tpbCastTime'],'idleTime':this['_tpbIdleTime'],'turnCount':this[_0x5033fb(0x293)],'turnEnd':this[_0x5033fb(0x1dc)]},this[_0x5033fb(0x1da)](_0x4fed67);},Game_Battler[_0x140bf2(0x245)]['endActionAutoTriggerATB']=function(){const _0x418a5a=_0x140bf2;if(!Imported[_0x418a5a(0x21f)])return;if(!BattleManager[_0x418a5a(0x1f8)]())return;[_0x418a5a(0x1fe),_0x418a5a(0x1ec)]['includes'](this[_0x418a5a(0x1ed)])&&this[_0x418a5a(0x239)]();if(!this[_0x418a5a(0x1f5)])return;this[_0x418a5a(0x1ed)]=this[_0x418a5a(0x1f5)]['state'],this[_0x418a5a(0x25b)]=this[_0x418a5a(0x1f5)][_0x418a5a(0x1bd)],this['_tpbCastTime']=this[_0x418a5a(0x1f5)][_0x418a5a(0x203)],this[_0x418a5a(0x1ee)]=this['_autoTriggerAtbReturn'][_0x418a5a(0x29d)],this[_0x418a5a(0x293)]=this[_0x418a5a(0x1f5)][_0x418a5a(0x1df)],this[_0x418a5a(0x1dc)]=this[_0x418a5a(0x1f5)][_0x418a5a(0x21e)],BattleManager[_0x418a5a(0x29f)]=null,this[_0x418a5a(0x1f5)]=undefined,[_0x418a5a(0x1fe),_0x418a5a(0x1ec)]['includes'](this[_0x418a5a(0x1ed)])&&this[_0x418a5a(0x239)]();},Game_Battler[_0x140bf2(0x245)]['constructAutoSkillTriggerOTB']=function(_0x2d7b85){const _0x39e798=_0x140bf2;if(!this[_0x39e798(0x205)]())return;this['forceAutoSkillTrigger'](_0x2d7b85['id']),$gameTemp[_0x39e798(0x201)]=!![],this[_0x39e798(0x266)](0x1,!![]),$gameTemp[_0x39e798(0x201)]=![];const _0x10dc4b=BattleManager[_0x39e798(0x214)];_0x10dc4b[_0x39e798(0x1e9)](_0x10dc4b['pop']());const _0x19d0a7=SceneManager[_0x39e798(0x253)][_0x39e798(0x277)];_0x19d0a7&&_0x19d0a7['adjustTurnOrderAutoSkillTrigger'](this);},VisuMZ['AutoSkillTriggers'][_0x140bf2(0x240)]=Game_Actor[_0x140bf2(0x245)][_0x140bf2(0x271)],Game_Actor['prototype']['makeActions']=function(){const _0x434868=_0x140bf2;if($gameTemp[_0x434868(0x201)])return;if(this['_autoSkillTrigger_otbProcessActionCheck'])return;const _0x32cef4=this['_actions'],_0x26f5c5=_0x32cef4['filter'](_0x2bf49c=>_0x2bf49c[_0x434868(0x1fd)]());VisuMZ[_0x434868(0x278)][_0x434868(0x240)][_0x434868(0x27f)](this);let _0x18fb24=0x0;for(const _0x43ea8c of _0x26f5c5){if(this['_actions'][_0x18fb24])this[_0x434868(0x20b)][_0x18fb24]=_0x43ea8c;else break;_0x18fb24++;}},VisuMZ['AutoSkillTriggers'][_0x140bf2(0x1e5)]=Game_Enemy[_0x140bf2(0x245)][_0x140bf2(0x271)],Game_Enemy[_0x140bf2(0x245)][_0x140bf2(0x271)]=function(){const _0x277d1b=_0x140bf2;if($gameTemp[_0x277d1b(0x201)])return;VisuMZ[_0x277d1b(0x278)][_0x277d1b(0x1e5)][_0x277d1b(0x27f)](this);},Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x294)]=function(_0x183493){const _0x4e2195=_0x140bf2;if(!BattleManager[_0x4e2195(0x21d)]())return;!this[_0x4e2195(0x1c3)]&&(this[_0x4e2195(0x1c3)]=this[_0x4e2195(0x20b)][_0x4e2195(0x24d)]());this[_0x4e2195(0x298)](_0x183493,-0x2);if(!this['_actions'])return;const _0x477b7c=this[_0x4e2195(0x20b)][this['_actions']['length']-0x1];_0x477b7c['setAutoSkillTrigger'](!![]);},Game_Battler['prototype'][_0x140bf2(0x235)]=function(){const _0x2a2dfb=_0x140bf2;if(!BattleManager[_0x2a2dfb(0x21d)]())return;if(!this[_0x2a2dfb(0x1c3)])return;if(this[_0x2a2dfb(0x20b)][_0x2a2dfb(0x204)]>0x0)return;this[_0x2a2dfb(0x20b)]=this[_0x2a2dfb(0x1c3)],this[_0x2a2dfb(0x1c3)]=undefined;},VisuMZ[_0x140bf2(0x278)]['Game_Battler_onBattleEnd']=Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x21a)],Game_Battler['prototype'][_0x140bf2(0x21a)]=function(){const _0x2a5786=_0x140bf2;this[_0x2a5786(0x1c3)]=undefined,VisuMZ[_0x2a5786(0x278)]['Game_Battler_onBattleEnd']['call'](this);},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x1f1)]=Game_Battler[_0x140bf2(0x245)]['clearTpbChargeTime'],Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x239)]=function(){const _0x4d25b9=_0x140bf2;if(this[_0x4d25b9(0x21b)]){this[_0x4d25b9(0x21b)]=undefined;return;}VisuMZ[_0x4d25b9(0x278)][_0x4d25b9(0x1f1)][_0x4d25b9(0x27f)](this);},VisuMZ['AutoSkillTriggers']['Game_Battler_onBattleStart']=Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x24c)],Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x24c)]=function(_0x5dde3e){const _0x2eed21=_0x140bf2;this[_0x2eed21(0x1c3)]=undefined,$gameParty[_0x2eed21(0x20c)]=!![],VisuMZ[_0x2eed21(0x278)][_0x2eed21(0x250)]['call'](this,_0x5dde3e),this['_lastAutoTriggerTurn']=-0x1,this[_0x2eed21(0x22f)]=0x0;if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x2eed21(0x248)]())return;this['processAutoSkillTrigger'](_0x2eed21(0x24c)),this['clearDeathAutoSkillTrigger']();},VisuMZ[_0x140bf2(0x278)]['BattleManager_startTurn']=BattleManager['startTurn'],BattleManager[_0x140bf2(0x261)]=function(){const _0x53e570=_0x140bf2;VisuMZ['AutoSkillTriggers'][_0x53e570(0x274)][_0x53e570(0x27f)](this);if(Imported[_0x53e570(0x29a)]&&BattleManager['isOTB']()&&$gameTroop[_0x53e570(0x1df)]()===0x1)for(const _0x1a3920 of this['allBattleMembers']()){_0x1a3920&&(_0x1a3920[_0x53e570(0x242)](_0x53e570(0x24c)),_0x1a3920[_0x53e570(0x1ff)]());}},VisuMZ[_0x140bf2(0x278)][_0x140bf2(0x1fb)]=Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x27d)],Game_BattlerBase[_0x140bf2(0x245)][_0x140bf2(0x27d)]=function(){const _0x4bd401=_0x140bf2;VisuMZ[_0x4bd401(0x278)][_0x4bd401(0x1fb)][_0x4bd401(0x27f)](this),this[_0x4bd401(0x1ff)]();},Game_Battler['prototype']['clearDeathAutoSkillTrigger']=function(){const _0x418de1=_0x140bf2;this['_deathAutoSkillTriggerActive']=![],this[_0x418de1(0x1d4)]=![];},Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x1fc)]=function(){const _0x4e3158=_0x140bf2;if(!this[_0x4e3158(0x205)]())return;if(!SceneManager[_0x4e3158(0x209)]())return;this[_0x4e3158(0x1e7)]=!![],this[_0x4e3158(0x242)](_0x4e3158(0x27c));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x273)];function _0x33f8(_0x585148,_0x178bd8){const _0x4adec4=_0x4ade();return _0x33f8=function(_0x33f883,_0x4ea51c){_0x33f883=_0x33f883-0x1b9;let _0x5a6566=_0x4adec4[_0x33f883];return _0x5a6566;},_0x33f8(_0x585148,_0x178bd8);}Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x273)]=function(){const _0x400298=_0x140bf2;_Game_Battler_onAllActionsEnd_[_0x400298(0x27f)](this),this['checkDeathAutoSkillTriggerRemoval']();},Game_Battler[_0x140bf2(0x245)]['checkDeathAutoSkillTriggerRemoval']=function(){const _0x128db1=_0x140bf2;if(!this[_0x128db1(0x1e7)])return;if(this['_deathAutoSkillTriggerPerformed'])return;const _0x57f7fd=BattleManager[_0x128db1(0x1c4)];for(const _0x4bb489 of _0x57f7fd){if(!_0x4bb489)continue;if(_0x4bb489[0x0]===this)return;}this[_0x128db1(0x1e7)]=![],this[_0x128db1(0x1d4)]=!![],this[_0x128db1(0x1c6)]();if(this[_0x128db1(0x26c)]())this[_0x128db1(0x1ff)]();},VisuMZ['AutoSkillTriggers'][_0x140bf2(0x280)]=Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x23e)],Game_Battler['prototype'][_0x140bf2(0x23e)]=function(_0x50c178,_0x23b458){const _0x177ff9=_0x140bf2;this[_0x177ff9(0x1d6)]=!![],VisuMZ['AutoSkillTriggers'][_0x177ff9(0x280)][_0x177ff9(0x27f)](this,_0x50c178,_0x23b458),this['_autoSkillTrigger_otbProcessActionCheck']=![];},Game_Battler[_0x140bf2(0x245)][_0x140bf2(0x232)]=function(){const _0x3e20cd=_0x140bf2;let _0x1ae32c=Game_Action[_0x3e20cd(0x292)];return BattleManager[_0x3e20cd(0x1f4)]()&&(_0x1ae32c=Game_Action[_0x3e20cd(0x20a)]),_0x1ae32c<=0x0&&(BattleManager[_0x3e20cd(0x1f4)]()?_0x1ae32c=0x5:_0x1ae32c=0xa),this['_lastAutoTriggerTurn']!==this[_0x3e20cd(0x1df)]()?(this[_0x3e20cd(0x26d)]=this[_0x3e20cd(0x1df)](),this['_autoTriggersThisTurn']=0x0,!![]):this[_0x3e20cd(0x22f)]<_0x1ae32c;},VisuMZ['AutoSkillTriggers'][_0x140bf2(0x1d8)]=Game_Unit[_0x140bf2(0x245)]['onBattleStart'],Game_Unit['prototype'][_0x140bf2(0x24c)]=function(_0x3b72b5){const _0x5ef88b=_0x140bf2;VisuMZ[_0x5ef88b(0x278)][_0x5ef88b(0x1d8)]['call'](this,_0x3b72b5);if(this[_0x5ef88b(0x1e3)]===Game_Party)this[_0x5ef88b(0x1d3)]=![];},Game_Unit[_0x140bf2(0x245)]['processAutoSkillTriggers']=function(_0x3e42f2,_0x674790){const _0x3154a6=_0x140bf2;_0x674790=_0x674790||null;const _0x57cd91=this['aliveMembers']()[_0x3154a6(0x265)](_0x5e9a47=>_0x5e9a47!==_0x674790);for(const _0x2d2f80 of _0x57cd91){if(!_0x2d2f80)continue;_0x2d2f80[_0x3154a6(0x242)](_0x3e42f2);}},Game_Party[_0x140bf2(0x245)][_0x140bf2(0x252)]=function(){const _0x101c7c=_0x140bf2;if(this[_0x101c7c(0x1d3)])return;this[_0x101c7c(0x1d3)]=!![],this[_0x101c7c(0x216)](_0x101c7c(0x257));};Imported[_0x140bf2(0x29a)]&&(Window_OTB_TurnOrder[_0x140bf2(0x245)][_0x140bf2(0x1dd)]=function(_0xe2131){const _0x22e407=_0x140bf2;let _0x3f6444=null;for(const _0x4835c8 of this[_0x22e407(0x21c)]){if(!_0x4835c8)continue;if(_0x4835c8[_0x22e407(0x276)]()!==_0xe2131)continue;_0x3f6444=_0x4835c8,_0x4835c8['_instance']=_0x4835c8[_0x22e407(0x287)]||0x0,_0x4835c8[_0x22e407(0x287)]++;}_0x3f6444[_0x22e407(0x287)]=0x0,_0x3f6444['_positionDuration']=0x258,_0x3f6444['x']=this['_subjectX'],this[_0x22e407(0x21c)][_0x22e407(0x1e9)](this['_currentTurn'][_0x22e407(0x22b)]()),this[_0x22e407(0x28b)]();});;