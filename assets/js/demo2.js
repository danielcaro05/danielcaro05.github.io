function initDemo2(){
(function() {
  const prompts = [
    { prompt: "Do you detect a vehicle collision occurring in this clip? Make sure you closely inspect all frames of the video.", answer: "Yes" },
    { prompt: "Can you describe how this collision occurred?", answer: "A white SUV driving on the right side of the road abruptly collides with a vehicle moving at a very high speed on the left side. This vehicle's erratic movements and lack of proper speed control contribute to the collision. The sudden and aggressive maneuvers by the white SUV lead to the crash, as evidenced by the abrupt halt of traffic behind it." },
    { prompt: "What specific vehicles are involved in this collision?", answer: "The collision involves a white SUV on the right and a black car on the left." },
    { prompt: "Who is responsible for it?", answer: "The responsibility lies with the driver of the white SUV, who failed to maintain a safe distance and speed, leading to the collision." },
    { prompt: "Look specifically in the last couple frames of the video, does the gap between the ego vehicle and sedan ahead of it shrink?", answer: "Yes, the gap between the ego vehicle and the sedan ahead of it begins to shrink as the sedan accelerates, leading up to the collision." },
    { prompt: "So is the ego vehicle part of a collision?", answer: "No, the ego vehicle is not part of the collision. It is following a sedan at a safe distance and does not contribute to the crash." },
    { prompt: "Do the ego vehicle and the sedan collide at the end of the video when the gap between them shrinks?", answer: "Yes, at the end of the video, the gap between the ego vehicle and the sedan shrinks further as the sedan speeds up, resulting in the collision." },
    { prompt: "Who is involved in this collision?", answer: "The collision involves a white SUV on the right and a black car on the left." }
  ];
  let idx = 0;
  const win = document.getElementById('demo2-chat-window');
  const btn = document.getElementById('demo2-next-btn');
  const prog = document.getElementById('demo2-progress');
  if (!win || !btn || !prog) {
    console.warn('Demo2: required elements not found', {win: !!win, btn: !!btn, prog: !!prog});
    return;
  }
  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function addMsg(role, text){
    const d = document.createElement('div');
    d.style.cssText = role==='user' ? 'align-self:flex-end; background:#52adc8; color:#fff; padding:0.5rem 0.75rem; border-radius:12px 12px 3px 12px; max-width:85%;' : 'align-self:flex-start; background:#fff; color:#333; padding:0.5rem 0.75rem; border-radius:12px 12px 12px 3px; max-width:85%; border:1px solid #e5e5e5;';
    d.innerHTML = esc(text).replace(/\n/g,'<br>');
    win.appendChild(d);
    win.scrollTop = win.scrollHeight;
  }
  btn.addEventListener('click', () => {
    if (idx >= prompts.length) return;
    const {prompt, answer} = prompts[idx];
    addMsg('user', prompt);
    setTimeout(() => { addMsg('assistant', answer); }, 450);
    idx++;
    prog.textContent = idx + ' / 8 prompts shown';
    if (idx >= prompts.length){
      btn.disabled = true;
      btn.textContent = 'All prompts shown';
      btn.style.opacity = '0.6';
      btn.style.cursor = 'default';
    }
  });
  const hint = document.createElement('div');
  hint.style.cssText = 'text-align:center; color:#888; font-size:0.85em; padding:1.2rem 0;';
  hint.textContent = 'Click \u201cSend Next Prompt\u201d to step through the 8 prompts.';
  win.appendChild(hint);
  btn.addEventListener('click', function rm(){ hint.remove(); btn.removeEventListener('click', rm); }, {once:true});
})();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDemo2);
} else {
  initDemo2();
}
