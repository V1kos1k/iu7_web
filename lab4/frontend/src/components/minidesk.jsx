import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ChipsArray from './Chips.jsx'

const styles = {
    minidesk__card: {
        height: 180,
        width: '100%',
        backgroundColor: "#fffff",
    },  
    desk__image: {
        width: 32,
        height: 32,
    },
    desk__content: {
        paddingTop: '1%',
    },
    header__content: {
        height: 20,
    },
    typ_a: {
        overflow: 'auto',
        display: 'flex',
        '&::WebkitScrollbar': {
            height: '0.2em'
          }
    }
}

export default function MiniDesk(props) {
    const tags = [];
    tags.push(...props.genre);
    tags.push(...props.game);
    return(
        <Card style={styles.minidesk__card}>
            <CardHeader
                avatar=
                {props.image ? <Avatar style={styles.desk__image} src={"data:image/png;base64," + `${props.image}`} /> : <img style={styles.desk__image} src={require('../img/missile.png')} />}
                title= {<Typography 
                            color="textPrimary" 
                            variant="h6"
                            noWrap
                            style={styles.typ_a}>
                            {props.deskLabel.length > 10 ? props.deskLabel.substr(0, 10)+'...' : props.deskLabel}
                        </Typography> 
                        }
                action = {props.isPrivate ? <LockIcon /> : <LockOpenIcon />}
                style = {styles.header__content}
            />
            <CardContent style = {styles.desk__content}>
                <Typography 
                    color="textPrimary" 
                    variant="body1">
                    Игроков: {props.players}
                </Typography>
                <Typography 
                    color="textPrimary" 
                    variant="body1">
                    Свободных мест: {props.empty}
                </Typography>
                <Typography 
                    color="textPrimary" 
                    variant="body1">
                    Возраст: {props.age[0]} - {props.age[1]}

                </Typography>
                <ChipsArray tags={ tags }/>
            </CardContent>
        </ Card>
    )
}