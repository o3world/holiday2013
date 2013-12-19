//Create global namespace
var O3 = O3 || {};

O3.keithClickCounter = 1;

jQuery(document).ready(function() {

	jQuery('.randomize-outfit').on('click', function(){
		O3.outfit = new O3.DressUpKeith();
		O3.outfit.randomizeOutfit();
		O3.keithClickCounter++;
	});

	jQuery('.create-ipsum').on('click', function(){
		O3.ipsum = new O3.GadsbyIpsum();
		O3.ipsum.createIpsum();
	});
	
});

O3.getRandomArrayPosition = function(arrayToChooseFrom) {
	return Math.floor(Math.random()*arrayToChooseFrom.length);
}

O3.getRandomArrayValue = function(arrayToChooseFrom) {
	return arrayToChooseFrom[this.getRandomArrayPosition(arrayToChooseFrom)];
}

O3.DressUpKeith = function() {

	var imageDirectory = '../images/keith/';

	var outfits = {

		heads: [imageDirectory + 'head-1.png', imageDirectory + 'head-2.png', imageDirectory + 'head-3.png'],

		bodies: [{src: imageDirectory + 'body-1.png', overlap: true}, {src: imageDirectory + 'body-2.png', overlap: false}, {src: imageDirectory + 'body-2.png', overlap: false}, {src: imageDirectory + 'body-4.png', overlap: false}],

		legs: [imageDirectory + 'legs-1.png', imageDirectory + 'legs-2.png', imageDirectory + 'legs-3.png', imageDirectory + 'legs-4.png'],

		shoes: [imageDirectory + 'shoes-1.png', imageDirectory + 'shoes-2.png', imageDirectory + 'shoes-3.png', imageDirectory + 'shoes-4.png'],
	};

	var manageBodyOverlap = function(overlap) {

		var builtPerson = jQuery('.built-person');
		var cssClass = 'body-overlap';

		if (overlap) {

			if (!builtPerson.hasClass(cssClass)) {
				builtPerson.addClass(cssClass);
			}

		} else {

			if (builtPerson.hasClass(cssClass)) {
				builtPerson.removeClass(cssClass);
			}

		}
	}

	var manageSpecialOutfit = function(flag) {

		var builtPerson = jQuery('.built-person');
		var cssClass = 'special-outfit';

		if (flag) {

			if (!builtPerson.hasClass(cssClass)) {
				builtPerson.addClass(cssClass);
			}

		} else {

			if (builtPerson.hasClass(cssClass)) {
				builtPerson.removeClass(cssClass);
			}

		}
	}

	this.randomizeOutfit = function() {
		var head;
		var body;
		var legs;
		var shoes = O3.getRandomArrayValue(outfits.shoes);

		if (O3.keithClickCounter % 7 === 0) {

			head = imageDirectory + 'head-special.png';
			body = imageDirectory + 'body-special.png';
			legs = imageDirectory + 'legs-special.png';

			manageSpecialOutfit(true);

		} else {

			head = O3.getRandomArrayValue(outfits.heads);
			var bodyObj =  O3.getRandomArrayValue(outfits.bodies);
			body = bodyObj.src;
			var bodyOverlap = bodyObj.overlap;
			legs = O3.getRandomArrayValue(outfits.legs);

			manageSpecialOutfit(false);
			manageBodyOverlap(bodyOverlap);
			
		}

		jQuery('.built-person .head').attr('src', head);
		jQuery('.built-person .body').attr('src', body);
		jQuery('.built-person .legs').attr('src', legs);
		jQuery('.built-person .shoes').attr('src', shoes);

	}
}

O3.GadsbyIpsum = function() {

	var phrases = {

		addresses: ['hey guys', 'dude', 'listen up,'],

		leads: ['honestly...', 'well...', 'you know...', 'ummm...'],

		starters: ['not for nothing, but', 'see...this is what I\'m getting at', 'listen, at the end of the day', 'just so you\'re aware', 'to a certain degree', 'let me make this clear', 'let\'s be honest', 'I can tell you right now', 'correct me if I\'m wrong here but', 'I will say this', 'let me just back up'],

		connectors: ['and to be quite frank,', 'and I\'ll tell you why,', 'and to be fair,', 'and to some degree,'],

		declarations: ['I get where you\'re going', 'yes and no', 'I\'m into that', 'what\'s the point and purpose', 'it is what it is', 'it\'s a thing', 'that\'s not the issue', 'just fake the funk', 'we need to flip the script', 'I\'m super psyched', 'it\'s super sweet'],

		standalones: ['can I get you for a sec?', 'get in here', 'you have a minute?', 'fuck gurus, fuck ninjas', 'just throw in some loaders', 'what are we looking at timewise here?', 'fuck', 'word', 'boom']
	};

	var sentenceStructures = [

		O3.getRandomArrayValue(phrases.addresses) + ' ' + O3.getRandomArrayValue(phrases.leads) + O3.getRandomArrayValue(phrases.starters) + ' ' + O3.getRandomArrayValue(phrases.declarations),

		O3.getRandomArrayValue(phrases.leads) + O3.getRandomArrayValue(phrases.starters) + ' ' + O3.getRandomArrayValue(phrases.declarations),

		O3.getRandomArrayValue(phrases.starters) + ' ' + O3.getRandomArrayValue(phrases.declarations),

		O3.getRandomArrayValue(phrases.leads) + O3.getRandomArrayValue(phrases.declarations),

		O3.getRandomArrayValue(phrases.addresses)  + ' ' + O3.getRandomArrayValue(phrases.declarations),

		O3.getRandomArrayValue(phrases.standalones)
	];

	var capitalizeFirstLetter = function(sentenceToAlter) {
		return sentenceToAlter.charAt(0).toUpperCase() + sentenceToAlter.slice(1);
	}

	var hasExistingPunctuation = function(sentenceToCheck) {

		var lastChar = sentenceToCheck.charAt(sentenceToCheck.length-1);

		if (lastChar == '!' || lastChar == '?') {
			return true;
		} else {
			return false;
		}
	}

	this.createIpsum = function() {
		
		var structureChoice = O3.getRandomArrayPosition(sentenceStructures);
		var structure = sentenceStructures[structureChoice];
 		var sentence = capitalizeFirstLetter(structure);

 		if (Math.floor((Math.random()*(sentenceStructures.length - 1))+1) == 4 && structureChoice != (sentenceStructures.length - 1)) {

 			sentence += ' ' + O3.getRandomArrayValue(phrases.connectors) + ' ' + O3.getRandomArrayValue(phrases.declarations);
 		}

 		if (!hasExistingPunctuation(sentence)) {
 			sentence += '.';
 		}

 		jQuery('.bubble span').text(sentence);
	}

}