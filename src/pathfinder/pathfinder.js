import React from 'react';
import Sketch from 'react-p5';
import {bfs} from './algorithms';
let visitors=[];
let path=[];
let rows,cols;
let nodes=[];



let res=30;
let setstart=false;
let setend=false;
let start,end;
let cst=0,visualise=false;


function node(x,y){

	this.x=x;
	this.y=y;
	this.iswall=false;
	this.visited=false;
	this.parentset=false;
	this.parent=null;
	this.isbetween=false;
	this.ispath=false;
	this.isstart=false;
	this.isend=false;
	this.display=(p5)=>{
		if(this.isstart){
			p5.fill(225,0,0);
		}
		else if(this.isend){
			p5.fill(0,255,0);
		}
		else if(this.isbetween){
			if(this.ispath){
				p5.fill('rgb(139,0,139)');
			}
			else{
                p5.fill('rgba(105,105,255,0.8)');	
                // p5.fill('rgb(204,204,0)')
			}
			
		}
		else if(this.iswall){
			p5.fill(255);
		}
		
		else{
			p5.noFill();
		}
		

		p5.stroke(255);
		p5.rect(this.x,this.y,res,res)
		
		if(visualise && cst<=visitors.length){
			changeit();
		}
			if(p5.floor(cst)>=visitors.length){
				for(let p=0;p<path.length;p++){
					let x=path[p][0],y=path[p][1];
					
					nodes[x][y].ispath=true;
				}
			}
	
	}


}



function changeit(){
	

		for(let k=0;k<cst;k++){

			let x=visitors[k][0];
			let y=visitors[k][1];
			nodes[x][y].isbetween=true
			
			
		}
		
		cst+=0.01
	
}








const setup=(p5,parent)=>{

    p5.createCanvas(6*p5.displayWidth/8,6*p5.displayWidth/8).parent(parent);
    cols=p5.width/res;
	rows=p5.height/res;
	for(let i=0;i<rows;i++){
		let temp=[]
		for(let j=0;j<cols;j++){
			temp.push(new node(i*res,j*res))

		}
		nodes.push(temp);


	}


}

const draw=(p5)=>{

    p5.background(0);
    for(let i=0;i<nodes.length;i++){
		for(let j=0;j<nodes[i].length;j++){
			nodes[i][j].display(p5)
		
		
		}
	}


}

function mousePressed(p5){
	if(p5.mouseX>=0 && p5.mouseX<=p5.width && p5.mouseY>=0 && p5.mouseY<=p5.height){
	if(setstart===false){

        let x=p5.floor(p5.mouseX/res),y=p5.floor(p5.mouseY/res);
        start=[x,y];
        setstart=true;
        nodes[x][y].isstart=true;
	// for(let i=0;i<nodes.length;i++){
	// 	for(let j=0;j<nodes[i].length;j++){
	// 		if(p5.mouseX<=nodes[i][j].x+res && p5.mouseX>=nodes[i][j].x && p5.mouseY<=nodes[i][j].y+res && p5.mouseY>=nodes[i][j].y) 
	// 		{
	// 			start=[i,j];
	// 			setstart=true;
	// 			nodes[i][j].isstart=true;
				
	// 		}
		
		
	// 	}
	// }
	}
		else if(setend===false){

            let x=p5.floor(p5.mouseX/res),y=p5.floor(p5.mouseY/res);
            end=[x,y];
        setend=true;
        nodes[x][y].isend=true;
            
            
            
            
            // for(let i=0;i<nodes.length;i++){
			// 	for(let j=0;j<nodes[i].length;j++){
			// 		if(p5.mouseX<=nodes[i][j].x+res && p5.mouseX>=nodes[i][j].x && p5.mouseY<=nodes[i][j].y+res && p5.mouseY>=nodes[i][j].y)
			// 		{
			// 			end=[i,j];
			// 			setend=true;
			// 			nodes[i][j].isend=true;
						
			// 		}
				
				
			// 	}
			// }
        }
    }




}

function mouseDragged(p5){
    if(p5.mouseX>=0 && p5.mouseX<=p5.width && p5.mouseY>=0 && p5.mouseY<=p5.height){
	let x=p5.floor(p5.mouseX/res)
	let y=p5.floor(p5.mouseY/res)
	nodes[x][y].iswall=true;
}
}
function keyPressed(p5){

	
    if (p5.keyCode === p5.LEFT_ARROW) {
      let q=bfs(start,end,nodes,visitors,path,rows,cols,res);
      nodes=q[0];
      visitors=q[1];
      path=q[2];
      visualise=true;
    
    }


}















export default function Pathfinder() {
    return (
        <div>
            <center><h2>Path Finder</h2></center>
            <center><h3>Rules:first click sets start,second click sets finish point,drag the mouse to create obstacles,left arrow to visualise</h3></center><br/>
            <center><Sketch setup={setup} draw={draw} mousePressed={mousePressed} mouseDragged={mouseDragged} keyPressed={keyPressed}/></center>
        </div>
    )
}
