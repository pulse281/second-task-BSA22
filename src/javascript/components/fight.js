import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    let firstFighterHealth = firstFighter.health,
        secondFighterHealth = secondFighter.health;

    const firstFighterHealthIndicator = document.querySelector('#left-fighter-indicator');
    const secondFighterHealthIndicator = document.querySelector('#right-fighter-indicator');


    firstFighter.block = false;
    secondFighter.block = false;

    const eventStopBlock = (e) => {
        switch (e.code) {
            case 'KeyL':
                secondFighter.block = true;
                break
            case 'KeyD':
                firstFighter.block = true;
                break
        }
    };

    const eventActionControl = (e) => {
        let damage;

        switch (e.code) {
            case 'KeyA':
                if (firstFighter.block) {
                    break
                }

                damage = getDamage(firstFighter, secondFighter);
                secondFighterHealth -= damage;
                changeHealthIndicator(secondFighterHealth, secondFighterHealthIndicator, damage);
                break
            case 'KeyL':
                secondFighter.block = false;
                break
            case 'KeyJ':
                if (secondFighter.block) {
                    break
                }

                damage = getDamage(secondFighter, firstFighter);
                firstFighterHealth -= damage;
                changeHealthIndicator(firstFighterHealth, firstFighterHealthIndicator, damage);
                break
            case 'KeyD':
                firstFighter.block = false;
                break
        }

        if (firstFighterHealth < 0 || secondFighterHealth < 0) {
            document.removeEventListener('keydown', eventStopBlock);
            document.removeEventListener('keyup', eventActionControl);

            const winner = firstFighterHealth > 0 ? firstFighter : secondFighter;
            return resolve(winner);
        }
    };

    document.addEventListener('keydown', eventStopBlock, false);
    document.addEventListener('keyup', eventActionControl, false); 

    
    
  });
}

function changeHealthIndicator (firstFighterHealth, fighterIndicator, damage) {
    if (firstFighterHealth <= 0) {
        fighterIndicator.style.width = '0px';
        return
    }

    const dmagePercent = damage / firstFighterHealth * 100;
    const fighterIndicatorVal = fighterIndicator.style.width || window.getComputedStyle(fighterIndicator).width;

    fighterIndicator.style.width = (parseFloat(fighterIndicatorVal) / 100 * (100 - dmagePercent) + 'px');
}

export function getDamage(attacker, defender) {
    // return damage
    
    if (defender.block) {
        return 0
    }

    const defenderFighter = getBlockPower(defender);
    const attackerFighter = getHitPower(attacker);

    const demage = attackerFighter - defenderFighter;

    return demage > 0 ? demage : 0
}

export function getHitPower(fighter) {
  // return hit power

    const criticalHitChance = Math.random() + 1;
    const power = fighter.attack * criticalHitChance;

    return power

}

export function getBlockPower(fighter) {
  // return block power
  
    const dodgeChance = Math.random() + 1;
    const power = fighter.defense * dodgeChance;

    return power
}
