var i, j, canvas, context, image, image2;
var totalShapes=0;
var svgString, svg, url0, url;
var n=0;
var num2=0;
var last;
var inputs=[0, "#619FB5", 50, "#C3FF65", 50, "#FFD95C", 25, 45, "", 15, 1, 0, 3, "#87DDB7", 25, "#FEC774", 60, 45 , ""];
var input = document.getElementsByTagName("input");
var selects=["solid", "stripes", "none", "solid", "stripes"];
var select = document.getElementsByTagName("select");
var options = document.getElementsByTagName("option");
var value1 = "add";
var value7 = "circle";
var value17 = "circle2";
var prev="add";
var xx=0;
var yy=0;
var zz=0;
var t, f, s, e, sqrs;
var n0=1;
var n01=0;
var n3=1;
var n4=1;
var n5=1;
var choice=0;
var timer;
var n1=1;
var ways;
var ww = 800;
var hh = 450;
var lasts;

// resets input values after the page is refreshed
function resets(){
    for(var inp=0; inp<input.length; inp++){
        input[inp].value=inputs[inp];
    }
    for(var sels=0; sels<select.length; sels++){
        select[sels].options[select[sels].selectedIndex].value=selects[sels];
    }
}


// gets the parameters that decide how content will be applied on the svg (based on user-selected parameters)
function contents(val){
    if(value1!=val){
        document.getElementById(val).style.boxShadow="0 0 2px 2px darkseagreen";
        document.getElementById(value1).style.boxShadow="none";
    }
    value1=val;
}


// select which menu's contents to display based on the available space
function toggles(num){
    for(var x=1; x<5; x++){
        if(document.getElementById("form"+x).style.display=="block") num2++;
    }
    
    if(last!=num){
        if(num2>1 || last==4){
            for(var y=1; y<5; y++){
                document.getElementById("form"+y).style.display="none";
                document.getElementById("arrow"+y).style.transform="";
            }
        }
        
        if(document.getElementById("form"+num).style.display=="block"){
            for(var z=1; z<5; z++){
                document.getElementById("form"+z).style.display="none";
                document.getElementById("arrow"+z).style.transform="";
            }
        }else{
            document.getElementById("form"+num).style.display="block";
            document.getElementById("arrow"+num).style.transform="rotateX(180deg)";
            if(num!=4)document.getElementById("form"+(num+1)).style.display="block";
            if(num!=4)document.getElementById("arrow"+(num+1)).style.transform="rotateX(180deg)";
        }
    
    }else if(last==num && document.getElementById("form"+num).style.display=="block"){
        document.getElementById("form"+num).style.display="none";
        document.getElementById("arrow"+num).style.transform="";
    }else if(last==num && document.getElementById("form"+num).style.display!="block"){
        document.getElementById("form"+num).style.display="block";
        document.getElementById("arrow"+num).style.transform="rotateX(180deg)";
    }
    
    last=num;
    num2=0;
}


//select color menu items for display
function colors(){
    var selected = select[0].options[select[0].selectedIndex].value;
    selects[0]=selected;
    
    for(var b=0; b<6; b++){
        document.getElementById("b"+b).classList.add("hides");
    }
    document.getElementById("sp1").classList.remove("hides");
    document.getElementById("sp2").classList.remove("hides");
    document.getElementById("b1").classList.remove("hides");  
    
    if(selected=="gradient" || selected=="pattern"){
        document.getElementById("b2").classList.remove("hides");  
        document.getElementById("b4").classList.remove("hides"); 

        if(selected=="pattern"){
            document.getElementById("b0").classList.remove("hides");
            document.getElementById("sp1").classList.add("hides");
            document.getElementById("sp2").classList.add("hides");
        } 
    }else if(selected=="image"){
        document.getElementById("b1").classList.add("hides"); 
        document.getElementById("b3").classList.add("hides"); 
        document.getElementById("b5").classList.remove("hides"); 
        inputs[2]=100;
    }
}


function patternSelect(pat){
    var selected = select[pat].options[select[pat].selectedIndex].value;
    if(pat==1){
        selects[1]=selected;
        if(selects[0]=="pattern" && selects[1]=="checkers"){
            document.getElementById("b2").classList.add("hides"); 
        }else if(selects[0]=="pattern" && selected!="checkers"){
            document.getElementById("b2").classList.remove("hides");          
        }
        
    }else if(pat==4){
        selects[4]=selected;        
        
        if(selects[3]=="pattern" && selects[1]=="checkers"){
            document.getElementById("b10").classList.add("hides"); 
        }else if(selects[3]=="pattern" && selected!="checkers"){
            document.getElementById("b10").classList.remove("hides");          
        }
    }
}


// gets color related parameters for use on the applies and create functions
function param(par){   
    if(value1=="edit"){
        sessionStorage.setItem("value"+par, inputs[par]);
    }
    inputs[par]=input[par].value;
}


function setAttributes(el, attrs){
    for(var key in attrs){
        el.setAttribute(key, attrs[key]);
    }
}


// selects how to add a background image to shapes based on user input
function imgFilters(){
    defs= document.getElementById("defs");
    patterns = document.createElementNS(NS, 'pattern');
    setAttributes(patterns, {"id": "fill"+n3+"", "width": ww, "height": hh, "patternUnits": "userSpaceOnUse"});
    images = document.createElementNS(NS, 'image');
    setAttributes(images, {"id": "img"+n3+"", "href": inputs[8], "x": (xx-zz*2), "y": (yy-zz*2), "width": (zz*4), "height": (zz*4)});
    patterns.appendChild(images);
    defs.appendChild(patterns);
}


// selects how to add gradients to shapes based on user input
function gradFilters(){
    defs= document.getElementById("defs");
    grads = document.createElementNS(NS, 'linearGradient');
    setAttributes(grads, {"id": "grad"+n4+"", "x1": (xx-zz*2), "y1":(yy-zz*2), "x2": (xx+zz*2), "y2":(yy+zz*2), "gradientTransform":"rotate("+inputs[8]+")", "gradientUnits": "userSpaceOnUse"});
    
    stop1 = document.createElementNS(NS, 'stop');
    setAttributes(stop1, {"id": "stopA"+n4+"", "offset": "0%", "stop-color": inputs[1], "stop-opacity": (inputs[2]/100)});

    stop2 = document.createElementNS(NS, 'stop');
    setAttributes(stop2, {"id": "stopB"+n4+"", "offset": "100%", "stop-color": inputs[3], "stop-opacity": (inputs[4]/100)});
    
    grads.appendChild(stop1);
    grads.appendChild(stop2);
    defs.appendChild(grads);
}


// selects how to add gradients to shapes based on user input
function patternFilters(){
    var selected = select[1].options[select[1].selectedIndex].value;

    defs= document.getElementById("defs");
    patterns = document.createElementNS(NS, 'pattern');
    setAttributes(patterns, {"id": "pats"+n5+"", "width": "10", "height":"10", "patternTransform": "rotate("+inputs[7]+")", "patternUnits": "userSpaceOnUse"});
    
    rectA = document.createElementNS(NS, 'rect');
    setAttributes(rectA, {"x": "0", "y":"0", "fill": inputs[1], "fill-opacity": (inputs[2]/100)});
    if(selected=="stripes" || selected=="crossed"){
        setAttributes(rectA, {"width": "10", "height":"10"});
    }else{
        setAttributes(rectA, {"width": "5", "height":"5"});
    }
    patterns.appendChild(rectA);
    
    if(selected=="checkers"){
        rectB = document.createElementNS(NS, 'rect');
        setAttributes(rectB, {"x": "5", "y":"5", "width": "5", "height":"5", "fill": inputs[3], "fill-opacity": (inputs[4]/100)});
        patterns.appendChild(rectB);
    }
    
    if(selected=="stripes" || selected=="crossed"){
        linesA = document.createElementNS(NS, 'line');
        setAttributes(linesA, {"x1": "0", "y1":"0", "x2": "0", "y2":"10", "stroke": inputs[3], "stroke-width": "2px", "stroke-opacity": (inputs[4]/100)});
        patterns.appendChild(linesA);
    }
    
    if(selected=="crossed"){
        linesB = document.createElementNS(NS, 'line');
        setAttributes(linesB, {"x1": "0", "y1":"0", "x2": "10", "y2":"0", "stroke": inputs[3], "stroke-width": "2px", "stroke-opacity": (inputs[4]/100)});
        patterns.appendChild(linesB);
    }

    defs.appendChild(patterns);
}


// gets image input and uses it as svg filter for svg forms
function imgs(){
    var one = input[8].value.split('/').pop();
    var two = one.replace("C:\\fakepath\\", "");
    inputs[8] = two;
}


//select shape menu items for display
function allShapes(ss){
    if(value7!=ss){
        if(value7!="triangle"){
            document.getElementById(value7).style.backgroundColor="black";
        }else{
            document.getElementById(value7).style.borderColor="transparent transparent black transparent";
        }
        if(ss!="triangle"){
            document.getElementById(ss).style.backgroundColor="darkseagreen";
        }else{
            document.getElementById(ss).style.borderColor="transparent transparent darkseagreen transparent";
        }
        
        if(ss=="circle"){
            document.getElementById("b6").classList.add("hides");
        }else{
            document.getElementById("b6").classList.remove("hides");
        }
        value7=ss;
    }
}
    
function allShapes2(ss){    
    if(value17!=ss){
        if(value17!="triangle2"){
            document.getElementById(value17).style.backgroundColor="black";
        }else{
            document.getElementById(value17).style.borderColor="transparent transparent black transparent";
        }
        if(ss!="triangle2"){
            document.getElementById(ss).style.backgroundColor="darkseagreen";
        }else{
            document.getElementById(ss).style.borderColor="transparent transparent darkseagreen transparent";
        }
        value17=ss;
    }
}

// selects which animation to add as a parameter
function anims(){
    selects[2] = select[2].options[select[2].selectedIndex].value;
    
    if(selects[2]=="none"){
        document.getElementById("b7").classList.add("hides");
    }else{
        document.getElementById("b7").classList.remove("hides");
        document.getElementById("list2").style.display="none";            
        if(selects[2]=="morph") document.getElementById("list2").style.display="flex"; 
    }
}


function animaFilters(){
    if(selects[2]=="glow"){
        anims1 = document.createElementNS(NS, "animate");
        setAttributes(anims1, {"id": "anima"+n1+"", "begin": ""+inputs[11]+"s; anima"+n1+".end", "dur": ""+inputs[12]+"s", "repeatCount":"indefinite", "attributeName": "opacity", "keyTimes": "0; 0.375; 0.625; 1", "values": "1; 0.25; 0.25; 1"});
        document.getElementById("s"+n1).appendChild(anims1);
    }
    
    if(selects[2]=="jump"){
        document.getElementById("s"+n1).setAttributeNS(null, "transform-origin", "center center");            
        anims1 = document.createElementNS(NS, "animateTransform");
        setAttributes(anims1, {"id": "anima"+n1+"", "begin": ""+inputs[11]+"s; anima"+n1+".end", "dur": ""+inputs[12]+"s", "repeatCount":"indefinite", "attributeName": "transform", "calcMode": "linear", "additive": "sum", "type": "scale", "keyTimes": "0; 0.5; 1", "values": "0.25; 2; 0.25"});
        document.getElementById("s"+n1).appendChild(anims1);
    }
    
    if(selects[2]=="spin" || selects[2]=="orbit"){
        if(selects[2]=="spin"){
            document.getElementById("s"+n1).setAttributeNS(null, "transform-origin", ""+xx+" "+yy+"");
        }else{
            document.getElementById("s"+n1).setAttributeNS(null, "transform-origin", "center center");            
        }
        anims1 = document.createElementNS(NS, "animateTransform");
        setAttributes(anims1, {"id": "anima"+n1+"", "begin": ""+inputs[11]+"s; anima"+n1+".end", "dur": ""+inputs[12]+"s", "repeatCount":"indefinite", "attributeName": "transform", "calcMode": "linear", "additive": "sum", "type": "rotate", "keyTimes": "0; 1", "values": "0 0 0;360 0 0"});
        document.getElementById("s"+n1).appendChild(anims1);
    }
    
    if(selects[2]=="outline"){
        document.getElementById("s"+n1).setAttributeNS(null, "stroke-dashoffset", "0");
        var dash=document.getElementById("s"+n1).getTotalLength(0);
        var dash2=dash/18;
        document.getElementById("s"+n1).setAttributeNS(null, "stroke-dasharray", dash2);
        anims1 = document.createElementNS(NS, "animate");
        setAttributes(anims1, {"id": "anima"+n1+"", "begin": ""+inputs[11]+"s; anima"+n1+".end", "dur": ""+inputs[12]+"s", "repeatCount":"1", "attributeName": "stroke-dashoffset", "keyTimes": "0; 1", "values": "" + dash + "; 0"});
        document.getElementById("s"+n1).appendChild(anims1);
    }
    
    if(selects[2]=="morph"){   
        
        if(document.getElementById("s"+n1).className.baseVal=="circles"){
            document.getElementById("s"+n1).setAttributeNS(null, 'd', "M"+ (xx-zz) + " " + yy + " a " + zz + " " + zz + " 0 1,1 " + (zz*2) + " ,0 a" + zz + " " + zz + " 0 1,1 " + (-zz*2) + " ,0 " + " Z");
        }else if(document.getElementById("s"+n1).className.baseVal=="squares"){
            document.getElementById("s"+n1).setAttributeNS(null, 'd', "M"+ (xx-zz) + " " + yy + " " + (xx-zz) + " " + (yy-zz) + " " + xx + " " + (yy-zz) + " " + (xx+zz) + " " + (yy-zz) + " " + (xx+zz) + " " + yy + " " + (xx+zz) + " " + (yy+zz) + " " + xx + " " + (yy+zz) + " " + (xx-zz) + " " + (yy+zz) + " Z");
            
        }else if(document.getElementById("s"+n1).className.baseVal=="triangles"){
            document.getElementById("s"+n1).setAttributeNS(null, 'd', "M" + (xx - zz) + " " + (yy+zz*0.8556) + " " + (xx - zz/2) + " " + yy + " " + xx + " " + (yy - zz*0.866) + " " + (xx+zz/2) + " " + yy + " " + (xx+zz) + " " + (yy + zz*0.8556) + " " + (xx+zz/2) + " " + (yy + zz*0.8556) + " " + xx + " " + (yy + zz*0.8556) + " " + (xx-zz/2) + " " + (yy + zz*0.8556) + " Z");
            
        }else if(document.getElementById("s"+n1).className.baseVal=="diamonds"){
            document.getElementById("s"+n1).setAttributeNS(null, 'd', "M"+ (xx - zz) + " " + yy + " " + (xx - zz) + " " + yy + " " + xx + " " + (yy - zz*1.325) + " " + xx + " " + (yy - zz*1.325) + " " + (xx + zz) + " " + yy + " " + (xx + zz) + " " + yy + " " + xx + " " + (yy+zz*1.325) + " " + " " + xx + " " + (yy+zz*1.325) + " Z");
        }else if(document.getElementById("s"+n1).className.baseVal=="hexagons"){
            document.getElementById("s"+n1).setAttributeNS(null, 'd', "M"+ (xx - zz) + " " + yy + " " + (xx - zz*0.5) + " " + (yy - zz*0.866) + " " + xx + " " + (yy - zz*0.866) + " " + (xx + zz*0.5) + " " + (yy - zz*0.866) + " " + (xx + zz) + " " + yy + " " + (xx + zz*0.5) + " " + (yy + zz*0.866) + " " + xx + " " + (yy + zz*0.866) + " " + (xx - zz*0.5) + " " + (yy + zz*0.866) + " Z");
        }

        var ini=document.getElementById("s"+n1).getAttributeNS(null, 'd');
        
        var save;
        if(value17=="circle2"){
            save="M"+ (xx-zz) + " " + yy + " a " + zz + " " + zz + " 0 1,1 " + (zz*2) + " ,0 a" + zz + " " + zz + " 0 1,1 " + (-zz*2) + " ,0 " + " Z";
        }else if(value17=="square2"){
            save="M"+ (xx-zz) + " " + yy + " " + (xx-zz) + " " + (yy-zz) + " " + xx + " " + (yy-zz) + " " + (xx+zz) + " " + (yy-zz) + " " + (xx+zz) + " " + yy + " " + (xx+zz) + " " + (yy+zz) + " " + xx + " " + (yy+zz) + " " + (xx-zz) + " " + (yy+zz) + " Z";
        }else if(value17=="triangle2"){
            save="M" + (xx - zz) + " " + (yy+zz*0.8556) + " " + (xx - zz/2) + " " + yy + " " + xx + " " + (yy - zz*0.866) + " " + (xx+zz/2) + " " + yy + " " + (xx+zz) + " " + (yy + zz*0.8556) + " " + (xx+zz/2) + " " + (yy + zz*0.8556) + " " + xx + " " + (yy + zz*0.8556) + " " + (xx-zz/2) + " " + (yy + zz*0.8556) + " Z";
        }else if(value17=="diamond2"){
            save="M"+ (xx - zz) + " " + yy + " " + (xx - zz) + " " + yy + " " + xx + " " + (yy - zz*1.325) + " " + xx + " " + (yy - zz*1.325) + " " + (xx + zz) + " " + yy + " " + (xx + zz) + " " + yy + " " + xx + " " + (yy+zz*1.325) + " " + " " + xx + " " + (yy+zz*1.325) + " Z";
        }else if(value17=="hexagon2"){
            save="M"+ (xx - zz) + " " + yy + " " + (xx - zz*0.5) + " " + (yy - zz*0.866) + " " + xx + " " + (yy - zz*0.866) + " " + (xx + zz*0.5) + " " + (yy - zz*0.866) + " " + (xx + zz) + " " + yy + " " + (xx + zz*0.5) + " " + (yy + zz*0.866) + " " + xx + " " + (yy + zz*0.866) + " " + (xx - zz*0.5) + " " + (yy + zz*0.866) + " Z";
        }
        
        anims1 = document.createElementNS(NS, "animate");
        setAttributes(anims1, {"id": "anima"+n1+"", "begin": ""+inputs[11]+"s; anima"+n1+".end", "dur": ""+inputs[12]+"s", "repeatCount":"indefinite", "attributeName": "d", "keyTimes":"0; 0.375; 0.625; 1", "values": ""+ ini +";"+ save +" ; "+ save +" ; "+ ini +""});
        document.getElementById("s"+n1).appendChild(anims1);       
    }
}


// applier function - collects needed values and decides how to manipulate svg content (based on user-selected parameters)
function applies(srcs){
    if(value1=="add"){
        document.getElementById("tips").innerHTML="Adds shapes with the selected parameters. The first shape is placed at the clicked spot on the canvas. The rest are placed randomly.";
        
    }else if(value1=="select"){
        document.getElementById("tips").innerHTML="Selects shapes on click. Use a single click to select the first shape and a double click <br> to select all shapes with the same parameters. Choosing this mode again clears all selections.";
        
        if(prev=="select"){
            var ms = document.querySelectorAll(".animas");    
            for(var mm=0; mm<ms.length; mm++){
                ms[mm].parentNode.setAttributeNS(null, "stroke", inputs[5]);
                ms[mm].parentNode.setAttributeNS(null, "stroke-opacity", (inputs[6]/100));
                ms[mm].remove();
            }
            n0=1;
        }
        
    }else if(value1=="edit"){
        document.getElementById("tips").innerHTML="Give the current parameters to existing shapes by clicking on them. If the clicked shape is currently selected, all currently selected shapes will be edited.";
        
    }else if(value1=="remove"){
        document.getElementById("tips").innerHTML="Remove shapes by clicking on them. If the clicked shape is currently selected, all currently selected shapes will be removed.";
    }
    prev=value1;
}
    
var svg = document.getElementById("mysvg"), NS = svg.getAttribute('xmlns');


// second part of the applier function, created to handle letiations in user-selected parameters
function create(){
    var svg0 = document.getElementById("mysvg"), NS = svg0.getAttribute('xmlns');
    shapes = document.createElementNS(NS, 'path');
    
    if(value7=="circle"){
        shapes.setAttributeNS(null, 'd', "M" + (xx-zz) + "," + yy + " a " + zz + "," + zz + " 0 1,0 " + (zz*2) + ",0 " + zz + " " + zz + " 0 1,0 " + (-zz*2) + ",0 Z");
        shapes.setAttributeNS(null, 'class', "circles");
        
    }else if(value7=="square"){
        shapes.setAttributeNS(null, 'd', "M"+ (xx-zz) + " " + (yy-zz) + " " + (xx+zz) + " " + (yy-zz) + " " + (xx+zz) + " " + (yy+zz) + " " + (xx-zz) + " " + (yy+zz) + " Z");
        shapes.setAttributeNS(null, 'class', "squares");
        
    }else if(value7=="triangle"){
        shapes.setAttributeNS(null, 'd', "M"+ (xx - zz) + " " + (yy+zz*0.8556) + " " + xx + " " + (yy - zz*0.866) + " " + (xx + zz) + " " + (yy + zz*0.8556) + " Z");
        shapes.setAttributeNS(null, 'class', "triangles");
         
    }else if(value7=="diamond"){
        shapes.setAttributeNS(null, 'd', "M"+ (xx - zz) + " " + yy + " " + xx + " " + (yy - zz*1.325) + " " + (xx + zz) + " " + yy + " " + xx + " " + (yy+zz*1.325) + " Z");
        shapes.setAttributeNS(null, 'class', "diamonds");
        
    }else if(value7=="hexagon"){
        shapes.setAttributeNS(null, 'd', "M"+ (xx - zz) + " " + yy + " " + (xx - zz*0.5) + " " + (yy - zz*0.866) + " " + (xx + zz*0.5) + " " + (yy - zz*0.866) + " " + (xx + zz) + " " + yy + " " + (xx + zz*0.5) + " " + (yy + zz*0.866) + " " + (xx - zz*0.5) + " " + (yy + zz*0.866) + " Z");
        shapes.setAttributeNS(null, 'class', "hexagons");

    }
    
    if(selects[0]=="solid"){
            shapes.setAttributeNS(null, 'fill', inputs[1]);
    }else if(selects[0]=="gradient"){
            gradFilters();
            shapes.setAttributeNS(null, 'fill', "url(#grad"+ n4 +")");
            n4++;
    }else if(selects[0]=="pattern"){
            patternFilters();            
            shapes.setAttributeNS(null, 'fill', "url(#pats"+ n5 +")");
            n5++;
    }else if(selects[0]=="image"){
            imgFilters();            
            shapes.setAttributeNS(null, 'fill', "url(#fill"+ n3 +")");
            n3++;
    }
    if(value7!="circle") shapes.setAttributeNS(null, 'transform', "rotate("+ inputs[0] +")");
    setAttributes(shapes, {"id": "s"+n1+"", "transformOrigin": ""+ xx + " " + yy +"", "fill-opacity": (inputs[2]/100), "stroke": inputs[5], "stroke-width": "2px", "stroke-opacity": (inputs[6]/100)});
    svg.appendChild(shapes);
    if(selects[2]!="none") animaFilters();
    n1++;
} 


function sqrs0(){
    sqrs;
    if(value7=="circle"){
        sqrs = document.querySelectorAll(".circles");
    }else if(value7=="square"){
        sqrs = document.querySelectorAll(".squares");
    }else if(value7=="triangle"){
        sqrs = document.querySelectorAll(".triangles");
    }else if(value7=="diamond"){
        sqrs = document.querySelectorAll(".diamonds");
    }else if(value7=="hexagon"){
        sqrs = document.querySelectorAll(".hexagons");
    }
}


function solves(){
    var ms = document.querySelectorAll(".animas");    
    for(var mm=0; mm<ms.length; mm++){
        if(value1=="edit"){
            var one0 = ms[mm].parentNode.getPointAtLength(0);
            var one1 = one0.matrixTransform(svg.getScreenCTM().inverse());
            var two0 = ms[mm].parentNode.getTotalLength(0);
            var three = Math.round(two0/2);
            var four = ms[mm].parentNode.getPointAtLength(three);
            xx = parseInt(Math.round(((four.x - one0.x)/2)+one0.x));
            yy = parseInt(Math.round(((four.y - one0.y)/2)+one0.y));
            
            if(value7=="triangle"){
                three = Math.round((two0/6)*4);
                four = ms[mm].parentNode.getPointAtLength(three);
                var five = Math.round((two0/6)*2);
                var six = ms[mm].parentNode.getPointAtLength(five);
                xx = parseInt(Math.round(((four.x - one0.x)/2)+one0.x));
                yy = parseInt(Math.round(((six.y - one0.y)/2)+one0.y));
            }
            
            zz = parseInt(inputs[9]);
            ms[mm].parentNode.parentNode.removeChild(ms[mm].parentNode);
            create();
        }else if(value1=="remove"){
            ms[mm].parentNode.parentNode.removeChild(ms[mm].parentNode);
        }else if(value1=="add"){
            ms[mm].parentNode.setAttributeNS(null, "stroke", inputs[5]);
            ms[mm].parentNode.setAttributeNS(null, "stroke-opacity", (inputs[6]/100));
        }
        ms[mm].remove();
    }
    if(ms.length==0) n0=1;
}


// event listener for aditing svg shapes directly on the svg element       
svg.addEventListener('click', 
    function(e) {
    t = e.target;
    
    if(value1=="add"){
        s = svg.createSVGPoint();
        s.x = e.clientX;
        s.y = e.clientY;
        f =  s.matrixTransform(svg.getScreenCTM().inverse());
        xx = parseInt(Math.round(f.x));
        yy = parseInt(Math.round(f.y));
        zz = parseInt(inputs[9]);
        create();
        
        if(inputs[10]>1){
            for(i = 1; i < inputs[10]; i++){
                xx=parseInt(Math.round(Math.random() * ww));
                yy=parseInt(Math.round(Math.random() * hh));
                zz=parseInt(inputs[9]);
                create();
            }
        }
        
    }else if(value1=="select"){
        if(t.getAttributeNS(null, "id") != 'path0' && t.getAttributeNS(null, "id") != 'mysvg'){
            if(t.getAttributeNS(null, "stroke")=="red"){
                if(lasts!=t.getAttributeNS(null, "id")){
                    t.setAttributeNS(null, "stroke", inputs[5]);
                    t.setAttributeNS(null, "stroke-opacity", (inputs[6]/100));
                    var dash=t.getTotalLength(0);
                    var dash2=dash/18;
                    t.setAttributeNS(null, "stroke-dasharray", "0");
                    var ch = t.childNodes;
                    t.removeChild(ch[0]);
                }else{
                    var a1 = t.getAttributeNS(null, "class");  
                    var a2 = document.querySelectorAll("." + a1 + "");
                    for(var dd=0; dd<a2.length; dd++){
                        if(t.getAttributeNS(null, "id")!=a2[dd].getAttributeNS(null, "id")){
                            var a3 = a2[dd].getAttributeNS(null, "id");
                            document.getElementById(a3).setAttributeNS(null, "stroke-dashoffset", "0");
                            document.getElementById(a3).setAttributeNS(null, "stroke", "red");
                            document.getElementById(a3).setAttributeNS(null, "stroke-opacity", (inputs[6]/100));
                            var dash=document.getElementById(a3).getTotalLength(0);
                            var dash2=dash/18;
                            document.getElementById(a3).setAttributeNS(null, "stroke-dasharray", dash2);
                            anima = document.createElementNS(NS, "animate");
                            setAttributes(anima, {"class":"animas", "id": "anima"+n0+"", "begin": ""+inputs[11]+"s; anima"+n0+".end", "dur": ""+inputs[12]+"s", "repeatCount":"1", "attributeName": "stroke-dashoffset", "keyTimes": "0; 1", "values": "" + dash + "; 0"});
                            document.getElementById(a3).appendChild(anima);
                            n0++;
                        }
                    }
                }
            }else{
                t.setAttributeNS(null, "stroke-dashoffset", "0");
                t.setAttributeNS(null, "stroke", "red");
                t.setAttributeNS(null, "stroke-opacity", (inputs[6]/100));
                var dash=t.getTotalLength(0);
                var dash2=dash/18;
                t.setAttributeNS(null, "stroke-dasharray", dash2);
                anima = document.createElementNS(NS, "animate");
                setAttributes(anima, {"class":"animas", "id": "anima"+n0+"", "begin": ""+inputs[11]+"s; anima"+n0+".end", "dur": ""+inputs[12]+"s", "repeatCount":"1", "attributeName": "stroke-dashoffset", "keyTimes": "0; 1", "values": "" + dash + "; 0"});
                t.appendChild(anima);
                n0++;
            }
        }
    }else if(value1=="edit"){
        if(t.getAttributeNS(null, "id") != 'path0' && t.getAttributeNS(null, "id") != 'mysvg'){
            if(t.getAttributeNS(null, "stroke") == "red"){
                solves();
            }else{
                var one0 = t.getPointAtLength(0);
                var one1 = one0.matrixTransform(svg.getScreenCTM().inverse());
                var two0 = t.getTotalLength(0);
                var three = Math.round(two0/2);
                var four = t.getPointAtLength(three);
                xx = parseInt(Math.round(((four.x - one0.x)/2)+one0.x));
                yy = parseInt(Math.round(((four.y - one0.y)/2)+one0.y));
                
                if(value7=="triangle"){
                    three = Math.round((two0/6)*4);
                    four = t.getPointAtLength(three);
                    var five = Math.round((two0/6)*2);
                    var six = t.getPointAtLength(five);
                    xx = parseInt(Math.round(((four.x - one0.x)/2)+one0.x));
                    yy = parseInt(Math.round(((six.y - one0.y)/2)+one0.y));
                }
                zz = parseInt(inputs[9]);
                svg.removeChild(t);
                create();
            }
        }
        }else if(value1=="remove"){
        if(t.getAttributeNS(null, "id") != 'path0' && t.getAttributeNS(null, "id") != 'mysvg'){
            if(t.getAttributeNS(null, "stroke") == "red"){
                solves();
            }else{
                svg.removeChild(t);
            }
        }
    }
    if(value1=="select" && t.getAttributeNS(null, "id") != 'path0' && t.getAttributeNS(null, "id") != 'mysvg') lasts=t.getAttributeNS(null, "id");
});


// function for clearing the svg from already placed elements
function clears(){
    var svg = document.getElementById("mysvg");
    var circles = document.querySelectorAll(".circles");
    var paths = document.querySelectorAll("path");
    var patterns = document.querySelectorAll("pattern");
    var grads = document.querySelectorAll("linearGradient");
    if(choice==0){
        document.getElementById("clearer").innerHTML="Are you sure?";
        setTimeout(retry, 5000);
    }else{
        for(var i=1; i<paths.length; i++){
            paths[i].remove();
        }
        for(var i=1; i<patterns.length; i++){
            patterns[i].remove();
        }
        for(var i=0; i<circles.length; i++){
            circles[i].remove();
        }
        for(var i=0; i<grads.length; i++){
            grads[i].remove();
        }
        document.getElementById("path0").setAttribute("fill", "none");
        setTimeout(retry, 0);
        choice=0;
    }
    choice=1;
}

// support the clear function
function retry(){
    document.getElementById("clearer").innerHTML="Clear Canvas";
    choice=0;
}


// defining global letiables for import & export functions
function enters(){
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    canvas.width=ww;
    canvas.height=hh;
    backgrImg = document.getElementById("backgr-img");
}


// popup display functions
function popup(orig){
    document.getElementById("import-popup").style.display="block";
    document.getElementById(orig).classList.remove("hides");
    ways=orig;
}

function sizes(){
    if(ways=="resize"){
        for(var sv=1; sv<8; sv++){
            svg.classList.remove("svg"+sv);
        }
        
        if(document.getElementById('opt1').checked){
            if(document.getElementById('opt5').checked){
                ww = 1920;
                hh = 1080;
                svg.classList.add("svg1");
            }else{
                ww = 1080;
                hh = 1920;
                svg.classList.add("svg2");
            }
        }
        if(document.getElementById('opt2').checked){
            if(document.getElementById('opt5').checked){
                ww = 1366;
                hh = 768;
                svg.classList.add("svg3");
            }else{
                ww = 768;
                hh = 1366;
                svg.classList.add("svg4");
            }
        }
        if(document.getElementById('opt3').checked){
            if(document.getElementById('opt5').checked){
                ww = 1280;
                hh = 720;
                svg.classList.add("svg5");

            }else{
                ww = 720;
                hh = 1080;
                svg.classList.add("svg6");
            }
        }
        if(document.getElementById('opt4').checked){
            if(document.getElementById('opt5').checked){
                ww = 800;
                hh = 450;
            }else{
                ww = 450;
                hh = 800;
                svg.classList.add("svg7");
            }
        }
        document.getElementById("mysvg").setAttribute("viewBox", "0 0 "+ ww + " " + hh + "");
        document.getElementById("mysvg").setAttribute("width", ww);
        document.getElementById("mysvg").setAttribute("height", hh);
        document.getElementById("path0").setAttribute("d", "M0,0 " + ww + ",0 "+ ww + "," + hh + " 0," + hh + "z");
    }
}

function popupClose(){
    document.getElementById("import-popup").style.display="none";
    document.getElementById("resize").classList.add("hides");
    document.getElementById("backgr").classList.add("hides");
}


//select import menu options for display
function imports(){
    var selected = select[3].options[select[3].selectedIndex].value;
    for(var b=9; b<14; b++){
        document.getElementById("b"+b).classList.add("hides");
    }
    
    if(selected=="solid"){
        document.getElementById("b10").classList.remove("hides");
    } else if(selected=="gradient" || selected=="pattern"){
        if(selected=="pattern") document.getElementById("b9").classList.remove("hides");
        document.getElementById("b10").classList.remove("hides");
        document.getElementById("b11").classList.remove("hides");  
        document.getElementById("b12").classList.remove("hides");  
    } else{
        document.getElementById("b13").classList.remove("hides"); 
    }
}

// main svg background selecting function
function imports2(){
    if(ways=="backgr"){
        var selected = select[3].options[select[3].selectedIndex].value;
        var selected2 = select[4].options[select[4].selectedIndex].value;
        
        if(selected=="solid"){
            document.getElementById("path0").setAttribute("fill", inputs[13]);
            document.getElementById("path0").setAttribute("fill-opacity", ((inputs[14])/100));
        }else if(selected=="gradient"){
            defs= document.getElementById("defs");
            grads = document.createElementNS(NS, 'linearGradient');
            setAttributes(grads, {"id": "grad0", "x1": 0, "y1": 0, "x2": ww, "y2": hh, "gradientTransform":"rotate("+inputs[17]+")", "gradientUnits": "userSpaceOnUse"});
            
            stop1 = document.createElementNS(NS, 'stop');
            setAttributes(stop1, {"offset": "0%", "stop-color": inputs[13], "stop-opacity": (inputs[14]/100)});

            stop2 = document.createElementNS(NS, 'stop');
            setAttributes(stop2, {"offset": "100%", "stop-color": inputs[15], "stop-opacity": (inputs[16]/100)});
            
            grads.appendChild(stop1);
            grads.appendChild(stop2);
            defs.appendChild(grads);
            document.getElementById("path0").setAttribute("fill", "url(#grad0)"); 
        }else if(selected=="pattern"){
            
            defs= document.getElementById("defs");
            patterns = document.createElementNS(NS, 'pattern');
            setAttributes(patterns, {"id": "pats0", "width": "10", "height":"10", "patternTransform": "rotate("+inputs[17]+")", "patternUnits": "userSpaceOnUse"});
            
            rectsA = document.createElementNS(NS, 'rect');
            setAttributes(rectsA, {"x": "0", "y":"0", "fill": inputs[13], "fill-opacity": (inputs[14]/100)});
            if(selected=="stripes" || selected=="crossed"){
                setAttributes(rectsA, {"width": "10", "height":"10"});
            }else{
                setAttributes(rectsA, {"width": "5", "height":"5"});
            }
            patterns.appendChild(rectsA);
            
            if(selected2=="checkers"){
                rectsB = document.createElementNS(NS, 'rect');
                setAttributes(rectsB, {"x": "5", "y":"5", "width": "5", "height":"5", "fill": inputs[13], "fill-opacity": (inputs[14]/100)});
                patterns.appendChild(rectsB);
            }
            
            if(selected2=="stripes" || selected2=="crossed"){
                linesA = document.createElementNS(NS, 'line');
                setAttributes(linesA, {"x1": "0", "y1":"0", "x2": "0", "y2":"10", "stroke": inputs[15], "stroke-width": "2px", "stroke-opacity": (inputs[16]/100)});
                patterns.appendChild(linesA);
            }
            
            if(selected2=="crossed"){
                linesB = document.createElementNS(NS, 'line');
                setAttributes(linesB, {"x1": "0", "y1":"0", "x2": "10", "y2":"0", "stroke": inputs[15], "stroke-width": "2px", "stroke-opacity": (inputs[16]/100)});
                patterns.appendChild(linesB);
            }

            defs.appendChild(patterns);
            document.getElementById("path0").setAttribute("fill", "url(#pats0)");  
        }else if(selected=="image"){
            var one = inputs[18].split('/').pop();
            var two = one.replace("C:\\fakepath\\", "");
            document.getElementById("backgr-img").setAttributeNS(null, "href", two);
            document.getElementById("path0").setAttribute("fill", "url(#img1)");
            document.getElementById("path0").setAttribute("fill-opacity", "1");
        }
    }
}


// beginning of export function
function exports(){   
    svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));      
    svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});

    url0 = self.URL || self.webkitURL || self;
    url = url0.createObjectURL(svg);
    
    exportSvg();
    exportPng();
}


//svg export function
function exportSvg(){       
    var a = document.createElement('a');
    a.download = "image.svg";
    a.href = url;
    url0.revokeObjectURL(svg);
    document.body.appendChild(a);
    a.click();
    a.remove();
}


//png export function
function exportPng(){   
    enters();

    image = new Image();
    image.setAttributeNS(null, "crossOrigin", "*");
    image.src=backgrImg.getAttributeNS(null, "href");
    
    image2 = document.createElement('img');
    image2.setAttributeNS(null, "crossOrigin", "anonymous");
    image2.onload = () => {
        context.drawImage(image, 0, 0, ww, hh);
        context.drawImage(image2, 0, 0, ww, hh);
        var png = canvas.toDataURL();
        var a = document.createElement('a');
        a.download = "image.png";
        a.href = png;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
    image2.src=url;
    url0.revokeObjectURL(svg);
}
