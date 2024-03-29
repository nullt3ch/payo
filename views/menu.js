import React from 'react';
import { Text, StyleSheet,Button, View, Animated, SafeAreaView, Dimensions} from 'react-native';
import Tabbar from 'react-native-tabbar-bottom'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Wallet from '../views/creditcard';
import MembersWallet from '../views/memberscard';

const pColor = '#F28705';
const nOptions = {
		headerLeft:null,
		title: 'Home',
		headerStyle: {
			height: 50,
			borderBottomWidth: 0,
			borderColor: "#F28705",
			backgroundColor: "#F28705",
		},
	headerTintColor: '#FFF',
};
export class MenuScreen extends React.Component {
  constructor() {
		super()
	  this.state = {
			page: "HomeScreen",
			qr: '',
    }
	}
	static navigationOptions = nOptions
	onSuccess(e) {		
		this.setState({
			qr: e.data
		});
		if(e.data == "PAY-3215030120"){
			this.props.navigation.navigate('Payment',{code: e.data});
		}
		else{
			alert("Error: código incorrecto");
		}
  }
	render() {
		return (
      <View style={styles.container}>
        {this.state.page === "HomeScreen" && 
					<QRCodeScanner
						onRead={this.onSuccess.bind(this)}
					
					/>
				}

				{this.state.page === "WalletCredit" && 
				<Wallet navigation={this.props.navigation}>Screen1</Wallet>
				}
				{this.state.page === "WalletClubs"  && 
				<MembersWallet navigation={this.props.navigation}>Screen1</MembersWallet>
				}
				{/* TABBAR */}
			  <Tabbar

          stateFunc={(tab) => {
            this.setState({page: tab.page, qr:''})
					}}
					height={300}
					tabbarBgColor='#F28705'
					tabbarBorderTopColor = '#F28705'
					selectedLabelColor = "#ccc"
					labelSize={12}
					activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
							icon: "home",
							iconText: "Cámara"
            },
            {
              page: "WalletCredit",
							icon: "card",
							iconText: "Tarjetas"
						},
						{
              page: "WalletClubs",
							icon: "analytics",
							iconText: "Membresias"
						},
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//top: -37,
		backgroundColor: pColor,
	},	
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
 });