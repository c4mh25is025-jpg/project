---
name: Executive Enterprise Directory
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777586'
  outline-variant: '#c7c4d7'
  surface-tint: '#5148d7'
  primary: '#2a14b4'
  on-primary: '#ffffff'
  primary-container: '#4338ca'
  on-primary-container: '#c1beff'
  inverse-primary: '#c3c0ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#5c2f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d4200'
  on-tertiary-container: '#ffb477'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100069'
  on-primary-fixed-variant: '#372abf'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies an authoritative, calm, and high-efficiency corporate environment. It targets HR administrators, team leads, and enterprise employees navigating high-density organizational hierarchies, compliance tracking, and talent directories. 

The aesthetic is Modern Corporate with architectural precision. It prioritizes clarity over visual noise, utilizing structured geometry, deliberate whitespace, and fine-line borders to convey organizational trust, operational speed, and corporate stature. Interactions feel instantaneous, decisive, and grounded.

## Colors

The palette establishes an immediate sense of enterprise stability and clear functional hierarchy.

- **Primary (`#4338CA` - Deep Indigo):** Anchors core actions, active navigation states, interactive toggles, and primary call-to-actions.
- **Secondary (`#475569` - Slate):** Structures structural frames, tabular headers, secondary buttons, subtext, and inactive UI boundaries.
- **Tertiary (`#D97706` - Warm Amber):** Reserved for warm operational highlights, pending approval badges, certification expirations, and status indicators.
- **Neutral (`#0F172A` - Midnight Slate):** Serves as high-contrast body typography, dark mode anchors, and grounding accents.

Supporting background layers utilize an ultra-clean `#F8FAFC` canvas with `#FFFFFF` card surfaces, segmented by razor-thin borders (`#E2E8F0`). Secondary functional alerts integrate targeted semantic greens (`#059669`) for active status and crimsons (`#DC2626`) for critical terminations or policy revocations.

## Typography

Typography relies entirely on `Inter` to deliver systematic clarity, metric uniformity, and legibility at dense enterprise scales. 

Tabular figures (`tnum`) must be enforced for employee IDs, salary matrices, compensation tables, and numeric timestamps. Tight negative letter-spacing is applied exclusively to large headlines to ensure visual solidity, while functional labels under 12px feature slight positive tracking for crisp scannability across dense data grids.

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid with strict container constraints on widescreen views to maintain data density without losing readability:

- **Desktop (1280px+):** 12 columns, 24px (`1.5rem`) gutters, 32px (`2rem`) page margins. Maximum page content width is capped at 1440px with a persistent 280px collapsible navigation sidebar.
- **Tablet (768px - 1279px):** 8 columns, 16px (`1rem`) gutters, 24px (`1.5rem`) margins. Navigation condenses to an icon-rail or off-canvas drawer.
- **Mobile (< 768px):** 4 columns, 16px (`1rem`) gutters, 16px (`1rem`) margins. Multi-column employee directories reflow into single-column vertical card stacks.

The spatial system relies on a consistent 4px/8px modular base scale. Component padding strictly prioritizes vertical compactness (`space-xs` and `space-sm`) inside tables and search toolbars to preserve screen real estate for deep hierarchical rosters.

## Elevation & Depth

Visual hierarchy uses tonal surface layering combined with razor-thin hairline borders rather than heavy drop shadows.

- **Surface Tiers:** 
  - Canvas base: `#F8FAFC`
  - Cards and Panels: `#FFFFFF` with a 1px solid `#E2E8F0` stroke.
  - Active/Hovered Panels: Elevated to `#FFFFFF` with a 1px solid `#CBD5E1` stroke.
- **Shadow Profiles:**
  - Ambient Resting (`Level 1`): `0 1px 2px 0 rgba(15, 23, 42, 0.04)` — used on standard data cards and list groups.
  - Interactive Hover (`Level 2`): `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)` — used on interactive directory cards and clickables.
  - Overlay Panels (`Level 3`): `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` — used on filter popovers, quick-view flyouts, and context dropdowns.
  - Modal Sheets (`Level 4`): `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` with a `#0F172A` backdrop at 40% opacity.

## Shapes

The design system implements a soft, refined corner geometry (`roundedness: 1`). 

Standard interactive surfaces—including search bars, buttons, filter chips, and form controls—feature a crisp `0.25rem` (4px) corner radius. Structural modules such as directory profile cards, data tables, and slide-over panels apply `0.5rem` (8px). Badges and pill indicators use complete circular caps (`9999px`) to maintain clear differentiation from functional inputs and data frames.

## Components

### Buttons
- **Primary:** Solid `#4338CA` background, white label, 1px border `#3730A3`. Hover transitions to `#3730A3`. Height: 36px (compact) or 40px (default).
- **Secondary:** Surface `#FFFFFF`, 1px border `#CBD5E1`, text `#334155`. Hover transitions to background `#F1F5F9`.
- **Destructive:** Surface `#FEF2F2`, 1px border `#FCA5A5`, text `#B91C1C`. Hover shifts to `#FEE2E2`.

### Chips & Status Badges
- **Status Badges:** Small 20px height, pill radius, uppercase `label-sm` font. 
  - *Active:* Light emerald fill (`#ECFDF5`), border `#A7F3D0`, text `#065F46`.
  - *On Leave / Pending:* Light amber fill (`#FFFBEB`), border `#FDE68A`, text `#92400E`.
  - *Terminated / Inactive:* Light slate fill (`#F1F5F9`), border `#CBD5E1`, text `#475569`.
- **Filter Chips:** 28px height, 4px border radius, background `#FFFFFF`, border `#E2E8F0`, dismissible cross icon. Active state fills with `#EEF2FF` with border `#C7D2FE` and text `#3730A3`.

### Search & Filter Toolbar
- **Directory Search Input:** High-visibility composite search bar featuring leading magnifying glass icon, keyboard shortcut badge (`⌘K`), background `#FFFFFF`, border `#CBD5E1`, inset focus ring in `#4338CA` at 2px offset.
- **Filter Bar:** Inline row consisting of multi-select dropdown triggers (Department, Location, Title, Employment Type) with chevron icons and active counter indicators.

### Employee Directory Cards
- **Structure:** Crisp white card, 1px `#E2E8F0` border, 16px internal padding.
- **Header:** Displays an 48px square avatar with 4px roundedness, full name in `title-md`, title in `body-sm` (`#64748B`), and floating top-right status badge.
- **Body:** Key metadata matrix containing department, manager, location, and internal email arranged in stacked key-value rows.
- **Footer:** Subdued action row featuring 1-click email launch, Slack bridge icon button, and direct profile navigation link.

### Lists & Data Grids
- **Table Headers:** Background `#F8FAFC`, uppercase `label-sm` text in `#64748B`, 1px bottom border `#E2E8F0`, sort indicators aligned right.
- **Rows:** 48px standard row height, 1px horizontal dividers, hover highlight `#F8FAFC`. Alternating zebra striping is omitted in favor of clean whitespace and border demarcation.

### Form Inputs & Checkboxes
- **Text Inputs:** Height 38px, background `#FFFFFF`, border 1px `#CBD5E1`, placeholder `#94A3B8`, focused ring 2px `#4338CA`.
- **Checkboxes & Radios:** 16px square/circle, border 1.5px `#94A3B8`, checked background `#4338CA` with crisp white SVG checkmark.