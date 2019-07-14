<<<<<<< HEAD
$(document).ready (function(){
     var firebaseConfig = {
          apiKey: "AIzaSyCgvwUQ2Eb8KJ2hlTGb5CT07hEqkn4C1Qs",
          authDomain: "next-train-2c629.firebaseapp.com",
          databaseURL: "https://next-train-2c629.firebaseio.com",
          projectId: "next-train-2c629",
          storageBucket: "next-train-2c629.appspot.com",
          messagingSenderId: "446595575154",
          appId: "1:446595575154:web:cc1e68a9702eecbe"
        };
     // app's Firebase configuration
  
     firebase.initializeApp(firebaseConfig);
     
     var database = firebase.database();
   
     $("#add-train").on("click", function(event) {
     event.preventDefault();

          var trainName = $('#name-input').val().trim();
     	var destination = $('#destination-input').val().trim();
     	var firstTrainTime = $('#first-train-time-input').val().trim();
          var frequency = $('#frequency-input').val().trim();
          
          // var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          // var currentTime = moment();
          // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          // var tRemainder = diffTime % frequency;
     
     	var newTrain = {
               name: trainName,
     		destination: destination,
     		trainTime: firstTrainTime,  
     		frequency: frequency,
               
          };
          
          // Code for the push
          database.ref().push(newTrain);

          // clears all of the text-boxes
          $('#name-input').val("");
     	$('#destination-input').val("");
     	$('#first-train-time-input').val("");
     	$('#frequency-input').val("");   
     });
          
     database.ref().on("child_added", function(childSnapshot) {
     // full list of items to the table
     
     var trainNames = childSnapshot.val().name;
     var destinations = childSnapshot.val().destination;
     var firstTrainTimes = childSnapshot.val().trainTime;
     var frequencies = childSnapshot.val().frequency;
   
    var currentTime =moment();

     var newRow = $("<tr>").append(
          $("<td>").text(trainNames),
          $("<td>").text(destinations),
          $("<td>").text(firstTrainTimes),
          $("<td>").text(frequencies)
      
);

// Append the new row to the table
 $("#train-table > tbody").append(newRow);
});

});
=======
var url ="https://NextStopTrain.firebaseio.com/";
var dataRef = new Firebase(url);
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';


$(document).ready(function() {

     $("#add-train").on("click", function() {
     	// YOUR TASK!!!
     	// Code in the logic for storing and retrieving the most recent user.
     	// Dont forget to provide initial data to your Firebase database.
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for the push
     	keyHolder = dataRef.push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  // 2:22 in my example
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});
          // The notes below are for finding the path to the key in the data being pushed, leaving as notes to save for later use.
          /*console.log(keyHolder.path.u[0]);
          var key = keyHolder.path.u[0];
          console.log(key);*/
     	// Don't refresh the page!

          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
          //id=" + "'" + keyHolder.path.u[0] + "'" + "
     dataRef.on("child_added", function(childSnapshot) {
	// full list of items to the well

		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + // Next Arrival Formula ()
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + // Minutes Away Formula
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");
// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});

}); // Closes jQuery wrapper
>>>>>>> 0823eddfbe11b58b90f5fb61a1c7067f3309bd19
