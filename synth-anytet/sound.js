let voices = 8;
let delayms = 250;
let synths = []
function init() {
	voices = Number(document.querySelector("#voices").value);
	voices = voices ? voices : 8;
	document.querySelector("#noteinput").cols = voices * 4 - 2;
	synths = []
	for (let i = 0; i < voices; i++) {
		synths.push(new p5.SqrOsc(256));
	}	
}
function changeTempo() {
	let bpm = Number(document.getElementById("tempo").value);
	delayms = 1000/(bpm/60);
}
init();
let getFreq = (str) => {
	let c4 = 220*(2**(1/12))**3;
	if (str.length == 2) {
		// spaghet
		switch (str[0].toLowerCase()) {
			case "c": {
				return c4 * 2**(Number(str[1]) - 4)
			}
			case "d": {
				return c4 * 2**(Number(str[1]) - 4) * (2**(1/12))**2;
			}
			case "e": {
				return c4 * 2**(Number(str[1]) - 4) * (2**(1/12))**4;
			}
			case "f": {
				return c4 * 2**(Number(str[1]) - 4) * (2**(1/12))**5;
			}
			case "g": {
				return c4 * 2**(Number(str[1]) - 4) * (2**(1/12))**7;
			}
			case "a": {
				return c4 * 2**(Number(str[1]) - 4) * (2**(1/12))**9;
			}
			case "b": {
				return c4 * 2**(Number(str[1]) - 4) * (2**(1/12))**11;
			}
		};
	} else if (str.length == 3) {
		// spaghet
		switch (str[0].toLowerCase()) {
			case "c": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 0 + ((str[1] == "#") ? 1 : -1) );
			}
			case "d": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 2 + ((str[1] == "#") ? 1 : -1) );
			}
			case "e": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 4 + ((str[1] == "#") ? 1 : -1) );
			}
			case "f": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 5 + ((str[1] == "#") ? 1 : -1) );
			}
			case "g": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 7 + ((str[1] == "#") ? 1 : -1) );
			}
			case "a": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 9 + ((str[1] == "#") ? 1 : -1) );
			}
			case "b": {
				return c4 * 2**(Number(str[2]) - 4) * (2**(1/12))**( 11 + ((str[1] == "#") ? 1 : -1) );
			}
		};
	};
	return 440;
}
async function play() {
	let alll = document.querySelector("#noteinput").value.split("\n");
	let allChords = [];
	for (let i = 0; i < alll.length; i++) {
		allChords[i] = alll[i].split(" ");
	}
	for (let i = 0; i < allChords.length; i++) {
		// s1.freq(getFreq(allChords[i][0]));
		// s2.freq(getFreq(allChords[i][1]));
		// s3.freq(getFreq(allChords[i][2]));
		// s4.freq(getFreq(allChords[i][3]));
		// s1.start();
		// s2.start();
		// s3.start();
		// s4.start();
		for (let j = 0; j < allChords[i].length; j++) {
			synths[j].freq(getFreq(allChords[i][j]));
			synths[j].start();
		};
		await delay(delayms);
		// s1.stop();
		// s2.stop();
		// s3.stop();
		// s4.stop();
	}
	for (let i = 0; i < synths.length; i++) {
		synths[i].stop();
	}
}
async function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve()
		}, ms)
	})
}
