 // Create parent div element
 var parentDiv = document.createElement('div');
 parentDiv.classList.add('parent');
 
 // Create loader, wait message, and word elements
 var loaderDiv = document.createElement('div');
 loaderDiv.classList.add('loader');
 
 var waitDiv = document.createElement('div');
 waitDiv.classList.add('wait');
 waitDiv.textContent = 'please wait...';
 
 var wordDiv = document.createElement('div');
 wordDiv.classList.add('word');
 
 // Append elements to the parentdiv
 parentDiv.appendChild(loaderDiv);
 parentDiv.appendChild(waitDiv);
 parentDiv.appendChild(wordDiv);
 
 // Append the parent div to the document body
 document.body.appendChild(parentDiv);
 
 // Create style element
 var style = document.createElement('style');
 style.textContent = `
 
   body{
    height: 100%;
    background-color: #000;
    display: flex;
    flex-direction: column;
   }

   .parent {
    display: none;
     margin-top: 150px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
 
   .word {
     padding: 0 40px;
     text-align: center;
     margin: 50px auto 0 auto;
     color: white;
     font: 700 normal 2.5em 'tahoma';
     text-shadow: 5px 2px #222324, 2px 4px #222324, 3px 5px #222324;
   }
 
   .wait{
     margin-top: 20px;
     color: white;
   }
   
   .loader {
     width: 65px;
     aspect-ratio: 1;
     position: relative;
   }
   
   .loader:before,
   .loader:after {
     content: "";
     position: absolute;
     border-radius: 50px;
     box-shadow: 0 0 0 3px inset #fff;
     animation: l4 2.5s infinite;
   }
   .loader:after {
     animation-delay: -1.25s;
   }
   @keyframes l4 {
     0% {
       inset: 0 35px 35px 0;
     }
     12.5% {
       inset: 0 35px 0 0;
     }
     25% {
       inset: 35px 35px 0 0;
     }
     37.5% {
       inset: 35px 0 0 0;
     }
     50% {
       inset: 35px 0 0 35px;
     }
     62.5% {
       inset: 0 0 0 35px;
     }
     75% {
       inset: 0 0 35px 35px;
     }
     87.5% {
       inset: 0 0 35px 0;
     }
     100% {
       inset: 0 35px 35px 0;
     }
   }
 `;
 
 // Append style element to the head of the document
 document.head.appendChild(style);
 
 // Function to update word
 var words = ['Predictions powered by the crowd...', 'Harness the wisdom of top forecasters...', 'Data-driven insights for smarter decisions...', 'The future of collaborative forecasting...'],
     part,
     i = 0,
     offset = 0,
     len = words.length,
     forwards = true,
     skip_count = 0,
     skip_delay = 15,
     speed = 70;
 
 var wordflick = function () {
     setInterval(function () {
         if (forwards) {
             if (offset >= words[i].length) {
                 ++skip_count;
                 if (skip_count == skip_delay) {
                     forwards = false;
                     skip_count = 0;
                 }
             }
         }
         else {
             if (offset == 0) {
                 forwards = true;
                 i++;
                 offset = 0;
                 if (i >= len) {
                     i = 0;
                 }
             }
         }
         part = words[i].substr(0, offset);
         if (skip_count == 0) {
             if (forwards) {
                 offset++;
             }
             else {
                 offset--;
             }
         }
         wordDiv.textContent = part;
     }, speed);
 };
 
 // Start word flicker
wordflick();



function hidePreloader() {
    var parentDiv = document.querySelector('.parent');
    parentDiv.style.opacity = '1'; 
    setTimeout(function() {
        parentDiv.style.display = 'flex'; 
        document.body.style.removeProperty('height');
        document.body.style.removeProperty('background-color');
        document.body.style.removeProperty('display');
        document.body.style.removeProperty('flex-direction');
    }, 100); 
}


document.addEventListener('DOMContentLoaded', () => {
    hidePreloader();
});

// Fallback: If all external resources are loaded and the DOMContentLoaded event doesn't fire,
// hide the preloader when the window's load event is triggered.
window.addEventListener('load', hidePreloader);
