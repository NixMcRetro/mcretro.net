---
layout: default
title: Channel Chirp Adventures
permalink: /chirp/adventures/
channel_chirp: true
pagefind: false
---
<section class="chirp-page-intro" aria-labelledby="chirp-adventures-heading">
  <h1 id="chirp-adventures-heading">Channel Chirp Adventures</h1>
  <p>Our released stories of Pudge, Tillie, and Chip, organised by month. Each adventure keeps its original McRetro article address, and new stories join as their videos are re-released.</p>
  <p><a href="/chirp/timeline/">View the Flock Timeline</a></p>
</section>
{% assign chirp_posts = site.categories.parrots | where_exp: "bird", "bird.channel_chirp != false" %}
<section class="nest-adventures" aria-labelledby="chirp-articles-heading">
  <div class="nest-adventures-tools">
    <h2 id="chirp-articles-heading">Released Adventures</h2>
    <p>{{ chirp_posts.size }} adventures to explore.</p>
    <div class="nest-search">
      <label for="nest-search-input">Filter the adventures</label>
      <input id="nest-search-input" type="search" autocomplete="off" placeholder="Search titles and descriptions...">
      <p id="nest-search-status" role="status" aria-live="polite">{{ chirp_posts.size }} adventures</p>
    </div>
  </div>
  {% include channel-chirp-archive-list.html %}
</section>
<script src="/assets/js/channel-chirp-filter.js" defer></script>
