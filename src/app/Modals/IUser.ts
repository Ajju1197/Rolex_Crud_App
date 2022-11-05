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
  // id: number;
  // slug: string;
  // type: string;
  // title: string;
  // post_content: string;
  // featured_img_src: string;
  // post_date: Date;
  // author: string;
  // author_image: string;
  // short_description: string;
  img: string;
  title: string;
}
