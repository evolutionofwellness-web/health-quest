# Health Quest Game - Setup & Troubleshooting

> **🚨 CAN'T CLICK ANYTHING? Try this first:** Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac) to hard refresh the page. This clears the browser cache and loads the latest version.
>
> **Need help?** Click the **?** button in the top-right corner of the app for instant troubleshooting tips.

## Quick Start

### For Users (Deployed Site)
1. Visit the deployed site URL
2. **If you see issues**, clear your browser cache:
   - **Chrome/Edge**: Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac), select "Cached images and files", click "Clear data"
   - **Firefox**: Press `Ctrl+Shift+Delete`, select "Cache", click "Clear Now"
   - **Safari**: Press `Cmd+Option+E`
3. **Hard refresh** the page: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
4. Click the "Let's start" button to begin

### For Developers (Local Development)
```bash
# Install Netlify CLI globally (if not installed)
npm install -g netlify-cli

# Start local dev server
netlify dev

# Or use the direct path
/opt/buildhome/node-deps/node_modules/.bin/netlify dev
```

Visit: http://localhost:8888

## Common Issues & Solutions

### Issue: Can't click on anything / Nothing happens when clicking

**Cause**: Browser cache is serving old JavaScript/HTML files

**Solutions** (try in order):
1. **Hard Refresh**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear browser cache**:
   - Open DevTools (F12)
   - Right-click the refresh button → "Empty Cache and Hard Reload"
3. **Disable cache in DevTools**:
   - Open DevTools (F12)
   - Go to Network tab
   - Check "Disable cache"
   - Keep DevTools open and refresh
4. **Use Incognito/Private mode**: Forces fresh load without cache
5. **Check console for errors**:
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages
   - Should see: "Health Quest app initialized" and "App initialization complete"

### Issue: JavaScript modules not loading

**Symptoms**:
- Blank page
- Console shows "Failed to load module script" errors
- 404 errors for .js files

**Solutions**:
1. Verify files exist in root directory:
   - `app.js`
   - `data.js`
   - `confetti.js`
   - `style.css`
2. Check browser console for specific error messages
3. Ensure you're using a modern browser that supports ES6 modules:
   - Chrome 61+
   - Firefox 60+
   - Safari 11+
   - Edge 16+

### Issue: Onboarding modal not showing

**This is normal** if you've visited before. The modal only shows once.

**To reset**:
1. Open DevTools (F12)
2. Go to Console tab
3. Run: `localStorage.clear(); location.reload();`

### Issue: No tiles showing in zones

**Cause**: You're viewing a zone that's not your current node

**Solution**:
- Look at the journey map at the top
- The gold/pulsing node is your current location
- Click on your current node to scroll to its questions
- Only the current node shows daily quest tiles

## File Structure

```
/
├── index.html          # Main HTML file
├── app.js             # Main application logic
├── data.js            # Question data
├── confetti.js        # Confetti animation
├── style.css          # All styles
├── netlify.toml       # Netlify configuration
├── TESTING.md         # Detailed testing guide
└── README.md          # This file
```

## How The Game Works

### Journey Map (Top Strip)
- Shows your progression through 10 nodes
- **Gold/pulsing node** = Your current location
- **Green checkmark** = Completed nodes
- **Gray/locked** = Future nodes

### Daily Quest System
- 3 new tiles appear each day in your current node's zone
- Complete tiles to earn XP and progress
- Tiles don't repeat until you've completed all tiles in that zone

### Zones
- 6 themed zones: Sleep, Stress, Nutrition, Movement, Hydration, Mindset
- 4 mixed zones (combining all themes)
- Each zone has 9 question tiles (3 of each difficulty)

### XP & Progression
- Basic tiles: 10 XP
- Core tiles: 20 XP
- Challenge tiles: 30 XP
- Level up every 100 XP
- Higher levels unlock harder tiles

## Debugging Tools

### Browser Console Logging
Open DevTools (F12) → Console tab. You should see:
- Initialization messages
- Click detection logs
- Game state information
- Any error messages

### Diagnostic Function
In the console, run:
```javascript
window.debugClickability()
```

This shows:
- Which elements are found
- Whether they're visible and clickable
- If anything is blocking clicks
- Current modal states

### Manual Reset
```javascript
// Clear all game data
localStorage.clear();

// Reload page
location.reload();
```

## Testing Checklist

Use `TESTING.md` for detailed testing steps.

Quick checks:
- [ ] Page loads without console errors
- [ ] See "Health Quest app initialized" in console
- [ ] First journey node is gold/pulsing
- [ ] Clicking zone cards scrolls to questions
- [ ] See 3 question tiles in current zone
- [ ] Clicking tiles opens modal
- [ ] Can answer questions
- [ ] XP increases after correct answers

## Production Deployment

The site is configured to prevent aggressive caching via `netlify.toml`:
- HTML, CSS, and JS files use `max-age=0, must-revalidate`
- Forces browsers to check for updates on each visit
- Users may still need to hard-refresh after deployments

## Need Help?

1. Check `TESTING.md` for detailed testing procedures
2. Open browser console (F12) and look for error messages
3. Run `window.debugClickability()` in console for diagnostic info
4. Try hard refresh (`Ctrl+F5`) or clear browser cache
5. Test in Incognito/Private mode to rule out cache issues
