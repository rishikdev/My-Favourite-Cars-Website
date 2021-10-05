<?php
  // header('location: index.html', true, 303);
  // exit;
  // ob_start();
  
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
  
  $query = "SELECT CompanyName, CarName from CarDetails;";
  $result = $mysqli->query($query) or die(" Something wrong in: $query");

  if($result->num_rows > 0)
  {
      while($row = $result->fetch_assoc())
      {
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