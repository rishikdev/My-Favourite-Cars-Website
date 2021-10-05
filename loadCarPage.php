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
  
  if(isset($_POST['name']))
  {
    //   $carName = json_decode($_POST['name']);
    //   $carName = $carName->name;
    //   echo $carName;
    $carName = $_POST['name'];
    // echo $carName;
  }
  
  $query = "SELECT * from CarDetails WHERE CarName = $carName;";
  $result = $mysqli->query($query) or die(" Something wrong in: $query");

  if($result->num_rows > 0)
  {
      while($row = $result->fetch_assoc())
      {
        //   echo $row["CompanyName"]. "-/-". $row["CarName"]. "-/-". $row["EngineDisplacementCC"]. "-/-". $row["EngineTorqueNM"]. "-/-". $row['EngineHP']. "-/-". $row["EngineCylinder"]. "-/-". $row["EngineRPM"]. "-/-". $row["CarMileageKMPL"];
        echo $row["CompanyName"]. "-/-";
        echo $row["CarName"]. "-/-";
        echo $row["EngineDisplacementCC"]. "-/-";
        echo $row["EngineTorqueNM"]. "-/-";
        echo $row['EngineHP']. "-/-";
        echo $row["EngineCylinder"]. "-/-";
        echo $row["EngineRPM"]. "-/-";
        echo $row["CarMileageKMPL"]. "-/-";
        echo $row["CarDescription"];
      }
  }
  else
  {
      echo '0 results';
  }

  $mysqli->close();

  exit();
?>