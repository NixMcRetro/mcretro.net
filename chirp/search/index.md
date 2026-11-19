---
layout: default
title: Find-a-Squawk - Channel Chirp Search
permalink: /chirp/search/
channel_chirp: true
pagefind: false
---
<section class="chirp-page-intro" aria-labelledby="chirp-search-heading">
  <h1 id="chirp-search-heading">Find-a-Squawk</h1>
  <p>Search the released Channel Chirp adventures only. The original McRetro blog and unreleased historical articles are not included here.</p>
</section>
{% assign chirp_posts = site.categories.parrots | where_exp: "bird", "bird.channel_chirp != false" %}
<section class="nest-adventures" aria-label="Find a released Channel Chirp adventure">
  <div class="nest-adventures-tools">
    <div class="nest-search">
      <label for="nest-search-input">Search the flock</label>
      <input id="nest-search-input" type="search" autocomplete="off" placeholder="Try Tillie, sultana, Chip, baths...">
      <p id="nest-search-status" role="status" aria-live="polite">{{ chirp_posts.size }} adventures</p>
    </div>
  </div>
  {% include channel-chirp-archive-list.html %}
</section>
<script src="/assets/js/channel-chirp-filter.js" defer></script>
