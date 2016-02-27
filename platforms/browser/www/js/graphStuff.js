$(document).ready(function(){   
   var t = 10000;  //interval to update data
   var x = (new Date()).getTime(); // current time
   var n = 150;  //number of values to plot 
   data = [];
   for(i=0; i<n; i++){  
      data.push([x - (n-1-i)*t]);  
   }   
   var options = {
      title: 'UV Sensor',
      axes: {           
         xaxis: {
//            numberTicks: 6,            
            tickInterval: 300, //every 5 minutes
            renderer:$.jqplot.DateAxisRenderer,           
            tickOptions:{formatString:'%H:%M:%S'},            
            min : data[0][0],           
            max: data[data.length-1][0]        
         },         
         yaxis: {
            min:0, 
            max: 200,
            numberTicks: 6,             
            tickOptions:{formatString:'%.1f'}       
         }      
      },      
      seriesDefaults: {         
         rendererOptions: { smooth: true}      
      }  
   };  
 
   var plot1 = $.jqplot ('chart1', [data],options); 
 
setInterval(doUpdate,t);
   var actualTemp1;
   function doUpdate() {
   var jqxhr = $.ajax({
      url: 'http://localhost:3000',
      dataType: 'json'})
      .done(function(data1) { 
         actualTemp1 = data1.UVSensor;
         //build table with JSON keywords and values
         var listItems = '';
         //Grab the keys in the data object
         var myKeys = Object.keys(data1);
         //Loop through the keys to access the value pairing.
         myKeys.forEach(function(key) {
            listItems += '<li><label>' + key + '</label><span>' + data1[key] + '</span>';
            });
         var myList = document.getElementById('keyValueList');
         myList.innerHTML = listItems;          
         //end of table build
         console.log("---------- Got new data ----------");
         console.log(data1);
         console.log("Temp1:\t" + actualTemp1);
               console.log("...done!");
               console.log("");
            })
                     // if error print it on JS console
            .fail(function() { console.log( "Unable to get new data :("); });

         if(data.length > n-1){
            data.shift();
         }
         var y = actualTemp1;
         var x = (new Date()).getTime();
         data.push([x,y]);
         if (plot1) {
           plot1.destroy();
         }
         plot1.series[0].data = data; 
         options.axes.xaxis.min = data[0][0];
         options.axes.xaxis.max = data[data.length-1][0];
         plot1 = $.jqplot ('chart1', [data],options);
         //      setTimeout(doUpdate, t);
   }
});