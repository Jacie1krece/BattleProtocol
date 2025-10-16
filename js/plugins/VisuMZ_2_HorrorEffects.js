//=============================================================================
// VisuStella MZ - Horror Effects
// VisuMZ_2_HorrorEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_HorrorEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.HorrorEffects = VisuMZ.HorrorEffects || {};
VisuMZ.HorrorEffects.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [HorrorEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Horror_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * This is a plugin for RPG Maker MZ that will allow you to add visual horror
 * effects to your game's title screen, maps, events, pictures, battle, etc.
 * You can turn on individual effects at a time or multiple simultaneously. The
 * effects include a noise effect, a glitch effect, and a TV effect, which is
 * commonly seen used in most horror films. Now, you can use these effects in
 * RPG Maker MZ, too!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A noise effect filter which creates specks of dots on the screen that
 *   can obscure it at various intensity rates.
 * * A glitch effect that will cause the screen to tear at custom intervals of
 *   varying frequency and strength.
 * * A TV effect that imitates the display of a cathode ray tube television
 *   with animated lines that travel across the screen at a determined speed.
 * * Apply these effects to the map screen, battle screen, title screen, and/or
 *   various entities on the screen such as events, pictures, actors, and
 *   enemies.
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
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Noise
 * 
 * The noise effect will cause specks of light that obscure the image the
 * filter is applied to. The intensity rate of the noise will make the image
 * more obscure and harder to see.
 *
 * ---
 *
 * Glitch
 * 
 * The glitch effect will cause bits of the screen to break up into various
 * pieces. These can be tied to a frequency and strength level that can control
 * how often the glitch effect occurs on screen.
 *
 * ---
 *
 * TV
 * 
 * This will create TV lines akin to a cathode ray tube television. The lines
 * will move vertically across the screen. These lines can have their thickness
 * levels changed and the speed at which the lines travel can also be altered.
 *
 * ---
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
 * VisuMZ_1_BattleCore
 *
 * The Horror Effects will also be available as Action Sequences in the
 * Battle Core's Action Sequence Plugin Commands. The Horror Action Sequences
 * will make use of the Battle Core's targeting system for more accurate
 * control over who and what to apply the Horror Effects for.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * As of the VisuStella MZ Options Core v1.10 update, both the Bright Effects
 * and Horror Effects plugins will be affected by the "Special Effects" option
 * found under the Options Core's General Settings. If the "Special Effects"
 * option is set to OFF, then the filter effects applied by those plugins will
 * also be disabled. They will be reenabled when the option is set back to ON.
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
 * === Battle Plugin Commands ===
 * 
 * ---
 *
 * Battle: Clear All Filters
 * - Clear all Horror Effects filters on the main battle screen.
 *
 * ---
 * 
 * Battle: Color Effect Create
 * - Creates the color effect on the main battle screen.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Battle: Color Effect Remove
 * - Removes the color effect on the main battle screen.
 * 
 * ---
 *
 * Battle: Glitch Create
 * - Creates the glitch effect on the main battle screen.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Battle: Glitch Remove
 * - Removes the glitch effect on the main battle screen.
 *
 * ---
 *
 * Battle: Noise Create
 * - Creates the noise effect on the main battle screen.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Battle: Noise Remove
 * - Removes the noise effect on the main battle screen.
 *
 * ---
 *
 * Battle: TV Create
 * - Creates the TV effect on the main battle screen.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Battle: TV Remove
 * - Removes the TV effect on the main battle screen.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 *
 * Map: Clear All Filters
 * - Clear all Horror Effects filters on the main map screen.
 *
 * ---
 * 
 * Map: Color Effect Create
 * - Creates the color effect on the main map screen.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Map: Color Effect Remove
 * - Removes the color effect on the main map screen.
 * 
 * ---
 *
 * Map: Glitch Create
 * - Creates the glitch effect on the main map screen.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Map: Glitch Remove
 * - Removes the glitch effect on the main map screen.
 *
 * ---
 *
 * Map: Noise Create
 * - Creates the noise effect on the main battle screen.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Map: Noise Remove
 * - Removes the noise effect on the main map screen.
 *
 * ---
 *
 * Map: TV Create
 * - Creates the TV effect on the main map screen.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Map: TV Remove
 * - Removes the TV effect on the main map screen.
 *
 * ---
 * 
 * === Event Plugin Commands ===
 * 
 * ---
 *
 * Event: Clear All Filters
 * - Clear all Horror Effects filters on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to clear horror effects from.
 *   - Use "0" for "this" event.
 *
 * ---
 * 
 * Event: Color Effect Create
 * - Creates the color effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Event: Color Effect Remove
 * - Removes the color effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 * 
 * ---
 *
 * Event: Glitch Create
 * - Creates the glitch effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Event: Glitch Remove
 * - Removes the glitch effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: Noise Create
 * - Creates the noise effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Event: Noise Remove
 * - Removes the noise effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 *
 * Event: TV Create
 * - Creates the TV effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to create the horror effects for.
 *   - Use "0" for "this" event.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Event: TV Remove
 * - Removes the TV effect on the target event(s).
 * 
 *   Event ID(s):
 *   - The ID of the event to the horror effect from.
 *   - Use "0" for "this" event.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Clear All Filters
 * - Clear all Horror Effects filters on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to clear horror effects from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 * 
 * Picture: Color Effect Create
 * - Creates the color effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Picture: Color Effect Remove
 * - Removes the color effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 * 
 * ---
 *
 * Picture: Glitch Create
 * - Creates the glitch effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Picture: Glitch Remove
 * - Removes the glitch effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: Noise Create
 * - Creates the noise effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Picture: Noise Remove
 * - Removes the noise effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 *
 * Picture: TV Create
 * - Creates the TV effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to create the horror effects for.
 *   - The ID is a number from 1 to 100.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Picture: TV Remove
 * - Removes the TV effect on the target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID of the picture to the horror effect from.
 *   - The ID is a number from 1 to 100.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Clear All Filters
 * - Clear all Horror Effects filters on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to clear horror effects from.
 *
 * ---
 * 
 * Actor: Color Effect Create
 * - Creates the color effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Actor: Color Effect Remove
 * - Removes the color effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 * 
 * ---
 *
 * Actor: Glitch Create
 * - Creates the glitch effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Actor: Glitch Remove
 * - Removes the glitch effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 *
 * Actor: Noise Create
 * - Creates the noise effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Actor: Noise Remove
 * - Removes the noise effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 *
 * Actor: TV Create
 * - Creates the TV effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to create the horror effects for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Actor: TV Remove
 * - Removes the TV effect on the target actor(s).
 * 
 *   Actor ID(s):
 *   - The ID of the actor to the horror effect from.
 *
 * ---
 * 
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Clear All Filters
 * - Clear all Horror Effects filters on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to clear horror effects from.
 *   - Index values start at 0.
 *
 * ---
 * 
 * Party: Color Effect Create
 * - Creates the color effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Party: Color Effect Remove
 * - Removes the color effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 * 
 * ---
 *
 * Party: Glitch Create
 * - Creates the glitch effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Party: Glitch Remove
 * - Removes the glitch effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: Noise Create
 * - Creates the noise effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Party: Noise Remove
 * - Removes the noise effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Party: TV Create
 * - Creates the TV effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Party: TV Remove
 * - Removes the TV effect on the target party member(s).
 * 
 *   Party ID(s):
 *   - The index of the party member to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Clear All Filters
 * - Clear all Horror Effects filters on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 * ---
 * 
 * Enemy: Color Effect Create
 * - Creates the color effect on the target enemy(ies).
 * 
 *   Party ID(s):
 *   - The index of the party member to create the horror effects for.
 *   - Index values start at 0.
 * 
 *   Type:
 *   - Select the Color Effect type.
 *   - Normal, Bizarro, BlackAndWhite, Browni, Desaturate, Greyscale,
 *     Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *     and Vintage
 * 
 * ---
 * 
 * Enemy: Color Effect Remove
 * - Removes the color effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 * 
 * ---
 *
 * Enemy: Glitch Create
 * - Creates the glitch effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * Enemy: Glitch Remove
 * - Removes the glitch effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: Noise Create
 * - Creates the noise effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Enemy: Noise Remove
 * - Removes the noise effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * Enemy: TV Create
 * - Creates the TV effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to create the horror effects for.
 *   - Index values start at 0.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * Enemy: TV Remove
 * - Removes the TV effect on the target enemy(ies).
 * 
 *   Enemy ID(s):
 *   - The index of the enemy to the horror effect from.
 *   - Index values start at 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Image Settings
 * ============================================================================
 *
 * These settings will allow you to apply Horror Effects to each of the title
 * images that you can set in Database > System 1 > Title Screen Images.
 * The settings for each of them can be applied differently from one another,
 * You can apply any of the Noise, Glitch, and/or TV effects.
 *
 * ---
 *
 * Noise
 * 
 *   Noise Effect?:
 *   - Apply the target with a noise effect?
 * 
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 * 
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * Glitch
 * 
 *   Glitch Effect?:
 *   - Apply the target with a glitch effect?
 * 
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 * 
 *   Glitch Offset:
 *   - Default offset value.
 * 
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 * 
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 * 
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * TV Lines
 * 
 *   TV Effect?:
 *   - Apply the target with a TV effect?
 * 
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 * 
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 * 
 *   TV Animated:
 *   - Animate the TV?
 * 
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
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
 * Version 1.05: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * 
 * Version 1.04: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where some horror effects would reset upon leaving the screen
 *    and/or exiting the menu. Fix made by Olivia.
 * 
 * Version 1.03: October 17, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: October 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Irina and sponsored by Archeia:
 * *** Color Effect
 * **** Color effects allow for manipulation of color effects to produce horror
 *      esque effects that are otherwise unavailable or troublesome to
 *      replicate with vanilla RPG Maker MZ.
 * **** Includes: Bizarro, Black and White, Browni, Desaturate, Greyscale,
 *      Kodachrome, LSD, Negative, Polaroid, Predator, Sepia, Technicolor,
 *      and Vintage.
 * **** Available as Plugin Commands for Battle, Map, Event, Picture, Actors,
 *      Party Members, and Enemies.
 * 
 * Version 1.01: March 12, 2021
 * * Compatibility Update!
 * ** Added compatibility with the VisuStella MZ Options Core v1.10 update.
 * *** When the "Special Effects" option is set to OFF, the filters for this
 *     plugin will be shut off. They will be returned to normal when set to ON.
 * * Documentation Update!
 * ** Added the Options Core section to the "Extra Features" list.
 *
 * Version 1.00: December 7, 2020
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
 * @command BattleClear
 * @text Battle: Clear All Filters
 * @desc Clear all Horror Effects filters on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleColorCreate
 * @text Battle: Color Effect Create
 * @desc Creates the color effect on the main battle screen.
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleColorRemove
 * @text Battle: Color Effect Remove
 * @desc Removes the color effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleGlitchCreate
 * @text Battle: Glitch Create
 * @desc Creates the glitch effect on the main battle screen.
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleGlitchRemove
 * @text Battle: Glitch Remove
 * @desc Removes the glitch effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleNoiseCreate
 * @text Battle: Noise Create
 * @desc Creates the noise effect on the main battle screen.
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleNoiseRemove
 * @text Battle: Noise Remove
 * @desc Removes the noise effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTVCreate
 * @text Battle: TV Create
 * @desc Creates the TV effect on the main battle screen.
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTVRemove
 * @text Battle: TV Remove
 * @desc Removes the TV effect on the main battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapClear
 * @text Map: Clear All Filters
 * @desc Clear all Horror Effects filters on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapColorCreate
 * @text Map: Color Effect Create
 * @desc Creates the color effect on the main map screen.
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapColorRemove
 * @text Map: Color Effect Remove
 * @desc Removes the color effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapGlitchCreate
 * @text Map: Glitch Create
 * @desc Creates the glitch effect on the main map screen.
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapGlitchRemove
 * @text Map: Glitch Remove
 * @desc Removes the glitch effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapNoiseCreate
 * @text Map: Noise Create
 * @desc Creates the noise effect on the main map screen.
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapNoiseRemove
 * @text Map: Noise Remove
 * @desc Removes the noise effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapTVCreate
 * @text Map: TV Create
 * @desc Creates the TV effect on the main map screen.
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapTVRemove
 * @text Map: TV Remove
 * @desc Removes the TV effect on the main map screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Event
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventClear
 * @text Event: Clear All Filters
 * @desc Clear all Horror Effects filters on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to clear horror effects from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventColorCreate
 * @text Event: Color Effect Create
 * @desc Creates the color effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventColorRemove
 * @text Event: Color Effect Remove
 * @desc Removes the color effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventGlitchCreate
 * @text Event: Glitch Create
 * @desc Creates the glitch effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventGlitchRemove
 * @text Event: Glitch Remove
 * @desc Removes the glitch effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventNoiseCreate
 * @text Event: Noise Create
 * @desc Creates the noise effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventNoiseRemove
 * @text Event: Noise Remove
 * @desc Removes the noise effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTVCreate
 * @text Event: TV Create
 * @desc Creates the TV effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to create the horror effects for.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTVRemove
 * @text Event: TV Remove
 * @desc Removes the TV effect on the target event(s).
 *
 * @arg EventId:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc The ID of the event to remove this horror effect from.
 * Use "0" for "this" event.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureClear
 * @text Picture: Clear All Filters
 * @desc Clear all Horror Effects filters on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to clear horror effects from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureColorCreate
 * @text Picture: Color Effect Create
 * @desc Creates the color effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureColorRemove
 * @text Picture: Color Effect Remove
 * @desc Removes the color effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureGlitchCreate
 * @text Picture: Glitch Create
 * @desc Creates the glitch effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureGlitchRemove
 * @text Picture: Glitch Remove
 * @desc Removes the glitch effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureNoiseCreate
 * @text Picture: Noise Create
 * @desc Creates the noise effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureNoiseRemove
 * @text Picture: Noise Remove
 * @desc Removes the noise effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTVCreate
 * @text Picture: TV Create
 * @desc Creates the TV effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to create the horror effects for.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTVRemove
 * @text Picture: TV Remove
 * @desc Removes the TV effect on the target picture(s).
 *
 * @arg PictureId:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID of the picture to remove this horror effect from.
 * The ID is a number from 1 to 100.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Actor
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorClear
 * @text Actor: Clear All Filters
 * @desc Clear all Horror Effects filters on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to clear horror effects from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorColorCreate
 * @text Actor: Color Effect Create
 * @desc Creates the color effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorColorRemove
 * @text Actor: Color Effect Remove
 * @desc Removes the color effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlitchCreate
 * @text Actor: Glitch Create
 * @desc Creates the glitch effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlitchRemove
 * @text Actor: Glitch Remove
 * @desc Removes the glitch effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorNoiseCreate
 * @text Actor: Noise Create
 * @desc Creates the noise effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorNoiseRemove
 * @text Actor: Noise Remove
 * @desc Removes the noise effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorTVCreate
 * @text Actor: TV Create
 * @desc Creates the TV effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to create the horror effects for.
 * @default ["1"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorTVRemove
 * @text Actor: TV Remove
 * @desc Removes the TV effect on the target actor(s).
 *
 * @arg ActorId:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc The ID of the actor to remove this horror effect from.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Party
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyClear
 * @text Party: Clear All Filters
 * @desc Clear all Horror Effects filters on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to clear horror effects from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyColorCreate
 * @text Party: Color Effect Create
 * @desc Creates the color effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyColorRemove
 * @text Party: Color Effect Remove
 * @desc Removes the color effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyGlitchCreate
 * @text Party: Glitch Create
 * @desc Creates the glitch effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyGlitchRemove
 * @text Party: Glitch Remove
 * @desc Removes the glitch effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyNoiseCreate
 * @text Party: Noise Create
 * @desc Creates the noise effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyNoiseRemove
 * @text Party: Noise Remove
 * @desc Removes the noise effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyTVCreate
 * @text Party: TV Create
 * @desc Creates the TV effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to create the horror effects for. Index values start at 0.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PartyTVRemove
 * @text Party: TV Remove
 * @desc Removes the TV effect on the target party member(s).
 *
 * @arg PartyIndex:arraynum
 * @text Party ID(s)
 * @type number[]
 * @desc The index of the party member to remove this horror effect from. Index values start at 0.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Enemy
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyClear
 * @text Enemy: Clear All Filters
 * @desc Clear all Horror Effects filters on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to clear horror effects from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyColorCreate
 * @text Enemy: Color Effect Create
 * @desc Creates the color effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg type:str
 * @text Effect Type
 * @type combo
 * @option Normal
 * @option Bizarro
 * @option BlackAndWhite
 * @option Browni
 * @option Desaturate
 * @option Greyscale
 * @option Kodachrome
 * @option LSD
 * @option Negative
 * @option Polaroid
 * @option Predator
 * @option Sepia
 * @option Technicolor
 * @option Vintage
 * @desc Select the Color Effect type.
 * @default Normal
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyColorRemove
 * @text Enemy: Color Effect Remove
 * @desc Removes the color effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlitchCreate
 * @text Enemy: Glitch Create
 * @desc Creates the glitch effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlitchRemove
 * @text Enemy: Glitch Remove
 * @desc Removes the glitch effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyNoiseCreate
 * @text Enemy: Noise Create
 * @desc Creates the noise effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyNoiseRemove
 * @text Enemy: Noise Remove
 * @desc Removes the noise effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyTVCreate
 * @text Enemy: TV Create
 * @desc Creates the TV effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to create the horror effects for.
 * @default ["0"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyTVRemove
 * @text Enemy: TV Remove
 * @desc Removes the TV effect on the target enemy(ies).
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy ID(s)
 * @type number[]
 * @max 7
 * @desc The index of the enemy to remove this horror effect from.
 * @default ["0"]
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
 * @param HorrorEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Title1Settings:struct
 * @text Title 1 Settings
 * @type struct<Title>
 * @desc Horror Effect Settings for the Title 1 image.
 * @default {"FilterNoise":"","Noise:eval":"true","NoiseRate:num":"0.3","NoiseAni:eval":"true","FilterGlitch":"","Glitch:eval":"true","GlitchSlices:num":"10","GlitchOffset:num":"100","GlitchAni:eval":"true","GlitchAniFreq:num":"300","GlitchAniStr:num":"30","FilterTV":"","TV:eval":"true","TVLineThickness:num":"5","TVCorner:num":"0.3","TVAni:eval":"true","TVAniSpeed:num":"0.25"}
 *
 * @param Title2Settings:struct
 * @text Title 2 Settings
 * @type struct<Title>
 * @desc Horror Effect Settings for the Title 2 image.
 * @default {"FilterNoise":"","Noise:eval":"true","NoiseRate:num":"0.3","NoiseAni:eval":"true","FilterGlitch":"","Glitch:eval":"true","GlitchSlices:num":"10","GlitchOffset:num":"100","GlitchAni:eval":"true","GlitchAniFreq:num":"300","GlitchAniStr:num":"30","FilterTV":"","TV:eval":"true","TVLineThickness:num":"5","TVCorner:num":"0.3","TVAni:eval":"true","TVAniSpeed:num":"0.25"}
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
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param FilterNoise
 * @text Noise
 *
 * @param Noise:eval
 * @text Noise Effect?
 * @parent FilterNoise
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a noise effect?
 * @default true
 *
 * @param NoiseRate:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @param NoiseAni:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @param FilterGlitch
 * @text Glitch
 *
 * @param Glitch:eval
 * @text Glitch Effect?
 * @parent FilterGlitch
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a glitch effect?
 * @default true
 *
 * @param GlitchSlices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @param GlitchOffset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @param GlitchAni:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @param GlitchAniFreq:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @param GlitchAniStr:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @param FilterTV
 * @text TV Lines
 *
 * @param TV:eval
 * @text TV Effect?
 * @parent FilterTV
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Apply the target with a TV effect?
 * @default true
 *
 * @param TVLineThickness:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @param TVCorner:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @param TVAni:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @param TVAniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 */
//=============================================================================

function _0x469e(_0x390fe5,_0x3aae78){const _0x3f2ccd=_0x3f2c();return _0x469e=function(_0x469ee6,_0x4fbdd0){_0x469ee6=_0x469ee6-0xfa;let _0x336045=_0x3f2ccd[_0x469ee6];return _0x336045;},_0x469e(_0x390fe5,_0x3aae78);}const _0x39e0eb=_0x469e;(function(_0x13ad34,_0x120939){const _0x384d7f=_0x469e,_0x135abb=_0x13ad34();while(!![]){try{const _0x41ea02=-parseInt(_0x384d7f(0x193))/0x1*(-parseInt(_0x384d7f(0x15f))/0x2)+-parseInt(_0x384d7f(0x1bc))/0x3*(parseInt(_0x384d7f(0x1a4))/0x4)+-parseInt(_0x384d7f(0x1e1))/0x5+parseInt(_0x384d7f(0x124))/0x6+parseInt(_0x384d7f(0x197))/0x7+parseInt(_0x384d7f(0x14b))/0x8*(-parseInt(_0x384d7f(0x1ad))/0x9)+parseInt(_0x384d7f(0x17a))/0xa;if(_0x41ea02===_0x120939)break;else _0x135abb['push'](_0x135abb['shift']());}catch(_0x37b3e4){_0x135abb['push'](_0x135abb['shift']());}}}(_0x3f2c,0xb5b4e));var label=_0x39e0eb(0x1ba),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x39e0eb(0x19a)](function(_0x2e1b3c){const _0x19027d=_0x39e0eb;return _0x2e1b3c[_0x19027d(0x177)]&&_0x2e1b3c['description'][_0x19027d(0x100)]('['+label+']');})[0x0];function _0x3f2c(){const _0x4c17ba=['updateBitmap','BattleGlitchCreate','12224286TDsFog','refreshRequest','createBackground','removeHorrorGlitch','setHorrorGlitchAnimated','Game_Picture_erase','ActorClear','reset','refresh','setHorrorEffectSettings','time','type','setHorrorTVAnimated','HorrorEffects','createHorrorTV','6gnBxjv','Game_Picture_initialize','MapClear','MapNoiseRemove','kodachrome','PictureId','browni','setHorrorNoiseAnimated','BattleClear','setLastPluginCommandInterpreter','Settings','updateHorrorTV','_eventId','greyscale','glitch','call','ARRAYFUNC','aniFrequency','registerCommand','Spriteset_Battle_initialize','lastType','toUpperCase','lsd','TVLineThickness','MapGlitchRemove','ActorId','PartyNoiseCreate','ARRAYSTR','makeDeepCopy','specialEffects','ActorGlitchCreate','Game_BattlerBase_initialize','EventTVCreate','lineWidth','clear','_horrorFiltersGlitchSpecial','PictureTVRemove','4038220nEODFw','actor','_lastPluginCommandInterpreter','ColorMatrixFilter','Game_CharacterBase_initMembers','createHorrorGlitch','BattleNoiseRemove','synchronizeHorrorFiltersWithSource','filters','BattleTVRemove','updateHorrorColor','removeHorrorTV','Sprite_update','includes','updateHorrorGlitchEffect','setHorrorTVCornerSize','sliceMax','leader','removeHorrorEffect','members','_backSprite2','EnemyColorCreate','MapTVCreate','GlitchOffset','PictureGlitchCreate','Game_Screen_clear','getLastPluginCommandInterpreter','negative','Title1Settings','EnemyTVCreate','PartyGlitchCreate','trim','EventGlitchCreate','PictureClear','indexOf','picture','CRTFilter','setHorrorEffectToValue','colorFilter','command357','MapGlitchCreate','Filter','EnemyColorRemove','event','name','PictureColorCreate','BattleColorRemove','createHorrorFilter','seed','2254218ElFwkM','_horrorFiltersSource','EventClear','createHorrorEffect','createHorrorNoise','Game_Follower_refresh','ActorNoiseRemove','offset','EnemyIndex','setHorrorNoiseRate','aniStrength','setHorrorGlitchOffset','ActorTVCreate','GlitchFilter','tvFilter','EVAL','description','PartyClear','updateHorrorEffects','desaturate','toLowerCase','PartyGlitchRemove','EnemyNoiseRemove','Sprite_Battler_setBattler','setHorrorTVLineThickness','ActorColorRemove','ActorNoiseCreate','PartyTVCreate','FUNC','Scene_Title_createBackground','updateHorrorNoise','Spriteset_Map_initialize','Game_Player_refresh','TVAniSpeed','EventColorCreate','parse','EventId','ActorTVRemove','GlitchAniFreq','8msKyrD','removeHorrorFilter','glitchFilter','blackandwhite','PartyTVRemove','BattleGlitchRemove','EventNoiseRemove','bizarro','slices','erase','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','color','MapNoiseCreate','animated','EnemyClear','updateHorrorGlitch','predator','vignetting','Noise','ARRAYJSON','4qxoRXi','PictureColorRemove','setHorrorGlitchFrequency','_horrorFilters','match','aniSpeed','BattleNoiseCreate','setHorrorGlitchStrength','noise','Sprite_Character_initialize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ceil','TVAni','max','EventTVRemove','format','removeHorrorNoise','PictureNoiseCreate','Glitch','STR','NUM','Title2Settings','BattleTVCreate','initMembers','status','NoiseRate','PictureGlitchRemove','14646870YlscLu','blackAndWhite','JSON','noiseFilter','setHorrorGlitchSlices','polaroid','prototype','PictureNoiseRemove','BattleColorCreate','randomInt','initialize','needUpdate','PictureTVCreate','EnemyGlitchCreate','Game_Interpreter_PluginCommand','setHorrorTVSpeed','ConvertParams','EventColorRemove','EnemyNoiseCreate','sepia','update','GlitchSlices','_backSprite1','synchronizeHorrorEffects','sliceMin','341467NXWYAf','clearHorrorEffects','Sprite_initialize','map','3257086PjypUG','RemoveHorrorEffects','Game_System_initialize','filter','technicolor','length','visible','PartyIndex','Sprite_Picture_updateBitmap','NoiseFilter','applyTitleHorrorEffects','NoiseAni','createHorrorColor','156908riOUaO','exit','Sprite_Picture_initialize','TVCorner','EventGlitchRemove','normal','vintage'];_0x3f2c=function(){return _0x4c17ba;};return _0x3f2c();}VisuMZ[label][_0x39e0eb(0x1c6)]=VisuMZ[label][_0x39e0eb(0x1c6)]||{},VisuMZ['ConvertParams']=function(_0x42fa54,_0x389907){const _0x27f900=_0x39e0eb;for(const _0x206c25 in _0x389907){if(_0x206c25[_0x27f900(0x163)](/(.*):(.*)/i)){const _0x1cc451=String(RegExp['$1']),_0x388960=String(RegExp['$2'])[_0x27f900(0x1d1)]()['trim']();let _0x241ce8,_0x28ed82,_0xcdf8eb;switch(_0x388960){case _0x27f900(0x173):_0x241ce8=_0x389907[_0x206c25]!==''?Number(_0x389907[_0x206c25]):0x0;break;case'ARRAYNUM':_0x28ed82=_0x389907[_0x206c25]!==''?JSON[_0x27f900(0x147)](_0x389907[_0x206c25]):[],_0x241ce8=_0x28ed82[_0x27f900(0x196)](_0x2480ab=>Number(_0x2480ab));break;case _0x27f900(0x133):_0x241ce8=_0x389907[_0x206c25]!==''?eval(_0x389907[_0x206c25]):null;break;case'ARRAYEVAL':_0x28ed82=_0x389907[_0x206c25]!==''?JSON['parse'](_0x389907[_0x206c25]):[],_0x241ce8=_0x28ed82[_0x27f900(0x196)](_0x498191=>eval(_0x498191));break;case _0x27f900(0x17c):_0x241ce8=_0x389907[_0x206c25]!==''?JSON[_0x27f900(0x147)](_0x389907[_0x206c25]):'';break;case _0x27f900(0x15e):_0x28ed82=_0x389907[_0x206c25]!==''?JSON[_0x27f900(0x147)](_0x389907[_0x206c25]):[],_0x241ce8=_0x28ed82[_0x27f900(0x196)](_0x42b369=>JSON[_0x27f900(0x147)](_0x42b369));break;case _0x27f900(0x140):_0x241ce8=_0x389907[_0x206c25]!==''?new Function(JSON['parse'](_0x389907[_0x206c25])):new Function('return\x200');break;case _0x27f900(0x1cc):_0x28ed82=_0x389907[_0x206c25]!==''?JSON[_0x27f900(0x147)](_0x389907[_0x206c25]):[],_0x241ce8=_0x28ed82['map'](_0x20e3e7=>new Function(JSON[_0x27f900(0x147)](_0x20e3e7)));break;case _0x27f900(0x172):_0x241ce8=_0x389907[_0x206c25]!==''?String(_0x389907[_0x206c25]):'';break;case _0x27f900(0x1d7):_0x28ed82=_0x389907[_0x206c25]!==''?JSON['parse'](_0x389907[_0x206c25]):[],_0x241ce8=_0x28ed82[_0x27f900(0x196)](_0x3e03ea=>String(_0x3e03ea));break;case'STRUCT':_0xcdf8eb=_0x389907[_0x206c25]!==''?JSON['parse'](_0x389907[_0x206c25]):{},_0x241ce8=VisuMZ['ConvertParams']({},_0xcdf8eb);break;case'ARRAYSTRUCT':_0x28ed82=_0x389907[_0x206c25]!==''?JSON[_0x27f900(0x147)](_0x389907[_0x206c25]):[],_0x241ce8=_0x28ed82['map'](_0x135e17=>VisuMZ['ConvertParams']({},JSON[_0x27f900(0x147)](_0x135e17)));break;default:continue;}_0x42fa54[_0x1cc451]=_0x241ce8;}}return _0x42fa54;},(_0x50ed26=>{const _0x30fa39=_0x39e0eb,_0x3e03a8=_0x50ed26['name'];for(const _0x3eba6f of dependencies){if(!Imported[_0x3eba6f]){alert(_0x30fa39(0x155)[_0x30fa39(0x16e)](_0x3e03a8,_0x3eba6f)),SceneManager[_0x30fa39(0x1a5)]();break;}}const _0x7a7274=_0x50ed26[_0x30fa39(0x134)];if(_0x7a7274['match'](/\[Version[ ](.*?)\]/i)){const _0x382893=Number(RegExp['$1']);_0x382893!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x30fa39(0x16e)](_0x3e03a8,_0x382893)),SceneManager['exit']());}if(_0x7a7274[_0x30fa39(0x163)](/\[Tier[ ](\d+)\]/i)){const _0x2f3653=Number(RegExp['$1']);_0x2f3653<tier?(alert(_0x30fa39(0x169)['format'](_0x3e03a8,_0x2f3653,tier)),SceneManager[_0x30fa39(0x1a5)]()):tier=Math[_0x30fa39(0x16c)](_0x2f3653,tier);}VisuMZ[_0x30fa39(0x18a)](VisuMZ[label]['Settings'],_0x50ed26['parameters']);})(pluginData),VisuMZ['HorrorEffects'][_0x39e0eb(0x198)]=function(_0x3d929a){const _0x34295f=_0x39e0eb;if(!_0x3d929a)return;_0x3d929a[_0x34295f(0x105)](_0x34295f(0x167)),_0x3d929a[_0x34295f(0x105)](_0x34295f(0x1ca)),_0x3d929a[_0x34295f(0x105)]('tv'),_0x3d929a[_0x34295f(0x105)]('color'),_0x3d929a[_0x34295f(0x194)]();},PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1c4),_0x122a0f=>{const _0x59dea1=_0x39e0eb,_0x1a152e=[$gameSystem];for(const _0x1f0e03 of _0x1a152e){if(!_0x1f0e03)continue;VisuMZ[_0x59dea1(0x1ba)][_0x59dea1(0x198)](_0x1f0e03);}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x182),_0xf99ad3=>{const _0x48c8c4=_0x39e0eb;VisuMZ[_0x48c8c4(0x18a)](_0xf99ad3,_0xf99ad3);const _0x217e91=[$gameSystem],_0x5ee1db=_0x48c8c4(0x156);for(const _0x93b314 of _0x217e91){if(!_0x93b314)continue;_0x93b314[_0x48c8c4(0x1b6)](_0x5ee1db,_0xf99ad3);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x121),_0x13e746=>{const _0x2b54ff=_0x39e0eb,_0x1f66ed=[$gameSystem];for(const _0x441450 of _0x1f66ed){if(!_0x441450)continue;_0x441450[_0x2b54ff(0x105)](_0x2b54ff(0x156));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1ac),_0x17e0c6=>{const _0x20245e=_0x39e0eb;VisuMZ[_0x20245e(0x18a)](_0x17e0c6,_0x17e0c6);const _0x4724ed=[$gameSystem],_0x4374f1='glitch';_0x17e0c6[_0x20245e(0x192)]=Math[_0x20245e(0x16a)](_0x17e0c6[_0x20245e(0x153)]/0x2),_0x17e0c6['sliceMax']=_0x17e0c6['slices'],_0x17e0c6[_0x20245e(0x1ae)]=!![];for(const _0x516f62 of _0x4724ed){if(!_0x516f62)continue;_0x516f62[_0x20245e(0x1b6)](_0x4374f1,_0x17e0c6);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x150),_0x2c1be2=>{const _0x7c4b18=_0x39e0eb,_0x320a15=[$gameSystem];for(const _0x3dbb06 of _0x320a15){if(!_0x3dbb06)continue;_0x3dbb06[_0x7c4b18(0x105)](_0x7c4b18(0x1ca));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x165),_0x181a9e=>{const _0x2b65db=_0x39e0eb;VisuMZ[_0x2b65db(0x18a)](_0x181a9e,_0x181a9e);const _0x2bdfa9=[$gameSystem],_0x26d05b='noise';for(const _0x1c97ad of _0x2bdfa9){if(!_0x1c97ad)continue;_0x1c97ad[_0x2b65db(0x1b6)](_0x26d05b,_0x181a9e);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1e7),_0x117644=>{const _0x5d8481=_0x39e0eb,_0x15ac10=[$gameSystem];for(const _0x7d20a7 of _0x15ac10){if(!_0x7d20a7)continue;_0x7d20a7[_0x5d8481(0x105)](_0x5d8481(0x167));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x175),_0x49f225=>{const _0x80c6a8=_0x39e0eb;VisuMZ[_0x80c6a8(0x18a)](_0x49f225,_0x49f225);const _0x523fc4=[$gameSystem],_0x53c694='tv';for(const _0x266ee5 of _0x523fc4){if(!_0x266ee5)continue;_0x266ee5['setHorrorEffectSettings'](_0x53c694,_0x49f225);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0xfc),_0x8f974e=>{const _0x43a03c=_0x39e0eb,_0x5764c8=[$gameSystem];for(const _0x4fbdd6 of _0x5764c8){if(!_0x4fbdd6)continue;_0x4fbdd6[_0x43a03c(0x105)]('tv');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1be),_0x23c6d0=>{const _0x210877=_0x39e0eb,_0x39be2a=[$gameScreen];for(const _0x14b231 of _0x39be2a){if(!_0x14b231)continue;VisuMZ[_0x210877(0x1ba)][_0x210877(0x198)](_0x14b231);}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],'MapColorCreate',_0x4f16e2=>{const _0x2579f4=_0x39e0eb;VisuMZ[_0x2579f4(0x18a)](_0x4f16e2,_0x4f16e2);const _0x4c71c3=[$gameScreen],_0x4df955=_0x2579f4(0x156);for(const _0x4a47c8 of _0x4c71c3){if(!_0x4a47c8)continue;_0x4a47c8[_0x2579f4(0x1b6)](_0x4df955,_0x4f16e2);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],'MapColorRemove',_0x502616=>{const _0x1017be=_0x39e0eb,_0x4c503e=[$gameScreen];for(const _0x22d34c of _0x4c503e){if(!_0x22d34c)continue;_0x22d34c[_0x1017be(0x105)](_0x1017be(0x156));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x11b),_0x222175=>{const _0x55b631=_0x39e0eb;VisuMZ[_0x55b631(0x18a)](_0x222175,_0x222175);const _0x18e160=[$gameScreen],_0x3ba4cf=_0x55b631(0x1ca);_0x222175[_0x55b631(0x192)]=Math['ceil'](_0x222175[_0x55b631(0x153)]/0x2),_0x222175[_0x55b631(0x103)]=_0x222175[_0x55b631(0x153)],_0x222175['refreshRequest']=!![];for(const _0x5a99ad of _0x18e160){if(!_0x5a99ad)continue;_0x5a99ad[_0x55b631(0x1b6)](_0x3ba4cf,_0x222175);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1d4),_0x54cd3a=>{const _0x2834fd=_0x39e0eb,_0x521b9b=[$gameScreen];for(const _0x3b94c3 of _0x521b9b){if(!_0x3b94c3)continue;_0x3b94c3[_0x2834fd(0x105)](_0x2834fd(0x1ca));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],_0x39e0eb(0x157),_0x1a1ece=>{const _0x3a8ee2=_0x39e0eb;VisuMZ[_0x3a8ee2(0x18a)](_0x1a1ece,_0x1a1ece);const _0x1c6882=[$gameScreen],_0x431502='noise';for(const _0xf0d40c of _0x1c6882){if(!_0xf0d40c)continue;_0xf0d40c[_0x3a8ee2(0x1b6)](_0x431502,_0x1a1ece);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1bf),_0x56dc49=>{const _0x26c149=_0x39e0eb,_0x172d0a=[$gameScreen];for(const _0xd876ea of _0x172d0a){if(!_0xd876ea)continue;_0xd876ea['removeHorrorEffect'](_0x26c149(0x167));}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x109),_0x90c2c3=>{const _0x2193f8=_0x39e0eb;VisuMZ[_0x2193f8(0x18a)](_0x90c2c3,_0x90c2c3);const _0x4bff4b=[$gameScreen],_0x10102f='tv';for(const _0x349b5b of _0x4bff4b){if(!_0x349b5b)continue;_0x349b5b[_0x2193f8(0x1b6)](_0x10102f,_0x90c2c3);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],'MapTVRemove',_0x238506=>{const _0x192101=[$gameScreen];for(const _0x29cda1 of _0x192101){if(!_0x29cda1)continue;_0x29cda1['removeHorrorEffect']('tv');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],_0x39e0eb(0x126),_0x46bde4=>{const _0x2432b1=_0x39e0eb;VisuMZ[_0x2432b1(0x18a)](_0x46bde4,_0x46bde4);const _0x33892d=$gameTemp['getLastPluginCommandInterpreter'](),_0x4748c8=_0x46bde4[_0x2432b1(0x148)][_0x2432b1(0x196)](_0x25aa86=>$gameMap[_0x2432b1(0x11e)](_0x25aa86>0x0?_0x25aa86:_0x33892d['_eventId']));for(const _0x10450f of _0x4748c8){if(!_0x10450f)continue;VisuMZ['HorrorEffects'][_0x2432b1(0x198)](_0x10450f);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x146),_0x514542=>{const _0x56f557=_0x39e0eb;VisuMZ[_0x56f557(0x18a)](_0x514542,_0x514542);const _0x55e8f6=$gameTemp[_0x56f557(0x10d)](),_0x5a3a5a=_0x514542[_0x56f557(0x148)][_0x56f557(0x196)](_0x476b6f=>$gameMap[_0x56f557(0x11e)](_0x476b6f>0x0?_0x476b6f:_0x55e8f6[_0x56f557(0x1c8)])),_0x8fae05=_0x56f557(0x156);for(const _0xb0ab8e of _0x5a3a5a){if(!_0xb0ab8e)continue;_0xb0ab8e['setHorrorEffectSettings'](_0x8fae05,_0x514542);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x18b),_0x54ce1d=>{const _0x55009c=_0x39e0eb,_0x43bd79=$gameTemp[_0x55009c(0x10d)](),_0x3a6f4a=_0x54ce1d[_0x55009c(0x148)][_0x55009c(0x196)](_0x21a5b2=>$gameMap[_0x55009c(0x11e)](_0x21a5b2>0x0?_0x21a5b2:_0x43bd79['_eventId']));for(const _0x3b20a3 of _0x3a6f4a){if(!_0x3b20a3)continue;_0x3b20a3['removeHorrorEffect'](_0x55009c(0x156));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x113),_0xc94d8=>{const _0x40c0f3=_0x39e0eb;VisuMZ[_0x40c0f3(0x18a)](_0xc94d8,_0xc94d8);const _0x2dbb8e=$gameTemp['getLastPluginCommandInterpreter'](),_0x23cdd6=_0xc94d8[_0x40c0f3(0x148)]['map'](_0x21f490=>$gameMap['event'](_0x21f490>0x0?_0x21f490:_0x2dbb8e[_0x40c0f3(0x1c8)])),_0x2c05b2='glitch';_0xc94d8[_0x40c0f3(0x192)]=Math['ceil'](_0xc94d8[_0x40c0f3(0x153)]/0x2),_0xc94d8[_0x40c0f3(0x103)]=_0xc94d8[_0x40c0f3(0x153)],_0xc94d8[_0x40c0f3(0x1ae)]=!![];for(const _0x38d541 of _0x23cdd6){if(!_0x38d541)continue;_0x38d541[_0x40c0f3(0x1b6)](_0x2c05b2,_0xc94d8);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1a8),_0x338c18=>{const _0x110ccb=_0x39e0eb;VisuMZ[_0x110ccb(0x18a)](_0x338c18,_0x338c18);const _0x367cf0=$gameTemp[_0x110ccb(0x10d)](),_0x47b1f0=_0x338c18[_0x110ccb(0x148)][_0x110ccb(0x196)](_0x3a361c=>$gameMap[_0x110ccb(0x11e)](_0x3a361c>0x0?_0x3a361c:_0x367cf0['_eventId']));for(const _0x3fc2c6 of _0x47b1f0){if(!_0x3fc2c6)continue;_0x3fc2c6[_0x110ccb(0x105)](_0x110ccb(0x1ca));}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],'EventNoiseCreate',_0x142a0c=>{const _0x19d5fc=_0x39e0eb;VisuMZ[_0x19d5fc(0x18a)](_0x142a0c,_0x142a0c);const _0x51c2cc=$gameTemp['getLastPluginCommandInterpreter'](),_0x4373eb=_0x142a0c[_0x19d5fc(0x148)][_0x19d5fc(0x196)](_0x504f82=>$gameMap[_0x19d5fc(0x11e)](_0x504f82>0x0?_0x504f82:_0x51c2cc[_0x19d5fc(0x1c8)])),_0x420573=_0x19d5fc(0x167);for(const _0x43966b of _0x4373eb){if(!_0x43966b)continue;_0x43966b[_0x19d5fc(0x1b6)](_0x420573,_0x142a0c);}}),PluginManager['registerCommand'](pluginData['name'],_0x39e0eb(0x151),_0xae744a=>{const _0x1a5816=_0x39e0eb;VisuMZ['ConvertParams'](_0xae744a,_0xae744a);const _0x58f382=$gameTemp[_0x1a5816(0x10d)](),_0x9fe9b9=_0xae744a[_0x1a5816(0x148)][_0x1a5816(0x196)](_0xecd22c=>$gameMap['event'](_0xecd22c>0x0?_0xecd22c:_0x58f382[_0x1a5816(0x1c8)]));for(const _0x931d1 of _0x9fe9b9){if(!_0x931d1)continue;_0x931d1['removeHorrorEffect']('noise');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1dc),_0x222910=>{const _0x245c9d=_0x39e0eb;VisuMZ['ConvertParams'](_0x222910,_0x222910);const _0x59d3e6=$gameTemp[_0x245c9d(0x10d)](),_0xeb03f1=_0x222910[_0x245c9d(0x148)][_0x245c9d(0x196)](_0x99b5c8=>$gameMap['event'](_0x99b5c8>0x0?_0x99b5c8:_0x59d3e6[_0x245c9d(0x1c8)])),_0x514a1a='tv';for(const _0x1f4628 of _0xeb03f1){if(!_0x1f4628)continue;_0x1f4628[_0x245c9d(0x1b6)](_0x514a1a,_0x222910);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x16d),_0x1ee9a7=>{const _0x34df29=_0x39e0eb;VisuMZ[_0x34df29(0x18a)](_0x1ee9a7,_0x1ee9a7);const _0x259a73=$gameTemp[_0x34df29(0x10d)](),_0x5c3105=_0x1ee9a7[_0x34df29(0x148)][_0x34df29(0x196)](_0x4d61f1=>$gameMap[_0x34df29(0x11e)](_0x4d61f1>0x0?_0x4d61f1:_0x259a73[_0x34df29(0x1c8)]));for(const _0x3172bc of _0x5c3105){if(!_0x3172bc)continue;_0x3172bc['removeHorrorEffect']('tv');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x114),_0x15b08d=>{const _0x29f7e0=_0x39e0eb;VisuMZ[_0x29f7e0(0x18a)](_0x15b08d,_0x15b08d);const _0x29c975=_0x15b08d[_0x29f7e0(0x1c1)][_0x29f7e0(0x196)](_0x3772bb=>$gameScreen[_0x29f7e0(0x116)](_0x3772bb));for(const _0x388da9 of _0x29c975){if(!_0x388da9)continue;VisuMZ[_0x29f7e0(0x1ba)][_0x29f7e0(0x198)](_0x388da9);}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x120),_0x1bcf22=>{const _0x318a81=_0x39e0eb;VisuMZ[_0x318a81(0x18a)](_0x1bcf22,_0x1bcf22);const _0x1f6c4f=_0x1bcf22[_0x318a81(0x1c1)]['map'](_0x1403f4=>$gameScreen['picture'](_0x1403f4)),_0x4ed69e=_0x318a81(0x156);for(const _0x41bee5 of _0x1f6c4f){if(!_0x41bee5)continue;_0x41bee5[_0x318a81(0x1b6)](_0x4ed69e,_0x1bcf22);}}),PluginManager['registerCommand'](pluginData['name'],_0x39e0eb(0x160),_0x1411b5=>{const _0x5d9bd4=_0x39e0eb,_0x443197=_0x1411b5[_0x5d9bd4(0x1c1)][_0x5d9bd4(0x196)](_0x40528d=>$gameScreen['picture'](_0x40528d));for(const _0x553720 of _0x443197){if(!_0x553720)continue;_0x553720[_0x5d9bd4(0x105)](_0x5d9bd4(0x156));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x10b),_0x45ad95=>{const _0x490614=_0x39e0eb;VisuMZ[_0x490614(0x18a)](_0x45ad95,_0x45ad95);const _0x5b8525=_0x45ad95[_0x490614(0x1c1)][_0x490614(0x196)](_0x222b4f=>$gameScreen[_0x490614(0x116)](_0x222b4f)),_0x283c9d=_0x490614(0x1ca);_0x45ad95[_0x490614(0x192)]=Math[_0x490614(0x16a)](_0x45ad95[_0x490614(0x153)]/0x2),_0x45ad95[_0x490614(0x103)]=_0x45ad95[_0x490614(0x153)],_0x45ad95[_0x490614(0x1ae)]=!![];for(const _0x3aa817 of _0x5b8525){if(!_0x3aa817)continue;_0x3aa817[_0x490614(0x1b6)](_0x283c9d,_0x45ad95);}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x179),_0x363c6c=>{const _0xd487e3=_0x39e0eb;VisuMZ['ConvertParams'](_0x363c6c,_0x363c6c);const _0x412a4b=_0x363c6c['PictureId']['map'](_0x436868=>$gameScreen[_0xd487e3(0x116)](_0x436868));for(const _0x30d3aa of _0x412a4b){if(!_0x30d3aa)continue;_0x30d3aa[_0xd487e3(0x105)](_0xd487e3(0x1ca));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],_0x39e0eb(0x170),_0x3c0ce9=>{const _0xf9f84f=_0x39e0eb;VisuMZ[_0xf9f84f(0x18a)](_0x3c0ce9,_0x3c0ce9);const _0x3c4322=_0x3c0ce9[_0xf9f84f(0x1c1)][_0xf9f84f(0x196)](_0x2ef7b2=>$gameScreen[_0xf9f84f(0x116)](_0x2ef7b2)),_0x4af7e1='noise';for(const _0x155a71 of _0x3c4322){if(!_0x155a71)continue;_0x155a71[_0xf9f84f(0x1b6)](_0x4af7e1,_0x3c0ce9);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x181),_0x1f3721=>{const _0x2d6095=_0x39e0eb;VisuMZ['ConvertParams'](_0x1f3721,_0x1f3721);const _0x72a488=_0x1f3721[_0x2d6095(0x1c1)][_0x2d6095(0x196)](_0x54aa36=>$gameScreen[_0x2d6095(0x116)](_0x54aa36));for(const _0x4a7a1c of _0x72a488){if(!_0x4a7a1c)continue;_0x4a7a1c[_0x2d6095(0x105)]('noise');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x186),_0xab1271=>{const _0x14bf89=_0x39e0eb;VisuMZ[_0x14bf89(0x18a)](_0xab1271,_0xab1271);const _0x51b340=_0xab1271[_0x14bf89(0x1c1)]['map'](_0x591fcb=>$gameScreen[_0x14bf89(0x116)](_0x591fcb)),_0xe20f41='tv';for(const _0x272a33 of _0x51b340){if(!_0x272a33)continue;_0x272a33[_0x14bf89(0x1b6)](_0xe20f41,_0xab1271);}}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1e0),_0x4a7686=>{const _0x24c01d=_0x39e0eb;VisuMZ[_0x24c01d(0x18a)](_0x4a7686,_0x4a7686);const _0x180d7f=_0x4a7686['PictureId'][_0x24c01d(0x196)](_0x4268a4=>$gameScreen['picture'](_0x4268a4));for(const _0x139461 of _0x180d7f){if(!_0x139461)continue;_0x139461['removeHorrorEffect']('tv');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],_0x39e0eb(0x1b3),_0x9ab1a2=>{const _0x1091b4=_0x39e0eb;VisuMZ[_0x1091b4(0x18a)](_0x9ab1a2,_0x9ab1a2);const _0x453bfa=_0x9ab1a2[_0x1091b4(0x1d5)][_0x1091b4(0x196)](_0xd0f0fd=>$gameActors[_0x1091b4(0x1e2)](_0xd0f0fd));for(const _0x46ba66 of _0x453bfa){if(!_0x46ba66)continue;VisuMZ[_0x1091b4(0x1ba)][_0x1091b4(0x198)](_0x46ba66);}$gamePlayer[_0x1091b4(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],'ActorColorCreate',_0xcecccb=>{const _0x120ec9=_0x39e0eb;VisuMZ[_0x120ec9(0x18a)](_0xcecccb,_0xcecccb);const _0x51ca2a=_0xcecccb['ActorId'][_0x120ec9(0x196)](_0x26819b=>$gameActors['actor'](_0x26819b)),_0x4f634d=_0x120ec9(0x156);for(const _0x4cf6cf of _0x51ca2a){if(!_0x4cf6cf)continue;_0x4cf6cf[_0x120ec9(0x1b6)](_0x4f634d,_0xcecccb);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x13d),_0x238775=>{const _0x51d4ae=_0x39e0eb,_0x47051f=_0x238775[_0x51d4ae(0x1d5)][_0x51d4ae(0x196)](_0x4a945f=>$gameActors['actor'](_0x4a945f));for(const _0x2ad875 of _0x47051f){if(!_0x2ad875)continue;_0x2ad875[_0x51d4ae(0x105)]('color');}}),PluginManager['registerCommand'](pluginData['name'],_0x39e0eb(0x1da),_0x4bc725=>{const _0x5ace8c=_0x39e0eb;VisuMZ[_0x5ace8c(0x18a)](_0x4bc725,_0x4bc725);const _0x4921f4=_0x4bc725['ActorId']['map'](_0x567d7c=>$gameActors[_0x5ace8c(0x1e2)](_0x567d7c)),_0x2eae2d=_0x5ace8c(0x1ca);_0x4bc725[_0x5ace8c(0x192)]=Math[_0x5ace8c(0x16a)](_0x4bc725[_0x5ace8c(0x153)]/0x2),_0x4bc725[_0x5ace8c(0x103)]=_0x4bc725[_0x5ace8c(0x153)],_0x4bc725[_0x5ace8c(0x1ae)]=!![];for(const _0x1f33d0 of _0x4921f4){if(!_0x1f33d0)continue;_0x1f33d0[_0x5ace8c(0x1b6)](_0x2eae2d,_0x4bc725);}$gamePlayer[_0x5ace8c(0x1b5)]();}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],'ActorGlitchRemove',_0x439624=>{const _0x211545=_0x39e0eb;VisuMZ[_0x211545(0x18a)](_0x439624,_0x439624);const _0x155e14=_0x439624[_0x211545(0x1d5)][_0x211545(0x196)](_0x3b930f=>$gameActors[_0x211545(0x1e2)](_0x3b930f));for(const _0x425291 of _0x155e14){if(!_0x425291)continue;_0x425291['removeHorrorEffect'](_0x211545(0x1ca));}$gamePlayer['refresh']();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x13e),_0x4df46b=>{const _0x2b44e0=_0x39e0eb;VisuMZ[_0x2b44e0(0x18a)](_0x4df46b,_0x4df46b);const _0x31ebd4=_0x4df46b['ActorId']['map'](_0x5c73c9=>$gameActors[_0x2b44e0(0x1e2)](_0x5c73c9)),_0x4e199f=_0x2b44e0(0x167);for(const _0x5806b1 of _0x31ebd4){if(!_0x5806b1)continue;_0x5806b1['setHorrorEffectSettings'](_0x4e199f,_0x4df46b);}$gamePlayer[_0x2b44e0(0x1b5)]();}),PluginManager['registerCommand'](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x12a),_0x2a689e=>{const _0x869bd5=_0x39e0eb;VisuMZ[_0x869bd5(0x18a)](_0x2a689e,_0x2a689e);const _0x2b10be=_0x2a689e['ActorId'][_0x869bd5(0x196)](_0x4ce5fd=>$gameActors[_0x869bd5(0x1e2)](_0x4ce5fd));for(const _0x37e48a of _0x2b10be){if(!_0x37e48a)continue;_0x37e48a[_0x869bd5(0x105)](_0x869bd5(0x167));}$gamePlayer[_0x869bd5(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x130),_0x1c8c0e=>{const _0x427468=_0x39e0eb;VisuMZ['ConvertParams'](_0x1c8c0e,_0x1c8c0e);const _0x331522=_0x1c8c0e['ActorId'][_0x427468(0x196)](_0x29b618=>$gameActors[_0x427468(0x1e2)](_0x29b618)),_0x26e56a='tv';for(const _0x37353a of _0x331522){if(!_0x37353a)continue;_0x37353a[_0x427468(0x1b6)](_0x26e56a,_0x1c8c0e);}$gamePlayer[_0x427468(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x149),_0x229d3a=>{const _0x5f1488=_0x39e0eb;VisuMZ[_0x5f1488(0x18a)](_0x229d3a,_0x229d3a);const _0x179884=_0x229d3a[_0x5f1488(0x1d5)][_0x5f1488(0x196)](_0x21b1cc=>$gameActors[_0x5f1488(0x1e2)](_0x21b1cc));for(const _0x4c297a of _0x179884){if(!_0x4c297a)continue;_0x4c297a['removeHorrorEffect']('tv');}$gamePlayer[_0x5f1488(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x135),_0x30c48c=>{const _0xc85d9c=_0x39e0eb;VisuMZ[_0xc85d9c(0x18a)](_0x30c48c,_0x30c48c);const _0x40dcb5=_0x30c48c[_0xc85d9c(0x19e)][_0xc85d9c(0x196)](_0x26f873=>$gameParty[_0xc85d9c(0x106)]()[_0x26f873]);for(const _0x27c16e of _0x40dcb5){if(!_0x27c16e)continue;VisuMZ[_0xc85d9c(0x1ba)][_0xc85d9c(0x198)](_0x27c16e);}$gamePlayer[_0xc85d9c(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],'PartyColorCreate',_0x8ed510=>{const _0x1d5283=_0x39e0eb;VisuMZ[_0x1d5283(0x18a)](_0x8ed510,_0x8ed510);const _0x1568ca=_0x8ed510[_0x1d5283(0x19e)][_0x1d5283(0x196)](_0x3a14dd=>$gameParty[_0x1d5283(0x106)]()[_0x3a14dd]),_0x3a8b18='color';for(const _0x2f26b4 of _0x1568ca){if(!_0x2f26b4)continue;_0x2f26b4['setHorrorEffectSettings'](_0x3a8b18,_0x8ed510);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],'PartyColorRemove',_0x290b6a=>{const _0x1ed14c=_0x39e0eb,_0x2fd038=_0x290b6a[_0x1ed14c(0x19e)][_0x1ed14c(0x196)](_0x2313d4=>$gameParty[_0x1ed14c(0x106)]()[_0x2313d4]);for(const _0x931587 of _0x2fd038){if(!_0x931587)continue;_0x931587[_0x1ed14c(0x105)]('color');}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x111),_0x55cc62=>{const _0x5caf31=_0x39e0eb;VisuMZ[_0x5caf31(0x18a)](_0x55cc62,_0x55cc62);const _0x36208a=_0x55cc62[_0x5caf31(0x19e)]['map'](_0x112832=>$gameParty['members']()[_0x112832]),_0x1c9e6d=_0x5caf31(0x1ca);_0x55cc62[_0x5caf31(0x192)]=Math[_0x5caf31(0x16a)](_0x55cc62[_0x5caf31(0x153)]/0x2),_0x55cc62['sliceMax']=_0x55cc62['slices'],_0x55cc62[_0x5caf31(0x1ae)]=!![];for(const _0x5cf566 of _0x36208a){if(!_0x5cf566)continue;_0x5cf566[_0x5caf31(0x1b6)](_0x1c9e6d,_0x55cc62);}$gamePlayer[_0x5caf31(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x139),_0x419a23=>{const _0x14ee44=_0x39e0eb;VisuMZ[_0x14ee44(0x18a)](_0x419a23,_0x419a23);const _0xa9e9d5=_0x419a23[_0x14ee44(0x19e)]['map'](_0x3dee73=>$gameParty[_0x14ee44(0x106)]()[_0x3dee73]);for(const _0x2a0c10 of _0xa9e9d5){if(!_0x2a0c10)continue;_0x2a0c10[_0x14ee44(0x105)](_0x14ee44(0x1ca));}$gamePlayer[_0x14ee44(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x1d6),_0x10a686=>{const _0x4e4006=_0x39e0eb;VisuMZ[_0x4e4006(0x18a)](_0x10a686,_0x10a686);const _0x3efce0=_0x10a686[_0x4e4006(0x19e)][_0x4e4006(0x196)](_0x29b5fc=>$gameParty[_0x4e4006(0x106)]()[_0x29b5fc]),_0x275f5f=_0x4e4006(0x167);for(const _0x411b35 of _0x3efce0){if(!_0x411b35)continue;_0x411b35[_0x4e4006(0x1b6)](_0x275f5f,_0x10a686);}$gamePlayer[_0x4e4006(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],'PartyNoiseRemove',_0x5cea76=>{const _0x4e37f1=_0x39e0eb;VisuMZ[_0x4e37f1(0x18a)](_0x5cea76,_0x5cea76);const _0x1f4f0d=_0x5cea76[_0x4e37f1(0x19e)][_0x4e37f1(0x196)](_0x1a3d58=>$gameParty[_0x4e37f1(0x106)]()[_0x1a3d58]);for(const _0xb6b066 of _0x1f4f0d){if(!_0xb6b066)continue;_0xb6b066['removeHorrorEffect'](_0x4e37f1(0x167));}$gamePlayer[_0x4e37f1(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x13f),_0x3a722b=>{const _0xb76363=_0x39e0eb;VisuMZ[_0xb76363(0x18a)](_0x3a722b,_0x3a722b);const _0x44e45a=_0x3a722b[_0xb76363(0x19e)][_0xb76363(0x196)](_0x3bea24=>$gameParty[_0xb76363(0x106)]()[_0x3bea24]),_0x5d3bbe='tv';for(const _0x4131a2 of _0x44e45a){if(!_0x4131a2)continue;_0x4131a2['setHorrorEffectSettings'](_0x5d3bbe,_0x3a722b);}$gamePlayer[_0xb76363(0x1b5)]();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x14f),_0x3919c7=>{const _0x86cf66=_0x39e0eb;VisuMZ[_0x86cf66(0x18a)](_0x3919c7,_0x3919c7);const _0xbdbd4a=_0x3919c7[_0x86cf66(0x19e)][_0x86cf66(0x196)](_0x2582a2=>$gameParty['members']()[_0x2582a2]);for(const _0x4a20e3 of _0xbdbd4a){if(!_0x4a20e3)continue;_0x4a20e3['removeHorrorEffect']('tv');}$gamePlayer['refresh']();}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x159),_0xb04878=>{const _0x31c362=_0x39e0eb;VisuMZ[_0x31c362(0x18a)](_0xb04878,_0xb04878);const _0x2fa3a5=_0xb04878[_0x31c362(0x12c)][_0x31c362(0x196)](_0x305992=>$gameTroop[_0x31c362(0x106)]()[_0x305992]);for(const _0x1a32b7 of _0x2fa3a5){if(!_0x1a32b7)continue;VisuMZ[_0x31c362(0x1ba)][_0x31c362(0x198)](_0x1a32b7);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],_0x39e0eb(0x108),_0x186727=>{const _0x153706=_0x39e0eb;VisuMZ[_0x153706(0x18a)](_0x186727,_0x186727);const _0x517d6c=_0x186727['EnemyIndex']['map'](_0x397947=>$gameTroop[_0x153706(0x106)]()[_0x397947]),_0x3c1bea='color';for(const _0x2a37c5 of _0x517d6c){if(!_0x2a37c5)continue;_0x2a37c5[_0x153706(0x1b6)](_0x3c1bea,_0x186727);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData['name'],_0x39e0eb(0x11d),_0x389e1f=>{const _0x5ed147=_0x39e0eb,_0x1c32c4=_0x389e1f[_0x5ed147(0x12c)][_0x5ed147(0x196)](_0x93f9f5=>$gameTroop['members']()[_0x93f9f5]);for(const _0x92a75c of _0x1c32c4){if(!_0x92a75c)continue;_0x92a75c[_0x5ed147(0x105)](_0x5ed147(0x156));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x187),_0x2066ac=>{const _0x465746=_0x39e0eb;VisuMZ[_0x465746(0x18a)](_0x2066ac,_0x2066ac);const _0x3f9edd=_0x2066ac[_0x465746(0x12c)]['map'](_0x25ab05=>$gameTroop[_0x465746(0x106)]()[_0x25ab05]),_0xf5ffb7=_0x465746(0x1ca);_0x2066ac[_0x465746(0x192)]=Math[_0x465746(0x16a)](_0x2066ac['slices']/0x2),_0x2066ac[_0x465746(0x103)]=_0x2066ac[_0x465746(0x153)],_0x2066ac[_0x465746(0x1ae)]=!![];for(const _0x58ba54 of _0x3f9edd){if(!_0x58ba54)continue;_0x58ba54[_0x465746(0x1b6)](_0xf5ffb7,_0x2066ac);}}),PluginManager['registerCommand'](pluginData['name'],'EnemyGlitchRemove',_0x48e705=>{const _0x2d9701=_0x39e0eb;VisuMZ[_0x2d9701(0x18a)](_0x48e705,_0x48e705);const _0x17ff13=_0x48e705['EnemyIndex']['map'](_0x5450c9=>$gameTroop[_0x2d9701(0x106)]()[_0x5450c9]);for(const _0x1349d0 of _0x17ff13){if(!_0x1349d0)continue;_0x1349d0[_0x2d9701(0x105)](_0x2d9701(0x1ca));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x18c),_0x4ebb41=>{const _0x1544c5=_0x39e0eb;VisuMZ['ConvertParams'](_0x4ebb41,_0x4ebb41);const _0x34dfd9=_0x4ebb41[_0x1544c5(0x12c)][_0x1544c5(0x196)](_0x323eac=>$gameTroop['members']()[_0x323eac]),_0x3d31a1=_0x1544c5(0x167);for(const _0x6a8e7f of _0x34dfd9){if(!_0x6a8e7f)continue;_0x6a8e7f[_0x1544c5(0x1b6)](_0x3d31a1,_0x4ebb41);}}),PluginManager['registerCommand'](pluginData['name'],_0x39e0eb(0x13a),_0x3a0700=>{const _0x3268fb=_0x39e0eb;VisuMZ['ConvertParams'](_0x3a0700,_0x3a0700);const _0x4b24be=_0x3a0700[_0x3268fb(0x12c)][_0x3268fb(0x196)](_0xd5e430=>$gameTroop[_0x3268fb(0x106)]()[_0xd5e430]);for(const _0x556203 of _0x4b24be){if(!_0x556203)continue;_0x556203['removeHorrorEffect'](_0x3268fb(0x167));}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],_0x39e0eb(0x110),_0x546646=>{const _0x465b82=_0x39e0eb;VisuMZ['ConvertParams'](_0x546646,_0x546646);const _0x4fc6f8=_0x546646['EnemyIndex'][_0x465b82(0x196)](_0x1e0f51=>$gameTroop[_0x465b82(0x106)]()[_0x1e0f51]),_0x555d72='tv';for(const _0x4ba8dc of _0x4fc6f8){if(!_0x4ba8dc)continue;_0x4ba8dc[_0x465b82(0x1b6)](_0x555d72,_0x546646);}}),PluginManager[_0x39e0eb(0x1ce)](pluginData[_0x39e0eb(0x11f)],'EnemyTVRemove',_0x4567f5=>{const _0xb48bf=_0x39e0eb;VisuMZ[_0xb48bf(0x18a)](_0x4567f5,_0x4567f5);const _0x82907e=_0x4567f5[_0xb48bf(0x12c)][_0xb48bf(0x196)](_0x3622d5=>$gameTroop[_0xb48bf(0x106)]()[_0x3622d5]);for(const _0x2f3294 of _0x82907e){if(!_0x2f3294)continue;_0x2f3294['removeHorrorEffect']('tv');}}),Game_Temp[_0x39e0eb(0x180)][_0x39e0eb(0x1c5)]=function(_0x4cd03b){const _0x1b6ca2=_0x39e0eb;this[_0x1b6ca2(0x1e3)]=_0x4cd03b;},Game_Temp['prototype'][_0x39e0eb(0x10d)]=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ['HorrorEffects']['Game_System_initialize']=Game_System['prototype'][_0x39e0eb(0x184)],Game_System[_0x39e0eb(0x180)][_0x39e0eb(0x184)]=function(){const _0x2ae0a2=_0x39e0eb;VisuMZ[_0x2ae0a2(0x1ba)][_0x2ae0a2(0x199)][_0x2ae0a2(0x1cb)](this),this['clearHorrorEffects']();},Game_System['prototype']['clearHorrorEffects']=function(){const _0x153700=_0x39e0eb;this[_0x153700(0x162)]={};},Game_System[_0x39e0eb(0x180)][_0x39e0eb(0x127)]=function(_0x441ef6){const _0x501b15=_0x39e0eb;this[_0x501b15(0x162)]===undefined&&this['clearHorrorEffects']();if(_0x441ef6[_0x501b15(0x163)](/noise/i)&&!this[_0x501b15(0x162)][_0x501b15(0x17d)])this[_0x501b15(0x162)][_0x501b15(0x17d)]={},this[_0x501b15(0x162)]['noiseFilter'][_0x501b15(0x167)]=0.3,this[_0x501b15(0x162)]['noiseFilter'][_0x501b15(0x158)]=!![],this[_0x501b15(0x162)]['noiseFilter']['needUpdate']=!![];else{if(_0x441ef6[_0x501b15(0x163)](/glitch/i)&&!this[_0x501b15(0x162)]['glitchFilter'])this['_horrorFilters'][_0x501b15(0x14d)]={},this['_horrorFilters']['glitchFilter'][_0x501b15(0x153)]=0xa,this[_0x501b15(0x162)]['glitchFilter'][_0x501b15(0x12b)]=0x64,this[_0x501b15(0x162)][_0x501b15(0x14d)]['sliceMin']=0x5,this[_0x501b15(0x162)][_0x501b15(0x14d)][_0x501b15(0x103)]=0xa,this[_0x501b15(0x162)][_0x501b15(0x14d)]['animated']=!![],this[_0x501b15(0x162)][_0x501b15(0x14d)][_0x501b15(0x1cd)]=0x12c,this[_0x501b15(0x162)]['glitchFilter'][_0x501b15(0x12e)]=0x1e,this[_0x501b15(0x162)][_0x501b15(0x14d)][_0x501b15(0x185)]=!![];else{if(_0x441ef6['match'](/tv/i)&&!this[_0x501b15(0x162)][_0x501b15(0x132)])this[_0x501b15(0x162)]['tvFilter']={},this[_0x501b15(0x162)][_0x501b15(0x132)][_0x501b15(0x1dd)]=0x5,this[_0x501b15(0x162)]['tvFilter'][_0x501b15(0x15c)]=0.3,this['_horrorFilters'][_0x501b15(0x132)][_0x501b15(0x158)]=!![],this['_horrorFilters'][_0x501b15(0x132)][_0x501b15(0x164)]=0.25,this[_0x501b15(0x162)][_0x501b15(0x132)][_0x501b15(0x185)]=!![];else _0x441ef6[_0x501b15(0x163)](/color/i)&&!this[_0x501b15(0x162)][_0x501b15(0x119)]&&(this[_0x501b15(0x162)][_0x501b15(0x119)]={},this[_0x501b15(0x162)][_0x501b15(0x119)][_0x501b15(0x1b8)]=_0x501b15(0x1a9),this[_0x501b15(0x162)][_0x501b15(0x119)][_0x501b15(0x185)]=!![]);}}},Game_System[_0x39e0eb(0x180)]['removeHorrorEffect']=function(_0x39e2ff){const _0xd305ea=_0x39e0eb;this[_0xd305ea(0x162)]===undefined&&this['clearHorrorEffects'](),_0x39e2ff+='Filter',this[_0xd305ea(0x162)][_0x39e2ff]=undefined;},Game_System[_0x39e0eb(0x180)][_0x39e0eb(0x118)]=function(_0x57dcf1,_0x311fcf,_0x21344b){const _0x312f6c=_0x39e0eb;this[_0x312f6c(0x162)]===undefined&&this[_0x312f6c(0x194)](),_0x57dcf1+=_0x312f6c(0x11c),!!this[_0x312f6c(0x162)][_0x57dcf1]&&(this['_horrorFilters'][_0x57dcf1][_0x311fcf]=_0x21344b,this['_horrorFilters'][_0x57dcf1][_0x312f6c(0x185)]=!![]);},Game_System[_0x39e0eb(0x180)][_0x39e0eb(0x1b6)]=function(_0x2d102b,_0x3333d9){const _0x682328=_0x39e0eb;this[_0x682328(0x162)]===undefined&&this[_0x682328(0x194)](),_0x2d102b+='Filter',this[_0x682328(0x162)][_0x2d102b]=JsonEx[_0x682328(0x1d8)](_0x3333d9),this[_0x682328(0x162)][_0x2d102b][_0x682328(0x185)]=!![];},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x10c)]=Game_Screen[_0x39e0eb(0x180)]['clear'],Game_Screen[_0x39e0eb(0x180)][_0x39e0eb(0x1de)]=function(){const _0x483191=_0x39e0eb;VisuMZ['HorrorEffects'][_0x483191(0x10c)]['call'](this),this[_0x483191(0x194)]();},Game_Screen['prototype'][_0x39e0eb(0x194)]=function(){const _0x1a3a64=_0x39e0eb;Game_System[_0x1a3a64(0x180)]['clearHorrorEffects'][_0x1a3a64(0x1cb)](this);},Game_Screen[_0x39e0eb(0x180)][_0x39e0eb(0x127)]=function(_0x551805){const _0x408c55=_0x39e0eb;Game_System['prototype']['createHorrorEffect'][_0x408c55(0x1cb)](this,_0x551805);},Game_Screen[_0x39e0eb(0x180)][_0x39e0eb(0x105)]=function(_0x24e3d2){const _0x519cc9=_0x39e0eb;Game_System[_0x519cc9(0x180)]['removeHorrorEffect'][_0x519cc9(0x1cb)](this,_0x24e3d2);},Game_Screen['prototype']['setHorrorEffectToValue']=function(_0x21b82f,_0x268a15,_0x4d36d2){const _0x163e80=_0x39e0eb;Game_System[_0x163e80(0x180)][_0x163e80(0x118)][_0x163e80(0x1cb)](this,_0x21b82f,_0x268a15,_0x4d36d2);},Game_Screen[_0x39e0eb(0x180)][_0x39e0eb(0x1b6)]=function(_0x1c8eec,_0x1bb3aa){const _0x7361e7=_0x39e0eb;Game_System[_0x7361e7(0x180)]['setHorrorEffectSettings'][_0x7361e7(0x1cb)](this,_0x1c8eec,_0x1bb3aa);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x1bd)]=Game_Picture[_0x39e0eb(0x180)][_0x39e0eb(0x184)],Game_Picture[_0x39e0eb(0x180)]['initialize']=function(){const _0x5b4f1e=_0x39e0eb;VisuMZ[_0x5b4f1e(0x1ba)]['Game_Picture_initialize'][_0x5b4f1e(0x1cb)](this),this[_0x5b4f1e(0x162)]=this['_horrorFilters']||{};},VisuMZ[_0x39e0eb(0x1ba)]['Game_Picture_erase']=Game_Picture[_0x39e0eb(0x180)][_0x39e0eb(0x154)],Game_Picture[_0x39e0eb(0x180)]['erase']=function(){const _0x4ad3db=_0x39e0eb;VisuMZ['HorrorEffects'][_0x4ad3db(0x1b2)]['call'](this),this[_0x4ad3db(0x194)]();},Game_Picture[_0x39e0eb(0x180)][_0x39e0eb(0x194)]=function(){const _0x2f306c=_0x39e0eb;Game_System['prototype']['clearHorrorEffects'][_0x2f306c(0x1cb)](this);},Game_Picture[_0x39e0eb(0x180)]['createHorrorEffect']=function(_0x3e6545){const _0x1b725d=_0x39e0eb;Game_System['prototype']['createHorrorEffect'][_0x1b725d(0x1cb)](this,_0x3e6545);},Game_Picture['prototype'][_0x39e0eb(0x105)]=function(_0x5bdd13){const _0x10bf00=_0x39e0eb;Game_System[_0x10bf00(0x180)][_0x10bf00(0x105)][_0x10bf00(0x1cb)](this,_0x5bdd13);},Game_Picture[_0x39e0eb(0x180)]['setHorrorEffectToValue']=function(_0xd80397,_0x36b051,_0x250938){const _0x38aabf=_0x39e0eb;Game_System[_0x38aabf(0x180)][_0x38aabf(0x118)][_0x38aabf(0x1cb)](this,_0xd80397,_0x36b051,_0x250938);},Game_Picture['prototype'][_0x39e0eb(0x1b6)]=function(_0x4e7620,_0x2970b0){const _0x1bb3b5=_0x39e0eb;Game_System[_0x1bb3b5(0x180)][_0x1bb3b5(0x1b6)][_0x1bb3b5(0x1cb)](this,_0x4e7620,_0x2970b0);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x1db)]=Game_BattlerBase[_0x39e0eb(0x180)][_0x39e0eb(0x184)],Game_BattlerBase['prototype']['initialize']=function(){const _0xb926be=_0x39e0eb;VisuMZ[_0xb926be(0x1ba)]['Game_BattlerBase_initialize'][_0xb926be(0x1cb)](this),this[_0xb926be(0x194)]();},Game_BattlerBase[_0x39e0eb(0x180)][_0x39e0eb(0x194)]=function(){const _0x334292=_0x39e0eb;Game_System[_0x334292(0x180)][_0x334292(0x194)][_0x334292(0x1cb)](this);},Game_BattlerBase[_0x39e0eb(0x180)][_0x39e0eb(0x127)]=function(_0x31b173){const _0x103612=_0x39e0eb;Game_System['prototype']['createHorrorEffect'][_0x103612(0x1cb)](this,_0x31b173);},Game_BattlerBase[_0x39e0eb(0x180)][_0x39e0eb(0x105)]=function(_0x4b5a86){const _0x3df2d3=_0x39e0eb;Game_System[_0x3df2d3(0x180)]['removeHorrorEffect']['call'](this,_0x4b5a86);},Game_BattlerBase[_0x39e0eb(0x180)][_0x39e0eb(0x118)]=function(_0x34d931,_0x27663d,_0x5c4804){const _0x2b6de0=_0x39e0eb;Game_System['prototype']['setHorrorEffectToValue'][_0x2b6de0(0x1cb)](this,_0x34d931,_0x27663d,_0x5c4804);},Game_BattlerBase[_0x39e0eb(0x180)][_0x39e0eb(0x1b6)]=function(_0x1fcb8d,_0x3fb22d){const _0x18ec9c=_0x39e0eb;Game_System['prototype'][_0x18ec9c(0x1b6)][_0x18ec9c(0x1cb)](this,_0x1fcb8d,_0x3fb22d);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x1e5)]=Game_CharacterBase[_0x39e0eb(0x180)][_0x39e0eb(0x176)],Game_CharacterBase[_0x39e0eb(0x180)][_0x39e0eb(0x176)]=function(){const _0x55a400=_0x39e0eb;VisuMZ['HorrorEffects'][_0x55a400(0x1e5)][_0x55a400(0x1cb)](this),this[_0x55a400(0x194)]();},Game_CharacterBase[_0x39e0eb(0x180)]['clearHorrorEffects']=function(){const _0x4f1cfa=_0x39e0eb;Game_System[_0x4f1cfa(0x180)][_0x4f1cfa(0x194)]['call'](this);},Game_CharacterBase['prototype'][_0x39e0eb(0x127)]=function(_0x469348){const _0x42809a=_0x39e0eb;Game_System[_0x42809a(0x180)][_0x42809a(0x127)][_0x42809a(0x1cb)](this,_0x469348);},Game_CharacterBase[_0x39e0eb(0x180)][_0x39e0eb(0x105)]=function(_0x2113cb){const _0x21662d=_0x39e0eb;Game_System[_0x21662d(0x180)][_0x21662d(0x105)][_0x21662d(0x1cb)](this,_0x2113cb);},Game_CharacterBase[_0x39e0eb(0x180)][_0x39e0eb(0x118)]=function(_0x1a29e5,_0x271db8,_0x1c33ff){const _0x136f29=_0x39e0eb;Game_System[_0x136f29(0x180)][_0x136f29(0x118)][_0x136f29(0x1cb)](this,_0x1a29e5,_0x271db8,_0x1c33ff);},Game_CharacterBase[_0x39e0eb(0x180)][_0x39e0eb(0x1b6)]=function(_0x267120,_0x2326cf){const _0x21c932=_0x39e0eb;Game_System[_0x21c932(0x180)][_0x21c932(0x1b6)][_0x21c932(0x1cb)](this,_0x267120,_0x2326cf);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x144)]=Game_Player[_0x39e0eb(0x180)][_0x39e0eb(0x1b5)],Game_Player[_0x39e0eb(0x180)][_0x39e0eb(0x1b5)]=function(){const _0xa35ad6=_0x39e0eb;VisuMZ[_0xa35ad6(0x1ba)]['Game_Player_refresh'][_0xa35ad6(0x1cb)](this),!!$gameParty[_0xa35ad6(0x104)]()&&this[_0xa35ad6(0x191)]();},Game_Player['prototype']['clearHorrorEffects']=function(){const _0x4d2539=_0x39e0eb;!!$gameParty[_0x4d2539(0x104)]()&&(Game_System[_0x4d2539(0x180)][_0x4d2539(0x194)][_0x4d2539(0x1cb)]($gameParty[_0x4d2539(0x104)]()),this[_0x4d2539(0x191)]());},Game_Player['prototype']['createHorrorEffect']=function(_0x426d15){const _0x18b96a=_0x39e0eb;!!$gameParty[_0x18b96a(0x104)]()&&(Game_System[_0x18b96a(0x180)][_0x18b96a(0x127)]['call']($gameParty[_0x18b96a(0x104)](),_0x426d15),this[_0x18b96a(0x191)]());},Game_Player[_0x39e0eb(0x180)][_0x39e0eb(0x105)]=function(_0x416cfa){const _0x355730=_0x39e0eb;!!$gameParty[_0x355730(0x104)]()&&(Game_System[_0x355730(0x180)]['removeHorrorEffect'][_0x355730(0x1cb)]($gameParty[_0x355730(0x104)](),_0x416cfa),this[_0x355730(0x191)]());},Game_Player[_0x39e0eb(0x180)]['setHorrorEffectToValue']=function(_0x4315ac,_0x5d87b6,_0x2d9c41){const _0x45d7ba=_0x39e0eb;!!$gameParty[_0x45d7ba(0x104)]()&&(Game_System[_0x45d7ba(0x180)][_0x45d7ba(0x118)][_0x45d7ba(0x1cb)]($gameParty[_0x45d7ba(0x104)](),_0x4315ac,_0x5d87b6,_0x2d9c41),this['synchronizeHorrorEffects']());},Game_Player['prototype']['setHorrorEffectSettings']=function(_0x364126,_0x418121){const _0x5a6449=_0x39e0eb;!!$gameParty[_0x5a6449(0x104)]()&&(Game_System['prototype'][_0x5a6449(0x1b6)]['call']($gameParty[_0x5a6449(0x104)](),_0x364126,_0x418121),this['synchronizeHorrorEffects']());},Game_Player[_0x39e0eb(0x180)][_0x39e0eb(0x191)]=function(){const _0x5d18a3=_0x39e0eb;this[_0x5d18a3(0x162)]=JsonEx[_0x5d18a3(0x1d8)]($gameParty[_0x5d18a3(0x104)]()[_0x5d18a3(0x162)]);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x129)]=Game_Follower[_0x39e0eb(0x180)]['refresh'],Game_Follower[_0x39e0eb(0x180)][_0x39e0eb(0x1b5)]=function(){const _0x4c8750=_0x39e0eb;VisuMZ[_0x4c8750(0x1ba)][_0x4c8750(0x129)]['call'](this),!!this[_0x4c8750(0x1e2)]()&&this[_0x4c8750(0x191)]();},Game_Follower[_0x39e0eb(0x180)]['clearHorrorEffects']=function(){const _0xaa8a3f=_0x39e0eb;!!this[_0xaa8a3f(0x1e2)]()&&(Game_System[_0xaa8a3f(0x180)][_0xaa8a3f(0x194)]['call'](this[_0xaa8a3f(0x1e2)]()),this[_0xaa8a3f(0x191)]());},Game_Follower['prototype'][_0x39e0eb(0x127)]=function(_0x128112){const _0x572e15=_0x39e0eb;!!this['actor']()&&(Game_System[_0x572e15(0x180)]['createHorrorEffect'][_0x572e15(0x1cb)](this[_0x572e15(0x1e2)](),_0x128112),this[_0x572e15(0x191)]());},Game_Follower['prototype'][_0x39e0eb(0x105)]=function(_0x39b4e0){const _0x3d26d8=_0x39e0eb;!!this[_0x3d26d8(0x1e2)]()&&(Game_System[_0x3d26d8(0x180)][_0x3d26d8(0x105)][_0x3d26d8(0x1cb)](this[_0x3d26d8(0x1e2)](),_0x39b4e0),this[_0x3d26d8(0x191)]());},Game_Follower[_0x39e0eb(0x180)][_0x39e0eb(0x118)]=function(_0x444b0e,_0x59d184,_0x4b266f){const _0xc8ae32=_0x39e0eb;!!this[_0xc8ae32(0x1e2)]()&&(Game_System['prototype'][_0xc8ae32(0x118)][_0xc8ae32(0x1cb)](this[_0xc8ae32(0x1e2)](),_0x444b0e,_0x59d184,_0x4b266f),this[_0xc8ae32(0x191)]());},Game_Follower[_0x39e0eb(0x180)]['setHorrorEffectSettings']=function(_0x4e39b1,_0x2d422c){const _0x224f79=_0x39e0eb;!!this[_0x224f79(0x1e2)]()&&(Game_System[_0x224f79(0x180)]['setHorrorEffectSettings'][_0x224f79(0x1cb)](this[_0x224f79(0x1e2)](),_0x4e39b1,_0x2d422c),this['synchronizeHorrorEffects']());},Game_Follower['prototype']['synchronizeHorrorEffects']=function(){const _0x5175da=_0x39e0eb;this[_0x5175da(0x162)]=JsonEx['makeDeepCopy'](this[_0x5175da(0x1e2)]()[_0x5175da(0x162)]);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x188)]=Game_Interpreter[_0x39e0eb(0x180)][_0x39e0eb(0x11a)],Game_Interpreter[_0x39e0eb(0x180)][_0x39e0eb(0x11a)]=function(_0x27b0c1){const _0xde0421=_0x39e0eb;return $gameTemp[_0xde0421(0x1c5)](this),VisuMZ['HorrorEffects'][_0xde0421(0x188)][_0xde0421(0x1cb)](this,_0x27b0c1);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x141)]=Scene_Title[_0x39e0eb(0x180)][_0x39e0eb(0x1af)],Scene_Title[_0x39e0eb(0x180)][_0x39e0eb(0x1af)]=function(){const _0xe59ef6=_0x39e0eb;VisuMZ[_0xe59ef6(0x1ba)]['Scene_Title_createBackground'][_0xe59ef6(0x1cb)](this);if(ConfigManager[_0xe59ef6(0x1d9)]===![])return;this[_0xe59ef6(0x1a1)](this[_0xe59ef6(0x190)],VisuMZ['HorrorEffects'][_0xe59ef6(0x1c6)][_0xe59ef6(0x10f)]),this[_0xe59ef6(0x1a1)](this[_0xe59ef6(0x107)],VisuMZ[_0xe59ef6(0x1ba)][_0xe59ef6(0x1c6)][_0xe59ef6(0x174)]);},Scene_Title[_0x39e0eb(0x180)]['applyTitleHorrorEffects']=function(_0x5db291,_0x2c65a1){const _0xa885cb=_0x39e0eb;!!_0x5db291&&!!_0x2c65a1&&(!!_0x2c65a1[_0xa885cb(0x15d)]&&(_0x5db291[_0xa885cb(0x128)](),_0x5db291['setHorrorNoiseRate'](_0x2c65a1[_0xa885cb(0x178)]),_0x5db291[_0xa885cb(0x1c3)](_0x2c65a1[_0xa885cb(0x1a2)])),!!_0x2c65a1[_0xa885cb(0x171)]&&(_0x5db291[_0xa885cb(0x1e6)](),_0x5db291[_0xa885cb(0x17e)](_0x2c65a1[_0xa885cb(0x18f)]),_0x5db291[_0xa885cb(0x12f)](_0x2c65a1[_0xa885cb(0x10a)]),_0x5db291[_0xa885cb(0x1b1)](_0x2c65a1['GlitchAni']),_0x5db291[_0xa885cb(0x161)](_0x2c65a1[_0xa885cb(0x14a)]),_0x5db291['setHorrorGlitchStrength'](_0x2c65a1['GlitchAniStr'])),!!_0x2c65a1['TV']&&(_0x5db291[_0xa885cb(0x1bb)](),_0x5db291[_0xa885cb(0x13c)](_0x2c65a1[_0xa885cb(0x1d3)]),_0x5db291[_0xa885cb(0x102)](_0x2c65a1[_0xa885cb(0x1a7)]),_0x5db291['setHorrorTVAnimated'](_0x2c65a1[_0xa885cb(0x16b)]),_0x5db291['setHorrorTVSpeed'](_0x2c65a1[_0xa885cb(0x145)])));},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x195)]=Sprite[_0x39e0eb(0x180)]['initialize'],Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x184)]=function(_0x47b03d){const _0x1b4962=_0x39e0eb;this[_0x1b4962(0x162)]={},this['_horrorFiltersSource']=this[_0x1b4962(0x125)]||null,VisuMZ[_0x1b4962(0x1ba)][_0x1b4962(0x195)][_0x1b4962(0x1cb)](this,_0x47b03d);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0xff)]=Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x18e)],Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x18e)]=function(){const _0x3cb6c6=_0x39e0eb;this[_0x3cb6c6(0xfa)](),VisuMZ[_0x3cb6c6(0x1ba)]['Sprite_update'][_0x3cb6c6(0x1cb)](this),this[_0x3cb6c6(0x136)]();},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x136)]=function(){const _0x514d70=_0x39e0eb;this['updateHorrorNoise'](),this[_0x514d70(0x15a)](),this[_0x514d70(0x1c7)](),this[_0x514d70(0xfd)]();},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x122)]=function(_0x3abf54){const _0x554804=_0x39e0eb;this[_0x554804(0xfb)]=this[_0x554804(0xfb)]||[],this[_0x554804(0xfb)]['push'](_0x3abf54);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x14c)]=function(_0xb06955){const _0xc1279=_0x39e0eb;var _0x5c16ec=this['filters'][_0xc1279(0x115)](_0xb06955);this['filters']['splice'](_0x5c16ec,0x1),this[_0xc1279(0xfb)][_0xc1279(0x19c)]===0x0&&(this[_0xc1279(0xfb)]=null);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0xfa)]=function(){const _0x34d38d=_0x39e0eb;if(ConfigManager[_0x34d38d(0x1d9)]===![])return;if(!PIXI['filters'][_0x34d38d(0x1a0)])return;if(!PIXI[_0x34d38d(0xfb)][_0x34d38d(0x131)])return;if(!PIXI[_0x34d38d(0xfb)]['CRTFilter'])return;if(!!this['_horrorFiltersSource']&&!!this[_0x34d38d(0x125)][_0x34d38d(0x162)]){var _0x631d04=this[_0x34d38d(0x125)][_0x34d38d(0x162)];if(!!_0x631d04[_0x34d38d(0x17d)]){!this[_0x34d38d(0x162)][_0x34d38d(0x17d)]&&(this[_0x34d38d(0x128)](),_0x631d04[_0x34d38d(0x17d)][_0x34d38d(0x185)]=!![]);if(_0x631d04['noiseFilter'][_0x34d38d(0x185)]){_0x631d04[_0x34d38d(0x17d)]['needUpdate']=![];var _0x16bd04=[_0x34d38d(0x167),_0x34d38d(0x158)];for(var _0x3a765f=0x0;_0x3a765f<_0x16bd04['length'];_0x3a765f++){var _0x37dd51=_0x16bd04[_0x3a765f];this['_horrorFilters'][_0x34d38d(0x17d)][_0x37dd51]=_0x631d04['noiseFilter'][_0x37dd51];}}}else!!this[_0x34d38d(0x162)][_0x34d38d(0x17d)]&&this['removeHorrorNoise']();if(!!_0x631d04[_0x34d38d(0x14d)]){!this[_0x34d38d(0x162)][_0x34d38d(0x14d)]&&(this[_0x34d38d(0x1e6)](),_0x631d04[_0x34d38d(0x14d)][_0x34d38d(0x185)]=!![]);if(_0x631d04[_0x34d38d(0x14d)][_0x34d38d(0x185)]){_0x631d04[_0x34d38d(0x14d)][_0x34d38d(0x185)]=![];var _0x16bd04=[_0x34d38d(0x153),'offset',_0x34d38d(0x192),'sliceMax','animated',_0x34d38d(0x1cd),_0x34d38d(0x12e),_0x34d38d(0x1ae)];for(var _0x3a765f=0x0;_0x3a765f<_0x16bd04[_0x34d38d(0x19c)];_0x3a765f++){var _0x37dd51=_0x16bd04[_0x3a765f];this['_horrorFilters'][_0x34d38d(0x14d)][_0x37dd51]=_0x631d04[_0x34d38d(0x14d)][_0x37dd51],_0x37dd51===_0x34d38d(0x1ae)&&(_0x631d04[_0x34d38d(0x14d)][_0x37dd51]=![]);}}}else!!this[_0x34d38d(0x162)][_0x34d38d(0x14d)]&&this[_0x34d38d(0x1b0)]();if(!!_0x631d04[_0x34d38d(0x132)]){!this[_0x34d38d(0x162)][_0x34d38d(0x132)]&&(this[_0x34d38d(0x1bb)](),_0x631d04['tvFilter'][_0x34d38d(0x185)]=!![]);if(_0x631d04[_0x34d38d(0x132)][_0x34d38d(0x185)]){_0x631d04[_0x34d38d(0x132)][_0x34d38d(0x185)]=![];var _0x16bd04=['lineWidth',_0x34d38d(0x15c),_0x34d38d(0x158),'aniSpeed'];for(var _0x3a765f=0x0;_0x3a765f<_0x16bd04[_0x34d38d(0x19c)];_0x3a765f++){var _0x37dd51=_0x16bd04[_0x3a765f];this[_0x34d38d(0x162)][_0x34d38d(0x132)][_0x37dd51]=_0x631d04['tvFilter'][_0x37dd51];}}}else!!this['_horrorFilters'][_0x34d38d(0x132)]&&this[_0x34d38d(0xfe)]();if(!!_0x631d04[_0x34d38d(0x119)]){!this[_0x34d38d(0x162)][_0x34d38d(0x119)]&&(this[_0x34d38d(0x1a3)](),_0x631d04['colorFilter'][_0x34d38d(0x185)]=!![]);if(_0x631d04[_0x34d38d(0x119)][_0x34d38d(0x185)]){_0x631d04['colorFilter'][_0x34d38d(0x185)]=![];var _0x16bd04=[_0x34d38d(0x1b8)];for(var _0x3a765f=0x0;_0x3a765f<_0x16bd04[_0x34d38d(0x19c)];_0x3a765f++){var _0x37dd51=_0x16bd04[_0x3a765f];this[_0x34d38d(0x162)][_0x34d38d(0x119)][_0x37dd51]=_0x631d04[_0x34d38d(0x119)][_0x37dd51];}}}else!!this[_0x34d38d(0x162)]['colorFilter']&&this['removeHorrorColor']();}},Sprite['prototype'][_0x39e0eb(0x128)]=function(){const _0x391e1b=_0x39e0eb;if(!PIXI[_0x391e1b(0xfb)][_0x391e1b(0x1a0)])return;!this[_0x391e1b(0x162)]['noiseFilter']&&(this[_0x391e1b(0x162)]['noiseFilter']=new PIXI[(_0x391e1b(0xfb))]['NoiseFilter'](),this[_0x391e1b(0x122)](this[_0x391e1b(0x162)][_0x391e1b(0x17d)])),this[_0x391e1b(0x162)]['noiseFilter']['noise']=0.3,this[_0x391e1b(0x162)][_0x391e1b(0x17d)][_0x391e1b(0x158)]=!![];},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x16f)]=function(){const _0x48da2f=_0x39e0eb;!!this[_0x48da2f(0x162)][_0x48da2f(0x17d)]&&(this[_0x48da2f(0x14c)](this[_0x48da2f(0x162)][_0x48da2f(0x17d)]),this[_0x48da2f(0x162)][_0x48da2f(0x17d)]=undefined);},Sprite['prototype'][_0x39e0eb(0x142)]=function(){const _0x25f56a=_0x39e0eb;if(!PIXI[_0x25f56a(0xfb)][_0x25f56a(0x1a0)])return;!!this[_0x25f56a(0x162)][_0x25f56a(0x17d)]&&(this[_0x25f56a(0x162)][_0x25f56a(0x17d)]['animated']&&(this[_0x25f56a(0x162)][_0x25f56a(0x17d)][_0x25f56a(0x123)]=Math['random']()*0x3));},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x12d)]=function(_0x235e65){const _0x60b37b=_0x39e0eb;!!this[_0x60b37b(0x162)][_0x60b37b(0x17d)]&&(this['_horrorFilters'][_0x60b37b(0x17d)][_0x60b37b(0x167)]=_0x235e65);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x1c3)]=function(_0x489f41){const _0x40b6f6=_0x39e0eb;!!this[_0x40b6f6(0x162)][_0x40b6f6(0x17d)]&&(this[_0x40b6f6(0x162)]['noiseFilter'][_0x40b6f6(0x158)]=_0x489f41);},Sprite['prototype'][_0x39e0eb(0x1e6)]=function(){const _0x5adeb3=_0x39e0eb;if(!PIXI[_0x5adeb3(0xfb)][_0x5adeb3(0x131)])return;!this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)]&&(this['_horrorFilters'][_0x5adeb3(0x14d)]=new PIXI[(_0x5adeb3(0xfb))][(_0x5adeb3(0x131))](),this[_0x5adeb3(0x122)](this[_0x5adeb3(0x162)]['glitchFilter'])),this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)]['slices']=0xa,this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)][_0x5adeb3(0x12b)]=0x64,this['_horrorFilters'][_0x5adeb3(0x14d)][_0x5adeb3(0x192)]=0x5,this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)][_0x5adeb3(0x103)]=0xa,this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)][_0x5adeb3(0x158)]=!![],this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)][_0x5adeb3(0x1cd)]=0x12c,this[_0x5adeb3(0x162)][_0x5adeb3(0x14d)][_0x5adeb3(0x12e)]=0x1e;},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x1b0)]=function(){const _0x5f2667=_0x39e0eb;!!this['_horrorFilters'][_0x5f2667(0x14d)]&&(this[_0x5f2667(0x14c)](this[_0x5f2667(0x162)][_0x5f2667(0x14d)]),this['_horrorFilters'][_0x5f2667(0x14d)]=undefined);},Sprite[_0x39e0eb(0x180)]['updateHorrorGlitch']=function(){const _0x3e0654=_0x39e0eb;if(!PIXI[_0x3e0654(0xfb)][_0x3e0654(0x131)])return;if(!!this[_0x3e0654(0x162)][_0x3e0654(0x14d)]){if(this[_0x3e0654(0x1df)]&&this[_0x3e0654(0x162)][_0x3e0654(0x14d)]['animated']){var _0x26d9de=new PIXI[(_0x3e0654(0xfb))][(_0x3e0654(0x131))](),_0x2a4c5f=[_0x3e0654(0x153),_0x3e0654(0x12b),'sliceMin',_0x3e0654(0x103),_0x3e0654(0x158),_0x3e0654(0x1cd),_0x3e0654(0x12e),_0x3e0654(0x1ae)];this[_0x3e0654(0x162)]['glitchFilter'][_0x3e0654(0x1ae)]=![];for(var _0x2aa01f=0x0;_0x2aa01f<_0x2a4c5f[_0x3e0654(0x19c)];_0x2aa01f++){var _0x5065e3=_0x2a4c5f[_0x2aa01f];_0x26d9de[_0x5065e3]=this[_0x3e0654(0x162)][_0x3e0654(0x14d)][_0x5065e3];}var _0x153efd=this[_0x3e0654(0xfb)][_0x3e0654(0x115)](this[_0x3e0654(0x162)]['glitchFilter']);this[_0x3e0654(0xfb)][_0x153efd]=this[_0x3e0654(0x101)](_0x26d9de),this[_0x3e0654(0x162)][_0x3e0654(0x14d)]=this[_0x3e0654(0xfb)][_0x153efd];}if(this['_horrorFiltersGlitchSpecial']&&this[_0x3e0654(0x162)][_0x3e0654(0x14d)][_0x3e0654(0x1ae)]){this[_0x3e0654(0x162)][_0x3e0654(0x14d)][_0x3e0654(0x1ae)]=![],this[_0x3e0654(0x162)][_0x3e0654(0x14d)][_0x3e0654(0x158)]=![];var _0x26d9de=new PIXI[(_0x3e0654(0xfb))][(_0x3e0654(0x131))](),_0x2a4c5f=[_0x3e0654(0x153),_0x3e0654(0x12b),_0x3e0654(0x192),_0x3e0654(0x103),'animated','aniFrequency',_0x3e0654(0x12e),_0x3e0654(0x1ae)];for(var _0x2aa01f=0x0;_0x2aa01f<_0x2a4c5f[_0x3e0654(0x19c)];_0x2aa01f++){var _0x5065e3=_0x2a4c5f[_0x2aa01f];_0x26d9de[_0x5065e3]=this[_0x3e0654(0x162)][_0x3e0654(0x14d)][_0x5065e3],_0x5065e3==='refreshRequest'&&(this[_0x3e0654(0x162)][_0x3e0654(0x14d)][_0x5065e3]=![]);}var _0x153efd=this['filters']['indexOf'](this[_0x3e0654(0x162)][_0x3e0654(0x14d)]);_0x26d9de[_0x3e0654(0x1b5)](),this[_0x3e0654(0xfb)][_0x153efd]=this[_0x3e0654(0x101)](_0x26d9de),this[_0x3e0654(0x162)][_0x3e0654(0x14d)]=this[_0x3e0654(0xfb)][_0x153efd];}else this[_0x3e0654(0x101)](this[_0x3e0654(0x162)][_0x3e0654(0x14d)]);}},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x101)]=function(_0x5030f3){const _0xe26f=_0x39e0eb;if(_0x5030f3['animated']){var _0x3fdc04=Graphics['frameCount']%_0x5030f3[_0xe26f(0x1cd)],_0x1bbf05=_0x5030f3[_0xe26f(0x12e)];if(_0x3fdc04<Math[_0xe26f(0x183)](_0x1bbf05)+0x1){var _0x52ed14=_0x5030f3[_0xe26f(0x103)]-_0x5030f3[_0xe26f(0x192)],_0x1cb386=Math[_0xe26f(0x183)](_0x52ed14)+_0x5030f3[_0xe26f(0x103)];_0x5030f3[_0xe26f(0x153)]=_0x1cb386;}else _0x5030f3['slices']=0x0;}else{if(_0x5030f3[_0xe26f(0x153)]===0x0){var _0x52ed14=_0x5030f3[_0xe26f(0x103)]-_0x5030f3[_0xe26f(0x192)],_0x1cb386=Math['randomInt'](_0x52ed14)+_0x5030f3[_0xe26f(0x103)];_0x5030f3[_0xe26f(0x153)]=_0x1cb386;}else _0x5030f3[_0xe26f(0x1ae)]&&(_0x5030f3[_0xe26f(0x1ae)]=undefined,_0x5030f3['refresh']());}return _0x5030f3;},Sprite['prototype'][_0x39e0eb(0x17e)]=function(_0x2965a6,_0x3fd23f,_0xc9c9b){const _0x40b843=_0x39e0eb;!!this[_0x40b843(0x162)][_0x40b843(0x14d)]&&(_0x3fd23f===undefined&&(_0x3fd23f=Math[_0x40b843(0x16a)](_0x2965a6/0x2)),_0xc9c9b===undefined&&(_0xc9c9b=_0x2965a6),this[_0x40b843(0x162)][_0x40b843(0x14d)][_0x40b843(0x192)]=_0x3fd23f,this[_0x40b843(0x162)][_0x40b843(0x14d)][_0x40b843(0x103)]=_0xc9c9b,this[_0x40b843(0x162)]['glitchFilter']['slices']=_0x2965a6,this[_0x40b843(0x162)][_0x40b843(0x14d)][_0x40b843(0x1b5)]());},Sprite['prototype'][_0x39e0eb(0x12f)]=function(_0x8b4b94){const _0x586f06=_0x39e0eb;!!this[_0x586f06(0x162)]['glitchFilter']&&(this[_0x586f06(0x162)][_0x586f06(0x14d)]['offset']=_0x8b4b94);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x1b1)]=function(_0x12e0b1){const _0xbc5e61=_0x39e0eb;!!this[_0xbc5e61(0x162)][_0xbc5e61(0x14d)]&&(this[_0xbc5e61(0x162)][_0xbc5e61(0x14d)]['animated']=_0x12e0b1);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x161)]=function(_0x2616a4){const _0x1f0a62=_0x39e0eb;!!this[_0x1f0a62(0x162)][_0x1f0a62(0x14d)]&&(this[_0x1f0a62(0x162)]['glitchFilter'][_0x1f0a62(0x1cd)]=_0x2616a4);},Sprite['prototype'][_0x39e0eb(0x166)]=function(_0x23fd21){const _0x161359=_0x39e0eb;!!this[_0x161359(0x162)]['glitchFilter']&&(this[_0x161359(0x162)]['glitchFilter'][_0x161359(0x12e)]=_0x23fd21);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x1bb)]=function(){const _0x41a1ec=_0x39e0eb;if(!PIXI[_0x41a1ec(0xfb)][_0x41a1ec(0x117)])return;!this[_0x41a1ec(0x162)]['tvFilter']&&(this[_0x41a1ec(0x162)][_0x41a1ec(0x132)]=new PIXI[(_0x41a1ec(0xfb))][(_0x41a1ec(0x117))](),this[_0x41a1ec(0x122)](this[_0x41a1ec(0x162)]['tvFilter'])),this[_0x41a1ec(0x162)]['tvFilter'][_0x41a1ec(0x1dd)]=0x5,this[_0x41a1ec(0x162)][_0x41a1ec(0x132)]['vignetting']=0.3,this[_0x41a1ec(0x162)][_0x41a1ec(0x132)][_0x41a1ec(0x158)]=!![],this[_0x41a1ec(0x162)]['tvFilter'][_0x41a1ec(0x164)]=0.25;},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0xfe)]=function(){const _0x2cf3e9=_0x39e0eb;!!this['_horrorFilters'][_0x2cf3e9(0x132)]&&(this[_0x2cf3e9(0x14c)](this['_horrorFilters'][_0x2cf3e9(0x132)]),this[_0x2cf3e9(0x162)][_0x2cf3e9(0x132)]=undefined);},Sprite['prototype']['updateHorrorTV']=function(){const _0x2b8f71=_0x39e0eb;if(!PIXI[_0x2b8f71(0xfb)][_0x2b8f71(0x117)])return;!!this[_0x2b8f71(0x162)][_0x2b8f71(0x132)]&&(this['_horrorFilters'][_0x2b8f71(0x132)][_0x2b8f71(0x158)]&&(this[_0x2b8f71(0x162)][_0x2b8f71(0x132)][_0x2b8f71(0x1b7)]+=this[_0x2b8f71(0x162)][_0x2b8f71(0x132)][_0x2b8f71(0x164)]));},Sprite['prototype'][_0x39e0eb(0x13c)]=function(_0x31c0cd){const _0x164952=_0x39e0eb;!!this[_0x164952(0x162)][_0x164952(0x132)]&&(this[_0x164952(0x162)][_0x164952(0x132)][_0x164952(0x1dd)]=_0x31c0cd);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x102)]=function(_0x28f3f1){const _0x86cce=_0x39e0eb;!!this[_0x86cce(0x162)][_0x86cce(0x132)]&&(this[_0x86cce(0x162)]['tvFilter'][_0x86cce(0x15c)]=_0x28f3f1);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x1b9)]=function(_0x52a169){const _0x28eb9f=_0x39e0eb;!!this[_0x28eb9f(0x162)][_0x28eb9f(0x132)]&&(this[_0x28eb9f(0x162)][_0x28eb9f(0x132)][_0x28eb9f(0x158)]=_0x52a169);},Sprite[_0x39e0eb(0x180)][_0x39e0eb(0x189)]=function(_0x5a6d85){const _0xf64196=_0x39e0eb;!!this[_0xf64196(0x162)][_0xf64196(0x132)]&&(this['_horrorFilters'][_0xf64196(0x132)][_0xf64196(0x164)]=_0x5a6d85);},Sprite[_0x39e0eb(0x180)]['createHorrorColor']=function(){const _0x1e9418=_0x39e0eb;if(!PIXI['filters'][_0x1e9418(0x1e4)])return;!this[_0x1e9418(0x162)][_0x1e9418(0x119)]&&(this['_horrorFilters'][_0x1e9418(0x119)]=new PIXI[(_0x1e9418(0xfb))][(_0x1e9418(0x1e4))](),this[_0x1e9418(0x122)](this[_0x1e9418(0x162)][_0x1e9418(0x119)]));},Sprite[_0x39e0eb(0x180)]['removeHorrorColor']=function(){const _0x98720c=_0x39e0eb;!!this[_0x98720c(0x162)][_0x98720c(0x119)]&&(this[_0x98720c(0x14c)](this[_0x98720c(0x162)][_0x98720c(0x119)]),this[_0x98720c(0x162)][_0x98720c(0x119)]=undefined);},Sprite['prototype'][_0x39e0eb(0xfd)]=function(){const _0x24b984=_0x39e0eb;if(!PIXI[_0x24b984(0xfb)][_0x24b984(0x1e4)])return;if(!!this['_horrorFilters'][_0x24b984(0x119)]){const _0x1b6f87=this[_0x24b984(0x162)]['colorFilter'];if(_0x1b6f87[_0x24b984(0x1d0)]!==_0x1b6f87[_0x24b984(0x1b8)]){_0x1b6f87['reset'](),_0x1b6f87['lastType']=_0x1b6f87[_0x24b984(0x1b8)];const _0x1a66d3=_0x1b6f87['type'];switch(_0x1a66d3[_0x24b984(0x138)]()[_0x24b984(0x112)]()){case _0x24b984(0x152):_0x1b6f87['toBGR']();break;case _0x24b984(0x14e):_0x1b6f87[_0x24b984(0x17b)]();break;case _0x24b984(0x1c2):_0x1b6f87[_0x24b984(0x1c2)](!![]);break;case'desaturate':_0x1b6f87[_0x24b984(0x137)]();break;case _0x24b984(0x1c9):_0x1b6f87[_0x24b984(0x1c9)](0.5,!![]);break;case'kodachrome':_0x1b6f87[_0x24b984(0x1c0)](!![]);break;case _0x24b984(0x1d2):_0x1b6f87[_0x24b984(0x1d2)]();break;case _0x24b984(0x10e):_0x1b6f87[_0x24b984(0x10e)]();break;case _0x24b984(0x17f):_0x1b6f87[_0x24b984(0x17f)]();break;case _0x24b984(0x15b):_0x1b6f87[_0x24b984(0x15b)](0x32);break;case _0x24b984(0x18d):_0x1b6f87[_0x24b984(0x18d)]();break;case _0x24b984(0x19b):_0x1b6f87[_0x24b984(0x19b)](!![]);break;case _0x24b984(0x1aa):_0x1b6f87[_0x24b984(0x1aa)](!![]);break;default:_0x1b6f87[_0x24b984(0x1b4)]();break;}}}},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x168)]=Sprite_Character[_0x39e0eb(0x180)][_0x39e0eb(0x184)],Sprite_Character['prototype']['initialize']=function(_0x539294){const _0x19a677=_0x39e0eb;VisuMZ[_0x19a677(0x1ba)][_0x19a677(0x168)][_0x19a677(0x1cb)](this,_0x539294),this[_0x19a677(0x125)]=_0x539294,this[_0x19a677(0x1df)]=!![];},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x13b)]=Sprite_Battler[_0x39e0eb(0x180)]['setBattler'],Sprite_Battler['prototype']['setBattler']=function(_0x1ed85a){const _0x277d58=_0x39e0eb;VisuMZ[_0x277d58(0x1ba)][_0x277d58(0x13b)]['call'](this,_0x1ed85a),this[_0x277d58(0x125)]=_0x1ed85a,this['_horrorFiltersGlitchSpecial']=!![];},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x1a6)]=Sprite_Picture['prototype']['initialize'],Sprite_Picture[_0x39e0eb(0x180)][_0x39e0eb(0x184)]=function(_0x3d530a){const _0x426d64=_0x39e0eb;VisuMZ[_0x426d64(0x1ba)][_0x426d64(0x1a6)][_0x426d64(0x1cb)](this,_0x3d530a);},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x19f)]=Sprite_Picture[_0x39e0eb(0x180)][_0x39e0eb(0x1ab)],Sprite_Picture[_0x39e0eb(0x180)]['updateBitmap']=function(){const _0x502a65=_0x39e0eb;VisuMZ[_0x502a65(0x1ba)][_0x502a65(0x19f)][_0x502a65(0x1cb)](this),this[_0x502a65(0x19d)]&&!this['_horrorFiltersSource']?this['_horrorFiltersSource']=this[_0x502a65(0x116)]():this[_0x502a65(0x125)]=undefined;},VisuMZ['HorrorEffects'][_0x39e0eb(0x143)]=Spriteset_Map[_0x39e0eb(0x180)][_0x39e0eb(0x184)],Spriteset_Map[_0x39e0eb(0x180)][_0x39e0eb(0x184)]=function(){const _0x2dfd08=_0x39e0eb;VisuMZ[_0x2dfd08(0x1ba)][_0x2dfd08(0x143)][_0x2dfd08(0x1cb)](this),this[_0x2dfd08(0x125)]=$gameScreen;},VisuMZ[_0x39e0eb(0x1ba)][_0x39e0eb(0x1cf)]=Spriteset_Battle[_0x39e0eb(0x180)]['initialize'],Spriteset_Battle['prototype'][_0x39e0eb(0x184)]=function(){const _0x4d90a1=_0x39e0eb;VisuMZ[_0x4d90a1(0x1ba)]['Spriteset_Battle_initialize'][_0x4d90a1(0x1cb)](this),this['_horrorFiltersSource']=$gameSystem;};