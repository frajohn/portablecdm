import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  AppRegistry,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
  TextInput,

} from 'react-native';




import {
  Text,
  Button,
  Icon,
  FormLabel,
  FormInput,
  SearchBar,

} from 'react-native-elements';
import TopHeader from '../top-header-view';
import colorScheme from '../../config/colors';

import {
    fetchVesselFromIMO
} from '../../actions';

import ships from '../../assets/ships';

var additionalText ='';




class VesselInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            extraInfo: undefined,
            comment: '',
            message: '',
            promptVisible: false,
        };
    }

    componentDidMount() {
        this.props.fetchVesselFromIMO(this.props.vessel.imo.split('IMO:')[1]).then(() => {
            // DOUBLE EQUALS!! 
            const ship = ships.find(ship => ship.mmsi == this.props.vessel.mmsi.split('MMSI:')[1]);
            this.setState({extraInfo: ship});
        });
    }


  render(){
    const { extraInfo } = this.state;
    const { navigate, state } = this.props.navigation;
    const { selectedPortCall, activeItemKey } = this.props;
    const vessel = this.props.extendedVessel ? this.props.extendedVessel : this.props.vessel;


    return(
                
      
      
      

      <View style={styles.container}>  



      
        <TopHeader title = 'Vessel Info' firstPage navigation={this.props.navigation} rightIconFunction={this.goToStateList}/>

        <ScrollView >



        <View style={styles.pictureContainer}>
          <Image
            style={{ 
            width: Dimensions.get('window').width-20,
            height: Dimensions.get('window').height/4,
            borderRadius: 5,
            }}
            source={{uri:vessel.photoURL }}  
            />
        </View>



        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{vessel.name.toString().toUpperCase()}</Text>
        </View>



      


        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>BASIC VESSEL INFORMATION </Text>
          
          {!!vessel.vesselType &&
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Vessel Type:  </Text>{vessel.vesselType.replace(/_/g, ' ')}</Text> 
          }
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>IMO:  </Text>{vessel.imo.replace('urn:mrn:stm:vessel:IMO:', '')}</Text>
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>MMSI:  </Text>{vessel.mmsi.replace('urn:mrn:stm:vessel:MMSI:', '')}</Text>
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Call Sign:  </Text>{vessel.callSign}</Text>
          {!!vessel.flag && 
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Flag: </Text>{vessel.flag}</Text>
          }
          {!!vessel.builtYear &&
          <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Built year: </Text>{vessel.builtYear}</Text>
          }
          {(!!extraInfo && !!extraInfo.length) &&
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Length: </Text>{extraInfo.length}m</Text>
          }
          {(!!extraInfo && !!extraInfo.beam) &&
            <Text style={styles.infoText}><Text style={{fontWeight: 'bold'}}>Beam: </Text>{extraInfo.beam}m</Text>
          }
        </View>



          

        <View style={styles.infoContainer}>
          <Text style={styles.titleText}> ADDITIONAL VESSEL INFORMATION </Text>
          
          <Text style={styles.infoText}>> {additionalText.toString()}</Text>

        </View>
        

        <FormLabel> <Text style={styles.titleText}>UPDATE ADDITIONAL INFORMATION </Text> </FormLabel>
        
        <FormInput
          inputStyle={styles.formContainter}
          multiline
          numberOfLines ={5}
          maxLength ={300}
          autoCorrect={false}
          underLineColorAndroid="white"
          placeholder="Tap To Add Additional Information"
          //value={this.state.comment}
          defaultValue= {additionalText}
          onChangeText={(text) => this.setState({comment:text})}
          />

        <Button
          title= "SUBMIT"
          buttonStyle={styles.buttonContainer}
          textStyle={styles.titleText}

           onPress={() =>{
            this.forceUpdate() ;
             additionalText= this.state.comment;
             this.forceUpdate() ;
             this.setState({comment:''})
              


              }}
              


          /*     this.setState({promptVisible:true})}}>
              Open prompt  */
          
              />
          

          
          
          
           

         

 {/*           <Prompt
            title="Add Additional Information"
            placeholder="Start Typing"
            visible={this.state.promptVisible}
            onCancel={() => this.setState({ 
              promptVisible: false,
              message: "You Cancelled"

            })}
            onSubmit={(value) => this.setState({promptVisible:false, message: 'You said "${value}"' })}
            
            />     */}
          <View style={{height: 282}}/>
 
        </ScrollView> 
        
        
        

      </View>



    );
    
  }

    
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.backgroundColor,
  },
  pictureContainer: {
    backgroundColor: colorScheme.backgroundColor,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  headerContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  headerText: {
    textAlign: 'center',
    color: colorScheme.quaternaryTextColor,
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: colorScheme.primaryContainerColor,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    flexDirection: 'column',
    borderRadius: 5,
  },
  infoText: {
    fontSize: 14,
    color: colorScheme.quaternaryTextColor,
  },

  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 3,
   
    backgroundColor: colorScheme.actualColor,
    borderColor: colorScheme.actualColor,
  },

  formContainter: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 3,
   
    backgroundColor: colorScheme.primaryContainerColor,
  },


  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: colorScheme.quaternaryTextColor,
  },
  
  
  
})


function mapStateToProps(state) {
    return {
        selectedPortCall: state.portCalls.selectedPortCall,
        vessel: state.portCalls.vessel,
        extendedVessel: state.vessel.vessel,
    }
}


export default connect(mapStateToProps, {
    fetchVesselFromIMO,
})(VesselInfo);

