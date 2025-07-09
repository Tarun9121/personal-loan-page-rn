import MaskedView from "@react-native-masked-view/masked-view";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function GradientIcon({ icon, colors }) {
    return (
        <MaskedView
            maskElement={
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </View>
            }
        >

            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ width: 24, height: 24 }}
            />
        </MaskedView>
    );
}
