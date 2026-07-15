import { useState } from "react";

const formulas = [
  "Why 90% of {niche} Fail At {result}",
  "The #1 Mistake {audience} Make With {topic}",
  "How I Got {result} in {timeframe} Without {objection}",
  "{number} Secrets {experts} Don't Want You To Know About {topic}",
  "Stop Doing This If You Want {result}",
  "The Truth About {topic} Nobody Talks About",
  "I Tried {thing} for {timeframe} - Here's What Happened",
  "How To {result} Even If You {objection}"
];

function calculateScore(title) {
  let score = 50;
  if (title.length > 30 && title.length < 70) score += 15;
  if (title.includes("?") || title.includes("!")) score += 10;
  if (title.match(/\d+/)) score += 10;
  if (title.match(/Why|How|Secrets|Mistake|Truth/)) score += 15;
  return Math.min(score, 100);
}

export default function App() {
  const [niche, setNiche] = useState("YouTube");
  const [result, setResult] = useState("Viral");
  const [titles, setTitles] = useState([]);

  const generate = () => {
    const newTitles = formulas.slice(0, 5).map(f => {
      return f.replace("{niche}", niche).replace("{result}", result).replace("{topic}", niche).replace("{audience}", "Creators").replace("{timeframe}", "30 Days").replace("{objection}", "Ads").replace("{number}", "7").replace("{experts}", "Pros").replace("{thing}", niche);
    });
    setTitles(newTitles);
  };

  return (
    <div style={{padding: "30px", background: "#0f0f0f", color: "white", minHeight: "100vh", fontFamily: "Arial"}}>
      <h1>🔥 Viral Title Genius</h1>
      <input value={niche} onChange={e => setNiche(e.target.value)} placeholder="Niche" style={{padding: "10px", margin: "5px", borderRadius: "5px"}} />
      <input value={result} onChange={e => setResult(e.target.value)} placeholder="Result" style={{padding: "10px", margin: "5px", borderRadius: "5px"}} />
      <br/>
      <button onClick={generate} style={{padding: "12px 25px", margin: "10px", background: "red", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold"}}>
        Generate Viral Titles
      </button>
      
      <div style={{marginTop: "20px"}}>
        {titles.map((t, i) => (
          <div key={i} style={{background: "#1a1a1a", padding: "15px", margin: "10px 0", borderRadius: "8px"}}>
            <p>{t}</p>
            <b>Score: {calculateScore(t)}/100</b>
          </div>
        ))}
      </div>
    </div>
  );
}
