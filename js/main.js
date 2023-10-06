let btn = document.querySelector('.bttn');
let bullets = document.querySelector('.bullets');
let quistion = document.querySelector('.quistion');
let count = document.querySelector('.count span');
let mindiv = document.querySelector('.min');
let secdiv = document.querySelector('.sec');


let arrLength; 
let obj;
let index = 0;
let score = 0;
let clickk = 0;
let cou;
let duration = 5; // in seconds


console.log(btn)
// btn.addEventListener('click',load);


    let xhr = new XMLHttpRequest();
    xhr.open('GET','main.json',true);

    xhr.onload = function(){
        if(xhr.status===200){
            // console.log(xhr.responseText);
            obj = JSON.parse(xhr.responseText)
            arrLength = obj.length;
            // console.log(obj)
            createBullets();
            createQuestion();
           
            coun(duration);
        }
    }
    
    
    xhr.send();




// FUNCTIONS


/*/* Bullets*/ 
let bullet = "";
let bulletsSpan;
let p;
function createBullets(){
    bullets.innerHTML = '';
    bullet = '';
    // console.log(obj.length);
    for(let i=1;i<=arrLength;i++){
        if(i-1>index){
            bullet +=  `<span></span>` ;
            console.log("d")
        }
        else{
            bullet +=  `<span class='active'></span>` ;
        }
        
    }
    bullets.innerHTML = bullet;
    
}


// console.log(bulletsSpan)



/*/* QUISTION AND ANSWER*/ 

function createQuestion(){
    if(index<arrLength){
        let u = document.querySelector('#answers');
        u.innerHTML = "";
        let ele = obj[index];
        // console.log(ele)
        document.querySelector('#quistion').innerHTML =`<h1 id="quistion">${ele['title']}</h1>`;
        for(let i=1;i<=4;i++){
            let y = `<div class="answer"  >
            <input type="radio" name="answer" id="answer_${i}" data-answer = '${ele[`answer_${i}`]}' >
            <label for="answer_${i}">${ele[`answer_${i}`]}</label>
          </div>`;
        //   console.log(y);
          u.innerHTML += y;
        }

        count.innerHTML = arrLength;
    
    }
}

/*/* CHECK ANSWER FUNCTION*/ 

btn.addEventListener('click',check);
function check(){
    console.log("click")
    let ans = document.getElementsByName('answer');
    ans = [...ans];
    ans.map(ele=>{
        if(ele.checked){
            let chossen = ele.dataset.answer;
            let rigth = obj[index]['right_answer'];
            console.log(rigth)
            console.log(chossen)
           if(chossen===rigth){ score++; }
           
        }
    })
    index++;
    clearInterval(cou);
    coun(duration);
   console.log(index)
    createBullets();
    createQuestion();
    
    if(index==arrLength){
        console.log('end')
        result();
    }
    
}

/*/* RESULT */

function result(){
    if(score<arrLength/2 && score!=arrLength-1){
        t = ` <span class=' low'>Low</span>`;
    } 
    else if(score>=arrLength/2 && score!=arrLength-1){
        t = ` <span class=' good'>Good</span>`;
    }
    else{
        t = ` <span class=' high'>Perfect</span>`;
    }
    let res = `<div class='result'>You Finish The Test Your Grade is&nbsp;${t} </div>`;
    quistion.innerHTML = res;
    console.log(score)
    clearInterval(cou);
}

/*/* COUNT DOWN */

function coun(du){
        cou = setInterval(()=>{
        let min = parseInt(du/60);
        let sec = parseInt(du%60);

        min = min<10?  `0${min}`:min;
        sec = sec<10?  `0${sec}`:sec;
        console.log(min)
        console.log(sec)
        mindiv,innerHTML="",secdiv.innerHTML="";
        mindiv.innerHTML = min+":";
        secdiv.innerHTML = sec;
        if(--du<0){
            clearInterval(cou);
            btn.click();
            du = duration;
        }

    },1000)
}

