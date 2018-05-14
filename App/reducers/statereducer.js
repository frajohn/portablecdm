import { ADD_FAVORITE_STATE, REMOVE_FAVORITE_STATE, REPLACE_FAVORITE_STATES } from '../actions/types';
import { REHYDRATE } from 'redux-persist';
import stateCatalogue from './state_catalogue.json';

const INITIAL_STATE = { 
  stateCatalogue: stateCatalogue,
  favoriteStates: ['Anchoring_Commenced', 'Anchoring_Completed'
, 'AnchoringOp_Requested', 'AnchoringOp_ReqReceived', 
'AnchoringOp_Confirmed', 'AnchoringOp_Denied', 'AnchoringOp_Cancelled',
'Arrival_Vessel_Berth', 'Arrival_Vessel_AnchorageArea', 
'Arrival_Vessel_LOC', 'Arrival_Vessel_ETugZone', 'Arrival_Vessel_PilotBA',
'Arrival_Vessel_PortArea', 'Arrival_Vessel_TrafficArea', 
'Arrival_Vessel_RendezvArea', 'Arrival_Vessel_TugZone', 
'BerthShifting_Commenced', 'BerthShifting_Completed', 'BerthShifting_Requested',
'Bunkering_Requested', 'CargoOp_Requested', 'DepartureAnchoringOp_Commenced',
'DepartureAnchoringOp_Completed', 'DepartureAnchoringOp_Confirmed', 
'DepartureAnchoringOp_Denied', 'DepartureAnchoringOp_Requested', 
'DepartureAnchoringOp_Cancelled', 'Departure_Vessel_Berth', 
'Departure_Vessel_AnchorageArea', 'Departure_Vessel_TugZone', 
'Departure_Vessel_ETugZone', 'Departure_Vessel_PilotBA', 
'Departure_Vessel_TrafficArea', 'Departure_Vessel_PortArea',
'Departure_Vessel_RendezvArea', 'Departure_Vessel_LOC',
'EscortTowage_Requested', 'Forklift_Requested', 'Gangway_Requested',
'GarbageOp_Requested', 'IceBreaking_Requested', 'LoadingOp_Requested',
'LubeOil_Requested', 'MooringOp_Requested', 'Pilotage_Requested', 
'PortVisit_Requested', 'PostCargoSurvey_Confirmed', 'PreCargoSurvey_Requested',
'Provision_Requested', 'ReadyToSailOp_Commenced', 'ReadyToSailOp_Completed',
'Security_Requested', 'SlopOp_Requested', 'SludgeOp_Requested', 
'Tours_Requested', 'Towage_Requested', 'UnMooringOp_Requested',
'UnloadingOp_Requested', 'VTSAreaDepart_Requested', 'VTSAreaEntry_Requested',
'WaterOp_Requested'],
  stateById: function(id) {
    return this.stateCatalogue.find(stateDef => stateDef.StateId === id);
  },
  allowedToReportState: function(role, stateId) {
    return true;
  }
};

// This only works because
INITIAL_STATE.stateById = INITIAL_STATE.stateById.bind(INITIAL_STATE);

const stateReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case ADD_FAVORITE_STATE:
      return { ...state, favoriteStates: [...state.favoriteStates, action.payload] }
    case REMOVE_FAVORITE_STATE:
      return { ...state, favoriteStates: state.favoriteStates.filter(elem => action.payload !== elem)}
    case REPLACE_FAVORITE_STATES:
      return { ...state, favoriteStates: action.payload}
    default:
      return state;
  }
}

export default stateReducer;