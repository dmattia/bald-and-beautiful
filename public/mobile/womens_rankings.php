<?php

  $mensDorms = array();

  $mensDorms['Alumni'] = 0;
  $mensDorms['Carroll'] = 0;
  $mensDorms['Dillon'] = 0;
  $mensDorms['Duncan'] = 0;
  $mensDorms['Fisher'] = 0;
  $mensDorms['Keenan'] = 0;
  $mensDorms['Keough'] = 0;
  $mensDorms['Knott'] = 0;
  $mensDorms['Morrissey'] = 0;
  $mensDorms['Old College'] = 0;
  $mensDorms['O\'Neill'] = 0;
  $mensDorms['St. Edward\'s'] = 0;
  $mensDorms['Siegfried'] = 0;
  $mensDorms['Sorin'] = 0;
  $mensDorms['Stanford'] = 0;
  $mensDorms['Zahm'] = 0;

  $womensDorms = array();

  $womensDorms['Badin'] = 0;
  $womensDorms['Breen-Phillips'] = 0;
  $womensDorms['Cavanaugh'] = 0;
  $womensDorms['Farley'] = 0;
  $womensDorms['Howard'] = 0;
  $womensDorms['Lewis'] = 0;
  $womensDorms['Lyons'] = 0;
  $womensDorms['McGlinn'] = 0;
  $womensDorms['Pangborn'] = 0;
  $womensDorms['Pasquerilla East'] = 0;
  $womensDorms['Pasquerilla West'] = 0;
  $womensDorms['Ryan'] = 0;
  $womensDorms['Walsh'] = 0;
  $womensDorms['Welsh Family'] = 0;

  $keyShave = "1F4b7452VNtSKRPTqGEXDtpE9cF8Q_jOeEPu7EiZZ_zk";
  $keyDonate = "1akXV4WFP4Y-SIhIv_IW4iANEX3NqwEXNDTW5HUBsE-s";

  $urlShave = "http://spreadsheets.google.com/feeds/cells/$keyShave/1/public/values";
  $urlDonate = "http://spreadsheets.google.com/feeds/cells/$keyDonate/1/public/values";
       
  $ch = curl_init();
   
  // set URL and other appropriate options
       
  curl_setopt($ch, CURLOPT_URL, $urlShave );
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
       
  // grab URL and pass it to the browser
  $google_sheet = curl_exec($ch);
  // close cURL resource, and free up system resources
  curl_close($ch);
    
  $doc = new DOMDocument();
  $doc->loadXML($google_sheet);
       
  $nodes = $doc->getElementsByTagName("cell");
         
  if( $nodes->length > 0 )
  {
    $row = 2;
    $prev = '';
    
    foreach( $nodes as $node )
    {
      if( $node->getAttribute("row") == $row )
      {
        if( $prev == 'Male' )           // hall is next node after gender
        {
          $dorm = chop( $node->nodeValue );

          if( array_key_exists( $dorm, $mensDorms ) )
          {
            $mensDorms[ $dorm ] = $mensDorms[ $dorm ] + 1;
          }

          $row = $row + 1;              // next row
        }
        elseif( $prev == 'Female' )
        {
          $row = $row + 1;
        }

        $prev = $node->nodeValue;
      }
    }
  }

  $ch = curl_init();
   
  // set URL and other appropriate options
       
  curl_setopt($ch, CURLOPT_URL, $urlDonate );
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
       
  // grab URL and pass it to the browser
  $google_sheet = curl_exec($ch);
  // close cURL resource, and free up system resources
  curl_close($ch);
    
  $doc = new DOMDocument();
  $doc->loadXML($google_sheet);
       
  $nodes = $doc->getElementsByTagName("cell");
           
  if( $nodes->length > 0 )
  {
    $row = 2;
    $prev = '';
    
    foreach( $nodes as $node )
    {
      if( $node->getAttribute("row") == $row )
      {
        if( $prev == 'Female' )           // hall is next node after gender
        {
          $dorm = chop( $node->nodeValue );
        }

        if( $node->nodeValue == 'Yes' )   // previous entry was inches
        {
          if( array_key_exists( $dorm, $womensDorms ) )
          {
            $womensDorms[ $dorm ] = $womensDorms[ $dorm ] + (int) $prev;
          }

          $row = $row + 1;
        }

        $prev = $node->nodeValue;
      }
    }
  }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>The Bald & The Beautiful - Notre Dame</title>
<link href="assets/styles.css" rel="stylesheet" type="text/css" />
<link href="assets/Fonts/Kabel/stylesheet-kabel.css" rel="stylesheet" type="text/css" />
<link href="assets/Fonts/Franklin/stylesheet-franklin.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", { 'packages' : ["corechart"] } );
      google.setOnLoadCallback(drawVisualizationShave);
      function drawVisualizationShave()
      {
        var data = google.visualization.arrayToDataTable([
          [ 'Mens Residence', 'Shaving Registrants', { role: 'style' } ],
          <?php
            $count = count( $mensDorms );
            $i = 0;
            foreach ( array_keys( $mensDorms ) as $key )
            {
              $disKey = str_replace( "'", "\'", $key );
              echo "[ '$disKey', {$mensDorms[$key]}, 'color: #f7da7c' ]";
            
              if( $i < $count - 1 )
              {
                echo ",\n";
              }

              $i = $i + 1;
            }
          ?>
          ]);

        new google.visualization.BarChart(document.getElementById('visualizationShave')).
        draw( data,
           {
            title:"Men's Hall Registration", viewWindowMode: 'explicit', 
              titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22'},

            legend: {position: 'none'},
            backgroundColor: { fill: "#365a36" },
            width:700, height:500,
            'chartArea': { 'left': '18%', 'top': '10%', 'width': '100%', 'height': '70%'},
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
                max: 150,
                min: 0,
              },
              titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22' },
              gridlines: {count: 10}
            },
            tooltip:
            {
              textStyle: { fontName: 'kabellight' }
            }
          }
        );
      }

    </script>

    <script type="text/javascript">
      google.load("visualization", "1", { 'packages' : ["corechart"] } );
      google.setOnLoadCallback(drawVisualizationDonation);
      function drawVisualizationDonation()
      {
        var data = google.visualization.arrayToDataTable([
          [ 'Womens Residence', 'Inches Pledged', { role: 'style' } ],
          <?php
            $count = count( $mensDorms );
            $i = 0;
            foreach ( array_keys( $womensDorms ) as $key )
            {
              $disKey = str_replace( "'", "\'", $key );
              echo "[ '$disKey', {$womensDorms[$key]}, 'color: #f7da7c' ]";
            
              if( $i < $count - 1 )
              {
                echo ",\n";
              }

              $i = $i + 1;
            }
          ?>
          ]);

        new google.visualization.BarChart(document.getElementById('visualizationDonation')).
        draw( data,
           {
            title:"Women's Residence Hall Pre-Registration", viewWindowMode: 'explicit', 
              titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22'},
            legend: {position: 'none'},
            backgroundColor: { fill: "#365a36" },
            width:700, height:500,
            'chartArea': { 'left': '18%', 'top': '10%', 'width': '100%', 'height': '70%'},
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
                max: 150,
                min: 0,
              },
              titleTextStyle: {color: 'white', fontName: 'kabellight', fontSize: '22' },
              gridlines: {count: 10}
            },
            tooltip:
            {
              textStyle: { fontName: 'kabellight' }
            }
          }
        );
      }

    </script>

</head>
  
<body>

<div class="container">
    
    <div id="logo">
        <a href="index.html"><img src="assets/logo.png" width=190px border="0" align="right"/></a>
    </div>

    <div id="title">
        <div class="title">The Bald & The Beautiful</div>
    </div>
    <div id="subtitle">
        <div class="subtitle">The Bald & The Beautiful is the largest student-run philanthropy event at Notre
        Dame. Join us in our fight to raise funds and awareness for cancer research.</div>
      <!--  </br>
        <div class="subtitle">Residence Hall Competition</div>
        </br>-->
    </div>
    <div id="menu">
        <div class="nav" align="right">
			<a href="about.html" class="nav">ABOUT</a><br/>
			<a href="sponsors.html" class="nav">SPONSORS</a><br/>
			<a href="contact.html" class="nav">CONTACT</a><br/>
                        <a href="nd_baseball.html" class="nav">ND BASEBALL</a><br/>
                        <a href="standings.php" class="nav">DORM RANKINGS</a>
<br/>

            <a href="mens_rankings.php" class="nav"><font size="4.5">MEN'S HALL<br/>RANKINGS</font></a><br/></font><font size="1"><br/></font>
            <a href="womens_rankings.php" class="nav"><font size="4.5">WOMEN'S HALL<br/>RANKINGS</a><br/><br/></font><!--<font size="1"><br/></font>-->

                        <a href="faq.html" class="nav">FAQ</a><br/> 

            <a href="register.html" class="nav_bubbles" style="background-image:URL('assets/nav_button.png');background-size:125px;background-repeat:no-repeat;"> 
</font><font size="3">&nbsp;</font>
REGISTER&nbsp;&nbsp;</a><br/>

			<a href="https://shop.nd.edu/C21688_ustores/web/store_cat.jsp?STOREID=8&CATID=537&SINGLESTORE=true" class="nav_bubbles" style="background-image:URL('assets/nav_button.png');background-size:125px;background-repeat:no-repeat;">&nbsp;DONATE&nbsp;&nbsp;</a><br/>

        </div>
    </div>
    
    <div id="content" style="overflow-y: auto; overflow-x: hidden;">


      <div id="visualizationDonation"></div>


    </div> 
    <div id="footer" style="text-align:center;">
        <br/><br/><font size="3.5">Copyright The Bald & The Beautiful 2014
        <br/>
            <a class="footer_nav" href="about.html">About</a> | 
            <a class="footer_nav" href="sponsors.html">Sponsors</a> | 
            <a class="footer_nav" href="contact.html">Contact Us</a> |
            <a class="footer_nav" href="nd_baseball.html">ND Baseball</a> |  
            <a class="footer_nav" href="standings.php">Dorm Rankings</a> |
            <a class="footer_nav" href="faq.html">FAQ</a> | 
            <a class="footer_nav" href="register.html">Register</a> | 
            <a class="footer_nav" href="https://shop.nd.edu/C21688_ustores/web/store_cat.jsp?STOREID=8&CATID=537&SINGLESTORE=true">Donate</a>
    </div>
</div>

</body>
</html>

























































































