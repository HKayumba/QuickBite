import { Redirect, Slot } from "expo-router";
import React from "react";

const _layout = () => {
    const isAuthenticated = false; 

    if(!isAuthenticated) return <Redirect href="/sign-in" />;
  // Slot is used to render the current route's component
  return <Slot />;
};

export default _layout;
