import { firestore } from '../Firebase';
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';

export async function fetchEvents() {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'events'));
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    //console.log('Loaded events:', events);
    return events;
  } catch (error) {
    console.error('Failed to load events:', error);
    throw error;
  }
}

// Function for add event
export async function addEvent(newEvent) {
    try {
      
      const eventWithStatus = {
        ...newEvent,
        status: newEvent.status || 'Applied',
      };
  
      const eventsSnapshot = await getDocs(collection(firestore, 'events'));
      const newEventID = `OrgEvent${eventsSnapshot.size + 1}`; 
  
      const docRef = doc(firestore, 'events', newEventID);
      await setDoc(docRef, eventWithStatus);
  
      //console.log('Event added with custom ID:', newEventID);
      return newEventID;
    } catch (error) {
      console.error('Failed to add event:', error);
      throw error;
    }
  }