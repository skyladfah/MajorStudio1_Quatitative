/* global d3*/
/* global concole*/
/* global width*/
/* global height*/

// width = window.innerWidth;
// height = window.innerHeight;

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(cityName).style.display = "block";  
}

width = "1000";
height = "650";

const container = document.querySelector("#viz");
const pre = document.querySelector(".pre");
const next = document.querySelector(".next");
const president = document.querySelector(".president");
const amountWomen = document.querySelector(".amount_women");
const amountMen = document.querySelector(".amount_men");
const year = document.querySelector(".year");

let svg = d3
  .selectAll("#viz")
  .attr("id", "usaviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
  

let path;
let totalLength;
let points;
let USData = [];
let presidentImg = [
  "./president/President_Bill Clinton.png",
  "./president/President_George W Bush.png",
  "./president/President_George W Bush.png",
  "./president/President_Barack Obama.png",
  "./president/President_Barack Obama.png",
  "./president/President_Donald Trump.png",
  "./president/President_Joe Biden.png",
];

function initialDataGenerator() {
  for (let i = 0; i < 11; i++) {
    USData[i] = [];
    for (let n = 0; n < 25 + 3 * i; n++) {
      USData[i][n] = 1;
    }
  }
}

let womenSeats = [51, 61, 66, 73, 79, 84, 120];
let years = [1998, 2002, 2006,2010, 2014, 2018, 2022];

function womenFilter(w) {
  let remainder = w % 11;
  let int = parseInt(w / 11);
  for (let i = 0; i < 11; i++) {
    for (let n = 0; n < int; n++) {
      USData[i][n] = 2;
    }
  }

  for (let r = 0; r < remainder; r++) {
    USData[10 - r][int] = 2;
  }
}

function arcGenerator(i, o) {
  return d3
    .arc()
    .innerRadius(i)
    .outerRadius(o)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);
}

function arcPathGenerator(i, o) {
  path = svg
    .append("path")
    .attr("d", arcGenerator(i, o))
    .attr("transform", `translate(${width / 2}, ${height / 1.4})`);
  totalLength = path.node().getTotalLength();
  points = path.node().getPointAtLength(totalLength);
}

function circlesGenerator(n) {
  svg
    .selectAll("circle")
    .exit()
    .remove()
    .data(USData[n])
    .enter()
    .append("circle")
    .attr("r", "11")
    .attr(
      "cx",
      (d, i) =>
        path
          .node()
          .getPointAtLength(((totalLength / (USData[n].length - 1)) * i) / 2).x
    )
    .attr(
      "cy",
      (d, i) =>
        path
          .node()
          .getPointAtLength(((totalLength / (USData[n].length - 1)) * i) / 2).y
    )
    .attr("transform", `translate(${width / 2}, ${height / 1.4})`)
    .attr("fill", (d) => (d === 2 ? "#f0402c" : "#000000"));
}

function graphGenerator() {
  for (let n = 0; n < 11; n++) {
    arcPathGenerator(200 + 25 * n, 200 + 25 * n);
    circlesGenerator(n);
  }
}

// svg
//   .append("text")
//   .attr("id", "title")
//   .attr("x", width / 2)
//   .attr("y", 80)
//   .attr("text-anchor", "middle")
//   .style("font-size", "24px")
//   .style("color", "black")
// .text("Number of seats held by women in the US national parliamnent(number)");


let index = 0;

president.src = presidentImg[index];

initialDataGenerator();
womenFilter(womenSeats[index]);
graphGenerator();

container.addEventListener("click", (event) => {
  let target = event.target.classList;
  if (target.contains("next")) {
    if (index > 5) {
      index = 0;
      womenFilter(womenSeats[index]);
      graphGenerator();
      initialDataGenerator();
      president.src = presidentImg[index];
      amountWomen.innerHTML = `${womenSeats[index]}`;
      amountMen.innerHTML = `${435 - womenSeats[index]}`;
      year.innerHTML = `${years[index]}`;
    } else {
      index += 1;
      womenFilter(womenSeats[index]);
      graphGenerator();
      initialDataGenerator();
      president.src = presidentImg[index];
      amountWomen.innerHTML = `${womenSeats[index]}`;
      amountMen.innerHTML = `${435 - womenSeats[index]}`;
      year.innerHTML = `${years[index]}`;
    }
  }
  if (target.contains("pre")) {
    if (index === 0) {
      index = 6;
      womenFilter(womenSeats[index]);
      graphGenerator();
      initialDataGenerator();
      president.src = presidentImg[index];
      amountWomen.innerHTML = `${womenSeats[index]}`;
      amountMen.innerHTML = `${435 - womenSeats[index]}`;
      year.innerHTML = `${years[index]}`;
    } else {
      index = index - 1;
      womenFilter(womenSeats[index]);
      graphGenerator();
      initialDataGenerator();
      president.src = presidentImg[index];
      amountWomen.innerHTML = `${womenSeats[index]}`;
      amountMen.innerHTML = `${435 - womenSeats[index]}`;
      year.innerHTML = `${years[index]}`;
    }
  }
});
