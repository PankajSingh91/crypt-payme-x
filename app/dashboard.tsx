import { useRouter } from "expo-router";
import { Wallet } from "lucide-react-native"; // mobile-friendly lucide icons
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      // Navigate somewhere after connect
      router.push("/security");
    }, 2000); // mock delay
  };

  return (
    <View style={styles.container}>
      <Wallet color="#00D4FF" size={50} />
      <Text style={styles.title}>Connect Your Wallet</Text>
      <Text style={styles.subtitle}>
        Connect MetaMask to access your crypto wallet and transactions
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text style={styles.buttonText}>Connect Wallet</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#00D4FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
