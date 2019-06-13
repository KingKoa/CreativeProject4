const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();


// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('scores');

app.post('/api/scores', async (req, res) => {
    try {
        let querySnapshot = await itemsRef.get();
        let numRecords = querySnapshot.docs.length;
        let item = {
            id: req.body.id,
            name: req.body.name,
            time: req.body.time
        };
        itemsRef.doc(item.id.toString()).set(item);
        res.send(item);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

app.get('/api/scores', async (req, res) => {
  try{
      let numRecords = querySnapshot.docs.length;
      let querySnapshot = await itemsRef.get();
      res.send(querySnapshot.docs.map(doc => doc.data()));
      return numRecords;
  }catch(err){
      res.sendStatus(500);
  }
});

exports.app = functions.https.onRequest(app);

