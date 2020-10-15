import React from 'react';

import './TopBar.css'
import { Button } from '@material-ui/core';

function TopBar({title, menu}) {
   return (
      <div className="top-bar">
         <div className="title" onClick={() => window.location.hash = "/"}>
            {title}
         </div>
         <div className="menu">
            {menu.map(({name, action}) => 
               <Button  key={name}
                  color="secondary" 
                  variant="text" 
                  onClick={action}> {name} </Button>)}
         </div>
      </div>
   );
}

export default TopBar;
