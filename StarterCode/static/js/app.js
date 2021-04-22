// create bar chart
var bar_data = [{
    x:sample_values.slice(0,10).reverse (),
    y:ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    type:"bar",
    orientation:"h"

}
];

// define plot layout
var barlayout = {
    title:"TOP 10 Bacteria Cultures Found",
    margin:{t:30,l:150}
    
};
//build bubble chart

var layoutbubble ={
    margin:{t,0},
    xaxis:{ title:"id"},
    hovermode:"closest",
};
var DataBubble = [
{
    x:id,
    y:sample_values,
    text:"markers",
    marker:{
        color:id,
        size:sample_values
    }
}
];
