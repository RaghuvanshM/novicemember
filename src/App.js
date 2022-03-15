import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Store } from "./module/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import RouterComponent from "../src/router";
import { StatusBar, View, Alert } from "react-native";
import { enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
enableScreens();
const persistor = persistStore(Store);

const App = () => {
  useEffect(() => {
    return () => {
      persistor.flush();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={Store}>
        <PersistGate
          persistor={persistor}
          children={(bootstrapped) => {
            if (bootstrapped) {
              return <RouterComponent />;
            } else {
              return null;
            }
          }}
        />
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
export default App;
