require.config({
	paths: {
		jquery: "bower_components/jquery/dist/jquery.min",
		handlebars: "bower_components/handlebars/handlebars.amd",
		text: "bower_components/requirejs-text/text",
		hb: "bower_components/requirejs-handlebars/hb",
	}
});

require(["jquery", "abilities", "personality", "names", "equipment", "hb!tertiary.html"],
	function($, abilities, personality, names, equip, tertiaryTmpl) {

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
			related: [ "Athletics", "Awareness", "Endurance" ]
		},
		{
			name: "Eagle Eye",
			key: "Marksmanship",
			related: [ "Agility", "Awareness", "Stealth" ]
		}
	],
	Courtier: [
		{
			name: "A friendly face in the crowd",
			key: "Persuasion",
			related: [ "Awareness", "Cunning", "Will" ]
		},
		{
			name: "Your best friend",
			key: "Deception",
			related: [ "Cunning", "Awareness", "Will" ]
		}
	]
};

// Select one or two abilities and assign them rank 3 or 4.
// If you assigned rank 4 to the first ability, select two more abilits and assign rank 3 to each.
// Select two or three specialties. These specialties have 1B each.
// Calculate derived statistics
// Equip the character as appropriate.

function tertiaryGenerator( template, status ) {
	var type = pick( templates[ template ] );

	var firstAbility = random( 2 ) + 2,
		secondAbility = null,
		thirdAbility = null;
		fourthAbility = null;

	if ( firstAbility === 4 ) {
		secondAbility = random( 2 ) + 2;
		thirdAbility = fourthAbility = 3;
	} else if ( random( 2 ) === 1 ) {
		secondAbility = random( 2 ) + 2;
	}

	var character = {
		archetype: type.name,
		name: names(),
		quirk: pick( personality.traits ),
		abilities: []
	};

	function addAbility( ability, rank ) {
		var specialties = {};
		character.abilities.push({
			name: ability,
			rank: rank,
			speciality: pick( abilities[ ability ].specialties )
		});
	}
	addAbility( type.key, firstAbility );
	if ( secondAbility ) {
		addAbility( type.related[ 0 ], secondAbility );
	}
	if ( thirdAbility ) {
		addAbility( type.related[ 1 ], thirdAbility );
	}
	if ( fourthAbility ) {
		addAbility( type.related[ 2 ], fourthAbility );
	}

	if ( status !== 2 ) {
		addAbility( "Status", status );
		delete character.abilities[ character.abilities.length - 1 ].speciality;
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

	function find( ability ) {
		var result = 2;
		character.abilities.forEach(function( compareTo ) {
			if ( ability === compareTo.name ) {
				result = compareTo.rank;
			}
		});
		return result;
	}
	function sum() {
		var result = 0;
		[].slice.call( arguments, 0 ).forEach(function( ability ) {
			result += find( ability );
		});
		return result;
	}
	character.stats = [
		{
			name: "Intrigue Defense",
			value: sum( "Awareness", "Cunning", "Status" )
		},
		{
			name: "Composure",
			value: find( "Will" ) * 3
		},
		{
			name: "Combat Defense",
			value: sum( "Agility", "Athletics", "Awareness" )
		},
		{
			name: "Health",
			value: find( "Endurance" ) * 3
		}
	];

	equip( character );

	$( "#output" ).prepend( tertiaryTmpl({
		character: character
	}) );
}

tertiaryGenerator( random( 2 ) === 1 ? "Fighter" : "Courtier", 2 );
// for ( var i = 0; i < 50; i++) {
// 	tertiaryGenerator( "Fighter", 2 );
// }

$( "button" ).click(function() {
	var status = parseInt($( "#status" ).val(), 10 );
	tertiaryGenerator( $( this ).text(), status );
});


});