import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

const styles = {
    NotFound__card: {
        minWidth: '70%',
        backgroundColor: "#fffff",
    },
    home__button: {
        minWidth: 125,
        align: "center",
        marginTop: 15,
        backgroundColor: "#EB5757",
        borderRadius: 10,
        color: "white",
        '&:hover': {
          backgroundColor: "#EB7D7D",
          color: '#FFF',
        },
        fontStyle: "normal",
        fontWeight: "bold",  
        textTransform: 'capitalize',
        fontSize: 16,
      }
}

export default function NotFound () {
    return(
      <React.Fragment>
        <Grid container justify="center"> 
            <Card style={styles.NotFound__card}>
                <CardContent>
                    <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center">
                        <h2>Ой-ой! А страницы такой нет!</h2>
                        <img src={require('../img/itsfine.svg')} style = {{height: '100%', width:420}}/>
                        <Typography 
                                color="textPrimary" 
                                align="center"
                                style={{lineHeight: "40px", fontSize: "18px"}}>
                            Мы не смогли найти запрашиваемую Вами страницу.<br />
                            Но все в порядке, можно просто вернуться домой!<br />
                        </Typography>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button 
                                    variant="contained"
                                    style={styles.home__button}>
                                Домой
                            </Button>
                        </Link>
                    </Grid>
                </CardContent>
            </Card>
        </Grid> 
      </React.Fragment>
    );
}