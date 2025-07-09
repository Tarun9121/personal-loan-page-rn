import theme from "../../../styles/theme";
import { Text } from "react-native";

function SideHeading({text}) {
    return <Text style={[theme.b600, theme.textNeutral, theme.text16]}>{text}</Text>
}

export default SideHeading;