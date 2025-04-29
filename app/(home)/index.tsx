import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // No need to navigate - Root Layout will handle redirection
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            Welcome, {user.displayName || 'User'}
          </Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
      )}
      
      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  userInfo: {
    marginBottom: 24,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});