$.noConflict();
jQuery( document ).ready(function( $ ) {
  var wn = "parkingWidget";

  try{
    console.log(wn + "[INIT]");

    //var data = {
    //  departureAirport: "Bergamo Orio al Serio"
    //}

    $.getJSON( wn+"/model/model.json")
    .done( function( data ) {
      $("#parking-widget-header").load(wn+"/template.html #parking-widget-container", function(){
        var template = document.getElementById('parking-widget-container').innerHTML;
        var output = Mustache.to_html(template, data );
        $("#parking-widget").html(output);
      });
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( wn+"[Request Failed:[" + err + "]]");
    });

    console.log(wn + "[END]");

  } catch( error ) {
    if ( error instanceof TypeError ) {
      console.log(wn+"[TypeError:[" + error + "]]");
    } else if ( error instanceof ReferenceError ) {
      console.log(wn+"[ReferenceError:[" + error + "]]");
    } else {
      console.log(wn+"[error:[" + error + "]]");
    }
  }
});
