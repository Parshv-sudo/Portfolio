// Terminal CLI engine — preserved from original implementation
export function initTerminal() {
  const termInput = document.getElementById('terminal-input');
  const termHistory = document.getElementById('terminal-history');
  const termScreen = document.getElementById('terminal-screen');
  const clearBtn = document.getElementById('clear-term-btn');

  if (!termInput || !termHistory) return;

  const commands = {
    'help': () => `<div class="text-on-surface-variant space-y-1"><p class="text-secondary font-semibold">Available Terminal Commands:</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-label-sm"><p><span class="text-primary font-mono font-semibold">whoami</span> — Engineer identity & bio</p><p><span class="text-primary font-mono font-semibold">projects --fullstack</span> — Production systems</p><p><span class="text-primary font-mono font-semibold">skills</span> — JSON capability index</p><p><span class="text-primary font-mono font-semibold">cat resume.txt</span> — ASCII resume</p><p><span class="text-primary font-mono font-semibold">contact --send</span> — Focus contact form</p><p><span class="text-primary font-mono font-semibold">uptime</span> — System stats</p><p><span class="text-primary font-mono font-semibold">clear</span> — Flush history</p></div></div>`,
    'whoami': () => `<div class="text-on-surface-variant space-y-1"><p><span class="text-on-surface font-semibold">Parshv Runwal</span> — Upcoming Forward Deployed Engineer, graduating June 2028.</p><p>Building product-facing full-stack systems, resilient backend services, and high-signal engineering tools.</p><p class="text-primary">Direct Contact: <a href="mailto:pashv.d.runwal@gmail.com" class="underline">pashv.d.runwal@gmail.com</a> | Open to FDE internships, new-grad pipelines, and applied systems work.</p></div>`,
    'projects --fullstack': () => `<div class="text-on-surface-variant space-y-2"><div class="p-2.5 rounded bg-surface-container space-y-1"><div class="flex items-center justify-between"><span class="text-primary font-semibold font-mono">1. CloudMesh / Multi-Tenant SaaS</span><span class="text-label-sm text-outline">TS · Go · PG</span></div><p class="text-body-sm">12k tenants, 99.95% uptime, row-level security with real-time telemetry.</p></div><div class="p-2.5 rounded bg-surface-container space-y-1"><div class="flex items-center justify-between"><span class="text-secondary font-semibold font-mono">2. StreamPulse / Event Pipeline</span><span class="text-label-sm text-outline">Go · Kafka</span></div><p class="text-body-sm">250k events/sec with zero data loss across 4-node clusters.</p></div><div class="p-2.5 rounded bg-surface-container space-y-1"><div class="flex items-center justify-between"><span class="text-tertiary font-semibold font-mono">3. SynthAI / AI Code Reviewer</span><span class="text-label-sm text-outline">Python · TS</span></div><p class="text-body-sm">LLM + AST parsing detecting regressions with 92% acceptance rate.</p></div></div>`,
    'skills': () => `<pre class="text-primary text-label-sm font-mono overflow-x-auto p-2 bg-surface-container rounded">{\\n  "languages": ["Go", "TypeScript", "Rust", "Python", "SQL"],\\n  "frontend": ["Next.js 15", "React 19", "Tailwind CSS", "Three.js"],\\n  "backend": ["gRPC", "CQRS", "Kafka", "Microservices"],\\n  "databases": ["PostgreSQL", "Redis", "ClickHouse", "MongoDB"],\\n  "devops": ["Kubernetes", "Docker", "AWS", "Terraform", "GitHub CI/CD"]\\n}</pre>`,
    'cat resume.txt': () => `<div class="font-mono text-label-sm text-on-surface-variant p-3 bg-surface-container rounded space-y-2"><div class="text-primary font-bold">===================== PROFILE: PARSHV RUNWAL =====================</div><p><span class="text-on-surface font-semibold">Upcoming Forward Deployed Engineer</span> — graduating June 2028</p><p class="text-outline pl-2">- Building full-stack products with systems thinking, strong UX sense, and deployment discipline</p><p><span class="text-on-surface font-semibold">Current focus</span> — applied product engineering, backend reliability, data workflows, and developer tools</p><p class="text-outline pl-2">- Open to FDE internships, new-grad conversations, and practical engineering collaborations</p><div class="text-secondary font-bold">===================== GRADUATION: JUNE 2028 =====================</div></div>`,
    'contact --send': () => { const fi = document.getElementById('contact-name'); if (fi) fi.focus(); return `<p class="text-primary">Focusing contact form. Fill details on the right panel or email: <span class="underline">pashv.d.runwal@gmail.com</span></p>`; },
    'uptime': () => `<div class="text-on-surface-variant font-mono text-label-sm"><p>daemon uptime: 421 days, 14 hours, 32 mins</p><p>load average: 0.12, 0.08, 0.05 (optimal)</p><p>status: All microservice clusters healthy</p></div>`,
    'clear': () => { termHistory.innerHTML = ''; return null; }
  };

  function escapeHtml(str) { return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function appendCommand(cmdText, resultHtml) {
    if (cmdText.trim().toLowerCase() === 'clear') { termHistory.innerHTML = ''; return; }
    const item = document.createElement('div');
    item.className = 'space-y-1 pt-1';
    item.style.opacity = '0';
    item.innerHTML = `<div class="flex items-center gap-2 text-primary font-semibold"><span class="text-secondary">visitor@pr-mbp:~$</span><span>${escapeHtml(cmdText)}</span></div><div class="pl-4 py-1 text-on-surface-variant">${resultHtml}</div>`;
    termHistory.appendChild(item);
    gsap.fromTo(item, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    termScreen.scrollTop = termScreen.scrollHeight;
  }

  function executeCmd(input) {
    const trimmed = input.trim();
    if (!trimmed) return;
    const cmdKey = trimmed.toLowerCase();
    if (commands[cmdKey]) {
      const res = commands[cmdKey]();
      if (res !== null) appendCommand(trimmed, res);
    } else {
      appendCommand(trimmed, `<p class="text-error">zsh: command not found: ${escapeHtml(trimmed)}. Type <span class="text-primary font-semibold">'help'</span> for reference.</p>`);
    }
  }

  termInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { executeCmd(this.value); this.value = ''; } });
  if (clearBtn) clearBtn.addEventListener('click', () => { termHistory.innerHTML = ''; });

  // Quick command buttons
  document.querySelectorAll('.quick-cmd').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      termInput.value = cmd;
      executeCmd(cmd);
      termInput.value = '';
      termInput.focus();
      gsap.from(btn, { duration: 0.3, scale: 0.92, ease: 'back.out(1.5)' });
    });
  });
}
