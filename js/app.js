
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
    
    saveMessage(name , email , phone, false);

    //Show Alert
    document.querySelector('.alert').style.display = 'block';

    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
        window.location="/";
    },3000);  
}

function getValues() {
    var root = firebase.database().ref().child('users');
    root.on('child_added', function(snapshot) {
      console.log(snapshot.val());
    })
}
//Function to get Form Values
function getInputVal(id){
    return document.getElementById(id).value;
}


//Save messges to database
function saveMessage(name , email , phone, status){
    var newMessageRef = user.push();
    newMessageRef.set({
        name:name,
        email:email,
        phone:phone,
        status
    });
   
}