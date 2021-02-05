import React from 'react';
import 'antd/dist/antd.css';

import { Loader } from "semantic-ui-react";

export default function LoadingIndicator () {

  return (
    <Loader active inline="centered" size="massive" />
  );
}