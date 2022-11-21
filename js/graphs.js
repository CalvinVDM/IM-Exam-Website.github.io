const PLAVEHOLDER_DATA = [
    { id: "1", name: "South Africa", price: "22"},
    { id: "2", name: "USA", price: "55"},
    { id: "3", name: "UAE", price: "11"},
    { id: "4", name: "China", price: "8"},
    { id: "5", name: "Brazil", price: "14"},
];

//API FETCH
async function getData() {
    const api_url = "https://makeup-api.herokuapp.com/api/v1/products.json";
    const api_data = await fetch(api_url);
    const api_json = await api_data.json();
    const PLAVEHOLDER_DATA = api_json.slice(0,6);
    console.log(api_data);


let selected = PLAVEHOLDER_DATA;


const MARGINS = { top:20, bottom: 20}
const WIDTH = 600;
const HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

const chartContainer = d3.select('svg')
.attr('width', WIDTH)
.attr('height', HEIGHT + MARGINS.top + MARGINS.bottom)
;

const chart = chartContainer.append('g');

//CREATE SCALES
const xScale = d3.scaleBand().rangeRound([0 , WIDTH]).padding(0.1);
const yScale = d3.scaleLinear().range([HEIGHT,0]);

//CREATE DOMAIN
xScale.domain(PLAVEHOLDER_DATA.map((d) => d.name));
yScale.domain([0, d3.max(PLAVEHOLDER_DATA, (d) => d.price) + 1]);

function render() {
        //DRAW BARS
    chart.selectALL('.bar')
    .data(selected, data => data.id)
    .enter()
    .append('rect')
    .classed('bar' , true)
    .attr('width', xScale.bandwidth())
    .attr('height', data => HEIGHT - yScale(data.price))
    .attr(x , data => xScale(data.name))
    .attr(y , data => yScale(data.price))
    ;

    //REMOVE BARS
    chart.selectALL('.bar')
    .data(selected, data => data.id)
    .exit()
    .remove()
    ;

    //DRAW LABELS
    chart.selectALL('.label')
    .data(selected, data => data.id)
    .enter()
    .append('text')
    .text(data => data.price)
    .attr('x', data => xScale(data.name) + (xScale.bandwidth()/2)) 
    .attr('y', data => yScale(data.price) - 10)
    .attr('text-anchor' , 'middle')
    .classed('label', true)
    ;

    //REMOVE LABEL
    chart.selectALL('.label')
    .data(selected, data => data.id)
    .exit()
    .remove()
    ;
}


//DRAW X AXIS
chart.append('g')
.call(d3.axisBottom(xScale).tickSizeOuter(0))
.attr('color', "#a1a1a1")
.attr('transform', `translate(0, ${HEIGHT}`)
;

//INTERACTIVE IMP
render();
let unselect = [];

const countryList = d3.select('#data')
.select('ul')
.selectALL('li')
.data(PLAVEHOLDER_DATA)
.enter()
.append('li')
;

countryList.append('span')
.text(data => data.name);

//CHECK BUTTON
countryList.append('input')
.attr('type', 'checkbox')
.attr('checked', true)
.on('change', (event, info) => {
    if (unselect.indexOf(info.id) === -1 ){
        unselect.push(info.id);
    }
    else {
        unselect = unselect.filter((id) => id !== info.id);
    }
    selected = PLAVEHOLDER_DATA.filter(
        (d) => unselect.indexOf(d.id) === -1
    ); 
    render();
})
;

}

getData()