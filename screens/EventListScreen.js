import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function EventListScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    };

    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setFavorites(userSnap.data().favorites || []);
      }
    };

    fetchEvents();
    fetchFavorites();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
      style={styles.eventItem}
    >
      <Text style={styles.eventTitle}>
        {item.title} {favorites.includes(item.id) && "❤️"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <Button title="Add Event" onPress={() => navigation.navigate("EventEdit")} />
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Favorite Events" onPress={() => navigation.navigate("FavoriteEvents")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  list: { paddingBottom: 20 },
  eventItem: { padding: 15, marginBottom: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
  eventTitle: { fontSize: 16, fontWeight: "bold" },
});
