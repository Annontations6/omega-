Vue.component("aleph-layer", {
    data: function()
    {
        return {
            aleph: game.alephLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return game.achievements[3].isCompleted == true;
        },
        isSoftCapped: function()
        {
            return this.aleph.aleph.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="aleph-layer">
<div class="resource">
    <p>You have {{formatNumber(aleph.aleph, 2, 2, 1e9)}} <span class="aleph">ℵ</span></p>
    <p>You get {{formatNumber(aleph.getAlephGain(), 2, 2, 1e9)}} <span class="aleph">ℵ</span> every second</p>
</div>
<div class="tabs">
    <button @click="aleph.maxAll()">Max All (M)</button>
</div>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.alephGain"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephGainBonus"></aleph-upgrade>
</div>
<h3>Enhancers</h3>
<div class="upgrades">
    coming soon
</div>
</div>`
});
