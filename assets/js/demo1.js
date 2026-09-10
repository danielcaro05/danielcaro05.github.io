function initDemo1(){
(function() {
  const prompts = [
    { prompt: "Is there a pedestrian visible in the crosswalk during the clip?", answer: "Yes, there is a pedestrian visible in the crosswalk during the clip, walking alongside the red pickup truck." },
    { prompt: "How many vehicles are stopped at the intersection at the start?", answer: "There are two vehicles stopped at the intersection at the start." },
    { prompt: "Does any car make a right turn during the clip?", answer: "Yes, a car makes a right turn during the clip, navigating through the intersection." },
    { prompt: "Did the red pickup truck finish driving through the intersection before the pedestrians finished crossing the crosswalk?", answer: "No, the red pickup truck did not finish driving through the intersection before the pedestrians finished crossing the crosswalk." },
    { prompt: "Based strictly on what you see in the video, what if the red pickup truck had turned right instead of continuing straight through the intersection? Would any pedestrians have been at risk?", answer: "If the red pickup truck had turned right instead of continuing straight through the intersection, there would not be any pedestrians at risk in the video." }
  ];
  let idx = 0;
  const win = document.getElementById('demo1-chat-window');
  const btn = document.getElementById('demo1-next-btn');
  const prog = document.getElementById('demo1-progress');
  if (!win || !btn || !prog) {
    console.warn('Demo1: required elements not found', {win: !!win, btn: !!btn, prog: !!prog});
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
    prog.textContent = idx + ' / 5 prompts shown';
    if (idx >= prompts.length){
      btn.disabled = true;
      btn.textContent = 'All prompts shown';
      btn.style.opacity = '0.6';
      btn.style.cursor = 'default';
    }
  });
  const hint = document.createElement('div');
  hint.style.cssText = 'text-align:center; color:#888; font-size:0.85em; padding:1.2rem 0;';
  hint.textContent = 'Click \u201cSend Next Prompt\u201d to step through the 5 prompts.';
  win.appendChild(hint);
  btn.addEventListener('click', function rm(){ hint.remove(); btn.removeEventListener('click', rm); }, {once:true});
})();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDemo1);
} else {
  initDemo1();
}
