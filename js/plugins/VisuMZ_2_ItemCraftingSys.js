//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.23] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
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
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
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
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
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
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 * 
 * === Batch-Related Notetags ===
 * 
 * ---
 *
 * <Craft Batch>
 *  listing
 *  listing
 *  listing
 * </Craft Batch>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_3_ShopBatches!
 * - Creates a list of items, weapons, and armors that the player will gain
 *   when this batch object is crafted.
 *   - This also means that in addition to this notetag, the notetag for
 *     <Crafting Ingredients> is also needed.
 *   - This item will also not be masked.
 * - Proxy items, weapons, or armors cannot be listed and will be bypassed.
 * - This item, weapon, or armor cannot be crafted if all of the listed items,
 *   weapons, or armors are at max quantity within the party's inventory.
 * - The listed items will NOT utilize any on craft effects for the individual
 *   listed items themselves.
 * - Replace 'listing' with any of the listing types found below:
 * 
 *     Item id
 *     Item name
 *     Weapon id
 *     Weapon name
 *     Armor id
 *     Armor name
 * 
 *     Item id: quantity
 *     Item name: quantity
 *     Weapon id: quantity
 *     Weapon name: quantity
 *     Armor id: quantity
 *     Armor name: quantity
 * 
 *   - Replace 'id' with a number representing the ID of the item, weapon, or
 *     armor that is to be listed.
 *     - Items CANNOT add themselves!
 *     - ie. Item #8 must not give Item #8.
 *   - Replace 'name' with the associated item, weapon, or armor's name.
 *     - Items CANNOT add themselves!
 *     - ie. Item 'Super Potion' must not give Item 'Super Potion'.
 *   - Replace 'quantity' with a number representing the number of items,
 *     weapons, or armors that will be acquired when the batch item is crafted.
 *     - If the variant without 'quantity' is used, quantity will default to 1.
 * 
 *   Examples:
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item Potion: 10
 *    Item Super Potion: 5
 *    Weapon Short Sword: 3
 *    Weapon Long Sword: 2
 *    Armor Linen Clothing: 4
 *    Armor Cloth Armor: 3
 *   </Craft Batch>
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item 7: 10
 *    Item 8: 5
 *    Weapon 1: 3
 *    Weapon 2: 2
 *    Armor 2: 4
 *    Armor 8: 3
 *   </Craft Batch>
 * 
 *   ---
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
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
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
 *
 * ---
 * 
 * Custom Layout
 * 
 *   Added in version 1.20
 * 
 *   Enable Custom Layout:
 *   - Enable a custom layout or automatically create a layout based on the
 *     shop scene?
 * 
 *   Help Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Category Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for the ingredients title window.
 * 
 *   Gold Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Item Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for ingredients list and number windows.
 * 
 *   Status Window JS:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.23: May 15, 2025
 * * Compatibility Update!
 * ** Added better compatibility with Message Core's text language settings.
 *    Update made by Arisu.
 * 
 * Version 1.22: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Added extra clarity to <Craft Batch>
 * *** Items CANNOT add themselves!
 * *** ie. Item 'Super Potion' must not give Item 'Super Potion'.
 * * Feature Update!
 * ** Add fail safes to prevent items from having batch entries add themselves.
 *    Added by Arisu.
 * 
 * Version 1.21: July 18, 2024
 * * Compatibility Update!
 * ** Added compatibility with new Items and Equips Core features!
 * 
 * Version 1.20: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would cause a conflict with related non-crafting
 *    scenes. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Windows > Custom Layout
 * **** By enabling this, you can use JS to determine the window positions you
 *      want to layout in the item crafting scene. Otherwise, if left disabled,
 *      the plugin will automatically utilize the layout found in the shop
 *      scene to determine where the windows will go.
 * 
 * Version 1.19: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Craft Batch>
 * **** When this "item" is crafted, yields multiples of the listed item.
 * **** Requires VisuMZ_3_ShopBatches
 * 
 * Version 1.18: August 4, 2022
 * * Bug Fixes!
 * ** Crafting an item on a different tab than the first will no longer reset
 *    back to the first tab. Fix made by Irina.
 * 
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
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
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
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
 * @param ItemCraftingSys
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
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0","Custom":"","EnableCustomLayout:eval":"false","HelpWindow_RectJS:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow_RectJS:func":"\"const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ItemWindow_RectJS:func":"\"const wy = this._commandWindow.y + this._commandWindow.height;\\nconst ww = Graphics.boxWidth - this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow_RectJS:func":"\"const ww = this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this._commandWindow.y + this._commandWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
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
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
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
 * @default Skill2
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
 * @max 100
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
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param Custom
 * @text Custom Layout
 *
 * @param EnableCustomLayout:eval
 * @text Enable Custom Layout
 * @parent Custom
 * @type boolean
 * @on Custom
 * @off Automatic
 * @desc Enable a custom layout or automatically create a layout
 * based on the shop scene?
 * @default false
 *
 * @param HelpWindow_RectJS:func
 * @text Help Window JS
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow_RectJS:func
 * @text Category Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow_RectJS:func
 * @text Gold Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ItemWindow_RectJS:func
 * @text Item Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wy = this._commandWindow.y + this._commandWindow.height;\nconst ww = Graphics.boxWidth - this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow_RectJS:func
 * @text Status Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this._commandWindow.y + this._commandWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x248c8e=_0x3762;function _0x3762(_0x420a3d,_0x10330d){const _0x2f09bc=_0x2f09();return _0x3762=function(_0x37626c,_0x4ac874){_0x37626c=_0x37626c-0x1db;let _0x48a1c1=_0x2f09bc[_0x37626c];return _0x48a1c1;},_0x3762(_0x420a3d,_0x10330d);}(function(_0x201725,_0x11bf5d){const _0x5ef28d=_0x3762,_0x43085e=_0x201725();while(!![]){try{const _0x4d6fca=parseInt(_0x5ef28d(0x305))/0x1*(-parseInt(_0x5ef28d(0x402))/0x2)+parseInt(_0x5ef28d(0x306))/0x3+-parseInt(_0x5ef28d(0x2f5))/0x4*(parseInt(_0x5ef28d(0x213))/0x5)+parseInt(_0x5ef28d(0x397))/0x6+parseInt(_0x5ef28d(0x1f1))/0x7+-parseInt(_0x5ef28d(0x2ac))/0x8+parseInt(_0x5ef28d(0x3c2))/0x9;if(_0x4d6fca===_0x11bf5d)break;else _0x43085e['push'](_0x43085e['shift']());}catch(_0x426f07){_0x43085e['push'](_0x43085e['shift']());}}}(_0x2f09,0x7fe34));var label='ItemCraftingSys',tier=tier||0x0,dependencies=[_0x248c8e(0x370)],pluginData=$plugins['filter'](function(_0x4f2849){const _0x377f74=_0x248c8e;return _0x4f2849['status']&&_0x4f2849[_0x377f74(0x29d)][_0x377f74(0x203)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x248c8e(0x28d)]=function(_0x390bca,_0x21ee9f){const _0x44ceb2=_0x248c8e;for(const _0x39b4eb in _0x21ee9f){if(_0x39b4eb[_0x44ceb2(0x1ed)](/(.*):(.*)/i)){const _0x51a661=String(RegExp['$1']),_0x29969d=String(RegExp['$2'])[_0x44ceb2(0x355)]()['trim']();let _0x47672a,_0x49689a,_0x3e85a2;switch(_0x29969d){case _0x44ceb2(0x214):_0x47672a=_0x21ee9f[_0x39b4eb]!==''?Number(_0x21ee9f[_0x39b4eb]):0x0;break;case'ARRAYNUM':_0x49689a=_0x21ee9f[_0x39b4eb]!==''?JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb]):[],_0x47672a=_0x49689a[_0x44ceb2(0x2cb)](_0x127fed=>Number(_0x127fed));break;case _0x44ceb2(0x293):_0x47672a=_0x21ee9f[_0x39b4eb]!==''?eval(_0x21ee9f[_0x39b4eb]):null;break;case _0x44ceb2(0x2b8):_0x49689a=_0x21ee9f[_0x39b4eb]!==''?JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb]):[],_0x47672a=_0x49689a[_0x44ceb2(0x2cb)](_0x5d188b=>eval(_0x5d188b));break;case _0x44ceb2(0x2f1):_0x47672a=_0x21ee9f[_0x39b4eb]!==''?JSON['parse'](_0x21ee9f[_0x39b4eb]):'';break;case _0x44ceb2(0x2c0):_0x49689a=_0x21ee9f[_0x39b4eb]!==''?JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb]):[],_0x47672a=_0x49689a[_0x44ceb2(0x2cb)](_0x5efed5=>JSON[_0x44ceb2(0x351)](_0x5efed5));break;case _0x44ceb2(0x266):_0x47672a=_0x21ee9f[_0x39b4eb]!==''?new Function(JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb])):new Function(_0x44ceb2(0x3b3));break;case _0x44ceb2(0x219):_0x49689a=_0x21ee9f[_0x39b4eb]!==''?JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb]):[],_0x47672a=_0x49689a['map'](_0x3174cf=>new Function(JSON[_0x44ceb2(0x351)](_0x3174cf)));break;case _0x44ceb2(0x389):_0x47672a=_0x21ee9f[_0x39b4eb]!==''?String(_0x21ee9f[_0x39b4eb]):'';break;case _0x44ceb2(0x201):_0x49689a=_0x21ee9f[_0x39b4eb]!==''?JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb]):[],_0x47672a=_0x49689a['map'](_0x21d682=>String(_0x21d682));break;case _0x44ceb2(0x1e6):_0x3e85a2=_0x21ee9f[_0x39b4eb]!==''?JSON['parse'](_0x21ee9f[_0x39b4eb]):{},_0x47672a=VisuMZ[_0x44ceb2(0x28d)]({},_0x3e85a2);break;case'ARRAYSTRUCT':_0x49689a=_0x21ee9f[_0x39b4eb]!==''?JSON[_0x44ceb2(0x351)](_0x21ee9f[_0x39b4eb]):[],_0x47672a=_0x49689a[_0x44ceb2(0x2cb)](_0x3eabf0=>VisuMZ['ConvertParams']({},JSON['parse'](_0x3eabf0)));break;default:continue;}_0x390bca[_0x51a661]=_0x47672a;}}return _0x390bca;},(_0x4b0262=>{const _0x741803=_0x248c8e,_0x4ad329=_0x4b0262[_0x741803(0x247)];for(const _0x51f0b0 of dependencies){if(!Imported[_0x51f0b0]){alert(_0x741803(0x2b9)[_0x741803(0x39a)](_0x4ad329,_0x51f0b0)),SceneManager['exit']();break;}}const _0x55c13e=_0x4b0262[_0x741803(0x29d)];if(_0x55c13e[_0x741803(0x1ed)](/\[Version[ ](.*?)\]/i)){const _0x3e905a=Number(RegExp['$1']);_0x3e905a!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x741803(0x39a)](_0x4ad329,_0x3e905a)),SceneManager[_0x741803(0x2b1)]());}if(_0x55c13e['match'](/\[Tier[ ](\d+)\]/i)){const _0x3bd7dd=Number(RegExp['$1']);_0x3bd7dd<tier?(alert(_0x741803(0x296)[_0x741803(0x39a)](_0x4ad329,_0x3bd7dd,tier)),SceneManager[_0x741803(0x2b1)]()):tier=Math[_0x741803(0x230)](_0x3bd7dd,tier);}VisuMZ[_0x741803(0x28d)](VisuMZ[label][_0x741803(0x330)],_0x4b0262[_0x741803(0x1f0)]);})(pluginData);if(VisuMZ[_0x248c8e(0x2cc)][_0x248c8e(0x2ec)]<1.38){let text='';text+=_0x248c8e(0x417),text+=_0x248c8e(0x348),alert(text),SceneManager[_0x248c8e(0x2b1)]();}VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x2df)]='You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.',PluginManager[_0x248c8e(0x275)](pluginData[_0x248c8e(0x247)],_0x248c8e(0x28c),_0x591f01=>{const _0x17bbb2=_0x248c8e;if(SceneManager[_0x17bbb2(0x3bf)]())return;if(SceneManager[_0x17bbb2(0x379)]())return;if($gameSystem[_0x17bbb2(0x2f3)])return;if(DataManager[_0x17bbb2(0x273)]()[_0x17bbb2(0x40c)]<=0x0){$gameTemp[_0x17bbb2(0x2f0)]()&&alert(VisuMZ['ItemCraftingSys'][_0x17bbb2(0x2df)]);return;}SceneManager[_0x17bbb2(0x1e9)](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData['name'],_0x248c8e(0x205),_0x7eec91=>{const _0x49abb3=_0x248c8e;if(SceneManager[_0x49abb3(0x3bf)]())return;if(SceneManager[_0x49abb3(0x379)]())return;if($gameSystem['_craftingCommonEventScene'])return;VisuMZ[_0x49abb3(0x28d)](_0x7eec91,_0x7eec91);const _0x2bb471={'items':_0x7eec91['Items'][_0x49abb3(0x2cb)](_0x5ef632=>$dataItems[_0x5ef632])[_0x49abb3(0x2a8)](_0xc15c62=>DataManager[_0x49abb3(0x231)]()[_0x49abb3(0x203)](_0xc15c62)),'weapons':_0x7eec91['Weapons']['map'](_0x42e19e=>$dataWeapons[_0x42e19e])[_0x49abb3(0x2a8)](_0x297bc0=>DataManager['allCraftableWeapons']()[_0x49abb3(0x203)](_0x297bc0)),'armors':_0x7eec91['Armors']['map'](_0x37de58=>$dataArmors[_0x37de58])['filter'](_0x5a2652=>DataManager[_0x49abb3(0x3d6)]()[_0x49abb3(0x203)](_0x5a2652)),'BypassSwitches':_0x7eec91[_0x49abb3(0x35c)],'BypassMasks':_0x7eec91[_0x49abb3(0x34a)]};_0x2bb471[_0x49abb3(0x235)]=_0x2bb471[_0x49abb3(0x37b)][_0x49abb3(0x2f8)](_0x2bb471[_0x49abb3(0x362)],_0x2bb471['armors']);if(_0x2bb471[_0x49abb3(0x235)][_0x49abb3(0x40c)]<=0x0){$gameTemp[_0x49abb3(0x2f0)]()&&alert(VisuMZ[_0x49abb3(0x29c)][_0x49abb3(0x2df)]);return;}$gameTemp[_0x49abb3(0x276)](_0x2bb471),SceneManager[_0x49abb3(0x1e9)](Scene_ItemCrafting);}),PluginManager[_0x248c8e(0x275)](pluginData['name'],_0x248c8e(0x363),_0x44c66b=>{const _0x3de453=_0x248c8e;if(!SceneManager[_0x3de453(0x2f4)]())return;if(!$gameSystem[_0x3de453(0x2f3)])return;$gameSystem[_0x3de453(0x2f3)]=undefined,SceneManager[_0x3de453(0x1e9)](Scene_ItemCrafting);}),PluginManager[_0x248c8e(0x275)](pluginData[_0x248c8e(0x247)],_0x248c8e(0x1ea),_0x42f7d4=>{const _0x455fe1=_0x248c8e;VisuMZ[_0x455fe1(0x28d)](_0x42f7d4,_0x42f7d4),$gameSystem['setMainMenuItemCraftingEnabled'](_0x42f7d4[_0x455fe1(0x31b)]);}),PluginManager[_0x248c8e(0x275)](pluginData[_0x248c8e(0x247)],_0x248c8e(0x260),_0x2c26be=>{const _0x2536f5=_0x248c8e;VisuMZ[_0x2536f5(0x28d)](_0x2c26be,_0x2c26be),$gameSystem[_0x2536f5(0x2e2)](_0x2c26be[_0x2536f5(0x3fd)]);}),VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x3be)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftBatchWrap':/<CRAFT BATCH>\s*([\s\S]*)\s*<\/CRAFT BATCH>/i},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x32d)]=Scene_Boot[_0x248c8e(0x33a)]['onDatabaseLoaded'],Scene_Boot[_0x248c8e(0x33a)][_0x248c8e(0x320)]=function(){const _0x43331a=_0x248c8e;VisuMZ['ItemCraftingSys'][_0x43331a(0x32d)]['call'](this),this[_0x43331a(0x240)]();},Scene_Boot[_0x248c8e(0x33a)]['process_VisuMZ_ItemCraftingSys_Notetags']=function(){const _0x1b9ba4=_0x248c8e;this[_0x1b9ba4(0x253)]();},Scene_Boot[_0x248c8e(0x33a)][_0x248c8e(0x253)]=function(){const _0x56b523=_0x248c8e;if(VisuMZ[_0x56b523(0x3dc)])return;const _0x464526=$dataItems[_0x56b523(0x2f8)]($dataWeapons,$dataArmors);for(const _0x376204 of _0x464526){if(!_0x376204)continue;VisuMZ['ItemCraftingSys'][_0x56b523(0x25f)](_0x376204);}},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x3ad)]=VisuMZ[_0x248c8e(0x3ad)],VisuMZ[_0x248c8e(0x3ad)]=function(_0x11022c){const _0xa86cf5=_0x248c8e;VisuMZ[_0xa86cf5(0x29c)][_0xa86cf5(0x3ad)][_0xa86cf5(0x3c5)](this,_0x11022c),VisuMZ[_0xa86cf5(0x29c)]['Parse_Notetags_CreateJS'](_0x11022c);},VisuMZ['ItemCraftingSys'][_0x248c8e(0x1df)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x248c8e(0x1df)]=function(_0x4ed85d){const _0x5c0898=_0x248c8e;VisuMZ[_0x5c0898(0x29c)][_0x5c0898(0x1df)][_0x5c0898(0x3c5)](this,_0x4ed85d),VisuMZ[_0x5c0898(0x29c)][_0x5c0898(0x25f)](_0x4ed85d);},VisuMZ['ItemCraftingSys'][_0x248c8e(0x2db)]=VisuMZ[_0x248c8e(0x2db)],VisuMZ[_0x248c8e(0x2db)]=function(_0x51a784){const _0x174d3e=_0x248c8e;VisuMZ[_0x174d3e(0x29c)][_0x174d3e(0x2db)][_0x174d3e(0x3c5)](this,_0x51a784),VisuMZ[_0x174d3e(0x29c)]['Parse_Notetags_CreateJS'](_0x51a784);},VisuMZ['ItemCraftingSys'][_0x248c8e(0x25f)]=function(_0x346e3a){const _0x47eaee=_0x248c8e;_0x346e3a[_0x47eaee(0x2d9)][_0x47eaee(0x1ed)](VisuMZ[_0x47eaee(0x29c)][_0x47eaee(0x3be)][_0x47eaee(0x1f2)])&&VisuMZ['ItemCraftingSys'][_0x47eaee(0x2c9)](_0x346e3a,RegExp['$1']);},VisuMZ[_0x248c8e(0x29c)]['JS']={},VisuMZ['ItemCraftingSys']['createJS']=function(_0x56ce26,_0x202c57){const _0x476128=_0x248c8e,_0x50579f=_0x476128(0x3c0)[_0x476128(0x39a)](_0x202c57),_0x297027=DataManager[_0x476128(0x263)](_0x56ce26);VisuMZ[_0x476128(0x29c)]['JS'][_0x297027]=new Function(_0x50579f);},DataManager[_0x248c8e(0x2b0)]=function(_0x31198d){const _0x92b9b1=_0x248c8e;if(!_0x31198d)return![];if(DataManager['getCraftingIngredients'](_0x31198d)[_0x92b9b1(0x40c)]<=0x0)return![];if(_0x31198d[_0x92b9b1(0x2d9)][_0x92b9b1(0x1ed)](VisuMZ[_0x92b9b1(0x29c)]['RegExp'][_0x92b9b1(0x22d)])){if(!$gameTemp['getCustomItemCraftingSettings']())return![];}if(!VisuMZ[_0x92b9b1(0x29c)][_0x92b9b1(0x330)]['General'][_0x92b9b1(0x30b)][_0x92b9b1(0x3c5)](this,_0x31198d))return![];if(!VisuMZ[_0x92b9b1(0x29c)][_0x92b9b1(0x254)](_0x31198d))return![];if(!VisuMZ[_0x92b9b1(0x29c)][_0x92b9b1(0x3da)](_0x31198d))return![];return!![];},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x254)]=function(_0x28a8c5){const _0x2c63a6=_0x248c8e,_0x2f4c74=$gameTemp[_0x2c63a6(0x35f)]();if(_0x2f4c74&&_0x2f4c74['BypassSwitches'])return!![];const _0x301f51=VisuMZ[_0x2c63a6(0x29c)][_0x2c63a6(0x3be)][_0x2c63a6(0x40b)],_0x5eaa54=_0x28a8c5[_0x2c63a6(0x2d9)][_0x2c63a6(0x1ed)](_0x301f51);if(_0x5eaa54)for(const _0x42f6c6 of _0x5eaa54){if(!_0x42f6c6)continue;_0x42f6c6[_0x2c63a6(0x1ed)](_0x301f51);const _0x56fcab=JSON[_0x2c63a6(0x351)]('['+RegExp['$1'][_0x2c63a6(0x1ed)](/\d+/g)+']');for(const _0x3109a6 of _0x56fcab){if(!$gameSwitches[_0x2c63a6(0x329)](_0x3109a6))return![];}}return!![];},VisuMZ['ItemCraftingSys']['CheckAnySwitches']=function(_0x1afb3c){const _0x2f411d=_0x248c8e,_0x2eec30=$gameTemp['getCustomItemCraftingSettings']();if(_0x2eec30&&_0x2eec30['BypassSwitches'])return!![];const _0xe81c80=VisuMZ[_0x2f411d(0x29c)][_0x2f411d(0x3be)]['AnySwitches'],_0x211cf9=_0x1afb3c[_0x2f411d(0x2d9)][_0x2f411d(0x1ed)](_0xe81c80);if(_0x211cf9){for(const _0x474732 of _0x211cf9){if(!_0x474732)continue;_0x474732[_0x2f411d(0x1ed)](_0xe81c80);const _0x383fa4=JSON[_0x2f411d(0x351)]('['+RegExp['$1'][_0x2f411d(0x1ed)](/\d+/g)+']');for(const _0x56b98a of _0x383fa4){if($gameSwitches['value'](_0x56b98a))return!![];}}return![];}return!![];},DataManager[_0x248c8e(0x273)]=function(){const _0x13df64=_0x248c8e,_0x2ab0a3=$gameTemp['getCustomItemCraftingSettings']();if(_0x2ab0a3)return _0x2ab0a3[_0x13df64(0x235)][_0x13df64(0x2a8)](_0x31ce93=>this[_0x13df64(0x2b0)](_0x31ce93));const _0xb03660=this[_0x13df64(0x2a4)](),_0x540dea=this[_0x13df64(0x2b4)](),_0x62fd9f=this[_0x13df64(0x285)]();return _0xb03660[_0x13df64(0x2f8)](_0x540dea,_0x62fd9f);},DataManager[_0x248c8e(0x2a4)]=function(){const _0x4e0b0a=_0x248c8e;let _0x4aea65=this['allCraftableItems']()[_0x4e0b0a(0x2a8)](_0x54d082=>this[_0x4e0b0a(0x2b0)](_0x54d082));if(VisuMZ[_0x4e0b0a(0x2cc)][_0x4e0b0a(0x2ed)])VisuMZ[_0x4e0b0a(0x2cc)][_0x4e0b0a(0x2ed)](_0x4aea65);return _0x4aea65;},DataManager[_0x248c8e(0x231)]=function(){const _0x3b17da=_0x248c8e;if(this[_0x3b17da(0x3b2)]!==undefined)return this[_0x3b17da(0x3b2)];this[_0x3b17da(0x3b2)]=[];for(const _0x33b5cb of $dataItems){if(!_0x33b5cb)continue;_0x33b5cb['note']['match'](VisuMZ[_0x3b17da(0x29c)][_0x3b17da(0x3be)][_0x3b17da(0x233)])&&this[_0x3b17da(0x3b2)][_0x3b17da(0x1e9)](_0x33b5cb);}return this[_0x3b17da(0x3b2)];},DataManager['craftableWeapons']=function(){const _0x541b8d=_0x248c8e;let _0x400fea=this['allCraftableWeapons']()[_0x541b8d(0x2a8)](_0x41c27b=>this['isCraftItemListed'](_0x41c27b));if(VisuMZ[_0x541b8d(0x2cc)][_0x541b8d(0x2ed)])VisuMZ['ItemsEquipsCore'][_0x541b8d(0x2ed)](_0x400fea);return _0x400fea;},DataManager[_0x248c8e(0x3e5)]=function(){const _0x4b8cca=_0x248c8e;if(this[_0x4b8cca(0x29a)]!==undefined)return this[_0x4b8cca(0x29a)];this[_0x4b8cca(0x29a)]=[];for(const _0x1b7b04 of $dataWeapons){if(!_0x1b7b04)continue;_0x1b7b04[_0x4b8cca(0x2d9)][_0x4b8cca(0x1ed)](VisuMZ[_0x4b8cca(0x29c)]['RegExp'][_0x4b8cca(0x233)])&&this[_0x4b8cca(0x29a)][_0x4b8cca(0x1e9)](_0x1b7b04);}return this[_0x4b8cca(0x29a)];},DataManager[_0x248c8e(0x285)]=function(){const _0x50fa09=_0x248c8e;let _0x580501=this[_0x50fa09(0x3d6)]()['filter'](_0x1beb27=>this['isCraftItemListed'](_0x1beb27));if(VisuMZ[_0x50fa09(0x2cc)][_0x50fa09(0x2ed)])VisuMZ['ItemsEquipsCore'][_0x50fa09(0x2ed)](_0x580501);return _0x580501;},DataManager[_0x248c8e(0x3d6)]=function(){const _0xbe2fb1=_0x248c8e;if(this[_0xbe2fb1(0x2a6)]!==undefined)return this[_0xbe2fb1(0x2a6)];this[_0xbe2fb1(0x2a6)]=[];for(const _0x5de276 of $dataArmors){if(!_0x5de276)continue;_0x5de276['note'][_0xbe2fb1(0x1ed)](VisuMZ[_0xbe2fb1(0x29c)]['RegExp']['Ingredients'])&&this[_0xbe2fb1(0x2a6)][_0xbe2fb1(0x1e9)](_0x5de276);}return this[_0xbe2fb1(0x2a6)];},DataManager[_0x248c8e(0x3ab)]=function(_0x3616cd){const _0x10e797=_0x248c8e;if(!_0x3616cd)return[];const _0x436e33=this['createCraftingItemKey'](_0x3616cd);return this[_0x10e797(0x215)]===undefined&&this['createCraftingIngredientsLists'](),this['_craftingIngredients'][_0x436e33]||[];},DataManager['createCraftingItemKey']=function(_0x587130){const _0x1bafe5=_0x248c8e;let _0x35373f='%1%2';if(this[_0x1bafe5(0x24c)](_0x587130))return _0x35373f['format'](_0x1bafe5(0x25d),_0x587130['id']);if(this['isWeapon'](_0x587130))return _0x35373f[_0x1bafe5(0x39a)](_0x1bafe5(0x25a),_0x587130['id']);if(this[_0x1bafe5(0x350)](_0x587130))return _0x35373f[_0x1bafe5(0x39a)](_0x1bafe5(0x29f),_0x587130['id']);return'';},DataManager[_0x248c8e(0x2cd)]=function(){const _0x477cbf=_0x248c8e;this[_0x477cbf(0x215)]={};const _0x2ee944=$dataItems[_0x477cbf(0x2f8)]($dataWeapons,$dataArmors);for(const _0x48437f of _0x2ee944){if(!_0x48437f)continue;if(_0x48437f[_0x477cbf(0x2d9)][_0x477cbf(0x1ed)](VisuMZ[_0x477cbf(0x29c)]['RegExp'][_0x477cbf(0x233)])){const _0x3c5ea6=String(RegExp['$1'])[_0x477cbf(0x375)](/[\r\n]+/),_0x4db83b=this[_0x477cbf(0x32c)](_0x48437f,_0x3c5ea6);if(_0x4db83b['length']<=0x0)continue;const _0x4536b3=this[_0x477cbf(0x263)](_0x48437f);this['_craftingIngredients'][_0x4536b3]=_0x4db83b;}}},DataManager['parseCraftingIngredientsData']=function(_0x125069,_0x52f586){const _0x317bd3=_0x248c8e;let _0x66b1c8=[];for(let _0x18f998 of _0x52f586){_0x18f998=_0x18f998[_0x317bd3(0x298)]();if(_0x18f998['match'](/GOLD:[ ](\d+)/i))_0x66b1c8[_0x317bd3(0x1e9)]([_0x317bd3(0x40e),Number(RegExp['$1'])]);else{if(_0x18f998[_0x317bd3(0x1ed)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x35abfe=String(RegExp['$1'])['trim'](),_0x3504fa=Number(RegExp['$2'])||0x1,_0x1f3d47=_0x317bd3(0x22e)[_0x317bd3(0x39a)](_0x35abfe);_0x66b1c8[_0x317bd3(0x1e9)]([_0x1f3d47,_0x3504fa]);}else{if(_0x18f998[_0x317bd3(0x1ed)](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x2c6f7d=RegExp['$1'][_0x317bd3(0x1eb)]()[_0x317bd3(0x298)](),_0x5d0b8b=Number(RegExp['$2'])||0x0,_0x54dba2=Number(RegExp['$3'])||0x1;let _0x399d16=null;if([_0x317bd3(0x33c),_0x317bd3(0x37b)][_0x317bd3(0x203)](_0x2c6f7d))_0x399d16=$dataItems;if(['weapon',_0x317bd3(0x362)][_0x317bd3(0x203)](_0x2c6f7d))_0x399d16=$dataWeapons;if(['armor',_0x317bd3(0x32e)][_0x317bd3(0x203)](_0x2c6f7d))_0x399d16=$dataArmors;this['checkItemCraftingResultsValid'](_0x125069,_0x399d16,_0x5d0b8b,_0x66b1c8)&&_0x66b1c8[_0x317bd3(0x1e9)]([_0x399d16[_0x5d0b8b],_0x54dba2]);}else{if(_0x18f998['match'](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x5457b5=RegExp['$1']['toLowerCase']()['trim'](),_0x1009c6=RegExp['$2'][_0x317bd3(0x298)](),_0x73ac77=Number(RegExp['$3'])||0x1;let _0x71ee7d=null,_0x41f818=0x0;[_0x317bd3(0x33c),_0x317bd3(0x37b)][_0x317bd3(0x203)](_0x5457b5)&&(_0x71ee7d=$dataItems,_0x41f818=this[_0x317bd3(0x2d4)](_0x1009c6)),[_0x317bd3(0x29b),_0x317bd3(0x362)][_0x317bd3(0x203)](_0x5457b5)&&(_0x71ee7d=$dataWeapons,_0x41f818=this['getWeaponIdWithName'](_0x1009c6)),[_0x317bd3(0x406),_0x317bd3(0x32e)][_0x317bd3(0x203)](_0x5457b5)&&(_0x71ee7d=$dataArmors,_0x41f818=this[_0x317bd3(0x269)](_0x1009c6)),this[_0x317bd3(0x401)](_0x125069,_0x71ee7d,_0x41f818,_0x66b1c8)&&_0x66b1c8[_0x317bd3(0x1e9)]([_0x71ee7d[_0x41f818],_0x73ac77]);}}}}}return _0x66b1c8;},DataManager['checkItemCraftingResultsValid']=function(_0x4f48e2,_0x56a786,_0x1b0749,_0x31ba89){if(!_0x56a786)return![];if(!_0x56a786[_0x1b0749])return![];const _0xfcef67=_0x56a786[_0x1b0749];if(_0xfcef67===_0x4f48e2)return![];for(const _0x133f32 of _0x31ba89){if(!_0x133f32)continue;if(_0x133f32[0x0]===_0xfcef67)return![];}return!![];},DataManager['getItemIdWithName']=function(_0x485f3a){const _0x346074=_0x248c8e;_0x485f3a=_0x485f3a[_0x346074(0x355)]()[_0x346074(0x298)](),this[_0x346074(0x394)]=this[_0x346074(0x394)]||{};if(this[_0x346074(0x394)][_0x485f3a])return this['_itemIDs'][_0x485f3a];for(const _0x36df2d of $dataItems){if(!_0x36df2d)continue;this[_0x346074(0x394)][_0x36df2d[_0x346074(0x247)][_0x346074(0x355)]()[_0x346074(0x298)]()]=_0x36df2d['id'];}return this[_0x346074(0x394)][_0x485f3a]||0x0;},DataManager[_0x248c8e(0x3d8)]=function(_0x39916a){const _0x4c945e=_0x248c8e;_0x39916a=_0x39916a[_0x4c945e(0x355)]()[_0x4c945e(0x298)](),this[_0x4c945e(0x26d)]=this[_0x4c945e(0x26d)]||{};if(this[_0x4c945e(0x26d)][_0x39916a])return this[_0x4c945e(0x26d)][_0x39916a];for(const _0x398259 of $dataWeapons){if(!_0x398259)continue;this[_0x4c945e(0x26d)][_0x398259['name'][_0x4c945e(0x355)]()[_0x4c945e(0x298)]()]=_0x398259['id'];}return this[_0x4c945e(0x26d)][_0x39916a]||0x0;},DataManager[_0x248c8e(0x269)]=function(_0x299c31){const _0x1f8168=_0x248c8e;_0x299c31=_0x299c31[_0x1f8168(0x355)]()[_0x1f8168(0x298)](),this[_0x1f8168(0x2c1)]=this[_0x1f8168(0x2c1)]||{};if(this[_0x1f8168(0x2c1)][_0x299c31])return this['_armorIDs'][_0x299c31];for(const _0x137a7a of $dataArmors){if(!_0x137a7a)continue;this['_armorIDs'][_0x137a7a['name'][_0x1f8168(0x355)]()[_0x1f8168(0x298)]()]=_0x137a7a['id'];}return this[_0x1f8168(0x2c1)][_0x299c31]||0x0;},DataManager[_0x248c8e(0x39d)]=function(_0x540434){const _0x1b8077=_0x248c8e;if(!_0x540434)return![];if(DataManager['hasCraftBatchItems'](_0x540434))return![];if(!VisuMZ[_0x1b8077(0x29c)][_0x1b8077(0x330)][_0x1b8077(0x317)][_0x1b8077(0x31b)])return![];DataManager[_0x1b8077(0x2e6)]&&(_0x540434=DataManager[_0x1b8077(0x2e6)](_0x540434));const _0x27677d=$gameTemp[_0x1b8077(0x35f)]();if(_0x27677d&&_0x27677d[_0x1b8077(0x34a)])return![];if(_0x540434[_0x1b8077(0x2d9)][_0x1b8077(0x1ed)](VisuMZ['ItemCraftingSys'][_0x1b8077(0x3be)][_0x1b8077(0x33f)]))return![];return!$gameSystem[_0x1b8077(0x226)](_0x540434);},DataManager[_0x248c8e(0x405)]=function(_0x5ecc85){const _0xd94987=_0x248c8e;if(!Imported[_0xd94987(0x33d)])return![];return this[_0xd94987(0x258)](_0x5ecc85)!==null;},DataManager[_0x248c8e(0x258)]=function(_0x5d8c05){const _0x2c44af=_0x248c8e;if(!_0x5d8c05)return null;if(this[_0x2c44af(0x3f6)](_0x5d8c05))return null;if(this['isProxyItem'](_0x5d8c05))return null;if(!Imported[_0x2c44af(0x33d)])return null;let _0x3abbee='';if(DataManager[_0x2c44af(0x24c)](_0x5d8c05))_0x3abbee=_0x2c44af(0x2eb)[_0x2c44af(0x39a)](_0x5d8c05['id']);else{if(DataManager[_0x2c44af(0x1f8)](_0x5d8c05))_0x3abbee=_0x2c44af(0x346)[_0x2c44af(0x39a)](_0x5d8c05['id']);else{if(DataManager[_0x2c44af(0x350)](_0x5d8c05))_0x3abbee=_0x2c44af(0x292)['format'](_0x5d8c05['id']);else return null;}}DataManager[_0x2c44af(0x248)]=DataManager[_0x2c44af(0x248)]||{};if(DataManager[_0x2c44af(0x248)][_0x3abbee]!==undefined)return DataManager[_0x2c44af(0x248)][_0x3abbee];let _0x4c6b80=![],_0x779f59={};const _0x850a0d=VisuMZ[_0x2c44af(0x29c)]['RegExp'],_0x400f76=_0x5d8c05[_0x2c44af(0x2d9)]||'';if(_0x400f76[_0x2c44af(0x1ed)](_0x850a0d[_0x2c44af(0x418)])){const _0x884cf8=String(RegExp['$1'])[_0x2c44af(0x375)](/[\r\n]+/)[_0x2c44af(0x369)]('');_0x779f59={'items':{},'weapons':{},'armors':{}};for(const _0x37fa98 of _0x884cf8){if(_0x37fa98[_0x2c44af(0x1ed)](/ITEM[ ](.*):[ ](\d+)/i)){const _0x4fa9a5=String(RegExp['$1']),_0x500fc9=Math[_0x2c44af(0x230)](0x1,Number(RegExp['$2'])),_0x41ab16=/^\d+$/[_0x2c44af(0x290)](_0x4fa9a5),_0x7bf963=_0x41ab16?Number(_0x4fa9a5):this[_0x2c44af(0x2d4)](_0x4fa9a5);if(DataManager[_0x2c44af(0x24c)](_0x5d8c05)&&_0x7bf963===_0x5d8c05['id']){let _0x3a5a17='';_0x3a5a17+=_0x2c44af(0x39e)[_0x2c44af(0x39a)](_0x5d8c05[_0x2c44af(0x247)]),_0x3a5a17+=_0x2c44af(0x360),alert(_0x3a5a17),SceneManager[_0x2c44af(0x2b1)]();}_0x779f59[_0x2c44af(0x37b)][_0x7bf963]=_0x500fc9,_0x4c6b80=!![];}else{if(_0x37fa98[_0x2c44af(0x1ed)](/ITEM[ ](.*)/i)){const _0x226d95=String(RegExp['$1']),_0x52c27a=/^\d+$/['test'](_0x226d95),_0x40f160=_0x52c27a?Number(_0x226d95):this['getItemIdWithName'](_0x226d95);if(DataManager[_0x2c44af(0x24c)](_0x5d8c05)&&_0x40f160===_0x5d8c05['id']){let _0x63538b='';_0x63538b+=_0x2c44af(0x39e)[_0x2c44af(0x39a)](_0x5d8c05[_0x2c44af(0x247)]),_0x63538b+=_0x2c44af(0x360),alert(_0x63538b),SceneManager['exit']();}_0x779f59[_0x2c44af(0x37b)][_0x40f160]=0x1,_0x4c6b80=!![];}}if(_0x37fa98[_0x2c44af(0x1ed)](/WEAPON[ ](.*):[ ](\d+)/i)){const _0x5e8fce=String(RegExp['$1']),_0x5bd732=Math[_0x2c44af(0x230)](0x1,Number(RegExp['$2'])),_0x3d2827=/^\d+$/[_0x2c44af(0x290)](_0x5e8fce),_0x223d08=_0x3d2827?Number(_0x5e8fce):this['getWeaponIdWithName'](_0x5e8fce);if(DataManager[_0x2c44af(0x1f8)](_0x5d8c05)&&_0x223d08===_0x5d8c05['id']){let _0x3f47d8='';_0x3f47d8+='%1\x20has\x20illegal\x20batch\x20contents:\x0a'[_0x2c44af(0x39a)](_0x5d8c05[_0x2c44af(0x247)]),_0x3f47d8+=_0x2c44af(0x360),alert(_0x3f47d8),SceneManager[_0x2c44af(0x2b1)]();}_0x779f59['weapons'][_0x223d08]=_0x5bd732,_0x4c6b80=!![];}else{if(_0x37fa98['match'](/WEAPON[ ](.*)/i)){const _0x3d16ab=String(RegExp['$1']),_0x11ee37=/^\d+$/[_0x2c44af(0x290)](_0x3d16ab),_0x4991d9=_0x11ee37?Number(_0x3d16ab):this[_0x2c44af(0x3d8)](_0x3d16ab);if(DataManager[_0x2c44af(0x1f8)](_0x5d8c05)&&_0x4991d9===_0x5d8c05['id']){let _0x706133='';_0x706133+=_0x2c44af(0x39e)[_0x2c44af(0x39a)](_0x5d8c05['name']),_0x706133+=_0x2c44af(0x360),alert(_0x706133),SceneManager[_0x2c44af(0x2b1)]();}_0x779f59[_0x2c44af(0x362)][_0x4991d9]=0x1,_0x4c6b80=!![];}}if(_0x37fa98[_0x2c44af(0x1ed)](/ARMOR[ ](.*):[ ](\d+)/i)){const _0x555d7a=String(RegExp['$1']),_0x305a29=Math[_0x2c44af(0x230)](0x1,Number(RegExp['$2'])),_0x460e47=/^\d+$/['test'](_0x555d7a),_0x33c20e=_0x460e47?Number(_0x555d7a):this[_0x2c44af(0x269)](_0x555d7a);if(DataManager[_0x2c44af(0x350)](_0x5d8c05)&&_0x33c20e===_0x5d8c05['id']){let _0x442a3c='';_0x442a3c+=_0x2c44af(0x39e)[_0x2c44af(0x39a)](_0x5d8c05[_0x2c44af(0x247)]),_0x442a3c+=_0x2c44af(0x360),alert(_0x442a3c),SceneManager['exit']();}_0x779f59['armors'][_0x33c20e]=_0x305a29,_0x4c6b80=!![];}else{if(_0x37fa98[_0x2c44af(0x1ed)](/ARMOR[ ](.*)/i)){const _0x41bc05=String(RegExp['$1']),_0x34a03e=/^\d+$/[_0x2c44af(0x290)](_0x41bc05),_0x411d16=_0x34a03e?Number(_0x41bc05):this[_0x2c44af(0x269)](_0x41bc05);if(DataManager[_0x2c44af(0x350)](_0x5d8c05)&&_0x411d16===_0x5d8c05['id']){let _0x1cbea7='';_0x1cbea7+='%1\x20has\x20illegal\x20batch\x20contents:\x0a'['format'](_0x5d8c05[_0x2c44af(0x247)]),_0x1cbea7+=_0x2c44af(0x360),alert(_0x1cbea7),SceneManager[_0x2c44af(0x2b1)]();}_0x779f59[_0x2c44af(0x32e)][_0x411d16]=0x1,_0x4c6b80=!![];}}}}if(!_0x4c6b80)_0x779f59=null;return DataManager[_0x2c44af(0x248)][_0x3abbee]=_0x779f59,DataManager[_0x2c44af(0x248)][_0x3abbee];},ImageManager[_0x248c8e(0x294)]=VisuMZ['ItemCraftingSys'][_0x248c8e(0x330)][_0x248c8e(0x3a2)][_0x248c8e(0x262)],SoundManager[_0x248c8e(0x3a0)]=function(_0x101385){const _0x2f06ef=_0x248c8e;AudioManager[_0x2f06ef(0x282)](VisuMZ[_0x2f06ef(0x29c)][_0x2f06ef(0x330)][_0x2f06ef(0x3ca)]);},TextManager[_0x248c8e(0x36b)]=VisuMZ['ItemCraftingSys'][_0x248c8e(0x330)][_0x248c8e(0x3a2)][_0x248c8e(0x27a)],TextManager[_0x248c8e(0x387)]=VisuMZ[_0x248c8e(0x29c)]['Settings'][_0x248c8e(0x3a2)][_0x248c8e(0x39b)],TextManager['itemCraftingMask']=VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x330)][_0x248c8e(0x317)][_0x248c8e(0x2c8)],TextManager[_0x248c8e(0x318)]=VisuMZ[_0x248c8e(0x29c)]['Settings'][_0x248c8e(0x25b)][_0x248c8e(0x403)],TextManager[_0x248c8e(0x216)]={'owned':VisuMZ['ItemCraftingSys']['Settings'][_0x248c8e(0x3a2)][_0x248c8e(0x337)]||_0x248c8e(0x2f2),'shift':VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x330)]['General'][_0x248c8e(0x218)]||_0x248c8e(0x396),'net':VisuMZ[_0x248c8e(0x29c)]['Settings']['General'][_0x248c8e(0x36d)]||'Net'},ColorManager['getColor']=function(_0x8c991){const _0x4d6a15=_0x248c8e;return _0x8c991=String(_0x8c991),_0x8c991[_0x4d6a15(0x1ed)](/#(.*)/i)?_0x4d6a15(0x36c)[_0x4d6a15(0x39a)](String(RegExp['$1'])):this['textColor'](Number(_0x8c991));},SceneManager[_0x248c8e(0x3bf)]=function(){const _0x52a6df=_0x248c8e;return this['_scene']&&this[_0x52a6df(0x1fd)]['constructor']===Scene_Battle;},SceneManager[_0x248c8e(0x379)]=function(){const _0x6311aa=_0x248c8e;return this['_scene']&&this[_0x6311aa(0x1fd)][_0x6311aa(0x2fb)]===Scene_ItemCrafting;},Game_Temp['prototype'][_0x248c8e(0x35f)]=function(){return this['_customItemCraftingSettings'];},Game_Temp[_0x248c8e(0x33a)][_0x248c8e(0x3b5)]=function(){const _0x1798ed=_0x248c8e;this[_0x1798ed(0x2e5)]=undefined;},Game_Temp['prototype'][_0x248c8e(0x276)]=function(_0x598dd4){const _0x40d6b3=_0x248c8e;this[_0x40d6b3(0x2e5)]=_0x598dd4;},VisuMZ[_0x248c8e(0x29c)]['Game_System_initialize']=Game_System[_0x248c8e(0x33a)][_0x248c8e(0x345)],Game_System[_0x248c8e(0x33a)][_0x248c8e(0x345)]=function(){const _0x551491=_0x248c8e;VisuMZ[_0x551491(0x29c)][_0x551491(0x414)][_0x551491(0x3c5)](this),this[_0x551491(0x3a4)](),this[_0x551491(0x3e3)](),this[_0x551491(0x22b)]();},Game_System[_0x248c8e(0x33a)]['initItemCraftingMainMenu']=function(){const _0xb8067f=_0x248c8e;this[_0xb8067f(0x400)]={'shown':VisuMZ[_0xb8067f(0x29c)]['Settings'][_0xb8067f(0x25b)][_0xb8067f(0x326)],'enabled':VisuMZ[_0xb8067f(0x29c)]['Settings']['MainMenu'][_0xb8067f(0x23a)]};},Game_System['prototype']['isMainMenuItemCraftingVisible']=function(){const _0x1748fa=_0x248c8e;if(this[_0x1748fa(0x400)]===undefined)this[_0x1748fa(0x3a4)]();return this[_0x1748fa(0x400)]['shown'];},Game_System['prototype'][_0x248c8e(0x2e2)]=function(_0x274654){const _0x445460=_0x248c8e;if(this[_0x445460(0x400)]===undefined)this[_0x445460(0x3a4)]();this[_0x445460(0x400)][_0x445460(0x20b)]=_0x274654;},Game_System[_0x248c8e(0x33a)][_0x248c8e(0x3e2)]=function(){const _0x2d7fa7=_0x248c8e;if(this[_0x2d7fa7(0x400)]===undefined)this['initItemCraftingMainMenu']();return this[_0x2d7fa7(0x400)]['enabled'];},Game_System[_0x248c8e(0x33a)][_0x248c8e(0x3ea)]=function(_0x5f1ec7){const _0x241dcc=_0x248c8e;if(this['_ItemCrafting_MainMenu']===undefined)this['initItemCraftingMainMenu']();this[_0x241dcc(0x400)][_0x241dcc(0x3bb)]=_0x5f1ec7;},Game_System['prototype'][_0x248c8e(0x3e3)]=function(){this['_itemsCrafted']={'items':{},'weapons':{},'armors':{}};},Game_System['prototype'][_0x248c8e(0x226)]=function(_0xa86d42){const _0x5ca736=_0x248c8e;return!!this[_0x5ca736(0x270)](_0xa86d42);},Game_System['prototype'][_0x248c8e(0x270)]=function(_0x5e50d5){const _0x4022ab=_0x248c8e;if(!_0x5e50d5)return![];if(this[_0x4022ab(0x268)]===undefined)this[_0x4022ab(0x3e3)]();let _0x34ca51={};if(DataManager[_0x4022ab(0x24c)](_0x5e50d5))_0x34ca51=this[_0x4022ab(0x268)]['items'];if(DataManager[_0x4022ab(0x1f8)](_0x5e50d5))_0x34ca51=this[_0x4022ab(0x268)][_0x4022ab(0x362)];if(DataManager[_0x4022ab(0x350)](_0x5e50d5))_0x34ca51=this[_0x4022ab(0x268)][_0x4022ab(0x32e)];return _0x34ca51[_0x5e50d5['id']]||0x0;},Game_System[_0x248c8e(0x33a)][_0x248c8e(0x232)]=function(_0x3c248d,_0x26fabb){const _0x4b4f2b=_0x248c8e;if(!_0x3c248d)return![];if(this['_itemsCrafted']===undefined)this[_0x4b4f2b(0x3e3)]();_0x26fabb=_0x26fabb||0x1;let _0xfc851d={};if(DataManager[_0x4b4f2b(0x24c)](_0x3c248d))_0xfc851d=this[_0x4b4f2b(0x268)][_0x4b4f2b(0x37b)];if(DataManager['isWeapon'](_0x3c248d))_0xfc851d=this[_0x4b4f2b(0x268)]['weapons'];if(DataManager['isArmor'](_0x3c248d))_0xfc851d=this['_itemsCrafted'][_0x4b4f2b(0x32e)];_0xfc851d[_0x3c248d['id']]=_0xfc851d[_0x3c248d['id']]||0x0,_0xfc851d[_0x3c248d['id']]+=_0x26fabb;},Game_System[_0x248c8e(0x33a)][_0x248c8e(0x22b)]=function(){this['_craftingEvents']={'items':[],'weapons':[],'armors':[]};},Game_System[_0x248c8e(0x33a)][_0x248c8e(0x259)]=function(_0x3abf08){const _0x2012b4=_0x248c8e;if(this['_craftingEvents']===undefined)this[_0x2012b4(0x22b)]();let _0x3e780a=[];if(DataManager[_0x2012b4(0x24c)](_0x3abf08))_0x3e780a=this[_0x2012b4(0x2da)][_0x2012b4(0x37b)];else{if(DataManager['isWeapon'](_0x3abf08))_0x3e780a=this[_0x2012b4(0x2da)]['weapons'];else DataManager[_0x2012b4(0x350)](_0x3abf08)&&(_0x3e780a=this[_0x2012b4(0x2da)][_0x2012b4(0x32e)]);}!_0x3e780a[_0x2012b4(0x203)](_0x3abf08['id'])&&_0x3e780a['push'](_0x3abf08['id']);},Game_System[_0x248c8e(0x33a)]['hasCraftingEventOccurred']=function(_0x41a53e){const _0x4bf572=_0x248c8e;if(this[_0x4bf572(0x2da)]===undefined)this['initItemCraftingEvents']();let _0x3c513d=[];if(DataManager[_0x4bf572(0x24c)](_0x41a53e))_0x3c513d=this['_craftingEvents'][_0x4bf572(0x37b)];else{if(DataManager[_0x4bf572(0x1f8)](_0x41a53e))_0x3c513d=this[_0x4bf572(0x2da)]['weapons'];else DataManager[_0x4bf572(0x350)](_0x41a53e)&&(_0x3c513d=this[_0x4bf572(0x2da)][_0x4bf572(0x32e)]);}return _0x3c513d['includes'](_0x41a53e['id']);},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x21f)]=Game_Party[_0x248c8e(0x33a)][_0x248c8e(0x37a)],Game_Party[_0x248c8e(0x33a)]['numItems']=function(_0x232e52){const _0x2c0c29=_0x248c8e;if(DataManager[_0x2c0c29(0x405)](_0x232e52))return 0x0;return VisuMZ[_0x2c0c29(0x29c)][_0x2c0c29(0x21f)][_0x2c0c29(0x3c5)](this,_0x232e52);},VisuMZ['ItemCraftingSys']['Game_Party_gainItem']=Game_Party[_0x248c8e(0x33a)][_0x248c8e(0x3ee)],Game_Party[_0x248c8e(0x33a)]['gainItem']=function(_0x456aab,_0xd4e0e2,_0x573111){const _0x7bd31=_0x248c8e;DataManager[_0x7bd31(0x405)](_0x456aab)&&_0xd4e0e2>0x0?this[_0x7bd31(0x1ec)](_0x456aab,_0xd4e0e2):VisuMZ['ItemCraftingSys'][_0x7bd31(0x1f4)][_0x7bd31(0x3c5)](this,_0x456aab,_0xd4e0e2,_0x573111);},Game_Party[_0x248c8e(0x33a)][_0x248c8e(0x1ec)]=function(_0x4f4c9f,_0x5a7451){const _0x5050d2=_0x248c8e,_0x21b9b2=DataManager[_0x5050d2(0x258)](_0x4f4c9f),_0x1b8526=[_0x5050d2(0x37b),_0x5050d2(0x362),_0x5050d2(0x32e)];for(const _0x4853c8 of _0x1b8526){const _0x55bd06=_0x21b9b2[_0x4853c8];for(const _0xe04507 in _0x55bd06){const _0x115c78=Number(_0xe04507),_0x1c77ed=(_0x55bd06[_0xe04507]||0x1)*_0x5a7451;let _0x2baf8e=null;if(_0x4853c8==='items')_0x2baf8e=$dataItems[_0x115c78];if(_0x4853c8===_0x5050d2(0x362))_0x2baf8e=$dataWeapons[_0x115c78];if(_0x4853c8===_0x5050d2(0x32e))_0x2baf8e=$dataArmors[_0x115c78];if(DataManager['isProxyItem'](_0x2baf8e))continue;_0x2baf8e&&(this[_0x5050d2(0x3ee)](_0x2baf8e,_0x1c77ed),![]&&console['log'](_0x2baf8e[_0x5050d2(0x247)]+'\x20x'+_0x1c77ed));}}},Game_Party['prototype'][_0x248c8e(0x364)]=function(_0x4987df){const _0x5e23aa=_0x248c8e,_0x53e75f=DataManager[_0x5e23aa(0x258)](_0x4987df),_0x5b7b7e=['items','weapons','armors'];for(const _0x477cef of _0x5b7b7e){const _0x29d8f4=_0x53e75f[_0x477cef];for(const _0x2702be in _0x29d8f4){const _0x146cf0=Number(_0x2702be);let _0x34e0cf=null;if(_0x477cef===_0x5e23aa(0x37b))_0x34e0cf=$dataItems[_0x146cf0];if(_0x477cef===_0x5e23aa(0x362))_0x34e0cf=$dataWeapons[_0x146cf0];if(_0x477cef==='armors')_0x34e0cf=$dataArmors[_0x146cf0];if(DataManager[_0x5e23aa(0x3ae)](_0x34e0cf))continue;if(_0x34e0cf&&!this[_0x5e23aa(0x338)](_0x34e0cf))return![];}}return!![];},Game_Party[_0x248c8e(0x33a)]['calcCraftBatchItemsMax']=function(_0x44081c){const _0x2bd7f2=_0x248c8e;let _0x57cdad=0x0;const _0xf3aaa1=DataManager[_0x2bd7f2(0x258)](_0x44081c),_0x4d9f35=[_0x2bd7f2(0x37b),'weapons',_0x2bd7f2(0x32e)];for(const _0x22af2e of _0x4d9f35){const _0x1418c5=_0xf3aaa1[_0x22af2e];for(const _0x315d06 in _0x1418c5){const _0x4e7243=Number(_0x315d06),_0x2279c7=_0x1418c5[_0x315d06]||0x1;let _0x2cbfd5=null;if(_0x22af2e===_0x2bd7f2(0x37b))_0x2cbfd5=$dataItems[_0x4e7243];if(_0x22af2e===_0x2bd7f2(0x362))_0x2cbfd5=$dataWeapons[_0x4e7243];if(_0x22af2e===_0x2bd7f2(0x32e))_0x2cbfd5=$dataArmors[_0x4e7243];if(DataManager[_0x2bd7f2(0x3ae)](_0x2cbfd5))continue;if(_0x2cbfd5){const _0x37ed93=this[_0x2bd7f2(0x303)](_0x2cbfd5),_0x1dfcba=this[_0x2bd7f2(0x37a)](_0x2cbfd5),_0x16cdb7=_0x37ed93-_0x1dfcba;if(_0x16cdb7>0x0){let _0x13322d=_0x16cdb7/_0x2279c7;_0x13322d=Math['ceil'](_0x13322d),_0x57cdad=Math[_0x2bd7f2(0x230)](_0x57cdad,_0x13322d);}}}}return _0x57cdad;},VisuMZ['ItemCraftingSys'][_0x248c8e(0x334)]=Scene_Menu[_0x248c8e(0x33a)][_0x248c8e(0x3c7)],Scene_Menu[_0x248c8e(0x33a)][_0x248c8e(0x3c7)]=function(){const _0x4326e9=_0x248c8e;VisuMZ[_0x4326e9(0x29c)][_0x4326e9(0x334)]['call'](this);const _0x26de36=this[_0x4326e9(0x38d)];_0x26de36[_0x4326e9(0x382)](_0x4326e9(0x377),this[_0x4326e9(0x210)][_0x4326e9(0x327)](this));},Scene_Menu[_0x248c8e(0x33a)][_0x248c8e(0x210)]=function(){SceneManager['push'](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x105026=_0x248c8e;this[_0x105026(0x345)](...arguments);}Scene_ItemCrafting[_0x248c8e(0x33a)]=Object[_0x248c8e(0x2d6)](Scene_Item[_0x248c8e(0x33a)]),Scene_ItemCrafting['prototype'][_0x248c8e(0x2fb)]=Scene_ItemCrafting,Scene_ItemCrafting['prototype'][_0x248c8e(0x345)]=function(){const _0x240f12=_0x248c8e;Scene_Item[_0x240f12(0x33a)]['initialize'][_0x240f12(0x3c5)](this),$gameSystem['_craftingCommonEventScene']=undefined;},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2bb)]=function(){const _0x2a5c0d=_0x248c8e;Scene_Item[_0x2a5c0d(0x33a)][_0x2a5c0d(0x2bb)][_0x2a5c0d(0x3c5)](this),this[_0x2a5c0d(0x37e)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2d6)]=function(){const _0x5eb26f=_0x248c8e;Scene_Item[_0x5eb26f(0x33a)][_0x5eb26f(0x2d6)]['call'](this),this[_0x5eb26f(0x272)](),this[_0x5eb26f(0x1fa)](),this[_0x5eb26f(0x30f)](),this[_0x5eb26f(0x271)](),this['isUseModernControls']()&&this[_0x5eb26f(0x307)](),this['setWindowBackgroundTypes'](),this[_0x5eb26f(0x224)]();},Scene_ItemCrafting[_0x248c8e(0x33a)]['setWindowBackgroundTypes']=function(){const _0x480740=_0x248c8e,_0x39ec4b=VisuMZ[_0x480740(0x29c)]['Settings'][_0x480740(0x23c)];this[_0x480740(0x36a)]&&this[_0x480740(0x36a)][_0x480740(0x3cf)](_0x39ec4b['HelpBgType']),this[_0x480740(0x2d2)]&&this[_0x480740(0x2d2)][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x1db)]),this['_goldWindow']&&this[_0x480740(0x3f9)][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x21e)]),this[_0x480740(0x20c)]&&this[_0x480740(0x20c)][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x3b7)]),this[_0x480740(0x31c)]&&this[_0x480740(0x31c)][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x3bc)]),this[_0x480740(0x419)]&&this[_0x480740(0x419)]['setBackgroundType'](_0x39ec4b[_0x480740(0x31e)]),this[_0x480740(0x220)]&&this['_ingredientSelectList'][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x3a9)]),this['_numberWindow']&&this['_numberWindow'][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x2d0)]),this[_0x480740(0x3de)]&&this['_buttonAssistWindow'][_0x480740(0x3cf)](_0x39ec4b[_0x480740(0x3b6)]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x21d)]=function(){const _0x588050=_0x248c8e;return Scene_Shop[_0x588050(0x33a)]['helpWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x272)]=function(){const _0x27d060=_0x248c8e,_0x47f4f6=this['goldWindowRect']();this[_0x27d060(0x3f9)]=new Window_Gold(_0x47f4f6),this['addWindow'](this['_goldWindow']);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x3aa)]=function(){const _0x3feacb=_0x248c8e;return Scene_Shop[_0x3feacb(0x33a)][_0x3feacb(0x22c)]['call'](this);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x21c)]=function(){const _0x130183=_0x248c8e;return Scene_Shop[_0x130183(0x33a)][_0x130183(0x287)][_0x130183(0x3c5)](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['createItemWindow']=function(){const _0x4500ff=_0x248c8e;this[_0x4500ff(0x3e9)](),this[_0x4500ff(0x2bd)]()&&this[_0x4500ff(0x353)](),this[_0x4500ff(0x252)]()&&(this[_0x4500ff(0x2c4)](),this['addWindow'](this[_0x4500ff(0x20c)]));},Scene_ItemCrafting[_0x248c8e(0x33a)]['createItemWindowBase']=function(){const _0x21f497=_0x248c8e,_0x446bad=this['itemWindowRect']();this[_0x21f497(0x20c)]=new Window_ItemCraftingList(_0x446bad),this[_0x21f497(0x20c)][_0x21f497(0x367)](this[_0x21f497(0x36a)]),this[_0x21f497(0x20c)][_0x21f497(0x382)]('ok',this['onItemOk'][_0x21f497(0x327)](this)),this['_itemWindow']['setHandler']('cancel',this[_0x21f497(0x316)][_0x21f497(0x327)](this)),this[_0x21f497(0x2ae)](this[_0x21f497(0x20c)]),this['_categoryWindow'][_0x21f497(0x30a)](this['_itemWindow']),!this['_categoryWindow'][_0x21f497(0x274)]()&&(this[_0x21f497(0x20c)]['y']-=this[_0x21f497(0x2d2)][_0x21f497(0x1dd)],this['_itemWindow'][_0x21f497(0x1dd)]+=this[_0x21f497(0x2d2)][_0x21f497(0x1dd)],this[_0x21f497(0x2d2)][_0x21f497(0x243)](),this[_0x21f497(0x2d2)][_0x21f497(0x321)](),this[_0x21f497(0x307)]());},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2fc)]=function(){const _0x5c004d=_0x248c8e;return this[_0x5c004d(0x38d)]=this['_categoryWindow'],Scene_Shop['prototype'][_0x5c004d(0x2ea)][_0x5c004d(0x3c5)](this);},Scene_ItemCrafting['prototype'][_0x248c8e(0x27e)]=function(){const _0x27c877=_0x248c8e;return Scene_Shop[_0x27c877(0x33a)][_0x27c877(0x225)][_0x27c877(0x3c5)](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['createNumberWindow']=function(){const _0x5121b3=_0x248c8e,_0x5650c1=this['itemWindowRect']();this[_0x5121b3(0x365)]=new Window_ItemCraftingNumber(_0x5650c1),this['_numberWindow'][_0x5121b3(0x243)](),this[_0x5121b3(0x365)][_0x5121b3(0x382)]('ok',this[_0x5121b3(0x3a7)][_0x5121b3(0x327)](this)),this['_numberWindow']['setHandler']('cancel',this['onNumberCancel'][_0x5121b3(0x327)](this)),this[_0x5121b3(0x2ae)](this['_numberWindow']);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x30f)]=function(){const _0xa2260a=_0x248c8e,_0x17e427=this[_0xa2260a(0x21c)]();this[_0xa2260a(0x419)]=new Window_Selectable(_0x17e427),this[_0xa2260a(0x419)][_0xa2260a(0x243)](),this['addWindow'](this[_0xa2260a(0x419)]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x271)]=function(){const _0x5d7a7b=_0x248c8e,_0x1a41ac=this['itemWindowRect'](),_0x5ca334=new Window_ItemCraftingIngredient(_0x1a41ac);_0x5ca334[_0x5d7a7b(0x243)](),_0x5ca334[_0x5d7a7b(0x367)](this[_0x5d7a7b(0x36a)]),_0x5ca334[_0x5d7a7b(0x3cd)](this[_0x5d7a7b(0x31c)]),_0x5ca334[_0x5d7a7b(0x382)]('ok',this[_0x5d7a7b(0x340)][_0x5d7a7b(0x327)](this)),_0x5ca334[_0x5d7a7b(0x382)]('cancel',this[_0x5d7a7b(0x3b1)]['bind'](this)),this['_ingredientSelectList']=_0x5ca334,this['addWindow'](this[_0x5d7a7b(0x220)]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2c5)]=function(){const _0x5d4fdd=_0x248c8e;return VisuMZ['ItemCraftingSys'][_0x5d4fdd(0x330)]['Window']['EnableCustomLayout'];},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x21d)]=function(){const _0x2d4d1d=_0x248c8e;return this[_0x2d4d1d(0x2c5)]()?this[_0x2d4d1d(0x416)]():Scene_Shop[_0x2d4d1d(0x33a)]['helpWindowRectItemsEquipsCore'][_0x2d4d1d(0x3c5)](this);},Scene_ItemCrafting['prototype']['helpWindowRectJS']=function(){const _0x142e64=_0x248c8e;if(VisuMZ[_0x142e64(0x29c)][_0x142e64(0x330)][_0x142e64(0x23c)][_0x142e64(0x3e8)])return VisuMZ[_0x142e64(0x29c)][_0x142e64(0x330)]['Window'][_0x142e64(0x3e8)]['call'](this);const _0x4c45e5=0x0,_0x14f3af=this['helpAreaTop'](),_0x2e5c0b=Graphics['boxWidth'],_0x49e005=this['helpAreaHeight']();return new Rectangle(_0x4c45e5,_0x14f3af,_0x2e5c0b,_0x49e005);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x21c)]=function(){const _0x1dcf0e=_0x248c8e;return this['isCustomLayout']()?this[_0x1dcf0e(0x23b)]():Scene_Shop[_0x1dcf0e(0x33a)][_0x1dcf0e(0x287)][_0x1dcf0e(0x3c5)](this);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x23b)]=function(){const _0x5bd2a5=_0x248c8e;if(VisuMZ['ItemCraftingSys']['Settings'][_0x5bd2a5(0x23c)]['CategoryWindow_RectJS'])return VisuMZ[_0x5bd2a5(0x29c)][_0x5bd2a5(0x330)][_0x5bd2a5(0x23c)][_0x5bd2a5(0x30c)][_0x5bd2a5(0x3c5)](this);const _0x206732=this[_0x5bd2a5(0x3eb)]()?this[_0x5bd2a5(0x211)]():0x0,_0x2c1d31=this[_0x5bd2a5(0x1e3)](),_0x4001af=Graphics[_0x5bd2a5(0x21b)]-this['mainCommandWidth'](),_0x4d0dec=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x206732,_0x2c1d31,_0x4001af,_0x4d0dec);},Scene_ItemCrafting['prototype'][_0x248c8e(0x3aa)]=function(){const _0x5c09df=_0x248c8e;return this[_0x5c09df(0x2c5)]()?this[_0x5c09df(0x1ee)]():Scene_Shop['prototype'][_0x5c09df(0x22c)]['call'](this);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x1ee)]=function(){const _0x4214a9=_0x248c8e;if(VisuMZ[_0x4214a9(0x29c)][_0x4214a9(0x330)][_0x4214a9(0x23c)]['GoldWindow_RectJS'])return VisuMZ['ItemCraftingSys'][_0x4214a9(0x330)]['Window'][_0x4214a9(0x257)][_0x4214a9(0x3c5)](this);const _0x15cca6=this[_0x4214a9(0x211)](),_0x35446=this[_0x4214a9(0x2c2)](0x1,!![]),_0x4fd355=this[_0x4214a9(0x3eb)]()?0x0:Graphics[_0x4214a9(0x21b)]-_0x15cca6,_0x430c84=this[_0x4214a9(0x1e3)]();return new Rectangle(_0x4fd355,_0x430c84,_0x15cca6,_0x35446);},Scene_ItemCrafting[_0x248c8e(0x33a)]['itemWindowRect']=function(){const _0x38b607=_0x248c8e;return this['_commandWindow']=this[_0x38b607(0x2d2)],this['isCustomLayout']()?this[_0x38b607(0x27b)]():Scene_Shop[_0x38b607(0x33a)][_0x38b607(0x2ea)]['call'](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['itemWindowRectJS']=function(){const _0x1a97a8=_0x248c8e;if(VisuMZ['ItemCraftingSys']['Settings']['Window'][_0x1a97a8(0x295)])return VisuMZ[_0x1a97a8(0x29c)][_0x1a97a8(0x330)][_0x1a97a8(0x23c)][_0x1a97a8(0x295)]['call'](this);const _0x35743a=this['_commandWindow']['y']+this[_0x1a97a8(0x38d)][_0x1a97a8(0x1dd)],_0x255d1a=Graphics['boxWidth']-this[_0x1a97a8(0x311)](),_0x364b62=this['mainAreaHeight']()-this[_0x1a97a8(0x38d)][_0x1a97a8(0x1dd)],_0xa9c376=this['isRightInputMode']()?Graphics[_0x1a97a8(0x21b)]-_0x255d1a:0x0;return new Rectangle(_0xa9c376,_0x35743a,_0x255d1a,_0x364b62);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x252)]=function(){const _0x11770f=_0x248c8e;if(this[_0x11770f(0x2c5)]())return!![];return Scene_Item[_0x11770f(0x33a)][_0x11770f(0x252)][_0x11770f(0x3c5)](this);},Scene_ItemCrafting['prototype']['statusWindowRect']=function(){const _0x3c8ecd=_0x248c8e;return this[_0x3c8ecd(0x2c5)]()?this['statusWindowRectJS']():Scene_Shop[_0x3c8ecd(0x33a)]['statusWindowRectItemsEquipsCore'][_0x3c8ecd(0x3c5)](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['statusWindowRectJS']=function(){const _0x13f45e=_0x248c8e;if(VisuMZ[_0x13f45e(0x29c)][_0x13f45e(0x330)][_0x13f45e(0x23c)][_0x13f45e(0x24f)])return VisuMZ['ItemCraftingSys'][_0x13f45e(0x330)][_0x13f45e(0x23c)][_0x13f45e(0x24f)][_0x13f45e(0x3c5)](this);const _0x419952=this[_0x13f45e(0x311)](),_0x34badf=this[_0x13f45e(0x349)]()-this[_0x13f45e(0x38d)]['height'],_0x4452c4=this['isRightInputMode']()?0x0:Graphics[_0x13f45e(0x21b)]-_0x419952,_0x3e1d2c=this[_0x13f45e(0x38d)]['y']+this[_0x13f45e(0x38d)][_0x13f45e(0x1dd)];return new Rectangle(_0x4452c4,_0x3e1d2c,_0x419952,_0x34badf);},Scene_ItemCrafting['prototype']['onCategoryOk']=function(){const _0x55da5f=_0x248c8e;this['_itemWindow'][_0x55da5f(0x341)](),this[_0x55da5f(0x20c)][_0x55da5f(0x2a2)](0x0);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2c6)]=function(){const _0x59e921=_0x248c8e;$gameTemp[_0x59e921(0x366)]=!![],this['_item']=this[_0x59e921(0x20c)][_0x59e921(0x33c)](),this[_0x59e921(0x20c)][_0x59e921(0x243)](),this[_0x59e921(0x33e)](),this[_0x59e921(0x1f6)]()?this[_0x59e921(0x404)]():this[_0x59e921(0x208)](),$gameTemp['_bypassProxy']=![],this[_0x59e921(0x297)]=this['_itemWindow'][_0x59e921(0x33c)]();},Scene_ItemCrafting['prototype'][_0x248c8e(0x208)]=function(){const _0x25c835=_0x248c8e;this[_0x25c835(0x419)][_0x25c835(0x243)](),this[_0x25c835(0x220)][_0x25c835(0x243)](),this[_0x25c835(0x2d2)][_0x25c835(0x3df)](),$gameTemp[_0x25c835(0x366)]=!![],this['_numberWindow']['setup'](this[_0x25c835(0x20c)][_0x25c835(0x33c)]()),$gameTemp[_0x25c835(0x366)]=![],this[_0x25c835(0x365)][_0x25c835(0x3df)](),this[_0x25c835(0x365)]['activate']();},Scene_ItemCrafting['prototype']['activateItemWindow']=function(){const _0x4a76fc=_0x248c8e;this[_0x4a76fc(0x365)][_0x4a76fc(0x243)](),this[_0x4a76fc(0x419)][_0x4a76fc(0x243)](),this[_0x4a76fc(0x220)][_0x4a76fc(0x243)](),this['_categoryWindow'][_0x4a76fc(0x3df)](),this[_0x4a76fc(0x20c)]['show'](),this[_0x4a76fc(0x20c)][_0x4a76fc(0x341)](),this[_0x4a76fc(0x20c)]['updateHelp']();},Scene_ItemCrafting['prototype'][_0x248c8e(0x3a7)]=function(){const _0x2a8b70=_0x248c8e;VisuMZ[_0x2a8b70(0x29c)][_0x2a8b70(0x330)]['Animation'][_0x2a8b70(0x314)]?this['startAnimation']():this[_0x2a8b70(0x3b0)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x3b0)]=function(){const _0x15a9c1=_0x248c8e;this['_windowLayer'][_0x15a9c1(0x2e9)]=!![],this[_0x15a9c1(0x2f7)]=![],this[_0x15a9c1(0x411)](),this['onItemCrafted'](),this[_0x15a9c1(0x368)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x368)]=function(){const _0xada54=_0x248c8e;this[_0xada54(0x358)]()?this[_0xada54(0x352)]():this[_0xada54(0x2ef)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2ef)]=function(){const _0x3a1487=_0x248c8e;this['activateItemWindow'](),this[_0x3a1487(0x20c)][_0x3a1487(0x1ef)](),this[_0x3a1487(0x2d2)]['refresh'](),this[_0x3a1487(0x2d2)]['refreshCursor'](),this[_0x3a1487(0x2d2)]['callUpdateHelp'](),this[_0x3a1487(0x3f9)][_0x3a1487(0x1ef)](),this['_itemWindow'][_0x3a1487(0x342)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x411)]=function(){const _0xb2097f=_0x248c8e;$gameTemp['_bypassProxy']=!![];let _0x4a8a24=this[_0xb2097f(0x20c)][_0xb2097f(0x33c)]();$gameTemp[_0xb2097f(0x366)]=![];const _0x13ac42=this['_numberWindow']['number'](),_0x25b6f7=DataManager['getCraftingIngredients'](_0x4a8a24);let _0xa2278a=0x0;for(const _0x5319b2 of _0x25b6f7){if(!_0x5319b2)continue;let _0x3e830d=_0x5319b2[0x0];const _0x245516=_0x5319b2[0x1]*_0x13ac42;_0x3e830d==='gold'?$gameParty[_0xb2097f(0x228)](_0x245516):(typeof _0x3e830d===_0xb2097f(0x29e)&&_0x3e830d[_0xb2097f(0x1ed)](/CATEGORY/i)&&(_0x3e830d=this[_0xb2097f(0x25e)][_0xa2278a],_0xa2278a+=0x1),$gameParty[_0xb2097f(0x3f2)](_0x3e830d,_0x245516,![]));}_0x4a8a24=this[_0xb2097f(0x20c)][_0xb2097f(0x33c)](),$gameParty[_0xb2097f(0x3ee)](_0x4a8a24,_0x13ac42),this[_0xb2097f(0x365)][_0xb2097f(0x200)]()>0x0?SoundManager['playItemCrafting']():SoundManager[_0xb2097f(0x1fe)](),$gameSystem[_0xb2097f(0x232)](_0x4a8a24,_0x13ac42);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x1e1)]=function(){const _0x43a1c5=_0x248c8e,_0x482fa3=this[_0x43a1c5(0x297)],_0x4c6694=this[_0x43a1c5(0x365)]['number']();VisuMZ['ItemCraftingSys'][_0x43a1c5(0x312)](_0x482fa3,!![]),VisuMZ['ItemCraftingSys'][_0x43a1c5(0x312)](_0x482fa3,![]),this[_0x43a1c5(0x3a3)]();const _0x5457e9=DataManager[_0x43a1c5(0x263)](_0x482fa3);VisuMZ[_0x43a1c5(0x29c)]['JS'][_0x5457e9]&&VisuMZ['ItemCraftingSys']['JS'][_0x5457e9]['call'](this,_0x482fa3,_0x4c6694),VisuMZ[_0x43a1c5(0x29c)]['Settings'][_0x43a1c5(0x3a2)][_0x43a1c5(0x2ff)][_0x43a1c5(0x3c5)](this,_0x482fa3,_0x4c6694);},VisuMZ[_0x248c8e(0x29c)]['TurnSwitches']=function(_0x3bda42,_0x732fd5){const _0x2fd8bd=_0x248c8e,_0x529663=_0x732fd5?VisuMZ[_0x2fd8bd(0x29c)][_0x2fd8bd(0x3be)][_0x2fd8bd(0x3c8)]:VisuMZ[_0x2fd8bd(0x29c)]['RegExp'][_0x2fd8bd(0x3e4)],_0x3ef43b=_0x3bda42[_0x2fd8bd(0x2d9)]['match'](_0x529663);if(_0x3ef43b)for(const _0x49ad98 of _0x3ef43b){if(!_0x49ad98)continue;_0x49ad98[_0x2fd8bd(0x1ed)](_0x529663);const _0x4639dd=JSON[_0x2fd8bd(0x351)]('['+RegExp['$1'][_0x2fd8bd(0x1ed)](/\d+/g)+']');for(const _0x2cd455 of _0x4639dd){$gameSwitches['setValue'](_0x2cd455,_0x732fd5);}}},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x398)]=function(){const _0x4e268c=_0x248c8e;SoundManager['playCancel'](),this[_0x4e268c(0x3b1)]();},Scene_ItemCrafting[_0x248c8e(0x33a)]['onIngredientListOk']=function(){const _0x14ad61=_0x248c8e,_0x1b5a8f=this['_ingredientSelectList']['item']();this[_0x14ad61(0x25e)][this['_ingredientIndex']]=_0x1b5a8f,this['_ingredientIndex']++,this[_0x14ad61(0x404)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x3b1)]=function(){const _0x47e37c=_0x248c8e;this[_0x47e37c(0x25e)]['pop'](),this[_0x47e37c(0x2fe)]--,this['_ingredientIndex']<0x0?this[_0x47e37c(0x277)]():this[_0x47e37c(0x404)]();},Scene_ItemCrafting['prototype'][_0x248c8e(0x33e)]=function(){const _0x72bca8=_0x248c8e;this[_0x72bca8(0x255)]=[],this['_ingredientAmounts']=[],this[_0x72bca8(0x25e)]=[],this[_0x72bca8(0x2fe)]=0x0;},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x1f6)]=function(){const _0x346dde=_0x248c8e;if(!this[_0x346dde(0x297)])return![];const _0x12b03e=DataManager[_0x346dde(0x3ab)](this[_0x346dde(0x297)]);for(const _0xac7e8e of _0x12b03e){if(!_0xac7e8e)continue;const _0x1a20cc=_0xac7e8e[0x0];if(!_0x1a20cc)continue;if(typeof _0x1a20cc===_0x346dde(0x29e)&&_0x1a20cc[_0x346dde(0x1ed)](/CATEGORY/i)){_0x1a20cc[_0x346dde(0x1ed)](/CATEGORY: (.*)/i);const _0x175b6a=String(RegExp['$1'])[_0x346dde(0x298)]();this['_ingredientCategories']['push'](_0x175b6a),this[_0x346dde(0x2ca)]['push'](_0xac7e8e[0x1]||0x1);}}return this[_0x346dde(0x255)][_0x346dde(0x40c)]>0x0;},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x404)]=function(){const _0x357d10=_0x248c8e;if(this[_0x357d10(0x2fe)]>=this['_ingredientCategories'][_0x357d10(0x40c)])return this[_0x357d10(0x208)]();this['_categoryWindow']['hide'](),this[_0x357d10(0x365)][_0x357d10(0x243)]();const _0xca9413=this[_0x357d10(0x255)][this[_0x357d10(0x2fe)]],_0x4bc729=this['_ingredientAmounts'][this['_ingredientIndex']];this['_ingredientSelectTitle'][_0x357d10(0x3df)](),this[_0x357d10(0x220)][_0x357d10(0x3df)](),this[_0x357d10(0x419)][_0x357d10(0x31a)]['clear']();const _0x58323b=VisuMZ[_0x357d10(0x29c)]['Settings']['General'][_0x357d10(0x3ac)],_0x796158=VisuMZ[_0x357d10(0x2cc)][_0x357d10(0x330)][_0x357d10(0x24e)][_0x357d10(0x22f)],_0x39aae8=_0x58323b[_0x357d10(0x39a)](_0xca9413,_0x796158[_0x357d10(0x39a)](_0x4bc729)),_0x221445=this['_ingredientSelectTitle'][_0x357d10(0x3ed)](0x0);this[_0x357d10(0x419)][_0x357d10(0x24d)](_0x39aae8,_0x221445['x'],_0x221445['y']),this[_0x357d10(0x220)][_0x357d10(0x300)](_0xca9413,_0x4bc729);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2b2)]=function(){const _0x5e5d73=_0x248c8e;if(this[_0x5e5d73(0x365)]&&this['_numberWindow']['active'])return TextManager['getInputMultiButtonStrings']('left',_0x5e5d73(0x390));return Scene_Item[_0x5e5d73(0x33a)][_0x5e5d73(0x2b2)][_0x5e5d73(0x3c5)](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['buttonAssistKey2']=function(){const _0x22bd3f=_0x248c8e;if(this['_numberWindow']&&this[_0x22bd3f(0x365)]['active'])return TextManager['getInputMultiButtonStrings']('up','down');return Scene_Item[_0x22bd3f(0x33a)][_0x22bd3f(0x204)][_0x22bd3f(0x3c5)](this);},Scene_ItemCrafting['prototype']['buttonAssistText1']=function(){const _0xfb8d01=_0x248c8e;if(this[_0xfb8d01(0x332)]())return VisuMZ['ItemsEquipsCore'][_0xfb8d01(0x330)]['ItemScene']['buttonAssistCategory'];else{if(this['_numberWindow']&&this['_numberWindow']['active'])return VisuMZ['ItemsEquipsCore'][_0xfb8d01(0x330)]['ShopScene']['buttonAssistSmallIncrement'];}return Scene_Item[_0xfb8d01(0x33a)][_0xfb8d01(0x2a9)][_0xfb8d01(0x3c5)](this);},Scene_ItemCrafting['prototype']['buttonAssistText2']=function(){const _0x2ed977=_0x248c8e;if(this[_0x2ed977(0x365)]&&this[_0x2ed977(0x365)][_0x2ed977(0x27c)])return VisuMZ[_0x2ed977(0x2cc)]['Settings']['ShopScene'][_0x2ed977(0x388)];return Scene_Item[_0x2ed977(0x33a)][_0x2ed977(0x1e4)][_0x2ed977(0x3c5)](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['buttonAssistText4']=function(){const _0x394b29=_0x248c8e;return this[_0x394b29(0x365)]&&this[_0x394b29(0x365)][_0x394b29(0x27c)]?TextManager[_0x394b29(0x387)]:Scene_Item['prototype'][_0x394b29(0x328)]['call'](this);},Scene_ItemCrafting[_0x248c8e(0x33a)]['createBackground']=function(){const _0x84b2c4=_0x248c8e;Scene_MenuBase[_0x84b2c4(0x33a)][_0x84b2c4(0x323)][_0x84b2c4(0x3c5)](this),this[_0x84b2c4(0x38c)](this[_0x84b2c4(0x2e1)]()),this[_0x84b2c4(0x391)]();},Scene_ItemCrafting[_0x248c8e(0x33a)]['getBackgroundOpacity']=function(){const _0x281874=_0x248c8e;return VisuMZ['ItemCraftingSys'][_0x281874(0x330)]['BgSettings'][_0x281874(0x229)];},Scene_ItemCrafting[_0x248c8e(0x33a)]['createCustomBackgroundImages']=function(){const _0x447696=_0x248c8e,_0x1efddf={'BgFilename1':VisuMZ[_0x447696(0x29c)][_0x447696(0x330)][_0x447696(0x3d5)][_0x447696(0x23f)],'BgFilename2':VisuMZ['ItemCraftingSys'][_0x447696(0x330)][_0x447696(0x3d5)][_0x447696(0x38a)]};_0x1efddf&&(_0x1efddf['BgFilename1']!==''||_0x1efddf[_0x447696(0x38a)]!=='')&&(this[_0x447696(0x2ee)]=new Sprite(ImageManager[_0x447696(0x380)](_0x1efddf[_0x447696(0x23f)])),this[_0x447696(0x239)]=new Sprite(ImageManager[_0x447696(0x2de)](_0x1efddf[_0x447696(0x38a)])),this[_0x447696(0x1ff)](this[_0x447696(0x2ee)]),this[_0x447696(0x1ff)](this[_0x447696(0x239)]),this[_0x447696(0x2ee)][_0x447696(0x319)][_0x447696(0x20a)](this[_0x447696(0x237)][_0x447696(0x327)](this,this['_backSprite1'])),this['_backSprite2'][_0x447696(0x319)][_0x447696(0x20a)](this[_0x447696(0x237)][_0x447696(0x327)](this,this[_0x447696(0x239)])));},Scene_ItemCrafting['prototype'][_0x248c8e(0x237)]=function(_0x347c56){this['scaleSprite'](_0x347c56),this['centerSprite'](_0x347c56);},Scene_ItemCrafting['prototype'][_0x248c8e(0x249)]=function(){const _0x445672=_0x248c8e;this[_0x445672(0x2f7)]=!![],this[_0x445672(0x383)]=0x14,this[_0x445672(0x26b)][_0x445672(0x2e9)]=VisuMZ[_0x445672(0x29c)][_0x445672(0x330)]['Animation']['ShowWindows']||![],this[_0x445672(0x322)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x322)]=function(){const _0x5dae1f=_0x248c8e;this['_itemSprite']=new Sprite(),this[_0x5dae1f(0x1ff)](this[_0x5dae1f(0x308)]),this[_0x5dae1f(0x2b3)](),this[_0x5dae1f(0x241)](),this[_0x5dae1f(0x413)](),this[_0x5dae1f(0x2aa)](),this['createAnimationIDs'](),this[_0x5dae1f(0x245)](this[_0x5dae1f(0x267)][_0x5dae1f(0x339)]());},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2b3)]=function(){const _0x39ef1a=_0x248c8e,_0x4d7d4b=VisuMZ[_0x39ef1a(0x29c)][_0x39ef1a(0x3be)],_0x586266=this['_item']['note'];this[_0x39ef1a(0x281)]='';if(_0x586266[_0x39ef1a(0x1ed)](_0x4d7d4b[_0x39ef1a(0x2ce)]))this[_0x39ef1a(0x281)]=String(RegExp['$1']);else _0x586266[_0x39ef1a(0x1ed)](_0x4d7d4b[_0x39ef1a(0x26a)])&&(this['_craftPicture']=String(RegExp['$1']));this[_0x39ef1a(0x2f6)]=new Sprite();this[_0x39ef1a(0x281)]?this[_0x39ef1a(0x2f6)][_0x39ef1a(0x319)]=ImageManager[_0x39ef1a(0x2e7)](this[_0x39ef1a(0x281)]):(this['_iconSprite']['bitmap']=ImageManager[_0x39ef1a(0x1e2)](_0x39ef1a(0x286)),this[_0x39ef1a(0x2f6)][_0x39ef1a(0x319)][_0x39ef1a(0x302)]=![]);this['_iconSprite'][_0x39ef1a(0x2d8)]['x']=0.5,this[_0x39ef1a(0x2f6)][_0x39ef1a(0x2d8)]['y']=0.5;if(!this[_0x39ef1a(0x281)]){const _0x14d015=VisuMZ[_0x39ef1a(0x29c)][_0x39ef1a(0x330)][_0x39ef1a(0x3f5)][_0x39ef1a(0x39f)]||0x8;this[_0x39ef1a(0x2f6)][_0x39ef1a(0x361)]['x']=_0x14d015,this['_iconSprite'][_0x39ef1a(0x361)]['y']=_0x14d015;}this[_0x39ef1a(0x308)][_0x39ef1a(0x1ff)](this[_0x39ef1a(0x2f6)]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x241)]=function(){const _0x124583=_0x248c8e;if(this['_craftPicture'])return;const _0x45f134=this[_0x124583(0x297)],_0x43b05b=_0x45f134[_0x124583(0x2a7)],_0x7651a9=ImageManager[_0x124583(0x2be)],_0x2fc7af=ImageManager['iconHeight'],_0x57509d=_0x43b05b%0x10*_0x7651a9,_0x3fbd1c=Math[_0x124583(0x3ff)](_0x43b05b/0x10)*_0x2fc7af;this[_0x124583(0x2f6)][_0x124583(0x30d)](_0x57509d,_0x3fbd1c,_0x7651a9,_0x2fc7af);},Scene_ItemCrafting[_0x248c8e(0x33a)]['setItemSpritePosition']=function(){const _0xba8583=_0x248c8e;this[_0xba8583(0x308)]['x']=Math[_0xba8583(0x30e)](Graphics[_0xba8583(0x3fa)]/0x2);const _0x5706ef=Math[_0xba8583(0x30e)](ImageManager[_0xba8583(0x223)]*this[_0xba8583(0x308)][_0xba8583(0x361)]['y']);this[_0xba8583(0x308)]['y']=Math[_0xba8583(0x30e)]((Graphics['height']+_0x5706ef)/0x2);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2aa)]=function(){const _0x302066=_0x248c8e;this['_itemSpriteOpacitySpeed']=VisuMZ['ItemCraftingSys'][_0x302066(0x330)][_0x302066(0x3f5)][_0x302066(0x315)]||0x1,this[_0x302066(0x297)][_0x302066(0x2d9)][_0x302066(0x1ed)](VisuMZ['ItemCraftingSys']['RegExp']['opacitySpeed'])&&(this['_itemSpriteOpacitySpeed']=Math[_0x302066(0x230)](Number(RegExp['$1']),0x1)),this[_0x302066(0x308)][_0x302066(0x3dd)]=0x0;},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x264)]=function(){const _0x102574=_0x248c8e;this[_0x102574(0x267)]=[],this[_0x102574(0x297)][_0x102574(0x2d9)][_0x102574(0x1ed)](VisuMZ[_0x102574(0x29c)][_0x102574(0x3be)][_0x102574(0x3d7)])?this[_0x102574(0x267)]=RegExp['$1'][_0x102574(0x375)](',')['map'](_0xde7c56=>Number(_0xde7c56)):this[_0x102574(0x267)]=this['_animationIDs']['concat'](VisuMZ[_0x102574(0x29c)][_0x102574(0x330)][_0x102574(0x3f5)][_0x102574(0x3d1)]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x245)]=function(_0x2a0fcd){const _0x57e72a=_0x248c8e,_0x219e61=$dataAnimations[_0x2a0fcd];if(!_0x219e61)return;const _0x130d6d=this[_0x57e72a(0x26f)](_0x219e61);this[_0x57e72a(0x2fa)]=new(_0x130d6d?Sprite_AnimationMV:Sprite_Animation)();const _0x5dc5f1=[this[_0x57e72a(0x308)]],_0x2d578e=0x0;this[_0x57e72a(0x2fa)][_0x57e72a(0x300)](_0x5dc5f1,_0x219e61,![],_0x2d578e,null),this['addChild'](this[_0x57e72a(0x2fa)]);},Scene_ItemCrafting['prototype']['isMVAnimation']=function(_0x26bd34){const _0x334c48=_0x248c8e;return!!_0x26bd34[_0x334c48(0x3e7)];},Scene_ItemCrafting['prototype'][_0x248c8e(0x37e)]=function(){const _0x3ffad9=_0x248c8e;if(!this['_animationPlaying'])return;this[_0x3ffad9(0x38b)](),this['updateAnimationSprite'](),this[_0x3ffad9(0x392)]()&&this['processFinishAnimation']();},Scene_ItemCrafting['prototype'][_0x248c8e(0x38b)]=function(){const _0x352f6b=_0x248c8e;this[_0x352f6b(0x308)][_0x352f6b(0x3dd)]+=this[_0x352f6b(0x336)];},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x410)]=function(){const _0x102ddb=_0x248c8e;if(!this[_0x102ddb(0x2fa)])return;if(this[_0x102ddb(0x2fa)]['isPlaying']())return;this[_0x102ddb(0x3f3)](),this[_0x102ddb(0x245)](this[_0x102ddb(0x267)]['shift']());},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x3f3)]=function(){const _0x54c08b=_0x248c8e;if(!this[_0x54c08b(0x2fa)])return;this['removeChild'](this[_0x54c08b(0x2fa)]),this[_0x54c08b(0x2fa)]['destroy'](),this['_animationSprite']=undefined;},Scene_ItemCrafting['prototype'][_0x248c8e(0x1f5)]=function(){const _0x5579f6=_0x248c8e;if(!this['_itemSprite'])return;this[_0x5579f6(0x1e8)](this[_0x5579f6(0x308)]),this[_0x5579f6(0x308)][_0x5579f6(0x3bd)](),this[_0x5579f6(0x308)]=undefined;},Scene_ItemCrafting[_0x248c8e(0x33a)]['isFinishedAnimating']=function(){const _0x400bfd=_0x248c8e;if(TouchInput[_0x400bfd(0x2ba)]())return!![];if(Input[_0x400bfd(0x291)]('ok'))return!![];if(Input[_0x400bfd(0x291)](_0x400bfd(0x2cf)))return!![];if(this[_0x400bfd(0x308)][_0x400bfd(0x3dd)]<0xff)return![];if(this[_0x400bfd(0x2fa)])return![];return this[_0x400bfd(0x383)]--<=0x0;},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x2d7)]=function(){const _0x2bc47a=_0x248c8e;this[_0x2bc47a(0x3f3)](),this[_0x2bc47a(0x1f5)](),this[_0x2bc47a(0x3b0)](),TouchInput[_0x2bc47a(0x284)](),Input[_0x2bc47a(0x284)]();},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x371)]=function(){const _0x29f05b=_0x248c8e;Scene_Item[_0x29f05b(0x33a)][_0x29f05b(0x371)][_0x29f05b(0x3c5)](this);if($gameSystem[_0x29f05b(0x2f3)])return;$gameTemp[_0x29f05b(0x3b5)]();},Scene_ItemCrafting['prototype'][_0x248c8e(0x224)]=function(){const _0x34b3fe=_0x248c8e;if(!SceneManager[_0x34b3fe(0x379)]())return;const _0x168dfb=VisuMZ['ItemCraftingSys'][_0x34b3fe(0x330)][_0x34b3fe(0x3a2)];_0x168dfb[_0x34b3fe(0x34e)]&&$gameSwitches[_0x34b3fe(0x279)](_0x168dfb[_0x34b3fe(0x34e)],![]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x3a3)]=function(){const _0x294fa1=_0x248c8e;if(!SceneManager[_0x294fa1(0x379)]())return;const _0x5d0c7c=VisuMZ[_0x294fa1(0x29c)][_0x294fa1(0x330)][_0x294fa1(0x3a2)];_0x5d0c7c[_0x294fa1(0x34e)]&&$gameSwitches[_0x294fa1(0x279)](_0x5d0c7c[_0x294fa1(0x34e)],!![]);},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x358)]=function(){const _0x1dd532=_0x248c8e;if(!Imported[_0x1dd532(0x3ce)])return![];const _0x17117d=this[_0x1dd532(0x297)]?this[_0x1dd532(0x297)][_0x1dd532(0x2d9)]||'':'',_0x471db4=VisuMZ['ItemCraftingSys'][_0x1dd532(0x3be)];if(_0x17117d['match'](_0x471db4[_0x1dd532(0x415)])&&!$gameSystem[_0x1dd532(0x3d3)](this['_item'])&&this[_0x1dd532(0x399)](!![]))return!![];else{if(_0x17117d[_0x1dd532(0x1ed)](_0x471db4[_0x1dd532(0x2e3)])&&this[_0x1dd532(0x399)](![]))return!![];}return![];},Scene_ItemCrafting[_0x248c8e(0x33a)][_0x248c8e(0x399)]=function(_0x351a96){const _0x2cc755=_0x248c8e,_0x1c681f=this[_0x2cc755(0x297)]?this[_0x2cc755(0x297)]['note']:'',_0x2b3937=VisuMZ['ItemCraftingSys'][_0x2cc755(0x3be)],_0x2f4078=_0x351a96?'CraftOnce':_0x2cc755(0x3fe);if(_0x1c681f[_0x2cc755(0x1ed)](_0x2b3937[_0x2f4078+'AllSw'])){const _0x5315db=RegExp['$1']['split'](',')[_0x2cc755(0x2cb)](_0x4f3659=>Number(_0x4f3659));for(const _0xe98e9 of _0x5315db){if($gameSwitches['value'](_0xe98e9)===![])return![];}}if(_0x1c681f[_0x2cc755(0x1ed)](_0x2b3937[_0x2f4078+_0x2cc755(0x3ba)])){const _0xf2a9f3=RegExp['$1']['split'](',')[_0x2cc755(0x2cb)](_0x384d09=>Number(_0x384d09));for(const _0x1353ff of _0xf2a9f3){if($gameSwitches[_0x2cc755(0x329)](_0x1353ff)===!![])return!![];}return![];}return!![];},Scene_ItemCrafting[_0x248c8e(0x33a)]['processCraftCommonEvent']=function(){const _0x42b580=_0x248c8e,_0xe1e9c=this[_0x42b580(0x297)]?this[_0x42b580(0x297)]['note']:'',_0x538cf6=VisuMZ[_0x42b580(0x29c)][_0x42b580(0x3be)];let _0x548bc6=0x0;if(this[_0x42b580(0x399)](!![])&&_0xe1e9c[_0x42b580(0x1ed)](_0x538cf6[_0x42b580(0x415)])&&!$gameSystem['hasCraftingEventOccurred'](this[_0x42b580(0x297)]))_0x548bc6=Number(RegExp['$1'])||0x1,$gameSystem['registerCraftingEvent'](this[_0x42b580(0x297)]);else this[_0x42b580(0x399)](![])&&_0xe1e9c[_0x42b580(0x1ed)](_0x538cf6[_0x42b580(0x2e3)])&&(_0x548bc6=Number(RegExp['$1'])||0x1);if(_0x548bc6<=0x0){this[_0x42b580(0x2ef)]();return;}$gameSystem[_0x42b580(0x2f3)]=!![],$gameTemp[_0x42b580(0x242)](_0x548bc6),SceneManager[_0x42b580(0x3a8)](Scene_Map);},VisuMZ[_0x248c8e(0x29c)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x248c8e(0x33a)][_0x248c8e(0x3b4)],Window_MenuCommand['prototype'][_0x248c8e(0x3b4)]=function(){const _0x104014=_0x248c8e;VisuMZ[_0x104014(0x29c)][_0x104014(0x2e4)]['call'](this),this[_0x104014(0x2ab)]();},Window_MenuCommand[_0x248c8e(0x33a)]['addItemCraftingCommand']=function(){const _0x426fa6=_0x248c8e;if(!this[_0x426fa6(0x373)]())return;if(!this[_0x426fa6(0x335)]())return;const _0x9c6b8d=TextManager[_0x426fa6(0x318)],_0x714b59=this[_0x426fa6(0x26c)]();this[_0x426fa6(0x310)](_0x9c6b8d,_0x426fa6(0x377),_0x714b59);},Window_MenuCommand['prototype'][_0x248c8e(0x373)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x248c8e(0x33a)][_0x248c8e(0x335)]=function(){const _0x49f3b8=_0x248c8e;return $gameSystem[_0x49f3b8(0x36e)]();},Window_MenuCommand[_0x248c8e(0x33a)][_0x248c8e(0x26c)]=function(){const _0x546f44=_0x248c8e;if(DataManager['currentCraftableItems']()[_0x546f44(0x40c)]<=0x0)return![];return $gameSystem['isMainMenuItemCraftingEnabled']();},VisuMZ['ItemCraftingSys'][_0x248c8e(0x1de)]=Window_ItemCategory[_0x248c8e(0x33a)]['makeCommandList'],Window_ItemCategory[_0x248c8e(0x33a)][_0x248c8e(0x35e)]=function(){const _0x2605e1=_0x248c8e;if(SceneManager[_0x2605e1(0x379)]()){this['addItemCategories']();if(this[_0x2605e1(0x27f)][_0x2605e1(0x40c)]<=0x0){this[_0x2605e1(0x27d)](),SceneManager['_scene'][_0x2605e1(0x278)]();return;}this[_0x2605e1(0x384)]();let _0x555681=this[_0x2605e1(0x222)]();if(this[_0x2605e1(0x31d)]){const _0x39561f=this[_0x2605e1(0x2bc)](this[_0x2605e1(0x31d)]);if(_0x39561f>=0x0)_0x555681=_0x39561f;}_0x555681=_0x555681>=this['_list']['length']?0x0:_0x555681,this['select'](_0x555681);}else VisuMZ[_0x2605e1(0x29c)][_0x2605e1(0x1de)][_0x2605e1(0x3c5)](this);},Window_ItemCategory[_0x248c8e(0x33a)][_0x248c8e(0x384)]=function(){const _0x2ab675=_0x248c8e,_0x1e2b7f=Window_ItemCategory[_0x2ab675(0x37d)],_0x1df357=DataManager[_0x2ab675(0x273)]()[_0x2ab675(0x395)](),_0x245fb1=[];for(const _0x36bc94 of _0x1e2b7f){this[_0x2ab675(0x309)]=_0x36bc94[_0x2ab675(0x28e)];for(const _0x55e367 of _0x1df357){Window_ItemList['prototype']['includes'][_0x2ab675(0x3c5)](this,_0x55e367)&&_0x245fb1[_0x2ab675(0x1e9)](_0x55e367);}}this[_0x2ab675(0x309)]=null;for(const _0x3cb0d3 of _0x245fb1){_0x1df357[_0x2ab675(0x369)](_0x3cb0d3);}_0x1df357['length']>0x0&&this[_0x2ab675(0x27d)](),this[_0x2ab675(0x1f9)]=_0x1df357;},Window_ItemCategory[_0x248c8e(0x33a)][_0x248c8e(0x27d)]=function(){const _0x59b6e4=_0x248c8e,_0xf6f6f1=VisuMZ[_0x59b6e4(0x29c)]['Settings'][_0x59b6e4(0x3a2)];let _0xe6df80=_0xf6f6f1[_0x59b6e4(0x36f)]||_0x59b6e4(0x36f),_0x52404d=_0xf6f6f1['NoCategoryIcon']||0xa0;_0xe6df80=_0x59b6e4(0x354)[_0x59b6e4(0x39a)](_0x52404d,_0xe6df80),this[_0x59b6e4(0x310)](_0xe6df80,_0x59b6e4(0x372),!![],'ItemCraftingNoCategory');},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x3fc)]=Window_ItemCategory[_0x248c8e(0x33a)][_0x248c8e(0x212)],Window_ItemCategory[_0x248c8e(0x33a)][_0x248c8e(0x212)]=function(_0x15f833){const _0x86423a=_0x248c8e;if(SceneManager[_0x86423a(0x379)]()&&!this[_0x86423a(0x35a)](_0x15f833))return;VisuMZ[_0x86423a(0x29c)][_0x86423a(0x3fc)]['call'](this,_0x15f833);},Window_ItemCategory[_0x248c8e(0x33a)]['isItemCraftingCategoryValid']=function(_0x31a5a5){const _0x54eac5=_0x248c8e,_0x2aa5e8=DataManager[_0x54eac5(0x273)](),_0x200a2d=_0x31a5a5[_0x54eac5(0x28e)],_0xfcf238=_0x31a5a5['Icon'];this[_0x54eac5(0x309)]=_0x200a2d;for(const _0x4af603 of _0x2aa5e8){if(!_0x4af603)continue;if(Window_ItemList[_0x54eac5(0x33a)][_0x54eac5(0x203)][_0x54eac5(0x3c5)](this,_0x4af603))return this['_category']=null,!![];}return this['_category']=null,![];},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x32a)]=Window_ItemCategory['prototype']['needsSelection'],Window_ItemCategory[_0x248c8e(0x33a)][_0x248c8e(0x274)]=function(){const _0x5e1d17=_0x248c8e;if(SceneManager[_0x5e1d17(0x379)]())return!![];return VisuMZ['ItemCraftingSys']['Window_ItemCategory_needsSelection'][_0x5e1d17(0x3c5)](this);},VisuMZ[_0x248c8e(0x29c)]['Window_Selectable_select']=Window_Selectable[_0x248c8e(0x33a)][_0x248c8e(0x344)],Window_Selectable['prototype']['select']=function(_0x539396){const _0x4bef50=_0x248c8e;VisuMZ[_0x4bef50(0x29c)][_0x4bef50(0x381)][_0x4bef50(0x3c5)](this,_0x539396),this[_0x4bef50(0x2fb)]===Window_ItemCategory&&SceneManager[_0x4bef50(0x379)]()&&_0x539396>=0x0&&(this[_0x4bef50(0x31d)]=this['currentExt']()||'');};function Window_ItemCraftingList(){const _0x277beb=_0x248c8e;this[_0x277beb(0x345)](...arguments);}function _0x2f09(){const _0x43b79f=['ARRAYJSON','_armorIDs','calcWindowHeight','parseLocalizedText','createStatusWindow','isCustomLayout','onItemOk','left','MaskLetter','createJS','_ingredientAmounts','map','ItemsEquipsCore','createCraftingIngredientsLists','craftPicture','cancel','NumberBgType','Gold','_categoryWindow','changePaintOpacity','getItemIdWithName','boxHeight','create','processFinishAnimation','anchor','note','_craftingEvents','ParseArmorNotetags','makeItemList','tooltipFrameCheckRequirements','loadTitle2','WarningMsg','owned','getBackgroundOpacity','setMainMenuItemCraftingVisible','CraftEventRepeat','Window_MenuCommand_addOriginalCommands','_customItemCraftingSettings','getProxyItem','loadPicture','Window_ShopStatus_refresh','visible','buyWindowRectItemsEquipsCore','item-%1','version','SortByIDandPriority','_backSprite1','returnBackToItemWindow','isPlaytest','JSON','Owned','_craftingCommonEventScene','isSceneMap','3686744SksHft','_iconSprite','_animationPlaying','concat','drawMathMarks','_animationSprite','constructor','itemWindowRect','itemNameY','_ingredientIndex','jsGlobalCraftEffect','setup','imageSmoothingEnabled','smooth','maxItems','setItemForCraftBatchContents','77JjJCDO','868263yczerc','onCategoryOk','_itemSprite','_category','setItemWindow','jsGlobalListing','CategoryWindow_RectJS','setFrame','round','createIngredientSelectionTitle','addCommand','statusWidth','TurnSwitches','showBatchContents','ShowAnimations','FadeSpeed','onItemCancel','Mask','ItemCraftingMenuCommand','bitmap','contents','Enable','_statusWindow','_lastCraftingExt','IngredientTitle','shouldDrawCraftBatchContents','onDatabaseLoaded','deactivate','createItemSprite','createBackground','drawCraftedIcon','join','ShowMainMenu','bind','buttonAssistText4','value','Window_ItemCategory_needsSelection','drawCraftingIngredients','parseCraftingIngredientsData','Scene_Boot_onDatabaseLoaded','armors','MaskText','Settings','createTooltipWindow','buttonAssistItemListRequirement','dimColor2','Scene_Menu_createCommandWindow','isItemCraftingCommandVisible','_itemSpriteOpacitySpeed','NumWindowOwned','hasMaxItems','shift','prototype','net','item','VisuMZ_3_ShopBatches','clearUserSelectedIngredients','NoMask','onIngredientListOk','activate','updateHelp','currencyUnit','select','initialize','weapon-%1','_tooltipWindow','in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.','mainAreaHeight','BypassMasks','_data','drawCurrentItemName','drawText','SwitchCraft','setTooltipWindowText','isArmor','parse','processCraftCommonEvent','postCreateItemWindowModernControls','\x5cI[%1]%2','toUpperCase','fontSize','drawCurrencyValue','itemHasCraftCommonEvent','setHelpWindowItem','isItemCraftingCategoryValid','%1/%2','BypassSwitches','drawIngredientGold','makeCommandList','getCustomItemCraftingSettings','-\x20Items\x20must\x20never\x20give\x20themselves!','scale','weapons','ReturnToLastCrafting','allOfCraftBatchItemsMax','_numberWindow','_bypassProxy','setHelpWindow','onAnimationFinish','remove','_helpWindow','itemCraftingIngredientsBridge','#%1','NumWindowNet','isMainMenuItemCraftingVisible','Uncategorized','VisuMZ_1_ItemsEquipsCore','terminate','category','addItemCraftingCommandAutomatically','ReqQuantityFontSize','split','drawShopBatchContentsItem','itemCrafting','placeButtons','isSceneItemCrafting','numItems','items','windowskin','categoryList','updateCraftingAnimation','contains','loadTitle1','Window_Selectable_select','setHandler','_animationWait','createUncategorizedItemCategory','_amount','_categoryIndex','itemCraftingNumberWindowOk','buttonAssistLargeIncrement','STR','BgFilename2','updateItemSpriteOpacity','setBackgroundOpacity','_commandWindow','standardIconWidth','textWidth','right','createCustomBackgroundImages','isFinishedAnimating','dimColor1','_itemIDs','clone','Change','1912578WFCLHL','onNumberCancel','meetsCraftingCommonEventSwitches','format','CraftAssistButton','onButtonOk','isCraftingItemMasked','%1\x20has\x20illegal\x20batch\x20contents:\x0a','Scale','playItemCrafting','drawCraftingItemName','General','enableCraftingSwitches','initItemCraftingMainMenu','tooltipSkin','applyInverse','onNumberOk','goto','IngredientList','goldWindowRect','getCraftingIngredients','CategoryTitle','ParseItemNotetags','isProxyItem','loadWindowskin','finishAnimation','onIngredientListCancel','_allCraftableItems','return\x200','addOriginalCommands','clearCustomItemCraftingSettings','ButtonAssistBgType','ListBgType','\x20%1','drawIcon','AnySw','enabled','StatusBgType','destroy','RegExp','isSceneBattle','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','drawItemIngredient','10691100oFQZuS','drawCraftBatchContents','updateTooltipWindow','call','changeOkButtonEnable','createCommandWindow','OnSwitches','_number','Sound','_text','drawCategories','setStatusWindow','VisuMZ_2_ShopCommonEvents','setBackgroundType','resetFontSettings','Animations','drawTooltipBackground','hasCraftingEventOccurred','hasCustomWindowSkin','BgSettings','allCraftableArmors','animationIDs','getWeaponIdWithName','determineMax','CheckAnySwitches','fillRect','ParseAllNotetags','opacity','_buttonAssistWindow','show','maskItemName','drawIngredients','isMainMenuItemCraftingEnabled','initItemCraftingSys','OffSwitches','allCraftableWeapons','visualGoldDisplayAutosize','frames','HelpWindow_RectJS','createItemWindowBase','setMainMenuItemCraftingEnabled','isRightInputMode','\x20+\x20','itemLineRect','gainItem','contentsBack','selectedIngredientList','lineHeight','loseItem','destroyAnimationSprite','drawBigItemIcon','Animation','isSkill','textColor','CategoryIcon','_goldWindow','width','setClickHandler','Window_ItemCategory_addItemCategory','Show','CraftRepeat','floor','_ItemCrafting_MainMenu','checkItemCraftingResultsValid','8758yWQPIj','Name','setupSelectIngredientWindow','hasCraftBatchItems','armor','maxCols','_buttons','makeFontBigger','drawCraftBatchContentsList','AllSwitches','length','drawShopBatchContentsRemaining','gold','quantityFontSize','updateAnimationSprite','processItemCrafting','SelectedText','setItemSpritePosition','Game_System_initialize','CraftEventOnce','helpWindowRectJS','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','CraftBatchWrap','_ingredientSelectTitle','CategoryBgType','getColor','height','Window_ItemCategory_makeCommandList','ParseWeaponNotetags','_max','onItemCrafted','loadSystem','mainAreaTop','buttonAssistText2','_context','STRUCT','setItem','removeChild','push','SystemEnableItemCraftingMenu','toLowerCase','gainCraftBatchItems','match','goldWindowRectJS','refresh','parameters','6730115qGrAdz','jsOnCraft','itemRectWithPadding','Game_Party_gainItem','destroyItemSprite','doesItemHaveOpenCategories','fontItalic','isWeapon','_nonCategoryItemCraftingItems','createNumberWindow','scrollTo','worldTransform','_scene','playCancel','addChild','number','ARRAYSTR','hitIndex','includes','buttonAssistKey2','CustomItemCraftingSceneOpen','isOkEnabled','drawFadedItemBackground','setupNumberWindow','_maxIngredientsSize','addLoadListener','shown','_itemWindow','maskName','drawIngredientCategory','powerDownColor','commandItemCrafting','mainCommandWidth','addItemCategory','5xdRYWK','NUM','_craftingIngredients','ItemCraftingNumberWindow','innerWidth','NumWindowShift','ARRAYFUNC','min','boxWidth','categoryWindowRect','helpWindowRect','GoldBgType','Game_Party_numItems','_ingredientSelectList','drawPicture','index','iconHeight','resetCraftingSwitches','statusWindowRectItemsEquipsCore','isItemCrafted','windowPadding','loseGold','SnapshotOpacity','GoldIcon','initItemCraftingEvents','goldWindowRectItemsEquipsCore','customCraftingOnly','category:\x20%1','ItemQuantityFmt','max','allCraftableItems','registerCraftedItem','Ingredients','drawBigItemImage','all','itemAt','adjustSprite','VisuMZ_1_MessageCore','_backSprite2','EnableMainMenu','categoryWindowRectJS','Window','drawItemName','totalPriceY','BgFilename1','process_VisuMZ_ItemCraftingSys_Notetags','setItemSpriteFrame','reserveCommonEvent','hide','MaskItalics','createAnimation','maskItalics','name','_cache_getCraftBatchItems','startAnimation','drawTotalPrice','itemHeight','isItem','drawTextEx','ItemScene','StatusWindow_RectJS','blt','isEnabled','allowCreateStatusWindow','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','CheckAllSwitches','_ingredientCategories','_alreadySelected','GoldWindow_RectJS','getCraftBatchItems','registerCraftingEvent','Weapon','MainMenu','visualGoldDisplayNoCost','Item','_ingredientsList','Parse_Notetags_CreateJS','SystemShowItemCraftingMenu','innerHeight','CraftedIcon','createCraftingItemKey','createAnimationIDs','isTouchedInsideFrame','FUNC','_animationIDs','_itemsCrafted','getArmorIdWithName','bigPicture','_windowLayer','isItemCraftingCommandEnabled','_weaponIDs','\x20=\x20','isMVAnimation','getItemCraftedTimes','createIngredientSelectionList','createGoldWindow','currentCraftableItems','needsSelection','registerCommand','setCustomItemCraftingSettings','activateItemWindow','popScene','setValue','IngredientBridge','itemWindowRectJS','active','addUncategorizedItemCategory','statusWindowRect','_list','drawGoldIngredient','_craftPicture','playStaticSe','setText','clear','craftableArmors','IconSet','commandWindowRectItemsEquipsCore','Window_ShopStatus_setItem','SelectedColor','categories','changeTextColor','ItemCraftingSceneOpen','ConvertParams','Type','VisuMZ_0_CoreEngine','test','isTriggered','armor-%1','EVAL','itemCraftedIcon','ItemWindow_RectJS','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_item','trim','center','_allCraftableWeapons','weapon','ItemCraftingSys','description','string','Armor','drawItemBackground','itemPadding','smoothSelect','drawIngredientItem','craftableItems','baseTextRect','_allCraftableArmors','iconIndex','filter','buttonAssistText1','setItemSpriteOpacity','addItemCraftingCommand','7798656wnQztb','systemColor','addWindow','cursorWidth','isCraftItemListed','exit','buttonAssistKey1','setItemSpriteBitmap','craftableWeapons','CoreEngine','ceil','createContents','ARRAYEVAL','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isReleased','update','findExt','isUseModernControls','iconWidth','isShowNew'];_0x2f09=function(){return _0x43b79f;};return _0x2f09();}Window_ItemCraftingList[_0x248c8e(0x33a)]=Object[_0x248c8e(0x2d6)](Window_ItemList['prototype']),Window_ItemCraftingList['prototype'][_0x248c8e(0x2fb)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x248c8e(0x40f)]=VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x330)][_0x248c8e(0x23c)][_0x248c8e(0x374)],Window_ItemCraftingList[_0x248c8e(0x246)]=VisuMZ['ItemCraftingSys']['Settings']['Mask'][_0x248c8e(0x244)],Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x345)]=function(_0x3ed066){const _0x4df7dc=_0x248c8e;Window_ItemList[_0x4df7dc(0x33a)]['initialize'][_0x4df7dc(0x3c5)](this,_0x3ed066),this[_0x4df7dc(0x331)]();},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x407)]=function(){return 0x1;},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x24b)]=function(){const _0x53f218=_0x248c8e;return Window_Scrollable[_0x53f218(0x33a)][_0x53f218(0x24b)]['call'](this)*0x3+0x8;},Window_ItemCraftingList['prototype'][_0x248c8e(0x251)]=function(_0x16cc2e){return!![];},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x2dc)]=function(){const _0x460f89=_0x248c8e;this[_0x460f89(0x34b)]=DataManager['currentCraftableItems']()[_0x460f89(0x2a8)](_0xc1e338=>this[_0x460f89(0x203)](_0xc1e338));const _0x4cf410=this[_0x460f89(0x34b)][_0x460f89(0x2cb)](_0x51c70a=>DataManager[_0x460f89(0x3ab)](_0x51c70a)[_0x460f89(0x40c)]);this[_0x460f89(0x209)]=Math[_0x460f89(0x230)](..._0x4cf410)+0x1;},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x203)]=function(_0x3fd3c6){const _0x297108=_0x248c8e;if(this[_0x297108(0x309)]==='ItemCraftingNoCategory'){const _0x25926d=SceneManager[_0x297108(0x1fd)];if(_0x25926d&&_0x25926d[_0x297108(0x2d2)]&&_0x25926d[_0x297108(0x2d2)]['_nonCategoryItemCraftingItems'])return _0x25926d[_0x297108(0x2d2)][_0x297108(0x1f9)][_0x297108(0x203)](_0x3fd3c6);}return Window_ItemList['prototype'][_0x297108(0x203)][_0x297108(0x3c5)](this,_0x3fd3c6);},Window_ItemCraftingList[_0x248c8e(0x33a)]['selectLast']=function(){},Window_ItemCraftingList[_0x248c8e(0x33a)]['drawItem']=function(_0x2929c5){const _0xdc7117=_0x248c8e,_0x1cfb2e=this[_0xdc7117(0x236)](_0x2929c5);if(!_0x1cfb2e)return;const _0x17570a=this[_0xdc7117(0x1f3)](_0x2929c5);this['resetFontSettings'](),this[_0xdc7117(0x207)](_0x17570a,0x2),this[_0xdc7117(0x234)](_0x2929c5,_0x1cfb2e,_0x17570a),this[_0xdc7117(0x324)](_0x1cfb2e,_0x17570a),this[_0xdc7117(0x3a1)](_0x1cfb2e,_0x17570a),this[_0xdc7117(0x32b)](_0x1cfb2e,_0x17570a);},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x207)]=function(_0x32d17b,_0x41e6ab){const _0x276d62=_0x248c8e;_0x41e6ab=_0x41e6ab||0x1,this[_0x276d62(0x2d3)](![]);const _0x261b17=ColorManager[_0x276d62(0x393)](),_0x3cc684=ColorManager[_0x276d62(0x333)](),_0x698a44=_0x32d17b[_0x276d62(0x3fa)]/0x2,_0x37653f=this[_0x276d62(0x3f1)]();while(_0x41e6ab--){this[_0x276d62(0x31a)]['gradientFillRect'](_0x32d17b['x'],_0x32d17b['y'],_0x698a44,_0x37653f,_0x3cc684,_0x261b17),this[_0x276d62(0x31a)]['gradientFillRect'](_0x32d17b['x']+_0x698a44,_0x32d17b['y'],_0x698a44,_0x37653f,_0x261b17,_0x3cc684);}this[_0x276d62(0x2d3)](!![]);},Window_Base[_0x248c8e(0x33a)]['drawCraftingItemName']=function(_0x3814a9,_0x4200e2){const _0x2a3be7=_0x248c8e;let _0xa77502=_0x3814a9[_0x2a3be7(0x247)],_0x40e9cb=_0x4200e2[_0x2a3be7(0x1dd)]+this[_0x2a3be7(0x2a1)]()*0x2,_0x273998=_0x4200e2['y'],_0x1e85ee=_0x4200e2[_0x2a3be7(0x3fa)]-_0x40e9cb-this[_0x2a3be7(0x2a1)]()-ImageManager[_0x2a3be7(0x2be)];DataManager[_0x2a3be7(0x39d)](_0x3814a9)&&(_0xa77502=VisuMZ[_0x2a3be7(0x29c)][_0x2a3be7(0x3e0)](_0x3814a9),this[_0x2a3be7(0x31a)][_0x2a3be7(0x1f7)]=Window_ItemCraftingList[_0x2a3be7(0x246)]),this[_0x2a3be7(0x34d)](_0xa77502,_0x40e9cb,_0x273998,_0x1e85ee,_0x2a3be7(0x2c7)),this['contents']['fontItalic']=![];},VisuMZ[_0x248c8e(0x29c)]['maskItemName']=function(_0xf868c6){const _0x1bcfab=_0x248c8e;return DataManager['getProxyItem']&&(_0xf868c6=DataManager['getProxyItem'](_0xf868c6)),_0xf868c6[_0x1bcfab(0x2d9)]['match'](VisuMZ[_0x1bcfab(0x29c)]['RegExp'][_0x1bcfab(0x32f)])?String(RegExp['$1']):this[_0x1bcfab(0x20d)](_0xf868c6['name']);},VisuMZ[_0x248c8e(0x29c)]['maskName']=function(_0x277fc9){const _0x4f7a41=_0x248c8e;return Imported[_0x4f7a41(0x238)]&&TextManager[_0x4f7a41(0x2c3)]&&(_0x277fc9=TextManager[_0x4f7a41(0x2c3)](_0x277fc9)),Array(_0x277fc9[_0x4f7a41(0x40c)]+0x1)[_0x4f7a41(0x325)](TextManager['itemCraftingMask']);},Window_ItemCraftingList['prototype'][_0x248c8e(0x234)]=function(_0x9ae12e,_0xe97e81,_0x427c8d){const _0x504bd7=_0x248c8e,_0x27c6a5=VisuMZ[_0x504bd7(0x29c)]['RegExp'],_0x1b4e27=_0xe97e81['note'];let _0x18db61='';if(_0x1b4e27['match'](_0x27c6a5[_0x504bd7(0x2ce)]))_0x18db61=String(RegExp['$1']);else _0x1b4e27[_0x504bd7(0x1ed)](_0x27c6a5[_0x504bd7(0x26a)])&&(_0x18db61=String(RegExp['$1']));if(_0x18db61){const _0xdedb9d=ImageManager[_0x504bd7(0x2e7)](_0x18db61);_0xdedb9d[_0x504bd7(0x20a)](this[_0x504bd7(0x221)][_0x504bd7(0x327)](this,_0x9ae12e,_0xdedb9d));}else this[_0x504bd7(0x3f4)](_0xe97e81,_0x427c8d);},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x221)]=function(_0xfb7098,_0x10628f){const _0x3ade3c=_0x248c8e,_0x5841b4=this[_0x3ade3c(0x1f3)](_0xfb7098);let _0x16edf8=_0x5841b4['x']+this[_0x3ade3c(0x2a1)](),_0x211a90=_0x5841b4['y']+0x4,_0x8c3afb=_0x5841b4[_0x3ade3c(0x3fa)]-this[_0x3ade3c(0x2a1)]()*0x2,_0x406d96=_0x5841b4[_0x3ade3c(0x1dd)]-0x8,_0x4022e6=Math[_0x3ade3c(0x21a)](_0x8c3afb,_0x406d96);const _0x4d2206=_0x4022e6/_0x10628f[_0x3ade3c(0x3fa)],_0xb3d5bb=_0x4022e6/_0x10628f[_0x3ade3c(0x1dd)],_0x1c6050=Math['min'](_0x4d2206,_0xb3d5bb,0x1);let _0xa76b56=Math[_0x3ade3c(0x30e)](_0x10628f[_0x3ade3c(0x3fa)]*_0x1c6050),_0x5ae956=Math[_0x3ade3c(0x30e)](_0x10628f['height']*_0x1c6050);_0x16edf8+=Math[_0x3ade3c(0x30e)]((_0x4022e6-_0xa76b56)/0x2),_0x211a90+=Math[_0x3ade3c(0x30e)]((_0x4022e6-_0x5ae956)/0x2);const _0x4ae002=_0x10628f[_0x3ade3c(0x3fa)],_0x34b934=_0x10628f[_0x3ade3c(0x1dd)];this[_0x3ade3c(0x31a)]['_context'][_0x3ade3c(0x301)]=!![],this[_0x3ade3c(0x31a)][_0x3ade3c(0x250)](_0x10628f,0x0,0x0,_0x4ae002,_0x34b934,_0x16edf8,_0x211a90,_0xa76b56,_0x5ae956),this[_0x3ade3c(0x31a)]['_context'][_0x3ade3c(0x301)]=!![];},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x3f4)]=function(_0x4a4f79,_0x21cdce){const _0x1113c0=_0x248c8e,_0x217a3a=_0x4a4f79['iconIndex'];let _0x3a91c0=_0x21cdce['x']+this[_0x1113c0(0x2a1)](),_0x54fba6=_0x21cdce['y']+0x4,_0x4cec28=_0x21cdce['width']-this[_0x1113c0(0x2a1)]()*0x2,_0x4dc6ad=_0x21cdce[_0x1113c0(0x1dd)]-0x8,_0x109e13=Math[_0x1113c0(0x21a)](_0x4cec28,_0x4dc6ad);_0x109e13=Math[_0x1113c0(0x3ff)](_0x109e13/ImageManager[_0x1113c0(0x2be)])*ImageManager[_0x1113c0(0x2be)],_0x54fba6+=(_0x4dc6ad-_0x109e13)/0x2;const _0x1d8888=ImageManager['loadSystem'](_0x1113c0(0x286)),_0x25805e=ImageManager['iconWidth'],_0xfadb5b=ImageManager['iconHeight'],_0x17c6b1=_0x217a3a%0x10*_0x25805e,_0x5211bf=Math['floor'](_0x217a3a/0x10)*_0xfadb5b;this[_0x1113c0(0x31a)]['_context']['imageSmoothingEnabled']=![],this[_0x1113c0(0x31a)][_0x1113c0(0x250)](_0x1d8888,_0x17c6b1,_0x5211bf,_0x25805e,_0xfadb5b,_0x3a91c0,_0x54fba6,_0x109e13,_0x109e13),this[_0x1113c0(0x31a)][_0x1113c0(0x1e5)][_0x1113c0(0x301)]=!![];},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x324)]=function(_0x15da0d,_0x535255){const _0x51494a=_0x248c8e;if(!$gameSystem[_0x51494a(0x226)](_0x15da0d))return;const _0x46a3c5=ImageManager[_0x51494a(0x294)];let _0x5c5642=_0x535255['x']+_0x535255[_0x51494a(0x3fa)]-ImageManager[_0x51494a(0x2be)],_0x2fe109=_0x535255['y']+0x2;this[_0x51494a(0x3b9)](_0x46a3c5,_0x5c5642,_0x2fe109);},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x32b)]=function(_0x321069,_0x33f88c){const _0x45a7fd=_0x248c8e,_0x23ec64=DataManager[_0x45a7fd(0x3ab)](_0x321069);let _0x1986ac=_0x33f88c[_0x45a7fd(0x1dd)]+this[_0x45a7fd(0x2a1)]()*0x2,_0x2834d9=_0x33f88c['y']+Math[_0x45a7fd(0x30e)](this[_0x45a7fd(0x3f1)]()*1.2),_0x7d5de5=_0x33f88c['width']-_0x1986ac-this[_0x45a7fd(0x2a1)](),_0x5a0ae6=Math[_0x45a7fd(0x3ff)](_0x7d5de5/this[_0x45a7fd(0x209)]),_0x11d4a3=!![];for(const _0x1f5e56 of _0x23ec64){if(!_0x11d4a3){let _0x306789=TextManager[_0x45a7fd(0x36b)],_0x52d9f9=_0x33f88c['y']+(_0x33f88c[_0x45a7fd(0x1dd)]-this[_0x45a7fd(0x3f1)]()*1.5);this[_0x45a7fd(0x34d)](_0x306789,_0x1986ac,_0x52d9f9,_0x5a0ae6,_0x45a7fd(0x299));}_0x1986ac+=_0x5a0ae6;const _0x173fd0=_0x1f5e56[0x0],_0x4a0555=_0x1f5e56[0x1],_0x135ba0=_0x173fd0===_0x45a7fd(0x40e)?$gameParty[_0x45a7fd(0x40e)]():$gameParty[_0x45a7fd(0x37a)](_0x173fd0);if(_0x173fd0===_0x45a7fd(0x40e))this[_0x45a7fd(0x35d)](_0x4a0555,_0x135ba0,_0x1986ac,_0x2834d9,_0x5a0ae6);else typeof _0x173fd0===_0x45a7fd(0x29e)&&_0x173fd0['match'](/CATEGORY/i)?this[_0x45a7fd(0x20e)](_0x173fd0,_0x4a0555,_0x1986ac,_0x2834d9,_0x5a0ae6):this[_0x45a7fd(0x2a3)](_0x173fd0,_0x4a0555,_0x135ba0,_0x1986ac,_0x2834d9,_0x5a0ae6);this['resetFontSettings'](),_0x11d4a3=![];}},Window_ItemCraftingList[_0x248c8e(0x33a)]['drawIngredientGold']=function(_0x22ed0f,_0x2adb2b,_0x15f43a,_0x15eac7,_0x586d3b){const _0x4c4179=_0x248c8e;if(Imported[_0x4c4179(0x28f)]){let _0x1da792=_0x15f43a-Math['round'](ImageManager[_0x4c4179(0x2be)]/0x2),_0x50b115=_0x15eac7+Math[_0x4c4179(0x30e)]((this[_0x4c4179(0x3f1)]()-ImageManager[_0x4c4179(0x223)])/0x2);const _0x1432dd=VisuMZ[_0x4c4179(0x2b5)]?VisuMZ['CoreEngine'][_0x4c4179(0x330)][_0x4c4179(0x2d1)][_0x4c4179(0x22a)]:0x0;this[_0x4c4179(0x3b9)](_0x1432dd,_0x1da792,_0x50b115);}else{let _0x3cff41=_0x15f43a-Math[_0x4c4179(0x30e)](_0x586d3b/0x2),_0x51613a=_0x15eac7+Math[_0x4c4179(0x30e)]((this[_0x4c4179(0x3f1)]()-ImageManager['iconHeight'])/0x2);this[_0x4c4179(0x28b)](ColorManager[_0x4c4179(0x2ad)]()),this[_0x4c4179(0x409)](),this[_0x4c4179(0x34d)](TextManager['currencyUnit'],_0x3cff41,_0x51613a,_0x586d3b,_0x4c4179(0x299)),this[_0x4c4179(0x3d0)]();}let _0xce0fc3=_0x15f43a-Math[_0x4c4179(0x30e)](_0x586d3b/0x2),_0xb68184=_0x15eac7+this[_0x4c4179(0x3f1)]();const _0x2bf778=VisuMZ[_0x4c4179(0x2cc)][_0x4c4179(0x330)][_0x4c4179(0x24e)][_0x4c4179(0x22f)];let _0x2bcf61=_0x2bf778['format'](_0x22ed0f);_0x22ed0f>_0x2adb2b&&this[_0x4c4179(0x28b)](ColorManager[_0x4c4179(0x20f)]()),this[_0x4c4179(0x31a)][_0x4c4179(0x356)]=Window_ItemCraftingList[_0x4c4179(0x40f)],this[_0x4c4179(0x34d)](_0x2bcf61,_0xce0fc3,_0xb68184,_0x586d3b,_0x4c4179(0x299));},Window_ItemCraftingList[_0x248c8e(0x33a)]['drawIngredientCategory']=function(_0x2bb7c0,_0x1597f0,_0x17173d,_0xa97531,_0x4c6406){const _0x3ca3a4=_0x248c8e,_0x5e3c90=VisuMZ[_0x3ca3a4(0x29c)][_0x3ca3a4(0x330)][_0x3ca3a4(0x3a2)];let _0x1283b0=_0x17173d-Math[_0x3ca3a4(0x30e)](ImageManager[_0x3ca3a4(0x2be)]/0x2),_0x433d59=_0xa97531+Math[_0x3ca3a4(0x30e)]((this[_0x3ca3a4(0x3f1)]()-ImageManager['iconHeight'])/0x2);this[_0x3ca3a4(0x3b9)](_0x5e3c90[_0x3ca3a4(0x3f8)],_0x1283b0,_0x433d59),_0x2bb7c0[_0x3ca3a4(0x1ed)](/CATEGORY: (.*)/i);const _0x5c8655=String(RegExp['$1'])[_0x3ca3a4(0x298)]();let _0x1bbf0=_0x17173d-Math['round'](_0x4c6406/0x2),_0x253d02=_0xa97531;this[_0x3ca3a4(0x31a)][_0x3ca3a4(0x356)]=Window_ItemCraftingList['quantityFontSize'],this[_0x3ca3a4(0x34d)](_0x5c8655,_0x1bbf0,_0x253d02,_0x4c6406,'center');let _0x40a4ee=_0x17173d-Math[_0x3ca3a4(0x30e)](_0x4c6406/0x2),_0x38249b=_0xa97531+this['lineHeight']();const _0x19539a=VisuMZ[_0x3ca3a4(0x2cc)][_0x3ca3a4(0x330)][_0x3ca3a4(0x24e)][_0x3ca3a4(0x22f)];let _0x36b23a=_0x19539a[_0x3ca3a4(0x39a)](_0x1597f0);this[_0x3ca3a4(0x31a)][_0x3ca3a4(0x356)]=Window_ItemCraftingList[_0x3ca3a4(0x40f)],this[_0x3ca3a4(0x34d)](_0x36b23a,_0x40a4ee,_0x38249b,_0x4c6406,_0x3ca3a4(0x299));},Window_ItemCraftingList['prototype'][_0x248c8e(0x2a3)]=function(_0x1e96f0,_0x51d6de,_0x3edb2f,_0x412700,_0x2595ec,_0x133c44){const _0x567285=_0x248c8e;let _0x58c276=_0x412700-Math['round'](ImageManager[_0x567285(0x2be)]/0x2),_0x3a91d0=_0x2595ec+Math[_0x567285(0x30e)]((this['lineHeight']()-ImageManager[_0x567285(0x223)])/0x2);this[_0x567285(0x3b9)](_0x1e96f0[_0x567285(0x2a7)],_0x58c276,_0x3a91d0);let _0x5339a3=_0x412700-Math[_0x567285(0x30e)](_0x133c44/0x2),_0x5c1aa2=_0x2595ec+this[_0x567285(0x3f1)]();const _0x1f71a1=VisuMZ['ItemsEquipsCore'][_0x567285(0x330)]['ItemScene']['ItemQuantityFmt'];let _0x914b39=_0x1f71a1[_0x567285(0x39a)](_0x567285(0x35b)['format'](_0x3edb2f,_0x51d6de));_0x51d6de>_0x3edb2f&&this[_0x567285(0x28b)](ColorManager[_0x567285(0x20f)]()),this[_0x567285(0x31a)][_0x567285(0x356)]=Window_ItemCraftingList[_0x567285(0x40f)],this[_0x567285(0x34d)](_0x914b39,_0x5339a3,_0x5c1aa2,_0x133c44,_0x567285(0x299));},Window_ItemCraftingList['prototype'][_0x248c8e(0x331)]=function(){const _0xecf1d7=_0x248c8e;if(!VisuMZ[_0xecf1d7(0x29c)][_0xecf1d7(0x330)]['Window']['ToolTips'])return;const _0x4e3cee=new Rectangle(0x0,0x0,Graphics[_0xecf1d7(0x21b)],Window_Base[_0xecf1d7(0x33a)]['fittingHeight'](0x1));this[_0xecf1d7(0x347)]=new Window_ItemCraftingTooltip(_0x4e3cee),this[_0xecf1d7(0x1ff)](this['_tooltipWindow']);},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x2bb)]=function(){const _0x3f3af2=_0x248c8e;Window_ItemList[_0x3f3af2(0x33a)][_0x3f3af2(0x2bb)][_0x3f3af2(0x3c5)](this),this[_0x3f3af2(0x3c4)]();},Window_ItemCraftingList['prototype'][_0x248c8e(0x3c4)]=function(){const _0x207283=_0x248c8e;if(!this[_0x207283(0x347)])return;this[_0x207283(0x2dd)]()?this[_0x207283(0x34f)]():this[_0x207283(0x347)][_0x207283(0x283)]('');const _0x106c49=new Point(TouchInput['x'],TouchInput['y']),_0x595ddf=this['worldTransform']['applyInverse'](_0x106c49);this['_tooltipWindow']['x']=_0x595ddf['x']-this[_0x207283(0x347)]['width']/0x2,this['_tooltipWindow']['y']=_0x595ddf['y']-this['_tooltipWindow'][_0x207283(0x1dd)];},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x2dd)]=function(){const _0x2c18b8=_0x248c8e;if(!this['active'])return![];if(!this[_0x2c18b8(0x33c)]())return![];if(!this[_0x2c18b8(0x265)]())return![];if(this[_0x2c18b8(0x202)]()!==this[_0x2c18b8(0x222)]())return![];return!![];},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x34f)]=function(){const _0x591bf0=_0x248c8e,_0x235597=this['itemRectWithPadding'](this[_0x591bf0(0x222)]());$gameTemp[_0x591bf0(0x366)]=!![];const _0x162aac=DataManager['getCraftingIngredients'](this['item']());$gameTemp['_bypassProxy']=![];const _0xecaf5e=new Point(TouchInput['x'],TouchInput['y']),_0x55736e=this[_0x591bf0(0x1fc)][_0x591bf0(0x3a6)](_0xecaf5e);let _0x5c677b=_0x235597[_0x591bf0(0x1dd)]+this['itemPadding']()*0x2,_0x5d1aea=_0x235597['y']+this[_0x591bf0(0x3f1)](),_0x478233=_0x235597[_0x591bf0(0x3fa)]-_0x5c677b-this[_0x591bf0(0x2a1)](),_0x362a79=Math[_0x591bf0(0x3ff)](_0x478233/this['_maxIngredientsSize']);for(const _0x1e002e of _0x162aac){_0x5c677b+=_0x362a79;const _0x5a9953=new Rectangle(_0x5c677b-ImageManager[_0x591bf0(0x2be)],0x0,ImageManager[_0x591bf0(0x2be)]*0x2,Graphics[_0x591bf0(0x2d5)]);if(_0x5a9953[_0x591bf0(0x37f)](_0x55736e['x'],_0x55736e['y'])){let _0x2db76e=_0x1e002e[0x0],_0x3d5577='';if(_0x2db76e===_0x591bf0(0x40e))_0x3d5577=TextManager[_0x591bf0(0x343)];else typeof _0x2db76e==='string'&&_0x2db76e[_0x591bf0(0x1ed)](/CATEGORY/i)?(_0x2db76e[_0x591bf0(0x1ed)](/CATEGORY: (.*)/i),_0x3d5577=String(RegExp['$1'])[_0x591bf0(0x298)]()):_0x3d5577=_0x2db76e[_0x591bf0(0x247)];this[_0x591bf0(0x347)][_0x591bf0(0x283)](_0x3d5577['trim']());return;}}this[_0x591bf0(0x347)]['setText']('');},Window_ItemCraftingList[_0x248c8e(0x33a)][_0x248c8e(0x342)]=function(){const _0x41c92e=_0x248c8e,_0x5d4ee0=this[_0x41c92e(0x33c)]()&&DataManager[_0x41c92e(0x39d)](this[_0x41c92e(0x33c)]())?null:this['item']();this[_0x41c92e(0x359)](_0x5d4ee0),this[_0x41c92e(0x31c)]&&this[_0x41c92e(0x31c)][_0x41c92e(0x2fb)]===Window_ShopStatus&&this[_0x41c92e(0x31c)][_0x41c92e(0x1e7)](_0x5d4ee0);};function Window_ItemCraftingTooltip(){this['initialize'](...arguments);}Window_ItemCraftingTooltip['prototype']=Object[_0x248c8e(0x2d6)](Window_Base[_0x248c8e(0x33a)]),Window_ItemCraftingTooltip[_0x248c8e(0x33a)][_0x248c8e(0x2fb)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x248c8e(0x3a5)]=VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x330)][_0x248c8e(0x23c)]['name'],Window_ItemCraftingTooltip[_0x248c8e(0x33a)]['initialize']=function(_0x421df9){const _0x34a9d8=_0x248c8e;Window_Base[_0x34a9d8(0x33a)]['initialize'][_0x34a9d8(0x3c5)](this,_0x421df9),this[_0x34a9d8(0x3cf)](this[_0x34a9d8(0x3d4)]()?0x0:0x2),this['setText']('');},Window_ItemCraftingTooltip[_0x248c8e(0x33a)]['hasCustomWindowSkin']=function(){return Window_ItemCraftingTooltip['tooltipSkin']!=='';},Window_ItemCraftingTooltip[_0x248c8e(0x33a)][_0x248c8e(0x3af)]=function(){const _0x286409=_0x248c8e;Window_ItemCraftingTooltip[_0x286409(0x3a5)]!==''?this[_0x286409(0x37c)]=ImageManager[_0x286409(0x1e2)](Window_ItemCraftingTooltip[_0x286409(0x3a5)]):Window_Base[_0x286409(0x33a)]['loadWindowskin']['call'](this);},Window_ItemCraftingTooltip[_0x248c8e(0x33a)][_0x248c8e(0x283)]=function(_0x3cb9eb){const _0x11517a=_0x248c8e;this[_0x11517a(0x3cb)]!==_0x3cb9eb&&(this[_0x11517a(0x3cb)]=_0x3cb9eb,this[_0x11517a(0x1ef)]());},Window_ItemCraftingTooltip[_0x248c8e(0x33a)]['clear']=function(){const _0xe74260=_0x248c8e;this[_0xe74260(0x283)]('');},Window_ItemCraftingTooltip[_0x248c8e(0x33a)]['setItem']=function(_0x720cf5){const _0x5312be=_0x248c8e;this['setText'](_0x720cf5?_0x720cf5[_0x5312be(0x247)]:'');},Window_ItemCraftingTooltip[_0x248c8e(0x33a)][_0x248c8e(0x1ef)]=function(){const _0x1368cd=_0x248c8e,_0x24f020=this[_0x1368cd(0x2a5)]();this[_0x1368cd(0x3d2)](),this['drawText'](this['_text'],0x0,0x0,this[_0x1368cd(0x217)],_0x1368cd(0x299));},Window_ItemCraftingTooltip[_0x248c8e(0x33a)][_0x248c8e(0x3d2)]=function(){const _0x3e6f48=_0x248c8e;if(this[_0x3e6f48(0x3cb)]==='')this[_0x3e6f48(0x31a)][_0x3e6f48(0x284)](),this[_0x3e6f48(0x3fa)]=0x0;else{let _0xcc707e=this[_0x3e6f48(0x38f)](this[_0x3e6f48(0x3cb)])+this['itemPadding']()*0x4;this['width']=_0xcc707e+$gameSystem[_0x3e6f48(0x227)]()*0x2,this[_0x3e6f48(0x2b7)]();if(this[_0x3e6f48(0x3d4)]())return;const _0x8de1e1=ColorManager[_0x3e6f48(0x393)]();this[_0x3e6f48(0x31a)][_0x3e6f48(0x3db)](0x0,0x0,this['innerWidth'],this[_0x3e6f48(0x261)],_0x8de1e1);}};function Window_ItemCraftingNumber(){const _0x31a0b6=_0x248c8e;this[_0x31a0b6(0x345)](...arguments);}Window_ItemCraftingNumber[_0x248c8e(0x33a)]=Object[_0x248c8e(0x2d6)](Window_ShopNumber[_0x248c8e(0x33a)]),Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x2fb)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x345)]=function(_0x2191b4){const _0x480917=_0x248c8e;Window_ShopNumber[_0x480917(0x33a)]['initialize'][_0x480917(0x3c5)](this,_0x2191b4);},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x300)]=function(_0x242f72){const _0xfb2deb=_0x248c8e;this['_item']=_0x242f72,this[_0xfb2deb(0x1e0)]=this[_0xfb2deb(0x3d9)](),this[_0xfb2deb(0x3c9)]=Math[_0xfb2deb(0x21a)](0x1,this['_max']),this[_0xfb2deb(0x378)](),this[_0xfb2deb(0x1ef)]();},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['determineMax']=function(){const _0x4ace0e=_0x248c8e;if(DataManager[_0x4ace0e(0x405)](this[_0x4ace0e(0x297)]))return $gameParty['calcCraftBatchItemsMax'](this[_0x4ace0e(0x297)]);const _0x333f9c=[],_0x3221da=this[_0x4ace0e(0x297)],_0x2732f9=DataManager[_0x4ace0e(0x3ab)](_0x3221da);let _0x30b8c3=0x0;for(const _0x28ab83 of _0x2732f9){if(!_0x28ab83)continue;let _0x4f56e6=_0x28ab83[0x0];const _0x39def0=_0x28ab83[0x1];_0x4f56e6==='gold'?_0x333f9c[_0x4ace0e(0x1e9)](Math[_0x4ace0e(0x3ff)]($gameParty['gold']()/_0x39def0)):(typeof _0x4f56e6===_0x4ace0e(0x29e)&&_0x4f56e6[_0x4ace0e(0x1ed)](/CATEGORY/i)&&(_0x4f56e6=SceneManager[_0x4ace0e(0x1fd)][_0x4ace0e(0x25e)][_0x30b8c3],_0x30b8c3+=0x1),_0x333f9c['push'](Math[_0x4ace0e(0x3ff)]($gameParty[_0x4ace0e(0x37a)](_0x4f56e6)/_0x39def0)));}if(_0x333f9c['length']<=0x0)_0x333f9c['push'](0x0);return _0x333f9c[_0x4ace0e(0x1e9)]($gameParty[_0x4ace0e(0x303)](_0x3221da)-$gameParty[_0x4ace0e(0x37a)](_0x3221da)),Math[_0x4ace0e(0x21a)](..._0x333f9c);},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x1ef)]=function(){const _0x478b08=_0x248c8e;Window_Selectable[_0x478b08(0x33a)]['refresh'][_0x478b08(0x3c5)](this),this[_0x478b08(0x3c6)](),this[_0x478b08(0x2a0)](0x0),this[_0x478b08(0x24a)](),this['drawHorzLine'](),this[_0x478b08(0x34c)]();},Window_ItemCraftingNumber['prototype']['changeOkButtonEnable']=function(){const _0x533541=_0x248c8e,_0x337326=this[_0x533541(0x408)][0x4];if(!_0x337326)return;this['isOkEnabled']()?_0x337326[_0x533541(0x3fb)](this[_0x533541(0x39c)][_0x533541(0x327)](this)):_0x337326['_clickHandler']=null;},Window_ItemCraftingNumber['prototype'][_0x248c8e(0x2fd)]=function(){const _0x35b639=_0x248c8e;return Math[_0x35b639(0x3ff)](this[_0x35b639(0x23e)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['totalPriceY']=function(){const _0x2adf6f=_0x248c8e;return Math[_0x2adf6f(0x3ff)](this[_0x2adf6f(0x261)]-this[_0x2adf6f(0x3f1)]()*6.5);},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['buttonY']=function(){const _0x3880c9=_0x248c8e;return Math[_0x3880c9(0x3ff)](this[_0x3880c9(0x2fd)]()+this[_0x3880c9(0x3f1)]()*0x2);},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['isOkEnabled']=function(){const _0x420e61=_0x248c8e;if((this[_0x420e61(0x3c9)]||0x0)<=0x0)return![];return Window_ShopNumber[_0x420e61(0x33a)][_0x420e61(0x206)][_0x420e61(0x3c5)](this);},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['isTouchOkEnabled']=function(){const _0x51c9fe=_0x248c8e;return this[_0x51c9fe(0x206)]();},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x24a)]=function(){const _0x1d6184=_0x248c8e,_0x5ed726=DataManager['getCraftingIngredients'](this[_0x1d6184(0x297)]);let _0x4f15df=this[_0x1d6184(0x23e)]();_0x4f15df-=this[_0x1d6184(0x3f1)]()*_0x5ed726[_0x1d6184(0x40c)],this[_0x1d6184(0x386)]=0x0,this[_0x1d6184(0x3cc)](_0x4f15df);for(const _0x367562 of _0x5ed726){_0x4f15df+=this[_0x1d6184(0x3f1)]();if(!_0x367562)continue;this['drawIngredients'](_0x367562,_0x4f15df);};},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['drawCategories']=function(_0xf31f67){const _0x3d5ca0=_0x248c8e,_0x53d2e0=this[_0x3d5ca0(0x2a1)]();let _0x26b688=_0x53d2e0*0x2;const _0x164e05=this['innerWidth']-_0x26b688-_0x53d2e0*0x3,_0x3cc627=_0x26b688+Math[_0x3d5ca0(0x2b6)](_0x164e05/0x3),_0x2c04f1=Math[_0x3d5ca0(0x3ff)](_0x164e05*0x2/0x3/0x3),_0x2165d9=Math['max'](this[_0x3d5ca0(0x38f)]('\x20+\x20'),this[_0x3d5ca0(0x38f)](_0x3d5ca0(0x26e)));this['resetFontSettings'](),this[_0x3d5ca0(0x28b)](ColorManager[_0x3d5ca0(0x2ad)]());const _0x2a256a=[_0x3d5ca0(0x2e0),_0x3d5ca0(0x339),_0x3d5ca0(0x33b)];for(let _0x17f57c=0x0;_0x17f57c<0x3;_0x17f57c++){const _0x5a8a11=_0x2a256a[_0x17f57c],_0x2b4c45=TextManager[_0x3d5ca0(0x216)][_0x5a8a11];this[_0x3d5ca0(0x34d)](_0x2b4c45,_0x3cc627+_0x2c04f1*_0x17f57c+_0x2165d9,_0xf31f67,_0x2c04f1-_0x2165d9,'center');}},Window_ItemCraftingNumber[_0x248c8e(0x33a)]['drawMathMarks']=function(_0x155454,_0x1415d0){const _0x277967=_0x248c8e,_0x5e9d06=this[_0x277967(0x2a1)]();let _0xca9408=_0x5e9d06*0x2;const _0x4030ae=this['innerWidth']-_0xca9408-_0x5e9d06*0x3,_0x4d94d1=_0xca9408+Math[_0x277967(0x2b6)](_0x4030ae/0x3),_0xa70283=Math['floor'](_0x4030ae*0x2/0x3/0x3);_0x1415d0=_0x277967(0x3b8)[_0x277967(0x39a)](_0x1415d0),this['drawText'](_0x1415d0,_0x4d94d1+_0xa70283*0x1,_0x155454,_0xa70283,_0x277967(0x2c7)),this[_0x277967(0x34d)]('\x20=',_0x4d94d1+_0xa70283*0x2,_0x155454,_0xa70283,_0x277967(0x2c7));},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x3e1)]=function(_0x32a9db,_0x198112){const _0x4dd609=_0x248c8e;let _0x178a59=_0x32a9db[0x0];this[_0x4dd609(0x3d0)](),this[_0x4dd609(0x2f9)](_0x198112,'-'),_0x178a59===_0x4dd609(0x40e)?this[_0x4dd609(0x280)](_0x32a9db,_0x198112,!![]):this[_0x4dd609(0x3c1)](_0x32a9db,_0x198112,!![],![]);},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x34c)]=function(){const _0x58557f=_0x248c8e,_0x2b2b80=[this[_0x58557f(0x297)],0x1],_0x171c9b=this['itemNameY'](),_0x496692=DataManager['isCraftingItemMasked'](this[_0x58557f(0x297)]);this[_0x58557f(0x3c1)](_0x2b2b80,_0x171c9b,![],_0x496692),this['drawMathMarks'](_0x171c9b,'+');},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x3e6)]=function(){return!![];},Window_ItemCraftingNumber['prototype'][_0x248c8e(0x25c)]=function(){return![];},Window_ItemCraftingNumber[_0x248c8e(0x33a)][_0x248c8e(0x280)]=function(_0x6e04af,_0xd30512,_0x565c14){const _0x5f9ed2=_0x248c8e,_0x2cf4ea=this[_0x5f9ed2(0x2a1)]();let _0x21bae=_0x2cf4ea*0x2;const _0x2e91ab=this[_0x5f9ed2(0x217)]-_0x21bae-_0x2cf4ea*0x3,_0xb965e5=_0x21bae+Math[_0x5f9ed2(0x2b6)](_0x2e91ab/0x3),_0x40bc97=Math[_0x5f9ed2(0x3ff)](_0x2e91ab*0x2/0x3/0x3),_0x1c424c=Math[_0x5f9ed2(0x230)](this['textWidth'](_0x5f9ed2(0x3ec)),this['textWidth'](_0x5f9ed2(0x26e))),_0x1ac39c=_0x6e04af[0x0],_0x179cdc=_0x6e04af[0x1],_0x39f55c=_0x179cdc*this['_number'],_0x57a870=VisuMZ[_0x5f9ed2(0x2b5)]?VisuMZ['CoreEngine'][_0x5f9ed2(0x330)][_0x5f9ed2(0x2d1)][_0x5f9ed2(0x22a)]:0x0;if(_0x57a870>0x0){const _0x7e2bb6=ImageManager[_0x5f9ed2(0x38e)]||0x20,_0x4c4aa5=_0x7e2bb6-ImageManager['iconWidth'],_0x1f85db=_0x7e2bb6+0x4,_0x1dc827=_0xd30512+(this['lineHeight']()-ImageManager[_0x5f9ed2(0x223)])/0x2;this['drawIcon'](_0x57a870+Math[_0x5f9ed2(0x2b6)](_0x4c4aa5/0x2),_0x21bae,_0x1dc827),_0x21bae+=_0x1f85db;}this[_0x5f9ed2(0x28b)](ColorManager['systemColor']()),this['drawText'](TextManager[_0x5f9ed2(0x343)],_0x21bae,_0xd30512,_0x40bc97,_0x5f9ed2(0x2c7));const _0x41d694=$gameParty['gold']();this[_0x5f9ed2(0x357)](_0x41d694,TextManager[_0x5f9ed2(0x343)],_0xb965e5,_0xd30512,_0x40bc97);const _0x2acbed=_0xb965e5+_0x40bc97*0x1+_0x1c424c,_0x241f39=_0x40bc97-_0x1c424c;this[_0x5f9ed2(0x357)](_0x39f55c,TextManager[_0x5f9ed2(0x343)],_0x2acbed,_0xd30512,_0x241f39);const _0x80da5d=_0xb965e5+_0x40bc97*0x2+_0x1c424c,_0x504bce=_0x40bc97-_0x1c424c,_0x15fb5f=Math[_0x5f9ed2(0x21a)](_0x41d694+_0x39f55c*(_0x565c14?-0x1:0x1),$gameParty['maxGold']());this[_0x5f9ed2(0x357)](_0x15fb5f,TextManager[_0x5f9ed2(0x343)],_0x80da5d,_0xd30512,_0x504bce);},Window_ItemCraftingNumber['prototype'][_0x248c8e(0x3c1)]=function(_0xa9ace3,_0x2e59d3,_0x165a0e,_0x3dad58){const _0x345ae4=_0x248c8e,_0x4f1651=this[_0x345ae4(0x2a1)]();let _0x2c9d77=_0x4f1651*0x2;const _0x3edc9d=this[_0x345ae4(0x217)]-_0x2c9d77-_0x4f1651*0x3,_0x5c7f72=_0x2c9d77+Math[_0x345ae4(0x2b6)](_0x3edc9d/0x3),_0x17db68=Math[_0x345ae4(0x3ff)](_0x3edc9d*0x2/0x3/0x3),_0x186d6c=Math['max'](this['textWidth'](_0x345ae4(0x3ec)),this[_0x345ae4(0x38f)](_0x345ae4(0x26e)));let _0x5ea085=_0xa9ace3[0x0];typeof _0x5ea085===_0x345ae4(0x29e)&&_0x5ea085['match'](/CATEGORY/i)&&(_0x5ea085=SceneManager['_scene'][_0x345ae4(0x25e)][this[_0x345ae4(0x386)]],this[_0x345ae4(0x386)]+=0x1);const _0x4a2819=_0xa9ace3[0x1],_0x277c14=_0x4a2819*this['_number'];let _0x59b768=_0x5ea085[_0x345ae4(0x2a7)];const _0x5f5785=_0x59b768>0x0?ImageManager[_0x345ae4(0x2be)]+0x4:0x0;if(_0x3dad58){const _0x373bdf=new Rectangle(_0x2c9d77,_0x2e59d3,_0x3edc9d,this[_0x345ae4(0x3f1)]());this['drawCraftingItemName'](_0x5ea085,_0x373bdf),this[_0x345ae4(0x3b9)](_0x5ea085[_0x345ae4(0x2a7)],_0x373bdf['x'],_0x373bdf['y']);}else this[_0x345ae4(0x23d)](_0x5ea085,_0x2c9d77,_0x2e59d3,_0x3edc9d);const _0x204761=_0x5c7f72+_0x17db68*0x0,_0x39aaf6=_0x17db68-_0x5f5785,_0x116602=$gameParty[_0x345ae4(0x37a)](_0x5ea085);this['drawText'](_0x116602,_0x204761,_0x2e59d3,_0x39aaf6,_0x345ae4(0x390)),this[_0x345ae4(0x3b9)](_0x59b768,_0x204761+_0x39aaf6+0x4,_0x2e59d3);const _0xae5b04=_0x5c7f72+_0x17db68*0x1+_0x186d6c,_0x367b36=_0x17db68-_0x186d6c-_0x5f5785;this[_0x345ae4(0x34d)](_0x277c14,_0xae5b04,_0x2e59d3,_0x367b36,_0x345ae4(0x390)),this[_0x345ae4(0x3b9)](_0x59b768,_0xae5b04+_0x367b36+0x4,_0x2e59d3);const _0x13ee43=_0x5c7f72+_0x17db68*0x2+_0x186d6c,_0x389d2b=_0x17db68-_0x186d6c-_0x5f5785,_0x5f47c8=_0x116602+_0x277c14*(_0x165a0e?-0x1:0x1);this[_0x345ae4(0x34d)](_0x5f47c8,_0x13ee43,_0x2e59d3,_0x389d2b,'right'),this[_0x345ae4(0x3b9)](_0x59b768,_0x13ee43+_0x389d2b+0x4,_0x2e59d3);},Window_ItemCraftingNumber['prototype']['itemRect']=function(){const _0x43aa6f=_0x248c8e,_0x295e6b=this[_0x43aa6f(0x2a1)]();let _0x9770b3=_0x295e6b*0x2;const _0x3a3067=this['innerWidth']-_0x9770b3-_0x295e6b*0x3,_0x48226e=_0x9770b3+Math[_0x43aa6f(0x2b6)](_0x3a3067/0x3),_0x591c5b=this[_0x43aa6f(0x2fd)](),_0x48f56a=Math[_0x43aa6f(0x3ff)](_0x3a3067*0x2/0x3/0x3),_0x5a2f52=Math[_0x43aa6f(0x230)](this[_0x43aa6f(0x38f)](_0x43aa6f(0x3ec)),this['textWidth']('\x20=\x20')),_0xb550c9=this[_0x43aa6f(0x297)]?.[_0x43aa6f(0x2a7)]>0x0?ImageManager[_0x43aa6f(0x2be)]:0x0,_0x2e4a88=this[_0x43aa6f(0x2af)](),_0x4ac710=new Rectangle(Math['floor'](_0x48226e+_0x48f56a*0x2-this[_0x43aa6f(0x2af)]()-_0xb550c9+this[_0x43aa6f(0x2a1)]()/0x2-0x2),_0x591c5b,this[_0x43aa6f(0x2af)](),this[_0x43aa6f(0x3f1)]());return _0x4ac710;};function Window_ItemCraftingIngredient(){const _0x2b3157=_0x248c8e;this[_0x2b3157(0x345)](...arguments);}Window_ItemCraftingIngredient['prototype']=Object[_0x248c8e(0x2d6)](Window_ItemList['prototype']),Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x2fb)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x345)]=function(_0x2c35aa){const _0x27dba9=_0x248c8e;Window_Selectable[_0x27dba9(0x33a)]['initialize']['call'](this,_0x2c35aa),this[_0x27dba9(0x385)]=0x0;},Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x2bf)]=function(){return![];},Window_ItemCraftingIngredient['prototype'][_0x248c8e(0x300)]=function(_0xd0f765,_0x322e1e){const _0x202157=_0x248c8e;this[_0x202157(0x309)]=_0xd0f765,this[_0x202157(0x385)]=_0x322e1e||0x1,this[_0x202157(0x1ef)](),this[_0x202157(0x1fb)](0x0,0x0),this[_0x202157(0x341)](),this[_0x202157(0x2a2)](0x0);},Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x2dc)]=function(){const _0x218b49=_0x248c8e;this['_data']=$gameParty['allItems']()[_0x218b49(0x2a8)](_0x14d57e=>this['includes'](_0x14d57e));},Window_ItemCraftingIngredient[_0x248c8e(0x33a)]['includes']=function(_0x2c42d1){const _0x1a2b9f=_0x248c8e;if(!_0x2c42d1)return![];if(_0x2c42d1===SceneManager['_scene'][_0x1a2b9f(0x297)])return![];return _0x2c42d1[_0x1a2b9f(0x28a)][_0x1a2b9f(0x203)](this[_0x1a2b9f(0x309)][_0x1a2b9f(0x355)]()[_0x1a2b9f(0x298)]());},Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x251)]=function(_0x1df9f9){const _0x43346b=_0x248c8e;if(!_0x1df9f9)return![];if(this[_0x43346b(0x3f0)]()[_0x43346b(0x203)](_0x1df9f9))return![];return $gameParty[_0x43346b(0x37a)](_0x1df9f9)>=this[_0x43346b(0x385)];},Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x3f0)]=function(){const _0x21d450=_0x248c8e,_0x45c97e=[],_0x41ccd3=DataManager['getCraftingIngredients'](SceneManager[_0x21d450(0x1fd)][_0x21d450(0x297)]);for(const _0x281307 of _0x41ccd3){if(!_0x281307)continue;const _0x3e128f=_0x281307[0x0];(DataManager[_0x21d450(0x24c)](_0x3e128f)||DataManager[_0x21d450(0x1f8)](_0x3e128f)||DataManager[_0x21d450(0x350)](_0x3e128f))&&_0x45c97e[_0x21d450(0x1e9)](_0x3e128f);}return _0x45c97e[_0x21d450(0x2f8)](SceneManager[_0x21d450(0x1fd)][_0x21d450(0x25e)]);},Window_ItemCraftingIngredient[_0x248c8e(0x33a)]['drawItemName']=function(_0x188d57,_0xcf08fa,_0x3201b1,_0x1d6561){const _0x317669=_0x248c8e;_0x188d57&&this[_0x317669(0x3f0)]()[_0x317669(0x203)](_0x188d57)&&(this[_0x317669(0x256)]=!![]),Window_ItemList['prototype'][_0x317669(0x23d)][_0x317669(0x3c5)](this,_0x188d57,_0xcf08fa,_0x3201b1,_0x1d6561),this[_0x317669(0x256)]=![];},Window_ItemCraftingIngredient[_0x248c8e(0x33a)][_0x248c8e(0x34d)]=function(_0x5c61b7,_0x3398b4,_0x2fe538,_0x2257e9,_0x376591){const _0xed6656=_0x248c8e;if(this['_alreadySelected']){const _0x5f527b=VisuMZ[_0xed6656(0x29c)][_0xed6656(0x330)][_0xed6656(0x3a2)];this[_0xed6656(0x31a)][_0xed6656(0x3f7)]=ColorManager[_0xed6656(0x1dc)](_0x5f527b[_0xed6656(0x289)]),_0x5c61b7+=_0x5f527b[_0xed6656(0x412)];}Window_Base[_0xed6656(0x33a)]['drawText'][_0xed6656(0x3c5)](this,_0x5c61b7,_0x3398b4,_0x2fe538,_0x2257e9,_0x376591);},VisuMZ['ItemCraftingSys'][_0x248c8e(0x2e8)]=Window_ShopStatus[_0x248c8e(0x33a)][_0x248c8e(0x1ef)],Window_ShopStatus[_0x248c8e(0x33a)]['refresh']=function(){const _0x432bf7=_0x248c8e;this[_0x432bf7(0x31f)](this[_0x432bf7(0x297)])?this['setItemForCraftBatchContents'](this[_0x432bf7(0x297)]):VisuMZ[_0x432bf7(0x29c)][_0x432bf7(0x2e8)][_0x432bf7(0x3c5)](this);},VisuMZ[_0x248c8e(0x29c)][_0x248c8e(0x288)]=Window_ShopStatus[_0x248c8e(0x33a)]['setItem'],Window_ShopStatus[_0x248c8e(0x33a)][_0x248c8e(0x1e7)]=function(_0x3eb0a6){const _0x4bd238=_0x248c8e;this['shouldDrawCraftBatchContents'](_0x3eb0a6)?this[_0x4bd238(0x304)](_0x3eb0a6):VisuMZ[_0x4bd238(0x29c)]['Window_ShopStatus_setItem'][_0x4bd238(0x3c5)](this,_0x3eb0a6);},Window_ShopStatus[_0x248c8e(0x33a)]['shouldDrawCraftBatchContents']=function(_0x404a6b){const _0xf235f4=_0x248c8e;if(!_0x404a6b)return![];if(!SceneManager[_0xf235f4(0x379)]())return![];if(Imported[_0xf235f4(0x33d)]){if(!Window_ShopStatus['BATCH_CONTENTS'][_0xf235f4(0x313)])return![];}return DataManager['hasCraftBatchItems'](_0x404a6b);},Window_ShopStatus[_0x248c8e(0x33a)][_0x248c8e(0x304)]=function(_0x293e03){const _0x430b77=_0x248c8e;this['_item']=_0x293e03,this['contents'][_0x430b77(0x284)](),this[_0x430b77(0x3ef)][_0x430b77(0x284)](),this[_0x430b77(0x3c3)](_0x293e03);},Window_ShopStatus[_0x248c8e(0x33a)][_0x248c8e(0x3c3)]=function(_0x35d6d1){const _0x343731=_0x248c8e;let _0x1c43d8=this['drawShopBatchContentsTitle']();_0x1c43d8=this['drawCraftBatchContentsList'](_0x1c43d8,_0x35d6d1),this[_0x343731(0x40d)](_0x1c43d8);},Window_ShopStatus[_0x248c8e(0x33a)][_0x248c8e(0x40a)]=function(_0x48c341,_0x11f671){const _0x21d41e=_0x248c8e,_0x5eb42b=DataManager[_0x21d41e(0x258)](_0x11f671),_0x99325a=['items','weapons',_0x21d41e(0x32e)];for(const _0x124d4f of _0x99325a){const _0x3ea2fa=_0x5eb42b[_0x124d4f];for(const _0x61842d in _0x3ea2fa){const _0x59356a=Number(_0x61842d),_0x22fedc=_0x3ea2fa[_0x61842d]||0x0;let _0x467bc1=null;if(_0x124d4f===_0x21d41e(0x37b))_0x467bc1=$dataItems[_0x59356a];if(_0x124d4f==='weapons')_0x467bc1=$dataWeapons[_0x59356a];if(_0x124d4f==='armors')_0x467bc1=$dataArmors[_0x59356a];if(DataManager[_0x21d41e(0x3ae)](_0x467bc1))continue;_0x467bc1&&(this[_0x21d41e(0x3d0)](),this[_0x21d41e(0x376)](_0x48c341,_0x467bc1,_0x22fedc),_0x48c341+=this['lineHeight']());}}return _0x48c341;};