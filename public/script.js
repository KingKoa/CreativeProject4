
var app = new Vue ({
    el: '#app',
    data: {
        scores: [],
        usrName: "",
        targets: [{
            top: Math.random() * (screen.height - 200),
            left: Math.random() * (screen.width - 100),
            expand: false
        },  ],
        message: "",
        welcomeText: true,
        currentTimer: 0,
        hits: 0,
        timerState: 'stopped',
        ended: false,
        //formattedTime: "00:00:00",
        currentCountdown: 3,
        ready: false,

    },
    watch: {
        currentCountdown: function() {
            if (this.currentCountdown == 0) {
                this.pauseCountDown();
                this.start();
            }
        }
    },

    created: function() {
        this.getScores();
    },

    mounted: function() {
        this.start();
    },

    methods: {
        getScores: async function() {
            try {
              let response = await axios.get("/api/scores");
              this.scores = response.data;
              return true;
            } catch (error) {
              console.log(error);
            }
          },

          deleteScores: async function() {
            let response = await axios.delete("/api/scores");
          },

        addTopTen: async function(userName) {
            try {

                await this.getScores();

                let length = this.scores.length;

                let result = await axios.post('/api/scores', {
                id: length,
                name: userName,
                time: this.currentTimer,
                });

                if (length >= 9) {
                    await this.deleteScores();
                }
            } catch (error) {
                console.log(error);
            } 
        },
        pause: function() {
            window.clearInterval(this.ticker);
            this.timerState = 'paused';
          },

        pauseCountDown: function() {
            window.clearInterval(this.ticker);
            this.timerState = 'paused';
        },

        start: function() {

            this.tickDown();
            console.log(this.currentCountdown);
            if(this.currentCountdown == 0){
                this.ready=true;
                if (this.timerState !== 'running') {
                    this.tick();
                    this.timerState = 'running';
                }
            }
            
        },
        
        tick: function() {
            this.ticker = setInterval(() => {
              this.currentTimer++;
              //this.formattedTime = this.formatTime(this.currentTimer);
            }, 1000)
        },

        tickDown: function(){
            this.ticker = setInterval(() => {
                this.currentCountdown--; 
                
              }, 1000)
        },

        // formatTime: function(seconds) {
        //     let measuredTime = new Date(null);
        //     measuredTime.setSeconds(seconds);
        //     let MHSTime = measuredTime.toISOString().substr(11, 8);
        //     return MHSTime;
        // },

        hit: function(item) {
            var index = this.targets.indexOf(item);
            ++this.hits;
            this.targets[index].expand = true;

            if (this.hits >= 1) {
                this.welcomeText = false;
            }
            if (this.hits >= 10) {

                this.pause();
                this.ended = true;
                
            }
            if (!(this.ended)) {
                this.makeTarget();
            }   
        },

        deleteTarget: function(item) {
            var index = this.targets.indexOf(item);
            this.targets.splice(index, 1);
        },

        restart: function() {
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
});