import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from "react-router-dom";

import classnames from 'classnames';
import './ProfileDesksPanel.css';
import MiniDesk from '../MiniDesk/MiniDesk.js';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function CenteredTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const all = <GridList cellHeight='auto' spacing={8} cols={3}>
                {props.allDesk.map((tile,index) => (
                  <GridListTile key={index} cols={1}>
                    <Link to = {`/desk/${tile.deskId}`} className="desk-panel__link">
                      <MiniDesk deskLabel={tile.deskLabel}
                                isPrivate={tile.isPrivate}
                                players={tile.players}
                                empty={tile.empty}
                                age={tile.age}
                                genre={tile.genre}
                                game={tile.game}
                                image={tile.image}/>
                      </Link>
                  </GridListTile>
                ))}
              </GridList>;

  const created = <GridList cellHeight='auto' spacing={8} cols={3}>
                    {props.createdDesk.map((tile,index) => (
                      <GridListTile key={index} cols={1}>
                         <Link to = {`/desk/${tile.deskId}`} className="desk-panel__link">
                            <MiniDesk deskLabel={tile.deskLabel}
                                      isPrivate={tile.isPrivate}
                                      players={tile.players}
                                      empty={tile.empty}
                                      age={tile.age}
                                      genre={tile.genre}
                                      game={tile.game}
                                      image={tile.image}/>
                          </Link>
                      </GridListTile>
                    ))}
                  </GridList>;

  const wait = <GridList cellHeight='auto' spacing={8} cols={3}>
                {props.waitDesk.map((tile,index) => (
                  <GridListTile key={index} cols={1}>
                    <Link to = {`/desk/${tile.deskId}`} className="desk-panel__link">
                      <MiniDesk deskLabel={tile.deskLabel}
                                isPrivate={tile.isPrivate}
                                players={tile.players}
                                empty={tile.empty}
                                age={tile.age}
                                genre={tile.genre}
                                game={tile.game}
                                image={tile.image}/>
                    </Link>
                  </GridListTile>
                ))}
              </GridList>

  let tabsPanel;
  let tab;
  if (props.isUsername) {
    tab = <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{indicator: '#EB5757'}}
          >
            <Tab label="Все доски" />
            <Tab label="Созданные доски" />
            <Tab label="В обработке" />
          </Tabs>;
    tabsPanel =  <React.Fragment>
                  <TabPanel value={value} index={0}>
                    {all}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {created}
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {wait}
                  </TabPanel>
                  </React.Fragment>;
  } else {
    tab = <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{indicator: '#EB5757'}}
          >
            <Tab label="Все доски" />
            <Tab label="Созданные доски" />
          </Tabs>;
    tabsPanel =  <React.Fragment>
                  <TabPanel value={value} index={0}>
                    {all}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {created}
                  </TabPanel>
                  </React.Fragment>;}

  return (
    <React.Fragment>
      <div className={classnames("profile-desk-panel", props.modifiers)}>
        <Paper className="profile-desks-panel__paper" className="profile-desk-panel-paper">
          {tab}
        </Paper>
          {tabsPanel}
      </div>
    </React.Fragment>
  );
}