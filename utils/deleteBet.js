import firebase from "firebase/app";
import "firebase/firestore";
import { decrementBets } from "./decrementBets";

export const deleteBet = (betID, allUsers) => {
    try {
        firebase.firestore().collection('bets').doc(betID).delete();

        allUsers.forEach(user => {
            decrementBets(user)
        })
    } catch (err) {
        console.log(err);
    }
}