//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 * 
 * <AP Plus: +x%>
 * <AP Plus: -x%>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 * - AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * 
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 * - AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * <AP Flat: +x%>
 * <AP Flat: -x%>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 * - AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * 
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Plus: +x%>
 * <SP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 * - SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 * - SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <SP Flat: +x%>
 * <SP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 * - SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * </Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   Separate Skill Type?:
 *   - Separate learnable skills by skill type?
 * 
 *   Hide Learned Skills
 *   - Hide skills after they are learned?
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * 
 *   Separation:
 * 
 *     Indent Skills:
 *     - When separated, indent skills by this many pixels.
 * 
 *     Category Format:
 *     - Skill type category name format
 *     - %1 - Name
 * 
 *     Collapse Format:
 *     - Format for command to collapse skill type.
 *     - %1 - Name
 * 
 *     Expand Format:
 *     - Format for command to expand skill type.
 *     - %1 - Name
 * 
 *     Font Color:
 *     - When separated, indent skills by this many pixels.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.17: June 12, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new line for <AP Rate: x%>
 * *** AP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * ** Added new line for <SP Rate: x%>
 * *** SP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <AP Plus: +x%>
 * *** <AP Plus: -x%>
 * *** <AP Flat: +x%>
 * *** <AP Flat: -x%>
 * *** <SP Plus: +x%>
 * *** <SP Plus: -x%>
 * *** <SP Flat: +x%>
 * *** <SP Flat: -x%>
 * **** These are the additive versions of <AP Rate: x%> and <SP Rate: x%>
 * **** See help file for more information.
 * 
 * Version 1.16: January 16, 2025
 * * Bug Fixes!
 * ** Fixed a compatibility bug that would cause the last skill of a list to be
 *    removed from learning. Fix made by Irina.
 * 
 * Version 1.15: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Skills and States Core features!
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Added new Plugin Parameter by Irina:
 * *** Parameters > General Settings > Hide Learned Skills
 * **** Hide skills after they are learned?
 * 
 * Version 1.14: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where skill ID's could clash with state ID's from Equip
 *    Passive System and preventing states from being learned. Fixed by Irina.
 * 
 * Version 1.13: March 14, 2024
 * * Compatibility Update!
 * ** Fixed a problem where the learn passive notetags from the Equip Passive
 *    System plugin could be blocked by other plugins. Fix made by Irina.
 * 
 * Version 1.12: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.11: May 18, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a visual listing bug effect when 'CP' and 'JP' are listed under
 *    costs but the VisuMZ Class Change System plugin isn't present. Fix made
 *    by Olivia.
 * 
 * Version 1.09: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: March 24, 2022
 * * Documentation Update!
 * ** Fixed a typo for missing a "/" in the <Learn Skills> group notetag.
 * 
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param SeparateByStypeID:eval
 * @text Separate Skill Type?
 * @parent Visual
 * @type boolean
 * @on Separate
 * @off Don't
 * @desc Separate learnable skills by skill type?
 * @default false
 *
 * @param HideLearned:eval
 * @text Hide Learned Skills
 * @parent Visual
 * @type boolean
 * @on Hide
 * @off Show
 * @desc Hide skills after they are learned?
 * @default false
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 * @param Separation
 * @parent Vocabulary
 *
 * @param SeparateIndent:num
 * @text Indent Skills
 * @parent Separation
 * @desc When separated, indent skills by this many pixels.
 * @default 16
 *
 * @param SeparateCategoryFmt:str
 * @text Category Format
 * @parent Separation
 * @desc Skill type category name format
 * %1 - Name
 * @default %1
 *
 * @param SeparateCollapseFmt:str
 * @text Collapse Format
 * @parent Separation
 * @desc Format for command to collapse skill type.
 * %1 - Name
 * @default %1 [-]
 *
 * @param SeparateExpandFmt:str
 * @text Expand Format
 * @parent Separation
 * @desc Format for command to expand skill type.
 * %1 - Name
 * @default %1 [+]
 *
 * @param StypeCategoryColor:str
 * @text Font Color
 * @parent Separation
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

function _0x4c22(_0x154d44,_0x1c4aef){const _0x3e0cda=_0x3e0c();return _0x4c22=function(_0x4c2210,_0x4c0c30){_0x4c2210=_0x4c2210-0x166;let _0x2319fd=_0x3e0cda[_0x4c2210];return _0x2319fd;},_0x4c22(_0x154d44,_0x1c4aef);}const _0x4f089c=_0x4c22;(function(_0x42e834,_0x29341c){const _0x3ef83d=_0x4c22,_0xb75a86=_0x42e834();while(!![]){try{const _0x51a9d1=-parseInt(_0x3ef83d(0x1ef))/0x1*(parseInt(_0x3ef83d(0x209))/0x2)+-parseInt(_0x3ef83d(0x345))/0x3*(parseInt(_0x3ef83d(0x20b))/0x4)+-parseInt(_0x3ef83d(0x211))/0x5*(-parseInt(_0x3ef83d(0x274))/0x6)+-parseInt(_0x3ef83d(0x1c6))/0x7*(-parseInt(_0x3ef83d(0x37c))/0x8)+-parseInt(_0x3ef83d(0x252))/0x9+-parseInt(_0x3ef83d(0x171))/0xa+parseInt(_0x3ef83d(0x2ff))/0xb*(parseInt(_0x3ef83d(0x369))/0xc);if(_0x51a9d1===_0x29341c)break;else _0xb75a86['push'](_0xb75a86['shift']());}catch(_0x481577){_0xb75a86['push'](_0xb75a86['shift']());}}}(_0x3e0c,0x6eda9));var label=_0x4f089c(0x20a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4f089c(0x1b1)](function(_0x5f17e9){const _0x211bf2=_0x4f089c;return _0x5f17e9[_0x211bf2(0x17a)]&&_0x5f17e9[_0x211bf2(0x2b8)][_0x211bf2(0x1de)]('['+label+']');})[0x0];VisuMZ[label][_0x4f089c(0x188)]=VisuMZ[label][_0x4f089c(0x188)]||{},VisuMZ['ConvertParams']=function(_0x20d6db,_0x1ce3f5){const _0x250b47=_0x4f089c;for(const _0x394fb6 in _0x1ce3f5){if(_0x394fb6['match'](/(.*):(.*)/i)){const _0x35f4bc=String(RegExp['$1']),_0x57815e=String(RegExp['$2'])[_0x250b47(0x354)]()[_0x250b47(0x23f)]();let _0x117b6a,_0x27f019,_0x55a003;switch(_0x57815e){case _0x250b47(0x25f):_0x117b6a=_0x1ce3f5[_0x394fb6]!==''?Number(_0x1ce3f5[_0x394fb6]):0x0;break;case'ARRAYNUM':_0x27f019=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):[],_0x117b6a=_0x27f019[_0x250b47(0x1cc)](_0x20ac93=>Number(_0x20ac93));break;case _0x250b47(0x1fb):_0x117b6a=_0x1ce3f5[_0x394fb6]!==''?eval(_0x1ce3f5[_0x394fb6]):null;break;case'ARRAYEVAL':_0x27f019=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):[],_0x117b6a=_0x27f019[_0x250b47(0x1cc)](_0x1afb76=>eval(_0x1afb76));break;case _0x250b47(0x305):_0x117b6a=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):'';break;case'ARRAYJSON':_0x27f019=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):[],_0x117b6a=_0x27f019[_0x250b47(0x1cc)](_0x47afff=>JSON[_0x250b47(0x1be)](_0x47afff));break;case _0x250b47(0x314):_0x117b6a=_0x1ce3f5[_0x394fb6]!==''?new Function(JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6])):new Function(_0x250b47(0x262));break;case'ARRAYFUNC':_0x27f019=_0x1ce3f5[_0x394fb6]!==''?JSON['parse'](_0x1ce3f5[_0x394fb6]):[],_0x117b6a=_0x27f019[_0x250b47(0x1cc)](_0x2a6131=>new Function(JSON[_0x250b47(0x1be)](_0x2a6131)));break;case _0x250b47(0x242):_0x117b6a=_0x1ce3f5[_0x394fb6]!==''?String(_0x1ce3f5[_0x394fb6]):'';break;case _0x250b47(0x29e):_0x27f019=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):[],_0x117b6a=_0x27f019[_0x250b47(0x1cc)](_0x2e1794=>String(_0x2e1794));break;case _0x250b47(0x338):_0x55a003=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):{},_0x117b6a=VisuMZ['ConvertParams']({},_0x55a003);break;case _0x250b47(0x350):_0x27f019=_0x1ce3f5[_0x394fb6]!==''?JSON[_0x250b47(0x1be)](_0x1ce3f5[_0x394fb6]):[],_0x117b6a=_0x27f019[_0x250b47(0x1cc)](_0x1e0efe=>VisuMZ[_0x250b47(0x285)]({},JSON[_0x250b47(0x1be)](_0x1e0efe)));break;default:continue;}_0x20d6db[_0x35f4bc]=_0x117b6a;}}return _0x20d6db;},(_0x53c3e0=>{const _0x207061=_0x4f089c,_0x42cd75=_0x53c3e0[_0x207061(0x1ae)];for(const _0x215b02 of dependencies){if(!Imported[_0x215b02]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x207061(0x253)](_0x42cd75,_0x215b02)),SceneManager[_0x207061(0x371)]();break;}}const _0x597463=_0x53c3e0['description'];if(_0x597463[_0x207061(0x2e7)](/\[Version[ ](.*?)\]/i)){const _0xddff50=Number(RegExp['$1']);_0xddff50!==VisuMZ[label][_0x207061(0x19e)]&&(alert(_0x207061(0x280)[_0x207061(0x253)](_0x42cd75,_0xddff50)),SceneManager[_0x207061(0x371)]());}if(_0x597463['match'](/\[Tier[ ](\d+)\]/i)){const _0x204114=Number(RegExp['$1']);_0x204114<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x207061(0x253)](_0x42cd75,_0x204114,tier)),SceneManager[_0x207061(0x371)]()):tier=Math[_0x207061(0x1b4)](_0x204114,tier);}VisuMZ[_0x207061(0x285)](VisuMZ[label]['Settings'],_0x53c3e0['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4f089c(0x1ae)],_0x4f089c(0x246),_0x3917b2=>{const _0x28be96=_0x4f089c;VisuMZ[_0x28be96(0x285)](_0x3917b2,_0x3917b2);const _0x3f96c0=_0x3917b2[_0x28be96(0x380)][_0x28be96(0x1cc)](_0xe2b625=>$gameActors['actor'](_0xe2b625)),_0x74bcb4=_0x3917b2[_0x28be96(0x331)],_0x2092ec=_0x3917b2['Points'];for(const _0x4cd36b of _0x3f96c0){if(!_0x4cd36b)continue;for(const _0x3e6881 of _0x74bcb4){_0x4cd36b[_0x28be96(0x243)](_0x2092ec,_0x3e6881);}}}),PluginManager['registerCommand'](pluginData[_0x4f089c(0x1ae)],'AbilityPointsAdd',_0x3f6105=>{const _0x25822d=_0x4f089c;VisuMZ[_0x25822d(0x285)](_0x3f6105,_0x3f6105);const _0x55a603=_0x3f6105[_0x25822d(0x380)]['map'](_0x1c9297=>$gameActors[_0x25822d(0x2ba)](_0x1c9297)),_0x29814e=_0x3f6105[_0x25822d(0x331)],_0x5910d0=_0x3f6105['Points'];for(const _0x1e9295 of _0x55a603){if(!_0x1e9295)continue;for(const _0x11e14e of _0x29814e){_0x1e9295[_0x25822d(0x1a3)](_0x5910d0,_0x11e14e);}}}),PluginManager[_0x4f089c(0x19d)](pluginData[_0x4f089c(0x1ae)],_0x4f089c(0x260),_0x15cc4d=>{const _0x363783=_0x4f089c;VisuMZ[_0x363783(0x285)](_0x15cc4d,_0x15cc4d);const _0x1f7927=_0x15cc4d[_0x363783(0x380)][_0x363783(0x1cc)](_0x5ddf8e=>$gameActors[_0x363783(0x2ba)](_0x5ddf8e)),_0xab4234=_0x15cc4d[_0x363783(0x331)],_0x50037c=_0x15cc4d[_0x363783(0x2cd)];for(const _0x5b86ee of _0x1f7927){if(!_0x5b86ee)continue;for(const _0x4605ce of _0xab4234){_0x5b86ee[_0x363783(0x230)](_0x50037c,_0x4605ce);}}}),PluginManager[_0x4f089c(0x19d)](pluginData[_0x4f089c(0x1ae)],'AbilityPointsSet',_0x153c95=>{const _0x2b7f8b=_0x4f089c;VisuMZ[_0x2b7f8b(0x285)](_0x153c95,_0x153c95);const _0x428d2a=_0x153c95[_0x2b7f8b(0x380)][_0x2b7f8b(0x1cc)](_0x446ec5=>$gameActors[_0x2b7f8b(0x2ba)](_0x446ec5)),_0xe5c1b0=_0x153c95[_0x2b7f8b(0x331)],_0x5c3950=_0x153c95[_0x2b7f8b(0x2cd)];for(const _0xac2724 of _0x428d2a){if(!_0xac2724)continue;for(const _0x2eab6e of _0xe5c1b0){_0xac2724['setAbilityPoints'](_0x5c3950,_0x2eab6e);}}}),PluginManager[_0x4f089c(0x19d)](pluginData['name'],_0x4f089c(0x1d8),_0x7a05d3=>{const _0x17528c=_0x4f089c;VisuMZ[_0x17528c(0x285)](_0x7a05d3,_0x7a05d3);const _0x55d28f=_0x7a05d3['Actors'][_0x17528c(0x1cc)](_0x2c3aa0=>$gameActors[_0x17528c(0x2ba)](_0x2c3aa0)),_0x4cf5d3=_0x7a05d3[_0x17528c(0x331)],_0x44b371=_0x7a05d3['Points'];for(const _0x221c9b of _0x55d28f){if(!_0x221c9b)continue;for(const _0x53d131 of _0x4cf5d3){_0x221c9b[_0x17528c(0x292)](_0x44b371,_0x53d131);}}}),PluginManager[_0x4f089c(0x19d)](pluginData['name'],'SkillPointsAdd',_0x35999b=>{const _0x31748f=_0x4f089c;VisuMZ[_0x31748f(0x285)](_0x35999b,_0x35999b);const _0x554297=_0x35999b[_0x31748f(0x380)][_0x31748f(0x1cc)](_0xef2729=>$gameActors[_0x31748f(0x2ba)](_0xef2729)),_0x10ef03=_0x35999b[_0x31748f(0x331)],_0x2ce3ae=_0x35999b[_0x31748f(0x2cd)];for(const _0x5ca6e3 of _0x554297){if(!_0x5ca6e3)continue;for(const _0x26295a of _0x10ef03){_0x5ca6e3[_0x31748f(0x25d)](_0x2ce3ae,_0x26295a);}}}),PluginManager['registerCommand'](pluginData[_0x4f089c(0x1ae)],_0x4f089c(0x2a1),_0x16074d=>{const _0x44e271=_0x4f089c;VisuMZ['ConvertParams'](_0x16074d,_0x16074d);const _0x225e44=_0x16074d[_0x44e271(0x380)][_0x44e271(0x1cc)](_0x4beee8=>$gameActors[_0x44e271(0x2ba)](_0x4beee8)),_0x3d48ac=_0x16074d[_0x44e271(0x331)],_0x115e92=_0x16074d['Points'];for(const _0x1f42d7 of _0x225e44){if(!_0x1f42d7)continue;for(const _0x2d571d of _0x3d48ac){_0x1f42d7['loseSkillPoints'](_0x115e92,_0x2d571d);}}}),PluginManager[_0x4f089c(0x19d)](pluginData['name'],'SkillPointsSet',_0xbfddc9=>{const _0x113ecc=_0x4f089c;VisuMZ['ConvertParams'](_0xbfddc9,_0xbfddc9);const _0x99d9b6=_0xbfddc9['Actors'][_0x113ecc(0x1cc)](_0xe3b943=>$gameActors[_0x113ecc(0x2ba)](_0xe3b943)),_0x296dc4=_0xbfddc9[_0x113ecc(0x331)],_0x477b6a=_0xbfddc9['Points'];for(const _0x5440e4 of _0x99d9b6){if(!_0x5440e4)continue;for(const _0x3e94f3 of _0x296dc4){_0x5440e4[_0x113ecc(0x20c)](_0x477b6a,_0x3e94f3);}}}),PluginManager[_0x4f089c(0x19d)](pluginData[_0x4f089c(0x1ae)],'SystemShowSkillLearnSystemMenu',_0x19a908=>{const _0x1fa4eb=_0x4f089c;VisuMZ[_0x1fa4eb(0x285)](_0x19a908,_0x19a908),$gameSystem['setSkillLearnSystemMenuAccess'](_0x19a908[_0x1fa4eb(0x2a3)]);}),VisuMZ[_0x4f089c(0x20a)]['RegExp']={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsPlus':/<(?:ABILITY POINTS|AP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'AbilityPointsFlat':/<(?:ABILITY POINTS|AP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsPlus':/<(?:SKILL POINTS|SP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'SkillPointsFlat':/<(?:SKILL POINTS|SP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'LearnSkillA':/<LEARN SKILL(?:|S):[ ](.*)>/gi,'LearnSkillB':/<LEARN SKILL(?:|S)>\s*([\s\S]*)\s*<\/LEARN SKILL(?:|S)>/i,'LearnSkillPassiveA':/<LEARN (?:SKILL |)PASSIVE(?:|S):[ ](.*)>/gi,'LearnSkillPassiveB':/<LEARN (?:SKILL |)PASSIVE(?:|S)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL |)PASSIVE(?:|S)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x2fc)]=Scene_Boot[_0x4f089c(0x2c6)][_0x4f089c(0x377)],Scene_Boot[_0x4f089c(0x2c6)]['onDatabaseLoaded']=function(){const _0x399be9=_0x4f089c;VisuMZ['SkillLearnSystem'][_0x399be9(0x2fc)][_0x399be9(0x21d)](this),this[_0x399be9(0x35a)]();},Scene_Boot[_0x4f089c(0x2c6)][_0x4f089c(0x35a)]=function(){const _0x2d1e44=_0x4f089c;if(VisuMZ[_0x2d1e44(0x1e8)])return;this[_0x2d1e44(0x2d6)]();},VisuMZ[_0x4f089c(0x20a)]['JS']={},Scene_Boot[_0x4f089c(0x2c6)][_0x4f089c(0x2d6)]=function(){const _0x4bd81c=_0x4f089c,_0x375b42=$dataActors[_0x4bd81c(0x348)]($dataSkills);for(const _0x55343f of _0x375b42){if(!_0x55343f)continue;VisuMZ[_0x4bd81c(0x20a)][_0x4bd81c(0x2bc)](_0x55343f);}},VisuMZ[_0x4f089c(0x20a)]['ParseSkillNotetags']=VisuMZ[_0x4f089c(0x215)],VisuMZ[_0x4f089c(0x215)]=function(_0x31ebc3){const _0x3d83e2=_0x4f089c;VisuMZ[_0x3d83e2(0x20a)][_0x3d83e2(0x215)]['call'](this,_0x31ebc3),VisuMZ['SkillLearnSystem'][_0x3d83e2(0x2bc)](_0x31ebc3);},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x2bc)]=function(_0x459b9d){const _0xc5be4=_0x4f089c,_0x40154b=VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x31d)];VisuMZ[_0xc5be4(0x20a)]['createCostJS'](_0x459b9d,_0xc5be4(0x2c7),_0x40154b['jsLearnApCost']),VisuMZ[_0xc5be4(0x20a)]['createCostJS'](_0x459b9d,'jsLearnCpCost',_0x40154b[_0xc5be4(0x1ab)]),VisuMZ[_0xc5be4(0x20a)]['createCostJS'](_0x459b9d,_0xc5be4(0x2ae),_0x40154b[_0xc5be4(0x2ae)]),VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x1e7)](_0x459b9d,'jsLearnSpCost',_0x40154b[_0xc5be4(0x1a1)]),VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x2d7)](_0x459b9d,'jsLearnShow',_0x40154b['jsLearnShow']),VisuMZ[_0xc5be4(0x20a)]['createConditionJS'](_0x459b9d,'jsLearnReq',_0x40154b['jsLearnReq']),VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x2d0)](_0x459b9d,_0xc5be4(0x2e4),_0x40154b['jsLearnShowListTxt']),VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x2d0)](_0x459b9d,_0xc5be4(0x27e),_0x40154b[_0xc5be4(0x27e)]),VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x2d0)](_0x459b9d,_0xc5be4(0x306),_0x40154b[_0xc5be4(0x306)]),VisuMZ[_0xc5be4(0x20a)][_0xc5be4(0x2d0)](_0x459b9d,_0xc5be4(0x2fa),_0x40154b[_0xc5be4(0x2fa)]),VisuMZ[_0xc5be4(0x20a)]['createActionJS'](_0x459b9d,'jsOnLearn',_0x40154b[_0xc5be4(0x318)]);},VisuMZ['SkillLearnSystem'][_0x4f089c(0x1e7)]=function(_0x271e94,_0x18ceec,_0x42fc5a){const _0x3f392f=_0x4f089c,_0x31185f=_0x271e94[_0x3f392f(0x1ec)];if(_0x31185f['match'](_0x42fc5a)){const _0x121b2c=String(RegExp['$1']),_0x479085=_0x3f392f(0x2f1)[_0x3f392f(0x253)](_0x121b2c),_0x4bb383=VisuMZ[_0x3f392f(0x20a)]['createKeyJS'](_0x271e94,_0x18ceec);VisuMZ[_0x3f392f(0x20a)]['JS'][_0x4bb383]=new Function(_0x479085);}},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x2d7)]=function(_0x578dad,_0x305e05,_0x58ad9a){const _0xe8b3ed=_0x4f089c,_0x4688e0=_0x578dad[_0xe8b3ed(0x1ec)];if(_0x4688e0[_0xe8b3ed(0x2e7)](_0x58ad9a)){const _0x1caedc=String(RegExp['$1']),_0xf8a359=_0xe8b3ed(0x239)[_0xe8b3ed(0x253)](_0x1caedc),_0x4a7c4b=VisuMZ[_0xe8b3ed(0x20a)][_0xe8b3ed(0x382)](_0x578dad,_0x305e05);VisuMZ[_0xe8b3ed(0x20a)]['JS'][_0x4a7c4b]=new Function(_0xf8a359);}},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x2a4)]=function(_0x56e827,_0xe86a93,_0x65c10e){const _0x26fe7a=_0x4f089c,_0x10a374=_0x56e827[_0x26fe7a(0x1ec)];if(_0x10a374[_0x26fe7a(0x2e7)](_0x65c10e)){const _0x525b49=String(RegExp['$1']),_0x5e8c71=_0x26fe7a(0x373)[_0x26fe7a(0x253)](_0x525b49),_0x44dc86=VisuMZ[_0x26fe7a(0x20a)][_0x26fe7a(0x382)](_0x56e827,_0xe86a93);VisuMZ[_0x26fe7a(0x20a)]['JS'][_0x44dc86]=new Function(_0x5e8c71);}},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x2d0)]=function(_0x24e3c2,_0x1022d3,_0x24861c){const _0x21d7a2=_0x4f089c,_0x3054b1=_0x24e3c2['note'];if(_0x3054b1[_0x21d7a2(0x2e7)](_0x24861c)){const _0x40929c=String(RegExp['$1']),_0x161c43='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x21d7a2(0x253)](_0x40929c),_0xcdb690=VisuMZ[_0x21d7a2(0x20a)]['createKeyJS'](_0x24e3c2,_0x1022d3);VisuMZ['SkillLearnSystem']['JS'][_0xcdb690]=new Function(_0x161c43);}},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x189)]=function(_0x1ed75f,_0x25ec3d,_0x4ea39e){const _0x2c99db=_0x4f089c,_0x3d5557=_0x1ed75f[_0x2c99db(0x1ec)];if(_0x3d5557[_0x2c99db(0x2e7)](_0x4ea39e)){const _0xb420a6=String(RegExp['$1']),_0x331f83=_0x2c99db(0x35c)['format'](_0xb420a6),_0x3e4e32=VisuMZ[_0x2c99db(0x20a)][_0x2c99db(0x382)](_0x1ed75f,_0x25ec3d);VisuMZ['SkillLearnSystem']['JS'][_0x3e4e32]=new Function(_0x331f83);}},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x382)]=function(_0x2d17d5,_0x407f3b){const _0x31c4b1=_0x4f089c;if(VisuMZ[_0x31c4b1(0x382)])return VisuMZ[_0x31c4b1(0x382)](_0x2d17d5,_0x407f3b);let _0xf78382='';if($dataActors[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382='Actor-%1-%2'['format'](_0x2d17d5['id'],_0x407f3b);if($dataClasses[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382=_0x31c4b1(0x20e)['format'](_0x2d17d5['id'],_0x407f3b);if($dataSkills[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382=_0x31c4b1(0x1c4)[_0x31c4b1(0x253)](_0x2d17d5['id'],_0x407f3b);if($dataItems[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382=_0x31c4b1(0x326)['format'](_0x2d17d5['id'],_0x407f3b);if($dataWeapons['includes'](_0x2d17d5))_0xf78382=_0x31c4b1(0x16c)[_0x31c4b1(0x253)](_0x2d17d5['id'],_0x407f3b);if($dataArmors[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382='Armor-%1-%2'['format'](_0x2d17d5['id'],_0x407f3b);if($dataEnemies[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382=_0x31c4b1(0x393)['format'](_0x2d17d5['id'],_0x407f3b);if($dataStates[_0x31c4b1(0x1de)](_0x2d17d5))_0xf78382=_0x31c4b1(0x2f9)[_0x31c4b1(0x253)](_0x2d17d5['id'],_0x407f3b);return _0xf78382;},DataManager[_0x4f089c(0x342)]=function(_0x4c4350){const _0x4858bc=_0x4f089c;if(!_0x4c4350)return![];return _0x4c4350[_0x4858bc(0x1c2)]!==undefined&&_0x4c4350[_0x4858bc(0x31c)]!==undefined;},DataManager[_0x4f089c(0x324)]=function(_0x6d3bcb){const _0x38d325=_0x4f089c;_0x6d3bcb=_0x6d3bcb[_0x38d325(0x354)]()[_0x38d325(0x23f)](),this[_0x38d325(0x1d0)]=this[_0x38d325(0x1d0)]||{};if(this[_0x38d325(0x1d0)][_0x6d3bcb])return this[_0x38d325(0x1d0)][_0x6d3bcb];for(const _0x5c8a91 of $dataClasses){if(!_0x5c8a91)continue;let _0x30698d=_0x5c8a91[_0x38d325(0x1ae)];_0x30698d=_0x30698d[_0x38d325(0x32f)](/\x1I\[(\d+)\]/gi,''),_0x30698d=_0x30698d[_0x38d325(0x32f)](/\\I\[(\d+)\]/gi,''),this[_0x38d325(0x1d0)][_0x30698d[_0x38d325(0x354)]()[_0x38d325(0x23f)]()]=_0x5c8a91['id'];}return this[_0x38d325(0x1d0)][_0x6d3bcb]||0x0;},DataManager['getSkillIdWithName']=function(_0x228e9a){const _0x4b8eda=_0x4f089c;_0x228e9a=_0x228e9a[_0x4b8eda(0x354)]()[_0x4b8eda(0x23f)](),this[_0x4b8eda(0x2bd)]=this['_skillIDs']||{};if(this[_0x4b8eda(0x2bd)][_0x228e9a])return this[_0x4b8eda(0x2bd)][_0x228e9a];for(const _0x970500 of $dataSkills){if(!_0x970500)continue;this[_0x4b8eda(0x2bd)][_0x970500[_0x4b8eda(0x1ae)]['toUpperCase']()['trim']()]=_0x970500['id'];}return this[_0x4b8eda(0x2bd)][_0x228e9a]||0x0;},DataManager[_0x4f089c(0x190)]=function(_0x2a9879){const _0x1d24ba=_0x4f089c;_0x2a9879=_0x2a9879[_0x1d24ba(0x354)]()[_0x1d24ba(0x23f)](),this[_0x1d24ba(0x177)]=this['_itemIDs']||{};if(this[_0x1d24ba(0x177)][_0x2a9879])return this[_0x1d24ba(0x177)][_0x2a9879];for(const _0x5c7188 of $dataItems){if(!_0x5c7188)continue;this['_itemIDs'][_0x5c7188[_0x1d24ba(0x1ae)][_0x1d24ba(0x354)]()['trim']()]=_0x5c7188['id'];}return this[_0x1d24ba(0x177)][_0x2a9879]||0x0;},DataManager['getWeaponIdWithName']=function(_0x4e78c4){const _0xd91cad=_0x4f089c;_0x4e78c4=_0x4e78c4[_0xd91cad(0x354)]()[_0xd91cad(0x23f)](),this[_0xd91cad(0x1cf)]=this[_0xd91cad(0x1cf)]||{};if(this['_weaponIDs'][_0x4e78c4])return this['_weaponIDs'][_0x4e78c4];for(const _0x393d52 of $dataWeapons){if(!_0x393d52)continue;this[_0xd91cad(0x1cf)][_0x393d52[_0xd91cad(0x1ae)][_0xd91cad(0x354)]()['trim']()]=_0x393d52['id'];}return this[_0xd91cad(0x1cf)][_0x4e78c4]||0x0;},DataManager[_0x4f089c(0x368)]=function(_0x260ea9){const _0x22303a=_0x4f089c;_0x260ea9=_0x260ea9['toUpperCase']()[_0x22303a(0x23f)](),this[_0x22303a(0x1fa)]=this[_0x22303a(0x1fa)]||{};if(this['_armorIDs'][_0x260ea9])return this['_armorIDs'][_0x260ea9];for(const _0x392f4d of $dataArmors){if(!_0x392f4d)continue;this[_0x22303a(0x1fa)][_0x392f4d[_0x22303a(0x1ae)]['toUpperCase']()[_0x22303a(0x23f)]()]=_0x392f4d['id'];}return this[_0x22303a(0x1fa)][_0x260ea9]||0x0;},DataManager['getSkillLearnSkillsFromClass']=function(_0xb9259e){const _0x1e8e2b=_0x4f089c;if(!$dataClasses[_0xb9259e])return[];const _0xfcfd7a=[],_0xe723f=$dataClasses[_0xb9259e]['note'],_0x10a6e4=VisuMZ['SkillLearnSystem'][_0x1e8e2b(0x31d)],_0x2029b9=_0xe723f['match'](_0x10a6e4[_0x1e8e2b(0x2e5)]);if(_0x2029b9)for(const _0x1574c5 of _0x2029b9){if(!_0x1574c5)continue;_0x1574c5[_0x1e8e2b(0x2e7)](_0x10a6e4[_0x1e8e2b(0x2e5)]);const _0x2d0870=String(RegExp['$1'])[_0x1e8e2b(0x312)](',')['map'](_0x12aae9=>_0x12aae9[_0x1e8e2b(0x23f)]());;for(let _0x73324c of _0x2d0870){_0x73324c=(String(_0x73324c)||'')[_0x1e8e2b(0x23f)]();if(_0x73324c[_0x1e8e2b(0x2e7)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0xdaeeea=Math[_0x1e8e2b(0x33a)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x35e4ed=Math[_0x1e8e2b(0x1b4)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x544df2=_0xdaeeea;_0x544df2<=_0x35e4ed;_0x544df2++)_0xfcfd7a[_0x1e8e2b(0x33c)](_0x544df2);continue;}_0x73324c=(String(_0x73324c)||'')[_0x1e8e2b(0x23f)]();const _0x38cddc=/^\d+$/['test'](_0x73324c);_0x38cddc?_0xfcfd7a['push'](Number(_0x73324c)):_0xfcfd7a[_0x1e8e2b(0x33c)](DataManager['getSkillIdWithName'](_0x73324c));}}const _0x494436=_0xe723f[_0x1e8e2b(0x2e7)](_0x10a6e4[_0x1e8e2b(0x361)]);if(_0x494436)for(const _0xa4e492 of _0x494436){if(!_0xa4e492)continue;_0xa4e492[_0x1e8e2b(0x2e7)](_0x10a6e4['LearnSkillB']);const _0x2e0ba3=String(RegExp['$1'])[_0x1e8e2b(0x312)](/[\r\n]+/);for(let _0x215721 of _0x2e0ba3){_0x215721=(String(_0x215721)||'')['trim']();if(_0x215721[_0x1e8e2b(0x2e7)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x626701=Math['min'](Number(RegExp['$1']),Number(RegExp['$2'])),_0x5a30ef=Math[_0x1e8e2b(0x1b4)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x2c53e4=_0x626701;_0x2c53e4<=_0x5a30ef;_0x2c53e4++)_0xfcfd7a[_0x1e8e2b(0x33c)](_0x2c53e4);continue;}const _0xe0d6ad=/^\d+$/['test'](_0x215721);_0xe0d6ad?_0xfcfd7a[_0x1e8e2b(0x33c)](Number(_0x215721)):_0xfcfd7a[_0x1e8e2b(0x33c)](DataManager['getSkillIdWithName'](_0x215721));}}return VisuMZ[_0x1e8e2b(0x212)]&&(_0xfcfd7a[_0x1e8e2b(0x199)]((_0x52afe1,_0x4b9790)=>_0x52afe1-_0x4b9790),VisuMZ[_0x1e8e2b(0x212)][_0x1e8e2b(0x1ad)]&&VisuMZ[_0x1e8e2b(0x212)][_0x1e8e2b(0x1ad)](_0xfcfd7a)),_0xfcfd7a[_0x1e8e2b(0x1b1)](_0x2c4446=>$dataSkills[_0x2c4446]&&$dataSkills[_0x2c4446][_0x1e8e2b(0x1ae)][_0x1e8e2b(0x23f)]()!=='')['filter']((_0xe61785,_0x40c7d0,_0x2659a2)=>_0x2659a2[_0x1e8e2b(0x21f)](_0xe61785)===_0x40c7d0);},DataManager[_0x4f089c(0x25c)]=function(_0x224e10){const _0x145d38=_0x4f089c;if(!_0x224e10)return 0x0;if(!DataManager[_0x145d38(0x330)](_0x224e10)&&!DataManager[_0x145d38(0x342)](_0x224e10))return 0x0;const _0x41703f=VisuMZ[_0x145d38(0x20a)]['RegExp'],_0x4af7d4=_0x224e10[_0x145d38(0x1ec)];if(_0x4af7d4[_0x145d38(0x2e7)](_0x41703f[_0x145d38(0x195)]))return Number(RegExp['$1']);if(_0x4af7d4['match'](_0x41703f[_0x145d38(0x1ac)])){const _0x14ae47=String(RegExp['$1'])[_0x145d38(0x312)](/[\r\n]+/);for(const _0x481bd2 of _0x14ae47){if(_0x481bd2['match'](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x503b0c=VisuMZ[_0x145d38(0x20a)][_0x145d38(0x382)](_0x224e10,_0x145d38(0x2c7));if(VisuMZ['SkillLearnSystem']['JS'][_0x503b0c]){const _0x4faeb=SceneManager['_scene'][_0x145d38(0x1a9)]();return VisuMZ[_0x145d38(0x20a)]['JS'][_0x503b0c][_0x145d38(0x21d)](this,_0x4faeb,_0x224e10);}return VisuMZ[_0x145d38(0x20a)]['Settings']['AbilityPoints'][_0x145d38(0x1fe)]||0x0;},DataManager['getSkillLearnClassPointCost']=function(_0x13f8fd){const _0x240a72=_0x4f089c;if(!_0x13f8fd)return 0x0;if(!DataManager['isSkill'](_0x13f8fd)&&!DataManager[_0x240a72(0x342)](_0x13f8fd))return 0x0;const _0x4e3cce=VisuMZ[_0x240a72(0x20a)]['RegExp'],_0x337cc6=_0x13f8fd[_0x240a72(0x1ec)];if(_0x337cc6['match'](_0x4e3cce[_0x240a72(0x28d)]))return Number(RegExp['$1']);if(_0x337cc6[_0x240a72(0x2e7)](_0x4e3cce[_0x240a72(0x1ac)])){const _0x5e1926=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x27c07a of _0x5e1926){if(_0x27c07a[_0x240a72(0x2e7)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x27843a=VisuMZ[_0x240a72(0x20a)][_0x240a72(0x382)](_0x13f8fd,_0x240a72(0x1ab));if(VisuMZ[_0x240a72(0x20a)]['JS'][_0x27843a]){const _0x2a7382=SceneManager['_scene'][_0x240a72(0x1a9)]();return VisuMZ[_0x240a72(0x20a)]['JS'][_0x27843a][_0x240a72(0x21d)](this,_0x2a7382,_0x13f8fd)||0x0;}return VisuMZ[_0x240a72(0x302)][_0x240a72(0x188)][_0x240a72(0x2df)][_0x240a72(0x1fe)]||0x0;},DataManager[_0x4f089c(0x1f6)]=function(_0x2d1edc){const _0x613a3=_0x4f089c;if(!_0x2d1edc)return 0x0;if(!DataManager[_0x613a3(0x330)](_0x2d1edc)&&!DataManager[_0x613a3(0x342)](_0x2d1edc))return 0x0;const _0x2f7c15=VisuMZ[_0x613a3(0x20a)][_0x613a3(0x31d)],_0x1445ae=_0x2d1edc[_0x613a3(0x1ec)];if(_0x1445ae[_0x613a3(0x2e7)](_0x2f7c15[_0x613a3(0x249)]))return Number(RegExp['$1']);if(_0x1445ae[_0x613a3(0x2e7)](_0x2f7c15[_0x613a3(0x1ac)])){const _0x36f574=String(RegExp['$1'])[_0x613a3(0x312)](/[\r\n]+/);for(const _0xe6e050 of _0x36f574){if(_0xe6e050[_0x613a3(0x2e7)](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x8336ce=VisuMZ[_0x613a3(0x20a)][_0x613a3(0x382)](_0x2d1edc,_0x613a3(0x2ae));if(VisuMZ['SkillLearnSystem']['JS'][_0x8336ce]){const _0x43a897=SceneManager[_0x613a3(0x1d1)][_0x613a3(0x1a9)]();return VisuMZ[_0x613a3(0x20a)]['JS'][_0x8336ce][_0x613a3(0x21d)](this,_0x43a897,_0x2d1edc);}return VisuMZ['ClassChangeSystem']['Settings'][_0x613a3(0x310)][_0x613a3(0x1fe)]||0x0;},DataManager[_0x4f089c(0x23c)]=function(_0xb68df8){const _0x4ba96f=_0x4f089c;if(!_0xb68df8)return 0x0;if(!DataManager['isSkill'](_0xb68df8)&&!DataManager[_0x4ba96f(0x342)](_0xb68df8))return 0x0;const _0x1e5ef4=VisuMZ['SkillLearnSystem']['RegExp'],_0x4f9290=_0xb68df8[_0x4ba96f(0x1ec)];if(_0x4f9290[_0x4ba96f(0x2e7)](_0x1e5ef4[_0x4ba96f(0x2f6)]))return Number(RegExp['$1']);if(_0x4f9290[_0x4ba96f(0x2e7)](_0x1e5ef4['LearnCostBatch'])){const _0x190673=String(RegExp['$1'])[_0x4ba96f(0x312)](/[\r\n]+/);for(const _0x116e85 of _0x190673){if(_0x116e85[_0x4ba96f(0x2e7)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x155583=VisuMZ[_0x4ba96f(0x20a)][_0x4ba96f(0x382)](_0xb68df8,_0x4ba96f(0x1a1));if(VisuMZ['SkillLearnSystem']['JS'][_0x155583]){const _0x5843a3=SceneManager[_0x4ba96f(0x1d1)][_0x4ba96f(0x1a9)]();return VisuMZ[_0x4ba96f(0x20a)]['JS'][_0x155583]['call'](this,_0x5843a3,_0xb68df8);}return VisuMZ[_0x4ba96f(0x20a)][_0x4ba96f(0x188)][_0x4ba96f(0x257)]['DefaultCost']||0x0;},DataManager[_0x4f089c(0x283)]=function(_0x552bad){const _0x23393e=_0x4f089c;if(!_0x552bad)return[];if(!DataManager[_0x23393e(0x330)](_0x552bad)&&!DataManager[_0x23393e(0x342)](_0x552bad))return[];const _0x4d0b6a=VisuMZ[_0x23393e(0x20a)][_0x23393e(0x31d)],_0x3c1b0a=_0x552bad[_0x23393e(0x1ec)],_0x1817a7=[],_0xc99a2=_0x3c1b0a[_0x23393e(0x2e7)](_0x4d0b6a[_0x23393e(0x394)]);if(_0xc99a2)for(const _0x8b85f7 of _0xc99a2){if(!_0x8b85f7)continue;_0x8b85f7[_0x23393e(0x2e7)](_0x4d0b6a[_0x23393e(0x394)]);const _0x31b189=String(RegExp['$1']),_0x2b83c3={'id':0x0,'quantity':Number(RegExp['$2'])},_0x2e52cc=/^\d+$/['test'](_0x31b189);_0x2e52cc?_0x2b83c3['id']=Number(_0x31b189):_0x2b83c3['id']=DataManager['getItemIdWithName'](_0x31b189),_0x2b83c3['id']>0x0&&_0x1817a7[_0x23393e(0x33c)](_0x2b83c3);}if(_0x3c1b0a[_0x23393e(0x2e7)](_0x4d0b6a['LearnCostBatch'])){const _0x578083=String(RegExp['$1'])[_0x23393e(0x312)](/[\r\n]+/);for(const _0x418a4 of _0x578083){if(_0x418a4[_0x23393e(0x2e7)](/ITEM[ ](.*):[ ](\d+)/gi)){const _0x35720f=String(RegExp['$1']),_0x15d727={'id':0x0,'quantity':Number(RegExp['$2'])},_0x173192=/^\d+$/['test'](_0x35720f);_0x173192?_0x15d727['id']=Number(_0x35720f):_0x15d727['id']=DataManager[_0x23393e(0x190)](_0x35720f),_0x15d727['id']>0x0&&_0x1817a7[_0x23393e(0x33c)](_0x15d727);}}}return _0x1817a7;},DataManager['getSkillLearnWeaponCost']=function(_0x4ac5f3){const _0x321c3e=_0x4f089c;if(!_0x4ac5f3)return[];if(!DataManager[_0x321c3e(0x330)](_0x4ac5f3)&&!DataManager['isState'](_0x4ac5f3))return[];const _0x30e79d=VisuMZ[_0x321c3e(0x20a)][_0x321c3e(0x31d)],_0x45a977=_0x4ac5f3[_0x321c3e(0x1ec)],_0x45ca9f=[],_0x401081=_0x45a977[_0x321c3e(0x2e7)](_0x30e79d['LearnWeaponCost']);if(_0x401081)for(const _0x413cd1 of _0x401081){if(!_0x413cd1)continue;_0x413cd1[_0x321c3e(0x2e7)](_0x30e79d[_0x321c3e(0x333)]);const _0x32deae=String(RegExp['$1']),_0x38cb6f={'id':0x0,'quantity':Number(RegExp['$2'])},_0x360e6b=/^\d+$/[_0x321c3e(0x1df)](_0x32deae);_0x360e6b?_0x38cb6f['id']=Number(_0x32deae):_0x38cb6f['id']=DataManager[_0x321c3e(0x2be)](_0x32deae),_0x38cb6f['id']>0x0&&_0x45ca9f[_0x321c3e(0x33c)](_0x38cb6f);}if(_0x45a977[_0x321c3e(0x2e7)](_0x30e79d[_0x321c3e(0x1ac)])){const _0x2a1251=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x59606e of _0x2a1251){if(_0x59606e[_0x321c3e(0x2e7)](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x389ba1=String(RegExp['$1']),_0x4f90f5={'id':0x0,'quantity':Number(RegExp['$2'])},_0x24aad6=/^\d+$/['test'](_0x389ba1);_0x24aad6?_0x4f90f5['id']=Number(_0x389ba1):_0x4f90f5['id']=DataManager[_0x321c3e(0x2be)](_0x389ba1),_0x4f90f5['id']>0x0&&_0x45ca9f[_0x321c3e(0x33c)](_0x4f90f5);}}}return _0x45ca9f;},DataManager['getSkillLearnArmorCost']=function(_0x58b09d){const _0x110f21=_0x4f089c;if(!_0x58b09d)return[];if(!DataManager[_0x110f21(0x330)](_0x58b09d)&&!DataManager['isState'](_0x58b09d))return[];const _0x2385ed=VisuMZ[_0x110f21(0x20a)]['RegExp'],_0x72dfe8=_0x58b09d[_0x110f21(0x1ec)],_0x5504d2=[],_0xe6530d=_0x72dfe8['match'](_0x2385ed[_0x110f21(0x29a)]);if(_0xe6530d)for(const _0x1e7503 of _0xe6530d){if(!_0x1e7503)continue;_0x1e7503['match'](_0x2385ed['LearnArmorCost']);const _0x1b3d3d=String(RegExp['$1']),_0x1a2d69={'id':0x0,'quantity':Number(RegExp['$2'])},_0x5211ea=/^\d+$/['test'](_0x1b3d3d);_0x5211ea?_0x1a2d69['id']=Number(_0x1b3d3d):_0x1a2d69['id']=DataManager[_0x110f21(0x368)](_0x1b3d3d),_0x1a2d69['id']>0x0&&_0x5504d2[_0x110f21(0x33c)](_0x1a2d69);}if(_0x72dfe8[_0x110f21(0x2e7)](_0x2385ed[_0x110f21(0x1ac)])){const _0x3dd75a=String(RegExp['$1'])[_0x110f21(0x312)](/[\r\n]+/);for(const _0x2970d0 of _0x3dd75a){if(_0x2970d0[_0x110f21(0x2e7)](/ARMOR[ ](.*):[ ](\d+)/gi)){const _0x422e6a=String(RegExp['$1']),_0x1be4a0={'id':0x0,'quantity':Number(RegExp['$2'])},_0x431017=/^\d+$/[_0x110f21(0x1df)](_0x422e6a);_0x431017?_0x1be4a0['id']=Number(_0x422e6a):_0x1be4a0['id']=DataManager[_0x110f21(0x368)](_0x422e6a),_0x1be4a0['id']>0x0&&_0x5504d2[_0x110f21(0x33c)](_0x1be4a0);}}}return _0x5504d2;},DataManager[_0x4f089c(0x1cd)]=function(_0xdaa15f){const _0x3fba5d=_0x4f089c;if(!_0xdaa15f)return 0x0;if(!DataManager[_0x3fba5d(0x330)](_0xdaa15f)&&!DataManager[_0x3fba5d(0x342)](_0xdaa15f))return 0x0;const _0x33b252=VisuMZ[_0x3fba5d(0x20a)][_0x3fba5d(0x31d)],_0x2d6b54=_0xdaa15f[_0x3fba5d(0x1ec)];if(_0x2d6b54[_0x3fba5d(0x2e7)](_0x33b252[_0x3fba5d(0x32d)]))return Number(RegExp['$1']);if(_0x2d6b54[_0x3fba5d(0x2e7)](_0x33b252[_0x3fba5d(0x1ac)])){const _0x57d82a=String(RegExp['$1'])[_0x3fba5d(0x312)](/[\r\n]+/);for(const _0x19abef of _0x57d82a){if(_0x19abef[_0x3fba5d(0x2e7)](/GOLD:[ ](\d+)/gi))return Number(RegExp['$1']);}}return 0x0;},TextManager['skillLearnIcon']=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x221)]['Icon'],ImageManager[_0x4f089c(0x1db)]=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x35d)]['Icon'],ImageManager['skillPointsIcon']=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['SkillPoints']['Icon'],SoundManager['playSkillLearn']=function(){const _0x2dcd9f=_0x4f089c;AudioManager['playStaticSe'](VisuMZ[_0x2dcd9f(0x20a)][_0x2dcd9f(0x188)][_0x2dcd9f(0x375)]);},TextManager[_0x4f089c(0x200)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)]['General'][_0x4f089c(0x309)],TextManager[_0x4f089c(0x2ce)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['General'][_0x4f089c(0x360)],TextManager[_0x4f089c(0x1fd)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x191)]['ReqSeparateFmt'],TextManager[_0x4f089c(0x192)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x191)]['ReqLevelFmt'],TextManager[_0x4f089c(0x2a6)]=VisuMZ['SkillLearnSystem']['Settings'][_0x4f089c(0x191)]['ReqSkillFmt'],TextManager[_0x4f089c(0x207)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)][_0x4f089c(0x191)]['ReqSwitchFmt'],TextManager[_0x4f089c(0x296)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['General']['SeparationFmt'],TextManager[_0x4f089c(0x323)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)][_0x4f089c(0x191)][_0x4f089c(0x21b)],TextManager['skillLearnWeaponFmt']=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x191)][_0x4f089c(0x1f9)],TextManager[_0x4f089c(0x208)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)][_0x4f089c(0x191)][_0x4f089c(0x201)],TextManager[_0x4f089c(0x328)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x191)][_0x4f089c(0x2c2)],TextManager[_0x4f089c(0x1e2)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['MenuAccess']['Name'],TextManager[_0x4f089c(0x379)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x25e)]['RequirementTitle'],TextManager['skillLearnReqMet']=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x25e)][_0x4f089c(0x28c)],TextManager[_0x4f089c(0x28f)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['Window'][_0x4f089c(0x385)],TextManager['skillLearnReqListLevel']=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x25e)]['ReqLevelFmt'],TextManager[_0x4f089c(0x250)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x25e)]['ReqSkillFmt'],TextManager[_0x4f089c(0x167)]=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x25e)][_0x4f089c(0x30e)],TextManager[_0x4f089c(0x1a8)]=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x25e)][_0x4f089c(0x34d)],TextManager[_0x4f089c(0x322)]=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x25e)][_0x4f089c(0x1f2)],TextManager['skillLearningCost']=VisuMZ['SkillLearnSystem']['Settings'][_0x4f089c(0x25e)]['IngredientCost'],TextManager[_0x4f089c(0x269)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['Window'][_0x4f089c(0x337)],TextManager[_0x4f089c(0x357)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x25e)][_0x4f089c(0x25b)],TextManager[_0x4f089c(0x279)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)][_0x4f089c(0x25e)][_0x4f089c(0x23e)],TextManager['abilityPointsFull']=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)][_0x4f089c(0x35d)][_0x4f089c(0x256)],TextManager[_0x4f089c(0x363)]=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x35d)]['AbbrText'],TextManager[_0x4f089c(0x2c0)]=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x35d)][_0x4f089c(0x2d4)],TextManager[_0x4f089c(0x2db)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)]['SkillPoints']['FullText'],TextManager[_0x4f089c(0x353)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)]['SkillPoints'][_0x4f089c(0x175)],TextManager[_0x4f089c(0x321)]=VisuMZ['SkillLearnSystem'][_0x4f089c(0x188)]['SkillPoints'][_0x4f089c(0x2d4)],TextManager['skillLearnStypeCategory']=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x257)]['SeparateCategoryFmt']??'%1',TextManager[_0x4f089c(0x2af)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x257)]['SeparateCollapseFmt']??_0x4f089c(0x391),TextManager[_0x4f089c(0x1c9)]=VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x188)][_0x4f089c(0x257)][_0x4f089c(0x2cb)]??_0x4f089c(0x31e),TextManager['skillLearnStypeColor']=VisuMZ[_0x4f089c(0x20a)]['Settings'][_0x4f089c(0x257)]['StypeCategoryColor']??'16',VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x31b)]=BattleManager[_0x4f089c(0x1dc)],BattleManager[_0x4f089c(0x1dc)]=function(){const _0x40822f=_0x4f089c;VisuMZ[_0x40822f(0x20a)][_0x40822f(0x31b)]['call'](this),this[_0x40822f(0x386)](),this['gainRewardsAbilityPoints'](),this['makeRewardsSkillPoints'](),this[_0x40822f(0x25a)]();},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x1d2)]=BattleManager[_0x4f089c(0x236)],BattleManager[_0x4f089c(0x236)]=function(){const _0x9aa8c8=_0x4f089c;VisuMZ['SkillLearnSystem'][_0x9aa8c8(0x1d2)][_0x9aa8c8(0x21d)](this),this[_0x9aa8c8(0x168)](),this[_0x9aa8c8(0x2d8)]();},BattleManager['makeRewardsAbilityPoints']=function(){const _0x5dba93=_0x4f089c;this['_rewards'][_0x5dba93(0x295)]=$gameTroop[_0x5dba93(0x28b)]();},BattleManager[_0x4f089c(0x168)]=function(){const _0xb316cb=_0x4f089c;if(!this[_0xb316cb(0x343)]())return;$gameMessage[_0xb316cb(0x289)]();const _0x2e651c=$gameParty[_0xb316cb(0x1b8)](),_0x407c87=VisuMZ[_0xb316cb(0x20a)][_0xb316cb(0x188)][_0xb316cb(0x35d)],_0x4ae28e=_0x407c87[_0xb316cb(0x2c5)];for(const _0x3664de of _0x2e651c){if(!_0x3664de)continue;const _0x3b32d5=_0x4ae28e['format'](_0x3664de[_0xb316cb(0x1ae)](),_0x3664de[_0xb316cb(0x26c)](),TextManager['abilityPointsAbbr'],TextManager[_0xb316cb(0x2c0)]);$gameMessage['add']('\x5c.'+_0x3b32d5);}},BattleManager[_0x4f089c(0x31f)]=function(){const _0x3540bd=_0x4f089c;this[_0x3540bd(0x351)][_0x3540bd(0x295)]=this[_0x3540bd(0x351)][_0x3540bd(0x295)]||0x0;let _0x2df79f=$gameParty[_0x3540bd(0x347)]();VisuMZ[_0x3540bd(0x20a)]['Settings']['AbilityPoints'][_0x3540bd(0x282)]&&(_0x2df79f=_0x2df79f[_0x3540bd(0x1b1)](_0x24ae8e=>_0x24ae8e[_0x3540bd(0x2f7)]()));for(const _0x363dfe of _0x2df79f){if(!_0x363dfe)continue;if(!$dataSystem[_0x3540bd(0x38a)]&&!_0x363dfe['isBattleMember']())continue;_0x363dfe[_0x3540bd(0x243)](this[_0x3540bd(0x351)][_0x3540bd(0x295)]),_0x363dfe[_0x3540bd(0x334)](this[_0x3540bd(0x351)][_0x3540bd(0x295)]);}},BattleManager[_0x4f089c(0x343)]=function(){const _0x1a6bcf=_0x4f089c;return VisuMZ['SkillLearnSystem']['Settings'][_0x1a6bcf(0x35d)][_0x1a6bcf(0x355)];},BattleManager[_0x4f089c(0x358)]=function(){const _0x59621c=_0x4f089c;this['_rewards'][_0x59621c(0x181)]=$gameTroop[_0x59621c(0x37e)]();},BattleManager[_0x4f089c(0x2d8)]=function(){const _0x55d738=_0x4f089c;if(!this[_0x55d738(0x38c)]())return;$gameMessage['newPage']();const _0x54777e=$gameParty['members'](),_0x3dcb98=VisuMZ['SkillLearnSystem'][_0x55d738(0x188)][_0x55d738(0x257)],_0x127eaf=_0x3dcb98[_0x55d738(0x2c5)];for(const _0x26f360 of _0x54777e){if(!_0x26f360)continue;const _0x563ca1=_0x127eaf[_0x55d738(0x253)](_0x26f360[_0x55d738(0x1ae)](),_0x26f360[_0x55d738(0x225)](),TextManager[_0x55d738(0x353)],TextManager[_0x55d738(0x321)]);$gameMessage[_0x55d738(0x19c)]('\x5c.'+_0x563ca1);}},BattleManager[_0x4f089c(0x25a)]=function(){const _0x4ef662=_0x4f089c;this[_0x4ef662(0x351)]['skillPoints']=this['_rewards'][_0x4ef662(0x181)]||0x0;let _0x2eaed7=$gameParty[_0x4ef662(0x347)]();VisuMZ[_0x4ef662(0x20a)][_0x4ef662(0x188)][_0x4ef662(0x257)][_0x4ef662(0x282)]&&(_0x2eaed7=_0x2eaed7[_0x4ef662(0x1b1)](_0x1c212b=>_0x1c212b[_0x4ef662(0x2f7)]()));for(const _0x220f48 of _0x2eaed7){if(!_0x220f48)continue;if(!$dataSystem[_0x4ef662(0x38a)]&&!_0x220f48[_0x4ef662(0x24d)]())continue;_0x220f48[_0x4ef662(0x292)](this[_0x4ef662(0x351)][_0x4ef662(0x181)]),_0x220f48[_0x4ef662(0x17e)](this['_rewards'][_0x4ef662(0x181)]);}},BattleManager[_0x4f089c(0x38c)]=function(){const _0x4fc977=_0x4f089c;return VisuMZ[_0x4fc977(0x20a)][_0x4fc977(0x188)][_0x4fc977(0x257)][_0x4fc977(0x355)];},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x1eb)]=Game_System['prototype']['initialize'],Game_System[_0x4f089c(0x2c6)]['initialize']=function(){VisuMZ['SkillLearnSystem']['Game_System_initialize']['call'](this),this['initSkillLearnSystemMenuAccess']();},Game_System[_0x4f089c(0x2c6)]['initSkillLearnSystemMenuAccess']=function(){const _0x5c7433=_0x4f089c;this['_SkillLearnSystem_MenuAccess']=VisuMZ[_0x5c7433(0x20a)][_0x5c7433(0x188)]['MenuAccess'][_0x5c7433(0x1f8)];},Game_System[_0x4f089c(0x2c6)][_0x4f089c(0x2a8)]=function(){const _0x5293ad=_0x4f089c;return this[_0x5293ad(0x1d9)]===undefined&&this[_0x5293ad(0x1c5)](),this['_SkillLearnSystem_MenuAccess'];},Game_System[_0x4f089c(0x2c6)][_0x4f089c(0x2b2)]=function(_0x539ed0){const _0x2af6dd=_0x4f089c;this['_SkillLearnSystem_MenuAccess']===undefined&&this[_0x2af6dd(0x1c5)](),this['_SkillLearnSystem_MenuAccess']=_0x539ed0;},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x339)]=Game_Action['prototype'][_0x4f089c(0x231)],Game_Action[_0x4f089c(0x2c6)]['applyItemUserEffect']=function(_0x241267){const _0x359de5=_0x4f089c;VisuMZ[_0x359de5(0x20a)]['Game_Action_applyItemUserEffect'][_0x359de5(0x21d)](this,_0x241267),this['applySkillLearnSystemUserEffect'](_0x241267);},Game_Action[_0x4f089c(0x2c6)][_0x4f089c(0x33b)]=function(_0x1ca6cf){const _0x444b00=_0x4f089c;if(this[_0x444b00(0x20d)]())this[_0x444b00(0x370)](_0x1ca6cf);},Game_Action[_0x4f089c(0x2c6)][_0x4f089c(0x370)]=function(_0x5239cb){const _0x32ded5=_0x4f089c,_0x4b97ba=VisuMZ[_0x32ded5(0x20a)]['RegExp'],_0x27d6a8=this[_0x32ded5(0x20d)]()[_0x32ded5(0x1ec)];if($gameParty[_0x32ded5(0x26a)]()){if(this[_0x32ded5(0x2ef)]()['isActor']()&&_0x27d6a8[_0x32ded5(0x2e7)](_0x4b97ba[_0x32ded5(0x2b6)])){const _0x30f14d=eval(RegExp['$1']);this[_0x32ded5(0x2ef)]()[_0x32ded5(0x243)](_0x30f14d);}else this['applyAbilityPoints']();if(_0x5239cb['isActor']()&&_0x27d6a8[_0x32ded5(0x2e7)](_0x4b97ba[_0x32ded5(0x34b)])){const _0x251337=eval(RegExp['$1']);_0x5239cb[_0x32ded5(0x243)](_0x251337);}}if($gameParty[_0x32ded5(0x26a)]()){if(this[_0x32ded5(0x2ef)]()[_0x32ded5(0x1e9)]()&&_0x27d6a8[_0x32ded5(0x2e7)](_0x4b97ba[_0x32ded5(0x2dc)])){const _0x4d3128=eval(RegExp['$1']);this[_0x32ded5(0x2ef)]()[_0x32ded5(0x292)](_0x4d3128);}else this['applySkillPoints']();if(_0x5239cb['isActor']()&&_0x27d6a8[_0x32ded5(0x2e7)](_0x4b97ba[_0x32ded5(0x176)])){const _0x4ed1ba=eval(RegExp['$1']);_0x5239cb['gainSkillPoints'](_0x4ed1ba);}}if(_0x27d6a8[_0x32ded5(0x2e7)](/<NOTETAG>/i)){}},Game_Action['prototype'][_0x4f089c(0x29d)]=function(){const _0x1b74e9=_0x4f089c;if(!$gameParty[_0x1b74e9(0x26a)]())return;if(!this[_0x1b74e9(0x2ef)]()['isActor']())return;const _0x59d37f=VisuMZ['SkillLearnSystem'][_0x1b74e9(0x188)][_0x1b74e9(0x35d)];let _0x95631b=0x0;try{_0x95631b=eval(_0x59d37f['PerAction']);}catch(_0x8703aa){if($gameTemp['isPlaytest']())console['log'](_0x8703aa);}this[_0x1b74e9(0x2ef)]()[_0x1b74e9(0x243)](_0x95631b);},Game_Action[_0x4f089c(0x2c6)][_0x4f089c(0x398)]=function(){const _0x57a2f6=_0x4f089c;if(!$gameParty['inBattle']())return;if(!this[_0x57a2f6(0x2ef)]()[_0x57a2f6(0x1e9)]())return;const _0x1e2058=VisuMZ[_0x57a2f6(0x20a)][_0x57a2f6(0x188)][_0x57a2f6(0x257)];let _0xe262e7=0x0;try{_0xe262e7=eval(_0x1e2058[_0x57a2f6(0x1ea)]);}catch(_0x1eb853){if($gameTemp[_0x57a2f6(0x220)]())console[_0x57a2f6(0x2fb)](_0x1eb853);}this['subject']()[_0x57a2f6(0x292)](_0xe262e7);},VisuMZ[_0x4f089c(0x20a)]['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x4f089c(0x267)],Game_Battler[_0x4f089c(0x2c6)][_0x4f089c(0x267)]=function(_0x1a6f00){const _0x16e102=_0x4f089c;VisuMZ[_0x16e102(0x20a)][_0x16e102(0x1f1)][_0x16e102(0x21d)](this,_0x1a6f00),this[_0x16e102(0x1e9)]()&&(this['_earnedAbilityPoints']=this['getAbilityPoints'](),this[_0x16e102(0x22f)]=this[_0x16e102(0x26d)]());},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x1b7)]=Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x38e)],Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x38e)]=function(_0x437e90){const _0x22c131=_0x4f089c;VisuMZ['SkillLearnSystem'][_0x22c131(0x1b7)][_0x22c131(0x21d)](this,_0x437e90),this[_0x22c131(0x187)](),this[_0x22c131(0x388)](),this[_0x22c131(0x214)](),this['gainStartingSkillPoints']();},VisuMZ[_0x4f089c(0x20a)]['Game_Actor_changeClass']=Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x32b)],Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x32b)]=function(_0x1f712c,_0x307ecf){const _0x405038=_0x4f089c;this[_0x405038(0x2ee)]=!![],VisuMZ[_0x405038(0x20a)][_0x405038(0x254)][_0x405038(0x21d)](this,_0x1f712c,_0x307ecf),this['_SkillLearnSystem_preventLevelUpGain']=undefined;},VisuMZ[_0x4f089c(0x20a)]['Game_Actor_levelUp']=Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x2eb)],Game_Actor['prototype'][_0x4f089c(0x2eb)]=function(){const _0x4b9537=_0x4f089c;VisuMZ['SkillLearnSystem']['Game_Actor_levelUp'][_0x4b9537(0x21d)](this),this['levelUpGainAbilityPoints'](this[_0x4b9537(0x1ba)]()['id']),this[_0x4b9537(0x2f4)](this[_0x4b9537(0x1ba)]()['id']);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x187)]=function(){const _0x1d9903=_0x4f089c;this[_0x1d9903(0x390)]={};},Game_Actor['prototype'][_0x4f089c(0x388)]=function(){const _0x41f6cb=_0x4f089c,_0x133807=VisuMZ[_0x41f6cb(0x20a)][_0x41f6cb(0x31d)],_0x5d7827=this[_0x41f6cb(0x2ba)]()['note'];if(_0x5d7827[_0x41f6cb(0x2e7)](_0x133807[_0x41f6cb(0x270)])){const _0x299c46=eval(RegExp['$1']);this[_0x41f6cb(0x243)](_0x299c46);}const _0x83d7ee=VisuMZ['SkillLearnSystem'][_0x41f6cb(0x188)][_0x41f6cb(0x35d)];if(!_0x83d7ee[_0x41f6cb(0x29f)])return;const _0x50934d=_0x5d7827[_0x41f6cb(0x2e7)](_0x133807[_0x41f6cb(0x1e6)]);if(_0x50934d)for(const _0x56e57d of _0x50934d){if(!_0x56e57d)continue;_0x56e57d[_0x41f6cb(0x2e7)](_0x133807[_0x41f6cb(0x1e6)]);const _0x2b9966=String(RegExp['$1']),_0x59b8e9=eval(RegExp['$2']),_0x5120b9=/^\d+$/[_0x41f6cb(0x1df)](_0x2b9966);let _0x113af3=0x0;_0x5120b9?_0x113af3=Number(_0x2b9966):_0x113af3=DataManager[_0x41f6cb(0x324)](_0x2b9966),this[_0x41f6cb(0x243)](_0x59b8e9,_0x113af3);}},Game_Actor[_0x4f089c(0x2c6)]['getAbilityPoints']=function(_0x40d7fb){const _0x60f98d=_0x4f089c;this[_0x60f98d(0x390)]===undefined&&this[_0x60f98d(0x187)]();const _0x349132=VisuMZ['SkillLearnSystem'][_0x60f98d(0x188)]['AbilityPoints'];return _0x349132[_0x60f98d(0x29f)]?_0x40d7fb=0x0:_0x40d7fb=_0x40d7fb||this[_0x60f98d(0x1ba)]()['id'],this[_0x60f98d(0x390)][_0x40d7fb]=this['_abilityPoints'][_0x40d7fb]||0x0,Math[_0x60f98d(0x294)](this[_0x60f98d(0x390)][_0x40d7fb]);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x327)]=function(_0x3a849a,_0x4d79ad){const _0x1f9660=_0x4f089c;this[_0x1f9660(0x390)]===undefined&&this[_0x1f9660(0x187)]();const _0x2ae646=VisuMZ[_0x1f9660(0x20a)][_0x1f9660(0x188)][_0x1f9660(0x35d)];_0x2ae646['SharedResource']?_0x4d79ad=0x0:_0x4d79ad=_0x4d79ad||this[_0x1f9660(0x1ba)]()['id'];this[_0x1f9660(0x390)][_0x4d79ad]=this['_abilityPoints'][_0x4d79ad]||0x0,this[_0x1f9660(0x390)][_0x4d79ad]=Math[_0x1f9660(0x294)](_0x3a849a||0x0);const _0x3247dd=_0x2ae646[_0x1f9660(0x2de)]||Number[_0x1f9660(0x392)];this[_0x1f9660(0x390)][_0x4d79ad]=this['_abilityPoints'][_0x4d79ad][_0x1f9660(0x22b)](0x0,_0x3247dd);},Game_Actor[_0x4f089c(0x2c6)]['gainAbilityPoints']=function(_0x1cec7f,_0x3b991e){const _0x26f21a=_0x4f089c;_0x1cec7f>0x0&&(_0x1cec7f*=this[_0x26f21a(0x33d)]()),this[_0x26f21a(0x1a3)](_0x1cec7f,_0x3b991e);},Game_Actor['prototype'][_0x4f089c(0x334)]=function(_0x1964ac){const _0x4b2441=_0x4f089c;if(!Imported[_0x4b2441(0x24c)])return;_0x1964ac>0x0&&(_0x1964ac*=this['abilityPointsRate']()),this[_0x4b2441(0x18d)](_0x1964ac,_0x4b2441(0x2e0));},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x1a3)]=function(_0x32a83d,_0xc2a601){const _0x5e2933=_0x4f089c,_0x39944a=VisuMZ['SkillLearnSystem'][_0x5e2933(0x188)][_0x5e2933(0x35d)];_0x39944a[_0x5e2933(0x29f)]?_0xc2a601=0x0:_0xc2a601=_0xc2a601||this['currentClass']()['id'],_0x32a83d+=this['getAbilityPoints'](_0xc2a601),this[_0x5e2933(0x327)](_0x32a83d,_0xc2a601);},Game_Actor[_0x4f089c(0x2c6)]['loseAbilityPoints']=function(_0x1e67ba,_0x62d2dc){const _0x30ddf9=_0x4f089c;this[_0x30ddf9(0x1a3)](-_0x1e67ba,_0x62d2dc);},Game_Actor[_0x4f089c(0x2c6)]['abilityPointsRate']=function(){const _0x5663f1=_0x4f089c,_0xde1f18=VisuMZ[_0x5663f1(0x20a)]['RegExp'],_0x5d6067=this[_0x5663f1(0x32a)]()['remove'](null)[_0x5663f1(0x1f5)](undefined);let _0x37fcc3=0x1;return _0x37fcc3=_0x5d6067[_0x5663f1(0x26b)]((_0x828e61,_0x438848)=>{const _0x2ed825=_0x5663f1;return _0x438848&&_0x438848['note'][_0x2ed825(0x2e7)](_0xde1f18[_0x2ed825(0x235)])?_0x828e61+Number(RegExp['$1'])*0.01:_0x828e61;},_0x37fcc3),_0x37fcc3=_0x5d6067[_0x5663f1(0x26b)]((_0x451920,_0x25382e)=>{const _0x4c1613=_0x5663f1;return _0x25382e&&_0x25382e[_0x4c1613(0x1ec)]['match'](_0xde1f18[_0x4c1613(0x2fd)])?_0x451920*(Number(RegExp['$1'])*0.01):_0x451920;},_0x37fcc3),_0x37fcc3=_0x5d6067[_0x5663f1(0x26b)]((_0x22a47a,_0x57366f)=>{const _0x3f128b=_0x5663f1;return _0x57366f&&_0x57366f['note'][_0x3f128b(0x2e7)](_0xde1f18[_0x3f128b(0x1da)])?_0x22a47a+Number(RegExp['$1'])*0.01:_0x22a47a;},_0x37fcc3),_0x37fcc3;},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x1d3)]=function(_0x33d683){const _0x370214=_0x4f089c;if(this[_0x370214(0x2ee)])return;const _0x52b0e6=VisuMZ[_0x370214(0x20a)][_0x370214(0x188)][_0x370214(0x35d)];let _0x592442=0x0;try{_0x592442=eval(_0x52b0e6[_0x370214(0x182)]);}catch(_0x20adb7){if($gameTemp[_0x370214(0x220)]())console[_0x370214(0x2fb)](_0x20adb7);}this[_0x370214(0x243)](_0x592442,_0x33d683);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x26c)]=function(){const _0x21d86f=_0x4f089c;return this[_0x21d86f(0x2d2)]=this[_0x21d86f(0x2d2)]||0x0,this[_0x21d86f(0x2c8)]()-this[_0x21d86f(0x2d2)];},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x214)]=function(){const _0xbceab2=_0x4f089c;this[_0xbceab2(0x34a)]={};},Game_Actor['prototype'][_0x4f089c(0x20f)]=function(){const _0x3be2f3=_0x4f089c,_0x5515cd=VisuMZ[_0x3be2f3(0x20a)][_0x3be2f3(0x31d)],_0x146d09=this['actor']()['note'];if(_0x146d09[_0x3be2f3(0x2e7)](_0x5515cd[_0x3be2f3(0x37a)])){const _0x24be02=eval(RegExp['$1']);this['gainSkillPoints'](_0x24be02);}const _0x3e73e7=VisuMZ[_0x3be2f3(0x20a)]['Settings'][_0x3be2f3(0x257)];if(!_0x3e73e7[_0x3be2f3(0x29f)])return;const _0x233e35=_0x146d09['match'](_0x5515cd[_0x3be2f3(0x34e)]);if(_0x233e35)for(const _0x241569 of _0x233e35){if(!_0x241569)continue;_0x241569[_0x3be2f3(0x2e7)](_0x5515cd[_0x3be2f3(0x34e)]);const _0xa96ee4=String(RegExp['$1']),_0x3f1caf=eval(RegExp['$2']),_0x259eee=/^\d+$/[_0x3be2f3(0x1df)](_0xa96ee4);let _0x13c3e1=0x0;_0x259eee?_0x13c3e1=Number(_0xa96ee4):_0x13c3e1=DataManager[_0x3be2f3(0x324)](_0xa96ee4),this[_0x3be2f3(0x292)](_0x3f1caf,_0x13c3e1);}},Game_Actor[_0x4f089c(0x2c6)]['getSkillPoints']=function(_0x5bb063){const _0x437df8=_0x4f089c;this[_0x437df8(0x34a)]===undefined&&this[_0x437df8(0x214)]();const _0x1bc06e=VisuMZ[_0x437df8(0x20a)][_0x437df8(0x188)][_0x437df8(0x257)];return _0x1bc06e[_0x437df8(0x29f)]?_0x5bb063=0x0:_0x5bb063=_0x5bb063||this[_0x437df8(0x1ba)]()['id'],this[_0x437df8(0x34a)][_0x5bb063]=this[_0x437df8(0x34a)][_0x5bb063]||0x0,Math['round'](this[_0x437df8(0x34a)][_0x5bb063]);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x20c)]=function(_0xca1f20,_0x46e0ba){const _0x2ed063=_0x4f089c;this['_skillPoints']===undefined&&this[_0x2ed063(0x214)]();const _0x3bb6bf=VisuMZ[_0x2ed063(0x20a)][_0x2ed063(0x188)][_0x2ed063(0x257)];_0x3bb6bf['SharedResource']?_0x46e0ba=0x0:_0x46e0ba=_0x46e0ba||this['currentClass']()['id'];this[_0x2ed063(0x34a)][_0x46e0ba]=this[_0x2ed063(0x34a)][_0x46e0ba]||0x0,this[_0x2ed063(0x34a)][_0x46e0ba]=Math[_0x2ed063(0x294)](_0xca1f20||0x0);const _0x481968=_0x3bb6bf[_0x2ed063(0x2de)]||Number[_0x2ed063(0x392)];this[_0x2ed063(0x34a)][_0x46e0ba]=this[_0x2ed063(0x34a)][_0x46e0ba]['clamp'](0x0,_0x481968);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x292)]=function(_0x501a6c,_0x5c000f){const _0x15204c=_0x4f089c;_0x501a6c>0x0&&(_0x501a6c*=this[_0x15204c(0x2ab)]()),this['addSkillPoints'](_0x501a6c,_0x5c000f);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x17e)]=function(_0x1cb08d){const _0xc537c2=_0x4f089c;if(!Imported[_0xc537c2(0x24c)])return;_0x1cb08d>0x0&&(_0x1cb08d*=this[_0xc537c2(0x2ab)]()),this[_0xc537c2(0x18d)](_0x1cb08d,_0xc537c2(0x2c4));},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x25d)]=function(_0x450a01,_0x23bda3){const _0x19bd9e=_0x4f089c,_0x35a64c=VisuMZ[_0x19bd9e(0x20a)][_0x19bd9e(0x188)][_0x19bd9e(0x257)];_0x35a64c['SharedResource']?_0x23bda3=0x0:_0x23bda3=_0x23bda3||this[_0x19bd9e(0x1ba)]()['id'],_0x450a01+=this[_0x19bd9e(0x26d)](_0x23bda3),this[_0x19bd9e(0x20c)](_0x450a01,_0x23bda3);},Game_Actor[_0x4f089c(0x2c6)]['loseSkillPoints']=function(_0x1292b0,_0x24b183){const _0x4d6557=_0x4f089c;this[_0x4d6557(0x25d)](-_0x1292b0,_0x24b183);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x2ab)]=function(){const _0x123966=_0x4f089c,_0x355828=VisuMZ[_0x123966(0x20a)][_0x123966(0x31d)],_0x5a63df=this['traitObjects']()[_0x123966(0x1f5)](null)[_0x123966(0x1f5)](undefined);let _0x299cca=0x1;return _0x299cca=_0x5a63df['reduce']((_0x5a4d56,_0x1e19a6)=>{const _0x4aee0a=_0x123966;return _0x1e19a6&&_0x1e19a6[_0x4aee0a(0x1ec)][_0x4aee0a(0x2e7)](_0x355828[_0x4aee0a(0x349)])?_0x5a4d56+Number(RegExp['$1'])*0.01:_0x5a4d56;},_0x299cca),_0x299cca=_0x5a63df[_0x123966(0x26b)]((_0x5c40d9,_0x31f925)=>{const _0x1a59d2=_0x123966;return _0x31f925&&_0x31f925[_0x1a59d2(0x1ec)][_0x1a59d2(0x2e7)](_0x355828[_0x1a59d2(0x303)])?_0x5c40d9*(Number(RegExp['$1'])*0.01):_0x5c40d9;},_0x299cca),_0x299cca=_0x5a63df['reduce']((_0x76e39b,_0x37e2c2)=>{const _0x1b1952=_0x123966;return _0x37e2c2&&_0x37e2c2[_0x1b1952(0x1ec)]['match'](_0x355828['SkillPointsFlat'])?_0x76e39b+Number(RegExp['$1'])*0.01:_0x76e39b;},_0x299cca),_0x299cca;},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x2f4)]=function(_0x12c73c){const _0x3008f0=_0x4f089c;if(this[_0x3008f0(0x2ee)])return;const _0x444697=VisuMZ[_0x3008f0(0x20a)][_0x3008f0(0x188)][_0x3008f0(0x257)];let _0x2e8ab9=0x0;try{_0x2e8ab9=eval(_0x444697[_0x3008f0(0x182)]);}catch(_0x3e860b){if($gameTemp['isPlaytest']())console[_0x3008f0(0x2fb)](_0x3e860b);}this[_0x3008f0(0x292)](_0x2e8ab9,_0x12c73c);},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x225)]=function(){const _0xc93746=_0x4f089c;return this[_0xc93746(0x22f)]=this[_0xc93746(0x22f)]||0x0,this[_0xc93746(0x26d)]()-this[_0xc93746(0x22f)];},Game_Actor['prototype']['meetRequirementsForSkillLearnSystem']=function(_0x3851bd){const _0x189863=_0x4f089c;if(!_0x3851bd)return![];const _0x1670b0=VisuMZ[_0x189863(0x20a)]['createKeyJS'](_0x3851bd,'jsLearnReq');if(VisuMZ[_0x189863(0x20a)]['JS'][_0x1670b0]){if(!VisuMZ[_0x189863(0x20a)]['JS'][_0x1670b0][_0x189863(0x21d)](this,this,_0x3851bd))return![];}const _0x105ced=VisuMZ[_0x189863(0x20a)]['RegExp'],_0x4d3b74=_0x3851bd[_0x189863(0x1ec)];if(_0x4d3b74[_0x189863(0x2e7)](_0x105ced[_0x189863(0x259)])){const _0xba0e7b=Number(RegExp['$1']);if(_0xba0e7b>this[_0x189863(0x287)])return![];}if(_0x4d3b74[_0x189863(0x2e7)](_0x105ced[_0x189863(0x35b)])){const _0x188202=String(RegExp['$1'])[_0x189863(0x312)](',')[_0x189863(0x1cc)](_0x2313ef=>_0x2313ef[_0x189863(0x23f)]());for(const _0x234536 of _0x188202){let _0x2dad68=0x0;const _0x4d769e=/^\d+$/[_0x189863(0x1df)](_0x234536);_0x4d769e?_0x2dad68=Number(_0x234536):_0x2dad68=DataManager[_0x189863(0x24e)](_0x234536);if(!this[_0x189863(0x297)](_0x2dad68))return![];}}if(_0x4d3b74[_0x189863(0x2e7)](_0x105ced[_0x189863(0x241)])){const _0x181d51=String(RegExp['$1'])[_0x189863(0x312)](',')[_0x189863(0x1cc)](_0x1e9286=>_0x1e9286[_0x189863(0x23f)]());let _0x58f30b=![];for(const _0x1976ca of _0x181d51){let _0x452e2a=0x0;const _0x4d8974=/^\d+$/['test'](_0x1976ca);_0x4d8974?_0x452e2a=Number(_0x1976ca):_0x452e2a=DataManager[_0x189863(0x24e)](_0x1976ca);if(this[_0x189863(0x297)](_0x452e2a)){_0x58f30b=!![];break;}}if(!_0x58f30b)return![];}if(_0x4d3b74[_0x189863(0x2e7)](_0x105ced['LearnReqSwitchesAll'])){const _0x41987e=String(RegExp['$1'])[_0x189863(0x312)](',')[_0x189863(0x1cc)](_0x2034c9=>Number(_0x2034c9));for(const _0x342188 of _0x41987e){if(!$gameSwitches[_0x189863(0x174)](_0x342188))return![];}}if(_0x4d3b74['match'](_0x105ced['LearnReqSwitchesAny'])){const _0x19de6d=String(RegExp['$1'])[_0x189863(0x312)](',')[_0x189863(0x1cc)](_0x337f95=>Number(_0x337f95));let _0x354ff5=![];for(const _0x5cd8ff of _0x19de6d){if($gameSwitches[_0x189863(0x174)](_0x5cd8ff)){_0x354ff5=!![];break;}}if(!_0x354ff5)return![];}return!![];},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x1d7)]=function(_0x3d47c1){const _0x3d9c5e=_0x4f089c;if(!_0x3d47c1)return![];const _0x4f38b6=DataManager[_0x3d9c5e(0x25c)](_0x3d47c1);if(_0x4f38b6>this[_0x3d9c5e(0x2c8)]())return![];const _0x3cbed8=DataManager[_0x3d9c5e(0x23c)](_0x3d47c1);if(_0x3cbed8>this['getSkillPoints']())return![];const _0x5a8ed4=DataManager[_0x3d9c5e(0x1cd)](_0x3d47c1);if(_0x5a8ed4>$gameParty['gold']())return![];if(Imported['VisuMZ_2_ClassChangeSystem']){const _0xa2e5c=DataManager[_0x3d9c5e(0x376)](_0x3d47c1);if(_0xa2e5c>this[_0x3d9c5e(0x228)]())return![];const _0x5900d8=DataManager['getSkillLearnJobPointCost'](_0x3d47c1);if(_0x5900d8>this['getJobPoints']())return![];}const _0x189af6=DataManager[_0x3d9c5e(0x283)](_0x3d47c1);for(const _0x59f590 of _0x189af6){if(!_0x59f590)continue;const _0x5d50dd=$dataItems[_0x59f590['id']];if(_0x5d50dd&&_0x59f590[_0x3d9c5e(0x2c3)]>$gameParty[_0x3d9c5e(0x183)](_0x5d50dd))return![];}const _0x57496a=DataManager[_0x3d9c5e(0x16f)](_0x3d47c1);for(const _0x5dd34f of _0x57496a){if(!_0x5dd34f)continue;const _0x46e73f=$dataWeapons[_0x5dd34f['id']];if(_0x46e73f&&_0x5dd34f[_0x3d9c5e(0x2c3)]>$gameParty[_0x3d9c5e(0x183)](_0x46e73f))return![];}const _0x107195=DataManager['getSkillLearnArmorCost'](_0x3d47c1);for(const _0x2faa98 of _0x107195){if(!_0x2faa98)continue;const _0x35db31=$dataArmors[_0x2faa98['id']];if(_0x35db31&&_0x2faa98[_0x3d9c5e(0x2c3)]>$gameParty[_0x3d9c5e(0x183)](_0x35db31))return![];}return!![];},Game_Actor[_0x4f089c(0x2c6)]['processPayForSkillLearnSystem']=function(_0x5d2191){const _0x1dd68f=_0x4f089c;if(!_0x5d2191)return;const _0x5e1f9e=DataManager['getSkillLearnAbilityPointCost'](_0x5d2191);this['loseAbilityPoints'](_0x5e1f9e);const _0x2845e8=DataManager[_0x1dd68f(0x23c)](_0x5d2191);this['loseSkillPoints'](_0x2845e8);const _0x4f42c2=DataManager[_0x1dd68f(0x1cd)](_0x5d2191);$gameParty[_0x1dd68f(0x31a)](_0x4f42c2);if(Imported['VisuMZ_2_ClassChangeSystem']){const _0x3f1e10=DataManager['getSkillLearnClassPointCost'](_0x5d2191);this[_0x1dd68f(0x1bc)](_0x3f1e10);const _0x51af7e=DataManager[_0x1dd68f(0x1f6)](_0x5d2191);this[_0x1dd68f(0x366)](_0x51af7e);}const _0x178971=DataManager[_0x1dd68f(0x283)](_0x5d2191);for(const _0x2f4cc4 of _0x178971){if(!_0x2f4cc4)continue;const _0x27559d=$dataItems[_0x2f4cc4['id']],_0x1b4f1d=_0x2f4cc4[_0x1dd68f(0x2c3)];$gameParty[_0x1dd68f(0x1aa)](_0x27559d,_0x1b4f1d);}const _0x3beb80=DataManager[_0x1dd68f(0x16f)](_0x5d2191);for(const _0x3d9df7 of _0x3beb80){if(!_0x3d9df7)continue;const _0xf0236a=$dataWeapons[_0x3d9df7['id']],_0x2a13f4=_0x3d9df7[_0x1dd68f(0x2c3)];$gameParty[_0x1dd68f(0x1aa)](_0xf0236a,_0x2a13f4);}const _0x112452=DataManager[_0x1dd68f(0x34f)](_0x5d2191);for(const _0x13f051 of _0x112452){if(!_0x13f051)continue;const _0x4cf599=$dataArmors[_0x13f051['id']],_0xd8a561=_0x13f051[_0x1dd68f(0x2c3)];$gameParty[_0x1dd68f(0x1aa)](_0x4cf599,_0xd8a561);}if(DataManager['isSkill'](_0x5d2191))this[_0x1dd68f(0x263)](_0x5d2191['id']);else DataManager[_0x1dd68f(0x342)](_0x5d2191)&&Imported[_0x1dd68f(0x2e1)]&&this[_0x1dd68f(0x1dd)](_0x5d2191,!![]);this['refresh']();},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x24b)]=Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x263)],Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x263)]=function(_0x2ed1e6){const _0x311078=_0x4f089c,_0x582715=!this[_0x311078(0x297)](_0x2ed1e6);VisuMZ['SkillLearnSystem'][_0x311078(0x24b)][_0x311078(0x21d)](this,_0x2ed1e6);if(_0x582715&&this[_0x311078(0x297)](_0x2ed1e6)){const _0x933a52=$dataSkills[_0x2ed1e6],_0x88e4ff=VisuMZ[_0x311078(0x20a)][_0x311078(0x382)](_0x933a52,_0x311078(0x318));VisuMZ[_0x311078(0x20a)]['JS'][_0x88e4ff]&&VisuMZ[_0x311078(0x20a)]['JS'][_0x88e4ff][_0x311078(0x21d)](this,this,_0x933a52);}},Game_Actor[_0x4f089c(0x2c6)][_0x4f089c(0x1fc)]=function(){const _0x517458=_0x4f089c,_0x3611b0=DataManager[_0x517458(0x311)](this[_0x517458(0x1ba)]()['id']);for(const _0xe9eec7 of _0x3611b0){const _0x414087=$dataSkills[_0xe9eec7];if(!_0x414087)continue;if(_0x414087[_0x517458(0x1ae)]['trim']()==='')continue;if(_0x414087[_0x517458(0x1ae)]['match'](/-----/i))continue;this[_0x517458(0x263)](_0xe9eec7);}},Game_Enemy[_0x4f089c(0x2c6)]['abilityPoints']=function(){const _0x3baf49=_0x4f089c,_0x5083ca=VisuMZ[_0x3baf49(0x20a)][_0x3baf49(0x188)][_0x3baf49(0x35d)],_0x51ff14=VisuMZ[_0x3baf49(0x20a)][_0x3baf49(0x31d)],_0x410e05=this[_0x3baf49(0x1ee)]()['note'];if(_0x410e05['match'](_0x51ff14[_0x3baf49(0x2d9)]))try{return eval(RegExp['$1']);}catch(_0x2c6caf){if($gameTemp[_0x3baf49(0x220)]())console[_0x3baf49(0x2fb)](_0x2c6caf);return 0x0;}try{return eval(_0x5083ca['PerEnemy']);}catch(_0x2a41d6){if($gameTemp['isPlaytest']())console[_0x3baf49(0x2fb)](_0x2a41d6);return 0x0;}},Game_Enemy[_0x4f089c(0x2c6)][_0x4f089c(0x181)]=function(){const _0xd90bde=_0x4f089c,_0x373ab6=VisuMZ[_0xd90bde(0x20a)][_0xd90bde(0x188)][_0xd90bde(0x257)],_0x652496=VisuMZ['SkillLearnSystem'][_0xd90bde(0x31d)],_0x284c8d=this[_0xd90bde(0x1ee)]()['note'];if(_0x284c8d[_0xd90bde(0x2e7)](_0x652496[_0xd90bde(0x218)]))try{return eval(RegExp['$1']);}catch(_0x19b7e0){if($gameTemp[_0xd90bde(0x220)]())console[_0xd90bde(0x2fb)](_0x19b7e0);return 0x0;}try{return eval(_0x373ab6['PerEnemy']);}catch(_0x452bd9){if($gameTemp[_0xd90bde(0x220)]())console[_0xd90bde(0x2fb)](_0x452bd9);return 0x0;}},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x1c8)]=Game_Party['prototype'][_0x4f089c(0x240)],Game_Party[_0x4f089c(0x2c6)][_0x4f089c(0x240)]=function(){const _0x4a9eb7=_0x4f089c;VisuMZ[_0x4a9eb7(0x20a)][_0x4a9eb7(0x1c8)][_0x4a9eb7(0x21d)](this),this['setupBattleTestMembersSkillLearnSystem']();},Game_Party['prototype'][_0x4f089c(0x299)]=function(){const _0x1e8d66=_0x4f089c;for(const _0x47b76c of this[_0x1e8d66(0x347)]()){if(!_0x47b76c)continue;_0x47b76c[_0x1e8d66(0x1fc)]();}},Game_Troop[_0x4f089c(0x2c6)][_0x4f089c(0x28b)]=function(){const _0x568a23=_0x4f089c;return this[_0x568a23(0x27a)]()['reduce']((_0x25c0ec,_0x304643)=>_0x25c0ec+_0x304643[_0x568a23(0x295)](),0x0);},Game_Troop[_0x4f089c(0x2c6)][_0x4f089c(0x37e)]=function(){const _0x531e73=_0x4f089c;return this['deadMembers']()['reduce']((_0x3ea80c,_0x551516)=>_0x3ea80c+_0x551516[_0x531e73(0x181)](),0x0);},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x1ed)]=Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x1a7)],Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x1a7)]=function(){const _0x4332e4=_0x4f089c;VisuMZ[_0x4332e4(0x20a)]['Scene_Skill_create'][_0x4332e4(0x21d)](this),this['createSkillLearnSystemWindows']();},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x291)]=function(){const _0x21cc47=_0x4f089c;this[_0x21cc47(0x1f3)](),this[_0x21cc47(0x213)]();},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x1f3)]=function(){const _0x4b0155=_0x4f089c,_0x6eddc4=this[_0x4b0155(0x272)]();this[_0x4b0155(0x36b)]=new Window_SkillLearnIngredients(_0x6eddc4),this[_0x4b0155(0x2b3)](this[_0x4b0155(0x36b)]),this['_skillLearnIngredientsWindow']['hide']();const _0x59d98b=VisuMZ['SkillLearnSystem']['Settings'][_0x4b0155(0x25e)]['DetailWindow_BgType'];this['_skillLearnIngredientsWindow']['setBackgroundType'](_0x59d98b);},Scene_Skill[_0x4f089c(0x2c6)]['skillLearnIngredientsWindowRect']=function(){const _0x25b7c1=_0x4f089c;if(VisuMZ[_0x25b7c1(0x20a)][_0x25b7c1(0x188)][_0x25b7c1(0x25e)][_0x25b7c1(0x2e9)])return VisuMZ[_0x25b7c1(0x20a)][_0x25b7c1(0x188)]['Window'][_0x25b7c1(0x2e9)][_0x25b7c1(0x21d)](this);const _0x5b4828=this['itemWindowRect'](),_0x14a219=_0x5b4828['x'],_0x5a5e71=_0x5b4828['y'],_0x210992=_0x5b4828[_0x25b7c1(0x1f0)],_0x2dd0b8=_0x5b4828[_0x25b7c1(0x1af)]-this[_0x25b7c1(0x24f)](0x2,![]);return new Rectangle(_0x14a219,_0x5a5e71,_0x210992,_0x2dd0b8);},Scene_Skill['prototype'][_0x4f089c(0x213)]=function(){const _0x1bde1b=_0x4f089c,_0x11847f=this[_0x1bde1b(0x18a)]();this[_0x1bde1b(0x341)]=new Window_SkillLearnConfirm(_0x11847f),this[_0x1bde1b(0x2b3)](this[_0x1bde1b(0x341)]),this['_skillLearnConfirmWindow'][_0x1bde1b(0x2e8)]('ok',this[_0x1bde1b(0x2b1)][_0x1bde1b(0x30c)](this)),this['_skillLearnConfirmWindow'][_0x1bde1b(0x2e8)](_0x1bde1b(0x1d5),this[_0x1bde1b(0x23a)][_0x1bde1b(0x30c)](this)),this[_0x1bde1b(0x341)][_0x1bde1b(0x226)]();const _0x1e0889=VisuMZ['SkillLearnSystem'][_0x1bde1b(0x188)]['Window'][_0x1bde1b(0x33e)];this[_0x1bde1b(0x341)][_0x1bde1b(0x16e)](_0x1e0889);},Scene_Skill[_0x4f089c(0x2c6)]['skillLearnConfirmWindow']=function(){const _0x2f2905=_0x4f089c;if(VisuMZ['SkillLearnSystem'][_0x2f2905(0x188)][_0x2f2905(0x25e)][_0x2f2905(0x2d3)])return VisuMZ[_0x2f2905(0x20a)][_0x2f2905(0x188)]['Window'][_0x2f2905(0x2d3)][_0x2f2905(0x21d)](this);const _0xa96596=this['itemWindowRect'](),_0x583244=_0xa96596['width'],_0x2ec64c=this['calcWindowHeight'](0x2,![]),_0x43bb84=_0xa96596['x'],_0x2b04d4=_0xa96596['y']+_0xa96596[_0x2f2905(0x1af)]-_0x2ec64c;return new Rectangle(_0x43bb84,_0x2b04d4,_0x583244,_0x2ec64c);},VisuMZ['SkillLearnSystem'][_0x4f089c(0x2b7)]=Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x197)],Scene_Skill['prototype']['onItemOk']=function(){const _0x1d5d78=_0x4f089c;this[_0x1d5d78(0x293)][_0x1d5d78(0x275)]()?this[_0x1d5d78(0x293)]['item']()&&this[_0x1d5d78(0x293)][_0x1d5d78(0x20d)]()[_0x1d5d78(0x233)]?this['onSkillLearnCollapseStypeID']():this[_0x1d5d78(0x255)]():VisuMZ[_0x1d5d78(0x20a)][_0x1d5d78(0x2b7)][_0x1d5d78(0x21d)](this);},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x383)]=function(){const _0x12d759=_0x4f089c;this['_itemWindow']['toggleSkillLearnStypeCollapse'](),this[_0x12d759(0x293)]['activate']();},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x255)]=function(){const _0x308e61=_0x4f089c;this['_itemWindow'][_0x308e61(0x226)](),this[_0x308e61(0x36b)][_0x308e61(0x335)](),this[_0x308e61(0x36b)][_0x308e61(0x364)](),this[_0x308e61(0x341)][_0x308e61(0x335)](),this[_0x308e61(0x341)]['refresh'](),this[_0x308e61(0x341)][_0x308e61(0x17d)](),this['_skillLearnConfirmWindow'][_0x308e61(0x37d)](0x0);},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x2b1)]=function(){const _0x52bb70=_0x4f089c;VisuMZ[_0x52bb70(0x20a)]['Settings'][_0x52bb70(0x1b9)][_0x52bb70(0x1f4)]?this[_0x52bb70(0x27c)]():this['finishSkillLearnAnimation']();},Scene_Skill['prototype'][_0x4f089c(0x23a)]=function(){const _0xed172b=_0x4f089c;this['_itemWindow'][_0xed172b(0x335)](),this[_0xed172b(0x293)][_0xed172b(0x17d)](),this['_skillLearnIngredientsWindow']['hide'](),this[_0xed172b(0x341)][_0xed172b(0x226)]();},Scene_Skill['prototype'][_0x4f089c(0x1bb)]=function(){const _0xf268ce=_0x4f089c;this[_0xf268ce(0x315)][_0xf268ce(0x169)]=!![],this['_skillLearnAnimationPlaying']=![],SoundManager[_0xf268ce(0x166)](),this[_0xf268ce(0x1a9)]()['processPayForSkillLearnSystem'](this[_0xf268ce(0x20d)]()),this['onSkillLearnConfirmCancel'](),this['_itemWindow'][_0xf268ce(0x364)](),this[_0xf268ce(0x172)][_0xf268ce(0x364)]();for(;;){if(this[_0xf268ce(0x293)]['index']()<=0x0)break;if(this[_0xf268ce(0x293)]['item']())break;this[_0xf268ce(0x293)][_0xf268ce(0x300)](Math[_0xf268ce(0x1b4)](this['_itemWindow'][_0xf268ce(0x329)]()-0x1,0x0));}},VisuMZ['SkillLearnSystem']['Scene_Skill_update']=Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x186)],Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x186)]=function(){const _0x494422=_0x4f089c;VisuMZ[_0x494422(0x20a)][_0x494422(0x22e)][_0x494422(0x21d)](this),this[_0x494422(0x22d)]();},Scene_Skill[_0x4f089c(0x2c6)]['startSkillLearnAnimation']=function(){const _0x3c7a34=_0x4f089c;this[_0x3c7a34(0x198)]=!![],this[_0x3c7a34(0x19b)]=0x14,this['_windowLayer']['visible']=VisuMZ[_0x3c7a34(0x20a)][_0x3c7a34(0x188)][_0x3c7a34(0x1b9)][_0x3c7a34(0x2b0)]||![],this['createSkillLearnSkillSprite']();},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x1e4)]=function(){const _0x228d6f=_0x4f089c;this[_0x228d6f(0x384)]=new Sprite(),this[_0x228d6f(0x1a4)](this[_0x228d6f(0x384)]),this[_0x228d6f(0x2ea)](),this['setSkillLearnSkillSpriteFrame'](),this[_0x228d6f(0x277)](),this[_0x228d6f(0x2cf)](),this['createSkillLearnAnimationIDs'](),this[_0x228d6f(0x38b)](this[_0x228d6f(0x22c)]['shift']());},Scene_Skill[_0x4f089c(0x2c6)]['setSkillLearnSkillSpriteBitmap']=function(){const _0x3508a6=_0x4f089c,_0x5b2ca5=VisuMZ[_0x3508a6(0x20a)][_0x3508a6(0x31d)],_0x37f8b0=this[_0x3508a6(0x20d)]()[_0x3508a6(0x1ec)];this[_0x3508a6(0x332)]='';if(_0x37f8b0[_0x3508a6(0x2e7)](_0x5b2ca5[_0x3508a6(0x170)]))this[_0x3508a6(0x332)]=String(RegExp['$1']);else _0x37f8b0[_0x3508a6(0x2e7)](_0x5b2ca5[_0x3508a6(0x2b5)])&&(this[_0x3508a6(0x332)]=String(RegExp['$1']));this[_0x3508a6(0x205)]=new Sprite();this[_0x3508a6(0x332)]?this[_0x3508a6(0x205)][_0x3508a6(0x268)]=ImageManager[_0x3508a6(0x210)](this[_0x3508a6(0x332)]):(this['_skillLearnBitmapSprite'][_0x3508a6(0x268)]=ImageManager[_0x3508a6(0x173)]('IconSet'),this[_0x3508a6(0x205)][_0x3508a6(0x268)][_0x3508a6(0x180)]=![]);this[_0x3508a6(0x205)]['anchor']['x']=0.5,this[_0x3508a6(0x205)][_0x3508a6(0x36a)]['y']=0.5;if(!this[_0x3508a6(0x332)]){const _0x2e62b4=VisuMZ[_0x3508a6(0x20a)][_0x3508a6(0x188)]['Animation'][_0x3508a6(0x219)]||0x8;this['_skillLearnBitmapSprite'][_0x3508a6(0x2b4)]['x']=_0x2e62b4,this['_skillLearnBitmapSprite'][_0x3508a6(0x2b4)]['y']=_0x2e62b4;}this[_0x3508a6(0x384)][_0x3508a6(0x1a4)](this[_0x3508a6(0x205)]);},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x1c3)]=function(){const _0x524a9a=_0x4f089c;if(this['_learnPicture'])return;const _0x46f6e9=this[_0x524a9a(0x20d)](),_0x212575=_0x46f6e9['iconIndex'],_0x5664b8=ImageManager[_0x524a9a(0x340)],_0x5e005e=ImageManager[_0x524a9a(0x2fe)],_0x502040=_0x212575%0x10*_0x5664b8,_0x534394=Math['floor'](_0x212575/0x10)*_0x5e005e;this[_0x524a9a(0x205)][_0x524a9a(0x206)](_0x502040,_0x534394,_0x5664b8,_0x5e005e);},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x277)]=function(){const _0x24997c=_0x4f089c;this['_skillLearnIconSprite']['x']=Math['round'](Graphics[_0x24997c(0x1f0)]/0x2);const _0x47fc49=Math[_0x24997c(0x294)](ImageManager[_0x24997c(0x2fe)]*this['_skillLearnIconSprite']['scale']['y']);this[_0x24997c(0x384)]['y']=Math['round']((Graphics['height']+_0x47fc49)/0x2);},Scene_Skill['prototype']['setSkillLearnSkillSpriteOpacity']=function(){const _0x34816b=_0x4f089c;this[_0x34816b(0x35f)]=VisuMZ['SkillLearnSystem'][_0x34816b(0x188)][_0x34816b(0x1b9)][_0x34816b(0x2f0)]||0x1,this['item']()[_0x34816b(0x1ec)]['match'](VisuMZ[_0x34816b(0x20a)][_0x34816b(0x31d)][_0x34816b(0x32c)])&&(this[_0x34816b(0x35f)]=Math[_0x34816b(0x1b4)](Number(RegExp['$1']),0x1)),this[_0x34816b(0x384)][_0x34816b(0x308)]=0x0;},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x2e2)]=function(){const _0x288c48=_0x4f089c;this[_0x288c48(0x22c)]=[],this[_0x288c48(0x20d)]()[_0x288c48(0x1ec)][_0x288c48(0x2e7)](VisuMZ['SkillLearnSystem'][_0x288c48(0x31d)][_0x288c48(0x374)])?this[_0x288c48(0x22c)]=RegExp['$1'][_0x288c48(0x312)](',')[_0x288c48(0x1cc)](_0x1bf3c1=>Number(_0x1bf3c1)):this[_0x288c48(0x22c)]=this[_0x288c48(0x22c)][_0x288c48(0x348)](VisuMZ[_0x288c48(0x20a)][_0x288c48(0x188)][_0x288c48(0x1b9)][_0x288c48(0x2c9)]);},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x38b)]=function(_0x3e8ad5){const _0x554f65=_0x4f089c,_0x56b86b=$dataAnimations[_0x3e8ad5];if(!_0x56b86b)return;const _0x321af3=this[_0x554f65(0x17c)](_0x56b86b);this['_skillLearnAnimationSprite']=new(_0x321af3?Sprite_AnimationMV:Sprite_Animation)();const _0x21b678=[this[_0x554f65(0x384)]],_0x6129da=0x0;this[_0x554f65(0x27b)][_0x554f65(0x38e)](_0x21b678,_0x56b86b,![],_0x6129da,null),this[_0x554f65(0x1a4)](this[_0x554f65(0x27b)]);},Scene_Skill['prototype'][_0x4f089c(0x17c)]=function(_0x3486cf){const _0x2e1dc4=_0x4f089c;return!!_0x3486cf[_0x2e1dc4(0x1e1)];},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x22d)]=function(){const _0x240968=_0x4f089c;if(!this[_0x240968(0x198)])return;this[_0x240968(0x26e)](),this['updateSkillLearnAnimationSprite'](),this[_0x240968(0x251)]()&&this[_0x240968(0x273)]();},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x26e)]=function(){const _0x1531a2=_0x4f089c;this['_skillLearnIconSprite'][_0x1531a2(0x308)]+=this[_0x1531a2(0x35f)];},Scene_Skill['prototype']['updateSkillLearnAnimationSprite']=function(){const _0x7adf5a=_0x4f089c;if(!this['_skillLearnAnimationSprite'])return;if(this[_0x7adf5a(0x27b)][_0x7adf5a(0x1bd)]())return;this[_0x7adf5a(0x238)](),this[_0x7adf5a(0x38b)](this[_0x7adf5a(0x22c)][_0x7adf5a(0x222)]());},Scene_Skill['prototype'][_0x4f089c(0x238)]=function(){const _0x3345f7=_0x4f089c;if(!this['_skillLearnAnimationSprite'])return;this[_0x3345f7(0x18b)](this['_skillLearnAnimationSprite']),this[_0x3345f7(0x27b)][_0x3345f7(0x1d6)](),this[_0x3345f7(0x27b)]=undefined;},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x304)]=function(){const _0x71fa7d=_0x4f089c;if(!this['_skillLearnIconSprite'])return;this['removeChild'](this[_0x71fa7d(0x384)]),this['_skillLearnIconSprite'][_0x71fa7d(0x1d6)](),this[_0x71fa7d(0x384)]=undefined;},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x251)]=function(){const _0x3b1de8=_0x4f089c;if(TouchInput[_0x3b1de8(0x278)]())return!![];if(Input[_0x3b1de8(0x1b5)]('ok'))return!![];if(Input[_0x3b1de8(0x1b5)](_0x3b1de8(0x1d5)))return!![];if(this[_0x3b1de8(0x384)][_0x3b1de8(0x308)]<0xff)return![];if(this['_skillLearnAnimationSprite'])return![];return this['_skillLearnAnimationWait']--<=0x0;},Scene_Skill[_0x4f089c(0x2c6)][_0x4f089c(0x273)]=function(){const _0x40fb8f=_0x4f089c;this['destroySkillLearnAnimationSprite'](),this[_0x40fb8f(0x304)](),this[_0x40fb8f(0x1bb)](),TouchInput[_0x40fb8f(0x26f)](),Input[_0x40fb8f(0x26f)]();},Window_Base[_0x4f089c(0x2c6)][_0x4f089c(0x2c1)]=function(_0x29cb49,_0x353cf5,_0x46e3b9,_0x41325e,_0x16282b){const _0x4e907a=_0x4f089c;_0x16282b=_0x16282b||'left';const _0x5a9c5c=_0x4e907a(0x30f)[_0x4e907a(0x253)](ImageManager['abilityPointsIcon']),_0x232644=TextManager[_0x4e907a(0x2c0)],_0x13a448=_0x232644[_0x4e907a(0x253)](_0x29cb49,TextManager['abilityPointsAbbr'],_0x5a9c5c,TextManager['abilityPointsFull']),_0x2f7db9=this[_0x4e907a(0x237)](_0x13a448)[_0x4e907a(0x1f0)];if(_0x16282b===_0x4e907a(0x196))_0x353cf5+=0x0;else _0x16282b==='center'?_0x353cf5+=Math[_0x4e907a(0x294)]((_0x41325e-_0x2f7db9)/0x2):_0x353cf5+=_0x41325e-_0x2f7db9;this[_0x4e907a(0x319)](_0x13a448,_0x353cf5,_0x46e3b9);},Window_Base['prototype'][_0x4f089c(0x378)]=function(_0x26c0b6,_0x3fb4c0,_0x265a93,_0x24fbfb,_0x5f23ea,_0x5f2c30){const _0x19796e=_0x4f089c,_0x5a4cbf=_0x26c0b6[_0x19796e(0x2c8)](_0x3fb4c0);this[_0x19796e(0x2c1)](_0x5a4cbf,_0x265a93,_0x24fbfb,_0x5f23ea,_0x5f2c30);},Window_Base[_0x4f089c(0x2c6)][_0x4f089c(0x264)]=function(_0x4241,_0x254799,_0x3b840b,_0x536bb6,_0xca1ec6){const _0x4e2478=_0x4f089c;_0xca1ec6=_0xca1ec6||_0x4e2478(0x196);const _0x3ab4e3=_0x4e2478(0x30f)[_0x4e2478(0x253)](ImageManager[_0x4e2478(0x30a)]),_0xf65e37=TextManager[_0x4e2478(0x321)],_0x34d94e=_0xf65e37[_0x4e2478(0x253)](_0x4241,TextManager[_0x4e2478(0x353)],_0x3ab4e3,TextManager[_0x4e2478(0x2db)]),_0x158480=this['textSizeEx'](_0x34d94e)[_0x4e2478(0x1f0)];if(_0xca1ec6==='left')_0x254799+=0x0;else _0xca1ec6===_0x4e2478(0x16d)?_0x254799+=Math[_0x4e2478(0x294)]((_0x536bb6-_0x158480)/0x2):_0x254799+=_0x536bb6-_0x158480;this[_0x4e2478(0x319)](_0x34d94e,_0x254799,_0x3b840b);},Window_Base[_0x4f089c(0x2c6)][_0x4f089c(0x258)]=function(_0x533ba3,_0x35ea37,_0x7fefca,_0x282a2d,_0xcc369c,_0x4cf59e){const _0xa23f73=_0x4f089c,_0x4591a9=_0x533ba3[_0xa23f73(0x26d)](_0x35ea37);this[_0xa23f73(0x264)](_0x4591a9,_0x7fefca,_0x282a2d,_0xcc369c,_0x4cf59e);},VisuMZ['SkillLearnSystem'][_0x4f089c(0x16b)]=Window_SkillType['prototype'][_0x4f089c(0x27d)],Window_SkillType[_0x4f089c(0x2c6)]['makeCommandList']=function(){const _0x55cb22=_0x4f089c;VisuMZ['SkillLearnSystem'][_0x55cb22(0x16b)][_0x55cb22(0x21d)](this),this['addSkillLearnSystemCommand']();},Window_SkillType[_0x4f089c(0x2c6)][_0x4f089c(0x245)]=function(){const _0x5e6990=_0x4f089c;if(!$gameSystem[_0x5e6990(0x2a8)]())return;if(!this['_actor'])return;let _0x3cae99=this[_0x5e6990(0x266)]();const _0x470e95=this[_0x5e6990(0x2bb)]['skillTypes']()[0x0];this['addCommand'](_0x3cae99,'skill',!![],'skillLearn');},Window_SkillType[_0x4f089c(0x2c6)][_0x4f089c(0x266)]=function(){const _0x12905a=_0x4f089c;let _0x43a873=TextManager[_0x12905a(0x1e2)];if(_0x43a873[_0x12905a(0x2e7)](/\\I\[(\d+)\]/i))return _0x43a873;if(!Imported['VisuMZ_1_SkillsStatesCore'])return _0x43a873;if(this[_0x12905a(0x284)]()===_0x12905a(0x2a9))return _0x43a873;const _0x107da5=TextManager[_0x12905a(0x28e)];return _0x12905a(0x36f)[_0x12905a(0x253)](_0x107da5,_0x43a873);},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x21a)]=Window_SkillStatus[_0x4f089c(0x2c6)][_0x4f089c(0x364)],Window_SkillStatus[_0x4f089c(0x2c6)][_0x4f089c(0x364)]=function(){const _0x154a23=_0x4f089c;this['resetFontSettings'](),this['isSkillLearnMode']()?this[_0x154a23(0x2ca)]():VisuMZ[_0x154a23(0x20a)][_0x154a23(0x21a)][_0x154a23(0x21d)](this);},Window_SkillStatus['prototype']['isSkillLearnMode']=function(){const _0x428c06=_0x4f089c,_0x341297=SceneManager[_0x428c06(0x1d1)];if(!_0x341297)return![];const _0x3dcc57=_0x341297[_0x428c06(0x293)];if(!_0x3dcc57)return![];return _0x3dcc57[_0x428c06(0x275)]&&_0x3dcc57['isSkillLearnMode']();},Window_SkillStatus[_0x4f089c(0x2c6)][_0x4f089c(0x2ca)]=function(){const _0x27c450=_0x4f089c;if(!this[_0x27c450(0x2bb)])return;Window_StatusBase[_0x27c450(0x2c6)][_0x27c450(0x364)][_0x27c450(0x21d)](this);if(VisuMZ['SkillLearnSystem'][_0x27c450(0x188)][_0x27c450(0x191)]['StatusWindowDrawJS']){VisuMZ['SkillLearnSystem']['Settings']['General']['StatusWindowDrawJS'][_0x27c450(0x21d)](this);return;}const _0x41401c=this[_0x27c450(0x301)]()/0x2,_0x5c2d9a=this[_0x27c450(0x2aa)],_0xe6caa8=_0x5c2d9a/0x2-this[_0x27c450(0x261)]()*1.5;this[_0x27c450(0x244)](this[_0x27c450(0x2bb)],_0x41401c+0x1,0x0,0x90,_0x5c2d9a),this['drawActorSimpleStatus'](this[_0x27c450(0x2bb)],_0x41401c+0xb4,_0xe6caa8);let _0x3b9d56=this[_0x27c450(0x301)]()/0x2+0xb4+0xb4+0xb4,_0x533369=this[_0x27c450(0x217)]-_0x3b9d56-0x2;if(_0x533369<0x12c)return;const _0x14f564=this[_0x27c450(0x24a)](),_0x827382=Math[_0x27c450(0x2f3)](this[_0x27c450(0x2aa)]/this[_0x27c450(0x261)]()),_0x149ad2=Math[_0x27c450(0x1b2)](_0x14f564[_0x27c450(0x381)]/_0x827382);let _0x174b66=_0x3b9d56,_0x3b23bf=Math[_0x27c450(0x1b4)](Math[_0x27c450(0x294)]((this[_0x27c450(0x2aa)]-this[_0x27c450(0x261)]()*Math['ceil'](_0x14f564[_0x27c450(0x381)]/_0x149ad2))/0x2),0x0);const _0x396bc2=_0x3b23bf;let _0x1f700e=(this[_0x27c450(0x217)]-_0x174b66-this['itemPadding']()*0x2*_0x149ad2)/_0x149ad2;_0x149ad2===0x1&&(_0x1f700e=Math[_0x27c450(0x33a)](ImageManager[_0x27c450(0x247)],_0x1f700e),_0x174b66+=Math[_0x27c450(0x294)]((this[_0x27c450(0x217)]-_0x174b66-this[_0x27c450(0x22a)]()*0x2-_0x1f700e)/0x2));for(const _0x3957f9 of _0x14f564){switch(_0x3957f9){case'AP':this[_0x27c450(0x378)](this[_0x27c450(0x2bb)],this['_actor'][_0x27c450(0x1ba)]()['id'],_0x174b66,_0x3b23bf,_0x1f700e,_0x27c450(0x265));break;case'CP':Imported[_0x27c450(0x24c)]&&this[_0x27c450(0x36c)](this[_0x27c450(0x2bb)],this[_0x27c450(0x2bb)][_0x27c450(0x1ba)]()['id'],_0x174b66,_0x3b23bf,_0x1f700e,'right');break;case'JP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x27c450(0x232)](this['_actor'],this['_actor'][_0x27c450(0x1ba)]()['id'],_0x174b66,_0x3b23bf,_0x1f700e,_0x27c450(0x265));break;case'SP':this[_0x27c450(0x258)](this[_0x27c450(0x2bb)],this['_actor'][_0x27c450(0x1ba)]()['id'],_0x174b66,_0x3b23bf,_0x1f700e,_0x27c450(0x265));break;case'Gold':this[_0x27c450(0x397)]($gameParty[_0x27c450(0x1ff)](),TextManager[_0x27c450(0x29b)],_0x174b66,_0x3b23bf,_0x1f700e);break;default:continue;}_0x3b23bf+=this[_0x27c450(0x261)](),_0x3b23bf+this[_0x27c450(0x261)]()>this[_0x27c450(0x2aa)]&&(_0x3b23bf=_0x396bc2,_0x174b66+=_0x1f700e+this[_0x27c450(0x22a)]()*0x2);}},Window_SkillStatus[_0x4f089c(0x2c6)][_0x4f089c(0x24a)]=function(){const _0x54d18d=_0x4f089c,_0x340250=JsonEx[_0x54d18d(0x2bf)](VisuMZ['SkillLearnSystem']['Settings'][_0x54d18d(0x191)][_0x54d18d(0x344)]);return!Imported[_0x54d18d(0x24c)]&&(_0x340250[_0x54d18d(0x1f5)]('CP'),_0x340250[_0x54d18d(0x1f5)]('JP')),_0x340250[_0x54d18d(0x1f5)](_0x54d18d(0x356))[_0x54d18d(0x1f5)](_0x54d18d(0x288))[_0x54d18d(0x1f5)]('Armor');},VisuMZ[_0x4f089c(0x20a)]['Window_SkillList_initialize']=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x320)],Window_SkillList['prototype'][_0x4f089c(0x320)]=function(_0xe0b7e8){const _0x28383f=_0x4f089c;this[_0x28383f(0x2e6)]=[],VisuMZ[_0x28383f(0x20a)]['Window_SkillList_initialize'][_0x28383f(0x21d)](this,_0xe0b7e8);},Window_SkillList['prototype']['isSkillLearnMode']=function(){const _0x463971=_0x4f089c;return this[_0x463971(0x248)]===_0x463971(0x359);},Window_SkillList['prototype'][_0x4f089c(0x17f)]=function(){const _0x273e31=_0x4f089c;return VisuMZ['SkillLearnSystem']['Settings'][_0x273e31(0x191)][_0x273e31(0x1a6)]??![];},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x23d)]=function(){const _0x35abf9=_0x4f089c;return VisuMZ['SkillLearnSystem'][_0x35abf9(0x188)][_0x35abf9(0x191)][_0x35abf9(0x27f)]??0x10;},VisuMZ[_0x4f089c(0x20a)]['Window_SkillList_setActor']=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x184)],Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x184)]=function(_0x21340c){const _0x21c41c=_0x4f089c;this[_0x21c41c(0x2bb)]!==_0x21340c&&(this[_0x21c41c(0x2e6)]=[]),VisuMZ[_0x21c41c(0x20a)]['Window_SkillList_setActor']['call'](this,_0x21340c);},VisuMZ[_0x4f089c(0x20a)]['Window_SkillList_setStypeId']=Window_SkillList[_0x4f089c(0x2c6)]['setStypeId'],Window_SkillList['prototype'][_0x4f089c(0x1e0)]=function(_0x1ba590){const _0x962c4f=_0x4f089c,_0x4dd538=this[_0x962c4f(0x275)]();VisuMZ['SkillLearnSystem']['Window_SkillList_setStypeId'][_0x962c4f(0x21d)](this,_0x1ba590);if(_0x4dd538!==this[_0x962c4f(0x275)]()){const _0x5f345d=SceneManager['_scene'];if(!_0x5f345d)return;const _0x66c9c8=_0x5f345d[_0x962c4f(0x172)];if(_0x66c9c8)_0x66c9c8[_0x962c4f(0x364)]();}},VisuMZ[_0x4f089c(0x20a)]['Window_SkillList_maxCols']=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x224)],Window_SkillList['prototype'][_0x4f089c(0x224)]=function(){const _0x57ee80=_0x4f089c;return this['isSkillLearnMode']()?0x1:VisuMZ[_0x57ee80(0x20a)][_0x57ee80(0x28a)][_0x57ee80(0x21d)](this);},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x1c0)]=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x2a5)],Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x2a5)]=function(){const _0x582d72=_0x4f089c;this[_0x582d72(0x2bb)]&&this[_0x582d72(0x275)]()?this[_0x582d72(0x21e)]():VisuMZ['SkillLearnSystem'][_0x582d72(0x1c0)][_0x582d72(0x21d)](this);},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x21e)]=function(){const _0x47f736=_0x4f089c,_0xcb1d88=this[_0x47f736(0x17f)](),_0x773f0d=DataManager[_0x47f736(0x311)](this[_0x47f736(0x2bb)][_0x47f736(0x1ba)]()['id']);_0xcb1d88?this[_0x47f736(0x1ce)](_0x773f0d):this['_data']=_0x773f0d['map'](_0x1baa7c=>$dataSkills[_0x1baa7c])[_0x47f736(0x1b1)](_0x15b4bd=>this[_0x47f736(0x1de)](_0x15b4bd));if(Imported[_0x47f736(0x2e1)]){let _0x59925e=!![];if(this[_0x47f736(0x17f)]()){this['makeSkillLearnStypeCategory'](_0x47f736(0x36d));if(this[_0x47f736(0x2e6)]['includes']('passives'))_0x59925e=![];}const _0x267ba4=DataManager[_0x47f736(0x36e)](this[_0x47f736(0x2bb)]['currentClass']()['id']),_0x61e046=_0x267ba4[_0x47f736(0x1cc)](_0x5ca14a=>$dataStates[_0x5ca14a])[_0x47f736(0x1b1)](_0x4cf462=>this[_0x47f736(0x1de)](_0x4cf462));if(_0x61e046[_0x47f736(0x381)]>0x0&&_0x59925e)this[_0x47f736(0x2d1)]();else this[_0x47f736(0x17f)]()&&_0x61e046[_0x47f736(0x381)]<=0x0&&this[_0x47f736(0x313)][_0x47f736(0x21c)]();}},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x1ce)]=function(_0x203124){const _0x5e7d0f=_0x4f089c;this['_data']=[];const _0x41f6e2=_0x203124[_0x5e7d0f(0x1cc)](_0x2f9afb=>$dataSkills[_0x2f9afb]?$dataSkills[_0x2f9afb][_0x5e7d0f(0x367)]:0x0)[_0x5e7d0f(0x1f5)](0x0)[_0x5e7d0f(0x1b1)]((_0x45f9bf,_0x5aec1c,_0x40ffa7)=>_0x40ffa7[_0x5e7d0f(0x21f)](_0x45f9bf)===_0x5aec1c)['sort']((_0x294d44,_0xb15a58)=>_0x294d44-_0xb15a58);for(const _0x3c98db of _0x41f6e2){this[_0x5e7d0f(0x2da)](_0x3c98db);const _0x2a8877=_0x203124[_0x5e7d0f(0x1cc)](_0xf1a04e=>$dataSkills[_0xf1a04e])[_0x5e7d0f(0x1b1)](_0x3a5c24=>this[_0x5e7d0f(0x1de)](_0x3a5c24)&&_0x3a5c24[_0x5e7d0f(0x367)]===_0x3c98db);_0x2a8877[_0x5e7d0f(0x381)]<=0x0&&this[_0x5e7d0f(0x313)][_0x5e7d0f(0x21c)]();if(this[_0x5e7d0f(0x2e6)]['includes'](_0x3c98db))continue;this[_0x5e7d0f(0x313)]=this[_0x5e7d0f(0x313)][_0x5e7d0f(0x348)](_0x2a8877);}},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x2da)]=function(_0x2c6c59){const _0x13eaf1=_0x4f089c,_0x6c6868=Imported[_0x13eaf1(0x193)]?VisuMZ[_0x13eaf1(0x212)][_0x13eaf1(0x188)][_0x13eaf1(0x365)]:{},_0x2c1345=$dataSystem[_0x13eaf1(0x194)][_0x13eaf1(0x1de)](_0x2c6c59);let _0x34be64=_0x2c1345?_0x6c6868[_0x13eaf1(0x1b6)]:_0x6c6868[_0x13eaf1(0x298)];_0x2c6c59==='passives'&&(_0x34be64=ImageManager[_0x13eaf1(0x1b3)]['icon']);let _0x498e07=$dataSystem[_0x13eaf1(0x271)][_0x2c6c59];_0x2c6c59===_0x13eaf1(0x36d)&&(_0x498e07=TextManager[_0x13eaf1(0x1b3)][_0x13eaf1(0x281)]),_0x498e07[_0x13eaf1(0x2e7)](/\\I\[(\d+)\]/i)&&(_0x34be64=Number(RegExp['$1']),_0x498e07=_0x498e07[_0x13eaf1(0x32f)](/\\I\[(\d+)\]/gi,'')[_0x13eaf1(0x23f)]()),_0x2c6c59!=='passives'&&(_0x498e07=TextManager['skillLearnStypeCategory'][_0x13eaf1(0x253)](_0x498e07)),this[_0x13eaf1(0x313)][_0x13eaf1(0x33c)]({'id':-0x1,'name':_0x498e07,'iconIndex':_0x34be64||0x0,'description':'','disabled':!![],'stypeCategory':!![],'stypeId':_0x2c6c59,'note':_0x13eaf1(0x336)[_0x13eaf1(0x253)](TextManager[_0x13eaf1(0x317)])});},VisuMZ[_0x4f089c(0x20a)]['Window_SkillList_alterSkillName']=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x1c7)],Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x1c7)]=function(_0x136bd4){const _0x36b8ea=_0x4f089c;VisuMZ[_0x36b8ea(0x20a)][_0x36b8ea(0x1a2)]['call'](this,_0x136bd4);if(!_0x136bd4)return;if(!_0x136bd4[_0x36b8ea(0x233)])return;let _0x4dc488=_0x136bd4['name'];const _0x708bb=this[_0x36b8ea(0x2e6)]['includes'](_0x136bd4[_0x36b8ea(0x367)]);_0x708bb?_0x4dc488=TextManager[_0x36b8ea(0x1c9)][_0x36b8ea(0x253)](_0x4dc488):_0x4dc488=TextManager[_0x36b8ea(0x2af)][_0x36b8ea(0x253)](_0x4dc488),_0x136bd4[_0x36b8ea(0x1ae)]=_0x4dc488;},Window_SkillList['prototype'][_0x4f089c(0x316)]=function(){const _0x5d5771=_0x4f089c,_0xc4590d=this[_0x5d5771(0x20d)](),_0x45a740=_0xc4590d[_0x5d5771(0x367)];this[_0x5d5771(0x2e6)][_0x5d5771(0x1de)](_0x45a740)?this[_0x5d5771(0x2e6)][_0x5d5771(0x1f5)](_0x45a740):this[_0x5d5771(0x2e6)][_0x5d5771(0x33c)](_0x45a740),this[_0x5d5771(0x364)]();},VisuMZ['SkillLearnSystem']['Window_SkillList_includes']=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x1de)],Window_SkillList[_0x4f089c(0x2c6)]['includes']=function(_0x36ccdc){const _0x40d28e=_0x4f089c;return this[_0x40d28e(0x275)]()?this['skillLearnIncludes'](_0x36ccdc):VisuMZ['SkillLearnSystem'][_0x40d28e(0x19f)][_0x40d28e(0x21d)](this,_0x36ccdc);},Window_SkillList['prototype'][_0x4f089c(0x2a0)]=function(_0x1b6487){const _0x3cb475=_0x4f089c;if(!_0x1b6487)return![];if(_0x1b6487['name']['length']<=0x0)return![];if(_0x1b6487[_0x3cb475(0x1ae)][_0x3cb475(0x2e7)](/-----/i))return![];if(VisuMZ['SkillLearnSystem']['Settings'][_0x3cb475(0x191)][_0x3cb475(0x2d5)]){if(DataManager[_0x3cb475(0x330)](_0x1b6487)){if(this[_0x3cb475(0x2bb)][_0x3cb475(0x297)](_0x1b6487['id']))return![];}if(_0x1b6487&&_0x1b6487[_0x3cb475(0x1c2)]!==undefined&&Imported[_0x3cb475(0x2e1)]){if(this[_0x3cb475(0x2bb)][_0x3cb475(0x286)](_0x1b6487))return![];}}const _0x1b9038=VisuMZ[_0x3cb475(0x20a)][_0x3cb475(0x382)](_0x1b6487,'jsLearnShow');if(VisuMZ[_0x3cb475(0x20a)]['JS'][_0x1b9038]){if(!VisuMZ[_0x3cb475(0x20a)]['JS'][_0x1b9038][_0x3cb475(0x21d)](this,this[_0x3cb475(0x2bb)],_0x1b6487))return![];}const _0x4251e8=VisuMZ[_0x3cb475(0x20a)][_0x3cb475(0x31d)],_0x2232e3=_0x1b6487[_0x3cb475(0x1ec)];if(_0x2232e3[_0x3cb475(0x2e7)](_0x4251e8[_0x3cb475(0x32e)])){const _0x13d4e6=Number(RegExp['$1']);if(_0x13d4e6>this[_0x3cb475(0x2bb)][_0x3cb475(0x287)])return![];}if(_0x2232e3[_0x3cb475(0x2e7)](_0x4251e8['LearnShowSkillsAll'])){const _0x2b7aa9=String(RegExp['$1'])[_0x3cb475(0x312)](',')['map'](_0x2e7030=>_0x2e7030[_0x3cb475(0x23f)]());;for(const _0x575996 of _0x2b7aa9){let _0x184bdb=0x0;const _0x447570=/^\d+$/[_0x3cb475(0x1df)](_0x575996);_0x447570?_0x184bdb=Number(_0x575996):_0x184bdb=DataManager[_0x3cb475(0x24e)](_0x575996);if(!this[_0x3cb475(0x2bb)][_0x3cb475(0x297)](_0x184bdb))return![];}}if(_0x2232e3['match'](_0x4251e8[_0x3cb475(0x346)])){const _0x332d7a=String(RegExp['$1'])[_0x3cb475(0x312)](',')['map'](_0x273d4e=>_0x273d4e[_0x3cb475(0x23f)]());;let _0x2de13b=![];for(const _0x34787e of _0x332d7a){let _0x313aa2=0x0;const _0x166432=/^\d+$/['test'](_0x34787e);_0x166432?_0x313aa2=Number(_0x34787e):_0x313aa2=DataManager[_0x3cb475(0x24e)](_0x34787e);if(this[_0x3cb475(0x2bb)][_0x3cb475(0x297)](_0x313aa2)){_0x2de13b=!![];break;}}if(!_0x2de13b)return![];}if(_0x2232e3[_0x3cb475(0x2e7)](_0x4251e8[_0x3cb475(0x2f2)])){const _0x50760a=String(RegExp['$1'])['split'](',')[_0x3cb475(0x1cc)](_0x458ab7=>Number(_0x458ab7));for(const _0x410064 of _0x50760a){if(!$gameSwitches[_0x3cb475(0x174)](_0x410064))return![];}}if(_0x2232e3[_0x3cb475(0x2e7)](_0x4251e8[_0x3cb475(0x30b)])){const _0x38fe83=String(RegExp['$1'])[_0x3cb475(0x312)](',')[_0x3cb475(0x1cc)](_0x1b01d7=>Number(_0x1b01d7));let _0x3e2688=![];for(const _0x121803 of _0x38fe83){if($gameSwitches[_0x3cb475(0x174)](_0x121803)){_0x3e2688=!![];break;}}if(!_0x3e2688)return![];}return _0x1b6487;},VisuMZ[_0x4f089c(0x20a)]['Window_SkillList_isEnabled']=Window_SkillList['prototype'][_0x4f089c(0x2ac)],Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x2ac)]=function(_0x3c8005){const _0x86819e=_0x4f089c;return this[_0x86819e(0x2bb)]&&this['isSkillLearnMode']()?this['isSkillLearnEnabled'](_0x3c8005):VisuMZ[_0x86819e(0x20a)][_0x86819e(0x203)][_0x86819e(0x21d)](this,_0x3c8005);},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x307)]=Window_SkillList['prototype']['drawItem'],Window_SkillList['prototype']['drawItem']=function(_0x482fe9){const _0x4e2db6=_0x4f089c;this[_0x4e2db6(0x18e)]=this[_0x4e2db6(0x275)]();if(this['isSkillLearnMode']()&&this['separateSkillLearnByStypeID']()){const _0xc7445e=this['_data'][_0x482fe9];this[_0x4e2db6(0x2e3)]=!_0xc7445e[_0x4e2db6(0x233)];}VisuMZ['SkillLearnSystem'][_0x4e2db6(0x307)][_0x4e2db6(0x21d)](this,_0x482fe9),this[_0x4e2db6(0x18e)]=![],this[_0x4e2db6(0x275)]()&&this[_0x4e2db6(0x17f)]()&&(this['_indentSkillLearnRect']=undefined);},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x38d)]=Window_SkillList['prototype'][_0x4f089c(0x276)],Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x276)]=function(_0x5ebebb){const _0x3bf73f=_0x4f089c,_0x1cc5a1=VisuMZ[_0x3bf73f(0x20a)][_0x3bf73f(0x38d)][_0x3bf73f(0x21d)](this,_0x5ebebb);if(this['_indentSkillLearnRect']){const _0x4ef35a=this[_0x3bf73f(0x23d)]();_0x1cc5a1['x']+=_0x4ef35a,_0x1cc5a1[_0x3bf73f(0x1f0)]-=_0x4ef35a;}return _0x1cc5a1;},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x362)]=function(_0x197920){const _0x414ded=_0x4f089c;if(!_0x197920)return![];if(_0x197920['name']['length']<=0x0)return![];if(_0x197920['name']['match'](/-----/i))return![];if(DataManager[_0x414ded(0x330)](_0x197920)){if(this[_0x414ded(0x2bb)][_0x414ded(0x297)](_0x197920['id']))return![];}if(Imported['VisuMZ_2_EquipPassiveSys']&&DataManager[_0x414ded(0x342)](_0x197920)){if(this['_actor'][_0x414ded(0x286)](_0x197920))return![];}if(this['_skillLearnSystem_drawItemMode']){if(!this['_actor'][_0x414ded(0x185)](_0x197920))return![];return this['_actor'][_0x414ded(0x1d7)](_0x197920);}return!![];},VisuMZ[_0x4f089c(0x20a)][_0x4f089c(0x223)]=Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x18f)],Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x18f)]=function(_0xcc3539,_0x6db50d,_0xc9427f,_0x1be0dd){const _0x34a6ea=_0x4f089c;this['isSkillLearnMode']()?this[_0x34a6ea(0x352)](_0xcc3539)?this['drawSkillLearnRequirements'](_0xcc3539,_0x6db50d,_0xc9427f,_0x1be0dd):this[_0x34a6ea(0x30d)](_0xcc3539,_0x6db50d,_0xc9427f,_0x1be0dd):VisuMZ['SkillLearnSystem']['Window_SkillList_drawSkillCost'][_0x34a6ea(0x21d)](this,_0xcc3539,_0x6db50d,_0xc9427f,_0x1be0dd);},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x352)]=function(_0x210446){const _0x145cc0=_0x4f089c;return this[_0x145cc0(0x2bb)]&&!this['_actor']['meetRequirementsForSkillLearnSystem'](_0x210446);},Window_SkillList[_0x4f089c(0x2c6)]['drawSkillLearnRequirements']=function(_0x382c40,_0x293cfb,_0x5652e1,_0x739e85){const _0x220c9c=_0x4f089c,_0xfa6178=this[_0x220c9c(0x37f)](_0x382c40),_0x2c69b4=this['textSizeEx'](_0xfa6178)['width'];_0x293cfb+=_0x739e85-_0x2c69b4,this['drawTextEx'](_0xfa6178,_0x293cfb,_0x5652e1);},Window_SkillList['prototype'][_0x4f089c(0x37f)]=function(_0x323d60){const _0x39fc13=_0x4f089c,_0x3e2596=VisuMZ[_0x39fc13(0x20a)][_0x39fc13(0x188)][_0x39fc13(0x191)],_0x15e583=TextManager['skillLearnReqSeparatorFmt'],_0x298cf5=VisuMZ['SkillLearnSystem'][_0x39fc13(0x31d)],_0xc92776=_0x323d60[_0x39fc13(0x1ec)];let _0x5d302b='',_0x55588e='';const _0x54470b=[_0x39fc13(0x1ca),_0x39fc13(0x38f),_0x39fc13(0x1cb),_0x39fc13(0x23b)];for(const _0xf380d2 of _0x54470b){switch(_0xf380d2){case _0x39fc13(0x1ca):if(_0xc92776[_0x39fc13(0x2e7)](_0x298cf5[_0x39fc13(0x259)])){const _0x35b4d7=Number(RegExp['$1']);_0x55588e=TextManager[_0x39fc13(0x192)][_0x39fc13(0x253)](_0x35b4d7,TextManager[_0x39fc13(0x287)],TextManager['levelA']),_0x55588e[_0x39fc13(0x381)]>0x0&&(_0x5d302b!==''?_0x5d302b=_0x15e583[_0x39fc13(0x253)](_0x5d302b,_0x55588e):_0x5d302b=_0x55588e);}break;case _0x39fc13(0x38f):if(_0xc92776[_0x39fc13(0x2e7)](_0x298cf5[_0x39fc13(0x35b)])){const _0x565481=String(RegExp['$1'])[_0x39fc13(0x312)](',')[_0x39fc13(0x1cc)](_0x3513fc=>_0x3513fc[_0x39fc13(0x23f)]());;for(const _0x199ae4 of _0x565481){let _0x70f707=0x0;const _0x132365=/^\d+$/[_0x39fc13(0x1df)](_0x199ae4);_0x132365?_0x70f707=Number(_0x199ae4):_0x70f707=DataManager['getSkillIdWithName'](_0x199ae4);if($dataSkills[_0x70f707]){const _0xc94a0e=$dataSkills[_0x70f707];_0x55588e=TextManager[_0x39fc13(0x2a6)]['format'](_0x39fc13(0x30f)[_0x39fc13(0x253)](_0xc94a0e[_0x39fc13(0x17b)]),_0xc94a0e[_0x39fc13(0x1ae)]),_0x55588e[_0x39fc13(0x381)]>0x0&&(_0x5d302b!==''?_0x5d302b=_0x15e583[_0x39fc13(0x253)](_0x5d302b,_0x55588e):_0x5d302b=_0x55588e);}}}if(_0xc92776[_0x39fc13(0x2e7)](_0x298cf5['LearnReqSkillsAny'])){const _0x5b2f1a=String(RegExp['$1'])[_0x39fc13(0x312)](',')[_0x39fc13(0x1cc)](_0x5ddb75=>_0x5ddb75[_0x39fc13(0x23f)]());;for(const _0x55095f of _0x5b2f1a){let _0x1f6ee0=0x0;const _0x34a4a0=/^\d+$/['test'](_0x55095f);_0x34a4a0?_0x1f6ee0=Number(_0x55095f):_0x1f6ee0=DataManager[_0x39fc13(0x24e)](_0x55095f);if($dataSkills[_0x1f6ee0]){const _0x265f00=$dataSkills[_0x1f6ee0];_0x55588e=TextManager[_0x39fc13(0x2a6)][_0x39fc13(0x253)]('\x5cI[%1]'['format'](_0x265f00[_0x39fc13(0x17b)]),_0x265f00[_0x39fc13(0x1ae)]),_0x55588e[_0x39fc13(0x381)]>0x0&&(_0x5d302b!==''?_0x5d302b=_0x15e583[_0x39fc13(0x253)](_0x5d302b,_0x55588e):_0x5d302b=_0x55588e);}}}break;case'SWITCHES':if(_0xc92776[_0x39fc13(0x2e7)](_0x298cf5[_0x39fc13(0x1c1)])){const _0x36ebf0=String(RegExp['$1'])['split'](',')[_0x39fc13(0x1cc)](_0xdaa836=>_0xdaa836[_0x39fc13(0x23f)]());;for(const _0x2c0d03 of _0x36ebf0){$dataSystem[_0x39fc13(0x290)][_0x2c0d03]&&(_0x55588e=TextManager[_0x39fc13(0x207)]['format']($dataSystem[_0x39fc13(0x290)][_0x2c0d03]||''),_0x55588e[_0x39fc13(0x381)]>0x0&&(_0x5d302b!==''?_0x5d302b=_0x15e583[_0x39fc13(0x253)](_0x5d302b,_0x55588e):_0x5d302b=_0x55588e));}}if(_0xc92776[_0x39fc13(0x2e7)](_0x298cf5[_0x39fc13(0x34c)])){const _0x1a1697=String(RegExp['$1'])[_0x39fc13(0x312)](',')[_0x39fc13(0x1cc)](_0x3880ef=>_0x3880ef[_0x39fc13(0x23f)]());;for(const _0x44c852 of _0x1a1697){$dataSystem[_0x39fc13(0x290)][_0x44c852]&&(_0x55588e=TextManager['skillLearnReqSwitchFmt']['format']($dataSystem[_0x39fc13(0x290)][_0x44c852]||''),_0x55588e[_0x39fc13(0x381)]>0x0&&(_0x5d302b!==''?_0x5d302b=_0x15e583['format'](_0x5d302b,_0x55588e):_0x5d302b=_0x55588e));}}break;case _0x39fc13(0x23b):const _0x3dbe5b=VisuMZ[_0x39fc13(0x20a)][_0x39fc13(0x382)](_0x323d60,_0x39fc13(0x306));VisuMZ['SkillLearnSystem']['JS'][_0x3dbe5b]&&(_0x55588e=VisuMZ[_0x39fc13(0x20a)]['JS'][_0x3dbe5b]['call'](this,this[_0x39fc13(0x2bb)],_0x323d60),_0x55588e[_0x39fc13(0x381)]>0x0&&(_0x5d302b!==''?_0x5d302b=_0x15e583[_0x39fc13(0x253)](_0x5d302b,_0x55588e):_0x5d302b=_0x55588e));break;}}return _0x5d302b=TextManager[_0x39fc13(0x2ce)]['format'](_0x5d302b),_0x5d302b[_0x39fc13(0x23f)]();},Window_SkillList['prototype'][_0x4f089c(0x30d)]=function(_0x2ce9ca,_0x59a72f,_0x547c08,_0x39fa6c){const _0x495cb1=_0x4f089c,_0x4e26fb=this[_0x495cb1(0x202)](_0x2ce9ca),_0x41dc48=this['textSizeEx'](_0x4e26fb)['width'];_0x59a72f+=_0x39fa6c-_0x41dc48,this[_0x495cb1(0x319)](_0x4e26fb,_0x59a72f,_0x547c08);},Window_SkillList[_0x4f089c(0x2c6)][_0x4f089c(0x202)]=function(_0x32ed3a){const _0x31f680=_0x4f089c;if(this[_0x31f680(0x2bb)]){if(DataManager[_0x31f680(0x330)](_0x32ed3a)&&this[_0x31f680(0x2bb)]['isLearnedSkill'](_0x32ed3a['id']))return TextManager[_0x31f680(0x200)];if(DataManager['isState'](_0x32ed3a)&&this[_0x31f680(0x2bb)][_0x31f680(0x286)](_0x32ed3a))return TextManager[_0x31f680(0x200)];}const _0x5a70ab=VisuMZ[_0x31f680(0x20a)][_0x31f680(0x188)][_0x31f680(0x191)],_0x15dd59=TextManager[_0x31f680(0x296)];let _0x2e4869='';const _0x43ef83=JsonEx[_0x31f680(0x2bf)](_0x5a70ab[_0x31f680(0x344)]);_0x43ef83['push'](_0x31f680(0x2ed));for(const _0x4e9f03 of _0x43ef83){if(!_0x4e9f03)continue;const _0x181122=this['createSkillLearnCostText'](_0x32ed3a,_0x4e9f03)[_0x31f680(0x23f)]();_0x181122[_0x31f680(0x381)]>0x0&&(_0x2e4869!==''?_0x2e4869=_0x15dd59[_0x31f680(0x253)](_0x2e4869,_0x181122):_0x2e4869=_0x181122);}return _0x2e4869[_0x31f680(0x23f)]();},Window_SkillList[_0x4f089c(0x2c6)]['createSkillLearnCostText']=function(_0x3e2b9c,_0x1192f9){const _0x4fff9e=_0x4f089c;let _0x4798ca=0x0,_0x1268e6='',_0x57326a='';switch(_0x1192f9[_0x4fff9e(0x354)]()[_0x4fff9e(0x23f)]()){case'AP':_0x4798ca=DataManager[_0x4fff9e(0x25c)](_0x3e2b9c);if(_0x4798ca>0x0)return _0x1268e6=TextManager[_0x4fff9e(0x2c0)],_0x1268e6[_0x4fff9e(0x253)](_0x4798ca,TextManager[_0x4fff9e(0x363)],_0x4fff9e(0x30f)[_0x4fff9e(0x253)](ImageManager['abilityPointsIcon']),TextManager[_0x4fff9e(0x216)]);break;case'SP':_0x4798ca=DataManager[_0x4fff9e(0x23c)](_0x3e2b9c);if(_0x4798ca>0x0)return _0x1268e6=TextManager[_0x4fff9e(0x321)],_0x1268e6['format'](_0x4798ca,TextManager[_0x4fff9e(0x353)],_0x4fff9e(0x30f)[_0x4fff9e(0x253)](ImageManager[_0x4fff9e(0x30a)]),TextManager[_0x4fff9e(0x2db)]);break;case _0x4fff9e(0x178):_0x4798ca=DataManager['getSkillLearnItemCost'](_0x3e2b9c),_0x1268e6=TextManager[_0x4fff9e(0x323)];for(const _0x5aad3b of _0x4798ca){if(!_0x5aad3b)continue;const _0x1a6b67=$dataItems[_0x5aad3b['id']];if(!_0x1a6b67)continue;const _0x12ebe1=_0x1268e6[_0x4fff9e(0x253)](_0x5aad3b[_0x4fff9e(0x2c3)],_0x4fff9e(0x30f)['format'](_0x1a6b67[_0x4fff9e(0x17b)]),_0x1a6b67[_0x4fff9e(0x1ae)]);_0x57326a!==''?_0x57326a=TextManager[_0x4fff9e(0x296)][_0x4fff9e(0x253)](_0x57326a,_0x12ebe1):_0x57326a=_0x12ebe1;}return _0x57326a;case _0x4fff9e(0x1e5):_0x4798ca=DataManager[_0x4fff9e(0x16f)](_0x3e2b9c),_0x1268e6=TextManager[_0x4fff9e(0x2b9)];for(const _0x4dcd02 of _0x4798ca){if(!_0x4dcd02)continue;const _0x2c8644=$dataWeapons[_0x4dcd02['id']];if(!_0x2c8644)continue;const _0x1b27fe=_0x1268e6['format'](_0x4dcd02['quantity'],'\x5cI[%1]'[_0x4fff9e(0x253)](_0x2c8644[_0x4fff9e(0x17b)]),_0x2c8644[_0x4fff9e(0x1ae)]);_0x57326a!==''?_0x57326a=TextManager[_0x4fff9e(0x296)][_0x4fff9e(0x253)](_0x57326a,_0x1b27fe):_0x57326a=_0x1b27fe;}return _0x57326a;case _0x4fff9e(0x1f7):_0x4798ca=DataManager[_0x4fff9e(0x34f)](_0x3e2b9c),_0x1268e6=TextManager[_0x4fff9e(0x208)];for(const _0x1f8c3c of _0x4798ca){if(!_0x1f8c3c)continue;const _0x2130fc=$dataArmors[_0x1f8c3c['id']];if(!_0x2130fc)continue;const _0x1aa81e=_0x1268e6['format'](_0x1f8c3c['quantity'],'\x5cI[%1]'['format'](_0x2130fc[_0x4fff9e(0x17b)]),_0x2130fc[_0x4fff9e(0x1ae)]);_0x57326a!==''?_0x57326a=TextManager[_0x4fff9e(0x296)][_0x4fff9e(0x253)](_0x57326a,_0x1aa81e):_0x57326a=_0x1aa81e;}return _0x57326a;case _0x4fff9e(0x2dd):_0x4798ca=DataManager[_0x4fff9e(0x1cd)](_0x3e2b9c);if(_0x4798ca>0x0)return _0x1268e6=TextManager[_0x4fff9e(0x328)],_0x1268e6[_0x4fff9e(0x253)](_0x4798ca,Imported['VisuMZ_0_CoreEngine']?'\x5cI[%1]'[_0x4fff9e(0x253)](VisuMZ[_0x4fff9e(0x1b0)][_0x4fff9e(0x188)][_0x4fff9e(0x19a)][_0x4fff9e(0x2f8)]):TextManager[_0x4fff9e(0x29b)],TextManager[_0x4fff9e(0x29b)]);break;case'CUSTOM':const _0x240dae=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x3e2b9c,_0x4fff9e(0x2e4));if(VisuMZ[_0x4fff9e(0x20a)]['JS'][_0x240dae])return VisuMZ[_0x4fff9e(0x20a)]['JS'][_0x240dae][_0x4fff9e(0x21d)](this,this[_0x4fff9e(0x2bb)],_0x3e2b9c);break;case'CP':if(Imported[_0x4fff9e(0x24c)]){_0x4798ca=DataManager['getSkillLearnClassPointCost'](_0x3e2b9c);if(_0x4798ca>0x0)return _0x1268e6=TextManager[_0x4fff9e(0x2ad)],_0x1268e6[_0x4fff9e(0x253)](_0x4798ca,TextManager[_0x4fff9e(0x1d4)],'\x5cI[%1]'['format'](ImageManager['classPointsIcon']),TextManager[_0x4fff9e(0x1e3)]);break;}case'JP':if(Imported[_0x4fff9e(0x24c)]){_0x4798ca=DataManager[_0x4fff9e(0x1f6)](_0x3e2b9c);if(_0x4798ca>0x0)return _0x1268e6=TextManager[_0x4fff9e(0x1bf)],_0x1268e6[_0x4fff9e(0x253)](_0x4798ca,TextManager[_0x4fff9e(0x33f)],_0x4fff9e(0x30f)['format'](ImageManager[_0x4fff9e(0x325)]),TextManager['jobPointsFull']);break;}}return'';},Window_ActorCommand[_0x4f089c(0x2c6)]['isSkillLearnMode']=function(){return![];};function Window_SkillLearnIngredients(){this['initialize'](...arguments);}Window_SkillLearnIngredients['prototype']=Object['create'](Window_Base[_0x4f089c(0x2c6)]),Window_SkillLearnIngredients['prototype'][_0x4f089c(0x1a0)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients['prototype']['initialize']=function(_0x49b671){const _0x1fa803=_0x4f089c;Window_Base[_0x1fa803(0x2c6)][_0x1fa803(0x320)][_0x1fa803(0x21d)](this,_0x49b671);},Window_SkillLearnIngredients[_0x4f089c(0x2c6)][_0x4f089c(0x364)]=function(){const _0x2c7b6a=_0x4f089c;this[_0x2c7b6a(0x1a5)][_0x2c7b6a(0x26f)](),this[_0x2c7b6a(0x389)](),this[_0x2c7b6a(0x234)]()?this['drawRequirements']():this['drawIngredients']();},Window_SkillLearnIngredients[_0x4f089c(0x2c6)][_0x4f089c(0x396)]=function(_0x3c94ff,_0x5b29d7,_0x4e44ad,_0x178d98){const _0x168948=_0x4f089c,_0x5b23a1=this[_0x168948(0x237)](_0x3c94ff)[_0x168948(0x1f0)],_0x20b768=_0x5b29d7+Math['round']((_0x178d98-_0x5b23a1)/0x2);this['drawTextEx'](_0x3c94ff,_0x20b768,_0x4e44ad);},Window_SkillLearnIngredients['prototype']['drawTextExRightAlign']=function(_0xba6bd3,_0x1f3f10,_0x37430d,_0x548be4){const _0x1328b8=_0x4f089c,_0x21e769=this[_0x1328b8(0x237)](_0xba6bd3)[_0x1328b8(0x1f0)],_0x763fd4=_0x1f3f10+Math[_0x1328b8(0x294)](_0x548be4-_0x21e769);this[_0x1328b8(0x319)](_0xba6bd3,_0x763fd4,_0x37430d);},Window_SkillLearnIngredients[_0x4f089c(0x2c6)][_0x4f089c(0x234)]=function(){const _0x2d363b=_0x4f089c,_0x3f8c83=SceneManager[_0x2d363b(0x1d1)][_0x2d363b(0x20d)](),_0x34021b=SceneManager[_0x2d363b(0x1d1)][_0x2d363b(0x1a9)]();return _0x34021b&&!_0x34021b['meetRequirementsForSkillLearnSystem'](_0x3f8c83);},Window_SkillLearnIngredients['prototype']['drawRequirements']=function(){const _0x52fdd7=_0x4f089c,_0x166ff8=SceneManager[_0x52fdd7(0x1d1)]['item'](),_0x4b9008=VisuMZ[_0x52fdd7(0x20a)][_0x52fdd7(0x31d)],_0x45afe0=_0x166ff8[_0x52fdd7(0x1ec)],_0x28b029=SceneManager[_0x52fdd7(0x1d1)][_0x52fdd7(0x1a9)](),_0x3a17d0=this['lineHeight'](),_0x302787=TextManager[_0x52fdd7(0x35e)],_0x4a0ed5=TextManager[_0x52fdd7(0x28f)];let _0x4bdc7c=0x0,_0x2fd0a0=0x0;const _0x3db180=_0x52fdd7(0x30f)[_0x52fdd7(0x253)](_0x166ff8['iconIndex']),_0xe14ef6=TextManager[_0x52fdd7(0x379)][_0x52fdd7(0x253)](_0x3db180,_0x166ff8[_0x52fdd7(0x1ae)]);this[_0x52fdd7(0x396)](_0xe14ef6,_0x4bdc7c,_0x2fd0a0,this[_0x52fdd7(0x217)]),_0x2fd0a0+=Math['round'](_0x3a17d0*1.5);let _0x3aaf4e='';if(_0x45afe0['match'](_0x4b9008['LearnReqLevel'])){const _0x104251=Number(RegExp['$1']),_0x11f63c=TextManager[_0x52fdd7(0x37b)][_0x52fdd7(0x253)](_0x104251,TextManager['level'],TextManager['levelA']),_0x3b1c1a=_0x28b029[_0x52fdd7(0x287)]>=_0x104251?_0x302787:_0x4a0ed5;_0x3aaf4e+=_0x3b1c1a[_0x52fdd7(0x253)](_0x11f63c)+'\x0a';}if(_0x45afe0[_0x52fdd7(0x2e7)](_0x4b9008[_0x52fdd7(0x35b)])){const _0x312977=String(RegExp['$1'])[_0x52fdd7(0x312)](',')[_0x52fdd7(0x1cc)](_0x2063b0=>_0x2063b0[_0x52fdd7(0x23f)]());;for(const _0x4a0c3c of _0x312977){let _0x3cbf1a=0x0;const _0x557312=/^\d+$/[_0x52fdd7(0x1df)](_0x4a0c3c);_0x557312?_0x3cbf1a=Number(_0x4a0c3c):_0x3cbf1a=DataManager[_0x52fdd7(0x24e)](_0x4a0c3c);const _0x56d4d1=$dataSkills[_0x3cbf1a];if(_0x56d4d1){const _0x332092=TextManager[_0x52fdd7(0x250)][_0x52fdd7(0x253)](_0x52fdd7(0x30f)[_0x52fdd7(0x253)](_0x56d4d1[_0x52fdd7(0x17b)]),_0x56d4d1[_0x52fdd7(0x1ae)]),_0x49c4d3=_0x28b029[_0x52fdd7(0x297)](_0x3cbf1a)?_0x302787:_0x4a0ed5;_0x3aaf4e+=_0x49c4d3[_0x52fdd7(0x253)](_0x332092)+'\x0a';}}}if(_0x45afe0[_0x52fdd7(0x2e7)](_0x4b9008[_0x52fdd7(0x241)])){const _0x1384eb=String(RegExp['$1'])[_0x52fdd7(0x312)](',')[_0x52fdd7(0x1cc)](_0x2e1f19=>_0x2e1f19['trim']());;for(const _0x4e82e1 of _0x1384eb){let _0x1a9378=0x0;const _0x364eea=/^\d+$/[_0x52fdd7(0x1df)](_0x4e82e1);_0x364eea?_0x1a9378=Number(_0x4e82e1):_0x1a9378=DataManager['getSkillIdWithName'](_0x4e82e1);const _0x4f56a6=$dataSkills[_0x1a9378];if(_0x4f56a6){const _0x378fa8=TextManager[_0x52fdd7(0x250)][_0x52fdd7(0x253)](_0x52fdd7(0x30f)['format'](_0x4f56a6[_0x52fdd7(0x17b)]),_0x4f56a6[_0x52fdd7(0x1ae)]),_0x412d9f=_0x28b029[_0x52fdd7(0x297)](_0x1a9378)?_0x302787:_0x4a0ed5;_0x3aaf4e+=_0x412d9f['format'](_0x378fa8)+'\x0a';}}}if(_0x45afe0[_0x52fdd7(0x2e7)](_0x4b9008[_0x52fdd7(0x1c1)])){const _0x2aafff=String(RegExp['$1'])['split'](',')[_0x52fdd7(0x1cc)](_0x2f336a=>Number(_0x2f336a));for(const _0x6698ee of _0x2aafff){const _0x9b706e=$dataSystem[_0x52fdd7(0x290)][_0x6698ee],_0x3c98b7=$gameSwitches[_0x52fdd7(0x174)](_0x6698ee)?_0x302787:_0x4a0ed5;_0x3aaf4e+=_0x3c98b7[_0x52fdd7(0x253)](_0x9b706e)+'\x0a';}}if(_0x45afe0['match'](_0x4b9008[_0x52fdd7(0x34c)])){const _0x367097=String(RegExp['$1'])[_0x52fdd7(0x312)](',')[_0x52fdd7(0x1cc)](_0x518687=>Number(_0x518687));for(const _0x37a37e of _0x367097){const _0x13acb2=$dataSystem[_0x52fdd7(0x290)][_0x37a37e],_0x44efb5=$gameSwitches['value'](_0x37a37e)?_0x302787:_0x4a0ed5;_0x3aaf4e+=_0x44efb5['format'](_0x13acb2)+'\x0a';}}const _0xfad628=VisuMZ[_0x52fdd7(0x20a)][_0x52fdd7(0x382)](_0x166ff8,_0x52fdd7(0x2fa));if(VisuMZ[_0x52fdd7(0x20a)]['JS'][_0xfad628]){const _0x17c655=VisuMZ['SkillLearnSystem']['JS'][_0xfad628][_0x52fdd7(0x21d)](this,_0x28b029,_0x166ff8);_0x3aaf4e+=_0x17c655+'\x0a';}this['drawTextExCenterAlign'](_0x3aaf4e,_0x4bdc7c,_0x2fd0a0,this[_0x52fdd7(0x217)]);},Window_SkillLearnIngredients[_0x4f089c(0x2c6)]['drawIngredients']=function(){const _0x566208=_0x4f089c,_0x585b3c=SceneManager['_scene']['item'](),_0x42dbe8=SceneManager[_0x566208(0x1d1)][_0x566208(0x1a9)](),_0xe46522=this[_0x566208(0x24a)]();let _0x3dffaf=0x0,_0x28663a=0x0;const _0x193777=this[_0x566208(0x261)](),_0x3bef24=Math[_0x566208(0x294)](this[_0x566208(0x217)]/0x2),_0x5193b3=Math[_0x566208(0x294)](this[_0x566208(0x217)]/0x4),_0x123482=0x0,_0x2b4376=_0x3bef24,_0x4f8243=_0x3bef24+_0x5193b3;let _0x4a3a00=_0x566208(0x30f)[_0x566208(0x253)](_0x585b3c[_0x566208(0x17b)]),_0x48e54d=_0x585b3c[_0x566208(0x1ae)];Imported[_0x566208(0x2e1)]&&DataManager[_0x566208(0x342)](_0x585b3c)&&(_0x4a3a00=_0x566208(0x30f)[_0x566208(0x253)](DataManager['getEquipPassiveIcon'](_0x585b3c)),_0x48e54d=DataManager[_0x566208(0x229)](_0x585b3c));let _0x155b62=TextManager[_0x566208(0x1a8)][_0x566208(0x253)](_0x4a3a00,_0x48e54d);this[_0x566208(0x396)](_0x155b62,_0x3dffaf,_0x28663a,this['innerWidth']),_0x28663a+=_0x193777,this[_0x566208(0x396)](TextManager[_0x566208(0x322)],_0x123482,_0x28663a,_0x3bef24),this[_0x566208(0x396)](TextManager[_0x566208(0x18c)],_0x2b4376,_0x28663a,_0x5193b3),this[_0x566208(0x396)](TextManager[_0x566208(0x269)],_0x4f8243,_0x28663a,_0x5193b3),_0x28663a+=_0x193777;const _0x53398e=_0x123482+this['itemPadding']();for(const _0x5ae706 of _0xe46522){this[_0x566208(0x389)]();let _0x1b3289='',_0x4a7495=0x0,_0x562449=0x0,_0x5580c6='';switch(_0x5ae706['toUpperCase']()[_0x566208(0x23f)]()){case'AP':_0x4a7495=DataManager[_0x566208(0x25c)](_0x585b3c);if(_0x4a7495<=0x0)continue;this['drawAbilityPoints'](_0x4a7495,_0x2b4376,_0x28663a,_0x5193b3,_0x566208(0x265)),_0x1b3289='\x5cI[%1]%2'[_0x566208(0x253)](ImageManager[_0x566208(0x1db)],TextManager[_0x566208(0x216)]),this[_0x566208(0x319)](_0x1b3289,_0x53398e,_0x28663a),_0x562449=_0x42dbe8[_0x566208(0x2c8)](),this['drawAbilityPoints'](_0x562449,_0x4f8243,_0x28663a,_0x5193b3-this['itemPadding'](),_0x566208(0x265));break;case'SP':_0x4a7495=DataManager[_0x566208(0x23c)](_0x585b3c);if(_0x4a7495<=0x0)continue;this['drawSkillPoints'](_0x4a7495,_0x2b4376,_0x28663a,_0x5193b3,_0x566208(0x265)),_0x1b3289=_0x566208(0x36f)[_0x566208(0x253)](ImageManager[_0x566208(0x30a)],TextManager[_0x566208(0x2db)]),this['drawTextEx'](_0x1b3289,_0x53398e,_0x28663a),_0x562449=_0x42dbe8['getSkillPoints'](),this[_0x566208(0x264)](_0x562449,_0x4f8243,_0x28663a,_0x5193b3-this[_0x566208(0x22a)](),_0x566208(0x265));break;case _0x566208(0x2dd):_0x4a7495=DataManager[_0x566208(0x1cd)](_0x585b3c);if(_0x4a7495<=0x0)continue;this['drawCurrencyValue'](_0x4a7495,TextManager[_0x566208(0x29b)],_0x2b4376,_0x28663a,_0x5193b3);const _0x485892=Imported['VisuMZ_0_CoreEngine']?_0x566208(0x30f)[_0x566208(0x253)](VisuMZ[_0x566208(0x1b0)]['Settings'][_0x566208(0x19a)]['GoldIcon']):TextManager[_0x566208(0x29b)];_0x1b3289=_0x566208(0x387)[_0x566208(0x253)](_0x485892,TextManager['currencyUnit']),this[_0x566208(0x319)](_0x1b3289,_0x53398e,_0x28663a),_0x562449=$gameParty[_0x566208(0x1ff)](),this['drawCurrencyValue'](_0x562449,TextManager['currencyUnit'],_0x4f8243,_0x28663a,_0x5193b3-this['itemPadding']());break;case _0x566208(0x178):const _0x3d92f7=DataManager[_0x566208(0x283)](_0x585b3c);if(_0x3d92f7['length']<=0x0)continue;for(const _0x45aef9 of _0x3d92f7){if(!_0x45aef9)continue;const _0x38cf79=$dataItems[_0x45aef9['id']];_0x5580c6=TextManager[_0x566208(0x323)],this[_0x566208(0x2a7)](_0x38cf79,_0x53398e,_0x28663a,_0x3bef24-_0x53398e),_0x1b3289=_0x5580c6[_0x566208(0x253)](_0x45aef9['quantity'],_0x566208(0x30f)[_0x566208(0x253)](_0x38cf79[_0x566208(0x17b)]),_0x38cf79['name']),this[_0x566208(0x372)](_0x1b3289,_0x2b4376,_0x28663a,_0x5193b3),_0x1b3289=_0x5580c6[_0x566208(0x253)]($gameParty[_0x566208(0x183)](_0x38cf79),_0x566208(0x30f)[_0x566208(0x253)](_0x38cf79[_0x566208(0x17b)]),_0x38cf79[_0x566208(0x1ae)]),this[_0x566208(0x372)](_0x1b3289,_0x4f8243,_0x28663a,_0x5193b3-this[_0x566208(0x22a)]()),_0x28663a+=_0x193777;if(_0x28663a+_0x193777>this['innerHeight'])return;}continue;break;case _0x566208(0x1e5):const _0xae9661=DataManager['getSkillLearnWeaponCost'](_0x585b3c);if(_0xae9661[_0x566208(0x381)]<=0x0)continue;for(const _0x41ff08 of _0xae9661){if(!_0x41ff08)continue;const _0x5d7211=$dataWeapons[_0x41ff08['id']];_0x5580c6=TextManager['skillLearnWeaponFmt'],this[_0x566208(0x2a7)](_0x5d7211,_0x53398e,_0x28663a,_0x3bef24-_0x53398e),_0x1b3289=_0x5580c6[_0x566208(0x253)](_0x41ff08[_0x566208(0x2c3)],_0x566208(0x30f)[_0x566208(0x253)](_0x5d7211[_0x566208(0x17b)]),_0x5d7211[_0x566208(0x1ae)]),this[_0x566208(0x372)](_0x1b3289,_0x2b4376,_0x28663a,_0x5193b3),_0x1b3289=_0x5580c6[_0x566208(0x253)]($gameParty[_0x566208(0x183)](_0x5d7211),_0x566208(0x30f)[_0x566208(0x253)](_0x5d7211[_0x566208(0x17b)]),_0x5d7211[_0x566208(0x1ae)]),this['drawTextExRightAlign'](_0x1b3289,_0x4f8243,_0x28663a,_0x5193b3-this[_0x566208(0x22a)]()),_0x28663a+=_0x193777;if(_0x28663a+_0x193777>this[_0x566208(0x2aa)])return;}continue;break;case'ARMOR':const _0x53e6e1=DataManager[_0x566208(0x34f)](_0x585b3c);if(_0x53e6e1[_0x566208(0x381)]<=0x0)continue;for(const _0x267ac2 of _0x53e6e1){if(!_0x267ac2)continue;const _0x179c56=$dataArmors[_0x267ac2['id']];_0x5580c6=TextManager[_0x566208(0x208)],this[_0x566208(0x2a7)](_0x179c56,_0x53398e,_0x28663a,_0x3bef24-_0x53398e),_0x1b3289=_0x5580c6[_0x566208(0x253)](_0x267ac2['quantity'],_0x566208(0x30f)[_0x566208(0x253)](_0x179c56[_0x566208(0x17b)]),_0x179c56[_0x566208(0x1ae)]),this['drawTextExRightAlign'](_0x1b3289,_0x2b4376,_0x28663a,_0x5193b3),_0x1b3289=_0x5580c6[_0x566208(0x253)]($gameParty[_0x566208(0x183)](_0x179c56),_0x566208(0x30f)[_0x566208(0x253)](_0x179c56[_0x566208(0x17b)]),_0x179c56[_0x566208(0x1ae)]),this['drawTextExRightAlign'](_0x1b3289,_0x4f8243,_0x28663a,_0x5193b3-this[_0x566208(0x22a)]()),_0x28663a+=_0x193777;if(_0x28663a+_0x193777>this[_0x566208(0x2aa)])return;}continue;break;case _0x566208(0x23b):const _0x241a3b=VisuMZ[_0x566208(0x20a)]['createKeyJS'](_0x585b3c,_0x566208(0x27e));if(VisuMZ['SkillLearnSystem']['JS'][_0x241a3b])_0x1b3289=VisuMZ[_0x566208(0x20a)]['JS'][_0x241a3b][_0x566208(0x21d)](this,_0x42dbe8,_0x585b3c),this[_0x566208(0x319)](_0x1b3289,_0x53398e,_0x28663a);else continue;break;case'CP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x4a7495=DataManager[_0x566208(0x376)](_0x585b3c)||0x0;if(_0x4a7495<=0x0)continue;this['drawClassPoints'](_0x4a7495,_0x2b4376,_0x28663a,_0x5193b3,_0x566208(0x265)),_0x1b3289=_0x566208(0x36f)[_0x566208(0x253)](ImageManager['classPointsIcon'],TextManager[_0x566208(0x1e3)]),this[_0x566208(0x319)](_0x1b3289,_0x53398e,_0x28663a),_0x562449=_0x42dbe8['getClassPoints'](),this['drawClassPoints'](_0x562449,_0x4f8243,_0x28663a,_0x5193b3-this['itemPadding'](),_0x566208(0x265));}else continue;break;case'JP':if(Imported[_0x566208(0x24c)]){_0x4a7495=DataManager[_0x566208(0x1f6)](_0x585b3c)||0x0;if(_0x4a7495<=0x0)continue;this[_0x566208(0x16a)](_0x4a7495,_0x2b4376,_0x28663a,_0x5193b3,_0x566208(0x265)),_0x1b3289=_0x566208(0x36f)['format'](ImageManager[_0x566208(0x325)],TextManager['jobPointsFull']),this[_0x566208(0x319)](_0x1b3289,_0x53398e,_0x28663a),_0x562449=_0x42dbe8[_0x566208(0x179)](),this[_0x566208(0x16a)](_0x562449,_0x4f8243,_0x28663a,_0x5193b3-this[_0x566208(0x22a)](),_0x566208(0x265));}else continue;break;default:continue;}_0x28663a+=_0x193777;if(_0x28663a+_0x193777>this[_0x566208(0x2aa)])return;}},Window_SkillLearnIngredients[_0x4f089c(0x2c6)][_0x4f089c(0x24a)]=function(){const _0x39ee5b=_0x4f089c,_0x2bd05a=JsonEx[_0x39ee5b(0x2bf)](VisuMZ[_0x39ee5b(0x20a)][_0x39ee5b(0x188)][_0x39ee5b(0x191)][_0x39ee5b(0x344)]);return _0x2bd05a[_0x39ee5b(0x33c)](_0x39ee5b(0x2ed)),_0x2bd05a;},Window_SkillLearnIngredients[_0x4f089c(0x2c6)]['showVisualGoldDisplay']=function(){return![];};function _0x3e0c(){const _0x418720=['IngredientName','createSkillLearnIngredientsWindow','ShowAnimations','remove','getSkillLearnJobPointCost','ARMOR','ShowMenu','WeaponFmt','_armorIDs','EVAL','onLoadBattleTestSkillLearnSystem','skillLearnReqSeparatorFmt','DefaultCost','gold','skillLearnAlreadyLearned','ArmorFmt','getSkillLearnCostText','Window_SkillList_isEnabled','commandName','_skillLearnBitmapSprite','setFrame','skillLearnReqSwitchFmt','skillLearnArmorFmt','542672LPhvqY','SkillLearnSystem','8EYZasK','setSkillPoints','item','Class-%1-%2','gainStartingSkillPoints','loadPicture','5JUeuqa','SkillsStatesCore','createSkillLearnConfirmWindow','initSkillPoints','ParseSkillNotetags','abilityPointsFull','innerWidth','EnemySkillPoints','Scale','Window_SkillStatus_refresh','ItemFmt','pop','call','makeSkillLearnList','indexOf','isPlaytest','MenuAccess','shift','Window_SkillList_drawSkillCost','maxCols','earnedSkillPoints','hide','drawItem','getClassPoints','getEquipPassiveName','itemPadding','clamp','_skillLearnAnimationIDs','updateSkillLearnAnimation','Scene_Skill_update','_earnedSkillPoints','loseAbilityPoints','applyItemUserEffect','drawActorJobPoints','stypeCategory','shouldDrawRequirements','AbilityPointsPlus','displayRewards','textSizeEx','destroySkillLearnAnimationSprite','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onSkillLearnConfirmCancel','CUSTOM','getSkillLearnSkillPointCost','separateSkillLearnStypeIndent','CancelCmd','trim','setupBattleTestMembers','LearnReqSkillsAny','STR','gainAbilityPoints','drawActorFace','addSkillLearnSystemCommand','AbilityPointsGain','faceWidth','_stypeId','LearnJpCost','getSkillLearnDisplayedCosts','Game_Actor_learnSkill','VisuMZ_2_ClassChangeSystem','isBattleMember','getSkillIdWithName','calcWindowHeight','skillLearnReqListSkill','isFinishedSkillLearnAnimating','326016dRHDmE','format','Game_Actor_changeClass','onSkillLearnItemOk','FullText','SkillPoints','drawActorSkillPoints','LearnReqLevel','gainRewardsSkillPoints','ConfirmCmd','getSkillLearnAbilityPointCost','addSkillPoints','Window','NUM','AbilityPointsLose','lineHeight','return\x200','learnSkill','drawSkillPoints','right','skillLearnSystemCommandName','onBattleStart','bitmap','skillLearningOwned','inBattle','reduce','earnedAbilityPoints','getSkillPoints','updateSkillLearnSpriteOpacity','clear','StartingAbilityPoints','skillTypes','skillLearnIngredientsWindowRect','processFinishSkillLearnAnimation','1774458cNaQil','isSkillLearnMode','itemLineRect','setSkillLearnSkillSpritePosition','isReleased','skillLearnCancelCmd','deadMembers','_skillLearnAnimationSprite','startSkillLearnAnimation','makeCommandList','jsLearnShowDetailTxt','SeparateIndent','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','command','AliveActors','getSkillLearnItemCost','commandStyle','ConvertParams','isLearnedEquippedPassive','level','Weapon','newPage','Window_SkillList_maxCols','abilityPointsTotal','ReqMetFmt','LearnCpCost','skillLearnIcon','skillLearnReqNotMet','switches','createSkillLearnSystemWindows','gainSkillPoints','_itemWindow','round','abilityPoints','skillLearnSeparationFmt','isLearnedSkill','IconStypeNorm','setupBattleTestMembersSkillLearnSystem','LearnArmorCost','currencyUnit','isConfirmEnabled','applyAbilityPoints','ARRAYSTR','SharedResource','skillLearnIncludes','SkillPointsLose','addCommand','Show','createConditionJS','makeItemList','skillLearnReqSkillFmt','drawItemName','isSkillLearnSystemMenuAccess','text','innerHeight','skillPointsRate','isEnabled','classPointsFmt','jsLearnJpCost','skillLearnStypeCategoryCollapse','ShowWindows','onSkillLearnConfirmOk','setSkillLearnSystemMenuAccess','addWindow','scale','bigPicture','UserGainAbilityPoints','Scene_Skill_onItemOk','description','skillLearnWeaponFmt','actor','_actor','Parse_Notetags_CreateJS','_skillIDs','getWeaponIdWithName','makeDeepCopy','abilityPointsFmt','drawAbilityPoints','GoldFmt','quantity','Skill','VictoryText','prototype','jsLearnApCost','getAbilityPoints','Animations','refreshSkillLearnSystem','SeparateExpandFmt','changePaintOpacity','Points','skillLearnReqHeaderFmt','setSkillLearnSkillSpriteOpacity','createTextJS','makeSkillLearnPassivesList','_earnedAbilityPoints','ConfirmWindow_RectJS','TextFmt','HideLearned','process_VisuMZ_SkillLearnSystem_JS','createVisibleJS','displayRewardsSkillPoints','EnemyAbilityPoints','makeSkillLearnStypeCategory','skillPointsFull','UserGainSkillPoints','GOLD','MaxResource','ClassPoints','Ability','VisuMZ_2_EquipPassiveSys','createSkillLearnAnimationIDs','_indentSkillLearnRect','jsLearnShowListTxt','LearnSkillA','_collapsedStypeIDs','match','setHandler','DetailWindow_RectJS','setSkillLearnSkillSpriteBitmap','levelUp','playOkSound','Custom','_SkillLearnSystem_preventLevelUpGain','subject','FadeSpeed','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','LearnShowSwitchesAll','floor','levelUpGainSkillPoints','isCommandEnabled','LearnSpCost','isAlive','GoldIcon','State-%1-%2','jsLearnReqDetailTxt','log','Scene_Boot_onDatabaseLoaded','AbilityPointsRate','iconHeight','453959fobZrT','smoothSelect','colSpacing','ClassChangeSystem','SkillPointsRate','destroySkillLearnSprite','JSON','jsLearnReqListTxt','Window_SkillList_drawItem','opacity','Learned','skillPointsIcon','LearnShowSwitchesAny','bind','drawSkillLearnCost','ReqSwitchFmt','\x5cI[%1]','JobPoints','getSkillLearnSkillsFromClass','split','_data','FUNC','_windowLayer','toggleSkillLearnStypeCollapse','skillLearnStypeColor','jsOnLearn','drawTextEx','loseGold','BattleManager_makeRewards','maxTurns','RegExp','%1\x20[+]','gainRewardsAbilityPoints','initialize','skillPointsFmt','skillLearningName','skillLearnItemFmt','getClassIdWithName','jobPointsIcon','Item-%1-%2','setAbilityPoints','skillLearnGoldFmt','index','traitObjects','changeClass','opacitySpeed','LearnGoldCost','LearnShowLevel','replace','isSkill','Classes','_learnPicture','LearnWeaponCost','gainAbilityPointsForMulticlasses','show','<Color:\x20%1>','IngredientOwned','STRUCT','Game_Action_applyItemUserEffect','min','applySkillLearnSystemUserEffect','push','abilityPointsRate','ConfirmWindow_BgType','jobPointsAbbr','iconWidth','_skillLearnConfirmWindow','isState','abilityPointsVisible','DisplayedCosts','189399QhoBsV','LearnShowSkillsAny','allMembers','concat','SkillPointsPlus','_skillPoints','TargetGainAbilityPoints','LearnReqSwitchesAny','LearningTitle','StartClassSkillPoints','getSkillLearnArmorCost','ARRAYSTRUCT','_rewards','shouldDrawSkillLearnRequirements','skillPointsAbbr','toUpperCase','ShowVictory','Item','skillLearnConfirmCmd','makeRewardsSkillPoints','skillLearn','process_VisuMZ_SkillLearnSystem_Notetags','LearnReqSkillsAll','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','AbilityPoints','skillLearnReqMet','_skillLearnIconSpriteOpacitySpeed','RequireFmt','LearnSkillB','isSkillLearnEnabled','abilityPointsAbbr','refresh','Skills','loseJobPoints','stypeId','getArmorIdWithName','204mhQZeM','anchor','_skillLearnIngredientsWindow','drawActorClassPoints','passives','getSkillLearnPassiveSkillsFromClass','\x5cI[%1]%2','applyItemSkillLearnSystemUserEffect','exit','drawTextExRightAlign','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','animationIDs','Sound','getSkillLearnClassPointCost','onDatabaseLoaded','drawActorAbilityPoints','skillLearnReqTitle','StartingSkillPoints','skillLearnReqListLevel','2194168LXffSW','select','skillPointsTotal','getSkillLearnRequirementText','Actors','length','createKeyJS','onSkillLearnCollapseStypeID','_skillLearnIconSprite','ReqNotMetFmt','makeRewardsAbilityPoints','%1%2','gainStartingAbilityPoints','resetFontSettings','optExtraExp','createSkillLearnAnimation','skillPointsVisible','Window_SkillList_itemLineRect','setup','SKILLS','_abilityPoints','%1\x20[-]','MAX_SAFE_INTEGER','Enemy-%1-%2','LearnItemCost','itemHeight','drawTextExCenterAlign','drawCurrencyValue','applySkillPoints','playSkillLearn','skillLearnReqListSwitch','displayRewardsAbilityPoints','visible','drawJobPoints','Window_SkillType_makeCommandList','Weapon-%1-%2','center','setBackgroundType','getSkillLearnWeaponCost','learnPicture','6609100ieUlOa','_statusWindow','loadSystem','value','AbbrText','TargetGainSkillPoints','_itemIDs','ITEM','getJobPoints','status','iconIndex','isMVAnimation','activate','gainSkillPointsForMulticlasses','separateSkillLearnByStypeID','smooth','skillPoints','PerLevelUp','numItems','setActor','meetRequirementsForSkillLearnSystem','update','initAbilityPoints','Settings','createActionJS','skillLearnConfirmWindow','removeChild','skillLearningCost','gainMulticlassRewardPoints','_skillLearnSystem_drawItemMode','drawSkillCost','getItemIdWithName','General','skillLearnReqLevelFmt','VisuMZ_1_SkillsStatesCore','magicSkills','LearnApCost','left','onItemOk','_skillLearnAnimationPlaying','sort','Gold','_skillLearnAnimationWait','add','registerCommand','version','Window_SkillList_includes','constructor','jsLearnSpCost','Window_SkillList_alterSkillName','addAbilityPoints','addChild','contents','SeparateByStypeID','create','skillLearningTitle','user','loseItem','jsLearnCpCost','LearnCostBatch','SortByIDandPriorityUsingIDs','name','height','CoreEngine','filter','ceil','EQUIP_PASSIVE_SYS','max','isTriggered','IconStypeMagic','Game_Actor_setup','members','Animation','currentClass','finishSkillLearnAnimation','loseClassPoints','isPlaying','parse','jobPointsFmt','Window_SkillList_makeItemList','LearnReqSwitchesAll','autoRemovalTiming','setSkillLearnSkillSpriteFrame','Skill-%1-%2','initSkillLearnSystemMenuAccess','21KJuUFg','alterSkillName','Game_Party_setupBattleTestMembers','skillLearnStypeCategoryExpand','LEVEL','SWITCHES','map','getSkillLearnGoldCost','makeSeparatedSkillLearnList','_weaponIDs','_classIDs','_scene','BattleManager_displayRewards','levelUpGainAbilityPoints','classPointsAbbr','cancel','destroy','canPayForSkillLearnSystem','SkillPointsGain','_SkillLearnSystem_MenuAccess','AbilityPointsFlat','abilityPointsIcon','makeRewards','learnEquippedPassive','includes','test','setStypeId','frames','skillLearnCmd','classPointsFull','createSkillLearnSkillSprite','WEAPON','StartClassAbilityPoints','createCostJS','ParseAllNotetags','isActor','PerAction','Game_System_initialize','note','Scene_Skill_create','enemy','2dgTlAc','width','Game_Battler_onBattleStart'];_0x3e0c=function(){return _0x418720;};return _0x3e0c();}function Window_SkillLearnConfirm(){const _0x379fe6=_0x4f089c;this[_0x379fe6(0x320)](...arguments);}Window_SkillLearnConfirm[_0x4f089c(0x2c6)]=Object[_0x4f089c(0x1a7)](Window_HorzCommand[_0x4f089c(0x2c6)]),Window_SkillLearnConfirm['prototype']['constructor']=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x4f089c(0x2c6)][_0x4f089c(0x320)]=function(_0x5f3ed0){const _0x7dc22b=_0x4f089c;Window_HorzCommand[_0x7dc22b(0x2c6)][_0x7dc22b(0x320)][_0x7dc22b(0x21d)](this,_0x5f3ed0);},Window_SkillLearnConfirm[_0x4f089c(0x2c6)]['maxCols']=function(){return 0x2;},Window_SkillLearnConfirm[_0x4f089c(0x2c6)][_0x4f089c(0x395)]=function(){const _0x193084=_0x4f089c;return this[_0x193084(0x2aa)];},Window_SkillLearnConfirm[_0x4f089c(0x2c6)][_0x4f089c(0x27d)]=function(){const _0x4b6171=_0x4f089c;this[_0x4b6171(0x2a2)](TextManager[_0x4b6171(0x357)],'ok',this['isConfirmEnabled']()),this[_0x4b6171(0x2a2)](TextManager[_0x4b6171(0x279)],_0x4b6171(0x1d5));},Window_SkillLearnConfirm[_0x4f089c(0x2c6)][_0x4f089c(0x29c)]=function(){const _0x163288=_0x4f089c,_0x350623=SceneManager[_0x163288(0x1d1)];if(!_0x350623)return![];const _0x24a1b6=_0x350623[_0x163288(0x1a9)]();if(!_0x24a1b6)return![];const _0xccaa9d=_0x350623['item']();if(!_0xccaa9d)return![];if(!_0x24a1b6['meetRequirementsForSkillLearnSystem'](_0xccaa9d))return![];return _0x24a1b6[_0x163288(0x1d7)](_0xccaa9d);},Window_SkillLearnConfirm['prototype'][_0x4f089c(0x227)]=function(_0x444070){const _0x2405c8=_0x4f089c,_0x2d897a=this['itemLineRect'](_0x444070);this['resetTextColor'](),this[_0x2405c8(0x2cc)](this[_0x2405c8(0x2f5)](_0x444070));const _0x41fdd6=this[_0x2405c8(0x204)](_0x444070),_0x26756e=this[_0x2405c8(0x237)](_0x41fdd6)[_0x2405c8(0x1f0)];_0x2d897a['x']+=Math[_0x2405c8(0x294)]((_0x2d897a[_0x2405c8(0x1f0)]-_0x26756e)/0x2),this[_0x2405c8(0x319)](_0x41fdd6,_0x2d897a['x'],_0x2d897a['y'],_0x26756e);},Window_SkillLearnConfirm[_0x4f089c(0x2c6)][_0x4f089c(0x2ec)]=function(){const _0x47042b=_0x4f089c;if(this['currentSymbol']()==='ok'){}else Window_HorzCommand[_0x47042b(0x2c6)]['playOkSound'][_0x47042b(0x21d)](this);};