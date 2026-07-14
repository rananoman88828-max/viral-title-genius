import { useState } from "react";

const formulas = [
  "Why 90% of {niche} Fail At {result}",
  "The #1 Mistake {audience} Make With {topic}",
  "How I Got {result} in {timeframe} Without {pain}",
  "{number} Secrets {experts} Don't Want You To Know About {topic}",
  "Stop Doing This If You Want {result}",
  "The Truth About {topic} Nobody Talks About",
  "I Tried {thing} for {timeframe} - Here's What Happened",
  "How To {result} Even If You {objection}",
];

function calculateScore(title) {
  let score = 50;
  if(title.length > 30 && title.length < 70) score += 15;
  if(title.includes("?") || title.includes("!")) score += 10;
  if(title.match(/\d+/)) score += 10;
  if(title.match(/Why|How|Secrets|Mistake|Stop|Truth/i)) score += 15;
  return Math.min(score, 100);
}

export default function App() {
  const [niche, setNiche] = useState("YouTube");
  const [titles, setTitles] = useState([]);

  const generate = () => {
    const newTitles = formulas.map(f => {
      return f
        .replace("{niche}", niche)
        .replace("{result}", "Viral Views")
        .replace("{audience}", "Beginners")
        .replace("{topic}", niche)
        .replace("{timeframe}", "30 Days")
        .replace("{pain}", "Ads")
        .replace("{number}", "5")
        .replace("{experts}", "Pros")
        .replace("{thing}", "This Strategy")
        .replace("{objection}", "Have 0 Followers");
    });
    setTitles(newTitles);
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  }

  return (
    <div style={{padding:"20px", maxWidth:"700px", margin:"auto", color:"white", background:"#0a0a0a", minHeight:"100vh"}}>
      <h1 style={{color:"#00ff88", textAlign:"center"}}>🚀 Viral Title Genius</h1>
      <p style={{textAlign:"center"}}>Enter your niche and get 8 viral titles instantly</p>
      
      <input 
        value={niche} 
        onChange={e=>setNiche(e.target.value)}
        placeholder="Enter Niche: YouTube, Fitness, Finance"
        style={{width:"100%", padding:"12px", marginBottom:"10px", background:"#1a1a1a", color:"white", border:"1px solid #333", borderRadius:"5px"}}
      />
      <button 
        onClick={generate}
        style={{width:"100%", padding:"12px", background:"#00ff88", color:"black", border:"none", fontWeight:"bold", cursor:"pointer", borderRadius:"5px"}}
      >
        Generate Viral Titles
      </button>

      <div style={{marginTop:"20px"}}>
        {titles.map((t, i) => (
          <div key={i} style={{background:"#1a1a1a", padding:"15px", marginBottom:"10px", borderRadius:"8px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <h3 style={{margin:0, fontSize:"16px", flex:1}}>{t}</h3>
              <span style={{background: calculateScore(t) > 80 ? "#00ff88" : "#ffaa00", color:"black", padding:"5px 10px", borderRadius:"20px", fontWeight:"bold", marginLeft:"10px"}}>
                {calculateScore(t)}
              </span>
            </div>
            <button 
              onClick={()=>copy(t)}
              style={{marginTop:"10px", padding:"8px 15px", background:"#333", color:"white", border:"none", cursor:"pointer", borderRadius:"5px"}}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
}
