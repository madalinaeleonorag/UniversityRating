import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  getPosition(): Promise<any> {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          console.log(err)
          reject(err);
        }, options);
    });
  }
  
}
