const categories=[
 ["memories","Memories · జ్ఞాపకాలు"],["friendship","Friendship · స్నేహం"],["friendship-break","Friendship Break · స్నేహ విరహం"],["love","Love · ప్రేమ"],["heartbreak","Heartbreak · హృదయవేదన"],["life","Life · జీవితం"],["motivation","Motivation · ప్రేరణ"],["devotional","Devotional · భక్తి"],["attitude","Attitude · వైఖరి"],["self-respect","Self-respect · ఆత్మగౌరవం"],["family","Family · కుటుంబం"],["loneliness","Loneliness · ఒంటరితనం"],["indirect-quotes","Indirect Quotes · పరోక్ష మాటలు"]
];
const $=id=>document.getElementById(id);
let quotes=[],index=0,currentCategory="friendship",autoTimer=null,autoPlay=true,animationTimer=null;
const AUTO_DELAY=8000;
const select=$("category");
categories.forEach(([value,label])=>{const o=document.createElement("option");o.value=value;o.textContent=label;select.append(o)});

// Keep the existing design and add a small control using the same button style.
const autoButton=document.createElement("button");
autoButton.type="button";autoButton.className="ghost autoplay-toggle";autoButton.id="autoplay";autoButton.textContent="Ⅱ Pause";
$("copy").insertAdjacentElement("afterend",autoButton);
function updateAutoButton(){autoButton.textContent=autoPlay?"Ⅱ Pause":"▶ Play";autoButton.setAttribute("aria-pressed",String(autoPlay));autoButton.title=autoPlay?"Pause automatic quote rotation":"Resume automatic quote rotation"}
function stopAuto(){if(autoTimer){clearInterval(autoTimer);autoTimer=null}}
function startAuto(){stopAuto();if(!autoPlay||document.hidden||quotes.length<2)return;autoTimer=setInterval(()=>{if(!document.hidden)moveQuote(1,true)},AUTO_DELAY)}
function setAuto(value){autoPlay=value;updateAutoButton();startAuto()}
function animateCard(){const card=document.querySelector(".quote-card");card.classList.remove("quote-enter");void card.offsetWidth;card.classList.add("quote-enter");clearTimeout(animationTimer);animationTimer=setTimeout(()=>card.classList.remove("quote-enter"),650)}
function render(animate=false){
 if(!quotes.length){$("telugu").textContent="ఈ విభాగంలో ఇంకా కోట్స్ లేవు. త్వరలో కొత్త మాటలు చేరతాయి.";$("english").textContent="No quotes in this category yet. Check back soon.";$("quoteNumber").textContent="00 / 00";$("count").textContent="0 quotes";$("prev").disabled=true;$("next").disabled=true;stopAuto();return}
 const q=quotes[index];
 $("categoryName").textContent=currentCategory.replaceAll("-"," ").toUpperCase();
 $("quoteNumber").textContent=String(index+1).padStart(2,"0")+" / "+String(quotes.length).padStart(2,"0");
 $("telugu").textContent=q.telugu;$("english").textContent=q.english;$("transliteration").textContent=q.transliteration||"";
 $("count").textContent=quotes.length+" quotes in this category";
 $("tags").replaceChildren(...(q.tags||[]).map(t=>{const s=document.createElement("span");s.className="tag";s.textContent="#"+t;return s}));
 $("prev").disabled=quotes.length<2;$("next").disabled=quotes.length<2;
 if(animate)animateCard();
}
function moveQuote(direction,fromAuto=false){if(!quotes.length)return;index=(index+direction+quotes.length)%quotes.length;render(true);if(!fromAuto)startAuto()}
async function loadCategory(category){
 currentCategory=category;index=0;stopAuto();$("categoryName").textContent="LOADING";$("telugu").textContent="Loading heartfelt words…";
 try{const res=await fetch("quotes/"+category+".json");if(!res.ok)throw Error("missing category");const data=await res.json();if(!Array.isArray(data))throw Error("invalid quote list");quotes=data;render(true)}
 catch(e){quotes=[];render();$("telugu").textContent="కోట్స్ లోడ్ కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.";$("english").textContent="Unable to load quotes. Please check your connection and try again."}
 startAuto();
}
select.addEventListener("change",e=>loadCategory(e.target.value));
$("prev").addEventListener("click",()=>moveQuote(-1));
$("next").addEventListener("click",()=>moveQuote(1));
autoButton.addEventListener("click",()=>setAuto(!autoPlay));
document.addEventListener("visibilitychange",()=>{if(document.hidden)stopAuto();else startAuto()});
document.addEventListener("keydown",e=>{if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;if(e.key==="ArrowLeft")moveQuote(-1);if(e.key==="ArrowRight")moveQuote(1);if(e.key===" "&&document.activeElement===document.body){e.preventDefault();setAuto(!autoPlay)}});
$("copy").addEventListener("click",async()=>{
 if(!quotes.length)return;const q=quotes[index],value=q.telugu+"\n\n"+q.english;
 try{await navigator.clipboard.writeText(value);$("copy").textContent="Copied ✓";setTimeout(()=>{$("copy").innerHTML='Copy quote <span>↗</span>'},1400)}
 catch{$("copy").textContent="Copy unavailable"}
});
updateAutoButton();loadCategory("friendship");
