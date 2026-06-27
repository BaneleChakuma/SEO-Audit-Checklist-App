# Tailwind CSS documentation map

Use this when the task goes beyond basic utility styling for this app.

## Getting started

| Topic | URL |
|-------|-----|
| Docs overview | https://tailwindcss.com/docs |
| Install with Vite | https://tailwindcss.com/docs/installation/using-vite |
| Install with PostCSS | https://tailwindcss.com/docs/installation/using-postcss |
| Tailwind CLI | https://tailwindcss.com/docs/installation/tailwind-cli |
| Framework guides | https://tailwindcss.com/docs/installation/framework-guides |
| Play CDN (prototypes only) | https://tailwindcss.com/docs/installation/play-cdn |
| Editor setup | https://tailwindcss.com/docs/editor-setup |
| Upgrade guide | https://tailwindcss.com/docs/upgrade-guide |
| Compatibility | https://tailwindcss.com/docs/compatibility |

## Core concepts

| Topic | URL |
|-------|-----|
| Styling with utility classes | https://tailwindcss.com/docs/styling-with-utility-classes |
| Hover, focus, and other states | https://tailwindcss.com/docs/hover-focus-and-other-states |
| Responsive design | https://tailwindcss.com/docs/responsive-design |
| Dark mode | https://tailwindcss.com/docs/dark-mode |
| Theme variables | https://tailwindcss.com/docs/theme |
| Colors | https://tailwindcss.com/docs/colors |
| Adding custom styles | https://tailwindcss.com/docs/adding-custom-styles |
| Detecting classes in source | https://tailwindcss.com/docs/detecting-classes-in-source-files |
| Functions and directives | https://tailwindcss.com/docs/functions-and-directives |
| Preflight (base reset) | https://tailwindcss.com/docs/preflight |

## Layout

| Topic | URL |
|-------|-----|
| Display | https://tailwindcss.com/docs/display |
| Position | https://tailwindcss.com/docs/position |
| Top / right / bottom / left | https://tailwindcss.com/docs/top-right-bottom-left |
| Z-index | https://tailwindcss.com/docs/z-index |
| Overflow | https://tailwindcss.com/docs/overflow |
| Aspect ratio | https://tailwindcss.com/docs/aspect-ratio |
| Box sizing | https://tailwindcss.com/docs/box-sizing |
| Columns | https://tailwindcss.com/docs/columns |

## Flexbox and grid

| Topic | URL |
|-------|-----|
| Flex | https://tailwindcss.com/docs/flex |
| Flex direction | https://tailwindcss.com/docs/flex-direction |
| Flex wrap | https://tailwindcss.com/docs/flex-wrap |
| Justify content | https://tailwindcss.com/docs/justify-content |
| Align items | https://tailwindcss.com/docs/align-items |
| Gap | https://tailwindcss.com/docs/gap |
| Grid template columns | https://tailwindcss.com/docs/grid-template-columns |
| Grid column / row | https://tailwindcss.com/docs/grid-column |
| Place items | https://tailwindcss.com/docs/place-items |

## Spacing and sizing

| Topic | URL |
|-------|-----|
| Padding | https://tailwindcss.com/docs/padding |
| Margin | https://tailwindcss.com/docs/margin |
| Width | https://tailwindcss.com/docs/width |
| Min/max width | https://tailwindcss.com/docs/min-width |
| Height | https://tailwindcss.com/docs/height |
| Size | https://tailwindcss.com/docs/size |

## Typography

| Topic | URL |
|-------|-----|
| Font size | https://tailwindcss.com/docs/font-size |
| Font weight | https://tailwindcss.com/docs/font-weight |
| Font family | https://tailwindcss.com/docs/font-family |
| Text align | https://tailwindcss.com/docs/text-align |
| Text color | https://tailwindcss.com/docs/text-color |
| Line height | https://tailwindcss.com/docs/line-height |
| Letter spacing | https://tailwindcss.com/docs/letter-spacing |
| Text decoration | https://tailwindcss.com/docs/text-decoration-line |
| Text overflow / truncate | https://tailwindcss.com/docs/text-overflow |
| Whitespace | https://tailwindcss.com/docs/white-space |

## Backgrounds and borders

| Topic | URL |
|-------|-----|
| Background color | https://tailwindcss.com/docs/background-color |
| Background image | https://tailwindcss.com/docs/background-image |
| Border radius | https://tailwindcss.com/docs/border-radius |
| Border width | https://tailwindcss.com/docs/border-width |
| Border color | https://tailwindcss.com/docs/border-color |
| Outline | https://tailwindcss.com/docs/outline-width |

## Effects and interactivity

| Topic | URL |
|-------|-----|
| Box shadow | https://tailwindcss.com/docs/box-shadow |
| Opacity | https://tailwindcss.com/docs/opacity |
| Transition | https://tailwindcss.com/docs/transition-property |
| Animation | https://tailwindcss.com/docs/animation |
| Cursor | https://tailwindcss.com/docs/cursor |
| Pointer events | https://tailwindcss.com/docs/pointer-events |
| User select | https://tailwindcss.com/docs/user-select |
| Screen readers (sr-only) | https://tailwindcss.com/docs/screen-readers |

## Filters and SVG

| Topic | URL |
|-------|-----|
| Filter | https://tailwindcss.com/docs/filter |
| Backdrop filter | https://tailwindcss.com/docs/backdrop-filter |
| Fill | https://tailwindcss.com/docs/fill |
| Stroke | https://tailwindcss.com/docs/stroke |

## Ecosystem (optional)

| Resource | URL |
|----------|-----|
| Tailwind UI blocks | https://tailwindcss.com/plus/ui-blocks |
| Headless UI (accessible components) | https://headlessui.com |
| Heroicons | https://heroicons.com |
| Playground | https://play.tailwindcss.com |

Note: Tailwind Plus / UI blocks are paid. Prefer free utilities and small project components in `src/components/ui/` unless the user owns a license.

## This app stack

| Layer | Choice |
|-------|--------|
| Build tool | Vite |
| UI framework | React 18 (`className` for classes) |
| Tailwind version | v4 with `@tailwindcss/vite` plugin |
| Hosting | Netlify (no Tailwind-specific deploy steps) |

For React component patterns, also use the project's `react-dev` skill. For Firebase UI that needs auth-aware styling, use `firebase-docs` for data and this skill for presentation.
