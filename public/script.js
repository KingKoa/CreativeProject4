var app = new Vue ({
    el: '#app',
    data: {
        targets: [{
            top: Math.random() * (screen.height - 200),
            left: Math.random() * (screen.width - 100),
            expand: false
        },  ],

        welcomeText: true,
        health: 100,
        hits: 0,
        ended: false,
    },

    created: {
        endWelcomeText: setTimeout(() => this.welcomeText=false, 2000)
    },

    methods: {
        hit: function(item) {
            var index = this.targets.indexOf(item);
            this.health -= 20;

            if (this.health <= 0) {
                this.ended = true;
            }

            this.targets[index].expand = true;
            //setTimeout(this.deleteTarget(item), 3000);

            if (this.health > 0) {
                this.makeTarget();
            }

            ++this.hits;
        },

        deleteTarget: function(item) {
            var index = this.targets.indexOf(item);
            this.targets.splice(index, 1);
        },

        restart: function() {
            this.health = 100;
            this.ended = false;
        },

        makeTarget: function() {
            this.targets.push({
                top: Math.random() * (screen.height - 200),
                left: Math.random() * (screen.width - 100 ),
                expand: false
            })
        }
    },

    computed: {

    }
});