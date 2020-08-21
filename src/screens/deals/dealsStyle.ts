import { StyleSheet } from 'react-native';
const dealsStylesheet = StyleSheet.create({
    textHead: {
        color: '#ea5c25',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        textTransform: 'capitalize',
        overflow: 'hidden',
        marginTop: 15,
        marginBottom: 15
    }, headingText: {
        textTransform: 'capitalize', marginLeft: 30, marginTop: 15, marginBottom: 15,
        backgroundColor: "#000", color: '#fff', margin: 5, paddingRight: 5, paddingLeft: 5,
        paddingBottom: 5, paddingTop: 5
    },
    mainImage: { width: 150, height: 150, alignItems: 'center', paddingRight: 150 },
    thumImage: { width: 50, height: 50, position: 'absolute', top: 0, right: 0 }
})
export default dealsStylesheet;