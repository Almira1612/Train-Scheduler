// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6qlVRGP1FfN7eMX80pRbmdDHGjo28zog",
    authDomain: "train-scheduler-d2f5f.firebaseapp.com",
    databaseURL: "https://train-scheduler-d2f5f.firebaseio.com",
    projectId: "train-scheduler-d2f5f",
    storageBucket: "train-scheduler-d2f5f.appspot.com",
    messagingSenderId: "1014644715386"
  };
  firebase.initializeApp(config);

  //Stores firebase variable
var database = firebase.database();

//Click event function for submit button

$("#submitButton").on("click",function(){

	//user inputs from form
	var name = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var firstTrainTime = $("#firstTrainTime").val().trim();
	var frequency = $("#frequency").val().trim();
   
     console.log(name, destination, firstTrainTime, frequency);
     //Makes new entry in firebase for new user inputs
	database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        //timestamp for when you hit submit
        dateAdded: firebase.database.ServerValue.TIMESTAMP 

      });
   
   


	//clears user input fields
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(
	snapshot) {

	//Appends a new row to the table with data entries from most recent entry in Firebase database 
	$("#trainTable").append(
	'<tr>' +
	    '<td>' + snapshot.val().name + '</td>' +
	    '<td>' + snapshot.val().destination +'</td>' +
	    '<td>' + snapshot.val().frequency + '</td>' +
	    '<td></td>' +
	    '<td></td>' +
	'</tr>');
  });