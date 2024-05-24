// src/SignUp.tsx
import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from './firebase';
import './signup.css'; // Import the CSS file

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: user.email,
      });

      setAlertMessage(`Congrats! Account created successfully. Welcome ${name}`);
      setShowAlert(true);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setAlertMessage('User already exists');
      } else {
        setAlertMessage('Sorry, can\'t sign up');
      }
      setError(error.message);
      setShowAlert(true);
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
    if (alertMessage === `Congrats! Account created successfully. Welcome ${name}`) {
      history.push('/home');
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="signup-content">
        <IonItem className="signup-input">
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={name}
            type="text"
            placeholder="Name"
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="signup-input">
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={email}
            type="email"
            placeholder="Email"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="signup-input">
          <IonLabel position="stacked"></IonLabel>
          <IonInput
            value={password}
            type="password"
            placeholder="Password"
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        {error && <p className="signup-error">{error}</p>}
        <div className="signup-button-group">
          <IonButton className="signup-button" onClick={handleSignUp}>Sign Up</IonButton>
        </div>
        <div className="signup-text">
          Already have an account? <span onClick={handleLogin}>Login</span>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={handleAlertDismiss}
          header={'Godex'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
