(function(){
  const correct = 'B';
  const opts = document.querySelectorAll('#sample-counterfactual .sample-option');
  const fb = document.getElementById('sample-feedback');
  const reveal = document.getElementById('sample-reveal');
  if (!opts.length || !fb || !reveal) return;
  let answered = false;
  opts.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const choice = btn.getAttribute('data-choice');
      const isCorrect = choice === correct;
      opts.forEach(b => {
        b.disabled = true;
        b.style.cursor = 'default';
        b.style.opacity = '0.7';
        if (b.getAttribute('data-choice') === correct) {
          b.style.borderColor = '#22c55e';
          b.style.background = '#f0fdf4';
        } else if (b === btn && !isCorrect) {
          b.style.borderColor = '#ef4444';
          b.style.background = '#fef2f2';
        }
      });
      fb.style.display = 'block';
      if (isCorrect) {
        fb.style.background = '#f0fdf4';
        fb.style.border = '1px solid #22c55e';
        fb.innerHTML = '<span style="font-weight:600; color:#15803d;">Correct \u2014 Answer B</span>';
      } else {
        fb.style.background = '#fef2f2';
        fb.style.border = '1px solid #ef4444';
        fb.innerHTML = '<span style="font-weight:600; color:#b91c1c;">Not quite \u2014 Correct answer is B</span>';
      }
      reveal.style.display = 'block';
      if (isCorrect) {
        reveal.innerHTML = 'You were able to answer correctly without any video context.';
      } else {
        reveal.innerHTML = 'You\u2019re not helping me prove my point!! The correct answer was B.';
      }
    });
  });
})();
