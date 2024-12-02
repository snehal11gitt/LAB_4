import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

export default function FavoriteEventsScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setFavorites(userSnap.data().favorites || []);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = [];
      for (let id of favorites) {
        const eventRef = doc(db, "events", id);
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          fetchedEvents.push({ id, ...eventSnap.data() });
        }
      }
      setEvents(fetchedEvents);
    };
    if (favorites.length) fetchEvents();
  }, [favorites]);

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
            style={styles.eventItem}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  eventItem: { padding: 15, backgroundColor: "#f9f9f9", borderRadius: 5 },
  eventTitle: { fontSize: 16, fontWeight: "bold" },
});
