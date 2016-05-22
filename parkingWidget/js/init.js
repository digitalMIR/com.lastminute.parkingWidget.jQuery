$.noConflict();

  var parkingWidgetName = "parkingWidget";
  var ParkingWidget = {
    id: '#parking-widget',
    model: parkingWidgetName+'/model/model.json',
    template: parkingWidgetName+'/template.html',
    template_id: '#tpl-parking-widget',
    style: parkingWidgetName+'/css/style.css',
    ll_TRACE: { name: 'TRACE', value: 0},
    ll_DEBUG: { name: 'DEBUG', value: 1},
    ll_INFO: { name: 'INFO', value: 2},
    ll_WARNIG: { name: 'WARNING', value: 3},
    ll_ERROR: { name: 'ERROR', value: 4},
    logLevel: { name: 'INFO', value: 2},
    setLogLevel: function ( lev ) {
      this.logLevel = lev;
    },
    log: function ( level, msg ) {
      if ( level.value >= this.logLevel.value ) {
        console.log( parkingWidgetName + " " + level.name + " [" + msg + "]"); 
      }    
    },
    init: function(){
      var parkingWidget = this;
      parkingWidget.connection = new WebSocket('wss://echo.websocket.org');

      parkingWidget.connection.onmessage = function(event){
        parkingWidget.log( parkingWidget.ll_INFO, "socket onmessage["+event.data+"]");
      } 

      parkingWidget.connection.onopen = function(event){
        parkingWidget.log( parkingWidget.ll_INFO, "socket onopen["+event.data+"]");
      } 

      parkingWidget.connection.onclose = function(){
        parkingWidget.log( parkingWidget.ll_INFO, "socket onclose");
      } 

      parkingWidget.connection.onerror = function(event){
        parkingWidget.log( parkingWidget.ll_INFO, "socket onerror[" + event.data + "]");
      }

    },
    render: function() {

      var parkingWidget = this;
      parkingWidget.log( parkingWidget.ll_INFO, "[render start]");

      $.getJSON( parkingWidget.model )
      .done( function( data ) {
        parkingWidget.data = data;
        $.get( parkingWidget.template, function(templates) {
        
          parkingWidget.log( parkingWidget.ll_DEBUG, templates);

          $('head').append('<link rel="stylesheet" type="text/css" href="'+parkingWidget.style+'">');
          parkingWidget.log( parkingWidget.ll_INFO, "css loaded");

          var template = $(templates).filter( parkingWidget.template_id ).html();
          parkingWidget.log( parkingWidget.ll_DEBUG, template);
          parkingWidget.log( parkingWidget.ll_INFO, "template loaded");

          $( parkingWidget.id ).append( Mustache.render(template, parkingWidget.data) );
          parkingWidget.log( parkingWidget.ll_INFO, "template rendered");

          $('#parking-widget-features-title').click(function(){
            //$("#parking-widget-features-body").slideToggle("slow");
            $("#parking-widget-features-body").toggle();
          });

        }, "html");

      })
      .fail(function( jqxhr, textStatus, error ) {

        var err = textStatus + ", " + error;
        parkingWidget.log( parkingWidget.ll_WARNING, "[Request from Server Failed:[" + err + "]]");

      });

      parkingWidget.log( ParkingWidget.ll_INFO, "[render exit]");
    },
    add: function( id, title ) {
      var parkingWidget = this;
      parkingWidget.log( ParkingWidget.ll_TRACE, "[add called]");
      parkingWidget[id] = parkingWidget[id]+1 || 1;
      alert("un " + title + " è stato aggiunto al carrello.\n"+
	"Il carrello ne contiene " + parkingWidget[id] + "." );
      parkingWidget.notify( id, title );
    },
    notify: function( id ) {
      var parkingWidget = this;
      parkingWidget.log( ParkingWidget.ll_INFO, "[notify called]");
      parkingWidget.connection.send(id);

    }
  };

jQuery( document ).ready(function( $ ) {

  try{

    ParkingWidget.init();
    ParkingWidget.render();

  } catch( error ) {
    if ( error instanceof TypeError ) {
      console.log( parkingWidgetName + "[TypeError:[" + error + "]]");
    } else if ( error instanceof ReferenceError ) {
      console.log( parkingWidgetName + "[ReferenceError:[" + error + "]]");
    } else {
      console.log( parkingWidgetName + "[error:[" + error + "]]");
    }
  }

});
