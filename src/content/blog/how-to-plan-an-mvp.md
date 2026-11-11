---
title: 'How to Plan an MVP: What to Build First'
description: 'A practical guide for founders planning a minimum viable product: choosing one problem to solve, cutting scope, picking web or mobile and testing with users.'
category: web-apps
published: 2026-11-12
service: custom-software-development
faqs:
  - q: 'What is an MVP?'
    a: 'A minimum viable product is the smallest version of a product that real users can use to solve one real problem. Its purpose is to learn whether the idea works before you invest in the full product.'
  - q: 'What features should an MVP have?'
    a: 'Only the features needed for one user to complete the core task from start to finish, plus sign-in and a way for you to see what users do. Everything else waits until users ask for it.'
  - q: 'Should an MVP be a mobile app or a web app?'
    a: 'Start with the web unless the product depends on the phone itself, such as the camera, location or notifications. A web app reaches every device, is faster to change and needs no store approval.'
  - q: 'How long does it take to build an MVP?'
    a: 'It depends on scope, but an MVP should take weeks or a few months, not a year. If the plan is longer than that, the scope is usually too large for a first version.'
  - q: 'What comes after the MVP?'
    a: 'Measure whether users complete the core task and come back, talk to them, then decide what to improve, add or drop. The second version should be shaped by that evidence.'
---

Most first products fail for an ordinary reason: the team built too much before finding out whether anyone wanted it. A minimum viable product, or MVP, exists to prevent that. It is the smallest version of your product that real users can use to solve one real problem.

Planning an MVP well is mostly about deciding what **not** to build. Here is a practical way to do it.

## Start with one user and one problem

Write a single sentence in this form:

> **[A specific kind of person]** needs to **[do one thing]** because **[the reason it matters to them]**.

"Small clinics need to send appointment reminders on WhatsApp because missed appointments cost them income" is a good sentence. "A platform for healthcare" is not.

If you cannot write the sentence, you are not ready to build. Talk to more potential users first.

## Map the core journey

List the steps one user takes to get the result, from opening the product to the moment they get value. For the clinic example:

1. Sign in
2. Add or import today's appointments
3. Send reminders
4. See who confirmed

That journey is your MVP. Every feature must earn its place by being a step on it.

## Sort every feature into three lists

Take every idea you have and place it in exactly one list:

| List | Rule | Examples |
|---|---|---|
| **Must have** | The core journey breaks without it | Sign-in, the core action, basic data entry |
| **Later** | Useful, but users can live without it at first | Reports, settings, integrations, multiple roles |
| **Not now** | Nice ideas with no evidence yet | Recommendation engines, social features, a mobile app as well as web |

Be strict. Most first lists of "must haves" are three times too long. A useful test: **if this were missing, would a first user refuse to try the product?** If not, it goes in Later.

## Do things manually behind the scenes

An MVP has to feel complete to the user. It does not have to be automated for you.

- Onboard your first customers by hand instead of building a setup wizard.
- Send invoices yourself instead of building billing.
- Answer support questions on WhatsApp or email instead of building a help centre.
- Run a weekly report from the database instead of building a dashboard.

Manual work shows you what people really need, and you only automate what proves worth it.

## Web app or mobile app?

Unless your product depends on the phone itself, start on the web.

**Choose web first when** users will work at a desk, you expect to change the product often, or you want people to try it from a link with nothing to install.

**Choose mobile first when** the product needs the camera, location, notifications or offline use, or your users are rarely at a computer.

If you do need both platforms, a cross-platform framework such as Flutter or React Native lets one codebase serve iPhone and Android.

## Build on foundations you will not regret

Cutting scope is not the same as cutting corners. A few things are worth doing properly from the first day:

- **User accounts and permissions** done securely.
- **A clean data model**, because changing it later is the most expensive kind of change.
- **Basic analytics**, so you can see whether users finish the core journey.
- **Backups and hosting** you control.
- **Ownership.** The code, domains and cloud accounts should be in your company's name.

What can wait: polish on rarely used screens, advanced settings and performance tuning for traffic you do not have yet.

## Decide how you will know it worked

Before you launch, write down what success looks like in numbers you can observe:

- How many of the people who sign up complete the core journey?
- How many come back the following week?
- Will anyone pay, or commit to paying?

Then put the product in front of a small group of real users. Watch a few of them use it without helping. The places where they hesitate tell you more than any survey.

## Common mistakes

1. **Building for everyone.** A product for one specific user beats a vague product for many.
2. **Adding features to avoid launching.** Launch is when learning starts.
3. **Skipping design.** A quick clickable prototype exposes problems in days that would cost weeks in code.
4. **Not owning the code.** Make sure the repository and accounts are yours.
5. **Treating the MVP as throwaway.** Small is good; fragile is not. Build the first version on a codebase that can grow.

## What to do next

Write your one-sentence problem statement, map the core journey and sort your features into the three lists. Those three pages are enough for any developer to give you a realistic scope and timeline. If you would like a second opinion on what to cut, we are happy to go through your lists on a free call.
