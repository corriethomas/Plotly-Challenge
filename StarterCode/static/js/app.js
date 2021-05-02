updatePlots = (data) => {
    let id = d3.event.target.value;
    let sample = data.samples.filter(sample => sample.id === id);
    let xBubble = sample.otu_ids;
    let yBubble = sample.sample_values;
}

d3.json("../data/samples.json").then(data => {
    console.log(data);

    // filter samples to 940
    // for bubble: 
    // y vals and size are the sample_values
    // x vals are otu_ids
    // text is otu_labels plus the value iirc

    // for hbar
    // xvals are sample_values
    //y vals are otu_ids

    // for demo info: 
    // filter metadata for id

    //for ddl
    //create an option element for all names
    //be sure to set the value of the option to your filter value

    let mySelect = d3.select("#selDataset");
    // mySelect.append("option").attr("value", "set your value").text("set our text");

    data.names.forEach(element => {
        mySelect.append("option").attr("value", element).text(element);
    });

    mySelect.on("change", () =>
    updatePlots(data));
});


