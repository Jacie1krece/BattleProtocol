//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.53;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.53] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * - If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *   <Passive State: x> will always have the passive state be available no
 *   matter if the skill is equipped or not, as long as the skill is learned.
 *   - If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 * 
 * === Skill Toggle Notetags ===
 * 
 * Skill Toggles are skills that can be toggled ON or OFF. If ON, then any
 * passive states on that skill will become enabled (assuming all other passive
 * conditions are met) and if toggled OFF, then that passive state will not
 * appear (even if all other conditions are met).
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 * 
 * Otherwise, you can use JavaScript calls like the following for script call
 * checks, and the like:
 * 
 *   $gameActors.actor(2).isSkillToggled($dataSkills[3])
 * 
 * ---
 * 
 * <Toggle>
 * 
 * - Used for: Skill Notetags
 * - Turns the skill into a toggle skill.
 * - Best used with a passive state.
 * - Toggle skills cannot be used with certain skill effects:
 *   - Active Chain Skills, Evolution Matrix Skills, Input Combo Skills
 *   - Field Skills
 *   - Item Amplify Skills, Item Concoct Skills, Item Throw Skills
 *   - Toggle skills cannot be Skill Containers
 * 
 * ---
 * 
 * <Initial Toggle: On>
 * <Initial Toggle: Off>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - Sets the initial toggle for this skill to be ON/OFF.
 *   - aka when an actor learns the skill for the first time and this
 *     determines what toggle it will have
 * - If this notetag is not used, refer to the setting found in the
 *   Plugin Parameters
 * 
 * ---
 * 
 * <Toggle Exclusion Group: key>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When this skill is toggled, all other toggle skills with a matching 'key'
 *   will be turned off.
 *   - For example, the skills Fire Force, Ice Force, and Thunder Force have
 *     the <Toggle Exclusion Group: Force> notetag.
 *   - When Fire Force is toggled ON, then Ice Force and Thunder Force will
 *     automatically turn OFF.
 * - Replace 'key' with a toggle exclusion group name for this skill to use.
 * 
 * ---
 * 
 * <Toggle On Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the skill's animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled on.
 * 
 * ---
 * 
 * <Toggle Off Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the Plugin Parameters' animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled off.
 * 
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Toggle Settings
 * ============================================================================
 *
 * Skill toggles are a new type of skill. They do not perform any actions but
 * instead, will switch on/off any passive effects the skill has.
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 *
 * ---
 *
 * Default
 * 
 *   Default Toggle:
 *   - What is the default toggle setting for toggle skills?
 * 
 *   Toggle Off Animation:
 *   - Play this animation when a skill is toggled off.
 *   - Requires VisuMZ_0_CoreEngine.
 *   - Toggle On animation by default is whatever the skill animation is set to
 * 
 * ---
 * 
 * Appearance
 * 
 *   Toggle On Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Applies for skill name, not the skill cost
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Toggle Type:
 *   - Skill toggle displayed in the status window.
 * 
 *   Toggle On:
 *   - Text displayed for a skill that's toggled on
 * 
 *   Toggle Off:
 *   - Text displayed for a skill that's toggled off
 * 
 *     Off Text Location:
 *     - Where is the [OFF] text located in the skill cost?
 *       - front
 *       - back
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.53: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the "Preset: Gauge Color" Plugin Parameter was not
 *    accepting #rrggbb values. Fix made by Arisu.
 * * Documentation Update!
 * ** Added extra clarity for <Passive State: x>:
 * *** If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *     <Passive State: x> will always have the passive state be available no
 *     matter if the skill is equipped or not, as long as the skill is learned.
 * *** If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 * 
 * Version 1.52: August 14, 2025
 * * Feature Update!
 * ** Passive States with custom JS conditions should be less prone to infinite
 *    loops. Update made by Irina.
 * 
 * Version 1.51: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Skill Toggle Settings
 * **** Skill toggles are a new type of skill. They do not perform any actions
 *      but instead, will switch on/off any passive effects the skill has.
 * **** Enemies are unable to switch Toggle Skills and the passive effects on a
 *      Toggle Skill for an enemy will always be considered ON.
 * **** See the help file for more information.
 * ** New Notetags added by Olivia:
 * *** Skill Toggle Notetags:
 * **** <Toggle>
 * **** <Initial Toggle: On/Off>
 * **** <Toggle Exclusion Group: key>
 * **** <Toggle On Animation: x>
 * **** <Toggle Off Animation: x>
 * ***** See the help file for more information.
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Toggles:struct
 * @text Skill Toggle Settings
 * @parent Skills:struct
 * @type struct<Toggles>
 * @desc Settings in regards to how skill toggles function.
 * @default {"Default":"","DefaultToggle:eval":"true","ToggleOffAnimationID:num":"62","Appear":"","ToggleOnTextColor:str":"24","Vocab":"","ToggleType:str":"Toggle","ToggleOn:str":"\\FS[22]\\C[0][ON]","ToggleOff:str":"\\FS[22]\\C[8][OFF]","ToggleOffLocation:str":"back"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Toggle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Toggles:
 *
 * @param Default
 *
 * @param DefaultToggle:eval
 * @text Default Toggle
 * @parent Default
 * @type boolean
 * @on ON
 * @off OFF
 * @desc What is the default toggle setting for toggle skills?
 * @default true
 *
 * @param ToggleOffAnimationID:num
 * @text Toggle Off Animation
 * @parent Default
 * @type animation
 * @desc Play this animation when a skill is toggled off.
 * Requires VisuMZ_0_CoreEngine.
 * @default 62
 *
 * @param Appear
 * @text Appearance
 *
 * @param ToggleOnTextColor:str
 * @text Toggle On Text Color
 * @parent Appear
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param ToggleType:str
 * @text Toggle Type
 * @parent Vocab
 * @desc Skill toggle displayed in the status window.
 * @default Toggle
 *
 * @param ToggleOn:str
 * @text Toggle On
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled on
 * @default \FS[22]\C[0][ON]
 *
 * @param ToggleOff:str
 * @text Toggle Off
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled off
 * @default \FS[22]\C[8][OFF]
 *
 * @param ToggleOffLocation:str
 * @text Off Text Location
 * @parent ToggleOff:str
 * @type select
 * @option front
 * @option back
 * @desc Where is the [OFF] text located in the skill cost?
 * @default back
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:str
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x16b6(){const _0xf4dbb2=['note','_cache_getPassiveStateConditionSwitchData','LabelFontMainType','_colorCache','description','_stateSteps','sortSkillList','isSkillTypeMatchForUse','multiClass','Gauge','AutoAddState','addBuff','CheckVisibleBattleNotetags','ARRAYEVAL','recoverAll','toUpperCase','labelOutlineWidth','stateData','isPartyAllAffectedByGroupDefeatStates','_skillIDs','none','Game_BattlerBase_increaseBuff','sortPriority','ToggleOnTextColor','stateId','284271UFoYuD','paramValueByName','action','ParseAllNotetags','onEraseDebuffJS','isActor','skillMpCost','deathStateId','Settings','map','hasState','damage','paySkillCost','_skillWindow','StateTurnsActorChangeTo','_cache_isToggleSkill','JSON','LUK','getPassiveStatesFromObj','ALL','Game_BattlerBase_buffIconIndex','_stypeId','ParseStateNotetags','_stateMaxTurns','stateMpSlipHealJS','meetsPassiveStateGlobalConditionJS','createShopStatusWindow','Buffs','isToggleSkill','commandNameWindowDrawText','getSkillTypes','innerWidth','Name','Game_BattlerBase_resetStateCounts','Scene_Skill_helpWindowRect','Parse_Notetags_Skill_Sorting','_statusWindow','addNewState','states','isLearnedSkill','recover\x20all','slice','Game_Battler_regenerateAll','_cache','Game_Action_executeHpDamage_bypassStateDmgRemoval','NUM','front','EVAL','MatchLabelGaugeColor','onEraseBuffJS','keys','helpWindowRect','gaugeBackColor','passiveStateObjects','_checkingPassiveStates','stateTpSlipHealJS','isMaxDebuffAffected','getCurrentStateOriginKey','mpDamage','CoreEngine','canChangeSkillsThroughStateEffects','createCommandNameWindow','isBuffExpired','clearStates','getColor','Window_SkillList_setActor','currentMaxValueSkillsStatesCore','traitObjects','drawActorBuffTurns','Param','getCurrentTroopUniqueID','slipTp','eraseBuff','useDigitGrouping','<member-%1>','EnableLayout','totalStateCategoryAffected','statusWidth','_turnDisplaySprite','currentMaxValue','auraStateIDs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','includesSkillsStatesCore','checkSkillTypeMatch','toggleExclusionGroups','bypassRemoveStatesByDamage','GaugeMaxJS','MultiplierJS','Parse_Notetags_State_PassiveJS','shift','States','isBuffAffected','multiclasses','skills','resetStateCounts','_prevPassiveJsResults','status','statusWindowRect','ToggleOffAnimationID','VisuMZ_2_ClassChangeSystem','SkillSceneStatusBgType','text','getSkillChangesFromState','makeSuccess','increaseBuff','Game_BattlerBase_overwriteBuffTurns','skillTypeWindowRect','updateHelp','redrawSkillsStatesCore','drawExtendedParameter','drawParamText','deadMembers','process_VisuMZ_SkillsStatesCore_Notetags','SkillActorPaySkillCost','stypeId','buttonAssistText1','hasStateCategory','updatedLayoutStyle','CalcJS','Game_Unit_deadMembers','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','makeCommandName','skillVisibleJS','debuffTurns','rgba(0,\x200,\x200,\x201)','commandStyleCheck','sort','_data','isDebuffAffected','maxSlipDamage','stateExpireJS','placeExactGauge','ColorNeutral','ParseSkillNotetags','toLowerCase','getStateOrigin','traitsSet','filter','adjustSkillCost','textSizeEx','setupSkillsStatesCore','isAutoBattle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','isUserBypassRemoveStatesByDamage','stepsForTurn','learnSkill','clearStateDisplay','anySwitchOff','removeBuff','paramBuffRate','applyStateCategoryRemovalEffects','DataFontSize','textColor','replace','MAT','commandName','EnemyIndex','allSwitchOff','makeCurrentTroopUniqueID','user','round','itemLineRect','skillCostSeparator','updateFrame','value','addBuffTurns','_checkingVisuMzPassiveStateObjects','PresetLabelGaugeColor','playEquip','ForceList','gradientFillRect','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','standardIconHeight','toggleOffLocation','Sprite_Gauge_redraw','min','maxItems','onAddBuffGlobalJS','isAppeared','_skillChangesFromState','SkillID','Game_Action_testApply','_prevPassiveJsCounter','executeHpDamage','ForcedChainSkill','clearStateOrigin','_stateData','skillEnableJS','FUNC','actor','getStateData','_result','onAddState','toggleType','AvailableChainSkill','Skill-%1-%2','mainFontFace','drawActorIcons','_tempBattler','parse','attacker','active','getClassIdWithName','ItemAmplifySkills','labelColor','GaugeDrawJS','isUseModernControls','Window_SkillList_maxCols','Game_Battler_addState','fontFace','isStateRemoved','test','_classIDs','CheckIncompatibleStates','mainAreaTop','drawTextEx','removeStatesByCategory','getStateDisplay','AGI','commandNameWindowDrawBackground','BattleHiddenSkillTypes','drawSkillCost','onSkillOk','stateHpSlipDamageJS','eraseState','VisuMZ_1_ItemsEquipsCore','StateTurnsEnemyChangeBy','process_VisuMZ_SkillsStatesCore_CheckForAuras','meetsStateCondition','meetsSkillConditionsEnableJS','floor','_cache_toggleExclusionGroups','Game_BattlerBase_states','length','LearnedMatrix','isSkillHidden','convertPassiveStates','valueOutlineWidth','autoRemovalTiming','ARRAYSTR','makeResistedStateCategories','allSwitchOn','SkillEnemyPaySkillCost','icon','_scene','updateStateTurns','uiMenuStyle','redraw','currentClass','ForcedMatrix','item','fontBold','toggleOff','placeGauge','STRUCT','_passiveStateResults','getStateIdWithName','Actor','aliveMembers','ParseSkillChangessIntoData','CheckVisibleSkillNotetags','untitled','_currentActor','_stored_buffColor','createKeyJS','_states','heal','Window_SkillList_updateHelp','onAddDebuffJS','ToggleOffLocation','clear','_currentTroopUniqueID','updateStatesActionEnd','updateCommandNameWindow','shopStatusWindowRect','numberFontFace','itemWindowRect','getColorDataFromPluginParameters','drawText','getPassiveStateConditionSwitchData','isAllDead','Window_StatusBase_placeGauge','Window_Base_changeTextColor','testSkillStatesCoreNotetags','meetsPassiveStateConditionJS','Game_BattlerBase_decreaseBuff','allowCreateShopStatusWindow','LearnedChainSkill','uiInputPosition','addState','currentValue','isPlaytest','resetTextColor','2631956bqGcAG','labelOutlineColor','process_VisuMZ_SkillsStatesCore_Skill_Notetags','MDF','onExpireState','ForceListRange','exit','Sprite_Gauge_gaugeRate','buffColor','SkillSceneAdjustSkillList','drawActorBuffRates','reset','ItemConcoctSkills','AvailableMatrix','getStateRetainType','actorId','applyStateTurnManipulationEffects','ATK','removeByDamage','POSITIVE','Scene_Skill_itemWindowRect','getSkillIdWithName','shopStatusWidth','convertGaugeTypeSkillsStatesCore','changePaintOpacity','_cache_getAuraPassiveStatesFromObj','isGroupDefeatStateAffected','_animationIndex','onEraseDebuffGlobalJS','Parse_Notetags_Skill_JS','parameters','Skills','drawExtendedSkillsStatesCoreStatus','index','isSkillCostShown','iconIndex','ActionEndUpdate','Window_SkillType_initialize','checkSkillConditionsSwitchNotetags','isValid','splice','isSkillUsableForAutoBattle','CheckBypassRemoveStatesByDamage','setStateRetainType','ColorPositive','Toggle','return\x200','animationId','isTargetBypassRemoveStatesByDamage','itemAt','_stateRetainType','ARRAYSTRUCT','stateMaximumTurns','isAlive','setBuffTurns','10aXIJKj','Game_Actor_skillTypes','hide','onAddDebuff','setStatusWindow','version','clamp','canUse','Game_Variables_onChange','changeSkillsThroughStateEffects','TurnFontSize','Game_BattlerBase_isStateResist','mainCommandWidth','265905iHhGsH','addPassiveStatesFromOtherPlugins','setStateDisplay','isDead','onExpireBuff','format','inBattle','equipBattleSkills','createTurnDisplaySprite','Game_Battler_isStateAddable','DefaultToggle','onSkillToggle','isStateExpired','setup','_stateTurns','loadBitmap','skillId','buffTurns','Scene_Battle_onSkillOk_Toggle','checkShowHideJS','ItemThrowSkills','Game_BattlerBase_addNewState','onExpireDebuffGlobalJS','mainFontSize','changeOutlineColor','_shopStatusWindow','StackBuffMax','ActorIDs','onEraseDebuff','getPassiveStateConditionClassesData','alterSkillName','onEraseStateCustomJS','number','VisuMZ_3_EvoMatrixSkills','\x5cFS[22]\x5cC[8][OFF]','VisuMZ_0_CoreEngine','right','helpAreaTop','process_VisuMZ_SkillsStatesCore_State_Notetags','add','buffLength','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addPassiveStatesByNotetag','getStateOriginByKey','statePassiveConditionJS','drawItemStyleIconText','stateHpSlipHealJS','Costs','_stored_state-%1-color','InputComboSkills','fillRect','createItemWindow','TurnOffsetX','equips','Window_SkillList_makeItemList','concat','stateTurns','restriction','ValueOutlineWidth','death','Sprite_Gauge_setup','VisuMZ_1_ElementStatusCore','checkCacheKey','adjustItemWidthByShopStatus','gainMp','onExpireBuffGlobalJS','_toggleSkillColor','gaugeLineHeight','Window_Base_createAllSkillCostText_Toggle','buff','Actor-%1-%2','_bypassRemoveStateDamage_action','isSkillToggled','drawActorStateTurns','buttonAssistSwitch','_bypassRemoveStateDamage_user','bitmap','ColorNegative','Game_BattlerBase_recoverAll','CheckVisibleSwitchNotetags','makeAdditionalSkillCostText','Game_BattlerBase_initMembers','updateVisibility','_prevPassiveJsFrameCount','onEraseBuff','removeOtherStatesOfSameCategory','drawIcon','onAddStateGlobalJS','RegExp','clearStatesWithStateRetain','_actor','8250qGhFbl','VisuMZ_3_ItemThrowSkills','getCurrentStateActiveUser','drawItemStyleIcon','VisuMZ_3_FieldSkills','makeItemList','rgba(0,\x200,\x200,\x200)','LayoutStyle','clearAllStateOrigins','center','fontSize','ParseClassIDs','9bVuUUO','endAction','totalStateCategory','isStateResist','split','scrollTo','setStateTurns','callUpdateHelp','LabelOutlineSolid','Game_Troop_setup','forgetSkill','Game_Action_applyItemUserEffect','checkSkillConditionsNotetags','updateTurnDisplaySprite','SortSkillTypesAbc','onAddStateCustomJS','uiHelpPosition','VisuMZ_3_ActiveChainSkills','MeetsAuraNoteConditions','usableSkills','214216dbjpnl','gaugeRate','Sprite_Gauge_currentMaxValue','ceil','MeetsAuraObjConditions','regenerateAllSkillsStatesCore','gainHp','isBuffPrevented','_skillTypeWindow','registerCommand','addPassiveStates','Game_BattlerBase_meetsSkillConditions_Toggle','SkillMenuStatusRect','Parse_Notetags_State_SlipEffectJS','Window_SkillStatus_refresh','indexOf','Window_Base_drawText','applyDebuffTurnManipulationEffects','statesByCategory','ToggleOn','Game_Actor_learnSkill','shopStatusWindowRectSkillsStatesCore','meetsPassiveStateConditionSwitches','Game_Actor_forgetSkill','addPassiveStatesByPluginParameters','defaultToggleSkillSetting','onRegenerateCustomStateDamageOverTime','STR','passiveStates','drawActorStateData','standardIconWidth','boxWidth','Sprite_StateIcon_updateFrame','isEnemy','PassiveConditionJS','canSortSkillTypeList','target','width','_stateOrigin','call','onRemoveState','includes','Window_SkillList_includes','_lastStatesActionEndFrameCount','isStateCategoryAffected','Parse_Notetags_State_ApplyRemoveLeaveJS','hpDamage','changeTextColor','_stypeIDs','commandStyle','_endingBattle','resetFontSettings','CanPayJS','ShowTurns','_costSettings','anchor','ShowJS','_stored_debuffColor','labelFontSize','_battler','_subject','ReapplyRules','drawActorIconsAllTurnCounters','Turns','DataOffsetX','commandNameWindowCenter','TurnEndOnMap','_commandNameWindow','Scene_Skill_createItemWindow','removeStatesAuto','categories','stateEraseJS','_stateDisplay','mpCost','buffIconIndex','slipHp','onChange','ConvertParams','addStateTurns','prototype','trim','checkShowHideNotetags','SkillsStatesCore','onEraseBuffGlobalJS','members','_buffTurns','DEF','itemWindowRectSkillsStatesCore','SortByIDandPriorityUsingIDs','remove','ActiveChainSkills','maxCols','itemTextAlign','iconWidth','AURA_SYSTEM_ENABLED','isSkill','constructor','_itemWindow','CmdTextAlign','stateAddJS','2OmDhCM','initMembersSkillsStatesCore','_tempActor','max','Game_Switches_onChange','StateTurnsActorChangeBy','decreaseBuff','initMembers','_skillToggle','meetsPassiveStateConditions','Game_BattlerBase_meetsSkillConditions','createAllSkillCostText','drawItem','outlineColor','tpCost','testApply','IconStypeNorm','StateID','friendsUnit','subject','%1\x20%2\x20%3','_stateIDs','isStateAffected','convertTargetToStateOriginKey','log','ANY','allBattleMembers','VisuMZ_4_SkillContainers','stateTpSlipDamageJS','TextJS','InputKey','regenerateAll','Parse_Notetags_Skill_Cost','Game_BattlerBase_traitsSet','stateColor','setStateData','BattleManager_endAction','Scene_Skill_skillTypeWindowRect','_cache_CheckBypassRemoveStatesByDamage','onAddBuff','PassiveStates','toggleOn','removeBuffsAuto','<enemy-%1>','isBottomHelpMode','Enemy-%1-%2','ARRAYFUNC','onEraseStateJS','skillTypeWindowRectSkillsStatesCore','clearStateRetainType','canPaySkillCost','isRightInputMode','skill','isUseSkillsStatesCoreUpdatedLayout','Game_Battler_onBattleEnd','greater','name','labelFontFace','MAXMP','createPassiveStatesCache','VisuMZ_3_ItemConcoctSkills','hasToggleSkillAntiCheck','passiveStateIDs','retrieveStateColor','height','removeState','HiddenSkillTypes','setPassiveStateSlipDamageJS','hasSkill','getStypeIdWithName','onDatabaseLoaded','Toggles','overwriteBuffTurns','Game_Battler_addBuff','equipPassives','auto','onExpireStateGlobalJS','skillTypes','ToggleType','createSkillCostText','onItemOk','innerHeight','9298233uccsEV','MAXHP','some','applyBuffTurnManipulationEffects','setBackgroundType','statusWindowRectSkillsStatesCore','FieldSkill','getAuraPassiveStateIDs','ShowData','Window_SkillList_drawItem','Game_Battler_addDebuff','getAuraPassiveStatesFromObj','drawFullGauge','Global','onEraseStateGlobalJS','requestFauxAnimation','frameCount','onExpireDebuff','slipMp','isStateAddable','onAddStateMakeCustomSlipValues','isBuffOrDebuffAffected','onExpireBuffJS','SortByIDandPriority','canClearState','_checkingTraitsSetSkillsStatesCore','isStateCategoryResisted','_cache_getPassiveStateConditionClassesData','TurnOffsetY','groupDefeat','ARRAYJSON','removeStatesByCategoryAll','chanceByDamage','DataOffsetY','debuffColor','ValueFontMainType','skillLearn','Scene_Skill_statusWindowRect','setItem','addDebuff','LabelOutlineWidth','#%1','DisplayedParams','onBattleEnd','calcWindowHeight','anySwitchOn','Game_BattlerBase_refresh','addDebuffTurns','applyItemUserEffect','onAddDebuffGlobalJS','die','refreshAllMembers','Game_BattlerBase_eraseBuff','currentValueSkillsStatesCore','lineHeight','Sprite_Gauge_currentValue','clearStateData','AmplifyWith','Game_BattlerBase_skillMpCost','setStateOrigin','Game_BattlerBase_eraseState','MaxTurns','contents','_categoryWindow','VisuMZ_1_MainMenuCore','setSkillToggle','enemy','Game_Player_refresh','Sprite_Gauge_initMembers','miasmaStateIDs','setDebuffTurns','SkillConditionJS','match','Game_Unit_isAllDead','currentDisplayedValue','Parse_Notetags_State_Category','FieldSkills','_cache_getPassiveStatesFromObj','[OFF]','magicSkills','prepareResetStateCounts','38071oFdNfE','onExpireStateCustomJS','recalculateSlipDamageJS','Game_BattlerBase_die','Scene_Skill_onItemOk_Toggle','meetsSkillConditions','isSceneBattle','State-%1-%2','Game_BattlerBase_skillTpCost','push','ColorBuff','CmdWidth','1739316FrExqc','Window_StatusBase_drawActorIcons','meetsSkillConditionsGlobalJS','_buffs','getStateReapplyRulings','Game_BattlerBase_clearStates','valueOutlineColor','meetsPassiveStateConditionClasses','iconText','refresh','stateCategoriesResisted','stateMpSlipDamageJS'];_0x16b6=function(){return _0xf4dbb2;};return _0x16b6();}const _0x103316=_0x445b;function _0x445b(_0x4b878f,_0x70c12a){const _0x16b642=_0x16b6();return _0x445b=function(_0x445b35,_0x54c092){_0x445b35=_0x445b35-0x8d;let _0x29eed6=_0x16b642[_0x445b35];return _0x29eed6;},_0x445b(_0x4b878f,_0x70c12a);}(function(_0x18fc30,_0x33bc20){const _0x1773af=_0x445b,_0x3bf9fd=_0x18fc30();while(!![]){try{const _0x471b9c=-parseInt(_0x1773af(0x151))/0x1*(-parseInt(_0x1773af(0x230))/0x2)+parseInt(_0x1773af(0x304))/0x3+-parseInt(_0x1773af(0x10d))/0x4*(parseInt(_0x1773af(0x144))/0x5)+parseInt(_0x1773af(0x2df))/0x6+-parseInt(_0x1773af(0x282))/0x7+parseInt(_0x1773af(0x1cc))/0x8*(parseInt(_0x1773af(0x1b8))/0x9)+parseInt(_0x1773af(0x1ac))/0xa*(parseInt(_0x1773af(0x2d3))/0xb);if(_0x471b9c===_0x33bc20)break;else _0x3bf9fd['push'](_0x3bf9fd['shift']());}catch(_0x305278){_0x3bf9fd['push'](_0x3bf9fd['shift']());}}}(_0x16b6,0xd8e21));var label=_0x103316(0x21e),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x64ed9){const _0x302288=_0x103316;return _0x64ed9[_0x302288(0x364)]&&_0x64ed9[_0x302288(0x2ef)][_0x302288(0x1f5)]('['+label+']');})[0x0];VisuMZ[label][_0x103316(0x30c)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x103316(0x219)]=function(_0x1059c6,_0x81f3a3){const _0x51bc7b=_0x103316;for(const _0x152e81 in _0x81f3a3){if(_0x152e81['match'](/(.*):(.*)/i)){const _0x465ea6=String(RegExp['$1']),_0x322586=String(RegExp['$2'])[_0x51bc7b(0x2fa)]()[_0x51bc7b(0x21c)]();let _0x3296dd,_0x44e475,_0x26dbe9;switch(_0x322586){case _0x51bc7b(0x331):_0x3296dd=_0x81f3a3[_0x152e81]!==''?Number(_0x81f3a3[_0x152e81]):0x0;break;case'ARRAYNUM':_0x44e475=_0x81f3a3[_0x152e81]!==''?JSON['parse'](_0x81f3a3[_0x152e81]):[],_0x3296dd=_0x44e475['map'](_0x47d4eb=>Number(_0x47d4eb));break;case _0x51bc7b(0x333):_0x3296dd=_0x81f3a3[_0x152e81]!==''?eval(_0x81f3a3[_0x152e81]):null;break;case _0x51bc7b(0x2f8):_0x44e475=_0x81f3a3[_0x152e81]!==''?JSON['parse'](_0x81f3a3[_0x152e81]):[],_0x3296dd=_0x44e475[_0x51bc7b(0x30d)](_0x220565=>eval(_0x220565));break;case _0x51bc7b(0x314):_0x3296dd=_0x81f3a3[_0x152e81]!==''?JSON[_0x51bc7b(0xaf)](_0x81f3a3[_0x152e81]):'';break;case _0x51bc7b(0x2a0):_0x44e475=_0x81f3a3[_0x152e81]!==''?JSON[_0x51bc7b(0xaf)](_0x81f3a3[_0x152e81]):[],_0x3296dd=_0x44e475[_0x51bc7b(0x30d)](_0x3b107a=>JSON[_0x51bc7b(0xaf)](_0x3b107a));break;case _0x51bc7b(0xa4):_0x3296dd=_0x81f3a3[_0x152e81]!==''?new Function(JSON['parse'](_0x81f3a3[_0x152e81])):new Function(_0x51bc7b(0x13b));break;case _0x51bc7b(0x25e):_0x44e475=_0x81f3a3[_0x152e81]!==''?JSON[_0x51bc7b(0xaf)](_0x81f3a3[_0x152e81]):[],_0x3296dd=_0x44e475['map'](_0x40eab0=>new Function(JSON[_0x51bc7b(0xaf)](_0x40eab0)));break;case _0x51bc7b(0x1e7):_0x3296dd=_0x81f3a3[_0x152e81]!==''?String(_0x81f3a3[_0x152e81]):'';break;case _0x51bc7b(0xd7):_0x44e475=_0x81f3a3[_0x152e81]!==''?JSON[_0x51bc7b(0xaf)](_0x81f3a3[_0x152e81]):[],_0x3296dd=_0x44e475[_0x51bc7b(0x30d)](_0x17cfb5=>String(_0x17cfb5));break;case _0x51bc7b(0xe6):_0x26dbe9=_0x81f3a3[_0x152e81]!==''?JSON['parse'](_0x81f3a3[_0x152e81]):{},_0x1059c6[_0x465ea6]={},VisuMZ[_0x51bc7b(0x219)](_0x1059c6[_0x465ea6],_0x26dbe9);continue;case _0x51bc7b(0x140):_0x44e475=_0x81f3a3[_0x152e81]!==''?JSON[_0x51bc7b(0xaf)](_0x81f3a3[_0x152e81]):[],_0x3296dd=_0x44e475['map'](_0x5b19ee=>VisuMZ['ConvertParams']({},JSON[_0x51bc7b(0xaf)](_0x5b19ee)));break;default:continue;}_0x1059c6[_0x465ea6]=_0x3296dd;}}return _0x1059c6;},(_0x2eed8f=>{const _0x322697=_0x103316,_0x1711c8=_0x2eed8f[_0x322697(0x268)];for(const _0x533028 of dependencies){if(!Imported[_0x533028]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1711c8,_0x533028)),SceneManager[_0x322697(0x113)]();break;}}const _0x4ba5ae=_0x2eed8f[_0x322697(0x2ef)];if(_0x4ba5ae[_0x322697(0x2ca)](/\[Version[ ](.*?)\]/i)){const _0x338fd0=Number(RegExp['$1']);_0x338fd0!==VisuMZ[label][_0x322697(0x149)]&&(alert(_0x322697(0x392)[_0x322697(0x156)](_0x1711c8,_0x338fd0)),SceneManager[_0x322697(0x113)]());}if(_0x4ba5ae[_0x322697(0x2ca)](/\[Tier[ ](\d+)\]/i)){const _0x393c6f=Number(RegExp['$1']);_0x393c6f<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x322697(0x156)](_0x1711c8,_0x393c6f,tier)),SceneManager[_0x322697(0x113)]()):tier=Math[_0x322697(0x233)](_0x393c6f,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x322697(0x30c)],_0x2eed8f[_0x322697(0x12b)]);})(pluginData),PluginManager[_0x103316(0x1d5)](pluginData['name'],_0x103316(0x375),_0x4ed1a5=>{const _0x1879d4=_0x103316;VisuMZ[_0x1879d4(0x219)](_0x4ed1a5,_0x4ed1a5);const _0x4464c4=_0x4ed1a5[_0x1879d4(0x16c)]||[],_0xb070fa=Number(_0x4ed1a5[_0x1879d4(0x9c)]),_0x3c1a20=$dataSkills[_0xb070fa];if(!_0x3c1a20)return;for(const _0xced886 of _0x4464c4){const _0x17393b=$gameActors[_0x1879d4(0xa5)](_0xced886);if(!_0x17393b)continue;_0x17393b[_0x1879d4(0x310)](_0x3c1a20);}}),PluginManager['registerCommand'](pluginData[_0x103316(0x268)],_0x103316(0xda),_0x10bc18=>{const _0x3a5703=_0x103316;VisuMZ[_0x3a5703(0x219)](_0x10bc18,_0x10bc18);const _0x127805=_0x10bc18['EnemyIndex']||[],_0x31762f=Number(_0x10bc18[_0x3a5703(0x9c)]),_0x419456=$dataSkills[_0x31762f];if(!_0x419456)return;for(const _0x5c5af5 of _0x127805){const _0x2020c7=$gameTroop[_0x3a5703(0x220)]()[_0x5c5af5];if(!_0x2020c7)continue;_0x2020c7[_0x3a5703(0x310)](_0x419456);}}),PluginManager[_0x103316(0x1d5)](pluginData[_0x103316(0x268)],_0x103316(0x235),_0x3874ab=>{const _0x36eb7e=_0x103316;VisuMZ[_0x36eb7e(0x219)](_0x3874ab,_0x3874ab);const _0x1b7868=_0x3874ab[_0x36eb7e(0x16c)]||[],_0x218218=Number(_0x3874ab['StateID']),_0x30d281=Number(_0x3874ab[_0x36eb7e(0x20b)]),_0x511e19=_0x3874ab['AutoAddState'];for(const _0x19a39c of _0x1b7868){const _0x55c705=$gameActors[_0x36eb7e(0xa5)](_0x19a39c);if(!_0x55c705)continue;_0x511e19&&!_0x55c705[_0x36eb7e(0x246)](_0x218218)?(_0x55c705[_0x36eb7e(0x109)](_0x218218),_0x55c705[_0x36eb7e(0x1be)](_0x218218,_0x30d281)):_0x55c705['addStateTurns'](_0x218218,_0x30d281);}}),PluginManager['registerCommand'](pluginData['name'],_0x103316(0x312),_0x2ae7ee=>{const _0x217e92=_0x103316;VisuMZ[_0x217e92(0x219)](_0x2ae7ee,_0x2ae7ee);const _0x39b707=_0x2ae7ee[_0x217e92(0x16c)]||[],_0x5eb649=Number(_0x2ae7ee['StateID']),_0x46cc20=Math[_0x217e92(0x233)](Number(_0x2ae7ee[_0x217e92(0x20b)]),0x0),_0x20692c=_0x2ae7ee[_0x217e92(0x2f5)];for(const _0x3b3265 of _0x39b707){const _0x3f6118=$gameActors[_0x217e92(0xa5)](_0x3b3265);if(!_0x3f6118)continue;_0x20692c&&!_0x3f6118['isStateAffected'](_0x5eb649)&&_0x3f6118[_0x217e92(0x109)](_0x5eb649),_0x3f6118[_0x217e92(0x1be)](_0x5eb649,_0x46cc20);}}),PluginManager['registerCommand'](pluginData['name'],_0x103316(0xca),_0x4f61c9=>{const _0x11d0c0=_0x103316;if(!$gameParty[_0x11d0c0(0x157)]())return;VisuMZ[_0x11d0c0(0x219)](_0x4f61c9,_0x4f61c9);const _0x463bca=_0x4f61c9[_0x11d0c0(0x3a0)]||[],_0xe54fd4=Number(_0x4f61c9[_0x11d0c0(0x241)]),_0x414c5d=Number(_0x4f61c9[_0x11d0c0(0x20b)]),_0x56f984=_0x4f61c9[_0x11d0c0(0x2f5)];for(const _0x513c94 of _0x463bca){const _0x37ae8c=$gameTroop[_0x11d0c0(0x220)]()[_0x513c94];if(!_0x37ae8c)continue;_0x56f984&&!_0x37ae8c[_0x11d0c0(0x246)](_0xe54fd4)?(_0x37ae8c['addState'](_0xe54fd4),_0x37ae8c[_0x11d0c0(0x1be)](_0xe54fd4,_0x414c5d)):_0x37ae8c['addStateTurns'](_0xe54fd4,_0x414c5d);}}),PluginManager[_0x103316(0x1d5)](pluginData[_0x103316(0x268)],'StateTurnsEnemyChangeTo',_0x1ee151=>{const _0x16af0a=_0x103316;if(!$gameParty[_0x16af0a(0x157)]())return;VisuMZ[_0x16af0a(0x219)](_0x1ee151,_0x1ee151);const _0x3fa26a=_0x1ee151[_0x16af0a(0x3a0)]||[],_0x23b6d9=Number(_0x1ee151[_0x16af0a(0x241)]),_0x837c1b=Math['max'](Number(_0x1ee151[_0x16af0a(0x20b)]),0x0),_0x3d895b=_0x1ee151[_0x16af0a(0x2f5)];for(const _0x509d9f of _0x3fa26a){const _0x1a79ad=$gameTroop[_0x16af0a(0x220)]()[_0x509d9f];if(!_0x1a79ad)continue;_0x3d895b&&!_0x1a79ad['isStateAffected'](_0x23b6d9)&&_0x1a79ad[_0x16af0a(0x109)](_0x23b6d9),_0x1a79ad[_0x16af0a(0x1be)](_0x23b6d9,_0x837c1b);}}),VisuMZ[_0x103316(0x21e)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x103316(0x21b)][_0x103316(0x276)],Scene_Boot[_0x103316(0x21b)][_0x103316(0x276)]=function(){const _0x8dc11=_0x103316;VisuMZ[_0x8dc11(0x21e)]['Scene_Boot_onDatabaseLoaded'][_0x8dc11(0x1f3)](this),this[_0x8dc11(0x374)](),VisuMZ['SkillsStatesCore']['CheckIncompatibleStates']();},Scene_Boot[_0x103316(0x21b)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x4a1cdd=_0x103316;this['process_VisuMZ_SkillsStatesCore_CheckForAuras']();if(VisuMZ[_0x4a1cdd(0x307)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x4a1cdd(0x177)]();},Scene_Boot[_0x103316(0x21b)][_0x103316(0x10f)]=function(){const _0x4c806b=_0x103316;for(const _0x3c948d of $dataSkills){if(!_0x3c948d)continue;VisuMZ[_0x4c806b(0x21e)]['Parse_Notetags_Skill_Cost'](_0x3c948d),VisuMZ[_0x4c806b(0x21e)][_0x4c806b(0x327)](_0x3c948d),VisuMZ[_0x4c806b(0x21e)][_0x4c806b(0x12a)](_0x3c948d);}},Scene_Boot[_0x103316(0x21b)][_0x103316(0x177)]=function(){const _0x42ba2c=_0x103316;for(const _0xad5d84 of $dataStates){if(!_0xad5d84)continue;VisuMZ[_0x42ba2c(0x21e)]['Parse_Notetags_State_Category'](_0xad5d84),VisuMZ[_0x42ba2c(0x21e)]['Parse_Notetags_State_PassiveJS'](_0xad5d84),VisuMZ['SkillsStatesCore'][_0x42ba2c(0x1d9)](_0xad5d84),VisuMZ[_0x42ba2c(0x21e)][_0x42ba2c(0x1f9)](_0xad5d84);}},VisuMZ['SkillsStatesCore'][_0x103316(0x389)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x103316(0x389)]=function(_0x2fb4ee){const _0x584d94=_0x103316;VisuMZ[_0x584d94(0x21e)][_0x584d94(0x389)][_0x584d94(0x1f3)](this,_0x2fb4ee),VisuMZ['SkillsStatesCore'][_0x584d94(0x250)](_0x2fb4ee),VisuMZ[_0x584d94(0x21e)]['Parse_Notetags_Skill_Sorting'](_0x2fb4ee),VisuMZ[_0x584d94(0x21e)]['Parse_Notetags_Skill_JS'](_0x2fb4ee);},VisuMZ[_0x103316(0x21e)][_0x103316(0x31a)]=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x37dc58){const _0x1e264b=_0x103316;VisuMZ[_0x1e264b(0x21e)]['ParseStateNotetags'][_0x1e264b(0x1f3)](this,_0x37dc58),VisuMZ['SkillsStatesCore'][_0x1e264b(0x2cd)](_0x37dc58),VisuMZ[_0x1e264b(0x21e)][_0x1e264b(0x35c)](_0x37dc58),VisuMZ[_0x1e264b(0x21e)][_0x1e264b(0x1d9)](_0x37dc58),VisuMZ[_0x1e264b(0x21e)][_0x1e264b(0x1f9)](_0x37dc58);},VisuMZ[_0x103316(0x21e)][_0x103316(0x250)]=function(_0x4b18c9){const _0x4e4dd3=_0x103316,_0x9f8381=_0x4b18c9[_0x4e4dd3(0x2eb)];_0x9f8381[_0x4e4dd3(0x2ca)](/<MP COST:[ ](\d+)>/i)&&(_0x4b18c9[_0x4e4dd3(0x215)]=Number(RegExp['$1'])),_0x9f8381['match'](/<TP COST:[ ](\d+)>/i)&&(_0x4b18c9[_0x4e4dd3(0x23e)]=Number(RegExp['$1']));},VisuMZ[_0x103316(0x21e)]['Parse_Notetags_Skill_Sorting']=function(_0x19ebe8){const _0x2ae4f4=_0x103316;if(!_0x19ebe8)return;_0x19ebe8['sortPriority']=0x32;const _0x491a33=_0x19ebe8[_0x2ae4f4(0x2eb)]||'';_0x491a33[_0x2ae4f4(0x2ca)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x19ebe8[_0x2ae4f4(0x301)]=Number(RegExp['$1']));},VisuMZ[_0x103316(0x21e)][_0x103316(0xa3)]={},VisuMZ[_0x103316(0x21e)][_0x103316(0x37e)]={},VisuMZ[_0x103316(0x21e)]['Parse_Notetags_Skill_JS']=function(_0x86592a){const _0x2a26c2=_0x103316,_0x57d8a4=_0x86592a[_0x2a26c2(0x2eb)];if(_0x57d8a4[_0x2a26c2(0x2ca)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x3ba7d0=String(RegExp['$1']),_0x50c396=_0x2a26c2(0x17a)[_0x2a26c2(0x156)](_0x3ba7d0);VisuMZ[_0x2a26c2(0x21e)][_0x2a26c2(0xa3)][_0x86592a['id']]=new Function(_0x2a26c2(0x264),_0x50c396);}if(_0x57d8a4[_0x2a26c2(0x2ca)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x9ac159=String(RegExp['$1']),_0x4c0ca0=_0x2a26c2(0x355)['format'](_0x9ac159);VisuMZ[_0x2a26c2(0x21e)][_0x2a26c2(0x37e)][_0x86592a['id']]=new Function(_0x2a26c2(0x264),_0x4c0ca0);}},VisuMZ[_0x103316(0x21e)][_0x103316(0x2cd)]=function(_0x390c08){const _0x318ef4=_0x103316;_0x390c08['categories']=[_0x318ef4(0x317),_0x318ef4(0x249)];const _0x468ddd=_0x390c08[_0x318ef4(0x2eb)],_0x52986d=_0x468ddd[_0x318ef4(0x2ca)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x52986d)for(const _0x19eebd of _0x52986d){_0x19eebd[_0x318ef4(0x2ca)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x510e0b=String(RegExp['$1'])[_0x318ef4(0x2fa)]()[_0x318ef4(0x21c)]()[_0x318ef4(0x1bc)](',');for(const _0x4620d9 of _0x510e0b){_0x390c08[_0x318ef4(0x212)][_0x318ef4(0x2dc)](_0x4620d9[_0x318ef4(0x21c)]());}}if(_0x468ddd['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x1d10a4=RegExp['$1'][_0x318ef4(0x1bc)](/[\r\n]+/);for(const _0x1aa096 of _0x1d10a4){_0x390c08[_0x318ef4(0x212)][_0x318ef4(0x2dc)](_0x1aa096[_0x318ef4(0x2fa)]()[_0x318ef4(0x21c)]());}}_0x468ddd['match'](/<POSITIVE STATE>/i)&&_0x390c08[_0x318ef4(0x212)][_0x318ef4(0x2dc)](_0x318ef4(0x120)),_0x468ddd[_0x318ef4(0x2ca)](/<NEGATIVE STATE>/i)&&_0x390c08[_0x318ef4(0x212)][_0x318ef4(0x2dc)]('NEGATIVE');},VisuMZ[_0x103316(0x21e)][_0x103316(0x17d)]={},VisuMZ[_0x103316(0x21e)]['Parse_Notetags_State_PassiveJS']=function(_0x342cab){const _0x4be892=_0x103316,_0x496c54=_0x342cab[_0x4be892(0x2eb)];if(_0x496c54['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x655837=String(RegExp['$1']),_0x66d491='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x4be892(0x156)](_0x655837);VisuMZ[_0x4be892(0x21e)][_0x4be892(0x17d)][_0x342cab['id']]=new Function('state',_0x66d491);}},VisuMZ[_0x103316(0x21e)]['stateHpSlipDamageJS']={},VisuMZ['SkillsStatesCore'][_0x103316(0x17f)]={},VisuMZ[_0x103316(0x21e)][_0x103316(0x2ea)]={},VisuMZ[_0x103316(0x21e)][_0x103316(0x31c)]={},VisuMZ[_0x103316(0x21e)]['stateTpSlipDamageJS']={},VisuMZ[_0x103316(0x21e)][_0x103316(0x33b)]={},VisuMZ['SkillsStatesCore'][_0x103316(0x1d9)]=function(_0x427982){const _0x12846e=_0x103316,_0x4df26b=_0x427982[_0x12846e(0x2eb)],_0x53dd1b=_0x12846e(0x37c);if(_0x4df26b[_0x12846e(0x2ca)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x231856=String(RegExp['$1']),_0x5544ea=_0x53dd1b[_0x12846e(0x156)](_0x231856,_0x12846e(0x30f),-0x1,_0x12846e(0x217));VisuMZ[_0x12846e(0x21e)][_0x12846e(0xc7)][_0x427982['id']]=new Function('stateId',_0x5544ea);}else{if(_0x4df26b['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x4888e6=String(RegExp['$1']),_0x5eaadd=_0x53dd1b[_0x12846e(0x156)](_0x4888e6,_0x12846e(0xf2),0x1,_0x12846e(0x217));VisuMZ[_0x12846e(0x21e)][_0x12846e(0x17f)][_0x427982['id']]=new Function(_0x12846e(0x303),_0x5eaadd);}}if(_0x4df26b[_0x12846e(0x2ca)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x21f766=String(RegExp['$1']),_0x5ca5fe=_0x53dd1b['format'](_0x21f766,_0x12846e(0x30f),-0x1,_0x12846e(0x294));VisuMZ[_0x12846e(0x21e)][_0x12846e(0x2ea)][_0x427982['id']]=new Function(_0x12846e(0x303),_0x5ca5fe);}else{if(_0x4df26b[_0x12846e(0x2ca)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x1ebc42=String(RegExp['$1']),_0x714fa9=_0x53dd1b[_0x12846e(0x156)](_0x1ebc42,_0x12846e(0xf2),0x1,'slipMp');VisuMZ[_0x12846e(0x21e)]['stateMpSlipHealJS'][_0x427982['id']]=new Function('stateId',_0x714fa9);}}if(_0x4df26b['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x3e968e=String(RegExp['$1']),_0x2d5576=_0x53dd1b['format'](_0x3e968e,_0x12846e(0x30f),-0x1,_0x12846e(0x34b));VisuMZ['SkillsStatesCore'][_0x12846e(0x24c)][_0x427982['id']]=new Function('stateId',_0x2d5576);}else{if(_0x4df26b['match'](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x5d2c05=String(RegExp['$1']),_0x524fc9=_0x53dd1b[_0x12846e(0x156)](_0x5d2c05,_0x12846e(0xf2),0x1,_0x12846e(0x34b));VisuMZ[_0x12846e(0x21e)][_0x12846e(0x33b)][_0x427982['id']]=new Function(_0x12846e(0x303),_0x524fc9);}}},VisuMZ[_0x103316(0x21e)][_0x103316(0x22f)]={},VisuMZ['SkillsStatesCore'][_0x103316(0x213)]={},VisuMZ[_0x103316(0x21e)]['stateExpireJS']={},VisuMZ[_0x103316(0x21e)][_0x103316(0x1f9)]=function(_0x242ae6){const _0x370533=_0x103316,_0x1ef23d=_0x242ae6[_0x370533(0x2eb)],_0x18479e=_0x370533(0x93);if(_0x1ef23d[_0x370533(0x2ca)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x411c5b=String(RegExp['$1']),_0x1f439b=_0x18479e['format'](_0x411c5b);VisuMZ[_0x370533(0x21e)][_0x370533(0x22f)][_0x242ae6['id']]=new Function(_0x370533(0x303),_0x1f439b);}if(_0x1ef23d['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0xe40768=String(RegExp['$1']),_0x4fa10b=_0x18479e[_0x370533(0x156)](_0xe40768);VisuMZ[_0x370533(0x21e)][_0x370533(0x213)][_0x242ae6['id']]=new Function(_0x370533(0x303),_0x4fa10b);}if(_0x1ef23d[_0x370533(0x2ca)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x1ef289=String(RegExp['$1']),_0x24ada5=_0x18479e['format'](_0x1ef289);VisuMZ[_0x370533(0x21e)][_0x370533(0x386)][_0x242ae6['id']]=new Function('stateId',_0x24ada5);}},VisuMZ[_0x103316(0x21e)][_0x103316(0xbd)]=function(){const _0x26afd2=_0x103316;if(!VisuMZ[_0x26afd2(0x21e)][_0x26afd2(0x30c)][_0x26afd2(0x35e)][_0x26afd2(0x131)])return;for(const _0x55bfad of $dataStates){if(!_0x55bfad)continue;_0x55bfad[_0x26afd2(0x18a)]===0x4&&_0x55bfad[_0x26afd2(0xd6)]===0x1&&(_0x55bfad[_0x26afd2(0xd6)]=0x2);}},VisuMZ[_0x103316(0x21e)][_0x103316(0xf0)]=function(_0x4708e6,_0x38bd2e){const _0x3c8444=_0x103316;if(VisuMZ['createKeyJS'])return VisuMZ['createKeyJS'](_0x4708e6,_0x38bd2e);let _0x412c01='';if($dataActors['includes'](_0x4708e6))_0x412c01=_0x3c8444(0x197)[_0x3c8444(0x156)](_0x4708e6['id'],_0x38bd2e);if($dataClasses[_0x3c8444(0x1f5)](_0x4708e6))_0x412c01='Class-%1-%2'[_0x3c8444(0x156)](_0x4708e6['id'],_0x38bd2e);if($dataSkills[_0x3c8444(0x1f5)](_0x4708e6))_0x412c01=_0x3c8444(0xab)[_0x3c8444(0x156)](_0x4708e6['id'],_0x38bd2e);if($dataItems[_0x3c8444(0x1f5)](_0x4708e6))_0x412c01='Item-%1-%2'['format'](_0x4708e6['id'],_0x38bd2e);if($dataWeapons[_0x3c8444(0x1f5)](_0x4708e6))_0x412c01='Weapon-%1-%2'[_0x3c8444(0x156)](_0x4708e6['id'],_0x38bd2e);if($dataArmors[_0x3c8444(0x1f5)](_0x4708e6))_0x412c01='Armor-%1-%2'[_0x3c8444(0x156)](_0x4708e6['id'],_0x38bd2e);if($dataEnemies[_0x3c8444(0x1f5)](_0x4708e6))_0x412c01=_0x3c8444(0x25d)[_0x3c8444(0x156)](_0x4708e6['id'],_0x38bd2e);if($dataStates['includes'](_0x4708e6))_0x412c01=_0x3c8444(0x2da)['format'](_0x4708e6['id'],_0x38bd2e);return _0x412c01;},DataManager['getClassIdWithName']=function(_0x1ffdbf){const _0x3fa292=_0x103316;_0x1ffdbf=_0x1ffdbf['toUpperCase']()[_0x3fa292(0x21c)](),this[_0x3fa292(0xbc)]=this[_0x3fa292(0xbc)]||{};if(this[_0x3fa292(0xbc)][_0x1ffdbf])return this[_0x3fa292(0xbc)][_0x1ffdbf];for(const _0x5d90d5 of $dataClasses){if(!_0x5d90d5)continue;let _0x4455be=_0x5d90d5[_0x3fa292(0x268)];_0x4455be=_0x4455be['replace'](/\x1I\[(\d+)\]/gi,''),_0x4455be=_0x4455be[_0x3fa292(0x39d)](/\\I\[(\d+)\]/gi,''),this[_0x3fa292(0xbc)][_0x4455be[_0x3fa292(0x2fa)]()[_0x3fa292(0x21c)]()]=_0x5d90d5['id'];}return this['_classIDs'][_0x1ffdbf]||0x0;},DataManager[_0x103316(0x322)]=function(_0x33934f){const _0x1d6262=_0x103316;this[_0x1d6262(0x1fc)]=this[_0x1d6262(0x1fc)]||{};if(this['_stypeIDs'][_0x33934f['id']])return this[_0x1d6262(0x1fc)][_0x33934f['id']];this['_stypeIDs'][_0x33934f['id']]=[_0x33934f[_0x1d6262(0x376)]];if(_0x33934f[_0x1d6262(0x2eb)][_0x1d6262(0x2ca)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d76dc=JSON[_0x1d6262(0xaf)]('['+RegExp['$1'][_0x1d6262(0x2ca)](/\d+/g)+']');this[_0x1d6262(0x1fc)][_0x33934f['id']]=this[_0x1d6262(0x1fc)][_0x33934f['id']][_0x1d6262(0x188)](_0x4d76dc);}else{if(_0x33934f[_0x1d6262(0x2eb)][_0x1d6262(0x2ca)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2a01ac=RegExp['$1']['split'](',');for(const _0x304c7d of _0x2a01ac){const _0x9ff58=DataManager[_0x1d6262(0x275)](_0x304c7d);if(_0x9ff58)this[_0x1d6262(0x1fc)][_0x33934f['id']][_0x1d6262(0x2dc)](_0x9ff58);}}}return this['_stypeIDs'][_0x33934f['id']];},DataManager[_0x103316(0x275)]=function(_0x332b9f){const _0x5ce7b4=_0x103316;_0x332b9f=_0x332b9f[_0x5ce7b4(0x2fa)]()['trim'](),this[_0x5ce7b4(0x1fc)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x332b9f])return this[_0x5ce7b4(0x1fc)][_0x332b9f];for(let _0x64680c=0x1;_0x64680c<0x64;_0x64680c++){if(!$dataSystem[_0x5ce7b4(0x27d)][_0x64680c])continue;let _0x4e373b=$dataSystem['skillTypes'][_0x64680c]['toUpperCase']()[_0x5ce7b4(0x21c)]();_0x4e373b=_0x4e373b[_0x5ce7b4(0x39d)](/\x1I\[(\d+)\]/gi,''),_0x4e373b=_0x4e373b[_0x5ce7b4(0x39d)](/\\I\[(\d+)\]/gi,''),this[_0x5ce7b4(0x1fc)][_0x4e373b]=_0x64680c;}return this[_0x5ce7b4(0x1fc)][_0x332b9f]||0x0;},DataManager[_0x103316(0x122)]=function(_0x49fb73){const _0x2e7902=_0x103316;_0x49fb73=_0x49fb73[_0x2e7902(0x2fa)]()[_0x2e7902(0x21c)](),this[_0x2e7902(0x2fe)]=this['_skillIDs']||{};if(this[_0x2e7902(0x2fe)][_0x49fb73])return this[_0x2e7902(0x2fe)][_0x49fb73];for(const _0x36fb9b of $dataSkills){if(!_0x36fb9b)continue;this[_0x2e7902(0x2fe)][_0x36fb9b['name'][_0x2e7902(0x2fa)]()[_0x2e7902(0x21c)]()]=_0x36fb9b['id'];}return this[_0x2e7902(0x2fe)][_0x49fb73]||0x0;},DataManager['getStateIdWithName']=function(_0x4276de){const _0x2d5292=_0x103316;_0x4276de=_0x4276de[_0x2d5292(0x2fa)]()['trim'](),this['_stateIDs']=this[_0x2d5292(0x245)]||{};if(this[_0x2d5292(0x245)][_0x4276de])return this[_0x2d5292(0x245)][_0x4276de];for(const _0x22815a of $dataStates){if(!_0x22815a)continue;this[_0x2d5292(0x245)][_0x22815a[_0x2d5292(0x268)][_0x2d5292(0x2fa)]()[_0x2d5292(0x21c)]()]=_0x22815a['id'];}return this[_0x2d5292(0x245)][_0x4276de]||0x0;},DataManager[_0x103316(0x141)]=function(_0x5f10d9){const _0x2c1901=_0x103316;this[_0x2c1901(0x31b)]=this[_0x2c1901(0x31b)]||{};if(this['_stateMaxTurns'][_0x5f10d9])return this[_0x2c1901(0x31b)][_0x5f10d9];return $dataStates[_0x5f10d9][_0x2c1901(0x2eb)][_0x2c1901(0x2ca)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x2c1901(0x31b)][_0x5f10d9]=Number(RegExp['$1']):this[_0x2c1901(0x31b)][_0x5f10d9]=VisuMZ[_0x2c1901(0x21e)][_0x2c1901(0x30c)][_0x2c1901(0x35e)]['MaxTurns'],this[_0x2c1901(0x31b)][_0x5f10d9];},DataManager['getSkillChangesFromState']=function(_0x3ce752){const _0x3d10fb=_0x103316;if(!_0x3ce752)return{};this[_0x3d10fb(0x9b)]=this[_0x3d10fb(0x9b)]||{};if(this['_skillChangesFromState'][_0x3ce752['id']]!==undefined)return this[_0x3d10fb(0x9b)][_0x3ce752['id']];const _0x14a38c=_0x3ce752[_0x3d10fb(0x2eb)]||'',_0x479067={};{const _0x4a196c=_0x14a38c[_0x3d10fb(0x2ca)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x4a196c)for(const _0x1597c0 of _0x4a196c){_0x1597c0[_0x3d10fb(0x2ca)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x8bd440=String(RegExp['$1']),_0x10e85b=String(RegExp['$2']);VisuMZ[_0x3d10fb(0x21e)][_0x3d10fb(0xeb)](_0x479067,_0x8bd440,_0x10e85b);}}if(_0x14a38c[_0x3d10fb(0x2ca)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x36e421=String(RegExp['$1'])[_0x3d10fb(0x1bc)](/[\r\n]+/)[_0x3d10fb(0x225)]('');for(const _0x21ef4f of _0x36e421){if(_0x21ef4f[_0x3d10fb(0x2ca)](/(.*)[ ]>>>[ ](.*)/i)){let _0x29f496=String(RegExp['$1']),_0x329984=String(RegExp['$2']);VisuMZ[_0x3d10fb(0x21e)][_0x3d10fb(0xeb)](_0x479067,_0x29f496,_0x329984);}}}return this[_0x3d10fb(0x9b)][_0x3ce752['id']]=_0x479067,this[_0x3d10fb(0x9b)][_0x3ce752['id']];},VisuMZ[_0x103316(0x21e)]['ParseSkillChangessIntoData']=function(_0x471d56,_0x189995,_0x4dcae8){const _0x356d4b=_0x103316;/^\d+$/[_0x356d4b(0xbb)](_0x189995)?_0x189995=Number(_0x189995):_0x189995=DataManager[_0x356d4b(0x122)](_0x189995),/^\d+$/['test'](_0x4dcae8)?_0x4dcae8=Number(_0x4dcae8):_0x4dcae8=DataManager[_0x356d4b(0x122)](_0x4dcae8),_0x471d56[_0x189995]=_0x4dcae8;},DataManager[_0x103316(0x320)]=function(_0x6189b9){const _0x514594=_0x103316;if(!DataManager[_0x514594(0x22b)](_0x6189b9))return![];this[_0x514594(0x313)]=this[_0x514594(0x313)]||{};if(this[_0x514594(0x313)][_0x6189b9['id']]!==undefined)return this['_cache_isToggleSkill'][_0x6189b9['id']];this[_0x514594(0x313)][_0x6189b9['id']]=![];const _0x22c623=_0x6189b9[_0x514594(0x2eb)]||'';if(_0x22c623[_0x514594(0x2ca)](/<TOGGLE>/i))this[_0x514594(0x313)][_0x6189b9['id']]=!![];else{if(_0x22c623[_0x514594(0x2ca)](/<INITIAL TOGGLE: ON>/i))this[_0x514594(0x313)][_0x6189b9['id']]=!![];else{if(_0x22c623[_0x514594(0x2ca)](/<INITIAL TOGGLE: OFF>/i))this[_0x514594(0x313)][_0x6189b9['id']]=!![];else _0x22c623[_0x514594(0x2ca)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(this['_cache_isToggleSkill'][_0x6189b9['id']]=!![]);}}return this[_0x514594(0x26d)](_0x22c623)&&(this[_0x514594(0x313)][_0x6189b9['id']]=![]),this[_0x514594(0x313)][_0x6189b9['id']];},DataManager[_0x103316(0x26d)]=function(_0x3d4c72){const _0x5a5276=_0x103316;if(Imported[_0x5a5276(0x1c9)]){const _0x29cf5d=VisuMZ[_0x5a5276(0x226)][_0x5a5276(0x1a9)];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x29cf5d[_0x5a5276(0xaa)]))return!![];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x29cf5d[_0x5a5276(0xa0)]))return!![];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x29cf5d[_0x5a5276(0x107)]))return!![];}if(Imported[_0x5a5276(0x172)]){const _0x2e9c66=VisuMZ['EvoMatrixSkills'][_0x5a5276(0x1a9)];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x2e9c66[_0x5a5276(0x11a)]))return!![];if(_0x3d4c72['match'](_0x2e9c66[_0x5a5276(0xe1)]))return!![];if(_0x3d4c72['match'](_0x2e9c66[_0x5a5276(0xd2)]))return!![];}if(Imported['VisuMZ_3_InputComboSkills']){const _0x2a7d4a=VisuMZ[_0x5a5276(0x182)][_0x5a5276(0x1a9)];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x2a7d4a[_0x5a5276(0x24e)]))return!![];}if(Imported[_0x5a5276(0x1b0)]){const _0x1fcc78=VisuMZ[_0x5a5276(0x2ce)][_0x5a5276(0x1a9)];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x1fcc78[_0x5a5276(0x288)]))return!![];}if(Imported['VisuMZ_3_ItemAmplifySkills']){const _0x56080b=VisuMZ[_0x5a5276(0xb3)][_0x5a5276(0x1a9)];if(_0x3d4c72['match'](_0x56080b[_0x5a5276(0x2bb)]))return!![];}if(Imported[_0x5a5276(0x26c)]){const _0xa175ea=VisuMZ[_0x5a5276(0x119)][_0x5a5276(0x1a9)];if(_0x3d4c72[_0x5a5276(0x2ca)](_0xa175ea['CanConcoct']))return!![];}if(Imported[_0x5a5276(0x1ad)]){const _0x540245=VisuMZ[_0x5a5276(0x165)][_0x5a5276(0x1a9)];if(_0x3d4c72['match'](_0x540245['CanThrowType']))return!![];}if(Imported[_0x5a5276(0x24b)]){const _0x11b46e=VisuMZ['SkillContainers']['RegExp'];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x11b46e['KnownList']))return!![];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x11b46e['KnownListRange']))return!![];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x11b46e[_0x5a5276(0x91)]))return!![];if(_0x3d4c72[_0x5a5276(0x2ca)](_0x11b46e[_0x5a5276(0x112)]))return!![];}return![];},DataManager['defaultToggleSkillSetting']=function(_0x5f4d44){const _0x44b171=_0x103316,_0x58cc05=_0x5f4d44?_0x5f4d44[_0x44b171(0x2eb)]||'':'';if(_0x58cc05[_0x44b171(0x2ca)](/<INITIAL TOGGLE: ON>/i))return!![];else{if(_0x58cc05['match'](/<INITIAL TOGGLE: OFF>/i))return![];}return VisuMZ[_0x44b171(0x21e)][_0x44b171(0x30c)]['Toggles'][_0x44b171(0x15b)];},DataManager[_0x103316(0x358)]=function(_0x1deb41){const _0x468ea0=_0x103316;if(!this[_0x468ea0(0x22b)](_0x1deb41))return[];this['_cache_toggleExclusionGroups']=this[_0x468ea0(0xcf)]||{};if(this[_0x468ea0(0xcf)][_0x1deb41['id']]!==undefined)return this['_cache_toggleExclusionGroups'][_0x1deb41['id']];let _0x4b2fc1=[];const _0x5ca6e6=_0x1deb41[_0x468ea0(0x2eb)]||'';return _0x5ca6e6[_0x468ea0(0x2ca)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(_0x4b2fc1=String(RegExp['$1'])['split'](',')[_0x468ea0(0x30d)](_0x2ec38a=>_0x2ec38a[_0x468ea0(0x2fa)]()['trim']())),this[_0x468ea0(0xcf)][_0x1deb41['id']]=_0x4b2fc1,this[_0x468ea0(0xcf)][_0x1deb41['id']];},TextManager[_0x103316(0xa9)]=VisuMZ[_0x103316(0x21e)][_0x103316(0x30c)][_0x103316(0x277)][_0x103316(0x27e)]??_0x103316(0x13a),TextManager[_0x103316(0x259)]=VisuMZ['SkillsStatesCore'][_0x103316(0x30c)][_0x103316(0x277)][_0x103316(0x1df)]??'\x5cFS[22]\x5cC[0][ON]',TextManager[_0x103316(0xe4)]=VisuMZ[_0x103316(0x21e)][_0x103316(0x30c)][_0x103316(0x277)]['ToggleOff']??_0x103316(0x173),TextManager[_0x103316(0x95)]=VisuMZ['SkillsStatesCore']['Settings'][_0x103316(0x277)][_0x103316(0xf5)]??'back',ColorManager[_0x103316(0xfd)]=function(_0x349c27,_0x30d4c4){const _0x33dd02=_0x103316;return _0x30d4c4=String(_0x30d4c4),this[_0x33dd02(0x2ee)]=this[_0x33dd02(0x2ee)]||{},_0x30d4c4['match'](/#(.*)/i)?this['_colorCache'][_0x349c27]=_0x33dd02(0x2ab)[_0x33dd02(0x156)](String(RegExp['$1'])):this[_0x33dd02(0x2ee)][_0x349c27]=this[_0x33dd02(0x39c)](Number(_0x30d4c4)),this[_0x33dd02(0x2ee)][_0x349c27];},ColorManager[_0x103316(0x344)]=function(_0x1a4638){const _0x197212=_0x103316;return _0x1a4638=String(_0x1a4638),_0x1a4638[_0x197212(0x2ca)](/#(.*)/i)?_0x197212(0x2ab)[_0x197212(0x156)](String(RegExp['$1'])):this['textColor'](Number(_0x1a4638));},ColorManager[_0x103316(0x252)]=function(_0x184ce1){const _0x12fd4c=_0x103316;if(typeof _0x184ce1===_0x12fd4c(0x171))_0x184ce1=$dataStates[_0x184ce1];const _0x3e5e29=_0x12fd4c(0x181)['format'](_0x184ce1['id']);this[_0x12fd4c(0x2ee)]=this[_0x12fd4c(0x2ee)]||{};if(this[_0x12fd4c(0x2ee)][_0x3e5e29])return this[_0x12fd4c(0x2ee)][_0x3e5e29];const _0x353624=this['retrieveStateColor'](_0x184ce1);return this[_0x12fd4c(0xfd)](_0x3e5e29,_0x353624);},ColorManager[_0x103316(0x26f)]=function(_0x24c9d6){const _0x2c3a30=_0x103316,_0x76db03=_0x24c9d6['note'];if(_0x76db03['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x76db03[_0x2c3a30(0x2ca)](/<POSITIVE STATE>/i))return VisuMZ[_0x2c3a30(0x21e)][_0x2c3a30(0x30c)][_0x2c3a30(0x35e)][_0x2c3a30(0x139)];else return _0x76db03[_0x2c3a30(0x2ca)](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore'][_0x2c3a30(0x30c)]['States'][_0x2c3a30(0x19e)]:VisuMZ[_0x2c3a30(0x21e)]['Settings']['States'][_0x2c3a30(0x388)];}},ColorManager[_0x103316(0x115)]=function(){const _0x12f940=_0x103316,_0x258382=_0x12f940(0xef);this[_0x12f940(0x2ee)]=this[_0x12f940(0x2ee)]||{};if(this[_0x12f940(0x2ee)][_0x258382])return this[_0x12f940(0x2ee)][_0x258382];const _0x52ca6d=VisuMZ[_0x12f940(0x21e)][_0x12f940(0x30c)][_0x12f940(0x31f)][_0x12f940(0x2dd)];return this['getColorDataFromPluginParameters'](_0x258382,_0x52ca6d);},ColorManager[_0x103316(0x2a4)]=function(){const _0x39a1ee=_0x103316,_0x3018f0=_0x39a1ee(0x205);this[_0x39a1ee(0x2ee)]=this['_colorCache']||{};if(this[_0x39a1ee(0x2ee)][_0x3018f0])return this[_0x39a1ee(0x2ee)][_0x3018f0];const _0x12fb1c=VisuMZ['SkillsStatesCore']['Settings'][_0x39a1ee(0x31f)]['ColorDebuff'];return this[_0x39a1ee(0xfd)](_0x3018f0,_0x12fb1c);},SceneManager[_0x103316(0x2d9)]=function(){const _0x585106=_0x103316;return this[_0x585106(0xdc)]&&this['_scene'][_0x585106(0x22c)]===Scene_Battle;},VisuMZ[_0x103316(0x21e)][_0x103316(0x254)]=BattleManager['endAction'],BattleManager[_0x103316(0x1b9)]=function(){const _0x3617fd=_0x103316;this['updateStatesActionEnd'](),VisuMZ['SkillsStatesCore'][_0x3617fd(0x254)][_0x3617fd(0x1f3)](this);},BattleManager[_0x103316(0xf8)]=function(){const _0xd1fd23=_0x103316,_0x234ef9=VisuMZ[_0xd1fd23(0x21e)][_0xd1fd23(0x30c)][_0xd1fd23(0x35e)];if(!_0x234ef9)return;if(_0x234ef9[_0xd1fd23(0x131)]===![])return;if(!this[_0xd1fd23(0x208)])return;this[_0xd1fd23(0x208)][_0xd1fd23(0xf8)]();},Game_Battler[_0x103316(0x21b)][_0x103316(0xf8)]=function(){const _0x65efdf=_0x103316;if(BattleManager['_phase']!==_0x65efdf(0x306))return;if(this[_0x65efdf(0x1f7)]===Graphics[_0x65efdf(0x292)])return;this['_lastStatesActionEndFrameCount']=Graphics['frameCount'];for(const _0x3e6f42 of this['_states']){const _0x500f66=$dataStates[_0x3e6f42];if(!_0x500f66)continue;if(_0x500f66[_0x65efdf(0xd6)]!==0x1)continue;this[_0x65efdf(0x15f)][_0x3e6f42]>0x0&&this['_stateTurns'][_0x3e6f42]--;}this[_0x65efdf(0x211)](0x1);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xdd)]=function(){const _0x4d9a5c=_0x103316,_0x212096=VisuMZ['SkillsStatesCore'][_0x4d9a5c(0x30c)]['States'];for(const _0x556f22 of this[_0x4d9a5c(0xf1)]){const _0x4fed70=$dataStates[_0x556f22];if(_0x212096&&_0x212096[_0x4d9a5c(0x131)]!==![]){if(_0x4fed70&&_0x4fed70[_0x4d9a5c(0xd6)]===0x1)continue;}this[_0x4d9a5c(0x15f)][_0x556f22]>0x0&&this[_0x4d9a5c(0x15f)][_0x556f22]--;}},VisuMZ[_0x103316(0x21e)]['Game_Switches_onChange']=Game_Switches[_0x103316(0x21b)]['onChange'],Game_Switches[_0x103316(0x21b)][_0x103316(0x218)]=function(){const _0x1298a7=_0x103316;VisuMZ[_0x1298a7(0x21e)][_0x1298a7(0x234)][_0x1298a7(0x1f3)](this);const _0x3b0cff=VisuMZ['SkillsStatesCore'][_0x1298a7(0x30c)][_0x1298a7(0x258)]['RefreshCacheSwitch']??!![];if(!_0x3b0cff)return;if(SceneManager['isSceneBattle']())for(const _0x60981f of BattleManager[_0x1298a7(0x24a)]()){if(_0x60981f)_0x60981f[_0x1298a7(0x2e8)]();}},VisuMZ['SkillsStatesCore']['Game_Variables_onChange']=Game_Variables['prototype'][_0x103316(0x218)],Game_Variables[_0x103316(0x21b)][_0x103316(0x218)]=function(){const _0x3477a0=_0x103316;VisuMZ[_0x3477a0(0x21e)][_0x3477a0(0x14c)][_0x3477a0(0x1f3)](this);const _0x3aa84e=VisuMZ[_0x3477a0(0x21e)][_0x3477a0(0x30c)]['PassiveStates']['RefreshCacheVar']??!![];if(!_0x3aa84e)return;if(SceneManager[_0x3477a0(0x2d9)]())for(const _0x49d46e of BattleManager[_0x3477a0(0x24a)]()){if(_0x49d46e)_0x49d46e[_0x3477a0(0x2e8)]();}},VisuMZ[_0x103316(0x21e)][_0x103316(0x1c3)]=Game_Action[_0x103316(0x21b)][_0x103316(0x2b2)],Game_Action['prototype'][_0x103316(0x2b2)]=function(_0x4b47d9){const _0x1c9005=_0x103316;VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect'][_0x1c9005(0x1f3)](this,_0x4b47d9),this['applySkillsStatesCoreEffects'](_0x4b47d9);},Game_Action[_0x103316(0x21b)]['applySkillsStatesCoreEffects']=function(_0x4710e2){const _0x1ecb22=_0x103316;this[_0x1ecb22(0x39a)](_0x4710e2),this['applyStateTurnManipulationEffects'](_0x4710e2),this[_0x1ecb22(0x285)](_0x4710e2),this[_0x1ecb22(0x1dd)](_0x4710e2);},VisuMZ[_0x103316(0x21e)][_0x103316(0x9d)]=Game_Action[_0x103316(0x21b)][_0x103316(0x23f)],Game_Action[_0x103316(0x21b)][_0x103316(0x23f)]=function(_0x126447){const _0x25e452=_0x103316;if(this[_0x25e452(0x103)](_0x126447))return!![];return VisuMZ[_0x25e452(0x21e)][_0x25e452(0x9d)]['call'](this,_0x126447);},Game_Action['prototype']['testSkillStatesCoreNotetags']=function(_0x1a1c8e){const _0xb29e9e=_0x103316;if(!this[_0xb29e9e(0xe2)]())return;const _0x517a21=this['item']()[_0xb29e9e(0x2eb)];if(_0x517a21[_0xb29e9e(0x2ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x4c64b1=String(RegExp['$1']);if(_0x1a1c8e[_0xb29e9e(0x1f8)](_0x4c64b1))return!![];}if(_0x517a21[_0xb29e9e(0x2ca)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x43f120=Number(RegExp['$1']);if(_0x1a1c8e[_0xb29e9e(0x246)](_0x43f120))return!![];}else{if(_0x517a21['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x3d5003=DataManager[_0xb29e9e(0xe8)](RegExp['$1']);if(_0x1a1c8e[_0xb29e9e(0x246)](_0x3d5003))return!![];}}return![];},Game_Action[_0x103316(0x21b)][_0x103316(0x39a)]=function(_0x4d73b5){const _0x3d07c1=_0x103316;if(_0x4d73b5['states']()['length']<=0x0)return;const _0x2e1010=this[_0x3d07c1(0xe2)]()[_0x3d07c1(0x2eb)];{const _0x3babe=_0x2e1010[_0x3d07c1(0x2ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x3babe)for(const _0x30abed of _0x3babe){_0x30abed[_0x3d07c1(0x2ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x54b561=String(RegExp['$1']);_0x4d73b5[_0x3d07c1(0x2a1)](_0x54b561);}}{const _0x371b8c=_0x2e1010[_0x3d07c1(0x2ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x371b8c)for(const _0x5c0d86 of _0x371b8c){_0x5c0d86[_0x3d07c1(0x2ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x1605b0=String(RegExp['$1']),_0x237a26=Number(RegExp['$2']);_0x4d73b5[_0x3d07c1(0xc0)](_0x1605b0,_0x237a26);}}},Game_Action[_0x103316(0x21b)][_0x103316(0x11d)]=function(_0x3454c6){const _0x24a8f6=_0x103316,_0x120723=this['item']()[_0x24a8f6(0x2eb)],_0x1c5e06=_0x120723[_0x24a8f6(0x2ca)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x1c5e06)for(const _0x52a587 of _0x1c5e06){let _0x3b2ac3=0x0,_0x4a2581=0x0;if(_0x52a587[_0x24a8f6(0x2ca)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x3b2ac3=Number(RegExp['$1']),_0x4a2581=Number(RegExp['$2']);else _0x52a587[_0x24a8f6(0x2ca)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x3b2ac3=DataManager['getStateIdWithName'](RegExp['$1']),_0x4a2581=Number(RegExp['$2']));_0x3454c6[_0x24a8f6(0x1be)](_0x3b2ac3,_0x4a2581),this[_0x24a8f6(0x36b)](_0x3454c6);}const _0x16ecd6=_0x120723['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x16ecd6)for(const _0x14d248 of _0x16ecd6){let _0x5d465c=0x0,_0x262477=0x0;if(_0x14d248[_0x24a8f6(0x2ca)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x5d465c=Number(RegExp['$1']),_0x262477=Number(RegExp['$2']);else _0x14d248['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x5d465c=DataManager[_0x24a8f6(0xe8)](RegExp['$1']),_0x262477=Number(RegExp['$2']));_0x3454c6[_0x24a8f6(0x21a)](_0x5d465c,_0x262477),this[_0x24a8f6(0x36b)](_0x3454c6);}},Game_Action[_0x103316(0x21b)][_0x103316(0x285)]=function(_0x101655){const _0x37b795=_0x103316,_0x4c8d3e=['MAXHP',_0x37b795(0x26a),_0x37b795(0x11e),_0x37b795(0x222),_0x37b795(0x39e),_0x37b795(0x110),_0x37b795(0xc2),_0x37b795(0x315)],_0x242c39=this[_0x37b795(0xe2)]()[_0x37b795(0x2eb)],_0x2d0502=_0x242c39[_0x37b795(0x2ca)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x2d0502)for(const _0x8a524e of _0x2d0502){_0x8a524e[_0x37b795(0x2ca)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x14c598=_0x4c8d3e[_0x37b795(0x1db)](String(RegExp['$1'])[_0x37b795(0x2fa)]()),_0x57cddf=Number(RegExp['$2']);_0x14c598>=0x0&&(_0x101655[_0x37b795(0x143)](_0x14c598,_0x57cddf),this[_0x37b795(0x36b)](_0x101655));}const _0x40dfeb=_0x242c39['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x40dfeb)for(const _0x21dc67 of _0x2d0502){_0x21dc67[_0x37b795(0x2ca)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x5aa29a=_0x4c8d3e['indexOf'](String(RegExp['$1'])[_0x37b795(0x2fa)]()),_0x506856=Number(RegExp['$2']);_0x5aa29a>=0x0&&(_0x101655['addBuffTurns'](_0x5aa29a,_0x506856),this[_0x37b795(0x36b)](_0x101655));}},Game_Action[_0x103316(0x21b)][_0x103316(0x1dd)]=function(_0x32b0a7){const _0x57473d=_0x103316,_0x77d898=[_0x57473d(0x283),_0x57473d(0x26a),_0x57473d(0x11e),_0x57473d(0x222),_0x57473d(0x39e),_0x57473d(0x110),'AGI','LUK'],_0x33228e=this[_0x57473d(0xe2)]()[_0x57473d(0x2eb)],_0x2b624e=_0x33228e['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x2b624e)for(const _0x26d6f8 of _0x2b624e){_0x26d6f8[_0x57473d(0x2ca)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x37b7c2=_0x77d898['indexOf'](String(RegExp['$1'])[_0x57473d(0x2fa)]()),_0xde6e14=Number(RegExp['$2']);_0x37b7c2>=0x0&&(_0x32b0a7[_0x57473d(0x2c8)](_0x37b7c2,_0xde6e14),this['makeSuccess'](_0x32b0a7));}const _0x2668ca=_0x33228e['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2668ca)for(const _0x4ad6b8 of _0x2b624e){_0x4ad6b8[_0x57473d(0x2ca)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x15dc33=_0x77d898[_0x57473d(0x1db)](String(RegExp['$1'])[_0x57473d(0x2fa)]()),_0x336bcd=Number(RegExp['$2']);_0x15dc33>=0x0&&(_0x32b0a7[_0x57473d(0x2b1)](_0x15dc33,_0x336bcd),this[_0x57473d(0x36b)](_0x32b0a7));}},VisuMZ['SkillsStatesCore'][_0x103316(0x1a2)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x237)],Game_BattlerBase['prototype'][_0x103316(0x237)]=function(){const _0x1076f1=_0x103316;this['_cache']={},this[_0x1076f1(0x231)](),VisuMZ[_0x1076f1(0x21e)][_0x1076f1(0x1a2)][_0x1076f1(0x1f3)](this);},Game_BattlerBase['prototype'][_0x103316(0x231)]=function(){const _0x385583=_0x103316;this[_0x385583(0x13f)]='',this[_0x385583(0xa2)]={},this[_0x385583(0x214)]={},this['_stateOrigin']={},this[_0x385583(0x238)]={};},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x18f)]=function(_0x247e1b){const _0x1c0ab9=_0x103316;return this[_0x1c0ab9(0x32f)]=this[_0x1c0ab9(0x32f)]||{},this[_0x1c0ab9(0x32f)][_0x247e1b]!==undefined;},VisuMZ[_0x103316(0x21e)][_0x103316(0x2b0)]=Game_BattlerBase['prototype'][_0x103316(0x2e8)],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2e8)]=function(){const _0x13dfc1=_0x103316;this[_0x13dfc1(0x32f)]={},VisuMZ[_0x13dfc1(0x21e)]['Game_BattlerBase_refresh'][_0x13dfc1(0x1f3)](this);},VisuMZ[_0x103316(0x21e)][_0x103316(0x2be)]=Game_BattlerBase[_0x103316(0x21b)]['eraseState'],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xc8)]=function(_0x2a25a9){const _0x4880ea=_0x103316;let _0x2dc73d=this[_0x4880ea(0x246)](_0x2a25a9);VisuMZ[_0x4880ea(0x21e)][_0x4880ea(0x2be)][_0x4880ea(0x1f3)](this,_0x2a25a9);if(_0x2dc73d&&!this[_0x4880ea(0x246)](_0x2a25a9))this[_0x4880ea(0x1f4)](_0x2a25a9);},Game_BattlerBase[_0x103316(0x21b)]['onRemoveState']=function(_0x5a1f36){const _0x42caa7=_0x103316;this[_0x42caa7(0x2ba)](_0x5a1f36),this[_0x42caa7(0x396)](_0x5a1f36);},VisuMZ[_0x103316(0x21e)][_0x103316(0x266)]=Game_Battler[_0x103316(0x21b)][_0x103316(0x2ad)],Game_Battler[_0x103316(0x21b)][_0x103316(0x2ad)]=function(){const _0x57980a=_0x103316;VisuMZ[_0x57980a(0x21e)][_0x57980a(0x266)][_0x57980a(0x1f3)](this),this[_0x57980a(0x1b4)](),this[_0x57980a(0x1a4)]=0x0,this['_prevPassiveJsCounter']=0x0;},VisuMZ[_0x103316(0x21e)][_0x103316(0x325)]=Game_BattlerBase['prototype']['resetStateCounts'],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x362)]=function(_0x1f3cf8){const _0x3629b8=_0x103316,_0x5e4a73=$dataStates[_0x1f3cf8],_0x2ec226=this['stateTurns'](_0x1f3cf8),_0x50dd41=this[_0x3629b8(0x2e3)](_0x5e4a73)[_0x3629b8(0x38a)]()[_0x3629b8(0x21c)]();switch(_0x50dd41){case'ignore':if(_0x2ec226<=0x0)this[_0x3629b8(0x2d2)](_0x1f3cf8);break;case _0x3629b8(0x118):this[_0x3629b8(0x2d2)](_0x1f3cf8);break;case _0x3629b8(0x267):this[_0x3629b8(0x2d2)](_0x1f3cf8),this['_stateTurns'][_0x1f3cf8]=Math[_0x3629b8(0x233)](this[_0x3629b8(0x15f)][_0x1f3cf8],_0x2ec226);break;case'add':this['prepareResetStateCounts'](_0x1f3cf8),this[_0x3629b8(0x15f)][_0x1f3cf8]+=_0x2ec226;break;default:this[_0x3629b8(0x2d2)](_0x1f3cf8);break;}if(this[_0x3629b8(0x246)](_0x1f3cf8)){const _0x3f2a9a=DataManager[_0x3629b8(0x141)](_0x1f3cf8);this['_stateTurns'][_0x1f3cf8]=this[_0x3629b8(0x15f)][_0x1f3cf8][_0x3629b8(0x14a)](0x0,_0x3f2a9a);}},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2d2)]=function(_0x44aefd){const _0x49e970=_0x103316;VisuMZ[_0x49e970(0x21e)][_0x49e970(0x325)]['call'](this,_0x44aefd);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2e3)]=function(_0x18f3a1){const _0x5a93b2=_0x103316,_0x157602=_0x18f3a1[_0x5a93b2(0x2eb)];return _0x157602[_0x5a93b2(0x2ca)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ['SkillsStatesCore'][_0x5a93b2(0x30c)][_0x5a93b2(0x35e)][_0x5a93b2(0x209)];},VisuMZ['SkillsStatesCore'][_0x103316(0x36d)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x278)],Game_BattlerBase[_0x103316(0x21b)]['overwriteBuffTurns']=function(_0x4c534e,_0x4858bc){const _0x12198f=_0x103316,_0x3b0f09=VisuMZ[_0x12198f(0x21e)][_0x12198f(0x30c)][_0x12198f(0x31f)][_0x12198f(0x209)],_0x51254c=this['buffTurns'](_0x4c534e);switch(_0x3b0f09){case'ignore':if(_0x51254c<=0x0)this[_0x12198f(0x221)][_0x4c534e]=_0x4858bc;break;case _0x12198f(0x118):this[_0x12198f(0x221)][_0x4c534e]=_0x4858bc;break;case _0x12198f(0x267):this['_buffTurns'][_0x4c534e]=Math[_0x12198f(0x233)](_0x51254c,_0x4858bc);break;case _0x12198f(0x178):this[_0x12198f(0x221)][_0x4c534e]+=_0x4858bc;break;default:VisuMZ[_0x12198f(0x21e)][_0x12198f(0x36d)][_0x12198f(0x1f3)](this,_0x4c534e,_0x4858bc);break;}const _0x3757aa=VisuMZ[_0x12198f(0x21e)]['Settings'][_0x12198f(0x31f)][_0x12198f(0x2bf)];this[_0x12198f(0x221)][_0x4c534e]=this[_0x12198f(0x221)][_0x4c534e][_0x12198f(0x14a)](0x0,_0x3757aa);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x127)]=function(){const _0x33bb9d=_0x103316;if(this[_0x33bb9d(0x32f)][_0x33bb9d(0x29f)]!==undefined)return this['_cache'][_0x33bb9d(0x29f)];this[_0x33bb9d(0x32f)][_0x33bb9d(0x29f)]=![];const _0x44a4bc=this[_0x33bb9d(0x32a)]();for(const _0x39edc4 of _0x44a4bc){if(!_0x39edc4)continue;if(_0x39edc4[_0x33bb9d(0x2eb)][_0x33bb9d(0x2ca)](/<GROUP DEFEAT>/i)){this[_0x33bb9d(0x32f)][_0x33bb9d(0x29f)]=!![];break;}}return this['_cache'][_0x33bb9d(0x29f)];},VisuMZ['SkillsStatesCore'][_0x103316(0x37b)]=Game_Unit[_0x103316(0x21b)]['deadMembers'],Game_Unit[_0x103316(0x21b)][_0x103316(0x373)]=function(){const _0x44a225=_0x103316;let _0x2c55b3=VisuMZ[_0x44a225(0x21e)][_0x44a225(0x37b)]['call'](this);return BattleManager[_0x44a225(0x1fe)]&&(_0x2c55b3=_0x2c55b3[_0x44a225(0x188)](this['members']()[_0x44a225(0x38d)](_0x42bc60=>_0x42bc60[_0x44a225(0x127)]()))),_0x2c55b3;},VisuMZ['SkillsStatesCore'][_0x103316(0x2e4)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x343)],Game_BattlerBase[_0x103316(0x21b)]['clearStates']=function(){const _0x27b821=_0x103316;this[_0x27b821(0x11b)]()!==''?this[_0x27b821(0x1aa)]():(VisuMZ[_0x27b821(0x21e)]['Game_BattlerBase_clearStates']['call'](this),this[_0x27b821(0x231)]());},Game_Actor[_0x103316(0x21b)][_0x103316(0x343)]=function(){const _0x51d2af=_0x103316;this['_stateSteps']=this[_0x51d2af(0x2f0)]||{},Game_Battler[_0x51d2af(0x21b)][_0x51d2af(0x343)][_0x51d2af(0x1f3)](this);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1aa)]=function(){const _0x1fd767=_0x103316,_0x13e8c9=this[_0x1fd767(0x32a)]();for(const _0x14e9c9 of _0x13e8c9){if(_0x14e9c9&&this[_0x1fd767(0x29a)](_0x14e9c9))this[_0x1fd767(0xc8)](_0x14e9c9['id']);}this['_cache']={};},Game_BattlerBase[_0x103316(0x21b)]['canClearState']=function(_0x39b0f7){const _0xf817e8=_0x103316,_0x59a627=this[_0xf817e8(0x11b)]();if(_0x59a627!==''){const _0x1a1302=_0x39b0f7['note'];if(_0x59a627===_0xf817e8(0x18c)&&_0x1a1302['match'](/<NO DEATH CLEAR>/i))return![];if(_0x59a627===_0xf817e8(0x32c)&&_0x1a1302[_0xf817e8(0x2ca)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0xf817e8(0x246)](_0x39b0f7['id']);},Game_BattlerBase[_0x103316(0x21b)]['getStateRetainType']=function(){const _0x16ba68=_0x103316;return this[_0x16ba68(0x13f)];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x138)]=function(_0x5886c7){const _0x1a2a27=_0x103316;this[_0x1a2a27(0x13f)]=_0x5886c7;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x261)]=function(){const _0x4136ca=_0x103316;this[_0x4136ca(0x13f)]='';},VisuMZ[_0x103316(0x21e)]['Game_BattlerBase_die']=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2b4)]=function(){const _0x5e4756=_0x103316;this[_0x5e4756(0x138)](_0x5e4756(0x18c)),VisuMZ[_0x5e4756(0x21e)][_0x5e4756(0x2d6)][_0x5e4756(0x1f3)](this),this['clearStateRetainType']();},VisuMZ[_0x103316(0x21e)][_0x103316(0x19f)]=Game_BattlerBase['prototype'][_0x103316(0x2f9)],Game_BattlerBase['prototype'][_0x103316(0x2f9)]=function(){const _0x3adf68=_0x103316;this[_0x3adf68(0x138)](_0x3adf68(0x32c)),VisuMZ['SkillsStatesCore'][_0x3adf68(0x19f)][_0x3adf68(0x1f3)](this),this['clearStateRetainType']();},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x38e)]=function(_0x4fe900,_0x152f6a,_0x4e7baf){return _0x152f6a;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x262)]=function(_0x8114f){const _0x413b34=_0x103316;for(settings of VisuMZ[_0x413b34(0x21e)][_0x413b34(0x30c)][_0x413b34(0x180)]){let _0x5e1d6c=settings[_0x413b34(0x37a)][_0x413b34(0x1f3)](this,_0x8114f);_0x5e1d6c=this[_0x413b34(0x38e)](_0x8114f,_0x5e1d6c,settings);if(!settings[_0x413b34(0x200)]['call'](this,_0x8114f,_0x5e1d6c))return![];}return!![];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x310)]=function(_0x49de14){const _0xad0d78=_0x103316;for(settings of VisuMZ[_0xad0d78(0x21e)]['Settings'][_0xad0d78(0x180)]){let _0x13212e=settings[_0xad0d78(0x37a)][_0xad0d78(0x1f3)](this,_0x49de14);_0x13212e=this['adjustSkillCost'](_0x49de14,_0x13212e,settings),settings['PayJS'][_0xad0d78(0x1f3)](this,_0x49de14,_0x13212e);}},VisuMZ['SkillsStatesCore'][_0x103316(0x23a)]=Game_BattlerBase[_0x103316(0x21b)]['meetsSkillConditions'],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x93f4d){const _0x37bc41=_0x103316;if(!_0x93f4d)return![];if(!VisuMZ[_0x37bc41(0x21e)][_0x37bc41(0x23a)][_0x37bc41(0x1f3)](this,_0x93f4d))return![];if(!this[_0x37bc41(0x1c4)](_0x93f4d))return![];if(!this[_0x37bc41(0xcd)](_0x93f4d))return![];if(!this[_0x37bc41(0x2e1)](_0x93f4d))return![];return!![];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1c4)]=function(_0xf73d18){const _0xc28262=_0x103316;if(!this[_0xc28262(0x133)](_0xf73d18))return![];return!![];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x133)]=function(_0x1549eb){const _0x42f9e9=_0x103316,_0x290923=_0x1549eb[_0x42f9e9(0x2eb)];if(_0x290923[_0x42f9e9(0x2ca)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x22f5c9=JSON[_0x42f9e9(0xaf)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4f45fa of _0x22f5c9){if(!$gameSwitches[_0x42f9e9(0x3a8)](_0x4f45fa))return![];}return!![];}if(_0x290923[_0x42f9e9(0x2ca)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x464563=JSON[_0x42f9e9(0xaf)]('['+RegExp['$1'][_0x42f9e9(0x2ca)](/\d+/g)+']');for(const _0x2222b7 of _0x464563){if(!$gameSwitches['value'](_0x2222b7))return![];}return!![];}if(_0x290923[_0x42f9e9(0x2ca)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4c75fb=JSON[_0x42f9e9(0xaf)]('['+RegExp['$1'][_0x42f9e9(0x2ca)](/\d+/g)+']');for(const _0x552b66 of _0x4c75fb){if($gameSwitches['value'](_0x552b66))return!![];}return![];}if(_0x290923[_0x42f9e9(0x2ca)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1bf53b=JSON['parse']('['+RegExp['$1'][_0x42f9e9(0x2ca)](/\d+/g)+']');for(const _0x257a60 of _0x1bf53b){if(!$gameSwitches[_0x42f9e9(0x3a8)](_0x257a60))return!![];}return![];}if(_0x290923[_0x42f9e9(0x2ca)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x50d08c=JSON[_0x42f9e9(0xaf)]('['+RegExp['$1'][_0x42f9e9(0x2ca)](/\d+/g)+']');for(const _0x49bc6c of _0x50d08c){if(!$gameSwitches[_0x42f9e9(0x3a8)](_0x49bc6c))return!![];}return![];}if(_0x290923[_0x42f9e9(0x2ca)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12a447=JSON[_0x42f9e9(0xaf)]('['+RegExp['$1'][_0x42f9e9(0x2ca)](/\d+/g)+']');for(const _0x274f76 of _0x12a447){if($gameSwitches[_0x42f9e9(0x3a8)](_0x274f76))return![];}return!![];}return!![];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xcd)]=function(_0x5ec2c7){const _0x5d4465=_0x103316,_0x281ad7=_0x5ec2c7[_0x5d4465(0x2eb)],_0x48e6c3=VisuMZ[_0x5d4465(0x21e)][_0x5d4465(0xa3)];return _0x48e6c3[_0x5ec2c7['id']]?_0x48e6c3[_0x5ec2c7['id']][_0x5d4465(0x1f3)](this,_0x5ec2c7):!![];},Game_BattlerBase[_0x103316(0x21b)]['meetsSkillConditionsGlobalJS']=function(_0x321cd0){const _0x1b8788=_0x103316;return VisuMZ[_0x1b8788(0x21e)][_0x1b8788(0x30c)][_0x1b8788(0x12c)][_0x1b8788(0x2c9)]['call'](this,_0x321cd0);},VisuMZ[_0x103316(0x21e)][_0x103316(0x2bc)]=Game_BattlerBase[_0x103316(0x21b)]['skillMpCost'],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x30a)]=function(_0x44b991){const _0x520ac8=_0x103316;for(settings of VisuMZ[_0x520ac8(0x21e)]['Settings'][_0x520ac8(0x180)]){if(settings['Name'][_0x520ac8(0x2fa)]()==='MP'){let _0x1bb855=settings[_0x520ac8(0x37a)][_0x520ac8(0x1f3)](this,_0x44b991);return _0x1bb855=this[_0x520ac8(0x38e)](_0x44b991,_0x1bb855,settings),_0x1bb855;}}return VisuMZ['SkillsStatesCore'][_0x520ac8(0x2bc)]['call'](this,_0x44b991);},VisuMZ[_0x103316(0x21e)][_0x103316(0x2db)]=Game_BattlerBase[_0x103316(0x21b)]['skillTpCost'],Game_BattlerBase['prototype']['skillTpCost']=function(_0x4abc86){const _0x147bd7=_0x103316;for(settings of VisuMZ[_0x147bd7(0x21e)][_0x147bd7(0x30c)][_0x147bd7(0x180)]){if(settings[_0x147bd7(0x324)][_0x147bd7(0x2fa)]()==='TP'){let _0x17a40e=settings[_0x147bd7(0x37a)][_0x147bd7(0x1f3)](this,_0x4abc86);return _0x17a40e=this[_0x147bd7(0x38e)](_0x4abc86,_0x17a40e,settings),_0x17a40e;}}return VisuMZ[_0x147bd7(0x21e)][_0x147bd7(0x2db)][_0x147bd7(0x1f3)](this,_0x4abc86);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x30e)]=function(_0x201f49){const _0x216265=_0x103316;if(typeof _0x201f49===_0x216265(0x171))_0x201f49=$dataStates[_0x201f49];return this[_0x216265(0x32a)]()[_0x216265(0x1f5)](_0x201f49);},VisuMZ[_0x103316(0x21e)][_0x103316(0xd0)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x32a)],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x32a)]=function(){const _0x45b488=_0x103316;let _0x5dc5cd=VisuMZ[_0x45b488(0x21e)][_0x45b488(0xd0)]['call'](this);if($gameTemp[_0x45b488(0x33a)])return _0x5dc5cd;return $gameTemp[_0x45b488(0x33a)]=!![],this[_0x45b488(0x1d6)](_0x5dc5cd),$gameTemp[_0x45b488(0x33a)]=undefined,_0x5dc5cd;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1d6)]=function(_0xe69774){const _0x5c2e0b=_0x103316,_0x7925f0=this['passiveStates']();for(state of _0x7925f0){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0xe69774['includes'](state))continue;_0xe69774[_0x5c2e0b(0x2dc)](state);}_0x7925f0[_0x5c2e0b(0xd1)]>0x0&&_0xe69774[_0x5c2e0b(0x382)]((_0x658cab,_0x494933)=>{const _0x1d3efa=_0x658cab['priority'],_0x463130=_0x494933['priority'];if(_0x1d3efa!==_0x463130)return _0x463130-_0x1d3efa;return _0x658cab-_0x494933;});},Game_BattlerBase[_0x103316(0x21b)]['isPassiveStateStackable']=function(_0x712ec6){const _0x190056=_0x103316;return _0x712ec6['note'][_0x190056(0x2ca)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x103316(0x21e)][_0x103316(0x251)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x38c)],Game_BattlerBase['prototype'][_0x103316(0x38c)]=function(_0xab4d92){const _0x352c00=_0x103316;this[_0x352c00(0x29b)]=!![];let _0x4d49a0=VisuMZ['SkillsStatesCore'][_0x352c00(0x251)][_0x352c00(0x1f3)](this,_0xab4d92);return this[_0x352c00(0x29b)]=undefined,_0x4d49a0;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xd4)]=function(){const _0x200a97=_0x103316;let _0x872d4=[];this[_0x200a97(0xe7)]=this['_passiveStateResults']||{};for(;;){_0x872d4=[];let _0x4af6ee=!![];for(const _0x4bc81a of this[_0x200a97(0x32f)][_0x200a97(0x1e8)]){const _0x5b7d5d=$dataStates[_0x4bc81a];if(!_0x5b7d5d)continue;let _0x4c9746=this[_0x200a97(0x239)](_0x5b7d5d);this[_0x200a97(0xe7)][_0x4bc81a]!==_0x4c9746&&(_0x4af6ee=![],this[_0x200a97(0xe7)][_0x4bc81a]=_0x4c9746);if(!_0x4c9746)continue;_0x872d4[_0x200a97(0x2dc)](_0x5b7d5d);}if(_0x4af6ee)break;else{if(!this[_0x200a97(0x29b)])this[_0x200a97(0x2e8)]();this[_0x200a97(0x26b)]();}}return _0x872d4;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x239)]=function(_0x45c3fa){const _0x4eacf1=_0x103316;if(!this[_0x4eacf1(0x2e6)](_0x45c3fa))return![];if(!this[_0x4eacf1(0x1e2)](_0x45c3fa))return![];if(!this[_0x4eacf1(0x104)](_0x45c3fa))return![];if(!this[_0x4eacf1(0x31d)](_0x45c3fa))return![];return!![];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2e6)]=function(_0x5ca1d2){return!![];},Game_Actor[_0x103316(0x21b)][_0x103316(0x2e6)]=function(_0x1d1e45){const _0x3a60e4=_0x103316,_0x1d1a68=DataManager[_0x3a60e4(0x16e)](_0x1d1e45);if(_0x1d1a68[_0x3a60e4(0xe0)][_0x3a60e4(0xd1)]>0x0){const _0x3980cd=_0x1d1a68['currentClass'];if(!_0x3980cd['includes'](this[_0x3a60e4(0xe0)]()))return![];}if(_0x1d1a68[_0x3a60e4(0x2f3)]['length']>0x0){const _0x1dbdac=_0x1d1a68[_0x3a60e4(0x2f3)];let _0x5b0d9f=[this[_0x3a60e4(0xe0)]()];Imported[_0x3a60e4(0x367)]&&this[_0x3a60e4(0x360)]&&(_0x5b0d9f=this[_0x3a60e4(0x360)]());if(_0x1dbdac['filter'](_0x227a9d=>_0x5b0d9f[_0x3a60e4(0x1f5)](_0x227a9d))[_0x3a60e4(0xd1)]<=0x0)return![];}return Game_BattlerBase[_0x3a60e4(0x21b)][_0x3a60e4(0x2e6)][_0x3a60e4(0x1f3)](this,_0x1d1e45);},DataManager[_0x103316(0x16e)]=function(_0x448d15){const _0x5ce3f1=_0x103316,_0x4e8fdb={'currentClass':[],'multiClass':[]};if(!_0x448d15)return _0x4e8fdb;this['_cache_getPassiveStateConditionClassesData']=this[_0x5ce3f1(0x29d)]||{};if(this[_0x5ce3f1(0x29d)][_0x448d15['id']]!==undefined)return this[_0x5ce3f1(0x29d)][_0x448d15['id']];const _0x514d5b=_0x448d15['note']||'';if(_0x514d5b[_0x5ce3f1(0x2ca)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x5399c9=String(RegExp['$1'])[_0x5ce3f1(0x1bc)](',')[_0x5ce3f1(0x30d)](_0x341226=>_0x341226[_0x5ce3f1(0x21c)]());_0x4e8fdb[_0x5ce3f1(0xe0)]=VisuMZ[_0x5ce3f1(0x21e)][_0x5ce3f1(0x1b7)](_0x5399c9);}if(_0x514d5b[_0x5ce3f1(0x2ca)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x23308e=String(RegExp['$1'])['split'](',')[_0x5ce3f1(0x30d)](_0x12d884=>_0x12d884[_0x5ce3f1(0x21c)]());_0x4e8fdb[_0x5ce3f1(0x2f3)]=VisuMZ['SkillsStatesCore'][_0x5ce3f1(0x1b7)](_0x23308e);}return this[_0x5ce3f1(0x29d)][_0x448d15['id']]=_0x4e8fdb,this[_0x5ce3f1(0x29d)][_0x448d15['id']];},VisuMZ[_0x103316(0x21e)]['ParseClassIDs']=function(_0x58a39a){const _0x1dd2ae=_0x103316,_0x302f41=[];for(let _0x9b2e0f of _0x58a39a){_0x9b2e0f=(String(_0x9b2e0f)||'')[_0x1dd2ae(0x21c)]();const _0x98d5d7=/^\d+$/['test'](_0x9b2e0f);_0x98d5d7?_0x302f41[_0x1dd2ae(0x2dc)](Number(_0x9b2e0f)):_0x302f41[_0x1dd2ae(0x2dc)](DataManager[_0x1dd2ae(0xb2)](_0x9b2e0f));}return _0x302f41[_0x1dd2ae(0x30d)](_0x21cf8f=>$dataClasses[Number(_0x21cf8f)])[_0x1dd2ae(0x225)](null);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1e2)]=function(_0xcc9742){const _0x14fd5a=_0x103316,_0x29aabc=DataManager[_0x14fd5a(0xff)](_0xcc9742);if(_0x29aabc[_0x14fd5a(0xd9)]&&_0x29aabc[_0x14fd5a(0xd9)][_0x14fd5a(0xd1)]>0x0){const _0x5c7cfa=_0x29aabc['allSwitchOn'];for(const _0x3f65d2 of _0x5c7cfa){if(!$gameSwitches[_0x14fd5a(0x3a8)](_0x3f65d2))return![];}}if(_0x29aabc[_0x14fd5a(0x2af)]&&_0x29aabc[_0x14fd5a(0x2af)][_0x14fd5a(0xd1)]>0x0){const _0x49b0cb=_0x29aabc['anySwitchOn'];let _0x4c7383=!![];for(const _0x4221ab of _0x49b0cb){if($gameSwitches[_0x14fd5a(0x3a8)](_0x4221ab)){_0x4c7383=![];break;}}if(_0x4c7383)return![];}if(_0x29aabc[_0x14fd5a(0x3a1)]&&_0x29aabc[_0x14fd5a(0x3a1)]['length']>0x0){const _0x5f3fd5=_0x29aabc['allSwitchOff'];for(const _0x2985a3 of _0x5f3fd5){if($gameSwitches[_0x14fd5a(0x3a8)](_0x2985a3))return![];}}if(_0x29aabc[_0x14fd5a(0x397)]&&_0x29aabc['anySwitchOff']['length']>0x0){const _0x2e2e48=_0x29aabc['anySwitchOff'];let _0x2582dd=!![];for(const _0x302ad1 of _0x2e2e48){if(!$gameSwitches[_0x14fd5a(0x3a8)](_0x302ad1)){_0x2582dd=![];break;}}if(_0x2582dd)return![];}return!![];},DataManager[_0x103316(0xff)]=function(_0x4c5982){const _0xea747c=_0x103316;let _0x561304={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x4c5982)return _0x561304;const _0x525106=_0x4c5982['id'];this[_0xea747c(0x2ec)]=this[_0xea747c(0x2ec)]||{};if(this[_0xea747c(0x2ec)][_0x525106]!==undefined)return this[_0xea747c(0x2ec)][_0x525106];const _0x2f6fdd=_0x4c5982[_0xea747c(0x2eb)]||'';return _0x2f6fdd[_0xea747c(0x2ca)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x561304[_0xea747c(0xd9)]=String(RegExp['$1'])[_0xea747c(0x1bc)](',')[_0xea747c(0x30d)](_0x905c59=>Number(_0x905c59))),_0x2f6fdd['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x561304[_0xea747c(0x2af)]=String(RegExp['$1'])[_0xea747c(0x1bc)](',')[_0xea747c(0x30d)](_0x306400=>Number(_0x306400))),_0x2f6fdd[_0xea747c(0x2ca)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x561304[_0xea747c(0x3a1)]=String(RegExp['$1'])[_0xea747c(0x1bc)](',')['map'](_0x29d26f=>Number(_0x29d26f))),_0x2f6fdd[_0xea747c(0x2ca)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x561304[_0xea747c(0x397)]=String(RegExp['$1'])[_0xea747c(0x1bc)](',')['map'](_0x11aab0=>Number(_0x11aab0))),this[_0xea747c(0x2ec)][_0x525106]=_0x561304,this[_0xea747c(0x2ec)][_0x525106];},Game_BattlerBase['prototype'][_0x103316(0x104)]=function(_0x1677da){const _0x2e9651=_0x103316,_0xf58d68=VisuMZ[_0x2e9651(0x21e)][_0x2e9651(0x17d)];if(_0xf58d68[_0x1677da['id']]){this[_0x2e9651(0x1a4)]=this[_0x2e9651(0x1a4)]||0x0,this['_prevPassiveJsCounter']=this['_prevPassiveJsCounter']||0x0;this[_0x2e9651(0x1a4)]!==Graphics[_0x2e9651(0x292)]&&(this[_0x2e9651(0x1a4)]=Graphics['frameCount'],this[_0x2e9651(0x363)]={},this[_0x2e9651(0x9e)]=0x0);this[_0x2e9651(0x9e)]++;if(this['_prevPassiveJsCounter']>=0x1e)return this['_prevPassiveJsResults'][_0x1677da['id']]??!![];else{const _0x55ee77=_0xf58d68[_0x1677da['id']][_0x2e9651(0x1f3)](this,_0x1677da);return this[_0x2e9651(0x363)][_0x1677da['id']]=_0x55ee77,_0x55ee77;}}else return!![];},Game_BattlerBase['prototype'][_0x103316(0x31d)]=function(_0x1fdc58){const _0x59fb0e=_0x103316;return VisuMZ[_0x59fb0e(0x21e)][_0x59fb0e(0x30c)]['PassiveStates'][_0x59fb0e(0x1ee)][_0x59fb0e(0x1f3)](this,_0x1fdc58);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1e8)]=function(){const _0x573117=_0x103316;if(this[_0x573117(0x18f)](_0x573117(0x1e8)))return this[_0x573117(0xd4)]();if(this[_0x573117(0x8e)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x573117(0x26b)](),this[_0x573117(0x8e)]=undefined,this[_0x573117(0xd4)]();},Game_BattlerBase['prototype'][_0x103316(0x26b)]=function(){const _0x522507=_0x103316;this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache'][_0x522507(0x1e8)]=[],this[_0x522507(0x152)](),this['addPassiveStatesByNotetag'](),this[_0x522507(0x1e4)](),Game_BattlerBase[_0x522507(0x22a)]&&this['addAuraPassiveStateIDs'](),this[_0x522507(0x32f)][_0x522507(0x1e8)]=this['_cache'][_0x522507(0x1e8)][_0x522507(0x382)]((_0x4e7c25,_0x1ed6e8)=>_0x4e7c25-_0x1ed6e8),this[_0x522507(0x8e)]=undefined;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x152)]=function(){const _0x34622e=_0x103316;if(Imported[_0x34622e(0x18e)])this['addPassiveStatesTraitSets']();},Game_BattlerBase['prototype']['passiveStateObjects']=function(){return[];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x17b)]=function(){const _0x5b026a=_0x103316,_0x648c4f=this[_0x5b026a(0x32f)][_0x5b026a(0x1e8)]||[],_0x4cf5c0=this['passiveStateObjects']();this[_0x5b026a(0x32f)]['passiveStates']=_0x648c4f||[];for(const _0x23227e of _0x4cf5c0){if(!_0x23227e)continue;const _0x38d27e=DataManager[_0x5b026a(0x316)](_0x23227e);for(const _0x155d0a of _0x38d27e){this[_0x5b026a(0x32f)][_0x5b026a(0x1e8)][_0x5b026a(0x2dc)](_0x155d0a);}}},DataManager['getPassiveStatesFromObj']=function(_0x498874){const _0x504fe2=_0x103316;if(!_0x498874)return[];const _0x202e61=VisuMZ['SkillsStatesCore'][_0x504fe2(0xf0)](_0x498874,_0x504fe2(0x26e));this[_0x504fe2(0x2cf)]=this[_0x504fe2(0x2cf)]||{};if(this['_cache_getPassiveStatesFromObj'][_0x202e61]!==undefined)return this[_0x504fe2(0x2cf)][_0x202e61];const _0x498cca=[],_0x1457a2=_0x498874[_0x504fe2(0x2eb)]||'',_0x57e8e0=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x13ac8c=_0x1457a2[_0x504fe2(0x2ca)](_0x57e8e0);if(_0x13ac8c)for(const _0x44a7a9 of _0x13ac8c){_0x44a7a9['match'](_0x57e8e0);const _0x476b78=String(RegExp['$1'])[_0x504fe2(0x1bc)](',')[_0x504fe2(0x30d)](_0x28a1f4=>_0x28a1f4[_0x504fe2(0x21c)]());for(const _0x40c1f6 of _0x476b78){const _0x42f90e=/^\d+$/['test'](_0x40c1f6);let _0x3fa50d=0x0;_0x42f90e?_0x3fa50d=Number(_0x40c1f6):_0x3fa50d=DataManager[_0x504fe2(0xe8)](_0x40c1f6),_0x3fa50d&&_0x498cca['push'](_0x3fa50d);}}return this[_0x504fe2(0x2cf)][_0x202e61]=_0x498cca,this['_cache_getPassiveStatesFromObj'][_0x202e61];},Game_BattlerBase['prototype'][_0x103316(0x1e4)]=function(){const _0x59dc56=_0x103316,_0x180714=VisuMZ['SkillsStatesCore'][_0x59dc56(0x30c)][_0x59dc56(0x258)][_0x59dc56(0x28f)];this[_0x59dc56(0x32f)][_0x59dc56(0x1e8)]=this[_0x59dc56(0x32f)]['passiveStates']['concat'](_0x180714);},Game_BattlerBase[_0x103316(0x22a)]=![],Scene_Boot[_0x103316(0x21b)][_0x103316(0xcb)]=function(){const _0x2ecdb0=_0x103316,_0x58c45d=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x528ae0 of _0x58c45d){for(const _0x5b762c of _0x528ae0){if(!_0x5b762c)continue;const _0x2f9c13=_0x5b762c[_0x2ecdb0(0x2eb)]||'';if(_0x2f9c13[_0x2ecdb0(0x2ca)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase['AURA_SYSTEM_ENABLED']=!![];break;}}}},Game_BattlerBase[_0x103316(0x21b)]['addAuraPassiveStateIDs']=function(){const _0x45208e=_0x103316;if(this[_0x45208e(0x154)]())return;if(!this[_0x45208e(0x9a)]())return;const _0x65e01b=this[_0x45208e(0x32f)][_0x45208e(0x1e8)]||[],_0x3f20ac=this,_0x121662=this[_0x45208e(0x242)]()['getAuraPassiveStateIDs'](!![],_0x3f20ac),_0x55507c=$gameParty[_0x45208e(0x157)]()?this['opponentsUnit']()[_0x45208e(0x289)](![],_0x3f20ac):[];this[_0x45208e(0x32f)][_0x45208e(0x1e8)]=_0x65e01b||[],this['_cache'][_0x45208e(0x1e8)]=this[_0x45208e(0x32f)]['passiveStates']['concat'](_0x121662)[_0x45208e(0x188)](_0x55507c);},Game_Unit[_0x103316(0x21b)][_0x103316(0x289)]=function(_0x362b12,_0x29f769){const _0x214017=_0x103316;let _0x2adcef=[];const _0x3aed9=this===$gameParty?this['battleMembers']():this[_0x214017(0x220)]();for(const _0x105b80 of _0x3aed9){if(!_0x105b80)continue;if(!_0x105b80[_0x214017(0x9a)]())continue;const _0xc76363=_0x105b80[_0x214017(0x339)]();for(const _0x532e88 of _0xc76363){if(!_0x532e88)continue;if(!VisuMZ[_0x214017(0x21e)]['MeetsAuraObjConditions'](_0x532e88,_0x362b12,_0x105b80,_0x29f769))continue;let _0x3f17b3=DataManager[_0x214017(0x28d)](_0x532e88,_0x362b12);for(const _0x31510a of _0x3f17b3){if(!VisuMZ[_0x214017(0x21e)]['MeetsAuraStateConditions'](_0x31510a,_0x362b12,_0x105b80,_0x29f769))continue;_0x2adcef[_0x214017(0x2dc)](_0x31510a),!_0x29f769['isStateAffected'](_0x31510a)&&_0x29f769[_0x214017(0x2bd)](_0x31510a,_0x105b80);}}}return _0x2adcef;},DataManager[_0x103316(0x28d)]=function(_0x184843,_0x16960c){const _0x29f4e5=_0x103316;if(!_0x184843)return[];const _0x21f3c2=_0x16960c?_0x29f4e5(0x354):_0x29f4e5(0x2c7),_0x1985e6=VisuMZ[_0x29f4e5(0x21e)][_0x29f4e5(0xf0)](_0x184843,_0x21f3c2);this[_0x29f4e5(0x126)]=this[_0x29f4e5(0x126)]||{};if(this[_0x29f4e5(0x126)][_0x1985e6]!==undefined)return this['_cache_getAuraPassiveStatesFromObj'][_0x1985e6];const _0xc34240=[],_0x5c2fa9=_0x184843[_0x29f4e5(0x2eb)]||'',_0xb7b097=_0x16960c?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x5a124c=_0x5c2fa9['match'](_0xb7b097);if(_0x5a124c)for(const _0x42b4a7 of _0x5a124c){_0x42b4a7[_0x29f4e5(0x2ca)](_0xb7b097);const _0x575aae=String(RegExp['$1'])[_0x29f4e5(0x1bc)](',')[_0x29f4e5(0x30d)](_0x2b7b94=>_0x2b7b94['trim']());for(const _0xd057fa of _0x575aae){const _0x183b07=/^\d+$/[_0x29f4e5(0xbb)](_0xd057fa);let _0x40081d=0x0;_0x183b07?_0x40081d=Number(_0xd057fa):_0x40081d=DataManager[_0x29f4e5(0xe8)](_0xd057fa),_0x40081d&&_0xc34240[_0x29f4e5(0x2dc)](_0x40081d);}}return this[_0x29f4e5(0x126)][_0x1985e6]=_0xc34240,this[_0x29f4e5(0x126)][_0x1985e6];},VisuMZ[_0x103316(0x21e)][_0x103316(0x1d0)]=function(_0x2c0b7d,_0x46005e,_0x310f88,_0x219bb7){const _0x14da09=_0x103316;if(!_0x2c0b7d)return![];if(_0x2c0b7d[_0x14da09(0xd6)]!==undefined&&_0x2c0b7d['maxTurns']!==undefined)return![];const _0xe10390=_0x2c0b7d[_0x14da09(0x2eb)]||'';if(!VisuMZ['SkillsStatesCore'][_0x14da09(0x1ca)](_0xe10390,_0x46005e,_0x310f88,_0x219bb7))return![];return!![];},VisuMZ[_0x103316(0x21e)]['MeetsAuraStateConditions']=function(_0x153f81,_0x9bc1f8,_0xe0e5c4,_0x5c7716){const _0x17ceac=_0x103316,_0x5f3d20=$dataStates[_0x153f81];if(!_0x5f3d20)return![];const _0x156866=_0x5f3d20['note']||'';if(!VisuMZ[_0x17ceac(0x21e)]['MeetsAuraNoteConditions'](_0x156866,_0x9bc1f8,_0xe0e5c4,_0x5c7716))return![];return!![];},VisuMZ[_0x103316(0x21e)][_0x103316(0x1ca)]=function(_0x2ef2ea,_0x4b8858,_0x3769c9,_0x3a859d){const _0x52444f=_0x103316;_0x2ef2ea=_0x2ef2ea||'';if(_0x3769c9[_0x52444f(0x154)]()){if(_0x4b8858&&_0x2ef2ea['match'](/<ALLOW DEAD AURA>/i)){}else{if(!_0x4b8858&&_0x2ef2ea['match'](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x4b8858&&_0x2ef2ea['match'](/<DEAD AURA ONLY>/i)){}else{if(!_0x4b8858&&_0x2ef2ea[_0x52444f(0x2ca)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x4b8858&&_0x2ef2ea[_0x52444f(0x2ca)](/<DEAD AURA ONLY>/i))return![];else{if(!_0x4b8858&&_0x2ef2ea[_0x52444f(0x2ca)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x4b8858){if(_0x2ef2ea[_0x52444f(0x2ca)](/<AURA NOT FOR USER>/i)){if(_0x3769c9===_0x3a859d)return![];}else{if(_0x2ef2ea[_0x52444f(0x2ca)](/<NOT USER AURA>/i)){if(_0x3769c9===_0x3a859d)return![];}}}return!![];},Game_BattlerBase['prototype'][_0x103316(0x189)]=function(_0x34f64e){if(typeof _0x34f64e!=='number')_0x34f64e=_0x34f64e['id'];return this['_stateTurns'][_0x34f64e]||0x0;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1be)]=function(_0x5c3eff,_0x10ef8f){const _0x5ee34f=_0x103316;if(typeof _0x5c3eff!==_0x5ee34f(0x171))_0x5c3eff=_0x5c3eff['id'];if(this[_0x5ee34f(0x246)](_0x5c3eff)){const _0x403338=DataManager[_0x5ee34f(0x141)](_0x5c3eff);this['_stateTurns'][_0x5c3eff]=_0x10ef8f[_0x5ee34f(0x14a)](0x0,_0x403338);if(this[_0x5ee34f(0x15f)][_0x5c3eff]<=0x0)this[_0x5ee34f(0x271)](_0x5c3eff);}},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x21a)]=function(_0x1b2cd7,_0x33f15a){const _0x102d2c=_0x103316;if(typeof _0x1b2cd7!==_0x102d2c(0x171))_0x1b2cd7=_0x1b2cd7['id'];this[_0x102d2c(0x246)](_0x1b2cd7)&&(_0x33f15a+=this[_0x102d2c(0x189)](_0x1b2cd7),this['setStateTurns'](_0x1b2cd7,_0x33f15a));},VisuMZ['SkillsStatesCore'][_0x103316(0x2b6)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x34c)],Game_BattlerBase['prototype']['eraseBuff']=function(_0x55ff53){const _0x1179fd=_0x103316,_0x5c11b9=this[_0x1179fd(0x2e2)][_0x55ff53];VisuMZ[_0x1179fd(0x21e)][_0x1179fd(0x2b6)][_0x1179fd(0x1f3)](this,_0x55ff53);if(_0x5c11b9>0x0)this['onEraseBuff'](_0x55ff53);if(_0x5c11b9<0x0)this[_0x1179fd(0x16d)](_0x55ff53);},VisuMZ[_0x103316(0x21e)][_0x103316(0x300)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x36c)],Game_BattlerBase[_0x103316(0x21b)]['increaseBuff']=function(_0x5d792d){const _0x23ceba=_0x103316;VisuMZ[_0x23ceba(0x21e)]['Game_BattlerBase_increaseBuff'][_0x23ceba(0x1f3)](this,_0x5d792d);if(!this[_0x23ceba(0x297)](_0x5d792d))this['eraseBuff'](_0x5d792d);},VisuMZ[_0x103316(0x21e)][_0x103316(0x105)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x236)],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x236)]=function(_0x31e1ad){const _0x387bcf=_0x103316;VisuMZ['SkillsStatesCore'][_0x387bcf(0x105)][_0x387bcf(0x1f3)](this,_0x31e1ad);if(!this[_0x387bcf(0x297)](_0x31e1ad))this[_0x387bcf(0x34c)](_0x31e1ad);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1a5)]=function(_0x19846d){},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x16d)]=function(_0x2fc627){},Game_BattlerBase[_0x103316(0x21b)]['isMaxBuffAffected']=function(_0x579cd7){const _0x112afd=_0x103316;return this[_0x112afd(0x2e2)][_0x579cd7]===VisuMZ[_0x112afd(0x21e)][_0x112afd(0x30c)]['Buffs'][_0x112afd(0x16b)];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x33c)]=function(_0x42c3d7){const _0x24cf01=_0x103316;return this['_buffs'][_0x42c3d7]===-VisuMZ[_0x24cf01(0x21e)][_0x24cf01(0x30c)][_0x24cf01(0x31f)]['StackDebuffMax'];},VisuMZ['SkillsStatesCore'][_0x103316(0x318)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x216)],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x216)]=function(_0x3d209c,_0x176dda){const _0x43c1af=_0x103316;return _0x3d209c=_0x3d209c[_0x43c1af(0x14a)](-0x2,0x2),VisuMZ[_0x43c1af(0x21e)][_0x43c1af(0x318)][_0x43c1af(0x1f3)](this,_0x3d209c,_0x176dda);},Game_BattlerBase[_0x103316(0x21b)]['paramBuffRate']=function(_0x1577e6){const _0x50de7b=_0x103316,_0x7a4e85=this[_0x50de7b(0x2e2)][_0x1577e6];return VisuMZ[_0x50de7b(0x21e)][_0x50de7b(0x30c)][_0x50de7b(0x31f)][_0x50de7b(0x35b)][_0x50de7b(0x1f3)](this,_0x1577e6,_0x7a4e85);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x162)]=function(_0x33d318){const _0x2eb8cc=_0x103316;return this[_0x2eb8cc(0x221)][_0x33d318]||0x0;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x37f)]=function(_0x1dfbb6){const _0x370764=_0x103316;return this[_0x370764(0x162)](_0x1dfbb6);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x143)]=function(_0x21ce69,_0x1ffeeb){const _0x4db42c=_0x103316;if(this[_0x4db42c(0x35f)](_0x21ce69)){const _0x507ec2=VisuMZ[_0x4db42c(0x21e)][_0x4db42c(0x30c)]['Buffs'][_0x4db42c(0x2bf)];this[_0x4db42c(0x221)][_0x21ce69]=_0x1ffeeb[_0x4db42c(0x14a)](0x0,_0x507ec2);}},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x8d)]=function(_0x3b280e,_0x1c41ae){const _0x199d0e=_0x103316;this[_0x199d0e(0x35f)](_0x3b280e)&&(_0x1c41ae+=this['buffTurns'](stateId),this[_0x199d0e(0x143)](_0x3b280e,_0x1c41ae));},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2c8)]=function(_0x526208,_0x544097){const _0x22a7fc=_0x103316;if(this[_0x22a7fc(0x384)](_0x526208)){const _0x48d225=VisuMZ[_0x22a7fc(0x21e)]['Settings'][_0x22a7fc(0x31f)][_0x22a7fc(0x2bf)];this[_0x22a7fc(0x221)][_0x526208]=_0x544097['clamp'](0x0,_0x48d225);}},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2b1)]=function(_0x4810ee,_0x43ad5d){const _0x4e9a9c=_0x103316;this[_0x4e9a9c(0x384)](_0x4810ee)&&(_0x43ad5d+=this[_0x4e9a9c(0x162)](stateId),this[_0x4e9a9c(0x2c8)](_0x4810ee,_0x43ad5d));},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2fc)]=function(_0xbdc110){const _0x2a2658=_0x103316;if(typeof _0xbdc110!=='number')_0xbdc110=_0xbdc110['id'];return this[_0x2a2658(0xa2)]=this[_0x2a2658(0xa2)]||{},this[_0x2a2658(0xa2)][_0xbdc110]=this[_0x2a2658(0xa2)][_0xbdc110]||{},this[_0x2a2658(0xa2)][_0xbdc110];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xa6)]=function(_0x3971c2,_0x4dd243){const _0xd15139=_0x103316;if(typeof _0x3971c2!=='number')_0x3971c2=_0x3971c2['id'];const _0x1809f2=this[_0xd15139(0x2fc)](_0x3971c2);return _0x1809f2[_0x4dd243];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x253)]=function(_0x170f5e,_0x2ceb40,_0x3c3b18){const _0x7ee152=_0x103316;if(typeof _0x170f5e!==_0x7ee152(0x171))_0x170f5e=_0x170f5e['id'];const _0x94ebd4=this['stateData'](_0x170f5e);_0x94ebd4[_0x2ceb40]=_0x3c3b18;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2ba)]=function(_0x2c8464){const _0x52678a=_0x103316;if(typeof _0x2c8464!==_0x52678a(0x171))_0x2c8464=_0x2c8464['id'];this[_0x52678a(0xa2)]=this[_0x52678a(0xa2)]||{},this[_0x52678a(0xa2)][_0x2c8464]={};},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xc1)]=function(_0x336c9d){const _0x350086=_0x103316;if(typeof _0x336c9d!=='number')_0x336c9d=_0x336c9d['id'];return this[_0x350086(0x214)]=this[_0x350086(0x214)]||{},this[_0x350086(0x214)][_0x336c9d]===undefined&&(this[_0x350086(0x214)][_0x336c9d]=''),this[_0x350086(0x214)][_0x336c9d];},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x153)]=function(_0x11d1d3,_0xf46954){const _0x23ac59=_0x103316;if(typeof _0x11d1d3!==_0x23ac59(0x171))_0x11d1d3=_0x11d1d3['id'];this[_0x23ac59(0x214)]=this[_0x23ac59(0x214)]||{},this[_0x23ac59(0x214)][_0x11d1d3]=_0xf46954;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x396)]=function(_0x1f500d){const _0x49c539=_0x103316;if(typeof _0x1f500d!==_0x49c539(0x171))_0x1f500d=_0x1f500d['id'];this[_0x49c539(0x214)]=this[_0x49c539(0x214)]||{},this['_stateDisplay'][_0x1f500d]='';},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x38b)]=function(_0x8be632){const _0x4f079f=_0x103316;if(typeof _0x8be632!==_0x4f079f(0x171))_0x8be632=_0x8be632['id'];this['_stateOrigin']=this['_stateOrigin']||{},this['_stateOrigin'][_0x8be632]=this['_stateOrigin'][_0x8be632]||_0x4f079f(0x3a3);const _0x26cb74=this[_0x4f079f(0x1f2)][_0x8be632];return this[_0x4f079f(0x17c)](_0x26cb74);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2bd)]=function(_0x5c5c56,_0x182cf8){const _0xeb16d=_0x103316;this[_0xeb16d(0x1f2)]=this[_0xeb16d(0x1f2)]||{};const _0x2a93a5=_0x182cf8?this['convertTargetToStateOriginKey'](_0x182cf8):this[_0xeb16d(0x33d)]();this[_0xeb16d(0x1f2)][_0x5c5c56]=_0x2a93a5;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0xa1)]=function(_0x4c4b6d){const _0x11941e=_0x103316;this[_0x11941e(0x1f2)]=this[_0x11941e(0x1f2)]||{},delete this[_0x11941e(0x1f2)][_0x4c4b6d];},Game_BattlerBase['prototype'][_0x103316(0x1b4)]=function(){this['_stateOrigin']={};},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x33d)]=function(){const _0xdb2c88=_0x103316,_0x3778a4=this[_0xdb2c88(0x1ae)]();return this[_0xdb2c88(0x247)](_0x3778a4);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1ae)]=function(){const _0x1f3325=_0x103316;if($gameParty[_0x1f3325(0x157)]()){if(BattleManager[_0x1f3325(0x208)])return BattleManager[_0x1f3325(0x208)];else{if(BattleManager['_currentActor'])return BattleManager[_0x1f3325(0xee)];}}else{const _0x52a54d=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x1f3325(0x1f5)](_0x52a54d[_0x1f3325(0x22c)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x247)]=function(_0x37d93f){const _0x4f5b68=_0x103316;if(!_0x37d93f)return _0x4f5b68(0x3a3);if(_0x37d93f[_0x4f5b68(0x309)]())return'<actor-%1>'[_0x4f5b68(0x156)](_0x37d93f[_0x4f5b68(0x11c)]());else{const _0x4163f4=_0x4f5b68(0x25b)[_0x4f5b68(0x156)](_0x37d93f['enemyId']()),_0x3dadeb=_0x4f5b68(0x34e)[_0x4f5b68(0x156)](_0x37d93f['index']()),_0x2e3246='<troop-%1>'['format']($gameTroop['getCurrentTroopUniqueID']());return _0x4f5b68(0x244)['format'](_0x4163f4,_0x3dadeb,_0x2e3246);}return _0x4f5b68(0x3a3);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x17c)]=function(_0x539c4c){const _0xcfc972=_0x103316;if(_0x539c4c===_0xcfc972(0x3a3))return this;else{if(_0x539c4c[_0xcfc972(0x2ca)](/<actor-(\d+)>/i))return $gameActors[_0xcfc972(0xa5)](Number(RegExp['$1']));else{if($gameParty[_0xcfc972(0x157)]()&&_0x539c4c[_0xcfc972(0x2ca)](/<troop-(\d+)>/i)){const _0x5b6252=Number(RegExp['$1']);if(_0x5b6252===$gameTroop['getCurrentTroopUniqueID']()){if(_0x539c4c[_0xcfc972(0x2ca)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x539c4c[_0xcfc972(0x2ca)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x199)]=function(_0x57106f){const _0x565e74=_0x103316;if(!_0x57106f)return![];if(this['isEnemy']())return!![];this[_0x565e74(0x238)]=this[_0x565e74(0x238)]||{};if(this['_skillToggle'][_0x57106f['id']]===undefined){this[_0x565e74(0x309)]()?this[_0x565e74(0x238)][_0x57106f['id']]=DataManager[_0x565e74(0x1e5)](_0x57106f):this[_0x565e74(0x238)][_0x57106f['id']]=!![];if(this[_0x565e74(0x238)][_0x57106f['id']]&&DataManager[_0x565e74(0x358)](_0x57106f)[_0x565e74(0xd1)]>0x0){const _0x3ea597=DataManager['toggleExclusionGroups'](_0x57106f),_0x2e0dcc=this[_0x565e74(0x361)]()[_0x565e74(0x38d)](_0x3c6f9c=>_0x3c6f9c!==_0x57106f)[_0x565e74(0x38d)](_0x39969e=>DataManager['isToggleSkill'](_0x39969e))[_0x565e74(0x38d)](_0x28720f=>DataManager['toggleExclusionGroups'](_0x28720f)[_0x565e74(0x284)](_0x187ace=>_0x3ea597['includes'](_0x187ace)));_0x2e0dcc[_0x565e74(0xd1)]>0x0&&(this[_0x565e74(0x238)][_0x57106f['id']]=![]);}if(this[_0x565e74(0x238)][_0x57106f['id']]){this[_0x565e74(0x2e8)](),$gameParty[_0x565e74(0x2b5)]();if($gameParty[_0x565e74(0x157)]())$gameTroop['refreshAllMembers']();}}return this[_0x565e74(0x238)][_0x57106f['id']];},Game_BattlerBase['prototype'][_0x103316(0x2c3)]=function(_0x4f4f83,_0xa92780){const _0x677029=_0x103316;if(!DataManager[_0x677029(0x320)](_0x4f4f83))return;if(this[_0x677029(0x1ed)]())return;this['_skillToggle']=this['_skillToggle']||{};if(_0xa92780&&DataManager[_0x677029(0x358)](_0x4f4f83)[_0x677029(0xd1)]>0x0){const _0x5db645=DataManager['toggleExclusionGroups'](_0x4f4f83),_0xb3cc21=this[_0x677029(0x361)]()[_0x677029(0x38d)](_0x1330c1=>DataManager['isToggleSkill'](_0x1330c1))[_0x677029(0x38d)](_0x217d97=>DataManager[_0x677029(0x358)](_0x217d97)[_0x677029(0x284)](_0x5afa9f=>_0x5db645[_0x677029(0x1f5)](_0x5afa9f)));for(const _0x1fe876 of _0xb3cc21){if(!_0x1fe876)continue;this[_0x677029(0x238)][_0x1fe876['id']]=![];}}this[_0x677029(0x238)][_0x4f4f83['id']]=_0xa92780,this[_0x677029(0x2e8)](),$gameParty[_0x677029(0x2b5)]();if($gameParty['inBattle']())$gameTroop['refreshAllMembers']();},VisuMZ[_0x103316(0x21e)][_0x103316(0x1d7)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2d8)],Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x2d8)]=function(_0x2d8b43){const _0x7d8476=_0x103316;if(DataManager[_0x7d8476(0x320)](_0x2d8b43)){if(this['isActor']()){if($gameParty[_0x7d8476(0x157)]()){if(this[_0x7d8476(0x391)]())return![];if(this['isConfused']())return![];}if(this[_0x7d8476(0x199)](_0x2d8b43))return!![];}else return![];}return VisuMZ[_0x7d8476(0x21e)][_0x7d8476(0x1d7)][_0x7d8476(0x1f3)](this,_0x2d8b43);},VisuMZ['SkillsStatesCore']['Game_Action_isValid']=Game_Action[_0x103316(0x21b)][_0x103316(0x134)],Game_Action[_0x103316(0x21b)][_0x103316(0x134)]=function(){const _0x32ace3=_0x103316;if(DataManager[_0x32ace3(0x320)](this[_0x32ace3(0xe2)]()))return![];return VisuMZ['SkillsStatesCore']['Game_Action_isValid'][_0x32ace3(0x1f3)](this);},VisuMZ[_0x103316(0x21e)][_0x103316(0xb8)]=Game_Battler[_0x103316(0x21b)]['addState'],Game_Battler[_0x103316(0x21b)][_0x103316(0x109)]=function(_0x200095){const _0x2039ef=_0x103316,_0x647102=this[_0x2039ef(0x295)](_0x200095);VisuMZ[_0x2039ef(0x21e)]['Game_Battler_addState'][_0x2039ef(0x1f3)](this,_0x200095);if(_0x647102&&this['hasState']($dataStates[_0x200095])){this[_0x2039ef(0xa8)](_0x200095);;}},VisuMZ[_0x103316(0x21e)][_0x103316(0x15a)]=Game_Battler[_0x103316(0x21b)][_0x103316(0x295)],Game_Battler[_0x103316(0x21b)][_0x103316(0x295)]=function(_0xdc0b2d){const _0x50c219=_0x103316,_0xdd4bd2=$dataStates[_0xdc0b2d];if(_0xdd4bd2&&_0xdd4bd2[_0x50c219(0x2eb)][_0x50c219(0x2ca)](/<NO DEATH CLEAR>/i))return!this[_0x50c219(0x1bb)](_0xdc0b2d)&&!this['isStateRestrict'](_0xdc0b2d)&&!this[_0x50c219(0xa7)][_0x50c219(0xba)](_0xdc0b2d);return VisuMZ[_0x50c219(0x21e)][_0x50c219(0x15a)][_0x50c219(0x1f3)](this,_0xdc0b2d);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x329)],Game_BattlerBase[_0x103316(0x21b)]['addNewState']=function(_0x423983){const _0x5a5e3a=_0x103316;VisuMZ['SkillsStatesCore'][_0x5a5e3a(0x166)][_0x5a5e3a(0x1f3)](this,_0x423983);if(_0x423983===this[_0x5a5e3a(0x30b)]())while(this[_0x5a5e3a(0xf1)]['filter'](_0x414f4f=>_0x414f4f===this[_0x5a5e3a(0x30b)]())[_0x5a5e3a(0xd1)]>0x1){const _0xc321e=this[_0x5a5e3a(0xf1)][_0x5a5e3a(0x1db)](this[_0x5a5e3a(0x30b)]());this[_0x5a5e3a(0xf1)][_0x5a5e3a(0x135)](_0xc321e,0x1);}},Game_Battler[_0x103316(0x21b)]['onAddState']=function(_0x5d59ef){const _0x679d6c=_0x103316;this['setStateOrigin'](_0x5d59ef),this['removeOtherStatesOfSameCategory'](_0x5d59ef),this['onAddStateMakeCustomSlipValues'](_0x5d59ef),this[_0x679d6c(0x1c7)](_0x5d59ef),this[_0x679d6c(0x1a8)](_0x5d59ef);},Game_Battler[_0x103316(0x21b)][_0x103316(0x1f4)]=function(_0x534d08){const _0x5457ca=_0x103316;this[_0x5457ca(0x170)](_0x534d08),this[_0x5457ca(0x290)](_0x534d08),Game_BattlerBase['prototype'][_0x5457ca(0x1f4)][_0x5457ca(0x1f3)](this,_0x534d08);},Game_Battler['prototype'][_0x103316(0x211)]=function(_0x312791){const _0x4dea81=_0x103316;for(const _0x58e9ff of this['states']()){this[_0x4dea81(0x15d)](_0x58e9ff['id'])&&_0x58e9ff['autoRemovalTiming']===_0x312791&&(this[_0x4dea81(0x271)](_0x58e9ff['id']),this['onExpireState'](_0x58e9ff['id']),this[_0x4dea81(0x27c)](_0x58e9ff['id']));}},Game_Battler['prototype'][_0x103316(0x111)]=function(_0x30e7e5){const _0xc0ea2e=_0x103316;this[_0xc0ea2e(0x2d4)](_0x30e7e5);},Game_Battler[_0x103316(0x21b)][_0x103316(0x1c7)]=function(_0x3b6ecb){const _0x22dc72=_0x103316;if(this[_0x22dc72(0x232)]||this[_0x22dc72(0xae)])return;const _0x3826a8=VisuMZ[_0x22dc72(0x21e)][_0x22dc72(0x22f)];if(_0x3826a8[_0x3b6ecb])_0x3826a8[_0x3b6ecb][_0x22dc72(0x1f3)](this,_0x3b6ecb);},Game_Battler['prototype'][_0x103316(0x170)]=function(_0x5e9d9a){const _0x20a2f3=_0x103316;if(this[_0x20a2f3(0x232)]||this['_tempBattler'])return;const _0x35c3ba=VisuMZ[_0x20a2f3(0x21e)][_0x20a2f3(0x213)];if(_0x35c3ba[_0x5e9d9a])_0x35c3ba[_0x5e9d9a][_0x20a2f3(0x1f3)](this,_0x5e9d9a);},Game_Battler[_0x103316(0x21b)][_0x103316(0x2d4)]=function(_0x2ca6ae){const _0x4c9c73=_0x103316;if(this['_tempActor']||this[_0x4c9c73(0xae)])return;const _0x2ef54f=VisuMZ[_0x4c9c73(0x21e)][_0x4c9c73(0x386)];if(_0x2ef54f[_0x2ca6ae])_0x2ef54f[_0x2ca6ae][_0x4c9c73(0x1f3)](this,_0x2ca6ae);},Game_Battler[_0x103316(0x21b)][_0x103316(0x1a8)]=function(_0x348f91){const _0x37f873=_0x103316;if(this[_0x37f873(0x232)]||this[_0x37f873(0xae)])return;try{VisuMZ[_0x37f873(0x21e)][_0x37f873(0x30c)][_0x37f873(0x35e)]['onAddStateJS'][_0x37f873(0x1f3)](this,_0x348f91);}catch(_0x184930){if($gameTemp['isPlaytest']())console['log'](_0x184930);}},Game_Battler[_0x103316(0x21b)][_0x103316(0x290)]=function(_0x445e78){const _0x3d3392=_0x103316;if(this[_0x3d3392(0x232)]||this['_tempBattler'])return;try{VisuMZ[_0x3d3392(0x21e)][_0x3d3392(0x30c)][_0x3d3392(0x35e)][_0x3d3392(0x25f)][_0x3d3392(0x1f3)](this,_0x445e78);}catch(_0x32aa98){if($gameTemp[_0x3d3392(0x10b)]())console[_0x3d3392(0x248)](_0x32aa98);}},Game_Battler[_0x103316(0x21b)][_0x103316(0x27c)]=function(_0x1c3322){const _0x55e2e7=_0x103316;if(this[_0x55e2e7(0x232)]||this[_0x55e2e7(0xae)])return;try{VisuMZ[_0x55e2e7(0x21e)][_0x55e2e7(0x30c)][_0x55e2e7(0x35e)]['onExpireStateJS'][_0x55e2e7(0x1f3)](this,_0x1c3322);}catch(_0x20e4ce){if($gameTemp[_0x55e2e7(0x10b)]())console[_0x55e2e7(0x248)](_0x20e4ce);}},Game_Battler['prototype'][_0x103316(0x1de)]=function(_0x256475){const _0x38d883=_0x103316;return _0x256475=_0x256475[_0x38d883(0x2fa)]()['trim'](),this[_0x38d883(0x32a)]()[_0x38d883(0x38d)](_0x1124c1=>_0x1124c1[_0x38d883(0x212)]['includes'](_0x256475));},Game_Battler[_0x103316(0x21b)][_0x103316(0xc0)]=function(_0x4af66b,_0x41a78e){const _0x57dad9=_0x103316;_0x4af66b=_0x4af66b['toUpperCase']()['trim'](),_0x41a78e=_0x41a78e||0x0;const _0xb66022=this['statesByCategory'](_0x4af66b),_0x3f3e00=[];for(const _0x33f598 of _0xb66022){if(!_0x33f598)continue;if(_0x41a78e<=0x0)break;_0x3f3e00['push'](_0x33f598['id']),this[_0x57dad9(0xa7)]['success']=!![],_0x41a78e--;}while(_0x3f3e00[_0x57dad9(0xd1)]>0x0){this[_0x57dad9(0x271)](_0x3f3e00[_0x57dad9(0x35d)]());}},Game_Battler[_0x103316(0x21b)]['removeStatesByCategoryAll']=function(_0x3d0d1e,_0x43a2ef){const _0x32f4b5=_0x103316;_0x3d0d1e=_0x3d0d1e[_0x32f4b5(0x2fa)]()[_0x32f4b5(0x21c)](),_0x43a2ef=_0x43a2ef||[];const _0xfc358b=this[_0x32f4b5(0x1de)](_0x3d0d1e),_0x46f5e1=[];for(const _0x397166 of _0xfc358b){if(!_0x397166)continue;if(_0x43a2ef[_0x32f4b5(0x1f5)](_0x397166))continue;_0x46f5e1['push'](_0x397166['id']),this[_0x32f4b5(0xa7)]['success']=!![];}while(_0x46f5e1['length']>0x0){this[_0x32f4b5(0x271)](_0x46f5e1[_0x32f4b5(0x35d)]());}},Game_Battler[_0x103316(0x21b)][_0x103316(0x1f8)]=function(_0x5db747){const _0x1ccf57=_0x103316;return this[_0x1ccf57(0x350)](_0x5db747)>0x0;},Game_Battler[_0x103316(0x21b)][_0x103316(0x378)]=function(_0x3150b6){return this['totalStateCategory'](_0x3150b6)>0x0;},Game_Battler[_0x103316(0x21b)][_0x103316(0x350)]=function(_0x2ea455){const _0x4cd1b6=_0x103316,_0xde29a=this[_0x4cd1b6(0x1de)](_0x2ea455)['filter'](_0x390380=>this['isStateAffected'](_0x390380['id']));return _0xde29a[_0x4cd1b6(0xd1)];},Game_Battler[_0x103316(0x21b)][_0x103316(0x1ba)]=function(_0x2f8f44){const _0x9613e2=_0x103316,_0x267a94=this[_0x9613e2(0x1de)](_0x2f8f44);return _0x267a94['length'];},VisuMZ[_0x103316(0x21e)][_0x103316(0x14f)]=Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x1bb)],Game_BattlerBase['prototype'][_0x103316(0x1bb)]=function(_0x4b7b71){const _0x3e99d5=_0x103316,_0x491504=$dataStates[_0x4b7b71];if(_0x491504&&_0x491504[_0x3e99d5(0x212)][_0x3e99d5(0xd1)]>0x0)for(const _0x17b761 of _0x491504[_0x3e99d5(0x212)]){if(this['isStateCategoryResisted'](_0x17b761))return!![];}return VisuMZ[_0x3e99d5(0x21e)][_0x3e99d5(0x14f)][_0x3e99d5(0x1f3)](this,_0x4b7b71);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x29c)]=function(_0x2e4607){const _0x1f4833=_0x103316;let _0x2dc0ee=_0x1f4833(0x2e9);if(this['checkCacheKey'](_0x2dc0ee))return this['_cache'][_0x2dc0ee][_0x1f4833(0x1f5)](_0x2e4607);return this[_0x1f4833(0x32f)][_0x2dc0ee]=this[_0x1f4833(0xd8)](),this['_cache'][_0x2dc0ee][_0x1f4833(0x1f5)](_0x2e4607);},Game_BattlerBase['prototype'][_0x103316(0xd8)]=function(){const _0x28e832=_0x103316,_0x235a23=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x167b55=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x488f8c=[];for(const _0x43d721 of this[_0x28e832(0x347)]()){if(!_0x43d721)continue;const _0x140a1e=_0x43d721['note'],_0x135021=_0x140a1e[_0x28e832(0x2ca)](_0x235a23);if(_0x135021)for(const _0x44ad0d of _0x135021){_0x44ad0d[_0x28e832(0x2ca)](_0x235a23);const _0x36fae7=String(RegExp['$1'])['split'](',')['map'](_0xbde398=>String(_0xbde398)[_0x28e832(0x2fa)]()[_0x28e832(0x21c)]());_0x488f8c=_0x488f8c[_0x28e832(0x188)](_0x36fae7);}if(_0x140a1e[_0x28e832(0x2ca)](_0x167b55)){const _0x3025b2=String(RegExp['$1'])[_0x28e832(0x1bc)](/[\r\n]+/)['map'](_0x2138ae=>String(_0x2138ae)[_0x28e832(0x2fa)]()[_0x28e832(0x21c)]());_0x488f8c=_0x488f8c[_0x28e832(0x188)](_0x3025b2);}}return _0x488f8c;},Game_BattlerBase['prototype'][_0x103316(0x1a6)]=function(_0x2abfe3){const _0x262f87=_0x103316,_0x5dd3ca=$dataStates[_0x2abfe3];if(!_0x5dd3ca)return;const _0x2882c0=_0x5dd3ca[_0x262f87(0x2eb)]||'',_0x489420=_0x2882c0['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0x489420){const _0x44c104=[_0x5dd3ca];for(const _0x59bda1 of _0x489420){_0x59bda1[_0x262f87(0x2ca)](/<REMOVE OTHER (.*) STATES>/i);const _0x990d75=String(RegExp['$1']);this[_0x262f87(0x2a1)](_0x990d75,_0x44c104);}}},Game_Battler[_0x103316(0x21b)]['removeStatesByDamage']=function(){const _0x48c531=_0x103316;for(const _0x552d29 of this[_0x48c531(0x32a)]()){if(!_0x552d29)continue;if(!this[_0x48c531(0x246)](_0x552d29['id']))continue;if(!_0x552d29[_0x48c531(0x11f)])continue;if(this[_0x48c531(0x359)](_0x552d29))continue;Math['randomInt'](0x64)<_0x552d29[_0x48c531(0x2a2)]&&this[_0x48c531(0x271)](_0x552d29['id']);}},VisuMZ['SkillsStatesCore']['Game_Action_executeHpDamage_bypassStateDmgRemoval']=Game_Action[_0x103316(0x21b)][_0x103316(0x9f)],Game_Action[_0x103316(0x21b)]['executeHpDamage']=function(_0x1d4b77,_0x33e988){const _0x31a0a7=_0x103316;$gameTemp[_0x31a0a7(0x198)]=this[_0x31a0a7(0xe2)](),$gameTemp[_0x31a0a7(0x19c)]=this[_0x31a0a7(0x243)](),$gameTemp['_bypassRemoveStateDamage_value']=_0x33e988,VisuMZ[_0x31a0a7(0x21e)][_0x31a0a7(0x330)][_0x31a0a7(0x1f3)](this,_0x1d4b77,_0x33e988),$gameTemp[_0x31a0a7(0x198)]=undefined,$gameTemp[_0x31a0a7(0x19c)]=undefined,$gameTemp['_bypassRemoveStateDamage_value']=undefined;},Game_Battler[_0x103316(0x21b)][_0x103316(0x359)]=function(_0x194af7){const _0x3c067c=_0x103316;if($gameTemp[_0x3c067c(0x198)]){const _0x136190=$gameTemp[_0x3c067c(0x198)],_0x5a47fb=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager['CheckBypassRemoveStatesByDamage'](_0x194af7,_0x136190,_0x5a47fb,'action'))return!![];}if($gameTemp['_bypassRemoveStateDamage_user']){const _0x165ad9=$gameTemp[_0x3c067c(0x19c)];if(_0x165ad9['isUserBypassRemoveStatesByDamage'](_0x194af7))return!![];}if(this['isTargetBypassRemoveStatesByDamage'](_0x194af7))return!![];return![];},Game_Battler[_0x103316(0x21b)][_0x103316(0x393)]=function(_0x1d5337){const _0x17fff2=_0x103316,_0x36b032=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x57f2c2 of this['traitObjects']()){if(!_0x57f2c2)continue;if(DataManager[_0x17fff2(0x137)](_0x1d5337,_0x57f2c2,_0x36b032,_0x17fff2(0xb0)))return!![];}return![];},Game_Battler[_0x103316(0x21b)][_0x103316(0x13d)]=function(_0x3c9f0c){const _0x1f881e=_0x103316,_0x1c991d=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x51a873 of this['traitObjects']()){if(!_0x51a873)continue;if(DataManager[_0x1f881e(0x137)](_0x3c9f0c,_0x51a873,_0x1c991d,_0x1f881e(0x1f0)))return!![];}return![];},DataManager[_0x103316(0x137)]=function(_0x266975,_0x2159c3,_0x1508f6,_0x5d5d4b){const _0x118437=_0x103316,_0x2921c9='%1-%2-%3'[_0x118437(0x156)](_0x2159c3[_0x118437(0x268)],_0x2159c3['id'],_0x5d5d4b);this[_0x118437(0x256)]=this['_cache_CheckBypassRemoveStatesByDamage']||{};if(this[_0x118437(0x256)][_0x2921c9]!==undefined)return this[_0x118437(0x256)][_0x2921c9][_0x118437(0x1f5)](_0x266975['id']);const _0x560be2=[],_0x2a5a97=_0x2159c3[_0x118437(0x2eb)][_0x118437(0x2ca)](_0x1508f6);if(_0x2a5a97)for(const _0x562ed8 of _0x2a5a97){_0x562ed8[_0x118437(0x2ca)](_0x1508f6);const _0x238ace=String(RegExp['$1'])['split'](',')['map'](_0x358b80=>_0x358b80[_0x118437(0x21c)]());for(let _0x19412f of _0x238ace){_0x19412f=(String(_0x19412f)||'')[_0x118437(0x21c)]();if(_0x19412f[_0x118437(0x2ca)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x48351a=Math[_0x118437(0x97)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x3f66b6=Math[_0x118437(0x233)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x25f474=_0x48351a;_0x25f474<=_0x3f66b6;_0x25f474++)elements[_0x118437(0x2dc)](_0x25f474);continue;}const _0xbcd35d=/^\d+$/['test'](_0x19412f);_0xbcd35d?entryID=Number(_0x19412f):entryID=DataManager[_0x118437(0xe8)](_0x19412f),entryID&&_0x560be2[_0x118437(0x2dc)](entryID);}}return this['_cache_CheckBypassRemoveStatesByDamage'][_0x2921c9]=_0x560be2,this['_cache_CheckBypassRemoveStatesByDamage'][_0x2921c9][_0x118437(0x1f5)](_0x266975['id']);},VisuMZ[_0x103316(0x21e)][_0x103316(0x279)]=Game_Battler[_0x103316(0x21b)][_0x103316(0x2f6)],Game_Battler[_0x103316(0x21b)][_0x103316(0x2f6)]=function(_0x3d8b0f,_0x380402){const _0x3e30c1=_0x103316;VisuMZ[_0x3e30c1(0x21e)][_0x3e30c1(0x279)][_0x3e30c1(0x1f3)](this,_0x3d8b0f,_0x380402),this['isBuffAffected'](_0x3d8b0f)&&this[_0x3e30c1(0x257)](_0x3d8b0f,_0x380402);},Game_Battler[_0x103316(0x21b)][_0x103316(0x1d3)]=function(_0xe1ab65){},VisuMZ[_0x103316(0x21e)][_0x103316(0x28c)]=Game_Battler['prototype'][_0x103316(0x2a9)],Game_Battler['prototype']['addDebuff']=function(_0x11a6a8,_0x298317){const _0x55b3fe=_0x103316;VisuMZ[_0x55b3fe(0x21e)][_0x55b3fe(0x28c)][_0x55b3fe(0x1f3)](this,_0x11a6a8,_0x298317),this[_0x55b3fe(0x384)](_0x11a6a8)&&this[_0x55b3fe(0x147)](_0x11a6a8,_0x298317);},Game_Battler['prototype'][_0x103316(0x25a)]=function(){const _0x10f97c=_0x103316;for(let _0x5a7be1=0x0;_0x5a7be1<this[_0x10f97c(0x179)]();_0x5a7be1++){if(this[_0x10f97c(0x342)](_0x5a7be1)){const _0x3aac6b=this[_0x10f97c(0x2e2)][_0x5a7be1];this[_0x10f97c(0x398)](_0x5a7be1);if(_0x3aac6b>0x0)this[_0x10f97c(0x155)](_0x5a7be1);if(_0x3aac6b<0x0)this['onExpireDebuff'](_0x5a7be1);}}},Game_Battler[_0x103316(0x21b)][_0x103316(0x257)]=function(_0xa52acc,_0x106627){this['onAddBuffGlobalJS'](_0xa52acc,_0x106627);},Game_Battler['prototype'][_0x103316(0x147)]=function(_0x77992a,_0x5e644a){const _0x5a2cbc=_0x103316;this[_0x5a2cbc(0x2b3)](_0x77992a,_0x5e644a);},Game_Battler['prototype']['onEraseBuff']=function(_0x428047){const _0x31fd13=_0x103316;Game_BattlerBase[_0x31fd13(0x21b)][_0x31fd13(0x1a5)][_0x31fd13(0x1f3)](this,_0x428047),this[_0x31fd13(0x21f)](_0x428047);},Game_Battler[_0x103316(0x21b)]['onEraseDebuff']=function(_0x24c26c){const _0xae86ee=_0x103316;Game_BattlerBase[_0xae86ee(0x21b)][_0xae86ee(0x16d)][_0xae86ee(0x1f3)](this,_0x24c26c),this[_0xae86ee(0x129)](_0x24c26c);},Game_Battler[_0x103316(0x21b)][_0x103316(0x155)]=function(_0x2eec97){const _0x4bfa65=_0x103316;this[_0x4bfa65(0x192)](_0x2eec97);},Game_Battler[_0x103316(0x21b)][_0x103316(0x293)]=function(_0x58b228){const _0xecfa6=_0x103316;this[_0xecfa6(0x167)](_0x58b228);},Game_Battler[_0x103316(0x21b)][_0x103316(0x99)]=function(_0x597720,_0x143b98){const _0x546ee3=_0x103316;VisuMZ['SkillsStatesCore'][_0x546ee3(0x30c)][_0x546ee3(0x31f)]['onAddBuffJS'][_0x546ee3(0x1f3)](this,_0x597720,_0x143b98);},Game_Battler['prototype']['onAddDebuffGlobalJS']=function(_0x309013,_0x18d9ea){const _0xe27553=_0x103316;VisuMZ[_0xe27553(0x21e)][_0xe27553(0x30c)][_0xe27553(0x31f)][_0xe27553(0xf4)][_0xe27553(0x1f3)](this,_0x309013,_0x18d9ea);},Game_BattlerBase[_0x103316(0x21b)][_0x103316(0x21f)]=function(_0x125169){const _0x30c932=_0x103316;VisuMZ[_0x30c932(0x21e)][_0x30c932(0x30c)][_0x30c932(0x31f)][_0x30c932(0x335)][_0x30c932(0x1f3)](this,_0x125169);},Game_BattlerBase[_0x103316(0x21b)]['onEraseDebuffGlobalJS']=function(_0x15628f){const _0x357111=_0x103316;VisuMZ[_0x357111(0x21e)][_0x357111(0x30c)][_0x357111(0x31f)][_0x357111(0x308)]['call'](this,_0x15628f);},Game_Battler[_0x103316(0x21b)][_0x103316(0x192)]=function(_0x274227){const _0x4ea8c5=_0x103316;VisuMZ[_0x4ea8c5(0x21e)][_0x4ea8c5(0x30c)][_0x4ea8c5(0x31f)][_0x4ea8c5(0x298)][_0x4ea8c5(0x1f3)](this,_0x274227);},Game_Battler[_0x103316(0x21b)][_0x103316(0x167)]=function(_0x2946b7){const _0xf73943=_0x103316;VisuMZ[_0xf73943(0x21e)][_0xf73943(0x30c)][_0xf73943(0x31f)]['onExpireDebuffJS'][_0xf73943(0x1f3)](this,_0x2946b7);},Game_Battler[_0x103316(0x21b)][_0x103316(0x296)]=function(_0x4422a8){const _0x2b66eb=_0x103316,_0x4898bd=VisuMZ[_0x2b66eb(0x21e)],_0x55727e=[_0x2b66eb(0xc7),'stateHpSlipHealJS',_0x2b66eb(0x2ea),_0x2b66eb(0x31c),_0x2b66eb(0x24c),_0x2b66eb(0x33b)];for(const _0x330932 of _0x55727e){_0x4898bd[_0x330932][_0x4422a8]&&_0x4898bd[_0x330932][_0x4422a8][_0x2b66eb(0x1f3)](this,_0x4422a8);}},VisuMZ[_0x103316(0x21e)][_0x103316(0x32e)]=Game_Battler['prototype'][_0x103316(0x24f)],Game_Battler[_0x103316(0x21b)][_0x103316(0x24f)]=function(){const _0x335a1f=_0x103316;this[_0x335a1f(0x2d5)](),VisuMZ[_0x335a1f(0x21e)]['Game_Battler_regenerateAll'][_0x335a1f(0x1f3)](this),this[_0x335a1f(0x273)](),this[_0x335a1f(0x1d1)]();},Game_Battler['prototype'][_0x103316(0x273)]=function(){const _0xa57f5c=_0x103316;for(const _0x483c1e of this[_0xa57f5c(0x1e8)]()){if(!_0x483c1e)continue;this[_0xa57f5c(0x296)](_0x483c1e['id']);}},Game_Battler['prototype'][_0x103316(0x2d5)]=function(){const _0x2368aa=_0x103316;for(const _0x51e99a of this[_0x2368aa(0x32a)]()){if(!_0x51e99a)continue;_0x51e99a[_0x2368aa(0x2eb)][_0x2368aa(0x2ca)](/<JS SLIP REFRESH>/i)&&this[_0x2368aa(0x296)](_0x51e99a['id']);}},Game_Battler[_0x103316(0x21b)][_0x103316(0x1d1)]=function(){const _0x825a80=_0x103316;if(!this[_0x825a80(0x142)]())return;const _0xb7568c=this[_0x825a80(0x32a)]();for(const _0x52a32a of _0xb7568c){if(!_0x52a32a)continue;this[_0x825a80(0x1e6)](_0x52a32a);}},Game_Battler[_0x103316(0x21b)][_0x103316(0x1e6)]=function(_0x538d3c){const _0x234f9a=_0x103316,_0x1c7781=this[_0x234f9a(0xa6)](_0x538d3c['id'],_0x234f9a(0x217))||0x0,_0xa3cc4e=-this[_0x234f9a(0x385)](),_0x1f692a=Math[_0x234f9a(0x233)](_0x1c7781,_0xa3cc4e);if(_0x1f692a!==0x0){const _0x577456=this['_result'][_0x234f9a(0x1fa)]||0x0;this[_0x234f9a(0x1d2)](_0x1f692a),this[_0x234f9a(0xa7)][_0x234f9a(0x1fa)]+=_0x577456;}const _0x2dfe18=this[_0x234f9a(0xa6)](_0x538d3c['id'],_0x234f9a(0x294))||0x0;if(_0x2dfe18!==0x0){const _0x5c9221=this[_0x234f9a(0xa7)][_0x234f9a(0x33e)]||0x0;this[_0x234f9a(0x191)](_0x2dfe18),this[_0x234f9a(0xa7)][_0x234f9a(0x33e)]+=_0x5c9221;}const _0x50e921=this[_0x234f9a(0xa6)](_0x538d3c['id'],_0x234f9a(0x34b))||0x0;_0x50e921!==0x0&&this['gainSilentTp'](_0x50e921);},VisuMZ[_0x103316(0x21e)]['Game_Actor_skillTypes']=Game_Actor[_0x103316(0x21b)][_0x103316(0x27d)],Game_Actor[_0x103316(0x21b)][_0x103316(0x27d)]=function(){const _0xad655c=_0x103316,_0x854cf6=VisuMZ[_0xad655c(0x21e)][_0xad655c(0x145)]['call'](this),_0x4938d6=VisuMZ[_0xad655c(0x21e)][_0xad655c(0x30c)][_0xad655c(0x12c)];let _0x32b341=_0x4938d6[_0xad655c(0x272)];return $gameParty['inBattle']()&&(_0x32b341=_0x32b341[_0xad655c(0x188)](_0x4938d6[_0xad655c(0xc4)])),_0x854cf6[_0xad655c(0x38d)](_0x5e7a3a=>!_0x32b341['includes'](_0x5e7a3a));},Game_Actor[_0x103316(0x21b)][_0x103316(0x1cb)]=function(){const _0x1e6ebd=_0x103316;return this[_0x1e6ebd(0x361)]()[_0x1e6ebd(0x38d)](_0x4c456d=>this[_0x1e6ebd(0x136)](_0x4c456d));},Game_Actor[_0x103316(0x21b)]['isSkillUsableForAutoBattle']=function(_0x5d764c){const _0x28eb5a=_0x103316;if(!this[_0x28eb5a(0x14b)](_0x5d764c))return![];if(!_0x5d764c)return![];if(!this['isSkillTypeMatchForUse'](_0x5d764c))return![];if(this['isSkillHidden'](_0x5d764c))return![];return!![];},Game_Actor[_0x103316(0x21b)][_0x103316(0x2f2)]=function(_0x5315b6){const _0x49fd7d=_0x103316,_0x7b635f=this[_0x49fd7d(0x27d)](),_0xbf8fe9=DataManager['getSkillTypes'](_0x5315b6),_0x1c93c2=_0x7b635f[_0x49fd7d(0x38d)](_0x590695=>_0xbf8fe9[_0x49fd7d(0x1f5)](_0x590695));return _0x1c93c2[_0x49fd7d(0xd1)]>0x0;},Game_Actor[_0x103316(0x21b)][_0x103316(0xd3)]=function(_0x1bb0fd){const _0x307ddd=_0x103316;if(!VisuMZ['SkillsStatesCore'][_0x307ddd(0x2f7)](this,_0x1bb0fd))return!![];if(!VisuMZ[_0x307ddd(0x21e)][_0x307ddd(0x1a0)](this,_0x1bb0fd))return!![];if(!VisuMZ[_0x307ddd(0x21e)][_0x307ddd(0xec)](this,_0x1bb0fd))return!![];return![];},Game_Actor[_0x103316(0x21b)][_0x103316(0x339)]=function(){const _0x33b95a=_0x103316;let _0x3e8a97=[this['actor'](),this[_0x33b95a(0xe0)]()];_0x3e8a97=_0x3e8a97[_0x33b95a(0x188)](this[_0x33b95a(0x186)]()[_0x33b95a(0x38d)](_0x466a0c=>_0x466a0c));for(const _0x3ac570 of this['_skills']){const _0x4f0a08=$dataSkills[_0x3ac570];if(!_0x4f0a08)continue;if(DataManager['isToggleSkill'](_0x4f0a08)){if(!this['isSkillToggled'](_0x4f0a08))continue;}_0x3e8a97['push'](_0x4f0a08);}return _0x3e8a97;},Game_Actor[_0x103316(0x21b)][_0x103316(0x1e4)]=function(){const _0x42c223=_0x103316;Game_Battler['prototype'][_0x42c223(0x1e4)]['call'](this);const _0x1024ef=VisuMZ[_0x42c223(0x21e)]['Settings'][_0x42c223(0x258)][_0x42c223(0xe9)];this[_0x42c223(0x32f)][_0x42c223(0x1e8)]=this['_cache'][_0x42c223(0x1e8)][_0x42c223(0x188)](_0x1024ef);},VisuMZ[_0x103316(0x21e)][_0x103316(0x1e0)]=Game_Actor[_0x103316(0x21b)][_0x103316(0x395)],Game_Actor[_0x103316(0x21b)][_0x103316(0x395)]=function(_0x538273){const _0x43ff83=_0x103316;VisuMZ[_0x43ff83(0x21e)]['Game_Actor_learnSkill'][_0x43ff83(0x1f3)](this,_0x538273),this[_0x43ff83(0x32f)]={},this[_0x43ff83(0x1e8)]();},VisuMZ[_0x103316(0x21e)][_0x103316(0x1e3)]=Game_Actor['prototype'][_0x103316(0x1c2)],Game_Actor['prototype'][_0x103316(0x1c2)]=function(_0x471e3c){const _0x70d466=_0x103316;VisuMZ[_0x70d466(0x21e)][_0x70d466(0x1e3)][_0x70d466(0x1f3)](this,_0x471e3c),this[_0x70d466(0x32f)]={},this[_0x70d466(0x1e8)]();},Game_Actor['prototype'][_0x103316(0x394)]=function(){const _0x45f075=_0x103316;return VisuMZ[_0x45f075(0x21e)][_0x45f075(0x30c)][_0x45f075(0x35e)][_0x45f075(0x20e)]??0x14;},Game_Enemy[_0x103316(0x21b)][_0x103316(0x339)]=function(){let _0x511c05=[this['enemy']()];return _0x511c05['concat'](this['skills']());},Game_Enemy[_0x103316(0x21b)][_0x103316(0x1e4)]=function(){const _0x232841=_0x103316;Game_Battler[_0x232841(0x21b)][_0x232841(0x1e4)][_0x232841(0x1f3)](this);const _0x659d42=VisuMZ[_0x232841(0x21e)][_0x232841(0x30c)][_0x232841(0x258)]['Enemy'];this['_cache'][_0x232841(0x1e8)]=this['_cache'][_0x232841(0x1e8)][_0x232841(0x188)](_0x659d42);},Game_Enemy[_0x103316(0x21b)][_0x103316(0x361)]=function(){const _0x311659=_0x103316,_0x384a87=[];for(const _0xafdc75 of this[_0x311659(0x2c4)]()['actions']){const _0x17247d=$dataSkills[_0xafdc75[_0x311659(0x161)]];if(_0x17247d&&!_0x384a87['includes'](_0x17247d))_0x384a87[_0x311659(0x2dc)](_0x17247d);}return _0x384a87;},Game_Enemy['prototype'][_0x103316(0xcc)]=function(_0x5dce4b){return this['hasState']($dataStates[_0x5dce4b]);},VisuMZ[_0x103316(0x21e)][_0x103316(0x2cb)]=Game_Unit['prototype'][_0x103316(0x100)],Game_Unit[_0x103316(0x21b)][_0x103316(0x100)]=function(){const _0x26702f=_0x103316;if(this[_0x26702f(0x2fd)]())return!![];return VisuMZ[_0x26702f(0x21e)][_0x26702f(0x2cb)][_0x26702f(0x1f3)](this);},Game_Unit[_0x103316(0x21b)][_0x103316(0x2fd)]=function(){const _0x53dbdf=_0x103316,_0x4d670a=this[_0x53dbdf(0xea)]();for(const _0x33b31f of _0x4d670a){if(!_0x33b31f[_0x53dbdf(0x127)]())return![];}return!![];},Game_Unit[_0x103316(0x21b)][_0x103316(0x2b5)]=function(){const _0x4d5ead=_0x103316;for(const _0x4dc1e4 of this['members']()){if(!_0x4dc1e4)continue;_0x4dc1e4[_0x4d5ead(0x2e8)]();}},VisuMZ[_0x103316(0x21e)][_0x103316(0x2c5)]=Game_Player[_0x103316(0x21b)][_0x103316(0x2e8)],Game_Player[_0x103316(0x21b)]['refresh']=function(){const _0x58816a=_0x103316;VisuMZ['SkillsStatesCore']['Game_Player_refresh'][_0x58816a(0x1f3)](this),$gameParty[_0x58816a(0x2b5)](),$gameParty['inBattle']()&&$gameTroop['refreshAllMembers']();},VisuMZ[_0x103316(0x21e)][_0x103316(0x1c1)]=Game_Troop['prototype'][_0x103316(0x15e)],Game_Troop[_0x103316(0x21b)]['setup']=function(_0x33272e){const _0x1c7152=_0x103316;VisuMZ['SkillsStatesCore'][_0x1c7152(0x1c1)][_0x1c7152(0x1f3)](this,_0x33272e),this[_0x1c7152(0x3a2)]();},Game_Troop['prototype'][_0x103316(0x3a2)]=function(){this['_currentTroopUniqueID']=Graphics['frameCount'];},Game_Troop[_0x103316(0x21b)][_0x103316(0x34a)]=function(){const _0x5dae33=_0x103316;return this[_0x5dae33(0xf7)]=this[_0x5dae33(0xf7)]||Graphics[_0x5dae33(0x292)],this['_currentTroopUniqueID'];},Scene_Skill[_0x103316(0x21b)][_0x103316(0x25c)]=function(){const _0xd19597=_0x103316;if(ConfigManager[_0xd19597(0xde)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0xd19597(0x1c8)];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0xd19597(0x379)]()[_0xd19597(0x2ca)](/LOWER/i);else Scene_ItemBase[_0xd19597(0x21b)]['isRightInputMode'][_0xd19597(0x1f3)](this);}},Scene_Skill[_0x103316(0x21b)]['isRightInputMode']=function(){const _0x57e38e=_0x103316;if(ConfigManager[_0x57e38e(0xde)]&&ConfigManager[_0x57e38e(0x108)]!==undefined)return ConfigManager[_0x57e38e(0x108)];else return this[_0x57e38e(0x265)]()?this[_0x57e38e(0x379)]()[_0x57e38e(0x2ca)](/RIGHT/i):Scene_ItemBase[_0x57e38e(0x21b)][_0x57e38e(0x263)]['call'](this);},Scene_Skill[_0x103316(0x21b)][_0x103316(0x379)]=function(){const _0x288bcc=_0x103316;return VisuMZ[_0x288bcc(0x21e)][_0x288bcc(0x30c)][_0x288bcc(0x12c)][_0x288bcc(0x1b3)];},Scene_Skill[_0x103316(0x21b)][_0x103316(0xb6)]=function(){const _0x3cf891=_0x103316;return this[_0x3cf891(0x2c1)]&&this['_categoryWindow'][_0x3cf891(0xb6)]();},Scene_Skill[_0x103316(0x21b)][_0x103316(0x265)]=function(){const _0x4ab3de=_0x103316;return VisuMZ[_0x4ab3de(0x21e)][_0x4ab3de(0x30c)][_0x4ab3de(0x12c)][_0x4ab3de(0x34f)];},VisuMZ['SkillsStatesCore'][_0x103316(0x326)]=Scene_Skill[_0x103316(0x21b)][_0x103316(0x337)],Scene_Skill[_0x103316(0x21b)]['helpWindowRect']=function(){const _0x5ae98c=_0x103316;return this[_0x5ae98c(0x265)]()?this['helpWindowRectSkillsStatesCore']():VisuMZ[_0x5ae98c(0x21e)]['Scene_Skill_helpWindowRect']['call'](this);},Scene_Skill['prototype']['helpWindowRectSkillsStatesCore']=function(){const _0x3d9bb6=_0x103316,_0x21cc69=0x0,_0xfc3cfa=this[_0x3d9bb6(0x176)](),_0x3cedfb=Graphics[_0x3d9bb6(0x1eb)],_0x1eb145=this['helpAreaHeight']();return new Rectangle(_0x21cc69,_0xfc3cfa,_0x3cedfb,_0x1eb145);},VisuMZ[_0x103316(0x21e)][_0x103316(0x255)]=Scene_Skill[_0x103316(0x21b)][_0x103316(0x36e)],Scene_Skill[_0x103316(0x21b)]['skillTypeWindowRect']=function(){const _0x35545f=_0x103316;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x35545f(0x21e)][_0x35545f(0x255)]['call'](this);},Scene_Skill[_0x103316(0x21b)][_0x103316(0x150)]=function(){const _0x2022bc=_0x103316;return VisuMZ[_0x2022bc(0x21e)][_0x2022bc(0x30c)]['Skills'][_0x2022bc(0x2de)]??Scene_MenuBase[_0x2022bc(0x21b)][_0x2022bc(0x150)]['call'](this);},Scene_Skill[_0x103316(0x21b)][_0x103316(0x260)]=function(){const _0x2ead49=_0x103316,_0x36bb60=this[_0x2ead49(0x150)](),_0x2a841b=this[_0x2ead49(0x2ae)](0x3,!![]),_0x673842=this['isRightInputMode']()?Graphics[_0x2ead49(0x1eb)]-_0x36bb60:0x0,_0x217b20=this[_0x2ead49(0xbe)]();return new Rectangle(_0x673842,_0x217b20,_0x36bb60,_0x2a841b);},VisuMZ['SkillsStatesCore'][_0x103316(0x2a7)]=Scene_Skill[_0x103316(0x21b)]['statusWindowRect'],Scene_Skill[_0x103316(0x21b)][_0x103316(0x365)]=function(){const _0x1ae8f3=_0x103316;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x1ae8f3(0x287)]():VisuMZ[_0x1ae8f3(0x21e)][_0x1ae8f3(0x2a7)]['call'](this);},Scene_Skill[_0x103316(0x21b)][_0x103316(0x287)]=function(){const _0x13257a=_0x103316,_0xbbed02=Graphics['boxWidth']-this[_0x13257a(0x150)](),_0x401298=this[_0x13257a(0x1d4)][_0x13257a(0x270)],_0x49f19e=this[_0x13257a(0x263)]()?0x0:Graphics[_0x13257a(0x1eb)]-_0xbbed02,_0x312299=this['mainAreaTop']();return new Rectangle(_0x49f19e,_0x312299,_0xbbed02,_0x401298);},VisuMZ['SkillsStatesCore'][_0x103316(0x210)]=Scene_Skill[_0x103316(0x21b)][_0x103316(0x184)],Scene_Skill[_0x103316(0x21b)]['createItemWindow']=function(){const _0x424960=_0x103316;VisuMZ[_0x424960(0x21e)][_0x424960(0x210)][_0x424960(0x1f3)](this),this[_0x424960(0x106)]()&&this[_0x424960(0x31e)]();},VisuMZ[_0x103316(0x21e)][_0x103316(0x121)]=Scene_Skill[_0x103316(0x21b)][_0x103316(0xfc)],Scene_Skill[_0x103316(0x21b)][_0x103316(0xfc)]=function(){const _0x2639f8=_0x103316;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x2639f8(0x223)]();else{const _0x3f5aa3=VisuMZ[_0x2639f8(0x21e)][_0x2639f8(0x121)][_0x2639f8(0x1f3)](this);return this[_0x2639f8(0x106)]()&&this[_0x2639f8(0x190)]()&&(_0x3f5aa3['width']-=this['shopStatusWidth']()),_0x3f5aa3;}},Scene_Skill[_0x103316(0x21b)][_0x103316(0x223)]=function(){const _0x29d924=_0x103316,_0x5673a4=Graphics[_0x29d924(0x1eb)]-this[_0x29d924(0x123)](),_0x4f276c=this['mainAreaHeight']()-this[_0x29d924(0x328)][_0x29d924(0x270)],_0x5eb4ed=this['isRightInputMode']()?Graphics['boxWidth']-_0x5673a4:0x0,_0x5a00a8=this[_0x29d924(0x328)]['y']+this[_0x29d924(0x328)][_0x29d924(0x270)];return new Rectangle(_0x5eb4ed,_0x5a00a8,_0x5673a4,_0x4f276c);},Scene_Skill[_0x103316(0x21b)][_0x103316(0x106)]=function(){const _0x4c8595=_0x103316;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ[_0x4c8595(0x21e)][_0x4c8595(0x30c)][_0x4c8595(0x12c)]['ShowShopStatus'];},Scene_Skill[_0x103316(0x21b)][_0x103316(0x190)]=function(){const _0x22a321=_0x103316;return VisuMZ[_0x22a321(0x21e)][_0x22a321(0x30c)][_0x22a321(0x12c)][_0x22a321(0x116)];},Scene_Skill['prototype'][_0x103316(0x31e)]=function(){const _0x3b1cc9=_0x103316,_0x34fe80=this[_0x3b1cc9(0xfa)]();this[_0x3b1cc9(0x16a)]=new Window_ShopStatus(_0x34fe80),this['addWindow'](this['_shopStatusWindow']),this[_0x3b1cc9(0x22d)][_0x3b1cc9(0x148)](this[_0x3b1cc9(0x16a)]);const _0x2f7352=VisuMZ[_0x3b1cc9(0x21e)][_0x3b1cc9(0x30c)][_0x3b1cc9(0x12c)][_0x3b1cc9(0x368)];this[_0x3b1cc9(0x16a)][_0x3b1cc9(0x286)](_0x2f7352||0x0);},Scene_Skill[_0x103316(0x21b)][_0x103316(0xfa)]=function(){const _0x514269=_0x103316;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x514269(0x1e1)]():VisuMZ[_0x514269(0x21e)][_0x514269(0x30c)][_0x514269(0x12c)][_0x514269(0x1d8)][_0x514269(0x1f3)](this);},Scene_Skill[_0x103316(0x21b)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x2cc365=_0x103316,_0x1c3777=this['shopStatusWidth'](),_0x434069=this[_0x2cc365(0x22d)][_0x2cc365(0x270)],_0x5232d8=this['isRightInputMode']()?0x0:Graphics[_0x2cc365(0x1eb)]-this['shopStatusWidth'](),_0x1a2466=this[_0x2cc365(0x22d)]['y'];return new Rectangle(_0x5232d8,_0x1a2466,_0x1c3777,_0x434069);},Scene_Skill[_0x103316(0x21b)][_0x103316(0x123)]=function(){const _0xf669a1=_0x103316;return Imported[_0xf669a1(0xc9)]?Scene_Shop[_0xf669a1(0x21b)][_0xf669a1(0x351)]():0x0;},Scene_Skill[_0x103316(0x21b)][_0x103316(0x377)]=function(){const _0x16a4ef=_0x103316;return this['_skillTypeWindow']&&this[_0x16a4ef(0x1d4)][_0x16a4ef(0xb1)]?TextManager[_0x16a4ef(0x19b)]:'';},VisuMZ[_0x103316(0x21e)][_0x103316(0x2d7)]=Scene_Skill[_0x103316(0x21b)][_0x103316(0x280)],Scene_Skill[_0x103316(0x21b)][_0x103316(0x280)]=function(){const _0x10cd35=_0x103316,_0x243720=this['item']();DataManager['isToggleSkill'](_0x243720)?this[_0x10cd35(0x15c)]():VisuMZ['SkillsStatesCore']['Scene_Skill_onItemOk_Toggle'][_0x10cd35(0x1f3)](this);},Scene_Skill[_0x103316(0x21b)]['onSkillToggle']=function(){const _0x26c1d7=_0x103316;SoundManager[_0x26c1d7(0x90)]();const _0x3c6e10=this[_0x26c1d7(0xe2)](),_0x455509=this[_0x26c1d7(0xa5)]()[_0x26c1d7(0x199)](_0x3c6e10);if(!_0x455509)this[_0x26c1d7(0xa5)]()[_0x26c1d7(0x310)](_0x3c6e10);this[_0x26c1d7(0xa5)]()[_0x26c1d7(0x2c3)](_0x3c6e10,!_0x455509),this[_0x26c1d7(0x22d)]['refresh'](),this[_0x26c1d7(0x22d)]['activate']();if(this[_0x26c1d7(0x328)])this[_0x26c1d7(0x328)][_0x26c1d7(0x2e8)]();},VisuMZ[_0x103316(0x21e)][_0x103316(0x163)]=Scene_Battle[_0x103316(0x21b)][_0x103316(0xc6)],Scene_Battle[_0x103316(0x21b)][_0x103316(0xc6)]=function(){const _0x769849=_0x103316,_0x15347e=this[_0x769849(0x311)]['item']();DataManager[_0x769849(0x320)](_0x15347e)?this[_0x769849(0x15c)]():VisuMZ[_0x769849(0x21e)]['Scene_Battle_onSkillOk_Toggle'][_0x769849(0x1f3)](this);},Scene_Battle[_0x103316(0x21b)][_0x103316(0x15c)]=function(){const _0x189cbb=_0x103316;SoundManager[_0x189cbb(0x90)]();const _0x26d377=this[_0x189cbb(0x311)][_0x189cbb(0xe2)](),_0x5cb0ce=BattleManager['actor'](),_0x68c106=_0x5cb0ce[_0x189cbb(0x199)](_0x26d377);if(!_0x68c106)_0x5cb0ce['paySkillCost'](_0x26d377);_0x5cb0ce[_0x189cbb(0x2c3)](_0x26d377,!_0x68c106);if(Imported[_0x189cbb(0x174)]){let _0x5954c5=0x0;_0x5cb0ce[_0x189cbb(0x199)](_0x26d377)?_0x26d377[_0x189cbb(0x2eb)]['match'](/<TOGGLE ON (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x5954c5=Number(RegExp['$1']):_0x5954c5=_0x26d377[_0x189cbb(0x13c)]||0x0:_0x26d377[_0x189cbb(0x2eb)][_0x189cbb(0x2ca)](/<TOGGLE OFF (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x5954c5=Number(RegExp['$1']):_0x5954c5=VisuMZ['SkillsStatesCore'][_0x189cbb(0x30c)]['Toggles'][_0x189cbb(0x366)]??0x0,_0x5954c5>0x0&&$gameTemp[_0x189cbb(0x291)]([_0x5cb0ce],_0x5954c5,![],![]);}this[_0x189cbb(0x311)][_0x189cbb(0x2e8)](),this[_0x189cbb(0x311)]['activate']();if(this[_0x189cbb(0x328)])this[_0x189cbb(0x328)][_0x189cbb(0x2e8)]();},VisuMZ['SkillsStatesCore'][_0x103316(0x2c6)]=Sprite_Gauge['prototype'][_0x103316(0x237)],Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x237)]=function(){const _0x3432a3=_0x103316;VisuMZ['SkillsStatesCore'][_0x3432a3(0x2c6)][_0x3432a3(0x1f3)](this),this[_0x3432a3(0x202)]=null;},VisuMZ['SkillsStatesCore'][_0x103316(0x18d)]=Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x15e)],Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x15e)]=function(_0x5aaa10,_0x342147){const _0x5ccfa4=_0x103316;this[_0x5ccfa4(0x390)](_0x5aaa10,_0x342147),_0x342147=_0x342147[_0x5ccfa4(0x38a)](),VisuMZ[_0x5ccfa4(0x21e)]['Sprite_Gauge_setup'][_0x5ccfa4(0x1f3)](this,_0x5aaa10,_0x342147);},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x390)]=function(_0x1cbd7d,_0x5c2894){const _0x397694=_0x103316,_0x4aecf5=VisuMZ['SkillsStatesCore'][_0x397694(0x30c)][_0x397694(0x180)][_0x397694(0x38d)](_0x472a12=>_0x472a12['Name'][_0x397694(0x2fa)]()===_0x5c2894[_0x397694(0x2fa)]());_0x4aecf5[_0x397694(0xd1)]>=0x1?this[_0x397694(0x202)]=_0x4aecf5[0x0]:this[_0x397694(0x202)]=null;},VisuMZ[_0x103316(0x21e)][_0x103316(0x2b9)]=Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x10a)],Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x10a)]=function(){const _0x5d7862=_0x103316;return this[_0x5d7862(0x207)]&&this[_0x5d7862(0x202)]?this[_0x5d7862(0x2b7)]():VisuMZ[_0x5d7862(0x21e)]['Sprite_Gauge_currentValue'][_0x5d7862(0x1f3)](this);},Sprite_Gauge[_0x103316(0x21b)]['currentValueSkillsStatesCore']=function(){const _0x5a231c=_0x103316;return this[_0x5a231c(0x202)]['GaugeCurrentJS'][_0x5a231c(0x1f3)](this[_0x5a231c(0x207)]);},VisuMZ[_0x103316(0x21e)][_0x103316(0x1ce)]=Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x353)],Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x353)]=function(){const _0x361eb4=_0x103316;return this[_0x361eb4(0x207)]&&this[_0x361eb4(0x202)]?this[_0x361eb4(0x346)]():VisuMZ['SkillsStatesCore'][_0x361eb4(0x1ce)]['call'](this);},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x346)]=function(){const _0x4ec54c=_0x103316;return this['_costSettings'][_0x4ec54c(0x35a)][_0x4ec54c(0x1f3)](this['_battler']);},VisuMZ[_0x103316(0x21e)][_0x103316(0x114)]=Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x1cd)],Sprite_Gauge['prototype'][_0x103316(0x1cd)]=function(){const _0x4d26d7=_0x103316,_0x1a5082=VisuMZ[_0x4d26d7(0x21e)][_0x4d26d7(0x114)][_0x4d26d7(0x1f3)](this);return _0x1a5082['clamp'](0x0,0x1);},VisuMZ[_0x103316(0x21e)]['Sprite_Gauge_redraw']=Sprite_Gauge[_0x103316(0x21b)]['redraw'],Sprite_Gauge['prototype'][_0x103316(0xdf)]=function(){const _0x1e4d13=_0x103316;this[_0x1e4d13(0x207)]&&this[_0x1e4d13(0x202)]?(this[_0x1e4d13(0x19d)]['clear'](),this[_0x1e4d13(0x370)]()):VisuMZ[_0x1e4d13(0x21e)][_0x1e4d13(0x96)][_0x1e4d13(0x1f3)](this);},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x2cc)]=function(){const _0x415a90=_0x103316;let _0x342c4c=this[_0x415a90(0x10a)]();return Imported[_0x415a90(0x174)]&&this[_0x415a90(0x34d)]()&&(_0x342c4c=VisuMZ['GroupDigits'](_0x342c4c)),_0x342c4c;},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x370)]=function(){const _0x4de9a4=_0x103316;this[_0x4de9a4(0x19d)]['clear'](),this['_costSettings'][_0x4de9a4(0xb5)][_0x4de9a4(0x1f3)](this);},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x28e)]=function(_0x34251b,_0x25cd36,_0x3bf1ac,_0x2dab29,_0x110662,_0x3cd768){const _0x37674a=_0x103316,_0x2d1b47=this[_0x37674a(0x1cd)](),_0x2b985a=Math['floor']((_0x110662-0x2)*_0x2d1b47),_0x1c9ac1=_0x3cd768-0x2,_0x96c5b4=this[_0x37674a(0x338)]();this[_0x37674a(0x19d)][_0x37674a(0x183)](_0x3bf1ac,_0x2dab29,_0x110662,_0x3cd768,_0x96c5b4),this[_0x37674a(0x19d)][_0x37674a(0x92)](_0x3bf1ac+0x1,_0x2dab29+0x1,_0x2b985a,_0x1c9ac1,_0x34251b,_0x25cd36);},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x269)]=function(){const _0x602906=_0x103316,_0x28db03=VisuMZ[_0x602906(0x21e)][_0x602906(0x30c)][_0x602906(0x2f4)];return _0x28db03[_0x602906(0x2ed)]===_0x602906(0x171)?$gameSystem[_0x602906(0xfb)]():$gameSystem[_0x602906(0xac)]();},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x206)]=function(){const _0xf1fa3a=_0x103316,_0x2a541d=VisuMZ[_0xf1fa3a(0x21e)][_0xf1fa3a(0x30c)]['Gauge'];return _0x2a541d[_0xf1fa3a(0x2ed)]===_0xf1fa3a(0x171)?$gameSystem[_0xf1fa3a(0x168)]()-0x6:$gameSystem[_0xf1fa3a(0x168)]()-0x2;},Sprite_Gauge['prototype']['valueFontFace']=function(){const _0x3dba80=_0x103316,_0x516256=VisuMZ[_0x3dba80(0x21e)][_0x3dba80(0x30c)][_0x3dba80(0x2f4)];return _0x516256[_0x3dba80(0x2a5)]===_0x3dba80(0x171)?$gameSystem[_0x3dba80(0xfb)]():$gameSystem[_0x3dba80(0xac)]();},Sprite_Gauge[_0x103316(0x21b)]['valueFontSize']=function(){const _0x1ff3ed=_0x103316,_0x3fe718=VisuMZ[_0x1ff3ed(0x21e)][_0x1ff3ed(0x30c)][_0x1ff3ed(0x2f4)];return _0x3fe718[_0x1ff3ed(0x2a5)]===_0x1ff3ed(0x171)?$gameSystem['mainFontSize']()-0x6:$gameSystem[_0x1ff3ed(0x168)]()-0x2;},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0xb4)]=function(){const _0x225539=_0x103316,_0x12912d=VisuMZ[_0x225539(0x21e)][_0x225539(0x30c)][_0x225539(0x2f4)];if(_0x12912d['MatchLabelColor']){if(_0x12912d[_0x225539(0x334)]===0x1)return this['gaugeColor1']();else{if(_0x12912d[_0x225539(0x334)]===0x2)return this['gaugeColor2']();}}const _0x457017=_0x12912d[_0x225539(0x8f)];return ColorManager[_0x225539(0x344)](_0x457017);},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x10e)]=function(){const _0x407f91=_0x103316,_0x450cb0=VisuMZ[_0x407f91(0x21e)][_0x407f91(0x30c)][_0x407f91(0x2f4)];if(this[_0x407f91(0x2fb)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x450cb0[_0x407f91(0x1c0)]?'rgba(0,\x200,\x200,\x201)':ColorManager[_0x407f91(0x23d)]();},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x2fb)]=function(){const _0x5a12b8=_0x103316;return VisuMZ[_0x5a12b8(0x21e)][_0x5a12b8(0x30c)][_0x5a12b8(0x2f4)][_0x5a12b8(0x2aa)]||0x0;},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0x2e5)]=function(){const _0x4c7bbf=_0x103316,_0x408994=VisuMZ['SkillsStatesCore']['Settings'][_0x4c7bbf(0x2f4)];if(this[_0x4c7bbf(0xd5)]()<=0x0)return _0x4c7bbf(0x1b2);else return _0x408994['ValueOutlineSolid']?_0x4c7bbf(0x380):ColorManager[_0x4c7bbf(0x23d)]();},Sprite_Gauge[_0x103316(0x21b)][_0x103316(0xd5)]=function(){const _0x31f6e4=_0x103316;return VisuMZ[_0x31f6e4(0x21e)]['Settings'][_0x31f6e4(0x2f4)][_0x31f6e4(0x18b)]||0x0;},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x160)],Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x160)]=function(){const _0x4aed00=_0x103316;VisuMZ[_0x4aed00(0x21e)]['Sprite_StateIcon_loadBitmap'][_0x4aed00(0x1f3)](this),this[_0x4aed00(0x159)]();},Sprite_StateIcon['prototype'][_0x103316(0x159)]=function(){const _0x92213d=_0x103316,_0x232e6c=Window_Base[_0x92213d(0x21b)][_0x92213d(0x2b8)]();this['_turnDisplaySprite']=new Sprite(),this['_turnDisplaySprite'][_0x92213d(0x19d)]=new Bitmap(ImageManager['iconWidth'],_0x232e6c),this[_0x92213d(0x352)][_0x92213d(0x203)]['x']=this[_0x92213d(0x203)]['x'],this['_turnDisplaySprite'][_0x92213d(0x203)]['y']=this[_0x92213d(0x203)]['y'],this['addChild'](this['_turnDisplaySprite']),this[_0x92213d(0x2c0)]=this[_0x92213d(0x352)]['bitmap'];},VisuMZ[_0x103316(0x21e)][_0x103316(0x1ec)]=Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x3a7)],Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x3a7)]=function(){const _0x2da5ae=_0x103316;VisuMZ[_0x2da5ae(0x21e)][_0x2da5ae(0x1ec)][_0x2da5ae(0x1f3)](this),this[_0x2da5ae(0x1c5)]();},Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0xfe)]=function(_0x322bc4,_0x220443,_0x164b73,_0x46149f,_0x33c9cb){const _0x34d28e=_0x103316;this[_0x34d28e(0x2c0)][_0x34d28e(0xfe)](_0x322bc4,_0x220443,_0x164b73,_0x46149f,this[_0x34d28e(0x2c0)][_0x34d28e(0x270)],_0x33c9cb);},Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x1c5)]=function(){const _0x2993fa=_0x103316;this[_0x2993fa(0x1ff)](),this[_0x2993fa(0x2c0)][_0x2993fa(0xf6)]();const _0x443e3a=this[_0x2993fa(0x207)];if(!_0x443e3a)return;const _0x3b0643=_0x443e3a['states']()['filter'](_0x23a301=>_0x23a301['iconIndex']>0x0),_0x11120e=[...Array(0x8)[_0x2993fa(0x336)]()][_0x2993fa(0x38d)](_0x18c0f1=>_0x443e3a[_0x2993fa(0x196)](_0x18c0f1)!==0x0),_0x538208=this[_0x2993fa(0x128)],_0x37f5d3=_0x3b0643[_0x538208];if(_0x37f5d3)Window_Base['prototype'][_0x2993fa(0x19a)][_0x2993fa(0x1f3)](this,_0x443e3a,_0x37f5d3,0x0,0x0),Window_Base[_0x2993fa(0x21b)][_0x2993fa(0x1e9)][_0x2993fa(0x1f3)](this,_0x443e3a,_0x37f5d3,0x0,0x0);else{const _0x337c7a=_0x11120e[_0x538208-_0x3b0643[_0x2993fa(0xd1)]];if(_0x337c7a===undefined)return;Window_Base[_0x2993fa(0x21b)][_0x2993fa(0x348)][_0x2993fa(0x1f3)](this,_0x443e3a,_0x337c7a,0x0,0x0),Window_Base[_0x2993fa(0x21b)][_0x2993fa(0x117)][_0x2993fa(0x1f3)](this,_0x443e3a,_0x337c7a,0x0,0x0);}},Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x1ff)]=function(){const _0x473e37=_0x103316;this[_0x473e37(0x2c0)][_0x473e37(0xb9)]=$gameSystem[_0x473e37(0xac)](),this['contents'][_0x473e37(0x1b6)]=$gameSystem[_0x473e37(0x168)](),this[_0x473e37(0x10c)]();},Sprite_StateIcon['prototype'][_0x103316(0x10c)]=function(){const _0x483768=_0x103316;this[_0x483768(0x1fb)](ColorManager['normalColor']()),this[_0x483768(0x169)](ColorManager['outlineColor']());},Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x1fb)]=function(_0x2b0fb4){const _0x3a354f=_0x103316;this['contents'][_0x3a354f(0x39c)]=_0x2b0fb4;},Sprite_StateIcon[_0x103316(0x21b)]['changeOutlineColor']=function(_0x3a67c4){const _0x589f53=_0x103316;this[_0x589f53(0x2c0)]['outlineColor']=_0x3a67c4;},Sprite_StateIcon[_0x103316(0x21b)][_0x103316(0x146)]=function(){const _0xbd6b99=_0x103316;this['_hidden']=!![],this[_0xbd6b99(0x1a3)]();},Window_Base[_0x103316(0x21b)][_0x103316(0xc5)]=function(_0x5e4b0d,_0x219bab,_0x2a9265,_0x5f4c02,_0x355a13){const _0x276cdd=_0x103316,_0x2c0d69=this[_0x276cdd(0x23b)](_0x5e4b0d,_0x219bab),_0x2e0a20=this['textSizeEx'](_0x2c0d69,_0x2a9265,_0x5f4c02,_0x355a13),_0x36158a=_0x2a9265+_0x355a13-_0x2e0a20[_0x276cdd(0x1f1)];this[_0x276cdd(0xbf)](_0x2c0d69,_0x36158a,_0x5f4c02,_0x355a13),this[_0x276cdd(0x1ff)]();},Window_Base['prototype'][_0x103316(0x23b)]=function(_0x44ae1d,_0x403cf7){const _0x41ab54=_0x103316;let _0x12835b='';for(settings of VisuMZ[_0x41ab54(0x21e)][_0x41ab54(0x30c)][_0x41ab54(0x180)]){if(!this[_0x41ab54(0x12f)](_0x44ae1d,_0x403cf7,settings))continue;if(_0x12835b['length']>0x0)_0x12835b+=this[_0x41ab54(0x3a6)]();_0x12835b+=this['createSkillCostText'](_0x44ae1d,_0x403cf7,settings);}_0x12835b=this[_0x41ab54(0x1a1)](_0x44ae1d,_0x403cf7,_0x12835b);if(_0x403cf7['note']['match'](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x12835b[_0x41ab54(0xd1)]>0x0)_0x12835b+=this[_0x41ab54(0x3a6)]();_0x12835b+=String(RegExp['$1']);}return _0x12835b;},Window_Base['prototype'][_0x103316(0x1a1)]=function(_0x152042,_0x2efdfa,_0x4762c8){return _0x4762c8;},Window_Base[_0x103316(0x21b)][_0x103316(0x12f)]=function(_0x2ec914,_0x17ac77,_0x1f7853){const _0x211632=_0x103316;let _0x25addb=_0x1f7853[_0x211632(0x37a)]['call'](_0x2ec914,_0x17ac77);return _0x25addb=_0x2ec914[_0x211632(0x38e)](_0x17ac77,_0x25addb,_0x1f7853),_0x1f7853[_0x211632(0x204)][_0x211632(0x1f3)](_0x2ec914,_0x17ac77,_0x25addb,_0x1f7853);},Window_Base[_0x103316(0x21b)][_0x103316(0x27f)]=function(_0xfd50e7,_0x389e4a,_0x475465){const _0x3d8886=_0x103316;let _0x475db1=_0x475465[_0x3d8886(0x37a)][_0x3d8886(0x1f3)](_0xfd50e7,_0x389e4a);return _0x475db1=_0xfd50e7[_0x3d8886(0x38e)](_0x389e4a,_0x475db1,_0x475465),_0x475465[_0x3d8886(0x24d)][_0x3d8886(0x1f3)](_0xfd50e7,_0x389e4a,_0x475db1,_0x475465);},Window_Base[_0x103316(0x21b)][_0x103316(0x3a6)]=function(){return'\x20';},Window_Base['prototype']['drawActorIcons']=function(_0x3e6a5d,_0x2e872a,_0x4a4252,_0x333bb3){const _0x1e9fb3=_0x103316;if(!_0x3e6a5d)return;VisuMZ[_0x1e9fb3(0x21e)][_0x1e9fb3(0x2e0)][_0x1e9fb3(0x1f3)](this,_0x3e6a5d,_0x2e872a,_0x4a4252,_0x333bb3),this[_0x1e9fb3(0x20a)](_0x3e6a5d,_0x2e872a,_0x4a4252,_0x333bb3);},Window_Base[_0x103316(0x21b)]['drawActorIconsAllTurnCounters']=function(_0x237bba,_0x118337,_0x357625,_0xecc689){const _0x70e38c=_0x103316;_0xecc689=_0xecc689||0x90;const _0x2edcff=ImageManager[_0x70e38c(0x1ea)]||0x20,_0x5713af=ImageManager[_0x70e38c(0x94)]||0x20,_0xe8cb58=_0x2edcff,_0x374f8d=_0x237bba['allIcons']()[_0x70e38c(0x32d)](0x0,Math[_0x70e38c(0xce)](_0xecc689/_0xe8cb58)),_0x57a327=_0x237bba[_0x70e38c(0x32a)]()['filter'](_0x53f299=>_0x53f299[_0x70e38c(0x130)]>0x0),_0x52c045=[...Array(0x8)[_0x70e38c(0x336)]()][_0x70e38c(0x38d)](_0x2d15e2=>_0x237bba[_0x70e38c(0x196)](_0x2d15e2)!==0x0),_0xb33dbe=[];let _0x823436=_0x118337;for(let _0x157971=0x0;_0x157971<_0x374f8d[_0x70e38c(0xd1)];_0x157971++){this['resetFontSettings']();const _0x1982db=_0x57a327[_0x157971];if(_0x1982db)!_0xb33dbe['includes'](_0x1982db)&&this[_0x70e38c(0x19a)](_0x237bba,_0x1982db,_0x823436,_0x357625),this[_0x70e38c(0x1e9)](_0x237bba,_0x1982db,_0x823436,_0x357625),_0xb33dbe[_0x70e38c(0x2dc)](_0x1982db);else{const _0x343036=_0x52c045[_0x157971-_0x57a327[_0x70e38c(0xd1)]];this[_0x70e38c(0x348)](_0x237bba,_0x343036,_0x823436,_0x357625),this[_0x70e38c(0x117)](_0x237bba,_0x343036,_0x823436,_0x357625);}_0x823436+=_0xe8cb58;}},Window_Base[_0x103316(0x21b)]['drawActorStateTurns']=function(_0x5b2e6c,_0x336b3a,_0x59df66,_0x272689){const _0xf8377c=_0x103316;if(!VisuMZ[_0xf8377c(0x21e)][_0xf8377c(0x30c)]['States'][_0xf8377c(0x201)])return;if(!_0x5b2e6c[_0xf8377c(0x246)](_0x336b3a['id']))return;if(_0x336b3a[_0xf8377c(0xd6)]===0x0)return;if(_0x336b3a[_0xf8377c(0x2eb)][_0xf8377c(0x2ca)](/<HIDE STATE TURNS>/i))return;const _0x2101b7=ImageManager['standardIconWidth']||0x20,_0x380992=_0x2101b7,_0x2be9a4=_0x5b2e6c[_0xf8377c(0x189)](_0x336b3a['id']),_0x11163b=ColorManager[_0xf8377c(0x252)](_0x336b3a);this[_0xf8377c(0x1fb)](_0x11163b),this[_0xf8377c(0x169)](_0xf8377c(0x380)),this[_0xf8377c(0x2c0)][_0xf8377c(0xe3)]=!![],this[_0xf8377c(0x2c0)]['fontSize']=VisuMZ[_0xf8377c(0x21e)][_0xf8377c(0x30c)][_0xf8377c(0x35e)][_0xf8377c(0x14e)],_0x59df66+=VisuMZ['SkillsStatesCore'][_0xf8377c(0x30c)][_0xf8377c(0x35e)][_0xf8377c(0x185)],_0x272689+=VisuMZ[_0xf8377c(0x21e)]['Settings']['States'][_0xf8377c(0x29e)],this[_0xf8377c(0xfe)](_0x2be9a4,_0x59df66,_0x272689,_0x380992,_0xf8377c(0x175)),this[_0xf8377c(0x2c0)][_0xf8377c(0xe3)]=![],this['resetFontSettings']();},Window_Base[_0x103316(0x21b)][_0x103316(0x1e9)]=function(_0x1cb310,_0x2e91ff,_0x5e3e24,_0x1f286e){const _0x1d83f7=_0x103316;if(!VisuMZ[_0x1d83f7(0x21e)][_0x1d83f7(0x30c)][_0x1d83f7(0x35e)][_0x1d83f7(0x28a)])return;const _0x8dc944=ImageManager[_0x1d83f7(0x1ea)]||0x20,_0x3dc3ad=ImageManager[_0x1d83f7(0x94)]||0x20,_0x57cedc=_0x8dc944,_0x135e55=_0x3dc3ad/0x2,_0x3926d2=ColorManager['normalColor']();this['changeTextColor'](_0x3926d2),this['changeOutlineColor'](_0x1d83f7(0x380)),this['contents']['fontBold']=!![],this[_0x1d83f7(0x2c0)]['fontSize']=VisuMZ[_0x1d83f7(0x21e)][_0x1d83f7(0x30c)][_0x1d83f7(0x35e)]['DataFontSize'],_0x5e3e24+=VisuMZ[_0x1d83f7(0x21e)][_0x1d83f7(0x30c)]['States'][_0x1d83f7(0x20c)],_0x1f286e+=VisuMZ['SkillsStatesCore'][_0x1d83f7(0x30c)][_0x1d83f7(0x35e)]['DataOffsetY'];const _0x2dc969=String(_0x1cb310[_0x1d83f7(0xc1)](_0x2e91ff['id']));this[_0x1d83f7(0xfe)](_0x2dc969,_0x5e3e24,_0x1f286e,_0x57cedc,'center'),this[_0x1d83f7(0x2c0)][_0x1d83f7(0xe3)]=![],this[_0x1d83f7(0x1ff)]();},Window_Base[_0x103316(0x21b)][_0x103316(0x348)]=function(_0x590190,_0x4c582d,_0x81972c,_0x17de9f){const _0x210a0b=_0x103316;if(!VisuMZ[_0x210a0b(0x21e)][_0x210a0b(0x30c)][_0x210a0b(0x31f)][_0x210a0b(0x201)])return;const _0x1f468c=_0x590190[_0x210a0b(0x196)](_0x4c582d);if(_0x1f468c===0x0)return;const _0x272ec9=_0x590190['buffTurns'](_0x4c582d),_0x3b64fb=ImageManager[_0x210a0b(0x229)],_0x3ad64d=_0x1f468c>0x0?ColorManager['buffColor']():ColorManager['debuffColor']();this[_0x210a0b(0x1fb)](_0x3ad64d),this[_0x210a0b(0x169)](_0x210a0b(0x380)),this[_0x210a0b(0x2c0)]['fontBold']=!![],this[_0x210a0b(0x2c0)][_0x210a0b(0x1b6)]=VisuMZ[_0x210a0b(0x21e)][_0x210a0b(0x30c)][_0x210a0b(0x31f)]['TurnFontSize'],_0x81972c+=VisuMZ['SkillsStatesCore']['Settings'][_0x210a0b(0x31f)]['TurnOffsetX'],_0x17de9f+=VisuMZ[_0x210a0b(0x21e)][_0x210a0b(0x30c)][_0x210a0b(0x31f)]['TurnOffsetY'],this[_0x210a0b(0xfe)](_0x272ec9,_0x81972c,_0x17de9f,_0x3b64fb,'right'),this[_0x210a0b(0x2c0)]['fontBold']=![],this['resetFontSettings']();},Window_Base[_0x103316(0x21b)][_0x103316(0x117)]=function(_0x5643ad,_0x5e3940,_0x2db7ce,_0x763666){const _0x389954=_0x103316;if(!VisuMZ[_0x389954(0x21e)][_0x389954(0x30c)][_0x389954(0x31f)][_0x389954(0x28a)])return;const _0x17f330=_0x5643ad[_0x389954(0x399)](_0x5e3940),_0x780cc=_0x5643ad[_0x389954(0x196)](_0x5e3940),_0x2ec73c=ImageManager[_0x389954(0x1ea)]||0x20,_0x147b0d=ImageManager['standardIconHeight']||0x20,_0x560e2d=_0x2ec73c,_0xe212c8=_0x147b0d/0x2,_0x1d2929=_0x780cc>0x0?ColorManager[_0x389954(0x115)]():ColorManager[_0x389954(0x2a4)]();this[_0x389954(0x1fb)](_0x1d2929),this[_0x389954(0x169)](_0x389954(0x380)),this[_0x389954(0x2c0)][_0x389954(0xe3)]=!![],this[_0x389954(0x2c0)][_0x389954(0x1b6)]=VisuMZ[_0x389954(0x21e)]['Settings']['Buffs'][_0x389954(0x39b)],_0x2db7ce+=VisuMZ[_0x389954(0x21e)][_0x389954(0x30c)]['Buffs'][_0x389954(0x20c)],_0x763666+=VisuMZ[_0x389954(0x21e)][_0x389954(0x30c)][_0x389954(0x31f)][_0x389954(0x2a3)];const _0x1090c7='%1%'[_0x389954(0x156)](Math[_0x389954(0x3a4)](_0x17f330*0x64));this[_0x389954(0xfe)](_0x1090c7,_0x2db7ce,_0x763666,_0x560e2d,_0x389954(0x1b5)),this['contents'][_0x389954(0xe3)]=![],this[_0x389954(0x1ff)]();},VisuMZ[_0x103316(0x21e)][_0x103316(0x102)]=Window_Base['prototype']['changeTextColor'],Window_Base[_0x103316(0x21b)]['changeTextColor']=function(_0x5e5fc5){const _0x21795c=_0x103316;this[_0x21795c(0x193)]&&(_0x5e5fc5=ColorManager['getColor'](VisuMZ['SkillsStatesCore'][_0x21795c(0x30c)]['Toggles'][_0x21795c(0x302)]??0x0)),VisuMZ['SkillsStatesCore'][_0x21795c(0x102)]['call'](this,_0x5e5fc5);},VisuMZ['SkillsStatesCore']['Window_Base_drawText']=Window_Base[_0x103316(0x21b)][_0x103316(0xfe)],Window_Base['prototype'][_0x103316(0xfe)]=function(_0x11af49,_0xa40b1b,_0x18402c,_0x16eb4f,_0x8f3255){const _0x47b5d7=_0x103316;VisuMZ[_0x47b5d7(0x21e)][_0x47b5d7(0x1dc)][_0x47b5d7(0x1f3)](this,_0x11af49,_0xa40b1b,_0x18402c,_0x16eb4f,_0x8f3255),this[_0x47b5d7(0x193)]=undefined;},VisuMZ[_0x103316(0x21e)]['Window_Base_createAllSkillCostText_Toggle']=Window_Base[_0x103316(0x21b)][_0x103316(0x23b)],Window_Base[_0x103316(0x21b)][_0x103316(0x23b)]=function(_0x302443,_0x57869d){const _0x428a5b=_0x103316;let _0x4c50e5=VisuMZ['SkillsStatesCore'][_0x428a5b(0x195)][_0x428a5b(0x1f3)](this,_0x302443,_0x57869d);;return DataManager['isToggleSkill'](_0x57869d)&&_0x302443&&(_0x302443['isSkillToggled'](_0x57869d)?_0x4c50e5=TextManager[_0x428a5b(0x259)]??'[ON]':(TextManager[_0x428a5b(0x95)]===_0x428a5b(0x332)?_0x4c50e5=(TextManager[_0x428a5b(0xe4)]??'[OFF]')+this['skillCostSeparator']()+_0x4c50e5:_0x4c50e5=_0x4c50e5+this['skillCostSeparator']()+(TextManager[_0x428a5b(0xe4)]??_0x428a5b(0x2d0)),_0x4c50e5=_0x4c50e5['trim']())),_0x4c50e5;},VisuMZ[_0x103316(0x21e)][_0x103316(0x101)]=Window_StatusBase[_0x103316(0x21b)][_0x103316(0xe5)],Window_StatusBase['prototype'][_0x103316(0xe5)]=function(_0x67c98f,_0x41f503,_0x36829a,_0x3e29e3){const _0x6f25d2=_0x103316;if(_0x67c98f[_0x6f25d2(0x309)]())_0x41f503=this[_0x6f25d2(0x124)](_0x67c98f,_0x41f503);this[_0x6f25d2(0x387)](_0x67c98f,_0x41f503,_0x36829a,_0x3e29e3);},Window_StatusBase['prototype'][_0x103316(0x387)]=function(_0x3aee2c,_0x4f53df,_0x1a7103,_0x780d46){const _0x21b06e=_0x103316;if([_0x21b06e(0x2ff),_0x21b06e(0xed)][_0x21b06e(0x1f5)](_0x4f53df[_0x21b06e(0x38a)]()))return;VisuMZ[_0x21b06e(0x21e)]['Window_StatusBase_placeGauge'][_0x21b06e(0x1f3)](this,_0x3aee2c,_0x4f53df,_0x1a7103,_0x780d46);},Window_StatusBase[_0x103316(0x21b)][_0x103316(0x124)]=function(_0x154ad1,_0x148338){const _0xdadbcf=_0x103316,_0x392d9f=_0x154ad1[_0xdadbcf(0xe0)]()['note'];if(_0x148338==='hp'&&_0x392d9f[_0xdadbcf(0x2ca)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x148338==='mp'&&_0x392d9f[_0xdadbcf(0x2ca)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x148338==='tp'&&_0x392d9f[_0xdadbcf(0x2ca)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x148338;}},VisuMZ[_0x103316(0x21e)][_0x103316(0x2e0)]=Window_StatusBase[_0x103316(0x21b)][_0x103316(0xad)],Window_StatusBase['prototype'][_0x103316(0xad)]=function(_0x2b2603,_0x251ca7,_0x5e142b,_0x4bb97c){const _0x4b45b4=_0x103316;if(!_0x2b2603)return;Window_Base['prototype'][_0x4b45b4(0xad)][_0x4b45b4(0x1f3)](this,_0x2b2603,_0x251ca7,_0x5e142b,_0x4bb97c);},VisuMZ[_0x103316(0x21e)][_0x103316(0x132)]=Window_SkillType['prototype']['initialize'],Window_SkillType[_0x103316(0x21b)]['initialize']=function(_0x3034ea){const _0x10733b=_0x103316;VisuMZ[_0x10733b(0x21e)][_0x10733b(0x132)][_0x10733b(0x1f3)](this,_0x3034ea),this[_0x10733b(0x341)](_0x3034ea);},Window_SkillType[_0x103316(0x21b)]['createCommandNameWindow']=function(_0x1dec26){const _0x50d73a=_0x103316,_0x377739=new Rectangle(0x0,0x0,_0x1dec26[_0x50d73a(0x1f1)],_0x1dec26['height']);this[_0x50d73a(0x20f)]=new Window_Base(_0x377739),this['_commandNameWindow']['opacity']=0x0,this['addChild'](this[_0x50d73a(0x20f)]),this[_0x50d73a(0xf9)]();},Window_SkillType['prototype'][_0x103316(0x1bf)]=function(){const _0xebe72f=_0x103316;Window_Command[_0xebe72f(0x21b)][_0xebe72f(0x1bf)][_0xebe72f(0x1f3)](this);if(this[_0xebe72f(0x20f)])this[_0xebe72f(0xf9)]();},Window_SkillType['prototype'][_0x103316(0xf9)]=function(){const _0x3e1f72=_0x103316,_0x30934e=this[_0x3e1f72(0x20f)];_0x30934e[_0x3e1f72(0x2c0)]['clear']();const _0x45e3c6=this[_0x3e1f72(0x381)](this['index']());if(_0x45e3c6===_0x3e1f72(0xdb)&&this[_0x3e1f72(0x98)]()>0x0){const _0x5ef771=this[_0x3e1f72(0x3a5)](this[_0x3e1f72(0x12e)]());let _0x1597d6=this[_0x3e1f72(0x39f)](this['index']());_0x1597d6=_0x1597d6['replace'](/\\I\[(\d+)\]/gi,''),_0x30934e[_0x3e1f72(0x1ff)](),this['commandNameWindowDrawBackground'](_0x1597d6,_0x5ef771),this['commandNameWindowDrawText'](_0x1597d6,_0x5ef771),this[_0x3e1f72(0x20d)](_0x1597d6,_0x5ef771);}},Window_SkillType[_0x103316(0x21b)][_0x103316(0xc3)]=function(_0x805ca7,_0x89ae8f){},Window_SkillType['prototype'][_0x103316(0x321)]=function(_0x10eae7,_0x1bcdf8){const _0x12ba51=_0x103316,_0x15a9bb=this[_0x12ba51(0x20f)];_0x15a9bb[_0x12ba51(0xfe)](_0x10eae7,0x0,_0x1bcdf8['y'],_0x15a9bb[_0x12ba51(0x323)],'center');},Window_SkillType['prototype'][_0x103316(0x20d)]=function(_0x4d02ec,_0x350bc5){const _0x3bee06=_0x103316,_0x345197=this[_0x3bee06(0x20f)],_0x320803=$gameSystem['windowPadding'](),_0x5756c7=_0x350bc5['x']+Math[_0x3bee06(0xce)](_0x350bc5[_0x3bee06(0x1f1)]/0x2)+_0x320803;_0x345197['x']=_0x345197['width']/-0x2+_0x5756c7,_0x345197['y']=Math[_0x3bee06(0xce)](_0x350bc5[_0x3bee06(0x270)]/0x2);},Window_SkillType[_0x103316(0x21b)]['isUseModernControls']=function(){const _0x4ae99a=_0x103316;return Imported[_0x4ae99a(0x174)]&&Window_Command['prototype']['isUseModernControls'][_0x4ae99a(0x1f3)](this);},Window_SkillType[_0x103316(0x21b)]['makeCommandList']=function(){const _0x121372=_0x103316;if(!this['_actor'])return;const _0x38cac5=this[_0x121372(0x1ab)][_0x121372(0x27d)]();for(const _0x46d14d of _0x38cac5){const _0x28cf9f=this[_0x121372(0x37d)](_0x46d14d);this['addCommand'](_0x28cf9f,_0x121372(0x264),!![],_0x46d14d);}},Window_SkillType[_0x103316(0x21b)][_0x103316(0x37d)]=function(_0x22150b){const _0xd9551d=_0x103316;let _0xaa6544=$dataSystem['skillTypes'][_0x22150b];if(_0xaa6544[_0xd9551d(0x2ca)](/\\I\[(\d+)\]/i))return _0xaa6544;if(this[_0xd9551d(0x1fd)]()===_0xd9551d(0x369))return _0xaa6544;const _0x1baf9a=VisuMZ[_0xd9551d(0x21e)][_0xd9551d(0x30c)]['Skills'],_0xb4f931=$dataSystem[_0xd9551d(0x2d1)][_0xd9551d(0x1f5)](_0x22150b),_0xe468bc=_0xb4f931?_0x1baf9a['IconStypeMagic']:_0x1baf9a[_0xd9551d(0x240)];return'\x5cI[%1]%2'['format'](_0xe468bc,_0xaa6544);},Window_SkillType[_0x103316(0x21b)][_0x103316(0x228)]=function(){const _0x4b0485=_0x103316;return VisuMZ['SkillsStatesCore'][_0x4b0485(0x30c)]['Skills'][_0x4b0485(0x22e)];},Window_SkillType['prototype']['drawItem']=function(_0x43d502){const _0x5bc11c=_0x103316,_0x356d86=this['commandStyleCheck'](_0x43d502);if(_0x356d86===_0x5bc11c(0x2e7))this[_0x5bc11c(0x17e)](_0x43d502);else _0x356d86===_0x5bc11c(0xdb)?this[_0x5bc11c(0x1af)](_0x43d502):Window_Command[_0x5bc11c(0x21b)][_0x5bc11c(0x23c)][_0x5bc11c(0x1f3)](this,_0x43d502);},Window_SkillType['prototype'][_0x103316(0x1fd)]=function(){const _0x511273=_0x103316;return VisuMZ['SkillsStatesCore'][_0x511273(0x30c)][_0x511273(0x12c)]['CmdStyle'];},Window_SkillType['prototype'][_0x103316(0x381)]=function(_0x150ef5){const _0x117816=_0x103316;if(_0x150ef5<0x0)return _0x117816(0x369);const _0x40e51c=this['commandStyle']();if(_0x40e51c!==_0x117816(0x27b))return _0x40e51c;else{if(this['maxItems']()>0x0){const _0x6ee40=this[_0x117816(0x39f)](_0x150ef5);if(_0x6ee40[_0x117816(0x2ca)](/\\I\[(\d+)\]/i)){const _0x1e31ab=this[_0x117816(0x3a5)](_0x150ef5),_0xef9268=this[_0x117816(0x38f)](_0x6ee40)[_0x117816(0x1f1)];return _0xef9268<=_0x1e31ab[_0x117816(0x1f1)]?_0x117816(0x2e7):'icon';}}}return _0x117816(0x369);},Window_SkillType[_0x103316(0x21b)]['drawItemStyleIconText']=function(_0x20668e){const _0x5c35e1=_0x103316,_0x4e2589=this[_0x5c35e1(0x3a5)](_0x20668e),_0x52209a=this['commandName'](_0x20668e),_0x584319=this[_0x5c35e1(0x38f)](_0x52209a)[_0x5c35e1(0x1f1)];this[_0x5c35e1(0x125)](this['isCommandEnabled'](_0x20668e));const _0x4b9cbf=this[_0x5c35e1(0x228)]();if(_0x4b9cbf===_0x5c35e1(0x175))this['drawTextEx'](_0x52209a,_0x4e2589['x']+_0x4e2589[_0x5c35e1(0x1f1)]-_0x584319,_0x4e2589['y'],_0x584319);else{if(_0x4b9cbf===_0x5c35e1(0x1b5)){const _0x557ec8=_0x4e2589['x']+Math['floor']((_0x4e2589['width']-_0x584319)/0x2);this[_0x5c35e1(0xbf)](_0x52209a,_0x557ec8,_0x4e2589['y'],_0x584319);}else this[_0x5c35e1(0xbf)](_0x52209a,_0x4e2589['x'],_0x4e2589['y'],_0x584319);}},Window_SkillType[_0x103316(0x21b)]['drawItemStyleIcon']=function(_0x5026a5){const _0x4889fd=_0x103316;this[_0x4889fd(0x39f)](_0x5026a5)[_0x4889fd(0x2ca)](/\\I\[(\d+)\]/i);const _0x51af6b=Number(RegExp['$1'])||0x0,_0x9fbccc=this[_0x4889fd(0x3a5)](_0x5026a5),_0x2afa35=_0x9fbccc['x']+Math[_0x4889fd(0xce)]((_0x9fbccc[_0x4889fd(0x1f1)]-ImageManager[_0x4889fd(0x229)])/0x2),_0xcdc614=_0x9fbccc['y']+(_0x9fbccc[_0x4889fd(0x270)]-ImageManager['iconHeight'])/0x2;this[_0x4889fd(0x1a7)](_0x51af6b,_0x2afa35,_0xcdc614);},VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh']=Window_SkillStatus[_0x103316(0x21b)]['refresh'],Window_SkillStatus['prototype'][_0x103316(0x2e8)]=function(){const _0x4f9b9b=_0x103316;VisuMZ[_0x4f9b9b(0x21e)][_0x4f9b9b(0x1da)][_0x4f9b9b(0x1f3)](this);if(this[_0x4f9b9b(0x1ab)])this[_0x4f9b9b(0x12d)]();},Window_SkillStatus[_0x103316(0x21b)][_0x103316(0x12d)]=function(){const _0x420c0e=_0x103316;if(!Imported[_0x420c0e(0x174)])return;if(!Imported[_0x420c0e(0x2c2)])return;const _0x40e3e5=this[_0x420c0e(0x194)]();let _0x4ca7d4=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x136234=this['innerWidth']-_0x4ca7d4-0x2;if(_0x136234>=0x12c){const _0x2b1615=VisuMZ[_0x420c0e(0x33f)][_0x420c0e(0x30c)][_0x420c0e(0x349)][_0x420c0e(0x2ac)],_0x557c61=Math[_0x420c0e(0xce)](_0x136234/0x2)-0x18;let _0x282cd3=_0x4ca7d4,_0x50ba8f=Math[_0x420c0e(0xce)]((this[_0x420c0e(0x281)]-Math[_0x420c0e(0x1cf)](_0x2b1615[_0x420c0e(0xd1)]/0x2)*_0x40e3e5)/0x2),_0x11954a=0x0;for(const _0x1fb302 of _0x2b1615){this[_0x420c0e(0x371)](_0x282cd3,_0x50ba8f,_0x557c61,_0x1fb302),_0x11954a++,_0x11954a%0x2===0x0?(_0x282cd3=_0x4ca7d4,_0x50ba8f+=_0x40e3e5):_0x282cd3+=_0x557c61+0x18;}}this[_0x420c0e(0x1ff)]();},Window_SkillStatus[_0x103316(0x21b)][_0x103316(0x371)]=function(_0x54c176,_0x5a9f40,_0x4e5458,_0x59afec){const _0x3f01a0=_0x103316,_0x48600e=this[_0x3f01a0(0x194)]();this[_0x3f01a0(0x1ff)](),this[_0x3f01a0(0x372)](_0x54c176,_0x5a9f40,_0x4e5458,_0x59afec,!![]),this['resetTextColor'](),this[_0x3f01a0(0x2c0)][_0x3f01a0(0x1b6)]-=0x8;const _0xb2ae1c=this[_0x3f01a0(0x1ab)][_0x3f01a0(0x305)](_0x59afec,!![]);this[_0x3f01a0(0x2c0)][_0x3f01a0(0xfe)](_0xb2ae1c,_0x54c176,_0x5a9f40,_0x4e5458,_0x48600e,'right');},VisuMZ[_0x103316(0x21e)][_0x103316(0x1f6)]=Window_SkillList[_0x103316(0x21b)][_0x103316(0x1f5)],Window_SkillList[_0x103316(0x21b)][_0x103316(0x1f5)]=function(_0x134eed){const _0x2d1993=_0x103316;if(this[_0x2d1993(0x319)]<=0x0)return![];return this[_0x2d1993(0x356)](_0x134eed);},VisuMZ[_0x103316(0x21e)]['Window_SkillList_maxCols']=Window_SkillList['prototype'][_0x103316(0x227)],Window_SkillList['prototype'][_0x103316(0x227)]=function(){const _0x2095bb=_0x103316;return SceneManager[_0x2095bb(0xdc)][_0x2095bb(0x22c)]===Scene_Battle?VisuMZ[_0x2095bb(0x21e)][_0x2095bb(0xb7)][_0x2095bb(0x1f3)](this):VisuMZ[_0x2095bb(0x21e)][_0x2095bb(0x30c)][_0x2095bb(0x12c)]['ListWindowCols'];},VisuMZ[_0x103316(0x21e)][_0x103316(0x345)]=Window_SkillList['prototype']['setActor'],Window_SkillList[_0x103316(0x21b)]['setActor']=function(_0x3ca3e2){const _0x3ca550=_0x103316,_0x34149e=this[_0x3ca550(0x1ab)]!==_0x3ca3e2;VisuMZ[_0x3ca550(0x21e)][_0x3ca550(0x345)][_0x3ca550(0x1f3)](this,_0x3ca3e2),_0x34149e&&(this[_0x3ca550(0x328)]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x3ca550(0x328)]['setItem'](this[_0x3ca550(0x13e)](0x0)));},Window_SkillList[_0x103316(0x21b)]['setStypeId']=function(_0x16debe){const _0x45b003=_0x103316;if(this[_0x45b003(0x319)]===_0x16debe)return;if(!_0x16debe)return;this['_stypeId']=_0x16debe,this[_0x45b003(0x2e8)](),this[_0x45b003(0x1bd)](0x0,0x0),this[_0x45b003(0x328)]&&this['_statusWindow'][_0x45b003(0x22c)]===Window_ShopStatus&&this[_0x45b003(0x328)]['setItem'](this['itemAt'](0x0));},Window_SkillList[_0x103316(0x21b)][_0x103316(0x356)]=function(_0x3ff68f){const _0x2d69df=_0x103316;if(!_0x3ff68f)return VisuMZ[_0x2d69df(0x21e)][_0x2d69df(0x1f6)][_0x2d69df(0x1f3)](this,_0x3ff68f);if(!this[_0x2d69df(0x357)](_0x3ff68f))return![];if(!this[_0x2d69df(0x21d)](_0x3ff68f))return![];if(!this[_0x2d69df(0x164)](_0x3ff68f))return![];return!![];},Window_SkillList[_0x103316(0x21b)][_0x103316(0x357)]=function(_0x4c2058){const _0x50692c=_0x103316;return DataManager['getSkillTypes'](_0x4c2058)[_0x50692c(0x1f5)](this[_0x50692c(0x319)]);},Window_SkillList['prototype'][_0x103316(0x21d)]=function(_0x1e6f8e){const _0x285e3e=_0x103316;if(!VisuMZ['SkillsStatesCore'][_0x285e3e(0x2f7)](this[_0x285e3e(0x1ab)],_0x1e6f8e))return![];if(!VisuMZ['SkillsStatesCore']['CheckVisibleSwitchNotetags'](this['_actor'],_0x1e6f8e))return![];if(!VisuMZ[_0x285e3e(0x21e)][_0x285e3e(0xec)](this['_actor'],_0x1e6f8e))return![];return!![];},VisuMZ[_0x103316(0x21e)][_0x103316(0x2f7)]=function(_0x54855b,_0x565657){const _0x3be1bd=_0x103316,_0x1899a9=_0x565657[_0x3be1bd(0x2eb)];if(_0x1899a9[_0x3be1bd(0x2ca)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x3be1bd(0x157)]())return![];else return _0x1899a9[_0x3be1bd(0x2ca)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x3be1bd(0x157)]()?![]:!![];},VisuMZ[_0x103316(0x21e)]['CheckVisibleSwitchNotetags']=function(_0x42ce65,_0x595392){const _0x63b07e=_0x103316,_0x18b027=_0x595392['note'];if(_0x18b027[_0x63b07e(0x2ca)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x125d0d=JSON[_0x63b07e(0xaf)]('['+RegExp['$1'][_0x63b07e(0x2ca)](/\d+/g)+']');for(const _0x87099 of _0x125d0d){if(!$gameSwitches[_0x63b07e(0x3a8)](_0x87099))return![];}return!![];}if(_0x18b027[_0x63b07e(0x2ca)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45717f=JSON['parse']('['+RegExp['$1'][_0x63b07e(0x2ca)](/\d+/g)+']');for(const _0x510ad5 of _0x45717f){if(!$gameSwitches[_0x63b07e(0x3a8)](_0x510ad5))return![];}return!![];}if(_0x18b027['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b0a06=JSON[_0x63b07e(0xaf)]('['+RegExp['$1'][_0x63b07e(0x2ca)](/\d+/g)+']');for(const _0x4b7d13 of _0x4b0a06){if($gameSwitches[_0x63b07e(0x3a8)](_0x4b7d13))return!![];}return![];}if(_0x18b027[_0x63b07e(0x2ca)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x129299=JSON[_0x63b07e(0xaf)]('['+RegExp['$1'][_0x63b07e(0x2ca)](/\d+/g)+']');for(const _0x5440fb of _0x129299){if(!$gameSwitches[_0x63b07e(0x3a8)](_0x5440fb))return!![];}return![];}if(_0x18b027[_0x63b07e(0x2ca)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a03ce=JSON[_0x63b07e(0xaf)]('['+RegExp['$1'][_0x63b07e(0x2ca)](/\d+/g)+']');for(const _0x1615d4 of _0x1a03ce){if(!$gameSwitches[_0x63b07e(0x3a8)](_0x1615d4))return!![];}return![];}if(_0x18b027['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf832e2=JSON[_0x63b07e(0xaf)]('['+RegExp['$1'][_0x63b07e(0x2ca)](/\d+/g)+']');for(const _0x4750f0 of _0xf832e2){if($gameSwitches[_0x63b07e(0x3a8)](_0x4750f0))return![];}return!![];}return!![];},VisuMZ[_0x103316(0x21e)][_0x103316(0xec)]=function(_0x2e5984,_0x1023b7){const _0x158c42=_0x103316,_0x54879f=_0x1023b7[_0x158c42(0x2eb)];if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x15d058=JSON[_0x158c42(0xaf)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x581058 of _0x15d058){if(!_0x2e5984[_0x158c42(0x32b)](_0x581058))return![];}return!![];}else{if(_0x54879f['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3eca4b=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x46a10f of _0x3eca4b){const _0x3574cb=DataManager[_0x158c42(0x122)](_0x46a10f);if(!_0x3574cb)continue;if(!_0x2e5984[_0x158c42(0x32b)](_0x3574cb))return![];}return!![];}}if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x40beaa=JSON['parse']('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x4f6fe6 of _0x40beaa){if(!_0x2e5984[_0x158c42(0x32b)](_0x4f6fe6))return![];}return!![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2fed58=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x153303 of _0x2fed58){const _0x343e26=DataManager[_0x158c42(0x122)](_0x153303);if(!_0x343e26)continue;if(!_0x2e5984[_0x158c42(0x32b)](_0x343e26))return![];}return!![];}}if(_0x54879f['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xee41de=JSON[_0x158c42(0xaf)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2b94a5 of _0xee41de){if(_0x2e5984[_0x158c42(0x32b)](_0x2b94a5))return!![];}return![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2614db=RegExp['$1']['split'](',');for(const _0x46b448 of _0x2614db){const _0x25e3ef=DataManager[_0x158c42(0x122)](_0x46b448);if(!_0x25e3ef)continue;if(_0x2e5984[_0x158c42(0x32b)](_0x25e3ef))return!![];}return![];}}if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d0628=JSON['parse']('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x1b5cad of _0x4d0628){if(!_0x2e5984['isLearnedSkill'](_0x1b5cad))return!![];}return![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x193ee9=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x5398f1 of _0x193ee9){const _0x4ae8c2=DataManager[_0x158c42(0x122)](_0x5398f1);if(!_0x4ae8c2)continue;if(!_0x2e5984[_0x158c42(0x32b)](_0x4ae8c2))return!![];}return![];}}if(_0x54879f['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3af546=JSON[_0x158c42(0xaf)]('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x5c7b0e of _0x3af546){if(!_0x2e5984['isLearnedSkill'](_0x5c7b0e))return!![];}return![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x16fe5d=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x215f72 of _0x16fe5d){const _0xe860f=DataManager[_0x158c42(0x122)](_0x215f72);if(!_0xe860f)continue;if(!_0x2e5984[_0x158c42(0x32b)](_0xe860f))return!![];}return![];}}if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x14c6b1=JSON[_0x158c42(0xaf)]('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x361f0e of _0x14c6b1){if(_0x2e5984[_0x158c42(0x32b)](_0x361f0e))return![];}return!![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5d99a1=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x4e2d15 of _0x5d99a1){const _0x3021dc=DataManager[_0x158c42(0x122)](_0x4e2d15);if(!_0x3021dc)continue;if(_0x2e5984[_0x158c42(0x32b)](_0x3021dc))return![];}return!![];}}if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d131b=JSON['parse']('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x392afa of _0x5d131b){if(!_0x2e5984[_0x158c42(0x274)](_0x392afa))return![];}return!![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x37e74d=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x41526f of _0x37e74d){const _0x32fd29=DataManager[_0x158c42(0x122)](_0x41526f);if(!_0x32fd29)continue;if(!_0x2e5984[_0x158c42(0x274)](_0x32fd29))return![];}return!![];}}if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd9d551=JSON['parse']('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x1fdc2d of _0xd9d551){if(!_0x2e5984[_0x158c42(0x274)](_0x1fdc2d))return![];}return!![];}else{if(_0x54879f['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x59b7d3=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x196a16 of _0x59b7d3){const _0x4dce79=DataManager[_0x158c42(0x122)](_0x196a16);if(!_0x4dce79)continue;if(!_0x2e5984[_0x158c42(0x274)](_0x4dce79))return![];}return!![];}}if(_0x54879f[_0x158c42(0x2ca)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29890d=JSON[_0x158c42(0xaf)]('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x1e91af of _0x29890d){if(_0x2e5984[_0x158c42(0x274)](_0x1e91af))return!![];}return![];}else{if(_0x54879f['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3bab27=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x2b4349 of _0x3bab27){const _0x1ec139=DataManager['getSkillIdWithName'](_0x2b4349);if(!_0x1ec139)continue;if(_0x2e5984[_0x158c42(0x274)](_0x1ec139))return!![];}return![];}}if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d34d8=JSON[_0x158c42(0xaf)]('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x43308a of _0x4d34d8){if(!_0x2e5984[_0x158c42(0x274)](_0x43308a))return!![];}return![];}else{if(_0x54879f['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5a6cbe=RegExp['$1']['split'](',');for(const _0x1a03f6 of _0x5a6cbe){const _0x247d7b=DataManager[_0x158c42(0x122)](_0x1a03f6);if(!_0x247d7b)continue;if(!_0x2e5984[_0x158c42(0x274)](_0x247d7b))return!![];}return![];}}if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5588ba=JSON[_0x158c42(0xaf)]('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x3552e5 of _0x5588ba){if(!_0x2e5984[_0x158c42(0x274)](_0x3552e5))return!![];}return![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x297ef0=RegExp['$1']['split'](',');for(const _0x3dec19 of _0x297ef0){const _0x2b54ad=DataManager[_0x158c42(0x122)](_0x3dec19);if(!_0x2b54ad)continue;if(!_0x2e5984[_0x158c42(0x274)](_0x2b54ad))return!![];}return![];}}if(_0x54879f['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16161b=JSON[_0x158c42(0xaf)]('['+RegExp['$1'][_0x158c42(0x2ca)](/\d+/g)+']');for(const _0x21f6f1 of _0x16161b){if(_0x2e5984[_0x158c42(0x274)](_0x21f6f1))return![];}return!![];}else{if(_0x54879f[_0x158c42(0x2ca)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x181e3e=RegExp['$1'][_0x158c42(0x1bc)](',');for(const _0x5c76ca of _0x181e3e){const _0x593fc6=DataManager[_0x158c42(0x122)](_0x5c76ca);if(!_0x593fc6)continue;if(_0x2e5984['hasSkill'](_0x593fc6))return![];}return!![];}}return!![];},Window_SkillList[_0x103316(0x21b)][_0x103316(0x164)]=function(_0x10f984){const _0x36a5b1=_0x103316,_0x55433b=_0x10f984[_0x36a5b1(0x2eb)],_0x5d8870=VisuMZ[_0x36a5b1(0x21e)][_0x36a5b1(0x37e)];return _0x5d8870[_0x10f984['id']]?_0x5d8870[_0x10f984['id']][_0x36a5b1(0x1f3)](this,_0x10f984):!![];},VisuMZ[_0x103316(0x21e)][_0x103316(0x187)]=Window_SkillList[_0x103316(0x21b)]['makeItemList'],Window_SkillList['prototype'][_0x103316(0x1b1)]=function(){const _0x192e61=_0x103316;VisuMZ['SkillsStatesCore'][_0x192e61(0x187)][_0x192e61(0x1f3)](this),this[_0x192e61(0x1ef)]()&&this[_0x192e61(0x2f1)](),this[_0x192e61(0x340)]()&&this['changeSkillsThroughStateEffects']();},Window_SkillList[_0x103316(0x21b)]['canSortSkillTypeList']=function(){return!![];},Window_SkillList[_0x103316(0x21b)][_0x103316(0x2f1)]=function(){const _0x1ca68d=_0x103316,_0x4f562d=VisuMZ[_0x1ca68d(0x21e)]['Settings']['Skills'][_0x1ca68d(0x1c6)]||[];return _0x4f562d&&_0x4f562d[_0x1ca68d(0x1f5)](this[_0x1ca68d(0x319)])?this[_0x1ca68d(0x383)][_0x1ca68d(0x382)]((_0x4d2396,_0x5c36ea)=>{const _0x6f2cbc=_0x1ca68d;if(!!_0x4d2396&&!!_0x5c36ea)return _0x4d2396[_0x6f2cbc(0x268)]['localeCompare'](_0x5c36ea[_0x6f2cbc(0x268)]);return 0x0;}):VisuMZ['SkillsStatesCore'][_0x1ca68d(0x299)](this['_data']),this[_0x1ca68d(0x383)];},VisuMZ[_0x103316(0x21e)][_0x103316(0x299)]=function(_0x399679){return _0x399679['sort']((_0x34b1fb,_0x3a6bc9)=>{const _0x6dc722=_0x445b;if(!!_0x34b1fb&&!!_0x3a6bc9){if(_0x34b1fb[_0x6dc722(0x301)]===undefined)VisuMZ[_0x6dc722(0x21e)][_0x6dc722(0x327)](_0x34b1fb);if(_0x3a6bc9[_0x6dc722(0x301)]===undefined)VisuMZ[_0x6dc722(0x21e)][_0x6dc722(0x327)](_0x3a6bc9);const _0x3c52a3=_0x34b1fb['sortPriority'],_0xf05bfb=_0x3a6bc9['sortPriority'];if(_0x3c52a3!==_0xf05bfb)return _0xf05bfb-_0x3c52a3;return _0x34b1fb['id']-_0x3a6bc9['id'];}return 0x0;}),_0x399679;},VisuMZ[_0x103316(0x21e)][_0x103316(0x224)]=function(_0x323238){const _0x4e8ab6=_0x103316;return _0x323238[_0x4e8ab6(0x382)]((_0x5f1fd5,_0x18051c)=>{const _0x5f0019=_0x4e8ab6,_0x5ed94b=$dataSkills[_0x5f1fd5],_0xb4fe00=$dataSkills[_0x18051c];if(!!_0x5ed94b&&!!_0xb4fe00){if(_0x5ed94b[_0x5f0019(0x301)]===undefined)VisuMZ[_0x5f0019(0x21e)][_0x5f0019(0x327)](_0x5ed94b);if(_0xb4fe00[_0x5f0019(0x301)]===undefined)VisuMZ[_0x5f0019(0x21e)][_0x5f0019(0x327)](_0xb4fe00);const _0x3cb1a6=_0x5ed94b[_0x5f0019(0x301)],_0x44c744=_0xb4fe00['sortPriority'];if(_0x3cb1a6!==_0x44c744)return _0x44c744-_0x3cb1a6;return _0x5f1fd5-_0x18051c;}return 0x0;}),_0x323238;},Window_SkillList['prototype'][_0x103316(0x340)]=function(){const _0x4484d2=_0x103316;if(!this[_0x4484d2(0x1ab)])return![];if([_0x4484d2(0x2a6),_0x4484d2(0x158),_0x4484d2(0x27a)][_0x4484d2(0x1f5)](this[_0x4484d2(0x319)]))return![];return!![];},Window_SkillList[_0x103316(0x21b)][_0x103316(0x14d)]=function(){const _0x5ade88=_0x103316,_0x4a3725=this[_0x5ade88(0x1ab)][_0x5ade88(0x32a)]();for(const _0x1852f7 of _0x4a3725){const _0x24404f=DataManager[_0x5ade88(0x36a)](_0x1852f7);for(const _0x3be957 in _0x24404f){const _0x19692c=$dataSkills[Number(_0x3be957)]||null,_0x56e907=$dataSkills[Number(_0x24404f[_0x3be957])]||null;while(this['_data'][_0x5ade88(0x1f5)](_0x19692c)){const _0x4af668=this[_0x5ade88(0x383)]['indexOf'](_0x19692c);this['_data'][_0x4af668]=_0x56e907;}}}},VisuMZ[_0x103316(0x21e)][_0x103316(0x28b)]=Window_SkillList[_0x103316(0x21b)][_0x103316(0x23c)],Window_SkillList[_0x103316(0x21b)][_0x103316(0x23c)]=function(_0x288d05){const _0x46bf6e=_0x103316,_0x36cd4f=this[_0x46bf6e(0x13e)](_0x288d05),_0x41f1cf=_0x36cd4f?_0x36cd4f['name']:'';if(_0x36cd4f)this[_0x46bf6e(0x16f)](_0x36cd4f);DataManager[_0x46bf6e(0x320)](_0x36cd4f)&&this[_0x46bf6e(0x1ab)]&&this['_actor'][_0x46bf6e(0x199)](_0x36cd4f)&&(this[_0x46bf6e(0x193)]=!![]);VisuMZ[_0x46bf6e(0x21e)][_0x46bf6e(0x28b)]['call'](this,_0x288d05),this[_0x46bf6e(0x193)]=undefined;if(_0x36cd4f)_0x36cd4f['name']=_0x41f1cf;},Window_SkillList[_0x103316(0x21b)][_0x103316(0x16f)]=function(_0x4e5b1a){const _0x541e1d=_0x103316;if(_0x4e5b1a&&_0x4e5b1a[_0x541e1d(0x2eb)][_0x541e1d(0x2ca)](/<LIST NAME:[ ](.*)>/i)){_0x4e5b1a[_0x541e1d(0x268)]=String(RegExp['$1'])['trim']();for(;;){if(_0x4e5b1a[_0x541e1d(0x268)]['match'](/\\V\[(\d+)\]/gi))_0x4e5b1a[_0x541e1d(0x268)]=_0x4e5b1a[_0x541e1d(0x268)][_0x541e1d(0x39d)](/\\V\[(\d+)\]/gi,(_0x5cb0db,_0x145137)=>$gameVariables[_0x541e1d(0x3a8)](parseInt(_0x145137)));else break;}}},Window_SkillList['prototype']['drawSkillCost']=function(_0x5826c1,_0x239566,_0x164559,_0x3cebd4){const _0x564750=_0x103316;Window_Base['prototype'][_0x564750(0xc5)]['call'](this,this['_actor'],_0x5826c1,_0x239566,_0x164559,_0x3cebd4);},Window_SkillList['prototype'][_0x103316(0x148)]=function(_0x2ac6a6){const _0x393762=_0x103316;this[_0x393762(0x328)]=_0x2ac6a6,this[_0x393762(0x1bf)]();},VisuMZ[_0x103316(0x21e)][_0x103316(0xf3)]=Window_SkillList['prototype'][_0x103316(0x36f)],Window_SkillList[_0x103316(0x21b)]['updateHelp']=function(){const _0x2a8f26=_0x103316;VisuMZ[_0x2a8f26(0x21e)][_0x2a8f26(0xf3)]['call'](this),this[_0x2a8f26(0x328)]&&this[_0x2a8f26(0x328)][_0x2a8f26(0x22c)]===Window_ShopStatus&&this['_statusWindow'][_0x2a8f26(0x2a8)](this[_0x2a8f26(0xe2)]());};