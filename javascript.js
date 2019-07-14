$(document).ready (function(){

     console.log("Hello World")

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
