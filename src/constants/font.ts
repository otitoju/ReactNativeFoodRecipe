import { Platform } from "react-native";

const FONTS = {
    ...Platform.select({
        ios: {
            POPPINS_REGULAR: 'Poppins-Regular',
            POPPINS_SEMIBOLD: 'Poppins-SemiBold',
            POPPINS_BOLD: 'Poppins-Bold',
        },
        android: {
            POPPINS_REGULAR: 'Poppins-Regular',
            POPPINS_SEMIBOLD: 'Poppins-SemiBold',
            POPPINS_BOLD: 'Poppins-Bold',
        }
    })
}

export default FONTS;
