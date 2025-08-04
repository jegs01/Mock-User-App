export interface UserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
}

export interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  fullName: string;
  email: string;
  picture: {
    large: string;
  };
  location: UserLocation;
  phone: string;
}