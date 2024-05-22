// import React, { useState } from 'react';

// const CustomSelect = ({ options }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   const toggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const onOptionClicked = value => {
//     setSelectedOption(value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="custom-select">
//       <button className={`select-button ${isOpen ? 'active' : ''}`} onClick={toggle}>
//         <span className="selected-value">{selectedOption}</span>
//         <span className="arrow"></span>
//       </button>
//       <ul className="select-dropdown">
//         {options.map(option => (
//           <li key={option} onClick={onOptionClicked.bind(null, option)}>
//             {option}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const options = ['Mangoes', 'Apples', 'Oranges'];

// const App = () => {
//   return (
//     <div className="App">
//       <CustomSelect options={options} />
//     </div>
//   );
// }

// export default App;


// .custom-select {
//     position: relative;
//     display: inline-block;
//   }
  
//   .select-button {
//     background-color: #f0f0f0;
//     border: none;
//     padding: 0.5em 1em;
//     border-radius: 0.25rem;
//     cursor: pointer;
//     position: relative;
//     z-index: 1;
//     transition: background-color 0.3s ease;
//   }
  
//   .select-button.active {
//     background-color: #e0e0e0;
//   }
  
//   .select-button .selected-value {
//     text-align: left;
//   }
  
//   .select-button .arrow {
//     border-left: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-top: 6px solid #000;
//     transition: transform ease-in-out 0.3s;
//     position: absolute;
//     right: 1em;
//     top: 50%;
//     transform: translateY(-50%) rotate(180deg);
//   }
  
//   .select-button.active .arrow {
//     transform: translateY(-50%);
//   }
  
//   .select-dropdown {
//     background-color: #fff;
//     border: 1px solid #caced1;
//     border-radius: 0.25rem;
//     padding: 0;
//     position: absolute;
//     top: 100%;
//     left: 0;
//     width: 100%;
//     list-style: none;
//     margin: 0;
//     z-index: 0;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     display: none;
//   }
  
//   .select-dropdown.active {
//     display: block;
//   }
  
//   .select-dropdown li {
//     padding: 0.5em 1em;
//     border-bottom: 1px solid #caced1;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }
  
//   .select-dropdown li:last-child {
//     border-bottom: none;
//   }
  
//   .select-dropdown li:hover,
//   .select-dropdown li.active {
//     background-color: #e0e0e0;
//   }