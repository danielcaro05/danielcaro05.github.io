---
permalink: /chat.html
title: "Chat"
excerpt: "Local LLM chat interface"
author_profile: true
---

<div id="chat-app">
  <div class="chat-config">
    <label>Server URL <input id="endpoint" type="text" value="http://localhost:8080" spellcheck="false"></label>
    <button id="connect-btn" class="btn-chat" onclick="checkHealth()">Check Connection</button>
    <span id="status" class="status-dot"></span><span id="status-text">Not connected</span>
  </div>

  <div id="chat-window" aria-live="polite">
    <div class="msg assistant"><div class="bubble">Hi! Start a conversation below. Make sure <code>llama-server</code> is running on your machine.</div></div>
  </div>

  <div class="chat-input-row">
    <input type="file" id="image-input" accept="image/*" hidden>
    <button id="attach-btn" title="Attach image">📎</button>
    <img id="image-preview" hidden alt="">
    <button id="clear-img" hidden title="Remove image">×</button>
    <textarea id="user-input" rows="1" placeholder="Type a message… (Enter to send, Shift+Enter for newline)"></textarea>
    <button id="send-btn">Send</button>
    <button id="stop-btn" hidden>Stop</button>
  </div>
</div>

<script>
(function () {
  const $ = (id) => document.getElementById(id);
  const win = $('chat-window'), input = $('user-input'), statusDot = $('status'), statusText = $('status-text');
  let history = [], attachedImage = null, controller = null;

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function addMsg(role, html) {
    const d = document.createElement('div');
    d.className = 'msg ' + role;
    d.innerHTML = '<div class="bubble">' + html + '</div>';
    win.appendChild(d);
    win.scrollTop = win.scrollHeight;
    return d.querySelector('.bubble');
  }

  function setStatus(cls, txt) {
    statusDot.className = 'status-dot ' + cls;
    statusText.textContent = txt;
  }

  async function checkHealth() {
    setStatus('pending', 'Checking…');
    try {
      const r = await fetch($('endpoint').value.replace(/\/+$/,'') + '/health');
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      setStatus('ok', j.status === 'ok' ? 'Connected' : 'Loading model (' + Math.round((j.progress||0)*100) + '%)');
    } catch (e) {
      setStatus('err', 'Unreachable — is llama-server running?');
    }
  }

  function buildContent(text) {
    if (!attachedImage) return text;
    return [
      { type: 'text', text: text },
      { type: 'image_url', image_url: { url: attachedImage } }
    ];
  }

  async function send() {
    const text = input.value.trim();
    if ((!text && !attachedImage) || controller) return;

    addMsg('user', attachedImage
      ? '<img src="' + attachedImage + '" class="chat-img">' + (text ? '<p>' + esc(text) + '</p>' : '')
      : esc(text));
    history.push({ role: 'user', content: buildContent(text || 'Describe this image.') });

    input.value = ''; input.style.height = 'auto';
    clearImage();

    const bubble = addMsg('assistant', '<span class="cursor">▍</span>');
    controller = new AbortController();
    $('stop-btn').hidden = false; $('send-btn').disabled = true;

    let full = '';
    try {
      const res = await fetch($('endpoint').value.replace(/\/+$/,'') + '/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, stream: true }),
        signal: controller.signal
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      const reader = res.body.getReader(), dec = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
          if (!line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const t = JSON.parse(data).choices?.[0]?.delta?.content || '';
            full += t;
            bubble.innerHTML = markedLite(full) + '<span class="cursor">▍</span>';
            win.scrollTop = win.scrollHeight;
          } catch (e) {}
        }
      }
      bubble.textContent = full;
      history.push({ role: 'assistant', content: full });
    } catch (e) {
      if (e.name === 'AbortError') {
        bubble.textContent = full || '(stopped)';
        if (full) history.push({ role: 'assistant', content: full });
      } else {
        bubble.innerHTML = '<em>Error: ' + esc(e.message) + '. Is the server reachable from this page?</em>';
        history.pop();
      }
    } finally {
      controller = null;
      $('stop-btn').hidden = true; $('send-btn').disabled = false;
      win.scrollTop = win.scrollHeight;
    }
  }

  function markedLite(s) {
    return esc(s)
      .replace(/```([\s\S]*?)```/g, (_, c) => '<pre><code>' + c.trim() + '</code></pre>')
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  function clearImage() {
    attachedImage = null;
    $('image-preview').hidden = true; $('clear-img').hidden = true;
    $('image-input').value = '';
  }

  $('send-btn').addEventListener('click', send);
  $('stop-btn').addEventListener('click', () => controller?.abort());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
  });
  $('attach-btn').addEventListener('click', () => $('image-input').click());
  $('image-input').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      attachedImage = r.result;
      const p = $('image-preview');
      p.src = attachedImage; p.hidden = false; $('clear-img').hidden = false;
    };
    r.readAsDataURL(f);
  });
  $('clear-img').addEventListener('click', clearImage);
})();
</script>

<style>
#chat-app { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
.chat-config {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem;
  font-size: 0.85rem; color: var(--global-text-color-light, #666);
}
.chat-config label { display: flex; align-items: center; gap: 0.5rem; flex: 1 1 auto; min-width: 240px; }
.chat-config input {
  flex: 1; padding: 0.45rem 0.75rem; font-size: 0.85rem;
  border: 1px solid var(--global-border-color, #ddd); border-radius: var(--global-radius, 4px);
  background: var(--global-bg-color, #fff); color: var(--global-text-color, #333);
}
.btn-chat {
  padding: 0.45rem 0.9rem; font-size: 0.8rem; cursor: pointer;
  border: 1px solid var(--global-border-color, #ddd); border-radius: var(--global-radius, 4px);
  background: var(--global-bg-color, #fff); color: var(--global-text-color, #333);
}
.btn-chat:hover { border-color: var(--global-theme-color, #52adc8); color: var(--global-theme-color, #52adc8); }
.status-dot {
  width: 10px; height: 10px; border-radius: 50%; display: inline-block;
  background: #999; flex-shrink: 0;
}
.status-dot.ok { background: #22c55e; }
.status-dot.err { background: #ef4444; }
.status-dot.pending { background: #f59e0b; animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0.4; } }

#chat-window {
  height: 55vh; overflow-y: auto; padding: 1rem;
  border: 1px solid var(--global-border-color, #ddd); border-radius: var(--global-radius, 4px);
  display: flex; flex-direction: column; gap: 0.75rem; scroll-behavior: smooth;
}
.msg { display: flex; }
.msg.user { justify-content: flex-end; }
.bubble {
  max-width: 82%; padding: 0.65rem 1rem; line-height: 1.5; font-size: 0.92rem;
  border-radius: 12px; overflow-wrap: break-word;
}
.msg.user .bubble {
  background: var(--global-theme-color, #52adc8); color: #fff;
  border-bottom-right-radius: 3px;
}
.msg.assistant .bubble {
  background: var(--global-code-background-color, #f6f6f6);
  color: var(--global-text-color, #333);
  border-bottom-left-radius: 3px;
}
.msg.assistant .bubble pre {
  overflow-x: auto; margin: 0.5rem 0; font-size: 0.8rem;
}
.chat-img { max-width: 260px; border-radius: 8px; display: block; margin-bottom: 0.25rem; }
.cursor { animation: blink 0.8s infinite; opacity: 0.6; }

.chat-input-row {
  display: flex; align-items: flex-end; gap: 0.5rem;
}
.chat-input-row button {
  padding: 0.6rem 0.9rem; cursor: pointer; font-size: 0.9rem;
  border: 1px solid var(--global-border-color, #ddd); border-radius: var(--global-radius, 4px);
  background: var(--global-bg-color, #fff); color: var(--global-text-color, #333);
}
#send-btn {
  background: var(--global-theme-color, #52adc8); color: #fff;
  border-color: var(--global-theme-color, #52adc8); font-weight: 600;
}
#send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
#stop-btn { color: #ef4444; border-color: #ef4444; }
#image-preview {
  height: 44px; width: 44px; object-fit: cover;
  border-radius: 6px; border: 1px solid var(--global-border-color, #ddd);
}
#clear-img {
  padding: 0.2rem 0.5rem !important; font-size: 1rem; line-height: 1;
  color: #ef4444 !important; border-color: #ef4444 !important;
}
#user-input {
  flex: 1; resize: none; padding: 0.6rem 0.9rem; font-size: 0.92rem;
  font-family: inherit; line-height: 1.4; max-height: 160px;
  border: 1px solid var(--global-border-color, #ddd); border-radius: var(--global-radius, 4px);
  background: var(--global-bg-color, #fff); color: var(--global-text-color, #333);
}
#user-input:focus { outline: 2px solid var(--global-theme-color, #52adc8); outline-offset: -1px; }
</style>
