import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import OnboardingScreen from "../Screens/OnboardingScreen";
import TabsNavigator, { TabsStackParams} from "./TabsNavigation";
import { NavigatorScreenParams } from "@react-navigation/native";
import HomeScreen from './../Screens/HomeScreen';
import CartScreen from './../Screens/CartScreen';
import PaymentScreen from './../Screens/PaymentScreen';

export type RootStackParams = {
    OnboardingScreen: undefined
    // HomeScreen: NavigatorScreenParams<TabsStackParams>
    // CartScreen: undefined
    // PaymentScreen: undefined
    TabsStack: NavigatorScreenParams<TabsStackParams>
}

const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;
const RootNavigator = () => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen 
                name="OnboardingScreen" 
                component={OnboardingScreen} 
                options={{ headerShown: false }}
            />
            <RootStack.Screen 
                name="TabsStack" 
                component={TabsNavigator} 
                options={{ headerShown: false }}   
            />
        </RootStack.Navigator>
            
    )
}

export default RootNavigator;