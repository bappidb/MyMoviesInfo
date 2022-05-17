<?php 

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>playlists Creator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="style3.css">
    <link rel="icon" type="image/x-icon" href="images/favicon.ico" />

</head>

<body>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand">MyMoviesInfo</a>
    </div>
    <ul class="nav navbar-nav navbar-right">
    <li><a href="home.php"><span class="glyphicon glyphicon-home"></span> Home </a></li>
    <li><a href="logout.php"><span class="glyphicon glyphicon-log-out"></span> Logout </a></li>
    </ul>
  </div>
</nav>
    <header>
        <div class="header-contents">
            <h1>My playlists</h1>
        </div>
    </header>
    <main>
        <div class="main-contents cards" id="playlists">
            <div id="playlists-default-display-container">
                <p class="text-grey-light fs-18 bold movie-list-default-display mb-1 text-center">Your playlists is
                    looking a little empty...</p>
                <a class="bold black fs-18" href="index.php"><img src="images/playlists-icon.svg"
                        alt="Add film to playlists" class="card-playlists-plus-icon" />
                    Let's add some movies!</a>
            </div>
        </div>
    </main>
    <script src="home.js"></script>
</body>

</html>