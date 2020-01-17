import React from 'react';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import TextField from "@material-ui/core/TextField";


const styles = {
  filter__card: {
    width: '100%',
    backgroundColor: '#FCEAEA',
  },
  filter__label_color: {
    color: 'rgba(0, 0, 0, 0.64)' ,
  },
};

export default function Filter(props) {
  const open = Boolean(props.anchorEl);

  const [age, setAge] = React.useState(props.age);
  const handleOnAgeChange = (event, newAge) => {
    setAge(newAge);
    props.handleOnAgeChange(newAge);
  };

  return (
      <Popper  open={open} 
                anchorEl={props.anchorEl}
      >
        <Card style={styles.filter__card}>
          <CardContent>
                <h3>Искать</h3>
                <p style={ styles.filter__label_color }>Предпочтительный пол:</p>
                <RadioGroup 
                    aria-label="position" 
                    name="position" 
                    value={props.gender} 
                    onChange={props.handleOnGenderChange} 
                    row
                >
                  <FormControlLabel
                      value='0'
                      control={<Radio  />}
                      label="Мужской"
                      labelPlacement="end"
                      style={styles.filter__label_color}
                  />
                  <FormControlLabel
                      value='1'
                      control={<Radio  />}
                      label="Женский"
                      style={styles.filter__label_color}
                      labelPlacement="end"
                  />
                  <FormControlLabel
                      value='2'
                      control={<Radio  />}
                      label="Неважно"
                      style={styles.filter__label_color}
                      labelPlacement="end"
                  />
                </RadioGroup>
                
                <p style={ styles.filter__label_color }>Возраст:</p>
                <Slider
                        value={age}
                        color='secondary'
                        onChange={handleOnAgeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={[{value: 0, label: '0'}, {value: 100, label: '100'}]}
                    />
                <TextField
                        label="Введите город"
                        margin="dense"
                        fullWidth
                        inputProps={{ maxLength: 30 }}
                        value = {props.city}
                        onChange={props.handleOnInputCity}
                    />
          </CardContent>
        </Card>
      </Popper>
  );
}