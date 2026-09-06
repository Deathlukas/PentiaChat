import {GoogleSignin,isSuccessResponse,} from '@react-native-google-signin/google-signin';
import {getAuth,signInWithCredential,GoogleAuthProvider,} from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { FacebookAuthProvider } from '@react-native-firebase/auth';
import { signOut as firebaseSignOut } from '@react-native-firebase/auth';


  export async function signOut(): Promise<void> { // Logger brugeren ud fra både Google, Facebook og Firebase. Hvis Google logout fejler, ignoreres fejlen.
    try {
      await GoogleSignin.signOut();
    } catch {

    } 
    LoginManager.logOut();
    await firebaseSignOut(getAuth());
  }
  
  export async function signInWithGoogle(): Promise<void> { // Logger brugeren ind med Google.
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
  
    if (!isSuccessResponse(response)) {
      return;
    }
  
    const { idToken } = response.data;
    if (!idToken) {
      throw new Error('Google returnerede ikke et idToken');
    }
  
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(getAuth(), credential);
  }

  export async function signInWithFacebook(): Promise<void> { // Logger brugeren ind med Facebook.
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      return;
    }
  
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Kunne ikke hente Facebook access token');
    }
  
    const credential = FacebookAuthProvider.credential(data.accessToken);
    await signInWithCredential(getAuth(), credential);
  }