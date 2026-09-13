(() => {
  const root = document.documentElement;
  root.classList.add("js");

  // Tema: kayıtlı tercih, yoksa sistem tercihi
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const currentTheme = () =>
    root.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  themeBtn?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* depolama kapalı olabilir */ }
  });

  // Mobil menü
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navList = document.querySelector("[data-nav]");
  const setNav = (open) => {
    navList.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };
  navToggle?.addEventListener("click", () => setNav(!navList.classList.contains("is-open")));
  navList?.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  // Kaydırınca başlık alt çizgisi
  const header = document.querySelector("[data-header]");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Aktif bölüm vurgusu
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove("is-active"));
      byId.get(entry.target.id)?.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // Görünür olunca yumuşak giriş
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

  // E-posta adresini kopyala
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const label = btn.querySelector("[data-copy-label]");
    const original = label.textContent;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = btn.dataset.copied || "✓";
      } catch (e) {
        label.textContent = btn.dataset.copy;
      }
      setTimeout(() => { label.textContent = original; }, 1800);
    });
  });
})();
