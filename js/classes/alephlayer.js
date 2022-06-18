class AlephLayer
{
    constructor()
    {
        this.aleph = new Decimal(0);
        this.upgrades = {
            alephGain: new AlephUpgrade("Increase your aleph gain", level => Decimal.pow(1.215, level).mul(100),
                level => Decimal.pow(1.2, level)),
            alephGainBonus: new AlephUpgrade("Get a Bonus to aleph gain",
                level => Utils.createValueDilation(Decimal.pow(1000, level).mul(1000), 0.02),
                level => new Decimal(1).add(level.mul(0.1)).mul(Decimal.pow(1.05, Decimal.max(level.sub(10), 0))), {
                    getEffectDisplay: effectDisplayTemplates.percentStandard(3, "", " %", 0)
                }),
        };
    }

    getAlephGain()
    {
        return this.upgrades.alephGain.apply().mul(this.upgrades.alephGainBonus.apply())
    }

    isUnlocked()
    {
        return game.achievements[3].isCompleted == true;
    }

    maxAll()
    {
        for(const k of Object.keys(this.upgrades))
        {
            this.upgrades[k].buyMax();
        }
    }

    tick(dt)
    {
        if(this.isUnlocked())
        {
            this.aleph = this.aleph.add(this.getAlephGain().mul(dt));
        }
    }

    loadFromSave(obj)
    {
        this.aleph = obj.aleph;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        }
    }
}
