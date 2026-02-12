const squares = document.querySelectorAll('.square');

let ver;
let eventcounter;

squares.forEach(square =>{
    square.addEventListener('click',()=>{
    resetsquare();
    console.log("clickchecker");
    //declaration of piece identification
    const sqpiece = square.dataset.piece;
    const sqcolor = square.dataset.color;
    

    if(sqpiece === "none"){
        //do nothing
    }else if(sqpiece === "pawn"){

        if(square.innerHTML==''){
            //do nothing
        }else{
            square.style.backgroundColor = '#913434'; 
        }
        
        //code for pawns
        if(sqcolor==="black"){

            const row = square.dataset.row;
            const col = square.dataset.col;
            let projectedrow = parseInt(row) + 1;
            let projectedrowff = parseInt(row) ;

            let sq = getSquare(projectedrow, col);
            let sqq = getSquare(projectedrowff, col);

            ver = square.dataset.col;
            console.log(ver);

            if(sq.dataset.piece !== "none" ){//or bishop or rook or etc etc recongnize and dont move.

            }else{ //allow to keep moving
            sq.style.backgroundColor ='#913434'; 
                sq.addEventListener("click", ()=>{
                console.log(sq.dataset.col);

                if(ver==sq.dataset.col){
                    
                    sqq.addEventListener("click", ()=>{
                        sqq.innerHTML = '';
                    })
                sq.dataset.piece = "pawn";
                sq.dataset.color = "black";
                sq.dataset.row = projectedrow;
                sq.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                square.innerHTML = '';
                square.dataset.piece = "none";
                }else{
                    console.log('not a possible move');
                    
                }
                


            })
            }

            let count = 0;
            const colad1 = parseInt(col) + 1;
            const colad2 = parseInt(col) - 1;
            let xx = getSquare(projectedrow, colad1);
            let xxpj = getSquare(projectedrow-1, colad1);
            let xpiece = xx.dataset.piece;

            let xy = getSquare(projectedrow, colad2);
            let xypj = getSquare(projectedrow-1, colad2);

            if(xy.dataset.piece == "none"){
                
            }else{
                if(xy.dataset.color == "white"){
                xy.style.backgroundColor = '#22bbbb';

                if(count == 0){
                xy.addEventListener("click",()=>{
                    
                    count=1;
                    console.log(count);
                    if(count==1){

                    console.log("taken");
                    xy.dataset.color = 'black';
                    xy.dataset.piece = 'pawn';
                    xy.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                    xy.style.color = 'black';
                    console.log(xy.dataset.color);
                    xypj.style.backgroundColor = '';
                    xy.style.backgroundColor = '';
                    square.innerHTML = '';

                    //make whatever the other piece is
                    xx.dataset.piece = xpiece;
                    xx.dataset.color = 'white';
                    
                    square.innerHTML = '';
                    square.dataset.piece = "none";
                    sqq.innerHTML = '';
                    sqq.dataset.piece = "none";
                        console.log("this click")

                    console.log(xx.dataset.piece,xx.dataset.color);

                    }
                    sqq.addEventListener("click", ()=>{
                        sqq.innerHTML = '';
                        sqq.dataset.piece = 'none';
                        xx.style.backgroundColor = '';
                        //console.log("this click")
                    })

                })
                }

                }
            }


            /*if(xx.dataset.piece == "none"){
                
            }else{
                if(xx.dataset.color == "white"){
                xx.style.backgroundColor = '#22bb22';

                if(count==0){
                xx.addEventListener("click",()=>{

                    sqq.addEventListener("click", ()=>{
                        sqq.innerHTML = '';
                        sqq.dataset.piece = 'none';
                        xy.style.backgroundColor = '';
                    })

                    count=2;
                    if(count==2){
                    console.log("taken");
                    xx.dataset.color = 'black';
                    xx.dataset.piece = 'pawn';
                    xx.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                    xx.style.color = 'black';
                    console.log(xx.dataset.color);
                    xxpj.style.backgroundColor = '';
                    xx.style.backgroundColor = '';
                    square.innerHTML = '';
                    }

                })

                }

                }
            }
        */



        }else{

            const row = square.dataset.row;
            const col = square.dataset.col;
            let projectedrow = parseInt(row) - 1;
            let sq = getSquare(projectedrow, col);

            if(sq.dataset.piece == "pawn"){

            }else{
            sq.style.backgroundColor ='#913434'; 

            sq.addEventListener("click", ()=>{
                sq.style.color = 'white';
                square.innerHTML = '';
                square.dataset.piece = "none";
                sq.dataset.piece = "pawn";
                sq.dataset.color = "white";
                sq.dataset.row = projectedrow;
                sq.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
            })
            }

        }

    }
    })


})

//function for resetting square background color
function resetsquare(){
    squares.forEach(square => {
        square.style.backgroundColor =''; 
        countreset=1;
    })
}

//move piece function
function movepawn(){

}

//getsquare function
function getSquare(row, col) {
  return document.querySelector(
    `.square[data-row='${row}'][data-col='${col}']`
  );
}


            if(lefttakesquare.dataset.piece == 'none'){
            }else{
                lefttakesquare.style.backgroundColor = 'blue'
                lefttakesquare.addEventListener('click', ()=>{
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '';
                lefttakesquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                lefttakesquare.dataset.piece = 'pawn';
                lefttakesquare.dataset.color = 'black';
                lefttakesquare.style.color = 'black';
                })

            }







            resetsquarecol();
        if(square.dataset.piece == 'pawn'){
            square.style.backgroundColor = 'red';
            let row = parseInt(square.dataset.row) + 1;
            let col = parseInt(square.dataset.col);
            resetsquare();   
            clicks.push(col);
            let newsquare = getSquare(row, col)
            let prevsquare = getSquare(row-1, col)
            let lefttakesquare = getSquare(row, col-1)
            let righttakesquare = getSquare(row, col+1)

                        console.log(clicks, newsquare.dataset.col)


            if(newsquare.dataset.piece == 'none'){
                newsquare.style.backgroundColor = 'green';
            }else{

            }

            newsquare.addEventListener('click', () =>{

                if(clicks == newsquare.dataset.col){
                    if(square.style.backgroundColor == 'red'){
                        if(prevsquare.dataset.piece == 'none'){
                            prevsquare.style.backgroundColor = '';
                        }else{ 
                            if(newsquare.dataset.piece == 'none'){
                                square.style.backgroundColor = '';
                                square.dataset.piece = 'none';
                                square.innerHTML = '';
                                newsquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                                newsquare.dataset.piece = 'pawn';
                                newsquare.style.backgroundColor = '';
                                newsquare.dataset.color = 'black'
                            }else{
                                prevsquare.style.backgroundColor = '';
                            }
                        }

                    }else{
                    }
                }else{
                }                

            })


            if(square.dataset.col == 1){
            if(square.style.backgroundColor == 'red'){

                if(righttakesquare.dataset.piece == 'none'){

                }else if(righttakesquare.dataset.color == 'white'){
                righttakesquare.style.backgroundColor = 'blue';
                righttakesquare.dataset.style = 'none';
                righttakesquare.addEventListener('click', ()=>{
                if(righttakesquare.style.backgroundColor == 'blue'){

                righttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '';
                righttakesquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                righttakesquare.dataset.piece = 'pawn';
                righttakesquare.dataset.color = 'black';
                righttakesquare.style.color = 'black';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not poss')
                }
                })
                }

            }
            }else if(square.dataset.col == 8){

            if(square.style.backgroundColor == 'red'){

                if(lefttakesquare.dataset.piece == 'none'){

                }else if(lefttakesquare.dataset.color == 'white'){
                lefttakesquare.style.backgroundColor = 'blue';
                lefttakesquare.dataset.style = 'none';
                lefttakesquare.addEventListener('click', ()=>{
                if(lefttakesquare.style.backgroundColor == 'blue'){
                lefttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '';
                lefttakesquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                lefttakesquare.dataset.piece = 'pawn';
                lefttakesquare.dataset.color = 'black';
                lefttakesquare.style.color = 'black';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not possss')
                }
                })
                }
                

            }

            }else{

                if(square.style.backgroundColor == 'red'){

                if(lefttakesquare.dataset.piece == 'none' ){

                }else if(lefttakesquare.dataset.color == 'white'){
                lefttakesquare.style.backgroundColor = 'blue';
                lefttakesquare.dataset.style = 'none';
                lefttakesquare.addEventListener('click', ()=>{
                if(lefttakesquare.style.backgroundColor == 'blue'){
                lefttakesquare.style.backgroundColor = '';
                righttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '';
                lefttakesquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                lefttakesquare.dataset.piece = 'pawn';
                lefttakesquare.dataset.color = 'black';
                lefttakesquare.style.color = 'black';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not possss')
                }
                })
                }

                
                if(righttakesquare.dataset.piece == 'none'){

                }else if(righttakesquare.dataset.color == 'white'){
                righttakesquare.style.backgroundColor = 'blue';
                righttakesquare.dataset.style = 'none';
                righttakesquare.addEventListener('click', ()=>{
                if(righttakesquare.style.backgroundColor == 'blue'){
                lefttakesquare.style.backgroundColor = '';
                righttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '';
                righttakesquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                righttakesquare.dataset.piece = 'pawn';
                righttakesquare.dataset.color = 'black';
                righttakesquare.style.color = 'black';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not poss')
                }
                })
                }
                

            }

            }

        console.log(counterplay)

        counterplay++;
        console.log(counterplay)

        }


















                    console.log('odd, white plays')
            //white plays, so do nothing

               resetsquarecol();

        if(square.dataset.piece == 'pawn'){
            square.style.backgroundColor = 'red';
            let row = parseInt(square.dataset.row) - 1;
            let col = parseInt(square.dataset.col);
            resetsquare();   
            clicks.push(col);
            let newsquare = getSquare(row, col)
            let prevsquare = getSquare(row+1, col)
            let lefttakesquare = getSquare(row, col-1)
            let righttakesquare = getSquare(row, col+1)

                        console.log(clicks, newsquare.dataset.col)


            if(newsquare.dataset.piece == 'none'){
                newsquare.style.backgroundColor = 'green';
            }else{

            }

            newsquare.addEventListener('click', () =>{

                if(clicks == newsquare.dataset.col){
                    if(square.style.backgroundColor == 'red'){
                        if(prevsquare.dataset.piece == 'none'){
                            prevsquare.style.backgroundColor = '';
                        }else{ 
                            if(newsquare.dataset.piece == 'none'){
                                square.style.backgroundColor = '';
                                square.dataset.piece = 'none';
                                square.innerHTML = '';
                                newsquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                                newsquare.dataset.piece = 'pawn';
                                newsquare.style.backgroundColor = '';
                                newsquare.dataset.color = 'white'
                                newsquare.style.color = 'white';
                            }else{
                                prevsquare.style.backgroundColor = '';
                            }
                        }

                    }else{
                    }
                }else{
                }                

            })


            if(square.dataset.col == 1){
            if(square.style.backgroundColor == 'red'){

                if(righttakesquare.dataset.piece == 'none'){

                }else if(righttakesquare.dataset.color == 'black'){
                righttakesquare.style.backgroundColor = 'blue';
                righttakesquare.dataset.style = 'none';
                righttakesquare.addEventListener('click', ()=>{
                if(righttakesquare.style.backgroundColor == 'blue'){

                righttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '';
                righttakesquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                righttakesquare.dataset.piece = 'pawn';
                righttakesquare.dataset.color = 'white';
                righttakesquare.style.color = 'white';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not poss')
                }
                })
                }

            }
            }else if(square.dataset.col == 8){

            if(square.style.backgroundColor == 'red'){

                if(lefttakesquare.dataset.piece == 'none'){

                }else if(lefttakesquare.dataset.color == 'black'){
                lefttakesquare.style.backgroundColor = 'blue';
                lefttakesquare.dataset.style = 'none';
                lefttakesquare.addEventListener('click', ()=>{
                if(lefttakesquare.style.backgroundColor == 'blue'){
                lefttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '';
                lefttakesquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                lefttakesquare.dataset.piece = 'pawn';
                lefttakesquare.dataset.color = 'white';
                lefttakesquare.style.color = 'white';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not possss')
                }
                })
                }
                

            }

            }else{

                if(square.style.backgroundColor == 'red'){

                if(lefttakesquare.dataset.piece == 'none' ){

                }else if(lefttakesquare.dataset.color == 'black'){
                lefttakesquare.style.backgroundColor = 'blue';
                lefttakesquare.dataset.style = 'none';
                lefttakesquare.addEventListener('click', ()=>{
                if(lefttakesquare.style.backgroundColor == 'blue'){
                lefttakesquare.style.backgroundColor = '';
                righttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '';
                lefttakesquare.dataset.piece = 'none';
                lefttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                lefttakesquare.dataset.piece = 'pawn';
                lefttakesquare.dataset.color = 'white';
                lefttakesquare.style.color = 'white';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not possss')
                }
                })
                }

                
                if(righttakesquare.dataset.piece == 'none'){

                }else if(righttakesquare.dataset.color == 'black'){
                righttakesquare.style.backgroundColor = 'blue';
                righttakesquare.dataset.style = 'none';
                righttakesquare.addEventListener('click', ()=>{
                if(righttakesquare.style.backgroundColor == 'blue'){
                lefttakesquare.style.backgroundColor = '';
                righttakesquare.style.backgroundColor = '';
                prevsquare.innerHTML = '';
                prevsquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '';
                righttakesquare.dataset.piece = 'none';
                righttakesquare.innerHTML = '<div class="pawn"><i class="fa-solid fa-chess-pawn"></i></div>';
                righttakesquare.dataset.piece = 'pawn';
                righttakesquare.dataset.color = 'white';
                righttakesquare.style.color = 'white';
                square.style.backgroundColor = '';
                square.dataset.piece = 'none';
                }else{
                    console.log('not poss')
                }
                })
                }
                

            }

            }






        }

        console.log(counterplay)

        counterplay++;
        console.log(counterplay)












                            if(knightsquare.dataset.piece === 'none' || knightsquare.dataset.color !== square.dataset.color){

                    knightsquare.style.backgroundColor = 'green';
                    knightsquare.addEventListener('click',()=>{
                        if(knightsquare.style.backgroundColor == 'green'){
                        square.style.backgroundColor = '';
                        square.innerHTML = '';
                        square.dataset.piece = 'none';
                        knightsquare.innerHTML = '<i class="fa-solid fa-chess-knight"></i>';
                        knightsquare.dataset.piece = 'knight';
                        knightsquare.dataset.color = 'black';
                        newsquare.forEach(sq=>{
                            sq.style.backgroundColor = '';
                        })
                        }
                    })

                    }




                            pawnattack.forEach(confpawnatt=>{
        if(confpawnatt == newsquarerook || confpawnatt == bishopsquare){
            console.log('cant move to one square, check')
        }else{
            //allow to move
        }
    })