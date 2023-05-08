import firebase from 'firebase-admin'

import * as data from './youcoder-bcn-firebase-adminsdk-r3mu0-9fcf001614.json'

firebase.initializeApp({
  credential: firebase.credential.cert(data as firebase.ServiceAccount)
});

export default firebase