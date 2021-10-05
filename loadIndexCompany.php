<?php
//   echo "<script>window.location.href='./carPage.html';</script>";
//   exit;
  ob_start();
  
  $db_host = 'localhost';
  $db_user = 'root';
  $db_password = 'root';
  $db_db = 'MyFavouriteCars';
  $db_port = 8889;

  $mysqli = new mysqli(
    $db_host,
    $db_user,
    $db_password,
    $db_db
  );
	
  if ($mysqli->connect_error) {
    echo 'Errno: '.$mysqli->connect_errno;
    echo '<br>';
    echo 'Error: '.$mysqli->connect_error;
    exit();
  }
  
  if(isset($_GET['companyName']))
  {
    //   $carName = json_decode($_POST['name']);
    //   $carName = $carName->name;
    //   echo $carName;
    $companyName = $_GET['companyName'];
    // echo $carName;
  }

  $query = "SELECT CompanyName, CarName from CarDetails WHERE CompanyName = '$companyName';";
  $result = $mysqli->query($query) or die(" Something wrong in: $query");

  if($result->num_rows > 0)
  {
      while($row = $result->fetch_assoc())
      {
        //   echo $row["CompanyName"]. "-/-". $row["CarName"]. "-/-". $row["EngineDisplacementCC"]. "-/-". $row["EngineTorqueNM"]. "-/-". $row['EngineHP']. "-/-". $row["EngineCylinder"]. "-/-". $row["EngineRPM"]. "-/-". $row["CarMileageKMPL"];
        echo $row["CompanyName"]. "-/-";
        echo $row["CarName"]. "-/-";
      }
  }
  else
  {
      echo '0 results';
  }

  $mysqli->close();

  exit();
?>