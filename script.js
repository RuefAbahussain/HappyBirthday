(function(){
  'use strict';
  const stage = document.getElementById('stage');
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');

  // ambient dots
  (function ambient(){
    for(let i=0;i<10;i++){
      const d = document.createElement('div');
      d.className='ambient-dot';
      const size = 3+Math.random()*6;
      d.style.width=size+'px'; d.style.height=size+'px';
      d.style.left=Math.random()*100+'%'; d.style.top=Math.random()*100+'%';
      d.style.animationDuration=(10+Math.random()*10)+'s';
      d.style.animationDelay=(Math.random()*6)+'s';
      stage.appendChild(d);
    }
  })();

  let sender='a friend', recipient='you';

  // Handle index.html form
  if(screen1){
    const inviteForm = document.getElementById('inviteForm');
    if(inviteForm){
      inviteForm.addEventListener('submit', function(e){
        e.preventDefault();
        sender = document.getElementById('sender').value.trim() || 'a friend';
        recipient = document.getElementById('recipient').value.trim() || 'you';
        const url = 'card.html?sender=' + encodeURIComponent(sender) + '&recipient=' + encodeURIComponent(recipient);
        window.location.href = url;
      });
    }
  }

  // Handle card.html (setup & reveal)
  if(screen2){
    const restartBtn = document.getElementById('restartBtn');
    const params = new URLSearchParams(window.location.search);
    sender = params.get('sender') || 'a friend';
    recipient = params.get('recipient') || 'you';

    document.getElementById('forLine').textContent = 'For ' + recipient;
    document.getElementById('recipientName').textContent = recipient + '!';
    document.getElementById('fromLine').textContent = 'With love, ' + sender;

    const photoInput = document.getElementById('photoInput');
    const photoPicker = document.getElementById('photoPicker');
    const pickerLabel = document.getElementById('pickerLabel');
    let photoDataUrl = null;

    photoInput.addEventListener('change', function(e){
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(ev){
        photoDataUrl = ev.target.result;
        pickerLabel.style.display='none';
        let img = photoPicker.querySelector('img');
        if(!img){ img=document.createElement('img'); photoPicker.insertBefore(img, photoInput); }
        img.src = photoDataUrl;
      };
      reader.readAsDataURL(file);
    });

    const ageInput = document.getElementById('ageInput');
    const sealBtn = document.getElementById('sealBtn');
    ageInput.addEventListener('input', function(){
      sealBtn.disabled = !(parseInt(ageInput.value,10) > 0);
    });

    const cover = document.getElementById('cover');
    const reveal = document.getElementById('reveal');
    const photoFrameEl = document.getElementById('photoFrame');
    const ageValue = document.getElementById('ageValue');
    const fxLayer = document.getElementById('fxLayer');

    sealBtn.addEventListener('click', function(){
      const age = parseInt(ageInput.value,10);
      if(!(age>0)) return;
      ageValue.textContent = age;
      photoFrameEl.style.background = photoDataUrl
        ? 'url(' + photoDataUrl + ') center/cover'
        : 'linear-gradient(160deg, #E8899B, #C9A24B)';

      sealBtn.classList.add('cracking');
      cover.classList.add('opening');
      startMusic();

      setTimeout(function(){
        screen2.classList.remove('active');
        screen3.classList.add('active');
        reveal.classList.add('show');
        restartBtn.style.display = 'block';
      }, 650);
    });

    if(restartBtn){
      restartBtn.addEventListener('click', function(){
        location.reload();
      });
    }
  }

  // ---- music ----
  let audioElement = null, muted = false;
  function startMusic(){
    if(audioElement) return;
    try{
      audioElement = new Audio('Happy-Birthday.mp3');
      audioElement.loop = true;
      audioElement.volume = 0.6;
      audioElement.play().catch(() => {});
    }catch(e){ console.warn('Audio unavailable', e); }
  }
  const musicToggle = document.getElementById('musicToggle');
  if(musicToggle){
    musicToggle.addEventListener('click', function(){
      if(!audioElement){ startMusic(); this.textContent='🔈'; return; }
      muted = !muted;
      audioElement.volume = muted ? 0 : 0.6;
      this.textContent = muted ? '🔇' : '🔈';
    });
  }
})();

