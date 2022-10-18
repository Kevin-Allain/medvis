export interface Patient {
    _id: string,
    index: number,
    guid: string,
    isActive: boolean,
    balance: string,
    age: number,
    eyeColor: string,
    name: string,
    gender: string,
    company: string,
    email: string,
    phone: string,
    address: string,
    registered: string,
    latitude: number,
    longitude: number,
    tags: [ string ],
    friends: [
      {
        id: number,
        name: string
      }
    ],
    height: number,
    medTestA: [
      {
        score: number,
        record: string
      }
    ],
    medTestB: [
      {
        score: number,
        record: string
      }
    ],
    medTestC: [
      {
        score: number,
        record: string
      }
    ],
    medTestD: [
      {
        score: number,
        record: string
      }
    ],
    greeting: string,
    favoriteFruit: string
  }

