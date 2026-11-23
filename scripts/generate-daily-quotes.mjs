import fs from "node:fs/promises";
import path from "node:path";

const categories = ["memories","friendship","friendship-break","love","heartbreak","life","motivation","devotional","attitude","self-respect","family","loneliness","indirect-quotes"];
const fallback = {
  memories: [
    ["కొన్ని జ్ఞాపకాలు మనల్ని వెనక్కి పిలవవు… కానీ మనసును మాత్రం అక్కడే నిలిపేస్తాయి.","Some memories do not call us back, yet they keep the heart standing in the past.","Konni gnapakalu manalni venakki pilavavu… kaani manasunu maatram akkade nilipestayi.","nostalgic",["memories","past","heart"]],
    ["మరిచిపోవడం అంటే జ్ఞాపకాన్ని చెరిపేయడం కాదు; అది గుర్తొచ్చినప్పుడు బాధపడకుండా ఉండటం నేర్చుకోవడం.","Forgetting is not erasing a memory; it is learning not to hurt whenever it returns.","Marichipovadam ante gnapakanni cheripeyadam kaadu; adi gurt vachinappudu baadhapadakunda undatam nerchukovadam.","healing",["healing","memories","acceptance"]]
  ],
  friendship: [
    ["నిజమైన స్నేహం ప్రతిరోజూ మాట్లాడటంలో కాదు… మాట్లాడకపోయినా మనసులో ఒకరికి ఒకరు చోటుండటంలో ఉంటుంది.","True friendship is not about talking every day; it is about keeping a place for each other even in silence.","Nijamaina sneham prathiroju maatladatamlo kaadu… maatladakapoyina manasulo okariki okaru chotu undatamlo untundi.","warm",["friendship","trust","bond"]],
    ["మన విజయానికి చప్పట్లు కొట్టేవాళ్లు చాలామంది ఉంటారు; మన ఓటమిలో చేయి పట్టేవాడే నిజమైన స్నేహితుడు.","Many applaud our success; the one who holds our hand in failure is a true friend.","Mana vijayaniki chappatlu kottevaallu chaalamandi untaru; mana otamilo cheyi pattevaade nijamaina snehitudu.","heartfelt",["friendship","support","loyalty"]]
  ],
  "friendship-break": [
    ["ఒకప్పుడు రోజంతా మాట్లాడిన మనుషులు, చివరికి ఒక చిన్న పలకరింపుకి కూడా దూరమవుతారు.","People who once spoke all day can eventually become distant even from a simple greeting.","Okappudu rojantaa maatladina manushulu, chivariki oka chinna palakarimpuki kooda dooramavuthaaru.","bittersweet",["distance","friendship","memories"]],
    ["స్నేహం ముగిసిందని ప్రతి జ్ఞాపకాన్ని ద్వేషించాల్సిన అవసరం లేదు; కొన్ని బంధాలు మనకు ఒక పాఠం నేర్పి వెళ్తాయి.","A friendship ending does not mean every memory must be hated; some bonds leave after teaching us a lesson.","Sneham mugisindani prati gnapakanni dveshinchaalsina avasaram ledu; konni bandhaalu manaku oka paatham nerpi veltaayi.","accepting",["acceptance","friendship-break","growth"]]
  ],
  love: [
    ["ప్రేమలో గొప్పతనం ఖరీదైన బహుమతుల్లో కాదు… చిన్న విషయాల్లోనూ మనసును గుర్తుపెట్టుకోవడంలో ఉంటుంది.","The beauty of love is not in expensive gifts, but in remembering the heart through little things.","Premalo goppatanam khareedaina bahumatullo kaadu… chinna vishayallono manasunu gurtupettukovadamlo untundi.","romantic",["love","care","little-things"]],
    ["నిజమైన ప్రేమ మనల్ని మార్చమని బలవంతం చేయదు; మనల్ని అర్థం చేసుకుంటూ ఎదగడానికి తోడుంటుంది.","True love does not force us to change; it supports us as we grow while feeling understood.","Nijamaina prema manalni maarchamani balavantham cheyadu; manalni artham chesukuntu edagadaniki thoduntundi.","hopeful",["love","understanding","growth"]]
  ],
  heartbreak: [
    ["బాధ పెట్టింది దూరం కాదు… దగ్గరగా ఉంటానన్న మాటను నమ్మిన మనసే.","It was not the distance that hurt, but the heart that trusted the promise of staying close.","Baadha pettindi dooram kaadu… daggaraga untaannanna maatanu nammina manase.","sad",["heartbreak","trust","distance"]],
    ["కొన్ని కన్నీళ్లు ఎదుటివారికి కనిపించవు; కానీ మనలోని బలాన్ని నెమ్మదిగా పెంచుతాయి.","Some tears are unseen by others, yet they slowly build strength within us.","Konni kannillu edutivaariki kanipinchavu; kaani manaloni balaanni nemmadiga penchutaayi.","healing",["tears","strength","healing"]]
  ],
  life: [
    ["జీవితం మనం అనుకున్నట్టే సాగకపోవచ్చు; అయినా ప్రతి మలుపు మనకు ఏదో ఒకటి నేర్పుతుంది.","Life may not unfold as we planned, yet every turn teaches us something.","Jeevitham manam anukunnatte saagakapovachu; ayina prati malupu manaku edo okati nerputundi.","reflective",["life","lessons","journey"]],
    ["నెమ్మదిగా సాగుతున్నావని ఆగిపోయావని కాదు; నీ ప్రయాణానికి నీదైన వేగం ఉంటుంది.","Moving slowly does not mean you have stopped; your journey has its own pace.","Nemmadiga saaguthunnaavani aagipoyaavani kaadu; nee prayaananiki needaina vegam untundi.","encouraging",["life","patience","progress"]]
  ],
  motivation: [
    ["ఈరోజు వేసే చిన్న అడుగు కూడా రేపటి పెద్ద మార్పుకు ఆరంభం కావచ్చు.","A small step taken today can become the beginning of a big change tomorrow.","Eeroju vese chinna adugu kooda repati pedda maarpuku aarambham kaavachu.","motivational",["motivation","action","progress"]],
    ["ఫలితం ఆలస్యమైనా ప్రయత్నాన్ని ఆపకు; నీ క్రమశిక్షణే ఒకరోజు నీ సమాధానమవుతుంది.","Even if results are delayed, do not stop trying; your discipline will become your answer one day.","Phalitham aalasyamaina prayatnanni aapaku; nee kramashikshane okaroju nee samaadhaanamavuthundi.","determined",["discipline","effort","success"]]
  ],
  devotional: [
    ["ప్రార్థనలో అడిగేది పరిష్కారం మాత్రమే కాదు… ఎదుర్కొనే ధైర్యం కూడా కావాలి.","Prayer asks not only for a solution, but also for the courage to face what comes.","Praarthanalo adigedi parishkaaram maatrame kaadu… edurukone dhairyam kooda kaavaali.","faithful",["prayer","courage","faith"]],
    ["దైవంపై నమ్మకం ఉన్నప్పుడు దారి కష్టమైనా మనసులో ఆశ వెలుగుతూనే ఉంటుంది.","With faith in the divine, hope continues to shine in the heart even when the path is difficult.","Daivampai nammakam unnappudu daari kashtamaina manasulo aasha velugutoone untundi.","peaceful",["devotion","hope","faith"]]
  ],
  attitude: [
    ["నా విలువను అందరూ గుర్తించాల్సిన అవసరం లేదు; నాకు తెలిసి ఉంటే చాలు.","Not everyone needs to recognize my worth; it is enough that I know it.","Naa viluvanu andaru gurthinchaalsina avasaram ledu; naaku telisi unte chaalu.","confident",["attitude","confidence","worth"]],
    ["నిశ్శబ్దంగా ఉండటం బలహీనత కాదు; ప్రతి విషయానికి సమాధానం చెప్పాల్సిన అవసరం లేదని తెలిసిన పరిపక్వత.","Silence is not weakness; it is the maturity of knowing that not everything needs an answer.","Nishshabdanga undatam balheenatha kaadu; prati vishayaaniki samaadhaanam cheppaalsina avasaram ledani telisina paripakvatha.","bold",["silence","maturity","attitude"]]
  ],
  "self-respect": [
    ["ఎవరినీ కోల్పోకూడదనే భయంతో నిన్ను నువ్వు కోల్పోకు.","Do not lose yourself out of fear of losing someone else.","Evarini kolpokoodadane bhayanto ninnu nuvvu kolpoku.","empowering",["self-respect","boundaries","worth"]],
    ["గౌరవం అడిగి పొందేది కాదు; మన నిర్ణయాల్లోనూ ప్రవర్తనలోనూ చూపించేది.","Respect is not something to beg for; it is reflected in our choices and actions.","Gauravam adigi pondedi kaadu; mana nirnayaallono pravarthanalono choopinchedi.","confident",["respect","dignity","boundaries"]]
  ],
  family: [
    ["మన విజయాన్ని మనకంటే ఎక్కువగా సంబరపడేవాళ్లు ఇంట్లో ఉంటారు; అదే కుటుంబం ఇచ్చే ప్రేమ.","At home are people who celebrate our success even more than we do; that is family love.","Mana vijayaanni manakante ekkuvaga sambara padevaallu intlo untaaru; ade kutumbam iche prema.","grateful",["family","love","support"]],
    ["ఎన్ని దూరాలు వెళ్లినా మనసుకు విశ్రాంతి ఇచ్చే చోటు కుటుంబం దగ్గరే ఉంటుంది.","No matter how far we travel, the place where the heart rests is with family.","Enni dooraalu vellina manasuku vishraanti iche chotu kutumbam daggare untundi.","warm",["family","home","belonging"]]
  ],
  loneliness: [
    ["చుట్టూ చాలామంది ఉన్నా మనసులోని మాట వినేవారు లేకపోతే ఒంటరితనం అనిపిస్తుంది.","Loneliness can remain even in a crowd when no one listens to what is in our heart.","Chutto chaalamandi unna manasuloni maata vinevaaru lekapothe ontarithanam anipistundi.","melancholic",["loneliness","understanding","emotions"]],
    ["ఒంటరిగా ఉన్న సమయం శూన్యం కాదు; మనల్ని మనం అర్థం చేసుకునే అవకాశం కూడా.","Time spent alone is not empty; it can be a chance to understand ourselves.","Ontariga unna samayam shoonyam kaadu; manalni manam artham chesukune avakaasham kooda.","reflective",["solitude","self-growth","peace"]]
  ],
  "indirect-quotes": [
    ["మాటలు అందరికీ వినిపిస్తాయి… కానీ వాటి వెనుక ఉన్న భావం కొందరికే అర్థమవుతుంది.","Words are heard by everyone, but only a few understand the feelings behind them.","Maatalu andariki vinipistaayi… kaani vaati venuka unna bhaavam kondarike arthamavuthundi.","subtle",["indirect","feelings","understanding"]],
    ["కాలం సమాధానం చెప్పినప్పుడు, మనం మౌనంగా ఉండటం కూడా ఒక గెలుపే.","When time gives the answer, remaining silent can itself be a victory.","Kaalam samaadhaanam cheppinappudu, manam mounanga undatam kooda oka gelupe.","calm",["indirect","silence","time"]]
  ]
};

const normalize = value => value.replace(/[\s\p{P}\p{S}]/gu, "").toLowerCase();
const prefix = category => ({memories:"MEM",friendship:"FRI","friendship-break":"FRB",love:"LOV",heartbreak:"HEA",life:"LIF",motivation:"MOT",devotional:"DEV",attitude:"ATT","self-respect":"SEL",family:"FAM",loneliness:"LON","indirect-quotes":"IND"}[category]);

let totalAdded = 0;
for (const category of categories) {
  const file = path.join("quotes", category + ".json");
  const existing = JSON.parse(await fs.readFile(file, "utf8"));
  const known = new Set(existing.map(q => normalize(q.telugu)));
  let added = 0;
  for (const [telugu, english, transliteration, mood, tags] of fallback[category]) {
    if (known.has(normalize(telugu))) continue;
    const next = Math.max(0, ...existing.map(q => Number(q.id?.match(/(\d+)$/)?.[1] || 0))) + 1;
    const id = prefix(category) + String(next).padStart(3, "0");
    existing.push({ id, category, telugu, english, transliteration, mood, tags });
    known.add(normalize(telugu));
    added++;
  }
  if (added) {
    await fs.writeFile(file, JSON.stringify(existing, null, 2) + "\n");
    console.log(`Added ${added} quotes to ${file}`);
    totalAdded += added;
  } else {
    console.log(`No new fallback quotes for ${category}; already present.`);
  }
}
console.log(`Finished: added ${totalAdded} quotes across ${categories.length} categories. This offline fallback does not require an API key or credits.`);
