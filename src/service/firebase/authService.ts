import {
    GoogleSignin,
    isSuccessResponse,
  } from '@react-native-google-signin/google-signin';
  import {
    getAuth,
    signInWithCredential,
    GoogleAuthProvider,
  } from '@react-native-firebase/auth';
  
  export async function signInWithGoogle(): Promise<void> {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
  
    if (!isSuccessResponse(response)) {
      // Brugeren annullerede selv - ikke en fejl
      return;
    }
  
    const { idToken } = response.data;
    if (!idToken) {
      throw new Error('Google returnerede ikke et idToken');
    }
  
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(getAuth(), credential);
  }