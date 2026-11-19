---
layout: default
title: "Channel Chirp - Welcome to The Nest"
permalink: /chirp/
channel_chirp: true
pagefind: false
---

{% comment %}
Channel Chirp articles are the original McRetro Parrots category,
minus individually opted-out non-flock posts (the Little Corella article).
Keep category taxonomy, original post URLs, and YouTube embeds unchanged.
{% endcomment %}
{% assign chirp_posts = site.categories.parrots | where_exp: "bird", "bird.channel_chirp != false" %}
<section class="nest-hero" aria-labelledby="nest-heading">
  <span class="nest-hero-eyebrow">CHANNEL CHIRP · THE CONURE ARCHIVE</span>
  <div class="nest-hero-birds" aria-hidden="true">🦜 ✨ 🦜 ✨ 🦜</div>
  <h1 id="nest-heading">Welcome to The Nest</h1>
  <p>The adventures of Pudge, Tillie, and Chip. Three little green-cheeked conures, an unreasonable amount of mischief, and enough chirps to fill a lifetime.</p>
  <div class="nest-hero-actions">
    <a href="#nest-adventures">Explore the adventures</a>
    <a href="/chirp/archive/" class="nest-hero-secondary">Explore the preserved original site</a>
  </div>
</section>

<section class="nest-intro" aria-labelledby="nest-intro-heading">
  <h2 id="nest-intro-heading">Little birds, big personalities</h2>
  <p>Pudge was the boss, Tillie had opinions about everything, and Chip was a tiny cinnamon-coloured chaos machine. Their adventures live on here, alongside the entire preserved Channel Chirp website, including its 229 historical adventures and the complete Soundborb library.</p>
  <div class="nest-flock-links">
    <a href="/chirp/archive/pudge/"><span aria-hidden="true">🦜</span><strong>Pudge</strong><small>The boss bird · Meet Pudge</small></a>
    <a href="/chirp/archive/tillie/"><span aria-hidden="true">🦜</span><strong>Tillie</strong><small>The talker · Meet Tillie</small></a>
    <a href="/chirp/archive/chip/"><span aria-hidden="true">🦜</span><strong>Chip</strong><small>Baby Borb · Meet Chip</small></a>
  </div>
</section>

<section class="nest-intro nest-original-archive" aria-labelledby="nest-original-archive-heading">
  <p class="nest-kicker">PRESERVED FROM THE ORIGINAL WEBSITE</p>
  <h2 id="nest-original-archive-heading">The Complete Channel Chirp Archive</h2>
  <p>The original website's 229 adventures, flock profiles, complete timeline, and Soundborb with 509 individual recordings are preserved here in a self-hosted snapshot. No links to the old Channel Chirp domain are needed to explore them.</p>
  <div class="nest-flock-links">
    <a href="/chirp/archive/adventures/"><span aria-hidden="true">📚</span><strong>229 Original Posts</strong><small>Explore the complete original archive</small></a>
    <a href="/chirp/archive/timeline/"><span aria-hidden="true">📅</span><strong>The Timeline</strong><small>Follow every original adventure</small></a>
    <a href="/chirp/archive/soundborb/"><span aria-hidden="true">🎶</span><strong>Soundborb</strong><small>509 original little chirps</small></a>
  </div>
</section>

<section id="nest-adventures" class="nest-adventures" aria-labelledby="nest-adventures-heading">
  <div class="nest-heading-row">
    <div>
      <span class="nest-kicker">BIRD BLOG</span>
      <h2 id="nest-adventures-heading">Adventures from the flock</h2>
      <p>The restored and edited conure adventures on McRetro. For every original article, including those not yet restored, visit the complete archive above.</p>
    </div>
    <span class="nest-post-total">{{ chirp_posts.size }} adventures</span>
  </div>
  <div class="nest-search">
    <label for="nest-search-input">Find an adventure</label>
    <input id="nest-search-input" type="search" autocomplete="off" placeholder="Try Tillie, Chip, millet, bath...">
    <p id="nest-search-status" role="status" aria-live="polite">{{ chirp_posts.size }} adventures</p>
  </div>

  {% assign bird_years = chirp_posts | group_by_exp: "bird", "bird.date | date: '%Y'" %}
  <div class="nest-archive-list" id="nest-archive-list">
  {% for year in bird_years %}
    <section class="nest-year-group" data-nest-group aria-labelledby="nest-year-{{ year.name }}">
      <h3 id="nest-year-{{ year.name }}" class="nest-year-title">{{ year.name }} <small>{{ year.items.size }} {% if year.items.size == 1 %}adventure{% else %}adventures{% endif %}</small></h3>
      <div class="nest-post-grid">
      {% for post in year.items %}
        <article class="nest-post-card" data-nest-post>
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {% assign d = post.date | date: '%-d' | plus: 0 %}
            {% case d %}
            {% when 1 or 21 or 31 %}{% assign ordinal = 'st' %}
            {% when 2 or 22 %}{% assign ordinal = 'nd' %}
            {% when 3 or 23 %}{% assign ordinal = 'rd' %}
            {% else %}{% assign ordinal = 'th' %}
            {% endcase %}
            {{ d }}{{ ordinal }} {{ post.date | date: '%B %Y' }}
          </time>
          <h4><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h4>
          <p>{{ post.share_description | default: post.excerpt | strip_html | normalize_whitespace | truncate: 170 | escape }}</p>
          <a class="nest-read-link" href="{{ post.url | relative_url }}" aria-label="Read {{ post.title | escape }}">Read this adventure <span aria-hidden="true">›</span></a>
        </article>
      {% endfor %}
      </div>
    </section>
  {% endfor %}
  </div>
  <p id="nest-no-results" class="nest-no-results" hidden>No chirps matched that search. Try a different word!</p>
</section>
<script src="/assets/js/channel-chirp-filter.js" defer></script>
