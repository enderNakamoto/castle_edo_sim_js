export interface ArmyComposition {
    archers: number;
    cavalry: number;
    infantry: number;
    catapults: number;
    ballistae?: number; // Optional, only for defenders
    siegeTowers?: number; // Optional, only for attackers
    batteringRams?: number; // Optional, only for attackers
}

export interface Status<T> {
    remainingAttackingArmy: T;
    remainingDefendingArmy: T;
    wallHealth: number;
    totalHealthLossAttackers: number;
    totalHealthLossDefenders: number;
}
