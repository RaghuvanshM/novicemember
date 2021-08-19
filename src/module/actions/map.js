import { createElement } from "react";
import { createAction } from "redux-act";

export const convertLatlng = createAction();
export const pickupLatLong = createAction();
export const dropuLatLong = createAction(); 
export const pickupAddress = createAction();
export const dropAddress = createAction();