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
	//var startDate = moment($("#startDate").val().trim(), "DD/MM/YY").format('L');
	var firstTrainTime = moment($("#firstTrainTime").val().trim());
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

database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
    var tfrequency = childSnapshot.val().frequency;
    var convertedDate = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, 'years');
    var trainTime = moment(convertedDate).format('HH:mm');
    var destination = childSnapshot.val().destination;
    var currentTime = moment().format("HH:mm");
    var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
	
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);

     var tRemainder = diffTime % tfrequency;
     console.log(tRemainder);

     var tMinutesTillTrain = tfrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('HH:mm');
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	//Appends a new row to the table with data entries from most recent entry in Firebase database 
	$("#trainTable").append(
	'<tr>' +
	    '<td>' + childSnapshot.val().name + '</td>' +
	    '<td>' + childSnapshot.val().destination +'</td>' +
	    '<td>' + childSnapshot.val().frequency + '</td>' +
	    '<td>' + nextTrain + '</td>' +
	    '<td>' + tMinutesTillTrain + '</td>' +
	'</tr>')},function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
  })

  

 //setInterval(function(){
   // location.reload();
  //}, 60000)