---
layout: default
title: Find-a-Squawk - Channel Chirp Search
permalink: /chirp/search/
channel_chirp: true
pagefind: false
---
{% assign chirp_posts = site.categories.parrots | where_exp: "bird", "bird.channel_chirp != false" %}
<section class="chirp-search-page" aria-labelledby="chirp-search-heading">
  <header class="chirp-search-heading">
    <img src="/assets/images/search/search.gif" width="35" height="35" alt="" aria-hidden="true">
    <div>
      <h1 id="chirp-search-heading">Find-a-Squawk</h1>
      <p>Search released Channel Chirp adventures only.</p>
    </div>
  </header>
  <div class="chirp-search-form" role="search" aria-label="Search Channel Chirp">
    <label class="visually-hidden" for="nest-search-input">Search the flock</label>
    <div class="chirp-search-field">
      <span class="chirp-search-icon" aria-hidden="true">⌕</span>
      <input id="nest-search-input" name="q" type="search" autocomplete="off" placeholder="Search the flock...">
      <button id="nest-search-clear" class="chirp-search-clear" type="button" hidden>Clear</button>
    </div>
  </div>
  <p id="nest-search-status" class="chirp-search-status" role="status" aria-live="polite">{{ chirp_posts.size }} adventures</p>
  <div id="nest-archive-list" class="chirp-search-results" aria-label="Released Channel Chirp search results">
    {% for post in chirp_posts %}
    <article class="chirp-search-result" data-nest-post>
      <h2 class="chirp-search-result-title"><a href="{{ post.url | relative_url }}" data-nest-highlight>{{ post.title | escape }}</a></h2>
      <p class="chirp-search-result-excerpt" data-nest-highlight>{{ post.share_description | default: post.excerpt | strip_html | normalize_whitespace | truncate: 220 | escape }}</p>
      <p class="chirp-search-result-date">
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
      </p>
    </article>
    {% endfor %}
  </div>
  <button type="button" class="chirp-search-more" id="nest-search-more" hidden>Show more results</button>
  <p class="nest-no-results chirp-search-empty" id="nest-no-results" hidden>No chirps matched that search. Try a different word!</p>
</section>
<script src="/assets/js/channel-chirp-filter.js" defer></script>
