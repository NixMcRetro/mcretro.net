---
layout: default
title: Channel Chirp Timeline
permalink: /chirp/timeline/
channel_chirp: true
pagefind: false
---
{% assign restored = site.categories.parrots | where_exp: "post", "post.channel_chirp != false" %}
{% assign all_chirps = site.chirp_archive | concat: restored | sort: "date" %}
<section class="nest-intro">
  <p class="nest-kicker">THE LITTLE FLOCK THROUGH TIME</p>
  <h1>Our Adventures Timeline</h1>
  <p>Follow the original Channel Chirp adventures in chronological order, including the restored McRetro articles. The dates are taken from each article's original frontmatter.</p>
  <ol class="chirp-timeline">
    {% for post in all_chirps %}
      <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %B %Y" }}</time>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
    {% endfor %}
  </ol>
</section>
