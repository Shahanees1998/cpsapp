import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#b32f60',
    fontWeight: "700",
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  mainContent: {
    flex: 1,
    flexDirection: "column"
  },
  centerContent: {
    flex: 1,
    marginTop: 10
  },
  testArea: {
    backgroundColor: '#2a2a5e',
    borderRadius: 8,
    padding: 20,
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  soundControls: {
    flexDirection: 'row',
    gap: 10,
  },
  playArea: {
    width: '100%',
    height: 400,
    backgroundColor: '#3a3a7e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  startText: {
    color: '#fff',
    fontSize: 18,
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
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#000',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalInnerContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#b32f60',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
  },
  mainLayout:{
    marginTop: 20,
    height: 400,
    backgroundColor: 'rgba(3,109,248,.234)',
    borderRadius: 8,
    padding:20
  },
  pointLine:{
    color:"white",
    fontFamily:"Poppins-Regular",
    fontSize:12
  },
  startButton:{

  }
});