// Contact form validation with GSAP animations
export function initContact() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const formErrorText = document.getElementById('form-error-text');
  const contactEmail = 'pashv.d.runwal@gmail.com';
  if (!contactForm) return;

  // Input focus animations
  document.querySelectorAll('.contact-input').forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input, { duration: 0.3, borderColor: '#4edea3', boxShadow: '0 0 12px rgba(78, 222, 163, 0.2)', ease: 'power2.out' });
    });
    input.addEventListener('blur', () => {
      gsap.to(input, { duration: 0.3, borderColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 0 0px rgba(0,0,0,0)', ease: 'power2.out' });
    });
  });

  function shakeField(el) {
    gsap.to(el, { duration: 0.08, x: -5, repeat: 4, yoyo: true, ease: 'power1.inOut', onComplete: () => gsap.set(el, { x: 0 }) });
    gsap.to(el, { duration: 0.3, borderColor: '#ffb4ab', boxShadow: '0 0 12px rgba(255, 180, 171, 0.2)', ease: 'power2.out' });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const type = document.getElementById('contact-type');
    const message = document.getElementById('contact-message');
    if (formError) { formError.classList.add('hidden'); }
    if (formSuccess) { formSuccess.classList.add('hidden'); }

    if (!name.value.trim()) { shakeField(name); if (formErrorText) formErrorText.textContent = 'Name field is required'; if (formError) { formError.classList.remove('hidden'); formError.style.display = 'flex'; } return; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { shakeField(email); if (formErrorText) formErrorText.textContent = 'Please enter a valid email address'; if (formError) { formError.classList.remove('hidden'); formError.style.display = 'flex'; } return; }
    if (!message.value.trim()) { shakeField(message); if (formErrorText) formErrorText.textContent = 'Message field is required'; if (formError) { formError.classList.remove('hidden'); formError.style.display = 'flex'; } return; }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">draft</span><span>OPENING EMAIL...</span>';
    }

    const inquiryType = type && type.options[type.selectedIndex] ? type.options[type.selectedIndex].text : 'Portfolio inquiry';
    const subject = `Portfolio inquiry: ${inquiryType}`;
    const body = [
      `Name: ${name.value.trim()}`,
      `Email: ${email.value.trim()}`,
      `Inquiry type: ${inquiryType}`,
      '',
      message.value.trim()
    ].join('\n');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">send</span><span>OPEN EMAIL DRAFT</span>';
      }
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.style.display = 'flex';
        gsap.from(formSuccess, { duration: 0.4, opacity: 0, scale: 0.9, y: -10, ease: 'back.out(1.3)' });
      }
    }, 600);
  });

  // Copy email button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(contactEmail).then(() => {
        const textSpan = document.getElementById('copy-text');
        if (textSpan) {
          const orig = textSpan.innerText;
          textSpan.innerText = 'Copied!';
          gsap.from(copyEmailBtn, { duration: 0.3, scale: 0.95, ease: 'back.out(1.5)' });
          setTimeout(() => { textSpan.innerText = orig; }, 2200);
        }
      });
    });
  }
}
