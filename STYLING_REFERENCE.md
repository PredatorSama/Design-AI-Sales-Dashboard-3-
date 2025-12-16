# 🎨 Visual Reference - Colors & Styling

## Color Palette

### Primary Colors
```
Primary Blue (Action buttons)
  Hex: #2563EB
  RGB: rgb(37, 99, 235)
  Usage: Next buttons, Primary CTAs, Selected state borders

Secondary Grey (Inactive/Secondary)
  Hex: #94a3b8
  RGB: rgb(148, 163, 184)
  Usage: Skip buttons, Inactive text, Secondary icons
```

### Background Colors
```
Dark Background (Primary)
  Hex: #020617
  RGB: rgb(2, 6, 23)
  Usage: Page background

Dark Background (Secondary)
  Hex: #0f172a
  RGB: rgb(15, 23, 42)
  Usage: Modals, Cards

Dark Background (Tertiary)
  Hex: #1e293b
  RGB: rgb(30, 41, 59)
  Usage: Buttons, Input backgrounds, Hover states

Dark Background (Border)
  Hex: #334155
  RGB: rgb(51, 65, 85)
  Usage: Borders, Dividers
```

### Text Colors
```
Light Text (Primary)
  Hex: #E5E7EB
  RGB: rgb(229, 231, 235)
  Usage: Main text, Labels

Light Text (Secondary)
  Hex: #94a3b8
  RGB: rgb(148, 163, 184)
  Usage: Secondary text, Descriptions

Light Text (Tertiary)
  Hex: #64748b
  RGB: rgb(100, 116, 139)
  Usage: Placeholder text, hints
```

---

## Button Styles

### Next Button (Primary Action)
```
Background: #2563EB (Primary Blue)
Text Color: White
Padding: px-6 py-2
Border Radius: rounded-lg
Hover: bg-[#1d4ed8] (darker blue)
Icon: ChevronRight
Size: Standard (not reduced)
Font Weight: Default

Visual:
┌─────────────────┐
│ Next →          │  ← Blue filled button
└─────────────────┘
```

### Skip Button (Secondary Action)
```
Background: None (transparent)
Text Color: #94a3b8 (Grey)
Hover Text: #E5E7EB (White)
Hover Background: #1e293b (Dark)
Padding: px-6 py-2
Border Radius: rounded-lg
Font Size: text-sm (smaller)
Font Weight: Default

Visual:
┌─────────────────┐
│ Skip            │  ← Grey text, no background
└─────────────────┘
     ↓ On hover:
┌─────────────────┐
│ Skip            │  ← White text, dark background
└─────────────────┘
```

### Back Button (Secondary Action)
```
Background: #1e293b (Dark)
Text Color: #E5E7EB (Light)
Hover: bg-[#334155] (Lighter dark)
Padding: px-6 py-2
Border Radius: rounded-lg
Icon: ChevronLeft
Font Weight: Default

Visual:
┌─────────────────┐
│ ← Back          │  ← Dark filled button
└─────────────────┘
```

---

## Campaign Type Card Styles

### Unselected State
```
Border: 2px solid #334155 (Grey)
Background: #1e293b (Dark)
Text Color: #E5E7EB (Light)
Padding: p-5
Border Radius: rounded-lg
Cursor: pointer

Hover State:
Border: #475569 (Lighter grey)
Background: #1a2332 (Darker)

Visual (at 50% width):
┌──────────────────────┐
│ 🤖 AI Powered        │
│ Auto-personalized    │
└──────────────────────┘
```

### Selected State
```
Border: 2px solid #2563EB (Blue)
Background: #2563EB/15 (Blue tint ~15% opacity)
Text Color: #2563EB (Blue)
Padding: p-5
Border Radius: rounded-lg
Box Shadow: 
  - shadow-lg (large shadow)
  - shadow-[#2563EB]/20 (blue shadow at 20% opacity)
Cursor: pointer

Visual (at 50% width):
┌──────────────────────┐
│ 🤖 AI Powered        │ ← Blue border
│ Auto-personalized    │ ← Blue text
│                      │ ← Blue tint background
└──────────────────────┘
     ↓ With blue glow
```

---

## Input & Form Elements

### Text Input
```
Background: #1e293b
Border: 1px solid #334155
Padding: px-4 py-2
Border Radius: rounded-lg
Text Color: #E5E7EB
Placeholder Color: #64748b

Focus State:
Border: #2563EB (Blue)
Outline: none
Ring: 1px solid #2563EB (Blue)

Visual:
┌─────────────────────────────┐
│ Enter text...               │  ← Input field
└─────────────────────────────┘
```

### Select Dropdown
```
Background: #1e293b
Border: 1px solid #334155
Padding: px-4 py-2
Border Radius: rounded-lg
Text Color: #E5E7EB

Focus State:
Border: #2563EB (Blue)
Outline: none

Visual:
┌─────────────────────────────┐
│ Select option...            ▼ │
└─────────────────────────────┘
```

### Checkbox
```
Width: w-4 h-4
Appearance: Native browser checkbox
Accent Color: Would be blue in modern browsers

Visual:
☑ Label Text
```

---

## Card & Container Styles

### Standard Card
```
Background: #1e293b (Dark)
Border: 1px solid #334155 (Grey)
Padding: p-6
Border Radius: rounded-lg
Shadow: None (flat design)

Visual:
┌────────────────────┐
│                    │
│   Card Content     │
│                    │
└────────────────────┘
```

### Modal/Overlay
```
Overlay: bg-black/50 (black with 50% opacity)
Modal Background: #0f172a (Dark)
Modal Border: 1px solid #1e293b (Darker grey)
Modal Padding: p-6
Border Radius: rounded-2xl (more rounded)
Max Width: w-full (responsive)
Position: fixed (centered)
Z-index: z-50

Visual:
[Darkened background]
    ┌──────────────────────────┐
    │ Modal Header             │
    │                          │
    │ Modal Content            │
    │                          │
    │ Modal Footer             │
    └──────────────────────────┘
```

---

## Progress & Status Indicators

### Progress Bar (Campaign Creation)
```
Container Background: #0f172a (Dark)
Progress Fill: #2563EB (Blue)
Height: h-2
Border Radius: rounded
Transition: transition-all (smooth animation)

Visual:
Progress: 0%
████████████████████ ▯ (empty)

Progress: 50%
██████████ ░░░░░░░░░░ (half filled)

Progress: 100%
████████████████████ (full blue)
```

### Step Indicator (Wizard)
```
Step Circle Size: w-10 h-10
Border Radius: rounded-full
Font Weight: font-bold
Text Size: text-sm

Completed Step:
Background: #2563EB (Blue)
Text Color: White
Content: ✓ (checkmark)

Current Step:
Background: #2563EB (Blue)
Text Color: White
Content: 2 (number)

Upcoming Step:
Background: #1e293b (Dark)
Text Color: #64748b (Grey)
Content: 3 (number)

Connecting Line (between steps):
Completed: bg-[#2563EB] (Blue)
Upcoming: bg-[#1e293b] (Dark)
Height: h-1
Width: flex-1 mx-2

Visual:
① ──② ──○ ──○
 ✓    2   3   4
```

---

## Animations & Transitions

### Button Hover
```
Duration: Implicit (browser default ~150ms)
Type: transition-all
Effect: 
  - Color change (grey → white)
  - Background change (transparent → dark)
  - Smooth, no delay

Visual:
[Skip] → (hover) [Skip]
Grey       White on dark
```

### Modal Appearance
```
Duration: 200ms
Type: animate-in fade-in slide-in-from-top-2
Effect:
  - Fade in (opacity 0 → 1)
  - Slide down (top offset → 0)
  - Smooth, professional entrance

Visual:
[Off-screen]
   ↓ animate-in
[Fading in]
   ↓ slide-down
[On-screen]
```

### Shadow & Depth
```
Campaign Type Selected Shadow:
  shadow-lg (large shadow)
  shadow-[#2563EB]/20 (blue colored, 20% opacity)
  Effect: Card appears elevated with blue glow

Visual:
┌──────────────┐
│ Selected     │ ← Blue glow underneath
└──────────────┘
   ░░░░░░░░░░░  (blue shadow)
```

---

## Responsive Design

### Spacing Scale
```
None: 0
xs:   0.25rem (4px)
sm:   0.5rem (8px)
md:   1rem (16px)
lg:   1.5rem (24px)
xl:   2rem (32px)
2xl:  2.5rem (40px)

Padding Shortcuts:
px-3  = 0.75rem (12px) horizontal
py-2  = 0.5rem (8px) vertical
p-4   = 1rem (16px) all sides
p-5   = 1.25rem (20px) all sides
p-6   = 1.5rem (24px) all sides
```

### Gap (Spacing Between Elements)
```
gap-1  = 0.25rem (4px)
gap-2  = 0.5rem (8px)
gap-3  = 0.75rem (12px)
gap-4  = 1rem (16px) ← Used for Campaign Type cards
```

### Border Radius
```
rounded-lg     = 0.5rem (8px)  ← Standard buttons, cards
rounded-2xl    = 1rem (16px)   ← Modals (more rounded)
rounded-full   = 9999px        ← Pills, circles (Avatar)
```

---

## Typography

### Font Sizes
```
text-sm     = 0.875rem (14px) ← Skip buttons, secondary text
Default     = 1rem (16px)     ← Regular text, labels
text-lg     = 1.125rem (18px) ← Large text
text-xl     = 1.25rem (20px)  ← Very large text
text-2xl    = 1.5rem (24px)   ← Headings
```

### Font Weights
```
Default          = 400 (normal)
font-semibold    = 600 ← Labels, card headers
font-bold        = 700 ← Step numbers, important headings
```

---

## Opacity Reference

### Used Throughout
```
/5   = 5% opacity   (very subtle)
/10  = 10% opacity  (subtle)
/15  = 15% opacity  ← Campaign Type selected background
/20  = 20% opacity  ← Shadow on selected cards
/50  = 50% opacity  ← Modal overlay background
```

---

## Theme Consistency

### Dark Mode (Current)
```
✓ Primary Dark: #020617
✓ Secondary Dark: #0f172a
✓ Tertiary Dark: #1e293b
✓ Light Text: #E5E7EB
✓ Secondary Text: #94a3b8
✓ Accent Blue: #2563EB
✓ Borders: #334155
```

### All Colors Work Together
- High contrast for accessibility ✓
- Professional appearance ✓
- Eye-friendly (no harsh brightness) ✓
- Consistent throughout app ✓
- Easy to distinguish elements ✓

---

## Usage Examples

### Creating a Button
```css
/* Primary Action */
bg-[#2563EB] text-white px-6 py-2 rounded-lg 
hover:bg-[#1d4ed8] transition-all

/* Secondary Action */
text-[#94a3b8] hover:text-[#E5E7EB] 
hover:bg-[#1e293b] px-6 py-2 rounded-lg transition-all
```

### Creating a Card
```css
bg-[#1e293b] border border-[#334155] 
rounded-lg p-6 space-y-4
```

### Creating a Modal
```css
fixed inset-0 bg-black/50 flex items-center justify-center z-50
/* Inner: */
bg-[#0f172a] border border-[#1e293b] 
rounded-2xl p-6 max-w-2xl w-full mx-4
```

---

## No Light Mode Yet

Currently, the app is **dark mode only**. Light mode would invert colors:
- Dark backgrounds → Light backgrounds
- Light text → Dark text
- Same accent colors would work
- Same structure would apply

---

## Summary

All colors, spacing, and styling work together to create:
✨ Professional dark-themed UI
🎨 Clear visual hierarchy
🧠 Easy to understand
💎 Polished appearance
🚀 Ready for production

**Consistency is key - stick to this palette!**
