let quickColor = document.getElementById("quickColor");
let customColor = document.getElementById("customColorInput");
let recentColor = document.getElementById("recentColor");
let currentColor = document.getElementById("currentColorDisplay");
let generateButton = document.getElementById("generate");
let generateX = document.getElementById("x");
let generateY = document.getElementById("y");

const table = document.getElementById("canvas")

let SelectedColor = "#f00";
currentColor.style.backgroundColor = "#f00"
customColor.value = "#ff0000";
var recentColors = new Array()

changeColor = (color) =>{
    if (color == SelectedColor){return};
    currentColor.style.backgroundColor = color;
    customColor.value = color;
}

rgbToHex = (color) =>{
    decimalToHex = (num) =>{
        num = parseInt(num);
        var hex = num.toString(16);
        if (hex.length == 1){
            hex = "0" + hex;
        }else if (hex.length == 2){
            return hex;
        }
        return "00";
    };
    getComponets = (color) =>{
        color = color.substring(4, color.length-1);
        color = color.replace(/ /g, '');
        colorArr = color.split(',');
        return colorArr;
    };
    var values = getComponets(color);
    return "#" + decimalToHex(values[0]) + decimalToHex(values[1]) + decimalToHex(values[2]);
}

changeColorRecent = (index) => {
    if (recentColors[index] == SelectedColor){return};
    currentColor.style.backgroundColor = recentColors[index];
    customColor.value = recentColors[index];
    updateRecentColors(recentColors[index]);
}

changeColorCustom = (colorCode) =>{
    if (colorCode == SelectedColor){return};
    currentColor.style.backgroundColor = colorCode;
    customColor.value = colorCode;
    updateRecentColors(colorCode);
}

updateRecentColors = (color) =>{
    if (recentColors.includes(color)){
        recentColors = recentColors.filter(function(value){ 
            return value != color;
        });
    }
    recentColors.unshift(color);
    recentColors.splice(4);
    let row = recentColor.rows[0]
    for (let i = 0, cell; cell = row.cells[i]; i++){
        cell.style.backgroundColor = recentColors[i];
    }
}



//Make all cells of table clickable
for (let i = 0, row; row = quickColor.rows[i]; i++) {
   for (let j = 0, cell;cell = row.cells[j]; j++) {
    let color = cell.style.backgroundColor
    cell.addEventListener("click", function(){
        changeColor(rgbToHex(color))
    })
   }  
}
for (let i = 0, row; row = recentColor.rows[i]; i++) {
    for (let j = 0, cell;cell = row.cells[j]; j++) {
     cell.addEventListener("click", function(){
        if (j==0){changeColorRecent(0);
        }else if (j==1){changeColorRecent(1);
        }else if (j==2){changeColorRecent(2);
        }else if (j==3){changeColorRecent(3);
        }
         ;
     })
    }  
 }

 //Setting up custom color input
customColor.addEventListener("change", function(){
    //Making Sure it always start with #
    if (customColor.value.substring(0,1) != "#"){customColor.value = "#" + customColor.value;};
    if (customColor.value.length > 9){customColor.value = customColor.value.substring(0, 9);};
    //Connecting it to its function
    changeColorCustom(customColor.value);
})

//Create workarea
generateTable = (x, y) => {
    for(i=0; i<x; i++){
        let row = table.insertRow(i);
        for(j=0; j<y; j++){
            let cell = row.insertCell(j)
            cell.class = "cell"
        }
    }
}


generateButton.addEventListener("click", function(){
    generateTable(generateX.value, generateY.value)
})