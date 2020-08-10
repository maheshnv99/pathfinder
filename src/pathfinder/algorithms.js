export function bfs(start,end,nodes,visitors,path,rows,cols,res){
		
    visitors=[];
    let finders=[];
    finders.push(start)
    while(finders.length!==0){

        let c=finders.shift();
        if(c[0]===end[0] && c[1]===end[1]){
            
            nodes[start[0]][start[1]].parentset=false;
            nodes[start[0]][start[1]].parent=null;
            finders=[];
            break;
        }
        let neighbors=[[c[0]+1,c[1]],
                        [c[0]-1,c[1]],
                        [c[0],c[1]+1],
                        [c[0],c[1]-1]];
        for(let q=0;q<neighbors.length;q++){
            let k=neighbors[q]
            if(0<=k[0] && k[0]<rows && 0<=k[1] && k[1]<cols && nodes[k[0]][k[1]].visited===false && nodes[k[0]][k[1]].iswall===false){
                    finders.push([k[0],k[1]]);
                    visitors.push([k[0],k[1]]);
                    nodes[k[0]][k[1]].visited=true;
                    if(nodes[k[0]][k[1]].parentset===false){
                        nodes[k[0]][k[1]].parent=nodes[c[0]][c[1]];
                        nodes[k[0]][k[1]].parentset=true;
                    }
            
            }

        }

    }

    
    
    let k=nodes[end[0]][end[1]]
    
    while(k.parent){
        path.push([k.parent.x/res,k.parent.y/res]);
        
        
        k=k.parent;
    }
    return[nodes,visitors,path];
    
    

}

