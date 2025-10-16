//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.88;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.88] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
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
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
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
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
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
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
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
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
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
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
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
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
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
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
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
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
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
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
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
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
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
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
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
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
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
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
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
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
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
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
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
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
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
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
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
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
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
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x555f1c=_0x233d;(function(_0x3b247e,_0x5c4841){const _0x16220f=_0x233d,_0x3c490f=_0x3b247e();while(!![]){try{const _0x69999a=-parseInt(_0x16220f(0x612))/0x1+parseInt(_0x16220f(0x594))/0x2+-parseInt(_0x16220f(0x2e3))/0x3*(-parseInt(_0x16220f(0x77a))/0x4)+-parseInt(_0x16220f(0x1a4))/0x5+-parseInt(_0x16220f(0x431))/0x6+parseInt(_0x16220f(0x53b))/0x7*(parseInt(_0x16220f(0x209))/0x8)+parseInt(_0x16220f(0x8d4))/0x9*(parseInt(_0x16220f(0x7a2))/0xa);if(_0x69999a===_0x5c4841)break;else _0x3c490f['push'](_0x3c490f['shift']());}catch(_0x45ddfc){_0x3c490f['push'](_0x3c490f['shift']());}}}(_0x4c1e,0xda37e));var label=_0x555f1c(0x5c5),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x555f1c(0x3b5)](function(_0x851f23){const _0x105f55=_0x555f1c;return _0x851f23[_0x105f55(0x29b)]&&_0x851f23[_0x105f55(0x5da)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x555f1c(0x51b)]=VisuMZ[label][_0x555f1c(0x51b)]||{},VisuMZ[_0x555f1c(0x3ed)]=function(_0x2a93c5,_0x48f563){const _0x28ac17=_0x555f1c;for(const _0x573107 in _0x48f563){if(_0x573107[_0x28ac17(0x3b6)](/(.*):(.*)/i)){const _0x4e8450=String(RegExp['$1']),_0x2a5827=String(RegExp['$2'])['toUpperCase']()[_0x28ac17(0x26b)]();let _0x5562bf,_0x4b1f61,_0x3280a7;switch(_0x2a5827){case _0x28ac17(0x2a5):_0x5562bf=_0x48f563[_0x573107]!==''?Number(_0x48f563[_0x573107]):0x0;break;case'ARRAYNUM':_0x4b1f61=_0x48f563[_0x573107]!==''?JSON[_0x28ac17(0x8e8)](_0x48f563[_0x573107]):[],_0x5562bf=_0x4b1f61['map'](_0x4bad51=>Number(_0x4bad51));break;case _0x28ac17(0x234):_0x5562bf=_0x48f563[_0x573107]!==''?eval(_0x48f563[_0x573107]):null;break;case'ARRAYEVAL':_0x4b1f61=_0x48f563[_0x573107]!==''?JSON['parse'](_0x48f563[_0x573107]):[],_0x5562bf=_0x4b1f61['map'](_0x163dcd=>eval(_0x163dcd));break;case _0x28ac17(0x84f):_0x5562bf=_0x48f563[_0x573107]!==''?JSON['parse'](_0x48f563[_0x573107]):'';break;case'ARRAYJSON':_0x4b1f61=_0x48f563[_0x573107]!==''?JSON[_0x28ac17(0x8e8)](_0x48f563[_0x573107]):[],_0x5562bf=_0x4b1f61['map'](_0x5d144d=>JSON['parse'](_0x5d144d));break;case'FUNC':_0x5562bf=_0x48f563[_0x573107]!==''?new Function(JSON['parse'](_0x48f563[_0x573107])):new Function('return\x200');break;case _0x28ac17(0x787):_0x4b1f61=_0x48f563[_0x573107]!==''?JSON[_0x28ac17(0x8e8)](_0x48f563[_0x573107]):[],_0x5562bf=_0x4b1f61[_0x28ac17(0x2b4)](_0x3d35bf=>new Function(JSON['parse'](_0x3d35bf)));break;case _0x28ac17(0xf7):_0x5562bf=_0x48f563[_0x573107]!==''?String(_0x48f563[_0x573107]):'';break;case _0x28ac17(0x638):_0x4b1f61=_0x48f563[_0x573107]!==''?JSON[_0x28ac17(0x8e8)](_0x48f563[_0x573107]):[],_0x5562bf=_0x4b1f61[_0x28ac17(0x2b4)](_0x422606=>String(_0x422606));break;case _0x28ac17(0xf1):_0x3280a7=_0x48f563[_0x573107]!==''?JSON['parse'](_0x48f563[_0x573107]):{},_0x2a93c5[_0x4e8450]={},VisuMZ[_0x28ac17(0x3ed)](_0x2a93c5[_0x4e8450],_0x3280a7);continue;case _0x28ac17(0x629):_0x4b1f61=_0x48f563[_0x573107]!==''?JSON[_0x28ac17(0x8e8)](_0x48f563[_0x573107]):[],_0x5562bf=_0x4b1f61[_0x28ac17(0x2b4)](_0x475491=>VisuMZ[_0x28ac17(0x3ed)]({},JSON[_0x28ac17(0x8e8)](_0x475491)));break;default:continue;}_0x2a93c5[_0x4e8450]=_0x5562bf;}}return _0x2a93c5;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3b3)]=SceneManager['exit'],SceneManager[_0x555f1c(0x447)]=function(){const _0x4b36c6=_0x555f1c;VisuMZ['CoreEngine'][_0x4b36c6(0x3b3)][_0x4b36c6(0x2b0)](this);if(Utils[_0x4b36c6(0x7a9)]>=_0x4b36c6(0x573)){if(typeof nw===_0x4b36c6(0x506))nw[_0x4b36c6(0x5e2)][_0x4b36c6(0x7dd)]();}},(_0x3f667e=>{const _0x36b2b4=_0x555f1c,_0x43fd5f=_0x3f667e[_0x36b2b4(0x381)];for(const _0x36e0ec of dependencies){if(!Imported[_0x36e0ec]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x36b2b4(0x39f)](_0x43fd5f,_0x36e0ec)),SceneManager['exit']();break;}}const _0x3daf96=_0x3f667e[_0x36b2b4(0x5da)];if(_0x3daf96[_0x36b2b4(0x3b6)](/\[Version[ ](.*?)\]/i)){const _0x2dda29=Number(RegExp['$1']);_0x2dda29!==VisuMZ[label][_0x36b2b4(0x3c8)]&&(alert(_0x36b2b4(0x6f4)[_0x36b2b4(0x39f)](_0x43fd5f,_0x2dda29)),SceneManager['exit']());}if(_0x3daf96[_0x36b2b4(0x3b6)](/\[Tier[ ](\d+)\]/i)){const _0x52e746=Number(RegExp['$1']);_0x52e746<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x36b2b4(0x39f)](_0x43fd5f,_0x52e746,tier)),SceneManager[_0x36b2b4(0x447)]()):tier=Math['max'](_0x52e746,tier);}VisuMZ[_0x36b2b4(0x3ed)](VisuMZ[label][_0x36b2b4(0x51b)],_0x3f667e['parameters']);})(pluginData),((()=>{const _0x32c10e=_0x555f1c;if(VisuMZ[_0x32c10e(0x5c5)][_0x32c10e(0x51b)][_0x32c10e(0x71c)]['SubfolderParse']??!![])for(const _0x435b35 in $plugins){const _0x582775=$plugins[_0x435b35];_0x582775[_0x32c10e(0x381)][_0x32c10e(0x3b6)](/(.*)\/(.*)/i)&&(_0x582775[_0x32c10e(0x381)]=String(RegExp['$2'][_0x32c10e(0x26b)]()));}})()),PluginManager[_0x555f1c(0x28a)](pluginData['name'],'AnimationPoint',_0xd7ecde=>{const _0xb27457=_0x555f1c;if(!SceneManager['_scene'])return;if(!SceneManager[_0xb27457(0x7b9)][_0xb27457(0x723)])return;VisuMZ[_0xb27457(0x3ed)](_0xd7ecde,_0xd7ecde);const _0x215018=Math['round'](_0xd7ecde['pointX']),_0x3216aa=Math[_0xb27457(0x647)](_0xd7ecde[_0xb27457(0x7da)]);$gameTemp[_0xb27457(0x666)](_0x215018,_0x3216aa,_0xd7ecde[_0xb27457(0x287)],_0xd7ecde[_0xb27457(0x103)],_0xd7ecde[_0xb27457(0x42e)]);}),PluginManager['registerCommand'](pluginData[_0x555f1c(0x381)],'AudioChangeBgmVolume',_0x5b6e9b=>{const _0x157b52=_0x555f1c;VisuMZ[_0x157b52(0x3ed)](_0x5b6e9b,_0x5b6e9b);const _0x3268da=Math[_0x157b52(0x647)](_0x5b6e9b['volume'])['clamp'](0x0,0x64),_0x20d25f=AudioManager[_0x157b52(0x859)];_0x20d25f&&(_0x20d25f[_0x157b52(0x3d0)]=_0x3268da,_0x20d25f[_0x157b52(0x160)]=AudioManager['_bgmBuffer'][_0x157b52(0x239)](),AudioManager[_0x157b52(0x229)](_0x20d25f),AudioManager[_0x157b52(0x8c3)](_0x20d25f,_0x20d25f[_0x157b52(0x160)]),AudioManager[_0x157b52(0x503)][_0x157b52(0x36e)](_0x20d25f[_0x157b52(0x160)]));}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x29e),_0x48cbec=>{const _0x5d2731=_0x555f1c;VisuMZ['ConvertParams'](_0x48cbec,_0x48cbec);const _0x1cb748=Math[_0x5d2731(0x647)](_0x48cbec['pitch'])[_0x5d2731(0x739)](0x32,0x96),_0x3ef777=AudioManager[_0x5d2731(0x859)];_0x3ef777&&(_0x3ef777[_0x5d2731(0x3bd)]=_0x1cb748,_0x3ef777[_0x5d2731(0x160)]=AudioManager[_0x5d2731(0x503)]['seek'](),AudioManager[_0x5d2731(0x229)](_0x3ef777),AudioManager['playBgm'](_0x3ef777,_0x3ef777['pos']),AudioManager[_0x5d2731(0x503)][_0x5d2731(0x36e)](_0x3ef777[_0x5d2731(0x160)]));}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],_0x555f1c(0x49d),_0x502438=>{const _0x32e950=_0x555f1c;VisuMZ['ConvertParams'](_0x502438,_0x502438);const _0x31f4e6=Math['round'](_0x502438['pan'])[_0x32e950(0x739)](-0x64,0x64),_0x4b93eb=AudioManager[_0x32e950(0x859)];_0x4b93eb&&(_0x4b93eb[_0x32e950(0x520)]=_0x31f4e6,_0x4b93eb[_0x32e950(0x160)]=AudioManager['_bgmBuffer'][_0x32e950(0x239)](),AudioManager[_0x32e950(0x229)](_0x4b93eb),AudioManager['playBgm'](_0x4b93eb,_0x4b93eb['pos']),AudioManager[_0x32e950(0x503)]['_startPlaying'](_0x4b93eb[_0x32e950(0x160)]));}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x36d),_0x586c42=>{const _0x51917c=_0x555f1c;VisuMZ[_0x51917c(0x3ed)](_0x586c42,_0x586c42);const _0x5e3dde=Math[_0x51917c(0x647)](_0x586c42[_0x51917c(0x3d0)])[_0x51917c(0x739)](0x0,0x64),_0x5d4584=AudioManager[_0x51917c(0x549)];_0x5d4584&&(_0x5d4584[_0x51917c(0x3d0)]=_0x5e3dde,_0x5d4584[_0x51917c(0x160)]=AudioManager[_0x51917c(0x149)]['seek'](),AudioManager[_0x51917c(0x790)](_0x5d4584),AudioManager['playBgs'](_0x5d4584,_0x5d4584[_0x51917c(0x160)]),AudioManager[_0x51917c(0x149)][_0x51917c(0x36e)](_0x5d4584[_0x51917c(0x160)]));}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],'AudioChangeBgsPitch',_0x29bd8f=>{const _0x2826ce=_0x555f1c;VisuMZ['ConvertParams'](_0x29bd8f,_0x29bd8f);const _0x11d3eb=Math[_0x2826ce(0x647)](_0x29bd8f[_0x2826ce(0x3bd)])[_0x2826ce(0x739)](0x32,0x96),_0x44a775=AudioManager['_currentBgs'];_0x44a775&&(_0x44a775[_0x2826ce(0x3bd)]=_0x11d3eb,_0x44a775[_0x2826ce(0x160)]=AudioManager[_0x2826ce(0x149)][_0x2826ce(0x239)](),AudioManager[_0x2826ce(0x790)](_0x44a775),AudioManager[_0x2826ce(0x188)](_0x44a775,_0x44a775['pos']),AudioManager[_0x2826ce(0x149)][_0x2826ce(0x36e)](_0x44a775[_0x2826ce(0x160)]));}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x29d),_0x4641a4=>{const _0x1d6df2=_0x555f1c;VisuMZ[_0x1d6df2(0x3ed)](_0x4641a4,_0x4641a4);const _0x1f65c5=Math[_0x1d6df2(0x647)](_0x4641a4[_0x1d6df2(0x520)])[_0x1d6df2(0x739)](-0x64,0x64),_0x19edc1=AudioManager['_currentBgs'];_0x19edc1&&(_0x19edc1['pan']=_0x1f65c5,_0x19edc1[_0x1d6df2(0x160)]=AudioManager['_bgsBuffer'][_0x1d6df2(0x239)](),AudioManager[_0x1d6df2(0x790)](_0x19edc1),AudioManager[_0x1d6df2(0x188)](_0x19edc1,_0x19edc1[_0x1d6df2(0x160)]),AudioManager['_bgsBuffer']['_startPlaying'](_0x19edc1[_0x1d6df2(0x160)]));}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x384),_0x47bdb5=>{const _0x5e9f64=_0x555f1c;if(!$gameTemp[_0x5e9f64(0x6d5)]())return;const _0x494d14=Input['getLastUsedGamepadType']();console[_0x5e9f64(0x4d7)](_0x494d14);}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],'ExportAllMapText',_0x3f6a8d=>{const _0x462131=_0x555f1c;if(!$gameTemp[_0x462131(0x6d5)]())return;if(!Utils[_0x462131(0x6a1)]())return;SceneManager[_0x462131(0x7b9)]['_active']=![],VisuMZ['CoreEngine'][_0x462131(0x1ba)]();}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],'ExportAllTroopText',_0x5b4fc4=>{const _0x1087a1=_0x555f1c;if(!$gameTemp[_0x1087a1(0x6d5)]())return;if(!Utils[_0x1087a1(0x6a1)]())return;SceneManager['_scene'][_0x1087a1(0x25c)]=![],VisuMZ[_0x1087a1(0x5c5)][_0x1087a1(0x611)]();}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x699),_0x1d6d72=>{const _0x2d6544=_0x555f1c;if(!$gameTemp[_0x2d6544(0x6d5)]())return;if(!Utils[_0x2d6544(0x6a1)]())return;if(!$gameMap)return;if($gameMap[_0x2d6544(0x400)]()<=0x0)return;VisuMZ['ConvertParams'](_0x1d6d72,_0x1d6d72);const _0xcf942f=_0x2d6544(0x11a)[_0x2d6544(0x39f)]($gameMap[_0x2d6544(0x400)]()['padZero'](0x3)),_0x287209=VisuMZ['CoreEngine'][_0x2d6544(0x4bb)]($gameMap['mapId']());VisuMZ[_0x2d6544(0x5c5)][_0x2d6544(0x2c3)](_0x287209,_0xcf942f,!![]);}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],'ExportCurTroopText',_0x1b9630=>{const _0x5dc090=_0x555f1c;if(!$gameTemp[_0x5dc090(0x6d5)]())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x5dc090(0x827)]())return;VisuMZ['ConvertParams'](_0x1b9630,_0x1b9630);const _0x4d30a4=_0x5dc090(0x338)['format']($gameTroop['_troopId'][_0x5dc090(0x632)](0x4)),_0x10aca1=VisuMZ[_0x5dc090(0x5c5)][_0x5dc090(0x7a5)]($gameTroop[_0x5dc090(0x385)]);VisuMZ['CoreEngine']['ExportString'](_0x10aca1,_0x4d30a4,!![]);}),VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x2c3)]=function(_0x1fadea,_0x26acf6,_0xe70891){const _0x4ae573=_0x555f1c,_0x565f97=require('fs');let _0x2e7cd3=_0x4ae573(0x65a)[_0x4ae573(0x39f)](_0x26acf6||'0');_0x565f97[_0x4ae573(0x54c)](_0x2e7cd3,_0x1fadea,_0x2a604e=>{const _0x23eb50=_0x4ae573;if(_0x2a604e)throw err;else _0xe70891&&alert(_0x23eb50(0x383)[_0x23eb50(0x39f)](_0x2e7cd3));});},VisuMZ['CoreEngine'][_0x555f1c(0x1ba)]=function(){const _0x3d5000=_0x555f1c,_0x279ebf=[];for(const _0x1e82a3 of $dataMapInfos){if(!_0x1e82a3)continue;_0x279ebf['push'](_0x1e82a3['id']);}const _0x267400=_0x279ebf['length']*0x64+Math['randomInt'](0x64);alert(_0x3d5000(0x561)[_0x3d5000(0x39f)](_0x267400)),this[_0x3d5000(0x5d9)]=[],this[_0x3d5000(0x190)]=$dataMap;for(const _0xb8cfe0 of _0x279ebf){VisuMZ[_0x3d5000(0x5c5)]['loadMapData'](_0xb8cfe0);}setTimeout(VisuMZ[_0x3d5000(0x5c5)][_0x3d5000(0x851)][_0x3d5000(0x41d)](this),_0x267400);},VisuMZ['CoreEngine'][_0x555f1c(0x1cc)]=function(_0x3c54f8){const _0x47a881=_0x555f1c,_0x2b73b4=_0x47a881(0x13d)[_0x47a881(0x39f)](_0x3c54f8[_0x47a881(0x632)](0x3)),_0x59f353=new XMLHttpRequest(),_0x3fd441=_0x47a881(0x697)+_0x2b73b4;_0x59f353[_0x47a881(0x81b)]('GET',_0x3fd441),_0x59f353[_0x47a881(0x34e)](_0x47a881(0x2d7)),_0x59f353[_0x47a881(0x496)]=()=>this[_0x47a881(0x1c9)](_0x59f353,_0x3c54f8,_0x2b73b4,_0x3fd441),_0x59f353[_0x47a881(0x1db)]=()=>DataManager['onXhrError']('$dataMap',_0x2b73b4,_0x3fd441),_0x59f353[_0x47a881(0x1a1)]();},VisuMZ[_0x555f1c(0x5c5)]['storeMapData']=function(_0x2e8ebf,_0x1d1928,_0x143429,_0x35b223){const _0x535834=_0x555f1c;$dataMap=JSON[_0x535834(0x8e8)](_0x2e8ebf['responseText']),DataManager['onLoad']($dataMap),this[_0x535834(0x5d9)][_0x1d1928]=VisuMZ[_0x535834(0x5c5)][_0x535834(0x4bb)](_0x1d1928),$dataMap=this[_0x535834(0x190)];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x851)]=function(){const _0x392ce1=_0x555f1c,_0x51feb7=_0x392ce1(0x514);this[_0x392ce1(0x5d9)][_0x392ce1(0x24a)](undefined)[_0x392ce1(0x24a)]('')[_0x392ce1(0x24a)](null);const _0x4e3080=this[_0x392ce1(0x5d9)][_0x392ce1(0x606)]('\x0a\x0a\x0a\x0a\x0a')[_0x392ce1(0x26b)]();VisuMZ[_0x392ce1(0x5c5)][_0x392ce1(0x2c3)](_0x4e3080,_0x51feb7,!![]),SceneManager[_0x392ce1(0x7b9)][_0x392ce1(0x25c)]=!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4bb)]=function(_0x43ea30){const _0x3a2cbd=_0x555f1c;if(!$dataMap)return'';let _0x4728a4='█'[_0x3a2cbd(0x347)](0x46)+'\x0a\x0a',_0x4ecee7='═'[_0x3a2cbd(0x347)](0x46)+'\x0a\x0a',_0x10352a='';this[_0x3a2cbd(0x118)]=0x0;for(const _0x958a63 of $dataMap['events']){if(!_0x958a63)continue;let _0x476ff4=_0x958a63['id'],_0x34a83a=_0x958a63[_0x3a2cbd(0x381)],_0xbf6dd2=_0x958a63[_0x3a2cbd(0x4fe)];for(const _0x3bb84f of _0xbf6dd2){const _0x534db2=_0xbf6dd2[_0x3a2cbd(0x5e5)](_0x3bb84f)+0x1;let _0x81b69c=_0x4ecee7+_0x3a2cbd(0x677),_0xdc069b=VisuMZ[_0x3a2cbd(0x5c5)]['ExtractStrFromList'](_0x3bb84f[_0x3a2cbd(0x57c)]);if(_0xdc069b['length']>0x0){if(_0x10352a['length']>0x0)_0x10352a+=_0x4ecee7+_0x3a2cbd(0x5ca);else{const _0x48e466=$dataMapInfos[_0x43ea30][_0x3a2cbd(0x381)];_0x10352a+=_0x4728a4+_0x3a2cbd(0x6dc)[_0x3a2cbd(0x39f)](_0x43ea30,_0x48e466||_0x3a2cbd(0x35b))+_0x4728a4;}_0x10352a+=_0x81b69c['format'](_0x476ff4,_0x34a83a,_0x534db2,_0xdc069b);}}}return _0x10352a[_0x3a2cbd(0x6d6)]>0x0&&(_0x10352a+=_0x4ecee7),_0x10352a;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x611)]=function(){const _0x1a0f45=_0x555f1c,_0x4de0fe=$dataTroops['length']*0xa+Math[_0x1a0f45(0x83e)](0xa);alert(_0x1a0f45(0x6f7)[_0x1a0f45(0x39f)](_0x4de0fe));const _0x2b0107=[];for(const _0x5c2511 of $dataTroops){if(!_0x5c2511)continue;const _0xd3fbf9=_0x5c2511['id'];_0x2b0107[_0xd3fbf9]=VisuMZ[_0x1a0f45(0x5c5)][_0x1a0f45(0x7a5)](_0xd3fbf9);}setTimeout(VisuMZ[_0x1a0f45(0x5c5)]['exportAllTroopStrings'][_0x1a0f45(0x41d)](this,_0x2b0107),_0x4de0fe);},VisuMZ[_0x555f1c(0x5c5)]['ExtractStrFromTroop']=function(_0x18276a){const _0x3746fb=_0x555f1c;if(!$dataTroops[_0x18276a])return'';let _0x5cd6e2='█'['repeat'](0x46)+'\x0a\x0a',_0x6d8455='═'[_0x3746fb(0x347)](0x46)+'\x0a\x0a',_0x3e6a4f='';this[_0x3746fb(0x118)]=0x0;const _0x246123=$dataTroops[_0x18276a];let _0x3b67ad=_0x246123[_0x3746fb(0x4fe)];for(const _0x31d7b5 of _0x3b67ad){const _0x286020=_0x3b67ad[_0x3746fb(0x5e5)](_0x31d7b5)+0x1;let _0x4d9323=_0x6d8455+_0x3746fb(0x344),_0x165b8d=VisuMZ[_0x3746fb(0x5c5)]['ExtractStrFromList'](_0x31d7b5[_0x3746fb(0x57c)]);_0x165b8d[_0x3746fb(0x6d6)]>0x0&&(_0x3e6a4f[_0x3746fb(0x6d6)]>0x0?_0x3e6a4f+=_0x6d8455+'\x0a\x0a\x0a\x0a\x0a':_0x3e6a4f+=_0x5cd6e2+_0x3746fb(0x546)[_0x3746fb(0x39f)](_0x18276a,_0x246123[_0x3746fb(0x381)]||_0x3746fb(0x35b))+_0x5cd6e2,_0x3e6a4f+=_0x4d9323[_0x3746fb(0x39f)](_0x286020,_0x165b8d));}return _0x3e6a4f[_0x3746fb(0x6d6)]>0x0&&(_0x3e6a4f+=_0x6d8455),_0x3e6a4f;},VisuMZ['CoreEngine'][_0x555f1c(0x8a8)]=function(_0x178297){const _0xa643ad=_0x555f1c,_0x222e34=_0xa643ad(0x26a);_0x178297[_0xa643ad(0x24a)](undefined)['remove']('')[_0xa643ad(0x24a)](null);const _0x129ba4=_0x178297[_0xa643ad(0x606)](_0xa643ad(0x5ca))[_0xa643ad(0x26b)]();VisuMZ['CoreEngine'][_0xa643ad(0x2c3)](_0x129ba4,_0x222e34,!![]),SceneManager[_0xa643ad(0x7b9)]['_active']=!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x60d)]=function(_0x16a26d){const _0x504a26=_0x555f1c;let _0xc043dc='\x0a'+'─'[_0x504a26(0x347)](0x46)+'\x0a',_0x3e2732='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x2cf41b='';for(const _0x19ff9b of _0x16a26d){if(!_0x19ff9b)continue;if(_0x19ff9b[_0x504a26(0x898)]===0x65)_0x2cf41b+=_0xc043dc+'\x0a',_0x2cf41b+='〘Show\x20Text〙\x0a',_0x19ff9b['parameters'][0x4]!==''&&_0x19ff9b[_0x504a26(0x556)][0x4]!==undefined&&(_0x2cf41b+=_0x504a26(0x7c1)['format'](_0x19ff9b[_0x504a26(0x556)][0x4]));else{if(_0x19ff9b['code']===0x191)_0x2cf41b+=_0x504a26(0x5e6)[_0x504a26(0x39f)](_0x19ff9b[_0x504a26(0x556)][0x0]);else{if(_0x19ff9b[_0x504a26(0x898)]===0x192)_0x2cf41b+=_0xc043dc,_0x2cf41b+=_0x504a26(0x473)[_0x504a26(0x39f)](_0x3e2732,_0x19ff9b[_0x504a26(0x556)][0x0]+0x1,_0x19ff9b['parameters'][0x1]);else{if(_0x19ff9b[_0x504a26(0x898)]===0x193)_0x2cf41b+=_0xc043dc,_0x2cf41b+=_0x504a26(0x297)[_0x504a26(0x39f)](_0x3e2732);else{if(_0x19ff9b[_0x504a26(0x898)]===0x194)_0x2cf41b+=_0xc043dc,_0x2cf41b+=_0x504a26(0x6b4)[_0x504a26(0x39f)](_0x3e2732);else{if(_0x19ff9b[_0x504a26(0x898)]===0x69)_0x2cf41b+=_0xc043dc+'\x0a',_0x2cf41b+=_0x504a26(0x7f7);else{if(_0x19ff9b['code']===0x6c)_0x2cf41b+=_0xc043dc+'\x0a',_0x2cf41b+=_0x504a26(0x7d3)[_0x504a26(0x39f)](_0x19ff9b[_0x504a26(0x556)][0x0]);else{if(_0x19ff9b['code']===0x198)_0x2cf41b+=_0x504a26(0x5e6)[_0x504a26(0x39f)](_0x19ff9b[_0x504a26(0x556)][0x0]);else{if(_0x19ff9b[_0x504a26(0x898)]===0x75){const _0x1eef51=$dataCommonEvents[_0x19ff9b[_0x504a26(0x556)][0x0]];if(_0x1eef51&&this[_0x504a26(0x118)]<=0xa){this[_0x504a26(0x118)]++;let _0x187540=VisuMZ[_0x504a26(0x5c5)][_0x504a26(0x60d)](_0x1eef51[_0x504a26(0x57c)]);_0x187540['length']>0x0&&(_0x2cf41b+=_0xc043dc,_0x2cf41b+=_0x3e2732,_0x2cf41b+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x504a26(0x39f)](_0x1eef51['id'],_0x1eef51['name']),_0x2cf41b+=_0x3e2732,_0x2cf41b+=_0x187540,_0x2cf41b+=_0x3e2732,_0x2cf41b+=_0x504a26(0x1e6)['format'](_0x1eef51['id'],_0x1eef51[_0x504a26(0x381)]),_0x2cf41b+=_0x3e2732),this[_0x504a26(0x118)]--;}}}}}}}}}}}return _0x2cf41b['length']>0x0&&(_0x2cf41b+=_0xc043dc),_0x2cf41b;},PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x2f4),_0x2a5f00=>{const _0x48a648=_0x555f1c;VisuMZ[_0x48a648(0x3ed)](_0x2a5f00,_0x2a5f00);const _0x295580=_0x2a5f00[_0x48a648(0x3eb)];VisuMZ[_0x48a648(0x49e)](_0x295580);}),PluginManager['registerCommand'](pluginData['name'],_0x555f1c(0x6f0),_0x10e333=>{const _0x36b3b9=_0x555f1c;VisuMZ[_0x36b3b9(0x3ed)](_0x10e333,_0x10e333);const _0x3db7f=_0x10e333[_0x36b3b9(0x7ee)]||0x0;$gameParty['gainGold'](_0x3db7f);}),PluginManager['registerCommand'](pluginData[_0x555f1c(0x381)],_0x555f1c(0x2db),_0x2a0a75=>{const _0x6bcf4d=_0x555f1c;if(!SceneManager[_0x6bcf4d(0x85d)]())return;VisuMZ[_0x6bcf4d(0x3ed)](_0x2a0a75,_0x2a0a75);const _0x101760=_0x2a0a75[_0x6bcf4d(0x348)];SceneManager[_0x6bcf4d(0x7b9)][_0x6bcf4d(0x225)](_0x101760);}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],_0x555f1c(0x13b),_0x7957e=>{const _0x568769=_0x555f1c;if(!$gameTemp[_0x568769(0x6d5)]())return;if(!Utils[_0x568769(0x6a1)]())return;VisuMZ[_0x568769(0x3ed)](_0x7957e,_0x7957e);const _0x550b81=_0x7957e[_0x568769(0x54d)]||0x1;$gameTemp[_0x568769(0x15a)]=_0x550b81;}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x44a),_0x4de644=>{const _0x35f45b=_0x555f1c;VisuMZ[_0x35f45b(0x3ed)](_0x4de644,_0x4de644);const _0x4d3a9b=_0x4de644[_0x35f45b(0x7f8)]||0x1,_0x2e340e=_0x4de644[_0x35f45b(0x7ae)]||_0x35f45b(0x82d),_0x301201=$gameScreen[_0x35f45b(0x7ca)](_0x4d3a9b);_0x301201&&_0x301201[_0x35f45b(0x28d)](_0x2e340e);}),PluginManager['registerCommand'](pluginData['name'],'PictureEraseAll',_0x5db861=>{const _0x282715=_0x555f1c;for(let _0x44b474=0x1;_0x44b474<=$gameScreen['maxPictures']();_0x44b474++){$gameScreen[_0x282715(0x5f1)](_0x44b474);}}),PluginManager['registerCommand'](pluginData['name'],_0x555f1c(0x39d),_0x15749d=>{const _0x362d1e=_0x555f1c;VisuMZ[_0x362d1e(0x3ed)](_0x15749d,_0x15749d);const _0x32bd4c=Math['min'](_0x15749d[_0x362d1e(0x482)],_0x15749d[_0x362d1e(0xf0)]),_0x15bf19=Math[_0x362d1e(0x4d6)](_0x15749d['StartID'],_0x15749d[_0x362d1e(0xf0)]);for(let _0x5863a5=_0x32bd4c;_0x5863a5<=_0x15bf19;_0x5863a5++){$gameScreen[_0x362d1e(0x5f1)](_0x5863a5);}}),PluginManager['registerCommand'](pluginData['name'],_0x555f1c(0x5fb),_0xad3b44=>{const _0x1e27f8=_0x555f1c;VisuMZ[_0x1e27f8(0x3ed)](_0xad3b44,_0xad3b44);const _0x3a5483=Math[_0x1e27f8(0x647)](_0xad3b44['PictureID'])[_0x1e27f8(0x739)](0x1,0x64),_0x4022e0=-Number(_0xad3b44['AdjustAngle']||0x0),_0x177b5e=Math['max'](_0xad3b44['Duration']||0x0,0x0),_0x1e4e41=_0xad3b44[_0x1e27f8(0x7ae)]||_0x1e27f8(0x82d),_0x1198f4=_0xad3b44[_0x1e27f8(0x58b)],_0x37561f=$gameScreen['picture'](_0x3a5483);if(!_0x37561f)return;_0x37561f[_0x1e27f8(0x214)](_0x4022e0,_0x177b5e,_0x1e4e41);if(_0x1198f4){const _0x3f13cc=$gameTemp[_0x1e27f8(0x8d1)]();if(_0x3f13cc)_0x3f13cc['wait'](_0x177b5e);}}),PluginManager['registerCommand'](pluginData[_0x555f1c(0x381)],_0x555f1c(0x404),_0x2529dd=>{const _0x3f83ae=_0x555f1c;VisuMZ[_0x3f83ae(0x3ed)](_0x2529dd,_0x2529dd);const _0x54f08d=Math[_0x3f83ae(0x647)](_0x2529dd[_0x3f83ae(0x54d)])[_0x3f83ae(0x739)](0x1,0x64),_0x5a37a3=-Number(_0x2529dd['TargetAngle']||0x0),_0x27c7c7=Math[_0x3f83ae(0x4d6)](_0x2529dd[_0x3f83ae(0x2c6)]||0x0,0x0),_0x365c2b=_0x2529dd[_0x3f83ae(0x7ae)]||_0x3f83ae(0x82d),_0x580431=_0x2529dd[_0x3f83ae(0x58b)],_0x17b7e8=$gameScreen[_0x3f83ae(0x7ca)](_0x54f08d);if(!_0x17b7e8)return;_0x17b7e8[_0x3f83ae(0x2f2)](_0x5a37a3,_0x27c7c7,_0x365c2b);if(_0x580431){const _0x200739=$gameTemp[_0x3f83ae(0x8d1)]();if(_0x200739)_0x200739[_0x3f83ae(0x7dc)](_0x27c7c7);}}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x515),_0x52f7e6=>{const _0x488419=_0x555f1c;VisuMZ[_0x488419(0x3ed)](_0x52f7e6,_0x52f7e6);const _0x15002b=Math['round'](_0x52f7e6[_0x488419(0x54d)])[_0x488419(0x739)](0x1,0x64),_0x17a189=_0x52f7e6[_0x488419(0x51b)],_0x3754f4=_0x17a189[_0x488419(0x3c0)]['clamp'](0x0,0x1),_0x5b3dfd=Math['round'](_0x17a189[_0x488419(0x4a9)]||0x0),_0x1aae83=Math['round'](_0x17a189[_0x488419(0x472)]||0x0),_0x36ae93=Math['round'](_0x17a189[_0x488419(0x5b0)]||0x0),_0x17b444=Math[_0x488419(0x647)](_0x17a189[_0x488419(0x358)]||0x0),_0x1c8391=Math['round'](_0x17a189['Opacity'])[_0x488419(0x739)](0x0,0xff),_0x4205de=_0x17a189[_0x488419(0x68f)],_0x1c8ad7=_0x488419(0x86e),_0x237292=_0x52f7e6[_0x488419(0x545)]?_0x488419(0x545):_0x488419(0x2ab),_0xd1d460=_0x1c8ad7['format'](_0x52f7e6[_0x488419(0x3e0)],_0x237292);$gameScreen[_0x488419(0x3a8)](_0x15002b,_0xd1d460,_0x3754f4,_0x5b3dfd,_0x1aae83,_0x36ae93,_0x17b444,_0x1c8391,_0x4205de);}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x491),_0x4e55a8=>{const _0x2d8fe5=_0x555f1c;VisuMZ[_0x2d8fe5(0x3ed)](_0x4e55a8,_0x4e55a8);const _0x5e2558=_0x4e55a8[_0x2d8fe5(0x86f)]||'random',_0x55bde0=_0x4e55a8['Power'][_0x2d8fe5(0x739)](0x1,0x9),_0xa5454d=_0x4e55a8['Speed'][_0x2d8fe5(0x739)](0x1,0x9),_0x49bd35=_0x4e55a8[_0x2d8fe5(0x2c6)]||0x1,_0x14b595=_0x4e55a8[_0x2d8fe5(0x58b)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x5e2558),$gameScreen[_0x2d8fe5(0x876)](_0x55bde0,_0xa5454d,_0x49bd35);if(_0x14b595){const _0x1a9e02=$gameTemp[_0x2d8fe5(0x8d1)]();if(_0x1a9e02)_0x1a9e02['wait'](_0x49bd35);}}),PluginManager['registerCommand'](pluginData[_0x555f1c(0x381)],'SwitchRandomizeOne',_0x115e4f=>{const _0x5d1333=_0x555f1c;if($gameParty[_0x5d1333(0x827)]())return;VisuMZ[_0x5d1333(0x3ed)](_0x115e4f,_0x115e4f);const _0x5a9940=_0x115e4f[_0x5d1333(0x8ea)],_0x1e077b=(_0x115e4f['Chance']||0x0)/0x64;for(const _0x5a146f of _0x5a9940){const _0x367125=Math[_0x5d1333(0x1b4)]()<=_0x1e077b;$gameSwitches[_0x5d1333(0x2d6)](_0x5a146f,_0x367125);}}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x77d),_0x195c5f=>{const _0x4655e8=_0x555f1c;if($gameParty['inBattle']())return;VisuMZ[_0x4655e8(0x3ed)](_0x195c5f,_0x195c5f);const _0x44e639=Math[_0x4655e8(0x174)](_0x195c5f[_0x4655e8(0x482)],_0x195c5f[_0x4655e8(0xf0)]),_0x3c9617=Math['max'](_0x195c5f[_0x4655e8(0x482)],_0x195c5f[_0x4655e8(0xf0)]),_0x1d9348=(_0x195c5f[_0x4655e8(0x76d)]||0x0)/0x64;for(let _0x38f8d9=_0x44e639;_0x38f8d9<=_0x3c9617;_0x38f8d9++){const _0x1173b2=Math[_0x4655e8(0x1b4)]()<=_0x1d9348;$gameSwitches[_0x4655e8(0x2d6)](_0x38f8d9,_0x1173b2);}}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x65f),_0x39677a=>{const _0x39d4ca=_0x555f1c;if($gameParty[_0x39d4ca(0x827)]())return;VisuMZ[_0x39d4ca(0x3ed)](_0x39677a,_0x39677a);const _0x37cea2=_0x39677a[_0x39d4ca(0x8ea)];for(const _0x22ce75 of _0x37cea2){const _0x5bb126=$gameSwitches['value'](_0x22ce75);$gameSwitches[_0x39d4ca(0x2d6)](_0x22ce75,!_0x5bb126);}}),PluginManager['registerCommand'](pluginData['name'],_0x555f1c(0x53d),_0xfdf609=>{const _0x161753=_0x555f1c;if($gameParty[_0x161753(0x827)]())return;VisuMZ[_0x161753(0x3ed)](_0xfdf609,_0xfdf609);const _0x31a4a8=Math['min'](_0xfdf609['StartID'],_0xfdf609['EndingID']),_0x791ef3=Math[_0x161753(0x4d6)](_0xfdf609['StartID'],_0xfdf609['EndingID']);for(let _0x2bd433=_0x31a4a8;_0x2bd433<=_0x791ef3;_0x2bd433++){const _0x118b9d=$gameSwitches[_0x161753(0x7ee)](_0x2bd433);$gameSwitches[_0x161753(0x2d6)](_0x2bd433,!_0x118b9d);}}),PluginManager['registerCommand'](pluginData[_0x555f1c(0x381)],'SystemSetFontSize',_0x32a161=>{const _0x2e4932=_0x555f1c;VisuMZ[_0x2e4932(0x3ed)](_0x32a161,_0x32a161);const _0x229122=_0x32a161[_0x2e4932(0x38b)]||0x1;$gameSystem[_0x2e4932(0x12b)](_0x229122);}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],_0x555f1c(0x8e6),_0x390912=>{const _0x5cf9ba=_0x555f1c;if($gameParty[_0x5cf9ba(0x827)]())return;VisuMZ[_0x5cf9ba(0x3ed)](_0x390912,_0x390912);const _0x28a4b1=_0x390912[_0x5cf9ba(0x38b)];if(_0x28a4b1[_0x5cf9ba(0x3b6)](/Front/i))$gameSystem[_0x5cf9ba(0x54a)](![]);else _0x28a4b1['match'](/Side/i)?$gameSystem[_0x5cf9ba(0x54a)](!![]):$gameSystem['setSideView'](!$gameSystem[_0x5cf9ba(0x558)]());}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x62e),_0x22a242=>{const _0x32eda2=_0x555f1c;if($gameParty[_0x32eda2(0x827)]())return;VisuMZ['ConvertParams'](_0x22a242,_0x22a242);const _0x25303e=[_0x32eda2(0x164),_0x32eda2(0x6db),'me','se'];for(const _0x4ad6f4 of _0x25303e){const _0x435c3d=_0x22a242[_0x4ad6f4],_0x45a41f=_0x32eda2(0x179)[_0x32eda2(0x39f)](_0x4ad6f4);for(const _0xadd174 of _0x435c3d){AudioManager[_0x32eda2(0x566)](_0x45a41f,_0xadd174);}}}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x567),_0x565682=>{const _0x5bdc30=_0x555f1c;if($gameParty[_0x5bdc30(0x827)]())return;VisuMZ['ConvertParams'](_0x565682,_0x565682);const _0x1a1549=['animations',_0x5bdc30(0x1a2),_0x5bdc30(0x844),_0x5bdc30(0x4a1),_0x5bdc30(0x704),_0x5bdc30(0x70c),_0x5bdc30(0x5b5),_0x5bdc30(0x644),'sv_actors',_0x5bdc30(0x79d),_0x5bdc30(0x882),_0x5bdc30(0x183),_0x5bdc30(0x1f6),'titles2'];for(const _0x5af487 of _0x1a1549){const _0x4cf0fe=_0x565682[_0x5af487],_0x4cd2e2=_0x5bdc30(0x116)[_0x5bdc30(0x39f)](_0x5af487);for(const _0x522e75 of _0x4cf0fe){ImageManager[_0x5bdc30(0x713)](_0x4cd2e2,_0x522e75);}}}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],'SystemSetBattleSystem',_0x26cf1b=>{const _0x2f2683=_0x555f1c;if($gameParty['inBattle']())return;VisuMZ[_0x2f2683(0x3ed)](_0x26cf1b,_0x26cf1b);const _0x5e8e52=_0x26cf1b['option'][_0x2f2683(0x48a)]()[_0x2f2683(0x26b)](),_0x339efd=VisuMZ[_0x2f2683(0x5c5)][_0x2f2683(0x705)](_0x5e8e52);$gameSystem[_0x2f2683(0x3bc)](_0x339efd);}),VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x705)]=function(_0x3c58b6){const _0x49b9e3=_0x555f1c;_0x3c58b6=_0x3c58b6||_0x49b9e3(0x336),_0x3c58b6=String(_0x3c58b6)[_0x49b9e3(0x48a)]()[_0x49b9e3(0x26b)]();switch(_0x3c58b6){case _0x49b9e3(0x74f):return 0x0;case _0x49b9e3(0x11f):Imported[_0x49b9e3(0x145)]&&(ConfigManager[_0x49b9e3(0x1be)]=!![]);return 0x1;case'TPB\x20WAIT':Imported[_0x49b9e3(0x145)]&&(ConfigManager[_0x49b9e3(0x1be)]=![]);return 0x2;case'CTB':if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x49b9e3(0x3d5);break;case _0x49b9e3(0x5cc):if(Imported[_0x49b9e3(0x2ea)])return _0x49b9e3(0x5cc);break;case'BTB':if(Imported[_0x49b9e3(0x623)])return'BTB';break;case _0x49b9e3(0x487):if(Imported[_0x49b9e3(0x302)])return _0x49b9e3(0x487);break;case _0x49b9e3(0x133):if(Imported[_0x49b9e3(0x5bf)])return _0x49b9e3(0x133);break;case'ETB':if(Imported[_0x49b9e3(0x6e9)])return _0x49b9e3(0x1c6);break;case _0x49b9e3(0x6ca):if(Imported['VisuMZ_2_BattleSystemPTB'])return'PTB';break;}return $dataSystem[_0x49b9e3(0x266)];},PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x580),_0x5ab183=>{const _0x2cd12c=_0x555f1c;VisuMZ[_0x2cd12c(0x3ed)](_0x5ab183,_0x5ab183);const _0x147a85=_0x5ab183[_0x2cd12c(0x38b)]||0x1;$gameSystem[_0x2cd12c(0x501)](_0x147a85);}),PluginManager[_0x555f1c(0x28a)](pluginData['name'],_0x555f1c(0x47f),_0xabfd63=>{const _0x85c0e5=_0x555f1c;VisuMZ[_0x85c0e5(0x3ed)](_0xabfd63,_0xabfd63);const _0x526766=_0xabfd63[_0x85c0e5(0x620)]||'';$textPopup(_0x526766);}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],_0x555f1c(0x3ae),_0xbcf49a=>{const _0x368694=_0x555f1c;VisuMZ['ConvertParams'](_0xbcf49a,_0xbcf49a);const _0x4000fb=_0xbcf49a['id']||0x1,_0x556f71=_0xbcf49a[_0x368694(0xf4)],_0x428a16=_0xbcf49a['operand']||0x0;let _0x539fad=$gameVariables[_0x368694(0x7ee)](_0x4000fb)||0x0;switch(_0x556f71){case'=':_0x539fad=_0x428a16;break;case'+':_0x539fad+=_0x428a16;break;case'-':_0x539fad-=_0x428a16;break;case'*':_0x539fad*=_0x428a16;break;case'/':_0x539fad/=_0x428a16;break;case'%':_0x539fad%=_0x428a16;break;}_0x539fad=_0x539fad||0x0,$gameVariables[_0x368694(0x2d6)](_0x4000fb,_0x539fad);}),PluginManager[_0x555f1c(0x28a)](pluginData[_0x555f1c(0x381)],'VariableJsBlock',_0x27ebac=>{const _0x26c611=_0x555f1c;VisuMZ['ConvertParams'](_0x27ebac,_0x27ebac);const _0x20102c=_0x27ebac['id']()||0x1,_0xc86747=_0x27ebac['operation'],_0x3bdc93=_0x27ebac['operand']()||0x0;let _0x31aba4=$gameVariables['value'](_0x20102c)||0x0;switch(_0xc86747){case'=':_0x31aba4=_0x3bdc93;break;case'+':_0x31aba4+=_0x3bdc93;break;case'-':_0x31aba4-=_0x3bdc93;break;case'*':_0x31aba4*=_0x3bdc93;break;case'/':_0x31aba4/=_0x3bdc93;break;case'%':_0x31aba4%=_0x3bdc93;break;}_0x31aba4=_0x31aba4||0x0,$gameVariables[_0x26c611(0x2d6)](_0x20102c,_0x31aba4);}),VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3c9)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x555f1c(0x54e)]['onDatabaseLoaded']=function(){const _0xb92e34=_0x555f1c;VisuMZ[_0xb92e34(0x5c5)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0xb92e34(0x45d)](),this['process_VisuMZ_CoreEngine_Notetags'](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0xb92e34(0x5ff)](),this[_0xb92e34(0x5b1)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ[_0xb92e34(0x1b9)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x23a)]={},Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x45d)]=function(){const _0x5c9e2e=_0x555f1c,_0x21e0de=[_0x5c9e2e(0x711),_0x5c9e2e(0x853),_0x5c9e2e(0x31b),'DEF',_0x5c9e2e(0x256),'MDF',_0x5c9e2e(0x1e2),_0x5c9e2e(0x8e9)],_0x427b4f=[_0x5c9e2e(0x4cd),_0x5c9e2e(0x18f),'CRI',_0x5c9e2e(0x7ce),_0x5c9e2e(0x36a),'MRF',_0x5c9e2e(0x554),_0x5c9e2e(0x115),_0x5c9e2e(0x80c),_0x5c9e2e(0x39a)],_0x34e6a3=[_0x5c9e2e(0x505),'GRD',_0x5c9e2e(0x1e4),'PHA',_0x5c9e2e(0x6e7),_0x5c9e2e(0x434),_0x5c9e2e(0x4a2),'MDR','FDR',_0x5c9e2e(0x4f0)],_0x3a2333=[_0x21e0de,_0x427b4f,_0x34e6a3],_0x5564e2=[_0x5c9e2e(0x838),_0x5c9e2e(0x589),'Plus2','Max',_0x5c9e2e(0x857),_0x5c9e2e(0x601),_0x5c9e2e(0x88c),_0x5c9e2e(0x8a7),_0x5c9e2e(0x1cd),_0x5c9e2e(0x593)];for(const _0x50f29f of _0x3a2333){let _0x59414e='';if(_0x50f29f===_0x21e0de)_0x59414e='param';if(_0x50f29f===_0x427b4f)_0x59414e=_0x5c9e2e(0x65c);if(_0x50f29f===_0x34e6a3)_0x59414e=_0x5c9e2e(0x317);for(const _0x117722 of _0x5564e2){let _0x5aecd7='%1%2'[_0x5c9e2e(0x39f)](_0x59414e,_0x117722);VisuMZ[_0x5c9e2e(0x5c5)][_0x5c9e2e(0x23a)][_0x5aecd7]=[],VisuMZ['CoreEngine']['RegExp'][_0x5aecd7+'JS']=[];let _0x225e64='<%1\x20%2:[\x20]';if(['Plus',_0x5c9e2e(0x8a7)][_0x5c9e2e(0x484)](_0x117722))_0x225e64+=_0x5c9e2e(0x82b);else{if([_0x5c9e2e(0x589),_0x5c9e2e(0x1cd)][_0x5c9e2e(0x484)](_0x117722))_0x225e64+=_0x5c9e2e(0x436);else{if(['Plus2',_0x5c9e2e(0x593)][_0x5c9e2e(0x484)](_0x117722))_0x225e64+=_0x5c9e2e(0x53f);else{if(_0x117722===_0x5c9e2e(0x156))_0x225e64+=_0x5c9e2e(0x7b2);else{if(_0x117722===_0x5c9e2e(0x601))_0x225e64+=_0x5c9e2e(0x144);else _0x117722==='Rate2'&&(_0x225e64+=_0x5c9e2e(0x295));}}}}for(const _0x4f74c8 of _0x50f29f){let _0x20e229=_0x117722['replace'](/[\d+]/g,'')[_0x5c9e2e(0x48a)]();const _0x1b386d=_0x225e64[_0x5c9e2e(0x39f)](_0x4f74c8,_0x20e229);VisuMZ[_0x5c9e2e(0x5c5)][_0x5c9e2e(0x23a)][_0x5aecd7]['push'](new RegExp(_0x1b386d,'i'));const _0x13daed=_0x5c9e2e(0x4ae)[_0x5c9e2e(0x39f)](_0x4f74c8,_0x20e229);VisuMZ[_0x5c9e2e(0x5c5)][_0x5c9e2e(0x23a)][_0x5aecd7+'JS'][_0x5c9e2e(0x45f)](new RegExp(_0x13daed,'i'));}}}},Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x57b)]=function(){const _0xb23cc5=_0x555f1c;if(VisuMZ[_0xb23cc5(0x1b9)])return;},Scene_Boot[_0x555f1c(0x54e)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x17313e=_0x555f1c,_0x2f7569=VisuMZ[_0x17313e(0x5c5)]['Settings'];_0x2f7569[_0x17313e(0x71c)][_0x17313e(0x59b)]&&VisuMZ['ShowDevTools'](!![]);_0x2f7569[_0x17313e(0x71c)][_0x17313e(0x430)]&&(Input[_0x17313e(0x123)][0x23]='end',Input[_0x17313e(0x123)][0x24]=_0x17313e(0x4d0));if(_0x2f7569[_0x17313e(0x879)]){const _0x14e966=_0x2f7569[_0x17313e(0x879)];_0x14e966['KeySHIFT']=_0x14e966['KeySHIFT']||_0x17313e(0x329),_0x14e966[_0x17313e(0x5d2)]=_0x14e966[_0x17313e(0x5d2)]||_0x17313e(0x37f);}_0x2f7569[_0x17313e(0x735)][_0x17313e(0x1ef)]&&(Input[_0x17313e(0x123)][0x57]='up',Input[_0x17313e(0x123)][0x41]=_0x17313e(0x32d),Input['keyMapper'][0x53]=_0x17313e(0x223),Input[_0x17313e(0x123)][0x44]=_0x17313e(0x2d9),Input[_0x17313e(0x123)][0x45]=_0x17313e(0x708)),_0x2f7569[_0x17313e(0x735)][_0x17313e(0x486)]&&(Input[_0x17313e(0x123)][0x52]='dashToggle'),_0x2f7569[_0x17313e(0x289)]['DisplayedParams']=_0x2f7569[_0x17313e(0x289)][_0x17313e(0x592)]['map'](_0x9fe2d4=>_0x9fe2d4[_0x17313e(0x48a)]()['trim']()),_0x2f7569[_0x17313e(0x289)][_0x17313e(0x1bf)]=_0x2f7569[_0x17313e(0x289)][_0x17313e(0x1bf)][_0x17313e(0x2b4)](_0x190774=>_0x190774['toUpperCase']()[_0x17313e(0x26b)]()),_0x2f7569['QoL']['ShiftR_Toggle']=_0x2f7569[_0x17313e(0x71c)][_0x17313e(0x5b3)]??!![],_0x2f7569['QoL']['ShiftT_Toggle']=_0x2f7569[_0x17313e(0x71c)][_0x17313e(0x78a)]??!![],_0x2f7569['ButtonAssist'][_0x17313e(0x2be)]&&VisuMZ[_0x17313e(0x5c5)][_0x17313e(0x5ee)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x5ee)]=function(){const _0x470a25=_0x555f1c;let _0x208b83=![],_0x1d2dee=![];for(let _0x13c39b in Input['keyMapper']){const _0x4c4e5d=Input[_0x470a25(0x123)][_0x13c39b];if(_0x4c4e5d===_0x470a25(0x445))_0x208b83=!![];if(_0x4c4e5d===_0x470a25(0x201))_0x1d2dee=!![];if(_0x208b83&&_0x1d2dee)return;}let _0x13fe5c=_0x470a25(0x89c);_0x13fe5c+=_0x470a25(0x643),_0x13fe5c+=_0x470a25(0x3ea),_0x13fe5c+=_0x470a25(0x38d),_0x13fe5c+=_0x470a25(0x4b1),alert(_0x13fe5c),SceneManager[_0x470a25(0x447)]();},Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x5ff)]=function(){const _0x403a85=_0x555f1c;this[_0x403a85(0x819)]();},Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x819)]=function(){const _0x2805f5=_0x555f1c,_0x5f4ccd=VisuMZ[_0x2805f5(0x5c5)]['Settings'][_0x2805f5(0x6ec)];for(const _0x80f969 of _0x5f4ccd){const _0x2480ff=_0x80f969[_0x2805f5(0x4a5)][_0x2805f5(0x38a)](/[ ]/g,''),_0x2aa500=_0x80f969[_0x2805f5(0x459)];VisuMZ[_0x2805f5(0x5c5)][_0x2805f5(0x151)](_0x2480ff,_0x2aa500);}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x151)]=function(_0x5e2c6e,_0x29a42e){const _0x4e575d=_0x555f1c;if(!!window[_0x5e2c6e]){if($gameTemp[_0x4e575d(0x6d5)]())console['log'](_0x4e575d(0x320)[_0x4e575d(0x39f)](_0x5e2c6e));}const _0x3517a9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'[_0x4e575d(0x39f)](_0x5e2c6e,_0x29a42e);window[_0x5e2c6e]=new Function(_0x3517a9);},Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x5b1)]=function(){const _0xfb6607=_0x555f1c,_0x44851d=VisuMZ[_0xfb6607(0x5c5)][_0xfb6607(0x51b)][_0xfb6607(0x380)];if(!_0x44851d)return;for(const _0x29cc2e of _0x44851d){if(!_0x29cc2e)continue;VisuMZ[_0xfb6607(0x5c5)][_0xfb6607(0x7ef)](_0x29cc2e);}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x667)]={},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x171)]={},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6b3)]={},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x396)]={},VisuMZ[_0x555f1c(0x5c5)]['createCustomParameter']=function(_0x4ffc5f){const _0x5d797c=_0x555f1c,_0x3bf5c6=_0x4ffc5f['Abbreviation'],_0x3c5805=_0x4ffc5f['ParamName'],_0x4a3f56=_0x4ffc5f[_0x5d797c(0x44d)],_0x56a11d=_0x4ffc5f[_0x5d797c(0x86f)],_0x59e093=new Function(_0x4ffc5f[_0x5d797c(0x826)]);VisuMZ['CoreEngine'][_0x5d797c(0x667)][_0x3bf5c6['toUpperCase']()['trim']()]=_0x3c5805,VisuMZ[_0x5d797c(0x5c5)][_0x5d797c(0x171)][_0x3bf5c6[_0x5d797c(0x48a)]()[_0x5d797c(0x26b)]()]=_0x4a3f56,VisuMZ[_0x5d797c(0x5c5)][_0x5d797c(0x6b3)][_0x3bf5c6[_0x5d797c(0x48a)]()[_0x5d797c(0x26b)]()]=_0x56a11d,VisuMZ['CoreEngine'][_0x5d797c(0x396)][_0x3bf5c6[_0x5d797c(0x48a)]()['trim']()]=_0x3bf5c6,Object[_0x5d797c(0x433)](Game_BattlerBase[_0x5d797c(0x54e)],_0x3bf5c6,{'get'(){const _0x334121=_0x5d797c,_0x80e65d=_0x59e093[_0x334121(0x2b0)](this);return _0x56a11d===_0x334121(0x8bd)?Math[_0x334121(0x647)](_0x80e65d):_0x80e65d;}});},VisuMZ['CoreEngine'][_0x555f1c(0x2b6)]={},VisuMZ[_0x555f1c(0x5c5)]['ControllerMatches']={},Scene_Boot[_0x555f1c(0x54e)]['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x32eeb1=_0x555f1c,_0x1303cf=VisuMZ[_0x32eeb1(0x5c5)]['Settings'][_0x32eeb1(0x2b6)];for(const _0x25033a of _0x1303cf){const _0x40aefb=(_0x25033a['Name']||'')[_0x32eeb1(0x1f9)]()[_0x32eeb1(0x26b)](),_0x3d0370=(_0x25033a['Match']||'')[_0x32eeb1(0x1f9)]()[_0x32eeb1(0x26b)]();VisuMZ[_0x32eeb1(0x5c5)]['ControllerButtons'][_0x40aefb]=_0x25033a,VisuMZ[_0x32eeb1(0x5c5)][_0x32eeb1(0x41c)][_0x3d0370]=_0x40aefb;}},VisuMZ['ParseAllNotetags']=function(){const _0x1dc4de=_0x555f1c;for(const _0x30a291 of $dataActors){if(_0x30a291)VisuMZ[_0x1dc4de(0x750)](_0x30a291);}for(const _0x27a707 of $dataClasses){if(_0x27a707)VisuMZ['ParseClassNotetags'](_0x27a707);}for(const _0x49fc94 of $dataSkills){if(_0x49fc94)VisuMZ['ParseSkillNotetags'](_0x49fc94);}for(const _0xab4f6 of $dataItems){if(_0xab4f6)VisuMZ[_0x1dc4de(0x67c)](_0xab4f6);}for(const _0x10869d of $dataWeapons){if(_0x10869d)VisuMZ[_0x1dc4de(0x55f)](_0x10869d);}for(const _0x5cf54f of $dataArmors){if(_0x5cf54f)VisuMZ[_0x1dc4de(0x6a2)](_0x5cf54f);}for(const _0x11c3d9 of $dataEnemies){if(_0x11c3d9)VisuMZ[_0x1dc4de(0x1b3)](_0x11c3d9);}for(const _0x44c0a4 of $dataStates){if(_0x44c0a4)VisuMZ[_0x1dc4de(0x106)](_0x44c0a4);}for(const _0x4853d7 of $dataTilesets){if(_0x4853d7)VisuMZ[_0x1dc4de(0x806)](_0x4853d7);}},VisuMZ[_0x555f1c(0x750)]=function(_0x3a173d){},VisuMZ['ParseClassNotetags']=function(_0x3398b6){},VisuMZ[_0x555f1c(0x20c)]=function(_0x1bbf29){},VisuMZ[_0x555f1c(0x67c)]=function(_0x655813){},VisuMZ[_0x555f1c(0x55f)]=function(_0x41a4d5){},VisuMZ[_0x555f1c(0x6a2)]=function(_0x5ea4c3){},VisuMZ[_0x555f1c(0x1b3)]=function(_0x1980d8){},VisuMZ[_0x555f1c(0x106)]=function(_0x38df2d){},VisuMZ[_0x555f1c(0x806)]=function(_0x21c2a4){},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x750)]=VisuMZ['ParseActorNotetags'],VisuMZ['ParseActorNotetags']=function(_0x58f65c){const _0x50c628=_0x555f1c;VisuMZ[_0x50c628(0x5c5)][_0x50c628(0x750)]['call'](this,_0x58f65c);const _0x3b559a=_0x58f65c[_0x50c628(0x6ae)];if(_0x3b559a[_0x50c628(0x3b6)](/<MAX LEVEL:[ ](\d+)>/i)){_0x58f65c[_0x50c628(0x4f9)]=Number(RegExp['$1']);if(_0x58f65c[_0x50c628(0x4f9)]===0x0)_0x58f65c[_0x50c628(0x4f9)]=Number[_0x50c628(0x71d)];}_0x3b559a[_0x50c628(0x3b6)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x58f65c['initialLevel']=Math[_0x50c628(0x174)](Number(RegExp['$1']),_0x58f65c[_0x50c628(0x4f9)]));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4f3)]=VisuMZ[_0x555f1c(0x4f3)],VisuMZ[_0x555f1c(0x4f3)]=function(_0x364f33){const _0x55559f=_0x555f1c;VisuMZ[_0x55559f(0x5c5)][_0x55559f(0x4f3)]['call'](this,_0x364f33);if(_0x364f33[_0x55559f(0x444)])for(const _0xa070ce of _0x364f33[_0x55559f(0x444)]){_0xa070ce[_0x55559f(0x6ae)][_0x55559f(0x3b6)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0xa070ce[_0x55559f(0x41a)]=Math[_0x55559f(0x4d6)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x1b3)]=VisuMZ[_0x555f1c(0x1b3)],VisuMZ['ParseEnemyNotetags']=function(_0x3b349b){const _0x17f10a=_0x555f1c;VisuMZ[_0x17f10a(0x5c5)][_0x17f10a(0x1b3)]['call'](this,_0x3b349b),_0x3b349b[_0x17f10a(0x41a)]=0x1;const _0x38e601=_0x3b349b[_0x17f10a(0x6ae)];if(_0x38e601[_0x17f10a(0x3b6)](/<LEVEL:[ ](\d+)>/i))_0x3b349b[_0x17f10a(0x41a)]=Number(RegExp['$1']);if(_0x38e601['match'](/<MAXHP:[ ](\d+)>/i))_0x3b349b[_0x17f10a(0x88b)][0x0]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<MAXMP:[ ](\d+)>/i))_0x3b349b['params'][0x1]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<ATK:[ ](\d+)>/i))_0x3b349b[_0x17f10a(0x88b)][0x2]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<DEF:[ ](\d+)>/i))_0x3b349b['params'][0x3]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<MAT:[ ](\d+)>/i))_0x3b349b[_0x17f10a(0x88b)][0x4]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<MDF:[ ](\d+)>/i))_0x3b349b[_0x17f10a(0x88b)][0x5]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<AGI:[ ](\d+)>/i))_0x3b349b['params'][0x6]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<LUK:[ ](\d+)>/i))_0x3b349b[_0x17f10a(0x88b)][0x7]=Number(RegExp['$1']);if(_0x38e601[_0x17f10a(0x3b6)](/<EXP:[ ](\d+)>/i))_0x3b349b['exp']=Number(RegExp['$1']);if(_0x38e601['match'](/<GOLD:[ ](\d+)>/i))_0x3b349b['gold']=Number(RegExp['$1']);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3cd)]=Graphics[_0x555f1c(0x86b)],Graphics[_0x555f1c(0x86b)]=function(){const _0x363e5e=_0x555f1c;switch(VisuMZ[_0x363e5e(0x5c5)][_0x363e5e(0x51b)][_0x363e5e(0x71c)]['AutoStretch']){case _0x363e5e(0x817):return!![];case _0x363e5e(0x33d):return![];default:return VisuMZ[_0x363e5e(0x5c5)][_0x363e5e(0x3cd)]['call'](this);}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x373)]=Graphics[_0x555f1c(0x2d2)],Graphics[_0x555f1c(0x2d2)]=function(_0x1a803c,_0x51d8fb,_0x4d5d3f=null){const _0x2f4890=_0x555f1c;VisuMZ[_0x2f4890(0x5c5)]['Graphics_printError'][_0x2f4890(0x2b0)](this,_0x1a803c,_0x51d8fb,_0x4d5d3f),VisuMZ[_0x2f4890(0x4f7)](![]);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x68c)]=Graphics['_centerElement'],Graphics[_0x555f1c(0x237)]=function(_0x885088){const _0x28feec=_0x555f1c;VisuMZ[_0x28feec(0x5c5)][_0x28feec(0x68c)]['call'](this,_0x885088),this[_0x28feec(0x7f5)](_0x885088);},Graphics['_centerElementCoreEngine']=function(_0x1c9190){const _0x1ec3e0=_0x555f1c;VisuMZ[_0x1ec3e0(0x5c5)][_0x1ec3e0(0x51b)]['QoL'][_0x1ec3e0(0x83d)]&&(_0x1c9190[_0x1ec3e0(0x2fb)]['font-smooth']=_0x1ec3e0(0x7d5));VisuMZ[_0x1ec3e0(0x5c5)][_0x1ec3e0(0x51b)][_0x1ec3e0(0x71c)][_0x1ec3e0(0x421)]&&(_0x1c9190[_0x1ec3e0(0x2fb)][_0x1ec3e0(0x275)]=_0x1ec3e0(0x55e));const _0x45583c=Math[_0x1ec3e0(0x4d6)](0x0,Math[_0x1ec3e0(0x5ad)](_0x1c9190['width']*this['_realScale'])),_0x2d16b7=Math[_0x1ec3e0(0x4d6)](0x0,Math[_0x1ec3e0(0x5ad)](_0x1c9190['height']*this[_0x1ec3e0(0x771)]));_0x1c9190[_0x1ec3e0(0x2fb)]['width']=_0x45583c+'px',_0x1c9190['style'][_0x1ec3e0(0x63d)]=_0x2d16b7+'px';},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6b9)]=Bitmap[_0x555f1c(0x54e)]['initialize'],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(_0x12ae0a,_0x2f8c32){const _0x524ecc=_0x555f1c;VisuMZ[_0x524ecc(0x5c5)][_0x524ecc(0x6b9)][_0x524ecc(0x2b0)](this,_0x12ae0a,_0x2f8c32),this[_0x524ecc(0x4f1)]=!(VisuMZ[_0x524ecc(0x5c5)][_0x524ecc(0x51b)][_0x524ecc(0x71c)][_0x524ecc(0x421)]??!![]);},Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x794)]=function(){const _0x1d0e16=_0x555f1c;this[_0x1d0e16(0x5c9)]=!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x85f)]=Sprite['prototype']['destroy'],Sprite[_0x555f1c(0x54e)]['destroy']=function(){const _0x57a6f1=_0x555f1c;if(this[_0x57a6f1(0x648)])VisuMZ[_0x57a6f1(0x5c5)][_0x57a6f1(0x85f)][_0x57a6f1(0x2b0)](this);this[_0x57a6f1(0x6ea)]();},Sprite['prototype'][_0x555f1c(0x6ea)]=function(){const _0x1362f2=_0x555f1c;if(!this['bitmap'])return;if(!this[_0x1362f2(0x4c8)]['_customModified'])return;this[_0x1362f2(0x4c8)][_0x1362f2(0x18c)]&&!this[_0x1362f2(0x19c)][_0x1362f2(0x18c)]['destroyed']&&this['bitmap'][_0x1362f2(0x74d)]();},VisuMZ['CoreEngine']['Bitmap_resize']=Bitmap[_0x555f1c(0x54e)]['resize'],Bitmap[_0x555f1c(0x54e)]['resize']=function(_0x2bd523,_0x55f358){const _0x3025e2=_0x555f1c;VisuMZ[_0x3025e2(0x5c5)]['Bitmap_resize'][_0x3025e2(0x2b0)](this,_0x2bd523,_0x55f358),this[_0x3025e2(0x794)]();},VisuMZ['CoreEngine'][_0x555f1c(0x87e)]=Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x5be)],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x5be)]=function(_0x2d239e,_0x2e86cf,_0x353880,_0x1cc043,_0x377761,_0x285846,_0x1229c7,_0x4d6ac7,_0x448ecb){const _0x640e=_0x555f1c;_0x2e86cf=Math['round'](_0x2e86cf),_0x353880=Math[_0x640e(0x647)](_0x353880),_0x1cc043=Math[_0x640e(0x647)](_0x1cc043),_0x377761=Math[_0x640e(0x647)](_0x377761),_0x285846=Math['round'](_0x285846),_0x1229c7=Math['round'](_0x1229c7),VisuMZ['CoreEngine'][_0x640e(0x87e)][_0x640e(0x2b0)](this,_0x2d239e,_0x2e86cf,_0x353880,_0x1cc043,_0x377761,_0x285846,_0x1229c7,_0x4d6ac7,_0x448ecb),this[_0x640e(0x794)]();},VisuMZ[_0x555f1c(0x5c5)]['Bitmap_clearRect']=Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x15b)],Bitmap['prototype']['clearRect']=function(_0x4b696e,_0x3d62a8,_0x1ea352,_0x5997e9){const _0x18cb46=_0x555f1c;VisuMZ[_0x18cb46(0x5c5)][_0x18cb46(0x591)][_0x18cb46(0x2b0)](this,_0x4b696e,_0x3d62a8,_0x1ea352,_0x5997e9),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x555f1c(0x130)]=Bitmap[_0x555f1c(0x54e)]['fillRect'],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x211)]=function(_0x2460a2,_0x2d1308,_0x2ecd09,_0x5354e6,_0x5e3d73){const _0x2bf6dd=_0x555f1c;VisuMZ[_0x2bf6dd(0x5c5)][_0x2bf6dd(0x130)][_0x2bf6dd(0x2b0)](this,_0x2460a2,_0x2d1308,_0x2ecd09,_0x5354e6,_0x5e3d73),this[_0x2bf6dd(0x794)]();},VisuMZ['CoreEngine'][_0x555f1c(0x17a)]=Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x165)],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x165)]=function(_0x3925cb,_0x1292f6,_0x41ed08,_0x2ed690,_0x38c46f){const _0x2deaeb=_0x555f1c;VisuMZ[_0x2deaeb(0x5c5)]['Bitmap_strokeRect'][_0x2deaeb(0x2b0)](this,_0x3925cb,_0x1292f6,_0x41ed08,_0x2ed690,_0x38c46f),this['markCoreEngineModified']();},VisuMZ['CoreEngine']['Bitmap_gradientFillRect']=Bitmap['prototype'][_0x555f1c(0x62b)],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x62b)]=function(_0x1c6244,_0xdde698,_0x45051d,_0x28c289,_0xc01005,_0x12b274,_0x3c796c){const _0x31fcb6=_0x555f1c;VisuMZ[_0x31fcb6(0x5c5)][_0x31fcb6(0x3fd)][_0x31fcb6(0x2b0)](this,_0x1c6244,_0xdde698,_0x45051d,_0x28c289,_0xc01005,_0x12b274,_0x3c796c),this['markCoreEngineModified']();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x2f6)]=Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x14d)],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x14d)]=function(_0x14cbae,_0x15ea64,_0x397eaa,_0x264cb2){const _0x321800=_0x555f1c;_0x14cbae=Math['round'](_0x14cbae),_0x15ea64=Math['round'](_0x15ea64),_0x397eaa=Math[_0x321800(0x647)](_0x397eaa),VisuMZ['CoreEngine'][_0x321800(0x2f6)][_0x321800(0x2b0)](this,_0x14cbae,_0x15ea64,_0x397eaa,_0x264cb2),this[_0x321800(0x794)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x353)]=Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x760)],Bitmap[_0x555f1c(0x54e)]['measureTextWidth']=function(_0x4f6e6a){const _0x5e05c2=_0x555f1c;return Math['ceil'](VisuMZ[_0x5e05c2(0x5c5)]['Bitmap_measureTextWidth'][_0x5e05c2(0x2b0)](this,_0x4f6e6a));},VisuMZ['CoreEngine'][_0x555f1c(0x866)]=Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x3bb)],Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x3bb)]=function(_0x143bec,_0x1ec78e,_0x3c48e1,_0x75a614,_0x1f376a,_0xe5dd31){const _0x434f16=_0x555f1c;_0x1ec78e=Math[_0x434f16(0x647)](_0x1ec78e),_0x3c48e1=Math['round'](_0x3c48e1),_0x75a614=Math['ceil'](_0x75a614),_0x1f376a=Math['ceil'](_0x1f376a),VisuMZ[_0x434f16(0x5c5)]['Bitmap_drawText']['call'](this,_0x143bec,_0x1ec78e,_0x3c48e1,_0x75a614,_0x1f376a,_0xe5dd31),this[_0x434f16(0x794)]();},VisuMZ['CoreEngine'][_0x555f1c(0x531)]=Bitmap['prototype'][_0x555f1c(0x850)],Bitmap['prototype'][_0x555f1c(0x850)]=function(_0x55cf38,_0x50cd0d,_0x281785,_0x3bcf91){const _0x365f5b=_0x555f1c;VisuMZ['CoreEngine'][_0x365f5b(0x51b)][_0x365f5b(0x71c)][_0x365f5b(0x452)]?this[_0x365f5b(0x399)](_0x55cf38,_0x50cd0d,_0x281785,_0x3bcf91):VisuMZ[_0x365f5b(0x5c5)][_0x365f5b(0x531)][_0x365f5b(0x2b0)](this,_0x55cf38,_0x50cd0d,_0x281785,_0x3bcf91);},Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x399)]=function(_0x282ff1,_0x521f4e,_0x243b7a,_0x2a3fb7){const _0x4c9880=_0x555f1c,_0x53b995=this['context'];_0x53b995[_0x4c9880(0x2bd)]=this[_0x4c9880(0x377)],_0x53b995[_0x4c9880(0x20d)](_0x282ff1,_0x521f4e+0x2,_0x243b7a+0x2,_0x2a3fb7);},VisuMZ['CoreEngine'][_0x555f1c(0x7bf)]=Input['clear'],Input[_0x555f1c(0x4ba)]=function(){const _0x456aa5=_0x555f1c;VisuMZ[_0x456aa5(0x5c5)][_0x456aa5(0x7bf)][_0x456aa5(0x2b0)](this),this[_0x456aa5(0x2ae)]=undefined,this[_0x456aa5(0x778)]=undefined,this[_0x456aa5(0x1bd)]=Input[_0x456aa5(0x33e)];},VisuMZ['CoreEngine'][_0x555f1c(0x409)]=Input[_0x555f1c(0x202)],Input[_0x555f1c(0x202)]=function(){const _0x18d24a=_0x555f1c;VisuMZ['CoreEngine'][_0x18d24a(0x409)][_0x18d24a(0x2b0)](this);if(this[_0x18d24a(0x1bd)])this[_0x18d24a(0x1bd)]--;},VisuMZ[_0x555f1c(0x5c5)]['Input_pollGamepads']=Input[_0x555f1c(0x282)],Input[_0x555f1c(0x282)]=function(){const _0x12e056=_0x555f1c;if(this[_0x12e056(0x1bd)])return;VisuMZ['CoreEngine'][_0x12e056(0x17f)][_0x12e056(0x2b0)](this);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4ea)]=Input[_0x555f1c(0x10e)],Input['_setupEventHandlers']=function(){const _0x4f70aa=_0x555f1c;VisuMZ[_0x4f70aa(0x5c5)]['Input_setupEventHandlers'][_0x4f70aa(0x2b0)](this),document[_0x4f70aa(0x5fc)](_0x4f70aa(0x4b3),this[_0x4f70aa(0x653)][_0x4f70aa(0x41d)](this));},VisuMZ['CoreEngine']['Input_onKeyDown']=Input[_0x555f1c(0x816)],Input[_0x555f1c(0x816)]=function(_0x3287cd){const _0x4d8816=_0x555f1c;this[_0x4d8816(0x778)]=_0x3287cd[_0x4d8816(0x1bc)],VisuMZ[_0x4d8816(0x5c5)][_0x4d8816(0x4a7)][_0x4d8816(0x2b0)](this,_0x3287cd),this[_0x4d8816(0x4a3)](null);},Input[_0x555f1c(0x653)]=function(_0x1f19d6){const _0x4b415d=_0x555f1c;this[_0x4b415d(0x892)](_0x1f19d6);},Input['_registerKeyInput']=function(_0xb98888){const _0x3735a2=_0x555f1c;this['_inputSpecialKeyCode']=_0xb98888[_0x3735a2(0x1bc)];let _0x944578=String[_0x3735a2(0x18d)](_0xb98888[_0x3735a2(0x769)]);this[_0x3735a2(0x2ae)]===undefined?this[_0x3735a2(0x2ae)]=_0x944578:this[_0x3735a2(0x2ae)]+=_0x944578;},VisuMZ['CoreEngine'][_0x555f1c(0x621)]=Input[_0x555f1c(0x4ef)],Input[_0x555f1c(0x4ef)]=function(_0xdcb1fd){const _0x3d5c92=_0x555f1c;if(_0xdcb1fd===0x8)return![];return VisuMZ[_0x3d5c92(0x5c5)]['Input_shouldPreventDefault'][_0x3d5c92(0x2b0)](this,_0xdcb1fd);},Input[_0x555f1c(0x67f)]=function(_0x43e96b){const _0x12db7a=_0x555f1c;if(_0x43e96b['match'](/backspace/i))return this['_inputSpecialKeyCode']===0x8;if(_0x43e96b[_0x12db7a(0x3b6)](/enter/i))return this[_0x12db7a(0x778)]===0xd;if(_0x43e96b[_0x12db7a(0x3b6)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x555f1c(0x1ad)]=function(){const _0x2982d8=_0x555f1c;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x2982d8(0x7e2)](this[_0x2982d8(0x778)]);},Input[_0x555f1c(0x1d9)]=function(){const _0x5118e3=_0x555f1c;return[0x25,0x26,0x27,0x28][_0x5118e3(0x7e2)](this[_0x5118e3(0x778)]);},Input['isGamepadConnected']=function(){const _0x23487d=_0x555f1c;if(navigator['getGamepads']){const _0x56a6cb=navigator[_0x23487d(0x181)]();if(_0x56a6cb)for(const _0x23700d of _0x56a6cb){if(_0x23700d&&_0x23700d['connected'])return!![];}}return![];},Input[_0x555f1c(0x246)]=function(){const _0x43fd0d=_0x555f1c;if(navigator[_0x43fd0d(0x181)]){const _0x42c017=navigator[_0x43fd0d(0x181)]();if(_0x42c017)for(const _0x4449c1 of _0x42c017){if(_0x4449c1&&_0x4449c1[_0x43fd0d(0x86a)]){if(this['isGamepadButtonPressed'](_0x4449c1))return!![];if(this[_0x43fd0d(0x456)](_0x4449c1))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x4caa5a){const _0x46b1ed=_0x555f1c,_0x4cbf9c=_0x4caa5a['buttons'];for(let _0x44bf86=0x0;_0x44bf86<_0x4cbf9c[_0x46b1ed(0x6d6)];_0x44bf86++){if(_0x4cbf9c[_0x44bf86]['pressed'])return!![];}return![];},Input[_0x555f1c(0x456)]=function(_0x5be845){const _0x214015=_0x555f1c,_0x5cb82a=_0x5be845[_0x214015(0x5a4)],_0x53c1d6=0.5;if(_0x5cb82a[0x0]<-_0x53c1d6)return!![];if(_0x5cb82a[0x0]>_0x53c1d6)return!![];if(_0x5cb82a[0x1]<-_0x53c1d6)return!![];if(_0x5cb82a[0x1]>_0x53c1d6)return!![];return![];},Input['getLastGamepadUsed']=function(){return this['_lastGamepad']||null;},Input[_0x555f1c(0x4a3)]=function(_0x193084){const _0x1ae43a=_0x555f1c;this[_0x1ae43a(0x871)]=_0x193084;},VisuMZ[_0x555f1c(0x5c5)]['Input_updateGamepadState']=Input['_updateGamepadState'],Input[_0x555f1c(0x2e6)]=function(_0x3dc760){const _0x2d2c7a=_0x555f1c;VisuMZ[_0x2d2c7a(0x5c5)][_0x2d2c7a(0x244)][_0x2d2c7a(0x2b0)](this,_0x3dc760),(this[_0x2d2c7a(0x235)](_0x3dc760)||this[_0x2d2c7a(0x456)](_0x3dc760))&&this[_0x2d2c7a(0x4a3)](_0x3dc760);},Input['getLastUsedGamepadType']=function(){const _0x4a6b32=_0x555f1c;return this[_0x4a6b32(0x871)]?this[_0x4a6b32(0x871)]['id']:_0x4a6b32(0x2bf);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x5b4)]=Tilemap[_0x555f1c(0x54e)]['_addShadow'],Tilemap['prototype'][_0x555f1c(0x738)]=function(_0x1b96c8,_0x22fb7f,_0x2e409e,_0x20f663){const _0x506f50=_0x555f1c;if($gameMap&&$gameMap[_0x506f50(0x657)]())return;VisuMZ[_0x506f50(0x5c5)][_0x506f50(0x5b4)]['call'](this,_0x1b96c8,_0x22fb7f,_0x2e409e,_0x20f663);},Tilemap[_0x555f1c(0x148)][_0x555f1c(0x54e)]['_createInternalTextures']=function(){const _0x126d6f=_0x555f1c;this[_0x126d6f(0x58c)]();for(let _0x44270e=0x0;_0x44270e<Tilemap['Layer']['MAX_GL_TEXTURES'];_0x44270e++){const _0x280581=new PIXI['BaseTexture']();_0x280581[_0x126d6f(0x7aa)](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0x126d6f(0x71c)][_0x126d6f(0x421)]&&(_0x280581[_0x126d6f(0x2fc)]=PIXI[_0x126d6f(0x41f)][_0x126d6f(0x4e3)]),this['_internalTextures'][_0x126d6f(0x45f)](_0x280581);}},WindowLayer[_0x555f1c(0x54e)]['isMaskingEnabled']=function(){const _0x11441e=_0x555f1c;return SceneManager&&SceneManager[_0x11441e(0x7b9)]?SceneManager[_0x11441e(0x7b9)][_0x11441e(0x146)]():!![];},VisuMZ['CoreEngine'][_0x555f1c(0x4cc)]=WindowLayer[_0x555f1c(0x54e)][_0x555f1c(0x39e)],WindowLayer[_0x555f1c(0x54e)][_0x555f1c(0x39e)]=function render(_0x4ecff8){const _0x5dd124=_0x555f1c;this[_0x5dd124(0x2d0)]()?VisuMZ[_0x5dd124(0x5c5)]['WindowLayer_render'][_0x5dd124(0x2b0)](this,_0x4ecff8):this[_0x5dd124(0x476)](_0x4ecff8);},WindowLayer[_0x555f1c(0x54e)]['renderNoMask']=function render(_0x2289a8){const _0x28a2fa=_0x555f1c;if(!this['visible'])return;const _0x3f8d0c=new PIXI[(_0x28a2fa(0x525))](),_0x11d27e=_0x2289a8['gl'],_0x2aa961=this[_0x28a2fa(0x6c1)][_0x28a2fa(0x12c)]();_0x2289a8[_0x28a2fa(0x888)][_0x28a2fa(0x885)](),_0x3f8d0c[_0x28a2fa(0x269)]=this[_0x28a2fa(0x269)],_0x2289a8[_0x28a2fa(0x117)][_0x28a2fa(0x21e)](),_0x11d27e['enable'](_0x11d27e[_0x28a2fa(0x125)]);while(_0x2aa961[_0x28a2fa(0x6d6)]>0x0){const _0x4750c3=_0x2aa961[_0x28a2fa(0x1eb)]();_0x4750c3[_0x28a2fa(0x6bc)]&&_0x4750c3[_0x28a2fa(0x5c8)]&&_0x4750c3[_0x28a2fa(0x112)]>0x0&&(_0x11d27e[_0x28a2fa(0x42a)](_0x11d27e['EQUAL'],0x0,~0x0),_0x11d27e[_0x28a2fa(0x407)](_0x11d27e[_0x28a2fa(0x5fd)],_0x11d27e[_0x28a2fa(0x5fd)],_0x11d27e[_0x28a2fa(0x5fd)]),_0x4750c3[_0x28a2fa(0x39e)](_0x2289a8),_0x2289a8[_0x28a2fa(0x117)][_0x28a2fa(0x21e)](),_0x3f8d0c[_0x28a2fa(0x4ba)](),_0x11d27e[_0x28a2fa(0x42a)](_0x11d27e[_0x28a2fa(0xf9)],0x1,~0x0),_0x11d27e['stencilOp'](_0x11d27e[_0x28a2fa(0x272)],_0x11d27e[_0x28a2fa(0x272)],_0x11d27e[_0x28a2fa(0x272)]),_0x11d27e['blendFunc'](_0x11d27e[_0x28a2fa(0x102)],_0x11d27e['ONE']),_0x3f8d0c[_0x28a2fa(0x39e)](_0x2289a8),_0x2289a8[_0x28a2fa(0x117)][_0x28a2fa(0x21e)](),_0x11d27e[_0x28a2fa(0x519)](_0x11d27e[_0x28a2fa(0x684)],_0x11d27e['ONE_MINUS_SRC_ALPHA']));}_0x11d27e['disable'](_0x11d27e[_0x28a2fa(0x125)]),_0x11d27e[_0x28a2fa(0x4ba)](_0x11d27e['STENCIL_BUFFER_BIT']),_0x11d27e[_0x28a2fa(0x18b)](0x0),_0x2289a8['batch'][_0x28a2fa(0x21e)]();for(const _0x526ef4 of this['children']){!_0x526ef4['_isWindow']&&_0x526ef4['visible']&&_0x526ef4[_0x28a2fa(0x39e)](_0x2289a8);}_0x2289a8['batch'][_0x28a2fa(0x21e)]();},DataManager[_0x555f1c(0x51c)]=function(_0x1d9e47){const _0x462b82=_0x555f1c;return this[_0x462b82(0x1a7)](_0x1d9e47)&&_0x1d9e47[_0x462b82(0x753)]===0x2;},VisuMZ['CoreEngine'][_0x555f1c(0x64e)]=DataManager[_0x555f1c(0x17e)],DataManager['setupNewGame']=function(){const _0x16d473=_0x555f1c;VisuMZ['CoreEngine'][_0x16d473(0x64e)][_0x16d473(0x2b0)](this),this[_0x16d473(0x745)](),this[_0x16d473(0x1f5)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x1b36d1=_0x555f1c;if($gameTemp[_0x1b36d1(0x6d5)]()){const _0x1ed4c8=VisuMZ[_0x1b36d1(0x5c5)][_0x1b36d1(0x51b)]['QoL'][_0x1b36d1(0x7a3)];if(_0x1ed4c8>0x0)$gameTemp[_0x1b36d1(0x3df)](_0x1ed4c8);}},DataManager['reserveNewGameCommonEvent']=function(){const _0x12b7ed=_0x555f1c,_0xf177d=VisuMZ[_0x12b7ed(0x5c5)]['Settings'][_0x12b7ed(0x71c)][_0x12b7ed(0x3f1)]||0x0;if(_0xf177d>0x0)$gameTemp[_0x12b7ed(0x3df)](_0xf177d);},DataManager[_0x555f1c(0x729)]=function(_0x26f989){const _0x3292b3=_0x555f1c,_0x58fd78=$dataTroops[_0x26f989];if(!_0x58fd78)return'';let _0x1566a7='';_0x1566a7+=_0x58fd78['name'];for(const _0x309bc9 of _0x58fd78[_0x3292b3(0x4fe)]){for(const _0x2cfd48 of _0x309bc9[_0x3292b3(0x57c)]){[0x6c,0x198][_0x3292b3(0x484)](_0x2cfd48[_0x3292b3(0x898)])&&(_0x1566a7+='\x0a',_0x1566a7+=_0x2cfd48[_0x3292b3(0x556)][0x0]);}}return _0x1566a7;};(VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x71c)][_0x555f1c(0x7f1)]??!![])&&($scene=null,VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x335)]=Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x663)],Scene_Base[_0x555f1c(0x54e)]['create']=function(){const _0x410744=_0x555f1c;VisuMZ[_0x410744(0x5c5)]['Scene_Base_create'][_0x410744(0x2b0)](this),$scene=this;},$spriteset=null,VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x11b)]=Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x4c4)],Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x4c4)]=function(){const _0x4a38fe=_0x555f1c;VisuMZ[_0x4a38fe(0x5c5)][_0x4a38fe(0x11b)][_0x4a38fe(0x2b0)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x75e)]=Scene_Battle[_0x555f1c(0x54e)]['createSpriteset'],Scene_Battle['prototype'][_0x555f1c(0x4c4)]=function(){const _0x3fa305=_0x555f1c;VisuMZ[_0x3fa305(0x5c5)]['Scene_Battle_createSpriteset'][_0x3fa305(0x2b0)](this),$spriteset=this[_0x3fa305(0x723)];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x35d)]=Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x10f)],Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x10f)]=function(){const _0x4fd58f=_0x555f1c;VisuMZ['CoreEngine'][_0x4fd58f(0x35d)][_0x4fd58f(0x2b0)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x78d)]=BattleManager['update'],BattleManager['update']=function(_0x588c47){const _0x29b6a7=_0x555f1c;VisuMZ[_0x29b6a7(0x5c5)][_0x29b6a7(0x78d)][_0x29b6a7(0x2b0)](this,_0x588c47),this[_0x29b6a7(0x3f6)]();},BattleManager[_0x555f1c(0x3f6)]=function(){const _0x293624=_0x555f1c;$subject=this['_subject'],$targets=this[_0x293624(0x674)],$target=this[_0x293624(0x639)]||this[_0x293624(0x674)][0x0];},$event=null,VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3a0)]=Game_Event[_0x555f1c(0x54e)][_0x555f1c(0x7d2)],Game_Event[_0x555f1c(0x54e)][_0x555f1c(0x7d2)]=function(){const _0x31b511=_0x555f1c;VisuMZ[_0x31b511(0x5c5)]['Game_Event_start'][_0x31b511(0x2b0)](this),$event=this;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x84d)]=Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x202)],Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0x345197=_0x555f1c;VisuMZ[_0x345197(0x5c5)]['Scene_Map_update'][_0x345197(0x2b0)](this),$gameMap[_0x345197(0x82a)]();},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x82a)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x223f86){if($gameTemp)$gameTemp['reserveCommonEvent'](_0x223f86);});function _0x4c1e(){const _0x4dd59b=['number','_stored_maxLvGaugeColor1','offsetY','(\x5cd+)>','OpenSpeed','WIN_OEM_RESET','createPageButtons','PositionJS','checkCacheKey','NON_FRAME','_scene','command355','dimColor2','_centerCameraCheck','stypeId','catchNormalError','Input_clear','updateLastTarget','【%1】\x0a','WIN_OEM_CLEAR','LINEAR','Game_Map_scrollLeft','Scene_MenuBase_helpAreaTop','alignBottom','_stored_tpGaugeColor1','setSkill','targetY','picture','displayY','setSideButtonLayout','drawGameTitle','CEV','xparamPlus2','processHandling','makeActionList','start','》Comment《\x0a%1\x0a','currentLevelExp','none','displayX','select','_battleField','overallWidth','pointY','XParameterFormula','wait','quit','catchUnknownError','prepare','toFixed','hpGaugeColor1','contains','onNameOk','redraw','WIN_ICO_CLEAR','WIN_OEM_CUSEL','JUNJA','Sprite_Gauge_gaugeRate','terms','_upArrowSprite','onActorChange','removeChild','colSpacing','value','createCustomParameter','addOnceParallelInterpreter','ShortcutScripts','areButtonsOutsideMainUI','buttonAssistKey3','Scene_Map_createSpriteset_detach','_centerElementCoreEngine','ENTER','〘Scrolling\x20Text〙\x0a','pictureId','RevertPreserveNumbers','_shakeSpeed','isAnimationForEach','_hideTileShadows','drawBackgroundRect','worldTransform','Enable','updateScrollBarPosition','isScrollBarVisible','Window_NameInput_cursorUp','maxTurns','isExpGaugeDrawn','F10','ParseTilesetNotetags','_movementDuration','drawActorLevel','HYPHEN_MINUS','_movementWholeDuration','mirror','MRG','ColorDeath','SwitchActorText','OutlineColorGauge','_stored_ctGaugeColor1','DefaultMode','MultiKeyFmt','updateScrollBarVisibility','paramPlusJS','Scene_Map_updateScene','_onKeyDown','stretch','FontSize','process_VisuMZ_CoreEngine_jsQuickFunctions','PAUSE','open','active','sparamPlus2','refresh','usableSkills','AutoScrollLockY','IconSet','cursorRight','adjustX','drawIcon','updateClose','ValueJS','inBattle','setEvent','actorWindowRect','updateCurrentEvent','([\x5c+\x5c-]\x5cd+)>','playOk','Linear','getKeyboardInputButtonString','enableDigitGrouping','QUOTE','processCursorMove','GoldBgType','hideButtonFromView','_cacheScaleY','BottomHelp','updatePositionCoreEngineShakeHorz','backgroundBitmap','Plus','title','gaugeLineHeight','isTpb','width','FontSmoothing','randomInt','onClick','updateOnceParallelInterpreters','initCoreEngine','keyboard','iconHeight','battlebacks2','_subject','createScrollBarSprites','isMagical','iconWidth','DOLLAR','SUBTRACT','_eventId','updateMain','Scene_Map_update','processMoveCommand','JSON','_drawTextOutline','exportAllMapStrings','_stored_powerUpColor','MAXMP','IconXParam0','_targetScaleY','levelUpRecovery','Rate','CommandRect','_currentBgm','_tileSprite','Sprite_Picture_loadBitmap','actor','isSceneMap','Scene_Status_create','Sprite_destroy','bitmapWidth','nw.gui','viewport','initCoreEasing','escape','isFullDocumentTitle','Bitmap_drawText','tpGaugeColor2','RowSpacing','touchUI','connected','_defaultStretchMode','tileset','pagedownShowButton','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','Type','_editWindow','_lastGamepad','INOUTBOUNCE','createPointAnimationSprite','needsUpdate','maxScrollbar','startShake','Game_Map_changeTileset','TRAIT_PARAM','ButtonAssist','Spriteset_Base_destroy','Scene_Load','makeInputButtonString','scrollUp','Bitmap_blt','_colorTone','initDigitGrouping','xparamFlatJS','system','InputBgType','updateAnchor','forceStencil','ColorNormal','loadTileset','framebuffer','createTileExtendSprites','xparamPlus1','params','Rate2','updateOpacity','changeTileset','index','layoutSettings','dashToggle','_registerKeyInput','_moveEasingType','ItemBackColor2','Untitled','updatePictureCoordinates','setBackgroundOpacity','code','XParamVocab5','_backgroundSprite','FDR','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','EREOF','_viewportSize','_animationSprites','openingSpeed','performMiss','getControllerInputButtonMatch','VisuMZ_3_EventChainReact','refreshWithTextCodeSupport','Window_Base_initialize','WIN_OEM_AUTO','Flat','exportAllTroopStrings','createEnemies','_cacheScaleX','maxHorz','sparamPlusJS','hpColor','createFauxAnimationQueue','XParamVocab3','concat','setActorHome','tab','mmp','paramPlus','drawActorSimpleStatus','Scene_Menu_create','_index','buttonAssistText%1','rgba(0,\x200,\x200,\x201.0)','ApplyEasing','isPressed','Window_StatusBase_drawActorSimpleStatus','integer','makeCoreEngineCommandList','xparamFlatBonus','gainItem','INEXPO','DisplayLockY','playBgm','getLevel','Scene_Item_create','_text','LoadError','setViewport','EQUALS','Game_Interpreter_command111','updateScrollBars','OUTCUBIC','paintOpacity','NUMPAD9','processKeyboardDigitChange','startMove','getLastPluginCommandInterpreter','GoldIcon','INQUINT','423VLCvKa','isCancelled','_mode','_tilemap','allIcons','isAlive','CommandWidth','tileWidth','invokeCounterAttack','WIN_OEM_FJ_TOUROKU','F18','_backgroundFilter','gaugeHeight','TextStr','createContents','ColorTPGauge1','IconParam5','Scene_Options_create','SystemSetSideView','xparamFlat1','parse','LUK','IDs','_numberWindow','_scrollBarHorz','ColorCrisis','playTestShiftR','setupCustomRateCoreEngine','EndingID','STRUCT','Scene_MenuBase_createCancelButton','innerWidth','operation','save','IconXParam4','STR','CRI','ALWAYS','onInputBannedWords','applyEasing','command105','buttonAssistOffset3','playTestF7','measureText','Spriteset_Base_update','isBottomButtonMode','ZERO','Mirror','Game_Picture_y','XParamVocab6','ParseStateNotetags','win32','_balloonQueue','Scene_Skill_create','loadSystem','_buttonAssistWindow','HelpRect','F23','_setupEventHandlers','terminate','crisisColor','Scene_Battle_update','openness','TextCodeClassNames','_stored_hpGaugeColor2','HRG','img/%1/','batch','_commonEventLayers','MIN_SAFE_INTEGER','Map%1','Scene_Map_createSpriteset','getBattleSystem','Game_Picture_show','GoldOverlap','TPB\x20ACTIVE','setFrame','_playTestFastMode','mpGaugeColor1','keyMapper','initialize','STENCIL_TEST','NUMPAD7','createCancelButton','StatusParamsBgType','itemHitImprovedAccuracy','createMenuButton','setMainFontSize','clone','BTestAddedQuantity','mute','processKeyboardBackspace','Bitmap_fillRect','drawGauge','bitmapHeight','OTB','CommandList','VOLUME_UP','sceneTerminationClearEffects','_targetAnchor','MvAnimationRate','Scene_Battle_createSpritesetFix','_targetOffsetY','PictureCoordinatesMode','_stored_gaugeBackColor','Map%1.json','createFauxAnimationSprite','EnableMasking','processKeyboardEnd','constructor','_goldWindow','RepositionEnemies','(\x5cd+)([%％])>','VisuMZ_1_OptionsCore','isWindowMaskingEnabled','_drawTextBody','Renderer','_bgsBuffer','DetachMapPictureContainer','IconSParam2','center','drawCircle','CorrectSkinBleeding','updatePictureAntiZoom','State-%1-%2','createJsQuickFunction','updateScene','\x20this.','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','useDigitGroupingEx','Max','vertJS','_forcedBattleGridSystem','F15','_pictureCoordinatesMode','clearRect','processEscape','getInputMultiButtonStrings','addWindow','AutoScrollLockX','pos','SEMICOLON','members','slice','bgm','strokeRect','itemWindowRect','Window_Base_drawFace','INELASTIC','isOpening','mainFontSize','_startLoading','createCustomBackgroundImages','Game_Interpreter_command355','Control\x20Variables\x20Script\x20Error','cursorDown','_blank','CustomParamIcons','ConvertNumberToString','HASH','min','Window_NameInput_cursorPagedown','duration','framesMin','ENTER_SPECIAL','%1/','Bitmap_strokeRect','numRepeats','buttonAssistWindowRect','NUMPAD2','setupNewGame','Input_pollGamepads','updateKeyText','getGamepads','NUMPAD4','tilesets','_lastX','charAt','vertical','GroupDigits','playBgs','VisuMZ_1_BattleCore','_closing','clearStencil','_baseTexture','fromCharCode','animationNextDelay','EVA','_currentMap','_hideButtons','ctrlKey','EnableNumberInput','itemLineRect','_iconIndex','ColorHPGauge2','uiAreaHeight','applyForcedGameTroopSettingsCoreEngine','SlotBgType','paramBase','setEnemyAction','_bitmap','processKeyboardHome','attackSkillId','MODECHANGE','isHandled','send','battlebacks1','xdg-open','5441110QPIiRk','standardIconWidth','smooth','isItem','_skillTypeWindow','Game_Interpreter_updateWaitMode','updateMainMultiply','loadWindowskin','updatePointAnimations','isNumpadPressed','buttonAssistKey2','commandWindowRows','setAttack','buttonAssistKey1','paramFlat','ParseEnemyNotetags','random','missed','gaugeRate','this.paramBase(7)','OUTSINE','ParseAllNotetags','ExportStrFromAllMaps','KeyItemProtect','keyCode','_gamepadWait','atbActive','ExtDisplayedParams','updateDocumentTitle','_timeDuration','keys','SkillTypeRect','BlurStrength','_stored_normalColor','ETB','updateTransform','_duration','storeMapData','DurationPerChat','processBack','loadMapData','Flat1','isEventTest','_listWindow','_hp','Armor-%1-%2','_screenX','Game_Picture_updateRotation','coreEngineRepositionEnemies','targetSpritePosition','processTouchModernControls','evaded','atypeId','isArrowPressed','Game_Map_scrollUp','onerror','_statusEquipWindow','initVisuMZCoreEngine','commandWindowRect','_dummyWindow','SceneManager_onKeyDown','currentValue','AGI','setCoreEngineScreenShakeStyle','REC','_slotWindow','〘Common\x20Event\x20%1:\x20%2〙\x20End','OptionsMenu','contentsOpacity','ASTERISK','getInputButtonString','shift','ItemPadding','_pauseSignSprite','popScene','WASD','_backSprite1','_lastY','ColorCTGauge1','createPointAnimationQueue','Game_Unit_onBattleEnd','reserveNewGameCommonEvent','titles1','Subtitle','refreshSpritesetForExtendedTiles','toLowerCase','targetBackOpacity','updateDuration','BTB','yScrollLinkedOffset','Scene_Name_onInputOk','_tempActor','consumable','cancel','update','drawBackground','PageChange','outlineColorDmg','Game_Map_setDisplayPos','LvExpGauge','_targetOpacity','8020592crtdzQ','updateEffekseer','currentExp','ParseSkillNotetags','fillText','applyCoreEasing','setAnchor','GetParamIcon','fillRect','Title','buttonAssistOffset%1','changeAnglePlusData','Window_NameInput_cursorPageup','_srcBitmap','resetTextColor','SCROLL_LOCK','Total','jsonToZip','guardSkillId','_name','VOLUME_MUTE','flush','isForFriend','_rate','drawCharacter','TranslucentOpacity','down','MenuLayout','playOnceParallelInterpreter','FINAL','isMapScrollLinked','translucentOpacity','updateBgmParameters','Game_BattlerBase_initMembers','Game_Picture_move','isNextScene','Tilemap_addSpotTile','IconSParam4','ParamArrow','dimColor1','levelUp','XParamVocab8','buttonAssistText3','EVAL','isGamepadButtonPressed','_mapY','_centerElement','ADD','seek','RegExp','makeEncounterCount','CategoryBgType','SParamVocab8','Upper\x20Left','mainAreaBottom','Scene_SingleLoadTransition','sparamPlus','RIGHT','PRESERVCONVERSION(%1)','Input_updateGamepadState','_coreEasing','isGamepadTriggered','processKeyboardDelete','expRate','IconXParam7','remove','categoryWindowRect','BattleManager_processEscape','repositionEnemiesByResolution','PLUS','_pointAnimationSprites','autoRemovalTiming','adjustSprite','IconParam2','_targetY','EXSEL','Scene_MenuBase_mainAreaHeight','MAT','AntiZoomPictures','command357','retrieveFauxAnimation','COMMA','Window_Selectable_cursorDown','_active','_list','paramValueByName','move','BarBodyColor','paramName','INSERT','Actor','CategoryRect','Y:\x20%1','battleSystem','this.paramBase(5)','textColor','transform','AllTroops','trim','windowPadding','clearZoom','setCoreEngineUpdateWindowBg','sparamFlatJS','_screenY','_url','REPLACE','setupButtonImage','F19','image-rendering','_opening','VisuMZ_2_BattleSystemCTB','command122','updateText','uiAreaWidth','skipBranch','sparamRate','isBottomHelpMode','scaleX','helpAreaHeight','thickness','Scene_Map_updateMainMultiply','_pollGamepads','helpWindowRect','drawGameVersion','outlineColorGauge','drawing','AnimationID','setTopRow','Param','registerCommand','menuShowButton','IconXParam2','setEasingType','valueOutlineWidth','string','DETACH_PICTURE_CONTAINER','angle','checkPlayerLocation','tpCostColor','isPointAnimationPlaying','(\x5cd+\x5c.?\x5cd+)>','faceWidth','%1〘Choice\x20Cancel〙%1','_stored_maxLvGaugeColor2','mainAreaHeight','buttonAssistOffset4','status','Window_Selectable_processTouch','AudioChangeBgsPan','AudioChangeBgmPitch','ColorTPCost','isSmartEventCollisionOn','adjustY','moveRelativeToResolutionChange','Game_Picture_scaleX','QUESTION_MARK','NUM','makeDocumentTitle','Game_Actor_levelUp','RepositionActors','toLocaleString','_mapX','Pixelated','onInputOk','showDevTools','_inputString','Game_Party_consumeItem','call','_stored_expGaugeColor1','itemPadding','targetObjects','map','canUse','ControllerButtons','addQueue','AccuracyBoost','updateRotation','maxVisibleItems','animationShouldMirror','DrawItemBackgroundJS','fillStyle','SplitEscape','Keyboard','_windowLayer','WIN_OEM_FJ_LOYA','_patternHeight','ExportString','tilesetFlags','Sprite_AnimationMV_processTimingData','Duration','LATIN1','clearOnceParallelInterpreters','pop','zoomScale','mainAreaTop','filterArea','SParamVocab6','mev','checkCoreEngineDisplayCenter','isMaskingEnabled','IconXParam6','printError','updatePictureSettings','_scaleY','_stored_crisisColor','setValue','application/json','Window_Base_createContents','right','Game_Actor_isPreserveTp','MapOnceParallel','Scene_Title','sellWindowRect','IconSParam6','TextFmt','ColorMaxLvGauge1','Sprite_Button_initialize','VisuMZ_2_BattleSystemPTB','1041jkvjGL','offColor','XParamVocab9','_updateGamepadState','EditRect','createTextState','centerY','VisuMZ_2_BattleSystemSTB','deactivate','BACK_QUOTE','SParamVocab3','origin','DigitGroupingExText','_lastOrigin','processCursorHomeEndTrigger','setAnglePlusData','updateMove','OpenURL','Window','Bitmap_drawCircle','Color','itemRect','XParamVocab4','paramX','style','scaleMode','isTileExtended','WIN_OEM_ENLW','removePointAnimation','equips','_lastCommandSymbol','VisuMZ_2_BattleSystemFTB','createKeyJS','_backSprite2','hpGaugeColor2','_forcedTroopView','LineHeight','Symbol','loading','buttonAssistSwitch','_actorWindow','sin','drawTextTopAligned','F7key','ShopMenu','CtrlQuickLoad','ShowJS','ShowButtons','vert','_onError','endAction','textWidth','sparam','nickname','buttonAssistOffset2','setupTileExtendTerrainTags','ATK','Sprite_AnimationMV_updatePosition','Scene_Battle_createCancelButton','editWindowRect','DamageColor','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','boxWidth','_battlerName','_onceParallelInterpreters','mpColor','TextCodeNicknames','isAnimationPlaying','_itemWindow','Page','\x5c}❪SHIFT❫\x5c{','SParamVocab7','asin','nextLevelExp','left','Game_Map_setup','createPointAnimation','opacity','imageSmoothingEnabled','framesPerChar','top','updatePositionCoreEngineShakeOriginal','Scene_Base_create','DATABASE','ceil','Troop%1','addLoadListener','Spriteset_Battle_createEnemies','ATTN','F6key','normal','keyRepeatWait','end','Window_EquipItem_isEnabled','_lastPluginCommandInterpreter','ColorTPGauge2','isMVAnimation','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','isSceneBattle','Window_NumberInput_start','repeat','CommonEventID','displayName','Scene_Name_create','DigitGroupingStandardText','END','and\x20add\x20it\x20onto\x20this\x20one.','overrideMimeType','_bypassCanCounterCheck','drawIconBySize','drawTextEx','_digitGroupingEx','Bitmap_measureTextWidth','bodyColor','_mainSprite','ActorMPColor','BgFilename1','ScaleY','position','createTextPopupWindow','Unnamed','_shakeDuration','Scene_Base_terminate','INCUBIC','animationId','SellRect','PGUP','Scene_Base_createWindowLayer','DEF','drawFace','Scene_Map_updateMain','baseId','calcCoreEasing','Game_Action_numRepeats','Window_StatusBase_drawActorLevel','MEV','DOUBLE_QUOTE','_isPlaytest','AudioChangeBgsVolume','_startPlaying','Sprite_Button_updateOpacity','Game_Picture_updateMove','scrollX','focus','Graphics_printError','DetachBattlePictureContainer','Sprite_Actor_setActorHome','addChildToBack','outlineColor','XParamVocab2','OPEN_BRACKET','makeCommandList','canEquip','updatePlayTestF7','setActorHomeRepositioned','targetScaleX','\x5c}❪TAB❫\x5c{','CustomParam','name','MenuBg','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','DebugConsoleLastControllerID','_troopId','Script\x20Call\x20Error','drawCurrencyValue','_statusWindow','isCollidedWithEvents','replace','option','Window_refreshBack','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','NUM_LOCK','Game_Event_isCollidedWithEvents','DigitGroupingGaugeSprites','SParamVocab9','INQUART','_cache','Window_TitleCommand_selectLast','CLOSE_BRACKET','CustomParamAbb','_pressed','_commandList','_drawTextShadow','TRG','PreserveNumbers','updateSmoothScroll','PictureEraseRange','render','format','Game_Event_start','maxLvGaugeColor2','Scene_Map_createSpritesetFix','playMiss','CLEAR','drawGoldItemStyle','EquipMenu','current','showPicture','targetOpacity','TitlePicButtons','child_process','removeAnimationFromContainer','Game_Action_itemHit','VariableEvalReference','PRINT','_stypeId','onBattleEnd','getPointAnimationLayer','SceneManager_exit','clearCachedKeys','filter','match','%2%1%3','enemy','_changingClass','StatusRect','drawText','setBattleSystem','pitch','isCursorMovable','BTestWeapons','Origin','IconParam4','scrollLeft','VisuMZ_4_UniqueTileEffects','powerUpColor','maxItems','ListRect','item','version','Scene_Boot_onDatabaseLoaded','pow','Game_Character_processMoveCommand','Spriteset_Base_initialize','Graphics_defaultStretchMode','Game_Picture_scaleY','INOUTQUINT','volume','initMembers','processDigitChange','isAnimationOffsetXMirrored','_displayY','CTB','horizontal','pageup','Actor-%1-%2','show','OUTBOUNCE','_CoreEngineSettings','key%1','param','WIN_OEM_FJ_ROYA','reserveCommonEvent','IconIndex','innerHeight','button','maxCols','anglePlus','DIVIDE','sparamRate2','backOpacity','_textPopupWindow','Window_NameInput_processTouch','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','URL','_tile','ConvertParams','_onLoad','TimeProgress','_targetOffsetX','NewGameCommonEventAll','Window_Base_drawIcon','NUMPAD1','X:\x20%1','getColor','updateBattleVariables','setAction','cursorLeft','setTargetAnchor','anchorCoreEasing','ColorGaugeBack','BTestItems','Bitmap_gradientFillRect','_muteSound','helpAreaBottom','mapId','buttonAssistKey%1','Window_Scrollable_update','Sprite_StateIcon_loadBitmap','PictureRotate','initialLevel','ColorPowerUp','stencilOp','textHeight','Input_update','AMPERSAND','ListBgType','scrollbarHeight','src','resetBattleSystem','WIN_OEM_BACKTAB','_displayX','BannedWords','target','ACCEPT','subjectHitRate','isClosing','DEFAULT_SHIFT_Y','recoverAll','Scene_GameEnd_createBackground','OutlineColor','level','LevelUpFullHp','ControllerMatches','bind','traitObjects','SCALE_MODES','smallParamFontSize','PixelateImageRendering','updateOpen','createWindowLayer','_makeFontNameText','OPEN_PAREN','Sprite_Battler_startMove','Scene_Battle_createSpriteset_detach','EISU','_logWindow','stencilFunc','HOME','optionsWindowRect','Window_Gold_refresh','Mute','loadGameImagesCoreEngine','ModernControls','6482376LbXrot','setHandler','defineProperty','TCR','loadIconBitmap','([\x5c+\x5c-]\x5cd+)([%％])>','EditBgType','_tileExtendSprites','Sprite_Gauge_currentValue','LESS_THAN','centerSprite','IconXParam8','alwaysDash','paramchangeTextColor','etypeId','itemEva','setupBattleTestItems','listWindowRect','numberWindowRect','learnings','menu','Window_NameInput_refresh','exit','ExtJS','lineHeight','PictureEasingType','alphabetic','INBACK','Icon','rgba(0,\x200,\x200,\x200.7)','clearForcedGameTroopSettingsCoreEngine','executeLoad','getColorDataFromPluginParameters','FontShadows','isMenuButtonAssistEnabled','setTileFrame','updateBackOpacity','isGamepadAxisMoved','fontSize','setLastPluginCommandInterpreter','CodeJS','setupValueFont','setDisplayPos','maxGold','process_VisuMZ_CoreEngine_RegExp','subtitle','push','MDF','MapNameTextCode','GRD','addChild','SParamVocab5','platform','isGameActive','_fauxAnimationQueue','this.paramBase(4)','BTestArmors','updateFrame','currencyUnit','BACKSPACE','battlerHue','_coreEasingType','Class-%1-%2','isLoopVertical','helpAreaTopSideButtonLayout','PositionY','%1〘Choice\x20%2〙\x20%3%1','nah','makeAutoBattleActions','renderNoMask','isDying','_refreshPauseSign','drawNewParam','globalAlpha','showIncompleteTilesetError','SParameterFormula','Window_Selectable_itemRect','createBackground','TextPopupShow','adjustBoxSize','standardIconHeight','StartID','OUTQUINT','includes','_inputWindow','DashToggleR','FTB','sparamRateJS','findSymbol','toUpperCase','XParamVocab0','ZOOM','IconParam6','paramRateJS','updatePosition','JsReplaceUserVar','ScreenShake','isTriggered','refreshDimmerBitmap','itemSuccessRate','loadSystemImages','onload','playCursor','BoxMargin','_saveFileID','initBasic','pictureButtons','ImprovedAccuracySystem','AudioChangeBgmPan','openURL','Game_Action_itemEva','statusParamsWindowRect','characters','PDR','setLastGamepadUsed','_allTextHeight','FunctionName','Window_Selectable_drawBackgroundRect','Input_onKeyDown','_number','PositionX','F12','_coreEngineShakeStyle','Enemy-%1-%2','onKeyDown','<JS\x20%1\x20%2:[\x20](.*)>','Item-%1-%2','ItemBackColor1','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','_mp','keypress','EnableNameInput','boxHeight','restore','ButtonHeight','Scene_Boot_startNormalGame','damageColor','clear','ExtractStrFromMap','contents','scrollDown','ColorMPGauge1','_downArrowSprite','Game_Actor_changeClass','TitleCommandList','_optionsWindow','ColorPowerDown','createSpriteset','_width','_updateFilterArea','StatusEquipRect','bitmap','ALT','isOpenAndActive','_origin','WindowLayer_render','HIT','dropItems','createTitleButtons','home','drawGameSubtitle','isOptionValid','INQUAD','CommandBgType','darwin','max','log','Game_Map_scrollDown','textAlign','ShowScrollBar','Game_System_initialize','Scene_Unlisted','textSizeEx','_startDecrypting','Game_Picture_x','toString','fillAll','F11','NEAREST','DOWN','setMute','loadPicture','filters','skillTypes','Window_Base_destroyContents','Input_setupEventHandlers','SideView','processKeyboardHandling','SideButtons','makeFontSmaller','_shouldPreventDefault','EXR','_smooth','catchLoadError','ParseClassNotetags','ActorRect','randomJS','Game_Action_setAttack','ShowDevTools','isInputting','maxLevel','offsetX','currentClass','xparamPlus','_colorCache','pages','shake','EXCLAMATION','setWindowPadding','BarOffset','_bgmBuffer','_inBattle','TGR','object','hide','ItemBgType','_originalViewport','OptionsRect','TextManager_param','getCoreEngineScreenShakeStyle','isAutoColorAffected','F22','_statusParamsWindow','encounterStepsMinimum','isPreserveTp','buttonAssistText4','Window_ShopSell_isEnabled','AllMaps','PictureShowIcon','_sellWindow','_stored_deathColor','Skill-%1-%2','blendFunc','isNormalPriority','Settings','isKeyItem','sqrt','startNormalGame','PGDN','pan','setColorTone','itemBackColor1','Conditional\x20Branch\x20Script\x20Error','en-US','Graphics','Game_Picture_initBasic','paramWidth','targetX','onEscapeSuccess','_shakePower','titleCommandWindow','GREATER_THAN','playTestShiftT','NoTileShadows','setupScrollBarBitmap','initMembersCoreEngine','Bitmap_drawTextOutline','isEnabled','_clickHandler','_storedStack','cursorPagedown','checkScrollBarBitmap','drawParamName','expGaugeColor1','IconParam1','ItemHeight','7wtSZmy','updateFauxAnimations','SwitchToggleRange','StatusMenu','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','refreshScrollBarBitmap','_stored_mpGaugeColor2','destroyContents','Window_NameInput_processHandling','pendingColor','Smooth','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','numActions','paramY','_currentBgs','setSideView','SCROLLBAR','writeFile','PictureID','prototype','drawItem','DELETE','_anchor','removeOnceParallelInterpreter','_pictureCoordinatesWindow','CNT','TextJS','parameters','scrollbar','isSideView','parseForcedGameTroopSettingsCoreEngine','drawActorClass','xparamRateJS','scrollRight','META','pixelated','ParseWeaponNotetags','buyWindowRect','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','WIN_OEM_WSCTRL','setupCoreEngine','retrievePointAnimation','MaxDuration','createBuffer','SystemLoadImages','cos','processSoundTimings','PHA','Game_Interpreter_command105','ColSpacing','centerCameraCheckData','BasicParameterFormula','FadeSpeed','SkillMenu','adjustPictureAntiZoom','_offsetX','1.4.4','Sprite_Animation_processSoundTimings','_forcedBattleSys','normalColor','loadBitmapCoreEngine','switchModes','_stored_systemColor','itemHeight','process_VisuMZ_CoreEngine_Notetags','list','EnableJS','Window_Selectable_cursorUp','getTileExtendTerrainTags','SystemSetWindowPadding','consumeItem','BattleSystem','MDR','updateFrameCoreEngine','waiting','ForceNoPlayTest','SParamVocab4','updateData','Plus1','snapForBackground','Wait','_destroyInternalTextures','initialBattleSystem','_repositioned','ParamChange','horzJS','Bitmap_clearRect','DisplayedParams','Flat2','3438358szjITV','CLOSE_PAREN','Window_Selectable_processCursorMove','onButtonImageLoad','NumberRect','ActorHPColor','IconXParam1','OpenConsole','movePageButtonSideButtonLayout','statusEquipWindowRect','SnapshotOpacity','Game_Screen_initialize','drawValue','QwertyLayout','BlurFilter','getParameter','axes','Window_SkillList_includes','subject','makeDeepCopy','retreat','TAB','HelpBgType','offOpacity','eventsXyNt','floor','isLoopHorizontal','PA1','ScaleX','process_VisuMZ_CoreEngine_CustomParameters','tpColor','ShiftR_Toggle','Tilemap_addShadow','parallaxes','createButtonAssistWindow','background','Window_Base_createTextState','addCommand','tileHeight','backspace','InputRect','WIN_OEM_JUMP','blt','VisuMZ_2_BattleSystemOTB','ImgLoad','expParams','_pageupButton','_profileWindow','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','CoreEngine','_textQueue','advanced','visible','_customModified','\x0a\x0a\x0a\x0a\x0a','maxLvGaugeColor1','STB','playTestF6','animationBaseDelay','repositionCancelButtonSideButtonLayout','useFontWidthFix','prepareNextScene','KeyTAB','_scrollDuration','MRF','endBattlerActions','xScrollLinkedOffset','systemColor','_animationQueue','_storedMapText','description','inputWindowRect','removeFauxAnimation','ShowActorLevel','textBaseline','COLON','resize','isPlaying','App','SHIFT','F21','indexOf','%1\x0a','mainAreaHeightSideButtonLayout','checkPassage','helpAreaTop','mainAreaTopSideButtonLayout','_mirror','Enemy','_commandWindow','CheckSplitEscape','ColorMaxLvGauge2','KeyUnlisted','erasePicture','CAPSLOCK','targetScaleY','isEnemy','updateMotion','SLEEP','_baseSprite','startAnimation','isBusy','updateWaitMode','PictureRotateBy','addEventListener','KEEP','_pagedownButton','process_VisuMZ_CoreEngine_Functions','MainMenu','Rate1','defaultInputMode','statusWindowRect','_anglePlus','INOUTEXPO','join','WIN_ICO_00','paramMaxJS','updateOrigin','exec','buttonAssistKey5','padding','ExtractStrFromList','meVolume','Scene_Base_terminateAnimationClearBugFix','EscapeAlways','ExportStrFromAllTroops','218547DbtwXI','Window_NumberInput_processDigitChange','OUTEXPO','smoothSelect','deflate','test','PERCENT','INCIRC','HELP','_helpWindow','updatePositionCoreEngineShakeVert','goldWindowRect','BattleManager_invokeCounterAttack','CONTEXT_MENU','text','Input_shouldPreventDefault','createAnimationSprite','VisuMZ_2_BattleSystemBTB','isRightInputMode','isOpen','_stored_tpGaugeColor2','bgsVolume','ctrl','ARRAYSTRUCT','_pictureName','gradientFillRect','bgmVolume','INOUTCUBIC','SystemLoadAudio','StatusBgType','gameTitle','useDigitGrouping','padZero','_targetScaleX','#%1','ItemStyle','_playtestF7Looping','Padding','ARRAYSTR','_target','SceneManager_initialize','Scene_Shop_create','anchor','height','_previousClass','F16','setCommonEvent','onlyfilename','buttonAssistKey4','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','pictures','_image','_tileExtendTerrainTags','round','_texture','drawActorNickname','Show\x20Scrolling\x20Text\x20Script\x20Error','setViewportCoreEngineFix','Basic','inbounce','DataManager_setupNewGame','wholeDuration','drawCurrentParam','default','determineSideButtonLayoutValid','_onKeyPress','_categoryWindow','this.paramBase(0)','playBuzzer','areTileShadowsHidden','_displayedPassageError','command111','Exported_Script_%1.txt','Scene_Map_createMenuButton','xparam','Game_BattlerBase_refresh','ColorMPGauge2','SwitchToggleOne','_addSpotTile','original','apply','create','buttonAssistText1','F17','requestPointAnimation','CustomParamNames','_maxDigits','isTouchedInsideFrame','\x20Origin:\x20%1','traitsPi','updateDashToggle','processFauxAnimationRequests','_pointAnimationQueue','down2','GoldRect','Game_Picture_calcEasing','BarThickness','Game_Interpreter_PluginCommand','_targets','_stored_expGaugeColor2','windowOpacity','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','maxScrollX','initCoreEngineScreenShake','isMaxLevel','_windowskin','ParseItemNotetags','DigitGroupingLocale','Scene_MenuBase_createPageButtons','isSpecialCode','targets','BgType','isActor','updateAnglePlus','ONE','isRepeated','OkText','IconXParam3','ItemRect','createCommandWindow','_dimmerSprite','_refreshBack','Graphics_centerElement','blockWidth','getBackgroundOpacity','BlendMode','GameEnd','getCustomBackgroundSettings','scaleY','_stored_ctGaugeColor2','_animation','setGuard','SmartEventCollisionPriority','data/','mhp','ExportCurMapText','split','Game_Picture_angle','OnLoadJS','DimColor1','CRSEL','resetFontSettings','_shiftY','isNwjs','ParseArmorNotetags','targetEvaRate','Gold','EXECUTE','F14','LevelUpFullMp','NewGameBoot','setHome','hasEncryptedImages','createExtendedTileSprite','WIN_OEM_FINISH','paramFlatBonus','note','Version','WIN_ICO_HELP','_backSprite','initRotationCoreEngine','CustomParamType','%1〘End\x20Choice\x20Selection〙%1','sparamFlatBonus','Sprite_Picture_updateOrigin','createPointAnimationTargets','Window_NameInput_cursorDown','Bitmap_initialize','0.00','Game_Actor_paramBase','_isWindow','text%1','areButtonsHidden','processAlwaysEscape','IconSParam0','children','Game_Troop_setup','BattleManager_checkSubstitute','checkSmartEventCollision','removeAllPointAnimations','OS_KEY','font','Game_Unit_onBattleStart','ActorBgType','PTB','Game_Temp_initialize','_paramPlus','successRate','DECIMAL','maxTp','drawParamText','allowShiftScrolling','KANA','ParamMax','seVolume','isPlaytest','length','OutlineColorDmg','ScreenResolution','catchException','AnimationMirrorOffset','bgs','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','paramRate2','cursorPageup','_data','VIEWPORT','_scrollBarVert','_pictureContainer','F24','itemBackColor2','arePageButtonsEnabled','SkillTypeBgType','MCR','isActiveTpb','VisuMZ_2_BattleSystemETB','destroyCoreEngineMarkedBitmaps','stringKeyMap','jsQuickFunc','buttonAssistOk','updatePositionCoreEngine','NUMPAD8','GoldChange','createTilemap','WIN_OEM_PA3','getLastUsedGamepadType','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','processTouch','sparamPlus1','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','playLoad','BgFilename2','isPhysical','addAnimationSpriteToContainer','DummyRect','_lastScrollBarValues','isSideButtonLayout','_sideButtonLayout','selectLast','fadeSpeed','moveMenuButtonSideButtonLayout','setupCoreEasing','enemies','CreateBattleSystemID','WIN_OEM_ATTN','Weapon-%1-%2','pagedown','isInstanceOfSceneMap','GoldMax','reduce','faces','paramRate','initButtonHidden','hit','onBattleStart','MAXHP','_actor','loadBitmap','activate','changeTextColor','clearTp','VOLUME_DOWN','ColorExpGauge2','this.paramBase(2)','setupRate','_offsetY','QoL','MAX_SAFE_INTEGER','doesNameContainBannedWords','setClickHandler','Window_NameInput_initialize','applyEasingAnglePlus','removeAllFauxAnimations','_spriteset','WIN_OEM_PA2','INOUTELASTIC','F13','_stored_pendingColor','isUseModernControls','createTroopNote','SParamVocab0','originalJS','loadTileBitmap','centerX','SETTINGS','CallHandlerJS','isItemStyle','xparamFlat2','_clientArea','ColorCTGauge2','xparamRate','KeyboardInput','Window_NameInput_cursorLeft','_fauxAnimationSprites','_addShadow','clamp','expGaugeColor2','drawActorExpGauge','Scene_Boot_updateDocumentTitle','Manual','_destroyCanvas','buttonAssistWindowSideRect','contentsBack','createFauxAnimation','paramMax','measureTextWidthNoRounding','_effectsContainer','reservePlayTestNewGameCommonEvent','skillId','animations','cursorUp','checkSubstitute','SellBgType','close','SceneManager_isGameActive','destroy','NameInputMessage','DTB','ParseActorNotetags','drawAllParams','sv_actors','itypeId','_context','_cancelButton','_isButtonHidden','makeTargetSprites','targetContentsOpacity','processPointAnimationRequests','calcEasing','showPointAnimations','MinDuration','setBackgroundType','Scene_Battle_createSpriteset','itemHit','measureTextWidth','F20','_mapNameWindow','wtypeId','Spriteset_Base_isAnimationPlaying','Scene_Map_shouldAutosave','RequireFocus','Game_Interpreter_command122','Key%1','charCode','onMoveEnd','SParamVocab1','_buyWindow','Chance','OUTQUART','loadTitle1','xparamRate2','_realScale','ColorHPGauge1','CLOSE_CURLY_BRACKET','removeTileExtendSprites','gaugeBackColor','buttonAreaHeight','_lastIconIndex','_inputSpecialKeyCode','initRotation','2492TdVHyf','setup','updatePositionCoreEngineShakeRand','SwitchRandomizeRange','createSubSprite','playtestQuickLoad','Scene_Equip_create','BottomButtons','scale','UNDERSCORE','Sprite_StateIcon_updateFrame','IconParam7','startAutoNewGame','ARRAYFUNC','eva','alpha','ShiftT_Toggle','_height','getButtonAssistLocation','BattleManager_update','Sprite_Animation_setViewport','Scene_Map_initialize','updateBgsParameters','setMoveEasingType','getControllerInputButtonString','goto','markCoreEngineModified','INOUTQUART','CTRL','Window_NameInput_cursorRight','destroyScrollBarBitmaps','IconSParam9','NUMPAD3','_digitGrouping','NameMenu','sv_enemies','Window_Base_drawCharacter','Game_Map_scrollRight','Location','ColorManager_loadWindowskin','72990gRCcWB','NewGameCommonEvent','scaleSprite','ExtractStrFromTroop','Window_Base_update','this.paramBase(3)','showFauxAnimations','RPGMAKER_VERSION','setSize','UpdatePictureCoordinates','endAnimation','shouldAutosave','easingType'];_0x4c1e=function(){return _0x4dd59b;};return _0x4c1e();};$onceParallel=function(_0x387e11,_0x49b425){const _0x178431=_0x555f1c;if(SceneManager['isSceneMap']())SceneManager[_0x178431(0x7b9)]['playOnceParallelInterpreter'](_0x387e11,_0x49b425);else{if(SceneManager['isSceneBattle']()){if(Imported[_0x178431(0x189)])SceneManager['_scene'][_0x178431(0x225)](_0x387e11);else $gameTemp&&$gameTemp[_0x178431(0x6d5)]()&&alert(_0x178431(0x5c4));}else $gameTemp&&$gameTemp['isPlaytest']()&&alert('This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!');}},StorageManager[_0x555f1c(0x21a)]=function(_0x1a5ac7){return new Promise((_0x28de42,_0x1f1628)=>{const _0x54381b=_0x233d;try{const _0x11d2b4=pako[_0x54381b(0x616)](_0x1a5ac7,{'to':_0x54381b(0x28f),'level':0x1});if(_0x11d2b4[_0x54381b(0x6d6)]>=0xc350){}_0x28de42(_0x11d2b4);}catch(_0x1f47e8){_0x1f1628(_0x1f47e8);}});},TextManager[_0x555f1c(0x6eb)]=['','','','CANCEL','','',_0x555f1c(0x61a),'',_0x555f1c(0x46c),_0x555f1c(0x5a9),'','',_0x555f1c(0x3a4),_0x555f1c(0x7f6),_0x555f1c(0x178),'',_0x555f1c(0x5e3),_0x555f1c(0x796),_0x555f1c(0x4c9),_0x555f1c(0x81a),_0x555f1c(0x5f2),_0x555f1c(0x6d2),_0x555f1c(0x428),_0x555f1c(0x7e7),_0x555f1c(0x226),'HANJA','','ESC','CONVERT','NONCONVERT',_0x555f1c(0x413),_0x555f1c(0x19f),'SPACE',_0x555f1c(0x361),_0x555f1c(0x51f),_0x555f1c(0x34c),_0x555f1c(0x42b),'LEFT','UP',_0x555f1c(0x242),_0x555f1c(0x4e4),'SELECT',_0x555f1c(0x3af),_0x555f1c(0x6a5),'PRINTSCREEN',_0x555f1c(0x262),_0x555f1c(0x550),'','0','1','2','3','4','5','6','7','8','9',_0x555f1c(0x5df),'SEMICOLON',_0x555f1c(0x43a),_0x555f1c(0x8c9),_0x555f1c(0x52c),_0x555f1c(0x2a4),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x555f1c(0x6c6),'',_0x555f1c(0x61f),'',_0x555f1c(0x5f6),'NUMPAD0',_0x555f1c(0x3f3),_0x555f1c(0x17d),_0x555f1c(0x79a),_0x555f1c(0x182),'NUMPAD5','NUMPAD6',_0x555f1c(0x126),_0x555f1c(0x6ef),_0x555f1c(0x8ce),'MULTIPLY',_0x555f1c(0x238),'SEPARATOR',_0x555f1c(0x84a),_0x555f1c(0x6ce),_0x555f1c(0x3e5),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x555f1c(0x805),_0x555f1c(0x4e2),_0x555f1c(0x4aa),_0x555f1c(0x726),_0x555f1c(0x6a6),_0x555f1c(0x159),_0x555f1c(0x63f),_0x555f1c(0x665),_0x555f1c(0x8de),_0x555f1c(0x274),_0x555f1c(0x761),_0x555f1c(0x5e4),_0x555f1c(0x50e),_0x555f1c(0x10d),_0x555f1c(0x6e3),'','','','','','','','',_0x555f1c(0x38e),_0x555f1c(0x218),'WIN_OEM_FJ_JISHO','WIN_OEM_FJ_MASSHOU',_0x555f1c(0x8dd),_0x555f1c(0x2c1),_0x555f1c(0x3de),'','','','','','','','','','CIRCUMFLEX',_0x555f1c(0x500),_0x555f1c(0x36b),_0x555f1c(0x173),_0x555f1c(0x849),_0x555f1c(0x618),_0x555f1c(0x40a),_0x555f1c(0x783),_0x555f1c(0x425),_0x555f1c(0x595),_0x555f1c(0x1e9),_0x555f1c(0x24e),'PIPE',_0x555f1c(0x809),'OPEN_CURLY_BRACKET',_0x555f1c(0x773),'TILDE','','','','',_0x555f1c(0x21d),_0x555f1c(0x717),_0x555f1c(0x135),'','',_0x555f1c(0x161),_0x555f1c(0x8c9),_0x555f1c(0x25a),'MINUS','PERIOD','SLASH',_0x555f1c(0x2ec),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x555f1c(0x379),'BACK_SLASH',_0x555f1c(0x395),_0x555f1c(0x830),'',_0x555f1c(0x55d),'ALTGR','',_0x555f1c(0x6b0),_0x555f1c(0x607),'',_0x555f1c(0x7e5),'','',_0x555f1c(0x7b4),_0x555f1c(0x5bd),'WIN_OEM_PA1',_0x555f1c(0x724),_0x555f1c(0x6f2),_0x555f1c(0x562),_0x555f1c(0x7e6),_0x555f1c(0x706),_0x555f1c(0x6ac),'WIN_OEM_COPY',_0x555f1c(0x8a6),_0x555f1c(0x2fe),_0x555f1c(0x40f),_0x555f1c(0x33b),_0x555f1c(0x69e),_0x555f1c(0x254),_0x555f1c(0x89d),'PLAY',_0x555f1c(0x48c),'',_0x555f1c(0x5af),_0x555f1c(0x7c2),''],TextManager[_0x555f1c(0x6ed)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)]['ButtonAssist'][_0x555f1c(0x686)],TextManager['buttonAssistCancel']=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)]['ButtonAssist']['CancelText'],TextManager[_0x555f1c(0x30a)]=VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x879)][_0x555f1c(0x80e)],VisuMZ['CoreEngine']['TextManager_param']=TextManager[_0x555f1c(0x3dd)],TextManager[_0x555f1c(0x3dd)]=function(_0x3ac971){const _0x1428cd=_0x555f1c;return typeof _0x3ac971==='number'?VisuMZ[_0x1428cd(0x5c5)][_0x1428cd(0x50b)]['call'](this,_0x3ac971):this[_0x1428cd(0x261)](_0x3ac971);},TextManager[_0x555f1c(0x261)]=function(_0x1adb20){const _0x3dc755=_0x555f1c;_0x1adb20=String(_0x1adb20||'')[_0x3dc755(0x48a)]();const _0x10c256=VisuMZ[_0x3dc755(0x5c5)]['Settings'][_0x3dc755(0x289)];if(_0x1adb20===_0x3dc755(0x711))return $dataSystem[_0x3dc755(0x7e9)][_0x3dc755(0x88b)][0x0];if(_0x1adb20===_0x3dc755(0x853))return $dataSystem[_0x3dc755(0x7e9)][_0x3dc755(0x88b)][0x1];if(_0x1adb20===_0x3dc755(0x31b))return $dataSystem[_0x3dc755(0x7e9)][_0x3dc755(0x88b)][0x2];if(_0x1adb20===_0x3dc755(0x363))return $dataSystem['terms'][_0x3dc755(0x88b)][0x3];if(_0x1adb20==='MAT')return $dataSystem['terms']['params'][0x4];if(_0x1adb20===_0x3dc755(0x460))return $dataSystem['terms'][_0x3dc755(0x88b)][0x5];if(_0x1adb20===_0x3dc755(0x1e2))return $dataSystem[_0x3dc755(0x7e9)][_0x3dc755(0x88b)][0x6];if(_0x1adb20==='LUK')return $dataSystem[_0x3dc755(0x7e9)]['params'][0x7];if(_0x1adb20===_0x3dc755(0x4cd))return _0x10c256[_0x3dc755(0x48b)];if(_0x1adb20===_0x3dc755(0x18f))return _0x10c256['XParamVocab1'];if(_0x1adb20===_0x3dc755(0xf8))return _0x10c256[_0x3dc755(0x378)];if(_0x1adb20===_0x3dc755(0x7ce))return _0x10c256[_0x3dc755(0x8af)];if(_0x1adb20==='MEV')return _0x10c256[_0x3dc755(0x2f9)];if(_0x1adb20===_0x3dc755(0x5d4))return _0x10c256[_0x3dc755(0x899)];if(_0x1adb20==='CNT')return _0x10c256[_0x3dc755(0x105)];if(_0x1adb20==='HRG')return _0x10c256['XParamVocab7'];if(_0x1adb20===_0x3dc755(0x80c))return _0x10c256[_0x3dc755(0x232)];if(_0x1adb20===_0x3dc755(0x39a))return _0x10c256[_0x3dc755(0x2e5)];if(_0x1adb20==='TGR')return _0x10c256[_0x3dc755(0x72a)];if(_0x1adb20===_0x3dc755(0x462))return _0x10c256[_0x3dc755(0x76b)];if(_0x1adb20===_0x3dc755(0x1e4))return _0x10c256['SParamVocab2'];if(_0x1adb20===_0x3dc755(0x56a))return _0x10c256[_0x3dc755(0x2ed)];if(_0x1adb20==='MCR')return _0x10c256[_0x3dc755(0x587)];if(_0x1adb20===_0x3dc755(0x434))return _0x10c256[_0x3dc755(0x464)];if(_0x1adb20===_0x3dc755(0x4a2))return _0x10c256[_0x3dc755(0x2cd)];if(_0x1adb20===_0x3dc755(0x583))return _0x10c256[_0x3dc755(0x32a)];if(_0x1adb20==='FDR')return _0x10c256[_0x3dc755(0x23d)];if(_0x1adb20==='EXR')return _0x10c256[_0x3dc755(0x391)];if(VisuMZ['CoreEngine'][_0x3dc755(0x667)][_0x1adb20])return VisuMZ[_0x3dc755(0x5c5)][_0x3dc755(0x667)][_0x1adb20];return'';},TextManager[_0x555f1c(0x1ea)]=function(_0x151d7d){const _0x3229f9=_0x555f1c,_0x49bc2f=Input[_0x3229f9(0x6f3)]();return _0x49bc2f===_0x3229f9(0x2bf)?this[_0x3229f9(0x82e)](_0x151d7d):this[_0x3229f9(0x792)](_0x49bc2f,_0x151d7d);},TextManager[_0x555f1c(0x82e)]=function(_0x2b9646){const _0xee3888=_0x555f1c;let _0xe36091=VisuMZ['CoreEngine'][_0xee3888(0x51b)][_0xee3888(0x879)][_0xee3888(0x2be)];if(!_0xe36091){if(_0x2b9646===_0xee3888(0x201))_0x2b9646=_0xee3888(0x864);if(_0x2b9646===_0xee3888(0x445))_0x2b9646='escape';}let _0x594d32=[];for(let _0x1bf8d4 in Input['keyMapper']){_0x1bf8d4=Number(_0x1bf8d4);if(_0x1bf8d4>=0x60&&_0x1bf8d4<=0x69)continue;if([0x12,0x20]['includes'](_0x1bf8d4))continue;_0x2b9646===Input['keyMapper'][_0x1bf8d4]&&_0x594d32[_0xee3888(0x45f)](_0x1bf8d4);}for(let _0x26dd66=0x0;_0x26dd66<_0x594d32[_0xee3888(0x6d6)];_0x26dd66++){_0x594d32[_0x26dd66]=TextManager[_0xee3888(0x6eb)][_0x594d32[_0x26dd66]];}return this['makeInputButtonString'](_0x594d32);},TextManager[_0x555f1c(0x87c)]=function(_0x4e59af){const _0x5a7c65=_0x555f1c,_0x950c11=VisuMZ[_0x5a7c65(0x5c5)][_0x5a7c65(0x51b)][_0x5a7c65(0x879)],_0x532b16=_0x950c11[_0x5a7c65(0x5f0)];let _0x9a81d0='';if(_0x4e59af[_0x5a7c65(0x484)]('UP'))_0x9a81d0='UP';else{if(_0x4e59af[_0x5a7c65(0x484)](_0x5a7c65(0x4e4)))_0x9a81d0=_0x5a7c65(0x4e4);else{if(_0x4e59af[_0x5a7c65(0x484)]('LEFT'))_0x9a81d0='LEFT';else _0x4e59af[_0x5a7c65(0x484)]('RIGHT')?_0x9a81d0='RIGHT':_0x9a81d0=_0x4e59af[_0x5a7c65(0x2c9)]();}}const _0x291444=_0x5a7c65(0x768)['format'](_0x9a81d0);return _0x950c11[_0x291444]?_0x950c11[_0x291444]:_0x532b16[_0x5a7c65(0x39f)](_0x9a81d0);},TextManager['getInputMultiButtonStrings']=function(_0x51bc5e,_0x53b72d){const _0x5a6840=_0x555f1c,_0x5da378=VisuMZ[_0x5a6840(0x5c5)][_0x5a6840(0x51b)][_0x5a6840(0x879)],_0x3f8a10=_0x5da378[_0x5a6840(0x812)],_0x18a82f=this[_0x5a6840(0x1ea)](_0x51bc5e),_0x2a1642=this[_0x5a6840(0x1ea)](_0x53b72d);return _0x3f8a10[_0x5a6840(0x39f)](_0x18a82f,_0x2a1642);},TextManager[_0x555f1c(0x792)]=function(_0x305b09,_0x6cf946){const _0x3e5b11=_0x555f1c,_0x5b5316=_0x305b09[_0x3e5b11(0x1f9)]()[_0x3e5b11(0x26b)](),_0x419000=VisuMZ[_0x3e5b11(0x5c5)]['ControllerButtons'][_0x5b5316];if(!_0x419000)return this[_0x3e5b11(0x8a2)](_0x305b09,_0x6cf946);return _0x419000[_0x6cf946]||this[_0x3e5b11(0x82e)](_0x305b09,_0x6cf946);},TextManager[_0x555f1c(0x8a2)]=function(_0x1bce02,_0x1ccd4b){const _0x224e09=_0x555f1c,_0x165da4=_0x1bce02[_0x224e09(0x1f9)]()['trim']();for(const _0x4f92b1 in VisuMZ['CoreEngine']['ControllerMatches']){if(_0x165da4['includes'](_0x4f92b1)){const _0xe52f95=VisuMZ[_0x224e09(0x5c5)][_0x224e09(0x41c)][_0x4f92b1],_0x56d150=VisuMZ['CoreEngine'][_0x224e09(0x2b6)][_0xe52f95];return _0x56d150[_0x1ccd4b]||this[_0x224e09(0x82e)](_0x1ccd4b);}}return this[_0x224e09(0x82e)](_0x1ccd4b);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x7a1)]=ColorManager[_0x555f1c(0x1ab)],ColorManager['loadWindowskin']=function(){const _0x2c3f4b=_0x555f1c;VisuMZ[_0x2c3f4b(0x5c5)][_0x2c3f4b(0x7a1)]['call'](this),this[_0x2c3f4b(0x4fd)]=this[_0x2c3f4b(0x4fd)]||{};},ColorManager[_0x555f1c(0x451)]=function(_0xdd7294,_0xd4c16){const _0xb1cd50=_0x555f1c;return _0xd4c16=String(_0xd4c16),this[_0xb1cd50(0x4fd)]=this[_0xb1cd50(0x4fd)]||{},_0xd4c16['match'](/#(.*)/i)?this[_0xb1cd50(0x4fd)][_0xdd7294]=_0xb1cd50(0x634)['format'](String(RegExp['$1'])):this[_0xb1cd50(0x4fd)][_0xdd7294]=this[_0xb1cd50(0x268)](Number(_0xd4c16)),this[_0xb1cd50(0x4fd)][_0xdd7294];},ColorManager[_0x555f1c(0x3f5)]=function(_0x466013){const _0x48a17c=_0x555f1c;return _0x466013=String(_0x466013),_0x466013[_0x48a17c(0x3b6)](/#(.*)/i)?_0x48a17c(0x634)[_0x48a17c(0x39f)](String(RegExp['$1'])):this[_0x48a17c(0x268)](Number(_0x466013));},ColorManager[_0x555f1c(0x3b4)]=function(){const _0x58bec6=_0x555f1c;this[_0x58bec6(0x4fd)]={};},ColorManager[_0x555f1c(0x576)]=function(){const _0x337bed=_0x555f1c,_0x1da080=_0x337bed(0x1c5);this[_0x337bed(0x4fd)]=this[_0x337bed(0x4fd)]||{};if(this[_0x337bed(0x4fd)][_0x1da080])return this[_0x337bed(0x4fd)][_0x1da080];const _0x56a0b6=VisuMZ['CoreEngine'][_0x337bed(0x51b)][_0x337bed(0x2f7)][_0x337bed(0x886)];return this[_0x337bed(0x451)](_0x1da080,_0x56a0b6);},ColorManager[_0x555f1c(0x5d7)]=function(){const _0x3a145d=_0x555f1c,_0x5e7b3e=_0x3a145d(0x579);this[_0x3a145d(0x4fd)]=this[_0x3a145d(0x4fd)]||{};if(this[_0x3a145d(0x4fd)][_0x5e7b3e])return this['_colorCache'][_0x5e7b3e];const _0x88ed6f=VisuMZ[_0x3a145d(0x5c5)][_0x3a145d(0x51b)][_0x3a145d(0x2f7)]['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x5e7b3e,_0x88ed6f);},ColorManager[_0x555f1c(0x110)]=function(){const _0x233fbb=_0x555f1c,_0x50f32b=_0x233fbb(0x2d5);this[_0x233fbb(0x4fd)]=this['_colorCache']||{};if(this[_0x233fbb(0x4fd)][_0x50f32b])return this[_0x233fbb(0x4fd)][_0x50f32b];const _0x444aa3=VisuMZ[_0x233fbb(0x5c5)][_0x233fbb(0x51b)][_0x233fbb(0x2f7)][_0x233fbb(0xed)];return this[_0x233fbb(0x451)](_0x50f32b,_0x444aa3);},ColorManager['deathColor']=function(){const _0x4fb13b=_0x555f1c,_0x2ac7c7=_0x4fb13b(0x517);this[_0x4fb13b(0x4fd)]=this[_0x4fb13b(0x4fd)]||{};if(this[_0x4fb13b(0x4fd)][_0x2ac7c7])return this[_0x4fb13b(0x4fd)][_0x2ac7c7];const _0x5de1fc=VisuMZ[_0x4fb13b(0x5c5)][_0x4fb13b(0x51b)][_0x4fb13b(0x2f7)][_0x4fb13b(0x80d)];return this[_0x4fb13b(0x451)](_0x2ac7c7,_0x5de1fc);},ColorManager[_0x555f1c(0x775)]=function(){const _0x5d3feb=_0x555f1c,_0x1838cd=_0x5d3feb(0x13c);this[_0x5d3feb(0x4fd)]=this[_0x5d3feb(0x4fd)]||{};if(this[_0x5d3feb(0x4fd)][_0x1838cd])return this['_colorCache'][_0x1838cd];const _0x7ba727=VisuMZ[_0x5d3feb(0x5c5)][_0x5d3feb(0x51b)][_0x5d3feb(0x2f7)][_0x5d3feb(0x3fb)];return this[_0x5d3feb(0x451)](_0x1838cd,_0x7ba727);},ColorManager[_0x555f1c(0x7e1)]=function(){const _0x3a742e=_0x555f1c,_0x403cde='_stored_hpGaugeColor1';this[_0x3a742e(0x4fd)]=this[_0x3a742e(0x4fd)]||{};if(this[_0x3a742e(0x4fd)][_0x403cde])return this['_colorCache'][_0x403cde];const _0x16a635=VisuMZ['CoreEngine'][_0x3a742e(0x51b)][_0x3a742e(0x2f7)][_0x3a742e(0x772)];return this[_0x3a742e(0x451)](_0x403cde,_0x16a635);},ColorManager[_0x555f1c(0x305)]=function(){const _0x27d3c2=_0x555f1c,_0x49b9ed=_0x27d3c2(0x114);this[_0x27d3c2(0x4fd)]=this['_colorCache']||{};if(this['_colorCache'][_0x49b9ed])return this['_colorCache'][_0x49b9ed];const _0x4d013d=VisuMZ[_0x27d3c2(0x5c5)][_0x27d3c2(0x51b)][_0x27d3c2(0x2f7)][_0x27d3c2(0x196)];return this[_0x27d3c2(0x451)](_0x49b9ed,_0x4d013d);},ColorManager[_0x555f1c(0x122)]=function(){const _0x109abf=_0x555f1c,_0x56a30c='_stored_mpGaugeColor1';this[_0x109abf(0x4fd)]=this[_0x109abf(0x4fd)]||{};if(this[_0x109abf(0x4fd)][_0x56a30c])return this['_colorCache'][_0x56a30c];const _0x52afa7=VisuMZ[_0x109abf(0x5c5)][_0x109abf(0x51b)][_0x109abf(0x2f7)][_0x109abf(0x4be)];return this[_0x109abf(0x451)](_0x56a30c,_0x52afa7);},ColorManager['mpGaugeColor2']=function(){const _0x19fefc=_0x555f1c,_0x2e78be=_0x19fefc(0x541);this['_colorCache']=this[_0x19fefc(0x4fd)]||{};if(this[_0x19fefc(0x4fd)][_0x2e78be])return this[_0x19fefc(0x4fd)][_0x2e78be];const _0x1d68a3=VisuMZ[_0x19fefc(0x5c5)]['Settings'][_0x19fefc(0x2f7)][_0x19fefc(0x65e)];return this[_0x19fefc(0x451)](_0x2e78be,_0x1d68a3);},ColorManager['mpCostColor']=function(){const _0x4dc877=_0x555f1c,_0x581e3b='_stored_mpCostColor';this[_0x4dc877(0x4fd)]=this['_colorCache']||{};if(this['_colorCache'][_0x581e3b])return this[_0x4dc877(0x4fd)][_0x581e3b];const _0x147a2e=VisuMZ[_0x4dc877(0x5c5)][_0x4dc877(0x51b)]['Color']['ColorMPCost'];return this[_0x4dc877(0x451)](_0x581e3b,_0x147a2e);},ColorManager[_0x555f1c(0x3c4)]=function(){const _0x3c4b32=_0x555f1c,_0x462d17=_0x3c4b32(0x852);this[_0x3c4b32(0x4fd)]=this['_colorCache']||{};if(this['_colorCache'][_0x462d17])return this[_0x3c4b32(0x4fd)][_0x462d17];const _0x16cd83=VisuMZ[_0x3c4b32(0x5c5)][_0x3c4b32(0x51b)][_0x3c4b32(0x2f7)][_0x3c4b32(0x406)];return this[_0x3c4b32(0x451)](_0x462d17,_0x16cd83);},ColorManager['powerDownColor']=function(){const _0x1a27f0=_0x555f1c,_0x242ef4='_stored_powerDownColor';this[_0x1a27f0(0x4fd)]=this[_0x1a27f0(0x4fd)]||{};if(this[_0x1a27f0(0x4fd)][_0x242ef4])return this[_0x1a27f0(0x4fd)][_0x242ef4];const _0x3880df=VisuMZ[_0x1a27f0(0x5c5)][_0x1a27f0(0x51b)][_0x1a27f0(0x2f7)][_0x1a27f0(0x4c3)];return this[_0x1a27f0(0x451)](_0x242ef4,_0x3880df);},ColorManager['ctGaugeColor1']=function(){const _0x22fe1f=_0x555f1c,_0x1e2ce4=_0x22fe1f(0x810);this[_0x22fe1f(0x4fd)]=this[_0x22fe1f(0x4fd)]||{};if(this[_0x22fe1f(0x4fd)][_0x1e2ce4])return this[_0x22fe1f(0x4fd)][_0x1e2ce4];const _0x2d9479=VisuMZ['CoreEngine']['Settings']['Color'][_0x22fe1f(0x1f2)];return this[_0x22fe1f(0x451)](_0x1e2ce4,_0x2d9479);},ColorManager['ctGaugeColor2']=function(){const _0x5c1c48=_0x555f1c,_0x46028f=_0x5c1c48(0x693);this[_0x5c1c48(0x4fd)]=this[_0x5c1c48(0x4fd)]||{};if(this[_0x5c1c48(0x4fd)][_0x46028f])return this['_colorCache'][_0x46028f];const _0x15cb14=VisuMZ[_0x5c1c48(0x5c5)][_0x5c1c48(0x51b)]['Color'][_0x5c1c48(0x733)];return this['getColorDataFromPluginParameters'](_0x46028f,_0x15cb14);},ColorManager['tpGaugeColor1']=function(){const _0x2a5b7c=_0x555f1c,_0x2d6c50=_0x2a5b7c(0x7c7);this[_0x2a5b7c(0x4fd)]=this[_0x2a5b7c(0x4fd)]||{};if(this[_0x2a5b7c(0x4fd)][_0x2d6c50])return this[_0x2a5b7c(0x4fd)][_0x2d6c50];const _0x3f38b6=VisuMZ[_0x2a5b7c(0x5c5)][_0x2a5b7c(0x51b)]['Color'][_0x2a5b7c(0x8e3)];return this[_0x2a5b7c(0x451)](_0x2d6c50,_0x3f38b6);},ColorManager[_0x555f1c(0x867)]=function(){const _0x2e8fc3=_0x555f1c,_0x4daf4c=_0x2e8fc3(0x626);this[_0x2e8fc3(0x4fd)]=this[_0x2e8fc3(0x4fd)]||{};if(this[_0x2e8fc3(0x4fd)][_0x4daf4c])return this[_0x2e8fc3(0x4fd)][_0x4daf4c];const _0x42aa11=VisuMZ[_0x2e8fc3(0x5c5)][_0x2e8fc3(0x51b)][_0x2e8fc3(0x2f7)][_0x2e8fc3(0x342)];return this[_0x2e8fc3(0x451)](_0x4daf4c,_0x42aa11);},ColorManager[_0x555f1c(0x293)]=function(){const _0x3ad8de=_0x555f1c,_0x246f77='_stored_tpCostColor';this['_colorCache']=this[_0x3ad8de(0x4fd)]||{};if(this[_0x3ad8de(0x4fd)][_0x246f77])return this[_0x3ad8de(0x4fd)][_0x246f77];const _0x12b39b=VisuMZ['CoreEngine'][_0x3ad8de(0x51b)][_0x3ad8de(0x2f7)][_0x3ad8de(0x29f)];return this[_0x3ad8de(0x451)](_0x246f77,_0x12b39b);},ColorManager[_0x555f1c(0x544)]=function(){const _0x30234d=_0x555f1c,_0x2a90b6=_0x30234d(0x727);this[_0x30234d(0x4fd)]=this[_0x30234d(0x4fd)]||{};if(this[_0x30234d(0x4fd)][_0x2a90b6])return this[_0x30234d(0x4fd)][_0x2a90b6];const _0x339a46=VisuMZ['CoreEngine'][_0x30234d(0x51b)][_0x30234d(0x2f7)][_0x30234d(0x29f)];return this[_0x30234d(0x451)](_0x2a90b6,_0x339a46);},ColorManager[_0x555f1c(0x538)]=function(){const _0x115e58=_0x555f1c,_0x161ffb=_0x115e58(0x2b1);this[_0x115e58(0x4fd)]=this[_0x115e58(0x4fd)]||{};if(this[_0x115e58(0x4fd)][_0x161ffb])return this[_0x115e58(0x4fd)][_0x161ffb];const _0x332e23=VisuMZ['CoreEngine'][_0x115e58(0x51b)][_0x115e58(0x2f7)]['ColorExpGauge1'];return this[_0x115e58(0x451)](_0x161ffb,_0x332e23);},ColorManager[_0x555f1c(0x73a)]=function(){const _0x3587d6=_0x555f1c,_0x4cc5fb=_0x3587d6(0x675);this[_0x3587d6(0x4fd)]=this['_colorCache']||{};if(this[_0x3587d6(0x4fd)][_0x4cc5fb])return this[_0x3587d6(0x4fd)][_0x4cc5fb];const _0x2f6662=VisuMZ['CoreEngine'][_0x3587d6(0x51b)][_0x3587d6(0x2f7)][_0x3587d6(0x718)];return this[_0x3587d6(0x451)](_0x4cc5fb,_0x2f6662);},ColorManager[_0x555f1c(0x5cb)]=function(){const _0xf5cbcb=_0x555f1c,_0x74093f=_0xf5cbcb(0x7b0);this[_0xf5cbcb(0x4fd)]=this[_0xf5cbcb(0x4fd)]||{};if(this[_0xf5cbcb(0x4fd)][_0x74093f])return this[_0xf5cbcb(0x4fd)][_0x74093f];const _0x516946=VisuMZ[_0xf5cbcb(0x5c5)][_0xf5cbcb(0x51b)][_0xf5cbcb(0x2f7)][_0xf5cbcb(0x2e0)];return this[_0xf5cbcb(0x451)](_0x74093f,_0x516946);},ColorManager[_0x555f1c(0x3a1)]=function(){const _0x39b141=_0x555f1c,_0x161219=_0x39b141(0x298);this[_0x39b141(0x4fd)]=this[_0x39b141(0x4fd)]||{};if(this[_0x39b141(0x4fd)][_0x161219])return this['_colorCache'][_0x161219];const _0x23e171=VisuMZ['CoreEngine'][_0x39b141(0x51b)][_0x39b141(0x2f7)][_0x39b141(0x5ef)];return this[_0x39b141(0x451)](_0x161219,_0x23e171);},ColorManager[_0x555f1c(0x8ad)]=function(_0x154ae2){const _0x51874c=_0x555f1c;return VisuMZ[_0x51874c(0x5c5)][_0x51874c(0x51b)][_0x51874c(0x2f7)][_0x51874c(0x599)]['call'](this,_0x154ae2);},ColorManager[_0x555f1c(0x324)]=function(_0xc6d689){const _0x2181cd=_0x555f1c;return VisuMZ[_0x2181cd(0x5c5)][_0x2181cd(0x51b)][_0x2181cd(0x2f7)][_0x2181cd(0x356)][_0x2181cd(0x2b0)](this,_0xc6d689);},ColorManager[_0x555f1c(0x5b2)]=function(_0x51593c){const _0x13c9ad=_0x555f1c;return VisuMZ[_0x13c9ad(0x5c5)]['Settings'][_0x13c9ad(0x2f7)]['ActorTPColor'][_0x13c9ad(0x2b0)](this,_0x51593c);},ColorManager[_0x555f1c(0x43e)]=function(_0x1cea56){const _0x53cb7b=_0x555f1c;return VisuMZ['CoreEngine'][_0x53cb7b(0x51b)][_0x53cb7b(0x2f7)][_0x53cb7b(0x58f)]['call'](this,_0x1cea56);},ColorManager[_0x555f1c(0x4b9)]=function(_0x5b2789){const _0x214382=_0x555f1c;return VisuMZ[_0x214382(0x5c5)][_0x214382(0x51b)][_0x214382(0x2f7)][_0x214382(0x31f)][_0x214382(0x2b0)](this,_0x5b2789);},ColorManager[_0x555f1c(0x377)]=function(){const _0x119d9d=_0x555f1c;return VisuMZ[_0x119d9d(0x5c5)][_0x119d9d(0x51b)][_0x119d9d(0x2f7)][_0x119d9d(0x419)];},ColorManager[_0x555f1c(0x205)]=function(){const _0x2393c9=_0x555f1c;return VisuMZ[_0x2393c9(0x5c5)][_0x2393c9(0x51b)][_0x2393c9(0x2f7)][_0x2393c9(0x6d7)]||_0x2393c9(0x44e);},ColorManager[_0x555f1c(0x285)]=function(){const _0x5e4b77=_0x555f1c;return VisuMZ['CoreEngine']['Settings']['Color'][_0x5e4b77(0x80f)]||_0x5e4b77(0x8b9);},ColorManager[_0x555f1c(0x230)]=function(){const _0x3b88a6=_0x555f1c;return VisuMZ[_0x3b88a6(0x5c5)][_0x3b88a6(0x51b)][_0x3b88a6(0x2f7)][_0x3b88a6(0x69d)];},ColorManager[_0x555f1c(0x7bb)]=function(){const _0x229568=_0x555f1c;return VisuMZ[_0x229568(0x5c5)][_0x229568(0x51b)][_0x229568(0x2f7)]['DimColor2'];},ColorManager[_0x555f1c(0x522)]=function(){const _0x3c0907=_0x555f1c;return VisuMZ['CoreEngine'][_0x3c0907(0x51b)][_0x3c0907(0x2f7)][_0x3c0907(0x4b0)];},ColorManager[_0x555f1c(0x6e4)]=function(){const _0x48be34=_0x555f1c;return VisuMZ['CoreEngine'][_0x48be34(0x51b)][_0x48be34(0x2f7)][_0x48be34(0x894)];},SceneManager[_0x555f1c(0x534)]=[],SceneManager[_0x555f1c(0x345)]=function(){const _0x629135=_0x555f1c;return this[_0x629135(0x7b9)]&&this['_scene'][_0x629135(0x141)]===Scene_Battle;},SceneManager[_0x555f1c(0x85d)]=function(){const _0x3f6deb=_0x555f1c;return this['_scene']&&this[_0x3f6deb(0x7b9)]['constructor']===Scene_Map;},SceneManager[_0x555f1c(0x709)]=function(){const _0x24a2a7=_0x555f1c;return this[_0x24a2a7(0x7b9)]&&this[_0x24a2a7(0x7b9)]instanceof Scene_Map;},VisuMZ['CoreEngine'][_0x555f1c(0x63a)]=SceneManager[_0x555f1c(0x124)],SceneManager[_0x555f1c(0x124)]=function(){const _0x3d419c=_0x555f1c;VisuMZ['CoreEngine'][_0x3d419c(0x63a)][_0x3d419c(0x2b0)](this),this[_0x3d419c(0x1dd)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x1e0)]=SceneManager['onKeyDown'],SceneManager[_0x555f1c(0x4ad)]=function(_0x4e9944){const _0x4b9b3b=_0x555f1c;if($gameTemp)this['onKeyDownKeysF6F7'](_0x4e9944);VisuMZ[_0x4b9b3b(0x5c5)][_0x4b9b3b(0x1e0)][_0x4b9b3b(0x2b0)](this,_0x4e9944);},SceneManager['onKeyDownKeysF6F7']=function(_0x261af3){const _0x592ac1=_0x555f1c;if(!_0x261af3[_0x592ac1(0x192)]&&!_0x261af3['altKey'])switch(_0x261af3[_0x592ac1(0x1bc)]){case 0x52:this[_0x592ac1(0xee)]();break;case 0x54:this[_0x592ac1(0x52d)]();break;case 0x75:this[_0x592ac1(0x5cd)]();break;case 0x76:if(Input[_0x592ac1(0x8bb)]('shift')||Input[_0x592ac1(0x8bb)](_0x592ac1(0x628)))return;this[_0x592ac1(0xfe)]();break;}else{if(_0x261af3['ctrlKey']){let _0x44be0a=_0x261af3[_0x592ac1(0x1bc)];if(_0x44be0a>=0x31&&_0x44be0a<=0x39){const _0x217bde=_0x44be0a-0x30;return SceneManager['playtestQuickLoad'](_0x217bde);}else{if(_0x44be0a>=0x61&&_0x44be0a<=0x69){const _0x5b5c33=_0x44be0a-0x60;return SceneManager[_0x592ac1(0x77f)](_0x5b5c33);}}}}},SceneManager[_0x555f1c(0x5cd)]=function(){const _0x35daeb=_0x555f1c;if($gameTemp[_0x35daeb(0x6d5)]()&&VisuMZ[_0x35daeb(0x5c5)]['Settings'][_0x35daeb(0x71c)][_0x35daeb(0x33c)]){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x35daeb(0x62c)]=0x0,ConfigManager[_0x35daeb(0x627)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x35daeb(0x6d4)]=0x0):(ConfigManager[_0x35daeb(0x62c)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x35daeb(0x60e)]=0x64,ConfigManager['seVolume']=0x64);ConfigManager['save']();if(this[_0x35daeb(0x7b9)][_0x35daeb(0x141)]===Scene_Options){if(this[_0x35daeb(0x7b9)][_0x35daeb(0x4c2)])this[_0x35daeb(0x7b9)][_0x35daeb(0x4c2)]['refresh']();if(this[_0x35daeb(0x7b9)][_0x35daeb(0x1cf)])this[_0x35daeb(0x7b9)][_0x35daeb(0x1cf)][_0x35daeb(0x81e)]();}}},SceneManager[_0x555f1c(0xfe)]=function(){const _0x2b8c1d=_0x555f1c;$gameTemp[_0x2b8c1d(0x6d5)]()&&VisuMZ[_0x2b8c1d(0x5c5)][_0x2b8c1d(0x51b)][_0x2b8c1d(0x71c)][_0x2b8c1d(0x30e)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x2b8c1d(0x121)]);},SceneManager[_0x555f1c(0xee)]=function(){const _0x597e6c=_0x555f1c;if(!VisuMZ[_0x597e6c(0x5c5)][_0x597e6c(0x51b)][_0x597e6c(0x71c)]['ShiftR_Toggle'])return;if(!$gameTemp[_0x597e6c(0x6d5)]())return;if(!SceneManager[_0x597e6c(0x345)]())return;if(!Input[_0x597e6c(0x8bb)](_0x597e6c(0x1eb)))return;for(const _0x201990 of $gameParty[_0x597e6c(0x162)]()){if(!_0x201990)continue;_0x201990[_0x597e6c(0x417)]();}},SceneManager[_0x555f1c(0x52d)]=function(){const _0x54adff=_0x555f1c;if(!VisuMZ['CoreEngine'][_0x54adff(0x51b)][_0x54adff(0x71c)][_0x54adff(0x78a)])return;if(!$gameTemp[_0x54adff(0x6d5)]())return;if(!SceneManager['isSceneBattle']())return;if(!Input[_0x54adff(0x8bb)]('shift'))return;for(const _0x5a09d4 of $gameParty[_0x54adff(0x162)]()){if(!_0x5a09d4)continue;_0x5a09d4['gainSilentTp'](_0x5a09d4[_0x54adff(0x6cf)]());}},SceneManager[_0x555f1c(0x77f)]=function(_0x537e9a){const _0x26b3b9=_0x555f1c;if(!$gameTemp[_0x26b3b9(0x6d5)]())return;if(!DataManager['savefileInfo'](_0x537e9a))return;if(!(VisuMZ[_0x26b3b9(0x5c5)][_0x26b3b9(0x51b)][_0x26b3b9(0x71c)][_0x26b3b9(0x310)]??!![]))return;this['push'](Scene_QuickLoad),this[_0x26b3b9(0x5d1)](_0x537e9a);},SceneManager['initVisuMZCoreEngine']=function(){const _0x394eef=_0x555f1c;this['_sideButtonLayout']=![],this[_0x394eef(0x191)]=!VisuMZ[_0x394eef(0x5c5)]['Settings']['UI'][_0x394eef(0x312)];},SceneManager[_0x555f1c(0x7cc)]=function(_0x94bced){const _0x56cdd4=_0x555f1c;VisuMZ[_0x56cdd4(0x5c5)][_0x56cdd4(0x51b)]['UI'][_0x56cdd4(0x4ed)]&&(this[_0x56cdd4(0x6ff)]=_0x94bced);},SceneManager[_0x555f1c(0x6fe)]=function(){const _0xb8528f=_0x555f1c;return this[_0xb8528f(0x6ff)];},SceneManager[_0x555f1c(0x6be)]=function(){const _0x30a937=_0x555f1c;return this[_0x30a937(0x191)];},SceneManager[_0x555f1c(0x7f2)]=function(){return this['areButtonsHidden']()||this['isSideButtonLayout']();},VisuMZ['CoreEngine']['SceneManager_isGameActive']=SceneManager[_0x555f1c(0x466)],SceneManager[_0x555f1c(0x466)]=function(){const _0x290f15=_0x555f1c;return VisuMZ[_0x290f15(0x5c5)][_0x290f15(0x51b)][_0x290f15(0x71c)][_0x290f15(0x766)]?VisuMZ[_0x290f15(0x5c5)][_0x290f15(0x74c)][_0x290f15(0x2b0)](this):!![];},SceneManager[_0x555f1c(0x6d9)]=function(_0x10f567){const _0x46875c=_0x555f1c;if(_0x10f567 instanceof Error)this[_0x46875c(0x7be)](_0x10f567);else _0x10f567 instanceof Array&&_0x10f567[0x0]===_0x46875c(0x8c7)?this[_0x46875c(0x4f2)](_0x10f567):this[_0x46875c(0x7de)](_0x10f567);this['stop']();},VisuMZ['CoreEngine'][_0x555f1c(0x24c)]=BattleManager[_0x555f1c(0x15c)],BattleManager[_0x555f1c(0x15c)]=function(){const _0x1ecfbe=_0x555f1c;return VisuMZ[_0x1ecfbe(0x5c5)]['Settings'][_0x1ecfbe(0x71c)][_0x1ecfbe(0x610)]?this[_0x1ecfbe(0x6bf)]():VisuMZ[_0x1ecfbe(0x5c5)][_0x1ecfbe(0x24c)][_0x1ecfbe(0x2b0)](this);},BattleManager['processAlwaysEscape']=function(){const _0x543f80=_0x555f1c;return $gameParty['performEscape'](),SoundManager['playEscape'](),this[_0x543f80(0x529)](),!![];},BattleManager[_0x555f1c(0x83b)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x555f1c(0x6e8)]=function(){const _0x30e5a7=_0x555f1c;return $gameSystem[_0x30e5a7(0x11c)]()===0x1;},VisuMZ['CoreEngine'][_0x555f1c(0x6cb)]=Game_Temp[_0x555f1c(0x54e)]['initialize'],Game_Temp['prototype'][_0x555f1c(0x124)]=function(){const _0x1f62ad=_0x555f1c;VisuMZ[_0x1f62ad(0x5c5)][_0x1f62ad(0x6cb)][_0x1f62ad(0x2b0)](this),this['forceOutOfPlaytest'](),this[_0x1f62ad(0x8ae)](),this[_0x1f62ad(0x1f3)]();},Game_Temp[_0x555f1c(0x54e)]['forceOutOfPlaytest']=function(){const _0x9312d2=_0x555f1c;VisuMZ[_0x9312d2(0x5c5)][_0x9312d2(0x51b)][_0x9312d2(0x71c)][_0x9312d2(0x586)]&&(this[_0x9312d2(0x36c)]=![]);},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x458)]=function(_0x2c7299){const _0x2eb8e7=_0x555f1c;this[_0x2eb8e7(0x341)]=_0x2c7299;},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x8d1)]=function(){const _0x2b9d2c=_0x555f1c;return this[_0x2b9d2c(0x341)];},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x44f)]=function(){const _0x23d1cb=_0x555f1c;this[_0x23d1cb(0x306)]=undefined,this['_forcedBattleSys']=undefined,this[_0x23d1cb(0x158)]=undefined;},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x198)]=function(_0x4970f4){const _0xe20708=_0x555f1c;$gameMap&&$dataMap&&$dataMap[_0xe20708(0x6ae)]&&this[_0xe20708(0x559)]($dataMap['note']);const _0x47eb98=$dataTroops[_0x4970f4];if(_0x47eb98){let _0x3abeed=DataManager[_0xe20708(0x729)](_0x47eb98['id']);this[_0xe20708(0x559)](_0x3abeed);}},Game_Temp['prototype'][_0x555f1c(0x559)]=function(_0x2ed98b){const _0xa751bb=_0x555f1c;if(!_0x2ed98b)return;if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0xa751bb(0x306)]='SV';else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3c16bd=String(RegExp['$1']);if(_0x3c16bd[_0xa751bb(0x3b6)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x3c16bd['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0xa751bb(0x306)]='SV');}}}if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:DTB)>/i))this[_0xa751bb(0x575)]=0x0;else{if(_0x2ed98b['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))this['_forcedBattleSys']=0x1;else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:TPB|ATB)>/i))this[_0xa751bb(0x575)]=0x2;else{if(_0x2ed98b['match'](/<(?:CTB)>/i))Imported[_0xa751bb(0x277)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x3d5));else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:STB)>/i))Imported[_0xa751bb(0x2ea)]&&(this['_forcedBattleSys']=_0xa751bb(0x5cc));else{if(_0x2ed98b['match'](/<(?:BTB)>/i))Imported[_0xa751bb(0x623)]&&(this['_forcedBattleSys']=_0xa751bb(0x1fc));else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:FTB)>/i))Imported[_0xa751bb(0x302)]&&(this[_0xa751bb(0x575)]='FTB');else{if(_0x2ed98b['match'](/<(?:OTB)>/i))Imported[_0xa751bb(0x5bf)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x133));else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:ETB)>/i))Imported[_0xa751bb(0x6e9)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x1c6));else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:PTB)>/i))Imported[_0xa751bb(0x2e2)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x6ca));else{if(_0x2ed98b[_0xa751bb(0x3b6)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x49d85d=String(RegExp['$1']);if(_0x49d85d[_0xa751bb(0x3b6)](/DTB/i))this[_0xa751bb(0x575)]=0x0;else{if(_0x49d85d[_0xa751bb(0x3b6)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0xa751bb(0x575)]=0x1;else{if(_0x49d85d[_0xa751bb(0x3b6)](/(?:TPB|ATB)[ ]WAIT/i))this[_0xa751bb(0x575)]=0x2;else{if(_0x49d85d['match'](/CTB/i))Imported[_0xa751bb(0x277)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x3d5));else{if(_0x49d85d[_0xa751bb(0x3b6)](/STB/i))Imported[_0xa751bb(0x2ea)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x5cc));else{if(_0x49d85d[_0xa751bb(0x3b6)](/BTB/i))Imported[_0xa751bb(0x623)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x1fc));else{if(_0x49d85d[_0xa751bb(0x3b6)](/FTB/i))Imported[_0xa751bb(0x302)]&&(this[_0xa751bb(0x575)]='FTB');else{if(_0x49d85d[_0xa751bb(0x3b6)](/OTB/i))Imported[_0xa751bb(0x5bf)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x133));else{if(_0x49d85d['match'](/ETB/i))Imported[_0xa751bb(0x6e9)]&&(this[_0xa751bb(0x575)]=_0xa751bb(0x1c6));else _0x49d85d[_0xa751bb(0x3b6)](/PTB/i)&&(Imported[_0xa751bb(0x2e2)]&&(this['_forcedBattleSys']=_0xa751bb(0x6ca)));}}}}}}}}}}}}}}}}}}}}if(_0x2ed98b['match'](/<(?:|BATTLE )GRID>/i))this[_0xa751bb(0x158)]=!![];else _0x2ed98b[_0xa751bb(0x3b6)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0xa751bb(0x158)]=![]);},Game_Temp[_0x555f1c(0x54e)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp['prototype']['requestFauxAnimation']=function(_0x22da01,_0x53d394,_0xae6b6f,_0x55ade6){const _0x1b5505=_0x555f1c;if(!this[_0x1b5505(0x7a8)]())return;_0xae6b6f=_0xae6b6f||![],_0x55ade6=_0x55ade6||![];if($dataAnimations[_0x53d394]){const _0x4a07a7={'targets':_0x22da01,'animationId':_0x53d394,'mirror':_0xae6b6f,'mute':_0x55ade6};this['_fauxAnimationQueue'][_0x1b5505(0x45f)](_0x4a07a7);for(const _0x2e0341 of _0x22da01){_0x2e0341[_0x1b5505(0x5f8)]&&_0x2e0341[_0x1b5505(0x5f8)]();}}},Game_Temp[_0x555f1c(0x54e)]['showFauxAnimations']=function(){return!![];},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x259)]=function(){const _0x52fb0b=_0x555f1c;return this[_0x52fb0b(0x467)][_0x52fb0b(0x1eb)]();},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x1f3)]=function(){const _0x2a92ba=_0x555f1c;this[_0x2a92ba(0x66e)]=[];},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x666)]=function(_0x168a6f,_0xcf62ae,_0x2f59c0,_0x456b0c,_0x3b2f31){const _0x2c2d92=_0x555f1c;if(!this['showPointAnimations']())return;_0x456b0c=_0x456b0c||![],_0x3b2f31=_0x3b2f31||![];if($dataAnimations[_0x2f59c0]){const _0x4fe63c={'x':_0x168a6f,'y':_0xcf62ae,'animationId':_0x2f59c0,'mirror':_0x456b0c,'mute':_0x3b2f31};this[_0x2c2d92(0x66e)][_0x2c2d92(0x45f)](_0x4fe63c);}},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x75b)]=function(){return!![];},Game_Temp['prototype'][_0x555f1c(0x564)]=function(){const _0x41c00f=_0x555f1c;return this[_0x41c00f(0x66e)][_0x41c00f(0x1eb)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4db)]=Game_System[_0x555f1c(0x54e)]['initialize'],Game_System['prototype']['initialize']=function(){const _0x16a675=_0x555f1c;VisuMZ[_0x16a675(0x5c5)]['Game_System_initialize'][_0x16a675(0x2b0)](this),this['initCoreEngine']();},Game_System[_0x555f1c(0x54e)][_0x555f1c(0x841)]=function(){const _0x1b4869=_0x555f1c;this[_0x1b4869(0x3db)]={'SideView':$dataSystem['optSideView'],'BattleSystem':this[_0x1b4869(0x58d)](),'FontSize':$dataSystem[_0x1b4869(0x5c7)][_0x1b4869(0x457)],'Padding':0xc};},Game_System[_0x555f1c(0x54e)]['isSideView']=function(){const _0x135ffa=_0x555f1c;if($gameTemp['_forcedTroopView']==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x135ffa(0x3db)]===undefined)this[_0x135ffa(0x841)]();if(this[_0x135ffa(0x3db)][_0x135ffa(0x4eb)]===undefined)this[_0x135ffa(0x841)]();return this[_0x135ffa(0x3db)][_0x135ffa(0x4eb)];},Game_System[_0x555f1c(0x54e)]['setSideView']=function(_0xd5ec6e){const _0x5af50b=_0x555f1c;if(this[_0x5af50b(0x3db)]===undefined)this[_0x5af50b(0x841)]();if(this['_CoreEngineSettings'][_0x5af50b(0x4eb)]===undefined)this[_0x5af50b(0x841)]();this[_0x5af50b(0x3db)][_0x5af50b(0x4eb)]=_0xd5ec6e;},Game_System[_0x555f1c(0x54e)][_0x555f1c(0x40e)]=function(){const _0xe6933a=_0x555f1c;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();this[_0xe6933a(0x3db)][_0xe6933a(0x582)]=this[_0xe6933a(0x58d)]();},Game_System[_0x555f1c(0x54e)]['initialBattleSystem']=function(){const _0x431a19=_0x555f1c,_0x2c6469=(VisuMZ[_0x431a19(0x5c5)]['Settings'][_0x431a19(0x582)]||'DATABASE')['toUpperCase']()[_0x431a19(0x26b)]();return VisuMZ[_0x431a19(0x5c5)][_0x431a19(0x705)](_0x2c6469);},Game_System[_0x555f1c(0x54e)][_0x555f1c(0x11c)]=function(){const _0x9fcec1=_0x555f1c;if($gameTemp[_0x9fcec1(0x575)]!==undefined)return $gameTemp['_forcedBattleSys'];if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x9fcec1(0x3db)][_0x9fcec1(0x582)]===undefined)this[_0x9fcec1(0x40e)]();return this[_0x9fcec1(0x3db)]['BattleSystem'];},Game_System[_0x555f1c(0x54e)]['setBattleSystem']=function(_0x36b8d9){const _0x37148b=_0x555f1c;if(this['_CoreEngineSettings']===undefined)this[_0x37148b(0x841)]();if(this[_0x37148b(0x3db)][_0x37148b(0x582)]===undefined)this['resetBattleSystem']();this[_0x37148b(0x3db)][_0x37148b(0x582)]=_0x36b8d9;},Game_System['prototype'][_0x555f1c(0x16a)]=function(){const _0x304d49=_0x555f1c;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x304d49(0x3db)]['FontSize']===undefined)this[_0x304d49(0x841)]();return this[_0x304d49(0x3db)][_0x304d49(0x818)];},Game_System[_0x555f1c(0x54e)][_0x555f1c(0x12b)]=function(_0x4ca3aa){const _0x29c231=_0x555f1c;if(this[_0x29c231(0x3db)]===undefined)this[_0x29c231(0x841)]();if(this['_CoreEngineSettings']['TimeProgress']===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x29c231(0x818)]=_0x4ca3aa;},Game_System[_0x555f1c(0x54e)][_0x555f1c(0x26c)]=function(){const _0x324a28=_0x555f1c;if(this[_0x324a28(0x3db)]===undefined)this[_0x324a28(0x841)]();if(this[_0x324a28(0x3db)][_0x324a28(0x637)]===undefined)this[_0x324a28(0x841)]();return this[_0x324a28(0x3db)][_0x324a28(0x637)];},Game_System[_0x555f1c(0x54e)]['setWindowPadding']=function(_0x701c03){const _0x34ccbe=_0x555f1c;if(this['_CoreEngineSettings']===undefined)this[_0x34ccbe(0x841)]();if(this[_0x34ccbe(0x3db)][_0x34ccbe(0x3ef)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x34ccbe(0x637)]=_0x701c03;},VisuMZ[_0x555f1c(0x5c5)]['Game_Screen_initialize']=Game_Screen[_0x555f1c(0x54e)]['initialize'],Game_Screen[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(){const _0x13dd6d=_0x555f1c;VisuMZ[_0x13dd6d(0x5c5)][_0x13dd6d(0x59f)][_0x13dd6d(0x2b0)](this),this[_0x13dd6d(0x679)]();},Game_Screen[_0x555f1c(0x54e)]['initCoreEngineScreenShake']=function(){const _0x1a73a1=_0x555f1c,_0x6828f4=VisuMZ[_0x1a73a1(0x5c5)][_0x1a73a1(0x51b)]['ScreenShake'];this[_0x1a73a1(0x4ab)]=_0x6828f4?.['DefaultStyle']||_0x1a73a1(0x1b4);},Game_Screen[_0x555f1c(0x54e)][_0x555f1c(0x50c)]=function(){if(this['_coreEngineShakeStyle']===undefined)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];},Game_Screen[_0x555f1c(0x54e)][_0x555f1c(0x1e3)]=function(_0xc304c){const _0x5b603f=_0x555f1c;if(this['_coreEngineShakeStyle']===undefined)this[_0x5b603f(0x679)]();this[_0x5b603f(0x4ab)]=_0xc304c['toLowerCase']()[_0x5b603f(0x26b)]();},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x227)]=function(){const _0x305ab2=_0x555f1c;if($gameParty[_0x305ab2(0x827)]())return![];return this[_0x305ab2(0x641)]()&&this[_0x305ab2(0x641)]()[_0x305ab2(0x185)](0x0)==='!';},Game_Picture['prototype']['onlyfilename']=function(){const _0x5451dc=_0x555f1c;return this[_0x5451dc(0x21c)]['split']('/')[_0x5451dc(0x2c9)]();},VisuMZ['CoreEngine']['Game_Picture_x']=Game_Picture[_0x555f1c(0x54e)]['x'],Game_Picture[_0x555f1c(0x54e)]['x']=function(){const _0x2f5af5=_0x555f1c;return this[_0x2f5af5(0x227)]()?this['xScrollLinkedOffset']():VisuMZ[_0x2f5af5(0x5c5)][_0x2f5af5(0x4df)]['call'](this);},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x5d6)]=function(){const _0x1c3d0f=_0x555f1c,_0x4d1d5b=$gameMap[_0x1c3d0f(0x7d6)]()*$gameMap['tileWidth']();return(this['_x']-_0x4d1d5b)*$gameScreen[_0x1c3d0f(0x2ca)]();},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_y']=Game_Picture['prototype']['y'],Game_Picture[_0x555f1c(0x54e)]['y']=function(){const _0x4f9df8=_0x555f1c;return this[_0x4f9df8(0x227)]()?this[_0x4f9df8(0x1fd)]():VisuMZ[_0x4f9df8(0x5c5)][_0x4f9df8(0x104)]['call'](this);},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x1fd)]=function(){const _0x208fe4=_0x555f1c,_0x299a13=$gameMap[_0x208fe4(0x7cb)]()*$gameMap[_0x208fe4(0x5ba)]();return(this['_y']-_0x299a13)*$gameScreen[_0x208fe4(0x2ca)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x2a3)]=Game_Picture[_0x555f1c(0x54e)]['scaleX'],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x27e)]=function(){const _0x98b4bd=_0x555f1c;let _0x5fc2a5=VisuMZ[_0x98b4bd(0x5c5)][_0x98b4bd(0x2a3)][_0x98b4bd(0x2b0)](this);return this['isMapScrollLinked']()&&(_0x5fc2a5*=$gameScreen[_0x98b4bd(0x2ca)]()),_0x5fc2a5;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3ce)]=Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x692)],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x692)]=function(){const _0x510d91=_0x555f1c;let _0x47f4ce=VisuMZ[_0x510d91(0x5c5)]['Game_Picture_scaleY']['call'](this);return this[_0x510d91(0x227)]()&&(_0x47f4ce*=$gameScreen[_0x510d91(0x2ca)]()),_0x47f4ce;},Game_Picture['prototype'][_0x555f1c(0x28d)]=function(_0x2498a5){const _0x17de6=_0x555f1c;this[_0x17de6(0x46e)]=_0x2498a5;},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_calcEasing']=Game_Picture['prototype'][_0x555f1c(0x75a)],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x75a)]=function(_0x3c1197){const _0x482137=_0x555f1c;return this[_0x482137(0x46e)]=this[_0x482137(0x46e)]||0x0,[0x0,0x1,0x2,0x3][_0x482137(0x484)](this[_0x482137(0x46e)])?VisuMZ[_0x482137(0x5c5)][_0x482137(0x671)][_0x482137(0x2b0)](this,_0x3c1197):VisuMZ[_0x482137(0x8ba)](_0x3c1197,this[_0x482137(0x46e)]);},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_initRotation']=Game_Picture['prototype'][_0x555f1c(0x779)],Game_Picture[_0x555f1c(0x54e)]['initRotation']=function(){const _0x550e76=_0x555f1c;VisuMZ[_0x550e76(0x5c5)]['Game_Picture_initRotation']['call'](this),this[_0x550e76(0x6b2)]();},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x6b2)]=function(){const _0x246118=_0x555f1c;this[_0x246118(0x604)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x246118(0x82d)};},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_angle']=Game_Picture[_0x555f1c(0x54e)]['angle'],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x291)]=function(){const _0x52fcf2=_0x555f1c;let _0x2ae257=VisuMZ['CoreEngine'][_0x52fcf2(0x69b)]['call'](this);return _0x2ae257+=this[_0x52fcf2(0x3e4)](),_0x2ae257;},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x3e4)]=function(){const _0x455110=_0x555f1c;if(this['_anglePlus']===undefined)this[_0x455110(0x6b2)]();return this[_0x455110(0x604)][_0x455110(0x3a7)]||0x0;},Game_Picture['prototype'][_0x555f1c(0x2f2)]=function(_0x1b4d42,_0x2c0732,_0x1d2264){const _0x2de5b8=_0x555f1c;if(this[_0x2de5b8(0x604)]===undefined)this[_0x2de5b8(0x6b2)]();this['_anglePlus'][_0x2de5b8(0x412)]=_0x1b4d42||0x0,this[_0x2de5b8(0x604)][_0x2de5b8(0x176)]=_0x2c0732||0x0,this[_0x2de5b8(0x604)][_0x2de5b8(0x64f)]=_0x2c0732||0x0,this[_0x2de5b8(0x604)]['easingType']=_0x1d2264||_0x2de5b8(0x82d),_0x2c0732<=0x0&&(this[_0x2de5b8(0x604)]['current']=this[_0x2de5b8(0x604)][_0x2de5b8(0x412)]);},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x214)]=function(_0x4116ee,_0x2aca81,_0x1cffcc){const _0x3a496e=_0x555f1c;if(this[_0x3a496e(0x604)]===undefined)this['initRotationCoreEngine']();this[_0x3a496e(0x604)][_0x3a496e(0x412)]+=_0x4116ee||0x0,this[_0x3a496e(0x604)][_0x3a496e(0x176)]=_0x2aca81||0x0,this['_anglePlus']['wholeDuration']=_0x2aca81||0x0,this[_0x3a496e(0x604)]['easingType']=_0x1cffcc||'Linear',_0x2aca81<=0x0&&(this[_0x3a496e(0x604)][_0x3a496e(0x3a7)]=this['_anglePlus'][_0x3a496e(0x412)]);},VisuMZ['CoreEngine'][_0x555f1c(0x1d3)]=Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x2b9)],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x2b9)]=function(){const _0x491919=_0x555f1c;VisuMZ['CoreEngine'][_0x491919(0x1d3)][_0x491919(0x2b0)](this),this[_0x491919(0x683)]();},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x683)]=function(){const _0x340d8f=_0x555f1c;if(this[_0x340d8f(0x604)]===undefined)this['initRotationCoreEngine']();const _0x3bf256=this['_anglePlus'];if(_0x3bf256[_0x340d8f(0x176)]<=0x0)return;_0x3bf256[_0x340d8f(0x3a7)]=this[_0x340d8f(0x721)](_0x3bf256['current'],_0x3bf256['target']),_0x3bf256[_0x340d8f(0x176)]--,_0x3bf256[_0x340d8f(0x176)]<=0x0&&(_0x3bf256[_0x340d8f(0x3a7)]=_0x3bf256[_0x340d8f(0x412)]);},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x721)]=function(_0x2324d1,_0x44ff4c){const _0x24acb6=_0x555f1c,_0x2bd464=this['_anglePlus'],_0xcf115f=_0x2bd464[_0x24acb6(0x7ae)],_0x382de2=_0x2bd464[_0x24acb6(0x176)],_0x16dd05=_0x2bd464['wholeDuration'],_0x56effa=VisuMZ[_0x24acb6(0x8ba)]((_0x16dd05-_0x382de2)/_0x16dd05,_0xcf115f),_0x39fd33=VisuMZ['ApplyEasing']((_0x16dd05-_0x382de2+0x1)/_0x16dd05,_0xcf115f),_0x10002f=(_0x2324d1-_0x44ff4c*_0x56effa)/(0x1-_0x56effa);return _0x10002f+(_0x44ff4c-_0x10002f)*_0x39fd33;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3ad)]=Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x75f)],Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x75f)]=function(_0x12be13){const _0x28ed53=_0x555f1c;return VisuMZ[_0x28ed53(0x5c5)][_0x28ed53(0x51b)][_0x28ed53(0x71c)]['ImprovedAccuracySystem']?this[_0x28ed53(0x129)](_0x12be13):VisuMZ['CoreEngine'][_0x28ed53(0x3ad)][_0x28ed53(0x2b0)](this,_0x12be13);},Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x129)]=function(_0x2be93f){const _0x3fbcdd=_0x555f1c,_0x207e43=this[_0x3fbcdd(0x494)](_0x2be93f),_0x33b2f9=this['subjectHitRate'](_0x2be93f),_0x33e40c=this['targetEvaRate'](_0x2be93f);return _0x207e43*(_0x33b2f9-_0x33e40c);},VisuMZ['CoreEngine'][_0x555f1c(0x49f)]=Game_Action[_0x555f1c(0x54e)]['itemEva'],Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x440)]=function(_0x135e4c){const _0x62250=_0x555f1c;return VisuMZ[_0x62250(0x5c5)][_0x62250(0x51b)][_0x62250(0x71c)]['ImprovedAccuracySystem']?0x0:VisuMZ[_0x62250(0x5c5)][_0x62250(0x49f)]['call'](this,_0x135e4c);},Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x494)]=function(_0x11c251){const _0x8f592b=_0x555f1c;return this[_0x8f592b(0x3c7)]()[_0x8f592b(0x6cd)]*0.01;},Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x414)]=function(_0x4211b9){const _0x5b64d4=_0x555f1c;if(VisuMZ[_0x5b64d4(0x5c5)][_0x5b64d4(0x51b)][_0x5b64d4(0x71c)][_0x5b64d4(0x2b8)]&&this[_0x5b64d4(0x1a7)]())return 0x1;return this[_0x5b64d4(0x6fa)]()?VisuMZ['CoreEngine'][_0x5b64d4(0x51b)][_0x5b64d4(0x71c)][_0x5b64d4(0x2b8)]&&this[_0x5b64d4(0x5a6)]()[_0x5b64d4(0x682)]()?this[_0x5b64d4(0x5a6)]()[_0x5b64d4(0x70f)]+0.05:this[_0x5b64d4(0x5a6)]()['hit']:0x1;},Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x6a3)]=function(_0x504d5a){const _0x4cd013=_0x555f1c;if(this[_0x4cd013(0x5a6)]()[_0x4cd013(0x682)]()===_0x504d5a[_0x4cd013(0x682)]())return 0x0;if(this[_0x4cd013(0x6fa)]())return VisuMZ['CoreEngine'][_0x4cd013(0x51b)][_0x4cd013(0x71c)][_0x4cd013(0x2b8)]&&_0x504d5a[_0x4cd013(0x5f4)]()?_0x504d5a['eva']-0.05:_0x504d5a[_0x4cd013(0x788)];else return this[_0x4cd013(0x847)]()?_0x504d5a[_0x4cd013(0x2ce)]:0x0;},VisuMZ['CoreEngine']['Game_Action_updateLastTarget']=Game_Action[_0x555f1c(0x54e)]['updateLastTarget'],Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x7c0)]=function(_0x3ce611){const _0x21da71=_0x555f1c;VisuMZ[_0x21da71(0x5c5)]['Game_Action_updateLastTarget']['call'](this,_0x3ce611);if(VisuMZ[_0x21da71(0x5c5)][_0x21da71(0x51b)]['QoL'][_0x21da71(0x49c)])return;const _0x4018b7=_0x3ce611['result']();_0x4018b7[_0x21da71(0x1b5)]&&(0x1-this['itemEva'](_0x3ce611)>this[_0x21da71(0x75f)](_0x3ce611)&&(_0x4018b7[_0x21da71(0x1b5)]=![],_0x4018b7[_0x21da71(0x1d7)]=!![]));},VisuMZ['CoreEngine'][_0x555f1c(0x22a)]=Game_BattlerBase[_0x555f1c(0x54e)]['initMembers'],Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x3d1)]=function(){const _0x11e739=_0x555f1c;this['_cache']={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x11e739(0x2b0)](this);},VisuMZ['CoreEngine']['Game_BattlerBase_refresh']=Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x81e)],Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x81e)]=function(){const _0x6d2e4a=_0x555f1c;this[_0x6d2e4a(0x393)]={},VisuMZ[_0x6d2e4a(0x5c5)][_0x6d2e4a(0x65d)][_0x6d2e4a(0x2b0)](this);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x7b7)]=function(_0x329726){const _0x590b67=_0x555f1c;return this['_cache']=this['_cache']||{},this[_0x590b67(0x393)][_0x329726]!==undefined;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x490)]=function(_0x5983a6){const _0x29a45f=_0x555f1c;return _0x5983a6=_0x5983a6||'',_0x5983a6='\x20'+_0x5983a6,(VisuMZ[_0x29a45f(0x5c5)][_0x29a45f(0x51b)]['Param']['ConvertToBase']??!![])&&(_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.mhp\b/gi,_0x29a45f(0x655)),_0x5983a6=_0x5983a6['replace'](/\s(?:USER|THIS)\.mmp\b/gi,'this.paramBase(1)'),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.atk\b/gi,_0x29a45f(0x719)),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.def\b/gi,_0x29a45f(0x7a7)),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.mat\b/gi,_0x29a45f(0x468)),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.mdf\b/gi,_0x29a45f(0x267)),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.agi\b/gi,'this.paramBase(6)'),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\s(?:USER|THIS)\.luk\b/gi,_0x29a45f(0x1b7)),_0x5983a6=_0x5983a6['replace'](/\s(?:USER|THIS)\.param\(/gi,'this.paramBase(')),_0x5983a6=_0x5983a6[_0x29a45f(0x38a)](/\suser\./gi,_0x29a45f(0x153)),_0x5983a6;},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x8b4)]=function(_0x4b2edb){const _0xcff0ae=_0x555f1c,_0x5a3440=(_0x25722f,_0x5752b5)=>{const _0x2921f5=_0x233d;if(!_0x5752b5)return _0x25722f;if(_0x5752b5[_0x2921f5(0x6ae)][_0x2921f5(0x3b6)](VisuMZ[_0x2921f5(0x5c5)][_0x2921f5(0x23a)][_0x2921f5(0x8b4)][_0x4b2edb])){var _0x2a9f54=Number(RegExp['$1']);_0x25722f+=_0x2a9f54;}if(_0x5752b5['note'][_0x2921f5(0x3b6)](VisuMZ[_0x2921f5(0x5c5)][_0x2921f5(0x23a)][_0x2921f5(0x814)][_0x4b2edb])){var _0x535288=String(RegExp['$1']);_0x535288=VisuMZ[_0x2921f5(0x5c5)][_0x2921f5(0x490)](_0x535288);try{_0x25722f+=eval(_0x535288);}catch(_0x5af475){if($gameTemp['isPlaytest']())console['log'](_0x5af475);}}return _0x25722f;};return this[_0xcff0ae(0x41e)]()[_0xcff0ae(0x70b)](_0x5a3440,this[_0xcff0ae(0x6cc)][_0x4b2edb]);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x742)]=function(_0x1eb51b){const _0x5a6c81=_0x555f1c;var _0x3f513d=_0x5a6c81(0x64c)+(this['isActor']()?_0x5a6c81(0x263):_0x5a6c81(0x5ec))+_0x5a6c81(0x6d3)+_0x1eb51b;if(this['checkCacheKey'](_0x3f513d))return this[_0x5a6c81(0x393)][_0x3f513d];this[_0x5a6c81(0x393)][_0x3f513d]=eval(VisuMZ[_0x5a6c81(0x5c5)][_0x5a6c81(0x51b)]['Param'][_0x3f513d]);const _0x25fc5c=(_0x5948e6,_0x5c995e)=>{const _0x28e23a=_0x5a6c81;if(!_0x5c995e)return _0x5948e6;if(_0x5c995e[_0x28e23a(0x6ae)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x28e23a(0x742)][_0x1eb51b])){var _0x38e696=Number(RegExp['$1']);if(_0x38e696===0x0)_0x38e696=Number['MAX_SAFE_INTEGER'];_0x5948e6=Math['max'](_0x5948e6,_0x38e696);}if(_0x5c995e[_0x28e23a(0x6ae)][_0x28e23a(0x3b6)](VisuMZ[_0x28e23a(0x5c5)][_0x28e23a(0x23a)][_0x28e23a(0x608)][_0x1eb51b])){var _0x1ea566=String(RegExp['$1']);_0x1ea566=VisuMZ[_0x28e23a(0x5c5)][_0x28e23a(0x490)](_0x1ea566);try{_0x5948e6=Math['max'](_0x5948e6,Number(eval(_0x1ea566)));}catch(_0x25cb15){if($gameTemp[_0x28e23a(0x6d5)]())console['log'](_0x25cb15);}}return _0x5948e6;};if(this[_0x5a6c81(0x393)][_0x3f513d]===0x0)this[_0x5a6c81(0x393)][_0x3f513d]=Number['MAX_SAFE_INTEGER'];return this[_0x5a6c81(0x393)][_0x3f513d]=this[_0x5a6c81(0x41e)]()[_0x5a6c81(0x70b)](_0x25fc5c,this[_0x5a6c81(0x393)][_0x3f513d]),this[_0x5a6c81(0x393)][_0x3f513d];},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x70d)]=function(_0x5d25e0){const _0x8cfed2=_0x555f1c,_0x553935=this[_0x8cfed2(0x66b)](Game_BattlerBase[_0x8cfed2(0x878)],_0x5d25e0),_0x5564e4=(_0x4bf5f0,_0x5e29f2)=>{const _0x30efd9=_0x8cfed2;if(!_0x5e29f2)return _0x4bf5f0;if(_0x5e29f2[_0x30efd9(0x6ae)][_0x30efd9(0x3b6)](VisuMZ['CoreEngine'][_0x30efd9(0x23a)]['paramRate1'][_0x5d25e0])){var _0x2468b2=Number(RegExp['$1'])/0x64;_0x4bf5f0*=_0x2468b2;}if(_0x5e29f2['note'][_0x30efd9(0x3b6)](VisuMZ[_0x30efd9(0x5c5)][_0x30efd9(0x23a)][_0x30efd9(0x6dd)][_0x5d25e0])){var _0x2468b2=Number(RegExp['$1']);_0x4bf5f0*=_0x2468b2;}if(_0x5e29f2[_0x30efd9(0x6ae)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x30efd9(0x48e)][_0x5d25e0])){var _0x19cef3=String(RegExp['$1']);_0x19cef3=VisuMZ[_0x30efd9(0x5c5)][_0x30efd9(0x490)](_0x19cef3);try{_0x4bf5f0*=eval(_0x19cef3);}catch(_0x25b881){if($gameTemp['isPlaytest']())console[_0x30efd9(0x4d7)](_0x25b881);}}return _0x4bf5f0;};return this['traitObjects']()[_0x8cfed2(0x70b)](_0x5564e4,_0x553935);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x6ad)]=function(_0x46a09f){const _0x4173d0=(_0x5e637d,_0x54465d)=>{const _0x4e3839=_0x233d;if(!_0x54465d)return _0x5e637d;if(_0x54465d['note'][_0x4e3839(0x3b6)](VisuMZ[_0x4e3839(0x5c5)]['RegExp'][_0x4e3839(0x1b2)][_0x46a09f])){var _0x1a8e87=Number(RegExp['$1']);_0x5e637d+=_0x1a8e87;}if(_0x54465d[_0x4e3839(0x6ae)]['match'](VisuMZ[_0x4e3839(0x5c5)][_0x4e3839(0x23a)]['paramFlatJS'][_0x46a09f])){var _0x542cda=String(RegExp['$1']);_0x542cda=VisuMZ[_0x4e3839(0x5c5)][_0x4e3839(0x490)](_0x542cda);try{_0x5e637d+=eval(_0x542cda);}catch(_0x1c9c8c){if($gameTemp[_0x4e3839(0x6d5)]())console[_0x4e3839(0x4d7)](_0x1c9c8c);}}return _0x5e637d;};return this['traitObjects']()['reduce'](_0x4173d0,0x0);},Game_BattlerBase['prototype'][_0x555f1c(0x3dd)]=function(_0x37fb76){const _0x4b5666=_0x555f1c;let _0x1e7e3e=_0x4b5666(0x3dd)+_0x37fb76+_0x4b5666(0x219);if(this[_0x4b5666(0x7b7)](_0x1e7e3e))return this[_0x4b5666(0x393)][_0x1e7e3e];return this['_cache'][_0x1e7e3e]=Math[_0x4b5666(0x647)](VisuMZ[_0x4b5666(0x5c5)][_0x4b5666(0x51b)][_0x4b5666(0x289)][_0x4b5666(0x56e)][_0x4b5666(0x2b0)](this,_0x37fb76)),this['_cache'][_0x1e7e3e];},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x4fc)]=function(_0x29c332){const _0x1937d8=(_0x5d5d87,_0x58a927)=>{const _0x37400c=_0x233d;if(!_0x58a927)return _0x5d5d87;if(_0x58a927[_0x37400c(0x6ae)][_0x37400c(0x3b6)](VisuMZ[_0x37400c(0x5c5)]['RegExp'][_0x37400c(0x88a)][_0x29c332])){var _0x486e47=Number(RegExp['$1'])/0x64;_0x5d5d87+=_0x486e47;}if(_0x58a927[_0x37400c(0x6ae)][_0x37400c(0x3b6)](VisuMZ['CoreEngine']['RegExp'][_0x37400c(0x7cf)][_0x29c332])){var _0x486e47=Number(RegExp['$1']);_0x5d5d87+=_0x486e47;}if(_0x58a927[_0x37400c(0x6ae)][_0x37400c(0x3b6)](VisuMZ['CoreEngine'][_0x37400c(0x23a)]['xparamPlusJS'][_0x29c332])){var _0x2a098f=String(RegExp['$1']);_0x2a098f=VisuMZ[_0x37400c(0x5c5)][_0x37400c(0x490)](_0x2a098f);try{_0x5d5d87+=eval(_0x2a098f);}catch(_0x39a8a0){if($gameTemp[_0x37400c(0x6d5)]())console[_0x37400c(0x4d7)](_0x39a8a0);}}return _0x5d5d87;};return this['traitObjects']()['reduce'](_0x1937d8,0x0);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x734)]=function(_0x41a06){const _0x3930c9=_0x555f1c,_0x52ebf3=(_0x1c5c0a,_0x356cb8)=>{const _0x40cf97=_0x233d;if(!_0x356cb8)return _0x1c5c0a;if(_0x356cb8[_0x40cf97(0x6ae)][_0x40cf97(0x3b6)](VisuMZ['CoreEngine'][_0x40cf97(0x23a)]['xparamRate1'][_0x41a06])){var _0x422969=Number(RegExp['$1'])/0x64;_0x1c5c0a*=_0x422969;}if(_0x356cb8[_0x40cf97(0x6ae)][_0x40cf97(0x3b6)](VisuMZ['CoreEngine'][_0x40cf97(0x23a)][_0x40cf97(0x770)][_0x41a06])){var _0x422969=Number(RegExp['$1']);_0x1c5c0a*=_0x422969;}if(_0x356cb8['note'][_0x40cf97(0x3b6)](VisuMZ[_0x40cf97(0x5c5)][_0x40cf97(0x23a)][_0x40cf97(0x55b)][_0x41a06])){var _0x16258d=String(RegExp['$1']);_0x16258d=VisuMZ[_0x40cf97(0x5c5)][_0x40cf97(0x490)](_0x16258d);try{_0x1c5c0a*=eval(_0x16258d);}catch(_0x26c140){if($gameTemp[_0x40cf97(0x6d5)]())console[_0x40cf97(0x4d7)](_0x26c140);}}return _0x1c5c0a;};return this[_0x3930c9(0x41e)]()[_0x3930c9(0x70b)](_0x52ebf3,0x1);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x8bf)]=function(_0x7a309d){const _0x423eb5=_0x555f1c,_0x27b801=(_0x572aa3,_0x5c986e)=>{const _0x3ec0e0=_0x233d;if(!_0x5c986e)return _0x572aa3;if(_0x5c986e[_0x3ec0e0(0x6ae)][_0x3ec0e0(0x3b6)](VisuMZ['CoreEngine'][_0x3ec0e0(0x23a)][_0x3ec0e0(0x8e7)][_0x7a309d])){var _0x5a94d3=Number(RegExp['$1'])/0x64;_0x572aa3+=_0x5a94d3;}if(_0x5c986e[_0x3ec0e0(0x6ae)][_0x3ec0e0(0x3b6)](VisuMZ[_0x3ec0e0(0x5c5)][_0x3ec0e0(0x23a)][_0x3ec0e0(0x731)][_0x7a309d])){var _0x5a94d3=Number(RegExp['$1']);_0x572aa3+=_0x5a94d3;}if(_0x5c986e[_0x3ec0e0(0x6ae)][_0x3ec0e0(0x3b6)](VisuMZ['CoreEngine']['RegExp'][_0x3ec0e0(0x881)][_0x7a309d])){var _0x39317b=String(RegExp['$1']);_0x39317b=VisuMZ[_0x3ec0e0(0x5c5)][_0x3ec0e0(0x490)](_0x39317b);try{_0x572aa3+=eval(_0x39317b);}catch(_0x43ca05){if($gameTemp['isPlaytest']())console['log'](_0x43ca05);}}return _0x572aa3;};return this[_0x423eb5(0x41e)]()['reduce'](_0x27b801,0x0);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x65c)]=function(_0x59d02d){const _0xa0ee=_0x555f1c;let _0x4d9f55=_0xa0ee(0x65c)+_0x59d02d+'Total';if(this[_0xa0ee(0x7b7)](_0x4d9f55))return this[_0xa0ee(0x393)][_0x4d9f55];return this[_0xa0ee(0x393)][_0x4d9f55]=VisuMZ[_0xa0ee(0x5c5)]['Settings'][_0xa0ee(0x289)][_0xa0ee(0x7db)][_0xa0ee(0x2b0)](this,_0x59d02d),this['_cache'][_0x4d9f55];},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x241)]=function(_0x5341a1){const _0x504c80=_0x555f1c,_0x3d33e9=(_0x2edd4f,_0x110735)=>{const _0x5b144e=_0x233d;if(!_0x110735)return _0x2edd4f;if(_0x110735['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x5b144e(0x6f6)][_0x5341a1])){var _0x3a9ea2=Number(RegExp['$1'])/0x64;_0x2edd4f+=_0x3a9ea2;}if(_0x110735[_0x5b144e(0x6ae)]['match'](VisuMZ[_0x5b144e(0x5c5)][_0x5b144e(0x23a)][_0x5b144e(0x81d)][_0x5341a1])){var _0x3a9ea2=Number(RegExp['$1']);_0x2edd4f+=_0x3a9ea2;}if(_0x110735[_0x5b144e(0x6ae)][_0x5b144e(0x3b6)](VisuMZ[_0x5b144e(0x5c5)]['RegExp'][_0x5b144e(0x8ac)][_0x5341a1])){var _0x294cdc=String(RegExp['$1']);_0x294cdc=VisuMZ['CoreEngine'][_0x5b144e(0x490)](_0x294cdc);try{_0x2edd4f+=eval(_0x294cdc);}catch(_0x3c9dc6){if($gameTemp['isPlaytest']())console[_0x5b144e(0x4d7)](_0x3c9dc6);}}return _0x2edd4f;};return this[_0x504c80(0x41e)]()[_0x504c80(0x70b)](_0x3d33e9,0x0);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x27c)]=function(_0x4e3ab5){const _0xf68f6=_0x555f1c,_0x126922=(_0x14d3b9,_0x2849f4)=>{const _0x180df0=_0x233d;if(!_0x2849f4)return _0x14d3b9;if(_0x2849f4[_0x180df0(0x6ae)]['match'](VisuMZ[_0x180df0(0x5c5)]['RegExp']['sparamRate1'][_0x4e3ab5])){var _0x3ba12b=Number(RegExp['$1'])/0x64;_0x14d3b9*=_0x3ba12b;}if(_0x2849f4[_0x180df0(0x6ae)]['match'](VisuMZ[_0x180df0(0x5c5)]['RegExp'][_0x180df0(0x3e6)][_0x4e3ab5])){var _0x3ba12b=Number(RegExp['$1']);_0x14d3b9*=_0x3ba12b;}if(_0x2849f4[_0x180df0(0x6ae)][_0x180df0(0x3b6)](VisuMZ['CoreEngine']['RegExp'][_0x180df0(0x488)][_0x4e3ab5])){var _0x356348=String(RegExp['$1']);_0x356348=VisuMZ['CoreEngine']['JsReplaceUserVar'](_0x356348);try{_0x14d3b9*=eval(_0x356348);}catch(_0x332f42){if($gameTemp[_0x180df0(0x6d5)]())console[_0x180df0(0x4d7)](_0x332f42);}}return _0x14d3b9;};return this[_0xf68f6(0x41e)]()[_0xf68f6(0x70b)](_0x126922,0x1);},Game_BattlerBase[_0x555f1c(0x54e)][_0x555f1c(0x6b5)]=function(_0x76d2eb){const _0x1cdea7=_0x555f1c,_0xe3c12e=(_0x4a00c0,_0x3e64e1)=>{const _0x1e7364=_0x233d;if(!_0x3e64e1)return _0x4a00c0;if(_0x3e64e1[_0x1e7364(0x6ae)][_0x1e7364(0x3b6)](VisuMZ[_0x1e7364(0x5c5)][_0x1e7364(0x23a)]['sparamFlat1'][_0x76d2eb])){var _0x10a8e3=Number(RegExp['$1'])/0x64;_0x4a00c0+=_0x10a8e3;}if(_0x3e64e1[_0x1e7364(0x6ae)][_0x1e7364(0x3b6)](VisuMZ[_0x1e7364(0x5c5)]['RegExp']['sparamFlat2'][_0x76d2eb])){var _0x10a8e3=Number(RegExp['$1']);_0x4a00c0+=_0x10a8e3;}if(_0x3e64e1[_0x1e7364(0x6ae)][_0x1e7364(0x3b6)](VisuMZ['CoreEngine'][_0x1e7364(0x23a)][_0x1e7364(0x26f)][_0x76d2eb])){var _0x117e03=String(RegExp['$1']);_0x117e03=VisuMZ[_0x1e7364(0x5c5)][_0x1e7364(0x490)](_0x117e03);try{_0x4a00c0+=eval(_0x117e03);}catch(_0x499c6e){if($gameTemp['isPlaytest']())console[_0x1e7364(0x4d7)](_0x499c6e);}}return _0x4a00c0;};return this['traitObjects']()[_0x1cdea7(0x70b)](_0xe3c12e,0x0);},Game_BattlerBase['prototype'][_0x555f1c(0x317)]=function(_0x303c7c){const _0x258d4b=_0x555f1c;let _0x3f55fd=_0x258d4b(0x317)+_0x303c7c+'Total';if(this[_0x258d4b(0x7b7)](_0x3f55fd))return this[_0x258d4b(0x393)][_0x3f55fd];return this[_0x258d4b(0x393)][_0x3f55fd]=VisuMZ[_0x258d4b(0x5c5)][_0x258d4b(0x51b)]['Param'][_0x258d4b(0x47c)][_0x258d4b(0x2b0)](this,_0x303c7c),this[_0x258d4b(0x393)][_0x3f55fd];},Game_BattlerBase['prototype'][_0x555f1c(0x25e)]=function(_0x427de0,_0x22e29a){const _0xeb31a7=_0x555f1c;if(typeof paramId===_0xeb31a7(0x7af))return this[_0xeb31a7(0x3dd)](_0x427de0);_0x427de0=String(_0x427de0||'')[_0xeb31a7(0x48a)]();if(_0x427de0===_0xeb31a7(0x711))return this['param'](0x0);if(_0x427de0===_0xeb31a7(0x853))return this[_0xeb31a7(0x3dd)](0x1);if(_0x427de0===_0xeb31a7(0x31b))return this['param'](0x2);if(_0x427de0===_0xeb31a7(0x363))return this['param'](0x3);if(_0x427de0===_0xeb31a7(0x256))return this[_0xeb31a7(0x3dd)](0x4);if(_0x427de0==='MDF')return this[_0xeb31a7(0x3dd)](0x5);if(_0x427de0===_0xeb31a7(0x1e2))return this[_0xeb31a7(0x3dd)](0x6);if(_0x427de0==='LUK')return this[_0xeb31a7(0x3dd)](0x7);if(_0x427de0===_0xeb31a7(0x4cd))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this['xparam'](0x0)*0x64))+'%':this[_0xeb31a7(0x65c)](0x0);if(_0x427de0===_0xeb31a7(0x18f))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x65c)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x427de0===_0xeb31a7(0xf8))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x65c)](0x2)*0x64))+'%':this[_0xeb31a7(0x65c)](0x2);if(_0x427de0===_0xeb31a7(0x7ce))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x65c)](0x3)*0x64))+'%':this[_0xeb31a7(0x65c)](0x3);if(_0x427de0===_0xeb31a7(0x36a))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x65c)](0x4)*0x64))+'%':this[_0xeb31a7(0x65c)](0x4);if(_0x427de0===_0xeb31a7(0x5d4))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this['xparam'](0x5)*0x64))+'%':this[_0xeb31a7(0x65c)](0x5);if(_0x427de0===_0xeb31a7(0x554))return _0x22e29a?String(Math['round'](this[_0xeb31a7(0x65c)](0x6)*0x64))+'%':this[_0xeb31a7(0x65c)](0x6);if(_0x427de0===_0xeb31a7(0x115))return _0x22e29a?String(Math['round'](this['xparam'](0x7)*0x64))+'%':this[_0xeb31a7(0x65c)](0x7);if(_0x427de0===_0xeb31a7(0x80c))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x65c)](0x8)*0x64))+'%':this[_0xeb31a7(0x65c)](0x8);if(_0x427de0==='TRG')return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x65c)](0x9)*0x64))+'%':this[_0xeb31a7(0x65c)](0x9);if(_0x427de0===_0xeb31a7(0x505))return _0x22e29a?String(Math['round'](this[_0xeb31a7(0x317)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x427de0===_0xeb31a7(0x462))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x317)](0x1)*0x64))+'%':this[_0xeb31a7(0x317)](0x1);if(_0x427de0===_0xeb31a7(0x1e4))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this['sparam'](0x2)*0x64))+'%':this[_0xeb31a7(0x317)](0x2);if(_0x427de0==='PHA')return _0x22e29a?String(Math['round'](this[_0xeb31a7(0x317)](0x3)*0x64))+'%':this[_0xeb31a7(0x317)](0x3);if(_0x427de0==='MCR')return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x317)](0x4)*0x64))+'%':this[_0xeb31a7(0x317)](0x4);if(_0x427de0===_0xeb31a7(0x434))return _0x22e29a?String(Math['round'](this[_0xeb31a7(0x317)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x427de0===_0xeb31a7(0x4a2))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x317)](0x6)*0x64))+'%':this[_0xeb31a7(0x317)](0x6);if(_0x427de0===_0xeb31a7(0x583))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x317)](0x7)*0x64))+'%':this[_0xeb31a7(0x317)](0x7);if(_0x427de0===_0xeb31a7(0x89b))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x317)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x427de0===_0xeb31a7(0x4f0))return _0x22e29a?String(Math[_0xeb31a7(0x647)](this[_0xeb31a7(0x317)](0x9)*0x64))+'%':this[_0xeb31a7(0x317)](0x9);if(VisuMZ['CoreEngine']['CustomParamAbb'][_0x427de0]){const _0x49f289=VisuMZ[_0xeb31a7(0x5c5)][_0xeb31a7(0x396)][_0x427de0],_0x5caeee=this[_0x49f289];return VisuMZ[_0xeb31a7(0x5c5)][_0xeb31a7(0x6b3)][_0x427de0]==='integer'?_0x5caeee:_0x22e29a?String(Math['round'](_0x5caeee*0x64))+'%':_0x5caeee;}return'';},Game_BattlerBase['prototype'][_0x555f1c(0x477)]=function(){const _0x82e74=_0x555f1c;return this[_0x82e74(0x8d9)]()&&this[_0x82e74(0x1d0)]<this['mhp']*VisuMZ[_0x82e74(0x5c5)][_0x82e74(0x51b)][_0x82e74(0x289)]['CrisisRate'];},Game_Battler[_0x555f1c(0x54e)][_0x555f1c(0x8a1)]=function(){const _0x1cae48=_0x555f1c;SoundManager[_0x1cae48(0x3a3)](),this['requestMotion']('evade');},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6bb)]=Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x19a)],Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x19a)]=function(_0x859445){const _0x8803bc=_0x555f1c;if(this[_0x8803bc(0x41a)]>0x63)return this['paramBaseAboveLevel99'](_0x859445);return VisuMZ[_0x8803bc(0x5c5)][_0x8803bc(0x6bb)][_0x8803bc(0x2b0)](this,_0x859445);},Game_Actor[_0x555f1c(0x54e)]['paramBaseAboveLevel99']=function(_0x380b53){const _0x3fadbc=_0x555f1c,_0x1106ac=this['currentClass']()['params'][_0x380b53][0x63],_0x5cd683=this[_0x3fadbc(0x4fb)]()[_0x3fadbc(0x88b)][_0x380b53][0x62];return _0x1106ac+(_0x1106ac-_0x5cd683)*(this['level']-0x63);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4c0)]=Game_Actor['prototype']['changeClass'],Game_Actor[_0x555f1c(0x54e)]['changeClass']=function(_0x5c48dc,_0x199b70){const _0x3923d0=_0x555f1c;$gameTemp[_0x3923d0(0x3b9)]=!![],VisuMZ[_0x3923d0(0x5c5)]['Game_Actor_changeClass']['call'](this,_0x5c48dc,_0x199b70),$gameTemp[_0x3923d0(0x3b9)]=undefined;},VisuMZ[_0x555f1c(0x5c5)]['Game_Actor_levelUp']=Game_Actor[_0x555f1c(0x54e)]['levelUp'],Game_Actor['prototype'][_0x555f1c(0x231)]=function(){const _0xc31aac=_0x555f1c;VisuMZ[_0xc31aac(0x5c5)][_0xc31aac(0x2a7)][_0xc31aac(0x2b0)](this);if(!$gameTemp[_0xc31aac(0x3b9)])this[_0xc31aac(0x856)]();},Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x856)]=function(){const _0x2cb3ed=_0x555f1c;this['_cache']={};if(VisuMZ['CoreEngine'][_0x2cb3ed(0x51b)]['QoL'][_0x2cb3ed(0x41b)])this[_0x2cb3ed(0x1d0)]=this[_0x2cb3ed(0x698)];if(VisuMZ[_0x2cb3ed(0x5c5)][_0x2cb3ed(0x51b)][_0x2cb3ed(0x71c)][_0x2cb3ed(0x6a7)])this[_0x2cb3ed(0x4b2)]=this[_0x2cb3ed(0x8b3)];},Game_Actor[_0x555f1c(0x54e)]['expRate']=function(){const _0xd9bc8d=_0x555f1c;if(this[_0xd9bc8d(0x67a)]())return 0x1;const _0x2a8b88=this[_0xd9bc8d(0x32c)]()-this[_0xd9bc8d(0x7d4)](),_0x5e9804=this[_0xd9bc8d(0x20b)]()-this['currentLevelExp']();return(_0x5e9804/_0x2a8b88)[_0xd9bc8d(0x739)](0x0,0x1);},Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x41e)]=function(){const _0x479777=_0x555f1c,_0x37ee40=Game_Battler[_0x479777(0x54e)][_0x479777(0x41e)][_0x479777(0x2b0)](this);for(const _0x476b2b of this[_0x479777(0x300)]()){_0x476b2b&&_0x37ee40['push'](_0x476b2b);}return _0x37ee40[_0x479777(0x45f)](this['currentClass'](),this[_0x479777(0x85c)]()),_0x37ee40;},VisuMZ['CoreEngine']['Game_Actor_isPreserveTp']=Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x511)],Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x511)]=function(){const _0x2d9525=_0x555f1c;if(!$gameParty[_0x2d9525(0x827)]())return!![];return VisuMZ[_0x2d9525(0x5c5)][_0x2d9525(0x2da)][_0x2d9525(0x2b0)](this);},VisuMZ[_0x555f1c(0x5c5)]['Game_Unit_onBattleStart']=Game_Unit[_0x555f1c(0x54e)][_0x555f1c(0x710)],Game_Unit['prototype'][_0x555f1c(0x710)]=function(_0x278f5){const _0x3d4776=_0x555f1c;this[_0x3d4776(0x504)]=!![],VisuMZ['CoreEngine'][_0x3d4776(0x6c8)]['call'](this,_0x278f5);},VisuMZ['CoreEngine']['Game_Unit_onBattleEnd']=Game_Unit[_0x555f1c(0x54e)][_0x555f1c(0x3b1)],Game_Unit[_0x555f1c(0x54e)][_0x555f1c(0x3b1)]=function(){const _0x46b514=_0x555f1c;for(const _0x350f40 of this[_0x46b514(0x162)]()){_0x350f40&&!_0x350f40[_0x46b514(0x511)]()&&_0x350f40[_0x46b514(0x716)]();}VisuMZ[_0x46b514(0x5c5)][_0x46b514(0x1f4)]['call'](this);},Object[_0x555f1c(0x433)](Game_Enemy[_0x555f1c(0x54e)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x555f1c(0x54e)][_0x555f1c(0x8c4)]=function(){const _0x3269f5=_0x555f1c;return this[_0x3269f5(0x3b8)]()[_0x3269f5(0x41a)];},Game_Enemy['prototype'][_0x555f1c(0x2a2)]=function(){const _0x374c9e=_0x555f1c;!this[_0x374c9e(0x58e)]&&(this[_0x374c9e(0x270)]+=Math[_0x374c9e(0x647)]((Graphics[_0x374c9e(0x63d)]-0x270)/0x2),this[_0x374c9e(0x270)]-=Math[_0x374c9e(0x5ad)]((Graphics[_0x374c9e(0x63d)]-Graphics[_0x374c9e(0x4b5)])/0x2),$gameSystem[_0x374c9e(0x558)]()?this[_0x374c9e(0x1d2)]-=Math[_0x374c9e(0x5ad)]((Graphics[_0x374c9e(0x83c)]-Graphics[_0x374c9e(0x321)])/0x2):this['_screenX']+=Math[_0x374c9e(0x647)]((Graphics[_0x374c9e(0x321)]-0x330)/0x2)),this[_0x374c9e(0x58e)]=!![];},Game_Party[_0x555f1c(0x54e)][_0x555f1c(0x45c)]=function(){const _0x1b17fb=_0x555f1c;return VisuMZ[_0x1b17fb(0x5c5)][_0x1b17fb(0x51b)][_0x1b17fb(0x6a4)][_0x1b17fb(0x70a)];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x2af)]=Game_Party[_0x555f1c(0x54e)][_0x555f1c(0x581)],Game_Party[_0x555f1c(0x54e)][_0x555f1c(0x581)]=function(_0x2e22bc){const _0x1c480a=_0x555f1c;if(VisuMZ[_0x1c480a(0x5c5)][_0x1c480a(0x51b)][_0x1c480a(0x71c)][_0x1c480a(0x1bb)]&&DataManager[_0x1c480a(0x51c)](_0x2e22bc))return;VisuMZ[_0x1c480a(0x5c5)]['Game_Party_consumeItem'][_0x1c480a(0x2b0)](this,_0x2e22bc);},Game_Party['prototype'][_0x555f1c(0x441)]=function(){const _0x184d13=_0x555f1c,_0x778c55=VisuMZ[_0x184d13(0x5c5)][_0x184d13(0x51b)][_0x184d13(0x71c)],_0x4e07c9=_0x778c55[_0x184d13(0x12d)]??0x63;let _0x3360a4=[];(_0x778c55[_0x184d13(0x3fc)]??!![])&&(_0x3360a4=_0x3360a4[_0x184d13(0x8b0)]($dataItems));(_0x778c55[_0x184d13(0x3bf)]??!![])&&(_0x3360a4=_0x3360a4['concat']($dataWeapons));(_0x778c55[_0x184d13(0x469)]??!![])&&(_0x3360a4=_0x3360a4[_0x184d13(0x8b0)]($dataArmors));for(const _0x50125a of _0x3360a4){if(!_0x50125a)continue;if(_0x50125a[_0x184d13(0x381)][_0x184d13(0x26b)]()<=0x0)continue;if(_0x50125a['name'][_0x184d13(0x3b6)](/-----/i))continue;this[_0x184d13(0x8c0)](_0x50125a,_0x4e07c9);}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6c2)]=Game_Troop['prototype'][_0x555f1c(0x77b)],Game_Troop[_0x555f1c(0x54e)]['setup']=function(_0x8fea6c){const _0x41fdbd=_0x555f1c;$gameTemp[_0x41fdbd(0x44f)](),$gameTemp[_0x41fdbd(0x198)](_0x8fea6c),VisuMZ[_0x41fdbd(0x5c5)][_0x41fdbd(0x6c2)][_0x41fdbd(0x2b0)](this,_0x8fea6c);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x32e)]=Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x77b)],Game_Map['prototype']['setup']=function(_0x1adb1f){const _0x550274=_0x555f1c;VisuMZ['CoreEngine']['Game_Map_setup'][_0x550274(0x2b0)](this,_0x1adb1f),this[_0x550274(0x2cf)](),this[_0x550274(0x563)](_0x1adb1f),this[_0x550274(0x31a)]();},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x563)]=function(){const _0x3517a6=_0x555f1c;this[_0x3517a6(0x7fc)]=VisuMZ[_0x3517a6(0x5c5)][_0x3517a6(0x51b)]['QoL'][_0x3517a6(0x52e)]||![];const _0x3b3de7=VisuMZ[_0x3517a6(0x5c5)][_0x3517a6(0x51b)]['ScreenResolution'],_0x125271=$dataMap?$dataMap[_0x3517a6(0x6ae)]||'':'';if(_0x125271[_0x3517a6(0x3b6)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];else _0x125271[_0x3517a6(0x3b6)](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x125271[_0x3517a6(0x3b6)](/<SCROLL LOCK X>/i))this['centerCameraCheckData']()[_0x3517a6(0x72d)]=!![],this[_0x3517a6(0x56d)]()[_0x3517a6(0x7d6)]=_0x3b3de7['DisplayLockX'];else _0x125271[_0x3517a6(0x3b6)](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x3517a6(0x72d)]=!![],this['centerCameraCheckData']()[_0x3517a6(0x7d6)]=Number(RegExp['$1']));if(_0x125271['match'](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()['centerY']=!![],this[_0x3517a6(0x56d)]()[_0x3517a6(0x7cb)]=_0x3b3de7[_0x3517a6(0x8c2)];else _0x125271[_0x3517a6(0x3b6)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x3517a6(0x56d)]()[_0x3517a6(0x2e9)]=!![],this[_0x3517a6(0x56d)]()[_0x3517a6(0x7cb)]=Number(RegExp['$1']));},Game_Map['prototype']['areTileShadowsHidden']=function(){const _0xb18e0f=_0x555f1c;if(this[_0xb18e0f(0x7fc)]===undefined)this['setupCoreEngine']();return this[_0xb18e0f(0x7fc)];},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x2cf)]=function(){const _0x43972c=_0x555f1c,_0x4ee518=VisuMZ['CoreEngine'][_0x43972c(0x51b)][_0x43972c(0x6d8)];this[_0x43972c(0x7bc)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x4ee518[_0x43972c(0x15f)]){const _0x25b155=Graphics[_0x43972c(0x83c)]/this[_0x43972c(0x8db)]();_0x25b155%0x1!==0x0&&Math['ceil'](_0x25b155)===this[_0x43972c(0x83c)]()&&!this[_0x43972c(0x5ae)]()&&(this[_0x43972c(0x7bc)][_0x43972c(0x72d)]=!![],this[_0x43972c(0x7bc)][_0x43972c(0x7d6)]=_0x4ee518['DisplayLockX']||0x0);}if(_0x4ee518[_0x43972c(0x820)]){const _0x485911=Graphics[_0x43972c(0x63d)]/this['tileHeight']();_0x485911%0x1!==0x0&&Math[_0x43972c(0x337)](_0x485911)===this[_0x43972c(0x63d)]()&&!this[_0x43972c(0x470)]()&&(this[_0x43972c(0x7bc)][_0x43972c(0x2e9)]=!![],this[_0x43972c(0x7bc)]['displayY']=_0x4ee518['DisplayLockY']||0x0);}$gameScreen[_0x43972c(0x2ca)]()===0x1&&(this[_0x43972c(0x56d)]()['centerX']&&(this[_0x43972c(0x410)]=this[_0x43972c(0x56d)]()['displayX']),this[_0x43972c(0x56d)]()[_0x43972c(0x2e9)]&&(this[_0x43972c(0x3d4)]=this[_0x43972c(0x56d)]()[_0x43972c(0x7cb)]));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x206)]=Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x45b)],Game_Map[_0x555f1c(0x54e)]['setDisplayPos']=function(_0x2ec91b,_0x46a97f){const _0x2db1b7=_0x555f1c;VisuMZ['CoreEngine'][_0x2db1b7(0x206)]['call'](this,_0x2ec91b,_0x46a97f),$gameScreen[_0x2db1b7(0x2ca)]()===0x1&&(!this[_0x2db1b7(0x5ae)]()&&this[_0x2db1b7(0x56d)]()[_0x2db1b7(0x72d)]&&(this[_0x2db1b7(0x410)]=this[_0x2db1b7(0x56d)]()['displayX']),!this[_0x2db1b7(0x470)]()&&this[_0x2db1b7(0x56d)]()[_0x2db1b7(0x2e9)]&&(this[_0x2db1b7(0x3d4)]=this[_0x2db1b7(0x56d)]()[_0x2db1b7(0x7cb)]));},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x56d)]=function(){const _0x8059cd=_0x555f1c;if(this[_0x8059cd(0x7bc)]===undefined)this[_0x8059cd(0x2cf)]();return this[_0x8059cd(0x7bc)];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4d8)]=Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x4bd)],Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x4bd)]=function(_0x3aa69d){const _0x39c074=_0x555f1c;if(this[_0x39c074(0x56d)]()[_0x39c074(0x2e9)]&&$gameScreen[_0x39c074(0x2ca)]()===0x1){this[_0x39c074(0x3d4)]=this[_0x39c074(0x56d)]()[_0x39c074(0x7cb)];return;}VisuMZ[_0x39c074(0x5c5)][_0x39c074(0x4d8)][_0x39c074(0x2b0)](this,_0x3aa69d);},VisuMZ[_0x555f1c(0x5c5)]['Game_Map_scrollLeft']=Game_Map[_0x555f1c(0x54e)]['scrollLeft'],Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x3c2)]=function(_0x168f31){const _0x318df6=_0x555f1c;if(this[_0x318df6(0x56d)]()[_0x318df6(0x72d)]&&$gameScreen[_0x318df6(0x2ca)]()===0x1){this[_0x318df6(0x410)]=this['centerCameraCheckData']()[_0x318df6(0x7d6)];return;}VisuMZ['CoreEngine'][_0x318df6(0x7c4)]['call'](this,_0x168f31);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x79f)]=Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x55c)],Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x55c)]=function(_0x5aaa9f){const _0xe7265=_0x555f1c;if(this['centerCameraCheckData']()[_0xe7265(0x72d)]&&$gameScreen['zoomScale']()===0x1){this[_0xe7265(0x410)]=this[_0xe7265(0x56d)]()[_0xe7265(0x7d6)];return;}VisuMZ[_0xe7265(0x5c5)][_0xe7265(0x79f)][_0xe7265(0x2b0)](this,_0x5aaa9f);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x1da)]=Game_Map[_0x555f1c(0x54e)]['scrollUp'],Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x87d)]=function(_0x52cacf){const _0x291577=_0x555f1c;if(this[_0x291577(0x56d)]()[_0x291577(0x2e9)]&&$gameScreen[_0x291577(0x2ca)]()===0x1){this[_0x291577(0x3d4)]=this[_0x291577(0x56d)]()[_0x291577(0x7cb)];return;}VisuMZ['CoreEngine'][_0x291577(0x1da)][_0x291577(0x2b0)](this,_0x52cacf);},Game_Map['prototype'][_0x555f1c(0x31a)]=function(){const _0x5bf571=_0x555f1c;this[_0x5bf571(0x646)]={};const _0x4e2f41=this[_0x5bf571(0x86c)]();if(!_0x4e2f41)return{};const _0x2a26d5=_0x4e2f41[_0x5bf571(0x6ae)]||'',_0x50abae=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x55aba2={};const _0xb4d32f=_0x2a26d5['match'](_0x50abae);if(_0xb4d32f)for(const _0xcc3e1d of _0xb4d32f){_0xcc3e1d[_0x5bf571(0x3b6)](_0x50abae);const _0x19b7fe=Number(RegExp['$1'])[_0x5bf571(0x739)](0x1,0x10),_0x3b3d89=String(RegExp['$2'])[_0x5bf571(0x69a)](',')['map'](_0x482c93=>Number(_0x482c93)[_0x5bf571(0x739)](0x1,0x7));for(const _0x1b84d0 of _0x3b3d89){_0x55aba2[_0x1b84d0]=_0x19b7fe;}}this[_0x5bf571(0x646)]=_0x55aba2;},Game_Map[_0x555f1c(0x54e)]['getTileExtendTerrainTags']=function(){const _0x32f198=_0x555f1c;if(this[_0x32f198(0x646)]===undefined)this[_0x32f198(0x31a)]();return this[_0x32f198(0x646)];},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x2fd)]=function(_0x2f5f0b){const _0x4f118b=_0x555f1c;if(_0x2f5f0b>=0x400)return![];const _0x10e54a=$gameMap[_0x4f118b(0x57f)]();if(Object[_0x4f118b(0x1c2)](_0x10e54a)[_0x4f118b(0x6d6)]<=0x0)return![];const _0x529a92=this[_0x4f118b(0x2c4)](),_0x56cc3f=_0x529a92[_0x2f5f0b]>>0xc,_0x1dffc3=_0x10e54a[_0x56cc3f]||0x0;return _0x1dffc3>0x0;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x877)]=Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x88e)],Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x88e)]=function(_0x944a8b){const _0x1ba0a1=_0x555f1c;VisuMZ[_0x1ba0a1(0x5c5)][_0x1ba0a1(0x877)][_0x1ba0a1(0x2b0)](this,_0x944a8b),this[_0x1ba0a1(0x1f8)](),SceneManager[_0x1ba0a1(0x7b9)][_0x1ba0a1(0x723)][_0x1ba0a1(0x202)]();},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x1f8)]=function(){const _0x41737b=_0x555f1c,_0x2e5d35=this[_0x41737b(0x57f)]();if(Object[_0x41737b(0x1c2)](_0x2e5d35)[_0x41737b(0x6d6)]<=0x0)return;const _0x5cd9c3=SceneManager['_scene'][_0x41737b(0x723)];_0x5cd9c3&&(_0x5cd9c3['removeTileExtendSprites']&&_0x5cd9c3[_0x41737b(0x774)](),_0x5cd9c3['createTileExtendSprites']&&_0x5cd9c3[_0x41737b(0x889)]());},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3cb)]=Game_Character[_0x555f1c(0x54e)][_0x555f1c(0x84e)],Game_Character[_0x555f1c(0x54e)][_0x555f1c(0x84e)]=function(_0x353152){const _0x466f12=_0x555f1c;try{VisuMZ[_0x466f12(0x5c5)][_0x466f12(0x3cb)][_0x466f12(0x2b0)](this,_0x353152);}catch(_0x19d340){if($gameTemp[_0x466f12(0x6d5)]())console[_0x466f12(0x4d7)](_0x19d340);}},Game_Player[_0x555f1c(0x54e)][_0x555f1c(0x23b)]=function(){const _0x678a05=_0x555f1c,_0x4bdba0=$gameMap['encounterStep']();this['_encounterCount']=Math[_0x678a05(0x83e)](_0x4bdba0)+Math[_0x678a05(0x83e)](_0x4bdba0)+this['encounterStepsMinimum']();},Game_Player[_0x555f1c(0x54e)][_0x555f1c(0x510)]=function(){const _0x2feb41=_0x555f1c;return $dataMap&&$dataMap[_0x2feb41(0x6ae)]&&$dataMap[_0x2feb41(0x6ae)][_0x2feb41(0x3b6)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x2feb41(0x5c5)]['Settings'][_0x2feb41(0x71c)]['EncounterRateMinimum'];},VisuMZ[_0x555f1c(0x5c5)]['Game_Event_isCollidedWithEvents']=Game_Event['prototype'][_0x555f1c(0x389)],Game_Event[_0x555f1c(0x54e)][_0x555f1c(0x389)]=function(_0x12b35b,_0x5f58b0){const _0x3749af=_0x555f1c;return this[_0x3749af(0x2a0)]()?this[_0x3749af(0x6c4)](_0x12b35b,_0x5f58b0):VisuMZ[_0x3749af(0x5c5)][_0x3749af(0x38f)][_0x3749af(0x2b0)](this,_0x12b35b,_0x5f58b0);},Game_Event['prototype']['isSmartEventCollisionOn']=function(){const _0x581479=_0x555f1c;return VisuMZ['CoreEngine'][_0x581479(0x51b)]['QoL'][_0x581479(0x696)];},Game_Event['prototype'][_0x555f1c(0x6c4)]=function(_0x25fd77,_0x350d22){const _0xa07f23=_0x555f1c;if(!this[_0xa07f23(0x51a)]())return![];else{const _0x5640ce=$gameMap[_0xa07f23(0x5ac)](_0x25fd77,_0x350d22)['filter'](_0x368853=>_0x368853['isNormalPriority']());return _0x5640ce[_0xa07f23(0x6d6)]>0x0;}},VisuMZ['CoreEngine']['Game_Interpreter_command105']=Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0xfc)],Game_Interpreter[_0x555f1c(0x54e)]['command105']=function(_0x15764d){const _0xec3184=_0x555f1c,_0x4643fd=this['getCombinedScrollingText']();return _0x4643fd[_0xec3184(0x3b6)](/\/\/[ ]SCRIPT[ ]CALL/i)?this['runCombinedScrollingTextAsCode'](_0x4643fd):VisuMZ[_0xec3184(0x5c5)][_0xec3184(0x56b)][_0xec3184(0x2b0)](this,_0x15764d);},Game_Interpreter[_0x555f1c(0x54e)]['getCombinedScrollingText']=function(){const _0x400689=_0x555f1c;let _0x3a6432='',_0x5cc41c=this[_0x400689(0x8b7)]+0x1;while(this[_0x400689(0x25d)][_0x5cc41c]&&this[_0x400689(0x25d)][_0x5cc41c][_0x400689(0x898)]===0x195){_0x3a6432+=this[_0x400689(0x25d)][_0x5cc41c][_0x400689(0x556)][0x0]+'\x0a',_0x5cc41c++;}return _0x3a6432;},Game_Interpreter[_0x555f1c(0x54e)]['runCombinedScrollingTextAsCode']=function(_0x4ef039){const _0xa99c=_0x555f1c;try{eval(_0x4ef039);}catch(_0x20cbfe){$gameTemp['isPlaytest']()&&(console[_0xa99c(0x4d7)](_0xa99c(0x64a)),console[_0xa99c(0x4d7)](_0x20cbfe));}return!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x8ca)]=Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x659)],Game_Interpreter[_0x555f1c(0x54e)]['command111']=function(_0x3c6bfa){const _0x484a31=_0x555f1c;try{VisuMZ[_0x484a31(0x5c5)]['Game_Interpreter_command111'][_0x484a31(0x2b0)](this,_0x3c6bfa);}catch(_0x160f00){$gameTemp['isPlaytest']()&&(console['log'](_0x484a31(0x523)),console[_0x484a31(0x4d7)](_0x160f00)),this[_0x484a31(0x27b)]();}return!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x767)]=Game_Interpreter['prototype'][_0x555f1c(0x278)],Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x278)]=function(_0x5523f5){const _0x5cad13=_0x555f1c;try{VisuMZ[_0x5cad13(0x5c5)][_0x5cad13(0x767)][_0x5cad13(0x2b0)](this,_0x5523f5);}catch(_0x1ade7e){$gameTemp[_0x5cad13(0x6d5)]()&&(console[_0x5cad13(0x4d7)](_0x5cad13(0x16e)),console[_0x5cad13(0x4d7)](_0x1ade7e));}return!![];},VisuMZ[_0x555f1c(0x5c5)]['Game_Interpreter_command355']=Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x7ba)],Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x7ba)]=function(){const _0x59766d=_0x555f1c;try{VisuMZ['CoreEngine'][_0x59766d(0x16d)]['call'](this);}catch(_0x403f47){$gameTemp[_0x59766d(0x6d5)]()&&(console['log'](_0x59766d(0x386)),console['log'](_0x403f47));}return!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x673)]=Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x258)],Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x258)]=function(_0x569f6e){const _0x29cca6=_0x555f1c;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x29cca6(0x5c5)][_0x29cca6(0x673)][_0x29cca6(0x2b0)](this,_0x569f6e);},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x701)]=function(){const _0x25c96a=_0x555f1c;return VisuMZ['CoreEngine']['Settings']['UI'][_0x25c96a(0x56f)];},Scene_Base[_0x555f1c(0x54e)]['isBottomHelpMode']=function(){const _0x30fe5a=_0x555f1c;return VisuMZ[_0x30fe5a(0x5c5)][_0x30fe5a(0x51b)]['UI'][_0x30fe5a(0x835)];},Scene_Base[_0x555f1c(0x54e)]['isBottomButtonMode']=function(){const _0x54e976=_0x555f1c;return VisuMZ[_0x54e976(0x5c5)]['Settings']['UI'][_0x54e976(0x781)];},Scene_Base['prototype'][_0x555f1c(0x624)]=function(){const _0x4a5ba6=_0x555f1c;return VisuMZ[_0x4a5ba6(0x5c5)][_0x4a5ba6(0x51b)]['UI']['RightMenus'];},Scene_Base['prototype']['mainCommandWidth']=function(){const _0x828932=_0x555f1c;return VisuMZ['CoreEngine'][_0x828932(0x51b)]['UI'][_0x828932(0x8da)];},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x776)]=function(){const _0x506106=_0x555f1c;return VisuMZ['CoreEngine'][_0x506106(0x51b)]['UI'][_0x506106(0x4b7)];},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x146)]=function(){const _0x394ad7=_0x555f1c;return VisuMZ[_0x394ad7(0x5c5)][_0x394ad7(0x51b)][_0x394ad7(0x2f5)][_0x394ad7(0x13f)];},VisuMZ[_0x555f1c(0x5c5)]['Scene_Base_createWindowLayer']=Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x423)],Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x423)]=function(){const _0x59997d=_0x555f1c;VisuMZ[_0x59997d(0x5c5)][_0x59997d(0x362)][_0x59997d(0x2b0)](this),this[_0x59997d(0x5b6)](),this[_0x59997d(0x35a)](),this['_windowLayer']['x']=Math['round'](this['_windowLayer']['x']),this[_0x59997d(0x2c0)]['y']=Math[_0x59997d(0x647)](this[_0x59997d(0x2c0)]['y']);},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x5b6)]=function(){},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x35a)]=function(){const _0x5a66ca=_0x555f1c;this['_textPopupWindow']=new Window_TextPopup(),this[_0x5a66ca(0x463)](this[_0x5a66ca(0x3e8)]);},$textPopup=function(_0x3923e9){const _0x39a605=_0x555f1c,_0x1a550d=SceneManager[_0x39a605(0x7b9)][_0x39a605(0x3e8)];_0x1a550d&&_0x1a550d['addQueue'](_0x3923e9);},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x1b1)]=function(){const _0x333c18=_0x555f1c;return TextManager[_0x333c18(0x15d)](_0x333c18(0x3d7),_0x333c18(0x708));},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x1ae)]=function(){const _0x56444c=_0x555f1c;return TextManager[_0x56444c(0x1ea)]('tab');},Scene_Base['prototype'][_0x555f1c(0x7f3)]=function(){const _0x4bda94=_0x555f1c;return TextManager[_0x4bda94(0x1ea)](_0x4bda94(0x1eb));},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x642)]=function(){const _0x342725=_0x555f1c;return TextManager[_0x342725(0x1ea)]('ok');},Scene_Base[_0x555f1c(0x54e)]['buttonAssistKey5']=function(){const _0x5eb406=_0x555f1c;return TextManager[_0x5eb406(0x1ea)](_0x5eb406(0x201));},Scene_Base['prototype'][_0x555f1c(0x664)]=function(){const _0x35918d=_0x555f1c;return this[_0x35918d(0x5c2)]&&this[_0x35918d(0x5c2)][_0x35918d(0x5c8)]?TextManager[_0x35918d(0x30a)]:'';},Scene_Base['prototype']['buttonAssistText2']=function(){return'';},Scene_Base['prototype'][_0x555f1c(0x233)]=function(){return'';},Scene_Base['prototype'][_0x555f1c(0x512)]=function(){const _0x1f968e=_0x555f1c;return TextManager[_0x1f968e(0x6ed)];},Scene_Base[_0x555f1c(0x54e)]['buttonAssistText5']=function(){return TextManager['buttonAssistCancel'];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x319)]=function(){return 0x0;},Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0xfd)]=function(){return 0x0;},Scene_Base['prototype'][_0x555f1c(0x29a)]=function(){return 0x0;},Scene_Base[_0x555f1c(0x54e)]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x555f1c(0x5c5)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x555f1c(0x54e)]['loadSystemImages'],Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x495)]=function(){const _0x23ccdf=_0x555f1c;VisuMZ['CoreEngine']['Scene_Boot_loadSystemImages']['call'](this),this[_0x23ccdf(0x42f)]();},Scene_Boot['prototype'][_0x555f1c(0x42f)]=function(){const _0x3da201=_0x555f1c,_0x2910cd=[_0x3da201(0x747),_0x3da201(0x1a2),'battlebacks2',_0x3da201(0x4a1),'enemies',_0x3da201(0x70c),_0x3da201(0x5b5),_0x3da201(0x644),_0x3da201(0x752),_0x3da201(0x79d),'system',_0x3da201(0x183),'titles1','titles2'];for(const _0x4af5dd of _0x2910cd){const _0xea849a=VisuMZ[_0x3da201(0x5c5)][_0x3da201(0x51b)][_0x3da201(0x5c0)][_0x4af5dd],_0x42b780=_0x3da201(0x116)[_0x3da201(0x39f)](_0x4af5dd);for(const _0x3f8320 of _0xea849a){ImageManager['loadBitmap'](_0x42b780,_0x3f8320);}}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4b8)]=Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x51e)],Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x51e)]=function(){const _0x4379cf=_0x555f1c;Utils[_0x4379cf(0x4d2)](_0x4379cf(0x617))&&VisuMZ['CoreEngine'][_0x4379cf(0x51b)][_0x4379cf(0x71c)][_0x4379cf(0x6a8)]?this['startAutoNewGame']():VisuMZ[_0x4379cf(0x5c5)]['Scene_Boot_startNormalGame'][_0x4379cf(0x2b0)](this);},Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x786)]=function(){const _0x1725a5=_0x555f1c;this[_0x1725a5(0x292)](),DataManager[_0x1725a5(0x17e)](),SceneManager[_0x1725a5(0x793)](Scene_Map);},Scene_Boot['prototype'][_0x555f1c(0x480)]=function(){const _0x356012=_0x555f1c,_0x4c55af=$dataSystem['advanced'][_0x356012(0x27a)],_0xdaa045=$dataSystem[_0x356012(0x5c7)][_0x356012(0x197)],_0x5a48be=VisuMZ['CoreEngine']['Settings']['UI'][_0x356012(0x498)];Graphics[_0x356012(0x321)]=_0x4c55af-_0x5a48be*0x2,Graphics[_0x356012(0x4b5)]=_0xdaa045-_0x5a48be*0x2,this[_0x356012(0x652)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x73c)]=Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x1c0)],Scene_Boot[_0x555f1c(0x54e)][_0x555f1c(0x1c0)]=function(){const _0x420e72=_0x555f1c;this[_0x420e72(0x865)]()?this[_0x420e72(0x2a6)]():VisuMZ[_0x420e72(0x5c5)][_0x420e72(0x73c)][_0x420e72(0x2b0)](this);},Scene_Boot['prototype']['isFullDocumentTitle']=function(){const _0x797a3a=_0x555f1c;if(Scene_Title[_0x797a3a(0x45e)]==='')return![];if(Scene_Title[_0x797a3a(0x45e)]===_0x797a3a(0x1f7))return![];if(Scene_Title[_0x797a3a(0x3c8)]==='')return![];if(Scene_Title[_0x797a3a(0x3c8)]===_0x797a3a(0x6ba))return![];return!![];},Scene_Boot['prototype'][_0x555f1c(0x2a6)]=function(){const _0x1d29ba=_0x555f1c,_0x368774=$dataSystem[_0x1d29ba(0x630)],_0x3ca603=Scene_Title['subtitle']||'',_0x2be868=Scene_Title[_0x1d29ba(0x3c8)]||'',_0x3b6b74=VisuMZ[_0x1d29ba(0x5c5)][_0x1d29ba(0x51b)][_0x1d29ba(0x224)][_0x1d29ba(0x212)]['DocumentTitleFmt'],_0x25ca63=_0x3b6b74[_0x1d29ba(0x39f)](_0x368774,_0x3ca603,_0x2be868);document[_0x1d29ba(0x839)]=_0x25ca63;},Scene_Boot[_0x555f1c(0x54e)]['determineSideButtonLayoutValid']=function(){const _0x1f0464=_0x555f1c;if(VisuMZ[_0x1f0464(0x5c5)]['Settings']['UI'][_0x1f0464(0x4ed)]){const _0x469827=Graphics[_0x1f0464(0x83c)]-Graphics['boxWidth']-VisuMZ[_0x1f0464(0x5c5)][_0x1f0464(0x51b)]['UI'][_0x1f0464(0x498)]*0x2,_0x1e6118=Sprite_Button[_0x1f0464(0x54e)][_0x1f0464(0x68d)][_0x1f0464(0x2b0)](this)*0x4;if(_0x469827>=_0x1e6118)SceneManager[_0x1f0464(0x7cc)](!![]);}},Scene_Title[_0x555f1c(0x45e)]=VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x224)]['Title'][_0x555f1c(0x1f7)],Scene_Title['version']=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)][_0x555f1c(0x212)][_0x555f1c(0x6af)],Scene_Title[_0x555f1c(0x49b)]=VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x3aa)],VisuMZ[_0x555f1c(0x5c5)]['Scene_Title_drawGameTitle']=Scene_Title[_0x555f1c(0x54e)][_0x555f1c(0x7cd)],Scene_Title[_0x555f1c(0x54e)]['drawGameTitle']=function(){const _0x3d4961=_0x555f1c;VisuMZ['CoreEngine'][_0x3d4961(0x51b)][_0x3d4961(0x224)][_0x3d4961(0x212)]['drawGameTitle']['call'](this);if(Scene_Title[_0x3d4961(0x45e)]!==''&&Scene_Title['subtitle']!==_0x3d4961(0x1f7))this['drawGameSubtitle']();if(Scene_Title[_0x3d4961(0x3c8)]!==''&&Scene_Title[_0x3d4961(0x3c8)]!==_0x3d4961(0x6ba))this[_0x3d4961(0x284)]();},Scene_Title[_0x555f1c(0x54e)][_0x555f1c(0x4d1)]=function(){const _0x4bd80d=_0x555f1c;VisuMZ[_0x4bd80d(0x5c5)]['Settings'][_0x4bd80d(0x224)][_0x4bd80d(0x212)][_0x4bd80d(0x4d1)][_0x4bd80d(0x2b0)](this);},Scene_Title['prototype']['drawGameVersion']=function(){const _0x481517=_0x555f1c;VisuMZ[_0x481517(0x5c5)][_0x481517(0x51b)][_0x481517(0x224)][_0x481517(0x212)][_0x481517(0x284)][_0x481517(0x2b0)](this);},Scene_Title[_0x555f1c(0x54e)][_0x555f1c(0x689)]=function(){const _0x579d6a=_0x555f1c;this[_0x579d6a(0x4cf)]();const _0x8f58e5=$dataSystem[_0x579d6a(0x52b)][_0x579d6a(0x5b7)],_0x372719=this[_0x579d6a(0x1de)]();this[_0x579d6a(0x5ed)]=new Window_TitleCommand(_0x372719),this['_commandWindow'][_0x579d6a(0x75d)](_0x8f58e5);const _0x277539=this[_0x579d6a(0x1de)]();this['_commandWindow'][_0x579d6a(0x25f)](_0x277539['x'],_0x277539['y'],_0x277539[_0x579d6a(0x83c)],_0x277539[_0x579d6a(0x63d)]),this[_0x579d6a(0x5ed)][_0x579d6a(0x8e2)](),this[_0x579d6a(0x5ed)]['refresh'](),this[_0x579d6a(0x5ed)]['selectLast'](),this['addWindow'](this['_commandWindow']);},Scene_Title['prototype'][_0x555f1c(0x1af)]=function(){const _0x2167b3=_0x555f1c;return this[_0x2167b3(0x5ed)]?this[_0x2167b3(0x5ed)]['maxItems']():VisuMZ[_0x2167b3(0x5c5)][_0x2167b3(0x51b)][_0x2167b3(0x4c1)][_0x2167b3(0x6d6)];},Scene_Title[_0x555f1c(0x54e)][_0x555f1c(0x1de)]=function(){const _0x4018c2=_0x555f1c;return VisuMZ[_0x4018c2(0x5c5)][_0x4018c2(0x51b)][_0x4018c2(0x224)][_0x4018c2(0x212)][_0x4018c2(0x858)][_0x4018c2(0x2b0)](this);},Scene_Title[_0x555f1c(0x54e)]['createTitleButtons']=function(){const _0x3377fa=_0x555f1c;for(const _0x2fa848 of Scene_Title[_0x3377fa(0x49b)]){const _0x1c6f17=new Sprite_TitlePictureButton(_0x2fa848);this[_0x3377fa(0x463)](_0x1c6f17);}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x78f)]=Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x124)],Scene_Map['prototype'][_0x555f1c(0x124)]=function(){const _0x41346a=_0x555f1c;VisuMZ[_0x41346a(0x5c5)]['Scene_Map_initialize'][_0x41346a(0x2b0)](this),$gameTemp[_0x41346a(0x44f)](),this[_0x41346a(0x2c8)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x281)]=Scene_Map[_0x555f1c(0x54e)]['updateMainMultiply'],Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x1aa)]=function(){const _0x539ac2=_0x555f1c;VisuMZ[_0x539ac2(0x5c5)]['Scene_Map_updateMainMultiply'][_0x539ac2(0x2b0)](this),$gameTemp[_0x539ac2(0x121)]&&!$gameMessage['isBusy']()&&(this['updateMain'](),SceneManager[_0x539ac2(0x20a)]());},Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x10f)]=function(){const _0x3db03d=_0x555f1c;Scene_Message[_0x3db03d(0x54e)][_0x3db03d(0x10f)][_0x3db03d(0x2b0)](this),!SceneManager[_0x3db03d(0x22c)](Scene_Battle)&&(this[_0x3db03d(0x723)][_0x3db03d(0x202)](),this[_0x3db03d(0x762)][_0x3db03d(0x507)](),this[_0x3db03d(0x2c0)]['visible']=![],SceneManager[_0x3db03d(0x58a)]()),$gameScreen[_0x3db03d(0x26d)](),this[_0x3db03d(0x2c8)]();},VisuMZ[_0x555f1c(0x5c5)]['Scene_Map_createMenuButton']=Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x12a)],Scene_Map[_0x555f1c(0x54e)]['createMenuButton']=function(){const _0x5b51cb=_0x555f1c;VisuMZ[_0x5b51cb(0x5c5)][_0x5b51cb(0x65b)][_0x5b51cb(0x2b0)](this),SceneManager[_0x5b51cb(0x6fe)]()&&this[_0x5b51cb(0x702)]();},Scene_Map[_0x555f1c(0x54e)]['moveMenuButtonSideButtonLayout']=function(){this['_menuButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x815)]=Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x152)],Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x152)]=function(){const _0x1aa1e6=_0x555f1c;VisuMZ[_0x1aa1e6(0x5c5)][_0x1aa1e6(0x815)][_0x1aa1e6(0x2b0)](this),this[_0x1aa1e6(0x66c)]();},Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x66c)]=function(){const _0x7107b5=_0x555f1c;Input[_0x7107b5(0x492)](_0x7107b5(0x891))&&(ConfigManager[_0x7107b5(0x43d)]=!ConfigManager[_0x7107b5(0x43d)],ConfigManager[_0x7107b5(0xf5)]());},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x365)]=Scene_Map['prototype'][_0x555f1c(0x84c)],Scene_Map['prototype'][_0x555f1c(0x84c)]=function(){const _0x5dffca=_0x555f1c;VisuMZ[_0x5dffca(0x5c5)][_0x5dffca(0x365)][_0x5dffca(0x2b0)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x555f1c(0x54e)]['clearOnceParallelInterpreters']=function(){const _0x5b1261=_0x555f1c;this[_0x5b1261(0x323)]=[];},Scene_Map['prototype'][_0x555f1c(0x840)]=function(){const _0xc7696b=_0x555f1c;if(!this[_0xc7696b(0x323)])return;for(const _0xa1bc65 of this[_0xc7696b(0x323)]){_0xa1bc65&&_0xa1bc65[_0xc7696b(0x202)]();}},Scene_Map['prototype'][_0x555f1c(0x225)]=function(_0x508042,_0x557016){const _0x35c7ea=_0x555f1c,_0x574b8d=$dataCommonEvents[_0x508042];if(!_0x574b8d)return;const _0xae03b4=new Game_OnceParallelInterpreter();this[_0x35c7ea(0x7f0)](_0xae03b4),_0xae03b4[_0x35c7ea(0x640)](_0x508042),_0xae03b4[_0x35c7ea(0x828)](_0x557016);},Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x7f0)]=function(_0x1530ce){const _0x5124f1=_0x555f1c;this[_0x5124f1(0x323)]=this[_0x5124f1(0x323)]||[],this[_0x5124f1(0x323)][_0x5124f1(0x45f)](_0x1530ce);},Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x552)]=function(_0x5a4f11){const _0x337357=_0x555f1c;this[_0x337357(0x323)]=this[_0x337357(0x323)]||[],this[_0x337357(0x323)][_0x337357(0x24a)](_0x5a4f11);};function Game_OnceParallelInterpreter(){const _0x467afe=_0x555f1c;this[_0x467afe(0x124)](...arguments);}Game_OnceParallelInterpreter[_0x555f1c(0x54e)]=Object[_0x555f1c(0x663)](Game_Interpreter[_0x555f1c(0x54e)]),Game_OnceParallelInterpreter[_0x555f1c(0x54e)][_0x555f1c(0x141)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x555f1c(0x640)]=function(_0x891309){const _0x1b1ba9=_0x555f1c,_0x43be9e=$dataCommonEvents[_0x891309];_0x43be9e?this['setup'](_0x43be9e[_0x1b1ba9(0x57c)],0x0):this[_0x1b1ba9(0x10f)]();},Game_OnceParallelInterpreter[_0x555f1c(0x54e)]['setEvent']=function(_0x32de6c){const _0x29e2d7=_0x555f1c;this[_0x29e2d7(0x84b)]=_0x32de6c||0x0;},Game_OnceParallelInterpreter[_0x555f1c(0x54e)][_0x555f1c(0x10f)]=function(){const _0x198bef=_0x555f1c;if(!SceneManager[_0x198bef(0x85d)]())return;SceneManager[_0x198bef(0x7b9)][_0x198bef(0x552)](this),Game_Interpreter['prototype'][_0x198bef(0x10f)]['call'](this);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x7c5)]=Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x5e9)],Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x5e9)]=function(){const _0x32a72b=_0x555f1c;let _0x3e6eeb=0x0;return SceneManager[_0x32a72b(0x7f2)]()?_0x3e6eeb=this[_0x32a72b(0x471)]():_0x3e6eeb=VisuMZ[_0x32a72b(0x5c5)][_0x32a72b(0x7c5)][_0x32a72b(0x2b0)](this),_0x3e6eeb;},Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x471)]=function(){const _0x35a4d7=_0x555f1c;return this[_0x35a4d7(0x27d)]()?this[_0x35a4d7(0x23f)]():0x0;},VisuMZ[_0x555f1c(0x5c5)]['Scene_MenuBase_mainAreaTop']=Scene_MenuBase[_0x555f1c(0x54e)]['mainAreaTop'],Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x2cb)]=function(){const _0x240212=_0x555f1c;return SceneManager[_0x240212(0x7f2)]()?this[_0x240212(0x5ea)]():VisuMZ[_0x240212(0x5c5)]['Scene_MenuBase_mainAreaTop'][_0x240212(0x2b0)](this);},Scene_MenuBase['prototype'][_0x555f1c(0x5ea)]=function(){const _0x432231=_0x555f1c;if(!this[_0x432231(0x27d)]())return this[_0x432231(0x3ff)]();else return this[_0x432231(0x453)]()&&this[_0x432231(0x78c)]()===_0x432231(0x333)?Window_ButtonAssist[_0x432231(0x54e)][_0x432231(0x449)]():0x0;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x255)]=Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x299)],Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x299)]=function(){const _0x595f40=_0x555f1c;let _0x472b19=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x472b19=this[_0x595f40(0x5e7)]():_0x472b19=VisuMZ[_0x595f40(0x5c5)][_0x595f40(0x255)][_0x595f40(0x2b0)](this),this['isMenuButtonAssistEnabled']()&&this[_0x595f40(0x78c)]()!==_0x595f40(0x3e2)&&(_0x472b19-=Window_ButtonAssist[_0x595f40(0x54e)][_0x595f40(0x449)]()),_0x472b19;},Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x5e7)]=function(){const _0x12f769=_0x555f1c;return Graphics[_0x12f769(0x4b5)]-this[_0x12f769(0x27f)]();},VisuMZ[_0x555f1c(0x5c5)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x47e)],Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x47e)]=function(){const _0x2ae76=_0x555f1c,_0x4a80f2=VisuMZ[_0x2ae76(0x5c5)]['Settings']['MenuBg'][_0x2ae76(0x1c4)]??0x8;this['_backgroundFilter']=new PIXI[(_0x2ae76(0x4e7))][(_0x2ae76(0x5a2))](_0x4a80f2),this[_0x2ae76(0x89a)]=new Sprite(),this[_0x2ae76(0x89a)][_0x2ae76(0x4c8)]=SceneManager[_0x2ae76(0x837)](),this['_backgroundSprite']['filters']=[this[_0x2ae76(0x8df)]],this[_0x2ae76(0x463)](this[_0x2ae76(0x89a)]),this[_0x2ae76(0x897)](0xc0),this[_0x2ae76(0x897)](this[_0x2ae76(0x68e)]()),this[_0x2ae76(0x16c)]();},Scene_MenuBase[_0x555f1c(0x54e)]['getBackgroundOpacity']=function(){const _0x1c87c5=_0x555f1c,_0x262e57=String(this[_0x1c87c5(0x141)][_0x1c87c5(0x381)]),_0xe54f72=this['getCustomBackgroundSettings'](_0x262e57);return _0xe54f72?_0xe54f72[_0x1c87c5(0x59e)]:0xc0;},Scene_MenuBase[_0x555f1c(0x54e)]['createCustomBackgroundImages']=function(){const _0x5b27b1=_0x555f1c,_0x13a063=String(this[_0x5b27b1(0x141)]['name']),_0x892cba=this[_0x5b27b1(0x691)](_0x13a063);_0x892cba&&(_0x892cba[_0x5b27b1(0x357)]!==''||_0x892cba[_0x5b27b1(0x6f9)]!=='')&&(this[_0x5b27b1(0x1f0)]=new Sprite(ImageManager[_0x5b27b1(0x76f)](_0x892cba[_0x5b27b1(0x357)])),this[_0x5b27b1(0x304)]=new Sprite(ImageManager['loadTitle2'](_0x892cba[_0x5b27b1(0x6f9)])),this[_0x5b27b1(0x463)](this['_backSprite1']),this[_0x5b27b1(0x463)](this['_backSprite2']),this[_0x5b27b1(0x1f0)][_0x5b27b1(0x4c8)][_0x5b27b1(0x339)](this['adjustSprite'][_0x5b27b1(0x41d)](this,this[_0x5b27b1(0x1f0)])),this[_0x5b27b1(0x304)][_0x5b27b1(0x4c8)][_0x5b27b1(0x339)](this[_0x5b27b1(0x251)][_0x5b27b1(0x41d)](this,this['_backSprite2'])));},Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x691)]=function(_0xc300b0){const _0xf2d776=_0x555f1c;return VisuMZ[_0xf2d776(0x5c5)][_0xf2d776(0x51b)]['MenuBg'][_0xc300b0]||VisuMZ[_0xf2d776(0x5c5)][_0xf2d776(0x51b)][_0xf2d776(0x382)][_0xf2d776(0x4dc)];},Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x251)]=function(_0x29dea6){const _0x5f1bf7=_0x555f1c;this[_0x5f1bf7(0x7a4)](_0x29dea6),this[_0x5f1bf7(0x43b)](_0x29dea6);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0xf2)]=Scene_MenuBase[_0x555f1c(0x54e)]['createCancelButton'],Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x127)]=function(){const _0x3999e9=_0x555f1c;VisuMZ[_0x3999e9(0x5c5)][_0x3999e9(0xf2)]['call'](this),SceneManager[_0x3999e9(0x6fe)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x555f1c(0x54e)]['moveCancelButtonSideButtonLayout']=function(){const _0x36a2f6=_0x555f1c;this[_0x36a2f6(0x755)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x67e)]=Scene_MenuBase['prototype'][_0x555f1c(0x7b5)],Scene_MenuBase['prototype'][_0x555f1c(0x7b5)]=function(){const _0x1f98e0=_0x555f1c;VisuMZ[_0x1f98e0(0x5c5)][_0x1f98e0(0x67e)][_0x1f98e0(0x2b0)](this),SceneManager['isSideButtonLayout']()&&this[_0x1f98e0(0x59c)]();},Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x59c)]=function(){const _0x2b124c=_0x555f1c;this[_0x2b124c(0x5c2)]['x']=-0x1*(this[_0x2b124c(0x5c2)][_0x2b124c(0x83c)]+this[_0x2b124c(0x5fe)][_0x2b124c(0x83c)]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton'][_0x2b124c(0x83c)]+0x4);},Scene_MenuBase[_0x555f1c(0x54e)]['isMenuButtonAssistEnabled']=function(){const _0x10301d=_0x555f1c;return VisuMZ['CoreEngine']['Settings'][_0x10301d(0x879)][_0x10301d(0x7ff)];},Scene_MenuBase['prototype'][_0x555f1c(0x78c)]=function(){const _0x3560a7=_0x555f1c;return SceneManager[_0x3560a7(0x6fe)]()||SceneManager['areButtonsHidden']()?VisuMZ['CoreEngine'][_0x3560a7(0x51b)][_0x3560a7(0x879)][_0x3560a7(0x7a0)]:_0x3560a7(0x3e2);},Scene_MenuBase[_0x555f1c(0x54e)][_0x555f1c(0x5b6)]=function(){const _0x250bb7=_0x555f1c;if(!this[_0x250bb7(0x453)]())return;const _0xb1d2bd=this[_0x250bb7(0x17c)]();this[_0x250bb7(0x10b)]=new Window_ButtonAssist(_0xb1d2bd),this['addWindow'](this[_0x250bb7(0x10b)]);},Scene_MenuBase['prototype'][_0x555f1c(0x17c)]=function(){const _0x42ef94=_0x555f1c;return this[_0x42ef94(0x78c)]()===_0x42ef94(0x3e2)?this['buttonAssistWindowButtonRect']():this[_0x42ef94(0x73f)]();},Scene_MenuBase[_0x555f1c(0x54e)]['buttonAssistWindowButtonRect']=function(){const _0x5a3971=_0x555f1c,_0x3e4dd6=ConfigManager[_0x5a3971(0x869)]?(Sprite_Button['prototype'][_0x5a3971(0x68d)]()+0x6)*0x2:0x0,_0x51e269=this['buttonY'](),_0x5b58b8=Graphics[_0x5a3971(0x321)]-_0x3e4dd6*0x2,_0x2ab3e2=this[_0x5a3971(0x776)]();return new Rectangle(_0x3e4dd6,_0x51e269,_0x5b58b8,_0x2ab3e2);},Scene_MenuBase['prototype'][_0x555f1c(0x73f)]=function(){const _0x4d6d8c=_0x555f1c,_0x5da16a=Graphics[_0x4d6d8c(0x321)],_0x24cef9=Window_ButtonAssist[_0x4d6d8c(0x54e)][_0x4d6d8c(0x449)](),_0x516116=0x0;let _0x161a5d=0x0;return this[_0x4d6d8c(0x78c)]()===_0x4d6d8c(0x333)?_0x161a5d=0x0:_0x161a5d=Graphics[_0x4d6d8c(0x4b5)]-_0x24cef9,new Rectangle(_0x516116,_0x161a5d,_0x5da16a,_0x24cef9);},Scene_Menu[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)][_0x555f1c(0x600)],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x8b6)]=Scene_Menu['prototype'][_0x555f1c(0x663)],Scene_Menu[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x574ef4=_0x555f1c;VisuMZ['CoreEngine']['Scene_Menu_create'][_0x574ef4(0x2b0)](this),this[_0x574ef4(0x26e)]();},Scene_Menu['prototype'][_0x555f1c(0x26e)]=function(){const _0x25fef5=_0x555f1c;this[_0x25fef5(0x5ed)]&&this[_0x25fef5(0x5ed)][_0x25fef5(0x75d)](Scene_Menu[_0x25fef5(0x890)][_0x25fef5(0x4d4)]),this[_0x25fef5(0x142)]&&this['_goldWindow'][_0x25fef5(0x75d)](Scene_Menu['layoutSettings'][_0x25fef5(0x832)]),this[_0x25fef5(0x388)]&&this[_0x25fef5(0x388)][_0x25fef5(0x75d)](Scene_Menu['layoutSettings'][_0x25fef5(0x62f)]);},Scene_Menu[_0x555f1c(0x54e)]['commandWindowRect']=function(){const _0x5d4612=_0x555f1c;return Scene_Menu[_0x5d4612(0x890)][_0x5d4612(0x858)][_0x5d4612(0x2b0)](this);},Scene_Menu[_0x555f1c(0x54e)][_0x555f1c(0x61d)]=function(){const _0x4bb787=_0x555f1c;return Scene_Menu[_0x4bb787(0x890)][_0x4bb787(0x670)][_0x4bb787(0x2b0)](this);},Scene_Menu['prototype']['statusWindowRect']=function(){const _0x524a38=_0x555f1c;return Scene_Menu[_0x524a38(0x890)][_0x524a38(0x3ba)]['call'](this);},Scene_Item[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x224)]['ItemMenu'],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x8c5)]=Scene_Item[_0x555f1c(0x54e)][_0x555f1c(0x663)],Scene_Item[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x46502c=_0x555f1c;VisuMZ[_0x46502c(0x5c5)]['Scene_Item_create'][_0x46502c(0x2b0)](this),this[_0x46502c(0x26e)]();},Scene_Item[_0x555f1c(0x54e)][_0x555f1c(0x26e)]=function(){const _0x45b359=_0x555f1c;this[_0x45b359(0x61b)]&&this[_0x45b359(0x61b)][_0x45b359(0x75d)](Scene_Item[_0x45b359(0x890)]['HelpBgType']),this[_0x45b359(0x654)]&&this[_0x45b359(0x654)]['setBackgroundType'](Scene_Item['layoutSettings']['CategoryBgType']),this['_itemWindow']&&this[_0x45b359(0x327)]['setBackgroundType'](Scene_Item[_0x45b359(0x890)][_0x45b359(0x508)]),this[_0x45b359(0x30b)]&&this[_0x45b359(0x30b)][_0x45b359(0x75d)](Scene_Item['layoutSettings'][_0x45b359(0x6c9)]);},Scene_Item[_0x555f1c(0x54e)][_0x555f1c(0x283)]=function(){const _0x38cd13=_0x555f1c;return Scene_Item['layoutSettings'][_0x38cd13(0x10c)]['call'](this);},Scene_Item['prototype'][_0x555f1c(0x24b)]=function(){const _0x47ee02=_0x555f1c;return Scene_Item[_0x47ee02(0x890)][_0x47ee02(0x264)][_0x47ee02(0x2b0)](this);},Scene_Item[_0x555f1c(0x54e)][_0x555f1c(0x166)]=function(){const _0x5bfdee=_0x555f1c;return Scene_Item[_0x5bfdee(0x890)][_0x5bfdee(0x688)]['call'](this);},Scene_Item[_0x555f1c(0x54e)][_0x555f1c(0x829)]=function(){const _0x1b4448=_0x555f1c;return Scene_Item[_0x1b4448(0x890)][_0x1b4448(0x4f4)]['call'](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)][_0x555f1c(0x570)],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x109)]=Scene_Skill['prototype'][_0x555f1c(0x663)],Scene_Skill[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x5941bb=_0x555f1c;VisuMZ[_0x5941bb(0x5c5)]['Scene_Skill_create'][_0x5941bb(0x2b0)](this),this[_0x5941bb(0x26e)]();},Scene_Skill['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x1ac1cb=_0x555f1c;this[_0x1ac1cb(0x61b)]&&this[_0x1ac1cb(0x61b)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x1ac1cb(0x5aa)]),this[_0x1ac1cb(0x1a8)]&&this[_0x1ac1cb(0x1a8)]['setBackgroundType'](Scene_Skill[_0x1ac1cb(0x890)][_0x1ac1cb(0x6e6)]),this[_0x1ac1cb(0x388)]&&this[_0x1ac1cb(0x388)][_0x1ac1cb(0x75d)](Scene_Skill['layoutSettings']['StatusBgType']),this[_0x1ac1cb(0x327)]&&this[_0x1ac1cb(0x327)][_0x1ac1cb(0x75d)](Scene_Skill[_0x1ac1cb(0x890)][_0x1ac1cb(0x508)]),this['_actorWindow']&&this[_0x1ac1cb(0x30b)]['setBackgroundType'](Scene_Skill[_0x1ac1cb(0x890)][_0x1ac1cb(0x6c9)]);},Scene_Skill[_0x555f1c(0x54e)][_0x555f1c(0x283)]=function(){const _0x50b489=_0x555f1c;return Scene_Skill[_0x50b489(0x890)][_0x50b489(0x10c)]['call'](this);},Scene_Skill[_0x555f1c(0x54e)]['skillTypeWindowRect']=function(){const _0x36fa5f=_0x555f1c;return Scene_Skill[_0x36fa5f(0x890)][_0x36fa5f(0x1c3)][_0x36fa5f(0x2b0)](this);},Scene_Skill[_0x555f1c(0x54e)][_0x555f1c(0x603)]=function(){const _0x118da0=_0x555f1c;return Scene_Skill[_0x118da0(0x890)]['StatusRect'][_0x118da0(0x2b0)](this);},Scene_Skill[_0x555f1c(0x54e)][_0x555f1c(0x166)]=function(){const _0x35531f=_0x555f1c;return Scene_Skill['layoutSettings'][_0x35531f(0x688)][_0x35531f(0x2b0)](this);},Scene_Skill[_0x555f1c(0x54e)][_0x555f1c(0x829)]=function(){const _0x20e4cf=_0x555f1c;return Scene_Skill[_0x20e4cf(0x890)][_0x20e4cf(0x4f4)][_0x20e4cf(0x2b0)](this);},Scene_Equip[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)][_0x555f1c(0x3a6)],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x780)]=Scene_Equip[_0x555f1c(0x54e)][_0x555f1c(0x663)],Scene_Equip[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x8e5b94=_0x555f1c;VisuMZ['CoreEngine'][_0x8e5b94(0x780)]['call'](this),this[_0x8e5b94(0x26e)]();},Scene_Equip[_0x555f1c(0x54e)][_0x555f1c(0x26e)]=function(){const _0x380be3=_0x555f1c;this[_0x380be3(0x61b)]&&this[_0x380be3(0x61b)][_0x380be3(0x75d)](Scene_Equip['layoutSettings'][_0x380be3(0x5aa)]),this[_0x380be3(0x388)]&&this[_0x380be3(0x388)][_0x380be3(0x75d)](Scene_Equip['layoutSettings'][_0x380be3(0x62f)]),this[_0x380be3(0x5ed)]&&this[_0x380be3(0x5ed)][_0x380be3(0x75d)](Scene_Equip[_0x380be3(0x890)][_0x380be3(0x4d4)]),this[_0x380be3(0x1e5)]&&this['_slotWindow'][_0x380be3(0x75d)](Scene_Equip[_0x380be3(0x890)][_0x380be3(0x199)]),this[_0x380be3(0x327)]&&this[_0x380be3(0x327)][_0x380be3(0x75d)](Scene_Equip[_0x380be3(0x890)][_0x380be3(0x508)]);},Scene_Equip['prototype'][_0x555f1c(0x283)]=function(){const _0x500dbc=_0x555f1c;return Scene_Equip[_0x500dbc(0x890)][_0x500dbc(0x10c)][_0x500dbc(0x2b0)](this);},Scene_Equip['prototype'][_0x555f1c(0x603)]=function(){const _0x5066f0=_0x555f1c;return Scene_Equip['layoutSettings'][_0x5066f0(0x3ba)]['call'](this);},Scene_Equip[_0x555f1c(0x54e)][_0x555f1c(0x1de)]=function(){const _0xb15333=_0x555f1c;return Scene_Equip[_0xb15333(0x890)][_0xb15333(0x858)][_0xb15333(0x2b0)](this);},Scene_Equip[_0x555f1c(0x54e)]['slotWindowRect']=function(){const _0x2ac5d8=_0x555f1c;return Scene_Equip[_0x2ac5d8(0x890)]['SlotRect'][_0x2ac5d8(0x2b0)](this);},Scene_Equip['prototype']['itemWindowRect']=function(){const _0x1e4d26=_0x555f1c;return Scene_Equip[_0x1e4d26(0x890)][_0x1e4d26(0x688)][_0x1e4d26(0x2b0)](this);},Scene_Status['layoutSettings']=VisuMZ['CoreEngine'][_0x555f1c(0x51b)][_0x555f1c(0x224)][_0x555f1c(0x53e)],VisuMZ[_0x555f1c(0x5c5)]['Scene_Status_create']=Scene_Status[_0x555f1c(0x54e)][_0x555f1c(0x663)],Scene_Status[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x59ac4e=_0x555f1c;VisuMZ['CoreEngine'][_0x59ac4e(0x85e)][_0x59ac4e(0x2b0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status['prototype'][_0x555f1c(0x26e)]=function(){const _0x4d5dee=_0x555f1c;this['_profileWindow']&&this[_0x4d5dee(0x5c3)][_0x4d5dee(0x75d)](Scene_Status['layoutSettings']['ProfileBgType']),this['_statusWindow']&&this[_0x4d5dee(0x388)][_0x4d5dee(0x75d)](Scene_Status[_0x4d5dee(0x890)]['StatusBgType']),this[_0x4d5dee(0x50f)]&&this[_0x4d5dee(0x50f)]['setBackgroundType'](Scene_Status[_0x4d5dee(0x890)][_0x4d5dee(0x128)]),this[_0x4d5dee(0x1dc)]&&this[_0x4d5dee(0x1dc)][_0x4d5dee(0x75d)](Scene_Status[_0x4d5dee(0x890)]['StatusEquipBgType']);},Scene_Status[_0x555f1c(0x54e)]['profileWindowRect']=function(){const _0x33413e=_0x555f1c;return Scene_Status[_0x33413e(0x890)]['ProfileRect'][_0x33413e(0x2b0)](this);},Scene_Status['prototype'][_0x555f1c(0x603)]=function(){const _0x700055=_0x555f1c;return Scene_Status['layoutSettings'][_0x700055(0x3ba)][_0x700055(0x2b0)](this);},Scene_Status[_0x555f1c(0x54e)][_0x555f1c(0x4a0)]=function(){const _0x34874c=_0x555f1c;return Scene_Status[_0x34874c(0x890)]['StatusParamsRect'][_0x34874c(0x2b0)](this);},Scene_Status['prototype'][_0x555f1c(0x59d)]=function(){const _0x3167aa=_0x555f1c;return Scene_Status[_0x3167aa(0x890)][_0x3167aa(0x4c7)]['call'](this);},Scene_Options[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)]['MenuLayout'][_0x555f1c(0x1e7)],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x8e5)]=Scene_Options[_0x555f1c(0x54e)]['create'],Scene_Options['prototype'][_0x555f1c(0x663)]=function(){const _0x364994=_0x555f1c;VisuMZ[_0x364994(0x5c5)][_0x364994(0x8e5)][_0x364994(0x2b0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype'][_0x555f1c(0x26e)]=function(){const _0x41cfd8=_0x555f1c;this[_0x41cfd8(0x4c2)]&&this[_0x41cfd8(0x4c2)][_0x41cfd8(0x75d)](Scene_Options['layoutSettings']['OptionsBgType']);},Scene_Options[_0x555f1c(0x54e)][_0x555f1c(0x42c)]=function(){const _0x5d9582=_0x555f1c;return Scene_Options[_0x5d9582(0x890)][_0x5d9582(0x50a)][_0x5d9582(0x2b0)](this);},Scene_Save[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)]['SaveMenu'],Scene_Save[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x488eb1=_0x555f1c;Scene_File[_0x488eb1(0x54e)]['create'][_0x488eb1(0x2b0)](this),this[_0x488eb1(0x26e)]();},Scene_Save[_0x555f1c(0x54e)][_0x555f1c(0x26e)]=function(){const _0x3a4d3a=_0x555f1c;this[_0x3a4d3a(0x61b)]&&this['_helpWindow'][_0x3a4d3a(0x75d)](Scene_Save['layoutSettings'][_0x3a4d3a(0x5aa)]),this[_0x3a4d3a(0x1cf)]&&this[_0x3a4d3a(0x1cf)]['setBackgroundType'](Scene_Save[_0x3a4d3a(0x890)][_0x3a4d3a(0x40b)]);},Scene_Save['prototype'][_0x555f1c(0x283)]=function(){const _0x37eb2b=_0x555f1c;return Scene_Save[_0x37eb2b(0x890)]['HelpRect'][_0x37eb2b(0x2b0)](this);},Scene_Save[_0x555f1c(0x54e)][_0x555f1c(0x442)]=function(){const _0x2eab1c=_0x555f1c;return Scene_Save[_0x2eab1c(0x890)]['ListRect'][_0x2eab1c(0x2b0)](this);},Scene_Load['layoutSettings']=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)]['LoadMenu'],Scene_Load[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x448fd3=_0x555f1c;Scene_File[_0x448fd3(0x54e)][_0x448fd3(0x663)][_0x448fd3(0x2b0)](this),this[_0x448fd3(0x26e)]();},Scene_Load[_0x555f1c(0x54e)][_0x555f1c(0x26e)]=function(){const _0x53c47e=_0x555f1c;this[_0x53c47e(0x61b)]&&this[_0x53c47e(0x61b)][_0x53c47e(0x75d)](Scene_Load[_0x53c47e(0x890)][_0x53c47e(0x5aa)]),this[_0x53c47e(0x1cf)]&&this[_0x53c47e(0x1cf)][_0x53c47e(0x75d)](Scene_Load[_0x53c47e(0x890)][_0x53c47e(0x40b)]);},Scene_Load[_0x555f1c(0x54e)][_0x555f1c(0x283)]=function(){const _0x2eafbc=_0x555f1c;return Scene_Load[_0x2eafbc(0x890)][_0x2eafbc(0x10c)][_0x2eafbc(0x2b0)](this);},Scene_Load[_0x555f1c(0x54e)]['listWindowRect']=function(){const _0x36a08d=_0x555f1c;return Scene_Load[_0x36a08d(0x890)][_0x36a08d(0x3c6)]['call'](this);};function Scene_QuickLoad(){const _0x2a711a=_0x555f1c;this[_0x2a711a(0x124)](...arguments);}Scene_QuickLoad['prototype']=Object[_0x555f1c(0x663)](Scene_Load[_0x555f1c(0x54e)]),Scene_QuickLoad[_0x555f1c(0x54e)][_0x555f1c(0x141)]=Scene_QuickLoad,Scene_QuickLoad[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(){const _0x32cb98=_0x555f1c;Scene_Load[_0x32cb98(0x54e)]['initialize']['call'](this);},Scene_QuickLoad['prototype'][_0x555f1c(0x663)]=function(){const _0x4d0cfd=_0x555f1c;this[_0x4d0cfd(0x450)](this[_0x4d0cfd(0x499)]);},Scene_QuickLoad['prototype'][_0x555f1c(0x7df)]=function(_0xccd279){const _0x4f0d3c=_0x555f1c;this[_0x4f0d3c(0x499)]=_0xccd279;},Scene_QuickLoad[_0x555f1c(0x54e)][_0x555f1c(0x7d2)]=function(){const _0x3cff4e=_0x555f1c;Scene_MenuBase['prototype'][_0x3cff4e(0x7d2)][_0x3cff4e(0x2b0)](this);},Scene_GameEnd[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)]['MenuLayout']['GameEnd'],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x418)]=Scene_GameEnd[_0x555f1c(0x54e)][_0x555f1c(0x47e)],Scene_GameEnd['prototype'][_0x555f1c(0x47e)]=function(){const _0x49915d=_0x555f1c;Scene_MenuBase['prototype'][_0x49915d(0x47e)]['call'](this);},Scene_GameEnd['prototype'][_0x555f1c(0x689)]=function(){const _0x10ebf0=_0x555f1c,_0x396d16=this[_0x10ebf0(0x1de)]();this[_0x10ebf0(0x5ed)]=new Window_GameEnd(_0x396d16),this[_0x10ebf0(0x5ed)][_0x10ebf0(0x432)]('cancel',this[_0x10ebf0(0x1ee)][_0x10ebf0(0x41d)](this)),this[_0x10ebf0(0x15e)](this[_0x10ebf0(0x5ed)]),this[_0x10ebf0(0x5ed)][_0x10ebf0(0x75d)](Scene_GameEnd[_0x10ebf0(0x890)][_0x10ebf0(0x4d4)]);},Scene_GameEnd['prototype'][_0x555f1c(0x1de)]=function(){const _0x310cc4=_0x555f1c;return Scene_GameEnd['layoutSettings'][_0x310cc4(0x858)]['call'](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x224)][_0x555f1c(0x30f)],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x63b)]=Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x663)],Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x491074=_0x555f1c;VisuMZ[_0x491074(0x5c5)][_0x491074(0x63b)][_0x491074(0x2b0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x26e)]=function(){const _0x3cfbda=_0x555f1c;this[_0x3cfbda(0x61b)]&&this[_0x3cfbda(0x61b)][_0x3cfbda(0x75d)](Scene_Shop[_0x3cfbda(0x890)][_0x3cfbda(0x5aa)]),this[_0x3cfbda(0x142)]&&this[_0x3cfbda(0x142)]['setBackgroundType'](Scene_Shop[_0x3cfbda(0x890)][_0x3cfbda(0x832)]),this[_0x3cfbda(0x5ed)]&&this[_0x3cfbda(0x5ed)][_0x3cfbda(0x75d)](Scene_Shop[_0x3cfbda(0x890)][_0x3cfbda(0x4d4)]),this[_0x3cfbda(0x1df)]&&this[_0x3cfbda(0x1df)]['setBackgroundType'](Scene_Shop['layoutSettings']['DummyBgType']),this[_0x3cfbda(0x8eb)]&&this[_0x3cfbda(0x8eb)][_0x3cfbda(0x75d)](Scene_Shop[_0x3cfbda(0x890)]['NumberBgType']),this['_statusWindow']&&this[_0x3cfbda(0x388)][_0x3cfbda(0x75d)](Scene_Shop[_0x3cfbda(0x890)]['StatusBgType']),this[_0x3cfbda(0x76c)]&&this[_0x3cfbda(0x76c)]['setBackgroundType'](Scene_Shop[_0x3cfbda(0x890)]['BuyBgType']),this['_categoryWindow']&&this[_0x3cfbda(0x654)][_0x3cfbda(0x75d)](Scene_Shop[_0x3cfbda(0x890)][_0x3cfbda(0x23c)]),this['_sellWindow']&&this[_0x3cfbda(0x516)][_0x3cfbda(0x75d)](Scene_Shop[_0x3cfbda(0x890)][_0x3cfbda(0x74a)]);},Scene_Shop['prototype'][_0x555f1c(0x283)]=function(){const _0x3448b6=_0x555f1c;return Scene_Shop[_0x3448b6(0x890)][_0x3448b6(0x10c)][_0x3448b6(0x2b0)](this);},Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x61d)]=function(){const _0x1ae145=_0x555f1c;return Scene_Shop[_0x1ae145(0x890)]['GoldRect'][_0x1ae145(0x2b0)](this);},Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x1de)]=function(){const _0x43a899=_0x555f1c;return Scene_Shop[_0x43a899(0x890)]['CommandRect'][_0x43a899(0x2b0)](this);},Scene_Shop['prototype']['dummyWindowRect']=function(){const _0x12bb04=_0x555f1c;return Scene_Shop[_0x12bb04(0x890)][_0x12bb04(0x6fc)][_0x12bb04(0x2b0)](this);},Scene_Shop['prototype'][_0x555f1c(0x443)]=function(){const _0x599508=_0x555f1c;return Scene_Shop['layoutSettings'][_0x599508(0x598)]['call'](this);},Scene_Shop[_0x555f1c(0x54e)]['statusWindowRect']=function(){return Scene_Shop['layoutSettings']['StatusRect']['call'](this);},Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x560)]=function(){const _0x1a0315=_0x555f1c;return Scene_Shop[_0x1a0315(0x890)]['BuyRect'][_0x1a0315(0x2b0)](this);},Scene_Shop['prototype'][_0x555f1c(0x24b)]=function(){const _0x5e1957=_0x555f1c;return Scene_Shop[_0x5e1957(0x890)][_0x5e1957(0x264)][_0x5e1957(0x2b0)](this);},Scene_Shop[_0x555f1c(0x54e)][_0x555f1c(0x2dd)]=function(){const _0x1d398e=_0x555f1c;return Scene_Shop[_0x1d398e(0x890)][_0x1d398e(0x360)][_0x1d398e(0x2b0)](this);},Scene_Name[_0x555f1c(0x890)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x224)][_0x555f1c(0x79c)],VisuMZ[_0x555f1c(0x5c5)]['Scene_Name_create']=Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x663)],Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x663)]=function(){const _0x411989=_0x555f1c;VisuMZ[_0x411989(0x5c5)][_0x411989(0x34a)][_0x411989(0x2b0)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x1dad5b=_0x555f1c;this[_0x1dad5b(0x870)]&&this[_0x1dad5b(0x870)][_0x1dad5b(0x75d)](Scene_Name[_0x1dad5b(0x890)][_0x1dad5b(0x437)]),this[_0x1dad5b(0x485)]&&this['_inputWindow']['setBackgroundType'](Scene_Name[_0x1dad5b(0x890)][_0x1dad5b(0x883)]);},Scene_Name['prototype'][_0x555f1c(0x27f)]=function(){return 0x0;},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x31e)]=function(){const _0x21a751=_0x555f1c;return Scene_Name[_0x21a751(0x890)][_0x21a751(0x2e7)][_0x21a751(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x5db)]=function(){const _0x33672d=_0x555f1c;return Scene_Name[_0x33672d(0x890)][_0x33672d(0x5bc)][_0x33672d(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x4b4)]=function(){const _0x2492b6=_0x555f1c;if(!this[_0x2492b6(0x485)])return![];return VisuMZ[_0x2492b6(0x5c5)][_0x2492b6(0x51b)][_0x2492b6(0x735)][_0x2492b6(0x4b4)];},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x1b1)]=function(){const _0x42b593=_0x555f1c;if(this[_0x42b593(0x4b4)]()&&this[_0x42b593(0x485)]['_mode']!=='keyboard')return TextManager[_0x42b593(0x15d)](_0x42b593(0x3d7),'pagedown');return Scene_MenuBase[_0x42b593(0x54e)][_0x42b593(0x1b1)][_0x42b593(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)]['buttonAssistKey3']=function(){const _0x3d5cdb=_0x555f1c;return this[_0x3d5cdb(0x4b4)]()?TextManager[_0x3d5cdb(0x1ea)](_0x3d5cdb(0x8b2)):Scene_MenuBase[_0x3d5cdb(0x54e)][_0x3d5cdb(0x7f3)][_0x3d5cdb(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x642)]=function(){const _0x45045c=_0x555f1c;if(this['EnableNameInput']()&&this[_0x45045c(0x485)][_0x45045c(0x8d6)]==='keyboard')return TextManager[_0x45045c(0x87c)](['ENTER']);return Scene_MenuBase['prototype'][_0x45045c(0x642)][_0x45045c(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x60b)]=function(){const _0x234888=_0x555f1c;if(this['EnableNameInput']()&&this['_inputWindow'][_0x234888(0x8d6)]===_0x234888(0x842))return TextManager[_0x234888(0x87c)](['BKSP']);return Scene_MenuBase['prototype'][_0x234888(0x60b)]['call'](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x664)]=function(){const _0x42a166=_0x555f1c;if(this[_0x42a166(0x4b4)]()&&this[_0x42a166(0x485)][_0x42a166(0x8d6)]!==_0x42a166(0x842)){const _0x582806=VisuMZ['CoreEngine']['Settings'][_0x42a166(0x735)];return _0x582806[_0x42a166(0x204)]||_0x42a166(0x328);}return Scene_MenuBase[_0x42a166(0x54e)]['buttonAssistText1'][_0x42a166(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x233)]=function(){const _0x58eaf3=_0x555f1c;if(this[_0x58eaf3(0x4b4)]()){const _0x1a55cc=VisuMZ[_0x58eaf3(0x5c5)][_0x58eaf3(0x51b)]['KeyboardInput'];return this[_0x58eaf3(0x485)][_0x58eaf3(0x8d6)]===_0x58eaf3(0x842)?_0x1a55cc[_0x58eaf3(0x2bf)]||'Keyboard':_0x1a55cc[_0x58eaf3(0x73d)]||'Manual';}else return Scene_MenuBase[_0x58eaf3(0x54e)]['buttonAssistText3'][_0x58eaf3(0x2b0)](this);},Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x512)]=function(){const _0x378dcd=_0x555f1c;if(this['EnableNameInput']()){const _0x452a17=VisuMZ[_0x378dcd(0x5c5)][_0x378dcd(0x51b)][_0x378dcd(0x735)];if(this[_0x378dcd(0x485)][_0x378dcd(0x8d6)]===_0x378dcd(0x842))return _0x452a17['Finish']||'Finish';}return Scene_MenuBase[_0x378dcd(0x54e)][_0x378dcd(0x512)][_0x378dcd(0x2b0)](this);},VisuMZ['CoreEngine'][_0x555f1c(0x1fe)]=Scene_Name['prototype']['onInputOk'],Scene_Name[_0x555f1c(0x54e)][_0x555f1c(0x2ac)]=function(){const _0x2e7c83=_0x555f1c;this['doesNameContainBannedWords']()?this[_0x2e7c83(0xfa)]():VisuMZ['CoreEngine']['Scene_Name_onInputOk'][_0x2e7c83(0x2b0)](this);},Scene_Name['prototype'][_0x555f1c(0x71e)]=function(){const _0x2a123a=_0x555f1c,_0x3d2147=VisuMZ[_0x2a123a(0x5c5)][_0x2a123a(0x51b)]['KeyboardInput'];if(!_0x3d2147)return![];const _0x4cea75=_0x3d2147[_0x2a123a(0x411)];if(!_0x4cea75)return![];const _0x518965=this['_editWindow'][_0x2a123a(0x381)]()['toLowerCase']();for(const _0x5e8d4c of _0x4cea75){if(_0x518965[_0x2a123a(0x484)](_0x5e8d4c['toLowerCase']()))return!![];}return![];},Scene_Name['prototype'][_0x555f1c(0xfa)]=function(){const _0x3b9146=_0x555f1c;SoundManager[_0x3b9146(0x656)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x111)]=Scene_Battle[_0x555f1c(0x54e)][_0x555f1c(0x202)],Scene_Battle[_0x555f1c(0x54e)]['update']=function(){const _0x484d64=_0x555f1c;VisuMZ[_0x484d64(0x5c5)][_0x484d64(0x111)][_0x484d64(0x2b0)](this);if($gameTemp['_playTestFastMode'])this[_0x484d64(0x37c)]();},Scene_Battle[_0x555f1c(0x54e)]['updatePlayTestF7']=function(){const _0x14b5a2=_0x555f1c;!BattleManager[_0x14b5a2(0x4f8)]()&&!this['_playtestF7Looping']&&!$gameMessage[_0x14b5a2(0x5f9)]()&&(this[_0x14b5a2(0x636)]=!![],this[_0x14b5a2(0x202)](),SceneManager[_0x14b5a2(0x20a)](),this['_playtestF7Looping']=![]);},VisuMZ['CoreEngine']['Scene_Battle_createCancelButton']=Scene_Battle[_0x555f1c(0x54e)][_0x555f1c(0x127)],Scene_Battle[_0x555f1c(0x54e)]['createCancelButton']=function(){const _0x10c61f=_0x555f1c;VisuMZ[_0x10c61f(0x5c5)][_0x10c61f(0x31d)][_0x10c61f(0x2b0)](this),SceneManager[_0x10c61f(0x6fe)]()&&this[_0x10c61f(0x5cf)]();},Scene_Battle[_0x555f1c(0x54e)]['repositionCancelButtonSideButtonLayout']=function(){const _0x12bf8a=_0x555f1c;this['_cancelButton']['x']=Graphics[_0x12bf8a(0x321)]+0x4,this[_0x12bf8a(0x101)]()?this['_cancelButton']['y']=Graphics['boxHeight']-this[_0x12bf8a(0x776)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x2e1)]=Sprite_Button[_0x555f1c(0x54e)]['initialize'],Sprite_Button['prototype']['initialize']=function(_0x171166){const _0x5835f9=_0x555f1c;VisuMZ[_0x5835f9(0x5c5)][_0x5835f9(0x2e1)][_0x5835f9(0x2b0)](this,_0x171166),this[_0x5835f9(0x70e)]();},Sprite_Button['prototype'][_0x555f1c(0x70e)]=function(){const _0x4db72a=_0x555f1c,_0x14311f=VisuMZ[_0x4db72a(0x5c5)][_0x4db72a(0x51b)]['UI'];this['_isButtonHidden']=![];switch(this['_buttonType']){case _0x4db72a(0x201):this[_0x4db72a(0x756)]=!_0x14311f['cancelShowButton'];break;case _0x4db72a(0x3d7):case _0x4db72a(0x708):this[_0x4db72a(0x756)]=!_0x14311f[_0x4db72a(0x86d)];break;case _0x4db72a(0x223):case'up':case _0x4db72a(0x66f):case'up2':case'ok':this[_0x4db72a(0x756)]=!_0x14311f['numberShowButton'];break;case _0x4db72a(0x445):this['_isButtonHidden']=!_0x14311f[_0x4db72a(0x28b)];break;}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x36f)]=Sprite_Button['prototype'][_0x555f1c(0x88d)],Sprite_Button[_0x555f1c(0x54e)]['updateOpacity']=function(){const _0x5920ad=_0x555f1c;SceneManager[_0x5920ad(0x6be)]()||this[_0x5920ad(0x756)]?this[_0x5920ad(0x833)]():VisuMZ[_0x5920ad(0x5c5)]['Sprite_Button_updateOpacity'][_0x5920ad(0x2b0)](this);},Sprite_Button[_0x555f1c(0x54e)][_0x555f1c(0x833)]=function(){const _0x1c7ec1=_0x555f1c;this[_0x1c7ec1(0x5c8)]=![],this[_0x1c7ec1(0x330)]=0x0,this['x']=Graphics[_0x1c7ec1(0x83c)]*0xa,this['y']=Graphics[_0x1c7ec1(0x63d)]*0xa;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x426)]=Sprite_Battler[_0x555f1c(0x54e)][_0x555f1c(0x8d0)],Sprite_Battler[_0x555f1c(0x54e)][_0x555f1c(0x8d0)]=function(_0x28d3b4,_0x2b51c9,_0x2ec9a7){const _0x542025=_0x555f1c;(this[_0x542025(0x3f0)]!==_0x28d3b4||this[_0x542025(0x13a)]!==_0x2b51c9)&&(this['setMoveEasingType'](_0x542025(0x82d)),this[_0x542025(0x80a)]=_0x2ec9a7),VisuMZ[_0x542025(0x5c5)][_0x542025(0x426)]['call'](this,_0x28d3b4,_0x2b51c9,_0x2ec9a7);},Sprite_Battler['prototype'][_0x555f1c(0x791)]=function(_0x1d63e1){const _0x3de3e9=_0x555f1c;this[_0x3de3e9(0x893)]=_0x1d63e1;},Sprite_Battler[_0x555f1c(0x54e)][_0x555f1c(0x2f3)]=function(){const _0x29a33c=_0x555f1c;if(this[_0x29a33c(0x807)]<=0x0)return;const _0x4d2c6a=this[_0x29a33c(0x807)],_0x32c0ea=this[_0x29a33c(0x80a)],_0x1b8e2a=this[_0x29a33c(0x893)];this[_0x29a33c(0x572)]=this[_0x29a33c(0xfb)](this[_0x29a33c(0x572)],this['_targetOffsetX'],_0x4d2c6a,_0x32c0ea,_0x1b8e2a),this[_0x29a33c(0x71b)]=this[_0x29a33c(0xfb)](this['_offsetY'],this[_0x29a33c(0x13a)],_0x4d2c6a,_0x32c0ea,_0x1b8e2a),this['_movementDuration']--;if(this[_0x29a33c(0x807)]<=0x0)this[_0x29a33c(0x76a)]();},Sprite_Battler[_0x555f1c(0x54e)][_0x555f1c(0xfb)]=function(_0x53666e,_0x3dac7b,_0x2f11e2,_0x333175,_0x51ffdb){const _0x3f8c50=_0x555f1c,_0x24ca2d=VisuMZ[_0x3f8c50(0x8ba)]((_0x333175-_0x2f11e2)/_0x333175,_0x51ffdb||_0x3f8c50(0x82d)),_0x1d4dd1=VisuMZ[_0x3f8c50(0x8ba)]((_0x333175-_0x2f11e2+0x1)/_0x333175,_0x51ffdb||_0x3f8c50(0x82d)),_0x221745=(_0x53666e-_0x3dac7b*_0x24ca2d)/(0x1-_0x24ca2d);return _0x221745+(_0x3dac7b-_0x221745)*_0x1d4dd1;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x375)]=Sprite_Actor['prototype'][_0x555f1c(0x8b1)],Sprite_Actor[_0x555f1c(0x54e)][_0x555f1c(0x8b1)]=function(_0x2e0b3b){const _0x38e0fc=_0x555f1c;VisuMZ['CoreEngine'][_0x38e0fc(0x51b)]['UI'][_0x38e0fc(0x2a8)]?this[_0x38e0fc(0x37d)](_0x2e0b3b):VisuMZ[_0x38e0fc(0x5c5)][_0x38e0fc(0x375)]['call'](this,_0x2e0b3b);},Sprite_Actor[_0x555f1c(0x54e)][_0x555f1c(0x37d)]=function(_0x1285ca){const _0x58eb20=_0x555f1c;let _0x37da05=Math[_0x58eb20(0x647)](Graphics[_0x58eb20(0x83c)]/0x2+0xc0);_0x37da05-=Math[_0x58eb20(0x5ad)]((Graphics[_0x58eb20(0x83c)]-Graphics['boxWidth'])/0x2),_0x37da05+=_0x1285ca*0x20;let _0x14da5b=Graphics[_0x58eb20(0x63d)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x14da5b-=Math[_0x58eb20(0x5ad)]((Graphics[_0x58eb20(0x63d)]-Graphics[_0x58eb20(0x4b5)])/0x2),_0x14da5b+=_0x1285ca*0x30,this[_0x58eb20(0x6a9)](_0x37da05,_0x14da5b);},Sprite_Actor['prototype'][_0x555f1c(0x5a8)]=function(){const _0x4f4cec=_0x555f1c;this[_0x4f4cec(0x8d0)](0x4b0,0x0,0x78);},Sprite_Animation['prototype'][_0x555f1c(0x4e5)]=function(_0x497d92){const _0x1d2701=_0x555f1c;this[_0x1d2701(0x3fe)]=_0x497d92;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x574)]=Sprite_Animation[_0x555f1c(0x54e)]['processSoundTimings'],Sprite_Animation[_0x555f1c(0x54e)][_0x555f1c(0x569)]=function(){const _0x551a8d=_0x555f1c;if(this[_0x551a8d(0x3fe)])return;VisuMZ[_0x551a8d(0x5c5)]['Sprite_Animation_processSoundTimings']['call'](this);},VisuMZ[_0x555f1c(0x5c5)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x555f1c(0x54e)][_0x555f1c(0x8c8)],Sprite_Animation['prototype'][_0x555f1c(0x8c8)]=function(_0x2a7a76){const _0x126d22=_0x555f1c;this[_0x126d22(0x3d3)]()?this[_0x126d22(0x64b)](_0x2a7a76):VisuMZ['CoreEngine'][_0x126d22(0x78e)]['call'](this,_0x2a7a76);},Sprite_Animation['prototype'][_0x555f1c(0x3d3)]=function(){const _0x16c6f9=_0x555f1c;if(!this[_0x16c6f9(0x694)])return![];const _0x28f0f5=this['_animation'][_0x16c6f9(0x381)]||'';if(_0x28f0f5[_0x16c6f9(0x3b6)](/<MIRROR OFFSET X>/i))return!![];if(_0x28f0f5[_0x16c6f9(0x3b6)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x16c6f9(0x5c5)]['Settings']['QoL'][_0x16c6f9(0x6da)];},Sprite_Animation[_0x555f1c(0x54e)][_0x555f1c(0x64b)]=function(_0x407a32){const _0x527894=_0x555f1c,_0xab31a8=this[_0x527894(0x89e)],_0x5ba855=this[_0x527894(0x89e)],_0x272f94=this[_0x527894(0x694)][_0x527894(0x4fa)]*(this[_0x527894(0x5eb)]?-0x1:0x1)-_0xab31a8/0x2,_0x300df4=this[_0x527894(0x694)][_0x527894(0x7b1)]-_0x5ba855/0x2,_0x551dd1=this['targetPosition'](_0x407a32);_0x407a32['gl'][_0x527894(0x862)](_0x272f94+_0x551dd1['x'],_0x300df4+_0x551dd1['y'],_0xab31a8,_0x5ba855);},Sprite_Animation[_0x555f1c(0x54e)][_0x555f1c(0x1d5)]=function(_0x359c2d){const _0x60c343=_0x555f1c;if(_0x359c2d[_0x60c343(0x355)]){}const _0x584192=this['_animation'][_0x60c343(0x381)];let _0xca3ac=_0x359c2d[_0x60c343(0x63d)]*_0x359c2d[_0x60c343(0x782)]['y'],_0x437205=0x0,_0x2509a0=-_0xca3ac/0x2;if(_0x584192[_0x60c343(0x3b6)](/<(?:HEAD|HEADER|TOP)>/i))_0x2509a0=-_0xca3ac;if(_0x584192['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2509a0=0x0;if(this[_0x60c343(0x694)][_0x60c343(0x7c6)])_0x2509a0=0x0;if(_0x584192['match'](/<(?:LEFT)>/i))_0x437205=-_0x359c2d[_0x60c343(0x83c)]/0x2;if(_0x584192[_0x60c343(0x3b6)](/<(?:RIGHT)>/i))_0x437205=_0x359c2d[_0x60c343(0x83c)]/0x2;_0x584192[_0x60c343(0x3b6)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x437205=Number(RegExp['$1'])*_0x359c2d[_0x60c343(0x83c)]);_0x584192[_0x60c343(0x3b6)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2509a0=(0x1-Number(RegExp['$1']))*-_0xca3ac);_0x584192[_0x60c343(0x3b6)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x437205=Number(RegExp['$1'])*_0x359c2d[_0x60c343(0x83c)],_0x2509a0=(0x1-Number(RegExp['$2']))*-_0xca3ac);if(_0x584192[_0x60c343(0x3b6)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x437205+=Number(RegExp['$1']);if(_0x584192['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2509a0+=Number(RegExp['$1']);_0x584192[_0x60c343(0x3b6)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x437205+=Number(RegExp['$1']),_0x2509a0+=Number(RegExp['$2']));const _0xefa154=new Point(_0x437205,_0x2509a0);return _0x359c2d[_0x60c343(0x1c7)](),_0x359c2d[_0x60c343(0x7fe)][_0x60c343(0x662)](_0xefa154);},Sprite_AnimationMV['prototype'][_0x555f1c(0x71a)]=function(){const _0x45bbda=_0x555f1c;this[_0x45bbda(0x220)]=VisuMZ['CoreEngine']['Settings'][_0x45bbda(0x71c)][_0x45bbda(0x138)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x45bbda(0x220)]=this[_0x45bbda(0x220)][_0x45bbda(0x739)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x555f1c(0xef)]=function(){const _0x557f20=_0x555f1c;if(!this[_0x557f20(0x694)]);const _0x9731f2=this[_0x557f20(0x694)]['name']||'';_0x9731f2[_0x557f20(0x3b6)](/<RATE:[ ](\d+)>/i)&&(this['_rate']=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV['prototype'][_0x555f1c(0x4e5)]=function(_0x2bb0eb){this['_muteSound']=_0x2bb0eb;},VisuMZ['CoreEngine']['Sprite_AnimationMV_processTimingData']=Sprite_AnimationMV[_0x555f1c(0x54e)]['processTimingData'],Sprite_AnimationMV['prototype']['processTimingData']=function(_0x5ee1a7){const _0x263af4=_0x555f1c;this[_0x263af4(0x3fe)]&&(_0x5ee1a7=JsonEx[_0x263af4(0x5a7)](_0x5ee1a7),_0x5ee1a7['se']&&(_0x5ee1a7['se'][_0x263af4(0x3d0)]=0x0)),VisuMZ[_0x263af4(0x5c5)][_0x263af4(0x2c5)][_0x263af4(0x2b0)](this,_0x5ee1a7);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x31c)]=Sprite_AnimationMV[_0x555f1c(0x54e)][_0x555f1c(0x48f)],Sprite_AnimationMV[_0x555f1c(0x54e)][_0x555f1c(0x48f)]=function(){const _0x40a694=_0x555f1c;VisuMZ[_0x40a694(0x5c5)][_0x40a694(0x31c)][_0x40a694(0x2b0)](this);if(this[_0x40a694(0x694)][_0x40a694(0x359)]===0x3){if(this['x']===0x0)this['x']=Math[_0x40a694(0x647)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x40a694(0x647)](Graphics[_0x40a694(0x63d)]/0x2);}},Sprite_Damage['prototype']['createDigits']=function(_0x374983){const _0x5b161c=_0x555f1c;let _0x21ef7d=Math['abs'](_0x374983)[_0x5b161c(0x4e0)]();this[_0x5b161c(0x631)]()&&(_0x21ef7d=VisuMZ[_0x5b161c(0x187)](_0x21ef7d));const _0x43735f=this['fontSize'](),_0x5f20d1=Math[_0x5b161c(0x5ad)](_0x43735f*0.75);for(let _0x1543be=0x0;_0x1543be<_0x21ef7d[_0x5b161c(0x6d6)];_0x1543be++){const _0x2954fb=this['createChildSprite'](_0x5f20d1,_0x43735f);_0x2954fb['bitmap']['drawText'](_0x21ef7d[_0x1543be],0x0,0x0,_0x5f20d1,_0x43735f,_0x5b161c(0x14c)),_0x2954fb['x']=(_0x1543be-(_0x21ef7d['length']-0x1)/0x2)*_0x5f20d1,_0x2954fb['dy']=-_0x1543be;}},Sprite_Damage[_0x555f1c(0x54e)][_0x555f1c(0x631)]=function(){const _0x59658e=_0x555f1c;return VisuMZ[_0x59658e(0x5c5)][_0x59658e(0x51b)][_0x59658e(0x71c)]['DigitGroupingDamageSprites'];},Sprite_Damage[_0x555f1c(0x54e)]['valueOutlineColor']=function(){const _0x3cf38f=_0x555f1c;return ColorManager[_0x3cf38f(0x205)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x7e8)]=Sprite_Gauge[_0x555f1c(0x54e)]['gaugeRate'],Sprite_Gauge['prototype'][_0x555f1c(0x1b6)]=function(){const _0x32f28e=_0x555f1c;return VisuMZ[_0x32f28e(0x5c5)][_0x32f28e(0x7e8)][_0x32f28e(0x2b0)](this)[_0x32f28e(0x739)](0x0,0x1);},VisuMZ['CoreEngine'][_0x555f1c(0x439)]=Sprite_Gauge[_0x555f1c(0x54e)][_0x555f1c(0x1e1)],Sprite_Gauge[_0x555f1c(0x54e)][_0x555f1c(0x1e1)]=function(){const _0x4e96f6=_0x555f1c;let _0x7e67d2=VisuMZ[_0x4e96f6(0x5c5)]['Sprite_Gauge_currentValue'][_0x4e96f6(0x2b0)](this);return _0x7e67d2;},Sprite_Gauge[_0x555f1c(0x54e)][_0x555f1c(0x5a0)]=function(){const _0x28a1b7=_0x555f1c;let _0x3d2f7d=this[_0x28a1b7(0x1e1)]();this[_0x28a1b7(0x631)]()&&(_0x3d2f7d=VisuMZ[_0x28a1b7(0x187)](_0x3d2f7d));const _0x41e78a=this['bitmapWidth']()-0x1,_0x45cc8c=this[_0x28a1b7(0x408)]?this[_0x28a1b7(0x408)]():this[_0x28a1b7(0x132)]();this[_0x28a1b7(0x45a)](),this[_0x28a1b7(0x4c8)]['drawText'](_0x3d2f7d,0x0,0x0,_0x41e78a,_0x45cc8c,_0x28a1b7(0x2d9));},Sprite_Gauge[_0x555f1c(0x54e)][_0x555f1c(0x28e)]=function(){return 0x3;},Sprite_Gauge[_0x555f1c(0x54e)]['useDigitGrouping']=function(){const _0x31038a=_0x555f1c;return VisuMZ[_0x31038a(0x5c5)]['Settings'][_0x31038a(0x71c)][_0x31038a(0x390)];},Sprite_Gauge['prototype']['valueOutlineColor']=function(){const _0x2cdec2=_0x555f1c;return ColorManager[_0x2cdec2(0x285)]();},Sprite_StateIcon[_0x555f1c(0x7b8)]=VisuMZ['CoreEngine'][_0x555f1c(0x51b)]['UI']['StateIconsNonFrame']??!![],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x403)]=Sprite_StateIcon[_0x555f1c(0x54e)][_0x555f1c(0x713)],Sprite_StateIcon['prototype'][_0x555f1c(0x713)]=function(){const _0x415073=_0x555f1c;Sprite_StateIcon[_0x415073(0x7b8)]?this[_0x415073(0x577)]():VisuMZ[_0x415073(0x5c5)]['Sprite_StateIcon_loadBitmap']['call'](this);},Sprite_StateIcon[_0x555f1c(0x54e)][_0x555f1c(0x577)]=function(){const _0x2d4690=_0x555f1c;this['bitmap']=new Bitmap(ImageManager[_0x2d4690(0x848)],ImageManager[_0x2d4690(0x843)]),this[_0x2d4690(0x216)]=ImageManager['loadSystem'](_0x2d4690(0x821));},VisuMZ['CoreEngine'][_0x555f1c(0x784)]=Sprite_StateIcon[_0x555f1c(0x54e)][_0x555f1c(0x46a)],Sprite_StateIcon['prototype'][_0x555f1c(0x46a)]=function(){const _0x333f0d=_0x555f1c;Sprite_StateIcon[_0x333f0d(0x7b8)]?this[_0x333f0d(0x584)]():VisuMZ['CoreEngine'][_0x333f0d(0x784)][_0x333f0d(0x2b0)](this);},Sprite_StateIcon[_0x555f1c(0x54e)]['updateFrameCoreEngine']=function(){const _0x2eb83c=_0x555f1c;if(this[_0x2eb83c(0x777)]===this[_0x2eb83c(0x195)])return;this[_0x2eb83c(0x777)]=this[_0x2eb83c(0x195)];const _0x3b08e1=ImageManager['iconWidth'],_0x4f0de2=ImageManager[_0x2eb83c(0x843)],_0x255a64=this['_iconIndex']%0x10*_0x3b08e1,_0x19fc72=Math[_0x2eb83c(0x5ad)](this[_0x2eb83c(0x195)]/0x10)*_0x4f0de2,_0x4eb4a8=this['_srcBitmap'],_0x2dfdeb=this[_0x2eb83c(0x4c8)];_0x2dfdeb[_0x2eb83c(0x4ba)](),_0x2dfdeb[_0x2eb83c(0x5be)](_0x4eb4a8,_0x255a64,_0x19fc72,_0x3b08e1,_0x4f0de2,0x0,0x0,_0x2dfdeb[_0x2eb83c(0x83c)],_0x2dfdeb[_0x2eb83c(0x63d)]);},VisuMZ['CoreEngine'][_0x555f1c(0x85b)]=Sprite_Picture[_0x555f1c(0x54e)][_0x555f1c(0x713)],Sprite_Picture[_0x555f1c(0x54e)]['loadBitmap']=function(){const _0x3822f7=_0x555f1c;this[_0x3822f7(0x62a)]&&this[_0x3822f7(0x62a)][_0x3822f7(0x3b6)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ['CoreEngine'][_0x3822f7(0x85b)]['call'](this);},Sprite_Picture[_0x555f1c(0x54e)][_0x555f1c(0x435)]=function(_0x29c656){const _0x582a4a=_0x555f1c,_0x3cf3f4=ImageManager[_0x582a4a(0x848)],_0x5cff9d=ImageManager[_0x582a4a(0x843)],_0x363e60=this[_0x582a4a(0x62a)][_0x582a4a(0x3b6)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x3cf3f4,_0x5cff9d);const _0x5c5531=ImageManager[_0x582a4a(0x10a)](_0x582a4a(0x821)),_0x3824ee=_0x29c656%0x10*_0x3cf3f4,_0x30be96=Math[_0x582a4a(0x5ad)](_0x29c656/0x10)*_0x5cff9d;this[_0x582a4a(0x4c8)][_0x582a4a(0x1a6)]=_0x363e60,this[_0x582a4a(0x4c8)][_0x582a4a(0x5be)](_0x5c5531,_0x3824ee,_0x30be96,_0x3cf3f4,_0x5cff9d,0x0,0x0,_0x3cf3f4,_0x5cff9d);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x555f1c(0x54e)]=Object[_0x555f1c(0x663)](Sprite_Clickable[_0x555f1c(0x54e)]),Sprite_TitlePictureButton[_0x555f1c(0x54e)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x555f1c(0x54e)]['initialize']=function(_0x584e82){const _0x22fa87=_0x555f1c;Sprite_Clickable[_0x22fa87(0x54e)][_0x22fa87(0x124)][_0x22fa87(0x2b0)](this),this['_data']=_0x584e82,this[_0x22fa87(0x533)]=null,this[_0x22fa87(0x77b)]();},Sprite_TitlePictureButton['prototype'][_0x555f1c(0x77b)]=function(){const _0x1965be=_0x555f1c;this['x']=Graphics[_0x1965be(0x83c)],this['y']=Graphics['height'],this[_0x1965be(0x5c8)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x555f1c(0x54e)][_0x555f1c(0x273)]=function(){const _0x5a24cb=_0x555f1c;this['bitmap']=ImageManager[_0x5a24cb(0x4e6)](this[_0x5a24cb(0x6df)]['PictureFilename']),this['bitmap']['addLoadListener'](this[_0x5a24cb(0x597)][_0x5a24cb(0x41d)](this));},Sprite_TitlePictureButton[_0x555f1c(0x54e)]['onButtonImageLoad']=function(){const _0x56a8c7=_0x555f1c;this['_data'][_0x56a8c7(0x69c)][_0x56a8c7(0x2b0)](this),this['_data'][_0x56a8c7(0x7b6)]['call'](this),this[_0x56a8c7(0x71f)](this['_data']['CallHandlerJS'][_0x56a8c7(0x41d)](this));},Sprite_TitlePictureButton[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0x4b301e=_0x555f1c;Sprite_Clickable[_0x4b301e(0x54e)][_0x4b301e(0x202)]['call'](this),this['updateOpacity'](),this[_0x4b301e(0x6f5)]();},Sprite_TitlePictureButton[_0x555f1c(0x54e)][_0x555f1c(0x701)]=function(){const _0xeb9865=_0x555f1c;return VisuMZ[_0xeb9865(0x5c5)]['Settings'][_0xeb9865(0x224)][_0xeb9865(0x212)]['ButtonFadeSpeed'];},Sprite_TitlePictureButton[_0x555f1c(0x54e)]['updateOpacity']=function(){const _0x4440eb=_0x555f1c;this[_0x4440eb(0x397)]||this['_hovered']?this[_0x4440eb(0x330)]=0xff:(this[_0x4440eb(0x330)]+=this[_0x4440eb(0x5c8)]?this[_0x4440eb(0x701)]():-0x1*this['fadeSpeed'](),this[_0x4440eb(0x330)]=Math[_0x4440eb(0x174)](0xc0,this[_0x4440eb(0x330)]));},Sprite_TitlePictureButton['prototype'][_0x555f1c(0x71f)]=function(_0x1325d3){const _0x1350c3=_0x555f1c;this[_0x1350c3(0x533)]=_0x1325d3;},Sprite_TitlePictureButton[_0x555f1c(0x54e)][_0x555f1c(0x83f)]=function(){const _0x5ecad3=_0x555f1c;this[_0x5ecad3(0x533)]&&this['_clickHandler']();};function Sprite_ExtendedTile(){const _0x26a87a=_0x555f1c;this[_0x26a87a(0x124)](...arguments);}Sprite_ExtendedTile[_0x555f1c(0x54e)]=Object[_0x555f1c(0x663)](Sprite['prototype']),Sprite_ExtendedTile[_0x555f1c(0x54e)][_0x555f1c(0x141)]=Sprite_ExtendedTile,Sprite_ExtendedTile['prototype'][_0x555f1c(0x124)]=function(_0x405e9c,_0x1bde21,_0x5cf5fb,_0x471a9b){const _0x4813a5=_0x555f1c;this['_shiftY']=Game_CharacterBase[_0x4813a5(0x416)]||-0x6,this[_0x4813a5(0x2aa)]=_0x405e9c,this[_0x4813a5(0x236)]=_0x1bde21,this[_0x4813a5(0x3ec)]=_0x5cf5fb,this['_patternHeight']=_0x471a9b,Sprite[_0x4813a5(0x54e)]['initialize'][_0x4813a5(0x2b0)](this),this[_0x4813a5(0x77e)](),this['loadTileBitmap'](),this['setTileFrame'](),this[_0x4813a5(0x202)]();},Sprite_ExtendedTile[_0x555f1c(0x54e)]['createSubSprite']=function(){const _0x48c8a4=_0x555f1c;this[_0x48c8a4(0x85a)]=new Sprite(),this[_0x48c8a4(0x85a)][_0x48c8a4(0x63c)]['x']=0.5,this['_tileSprite'][_0x48c8a4(0x63c)]['y']=0x1,this['_tileSprite']['y']=-this[_0x48c8a4(0x6a0)]+0x1,this[_0x48c8a4(0x463)](this[_0x48c8a4(0x85a)]);},Sprite_ExtendedTile[_0x555f1c(0x54e)][_0x555f1c(0x72c)]=function(){const _0x519ddc=_0x555f1c,_0x369eba=$gameMap[_0x519ddc(0x86c)](),_0x511f7a=0x5+Math[_0x519ddc(0x5ad)](this['_tile']/0x100);this[_0x519ddc(0x85a)][_0x519ddc(0x4c8)]=ImageManager[_0x519ddc(0x887)](_0x369eba['tilesetNames'][_0x511f7a]);},Sprite_ExtendedTile['prototype'][_0x555f1c(0x454)]=function(){const _0x1468e3=_0x555f1c,_0x28a8d8=this[_0x1468e3(0x3ec)],_0x5a955e=$gameMap['tileWidth'](),_0xefae15=$gameMap[_0x1468e3(0x5ba)](),_0x5b0f91=(Math[_0x1468e3(0x5ad)](_0x28a8d8/0x80)%0x2*0x8+_0x28a8d8%0x8)*_0x5a955e,_0x558138=Math['floor'](_0x28a8d8%0x100/0x8)%0x10*_0xefae15,_0x1138dd=this[_0x1468e3(0x2c2)]*_0xefae15;this[_0x1468e3(0x85a)][_0x1468e3(0x120)](_0x5b0f91,_0x558138-_0x1138dd,_0x5a955e,_0xefae15+_0x1138dd);},Sprite_ExtendedTile[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0x1aca39=_0x555f1c;Sprite[_0x1aca39(0x54e)][_0x1aca39(0x202)][_0x1aca39(0x2b0)](this),this[_0x1aca39(0x48f)]();},Sprite_ExtendedTile[_0x555f1c(0x54e)][_0x555f1c(0x48f)]=function(){const _0x295174=_0x555f1c,_0x35db4c=$gameMap[_0x295174(0x8db)](),_0x2b0e84=$gameMap[_0x295174(0x5ba)](),_0x372f4d=this['_mapX'],_0x5c74c1=this[_0x295174(0x236)];this['x']=Math['floor'](($gameMap[_0x295174(0x823)](_0x372f4d)+0.5)*_0x35db4c),this['y']=Math[_0x295174(0x5ad)](($gameMap[_0x295174(0x2a1)](_0x5c74c1)+0x1)*_0x2b0e84)+this[_0x295174(0x6a0)]-0x1;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x3cc)]=Spriteset_Base['prototype'][_0x555f1c(0x124)],Spriteset_Base['prototype'][_0x555f1c(0x124)]=function(){const _0x2970bf=_0x555f1c;VisuMZ[_0x2970bf(0x5c5)][_0x2970bf(0x3cc)][_0x2970bf(0x2b0)](this),this[_0x2970bf(0x530)]();},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x530)]=function(){const _0x15d6dc=_0x555f1c;this[_0x15d6dc(0x737)]=[],this[_0x15d6dc(0x24f)]=[],this[_0x15d6dc(0x8aa)]=this[_0x15d6dc(0x782)]['x'],this[_0x15d6dc(0x834)]=this[_0x15d6dc(0x782)]['y'];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x87a)]=Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x74d)],Spriteset_Base[_0x555f1c(0x54e)]['destroy']=function(_0x51b079){const _0x2b9ac2=_0x555f1c;this['removeAllFauxAnimations'](),this[_0x2b9ac2(0x6c5)](),VisuMZ[_0x2b9ac2(0x5c5)][_0x2b9ac2(0x87a)][_0x2b9ac2(0x2b0)](this,_0x51b079);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x100)]=Spriteset_Base['prototype']['update'],Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0x5ab42c=_0x555f1c;VisuMZ[_0x5ab42c(0x5c5)][_0x5ab42c(0x100)][_0x5ab42c(0x2b0)](this),this[_0x5ab42c(0x2d3)](),this[_0x5ab42c(0x14f)](),this['updateFauxAnimations'](),this[_0x5ab42c(0x1ac)]();},Spriteset_Base['prototype'][_0x555f1c(0x2d3)]=function(){},Spriteset_Base[_0x555f1c(0x54e)]['updatePictureAntiZoom']=function(){const _0x41a46=_0x555f1c;if(!VisuMZ[_0x41a46(0x5c5)][_0x41a46(0x51b)]['QoL'][_0x41a46(0x257)])return;if(this[_0x41a46(0x8aa)]===this[_0x41a46(0x782)]['x']&&this[_0x41a46(0x834)]===this[_0x41a46(0x782)]['y'])return;this[_0x41a46(0x571)](),this[_0x41a46(0x8aa)]=this['scale']['x'],this['_cacheScaleY']=this[_0x41a46(0x782)]['y'];},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x571)]=function(){const _0x3704e1=_0x555f1c;if(SceneManager['isSceneMap']()&&Spriteset_Map[_0x3704e1(0x290)])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x3704e1(0x290)])return;}this[_0x3704e1(0x782)]['x']!==0x0&&(this[_0x3704e1(0x6e2)]['scale']['x']=0x1/this[_0x3704e1(0x782)]['x'],this[_0x3704e1(0x6e2)]['x']=-(this['x']/this[_0x3704e1(0x782)]['x'])),this[_0x3704e1(0x782)]['y']!==0x0&&(this['_pictureContainer'][_0x3704e1(0x782)]['y']=0x1/this[_0x3704e1(0x782)]['y'],this[_0x3704e1(0x6e2)]['y']=-(this['y']/this['scale']['y']));},VisuMZ[_0x555f1c(0x5c5)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x48f)],Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x48f)]=function(){const _0x31919a=_0x555f1c;VisuMZ[_0x31919a(0x5c5)]['Spriteset_Base_updatePosition'][_0x31919a(0x2b0)](this),this['updatePositionCoreEngine']();},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x6ee)]=function(){const _0xe288ec=_0x555f1c;if(!$gameScreen)return;if($gameScreen[_0xe288ec(0x35c)]<=0x0)return;this['x']-=Math[_0xe288ec(0x647)]($gameScreen['shake']());const _0x4b3495=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case _0xe288ec(0x661):this[_0xe288ec(0x334)]();break;case _0xe288ec(0x3d6):this[_0xe288ec(0x836)]();break;case _0xe288ec(0x186):this[_0xe288ec(0x61c)]();break;default:this[_0xe288ec(0x77c)]();break;}},Spriteset_Base['prototype'][_0x555f1c(0x334)]=function(){const _0x5a0f21=_0x555f1c,_0x531185=VisuMZ[_0x5a0f21(0x5c5)][_0x5a0f21(0x51b)][_0x5a0f21(0x491)];if(_0x531185&&_0x531185['originalJS'])return _0x531185[_0x5a0f21(0x72b)][_0x5a0f21(0x2b0)](this);this['x']+=Math[_0x5a0f21(0x647)]($gameScreen[_0x5a0f21(0x4ff)]());},Spriteset_Base[_0x555f1c(0x54e)]['updatePositionCoreEngineShakeRand']=function(){const _0x6cddff=_0x555f1c,_0x3e55b2=VisuMZ[_0x6cddff(0x5c5)][_0x6cddff(0x51b)][_0x6cddff(0x491)];if(_0x3e55b2&&_0x3e55b2[_0x6cddff(0x4f5)])return _0x3e55b2[_0x6cddff(0x4f5)][_0x6cddff(0x2b0)](this);const _0x2ba315=$gameScreen[_0x6cddff(0x52a)]*0.75,_0x5a0e51=$gameScreen[_0x6cddff(0x7fa)]*0.6,_0x3ff8e4=$gameScreen[_0x6cddff(0x35c)];this['x']+=Math[_0x6cddff(0x647)](Math[_0x6cddff(0x83e)](_0x2ba315)-Math[_0x6cddff(0x83e)](_0x5a0e51))*(Math[_0x6cddff(0x174)](_0x3ff8e4,0x1e)*0.5),this['y']+=Math['round'](Math[_0x6cddff(0x83e)](_0x2ba315)-Math['randomInt'](_0x5a0e51))*(Math[_0x6cddff(0x174)](_0x3ff8e4,0x1e)*0.5);},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x836)]=function(){const _0x5cc388=_0x555f1c,_0x59fd9d=VisuMZ['CoreEngine'][_0x5cc388(0x51b)][_0x5cc388(0x491)];if(_0x59fd9d&&_0x59fd9d[_0x5cc388(0x590)])return _0x59fd9d[_0x5cc388(0x590)][_0x5cc388(0x2b0)](this);const _0x50daaa=$gameScreen[_0x5cc388(0x52a)]*0.75,_0x1743e8=$gameScreen['_shakeSpeed']*0.6,_0x687e40=$gameScreen[_0x5cc388(0x35c)];this['x']+=Math[_0x5cc388(0x647)](Math[_0x5cc388(0x83e)](_0x50daaa)-Math[_0x5cc388(0x83e)](_0x1743e8))*(Math[_0x5cc388(0x174)](_0x687e40,0x1e)*0.5);},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x61c)]=function(){const _0x2bea67=_0x555f1c,_0x1e6163=VisuMZ[_0x2bea67(0x5c5)][_0x2bea67(0x51b)]['ScreenShake'];if(_0x1e6163&&_0x1e6163['vertJS'])return _0x1e6163[_0x2bea67(0x157)][_0x2bea67(0x2b0)](this);const _0x246578=$gameScreen[_0x2bea67(0x52a)]*0.75,_0x12adcd=$gameScreen[_0x2bea67(0x7fa)]*0.6,_0x1c678e=$gameScreen['_shakeDuration'];this['y']+=Math['round'](Math[_0x2bea67(0x83e)](_0x246578)-Math[_0x2bea67(0x83e)](_0x12adcd))*(Math[_0x2bea67(0x174)](_0x1c678e,0x1e)*0.5);},Spriteset_Base['prototype'][_0x555f1c(0x53c)]=function(){const _0x2141f4=_0x555f1c;for(const _0x499342 of this[_0x2141f4(0x737)]){!_0x499342[_0x2141f4(0x5e1)]()&&this[_0x2141f4(0x5dc)](_0x499342);}this['processFauxAnimationRequests']();},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x66d)]=function(){const _0x2586fd=_0x555f1c;for(;;){const _0xa44004=$gameTemp[_0x2586fd(0x259)]();if(_0xa44004)this[_0x2586fd(0x741)](_0xa44004);else break;}},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x741)]=function(_0x4c4c77){const _0x1ccbd2=_0x555f1c,_0x468e83=$dataAnimations[_0x4c4c77['animationId']],_0x120a92=_0x4c4c77[_0x1ccbd2(0x680)],_0x17d649=_0x4c4c77[_0x1ccbd2(0x80b)],_0x59ed63=_0x4c4c77[_0x1ccbd2(0x12e)];let _0x562d4d=this['animationBaseDelay']();const _0x527e0b=this[_0x1ccbd2(0x18e)]();if(this[_0x1ccbd2(0x7fb)](_0x468e83))for(const _0x24555e of _0x120a92){this[_0x1ccbd2(0x13e)]([_0x24555e],_0x468e83,_0x17d649,_0x562d4d,_0x59ed63),_0x562d4d+=_0x527e0b;}else this['createFauxAnimationSprite'](_0x120a92,_0x468e83,_0x17d649,_0x562d4d,_0x59ed63);},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x622)]=function(_0x282a5e,_0x3e8645,_0x5c33f7,_0x3bacba){const _0x4842e6=_0x555f1c,_0x5d328f=this[_0x4842e6(0x343)](_0x3e8645),_0x27a6e5=new(_0x5d328f?Sprite_AnimationMV:Sprite_Animation)(),_0x4584cb=this[_0x4842e6(0x757)](_0x282a5e),_0xaf3b19=this['animationBaseDelay'](),_0x7b1963=_0x3bacba>_0xaf3b19?this['lastAnimationSprite']():null;this[_0x4842e6(0x2bb)](_0x282a5e[0x0])&&(_0x5c33f7=!_0x5c33f7),_0x27a6e5[_0x4842e6(0x2b3)]=_0x282a5e,_0x27a6e5['setup'](_0x4584cb,_0x3e8645,_0x5c33f7,_0x3bacba,_0x7b1963),this[_0x4842e6(0x6fb)](_0x27a6e5),this[_0x4842e6(0x89f)][_0x4842e6(0x45f)](_0x27a6e5);},Spriteset_Base['prototype'][_0x555f1c(0x13e)]=function(_0xfaf1fa,_0x29f16d,_0x31937c,_0x440bb5,_0x12cdda){const _0x11a884=_0x555f1c,_0x2144cf=this[_0x11a884(0x343)](_0x29f16d),_0x25803a=new(_0x2144cf?Sprite_AnimationMV:Sprite_Animation)(),_0x3d11eb=this[_0x11a884(0x757)](_0xfaf1fa);this[_0x11a884(0x2bb)](_0xfaf1fa[0x0])&&(_0x31937c=!_0x31937c);_0x25803a[_0x11a884(0x2b3)]=_0xfaf1fa,_0x25803a[_0x11a884(0x77b)](_0x3d11eb,_0x29f16d,_0x31937c,_0x440bb5),_0x25803a['setMute'](_0x12cdda),this[_0x11a884(0x6fb)](_0x25803a);if(this[_0x11a884(0x89f)])this[_0x11a884(0x89f)][_0x11a884(0x24a)](_0x25803a);this[_0x11a884(0x737)][_0x11a884(0x45f)](_0x25803a);},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x6fb)]=function(_0x3a3355){const _0x5da309=_0x555f1c;this[_0x5da309(0x744)]['addChild'](_0x3a3355);},Spriteset_Base[_0x555f1c(0x54e)]['removeAnimation']=function(_0x331378){const _0x1ef498=_0x555f1c;this[_0x1ef498(0x89f)][_0x1ef498(0x24a)](_0x331378),this[_0x1ef498(0x3ac)](_0x331378);for(const _0x54224e of _0x331378[_0x1ef498(0x2b3)]){_0x54224e['endAnimation']&&_0x54224e[_0x1ef498(0x7ac)]();}_0x331378[_0x1ef498(0x74d)]();},Spriteset_Base['prototype']['removeFauxAnimation']=function(_0x3670f9){const _0x397540=_0x555f1c;this[_0x397540(0x737)][_0x397540(0x24a)](_0x3670f9),this[_0x397540(0x3ac)](_0x3670f9);for(const _0x5af02a of _0x3670f9[_0x397540(0x2b3)]){_0x5af02a['endAnimation']&&_0x5af02a[_0x397540(0x7ac)]();}_0x3670f9[_0x397540(0x74d)]();},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x3ac)]=function(_0x684f09){const _0x26b02e=_0x555f1c;this[_0x26b02e(0x744)][_0x26b02e(0x7ec)](_0x684f09);},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x722)]=function(){const _0x324259=_0x555f1c;for(const _0x1b426 of this[_0x324259(0x737)]){this[_0x324259(0x5dc)](_0x1b426);}},Spriteset_Base[_0x555f1c(0x54e)]['isFauxAnimationPlaying']=function(){const _0x481d4e=_0x555f1c;return this[_0x481d4e(0x737)][_0x481d4e(0x6d6)]>0x0;},Spriteset_Base['prototype'][_0x555f1c(0x1ac)]=function(){const _0x2974dd=_0x555f1c;for(const _0x1b8c8c of this['_pointAnimationSprites']){!_0x1b8c8c[_0x2974dd(0x5e1)]()&&this['removePointAnimation'](_0x1b8c8c);}this[_0x2974dd(0x759)]();},Spriteset_Base['prototype']['processPointAnimationRequests']=function(){const _0x1333f0=_0x555f1c;for(;;){const _0x486c01=$gameTemp[_0x1333f0(0x564)]();if(_0x486c01)this[_0x1333f0(0x32f)](_0x486c01);else break;}},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x32f)]=function(_0x16c9bc){const _0x2e522f=_0x555f1c,_0x564ff9=$dataAnimations[_0x16c9bc[_0x2e522f(0x35f)]],_0x44f87e=this[_0x2e522f(0x6b7)](_0x16c9bc),_0x3d1dbf=_0x16c9bc['mirror'],_0x5ec7bc=_0x16c9bc[_0x2e522f(0x12e)];let _0x1ea28d=this[_0x2e522f(0x5ce)]();const _0x457823=this[_0x2e522f(0x18e)]();if(this[_0x2e522f(0x7fb)](_0x564ff9))for(const _0x242398 of _0x44f87e){this[_0x2e522f(0x873)]([_0x242398],_0x564ff9,_0x3d1dbf,_0x1ea28d,_0x5ec7bc),_0x1ea28d+=_0x457823;}else this[_0x2e522f(0x873)](_0x44f87e,_0x564ff9,_0x3d1dbf,_0x1ea28d,_0x5ec7bc);},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x6b7)]=function(_0x437159){const _0x5def30=_0x555f1c,_0x2e0dd2=new Sprite_Clickable(),_0x540786=this[_0x5def30(0x3b2)]();_0x2e0dd2['x']=_0x437159['x']-_0x540786['x'],_0x2e0dd2['y']=_0x437159['y']-_0x540786['y'],_0x2e0dd2['z']=0x64;const _0x27df90=this[_0x5def30(0x3b2)]();return _0x27df90['addChild'](_0x2e0dd2),[_0x2e0dd2];},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x3b2)]=function(){return this;},Spriteset_Map[_0x555f1c(0x54e)][_0x555f1c(0x3b2)]=function(){const _0x166ea4=_0x555f1c;return this[_0x166ea4(0x8d7)]||this;},Spriteset_Battle[_0x555f1c(0x54e)]['getPointAnimationLayer']=function(){const _0x228a00=_0x555f1c;return this[_0x228a00(0x7d8)]||this;},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x873)]=function(_0x244178,_0x16cc7f,_0x5a05ab,_0x42c1bf,_0x3a2cf1){const _0x13d4b9=_0x555f1c,_0x5d865d=this[_0x13d4b9(0x343)](_0x16cc7f),_0x584138=new(_0x5d865d?Sprite_AnimationMV:Sprite_Animation)();_0x584138['targetObjects']=_0x244178,_0x584138[_0x13d4b9(0x77b)](_0x244178,_0x16cc7f,_0x5a05ab,_0x42c1bf),_0x584138['setMute'](_0x3a2cf1),this[_0x13d4b9(0x6fb)](_0x584138),this[_0x13d4b9(0x24f)][_0x13d4b9(0x45f)](_0x584138);},Spriteset_Base['prototype']['removePointAnimation']=function(_0x4867d9){const _0x1df74b=_0x555f1c;this[_0x1df74b(0x24f)]['remove'](_0x4867d9),this[_0x1df74b(0x744)]['removeChild'](_0x4867d9);for(const _0x3294ce of _0x4867d9['targetObjects']){_0x3294ce[_0x1df74b(0x7ac)]&&_0x3294ce[_0x1df74b(0x7ac)]();const _0x812fe3=this['getPointAnimationLayer']();if(_0x812fe3)_0x812fe3[_0x1df74b(0x7ec)](_0x3294ce);}_0x4867d9[_0x1df74b(0x74d)]();},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x6c5)]=function(){const _0x516b54=_0x555f1c;for(const _0xc2179d of this['_pointAnimationSprites']){this[_0x516b54(0x2ff)](_0xc2179d);}},Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x294)]=function(){const _0x1a5277=_0x555f1c;return this[_0x1a5277(0x24f)][_0x1a5277(0x6d6)]>0x0;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x764)]=Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x326)],Spriteset_Base[_0x555f1c(0x54e)][_0x555f1c(0x326)]=function(){const _0x58b89c=_0x555f1c;return VisuMZ['CoreEngine'][_0x58b89c(0x764)][_0x58b89c(0x2b0)](this)||this[_0x58b89c(0x294)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x71c)][_0x555f1c(0x14a)]||![],VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x7f4)]=Scene_Map[_0x555f1c(0x54e)]['createSpriteset'],Scene_Map['prototype'][_0x555f1c(0x4c4)]=function(){const _0x332069=_0x555f1c;VisuMZ[_0x332069(0x5c5)][_0x332069(0x7f4)][_0x332069(0x2b0)](this);if(!Spriteset_Map[_0x332069(0x290)])return;const _0x2e6487=this[_0x332069(0x723)];if(!_0x2e6487)return;this[_0x332069(0x6e2)]=_0x2e6487[_0x332069(0x6e2)];if(!this[_0x332069(0x6e2)])return;this[_0x332069(0x463)](this[_0x332069(0x6e2)]);},VisuMZ[_0x555f1c(0x5c5)]['Spriteset_Map_createTilemap']=Spriteset_Map[_0x555f1c(0x54e)][_0x555f1c(0x6f1)],Spriteset_Map[_0x555f1c(0x54e)]['createTilemap']=function(){const _0x542bcc=_0x555f1c;VisuMZ[_0x542bcc(0x5c5)]['Spriteset_Map_createTilemap'][_0x542bcc(0x2b0)](this),this[_0x542bcc(0x889)]();},Spriteset_Map[_0x555f1c(0x54e)][_0x555f1c(0x889)]=function(){const _0x5afff5=_0x555f1c,_0x16e352=$gameMap[_0x5afff5(0x86c)]();if(!_0x16e352)return;const _0x14484b=$gameMap['getTileExtendTerrainTags']();if(Object[_0x5afff5(0x1c2)](_0x14484b)[_0x5afff5(0x6d6)]<=0x0)return;const _0x229b23=$gameMap[_0x5afff5(0x2c4)]();this[_0x5afff5(0x438)]=this[_0x5afff5(0x438)]||[];for(let _0x150146=0x0;_0x150146<$gameMap[_0x5afff5(0x63d)]();_0x150146++){for(let _0x445ed2=0x0;_0x445ed2<$gameMap[_0x5afff5(0x83c)]();_0x445ed2++){for(const _0x436e09 of $gameMap['layeredTiles'](_0x445ed2,_0x150146)){const _0x51b726=_0x229b23[_0x436e09]>>0xc,_0x528755=_0x14484b[_0x51b726]||0x0;if(_0x528755<=0x0)continue;this['createExtendedTileSprite'](_0x445ed2,_0x150146,_0x436e09,_0x528755);}}}},Spriteset_Map[_0x555f1c(0x54e)][_0x555f1c(0x774)]=function(){const _0x11e8e4=_0x555f1c;this[_0x11e8e4(0x438)]=this['_tileExtendSprites']||[];for(const _0xfcbac9 of this[_0x11e8e4(0x438)]){this[_0x11e8e4(0x8d7)][_0x11e8e4(0x7ec)](_0xfcbac9);}this[_0x11e8e4(0x438)]=[];},Spriteset_Map['prototype'][_0x555f1c(0x6ab)]=function(_0x7c1d72,_0x347a83,_0x1e9620,_0x1f7162){const _0x437127=_0x555f1c,_0x3c98fe=new Sprite_ExtendedTile(_0x7c1d72,_0x347a83,_0x1e9620,_0x1f7162),_0x378e4d=$gameMap[_0x437127(0x2c4)]();_0x378e4d[_0x1e9620]&0x10?_0x3c98fe['z']=0x4:_0x3c98fe['z']=0x3,this[_0x437127(0x8d7)]['addChild'](_0x3c98fe),this[_0x437127(0x438)][_0x437127(0x45f)](_0x3c98fe);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x22d)]=Tilemap[_0x555f1c(0x54e)][_0x555f1c(0x660)],Tilemap['prototype']['_addSpotTile']=function(_0x511a30,_0x3a9603,_0x5b4f19){const _0x31185a=_0x555f1c;if($gameMap[_0x31185a(0x2fd)](_0x511a30))return;VisuMZ[_0x31185a(0x5c5)][_0x31185a(0x22d)][_0x31185a(0x2b0)](this,_0x511a30,_0x3a9603,_0x5b4f19);},Spriteset_Battle[_0x555f1c(0x290)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x71c)][_0x555f1c(0x374)]||![],VisuMZ[_0x555f1c(0x5c5)]['Scene_Battle_createSpriteset_detach']=Scene_Battle[_0x555f1c(0x54e)][_0x555f1c(0x4c4)],Scene_Battle[_0x555f1c(0x54e)][_0x555f1c(0x4c4)]=function(){const _0x22a1b4=_0x555f1c;VisuMZ['CoreEngine'][_0x22a1b4(0x427)]['call'](this);if(!Spriteset_Battle[_0x22a1b4(0x290)])return;const _0x11d606=this[_0x22a1b4(0x723)];if(!_0x11d606)return;this[_0x22a1b4(0x6e2)]=_0x11d606[_0x22a1b4(0x6e2)];if(!this['_pictureContainer'])return;this[_0x22a1b4(0x463)](this['_pictureContainer']);},Spriteset_Battle[_0x555f1c(0x54e)][_0x555f1c(0x47e)]=function(){const _0x5bab25=_0x555f1c;this[_0x5bab25(0x8df)]=new PIXI['filters'][(_0x5bab25(0x5a2))](clamp=!![]),this[_0x5bab25(0x89a)]=new Sprite(),this[_0x5bab25(0x89a)][_0x5bab25(0x4c8)]=SceneManager[_0x5bab25(0x837)](),this[_0x5bab25(0x89a)][_0x5bab25(0x4e7)]=[this[_0x5bab25(0x8df)]],this[_0x5bab25(0x5f7)][_0x5bab25(0x463)](this['_backgroundSprite']);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x33a)]=Spriteset_Battle[_0x555f1c(0x54e)][_0x555f1c(0x8a9)],Spriteset_Battle['prototype'][_0x555f1c(0x8a9)]=function(){const _0x8293c0=_0x555f1c;this['coreEngineRepositionEnemies']()&&this[_0x8293c0(0x24d)](),VisuMZ[_0x8293c0(0x5c5)][_0x8293c0(0x33a)][_0x8293c0(0x2b0)](this);},Spriteset_Battle['prototype'][_0x555f1c(0x1d4)]=function(){const _0x283428=_0x555f1c,_0x2e1975=VisuMZ[_0x283428(0x5c5)][_0x283428(0x51b)][_0x283428(0x6d8)];if(!_0x2e1975)return![];if(Utils[_0x283428(0x7a9)]>='1.3.0'&&!_0x2e1975['RepositionEnemies130'])return![];return _0x2e1975[_0x283428(0x143)];},Spriteset_Battle['prototype'][_0x555f1c(0x24d)]=function(){const _0x38a752=_0x555f1c;for(member of $gameTroop[_0x38a752(0x162)]()){member[_0x38a752(0x2a2)]();}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x8a5)]=Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x124)],Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(_0x27b6d8){const _0x812789=_0x555f1c;_0x27b6d8['x']=Math['round'](_0x27b6d8['x']),_0x27b6d8['y']=Math['round'](_0x27b6d8['y']),_0x27b6d8['width']=Math[_0x812789(0x647)](_0x27b6d8[_0x812789(0x83c)]),_0x27b6d8[_0x812789(0x63d)]=Math[_0x812789(0x647)](_0x27b6d8[_0x812789(0x63d)]),this[_0x812789(0x880)](),VisuMZ[_0x812789(0x5c5)]['Window_Base_initialize']['call'](this,_0x27b6d8),this[_0x812789(0x863)]();},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x880)]=function(){const _0x1785d1=_0x555f1c;this[_0x1785d1(0x79b)]=VisuMZ[_0x1785d1(0x5c5)][_0x1785d1(0x51b)]['QoL'][_0x1785d1(0x34b)],this[_0x1785d1(0x352)]=VisuMZ[_0x1785d1(0x5c5)]['Settings'][_0x1785d1(0x71c)][_0x1785d1(0x2ef)];},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x449)]=function(){const _0x4359b0=_0x555f1c;return VisuMZ['CoreEngine'][_0x4359b0(0x51b)]['Window'][_0x4359b0(0x307)];},Window_Base['prototype'][_0x555f1c(0x2b2)]=function(){const _0x35aa5b=_0x555f1c;return VisuMZ[_0x35aa5b(0x5c5)][_0x35aa5b(0x51b)][_0x35aa5b(0x2f5)][_0x35aa5b(0x1ec)];},Window_Base['prototype'][_0x555f1c(0x455)]=function(){const _0x7d89dd=_0x555f1c;$gameSystem[_0x7d89dd(0x676)]?this[_0x7d89dd(0x3e7)]=$gameSystem[_0x7d89dd(0x676)]():this[_0x7d89dd(0x3e7)]=VisuMZ[_0x7d89dd(0x5c5)][_0x7d89dd(0x51b)][_0x7d89dd(0x2f5)]['BackOpacity'];},Window_Base['prototype'][_0x555f1c(0x228)]=function(){const _0x364b4a=_0x555f1c;return VisuMZ[_0x364b4a(0x5c5)][_0x364b4a(0x51b)][_0x364b4a(0x2f5)][_0x364b4a(0x222)];},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x8a0)]=function(){const _0x331fcf=_0x555f1c;return VisuMZ[_0x331fcf(0x5c5)][_0x331fcf(0x51b)][_0x331fcf(0x2f5)][_0x331fcf(0x7b3)];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x7a6)]=Window_Base[_0x555f1c(0x54e)]['update'],Window_Base[_0x555f1c(0x54e)]['update']=function(){const _0x23c10a=_0x555f1c;VisuMZ[_0x23c10a(0x5c5)][_0x23c10a(0x7a6)][_0x23c10a(0x2b0)](this),this['updateCoreEasing']();},Window_Base['prototype'][_0x555f1c(0x422)]=function(){const _0x1ed5fa=_0x555f1c;this[_0x1ed5fa(0x276)]&&(this['openness']+=this[_0x1ed5fa(0x8a0)](),this['isOpen']()&&(this[_0x1ed5fa(0x276)]=![]));},Window_Base['prototype'][_0x555f1c(0x825)]=function(){const _0x4cb185=_0x555f1c;this[_0x4cb185(0x18a)]&&(this[_0x4cb185(0x112)]-=this[_0x4cb185(0x8a0)](),this['isClosed']()&&(this['_closing']=![]));},VisuMZ[_0x555f1c(0x5c5)]['Window_Base_drawText']=Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x3bb)],Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x3bb)]=function(_0x13fe18,_0x13b369,_0x46b897,_0x31ff8d,_0x250867){const _0x2ac08c=_0x555f1c;if(this[_0x2ac08c(0x631)]())_0x13fe18=VisuMZ[_0x2ac08c(0x187)](_0x13fe18);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x2ac08c(0x2b0)](this,_0x13fe18,_0x13b369,_0x46b897,_0x31ff8d,_0x250867);},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x631)]=function(){return this['_digitGrouping'];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x5b8)]=Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x2e8)],Window_Base['prototype'][_0x555f1c(0x2e8)]=function(_0x4c7760,_0x4af13b,_0x581ea6,_0x4db807){const _0xe8a3e4=_0x555f1c;var _0x2ac456=VisuMZ[_0xe8a3e4(0x5c5)][_0xe8a3e4(0x5b8)]['call'](this,_0x4c7760,_0x4af13b,_0x581ea6,_0x4db807);if(this[_0xe8a3e4(0x155)]())_0x2ac456[_0xe8a3e4(0x620)]=String(VisuMZ[_0xe8a3e4(0x187)](_0x2ac456['text']))||'';return _0x2ac456;},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x155)]=function(){const _0x32ffaa=_0x555f1c;return this[_0x32ffaa(0x352)];},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x82f)]=function(_0x5f0d24){const _0x4e5179=_0x555f1c;this[_0x4e5179(0x79b)]=_0x5f0d24;},Window_Base[_0x555f1c(0x54e)]['enableDigitGroupingEx']=function(_0x10b2bb){this['_digitGroupingEx']=_0x10b2bb;},VisuMZ[_0x555f1c(0x5c5)]['Window_Base_drawIcon']=Window_Base['prototype']['drawIcon'],Window_Base['prototype'][_0x555f1c(0x824)]=function(_0x2f6624,_0x1bd9f7,_0x5e2f9e){const _0x2070d3=_0x555f1c;_0x1bd9f7=Math[_0x2070d3(0x647)](_0x1bd9f7),_0x5e2f9e=Math[_0x2070d3(0x647)](_0x5e2f9e),VisuMZ[_0x2070d3(0x5c5)][_0x2070d3(0x3f2)][_0x2070d3(0x2b0)](this,_0x2f6624,_0x1bd9f7,_0x5e2f9e);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x167)]=Window_Base[_0x555f1c(0x54e)]['drawFace'],Window_Base['prototype'][_0x555f1c(0x364)]=function(_0x21c5d5,_0x572fbc,_0x493a76,_0x15ffe8,_0x4169b3,_0x3e4326){const _0x1ddcf2=_0x555f1c;_0x4169b3=_0x4169b3||ImageManager[_0x1ddcf2(0x296)],_0x3e4326=_0x3e4326||ImageManager['faceHeight'],_0x493a76=Math['round'](_0x493a76),_0x15ffe8=Math['round'](_0x15ffe8),_0x4169b3=Math['round'](_0x4169b3),_0x3e4326=Math[_0x1ddcf2(0x647)](_0x3e4326),VisuMZ['CoreEngine'][_0x1ddcf2(0x167)][_0x1ddcf2(0x2b0)](this,_0x21c5d5,_0x572fbc,_0x493a76,_0x15ffe8,_0x4169b3,_0x3e4326);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x79e)]=Window_Base['prototype']['drawCharacter'],Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x221)]=function(_0x49d9b8,_0x544dba,_0x5e65d7,_0x615513){const _0x14c5c3=_0x555f1c;_0x5e65d7=Math[_0x14c5c3(0x647)](_0x5e65d7),_0x615513=Math[_0x14c5c3(0x647)](_0x615513),VisuMZ[_0x14c5c3(0x5c5)][_0x14c5c3(0x79e)][_0x14c5c3(0x2b0)](this,_0x49d9b8,_0x544dba,_0x5e65d7,_0x615513);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x47d)]=Window_Selectable[_0x555f1c(0x54e)]['itemRect'],Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x2f8)]=function(_0x466a1a){const _0x19b76e=_0x555f1c;let _0x15764a=VisuMZ['CoreEngine'][_0x19b76e(0x47d)]['call'](this,_0x466a1a);return _0x15764a['x']=Math['round'](_0x15764a['x']),_0x15764a['y']=Math['round'](_0x15764a['y']),_0x15764a[_0x19b76e(0x83c)]=Math[_0x19b76e(0x647)](_0x15764a[_0x19b76e(0x83c)]),_0x15764a[_0x19b76e(0x63d)]=Math[_0x19b76e(0x647)](_0x15764a[_0x19b76e(0x63d)]),_0x15764a;},VisuMZ[_0x555f1c(0x5c5)]['Window_StatusBase_drawActorSimpleStatus']=Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x8b5)],Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x8b5)]=function(_0x3aa2a2,_0x376adc,_0xf033b6){const _0x46ce5b=_0x555f1c;_0x376adc=Math[_0x46ce5b(0x647)](_0x376adc),_0xf033b6=Math[_0x46ce5b(0x647)](_0xf033b6),VisuMZ[_0x46ce5b(0x5c5)][_0x46ce5b(0x8bc)][_0x46ce5b(0x2b0)](this,_0x3aa2a2,_0x376adc,_0xf033b6);},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x863)]=function(){const _0x3d74a3=_0x555f1c;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x3d74a3(0x7c3),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x3d74a3(0x782)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x3d74a3(0x3e7)],'targetContentsOpacity':this[_0x3d74a3(0x1e8)]};},Window_Base['prototype']['updateCoreEasing']=function(){const _0x2c7f97=_0x555f1c;if(!this[_0x2c7f97(0x245)])return;if(this[_0x2c7f97(0x245)][_0x2c7f97(0x176)]<=0x0)return;this['x']=this[_0x2c7f97(0x20e)](this['x'],this[_0x2c7f97(0x245)][_0x2c7f97(0x528)]),this['y']=this[_0x2c7f97(0x20e)](this['y'],this[_0x2c7f97(0x245)][_0x2c7f97(0x7c9)]),this[_0x2c7f97(0x782)]['x']=this[_0x2c7f97(0x20e)](this[_0x2c7f97(0x782)]['x'],this[_0x2c7f97(0x245)][_0x2c7f97(0x37e)]),this['scale']['y']=this[_0x2c7f97(0x20e)](this[_0x2c7f97(0x782)]['y'],this['_coreEasing'][_0x2c7f97(0x5f3)]),this[_0x2c7f97(0x330)]=this[_0x2c7f97(0x20e)](this[_0x2c7f97(0x330)],this[_0x2c7f97(0x245)]['targetOpacity']),this[_0x2c7f97(0x3e7)]=this[_0x2c7f97(0x20e)](this[_0x2c7f97(0x3e7)],this['_coreEasing'][_0x2c7f97(0x1fa)]),this['contentsOpacity']=this[_0x2c7f97(0x20e)](this[_0x2c7f97(0x1e8)],this['_coreEasing']['targetContentsOpacity']),this[_0x2c7f97(0x245)][_0x2c7f97(0x176)]--;},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x20e)]=function(_0x3e0d26,_0x2fc898){const _0x44838c=_0x555f1c;if(!this[_0x44838c(0x245)])return _0x2fc898;const _0x16bc23=this[_0x44838c(0x245)][_0x44838c(0x176)],_0x4ca0ea=this[_0x44838c(0x245)][_0x44838c(0x64f)],_0x226c3d=this[_0x44838c(0x367)]((_0x4ca0ea-_0x16bc23)/_0x4ca0ea),_0x1609a3=this[_0x44838c(0x367)]((_0x4ca0ea-_0x16bc23+0x1)/_0x4ca0ea),_0x157168=(_0x3e0d26-_0x2fc898*_0x226c3d)/(0x1-_0x226c3d);return _0x157168+(_0x2fc898-_0x157168)*_0x1609a3;},Window_Base[_0x555f1c(0x54e)]['calcCoreEasing']=function(_0xb5826){const _0x188ac0=_0x555f1c;if(!this['_coreEasing'])return _0xb5826;return VisuMZ['ApplyEasing'](_0xb5826,this[_0x188ac0(0x245)]['type']||_0x188ac0(0x7c3));},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x3fa)]=function(_0x5934b4,_0x981eeb){const _0x4cb05e=_0x555f1c;if(!this[_0x4cb05e(0x245)])return;this['x']=this[_0x4cb05e(0x245)]['targetX'],this['y']=this[_0x4cb05e(0x245)][_0x4cb05e(0x7c9)],this[_0x4cb05e(0x782)]['x']=this[_0x4cb05e(0x245)][_0x4cb05e(0x37e)],this[_0x4cb05e(0x782)]['y']=this[_0x4cb05e(0x245)][_0x4cb05e(0x5f3)],this[_0x4cb05e(0x330)]=this[_0x4cb05e(0x245)][_0x4cb05e(0x3a9)],this[_0x4cb05e(0x3e7)]=this[_0x4cb05e(0x245)][_0x4cb05e(0x1fa)],this[_0x4cb05e(0x1e8)]=this['_coreEasing'][_0x4cb05e(0x758)],this[_0x4cb05e(0x703)](_0x5934b4,_0x981eeb,this['x'],this['y'],this[_0x4cb05e(0x782)]['x'],this[_0x4cb05e(0x782)]['y'],this[_0x4cb05e(0x330)],this[_0x4cb05e(0x3e7)],this[_0x4cb05e(0x1e8)]);},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x703)]=function(_0x15dff3,_0x3ad87d,_0x16dc48,_0x54b7db,_0x3b2bbb,_0x507735,_0x2f90af,_0x507ee0,_0x315089){const _0x471c1c=_0x555f1c;this[_0x471c1c(0x245)]={'duration':_0x15dff3,'wholeDuration':_0x15dff3,'type':_0x3ad87d,'targetX':_0x16dc48,'targetY':_0x54b7db,'targetScaleX':_0x3b2bbb,'targetScaleY':_0x507735,'targetOpacity':_0x2f90af,'targetBackOpacity':_0x507ee0,'targetContentsOpacity':_0x315089};},Window_Base['prototype'][_0x555f1c(0x387)]=function(_0xacb3f7,_0x318517,_0x21d601,_0x2c7f87,_0x12db4d){const _0x4c9d9a=_0x555f1c;this[_0x4c9d9a(0x69f)](),this[_0x4c9d9a(0x4bc)]['fontSize']=VisuMZ[_0x4c9d9a(0x5c5)]['Settings'][_0x4c9d9a(0x6a4)]['GoldFontSize'];const _0x4f24e0=VisuMZ[_0x4c9d9a(0x5c5)][_0x4c9d9a(0x51b)][_0x4c9d9a(0x6a4)][_0x4c9d9a(0x8d2)];if(_0x4f24e0>0x0&&_0x318517===TextManager[_0x4c9d9a(0x46b)]){const _0x18a67e=_0x2c7f87+(this[_0x4c9d9a(0x449)]()-ImageManager['iconHeight'])/0x2;this[_0x4c9d9a(0x824)](_0x4f24e0,_0x21d601+(_0x12db4d-ImageManager[_0x4c9d9a(0x848)]),_0x18a67e),_0x12db4d-=ImageManager['iconWidth']+0x4;}else this[_0x4c9d9a(0x715)](ColorManager['systemColor']()),this['drawText'](_0x318517,_0x21d601,_0x2c7f87,_0x12db4d,_0x4c9d9a(0x2d9)),_0x12db4d-=this['textWidth'](_0x318517)+0x6;this[_0x4c9d9a(0x217)]();const _0x52e5ce=this[_0x4c9d9a(0x316)](this[_0x4c9d9a(0x79b)]?VisuMZ[_0x4c9d9a(0x187)](_0xacb3f7):_0xacb3f7);_0x52e5ce>_0x12db4d?this['drawText'](VisuMZ[_0x4c9d9a(0x5c5)][_0x4c9d9a(0x51b)][_0x4c9d9a(0x6a4)]['GoldOverlap'],_0x21d601,_0x2c7f87,_0x12db4d,_0x4c9d9a(0x2d9)):this[_0x4c9d9a(0x3bb)](_0xacb3f7,_0x21d601,_0x2c7f87,_0x12db4d,_0x4c9d9a(0x2d9)),this['resetFontSettings']();},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x350)]=function(_0x3e18bc,_0x405060,_0x2bcfde,_0x3c75b8,_0xd04ca5){const _0x14f946=_0x555f1c,_0x48f932=ImageManager['loadSystem'](_0x14f946(0x821)),_0x54ca20=ImageManager[_0x14f946(0x848)],_0x20cf0b=ImageManager['iconHeight'],_0x11ebea=_0x3e18bc%0x10*_0x54ca20,_0x39aaac=Math[_0x14f946(0x5ad)](_0x3e18bc/0x10)*_0x20cf0b,_0x4a97a0=_0x3c75b8,_0x3d9fc9=_0x3c75b8;this[_0x14f946(0x4bc)][_0x14f946(0x754)]['imageSmoothingEnabled']=_0xd04ca5,this[_0x14f946(0x4bc)][_0x14f946(0x5be)](_0x48f932,_0x11ebea,_0x39aaac,_0x54ca20,_0x20cf0b,_0x405060,_0x2bcfde,_0x4a97a0,_0x3d9fc9),this[_0x14f946(0x4bc)][_0x14f946(0x754)][_0x14f946(0x331)]=!![];},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x131)]=function(_0x2b0f3c,_0x398c3e,_0x43fd8b,_0x5524eb,_0x40fdee,_0x173128){const _0x2e0dc4=_0x555f1c,_0x5a7b1c=Math[_0x2e0dc4(0x5ad)]((_0x43fd8b-0x2)*_0x5524eb),_0x308883=Sprite_Gauge[_0x2e0dc4(0x54e)][_0x2e0dc4(0x8e0)]['call'](this),_0x522f05=_0x398c3e+this[_0x2e0dc4(0x449)]()-_0x308883-0x2;this[_0x2e0dc4(0x4bc)][_0x2e0dc4(0x211)](_0x2b0f3c,_0x522f05,_0x43fd8b,_0x308883,ColorManager[_0x2e0dc4(0x775)]()),this[_0x2e0dc4(0x4bc)][_0x2e0dc4(0x62b)](_0x2b0f3c+0x1,_0x522f05+0x1,_0x5a7b1c,_0x308883-0x2,_0x40fdee,_0x173128);},Window_Scrollable[_0x555f1c(0x54b)]={'enabled':VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x2f5)][_0x555f1c(0x4da)]??!![],'thickness':VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x2f5)][_0x555f1c(0x672)]??0x2,'offset':VisuMZ[_0x555f1c(0x5c5)]['Settings']['Window'][_0x555f1c(0x502)]??0x2,'bodyColor':VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x2f5)][_0x555f1c(0x260)]??0x0,'offColor':VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x2f5)]['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x555f1c(0x5c5)]['Settings']['Window']['OffBarOpacity']??0x80},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x801)]=function(){const _0x4e947c=_0x555f1c;return Window_Scrollable[_0x4e947c(0x54b)]['enabled']&&Window_Scrollable['SCROLLBAR'][_0x4e947c(0x280)]>0x0;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x2d8)]=Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x8e2)],Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x8e2)]=function(){const _0xe9a88d=_0x555f1c;VisuMZ[_0xe9a88d(0x5c5)]['Window_Base_createContents'][_0xe9a88d(0x2b0)](this),this[_0xe9a88d(0x846)](),this[_0xe9a88d(0x52f)](!![]),this[_0xe9a88d(0x52f)](![]);},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x846)]=function(){const _0x226eb5=_0x555f1c;if(!this[_0x226eb5(0x801)]())return;if(this[_0x226eb5(0x8ec)]||this[_0x226eb5(0x6e1)])return;this[_0x226eb5(0x6fd)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x226eb5(0x8ec)]=new Sprite(),this[_0x226eb5(0x6e1)]=new Sprite(),this[_0x226eb5(0x463)](this[_0x226eb5(0x8ec)]),this[_0x226eb5(0x463)](this[_0x226eb5(0x6e1)]);},Window_Base['prototype']['setupScrollBarBitmap']=function(_0x121cc7){const _0x670fdc=_0x555f1c,_0x2b0763=_0x121cc7?this[_0x670fdc(0x8ec)]:this[_0x670fdc(0x6e1)];if(!_0x2b0763)return;const _0x5f5bdb=Window_Scrollable[_0x670fdc(0x54b)],_0x4ef702=_0x5f5bdb[_0x670fdc(0x280)],_0x568075=_0x121cc7?this[_0x670fdc(0xf3)]-_0x4ef702*0x2:_0x4ef702,_0x195dd0=_0x121cc7?_0x4ef702:this['innerHeight']-_0x4ef702*0x2;_0x2b0763[_0x670fdc(0x4c8)]=new Bitmap(_0x568075,_0x195dd0),_0x2b0763[_0x670fdc(0x120)](0x0,0x0,_0x568075,_0x195dd0),this[_0x670fdc(0x800)](_0x121cc7);},VisuMZ['CoreEngine']['Window_Base_destroyContents']=Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x542)],Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x542)]=function(){const _0x43a3e6=_0x555f1c;VisuMZ[_0x43a3e6(0x5c5)][_0x43a3e6(0x4e9)][_0x43a3e6(0x2b0)](this),this[_0x43a3e6(0x798)]();},Window_Base[_0x555f1c(0x54e)]['destroyScrollBarBitmaps']=function(){const _0xe11b=_0x555f1c,_0x1126c8=[this['_scrollBarHorz'],this['_scrollBarVert']];for(const _0x283f94 of _0x1126c8){if(_0x283f94&&_0x283f94[_0xe11b(0x4c8)])_0x283f94[_0xe11b(0x4c8)]['destroy']();}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x402)]=Window_Scrollable[_0x555f1c(0x54e)][_0x555f1c(0x202)],Window_Scrollable[_0x555f1c(0x54e)]['update']=function(){const _0x290b6e=_0x555f1c;VisuMZ['CoreEngine'][_0x290b6e(0x402)]['call'](this),this[_0x290b6e(0x8cb)]();},Window_Scrollable[_0x555f1c(0x54e)][_0x555f1c(0x8cb)]=function(){const _0x3aa655=_0x555f1c;this[_0x3aa655(0x813)](),this['checkScrollBarBitmap'](!![]),this[_0x3aa655(0x536)](![]),this['updateScrollBarPosition'](!![]),this[_0x3aa655(0x800)](![]);},Window_Scrollable['prototype'][_0x555f1c(0x813)]=function(){const _0x3e8a2a=_0x555f1c,_0x2cefb9=[this[_0x3e8a2a(0x8ec)],this[_0x3e8a2a(0x6e1)]];for(const _0x5a5b90 of _0x2cefb9){_0x5a5b90&&(_0x5a5b90[_0x3e8a2a(0x5c8)]=this[_0x3e8a2a(0x801)]()&&this[_0x3e8a2a(0x625)]());}},Window_Scrollable[_0x555f1c(0x54e)][_0x555f1c(0x536)]=function(_0x31cbb6){const _0xaed9dc=_0x555f1c;if(!this[_0xaed9dc(0x6fd)])return;const _0x20385e=this['scrollbar'](_0x31cbb6),_0x1e5f37=this[_0xaed9dc(0x875)](_0x31cbb6),_0x33172f=_0x31cbb6?'horz':_0xaed9dc(0x313),_0x44843d=_0x31cbb6?_0xaed9dc(0x8ab):'maxVert';(this[_0xaed9dc(0x6fd)][_0x33172f]!==_0x20385e||this['_lastScrollBarValues'][_0x44843d]!==_0x1e5f37)&&(this['_lastScrollBarValues'][_0x33172f]=_0x20385e,this[_0xaed9dc(0x6fd)][_0x44843d]=_0x1e5f37,this[_0xaed9dc(0x540)](_0x31cbb6,_0x20385e,_0x1e5f37));},Window_Scrollable['prototype'][_0x555f1c(0x557)]=function(_0x5c446a){const _0x11754c=_0x555f1c;if(this[_0x11754c(0x4a4)]!==undefined)return _0x5c446a?this[_0x11754c(0x371)]():this[_0x11754c(0x2ee)]['y'];return _0x5c446a?this['scrollX']():this['scrollY']();},Window_Scrollable[_0x555f1c(0x54e)]['maxScrollbar']=function(_0x21f335){const _0x26034d=_0x555f1c;if(this[_0x26034d(0x4a4)]!==undefined)return _0x21f335?this[_0x26034d(0x678)]():Math[_0x26034d(0x4d6)](0x0,this[_0x26034d(0x4a4)]-this[_0x26034d(0x3e1)]);return _0x21f335?this['maxScrollX']():this['maxScrollY']();},Window_Scrollable[_0x555f1c(0x54e)][_0x555f1c(0x40c)]=function(){const _0x460ea5=_0x555f1c;if(this[_0x460ea5(0x4a4)]!==undefined)return Math[_0x460ea5(0x4d6)](0x0,this[_0x460ea5(0x4a4)]);return this['overallHeight']();},Window_Scrollable[_0x555f1c(0x54e)][_0x555f1c(0x540)]=function(_0x39a8ff,_0x4037ad,_0x4f2625){const _0x5e8198=_0x555f1c,_0x2998c4=_0x39a8ff?this[_0x5e8198(0x8ec)]:this[_0x5e8198(0x6e1)];if(!_0x2998c4)return;if(!_0x2998c4[_0x5e8198(0x4c8)])return;const _0x2e691f=_0x2998c4[_0x5e8198(0x4c8)];_0x2e691f[_0x5e8198(0x4ba)]();if(_0x4f2625<=0x0)return;const _0x310ddb=_0x39a8ff?this[_0x5e8198(0xf3)]/this[_0x5e8198(0x7d9)]():this['innerHeight']/this[_0x5e8198(0x40c)](),_0x4a7a4e=_0x39a8ff?Math[_0x5e8198(0x647)](_0x4037ad*_0x310ddb):0x0,_0x3cc865=_0x39a8ff?0x0:Math['round'](_0x4037ad*_0x310ddb),_0xbcb940=_0x39a8ff?Math['round'](_0x2e691f[_0x5e8198(0x83c)]*_0x310ddb):_0x2e691f['width'],_0x4145de=_0x39a8ff?_0x2e691f[_0x5e8198(0x63d)]:Math[_0x5e8198(0x647)](_0x2e691f[_0x5e8198(0x63d)]*_0x310ddb),_0xe04118=Window_Scrollable['SCROLLBAR'],_0x15e371=ColorManager[_0x5e8198(0x3f5)](_0xe04118[_0x5e8198(0x2e4)]),_0x171c94=ColorManager[_0x5e8198(0x3f5)](_0xe04118[_0x5e8198(0x354)]),_0x5bbca6=_0xe04118[_0x5e8198(0x5ab)];_0x2e691f[_0x5e8198(0x8cd)]=_0x5bbca6,_0x2e691f[_0x5e8198(0x4e1)](_0x15e371),_0x2e691f['paintOpacity']=0xff,_0x2e691f[_0x5e8198(0x211)](_0x4a7a4e,_0x3cc865,_0xbcb940,_0x4145de,_0x171c94);},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x800)]=function(_0x39108f){const _0x40f4b4=_0x555f1c,_0x72034a=_0x39108f?this[_0x40f4b4(0x8ec)]:this[_0x40f4b4(0x6e1)];if(!_0x72034a)return;const _0x1433ae=Window_Scrollable[_0x40f4b4(0x54b)],_0x93934d=_0x1433ae[_0x40f4b4(0x280)],_0x2ee712=_0x1433ae['offset'];if(!_0x72034a[_0x40f4b4(0x269)])return;_0x72034a['x']=this[_0x40f4b4(0x60c)]+(_0x39108f?_0x93934d:this[_0x40f4b4(0xf3)]+_0x2ee712),_0x72034a['y']=this[_0x40f4b4(0x60c)]+(_0x39108f?this[_0x40f4b4(0x3e1)]+_0x2ee712:_0x93934d);},Window_Selectable[_0x555f1c(0x54e)]['cursorDown']=function(_0x46bf1b){const _0x2a703f=_0x555f1c;let _0xcf965a=this['index']();const _0x2bb0ab=this['maxItems'](),_0x4a7de8=this[_0x2a703f(0x3e3)]();if(this[_0x2a703f(0x728)]()&&(_0xcf965a<_0x2bb0ab||_0x46bf1b&&_0x4a7de8===0x1)){_0xcf965a+=_0x4a7de8;if(_0xcf965a>=_0x2bb0ab)_0xcf965a=_0x2bb0ab-0x1;this[_0x2a703f(0x615)](_0xcf965a);}else!this[_0x2a703f(0x728)]()&&((_0xcf965a<_0x2bb0ab-_0x4a7de8||_0x46bf1b&&_0x4a7de8===0x1)&&this[_0x2a703f(0x615)]((_0xcf965a+_0x4a7de8)%_0x2bb0ab));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x25b)]=Window_Selectable['prototype'][_0x555f1c(0x16f)],Window_Selectable[_0x555f1c(0x54e)]['cursorDown']=function(_0x22bff0){const _0x441af0=_0x555f1c;this[_0x441af0(0x728)]()&&_0x22bff0&&this[_0x441af0(0x3e3)]()===0x1&&this['index']()===this[_0x441af0(0x3c5)]()-0x1?this[_0x441af0(0x615)](0x0):VisuMZ[_0x441af0(0x5c5)]['Window_Selectable_cursorDown'][_0x441af0(0x2b0)](this,_0x22bff0);},Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x748)]=function(_0x2c74f7){const _0x58d6b4=_0x555f1c;let _0x315fd0=Math[_0x58d6b4(0x4d6)](0x0,this[_0x58d6b4(0x88f)]());const _0x1537e6=this[_0x58d6b4(0x3c5)](),_0x5d3043=this[_0x58d6b4(0x3e3)]();if(this[_0x58d6b4(0x728)]()&&_0x315fd0>0x0||_0x2c74f7&&_0x5d3043===0x1){_0x315fd0-=_0x5d3043;if(_0x315fd0<=0x0)_0x315fd0=0x0;this[_0x58d6b4(0x615)](_0x315fd0);}else!this[_0x58d6b4(0x728)]()&&((_0x315fd0>=_0x5d3043||_0x2c74f7&&_0x5d3043===0x1)&&this['smoothSelect']((_0x315fd0-_0x5d3043+_0x1537e6)%_0x1537e6));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x57e)]=Window_Selectable['prototype'][_0x555f1c(0x748)],Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x748)]=function(_0x1f73f9){const _0x1dd649=_0x555f1c;this[_0x1dd649(0x728)]()&&_0x1f73f9&&this[_0x1dd649(0x3e3)]()===0x1&&this['index']()===0x0?this[_0x1dd649(0x615)](this[_0x1dd649(0x3c5)]()-0x1):VisuMZ[_0x1dd649(0x5c5)][_0x1dd649(0x57e)][_0x1dd649(0x2b0)](this,_0x1f73f9);},Window_Selectable[_0x555f1c(0x54e)]['isUseModernControls']=function(){const _0x3aae5a=_0x555f1c;return VisuMZ[_0x3aae5a(0x5c5)]['Settings'][_0x3aae5a(0x71c)][_0x3aae5a(0x430)];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x596)]=Window_Selectable[_0x555f1c(0x54e)]['processCursorMove'],Window_Selectable['prototype'][_0x555f1c(0x831)]=function(){const _0x163445=_0x555f1c;this[_0x163445(0x728)]()?(this['processCursorMoveModernControls'](),this[_0x163445(0x2f1)]()):VisuMZ['CoreEngine'][_0x163445(0x596)][_0x163445(0x2b0)](this);},Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x6d1)]=function(){return!![];},Window_Selectable['prototype']['processCursorMoveModernControls']=function(){const _0xfbc0f0=_0x555f1c;if(this[_0xfbc0f0(0x3be)]()){const _0x30746a=this[_0xfbc0f0(0x88f)]();Input[_0xfbc0f0(0x685)]('down')&&(Input[_0xfbc0f0(0x8bb)](_0xfbc0f0(0x1eb))&&this[_0xfbc0f0(0x6d1)]()?this['cursorPagedown']():this[_0xfbc0f0(0x16f)](Input['isTriggered'](_0xfbc0f0(0x223)))),Input[_0xfbc0f0(0x685)]('up')&&(Input['isPressed'](_0xfbc0f0(0x1eb))&&this[_0xfbc0f0(0x6d1)]()?this[_0xfbc0f0(0x6de)]():this['cursorUp'](Input[_0xfbc0f0(0x492)]('up'))),Input[_0xfbc0f0(0x685)](_0xfbc0f0(0x2d9))&&this[_0xfbc0f0(0x822)](Input['isTriggered']('right')),Input[_0xfbc0f0(0x685)](_0xfbc0f0(0x32d))&&this[_0xfbc0f0(0x3f8)](Input['isTriggered']('left')),!this[_0xfbc0f0(0x1a0)](_0xfbc0f0(0x708))&&Input[_0xfbc0f0(0x685)](_0xfbc0f0(0x708))&&this[_0xfbc0f0(0x535)](),!this[_0xfbc0f0(0x1a0)](_0xfbc0f0(0x3d7))&&Input['isRepeated']('pageup')&&this[_0xfbc0f0(0x6de)](),this[_0xfbc0f0(0x88f)]()!==_0x30746a&&this['playCursorSound']();}},Window_Selectable['prototype']['processCursorHomeEndTrigger']=function(){const _0x40290f=_0x555f1c;if(this[_0x40290f(0x3be)]()){const _0x2b99a2=this[_0x40290f(0x88f)]();Input[_0x40290f(0x492)](_0x40290f(0x4d0))&&this[_0x40290f(0x615)](Math[_0x40290f(0x174)](this[_0x40290f(0x88f)](),0x0)),Input[_0x40290f(0x492)](_0x40290f(0x33f))&&this[_0x40290f(0x615)](Math[_0x40290f(0x4d6)](this[_0x40290f(0x88f)](),this['maxItems']()-0x1)),this[_0x40290f(0x88f)]()!==_0x2b99a2&&this['playCursorSound']();}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x29c)]=Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x6f5)],Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x6f5)]=function(){const _0x48d178=_0x555f1c;this['isUseModernControls']()?this[_0x48d178(0x1d6)]():VisuMZ[_0x48d178(0x5c5)][_0x48d178(0x29c)]['call'](this);},Window_Selectable['prototype'][_0x555f1c(0x1d6)]=function(){const _0x4644b3=_0x555f1c;VisuMZ[_0x4644b3(0x5c5)][_0x4644b3(0x29c)][_0x4644b3(0x2b0)](this);},Window_Selectable[_0x555f1c(0x54e)][_0x555f1c(0x7ed)]=function(){const _0x3ba87a=_0x555f1c;return VisuMZ[_0x3ba87a(0x5c5)][_0x3ba87a(0x51b)][_0x3ba87a(0x2f5)][_0x3ba87a(0x56c)];},Window_Selectable[_0x555f1c(0x54e)]['rowSpacing']=function(){const _0x105570=_0x555f1c;return VisuMZ[_0x105570(0x5c5)][_0x105570(0x51b)][_0x105570(0x2f5)][_0x105570(0x868)];},Window_Selectable['prototype'][_0x555f1c(0x57a)]=function(){const _0x32e62e=_0x555f1c;return Window_Scrollable[_0x32e62e(0x54e)][_0x32e62e(0x57a)][_0x32e62e(0x2b0)](this)+VisuMZ[_0x32e62e(0x5c5)]['Settings']['Window'][_0x32e62e(0x53a)];;},VisuMZ['CoreEngine'][_0x555f1c(0x4a6)]=Window_Selectable[_0x555f1c(0x54e)]['drawBackgroundRect'],Window_Selectable['prototype'][_0x555f1c(0x7fd)]=function(_0x2f1515){const _0x1988c0=_0x555f1c,_0x4209a9=VisuMZ[_0x1988c0(0x5c5)][_0x1988c0(0x51b)][_0x1988c0(0x2f5)];if(_0x4209a9['ShowItemBackground']===![])return;_0x4209a9[_0x1988c0(0x2bc)]?_0x4209a9[_0x1988c0(0x2bc)][_0x1988c0(0x2b0)](this,_0x2f1515):VisuMZ[_0x1988c0(0x5c5)]['Window_Selectable_drawBackgroundRect'][_0x1988c0(0x2b0)](this,_0x2f1515);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x42d)]=Window_Gold[_0x555f1c(0x54e)][_0x555f1c(0x81e)],Window_Gold['prototype'][_0x555f1c(0x81e)]=function(){const _0x204cc4=_0x555f1c;this[_0x204cc4(0x730)]()?this[_0x204cc4(0x3a5)]():VisuMZ[_0x204cc4(0x5c5)][_0x204cc4(0x42d)][_0x204cc4(0x2b0)](this);},Window_Gold[_0x555f1c(0x54e)][_0x555f1c(0x730)]=function(){const _0x1b1606=_0x555f1c;if(TextManager[_0x1b1606(0x46b)]!==this[_0x1b1606(0x46b)]())return![];return VisuMZ['CoreEngine'][_0x1b1606(0x51b)][_0x1b1606(0x6a4)][_0x1b1606(0x635)];},Window_Gold['prototype'][_0x555f1c(0x3a5)]=function(){const _0x24f125=_0x555f1c;this['resetFontSettings'](),this[_0x24f125(0x4bc)]['clear'](),this[_0x24f125(0x4bc)]['fontSize']=VisuMZ[_0x24f125(0x5c5)][_0x24f125(0x51b)][_0x24f125(0x6a4)]['GoldFontSize'];const _0x5d0e26=VisuMZ[_0x24f125(0x5c5)]['Settings'][_0x24f125(0x6a4)][_0x24f125(0x8d2)],_0x4b7b49=this[_0x24f125(0x194)](0x0);if(_0x5d0e26>0x0){const _0x591eb7=ImageManager[_0x24f125(0x1a5)]||0x20,_0x52b8d0=_0x591eb7-ImageManager[_0x24f125(0x848)],_0x421ab1=_0x4b7b49['y']+(this[_0x24f125(0x449)]()-ImageManager[_0x24f125(0x843)])/0x2;this[_0x24f125(0x824)](_0x5d0e26,_0x4b7b49['x']+Math[_0x24f125(0x337)](_0x52b8d0/0x2),_0x421ab1);const _0x53a61f=_0x591eb7+0x4;_0x4b7b49['x']+=_0x53a61f,_0x4b7b49[_0x24f125(0x83c)]-=_0x53a61f;}this[_0x24f125(0x715)](ColorManager[_0x24f125(0x5d7)]()),this[_0x24f125(0x3bb)](this[_0x24f125(0x46b)](),_0x4b7b49['x'],_0x4b7b49['y'],_0x4b7b49[_0x24f125(0x83c)],'left');const _0x4deb43=this[_0x24f125(0x316)](this['currencyUnit']())+0x6;;_0x4b7b49['x']+=_0x4deb43,_0x4b7b49['width']-=_0x4deb43,this['resetTextColor']();const _0x446329=this[_0x24f125(0x7ee)](),_0x4b98cb=this[_0x24f125(0x316)](this['_digitGrouping']?VisuMZ[_0x24f125(0x187)](this[_0x24f125(0x7ee)]()):this[_0x24f125(0x7ee)]());_0x4b98cb>_0x4b7b49['width']?this[_0x24f125(0x3bb)](VisuMZ[_0x24f125(0x5c5)][_0x24f125(0x51b)][_0x24f125(0x6a4)][_0x24f125(0x11e)],_0x4b7b49['x'],_0x4b7b49['y'],_0x4b7b49[_0x24f125(0x83c)],_0x24f125(0x2d9)):this[_0x24f125(0x3bb)](this['value'](),_0x4b7b49['x'],_0x4b7b49['y'],_0x4b7b49[_0x24f125(0x83c)],_0x24f125(0x2d9)),this['resetFontSettings']();},Window_StatusBase[_0x555f1c(0x54e)]['drawParamText']=function(_0x173ffa,_0xd00397,_0x2e373e,_0xe3b783,_0x434a25){const _0x586a16=_0x555f1c;_0xe3b783=String(_0xe3b783||'')[_0x586a16(0x48a)]();if(VisuMZ['CoreEngine'][_0x586a16(0x51b)][_0x586a16(0x289)]['DrawIcons']){const _0x2c4325=VisuMZ[_0x586a16(0x210)](_0xe3b783);if(_0x434a25)this[_0x586a16(0x350)](_0x2c4325,_0x173ffa,_0xd00397,this[_0x586a16(0x83a)]()),_0x2e373e-=this[_0x586a16(0x83a)]()+0x2,_0x173ffa+=this[_0x586a16(0x83a)]()+0x2;else{const _0x43445c=ImageManager[_0x586a16(0x1a5)]||0x20,_0x4212b9=ImageManager[_0x586a16(0x481)]||0x20,_0x29706a=_0x43445c-ImageManager[_0x586a16(0x848)],_0x3d6d75=_0x4212b9-ImageManager[_0x586a16(0x843)];let _0x306d59=0x2,_0x1ccaf6=0x2;this[_0x586a16(0x449)]()!==0x24&&(_0x1ccaf6=Math[_0x586a16(0x5ad)]((this['lineHeight']()-_0x4212b9)/0x2));const _0x5c15b4=_0x173ffa+Math[_0x586a16(0x5ad)](_0x29706a/0x2)+_0x306d59,_0x1cf0ba=_0xd00397+Math[_0x586a16(0x5ad)](_0x3d6d75/0x2)+_0x1ccaf6;this[_0x586a16(0x824)](_0x2c4325,_0x5c15b4,_0x1cf0ba),_0x2e373e-=_0x43445c+0x4,_0x173ffa+=_0x43445c+0x4;}}const _0x19570d=TextManager[_0x586a16(0x3dd)](_0xe3b783);this['resetFontSettings'](),this[_0x586a16(0x715)](ColorManager[_0x586a16(0x5d7)]()),_0x434a25?(this[_0x586a16(0x4bc)][_0x586a16(0x457)]=this['smallParamFontSize'](),this['contents'][_0x586a16(0x3bb)](_0x19570d,_0x173ffa,_0xd00397,_0x2e373e,this[_0x586a16(0x83a)](),_0x586a16(0x32d))):this[_0x586a16(0x3bb)](_0x19570d,_0x173ffa,_0xd00397,_0x2e373e),this[_0x586a16(0x69f)]();},Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x420)]=function(){const _0x4db0a8=_0x555f1c;return $gameSystem[_0x4db0a8(0x16a)]()-0x8;},Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x55a)]=function(_0x52f77c,_0x1d2655,_0x4a188e,_0x122b2f){const _0x376cb4=_0x555f1c;_0x122b2f=_0x122b2f||0xa8,this[_0x376cb4(0x217)]();if(VisuMZ[_0x376cb4(0x5c5)][_0x376cb4(0x51b)]['UI'][_0x376cb4(0x113)])this[_0x376cb4(0x351)](_0x52f77c[_0x376cb4(0x4fb)]()[_0x376cb4(0x381)],_0x1d2655,_0x4a188e,_0x122b2f);else{const _0x279184=_0x52f77c[_0x376cb4(0x4fb)]()[_0x376cb4(0x381)][_0x376cb4(0x38a)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x279184,_0x1d2655,_0x4a188e,_0x122b2f);}},Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x649)]=function(_0x2b4d61,_0x28a3da,_0x33e8c3,_0x438851){const _0x3e72c4=_0x555f1c;_0x438851=_0x438851||0x10e,this['resetTextColor']();if(VisuMZ[_0x3e72c4(0x5c5)]['Settings']['UI'][_0x3e72c4(0x325)])this[_0x3e72c4(0x351)](_0x2b4d61[_0x3e72c4(0x318)](),_0x28a3da,_0x33e8c3,_0x438851);else{const _0x144142=_0x2b4d61[_0x3e72c4(0x318)]()[_0x3e72c4(0x38a)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x2b4d61['nickname'](),_0x28a3da,_0x33e8c3,_0x438851);}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x369)]=Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x808)],Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x808)]=function(_0x4b8e08,_0x4d6d2c,_0x535e0b){const _0x2e7590=_0x555f1c;if(VisuMZ['CoreEngine'][_0x2e7590(0x51b)][_0x2e7590(0x289)][_0x2e7590(0x5dd)]===![])return;if(this[_0x2e7590(0x804)]())this[_0x2e7590(0x73b)](_0x4b8e08,_0x4d6d2c,_0x535e0b);VisuMZ['CoreEngine'][_0x2e7590(0x369)][_0x2e7590(0x2b0)](this,_0x4b8e08,_0x4d6d2c,_0x535e0b);},Window_StatusBase[_0x555f1c(0x54e)][_0x555f1c(0x804)]=function(){const _0x226870=_0x555f1c;return VisuMZ[_0x226870(0x5c5)][_0x226870(0x51b)]['UI'][_0x226870(0x207)];},Window_StatusBase[_0x555f1c(0x54e)]['drawActorExpGauge']=function(_0x390d15,_0x350fde,_0x34e4b8){const _0x139dde=_0x555f1c;if(!_0x390d15)return;if(!_0x390d15[_0x139dde(0x682)]())return;const _0x31be7a=0x80,_0x414c76=_0x390d15[_0x139dde(0x248)]();let _0x47f883=ColorManager[_0x139dde(0x538)](),_0x323ae8=ColorManager[_0x139dde(0x73a)]();_0x414c76>=0x1&&(_0x47f883=ColorManager[_0x139dde(0x5cb)](),_0x323ae8=ColorManager[_0x139dde(0x3a1)]()),this[_0x139dde(0x131)](_0x350fde,_0x34e4b8,_0x31be7a,_0x414c76,_0x47f883,_0x323ae8);},Window_EquipStatus[_0x555f1c(0x54e)][_0x555f1c(0x751)]=function(){const _0x310687=_0x555f1c;let _0x395798=0x0;for(const _0x457d3a of VisuMZ[_0x310687(0x5c5)][_0x310687(0x51b)][_0x310687(0x289)][_0x310687(0x592)]){const _0x1ece4b=this[_0x310687(0x2b2)](),_0x324646=this[_0x310687(0x548)](_0x395798);this[_0x310687(0x54f)](_0x1ece4b,_0x324646,_0x457d3a),_0x395798++;}},Window_EquipStatus[_0x555f1c(0x54e)][_0x555f1c(0x537)]=function(_0x5497a1,_0x1dc035,_0x466a94){const _0x3ed085=_0x555f1c,_0x30d8cb=this[_0x3ed085(0x2fa)]()-this[_0x3ed085(0x2b2)]()*0x2;this[_0x3ed085(0x6d0)](_0x5497a1,_0x1dc035,_0x30d8cb,_0x466a94,![]);},Window_EquipStatus[_0x555f1c(0x54e)][_0x555f1c(0x650)]=function(_0x51ba40,_0x4e4b0e,_0x593450){const _0x41c09f=_0x555f1c,_0x50dedc=this['paramWidth']();this[_0x41c09f(0x217)](),this[_0x41c09f(0x3bb)](this[_0x41c09f(0x712)][_0x41c09f(0x25e)](_0x593450,!![]),_0x51ba40,_0x4e4b0e,_0x50dedc,_0x41c09f(0x2d9));},Window_EquipStatus[_0x555f1c(0x54e)]['drawRightArrow']=function(_0x3468ce,_0x368697){const _0x2e2623=_0x555f1c,_0x19e133=this['rightArrowWidth']();this[_0x2e2623(0x715)](ColorManager[_0x2e2623(0x5d7)]());const _0x321226=VisuMZ[_0x2e2623(0x5c5)][_0x2e2623(0x51b)]['UI'][_0x2e2623(0x22f)];this[_0x2e2623(0x3bb)](_0x321226,_0x3468ce,_0x368697,_0x19e133,_0x2e2623(0x14c));},Window_EquipStatus[_0x555f1c(0x54e)][_0x555f1c(0x479)]=function(_0x1f425e,_0x38f300,_0x844ec7){const _0x4d8a79=_0x555f1c,_0x21b437=this[_0x4d8a79(0x527)](),_0x3e76bc=this[_0x4d8a79(0x1ff)][_0x4d8a79(0x25e)](_0x844ec7),_0xe5190f=_0x3e76bc-this['_actor']['paramValueByName'](_0x844ec7);this[_0x4d8a79(0x715)](ColorManager[_0x4d8a79(0x43e)](_0xe5190f)),this[_0x4d8a79(0x3bb)](this['_tempActor'][_0x4d8a79(0x25e)](_0x844ec7,!![]),_0x1f425e,_0x38f300,_0x21b437,'right');},VisuMZ['CoreEngine']['Window_EquipItem_isEnabled']=Window_EquipItem[_0x555f1c(0x54e)][_0x555f1c(0x532)],Window_EquipItem[_0x555f1c(0x54e)]['isEnabled']=function(_0x2713dc){const _0x334c8d=_0x555f1c;return _0x2713dc&&this['_actor']?this[_0x334c8d(0x712)][_0x334c8d(0x37b)](_0x2713dc):VisuMZ['CoreEngine'][_0x334c8d(0x340)][_0x334c8d(0x2b0)](this,_0x2713dc);},Window_StatusParams[_0x555f1c(0x54e)][_0x555f1c(0x3c5)]=function(){const _0x4c99b0=_0x555f1c;return VisuMZ[_0x4c99b0(0x5c5)][_0x4c99b0(0x51b)][_0x4c99b0(0x289)][_0x4c99b0(0x592)]['length'];},Window_StatusParams['prototype']['drawItem']=function(_0x5d9628){const _0x2473d1=_0x555f1c,_0x18e466=this['itemLineRect'](_0x5d9628),_0x331475=VisuMZ[_0x2473d1(0x5c5)]['Settings'][_0x2473d1(0x289)][_0x2473d1(0x592)][_0x5d9628],_0x5d36e4=TextManager[_0x2473d1(0x3dd)](_0x331475),_0x1fd2a6=this[_0x2473d1(0x712)]['paramValueByName'](_0x331475,!![]);this[_0x2473d1(0x6d0)](_0x18e466['x'],_0x18e466['y'],0xa0,_0x331475,![]),this[_0x2473d1(0x217)](),this[_0x2473d1(0x3bb)](_0x1fd2a6,_0x18e466['x']+0xa0,_0x18e466['y'],0x3c,_0x2473d1(0x2d9));};if(VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x735)]['EnableNameInput']){VisuMZ['CoreEngine'][_0x555f1c(0x51b)][_0x555f1c(0x735)][_0x555f1c(0x5a1)]&&(Window_NameInput[_0x555f1c(0x2c7)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ[_0x555f1c(0x5c5)]['Window_NameInput_initialize']=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x124)],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(_0x4ad6d9){const _0x4e48c9=_0x555f1c;this[_0x4e48c9(0x8d6)]=this[_0x4e48c9(0x602)](),VisuMZ[_0x4e48c9(0x5c5)][_0x4e48c9(0x720)][_0x4e48c9(0x2b0)](this,_0x4ad6d9),this['_mode']===_0x4e48c9(0x651)?this[_0x4e48c9(0x7d7)](0x0):(Input[_0x4e48c9(0x4ba)](),this['deselect']());},Window_NameInput[_0x555f1c(0x54e)]['defaultInputMode']=function(){const _0x46d6d6=_0x555f1c;if(Input['isGamepadConnected']())return _0x46d6d6(0x651);return VisuMZ[_0x46d6d6(0x5c5)][_0x46d6d6(0x51b)]['KeyboardInput'][_0x46d6d6(0x811)]||'keyboard';},VisuMZ[_0x555f1c(0x5c5)]['Window_NameInput_processHandling']=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x7d0)],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x7d0)]=function(){const _0x21c7b4=_0x555f1c;if(!this[_0x21c7b4(0x625)]())return;if(!this[_0x21c7b4(0x81c)])return;if(this[_0x21c7b4(0x8d6)]===_0x21c7b4(0x842)&&Input[_0x21c7b4(0x246)]())this[_0x21c7b4(0x578)](_0x21c7b4(0x651));else{if(Input[_0x21c7b4(0x67f)](_0x21c7b4(0x5bb)))Input[_0x21c7b4(0x4ba)](),this[_0x21c7b4(0x1cb)]();else{if(Input[_0x21c7b4(0x492)]('tab'))Input[_0x21c7b4(0x4ba)](),this[_0x21c7b4(0x8d6)]===_0x21c7b4(0x842)?this[_0x21c7b4(0x578)](_0x21c7b4(0x651)):this[_0x21c7b4(0x578)](_0x21c7b4(0x842));else{if(this[_0x21c7b4(0x8d6)]===_0x21c7b4(0x842))this[_0x21c7b4(0x4ec)]();else Input[_0x21c7b4(0x67f)](_0x21c7b4(0x864))?(Input['clear'](),this[_0x21c7b4(0x578)](_0x21c7b4(0x842))):VisuMZ[_0x21c7b4(0x5c5)][_0x21c7b4(0x543)][_0x21c7b4(0x2b0)](this);}}}},VisuMZ[_0x555f1c(0x5c5)]['Window_NameInput_processTouch']=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x6f5)],Window_NameInput['prototype'][_0x555f1c(0x6f5)]=function(){const _0x5182f8=_0x555f1c;if(!this[_0x5182f8(0x4ca)]())return;if(this[_0x5182f8(0x8d6)]===_0x5182f8(0x842)){if(TouchInput[_0x5182f8(0x492)]()&&this[_0x5182f8(0x669)]())this[_0x5182f8(0x578)](_0x5182f8(0x651));else TouchInput[_0x5182f8(0x8d5)]()&&this[_0x5182f8(0x578)](_0x5182f8(0x651));}else VisuMZ[_0x5182f8(0x5c5)][_0x5182f8(0x3e9)][_0x5182f8(0x2b0)](this);},Window_NameInput['prototype'][_0x555f1c(0x4ec)]=function(){const _0x190d55=_0x555f1c;if(Input['isSpecialCode']('enter'))Input[_0x190d55(0x4ba)](),this[_0x190d55(0x7e3)]();else{if(Input[_0x190d55(0x2ae)]!==undefined){let _0x5d6f5e=Input[_0x190d55(0x2ae)],_0x2b5b1c=_0x5d6f5e[_0x190d55(0x6d6)];for(let _0x1bb3c1=0x0;_0x1bb3c1<_0x2b5b1c;++_0x1bb3c1){this['_editWindow']['add'](_0x5d6f5e[_0x1bb3c1])?SoundManager[_0x190d55(0x82c)]():SoundManager[_0x190d55(0x656)]();}Input['clear']();}}},Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x578)]=function(_0x4fd081){const _0x4d9f78=_0x555f1c;let _0x8041e4=this[_0x4d9f78(0x8d6)];this[_0x4d9f78(0x8d6)]=_0x4fd081,_0x8041e4!==this[_0x4d9f78(0x8d6)]&&(this[_0x4d9f78(0x81e)](),SoundManager[_0x4d9f78(0x82c)](),this['_mode']===_0x4d9f78(0x651)?this[_0x4d9f78(0x7d7)](0x0):this[_0x4d9f78(0x7d7)](-0x1));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6b8)]=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x16f)],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x16f)]=function(_0x11944c){const _0x549e80=_0x555f1c;if(this[_0x549e80(0x8d6)]===_0x549e80(0x842)&&!Input[_0x549e80(0x1d9)]())return;if(Input[_0x549e80(0x1ad)]())return;VisuMZ['CoreEngine'][_0x549e80(0x6b8)][_0x549e80(0x2b0)](this,_0x11944c),this['switchModes'](_0x549e80(0x651));},VisuMZ[_0x555f1c(0x5c5)]['Window_NameInput_cursorUp']=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x748)],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x748)]=function(_0x3bc960){const _0x4ec82f=_0x555f1c;if(this[_0x4ec82f(0x8d6)]===_0x4ec82f(0x842)&&!Input['isArrowPressed']())return;if(Input[_0x4ec82f(0x1ad)]())return;VisuMZ[_0x4ec82f(0x5c5)][_0x4ec82f(0x802)][_0x4ec82f(0x2b0)](this,_0x3bc960),this[_0x4ec82f(0x578)](_0x4ec82f(0x651));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x797)]=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x822)],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x822)]=function(_0x5b5c1c){const _0x2669ce=_0x555f1c;if(this[_0x2669ce(0x8d6)]===_0x2669ce(0x842)&&!Input[_0x2669ce(0x1d9)]())return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x2669ce(0x797)][_0x2669ce(0x2b0)](this,_0x5b5c1c),this[_0x2669ce(0x578)](_0x2669ce(0x651));},VisuMZ[_0x555f1c(0x5c5)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x555f1c(0x54e)]['cursorLeft'],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x3f8)]=function(_0x46ea6e){const _0x235652=_0x555f1c;if(this[_0x235652(0x8d6)]===_0x235652(0x842)&&!Input[_0x235652(0x1d9)]())return;if(Input[_0x235652(0x1ad)]())return;VisuMZ[_0x235652(0x5c5)][_0x235652(0x736)][_0x235652(0x2b0)](this,_0x46ea6e),this[_0x235652(0x578)](_0x235652(0x651));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x175)]=Window_NameInput['prototype']['cursorPagedown'],Window_NameInput[_0x555f1c(0x54e)]['cursorPagedown']=function(){const _0x2561ce=_0x555f1c;if(this['_mode']==='keyboard')return;if(Input['isNumpadPressed']())return;VisuMZ['CoreEngine'][_0x2561ce(0x175)][_0x2561ce(0x2b0)](this),this['switchModes'](_0x2561ce(0x651));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x215)]=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x6de)],Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x6de)]=function(){const _0x48874d=_0x555f1c;if(this[_0x48874d(0x8d6)]===_0x48874d(0x842))return;if(Input[_0x48874d(0x1ad)]())return;VisuMZ[_0x48874d(0x5c5)][_0x48874d(0x215)][_0x48874d(0x2b0)](this),this[_0x48874d(0x578)](_0x48874d(0x651));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x446)]=Window_NameInput[_0x555f1c(0x54e)][_0x555f1c(0x81e)],Window_NameInput[_0x555f1c(0x54e)]['refresh']=function(){const _0x2e1713=_0x555f1c;if(this[_0x2e1713(0x8d6)]==='keyboard'){this[_0x2e1713(0x4bc)][_0x2e1713(0x4ba)](),this[_0x2e1713(0x740)][_0x2e1713(0x4ba)](),this[_0x2e1713(0x217)]();let _0x2a3b1d=VisuMZ[_0x2e1713(0x5c5)][_0x2e1713(0x51b)][_0x2e1713(0x735)][_0x2e1713(0x74e)][_0x2e1713(0x69a)]('\x0a'),_0x59222d=_0x2a3b1d[_0x2e1713(0x6d6)],_0x1c69cc=(this[_0x2e1713(0x3e1)]-_0x59222d*this['lineHeight']())/0x2;for(let _0x474187=0x0;_0x474187<_0x59222d;++_0x474187){let _0x939406=_0x2a3b1d[_0x474187],_0x4a2abb=this[_0x2e1713(0x4dd)](_0x939406)[_0x2e1713(0x83c)],_0xb62880=Math[_0x2e1713(0x5ad)]((this['contents'][_0x2e1713(0x83c)]-_0x4a2abb)/0x2);this['drawTextEx'](_0x939406,_0xb62880,_0x1c69cc),_0x1c69cc+=this[_0x2e1713(0x449)]();}}else VisuMZ[_0x2e1713(0x5c5)][_0x2e1713(0x446)][_0x2e1713(0x2b0)](this);};};VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x513)]=Window_ShopSell[_0x555f1c(0x54e)][_0x555f1c(0x532)],Window_ShopSell['prototype'][_0x555f1c(0x532)]=function(_0x1cb007){const _0x1d238a=_0x555f1c;return VisuMZ[_0x1d238a(0x5c5)][_0x1d238a(0x51b)][_0x1d238a(0x71c)][_0x1d238a(0x1bb)]&&DataManager[_0x1d238a(0x51c)](_0x1cb007)?![]:VisuMZ[_0x1d238a(0x5c5)][_0x1d238a(0x513)]['call'](this,_0x1cb007);},Window_NumberInput[_0x555f1c(0x54e)]['isUseModernControls']=function(){return![];};VisuMZ[_0x555f1c(0x5c5)]['Settings'][_0x555f1c(0x735)][_0x555f1c(0x193)]&&(VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x346)]=Window_NumberInput['prototype'][_0x555f1c(0x7d2)],Window_NumberInput[_0x555f1c(0x54e)]['start']=function(){const _0x1ad4da=_0x555f1c;VisuMZ[_0x1ad4da(0x5c5)]['Window_NumberInput_start'][_0x1ad4da(0x2b0)](this),this[_0x1ad4da(0x7d7)](this[_0x1ad4da(0x668)]-0x1),Input[_0x1ad4da(0x4ba)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x613)]=Window_NumberInput[_0x555f1c(0x54e)]['processDigitChange'],Window_NumberInput[_0x555f1c(0x54e)][_0x555f1c(0x3d2)]=function(){const _0x286dec=_0x555f1c;if(!this[_0x286dec(0x4ca)]())return;if(Input['isNumpadPressed']())this[_0x286dec(0x8cf)]();else{if(Input[_0x286dec(0x67f)]('backspace'))this[_0x286dec(0x12f)]();else{if(Input[_0x286dec(0x778)]===0x2e)this['processKeyboardDelete']();else{if(Input[_0x286dec(0x778)]===0x24)this[_0x286dec(0x19d)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x286dec(0x140)]():VisuMZ['CoreEngine'][_0x286dec(0x613)][_0x286dec(0x2b0)](this);}}}},Window_NumberInput[_0x555f1c(0x54e)][_0x555f1c(0x831)]=function(){const _0x1eda21=_0x555f1c;if(!this[_0x1eda21(0x3be)]())return;Input[_0x1eda21(0x1ad)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x1eda21(0x54e)][_0x1eda21(0x831)][_0x1eda21(0x2b0)](this);},Window_NumberInput[_0x555f1c(0x54e)][_0x555f1c(0x2f1)]=function(){},Window_NumberInput[_0x555f1c(0x54e)]['processKeyboardDigitChange']=function(){const _0x41a0cd=_0x555f1c;if(String(this['_number'])['length']>=this[_0x41a0cd(0x668)])return;const _0x23942b=Number(String(this[_0x41a0cd(0x4a8)])+Input[_0x41a0cd(0x2ae)]);if(isNaN(_0x23942b))return;this[_0x41a0cd(0x4a8)]=_0x23942b;const _0x3392d8='9'[_0x41a0cd(0x347)](this[_0x41a0cd(0x668)]);this[_0x41a0cd(0x4a8)]=this['_number'][_0x41a0cd(0x739)](0x0,_0x3392d8),Input[_0x41a0cd(0x4ba)](),this['refresh'](),SoundManager['playCursor'](),this[_0x41a0cd(0x7d7)](this[_0x41a0cd(0x668)]-0x1);},Window_NumberInput[_0x555f1c(0x54e)][_0x555f1c(0x12f)]=function(){const _0x4da4ac=_0x555f1c;this['_number']=Number(String(this['_number'])['slice'](0x0,-0x1)),this[_0x4da4ac(0x4a8)]=Math[_0x4da4ac(0x4d6)](0x0,this[_0x4da4ac(0x4a8)]),Input[_0x4da4ac(0x4ba)](),this[_0x4da4ac(0x81e)](),SoundManager[_0x4da4ac(0x497)](),this[_0x4da4ac(0x7d7)](this[_0x4da4ac(0x668)]-0x1);},Window_NumberInput[_0x555f1c(0x54e)][_0x555f1c(0x247)]=function(){const _0x29c8f8=_0x555f1c;this[_0x29c8f8(0x4a8)]=Number(String(this[_0x29c8f8(0x4a8)])['substring'](0x1)),this[_0x29c8f8(0x4a8)]=Math[_0x29c8f8(0x4d6)](0x0,this[_0x29c8f8(0x4a8)]),Input[_0x29c8f8(0x4ba)](),this['refresh'](),SoundManager[_0x29c8f8(0x497)](),this[_0x29c8f8(0x7d7)](this[_0x29c8f8(0x668)]-0x1);},Window_NumberInput[_0x555f1c(0x54e)]['processKeyboardHome']=function(){const _0x4f50d4=_0x555f1c;if(this[_0x4f50d4(0x88f)]()===0x0)return;Input['clear'](),this['refresh'](),SoundManager['playCursor'](),this[_0x4f50d4(0x7d7)](0x0);},Window_NumberInput[_0x555f1c(0x54e)]['processKeyboardEnd']=function(){const _0x597e40=_0x555f1c;if(this[_0x597e40(0x88f)]()===this[_0x597e40(0x668)]-0x1)return;Input['clear'](),this[_0x597e40(0x81e)](),SoundManager['playCursor'](),this['select'](this[_0x597e40(0x668)]-0x1);});;VisuMZ[_0x555f1c(0x5c5)]['Window_MapName_refresh']=Window_MapName['prototype'][_0x555f1c(0x81e)],Window_MapName['prototype']['refresh']=function(){const _0x4c5773=_0x555f1c;VisuMZ[_0x4c5773(0x5c5)]['Settings'][_0x4c5773(0x71c)][_0x4c5773(0x461)]?this[_0x4c5773(0x8a4)]():VisuMZ['CoreEngine']['Window_MapName_refresh'][_0x4c5773(0x2b0)](this);},Window_MapName[_0x555f1c(0x54e)][_0x555f1c(0x8a4)]=function(){const _0x16a61f=_0x555f1c;this[_0x16a61f(0x4bc)][_0x16a61f(0x4ba)]();if($gameMap[_0x16a61f(0x349)]()){const _0x460b2b=this['innerWidth'];this[_0x16a61f(0x203)](0x0,0x0,_0x460b2b,this[_0x16a61f(0x449)]());const _0x366fd9=this['textSizeEx']($gameMap[_0x16a61f(0x349)]())[_0x16a61f(0x83c)];this['drawTextEx']($gameMap[_0x16a61f(0x349)](),Math['floor']((_0x460b2b-_0x366fd9)/0x2),0x0);}},Window_TitleCommand[_0x555f1c(0x398)]=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x4c1)],Window_TitleCommand[_0x555f1c(0x54e)][_0x555f1c(0x37a)]=function(){const _0x5d6c64=_0x555f1c;this[_0x5d6c64(0x8be)]();},Window_TitleCommand[_0x555f1c(0x54e)][_0x555f1c(0x8be)]=function(){const _0x25e381=_0x555f1c;for(const _0x43d786 of Window_TitleCommand[_0x25e381(0x398)]){if(_0x43d786[_0x25e381(0x311)][_0x25e381(0x2b0)](this)){const _0x1d01af=_0x43d786['Symbol'];let _0x33f68d=_0x43d786[_0x25e381(0x8e1)];if(['',_0x25e381(0x895)][_0x25e381(0x484)](_0x33f68d))_0x33f68d=_0x43d786[_0x25e381(0x555)][_0x25e381(0x2b0)](this);const _0x530412=_0x43d786[_0x25e381(0x57d)][_0x25e381(0x2b0)](this),_0x577362=_0x43d786[_0x25e381(0x448)][_0x25e381(0x2b0)](this);this[_0x25e381(0x5b9)](_0x33f68d,_0x1d01af,_0x530412,_0x577362),this['setHandler'](_0x1d01af,_0x43d786[_0x25e381(0x72f)][_0x25e381(0x41d)](this,_0x577362));}}},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x394)]=Window_TitleCommand[_0x555f1c(0x54e)]['selectLast'],Window_TitleCommand[_0x555f1c(0x54e)][_0x555f1c(0x700)]=function(){const _0x5325cc=_0x555f1c;VisuMZ[_0x5325cc(0x5c5)][_0x5325cc(0x394)][_0x5325cc(0x2b0)](this);if(!Window_TitleCommand[_0x5325cc(0x301)])return;const _0x3f14e5=this[_0x5325cc(0x489)](Window_TitleCommand['_lastCommandSymbol']),_0x9d35ef=Math[_0x5325cc(0x5ad)](this[_0x5325cc(0x2ba)]()/0x2)-0x1;this[_0x5325cc(0x615)](_0x3f14e5),this['_scrollDuration']>0x1&&(this[_0x5325cc(0x5d3)]=0x1,this[_0x5325cc(0x39c)]()),this[_0x5325cc(0x288)](_0x3f14e5-_0x9d35ef);},Window_GameEnd['_commandList']=VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)]['MenuLayout'][_0x555f1c(0x690)][_0x555f1c(0x134)],Window_GameEnd['prototype']['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x555f1c(0x54e)]['makeCoreEngineCommandList']=function(){const _0x5ad72a=_0x555f1c;for(const _0x38fe4c of Window_GameEnd[_0x5ad72a(0x398)]){if(_0x38fe4c[_0x5ad72a(0x311)][_0x5ad72a(0x2b0)](this)){const _0x1a24cb=_0x38fe4c[_0x5ad72a(0x308)];let _0x28364d=_0x38fe4c[_0x5ad72a(0x8e1)];if(['','Untitled'][_0x5ad72a(0x484)](_0x28364d))_0x28364d=_0x38fe4c[_0x5ad72a(0x555)]['call'](this);const _0x1a32c6=_0x38fe4c[_0x5ad72a(0x57d)][_0x5ad72a(0x2b0)](this),_0x2f3af6=_0x38fe4c[_0x5ad72a(0x448)][_0x5ad72a(0x2b0)](this);this[_0x5ad72a(0x5b9)](_0x28364d,_0x1a24cb,_0x1a32c6,_0x2f3af6),this['setHandler'](_0x1a24cb,_0x38fe4c[_0x5ad72a(0x72f)][_0x5ad72a(0x41d)](this,_0x2f3af6));}}};function _0x233d(_0x50468b,_0x3c0b3d){const _0x4c1e2a=_0x4c1e();return _0x233d=function(_0x233d21,_0x20a6b5){_0x233d21=_0x233d21-0xed;let _0x5a5a73=_0x4c1e2a[_0x233d21];return _0x5a5a73;},_0x233d(_0x50468b,_0x3c0b3d);}function Window_ButtonAssist(){const _0x3953e6=_0x555f1c;this[_0x3953e6(0x124)](...arguments);}Window_ButtonAssist['prototype']=Object[_0x555f1c(0x663)](Window_Base['prototype']),Window_ButtonAssist[_0x555f1c(0x54e)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(_0x4304ac){const _0x26cfab=_0x555f1c;this[_0x26cfab(0x6df)]={},Window_Base[_0x26cfab(0x54e)]['initialize'][_0x26cfab(0x2b0)](this,_0x4304ac),this[_0x26cfab(0x75d)](VisuMZ[_0x26cfab(0x5c5)][_0x26cfab(0x51b)][_0x26cfab(0x879)][_0x26cfab(0x681)]||0x0),this[_0x26cfab(0x81e)]();},Window_ButtonAssist[_0x555f1c(0x54e)][_0x555f1c(0x449)]=function(){const _0x185732=_0x555f1c;return this[_0x185732(0x3e1)]||Window_Base[_0x185732(0x54e)][_0x185732(0x449)][_0x185732(0x2b0)](this);},Window_ButtonAssist[_0x555f1c(0x54e)]['makeFontBigger']=function(){const _0x9454ff=_0x555f1c;this[_0x9454ff(0x4bc)]['fontSize']<=0x60&&(this[_0x9454ff(0x4bc)][_0x9454ff(0x457)]+=0x6);},Window_ButtonAssist['prototype'][_0x555f1c(0x4ee)]=function(){const _0xda0c9d=_0x555f1c;this[_0xda0c9d(0x4bc)][_0xda0c9d(0x457)]>=0x18&&(this['contents'][_0xda0c9d(0x457)]-=0x6);},Window_ButtonAssist[_0x555f1c(0x54e)]['update']=function(){const _0x540e4b=_0x555f1c;Window_Base['prototype'][_0x540e4b(0x202)][_0x540e4b(0x2b0)](this),this[_0x540e4b(0x180)]();},Window_ButtonAssist['prototype']['updatePadding']=function(){const _0x4a55e1=_0x555f1c;this['padding']=SceneManager[_0x4a55e1(0x7b9)]['getButtonAssistLocation']()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x555f1c(0x54e)][_0x555f1c(0x180)]=function(){const _0x5add04=_0x555f1c,_0x360b10=SceneManager[_0x5add04(0x7b9)];for(let _0x1c5ad0=0x1;_0x1c5ad0<=0x5;_0x1c5ad0++){if(this[_0x5add04(0x6df)][_0x5add04(0x3dc)['format'](_0x1c5ad0)]!==_0x360b10[_0x5add04(0x401)[_0x5add04(0x39f)](_0x1c5ad0)]())return this['refresh']();if(this['_data']['text%1'[_0x5add04(0x39f)](_0x1c5ad0)]!==_0x360b10[_0x5add04(0x8b8)[_0x5add04(0x39f)](_0x1c5ad0)]())return this[_0x5add04(0x81e)]();}},Window_ButtonAssist[_0x555f1c(0x54e)][_0x555f1c(0x81e)]=function(){const _0x1b38aa=_0x555f1c;this[_0x1b38aa(0x4bc)][_0x1b38aa(0x4ba)]();for(let _0x52756e=0x1;_0x52756e<=0x5;_0x52756e++){this['drawSegment'](_0x52756e);}},Window_ButtonAssist[_0x555f1c(0x54e)]['drawSegment']=function(_0x41c53d){const _0x27ecf3=_0x555f1c,_0x4d6baf=this[_0x27ecf3(0xf3)]/0x5,_0x5dc0dd=SceneManager[_0x27ecf3(0x7b9)],_0x340ccf=_0x5dc0dd['buttonAssistKey%1'[_0x27ecf3(0x39f)](_0x41c53d)](),_0x4a3e23=_0x5dc0dd[_0x27ecf3(0x8b8)['format'](_0x41c53d)]();this[_0x27ecf3(0x6df)]['key%1'[_0x27ecf3(0x39f)](_0x41c53d)]=_0x340ccf,this[_0x27ecf3(0x6df)][_0x27ecf3(0x6bd)[_0x27ecf3(0x39f)](_0x41c53d)]=_0x4a3e23;if(_0x340ccf==='')return;if(_0x4a3e23==='')return;const _0x266e0a=_0x5dc0dd[_0x27ecf3(0x213)[_0x27ecf3(0x39f)](_0x41c53d)](),_0x4cff68=this[_0x27ecf3(0x2b2)](),_0x5a6a3a=_0x4d6baf*(_0x41c53d-0x1)+_0x4cff68+_0x266e0a,_0x2b2f53=VisuMZ[_0x27ecf3(0x5c5)]['Settings'][_0x27ecf3(0x879)][_0x27ecf3(0x2df)];this[_0x27ecf3(0x351)](_0x2b2f53[_0x27ecf3(0x39f)](_0x340ccf,_0x4a3e23),_0x5a6a3a,0x0,_0x4d6baf-_0x4cff68*0x2);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x1a9)]=Game_Interpreter['prototype'][_0x555f1c(0x5fa)],Game_Interpreter[_0x555f1c(0x54e)][_0x555f1c(0x5fa)]=function(){const _0x5d67e0=_0x555f1c;if($gameTemp[_0x5d67e0(0x15a)]!==undefined)return VisuMZ[_0x5d67e0(0x5c5)][_0x5d67e0(0x7ab)]();return VisuMZ[_0x5d67e0(0x5c5)]['Game_Interpreter_updateWaitMode'][_0x5d67e0(0x2b0)](this);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x7ab)]=function(){const _0x135370=_0x555f1c,_0x5b5023=$gameTemp[_0x135370(0x15a)]||0x0;(_0x5b5023<0x0||_0x5b5023>0x64||TouchInput[_0x135370(0x8d5)]()||Input[_0x135370(0x492)]('cancel'))&&($gameTemp[_0x135370(0x15a)]=undefined,Input[_0x135370(0x4ba)](),TouchInput[_0x135370(0x4ba)]());const _0x3af81e=$gameScreen['picture'](_0x5b5023);return _0x3af81e&&(_0x3af81e['_x']=TouchInput['_x'],_0x3af81e['_y']=TouchInput['_y']),VisuMZ[_0x135370(0x5c5)]['updatePictureCoordinates'](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x896)]=function(){const _0x11a9e6=_0x555f1c,_0x575fcd=SceneManager[_0x11a9e6(0x7b9)];if(!_0x575fcd)return;!_0x575fcd[_0x11a9e6(0x553)]&&(SoundManager[_0x11a9e6(0x6f8)](),_0x575fcd[_0x11a9e6(0x553)]=new Window_PictureCoordinates(),_0x575fcd[_0x11a9e6(0x463)](_0x575fcd[_0x11a9e6(0x553)])),$gameTemp[_0x11a9e6(0x15a)]===undefined&&(SoundManager['playCancel'](),_0x575fcd['removeChild'](_0x575fcd[_0x11a9e6(0x553)]),_0x575fcd['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){this['initialize'](...arguments);}Window_PictureCoordinates[_0x555f1c(0x54e)]=Object[_0x555f1c(0x663)](Window_Base[_0x555f1c(0x54e)]),Window_PictureCoordinates[_0x555f1c(0x54e)][_0x555f1c(0x141)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x555f1c(0x54e)][_0x555f1c(0x124)]=function(){const _0x42be88=_0x555f1c;this['_lastOrigin']=_0x42be88(0x474),this[_0x42be88(0x184)]='nah',this[_0x42be88(0x1f1)]='nah';const _0x28fc85=this['windowRect']();Window_Base[_0x42be88(0x54e)][_0x42be88(0x124)][_0x42be88(0x2b0)](this,_0x28fc85),this[_0x42be88(0x75d)](0x2);},Window_PictureCoordinates[_0x555f1c(0x54e)]['windowRect']=function(){const _0x2aeac8=_0x555f1c;let _0x3702b2=0x0,_0x361820=Graphics['height']-this[_0x2aeac8(0x449)](),_0x365b8e=Graphics[_0x2aeac8(0x83c)],_0x234375=this[_0x2aeac8(0x449)]();return new Rectangle(_0x3702b2,_0x361820,_0x365b8e,_0x234375);},Window_PictureCoordinates[_0x555f1c(0x54e)]['updatePadding']=function(){const _0x4e75b8=_0x555f1c;this[_0x4e75b8(0x60c)]=0x0;},Window_PictureCoordinates[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0x3973d8=_0x555f1c;Window_Base[_0x3973d8(0x54e)][_0x3973d8(0x202)][_0x3973d8(0x2b0)](this),this['updateData']();},Window_PictureCoordinates['prototype'][_0x555f1c(0x588)]=function(){const _0xafe76=_0x555f1c;if(!this[_0xafe76(0x874)]())return;this['refresh']();},Window_PictureCoordinates[_0x555f1c(0x54e)][_0x555f1c(0x874)]=function(){const _0x16f693=_0x555f1c,_0x361571=$gameTemp[_0x16f693(0x15a)],_0x538a19=$gameScreen['picture'](_0x361571);return _0x538a19?this['_lastOrigin']!==_0x538a19['_origin']||this[_0x16f693(0x184)]!==_0x538a19['_x']||this[_0x16f693(0x1f1)]!==_0x538a19['_y']:![];},Window_PictureCoordinates[_0x555f1c(0x54e)][_0x555f1c(0x81e)]=function(){const _0x2a5fcf=_0x555f1c;this['contents'][_0x2a5fcf(0x4ba)]();const _0x5313b3=$gameTemp[_0x2a5fcf(0x15a)],_0x53f978=$gameScreen['picture'](_0x5313b3);if(!_0x53f978)return;this[_0x2a5fcf(0x2f0)]=_0x53f978[_0x2a5fcf(0x4cb)],this[_0x2a5fcf(0x184)]=_0x53f978['_x'],this[_0x2a5fcf(0x1f1)]=_0x53f978['_y'];const _0x4def8d=ColorManager[_0x2a5fcf(0x522)]();this['contents'][_0x2a5fcf(0x211)](0x0,0x0,this[_0x2a5fcf(0xf3)],this['innerHeight'],_0x4def8d);const _0xc11797=_0x2a5fcf(0x66a)['format'](_0x53f978[_0x2a5fcf(0x4cb)]===0x0?_0x2a5fcf(0x23e):'Center'),_0x4bc756=_0x2a5fcf(0x3f4)['format'](_0x53f978['_x']),_0x9fd495=_0x2a5fcf(0x265)['format'](_0x53f978['_y']),_0x2231e2='%1:\x20Exit\x20'[_0x2a5fcf(0x39f)](TextManager[_0x2a5fcf(0x1ea)](_0x2a5fcf(0x201)));let _0x46abeb=Math[_0x2a5fcf(0x5ad)](this[_0x2a5fcf(0xf3)]/0x4);this[_0x2a5fcf(0x3bb)](_0xc11797,_0x46abeb*0x0,0x0,_0x46abeb),this['drawText'](_0x4bc756,_0x46abeb*0x1,0x0,_0x46abeb,_0x2a5fcf(0x14c)),this[_0x2a5fcf(0x3bb)](_0x9fd495,_0x46abeb*0x2,0x0,_0x46abeb,_0x2a5fcf(0x14c));const _0x13291a=this[_0x2a5fcf(0x4dd)](_0x2231e2)[_0x2a5fcf(0x83c)],_0x10022d=this[_0x2a5fcf(0xf3)]-_0x13291a;this['drawTextEx'](_0x2231e2,_0x10022d,0x0,_0x13291a);};function Window_TextPopup(){const _0xfc8fcb=_0x555f1c;this[_0xfc8fcb(0x124)](...arguments);}Window_TextPopup[_0x555f1c(0x54e)]=Object[_0x555f1c(0x663)](Window_Base[_0x555f1c(0x54e)]),Window_TextPopup['prototype'][_0x555f1c(0x141)]=Window_TextPopup,Window_TextPopup[_0x555f1c(0x72e)]={'framesPerChar':VisuMZ['CoreEngine'][_0x555f1c(0x51b)][_0x555f1c(0x2f5)][_0x555f1c(0x1ca)]??1.5,'framesMin':VisuMZ['CoreEngine'][_0x555f1c(0x51b)][_0x555f1c(0x2f5)][_0x555f1c(0x75c)]??0x5a,'framesMax':VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x51b)][_0x555f1c(0x2f5)][_0x555f1c(0x565)]??0x12c},Window_TextPopup['prototype'][_0x555f1c(0x124)]=function(){const _0x449ba3=_0x555f1c,_0x19e5ec=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype'][_0x449ba3(0x124)][_0x449ba3(0x2b0)](this,_0x19e5ec),this['openness']=0x0,this[_0x449ba3(0x8c6)]='',this[_0x449ba3(0x5c6)]=[],this['_timeDuration']=0x0;},Window_TextPopup['prototype'][_0x555f1c(0x50d)]=function(){return!![];},Window_TextPopup[_0x555f1c(0x54e)][_0x555f1c(0x2b7)]=function(_0x25c181){const _0x30c339=_0x555f1c;if(this[_0x30c339(0x5c6)][this[_0x30c339(0x5c6)][_0x30c339(0x6d6)]-0x1]===_0x25c181)return;this[_0x30c339(0x5c6)][_0x30c339(0x45f)](_0x25c181),SceneManager[_0x30c339(0x7b9)][_0x30c339(0x463)](this);},Window_TextPopup[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0xd551c0=_0x555f1c;Window_Base[_0xd551c0(0x54e)]['update'][_0xd551c0(0x2b0)](this),this[_0xd551c0(0x279)](),this[_0xd551c0(0x1fb)]();},Window_TextPopup[_0x555f1c(0x54e)][_0x555f1c(0x279)]=function(){const _0x194f33=_0x555f1c;if(this[_0x194f33(0x8c6)]!=='')return;if(this['_textQueue']['length']<=0x0)return;if(!this['isClosed']())return;this[_0x194f33(0x8c6)]=this['_textQueue'][_0x194f33(0x1eb)]();const _0x4b8019=Window_TextPopup[_0x194f33(0x72e)],_0x4771ed=Math[_0x194f33(0x337)](this[_0x194f33(0x8c6)][_0x194f33(0x6d6)]*_0x4b8019[_0x194f33(0x332)]);this[_0x194f33(0x1c1)]=_0x4771ed[_0x194f33(0x739)](_0x4b8019[_0x194f33(0x177)],_0x4b8019['framesMax']);const _0x332ed3=this[_0x194f33(0x4dd)](this[_0x194f33(0x8c6)]);let _0x12b643=_0x332ed3[_0x194f33(0x83c)]+this[_0x194f33(0x2b2)]()*0x2;_0x12b643+=$gameSystem[_0x194f33(0x26c)]()*0x2;let _0x4f7fa9=Math[_0x194f33(0x4d6)](_0x332ed3[_0x194f33(0x63d)],this[_0x194f33(0x449)]());_0x4f7fa9+=$gameSystem[_0x194f33(0x26c)]()*0x2;const _0xd63591=Math['round']((Graphics[_0x194f33(0x83c)]-_0x12b643)/0x2),_0x37d16e=Math[_0x194f33(0x647)]((Graphics[_0x194f33(0x63d)]-_0x4f7fa9)/0x2),_0x144716=new Rectangle(_0xd63591,_0x37d16e,_0x12b643,_0x4f7fa9);this[_0x194f33(0x25f)](_0x144716['x'],_0x144716['y'],_0x144716[_0x194f33(0x83c)],_0x144716[_0x194f33(0x63d)]),this[_0x194f33(0x8e2)](),this['refresh'](),this[_0x194f33(0x81b)](),SceneManager['_scene'][_0x194f33(0x463)](this);},Window_TextPopup[_0x555f1c(0x54e)][_0x555f1c(0x81e)]=function(){const _0x3864a3=_0x555f1c,_0x49b95a=this['baseTextRect']();this['contents'][_0x3864a3(0x4ba)](),this[_0x3864a3(0x351)](this[_0x3864a3(0x8c6)],_0x49b95a['x'],_0x49b95a['y'],_0x49b95a[_0x3864a3(0x83c)]);},Window_TextPopup['prototype'][_0x555f1c(0x1fb)]=function(){const _0x25a60b=_0x555f1c;if(this[_0x25a60b(0x169)]()||this[_0x25a60b(0x415)]())return;if(this[_0x25a60b(0x1c1)]<=0x0)return;this[_0x25a60b(0x1c1)]--,this['_timeDuration']<=0x0&&(this[_0x25a60b(0x74b)](),this[_0x25a60b(0x8c6)]='');},VisuMZ[_0x555f1c(0x4f7)]=function(_0x30383b){const _0x18c6a4=_0x555f1c;if(Utils[_0x18c6a4(0x4d2)](_0x18c6a4(0x617))){var _0x1cd58c=require(_0x18c6a4(0x861))[_0x18c6a4(0x2f5)]['get']();SceneManager[_0x18c6a4(0x2ad)]();if(_0x30383b)setTimeout(_0x1cd58c[_0x18c6a4(0x372)][_0x18c6a4(0x41d)](_0x1cd58c),0x190);}},VisuMZ[_0x555f1c(0x8ba)]=function(_0x1f34b8,_0x32efea){const _0x33cdab=_0x555f1c;_0x32efea=_0x32efea[_0x33cdab(0x48a)]();var _0xf3e5ae=1.70158,_0x4e09c=0.7;switch(_0x32efea){case _0x33cdab(0x7c3):return _0x1f34b8;case'INSINE':return-0x1*Math[_0x33cdab(0x568)](_0x1f34b8*(Math['PI']/0x2))+0x1;case _0x33cdab(0x1b8):return Math[_0x33cdab(0x30c)](_0x1f34b8*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x33cdab(0x568)](Math['PI']*_0x1f34b8)-0x1);case _0x33cdab(0x4d3):return _0x1f34b8*_0x1f34b8;case'OUTQUAD':return _0x1f34b8*(0x2-_0x1f34b8);case'INOUTQUAD':return _0x1f34b8<0.5?0x2*_0x1f34b8*_0x1f34b8:-0x1+(0x4-0x2*_0x1f34b8)*_0x1f34b8;case _0x33cdab(0x35e):return _0x1f34b8*_0x1f34b8*_0x1f34b8;case _0x33cdab(0x8cc):var _0x5d65f8=_0x1f34b8-0x1;return _0x5d65f8*_0x5d65f8*_0x5d65f8+0x1;case _0x33cdab(0x62d):return _0x1f34b8<0.5?0x4*_0x1f34b8*_0x1f34b8*_0x1f34b8:(_0x1f34b8-0x1)*(0x2*_0x1f34b8-0x2)*(0x2*_0x1f34b8-0x2)+0x1;case _0x33cdab(0x392):return _0x1f34b8*_0x1f34b8*_0x1f34b8*_0x1f34b8;case _0x33cdab(0x76e):var _0x5d65f8=_0x1f34b8-0x1;return 0x1-_0x5d65f8*_0x5d65f8*_0x5d65f8*_0x5d65f8;case _0x33cdab(0x795):var _0x5d65f8=_0x1f34b8-0x1;return _0x1f34b8<0.5?0x8*_0x1f34b8*_0x1f34b8*_0x1f34b8*_0x1f34b8:0x1-0x8*_0x5d65f8*_0x5d65f8*_0x5d65f8*_0x5d65f8;case _0x33cdab(0x8d3):return _0x1f34b8*_0x1f34b8*_0x1f34b8*_0x1f34b8*_0x1f34b8;case _0x33cdab(0x483):var _0x5d65f8=_0x1f34b8-0x1;return 0x1+_0x5d65f8*_0x5d65f8*_0x5d65f8*_0x5d65f8*_0x5d65f8;case _0x33cdab(0x3cf):var _0x5d65f8=_0x1f34b8-0x1;return _0x1f34b8<0.5?0x10*_0x1f34b8*_0x1f34b8*_0x1f34b8*_0x1f34b8*_0x1f34b8:0x1+0x10*_0x5d65f8*_0x5d65f8*_0x5d65f8*_0x5d65f8*_0x5d65f8;case _0x33cdab(0x8c1):if(_0x1f34b8===0x0)return 0x0;return Math[_0x33cdab(0x3ca)](0x2,0xa*(_0x1f34b8-0x1));case _0x33cdab(0x614):if(_0x1f34b8===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x1f34b8)+0x1;case _0x33cdab(0x605):if(_0x1f34b8===0x0||_0x1f34b8===0x1)return _0x1f34b8;var _0x57589d=_0x1f34b8*0x2,_0x7abb12=_0x57589d-0x1;if(_0x57589d<0x1)return 0.5*Math[_0x33cdab(0x3ca)](0x2,0xa*_0x7abb12);return 0.5*(-Math[_0x33cdab(0x3ca)](0x2,-0xa*_0x7abb12)+0x2);case _0x33cdab(0x619):var _0x57589d=_0x1f34b8/0x1;return-0x1*(Math['sqrt'](0x1-_0x57589d*_0x1f34b8)-0x1);case'OUTCIRC':var _0x5d65f8=_0x1f34b8-0x1;return Math[_0x33cdab(0x51d)](0x1-_0x5d65f8*_0x5d65f8);case'INOUTCIRC':var _0x57589d=_0x1f34b8*0x2,_0x7abb12=_0x57589d-0x2;if(_0x57589d<0x1)return-0.5*(Math[_0x33cdab(0x51d)](0x1-_0x57589d*_0x57589d)-0x1);return 0.5*(Math[_0x33cdab(0x51d)](0x1-_0x7abb12*_0x7abb12)+0x1);case _0x33cdab(0x44c):return _0x1f34b8*_0x1f34b8*((_0xf3e5ae+0x1)*_0x1f34b8-_0xf3e5ae);case'OUTBACK':var _0x57589d=_0x1f34b8/0x1-0x1;return _0x57589d*_0x57589d*((_0xf3e5ae+0x1)*_0x57589d+_0xf3e5ae)+0x1;break;case'INOUTBACK':var _0x57589d=_0x1f34b8*0x2,_0x6dda5b=_0x57589d-0x2,_0xea2fbb=_0xf3e5ae*1.525;if(_0x57589d<0x1)return 0.5*_0x57589d*_0x57589d*((_0xea2fbb+0x1)*_0x57589d-_0xea2fbb);return 0.5*(_0x6dda5b*_0x6dda5b*((_0xea2fbb+0x1)*_0x6dda5b+_0xea2fbb)+0x2);case _0x33cdab(0x168):if(_0x1f34b8===0x0||_0x1f34b8===0x1)return _0x1f34b8;var _0x57589d=_0x1f34b8/0x1,_0x7abb12=_0x57589d-0x1,_0x5606b0=0x1-_0x4e09c,_0xea2fbb=_0x5606b0/(0x2*Math['PI'])*Math[_0x33cdab(0x32b)](0x1);return-(Math[_0x33cdab(0x3ca)](0x2,0xa*_0x7abb12)*Math[_0x33cdab(0x30c)]((_0x7abb12-_0xea2fbb)*(0x2*Math['PI'])/_0x5606b0));case'OUTELASTIC':var _0x5606b0=0x1-_0x4e09c,_0x57589d=_0x1f34b8*0x2;if(_0x1f34b8===0x0||_0x1f34b8===0x1)return _0x1f34b8;var _0xea2fbb=_0x5606b0/(0x2*Math['PI'])*Math[_0x33cdab(0x32b)](0x1);return Math[_0x33cdab(0x3ca)](0x2,-0xa*_0x57589d)*Math[_0x33cdab(0x30c)]((_0x57589d-_0xea2fbb)*(0x2*Math['PI'])/_0x5606b0)+0x1;case _0x33cdab(0x725):var _0x5606b0=0x1-_0x4e09c;if(_0x1f34b8===0x0||_0x1f34b8===0x1)return _0x1f34b8;var _0x57589d=_0x1f34b8*0x2,_0x7abb12=_0x57589d-0x1,_0xea2fbb=_0x5606b0/(0x2*Math['PI'])*Math[_0x33cdab(0x32b)](0x1);if(_0x57589d<0x1)return-0.5*(Math[_0x33cdab(0x3ca)](0x2,0xa*_0x7abb12)*Math[_0x33cdab(0x30c)]((_0x7abb12-_0xea2fbb)*(0x2*Math['PI'])/_0x5606b0));return Math[_0x33cdab(0x3ca)](0x2,-0xa*_0x7abb12)*Math['sin']((_0x7abb12-_0xea2fbb)*(0x2*Math['PI'])/_0x5606b0)*0.5+0x1;case _0x33cdab(0x3da):var _0x57589d=_0x1f34b8/0x1;if(_0x57589d<0x1/2.75)return 7.5625*_0x57589d*_0x57589d;else{if(_0x57589d<0x2/2.75){var _0x6dda5b=_0x57589d-1.5/2.75;return 7.5625*_0x6dda5b*_0x6dda5b+0.75;}else{if(_0x57589d<2.5/2.75){var _0x6dda5b=_0x57589d-2.25/2.75;return 7.5625*_0x6dda5b*_0x6dda5b+0.9375;}else{var _0x6dda5b=_0x57589d-2.625/2.75;return 7.5625*_0x6dda5b*_0x6dda5b+0.984375;}}}case'INBOUNCE':var _0x34a8f6=0x1-VisuMZ[_0x33cdab(0x8ba)](0x1-_0x1f34b8,'outbounce');return _0x34a8f6;case _0x33cdab(0x872):if(_0x1f34b8<0.5)var _0x34a8f6=VisuMZ[_0x33cdab(0x8ba)](_0x1f34b8*0x2,_0x33cdab(0x64d))*0.5;else var _0x34a8f6=VisuMZ[_0x33cdab(0x8ba)](_0x1f34b8*0x2-0x1,'outbounce')*0.5+0.5;return _0x34a8f6;default:return _0x1f34b8;}},VisuMZ['GetParamIcon']=function(_0x17cac2){const _0x4a45c5=_0x555f1c;_0x17cac2=String(_0x17cac2)[_0x4a45c5(0x48a)]();const _0x59d09a=VisuMZ[_0x4a45c5(0x5c5)][_0x4a45c5(0x51b)]['Param'];if(_0x17cac2===_0x4a45c5(0x711))return _0x59d09a['IconParam0'];if(_0x17cac2===_0x4a45c5(0x853))return _0x59d09a[_0x4a45c5(0x539)];if(_0x17cac2===_0x4a45c5(0x31b))return _0x59d09a[_0x4a45c5(0x252)];if(_0x17cac2==='DEF')return _0x59d09a['IconParam3'];if(_0x17cac2===_0x4a45c5(0x256))return _0x59d09a[_0x4a45c5(0x3c1)];if(_0x17cac2===_0x4a45c5(0x460))return _0x59d09a[_0x4a45c5(0x8e4)];if(_0x17cac2===_0x4a45c5(0x1e2))return _0x59d09a[_0x4a45c5(0x48d)];if(_0x17cac2===_0x4a45c5(0x8e9))return _0x59d09a[_0x4a45c5(0x785)];if(_0x17cac2==='HIT')return _0x59d09a[_0x4a45c5(0x854)];if(_0x17cac2===_0x4a45c5(0x18f))return _0x59d09a[_0x4a45c5(0x59a)];if(_0x17cac2===_0x4a45c5(0xf8))return _0x59d09a[_0x4a45c5(0x28c)];if(_0x17cac2===_0x4a45c5(0x7ce))return _0x59d09a[_0x4a45c5(0x687)];if(_0x17cac2===_0x4a45c5(0x36a))return _0x59d09a[_0x4a45c5(0xf6)];if(_0x17cac2===_0x4a45c5(0x5d4))return _0x59d09a['IconXParam5'];if(_0x17cac2===_0x4a45c5(0x554))return _0x59d09a[_0x4a45c5(0x2d1)];if(_0x17cac2===_0x4a45c5(0x115))return _0x59d09a[_0x4a45c5(0x249)];if(_0x17cac2===_0x4a45c5(0x80c))return _0x59d09a[_0x4a45c5(0x43c)];if(_0x17cac2===_0x4a45c5(0x39a))return _0x59d09a['IconXParam9'];if(_0x17cac2===_0x4a45c5(0x505))return _0x59d09a[_0x4a45c5(0x6c0)];if(_0x17cac2===_0x4a45c5(0x462))return _0x59d09a['IconSParam1'];if(_0x17cac2===_0x4a45c5(0x1e4))return _0x59d09a[_0x4a45c5(0x14b)];if(_0x17cac2===_0x4a45c5(0x56a))return _0x59d09a['IconSParam3'];if(_0x17cac2===_0x4a45c5(0x6e7))return _0x59d09a[_0x4a45c5(0x22e)];if(_0x17cac2==='TCR')return _0x59d09a['IconSParam5'];if(_0x17cac2==='PDR')return _0x59d09a[_0x4a45c5(0x2de)];if(_0x17cac2===_0x4a45c5(0x583))return _0x59d09a['IconSParam7'];if(_0x17cac2==='FDR')return _0x59d09a['IconSParam8'];if(_0x17cac2===_0x4a45c5(0x4f0))return _0x59d09a[_0x4a45c5(0x799)];if(VisuMZ[_0x4a45c5(0x5c5)][_0x4a45c5(0x171)][_0x17cac2])return VisuMZ[_0x4a45c5(0x5c5)][_0x4a45c5(0x171)][_0x17cac2]||0x0;return 0x0;},VisuMZ[_0x555f1c(0x172)]=function(_0x4f87bf,_0x22f7d4,_0x2d3f32){const _0x5df0c8=_0x555f1c;if(_0x2d3f32===undefined&&_0x4f87bf%0x1===0x0)return _0x4f87bf;if(_0x2d3f32!==undefined&&[_0x5df0c8(0x711),'MAXMP',_0x5df0c8(0x31b),_0x5df0c8(0x363),'MAT',_0x5df0c8(0x460),_0x5df0c8(0x1e2),'LUK']['includes'](String(_0x2d3f32)['toUpperCase']()[_0x5df0c8(0x26b)]()))return _0x4f87bf;_0x22f7d4=_0x22f7d4||0x0;if(VisuMZ[_0x5df0c8(0x5c5)][_0x5df0c8(0x396)][_0x2d3f32])return VisuMZ['CoreEngine'][_0x5df0c8(0x6b3)][_0x2d3f32]==='integer'?_0x4f87bf:String((_0x4f87bf*0x64)[_0x5df0c8(0x7e0)](_0x22f7d4))+'%';return String((_0x4f87bf*0x64)[_0x5df0c8(0x7e0)](_0x22f7d4))+'%';},VisuMZ['GroupDigits']=function(_0x15ebea){const _0x3cf7aa=_0x555f1c;_0x15ebea=String(_0x15ebea);if(!_0x15ebea)return _0x15ebea;if(typeof _0x15ebea!==_0x3cf7aa(0x28f))return _0x15ebea;const _0x597c26=VisuMZ[_0x3cf7aa(0x5c5)][_0x3cf7aa(0x51b)][_0x3cf7aa(0x71c)][_0x3cf7aa(0x67d)]||_0x3cf7aa(0x524),_0x320402={'maximumFractionDigits':0x6};_0x15ebea=_0x15ebea[_0x3cf7aa(0x38a)](/\[(.*?)\]/g,(_0x3d2adf,_0x563bb3)=>{const _0x2128c9=_0x3cf7aa;return VisuMZ[_0x2128c9(0x39b)](_0x563bb3,'[',']');}),_0x15ebea=_0x15ebea['replace'](/<(.*?)>/g,(_0x3a551f,_0x244969)=>{const _0x1100f7=_0x3cf7aa;return VisuMZ[_0x1100f7(0x39b)](_0x244969,'<','>');}),_0x15ebea=_0x15ebea[_0x3cf7aa(0x38a)](/\{\{(.*?)\}\}/g,(_0x58d4f1,_0x12b294)=>{const _0xe80a43=_0x3cf7aa;return VisuMZ[_0xe80a43(0x39b)](_0x12b294,'','');}),_0x15ebea=_0x15ebea[_0x3cf7aa(0x38a)](/(\d+\.?\d*)/g,(_0x2d3c80,_0xd43e01)=>{const _0x50c294=_0x3cf7aa;let _0x39685e=_0xd43e01;if(_0x39685e[0x0]==='0')return _0x39685e;if(_0x39685e[_0x39685e[_0x50c294(0x6d6)]-0x1]==='.')return Number(_0x39685e)[_0x50c294(0x2a9)](_0x597c26,_0x320402)+'.';else return _0x39685e[_0x39685e[_0x50c294(0x6d6)]-0x1]===','?Number(_0x39685e)[_0x50c294(0x2a9)](_0x597c26,_0x320402)+',':Number(_0x39685e)[_0x50c294(0x2a9)](_0x597c26,_0x320402);});let _0x1d5f39=0x3;while(_0x1d5f39--){_0x15ebea=VisuMZ[_0x3cf7aa(0x7f9)](_0x15ebea);}return _0x15ebea;},VisuMZ[_0x555f1c(0x39b)]=function(_0x3c4b9b,_0x3c7b0a,_0x4dd2ec){const _0x2c951d=_0x555f1c;return _0x3c4b9b=_0x3c4b9b[_0x2c951d(0x38a)](/(\d)/gi,(_0x2ab7ab,_0x3c6090)=>_0x2c951d(0x243)[_0x2c951d(0x39f)](Number(_0x3c6090))),_0x2c951d(0x3b7)['format'](_0x3c4b9b,_0x3c7b0a,_0x4dd2ec);},VisuMZ[_0x555f1c(0x7f9)]=function(_0x539994){const _0x5fccf3=_0x555f1c;return _0x539994=_0x539994[_0x5fccf3(0x38a)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x28dce0,_0x487eec)=>Number(parseInt(_0x487eec))),_0x539994;},VisuMZ[_0x555f1c(0x49e)]=function(_0x129973){const _0x1e6ef0=_0x555f1c;SoundManager[_0x1e6ef0(0x82c)]();if(!Utils['isNwjs']()){const _0x233222=window[_0x1e6ef0(0x81b)](_0x129973,_0x1e6ef0(0x170));}else{const _0x25a605=process['platform']==_0x1e6ef0(0x4d5)?'open':process[_0x1e6ef0(0x465)]==_0x1e6ef0(0x107)?_0x1e6ef0(0x7d2):_0x1e6ef0(0x1a3);require(_0x1e6ef0(0x3ab))[_0x1e6ef0(0x60a)](_0x25a605+'\x20'+_0x129973);}},VisuMZ[_0x555f1c(0x303)]=function(_0x7f3501,_0x52ec82){const _0x123ef3=_0x555f1c;if(!_0x7f3501)return'';const _0x33423=_0x7f3501[_0x123ef3(0x366)]||_0x7f3501['id'];let _0x12c1de='';return _0x7f3501[_0x123ef3(0x405)]!==undefined&&_0x7f3501[_0x123ef3(0x318)]!==undefined&&(_0x12c1de=_0x123ef3(0x3d8)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501[_0x123ef3(0x5c1)]!==undefined&&_0x7f3501[_0x123ef3(0x444)]!==undefined&&(_0x12c1de=_0x123ef3(0x46f)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501['stypeId']!==undefined&&_0x7f3501['requiredWtypeId1']!==undefined&&(_0x12c1de=_0x123ef3(0x518)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501['itypeId']!==undefined&&_0x7f3501[_0x123ef3(0x200)]!==undefined&&(_0x12c1de=_0x123ef3(0x4af)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501[_0x123ef3(0x763)]!==undefined&&_0x7f3501[_0x123ef3(0x43f)]===0x1&&(_0x12c1de=_0x123ef3(0x707)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501[_0x123ef3(0x1d8)]!==undefined&&_0x7f3501[_0x123ef3(0x43f)]>0x1&&(_0x12c1de=_0x123ef3(0x1d1)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501[_0x123ef3(0x4ce)]!==undefined&&_0x7f3501[_0x123ef3(0x46d)]!==undefined&&(_0x12c1de=_0x123ef3(0x4ac)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x7f3501[_0x123ef3(0x250)]!==undefined&&_0x7f3501[_0x123ef3(0x803)]!==undefined&&(_0x12c1de=_0x123ef3(0x150)[_0x123ef3(0x39f)](_0x33423,_0x52ec82)),_0x12c1de;},Window_Base[_0x555f1c(0x54e)]['processDrawIcon']=function(_0x408869,_0xde2303){const _0x154662=_0x555f1c,_0x1f475b=ImageManager[_0x154662(0x1a5)]||0x20,_0x4d0ae5=ImageManager[_0x154662(0x481)]||0x20;if(_0xde2303[_0x154662(0x286)]){const _0x50882f=_0x1f475b-ImageManager['iconWidth'],_0x5dd5c5=_0x4d0ae5-ImageManager[_0x154662(0x843)];let _0x4cabdc=0x2,_0x4c4be8=0x2;this[_0x154662(0x449)]()!==0x24&&(_0x4c4be8=Math['floor']((this['lineHeight']()-_0x4d0ae5)/0x2));const _0x2a523c=_0xde2303['x']+Math[_0x154662(0x5ad)](_0x50882f/0x2)+_0x4cabdc,_0x48270e=_0xde2303['y']+Math['floor'](_0x5dd5c5/0x2)+_0x4c4be8;this[_0x154662(0x824)](_0x408869,_0x2a523c,_0x48270e);}_0xde2303['x']+=_0x1f475b+0x4;},Window_StatusBase['prototype']['drawActorIcons']=function(_0x5477d1,_0x215ae0,_0x4edb35,_0x5e5b9b){const _0x34c3ea=_0x555f1c;_0x5e5b9b=_0x5e5b9b||0x90;const _0x2e8ad2=ImageManager[_0x34c3ea(0x1a5)]||0x20,_0x763c58=ImageManager[_0x34c3ea(0x481)]||0x20,_0x28e9a2=_0x2e8ad2-ImageManager[_0x34c3ea(0x848)],_0x2636ce=_0x763c58-ImageManager[_0x34c3ea(0x843)],_0x1f2ed5=_0x2e8ad2,_0x11913a=_0x5477d1[_0x34c3ea(0x8d8)]()[_0x34c3ea(0x163)](0x0,Math[_0x34c3ea(0x5ad)](_0x5e5b9b/_0x1f2ed5));let _0x2a468e=_0x215ae0+Math[_0x34c3ea(0x337)](_0x28e9a2/0x2),_0xb854ec=_0x4edb35+Math[_0x34c3ea(0x337)](_0x2636ce/0x2);for(const _0x38e748 of _0x11913a){this['drawIcon'](_0x38e748,_0x2a468e,_0xb854ec),_0x2a468e+=_0x1f2ed5;}},Game_Picture['prototype'][_0x555f1c(0x63c)]=function(){const _0x47b136=_0x555f1c;return this[_0x47b136(0x551)];},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_initBasic']=Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x49a)],Game_Picture['prototype'][_0x555f1c(0x49a)]=function(){const _0x1951c1=_0x555f1c;VisuMZ[_0x1951c1(0x5c5)][_0x1951c1(0x526)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x1951c1(0x137)]={'x':0x0,'y':0x0};},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x370)]=Game_Picture['prototype'][_0x555f1c(0x2f3)],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x2f3)]=function(){const _0x4d27f0=_0x555f1c;this['updateAnchor']();const _0x5195cb=this[_0x4d27f0(0x1c8)];VisuMZ[_0x4d27f0(0x5c5)][_0x4d27f0(0x370)][_0x4d27f0(0x2b0)](this),_0x5195cb>0x0&&this[_0x4d27f0(0x1c8)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x4d27f0(0x253)],this['_scaleX']=this[_0x4d27f0(0x633)],this[_0x4d27f0(0x2d4)]=this[_0x4d27f0(0x855)],this['_opacity']=this[_0x4d27f0(0x208)],this['_anchor']&&(this['_anchor']['x']=this[_0x4d27f0(0x137)]['x'],this['_anchor']['y']=this[_0x4d27f0(0x137)]['y']));},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_show']=Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x3d9)],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x3d9)]=function(_0x2640df,_0x1f3fa1,_0x7731fa,_0x5ab622,_0x4a4845,_0x2941b0,_0x3bd982,_0xf18f61){const _0x8f068b=_0x555f1c;VisuMZ[_0x8f068b(0x5c5)][_0x8f068b(0x11d)]['call'](this,_0x2640df,_0x1f3fa1,_0x7731fa,_0x5ab622,_0x4a4845,_0x2941b0,_0x3bd982,_0xf18f61),this[_0x8f068b(0x20f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1f3fa1]||{'x':0x0,'y':0x0});},VisuMZ[_0x555f1c(0x5c5)]['Game_Picture_move']=Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x25f)],Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x25f)]=function(_0x3b3702,_0x936e9a,_0x369e4a,_0x2d5f47,_0x46226c,_0x34d19e,_0x59e7f6,_0x26f7dd,_0xfe0766){const _0x4b38be=_0x555f1c;VisuMZ[_0x4b38be(0x5c5)][_0x4b38be(0x22b)][_0x4b38be(0x2b0)](this,_0x3b3702,_0x936e9a,_0x369e4a,_0x2d5f47,_0x46226c,_0x34d19e,_0x59e7f6,_0x26f7dd,_0xfe0766),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3b3702]||{'x':0x0,'y':0x0});},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x884)]=function(){const _0x2875b6=_0x555f1c;this[_0x2875b6(0x1c8)]>0x0&&(this['_anchor']['x']=this[_0x2875b6(0xfb)](this[_0x2875b6(0x551)]['x'],this[_0x2875b6(0x137)]['x']),this['_anchor']['y']=this[_0x2875b6(0xfb)](this['_anchor']['y'],this[_0x2875b6(0x137)]['y']));},Game_Picture[_0x555f1c(0x54e)][_0x555f1c(0x20f)]=function(_0xefbe1e){const _0x525d09=_0x555f1c;this[_0x525d09(0x551)]=_0xefbe1e,this[_0x525d09(0x137)]=JsonEx[_0x525d09(0x5a7)](this[_0x525d09(0x551)]);},Game_Picture['prototype'][_0x555f1c(0x3f9)]=function(_0xd0c5f){this['_targetAnchor']=_0xd0c5f;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6b6)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture['prototype'][_0x555f1c(0x609)]=function(){const _0x339b05=_0x555f1c,_0x67e09c=this[_0x339b05(0x7ca)]();!_0x67e09c['anchor']()?VisuMZ['CoreEngine']['Sprite_Picture_updateOrigin'][_0x339b05(0x2b0)](this):(this[_0x339b05(0x63c)]['x']=_0x67e09c[_0x339b05(0x63c)]()['x'],this[_0x339b05(0x63c)]['y']=_0x67e09c[_0x339b05(0x63c)]()['y']);},Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x19b)]=function(_0x4262b2){const _0x588ba4=_0x555f1c;if(_0x4262b2){const _0xaa6be3=_0x4262b2[_0x588ba4(0x746)];if(_0xaa6be3===0x1&&this[_0x588ba4(0x5a6)]()[_0x588ba4(0x19e)]()!==0x1)this[_0x588ba4(0x1b0)]();else _0xaa6be3===0x2&&this[_0x588ba4(0x5a6)]()[_0x588ba4(0x21b)]()!==0x2?this[_0x588ba4(0x695)]():this[_0x588ba4(0x7c8)](_0xaa6be3);}else this[_0x588ba4(0x4ba)]();},Game_Actor[_0x555f1c(0x54e)][_0x555f1c(0x81f)]=function(){const _0x306596=_0x555f1c;return this['skills']()[_0x306596(0x3b5)](_0x5ecf36=>this['canUse'](_0x5ecf36)&&this[_0x306596(0x4e8)]()[_0x306596(0x484)](_0x5ecf36[_0x306596(0x7bd)]));},Window_Base['prototype']['createDimmerSprite']=function(){const _0x3a3c78=_0x555f1c;this[_0x3a3c78(0x68a)]=new Sprite(),this['_dimmerSprite'][_0x3a3c78(0x4c8)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x3a3c78(0x376)](this[_0x3a3c78(0x68a)]);},Window_Base[_0x555f1c(0x54e)][_0x555f1c(0x493)]=function(){const _0xa85cbf=_0x555f1c;if(this[_0xa85cbf(0x68a)]){const _0x3573d2=this[_0xa85cbf(0x68a)][_0xa85cbf(0x4c8)],_0x3ecd84=this[_0xa85cbf(0x83c)],_0x179fee=this[_0xa85cbf(0x63d)],_0x64b871=this[_0xa85cbf(0x60c)],_0x4b82f8=ColorManager[_0xa85cbf(0x230)](),_0x17d4ba=ColorManager[_0xa85cbf(0x7bb)]();_0x3573d2[_0xa85cbf(0x5e0)](_0x3ecd84,_0x179fee),_0x3573d2[_0xa85cbf(0x62b)](0x0,0x0,_0x3ecd84,_0x64b871,_0x17d4ba,_0x4b82f8,!![]),_0x3573d2[_0xa85cbf(0x211)](0x0,_0x64b871,_0x3ecd84,_0x179fee-_0x64b871*0x2,_0x4b82f8),_0x3573d2[_0xa85cbf(0x62b)](0x0,_0x179fee-_0x64b871,_0x3ecd84,_0x64b871,_0x4b82f8,_0x17d4ba,!![]),this[_0xa85cbf(0x68a)][_0xa85cbf(0x120)](0x0,0x0,_0x3ecd84,_0x179fee);}},Game_Actor['prototype'][_0x555f1c(0x475)]=function(){const _0x129626=_0x555f1c;for(let _0x369319=0x0;_0x369319<this[_0x129626(0x547)]();_0x369319++){const _0x461936=this[_0x129626(0x7d1)]();let _0x523a46=Number[_0x129626(0x119)];this[_0x129626(0x3f7)](_0x369319,_0x461936[0x0]);for(const _0x5c99b3 of _0x461936){const _0x535138=_0x5c99b3['evaluate']();_0x535138>_0x523a46&&(_0x523a46=_0x535138,this[_0x129626(0x3f7)](_0x369319,_0x5c99b3));}}this['setActionState'](_0x129626(0x585));},Window_BattleItem[_0x555f1c(0x54e)][_0x555f1c(0x532)]=function(_0x3dd810){const _0x5855f=_0x555f1c;return BattleManager[_0x5855f(0x85c)]()?BattleManager[_0x5855f(0x85c)]()[_0x5855f(0x2b5)](_0x3dd810):Window_ItemList[_0x5855f(0x54e)][_0x5855f(0x532)][_0x5855f(0x2b0)](this,_0x3dd810);},VisuMZ[_0x555f1c(0x5c5)]['Scene_Map_createSpritesetFix']=Scene_Map[_0x555f1c(0x54e)]['createSpriteset'],Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x4c4)]=function(){const _0x3782ee=_0x555f1c;VisuMZ[_0x3782ee(0x5c5)][_0x3782ee(0x3a2)]['call'](this);const _0x420373=this['_spriteset']['_timerSprite'];if(_0x420373)this[_0x3782ee(0x463)](_0x420373);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x139)]=Scene_Battle[_0x555f1c(0x54e)][_0x555f1c(0x4c4)],Scene_Battle[_0x555f1c(0x54e)][_0x555f1c(0x4c4)]=function(){const _0x2c36ae=_0x555f1c;VisuMZ['CoreEngine'][_0x2c36ae(0x139)]['call'](this);const _0x39428c=this[_0x2c36ae(0x723)]['_timerSprite'];if(_0x39428c)this[_0x2c36ae(0x463)](_0x39428c);},Sprite_Actor[_0x555f1c(0x54e)][_0x555f1c(0x202)]=function(){const _0x35ae2d=_0x555f1c;Sprite_Battler[_0x35ae2d(0x54e)]['update'][_0x35ae2d(0x2b0)](this),this['updateShadow']();if(this[_0x35ae2d(0x712)])this[_0x35ae2d(0x5f5)]();else this[_0x35ae2d(0x322)]!==''&&(this[_0x35ae2d(0x322)]='');},Window['prototype']['_refreshArrows']=function(){const _0x468c6b=_0x555f1c,_0x9d7eff=this[_0x468c6b(0x4c5)],_0x1944a3=this[_0x468c6b(0x78b)],_0x53817f=0x18,_0x56ba6e=_0x53817f/0x2,_0x39c8d1=0x60+_0x53817f,_0x854cde=0x0+_0x53817f;this[_0x468c6b(0x4bf)][_0x468c6b(0x4c8)]=this[_0x468c6b(0x67b)],this[_0x468c6b(0x4bf)][_0x468c6b(0x63c)]['x']=0.5,this['_downArrowSprite'][_0x468c6b(0x63c)]['y']=0.5,this[_0x468c6b(0x4bf)][_0x468c6b(0x120)](_0x39c8d1+_0x56ba6e,_0x854cde+_0x56ba6e+_0x53817f,_0x53817f,_0x56ba6e),this['_downArrowSprite'][_0x468c6b(0x25f)](Math[_0x468c6b(0x647)](_0x9d7eff/0x2),Math['round'](_0x1944a3-_0x56ba6e)),this[_0x468c6b(0x7ea)][_0x468c6b(0x4c8)]=this['_windowskin'],this[_0x468c6b(0x7ea)][_0x468c6b(0x63c)]['x']=0.5,this[_0x468c6b(0x7ea)][_0x468c6b(0x63c)]['y']=0.5,this[_0x468c6b(0x7ea)][_0x468c6b(0x120)](_0x39c8d1+_0x56ba6e,_0x854cde,_0x53817f,_0x56ba6e),this[_0x468c6b(0x7ea)][_0x468c6b(0x25f)](Math[_0x468c6b(0x647)](_0x9d7eff/0x2),Math[_0x468c6b(0x647)](_0x56ba6e));},Window[_0x555f1c(0x54e)][_0x555f1c(0x478)]=function(){const _0x3bd18d=_0x555f1c,_0x5a9c77=0x90,_0xf6ec21=0x60,_0x5bf7eb=0x18;this[_0x3bd18d(0x1ed)]['bitmap']=this[_0x3bd18d(0x67b)],this['_pauseSignSprite'][_0x3bd18d(0x63c)]['x']=0.5,this[_0x3bd18d(0x1ed)][_0x3bd18d(0x63c)]['y']=0x1,this[_0x3bd18d(0x1ed)][_0x3bd18d(0x25f)](Math['round'](this['_width']/0x2),this['_height']),this[_0x3bd18d(0x1ed)][_0x3bd18d(0x120)](_0x5a9c77,_0xf6ec21,_0x5bf7eb,_0x5bf7eb),this[_0x3bd18d(0x1ed)][_0x3bd18d(0x789)]=0xff;},Window['prototype'][_0x555f1c(0x4c6)]=function(){const _0x4dd7ff=_0x555f1c,_0x21d09d=this[_0x4dd7ff(0x732)][_0x4dd7ff(0x7fe)][_0x4dd7ff(0x662)](new Point(0x0,0x0)),_0x52584d=this[_0x4dd7ff(0x732)][_0x4dd7ff(0x2cc)];_0x52584d['x']=_0x21d09d['x']+this[_0x4dd7ff(0x2ee)]['x'],_0x52584d['y']=_0x21d09d['y']+this[_0x4dd7ff(0x2ee)]['y'],_0x52584d[_0x4dd7ff(0x83c)]=Math['ceil'](this['innerWidth']*this['scale']['x']),_0x52584d[_0x4dd7ff(0x63d)]=Math[_0x4dd7ff(0x337)](this[_0x4dd7ff(0x3e1)]*this[_0x4dd7ff(0x782)]['y']);},VisuMZ['CoreEngine']['Window_refreshBack']=Window[_0x555f1c(0x54e)][_0x555f1c(0x68b)],Window[_0x555f1c(0x54e)][_0x555f1c(0x68b)]=function(){const _0x41720b=_0x555f1c,_0x2350a3=VisuMZ[_0x41720b(0x5c5)][_0x41720b(0x51b)][_0x41720b(0x2f5)][_0x41720b(0x14e)]??!![];if(!_0x2350a3)return VisuMZ[_0x41720b(0x5c5)][_0x41720b(0x38c)][_0x41720b(0x2b0)](this);const _0x4ae614=this['_margin'],_0x25aa5d=Math[_0x41720b(0x4d6)](0x0,this[_0x41720b(0x4c5)]-_0x4ae614*0x2),_0x53e47a=Math[_0x41720b(0x4d6)](0x0,this[_0x41720b(0x78b)]-_0x4ae614*0x2),_0x224bec=this[_0x41720b(0x6b1)],_0x1efd6f=_0x224bec[_0x41720b(0x6c1)][0x0];_0x224bec[_0x41720b(0x4c8)]=this[_0x41720b(0x67b)],_0x224bec[_0x41720b(0x120)](0x0,0x0,0x60,0x60),_0x224bec['move'](_0x4ae614,_0x4ae614),_0x224bec[_0x41720b(0x782)]['x']=_0x25aa5d/0x60,_0x224bec[_0x41720b(0x782)]['y']=_0x53e47a/0x60,_0x1efd6f[_0x41720b(0x4c8)]=this[_0x41720b(0x67b)],_0x1efd6f[_0x41720b(0x120)](0x0,0x60,0x60,0x60),_0x1efd6f[_0x41720b(0x25f)](0x0,0x0,_0x25aa5d,_0x53e47a),_0x1efd6f[_0x41720b(0x782)]['x']=0x1/_0x224bec['scale']['x'],_0x1efd6f[_0x41720b(0x782)]['y']=0x1/_0x224bec[_0x41720b(0x782)]['y'],_0x224bec[_0x41720b(0x521)](this[_0x41720b(0x87f)]);},Game_Temp[_0x555f1c(0x54e)][_0x555f1c(0x136)]=function(){const _0x4c8404=_0x555f1c;this[_0x4c8404(0x5d8)]=[],this[_0x4c8404(0x467)]=[],this[_0x4c8404(0x66e)]=[],this[_0x4c8404(0x108)]=[];},VisuMZ['CoreEngine']['Scene_Base_terminateAnimationClearBugFix']=Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x10f)],Scene_Base[_0x555f1c(0x54e)][_0x555f1c(0x10f)]=function(){const _0x6bc7a2=_0x555f1c;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x6bc7a2(0x5c5)][_0x6bc7a2(0x60f)][_0x6bc7a2(0x2b0)](this);},Bitmap[_0x555f1c(0x54e)]['measureTextWidthNoRounding']=function(_0x395d15){const _0xbe91d2=_0x555f1c,_0x4a0146=this['context'];_0x4a0146[_0xbe91d2(0xf5)](),_0x4a0146[_0xbe91d2(0x6c7)]=this[_0xbe91d2(0x424)]();const _0x10ce87=_0x4a0146[_0xbe91d2(0xff)](_0x395d15)[_0xbe91d2(0x83c)];return _0x4a0146[_0xbe91d2(0x4b6)](),_0x10ce87;},Window_Message[_0x555f1c(0x54e)][_0x555f1c(0x316)]=function(_0x1376a0){const _0x466edf=_0x555f1c;return this[_0x466edf(0x5d0)]()?this[_0x466edf(0x4bc)][_0x466edf(0x743)](_0x1376a0):Window_Base[_0x466edf(0x54e)][_0x466edf(0x316)][_0x466edf(0x2b0)](this,_0x1376a0);},Window_Message[_0x555f1c(0x54e)]['useFontWidthFix']=function(){const _0x255334=_0x555f1c;return VisuMZ[_0x255334(0x5c5)]['Settings']['QoL']['FontWidthFix']??!![];},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x368)]=Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x17b)],Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x17b)]=function(){const _0x3b0846=_0x555f1c;return this[_0x3b0846(0x3c7)]()?VisuMZ['CoreEngine'][_0x3b0846(0x368)][_0x3b0846(0x2b0)](this):0x0;},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x4f6)]=Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x1b0)],Game_Action[_0x555f1c(0x54e)][_0x555f1c(0x1b0)]=function(){const _0x2af8b9=_0x555f1c;if(this[_0x2af8b9(0x5a6)]()&&this[_0x2af8b9(0x5a6)]()['canAttack']())VisuMZ[_0x2af8b9(0x5c5)]['Game_Action_setAttack'][_0x2af8b9(0x2b0)](this);else BattleManager[_0x2af8b9(0x34f)]?VisuMZ[_0x2af8b9(0x5c5)][_0x2af8b9(0x4f6)]['call'](this):this[_0x2af8b9(0x4ba)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x61e)]=BattleManager[_0x555f1c(0x8dc)],BattleManager['invokeCounterAttack']=function(_0xce9604,_0x1235b9){const _0xca0705=_0x555f1c;this[_0xca0705(0x34f)]=!![],VisuMZ[_0xca0705(0x5c5)][_0xca0705(0x61e)][_0xca0705(0x2b0)](this,_0xce9604,_0x1235b9),this[_0xca0705(0x34f)]=undefined;},Sprite_Name['prototype'][_0x555f1c(0x132)]=function(){return 0x24;},Sprite_Name['prototype'][_0x555f1c(0x7e4)]=function(){const _0x4c1971=_0x555f1c,_0x515c38=this[_0x4c1971(0x381)](),_0x5e8016=this[_0x4c1971(0x860)](),_0x577e10=this['bitmapHeight']();this['setupFont'](),this[_0x4c1971(0x4c8)][_0x4c1971(0x4ba)](),this[_0x4c1971(0x4c8)][_0x4c1971(0x30d)](_0x515c38,0x4,0x0,_0x5e8016-0xa,_0x577e10,_0x4c1971(0x32d));},Bitmap[_0x555f1c(0x54e)]['drawTextTopAligned']=function(_0xf1f68,_0x1911b6,_0x16273f,_0x1a7a6a,_0x6cdef,_0x2627c0){const _0x3f2d0a=_0x555f1c,_0x4a3798=this['context'],_0x7b2329=_0x4a3798[_0x3f2d0a(0x47a)];_0x1a7a6a=_0x1a7a6a||0xffffffff;let _0x34631b=_0x1911b6,_0x58d187=Math[_0x3f2d0a(0x647)](_0x16273f+0x18/0x2+this['fontSize']*0.35);_0x2627c0===_0x3f2d0a(0x14c)&&(_0x34631b+=_0x1a7a6a/0x2),_0x2627c0===_0x3f2d0a(0x2d9)&&(_0x34631b+=_0x1a7a6a),_0x4a3798[_0x3f2d0a(0xf5)](),_0x4a3798['font']=this[_0x3f2d0a(0x424)](),_0x4a3798[_0x3f2d0a(0x4d9)]=_0x2627c0,_0x4a3798[_0x3f2d0a(0x5de)]=_0x3f2d0a(0x44b),_0x4a3798[_0x3f2d0a(0x47a)]=0x1,this[_0x3f2d0a(0x850)](_0xf1f68,_0x34631b,_0x58d187,_0x1a7a6a),_0x4a3798[_0x3f2d0a(0x47a)]=_0x7b2329,this[_0x3f2d0a(0x147)](_0xf1f68,_0x34631b,_0x58d187,_0x1a7a6a),_0x4a3798[_0x3f2d0a(0x4b6)](),this[_0x3f2d0a(0x18c)][_0x3f2d0a(0x202)]();},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x6c3)]=BattleManager['checkSubstitute'],BattleManager[_0x555f1c(0x749)]=function(_0x5e543d){const _0x1bd301=_0x555f1c;if(this['_action'][_0x1bd301(0x21f)]())return![];return VisuMZ[_0x1bd301(0x5c5)][_0x1bd301(0x6c3)]['call'](this,_0x5e543d);},BattleManager[_0x555f1c(0x315)]=function(){const _0x4728a2=_0x555f1c;if(this[_0x4728a2(0x845)])this[_0x4728a2(0x429)]['endAction'](this[_0x4728a2(0x845)]);this['_phase']='turn',this['_subject']&&this[_0x4728a2(0x845)][_0x4728a2(0x547)]()===0x0&&(this[_0x4728a2(0x5d5)](this[_0x4728a2(0x845)]),this['_subject']=null);},Bitmap[_0x555f1c(0x54e)][_0x555f1c(0x16b)]=function(){const _0x32ef07=_0x555f1c;this[_0x32ef07(0x645)]=new Image(),this[_0x32ef07(0x645)][_0x32ef07(0x496)]=this[_0x32ef07(0x3ee)][_0x32ef07(0x41d)](this),this['_image']['onerror']=this[_0x32ef07(0x314)][_0x32ef07(0x41d)](this),this[_0x32ef07(0x73e)](),this['_loadingState']=_0x32ef07(0x309),Utils[_0x32ef07(0x6aa)]()?this[_0x32ef07(0x4de)]():(this[_0x32ef07(0x645)][_0x32ef07(0x40d)]=this[_0x32ef07(0x271)],![]&&this['_image']['width']>0x0&&(this['_image']['onload']=null,this['_onLoad']()));},Scene_Skill['prototype']['onActorChange']=function(){const _0x59e925=_0x555f1c;Scene_MenuBase['prototype'][_0x59e925(0x7eb)][_0x59e925(0x2b0)](this),this['refreshActor'](),this[_0x59e925(0x327)][_0x59e925(0x2eb)](),this[_0x59e925(0x327)]['deselect'](),this['_skillTypeWindow'][_0x59e925(0x714)]();},Scene_Skill['prototype'][_0x555f1c(0x6e5)]=function(){const _0x23dfb7=_0x555f1c;return this[_0x23dfb7(0x1a8)]&&this[_0x23dfb7(0x1a8)][_0x23dfb7(0x81c)];},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x5e8)]=function(_0x5bdb22,_0x32a89b,_0x4d0a6c){const _0x14eb88=_0x555f1c,_0x6e6a5e=this[_0x14eb88(0x2c4)](),_0x673c32=this['allTiles'](_0x5bdb22,_0x32a89b);for(const _0x227106 of _0x673c32){const _0xf5bff3=_0x6e6a5e[_0x227106];if(_0xf5bff3===undefined||_0xf5bff3===null){if($gameTemp[_0x14eb88(0x6d5)]()&&!DataManager[_0x14eb88(0x1ce)]()){let _0x2e25c8='Current\x20tileset\x20has\x20incomplete\x20flag\x20data.'+'\x0a';_0x2e25c8+=_0x14eb88(0x154)+'\x0a',_0x2e25c8+=_0x14eb88(0x34d);if(this[_0x14eb88(0x47b)]())alert(_0x2e25c8),SceneManager[_0x14eb88(0x447)]();else{if(!this[_0x14eb88(0x658)])console[_0x14eb88(0x4d7)](_0x2e25c8);this[_0x14eb88(0x658)]=!![];}}}if((_0xf5bff3&0x10)!==0x0)continue;if((_0xf5bff3&_0x4d0a6c)===0x0)return!![];if((_0xf5bff3&_0x4d0a6c)===_0x4d0a6c)return![];}return![];},Game_Map[_0x555f1c(0x54e)][_0x555f1c(0x47b)]=function(){const _0x2f849a=_0x555f1c;if(Imported[_0x2f849a(0x8a3)])return!![];if(Imported[_0x2f849a(0x3c3)])return!![];return![];},Sprite_Animation[_0x555f1c(0x54e)]['saveViewport']=function(_0x2b5db1){const _0xbb0278=_0x555f1c;!this[_0xbb0278(0x509)]&&(this['_originalViewport']=_0x2b5db1['gl'][_0xbb0278(0x5a3)](_0x2b5db1['gl'][_0xbb0278(0x6e0)]));},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x765)]=Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x7ad)],Scene_Map[_0x555f1c(0x54e)][_0x555f1c(0x7ad)]=function(){const _0x1b5800=_0x555f1c,_0x268396=SceneManager[_0x1b5800(0x63e)][_0x1b5800(0x381)];if([_0x1b5800(0x2dc),_0x1b5800(0x87b),'Scene_TitleTransition',_0x1b5800(0x240)]['includes'](_0x268396))return![];return VisuMZ[_0x1b5800(0x5c5)]['Scene_Map_shouldAutosave'][_0x1b5800(0x2b0)](this);},VisuMZ[_0x555f1c(0x5c5)][_0x555f1c(0x5a5)]=Window_SkillList[_0x555f1c(0x54e)][_0x555f1c(0x484)],Window_SkillList[_0x555f1c(0x54e)][_0x555f1c(0x484)]=function(_0x2eaae8){const _0x33dd90=_0x555f1c;if(this[_0x33dd90(0x3b0)]<=0x0)return![];return VisuMZ[_0x33dd90(0x5c5)][_0x33dd90(0x5a5)][_0x33dd90(0x2b0)](this,_0x2eaae8);};