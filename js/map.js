$(() => {

    var unemployment = d3.map();
    var color = d3.scaleThreshold()
        .domain(d3.range(0, 1000))
        .range(d3.schemeReds[9]);

    //Seleciona o body
    var bodyElementy = d3.select("body")
    var width = 500
    var height = 500
    //adiciona o svg ao DOM selecionado
    var svgElementy = bodyElementy.append("svg")
        .attr("width", width)
        .attr("height", height)

    //Marca a projecao utilizada    
    var projection = d3.geo.mercator()
        .scale(650)
        .center([-52, -15])
        .translate([width / 2, height / 2]);

    //Quando o botão check eh clicado
    $("form").on("click", "input", function() {
        //alert($(this).text());
        if (this.checked) {
            var year = $(this).val()
            //console.log($(this).val())



            //ler o json
            /*global d3_queue*/
            d3_queue.queue()
                .defer(d3.json, "./br-states.json")
                .defer(d3.csv, "./taxadedengue.csv", function(d) {
                    //console.log(d.id)
                    //console.log(d[year])
                    unemployment.set(d.id, +d[year] / 80);
                })
                .await(ready);
            var path = d3.geo.path()
                .projection(projection);

            //desenhando o mapa
            /*global topojson*/
            function ready(error, brstates, estados) {
                if (error) {
                    console.log(error)
                }
                let states = topojson.feature(brstates, brstates.objects.estados);
                let states_contour = topojson.mesh(brstates, brstates.objects.estados);

                // Desenhando estados
                svgElementy.selectAll(".estado")
                    .data(states.features)
                    .enter()
                    .append("path")
                    .attr("class", "state")
                    .attr("d", path)
                    .attr("fill", function(d) {
                        return color(d[year] = unemployment.get(d.id));
                    })
                    .attr("id", estados.estados)
                    .append("title").text(function(d) { return d[year]; });
                    
                    
                svgElementy.append("path")
                    .datum(states_contour)
                    .attr("d", path)
                    .attr("class", "state_contour");
                    
            }
        } else {
            $("svg").empty();
        }

    });
})