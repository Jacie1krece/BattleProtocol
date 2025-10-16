//=============================================================================
// VisuStella MZ - Database Inheritance
// VisuMZ_4_DatabaseInherit.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_DatabaseInherit = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DatabaseInherit = VisuMZ.DatabaseInherit || {};
VisuMZ.DatabaseInherit.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.04] [DatabaseInherit]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Database_Inheritance_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Populating a database can be extremely time consuming regardless of how much
 * you plan for it. One of the biggest offenders to making the process so time
 * consuming is the lack of inheritance features. By default, RPG Maker MZ is
 * unable to have objects directly inherit properties from parent objects,
 * meaning that each and every database object has to be created from scratch
 * or be the result of a copy/paste template before going forward.
 * 
 * This plugin allows you to mark specific database objects with inheritance
 * notetags, making it more efficient to carry over properties. Each database
 * object is able to inherit notetags, traits, effects, parameters, and more.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Inherit properties from database objects through notetags.
 * * Carry over notetags, properties, damage formulas, parameters, enemy action
 *   patterns, traits, and effects.
 * * Define the properties you don't want inherited through plugin parameters.
 * * 64 different notetags to give you full control over what is inherited on
 *   an object to object basis.
 * * Use plugin parameters to determine how damage formulas and parameters are
 *   extended from one to another.
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
 * Understanding Inheritance
 * ============================================================================
 *
 * This section will explain how inheritance works through this plugin.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 *
 * ---
 * 
 * 1. Use notetags (mentioned in the Notetags section) to determine which
 * database object properties you want carried over to an object. The notetags
 * will determine the parent object (where the properties are coming from).
 * The child object (the target object that will receive the parent's various
 * properties) is the one with the notetag itself.
 * 
 * ---
 *
 * 2. When all database JSON data is finished loading, the inheritance starts
 * by first loading up notetags. These will include the meta data that is
 * automatically parsed through RPG Maker MZ's default parser. The note box
 * itself will then be extended by the parent object's notetags AFTER the child
 * object's notes.
 * 
 * The meta settings can be changed in the Plugin Parameters.
 *
 * ---
 * 
 * 3. Once the notetags are parsed, the parent's properties are then carried
 * over, too. These properties range from the generic prices of items, MP costs
 * of skills, to the priority settings of states. The plugin parameters will
 * determine which object properties will overwrite the child object's settings
 * or extend them. When a property is extended, it is added upon.
 * 
 * These settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 4. If there are damage formulas present, the damage formula will be extended
 * upon from the parent object to the child object additively while containing
 * their own separate subsets for the damage formula. The damage
 * formula for the child object will be added on at the end. In other words:
 * 
 *   Parent Damage Formula: a.atk * 4 - b.def * 2
 *   Child Damage Formula: a.atk * 2 - b.def * 1
 * 
 *   Parent Damage Formula + Child Damage Formula
 * 
 *   (a.atk * 4 - b.def * 2) + (a.atk * 2 - b.def * 1)
 * 
 * The extension settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 5. If a database object has parameters (weapons, armors, enemies), their
 * parameters can be inherited from a parent object and extended. By default,
 * the extension will be adding from the parent's parameter value to the child
 * object's parameter value.
 * 
 *   Parent MaxHP: 500
 *   Child MaxHP: 100
 * 
 *   Parent MaxHP + Child MaxHP
 * 
 *   (500) + (100)
 * 
 * The extension settings can be changed in the Plugin Parameters.
 * 
 * ---
 * 
 * 6. Next, we go to Enemy Action Patterns if the objects are enemies. These
 * action patterns will be extended upon each other. The parent object's action
 * patterns will be created first while the child object's action patterns will
 * be added on afterwards. Keep this in mind as you create the the action lists
 * in case the order of the action patterns matter.
 * 
 * ---
 * 
 * 7. Traits and Effects are extended at the final step. The database objects
 * that use traits are Actors, Classes, Weapons, Armors, Skills, and States.
 * The database objects that use effects are Skills and Items. These properties
 * will not overwrite the existing ones, but instead, be added on. The parent
 * object's properties will be made first with the child properties sorted
 * after. Keep this in mind as you create the traits and effects in case the
 * order of the traits and effects matter.
 * 
 * ---
 *
 * ============================================================================
 * WARNING! Inheritance Order Matters!
 * ============================================================================
 * 
 * Due to the flexible nature of the notetags allow you to inherit objects that
 * are listed before and after an object's position in the database, you must
 * be wary of when the inheritance occurs or else you may not acquire al the
 * desired inherited properties.
 * 
 * *NOTE:* This plugin preloads the database entries on a one by one basis so
 * there will be a larger loading time than normal. The loading time is
 * dependent on the size of your database and the amount of data that needs to
 * be inherited across each object type.
 * 
 * ---
 * 
 * The plugin will go through each database object one by one, from lowest ID
 * to highest ID, and applying inheritance. This means, if a child inherits
 * properties from a parent object with a higher ID, that child will only
 * inherit the properties of the parent BEFORE inheritance is applied to the
 * parent.
 *
 * ---
 * 
 * So what does this mean? Let's use a few items as an example.
 * 
 * Item ID 5 has an original price of 400. Inherits from Item ID 20.
 * Item ID 10 has an original price of 200.
 * Item ID 20 has an original price of 100. Inherits from Item ID 10.
 * 
 * ---
 * 
 * If Item ID 5 inherits the price of Item ID 20, its price becomes 500,
 * because it's 400 + 100.
 * 
 * ---
 * 
 * This will be true even if Item ID 20 will inherit properties from elsewhere
 * because its ID is larger than the child's. For example, if Item ID 20 is to
 * inherit the price from Item ID 10, its price becomes 300. However, Item ID 5
 * will have its price remain at 500 because of 400 + 100. It does NOT become
 * 400 + 200 + 100.
 * 
 * ---
 * 
 * Order matters.
 * 
 * If you're unsure of what this means, then follow this golden rule to make
 * sure objects will always have their data inherited properly:
 * 
 *   Inherit from Lower ID's
 * 
 * Follow that and you can trace how properties are inherited.
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
 * === Everything-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Everything From: id>
 * <Inherit Everything From: id, id, id>
 *
 * <Inherit Everything From: name>
 * <Inherit Everything From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Everything>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags, basic properties, damage formulas, parameters,
 *   action patterns, traits, and effects from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Notetag Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Notetags From: id>
 * <Inherit Notetags From: id, id, id>
 *
 * <Inherit Notetags From: name>
 * <Inherit Notetags From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Notetags>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit notetags from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Basic Property Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Properties From: id>
 * <Inherit Properties From: id, id, id>
 *
 * <Inherit Properties From: name>
 * <Inherit Properties From: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit First Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Last Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Previous Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 *
 * <Inherit Next Properties>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State, and
 *   Tileset Notetags
 * - This will inherit basic properties determined by the plugin parameters.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 * - If there are multiple parent objects, the inheritance for overwritten
 *   properties will come from the last listed parent object.
 *
 * ---
 * 
 * === Damage Formula Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Damage Formula From: id>
 * <Inherit Properties From: id, id, id>
 *
 * <Inherit Damage Formula From: name>
 * <Inherit Damage Formula From: name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Damage Formula>
 *
 * - Used for: Skill, Item Notetags
 * - This will inherit and extend the damage formula from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Parameters Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Parameters From: id>
 * <Inherit Parameters From: id, id, id>
 *
 * <Inherit Parameters From: name>
 * <Inherit Parameters From: name, name, name>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Parameters>
 *
 * - Used for: Weapon, Armor, Enemy Notetags
 * - This will inherit and extend the parameters from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Enemy Action Patterns-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Action Patterns From: id>
 * <Inherit Action Patterns From: id, id, id>
 *
 * <Inherit Action Patterns From: name>
 * <Inherit Action Patterns From: name, name, name>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Action Patterns>
 *
 * - Used for: Enemy Notetags
 * - This will inherit and extend the action patterns from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Trait Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Traits From: id>
 * <Inherit Traits From: id, id, id>
 *
 * <Inherit Traits From: name>
 * <Inherit Traits From: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Traits>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, and State Notetags
 * - This will inherit and extend the traits from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 * 
 * === Effects Inheritance-Related Notetags ===
 * 
 * ---
 *
 * <Inherit Effects From: id>
 * <Inherit Effects From: id, id, id>
 *
 * <Inherit Effects From: name>
 * <Inherit Effects From: name, name, name>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - Replace 'id' with the ID of the database object to inherit from.
 * - Replace 'name' with the name of the database object to inherit from.
 * - The database object must exist within the same database.
 * - You cannot inherit data from objects of a different database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit First Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from the first object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Last Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from last object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Previous Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from previous object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * <Inherit Next Effects>
 *
 * - Used for: Skill and Item Notetags
 * - This will inherit and extend the effects from the parent object.
 * - This will inherit from next object of the same database.
 * - Insert multiple inheritance notetags to inherit from more than one parent
 *   object for this child object.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Inheritance Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control which properties will inherit
 * in what way, and how they're extended.
 *
 * ---
 *
 * Notetags
 * 
 *   Inherit Meta Flags:
 *   - Inherit meta flags added by notetags?
 *
 * ---
 *
 * Properties
 * 
 *   JS: Overwritten:
 *   - A list of JavaScript object keys containing data that will be
 *     overwritten when inherited.
 * 
 *   JS: Extended:
 *   - A list of JavaScript object keys containing data that will be
 *     extended/added to when inherited.
 *
 * ---
 *
 * Damage Formulas
 * 
 *   Damage Format:
 *   - How are damage formulas extended?
 *   - %1 - Parent Damage Formula, %2 - Child Damage Formula
 *
 * ---
 *
 * Parameters Formulas
 * 
 *   Parameter Format:
 *   - How are parameters extended?
 *   - %1 - Parent Parameter Value, %2 - Child Parameter Value
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
 * Version 1.04: June 12, 2025
 * * Bug Fixes!
 * ** Fixed a bug where parameters for classes would be inherited when this
 *    notetag should only be for equipment and enemies. Fix made by Arisu.
 * 
 * Version 1.03: April 16, 2021
 * * Bug Fixes!
 * ** Damage formula inheritance should now properly work. Fix made by Arisu.
 *
 * Version 1.02: December 18, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.01: December 11, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00: December 4, 2020
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
 * @param DatabaseInherit
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Notetags
 *
 * @param MetaNotetags:eval
 * @text Inherit Meta Flags
 * @parent Notetags
 * @type boolean
 * @on Inherit Meta
 * @off Ignore Meta
 * @desc Inherit meta flags added by notetags?
 * @default true
 * 
 * @param Properties
 *
 * @param OverwriteProperties:arraystr
 * @text JS: Overwritten
 * @parent Properties
 * @type string[]
 * @desc A list of JavaScript object keys containing data that
 * will be overwritten when inherited.
 * @default ["-----General-----","scope","occasion","hitType","etypeId","","-----Skills-----","stypeId","requiredWtypeId1","requiredWtypeId2","","-----Items-----","consumable","itypeId","","-----Weapons-----","wtypeId","","-----Armors-----","atypeId","","-----Enemies-----","dropItems","","-----States-----","restriction","motion","overlay","removeAtBattleEnd","removeByRestriction","autoRemovalTiming","removeByDamage","removeByWalking","","-----Tilesets-----","flags","mode",""]
 *
 * @param ExtendedProperties:arraystr
 * @text JS: Extended
 * @parent Properties
 * @type string[]
 * @desc A list of JavaScript object keys containing data that
 * will be extended/added to when inherited.
 * @default ["-----General-----","speed","tpGain","price","","-----Skills-----","mpCost","tpCost","","-----Enemies-----","exp","gold","","-----States-----","priority","minTurns","maxTurns","chanceByDamage","stepsToRemove",""]
 * 
 * @param Damage
 * @text Damage Formulas
 *
 * @param DamageFmt:str
 * @text Damage Format
 * @parent Damage
 * @desc How are damage formulas extended?
 * %1 - Parent Damage Formula, %2 - Child Damage Formula
 * @default (%1) + (%2)
 * 
 * @param Parameters
 * @text Parameters Formulas
 *
 * @param ParameterFmt:str
 * @text Parameter Format
 * @parent Parameters
 * @desc How are parameters extended?
 * %1 - Parent Parameter Value, %2 - Child Parameter Value
 * @default (%1) + (%2)
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

function _0x45c8(){const _0x21c0f9=['ConvertParams','replace','traits','getItemIdWithName','ExtendedProperties','version','1692036fulprc','904588rDgtsZ','prototype','125946qQaKeL','CheckLoop','meta','_armorIDs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','InheritEffects','includes','InheritParameters','onDatabaseLoaded','56qDtsEo','effects','expParams','trim','3112732IumDZB','_tilesetIDs','EVAL','getParentObjIndex','makeDeepCopy','InheritNotetags','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MetaNotetags','_skillIDs','getArmorIdWithName','OverwriteProperties','InheritFirst','process_VisuMZ_DatabaseInherit','isPlaytest','params','getTilesetIdWithName','_classIDs','STR','ParameterFmt','getWeaponIdWithName','InheritTraits','damage','InheritPrev','exit','max','parse','664LfHyxL','parameters','process_VisuMZ_DatabaseInherit_Notetags','getEnemyIdWithName','ARRAYJSON','note','getActorIdWithName','getStateIdWithName','_actorIDs','_enemyIDs','match','1653465tRGKui','ARRAYSTRUCT','47454DJRLKw','397977Rgxifq','_weaponIDs','log','concat','split','status','RegExp','actions','name','description','getSkillIdWithName','Settings','getClassIdWithName','Scene_Boot_onDatabaseLoaded','InheritTarget','InheritNext','InheritProperties','FUNC','_stateIDs','DamageFmt','format','DatabaseInherit','InheritDamageFormula','InheritLast','ARRAYFUNC','toUpperCase','_itemIDs','map'];_0x45c8=function(){return _0x21c0f9;};return _0x45c8();}function _0xfcaa(_0x316e86,_0x3ddb0c){const _0x45c89e=_0x45c8();return _0xfcaa=function(_0xfcaa48,_0x5e7d24){_0xfcaa48=_0xfcaa48-0x1d1;let _0x455ca3=_0x45c89e[_0xfcaa48];return _0x455ca3;},_0xfcaa(_0x316e86,_0x3ddb0c);}const _0x29f814=_0xfcaa;(function(_0x52b1e0,_0x1470a8){const _0xe763fe=_0xfcaa,_0x25bf22=_0x52b1e0();while(!![]){try{const _0x153aa2=parseInt(_0xe763fe(0x209))/0x1+parseInt(_0xe763fe(0x1d2))/0x2+-parseInt(_0xe763fe(0x208))/0x3*(-parseInt(_0xe763fe(0x1dd))/0x4)+-parseInt(_0xe763fe(0x206))/0x5+parseInt(_0xe763fe(0x1d1))/0x6+parseInt(_0xe763fe(0x1e1))/0x7+-parseInt(_0xe763fe(0x1fb))/0x8*(parseInt(_0xe763fe(0x1d4))/0x9);if(_0x153aa2===_0x1470a8)break;else _0x25bf22['push'](_0x25bf22['shift']());}catch(_0x43b241){_0x25bf22['push'](_0x25bf22['shift']());}}}(_0x45c8,0x4ac22));var label=_0x29f814(0x21e),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x3bfbf7){const _0x4cbd62=_0x29f814;return _0x3bfbf7[_0x4cbd62(0x20e)]&&_0x3bfbf7[_0x4cbd62(0x212)][_0x4cbd62(0x1da)]('['+label+']');})[0x0];VisuMZ[label][_0x29f814(0x214)]=VisuMZ[label][_0x29f814(0x214)]||{},VisuMZ[_0x29f814(0x225)]=function(_0x465386,_0x15e4c0){const _0x275f28=_0x29f814;for(const _0x140eca in _0x15e4c0){if(_0x140eca[_0x275f28(0x205)](/(.*):(.*)/i)){const _0x47726a=String(RegExp['$1']),_0x148bdd=String(RegExp['$2'])[_0x275f28(0x222)]()['trim']();let _0x3948f1,_0x29792d,_0x5cfdf2;switch(_0x148bdd){case'NUM':_0x3948f1=_0x15e4c0[_0x140eca]!==''?Number(_0x15e4c0[_0x140eca]):0x0;break;case'ARRAYNUM':_0x29792d=_0x15e4c0[_0x140eca]!==''?JSON['parse'](_0x15e4c0[_0x140eca]):[],_0x3948f1=_0x29792d['map'](_0xaf3eea=>Number(_0xaf3eea));break;case _0x275f28(0x1e3):_0x3948f1=_0x15e4c0[_0x140eca]!==''?eval(_0x15e4c0[_0x140eca]):null;break;case'ARRAYEVAL':_0x29792d=_0x15e4c0[_0x140eca]!==''?JSON['parse'](_0x15e4c0[_0x140eca]):[],_0x3948f1=_0x29792d[_0x275f28(0x224)](_0x1033bf=>eval(_0x1033bf));break;case'JSON':_0x3948f1=_0x15e4c0[_0x140eca]!==''?JSON[_0x275f28(0x1fa)](_0x15e4c0[_0x140eca]):'';break;case _0x275f28(0x1ff):_0x29792d=_0x15e4c0[_0x140eca]!==''?JSON[_0x275f28(0x1fa)](_0x15e4c0[_0x140eca]):[],_0x3948f1=_0x29792d[_0x275f28(0x224)](_0x5d396a=>JSON[_0x275f28(0x1fa)](_0x5d396a));break;case _0x275f28(0x21a):_0x3948f1=_0x15e4c0[_0x140eca]!==''?new Function(JSON[_0x275f28(0x1fa)](_0x15e4c0[_0x140eca])):new Function('return\x200');break;case _0x275f28(0x221):_0x29792d=_0x15e4c0[_0x140eca]!==''?JSON[_0x275f28(0x1fa)](_0x15e4c0[_0x140eca]):[],_0x3948f1=_0x29792d['map'](_0x487a5b=>new Function(JSON[_0x275f28(0x1fa)](_0x487a5b)));break;case _0x275f28(0x1f2):_0x3948f1=_0x15e4c0[_0x140eca]!==''?String(_0x15e4c0[_0x140eca]):'';break;case'ARRAYSTR':_0x29792d=_0x15e4c0[_0x140eca]!==''?JSON[_0x275f28(0x1fa)](_0x15e4c0[_0x140eca]):[],_0x3948f1=_0x29792d[_0x275f28(0x224)](_0x374676=>String(_0x374676));break;case'STRUCT':_0x5cfdf2=_0x15e4c0[_0x140eca]!==''?JSON['parse'](_0x15e4c0[_0x140eca]):{},_0x3948f1=VisuMZ[_0x275f28(0x225)]({},_0x5cfdf2);break;case _0x275f28(0x207):_0x29792d=_0x15e4c0[_0x140eca]!==''?JSON[_0x275f28(0x1fa)](_0x15e4c0[_0x140eca]):[],_0x3948f1=_0x29792d[_0x275f28(0x224)](_0x392e65=>VisuMZ[_0x275f28(0x225)]({},JSON['parse'](_0x392e65)));break;default:continue;}_0x465386[_0x47726a]=_0x3948f1;}}return _0x465386;},(_0x3507f7=>{const _0x6d61b5=_0x29f814,_0x87e665=_0x3507f7[_0x6d61b5(0x211)];for(const _0x11910a of dependencies){if(!Imported[_0x11910a]){alert(_0x6d61b5(0x1e7)[_0x6d61b5(0x21d)](_0x87e665,_0x11910a)),SceneManager[_0x6d61b5(0x1f8)]();break;}}const _0x427813=_0x3507f7[_0x6d61b5(0x212)];if(_0x427813[_0x6d61b5(0x205)](/\[Version[ ](.*?)\]/i)){const _0x5dc05f=Number(RegExp['$1']);_0x5dc05f!==VisuMZ[label][_0x6d61b5(0x22a)]&&(alert(_0x6d61b5(0x1d8)[_0x6d61b5(0x21d)](_0x87e665,_0x5dc05f)),SceneManager[_0x6d61b5(0x1f8)]());}if(_0x427813[_0x6d61b5(0x205)](/\[Tier[ ](\d+)\]/i)){const _0x58fe91=Number(RegExp['$1']);_0x58fe91<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x87e665,_0x58fe91,tier)),SceneManager[_0x6d61b5(0x1f8)]()):tier=Math[_0x6d61b5(0x1f9)](_0x58fe91,tier);}VisuMZ[_0x6d61b5(0x225)](VisuMZ[label]['Settings'],_0x3507f7[_0x6d61b5(0x1fc)]);})(pluginData),VisuMZ[_0x29f814(0x21e)][_0x29f814(0x216)]=Scene_Boot['prototype'][_0x29f814(0x1dc)],Scene_Boot[_0x29f814(0x1d3)]['onDatabaseLoaded']=function(){const _0x4d705c=_0x29f814;this[_0x4d705c(0x1ed)](),VisuMZ[_0x4d705c(0x21e)][_0x4d705c(0x216)]['call'](this);},Scene_Boot[_0x29f814(0x1d3)]['process_VisuMZ_DatabaseInherit']=function(){const _0x54b9a0=_0x29f814;this['process_VisuMZ_DatabaseInherit_Notetags'](!![]),this[_0x54b9a0(0x1fd)](![]);},VisuMZ[_0x29f814(0x21e)][_0x29f814(0x20f)]={'InheritTarget':/<INHERIT (.*) FROM:[ ](.*)>/gi,'InheritFirst':/<INHERIT (?:FIRST|INITIAL) (.*)>/gi,'InheritLast':/<INHERIT (?:LAST|FINAL) (.*)>/gi,'InheritPrev':/<INHERIT (?:PREV|PREVIOUS) (.*)>/gi,'InheritNext':/<INHERIT (?:NEXT|FOLLOWING) (.*)>/gi},Scene_Boot[_0x29f814(0x1d3)]['process_VisuMZ_DatabaseInherit_Notetags']=function(_0x5cd801){const _0x17d69b=_0x29f814,_0x289828=[$dataActors,$dataClasses,$dataSkills,$dataItems,$dataWeapons,$dataArmors,$dataEnemies,$dataStates,$dataTilesets],_0x4655d6=VisuMZ[_0x17d69b(0x21e)][_0x17d69b(0x20f)],_0x3d0e55=[_0x4655d6[_0x17d69b(0x217)],_0x4655d6[_0x17d69b(0x1ec)],_0x4655d6[_0x17d69b(0x220)],_0x4655d6[_0x17d69b(0x1f7)],_0x4655d6[_0x17d69b(0x218)]];for(const _0x4c16c0 of _0x289828){if(!_0x4c16c0)continue;for(const _0x51f2ec of _0x4c16c0){if(!_0x51f2ec)continue;const _0x4e3df4=_0x51f2ec['note'];for(const _0x4ba928 of _0x3d0e55){const _0x4f7f79=_0x4e3df4[_0x17d69b(0x205)](_0x4ba928);if(_0x4f7f79)for(const _0x4f5503 of _0x4f7f79){VisuMZ[_0x17d69b(0x21e)][_0x17d69b(0x1d5)](_0x4f5503,_0x4ba928,_0x51f2ec,_0x4c16c0,_0x5cd801);}}}}},VisuMZ[_0x29f814(0x21e)][_0x29f814(0x1d5)]=function(_0x471bc4,_0x422820,_0x110942,_0x31635f,_0x5d35cd){const _0x3b79ff=_0x29f814,_0x548783=VisuMZ[_0x3b79ff(0x21e)][_0x3b79ff(0x20f)];let _0x2ddc0f='',_0x265ee7=[0x0];_0x471bc4[_0x3b79ff(0x205)](_0x422820);if(_0x422820===_0x548783[_0x3b79ff(0x217)])_0x2ddc0f=String(RegExp['$1']),_0x265ee7=String(RegExp['$2'])[_0x3b79ff(0x20d)](',');else{if(_0x422820===_0x548783[_0x3b79ff(0x1ec)])_0x2ddc0f=String(RegExp['$1']),_0x265ee7=['1'];else{if(_0x422820===_0x548783[_0x3b79ff(0x220)])_0x2ddc0f=String(RegExp['$1']),_0x265ee7=[_0x31635f[_0x31635f['length']-0x1]['id']];else{if(_0x422820===_0x548783[_0x3b79ff(0x1f7)])_0x2ddc0f=String(RegExp['$1']),_0x265ee7=[_0x31635f[_0x110942['id']-0x1]['id']];else{if(_0x422820===_0x548783[_0x3b79ff(0x218)])_0x2ddc0f=String(RegExp['$1']),_0x265ee7=[_0x31635f[_0x110942['id']+0x1]['id']];else return;}}}}for(const _0x26efcb of _0x265ee7){const _0x309b78=VisuMZ[_0x3b79ff(0x21e)][_0x3b79ff(0x1e4)](_0x26efcb,_0x31635f);if(_0x309b78<=0x0)return;const _0x22507b=_0x31635f[_0x309b78];if(!_0x22507b)return;if(_0x22507b===_0x110942)return;_0x5d35cd?_0x2ddc0f[_0x3b79ff(0x205)](/(?:NOTETAG|NOTETAGS|ALL|EVERYTHING)/i)&&VisuMZ['DatabaseInherit']['InheritNotetags'](_0x110942,_0x22507b):(_0x2ddc0f[_0x3b79ff(0x205)](/(?:PROPERTY|PROPERTIES|ALL|EVERYTHING)/i)&&VisuMZ['DatabaseInherit'][_0x3b79ff(0x219)](_0x110942,_0x22507b),_0x2ddc0f['match'](/(?:DAMAGE FORMULA|DAMAGEFORMULA|DAMAGE|ALL|EVERYTHING)/i)&&VisuMZ[_0x3b79ff(0x21e)][_0x3b79ff(0x21f)](_0x110942,_0x22507b),_0x2ddc0f[_0x3b79ff(0x205)](/(?:PARAMETERS|PARAMS|STATS|ALL|EVERYTHING)/i)&&VisuMZ[_0x3b79ff(0x21e)][_0x3b79ff(0x1db)](_0x110942,_0x22507b),_0x2ddc0f['match'](/(?:ACTIONS|PATTERNS|ACTION PATTERNS|ALL|EVERYTHING)/i)&&VisuMZ['DatabaseInherit']['InheritActionPatterns'](_0x110942,_0x22507b),_0x2ddc0f['match'](/(?:TRAIT|TRAITS|ALL|EVERYTHING)/i)&&VisuMZ[_0x3b79ff(0x21e)][_0x3b79ff(0x1f5)](_0x110942,_0x22507b),_0x2ddc0f['match'](/(?:EFFECT|EFFECTS|ALL|EVERYTHING)/i)&&VisuMZ[_0x3b79ff(0x21e)][_0x3b79ff(0x1d9)](_0x110942,_0x22507b));}},VisuMZ[_0x29f814(0x21e)][_0x29f814(0x1e4)]=function(_0x1d2de5,_0x341a19){const _0xe4bfa2=_0x29f814,_0x4f7c5e=Number(_0x1d2de5)||0x0;_0x1d2de5=String(_0x1d2de5);if(_0x341a19===$dataActors)return DataManager[_0xe4bfa2(0x201)](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataClasses)return DataManager['getClassIdWithName'](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataSkills)return DataManager[_0xe4bfa2(0x213)](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataItems)return DataManager[_0xe4bfa2(0x228)](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataWeapons)return DataManager[_0xe4bfa2(0x1f4)](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataArmors)return DataManager['getArmorIdWithName'](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataEnemies)return DataManager['getEnemyIdWithName'](_0x1d2de5)||_0x4f7c5e;else{if(_0x341a19===$dataStates)return DataManager['getStateIdWithName'](_0x1d2de5)||_0x4f7c5e;else return _0x341a19===$dataTilesets?DataManager[_0xe4bfa2(0x1f0)](_0x1d2de5)||_0x4f7c5e:_0x4f7c5e;}}}}}}}},VisuMZ[_0x29f814(0x21e)][_0x29f814(0x1e6)]=function(_0x577ef8,_0x581709){const _0x19631a=_0x29f814;if(_0x581709[_0x19631a(0x1d6)]&&VisuMZ[_0x19631a(0x21e)][_0x19631a(0x214)][_0x19631a(0x1e8)])for(const _0x4d5b22 in _0x581709['meta']){if(_0x577ef8[_0x19631a(0x1d6)][_0x4d5b22])continue;_0x577ef8[_0x19631a(0x1d6)][_0x4d5b22]=JsonEx['makeDeepCopy'](_0x581709['meta'][_0x4d5b22]);}let _0x3fdf3f=_0x581709[_0x19631a(0x200)]||'';_0x3fdf3f=_0x3fdf3f['replace'](/<INHERIT (.*)(.*)>/gi,''),_0x577ef8[_0x19631a(0x200)]=(_0x577ef8[_0x19631a(0x200)]||'')+'\x0a'+_0x3fdf3f;},VisuMZ[_0x29f814(0x21e)]['InheritProperties']=function(_0x423163,_0x36f06a){const _0xd4c1cb=_0x29f814,_0x17173c=VisuMZ['DatabaseInherit'][_0xd4c1cb(0x214)],_0x94d70e=_0x17173c[_0xd4c1cb(0x1eb)],_0x63156f=_0x17173c[_0xd4c1cb(0x229)];for(const _0x2ff189 of _0x94d70e){_0x423163[_0x2ff189]!==undefined&&_0x36f06a[_0x2ff189]!==undefined&&(_0x423163[_0x2ff189]=JsonEx[_0xd4c1cb(0x1e5)](_0x36f06a[_0x2ff189]));}for(const _0x3bb782 of _0x63156f){if(_0x423163[_0x3bb782]!==undefined&&_0x36f06a[_0x3bb782]!==undefined)try{_0x423163[_0x3bb782]+=_0x36f06a[_0x3bb782];}catch(_0x42e79d){if($gameTemp['isPlaytest']())console[_0xd4c1cb(0x20b)](_0x42e79d);_0x423163[_0x3bb782]=JsonEx[_0xd4c1cb(0x1e5)](_0x36f06a[_0x3bb782]);}}},VisuMZ[_0x29f814(0x21e)][_0x29f814(0x21f)]=function(_0x42aaba,_0x49155d){const _0x5aa552=_0x29f814;if(_0x42aaba[_0x5aa552(0x1f6)]===undefined)return;if(_0x49155d[_0x5aa552(0x1f6)]===undefined)return;if(_0x42aaba[_0x5aa552(0x1f6)]!==undefined&&_0x49155d['damage']!==undefined){const _0x2fcba4=VisuMZ[_0x5aa552(0x21e)]['Settings'][_0x5aa552(0x21c)];_0x42aaba['damage']['formula']=_0x2fcba4[_0x5aa552(0x21d)](_0x49155d[_0x5aa552(0x1f6)]['formula']||'0',_0x42aaba[_0x5aa552(0x1f6)]['formula']||'0');}},VisuMZ['DatabaseInherit'][_0x29f814(0x1db)]=function(_0x245f1f,_0x35b8c3){const _0x1946a3=_0x29f814;if(_0x245f1f[_0x1946a3(0x227)]===undefined)return;if(_0x35b8c3['traits']===undefined)return;if(_0x245f1f[_0x1946a3(0x1df)]!==undefined)return;if(_0x245f1f[_0x1946a3(0x1ef)]!==undefined&&_0x35b8c3[_0x1946a3(0x1ef)]!==undefined){const _0x4d08d7=VisuMZ['DatabaseInherit'][_0x1946a3(0x214)][_0x1946a3(0x1f3)],_0x35924b=_0x245f1f[_0x1946a3(0x1ef)]['length'];for(let _0xb41d07=0x0;_0xb41d07<_0x35924b;_0xb41d07++){const _0x23efe3=_0x4d08d7[_0x1946a3(0x21d)](_0x35b8c3[_0x1946a3(0x1ef)][_0xb41d07]||0x0,_0x245f1f[_0x1946a3(0x1ef)][_0xb41d07]||0x0);try{_0x245f1f[_0x1946a3(0x1ef)][_0xb41d07]=eval(_0x23efe3);}catch(_0x19cc1e){if($gameTemp[_0x1946a3(0x1ee)]())console[_0x1946a3(0x20b)](_0x19cc1e);_0x245f1f['params'][_0xb41d07]+=_0x35b8c3[_0x1946a3(0x1ef)][_0xb41d07];}}}},VisuMZ[_0x29f814(0x21e)]['InheritActionPatterns']=function(_0x1d025c,_0x5acf47){const _0x39a050=_0x29f814;if(_0x1d025c[_0x39a050(0x210)]===undefined)return;if(_0x5acf47[_0x39a050(0x210)]===undefined)return;_0x1d025c['actions']=_0x5acf47[_0x39a050(0x210)][_0x39a050(0x20c)](_0x1d025c[_0x39a050(0x210)]);},VisuMZ[_0x29f814(0x21e)][_0x29f814(0x1f5)]=function(_0x515ae7,_0x49d55b){const _0x237b98=_0x29f814;if(_0x515ae7[_0x237b98(0x227)]===undefined)return;if(_0x49d55b[_0x237b98(0x227)]===undefined)return;_0x515ae7[_0x237b98(0x227)]=_0x49d55b[_0x237b98(0x227)]['concat'](_0x515ae7['traits']);},VisuMZ['DatabaseInherit'][_0x29f814(0x1d9)]=function(_0x5e19f2,_0x21b738){const _0x312f2b=_0x29f814;if(_0x5e19f2['effects']===undefined)return;if(_0x21b738['effects']===undefined)return;_0x5e19f2[_0x312f2b(0x1de)]=_0x21b738[_0x312f2b(0x1de)][_0x312f2b(0x20c)](_0x5e19f2[_0x312f2b(0x1de)]);},DataManager[_0x29f814(0x201)]=function(_0x583924){const _0x5672fe=_0x29f814;_0x583924=_0x583924[_0x5672fe(0x222)]()[_0x5672fe(0x1e0)](),this['_actorIDs']=this['_actorIDs']||{};if(this[_0x5672fe(0x203)][_0x583924])return this[_0x5672fe(0x203)][_0x583924];for(const _0x95bd4b of $dataActors){if(!_0x95bd4b)continue;this[_0x5672fe(0x203)][_0x95bd4b[_0x5672fe(0x211)]['toUpperCase']()[_0x5672fe(0x1e0)]()]=_0x95bd4b['id'];}return this[_0x5672fe(0x203)][_0x583924]||0x0;},DataManager[_0x29f814(0x215)]=function(_0x59717c){const _0x1f9270=_0x29f814;_0x59717c=_0x59717c[_0x1f9270(0x222)]()[_0x1f9270(0x1e0)](),this[_0x1f9270(0x1f1)]=this[_0x1f9270(0x1f1)]||{};if(this[_0x1f9270(0x1f1)][_0x59717c])return this[_0x1f9270(0x1f1)][_0x59717c];for(const _0x5035da of $dataClasses){if(!_0x5035da)continue;let _0xe01daa=_0x5035da[_0x1f9270(0x211)];_0xe01daa=_0xe01daa[_0x1f9270(0x226)](/\x1I\[(\d+)\]/gi,''),_0xe01daa=_0xe01daa[_0x1f9270(0x226)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0xe01daa[_0x1f9270(0x222)]()[_0x1f9270(0x1e0)]()]=_0x5035da['id'];}return this[_0x1f9270(0x1f1)][_0x59717c]||0x0;},DataManager['getSkillIdWithName']=function(_0x3d30b3){const _0x4e5f12=_0x29f814;_0x3d30b3=_0x3d30b3[_0x4e5f12(0x222)]()[_0x4e5f12(0x1e0)](),this['_skillIDs']=this['_skillIDs']||{};if(this[_0x4e5f12(0x1e9)][_0x3d30b3])return this[_0x4e5f12(0x1e9)][_0x3d30b3];for(const _0x579ef0 of $dataSkills){if(!_0x579ef0)continue;this[_0x4e5f12(0x1e9)][_0x579ef0['name']['toUpperCase']()[_0x4e5f12(0x1e0)]()]=_0x579ef0['id'];}return this[_0x4e5f12(0x1e9)][_0x3d30b3]||0x0;},DataManager[_0x29f814(0x228)]=function(_0x37fc4c){const _0x7dff0=_0x29f814;_0x37fc4c=_0x37fc4c['toUpperCase']()[_0x7dff0(0x1e0)](),this['_itemIDs']=this[_0x7dff0(0x223)]||{};if(this[_0x7dff0(0x223)][_0x37fc4c])return this[_0x7dff0(0x223)][_0x37fc4c];for(const _0x55211a of $dataItems){if(!_0x55211a)continue;this[_0x7dff0(0x223)][_0x55211a[_0x7dff0(0x211)][_0x7dff0(0x222)]()[_0x7dff0(0x1e0)]()]=_0x55211a['id'];}return this[_0x7dff0(0x223)][_0x37fc4c]||0x0;},DataManager[_0x29f814(0x1f4)]=function(_0x41d8b5){const _0x259380=_0x29f814;_0x41d8b5=_0x41d8b5[_0x259380(0x222)]()[_0x259380(0x1e0)](),this[_0x259380(0x20a)]=this[_0x259380(0x20a)]||{};if(this[_0x259380(0x20a)][_0x41d8b5])return this[_0x259380(0x20a)][_0x41d8b5];for(const _0x1f2523 of $dataWeapons){if(!_0x1f2523)continue;this[_0x259380(0x20a)][_0x1f2523[_0x259380(0x211)][_0x259380(0x222)]()[_0x259380(0x1e0)]()]=_0x1f2523['id'];}return this['_weaponIDs'][_0x41d8b5]||0x0;},DataManager[_0x29f814(0x1ea)]=function(_0x110fa9){const _0x8286b1=_0x29f814;_0x110fa9=_0x110fa9[_0x8286b1(0x222)]()['trim'](),this[_0x8286b1(0x1d7)]=this['_armorIDs']||{};if(this[_0x8286b1(0x1d7)][_0x110fa9])return this[_0x8286b1(0x1d7)][_0x110fa9];for(const _0x284994 of $dataArmors){if(!_0x284994)continue;this[_0x8286b1(0x1d7)][_0x284994['name'][_0x8286b1(0x222)]()['trim']()]=_0x284994['id'];}return this['_armorIDs'][_0x110fa9]||0x0;},DataManager[_0x29f814(0x1fe)]=function(_0x27de49){const _0x5d98cb=_0x29f814;_0x27de49=_0x27de49[_0x5d98cb(0x222)]()[_0x5d98cb(0x1e0)](),this['_enemyIDs']=this[_0x5d98cb(0x204)]||{};if(this[_0x5d98cb(0x204)][_0x27de49])return this['_enemyIDs'][_0x27de49];for(const _0x1cc46a of $dataEnemies){if(!_0x1cc46a)continue;this[_0x5d98cb(0x204)][_0x1cc46a[_0x5d98cb(0x211)]['toUpperCase']()[_0x5d98cb(0x1e0)]()]=_0x1cc46a['id'];}return this[_0x5d98cb(0x204)][_0x27de49]||0x0;},DataManager[_0x29f814(0x202)]=function(_0x3f6484){const _0x350256=_0x29f814;_0x3f6484=_0x3f6484[_0x350256(0x222)]()[_0x350256(0x1e0)](),this[_0x350256(0x21b)]=this[_0x350256(0x21b)]||{};if(this[_0x350256(0x21b)][_0x3f6484])return this[_0x350256(0x21b)][_0x3f6484];for(const _0x14dcbf of $dataStates){if(!_0x14dcbf)continue;this[_0x350256(0x21b)][_0x14dcbf[_0x350256(0x211)][_0x350256(0x222)]()['trim']()]=_0x14dcbf['id'];}return this[_0x350256(0x21b)][_0x3f6484]||0x0;},DataManager[_0x29f814(0x1f0)]=function(_0x3a1fea){const _0x106509=_0x29f814;_0x3a1fea=_0x3a1fea[_0x106509(0x222)]()[_0x106509(0x1e0)](),this['_tilesetIDs']=this[_0x106509(0x1e2)]||{};if(this[_0x106509(0x1e2)][_0x3a1fea])return this[_0x106509(0x1e2)][_0x3a1fea];for(const _0x36ac2e of $dataTilesets){if(!_0x36ac2e)continue;this[_0x106509(0x1e2)][_0x36ac2e['name']['toUpperCase']()[_0x106509(0x1e0)]()]=_0x36ac2e['id'];}return this[_0x106509(0x1e2)][_0x3a1fea]||0x0;};