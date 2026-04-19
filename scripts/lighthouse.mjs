#!/usr/bin/env node
/**
 * Lighthouse audit runner — desktop + mobile for a list of URLs.
 * Usage: node scripts/lighthouse.mjs [url1 url2 ...]
 * Defaults to http://localhost:3000 if no URLs provided.
 * Reports written to lighthouse-reports/<timestamp>/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const URLS = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['http://localhost:3000'];

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = path.join(ROOT, 'lighthouse-reports', timestamp);
fs.mkdirSync(outDir, { recursive: true });

const FORM_FACTORS = ['mobile', 'desktop'];

const desktopConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
};

const mobileConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
  },
};

function slugify(url) {
  return url.replace(/https?:\/\//, '').replace(/\//g, '_').replace(/[^a-z0-9_-]/gi, '') || 'root';
}

function scoreColor(score) {
  if (score === null || score === undefined) return '???';
  const pct = Math.round(score * 100);
  if (pct >= 90) return `\x1b[32m${pct}\x1b[0m`;
  if (pct >= 50) return `\x1b[33m${pct}\x1b[0m`;
  return `\x1b[31m${pct}\x1b[0m`;
}

function fmtMs(val) {
  if (val == null) return 'n/a';
  return `${Math.round(val)}ms`;
}

function fmtSec(val) {
  if (val == null) return 'n/a';
  return `${(val / 1000).toFixed(2)}s`;
}

const rows = [];

async function runAudit(url, formFactor) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'] });
  const config = formFactor === 'desktop' ? desktopConfig : mobileConfig;

  try {
    const result = await lighthouse(url, { port: chrome.port, output: ['html', 'json'] }, config);
    if (!result) throw new Error('Lighthouse returned no result');

    const { lhr, report } = result;
    const slug = slugify(url);
    const prefix = `${slug}__${formFactor}`;

    fs.writeFileSync(path.join(outDir, `${prefix}.html`), report[0]);
    fs.writeFileSync(path.join(outDir, `${prefix}.json`), report[1]);

    const cats = lhr.categories;
    const audits = lhr.audits;

    const row = {
      url,
      formFactor,
      perf: cats.performance?.score,
      a11y: cats.accessibility?.score,
      bp: cats['best-practices']?.score,
      seo: cats.seo?.score,
      fcp: audits['first-contentful-paint']?.numericValue,
      lcp: audits['largest-contentful-paint']?.numericValue,
      tbt: audits['total-blocking-time']?.numericValue,
      cls: audits['cumulative-layout-shift']?.numericValue,
      si: audits['speed-index']?.numericValue,
    };
    rows.push(row);
    return row;
  } finally {
    await chrome.kill();
  }
}

function printSummary() {
  console.log('\n\x1b[1m─── Lighthouse Results ───\x1b[0m');
  console.log(
    `${'URL'.padEnd(35)} ${'Form'.padEnd(8)} ${'Perf'.padEnd(6)} ${'A11y'.padEnd(6)} ${'BP'.padEnd(6)} ${'SEO'.padEnd(6)} ${'FCP'.padEnd(8)} ${'LCP'.padEnd(8)} ${'TBT'.padEnd(8)} ${'CLS'.padEnd(6)} ${'SI'.padEnd(8)}`
  );
  console.log('─'.repeat(120));
  for (const r of rows) {
    const urlShort = r.url.replace('http://localhost:3000', '').padEnd(35) || '/'.padEnd(35);
    console.log(
      `${urlShort} ${r.formFactor.padEnd(8)} ${scoreColor(r.perf).padEnd(6)} ${scoreColor(r.a11y).padEnd(6)} ${scoreColor(r.bp).padEnd(6)} ${scoreColor(r.seo).padEnd(6)} ${fmtSec(r.fcp).padEnd(8)} ${fmtSec(r.lcp).padEnd(8)} ${fmtMs(r.tbt).padEnd(8)} ${(r.cls != null ? r.cls.toFixed(3) : 'n/a').padEnd(6)} ${fmtSec(r.si).padEnd(8)}`
    );
  }
  console.log(`\nReports saved to: ${outDir}\n`);
}

async function main() {
  console.log(`\nAuditing ${URLS.length} URL(s) × ${FORM_FACTORS.length} form factors...\n`);

  for (const url of URLS) {
    for (const ff of FORM_FACTORS) {
      process.stdout.write(`  Running ${ff.padEnd(8)} → ${url} ... `);
      try {
        await runAudit(url, ff);
        console.log('done');
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
      }
    }
  }

  printSummary();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
