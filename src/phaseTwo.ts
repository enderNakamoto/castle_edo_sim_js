import { Const } from './consts';
import { ArmyComposition, Status } from './model';

function calculateBallistaeDamage(ballistaeCount: number): number {
    return ballistaeCount * Const.BALLISTA_ATTACK;
}

function applyDamage(army: ArmyComposition, damage: number) {
    // Damage is applied in the order: catapults, infantry, cavalry, archers, siege towers, battering rams
    const damageOrder = ['catapults', 'infantry', 'cavalry', 'archers', 'siegeTowers', 'batteringRams'] as const;

    for (const unit of damageOrder) {
        if (army[unit] && army[unit]! > 0) {
            const unitHealth = Const[`${unit.toUpperCase()}_HEALTH` as keyof typeof Const] as number;
            const unitsToKill = Math.min(army[unit]!, Math.floor(damage / unitHealth));
            damage -= unitsToKill * unitHealth;
            army[unit] = army[unit]! - unitsToKill;
            if (damage <= 0) break;
        }
    }
}

