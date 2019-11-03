


var firebaseConfig = {
    apiKey: "AIzaSyD4rT2oAcEb6oA4qz8dMk0rl73zQHImTw0",
    authDomain: "tur-caqueta.firebaseapp.com",
    databaseURL: "https://tur-caqueta.firebaseio.com",
    projectId: "tur-caqueta",
    storageBucket: "",
    messagingSenderId: "799343399686",
    appId: "1:799343399686:web:9fd18ab70c4b3f54190487"
};

//-----------------------------------------//
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
firebase.auth().useDeviceLanguage();
//----------------------------------------//
var correo = document.getElementById('user');
var contrasena = document.getElementById('pass');
var pnombre = document.getElementById('primerN');
var snombre = document.getElementById('segundoN');
//---------------------------------------//



function registro() {
    if (correo.value == "" | contrasena.value == "") {
        alert("no se puede registrar")
    }
    firebase.auth().createUserWithEmailAndPassword(correo.value, contrasena.value)
        .then(function () {

            db.collection("USUARIO").add({
                usuario: correo.value,
                password: contrasena.value,
                nombre: pnombre.value,
                apellido: snombre.value

            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    console.log("MENSAJE ENVIADO");
                    alert("VERIFICA TU CORREO ELECTRONICO");
                    window.location = "index.html";
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });

            console.log("Usuario registrado");
            verificacion();
            limpiar();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode + "::" + errorMessage);
        });
}

function verificacion() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification()
        .then(function () {
            // Email sent.
            console.log("MENSAJE ENVIADO");
        }).catch(function (error) {
            // An error happened.
        });
}

function google() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}


function leerDatos() {
    db.collection("USUARIO").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().usuario}`);
        });
    });

}


function login() {
    if (correo.value == "" | contrasena.value == "") {
        alert("Digita Valores Validos");
    }
        firebase.auth().signInWithEmailAndPassword(correo.value, contrasena.value)
            .then(function () {

                console.log("Usuario validado exitosamnte...");
                window.location = "cliente.html";
                limpiar();

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode + "::" + errorMessage);
            });

    
        
    

}

function limpiar() {
    correo.value = "";
    contrasena.value = "";
    pnombre.value = " ";
    snombre.value = " ";
}

function admin() {
    window.location = "indexAdmin.html";
}

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(user);
            //btnCerrar.classList.remove('d-none');
            //btnLogin.classList.add('d-none');
            //nombre.innerHTML = `Bienvenido ` + email;

        } else {
            //btnLogin.classList.remove('d-none');
            console.log("Ningun usuario activo");
        }
    });
}

observador();



function salir() {
    firebase.auth().signOut()
        .then(function () {

            console.log("Usuario cierra sesion");
            limpiar();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function login2() {
    salir();
    window.location = "login.html";
}




function registrar() {
    window.location = "register.html";
}
function registrar2() {
    window.location = "../register.html";
}
function principal2() {
    window.location = "../index.html";
}

function principal() {
    window.location = "index.html";
}



function olvidoC() {
    window.location = "Admin/forgot-password.html";
}

function cards() {
    window.location = "Admin/cards.html";
}

function button() {
    window.location = "Admin/buttons.html";
}

function cayonning() {
    window.location = "cayoning.html";
}

function torrentismo() {
    window.location = "torrentismo.html";
}

function trekking() {
    window.location = "trekking.html";
}
