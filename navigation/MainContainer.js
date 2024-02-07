
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/HomeScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import HistoryScreen from './screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
         safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="home" size={size} color={color} />;
            },
            }}
        />
        <Tab.Screen
            name="Add Workout"
            component={AddWorkoutScreen}
            options={{
            tabBarLabel: 'Add Workout',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="plus" size={size} color={color} />;
            },
            }}
        />
        <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
            tabBarLabel: 'History',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="clock" size={size} color={color} />;
            },
            }}
        />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});