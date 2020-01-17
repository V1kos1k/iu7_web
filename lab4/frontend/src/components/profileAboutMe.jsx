import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  profile__card: {
    height: '90%',
    minHeight: 300,
    backgroundColor: "#FCEAEA",
  },
  profile__text: {
    whiteSpace: "pre", 
    fontSize: 18,
  }
}

export default function ProfileAboutMe(props) {
  return(
    <Card style={styles.profile__card}>
      <CardActions>
        <Typography
            color="textPrimary" 
            align="center"
            variant="h5">
          О себе
        </Typography>
      </CardActions>
      <CardContent>
      <Typography
            color="textPrimary" 
            variant="body1">
          {props.aboutMe}
        </Typography>
      </CardContent>
    </Card>
  );
}