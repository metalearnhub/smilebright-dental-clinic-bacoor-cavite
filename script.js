/* openChat() — fires the Marcor widget open event.
     Tries the Marcor SDK first; falls back to simulating
     a click on the widget's own bubble button so the
     in-page chat panel slides open without leaving the page. */
  function openChat() {
    /* Attempt 1: Marcor SDK global (if exposed) */
    if (window.MarkorWidget && typeof window.MarkorWidget.open === 'function') {
      window.MarkorWidget.open(); return;
    }
    /* Attempt 2: common Marcor bubble selectors */
    var selectors = [
      '[data-widget="58406463"] button',
      '#marcor-widget-58406463 button',
      '.marcor-bubble',
      '.chatbot-bubble',
      '[id*="58406463"] button',
      'iframe[src*="58406463"]'
    ];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (el) { el.click(); return; }
    }
    /* Attempt 3: any button injected by the widget script */
    var allBtns = document.querySelectorAll('button');
    for (var j = 0; j < allBtns.length; j++) {
      var btn = allBtns[j];
      var style = window.getComputedStyle(btn);
      if (style.position === 'fixed' && parseInt(style.bottom) < 100) {
        btn.click(); return;
      }
    }
    /* Final fallback: open in new tab */
    window.open('https://studio.marcor.app/agents/58406463', '_blank');
  }

  /* Scroll reveal */
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });