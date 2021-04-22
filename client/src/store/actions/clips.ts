export enum ClipActionTypes {
  SwitchHero = 'SWITCH_HERO',
  SwitchTeam = 'SWITCH_TEAM',
  SetPercentage = 'SET_PERCENTAGE',
  SetIsAlive = 'SET_IS_ALIVE',
  SetUsername = 'SET_USERNAME',
  SetHealth = 'SET_HEALTH',
  SetWinner = 'SET_WINNER',
}

export interface ClipAction {
  type: ClipActionTypes;
}
