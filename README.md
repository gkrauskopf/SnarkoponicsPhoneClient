# SnarkoponicsPhoneClient
Javascript code to interface with an Arduino Uno monitoring an Aquaponics system.  The Arduino reads multiple sensors and responds
to an http get request with a JSON response.  The JS app displays a table with all components of the JSON response and then a chart
displays a realtime trend with one of the values (the chosen value is hardcoded from the available keywords).
