
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBsSu78Z2xWy2neUIH0eD77KA0px7i1iBM",
    authDomain: "ityukta-2k18.firebaseapp.com",
    databaseURL: "https://ityukta-2k18.firebaseio.com",
    projectId: "ityukta-2k18",
    storageBucket: "",
    messagingSenderId: "902683637359"
  };
  firebase.initializeApp(config);
  //reference messages collection
  var user = firebase.database().ref('users');


  //Listen for Form Details
document.getElementById('registerFormItyukta').addEventListener('submit' , submitForm);
//Submit Form
function submitForm(e){
    e.preventDefault();
    // get values
    var name = getInputVal('name');
    var phone = getInputVal('phoneNo');
    var email = getInputVal('email');
    var workshop = getInputVal('workshop');
    
    saveMessage(name , email , phone, false , workshop);

    //Show Alert
    document.querySelector('.alert').style.display = 'block';

    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
        window.location="/";
    },3000);  
}

//Function to get Form Values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save messges to database

function saveMessage(name , email , phone, status, workshop){
    var newMessageRef = user.push();
    newMessageRef.set({
        name:name,
        email:email,
        phone:phone,
        status,
        workshop: workshop
    });
}
var app = angular.module("register", ["firebase"]); 
app.controller("registerController", function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("users");;
    // download the data into a local object
    $scope.data = $firebaseArray(ref);
    $scope.totalAttendees=0;
    // var root = firebase.database().ref().child('users');
    // root.on('child_added', function(snapshot) {
    //   $scope.data.push(snapshot.val());
    //    console.log($scope.data)
    // })
    $scope.data.$loaded().then(function() {
        $scope.totalAttendees=$scope.data.length
        $scope.ehAttendees=0
        $scope.ibmAttendees=0;
         // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach($scope.data, function(value, key) {
            if(value.workshop == 'ETH' && value.status)
            $scope.ehAttendees++
          if(value.workshop == 'IBM' && value.status)
            $scope.ibmAttendees++
       });
     });
});