declare module 'geodist' {
    interface Coordinates {
      lat: number;
      lon: number;
    }
  
    function geodist(coord1: Coordinates, coord2: Coordinates): number;
  
    export = geodist;
  }
  