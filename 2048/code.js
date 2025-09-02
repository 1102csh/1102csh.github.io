var board = [4];
for(let i=0;i<4;i++){
    board[i] = [4];
    
    for(let j=0;j<4;j++){
        board[i][j] = 0;
    }
}
let newone=0;
let score=0;
function setting(){
    let print_board = document.getElementById("board");
    
    for(let i=0;i<16;i++){
        print_board.innerHTML += "<span class='sel' id='sel"+i+"'><span class='sel_val' id='sel_val"+i+"'></span></span>";
    }

    reset();
}
function reset(){
    let sel;
    for(let i=0;i<16;i++){
        sel = document.getElementById("sel_val"+i);
        sel.innerText = "";
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            board[i][j]=0;
        }
    }
    score = 0;
    let print_score = document.getElementById("score");
    print_score.innerText = 0;
    let screen = document.getElementById("gameover");
    screen.style.display = 'none';
    screen.style.opacity = '0.0';
    Make_bubble();
}
function coloring(){
    let sel;
    let val;
    for(let i=0;i<16;i++){
        sel = document.getElementById("sel_val"+i);
        sel_val = document.getElementById("sel_val"+i);
        val = sel.textContent;

        //////////////////////////////////////////////////////

        // 글자 수에 따라 셀 글자출력 크기 설정
        if(val<100){
            sel_val.style.fontSize = "1em";
        }
        else if(val>=100&&val<1000){
            sel_val.style.fontSize = "0.9em";
        }
        else if(val>=1000&&val<10000){
            sel_val.style.fontSize = "0.7em";
        }
        else if(val>=10000&&val<100000){
            sel_val.style.fontSize = "0.6em";
        }
        else if(val>=100000&&val<1000000){
            sel_val.style.fontSize = "0.5em";
        }
        else if(val>=1000000&&val<10000000){
            sel_val.style.fontSize = "0.4em";
        }
        ///////////////////////////////////////////////////////
        let setColor;
        if(val==2){
            setColor = "rgb(228, 218, 206)";
        }
        else if(val==4){
            setColor = "rgb(240, 234, 200)";
        }
        else if(val==8){
            setColor = "rgb(238, 181, 116)";
        }
        else if(val==16){
            setColor = "rgb(226, 154, 72)";
        }
        else if(val==32){
            setColor = "rgb(226, 103, 72)";
        }
        else if(val==64){
            setColor = "rgb(236, 0, 0)";
        }
        else if(val==128){
            setColor = "rgb(238, 216, 146)";
        }
        else if(val==256){
            setColor = "rgb(243, 217, 131)";
        }
        else if(val==512){
            setColor = "rgb(233, 198, 85)";
        }
        else if(val==1024||val==2048){
            setColor = "rgb(248, 211, 3)";
        }
        else if(val==4096){
            setColor = "rgb(218, 108, 126)";
        }
        else if(val==8192){
            setColor = "rgb(235, 60, 74)";
        }
        else if(val==16384){
            setColor = "rgb(250, 37, 48)";
        }
        else if(val==32768){
            setColor = "rgb(56, 170, 223)";
        }
        else if(val==65536){
            setColor = "rgb(68, 160, 236)";
        }
        else if(val==131072){
            setColor = "rgb(2, 94, 170)";
        }
        else{
            setColor = "rgb(199, 182, 162)";
        }
        // 셀 폰트 색 설정
        if(val>=8){
            sel.style.color = "white";
        }
        else{
            sel.style.color = "rgb(85, 80, 75)";
        }
        //
        sel.style.backgroundColor = setColor;
    }
}
function Make_bubble(){
    check();
    let count = 0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!=0){
                count++;
            }
        }
    }

    if(count!=16){
        let rand;
        let sel;
        let temp;
        while(1){
            rand = Math.floor(Math.random()*16);

            switch(rand){
                case 15:   
                    temp = board[0][0];
                    break;
                case 0:
                    temp = board[0][1];
                    break;
                case 1:
                    temp = board[0][2];
                    break;
                case 2:
                    temp = board[0][3];
                    break;
                case 3:   
                    temp = board[1][0];
                    break;
                case 4:
                    temp = board[1][1];
                    break;
                case 5:
                    temp = board[1][2];
                    break;
                case 6:
                    temp = board[1][3];
                    break;
                case 7:   
                    temp = board[2][0];
                    break;
                case 8:
                    temp = board[2][1];
                    break;
                case 9:
                    temp = board[2][2];
                    break;
                case 10:
                    temp = board[2][3];
                    break;
                case 11:   
                    temp = board[3][0];
                    break;
                case 12:
                    temp = board[3][1];
                    break;
                case 13:
                    temp = board[3][2];
                    break;
                case 14:
                    temp = board[3][3];
                    break;
            }

            if(temp==0){
                temp = rand;
                break;
            }
        }
        let value;
        rand = Math.floor(Math.random()*10);
        if(rand<2){
            value = 4;
        }
        else{
            value = 2;
        }

        switch(temp){
            case 15:   
                board[0][0]=value;
                break;
            case 0:
                board[0][1]=value;
                break;
            case 1:
                board[0][2]=value;
                break;
            case 2:
                board[0][3]=value;
                break;
            case 3:   
                board[1][0]=value;
                break;
            case 4:
                board[1][1]=value;
                break;
            case 5:
                board[1][2]=value;
                break;
            case 6:
                board[1][3]=value;
                break;
            case 7:   
                board[2][0]=value;
                break;
            case 8:
                board[2][1]=value;
                break;
            case 9:
                board[2][2]=value;
                break;
            case 10:
                board[2][3]=value;
                break;
            case 11:   
                board[3][0]=value;
                break;
            case 12:
                board[3][1]=value;
                break;
            case 13:
                board[3][2]=value;
                break;
            case 14:
                board[3][3]=value;
                break;
        }
        newone = temp;
        print_board();
    }
}
function print_board(){




    let sel;
    for(let i=0;i<16;i++){
        sel = document.getElementById("sel_val"+i);

        switch(i){
            case 15:   
                sel.innerText = board[0][0];
                break;
            case 0:
                sel.innerText = board[0][1];
                break;
            case 1:
                sel.innerText = board[0][2];
                break;
            case 2:
                sel.innerText = board[0][3];
                break;
            case 3:   
                sel.innerText = board[1][0];
                break;
            case 4:
                sel.innerText = board[1][1];
                break;
            case 5:
                sel.innerText = board[1][2];
                break;
            case 6:
                sel.innerText = board[1][3];
                break;
            case 7:   
                sel.innerText = board[2][0];
                break;
            case 8:
                sel.innerText = board[2][1];
                break;
            case 9:
                sel.innerText = board[2][2];
                break;
            case 10:
                sel.innerText = board[2][3];
                break;
            case 11:   
                sel.innerText = board[3][0];
                break;
            case 12:
                sel.innerText = board[3][1];
                break;
            case 13:
                sel.innerText = board[3][2];
                break;
            case 14:
                sel.innerText = board[3][3];
                break;
        }
        if(sel.textContent==0){
            sel.innerText = "";
        }
    }

    //for(let i=0;i<4;i++){
    //    console.log(i+": "+board[i][0]+" "+board[i][1]+" "+board[i][2]+" "+board[i][3]);
    //}
    coloring();
}
function move_up(){
    let temp=0;
    let temp2=0;
    let flag=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!=0&&i!=0){
                if(board[i-1][j]!=board[i][j]&&board[i-1][j]!=0){
                    temp++;
                }
            }
            if(board[i][j]!=0&&i!=0){
                if(board[i-1][j]!=0){
                    temp2++;
                }
                if(board[i-1][j]==0){
                    temp2++;
                }
            }
           
        }
    }
    if(temp==temp2){
        flag=1;
    }
    if(flag==0){
        for(let y=0;y<4;y++){
            let flag=0;
            for(let i=0;i<3;i++){
                for(let x=1;x<4;x++){
                    if(board[x-1][y]==0){
                        board[x-1][y] = board[x][y];
                        board[x][y] = 0;
                    }
                    else if(board[x-1][y]==board[x][y]&&flag==0){
                        board[x-1][y] = board[x-1][y]*2;
                        board[x][y]=0;
                        flag++;
                        score = score + (board[x-1][y]*2);

                        if(board[2][y]==board[3][y]&&board[2][y]!=0){
                            board[2][y] = board[2][y]*2;
                            board[3][y] = 0;
                            score = score + (board[2][y]*2);
                        }
                    }
                
                }
            }
        }
        print_board();
        Make_bubble();
        refresh_score();
    }
    else{
        check();
    }
}
function move_down(){
    let temp=0;
    let temp2=0;
    let flag=0;
    for(let i=3;i>=0;i--){
        for(let j=3;j>=0;j--){
            if(board[i][j]!=0&&i!=3){
                if(board[i+1][j]!=board[i][j]&&board[i+1][j]!=0){
                    temp++;
                }
            }
            if(board[i][j]!=0&&i!=3){
                if(board[i+1][j]!=0){
                    temp2++;
                }
                if(board[i+1][j]==0){
                    temp2++;
                }
            }
           
        }
    }
    if(temp==temp2){
        flag=1;
    }
    if(flag==0){
        for(let y=0;y<4;y++){
            let flag=0;
            for(let i=0;i<3;i++){
                for(let x=2;x>=0;x--){
                    if(board[x+1][y]==0){
                        board[x+1][y] = board[x][y];
                        board[x][y] = 0;
                    }
                    else if(board[x+1][y]==board[x][y]&&flag==0){
                        board[x+1][y] = board[x+1][y]*2;
                        board[x][y]=0;
                        flag++;
                        score = score + (board[x+1][y]*2);

                        if(board[1][y]==board[0][y]&&board[1][y]!=0){
                            board[1][y] = board[1][y]*2;
                            board[0][y] = 0;
                            score = score + (board[1][y]*2);
                        }
                    }

                }
            }
        }
        print_board();
        Make_bubble();
        refresh_score();
    }
    else{
        check();
    }
}
function move_left(){
    let temp=0;
    let temp2=0;
    let flag=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!=0&&j!=0){
                if(board[i][j-1]!=board[i][j]&&board[i][j-1]!=0){
                    temp++;
                }
            }
            if(board[i][j]!=0&&j!=0){
                if(board[i][j-1]!=0){
                    temp2++;
                }
                if(board[i][j-1]==0){
                    temp2++;
                }
            }
           
        }
    }
    if(temp==temp2){
        flag=1;
    }
    if(flag==0){
        for(let x=0;x<4;x++){
            let flag=0;
            for(let i=0;i<3;i++){
                for(let y=1;y<4;y++){
                    if(board[x][y-1]==0){
                        board[x][y-1] = board[x][y];
                        board[x][y] = 0;
                    }
                    else if(board[x][y-1]==board[x][y]&&flag==0){
                        board[x][y-1] = board[x][y-1]*2;
                        board[x][y]=0;
                        flag++;
                        score = score + (board[x][y-1]*2);

                        if(board[x][2]==board[x][3]&&board[x][2]!=0){
                            board[x][2] = board[x][2]*2;
                            board[x][3] = 0;
                            score = score + (board[x][2]*2);
                        }
                    }
                    
                }
            }
        }
        print_board();
        Make_bubble();
        refresh_score();
    }
    else{
        check();
    }
}
function move_right(){
    let temp=0;
    let temp2=0;
    let flag=0;
    for(let i=3;i>=0;i--){
        for(let j=3;j>=0;j--){
            if(board[i][j]!=0&&j!=3){
                if(board[i][j+1]!=board[i][j]&&board[i][j+1]!=0){
                    temp++;
                }
            }
            if(board[i][j]!=0&&j!=3){
                if(board[i][j+1]!=0){
                    temp2++;
                }
                if(board[i][j+1]==0){
                    temp2++;
                }
            }
           
        }
    }
    if(temp==temp2){
        flag=1;
    }
    if(flag==0){
        for(let x=0;x<4;x++){
            let flag=0;
            for(let i=0;i<3;i++){
                for(let y=2;y>=0;y--){
                    if(board[x][y+1]==0){
                        board[x][y+1] = board[x][y];
                            board[x][y] = 0;
                    }
                    else if(board[x][y+1]==board[x][y]&&flag==0){
                        board[x][y+1] = board[x][y+1]*2;
                        board[x][y]=0;
                        flag++;
                        score = score + (board[x][y+1]*2);

                        if(board[x][1]==board[x][0]&&board[x][1]!=0){
                            board[x][1] = board[x][1]*2;
                            board[x][0] = 0;
                            score = score + (board[x][1]*2);
                        }
                    }

                }
            }
        }
        print_board();
        Make_bubble();
        refresh_score();
    }
    else{
        check();
    }
}
function check(){
    let count=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!=0){
                if(i==0&&j==0){
                    if(board[i+1][j]!=board[i][j]&&board[i][j+1]!=board[i][j]){
                        count++;
                    }
                }
                else if(i==3&&j==0){
                    if(board[i-1][j]!=board[i][j]&&board[i][j-1]!=board[i][j]){//
                        count++;
                    }
                }
                else if(i==0&&j==3){
                    if(board[i+1][j]!=board[i][j]&&board[i][j-1]!=board[i][j]){
                        count++;
                    }
                }
                else if(i==3&&j==3){
                    if(board[i-1][j]!=board[i][j]&&board[i][j-1]!=board[i][j]){
                        count++;
                    }
                }
                else if(i==0&&(j!=0&&j!=3)){
                    if(board[i][j-1]!=board[i][j]&&board[i][j+1]!=board[i][j]&&board[i+1][j]!=board[i][j]){
                        count++;
                    }
                }
                else if(i==3&&(j!=0&&j!=3)){
                    if(board[i][j-1]!=board[i][j]&&board[i][j+1]!=board[i][j]&&board[i-1][j]!=board[i][j]){
                        count++;
                    }
                }
                else if(j==0&&(i!=0&&i!=3)){
                    if(board[i+1][j]!=board[i][j]&&board[i-1][j]!=board[i][j]&&board[i][j+1]!=board[i][j]){
                        count++;
                    }
                }
                else if(j==3&&(i!=0&&i!=3)){
                    if(board[i+1][j]!=board[i][j]&&board[i-1][j]!=board[i][j]&&board[i][j-1]!=board[i][j]){
                        count++;
                    }
                }
                else if(i!=0&&i!=3&&j!=0&&j!=3){
                    if(board[i+1][j]!=board[i][j]&&board[i-1][j]!=board[i][j]){//
                        if(board[i][j+1]!=board[i][j]&&board[i][j-1]!=board[i][j]){
                            count++;
                        }
                    }
                }
            }
        }
    }
    let count2=0;
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!=0){
                count2++;
            }
        }
    }
    console.clear();
    console.log("count : "+count+" , count2 : "+count2);
    if(count==16&&count2==16){
        let screen = document.getElementById("gameover");
        screen.style.display = 'block';

        setTimeout(function(){
            screen.style.opacity = '1.0';
        },100);
    }
}
function refresh_score(){
    let print_score = document.getElementById("score");
    print_score.innerText = score;
}
window.onkeydown = function(e){
    if(e.keyCode==38){  //상
        move_up();
    }
    else if(e.keyCode==40){   //하
        move_down();
    }
    else if(e.keyCode==37){   //좌
        move_left();
    }
    else if(e.keyCode==39){   //우
        move_right();
    }
    //if(e.keyCode==38||e.keyCode==39||e.keyCode==40||e.keyCode==37){
        
    //}
}
setting();