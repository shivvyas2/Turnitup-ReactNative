import { USER_STATE_CHANGE } from "../constants";
import firebase from "firebase/compat";

export function fetchUser() {
    return (dispatch) => {
      const uid = firebase.auth().currentUser?.uid;
      if (uid) {
        firebase.firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              console.log(snapshot.data());
              dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
            } else {
              console.log("Doesn't Exist");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  }
  
