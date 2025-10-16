//=============================================================================
// VisuStella MZ - Encounter Effects
// VisuMZ_4_EncounterEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_EncounterEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EncounterEffects = VisuMZ.EncounterEffects || {};
VisuMZ.EncounterEffects.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.12] [EncounterEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Encounter_Effects_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Both random encounters and on-screen encounters are pretty limited in what
 * they're able to do in RPG Maker MZ. This plugin expands their functionality
 * with some unique effects added through this plugin.
 * 
 * Both types of encounters can benefit from having more control over the
 * occurrence of Preemptive and Surprise Attacks. These can be enforced through
 * Plugin Commands and set up in a queue.
 * 
 * On-screen encounters can utilize alert functions that will cause events to
 * chase the player (or flee from them) once the player steps within their
 * visible detection range.
 * 
 * On-screen encounters can also utilize new functions added for use with the
 * Conditional Branch to determine which direction the player has approached
 * the on-screen encounter event from.
 * 
 * Random encounters can utilize repel and lure effects to nullify any random
 * encounters for a certain amount of steps or to increase their rate of
 * occurrence.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Take control of battle advantage. Enforce preemptive attacks, surprise
 *   attacks, neither, or chance it.
 * * Battle advantages can be set up in a queue for more interesting gameplay.
 * * Events can be given alert functionality to chase the player if the player
 *   steps within their vision range.
 * * Use Terrain Tags and Regions to set up tiles that will block detection
 *   range through line of sight usage.
 * * Events can trigger themselves upon touching followers instead of just
 *   players.
 * * Events can lock themselves in the direction they're facing when interacted
 *   with to make it easier to apply side attack and back attack effects.
 * * Random encounters can be bypassed through repel effects.
 * * Increase the rate of random encounters with lure effects.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Optional Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Encounter Effects product page. Install as a Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Battle Advantage
 * 
 * Upon starting a battle with forced advantages, any calculations made by
 * other means will be overwritten in favor of the declared forced advantage.
 *
 * ---
 * 
 * Battle Transitions
 * 
 * This plugin allows you to change the default battle transition to something
 * else provided by this plugin. Some of those effects require Pixi JS Filters,
 * so install that if needed. You can find the install for that in this help
 * file's "Requirements" section.
 * 
 * ---
 * 
 * Game_Player.encounterProgressValue
 * 
 * This function has been overwritten to allow for more flexibility over the
 * multipliers and effects applied through various effects and to allow for
 * the repel and lure effects to work as best as they can.
 * 
 * ---
 * 
 * Game_Event.updateSelfMovement
 * 
 * This function's original code will be ignored when the event is set to chase
 * or flee from the player after being alerted. After the alert and return
 * periods are over, self movement will resume as normal.
 * 
 * ---
 * 
 * Scene_Map.startEncounterEffect
 * Scene_Map.updateEncounterEffect
 * 
 * These functions will be drastically changed for the purpose of allowing the
 * new battle transitions added in version 1.11 of this plugin.
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
 * === Battle Advantage-Related Tags ===
 * 
 * ---
 *
 * <Preemptive>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the preemptive advantage (in favor of the player party).
 *
 * ---
 *
 * <Surprise>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   the surprise advantage (in favor of the enemy party).
 *
 * ---
 *
 * <No Advantage>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   no advantage at all.
 *
 * ---
 *
 * <Chance>
 *
 * - Used for: Troop Name Tag
 * - Any troop with this tag in its name will have the battle start off with
 *   a chance for preemptive, surprise, or no advantages (calculated normally).
 *
 * ---
 * 
 * === Event Encounter-Related Notetags ===
 * 
 * ---
 *
 * <Follower Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This event can trigger by touching a follower instead of only the player.
 *
 * ---
 *
 * <Encounter Direction Lock>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Normally when an event triggers without Direction Fix, it will face the
 *   player character. This tag prevents the event from facing the player, but
 *   still allows the event to freely turn directions.
 * - This is best used in conjunction with the Conditional Branch scripts.
 *
 * ---
 * 
 * === Alert-Related Notetags ===
 * 
 * ---
 *
 * <Alert>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This will use the default settings unless changed by other tags.
 *
 * ---
 *
 * <Alert Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Changes the event's alert detection range to 'x' tiles.
 * - Replace 'x' with a number value representing the number of tiles to use
 *   for its detection range.
 *
 * ---
 *
 * <Alert Dash>
 * <Alert Walk>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - If alerted, the event will dash/walk instead of whatever is set as a
 *   default setting within the Plugin Parameters.
 *
 * ---
 *
 * <Alert Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines the amount of time in frames for the event to chase the
 *   player continuously while the player is outside of the detection range.
 * - Replace 'x' with a number value representing the number of frames for the
 *   event to keep chasing the player with.
 * - If the player steps back into the alert detection range, the timer will be
 *   reset.
 *
 * ---
 * 
 * <Alert FoV Angle: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the Field of View angle to 'x' for the event.
 * - Replace 'x' with a number value representing the degrees of for the field
 *   of view angle used by the event to detect players.
 * - The angle will always be centered to the event's line of sight.
 * 
 * ---
 * 
 * <Alert Show FoV>
 * <Alert Hide FoV>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Shows/hides the field of view for the event.
 * - If an event's field of view is hidden, it can still chase players when
 *   entering the event's range.
 * 
 * ---
 *
 * <Alert Response: chase>
 * <Alert Response: rush>
 * <Alert Response: flee>
 * <Alert Response: random>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This determines how an alerted event will react.
 * - Chase: Use path finding to find a route to the player
 * - Rush: Rush directly at the player
 * - Flee: Run away from the player
 * - Random: Move in random directions
 *
 * ---
 *
 * <Response Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when initially alerted and responding.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Alert React Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - When initially alerted, there is a small window of waiting before starting
 *   the chase.
 * - Replace 'x' with a number representing the number of frames for the
 *   initial reaction delay.
 *
 * ---
 *
 * <Alert Common Event: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Runs a Common Event when initially alerted.
 * - Replace 'x' with a number representing the ID of the Common Event to run.
 * - Use 0 to run no Common Events.
 *
 * ---
 *
 * <Alert Sound Name: name>
 * <Alert Sound Volume: x>
 * <Alert Sound Pitch: y>
 * <Alert Sound Pan: z>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Play this sound effect when the event is initially alerted.
 * - Replace 'name' with the filename of the sound effect found in /audio/se/
 *   to play. Do NOT include the file extension.
 * - Replace 'x' with a number representing the volume of the sound effect.
 * - Replace 'y' with a number representing the pitch of the sound effect.
 * - Replace 'z' with a number representing the pan of the sound effect.
 *
 * ---
 *
 * <Return Position>
 * <Stay Position>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Decide if the event will return back to its initial position after an
 *   alert chase is over.
 * - Or if it will stay where it currently is.
 *
 * ---
 *
 * <Return Time: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - This is the amount of time spent (in frames) after an alert chase is over
 *   but returning back to the event's original position.
 * - Replace 'x' with a number representing the number of frames for the
 *   duration between idling and returning.
 *
 * ---
 *
 * <Idle Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when beginning the idle phase after an
 *   alert chase is over but before returning back to the original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 *
 * <Returning Balloon: name>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Enables alert detection towards the player on the event.
 * - Determines the balloon displayed when the event starts returning back to
 *   the event's original position.
 * - Replace 'name' with any of the following:
 *   - None
 *   - Exclamation
 *   - Question
 *   - Music Note
 *   - Heart
 *   - Angle
 *   - Sweat
 *   - Frustration
 *   - Silence
 *   - Light Bulb
 *   - Zzz
 *   - User-defined 1
 *   - User-defined 2
 *   - User-defined 3
 *   - User-defined 4
 *   - User-defined 5
 *
 * ---
 * 
 * <Enable Diagonal Chase>
 * <Disable Diagonal Chase>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Requires VisuMZ_1_EventsMoveCore!
 * - If Events & Movement Core is installed, events can chase the player in
 *   diagonal directions if the player can move diagonally.
 * - However, if you want the player to only move in 4-directions but the event
 *   can move diagonally, you can use <Enable Diagonal Chase>.
 * - Alternatively, you want the player to be able to move diagonally while the
 *   event cannot, you can use <Disable Diagonal Chase>.
 * - These tags are mutually exclusive and cannot be used together.
 * 
 * ---
 * 
 * === Alert Vision Blocking-Related Notetags ===
 * 
 * ---
 *
 * <Block Vision Tag: x>
 * <Block Vision Tags: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   terrain tag 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the terrain tag used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * <Block Vision Region: x>
 * <Block Vision Regions: x, x, x>
 *
 * - Used for: Tileset and Map Notetags
 * - When using a specific tileset or on a specific map, tiles marked with the
 *   region ID 'x' will obscure the line of sight from the event to the
 *   player character.
 * - Replace 'x' with a number value representing the region ID used.
 * - This does NOT change the Field of View Alert Detection Range graphic.
 *
 * ---
 *
 * ============================================================================
 * Conditional Branch Usage
 * ============================================================================
 * 
 * For those wanting to use Conditional Branch event commands with this plugin
 * the following functions into the "Script" input fields of the respective
 * event commands.
 * 
 * === Conditional Branch Script Functions ===
 * 
 * These are newly added JavaScript functions that return a true/false value.
 * The functions are best used with the Conditional Branch script input field.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerFront()
 * 
 * - Returns true if the event is facing the player's front.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerBack()
 * 
 * - Returns true if the event is facing the player's back.
 * - Best used with a Surprise attack.
 * 
 * ---
 * 
 * this.checkEventFacingPlayerSide()
 * 
 * - Returns true if the event is facing the player's side.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventFront()
 * 
 * - Returns true if the player is facing the event's front.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventBack()
 * 
 * - Returns true if the player is facing the event's back.
 * - Best used with a Preemptive attack.
 * 
 * ---
 * 
 * this.checkPlayerFacingEventSide()
 * 
 * - Returns true if the player is facing the event's side.
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
 * === Advantage Plugin Commands ===
 * 
 * ---
 *
 * Advantage: Add to Queue
 * - Add (at the end) to the existing advantage queue the following encounter
 *  advantages for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Set Queue
 * - Declare the exact advantage queue for the upcoming battles.
 *
 *   Queue:
 *   - Add to the queue the following advantage options for the
 *     upcoming battles.
 *     - Preemptive (Player gains turn advantage)
 *     - Surprise (Enemies gain turn advantage)
 *     - No Advantage (Neither party has advantage)
 *     - Chance (Random encounter advantage chance)
 *
 * ---
 *
 * Advantage: Reset Queue
 * - Resets the advantage queue for battles.
 *
 * ---
 * 
 * === Alert Plugin Commands ===
 * 
 * ---
 *
 * Alert: Stealth Mode
 * - Changes the stealth mode setting for the player.
 *
 *   Stealth Mode:
 *   - If Stealth Mode is on, bypass unnoticed alerts.
 *   - Already alerted events will stay alert.
 *
 * ---
 * 
 * === Battle Transition Plugin Commands ===
 * 
 * ---
 * 
 * Battle Transition: Change Type
 * - Changes the battle transition type.
 * 
 *   Transition Type:
 *   - Pick a battle transition type to change to.
 *     - Random - Picks a random effect from list
 *     - Aberration - Chromatic Aberration (Requires PIXI JS Filters)
 *     - Block - Blocks Out Screen
 *     - Blur - Blur Bright Spread Out
 *     - Glitch - Glitchy Screen (Requires PIXI JS Filters)
 *     - Hue - Hue Shift Zoom
 *     - Pixel - Pixelates Screen (Requires PIXI JS Filters)
 *     - Spiral - Screen Spirals Out (Requires PIXI JS Filters)
 *     - Static - Static Noise Fade (Requires PIXI JS Filters)
 *     - Twirl - Twirls Screen (Requires PIXI JS Filters)
 *     - Warp - Warp Speed Spread (Requires PIXI JS Filters)
 *     - Zoom - RPG Maker MZ Default Transition
 *   - Some of these require PIXI JS Filters. If it is not installed, then no
 *     special transition will be played if that transition is selected.
 * 
 * ---
 * 
 * Battle Transition: Duration
 * - Changes the battle transition duration.
 * 
 *   Duration:
 *   - What is the duration of every battle transition in frames?
 *   - 60 frames = 1 second.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Advantage Settings
 * ============================================================================
 *
 * Advantage common event settings related to enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Preemptive Event:
 *   - Run this Common Event upon a preemptive advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   Surprise Event:
 *   - Run this Common Event upon a surprise advantage.
 *   - Use 0 to run no Common Events.
 * 
 *   No Advantage Event:
 *   - Run this Common Event when no advantage is given.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Alert Settings
 * ============================================================================
 *
 * These are settings for alerting events. Used mainly for events chasing the
 * player.
 * 
 * How alert detection works is when the player steps with an event (who has
 * an alert notetag or comment tag), the event will enter alert mode. At the
 * very start, a response balloon will play along with an initialy delay. If
 * there is a common event set, the common event will play immediately.
 * 
 * After the initial delay is over, the event will begin its chasing phase.
 * Although it's called the chasing phase, it can react differently by using
 * path finding to find a way to the player, rushing directly in a straight
 * line at the player, running away from the player, or moving about randomly.
 * 
 * If the player stays out of the event's alert detection range for a specific
 * amount of time, the event will enter its idle phase. An idle balloon will
 * play and the event will wait a short duration.
 * 
 * After this short duration is over, the event will return back to its
 * original position (if desired). Upon starting its return to its original
 * position, it will play the returning balloon.
 * 
 * During the idle and return phases, if the player steps in range of the
 * event's alert range, it will begin the chase all over again.
 *
 * ---
 *
 * Alert
 * 
 *   Detection Range:
 *   - Default tile range for event to detect the player in.
 * 
 *   Alert Dash:
 *   - Alerted events use dashing speed.
 * 
 *   Alert Time:
 *   - Number of frames the alerted event will attempt to chase the player.
 *
 * ---
 *
 * Field of View
 * 
 *   Angle Range:
 *   - The angle range used to determine the event's field of view.
 * 
 *   Show Range:
 *   - Show the field of view of events?
 * 
 *   Color 1:
 *   Color 2:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Response
 * 
 *   Response Type:
 *   - What kind of default response behavior do you want?
 *     - Chase: Use path finding to find a route to the player
 *     - Rush: Rush directly at the player
 *     - Flee: Run away from the player
 *     - Random: Move in random directions
 * 
 *   Response Balloon:
 *   - What kind of balloon should the event play when detecting the player?
 * 
 *   Common Event:
 *   - Run this Common Event when the player is detected.
 *   - Use 0 for no Common Event.
 * 
 *   Reaction Delay:
 *   - Number of frames for the event to stand still before beginning
 *     the chase.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played when alerted.
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
 * Return
 * 
 *   Return Home:
 *   - After finishing a chase, return back to the home position?
 * 
 *   Idle Wait:
 *   - Number of frames to wait before returning home.
 * 
 *   Idle Balloon:
 *   - Play this balloon when an event is about to return.
 * 
 *   Returning Balloon:
 *   - Play this balloon when an event begins returning.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Transition Settings
 * ============================================================================
 *
 * As of this plugin's version 1.11 update, you can now change the battle
 * transitions used before entering battle.
 *
 * ---
 * 
 * Settings
 * 
 *   Default Battle Transition:
 *   - Select the default battle transition.
 *   - This can be changed via Plugin Command.
 *     - Random - Picks a random effect from list
 *     - Aberration - Chromatic Aberration (Requires PIXI JS Filters)
 *     - Block - Blocks Out Screen
 *     - Blur - Blur Bright Spread Out
 *     - Glitch - Glitchy Screen (Requires PIXI JS Filters)
 *     - Hue - Hue Shift Zoom
 *     - Pixel - Pixelates Screen (Requires PIXI JS Filters)
 *     - Spiral - Screen Spirals Out (Requires PIXI JS Filters)
 *     - Static - Static Noise Fade (Requires PIXI JS Filters)
 *     - Twirl - Twirls Screen (Requires PIXI JS Filters)
 *     - Warp - Warp Speed Spread (Requires PIXI JS Filters)
 *     - Zoom - RPG Maker MZ Default Transition
 *   - Some of these require PIXI JS Filters. If it is not installed, then no
 *     special transition will be played if that transition is selected.
 * 
 *     Duration:
 *     - What is the duration of every battle transition in frames?
 *     - 60 frames = 1 second.
 * 
 *     Random List:
 *     - Pick battle transition types used for "random".
 *     - PIXI JS Filter types will be removed if not available.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Encounter Multipliers
 * ============================================================================
 *
 * Encounter multiplier settings regarding enemy encounters.
 *
 * ---
 *
 * Bush Multiplier
 * 
 *   Parameter:
 *   - Multiplier for how fast encounters occur by when the player is walking
 *     through bushes.
 * 
 *   Boat Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via boat.
 * 
 *   Ship Multiplier:
 *   - Multiplier for how fast encounters occur by when the player is
 *     traveling via ship.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Repel/Lure Settings
 * ============================================================================
 *
 * Repel/Lure settings regarding enemy encounters.
 *
 * ---
 *
 * Settings
 * 
 *   Repel Variable:
 *   - Select a variable where if the value is above 0, it will
 *     repel encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Repel reaches 0.
 *   - Use 0 to run no Common Events.
 *
 * ---
 *
 * Settings
 * 
 *   Lure Variable:
 *   - Select a variable where if the value is above 0, it will
 *     lure encounters.
 *   - Each step reduces variable value by 1.
 * 
 *   Wear Off Common Event:
 *   - Run this Common Event when Lure reaches 0.
 *   - Use 0 to run no Common Events.
 * 
 *   Lure Multiplier:
 *   - Multiplier for how fast encounters occur by when the lure
 *     effect is active.
 * 
 *   Lure Increase:
 *   - Flat increase for how fast encounters occur by when the lure
 *     effect is active.
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
 * Version 1.12: September 18, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags/comment tags added by Arisu:
 * *** <Enable Diagonal Chase>
 * *** <Disable Diagonal Chase>
 * **** If Events & Movement Core is installed, events can chase the player in
 *      diagonal directions if the player can move diagonally.
 * **** However, if you want the player to only move in 4-directions but the
 *      event can move diagonally, you can use <Enable Diagonal Chase>.
 * **** Alternatively, you want the player to be able to move diagonally while
 *      the event cannot, you can use <Disable Diagonal Chase>.
 * 
 * Version 1.11: September 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new section in Major Features section for new Battle Transitions.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Default Battle Transition
 * **** Select the default battle transition (10 new ones, 1 MZ original).
 * *** Parameters > Default Battle Transition > Duration
 * **** What is the duration of every battle transition in frames?
 * *** Parameters > Default Battle Transition > Random List
 * **** Pick battle transition types used for "random".
 * ** New Plugin Commands added by Irina:
 * *** Battle Transition: Change Type
 * **** Changes the battle transition type.
 * *** Battle Transition: Duration
 * **** Changes the battle transition duration.
 * 
 * Version 1.10: January 20, 2023
 * * Feature Update!
 * ** When events with <Alert> and <Follower Trigger> are chasing the player,
 *    events will no longer factor in the position of followers while determing
 *    a path and go around them. Instead, they will charge at the player as if
 *    the followers aren't there. Update made by Arisu.
 * 
 * Version 1.09: September 15, 2022
 * * Compatibility Update!
 * ** This plugin now works better with the Events and Movement Core's stop
 *    event movement plugin parameters and commands. Update made by Arisu.
 * 
 * Version 1.08: February 17, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.07: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: August 20, 2021
 * * Compatibility Update!
 * ** Better compatibility with Event and Movement Core's spawn functions.
 *    Update made by Arisu.
 * 
 * Version 1.05: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for features that were left out by accident.
 * *** Notetag/Comment Tag: <Alert FoV Angle: x>
 * *** Notetag/Comment Tag: <Alert Hide FoV>
 * *** Notetag/Comment Tag: <Alert Show FoV>
 * 
 * Version 1.04: December 11, 2020
 * * Bug Fixes!
 * ** Without the Events and Movement Core, events returning home after a
 *    failed alert chase will no longer crash the game.
 *    Fix by Yanfly and Shiro.
 * 
 * Version 1.03: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: November 29, 2020
 * * Feature Update!
 * ** Initialization of the encounter effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu and Shaz.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Certain notetags will no longer cause crashes. Fix made by Yanfly.
 * ** Erased events will have their alert sprite removed, too. Fix made by
 *    Yanfly.
 *
 * Version 1.00: December 11, 2020
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
 * @command AdvantageAddQueue
 * @text Advantage: Add to Queue
 * @desc Add (at the end) to the existing advantage queue the following
 * encounter advantages for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Add to the queue the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageSetQueue
 * @text Advantage: Set Queue
 * @desc Declare the exact advantage queue for the upcoming battles.
 *
 * @arg Queue:arraystr
 * @text Queue
 * @type select[]
 * @option Preemptive (Player gains turn advantage)
 * @value preemptive
 * @option Surprise (Enemies gain turn advantage)
 * @value surprise
 * @option No Advantage (Neither party has advantage)
 * @value no advantage
 * @option Chance (Random encounter advantage chance)
 * @value chance
 * @desc Change the queue to the following advantage options for
 * the upcoming battles.
 * @default ["preemptive"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AdvantageResetQueue
 * @text Advantage: Reset Queue
 * @desc Resets the advantage queue for battles.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Alert
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AlertStealthMode
 * @text Alert: Stealth Mode
 * @desc Changes the stealth mode setting for the player.
 *
 * @arg StealthMode:eval
 * @text Stealth Mode
 * @type boolean
 * @on Stealth On
 * @off No Steath
 * @desc If Stealth Mode is on, bypass unnoticed alerts.
 * Already alerted events will stay alert.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_BattleTransition
 * @text -
 * @desc -
 *
 * @ ---------------------------------------------------------------------------
 *
 * @command BattleTransitionChangeType
 * @text Battle Transition: Change Type
 * @desc Changes the battle transition type.
 *
 * @arg Type:str
 * @text Transition Type
 * @type select
 * @option Random - Picks a random effect from list
 * @value random
 * @option Aberration - Chromatic Aberration (Requires PIXI JS Filters)
 * @value aberration
 * @option Block - Blocks Out Screen
 * @value block
 * @option Blur - Blur Bright Spread Out
 * @value blur
 * @option Glitch - Glitchy Screen (Requires PIXI JS Filters)
 * @value glitch
 * @option Hue - Hue Shift Zoom
 * @value hue
 * @option Pixel - Pixelates Screen (Requires PIXI JS Filters)
 * @value pixel
 * @option Spiral - Screen Spirals Out (Requires PIXI JS Filters)
 * @value spiral
 * @option Static - Static Noise Fade (Requires PIXI JS Filters)
 * @value static
 * @option Twirl - Twirls Screen (Requires PIXI JS Filters)
 * @value twirl
 * @option Warp - Warp Speed Spread (Requires PIXI JS Filters)
 * @value warp
 * @option Zoom - RPG Maker MZ Default Transition
 * @value zoom
 * @desc Pick a battle transition type to change to.
 * @default random
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleTransitionDuration
 * @text Battle Transition: Duration
 * @desc Changes the battle transition duration.
 *
 * @arg Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of every battle transition in frames?
 * 60 frames = 1 second.
 * @default 60
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
 * @param EncounterEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Advantage:struct
 * @text Advantage Settings
 * @type struct<Advantage>
 * @desc Advantage common event settings related to enemy encounters.
 * @default {"Preemptive:num":"0","Surprise:num":"0","Normal:num":"0"}
 *
 * @param Alert:struct
 * @text Alert Settings
 * @type struct<Alert>
 * @desc Settings alerting events. Used mainly for events chasing the player.
 * @default {"Alert":"","AlertRange:num":"4","AlertDash:eval":"true","AlertLock:num":"600","FoV":"","FovAngle:num":"120","ShowFoV:eval":"true","FovColor1:str":"rgba(255, 0, 0, 0)","FovColor2:str":"rgba(255, 0, 0, 0.5)","Response":"","ResponseType:str":"chase","ResponseBalloon:str":"Exclamation","CommonEvent:num":"0","ReactDelay:num":"80","Sound":"","SoundName:str":"Attack1","SoundVolume:num":"90","SoundPitch:num":"120","SoundPan:num":"0","Return":"","ReturnHome:eval":"true","ReturnWait:num":"180","ReturnStartBalloon:str":"Silence","ReturnEndBalloon:str":"Frustration"}
 * 
 * @param BattleTransition:str
 * @text Default Battle Transition
 * @type select
 * @option Random - Picks a random effect from list
 * @value random
 * @option Aberration - Chromatic Aberration (Requires PIXI JS Filters)
 * @value aberration
 * @option Block - Blocks Out Screen
 * @value block
 * @option Blur - Blur Bright Spread Out
 * @value blur
 * @option Glitch - Glitchy Screen (Requires PIXI JS Filters)
 * @value glitch
 * @option Hue - Hue Shift Zoom
 * @value hue
 * @option Pixel - Pixelates Screen (Requires PIXI JS Filters)
 * @value pixel
 * @option Spiral - Screen Spirals Out (Requires PIXI JS Filters)
 * @value spiral
 * @option Static - Static Noise Fade (Requires PIXI JS Filters)
 * @value static
 * @option Twirl - Twirls Screen (Requires PIXI JS Filters)
 * @value twirl
 * @option Warp - Warp Speed Spread (Requires PIXI JS Filters)
 * @value warp
 * @option Zoom - RPG Maker MZ Default Transition
 * @value zoom
 * @desc Select the default battle transition.
 * This can be changed via Plugin Command.
 * @default random
 *
 * @param BattleTransitionDuration:num
 * @text Duration
 * @parent BattleTransition:str
 * @type number
 * @min 1
 * @desc What is the duration of every battle transition in frames?
 * 60 frames = 1 second.
 * @default 60
 * 
 * @param TransitionRandomList:arraystr
 * @text Random List
 * @parent BattleTransition:str
 * @type select[]
 * @option Aberration - Chromatic Aberration (Requires PIXI JS Filters)
 * @value aberration
 * @option Block - Blocks Out Screen
 * @value block
 * @option Blur Bright - Blur Bright Spread Out
 * @value blur
 * @option Glitch - Glitchy Screen (Requires PIXI JS Filters)
 * @value glitch
 * @option Hue - Hue Shift Zoom
 * @value hue
 * @option Pixel - Pixelates Screen (Requires PIXI JS Filters)
 * @value pixel
 * @option Spiral - Screen spirals out (Requires PIXI JS Filters)
 * @value spiral
 * @option Static - Static Noise Fade (Requires PIXI JS Filters)
 * @value static
 * @option Twirl - Twirls Screen (Requires PIXI JS Filters)
 * @value twirl
 * @option Warp - Warp Speed Spread (Requires PIXI JS Filters)
 * @value warp
 * @option Zoom - RPG Maker MZ Default Transition
 * @value zoom
 * @desc Pick battle transition types used for "random".
 * PIXI JS Filter types will be removed if not available.
 * @default ["aberration","block","blur","glitch","hue","pixel","spiral","static","twirl","warp","zoom"]
 *
 * @param EncounterMultiplier:struct
 * @text Encounter Multipliers
 * @type struct<EncounterMultiplier>
 * @desc Encounter multiplier settings regarding enemy encounters.
 * @default {"BushMultiplier:num":"2.00","BoatMultiplier:num":"1.00","ShipMultiplier:num":"0.50"}
 *
 * @param RepelLure:struct
 * @text Repel/Lure Settings
 * @type struct<RepelLure>
 * @desc Repel/Lure settings regarding enemy encounters.
 * @default {"RepelVariable:num":"31","RepelEvent:num":"6","LureVariable:num":"32","LureEvent:num":"8","LureRate:num":"4.0","LureFlat:num":"1"}
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
 * Advantage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Advantage:
 *
 * @param Preemptive:num
 * @text Preemptive Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a preemptive advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Surprise:num
 * @text Surprise Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event upon a surprise advantage.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param Normal:num
 * @text No Advantage Event
 * @parent Advantage
 * @type common_event
 * @desc Run this Common Event when no advantage is given.
 * Use 0 to run no Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Alert Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Alert:
 *
 * @param Alert
 * 
 * @param AlertRange:num
 * @text Detection Range
 * @parent Alert
 * @type number
 * @min 1
 * @desc Default tile range for event to detect the player in.
 * @default 4
 *
 * @param AlertDash:eval
 * @text Alert Dash
 * @parent Alert
 * @type boolean
 * @on Dash
 * @off Walk
 * @desc Alerted events use dashing speed.
 * @default true
 * 
 * @param AlertLock:num
 * @text Alert Time
 * @parent Alert
 * @type number
 * @min 1
 * @desc Number of frames the alerted event will attempt to chase the player.
 * @default 600
 *
 * @param FoV
 * @text Field of View
 * 
 * @param FovAngle:num
 * @text Angle Range
 * @parent FoV
 * @type number
 * @min 1
 * @max 360
 * @desc The angle range used to determine the event's field of view.
 * @default 120
 *
 * @param ShowFoV:eval
 * @text Show Range
 * @parent FoV
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the field of view of events?
 * @default true
 *
 * @param FovColor1:str
 * @text Color 1
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0)
 *
 * @param FovColor2:str
 * @text Color 2
 * @parent FoV
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(255, 0, 0, 0.5)
 *
 * @param Response
 *
 * @param ResponseType:str
 * @text Response Type
 * @parent Response
 * @type select
 * @option Chase: Use path finding to find a route to the player
 * @value chase
 * @option Rush: Rush directly at the player
 * @value rush
 * @option Flee: Run away from the player
 * @value flee
 * @option Random: Move in random directions
 * @value random
 * @desc What kind of default response behavior do you want?
 * @default chase
 *
 * @param ResponseBalloon:str
 * @text Response Balloon
 * @parent Response
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc What kind of balloon should the event play when detecting the player?
 * @default Exclamation
 *
 * @param CommonEvent:num
 * @text Common Event
 * @parent Response
 * @type common_event
 * @desc Run this Common Event when the player is detected.
 * Use 0 for no Common Event.
 * @default 0
 * 
 * @param ReactDelay:num
 * @text Reaction Delay
 * @parent Response
 * @type number
 * @min 1
 * @desc Number of frames for the event to stand still before beginning the chase.
 * @default 80
 *
 * @param Sound
 *
 * @param SoundName:str
 * @text Filename
 * @type file
 * @parent Sound
 * @dir audio/se/
 * @desc Filename of the sound effect played when alerted.
 * @default Attack1
 *
 * @param SoundVolume:num
 * @text Volume
 * @type number
 * @parent Sound
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param SoundPitch:num
 * @text Pitch
 * @type number
 * @parent Sound
 * @desc Pitch of the sound effect played.
 * @default 120
 *
 * @param SoundPan:num
 * @text Pan
 * @parent Sound
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param Return
 *
 * @param ReturnHome:eval
 * @text Return Home
 * @parent Return
 * @type boolean
 * @on Return
 * @off Stay
 * @desc After finishing a chase, return back to the home position?
 * @default true
 * 
 * @param ReturnWait:num
 * @text Idle Wait
 * @parent Return
 * @type number
 * @min 1
 * @desc Number of frames to wait before returning home.
 * @default 180
 *
 * @param ReturnStartBalloon:str
 * @text Idle Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event is about to return.
 * @default Silence
 *
 * @param ReturnEndBalloon:str
 * @text Returning Balloon
 * @parent Return
 * @type select
 * @option Exclamation
 * @option Question
 * @option Music Note
 * @option Heart
 * @option Angle
 * @option Sweat
 * @option Frustration
 * @option Silence
 * @option Light Bulb
 * @option Zzz
 * @option User-defined 1
 * @option User-defined 2
 * @option User-defined 3
 * @option User-defined 4
 * @option User-defined 5
 * @desc Play this balloon when an event begins returning.
 * @default Frustration
 *
 */
/* ----------------------------------------------------------------------------
 * Encounter Multipliers Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EncounterMultiplier:
 *
 * @param BushMultiplier:num
 * @text Bush Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is walking through bushes.
 * @default 2.00
 *
 * @param BoatMultiplier:num
 * @text Boat Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via boat.
 * @default 1.00
 *
 * @param ShipMultiplier:num
 * @text Ship Multiplier
 * @desc Multiplier for how fast encounters occur by when the
 * player is traveling via ship.
 * @default 0.50
 *
 */
/* ----------------------------------------------------------------------------
 * Repel/Lure Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~RepelLure:
 *
 * @param RepelVariable:num
 * @text Repel Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * repel encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param RepelEvent:num
 * @text Wear Off Common Event
 * @parent RepelVariable:num
 * @type common_event
 * @desc Run this Common Event when Repel reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureVariable:num
 * @text Lure Variable
 * @parent Repel/Lure
 * @type variable
 * @desc Select a variable where if the value is above 0, it will
 * lure encounters. Each step reduces variable value by 1.
 * @default 0
 *
 * @param LureEvent:num
 * @text Wear Off Common Event
 * @parent LureVariable:num
 * @type common_event
 * @desc Run this Common Event when Lure reaches 0.
 * Use 0 to run no Common Events.
 * @default 0
 *
 * @param LureRate:num
 * @text Lure Multiplier
 * @parent LureVariable:num
 * @desc Multiplier for how fast encounters occur by when the
 * lure effect is active.
 * @default 4.0
 *
 * @param LureFlat:num
 * @text Lure Increase
 * @parent LureVariable:num
 * @desc Flat increase for how fast encounters occur by when the
 * lure effect is active.
 * @default 1
 *
 */
//=============================================================================

const _0x4af1ad=_0x3abf;function _0x3abf(_0x4c01d6,_0x5e8711){const _0x57bf85=_0x57bf();return _0x3abf=function(_0x3abfb3,_0x3c07fe){_0x3abfb3=_0x3abfb3-0x13f;let _0xf53b9c=_0x57bf85[_0x3abfb3];return _0xf53b9c;},_0x3abf(_0x4c01d6,_0x5e8711);}(function(_0x50ca99,_0x2755c7){const _0x366247=_0x3abf,_0x394f26=_0x50ca99();while(!![]){try{const _0x2be871=-parseInt(_0x366247(0x22c))/0x1+parseInt(_0x366247(0x306))/0x2+parseInt(_0x366247(0x253))/0x3+-parseInt(_0x366247(0x2b5))/0x4*(-parseInt(_0x366247(0x24c))/0x5)+parseInt(_0x366247(0x175))/0x6*(-parseInt(_0x366247(0x2d4))/0x7)+parseInt(_0x366247(0x2d3))/0x8*(-parseInt(_0x366247(0x289))/0x9)+parseInt(_0x366247(0x2d6))/0xa*(parseInt(_0x366247(0x18a))/0xb);if(_0x2be871===_0x2755c7)break;else _0x394f26['push'](_0x394f26['shift']());}catch(_0x31ea72){_0x394f26['push'](_0x394f26['shift']());}}}(_0x57bf,0x9289d));var label=_0x4af1ad(0x26a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4af1ad(0x27a)](function(_0x4f3fb7){const _0x21fb8a=_0x4af1ad;return _0x4f3fb7['status']&&_0x4f3fb7[_0x21fb8a(0x27e)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4af1ad(0x279)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x4af1ad(0x25a)]=function(_0x298534,_0x2f33d6){const _0x1df62d=_0x4af1ad;for(const _0x5eb8ec in _0x2f33d6){if(_0x5eb8ec[_0x1df62d(0x230)](/(.*):(.*)/i)){const _0x564bac=String(RegExp['$1']),_0x1e98dd=String(RegExp['$2'])['toUpperCase']()[_0x1df62d(0x197)]();let _0x33e087,_0x1052f3,_0x1daeb9;switch(_0x1e98dd){case'NUM':_0x33e087=_0x2f33d6[_0x5eb8ec]!==''?Number(_0x2f33d6[_0x5eb8ec]):0x0;break;case _0x1df62d(0x1a3):_0x1052f3=_0x2f33d6[_0x5eb8ec]!==''?JSON['parse'](_0x2f33d6[_0x5eb8ec]):[],_0x33e087=_0x1052f3[_0x1df62d(0x147)](_0x17b2de=>Number(_0x17b2de));break;case _0x1df62d(0x249):_0x33e087=_0x2f33d6[_0x5eb8ec]!==''?eval(_0x2f33d6[_0x5eb8ec]):null;break;case'ARRAYEVAL':_0x1052f3=_0x2f33d6[_0x5eb8ec]!==''?JSON['parse'](_0x2f33d6[_0x5eb8ec]):[],_0x33e087=_0x1052f3[_0x1df62d(0x147)](_0x1a0ecf=>eval(_0x1a0ecf));break;case _0x1df62d(0x24a):_0x33e087=_0x2f33d6[_0x5eb8ec]!==''?JSON[_0x1df62d(0x2d9)](_0x2f33d6[_0x5eb8ec]):'';break;case _0x1df62d(0x224):_0x1052f3=_0x2f33d6[_0x5eb8ec]!==''?JSON[_0x1df62d(0x2d9)](_0x2f33d6[_0x5eb8ec]):[],_0x33e087=_0x1052f3['map'](_0x3411d0=>JSON['parse'](_0x3411d0));break;case _0x1df62d(0x1dd):_0x33e087=_0x2f33d6[_0x5eb8ec]!==''?new Function(JSON[_0x1df62d(0x2d9)](_0x2f33d6[_0x5eb8ec])):new Function(_0x1df62d(0x15f));break;case _0x1df62d(0x1a9):_0x1052f3=_0x2f33d6[_0x5eb8ec]!==''?JSON[_0x1df62d(0x2d9)](_0x2f33d6[_0x5eb8ec]):[],_0x33e087=_0x1052f3[_0x1df62d(0x147)](_0x34d283=>new Function(JSON['parse'](_0x34d283)));break;case _0x1df62d(0x29a):_0x33e087=_0x2f33d6[_0x5eb8ec]!==''?String(_0x2f33d6[_0x5eb8ec]):'';break;case _0x1df62d(0x272):_0x1052f3=_0x2f33d6[_0x5eb8ec]!==''?JSON['parse'](_0x2f33d6[_0x5eb8ec]):[],_0x33e087=_0x1052f3[_0x1df62d(0x147)](_0x348abf=>String(_0x348abf));break;case'STRUCT':_0x1daeb9=_0x2f33d6[_0x5eb8ec]!==''?JSON['parse'](_0x2f33d6[_0x5eb8ec]):{},_0x33e087=VisuMZ[_0x1df62d(0x25a)]({},_0x1daeb9);break;case _0x1df62d(0x261):_0x1052f3=_0x2f33d6[_0x5eb8ec]!==''?JSON[_0x1df62d(0x2d9)](_0x2f33d6[_0x5eb8ec]):[],_0x33e087=_0x1052f3[_0x1df62d(0x147)](_0x566331=>VisuMZ['ConvertParams']({},JSON[_0x1df62d(0x2d9)](_0x566331)));break;default:continue;}_0x298534[_0x564bac]=_0x33e087;}}return _0x298534;},(_0x567b2b=>{const _0x23c269=_0x4af1ad,_0x93a56a=_0x567b2b[_0x23c269(0x2a5)];for(const _0x47e8d5 of dependencies){if(!Imported[_0x47e8d5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x23c269(0x169)](_0x93a56a,_0x47e8d5)),SceneManager['exit']();break;}}const _0x4ee8e5=_0x567b2b[_0x23c269(0x27e)];if(_0x4ee8e5['match'](/\[Version[ ](.*?)\]/i)){const _0x932512=Number(RegExp['$1']);_0x932512!==VisuMZ[label]['version']&&(alert(_0x23c269(0x2ee)['format'](_0x93a56a,_0x932512)),SceneManager['exit']());}if(_0x4ee8e5[_0x23c269(0x230)](/\[Tier[ ](\d+)\]/i)){const _0x3e465a=Number(RegExp['$1']);_0x3e465a<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x23c269(0x169)](_0x93a56a,_0x3e465a,tier)),SceneManager[_0x23c269(0x1e7)]()):tier=Math[_0x23c269(0x1ad)](_0x3e465a,tier);}VisuMZ[_0x23c269(0x25a)](VisuMZ[label][_0x23c269(0x279)],_0x567b2b[_0x23c269(0x263)]);})(pluginData),PluginManager[_0x4af1ad(0x2f0)](pluginData[_0x4af1ad(0x2a5)],'AdvantageAddQueue',_0x44c6e=>{const _0x5ef96f=_0x4af1ad;VisuMZ[_0x5ef96f(0x25a)](_0x44c6e,_0x44c6e);const _0x32d9b8=_0x44c6e[_0x5ef96f(0x303)];$gameSystem[_0x5ef96f(0x26e)](_0x32d9b8);}),PluginManager['registerCommand'](pluginData['name'],'AdvantageSetQueue',_0x4a0bd1=>{const _0x580960=_0x4af1ad;VisuMZ['ConvertParams'](_0x4a0bd1,_0x4a0bd1);const _0x2c8991=_0x4a0bd1[_0x580960(0x303)];$gameSystem[_0x580960(0x1c4)](_0x2c8991);}),PluginManager[_0x4af1ad(0x2f0)](pluginData[_0x4af1ad(0x2a5)],_0x4af1ad(0x19f),_0x4cd240=>{const _0x3365ea=_0x4af1ad;VisuMZ['ConvertParams'](_0x4cd240,_0x4cd240),$gameSystem[_0x3365ea(0x1c4)]([]);}),PluginManager[_0x4af1ad(0x2f0)](pluginData[_0x4af1ad(0x2a5)],_0x4af1ad(0x192),_0x56bfba=>{const _0x468477=_0x4af1ad;VisuMZ['ConvertParams'](_0x56bfba,_0x56bfba);const _0x24558c=_0x56bfba[_0x468477(0x1df)];$gamePlayer['setAlertStealthMode'](_0x24558c);}),PluginManager['registerCommand'](pluginData[_0x4af1ad(0x2a5)],_0x4af1ad(0x2f8),_0x166e79=>{const _0x4752bb=_0x4af1ad;VisuMZ[_0x4752bb(0x25a)](_0x166e79,_0x166e79);const _0x226bf2=_0x166e79[_0x4752bb(0x1c0)];$gameSystem[_0x4752bb(0x19d)](_0x226bf2[_0x4752bb(0x17a)]()[_0x4752bb(0x197)]());}),PluginManager[_0x4af1ad(0x2f0)](pluginData[_0x4af1ad(0x2a5)],_0x4af1ad(0x2dd),_0x50bbe3=>{const _0x48cc67=_0x4af1ad;VisuMZ[_0x48cc67(0x25a)](_0x50bbe3,_0x50bbe3);const _0x4d0ff9=Number(_0x50bbe3[_0x48cc67(0x2be)])||0x0;$gameSystem[_0x48cc67(0x181)](_0x4d0ff9);}),VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x2d8)]={'Preemptive':/<(?:PREEMPTIVE|PRE-EMPTIVE|PRE EMPTIVE)>/i,'Surprise':/<(?:SURPRISE|SURPRISED)>/i,'NoAdvantage':/<NO ADVANTAGE>/i,'Chance':/<CHANCE>/i,'FollowerTrigger':/<(?:FOLLOWER TRIGGER|FOLLOWERTRIGGER)>/i,'TouchDirectionLock':/<(?:ENCOUNTER LOCK|ENCOUNTER DIRECTION LOCK)>/i,'AlertDefault':/<ALERT>/i,'AlertRange':/<ALERT RANGE:[ ](\d+)>/i,'AlertDash':/<ALERT DASH>/i,'AlertWalk':/<ALERT WALK>/i,'AlertLock':/<ALERT TIME:[ ](\d+)>/i,'AlertFovAngle':/<ALERT FOV ANGLE:[ ](\d+)>/i,'AlertShowFov':/<ALERT SHOW FOV>/i,'AlertHideFov':/<ALERT HIDE FOV>/i,'AlertResponse':/<ALERT RESPONSE:[ ](.*)>/i,'AlertBalloon':/<(?:ALERT|RESPONSE) BALLOON:[ ](.*)>/i,'AlertReactDelay':/<ALERT REACT DELAY:[ ](\d+)>/i,'AlertCommonEvent':/<ALERT COMMON EVENT:[ ](\d+)>/i,'AlertSoundName':/<ALERT SOUND NAME:[ ](.*)>/i,'AlertSoundVolume':/<ALERT SOUND VOLUME:[ ](\d+)>/i,'AlertSoundPitch':/<ALERT SOUND PITCH:[ ](\d+)>/i,'AlertSoundPan':/<ALERT SOUND PAN:[ ](.*)>/i,'ReturnPosition':/<RETURN POSITION>/i,'StayPosition':/<STAY POSITION>/i,'ReturnStartBalloon':/<IDLE BALLOON:[ ](.*)>/i,'ReturnEndBalloon':/<RETURNING BALLOON:[ ](.*)>/i,'ReturnWait':/<RETURN TIME:[ ](\d+)>/i,'EnableChaseDiagonally':/<ENABLE DIAGONAL CHASE>/i,'DisableChaseDiagonally':/<DISABLE DIAGONAL CHASE>/i,'BlockVisionTag':/<(?:BLOCK|BLOCKED) VISION (?:TAG|TAGS):[ ](.*)>/i,'BlockVisionRegion':/<(?:BLOCK|BLOCKED) VISION (?:REGION|REGIONS):[ ](.*)>/i},VisuMZ[_0x4af1ad(0x26a)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x4af1ad(0x225)][_0x4af1ad(0x210)],Scene_Boot[_0x4af1ad(0x225)][_0x4af1ad(0x210)]=function(){const _0xc276c5=_0x4af1ad;VisuMZ['EncounterEffects']['Scene_Boot_onDatabaseLoaded'][_0xc276c5(0x22d)](this),VisuMZ[_0xc276c5(0x26a)][_0xc276c5(0x1bf)]();},VisuMZ['EncounterEffects'][_0x4af1ad(0x1bf)]=function(){const _0x4cf04d=_0x4af1ad,_0x569522=VisuMZ[_0x4cf04d(0x26a)][_0x4cf04d(0x279)][_0x4cf04d(0x308)],_0x4ee5e3=PIXI[_0x4cf04d(0x157)][_0x4cf04d(0x14a)];if(!_0x4ee5e3){const _0x43996e=[_0x4cf04d(0x194),_0x4cf04d(0x2d7),_0x4cf04d(0x292),_0x4cf04d(0x314),_0x4cf04d(0x2e4),_0x4cf04d(0x148),_0x4cf04d(0x14b)];for(const _0x364965 of _0x43996e)_0x569522[_0x4cf04d(0x298)](_0x364965);}},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x156)]=BattleManager[_0x4af1ad(0x2a8)],BattleManager['startBattle']=function(){const _0x41704f=_0x4af1ad;this['checkForcedAdvantage'](),VisuMZ['EncounterEffects'][_0x41704f(0x156)][_0x41704f(0x22d)](this),this[_0x41704f(0x2f3)]();},BattleManager['checkForcedAdvantage']=function(){const _0x20fb8b=_0x4af1ad,_0x367f0b=$gameSystem['shiftForcedAdvantage']();if(!_0x367f0b)return;switch(_0x367f0b[_0x20fb8b(0x17a)]()[_0x20fb8b(0x197)]()){case _0x20fb8b(0x1e3):this[_0x20fb8b(0x295)]=!![],this[_0x20fb8b(0x273)]=![];break;case _0x20fb8b(0x161):this[_0x20fb8b(0x295)]=![],this[_0x20fb8b(0x273)]=!![];break;case _0x20fb8b(0x1d3):this[_0x20fb8b(0x295)]=![],this[_0x20fb8b(0x273)]=![];break;case _0x20fb8b(0x144):VisuMZ[_0x20fb8b(0x1d7)][_0x20fb8b(0x284)][_0x20fb8b(0x22d)](this);break;}},BattleManager[_0x4af1ad(0x2f3)]=function(){const _0x32b072=_0x4af1ad,_0x526095=VisuMZ[_0x32b072(0x26a)]['Settings'][_0x32b072(0x1ed)];if(!_0x526095)return;let _0x262658=0x0;if(this['_preemptive'])_0x262658=_0x526095[_0x32b072(0x1f9)]||0x0;else this[_0x32b072(0x273)]?_0x262658=_0x526095[_0x32b072(0x220)]||0x0:_0x262658=_0x526095['Normal']||0x0;_0x262658>0x0&&$gameTemp['reserveCommonEvent'](_0x262658);},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x23e)]=Game_System[_0x4af1ad(0x225)]['initialize'],Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x20d)]=function(){const _0x5bb7e5=_0x4af1ad;VisuMZ[_0x5bb7e5(0x26a)][_0x5bb7e5(0x23e)]['call'](this),this['initEncounterEffects_ForcedAdvantage'](),this[_0x5bb7e5(0x167)]();},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x13f)]=function(){this['_forcedAdvantage']=[];},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x2b1)]=function(){const _0x2d132b=_0x4af1ad;return this[_0x2d132b(0x28a)]===undefined&&this[_0x2d132b(0x13f)](),this['_forcedAdvantage'];},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x239)]=function(){const _0x3f2758=_0x4af1ad;if($gameTroop&&$gameTroop['troop']()){const _0x236794=VisuMZ[_0x3f2758(0x26a)][_0x3f2758(0x2d8)],_0x838a5a=$gameTroop[_0x3f2758(0x21b)]()['name'];if(_0x838a5a[_0x3f2758(0x230)](_0x236794[_0x3f2758(0x1f9)]))return _0x3f2758(0x1e3);else{if(_0x838a5a[_0x3f2758(0x230)](_0x236794[_0x3f2758(0x220)]))return _0x3f2758(0x161);else{if(_0x838a5a[_0x3f2758(0x230)](_0x236794[_0x3f2758(0x2f5)]))return'no\x20advantage';else{if(_0x838a5a['match'](_0x236794['Chance']))return _0x3f2758(0x144);}}}}return this[_0x3f2758(0x2b1)]()['shift']();},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x1c4)]=function(_0x28d0c2){const _0x47e096=_0x4af1ad;this[_0x47e096(0x28a)]===undefined&&this[_0x47e096(0x13f)](),this[_0x47e096(0x28a)]=_0x28d0c2;},Game_System['prototype'][_0x4af1ad(0x26e)]=function(_0x729cf7){const _0x40be24=_0x4af1ad;this[_0x40be24(0x28a)]===undefined&&this['initEncounterEffects_ForcedAdvantage'](),this['_forcedAdvantage']=this['_forcedAdvantage']['concat'](_0x729cf7);},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x167)]=function(){const _0x1be265=_0x4af1ad,_0x41f27a=VisuMZ[_0x1be265(0x26a)][_0x1be265(0x279)];this['_battleTransitionType']=_0x41f27a['BattleTransition'],this['_battleTransitionDuration']=_0x41f27a['BattleTransitionDuration'];},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x2ba)]=function(){const _0x38af6c=_0x4af1ad;if(this[_0x38af6c(0x312)]===undefined)this[_0x38af6c(0x167)]();if(this[_0x38af6c(0x312)]===_0x38af6c(0x2eb)){const _0x5902ca=VisuMZ[_0x38af6c(0x26a)][_0x38af6c(0x279)][_0x38af6c(0x308)];return _0x5902ca[Math[_0x38af6c(0x260)](_0x5902ca['length'])];}else return this[_0x38af6c(0x312)];},Game_System[_0x4af1ad(0x225)][_0x4af1ad(0x19d)]=function(_0x2d9403){const _0x1a0485=_0x4af1ad;if(this[_0x1a0485(0x312)]===undefined)this[_0x1a0485(0x167)]();this[_0x1a0485(0x312)]=_0x2d9403;},Game_System[_0x4af1ad(0x225)]['getBattleTransitionDuration']=function(){const _0x52d4c6=_0x4af1ad;if(this[_0x52d4c6(0x20f)]===undefined)this[_0x52d4c6(0x167)]();return this[_0x52d4c6(0x20f)];},Game_System[_0x4af1ad(0x225)]['setBattleTransitionDuration']=function(_0x4d5e02){const _0x8f0b9e=_0x4af1ad;if(this[_0x8f0b9e(0x20f)]===undefined)this['initEncEffBattleTransition']();this[_0x8f0b9e(0x20f)]=Number(_0x4d5e02);},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x1f4)]=Game_Map['prototype'][_0x4af1ad(0x28b)],Game_Map['prototype'][_0x4af1ad(0x28b)]=function(_0x455434){const _0x1a0ded=_0x4af1ad;VisuMZ[_0x1a0ded(0x26a)][_0x1a0ded(0x1f4)][_0x1a0ded(0x22d)](this,_0x455434),this[_0x1a0ded(0x1f3)](),this['setupEncounterEffectsData']();},Game_Map[_0x4af1ad(0x225)][_0x4af1ad(0x1f3)]=function(){const _0xf5bb9=_0x4af1ad;this['_alertBlockVisionTags']=[],this[_0xf5bb9(0x30b)]=[];},Game_Map[_0x4af1ad(0x225)]['setupEncounterEffectsData']=function(){const _0x3d35e4=_0x4af1ad,_0x5ae83a=this[_0x3d35e4(0x24b)]();if(!_0x5ae83a)return;const _0x5164e5=VisuMZ[_0x3d35e4(0x26a)][_0x3d35e4(0x2d8)],_0xd0f8f8=_0x5ae83a[_0x3d35e4(0x229)],_0x212167=$dataMap?$dataMap['note']:'';if(_0xd0f8f8[_0x3d35e4(0x230)](_0x5164e5[_0x3d35e4(0x184)])){const _0x4e9dbb=String(RegExp['$1'])[_0x3d35e4(0x2a3)](',')['map'](_0x2e68a4=>Number(_0x2e68a4));this[_0x3d35e4(0x30d)]=this[_0x3d35e4(0x30d)][_0x3d35e4(0x2de)](_0x4e9dbb);}if(_0xd0f8f8['match'](_0x5164e5[_0x3d35e4(0x1e4)])){const _0x3682c8=String(RegExp['$1'])[_0x3d35e4(0x2a3)](',')[_0x3d35e4(0x147)](_0x3cc232=>Number(_0x3cc232));this[_0x3d35e4(0x30b)]=this[_0x3d35e4(0x30b)][_0x3d35e4(0x2de)](_0x3682c8);}if(_0x212167[_0x3d35e4(0x230)](_0x5164e5[_0x3d35e4(0x184)])){const _0x58fd2e=String(RegExp['$1'])[_0x3d35e4(0x2a3)](',')['map'](_0x45fb34=>Number(_0x45fb34));this[_0x3d35e4(0x30d)]=this[_0x3d35e4(0x30d)]['concat'](_0x58fd2e);}if(_0x212167['match'](_0x5164e5[_0x3d35e4(0x1e4)])){const _0xab992f=String(RegExp['$1'])[_0x3d35e4(0x2a3)](',')[_0x3d35e4(0x147)](_0x1a2cf5=>Number(_0x1a2cf5));this[_0x3d35e4(0x30b)]=this['_alertBlockVisionRegions']['concat'](_0xab992f);}},Game_Map[_0x4af1ad(0x225)][_0x4af1ad(0x2f1)]=function(_0x45e35e,_0x26dc36){const _0x463a9f=_0x4af1ad;if(this[_0x463a9f(0x30d)]===undefined)return![];if(this[_0x463a9f(0x30b)]===undefined)return![];const _0x391137=this[_0x463a9f(0x258)](_0x45e35e,_0x26dc36);if(this[_0x463a9f(0x30d)][_0x463a9f(0x151)](_0x391137))return!![];const _0xee172f=this[_0x463a9f(0x155)](_0x45e35e,_0x26dc36);if(this[_0x463a9f(0x30b)]['includes'](_0xee172f))return!![];return![];},Game_CharacterBase[_0x4af1ad(0x225)][_0x4af1ad(0x211)]=function(_0x42ca43){const _0x5d7360=_0x4af1ad;return;console[_0x5d7360(0x212)](_0x5d7360(0x145)+this['x']+',\x20\x20This\x20Y:\x20'+this['y']),console[_0x5d7360(0x212)](_0x5d7360(0x16a)+_0x42ca43['x']+',\x20Event\x20Y:\x20'+_0x42ca43['y']);},Game_CharacterBase[_0x4af1ad(0x225)]['isFacingTowards']=function(_0x5302a5){const _0x10f754=_0x4af1ad;switch(this[_0x10f754(0x2bb)]()){case 0x1:return[0x8,0x9,0x6][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x2:return[0x7,0x8,0x9][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x3:return[0x4,0x7,0x8][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x4:return[0x9,0x6,0x3][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x6:return[0x7,0x4,0x1][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x7:return[0x2,0x3,0x6][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x8:return[0x1,0x2,0x3][_0x10f754(0x16b)](_0x5302a5[_0x10f754(0x2bb)]());case 0x9:return[0x4,0x1,0x2]['contains'](_0x5302a5[_0x10f754(0x2bb)]());}return![];},Game_CharacterBase[_0x4af1ad(0x225)][_0x4af1ad(0x182)]=function(_0x302ba9){const _0x4dc70c=_0x4af1ad;switch(this['direction']()){case 0x1:return[0x4,0x1,0x2]['contains'](_0x302ba9[_0x4dc70c(0x2bb)]());case 0x2:return[0x1,0x2,0x3][_0x4dc70c(0x16b)](_0x302ba9[_0x4dc70c(0x2bb)]());case 0x3:return[0x2,0x3,0x6]['contains'](_0x302ba9[_0x4dc70c(0x2bb)]());case 0x4:return[0x7,0x4,0x1][_0x4dc70c(0x16b)](_0x302ba9['direction']());case 0x6:return[0x9,0x6,0x3]['contains'](_0x302ba9[_0x4dc70c(0x2bb)]());case 0x7:return[0x4,0x7,0x8]['contains'](_0x302ba9[_0x4dc70c(0x2bb)]());case 0x8:return[0x7,0x8,0x9][_0x4dc70c(0x16b)](_0x302ba9[_0x4dc70c(0x2bb)]());case 0x9:return[0x8,0x9,0x6][_0x4dc70c(0x16b)](_0x302ba9[_0x4dc70c(0x2bb)]());}return![];},Game_CharacterBase[_0x4af1ad(0x225)][_0x4af1ad(0x2bf)]=function(_0x356629){const _0x105e13=_0x4af1ad;switch(this['direction']()){case 0x1:return[0x4,0x7,0x8,0x2,0x3,0x6]['contains'](_0x356629[_0x105e13(0x2bb)]());case 0x2:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x105e13(0x16b)](_0x356629[_0x105e13(0x2bb)]());case 0x3:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x105e13(0x16b)](_0x356629['direction']());case 0x4:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x105e13(0x16b)](_0x356629['direction']());case 0x6:return[0x7,0x8,0x9,0x1,0x2,0x3][_0x105e13(0x16b)](_0x356629[_0x105e13(0x2bb)]());case 0x7:return[0x4,0x1,0x2,0x8,0x9,0x6][_0x105e13(0x16b)](_0x356629[_0x105e13(0x2bb)]());case 0x8:return[0x7,0x4,0x1,0x9,0x6,0x3][_0x105e13(0x16b)](_0x356629[_0x105e13(0x2bb)]());case 0x9:return[0x4,0x7,0x8,0x2,0x3,0x6][_0x105e13(0x16b)](_0x356629['direction']());}return![];},Game_CharacterBase[_0x4af1ad(0x225)]['isPositionFrontOf']=function(_0x43072e){const _0x487961=_0x4af1ad;this[_0x487961(0x211)](_0x43072e);switch(this[_0x487961(0x2bb)]()){case 0x1:return _0x43072e['y']>this['y'];case 0x2:return _0x43072e['y']>this['y'];case 0x3:return _0x43072e['y']>this['y'];case 0x4:return _0x43072e['x']<this['x'];case 0x6:return _0x43072e['x']>this['x'];case 0x7:return _0x43072e['y']<this['y'];case 0x8:return _0x43072e['y']<this['y'];case 0x9:return _0x43072e['y']<this['y'];}return![];},Game_CharacterBase['prototype'][_0x4af1ad(0x1fe)]=function(_0x50e7f4){const _0x3b16d0=_0x4af1ad;this[_0x3b16d0(0x211)](_0x50e7f4);switch(this['direction']()){case 0x1:return _0x50e7f4['y']<this['y'];case 0x2:return _0x50e7f4['y']<this['y'];case 0x3:return _0x50e7f4['y']<this['y'];case 0x4:return _0x50e7f4['x']>this['x'];case 0x6:return _0x50e7f4['x']<this['x'];case 0x7:return _0x50e7f4['y']>this['y'];case 0x8:return _0x50e7f4['y']>this['y'];case 0x9:return _0x50e7f4['y']>this['y'];}return![];},Game_CharacterBase[_0x4af1ad(0x225)][_0x4af1ad(0x1af)]=function(_0x3c3c5d){const _0x3c88ae=_0x4af1ad;this['debugShowDirections'](_0x3c3c5d);switch(this[_0x3c88ae(0x2bb)]()){case 0x1:return this['x']<_0x3c3c5d['x']&&this['y']>_0x3c3c5d['y']||this['x']>_0x3c3c5d['x']&&this['y']<_0x3c3c5d['y'];case 0x2:return this['x']!==_0x3c3c5d['x'];case 0x3:return this['x']>_0x3c3c5d['x']&&this['y']>_0x3c3c5d['y']||this['x']<_0x3c3c5d['x']&&this['y']<_0x3c3c5d['y'];case 0x4:return this['y']!==_0x3c3c5d['y'];break;case 0x6:return this['y']!==_0x3c3c5d['y'];break;case 0x7:return this['x']>_0x3c3c5d['x']&&this['y']>_0x3c3c5d['y']||this['x']<_0x3c3c5d['x']&&this['y']<_0x3c3c5d['y'];case 0x8:return this['x']!==_0x3c3c5d['x'];case 0x9:return this['x']<_0x3c3c5d['x']&&this['y']>_0x3c3c5d['y']||this['x']>_0x3c3c5d['x']&&this['y']<_0x3c3c5d['y'];}return![];},VisuMZ['EncounterEffects'][_0x4af1ad(0x245)]=Game_Player[_0x4af1ad(0x225)]['initMembers'],Game_Player[_0x4af1ad(0x225)]['initMembers']=function(){const _0xc19f6c=_0x4af1ad;VisuMZ[_0xc19f6c(0x26a)][_0xc19f6c(0x245)]['call'](this),this[_0xc19f6c(0x2ec)]();},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x2ec)]=function(){const _0x5d4b96=_0x4af1ad;this[_0x5d4b96(0x21d)]=![];},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x19e)]=function(){const _0x4bdef=_0x4af1ad;return this[_0x4bdef(0x21d)]===undefined&&this[_0x4bdef(0x2ec)](),this[_0x4bdef(0x21d)];},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x315)]=function(_0x4d259f){this['_alertStealthMode']===undefined&&this['initEncounterEffects'](),this['_alertStealthMode']=_0x4d259f;},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x25b)]=function(){const _0x350ae2=_0x4af1ad;if(this[_0x350ae2(0x278)]())return this['processRepelEncounters'](),0x0;const _0x57e30e=VisuMZ[_0x350ae2(0x26a)][_0x350ae2(0x279)][_0x350ae2(0x28d)];if(!_0x57e30e)return 0x1;let _0x3913a9=0x1;return $gameMap[_0x350ae2(0x216)](this['x'],this['y'])&&(_0x3913a9*=_0x57e30e[_0x350ae2(0x2aa)]),$gameParty['hasEncounterHalf']()&&(_0x3913a9*=0.5),this[_0x350ae2(0x2d1)]()&&(_0x3913a9*=_0x57e30e[_0x350ae2(0x233)]),this[_0x350ae2(0x2e5)]()&&(_0x3913a9*=_0x57e30e[_0x350ae2(0x250)]),this[_0x350ae2(0x252)]()&&(_0x3913a9=this[_0x350ae2(0x2e2)](_0x3913a9)),_0x3913a9;},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x278)]=function(){const _0x1a982b=_0x4af1ad,_0x4c7512=VisuMZ[_0x1a982b(0x26a)][_0x1a982b(0x279)][_0x1a982b(0x244)];if(!_0x4c7512)return![];if(_0x4c7512['RepelVariable']<=0x0)return![];const _0x3b4fb7=$gameVariables[_0x1a982b(0x2f6)](_0x4c7512[_0x1a982b(0x2e6)])||0x0;return _0x3b4fb7>0x0;},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x187)]=function(){const _0x5b5c6f=_0x4af1ad,_0x2c295a=VisuMZ[_0x5b5c6f(0x26a)][_0x5b5c6f(0x279)][_0x5b5c6f(0x244)];if(!_0x2c295a)return;if(_0x2c295a[_0x5b5c6f(0x2e6)]<=0x0)return;let _0x3c7356=$gameVariables[_0x5b5c6f(0x2f6)](_0x2c295a[_0x5b5c6f(0x2e6)])||0x0;const _0x3bca05=_0x3c7356>0x0;_0x3bca05&&(_0x3c7356--,$gameVariables[_0x5b5c6f(0x152)](_0x2c295a['RepelVariable'],_0x3c7356),_0x3c7356<=0x0&&_0x2c295a['RepelEvent']>0x0&&$gameTemp[_0x5b5c6f(0x16e)](_0x2c295a[_0x5b5c6f(0x2c4)]));},Game_Player[_0x4af1ad(0x225)]['isLureEncounters']=function(){const _0x5ade3d=_0x4af1ad,_0x161079=VisuMZ[_0x5ade3d(0x26a)][_0x5ade3d(0x279)]['RepelLure'];if(!_0x161079)return![];if(_0x161079[_0x5ade3d(0x176)]<=0x0)return![];const _0x522193=$gameVariables[_0x5ade3d(0x2f6)](_0x161079['LureVariable'])||0x0;return _0x522193>0x0;},Game_Player[_0x4af1ad(0x225)][_0x4af1ad(0x2e2)]=function(_0x44fe15){const _0x1c985c=_0x4af1ad,_0x1f2d51=VisuMZ[_0x1c985c(0x26a)][_0x1c985c(0x279)][_0x1c985c(0x244)];if(!_0x1f2d51)return _0x44fe15;if(_0x1f2d51[_0x1c985c(0x176)]<=0x0)return _0x44fe15;let _0x375020=$gameVariables[_0x1c985c(0x2f6)](_0x1f2d51[_0x1c985c(0x176)])||0x0;const _0x54a812=_0x375020>0x0;return _0x54a812&&(_0x375020--,$gameVariables[_0x1c985c(0x152)](_0x1f2d51[_0x1c985c(0x176)],_0x375020),_0x375020<=0x0&&_0x1f2d51['LureEvent']>0x0&&$gameTemp[_0x1c985c(0x16e)](_0x1f2d51[_0x1c985c(0x2d5)])),_0x44fe15*=_0x1f2d51[_0x1c985c(0x1a0)],_0x44fe15+=_0x1f2d51[_0x1c985c(0x17e)],_0x44fe15;},VisuMZ['EncounterEffects'][_0x4af1ad(0x2f9)]=Game_Follower[_0x4af1ad(0x225)][_0x4af1ad(0x1a6)],Game_Follower[_0x4af1ad(0x225)][_0x4af1ad(0x1a6)]=function(){const _0x619a95=_0x4af1ad;if($gameTemp[_0x619a95(0x2ed)])return![];return VisuMZ[_0x619a95(0x26a)][_0x619a95(0x2f9)]['call'](this);},VisuMZ[_0x4af1ad(0x26a)]['Game_Event_clearPageSettings']=Game_Event[_0x4af1ad(0x225)]['clearPageSettings'],Game_Event[_0x4af1ad(0x225)]['clearPageSettings']=function(){const _0x3b108a=_0x4af1ad;VisuMZ['EncounterEffects']['Game_Event_clearPageSettings'][_0x3b108a(0x22d)](this),this[_0x3b108a(0x264)]();},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x2c5)]=Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x1f6)],Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x1f6)]=function(){const _0xc8f29e=_0x4af1ad;VisuMZ[_0xc8f29e(0x26a)][_0xc8f29e(0x2c5)][_0xc8f29e(0x22d)](this),this[_0xc8f29e(0x2ab)]();},Game_Event['prototype']['setupEncounterEffectsEffects']=function(){const _0x2b890b=_0x4af1ad;this[_0x2b890b(0x264)](),this[_0x2b890b(0x163)](),this['setupEncounterEffectsCommentTags']();},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x163)]=function(_0x4ac552){const _0x7e7ce3=_0x4af1ad;if(!this[_0x7e7ce3(0x1b1)]())return;const _0xbdab13=this[_0x7e7ce3(0x1b1)]()[_0x7e7ce3(0x229)];if(_0xbdab13==='')return;this[_0x7e7ce3(0x24d)](_0xbdab13);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x2ef)]=function(_0x8a9f05){const _0x3dedb8=_0x4af1ad;if(!this['event']())return;if(!this[_0x3dedb8(0x165)]())return;const _0x87795f=this[_0x3dedb8(0x15d)]();let _0xd360fc='';for(const _0x9fd689 of _0x87795f){if([0x6c,0x198][_0x3dedb8(0x151)](_0x9fd689[_0x3dedb8(0x1d2)])){if(_0xd360fc!=='')_0xd360fc+='\x0a';_0xd360fc+=_0x9fd689[_0x3dedb8(0x263)][0x0];}}this['checkEncounterEffectsStringTags'](_0xd360fc);},Game_Event[_0x4af1ad(0x225)]['initEncounterEffectsEffects']=function(){const _0x491b5e=_0x4af1ad;this['_EncounterEffectsFollowerTrigger']=![],this[_0x491b5e(0x171)]=![],this[_0x491b5e(0x188)]();},Game_Event['prototype']['checkEncounterEffectsStringTags']=function(_0x3b66f1){const _0x46f530=_0x4af1ad,_0x447bf1=VisuMZ[_0x46f530(0x26a)]['RegExp'];_0x3b66f1[_0x46f530(0x230)](_0x447bf1[_0x46f530(0x2c8)])&&(this[_0x46f530(0x217)]=!![],this[_0x46f530(0x235)]=0x2),_0x3b66f1[_0x46f530(0x230)](_0x447bf1['TouchDirectionLock'])&&(this[_0x46f530(0x171)]=!![]),this['checkEncounterEffectsStringTagsChase'](_0x3b66f1);},VisuMZ['EncounterEffects'][_0x4af1ad(0x1ab)]=Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x297)],Game_Event['prototype'][_0x4af1ad(0x297)]=function(_0x2affb4,_0x452a8a){const _0x518841=_0x4af1ad;VisuMZ[_0x518841(0x26a)]['Game_Event_checkEventTriggerTouch']['call'](this,_0x2affb4,_0x452a8a),this[_0x518841(0x27b)](_0x2affb4,_0x452a8a);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x27b)]=function(_0x2ae46e,_0x2fe8e3){const _0x438bc6=_0x4af1ad;if(!this[_0x438bc6(0x217)])return;if($gameMap[_0x438bc6(0x150)]())return;if(this[_0x438bc6(0x235)]!==0x2)return;if(this[_0x438bc6(0x274)]())return;if(!this[_0x438bc6(0x1c5)]())return;const _0x27cf14=$gamePlayer[_0x438bc6(0x1a5)]()[_0x438bc6(0x1b8)]();for(const _0x3fbfdc of _0x27cf14){if(!_0x3fbfdc)continue;if(_0x3fbfdc['pos'](_0x2ae46e,_0x2fe8e3)){this[_0x438bc6(0x160)]();break;}}},VisuMZ['EncounterEffects'][_0x4af1ad(0x2a6)]=Game_Event[_0x4af1ad(0x225)]['lock'],Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x2a1)]=function(){const _0xa6ec8b=_0x4af1ad;this[_0xa6ec8b(0x14d)]=!!this[_0xa6ec8b(0x171)],VisuMZ[_0xa6ec8b(0x26a)][_0xa6ec8b(0x2a6)]['call'](this),this['_processEncounterDirectionLock']=undefined;},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x1d8)]=Game_Character[_0x4af1ad(0x225)][_0x4af1ad(0x1c1)],Game_Character['prototype'][_0x4af1ad(0x1c1)]=function(){const _0xe6043a=_0x4af1ad;if(this['_processEncounterDirectionLock'])return;VisuMZ['EncounterEffects'][_0xe6043a(0x1d8)][_0xe6043a(0x22d)](this);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x188)]=function(){const _0x3bba34=_0x4af1ad,_0x1a3f48=VisuMZ[_0x3bba34(0x26a)][_0x3bba34(0x279)][_0x3bba34(0x1a4)];this[_0x3bba34(0x177)]={'enabled':![],'alerted':![],'alertRange':_0x1a3f48[_0x3bba34(0x1f1)],'alertDash':_0x1a3f48[_0x3bba34(0x1cb)],'alertLock':_0x1a3f48[_0x3bba34(0x265)],'chaseTime':_0x1a3f48[_0x3bba34(0x265)],'fovAngle':_0x1a3f48[_0x3bba34(0x268)],'showFov':_0x1a3f48['ShowFoV'],'response':_0x1a3f48[_0x3bba34(0x1d9)],'alertBalloon':VisuMZ[_0x3bba34(0x26a)]['ConvertBallonTextToID'](_0x1a3f48[_0x3bba34(0x246)]),'commonEvent':_0x1a3f48[_0x3bba34(0x2ce)],'reactDelay':_0x1a3f48[_0x3bba34(0x304)],'reactTime':_0x1a3f48[_0x3bba34(0x304)],'alertSoundName':_0x1a3f48[_0x3bba34(0x1db)],'alertSoundVolume':_0x1a3f48[_0x3bba34(0x16c)],'alertSoundPitch':_0x1a3f48['SoundPitch'],'alertSoundPan':_0x1a3f48[_0x3bba34(0x1fb)],'returnStartBalloon':VisuMZ[_0x3bba34(0x26a)][_0x3bba34(0x26b)](_0x1a3f48[_0x3bba34(0x196)]),'returnEndBalloon':VisuMZ[_0x3bba34(0x26a)][_0x3bba34(0x26b)](_0x1a3f48[_0x3bba34(0x2c3)]),'returnAfter':_0x1a3f48['ReturnHome'],'returnWaiting':![],'returnTime':_0x1a3f48[_0x3bba34(0x1bb)],'returnWait':_0x1a3f48['ReturnWait'],'returning':![],'returnX':this['x'],'returnY':this['y'],'returnDir':this['direction'](),'overrideDiagonal':null};},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x26b)]=function(_0x4fedde){const _0x2a8b2b=_0x4af1ad;let _0x4f2fea=0x0;switch(_0x4fedde[_0x2a8b2b(0x1c8)]()['trim']()){case'!':case _0x2a8b2b(0x282):_0x4f2fea=0x1;break;case'?':case _0x2a8b2b(0x21c):_0x4f2fea=0x2;break;case _0x2a8b2b(0x1e5):case _0x2a8b2b(0x21f):case _0x2a8b2b(0x168):case _0x2a8b2b(0x1f2):case _0x2a8b2b(0x158):_0x4f2fea=0x3;break;case _0x2a8b2b(0x193):case'LOVE':_0x4f2fea=0x4;break;case _0x2a8b2b(0x2ca):_0x4f2fea=0x5;break;case _0x2a8b2b(0x25e):_0x4f2fea=0x6;break;case _0x2a8b2b(0x317):case _0x2a8b2b(0x2c7):case'FRUSTRATION':_0x4f2fea=0x7;break;case'SILENCE':case _0x2a8b2b(0x2ac):_0x4f2fea=0x8;break;case _0x2a8b2b(0x1ef):case _0x2a8b2b(0x20e):case _0x2a8b2b(0x1bc):case _0x2a8b2b(0x213):case'LIGHTBULB':_0x4f2fea=0x9;break;case'Z':case'ZZ':case _0x2a8b2b(0x19c):case _0x2a8b2b(0x2f2):_0x4f2fea=0xa;break;case _0x2a8b2b(0x23f):_0x4f2fea=0xb;break;case _0x2a8b2b(0x240):_0x4f2fea=0xc;break;case _0x2a8b2b(0x293):_0x4f2fea=0xd;break;case _0x2a8b2b(0x1d6):_0x4f2fea=0xe;break;case _0x2a8b2b(0x15a):_0x4f2fea=0xf;break;}return _0x4f2fea;},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x174)]=function(_0x84c90){const _0x254c6c=_0x4af1ad,_0x116c4c=VisuMZ['EncounterEffects']['RegExp'],_0x2d25cd=this[_0x254c6c(0x177)];_0x84c90['match'](_0x116c4c[_0x254c6c(0x231)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![]);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x1f1)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x236)]=Number(RegExp['$1'])||0x1);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x1cb)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x2a0)]=![]);_0x84c90['match'](_0x116c4c['AlertWalk'])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x2a0)]=![]);_0x84c90['match'](_0x116c4c['AlertLock'])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x1ff)]=Number(RegExp['$1'])||0x1,_0x2d25cd[_0x254c6c(0x16f)]=Number(RegExp['$1'])||0x1);_0x84c90['match'](_0x116c4c[_0x254c6c(0x17d)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x29f)]=Number(RegExp['$1'])||0x1);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x1c9)])&&(_0x2d25cd['enabled']=!![],_0x2d25cd[_0x254c6c(0x300)]=!![]);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x316)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x300)]=![]);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x17c)])&&(_0x2d25cd['enabled']=!![],_0x2d25cd['response']=String(RegExp['$1'])[_0x254c6c(0x17a)]()[_0x254c6c(0x197)]());if(_0x84c90['match'](_0x116c4c[_0x254c6c(0x2ff)])){_0x2d25cd[_0x254c6c(0x23a)]=!![];const _0x707ba8=VisuMZ['EncounterEffects'][_0x254c6c(0x26b)](String(RegExp['$1']));_0x2d25cd[_0x254c6c(0x275)]=_0x707ba8;}_0x84c90[_0x254c6c(0x230)](_0x116c4c['AlertReactDelay'])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd['reactDelay']=Number(RegExp['$1'])||0x1,_0x2d25cd[_0x254c6c(0x299)]=Number(RegExp['$1'])||0x1);_0x84c90[_0x254c6c(0x230)](_0x116c4c['AlertCommonEvent'])&&(_0x2d25cd['enabled']=!![],_0x2d25cd[_0x254c6c(0x2fa)]=Number(RegExp['$1'])||0x0);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x141)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x27f)]=String(RegExp['$1']));_0x84c90['match'](_0x116c4c[_0x254c6c(0x2af)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x2d0)]=Number(RegExp['$1'])||0x1);_0x84c90[_0x254c6c(0x230)](_0x116c4c['AlertSoundPitch'])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd['alertSoundPitch']=Number(RegExp['$1'])||0x1);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x2e8)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x22b)]=Number(RegExp['$1'])||0x1);_0x84c90[_0x254c6c(0x230)](_0x116c4c['ReturnPosition'])&&(_0x2d25cd['enabled']=!![],_0x2d25cd[_0x254c6c(0x1f5)]=!![]);_0x84c90[_0x254c6c(0x230)](_0x116c4c[_0x254c6c(0x285)])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x1f5)]=![]);if(_0x84c90['match'](_0x116c4c[_0x254c6c(0x196)])){_0x2d25cd[_0x254c6c(0x23a)]=!![];const _0x44d8f=VisuMZ[_0x254c6c(0x26a)][_0x254c6c(0x26b)](String(RegExp['$1']));_0x2d25cd['returnStartBalloon']=_0x44d8f;}if(_0x84c90[_0x254c6c(0x230)](_0x116c4c['ReturnEndBalloon'])){_0x2d25cd[_0x254c6c(0x23a)]=!![];const _0x307cd6=VisuMZ['EncounterEffects'][_0x254c6c(0x26b)](String(RegExp['$1']));_0x2d25cd[_0x254c6c(0x178)]=_0x307cd6;}_0x84c90[_0x254c6c(0x230)](_0x116c4c['ReturnWait'])&&(_0x2d25cd[_0x254c6c(0x23a)]=!![],_0x2d25cd[_0x254c6c(0x23b)]=Number(RegExp['$1'])||0x1,_0x2d25cd[_0x254c6c(0x149)]=Number(RegExp['$1'])||0x1);if(_0x84c90['match'](_0x116c4c[_0x254c6c(0x1b4)]))_0x2d25cd[_0x254c6c(0x1e9)]=!![];else _0x84c90['match'](_0x116c4c[_0x254c6c(0x18f)])&&(_0x2d25cd[_0x254c6c(0x1e9)]=![]);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x20b)]=function(){const _0xca02e6=_0x4af1ad;return this['_EncounterEffects_EventChaseData']===undefined&&this[_0xca02e6(0x1a8)](),this[_0xca02e6(0x177)];},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x2c2)]=function(){const _0x1ffd6a=_0x4af1ad;if(this[_0x1ffd6a(0x232)])return![];return this[_0x1ffd6a(0x20b)]()[_0x1ffd6a(0x23a)];},Game_Event[_0x4af1ad(0x225)]['isChaseReturning']=function(){const _0x1268f1=_0x4af1ad;if(Imported[_0x1268f1(0x1a1)]){if(this[_0x1268f1(0x2fe)]())return![];}return this[_0x1268f1(0x20b)]()[_0x1268f1(0x1e0)]||this['chaseData']()['returning'];},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x20a)]=function(){const _0x3b2728=_0x4af1ad;if(Imported[_0x3b2728(0x1a1)]){if(this['isPreventSelfMovement']())return![];}return this[_0x3b2728(0x20b)]()[_0x3b2728(0x2ad)];},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x2a4)]=Game_Event['prototype'][_0x4af1ad(0x307)],Game_Event[_0x4af1ad(0x225)]['updateSelfMovement']=function(){const _0x35753a=_0x4af1ad;if(this[_0x35753a(0x20a)]())this['updateSelfMovementAlerted']();else this[_0x35753a(0x266)]()?this[_0x35753a(0x28c)]():VisuMZ[_0x35753a(0x26a)][_0x35753a(0x2a4)][_0x35753a(0x22d)](this);},Game_Event[_0x4af1ad(0x225)]['updateSelfMovementAlerted']=function(){const _0x33aa8f=_0x4af1ad,_0x2eb89a=this[_0x33aa8f(0x20b)]();if(_0x2eb89a[_0x33aa8f(0x299)]>0x0){_0x2eb89a['reactTime']-=0x1;return;}switch(_0x2eb89a[_0x33aa8f(0x2ea)]){case _0x33aa8f(0x14f):this['updateSelfMovementSmartChase']();break;case _0x33aa8f(0x140):this[_0x33aa8f(0x22e)]();break;case'flee':this[_0x33aa8f(0x159)]();break;case _0x33aa8f(0x2eb):this[_0x33aa8f(0x154)]();break;default:VisuMZ['EncounterEffects'][_0x33aa8f(0x2a4)][_0x33aa8f(0x22d)](this);break;}},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x243)]=function(){const _0x353583=_0x4af1ad;if(Imported[_0x353583(0x1a1)]){if(this['chaseData']()[_0x353583(0x1e9)]===!![])return!![];else{if(this[_0x353583(0x20b)]()[_0x353583(0x1e9)]===![])return![];}return $gameMap[_0x353583(0x166)]();}return![];},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x1b7)]=function(_0x517bf7,_0x248235,_0x1c2901){const _0x91884c=_0x4af1ad,_0x333d7b=$gameSystem[_0x91884c(0x1aa)],_0x58f68b=this['chaseData']();[_0x91884c(0x140),'flee'][_0x91884c(0x151)](_0x58f68b[_0x91884c(0x2ea)])&&this[_0x91884c(0x243)]()!==null&&($gameSystem[_0x91884c(0x1aa)]=this[_0x91884c(0x243)]()?_0x91884c(0x267):'disable');const _0x1f3f00=Game_Character['prototype']['getDirectionToPoint'][_0x91884c(0x22d)](this,_0x517bf7,_0x248235,_0x1c2901);return $gameSystem[_0x91884c(0x1aa)]=_0x333d7b,_0x1f3f00;},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x1a7)]=function(_0x55005b,_0x463c91,_0x4824df){const _0xb17f06=_0x4af1ad,_0x27c7f5=$gameSystem[_0xb17f06(0x1aa)],_0x3f80e4=this[_0xb17f06(0x20b)]();[_0xb17f06(0x140),_0xb17f06(0x257)][_0xb17f06(0x151)](_0x3f80e4['response'])&&this[_0xb17f06(0x243)]()!==null&&($gameSystem[_0xb17f06(0x1aa)]=this[_0xb17f06(0x243)]()?_0xb17f06(0x267):_0xb17f06(0x29d));const _0x389e08=Game_Character[_0xb17f06(0x225)][_0xb17f06(0x1a7)][_0xb17f06(0x22d)](this,_0x55005b,_0x463c91,_0x4824df);return $gameSystem[_0xb17f06(0x1aa)]=_0x27c7f5,_0x389e08;},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x18c)]=function(){const _0x9c60bd=_0x4af1ad;if(!this['needsSmartChaseUpdate']())return;this[_0x9c60bd(0x2c6)]=this['_eventAlertChaseCache']||{},this[_0x9c60bd(0x2c6)][_0x9c60bd(0x276)]=$gamePlayer['x'],this[_0x9c60bd(0x2c6)]['playerY']=$gamePlayer['y'],this[_0x9c60bd(0x2c6)][_0x9c60bd(0x277)]=this['x'],this[_0x9c60bd(0x2c6)][_0x9c60bd(0x2b0)]=this['y'];const _0xde56af=this[_0x9c60bd(0x243)]();let _0x589425=$gamePlayer['x'],_0x247df8=$gamePlayer['y'],_0x23f8bd=0x0;if(_0xde56af){if(this[_0x9c60bd(0x217)])$gameTemp['_calcChasePathing']=!![];_0x23f8bd=this[_0x9c60bd(0x2a7)](_0x589425,_0x247df8);if(this[_0x9c60bd(0x217)])$gameTemp[_0x9c60bd(0x2ed)]=undefined;this[_0x9c60bd(0x15c)](_0x23f8bd);}else{if(this[_0x9c60bd(0x217)])$gameTemp[_0x9c60bd(0x2ed)]=!![];_0x23f8bd=this['findDirectionTo'](_0x589425,_0x247df8);if(this[_0x9c60bd(0x217)])$gameTemp[_0x9c60bd(0x2ed)]=undefined;this[_0x9c60bd(0x23c)](_0x23f8bd);}},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x29e)]=function(){const _0x32914c=_0x4af1ad;if(this['isMoving']())return![];this[_0x32914c(0x2c6)]=this[_0x32914c(0x2c6)]||{};if(this[_0x32914c(0x2c6)]['playerX']!==$gamePlayer['x'])return!![];if(this[_0x32914c(0x2c6)][_0x32914c(0x1c2)]!==$gamePlayer['y'])return!![];if(this[_0x32914c(0x2c6)][_0x32914c(0x277)]!==this['x'])return!![];if(this[_0x32914c(0x2c6)][_0x32914c(0x2b0)]!==this['y'])return!![];return![];},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x28c)]=function(){const _0xb19f27=_0x4af1ad,_0x8a7c30=this[_0xb19f27(0x20b)]();if(!_0x8a7c30[_0xb19f27(0x1d4)])return;let _0x808ac1=_0x8a7c30[_0xb19f27(0x305)],_0x315956=_0x8a7c30[_0xb19f27(0x227)];this['x']===_0x808ac1&&this['y']===_0x315956&&(_0x8a7c30['returning']=![],this['_moveRouteIndex']=0x0,this[_0xb19f27(0x1e1)](_0x8a7c30[_0xb19f27(0x228)]));const _0x1d6398=this[_0xb19f27(0x243)]();let _0x3c5a4c=0x0;_0x1d6398?(_0x3c5a4c=this[_0xb19f27(0x2a7)](_0x808ac1,_0x315956),this[_0xb19f27(0x15c)](_0x3c5a4c)):(_0x3c5a4c=this[_0xb19f27(0x302)](_0x808ac1,_0x315956),this['moveStraight'](_0x3c5a4c));},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x2b6)]=Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x2df)],Game_Event['prototype'][_0x4af1ad(0x2df)]=function(){const _0xc097da=_0x4af1ad;VisuMZ[_0xc097da(0x26a)][_0xc097da(0x2b6)]['call'](this),this[_0xc097da(0x254)]();},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x254)]=function(){const _0x966f4f=_0x4af1ad;if(!this[_0x966f4f(0x2c2)]())return;if(Imported[_0x966f4f(0x1a1)]){if(this[_0x966f4f(0x2fe)]())return![];}this['isChaseAlerted']()?this[_0x966f4f(0x18b)]():(this['updateAlertReturnWait'](),this[_0x966f4f(0x288)]());},Game_Event['prototype'][_0x4af1ad(0x18b)]=function(){const _0x12cf22=_0x4af1ad,_0x52d027=this[_0x12cf22(0x20b)](),_0x3b314f=this['getAlertDistanceToClosest']();if(_0x3b314f>_0x52d027['alertRange']){_0x52d027[_0x12cf22(0x16f)]--;if(_0x52d027[_0x12cf22(0x16f)]>0x0)return;_0x52d027[_0x12cf22(0x2ad)]=![],_0x52d027[_0x12cf22(0x1f5)]?(_0x52d027[_0x12cf22(0x1e0)]=!![],_0x52d027[_0x12cf22(0x23b)]=_0x52d027['returnWait'],$gameTemp[_0x12cf22(0x25d)](this,_0x52d027[_0x12cf22(0x1ba)])):$gameTemp['requestBalloon'](this,_0x52d027[_0x12cf22(0x178)]);}else _0x52d027[_0x12cf22(0x16f)]=_0x52d027[_0x12cf22(0x1ff)];},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x17b)]=function(){const _0x2e2675=_0x4af1ad,_0x430f94=this[_0x2e2675(0x20b)]();if(!_0x430f94['returnWaiting'])return;_0x430f94[_0x2e2675(0x23b)]-=0x1,_0x430f94[_0x2e2675(0x23b)]<=0x0&&(_0x430f94[_0x2e2675(0x1e0)]=![],_0x430f94[_0x2e2675(0x1d4)]=!![],$gameTemp[_0x2e2675(0x25d)](this,_0x430f94[_0x2e2675(0x178)]));},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x288)]=function(){const _0x2e8b17=_0x4af1ad;if($gamePlayer['getAlertStealthMode']())return;const _0x491d25=this[_0x2e8b17(0x20b)](),_0x3f0864=Math[_0x2e8b17(0x199)](this[_0x2e8b17(0x25f)]());if(_0x3f0864>_0x491d25[_0x2e8b17(0x236)])return;const _0x2423a0=this[_0x2e8b17(0x1b2)]();if(_0x2423a0>_0x491d25[_0x2e8b17(0x29f)])return;if(!this[_0x2e8b17(0x283)]())return;_0x491d25[_0x2e8b17(0x2ad)]=!![],_0x491d25[_0x2e8b17(0x16f)]=_0x491d25[_0x2e8b17(0x1ff)],_0x491d25[_0x2e8b17(0x1e0)]=![],_0x491d25[_0x2e8b17(0x1d4)]=![],$gameTemp[_0x2e8b17(0x25d)](this,_0x491d25[_0x2e8b17(0x275)]),_0x491d25[_0x2e8b17(0x299)]=_0x491d25[_0x2e8b17(0x286)];_0x491d25[_0x2e8b17(0x2fa)]>0x0&&$gameTemp[_0x2e8b17(0x16e)](_0x491d25[_0x2e8b17(0x2fa)]);if(_0x491d25['alertSoundName']!==''){const _0x36c04b={'name':_0x491d25[_0x2e8b17(0x27f)],'volume':_0x491d25['alertSoundVolume'],'pitch':_0x491d25['alertSoundPitch'],'pan':_0x491d25[_0x2e8b17(0x22b)]};AudioManager[_0x2e8b17(0x209)](_0x36c04b);}},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x195)]=function(){const _0x30d734=_0x4af1ad,_0x488e6b=[$gamePlayer];if($gamePlayer[_0x30d734(0x1a5)]()[_0x30d734(0x19b)])for(let _0x435ee8=0x0;_0x435ee8<$gamePlayer['followers']()[_0x30d734(0x28e)][_0x30d734(0x142)];_0x435ee8++){const _0x726b38=$gamePlayer['followers']()[_0x30d734(0x2cc)](_0x435ee8);if(!_0x726b38)continue;if(!_0x726b38[_0x30d734(0x1de)]())continue;_0x488e6b['push'](_0x726b38);}return _0x488e6b;},Game_Event['prototype'][_0x4af1ad(0x25f)]=function(){const _0x3d1040=_0x4af1ad,_0x25b346=[];_0x25b346[_0x3d1040(0x2f4)](this[_0x3d1040(0x16d)]());for(let _0x18ddff=0x0;_0x18ddff<$gamePlayer[_0x3d1040(0x1a5)]()[_0x3d1040(0x28e)][_0x3d1040(0x142)];_0x18ddff++){_0x25b346[_0x3d1040(0x2f4)](this[_0x3d1040(0x2fc)](_0x18ddff));}return Math[_0x3d1040(0x180)](..._0x25b346);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x16d)]=function(){const _0x4d9799=_0x4af1ad;return this[_0x4d9799(0x1b9)]($gamePlayer);},Game_Event['prototype'][_0x4af1ad(0x2fc)]=function(_0x55c0c3){const _0x494877=_0x4af1ad;if(!$gamePlayer[_0x494877(0x1a5)]()[_0x494877(0x19b)])return 0x3e7;const _0x3cad44=$gamePlayer[_0x494877(0x1a5)]()['follower'](_0x55c0c3);if(!_0x3cad44['actor']())return 0x3e7;return this[_0x494877(0x1b9)](_0x3cad44);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x1b9)]=function(_0x3e000c){const _0x31c05e=_0x4af1ad,_0x32b4d7=this['x'],_0x11d993=this['y'],_0x3ad4d=_0x3e000c['x'],_0x58fca3=_0x3e000c['y'],_0x1cfbd0=Math[_0x31c05e(0x222)](_0x3ad4d-_0x32b4d7,0x2),_0x40ad78=Math[_0x31c05e(0x222)](_0x58fca3-_0x11d993,0x2);return Math[_0x31c05e(0x287)](_0x1cfbd0+_0x40ad78);},Game_Event[_0x4af1ad(0x225)]['getAlertAngleToPlayer']=function(_0x4cfe44){const _0x1705b7=_0x4af1ad;return this[_0x1705b7(0x218)]($gamePlayer,_0x4cfe44);},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x1ea)]=function(_0x5b58a1,_0x51c8e3){const _0x33353b=_0x4af1ad;if(!$gamePlayer[_0x33353b(0x1a5)]()[_0x33353b(0x19b)])return 0x3e7;const _0x2b8464=$gamePlayer[_0x33353b(0x1a5)]()[_0x33353b(0x2cc)](_0x5b58a1);if(!_0x2b8464['actor']())return 0x3e7;return this[_0x33353b(0x218)](_0x2b8464,_0x51c8e3);},Game_Event['prototype']['getAlertAngleToTarget']=function(_0x1783fa,_0x10eab8){const _0x4dd3ff=_0x4af1ad,_0x55da73=this['x'],_0x3c2261=this['y'],_0x3abde6=_0x1783fa['x'],_0x2cc5dc=_0x1783fa['y'];let _0x54a506=Math[_0x4dd3ff(0x2f7)](_0x2cc5dc-_0x3c2261,_0x3abde6-_0x55da73)*0xb4/Math['PI'];if(!_0x10eab8){const _0x19ceb4=[0x0,0xe1,0x10e,0x13b,0xb4,0x0,0x0,0x87,0x5a,0x2d][this['direction']()];_0x54a506+=_0x19ceb4,_0x54a506+=this[_0x4dd3ff(0x20b)]()[_0x4dd3ff(0x29f)]/0x2;}while(_0x54a506<0x0)_0x54a506+=0x168;while(_0x54a506>=0x168)_0x54a506-=0x168;return _0x54a506;},Game_Event[_0x4af1ad(0x225)][_0x4af1ad(0x283)]=function(){const _0x570669=_0x4af1ad;let _0x15a15d=![];const _0x246422=this[_0x570669(0x25f)]();_0x15a15d&&(console[_0x570669(0x212)](_0x570669(0x255),$gamePlayer['x'],$gamePlayer['y']),console['log'](_0x570669(0x2dc),this['x'],this['y']));const _0x234be2=this['getAlertTargets']();for(const _0x32fe7b of _0x234be2){if(!_0x32fe7b)continue;let _0x5ba1a0=_0x246422,_0x1d3bf1=this[_0x570669(0x218)](_0x32fe7b,!![]),_0x58c4e0=_0x1d3bf1*Math['PI']/0xb4;while(_0x5ba1a0>=0x0){const _0x42f86d=Math[_0x570669(0x199)](this['x']+_0x5ba1a0*Math[_0x570669(0x251)](_0x58c4e0)),_0x4536b3=Math[_0x570669(0x199)](this['y']+_0x5ba1a0*Math[_0x570669(0x1ae)](_0x58c4e0));_0x5ba1a0-=0x1;_0x15a15d&&console[_0x570669(0x212)](_0x570669(0x242),_0x1d3bf1,_0x5ba1a0,_0x42f86d,_0x4536b3);if($gameMap[_0x570669(0x2f1)](_0x42f86d,_0x4536b3))return![];}}return!![];},VisuMZ['EncounterEffects']['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x4af1ad(0x225)][_0x4af1ad(0x269)],Game_CharacterBase[_0x4af1ad(0x225)][_0x4af1ad(0x269)]=function(){const _0x48e6dd=_0x4af1ad;if(this[_0x48e6dd(0x291)]===Game_Event&&this[_0x48e6dd(0x20a)]()&&this[_0x48e6dd(0x20b)]()[_0x48e6dd(0x2a0)])return this[_0x48e6dd(0x271)]();return VisuMZ[_0x48e6dd(0x26a)][_0x48e6dd(0x172)][_0x48e6dd(0x22d)](this);},VisuMZ['EncounterEffects'][_0x4af1ad(0x206)]=Game_CharacterBase['prototype'][_0x4af1ad(0x221)],Game_CharacterBase[_0x4af1ad(0x225)]['setBalloonPose']=function(_0x547ce9,_0x255251){const _0x490baf=_0x4af1ad;if(this['constructor']===Game_Event){if(this[_0x490baf(0x266)]()||this[_0x490baf(0x20a)]())return;}VisuMZ['EncounterEffects'][_0x490baf(0x206)][_0x490baf(0x22d)](this,_0x547ce9,_0x255251);},Game_Interpreter['prototype']['checkEventFacingPlayerFront']=function(){const _0x56461d=_0x4af1ad,_0x614071=$gameMap[_0x56461d(0x1b1)](this[_0x56461d(0x2e9)]());if(!_0x614071)return![];const _0x58a2c6=$gamePlayer;return _0x614071[_0x56461d(0x189)](_0x58a2c6)&&_0x58a2c6[_0x56461d(0x21e)](_0x614071);},Game_Interpreter[_0x4af1ad(0x225)][_0x4af1ad(0x2b8)]=function(){const _0x21deae=_0x4af1ad,_0x393b40=$gameMap[_0x21deae(0x1b1)](this[_0x21deae(0x2e9)]());if(!_0x393b40)return![];const _0x1ccedc=$gamePlayer;return _0x393b40[_0x21deae(0x182)](_0x1ccedc)&&_0x1ccedc[_0x21deae(0x1fe)](_0x393b40);},Game_Interpreter[_0x4af1ad(0x225)][_0x4af1ad(0x22a)]=function(){const _0x111750=_0x4af1ad,_0x39b4d5=$gameMap[_0x111750(0x1b1)](this[_0x111750(0x2e9)]());if(!_0x39b4d5)return![];const _0x26842c=$gamePlayer;return _0x39b4d5[_0x111750(0x2bf)](_0x26842c)&&_0x26842c['isPositionSideOf'](_0x39b4d5);},Game_Interpreter[_0x4af1ad(0x225)][_0x4af1ad(0x1be)]=function(){const _0x36919e=_0x4af1ad,_0x468cb5=$gameMap[_0x36919e(0x1b1)](this[_0x36919e(0x2e9)]());if(!_0x468cb5)return![];const _0x2e8a93=$gamePlayer;return _0x2e8a93[_0x36919e(0x189)](_0x468cb5)&&_0x468cb5[_0x36919e(0x21e)](_0x2e8a93);},Game_Interpreter['prototype'][_0x4af1ad(0x290)]=function(){const _0x5273d3=_0x4af1ad,_0x17cbfa=$gameMap[_0x5273d3(0x1b1)](this[_0x5273d3(0x2e9)]());if(!_0x17cbfa)return![];const _0x1bb6c9=$gamePlayer;return _0x1bb6c9['isFacingAway'](_0x17cbfa)&&_0x17cbfa[_0x5273d3(0x1fe)](_0x1bb6c9);},Game_Interpreter['prototype'][_0x4af1ad(0x183)]=function(){const _0x1f18ba=_0x4af1ad,_0x7fe155=$gameMap[_0x1f18ba(0x1b1)](this['eventId']());if(!_0x7fe155)return![];const _0x3d0baf=$gamePlayer;return _0x3d0baf[_0x1f18ba(0x2bf)](_0x7fe155)&&_0x7fe155['isPositionSideOf'](_0x3d0baf);},VisuMZ[_0x4af1ad(0x26a)]['Scene_Map_startEncounterEffect']=Scene_Map[_0x4af1ad(0x225)][_0x4af1ad(0x237)],Scene_Map[_0x4af1ad(0x225)]['startEncounterEffect']=function(){const _0x3db966=_0x4af1ad;this['_battleTransitionType']=$gameSystem[_0x3db966(0x2ba)](),this[_0x3db966(0x30e)]['createBattleTransitionFilter']();{const _0x1d15ce=$gamePlayer[_0x3db966(0x313)](),_0x314849=$gamePlayer['screenY']()-0x18,_0x1464a5=$gameScreen['_zoomX'],_0x3c784b=$gameScreen['_zoomY'];$gameScreen['setZoom'](_0x1d15ce,_0x314849,0x1,0x0),this[_0x3db966(0x2cf)](),$gameScreen[_0x3db966(0x14c)]=_0x1464a5,$gameScreen[_0x3db966(0x219)]=_0x3c784b;}$gameTemp[_0x3db966(0x186)]=!![],VisuMZ['EncounterEffects']['Scene_Map_startEncounterEffect'][_0x3db966(0x22d)](this),$gameTemp[_0x3db966(0x186)]=undefined,this[_0x3db966(0x312)]===_0x3db966(0x1d1)&&this['_spriteset'][_0x3db966(0x201)]();},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x256)]=Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x201)],Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x201)]=function(){const _0x4c1fc6=_0x4af1ad;if($gameTemp['_bypassHideCharacters'])return;VisuMZ['EncounterEffects'][_0x4c1fc6(0x256)]['call'](this);},Scene_Map[_0x4af1ad(0x225)]['encounterEffectSpeed']=function(){const _0x4e0b26=_0x4af1ad;return Math[_0x4e0b26(0x1ad)](0x6,$gameSystem[_0x4e0b26(0x1dc)]());},Scene_Map[_0x4af1ad(0x225)]['updateEncounterEffect']=function(){const _0x3baf0b=_0x4af1ad;if(Imported[_0x3baf0b(0x247)]){$gameTemp[_0x3baf0b(0x143)]=Scene_Map[_0x3baf0b(0x205)];const _0x1896d6=$gameScreen[_0x3baf0b(0x2bc)]();$gamePlayer[_0x3baf0b(0x214)](_0x1896d6['x'],_0x1896d6['y']);}this[_0x3baf0b(0x28f)]()?this['updateEncounterEffectOriginal']():this[_0x3baf0b(0x1a2)](),Imported[_0x3baf0b(0x247)]&&($gameTemp[_0x3baf0b(0x143)]=undefined);},Scene_Map[_0x4af1ad(0x225)][_0x4af1ad(0x28f)]=function(){const _0x212dcb=_0x4af1ad;return[_0x212dcb(0x259),'zoom'][_0x212dcb(0x151)](this[_0x212dcb(0x312)]);},Scene_Map[_0x4af1ad(0x225)][_0x4af1ad(0x2cb)]=function(){const _0x423d08=_0x4af1ad;if(this[_0x423d08(0x1fc)]>0x0){this[_0x423d08(0x1fc)]--,this['_spriteset'][_0x423d08(0x146)]();const _0x1ccb30=this['encounterEffectSpeed'](),_0xe6e3e7=_0x1ccb30-this['_encounterEffectDuration'],_0x3562ff=_0xe6e3e7/_0x1ccb30,_0x2332c3=((_0x3562ff-0x1)*0x14*_0x3562ff+0x5)*_0x3562ff+0x1,_0x1df744=$gamePlayer['screenX'](),_0x1b2b65=$gamePlayer['screenY']()-0x18;_0xe6e3e7===0x2&&(this[_0x423d08(0x312)]===_0x423d08(0x1d1)&&this[_0x423d08(0x2d2)](_0x1ccb30/0x2)),$gameScreen[_0x423d08(0x1ce)](_0x1df744,_0x1b2b65,_0x2332c3),_0xe6e3e7===Math[_0x423d08(0x1ec)](_0x1ccb30/0x6)&&(this[_0x423d08(0x312)]===_0x423d08(0x1d1)&&this[_0x423d08(0x2d2)](_0x1ccb30/0x2)),_0xe6e3e7===Math[_0x423d08(0x1ad)](0x1,_0x1ccb30-this[_0x423d08(0x310)]()-0x6)&&(BattleManager['playBattleBgm'](),this[_0x423d08(0x296)](this[_0x423d08(0x310)]()));}},Scene_Map[_0x4af1ad(0x225)]['updateEncounterEffectFilter']=function(){const _0x4dce3f=_0x4af1ad;if(this[_0x4dce3f(0x1fc)]>0x0){this['_encounterEffectDuration']--,this['_spriteset'][_0x4dce3f(0x146)]();const _0x580419=this[_0x4dce3f(0x1cf)](),_0x311830=_0x580419-this[_0x4dce3f(0x1fc)];_0x311830===Math[_0x4dce3f(0x1ad)](0x1,_0x580419-this[_0x4dce3f(0x310)]()-0x6)&&(BattleManager[_0x4dce3f(0x200)](),this['startFadeOut'](this[_0x4dce3f(0x310)]()));}},VisuMZ[_0x4af1ad(0x26a)]['Scene_Map_snapForBattleBackground']=Scene_Map[_0x4af1ad(0x225)][_0x4af1ad(0x2cf)],Scene_Map[_0x4af1ad(0x225)][_0x4af1ad(0x2cf)]=function(){const _0x41e37b=_0x4af1ad;this[_0x41e37b(0x153)](),this[_0x41e37b(0x30e)][_0x41e37b(0x173)](!![]),VisuMZ[_0x41e37b(0x26a)]['Scene_Map_snapForBattleBackground']['call'](this),this[_0x41e37b(0x30e)][_0x41e37b(0x173)](![]);},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x173)]=function(_0x4813ec){const _0xaefe02=_0x4af1ad;for(const _0x396362 of this[_0xaefe02(0x2b3)]){!_0x396362[_0xaefe02(0x1ac)]()&&!_0x396362['isObjectCharacter']()&&(_0x4813ec?(_0x396362['originalVisibility']=_0x396362['visible'],_0x396362[_0xaefe02(0x202)]=![],_0x396362[_0xaefe02(0x2cd)]&&(_0x396362['_shadowSprite'][_0xaefe02(0x21a)]=_0x396362[_0xaefe02(0x2cd)][_0xaefe02(0x202)],_0x396362[_0xaefe02(0x2cd)][_0xaefe02(0x202)]=![])):(_0x396362[_0xaefe02(0x202)]=_0x396362[_0xaefe02(0x21a)]||![],_0x396362['_shadowSprite']&&(_0x396362[_0xaefe02(0x2cd)]['visible']=_0x396362[_0xaefe02(0x2cd)]['originalVisibility'])));}},Scene_Map[_0x4af1ad(0x225)][_0x4af1ad(0x153)]=function(){const _0x327f2a=_0x4af1ad;if(!this[_0x327f2a(0x30e)])return;if(!this[_0x327f2a(0x30e)][_0x327f2a(0x1d5)])return;for(const _0x163cbc of this[_0x327f2a(0x30e)][_0x327f2a(0x1d5)]){_0x163cbc&&_0x163cbc[_0x327f2a(0x27d)]();}},VisuMZ[_0x4af1ad(0x26a)][_0x4af1ad(0x17f)]=Sprite_Character[_0x4af1ad(0x225)][_0x4af1ad(0x2df)],Sprite_Character['prototype'][_0x4af1ad(0x2df)]=function(){const _0x4276e9=_0x4af1ad;VisuMZ['EncounterEffects'][_0x4276e9(0x17f)]['call'](this),this['updateEncounterEffects']();},Sprite_Character[_0x4af1ad(0x225)][_0x4af1ad(0x1d0)]=function(){this['createAlertFovSprite']();},Sprite_Character[_0x4af1ad(0x225)][_0x4af1ad(0x18e)]=function(){const _0x2f8c27=_0x4af1ad;if(this[_0x2f8c27(0x2fd)])return;if(!this[_0x2f8c27(0x1b0)])return;this[_0x2f8c27(0x2fd)]=new Sprite_AlertFovSprite(this),this['_alertFovSprite']['z']=0x6,this[_0x2f8c27(0x1b0)]['addChild'](this['_alertFovSprite']),SceneManager[_0x2f8c27(0x26d)][_0x2f8c27(0x30e)][_0x2f8c27(0x26f)]&&(this['_lightContainerAlertFovSprite']=new Sprite_AlertFovSprite(this),this[_0x2f8c27(0x2b2)]['z']=0x6,SceneManager[_0x2f8c27(0x26d)][_0x2f8c27(0x30e)][_0x2f8c27(0x26f)][_0x2f8c27(0x24f)](this[_0x2f8c27(0x2b2)]));};function _0x57bf(){const _0x433bc3=['toLowerCase','updateAlertReturnWait','AlertResponse','AlertFovAngle','LureFlat','Sprite_Character_update','min','setBattleTransitionDuration','isFacingAway','checkPlayerFacingEventSide','BlockVisionTag','_battleTransitionFilter2','_bypassHideCharacters','processRepelEncounters','initEventChaseData','isFacingTowards','22XKCLcF','updateAlertChase','updateSelfMovementSmartChase','lineWidth','createAlertFovSprite','DisableChaseDiagonally','updateBattleTransitionFilter_Static','tileHeight','AlertStealthMode','HEART','aberration','getAlertTargets','ReturnStartBalloon','trim','blue','round','PixelateFilter','_visible','ZZZ','setBattleTransitionType','getAlertStealthMode','AdvantageResetQueue','LureRate','VisuMZ_1_EventsMoveCore','updateEncounterEffectFilter','ARRAYNUM','Alert','followers','isVisible','getDirectionFromPoint','refresh','ARRAYFUNC','_PlayerDiagonalSetting','Game_Event_checkEventTriggerTouch','isTile','max','sin','isPositionSideOf','parent','event','getAlertAngleToPlayer','vignettingAlpha','EnableChaseDiagonally','uniforms','_baseTexture','getDirectionToPoint','visibleFollowers','getAlertDistanceToTarget','returnStartBalloon','ReturnWait','LIGHT\x20BULB','quality','checkPlayerFacingEventFront','TrimBattleTransitionRandom','Type','turnTowardPlayer','playerY','updateBitmap','setForcedAdvantage','isNormalPriority','updatePosition','updateBattleTransitionFilter_Blur','toUpperCase','AlertShowFov','updateBattleTransitionFilter_Block','AlertDash','tileWidth','size','setZoom','encounterEffectSpeed','updateEncounterEffects','zoom','code','no\x20advantage','returning','_labelWindows','USER-DEFINED\x204','BattleCore','Game_Character_turnTowardPlayer','ResponseType','initMembers','SoundName','getBattleTransitionDuration','FUNC','actor','StealthMode','returnWaiting','setDirection','updateBattleTransitionFilter_Twirl','preemptive','BlockVisionRegion','MUSIC','screenY','exit','colorTone','overrideDiagonal','getAlertAngleToFollower','createBattleTransitionFilter_Aberration','floor','Advantage','addColorStop','LIGHT','anchor','AlertRange','MUSIC-NOTE','initEncounterEffectsData','Game_Map_setup','returnAfter','setupPageSettings','width','targetX','Preemptive','createBattleTransitionFilter_Warp','SoundPan','_encounterEffectDuration','BlurFilter','isPositionBackOf','alertLock','playBattleBgm','hideCharacters','visible','kernelSize','targetAngle','MAP_ZOOM_ENTER_BATTLE_ADAPT','Game_CharacterBase_setBalloonPose','createBattleTransitionFilter_Static','noise','playSe','isChaseAlerted','chaseData','createBattleTransitionFilter_Blur','initialize','BULB','_battleTransitionDuration','onDatabaseLoaded','debugShowDirections','log','LIGHT-BULB','center','create','isBush','_EncounterEffectsFollowerTrigger','getAlertAngleToTarget','_zoomY','originalVisibility','troop','QUESTION','_alertStealthMode','isPositionFrontOf','NOTE','Surprise','setBalloonPose','pow','RadialBlurFilter','ARRAYJSON','prototype','radius','returnY','returnDir','note','checkEventFacingPlayerSide','alertSoundPan','829388cXlvKO','call','moveTowardPlayer','updateBattleTransitionFilter_Hue','match','AlertDefault','_erased','BoatMultiplier','createFovBitmap','_trigger','alertRange','startEncounterEffect','createBattleTransitionFilter_Twirl','shiftForcedAdvantage','enabled','returnTime','moveStraight','seed','Game_System_initialize','USER-DEFINED\x201','USER-DEFINED\x202','updateBattleTransitionFilter_Spiral','Data:\x20','canChaseDiagonally','RepelLure','Game_Player_initMembers','ResponseBalloon','VisuMZ_4_MapCameraZoom','red','EVAL','JSON','tileset','5vjUbFX','checkEncounterEffectsStringTags','charAt','addChild','ShipMultiplier','cos','isLureEncounters','2624604qPuBXW','updateAlert','Player:\x20','Spriteset_Map_hideCharacters','flee','terrainTag','hue','ConvertParams','encounterProgressValue','FovColor2','requestBalloon','SWEAT','getAlertDistanceToClosest','randomInt','ARRAYSTRUCT','createBattleTransitionFilter_Block','parameters','initEncounterEffectsEffects','AlertLock','isChaseReturning','enable','FovAngle','isDashing','EncounterEffects','ConvertBallonTextToID','ceil','_scene','addForcedAdvantage','_lightContainer','blendMode','isMovementSucceeded','ARRAYSTR','_surprise','isJumping','alertBalloon','playerX','eventX','isRepelEncounters','Settings','filter','checkEventFollowerTriggerTouch','angle','hide','description','alertSoundName','offset','lineTo','EXCLAMATION','isAlertLineOfVisionClear','BattleManager_onEncounter','StayPosition','reactDelay','sqrt','updateAlertIdle','2735271FIsWTh','_forcedAdvantage','setup','updateSelfMovementReturnFromChase','EncounterMultiplier','_data','doesBattleTransitionZoom','checkPlayerFacingEventBack','constructor','pixel','USER-DEFINED\x203','fillStyle','_preemptive','startFadeOut','checkEventTriggerTouch','remove','reactTime','STR','TwistFilter','FovColor1','disable','needsSmartChaseUpdate','fovAngle','alertDash','lock','ZoomBlurFilter','split','Game_Event_updateSelfMovement','name','Game_Event_lock','findDiagonalDirectionTo','startBattle','updateBattleTransitionFilter_Glitch','BushMultiplier','setupEncounterEffectsEffects','...','alerted','targetY','AlertSoundVolume','eventY','getForcedAdvantage','_lightContainerAlertFovSprite','_characterSprites','createBattleTransitionFilter_Spiral','4346028zSgAlG','Game_Event_update','slice','checkEventFacingPlayerBack','_source','getBattleTransitionType','direction','mapCameraFocusTarget','blur','Duration','isFacingSideways','arc','updateBattleTransitionFilter_Pixel','isChaseEnabled','ReturnEndBalloon','RepelEvent','Game_Event_setupPageSettings','_eventAlertChaseCache','ANNOYED','FollowerTrigger','_direction','ANGER','updateEncounterEffectOriginal','follower','_shadowSprite','CommonEvent','snapForBattleBackground','alertSoundVolume','isInBoat','startFlashForEncounter','16QhDAwj','7cXwHcu','LureEvent','2641990JOrztP','glitch','RegExp','parse','RGBSplitFilter','_character','Event:\x20','BattleTransitionDuration','concat','update','green','updateAngle','processLureEncounters','context','static','isInShip','RepelVariable','fill','AlertSoundPan','eventId','response','random','initEncounterEffects','_calcChasePathing','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setupEncounterEffectsCommentTags','registerCommand','isAlertVisionBlocked','SLEEP','runAdvantageCommonEvents','push','NoAdvantage','value','atan2','BattleTransitionChangeType','Game_Follower_isVisible','commonEvent','brightness','getAlertDistanceToFollower','_alertFovSprite','isPreventSelfMovement','AlertBalloon','showFov','strength','findDirectionTo','Queue','ReactDelay','returnX','592466TrbnJi','updateSelfMovement','TransitionRandomList','slices','CRTFilter','_alertBlockVisionRegions','beginPath','_alertBlockVisionTags','_spriteset','createBattleTransitionFilter','fadeSpeed','updateBattleTransitionFilter_Warp','_battleTransitionType','screenX','spiral','setAlertStealthMode','AlertHideFov','COBWEB','initEncounterEffects_ForcedAdvantage','rush','AlertSoundName','length','_mapZoomEnterBattle','chance','\x20This\x20X:\x20','updateBattleTransitionFilter','map','twirl','returnWait','GlitchFilter','warp','_zoomX','_processEncounterDirectionLock','_characterErased','chase','isEventRunning','includes','setValue','hideEventLabels','moveTypeRandom','regionId','BattleManager_startBattle','filters','MUSICNOTE','moveAwayFromPlayer','USER-DEFINED\x205','innerRadius','executeMoveDir8','list','drawAlertCircle','return\x200','start','surprise','needsBitmapRedraw','setupEncounterEffectsNotetags','bitmap','page','isSupportDiagonalMovement','initEncEffBattleTransition','MUSIC\x20NOTE','format','Event\x20X:\x20','contains','SoundVolume','getAlertDistanceToPlayer','reserveCommonEvent','chaseTime','_battleTransitionFilter','_EncounterEffectsTouchDirectionLock','Game_CharacterBase_isDashing','hideCharactersForBattleback','checkEncounterEffectsStringTagsChase','4491354CdUYQC','LureVariable','_EncounterEffects_EventChaseData','returnEndBalloon','AdjustmentFilter'];_0x57bf=function(){return _0x433bc3;};return _0x57bf();}function Sprite_AlertFovSprite(){const _0x524958=_0x4af1ad;this[_0x524958(0x20d)](...arguments);}Sprite_AlertFovSprite[_0x4af1ad(0x225)]=Object[_0x4af1ad(0x215)](Sprite[_0x4af1ad(0x225)]),Sprite_AlertFovSprite[_0x4af1ad(0x225)][_0x4af1ad(0x291)]=Sprite_AlertFovSprite,Sprite_AlertFovSprite['prototype'][_0x4af1ad(0x20d)]=function(_0x43fc86){const _0xd32e0c=_0x4af1ad;this[_0xd32e0c(0x2b9)]=_0x43fc86,this[_0xd32e0c(0x2db)]=_0x43fc86[_0xd32e0c(0x2db)],Sprite['prototype'][_0xd32e0c(0x20d)]['call'](this),this[_0xd32e0c(0x1da)](),this[_0xd32e0c(0x2df)]();},Sprite_AlertFovSprite[_0x4af1ad(0x225)][_0x4af1ad(0x1da)]=function(){const _0x70921a=_0x4af1ad;this[_0x70921a(0x1f0)]['x']=0.5,this[_0x70921a(0x1f0)]['y']=0.5,this[_0x70921a(0x14e)]=![];if(!this['_character'])return;if(this['_character'][_0x70921a(0x291)]!==Game_Event)return;this[_0x70921a(0x28e)]={};},Sprite_AlertFovSprite[_0x4af1ad(0x225)][_0x4af1ad(0x2df)]=function(){const _0x403e8a=_0x4af1ad;Sprite[_0x403e8a(0x225)][_0x403e8a(0x2df)][_0x403e8a(0x22d)](this);if(!this[_0x403e8a(0x2db)])return;if(this[_0x403e8a(0x2db)][_0x403e8a(0x291)]!==Game_Event)return;this[_0x403e8a(0x1c3)]();if(!this['_data'][_0x403e8a(0x23a)])return;this['updatePosition'](),this[_0x403e8a(0x2e1)]();},Sprite_AlertFovSprite[_0x4af1ad(0x225)][_0x4af1ad(0x1c3)]=function(){const _0xb8face=_0x4af1ad;if(!this[_0xb8face(0x162)]())return;this[_0xb8face(0x28e)]=JsonEx['makeDeepCopy'](this[_0xb8face(0x2db)][_0xb8face(0x20b)]());if(this[_0xb8face(0x28e)][_0xb8face(0x23a)]&&!this[_0xb8face(0x2db)]['_erased'])this[_0xb8face(0x234)]();else{this['_characterErased']=this[_0xb8face(0x2db)][_0xb8face(0x232)];if(this[_0xb8face(0x164)])this[_0xb8face(0x164)]['destroy']();this[_0xb8face(0x164)]=new Bitmap(0x1,0x1);}},Sprite_AlertFovSprite[_0x4af1ad(0x225)][_0x4af1ad(0x162)]=function(){const _0x51b533=_0x4af1ad,_0x22ba1e=this['_character']['chaseData'](),_0x2fb9e8=this[_0x51b533(0x28e)];if(_0x22ba1e[_0x51b533(0x23a)]!==_0x2fb9e8[_0x51b533(0x23a)])return!![];if(_0x22ba1e[_0x51b533(0x236)]!==_0x2fb9e8[_0x51b533(0x236)])return!![];if(_0x22ba1e['fovAngle']!==_0x2fb9e8[_0x51b533(0x29f)])return!![];if(this[_0x51b533(0x14e)]!==this[_0x51b533(0x2db)][_0x51b533(0x232)])return!![];return![];},Sprite_AlertFovSprite['prototype']['createFovBitmap']=function(){const _0x28d53f=_0x4af1ad,_0x19c701=this[_0x28d53f(0x28e)];if(!_0x19c701[_0x28d53f(0x300)])return;const _0x3b2393=VisuMZ[_0x28d53f(0x26a)][_0x28d53f(0x279)][_0x28d53f(0x1a4)],_0x23420d=_0x19c701[_0x28d53f(0x29f)],_0x3c7550=Math[_0x28d53f(0x26c)]((_0x19c701['alertRange']+0.4)*$gameMap[_0x28d53f(0x1cc)]()),_0x57549a=_0x3b2393[_0x28d53f(0x29c)],_0xec83f9=_0x3b2393[_0x28d53f(0x25c)];this[_0x28d53f(0x164)]=new Bitmap(_0x3c7550*0x2,_0x3c7550*0x2),this[_0x28d53f(0x164)]['drawAlertCircle'](_0x3c7550,_0x23420d,_0x57549a,_0xec83f9),this[_0x28d53f(0x270)]=0x1;},Bitmap['prototype'][_0x4af1ad(0x15e)]=function(_0x3e5f34,_0x163199,_0x277065,_0xa509bf){const _0x4fcbee=_0x4af1ad,_0x567ea7=this[_0x4fcbee(0x2e3)],_0x4dfceb=_0x163199*(Math['PI']/0xb4),_0x59a487=_0x3e5f34*0x2,_0x431d49=_0x567ea7['createRadialGradient'](_0x3e5f34,_0x3e5f34,0x18,_0x3e5f34,_0x3e5f34,_0x3e5f34);_0x431d49[_0x4fcbee(0x1ee)](0x0,_0x277065),_0x431d49[_0x4fcbee(0x1ee)](0.85,_0xa509bf),_0x431d49[_0x4fcbee(0x1ee)](0x1,_0x277065),_0x567ea7['save'](),_0x567ea7[_0x4fcbee(0x294)]=_0x431d49,_0x567ea7[_0x4fcbee(0x30c)](),_0x567ea7['moveTo'](_0x3e5f34,_0x3e5f34),_0x567ea7[_0x4fcbee(0x281)](_0x59a487,_0x3e5f34),_0x567ea7[_0x4fcbee(0x2c0)](_0x3e5f34,_0x3e5f34,_0x3e5f34,0x0,_0x4dfceb),_0x567ea7[_0x4fcbee(0x281)](_0x3e5f34,_0x3e5f34),_0x567ea7[_0x4fcbee(0x2e7)](),_0x567ea7['restore'](),this[_0x4fcbee(0x1b6)][_0x4fcbee(0x2df)]();},Sprite_AlertFovSprite[_0x4af1ad(0x225)][_0x4af1ad(0x1c6)]=function(){const _0x2c2bcc=_0x4af1ad;this['x']=this['_source']['x'],this['y']=this['_source']['y']-this[_0x2c2bcc(0x2b9)]['height']/0x2;},Sprite_AlertFovSprite['prototype'][_0x4af1ad(0x2e1)]=function(){const _0x581208=_0x4af1ad,_0xb965b=this['_data'];let _0xc52bfa=_0xb965b[_0x581208(0x29f)]/-0x2;_0xc52bfa+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][this[_0x581208(0x2db)][_0x581208(0x2c9)]],this['angle']=_0xc52bfa;},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x30f)]=function(){const _0x341307=_0x4af1ad;let _0x5c4015=SceneManager[_0x341307(0x26d)][_0x341307(0x312)];_0x5c4015=_0x5c4015[_0x341307(0x24e)](0x0)[_0x341307(0x1c8)]()+_0x5c4015[_0x341307(0x2b7)](0x1);const _0x48908e='createBattleTransitionFilter_'+_0x5c4015;if(this[_0x48908e])return this[_0x48908e]();},Spriteset_Map['prototype']['updateBattleTransitionFilter']=function(){const _0x14b825=_0x4af1ad;if(!this[_0x14b825(0x170)])return;let _0x426d01=SceneManager[_0x14b825(0x26d)][_0x14b825(0x312)];_0x426d01=_0x426d01['charAt'](0x0)['toUpperCase']()+_0x426d01['slice'](0x1);const _0x21ab96='updateBattleTransitionFilter_'+_0x426d01;if(this[_0x21ab96])return this[_0x21ab96]();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x1eb)]=function(){const _0x27dd9e=_0x4af1ad;if(!PIXI[_0x27dd9e(0x157)][_0x27dd9e(0x2da)])return;const _0x5c6b37=new PIXI[(_0x27dd9e(0x157))][(_0x27dd9e(0x2da))](),_0x7299d5=['red','green',_0x27dd9e(0x198)];for(const _0x3a4310 of _0x7299d5){_0x5c6b37[_0x3a4310]=[0x0,0x0],_0x5c6b37[_0x3a4310][_0x27dd9e(0x1f8)]=(Math[_0x27dd9e(0x260)](0x40)+0x1)*(Math[_0x27dd9e(0x2eb)]()>0.5?-0x1:0x1),_0x5c6b37[_0x3a4310][_0x27dd9e(0x2ae)]=(Math[_0x27dd9e(0x260)](0x40)+0x1)*(Math['random']()>0.5?-0x1:0x1);}const _0x3e94d0=new ColorFilter();this[_0x27dd9e(0x170)]=_0x5c6b37,this[_0x27dd9e(0x185)]=_0x3e94d0,this[_0x27dd9e(0x157)]=this['filters']||[],this[_0x27dd9e(0x157)][_0x27dd9e(0x2f4)](_0x5c6b37,_0x3e94d0),this['_battleTransitionDuration']=SceneManager[_0x27dd9e(0x26d)][_0x27dd9e(0x1cf)]();},Spriteset_Map[_0x4af1ad(0x225)]['updateBattleTransitionFilter_Aberration']=function(){const _0x424030=_0x4af1ad;if(this[_0x424030(0x20f)]>0x0&&this[_0x424030(0x170)]){const _0x15b673=this[_0x424030(0x170)],_0x4935bf=this[_0x424030(0x185)],_0x3c124c=this['_battleTransitionDuration'],_0x48ec63=['red',_0x424030(0x2e0),_0x424030(0x198)];for(const _0x3e1e0d of _0x48ec63){_0x15b673[_0x3e1e0d][0x0]=(_0x15b673[_0x3e1e0d][0x0]*(_0x3c124c-0x1)+_0x15b673[_0x3e1e0d][_0x424030(0x1f8)])/_0x3c124c,_0x15b673[_0x3e1e0d][0x1]=(_0x15b673[_0x3e1e0d][0x1]*(_0x3c124c-0x1)+_0x15b673[_0x3e1e0d][_0x424030(0x2ae)])/_0x3c124c;}for(let _0x37719a=0x0;_0x37719a<0x3;_0x37719a++){_0x4935bf['uniforms'][_0x424030(0x1e8)][_0x37719a]=(_0x4935bf[_0x424030(0x1b5)][_0x424030(0x1e8)][_0x37719a]*(_0x3c124c-0x1)-0x80)/_0x3c124c;}this[_0x424030(0x20f)]--;}},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x262)]=function(){const _0x36b563=_0x4af1ad;if(!PIXI[_0x36b563(0x157)][_0x36b563(0x1fd)])return;const _0x11d297=new PIXI[(_0x36b563(0x157))]['BlurFilter']();_0x11d297[_0x36b563(0x2bd)]=0x0,_0x11d297[_0x36b563(0x1bd)]=0x1,_0x11d297[_0x36b563(0x203)]=0x5;const _0xad3fad=new ColorFilter();this[_0x36b563(0x170)]=_0x11d297,this[_0x36b563(0x185)]=_0xad3fad,this[_0x36b563(0x157)]=this[_0x36b563(0x157)]||[],this['filters'][_0x36b563(0x2f4)](_0x11d297,_0xad3fad),this[_0x36b563(0x20f)]=SceneManager[_0x36b563(0x26d)]['encounterEffectSpeed']();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x1ca)]=function(){const _0x33a8bf=_0x4af1ad;if(this['_battleTransitionDuration']>0x0&&this[_0x33a8bf(0x170)]){const _0x262039=this[_0x33a8bf(0x170)],_0x5429ec=this[_0x33a8bf(0x185)],_0x20e0f7=this[_0x33a8bf(0x20f)];_0x262039[_0x33a8bf(0x2bd)]=(_0x262039[_0x33a8bf(0x2bd)]*(_0x20e0f7-0x1)+0x64)/_0x20e0f7;for(let _0x47b5d8=0x0;_0x47b5d8<0x3;_0x47b5d8++){_0x5429ec[_0x33a8bf(0x1b5)]['colorTone'][_0x47b5d8]=(_0x5429ec[_0x33a8bf(0x1b5)][_0x33a8bf(0x1e8)][_0x47b5d8]*(_0x20e0f7-0x1)+0x80)/_0x20e0f7;}this['_battleTransitionDuration']--;}},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x20c)]=function(){const _0x5a5e54=_0x4af1ad;if(!PIXI[_0x5a5e54(0x157)][_0x5a5e54(0x1fd)])return;const _0x543aed=new PIXI['filters']['BlurFilter']();_0x543aed[_0x5a5e54(0x2bd)]=0x0,_0x543aed[_0x5a5e54(0x203)]=0x5;const _0x3d426c=new ColorFilter();this['_battleTransitionFilter']=_0x543aed,this[_0x5a5e54(0x185)]=_0x3d426c,this['filters']=this['filters']||[],this[_0x5a5e54(0x157)][_0x5a5e54(0x2f4)](_0x543aed,_0x3d426c),this[_0x5a5e54(0x20f)]=SceneManager['_scene'][_0x5a5e54(0x1cf)]();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x1c7)]=function(){const _0x4eb821=_0x4af1ad;if(this[_0x4eb821(0x20f)]>0x0&&this['_battleTransitionFilter']){const _0x1b4657=this[_0x4eb821(0x170)],_0x4554ef=this[_0x4eb821(0x185)],_0x28d615=this[_0x4eb821(0x20f)];_0x1b4657['blur']=(_0x1b4657[_0x4eb821(0x2bd)]*(_0x28d615-0x1)+0x1e)/_0x28d615;for(let _0x11167b=0x0;_0x11167b<0x4;_0x11167b++){_0x4554ef[_0x4eb821(0x1b5)][_0x4eb821(0x1e8)][_0x11167b]=(_0x4554ef[_0x4eb821(0x1b5)]['colorTone'][_0x11167b]*(_0x28d615-0x1)+0xff)/_0x28d615;}this[_0x4eb821(0x20f)]--;}},Spriteset_Map['prototype']['createBattleTransitionFilter_Glitch']=function(){const _0x2ce131=_0x4af1ad;if(!PIXI[_0x2ce131(0x157)]['GlitchFilter'])return;const _0x16bbe9=new PIXI[(_0x2ce131(0x157))][(_0x2ce131(0x14a))]();_0x16bbe9[_0x2ce131(0x23d)]=Math[_0x2ce131(0x2eb)](),_0x16bbe9[_0x2ce131(0x309)]=0xa;const _0x1541f0=new ColorFilter();this[_0x2ce131(0x170)]=_0x16bbe9,this[_0x2ce131(0x185)]=_0x1541f0,this['filters']=this[_0x2ce131(0x157)]||[],this[_0x2ce131(0x157)][_0x2ce131(0x2f4)](_0x16bbe9,_0x1541f0),this[_0x2ce131(0x20f)]=SceneManager[_0x2ce131(0x26d)]['encounterEffectSpeed']();},Spriteset_Map['prototype'][_0x4af1ad(0x2a9)]=function(){const _0xbd43cf=_0x4af1ad;if(this[_0xbd43cf(0x20f)]>0x0&&this[_0xbd43cf(0x170)]){const _0x59401d=this[_0xbd43cf(0x170)],_0x57c5c8=this[_0xbd43cf(0x185)],_0x14d019=this[_0xbd43cf(0x20f)];_0x59401d[_0xbd43cf(0x309)]=Math[_0xbd43cf(0x260)](0xa)+0x1,_0x59401d[_0xbd43cf(0x248)]['x']=Math[_0xbd43cf(0x260)](0x14)*(Math[_0xbd43cf(0x2eb)]()>0.5?-0x1:0x1),_0x59401d[_0xbd43cf(0x248)]['y']=Math[_0xbd43cf(0x260)](0x14)*(Math[_0xbd43cf(0x2eb)]()>0.5?-0x1:0x1),_0x59401d[_0xbd43cf(0x2e0)]['x']=Math['randomInt'](0x14)*(Math[_0xbd43cf(0x2eb)]()>0.5?-0x1:0x1),_0x59401d[_0xbd43cf(0x2e0)]['y']=Math['randomInt'](0x14)*(Math['random']()>0.5?-0x1:0x1),_0x59401d[_0xbd43cf(0x198)]['x']=Math[_0xbd43cf(0x260)](0x14)*(Math['random']()>0.5?-0x1:0x1),_0x59401d[_0xbd43cf(0x198)]['y']=Math['randomInt'](0x14)*(Math['random']()>0.5?-0x1:0x1);for(let _0x29b8cd=0x0;_0x29b8cd<0x4;_0x29b8cd++){_0x57c5c8[_0xbd43cf(0x1b5)][_0xbd43cf(0x1e8)][_0x29b8cd]=Math['randomInt'](0x20);}this[_0xbd43cf(0x20f)]--;}},Spriteset_Map['prototype']['createBattleTransitionFilter_Hue']=function(){const _0x5c1135=_0x4af1ad,_0x5a4423=new ColorFilter();this[_0x5c1135(0x170)]=_0x5a4423,this[_0x5c1135(0x157)]=this[_0x5c1135(0x157)]||[],this[_0x5c1135(0x157)]['push'](_0x5a4423),this[_0x5c1135(0x20f)]=SceneManager['_scene'][_0x5c1135(0x1cf)]();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x22f)]=function(){const _0x37545b=_0x4af1ad;if(this[_0x37545b(0x20f)]>0x0&&this[_0x37545b(0x170)]){const _0x5d3514=this[_0x37545b(0x170)],_0x5c9dc0=this[_0x37545b(0x20f)];_0x5d3514['uniforms']['hue']=(_0x5d3514['uniforms'][_0x37545b(0x259)]*(_0x5c9dc0-0x1)+0x168)/_0x5c9dc0;for(let _0x5dd853=0x0;_0x5dd853<0x3;_0x5dd853++){_0x5d3514['uniforms'][_0x37545b(0x1e8)][_0x5dd853]=(_0x5d3514[_0x37545b(0x1b5)][_0x37545b(0x1e8)][_0x5dd853]*(_0x5c9dc0-0x1)+0xff)/_0x5c9dc0;}this[_0x37545b(0x20f)]--;}},Spriteset_Map[_0x4af1ad(0x225)]['createBattleTransitionFilter_Pixel']=function(){const _0x3a68e5=_0x4af1ad;if(!PIXI['filters']['PixelateFilter'])return;const _0x40a1d1=new PIXI['filters'][(_0x3a68e5(0x19a))]();_0x40a1d1[_0x3a68e5(0x1cd)]['x']=0x1,_0x40a1d1[_0x3a68e5(0x1cd)]['y']=0x1,this['_battleTransitionFilter']=_0x40a1d1,this[_0x3a68e5(0x157)]=this[_0x3a68e5(0x157)]||[],this['filters'][_0x3a68e5(0x2f4)](_0x40a1d1),this[_0x3a68e5(0x20f)]=SceneManager[_0x3a68e5(0x26d)]['encounterEffectSpeed']();},Spriteset_Map['prototype'][_0x4af1ad(0x2c1)]=function(){const _0x2a2d09=_0x4af1ad;if(this[_0x2a2d09(0x20f)]>0x0&&this['_battleTransitionFilter']){const _0x549df1=this[_0x2a2d09(0x170)],_0x23dd41=this['_battleTransitionDuration'];_0x549df1[_0x2a2d09(0x1cd)]['x']=(_0x549df1[_0x2a2d09(0x1cd)]['x']*(_0x23dd41-0x1)+0x32)/_0x23dd41,_0x549df1['size']['y']=(_0x549df1[_0x2a2d09(0x1cd)]['y']*(_0x23dd41-0x1)+0x32)/_0x23dd41,this['_battleTransitionDuration']--;}},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x2b4)]=function(){const _0x56704d=_0x4af1ad;if(!PIXI['filters'][_0x56704d(0x223)])return;const _0x532fa1=new PIXI[(_0x56704d(0x157))][(_0x56704d(0x223))]();_0x532fa1[_0x56704d(0x27c)]=0x0,_0x532fa1[_0x56704d(0x204)]=Math[_0x56704d(0x2eb)]()<0.5?-0x168:0x168,_0x532fa1[_0x56704d(0x226)]=0x500,_0x532fa1[_0x56704d(0x214)]['x']=$gamePlayer[_0x56704d(0x313)](),_0x532fa1[_0x56704d(0x214)]['y']=$gamePlayer[_0x56704d(0x1e6)]()-$gameMap['tileHeight']()/0x2,_0x532fa1[_0x56704d(0x203)]=0x5,this[_0x56704d(0x170)]=_0x532fa1,this[_0x56704d(0x157)]=this[_0x56704d(0x157)]||[],this[_0x56704d(0x157)][_0x56704d(0x2f4)](_0x532fa1),this['_battleTransitionDuration']=SceneManager['_scene'][_0x56704d(0x1cf)]();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x241)]=function(){const _0x49abb6=_0x4af1ad;if(this[_0x49abb6(0x20f)]>0x0&&this[_0x49abb6(0x170)]){const _0xe62093=this['_battleTransitionFilter'],_0x12167a=this[_0x49abb6(0x20f)];_0xe62093['angle']=(_0xe62093[_0x49abb6(0x27c)]*(_0x12167a-0x1)+_0xe62093[_0x49abb6(0x204)])/_0x12167a,_0xe62093[_0x49abb6(0x203)]=(_0xe62093[_0x49abb6(0x203)]*(_0x12167a-0x1)+0xc)/_0x12167a,this[_0x49abb6(0x20f)]--;}},Spriteset_Map['prototype'][_0x4af1ad(0x207)]=function(){const _0x427712=_0x4af1ad;if(!PIXI[_0x427712(0x157)][_0x427712(0x30a)])return;const _0x40bccc=new PIXI[(_0x427712(0x157))]['CRTFilter']();_0x40bccc[_0x427712(0x208)]=0x0,_0x40bccc['lineWidth']=0x0,_0x40bccc[_0x427712(0x23d)]=Math[_0x427712(0x2eb)](),_0x40bccc[_0x427712(0x1b3)]=0x0,this[_0x427712(0x170)]=_0x40bccc,this[_0x427712(0x157)]=this['filters']||[],this[_0x427712(0x157)]['push'](_0x40bccc),this['_battleTransitionDuration']=SceneManager[_0x427712(0x26d)][_0x427712(0x1cf)]();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x190)]=function(){const _0x4caa61=_0x4af1ad;if(this['_battleTransitionDuration']>0x0&&this[_0x4caa61(0x170)]){const _0x26639f=this['_battleTransitionFilter'],_0x142298=this['_battleTransitionDuration'];_0x26639f[_0x4caa61(0x208)]=(_0x26639f[_0x4caa61(0x208)]*(_0x142298-0x1)+0x3)/_0x142298,_0x26639f[_0x4caa61(0x18d)]=(_0x26639f['lineWidth']*(_0x142298-0x1)+0x14)/_0x142298,_0x26639f[_0x4caa61(0x1b3)]=(_0x26639f[_0x4caa61(0x1b3)]*(_0x142298-0x1)+0x1)/_0x142298,_0x26639f['seed']=Math['random'](),this['_battleTransitionDuration']--;}},Spriteset_Map['prototype'][_0x4af1ad(0x238)]=function(){const _0x6b69d5=_0x4af1ad;if(!PIXI[_0x6b69d5(0x157)][_0x6b69d5(0x29b)])return;const _0x37725e=new PIXI[(_0x6b69d5(0x157))][(_0x6b69d5(0x29b))]();_0x37725e[_0x6b69d5(0x27c)]=0x0,_0x37725e[_0x6b69d5(0x204)]=Math[_0x6b69d5(0x2eb)]()<0.5?-0xa:0xa,_0x37725e[_0x6b69d5(0x226)]=0x0,_0x37725e[_0x6b69d5(0x280)]={},_0x37725e['offset']['x']=$gamePlayer['screenX'](),_0x37725e[_0x6b69d5(0x280)]['y']=$gamePlayer['screenY']()-$gameMap[_0x6b69d5(0x191)]()/0x2;const _0x11d000=new ColorFilter();this['_battleTransitionFilter']=_0x37725e,this['_battleTransitionFilter2']=_0x11d000,this[_0x6b69d5(0x157)]=this[_0x6b69d5(0x157)]||[],this[_0x6b69d5(0x157)][_0x6b69d5(0x2f4)](_0x37725e,_0x11d000),this['_battleTransitionDuration']=SceneManager[_0x6b69d5(0x26d)][_0x6b69d5(0x1cf)]();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x1e2)]=function(){const _0xa550b4=_0x4af1ad;if(this[_0xa550b4(0x20f)]>0x0&&this[_0xa550b4(0x170)]){const _0xbf85e=this[_0xa550b4(0x170)],_0x2465d0=this[_0xa550b4(0x185)],_0x31d550=this[_0xa550b4(0x20f)];_0xbf85e['angle']=(_0xbf85e['angle']*(_0x31d550-0x1)+_0xbf85e[_0xa550b4(0x204)])/_0x31d550,_0xbf85e['radius']=(_0xbf85e['radius']*(_0x31d550-0x1)+Graphics[_0xa550b4(0x1f7)])/_0x31d550;for(let _0x1b499b=0x0;_0x1b499b<0x4;_0x1b499b++){_0x2465d0['uniforms'][_0xa550b4(0x1e8)][_0x1b499b]=(_0x2465d0[_0xa550b4(0x1b5)][_0xa550b4(0x1e8)][_0x1b499b]*(_0x31d550-0x1)+0x80)/_0x31d550;}this[_0xa550b4(0x20f)]--;}},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x1fa)]=function(){const _0x21487e=_0x4af1ad;if(!PIXI[_0x21487e(0x157)][_0x21487e(0x2a2)])return;const _0x1c5724=new PIXI[(_0x21487e(0x157))]['ZoomBlurFilter']();_0x1c5724['strength']=0x0,_0x1c5724[_0x21487e(0x15b)]=0x0,_0x1c5724[_0x21487e(0x214)]['x']=$gamePlayer[_0x21487e(0x313)](),_0x1c5724[_0x21487e(0x214)]['y']=$gamePlayer['screenY']()-$gameMap['tileHeight']()/0x2;const _0x59db10=new PIXI['filters'][(_0x21487e(0x179))]();this[_0x21487e(0x170)]=_0x1c5724,this['_battleTransitionFilter2']=_0x59db10,this[_0x21487e(0x157)]=this['filters']||[],this[_0x21487e(0x157)]['push'](_0x1c5724,_0x59db10),this[_0x21487e(0x20f)]=SceneManager['_scene']['encounterEffectSpeed']();},Spriteset_Map[_0x4af1ad(0x225)][_0x4af1ad(0x311)]=function(){const _0x5aac62=_0x4af1ad;if(this[_0x5aac62(0x20f)]>0x0&&this[_0x5aac62(0x170)]){const _0x46f8bc=this['_battleTransitionFilter'],_0x142c1f=this['_battleTransitionFilter2'],_0x3d32c7=this[_0x5aac62(0x20f)];_0x46f8bc[_0x5aac62(0x301)]=(_0x46f8bc[_0x5aac62(0x301)]*(_0x3d32c7-0x1)+0x1)/_0x3d32c7,_0x142c1f[_0x5aac62(0x2fb)]=(_0x142c1f[_0x5aac62(0x2fb)]*(_0x3d32c7-0x1)+0x2)/_0x3d32c7,_0x142c1f[_0x5aac62(0x198)]=(_0x142c1f['blue']*(_0x3d32c7-0x1)+0x2)/_0x3d32c7,this['_battleTransitionDuration']--;}};