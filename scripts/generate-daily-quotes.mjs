import fs from "node:fs/promises";
import path from "node:path";
const key=process.env.OPENAI_API_KEY;
if(!key) throw new Error("OPENAI_API_KEY secret is required");
const dir="quotes";
const categories=["memories","friendship","friendship-break","love","heartbreak","life","motivation","devotional","attitude","self-respect","family","loneliness","indirect-quotes"];
const now=new Date();\nconst dayOfYear=Math.floor((Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate())-Date.UTC(now.getUTCFullYear(),0,0))/86400000);\nconst category=categories[dayOfYear%categories.length];
const file=path.join(dir,category+".json");
const existing=JSON.parse(await fs.readFile(file,"utf8"));
const recent=existing.slice(-80).map(q=>q.telugu);
const prompt=`Create exactly 2 original, emotionally meaningful Telugu quotes for category "${category}". At least one should be a longer quote (3-5 natural Telugu sentences), not a slogan. Return ONLY a JSON array. Each object must have: telugu, english (faithful English meaning), transliteration (Telugu written in Latin letters), mood, tags (array of 3-5 strings). Use natural conversational Telugu, correct spelling, no copied lyrics/poems, no quotes that shame or target a person. For friendship-break, focus on distance, one-sided effort, unspoken feelings, memories, acceptance and self-respect without bitterness. Avoid these existing Telugu quotes and close paraphrases: ${JSON.stringify(recent)}`;
const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4o-mini",temperature:0.9,response_format:{type:"json_object"},messages:[{role:"system",content:"You write original Telugu quotes with natural grammar and emotionally faithful English translations. Output valid JSON only."},{role:"user",content:prompt.replace("Return ONLY a JSON array.","Return a JSON object with one property named quotes whose value is an array.")}]})});
if(!response.ok)throw new Error(`OpenAI API failed: ${response.status} ${await response.text()}`);
const payload=await response.json();
const parsed=JSON.parse(payload.choices?.[0]?.message?.content||"{}");
const generated=parsed.quotes;
if(!Array.isArray(generated)||generated.length!==2)throw new Error("Expected exactly two quotes in JSON property 'quotes'");
const normalize=s=>s.replace(/[\s\p{P}\p{S}]/gu,"").toLowerCase();
const known=new Set(existing.map(q=>normalize(q.telugu)));
let added=0;
for(const item of generated){
 if(!item.telugu||!item.english||!item.transliteration||!item.mood||!Array.isArray(item.tags))throw new Error("Generated quote is missing required fields");
 if(known.has(normalize(item.telugu)))continue;
 const prefix=category.toUpperCase().replace(/[^A-Z]/g,"").slice(0,3)||"QUO";
 const next=Math.max(0,...existing.map(q=>Number(q.id?.match(/(\d+)$/)?.[1]||0)))+1;
 const id=prefix+String(next+added).padStart(3,"0");
 existing.push({id,category,...item});
 known.add(normalize(item.telugu));added++;
}
if(added===0){console.log("Both generated quotes matched existing content; no commit needed.");process.exit(0)}
await fs.writeFile(file,JSON.stringify(existing,null,2)+"\n");
console.log(`Added ${added} original quotes to ${file}`);
