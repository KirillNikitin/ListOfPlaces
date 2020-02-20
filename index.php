<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="css/main.css" type="text/css"></link>
        <style>
            #map {
                width: 80%;
                height: 400px;
                margin: 0 auto;
            }
        </style>
    </head>
    <body>
        <!--
            echo 'Hello, maps!' v.2;
        -->
        <?php require_once 'process.php'; ?>

        <?php 
            $mysqli = new mysqli('db4free.net:3306', 'sql7324007', 'ALJiM7jJBc', 'sql7324007') or die(mysqli_error($mysqli));
            $result = $mysqli->query("SELECT * FROM data") or die($mysqli->error);
        
            function pre_r( $array ) {
                echo '<pre>';
                print_r($array);
                echo '</pre>';
            }
        ?>

        <div id="serverResponse"></div>
        <div class="container">
            <div class="top-bar">
                <input id="titleFilter" class="title-filter" placeholder="Find in titles"/>
                <label>Show open now only: <input type="checkbox" id="openOnlyshow" /></label>
                <label>Show favorite only: <input type="checkbox" id="favoriteOnlyshow" /></label>
            </div>
            <table id="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>description</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th colspan="2">opening hours</th>
                        <th>favorite</th>
                        <th colspan="2">actions</th>
                    </tr>
                </thead>
                <tbody>
                <?php
                    while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td class="id"><?php echo $row['id'] ?></td>
                        <td class="title">
                            <div class="title-viewmode"><?php echo $row['title'] ?></div>
                            <div class="title-editmode"><input value="<?php echo $row['title'] ?>" /></div>
                        </td>
                        <td class="description">
                            <div class="description-viewmode"><?php echo $row['description'] ?></div>
                            <div class="description-editmode"><input value="<?php echo $row['description'] ?>" /></div>
                        </td>
                        <td class="latitude">
                            <div class="latitude-viewmode"><?php echo $row['latitude'] ?></div>
                            <div class="latitude-editmode"><input value="<?php echo $row['latitude'] ?>" /></div>                        
                        </td>
                        <td class="longitude">
                            <div class="longitude-viewmode"><?php echo $row['longitude'] ?></div>
                            <div class="longitude-editmode"><input value="<?php echo $row['longitude'] ?>" /></div>                    
                        </td>
                        <td class="opening-hours">
                            <div class="opening-hours-viewmode"><?php echo $row['opening_hours'] ?></div>
                            <div class="opening-hours-editmode"><input value="<?php echo $row['opening_hours'] ?>" /></div>
                        </td>
                        <td class="closing-hours">
                            <div class="closing-hours-viewmode"><?php echo $row['closing_hours'] ?></div>
                            <div class="closing-hours-editmode"><input value="<?php echo $row['closing_hours'] ?>" /></div>
                        </td>
                        <td class="favorite">
                            <div class="favorite-viewmode"><?php if($row['picked']=='1') {echo "yes"; } else { echo "no"; } ?></div>
                            <div class="favorite-editmode"><input type="checkbox" class="set-favorite" <?php if($row['picked']=='1') { echo "checked"; } ?> /></div>
                        </td>
                        <td class="actions">
                            <div class="actions-block">
                            </div>
                            <div class="actions-buttons">
                                <a class="edit-button" href="javascript:void(0)" data-id="<?php echo $row['id'] ?>">edit</a>
                                <a class="save-edit-button hidden" href="javascript:void(0)" data-id="<?php echo $row['id'] ?>">save</a>
                                <a class="delete-button" href="javascript:void(0)" data-id="<?php echo $row['id'] ?>">delete</a>
                            </div>
                        </td>
                    </tr>    
                    <?php endwhile; ?>    
                </tbody>
            </table>


            <form action="process.php" method="POST" id="mainForm" class="add-place-form">
                <label>Title</label>
                <input type="text" name="title" placeholder="Enter title" />
                <label>Description</label>
                <input type="text" name="description" placeholder="Enter description" />
                <label>Latitude</label>
                <input type="text" name="latitude" placeholder="latitude" />
                <label>Longitude</label>
                <input type="text" name="longitude" placeholder="longitude" />
                <label>Opening hours</label>
                <input type="text" name="openingHours" placeholder="opening hours" />
                <label>Closing hours</label>
                <input type="text" name="closinHours" placeholder="closing hours" />
                <button type="submit" name="save" id="mainFormSubmit">Save</button>
            </form>

            <div id="map"></div>
        </div>    
    </body>

    <script src="js/mainstuff.js" type="text/javascript"></script>
    <script>
        function initMap() {
            var location = {lat: 60.169857, lng: 24.938379}
            this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: location
            });
            this.showListOnMap(window.data)
        }
        window.showListOnMap = function(data) {
            if(window.mapMarkers && window.mapMarkers.length) {
                for(i=0; i<window.mapMarkers.length; i++){
                    window.mapMarkers[i].setMap(null);
                }
            }
            let mapMarkers = [];
            if(data && data.length) {
                let infoWindow = new google.maps.InfoWindow;
                Array.prototype.forEach.call(data, function(d){
                    let infoDiv = document.createElement('div');
                    infoDiv.textContent = d.title + ' - ' + d.description + '. Opens at: ' + d.opening_hours;
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(d.latitude, d.longitude),
                        map: this.map
                    });
                    marker.addListener('click', function(){
                        infoWindow.setContent(infoDiv);
                        infoWindow.open(this.map, marker);
                    });
                    mapMarkers.push(marker);
                });
            }            
            window.mapMarkers = mapMarkers;
        }


    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFlpa9aYQNgBdDv43LA1cwaUtrFatCrSg&callback=initMap"
  type="text/javascript"></script>
</html>