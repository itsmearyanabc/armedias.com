---
title: 'Why Website Speed Matters: Core Web Vitals Explained'
description: "What Google's Core Web Vitals (LCP, INP and CLS) measure, why they affect rankings and sales, and the practical fixes that make websites fast."
category: web-apps
published: 2026-10-18
service: website-development
---

A slow website costs you twice: visitors leave before they see your offer, and search engines are less likely to show your pages in the first place. Google measures real-world page experience with a set of metrics called **Core Web Vitals**. Understanding them is the fastest way to know whether your site is helping or hurting your business.

## The three Core Web Vitals

### Largest Contentful Paint (LCP): loading

LCP measures how long it takes for the largest visible element, usually a hero image or headline, to appear.

- **Good:** 2.5 seconds or less
- **Needs improvement:** 2.5 to 4 seconds
- **Poor:** more than 4 seconds

### Interaction to Next Paint (INP): responsiveness

INP measures how quickly the page responds when someone taps, clicks or types. It replaced First Input Delay as a Core Web Vital in 2024.

- **Good:** 200 milliseconds or less
- **Needs improvement:** 200 to 500 milliseconds
- **Poor:** more than 500 milliseconds

### Cumulative Layout Shift (CLS): visual stability

CLS measures how much the page jumps around while loading, like the button that moves just as you tap it.

- **Good:** 0.1 or less
- **Needs improvement:** 0.1 to 0.25
- **Poor:** more than 0.25

Google assesses these at the 75th percentile of real visits, so most of your visitors need a good experience, not just the ones on fast connections.

## Why it matters for your business

**Search visibility.** Page experience is one of the signals Google uses in ranking. It won't rescue thin content, but between similar pages, the faster, more stable one has an edge.

**Conversions.** Every extra second of waiting gives visitors a reason to leave. That's especially true on mobile networks, which is where most of your traffic likely comes from.

**Ad spend.** If you pay for traffic, a slow landing page wastes part of every click you buy.

**Trust.** A site that loads instantly and behaves smoothly feels professional. A janky one makes visitors doubt the business behind it.

## The most common causes of slow websites

1. **Oversized images.** Uploading large photos without resizing or modern formats is the single most common problem.
2. **Too much JavaScript.** Page builders, sliders, chat widgets and tracking scripts all add code the browser must download and run.
3. **Heavy themes and plugins.** Many template-based sites load features on every page whether they're used or not.
4. **Slow hosting.** Cheap, overcrowded servers far from your visitors add delay before anything loads.
5. **Web fonts loaded late**, causing invisible or shifting text.
6. **Images and ads without reserved space**, causing layout shift.

## Practical fixes that work

- **Serve modern image formats** such as WebP or AVIF, sized for each screen, and lazy-load images below the fold.
- **Ship less JavaScript.** Build pages as HTML first and add interactivity only where needed.
- **Prioritise the hero.** Make sure the main headline and image load first, with nothing blocking them.
- **Reserve space** for images, embeds and ads with fixed dimensions to prevent jumps.
- **Self-host and subset fonts**, and use `font-display: swap`.
- **Use a CDN and caching** so files are served from close to your visitors.
- **Audit third-party scripts** and remove anything that isn't earning its place.

## How to check your site

- **PageSpeed Insights** shows real-user Core Web Vitals (when Google has enough data) alongside a lab test with specific recommendations.
- **Google Search Console** has a Core Web Vitals report covering all your pages.
- **Chrome DevTools Lighthouse** helps diagnose issues during development.

Look at the **mobile** results first, because that is what most visitors experience and what Google primarily uses.

## Speed and animation can co-exist

Fast doesn't have to mean plain. Modern sites can include rich motion and interactions while staying fast, as long as animations use efficient properties, load after the main content, and respect visitors who prefer reduced motion.

If your site is slow, we can audit it and show you exactly what's holding it back, or rebuild it on a modern, performance-first stack.
