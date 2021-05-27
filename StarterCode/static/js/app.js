// Create function to read in data
function init() {
    d3.json("../data/samples.json").then(data => {
        console.log(data);
        // Create dropdown list/option element
        let mySelect = d3.select("#selDataset");
        data.names.forEach(element => {
            mySelect.append("option").attr("value", element).text(element);
    });
        // Set the value of the option to your filter value
        let str_id = mySelect.property("value");

        // Filter the sample data, convert string id to int id, then filter the demographics data
        let sample = data.samples.filter(sample => sample.id === str_id);
        console.log(sample);
        let id = parseInt(str_id);
        let demo = data.metadata.filter(demographics => demographics.id === id);
        console.log(demo);
        
        
        
        mySelect.on("change", () =>
        updatePlots(data));
});


// for demo info: filter metadata for id
function metadata(sample) {
    d3.json("../data/samples.json").then(data => {
        
        // let demographics = metadata.filter(demographics => demographics.id === mdata_sample);
        let header = d3.select("#sample-metadata");
        header.html("");
        Object.entries(demo).forEach(([k, v]) => {
            header.append("option").text(`${k}: ${v}`); //.attr("value", [k, v])
        });
    });
};

function charts() {
    d3.json("../data/samples.json").then(data => {
        let samples = data.samples;
        let csample_results = samples.filter(sample => sample.id === id);
        let otu = csample_results.map((otus) => otus.otu_ids);
        let svalue = csample_results.map((svalues) => svalues.sample_values);
        let olabel = csample_results.map((olabels) => olabels.otu_labels);
        console.log(otu);
        console.log(svalue);
        console.log(olabel);
    });
};








    // filter samples to 940
    // for bubble: 
    // y vals and size are the sample_values
    // x vals are otu_ids
    // text is otu_labels plus the value iirc

    // for hbar
    // xvals are sample_values
    //y vals are otu_ids

  };

init ();