const nodes = [
  { id: "VAE" },
  { id: "VQVAE" },
  { id: "PPO" },
  { id: "RL" },
  { id: "DCM" }
];

const links = [
  { source: "VAE", target: "VQVAE" },
  { source: "PPO", target: "RL" },
  { source: "RL", target: "DCM" }
];

const width = document.getElementById('graph').clientWidth;
const height = document.getElementById('graph').clientHeight;

const svg = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height);

const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(150))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .attr("stroke", "#aaa")
  .selectAll("line")
  .data(links)
  .enter().append("line");

const node = svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .attr("fill", "#0078d7")
  .call(drag(simulation));

const label = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("dy", -15);

simulation.on("tick", () => {
  link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);
  label.attr("x", d => d.x).attr("y", d => d.y);
});

function drag(simulation) {
  return d3.drag()
    .on("start", event => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    })
    .on("drag", event => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on("end", event => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    });
}
