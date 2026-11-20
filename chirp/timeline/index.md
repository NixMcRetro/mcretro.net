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
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {% assign day = post.date | date: '%-d' | plus: 0 %}
          {% case day %}
            {% when 1 or 21 or 31 %}{% assign suffix = 'st' %}
            {% when 2 or 22 %}{% assign suffix = 'nd' %}
            {% when 3 or 23 %}{% assign suffix = 'rd' %}
            {% else %}{% assign suffix = 'th' %}
          {% endcase %}
          {{ day }}{{ suffix }} {{ post.date | date: '%B %Y' }}
        </time>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
    {% endfor %}
  </ol>
</section>
