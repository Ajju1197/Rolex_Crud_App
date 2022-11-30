export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  file: File;
  address: {
    street: string;
    state: string;
    city: string;
    zipcode: any;
  };
  phone: any;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

export interface IComments {

}


export interface IAlbums {
  id: number;
  type: string;
  img: any;
  title: any;
  item: string;
  price: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
