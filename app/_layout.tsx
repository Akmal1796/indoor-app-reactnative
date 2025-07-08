import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from '../components/Header';
import CustomHeader from '../components/CustomHeader';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1DBF73" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="dashboard"
          options={{
            header: () => <Header title="IndoorBooking.com" showBack={true} />,
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            header: () => <CustomHeader title="Notifications" showBack={true} />,
          }}
        />
        <Stack.Screen
          name="messages"
          options={{
            header: () => <CustomHeader title="Messages" showBack={true} />,
          }}
        />
        
        <Stack.Screen
          name="profile"
          options={{
            header: () => <CustomHeader title="Profile" showBack={true} />,
          }}
        />
        <Stack.Screen
          name="feed"
          options={{
            header: () => <CustomHeader title="Feed" showBack={true} />,
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            header: () => <CustomHeader title="Search" showBack={false} />,
          }}
        />
        <Stack.Screen
          name="booking-history"
          options={{
            header: () => <CustomHeader title="booking-history" showBack={true} />,
          }}
        />
        <Stack.Screen
          name="team"
          options={{
            header: () => <CustomHeader title="Team" showBack={true} />,
          }}
        />
        <Stack.Screen
          name="profile/edit"
          options={{
            header: () => <CustomHeader title="Edit Profile" showBack={true} />,
          }}
        />
      </Stack>
    </>
  );
}
