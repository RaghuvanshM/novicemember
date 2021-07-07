import * as reducers from '../reducers';
// export interface IStoreState {
//   readonly user: reducers.IUserReducer;
//   readonly userManagement: reducers.IUserManagementReducer;
//   readonly settings: reducers.ISettingsReducer;
//   readonly airquality: reducers.IAirQualityIndexReducer;
//   readonly zones: reducers.IZoneReducer;
// }
export interface ISagaAction<T> {
  readonly type: string;
  readonly payload: T;
  readonly error: boolean;
}
