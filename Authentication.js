import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  console.log("User is logged in:", user.email);
} else {
  console.log("No user is logged in");
}
