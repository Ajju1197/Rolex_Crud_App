export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: any;
    geo: {
      lat: any;
      lng: any;
    }
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
