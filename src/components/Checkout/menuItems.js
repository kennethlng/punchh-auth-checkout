import MenuItem from '../../models/MenuItem';

var whiteRice = new MenuItem("White rice", 1, 2.86, "M", 3419, "800", "152", "1.0");
var brownRice = new MenuItem("Brown rice", 1, 7.86, "M", 3418, "800", "152", "2.0");
var freeRice = new MenuItem("Free rice", 1, 2.86, "D", 3419, "800", "152", "3.0"); 

export const menuItems = [
    whiteRice,
    brownRice,
    freeRice
]