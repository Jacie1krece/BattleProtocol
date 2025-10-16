//=============================================================================
// VisuStella MZ - Weakness Popups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.10] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
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
 * If you decide to use front view with the VisuStella MZ Battle Core, Weakness
 * Popups will show up for actors above the Battle Status Window. Normally,
 * they would not appear in front view without the Battle Core because normal
 * damage popups don't appear there either.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 * 
 *   Stack Offset X:
 *   - Offsets the popup x position if stacked with a weakness.
 *   - Negative: left. Positive: right.
 *   - For Critical Hit Popups ONLY!
 * 
 *   Stack Offset Y:
 *   - Offsets the popup y position if stacked with a weakness.
 *   - Negative: up. Positive: down.
 *   - For Critical Hit Popups ONLY!
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 * 
 * Custom Animation
 * 
 *   Animation ID:
 *   - Play this animation when weakness effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the weakness effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the weakness effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 * 
 *   Variance:
 *   - How much variance should be given to offset X?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Verison 1.10: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Any Weakness > Animation ID
 * **** Play this animation when weakness effect activates.
 * **** Requires VisuMZ_0_CoreEngine.
 * *** Plugin Parameters > Any Weakness > Animation ID > Mirror Animation
 * *** Plugin Parameters > Any Weakness > Animation ID > Mute Animation
 * **** Mirrors/mutes the weakness effect animation?
 * **** Requires VisuMZ_0_CoreEngine.
 * 
 * Version 1.09: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Critical > Stack Offset X
 * *** Plugin Parameters > Critical > Stack Offset Y
 * **** Offsets the popup x/y position if stacked with a weakness popup.
 * 
 * Version 1.08: May 16, 2024
 * * Compatibility Update!
 * ** Added better compatibility with VisuStella MZ Frontview Battle UI.
 * 
 * Version 1.07: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a problem with certain elemental rates displaying the wrong popup.
 *    Fix made by Irina.
 * 
 * Version 1.06: October 27, 2022
 * * Bug Fixes!
 * ** Fixed a bug where "HP Drain" damage type would not proc weakness popups.
 *    Fix made by Olivia.
 * 
 * Version 1.05: December 30, 2021
 * * Bug Fixes!
 * ** Corrected a bug that caused 0 damage/healing when this plugin is on.
 *    Fix made by Olivia.
 * 
 * Version 1.04: December 23, 2021
 * * Compatibility Update!
 * ** Weakness Popups now ignore the notetags involving caster element damage
 *    when calculating the type of popup to display. Update made by Olivia.
 * 
 * Version 1.03: June 4, 2021
 * * Compatibility Update!
 * ** Added automatic offset for those using UI Areas and Widths with different
 *    values from their screen resolutions once the Action Sequence Camera
 *    plugin is enabled. Update made by Irina.
 * 
 * Version 1.02: March 5, 2021
 * * Bug Fixes!
 * ** Weakness Popups for front view actors will no longer appear at the top
 *    of the screen. Fix made by Irina.
 * ** Weakness Popups will no longer shift positions prior to an actor's status
 *    window positioning anchor. Fix made by Irina.
 * * Documentation Update!
 * ** Added "Extra Features" section for more clarity on what having the Battle
 *    Core enables for Front View games.
 * 
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
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
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param CritStackOffsetX:num
 * @text Stack Offset X
 * @parent Critical:struct
 * @desc Offsets the popup x position if stacked with a weakness.
 * Negative: left. Positive: right.
 * @default +48
 *
 * @param CritStackOffsetY:num
 * @text Stack Offset Y
 * @parent Critical:struct
 * @desc Offsets the popup y position if stacked with a weakness.
 * Negative: up. Positive: down.
 * @default -48
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when weakness effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param AniMirror:eval
 * @text Mirror Animation
 * @parent AnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the weakness effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param AniMute:eval
 * @text Mute Animation
 * @parent AnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the weakness effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

const _0x294dc9=_0x19ba;(function(_0x569aac,_0x46c833){const _0x12029e=_0x19ba,_0x2b36f6=_0x569aac();while(!![]){try{const _0x2a3a50=-parseInt(_0x12029e(0x111))/0x1*(-parseInt(_0x12029e(0x154))/0x2)+parseInt(_0x12029e(0x174))/0x3*(parseInt(_0x12029e(0x162))/0x4)+parseInt(_0x12029e(0x140))/0x5*(-parseInt(_0x12029e(0x117))/0x6)+-parseInt(_0x12029e(0x135))/0x7+parseInt(_0x12029e(0x128))/0x8*(parseInt(_0x12029e(0xf3))/0x9)+-parseInt(_0x12029e(0x170))/0xa+parseInt(_0x12029e(0x169))/0xb;if(_0x2a3a50===_0x46c833)break;else _0x2b36f6['push'](_0x2b36f6['shift']());}catch(_0x49b24d){_0x2b36f6['push'](_0x2b36f6['shift']());}}}(_0x2506,0x5d764));var label=_0x294dc9(0x136),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x294dc9(0x175)](function(_0x39f3e0){const _0x4d6828=_0x294dc9;return _0x39f3e0['status']&&_0x39f3e0[_0x4d6828(0x181)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x294dc9(0x156)]||{},VisuMZ[_0x294dc9(0x15d)]=function(_0x49de96,_0x1d5c77){const _0x25c42c=_0x294dc9;for(const _0x56e9a0 in _0x1d5c77){if(_0x56e9a0[_0x25c42c(0x17a)](/(.*):(.*)/i)){const _0xc9fba3=String(RegExp['$1']),_0x37ea6e=String(RegExp['$2'])[_0x25c42c(0xe7)]()[_0x25c42c(0xee)]();let _0x49d7cb,_0x1bcafa,_0x412a36;switch(_0x37ea6e){case _0x25c42c(0xdf):_0x49d7cb=_0x1d5c77[_0x56e9a0]!==''?Number(_0x1d5c77[_0x56e9a0]):0x0;break;case'ARRAYNUM':_0x1bcafa=_0x1d5c77[_0x56e9a0]!==''?JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0]):[],_0x49d7cb=_0x1bcafa[_0x25c42c(0x17b)](_0x3f508d=>Number(_0x3f508d));break;case'EVAL':_0x49d7cb=_0x1d5c77[_0x56e9a0]!==''?eval(_0x1d5c77[_0x56e9a0]):null;break;case _0x25c42c(0x17f):_0x1bcafa=_0x1d5c77[_0x56e9a0]!==''?JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0]):[],_0x49d7cb=_0x1bcafa[_0x25c42c(0x17b)](_0x1a6d05=>eval(_0x1a6d05));break;case _0x25c42c(0x186):_0x49d7cb=_0x1d5c77[_0x56e9a0]!==''?JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0]):'';break;case'ARRAYJSON':_0x1bcafa=_0x1d5c77[_0x56e9a0]!==''?JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0]):[],_0x49d7cb=_0x1bcafa[_0x25c42c(0x17b)](_0x2b9fb3=>JSON[_0x25c42c(0x15e)](_0x2b9fb3));break;case _0x25c42c(0x123):_0x49d7cb=_0x1d5c77[_0x56e9a0]!==''?new Function(JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0])):new Function(_0x25c42c(0x18d));break;case _0x25c42c(0x149):_0x1bcafa=_0x1d5c77[_0x56e9a0]!==''?JSON['parse'](_0x1d5c77[_0x56e9a0]):[],_0x49d7cb=_0x1bcafa['map'](_0x24f2c9=>new Function(JSON['parse'](_0x24f2c9)));break;case'STR':_0x49d7cb=_0x1d5c77[_0x56e9a0]!==''?String(_0x1d5c77[_0x56e9a0]):'';break;case'ARRAYSTR':_0x1bcafa=_0x1d5c77[_0x56e9a0]!==''?JSON['parse'](_0x1d5c77[_0x56e9a0]):[],_0x49d7cb=_0x1bcafa[_0x25c42c(0x17b)](_0x4dd4a8=>String(_0x4dd4a8));break;case _0x25c42c(0x153):_0x412a36=_0x1d5c77[_0x56e9a0]!==''?JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0]):{},_0x49d7cb=VisuMZ[_0x25c42c(0x15d)]({},_0x412a36);break;case'ARRAYSTRUCT':_0x1bcafa=_0x1d5c77[_0x56e9a0]!==''?JSON[_0x25c42c(0x15e)](_0x1d5c77[_0x56e9a0]):[],_0x49d7cb=_0x1bcafa[_0x25c42c(0x17b)](_0x3600a4=>VisuMZ[_0x25c42c(0x15d)]({},JSON[_0x25c42c(0x15e)](_0x3600a4)));break;default:continue;}_0x49de96[_0xc9fba3]=_0x49d7cb;}}return _0x49de96;},(_0x45fe3d=>{const _0xee40e7=_0x294dc9,_0x53497f=_0x45fe3d[_0xee40e7(0x166)];for(const _0x514949 of dependencies){if(!Imported[_0x514949]){alert(_0xee40e7(0x15a)[_0xee40e7(0x12c)](_0x53497f,_0x514949)),SceneManager[_0xee40e7(0x142)]();break;}}const _0x4b5afe=_0x45fe3d['description'];if(_0x4b5afe[_0xee40e7(0x17a)](/\[Version[ ](.*?)\]/i)){const _0x467646=Number(RegExp['$1']);_0x467646!==VisuMZ[label]['version']&&(alert(_0xee40e7(0x122)['format'](_0x53497f,_0x467646)),SceneManager[_0xee40e7(0x142)]());}if(_0x4b5afe[_0xee40e7(0x17a)](/\[Tier[ ](\d+)\]/i)){const _0x51a9b8=Number(RegExp['$1']);_0x51a9b8<tier?(alert(_0xee40e7(0x18c)[_0xee40e7(0x12c)](_0x53497f,_0x51a9b8,tier)),SceneManager[_0xee40e7(0x142)]()):tier=Math[_0xee40e7(0xfb)](_0x51a9b8,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0xee40e7(0x156)],_0x45fe3d[_0xee40e7(0x16b)]);})(pluginData),ColorManager[_0x294dc9(0x10e)]=function(_0x5f14d9){const _0x2f6bf8=_0x294dc9;return _0x5f14d9=String(_0x5f14d9),_0x5f14d9['match'](/#(.*)/i)?_0x2f6bf8(0x13c)['format'](String(RegExp['$1'])):this[_0x2f6bf8(0x11c)](Number(_0x5f14d9));},SceneManager[_0x294dc9(0x176)]=function(){const _0xf5b9f4=_0x294dc9;return this[_0xf5b9f4(0x172)]&&this[_0xf5b9f4(0x172)][_0xf5b9f4(0x126)]===Scene_Battle;},VisuMZ['WeaknessPopups'][_0x294dc9(0x137)]=Game_Action[_0x294dc9(0x184)][_0x294dc9(0x165)],Game_Action['prototype'][_0x294dc9(0x165)]=function(_0x4bbee2,_0x28f2a6){const _0x5eb468=_0x294dc9;VisuMZ[_0x5eb468(0x136)][_0x5eb468(0x137)][_0x5eb468(0xec)](this,_0x4bbee2,_0x28f2a6),this[_0x5eb468(0x17e)](_0x4bbee2,_0x28f2a6);},Game_Action[_0x294dc9(0x184)][_0x294dc9(0x17e)]=function(_0x1fee0b,_0x4f318f){const _0x262368=_0x294dc9;if(!SceneManager['isSceneBattle']())return;if(!this[_0x262368(0x12d)]()&&!this[_0x262368(0x177)]())return;this[_0x262368(0x15f)](_0x1fee0b,_0x4f318f),this['createWeaknessPopupsForCritical'](_0x1fee0b,_0x4f318f);},Game_Action[_0x294dc9(0x184)][_0x294dc9(0x115)]=function(_0x3aee55,_0x1fee12){const _0x1366c6=_0x294dc9,_0x2feb7b=_0x3aee55['result']();if(!_0x2feb7b[_0x1366c6(0xfe)])return;const _0x3c4d0c=SceneManager[_0x1366c6(0x172)]['_spriteset'];if(!_0x3c4d0c)return;_0x3c4d0c[_0x1366c6(0x151)](_0x3aee55,_0x1366c6(0x14a));},Game_Action[_0x294dc9(0x184)][_0x294dc9(0x15f)]=function(_0xe84d23,_0x4b5f95){const _0x3961f6=_0x294dc9,_0x2e4257=SceneManager[_0x3961f6(0x172)][_0x3961f6(0x16c)];if(!_0x2e4257)return;$gameTemp[_0x3961f6(0x105)]=!![];const _0x11b869=this[_0x3961f6(0x163)](_0xe84d23);$gameTemp[_0x3961f6(0x105)]=![];let _0x513d90=_0x3961f6(0x158);if(_0x11b869===0x0)_0x513d90=_0x3961f6(0xe8);else{if(_0x11b869<0x0)_0x513d90=_0x3961f6(0x109);else{if(_0x11b869>=0x2)_0x513d90=_0x3961f6(0x157);else{if(_0x11b869>=1.75)_0x513d90='Element175';else{if(_0x11b869>=1.5)_0x513d90=_0x3961f6(0xf4);else{if(_0x11b869>=1.25)_0x513d90=_0x3961f6(0x14b);else{if(_0x11b869>=1.1)_0x513d90=_0x3961f6(0x101);else{if(_0x11b869>=1.05)_0x513d90=_0x3961f6(0x16a);else{if(_0x11b869>=1.01)_0x513d90=_0x3961f6(0x14f);else{if(_0x11b869<=0.25)_0x513d90=_0x3961f6(0xf5);else{if(_0x11b869<=0.5)_0x513d90=_0x3961f6(0xeb);else{if(_0x11b869<=0.75)_0x513d90='Element75';else{if(_0x11b869<=0.9)_0x513d90=_0x3961f6(0xf7);else{if(_0x11b869<=0.95)_0x513d90=_0x3961f6(0x102);else _0x11b869<=0.99&&(_0x513d90='Element99');}}}}}}}}}}}}}_0x2e4257['createWeaknessPopupType'](_0xe84d23,_0x513d90);},VisuMZ['WeaknessPopups'][_0x294dc9(0xf2)]=Game_Action[_0x294dc9(0x184)][_0x294dc9(0x160)],Game_Action[_0x294dc9(0x184)][_0x294dc9(0x160)]=function(_0xa2c9a2,_0x6229e9){const _0x21bd43=_0x294dc9;if($gameTemp[_0x21bd43(0x105)])return 0x0;return VisuMZ[_0x21bd43(0x136)][_0x21bd43(0xf2)][_0x21bd43(0xec)](this,_0xa2c9a2,_0x6229e9);},VisuMZ['WeaknessPopups'][_0x294dc9(0x15b)]=Game_Action['prototype'][_0x294dc9(0xf0)],Game_Action[_0x294dc9(0x184)]['calcUserElementDamageRate']=function(_0x3ceeef,_0x1c8d7a){const _0x3cca0a=_0x294dc9;if($gameTemp[_0x3cca0a(0x105)])return 0x1;return VisuMZ[_0x3cca0a(0x136)]['Game_Action_calcUserElementDamageRate'][_0x3cca0a(0xec)](this,_0x3ceeef,_0x1c8d7a);},VisuMZ['WeaknessPopups'][_0x294dc9(0x103)]=Game_Action[_0x294dc9(0x184)][_0x294dc9(0x121)],Game_Action[_0x294dc9(0x184)][_0x294dc9(0x121)]=function(_0x44de83,_0x3ec35c){const _0x338047=_0x294dc9;if($gameTemp['bypassUserElementBonus'])return 0x0;return VisuMZ[_0x338047(0x136)][_0x338047(0x103)]['call'](this,_0x44de83,_0x3ec35c);};function _0x19ba(_0xdd6d70,_0x35fe4e){const _0x2506ec=_0x2506();return _0x19ba=function(_0x19bac1,_0x277dba){_0x19bac1=_0x19bac1-0xdd;let _0x1f83bd=_0x2506ec[_0x19bac1];return _0x1f83bd;},_0x19ba(_0xdd6d70,_0x35fe4e);}function Sprite_WeaknessPopup(){const _0x561641=_0x294dc9;this[_0x561641(0xe2)](...arguments);}Sprite_WeaknessPopup[_0x294dc9(0x184)]=Object[_0x294dc9(0x143)](Sprite[_0x294dc9(0x184)]),Sprite_WeaknessPopup['prototype'][_0x294dc9(0x126)]=Sprite_WeaknessPopup,Sprite_WeaknessPopup['CRITICAL_STACK_OFFSET']={'offsetX':VisuMZ['WeaknessPopups']['Settings'][_0x294dc9(0x12a)],'offsetY':VisuMZ[_0x294dc9(0x136)]['Settings']['CritStackOffsetY']},Sprite_WeaknessPopup[_0x294dc9(0x184)][_0x294dc9(0xe2)]=function(_0x17e9e8,_0x64dc94){const _0x34715d=_0x294dc9;this[_0x34715d(0x183)]=_0x17e9e8,this['_data']=_0x64dc94,this[_0x34715d(0xe6)](),Sprite['prototype'][_0x34715d(0xe2)][_0x34715d(0xec)](this),this[_0x34715d(0x10f)](),this[_0x34715d(0x134)]();},Sprite_WeaknessPopup[_0x294dc9(0x184)][_0x294dc9(0x10f)]=function(){const _0x191af1=_0x294dc9;this[_0x191af1(0x106)][_0x191af1(0x118)]?this[_0x191af1(0x125)]():this[_0x191af1(0xfd)]();},Sprite_WeaknessPopup['prototype']['loadWeaknessPopupBitmap']=function(){const _0x487aab=_0x294dc9;this['bitmap']=ImageManager['loadSystem'](this['_data'][_0x487aab(0x118)]);},Sprite_WeaknessPopup[_0x294dc9(0x184)]['createBitmapImage']=function(){const _0x3b9efe=_0x294dc9;this[_0x3b9efe(0x147)]=new Bitmap(this[_0x3b9efe(0x106)][_0x3b9efe(0x145)],this[_0x3b9efe(0x106)]['bitmapHeight']),this[_0x3b9efe(0x147)][_0x3b9efe(0x14e)]=this[_0x3b9efe(0x106)][_0x3b9efe(0x14e)],this['bitmap'][_0x3b9efe(0x178)]=this[_0x3b9efe(0x106)][_0x3b9efe(0x178)],this[_0x3b9efe(0x147)][_0x3b9efe(0xf9)]=this[_0x3b9efe(0x106)][_0x3b9efe(0xf9)],this[_0x3b9efe(0x147)][_0x3b9efe(0xe1)]=this[_0x3b9efe(0x106)]['fontItalic'],this['bitmap'][_0x3b9efe(0x11c)]=ColorManager[_0x3b9efe(0x10e)](this[_0x3b9efe(0x106)][_0x3b9efe(0x11c)]),this[_0x3b9efe(0x147)][_0x3b9efe(0x11f)]=this[_0x3b9efe(0x106)][_0x3b9efe(0x11f)],this[_0x3b9efe(0x147)]['outlineColor']=this['_data'][_0x3b9efe(0x146)],this[_0x3b9efe(0x147)][_0x3b9efe(0x148)](this[_0x3b9efe(0x106)]['text'],0x0,0x0,this['bitmap'][_0x3b9efe(0xe3)],this['bitmap'][_0x3b9efe(0x13a)],_0x3b9efe(0x132));},Sprite_WeaknessPopup[_0x294dc9(0x184)][_0x294dc9(0xe6)]=function(){const _0x129028=_0x294dc9;this[_0x129028(0x113)]=this[_0x129028(0x106)][_0x129028(0x13d)],this[_0x129028(0x10c)]=this[_0x129028(0x106)]['startSpeedY'],this[_0x129028(0x150)]=this[_0x129028(0x106)][_0x129028(0x120)],this[_0x129028(0x168)]=this['_data'][_0x129028(0xf1)],this[_0x129028(0x104)]=this[_0x129028(0x106)][_0x129028(0x119)];},Sprite_WeaknessPopup['prototype'][_0x294dc9(0x134)]=function(){const _0x250aed=_0x294dc9,_0x3c1b1c=SceneManager[_0x250aed(0x172)][_0x250aed(0x16f)];!$gameSystem[_0x250aed(0xea)]()&&this[_0x250aed(0x183)][_0x250aed(0x183)][_0x250aed(0xe0)]()&&(Imported[_0x250aed(0x187)]&&_0x3c1b1c[_0x250aed(0x13e)](this[_0x250aed(0x183)][_0x250aed(0x183)][_0x250aed(0x152)]()));this['x']=this[_0x250aed(0x183)][_0x250aed(0x189)]??this[_0x250aed(0x183)]['x'],this['x']+=this[_0x250aed(0x106)][_0x250aed(0x110)];Imported[_0x250aed(0x159)]&&this['_battler']['_battler'][_0x250aed(0xe0)]()&&!$gameSystem['isSideView']()?this['y']=-0x24:(this['y']=this['_battler'][_0x250aed(0x16d)]??this['_battler']['y'],this['y']-=this[_0x250aed(0x183)][_0x250aed(0x13a)]*this[_0x250aed(0x183)][_0x250aed(0x12f)]['y'],this['y']+=this[_0x250aed(0x106)][_0x250aed(0xe4)]);if(Imported[_0x250aed(0x187)]&&VisuMZ[_0x250aed(0x17d)][_0x250aed(0xff)]>=1.38){this['x']+=this[_0x250aed(0x183)][_0x250aed(0x11b)]();const _0x1072e1=this['_battler'][_0x250aed(0xef)][_0x250aed(0x12f)]['y'];this['y']+=this[_0x250aed(0x183)][_0x250aed(0x179)]();}const _0x4ae2b2=this[_0x250aed(0x106)][_0x250aed(0x161)]||0x0,_0x30f1dd=this[_0x250aed(0x106)][_0x250aed(0x130)]||0x0;this['x']+=Math[_0x250aed(0x127)](_0x4ae2b2*0x2)-_0x4ae2b2,this['y']+=Math[_0x250aed(0x127)](_0x30f1dd*0x2)-_0x30f1dd,this['anchor']['x']=0.5,this['anchor']['y']=0.5,this[_0x250aed(0x12f)]['x']=this['_data'][_0x250aed(0x16e)],this['scale']['y']=this['_data'][_0x250aed(0x167)],this[_0x250aed(0x11e)]=this[_0x250aed(0x106)][_0x250aed(0x18a)],this[_0x250aed(0x10b)]=this['_data'][_0x250aed(0xfc)];},Sprite_WeaknessPopup[_0x294dc9(0x184)][_0x294dc9(0x141)]=function(){const _0x3bef4f=_0x294dc9;Sprite['prototype']['update'][_0x3bef4f(0xec)](this),this[_0x3bef4f(0x10a)](),this['updateScaling'](),this['updateOpacity']();},Sprite_WeaknessPopup[_0x294dc9(0x184)][_0x294dc9(0x10a)]=function(){const _0x583026=_0x294dc9;this['x']+=this['_speedX'],this['y']+=this[_0x583026(0x10c)],this[_0x583026(0x113)]+=this[_0x583026(0x106)][_0x583026(0x10d)],this['_speedY']+=this['_data'][_0x583026(0x182)];},Sprite_WeaknessPopup[_0x294dc9(0x184)][_0x294dc9(0x15c)]=function(){const _0x17fb63=_0x294dc9;if(this[_0x17fb63(0x104)]>0x0){const _0x2d0a1e=this[_0x17fb63(0x104)];this[_0x17fb63(0x12f)]['x']=(this['scale']['x']*(_0x2d0a1e-0x1)+this[_0x17fb63(0x11e)])/_0x2d0a1e,this[_0x17fb63(0x12f)]['y']=(this['scale']['y']*(_0x2d0a1e-0x1)+this[_0x17fb63(0x10b)])/_0x2d0a1e,this[_0x17fb63(0x104)]--;}else this[_0x17fb63(0x12f)]['x']=0x1,this[_0x17fb63(0x12f)]['y']=0x1;},Sprite_WeaknessPopup['prototype'][_0x294dc9(0x11d)]=function(){const _0x353124=_0x294dc9;if(this['_opaqueDuration']-->0x0)return;if(this[_0x353124(0x168)]>0x0){const _0xac9746=this[_0x353124(0x168)];this[_0x353124(0x17c)]=(this['opacity']*(_0xac9746-0x1)+0x0)/_0xac9746,this[_0x353124(0x168)]--;}else{const _0x1e357b=this[_0x353124(0x14d)];_0x1e357b&&(_0x1e357b[_0x353124(0x12b)](this),this[_0x353124(0x131)]());}},VisuMZ[_0x294dc9(0x136)][_0x294dc9(0x108)]=Spriteset_Battle[_0x294dc9(0x184)]['createBattleField'],Spriteset_Battle['prototype'][_0x294dc9(0x155)]=function(){const _0x4b1a8c=_0x294dc9;VisuMZ[_0x4b1a8c(0x136)][_0x4b1a8c(0x108)]['call'](this),this[_0x4b1a8c(0x144)]();},Spriteset_Battle['prototype']['createWeaknessPopupsContainer']=function(){const _0x3ed025=_0x294dc9;if(this[_0x3ed025(0x171)])return;this[_0x3ed025(0x171)]=new Sprite(),this[_0x3ed025(0x171)]['x']=this[_0x3ed025(0x124)]['x'],this['_weaknessPopupsContainer']['y']=this[_0x3ed025(0x124)]['y'];const _0xca0166=Math[_0x3ed025(0x180)]((Graphics[_0x3ed025(0xe3)]-Graphics[_0x3ed025(0xe5)])/0x2),_0x208e83=Math['ceil']((Graphics[_0x3ed025(0x13a)]-Graphics['boxHeight'])/0x2);this[_0x3ed025(0x171)]['x']+=_0xca0166,this[_0x3ed025(0x171)]['y']+=_0x208e83,this[_0x3ed025(0x12e)](this[_0x3ed025(0x171)]);},VisuMZ[_0x294dc9(0x136)]['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x294dc9(0x184)][_0x294dc9(0x18b)],Spriteset_Battle[_0x294dc9(0x184)]['adjustFlippedBattlefield']=function(){const _0x7f0726=_0x294dc9;VisuMZ[_0x7f0726(0x136)]['Spriteset_Battle_adjustFlippedBattlefield']['call'](this);!this[_0x7f0726(0x171)]&&this[_0x7f0726(0x144)]();if(!this[_0x7f0726(0x114)]())return;this['_weaknessPopupsContainer']['scale']['x']=-0x1,this[_0x7f0726(0x171)]['x']=this[_0x7f0726(0x124)]['x']+this['_battleField'][_0x7f0726(0xe3)];},VisuMZ['WeaknessPopups'][_0x294dc9(0x138)]=Spriteset_Battle[_0x294dc9(0x184)][_0x294dc9(0x141)],Spriteset_Battle[_0x294dc9(0x184)][_0x294dc9(0x141)]=function(){const _0xfe2147=_0x294dc9;VisuMZ[_0xfe2147(0x136)][_0xfe2147(0x138)][_0xfe2147(0xec)](this),this['updateWeaknessPopupsContainer']();},Spriteset_Battle['prototype'][_0x294dc9(0x13f)]=function(){const _0x1fd9ac=_0x294dc9;if(!this[_0x1fd9ac(0x171)])return;if(!this[_0x1fd9ac(0xf8)])return;this[_0x1fd9ac(0x171)]['x']=this[_0x1fd9ac(0xf8)]['x'],this[_0x1fd9ac(0x171)]['y']=this[_0x1fd9ac(0xf8)]['y'];if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x172bb1=Math['ceil']((Graphics[_0x1fd9ac(0xe3)]-Graphics['boxWidth'])/0x2),_0x26fd92=Math[_0x1fd9ac(0x180)]((Graphics['height']-Graphics[_0x1fd9ac(0xde)])/0x2);this[_0x1fd9ac(0x171)]['x']+=_0x172bb1,this[_0x1fd9ac(0x171)]['y']+=_0x26fd92;},Spriteset_Battle[_0x294dc9(0x184)]['createWeaknessPopupType']=function(_0x5ac187,_0x44803c){const _0x3fa979=_0x294dc9;if(!_0x5ac187)return;if(!this[_0x3fa979(0x171)])return;const _0x56f3af=this[_0x3fa979(0xfa)](_0x44803c);if(!_0x56f3af)return;if(!_0x56f3af[_0x3fa979(0x11a)])return;this[_0x3fa979(0x107)](_0x5ac187,_0x56f3af),this['createWeaknessPopupAnimation'](_0x5ac187,_0x56f3af);},VisuMZ[_0x294dc9(0x136)][_0x294dc9(0x116)]=function(){const _0x283c6a=_0x294dc9;return{'enabled':!![],'filename':'','text':_0x283c6a(0xdd),'bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0x283c6a(0x129),'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':'#ffffff','outlineSize':0x5,'outlineColor':'rgba(1,\x201,\x201,\x201)','offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle['prototype'][_0x294dc9(0xfa)]=function(_0x8f597c){const _0x5e3575=_0x294dc9,_0x41c515=VisuMZ[_0x5e3575(0x136)][_0x5e3575(0x156)];if(!_0x41c515)return null;if(_0x8f597c===_0x5e3575(0x158))return null;const _0x14aaf1=_0x41c515[_0x8f597c];return _0x14aaf1[_0x5e3575(0x173)]=_0x8f597c,_0x14aaf1;},Spriteset_Battle[_0x294dc9(0x184)]['createWeaknessPopup']=function(_0x419862,_0x4f4e94){const _0x2d3303=_0x294dc9;if(!_0x419862)return;if(!_0x4f4e94)return;if(!_0x4f4e94[_0x2d3303(0x11a)])return;if(!this[_0x2d3303(0x171)])return;if(!Imported['VisuMZ_1_BattleCore']&&_0x419862[_0x2d3303(0xe0)]()&&!$gameSystem[_0x2d3303(0xea)]())return;const _0x4b159a=this[_0x2d3303(0xe9)](_0x419862);if(!_0x4b159a)return;const _0x3fa2b2=new Sprite_WeaknessPopup(_0x4b159a,_0x4f4e94),_0x435268=this[_0x2d3303(0x164)](_0x4b159a);if(_0x4f4e94[_0x2d3303(0x173)]===_0x2d3303(0x14a)){const _0x294e72=Math[_0x2d3303(0x180)](_0x4f4e94[_0x2d3303(0x145)]/0x4),_0x346bbe=Math[_0x2d3303(0x180)](_0x4f4e94['bitmapHeight']/0x2);if(_0x435268[_0x2d3303(0xed)][_0x2d3303(0x100)](_0x441717=>Math[_0x2d3303(0x185)](_0x441717['x']-_0x3fa2b2['x'])<_0x294e72&&Math['abs'](_0x441717['y']-_0x3fa2b2['y'])<_0x346bbe)){const _0x29c8ed=Sprite_WeaknessPopup['CRITICAL_STACK_OFFSET'];_0x3fa2b2['x']+=_0x29c8ed['offsetX'],_0x3fa2b2['y']+=_0x29c8ed['offsetY'];}}_0x435268[_0x2d3303(0x12e)](_0x3fa2b2);},Spriteset_Battle[_0x294dc9(0x184)][_0x294dc9(0x164)]=function(_0x15d426){const _0x25f407=_0x294dc9;return!$gameSystem[_0x25f407(0xea)]()&&_0x15d426[_0x25f407(0x183)][_0x25f407(0xe0)]()?SceneManager[_0x25f407(0x172)][_0x25f407(0x16f)][_0x25f407(0xf6)]:this[_0x25f407(0x171)];},Spriteset_Battle[_0x294dc9(0x184)]['createWeaknessPopupAnimation']=function(_0x3eb3d0,_0x478655){const _0x4c95e8=_0x294dc9;if(!_0x3eb3d0)return;if(!_0x478655)return;if(!_0x478655[_0x4c95e8(0x11a)])return;if(!Imported[_0x4c95e8(0x133)])return;const _0x387b5e=_0x478655[_0x4c95e8(0x14c)]??0x0;if(_0x387b5e>0x0){const _0x210d86=_0x478655['AniMirror']??![],_0x21786c=_0x478655[_0x4c95e8(0x139)]??![];$gameTemp['requestFauxAnimation']([_0x3eb3d0],_0x387b5e,_0x210d86,_0x21786c);}},VisuMZ['WeaknessPopups']['Window_BattleStatus_createDamageContainer']=Window_BattleStatus[_0x294dc9(0x184)][_0x294dc9(0x13b)],Window_BattleStatus[_0x294dc9(0x184)]['_createDamageContainer']=function(){const _0x46b024=_0x294dc9;this[_0x46b024(0x112)](),VisuMZ[_0x46b024(0x136)][_0x46b024(0x188)][_0x46b024(0xec)](this);},Window_BattleStatus[_0x294dc9(0x184)]['_createWeaknessPopupContainer']=function(){const _0x2aa0a7=_0x294dc9;this[_0x2aa0a7(0xf6)]=new Sprite(),this[_0x2aa0a7(0x12e)](this['_weaknessPopupContainer']);};function _0x2506(){const _0x4fbdc8=['bypassUserElementBonus','_data','createWeaknessPopup','Spriteset_Battle_createBattleField','ElementNegative','updatePosition','_targetScaleY','_speedY','deltaSpeedX','getColor','createBitmap','offsetX','732073pqwXrR','_createWeaknessPopupContainer','_speedX','isFlipped','createWeaknessPopupsForCritical','DefaultPopupSettings','18uFPsvd','filename','scaleDuration','enabled','extraPositionX','textColor','updateOpacity','_targetScaleX','outlineSize','opaqueDuration','calcUserElementDamageFlat','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','FUNC','_battleField','loadWeaknessPopupBitmap','constructor','randomInt','56MNjTyV','Impact','CritStackOffsetX','removeChild','format','isDamage','addChild','scale','offsetYvariance','destroy','center','VisuMZ_0_CoreEngine','initPosition','1908179AMamKP','WeaknessPopups','Game_Action_executeDamage','Spriteset_Battle_update','AniMute','height','_createDamageContainer','#%1','startSpeedX','centerFrontViewSprite','updateWeaknessPopupsContainer','467980jBMixS','update','exit','create','createWeaknessPopupsContainer','bitmapWidth','outlineColor','bitmap','drawText','ARRAYFUNC','Critical','Element125','AnimationID','parent','fontFace','Element101','_opaqueDuration','createWeaknessPopupType','index','STRUCT','2soDziw','createBattleField','Settings','Element200','none','VisuMZ_3_FrontviewBattleUI','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Action_calcUserElementDamageRate','updateScaling','ConvertParams','parse','createWeaknessPopupsForElementRate','calcUserElementDamagePlus','offsetXvariance','9088PrChMU','calcElementRate','getWeaknessPopupContainer','executeDamage','name','startScaleY','_fadeDuration','1320726VOQTsF','Element105','parameters','_spriteset','_baseY','startScaleX','_statusWindow','6605240pyTSiA','_weaknessPopupsContainer','_scene','type','168GSQyTa','filter','isSceneBattle','isDrain','fontSize','extraPositionY','match','map','opacity','BattleCore','createWeaknessPopups','ARRAYEVAL','ceil','description','deltaSpeedY','_battler','prototype','abs','JSON','VisuMZ_1_BattleCore','Window_BattleStatus_createDamageContainer','_baseX','targetScaleX','adjustFlippedBattlefield','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','return\x200','TEXT','boxHeight','NUM','isActor','fontItalic','initialize','width','offsetY','boxWidth','initMembers','toUpperCase','Element0','findTargetSprite','isSideView','Element50','call','children','trim','_distortionSprite','calcUserElementDamageRate','fadeDuration','Game_Action_calcUserElementDamagePlus','793746cXAwXv','Element150','Element25','_weaknessPopupContainer','Element90','_damageContainer','fontBold','getWeaknessPopupData','max','targetScaleY','createBitmapImage','critical','version','some','Element110','Element95','Game_Action_calcUserElementDamageFlat','_scaleDuration'];_0x2506=function(){return _0x4fbdc8;};return _0x2506();}