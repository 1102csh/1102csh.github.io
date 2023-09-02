let index=0;
let curWave=0;
let trigger;
let trigger_attack;
let count=0;
let flag=0;
let mobs=[];
let target =0;
let money = 10000;
let gas = 0;
let move_trigger=[];
let life=20;
let mob_HP = 50;
let head_target;
let trigger_check;
let trigger_timer;
let timerIndex=20;
let trigger_attack2 = [];
let attack_trigger_count =0;
let wave_on = 0;
let tile=[];
for(let i=0;i<75;i++){
    tile[i]={
        tower:0,    // 타워 없으면 0
        x:0,
        y:0,
        range:0,
        damage:0,
        target:0    // 대상 없으면 0
    };
}
let questList = [0,0,0,0,0,0,0,0];
let arc_up=0;
let arc_upmoney=1;
let squ_up=0;
let squ_upmoney=1;
let tri_up=0;
let tri_upmoney=1;
let dia_up=0;
let dia_upmoney=1;
let star_up=0;
let star_upmoney=1;
let penta_up=0;
let penta_upmoney=1;
let jewel_up=0;
let jewel_upmoney=1;
let cross_up=0;
let cross_upmoney=1;

function move(){
    let life_display = document.getElementById("life");

    //console.clear();
    //console.log("X :"+mobs[target].x);
    //console.log("Y :"+mobs[target].y);
    for(let i=target;i<index;i++){
        let num=mobs[i].num;
        if(mobs[i].status==2){
            let mob=document.getElementById("mob"+num);
            //console.log("mob"+num+"이동 중");

            if(mobs[num].point==0){
                mobs[num].y = mobs[num].y+mobs[num].speed;
                mob.style.top = mobs[num].y+'em';

                if((mobs[num].y>20.9&&mobs[num].y<21.1)&&mobs[num].x==1){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==1){
                mobs[num].x=mobs[num].x+mobs[num].speed;
                mob.style.left = mobs[num].x+'em';
                
                if((mobs[num].x>55.9&&mobs[num].x<56.1)&&(mobs[num].y>20.9&&mobs[num].y<21.1)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==2){
                mobs[num].y = mobs[num].y-mobs[num].speed;
                mob.style.top = mobs[num].y+'em';

                if((mobs[num].x>55.9&&mobs[num].x<56.1)&&(mobs[num].y<1.1&&mobs[num].y>0.9)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==3){
                mobs[num].x = mobs[num].x-mobs[num].speed;
                mob.style.left = mobs[num].x+'em';

                if((mobs[num].x>35.9&&mobs[num].x<36.1)&&(mobs[num].y<1.1&&mobs[num].y>0.9)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==4){
                mobs[num].y = mobs[num].y+mobs[num].speed;
                mob.style.top = mobs[num].y+'em';
                if(mobs[target])
                if((mobs[num].x>35.9&&mobs[num].x<36.1)&&(mobs[num].y>55.9&&mobs[num].y<56.1)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==5){
                mobs[num].x = mobs[num].x+mobs[num].speed;
                mob.style.left = mobs[num].x+'em';

                if((mobs[num].x<56.1&&mobs[num].x>55.9)&&(mobs[num].y>55.9&&mobs[num].y<56.1)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==6){
                mobs[num].y = mobs[num].y-mobs[num].speed;
                mob.style.top = mobs[num].y+'em';

                if((mobs[num].x<56.1&&mobs[num].x>55.9)&&(mobs[num].y>35.9&&mobs[num].y<36.1)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==7){
                mobs[num].x = mobs[num].x-mobs[num].speed;
                mob.style.left = mobs[num].x+'em';

                if((mobs[num].x<1.1&&mobs[num].x>0.9)&&(mobs[num].y>35.9&&mobs[num].y<36.1)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==8){
                mobs[num].y = mobs[num].y+mobs[num].speed;
                mob.style.top = mobs[num].y+'em';if(mobs[target])

                if((mobs[num].x<1.1&&mobs[num].x>0.9)&&(mobs[num].y<56.1&&mobs[num].y>55.9)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==9){
                mobs[num].x = mobs[num].x+mobs[num].speed;
                mob.style.left = mobs[num].x+'em';

                if((mobs[num].x>20.9&&mobs[num].x<21.1)&&(mobs[num].y<56.1&&mobs[num].y>55.9)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==10){
                mobs[num].y = mobs[num].y-mobs[num].speed;
                mob.style.top = mobs[num].y+'em';

                if((mobs[num].x>20.9&&mobs[num].x<21.1)&&(mobs[num].y<1.1&&mobs[num].y>0.9)){
                    mobs[num].point++;
                }
            }
            else if(mobs[num].point==11){
                life=life-1;
                life_display.innerText = "♥ : "+life;
                //console.log("mob"+i+"끝");
                mob.style.display='none';
                mobs[i].status=0;
                target++;
            }
        }
        else if(mobs[i].status==1&&mobs[i].hp!=0){
            //console.log("mob"+num+"이동 준비");
            mobs[i].status=6;
            move_trigger[i] = setTimeout(function delay(){
                let temp=document.getElementById("mob"+num);
                temp.style.display='block';
                mobs[i].status=2;
                
            },400*i);
        }
    }
    let check=0;
    for(let i=0;i<index;i++){
        if(mobs[i].status==0||mobs[i].hp<1){
            //console.log("mob"+i+"제거");
            let mob=document.getElementById("mob"+i);
            clearTimeout(move_trigger[i]);
            mob.style.display='none';
            mobs[i].hp=0;
            mobs[i].status=0;
            check++;
        }
    }
    if(check==index){
        let info = document.getElementById("info");
        info.innerText="현재 필드에 존재하는 몹의 개수 : 0";
        clearInterval(trigger);
    }
}
function spawn(set_hp,set_speed){
    let stage=document.getElementById("mobstage");

    mobs[index]={
        num:index,
        x:1,
        y:1,
        hp:set_hp,
        speed:set_speed,
        status:1,
        point:0
    };

    stage.innerHTML += "<div class='mob' id='mob"+index+"'><progress id='bar"+index+"' value='"+mobs[index].hp+"' max='"+mobs[index].hp+"'></progress><span class='hp' id='hp"+index+"'>"+mobs[index].hp+"</span></div>";
    index++;
    count++;

    clearInterval(trigger);
    trigger = setInterval(move,20);
}
function check_ready(){
    count=0;
    flag=0;
    for(let i=0;i<index;i++){
        if(mobs[i].status==2){
            count++;
        }
        else if(mobs[i].status==0){
            flag++;
        }
    }

    let display_money = document.getElementById("money");
    let info = document.getElementById("info");

    display_money.innerText = money+"G";
    info.innerHTML = "현재 필드에 존재하는 몹의 개수 : "+count;
    if(flag==index&&flag!=0&&index!=0){
        for(let i=0;i<attack_trigger_count;i++){
            clearInterval(trigger_attack2[i]);
            attack_trigger_count=0;
        }
        for(let i=0;i<75;i++){
            tile[i].target=0;
        }
        target=0;
        index=0;
        let stage=document.getElementById("mobstage");
        stage.innerHTML="";
        wave_on=0;
        console.clear();
        console.log("flag : "+flag);
        console.log("index : "+index);
        console.log("target : "+target);
        console.log("wave_on? :"+wave_on);
        console.log("attack_trigger_count : "+attack_trigger_count);
        console.log("wave claer");
        if((curWave+1)/5==0){
            money=money+100;
        }
        else{
            money=money+40;
        }
        display_money.innerText = money+"G";


        clearInterval(trigger_check);
        wave_ready();
    }
}
function attack_ready(){
    trigger_attack2 = [];
    attack_trigger_count=0;

    let check_attack=0;
    for(let i=0;i<75;i++){
        if(tile[i].tower!=0){
            if(tile[i].tower.indexOf("star")!=-1){
                trigger_attack2[attack_trigger_count] = setInterval(function(){attack(i)},50);
            }
            else if(tile[i].tower.indexOf("cross")!=-1){
                trigger_attack2[attack_trigger_count] = setInterval(function(){attack(i)},500);
            }
            else if(tile[i].tower.indexOf("jewel")!=-1){
                trigger_attack2[attack_trigger_count] = setInterval(function(){attack(i)},20);
            }
            else{
                trigger_attack2[attack_trigger_count] = setInterval(function(){attack(i)},200);
            }
            attack_trigger_count++;
            check_attack++;
        }
    }
    console.log("활성화 된 타워 : "+check_attack);
}
function attack(pos){
    let damage = tile[pos].damage;
    let range = tile[pos].range/2;
    
    let in_area=0;
    flag =0;
    count =0;
    console.log("tower : "+tile[pos].tower+"  x : "+tile[pos].x+"  y : "+tile[pos].y+"  range : "+tile[pos].range);
    for(let i=target;i<index;i++){
        if(mobs[i].x>(tile[pos].x-range)&&mobs[i].x<(tile[pos].x+range)&&mobs[i].y>(tile[pos].y-range)&&mobs[i].y<(tile[pos].y+range)&&mobs[i].status==2){
            head_target = mobs[i].num;
            in_area=1;
            break;
        }
        else{
            in_area=0;
        }
    }
    console.clear();
    console.log("in_area : "+in_area+"  head_target : "+head_target);
    if(in_area==1){
        tile[pos].target = head_target;

        let hp=document.getElementById("hp"+tile[pos].target);
        let hpbar=document.getElementById("bar"+tile[pos].target);

        mobs[head_target].hp = mobs[head_target].hp-damage;
        hp.innerText=mobs[head_target].hp;
        hpbar.value=mobs[head_target].hp;

        if(mobs[head_target].hp<=damage){
            let mob = document.getElementById("mob"+mobs[head_target].num);
            mobs[head_target].hp=0;
            mobs[head_target].status=0;
            mob.style.display='none';
        }
        if(mobs[target].status==0){
            target++;
        }
    }
}
function timer(){
    let log = document.getElementById("timelog");
    timerIndex = timerIndex-1;
    log.innerText = "다음 라운드까지 : "+timerIndex+"초";

    if(timerIndex<1){clearInterval(trigger_timer)};
}
function wave_ready(){

    if(wave_on==0){
        trigger_timer = setInterval(timer,1000);
        setTimeout(wave,20000);
    }
    
   
}
function wave_start(){
    attack_ready();
    trigger_check = setInterval(check_ready,50);
}
function wave(){
    //이동속도 1 , 0.5 , 0.2, 0.1 만 사용가능함 ㅜ
    let round = document.getElementById("round");
    round.innerText = "Wave "+(curWave+1)
    wave_on=1;
    //curWave=9;
    //mob_HP = mob_HP *1.5*1.5*1.5*1.5*1.5*1.5*1.5*1.5*1.5;
    if(curWave==0){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==1){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==2){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==3){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==4){    // 미니보스
        spawn(mob_HP*20,0.1);
    }
    else if(curWave==5){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==6){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==7){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==8){
        for(let i=0;i<40;i++){
            spawn(mob_HP,0.5);
        }
    }
    else if(curWave==9){    //보스
        spawn(mob_HP*100,0.1);
    }
    wave_start();
    if((curWave+1)/5==0){
        mop_hp=Math.floor(mob_hp*5);
    }
    mob_HP = Math.floor(mob_HP*1.5);
    curWave++;
    timerIndex=20;
}
function get_tower(pos){
    let display_money = document.getElementById("money");
    let sel = document.getElementById("sel_tile");
    let rand;
    let pass = 0;

    if(money>=20){
        money=money-20;
        display_money.innerText = money+"G";
        pass++;
    }
    if(pass!=0){
        rand = Math.floor(Math.random()*8+1);
        let select_tile = document.getElementById("tile"+pos);
        
        if(rand==1){
            tile[pos].tower = "common_arc";
            select_tile.innerHTML = "<div class='common arc'></div>";
            tile[pos].range=25;
            tile[pos].damage=5;
        }
        else if(rand==2){
            tile[pos].tower = "common_square";
            select_tile.innerHTML = "<div class='common square'></div>";
            tile[pos].range=15;
            tile[pos].damage=5;
        }
        else if(rand==3){
            tile[pos].tower = "common_diamond";
            select_tile.innerHTML = "<div class='common diamond'></div>";
            tile[pos].range=40;
            tile[pos].damage=3;
        }
        else if(rand==4){
            tile[pos].tower = "common_triangle";
            select_tile.innerHTML = "<div class='common triangle'></div>";
            tile[pos].range=15;
            tile[pos].damage=10;
        }
        else if(rand==5){
            tile[pos].tower = "common_star";
            select_tile.innerHTML = "<div class='common star'></div>";
            tile[pos].range=20;
            tile[pos].damage=3;
        }
        else if(rand==6){
            tile[pos].tower = "common_pentagon";
            select_tile.innerHTML = "<div class='common pentagon'></div>";
            tile[pos].range=25;
            tile[pos].damage=7;
        }
        else if(rand==7){
            tile[pos].tower = "common_jewel";
            select_tile.innerHTML = "<div class='common jewel'></div>";
            tile[pos].range=60;
            tile[pos].damage=1;
        }
        else if(rand==8){
            tile[pos].tower = "common_cross";
            select_tile.innerHTML = "<div class='common cross'></div>";
            tile[pos].range=40;
            tile[pos].damage=20;
        }
        sel.style.display='none';
    }
    if(wave_on==1){
        for(let i=0;i<attack_trigger_count;i++){
            clearInterval(trigger_attack2[i]);
        }
        attack_ready();
    }
    check_quest();

}
function sell_tower(pos){
    if(tile[pos].tower.indexOf("common")!=-1){
        money=money+10;  
    }
    else if(tile[pos].tower.indexOf("magic")!=-1){
        money=money+20;
    }
    else if(tile[pos].tower.indexOf("rare")!=-1){
        money=money+40;
    }
    else if(tile[pos].tower.indexOf("unique")!=-1){
        money=money+100;
    }
    else if(tile[pos].tower.indexOf("epic")!=-1){
        money=money+250;
    }

    let select_tile = document.getElementById("tile"+pos);
    select_tile.innerHTML = "";
    tile[pos].range=0;
    tile[pos].damage=0;
    tile[pos].target=0;
    tile[pos].tower=0;

    let display_money = document.getElementById("money");
    display_money.innerText = money+"G";

    none_tile();
}
function mix_tower(pos){
    let temp_tower = tile[pos].tower;
    let get_rank=0;

    for(let i=0;i<75;i++){
        if(i!=pos&&tile[i].tower==temp_tower&&tile[i].tower.indexOf("epic")==-1){
            tile[i].tower = 0;
            tile[i].range = 0;
            tile[i].damage = 0;

            let cleartile = document.getElementById("tile"+i);
            cleartile.innerHTML = "";

            if(temp_tower.indexOf("common")!=-1){
                get_rank=1;
            }
            else if(temp_tower.indexOf("magic")!=-1){
                get_rank=2;
            }
            else if(temp_tower.indexOf("rare")!=-1){
                get_rank=3;
            }
            else if(temp_tower.indexOf("unique")!=-1){
                get_rank=4;
            }
            else if(temp_tower.indexOf("epic")!=-1){
                get_rank=0;
            }
            break;
        }
    }

    let set_rank;
    if(get_rank==0){set_rank="";}
    if(get_rank==1){set_rank="magic";}
    else if(get_rank==2){set_rank="rare";}
    else if(get_rank==3){set_rank="unique";}
    else if(get_rank==4){set_rank="epic";}

    if(get_rank!=0&&set_rank!=""){
        let rand=Math.floor(Math.random()*8+1);
        let select_tile = document.getElementById("tile"+pos);

        if(rand==1){
            tile[pos].tower = set_rank+"_arc";
            select_tile.innerHTML = "<div class='"+set_rank+" arc'></div>";

            switch(set_rank){
                case "magic" :
                    tile[pos].range=25;
                    tile[pos].damage=10;
                    break;
                case "rare" :
                    tile[pos].range=25;
                    tile[pos].damage=50;
                    break;
                case "unique" :
                    tile[pos].range=25;
                    tile[pos].damage=250;
                    break;
                case "epic" :
                    tile[pos].range=25;
                    tile[pos].damage=1000;
                    break;
            }
        }
        else if(rand==2){
            tile[pos].tower = set_rank+"_square";
            select_tile.innerHTML = "<div class='"+set_rank+" square'></div>";

            switch(set_rank){
                case "magic" :
                    tile[pos].range=15;
                    tile[pos].damage=10;
                    break;
                case "rare" :
                    tile[pos].range=25;
                    tile[pos].damage=30;
                    break;
                case "unique" :
                    tile[pos].range=40;
                    tile[pos].damage=150;
                    break;
                case "epic" :
                    tile[pos].range=60;
                    tile[pos].damage=700;
                    break;
            }
        }
        else if(rand==3){
            tile[pos].tower = set_rank+"_diamond";
            select_tile.innerHTML = "<div class='"+set_rank+" diamond'></div>";

            switch(set_rank){
                case "magic" :
                    tile[pos].range=40;
                    tile[pos].damage=7;
                    break;
                case "rare" :
                    tile[pos].range=40;
                    tile[pos].damage=21;
                    break;
                case "unique" :
                    tile[pos].range=40;
                    tile[pos].damage=100;
                    break;
                case "epic" :
                    tile[pos].range=40;
                    tile[pos].damage=900;
                    break;
            }
        }
        else if(rand==4){
            tile[pos].tower = set_rank+"_triangle";
            select_tile.innerHTML = "<div class='"+set_rank+" triangle'></div>";

            switch(set_rank){
                case "magic" :
                    tile[pos].range=10;
                    tile[pos].damage=50;
                    break;
                case "rare" :
                    tile[pos].range=10;
                    tile[pos].damage=100;
                    break;
                case "unique" :
                    tile[pos].range=10;
                    tile[pos].damage=500;
                    break;
                case "epic" :
                    tile[pos].range=10;
                    tile[pos].damage=2500;
                    break;
            }
            tile[pos].range=15;
            tile[pos].damage=50;
        }
        else if(rand==5){
            tile[pos].tower = set_rank+"_star";
            select_tile.innerHTML = "<div class='"+set_rank+" star'></div>";
            tile[pos].range=15;
            tile[pos].damage=20;
        }
        else if(rand==6){
            tile[pos].tower = set_rank+"_pentagon";
            select_tile.innerHTML = "<div class='"+set_rank+" pentagon'></div>";
            tile[pos].range=20;
            tile[pos].damage=20;
        }
        else if(rand==7){
            tile[pos].tower = set_rank+"_jewel";
            select_tile.innerHTML = "<div class='"+set_rank+" jewel'></div>";
            tile[pos].range=20;
            tile[pos].damage=20;
        }
        else if(rand==8){
            tile[pos].tower = set_rank+"_cross";
            select_tile.innerHTML = "<div class='"+set_rank+" cross'></div>";
            tile[pos].range=20;
            tile[pos].damage=60;
        }
        let sel=document.getElementById("sel_tile");
        sel.style.display='none';
        check_quest();
    }
}
function check_quest(){
    let log = document.getElementById("playlog");
    let display_money = document.getElementById("money");
    if(questList[0]==0){
        let quest1 = [0,0,0,0,0,0,0,0];
        for(let i=0;i<75;i++){
            if(tile[i].tower=="common_arc"){quest1[0]=1;}
            else if(tile[i].tower=="common_square"){quest1[1]=1;}
            else if(tile[i].tower=="common_triangle"){quest1[2]=1;}
            else if(tile[i].tower=="common_diamond"){quest1[3]=1;}
            else if(tile[i].tower=="common_star"){quest1[4]=1;}
            else if(tile[i].tower=="common_pentagon"){quest1[5]=1;}
            else if(tile[i].tower=="common_jewel"){quest1[6]=1;}
            else if(tile[i].tower=="common_cross"){quest1[7]=1;}
        }

        let flag_quest1=0;
        for(let i=0;i<quest1.length;i++){
            if(quest1[i]==1){
                flag_quest1++;
            }
        }
        if(8==flag_quest1){
            console.log("퀘스트 클리어");
            log.innerHTML += "<br>퀘스트 < 편식 금지 > 클리어!<br>보상 +100G";
            money=money+100;
            display_money.innerText=money+"G";
            questList[0]++;
        }
        else{console.log(flag_quest1);}
    }
    if(questList[1]==0){
        let quest1=[0,0,0,0,0,0,0,0];
        for(let i=0;i<75;i++){
            if(tile[i].tower=="magic_arc"){quest1[0]=1;}
            else if(tile[i].tower=="magic_square"){quest1[1]=1;}
            else if(tile[i].tower=="magic_triangle"){quest1[2]=1;}
            else if(tile[i].tower=="magic_diamond"){quest1[3]=1;}
            else if(tile[i].tower=="magic_star"){quest1[4]=1;}
            else if(tile[i].tower=="magic_pentagon"){quest1[5]=1;}
            else if(tile[i].tower=="magic_jewel"){quest1[6]=1;}
            else if(tile[i].tower=="magic_cross"){quest1[7]=1;}
        }

        let flag_quest1=0;
        for(let i=0;i<quest1.length;i++){
            if(quest1[i]==1){
                flag_quest1++;
            }
        }
        if(8==flag_quest1){
            console.log("퀘스트 클리어");
            log.innerHTML += "<br>퀘스트 < 그린필드 > 클리어!<br>보상 +150G";
            money=money+150;
            display_money.innerText=money+"G";
            questList[1]++;
        }
        else{console.log(flag_quest1);}
    }
    if(questList[2]==0){
        let quest1=[0,0,0,0,0,0,0,0];
        for(let i=0;i<75;i++){
            if(tile[i].tower=="rare_arc"){quest1[0]=1;}
            else if(tile[i].tower=="rare_square"){quest1[1]=1;}
            else if(tile[i].tower=="rare_triangle"){quest1[2]=1;}
            else if(tile[i].tower=="rare_diamond"){quest1[3]=1;}
            else if(tile[i].tower=="rare_star"){quest1[4]=1;}
            else if(tile[i].tower=="rare_pentagon"){quest1[5]=1;}
            else if(tile[i].tower=="rare_jewel"){quest1[6]=1;}
            else if(tile[i].tower=="rare_cross"){quest1[7]=1;}
        }

        let flag_quest1=0;
        for(let i=0;i<quest1.length;i++){
            if(quest1[i]==1){
                flag_quest1++;
            }
        }
        if(8==flag_quest1){
            console.log("퀘스트 클리어");
            log.innerHTML += "<br>퀘스트 < 블루오션 > 클리어!<br>보상 +200G";
            money=money+200;
            display_money.innerText=money+"G";
            questList[2]++;
        }
        else{console.log(flag_quest1);}
    }
    log.scrollTop = log.scrollHeight;
}
function lotto(){
    let log = document.getElementById("playlog");
    if(money>=50){
        money=money-50;
        
        let rand = Math.floor(Math.random()*100+1);
        let gas_display = document.getElementById("gas");
        let money_display = document.getElementById("money");
        gas = gas+rand;
        gas_display.innerHTML = gas+"<span class='upmoney'></span>";
        money_display.innerHTML = money+"G";
        log.innerHTML += "<br>"+rand+"만큼의 재화를 얻었습니다!";
    }
    else{
        log.innerHTML += "<br>골드가 부족합니다.";
    }
    log.scrollTop = log.scrollHeight;
}
function upgrade(n){
    // 비효율적인 코드 쓰고싶지않긴한데 실력이 딸린다.
    let gas_display = document.getElementById("gas");
    if(n==2){       //arc
        if(gas>=arc_upmoney){
            let up_display = document.getElementById("arcup");
            gas=gas-arc_upmoney;
            arc_upmoney=arc_upmoney+1;
            arc_up=arc_up+1;
            gas_display.innerHTML = gas+"<span class='upmoney'></span>";
            up_display.value="타워 업그레이드( "+arc_upmoney+"◆ )";
            refresh_tower();
        }
    }
    else if(n==3){  //square
        if(gas>=squ_upmoney){
            let up_display = document.getElementById("squup");
            gas=gas-squ_upmoney;
            squ_upmoney=squ_upmoney+1;
            squ_up=squ_up+1;
            gas_display.innerHTML = gas+"<span class='upmoney'></span>";
            up_display.value="타워 업그레이드( "+squ_upmoney+"◆ )";
            refresh_tower();
        }
    }
    else if(n==4){  //triangle

    }
    else if(n==5){  //diamond

    }
    else if(n==6){  //star

    }
    else if(n==7){  //pentagon

    }
    else if(n==8){  //jewel

    }
    else if(n==1){  //cross

    }

}
function refresh_tower(){
    for(let i=0;i<75;i++){
        if(tile[i].tower!=""||tile[i].tower!=0){
            if(tile[i].tower.indexOf("_arc")!=-1){
                let str_pos = tile[i].tower.indexOf("_arc");
                let refresh_rank="";
                refresh_rank=tile[i].tower[0];
                for(let j=1;j<str_pos;j++){
                    refresh_rank += tile[i].tower[j];
                }
                switch(refresh_rank){
                    case "common" :
                        tile[i].range=25;
                        tile[i].damage=5+1*arc_up;
                        break;
                    case "magic" :
                        tile[i].range=25;
                        tile[i].damage=10+2*arc_up;
                        break;
                    case "rare" :
                        tile[i].range=25;
                        tile[i].damage=50+10*arc_up;
                        break;
                    case "unique" :
                        tile[i].range=25;
                        tile[i].damage=250+50*arc_up;
                        break;
                    case "epic" :
                        tile[i].range=25;
                        tile[i].damage=1000+200*arc_up;
                        break;
                }
            }
            if(tile[i].tower.indexOf("_square")!=-1){
                console.log("I fonud it!");
                let str_pos = tile[i].tower.indexOf("_square");
                let refresh_rank="";
                refresh_rank=tile[i].tower[0];
                for(let j=1;j<str_pos;j++){
                    refresh_rank += tile[i].tower[j];
                }
                switch(refresh_rank){
                    case "common":
                        tile[pos].range=15;
                        tile[pos].damage=5+1*squ_up;
                    case "magic" :
                        tile[pos].range=15;
                        tile[pos].damage=10+2*squ_up;
                        break;
                    case "rare" :
                        tile[pos].range=25;
                        tile[pos].damage=30+5*squ_up;
                        break;
                    case "unique" :
                        tile[pos].range=40;
                        tile[pos].damage=150+30*squ_up;
                        break;
                    case "epic" :
                        tile[pos].range=60;
                        tile[pos].damage=700+140*squ_up;
                        break;
                }
            }
        }
    }
}
function click_tile(pos){
    let sel = document.getElementById("sel_tile");
    let x;
    let y;

    if(pos==0||pos==1||pos==2||pos==12||pos==13){
        y=5;
    }
    else if(pos==3||pos==4||pos==5||pos==14||pos==15||pos==20||pos==21||pos==22){
        y=10;
    }
    else if(pos==6||pos==7||pos==8||pos==16||pos==17||pos==23||pos==24||pos==25){
        y=15;
    }
    else if(pos==9||pos==10||pos==11||pos==18||pos==19||pos==26||pos==27||pos==28){
        y=20;
    }
    else if(pos==29||pos==30||pos==31||pos==32||pos==37||pos==38||pos==41||pos==42||pos==43||pos==44){
        y=30;
    }
    else if(pos==33||pos==34||pos==35||pos==36||pos==39||pos==40||pos==45||pos==46||pos==47||pos==48){
        y=35;
    }
    else if(pos==49||pos==50||pos==51||pos==58||pos==59||pos==66||pos==67||pos==68){
        y=45;
    }
    else if(pos==52||pos==53||pos==54||pos==60||pos==61||pos==69||pos==70||pos==71){
        y=50;
    }
    else if(pos==55||pos==56||pos==57||pos==62||pos==63||pos==72||pos==73||pos==74){
        y=42.5;
    }
    else if(pos==64||pos==65){
        y=47.5;
    }

    if(pos==29||pos==30){
        x=0;
    }
    if(pos==0||pos==3||pos==6||pos==9||pos==30||pos==34||pos==49||pos==52||pos==55){
        x=5;
    }
    else if(pos==1||pos==4||pos==7||pos==10||pos==31||pos==35||pos==50||pos==53||pos==56){
        x=10;
    }
    else if(pos==2||pos==5||pos==8||pos==11||pos==32||pos==36||pos==51||pos==54||pos==57){
        x=15;
    }
    else if(pos==12||pos==14||pos==16||pos==18||pos==37||pos==39||pos==58||pos==60||pos==62||pos==64){
        x=25;
    }
    else if(pos==13||pos==15||pos==17||pos==19||pos==38||pos==40||pos==59||pos==61||pos==63||pos==65){
        x=30;
    }
    else if(pos==20||pos==23||pos==26||pos==41||pos==45||pos==66||pos==69||pos==72){
        x=40;
    }
    else if(pos==21||pos==24||pos==27||pos==42||pos==46||pos==67||pos==70||pos==73){
        x=45;
    }
    else if(pos==22||pos==25||pos==28||pos==43||pos==47||pos==68||pos==71||pos==74){
        x=50;
    }
    else if(pos==44||pos==48){
        x=55;
    }

    sel.style.display='block';
    sel.style.top=y+'em';
    sel.style.left=x+'em';

    tile[pos].x=x+2.5;
    tile[pos].y=y-2.5;

    if(tile[pos].tower==0){
        sel.innerHTML = "<input class='buy_btn' type='button' value='타워 뽑기(20G)' style=color:'yellow' onclick=get_tower("+pos+")>";
    }
    else{
        let temp_range = 0;

        let sell_price="";
        if(tile[pos].tower.indexOf("magic")!=-1){
            sell_price="(20G)";
        }
        else if(tile[pos].tower.indexOf("rare")!=-1){
            sell_price="(40G)";
        }
        else if(tile[pos].tower.indexOf("unique")!=-1){
            sell_price="(100G)";
        }
        else if(tile[pos].tower.indexOf("epic")!=-1){
            sell_price="(250G)";
        }
        else{
            sell_price="(10G)";
        }

        sel.innerHTML = "<div id='range' onclick=none_tile()></div><input class='tile_btn' type='button' value='팔기"+sell_price+"' onclick=sell_tower("+pos+")><input class='tile_btn' type='button' value='조합하기' onclick=mix_tower("+pos+")>";
        let range=document.getElementById("range");

        if(tile[pos].tower.indexOf("arc")!=-1){
            range.style.bottom=-2.5+'em';
            range.style.left=-10+'em';
            range.style.width=25+'em';
            range.style.height=25+'em';
            temp_range = 25;
        }
        else if(tile[pos].tower.indexOf("square")!=-1){
            if(tile[pos].tower.indexOf("magic")!=-1||tile[pos].tower.indexOf("common")!=-1){
                range.style.bottom=2.5+'em';
                range.style.left=-5+'em';
                range.style.width=15+'em';
                range.style.height=15+'em';
                temp_range = 15;
            }
            else if(tile[pos].tower.indexOf("rare")!=-1){
                range.style.bottom=-2.5+'em';
                range.style.left=-10+'em';
                range.style.width=25+'em';
                range.style.height=25+'em';
                temp_range = 25;
            }
            else if(tile[pos].tower.indexOf("unique")!=-1){
                range.style.bottom=-10+'em';
                range.style.left=-17.5+'em';
                range.style.width=40+'em';
                range.style.height=40+'em';
                temp_range = 40;
            }
            else if(tile[pos].tower.indexOf("epic")!=-1){
                range.style.bottom=-20+'em';
                range.style.left=-27.5+'em';
                range.style.width=60+'em';
                range.style.height=60+'em';
                temp_range = 60;
            }
        }
        else if(tile[pos].tower.indexOf("diamond")!=-1){
            range.style.bottom=-10+'em';
            range.style.left=-17.5+'em';
            range.style.width=40+'em';
            range.style.height=40+'em';
            temp_range = 40;
        }
        else if(tile[pos].tower.indexOf("triangle")!=-1){
            range.style.bottom=2.5+'em';
            range.style.left=-5+'em';
            range.style.width=15+'em';
            range.style.height=15+'em';
            temp_range = 15;
        }
        else if(tile[pos].tower.indexOf("star")!=-1){
            range.style.bottom=2.5+'em';
            range.style.left=-5+'em';
            range.style.width=15+'em';
            range.style.height=15+'em';
            temp_range = 15;
        }
        else if(tile[pos].tower.indexOf("cross")!=-1){
            range.style.bottom=-10+'em';
            range.style.left=-17.5+'em';
            range.style.width=40+'em';
            range.style.height=40+'em';
            temp_range = 40;
        }
        else if(tile[pos].tower.indexOf("pentagon")!=-1){
            range.style.bottom=-2.5+'em';
            range.style.left=-10+'em';
            range.style.width=25+'em';
            range.style.height=25+'em';
            temp_range = 25;
        }
        else if(tile[pos].tower.indexOf("jewel")!=-1){
            range.style.bottom=-20+'em';
            range.style.left=-27.5+'em';
            range.style.width=60+'em';
            range.style.height=60+'em';
            temp_range = 60;
        }
        
        if((pos==55||pos==56||pos==57||pos==62||pos==63||pos==72||pos==73||pos==74||pos==64||pos==65)&&temp_range==25){
            range.style.top=-2.5+'em';
        }
        else if((pos==55||pos==56||pos==57||pos==62||pos==63||pos==72||pos==73||pos==74||pos==64||pos==65)&&temp_range==40){
            range.style.top=-10+'em';
        }
        else if((pos==55||pos==56||pos==57||pos==62||pos==63||pos==72||pos==73||pos==74||pos==64||pos==65)&&temp_range==15){
            range.style.top=2.5+'em';
        }
    }

}
function none_tile(){
    let sel = document.getElementById("sel_tile");
    sel.style.display='none';
}
function map_setting(){
    let tile_count=0;
    let instage = document.getElementById("stage_inline");
    instage.innerHTML="<div class='empty_line' onclick=none_tile()></div>"

    let display_money = document.getElementById("money");
    display_money.innerText = money+"G";

    for(let i=0;i<9;i++){
        instage.innerHTML+="<div class='allline line"+i+"' id='line"+i+"'></div>"
    }
    for(let i=0;i<9;i++){
        let instage_space = document.getElementById("line"+i);

        /*
        if(i==0){
            for(let j=0;j<12;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")>"+tile_count+"</span>";
                tile_count++;
            }
        }
        else if(i==1||i==7){
            for(let j=0;j<8;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")>"+tile_count+"</span>";
                tile_count++;
            }
        }
        else if(i==2||i==6||i==8){
            for(let j=0;j<9;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")>"+tile_count+"</span>";
                tile_count++;
            }
        }
        else if(i==3||i==5){
            for(let j=0;j<8;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")>"+tile_count+"</span>";
                tile_count++;
            }
        }
        else if(i==4){
            for(let j=0;j<4;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")>"+tile_count+"</span>";
                tile_count++;
            }
        }
        */
        if(i==0){
            for(let j=0;j<12;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")></span>";
                tile_count++;
            }
        }
        else if(i==1||i==7){
            for(let j=0;j<8;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")></span>";
                tile_count++;
            }
        }
        else if(i==2||i==6||i==8){
            for(let j=0;j<9;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")></span>";
                tile_count++;
            }
        }
        else if(i==3||i==5){
            for(let j=0;j<8;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")></span>";
                tile_count++;
            }
        }
        else if(i==4){
            for(let j=0;j<4;j++){
                instage_space.innerHTML+= "<span class='tile' id='tile"+tile_count+"' onclick=click_tile("+tile_count+")></span>";
                tile_count++;
            }
        }
        
    }
    instage.innerHTML+="<div class='end' onclick=none_tile()></div>"
}
map_setting();
wave_ready();
