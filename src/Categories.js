import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Input, Button } from '@material-ui/core';
import TopBar from './TopBar';
import { observer } from 'mobx-react';

import './categories.css'

function EditForm({ saveValue, cancelFn }) {
   const [value, setValue] = useState(null);
   
   return (
      <div>
         <Input type="text" onChange={(e) => setValue(e.target.value)} />
         <Button color="primary" onClick={() => saveValue(value)} disabled={!value} >
            Save
         </Button>
         {cancelFn && <Button onClick={cancelFn}>
            Cancel
         </Button>}
      </div>
   )
}

function NewCategory({ saveCategory }) {
   return (
      <div>
         <h2>New Category</h2>
         <EditForm saveValue={saveCategory} />
      </div>
   )
}

class Categories extends React.Component {

   constructor (props) {
      super(props);
      props.store.feedCategories();
      this.state = {
         active: -1,
         showNewCategory: false,
         showEdit: false,
         showDetails: false,
      }
   }

   saveCategory = (name) => {
      console.log("name:::",name);
      this.props.store.addCategory(name);
      this.setState({showNewCategory: false});
   }

   editCategory = (idx, name) => {
      this.props.store.editCategory(idx,name);
      this.setShowEdit(false);
   }

   deleteCategory = () => {
      this.props.store.deleteCategory(this.state.active);
      this.setState({ active: -1 });
   }

   viewCategory = () => {
      this.setState({ showDetails: true})
      setTimeout(() =>
         this.setState({ showDetails: false}), 2000);
   }

   setShowNewCategory = (show) => {
      this.setState({ showNewCategory: show });
   }

   setActive = (event) => {
      console.log("!!!!", event.target.value);
      this.setState({ active: parseInt(event.target.value) });
   }

   setShowEdit = (show = true) => {
      this.setState({ showEdit: show });
   }

   render() {
      const { categories } = this.props.store;
      const { active, showEdit, showNewCategory, showDetails } = this.state;
      const generalActions = [{name: "New Category", action: () => this.setShowNewCategory(true)}];
      const actions = [{name: "Edit", action: this.setShowEdit},
                       {name: "Delete", action: this.deleteCategory},
                       {name: "View", action: this.viewCategory}];
 
      return (
         <div>
            <TopBar title="Categories" menu={active > -1 ? actions : generalActions } />
            <div className="categories">
               <div className="categories-list">
                  <FormControl component="fieldset">
                     <RadioGroup aria-label="category" name="category1" 
                        value={active} onChange={this.setActive}>
                        <FormControlLabel value="-1" control={<Radio />} label="Clear selection.." />
                        {categories.map(({name}, idx) =>
                           (active === idx && showEdit) ? 
                           <EditForm saveValue={(name) => this.editCategory(idx,name)} 
                              cancelFn={() => this.setShowEdit(false)}/> :
                           <>
                              <FormControlLabel key={idx} value={idx} control={<Radio />} label={name} />
                              {(active === idx && showDetails) && <span>Details will be here soon :) </span>}
                           </>
                        )}
                     </RadioGroup>
                  </FormControl>
               </div>
               {showNewCategory && <NewCategory saveCategory={this.saveCategory} />}
            </div>
         </div>
      );
   }
};

export default observer(Categories);
