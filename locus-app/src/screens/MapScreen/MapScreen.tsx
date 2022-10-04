import * as React from "react";
import { StyleSheet } from "react-native";
import MapScreenView from "./MapScreenView";

interface MapScreenProps {}

const MapScreen = (props: MapScreenProps) => {
  const userId = "2";

  const groups = [
    {
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
        },
        {
          id: "2",
          name: "João Maria",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-11.0",
            longitude: "-39.0",
          },
        },
        {
          id: "3",
          name: "Spam José",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-13.0",
            longitude: "-37.0",
          },
        },
        {
          id: "4",
          name: "Dimitry Marcos",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-11.0",
            longitude: "-33.0",
          },
        },
      ],
    },
    {
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
        },
        {
          id: "5",
          name: "Marry Jane",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-12.0",
            longitude: "-37.0",
          },
        },
      ],
    },
  ];

  return <MapScreenView groups={groups} />;
};

export default MapScreen;
