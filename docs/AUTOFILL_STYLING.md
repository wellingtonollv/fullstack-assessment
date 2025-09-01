# Autofill Styling Documentation

## Overview

This document explains the implementation of autofill styling in the fullstack-assessment application, specifically the usage of the `input:-internal-autofill-selected` CSS pseudo-class and related browser autofill styles.

## Location

The autofill styling is implemented in:
```
frontend/src/global.css
```

## Implementation

The CSS includes styling for multiple browser autofill pseudo-classes:

### Primary Autofill Selectors
- `input:-webkit-autofill` - Webkit browsers (Chrome, Safari, Edge)
- `input:-webkit-autofill:hover` - Hover state for autofilled inputs
- `input:-webkit-autofill:focus` - Focus state for autofilled inputs  
- `input:-webkit-autofill:active` - Active state for autofilled inputs
- `input:-internal-autofill-selected` - Internal browser pseudo-class for selected autofill

### Styling Properties Applied

```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active,
input:-internal-autofill-selected {
  -webkit-box-shadow: 0 0 0 30px hsl(var(--background)) inset !important;
  -webkit-text-fill-color: hsl(var(--foreground)) !important;
  background-color: hsl(var(--background)) !important;
  border-color: hsl(var(--border)) !important;
}
```

### Dark Mode Support

Additional styling is provided for dark mode compatibility:

```css
.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover,
.dark input:-webkit-autofill:focus,
.dark input:-webkit-autofill:active,
.dark input:-internal-autofill-selected {
  -webkit-box-shadow: 0 0 0 30px hsl(var(--background)) inset !important;
  -webkit-text-fill-color: hsl(var(--foreground)) !important;
}
```

## Purpose

The styling serves to:

1. **Override Browser Defaults**: Browsers apply their own styling to autofilled form fields (typically a yellow background)
2. **Maintain Design Consistency**: Ensures autofilled inputs match the application's design system
3. **Support Theme Integration**: Uses CSS custom properties to respect light/dark mode themes
4. **Cross-Browser Compatibility**: Covers various autofill pseudo-classes used by different browsers

## Technical Details

- **Box Shadow Technique**: Uses a large inset box-shadow to override the browser's background color
- **Important Declarations**: Uses `!important` to ensure styles override browser defaults
- **CSS Custom Properties**: Integrates with the existing design system using HSL color variables
- **Layered Approach**: Applied in the `@layer base` to ensure proper CSS cascade order

## Browser Support

- ✅ Chrome/Chromium-based browsers
- ✅ Safari/WebKit browsers  
- ✅ Edge (Chromium)
- ⚠️ Firefox (limited autofill pseudo-class support)

## Form Fields Affected

The styling applies to all input elements in forms throughout the application, including:
- Employee creation form (First Name, Last Name, Phone, Address)
- Any future forms with text input fields
- Input components using the ShadCN UI Input component

## Testing

To test the autofill styling:

1. Open the Create Employee form
2. Fill in form fields and submit to save to browser autofill
3. Clear the form and trigger browser autofill
4. Verify the autofilled inputs maintain consistent styling with the rest of the form