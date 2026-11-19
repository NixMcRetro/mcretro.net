---
layout: default
title: Channel Chirp Adventures
permalink: /chirp/adventures/
channel_chirp: true
pagefind: false
---
{% assign migrated = site.chirp_archive | sort: "date" | reverse %}
{% assign existing = site.categories.parrots | where_exp: "post", "post.channel_chirp != false" %}
{% assign all_chirps = migrated | concat: existing | sort: "date" | reverse %}
<section class="nest-adventures" aria-labelledby="chirp-all-heading">
  <p class="nest-kicker">CHANNEL CHIRP · COMPLETE ADVENTURES</p>
  <h1 id="chirp-all-heading">The Complete Chirp Archive</h1>
  <p>From the very first chirps to the last adventures. This archive brings together the preserved Channel Chirp posts and the restored McRetro articles. Where a post has already been reworked for McRetro, that version is preferred.</p>
  <p class="nest-post-total">{{ all_chirps.size }} adventures</p>
  <div class="nest-search">
    <label for="nest-search-input">Find a Channel Chirp adventure</label>
    <input id="nest-search-input" type="search" autocomplete="off" placeholder="Search the original and restored adventures">
    <p id="nest-search-status" role="status" aria-live="polite">{{ all_chirps.size }} adventures</p>
  </div>
  {% assign archive_years = all_chirps | group_by_exp: "post", "post.date | date: '%Y'" %}
  <div class="nest-archive-list" id="nest-archive-list">
  {% for year in archive_years %}
    <section class="nest-year-group" data-nest-group>
      <h2 class="nest-year-title">{{ year.name }} <small>{{ year.items.size }} adventures</small></h2>
      <div class="nest-post-grid">
      {% for post in year.items %}
        <article class="nest-post-card" data-nest-post>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %B %Y" }}</time>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
          <p>{% if post.share_description %}{{ post.share_description | strip_html | escape }}{% else %}A preserved Channel Chirp adventure from the original site.{% endif %}</p>
          <a class="nest-read-link" href="{{ post.url | relative_url }}">Read this adventure <span aria-hidden="true">›</span></a>
        </article>
      {% endfor %}
      </div>
    </section>
  {% endfor %}
  </div>
  <p id="nest-no-results" hidden>No chirps matched that search.</p>
</section>
<script src="/assets/js/channel-chirp-filter.js" defer></script>
