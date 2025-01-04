import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    padding: 20,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000', 
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 30,
    color: '#b32f60',
    fontWeight: "700",
    textAlign: 'center',
    fontFamily: "Poppins-Bold"
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: "Poppins-Regular",
    marginBottom: 20,
    paddingHorizontal:32
  },
  mainContent: {
    flex: 1,
    flexDirection: "column"
  },
  centerContent: {
    flex: 1,
    marginTop: 0
  },
  testArea: {
    backgroundColor: '#2a2a5e',
    borderRadius: 8,
    padding: 20,
  },
  reactiontestArea: {
    backgroundColor:'#212529',
    borderRadius: 8,
    padding: 20,
  },
  animatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
},
noticeBoard: {
  marginVertical: 20,
  padding: 20,
  borderRadius: 5,
  width: '100%',
},
noticeRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap:10,
  marginVertical: 5,
},
pointBox: {
  marginRight: 0,
},
pointIcon: {
  width: 20,
  height: 20,
},
pointLine: {
  fontSize: 14,
  color: 'white',
  paddingRight:20,
  fontFamily:"Poppins-Regular"
},
iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Optional: Add a transparent background
    margin: 5,
},
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // minHeight:"100%"
  },
  imageBackgroundfull: {
    flex: 1,
    padding:20,
    // justifyContent: 'center',
    // alignItems: 'center',
    minHeight:"100%"
  },
  statsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statsText: {
    color: '#fff',
    fontSize: 18,
  },
  soundControls: {
    flexDirection: 'row',
    gap: 10,
  },
  clickCircle: {
    width: 220,
    height: 220,
    borderRadius: 200,
    overflow:'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    alignSelf: 'center',
    // backgroundColor: '#3a3a7e',
  },
  clickText: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    width:120,
    textAlign:"center"
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#b32f60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leftSidebar: {
    width: '100%',
    backgroundColor: '#2a2a5e',
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 25,
    marginBottom: 10,
    marginTop: 10
  },
  sidebarTitle: {
    fontSize: 24,
    color: '#fff',
    marginHorizontal: 5,
    fontFamily: "Poppins-Regular",
    marginLeft:30
  },
  testList: {
    gap: 20,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#64639c',
    padding: 10,
    borderRadius: 3,
  },
  testItemText: {
    color: '#fff',
    fontSize: 15,
    fontFamily:"Poppins-Regular"
  },
  timeListContainer: {
    backgroundColor: '#2a2a5e',
    borderRadius: 8,
    padding: 20,
    gap: 10,
  },
  timeButton: {
    backgroundColor: '#434f65',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 2,
    alignItems: 'center',
  },
  activeTimeButton: {
    backgroundColor: '#7455CA',
  },
  timeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'hidden',
    padding: 20,
    width:'100%',
    display:'relative'
  },

  modalInnerContainer: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    overflow:'hidden',
  },

  modalTopBar: {
    width: '100%',
    width:'100%'
  },
  closeBtn: {
    alignSelf: "flex-end",
    position:'absolute',
    right:-65,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: 'normal',
    marginRight:20
  },
  ripple: {
    position: 'relative',
    borderRadius: '50%',
    fill: 'rgba(255, 255, 255, 0.5)',
    animation: 'ripple-animation 0.5s ease',
    animationIterationCount: 1,
  },
  modalTitleContainer: {
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    width:200,
    padding: 10
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultOuterContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultContainer: {
    alignItems: 'center',
  },
  animationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  animeTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "#fff"

  },
  animeLgDisplay: {
    // Styles for large display
  },
  animationImage: {
    width: 120,
    height: 140,
  },
  resultContentContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  resultContentRow: {
    marginVertical: 5,
  },
  modalStatsContainer: {
    display: "flex",
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#fff',
    backgroundColor: "#481b91",
    justifyContent: "center"
  },
  cpsStatRow: {
    marginVertical: 2,
  },
  normalText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  statHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#ff0c73"
  },
  statSubheading: {
    fontSize: 16,
    color: '#fff',
    fontWeight: "bold"
  },
  modalNote: {
    fontSize: 17,
    textAlign: 'center',
    margin: 15,
    color: "#f95e5e",
    fontWeight: "600",

  },
  tryBtn: {
    backgroundColor: '#ffc600',
    padding: 10,
    borderRadius: 10,
  },
  tryBtnText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  aimTestContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  aimInnerContainer: {
    flex: 1,

  },
  aimGridContainers: {

    marginBottom: 20,
  },
  aimGridBoxContent: {
    flex: 1,
    margin: 5,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  colorPicker: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  colorPickerText: {
    fontSize: 16,
    color: '#000',
  },
  btnContainer: {
    alignItems: 'center',
  },
  aimStartBtn: {
    backgroundColor: '#7655CA',
    padding: 10,
    borderRadius: 5,
  },
  aimStartBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  startButton:{
    paddingVertical:5,
    marginTop:20,
    paddingHorizontal:20,
    backgroundColor:"#7655CA",
    borderRadius:9,
    maxWidth:150,
    marginVertical:0,
    alignSelf:"center"
    
  },
  startButtonText:{
    color:"white",
    fontFamily:"Poppins-Regular",
    fontSize:18,
    textAlign:"center"
  },
  row: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  iconContainer: {
    
  },
  
});