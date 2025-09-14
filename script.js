// D3 v7 Smooth Scrolling, Visual Effects, and Interactive World Map
document.addEventListener('DOMContentLoaded', function () {
    // -----------------------------
    // Base UI Selections & Effects
    // -----------------------------
    const body = d3.select('body');
    const nav = d3.select('#nav');
    const hero = d3.select('#hero');
    const argumentCards = d3.selectAll('.argument-card');
    const indicators = d3.selectAll('.indicator');
  
    // Smooth scrolling for navigation links
    d3.selectAll('.nav-link').on('click', function (event) {
      event.preventDefault();
      const targetId = d3.select(this).attr('href');
      const targetElement = d3.select(targetId).node();
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  
    // Navigation visibility on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      nav.classed('visible', currentScrollY > 100);
      lastScrollY = currentScrollY;
    });
  
    // Intersection Observer for card animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            d3.select(entry.target)
              .classed('visible', true)
              .transition()
              .duration(800)
              .ease(d3.easeCubicOut)
              .style('opacity', 1)
              .style('transform', 'translateY(0)');
          }, delay);
        }
      });
    }, observerOptions);
  
    argumentCards.each(function () {
      observer.observe(this);
    });
  
    // Hero section animations
    const heroElements = d3.selectAll('.hero-title, .hero-subtitle, .debate-indicators');
    heroElements.style('opacity', 0).style('transform', 'translateY(30px)');
    heroElements
      .transition()
      .delay((d, i) => i * 300)
      .duration(1000)
      .ease(d3.easeCubicOut)
      .style('opacity', 1)
      .style('transform', 'translateY(0)');
  
    // Interactive indicator effects
    indicators
      .on('mouseenter', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .ease(d3.easeCubicOut)
          .style('transform', 'scale(1.05)')
          .style('box-shadow', function () {
            const isYes = d3.select(this).classed('yes-indicator');
            const isNo = d3.select(this).classed('no-indicator');
            if (isYes) return '0 0 40px rgba(74, 222, 128, 0.5)';
            if (isNo) return '0 0 40px rgba(248, 113, 113, 0.5)';
            return '0 0 40px rgba(99, 102, 241, 0.5)';
          });
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .ease(d3.easeCubicOut)
          .style('transform', 'scale(1)')
          .style('box-shadow', function () {
            const isYes = d3.select(this).classed('yes-indicator');
            const isNo = d3.select(this).classed('no-indicator');
            if (isYes) return '0 0 30px rgba(74, 222, 128, 0.3)';
            if (isNo) return '0 0 30px rgba(248, 113, 113, 0.3)';
            return '0 0 30px rgba(99, 102, 241, 0.3)';
          });
      });
  
    // Parallax hero background
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      d3.select('.hero').style('transform', `translateY(${parallax}px)`);
    });
  
    // Floating animation for cards
    function createFloatingAnimation() {
      argumentCards.each(function () {
        const card = d3.select(this);
        const randomDelay = Math.random() * 2000;
        const randomDuration = 3000 + Math.random() * 2000;
        function float() {
          card
            .transition()
            .duration(randomDuration)
            .ease(d3.easeSinInOut)
            .style('transform', 'translateY(-5px)')
            .transition()
            .duration(randomDuration)
            .ease(d3.easeSinInOut)
            .style('transform', 'translateY(5px)')
            .on('end', float);
        }
        setTimeout(float, randomDelay);
      });
    }
    setTimeout(createFloatingAnimation, 2000);
  
    // Smooth reveal for sections
    const sections = d3.selectAll('.argument-section, .conclusion-section');
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            d3.select(entry.target).transition().duration(1000).ease(d3.easeCubicOut).style('opacity', 1);
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.each(function () {
      d3.select(this).style('opacity', 0);
      sectionObserver.observe(this);
    });
  
    // Dynamic background stars
    function createStars() {
      const heroNode = d3.select('.hero');
      if (heroNode.empty()) return;
      const starsContainer = heroNode
        .append('div')
        .attr('class', 'dynamic-stars')
        .style('position', 'absolute')
        .style('top', 0)
        .style('left', 0)
        .style('width', '100%')
        .style('height', '100%')
        .style('pointer-events', 'none')
        .style('overflow', 'hidden');
  
      const stars = starsContainer
        .selectAll('.star')
        .data(d3.range(50))
        .enter()
        .append('div')
        .attr('class', 'star')
        .style('position', 'absolute')
        .style('width', '2px')
        .style('height', '2px')
        .style('background', '#fff')
        .style('border-radius', '50%')
        .style('left', () => Math.random() * 100 + '%')
        .style('top', () => Math.random() * 100 + '%')
        .style('opacity', () => Math.random() * 0.8 + 0.2);
  
      function animateStars() {
        stars
          .transition()
          .duration(() => 2000 + Math.random() * 3000)
          .ease(d3.easeLinear)
          .style('opacity', () => Math.random() * 0.8 + 0.2)
          .on('end', animateStars);
      }
      animateStars();
    }
    createStars();
  
    // Scroll indicator animation
    const scrollIndicator = d3.select('.scroll-arrow');
    function animateScrollIndicator() {
      if (scrollIndicator.empty()) return;
      scrollIndicator
        .transition()
        .duration(1000)
        .ease(d3.easeSinInOut)
        .style('opacity', 0.3)
        .transition()
        .duration(1000)
        .ease(d3.easeSinInOut)
        .style('opacity', 1)
        .on('end', animateScrollIndicator);
    }
    animateScrollIndicator();
  
    // Indicator shortcut scroll
    d3.select('.yes-indicator').on('click', () => {
      const n = d3.select('#yes').node();
      if (n) n.scrollIntoView({ behavior: 'smooth' });
    });
    d3.select('.no-indicator').on('click', () => {
      const n = d3.select('#no').node();
      if (n) n.scrollIntoView({ behavior: 'smooth' });
    });
  
    // Card hover lift effect
    argumentCards
      .on('mouseenter', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .ease(d3.easeCubicOut)
          .style('transform', 'translateY(-10px) scale(1.02)')
          .style('box-shadow', '0 20px 40px rgba(0, 0, 0, 0.3)');
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .ease(d3.easeCubicOut)
          .style('transform', 'translateY(0) scale(1)')
          .style('box-shadow', '0 10px 20px rgba(0, 0, 0, 0.1)');
      });
  
    // Typing effect for hero title
    const heroTitle = d3.select('.hero-title');
    const titleText = heroTitle.text();
    heroTitle.text('').style('opacity', 1);
    let i = 0;
    function typeWriter() {
      if (i < titleText.length) {
        heroTitle.text(titleText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  
    // ---------------------------------------------------------
    // WORLD MAP: country shapes + clickable space-program info
    // ---------------------------------------------------------
  
    // 1) Country metadata (both "no agency" and "has agency")
    // Normalize helper to map variations in country names
    const normalize = (s) => s.toLowerCase().replace(/[^a-z]+/g, '');
  
    // Use arrays, but register under multiple aliases where needed
    const countryMeta = {};
  
    function registerCountry(names, meta) {
      const canonical = names[0]; // display name preference
      names.forEach((n) => {
        countryMeta[normalize(n)] = { ...meta, name: canonical };
      });
    }
  
    // Countries WITHOUT a national government space agency
    registerCountry(['Ireland'], {
      status: 'No Government Space Agency',
      details:
        "Manages space via Enterprise Ireland and participates through ESA membership. High-income economy with strong tech sector.",
      stats: { 'Space Approach': 'ESA Member', 'HDI Rank': 'Very High', 'GDP per Capita': '$89,383' },
      category: 'no-agency',
    });
  
    registerCountry(['Iceland'], {
      status: 'No Government Space Agency',
      details:
        "No government space agency (a private initiative exists). Not an ESA member. Consistently top-tier on human development.",
      stats: { 'Space Approach': 'Private Only', 'HDI Rank': 'Very High', 'GDP per Capita': '$69,420' },
      category: 'no-agency',
    });
  
    registerCountry(['Monaco'], {
      status: 'No National Space Agency',
      details:
        'No national agency or launch capability; small Office for Outer Space Affairs, relies on partnerships/slots.',
      stats: { 'Space Approach': 'Partnerships', 'HDI Rank': 'Very High', 'GDP per Capita': '$234,315' },
      category: 'no-agency',
    });
  
    registerCountry(['Liechtenstein'], {
      status: 'No Space Agency',
      details:
        'Adopted a Space Act framework; signed Artemis Accords to enable private participation. Very high HDI.',
      stats: { 'Space Approach': 'Private Framework', 'HDI Rank': 'Very High', 'GDP per Capita': '$139,100' },
      category: 'no-agency',
    });
  
    registerCountry(['Andorra'], {
      status: 'No Space Agency',
      details: 'Works with ESA-linked firms for niche satellite applications. Very high HDI.',
      stats: { 'Space Approach': 'ESA Partners', 'HDI Rank': 'Very High', 'GDP per Capita': '$42,128' },
      category: 'no-agency',
    });
  
    registerCountry(['Brunei'], {
      status: 'No National Space Agency',
      details: 'Engages via regional/international science bodies. Very high human development.',
      stats: { 'Space Approach': 'Intl. Bodies', 'HDI Rank': 'Very High', 'GDP per Capita': '$31,086' },
      category: 'no-agency',
    });
  
    registerCountry(['Qatar'], {
      status: 'No Government Space Agency',
      details: "Operates via Es'hailSat and partnerships; very high human development.",
      stats: { 'Space Approach': 'Commercial Operator', 'HDI Rank': 'Very High', 'GDP per Capita': '$66,838' },
      category: 'no-agency',
    });
  
    // Countries WITH space programs / national agencies
    registerCountry(['United States of America', 'United States', 'USA', 'US'], {
      status: 'Has National Space Agency (NASA)',
      details:
        'NASA runs broad civil space programs across science, exploration, Earth observation, and technology; deep commercial ecosystem.',
      stats: { Agency: 'NASA', Launch: 'Yes', Crew: 'Yes' },
      category: 'has-agency',
    });
  
    registerCountry(['Russian Federation', 'Russia'], {
      status: 'Has National Space Agency (Roscosmos)',
      details: 'Long history in human spaceflight, launchers, planetary missions; significant industrial base.',
      stats: { Agency: 'Roscosmos', Launch: 'Yes', Crew: 'Yes' },
      category: 'has-agency',
    });
  
    registerCountry(['China', 'People’s Republic of China', 'PRC'], {
      status: 'Has National Space Agency (CNSA)',
      details:
        'Rapidly expanding program: crewed station, lunar/planetary probes, heavy-lift launch; robust domestic supply chain.',
      stats: { Agency: 'CNSA', Launch: 'Yes', Crew: 'Yes' },
      category: 'has-agency',
    });
  
    registerCountry(['Japan'], {
      status: 'Has National Space Agency (JAXA)',
      details:
        'Strong science/tech focus: asteroid sample returns, Earth observation, launchers, participation in ISS and Artemis.',
      stats: { Agency: 'JAXA', Launch: 'Yes', Crew: 'No domestic crewed launch' },
      category: 'has-agency',
    });
  
    registerCountry(['India'], {
      status: 'Has National Space Agency (ISRO)',
      details:
        'Cost-effective launchers, lunar/solar missions, deep Earth-observation portfolio, and expanding commercial sector.',
      stats: { Agency: 'ISRO', Launch: 'Yes', Crew: 'Crewed in development' },
      category: 'has-agency',
    });
  
    registerCountry(['Canada'], {
      status: 'Has National Space Agency (CSA/ASC)',
      details:
        'Renowned for robotics (Canadarm), Earth observation, and partnerships across NASA/ESA/ISS/Artemis.',
      stats: { Agency: 'CSA', Launch: 'No domestic orbital', Crew: 'Yes (via partners)' },
      category: 'has-agency',
    });
  
    registerCountry(['Brazil'], {
      status: 'Has National Space Agency (AEB/INPE)',
      details: 'Earth observation, launcher development, international partnerships; active remote-sensing programs.',
      stats: { Agency: 'AEB/INPE', Launch: 'Developing/limited', Crew: 'No' },
      category: 'has-agency',
    });
  
    registerCountry(['South Korea', 'Republic of Korea'], {
      status: 'Has National Space Program (KARI)',
      details: 'Active launch-vehicle development (Nuri), deepening Earth-observation and lunar plans.',
      stats: { Agency: 'KARI', Launch: 'Yes', Crew: 'No' },
      category: 'has-agency',
    });
  
    registerCountry(['Israel'], {
      status: 'Has National Space Agency (ISA)',
      details: 'Small but advanced program: Earth observation, smallsats, lunar attempts, and tech innovation.',
      stats: { Agency: 'ISA', Launch: 'No domestic orbital', Crew: 'No' },
      category: 'has-agency',
    });
  
    registerCountry(['Iran', 'Iran, Islamic Republic of'], {
      status: 'Has National Space Agency (ISA Iran)',
      details: 'Runs satellite launches and technology development; human spaceflight not active.',
      stats: { Agency: 'ISA (Iran)', Launch: 'Yes (limited)', Crew: 'No' },
      category: 'has-agency',
    });
  
    registerCountry([
      "North Korea",
      "Democratic People's Republic of Korea",
      'DPRK',
    ], {
      status: 'Has National Program (NADA)',
      details: 'Runs satellite launch attempts; program framed as civilian; geopolitical sensitivities apply.',
      stats: { Agency: 'NADA', Launch: 'Yes (limited)', Crew: 'No' },
      category: 'has-agency',
    });
  
    // 2) World map creation
    const MAP_GEOJSON_URL =
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';
  
    createWorldMap();
  
    function createWorldMap() {
      const mapContainer = d3.select('#world-map');
      if (mapContainer.empty()) {
        console.warn('#world-map not found; skipping world map init.');
        return;
      }
  
      // Clean container (in case of re-init)
      mapContainer.selectAll('*').remove();
  
      // Tooltip
      const tooltip = mapContainer
        .append('div')
        .attr('class', 'map-tooltip')
        .style('position', 'absolute')
        .style('pointer-events', 'none')
        .style('padding', '8px 10px')
        .style('border-radius', '8px')
        .style('font-size', '12px')
        .style('background', 'rgba(15,23,42,0.9)')
        .style('color', '#fff')
        .style('box-shadow', '0 8px 24px rgba(0,0,0,0.35)')
        .style('opacity', 0);
  
      // SVG + groups
      const svg = mapContainer
        .append('svg')
        .attr('class', 'world-svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 960 520')
        .style('background', 'linear-gradient(135deg, #0b1220 0%, #0f172a 100%)');
  
      const g = svg.append('g').attr('class', 'map-layer');
  
      const projection = d3.geoNaturalEarth1().precision(0.1);
      const path = d3.geoPath(projection);
  
      // Legend
      const legend = svg.append('g').attr('class', 'map-legend').attr('transform', 'translate(16,16)');
      const legendItems = [
        { label: 'Has National Space Program', color: '#4ade80' },
        { label: 'No Government Space Agency', color: '#f87171' },
        { label: 'Other Countries', color: '#334155' },
      ];
      legendItems.forEach((item, idx) => {
        const row = legend.append('g').attr('transform', `translate(0, ${idx * 22})`);
        row
          .append('rect')
          .attr('width', 14)
          .attr('height', 14)
          .attr('rx', 3)
          .attr('fill', item.color)
          .attr('stroke', 'rgba(255,255,255,0.2)');
        row
          .append('text')
          .attr('x', 20)
          .attr('y', 11)
          .attr('fill', '#e2e8f0')
          .attr('font-size', 12)
          .attr('font-weight', 500)
          .text(item.label);
      });
  
      // Zoom/Pan
      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });
      svg.call(zoom);
  
      // Load GeoJSON and draw
      d3.json(MAP_GEOJSON_URL)
        .then((world) => {
          // Fit projection to the world
          projection.fitExtent(
            [
              [10, 10],
              [950, 510],
            ],
            world
          );
  
          // Color by category
          function countryColor(name) {
            const meta = countryMeta[normalize(name)];
            if (!meta) return '#334155'; // neutral slate
            return meta.category === 'no-agency' ? '#f87171' : '#4ade80';
          }
  
          // Draw countries
          const countries = g
            .selectAll('path.country')
            .data(world.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path)
            .attr('fill', (d) => countryColor(d.properties.name))
            .attr('stroke', 'rgba(255,255,255,0.25)')
            .attr('stroke-width', 0.5)
            .style('cursor', (d) => (countryMeta[normalize(d.properties.name)] ? 'pointer' : 'default'))
            .on('mouseenter', function (event, d) {
              d3.select(this)
                .raise()
                .transition()
                .duration(150)
                .attr('stroke-width', 1);
  
              const meta = countryMeta[normalize(d.properties.name)];
              tooltip
                .style('opacity', 1)
                .html(
                  `<div style="font-weight:700;margin-bottom:4px;">${d.properties.name}</div>${
                    meta
                      ? `<div style="opacity:.9">${meta.status}</div><div style="opacity:.7;font-size:11px">Click for details</div>`
                      : `<div style="opacity:.7;font-size:11px">No details available</div>`
                  }`
                );
            })
            .on('mousemove', function (event) {
              const [x, y] = d3.pointer(event);
              tooltip.style('left', x + 20 + 'px').style('top', y + 20 + 'px');
            })
            .on('mouseleave', function () {
              d3.select(this).transition().duration(150).attr('stroke-width', 0.5);
              tooltip.transition().duration(150).style('opacity', 0);
            })
            .on('click', function (event, d) {
              const meta = countryMeta[normalize(d.properties.name)];
              if (meta) {
                showCountryInfo(meta);
                // Smooth zoom to country
                const [[x0, y0], [x1, y1]] = path.bounds(d);
                const dx = x1 - x0;
                const dy = y1 - y0;
                const cx = (x0 + x1) / 2;
                const cy = (y0 + y1) / 2;
                const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / 960, dy / 520)));
                const translate = [960 / 2 - scale * cx, 520 / 2 - scale * cy];
                svg
                  .transition()
                  .duration(750)
                  .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
              } else {
                // Reset zoom if clicking a non-highlighted country
                svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity);
              }
            });
  
          // Optional subtle glow for highlighted countries
          countries
            .filter((d) => !!countryMeta[normalize(d.properties.name)])
            .attr('filter', 'url(#glow)');
  
          // Define glow filter
          const defs = svg.append('defs');
          const filter = defs.append('filter').attr('id', 'glow');
          filter.append('feGaussianBlur').attr('stdDeviation', 2.2).attr('result', 'coloredBlur');
          const feMerge = filter.append('feMerge');
          feMerge.append('feMergeNode').attr('in', 'coloredBlur');
          feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
        })
        .catch((e) => {
          console.warn('World GeoJSON failed to load; using fallback background.', e);
          // Fallback: simple background
          g.append('rect').attr('x', 0).attr('y', 0).attr('width', 960).attr('height', 520).attr('fill', '#0f172a');
        });
    }
  
    // 3) Details panel rendering
    function showCountryInfo(countryMeta) {
      const container = d3.select('#country-info');
      if (container.empty()) return;
  
      const stats = countryMeta.stats || {};
      const statsHTML = Object.entries(stats)
        .map(
          ([k, v]) => `
          <div class="country-stat">
            <span class="country-stat-value">${v}</span>
            <span class="country-stat-label">${k}</span>
          </div>`
        )
        .join('');
  
      container.html(`
        <div class="country-data active">
          <h4 class="country-name">${countryMeta.name}</h4>
          <div class="country-status">${countryMeta.status || ''}</div>
          <p class="country-details">${countryMeta.details || ''}</p>
          <div class="country-stats">${statsHTML}</div>
        </div>
      `);
  
      // Animate the info panel
      container.style('opacity', 0).transition().duration(300).ease(d3.easeCubicOut).style('opacity', 1);
    }
  
    console.log('Space Debate Website initialized with D3 v7 animations and interactive world map!');
  });
