import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, update, remove, push, child } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService { 
 db: any;

    constructor() {
      this.setupFirebase();  
      this.db = getDatabase();    
      }
      setupFirebase(){
        const firebaseConfig = {
          apiKey: "AIzaSyA3PHiWWIXlEhSrb7ZbzpiOW7eoimFR_ZE",
          authDomain: "droneproject-7943e.firebaseapp.com",
          databaseURL: "https://droneproject-7943e-default-rtdb.firebaseio.com",
          projectId: "droneproject-7943e",
          storageBucket: "droneproject-7943e.appspot.com",
          messagingSenderId: "68675010149",
          appId: "1:68675010149:web:0cb9817f8f6277e7d3908c"
        };
        
        initializeApp(firebaseConfig);
      }
      createObject(path: string, data: any): Promise<void> {
        const newRef = push(ref(this.db, path));
        return set(newRef, data);
      }
      readObject(path: string, key: string): Promise<string>{
        return get(child(ref(this.db), `${path}/${key}`)).then((snapshot) => {
          if (snapshot.exists()) return snapshot.val();
          else return "";
        })      
       }
      updateObject(path: string, key: string, data: any) {
        update(ref(this.db, `${path}/${key}`), data);
      }
      deleteObject(path: string, key: string){
        remove(ref(this.db, `${path}/${key}`));
      }

      async readList(path: string): Promise<any[]> {
        const snapshot = await get(ref(this.db, path));
        const list: any[] = [];
        snapshot.forEach(childSnapshot => {
          list.push(childSnapshot.val());
        });
        return list;
      }
    
      addToList(path: string, data: any){
        set(push(ref(this.db, path)), data);
      }
    
      removeFromList(path: string, key: string){
        remove(ref(this.db, `${path}/${key}`));
      }

     /*getDataContinuosly(field: string): Observable<string>{
      return new Observable((observer) => {
        onValue(ref(this.db, field), (data) => {
          if(data.valueOf()!= null)
            observer.next(data.val());
        });
      });
     }*/
     
     reset(){
        remove(ref(this.db, '/'));
     }

}