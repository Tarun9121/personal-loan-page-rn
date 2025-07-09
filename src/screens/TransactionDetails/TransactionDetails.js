import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState, useMemo } from "react";
import ScreenTitleWithOptions from "../../components/ScreenTitleWithOptions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Feather from "react-native-vector-icons/Feather"
import EvilIcons from "react-native-vector-icons/EvilIcons";
import t, { COLORS } from "../../styles/theme";
import useStyle from "../../styles/useStyle";
import { toCurrency } from "../../globalFunctions/globalFunctions";
import BottomNavigations from "../../components/BottomNavigations";

const s = useStyle();

const STATUS_CONFIG = {
    processing: {
        color: COLORS.blue250,
        icon: <SimpleLineIcons name="clock" size={15} color={COLORS.blue250} />,
        title: "Expected Disbursal",
        description: "Within 24 hours",
        note: "Note: You'll be notified once the amount is credited to your account.",
        bg: "#0C64E71F"
    },
    completed: {
        color: COLORS.green500,
        icon: <SimpleLineIcons name="check" size={15} color={COLORS.green500} />
    },
    cancelled: {
        color: COLORS.yellow500,
        icon: <SimpleLineIcons name="close" size={15} color={COLORS.yellow500} />,
        title: "Transaction Cancelled",
        description: "Eligibility failed",
        note: "Note: This request was cancelled and no amount was disbursed.",
        bg: "#FAF3B8B2"
    },
    failed: {
        color: COLORS.red500,
        icon: <SimpleLineIcons name="close" size={15} color={COLORS.red500} />
    }
};

function IsCompleted({ status }) {
    const { color, icon } = STATUS_CONFIG[status] || {};
    return (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6, alignContent: "center" }}>
            {icon}
            <Text style={{ color, textTransform: "capitalize" }}>{status}</Text>
        </View>
    );
}

function TransactionStatusHeader({ status, amount, dateTime }) {
    return (
        <View style={[s.gap(15), s.my(20)]}>
            <View>
                <IsCompleted status={status} />
            </View>
            <View>
                <Text style={[s.fontSize(36), s.fontWeight("600"), t.textCenter, t.textNeutral900]}>
                    {toCurrency(amount, true)}
                </Text>
                <Text style={[t.textCenter, t.textNeutral300]}>Transaction Amount</Text>
            </View>
            <View>
                <Text style={[t.textCenter, t.textNeutral500]}>{dateTime}</Text>
            </View>
        </View>
    );
}

function TransactionPendingOrCancelledDetails({ status }) {
    if (!["processing", "cancelled"].includes(status)) return null;

    const { color, bg, icon, title, description, note } = STATUS_CONFIG[status];

    return (
        <View style={[s.mt(16), s.mb(20), style.card, s.p(12)]}>
            <View style={[s.bg(bg), s.p(12), t.row, s.gap(10), { borderRadius: 8 }]}>
                {icon}
                <View>
                    <Text style={[s.color(color), t.text12]}>{title}</Text>
                    <Text style={[s.color(color), s.fontWeight("500")]}>{description}</Text>
                </View>
            </View>
            <Text style={[s.mt(8), s.color(color)]}>{note}</Text>
        </View>
    );
}

function FailedTransactionView() {
    return (
        <View>
            <View style={s.my(10)}>
                <ScreenTitleWithOptions
                    backButton={<FontAwesome name="angle-left" size={26} color="#000" />}
                    onBackButtonPress={() => console.log("backbuttonpressed: TransactionDetails")}
                    title={"Transaction Details"}
                    options={true}
                    optionButtons={[
                        {
                            label: "Share Details",
                            icon: <EvilIcons name="share-google" size={22} color="#000" />,
                            onPress: () => console.log("share details pressed"),
                        },
                        {
                            label: "Chat Support",
                            icon: <MaterialCommunityIcons name="chat-outline" size={22} color="#000" />,
                            onPress: () => console.log("Chat Support pressed"),
                        },
                        {
                            label: "Call Support",
                            icon: <SimpleLineIcons name="call-end" size={22} color="#000" />,
                            onPress: () => console.log("Call Support pressed"),
                        },
                    ]}
                />

            </View>
            <View style={[style.whiteContainer, t.alignItemsCenter, s.p(30), s.m(30), s.gap(20)]}>
                <Image source={require("../../assets/close.png")} style={{ height: 40, width: 40 }} resizeMode="contain" />
                <View style={[s.gap(10)]}>
                    <Text style={[t.textNeutral900, t.b600, t.text16, t.textCenter]}>Transaction Failed</Text>
                    <Text style={[t.textNeutral300, t.text16, t.textCenter]}>Transaction failed due to bank server error.</Text>
                </View>
            </View>
        </View>
    );
}

function AmountDetailsCard({ details }) {
    return (
        <View style={[style.card, s.p(16), s.gap(12)]}>
            <Text style={[t.textNeutral300, t.text12, s.px(4)]}>Amount Details</Text>
            <View style={[s.gap(12)]}>
                <View style={[t.justifyBetween, t.row, style.whiteContainer, s.p(12)]}>
                    <Text style={[t.textGreen750, t.text16]}>Amount Disbursed</Text>
                    <Text style={[t.textGreen750, t.text16]}>
                        {toCurrency(details.amountDisbursed, true)}
                    </Text>
                </View>
                <View style={[s.gap(8)]}>
                    <View style={[t.justifyBetween, t.row, s.px(4)]}>
                        <Text style={t.textNeutral600}>Loan Requested</Text>
                        <Text style={t.textNeutral900}>
                            {toCurrency(details.loanRequested, true)}
                        </Text>
                    </View>
                    <View style={[t.justifyBetween, t.row, s.px(4)]}>
                        <Text style={t.textNeutral600}>Interest Deducted</Text>
                        <Text style={t.textNeutral900}>
                            {toCurrency(details.interestDeducted, true)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

function EMIDetailsCard({ emiDetails }) {
    return (
        <View style={[style.card, s.p(16), s.gap(12)]}>
            <Text style={[t.textNeutral300, t.text12, s.px(4)]}>EMI Details</Text>
            <View style={[style.blueContainer]}>
                <View style={[s.gap(5)]}>
                    <Text style={[t.textNeutral600]}>Monthly Emi</Text>
                    <Text style={[t.textNeutral900, t.text16]}>{toCurrency(emiDetails.monthlyEmi, 2, true)}</Text>
                </View>
                <View style={[s.gap(5)]}>
                    <Text style={[t.textNeutral600]}>Duration</Text>
                    <Text style={[t.textNeutral900, t.text16]}>{emiDetails.duration} months</Text>
                </View>
            </View>
            <View style={[t.row, s.gap(10), t.alignItemsCenter]}>
                <Feather name="info" size={12} color={COLORS.red500} />
                <Text style={[t.textRed500, t.text12]}>Deduction starts from Jul 2025</Text>
            </View>
        </View>
    );
}

function TransactionAndBankDetails({ details }) {
    return (
        <View style={[style.card, s.p(16), s.gap(12), s.mb(20)]}>
            <Text style={[t.textNeutral300, t.text12, s.px(4)]}>Transaction Details</Text>
            <View style={[style.whiteContainer, s.gap(8), s.p(12)]}>
                <View style={[t.row, t.justifyBetween]}>
                    <Text style={[t.textNeutral600]}>Transaction ID</Text>
                    <Text style={[t.textNeutral900]}>{details.transactionId}</Text>
                </View>
                <View style={[t.row, t.justifyBetween]}>
                    <Text style={[t.textNeutral600]}>Employee Name</Text>
                    <Text style={[t.textNeutral900]}>{details.employeeName}</Text>
                </View>
            </View>
            <Text style={[t.textNeutral300, t.text12, s.px(4)]}>Bank Details</Text>
            <View style={[style.whiteContainer, s.gap(8), s.p(12)]}>
                <View style={[t.row, t.justifyBetween]}>
                    <Text style={[t.textNeutral600]}>Bank Name</Text>
                    <Text style={[t.textNeutral900]}>{details.bankName}</Text>
                </View>
                <View style={[t.row, t.justifyBetween]}>
                    <Text style={[t.textNeutral600]}>Account No</Text>
                    <Text style={[t.textNeutral900]}>{details.accountNo}</Text>
                </View>
            </View>
        </View>
    );
}

function LoanAgreementDetails() {
    return (
        <View style={[style.card, s.bg(COLORS.neutral100), s.radius(8), t.justifyBetween, t.alignItemsCenter, t.row, s.p(10)]}>
            <View style={[t.row, s.gap(15)]}>
                <View style={[s.bg("#D9D9EB"), s.radius(900), s.p(8)]}>
                    <Image source={require("../../assets/file-text.jpeg")} style={{ height: 22, width: 22 }} />
                </View>
                <View>
                    <Text style={[t.textNeutral900, t.text16,]}>Loan Agreement</Text>
                    <Text style={[t.textNeutral300, s.fontSize(10)]}>PDF . 156 KB</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => console.log("loanagreement download button pressed")}>
                    <Feather name="download" size={24} color={COLORS.blue500} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function TransactionDetails() {
    const [transactionDetails] = useState({
        transactionAmount: 100000,
        transactionId: "SA12345678",
        bankName: "State Bank of India",
        accountNo: "XXXX-XXXX-1234",
        employeeName: "Rohan Mehta",
        loanRequested: 100000,
        interestDeducted: 4000,
        amountDisbursed: 96000,
        transactionDateTime: "10 Jun 2025 . 2 : 30 PM",
        transactionStatus: "completed",     // completed | processing | failed | cancelled
    });

    const [emiDetails] = useState({
        monthlyEmi: 8333,
        duration: 12
    });

    if (transactionDetails.transactionStatus === "failed") {
        return <FailedTransactionView />;
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={[style.container]}
                contentContainerStyle={[s.p(10)]}
                showsVerticalScrollIndicator={false}
            >
                  <View style={s.my(10)}>
                    <ScreenTitleWithOptions
                        backButton={<FontAwesome name="angle-left" size={26} color="#000" />}
                        onBackButtonPress={() => console.log("backbuttonpressed: TransactionDetails")}
                        title={"Transaction Details"}
                        options={true}
                        optionButtons={[
                            {
                                label: "Share Details",
                                icon: <EvilIcons name="share-google" size={22} color="#000" />,
                                onPress: () => console.log("share details pressed"),
                            },
                            {
                                label: "Chat Support",
                                icon: <MaterialCommunityIcons name="chat-outline" size={22} color="#000" />,
                                onPress: () => console.log("Chat Support pressed"),
                            },
                            {
                                label: "Call Support",
                                icon: <SimpleLineIcons name="call-end" size={22} color="#000" />,
                                onPress: () => console.log("Call Support pressed"),
                            },
                        ]}
                    />

                </View>

                <TransactionStatusHeader
                    status={transactionDetails.transactionStatus}
                    amount={transactionDetails.transactionAmount}
                    dateTime={transactionDetails.transactionDateTime}
                />

                {/* transaction info shows only for status cancelled, failed */}
                <TransactionPendingOrCancelledDetails status={transactionDetails.transactionStatus} />

                <AmountDetailsCard details={transactionDetails} />
                <EMIDetailsCard emiDetails={emiDetails} />
                <TransactionAndBankDetails details={transactionDetails} />
                <LoanAgreementDetails />
            </ScrollView>
            <BottomNavigations />
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#EDEDF6",
        borderRadius: 16,
        marginVertical: 10,
        backgroundColor: "#FFF",
    },
    container: {
        backgroundColor: "#fbfbfb",
        flex: 1,
    },
    whiteContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "#EDEDF6",
    },
    blueContainer: {
        backgroundColor: "#B0D0FF3D",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
    }
});