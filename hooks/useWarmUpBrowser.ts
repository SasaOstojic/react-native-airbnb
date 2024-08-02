import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';


//just for android optimizin app performance
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};