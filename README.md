# Tip 'em
![alt text](https://img.shields.io/badge/uses-React-blue.svg)  

Front end library to allow for component development. Used an additional NPM package called react-rangeslider for a stylized range slider with improved functionality over the Materialize range slider.

![alt text](https://img.shields.io/badge/uses-Materialize-blue.svg) 

CSS library for quicker and more consistent styling of the UI.

![alt text](https://img.shields.io/badge/uses-JavaScript-blue.svg) 

Standard ES6 JavaScript to drive the calculations of the tool.

![alt text](https://img.shields.io/badge/uses-Responsive_Design-blue.svg) 

Responsive design to accommodate various mobile device sizes as well as resizing on a pc window. This allows the visual elements to remain in the same relative position regardless of the device.



The application is designed to provide a quick and easy way to calcaute a tip.Ideally this would be a mobile application. It makes more sense to have it on the device opposed to relying on a network connection. Despite that fact, I used responsinve design so that the app would adjust on a pc screen as it resized.

There are three modes to this application:
- Total Sum
- Even Steven
- Itemize

In all three modes the user has the option of tipping on the total or the total without the tip. Clicking on the Include Taxes switch will determine if the tip includes the taxes. The later option requires that the tip total be entered into the field. If the user will tip on the total including tax, then the tax amount is not required.

#### Total Sum 
Use this mode for when you are not looking to split the bill at all. You simply enter in the total amount of the bill, the total amount of taxes for the bill and then slide the tip slider to the desired percentage. Below the slider, the total amount of the tip and the total amount due is displayed. 

#### Even Steven 
This mode splits the bill into even portions regardless if you ordered the lobster or ordered the side salad. Slide the Numbe rin Party slider to the correct number, up to 12 people, enter in the total amount of the bill, the total amount of taxes for the bill and then slide the tip slider to the desired percentage. Below the slider, the total amount of the tip and the total amount due is displayed. 

#### Itemize
This is a tricky mode just because of the possibilities in the bill. The total amount and taxes are needed in order to get an accurate tax percentage even if the bill does not include the taxes before the tip. After the total and taxes are entered the user slides the tip percent to the desired amount and enters the dollar value of the first item for an individual in the item price field. If the item was shared, in the insatnce of an appetizer, the amount can be split evenly by using the slider just above the item price. Once the item price is enetered the user clicks on the Add Item button. This will start a subtotal of that individual's bill and shows you how much of the original bill still remains. Continue to enter in the remaining items for that person by repeating the steps.

When you have finished the total for that person (and giving them the total) the user can click on the Clear button to reset the subtotal back to zero. This does not reset the amount remaining on the bill. Start adding the totals for the next individual using the same steps. Keep in mind you will still need to add the splitting of the appetizers if the individual is responsible for that part of the bill.

The Reset button clears out the individual sub total and also set the remaining balance back to the total in the event the user wants to re-do the calculations.
