// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBX9AeMZL6IwRB00hP-mRWN22p6B3lYhy0",
  authDomain: "videoapp-371204.firebaseapp.com",
  projectId: "videoapp-371204",
  storageBucket: "videoapp-371204.appspot.com",
  messagingSenderId: "25143733431",
  appId: "1:25143733431:web:b692b2ab36886b2ec5b132",
  measurementId: "G-M10HNC2GT4",
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let provider = new firebase.auth.GoogleAuthProvider();
var globaluser = null;

async function GoogleLogin() {
  console.log("Login Btn Call");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (res) => {
      if (res.additionalUserInfo.isNewUser) {
        const { user } = res;

        const data = await fetch(`${window.location.origin}/createuser`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const response = await data.json();
        console.log("user:", response);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function joinMeet() {
  let meetingID = document.getElementById("meeting-id").value;
  // let meetingID = prompt("Enter meeting ID");
  if (meetingID.trim() !== "") {
    document.location.href = `/chat/${meetingID}`;
  }
}

function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      globaluser = user;
    }
  });
}

function getUser() {
  const user = firebase.auth().currentUser;
  return user;
}

function LogoutUser() {
  console.log("Logout Btn Call");
  firebase
    .auth()
    .signOut()
    .then(() => {
      document.getElementById("LoginScreen").style.display = "block";
      document.getElementById("dashboard").style.display = "none";
    })
    .catch((e) => {
      console.log(e);
    });
}
checkAuthState();

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      return true;
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function addRoomsToUser() {
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      try {
        await fetch(`${location.origin}/room/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            roomId: ROOM_ID,
          }),
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
}
