# Health Quest — Product & Map Spec (v0.1)

A fun, evidence-based wellness education game where users “level up” their health knowledge one tile at a time.

This document defines:
- Core concept
- Game loop
- Zones and map layout
- Tile types and data model
- Reward / XP system
- Initial content structure
- Implementation notes for a simple web app (HTML/CSS/JS)

---

## 1. Core Concept

**Health Quest** is a mobile-friendly web app that turns health education into a game.

Users travel across a map of **6 health zones**. Each zone contains tiles. Each tile is a fast, evidence-based challenge (a question, scenario, or micro decision). Correct choices earn XP, unlock badges, and open new areas.

**Target user:**  
Burned-out or curious adults who want to understand health without being overwhelmed, judged, or bored.

**Core promise:**  
> Learn real health skills in under 5 minutes a day, by playing your way across a wellness map.

---

## 2. Zones (Phase 1)

There are **6 zones** in v1. Each zone is visually distinct and represents a daily lever of health.

1. **Sleep Valley**
   - Focus: sleep basics, wind-down, light, caffeine timing, routines
   - Icon: 🌙
   - Color: deep blue / indigo

2. **Stress Mountain**
   - Focus: stress responses, coping strategies, nervous system basics
   - Icon: 🧗‍♂️ / 🌋
   - Color: muted red/purple

3. **Nutrition Forest**
   - Focus: food choices, protein, fiber, balanced meals, timing
   - Icon: 🌲 / 🍎
   - Color: green

4. **Movement Peaks**
   - Focus: daily movement, strength, mobility, sedentary breaks
   - Icon: 🏃
   - Color: orange

5. **Hydration Shores**
   - Focus: water intake, signs of dehydration, drink choices
   - Icon: 💧
   - Color: teal / light blue

6. **Mindset City**
   - Focus: self-talk, consistency, realistic goals, all-or-nothing thinking
   - Icon: 🧠
   - Color: warm yellow / gold

---

## 3. Game Loop (How it plays)

1. User opens the app → sees **Home / Map screen**.
2. User taps a **Zone** (e.g., Sleep Valley).
3. User sees a **path of tiles** (like nodes on a board).
4. User taps a **Tile** → challenge opens.
5. User picks an answer (or makes a choice).
6. App gives **instant feedback**:
   - Correct? → XP + small animation + micro teaching line.
   - Incorrect? → small “close enough” feedback + micro teaching line.
7. Tile is marked **completed**.
8. After enough tiles + XP → user **levels up**, unlocks:
   - New tiles
   - Badges
   - Next zone (or difficulty tier)

The loop must be:
- Fast (15–25 seconds per tile)
- Clear
- Visually rewarding

---

## 4. Difficulty Levels

We support **two levels** in v1 (third level later):

- **Beginner** (default)
  - Simple “better vs worse” choices
  - No jargon
  - Very clear correct answers

- **Intermediate**
  - More realistic scenarios
  - “Good / Better / Best” decisions
  - Introduces simple mechanisms (e.g., light, caffeine, timing)

**Advanced** can be added in v2 (case studies, mechanisms).

---

## 5. Map Layout (Phase 1)

For v1, the map can be **zone-based**, not one giant world.

- Home Screen:
  - Shows the 6 zones as cards or icons.
  - Each zone shows:
    - % complete
    - Badge if finished
    - Lock if not yet unlocked

- Within a Zone:
  - Represented as a **path of tiles** (linear is fine for v1).
  - Each zone has:
    - 10 Beginner tiles
    - 10 Intermediate tiles (unlocked after enough XP)

**Tile IDs:**
- Sleep Valley:
  - Beginner IDs: `SV-B-01` … `SV-B-10`
  - Intermediate IDs: `SV-I-01` … `SV-I-10`
- Stress Mountain:
  - Beginner: `SM-B-01` … `SM-B-10`
  - Intermediate: `SM-I-01` … etc.

…and so on for all six zones.

---

## 6. Tile Types (Challenge Types)

Each tile is one of these types:

1. **quick_pick**  
   - Multiple choice (3 options).
   - Example: “You haven’t eaten in 4 hours. What’s your best move?”

2. **scenario**  
   - Short scenario with 3 answer choices.
   - Example: “It’s 10PM and you’re wired. What helps you fall asleep faster?”

3. **compare**  
   - “Good / Better / Best” or “Rank these” simplified.
   - In v1, still implemented as multiple choice but explained as “best choice”.

4. **true_false / swipe** (optional v1)  
   - Simple binary decision: “Healthy / Not helpful.”

**Each tile** should show:
- Question or scenario
- 2–4 labeled choices
- Immediate “Correct / Not quite” feedback
- One-line explanation (micro teaching point)

---

## 7. Data Model (for JSON / JS objects)

Tiles can be stored as JSON-like objects.

### Zone structure (example):

```json
{
  "id": "sleep_valley",
  "name": "Sleep Valley",
  "icon": "🌙",
  "color": "#203B73",
  "description": "Learn how to fall asleep easier, stay asleep, and feel more rested.",
  "order": 1
}

{
  "id": "SV-B-01",
  "zoneId": "sleep_valley",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You want to fall asleep faster most nights. Which change will help the most?",
  "options": [
    { "id": "a", "label": "Scrolling your phone in bed until you feel tired" },
    { "id": "b", "label": "Keeping lights dim for 30–60 minutes before bed" },
    { "id": "c", "label": "Drinking an energy drink so you can power through" }
  ],
  "correctOptionId": "b",
  "explanation": "Dimmer light in the evening signals your brain to start releasing melatonin, which makes it easier to fall asleep."
}

{
  "id": "SV-B-02",
  "zoneId": "sleep_valley",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You wake up at 3AM a few nights a week. What is usually the best first step?",
  "options": [
    { "id": "a", "label": "Turn on bright lights and check your phone" },
    { "id": "b", "label": "Stay in low light and do a calm, boring activity until sleepy again" },
    { "id": "c", "label": "Drink a big coffee so you feel less tired" }
  ],
  "correctOptionId": "b",
  "explanation": "Staying in low light and doing something calm helps your brain ease back toward sleep without waking it up more."
}

{
  "id": "SM-B-01",
  "zoneId": "stress_mountain",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You feel stressed and your shoulders are tense. Which small action is most helpful in the moment?",
  "options": [
    { "id": "a", "label": "Hold your breath and ignore it" },
    { "id": "b", "label": "Take 5 slow breaths, longer on the exhale" },
    { "id": "c", "label": "Scroll social media as fast as possible" }
  ],
  "correctOptionId": "b",
  "explanation": "Slow, longer exhales help your nervous system shift toward a calmer state."
}

{
  "id": "NF-B-01",
  "zoneId": "nutrition_forest",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You’re choosing a snack. Which option will usually keep you full the longest?",
  "options": [
    { "id": "a", "label": "A handful of candy" },
    { "id": "b", "label": "Yogurt with some nuts or seeds" },
    { "id": "c", "label": "A plain soda" }
  ],
  "correctOptionId": "b",
  "explanation": "Snacks with protein and some fat, like yogurt with nuts, tend to keep you full longer than sugar-only snacks."
}

{
  "id": "MP-B-01",
  "zoneId": "movement_peaks",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You sit most of the day. What is a simple way to start adding movement?",
  "options": [
    { "id": "a", "label": "Stand up and walk for 2–3 minutes every hour" },
    { "id": "b", "label": "Wait until you can start a 90-minute gym routine" },
    { "id": "c", "label": "Only move on weekends" }
  ],
  "correctOptionId": "a",
  "explanation": "Short, regular movement breaks are an easy way to start improving your daily activity."
}

{
  "id": "HS-B-01",
  "zoneId": "hydration_shores",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You often forget to drink water. What might help the most?",
  "options": [
    { "id": "a", "label": "Keep a water bottle where you work and sip from it regularly" },
    { "id": "b", "label": "Only drink water if you feel extremely thirsty" },
    { "id": "c", "label": "Rely only on sugary drinks" }
  ],
  "correctOptionId": "a",
  "explanation": "Having water within reach and sipping throughout the day makes it easier to stay hydrated."
}

{
  "id": "MC-B-01",
  "zoneId": "mindset_city",
  "difficulty": "beginner",
  "type": "quick_pick",
  "question": "You missed two workouts this week. Which thought is most helpful?",
  "options": [
    { "id": "a", "label": "I always fail. I should quit." },
    { "id": "b", "label": "Two missed days don’t erase my progress. I can start again tomorrow." },
    { "id": "c", "label": "I’ll wait until next month to try again." }
  ],
  "correctOptionId": "b",
  "explanation": "Seeing setbacks as normal and temporary makes it easier to stay consistent long term."
}

