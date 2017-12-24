var newList = [];

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD__0sfP-c4tCStFArKsl3MyR2Y8WjRFP8",
    authDomain: "fantasy-crypto.firebaseapp.com",
    databaseURL: "https://fantasy-crypto.firebaseio.com",
    projectId: "fantasy-crypto",
    storageBucket: "fantasy-crypto.appspot.com",
    messagingSenderId: "1066538764682"
  };
firebase.initializeApp(config);

// New Firebase
var resourceDB = firebase.database().ref('resource-tip');
var resourceRef = resourceDB.limitToLast(10000000);//limit to last

// Form as a JSON
$(document).ready(function() {
  
  
  
   // Check for change & list Items
resourceRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // Get the Key & Child Data
    var key = childSnapshot.key;
    var tipsArray = childSnapshot.val();
      
      for (var prop in tipsArray){
        var str = '';
        var tipTime = moment.utc(tipsArray.tiptime).local().startOf('hour').fromNow();
        
            str += '<div class="ui card"> <div class="content">' +
    '<a style="text-decoration: none;" href=' + tipsArray.url + '>' +
    '<div class="header" style="font-weight: bold; font-size: 1.28571429em; margin-top: -0.21425em; line-height: 1.28571429em; color: rgba(0, 0, 0, 0.85) !important" >' +
      tipsArray.category + '</div> <div class="meta"> <p>' + tipsArray.tip + '</p></div></a></div></div>';        
      }
 
      // Create the list in HTML
      $('.resourceTipsList').append(str);
    });
  });

  
  // Add a New Item
  $("#resourceformTip").submit(function(event) {
      event.preventDefault();
    
    // Get the form data
    resourceDB.push({
      'category': $('select#category').val(),
      'tip': $('textarea#tip').val(),
      'url' : $('textarea#url').val(),
      'tiptime': Date.now()
    });

    console.log("sent");
    resourceformTip.reset();

  });
});





//    trying to do sorting by A-Z
//     writer choice, number of likes 
//    ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
//  console.log(snapshot.key);
//});
//});