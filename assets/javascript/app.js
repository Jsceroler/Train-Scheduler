// Initialize Firebase
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyD7BtaGTAprJp0rRvqAj7c5cj8PfM9bC2E",
  authDomain: "train-schedule-b167b.firebaseapp.com",
  databaseURL: "https://train-schedule-b167b.firebaseio.com",
  projectId: "train-schedule-b167b",
  storageBucket: "train-schedule-b167b.appspot.com",
  messagingSenderId: "463211564610",
  appId: "1:463211564610:web:43d3cb2fc66b2dc2cc67db"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database=firebase.database();




  var trainsName = "";

  var destination = "";

  var freqMin = "";

  var firstTrain = "";

  var minsAway = "";

 
  $("#submit-button").on("click", function (e) {
//Prevent repeats
    e.preventDefault();

    //the value of user input for trainName is = to the var ser up above same for destination freq and NA
     trainsName = $("#trainNameInput").val();
      destination = $("#destinationInput").val();
      freqMin = $("#freqInput").val();
      firstTrain = $("#firstTrainInput").val();

    //push it all to the database
     database.ref().push({
          trainsName: trainsName,
          destination: destination,
          freqMin: freqMin,
          firstTrain: firstTrain
     });
     $("#trainNameInput").val("");
     $("#destinationInput").val("");
     $("#freqInput").val("");
     $("#firstTrainInput").val("");
  });





  database.ref().on("child_added", function(data){
      //make sure it works
      console.log(data.val());

      var tFrequency = data.val().freqMin
      var tFirstTrain = data.val().firstTrain

      //split our hours and minutes apart from eachother and store into new array
      var timeArr = tFirstTrain.split(":");

      var tMinutes, tArrival;
      var firstTimeConverted = moment(tFirstTrain, "hh:mm").subtract(1, "years");
 
      var currentTime = moment();



      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      var tRemainder = diffTime % tFrequency;

      var tMinutesTillTrain = tFrequency - tRemainder;
   
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
      $("#TrainNames").append(data.val().trainsName + "<hr>")

   
      $("#destination").append(data.val().destination + "<hr>")
      $("#frequency").append(data.val().freqMin + "<hr>")

      //get the val of nextArrival and append it to the NextArrival
      $("#firstTrain").append(data.val().firstTrain + "<hr>")

      //get the val of minsaway and append it to The minsAway
      $("#minsAway").append(tMinutesTillTrain + "<hr>")
      //
      $("#arivalTime").append(moment(nextTrain).format("hh:mm") + "<hr>")
  });