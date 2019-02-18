class Main {
	constructor(id) {
		this.id = id;
	}

	instaniate() {
		let container = document.querySelector('#container');

    	let a = document.createElement("div");
    	a.setAttribute("class", "parent");
        a.setAttribute("id", `parent${this.id}`);
        
        for(let i=0; i<9; i++) {
        	let b = document.createElement("div");
            b.setAttribute("class", "child");
            b.setAttribute("id", `child${i+1}`);
            
            a.appendChild(b);
        }
        
        container.appendChild(a);

        let startGameBtn = document.createElement('button');
        startGameBtn.setAttribute('id', `startGameBtn${this.id}`);
        
        let text = document.createTextNode("Start Game");
        startGameBtn.appendChild(text);

        let stopGameBtn = document.createElement('button');
        stopGameBtn.setAttribute('id', `stopGameBtn${this.id}`);
        let stopText = document.createTextNode("Stop Game");
        stopGameBtn.appendChild(stopText);

        let counterContainer = document.createElement("div");
        counterContainer.setAttribute('id', 'counterContainer');

        let counter = document.createElement("span");
        counter.setAttribute('id', `counter${this.id}`);
        let ctext = document.createTextNode(0);
        counter.appendChild(ctext);

        let cSpan = document.createElement("span");
        let spanText = document.createTextNode("/");
        cSpan.appendChild(spanText);

        let totalCount = document.createElement("span");
        totalCount.setAttribute('id', `totalCount${this.id}`);
        let totalText = document.createTextNode(0);
        totalCount.appendChild(totalText);

        counterContainer.appendChild(counter);
        counterContainer.appendChild(cSpan);
        counterContainer.appendChild(totalCount);

        let gameFunc = document.createElement("div");
        gameFunc.appendChild(startGameBtn);
        gameFunc.appendChild(counterContainer);
        gameFunc.appendChild(stopGameBtn);

        container.appendChild(gameFunc);
    }


	getRandom(id) {
		this.blinking = setInterval(function() {
			let alreadyBlink = document.querySelector(`#${id} .blink`);
			if(alreadyBlink) {
				alreadyBlink.classList.remove('blink');
			}
			
			let rand = Math.floor(Math.random()*10);
			let blink = document.querySelector(`#${id} #child${rand}`);
			blink.classList.add('blink');
		}, 950);
	}

    startGame(id) {
    	console.log('start game');
    	this.getRandom(id);

    	let counter = document.querySelector(`#counter${this.id}`);
    	let total = document.querySelector(`#totalCount${this.id}`);
    	let totalClick = total.innerHTML;
    	let counterVal = counter.innerHTML;
    	let parent = document.querySelector(`#parent${this.id}`);

    	parent.addEventListener('click', function(e) {
    		totalClick++;
    		
    		if(e.target.classList.contains('blink')) {
    			counterVal++;
    		}

    		counter.innerHTML = counterVal;
    		total.innerHTML = totalClick;
    	});
    }

    stopGame() {
    	clearInterval(this.blinking);
    }
}

let create = document.querySelector('#create');
let objectList = [];

create.addEventListener("click", function(e) {
	console.log("Create btn clicked");
   
   let id = Math.floor(Math.random()*100);
   let p = new Main(id);
   let index;
   objectList.push(p);
   index = objectList.length - 1;
   objectList[index].instaniate();

   document.querySelector(`#startGameBtn${id}`).addEventListener("click", function() {
		objectList[index].startGame(`parent${id}`);
 	})

   document.querySelector(`#stopGameBtn${id}`).addEventListener("click", function() {
		objectList[index].stopGame();
 	})
})
