import { observable, action, makeObservable } from "mobx";

export class Categories {
   
   categories = [];

   constructor() {
      makeObservable(this, {
         categories: observable,
         feedCategories: action,
         addCategory: action,
         deleteCategory: action,
         editCategory: action,
     });
     const data = [{name: "East", active: false}, {name: "North", active: false}, {name: "Asia", active: false}, {name: "Europ", active: false}];
     localStorage.setItem("categories", JSON.stringify(data));
   }

   feedCategories = () => {
      this.categories = JSON.parse(localStorage.getItem("categories"));
   }

   saveCategories = () => {
      localStorage.setItem("categories", JSON.stringify(this.categories));
   }

   addCategory = name => {
      this.categories.push({ name });
      console.log("categories", this.categories);
      this.saveCategories();
   }

   deleteCategory = index => {
      if(index > -1) {
         this.categories.splice(index, 1);
      }
      this.saveCategories();
   }

   editCategory = (index, name) => {
      this.categories[index].name = name;
      this.saveCategories();
   }
}
const categoriesStore = new Categories();
export default categoriesStore;