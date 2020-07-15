import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './ProfileAboutMe.css';


export default function ProfileAboutMe(props) {
  return(
    <Card className="profile-aboutme__card">
      <CardContent>
          <h5>О себе</h5>
          <p>{props.aboutMe}</p>
      </CardContent>
    </Card>
  );
}