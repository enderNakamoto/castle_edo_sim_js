"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatapultGroup = createCatapultGroup;
exports.takeDamage = takeDamage;
exports.remainingCatapults = remainingCatapults;
exports.calculateDamage = calculateDamage;
exports.isDestroyed = isDestroyed;
exports.phaseOne = phaseOne;
const consts_1 = require("./consts");
// Assuming the constants are already defined in the Const namespace
function createCatapultGroup(numCatapults, health, attack) {
    return {
        totalHealth: numCatapults * health,
        attack: attack,
        initialCatapultHealth: health,
        attackCounter: 0 // Counter to track the 2 out of 10 attacks
    };
}
function takeDamage(catapultGroup, damage) {
    catapultGroup.totalHealth -= damage;
}
function remainingCatapults(catapultGroup) {
    return Math.ceil(catapultGroup.totalHealth / catapultGroup.initialCatapultHealth);
}
function calculateDamage(catapultGroup) {
    return remainingCatapults(catapultGroup) * catapultGroup.attack;
}
function isDestroyed(catapultGroup) {
    return catapultGroup.totalHealth <= 0;
}
function phaseOne(numAttackingCatapults, numDefendingCatapults) {
    const attackingGroup = createCatapultGroup(numAttackingCatapults, consts_1.Const.CATAPULT_HEALTH, consts_1.Const.CATAPULT_ATTACK);
    const defendingGroup = createCatapultGroup(numDefendingCatapults, consts_1.Const.CATAPULT_HEALTH, consts_1.Const.CATAPULT_ATTACK);
    let wallHealth = consts_1.Const.WALL_HEALTH;
    const wallInitialHealth = consts_1.Const.WALL_HEALTH;
    let turn = 0;
    let totalHealthLossAttackers = 0;
    let totalHealthLossDefenders = 0;
    while (wallHealth > 0.6 * wallInitialHealth && !isDestroyed(attackingGroup)) {
        turn++;
        console.log(`Turn ${turn}:`);
        // Defending catapults' turn to attack
        const defendingDamage = calculateDamage(defendingGroup);
        takeDamage(attackingGroup, defendingDamage);
        totalHealthLossAttackers += defendingDamage;
        console.log(`Defending catapults hit attacking catapults for ${defendingDamage} damage. Attacking catapults remaining: ${remainingCatapults(attackingGroup)}.`);
        // Attacking catapults' turn to attack
        if (attackingGroup.attackCounter < 2) {
            // Hit defending catapults
            const attackingDamage = calculateDamage(attackingGroup);
            takeDamage(defendingGroup, attackingDamage);
            totalHealthLossDefenders += attackingDamage;
            console.log(`Attacking catapults hit defending catapults for ${attackingDamage} damage. Defending catapults remaining: ${remainingCatapults(defendingGroup)}.`);
        }
        else {
            // Hit the wall
            const wallDamage = calculateDamage(attackingGroup);
            wallHealth -= wallDamage;
            console.log(`Attacking catapults hit the wall for ${wallDamage} damage. Wall health is now ${wallHealth}.`);
        }
        // Update attack counter (reset every 10 turns)
        attackingGroup.attackCounter = (attackingGroup.attackCounter + 1) % 10;
        // Check if the wall is 40% destroyed
        if (wallHealth <= 0.6 * wallInitialHealth) {
            console.log("The wall has been 40% destroyed. The defenders are retreating.");
            break;
        }
        // Check if all attacking catapults are destroyed
        if (isDestroyed(attackingGroup)) {
            console.log("All attacking catapults have been destroyed. The attack has failed.");
            break;
        }
        console.log('');
    }
    console.log('Phase One ended.');
    // Return the result for the next phase
    return {
        remainingAttackerHealth: attackingGroup.totalHealth,
        totalHealthLossAttackers,
        remainingDefenderHealth: defendingGroup.totalHealth,
        totalHealthLossDefenders,
        wallHealth
    };
}
