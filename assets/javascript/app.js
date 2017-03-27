// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCVGZs3iv3ukV9hytaHci8YzrVoysVhmZw",
    authDomain: "traintimer-8614b.firebaseapp.com",
    databaseURL: "https://traintimer-8614b.firebaseio.com",
    storageBucket: "traintimer-8614b.appspot.com",
    messagingSenderId: "743963310644"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  //var firstTrain = moment($("#first-train-input").val().trim(), "hh:mm");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    trainFrequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.trainFrequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination= childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().trainFrequency;
  var minutes = childSnapshot.val().minutes;
  var nextTrain = childSnapshot.val().nextTrain


  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(minutes);
  console.log(nextTrain);


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency+ "</td><td>" +
  nextTrain+ "</td><td>" + tMinutesTillTrain + "</td><tr>");
});



