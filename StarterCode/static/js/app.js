//  function to create bar chart and bubble chart
function metadata( sample){ 
    d3.json ("samples.json").then((data) => {
        var metadata = data.metadata;
        var filter_id_array = metadata.filter(sampleobject=>sampleobject.id == sample)
        var  filter_id_result = filter_id_array[0];
        var Panel = d3.select("#sample-metadata");
        Panel.html("");
        Object.entries(filter_id_result).forEach(([key,value]) => {
        Panel.append("h6").text(`${key}:${value}`);
        });
    });
}


function bubblebarbuild( sample){ 
    d3.json ("samples.json").then((data) => {
        var bellybutton_id = data.samples;
        var filter_id_array = bellybutton_id.filter(sampleobject=>sampleobject.id == sample)
        var  filter_id_result = filter_id_array[0];
        var  otu_ids = filter_id_result.otu_ids;
        var  otu_labels = filter_id_result.otu_labels;
        var sample_values = filter_id_result.sample_values; 
        
var bar_data = [{
    x:sample_values.slice(0,10).reverse (),
    y:otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    type:"bar",
    orientation:"h"

}
];

// define plot layout
var barlayout = {
    title:"TOP 10 Bacteria Cultures Found",
    margin:{t:30,l:150}
    
};

Plotly.newPlot("bar",bar_data,barlayout);

//build bubble chart

var layoutbubble = {
    margin:{t:0},
    xaxis:{ title:"OTU id"},
    hovermode:"closest",
};
var DataBubble = [
{
    x:otu_ids,
    y:sample_values,
    mode:"markers",
    text:otu_labels,
    marker:{
        color:otu_ids,
        size:sample_values,
        colorscale:"Earth"
    }
}];
Plotly.newPlot("bubble",DataBubble,layoutbubble);

    });
    }
function inti() {
    // grab reference to dropdown select element
    var selector = d3.select ("#selDataset");
    // use list of sample names to populate select options
    d3.json ("samples.json").then((data) => {
        var names = data.names;
        names.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value",sample);
            
        });
    const first_name = names[0];
    bubblebarbuild(first_name);
    metadata(first_name);
    });
}
function change( nextmove){
    bubblebarbuild(nextmove);
    metadata(nextmove);  
} 
inti();


