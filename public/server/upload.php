<?php

ini_set( "file_uploads", "on" );
ini_set( "upload_tmp_dir", "../tmp" );
ini_set( "display_errors", 1 );
error_reporting( E_ALL );

$targetDir = "../campaign/";
$patientName = str_replace( " ", "", $_POST[ "cancerPatientName" ] );
$file = $_FILES[ "cancerPatientPic" ][ "name" ];

$uploadOk = 1;
$imageFileType = pathinfo( $file, PATHINFO_EXTENSION );

$targetFile = $targetDir . $patientName . "." . $imageFileType;
$targetTextFile = $targetDir . $patientName . ".txt";

// Check if image file is a actual image or fake image
if( count( $_POST ) !== 0 ) 
{
    $check = getimagesize( $_FILES["cancerPatientPic"]["tmp_name"] );
	
    if($check !== false) 
	{
        $uploadOk = 1;
    } 
	else 
	{
        $uploadOk = 0;
    }
}

if( $uploadOk === 1 )
{
	if( move_uploaded_file( $_FILES[ "cancerPatientPic" ][ "tmp_name" ], $targetFile ) )
	{
		$textStr = "Donor Name: " . $_POST[ "donorName" ] . "\nDonor Email: " . $_POST[ "donorEmail" ];
		$textStr = $textStr . "\nDonor Grad Year: " . $_POST[ "donorGradYear" ] . "\nPatient Name: " . $_POST[ "cancerPatientName" ];
		$textStr = $textStr . "\nPatient Status: " . $_POST[ "cancerPatient" ];
		
		file_put_contents( $targetTextFile, $textStr );
		
		header('Content-Type: application/json');
		echo json_encode( array( "status" => "ok" ) );
		
		header( "Location: https://shop.nd.edu/C21688_ustores/web/store_cat.jsp?STOREID=8&CATID=537&SINGLESTORE=true" );
	} 
	else 
	{
		header('Content-Type: application/json');
		echo json_encode( array( "status" => "not ok" ) );
		
		header( "Location: https://shop.nd.edu/C21688_ustores/web/store_cat.jsp?STOREID=8&CATID=537&SINGLESTORE=true" );
	}

}
	
?>