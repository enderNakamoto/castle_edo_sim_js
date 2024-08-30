import { phaseOne } from './phaseOne';
import { ArmyComposition, Status } from './model';
import { Const } from './consts';

// Define the initial composition of the attacking and defending armies
const attackingArmy: ArmyComposition = {
    archers: 100,
    cavalry: 50,
    infantry: 200,
    catapults: 500,
    siegeTowers: 5,
    batteringRams: 2
};

const defendingArmy: ArmyComposition = {
    archers: 120,
    cavalry: 40,
    infantry: 180,
    catapults: 300,
    ballistae: 4
};

// Log initial status before the battle
console.log('Initial Status:');
console.log(`Attacking Army:`, attackingArmy);
console.log(`Defending Army:`, defendingArmy);
console.log(`Wall Health: ${Const.WALL_HEALTH}`);

// Execute Phase One of the battle
const result: Status<ArmyComposition> = phaseOne(attackingArmy, defendingArmy);

// Log the status after the battle
console.log('Results after Phase One:');
console.log(`Remaining Attacking Army:`, result.remainingAttackingArmy);
console.log(`Remaining Defending Army:`, result.remainingDefendingArmy);
console.log(`Wall Health: ${result.wallHealth}`);
console.log(`Total Health Loss Attackers: ${result.totalHealthLossAttackers}`);
console.log(`Total Health Loss Defenders: ${result.totalHealthLossDefenders}`);

// The remaining composition of both armies can now be used for Phase Two or further analysis
// Example: Pass the remaining armies and wall health into phaseTwo()
