---
layout: default
title: "Channel Chirp - Welcome to the Nest"
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
  <h1 id="nest-heading">Pudge, Tillie, and Chip</h1>
  <p>Three little green-cheeked conures, an unreasonable amount of mischief, and enough chirps to fill a lifetime. Their adventures are returning as the original videos are re-released on the McRetro YouTube channel.</p>
</section>

<section id="nest-adventures" class="nest-adventures" aria-labelledby="nest-adventures-heading">
  <div class="nest-heading-row">
    <div>
      <h2 id="nest-adventures-heading">Adventures from the flock</h2>
      <p>Only already-released Channel Chirp stories appear here. More adventures will join the flock as their videos return.</p>
    </div>
    <span class="nest-post-total">{{ chirp_posts.size }} adventures</span>
  </div>
  <div class="nest-search">
    <label for="nest-search-input">Find an adventure</label>
    <input id="nest-search-input" type="search" autocomplete="off" placeholder="Search Tillie, Chip, millet, baths...">
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
          <h4><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h4>
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
          <p>{{ post.share_description | default: post.excerpt | strip_html | normalize_whitespace | truncate: 170 | escape }}</p>
          <a class="nest-read-link" href="{{ post.url | relative_url }}" aria-label="Read {{ post.title | escape }}">Continue reading</a>
        </article>
      {% endfor %}
      </div>
    </section>
  {% endfor %}
  </div>
  <p id="nest-no-results" class="nest-no-results" hidden>No chirps matched that search. Try a different word!</p>
</section>

<section id="nest-flock" class="nest-intro" aria-labelledby="nest-intro-heading">
  <h2 id="nest-intro-heading">Little birds, big personalities</h2>
  <p>Pudge was the boss, Tillie had opinions about everything, and Chip was a tiny cinnamon-coloured chaos machine. Meet the little personalities behind the adventures.</p>
  <ul class="nest-flock-list">
    <li><strong>Pudge</strong><span>The boss bird</span></li>
    <li><strong>Tillie</strong><span>The talker</span></li>
    <li><strong>Chip</strong><span>Baby Borb</span></li>
  </ul>
</section>

<section id="nest-soundborb" class="nest-intro nest-soundborb" aria-labelledby="nest-soundborb-heading">
  <h2 id="nest-soundborb-heading">Soundborb is finding a new nest</h2>
  <p>The soundboard isn't available here yet. Its audio and controls will move to Channel Chirp after the migration has been reviewed and tested.</p>
</section>
<script src="/assets/js/channel-chirp-filter.js" defer></script>
