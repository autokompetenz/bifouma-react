export const projects = [
  {
    slug: 'green-energy-grid',
    sector: 'energy',
    country: 'de',
    risk: 'low',
    target: 250000,
    raised: 162000,
    durationMonths: 36,
    returnRate: 8,
    progress: 65,
    image: '/assets/images/product/product-1.jpg',
    content: {
      de: {
        title: 'Solarpark Baden-Württemberg',
        intro: 'Ausbau einer Photovoltaikanlage im Südwesten Deutschlands mit langfristigen Einspeiseverträgen.',
        description:
          'Das Projekt erweitert eine bestehende Photovoltaik-Anlage auf 12 MW. Langfristige Einspeiseverträge und ein moderates Risikoprofil sichern eine zuverlässige Rendite.',
        conclusion:
          'Hohe Nachfrage nach Grünstrom, feste Vergütungssätze und ein etablierter Betreiber machen dieses Projekt zu einer stabilen, mittelfristigen Anlage.',
        docs: ['Businessplan (PDF)', 'Technische Analyse (PDF)', 'Ertragsprognose 3 Jahre (PDF)'],
      },
      fi: {
        title: 'Aurinkovoimala Baden-Württemberg',
        intro: 'Fotovoimalan laajennus Lounais-Saksassa pitkäaikaisilla syöttötariffeilla.',
        description:
          'Hanke laajentaa olemassa olevaa aurinkovoimalaa 12 MW:ään. Pitkäaikaiset syöttösopimukset ja maltillinen riskiprofiili takaavat luotettavan tuoton.',
        conclusion:
          'Vihreän sähkön vahva kysyntä, kiinteät korvaukset ja vakiintunut toimija tekevät tästä vakaasta, keskipitkän aikavälin sijoituksesta.',
        docs: ['Liiketoimintasuunnitelma (PDF)', 'Tekninen analyysi (PDF)', 'Tuottoennuste 3 v (PDF)'],
      },
      sr: {
        title: 'Соларна електрана Баден-Виртемберг',
        intro: 'Проширење фотонапонске електране у југозападној Немачкој са дугорочним уговорима о откупу.',
        description:
          'Пројекат проширује постојећу фотонапонску електрану на 12 MW. Дугорочни уговори и умерени ризик обезбеђују поуздан принос.',
        conclusion:
          'Велика потражња за зеленом енергијом, фиксне откупне цене и искусан оператер чине овај пројекат стабилним, средњорочним улагањем.',
        docs: ['Пословни план (PDF)', 'Техничка анализа (PDF)', 'Прогноза приноса 3 год (PDF)'],
      },
      fr: {
        title: 'Parc solaire Bade-Wurtemberg',
        intro: 'Extension d\'une centrale photovoltaïque dans le sud-ouest de l\'Allemagne, avec contrats de reprise à long terme.',
        description:
          'Le projet porte l\'extension d\'une centrale photovoltaïque existante à 12 MW. Les contrats de reprise à long terme et un profil de risque modéré garantissent un rendement fiable.',
        conclusion:
          'La forte demande d\'électricité verte, des tarifs de reprise fixes et un exploitant établi font de ce projet un placement stable à moyen terme.',
        docs: ['Plan d\'affaires (PDF)', 'Analyse technique (PDF)', 'Prévision de rendement 3 ans (PDF)'],
      },
    },
  },
  {
    slug: 'logistics-hub',
    sector: 'realestate',
    country: 'fi',
    risk: 'medium',
    target: 400000,
    raised: 210000,
    durationMonths: 48,
    returnRate: 11,
    progress: 52,
    image: '/assets/images/product/product-2.jpg',
    content: {
      de: {
        title: 'Logistikzentrum Helsinki',
        intro: 'Modernes Logistik- und Lagerzentrum in der Metropolregion Helsinki.',
        description:
          'Bau eines 15.000 m² großen Logistikzentrums in Helsinki mit langfristigen Mietverträgen mit zwei großen Handelsunternehmen.',
        conclusion:
          'Kurzfristig neu­ge­schlos­se­ne Miet­ver­träge, die starke Logistik­nachfrage im Norden und eine sichtbare Bau­fort­schritts­rate sprechen für eine über­durch­schnitt­liche Wert­entwicklung.',
        docs: ['Gutachten (PDF)', 'Mietverträge (PDF)', 'Kostenaufstellung (PDF)'],
      },
      fi: {
        title: 'Helsingin logistiikkakeskus',
        intro: 'Moderni logistiikka- ja varastokeskus Helsingin metropolialueella.',
        description:
          '15 000 m² logistiikkakeskuksen rakentaminen Helsinkiin pitkäaikaisilla vuokrasopimuksilla kahden suuren kauppayrityksen kanssa.',
        conclusion:
          'Äskettäin solmitut vuokrasopimukset, vahva pohjoismainen logistiikkakysyntä ja näkyvä rakennustilanne puoltavat keskimääräistä parempaa arvonkehitystä.',
        docs: ['Arviot (PDF)', 'Vuokrasopimukset (PDF)', 'Kustannusarvio (PDF)'],
      },
      sr: {
        title: 'Логистички центар Хелсинки',
        intro: 'Савремени логистички и магацински центар у региону Хелсинкија.',
        description:
          'Изградња логистичког центра од 15.000 м² у Хелсинкију са дугорочним закупима са две велике трговинске компаније.',
        conclusion:
          'Недавно потписани уговори о закупу, јака северна потражња за логистиком и видљив напредак у изградњи говоре у прилог надпросечном порасту вредности.',
        docs: ['Процене (PDF)', 'Уговори о закупу (PDF)', 'Трошковник (PDF)'],
      },
      fr: {
        title: 'Centre logistique Helsinki',
        intro: 'Centre logistique et d\'entreposage moderne dans la région métropolitaine d\'Helsinki.',
        description:
          'Construction d\'un centre logistique de 15 000 m² à Helsinki, avec baux à long terme conclus avec deux grandes entreprises de distribution.',
        conclusion:
          'Des baux récemment signés, une forte demande logistique dans les pays nordiques et un avancement visible des travaux plaident pour une valorisation supérieure à la moyenne.',
        docs: ['Expertise (PDF)', 'Baux de location (PDF)', 'Décomposition des coûts (PDF)'],
      },
    },
  },
  {
    slug: 'agrotech-serbia',
    sector: 'agro',
    country: 'sr',
    risk: 'medium',
    target: 150000,
    raised: 98000,
    durationMonths: 24,
    returnRate: 14,
    progress: 66,
    image: '/assets/images/product/product-3.jpg',
    content: {
      de: {
        title: 'AgroTech Vojvodina',
        intro: 'Moderne Gewächshäuser mit Bewässerung und Export nach Zentraleuropa.',
        description:
          'Errichtung von 6 ha modernen Gewächshäusern in der Vojvodina mit automatischer Bewässerung und Exportverträgen in die EU.',
        conclusion:
          'Geringe Betriebskosten, direkte Exportverträge und staatliche Förderung der Landwirtschaft erhöhen die Rentabilität deutlich.',
        docs: ['Machbarkeitsstudie (PDF)', 'Exportverträge (PDF)', 'Förderbescheid (PDF)'],
      },
      fi: {
        title: 'AgroTech Vojvodina',
        intro: 'Nykyaikaisia kasvihuoneita kastelujärjestelmin ja vientiä Keski-Eurooppaan.',
        description:
          '6 hehtaarin nykyaikaisten kasvihuoneiden rakentaminen Vojvodinaan automaattisella kastelulla ja vientisopimuksilla EU:hun.',
        conclusion:
          'Alhaiset käyttökustannukset, suorat vientisopimukset ja valtion maataloustuki nostavat kannattavuutta merkittävästi.',
        docs: ['Toteutettavuustutkimus (PDF)', 'Vientisopimukset (PDF)', 'Tukipäätös (PDF)'],
      },
      sr: {
        title: 'АгроТех Војводина',
        intro: 'Савремени стакленици са наводњавањем и извоз у Централну Европу.',
        description:
          'Изградња 6 ha савремених стакленика у Војводини са аутоматским наводњавањем и извозним уговорима у ЕУ.',
        conclusion:
          'Ниски оперативни трошкови, директни извозни уговори и државне субвенције у пољопривреди значајно повећавају рентабилност.',
        docs: ['Студија изводљивости (PDF)', 'Извозни уговори (PDF)', 'Решење о субвенцијама (PDF)'],
      },
      fr: {
        title: 'AgroTech Voïvodine',
        intro: 'Serres modernes avec irrigation et exportation vers l\'Europe centrale.',
        description:
          'Construction de 6 hectares de serres modernes en Voïvodine avec irrigation automatique et contrats d\'exportation vers l\'UE.',
        conclusion:
          'Des coûts d\'exploitation réduits, des contrats d\'exportation directs et le soutien public à l\'agriculture augmentent nettement la rentabilité.',
        docs: ['Étude de faisabilité (PDF)', 'Contrats d\'exportation (PDF)', 'Avis de subvention (PDF)'],
      },
    },
  },
  {
    slug: 'urbandevelopment-belgrade',
    sector: 'realestate',
    country: 'sr',
    risk: 'high',
    target: 600000,
    raised: 240000,
    durationMonths: 60,
    returnRate: 16,
    progress: 40,
    image: '/assets/images/product/product-4.jpg',
    content: {
      de: {
        title: 'Wohngebiet Belgrad-Ufer',
        intro: 'Wohnbauprojekt am Belgrader Donauufer mit hohem Renditepotenzial.',
        description:
          'Entwicklung eines Wohnquartiers mit 240 Wohneinheiten am Belgrader Donauufer, inklusive Erschließung und Gewerbeflächen.',
        conclusion:
          'Steigende Immobilienpreise in Belgrad und ein begehrter Standort bieten hohes Potenzial bei entsprechendem Risikobewusstsein.',
        docs: ['Machbarkeitsstudie (PDF)', 'Städtebaulicher Plan (PDF)', 'Marktanalyse (PDF)'],
      },
      fi: {
        title: 'Asuinalue Belgradin rannalla',
        intro: 'Asuinrakennushanke Belgradin Tonavan rannalla, jossa on korkea tuottopotentiaali.',
        description:
          '240 asunnon asuinkorttelin kehittäminen Belgradin Tonavan rannalle, mukaan lukien infra ja liiketilat.',
        conclusion:
          'Belgradin nousevat asuntohinnat ja haluttu sijainti tarjoavat korkeaa potentiaalia vastaavasta riskitietoisuudesta huolimatta.',
        docs: ['Toteutettavuustutkimus (PDF)', 'Kaavasuunnitelma (PDF)', 'Markkina-analyysi (PDF)'],
      },
      sr: {
        title: 'Стамбено насеље Београд на води',
        intro: 'Стамбени пројекат на београдској обали Дунава са високим потенцијалом приноса.',
        description:
          'Развој стамбеног кварта са 240 станова на београдској обали Дунава, укључујући инфраструктуру и пословне просторе.',
        conclusion:
          'Растуће цене некретнина у Београду и атрактивна локација нуде висок потенцијал уз одговарајућу свест о ризику.',
        docs: ['Студија изводљивости (PDF)', 'Урбанистички план (PDF)', 'Анализа тржишта (PDF)'],
      },
      fr: {
        title: 'Quartier résidentiel Belgrade rive',
        intro: 'Projet de construction résidentielle sur la rive du Danube à Belgrade, à fort potentiel de rendement.',
        description:
          'Développement d\'un quartier de 240 logements sur la rive du Danube à Belgrade, incluant les travaux d\'aménagement et des surfaces commerciales.',
        conclusion:
          'La hausse des prix de l\'immobilier à Belgrade et un emplacement très recherché offrent un fort potentiel, moyennant une conscience accrue des risques.',
        docs: ['Étude de faisabilité (PDF)', 'Plan d\'urbanisme (PDF)', 'Analyse de marché (PDF)'],
      },
    },
  },
  {
    slug: 'fish-farm-serbia',
    sector: 'agro',
    country: 'sr',
    risk: 'low',
    target: 85000,
    raised: 72000,
    durationMonths: 18,
    returnRate: 10,
    progress: 85,
    image: '/assets/images/product/product-5.jpg',
    content: {
      de: {
        title: 'Forellenzucht Donau',
        intro: 'Erweiterung einer Forellenzuchtanlage mit Direktvertrieb.',
        description:
          'Modernisierung und Erweiterung einer Forellenzuchtanlage an der Donau, inklusive Kühlhaus und Direktvertrieb an Gastronomie.',
        conclusion:
          'Der kurze Rückzahlungszeitraum und der gesicherte Absatz über Direktverträge machen dies zu einem der sichersten Projekte im Portfolio.',
        docs: ['Betriebskonzept (PDF)', 'Vertriebsverträge (PDF)', 'Umweltverträglichkeitsprüfung (PDF)'],
      },
      fi: {
        title: 'Tonavan kirjolohvilaitos',
        intro: 'Kirjolohvilaitoksen laajennus suoramyynnillä.',
        description:
          'Kirjolohvilaitoksen modernisointi ja laajennus Tonavan varrella, mukaan lukien kylmävarasto ja suoramyynti ravintola-alalle.',
        conclusion:
          'Lyhyt takaisinmaksuaika ja varma myynti suorilla sopimuksilla tekevät tästä yhden portfolio n turvallisimmista projekteista.',
        docs: ['Toimintasuunnitelma (PDF)', 'Myyntisopimukset (PDF)', 'Ympäristövaikutusten arviointi (PDF)'],
      },
      sr: {
        title: 'Узгој пастрмке Дунав',
        intro: 'Проширење узгоја пастрмке са директном продајом.',
        description:
          'Модернизација и проширење узгоја пастрмке на Дунаву, укључујући хладњачу и директну продају угоститељству.',
        conclusion:
          'Кратак период отплате и обезбеђена продаја кроз директне уговоре чине ово једним од најсигурнијих пројеката у портфолију.',
        docs: ['Пословни концепт (PDF)', 'Уговори о продаји (PDF)', 'Процена утицаја на животну средину (PDF)'],
      },
      fr: {
        title: 'Élevage de truites Danube',
        intro: 'Extension d\'une installation d\'élevage de truites avec vente directe.',
        description:
          'Modernisation et extension d\'une installation d\'élevage de truites au bord du Danube, incluant une chambre froide et la vente directe à la restauration.',
        conclusion:
          'Le délai de remboursement court et un débouché garanti via des contrats directs en font l\'un des projets les plus sûrs du portefeuille.',
        docs: ['Concept d\'exploitation (PDF)', 'Contrats de distribution (PDF)', 'Étude d\'impact environnemental (PDF)'],
      },
    },
  },
  {
    slug: 'retail-tampere',
    sector: 'retail',
    country: 'fi',
    risk: 'low',
    target: 120000,
    raised: 95000,
    durationMonths: 30,
    returnRate: 9,
    progress: 79,
    image: '/assets/images/product/product-6.jpg',
    content: {
      de: {
        title: 'Einzelhandel Tampere',
        intro: 'Aufbau eines Geschäftsnetzwerks in zwei finnischen Städten.',
        description:
          'Etablierung eines erfolgreichen Einzelhandelskonzepts in Tampere und Turku mit Logistik und Online-Vertrieb.',
        conclusion:
          'Das Konzept ist bereits in einer Stadt erfolgreich erprobt; die Skalierung ist durch die vorhandene Nachfrage gut abgesichert.',
        docs: ['Geschäftsmodell (PDF)', 'Umsatzplanung (PDF)', 'Standortanalysen (PDF)'],
      },
      fi: {
        title: 'Vähittäiskauppa Tampere',
        intro: 'Kauppaverkoston perustaminen kahdessa suomalaisessa kaupungissa.',
        description:
          'Menestyneen vähittäiskauppakonseptin vakiinnuttaminen Tampereella ja Turussa logistiikalla ja verkkomyynnillä.',
        conclusion:
          'Konsepti on jo menestyksekkäästi kokeiltu yhdessä kaupungissa; skaalaaminen on hyvin tuettu olemassa olevalla kysynnällä.',
        docs: ['Liiketoimintamalli (PDF)', 'Myyntisuunnitelma (PDF)', 'Toimipaikka-analyysit (PDF)'],
      },
      sr: {
        title: 'Малопродаја Тампере',
        intro: 'Успостављање мреже продавница у два финска града.',
        description:
          'Успостављање успешног концепта малопродаје у Тампереу и Турку са логистиком и онлајн продајом.',
        conclusion:
          'Концепт је већ успешно испробан у једном граду; скалирање је добро поткрепљено постојећом потражњом.',
        docs: ['Пословни модел (PDF)', 'План прихода (PDF)', 'Анализе локација (PDF)'],
      },
      fr: {
        title: 'Commerce de détail Tampere',
        intro: 'Déploiement d\'un réseau de magasins dans deux villes finlandaises.',
        description:
          'Institutionnalisation d\'un concept de commerce de détail performant à Tampere et à Turku, avec logistique et vente en ligne.',
        conclusion:
          'Le concept a déjà fait ses preuves dans une ville ; la montée en charge est solidement soutenue par la demande existante.',
        docs: ['Modèle économique (PDF)', 'Planification des ventes (PDF)', 'Analyses de localisation (PDF)'],
      },
    },
  },
];

export const sectorLabels = {
  energy: { de: 'Energie', fi: 'Energia', sr: 'Energija', fr: 'Énergie' },
  realestate: { de: 'Immobilien', fi: 'Kiinteistöt', sr: 'Nekretnine', fr: 'Immobilier' },
  agro: { de: 'Landwirtschaft', fi: 'Maatalous', sr: 'Poljoprivreda', fr: 'Agriculture' },
  retail: { de: 'Handel', fi: 'Kauppa', sr: 'Trgovina', fr: 'Commerce' },
};

export const riskLabels = {
  low: { de: 'Gering', fi: 'Matala', sr: 'Nizak', fr: 'Faible' },
  medium: { de: 'Mittel', fi: 'Keskitaso', sr: 'Srednji', fr: 'Moyen' },
  high: { de: 'Hoch', fi: 'Korkea', sr: 'Visok', fr: 'Élevé' },
};

export const countryLabels = {
  de: { de: 'Deutschland', fi: 'Saksa', sr: 'Njemačka', fr: 'Allemagne' },
  fi: { de: 'Finnland', fi: 'Suomi', sr: 'Finska', fr: 'Finlande' },
  sr: { de: 'Serbien', fi: 'Serbia', sr: 'Srbija', fr: 'Serbie' },
};