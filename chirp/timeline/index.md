---
layout: default
title: Channel Chirp Timeline
permalink: /chirp/timeline/
channel_chirp: true
pagefind: false
---
{% assign chirp_posts = site.categories.parrots | where_exp: "post", "post.channel_chirp != false" | sort: "date" %}
<section class="nest-intro" aria-labelledby="chirp-timeline-title">
  <span class="nest-kicker">CHANNEL CHIRP · RELEASED ADVENTURES</span>
  <h1 id="chirp-timeline-title">The Flock Timeline</h1>
  <p>Follow the Channel Chirp adventures that have been re-released on McRetro. This timeline grows as more original videos return to the McRetro YouTube channel and their new articles are published.</p>
  <p><a href="/chirp/">🪺 Back to The Nest</a></p>
  <ol class="chirp-timeline">
    {% for post in chirp_posts %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%-d %B %Y' }}</time>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
    {% endfor %}
  </ol>
</section>
