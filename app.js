(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var store = {
    get: function (k, fb) {
      try {
        var v = localStorage.getItem(k);
        return v === null ? fb : JSON.parse(v);
      } catch (e) { return fb; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    }
  };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function maps(q) {
    if (!q) return "";
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  function mapsLink(q, label) {
    if (!q) return "";
    return '<a class="opt__maps" href="' + esc(maps(q)) + '" target="_blank" rel="noopener">' + esc(label || "Mapa") + "</a>";
  }

  /* ── POI / distancia ── */

  function poiCoords(q) {
    if (!q || typeof POI === "undefined") return null;
    var s = String(q).toLowerCase(), best = null, bestLen = 0;
    for (var k in POI) {
      if (k.length > bestLen && s.indexOf(k) !== -1) { best = k; bestLen = k.length; }
    }
    return best ? POI[best] : null;
  }

  function haversine(a, b) {
    var R = 6371, rad = Math.PI / 180;
    var dLat = (b[0] - a[0]) * rad, dLon = (b[1] - a[1]) * rad;
    var la1 = a[0] * rad, la2 = b[0] * rad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function fmtKm(km) {
    if (km < 1) return Math.round(km * 1000) + " m";
    if (km < 10) return (Math.round(km * 10) / 10).toFixed(1).replace(".", ",") + " km";
    return Math.round(km) + " km";
  }

  var NEAR = [];

  function nearBtn(anchor, cityCode, label) {
    if (!anchor || !cityCode) return "";
    NEAR.push({ a: anchor, city: cityCode, label: label });
    return '<button type="button" class="opt__near" data-near="' + (NEAR.length - 1) + '">Comer cerca</button>';
  }

  /* ── modal (sheet) ── */

  var sheetEl = null;

  function openSheet(title, inner) {
    closeSheet();
    sheetEl = document.createElement("div");
    sheetEl.className = "sheet-wrap";
    sheetEl.innerHTML = '<div class="sheet-back" data-close></div>' +
      '<div class="sheet" role="dialog" aria-modal="true">' +
      '<div class="sheet__head"><h4>' + esc(title) + '</h4><button type="button" class="sheet__x" data-close aria-label="Cerrar">✕</button></div>' +
      '<div class="sheet__body">' + inner + "</div></div>";
    document.body.appendChild(sheetEl);
    document.body.style.overflow = "hidden";
    sheetEl.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-close]")) closeSheet();
    });
  }

  function closeSheet() {
    if (sheetEl && sheetEl.parentNode) sheetEl.parentNode.removeChild(sheetEl);
    sheetEl = null;
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) closeSheet();
  });

  function nearbyModal(anchor, cityCode, whereLabel) {
    var c = CITIES[cityCode];
    if (!c || !anchor) return;
    var list = (c.eat || []).filter(function (e) { return e.c; }).map(function (e) {
      return { e: e, d: haversine(anchor, e.c) };
    }).sort(function (a, b) { return a.d - b.d; });

    var h = '<p class="sheet__sub">Restaurantes de ' + esc(c.name) + ' ordenados por distancia desde <b>' + esc(whereLabel) +
      "</b>. Reloj español: comed a las 14:00 y cenad a las 21:30 — BBQ y cocinas de parque cierran antes (mirad el horario).</p>";

    if (!list.length) {
      h += '<p class="sheet__empty">Sin datos de distancia para esta ciudad todavía.</p>';
    }
    list.forEach(function (x, i) {
      var e = x.e;
      h += '<div class="near">' +
        '<span class="near__rank">' + (i + 1) + "</span>" +
        '<div class="near__body"><b>' + esc(e.name) + (e.must ? '<span class="near__must">imprescindible</span>' : "") + "</b>" +
        '<span class="near__meta">' + esc(e.type) + " · " + esc(e.price) + ' · <i class="near__dist">' + fmtKm(x.d) + "</i></span>" +
        (e.hours ? '<span class="near__hours">Horario: ' + esc(e.hours) + "</span>" : "") +
        '<span class="near__note">' + esc(e.note) + "</span></div>" +
        '<a class="near__go" href="' + esc(maps(e.name + ", " + (e.addr || "") + ", " + c.name + ", " + c.state)) +
        '" target="_blank" rel="noopener">Mapa</a>' +
        "</div>";
    });
    openSheet("Comer cerca · " + c.name, h);
  }

  function routeModal(p) {
    var h = '<p class="sheet__sub">' + esc(p.day) + " · " + esc(p.hours) + "</p><div class=\"timeline\">";
    (p.route || []).forEach(function (s) {
      h += '<div class="tl tl--' + esc(s.kind) + '">' +
        '<div class="tl__t">' + esc(s.t) + "</div><div class=\"tl__dot\"></div>" +
        '<div class="tl__body"><b>' + esc(s.title) + "</b>" +
        (s.wait ? '<span class="tl__wait">' + esc(s.wait) + "</span>" : "") +
        (s.note ? "<span>" + esc(s.note) + "</span>" : "") +
        "</div></div>";
    });
    h += "</div>";
    if (p.food) h += '<p class="sheet__foot"><b>Comer:</b> ' + esc(p.food) + "</p>";
    h += '<p class="sheet__foot">Reloj español: comida a las 14:00, cena a las 21:30 (los parques cierran la cocina al cerrar). ' +
      (p.ticketUrl ? 'Entradas: <a href="' + esc(p.ticketUrl) + '" target="_blank" rel="noopener">taquilla oficial ↗</a>' : "") + "</p>";
    openSheet("Ruta optimizada · " + p.name, h);
  }

  function normTag(t) {
    return String(t || "").toLowerCase();
  }

  /* ── tema ── */

  var THEMES = ["pressbox", "postcard"];

  function setTheme(t) {
    if (THEMES.indexOf(t) === -1) t = "pressbox";
    document.documentElement.setAttribute("data-theme", t);
    store.set("rs-theme", t);
    $$(".theme-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-theme") === t ? "true" : "false");
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "postcard" ? "#F4EDDF" : "#0B0B0C");
  }

  /* ── tabs ── */

  var scrollMem = {};
  var currentTab = "ruta";

  function goTab(id) {
    var prev = currentTab;
    scrollMem[prev] = window.scrollY;
    currentTab = id;
    $$(".tab").forEach(function (s) {
      s.classList.toggle("is-active", s.getAttribute("data-tab") === id);
    });
    $$("#tabbar button").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-tab") === id);
    });
    window.scrollTo(0, scrollMem[id] || 0);
  }

  /* ── reservas ── */

  function val(v) {
    if (!v || String(v).toLowerCase() === "pendiente") {
      return '<span class="pendiente">✎ pendiente</span>';
    }
    return esc(v);
  }

  function renderReservas() {
    var pend = 0;
    var h = "";

    h += '<div class="res-group">Vuelos</div>';
    RESERVAS.vuelos.forEach(function (v) {
      if (!v.detail || String(v.detail).toLowerCase() === "pendiente") pend++;
      h += '<div class="res-row"><b>' + esc(v.label) + '</b><span class="val">' + val(v.detail) +
        (v.extra ? '<span class="extra">' + esc(v.extra) + "</span>" : "") + "</span></div>";
    });

    h += '<div class="res-group">Alojamiento</div>';
    RESERVAS.hoteles.forEach(function (v) {
      if (!v.detail || String(v.detail).toLowerCase() === "pendiente") pend++;
      h += '<div class="res-row"><b>' + esc(v.city) + " · " + esc(v.dates) + '</b><span class="val">' + val(v.detail) +
        (v.extra ? '<span class="extra">' + esc(v.extra) + "</span>" : "") + "</span></div>";
    });

    h += '<div class="res-group">Coche</div>';
    h += '<div class="res-row"><b>' + esc(RESERVAS.coche.label) + '</b><span class="val">' + esc(RESERVAS.coche.detail) +
      (RESERVAS.coche.extra ? '<span class="extra">' + esc(RESERVAS.coche.extra) + "</span>" : "") + "</span></div>";

    h += '<div class="res-group">Entradas</div>';
    RESERVAS.entradas.forEach(function (v) {
      h += '<div class="res-row"><b>' + esc(v.label) + '</b><span class="val">' + esc(v.detail) +
        (v.extra ? '<span class="extra">' + esc(v.extra) + "</span>" : "") + "</span></div>";
    });

    h += '<p class="res-row" style="border:0;padding-top:12px"><span class="val" style="text-align:left">' + esc(RESERVAS.note) + "</span></p>";

    $("#reservas-body").innerHTML = h;
    $("#res-pend").textContent = pend + " pendiente" + (pend === 1 ? "" : "s");
  }

  /* ── días ── */

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function renderDays() {
    var choices = store.get("rs-choices", {});
    var iso = todayISO();
    var nav = "";
    var html = "";
    NEAR = [];

    DAYS.forEach(function (day) {
      var isToday = day.date === iso;
      nav += '<button type="button" data-jump="' + day.id + '" data-city="' + day.city + '"' + (isToday ? ' class="is-today"' : "") + ">" +
        esc(day.date.slice(8)) + "<i>" + esc(day.city) + "</i></button>";

      var num = String(Number(day.date.slice(8)));
      var wx = day.weather.hi + "°/" + day.weather.lo + "°" + (day.weather.note ? " · " + esc(day.weather.note) : "");

      html += '<article class="day" id="' + day.id + '" data-city="' + day.city + '">';
      html += '<div class="day__head">';
      html += '<div class="day__date"><span class="day__dow">' + esc(day.day) + '</span><span class="day__num">' + num + "</span></div>";
      html += '<div class="day__city"><div class="day__city-top"><span class="city-chip ' + day.city + '">' + day.city +
        '</span><span class="day__name">' + esc(day.cityLabel) + "</span>" +
        (isToday ? '<span class="today-flag">HOY</span>' : "") + "</div>";
      html += '<div class="day__weather"><span>' + wx + "</span></div></div>";
      html += "</div>";

      if (day.fixed && day.fixed.length) {
        html += '<div class="day__fixed">';
        day.fixed.forEach(function (f) {
          html += '<div class="stub">';
          html += '<div class="stub__time">' + esc(f.time) + "</div>";
          html += '<div class="stub__body"><h3>' + esc(f.title) + "</h3>";
          html += '<div class="stub__meta">' + esc(f.meta) + "</div>";
          if (f.price) html += '<div class="stub__price">' + esc(f.price) + "</div>";
          if (f.extra) html += '<div class="stub__price">' + esc(f.extra) + "</div>";
          html += "</div>";
          html += '<div class="stub__side">' + mapsLink(f.maps, "Mapa") +
            (f.ticket ? '<a class="stub__buy" href="' + esc(f.ticket) + '" target="_blank" rel="noopener">Entradas ↗</a>' : "") +
            "</div>";
          html += "</div>";
        });
        html += "</div>";
      }

      if (day.blocks && day.blocks.length) {
        html += '<div class="day__blocks">';
        day.blocks.forEach(function (block, bi) {
          var key = day.id + "::" + bi;
          var chosen = choices[key];
          html += '<div class="block">';
          html += '<div class="block__slot">' + esc(block.slot) + "</div>";
          html += '<div class="block__title">' + esc(block.title) + "</div>";
          html += '<div class="opts">';
          var stay = CITIES[day.city] && CITIES[day.city].stay;
          var stayAnchor = stay ? (poiCoords(stay.name + ", " + stay.addr) || poiCoords(stay.addr)) : null;
          block.options.forEach(function (op, oi) {
            var checked = chosen === oi ? " checked" : "";
            var opAnchor = poiCoords(op.maps);
            var dayLabel = block.slot + " · " + op.title;
            html += '<div class="opt">';
            html += '<label class="opt__main"><input type="radio" name="' + key + '" value="' + oi + '"' + checked + ">";
            html += '<span class="opt__check"></span><span class="opt__body">';
            html += '<span class="opt__tag" data-tag="' + esc(normTag(op.tag)) + '">' + esc(op.tag) + "</span>";
            html += '<span class="opt__title">' + esc(op.title) + "</span>";
            if (op.desc) html += '<span class="opt__desc">' + esc(op.desc) + "</span>";
            if (op.price) html += '<span class="opt__price">' + esc(op.price) + "</span>";
            if (op.hours) html += '<span class="opt__hours">Horario: ' + esc(op.hours) + "</span>";
            if (opAnchor && stayAnchor) {
              var dk = haversine(opAnchor, stayAnchor);
              if (dk > 0.05) html += '<span class="opt__dist">' + fmtKm(dk) + " del alojamiento</span>";
            }
            html += "</span></label>";
            if (op.ticket) html += '<a class="opt__buy" href="' + esc(op.ticket) + '" target="_blank" rel="noopener">Entradas</a>';
            html += mapsLink(op.maps, "Mapa");
            html += nearBtn(opAnchor || stayAnchor, day.city, dayLabel);
            html += "</div>";
          });
          html += "</div></div>";
        });
        html += "</div>";
      }

      html += "</article>";
    });

    $("#days").innerHTML = html;
    $("#daynav").innerHTML = nav;
    $("#days-count").textContent = DAYS.length + " días";
  }

  /* ── juegos ── */

  function renderGames() {
    var h = "";
    GAMES.forEach(function (g) {
      h += '<article class="game">';
      h += '<div class="game__league"><span class="lg">' + esc(g.league) + "</span><span>" + esc(g.city) + " · " + esc(g.date) + "</span></div>";
      h += '<div class="game__main">';
      h += '<div class="game__teams">' + esc(g.team) + '<span class="game__vs">frente a</span><span class="game__rival">' + esc(g.rival) + "</span></div>";
      h += '<div class="game__grid">';
      h += '<div class="game__cell"><b>Hora</b><span>' + esc(g.time) + "</span></div>";
      h += '<div class="game__cell"><b>Pabellón</b><span>' + esc(g.venue) + "</span></div>";
      h += '<div class="game__cell"><b>Ciudad</b><span>' + esc(g.city) + "</span></div>";
      h += "</div></div>";
      h += '<p class="game__note">' + esc(g.note) + "</p>";
      if (g.dine) h += '<div class="game__dine"><b>Estrategia de comida:</b> ' + esc(g.dine) + "</div>";
      var gAnchor = poiCoords(g.maps);
      h += '<div class="game__foot"><a href="' + esc(maps(g.maps)) + '" target="_blank" rel="noopener">Mapa</a>' +
        (gAnchor ? '<button type="button" data-near="' + (NEAR.push({ a: gAnchor, city: g.city, label: g.venue }) - 1) + '">Comer cerca</button>' : "") +
        "<span>" + esc(g.date) + " · " + esc(g.time) + "</span></div>";
      h += "</article>";
    });

    h += '<article class="event-card">';
    h += "<h3>" + esc(EVENT.name) + "</h3>";
    h += '<div class="ev-meta"><span>' + esc(EVENT.dates) + "</span><span>" + esc(EVENT.place) + "</span><span>" + esc(EVENT.hours) + "</span><span>" + esc(EVENT.who) + "</span></div>";
    h += "<ul>" + EVENT.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>";
    h += '<div class="game__foot" style="border-top:2px solid var(--line);margin-top:12px"><a href="' + esc(maps(EVENT.addr)) + '" target="_blank" rel="noopener" style="color:var(--ink)">Cómo llegar</a></div>';
    h += "</article>";

    $("#games").innerHTML = h;
  }

  /* ── ciudades ── */

  var PLAN_EX_SLOT = { estrategia: 1, comida: 1 };
  var PLAN_EX_TAG = { "logística": 1, "ruta": 1 };

  function cityPlans(code) {
    var groups = [];
    DAYS.forEach(function (day) {
      if (day.city !== code) return;
      var items = [];
      (day.fixed || []).forEach(function (f) {
        if (f.ticket) items.push({ src: f, slot: f.time });
      });
      (day.blocks || []).forEach(function (b) {
        if (PLAN_EX_SLOT[b.slot]) return;
        (b.options || []).forEach(function (o) {
          if (PLAN_EX_TAG[String(o.tag || "").toLowerCase()]) return;
          items.push({ src: o, slot: b.slot });
        });
      });
      if (items.length) groups.push({ day: day, items: items });
    });
    return groups;
  }

  function renderCities() {
    var tabs = "";
    var panels = "";
    var keys = Object.keys(CITIES);
    var cities = {
      DAL: { n: "Dallas", s: "Texas" },
      ATL: { n: "Atlanta", s: "Georgia" },
      ORL: { n: "Orlando", s: "Florida" },
      MIA: { n: "Miami", s: "Florida" }
    };

    keys.forEach(function (k, i) {
      tabs += '<button type="button" data-city="' + k + '" role="tab" class="' + (i === 0 ? "is-active" : "") + '">' +
        esc(k) + "<small>" + esc(cities[k].s) + "</small></button>";
    });

    keys.forEach(function (k, i) {
      var c = CITIES[k];
      var p = '<div class="city-panel' + (i === 0 ? " is-active" : "") + '" data-city="' + k + '" role="tabpanel">';

      p += '<div class="city-hero"><h3>' + esc(c.name) + "</h3>";
      p += '<div class="sub"><span>' + esc(c.state) + "</span><span>" + esc(c.nights) + "</span><span>" + esc(c.tz) + "</span></div>";
      p += '<div class="wx">' + esc(c.weather) + "</div></div>";

      if (c.stay) {
        p += '<div class="city-block"><h4>Dónde dormís</h4>';
        p += '<div class="stay"><div class="stay__name">' + esc(c.stay.name) + "</div>";
        p += '<div class="stay__addr"><a class="maplink" href="' + esc(maps(c.stay.addr)) + '" target="_blank" rel="noopener">' + esc(c.stay.addr) + " → mapa</a></div>";
        p += '<div class="stay__note">' + esc(c.stay.note) + "</div></div></div>";
      }

      /* lista de planes de la ciudad (referencia si no se sigue la ruta) */
      var planGroups = cityPlans(k);
      var planCount = planGroups.reduce(function (n, g) { return n + g.items.length; }, 0);
      var stayAnchor = c.stay ? (poiCoords(c.stay.name + ", " + c.stay.addr) || poiCoords(c.stay.addr)) : null;
      p += '<div class="city-block"><details class="plans"><summary>Planes <i>(' + planCount + ")</i></summary>";
      planGroups.forEach(function (g) {
        var dayLabel = g.day.day + " " + Number(g.day.date.slice(8));
        p += '<div class="plans__day"><b>' + esc(dayLabel) + "</b><span>" + esc(g.items.length) + " planes</span></div>";
        g.items.forEach(function (it) {
          var o = it.src;
          var anchor = poiCoords(o.maps) || stayAnchor;
          var tagLabel = o.tag || it.slot || "";
          p += '<div class="cplan">';
          p += '<div class="cplan__main"><span class="opt__tag" data-tag="' + esc(normTag(tagLabel)) + '">' + esc(tagLabel) + "</span>";
          p += "<b>" + esc(o.title) + "</b>";
          var meta = [];
          if (o.price) meta.push(o.price);
          if (o.hours) meta.push(o.hours);
          if (anchor && stayAnchor) {
            var dk = haversine(anchor, stayAnchor);
            if (dk > 0.05) meta.push(fmtKm(dk) + " del alojamiento");
          }
          if (meta.length) p += '<span class="cplan__meta">' + esc(meta.join(" · ")) + "</span>";
          p += "</div>";
          p += '<div class="cplan__acts">';
          if (o.ticket) p += '<a class="cplan__buy" href="' + esc(o.ticket) + '" target="_blank" rel="noopener">Entradas</a>';
          if (o.maps) p += '<a class="cplan__map" href="' + esc(maps(o.maps)) + '" target="_blank" rel="noopener">Mapa</a>';
          p += nearBtn(anchor, k, dayLabel + " · " + o.title);
          p += "</div></div>";
        });
      });
      if (!planCount) p += '<p class="cplan__empty">Sin planes listados.</p>';
      p += "</details></div>";

      p += '<div class="city-block"><h4>Zonas y seguridad</h4>';
      c.safety.zones.forEach(function (z) {
        p += '<div class="zone" data-status="' + esc(z.status) + '"><span class="zone__dot"></span>' +
          '<span class="zone__area">' + esc(z.area) + '</span><span class="zone__note">' + esc(z.note) + "</span></div>";
      });
      p += "</div>";

      p += '<div class="city-block"><h4>Consejos locales</h4><ul class="tip-list">' +
        c.safety.tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";

      p += '<div class="city-block"><h4>Dónde comer</h4>';
      c.eat.forEach(function (e) {
        p += '<div class="eat"><span class="eat__name">' + esc(e.name) +
          (e.must ? '<span class="eat__must">imprescindible</span>' : "") +
          '</span><span class="eat__price">' + esc(e.price) + "</span>";
        p += '<span class="eat__type">' + esc(e.type) + "</span>";
        p += '<span class="eat__note">' + esc(e.note) + "</span>";
        p += '<span class="eat__addr">' + (e.addr
          ? '<a class="maplink" href="' + esc(maps(e.name + ", " + e.addr + ", " + c.name + ", " + c.state)) + '" target="_blank" rel="noopener">' + esc(e.addr) + " → mapa</a>"
          : "") + "</span>";
        if (e.hours) p += '<span class="eat__hours">Horario: ' + esc(e.hours) + "</span>";
        p += "</div>";
      });
      p += "</div>";

      p += '<div class="city-block"><h4>Bares y vida nocturna</h4>';
      c.bars.forEach(function (b) {
        p += '<div class="bar-row"><b>' + esc(b.name) + "</b><span>" + esc(b.note) + "</span><i>" + esc(b.area) +
          ' · <a class="maplink" href="' + esc(maps(b.name + " " + b.area)) + '" target="_blank" rel="noopener">mapa</a></i></div>';
      });
      p += "</div>";

      p += "</div>";
      panels += p;
    });

    $("#city-tabs").innerHTML = tabs;
    $("#city-panels").innerHTML = panels;
  }

  /* ── parques ── */

  function adrMeter(n) {
    var pips = "";
    for (var i = 1; i <= 5; i++) pips += '<i class="' + (i <= n ? "on" : "") + '"></i>';
    return '<span class="ride__adr" title="Adrenalina ' + n + ' de 5"><em>adr</em>' + pips + "<b>" + n + "/5</b></span>";
  }

  function recMeter(n) {
    if (!n) return "";
    var pips = "";
    for (var i = 1; i <= 5; i++) pips += '<i class="' + (i <= n ? "on" : "") + '"></i>';
    return '<span class="ride__rec" title="Recomendación ' + n + ' de 5"><em>rec</em>' + pips + "<b>" + n + "/5</b></span>";
  }

  function renderParks() {
    var h = "";
    PARKS.forEach(function (p) {
      h += '<article class="park">';
      h += '<div class="park__head"><div class="park__day">' + esc(p.day) + "</div><h3>" + esc(p.name) + "</h3>";
      h += '<div class="park__hours"><span>' + esc(p.hours) + "</span></div>";
      h += '<div class="park__tickets">' + esc(p.tickets) +
        (p.ticketUrl ? '<a class="park__buy" href="' + esc(p.ticketUrl) + '" target="_blank" rel="noopener">Comprar entradas ↗</a>' : "") + "</div>";
      h += '<button type="button" class="park__route" data-route="' + esc(p.id) + '">Ruta optimizada del día →</button>';
      h += "</div>";
      h += '<div class="park__body">';

      if (p.crowd) {
        h += '<div class="park__label">Cuándo ir</div><div class="park__crowd">' + esc(p.crowd) + "</div>";
      }

      h += '<div class="park__label">Estrategia</div><ol class="park__strategy">' +
        p.strategy.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>";

      if (p.worlds && p.worlds.length) {
        h += '<div class="park__label">Las 5 worlds</div><div class="worlds">' +
          p.worlds.map(function (w) { return '<div class="world"><b>' + esc(w.name) + "</b><span>" + esc(w.note) + "</span></div>"; }).join("") +
          "</div>";
      }

      h += '<div class="park__label">Todas las atracciones · recomendación y adrenalina 1–5 · cuándo subir</div><div class="rides">' +
        p.rides.map(function (r) {
          return '<div class="ride"><span class="ride__tag" data-tag="' + esc(r.tag) + '">' + esc(r.tag) + "</span>" +
            "<b>" + esc(r.name) + "</b>" +
            ((r.rec || r.adr) ? '<span class="ride__meters">' + recMeter(r.rec) + adrMeter(r.adr) + "</span>" : "") +
            "<span>" + esc(r.note) + "</span>" +
            (r.when ? '<span class="ride__when"><em>mejor hora</em>' + esc(r.when) + "</span>" : "") +
            "</div>";
        }).join("") + "</div>";

      h += '<div class="park__label">Comer</div><div class="park__food">' + esc(p.food) + "</div>";
      h += "</div></article>";
    });
    $("#parks").innerHTML = h;
  }

  /* ── maleta ── */

  function renderChecklists() {
    var saved = store.get("rs-check", {});
    var h = '<div class="maleta-total"><div class="row"><b>Progreso total</b><span class="pct" id="maleta-pct">0%</span></div>' +
      '<div class="bar"><i id="maleta-bar"></i></div></div>';

    CHECKLISTS.forEach(function (list) {
      var st = saved[list.id] || [];
      h += '<div class="checklist" data-list="' + list.id + '">';
      h += '<div class="checklist__head"><h3>' + esc(list.title) + '</h3><span class="checklist__count" data-count></span></div>';
      h += '<div class="checklist__items">';
      list.items.forEach(function (item, i) {
        var on = st[i] ? " checked" : "";
        h += '<label class="check"><input type="checkbox" data-list="' + list.id + '" data-idx="' + i + '"' + on + ">" +
          '<span class="check__box"></span><span class="check__txt">' + esc(item) + "</span></label>";
      });
      h += "</div></div>";
    });

    $("#checklists").innerHTML = h;
    updateCheckProgress();
  }

  function updateCheckProgress() {
    var saved = store.get("rs-check", {});
    var total = 0, done = 0;
    CHECKLISTS.forEach(function (list) {
      var st = saved[list.id] || [];
      var d = 0;
      list.items.forEach(function (_, i) { if (st[i]) d++; });
      total += list.items.length;
      done += d;
      var el = document.querySelector('.checklist[data-list="' + list.id + '"] [data-count]');
      if (el) el.textContent = d + "/" + list.items.length;
    });
    var pct = total ? Math.round((done / total) * 100) : 0;
    var pctEl = $("#maleta-pct");
    var barEl = $("#maleta-bar");
    if (pctEl) pctEl.textContent = pct + "%";
    if (barEl) barEl.style.width = pct + "%";
  }

  /* ── guía ── */

  function renderGuide() {
    var h = '<div class="sos"><h3>Seguridad — normas de oro</h3><ul>' +
      TIPS.safetyGlobal.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";

    h += '<div class="city-block" style="margin:4px 0 0"><h4>Cómo funciona EE.UU.</h4></div>';
    TIPS.practical.forEach(function (t, i) {
      h += '<details class="tip"' + (i === 0 ? " open" : "") + "><summary>" + esc(t.t) + "</summary><p>" + esc(t.d) + "</p></details>";
    });

    $("#guide").innerHTML = h;
  }

  /* ── eventos ── */

  function bind() {
    $$(".theme-switch button").forEach(function (b) {
      b.addEventListener("click", function () { setTheme(b.getAttribute("data-set-theme")); });
    });

    $$("#tabbar button").forEach(function (b) {
      b.addEventListener("click", function () { goTab(b.getAttribute("data-tab")); });
    });

    $("#daynav").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-jump]");
      if (!b) return;
      var el = document.getElementById(b.getAttribute("data-jump"));
      if (el && typeof el.scrollIntoView === "function") el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.addEventListener("change", function (e) {
      var t = e.target;
      if (t.matches('.opt input[type="radio"]')) {
        if (!t.checked) return;
        var choices = store.get("rs-choices", {});
        choices[t.name] = Number(t.value);
        store.set("rs-choices", choices);
      }
      if (t.matches('.check input[type="checkbox"]')) {
        var saved = store.get("rs-check", {});
        var id = t.getAttribute("data-list");
        var idx = Number(t.getAttribute("data-idx"));
        if (!saved[id]) saved[id] = [];
        saved[id][idx] = t.checked;
        store.set("rs-check", saved);
        updateCheckProgress();
      }
    });

    /* deselección: pulsar sobre la opción ya marcada la desmarca */
    var wasChecked = null;
    document.addEventListener("pointerdown", function (e) {
      wasChecked = null;
      if (!e.target.closest) return;
      var main = e.target.closest(".opt__main");
      if (!main) return;
      var input = main.querySelector('input[type="radio"]');
      if (input && input.checked) wasChecked = input;
    }, true);
    document.addEventListener("click", function (e) {
      if (wasChecked) {
        var input = wasChecked;
        wasChecked = null;
        setTimeout(function () {
          if (!input.checked) return;
          input.checked = false;
          var choices = store.get("rs-choices", {});
          delete choices[input.name];
          store.set("rs-choices", choices);
        }, 0);
        return;
      }
      var n = e.target.closest && e.target.closest("[data-near]");
      if (n) {
        e.preventDefault();
        var d = NEAR[Number(n.getAttribute("data-near"))];
        if (d) nearbyModal(d.a, d.city, d.label);
        return;
      }
      var r = e.target.closest && e.target.closest("[data-route]");
      if (r) {
        e.preventDefault();
        var park = null;
        PARKS.forEach(function (p) { if (p.id === r.getAttribute("data-route")) park = p; });
        if (park && park.route) routeModal(park);
      }
    });

    $("#city-tabs").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-city]");
      if (!b) return;
      var code = b.getAttribute("data-city");
      $$("#city-tabs button").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      $$(".city-panel").forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-city") === code); });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ── init ── */

  function init() {
    setTheme(store.get("rs-theme", TRIP.themeDefault || "pressbox"));
    renderReservas();
    renderDays();
    renderGames();
    renderCities();
    renderParks();
    renderChecklists();
    renderGuide();
    bind();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
