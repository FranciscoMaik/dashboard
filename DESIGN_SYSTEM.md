# Design System

## Typography

**Font Family**: Inter (Sans Serif)
**Usage**: Used for all text elements.

- **Variable**: `--font-inter`
- **Tailwind Class**: `font-sans`

## Spacing

The project uses an **8px grid system**. 
All spacing (padding, margin, gap, width, height) should ideally be multiples of **8px**.

Tailwind's default spacing scale works perfectly for this:
- `1` = `4px` (0.5x grid)
- `2` = `8px` (1x grid)
- `3` = `12px` (1.5x grid)
- `4` = `16px` (2x grid)
- `6` = `24px` (3x grid)
- `8` = `32px` (4x grid)
- `10` = `40px` (5x grid)
- ...and so on.

**Rule of Thumb**: Prefer even numbers in Tailwind classes (e.g., `p-4`, `m-8`) to stick to the 8px grid. Use odd numbers (e.g., `p-1`, `gap-3`) only for fine-tuning or smaller components where 4px granularity is needed.

## Colors

The color palette is defined in `globals.css` using CSS variables and OKLCH color space for modern color manipulation.

### Core Colors
- **Primary**: Brand primary color.
- **Secondary**: Secondary actions/accents.
- **Background/Foreground**: App structure colors.
- **Muted**: For de-emphasized text or backgrounds.

### Usage
Use standard shadcn/ui variables or Tailwind classes:
- `bg-primary`
- `text-primary-foreground`
- `border-input`
