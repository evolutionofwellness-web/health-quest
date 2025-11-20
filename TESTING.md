# Health Quest - Testing Guide

## How to Test Click Functionality

### 1. Open the Application
- Visit http://localhost:8888 (if running locally with `netlify dev`)
- Or deploy to Netlify and visit your site URL

### 2. Open Browser Console
- Press F12 (Windows/Linux) or Cmd+Option+I (Mac)
- Go to the "Console" tab
- You should see initialization messages like:
  ```
  Health Quest app initialized
  Starting app initialization...
  Current URL: ...
  Document ready state: ...
  Game state loaded: { ... }
  ```

### 3. Test Clickable Elements

#### Journey Map Nodes (Top Strip)
- **Expected Behavior:**
  - First node (Sleep Camp) should be highlighted in gold with pulsing animation
  - Click the first node → should scroll to Sleep zone questions
  - Hovering shows tooltip: "This is your current stop. Today's tiles live here."
  - Later nodes should be grayed out with tooltip: "Clear earlier stops to unlock this area."
- **Console Output:** Click logs showing element details

#### Zone Cards (Main Grid)
- **Expected Behavior:**
  - 6 cards showing Sleep, Stress, Nutrition, Movement, Hydration, Mindset
  - Each shows "0 / 9 tiles completed" (for new users)
  - Click any card → scrolls to that zone's question section
- **Console Output:** "Zone card X (zonename) clicked"

#### Question Tiles
- **Expected Behavior:**
  - Scroll down to "Sleep Camp" section
  - Should see 3 question tiles (daily quest)
  - Each tile shows difficulty stars (⭐), question text, and XP value
  - Click tile → opens modal with question
- **Console Output:** "Question tile clicked: [id]"

#### Question Modal
- **Expected Behavior:**
  - Modal appears with question text and 4 answer options
  - Click an answer → shows feedback (correct/incorrect)
  - Shows explanation text
  - Awards XP if correct (first time only)
  - Click "Close" button or backdrop → closes modal
- **Console Output:** Modal interactions logged

#### Achievements Section
- **Expected Behavior:**
  - Click "Achievements" header → expands/collapses list
  - Shows "0 / 4" unlocked achievements
  - Locked achievements show 🔒 icon
- **Console Output:** "Achievements toggle clicked"

### 4. Run Diagnostic Tool
In the browser console, type:
```javascript
window.debugClickability()
```

This will show:
- How many of each element type was found
- Whether each element is visible and clickable
- If any element is blocked by overlays
- Current modal states

### 5. Common Issues and Solutions

#### Issue: "Click detected but nothing happens"
- Check console for error messages
- Run `window.debugClickability()` to see if elements are blocked
- Verify modal states are correct (should be hidden initially)

#### Issue: "No tiles showing in zone sections"
- Check console for "Current node: { zone: 'sleep', ... }"
- Verify daily quest was generated: "Generated new daily quest"
- Check if tiles are being rendered: "showing X daily quest tiles"

#### Issue: "Can't click journey nodes"
- Verify console shows: "Found X journey nodes"
- Check if nodes have proper classes (current, locked, completed)
- Ensure tooltips have `pointer-events: none`

### 6. Reset Testing State
To start fresh, open console and run:
```javascript
localStorage.clear();
location.reload();
```

This will:
- Reset XP, level, and streak to 0
- Clear completed tiles
- Show onboarding modal again
- Generate new daily quest

## Expected Console Output on Page Load

```
Health Quest app initialized
Starting app initialization...
Current URL: http://localhost:8888/
Document ready state: interactive
Game state loaded: {totalXP: 0, currentLevel: 1, currentNodeIndex: 0, completedNodes: Array(0), completedTiles: 0}
Generated new daily quest: {date: "2025-11-20", tiles: ["sleep-1", "sleep-2", "sleep-3"]}
Onboarding initialized
Rendering question tiles for current node...
Current node: {zone: 'sleep', label: 'Sleep Camp'}
Zone sleep is current node - showing 3 daily quest tiles
Question tiles rendering complete
Progress display updated
Updating journey map, current node index: 0
  Node 0 marked as current
  Node 1 marked as locked
  Node 2 marked as locked
  ...
Journey map update complete
Achievements display updated
Weekly boss button updated
Initializing navigation...
Found 10 journey nodes
Found 6 zone cards
Found 6 back buttons
Modal close button handler attached
Modal backdrop handler attached
Navigation initialization complete
Achievements toggle handler attached
Modal states: {questionModal: true, weeklyBossModal: true, onboardingModal: 'none'}
App initialization complete - all event listeners attached
You should now be able to click on elements. Check console for click events.
Diagnostic tools loaded. Run window.debugClickability() to check element states.
```

## Testing Checklist

- [ ] Page loads without errors
- [ ] Console shows initialization messages
- [ ] Journey map shows first node highlighted (gold with pulse)
- [ ] Can click zone cards to scroll to zones
- [ ] Question tiles appear in Sleep section
- [ ] Can click question tiles to open modal
- [ ] Can answer questions and see feedback
- [ ] Can close modal with button or backdrop click
- [ ] Achievements section can expand/collapse
- [ ] Back buttons return to home view
- [ ] All clicks are logged in console
- [ ] No overlay elements blocking clicks
- [ ] `window.debugClickability()` shows all elements are clickable
