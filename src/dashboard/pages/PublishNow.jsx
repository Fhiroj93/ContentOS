import { useState } from "react";

const PLATFORM_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "X / Twitter" },
  { value: "blog", label: "Blog" },
];

const MOCK_DRAFTS = {
  linkedin: (topic) => `Most people in SaaS misunderstand "${topic}."

Here's what 3 years of data actually shows — and why the conventional wisdom is wrong.

→ The problem isn't what you think
→ The solution is simpler than any framework
→ The teams getting this right share one thing in common

The insight that changed how we approach this:

[Core insight about ${topic} goes here — crafted to your brand voice]

The result: teams that adopt this see measurable improvement within 30 days.

What's your experience been with this?

#SaaS #ProductGrowth #Startups`,

  twitter: (topic) => `A thread on "${topic}" — and why most SaaS teams get this completely wrong 🧵

1/ The standard advice is to [conventional approach]. We tried it. It doesn't work.

2/ Here's what the data actually shows about ${topic}...

3/ The counterintuitive truth: [insight]

4/ What we changed based on this: [action]

5/ Result after 30 days: measurable improvement across all key metrics

6/ The single framework that made this click for us: [framework]

7/ How to apply this in your SaaS in one week: [steps]

8/ If you found this useful, follow for more SaaS growth breakdowns every week.`,

  blog: (topic) => `# ${topic}: The Complete Guide for SaaS Teams in 2025

## Introduction

Most SaaS teams treat ${topic} as an afterthought. This guide is for the teams who want to treat it as a growth lever.

## Why this matters now

The landscape has changed. [Context about why ${topic} is critical in 2025]

## The common mistakes

### Mistake 1: [First mistake]
Most teams do X. The data shows Y works better.

### Mistake 2: [Second mistake]
[Explanation with evidence]

## The framework that works

[Step-by-step breakdown]

## Real examples from SaaS teams

[Case study or example]

## How to get started this week

1. [First action step]
2. [Second action step]
3. [Third action step]

## Conclusion

${topic} doesn't have to be complicated. Start with these steps and measure the results after 30 days.`,
};

export default function PublishNow() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("linkedin");
  const [draft, setDraft] = useState("");
  const [step, setStep] = useState("input"); // input | drafting | review | publishing | done
  const [charCount, setCharCount] = useState(0);

  const CHAR_LIMITS = { linkedin: 3000, twitter: 280, blog: null };

  function generateDraft() {
    if (!topic.trim()) return;
    setStep("drafting");
    setTimeout(() => {
      const generated = MOCK_DRAFTS[platform](topic);
      setDraft(generated);
      setCharCount(generated.length);
      setStep("review");
    }, 1800);
  }

  function publish() {
    setStep("publishing");
    setTimeout(() => setStep("done"), 2200);
  }

  function reset() {
    setTopic(""); setDraft(""); setStep("input"); setCharCount(0);
  }

  const limit = CHAR_LIMITS[platform];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Publish Now</div>
        <div className="page-sub">Enter a topic → AI drafts in your brand voice → review → publish directly via platform API</div>
      </div>

      <div className="grid-2" style={{ gap: 20 }}>

        {/* Left — Input & Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-label">Topic or idea</div>
            <textarea
              className="field"
              rows={3}
              placeholder="e.g. Why most SaaS teams get onboarding wrong"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={step !== "input"}
              style={{ marginBottom: 14 }}
            />
            <div className="card-label" style={{ marginBottom: 10 }}>Publish to</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {PLATFORM_OPTIONS.map(p => (
                <button
                  key={p.value}
                  onClick={() => { setPlatform(p.value); setDraft(""); setStep("input"); }}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: `1px solid ${platform === p.value ? "var(--accent)" : "var(--border2)"}`,
                    background: platform === p.value ? "var(--accent-dim)" : "transparent",
                    color: platform === p.value ? "var(--accent)" : "var(--text2)",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "var(--font)",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {step === "input" && (
              <button
                className="btn btn-primary"
                onClick={generateDraft}
                disabled={!topic.trim()}
                style={{ width: "100%", justifyContent: "center", opacity: topic.trim() ? 1 : 0.4 }}
              >
                ✦ Draft with AI
              </button>
            )}
            {step === "drafting" && (
              <div style={{ textAlign: "center", padding: "12px 0", color: "var(--text2)", fontSize: 13 }}>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span>
                {" "}Generating draft in your brand voice…
              </div>
            )}
            {step === "review" && (
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-ghost" onClick={generateDraft} style={{ flex: 1, justifyContent: "center" }}>
                  ↻ Regenerate
                </button>
                <button className="btn btn-primary" onClick={publish} style={{ flex: 1, justifyContent: "center" }}>
                  Publish →
                </button>
              </div>
            )}
            {step === "publishing" && (
              <div style={{ textAlign: "center", padding: "12px 0", color: "var(--accent)", fontSize: 13 }}>
                <span>◌ </span>Publishing via API…
              </div>
            )}
            {step === "done" && (
              <div>
                <div style={{
                  background: "var(--green-dim)",
                  border: "1px solid #34d39930",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 16px",
                  color: "var(--green)",
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 12,
                  textAlign: "center",
                }}>
                  ✓ Published successfully to {PLATFORM_OPTIONS.find(p => p.value === platform)?.label}
                </div>
                <button className="btn btn-ghost" onClick={reset} style={{ width: "100%", justifyContent: "center" }}>
                  + New post
                </button>
              </div>
            )}
          </div>

          {/* How it connects */}
          <div className="card" style={{ padding: "16px 20px" }}>
            <div className="card-label">What happens when you hit Publish</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { n: "1", label: "Draft sent to n8n webhook" },
                { n: "2", label: "n8n calls UploadPost API (or direct platform API)" },
                { n: "3", label: "Post goes live on selected platform" },
                { n: "4", label: "Row added to Google Sheets queue as Published" },
                { n: "5", label: "Engagement tracked automatically after 24h" },
              ].map(step => (
                <div key={step.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 20, height: 20,
                    background: "var(--surface3)",
                    borderRadius: "50%",
                    fontSize: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text3)",
                    flexShrink: 0,
                    fontWeight: 600,
                  }}>{step.n}</span>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Draft Preview */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div className="card-label" style={{ marginBottom: 0 }}>Draft preview</div>
            {limit && draft && (
              <span style={{
                fontSize: 11,
                color: charCount > limit ? "var(--red)" : "var(--text3)",
                fontFamily: "var(--mono)",
              }}>
                {charCount}/{limit}
              </span>
            )}
          </div>

          {step === "input" && (
            <div className="empty">
              Enter a topic and click Draft with AI<br />to see the preview here
            </div>
          )}
          {step === "drafting" && (
            <div className="empty" style={{ color: "var(--text3)" }}>
              Writing your draft…
            </div>
          )}
          {(step === "review" || step === "publishing" || step === "done") && draft && (
            <textarea
              className="field"
              value={draft}
              onChange={e => { setDraft(e.target.value); setCharCount(e.target.value.length); }}
              style={{ flex: 1, minHeight: 440, fontFamily: "var(--font)", lineHeight: 1.7, resize: "none" }}
              readOnly={step === "publishing" || step === "done"}
            />
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
