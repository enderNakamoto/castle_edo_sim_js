import { Const } from './consts';
import { ArmyComposition, Status } from './model';

function createCatapultGroup(numCatapults: number, health: number, attack: number) {
    return {
        totalHealth: numCatapults * health,
        attack: attack,
        initialCatapultHealth: health,
        attackCounter: 0 // Counter to track the 2 out of 10 attacks
    };
}

function takeDamage(catapultGroup: any, damage: number): void {
    catapultGroup.totalHealth -= damage;
}

function remainingCatapults(catapultGroup: any): number {
    return Math.ceil(catapultGroup.totalHealth / catapultGroup.initialCatapultHealth);
}

function calculateDamage(catapultGroup: any): number {
    return remainingCatapults(catapultGroup) * catapultGroup.attack;
}

function isDestroyed(catapultGroup: any): boolean {
    return catapultGroup.totalHealth <= 0;
}

function isWallDamaged(wallHealth: number): boolean {
    return wallHealth < 0.5 * Const.WALL_HEALTH;
}

export function phaseOne(attackingArmy: ArmyComposition, defendingArmy: ArmyComposition): Status<ArmyComposition> {
    const attackingGroup = createCatapultGroup(attackingArmy.catapults, Const.CATAPULT_HEALTH, Const.CATAPULT_ATTACK);
    const defendingGroup = createCatapultGroup(defendingArmy.catapults, Const.CATAPULT_HEALTH, Const.CATAPULT_ATTACK);

    let wallHealth = Const.WALL_HEALTH;
    let turn = 0;

    let totalHealthLossAttackers = 0;
    let totalHealthLossDefenders = 0;

    while (!isWallDamaged(wallHealth) && !isDestroyed(attackingGroup)) {
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
        } else {
            // Hit the wall
            const wallDamage = calculateDamage(attackingGroup);
            wallHealth -= wallDamage;
            console.log(`Attacking catapults hit the wall for ${wallDamage} damage. Wall health is now ${wallHealth}.`);
        }

        // Update attack counter (reset every 10 turns)
        attackingGroup.attackCounter = (attackingGroup.attackCounter + 1) % 10;

        // Check if the wall is 40% destroyed
        if (isWallDamaged(wallHealth)) {
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

    // Update the remaining units in each army
    const remainingAttackingArmy: ArmyComposition = {
        ...attackingArmy,
        catapults: remainingCatapults(attackingGroup)
    };

    const remainingDefendingArmy: ArmyComposition = {
        ...defendingArmy,
        catapults: remainingCatapults(defendingGroup)
    };

    // Return the result for the next phase
    const result: Status<ArmyComposition> = {
        remainingAttackingArmy, // Returning the remaining attacking army
        remainingDefendingArmy, // Returning the remaining defending army
        wallHealth,             // Returning the wall's health
        totalHealthLossAttackers,
        totalHealthLossDefenders
    };

    return result;
}
