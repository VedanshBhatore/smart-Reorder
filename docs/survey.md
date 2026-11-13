# Quick-commerce reorder survey

A 12-question Google Forms survey for people who use quick-commerce / instant
grocery delivery apps (Instamart, Blinkit, Zepto, BigBasket Now, etc.). Goal:
find out how often people rebuy the same basket, how they do it today, and
whether a one-tap "usual basket" reorder would be welcome — without leading
them toward that answer.

**How to use this file**

1. Create a new Google Form and add these 12 questions **with this exact
   wording** (or note what you changed — see below).
2. Set every question other than #6 and #10 to **required**, so the charts
   don't have to handle missing values for the core questions.
3. Share the form, collect responses (target: 50+), then from the Forms
   response sheet use **File → Download → Comma-separated values (.csv)**.
4. On the case-study site's Research section, use **Import survey CSV** and
   upload that file.
5. If you reword a question, update the matching `csvHeader` string in
   `src/lib/surveyColumnMap.ts` to the new wording — the importer matches
   columns by exact header text, nothing else needs to change.

A sample file matching this exact structure ships at
`src/data/sampleSurvey.csv` and is clearly labelled as sample data in the UI
until you import a real export.

---

## Screening

**1. How often do you order groceries or everyday essentials through a
quick-commerce app (Instamart, Blinkit, Zepto, etc.)?**
*Single choice.*
- Daily
- A few times a week
- About once a week
- A few times a month
- Rarely or never

## Repeat-purchase behaviour

**2. When you do order, how often is it mostly the same items as your last
few orders (e.g. milk, bread, eggs, vegetables)?**
*Single choice.*
- Always the same items
- Mostly the same, with a few new things
- An even mix of repeat and new items
- Mostly new items
- Always different items

**3. Think about the last time you reordered something you buy regularly.
How did you actually do it?**
*Single choice.*
- Searched for each item again from scratch
- Reopened a past order and added items from it
- Used a "reorder" / "buy again" button
- Added items from memory to a new cart
- Something else

**4. Roughly how many taps or screens did that reordering take, from opening
the app to checkout?**
*Single choice.*
- 1–3
- 4–6
- 7–10
- More than 10
- Not sure / don't remember

## Frustration and appetite for a fix

**5. How frustrating do you find reordering the same items you buy
regularly, on a scale of 1 to 5?**
*Linear scale, 1 = Not at all frustrating, 5 = Very frustrating.*

**6. What's the most annoying part of reordering for you, if anything?**
*Open text. Optional.*

**7. Imagine the app showed a "Your usual basket" card, pre-filled from your
past orders, that you could review and check out in one tap. How likely
would you be to use it?**
*Linear scale, 1 = Very unlikely, 5 = Very likely.*

**8. Even with a pre-filled basket like that, would you still want the
ability to change quantities or swap out items before checking out?**
*Single choice.*
- Yes
- No
- Not sure

**9. Has a quick-commerce order of yours ever arrived with a substitute item
or something missing, for something you buy regularly?**
*Single choice.*
- Yes, often
- Yes, occasionally
- Rarely
- Never

## About you

**10. Which quick-commerce or instant-delivery apps do you use regularly?**
*Open text. Optional — list as many as apply.*

**11. Which age band are you in?**
*Single choice.*
- Under 18
- 18–24
- 25–34
- 35–44
- 45–54
- 55 or older

**12. Which best describes where you live?**
*Single choice.*
- Tier 1 metro (e.g. Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune)
- Tier 2 city
- Tier 3 city or smaller town
- Outside India

---

## Wording notes (why it's phrased this way)

- Q1 screens for relevance without asking "do you use quick-commerce apps?"
  as a yes/no gate, which tends to invite an eager yes from people who barely
  use them.
- Q2–Q4 ask about **the last actual time**, not a general impression — people
  overestimate how streamlined their own habits are when asked abstractly.
- Q5 and Q7 are both plain 1–5 scales, deliberately not phrased as
  "wouldn't it be great if…" — a leading framing would inflate Q7.
- Q8 exists specifically to catch anyone who'd resent losing control — a
  "Smart Reorder" that can't be edited is a different, riskier product than
  the one this case study proposes.
- Q9 is a guardrail-relevant question: if substitutions/missing items are
  already common, that matters for the "unwanted-item rate" guardrail metric
  in the case study, independent of the reorder redesign.
