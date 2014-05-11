define(function() {

//	Type				Rating
//							Penalty
//								Bulk
//									Minimum Status
var armors = [
	[ "None",			0,	0,	0,	0 ],
	[ "Robes",			1,	0,	1,	2 ],
	[ "Vestments",		1,	0,	1,	3 ],
	[ "Padded",			1,	0,	0,	1 ],
	[ "Soft Leather",	2,	-1,	0,	1 ],
	[ "Hard Leather",	3,	-2,	0,	1 ],
	[ "Bone",			4,	-3,	1,	2 ],
	[ "Wood",			4,	-3,	1,	2 ],
	[ "Ring",			4,	-2,	1,	3 ],
	[ "Hide",			5,	-3,	3,	0 ],
	[ "Mail",			5,	-3,	2,	2 ],
	[ "Breastplate",	5,	-2,	3,	3 ],
	[ "Scale",			6,	-3,	2,	3 ],
	[ "Splint",			7,	-3,	3,	3 ],
	[ "Brigandine",		8,	-4,	3,	4 ],
	[ "Half Plate",		9,	-5,	3,	4 ],
	[ "Full Plate",		10,	-6,	3,	4 ]
];
armors = armors.map(function( armor ) {
	return {
		type: armor[ 0 ],
		rating: armor[ 1 ],
		penalty: armor[ 2 ],
		bulk: armor[ 3 ],
		status: armor[ 4 ]
	};
});
var functional = armors.filter(function( armor ) {
	return /Robes|Vestments/.test( armor.type );
});
var light = armors.filter(function( armor ) {
	return /Padded|Soft Leather/.test( armor.type );
});

var meleeWeapons = {
	"Axes": [
		"Battleaxe",
		"Crowbill",
		"Hand Axe",
		"Longaxe",
		"Mattock",
		"Woodsman's Axe"
	],
	"Bludgeons": [
		"Ball and Chain",
		"Cudgel / Club",
		"Flail",
		"Mace",
		"Maul",
		"Morningstar",
		"Quarterstaff",
		"Warhammer"
	],
	"Brawling": [
		"Fist",
		"Gauntlet",
		"Improvised",
		"Knife",
		"Whip"
	],
	"Fencing": [
		"Braavosi Blade",
		"Left-hand Dagger",
		"Small Sword"
	],
	"Long Blades": [
		"Arakh",
		"Bastard Sword",
		"Greatsword",
		"Longsword",
	],
	"Pole-Arms": [
		"Halberd",
		"Peasant tool",
		"Pole-Axe",
	],
	"Short Blades": [
		"Dagger",
		"Dirk",
		"Stiletto",
	],
	"Spears": [
		"Boar Spear",
		"Frog Spear",
		"Pike",
		"Spear",
		// "Tourney Lance",
		// "Trident",
		// "War Lance"
	]
};
var shields = [
	"Buckler",
	"Shield",
	"Shield, Large",
	// "Shield, Tower"
];
var rangedWeapons = {
	"Bows": [
		// "Double-curved bow",
		"Hunting bow",
		"Longbow"
	],
	"Crossbows": [
		// "Crossbow, Heavy",
		"Crossbow, Medium",
		"Crossbow, Light",
		// "Crossbow, Myrish",
	],
	"Thrown": [
		"Frog Spear (thrown)",
		"Hand Axe (thrown)",
		"Javelin",
		"Throwing Knife",
		"Net",
		"Sling",
		"Spear (thrown)",
		// "Trident (thrown)"
	]
};

function random( sides ) {
	return Math.floor(Math.random() * sides) + 1;
}

function pick( from ) {
	return from[ random( from.length ) - 1 ];
}

function find( character, ability ) {
	var result = 2;
	character.abilities.forEach(function( compareTo ) {
		if ( ability === compareTo.name ) {
			result = compareTo.rank;
		}
	});
	return result;
}

function appropriateArmor( character ) {
	var status = find( character, "Status" );
	var matches = armors.filter(function(armor) {
		return armor.type !== "Vestments" && armor.status <= status;
	});
	return pick( matches );
}

return function( character ) {
	var keyAbility = character.abilities[ 0 ],
		speciality = keyAbility.speciality,
		shield = false;
	if ( speciality === "Siege" ) {
		speciality = "Crossbows";
	}
	if ( speciality === "Target Shooting" ) {
		speciality = "Bows";
	}
	if ( speciality === "Shields" ) {
		speciality = pick( Object.keys( meleeWeapons) );
		shield = true;
	}
	if ( keyAbility.name === "Fighting" ) {
		character.armor = appropriateArmor( character );
		character.weapon = pick( meleeWeapons[ speciality ] );
		if (shield) {
			character.shield = pick( shields );
		}
	} else if ( keyAbility.name === "Marksmanship" ) {
		character.armor = pick( light );
		character.weapon = pick( rangedWeapons[ speciality ] );
	} else if ( keyAbility.name === "Persuasion" ) {
		character.armor = pick( functional );
		character.weapon = Math.random() > 0.8 ? "Small Sword" : "None";
	} else if ( keyAbility.name === "Deception" ) {
		character.armor = pick( functional );
		character.weapon = Math.random() > 0.7 ? "Dagger" : "None";
	} else {
		throw new Error( "Can't equip this key ability: " + keyAbility.name );
	}
};

});