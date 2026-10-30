/**
 * TechLink SL (Sierra Leone Ltd) - Application Controller & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.TechLinkData;

  // Global State Management
  const state = {
    currentView: 'home', // home, service-detail, about, portfolio, blog, careers, contact
    activeServiceId: null,
    portfolioFilter: 'all',
    blogFilter: 'all',
    theme: localStorage.getItem('techlink_theme') || 'dark',
    cookieConsent: localStorage.getItem('techlink_cookie_consent') === 'true',
    quoteWizardStep: 1,
    quoteData: { services: [], description: '', budget: '', timeline: '', name: '', email: '', phone: '', org: '' },
    inquiries: JSON.parse(localStorage.getItem('techlink_inquiries') || '[]'),
    chatMessages: [
      { sender: 'bot', text: data.chatbotKnowledge.greetings[0] }
    ]
  };

  // Initialize Icons & Theme
  applyTheme(state.theme);
  makeLogosTransparent();
  initLucideIcons();
  setupEventListeners();
  renderApp();
  initStatsObserver();

  /* ==========================================================================
     Logo Transparency & Theme Adaptivity Helper
     ========================================================================== */
  function makeLogosTransparent() {
    document.querySelectorAll('img[src*="logo.png"]').forEach(img => {
      if (img.dataset.processed) return;
      
      const process = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const w = img.naturalWidth || img.width || 300;
          const h = img.naturalHeight || img.height || 150;
          
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);

          const imgData = ctx.getImageData(0, 0, w, h);
          const data = imgData.data;
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Detect white or light grey background pixels (R,G,B > 215)
            if (r > 215 && g > 215 && b > 215) {
              data[i + 3] = 0; // Make transparent
            } else if (isDark && r < 50 && g < 50 && b < 50) {
              // Convert dark "Tech" text to bright white for dark theme readability
              data[i] = 248;
              data[i + 1] = 250;
              data[i + 2] = 252;
            }
          }

          ctx.putImageData(imgData, 0, 0);
          img.src = canvas.toDataURL('image/png');
          img.dataset.processed = "true";
        } catch (e) {
          console.log('Logo processing fallback');
        }
      };

      if (img.complete) {
        process();
      } else {
        img.onload = process;
      }
    });
  }


  /* ==========================================================================
     Theme & Global Helpers
     ========================================================================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('techlink_theme', theme);
    state.theme = theme;
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      initLucideIcons();
    }
  }

  function initLucideIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function showToast(title, message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `p-4 rounded-xl shadow-2xl backdrop-blur-md border border-emerald-500/30 flex items-center gap-3 text-white transition-all duration-300 ${
      type === 'success' ? 'bg-emerald-950/90 text-emerald-200' : 'bg-blue-950/90 text-blue-200'
    }`;
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-6 h-6 text-emerald-400"></i>
      <div>
        <h4 class="font-bold text-sm">${title}</h4>
        <p class="text-xs opacity-90">${message}</p>
      </div>
    `;
    toastContainer.appendChild(toast);
    initLucideIcons();
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* ==========================================================================
     Main View Router & Navigation
     ========================================================================== */
  function navigateTo(view, param = null) {
    state.currentView = view;
    if (view === 'service-detail') {
      state.activeServiceId = param;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  }

  window.TechLinkRouter = { navigateTo };

  function renderApp() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Render navigation active link highlights
    updateActiveNavLinks();

    switch (state.currentView) {
      case 'home':
        mainContent.innerHTML = renderHomePage();
        startTypingEffect();
        startHeroServiceSlideshow();
        initStatsObserver();
        break;
      case 'service-detail':
        mainContent.innerHTML = renderServiceDetailPage(state.activeServiceId);
        break;
      case 'about':
        mainContent.innerHTML = renderAboutPage();
        break;
      case 'portfolio':
        mainContent.innerHTML = renderPortfolioPage();
        break;
      case 'blog':
        mainContent.innerHTML = renderBlogPage();
        break;
      case 'careers':
        mainContent.innerHTML = renderCareersPage();
        break;
      case 'contact':
        mainContent.innerHTML = renderContactPage();
        break;
      default:
        mainContent.innerHTML = renderHomePage();
    }

    initLucideIcons();
    bindDynamicEvents();
  }

  function updateActiveNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
      const page = link.getAttribute('data-page');
      if (page === state.currentView) {
        link.classList.add('text-emerald-400', 'font-bold');
      } else {
        link.classList.remove('text-emerald-400', 'font-bold');
      }
    });
  }

  /* ==========================================================================
     Homepage Renderer
     ========================================================================== */
  function renderHomePage() {
    return `
      <!-- Hero Section -->
      <section class="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        <div class="absolute inset-0 bg-radial-gradient from-emerald-500/10 via-blue-500/5 to-transparent pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div class="lg:col-span-7 space-y-6 text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-emerald-500/30 text-emerald-400 text-sm font-semibold">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              Freetown, Sierra Leone Premier Tech Agency
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              We Build The Technology That <span class="text-gradient-brand">Grows Your Business</span>
            </h1>

            <p class="text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              We deliver Web Application Development, Website Design &amp; Development, Graphic Design &amp; Branding, Artificial Intelligence (AI) Solutions, Social Media Management, Video Editing &amp; Content Creation, Mobile App Development, Custom Software Development, IT Support &amp; Infrastructure, Virtual Assistance &amp; Help Desk, Digital Marketing, and Project Management for businesses, NGOs, and organizations across Sierra Leone and West Africa.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-4">
              <a href="${data.company.socials.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn-brand-primary text-base">
                <i data-lucide="message-circle" class="w-5 h-5"></i> WhatsApp Us
              </a>
              <button onclick="TechLinkRouter.navigateTo('portfolio')" class="btn-brand-secondary text-base">
                <i data-lucide="briefcase" class="w-5 h-5"></i> View Our Work
              </button>
            </div>

            <!-- Authentic Trust Badges -->
            <div class="pt-8 border-t border-slate-800 flex items-center gap-6">
              <div>
                <p class="text-xs text-slate-400 uppercase tracking-widest font-bold">Trusted Phone Helpline</p>
                <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-white">
                  <a href="tel:+23278091467" class="inline-flex items-center gap-1"><i data-lucide="phone" class="w-4 h-4 text-emerald-400"></i>+232 78 091467</a>
                  <a href="${data.company.socials.whatsapp}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-emerald-300" aria-label="Official WhatsApp +232 71 345276"><img src="./assets/whatsapp-icon.svg" alt="" class="w-4 h-4" />+232 71 345276</a>
                </div>
              </div>
              <div class="h-8 w-px bg-slate-800"></div>
              <div>
                <p class="text-xs text-slate-400 uppercase tracking-widest font-bold">Official Handle</p>
                <div class="mt-1 flex flex-wrap items-center gap-2">
                  <a href="${data.company.socials.facebook}" target="_blank" rel="noopener noreferrer" aria-label="TechLink SL on Facebook" title="Facebook"><img src="./assets/facebook-icon.png" alt="" class="h-6 w-6 rounded-full object-cover" /></a>
                  <a href="${data.company.socials.instagram}" target="_blank" rel="noopener noreferrer" aria-label="TechLink SL on Instagram" title="Instagram"><img src="./assets/instagram-icon.png" alt="" class="h-6 w-6 rounded-full object-cover" /></a>
                  <a href="${data.company.socials.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="TechLink SL on WhatsApp" title="WhatsApp" class="text-emerald-400 hover:text-white transition"><i data-lucide="message-circle" class="w-4 h-4"></i></a>
                  <a href="${data.company.socials.telegram}" target="_blank" rel="noopener noreferrer" aria-label="TechLink SL on Telegram" title="Telegram" class="text-sky-400 hover:text-white transition"><i data-lucide="send" class="w-4 h-4"></i></a>
                  <a href="${data.company.socials.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="TechLink SL on TikTok" title="TikTok"><img src="./assets/tiktok-icon.png" alt="" class="h-6 w-6 rounded-full object-cover" /></a>
                  <span class="text-sm font-bold text-emerald-400">@techlinksl</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Branding Graphic Showcase -->
          <div class="lg:col-span-5 relative">
            <div class="relative mx-auto max-w-md lg:max-w-none">
              <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-blue-500 opacity-30 blur-xl animate-glow"></div>
              <div class="relative glass-panel overflow-hidden border border-emerald-500/30 p-2 shadow-2xl rounded-3xl">
                <div class="hero-service-slider">
                  ${data.services.map((service, index) => `
                    <img src="${service.flyerImage || './assets/flyer_stunning_website.jpg'}" alt="${service.title}" class="hero-service-slide ${index === 0 ? 'active' : ''}" />
                  `).join('')}
                </div>
                <div class="p-4 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img src="./assets/logo.png" alt="TechLink SL Logo" class="h-8 w-auto" />
                    <div>
                      <h4 class="text-sm font-bold text-white">TechLink Sierra Leone</h4>
                      <p class="text-xs text-emerald-400">Full-Service Tech Agency</p>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/40">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Bar -->
      <section class="py-8 bg-slate-950/60 border-y border-slate-800/60">
        <div class="max-w-7xl mx-auto px-4">
          <p class="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted By Businesses, Companies, and NGOs Across Sierra Leone & West Africa
          </p>
          <div class="trusted-client-viewport" aria-label="TechLink SL portfolio clients">
            <div class="trusted-client-track">
              ${data.portfolio.concat(data.portfolio).map(function(project, index) {
                const duplicate = index >= data.portfolio.length;
                return '<div class="trusted-client-card"' + (duplicate ? ' aria-hidden="true"' : '') + '><div class="trusted-client-logo"><img src="' + (project.trustLogo || project.image) + '" alt="' + (duplicate ? '' : project.client + ' logo') + '" /></div><span>' + project.client + '</span></div>';
              }).join('')}
            </div>
          </div>
        </div>
      </section>
      <!-- Core Services Grid Section -->
      <section id="services-section" class="py-24 px-4 max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="badge-brand mb-3">Our ${data.services.length} Core Service Lines</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            End-to-End Technology Services Built For Scale
          </h2>
          <p class="text-slate-400">
            From custom web applications to AI chatbots and 24/7 IT support, explore how TechLink SL drives measurable ROI for your organization.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${data.services.map(s => `
            <div class="glass-panel p-0 overflow-hidden flex flex-col justify-between group cursor-pointer" onclick="TechLinkRouter.navigateTo('service-detail', '${s.id}')">
              <img src="${s.flyerImage}" alt="${s.title}" class="w-full aspect-[4/3] object-contain bg-white/95 p-2 transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
              <div>
                <div class="p-6">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition duration-300">
                  <i data-lucide="${s.icon}" class="w-7 h-7"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition">${s.title}</h3>
                <p class="text-sm text-slate-400 leading-relaxed mb-6">${s.shortDesc}</p>
                </div>
              </div>

              <div class="border-t border-slate-800/80 px-6 py-4 flex items-center justify-end text-xs font-bold text-emerald-400">
                <span class="inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                  Learn More <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Authentic Branding Showcase Section -->
      <section class="py-20 px-4 bg-slate-900/60 border-y border-slate-800">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <span class="badge-brand">Official Branding & Team</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white">
              Local Expertise Combined With International Standards
            </h2>
            <p class="text-slate-300 leading-relaxed">
              TechLink SL is proud to be Sierra Leone's premier tech agency. Our dedicated team of developers, designers, and IT consultants work on-site in Freetown to support businesses, startups, and NGOs across West Africa.
            </p>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <div class="glass-panel p-4">
                <h4 class="text-2xl font-extrabold text-emerald-400">100% Local</h4>
                <p class="text-xs text-slate-400">On-site support in Sierra Leone</p>
              </div>
              <div class="glass-panel p-4">
                <h4 class="text-2xl font-extrabold text-blue-400">24/7 SLA</h4>
                <p class="text-xs text-slate-400">Managed response team</p>
              </div>
            </div>

            <div class="pt-4">
              <button onclick="TechLinkRouter.navigateTo('about')" class="btn-brand-primary">
                Meet Our Leadership Team <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img src="./assets/Matthew Mohamed Vonjo (1).jpg" alt="Matthew Mohamed Vonjo" class="w-full h-72 object-cover rounded-2xl border border-emerald-500/30 hover:scale-105 transition" />
            <img src="./assets/Osman Alhaji Mansarray.jpg" alt="Osman Alhaji Mansarray" class="w-full h-72 object-cover rounded-2xl border border-blue-500/30 hover:scale-105 transition" />
            <img src="./assets/Shalom GC Alabi.jpg" alt="Shalom GC Alabi" class="w-full h-72 object-cover rounded-2xl border border-emerald-500/30 hover:scale-105 transition" />
          </div>
        </div>
      </section>

      <!-- Animated Stats Counter Section -->
      <section class="py-16 px-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40">
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="glass-panel p-6">
            <h3 class="text-4xl font-extrabold text-emerald-400 stat-counter" data-target="${data.company.stats.projectsCompleted}">0</h3>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">Projects Completed</p>
          </div>
          <div class="glass-panel p-6">
            <h3 class="text-4xl font-extrabold text-blue-400 stat-counter" data-target="${data.company.stats.happyClients}">0</h3>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">Happy Clients</p>
          </div>
          <div class="glass-panel p-6">
            <h3 class="text-4xl font-extrabold text-emerald-400 stat-counter" data-target="${data.company.stats.yearsExperience}">0</h3>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">Years Experience</p>
          </div>
          <div class="glass-panel p-6">
            <h3 class="text-4xl font-extrabold text-blue-400 stat-counter" data-target="${data.company.stats.teamMembers}">0</h3>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mt-2">Tech Specialists</p>
          </div>
        </div>
      </section>

      <!-- 4-Step How We Work Process Timeline -->
      <section class="py-24 px-4 max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="badge-brand mb-3">Proven Methodology</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            How We Work: From Discovery to Launch
          </h2>
          <p class="text-slate-400">Clear communication, rapid development milestones, and seamless deployment.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div class="glass-panel p-6 relative">
            <span class="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center mb-4 text-lg">01</span>
            <h4 class="text-lg font-bold text-white mb-2">Discover</h4>
            <p class="text-xs text-slate-400">Deep dive into your business requirements, target market, and project scope.</p>
          </div>
          <div class="glass-panel p-6 relative">
            <span class="w-10 h-10 rounded-full bg-blue-500 text-white font-extrabold flex items-center justify-center mb-4 text-lg">02</span>
            <h4 class="text-lg font-bold text-white mb-2">Design</h4>
            <p class="text-xs text-slate-400">Interactive wireframes, UX prototypes, and vector visual design systems.</p>
          </div>
          <div class="glass-panel p-6 relative">
            <span class="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center mb-4 text-lg">03</span>
            <h4 class="text-lg font-bold text-white mb-2">Build</h4>
            <p class="text-xs text-slate-400">Clean code development, security auditing, and feature integration.</p>
          </div>
          <div class="glass-panel p-6 relative">
            <span class="w-10 h-10 rounded-full bg-blue-500 text-white font-extrabold flex items-center justify-center mb-4 text-lg">04</span>
            <h4 class="text-lg font-bold text-white mb-2">Launch & Support</h4>
            <p class="text-xs text-slate-400">Deployment, user training, and ongoing 24/7 SLA maintenance support.</p>
          </div>
        </div>
      </section>

      <!-- Featured Portfolio Section -->
      <section class="py-20 px-4 bg-slate-900/40">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span class="badge-brand mb-3">Success Stories</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects & Case Studies</h2>
            </div>
            <button onclick="TechLinkRouter.navigateTo('portfolio')" class="btn-brand-secondary mt-4 md:mt-0">
              View All Work <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${data.portfolio.slice(0, 3).map(p => `
              <div class="glass-panel overflow-hidden group cursor-pointer" onclick="TechLinkModals.openCaseStudy('${p.id}')">
                <div class="relative h-56 overflow-hidden">
                  <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div class="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-xs text-emerald-400 font-bold">
                    ${p.category}
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition">${p.title}</h3>
                  <p class="text-xs text-slate-400 mb-4">${p.summary}</p>
                  <span class="text-xs text-emerald-400 font-bold inline-flex items-center gap-1">
                    Read Case Study <i data-lucide="chevron-right" class="w-4 h-4"></i>
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Client Testimonials Carousel -->
      <section class="py-24 px-4 max-w-7xl mx-auto text-center">
        <span class="badge-brand mb-3">Client Feedback</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-8">What Our Clients Say</h2>
        <div class="flex flex-wrap items-center justify-center gap-6 mb-12" aria-label="Businesses featured in our portfolio">
          ${data.portfolio.map(function(project) {
            return '<div class="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3"><img src="' + (project.trustLogo || project.image) + '" alt="' + project.client + ' logo" class="h-12 w-16 rounded-lg bg-white object-contain p-1" loading="lazy" /><span class="text-sm font-bold text-slate-200">' + project.client + '</span></div>';
          }).join('')}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${data.testimonials.map(t => `
            <div class="glass-panel p-8 flex flex-col justify-between text-left">
              <div class="space-y-4">
                <div class="flex items-center gap-1 text-amber-400">
                  ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>').join('')}
                </div>
                <p class="text-sm text-slate-300 italic">"${t.quote}"</p>
              </div>
              <div class="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800">
                <div class="testimonial-client-logo flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                  <img src="${t.logo}" alt="${t.company} logo" class="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <div>
                  <h4 class="text-sm font-bold text-white">${t.company}</h4>
                  <p class="text-xs text-slate-400">TechLink SL Client</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CTA Banner -->
      <section class="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-slate-950 rounded-3xl max-w-7xl mx-auto my-12 shadow-2xl relative overflow-hidden">
        <div class="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-950">Ready To Transform Your Business?</h2>
          <p class="text-base sm:text-lg text-slate-900 font-medium">
            Contact TechLink SL today for a free technology consultation and custom price quote.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a href="${data.company.socials.whatsapp}" target="_blank" rel="noopener noreferrer" class="bg-slate-950 text-white hover:bg-slate-900 font-bold px-8 py-4 rounded-full shadow-lg transition inline-flex items-center gap-2">
              <i data-lucide="message-circle" class="w-5 h-5"></i> WhatsApp Us
            </a>
            <a href="${data.company.socials.whatsapp}" target="_blank" class="bg-emerald-950 text-emerald-300 hover:bg-emerald-900 font-bold px-8 py-4 rounded-full flex items-center gap-2 transition">
              <i data-lucide="message-square" class="w-5 h-5"></i> Chat On WhatsApp
            </a>
          </div>
        </div>
      </section>
    `;
  }

  /* ==========================================================================
     Service Detail Page Renderer
     ========================================================================== */
  function renderServiceDetailPage(serviceId) {
    const s = data.services.find(item => item.id === serviceId) || data.services[0];
    return `
      <div class="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div class="mb-8">
          <button onclick="TechLinkRouter.navigateTo('home')" class="text-emerald-400 text-sm font-bold inline-flex items-center gap-2 mb-4 hover:underline">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Homepage
          </button>
          <div class="flex flex-wrap items-center gap-3 mb-2">
            
            <span class="text-xs text-slate-400 uppercase tracking-widest">Service Specification</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white">${s.title}</h1>
          <p class="text-lg text-slate-300 max-w-3xl mt-4 leading-relaxed">${s.fullDesc}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Main Deliverables & Details -->
          <div class="lg:col-span-8 space-y-10">
            <!-- Deliverables -->
            <div class="glass-panel p-8">
              <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="check-circle-2" class="w-6 h-6 text-emerald-400"></i> What's Included & Deliverables
              </h3>
              <ul class="space-y-4">
                ${s.deliverables.map(d => `
                  <li class="flex items-start gap-3 text-slate-200">
                    <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                    <span class="text-sm sm:text-base font-medium">${d}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Target Audience -->
            <div class="glass-panel p-8">
              <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="users" class="w-6 h-6 text-blue-400"></i> Who It's Designed For
              </h3>
              <div class="flex flex-wrap gap-3">
                ${s.whoItsFor.map(w => `
                  <span class="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl text-sm font-semibold">
                    ${w}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Process -->
            <div class="glass-panel p-8">
              <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="git-branch" class="w-6 h-6 text-emerald-400"></i> Delivery Process
              </h3>
              <div class="space-y-4">
                ${s.process.map((p, idx) => `
                  <div class="flex items-center gap-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">0${idx + 1}</span>
                    <p class="text-sm font-semibold text-slate-200">${p}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Service FAQs -->
            <div class="glass-panel p-8">
              <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <i data-lucide="help-circle" class="w-6 h-6 text-blue-400"></i> Frequently Asked Questions
              </h3>
              <div class="space-y-6">
                ${s.faqs.map(f => `
                  <div class="border-b border-slate-800 pb-4">
                    <h4 class="text-base font-bold text-emerald-400 mb-2">Q: ${f.q}</h4>
                    <p class="text-sm text-slate-300">A: ${f.a}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Sidebar Quote Card & Image -->
          <div class="lg:col-span-4 space-y-6">
            ${s.flyerImage ? `
              <div class="glass-panel p-2 overflow-hidden border border-emerald-500/30">
                <img src="${s.flyerImage}" alt="${s.title}" class="w-full h-auto rounded-xl" />
              </div>
            ` : ''}

            <div class="glass-panel p-8 space-y-6 sticky top-28">
              <h3 class="text-xl font-bold text-white">Get Started With ${s.title}</h3>
              <p class="text-xs text-slate-400">Request a custom proposal and quote tailored to your budget and timeline.</p>
              
              <button onclick="TechLinkModals.openQuoteWizard('${s.title}')" class="btn-brand-primary w-full justify-center">
                <i data-lucide="calculator" class="w-5 h-5"></i> Request Quote Now
              </button>

              <button onclick="TechLinkModals.openConsultationModal('${s.title}')" class="btn-brand-secondary w-full justify-center">
                <i data-lucide="calendar" class="w-5 h-5"></i> Book Consultation
              </button>

              <div class="pt-4 border-t border-slate-800 text-center">
                <p class="text-xs text-slate-400">Prefer direct WhatsApp messaging?</p>
                <a href="${data.company.socials.whatsapp}" target="_blank" class="text-sm font-bold text-emerald-400 hover:underline flex items-center justify-center gap-2 mt-2">
                  <i data-lucide="message-square" class="w-4 h-4"></i> Chat on +232 78 091467
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     About Us Page Renderer
     ========================================================================== */
  function renderAboutPage() {
    return `
      <div class="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-20">
        <div class="text-center max-w-3xl mx-auto">
          <span class="badge-brand mb-3">Our Story & Identity</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-6">Empowering Sierra Leone Through Technology</h1>
          <p class="text-lg text-slate-300 leading-relaxed">
            TechLink SL is a Freetown-based technology agency led by information systems and technology professionals and certified digital freelancers. Founded in 2026, we support SMEs, companies, organizations, and individuals. We build premium websites, software, digital systems, and smart AI solutions that are practical, affordable, and tailored to the Sierra Leonean and West African markets.
          </p>
        </div>

        <!-- Vision & Mission Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="glass-panel p-8 border-emerald-500/30">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <i data-lucide="target" class="w-6 h-6"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p class="text-slate-300 leading-relaxed">${data.company.mission}</p>
          </div>

          <div class="glass-panel p-8 border-blue-500/30">
            <div class="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
              <i data-lucide="eye" class="w-6 h-6"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p class="text-slate-300 leading-relaxed">${data.company.vision}</p>
          </div>
        </div>

        <!-- Core Values -->
        <div>
          <h2 class="text-3xl font-extrabold text-white text-center mb-12">Our Core Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${data.company.values.map(v => `
              <div class="glass-panel p-6">
                <h4 class="text-lg font-bold text-emerald-400 mb-2">${v.title}</h4>
                <p class="text-xs text-slate-300 leading-relaxed">${v.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Team Members Section with Authentic Photos -->
        <div>
          <div class="text-center mb-12">
            <span class="badge-brand mb-3">Leadership Team</span>
            <h2 class="text-3xl font-extrabold text-white">Meet The Minds Behind TechLink SL</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            ${data.team.map(m => `
              <div class="glass-panel overflow-hidden group">
                <img src="${m.image}" alt="${m.name}" class="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                <div class="p-6 space-y-2">
                  <h4 class="text-lg font-bold text-white">${m.name}</h4>
                  <p class="text-xs font-bold text-emerald-400">${m.role}</p>
                  <p class="text-xs text-slate-400 leading-relaxed">${m.bio}</p>
                  <div class="pt-2">
                    <a href="${m.linkedin}" target="_blank" class="text-slate-400 hover:text-blue-400 inline-flex items-center gap-1 text-xs">
                      <i data-lucide="linkedin" class="w-4 h-4"></i> LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     Portfolio / Case Studies Page Renderer
     ========================================================================== */
  function renderPortfolioPage() {
    const filteredProjects = state.portfolioFilter === 'all' 
      ? data.portfolio 
      : data.portfolio.filter(p => p.categorySlug === state.portfolioFilter);

    return `
      <div class="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-12">
        <div class="text-center max-w-3xl mx-auto">
          <span class="badge-brand mb-3">Our Work</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Portfolio & Proven Results</h1>
          <p class="text-slate-300">Browse completed client solutions across web, mobile, graphic design, and AI.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button onclick="TechLinkPortfolio.filter('all')" class="px-5 py-2 rounded-full text-sm font-bold transition ${state.portfolioFilter === 'all' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'glass-panel text-slate-300'}">
            All Projects
          </button>
          <button onclick="TechLinkPortfolio.filter('web-apps')" class="px-5 py-2 rounded-full text-sm font-bold transition ${state.portfolioFilter === 'web-apps' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'glass-panel text-slate-300'}">
            Web Apps
          </button>
          <button onclick="TechLinkPortfolio.filter('graphic-design')" class="px-5 py-2 rounded-full text-sm font-bold transition ${state.portfolioFilter === 'graphic-design' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'glass-panel text-slate-300'}">
            Graphic Design
          </button>
          <button onclick="TechLinkPortfolio.filter('ai-solutions')" class="px-5 py-2 rounded-full text-sm font-bold transition ${state.portfolioFilter === 'ai-solutions' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'glass-panel text-slate-300'}">
            AI Solutions
          </button>
          <button onclick="TechLinkPortfolio.filter('social-media')" class="px-5 py-2 rounded-full text-sm font-bold transition ${state.portfolioFilter === 'social-media' ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'glass-panel text-slate-300'}">
            Social Media
          </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${filteredProjects.map(p => `
            <div class="glass-panel overflow-hidden group cursor-pointer" onclick="TechLinkModals.openCaseStudy('${p.id}')">
              <div class="relative h-60 overflow-hidden">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div class="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-xs text-emerald-400 font-bold">
                  ${p.category}
                </div>
              </div>
              <div class="p-6 space-y-3">
                <p class="text-xs text-slate-400 font-semibold">Client: ${p.client}</p>
                <h3 class="text-lg font-bold text-white group-hover:text-emerald-400 transition">${p.title}</h3>
                <p class="text-xs text-slate-300 leading-relaxed">${p.summary}</p>
                <div class="pt-2 flex flex-wrap gap-2">
                  ${p.tech.map(t => `<span class="px-2 py-0.5 bg-slate-900 text-[10px] text-slate-400 rounded">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.TechLinkPortfolio = {
    filter: (slug) => {
      state.portfolioFilter = slug;
      renderApp();
    }
  };

  /* ==========================================================================
     Blog / Insights Page Renderer
     ========================================================================== */
  function renderBlogPage() {
    return `
      <div class="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-12">
        <div class="text-center max-w-3xl mx-auto">
          <span class="badge-brand mb-3">Tech Insights</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Articles & Thought Leadership</h1>
          <p class="text-slate-300">Stay informed on digital transformation, AI trends, and technology in West Africa.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${data.blogs.map(b => `
            <div class="glass-panel overflow-hidden group cursor-pointer" onclick="TechLinkModals.openBlogReader('${b.id}')">
              <img src="${b.image}" alt="${b.title}" class="w-full h-52 object-cover group-hover:scale-105 transition" />
              <div class="p-6 space-y-3">
                <div class="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span>${b.category}</span>
                  <span class="text-slate-400">${b.readTime}</span>
                </div>
                <h3 class="text-lg font-bold text-white group-hover:text-emerald-400 transition">${b.title}</h3>
                <p class="text-xs text-slate-400 leading-relaxed">${b.excerpt}</p>
                <div class="pt-2 text-xs text-slate-500 font-medium">By ${b.author} • ${b.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     Careers Page Renderer
     ========================================================================== */
  function renderCareersPage() {
    return `
      <div class="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-16">
        <div class="text-center max-w-3xl mx-auto">
          <span class="badge-brand mb-3">Join TechLink SL</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Build The Future of Tech in West Africa</h1>
          <p class="text-slate-300">We are always looking for passionate engineers, designers, and tech consultants.</p>
        </div>

        <div class="space-y-6 max-w-4xl mx-auto">
          ${data.jobs.map(j => `
            <div class="glass-panel p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">${j.department}</span>
                  <span class="text-xs text-slate-400 font-medium">${j.type} • ${j.location}</span>
                </div>
                <h3 class="text-xl font-bold text-white">${j.title}</h3>
                <p class="text-xs text-slate-300 max-w-2xl">${j.desc}</p>
              </div>
              <button onclick="TechLinkModals.openJobModal('${j.title}')" class="btn-brand-primary shrink-0">
                Apply Now <i data-lucide="send" class="w-4 h-4"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     Contact Page Renderer
     ========================================================================== */
  function renderContactPage() {
    return `
      <div class="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="badge-brand mb-3">Get In Touch</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">Let's Discuss Your Project</h1>
          <p class="text-slate-300">Visit our Freetown office, send an email, or chat directly with our team.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Contact Form -->
          <div class="lg:col-span-7 glass-panel p-8 space-y-6">
            <h3 class="text-2xl font-bold text-white">Send Us A Message</h3>
            <form onsubmit="TechLinkApp.handleContactSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                  <input type="text" required id="contact-name" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="e.g. Fatu Sesay" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                  <input type="email" required id="contact-email" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="name@company.com" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">Phone Number / WhatsApp</label>
                <input type="tel" id="contact-phone" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="+232 78 000 000" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">Subject</label>
                <input type="text" required id="contact-subject" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="Project Inquiry / IT Support" />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">Message *</label>
                <textarea required id="contact-message" rows="4" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="Describe your project goals or technical question..."></textarea>
              </div>

              <p class="text-xs text-slate-400">Submitting emails your message to TechLink SL and opens a WhatsApp draft. Tap Send in WhatsApp to deliver it there.</p>
              <button type="submit" class="btn-brand-primary w-full justify-center text-base py-3">
                Send Email &amp; Open WhatsApp <i data-lucide="message-square" class="w-5 h-5"></i>
              </button>
            </form>
          </div>

          <!-- Contact Details -->
          <div class="lg:col-span-5 space-y-6">
            <div class="glass-panel p-8 space-y-6">
              <h3 class="text-xl font-bold text-white">Office Location & Contact</h3>
              
              <div class="space-y-4 text-sm text-slate-300">
                <div class="flex items-start gap-3">
                  <i data-lucide="map-pin" class="w-5 h-5 text-emerald-400 shrink-0 mt-1"></i>
                  <div>
                    <h4 class="font-bold text-white">Freetown Headquarters</h4>
                    <p class="text-xs text-slate-400">${data.company.contact.address}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <i data-lucide="phone" class="w-5 h-5 text-blue-400 shrink-0 mt-1"></i>
                  <div>
                    <h4 class="font-bold text-white">Phone Numbers</h4>
                    <div class="mt-1 flex flex-col gap-1 text-xs text-slate-400">
                      ${data.company.contact.phones.map(phone => {
                        const digits = phone.replace(/\D/g, '');
                        const isWhatsApp = digits === data.company.contact.whatsapp.replace(/\D/g, '');
                        return `<a href="${isWhatsApp ? data.company.socials.whatsapp : `tel:+${digits}`}" ${isWhatsApp ? 'target="_blank" rel="noopener noreferrer"' : ''} class="inline-flex items-center gap-2 hover:text-emerald-300">${isWhatsApp ? '<img src="./assets/whatsapp-icon.svg" alt="" class="w-4 h-4" />' : '<i data-lucide="phone" class="w-4 h-4 text-blue-400"></i>'}${phone}${isWhatsApp ? '<span class="text-emerald-400">Official WhatsApp</span>' : ''}</a>`;
                      }).join('')}
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <i data-lucide="mail" class="w-5 h-5 text-emerald-400 shrink-0 mt-1"></i>
                  <div>
                    <h4 class="font-bold text-white">Email Address</h4>
                    <p class="text-xs text-slate-400">${data.company.contact.email}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <i data-lucide="clock" class="w-5 h-5 text-blue-400 shrink-0 mt-1"></i>
                  <div>
                    <h4 class="font-bold text-white">Business Hours</h4>
                    <p class="text-xs text-slate-400">${data.company.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- WhatsApp Direct Card -->
            <div class="glass-panel p-6 border-emerald-500/40 text-center space-y-3">
              <i data-lucide="message-square" class="w-10 h-10 text-emerald-400 mx-auto"></i>
              <h4 class="text-lg font-bold text-white">Quick WhatsApp Consultation</h4>
              <p class="text-xs text-slate-400">Need an instant response? Speak directly with our lead architects on WhatsApp.</p>
              <a href="${data.company.socials.whatsapp}" target="_blank" class="btn-brand-primary justify-center w-full">
                Chat on WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     Typing Animation & Counter Observers
     ========================================================================== */
  function startTypingEffect() {
    const textEl = document.getElementById('typing-text');
    if (!textEl) return;
    const items = data.services.map(s => s.title);
    let itemIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
      const currentItem = items[itemIdx];
      if (isDeleting) {
        textEl.textContent = currentItem.substring(0, charIdx - 1);
        charIdx--;
      } else {
        textEl.textContent = currentItem.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIdx === currentItem.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        itemIdx = (itemIdx + 1) % items.length;
        speed = 500;
      }
      setTimeout(type, speed);
    }
    type();
  }

  function startHeroServiceSlideshow() {
    const slides = document.querySelectorAll('.hero-service-slide');
    if (!slides.length) return;

    let activeIndex = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slide.classList.toggle('opacity-0', i !== index);
        slide.classList.toggle('opacity-100', i === index);
      });
    };

    setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      showSlide(activeIndex);
    }, 2200);
  }

  function initStatsObserver() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 40);
          const update = () => {
            count += increment;
            if (count > target) count = target;
            counter.innerText = count + '+';
            if (count < target) setTimeout(update, 30);
          };
          update();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ==========================================================================
     Event Binding & Global Modals
     ========================================================================== */
  function setupEventListeners() {
    // Theme Switcher
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    }

    // Cookie Banner
    if (!state.cookieConsent) {
      const banner = document.getElementById('cookie-banner');
      if (banner) banner.classList.remove('hidden');
    }

    // AI Chatbot UI Toggle
    const chatBtn = document.getElementById('chat-widget-trigger');
    const chatModal = document.getElementById('chat-modal');
    if (chatBtn && chatModal) {
      chatBtn.addEventListener('click', () => {
        chatModal.classList.toggle('active');
        renderChatMessages();
      });
    }
  }

  function bindDynamicEvents() {
    document.querySelectorAll('[data-page-link]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = btn.getAttribute('data-page-link');
        const param = btn.getAttribute('data-page-param');
        navigateTo(targetPage, param);
      });
    });
  }

  /* ==========================================================================
     Global Modal Controller (Exposed to Window)
     ========================================================================== */
  window.TechLinkModals = {
    openQuoteWizard: (preselectedService = null) => {
      state.quoteWizardStep = 1;
      if (preselectedService) state.quoteData.services = [preselectedService];
      renderQuoteWizardModal();
      document.getElementById('quote-modal').classList.add('active');
    },
    closeQuoteWizard: () => {
      document.getElementById('quote-modal').classList.remove('active');
    },
    openConsultationModal: (serviceName = '') => {
      const modal = document.getElementById('consultation-modal');
      const input = document.getElementById('consultation-service');
      if (input) input.value = serviceName;
      if (modal) modal.classList.add('active');
    },
    closeConsultationModal: () => {
      document.getElementById('consultation-modal').classList.remove('active');
    },
    openCaseStudy: (id) => {
      const p = data.portfolio.find(item => item.id === id);
      if (!p) return;
      const content = document.getElementById('case-study-content');
      if (content) {
        content.innerHTML = `
          <div class="space-y-6">
            <img src="${p.image}" alt="${p.title}" class="w-full h-64 object-cover rounded-2xl" />
            <h2 class="text-2xl font-bold text-white">${p.title}</h2>
            <div class="flex items-center gap-4 text-xs text-emerald-400 font-bold">
              <span>Client: ${p.client}</span>
              <span>Category: ${p.category}</span>
            </div>
            <div class="space-y-4 text-sm text-slate-300">
              <div>
                <h4 class="font-bold text-white mb-1">The Challenge:</h4>
                <p>${p.challenge}</p>
              </div>
              <div>
                <h4 class="font-bold text-emerald-400 mb-1">The TechLink Solution:</h4>
                <p>${p.solution}</p>
              </div>
              <div>
                <h4 class="font-bold text-blue-400 mb-1">Measured Results:</h4>
                <p class="font-bold text-white">${p.results}</p>
              </div>
            </div>
            <button onclick="TechLinkModals.openQuoteWizard('${p.category}')" class="btn-brand-primary w-full justify-center">
              Request Similar Project Quote
            </button>
          </div>
        `;
        document.getElementById('case-study-modal').classList.add('active');
        initLucideIcons();
      }
    },
    closeCaseStudy: () => {
      document.getElementById('case-study-modal').classList.remove('active');
    },
    openBlogReader: (id) => {
      const b = data.blogs.find(item => item.id === id);
      if (!b) return;
      const content = document.getElementById('blog-reader-content');
      if (content) {
        content.innerHTML = `
          <div class="space-y-6">
            <img src="${b.image}" alt="${b.title}" class="w-full h-64 object-cover rounded-2xl" />
            <span class="badge-brand">${b.category}</span>
            <h2 class="text-2xl font-bold text-white">${b.title}</h2>
            <p class="text-xs text-slate-400">By ${b.author} • ${b.date} • ${b.readTime}</p>
            <div class="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
              ${b.content}
            </div>
          </div>
        `;
        document.getElementById('blog-reader-modal').classList.add('active');
        initLucideIcons();
      }
    },
    closeBlogReader: () => {
      document.getElementById('blog-reader-modal').classList.remove('active');
    },
    openJobModal: (title) => {
      const modal = document.getElementById('job-modal');
      const input = document.getElementById('job-title-input');
      if (input) input.value = title;
      if (modal) modal.classList.add('active');
    },
    closeJobModal: () => {
      document.getElementById('job-modal').classList.remove('active');
    },
    openAdminCMS: () => {
      renderAdminCMSModal();
      document.getElementById('admin-cms-modal').classList.add('active');
    },
    closeAdminCMS: () => {
      document.getElementById('admin-cms-modal').classList.remove('active');
    }
  };

  /* ==========================================================================
     Multi-Step Quote Calculator Wizard Renderer
     ========================================================================== */
  function renderQuoteWizardModal() {
    const container = document.getElementById('quote-wizard-body');
    if (!container) return;

    if (state.quoteWizardStep === 1) {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="text-center">
            <span class="text-xs text-emerald-400 font-bold uppercase tracking-widest">Step 1 of 3</span>
            <h3 class="text-2xl font-bold text-white mt-1">Which Services Do You Need?</h3>
            <p class="text-xs text-slate-400">Select all that apply to your business goal.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${data.services.map(s => `
              <label class="glass-panel p-4 flex items-center gap-3 cursor-pointer hover:border-emerald-400 transition">
                <input type="checkbox" value="${s.title}" class="quote-service-checkbox w-4 h-4 accent-emerald-400" ${state.quoteData.services.includes(s.title) ? 'checked' : ''} />
                <div class="text-left">
                  <h4 class="text-sm font-bold text-white">${s.title}</h4>

                </div>
              </label>
            `).join('')}
          </div>

          <button onclick="TechLinkApp.nextQuoteStep(2)" class="btn-brand-primary w-full justify-center">
            Next: Budget & Timeline <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      `;
    } else if (state.quoteWizardStep === 2) {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="text-center">
            <span class="text-xs text-emerald-400 font-bold uppercase tracking-widest">Step 2 of 3</span>
            <h3 class="text-2xl font-bold text-white mt-1">Project Details & Budget</h3>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Estimated Budget Range</label>
              <select id="quote-budget" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none">
                <option value="Under $500">Under $500 (Basic Site / Graphics)</option>
                <option value="$500 - $1,500" selected>$500 - $1,500 (Corporate Site / Software)</option>
                <option value="$1,500 - $3,500">$1,500 - $3,500 (Custom Web App / AI Chatbot)</option>
                <option value="$3,500+">$3,500+ Enterprise Solution</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Target Timeline</label>
              <select id="quote-timeline" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none">
                <option value="Urgent (1 - 2 weeks)">Urgent (1 - 2 weeks)</option>
                <option value="Standard (3 - 6 weeks)" selected>Standard (3 - 6 weeks)</option>
                <option value="Flexible (2+ months)">Flexible (2+ months)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Project Summary / Requirements</label>
              <textarea id="quote-desc" rows="3" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="Describe main features or goals..."></textarea>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="TechLinkApp.nextQuoteStep(1)" class="btn-brand-secondary flex-1 justify-center">Back</button>
            <button onclick="TechLinkApp.nextQuoteStep(3)" class="btn-brand-primary flex-1 justify-center">Next: Contact Info</button>
          </div>
        </div>
      `;
    } else if (state.quoteWizardStep === 3) {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="text-center">
            <span class="text-xs text-emerald-400 font-bold uppercase tracking-widest">Step 3 of 3</span>
            <h3 class="text-2xl font-bold text-white mt-1">Your Contact Information</h3>
          </div>

          <form onsubmit="TechLinkApp.submitQuoteWizard(event)" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
              <input type="text" required id="quote-name" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="e.g. Medvon Joson" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
              <input type="email" required id="quote-email" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="name@company.com" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Phone / WhatsApp Number *</label>
              <input type="tel" required id="quote-phone" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="+232 78 000 000" />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-300 mb-1">Organization / Company Name</label>
              <input type="text" id="quote-org" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-400 outline-none" placeholder="e.g. Sierra Enterprise" />
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button type="button" onclick="TechLinkApp.nextQuoteStep(2)" class="btn-brand-secondary flex-1 justify-center">Back</button>
              <button type="submit" class="btn-brand-primary flex-1 justify-center">Submit Proposal Request</button>
            </div>
          </form>
        </div>
      `;
    }
    initLucideIcons();
  }

  /* ==========================================================================
     AI Chatbot Interface & Logic (FR-05)
     ========================================================================== */
  function renderChatMessages() {
    const body = document.getElementById('chat-messages-container');
    if (!body) return;
    body.innerHTML = state.chatMessages.map(msg => `
      <div class="flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm ${
          msg.sender === 'user' 
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-semibold rounded-br-none' 
            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
        }">
          ${msg.text}
        </div>
      </div>
    `).join('');
    body.scrollTop = body.scrollHeight;
  }

  function handleChatSend(queryText = null) {
    const input = document.getElementById('chat-input');
    const text = queryText || (input ? input.value.trim() : '');
    if (!text) return;

    if (input) input.value = '';
    state.chatMessages.push({ sender: 'user', text });
    renderChatMessages();

    // AI Intelligence Response Logic
    setTimeout(() => {
      let botReply = data.chatbotKnowledge.fallback;
      const lower = text.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
        botReply = "Service fees depend on the project scope. Contact us on WhatsApp for a custom quote.";
      } else if (lower.includes('web') || lower.includes('website') || lower.includes('app')) {
        botReply = "We build custom web applications, e-commerce portals, and responsive websites with mobile money payments! Check out our Web Apps service page.";
      } else if (lower.includes('ai') || lower.includes('bot') || lower.includes('automation')) {
        botReply = "TechLink SL develops custom AI Chatbots for WhatsApp and websites to automate customer inquiries and capture sales leads 24/7.";
      } else if (lower.includes('phone') || lower.includes('contact') || lower.includes('freetown')) {
        botReply = "You can call us at +232 78 091467 or message our official WhatsApp Business account at +232 71 345276. Email techlinksl247@gmail.com.";
      }

      state.chatMessages.push({ sender: 'bot', text: botReply });
      renderChatMessages();
    }, 600);
  }

  /* ==========================================================================
     Admin CMS Preview Modal (FR-15)
     ========================================================================== */
  function renderAdminCMSModal() {
    const container = document.getElementById('admin-cms-content');
    if (!container) return;

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 class="text-2xl font-bold text-white">TechLink Admin CMS Dashboard</h2>
            <p class="text-xs text-emerald-400">Logged in as: Administrator (Freetown Hub)</p>
          </div>
          <span class="badge-brand">Role: Admin</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="glass-panel p-4">
            <h4 class="text-2xl font-bold text-emerald-400">${state.inquiries.length}</h4>
            <p class="text-xs text-slate-400">Total Quote Submissions</p>
          </div>
          <div class="glass-panel p-4">
            <h4 class="text-2xl font-bold text-blue-400">${data.services.length}</h4>
            <p class="text-xs text-slate-400">Active Service Lines</p>
          </div>
          <div class="glass-panel p-4">
            <h4 class="text-2xl font-bold text-emerald-400">${data.blogs.length}</h4>
            <p class="text-xs text-slate-400">Published Insights</p>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-bold text-white mb-3">Recent Submitted Inquiries</h3>
          ${state.inquiries.length === 0 ? `
            <p class="text-xs text-slate-500 italic">No submissions logged in local browser memory yet. Try submitting a Quote Request form!</p>
          ` : `
            <div class="space-y-2 max-h-48 overflow-y-auto">
              ${state.inquiries.map(inq => `
                <div class="p-3 bg-slate-900 rounded-lg text-xs flex items-center justify-between">
                  <div>
                    <span class="font-bold text-white">${inq.name}</span> (${inq.email})
                    <p class="text-[11px] text-slate-400">Services: ${Array.isArray(inq.services) ? inq.services.join(', ') : inq.service}</p>
                  </div>
                  <span class="text-emerald-400 font-bold">${inq.budget || 'Inquiry'}</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
    initLucideIcons();
  }

  /* ==========================================================================
     Global Handler Exports
     ========================================================================== */
  window.TechLinkApp = {
    nextQuoteStep: (step) => {
      if (step === 2) {
        const checkboxes = document.querySelectorAll('.quote-service-checkbox:checked');
        state.quoteData.services = Array.from(checkboxes).map(c => c.value);
      }
      state.quoteWizardStep = step;
      renderQuoteWizardModal();
    },
    submitQuoteWizard: (e) => {
      e.preventDefault();
      state.quoteData.name = document.getElementById('quote-name').value;
      state.quoteData.email = document.getElementById('quote-email').value;
      state.quoteData.phone = document.getElementById('quote-phone').value;
      state.quoteData.org = document.getElementById('quote-org')?.value || '';
      state.quoteData.budget = document.getElementById('quote-budget')?.value || '';
      state.quoteData.timeline = document.getElementById('quote-timeline')?.value || '';

      state.inquiries.push({ ...state.quoteData, date: new Date().toISOString() });
      localStorage.setItem('techlink_inquiries', JSON.stringify(state.inquiries));

      TechLinkModals.closeQuoteWizard();
      showToast('Proposal Request Submitted!', 'Our Freetown technical team will send your custom quote within 24 hours.');
    },
    handleContactSubmit: async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;
      const whatsappNumber = data.company.contact.whatsapp.replace(/\D/g, '');
      const whatsappMessage = [
        'Hello TechLink SL, I sent a message through your website.',
        '',
        'Name: ' + name,
        'Email: ' + email,
        'Phone / WhatsApp: ' + (phone || 'Not provided'),
        'Subject: ' + subject,
        '',
        'Message:',
        message
      ].join('\n');
      const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);
      const whatsappWindow = window.open(whatsappUrl, '_blank');
      if (whatsappWindow) whatsappWindow.opener = null;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, subject, message })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Email could not be sent.');
        e.target.reset();
        showToast('Email sent to TechLink SL', 'Your message is ready in WhatsApp too. Press Send there to deliver it to our WhatsApp inbox.', 'info');
      } catch (error) {
        showToast('Email could not be sent', error.message || 'Please try again or contact us on WhatsApp.', 'info');
      }
    },
    handleConsultationSubmit: (e) => {
      e.preventDefault();
      TechLinkModals.closeConsultationModal();
      showToast('Consultation Booked!', 'A calendar invite and WhatsApp confirmation have been dispatched.');
    },
    handleJobSubmit: (e) => {
      e.preventDefault();
      TechLinkModals.closeJobModal();
      showToast('Application Received!', 'Our HR team will review your credentials and contact you.');
    },
    handleChatSend: handleChatSend,
    acceptCookies: () => {
      localStorage.setItem('techlink_cookie_consent', 'true');
      const banner = document.getElementById('cookie-banner');
      if (banner) banner.classList.add('hidden');
      showToast('Preferences Saved', 'Cookie settings updated.');
    }
  };
});
