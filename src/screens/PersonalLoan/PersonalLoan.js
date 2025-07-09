import {
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import ScreenTitle from "../../components/ScreenTitle";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import theme, { COLORS } from "../../styles/theme";
import GradientProgressSlider from "../../components/GradientProgressSlider";
import SideHeading from "./components/SideHeading";
import GradientButton from "../../components/GradientButton";
import Modal from "react-native-modal";
import GradientIcon from "../../components/GradientIcon";
import LinearGradient from 'react-native-linear-gradient'

const { height } = Dimensions.get("window");

function PersonalLoan() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loanAmount, setLoanAmount] = useState(50000);
    const [minEligibleLoan, setMinEligibleLoan] = useState(10000);
    const [maxEligibleLoan, setMaxEligibleLoan] = useState(145000);
    const [tenure, setTenure] = useState(6);
    const [emiAmount, setEmiAmount] = useState(3917);
    const [processingFees, setProcessingFees] = useState(199);
    const [disbursedAmount, setDisbursedAmount] = useState(79801);

    useEffect(() => {
        setIsModalVisible(true);
    }, [maxEligibleLoan]);

    function toCurrency(no, digits) {
        return no.toLocaleString("en-IN", {
            currency: "INR",
            minimumFractionDigits: digits || 0,
        });
    }

    return (
        <ImageBackground
            source={require("../../assets/full-bg.png")}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <View style={style.fullContainer}>
                    <ScreenTitle
                        title="Personal Loan"
                        backButton={<AntDesign name="close" size={24} color="#000" />}
                    />

                    <ScrollView
                        contentContainerStyle={style.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={style.instantLoanContainer}>
                            <Text style={[theme.primaryTextDark, theme.textCenter, theme.primaryTextSize, theme.b600]}>
                                You are eligible for an instant loan of
                            </Text>
                            <Text style={[theme.primaryText1000, theme.textCenter, style.rupee]}>
                                ₹<Text style={[theme.b600, style.maxEligibleLoan]}>{toCurrency(maxEligibleLoan)}</Text>
                            </Text>
                            <Text style={[theme.primaryTextDark, theme.textCenter, theme.primaryTextSize]}>
                                100% digital. Get money in your bank account directly
                            </Text>
                        </View>

                        <View style={style.selectLoanAmountContainer}>
                            <Text style={[theme.primaryTextDark, theme.textCenter, theme.text16, theme.b600, style.pb20]}>
                                Select loan amount
                            </Text>

                            <View style={style.loanAmountInputWrapper}>
                                <View style={style.shadowOverlay}>
                                    <LinearGradient
                                        colors={['rgba(0,0,0,0.12)', 'transparent']}
                                        style={style.shadowTop}
                                    />
                                    <LinearGradient
                                        colors={['rgba(0,0,0,0.12)', 'transparent']}
                                        style={style.shadowLeft}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    />
                                </View>

                                <View style={style.loanAmountInputContainer}>
                                    <Text style={[theme.text24, theme.primaryTextDark]}>₹</Text>
                                    <TextInput
                                        style={[theme.text40, theme.primaryTextDark, theme.b600]}
                                        value={toCurrency(loanAmount)}
                                        editable={false}
                                    />
                                </View>
                            </View>

                            <GradientProgressSlider
                                primaryColor="#0C64E7"
                                secondaryColor="#073881"
                                max={maxEligibleLoan}
                                min={minEligibleLoan}
                                value={loanAmount}
                                step={500}
                                onValueChange={setLoanAmount}
                                minText={"₹ " + toCurrency(minEligibleLoan)}
                                maxText={"₹ " + toCurrency(maxEligibleLoan)}
                            />
                        </View>

                        <View style={style.tenureContainer}>
                            <SideHeading text="Select EMI Tenure" />

                            <GradientProgressSlider
                                primaryColor="#0C64E7"
                                secondaryColor="#073881"
                                min={6}
                                max={24}
                                value={tenure}
                                onValueChange={setTenure}
                                showVal={true}
                                minText={"6 months"}
                                maxText={"24 months"}
                            />
                        </View>

                        <View style={style.loanDetails}>
                            <SideHeading text="Loan Details" />

                            <View style={{ gap: 15, paddingTop: 15 }}>
                                <View style={style.emiComponent}>
                                    <Text style={[theme.textNeutral]}>EMI amount</Text>
                                    <Text style={[theme.primaryTextDark, theme.b600]}>
                                        ₹ {toCurrency(emiAmount, 2)}
                                    </Text>
                                </View>

                                <View style={style.emiComponent}>
                                    <Text style={[theme.textNeutral]}>Processing Fees:</Text>
                                    <Text style={[theme.primaryTextDark, theme.b600]}>
                                        ₹{toCurrency(processingFees, 2)}
                                    </Text>
                                </View>

                                <View style={style.emiComponent}>
                                    <View>
                                        <Text style={[theme.textNeutral]}>Disbursed Amount:</Text>
                                        <Text style={[theme.textNeutral]}>(Exclusive of processing fee)</Text>
                                    </View>
                                    <Text style={[theme.primaryTextDark, theme.b600]}>
                                        ₹{toCurrency(disbursedAmount, 2)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={style.buttonWrapper}>
                        <GradientButton
                            title={"Proceed"}
                            onPress={() => console.log("proceed button clicked")}
                            colors={[COLORS.linearGradientPrimary, COLORS.linearGradientSecondary]}
                        />
                    </View>
                </View>

                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={() => setIsModalVisible(false)}
                    onBackButtonPress={() => setIsModalVisible(false)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    style={style.modal}
                >
                    <View style={style.modalContent}>
                        <View style={style.modalIcons}>
                            <GradientIcon
                                icon={<FontAwesome name='rupee' size={26} color="#000" />}
                                colors={[COLORS.linearGradientPrimary, COLORS.linearGradientSecondary]}
                            />
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <AntDesign name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <Text style={style.modalTitle}>Congratulations!</Text>
                        <Text style={style.modalText}>
                            You're eligible for an instant loan of ₹{toCurrency(maxEligibleLoan)}. Get money in your bank account immediately.
                        </Text>

                        <View style={{ marginTop: 20 }}>
                            <GradientButton
                                title="Proceed"
                                onPress={() => setIsModalVisible(false)}
                                colors={[COLORS.linearGradientPrimary, COLORS.linearGradientSecondary]}
                            />
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export default PersonalLoan;

const style = StyleSheet.create({
    fullContainer: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        paddingTop: 0,
        gap: 20,
        flexGrow: 1,
    },
    instantLoanContainer: {
        borderBottomWidth: 1,
        borderColor: "#D9D9EB",
        gap: 6,
        paddingBottom: 10,
    },
    rupee: {
        fontSize: 20,
    },
    maxEligibleLoan: {
        fontSize: 32,
    },
    selectLoanAmountContainer: {
        paddingTop: 10,
    },
    loanAmountInputWrapper: {
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        flex: 1,
        width: "100%",
        borderWidth: 1,
        borderColor: "#EDEDF6"
    },
    loanAmountInputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#FCFCFC",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    innerShadowTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: "rgba(0,0,0,0.05)",
    },
    innerShadowLeft: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: 8,
        backgroundColor: "rgba(0,0,0,0.05)",
    },
    tenureContainer: {
        paddingTop: 20,
    },
    pb20: {
        paddingBottom: 20,
    },
    loanDetails: {
        paddingTop: 20,
    },
    emiComponent: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonWrapper: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 24,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: height * 0.32,
    },
    modalIcons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#04285C",
    },
    modalText: {
        fontSize: 16,
        lineHeight: 22,
        color: "#333",
    },
    shadowTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 16,
    },
    shadowLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 16,
    },
    shadowOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,              // Make sure it's above the content
        borderRadius: 16,       // Match the container radius
        overflow: "hidden",
    },
});
