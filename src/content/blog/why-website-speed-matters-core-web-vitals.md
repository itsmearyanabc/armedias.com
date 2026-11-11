---
title: 'Core Web Vitals Explained: How to Fix LCP, INP and CLS'
description: "What Google's Core Web Vitals (LCP, INP and CLS) measure, why they affect rankings and sales, and the practical fixes that make websites fast."
category: web-apps
published: 2026-10-18
service: website-development
updated: 2026-11-12
faqs:
  - q: 'What are good Core Web Vitals scores?'
    a: 'Largest Contentful Paint of 2.5 seconds or less, Interaction to Next Paint of 200 milliseconds or less, and Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of real visits.'
  - q: 'How do I fix a poor CLS score?'
    a: 'Set width and height on images and videos, reserve space for ads and embeds, avoid inserting banners above existing content, preload fonts with font-display swap, and animate with transform instead of properties that move the layout.'
  - q: 'Does website speed affect Google rankings?'
    a: 'Yes. Page experience is one of the signals Google uses in ranking. It will not rescue thin content, but between similar pages the faster, more stable one has an edge.'
  - q: 'What makes a website slow?'
    a: 'The most common causes are oversized images, too much JavaScript, heavy themes and plugins, slow hosting, late-loading web fonts, and images or ads without reserved space.'
  - q: 'How can I check my website''s speed?'
    a: 'Use PageSpeed Insights for real-user data and a lab test, the Core Web Vitals report in Google Search Console, and Lighthouse in Chrome DevTools. Look at mobile results first.'
  - q: 'Can a website have animations and still be fast?'
    a: 'Yes. Animations stay fast when they use efficient properties, load after the main content and respect visitors who prefer reduced motion.'
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

## How to fix a poor CLS score

CLS (Cumulative Layout Shift) is usually the easiest Core Web Vital to fix, because every shift has a specific cause you can find and remove.

### What causes layout shift

- **Images and videos without dimensions.** The browser doesn't know how much room to leave, so the text below jumps when the file arrives.
- **Ads, embeds and iframes** that load late and push content down.
- **Content inserted above what's already on screen**, such as cookie notices, promo banners or "related posts" blocks.
- **Web fonts** that swap in with a different size from the fallback font, re-wrapping the text.
- **Animations that move the layout**, for example changing an element's height or top position.

### How to fix each one

1. **Set `width` and `height` on every image and video**, or give its container a CSS `aspect-ratio`. The browser then reserves the right space before the file loads.
2. **Reserve space for ads and embeds** with a fixed or minimum height, so the slot is already there when the content arrives.
3. **Don't push content down.** Show banners and notices as overlays, or leave room for them from the first paint.
4. **Stabilise fonts.** Preload your main font, use `font-display: swap`, and choose a fallback font with similar proportions.
5. **Animate with `transform` and `opacity`**, which don't move the surrounding layout.

### How to find what is shifting

PageSpeed Insights lists the elements responsible under its layout-shift audit. In Chrome DevTools, record a page load in the Performance panel to see each shift and the element that moved. Fix the largest shifts first and test on a phone-sized screen, where shifts tend to be worse.

## How to check your site

- **PageSpeed Insights** shows real-user Core Web Vitals (when Google has enough data) alongside a lab test with specific recommendations.
- **Google Search Console** has a Core Web Vitals report covering all your pages.
- **Chrome DevTools Lighthouse** helps diagnose issues during development.

Look at the **mobile** results first, because that is what most visitors experience and what Google primarily uses.

## Speed and animation can co-exist

Fast doesn't have to mean plain. Modern sites can include rich motion and interactions while staying fast, as long as animations use efficient properties, load after the main content, and respect visitors who prefer reduced motion.

If your site is slow, we can audit it and show you exactly what's holding it back, or rebuild it on a modern, performance-first stack.
