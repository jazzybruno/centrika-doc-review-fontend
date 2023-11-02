import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";

interface AppContextProps {
  showRight: boolean;
  setShowRight: (show: boolean) => void;
}

const AppContext = React.createContext<AppContextProps>({
  showRight: false,
  setShowRight: () => {},
});
 
const AppProvider = ({children}: {children: React.ReactNode}) => {
  const [showRight, setShowRight] = React.useState(false);
  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#F0BBDD",
            "#ED9BCF",
            "#EC7CC3",
            "#ED5DB8",
            "#F13EAF",
            "#F71FA7",
            "#605BFF",
            "#14106d",
            "#C50E82",
            "#AD1374",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <Notifications position="top-right" />
      <AppContext.Provider value={{showRight, setShowRight}}>
        {children}
      </AppContext.Provider>
    </MantineProvider>
  );
};

export default AppProvider;
