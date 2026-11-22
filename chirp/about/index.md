---
layout: default
title: About The Flock
permalink: /chirp/about/
channel_chirp: true
pagefind: false
---
<section class="chirp-page-intro chirp-flock-intro" aria-labelledby="chirp-about-heading">
  <h1 id="chirp-about-heading">About The Flock</h1>
  <nav class="chirp-flock-jump" id="chirp-flock-tabs" role="tablist" aria-label="Choose a flock profile">
    <button type="button" role="tab" id="chirp-tab-pudge" aria-controls="pudge" aria-selected="false" tabindex="0" data-flock-tab="pudge">Pudge</button>
    <button type="button" role="tab" id="chirp-tab-tillie" aria-controls="tillie" aria-selected="false" tabindex="-1" data-flock-tab="tillie">Tillie</button>
    <button type="button" role="tab" id="chirp-tab-chip" aria-controls="chip" aria-selected="false" tabindex="-1" data-flock-tab="chip">Chip</button>
    <button type="button" role="tab" id="chirp-tab-diet" aria-controls="diet" aria-selected="false" tabindex="-1" data-flock-tab="diet">Diet</button>
  </nav>
</section>

<section class="chirp-flock-help" id="chirp-flock-help" aria-label="How to meet the flock">
  <p>Meet Pudge, Tillie, and Chip, the three green-cheeked conures behind Channel Chirp. Pudge and Tillie arrived together on New Year's Day 2018, and little cinnamon-coloured Chip joined them on 3rd February 2018. There's also the important matter of what these borbs liked to eat.</p>
  <h2>Who's that bird?</h2>
  <p>Pick <strong>Pudge</strong>, <strong>Tillie</strong>, or <strong>Chip</strong> above to open their own photo, little facts, and original Channel Chirp story. Choose <strong>Diet</strong> to see what went into the food bowls. Nothing is open until you choose, and you can swap between them whenever you like.</p>
</section>

<section id="pudge" class="chirp-profile chirp-flock-panel" role="tabpanel" aria-labelledby="chirp-tab-pudge" tabindex="0" hidden>
  <h2>Pudge - The Boss</h2>
  {% capture chirp_pudge %}{% include chirp-flock/pudge.md %}{% endcapture %}
  {{ chirp_pudge | markdownify }}
  <p class="chirp-flock-more"><a href="/chirp/search/?q=Pudge">Find Pudge's released adventures</a></p>
</section>

<section id="tillie" class="chirp-profile chirp-flock-panel" role="tabpanel" aria-labelledby="chirp-tab-tillie" tabindex="0" hidden>
  <h2>Tillie - The Talker</h2>
  {% capture chirp_tillie %}{% include chirp-flock/tillie.md %}{% endcapture %}
  {{ chirp_tillie | markdownify }}
  <p class="chirp-flock-more"><a href="/chirp/search/?q=Tillie">Find Tillie's released adventures</a></p>
</section>

<section id="chip" class="chirp-profile chirp-flock-panel" role="tabpanel" aria-labelledby="chirp-tab-chip" tabindex="0" hidden>
  <h2>Chip - Baby Borb</h2>
  {% capture chirp_chip %}{% include chirp-flock/chip.md %}{% endcapture %}
  {{ chirp_chip | markdownify }}
  <p class="chirp-flock-more"><a href="/chirp/search/?q=Chip">Find Chip's released adventures</a></p>
</section>

<section id="diet" class="chirp-profile chirp-flock-panel" role="tabpanel" aria-labelledby="chirp-tab-diet" tabindex="0" hidden>
  <h2>Our Diet</h2>
  {% capture chirp_diet %}{% include chirp-flock/diet.md %}{% endcapture %}
  {{ chirp_diet | markdownify }}
</section>

<noscript>
  <p class="chirp-flock-noscript">Enable JavaScript to switch between the four cards here. You can also read the <a href="https://channelchirp.com/pudge/">original Pudge profile</a>, <a href="https://channelchirp.com/tillie/">Tillie profile</a>, <a href="https://channelchirp.com/chip/">Chip profile</a>, and <a href="/chirp/diet/">Diet page</a>.</p>
</noscript>
<script src="/assets/js/chirp-flock-tabs.js" defer></script>
