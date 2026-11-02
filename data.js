/* RUTA SUR — datos del viaje. Editad solo esta página para actualizar reservas. */

const TRIP = {
  title: "RUTA SUR",
  subtitle: "Dallas · Atlanta · Orlando · Miami",
  dates: "6 → 23 noviembre 2026",
  people: "Antonio + Ferran",
  nights: 17,
  themeDefault: "pressbox"
};

const RESERVAS = {
  note: "✎ Siguen pendientes: vuelta del 22 nov desde Miami y alojamiento de Miami. Todo lo demás ya está reservado.",
  vuelos: [
    { id: "v1", label: "Ida internacional", detail: "Vueling VLC→BCN 07:30–08:40 + IB4587 BCN→DFW 10:40–15:00", extra: "Vie 6 nov · llega a la Terminal D. Check-in del hotel 15:00 → partido 19:00: sin perder el tiempo." },
    { id: "v2", label: "Dallas → Atlanta", detail: "Delta DL961 · DFW 12:23 → ATL 15:26", extra: "Lun 9 nov · 3h de vuelo: llegáis 3,5 h antes del partido. Margen de sobra." },
    { id: "v3", label: "Vuelta internacional", detail: "pendiente", extra: "dom 22 nov desde Miami (MIA) · llegada 23 nov" }
  ],
  hoteles: [
    { city: "DAL", dates: "6–9 nov (3 noches)", detail: "Magnolia Hotel Downtown Dallas", extra: "1401 Commerce St (Main St District). AAC a 1,2 mi / 25 min andando. Check-in 15:00, check-out 11:00." },
    { city: "ATL", dates: "9–16 nov (7 noches)", detail: "Designer 1BR Loft · Altitude", extra: "250 Piedmont Ave NE, junto a la estación MARTA Peachtree Center. Cocina: la compra de la semana sale aquí." },
    { city: "ORL", dates: "16–20 nov (4 noches)", detail: "The Point Hotel & Suites", extra: "7389 Universal Blvd. Suites con cocina. Islas de Aventura 5 min · Epic 9 min · Disney 12 min." },
    { city: "MIA", dates: "20–22 nov (2 noches)", detail: "pendiente", extra: "" }
  ],
  coche: {
    label: "Coche de alquiler",
    detail: "Recogida ATL 16 nov → devolución MIA 22 nov",
    extra: "Confirmar: recogida en el aeropuerto ATL, devolución en MIA (tram al centro de alquileres, dar 2h antes del vuelo)"
  },
  entradas: [
    { label: "Mavericks ×2", detail: "vie 6 + dom 8 nov, AAC", extra: "guardar PDFs/billetera" },
    { label: "Stars", detail: "sáb 7 nov, AAC", extra: "" },
    { label: "Hawks vs Lakers", detail: "lun 9 nov, State Farm Arena", extra: "" },
    { label: "Falcons vs Chiefs", detail: "dom 15 nov, 13:00, Mercedes-Benz", extra: "" },
    { label: "MagicCon", detail: "badge de Ferran, 13–15 nov", extra: "" }
  ]
};

/* ═══════════════ DÍAS — propuestas flexibles ═══════════════
   Cada tramo tiene bloques (mañana/tarde/noche) con VARIAS opciones.
   El badge "FIJO" marca lo que no se mueve (partidos, vuelos). */

const DAYS = [
  {
    id: "nov6", date: "2026-11-06", day: "VIE", city: "DAL", cityLabel: "Dallas",
    weather: { hi: 21, lo: 8, note: "Noche fresca" },
    fixed: [
      { time: "tarde/noche", title: "Partido: Mavericks vs Utah Jazz", meta: "19:00 CST · American Airlines Center", price: "entrada ya comprada", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Llegada a Dallas",
        options: [
          { title: "Aterrizar + check-in", desc: "Magnolia Hotel, 1401 Commerce St (check-in desde 15:00). Dejad las maletas: el AAC está a 1,2 mi — 25 min andando o 8 min en coche. Si aún no podéis entrar, guardan equipaje.", tag: "logística" },
          { title: "Si llegáis pronto: Klyde Warren Park", desc: "Parque urbano sobre la autopista, food trucks y ambiente local. A 0,9 mi del hotel (18 min andando). Gratis.", tag: "relax", maps: "Klyde Warren Park, 2012 Woodall Rodgers Fwy, Dallas, TX" }
        ]
      },
      {
        slot: "tarde", title: "Primera toma de contacto",
        options: [
          { title: "Paseo por el Arts District + el skyline", desc: "Desde Klyde Warren hacia el Nasher Sculpture Center y las fachadas del centro. Foto obligada con la Reunion Tower al fondo.", tag: "turístico", maps: "Nasher Sculpture Center, 2001 Flora St, Dallas, TX" },
          { title: "Dallas Farmers Market (The Shed)", desc: "Mercado real con puestos locales + el food hall. Hurtado BBQ dentro si aún no os habéis hartado de carne.", tag: "auténtico", price: "entrada gratis, comida aparte", maps: "Dallas Farmers Market, 920 S Harwood St, Dallas, TX" },
          { title: "Dealey Plaza + JFK Memorial", desc: "El sitio del atentado a JFK. El Sixth Floor Museum cierra lun-mar (hoy viernes está abierto 10–17).", tag: "turístico", price: "museo $24 online / $27 taquilla", maps: "Dealey Plaza, Dallas" }
        ]
      },
      {
        slot: "noche", title: "Partido + after",
        options: [
          { title: "Mavericks vs Jazz (FIJO)", desc: "Puertas ~1h antes. NBA Cup. El AAC está al lado de Victory Park: cena previa o posterior en la zona sin desplazarse.", tag: "evento", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX" },
          { title: "After casual en Victory Park", desc: "Tras el partido el barrio se llena de gente de equipo. Sin apretar: si hay mucha cola, Uber al alojamiento.", tag: "noche" }
        ]
      }
    ]
  },
  {
    id: "nov7", date: "2026-11-07", day: "SÁB", city: "DAL", cityLabel: "Dallas",
    weather: { hi: 22, lo: 9, note: "" },
    fixed: [
      { time: "noche", title: "Partido: Dallas Stars vs San José Sharks", meta: "19:00 CST · American Airlines Center", price: "entrada ya comprada", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Apple Store + barrio elegante",
        options: [
          { title: "★ Apple Knox Street (recomendado)", desc: "3101 Knox St — a 3 mi del Magnolia Hotel (10 min en coche). Calle comercial peatonal con boutiques y cafés: da para pasear antes y después. Abre 10:00 (lun–sáb hasta las 20:00). NorthPark está a 7 mi.", tag: "compromiso", price: "tienda gratis, el bolsillo verá", maps: "Apple Store Knox Street, 3101 Knox St, Dallas, TX" },
          { title: "Apple NorthPark Center", desc: "8687 N Central Expy — a 7 mi del hotel (~15 min). El mejor centro comercial de Dallas (arte público, Zara, Nordstrom). Abre 10:00. Se combina con el shopping, no con el barrio.", tag: "compromiso", maps: "Apple NorthPark Center, 8687 N Central Expy, Dallas, TX" },
          { title: "Knox/Henderson a pie tras la tienda", desc: "Cafés y tiendas locales. Encaja con un brunch tranquilo antes de bajar a Deep Ellum.", tag: "auténtico", maps: "Knox St & Henderson Ave, Dallas, TX" }
        ]
      },
      {
        slot: "tarde", title: "Deep Ellum: BBQ y murales",
        options: [
          { title: "★ Pecan Lounge → Pecan Lodge", desc: "2702 Main St. El referente BBQ de Dallas: brisket con corteza de pimienta y el mítico 'Hot Mess' de boniato. Plato 1 carne $24 · 2 carnes $27 · 3 carnes $30. HACER COLA — merece la pena. A vuestra hora de comer (14:00) la cola rueda mucho mejor que al pico americano (12:00–13:00).", tag: "auténtico", price: "$20–30/persona", hours: "11:00–22:00 sáb · lunes solo 11:00–15:00", maps: "Pecan Lodge, 2702 Main St, Dallas, TX" },
          { title: "Terry Black's Barbecue", desc: "3025 Main St. Recomendado por la Guía Michelin, segunda generación de Lockhart. Si Pecan Lodge tiene cola eterna, esta es la alternativa seria. Sándwich $16–18, plato 2 carnes $25–40, costilla de buey gigante ~$38 (rango real $16–70).", tag: "auténtico", price: "$16–70/persona", hours: "11:00–21:30 · vie/sáb hasta 22:00", maps: "Terry Black's Barbecue, 3025 Main St, Dallas, TX" },
          { title: "Ruta de murales + Blues Alley", desc: "Caminar Main, Elm y Commerce: los murales de Deep Ellum y la escultura Traveling Man. Gratis. Todo muy cerca de los dos BBQ.", tag: "turístico", price: "gratis", maps: "Deep Ellum, Main St, Dallas, TX" },
          { title: "AllGood Café", desc: "2934 Main St. Hamburger clásica de Dallas y desayunos hasta las 15:00. El sitio al que van los vecinos, no los turistas.", tag: "auténtico", price: "$12–18", maps: "AllGood Café, 2934 Main St, Dallas, TX" }
        ]
      },
      {
        slot: "noche", title: "Partido + Deep Ellum de noche",
        options: [
          { title: "Stars vs Sharks (FIJO)", desc: "Hockey en el mismo sitio que anoche. El ambiente NHL es más ruidoso y cervecero que el NBA.", tag: "evento", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX" },
          { title: "Después: dive bars de Deep Ellum", desc: "Adair's Saloon (country, desde 1954) o Sons of Herman Hall (el bar más antiguo de Dallas, raíces 1910). OJO: viernes/sábado tras las 23h Deep Ellum se pone complicado — Uber de punto a punto, nunca a pie de lejos.", tag: "noche", maps: "Adair's Saloon, 2726 Main St, Dallas, TX" }
        ]
      }
    ]
  },
  {
    id: "nov8", date: "2026-11-08", day: "DOM", city: "DAL", cityLabel: "Dallas",
    weather: { hi: 20, lo: 7, note: "" },
    fixed: [
      { time: "noche", title: "Partido: Mavericks vs Brooklyn Nets", meta: "18:30 CST · American Airlines Center", price: "entrada ya comprada", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Downtown Dallas a fondo",
        options: [
          { title: "★ Sixth Floor Museum (JFK)", desc: "411 Elm St. Domingo abierto 10–17 (CERRADO lun–mar). IMPRESCINDIBLE aunque no seáis museales: la planta sexta es donde Oswald esperó. Comprad online, hay cola.", tag: "turístico", price: "$27 adulto (online)", hours: "10:00–17:00 · cerrado lun–mar", ticket: "https://tickets.jfk.org/webstore/landingpage?CG=OT&C=GA", maps: "The Sixth Floor Museum at Dealey Plaza, 411 Elm St, Dallas, TX" },
          { title: "Reunion Tower GeO-Deck", desc: "300 Reunion Blvd. Vistas 360° a 143 m. El ticket 'Day + Night' ($24–40) os deja volver de noche en 24h: la mejor foto es al anochecer.", tag: "turístico", price: "$23–40", ticket: "https://www.reuniontowertexas.com/", maps: "Reunion Tower, 300 Reunion Blvd, Dallas, TX" },
          { title: "Perot Museum of Nature and Science", desc: "2201 N Field St. Ciencia grande, dinosaurios y azotea. Buen plan si llueve. ~$20.", tag: "turístico", price: "~$20", ticket: "https://www.perotmuseum.org/visit/tickets/", maps: "Perot Museum of Nature and Science, 2201 N Field St, Dallas, TX" }
        ]
      },
      {
        slot: "tarde", title: "Opción relajada o shopping",
        options: [
          { title: "Bishop Arts District", desc: "Barrio bohemio al sur del centro: tiendas independientes, Lockhart Smokehouse (BBQ otra vez, pero esta es la de barrio) y cafés. Auténtico, sin turistas de guía.", tag: "auténtico", price: "gratis + comida", maps: "Bishop Arts District, Dallas" },
          { title: "Lower Greenville", desc: "Calle de patios, brunch y vida vecinal. Ships Lounge (dive desde 1947) si queréis copa barata y cero postureo.", tag: "auténtico", maps: "Lower Greenville Ave, Dallas" },
          { title: "Últimas compras antes de volar", desc: "Texas no tiene state income tax pero sí sales tax (~8.25%). Si compráis electrónica, el tax se paga igual.", tag: "logística" }
        ]
      },
      {
        slot: "noche", title: "Último partido en Dallas",
        options: [
          { title: "Mavericks vs Nets (FIJO)", desc: "18:30, antes que los demás: si cenáis después aún tenéis Deep Ellum abierto (hasta las 2am).", tag: "evento", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX" },
          { title: "Cena BBQ de despedida", desc: "Si el sábado no entrastéis en Pecan Lodge, esta es la última oportunidad: cierran dom 21:00.", tag: "auténtico", maps: "Pecan Lodge, 2702 Main St, Dallas, TX" }
        ]
      }
    ]
  },
  {
    id: "nov9", date: "2026-11-09", day: "LUN", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 19, lo: 9, note: "Llegada al sur" },
    fixed: [
      { time: "mañana", title: "Vuelo Dallas → Atlanta", meta: "Delta DL961 · DFW 12:23 → ATL 15:26", price: "", extra: "Llegada 15:26 — 3,5 h de margen antes del partido de las 19:00" },
      { time: "tarde/noche", title: "Partido: Hawks vs Los Angeles Lakers", meta: "19:00 EST · State Farm Arena (downtown)", price: "entrada ya comprada", maps: "State Farm Arena, 1 State Farm Dr NW, Atlanta, GA" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Traslado",
        options: [
          { title: "Vuelo + MARTA hasta la puerta del loft", desc: "El tren MARTA sale de la terminal de llegadas: bajad en Peachtree Center y a 8 min andando estáis en 250 Piedmont Ave. Sin coche todavía y sin tráfico.", tag: "logística", price: "$2.50", maps: "Peachtree Center Station, Atlanta" },
          { title: "Uber/Lyft al alojamiento", desc: "$25–40 hasta el centro. El tráfico de entrada a ATL a media tarde es denso; el MARTA gana.", tag: "logística", price: "$25–40", maps: "250 Piedmont Ave NE, Atlanta" }
        ]
      },
      {
        slot: "tarde", title: "Check-in + pre-partido",
        options: [
          { title: "Reconocer el barrio del loft", desc: "250 Piedmont Ave NE está en Peachtree Center, al borde de downtown: bajad a por la primera compra al Publix de Piedmont (media milla) y mirad hasta dónde llegáis andando. Os ahorraréis sustos de orientación mañana.", tag: "logística", maps: "250 Piedmont Ave NE, Atlanta" },
          { title: "Cena temprana cerca del State Farm Arena", desc: "Downtown está a 20–25 min andando del loft o 2 paradas en MARTA. El arena está pegado al Centennial Olympic Park y a la Georgia World Congress Center (¡la de MagicCon!).", tag: "turístico", maps: "State Farm Arena, 1 State Farm Dr NW, Atlanta, GA" }
        ]
      },
      {
        slot: "noche", title: "Partido + noche tranquila",
        options: [
          { title: "Hawks vs Lakers (FIJO)", desc: "Lakers = partido grande. State Farm Arena es céntrico y moderno. Llegad 45 min antes: seguridad + cola de acceso.", tag: "evento", maps: "State Farm Arena, 1 State Farm Dr NW, Atlanta, GA" },
          { title: "After por downtown", desc: "Si os quedáis por la zona, el Centennial Olympic Park iluminado es un buen cierre. Nada épico: mañana hay día completo.", tag: "relax", maps: "Centennial Olympic Park, Atlanta, GA" }
        ]
      }
    ]
  },
  {
    id: "nov10", date: "2026-11-10", day: "MAR", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 18, lo: 8, note: "" },
    fixed: [],
    blocks: [
      {
        slot: "mañana", title: "Los dos íconos de Atlanta (combo)",
        options: [
          { title: "★ Georgia Aquarium + World of Coca-Cola", desc: "Combo oficial $79.99 + impuestos los dos (ahorro ~$15). Están uno al lado del otro en Pemberton Place. El acuario tiene tiburones ballena; Coca-Cola incluye cata de bebidas de todo el mundo. Contad 2–3h + 2h. El acuario es mejor POR LA TARDE: los grupos escolares se van a las 14:00 (hora vuestra de entrar).", tag: "turístico", price: "$79.99 combo", hours: "10:00–17:00 (cotejar)", ticket: "https://www.georgiaaquarium.org/tickets/", maps: "Georgia Aquarium, 225 Baker St NW, Atlanta, GA" },
          { title: "Atlanta CityPASS", desc: "$106 + impuestos: 5 atracciones (incluye Aquarium y Coca-Cola) en 9 días, sin blackout. Solo compensa si haríais 4–5 pagadas.", tag: "turístico", price: "$106", ticket: "https://www.citypass.com/atlanta", maps: "Georgia Aquarium, 225 Baker St NW, Atlanta, GA" }
        ]
      },
      {
        slot: "tarde", title: "Cultura civil + parque",
        options: [
          { title: "National Center for Civil and Human Rights", desc: "100 Ivan Allen Jr Blvd. Justo al lado del acuario. El mejor museo de Atlanta para entender el movimiento por los derechos civiles. ~$20.", tag: "turístico", price: "~$20", ticket: "https://civilrightsmuseum.org/visit/", maps: "National Center for Civil and Human Rights, 100 Ivan Allen Jr Blvd NW, Atlanta, GA" },
          { title: "Centennial Olympic Park (gratis)", desc: "El parque de las Olimpiadas del 96, con la fuente interactiva. Punto de encuentro de todo downtown.", tag: "relax", price: "gratis", maps: "Centennial Olympic Park, Atlanta, GA" },
          { title: "CNN Center Tour", desc: "Estudio de noticias en directo. Horarios variables desde 2024 — mirad web el mismo día.", tag: "turístico", maps: "CNN Center, 1 CNN Center, Atlanta, GA" }
        ]
      },
      {
        slot: "noche", title: "Cena de barrio",
        options: [
          { title: "Krog Street Market", desc: "99 Krog St NE. Food hall en una fábrica de ladrillo del siglo XIX, junto al BeltLine. Spiller Park Coffee, King of Pops, opciones para todos. Lo que hacen los vecinos de Inman Park.", tag: "auténtico", price: "$15–25", maps: "Krog Street Market, 99 Krog St NE, Atlanta, GA" },
          { title: "Ponce City Market", desc: "675 Ponce De Leon Ave NE. Antiguo Sears convertido: rooftop con juegos, tiendas y food hall. Ir al atardecer tiene magia.", tag: "auténtico", price: "$15–25", maps: "Ponce City Market, 675 Ponce De Leon Ave NE, Atlanta, GA" },
          { title: "Mary Mac's Tea Room", desc: "224 Ponce De Leon Ave. Southern food clásico desde 1945 — la carta de aperitivos 'Southern Pantry' es un ritual. Reserva si podéis.", tag: "auténtico", price: "$20–30", maps: "Mary Mac's Tea Room, 224 Ponce De Leon Ave NE, Atlanta, GA" }
        ]
      }
    ]
  },
  {
    id: "nov11", date: "2026-11-11", day: "MIÉ", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 19, lo: 9, note: "" },
    fixed: [],
    blocks: [
      {
        slot: "mañana", title: "Historia real (gratis)",
        options: [
          { title: "★ Martin Luther King Jr. Historic Site", desc: "450 Auburn Ave NE. GRATIS: la iglesia Ebenezer Baptist donde predicó, su casa de la infancia y el King Center con la tumba. Es el Atlanta que importa. Martes cerrado — hoy miércoles abre.", tag: "auténtico", price: "gratis", maps: "Martin Luther King Jr. National Historical Park" },
          { title: "Sweet Auburn a pie", desc: "El barrio histórico alrededor de Auburn Ave: murales, panaderías históricas, la Farmhouse Kitchen & Grill para soul food.", tag: "auténtico", maps: "Sweet Auburn, Atlanta" }
        ]
      },
      {
        slot: "tarde", title: "BeltLine + vida local",
        options: [
          { title: "★ BeltLine Eastside Trail", desc: "El antiguo anillo ferroviario convertido en paseo: patinetes, bicis, murales y gente paseando perros. Entrad por Krog Street y subid hacia Ponce. GRATIS.", tag: "auténtico", price: "gratis", maps: "Atlanta BeltLine Eastside Trail" },
          { title: "Little Five Points", desc: "El barrio 'counter-culture' de Atlanta: The Vortex (burgers gigantes con doble entrada), tiendas de discos y teatro de improvisación. Auténtico y divertido.", tag: "auténtico", price: "$15–20", maps: "Little Five Points, Atlanta" },
          { title: "Piedmont Park + Botanical Garden", desc: "El Central Park atlantino. El jardín botánico cobra ~$25 y tiene orquídeas y canopy walk.", tag: "relax", price: "park gratis / jardín ~$25", maps: "Piedmont Park, Atlanta" }
        ]
      },
      {
        slot: "noche", title: "Buford Highway — la joya escondida",
        options: [
          { title: "★ Food crawl por Buford Highway", desc: "NO es una calle bonita: es una avenida suburbana con la mejor escena inmigrante del sureste. Dim sum, vietnamita, coreano, mexicano, indio, a precios de vecindario. Ejemplos: Canton House (dim sum), Lan Zang (fideos), Nam Phuong (vietnamita). Coche o Uber obligatorio.", tag: "auténtico", price: "$12–20", maps: "Buford Highway, Chamblee" },
          { title: "Busy Bee Café", desc: "810 Peeples St SW. Soul food desde 1947: pollo frito, collard greens, mac & cheese. Obama comió aquí. WEST END — de día perfecto, de noche Uber directo.", tag: "auténtico", price: "$15–22", maps: "Busy Bee Café, 810 Peeples St SW, Atlanta, GA" }
        ]
      }
    ]
  },
  {
    id: "nov12", date: "2026-11-12", day: "JUE", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 20, lo: 10, note: "" },
    fixed: [],
    blocks: [
      {
        slot: "mañana", title: "Opción museo o naturaleza",
        options: [
          { title: "Atlanta Botanical Garden", desc: "1345 Piedmont Ave NE. Canopy walk entre los árboles y jardines temáticos. ~$25. Jueves menos concurrido.", tag: "relax", price: "~$25", maps: "Atlanta Botanical Garden, 1345 Piedmont Ave NE, Atlanta, GA" },
          { title: "Jimmy Carter Presidential Library", desc: "441 Freedom Pkwy NE. Gratis: historia de la presidencia y del Cártel de Camp David. Sorprendentemente bueno.", tag: "turístico", price: "gratis", maps: "Jimmy Carter Presidential Library, 441 Freedom Pkwy NE, Atlanta, GA" },
          { title: "Zoo Atlanta", desc: "1300 Check N Dr NW. Pandas históricas (la familia llega a fin de año) y gorilas. ~$25.", tag: "turístico", price: "~$25", maps: "Zoo Atlanta, 1300 Check N Dr NW, Atlanta, GA" }
        ]
      },
      {
        slot: "tarde", title: "West Midtown: lo cool post-industrial",
        options: [
          { title: "The Works / Westside Provisions District", desc: "Antiguas fábricas convertidas en tiendas de diseño, cervecerías y restaurantes de chef. El brunch de domingo es lo local — hoy jueves está más tranquilo.", tag: "auténtico", maps: "The Works, 1295 Howell Mill Rd, Atlanta, GA" },
          { title: "Escena cervecera", desc: "Scofflaw (IPA), Monday Night Brewing, Second Self: todas con taproom y comida food-truck. $6–8 la pinta.", tag: "auténtico", price: "$6–8/pinta", maps: "Monday Night Brewing, 670 Trabert Ave NW, Atlanta, GA" }
        ]
      },
      {
        slot: "noche", title: "Última noche tranquila",
        options: [
          { title: "Fox Theater", desc: "660 Peachtree St NE. Si hay concierto u obra: el interior es un palacio mogol de 1929. Merece aunque no entréis.", tag: "turístico", maps: "Fox Theatre, 660 Peachtree St NE, Atlanta, GA" },
          { title: "Midtown rooftop + cocktail", desc: "El barrio con más vida nocturna 'normal' y mejor iluminado para pasear tras la copa.", tag: "noche", maps: "Midtown, Atlanta" }
        ]
      }
    ]
  },
  {
    id: "nov13", date: "2026-11-13", day: "VIE", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 20, lo: 10, note: "MagicCon empieza" },
    fixed: [
      { time: "todo el día", title: "✦ Ferran: MagicCon Atlanta (día 1)", meta: "Georgia World Congress Center, Building C · 10:00–19:00", price: "badge ya comprado", maps: "Georgia World Congress Center, 285 Andrew Young International Blvd NW" }
    ],
    blocks: [
      {
        slot: "mañana/tarde", title: "ANTONIO — día solo (elige tu aventura)",
        options: [
          { title: "★ Ruta 'Atlanta auténtico' completa", desc: "Mañana MLK site + Sweet Auburn → mediodía comida soul en Busy Bee → tarde BeltLine + Ponce City Market → cena Buford Highway. Todo en Uber/MARTA, sin coche.", tag: "auténtico", maps: "Martin Luther King Jr. National Historical Park" },
          { title: "★ Opción deportiva: Georgia Tech campus", desc: "Bobby Dodd Stadium (casa de los Yellow Jackets, campus abierto y bonito) + el barrio de Midtown alrededor. El estadio de fútbol americano universitario vacío tiene magia.", tag: "deporte", maps: "Bobby Dodd Stadium, 150 Bobby Dodd Way NW, Atlanta, GA" },
          { title: "Starlight Drive-In (si apetece lo rural)", desc: "Cine al aire libre clásico de Atlanta, en el sureste de la ciudad. Doble sesión desde ~$10. El plan más 'Estados Unidos profundo'. Solo coche/Uber largo.", tag: "auténtico", price: "~$10", maps: "Starlight Drive-In, 2000 Moreland Ave SE, Atlanta, GA" },
          { title: "Compañía de Ferran: merendar en GWCC", desc: "Si prefieres estar cerca del congreso para quedaros juntos a mediodía: el food court del CNN Center y el Centennial Olympic Park están a 5 min andando del pabellón.", tag: "relax", maps: "CNN Center, 1 CNN Center, Atlanta, GA" }
        ]
      },
      {
        slot: "noche", title: "Reunión",
        options: [
          { title: "Cena conjunta para contar historias", desc: "Krog Street Market o Ponce: sitio con variedad para que cada uno pida lo suyo.", tag: "auténtico", maps: "Krog Street Market, 99 Krog St NE, Atlanta, GA" },
          { title: "Edgewood Avenue", desc: "La calle de bares con más personalidad del centro: Joystick Gamebar, Royal American (rock), Nook on Auburn. Auténtico ATL.", tag: "noche", maps: "Edgewood Ave NE, Atlanta" }
        ]
      }
    ]
  },
  {
    id: "nov14", date: "2026-11-14", day: "SÁB", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 21, lo: 11, note: "MagicCon día 2" },
    fixed: [
      { time: "todo el día", title: "✦ Ferran: MagicCon Atlanta (día 2)", meta: "10:00–19:00 · World Championship 32 en marcha", price: "", maps: "Georgia World Congress Center, 285 Andrew Young International Blvd NW, Atlanta, GA" }
    ],
    blocks: [
      {
        slot: "mañana", title: "ANTONIO — mañana",
        options: [
          { title: "Brunch de verdad: Atlanta Breakfast Club", desc: "265 Central Ave SW. Pancakes de antología y soul breakfast. Cola típica de sábado: id temprano o reservad.", tag: "auténtico", price: "$15–20", maps: "Atlanta Breakfast Club, 265 Central Ave SW, Atlanta, GA" },
          { title: "Ponce City Market de día", desc: "Los patinetes del BeltLine, la tienda de Records, el rooftop (si está abierto, juegos pag aparte).", tag: "auténtico", maps: "Ponce City Market, 675 Ponce De Leon Ave NE, Atlanta, GA" }
        ]
      },
      {
        slot: "tarde", title: "ANTONIO — tarde",
        options: [
          { title: "Decatur", desc: "Pueblo vecino con el mejor downtown peatonal de la zona: librerías, heladería, pubs irlandeses y el vibe de 'no soy turista'.", tag: "auténtico", maps: "Decatur, GA" },
          { title: "Swan Coach House / Azalea District", desc: "Jardines y tiendas del sur adinerado — otra cara de Atlanta, muy distinta a downtown.", tag: "turístico", maps: "Swan Coach House, 3110 Commerce Cir, Atlanta, GA" },
          { title: "Cinema: Plaza Theatre", desc: "1049 Ponce De Leon Ave. Cine histórico del 40 con sesiones de clásicos y conciertos.", tag: "relax", price: "~$12", maps: "Plaza Theatre, 1049 Ponce De Leon Ave NE, Atlanta, GA" }
        ]
      },
      {
        slot: "noche", title: "Reunión",
        options: [
          { title: "Salsa o rock en Edgewood", desc: "Sábado por la noche en ATL: elegid vuestro extremo.", tag: "noche", maps: "Edgewood Ave NE, Atlanta, GA" },
          { title: "Cena de despedida a lo grande", desc: "South City Kitchen (southern moderno, ~$30/persona) o Banshee (east side, la favorita de los foodies locales).", tag: "auténtico", price: "$25–40", maps: "South City Kitchen Midtown" }
        ]
      }
    ]
  },
  {
    id: "nov15", date: "2026-11-15", day: "DOM", city: "ATL", cityLabel: "Atlanta",
    weather: { hi: 20, lo: 10, note: "" },
    fixed: [
      { time: "13:00", title: "Partido: Atlanta Falcons vs Kansas City Chiefs", meta: "13:00 EST · Mercedes-Benz Stadium", price: "entrada ya comprada", maps: "Mercedes-Benz Stadium, 1 AMB Dr NW, Atlanta, GA" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Pre-partido",
        options: [
          { title: "Tailgate / ambiente de estadio", desc: "Los Falcons reciben a los Chiefs: partido atractivo. Llegad 1.5h antes: el Mercedes-Benz tiene techo retráctil y el halo board más grande del mundo.", tag: "evento", maps: "Mercedes-Benz Stadium, 1 AMB Dr NW, Atlanta, GA" },
          { title: "MagicCon día 3 para Ferran (opcional)", desc: "Cierra 18:00 — si el badge incluye domingo, da para media mañana de compra de cards antes del partido.", tag: "evento", maps: "Georgia World Congress Center, 285 Andrew Young International Blvd NW, Atlanta, GA" }
        ]
      },
      {
        slot: "tarde", title: "Tras el partido (~16:30)",
        options: [
          { title: "Mercedes-Benz Stadium Tour", desc: "Si os quedáis: tour guiado por el estadio de los Falcons y Atlanta United (MLS). ~$25. Verificad horarios el mismo día.", tag: "deporte", price: "~$25", maps: "Mercedes-Benz Stadium, 1 AMB Dr NW, Atlanta, GA" },
          { title: "Regreso a casa a descansar", desc: "Mañana hay que conducir a Orlando: cena ligera y cero despedidas épicas.", tag: "logística" }
        ]
      },
      {
        slot: "noche", title: "Tranquilidad",
        options: [
          { title: "Compra para el viaje de mañana", desc: "Publix o Kroger: agua, snacks para el coche y lo que queráis para el alojamiento de Orlando.", tag: "logística", maps: "Publix, Atlanta" }
        ]
      }
    ]
  },
  {
    id: "nov16", date: "2026-11-16", day: "LUN", city: "ORL", cityLabel: "Orlando",
    weather: { hi: 27, lo: 17, note: "¡Calor de Florida!" },
    fixed: [
      { time: "mañana", title: "Recogida del coche de alquiler", meta: "Confirmar punto (¿aeropuerto ATL o ciudad?)", price: "", extra: "Revisar: seguro, gasolina, peajes (SunPass/E-Pass), GPS del móvil" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Ruta Atlanta → Orlando",
        options: [
          { title: "★ I-75 Sur → Florida Turnpike", desc: "~6h30. La clásica: autopistas enormes, paradas de descanso cada 100 km, gasolineras con Wings. Peaje Turnpike ~$15–20 (pagad con tarjeta o SunPass).", tag: "ruta", price: "~$15–20 peaje", maps: "I-75 S to Florida Turnpike" },
          { title: "I-95 Sur (por la costa)", desc: "Más larga (~7h) pero pasa por Savannah (parada fantástica si os sobra el día: el centro histórico colonial es precioso).", tag: "ruta", maps: "I-95 S" }
        ]
      },
      {
        slot: "tarde", title: "Llegada a Orlando",
        options: [
          { title: "Check-in + descarga", desc: "The Point Hotel & Suites, 7389 Universal Blvd (check-in 16:00): suites con cocina y parking. Dejad las maletas — a 1,3 mi estáis en Islas de Aventura, a 2,9 mi en Epic y a 7 mi en Disney.", tag: "logística", maps: "The Point Hotel & Suites, 7389 Universal Blvd, Orlando" },
          { title: "Compra express en Target/Walmart", desc: "Agua, fruta, snacks para los días de parque (los precios dentro son salvajes).", tag: "logística", maps: "Target, Orlando" }
        ]
      },
      {
        slot: "noche", title: "Cena relajada",
        options: [
          { title: "International Drive — primera noche fácil", desc: "A 1,8 mi del hotel (5 min en coche). Teak (pan-asiático local), Hash House A Go Go (porciones absurdas) o un food court cualquiera. Sin compromiso.", tag: "turístico", maps: "International Drive, Orlando" },
          { title: "Winter Park (si queréis algo bonito)", desc: "Barrio encantador a 20 min: Park Avenue con tiendas, Park Winter Park y restaurantes de verdad. El antídoto contra I-Drive.", tag: "auténtico", maps: "Park Avenue, Winter Park" }
        ]
      }
    ]
  },
  {
    id: "nov17", date: "2026-11-17", day: "MAR", city: "ORL", cityLabel: "Orlando",
    weather: { hi: 27, lo: 17, note: "" },
    fixed: [
      { time: "todo el día", title: "Disney's Hollywood Studios", meta: "abre ~09:00, cierra ~20:00 en nov (confirmar en app MDE) · ~15 min en coche desde The Point", price: "entrada base ~$119+", ticket: "https://disneyworld.disney.go.com/admission/tickets/", maps: "Disney's Hollywood Studios, 3510 Park Ave, Lake Buena Vista, FL" }
    ],
    blocks: [
      {
        slot: "estrategia", title: "Cómo sobrevivir al día",
        options: [
          { title: "★ Lightning Lane Multi Pass", desc: "Disney cobra por saltar colas: compradlo en la app MDE desde España (se puede hacer con hora España). Sin esto, Galaxy's Edge y Slinky Dog pueden superar 90 min.", tag: "estrategia", price: "varía por día, típico $25–40/persona" },
          { title: "Prioridad de atracciones", desc: "1) Rise of the Resistance (Star Wars, la mejor del parque) 2) Mickey & Minnie's Runaway Railway 3) Slinky Dog Dash 4) Tower of Terror 5) Toy Story Mania", tag: "estrategia" },
          { title: "★ Rise of la Resistance: cuándo compensa", desc: "Sin Lightning Lane: subid ~11:00, que es cuando baja tras la primera hora embestida. Aún mejor, la última hora y media: los 30 minutos finales del día son los más cortos de todo el parque. OJO: desde las 18:00 Disney infla los tiempos publicados — el reloj miente, la cola no.", tag: "estrategia" },
          { title: "Abrir el parque con los de atrás", desc: "Llegad a la hora de apertura real (no 30 min tarde): las primeras 90 min rinden el doble que el resto del día.", tag: "estrategia" }
        ]
      },
      {
        slot: "comida", title: "Dentro del parque",
        options: [
          { title: "Docking Bay 7 (Star Wars)", desc: "Comida 'galáctica' sorprendentemente buena para parque. Opciones vegetarianas decentes.", tag: "turístico", price: "$15–20" },
          { title: "BaseLine Tap House", desc: "Cervezas de Florida y pretzel gigante, patio con sombra. La parada de rescate a media tarde.", tag: "relax", price: "$10–15" }
        ]
      }
    ]
  },
  {
    id: "nov18", date: "2026-11-18", day: "MIÉ", city: "ORL", cityLabel: "Orlando",
    weather: { hi: 27, lo: 16, note: "" },
    fixed: [
      { time: "todo el día", title: "Universal's Islands of Adventure", meta: "abre ~09:00, cierra ~20:00 (nov) · 1,3 mi / 5 min desde The Point · OJO: Jurassic Park River Adventure CERRADO por reforma hasta ~diciembre", price: "entrada base ~$125+", ticket: "https://www.universalorlando.com/web/en/us/tickets", maps: "Universal's Islands of Adventure, 6000 Universal Blvd, Orlando, FL" }
    ],
    blocks: [
      {
        slot: "estrategia", title: "Cómo atacar IOA",
        options: [
          { title: "★ Orden de atracciones", desc: "1) Hagrid's en cuanto abráis: es la cola más larga del resort (90–120 min en pico) 2) VelociCoaster antes de las 11:00 3) Forbidden Journey (Hogwarts) 4) Hulk y Spider-Man a media tarde, cuando el resto está en Potter. Si Hagrid supera los 90: single rider.", tag: "estrategia" },
          { title: "★ Hagrid's: cuándo compensa de verdad", desc: "Early Entry 08:00 solo si dormís en hotel Universal (vosotros no: The Point no es partner). Sin eso, la apertura es ~75–80 min y luego se queda en 55–65 todo el día: la franja más floja es hacia las 15:00. Y no la dejéis para el cierre, que se llena.", tag: "estrategia" },
          { title: "Express Pass: ¿vale?", desc: "IOA nov: desde ~$109–174/día. Solo merece si vais un sábado o no toleráis colas. Con estrategia (apertura + Hagrid primero) se puede sin él.", tag: "estrategia", price: "$109–174" },
          { title: "Isla de los Cerditos / Hogsmeade", desc: "Zona Harry Potter: Butterbeer (obligatorio), wand experience y Hogwarts Express (requiere park-to-park, no lo tenéis en ticket base).", tag: "turístico", price: "Butterbeer ~$8" }
        ]
      },
      {
        slot: "comida", title: "Comer dentro",
        options: [
          { title: "Three Broomsticks", desc: "Comida británica tematizada en Hogsmeade. Mejor que la media de parque.", tag: "turístico", price: "$15–20" },
          { title: "Churreria / food stands", desc: "Cuando hay cola larga, los stands salvan el día: chicken fingers y nachos gigantes.", tag: "turístico", price: "$10–15" }
        ]
      }
    ]
  },
  {
    id: "nov19", date: "2026-11-19", day: "JUE", city: "ORL", cityLabel: "Orlando",
    weather: { hi: 27, lo: 17, note: "" },
    fixed: [
      { time: "todo el día", title: "Universal Epic Universe (el parque nuevo)", meta: "abre ~10:00, cierra ~20:00 · 2,9 mi / 9 min desde The Point", price: "entrada ~$135+", ticket: "https://www.universalorlando.com/web/en/us/tickets", maps: "Universal Epic Universe, Orlando, FL" }
    ],
    blocks: [
      {
        slot: "estrategia", title: "Epic Universe en noviembre",
        options: [
          { title: "★ Orden de ataques", desc: "1) Mario Kart en la primera hora (20 min al abrir, ~80 dos horas después) 2) Mine-Cart Madness antes de las 12:00 3) Stardust Racers cuando toque sombra 4) Battle at the Ministry SIEMPRE al final del día. Nov media semana: esperas 30–50% por debajo del verano.", tag: "estrategia" },
          { title: "★ Los huecos reales (cuándo se pone feo)", desc: "Mine-Cart pico ~120 a media mañana y ~75 a las 18:00. Ministry cae desde las 18:00 y hace ~35 min en la última hora antes de las 20:00. Dark Universe no entra en Early Entry: primeros 60 min del día = su ventana. Stardust es fácil todo el día (media 15–20 min).", tag: "estrategia" },
          { title: "Express Pass Epic: ¿vale?", desc: "Desde ~$200/persona, puede llegar a $330 en picos. En noviembre entre semana, con apertura puntual, no hace falta. Gastad el dinero en la tienda.", tag: "estrategia", price: "$200–330" },
          { title: "Las 5 'worlds'", desc: "Super Nintendo World, Ministry of Magic (HP), How to Train Your Dragon, Dark Universe (monstruos clásicos) y Celestial Park (el centro con fuente). Caminad todas aunque solo montéis dos atracciones: la theming es el show.", tag: "turístico" }
        ]
      },
      {
        slot: "noche", title: "Cena fuera de los parques",
        options: [
          { title: "CityWalk (zona de bares Universal)", desc: "Sin entrada al parque: CityWalk tiene restaurantes y bares hasta tarde. Voodoo Doughnut para postre.", tag: "turístico", maps: "Universal CityWalk, Orlando, FL" },
          { title: "Cena en Dr. Phillips Boulevard", desc: "La 'restaurant row' de Orlando, 15 min del parque: opciones reales a precios menos turísticos.", tag: "auténtico", maps: "Dr Phillips Blvd, Orlando" }
        ]
      }
    ]
  },
  {
    id: "nov20", date: "2026-11-20", day: "VIE", city: "MIA", cityLabel: "Miami",
    weather: { hi: 28, lo: 21, note: "Tropical" },
    fixed: [
      { time: "mañana", title: "Conducir Orlando → Miami", meta: "~3h45 por I-95 Sur", price: "gasolina ~$25–35", maps: "I-95 S to Miami" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Ruta con paradas",
        options: [
          { title: "★ I-95 directo", desc: "3h45 sin paradas largas. Parada obligatoria en la última gasolinera antes de Miami: llenad el tanque y la nevera.", tag: "ruta", maps: "I-95 S" },
          { title: "Desvío: Kennedy Space Center", desc: "+1h cada sentido. El complejo de cohetes real: el Saturn V de 113 m y el simulador de lanzamiento. ~$75/persona. Solo si empezáis la ruta muy temprano.", tag: "desvío", price: "~$75", ticket: "https://www.kennedyspacecenter.com/info/tickets/", maps: "Kennedy Space Center, Merritt Island, FL" },
          { title: "Desvío: Cocoa Beach", desc: "+25 min. Playa y el Ron Jon Surf Shop icónico. Rápido, si el mar os llama más que los cohetes.", tag: "desvío", maps: "Cocoa Beach, FL" }
        ]
      },
      {
        slot: "tarde", title: "Llegada a Miami Beach",
        options: [
          { title: "Check-in + primer contacto con South Beach", desc: "Si el coche aún lo tenéis: aparcad (garaje de hotel o público ~$20–40/día). El tráfico de viernes a mediodía en el causeway es brutal: contad tiempo extra.", tag: "logística" },
          { title: "Primera vuelta por Ocean Drive", desc: "Los hoteles Art Deco de la A1A, los guardavidas de colores, Lummus Park. Foto con el cartel de South Beach.", tag: "turístico", maps: "Ocean Drive, Miami Beach" }
        ]
      },
      {
        slot: "noche", title: "Atardecer + primera noche",
        options: [
          { title: "★ Atardecer en South Pointe Park", desc: "El extremo sur de la isla: muelle, faro y aviones bajando sobre Government Cut. Gratis y siempre mágico.", tag: "auténtico", price: "gratis", maps: "South Pointe Park, Miami Beach" },
          { title: "Cena en Lincoln Road", desc: "Peatonal lleno de restaurantes: touristy pero agradable la primera noche. Prueban la comida cubana barata (ventanitas) si queréis algo rápido.", tag: "turístico", maps: "Lincoln Road, Miami Beach" },
          { title: "Copas en Collins Ave", desc: "El 'real Miami Beach': hoteles con terraza y barman de guante blanco. Más elegante que Ocean Drive.", tag: "noche", maps: "Collins Ave, Miami Beach" }
        ]
      }
    ]
  },
  {
    id: "nov21", date: "2026-11-21", day: "SÁB", city: "MIA", cityLabel: "Miami",
    weather: { hi: 28, lo: 21, note: "Último día entero" },
    fixed: [],
    blocks: [
      {
        slot: "mañana", title: "Wynwood (arte de calle)",
        options: [
          { title: "★ Wynwood Walls", desc: "2520 NW 2nd Ave. El museo al aire libre de murales: $16–20. Los murales de las calles alrededor son GRATIS y casi igual de buenos. Id por la mañana: la luz es mejor y hay menos gente.", tag: "turístico", price: "$16–20", hours: "10:00–18:00 (cotejar)", ticket: "https://wynwoodwalls.com/", maps: "Wynwood Walls, 2520 NW 2nd Ave, Miami, FL" },
          { title: "Café + mercadillo de Wynwood", desc: "Threefold Cafe o Per'La para el café, y si toca, el Wynwood Marketplace con artesanos.", tag: "auténtico", price: "$5–8 café", maps: "Wynwood, Miami" }
        ]
      },
      {
        slot: "tarde", title: "Little Havana — el alma cubana",
        options: [
          { title: "★ Calle Ocho a pie", desc: "De la 12th a la 17th Ave: tiendas de puros, murales, cafecito en ventanita (ventanilla de barra), el Máximo Gómez Park con los abuelos jugando dominó. Es una calle VIVA, no un set: sed respetuosos.", tag: "auténtico", price: "gratis + cafecito $2", maps: "Little Havana, Calle Ocho" },
          { title: "Sanguich de Miami", desc: "Cubano sandwich prensado perfecto: MICHELIN Bib Gourmand. La cola de mediodía se hace corta con el cafecito de al lado.", tag: "auténtico", price: "$12–16", maps: "Sanguich de Miami, 1250 SW 8th St, Miami, FL" },
          { title: "Versailles", desc: "1971, el restaurante cubano más famoso de Miami (y algo turístico, pero real). Ventanita de café siempre llena. Ideal para la cena si queréis el clásico.", tag: "turístico", price: "$18–28", maps: "Versailles Restaurant, 3555 SW 8th St, Miami, FL" },
          { title: "Azucar Ice Cream", desc: "Helados de frutas tropicales: mango con maracuyá, guayaba. Perfecto para el calor.", tag: "auténtico", price: "$5–7", maps: "Azucar Ice Cream, 1501 SW 8th St, Miami, FL" }
        ]
      },
      {
        slot: "noche", title: "★ SÁBADO: salsa night",
        options: [
          { title: "★ Ball & Chain (¡es sábado!)", desc: "851 SW 8th St. Desde 1935 el templo de la salsa en Miami. Los sábados hay baile en vivo: si no sabéis bailar, aprenden. Copas + orquesta = la mejor noche del viaje.", tag: "noche", price: "cover ~$10–20", maps: "Ball & Chain, 851 SW 8th St, Miami, FL" },
          { title: "Alternativa: Wynwood de noche", desc: "Gramps (dive con food truck), Wood Tavern (música en vivo) o rooftop. Más joven y menos turístico que South Beach.", tag: "noche", maps: "Gramps, 28 NE 24th St, Miami, FL" },
          { title: "Alternativa: club grande de South Beach", desc: "LIV en el Fontainebleau: cover $40–60, código de vestimenta estricto, reservad mesa si queréis algo serio. El extremo opuesto a Ball & Chain.", tag: "noche", price: "cover $40–60", maps: "LIV Nightclub, 4441 Collins Ave" }
        ]
      }
    ]
  },
  {
    id: "nov22", date: "2026-11-22", day: "DOM", city: "MIA", cityLabel: "Miami",
    weather: { hi: 28, lo: 21, note: "Vuelta a casa" },
    fixed: [
      { time: "tarde/noche", title: "Vuelo de vuelta desde MIA", meta: "confirmar hora · llegar al aeropuerto 3h antes (internacional)", price: "", extra: "Centro de devolución de coches: tram gratuito a las terminales" }
    ],
    blocks: [
      {
        slot: "mañana", title: "Últimas horas de playa",
        options: [
          { title: "★ South Beach temprano", desc: "8:30–11:00: el agua aún está tibia, la arena fría y los guardavidas posando. Llevad toalla, protector y agua (los vendedores piden $6–10 por botella).", tag: "auténtico", maps: "South Beach, Miami Beach" },
          { title: "Brunch de despedida en South Beach", desc: "Los hoteles de Collins tienen brunch de domingo. O cafecito + tostada cubana en cualquier ventanita de Little Havana (abren temprano).", tag: "auténtico", price: "$15–25", maps: "Ocean Drive, Miami Beach" }
        ]
      },
      {
        slot: "mediodía", title: "Logística del vuelo",
        options: [
          { title: "★ Devolver el coche con margen", desc: "El centro de alquileres de MIA está a 15 min del aeropuerto y el tram es gratis, pero dadle 2–3h antes del vuelo internacional: revisión, tránsito del viernes→domingo y cola de facturación.", tag: "logística", maps: "MIA Rental Car Center" },
          { title: "Si el vuelo es muy tarde", desc: "Wynwood o Design District como último paseo (dejando el coche ya devuelto y un Uber al centro).", tag: "logística", maps: "Design District, Miami" }
        ]
      }
    ]
  }
];

/* ═══════════ CIUDADES — guía completa ═══════════ */

const CITIES = {
  DAL: {
    name: "Dallas", state: "Texas", nights: "3 noches", tz: "CST (−1h vs EST)",
    weather: "21°/8° de día/noche — NOCHE FRÍA: chaqueta. Día agradable en manga corta.",
    stay: {
      name: "Magnolia Hotel Downtown Dallas", addr: "1401 Commerce St",
      note: "Main St District, en pleno centro (check-in 15:00 · check-out 11:00). AAC a 1,2 mi = 25 min andando o 8 min en coche. Sixth Floor Museum a 0,5 mi, Klyde Warren Park a 0,9 mi. Estación Akard del DART a una cuadra."
    },
    safety: {
      zones: [
        { area: "Downtown / West End / Arts District", status: "ok", note: "De día muy transitado y turístico. Mucho indigente: no es peligroso pero acostumbra. Por la noche la calle se vacía: Uber." },
        { area: "Deep Ellum (Elm/Main/Commerce)", status: "caution", note: "De día: seguro, murales y BBQ. De noche jue-sáb tras 23h: multitudes y algún incidente (2023 hubo tiroteos). Ambassadors de la fundación patrullan el eje principal. Calles laterales oscuras: evitar." },
        { area: "Victory Park (AAC)", status: "ok", note: "Zona noble junto al estadio, bien iluminada." },
        { area: "Sur de downtown / Fair Park", status: "avoid", note: "De noche no pasear ni aparcar. Fair Park solo en eventos y de día." },
        { area: "Lower Greenville / Uptown / Knox", status: "ok", note: "Bares y restaurantes con ambiente local. Cuidado al volver a pie de madrugada: Uber." }
      ],
      tips: [
        "NUNCA dejar nada visible en el coche (ni un cable de móvil). Texas lidera en robos de vehículo por ventana rota.",
        "Last call a las 2:00 (1:00 domingos). No hay after-hours legales.",
        "Uber/Lyft a las 2:00 pueden multiplicarse x2–3 con 15–30 min de espera: salid un poco antes.",
        "Deep Ellum tiene zonas de recogida señalizadas jue-sáb 21:00–3:00 con cámaras y equipo de seguridad.",
        "Metro DART: funciona para downtown/Deep Ellum, pero de noche la frecuencia baja mucho: no fiarse."
      ]
    },
    eat: [
      { name: "Pecan Lodge", type: "BBQ", price: "$20–30", note: "El referente. Brisket, Hot Mess, banana pudding. Plato 1 carne $24 · 2 $27 · 3 $30. Cola: a vuestra hora (14:00) rueda mejor que al pico americano.", addr: "2702 Main St", hours: "11:00–20:00 (mié) · vie/dom 21:00 · sáb 22:00 · lunes solo hasta 15:00", c: [32.7843, -96.7837], must: true },
      { name: "Terry Black's Barbecue", type: "BBQ", price: "$16–70", note: "Michelin Recommended. Sándwich $16–18, plato 2 carnes $25–40, costilla de buey ~$38. Alternativa top si Pecan Lodge está lleno.", addr: "3025 Main St", hours: "11:00–21:30 (lun–jue) · vie/sáb 10:30–22:00 · dom 10:30–21:30", c: [32.7816, -96.7825], must: true },
      { name: "AllGood Café", type: "American", price: "$12–18", note: "Hamburguesa clásica de Dallas. Desayunos hasta las 15:00. Cero turistas.", addr: "2934 Main St", hours: "7:00–15:00", c: [32.7827, -96.7831] },
      { name: "Cattleack Barbeque", type: "BBQ", price: "$20–30", note: "Cult BBQ de Farmers Branch: solo abre miércoles-viernes a mediodía. Si os cuadra, va.", addr: "13628 Gamma Rd", hours: "mié–vie 11:00 hasta agotar", c: [32.9277, -96.8460] },
      { name: "Murray Street Coffee Shop", type: "Café", price: "$5–10", note: "Café de barrio tranquilo en el lado bueno de Deep Ellum. Sándwiches caseros.", addr: "103 Murray St", hours: "7:00–15:00", c: [32.7855, -96.7877] },
      { name: "Dallas Farmers Market", type: "Mercado", price: "$10–20", note: "The Shed (fin de semana) + food hall con Hurtado BBQ y Ka-Tip Thai. Auténtico.", addr: "920 S Harwood St", hours: "10:00–17:00 (The Shed sáb/dom)", c: [32.7754, -96.7930] },
      { name: "Lockhart Smokehouse", type: "BBQ", price: "$15–25", note: "La de Bishop Arts. Estilo Lockhart original, sin tanto hype.", addr: "400 W Davis St", hours: "11:00–20:00 (cotejar dom)", c: [32.7484, -96.8246] }
    ],
    bars: [
      { name: "Adair's Saloon", note: "Country dive desde 1954. Cerveza barata, banda en directo, suelo de serrín.", area: "Deep Ellum" },
      { name: "Sons of Herman Hall", note: "El bar más antiguo de Dallas (raíces 1910): cerveza, campfire jam los jueves y swing dance.", area: "Deep Ellum" },
      { name: "Ships Lounge", note: "Dive de Lower Greenville desde 1947. Donde van los vecinos.", area: "Lower Greenville" },
      { name: "Truck Yard", note: "Cervecería con patios, food trucks y árboles: el plan relajado de siempre.", area: "Lower Greenville" },
      { name: "Uptown rooftops", note: "Si queréis 'dress up': los rooftops de McKinney Ave. Más caros, más turísticos de bodachette.", area: "Uptown" }
    ]
  },
  ATL: {
    name: "Atlanta", state: "Georgia", nights: "7 noches (apartamento)", tz: "EST",
    weather: "20°/9° — bruma de otoño. Ligerísima lluvia posible. Cómodo con capa fina.",
    stay: {
      name: "Designer 1BR Loft · Altitude", addr: "250 Piedmont Ave NE",
      note: "Peachtree Center, al borde de downtown. 7 noches con cocina: la compra se hace en el Publix de Piedmont (media milla). La estación MARTA Peachtree Center está a 8 min andando — desde/hacia el aeropuerto sin coche. State Farm Arena y Centennial Park a ~25 min andando o 2 paradas de tren."
    },
    safety: {
      zones: [
        { area: "Downtown / Centennial Park / State Farm Arena / GWCC", status: "ok", note: "Corredor turístico muy patrullado (Zone 5). Bien de día y de noche alrededor del arena." },
        { area: "Midtown / Piedmont / BeltLine", status: "ok", note: "El barrio más 'vivible' para turistas. Programa Midtown Blue con policías 24h." },
        { area: "Old Fourth Ward / Inman Park / Krog", status: "ok", note: "Chic, peatonal, lleno de restaurantes. De noche bien iluminado." },
        { area: "Sur de I-20 / Bankhead / partes de Vine City", status: "avoid", note: "Regla de los locales: no salir a pasear. No vais a necesitarlo." },
        { area: "Buckhead (Lenox Mall de noche)", status: "caution", note: "De día elegante; de noche alrededor del Lenox Mall han subido los robos. Vigilad pertenencias." },
        { area: "Buford Highway", status: "caution", note: "Excelente comida, pero es una avenida suburbana: no pasear de noche, ir en coche/Uber directo al restaurante." },
        { area: "Airport / College Park", status: "caution", note: "Alrededores del aeropuerto: no dar paseos nocturnos." }
      ],
      tips: [
        "MARTA (el metro) es seguro y directo del aeropuerto a downtown: 15 min, $2.50.",
        "Con puertas cerradas y ventanas subidas incluso en gasolineras: es costumbre local.",
        "Gasolineras de noche: solo las llenas e iluminadas. Pump and go, no vagar.",
        "El tráfico de Atlanta es leyenda: contad 25–40% extra sobre Google Maps en hora punta (7–9 y 16–18).",
        "Apartamento con compra: Publix (el Winn-Dixie del sur) y Kroger son los supermercados decentes."
      ]
    },
    eat: [
      { name: "Krog Street Market", type: "Food hall", price: "$15–25", note: "Fábrica de ladrillo del 1900 con puestos locales. Spiller Park, Fred's Meat & Bread.", addr: "99 Krog St NE", hours: "11:00–21:00 (cotejar dom)", c: [33.7507, -84.3736], must: true },
      { name: "Ponce City Market", type: "Food hall", price: "$15–25", note: "El antiguo Sears: rooftop con juegos (pag aparte) y decenas de puestos.", addr: "675 Ponce De Leon Ave NE", hours: "11:00–21:00", c: [33.7720, -84.3646], must: true },
      { name: "Mary Mac's Tea Room", type: "Southern", price: "$20–30", note: "Desde 1945. Southern Pantry de aperitivos incluido. Reserva.", addr: "224 Ponce De Leon Ave NE", hours: "11:00–21:00", c: [33.7724, -84.3670] },
      { name: "Busy Bee Café", type: "Soul food", price: "$15–22", note: "Pollo frito desde 1947. West End: ir de día o Uber de puerta a puerta.", addr: "810 Peeples St SW", hours: "11:00–21:00", c: [33.7357, -84.4136] },
      { name: "The Vortex", type: "Burgers", price: "$15–20", note: "Little Five Points: hamburguesas enormes y doble entrada de bar (21+ en una).", addr: "438 Moreland Ave NE", hours: "11:00–24:00", c: [33.7695, -84.3475] },
      { name: "Canton House", type: "Dim sum", price: "$15–25", note: "Buford Highway: dim sum auténtico con carritos. El almuerzo de domingo es ritual local.", addr: "5388 Buford Hwy NE", hours: "11:00–21:00 (dom hasta 22:00)", c: [33.8875, -84.2958] },
      { name: "South City Kitchen", type: "Southern moderno", price: "$25–40", note: "Southern contemporáneo elegante. Para la cena de despedida.", addr: "1144 Crescent Ave NE", hours: "11:00–22:00", c: [33.7826, -84.3830] }
    ],
    bars: [
      { name: "Edgewood Avenue", note: "La calle de bares del centro: Joystick Gamebar (arcades), Royal American (rock), Nook.", area: "Old Fourth Ward" },
      { name: "Monday Night Brewing", note: "Taproom grande con patio y food trucks. IPA del sur.", area: "West Midtown" },
      { name: "The Righteous Room", note: "Dive bar con patios y perros. El sitio donde los vecinos van a desayunar cerveza.", area: "Poncey-Highland" },
      { name: "Clermont Lounge", note: "Leyenda underground de ATL (strip club dive, no apto para todos). Experiencia única si os atrevéis.", area: "Poncey-Highland" }
    ]
  },
  ORL: {
    name: "Orlando", state: "Florida", nights: "4 noches", tz: "EST",
    weather: "27°/17° — caluroso y húmedo. Protector solar obligatorio aunque esté nublado.",
    stay: {
      name: "The Point Hotel & Suites", addr: "7389 Universal Blvd",
      note: "Florida Center: suites con cocina y parking. Islas de Aventura 1,3 mi / 4 min · Epic Universe 2,9 mi / 8 min · SeaWorld 4,9 mi · Disney 7,1 mi / 12 min. Check-in 16:00. NO hay Early Park Admission: no es hotel Universal — se entra a la hora pública."
    },
    safety: {
      zones: [
        { area: "International Drive / resort area", status: "ok", note: "Zona 100% turística, vigilada, llena de gente a todas horas. Carretera ancha: no se pasea, se conduce o se coge Uber." },
        { area: "Parques Universal / Disney", status: "ok", note: "Policía propia y parking de pago. Robos en parking: nada visible en el coche." },
        { area: "Downtown Orlando (South Eola)", status: "ok", note: "Bonito de día, tranquilo de noche. Rodeado de restaurantes." },
        { area: "Pine Hills / partes del sur de la ciudad", status: "avoid", note: "Zonas residenciales con tasa alta. No vais a ir allí, pero no salgas del corredor turístico." }
      ],
      tips: [
        "Parking en los parques: ~$30/día. Si os alojáis en un hotel Universal, el parking del resort es gratis en algunos casos.",
        "Nunca dejéis toallas, mochilas o compras visibles en el coche mientras estáis en el parque.",
        "Turnpike tiene peajes electrónicos: el alquiler puede cobrar $5–10 extra por cada peaje si no tenéis transponder.",
        "Gasolineras cerca de los parques: más caras. Recargad en Walmart/Kroger del barrio.",
        "La humedad mata el móvil: funda estanca para las colas con lluvia corta de la tarde."
      ]
    },
    eat: [
      { name: "Hash House A Go Go", type: "American", price: "$15–22", note: "Porciones absurdas y bonito brunch. Cadena local de San Diego con sedes en I-Drive.", addr: "5959 International Dr", hours: "8:00–21:00", c: [28.4437, -81.4744] },
      { name: "Se7en Bites", type: "Southern", price: "$12–18", note: "Southern bakery-café auténtico cerca de downtown (no I-Drive). Biscuits de antología.", addr: "617 N Primrose Dr", hours: "7:30–15:00", c: [28.5459, -81.3767] },
      { name: "Bosphorus Restaurant", type: "Turco", price: "$18–28", note: "Cena con vista al lago en Winter Park. El antídoto contra I-Drive.", addr: "108 N Orlando Ave", hours: "11:30–22:00", c: [28.5934, -81.3466] },
      { name: "Park Winter Park / Park Ave", type: "Barrio", price: "$15–35", note: "Paseo por Park Avenue: heladería, librerías y restaurantes de vecindario bonitos. 20 min de los parques.", addr: "Park Ave, Winter Park", hours: "tiendas 10:00–21:00", c: [28.5965, -81.3487] },
      { name: "CityWalk food", type: "Turístico", price: "$15–25", note: "Voodoo Doughnut, Cowfish, Toothsome: caro pero tematizado y cómodo tras el parque.", addr: "Universal CityWalk", hours: "11:00–00:00", c: [28.4720, -81.4676] }
    ],
    bars: [
      { name: "The Courtesy", note: "Cocktail bar de autor downtown. Uno de los mejores bares de Florida.", area: "Downtown" },
      { name: "Ausbun's / I-Drive bars", note: "Zona turística: bares con música en vivo y pitchers baratos.", area: "International Drive" }
    ]
  },
  MIA: {
    name: "Miami", state: "Florida", nights: "2 noches", tz: "EST",
    weather: "28°/21° — tropical, posibles aguaceros cortos. Bañador, protector, gafas de sol.",
    safety: {
      zones: [
        { area: "South Beach (Ocean Drive, Collins, Lincoln)", status: "ok", note: "Turístico y patrullado 24h. Cuidado con móviles en la playa y en terrazas: ratero rápido." },
        { area: "Wynwood (día)", status: "ok", note: "Buen ambiente de galerías y cafés por la mañana y mediodía." },
        { area: "Wynwood (noche, calles laterales)", status: "caution", note: "Al anochecer queda desierto fuera del eje NW 2nd Ave. Quedaros en la avenida principal o Uber." },
        { area: "Little Havana (Calle Ocho 12th–27th)", status: "ok", note: "Corredor activo y seguro cuando hay gente. No meterse en calles residenciales oscuras de noche." },
        { area: "Overtown / Liberty City / Little Haiti", status: "avoid", note: "Zonas de alta criminalidad. No hay razón para turistas." },
        { area: "Downtown Miami (ciertas calles de noche)", status: "caution", note: "Algunas calles se vacían tras el horario de oficinas. Bayside de día bien." },
        { area: "Brickell / Coconut Grove / Coral Gables", status: "ok", note: "Zonas elegantes, seguras, restaurantes buenos." }
      ],
      tips: [
        "Aparcar en South Beach es un infierno: garajes $20–40/día o free trolley + Uber. El coche solo sirve para llegar y devolver.",
        "Nadar solo donde hay guardavidas: las corrientes de Florida son traicioneras (rip currents).",
        "Promotores de clubes en la calle: estafa clásica. Comprar entradas solo por web oficial.",
        "Cuban coffee (cortadito/cafecito) en ventanitas: $2–3 y es el ritual local de verdad.",
        "La regla del 'cubierto no': en Little Havana comprobad que no os sumen service charge si no toca."
      ]
    },
    eat: [
      { name: "Sanguich de Miami", type: "Cubano", price: "$12–16", note: "EL cubano sandwich: MICHELIN Bib Gourmand. Cola corta si vais a mediodía temprano o a las 14:00 (hora vuestra).", addr: "1250 SW 8th St", hours: "11:00–20:00", c: [25.7634, -80.2172], must: true },
      { name: "Versailles", type: "Cubano", price: "$18–28", note: "Desde 1971 el restaurante cubano más famoso del mundo. Ventanita de café siempre llena. Algo turístico pero legítimo.", addr: "3555 SW 8th St", hours: "8:00–23:00", c: [25.7666, -80.2306] },
      { name: "Ball & Chain", type: "Cubano + música", price: "$15–25 + cover", note: "Desde 1935. Los sábados: orquesta y baile. La noche del 21: ideal.", addr: "851 SW 8th St", hours: "12:00–05:00 (sáb)", c: [25.7620, -80.2161], must: true },
      { name: "KYU", type: "Asian wood-fired", price: "$30–50", note: "MICHELIN Bib Gourmand en Wynwood. Lechón y coliflor asada. Reserva.", addr: "251 NW 25th St", hours: "12:00–23:00", c: [25.8011, -80.1994] },
      { name: "Azucar Ice Cream", type: "Heladería", price: "$5–7", note: "Sabores tropicales: mango-maracuyá, guayaba, plátano. Calle Ocho.", addr: "1501 SW 8th St", hours: "11:00–22:00", c: [25.7644, -80.2225] },
      { name: "Joe's Stone Crab", type: "Marisco", price: "$40–70", note: "Si queréis gastaros: la institución del marisco de Miami desde 1913. Sin reservas, cola eterna pero hay barra.", addr: "11 Washington Ave", hours: "11:30–22:00", c: [25.7773, -80.1334] },
      { name: "La Sandwicherie", type: "Sandwiches", price: "$10–14", note: "South Beach sin postureo: sándwiches y ensaladas al aire libre hasta tarde.", addr: "229 14th St", hours: "11:00–02:00", c: [25.7836, -80.1297] }
    ],
    bars: [
      { name: "Gramps", note: "Dive de Wynwood con food truck, conciertos y ambiente local.", area: "Wynwood" },
      { name: "Wood Tavern", note: "Bar de barrio con música en vivo casi cada noche.", area: "Wynwood" },
      { name: "Café La Trova", note: "Bar cubano con orquesta y gente bailando entre mesas. Auténtico Little Havana.", area: "Little Havana" },
      { name: "LIV Fontainebleau", note: "El club grande: cover $40–60, dress code, mesa reservada si queréis.", area: "Mid-Beach" }
    ]
  }
};

/* ═══════════ PARTIDOS ═══════════ */

const GAMES = [
  { id: "g1", team: "MAVERICKS", league: "NBA", rival: "Utah Jazz", date: "Vie 6 nov", time: "19:00 CST", venue: "American Airlines Center", city: "DAL", note: "NBA Cup (West Group A). Puertas ~1h antes.", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX",
    dine: "DESPUÉS. El partido acaba ~21:15 y vuestro reloj dice 21:30: cenad en Victory Park/Deep Ellum sin movernos del barrio. Si os apetece cenar antes, hacedlo temprano (17:00): a esa hora los locales aún no han llenado los restaurantes." },
  { id: "g2", team: "STARS", league: "NHL", rival: "San José Sharks", date: "Sáb 7 nov", time: "19:00 CST", venue: "American Airlines Center", city: "DAL", note: "Hockey: el ambiente es más ruido y cerveza que el NBA.", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX",
    dine: "ANTES (17:00) si queréis Pecan Lodge: sábado cierra a las 22:00 pero la cola de las 21:00 es un salto de fe. Si cenáis después (~21:30), Terry Black's sí aguanta hasta las 22:00. BBQ = comida pesada previa al partido, decidid con calma." },
  { id: "g3", team: "MAVERICKS", league: "NBA", rival: "Brooklyn Nets", date: "Dom 8 nov", time: "18:30 CST", venue: "American Airlines Center", city: "DAL", note: "Partido más temprano: cena posterior posible.", maps: "American Airlines Center, 2500 Victory Ave, Dallas, TX",
    dine: "DESPUÉS. Termina ~20:45: cenad a las 21:15–21:30 vuestro horario, sin prisa. OJO domingo: Pecan Lodge cierra 21:00 y las cocinas de Deep Ellum empiezan a cerrar 22:00 — elegid sitio antes de salir del partido." },
  { id: "g4", team: "HAWKS", league: "NBA", rival: "Los Angeles Lakers", date: "Lun 9 nov", time: "19:00 EST", venue: "State Farm Arena", city: "ATL", note: "¡Lakers! Partido grande del día de llegada. Céntrico.", maps: "State Farm Arena, 1 State Farm Dr NW, Atlanta, GA",
    dine: "DESPUÉS (~21:30). Llegáis 15:26, check-in y hasta el partido: sin margen para una cena larga previa. Tras el partido, downtown está vivo y las cocinas aguantan hasta 22:00–22:30 (State Farm Arena pegado a Centennial Park: cenáis saliendo). Si os muereis de hambre antes, picad algo ligero en el arena." },
  { id: "g5", team: "FALCONS", league: "NFL", rival: "Kansas City Chiefs", date: "Dom 15 nov", time: "13:00 EST", venue: "Mercedes-Benz Stadium", city: "ATL", note: "Techo retráctil + halo board. Llegad 1.5h antes.", maps: "Mercedes-Benz Stadium, 1 AMB Dr NW, Atlanta, GA",
    dine: "DENTRO / ANTES. El NFL dura ~3h15: acaba ~16:15. El Mercedes-Benz tiene de las mejores comidas de estadio de EE.UU. (sold-out BBQ): almuerzad dentro a las 12:00 o antes del partido (tailgate). No cenéis hasta las 21:30: os queda tarde libre; un late lunch a las 17:00 os salva." }
];

const EVENT = {
  name: "MAGICCON ATLANTA",
  dates: "vie 13 → dom 15 noviembre 2026",
  place: "Georgia World Congress Center · Building C",
  addr: "285 Andrew Young International Blvd NW",
  hours: "Vie y sáb 10:00–19:00 · Dom 10:00–18:00",
  who: "Badge de Ferran · World Championship 32 el sábado",
  notes: [
    "A pie desde downtown: 5 min del Centennial Olympic Park y del State Farm Arena.",
    "El food court del CNN Center está literalmente al lado (donde Antonio puede esperar/merendar).",
    "OJO dom 15: el partido de los Falcons es a las 13:00. Si el badge incluye domingo, solo da para media mañana antes de salir hacia el Mercedes-Benz."
  ]
};

/* ═══════════ POI — coordenadas aprox. para calcular cercanía ═══════════
   Se buscan por coincidencia de texto en el campo `maps` (gana la clave más larga).
   Las distancias son orientativas: el botón "Cómo llegar" usa la dirección completa. */

const POI = {
  // Dallas
  "american airlines center": [32.7905, -96.8105],
  "pecan lodge": [32.7843, -96.7837],
  "terry black": [32.7816, -96.7825],
  "allgood": [32.7827, -96.7831],
  "adair": [32.7846, -96.7852],
  "deep ellum": [32.7840, -96.7840],
  "klyde warren": [32.7880, -96.8030],
  "nasher sculpture": [32.7874, -96.8037],
  "dallas farmers market": [32.7754, -96.7930],
  "dealey plaza": [32.7791, -96.8290],
  "sixth floor museum": [32.7793, -96.8291],
  "reunion tower": [32.7755, -96.8070],
  "perot museum": [32.7853, -96.8083],
  "bishop arts": [32.7477, -96.8255],
  "lower greenville": [32.7900, -96.7560],
  "knox st & henderson": [32.8010, -96.7940],
  "apple store knox": [32.8008, -96.7938],
  "apple northpark": [32.8710, -96.7740],
  "magnolia hotel": [32.7800, -96.7990],
  "lockhart smokehouse": [32.7484, -96.8246],
  // Atlanta
  "state farm arena": [33.7573, -84.3963],
  "mercedes-benz stadium": [33.7554, -84.4010],
  "georgia world congress": [33.7570, -84.3980],
  "centennial olympic park": [33.7590, -84.3980],
  "georgia aquarium": [33.7633, -84.3950],
  "national center for civil": [33.7610, -84.3930],
  "cnn center": [33.7570, -84.3970],
  "krog street market": [33.7507, -84.3736],
  "ponce city market": [33.7720, -84.3646],
  "mary mac": [33.7724, -84.3670],
  "martin luther king": [33.7550, -84.3740],
  "sweet auburn": [33.7550, -84.3750],
  "beltline eastside": [33.7600, -84.3650],
  "little five points": [33.7690, -84.3480],
  "piedmont park": [33.7870, -84.3720],
  "buford highway": [33.8870, -84.2960],
  "busy bee": [33.7357, -84.4136],
  "atlanta botanical": [33.7910, -84.3740],
  "jimmy carter": [33.7660, -84.3640],
  "zoo atlanta": [33.7350, -84.4130],
  "the works": [33.7870, -84.4140],
  "monday night brewing": [33.7930, -84.4180],
  "fox theatre": [33.7720, -84.3840],
  "midtown": [33.7840, -84.3880],
  "bobby dodd": [33.7710, -84.3940],
  "starlight drive": [33.6900, -84.3330],
  "atlanta breakfast club": [33.7540, -84.4060],
  "edgewood": [33.7540, -84.3800],
  "south city kitchen": [33.7826, -84.3830],
  "decatur": [33.7740, -84.2960],
  "plaza theatre": [33.7730, -84.3630],
  "250 piedmont": [33.7600, -84.3890],
  "peachtree center station": [33.7600, -84.3870],
  // Orlando
  "disney's hollywood studios": [28.3580, -81.5590],
  "islands of adventure": [28.4710, -81.4650],
  "universal epic universe": [28.4388, -81.4457],
  "universal citywalk": [28.4720, -81.4676],
  "the point hotel": [28.4685, -81.4690],
  "international drive": [28.4430, -81.4740],
  "park avenue": [28.5965, -81.3487],
  "dr phillips": [28.3730, -81.4360],
  "kennedy space center": [28.5235, -80.6500],
  // Miami
  "wynwood walls": [25.8010, -80.1990],
  "wynwood": [25.8010, -80.1990],
  "little havana": [25.7640, -80.2190],
  "sanguich": [25.7634, -80.2172],
  "versailles": [25.7666, -80.2306],
  "ball & chain": [25.7620, -80.2161],
  "azucar": [25.7644, -80.2225],
  "kyu": [25.8011, -80.1994],
  "joe's stone crab": [25.7773, -80.1334],
  "la sandwicherie": [25.7836, -80.1297],
  "south pointe park": [25.7690, -80.1360],
  "lincoln road": [25.7870, -80.1350],
  "ocean drive": [25.7800, -80.1310],
  "collins ave": [25.8150, -80.1220],
  "gramps": [25.8010, -80.1960],
  "liv nightclub": [25.8155, -80.1215],
  "design district": [25.8120, -80.1970],
  "south beach": [25.7820, -80.1300]
};

/* ═══════════ PARQUES ═══════════ */

const PARKS = [
  {
    id: "hs", name: "Disney's Hollywood Studios", day: "Mar 17 nov", hours: "aprox. 09:00–20:00 (confirmar en app MDE)",
    tickets: "entrada base ~$119+ · Lightning Lane Multi Pass ~$29–40/día",
    ticketUrl: "https://disneyworld.disney.go.com/admission/tickets/",
    crowd: "Martes de noviembre: cola media (Rise y Slinky por encima del resto), todo lo demás ronda los 30–45 min. Riesgo real: chubasco de 15 min por la tarde — funda estanca para el móvil. OJO: martes de noviembre puede tocar Jollywood Nights (evento pago nocturno): el parque cierra temprano al público. CONFIRMAD en la app antes de planificar la cena.",
    strategy: [
      "Llegad a la hora de apertura real (no tarde): primera hora = 2x atracciones.",
      "Rise of the Resistance PRIMERO si no compráis Lightning Lane — y guardad hueco para el cierre.",
      "Lightning Lane Multi Pass se compra por app MDE desde España, con hora local.",
      "Comed a las 14:00 (hora vuestra): los grupos escolares americanos se van a las 13:00 y las colas de comida se vacían.",
      "Vuestra cena de 21:30 NO cabe dentro: cenad temprano en el parque (18:00) o salid y cenad en I-Drive/Winter Park."
    ],
    rides: [
      { name: "Star Wars: Rise of the Resistance", tag: "imprescindible", adr: 3, rec: 5, when: "Sin LL: subid ~11:00 (hora en que suele bajar). Mejor aún la última hora: los 30 min finales son los más cortos del día. Disney infla los tiempos publicados desde las 18:00.", note: "La mejor del parque: simulador + paseo + escenario." },
      { name: "Rock 'n' Roller Coaster — Starring The Muppets", tag: "thrill", adr: 4, rec: 4, when: "Alta demanda todo el día; primera hora o con Multi Pass. Desde mayo 2026 suena The Electric Mayhem (ya no Aerosmith).", note: "Lanzamiento indoor a oscuras con Muppets: el coaster serio del parque." },
      { name: "Tower of Terror", tag: "thrill", adr: 4, rec: 4, when: "Media tarde: cola con sombra y casi siempre por debajo de Slinky a la misma hora.", note: "El clásico del hotel maldito. 100 m de caída." },
      { name: "Slinky Dog Dash", tag: "familia", adr: 2, rec: 4, when: "Toy Story Land vacío = primera hora y cierre. A media mañana llega a 60–70 min al sol.", note: "Montaña rusa media, divertida y sin giros bruscos." },
      { name: "Millennium Falcon: Smugglers Run", tag: "familia", adr: 2, rec: 3, when: "Cae cuando el parque entero está en la cola de Rise. Tras el mediodía suele ser rápido.", note: "Pilotear el Halcón Milenario: divertido, cola media." },
      { name: "Star Tours – The Adventures Continue", tag: "familia", adr: 2, rec: 3, when: "Casi nunca supera los 20 min: relleno perfecto cerca de la entrada.", note: "Simulador 3D con destinos aleatorios de Star Wars." },
      { name: "Toy Story Mania!", tag: "familia", adr: 2, rec: 3, when: "Si Rise está en 90 min, esta es la apuesta segura: casi nunca pasa de 40.", note: "Carrusel de disparos: perfecto para reírse entre colas." },
      { name: "Mickey & Minnie's Runaway Railway", tag: "familia", adr: 1, rec: 2, when: "Con Multi Pass o en la primera hora si la queréis: sin altura mínima.", note: "Tren por dentro de dibujos animados. Divertida pero PARQUE-LIGHT: para 2 adultos con prisa, prescindible." },
      { name: "Alien Swirling Saucers", tag: "familia", adr: 2, rec: 2, when: "Media hora como mucho; solo si os sobra el tiempo en Toy Story Land.", note: "Giratorio con cohetes: más para peques." },
      { name: "Indiana Jones Epic Stunt Spectacular (show)", tag: "show", adr: 1, rec: 4, when: "Varias funciones al día: elegid una a media tarde como descanso de colas. GRATIS.", note: "Trucos de cine en directo: sorprendentemente entretenido." },
      { name: "Fantasmic! (show nocturno)", tag: "show", adr: 1, rec: 5, when: "Última función de la noche (cotejar horario en app). Llegad 30 min antes si queréis asiento decente.", note: "Barcos, fuegos y villanos sobre el lago: el mejor cierre de día del parque." }
    ],
    route: [
      { t: "08:40", kind: "tip", title: "Cola de apertura", note: "Id al magnetómetro 20–30 min antes de las 09:00. Objetivo: Sunset Blvd (Rock 'n' Roller + Tower)." },
      { t: "09:00", kind: "ride", title: "Rock 'n' Roller Coaster (Muppets)", wait: "~25 min", note: "El más intenso: aprimero os despierta. rec 4/5." },
      { t: "09:35", kind: "ride", title: "Tower of Terror", wait: "~20 min", note: "Junto a la anterior: misma calle. rec 4/5." },
      { t: "10:05", kind: "ride", title: "Star Tours", wait: "~15 min", note: "Relleno de calidad camino de Galaxy's Edge." },
      { t: "10:35", kind: "ride", title: "Millennium Falcon: Smugglers Run", wait: "~30 min", note: "Entrad ahora: el resto del parque está en Rise." },
      { t: "11:15", kind: "ride", title: "Star Wars: Rise of the Resistance", wait: "~45 min", note: "La hora sin LL en que la cola baja. LA atracción del día: rec 5/5." },
      { t: "12:20", kind: "show", title: "Indiana Jones Epic Stunt Spectacular", wait: "show ~30 min", note: "Descanso de pie con sombra. Mirad función en la app." },
      { t: "13:00", kind: "ride", title: "Toy Story Mania!", wait: "~30 min", note: "Si a las 12:00 Slinky está por encima de 60 min, venid aquí primero." },
      { t: "13:35", kind: "ride", title: "Slinky Dog Dash", wait: "~40 min", note: "Cola al sol: gorra y agua. Si supera 60, dejadlo para el cierre." },
      { t: "14:20", kind: "food", title: "COMER — vuestra hora española", note: "Docking Bay 7 (Galaxy's Edge, a 3 min) o BaseLine Tap House (Sunset Blvd, pretzel + cerveza). A las 14:00 los grupos escolares ya se han ido: fila corta y mesas libres." },
      { t: "15:15", kind: "tip", title: "Zona libre", note: "Mickey & Minnie y Alien Swirling Saucers (rec 2) solo si os apetece; con lo que lleváis ya tenéis el día ganado. Mejor: fotos de Galaxy's Edge/Toy Story con luz de tarde." },
      { t: "16:30", kind: "ride", title: "Re-ride libre", note: "Tower o Falcon si están por debajo de 25 min. Si no, Frozen Sing-Along como descanso." },
      { t: "18:00", kind: "food", title: "Cena temprana dentro", note: "En parques cierra la cocina con el parque: no esperéis a las 21:30. A las 18:00 la comida americana ya cenó → cocinas aliviadas." },
      { t: "19:00", kind: "ride", title: "Última hora: Rise of la Resistance", wait: "~25–30 min", note: "Los 30–45 min finales son los más rápidos del día. OJO: desde las 18:00 Disney infla los tiempos publicados — el reloj miente, la cola no." },
      { t: "20:00", kind: "show", title: "Fantasmic!", note: "Si es noche de show: cierre perfecto. Salid tras el show, el parking es un caos 15 min." }
    ],
    food: "Docking Bay 7 (galáctico, decente, JUNTO a Rise), BaseLine Tap House (cerveza + pretzel, al lado de Tower), Woody's Lunch Box (Toy Story). Comer a las 14:00 = sin cola; cenar a las 21:30 = imposible dentro, salid."
  },
  {
    id: "ioa", name: "Islands of Adventure", day: "Mié 18 nov", hours: "aprox. 09:00–20:00 · EPA 08:00 solo hotel Universal (no es vuestro caso)",
    tickets: "entrada base ~$125+ · Express desde ~$109–174",
    ticketUrl: "https://www.universalorlando.com/web/en/us/tickets",
    crowd: "Miércoles de noviembre: uno de los días más flojos del año. Sin Express, con apertura puntual y Hagrid primero, se hace todo lo importante. El peligro solo son las colas de Potter a mediodía.",
    strategy: [
      "Hagrid's Magical Creatures = PRIMERA COLO del día (75–80 min al abrir; 55–65 el resto).",
      "Después VelociCoaster (la mejor coaster del resort) antes de las 11:00.",
      "Forbidden Journey (Hogwarts) con la app: la cola del parque temático más bonita.",
      "Si la cola de Hagrid es criminal: single rider line (a veces abierta).",
      "Butterbeer en Hogsmeade aunque no os guste Harry Potter: es parte del ritual.",
      "Jurassic Park River Adventure está CERRADO por reforma hasta ~diciembre 2026: no lo contéis."
    ],
    rides: [
      { name: "Hagrid's Magical Creatures Motorbike Adventure", tag: "imprescindible", adr: 3, rec: 5, when: "Sin EPA: la apertura son 75–80 min y luego 55–65 el resto del día — la franja más floja es hacia las 15:00. Más de 90: single rider.", note: "La más popular del resort: lanzamiento backwards + historias." },
      { name: "Jurassic World VelociCoaster", tag: "thrill", adr: 5, rec: 5, when: "Primeros 90 min tras abrir o al anochecer. Evitad 12:00–16:00, el pico. Single rider cuando pase de 60.", note: "Inmersión total: raptor en la cola, loop sobre el lago. La mejor coaster del resort." },
      { name: "Harry Potter and the Forbidden Journey", tag: "imprescindible", adr: 3, rec: 5, when: "Media tarde y cierre bajan; la cola temática (las mazmorras de Hogwarts) merece el rato aunque esté en 50.", note: "Dentro de Hogwarts: robot brazo + proyección. Coleccionable." },
      { name: "The Incredible Hulk Coaster", tag: "thrill", adr: 5, rec: 4, when: "Alta capacidad: casi siempre por debajo de VelociCoaster. Tras el mediodía suele estar tranquila.", note: "Lanzamiento negro, 7 inversiones. Clásico." },
      { name: "The Amazing Adventures of Spider-Man", tag: "familia", adr: 3, rec: 4, when: "Cola estable todo el día; con Express o en la última hora. Casi nunca es el cuello de botella.", note: "Simulador 3D: sigue siendo excelente." },
      { name: "Skull Island: Reign of Kong", tag: "thrill", adr: 3, rec: 3, when: "Media tarde suele estar por debajo de 30 min.", note: "Gigante animatrónico + pantalla: divertido, no imperdible." },
      { name: "Popeye & Bluto's Bilge-Rat Barges", tag: "mojar", adr: 2, rec: 3, when: "Mediodía, con el sol encima: es el mejor momento para mojarse (y luego se seca en 20 min).", note: "Barcas de agua: si hace calor, os vais a mojar de todas formas." },
      { name: "Dudley Do-Right's Ripsaw Falls", tag: "mojar", adr: 3, rec: 3, when: "Junto a Popeye: hacer las dos seguidas si os va lo mojado.", note: "Drop final con salpicadura seria." },
      { name: "Doctor Doom's Fearfall", tag: "thrill", adr: 4, rec: 3, when: "Cola corta casi siempre (poca gente la hace): buen thrill rápido.", note: "Torres de 130 m con caída. OJO: mirad en la app que siga abierta." },
      { name: "The Flight of the Hippogryph", tag: "familia", adr: 2, rec: 3, when: "Dentro de Hogsmeade: combinar con Forbidden Journey de ida o vuelta.", note: "Coaster familiar con vistas al castillo." },
      { name: "The High in the Sky Seuss Trolley Train Ride!", tag: "familia", adr: 1, rec: 3, when: "Paseo aéreo sobre Seuss Landing: descanso andando.", note: "Vistas del parque sin cola." },
      { name: "One Fish, Two Fish, Red Fish, Blue Fish", tag: "familia", adr: 1, rec: 2, when: "Solo si os pilla la lluvia: es indoor-ish y corta.", note: "Giratorio acuático de Seuss." },
      { name: "The Cat in the Hat", tag: "familia", adr: 1, rec: 2, when: "Casi sin cola por diseño: relleno de lluvia.", note: "Paseo en libro de Seuss." },
      { name: "Kang & Kodos' Twirl 'n' Hurl", tag: "familia", adr: 1, rec: 2, when: "Giratorio de Simpson: solo si os pilla cerca y sin cola.", note: "Básico pero con vistas." },
      { name: "Hogwarts Express (requiere park-to-park)", tag: "show", adr: 1, rec: 3, when: "Solo si compráis ticket park-to-park (no lo tenéis en base): el trayecto es la atracción.", note: "Tren temático entre Hogsmeade y Diagon Alley (Universal Studios)." }
    ],
    route: [
      { t: "08:40", kind: "tip", title: "Cola de apertura", note: "Objetivo único: Hagrid's. Caminad directo al fondo del parque (Hogsmeade), sin desvíos." },
      { t: "09:00", kind: "ride", title: "Hagrid's Magical Creatures", wait: "75–80 min al abrir", note: "Sí, es muchísimo: es LA cola del resort. Recompensa: rec 5/5. Si pasa de 90: single rider." },
      { t: "10:20", kind: "ride", title: "Jurassic World VelociCoaster", wait: "~30 min", note: "Antes de las 11:00 o después se dispara. rec 5/5, adr 5/5: la del viaje." },
      { t: "11:00", kind: "ride", title: "Forbidden Journey (Hogwarts)", wait: "~35 min", note: "La cola por las mazmorras del castillo vale media hora sola. rec 5/5." },
      { t: "11:45", kind: "tip", title: "Butterbeer + fotos en Hogsmeade", note: "~$8. El pueblo entero es theming de nivel cine: fotos con el castillo." },
      { t: "12:15", kind: "ride", title: "The Incredible Hulk Coaster", wait: "~25 min", note: "Marvel: vuelta a los thrills. rec 4/5." },
      { t: "12:50", kind: "ride", title: "Spider-Man", wait: "~25 min", note: "Simulador 3D que aún engancha. rec 4/5." },
      { t: "13:25", kind: "ride", title: "Skull Island: Reign of Kong", wait: "~30 min", note: "rec 3/5: si la cola pasa de 40, saltad sin remordimientos." },
      { t: "14:10", kind: "food", title: "COMER — Three Broomsticks (Hogsmeade)", note: "A vuestra hora 14:00 la gente ya ha almorzado: fila corta y sitio. Británica tematizada, mejor que la media de parque. Alternativa rápida: stands de la isla de los Cerditos." },
      { t: "15:15", kind: "ride", title: "Franja floja de Hagrid's", wait: "~55 min", note: "Hacia las 15:00 es cuando más baja: segunda oportunidad (o first-ride si la mañana fue imposible)." },
      { t: "16:20", kind: "tip", title: "Relleno inteligente", note: "Popeye/Dudley (si os apetece mojaros), Doctor Doom o Seuss Trolley: todo por debajo de 20 min a esta hora." },
      { t: "17:15", kind: "ride", title: "VelociCoaster al atardecer", wait: "~35 min", note: "La luz sobre el lago y la cola temática de raptors con el sol bajo: mejor experiencia." },
      { t: "18:15", kind: "food", title: "Cena temprana — Mythos", note: "Considerado uno de los mejores restaurantes DENTRO de un parque en EE.UU.: reservad online. A las 18:00 sin problema; a las 21:30 la cocina ya habrá cerrado." },
      { t: "19:15", kind: "ride", title: "Última hora: Forbidden Journey", wait: "~20 min", note: "Cierre con castillo iluminado. O re-ride de Hagrid si el día lo pide." },
      { t: "19:50", kind: "tip", title: "Salida", note: "CityWalk está en la salida: si aún queréis picar algo (Voodoo Doughnut), es ahora. La cena de verdad, a vuestra hora." }
    ],
    food: "Three Broomsticks (británica tematizada, EN Hogsmeade a 2 min de Hagrid's), Mythos (Lost Continent: el mejor de parque según rankings — RESERVAD), Comic Strip Cafe (Marvel, rápido). Jurassic River Adventure CERRADO por reforma hasta ~dic 2026."
  },
  {
    id: "epic", name: "Universal Epic Universe", day: "Jue 19 nov", hours: "aprox. 10:00–20:00 · Early Entry 09:00 solo hotel Universal (no aplica)",
    tickets: "entrada ~$135+ · Express desde ~$200 (picos $330) — en nov entre semana NO hace falta",
    ticketUrl: "https://www.universalorlando.com/web/en/us/tickets",
    crowd: "Jueves de noviembre: 2–4/10 en los conteos de la casa. Medias medidas en otoño: Mine-Cart 60–70 min, Battle at the Ministry 35–65, Stardust Racers 15–20. La única cola seria por la mañana es Nintendo + Dark Universe.",
    strategy: [
      "No tenéis Early Entry (The Point no es hotel Universal): entrad a la hora pública y eso basta en nov.",
      "Dark Universe solo tiene ventana en los primeros 60 min: si entráis a las 10:00, id allí PRIMERO (no a Nintendo).",
      "Battle at the Ministry (Harry Potter): la cola temática es un espectáculo en sí — pero id al final del día.",
      "Recorred las 5 worlds aunque no montéis todo: la theming es el motivo real del viaje.",
      "Universal Nights (after-hours 19:00–24:00) el 20 nov a ~$180: solo si os quedáis esa noche en vez de ir a Miami."
    ],
    worlds: [
      { name: "Super Nintendo World", note: "Mario Kart (AR), Mine-Cart Madness (DK), Yoshi. El más colorido." },
      { name: "Wizarding World – Ministry of Magic", note: "Battle at the Ministry + calles de París mágica." },
      { name: "How to Train Your Dragon", note: "Stardust Racers, Hiccup, Fyre Drill. El más 'familia' con clase." },
      { name: "Dark Universe", note: "Monstruos clásicos de Universal: Frankenstein, Drácula. El más oscuro." },
      { name: "Celestial Park", note: "El centro con la fuente y los coasters: paseadlo al anochecer." }
    ],
    rides: [
      { name: "Harry Potter and the Battle at the Ministry", tag: "imprescindible", adr: 3, rec: 5, when: "NUNCA de primeras: cae desde las 18:00 y hace ~35 min en la última hora antes del cierre a las 20:00.", note: "Simulador inmersivo en el Ministerio: la mejor tecnología del parque." },
      { name: "Monsters Unchained: The Frankenstein Experiment", tag: "imprescindible", adr: 3, rec: 5, when: "Dark Universe NO entra en Early Entry: los primeros 60 min del día son SU ventana. Después crece y no para.", note: "KUKA-arm con Drácula: el ride temático más oscuro y bestia de Epic." },
      { name: "Stardust Racers", tag: "thrill", adr: 5, rec: 5, when: "Fácil todo el día (media 15–20 min): mejor al atardecer, cuando el resto está cenando y la luz se pone bonita.", note: "Dos trenes paralelos duelo a 62 mph: el corazón del parque." },
      { name: "Donkey Kong Mine-Cart Madness", tag: "imprescindible", adr: 3, rec: 5, when: "Pico ~120 a media mañana; ~75 ya a las 18:00 y ~60 en la última hora. Ventanas: primera media hora o a partir de las 17:00.", note: "Coaster 'roto' que salta vías: la atracción más viral." },
      { name: "Hiccup's Wing Gliders", tag: "thrill", adr: 4, rec: 4, when: "Media tarde tranquila. El 'Hagrid lite' del parque: lanzamiento suave + vuelo rasante.", note: "Coaster familiar con sabor a coaster seria." },
      { name: "Mario Kart: Bowser's Challenge", tag: "familia", adr: 2, rec: 4, when: "~20 min en la primera hora y ~80 a las dos h de abrir: id antes de las 11:00 o no os molestéis.", note: "AR con gafas: divertido y con theming Nintendo perfecta." },
      { name: "Curse of the Werewolf", tag: "thrill", adr: 3, rec: 3, when: "Junto a Monsters Unchained: hacer en la misma ventana de Dark Universe.", note: "Spin track oscuro en Dark Universe: corto pero con estilo." },
      { name: "Fyre Drill", tag: "mojar", adr: 2, rec: 3, when: "Mediodía, si hace calor: os mojáis de todas formas en esta zona.", note: "Batalla acuática estilo Toon Lagoon." },
      { name: "Dragon Racer's Rally", tag: "familia", adr: 3, rec: 3, when: "Cola corta casi siempre: buen complemento tras Hiccup.", note: "Coaster de duelo (no confundir con Stardust)." },
      { name: "Yoshi's Adventure", tag: "familia", adr: 1, rec: 3, when: "Cualquier momento. Al mediodía está casi vacío: relleno perfecto mientras otros hacen cola.", note: "Paseo panorámico sobre Nintendo World con huevos que buscar." },
      { name: "Constellation Carousel", tag: "familia", adr: 1, rec: 2, when: "Al atardecer en Celestial Park: bonito, pero prescindible para vosotros.", note: "Carrusel de constelaciones: cute, no imperdible." }
    ],
    route: [
      { t: "09:45", kind: "tip", title: "Cola del portal", note: "Epic tiene una sola entrada (Celestial Park): estar en la cola 15 min antes de las 10:00 compra medio ride." },
      { t: "10:00", kind: "ride", title: "Monsters Unchained (Dark Universe)", wait: "~25 min", note: "Directo al fondo del parque. Es la única atracción de Dark Universe con ventana real esta mañana. rec 5/5." },
      { t: "10:40", kind: "ride", title: "Curse of the Werewolf", wait: "~20 min", note: "Mismo world, misma ventana. rec 3/5." },
      { t: "11:10", kind: "ride", title: "Mine-Cart Madness (Nintendo)", wait: "~45 min", note: "Entrad antes del pico de 120 a mediodía. rec 5/5." },
      { t: "12:00", kind: "ride", title: "Mario Kart: Bowser's Challenge", wait: "~30 min", note: "A las 14:00 ya estará en 80: aprovechad ahora. rec 4/5." },
      { t: "12:40", kind: "tip", title: "Yoshi + fotos por Nintendo", wait: "~10 min", note: "Paseo lento por Mushroom Kingdom: el theming se fotografía solo." },
      { t: "13:15", kind: "tip", title: "Pasear París mágica (Ministry of Magic)", note: "NO montéis el Ministry aún: las calles francesas temáticas son ellas mismas una atracción." },
      { t: "14:00", kind: "food", title: "COMER — vuestra hora española", note: "Atlantic (Celestial, vistas a la fuente) o Toadstool Cafe en Nintendo (RESERVA obligatoria en la app). A las 14:00 el parque come tarde: colas de comida mínimas." },
      { t: "15:00", kind: "ride", title: "Hiccup's Wing Gliders", wait: "~30 min", note: "Isle of Berk: el coaster-avión del que no os vais a arrepentir. rec 4/5." },
      { t: "15:45", kind: "ride", title: "Fyre Drill / Dragon Racer's Rally", wait: "~15 min", note: "Relleno de calidad en la misma isla; mojarse si apetece." },
      { t: "16:30", kind: "ride", title: "Stardust Racers", wait: "~15–20 min", note: "La mejor hora: sol bajo, el parque en otra zona y el duelo de naves se ve espectacular. rec 5/5." },
      { t: "17:15", kind: "tip", title: "Celestial Park al anochecer", note: "La fuente musical + Constellation Carousel (rec 2, solo si os chupa): paseo de fotos." },
      { t: "18:00", kind: "ride", title: "Battle at the Ministry", wait: "~35–45 min", note: "Entrad YA: desde las 18:00 cae y la cola temática (el Ministerio entero) es parte del ride. rec 5/5 — el cierre perfecto." },
      { t: "19:00", kind: "ride", title: "Última vuelta", note: "Mine-Cart (~60) o Stardust si queréis repetir: la última hora es la segunda mejor del día." },
      { t: "19:50", kind: "tip", title: "Cena a vuestra hora", note: "El parque cierra la cocina con él: salid y cenad a las 21:00–21:30 en CityWalk (Voodoo, Cowfish) o en Dr. Phillips Boulevard, 15 min en coche." }
    ],
    food: "Toadstool Cafe (Nintendo, RESERVA en app), Atlantic (Celestial Park, vistas a la fuente), stands temáticos por cada world. Comer a las 14:00 = fuera del rush; cenar dentro a las 21:30 = imposible: CityWalk/Dr Phillips tras la salida."
  }
];

/* ═══════════ CHECKLISTS ═══════════ */

const CHECKLISTS = [
  {
    id: "docs", title: "Documentos y dinero", items: [
      "Pasaporte (vigencia +6 meses)",
      "ESTA aprobado (imprimir copia)",
      "Seguro de viaje con cobertura médica",
      "Tarjeta sin comisión por cambio de moneda (Revolut/Wise/N26)",
      "Efectivo mínimo: $100 en billetes pequeños para propinas",
      "Fotos/copia en la nube de pasaporte y póliza"
    ]
  },
  {
    id: "tech", title: "Tecnología", items: [
      "eSIM o roaming activado (Airalo/Holafly o tu operador)",
      "Cargador + adaptador enchufe EE.UU. (tipo A, 120V)",
      "Powerbank cargada",
      "Cable extra y cargador de coche",
      "Descargar offline: Google Maps de Dallas, Atlanta, Orlando, Miami",
      "Apps: My Disney Experience, Universal Orlando, Uber, Lyft",
      "Billetera Apple Wallet con tarjetas y entradas"
    ]
  },
  {
    id: "bag", title: "Mochila de mano", items: [
      "Chaqueta ligera para noches de Dallas/Atlanta (5–10°)",
      "Bañador + toalla de playa (Miami/Orlando)",
      "Protector solar (aunque sea noviembre)",
      "Gafas de sol y gorra",
      "Calzado cómodo: MUCHO andar en parques",
      "Botella reutilizable (agua gratis en fuentes de parques)",
      "Mochila plegable para los días de parque"
    ]
  },
  {
    id: "pre", title: "La semana previa", items: [
      "Comprar entradas de parques si aún no las tenéis (los precios suben)",
      "Reservar restaurantes importantes (Ball & Chain sábado, Versailles, etc.)",
      "Check-in online del vuelo + seats",
      "Avisar al banco de los viajes (evitar bloqueo de tarjeta)",
      "Descargar los PDFs de todas las entradas (offline)",
      "Ajustar hora del móvil al huso local al llegar (automático)"
    ]
  },
  {
    id: "atl-shop", title: "Compra del apartamento (Atlanta)", items: [
      "Agua grande ×2 (2L) + refrescos",
      "Fruta y snacks para la semana",
      "Café e infusiones",
      "Desayunos: huevos, pan, mantequilla, fruta",
      "Comida rápida para noches de MagicCon: pasta, quesos, embutidos",
      "Cerveza/barra de hielo si apetece",
      "Bolsas de basura y jabalo platos (el apartamento suele ir corto)"
    ]
  }
];

/* ═══════════ TIPS USA + SEGURIDAD GLOBAL ═══════════ */

const TIPS = {
  practical: [
    { t: "Reloj español", d: "VENTAJA: coméis a las 14:00 y cenáis a las 21:30, cuando los locales ya terminaron (comida 11:30–14:00, cena 18:00–20:00). Resultado: mesas libres y colas cortas en cualquier sitio. Único límite: las cocinas cierran con el servicio — BBQ cierra 20:00–21:00 y los restaurantes de parque, al cerrar el parque. Regla: para BBQ y food halls, id A las 14:00 o a primera hora de noche; lo demás aguanta vuestra hora." },
    { t: "Propinas", d: "18–20% en restaurante (dejadlo en efectivo o en el ticket). $1–2 por copa en bar. $3–5 al portero del hotel. En fast food NO se propina. Taxistas 15–20%." },
    { t: "Impuestos", d: "El precio que veis en la etiqueta NO incluye el sales tax: se suma en caja (TX ~8.25%, GA ~8.9%, FL 6–7%). Contad +8–9% al total mental." },
    { t: "Propinas y grupos", d: "Restaurantes suelen añadir 'service charge' automático para grupos de 6+: mirad el ticket antes de añadir más." },
    { t: "Enchufes", d: "120V, tomacorriente tipo A/B (dos agujeros planos). Necesitáis adaptador; algunos cargadores ya son bivolt." },
    { t: "Agua", d: "Del grifo potable y gratis en restaurantes (pidan 'tap water with no ice'). Evitad comprar botellas: hay fuentes en todos los parques." },
    { t: "Gasolina", d: "Self-serve (nadie os la llena). En algunos estados (Oregon/NJ) es distinto, pero TX/GA/FL: vosotros mismos. Pago en máquina con tarjeta." },
    { t: "Conducción", d: "Carril izquierdo SOLO para adelantar. Semáforos en rojo: se puede girar a la derecha tras parar (en TX/GA/FL sí, con cuidado). Cinturón obligatorio." },
    { t: "Beber", d: "Edad legal 21. No se puede beber en la calle (open container) en TX/GA; en FL depende del condado. IDs suelen pedirlos aunque tengáis 40 años: llevad el pasaporte." },
    { t: "Compras", d: "Precios sin IVA. 'Tax free' no existe para turistas en EE.UU.: se paga el impuesto igual." },
    { t: "Horarios", d: "Los comercios cierran temprano (20–21h), domingos muchos a las 18h o cerrados. Farmacias (CVS/Walgreens) 24h para imprevistos." },
    { t: "Restaurantes", d: "El menú 'appetizer' es el aperitivo, 'entrée' el principal (¡cuidado!). Pedir para llevar = take out. Pedir la cuenta: 'check, please'." },
    { t: "Emergencias", d: "911 en todo el país. En farmacia, si hay algo raro, el pharmacist puede orientar (aunque no recete antibióticos)." }
  ],
  safetyGlobal: [
    "Regla de oro: en EE.UU., la 'zona turística' y la 'zona hostil' pueden estar a 3 manzanas. Mirad esta guía antes de salir de cada barrio.",
    "Coche de alquiler: nunca nada visible. Ni siquiera el cargador. En los parques, vaciad el maletero antes de entrar.",
    "Teléfono en la calle: no lo miréis en parado en una esquina vacía. Andad con propósito.",
    "Gasolineras de noche: solo las llenas. Bomba, pago, marcha.",
    "Si algo se siente raro, entrar en cualquier sitio abierto (bar, farmacia, hotel) y pedir ayuda. La gente suele ser amable.",
    "Compartid la ubicación en vivo con vuestros móviles durante el viaje (Find My / Google Maps)."
  ]
};
