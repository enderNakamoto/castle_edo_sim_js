"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phaseOne_1 = require("./phaseOne");
const result = (0, phaseOne_1.phaseOne)(3, 2);
console.log('Results after Phase One:');
console.log(`Remaining Attacker Health: ${result.remainingAttackerHealth}`);
console.log(`Total Health Loss Attackers: ${result.totalHealthLossAttackers}`);
console.log(`Remaining Defender Health: ${result.remainingDefenderHealth}`);
console.log(`Total Health Loss Defenders: ${result.totalHealthLossDefenders}`);
console.log(`Wall Health: ${result.wallHealth}`);
// These values can now be used to initialize the next phase
// For example, you could start Phase Two with the remaining health values
