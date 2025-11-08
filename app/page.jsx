"use client";

import { useMemo, useState } from "react";

const PRESETS = [
  {
    id: "cinematic",
    name: "Cinematic B-Roll",
    values: {
      subject: "a barista crafting latte art in a cozy cafe",
      actions: "slow, intentional movements; slight steam motion; subtle hand interactions",
      scene: "warm wooden interior, soft window light, shallow depth of field, bokeh lights",
      style: "cinematic, high dynamic range, filmic color grading, 35mm look",
      camera: "handheld, gentle micro-jitters, 35mm lens, f/1.8, shallow DOF",
      motion: "slow pan left-to-right, smooth parallax, subtle push-in",
      lighting: "soft key from window, warm practicals, gentle rim light",
      mood: "intimate, artisanal, calm",
      negative: "overexposed highlights, heavy grain, jittery camera, cartoonish colors",
      duration: 8,
      fps: 24,
      resolution: "1080p",
      aspect: "16:9",
      modelHints: "prefer realistic motion; prioritize texture detail on foam"
    }
  },
  {
    id: "product",
    name: "Product Macro",
    values: {
      subject: "a sleek smartwatch resting on dark slate",
      actions: "condensed water droplets forming, subtle ticking, glow pulse",
      scene: "dark studio environment with rim lights and mist",
      style: "hyperreal macro, glossy, premium brand aesthetic",
      camera: "macro lens 85mm, tripod stabilized",
      motion: "slow orbital move 10 degrees",
      lighting: "two cool rim lights, soft top fill, specular control",
      mood: "futuristic, luxurious",
      negative: "plastic look, blown highlights, harsh reflections",
      duration: 6,
      fps: 30,
      resolution: "4K",
      aspect: "1:1",
      modelHints: "avoid flicker; maintain crisp edges and typography"
    }
  },
  {
    id: "nature",
    name: "Wildlife Aerial",
    values: {
      subject: "a herd of wild horses galloping across a golden plain",
      actions: "dust trailing, synchronized movement, wind in manes",
      scene: "sunset, long shadows, vast landscape from above",
      style: "documentary naturalism, cinematic scale",
      camera: "drone aerial, 120m altitude, mild tilt",
      motion: "forward dolly with slight yaw",
      lighting: "golden hour, warm, volumetric haze",
      mood: "majestic, free, awe-inspiring",
      negative: "CGI look, repeating patterns, rubbery motion",
      duration: 10,
      fps: 24,
      resolution: "1440p",
      aspect: "2.39:1",
      modelHints: "preserve natural motion blur; emphasize dust particle realism"
    }
  }
];

const RESOLUTIONS = ["720p", "1080p", "1440p", "4K"]; 
const ASPECTS = ["16:9", "9:16", "1:1", "2.39:1", "4:3"];
const MODELS = ["Generic", "Sora", "Pika", "Runway"];

function buildPrompt(fields) {
  const lines = [];
  lines.push(`Prompt: ${fields.subject}`);
  if (fields.actions) lines.push(`Actions: ${fields.actions}`);
  if (fields.scene) lines.push(`Scene: ${fields.scene}`);
  if (fields.style) lines.push(`Style: ${fields.style}`);
  if (fields.camera) lines.push(`Camera/Optics: ${fields.camera}`);
  if (fields.motion) lines.push(`Motion: ${fields.motion}`);
  if (fields.lighting) lines.push(`Lighting: ${fields.lighting}`);
  if (fields.mood) lines.push(`Mood: ${fields.mood}`);
  lines.push(
    `Video Specs: ${fields.duration}s, ${fields.fps}fps, ${fields.resolution}, aspect ${fields.aspect}`
  );
  if (fields.model !== "Generic") {
    lines.push(`Model Hints (${fields.model}): ${fields.modelHints || "use default preferences"}`);
  }
  if (fields.negative) {
    lines.push(`Negative: ${fields.negative}`);
  }
  return lines.join("\n");
}

export default function Page() {
  const [fields, setFields] = useState({
    subject: "a lone astronaut walking across neon-lit rainy street",
    actions: "rain ripples, reflective puddles, gentle breathing condensation",
    scene: "futuristic city at night, holographic signs, wet asphalt",
    style: "cinematic, neon-noir, high contrast",
    camera: "steadycam, 35mm lens, shallow depth of field",
    motion: "slow push-in towards subject",
    lighting: "neon key, cool rim, moody practicals",
    mood: "mysterious, contemplative",
    negative: "low resolution, excessive noise, cartoonish motion",
    duration: 8,
    fps: 24,
    resolution: "1080p",
    aspect: "16:9",
    model: "Generic",
    modelHints: "prefer realistic motion, maintain consistent character identity"
  });

  const composed = useMemo(() => buildPrompt(fields), [fields]);

  function update(key, value) {
    setFields(prev => ({ ...prev, [key]: value }));
  }

  function applyPreset(id) {
    const preset = PRESETS.find(p => p.id === id);
    if (!preset) return;
    setFields(prev => ({ ...prev, ...preset.values }));
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(composed);
      alert("Prompt copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  }

  function randomizeDetail() {
    const moods = ["uplifting", "intense", "serene", "whimsical", "epic", "quiet"];
    const motions = ["push-in", "pull-out", "orbit", "tilt reveal", "pan", "crane up"];
    const lenses = ["24mm", "35mm", "50mm", "85mm macro"];
    update("mood", moods[Math.floor(Math.random() * moods.length)]);
    update("motion", `subtle ${motions[Math.floor(Math.random() * motions.length)]}`);
    update("camera", `${lenses[Math.floor(Math.random() * lenses.length)]} lens, stabilized`);
  }

  return (
    <div className="container">
      <section className="controls">
        <div className="row">
          <div className="field">
            <label>Preset</label>
            <select onChange={e => applyPreset(e.target.value)} defaultValue="">
              <option value="" disabled>Choose preset?</option>
              {PRESETS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="spacer" />
          <div className="field">
            <label>Model</label>
            <select value={fields.model} onChange={e => update("model", e.target.value)}>
              {MODELS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <button className="btn secondary" onClick={randomizeDetail}>Randomize detail</button>
        </div>

        <div className="grid">
          <div className="field">
            <label>Subject</label>
            <input value={fields.subject} onChange={e => update("subject", e.target.value)} placeholder="What is the video about?" />
          </div>
          <div className="field">
            <label>Actions</label>
            <input value={fields.actions} onChange={e => update("actions", e.target.value)} placeholder="Key movements, micro-actions" />
          </div>
          <div className="field">
            <label>Scene</label>
            <input value={fields.scene} onChange={e => update("scene", e.target.value)} placeholder="Environment, location, atmosphere" />
          </div>
          <div className="field">
            <label>Style</label>
            <input value={fields.style} onChange={e => update("style", e.target.value)} placeholder="Aesthetic, grade, references" />
          </div>
          <div className="field">
            <label>Camera / Optics</label>
            <input value={fields.camera} onChange={e => update("camera", e.target.value)} placeholder="Lens, rig, DOF" />
          </div>
          <div className="field">
            <label>Motion</label>
            <input value={fields.motion} onChange={e => update("motion", e.target.value)} placeholder="Dolly, pan, orbit, crane?" />
          </div>
          <div className="field">
            <label>Lighting</label>
            <input value={fields.lighting} onChange={e => update("lighting", e.target.value)} placeholder="Key, rim, practicals, time of day" />
          </div>
          <div className="field">
            <label>Mood</label>
            <input value={fields.mood} onChange={e => update("mood", e.target.value)} placeholder="Emotional tone" />
          </div>
          <div className="field">
            <label>Negative</label>
            <input value={fields.negative} onChange={e => update("negative", e.target.value)} placeholder="What to avoid" />
          </div>
        </div>

        <div className="row">
          <div className="field small">
            <label>Duration (s)</label>
            <input type="number" min={1} max={20} value={fields.duration} onChange={e => update("duration", Number(e.target.value))} />
          </div>
          <div className="field small">
            <label>FPS</label>
            <input type="number" min={12} max={60} value={fields.fps} onChange={e => update("fps", Number(e.target.value))} />
          </div>
          <div className="field small">
            <label>Resolution</label>
            <select value={fields.resolution} onChange={e => update("resolution", e.target.value)}>
              {RESOLUTIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="field small">
            <label>Aspect</label>
            <select value={fields.aspect} onChange={e => update("aspect", e.target.value)}>
              {ASPECTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="field flex1">
            <label>Model Hints</label>
            <input value={fields.modelHints} onChange={e => update("modelHints", e.target.value)} placeholder="Model-specific preferences" />
          </div>
        </div>
      </section>

      <section className="output">
        <div className="output-header">
          <h2>Composed Prompt</h2>
          <div className="actions">
            <button className="btn" onClick={copyToClipboard}>Copy</button>
          </div>
        </div>
        <textarea className="prompt" value={composed} readOnly rows={14} />

        <details className="tips">
          <summary>Tips for better results</summary>
          <ul>
            <li>Be concrete about motion, lens, and lighting. Models respond well to production language.</li>
            <li>Keep duration short for sharper detail; upscale after generation if needed.</li>
            <li>Use negative prompts to avoid artifacts like flicker, rubbery motion, or repeating patterns.</li>
          </ul>
        </details>
      </section>
    </div>
  );
}
