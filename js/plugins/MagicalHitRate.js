/*:
 * @target MZ
 * @plugindesc Magical Attacks Respect Hit Rate
 * @help
 * This plugin changes hit rate calculation to also include magical attacks.
 * Thanks to ATT_Turan for sharing the revelant code on the RPG Maker forums.
 */
(() => {
    'use strict';
    Game_Action.prototype.itemHit = function (/*target*/) {
        const successRate = this.item().successRate;
        if (this.isPhysical() || this.isMagical()) {
            return successRate * 0.01 * this.subject().hit;
        } else {
            return successRate * 0.01;
        }
    };
})();