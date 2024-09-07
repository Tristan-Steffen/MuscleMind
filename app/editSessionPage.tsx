import { Button, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { SessionEditor } from "@/components/workoutEditor/SessionEditor";
import { Session } from "@/Interfaces/sessionInterfaces";

interface EditSessionProps {
  key: string;
  session: Session;
}

export default function EditSessionPage({ key, session }: EditSessionProps) {
  const onSave = () => {
    // TODO: Implement save logic here
    console.log("Save button clicked");
  };

  console.log("ModalScreen session", session);
  return (
    <View style={styles.container}>
      <SessionEditor session={session} onSave={onSave} />
      <Button title="Save" onPress={onSave} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
