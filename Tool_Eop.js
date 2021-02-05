const type = document.getElementById('mbody').children[0].className;

function promptDelay() {
  const delay = prompt('Nhập thời gian (phút)', 5);
  if (delay != null) return delay * 1000 * 60;
  return null;
}

function run() {
  const type = document.getElementById('mbody').children[0].className;
  const btnSubmit = document.querySelector('.btn.btn-info.dnut');
  const time = prompt();
  switch (type) {
    case 'dvocabulary default':
      dVocabulary(time);
      break;
    case 'dquestion choose-reading-choose-answer':
      dQuestion(time);
      break;
    case 'dquestion fill-listening-write-answer':
    case 'dquestion fill-grammar-word-blank':
      dquestionFill(time);
      break;
    case 'dmcq image-choose-word':
      dWrite();
      break;
    case 'dcontent view-content':
      setTimeout(() => {
        btnSubmit.click();
      },time)
      break;
  }
}

function dVocabulary(delay) {
  var time = delay;
  var daudio = document.querySelectorAll('.daudio');
  let i = 0;
  var promise = new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (i <= daudio.length - 1) {
        daudio[i].click();
        i++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    setTimeout(() => resolve('done'), time);
  });

  promise.then(() => {
    document.querySelectorAll('.dnut')[0].click();
  });
}


function dQuestion(delay) {
  const time = delay;
  let radio = document.querySelectorAll('.deck');
  let radioCheck = document.querySelectorAll('.iradio_square-green');
  let jump = document.querySelector('.ques').querySelectorAll('.dchk').length;
  let btnSubmit = document.querySelector('.btn.btn-info.dnut');
  let btnAnswer = document.querySelector('.btn.btn-danger.dnut');
  let btnRemake = document.querySelector('.btn.dnut.btn-primary');
  const keyList = [];

  for(let i = 0 ; i <= radio.length - jump; i+= jump){
    radio[i].checked = true;
  }

  let promise = new Promise((resolve, reject) => {
    btnSubmit.click();

    setTimeout(() => {
      resolve('done');
    }, 1000 * 35);
  })

  function getColor(e) {
    return window.getComputedStyle(e).color === 'rgb(0, 128, 0)';
  }

  promise.then((t) => {
    btnAnswer.click();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("done");
      },2000)
    })
  })
  .then((t) => {
    for(let i = 0 ; i <= radio.length; i++){
      if(radioCheck[i].classList[1] === 'checked'){
        keyList.push(i);
      }
    }
    let btnRemake = document.querySelector('.btn.dnut.btn-primary');
    btnRemake.click();

    return new Promise(resolve => {
      setTimeout(() => {
        resolve("done");
      })
    })
  })
  .then((t) => {
    for(index of keyList){
      radio[index].checked = true;
    }

    setTimeout(() => {
      btnSubmit.click();
    },time)
  })
}

function dWrite() {
  let btn = document.querySelectorAll('.dtitle');
  let i = 0;
  const loop = setInterval(()=> {

    if(i === btn.length)
      clearInterval(loop);

    btn[i].click();
    i++;
  }, 3000)
}

function dquestionFill(time){
  let input = document.querySelectorAll('.danw.dinline');
  let btnSubmit = document.querySelector('.btn.btn-info.dnut');
  let btnAnswer = document.querySelector('.btn.btn-danger.dnut');

  const listKey = [];
  for(let i = 0 ; i < input.length ; i++){
    input[i].value = 'a';
  }
  
  let promise = new Promise(resolve => {
    
    setTimeout(() => {
      btnSubmit.click();
      resolve("done");
    },30*1000);
  })
  .then((t) => {
    btnAnswer.click();
  
    return new Promise(resolve => {
      setTimeout(() => {
        for(let i = 0 ; i < input.length ; i++){
          listKey.push(input[i].placeholder);
        }
        let btnRemake = document.querySelector('.btn.dnut.btn-primary');
        btnRemake.click();
        console.log('promise');
        resolve("done");
      },2000);
    })
  })
  .then((t) => {
    console.log('loop value');
    for(let i = 0 ; i < input.length ; i++){
      input[i].value = listKey[i];
    }
    
    setTimeout(() => {
      btnSubmit.click();
    }, time);
  })
}

run();

