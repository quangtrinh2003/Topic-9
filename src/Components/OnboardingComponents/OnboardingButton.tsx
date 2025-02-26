import { View, Text, useWindowDimensions, TouchableWithoutFeedback, StyleSheet } from "react-native"
import React from "react"
import { onboardingButtonParams } from "../../TypesCheck/OnboardingTypesCheck"
import Animated, { interpolateColor, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParams } from "../../Navigation/RootNavigator"

type Props = {} 

const OnboardingButton = ({ flatListIndex, flatListRef, itemLength, x }: onboardingButtonParams) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const buttonAnimation = useAnimatedStyle(() => {
        return {
            width:
                flatListIndex.value === itemLength - 1
                    ? withSpring(140)
                    : withTiming(0),
            height: 60,
        }
    })

    const arrowAnimation = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === itemLength - 1 ? withTiming(0) : withTiming(1),
            width: 30,
            height: 30,
            transform: [
                { 
                    translateX: flatListIndex.value === itemLength - 1 ? withTiming(100) : withTiming(0) 
                }
            ]        
        }
    })

    const textAnimation = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === itemLength - 1 ? withTiming(1) : withTiming(0),
            transform: [
                { 
                    translateX: flatListIndex.value === itemLength - 1 ? withTiming(0) : withTiming(100) 
                }
            ]
        }
    })

    const colorAnimation = useAnimatedStyle(() => {
        const background = interpolateColor(
            x.value,
            [
                0, SCREEN_WIDTH, 2 * SCREEN_WIDTH
            ],
            ["#c9c9c9", "#ff6b6b", "#c9c9c9"],
        )
        return {
            backgroundColor: background
        }
    })

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

    return (
        <TouchableWithoutFeedback
            onPress = {() => {
                if (flatListIndex.value === itemLength + 1) {
                    flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1});
                } else {
                    navigation.replace("TabsStack", { screen: "Home" });
                }
            }}   
        >
            <Animated.View 
                style={[sty.container, buttonAnimation, colorAnimation]}
            >
                <Animated.Text style={[sty.textButton, textAnimation]}>
                    Get Started
                </Animated.Text>
                <Animated.Image 
                    source={require("../../../assets/onboarding/cat404.json")} 
                    style={[sty.arrow, arrowAnimation]}
                />
            </Animated.View>
        </TouchableWithoutFeedback>    
    )
}     

export default OnboardingButton

const sty = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 10
    },

    arrow: {
        position: "absolute",
    },

    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        position: "absolute"
    }
})
