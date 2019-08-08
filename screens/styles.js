import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    width: '100%',
  },
  defaultTextEntry: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '70%',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 5,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: '30%',
    marginBottom: 20,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: '50%',
    width: '100%',
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  fridgeContainer: {
    position: 'absolute',
    paddingTop: '50%',
    alignSelf: 'center',
  },
  fridgeAddItem: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  defaultBtn: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#b38d97',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 200,
  },
  defaultBtnText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  newItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newItemBtn: {
    backgroundColor: '#b38d97',
    borderRadius: 5,
    width: '20%',
    height: 20,
  },
  newItemBtnText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: '#424b54',
    lineHeight: 36,
    textAlign: 'center',
  },
  fridgeListView: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#b38d97',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 5,
  },
  deleteItemBtn: {
    backgroundColor: '#d5aca9',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignText: 'center',
  },
  deleteItemTxt: {
    color: 'white',
    width: 100,
    paddingLeft: 30,
  },
  fridgeItem: {
    marginLeft: 10,
  },
  secondaryText: {
    fontSize: 18,
    color: '#424b54',
    lineHeight: 36,
    textAlign: 'center',
  },
});

export default styles;
