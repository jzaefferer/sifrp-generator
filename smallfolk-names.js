define(function() {
	var names = {
		male: "Abe Adam Art Arn Ben Brus Burt Bert Ced Cley Cliff Creg Cris Dale Dan Dave Dick Dom Edd Frank Garth Glen Gran Greg Hobb Hugo Jack Jon Josh Ken Kyle Krom Lance Leo Les Ley Lyn Luc Mace Mal Mark Otto Pearse Perk Phil Qarl Quent Ralf Ray Reese Reg Rick Robb Rolph Roose Ryan Sam Seb Stef Theo Tom Ulf Vic Ygg Zak".split( " " ),
		female: " Alla Alys Asha Bess Beth Caro Carren Cass Cat Dacey Donna Della Desa Elia Ella Falia Gwin Hella Janna Jory Kaila Kyra Lara Leona Lia Liane Lynn Marga Maria Mary Mina Mya Myra Rella Rhia Rona Rylene Sara Sylva Tara Tyra Una Ursa Viki Wyna Yrsa Zhoe Zia".split( " " ),
	};
	var prefixes = "ashen barren beaten bedridden beholden bespoken birchen brazen broken bronzen carven chicken chidden craven driven drunken dwarven eastern even fallen flaxen flea-bitten forbidden forgotten frozen given godforsaken golden graven hagridden handwritten hard-bitten heartbroken heathen Heathen hempen hidden leathern linen loden lumpen maiden misbegotten misshapen mistaken molten moth-eaten north-eastern north-western northern oaken oaten olden open outspoken overladen plainspoken proven quick-frozen raven shaven shrunken silken silvern sodden softspoken south-eastern south-western southern spoken stolen stricken sudden sullen sunken swollen taken unbeaten unbroken uneaten uneven unproven unshaven unspoken unwoven unwritten waxen western wheaten wooden woolen woollen woven".split( " " );

	function randomName( list, exclude ) {
		var result;
		do {
			result = list[ Math.floor( Math.random() * list.length ) ];
		} while ( result === exclude );
		return result;
	}
	function generate( gender ) {
		var prefix = randomName( prefixes );
		return prefix[0].toUpperCase() + prefix.substring(1) + " " + randomName( names[ gender ] );
	}

	return function() {
		return generate( Math.random() > 0.25 ? "male" : "female" );
	};
});
