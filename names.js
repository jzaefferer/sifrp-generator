define(function() {
	var houseNames = "Blount Boggs Brune Buckwell Bywater Cave Chelsted Chyttering Crabb Cressey Edgerton Farring Follard Gaunt Hardy Harte Hayford Hogg Kettleblack Langward Mallery Manning Massey Moss Pyle Pyne Rambton Rollingford Rosby Rykker Staunton Stokeworth Thorne Wells Wendwater".split( " " );
	var bastardNames1 = "Flowers Hill Pyke Rivers Sand Snow".split( " " );
	var bastardNames2 = "Stone Storm Waters".split( " " );
	var tradeNames = "Brazier Brewer Cartwright Cooper Fields Grove Miller Porter Smith Vintner Wells Wheelwright".split( " " );
	var givenNames = {
		male: "Ardrian Benfred Bowen Branden Darren Denys Duncan Edwyn Erryk Ethan Garth Gilbert Godry Gwayne Gyles Harlan Jaime Jasen Joffrey Jonothor Justin Lawrence Loren Mace Meryn Ned Ondrew Osmund Petyr Robert Rodrick Roger Terrance Torrhen Vickon Willam".split( " " ),
		female: "Alannys Alys Annara Anya Barbrey Bella Berena Bethany Carellen Corenna Donella Edarra Ella Elyana Falyse Jacelyn Jeyne Jonelle Joyeuse Leona Lyanna Lynesses Lysa Meera Mya Myriah Naerys Nymeria Rechildess Rhaenyra Selyse Sybelle Tanda Wynafryd Wylla Zhoe".split( " " )
	};

	var names = {
		male: "Abe Adam Art Arn Ben Brus Burt Bert Ced Cley Cliff Creg Cris Dale Dan Dave Dick Dom Edd Frank Garth Glen Gran Greg Hobb Hugo Jack Jon Josh Ken Kyle Krom Lance Leo Les Ley Lyn Luc Mace Mal Mark Otto Pearse Perk Phil Qarl Quent Ralf Ray Reese Reg Rick Robb Rolph Roose Ryan Sam Seb Stef Theo Tom Ulf Vic Ygg Zak".split( " " ),
		female: " Alla Alys Asha Bess Beth Caro Carren Cass Cat Dacey Donna Della Desa Elia Ella Falia Gwin Hella Janna Jory Kaila Kyra Lara Leona Lia Liane Lynn Marga Maria Mary Mina Mya Myra Rella Rhia Rona Rylene Sara Sylva Tara Tyra Una Ursa Viki Wyna Yrsa Zhoe Zia".split( " " ),
	};
	var prefixes = "Ashen Barren Beaten Bedridden Beholden Bespoken Birchen Brazen Broken Bronzen Carven Chicken Chidden Craven Driven Drunken Dwarven Eastern Even Fallen Flaxen Flea-bitten Forbidden Forgotten Frozen Given Godforsaken Golden Graven Hagridden Handwritten Hard-bitten Heartbroken Heathen Heathen Hempen Hidden Leathern Linen Lumpen Maiden Misbegotten Misshapen Mistaken Molten Moth-eaten Northern Oaken Oaten Olden Open Outspoken Overladen Plainspoken Proven Quick-frozen Raven Shaven Shrunken Silken Silvern Sodden Softspoken Southern Spoken Stolen Stricken Sudden Sullen Sunken Swollen Taken Unbeaten Unbroken Uneaten Uneven Unproven Unshaven Unspoken Unwoven Unwritten Waxen Western Wheaten Wooden Woolen Woollen Woven".split( " " );

	function pick( list ) {
		return list[ Math.floor( Math.random() * list.length ) ];
	}
	function generate( gender ) {
		var prefix = Math.random() > 0.9 ? ( pick( prefixes ) + " " ) : "";
		var lastName = "",
			highborn = false;
		if ( !prefix ) {
			var status = Math.random();
			if ( status > 0.85 ) {
				lastName = pick( houseNames );
				highborn = true
			} else if ( status > 0.7 ) {
				lastName = pick( Math.random() > 0.5 ? bastardNames1 : bastardNames2 );
			} else if ( status > 0.4 ) {
				lastName = pick( tradeNames );
				if ( !/Brazier|Fields|Grove|Wells/.test( lastName) ) {
					lastName = "the " + lastName;
				}
			}
		}
		var firstFrom = highborn ? givenNames : names;
		return prefix + pick( firstFrom[ gender ] ) + " " + lastName;
	}

	return function() {
		return generate( Math.random() > 0.25 ? "male" : "female" );
	};
});
