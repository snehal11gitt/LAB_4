import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export default function EventDetailsScreen({ route, navigation }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent({ id: docSnap.id, ...docSnap.data() });
      }
    };

    const checkIfFavorite = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setIsFavorite(userSnap.data().favorites.includes(eventId));
      }
    };

    fetchEvent();
    checkIfFavorite();
  }, [eventId]);

  const handleFavoriteToggle = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    if (isFavorite) {
      await updateDoc(userRef, {
        favorites: arrayRemove(eventId),
      });
    } else {
      await updateDoc(userRef, {
        favorites: arrayUnion(eventId),
      });
    }
    setIsFavorite(!isFavorite); // Toggle the favorite status
  };

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>{event.description}</Text>
      <Button title="Edit" onPress={() => navigation.navigate("EventEdit", { eventId })} />
      <Button title={isFavorite ? "Unfavorite" : "Favorite"} onPress={handleFavoriteToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
