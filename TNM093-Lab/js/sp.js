/**
  Computer exercise for TNM093
  Course responsible: Alexander Bock
  Created by: Kahin Akram
  August 2020
 */
  function sp(data) {

    console.log(data);
    var x_var = "Inkomst";
    var y_var = "Lgh i flerbostadshus"; //Choose data-variables
  
    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = $('div.sp-container').width(),
      height = $('div.sp-container').height();
  
    var sp_svg = d3.select("#sp")
      .append("svg")
      .attr('viewBox', '0 0 ' + (
        width + margin.left + margin.right)
        + ' ' + (height + margin.top + margin.bottom))
      .attr('width', '100%')
      .attr('height', height)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  
    //Tooltip
    var tooltip = d3.select("#sp").append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
  
    /**
     * 
     * Drawing the scatter Plot 
     * 
     */
  
    //Task 5.0.1  -- Create the x-axis
    var dataSetX = data.map(function (d) { return +d[x_var] });
    var x = d3.scaleLinear()
      .domain([d3.min(dataSetX), d3.max(dataSetX)]) //Define the domain for the data variable
      .range([0, width]); //Set the 0 and furthest point for the x-axis
  
    var x_axis = d3.axisBottom().scale(x); //Apply the scale-domain created above
    //Task 5.0.2  -- Append the axes to the sp_svg
    sp_svg.append("g").call(x_axis).attr("transform", "translate(0, " + height + ")");
  
    //Task 5.0.3  -- Create y-axis
    var dataSetY = data.map(function (d) { return +d[y_var] });
    var y = d3.scaleLinear()
      .domain([d3.min(dataSetY), d3.max(dataSetY)])
      .range([height, 0]);
  
    var y_axis = d3.axisLeft().scale(y);
  
    // Task 5.0.4 -- Append the axis to sp_svg
    sp_svg.append("g").call(y_axis);
  
  
    // Task 5.0.5 -- Append circles to sp_svg
    var myCircles = sp_svg.append("g").selectAll("circles").data(data).enter().append("circle");
  
    // Task 5.0.6 -- Add attributes to the circles
    d3.selectAll("circle")
    .attr("cx", function(d){return x(d[x_var])}) //Set the x position for the circle
    .attr("cy", function(d) {return y(d[y_var])}).attr("r", 6).style("fill", "darkturquoise") //Set the y-position, radius, and fill color for the circle
    .style("opacity", 0.3);
  
    // Task 5.0.7 -- Call hovering function here
    hovering();
  
    /**NECESSARY FUNCTION. DO NOT TOUCH */
  
    this.selectDot = function (value) {
      //Call focusCircle
      focusCricle(value)
    }
  
    this.resetSelectDot = function () {
      d3.selectAll("circle")
        .style("fill", "darkturquoise")
        .style("opacity", '0.3')
        .attr('r', 6)
    }
  
    function hovering() {
      myCircles.on("mouseover", function (d) {
        focusCricle(d.Region)
        pc.selectLine(d.Region)
        tooltip
          .style("opacity", 1)
          .html("Region: " + d.Region)
          .style("left", (d3.mouse(this)[0] + 30) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style("top", (d3.mouse(this)[1] - 40) + "px")
  
      })
        .on("mouseleave", function (d) {
          pc.resetSelectLine()
          d3.selectAll("circle")
            .style("fill", "darkturquoise")
            .style("opacity", '0.3')
            .attr('r', 6);
          tooltip
            .transition()
            .duration(50)
            .style("opacity", 0)
        })
    }
  
  }
  
  function focusCricle(circle) {
    var d = d3.selectAll("circle");
    d.style("fill", function (d) {
      return d.Region == circle ? "deeppink" : 'darkturquoise';
    })
      .style("opacity", function (d) {
        return d.Region == circle ? "1.0" : '0.3';
      })
      .attr("r", function (d) {
        return d.Region == circle ? 10 : 6;
      })
      .style("stroke-width", function (d) {
        return d.Region == circle ? 1 : 0;
      })
  }
  /**END*/
  