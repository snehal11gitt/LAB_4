import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function EventEditScreen({ route, navigation }) {
  const { eventId } = route.params || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { title, description } = docSnap.data();
          setTitle(title);
          setDescription(description);
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  const handleSave = async () => {
    if (!title || !description) {
      setError("All fields are required.");
      return;
    }
    try {
      const docRef = eventId ? doc(db, "events", eventId) : doc(collection(db, "events"));
      await setDoc(docRef, { title, description });
      navigation.navigate("Events");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
});
