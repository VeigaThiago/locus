import { GroupType } from "../model/Group";

export const groups = {
  "0001": {
    id: "0001",
    name: "Grupo do Carnaval",
    participants: [
      {
        id: "1",
        name: "Michael Jackson",
        photoUrl: "https://source.unsplash.com/40x40/?portrait",
        coords: {
          latitude: "-12.0",
          longitude: "-38.0",
        },
        battery: {
          level: 0.5,
          charging: false,
        },
        lastUpdate: new Date("2015-03-25"),
      },
      {
        id: "2",
        name: "João Maria",
        photoUrl: "https://source.unsplash.com/40x40/?portrait",
        coords: {
          latitude: "-11.0",
          longitude: "-39.0",
        },
        battery: {
          level: 0.5,
          charging: false,
        },
        lastUpdate: new Date("2015-03-25"),
      },
      {
        id: "3",
        name: "Spam José",
        photoUrl: "https://source.unsplash.com/40x40/?portrait",
        coords: {
          latitude: "-13.0",
          longitude: "-37.0",
        },
        battery: {
          level: 0.5,
          charging: false,
        },
        lastUpdate: new Date("2015-03-25"),
      },
      {
        id: "4",
        name: "Dimitry Marcos",
        photoUrl: "https://source.unsplash.com/40x40/?portrait",
        coords: {
          latitude: "-11.0",
          longitude: "-33.0",
        },
        battery: {
          level: 0.5,
          charging: false,
        },
        lastUpdate: new Date("2015-03-25"),
      },
    ],
  },
  "0002": {
    id: "0002",
    name: "Grupo da Família",
    participants: [
      {
        id: "2",
        name: "João Maria",
        photoUrl: "https://source.unsplash.com/40x40/?portrait",
        coords: {
          latitude: "-11.0",
          longitude: "-39.0",
        },
        battery: {
          level: 0.5,
          charging: false,
        },
        lastUpdate: new Date("2015-03-25"),
      },
      {
        id: "5",
        name: "Marry Jane",
        photoUrl: "https://source.unsplash.com/40x40/?portrait",
        coords: {
          latitude: "-12.0",
          longitude: "-37.0",
        },
        battery: {
          level: 0.5,
          charging: false,
        },
        lastUpdate: new Date("2015-03-25"),
      },
    ],
  },
} as { [key in any]: GroupType };
