//=============================================================================
// VisuStella MZ - State Tooltips
// VisuMZ_3_StateTooltips.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StateTooltips = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StateTooltips = VisuMZ.StateTooltips || {};
VisuMZ.StateTooltips.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [StateTooltips]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/State_Tooltips_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a tooltip window in battle (and other scenes) whenever the
 * player's mouse cursor is hovered over specific areas of the screen. The
 * tooltip window will display a list of the states, buffs, and debuffs the
 * hovered battler has along with a description of the entities and their
 * remaining duration.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Tooltip window displays when hovering over battlers and specific windows
 *   to display their states, buffs, and debuffs.
 * * Adjust the text format in which information is displayed inside the
 *   tooltip window.
 * * Modify the descriptions for states, buffs, and debuffs to your liking.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_MessageCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_2_PartySystem
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * These plugins have scenes that also support tooltips if this plugin is also
 * installed while those are active in your game's project.
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
 * VisuMZ_1_ElementStatusCore
 * 
 * The updated Status Menu currently does not contain tooltip support for the
 * "General" pages that may display the actor's states. This is due to the
 * customization aspect for the various Status Menu pages. There will be a
 * future update where we will adapt this feature.
 * 
 * ---
 *
 * VisuMZ_2_DragonbonesUnion
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
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
 * === Description-Related Notetags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: State Notetags
 * - Assigns a help description for the state.
 * - Replace 'text' with text you want displayed for the tooltip window.
 * - This best works with one line.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the plugin's Plugin Parameters.
 * - Insert %1 into the help description to show any data that would otherwise
 *   be shown as the state display, such as Absorption Barrier count.
 * - This is used as a common notetag between Battle Core's state descriptions
 *   and State Tooltips' state descriptions.
 *
 * ---
 *
 * <State Tooltip Description>
 *  text
 *  text
 * </State Tooltip Description>
 *
 * - Used for: State Notetags
 * - Assigns a help description for the state.
 * - Replace 'text' with text you want displayed for the tooltip window.
 * - This best works with one line.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the plugin's Plugin Parameters.
 * - Insert %1 into the help description to show any data that would otherwise
 *   be shown as the state display, such as Absorption Barrier count.
 * - If both <Help Description> and <State Tooltip Description> notetags
 *   exist in the same state, priority will be given to this one for the
 *   state tooltips window.
 *
 * ---
 * 
 * <Exclude From Tooltips>
 * 
 * - Used for: State Notetags
 * - Excludes the state from being displayed in the state tooltips.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * General settings for the State Tooltips Window.
 *
 * ---
 *
 * Appearance
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Centered?:
 *   - Center the state tooltip when shown through hovering?
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down.
 *
 * ---
 * 
 * Keyboard-Select Show:
 * 
 * This allows showing enemy tooltips when selecting targets during battle
 * while using the keyboard. Tooltip will appear after a brief pause while
 * selecting the enemy.
 *   
 *   Enabled?:
 *   - Show state tooltips when selecting targets using keyboard? 
 *   
 *   Centered?:
 *   - Center the state tooltip when shown through keyboard? 
 *   
 *   Hover Delay (MS):
 *   - How many milliseconds (ms) to delay the tooltip from showing as to not
 *     clutter up target selection screen.
 *   
 *   Offset X:
 *   - Offset the tooltip X position from target's base?
 *   - Negative: left. Positive: right.
 * 
 *     Actor Frontview X:
 *     - Additional Offset X when selecting actors in frontview.
 *     - Negative: left. Positive: right.
 *   
 *     Weakness Display X:
 *     - Additional Offset X when using VisuMZ_3_WeaknessDisplay.
 *     - Negative: left. Positive: right.
 *   
 *   Offset Y:
 *   - Offset the tooltip Y position from target's base?
 *   - Negative: up. Positive: down.
 * 
 *     Actor Frontview Y:
 *     - Additional Offset Y when selecting actors in frontview.
 *     - Negative: up. Positive: down.
 *   
 *     Weakness Display Y:
 *     - Additional Offset Y when using VisuMZ_3_WeaknessDisplay.
 *     - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * Vocabulary settings for the State Tooltips Window.
 *
 * ---
 *
 * General
 * 
 *   Default Description:
 *   - This is the default description that appears for a state without a
 *     declared description. %1 - State's Name
 *   - Can use text codes.
 *
 * ---
 *
 * Entries
 * 
 *   Enemy Aspect Format:
 *   -  Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Description, %4 - Aspect Color
 * 
 *   State Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color
 * 
 *   Buff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color
 * 
 *   Debuff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * 
 *   Replace Whites?:
 *   - If state, buff, debuff names are white, replace them?
 * 
 *     Replacement Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Action End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Turn End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Passive Text:
 *   - Can use text codes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Choose which windows to enable tooltip support for.
 *
 * ---
 *
 * Settings
 * 
 *   Window_BattleStatus:
 *   Window_ClassStatus:
 *   Window_EquipStatus:
 *   Window_MenuActor:
 *   Window_MenuStatus:
 *   Window_PartyStatus:
 *   Window_SkillStatus:
 *   Window_Status:
 *   - Enable State Tooltips for this window?
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
 * Version 1.10: January 16, 2025
 * * Bug Fixes!
 * ** Added a failsafe to prevent crashes from party members that left. Fix
 *    made by Olivia.
 * 
 * Version 1.09: November 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated <Help Description> notetag documentation:
 * *** This is used as a common notetag between Battle Core's state
 *     descriptions and State Tooltips' state descriptions.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <State Tooltip Description>
 * **** A prioritized help description used to separate from the common help
 *      description notetag shared with Battle Core's In-Battle Status.
 * 
 * Version 1.08: September 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Keyboard-Select Show added by Arisu.
 * *** This allows showing enemy tooltips when selecting targets during battle
 *     while using the keyboard. Tooltip will appear after a brief pause while
 *     selecting the enemy.
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Tooltip Settings > Appearance > Centered?
 * **** Center the state tooltip when shown through hovering?
 * *** Parameters > Tooltip Settings > Keyboard-Select Show
 * **** See help file for more information.
 * *** Parameters > Vocabulary > Entries > Enemy Aspect Format
 * **** Used to support the Battle Core's new Enemy Aspect feature.
 * 
 * Version 1.07: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a bug where state tooltips showed through skill and item windows
 *    with the VisuMZ_3_FrontviewBattleUI layout. Fix made by Olivia.
 * 
 * Version 1.06: September 14, 2023
 * * Compatibility Update!
 * ** Added better compatibility with VisuMZ_3_FrontviewBattleUI!
 * 
 * Version 1.05: February 24, 2022
 * * Feature Update!
 * ** When the Choice List Window is hovered over, the State Tooltip window
 *    will hide itself. Update made by Irina.
 * 
 * Version 1.04: October 21, 2021
 * * Documentation Update!
 * ** Added a section for VisuMZ_1_ElementStatusCore in the "VisuStella MZ
 *    Compatibility" section since we received a very good question on it.
 * *** The updated Status Menu currently does not contain tooltip support for
 *     the "General" pages that may display the actor's states. This is due to
 *     the customization aspect for the various Status Menu pages. There will
 *     be a future update where we will adapt this feature.
 * 
 * Version 1.03: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina.
 * *** <Exclude From Tooltips>
 * **** Excludes the state from being displayed in the state tooltips.
 * 
 * Version 1.01: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.00 Official Release Date: February 24, 2021
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
 * @param StateTooltips
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc General settings for the State Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0","KeySelectShow":"","SelectShowEnabled:eval":"true","SelectShowCenter:eval":"true","SelectShowDelay:num":"1500","SelectShowOffsetX:num":"+0","SelectShowActorFrontviewOffsetX:num":"+0","SelectShowWeaknessDisplayOffsetX:num":"+0","SelectShowOffsetY:num":"+0","SelectShowActorFrontviewOffsetY:num":"-4","SelectShowWeaknessDisplayOffsetY:num":"+20"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc Vocabulary settings for the State Tooltips Window.
 * @default {"General":"","HelpDescription:json":"\"-\"","Entries":"","StateFmt:str":"\\C[%5]%1%2:\\C[0] %3 %4","BuffFmt:str":"\\C[%5]%1%2▲:\\C[0] Increases unit's %2 to \\C[%5]%3%\\C[0] %4","DebuffFmt:str":"\\C[%5]%1%2▼:\\C[0] Decreases unit's %2 to \\C[%5]%3%\\C[0] %4","ReplaceWhite:eval":"true","WhiteReplaceColor:str":"5","Turns":"","ActionsFmt:str":"\\C[6](Actions \\C[%2]%1\\C[6])\\C[0]","TurnsFmt:str":"\\C[5](Turns \\C[%2]%1\\C[5])\\C[0]","PassiveText:str":"\\C[4](Passive)\\C[0]"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Choose which windows to enable tooltip support for.
 * @default {"Window_BattleStatus:eval":"true","Window_ClassStatus:eval":"true","Window_EquipStatus:eval":"true","Window_MenuActor:eval":"true","Window_MenuStatus:eval":"true","Window_PartyStatus:eval":"true","Window_SkillStatus:eval":"true","Window_Status:eval":"true"}
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
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param BaseShowCenter:eval
 * @text Centered?
 * @parent Appearance
 * @type boolean
 * @on Centered
 * @off Upper Left
 * @desc Center the state tooltip when shown through hovering?
 * @default false
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param KeySelectShow
 * @text Keyboard-Select Show
 *
 * @param SelectShowEnabled:eval
 * @text Enabled?
 * @parent KeySelectShow
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Show state tooltips when selecting targets using keyboard?
 * @default true
 *
 * @param SelectShowCenter:eval
 * @text Centered?
 * @parent KeySelectShow
 * @type boolean
 * @on Centered
 * @off Upper Left
 * @desc Center the state tooltip when shown through keyboard?
 * @default true
 *
 * @param SelectShowDelay:num
 * @text Hover Delay (MS)
 * @parent KeySelectShow
 * @type number
 * @min 1
 * @desc How many milliseconds (ms) to delay the tooltip from
 * showing as to not clutter up target selection screen.
 * @default 1500
 *
 * @param SelectShowOffsetX:num
 * @text Offset X
 * @parent KeySelectShow
 * @desc Offset the tooltip X position from target's base?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param SelectShowActorFrontviewOffsetX:num
 * @text Actor Frontview X
 * @parent SelectShowOffsetX:num
 * @desc Additional Offset X when selecting actors in frontview.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param SelectShowWeaknessDisplayOffsetX:num
 * @text Weakness Display X
 * @parent SelectShowOffsetX:num
 * @desc Additional Offset X when using VisuMZ_3_WeaknessDisplay.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param SelectShowOffsetY:num
 * @text Offset Y
 * @parent KeySelectShow
 * @desc Offset the tooltip Y position from target's base?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param SelectShowActorFrontviewOffsetY:num
 * @text Actor Frontview Y
 * @parent SelectShowOffsetY:num
 * @desc Additional Offset Y when selecting actors in frontview.
 * Negative: up. Positive: down.
 * @default -4
 *
 * @param SelectShowWeaknessDisplayOffsetY:num
 * @text Weakness Display Y
 * @parent SelectShowOffsetY:num
 * @desc Additional Offset Y when using VisuMZ_3_WeaknessDisplay.
 * Negative: up. Positive: down.
 * @default +20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocab Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param HelpDescription:json
 * @text Default Description
 * @parent General
 * @type note
 * @desc This is the default description that appears for a state
 * without a declared description. %1 - State's Name
 * @default "-"
 * 
 * @param Entries
 *
 * @param EnemyAspectFmt:str
 * @text Enemy Aspect Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Description, %4 - Aspect Color
 * @default \C[%4]%1%2:\C[0] %3
 *
 * @param StateFmt:str
 * @text State Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Description, %4 - Duration, %5 - State Color
 * @default \C[%5]%1%2:\C[0] %3 %4
 *
 * @param BuffFmt:str
 * @text Buff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Buff Color
 * @default \C[%5]%1%2▲:\C[0] Increases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param DebuffFmt:str
 * @text Debuff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * @default \C[%5]%1%2▼:\C[0] Decreases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param ReplaceWhite:eval
 * @text Replace Whites?
 * @parent Entries
 * @type boolean
 * @on Replace
 * @off Don't Replace
 * @desc If state, buff, debuff names are white, replace them?
 * @default true
 *
 * @param WhiteReplaceColor:str
 * @text Replacement Color
 * @parent ReplaceWhite:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 5
 * 
 * @param Turns
 * @text Turns Remaining
 *
 * @param ActionsFmt:str
 * @text Action End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[6](Actions \C[%2]%1\C[6])\C[0]
 *
 * @param TurnsFmt:str
 * @text Turn End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[5](Turns \C[%2]%1\C[5])\C[0]
 *
 * @param PassiveText:str
 * @text Passive Text
 * @parent Turns
 * @desc Can use text codes.
 * @default \C[4](Passive)\C[0]
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_BattleStatus:eval
 * @text Window_BattleStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_ClassStatus:eval
 * @text Window_ClassStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_EquipStatus:eval
 * @text Window_EquipStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuActor:eval
 * @text Window_MenuActor
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuStatus:eval
 * @text Window_MenuStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_PartyStatus:eval
 * @text Window_PartyStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_SkillStatus:eval
 * @text Window_SkillStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_Status:eval
 * @text Window_Status
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 */
//=============================================================================

const _0x3f572e=_0x16c2;(function(_0x4c8edf,_0x5690ae){const _0x1e4c65=_0x16c2,_0x135adf=_0x4c8edf();while(!![]){try{const _0x53e06b=parseInt(_0x1e4c65(0x21b))/0x1+parseInt(_0x1e4c65(0x239))/0x2*(parseInt(_0x1e4c65(0x265))/0x3)+-parseInt(_0x1e4c65(0x2e3))/0x4+parseInt(_0x1e4c65(0x204))/0x5+parseInt(_0x1e4c65(0x283))/0x6*(-parseInt(_0x1e4c65(0x1f1))/0x7)+parseInt(_0x1e4c65(0x288))/0x8*(-parseInt(_0x1e4c65(0x284))/0x9)+parseInt(_0x1e4c65(0x2af))/0xa*(parseInt(_0x1e4c65(0x2b1))/0xb);if(_0x53e06b===_0x5690ae)break;else _0x135adf['push'](_0x135adf['shift']());}catch(_0x265769){_0x135adf['push'](_0x135adf['shift']());}}}(_0x50cb,0x7abb0));var label=_0x3f572e(0x2bf),tier=tier||0x0,dependencies=[_0x3f572e(0x28f)],pluginData=$plugins[_0x3f572e(0x1e6)](function(_0x2b2879){const _0x328010=_0x3f572e;return _0x2b2879[_0x328010(0x210)]&&_0x2b2879['description'][_0x328010(0x2b9)]('['+label+']');})[0x0];function _0x50cb(){const _0x3776cf=['87975sxFzlM','left','ASPECT_FMT','Vocab','344SSYxum','states','StateFmt','length','isEnemy','show','contentsOpacity','VisuMZ_1_BattleCore','WINDOW_SCALE','applyInverse','processEscapeCharacter','isStateTooltipHovered','Scene_Boot_onDatabaseLoaded','worldTransform','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','WINDOW_CENTER','SELECT_SHOW_CENTERED','contains','WhiteReplaceColor','STR','isStateTooltipEnabled','Scene_Base_createWindowLayer','NUM','OffsetX','buffTurns','ARRAYNUM','isBuffOrDebuffAffected','toUpperCase','param','SELECT_SHOW_OFFSET_Y','WINDOW_SKIN_FILENAME','isStateTooltipTouched','touchX','WindowOpacity','SelectShowOffsetY','Window_Selectable_processTouch','index','itemPadding','note','540veFOuC','BaseShowCenter','134244xLIzvZ','selectShowStateTooltips','excludeListing','_skillWindow','targetActor','createStateTooltipWindow','RegExp','_battler','includes','ARRAYEVAL','WINDOW_SKIN_OPACITY','SelectShowCenter','HelpDescription','setupEnemyAspectsText','StateTooltips','clear','isSideView','push','clamp','touchY','floor','_statusWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','exit','setStateTooltipBattler','onMouseEnter','DebuffFmt','_pressedTime','Sprite_Battler_onMouseEnter','_choiceListWindow','MOUSE_OFFSET_Y','padding','updateBackOpacity','_enemyWindow','onMouseExit','commandSkill','updatePosition','getShowSelectStateTooltipBattler','_stateTooltipWindow','description','_scene','isActor','width','active','_touchMoveClose','TooltipDescription','buffColor','JSON','match','loadSystem','2164476CuSbuS','replace','trim','ffffff','_latestButton','process_VisuMZ_StateTooltips','FUNC','_cache_StateTooltips','filter','Window_BattleEnemy_select','hitIndex','resizeWindow','_lastTouchInputY','Window','TURNS_FMT','format','refresh','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setupStateText','42NHzIwb','loadWindowskin','SelectShowDelay','createWindowLayer','isUsingFrontviewUiLayout','obtainEscapeString','BuffFmt','parameters','Scene_Battle_commandSkill','hitTest','stateTurns','STRUCT','SELECT_SHOW_TOOLTIPS','WindowSkin','moveStateTooltipToBattler','\x5cI[%1]','call','setupStateTurnText','\x5cC[%4]%1%2:\x5cC[0]\x20%3','937360RbKTVe','iconIndex','getStateTooltipBattler','Tooltip','initialize','refreshStateTooltipBattler','Scale','ReplaceWhite','canSelectShowStateTooltips','HEXCOLOR','VisuMZ_3_FrontviewBattleUI','version','status','processTouch','Sprite_Clickable_onMouseExit','EVAL','hasAspectData','ARRAYSTRUCT','SELECT_SHOW_OFFSET_Y_WEAKNESS_DISPLAY','hide','_itemWindow','textSizeEx','getStateDisplay','698418ykZwPr','_actorCommandWindow','SelectShowActorFrontviewOffsetX','isBattlerCoveredByWindow','BUFF_FMT','SELECT_SHOW_OFFSET_X','NONWHITE_COLOR','processTouchStateTooltips','bind','createContents','ACTIONS_FMT','SelectShowEnabled','ConvertParams','_lastTouchMoveCloseX','setupText','MOUSE_OFFSET_X','parse','STATE_FMT','_requestRefresh','updateTouchMoveClose','return\x200','backOpacity','DEBUFF_FMT','currentTooltipBattler','height','onMouseEnterStateTooltips','convertMessageKeywords','isOpen','processShowSelectStateTooltipBattler','clampPosition','26lbnleD','open','ParseAllNotetags','SELECT_SHOW_OFFSET_X_ACTOR_FRONTVIEW','boxHeight','openTouchStateTooltips','down','ARRAYJSON','isBuffAffected','Scene_Battle_commandItem','updateOpacity','scale','_text','targetOpacity','buffIconIndex','isSupportMessageKeywords','TurnsFmt','FrontviewBattleUI','name','IsBattlerCoveredByWindow','Settings','autoRemovalTiming','getColor','setBattler','SELECT_SHOW_OFFSET_Y_ACTOR_FRONTVIEW','ActionsFmt','_lastTouchInputX','_lastTouchMoveCloseY','ParseStateNotetags','enemy','select','\x5cHEXCOLOR<#%1>','Sprite_Clickable_onMouseEnter','replaceHexColors','visible','prototype','create','requestRefresh','stateColor','setupTouchMoveClose','VisuMZ_3_WeaknessDisplay','process_VisuMZ_StateTooltips_Notetags','round','battler','89538xUbnuf','_actor','dimensionRect','ARRAYFUNC','_actorWindow','SelectShowWeaknessDisplayOffsetY','getAspectData','Parse_Notetags_Description','onDatabaseLoaded','debuffColor','baseTextRect','isSceneBattle','VisuMZ_2_PartySystem','updateDeath','update','closeTouchStateTooltips','map','isMouseHovered','drawTextEx','SelectShowOffsetX','SelectShowWeaknessDisplayOffsetX','nameColor','setupBuffText','isAppeared','Window_BattleActor_select','constructor','actor','some','boxWidth','setupBuffTurnText','468756VjjGSk'];_0x50cb=function(){return _0x3776cf;};return _0x50cb();}function _0x16c2(_0x2e68dd,_0x1c333a){const _0x50cbc6=_0x50cb();return _0x16c2=function(_0x16c29e,_0x4b04c5){_0x16c29e=_0x16c29e-0x1df;let _0x20f6ec=_0x50cbc6[_0x16c29e];return _0x20f6ec;},_0x16c2(_0x2e68dd,_0x1c333a);}VisuMZ[label][_0x3f572e(0x24d)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x218233,_0x41d4f7){const _0xed917f=_0x3f572e;for(const _0x2f8b88 in _0x41d4f7){if(_0x2f8b88[_0xed917f(0x2e1)](/(.*):(.*)/i)){const _0x12b5cd=String(RegExp['$1']),_0xa91f3c=String(RegExp['$2'])[_0xed917f(0x2a3)]()[_0xed917f(0x1e0)]();let _0x56bbd4,_0x3b29ab,_0x192dcf;switch(_0xa91f3c){case _0xed917f(0x29e):_0x56bbd4=_0x41d4f7[_0x2f8b88]!==''?Number(_0x41d4f7[_0x2f8b88]):0x0;break;case _0xed917f(0x2a1):_0x3b29ab=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):[],_0x56bbd4=_0x3b29ab[_0xed917f(0x275)](_0x9ecbb3=>Number(_0x9ecbb3));break;case _0xed917f(0x213):_0x56bbd4=_0x41d4f7[_0x2f8b88]!==''?eval(_0x41d4f7[_0x2f8b88]):null;break;case _0xed917f(0x2ba):_0x3b29ab=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):[],_0x56bbd4=_0x3b29ab['map'](_0x2d1469=>eval(_0x2d1469));break;case _0xed917f(0x2e0):_0x56bbd4=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):'';break;case _0xed917f(0x240):_0x3b29ab=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):[],_0x56bbd4=_0x3b29ab[_0xed917f(0x275)](_0x5c3888=>JSON[_0xed917f(0x22b)](_0x5c3888));break;case _0xed917f(0x1e4):_0x56bbd4=_0x41d4f7[_0x2f8b88]!==''?new Function(JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88])):new Function(_0xed917f(0x22f));break;case _0xed917f(0x268):_0x3b29ab=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):[],_0x56bbd4=_0x3b29ab[_0xed917f(0x275)](_0x14cb7c=>new Function(JSON[_0xed917f(0x22b)](_0x14cb7c)));break;case _0xed917f(0x29b):_0x56bbd4=_0x41d4f7[_0x2f8b88]!==''?String(_0x41d4f7[_0x2f8b88]):'';break;case'ARRAYSTR':_0x3b29ab=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):[],_0x56bbd4=_0x3b29ab[_0xed917f(0x275)](_0x3171d9=>String(_0x3171d9));break;case _0xed917f(0x1fc):_0x192dcf=_0x41d4f7[_0x2f8b88]!==''?JSON[_0xed917f(0x22b)](_0x41d4f7[_0x2f8b88]):{},_0x56bbd4=VisuMZ[_0xed917f(0x227)]({},_0x192dcf);break;case _0xed917f(0x215):_0x3b29ab=_0x41d4f7[_0x2f8b88]!==''?JSON['parse'](_0x41d4f7[_0x2f8b88]):[],_0x56bbd4=_0x3b29ab['map'](_0x3a717f=>VisuMZ['ConvertParams']({},JSON[_0xed917f(0x22b)](_0x3a717f)));break;default:continue;}_0x218233[_0x12b5cd]=_0x56bbd4;}}return _0x218233;},(_0x5b0aac=>{const _0x3b892e=_0x3f572e,_0x31bef3=_0x5b0aac[_0x3b892e(0x24b)];for(const _0x32519c of dependencies){if(!Imported[_0x32519c]){alert(_0x3b892e(0x1ef)[_0x3b892e(0x1ed)](_0x31bef3,_0x32519c)),SceneManager['exit']();break;}}const _0xa2ff45=_0x5b0aac[_0x3b892e(0x2d8)];if(_0xa2ff45[_0x3b892e(0x2e1)](/\[Version[ ](.*?)\]/i)){const _0xab0ed9=Number(RegExp['$1']);_0xab0ed9!==VisuMZ[label]['version']&&(alert(_0x3b892e(0x296)['format'](_0x31bef3,_0xab0ed9)),SceneManager['exit']());}if(_0xa2ff45[_0x3b892e(0x2e1)](/\[Tier[ ](\d+)\]/i)){const _0x7060de=Number(RegExp['$1']);_0x7060de<tier?(alert(_0x3b892e(0x2c7)['format'](_0x31bef3,_0x7060de,tier)),SceneManager[_0x3b892e(0x2c8)]()):tier=Math['max'](_0x7060de,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3b892e(0x24d)],_0x5b0aac[_0x3b892e(0x1f8)]);})(pluginData),VisuMZ[_0x3f572e(0x2bf)]['RegExp']={'HelpDescription':/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i,'TooltipDescription':/<(?:STATE |)TOOLTIP DESCRIPTION>\s*([\s\S]*)\s*<\/(?:STATE |)TOOLTIP DESCRIPTION>/i,'Exclude':/<EXCLUDE FROM (?:TOOLTIP|TOOLTIPS)>/i},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x294)]=Scene_Boot['prototype'][_0x3f572e(0x26d)],Scene_Boot[_0x3f572e(0x25c)]['onDatabaseLoaded']=function(){const _0xf8455a=_0x3f572e;VisuMZ[_0xf8455a(0x2bf)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0xf8455a(0x1e3)]();},Scene_Boot[_0x3f572e(0x25c)][_0x3f572e(0x1e3)]=function(){const _0x8f0e95=_0x3f572e;this[_0x8f0e95(0x262)]();},Scene_Boot[_0x3f572e(0x25c)][_0x3f572e(0x262)]=function(){const _0x5c64cc=_0x3f572e;if(VisuMZ[_0x5c64cc(0x23b)])return;for(const _0x45bfff of $dataStates){if(!_0x45bfff)continue;VisuMZ[_0x5c64cc(0x2bf)][_0x5c64cc(0x26c)](_0x45bfff);}},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x255)]=VisuMZ[_0x3f572e(0x255)],VisuMZ[_0x3f572e(0x255)]=function(_0xcf5fb1){const _0x2accb9=_0x3f572e;VisuMZ[_0x2accb9(0x2bf)][_0x2accb9(0x255)][_0x2accb9(0x201)](this,_0xcf5fb1),VisuMZ[_0x2accb9(0x2bf)]['Parse_Notetags_Description'](_0xcf5fb1);},VisuMZ[_0x3f572e(0x2bf)]['Parse_Notetags_Description']=function(_0x2b2228){const _0x60e632=_0x3f572e;_0x2b2228[_0x60e632(0x2d8)]=VisuMZ[_0x60e632(0x2bf)][_0x60e632(0x24d)]['Vocab'][_0x60e632(0x2bd)];const _0x43f315=VisuMZ['StateTooltips'][_0x60e632(0x2b7)],_0x1d1af2=_0x2b2228[_0x60e632(0x2ae)];_0x1d1af2['match'](_0x43f315[_0x60e632(0x2bd)])&&(_0x2b2228[_0x60e632(0x2d8)]=String(RegExp['$1'])[_0x60e632(0x1e0)]()),_0x1d1af2['match'](_0x43f315[_0x60e632(0x2de)])&&(_0x2b2228['tooltipDescription']=String(RegExp['$1'])[_0x60e632(0x1e0)]()),_0x1d1af2[_0x60e632(0x2e1)](_0x43f315['Exclude'])&&(_0x2b2228[_0x60e632(0x2b3)]=!![]);},ColorManager[_0x3f572e(0x24f)]=function(_0x2f66ec){return _0x2f66ec=String(_0x2f66ec),_0x2f66ec['match'](/#(.*)/i)?'#%1'['format'](String(RegExp['$1'])):this['textColor'](Number(_0x2f66ec));},SceneManager[_0x3f572e(0x270)]=function(){const _0x3eb2ed=_0x3f572e;return this['_scene']&&this[_0x3eb2ed(0x2d9)][_0x3eb2ed(0x27e)]===Scene_Battle;},SceneManager[_0x3f572e(0x232)]=function(){const _0x2acafa=_0x3f572e,_0x55a34e=SceneManager[_0x2acafa(0x2d9)][_0x2acafa(0x2d7)];if(!_0x55a34e)return null;return _0x55a34e[_0x2acafa(0x2b8)];},SceneManager[_0x3f572e(0x2c9)]=function(_0xd3e30c){const _0x4c1a68=_0x3f572e;if(_0xd3e30c&&!_0xd3e30c[_0x4c1a68(0x27c)]())return;if(_0xd3e30c&&_0xd3e30c['isDead']())return;const _0x40d3f8=SceneManager[_0x4c1a68(0x2d9)][_0x4c1a68(0x2d7)];if(!_0x40d3f8)return;_0x40d3f8[_0x4c1a68(0x250)](_0xd3e30c);},SceneManager[_0x3f572e(0x209)]=function(_0x108c07){const _0x10b657=_0x3f572e;if(_0x108c07&&!_0x108c07['isAppeared']())return;const _0x4ca3d7=SceneManager[_0x10b657(0x2d9)]['_stateTooltipWindow'];if(!_0x4ca3d7)return;if(_0x4ca3d7['_battler']!==_0x108c07)return;_0x4ca3d7[_0x10b657(0x25e)]();},VisuMZ[_0x3f572e(0x2bf)]['Game_Battler_refresh']=Game_Battler[_0x3f572e(0x25c)][_0x3f572e(0x1ee)],Game_Battler[_0x3f572e(0x25c)][_0x3f572e(0x1ee)]=function(){const _0x35d2e4=_0x3f572e;VisuMZ[_0x35d2e4(0x2bf)]['Game_Battler_refresh'][_0x35d2e4(0x201)](this),SceneManager['refreshStateTooltipBattler'](this);},VisuMZ[_0x3f572e(0x2bf)]['Scene_Base_createWindowLayer']=Scene_Base[_0x3f572e(0x25c)]['createWindowLayer'],Scene_Base[_0x3f572e(0x25c)][_0x3f572e(0x1f4)]=function(){const _0x1c9415=_0x3f572e;VisuMZ['StateTooltips'][_0x1c9415(0x29d)][_0x1c9415(0x201)](this),this['createStateTooltipWindow']();},Scene_Base[_0x3f572e(0x25c)][_0x3f572e(0x2b6)]=function(){const _0x15e8fd=_0x3f572e;this[_0x15e8fd(0x2d7)]=new Window_StateTooltip(),this['addChild'](this['_stateTooltipWindow']);},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x1f9)]=Scene_Battle[_0x3f572e(0x25c)][_0x3f572e(0x2d4)],Scene_Battle[_0x3f572e(0x25c)][_0x3f572e(0x2d4)]=function(){const _0x22ac9d=_0x3f572e,_0x3bd6a0=VisuMZ['StateTooltips'][_0x22ac9d(0x24c)]();VisuMZ[_0x22ac9d(0x2bf)][_0x22ac9d(0x1f9)]['call'](this),!_0x3bd6a0&&VisuMZ[_0x22ac9d(0x2bf)][_0x22ac9d(0x24c)]()&&SceneManager[_0x22ac9d(0x2c9)](null);},VisuMZ[_0x3f572e(0x2bf)]['Scene_Battle_commandItem']=Scene_Battle['prototype']['commandItem'],Scene_Battle[_0x3f572e(0x25c)]['commandItem']=function(){const _0x5a17a7=_0x3f572e,_0x3c2a4d=VisuMZ[_0x5a17a7(0x2bf)][_0x5a17a7(0x24c)]();VisuMZ['StateTooltips'][_0x5a17a7(0x242)][_0x5a17a7(0x201)](this),!_0x3c2a4d&&VisuMZ[_0x5a17a7(0x2bf)][_0x5a17a7(0x24c)]()&&SceneManager[_0x5a17a7(0x2c9)](null);},VisuMZ['StateTooltips']['Sprite_Clickable_onMouseEnter']=Sprite_Clickable['prototype'][_0x3f572e(0x2ca)],Sprite_Clickable['prototype'][_0x3f572e(0x2ca)]=function(){const _0x499809=_0x3f572e;VisuMZ[_0x499809(0x2bf)][_0x499809(0x259)]['call'](this),this[_0x499809(0x234)]();},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x212)]=Sprite_Clickable['prototype'][_0x3f572e(0x2d3)],Sprite_Clickable['prototype'][_0x3f572e(0x2d3)]=function(){const _0x260374=_0x3f572e;VisuMZ[_0x260374(0x2bf)][_0x260374(0x212)]['call'](this),this['onMouseExitStateTooltips']();},Sprite_Clickable[_0x3f572e(0x25c)][_0x3f572e(0x234)]=function(){const _0x2dfd25=_0x3f572e;this[_0x2dfd25(0x2c9)]();},Sprite_Clickable[_0x3f572e(0x25c)]['onMouseExitStateTooltips']=function(){const _0x3d1b67=_0x3f572e,_0x4053fc=this[_0x3d1b67(0x206)]();_0x4053fc&&SceneManager[_0x3d1b67(0x232)]()===_0x4053fc&&SceneManager[_0x3d1b67(0x2c9)](null);},Sprite_Clickable['prototype']['setStateTooltipBattler']=function(){const _0x469fa9=_0x3f572e,_0x4b9910=this['getStateTooltipBattler']();_0x4b9910&&SceneManager[_0x469fa9(0x2c9)](_0x4b9910);},Sprite_Clickable[_0x3f572e(0x25c)]['getStateTooltipBattler']=function(){return null;},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x2cd)]=Sprite_Battler[_0x3f572e(0x25c)][_0x3f572e(0x2ca)],Sprite_Battler[_0x3f572e(0x25c)][_0x3f572e(0x2ca)]=function(){const _0x3b0966=_0x3f572e;VisuMZ[_0x3b0966(0x2bf)][_0x3b0966(0x2cd)][_0x3b0966(0x201)](this);if(this['isBattlerCoveredByWindow']())return;this[_0x3b0966(0x2c9)]();},Sprite_Battler[_0x3f572e(0x25c)][_0x3f572e(0x21e)]=function(){const _0x5ed629=_0x3f572e,_0x469eaf=SceneManager[_0x5ed629(0x2d9)];if(_0x469eaf&&_0x469eaf['_inBattleStatusMode'])return!![];const _0x4ef8ac=this[_0x5ed629(0x2b8)]&&this[_0x5ed629(0x2b8)][_0x5ed629(0x28c)]();if(_0x4ef8ac){if(VisuMZ[_0x5ed629(0x2bf)][_0x5ed629(0x24c)]())return!![];}return![];},VisuMZ[_0x3f572e(0x2bf)]['IsBattlerCoveredByWindow']=function(){const _0xc86b1f=_0x3f572e,_0x4f1455=SceneManager[_0xc86b1f(0x2d9)];if(Imported[_0xc86b1f(0x20e)]&&BattleManager[_0xc86b1f(0x1f5)]()){if(_0x4f1455['_itemWindow'][_0xc86b1f(0x236)]()&&_0x4f1455[_0xc86b1f(0x218)][_0xc86b1f(0x25b)])return!![];if(_0x4f1455['_skillWindow'][_0xc86b1f(0x236)]()&&_0x4f1455[_0xc86b1f(0x2b4)][_0xc86b1f(0x25b)])return!![];}return![];},Sprite_Battler[_0x3f572e(0x25c)][_0x3f572e(0x206)]=function(){return this['_battler'];},Window_Base['prototype']['isMouseHovered']=function(){const _0xc87c98=_0x3f572e,_0x3042c0=new Point(TouchInput['x'],TouchInput['y']),_0x139076=this[_0xc87c98(0x295)][_0xc87c98(0x291)](_0x3042c0);return this[_0xc87c98(0x267)]()['contains'](_0x139076['x'],_0x139076['y']);},Window_Base['prototype'][_0x3f572e(0x267)]=function(){const _0x32624a=_0x3f572e;return new Rectangle(0x0,0x0,this[_0x32624a(0x2db)],this[_0x32624a(0x233)]);},VisuMZ[_0x3f572e(0x2bf)]['Window_Selectable_processTouch']=Window_Selectable[_0x3f572e(0x25c)][_0x3f572e(0x211)],Window_Selectable['prototype'][_0x3f572e(0x211)]=function(){const _0x3af05b=_0x3f572e;VisuMZ['StateTooltips'][_0x3af05b(0x2ab)][_0x3af05b(0x201)](this);if(this[_0x3af05b(0x27e)]['name']['match'](/Debug/i))return;this[_0x3af05b(0x222)]();},Window_Selectable[_0x3f572e(0x25c)][_0x3f572e(0x222)]=function(){const _0x155ef2=_0x3f572e;if(!this[_0x155ef2(0x29c)]())return;if(SceneManager[_0x155ef2(0x2d9)][_0x155ef2(0x2d7)][_0x155ef2(0x2dd)])return;this[_0x155ef2(0x1e5)]=this[_0x155ef2(0x1e5)]||{};if(!this[_0x155ef2(0x236)]()){this[_0x155ef2(0x1e5)][_0x155ef2(0x23a)]&&this[_0x155ef2(0x274)]();return;}else this['_cache_StateTooltips'][_0x155ef2(0x23a)]=!![];if(!this[_0x155ef2(0x25b)]){this[_0x155ef2(0x1e5)]['visible']&&this[_0x155ef2(0x274)]();return;}else this['_cache_StateTooltips']['visible']=!![];(this[_0x155ef2(0x1e5)]['x']!==this['x']||this[_0x155ef2(0x1e5)]['y']!==this['y']||this[_0x155ef2(0x1e5)][_0x155ef2(0x2a8)]!==TouchInput['x']||this[_0x155ef2(0x1e5)][_0x155ef2(0x2a8)]!==TouchInput['y'])&&(this[_0x155ef2(0x1e5)]['x']=this['x'],this[_0x155ef2(0x1e5)]['y']=this['y'],this[_0x155ef2(0x1e5)][_0x155ef2(0x2a8)]=TouchInput['x'],this[_0x155ef2(0x1e5)][_0x155ef2(0x2c4)]=TouchInput['y'],this[_0x155ef2(0x2a7)]()?(this[_0x155ef2(0x1e5)][_0x155ef2(0x1fa)]=!![],this[_0x155ef2(0x23e)]()):this['_cache_StateTooltips'][_0x155ef2(0x1fa)]&&this[_0x155ef2(0x274)]());},Window_Selectable['prototype'][_0x3f572e(0x29c)]=function(){const _0x34b325=_0x3f572e;return VisuMZ[_0x34b325(0x2bf)]['Settings'][_0x34b325(0x1eb)][this[_0x34b325(0x27e)][_0x34b325(0x24b)]];},Window_Selectable[_0x3f572e(0x25c)][_0x3f572e(0x2a7)]=function(){const _0x4e7b3f=_0x3f572e;return this[_0x4e7b3f(0x1e8)]()>=0x0;},Window_Selectable[_0x3f572e(0x25c)][_0x3f572e(0x293)]=function(){const _0x1cde83=_0x3f572e,_0x44cf7b=new Point(TouchInput['x'],TouchInput['y']),_0x83c220=this['worldTransform'][_0x1cde83(0x291)](_0x44cf7b),_0x4ce91a=new Rectangle(0x0,0x0,this[_0x1cde83(0x2db)],this[_0x1cde83(0x233)]);return _0x4ce91a[_0x1cde83(0x299)](_0x83c220['x'],_0x83c220['y']);},Window_Selectable[_0x3f572e(0x25c)][_0x3f572e(0x23e)]=function(){const _0x41eeb3=_0x3f572e,_0x389638=this[_0x41eeb3(0x206)]();_0x389638?(this[_0x41eeb3(0x1e5)]['battler']=_0x389638,SceneManager[_0x41eeb3(0x2c9)](_0x389638)):this[_0x41eeb3(0x274)]();},Window_Selectable[_0x3f572e(0x25c)][_0x3f572e(0x206)]=function(){return null;},Window_Selectable['prototype']['closeTouchStateTooltips']=function(){const _0x3fa2e5=_0x3f572e;this['_cache_StateTooltips'][_0x3fa2e5(0x23a)]=![],this[_0x3fa2e5(0x1e5)][_0x3fa2e5(0x25b)]=![],this[_0x3fa2e5(0x1e5)][_0x3fa2e5(0x1fa)]=![],this[_0x3fa2e5(0x1e5)][_0x3fa2e5(0x264)]&&(SceneManager[_0x3fa2e5(0x2c9)](null),this[_0x3fa2e5(0x1e5)][_0x3fa2e5(0x264)]=null);},Window_MenuStatus['prototype']['getStateTooltipBattler']=function(){const _0x2b4579=_0x3f572e,_0x48ac95=this[_0x2b4579(0x1e8)](),_0x172b24=this[_0x2b4579(0x27f)](_0x48ac95);return _0x172b24;},Window_SkillStatus[_0x3f572e(0x25c)][_0x3f572e(0x2a7)]=function(){return this['isStateTooltipHovered']();},Window_SkillStatus[_0x3f572e(0x25c)][_0x3f572e(0x206)]=function(){return this['_actor'];},Window_EquipStatus[_0x3f572e(0x25c)]['isStateTooltipTouched']=function(){return this['isStateTooltipHovered']();},Window_EquipStatus[_0x3f572e(0x25c)]['getStateTooltipBattler']=function(){const _0x11c802=_0x3f572e;return this[_0x11c802(0x266)];},Window_Status[_0x3f572e(0x25c)][_0x3f572e(0x2a7)]=function(){return this['isStateTooltipHovered']();},Window_Status[_0x3f572e(0x25c)]['getStateTooltipBattler']=function(){const _0x5ed345=_0x3f572e;return this[_0x5ed345(0x266)];},Window_BattleStatus['prototype'][_0x3f572e(0x206)]=function(){const _0x2ad5ba=_0x3f572e,_0x32a255=this[_0x2ad5ba(0x1e8)](),_0x2302e1=this['actor'](_0x32a255);return _0x2302e1;},Window_BattleStatus[_0x3f572e(0x25c)][_0x3f572e(0x29c)]=function(){const _0x24ceb3=_0x3f572e;if(Imported[_0x24ceb3(0x20e)]&&BattleManager['isUsingFrontviewUiLayout']()){if(VisuMZ[_0x24ceb3(0x24a)][_0x24ceb3(0x20f)]<1.09){let _0xdfccd0='';_0xdfccd0+='VisuMZ_3_FrontviewBattleUI\x20needs\x20to\x20be\x20updated\x20',_0xdfccd0+='in\x20order\x20for\x20VisuMZ_3_StateTooltips\x20to\x20work.',alert(_0xdfccd0),SceneManager[_0x24ceb3(0x2c8)]();}return![];}return Window_StatusBase[_0x24ceb3(0x25c)][_0x24ceb3(0x29c)][_0x24ceb3(0x201)](this);},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x27d)]=Window_BattleActor[_0x3f572e(0x25c)][_0x3f572e(0x257)],Window_BattleActor[_0x3f572e(0x25c)][_0x3f572e(0x257)]=function(_0x26e472){const _0x551e74=_0x3f572e;VisuMZ[_0x551e74(0x2bf)][_0x551e74(0x27d)][_0x551e74(0x201)](this,_0x26e472);if(this['canSelectShowStateTooltips']())this[_0x551e74(0x2b2)]();},Window_BattleActor[_0x3f572e(0x25c)][_0x3f572e(0x20c)]=function(){const _0x2efda6=_0x3f572e;if(!Window_StateTooltip['SELECT_SHOW_TOOLTIPS'])return![];if(!this[_0x2efda6(0x2dc)])return![];if(!this[_0x2efda6(0x2b5)]())return![];return[_0x2efda6(0x285),'right','up','down','ok'][_0x2efda6(0x280)](_0x133ce7=>Input['_latestButton']===_0x133ce7&&Input['_pressedTime']<=0x2);},Window_BattleActor[_0x3f572e(0x25c)]['selectShowStateTooltips']=function(){const _0x4ceb16=_0x3f572e,_0x335385=this[_0x4ceb16(0x2b5)]();SceneManager[_0x4ceb16(0x2c9)](null),SceneManager[_0x4ceb16(0x1ff)](_0x335385);},Window_BattleActor[_0x3f572e(0x25c)][_0x3f572e(0x2b5)]=function(){const _0x2744d9=_0x3f572e;return this[_0x2744d9(0x27f)](this[_0x2744d9(0x2ac)]());},VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x1e7)]=Window_BattleEnemy[_0x3f572e(0x25c)][_0x3f572e(0x257)],Window_BattleEnemy['prototype']['select']=function(_0x362395){const _0x41befa=_0x3f572e;VisuMZ[_0x41befa(0x2bf)][_0x41befa(0x1e7)]['call'](this,_0x362395);if(this[_0x41befa(0x20c)]())this[_0x41befa(0x2b2)]();},Window_BattleEnemy[_0x3f572e(0x25c)]['canSelectShowStateTooltips']=function(){const _0x5531c9=_0x3f572e;if(!Window_StateTooltip[_0x5531c9(0x1fd)])return![];if(!this['active'])return![];if(!this[_0x5531c9(0x256)]())return![];return[_0x5531c9(0x285),'right','up',_0x5531c9(0x23f),'ok']['some'](_0x316d8f=>Input[_0x5531c9(0x1e2)]===_0x316d8f&&Input[_0x5531c9(0x2cc)]<=0x2);},Window_BattleEnemy[_0x3f572e(0x25c)][_0x3f572e(0x2b2)]=function(){const _0x5947c7=_0x3f572e,_0x290c09=this[_0x5947c7(0x256)]();SceneManager[_0x5947c7(0x2c9)](null),SceneManager[_0x5947c7(0x1ff)](_0x290c09);},SceneManager[_0x3f572e(0x1ff)]=function(_0x38f389){const _0x5ccaf8=_0x3f572e,_0x1d28cf=SceneManager[_0x5ccaf8(0x2d9)]['_stateTooltipWindow'];if(!_0x1d28cf)return;_0x1d28cf[_0x5ccaf8(0x1ff)](_0x38f389);};Imported['VisuMZ_2_ClassChangeSystem']&&(Window_ClassStatus[_0x3f572e(0x25c)][_0x3f572e(0x2a7)]=function(){const _0x3a5d77=_0x3f572e;return this[_0x3a5d77(0x293)]();},Window_ClassStatus[_0x3f572e(0x25c)][_0x3f572e(0x206)]=function(){return this['_actor'];});;Imported[_0x3f572e(0x271)]&&(Window_PartyStatus[_0x3f572e(0x25c)][_0x3f572e(0x2a7)]=function(){const _0xc5e35c=_0x3f572e;return this[_0xc5e35c(0x293)]();},Window_PartyStatus[_0x3f572e(0x25c)]['getStateTooltipBattler']=function(){return this['_actor'];});;function Window_StateTooltip(){this['initialize'](...arguments);}Window_StateTooltip[_0x3f572e(0x25c)]=Object[_0x3f572e(0x25d)](Window_Base[_0x3f572e(0x25c)]),Window_StateTooltip['prototype'][_0x3f572e(0x27e)]=Window_StateTooltip,Window_StateTooltip['WINDOW_SCALE']=VisuMZ['StateTooltips']['Settings'][_0x3f572e(0x207)][_0x3f572e(0x20a)],Window_StateTooltip[_0x3f572e(0x297)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x2b0)]??![],Window_StateTooltip[_0x3f572e(0x2a6)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x1fe)],Window_StateTooltip[_0x3f572e(0x2bb)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x2a9)],Window_StateTooltip[_0x3f572e(0x286)]=VisuMZ['StateTooltips'][_0x3f572e(0x24d)][_0x3f572e(0x287)]['EnemyAspectFmt']??_0x3f572e(0x203),Window_StateTooltip[_0x3f572e(0x22c)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x287)][_0x3f572e(0x28a)],Window_StateTooltip[_0x3f572e(0x21f)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x287)][_0x3f572e(0x1f7)],Window_StateTooltip[_0x3f572e(0x231)]=VisuMZ[_0x3f572e(0x2bf)]['Settings']['Vocab'][_0x3f572e(0x2cb)],Window_StateTooltip['ACTIONS_FMT']=VisuMZ['StateTooltips'][_0x3f572e(0x24d)]['Vocab'][_0x3f572e(0x252)],Window_StateTooltip['TURNS_FMT']=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)]['Vocab'][_0x3f572e(0x249)],Window_StateTooltip['PASSIVE_TEXT']=VisuMZ['StateTooltips'][_0x3f572e(0x24d)]['Vocab']['PassiveText'],Window_StateTooltip['REPLACE_WHITE']=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x287)][_0x3f572e(0x20b)],Window_StateTooltip[_0x3f572e(0x221)]=VisuMZ[_0x3f572e(0x2bf)]['Settings'][_0x3f572e(0x287)][_0x3f572e(0x29a)],Window_StateTooltip['MOUSE_OFFSET_X']=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x29f)],Window_StateTooltip[_0x3f572e(0x2cf)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)]['OffsetY'],Window_StateTooltip[_0x3f572e(0x1fd)]=VisuMZ[_0x3f572e(0x2bf)]['Settings'][_0x3f572e(0x207)][_0x3f572e(0x226)]??!![],Window_StateTooltip[_0x3f572e(0x298)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x2bc)]??!![],Window_StateTooltip['SELECT_DELAY_BEFORE_SHOW']=VisuMZ['StateTooltips']['Settings']['Tooltip'][_0x3f572e(0x1f3)]??0x5dc,Window_StateTooltip[_0x3f572e(0x220)]=VisuMZ[_0x3f572e(0x2bf)]['Settings'][_0x3f572e(0x207)][_0x3f572e(0x278)]??0x0,Window_StateTooltip[_0x3f572e(0x23c)]=VisuMZ[_0x3f572e(0x2bf)]['Settings'][_0x3f572e(0x207)][_0x3f572e(0x21d)]??-0x4,Window_StateTooltip['SELECT_SHOW_OFFSET_X_WEAKNESS_DISPLAY']=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x279)]??0x14,Window_StateTooltip['SELECT_SHOW_OFFSET_Y']=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x2aa)]??0x0,Window_StateTooltip[_0x3f572e(0x251)]=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)]['SelectShowActorFrontviewOffsetY']??-0x4,Window_StateTooltip['SELECT_SHOW_OFFSET_Y_WEAKNESS_DISPLAY']=VisuMZ[_0x3f572e(0x2bf)][_0x3f572e(0x24d)][_0x3f572e(0x207)][_0x3f572e(0x26a)]??0x14,Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x208)]=function(){const _0x2f5212=_0x3f572e,_0x4fa229=new Rectangle(0x0,0x0,Graphics[_0x2f5212(0x2db)],Graphics['height']);Window_Base[_0x2f5212(0x25c)][_0x2f5212(0x208)][_0x2f5212(0x201)](this,_0x4fa229),this[_0x2f5212(0x244)]['x']=this[_0x2f5212(0x244)]['y']=Window_StateTooltip[_0x2f5212(0x290)],this[_0x2f5212(0x217)](),this[_0x2f5212(0x2b8)]=null;},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x1f2)]=function(){const _0x954951=_0x3f572e;this['windowskin']=ImageManager[_0x954951(0x2e2)](Window_StateTooltip[_0x954951(0x2a6)]);},Window_StateTooltip['prototype'][_0x3f572e(0x2d1)]=function(){const _0x314000=_0x3f572e;this[_0x314000(0x230)]=Window_StateTooltip[_0x314000(0x2bb)];},Window_StateTooltip['prototype'][_0x3f572e(0x250)]=function(_0x43690d){const _0x494ff4=_0x3f572e;if(this[_0x494ff4(0x2b8)]===_0x43690d)return;this[_0x494ff4(0x2b8)]=_0x43690d,this[_0x494ff4(0x2b8)]?this['refresh']():this[_0x494ff4(0x217)]();},Window_StateTooltip[_0x3f572e(0x25c)]['refresh']=function(){const _0x1f88b5=_0x3f572e;this['contents'][_0x1f88b5(0x2c0)](),this[_0x1f88b5(0x229)]();if(this[_0x1f88b5(0x245)]['length']>0x0){this[_0x1f88b5(0x1e9)]();const _0x27ebc5=this[_0x1f88b5(0x26f)]();this[_0x1f88b5(0x277)](this[_0x1f88b5(0x245)],_0x27ebc5['x'],_0x27ebc5['y'],_0x27ebc5[_0x1f88b5(0x2db)]),this[_0x1f88b5(0x28d)]();}else this[_0x1f88b5(0x217)]();},Window_StateTooltip['prototype'][_0x3f572e(0x235)]=function(_0x5682ed){return _0x5682ed;},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x248)]=function(){return![];},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x229)]=function(){const _0x231253=_0x3f572e;this[_0x231253(0x245)]='';if(!this[_0x231253(0x2b8)])return;this[_0x231253(0x2be)](),this[_0x231253(0x1f0)](),this['setupBuffText'](),this['replaceHexColors'](),this[_0x231253(0x245)]=this[_0x231253(0x245)][_0x231253(0x1e0)]();},Window_StateTooltip['prototype'][_0x3f572e(0x2be)]=function(){const _0x2aa72e=_0x3f572e;if(!this[_0x2aa72e(0x2b8)])return;if(!this['_battler'][_0x2aa72e(0x28c)])return;if(!this[_0x2aa72e(0x2b8)][_0x2aa72e(0x28c)]())return;if(!this[_0x2aa72e(0x2b8)]['hasAspectData'])return;if(!this[_0x2aa72e(0x2b8)][_0x2aa72e(0x214)]())return;const _0x4c5496=Window_StateTooltip[_0x2aa72e(0x286)];if(_0x4c5496[_0x2aa72e(0x28b)]<=0x0)return;const _0x2524fc=this[_0x2aa72e(0x2b8)]['getAspectData']()[_0x2aa72e(0x24b)],_0x29a86a='\x5cI[%1]'[_0x2aa72e(0x1ed)](this[_0x2aa72e(0x2b8)]['getAspectData']()[_0x2aa72e(0x205)]),_0x3a687d=this[_0x2aa72e(0x2b8)][_0x2aa72e(0x26b)]()[_0x2aa72e(0x27a)],_0x21b3df=this['_battler'][_0x2aa72e(0x26b)]()[_0x2aa72e(0x2d8)],_0x363ede=_0x4c5496['format'](_0x29a86a,_0x2524fc,_0x21b3df,_0x3a687d)['trim']();_0x363ede&&(this[_0x2aa72e(0x245)]+=_0x363ede+'\x0a');},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x1f0)]=function(){const _0x54597a=_0x3f572e,_0x3d47de=Window_StateTooltip[_0x54597a(0x22c)],_0x137543=this['_battler'][_0x54597a(0x289)]();for(const _0x2122af of _0x137543){if(!_0x2122af)continue;if(!_0x2122af[_0x54597a(0x24b)]['trim']())continue;if(_0x2122af[_0x54597a(0x24b)][_0x54597a(0x2e1)](/-----/i))continue;if(_0x2122af[_0x54597a(0x205)]<=0x0)continue;if(_0x2122af[_0x54597a(0x2b3)])continue;const _0x4fddd8=VisuMZ[_0x54597a(0x2bf)][_0x54597a(0x2b7)];if(_0x2122af[_0x54597a(0x2ae)][_0x54597a(0x2e1)](_0x4fddd8['Exclude']))continue;const _0x2fabcd=_0x54597a(0x200)[_0x54597a(0x1ed)](_0x2122af[_0x54597a(0x205)]),_0x4243c8=_0x2122af[_0x54597a(0x24b)][_0x54597a(0x1e0)]();let _0x4e3150=_0x2122af['tooltipDescription']||_0x2122af[_0x54597a(0x2d8)];const _0x23823a=_0x4e3150[_0x54597a(0x1ed)](this['_battler'][_0x54597a(0x21a)](_0x2122af['id'])),_0x1c41cc=this[_0x54597a(0x202)](_0x2122af),_0x3ffb05=ColorManager[_0x54597a(0x25f)](_0x2122af),_0x2356f8=_0x3d47de[_0x54597a(0x1ed)](_0x2fabcd,_0x4243c8,_0x23823a,_0x1c41cc,_0x3ffb05)[_0x54597a(0x1e0)]();_0x2356f8&&(this['_text']+=_0x2356f8+'\x0a');}},Window_StateTooltip['prototype'][_0x3f572e(0x202)]=function(_0x58bb3c){const _0x4dad27=_0x3f572e;if(_0x58bb3c[_0x4dad27(0x24e)]===0x0)return'';if(this['_battler']['passiveStates']()[_0x4dad27(0x2b9)](_0x58bb3c))return Window_StateTooltip['PASSIVE_TEXT'];let _0x1ae889=_0x58bb3c[_0x4dad27(0x24e)]===0x1?Window_StateTooltip[_0x4dad27(0x225)]:Window_StateTooltip[_0x4dad27(0x1ec)];const _0x3388e2=this[_0x4dad27(0x2b8)][_0x4dad27(0x1fb)](_0x58bb3c['id'])||0x0,_0x55ffdf=ColorManager[_0x4dad27(0x25f)](_0x58bb3c);return _0x1ae889[_0x4dad27(0x1ed)](_0x3388e2,_0x55ffdf)[_0x4dad27(0x1e0)]();},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x27b)]=function(){const _0x54f1e2=_0x3f572e,_0x393c4b=Window_StateTooltip[_0x54f1e2(0x21f)],_0x35e6f8=Window_StateTooltip[_0x54f1e2(0x231)];for(let _0x17ff38=0x0;_0x17ff38<0x8;_0x17ff38++){if(!this['_battler'][_0x54f1e2(0x2a2)](_0x17ff38))continue;const _0x4c2cfb=this[_0x54f1e2(0x2b8)][_0x54f1e2(0x241)](_0x17ff38),_0x541364=_0x4c2cfb?_0x393c4b:_0x35e6f8,_0x30b95c=this[_0x54f1e2(0x2b8)][_0x54f1e2(0x247)](this[_0x54f1e2(0x2b8)]['_buffs'][_0x17ff38],_0x17ff38),_0x506819=_0x54f1e2(0x200)[_0x54f1e2(0x1ed)](_0x30b95c),_0x182b68=TextManager[_0x54f1e2(0x2a4)](_0x17ff38),_0x2cfa4a=Math[_0x54f1e2(0x2c5)](this[_0x54f1e2(0x2b8)]['paramBuffRate'](_0x17ff38)*0x64),_0x1b841a=this[_0x54f1e2(0x282)](_0x17ff38),_0x5c2841=_0x4c2cfb?ColorManager['buffColor']():ColorManager[_0x54f1e2(0x26e)](),_0x2dad92=_0x541364[_0x54f1e2(0x1ed)](_0x506819,_0x182b68,_0x2cfa4a,_0x1b841a,_0x5c2841)[_0x54f1e2(0x1e0)]();_0x2dad92&&(this[_0x54f1e2(0x245)]+=_0x2dad92+'\x0a');}},Window_StateTooltip[_0x3f572e(0x25c)]['setupBuffTurnText']=function(_0x1af572){const _0x4e8bb3=_0x3f572e,_0x4b0b1f=Window_StateTooltip['TURNS_FMT'],_0x273e24=this[_0x4e8bb3(0x2b8)][_0x4e8bb3(0x2a0)](_0x1af572),_0x55f66e=this[_0x4e8bb3(0x2b8)]['isBuffAffected'](_0x1af572),_0xb8341a=_0x55f66e?ColorManager[_0x4e8bb3(0x2df)]():ColorManager[_0x4e8bb3(0x26e)]();return _0x4b0b1f['format'](_0x273e24,_0xb8341a)['trim']();},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x25a)]=function(){const _0x17f8fa=_0x3f572e,_0x66d73c=/\\C\[#(.*?)\]/g;this[_0x17f8fa(0x245)]=this[_0x17f8fa(0x245)][_0x17f8fa(0x1df)](_0x66d73c,(_0x448471,_0x5b57ee)=>{const _0x299bb2=_0x17f8fa;if(_0x5b57ee===_0x299bb2(0x1e1)){const _0x1f8ea1=ColorManager['getColor'](Window_StateTooltip[_0x299bb2(0x221)]);_0x5b57ee=_0x1f8ea1['replace'](/#/g,'');}return _0x299bb2(0x258)['format'](_0x5b57ee);});},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x292)]=function(_0x9f1c5a,_0xc56a72){const _0x1bdba2=_0x3f572e;switch(_0x9f1c5a){case _0x1bdba2(0x20d):const _0x533265=this[_0x1bdba2(0x1f6)](_0xc56a72);!this['isColorLocked']()&&_0xc56a72['drawing']&&this['changeTextColor'](_0x533265);break;default:Window_Base[_0x1bdba2(0x25c)]['processEscapeCharacter'][_0x1bdba2(0x201)](this,_0x9f1c5a,_0xc56a72);}},Window_StateTooltip['prototype'][_0x3f572e(0x1e9)]=function(){const _0x27ddd7=_0x3f572e,_0x49f74e=this[_0x27ddd7(0x219)](this[_0x27ddd7(0x245)]);this[_0x27ddd7(0x2db)]=_0x49f74e[_0x27ddd7(0x2db)]+(this[_0x27ddd7(0x2ad)]()+this[_0x27ddd7(0x2d0)])*0x2,this[_0x27ddd7(0x233)]=_0x49f74e[_0x27ddd7(0x233)]+this[_0x27ddd7(0x2d0)]*0x2,this[_0x27ddd7(0x224)](),this['resetFontSettings']();},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x273)]=function(){const _0x17e07e=_0x3f572e;Window_Base[_0x17e07e(0x25c)][_0x17e07e(0x273)][_0x17e07e(0x201)](this),this[_0x17e07e(0x22d)]&&(this[_0x17e07e(0x22d)]=![],this[_0x17e07e(0x1ee)]()),this[_0x17e07e(0x22e)](),this['updatePosition'](),this[_0x17e07e(0x272)](),this[_0x17e07e(0x243)]();},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x25e)]=function(){const _0x47bca4=_0x3f572e;this[_0x47bca4(0x22d)]=!![];},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x2d5)]=function(_0x4a6a24){const _0x3ef65f=_0x3f572e;if(!this[_0x3ef65f(0x25b)])return;if(this[_0x3ef65f(0x253)]===TouchInput['x']&&this[_0x3ef65f(0x1ea)]===TouchInput['y'])return;this['_lastTouchInputX']=TouchInput['x'],this[_0x3ef65f(0x1ea)]=TouchInput['y'];if(!_0x4a6a24)this[_0x3ef65f(0x2dd)]=![];this['x']=TouchInput['x']+Window_StateTooltip[_0x3ef65f(0x22a)],this['y']=TouchInput['y']+Window_StateTooltip['MOUSE_OFFSET_Y'],!this[_0x3ef65f(0x2dd)]&&Window_StateTooltip[_0x3ef65f(0x297)]&&(this['x']-=Math[_0x3ef65f(0x2c5)](this[_0x3ef65f(0x2db)]*this[_0x3ef65f(0x244)]['x']/0x2)),this[_0x3ef65f(0x238)]();},Window_StateTooltip['prototype']['clampPosition']=function(){const _0x4d1e00=_0x3f572e,_0x524493=this['width']*(Window_StateTooltip[_0x4d1e00(0x290)]||0.01),_0x1fcb5e=this[_0x4d1e00(0x233)]*(Window_StateTooltip['WINDOW_SCALE']||0.01);this['x']=Math[_0x4d1e00(0x263)](this['x'][_0x4d1e00(0x2c3)](0x0,Graphics['width']-_0x524493)),this['y']=Math[_0x4d1e00(0x263)](this['y']['clamp'](0x0,Graphics['height']-_0x1fcb5e));},Window_StateTooltip[_0x3f572e(0x25c)]['updateDeath']=function(){const _0x5d5006=_0x3f572e;this['_battler']&&this['_battler']['isDead']()&&this[_0x5d5006(0x250)](null);},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x243)]=function(){const _0x217f9b=_0x3f572e,_0x2c37cd=this[_0x217f9b(0x246)]();this['opacity']=this[_0x217f9b(0x28e)]=_0x2c37cd;},Window_StateTooltip['prototype']['targetOpacity']=function(){const _0x5b1e26=_0x3f572e;if(SceneManager[_0x5b1e26(0x270)]()){const _0x410379=[];_0x410379['push'](SceneManager[_0x5b1e26(0x2d9)][_0x5b1e26(0x21c)]),_0x410379[_0x5b1e26(0x2c2)](SceneManager[_0x5b1e26(0x2d9)][_0x5b1e26(0x218)]),_0x410379[_0x5b1e26(0x2c2)](SceneManager[_0x5b1e26(0x2d9)][_0x5b1e26(0x2b4)]),_0x410379['push'](SceneManager[_0x5b1e26(0x2d9)][_0x5b1e26(0x2ce)]);for(const _0x267023 of _0x410379){if(_0x267023&&_0x267023['isOpen']()&&_0x267023['active']&&_0x267023[_0x5b1e26(0x276)]())return 0x0;}}return 0xff;},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x1ff)]=function(_0x1914bd){const _0x16f7a2=_0x3f572e,_0x5395cc=Window_StateTooltip['SELECT_DELAY_BEFORE_SHOW'];setTimeout(this[_0x16f7a2(0x237)][_0x16f7a2(0x223)](this,_0x1914bd,TouchInput['x'],TouchInput['y']),_0x5395cc);},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x237)]=function(_0x2142fe,_0x262356,_0x388d8c){const _0x51247c=_0x3f572e;if(TouchInput['x']!==_0x262356)return;if(TouchInput['y']!==_0x388d8c)return;const _0x585d3e=this[_0x51247c(0x2d6)]();if(_0x2142fe!==_0x585d3e)return;if(!_0x585d3e[_0x51247c(0x264)]())return;this[_0x51247c(0x250)](_0x585d3e);let _0x3ed4f5=this[_0x51247c(0x2b8)][_0x51247c(0x264)]()['x'],_0x2f5408=this[_0x51247c(0x2b8)][_0x51247c(0x264)]()['y'];if(this[_0x51247c(0x2b8)][_0x51247c(0x2da)]()&&!$gameSystem[_0x51247c(0x2c1)]()){const _0x463aea=SceneManager[_0x51247c(0x2d9)][_0x51247c(0x2c6)];_0x2f5408=_0x463aea['y'],_0x3ed4f5+=_0x463aea['x'],_0x2f5408-=Math[_0x51247c(0x2c5)](this[_0x51247c(0x233)]*this[_0x51247c(0x244)]['y']),_0x3ed4f5+=Window_StateTooltip[_0x51247c(0x23c)],_0x2f5408+=Window_StateTooltip['SELECT_SHOW_OFFSET_Y_ACTOR_FRONTVIEW'];}_0x3ed4f5+=Math['floor']((Graphics[_0x51247c(0x2db)]-Graphics[_0x51247c(0x281)])/0x2),_0x2f5408+=Math[_0x51247c(0x2c5)]((Graphics[_0x51247c(0x233)]-Graphics[_0x51247c(0x23d)])/0x2),Window_StateTooltip[_0x51247c(0x298)]&&(_0x3ed4f5-=Math['floor'](this[_0x51247c(0x2db)]*this[_0x51247c(0x244)]['x']/0x2)),_0x3ed4f5+=Window_StateTooltip[_0x51247c(0x220)],_0x2f5408+=Window_StateTooltip[_0x51247c(0x2a5)],Imported[_0x51247c(0x261)]&&this['_battler']&&this[_0x51247c(0x2b8)][_0x51247c(0x28c)]()&&(_0x3ed4f5+=Window_StateTooltip['SELECT_SHOW_OFFSET_X_WEAKNESS_DISPLAY'],_0x2f5408+=Window_StateTooltip[_0x51247c(0x216)]),TouchInput['_x']=_0x3ed4f5,TouchInput['_y']=_0x2f5408,this[_0x51247c(0x253)]=undefined,this['_lastTouchInputY']=undefined,this[_0x51247c(0x260)](),this[_0x51247c(0x2d5)](!![]);},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x2d6)]=function(){const _0x511fe0=_0x3f572e;if(!SceneManager['_scene']['_enemyWindow']&&!SceneManager['_scene'][_0x511fe0(0x269)])return null;if(SceneManager[_0x511fe0(0x2d9)][_0x511fe0(0x2d2)][_0x511fe0(0x2dc)]){const _0x208661=SceneManager[_0x511fe0(0x2d9)][_0x511fe0(0x2d2)];return _0x208661[_0x511fe0(0x256)]();}else{if(SceneManager[_0x511fe0(0x2d9)][_0x511fe0(0x269)][_0x511fe0(0x2dc)]){const _0x5f5c8a=SceneManager[_0x511fe0(0x2d9)]['_actorWindow'];return _0x5f5c8a['targetActor']();}}return null;},Window_StateTooltip[_0x3f572e(0x25c)][_0x3f572e(0x260)]=function(){const _0x14e18f=_0x3f572e;this[_0x14e18f(0x2dd)]=!![],this['_lastTouchMoveCloseX']=TouchInput['x'],this[_0x14e18f(0x254)]=TouchInput['y'];},Window_StateTooltip['prototype'][_0x3f572e(0x22e)]=function(){const _0x304068=_0x3f572e;if(!this[_0x304068(0x2dd)])return;let _0x195a77=![];if(this[_0x304068(0x228)]!==TouchInput['x'])_0x195a77=!![];if(this['_lastTouchMoveCloseY']!==TouchInput['y'])_0x195a77=!![];if(!SceneManager[_0x304068(0x2d9)][_0x304068(0x2d2)][_0x304068(0x2dc)]&&!SceneManager['_scene'][_0x304068(0x269)]['active'])_0x195a77=!![];if(!_0x195a77)return;this[_0x304068(0x2dd)]=![],this[_0x304068(0x250)](null);};