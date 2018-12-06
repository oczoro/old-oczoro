var database = firebase.database();

function pushToDB(email) {
    var emailObject = {
        email: email
    };
    database.ref("emails").push().set(emailObject);
}

function getFromDB(reference) {
    var ref = database.ref(reference).once('value').then(function(snapshot) {
        console.log(snapshot.val().email);
    });
}

getFromDB("emails");