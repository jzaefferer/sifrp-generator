require.config({
	paths: {
		jquery: "bower_components/jquery/dist/jquery.min",
		handlebars: "bower_components/handlebars/handlebars.amd",
		text: "bower_components/requirejs-text/text",
		hb: "bower_components/requirejs-handlebars/hb",
	}
});

require(["jquery", "abilities", "personality", "smallfolk-names", "hb!tertiary.html"],
	function($, abilities, personality, smallfolkNames, tertiaryTmpl) {

function random( sides ) {
	return Math.floor(Math.random() * sides) + 1;
}

function pick( from ) {
	return from[ random( from.length ) - 1 ];
}

function pickFromExcept( from, exclude ) {
	var escape = 0;
	function roll() {
		return pick( from );
	}
	var result;
	do {
		result = roll();
		escape++;
	} while ( escape < 1000 && exclude.indexOf( result ) !== -1 );
	return result;
}

var templates = {
	Fighter: [
		{
			name: "Grunt",
			key: "Fighting",
			related: [ "Athletics", "Endurance" ]
		},
		{
			name: "Eagle Eye",
			key: "Marksmanship",
			related: [ "Agility", "Stealth" ]
		}
	],
	Courtier: [
		{
			name: "A friendly face in the crowd",
			key: "Persuasion",
			related: [ "Awareness", "Will" ]
		},
		{
			name: "Your best friend",
			key: "Deception",
			related: [ "Cunning", "Will" ]
		}
	]
};

// Select one or two abilities and assign them rank 3 or 4.
// If you assigned rank 4 to the first ability, select two more abilits and assign rank 3 to each.
// Select two or three specialties. These speciatlies have 1B each.
// Calculate only those derived statistics relevant to the scene (Combat Defense for combats or Intrigue Defense for intrigues).
// Equip the character as appropriate.

// Generator:
// 50/50 fighter or courtier, 50/50 melee/archer or charmer/scroundrel
// Put 3 or 4 in key ability
// If 4, put 3 in the two related abilities
// If 3, 50% chance for a second ability with rank 3
// Put 1B on key and two related, independent of rank
// Calculate stats
// Generate equipment
// Generate quirk

function tertiaryGenerator( template ) {
	var type = pick( template );

	var firstAbility = random( 2 ) + 2,
		secondAbility = null,
		thirdAbility = null;

	if ( firstAbility === 4 ) {
		secondAbility = thirdAbility = 3;
	} else {
		if ( random( 2 ) === 1 ) {
			secondAbility = 3;
		}
	}

	var character = {
		archetype: type.name,
		name: smallfolkNames(),
		quirk: pick( personality.traits ),
		abilities: []
	};

	function addAbility( ability, rank ) {
		var specialties = {};
		character.abilities.push({
			name: ability,
			rank: rank,
			specialty: pick( abilities[ ability ].specialties )
		});
	}
	addAbility( type.key, firstAbility );
	if ( secondAbility ) {
		var which = thirdAbility ? 0 : random( 2 ) - 1;
		addAbility( type.related[ which ], secondAbility );
	}
	if ( thirdAbility ) {
		addAbility( type.related[ 1 ], thirdAbility );
	}

	var existingAbilities = character.abilities.map(function( ability ) {
		return ability.name;
	});
	function add1B() {
		var a1B = pickFromExcept( Object.keys( abilities ), existingAbilities );
		existingAbilities.push( a1B );
		addAbility( a1B, 2 );
	}
	while ( character.abilities.length <= 1) {
		add1B();
	}

	$( "#output" ).prepend( tertiaryTmpl({
		character: character
	}) );
}

var template = random( 2 ) === 1 ? templates.Fighter : templates.Courtier;
tertiaryGenerator( template );

$( "button" ).click(function() {
	tertiaryGenerator( templates[ $( this ).text() ] );
});


});