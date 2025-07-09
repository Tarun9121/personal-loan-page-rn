import { Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import t, { COLORS } from "../styles/theme";
import useStyle from "../styles/useStyle";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import IonIcons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { useState } from "react";

export default function BottomNavigations() {
    const s = useStyle();
    const [activeTab, setActiveTab] = useState("home"); // default to home tab

    const getIconColor = (tabName) => 
        activeTab === tabName ? COLORS.linearGradientPrimary : COLORS.neutral300;

    const getTextColor = (tabName) => 
        activeTab === tabName ? COLORS.linearGradientPrimary : COLORS.neutral300;

    return (
        <View style={[t.row, t.justifyAround, s.p(10)]}>
            {/* Home Button */}
            <TouchableOpacity 
                style={[s.gap(10), t.justifyBetween, t.alignItemsCenter]}
                onPress={() => setActiveTab("home")}
            >
                <AntDesign name="home" size={24} color={getIconColor("home")} />
                <Text style={[s.color(getTextColor("home"))]}>Home</Text>
            </TouchableOpacity>
            
            {/* History Button */}
            <TouchableOpacity 
                style={[s.gap(10), t.justifyBetween, t.alignItemsCenter]}
                onPress={() => setActiveTab("history")}
            >
                <FontAwesome name="history" size={24} color={getIconColor("history")} />
                <Text style={[s.color(getTextColor("history"))]}>History</Text>
            </TouchableOpacity>
            
            {/* Notifications Button */}
            <TouchableOpacity 
                style={[s.gap(10), t.justifyBetween, t.alignItemsCenter]}
                onPress={() => setActiveTab("notifications")}
            >
                <EvilIcons name="bell" size={24} color={getIconColor("notifications")} />
                <Text style={[s.color(getTextColor("notifications"))]}>Notifications</Text>
            </TouchableOpacity>
            
            {/* Account Button */}
            <TouchableOpacity 
                style={[s.gap(10), t.justifyBetween, t.alignItemsCenter]}
                onPress={() => setActiveTab("account")}
            >
                <IonIcons name="person-outline" size={24} color={getIconColor("account")} />
                <Text style={[s.color(getTextColor("account"))]}>Account</Text>
            </TouchableOpacity>
        </View>
    );
}