// Create function to read in data
function init() {
    d3.json("../data/samples.json").then(data => {
        console.log(data);

        // Create dropdown list/option element
        let mySelect = d3.select("#selDataset");
        data.names.forEach(element => {
            mySelect.append("option").attr("value", element).text(element);
        });
   
        
        // Add change event function for dropdown
        mySelect.on("change", () => handleChange(mySelect));

        // Set the value of the option to your filter value
        let str_id = mySelect.property("value");

        // Filter the sample data, convert string id to int id, then filter the demographics data
        let sample = data.samples.filter(sample => sample.id === str_id);
        console.log(sample);
        let samp_result = sample[0];
        console.log(samp_result);

        let id = parseInt(str_id);

        let demo = data.metadata.filter(dgraphics => dgraphics.id === id);
        console.log(demo);
        let demographics = demo[0];
        console.log(demographics);

        // Create new arrays that we'll use to make our graphs
        let otuIDs = sample.map((otus) => otus.otu_ids);
        let svalue = sample.map((svalues) => svalues.sample_values);
        let olabel = sample.map((olabels) => olabels.otu_labels);
        console.log(otuIDs);
        console.log(svalue);
        console.log(olabel);

        // Run our charts and metadata functions
        metadata(demographics);
        charts(otuIDs, svalue, olabel);
});

    // Create metadata function
    function metadata(demographics) {
        let header = d3.select("#sample-metadata");
        header.html("");
        Object.entries(demographics).forEach(([k, v]) => {
            header.append("option").text(`${k}: ${v}`);
        });
 };

};
        
    // Create plot function, starting with labels
    function charts(otuIDs, svalue, olabel) {
        otu = otuIDs[0].slice(0, 10);
        values = svalue[0].slice(0, 10);
        labels = olabel[0].slice(0, 10);
   

        // Create horizontal bar chart
        let hbar = {
            type: "bar",
            x: values,
            y: otu,
            text: labels,
            orientation: "h",
            width: 50,
        };

        let hbarlayout = {
            title: "Top 10 OTUs Per Individual",
            xaxis: {
                title: "Sample Value"
            },
            yaxis: {
                title: "OTU ID"
            },
        }

        let hbarchart = [hbar];
        Plotly.newPlot("bar", hbarchart, hbarlayout);

        // Create bubble chart
        let bubble = {
            x: otu,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: values, color: otu,
            }
        };

        let bubblelayout = {
            title: "OTU Samples",
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Sample Value"
            },
        }

        let bubblechart = [bubble];
        Plotly.newPlot("bubble", bubblechart, bubblelayout);
 };
    // Create change function
    handleChange = () => {
        d3.event.preventDefault();
        let the_id = d3.select("#selDataset").property("value");
        init(the_id);
     };

init ();