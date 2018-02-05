
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
    var mode = getInputVal('paymentMode');
    var trId = getInputVal('trId');
    saveMessage(name , email , phone, false , workshop , mode , trId , workshop);


    //Show Alert
    document.querySelector('.alert').style.display = 'block';
    var countForEth = 0;
    var countForMl = 0;
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
        window.location="/register.html";
    },4000);  
}

//Function to get Form Values
function getInputVal(id){
    return document.getElementById(id).value;
}
//Save messges to database
function saveMessage(name , email , phone, status, workshop, mode , trId , RegId){
    var newMessageRef = user.push();
    newMessageRef.set({
        name:name,
        email:email,
        phone:phone,
        status,
        workshop: workshop,
        trId:trId,
        mode:mode,
        RegId:'IT_'+RegId+'_'
    });
}
var app = angular.module("register", ["firebase"]); 
app.controller("registerController", function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("users");;
    // download the data into a local object
    $scope.data = $firebaseArray(ref);
    $scope.totalAttendees=0;
    console.log('In Controller');
    // var root = firebase.database().ref().child('users');
    // root.on('child_added', function(snapshot) {
    //   $scope.data.push(snapshot.val());
    //    console.log($scope.data)
    // })
    $scope.data.$loaded().then(function() {
        $scope.totalAttendees=$scope.data.length
        $scope.ehAttendees=0
        $scope.mlAttendees=0;
        
         // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach($scope.data, function(value, key) {
            if(value.workshop == 'ETH' && value.status){
                $scope.ehAttendees++;
                countForEth++;
            }
           
          if(value.workshop == 'ML' && value.status)
            $scope.mlAttendees++
            countForMl++;
       });
     });
});