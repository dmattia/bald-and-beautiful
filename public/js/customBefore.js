
// RANKING JAVASCRIPT

var mensDorms = ["Alumni", "Carroll", "Dillon", "Duncan", "Fisher", "Keenan", "Keough", "Knott", "Morrissey", "O'Neill", "St. Edward's", "Siegfried", "Sorin", "Stanford", "Zahm"];
var womensDorms = ["Badin", "Breen-Phillips", "Cavanaugh", "Farley", "Howard", "Lewis", "Lyons", "McGlinn", "Pangborn", "Pasquerilla East", "Pasquerilla West", "Ryan", "Walsh", "Welsh Family"];

colorStr = "color: #f7da7c";

var mensArray = [ [ 'Mens Residence', 'Shaving Registrants', { role: 'style' } ] ];
var womensArray = [ [ 'Womens Residence', 'Inches Pledged', { role: 'style' } ] ];

var maxMens = 0;
var maxWomens = 0;

function drawVisualizationShave()
{
	var data = google.visualization.arrayToDataTable( mensArray );

	new google.visualization.BarChart(document.getElementById('visualizationShave')).
	draw( data,
	{
		title:"Men's Residence Hall Pre-Registration, 2015", viewWindowMode: 'explicit', 
		titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22'},

		legend: {position: 'none'},
		backgroundColor: { fill: "#365a36" },
		width: 900, height: 400,
		chartArea: { 'left': '15%', 'right': '10%', 'top': '10%', 'width': '80%', 'height': '70%'},
		vAxis: 
		{
			textStyle: { fontName: 'kabellight', color: 'white', fontSize: '17' },
		},
		hAxis: 
		{
			textStyle: { fontName: 'kabellight', color: 'white', fontSize: '17' },
			gridlines: { color: "#FFFFFF" },
			title: "Shaving Registrants", viewWindowMode: 'explicit', viewWindow: 
			{
				max: maxMens + 5,
				min: 0,
			},
			titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22' },
			gridlines: {count: 8}
		},
		tooltip:
		{
			textStyle: { fontName: 'kabellight' }
		}
	});
}

function drawVisualizationDonation()
{
	var data = google.visualization.arrayToDataTable( womensArray );

	new google.visualization.BarChart(document.getElementById('visualizationDonation')).
	draw( data,
	{
		title:"Women's Residence Hall Pre-Registration, 2015", viewWindowMode: 'explicit', 
		titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22'},

		legend: {position: 'none'},
		backgroundColor: { fill: "#365a36" },
		width: 900, height: 400,
		chartArea: { 'left': '15%', 'right': '10%', 'top': '10%', 'width': '80%', 'height': '70%'},
		vAxis: 
		{
			textStyle: { fontName: 'kabellight', color: 'white', fontSize: '17' },
		},
		hAxis: 
		{
			textStyle: { fontName: 'kabellight', color: 'white', fontSize: '17' },
			gridlines: { color: "#FFFFFF" },
			title: "Inches of Hair Pledged", viewWindowMode: 'explicit', viewWindow: 
			{
				max: maxWomens + 5,
				min: 0,
			},
			titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22' },
			gridlines: {count: 8}
		},
		tooltip:
		{
			textStyle: { fontName: 'kabellight' }
		}
	});
}

function generateMensRankings()
{
	var URI = "https://spreadsheets.google.com/feeds/list/1F4b7452VNtSKRPTqGEXDtpE9cF8Q_jOeEPu7EiZZ_zk/1/public/values?alt=json";

	$.get( URI, function( data )
	{
		var entries = {};
		var feedEntries = data.feed.entry;

		for( var i = 0; i < feedEntries.length; i++ )
		{
			if( feedEntries[ i ][ "gsx$gender" ][ "$t" ] == "Male" )
			{
				if( feedEntries[ i ][ "gsx$mensresidencehall" ][ "$t" ].trim() in entries )
				{
					entries[ feedEntries[ i ][ "gsx$mensresidencehall" ][ "$t" ].trim() ] += 1;
				}
				else
				{
					entries[ feedEntries[ i ][ "gsx$mensresidencehall" ][ "$t" ].trim() ] = 1;
				}
			}
		}

		keys = Object.keys( entries );

		for( var j = 0; j < mensDorms.length; j++ )
		{
			if( mensDorms[ j ] in entries )
			{
				mensArray.push( [ mensDorms[ j ], entries[ mensDorms[ j ] ], colorStr ] );

				if( entries[ mensDorms[ j ] ] > maxMens )
				{
					maxMens = entries[ mensDorms[ j ] ];
				}
			}
			else
			{
				mensArray.push( [ mensDorms[ j ], 0, colorStr ] );
			}
		}
	});
}

function generateWomensRankings()
{
	var URI = "https://spreadsheets.google.com/feeds/list/1akXV4WFP4Y-SIhIv_IW4iANEX3NqwEXNDTW5HUBsE-s/1/public/values?alt=json";

	$.get( URI, function( data )
	{
		var entries = {};
		var feedEntries = data.feed.entry;

		console.log( feedEntries );

		for( var i = 0; i < feedEntries.length; i++ )
		{
			if( feedEntries[ i ][ "gsx$gender" ][ "$t" ] == "Female" )
			{
				if( feedEntries[ i ][ "gsx$womensresidencehall" ][ "$t" ].trim() in entries )
				{
					entries[ feedEntries[ i ][ "gsx$womensresidencehall" ][ "$t" ].trim() ] += parseInt( feedEntries[ i ][ "gsx$iplantodonateaboutinchesofhair." ][ "$t" ] );
				}
				else
				{
					entries[ feedEntries[ i ][ "gsx$womensresidencehall" ][ "$t" ].trim() ] = parseInt( feedEntries[ i ][ "gsx$iplantodonateaboutinchesofhair." ][ "$t" ] );
				}
			}
		}

		console.log( entries );

		keys = Object.keys( entries );

		for( var j = 0; j < womensDorms.length; j++ )
		{
			if( womensDorms[ j ] in entries )
			{
				womensArray.push( [ womensDorms[ j ], entries[ womensDorms[ j ] ], colorStr ] );

				if( entries[ womensDorms[ j ] ] > maxWomens )
				{
					maxWomens = entries[ womensDorms[ j ] ];
				}
			}
			else
			{
				womensArray.push( [ womensDorms[ j ], 0, colorStr ] );
			}
		}
	});
}

function parseTheJSON( data )
{
	var json = data.split( "(" )[1];
	json = json.split( ")" )[0];

	return JSON.parse( json );
}