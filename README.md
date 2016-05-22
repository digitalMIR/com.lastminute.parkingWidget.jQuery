# com.lastminute.parkingWidget.jQuery
lastminute.com parking widget

A parking widget for LastMinute web app.

All the pargingWidget files are stored in the parkingWidget directory ( as a plugin ).

In the index page add:

  <div id="parking-widget">
    <!-- option 1: if jQuery is not loaded -->
    <script>window.jQuery || document.write('<script src="parkingWidget/js/vendor/jquery-1.12.0.min.js"><\/script>')</script>
    <!-- option 2: if Mustache is not loaded -->
    <script>window.Mustache || document.write('<script src="parkingWidget/js/vendor/mustache-2.2.1.min.js"><\/script>')</script>
    <!-- mandatory init script -->
    <script src="parkingWidget/js/init.js"></script>
  </div>

The parkingWidget plugin lists his dependencies as options if the web app not contains reference.
