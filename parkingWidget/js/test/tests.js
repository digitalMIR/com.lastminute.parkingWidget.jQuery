QUnit.test( "connessione [webAppr/server] notification test", function( assert ) {
  ParkingWidget.init();
  assert.ok( ParkingWidget.connection, "connection["+ParkingWidget.connection+"]!" );
  if ( ParkingWidget.connection ) {
    assert.ok( ParkingWidget.connection.onmessage, "connection.onmessage["+ParkingWidget.connection.onmessage+"]!" );
    assert.ok( ParkingWidget.connection.onopen, "connection.onopen["+ParkingWidget.connection.onopen+"]!" );
    assert.ok( ParkingWidget.connection.onclose, "connection.onclose["+ParkingWidget.connection.onclose+"]!" );
    assert.ok( ParkingWidget.connection.onerror, "connection.onerror["+ParkingWidget.connection.onerror+"]!" );
  }
});
  
QUnit.test( "posto auto coperto test", function( assert ) {
  ParkingWidget.add('123',"posti auto coperti");
  assert.ok( ParkingWidget['123'], "added [" + ParkingWidget['123'] + "] posti auto coperti ( parking id 123 )!" );
});

QUnit.test( "posto auto scoperto test", function( assert ) {
  ParkingWidget.add('456',"posti auto scoperti");
  assert.ok( ParkingWidget['456'], "added [" + ParkingWidget['456'] + "] posti auto scoperti ( parking id 456 )!" );
});
