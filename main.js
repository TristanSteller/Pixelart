let quickColor = document.getElementById("quickColor");
let customColor = document.getElementById("customColorInput");
let recentColor = document.getElementById("recentColor");
let currentColor = document.getElementById("currentColorDisplay");


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

changeColorCustom = (colorCode) =>{
    if (colorCode == SelectedColor){return};
    currentColor.style.backgroundColor = colorCode;
    customColor.value = colorCode;
    updateRecentColors(colorCode)
}

updateRecentColors = (color) =>{
    console.log(color)
    console.log(recentColors)
    if (recentColors.includes(color)){
        recentColors = recentColors.filter(function(value){ 
            return value != color;
        });
    }
    recentColors.unshift(color)
    recentColors.splice(4)
    console.log(recentColors)
}



//Make all cels of table clickable
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
     let  currCell = row.cells[j]
     let color = cell.style.backgroundColor;
     cell.addEventListener("click", function(){
         changeColor(rgbToHex(color));
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