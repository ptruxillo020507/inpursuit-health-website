/**
 * nav.js — InPursuit Health Universal Navigation + Footer
 * Include before </body>: <script src="nav.js"></script>
 */

(function () {
  // ── CONFIG ───────────────────────────────────────────────────────
  const BRAND = {
    wordmark: "InPursuit Health",
    sub: "MAHA Policy Accelerant",
    tagline: "Harness the Power of Your Data™"
  };

  const CTA = {
    label: "Get Started",
    href: "contact.html"
  };

  const NAV = [
    { label: "MAHA", href: "maha.html" },
    {
      label: "TETRA",
      href: "tetra.html",
      children: [
        { label: "TETRA Ex™", href: "tetra-ex.html", desc: "Enterprise data exchange & interoperability infrastructure" },
        { label: "TETRA Conductor™", href: "tetra-conductor.html", desc: "Model-agnostic AI orchestration layer for healthcare" },
        {
          label: "TETRA Aegis™",
          href: "tetra-aegis.html",
          desc: "AI governance & supervisory control architecture",
          children: [
            { label: "TETRA Sentinel™", href: "#", desc: "Real-time AI supervision & threat interception agent" } // placeholder if no page yet
          ]
        }
      ]
    },
    {
      label: "For You",
      href: "for-you.html",
      children: [
        { label: "The Data Oath", href: "data-oath.html", desc: "Our promise on how your health data is used" }
      ]
    },
    {
      label: "For VBC Providers",
      href: "for-providers.html",
      children: [
        { label: "CMS ACCESS Model", href: "access.html", desc: "Apply by April 1, 2026 — Cohort 1" },
        { label: "MSSP", href: "mssp.html", desc: "Medicare Shared Savings Program" },
        { label: "LEAD", href: "lead.html", desc: "Long-term Enhanced ACO Design" },
        { label: "TEAM", href: "team.html", desc: "Transforming Episode Accountability" }
      ]
    },
    { label: "Veterans First", href: "veterans-first.html" },
    { label: "About Us", href: "about.html" },
    { label: "Leadership", href: "leadership.html" },
    { label: "Careers", href: "careers.html" },
    { label: "Security", href: "security-center.html" },
    { label: "Contact", href: "contact.html" }
  ];

  // ── BUILD FUNCTIONS ──────────────────────────────────────────────
  function buildNavItem(item, isSub = false) {
    const li = document.createElement("li");
    li.className = isSub ? "iph-dropdown-item" : "iph-ni";

    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;

    if (item.children) {
      li.classList.add("iph-dropdown");
      const toggle = document.createElement("span");
      toggle.className = "iph-dropdown-toggle";
      toggle.textContent = "▼";
      a.appendChild(toggle);

      const ul = document.createElement("ul");
      ul.className = "iph-dropdown-menu";
      item.children.forEach(child => {
        const subLi = buildNavItem(child, true);
        ul.appendChild(subLi);
      });
      li.appendChild(ul);
    }

    li.appendChild(a);
    return li;
  }

  function buildNav() {
    const ul = document.createElement("ul");
    ul.id = "iph-nav";
    NAV.forEach(item => ul.appendChild(buildNavItem(item)));
    return ul;
  }

  function buildMobile() {
    // Simplified mobile overlay - expand as needed
    const mob = document.createElement("div");
    mob.id = "iph-mobile-menu";
    mob.className = "iph-mobile";
    mob.innerHTML = `<div class="iph-mob-inner">${BRAND.wordmark}<button id="iph-close">×</button></div>`;
    // Add links clone or custom mobile structure here if desired
    return mob;
  }

  function buildFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">${BRAND.wordmark}</div>
        <span class="footer-legal">© ${new Date().getFullYear()} InPursuit Health, LLC. All rights reserved.</span>
      </div>
      <p class="footer-disclaimer">InPursuit Health is a veteran-owned healthcare technology company providing data interoperability and orchestration infrastructure. The information on this site is for informational purposes only and does not constitute medical advice. TETRA is a registered technology of InPursuit Health, LLC.</p>
      <div class="footer-tagline">${BRAND.tagline}</div>
    `;
    return footer;
  }

  // ── INJECT ────────────────────────────────────────────────────────
  function inject() {
    const header = document.createElement("header");
    header.id = "iph-topbar";
    header.className = "top-bar";

    const inner = document.createElement("div");
    inner.className = "top-inner";

    const brand = document.createElement("div");
    brand.className = "iph-brand";
    brand.innerHTML = `<span id="iph-brand-wordmark">${BRAND.wordmark}</span><span id="iph-brand-pipe">|</span><span id="iph-brand-sub">${BRAND.sub}</span>`;

    inner.appendChild(brand);
    inner.appendChild(buildNav());

    const ctaEl = document.createElement("a");
    ctaEl.id = "iph-cta";
    ctaEl.href = CTA.href;
    ctaEl.textContent = CTA.label;
    inner.appendChild(ctaEl);

    const burger = document.createElement("button");
    burger.id = "iph-burger";
    burger.setAttribute("aria-label", "Menu");
    burger.innerHTML = "<span></span><span></span><span></span>";
    burger.addEventListener("click", () => header.classList.toggle("iph-mob-open"));
    inner.appendChild(burger);

    header.appendChild(inner);
    document.body.insertBefore(header, document.body.firstChild);

    // Mobile menu placeholder (expand later)
    const mob = buildMobile();
    document.body.insertBefore(mob, document.body.firstChild);

    // Scroll effect
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });

    // Remove/append footer
    document.querySelector("footer")?.remove();
    document.body.appendChild(buildFooter());

    // Active link highlight
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#iph-nav a").forEach(a => {
      if (a.getAttribute("href") === currentPage) {
        a.style.color = "#C5A44E";
        a.style.fontWeight = "600";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();