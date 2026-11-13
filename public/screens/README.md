# Your Instamart screenshots go here

The Teardown section on the case-study site expects three annotated
screenshots of the real Instamart app, at these exact paths:

- `public/screens/01-account-tab.png` — the Account tab / navigation to Orders
- `public/screens/02-order-detail.png` — a past order's detail screen, adding items
- `public/screens/03-out-of-stock.png` — the out-of-stock state for an item

Any image format works if you update the extension in
`src/features/casestudy/sections/Teardown.tsx` to match. Recommended: a
portrait screen recording still, 1080×1920 or similar, with your own
annotations (arrows/circles calling out the friction point) added in any
image editor. Until a file exists at a given path, the site shows a dashed
placeholder box instead of a broken image.
