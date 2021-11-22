// import {Alert} from "react-native";
// import {db, auth} from '../utils/firebase-config'

// export async function registration(email, password) {
//     try {
//         await auth.createUserWithEmailAndPassword(email, password)
//         .then(userCredentials=> {
//             const user = userCredentials.user;
//             console.log(user.email)
//         })

//         // const currentUser = auth.currentUser;
//         // db.collection('users')
//         // .doc(currentUser.uid)
//         // .set({
//         //     email: currentUser.email
//         // })
//     } catch (error) {
//         Alert.alert(error)
//     }
// }