import { useMemo } from "react";
import { SafeAreaView } from "react-native";
import MapScreenView, { MapScreenViewProps } from "./MapScreenView";

interface MapScreenProps {}

const MapScreen = (props: MapScreenProps) => {
  const userId = "2";

  const groups = [
    // Fetch
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
            batteryLevel: 0.5,
            lastUpdate: new Date("2015-03-25"),
          },
        },
        {
          id: "2",
          name: "João Maria",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-11.0",
            longitude: "-39.0",
            batteryLevel: 0.5,
            lastUpdate: new Date("2015-03-25"),
          },
        },
        {
          id: "3",
          name: "Spam José",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-13.0",
            longitude: "-37.0",
            batteryLevel: 0.1,
            lastUpdate: new Date("2015-03-25"),
          },
        },
        {
          id: "4",
          name: "Dimitry Marcos",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-11.0",
            longitude: "-33.0",
            batteryLevel: 0.9,
            lastUpdate: new Date("2015-03-25"),
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
            batteryLevel: 0.6,
            lastUpdate: new Date("2015-03-25"),
          },
        },
        {
          id: "5",
          name: "Marry Jane",
          photoUrl: "https://source.unsplash.com/40x40/?portrait",
          coords: {
            latitude: "-12.0",
            longitude: "-37.0",
            batteryLevel: 0.3,
            lastUpdate: new Date("2015-03-25"),
          },
        },
      ],
    },
  ];

  const formattedGroups = useMemo(
    () =>
      groups.map((group) => {
        const user = group.participants.find((user) => user.id === userId);
        const friends = group.participants.filter((user) => user.id !== userId);
        return {
          ...group,
          participants: [{ ...user, name: "Você" }, ...friends],
        };
      }),
    [groups]
  );

  return (
    <MapScreenView groups={formattedGroups as MapScreenViewProps["groups"]} />
  );
};

export default MapScreen;
