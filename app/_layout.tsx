import { ThemeProvider } from '@/context/theme_context';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
