class Graph {
    constructor(){
        this.vertices = [];
        this.edges = []; 
        this.backEdges = []
    }

    addVertices(vertex){
        if (!this.vertices.includes(vertex)) {
            this.vertices.push(vertex);
        }
    } 

    addEdge(vertex1, vertex2) {
        this.edges.push([vertex1, vertex2]);
    }
    addBackEdge(vertex1, vertex2) {
        this.backEdges.push([vertex1, vertex2]);
    }     
}

const graph = new Graph()
for(let i = 0; i < 8; i++){
    graph.addVertices(i)
}

graph.addEdge(0, 1)
graph.addEdge(0, 3)
graph.addEdge(0, 2)
graph.addEdge(0, 4)
graph.addEdge(1, 3)
graph.addEdge(2, 4)
graph.addEdge(3, 6)
graph.addEdge(3, 5)
graph.addEdge(5, 6)
graph.addEdge(4, 7)

const fillingGraph = new Graph()
for(let i = 0; i < 8; i++){
    fillingGraph.addVertices(i)
}

let turned = new Array(graph.vertices.length).fill(true)

let i = 0;
let adjecent = 0;
let count = 0;

function Search(graph, start, turned, fillingGraph){
    adjecent++;
    if(turned[start] == false){
        adjecent = 0;
        i = 0;
    }
    while(adjecent < graph.vertices.length){
        if(graph.edges[i] != null && graph.edges[i].includes(adjecent) && graph.edges[i].includes(start)){
            if(start < adjecent){
                turned[start] = false
                fillingGraph.addEdge(start, adjecent);
                graph.edges[i] = null;
                i++
                Search(graph, adjecent, turned, fillingGraph)
            } else if(start == adjecent){
                adjecent++
            } else if(turned[adjecent] == false){
                graph.addBackEdge(start, adjecent);
                graph.edges[i] = null;
                fillingGraph.addBackEdge(start, adjecent);
                Search(graph, adjecent, turned, fillingGraph)
            } 
        } else{
            i++
        }
        if(i == graph.edges.length){
            if(adjecent === (graph.vertices.length - 1)){
                adjecent = 0;
                i = 0
            } else{
                i = 0
                adjecent++
            }
        }
    }
}


console.log("Main Graph:", graph);


Search(graph, 0, turned, fillingGraph);
console.log("Filling graph:",fillingGraph);
