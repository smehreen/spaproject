// JavaScript Document
                
                
                        var Wave;

                        /*
                         * =========================
                         * WAVE CONSTRUCTOR
                         */
                        (Wave = function(id)
                        {
                                // Get the element
                                this.e = document.getElementById(id);
                                this.e.className = this.e.className + ' wave';
                                // Split up the elements
                                this.split();
                        })
                        /* 
                         * =========================
                         * WAVE STRUCTURE
                         */
                        .prototype =
                        {
                                
                                // The main wave element
                                e: null,
                                // The wave text
                                text: '',
                                // The wave characters
                                chars: [],
                                // The total time for one cycle (in seconds)
                                loopTime: 2,
                                // The time at which the animation began
                                beginTime: 0,
                                // The interval used for callbacks
                                interval: null,
                                
                                // The number of crests/troughs
                                frequency: 2,
                                // The height of the wave (from the centre, in pixels)
                                amplitude: 5,
                                
                                /**
                                 * Split up the text into individual characters.
                                 */
                                split: function()
                                {
                                        // The text to wave
                                        this.text = (this.e.firstChild.nodeName == '#text') ? this.e.firstChild.nodeValue : (this.e.innerText || this.e.textContent || '?');
                                        this.chars = [];
                         
                                        // Remove all of the elements from the wave before we rebuild
                                        while (this.e.firstChild)
                                                this.e.removeChild(this.e.firstChild);
                                        
                                        // Loop through the new characters, putting them into <span>s and those into the wave
                                        var span;
                                        for (var c = 0; c < this.text.length; c++)
                                        {
                                                (span = this.e.appendChild(
                                                                document.createElement("span")
                                                        )).appendChild(
                                                                document.createTextNode(this.text.charAt(c))
                                                        );
                                                this.chars.push(span);
                                        }
                                },
                                
                                /**
                                 * Begin the animation.
                                 */
                                begin: function()
                                {
                                        this.beginTime = (new Date).getTime();
                                        
                                        var self = this;
                                        this.interval = setInterval(function() { self.update(); }, 50);
                                },
                                
                                /**
                                 * Update the state of the wave
                                 */
                                update: function()
                                {
                                        // The number of milliseconds the animation has been running
                                        var timeDiff = (new Date).getTime() - this.beginTime;
                                        // The proportion of the way through the animation (%1 to account for looping)
                                        var p = (timeDiff / (this.loopTime * 1000)) % 1;
                                        
                                        // Reposition the element according to their 
                                        for (var c = 0; c < this.chars.length; c++)
                                        {
                                                // The proportion of the way through each character's individual animation
                                                var cp = p + this.frequency * c / (this.chars.length-1);
                                                // The position of the character
                                                var pos = this.amplitude * Math.sin(cp * 2 * Math.PI);
                                                this.chars[c].style.top = pos + 'px';
                                        }
                                },
                        };

                        /**
                         * Get the ball (or wave, I suppose) rolling
                         */
                         
                        var waveA, waveB, waveC;
                        
                        window.onload = function()
                        {
                                                               
                                waveB = new Wave("wave-b");
                                waveB.loopTime = 1;
                                waveB.frequency = 4;
                                waveB.amplitude = 10;
                                waveB.begin();
                                
                               
                        }
                
             
                