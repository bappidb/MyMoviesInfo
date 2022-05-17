<?php 

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Search Movies </title>
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
    <li><a href="playlists.php"><span class="glyphicon glyphicon-user"></span> My Playlists </a></li>
    <li><a href="logout.php"><span class="glyphicon glyphicon-log-out"></span> Logout </a></li>
 
    </ul>
  </div>
</nav>
    <header>
    <?php echo "<h1>Welcome " . $_SESSION['username'] . "</h1>"; ?>
    </header>
    <main>
        <div class="main-search-field">
            <label aria-label="Search for a movie" class="hide">Search for a
                movie</label>
            <input type="text" for="submit" id="searchInput" placeholder="Search for a movie">
            <button type="submit" value="Submit" id="searchBtn">Search</button>
        </div>

        <div class="main-contents" id="moviesList">
            <div id="movielist-default-container">
                <img src="images/movie-icon.svg" alt="Search movie list to start exploring movies."
                    class="movie-icon movie-list-default-display">
                <p class="text-grey-light fs-18 bold movie-list-default-display">Start exploring</p>
            </div>
        </div>
    </main>
    <script src="home.js"></script>
</body>

</html>