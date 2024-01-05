import React, {useEffect} from 'react';
import StoreProvider, {addNewReducer} from './store';
import {Animated, Button, View} from 'react-native';
import Text = Animated.Text;
import {useDispatch, useSelector} from 'react-redux';

const App = () => {
  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state: any) => {
    return state?.notificationReducer;
  });
  return (
    <View>
      <Text style={{fontSize: 30, margin: 20}}>
        {notification?.unreadNoti ?? -1}
      </Text>
      <Button
        title={'đá'}
        onPress={() => {
          console.log('???');
          dispatch({type: 'INCREASE_UNREAD_NOTI'});
        }}
      />
    </View>
  );
};
export default App;
