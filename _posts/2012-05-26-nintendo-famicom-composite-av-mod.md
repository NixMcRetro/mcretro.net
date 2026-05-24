---
title: "Nintendo Famicom Composite AV Mod"
author: "Nix McRetro"
date: 2012-05-26T19:18:06.000+10:00
categories: [hacks, nintendo, youtube]
---

![](/assets/images/2012/img_0167.jpg)

The Nintendo Family Computer. Ohhhh yeahhhh! Below are the first, second and third revisions of my attempt at an AV mod for the Famicom.

![](/assets/images/2012/img_0148.jpg)

The first attempt was a proof of concept, hence the mess of cables - functional yet hideous.

![](/assets/images/2012/img_0149.jpg)

The second attempt is the slightly longer prototyping board. I was attempting to build it using sub-par parts such as a cable tie as a wire for ground. While it worked, it was not what I wanted.

![](/assets/images/2012/img_0157.jpg)

The final version was shrunk down to fit on a smaller piece of prototyping board. A much better piece of hardware.

**Parts Required**
- 1x 110 ohm resistor (I used 110 ohm, 0.25 watt 1% tolerance, no voltage specified).
- 1x 300 ohm resistor (I used 300 ohm, 0.5 watt 5% tolerance, 350V).
- 2x 16V 220uF 105°C electrolytic capacitor.
- 1x PNP transistor (You can borrow/remove this from the Famicom mainboard).
- Flexible light duty hook up wire or even better, kynar (I used 10 x 0.12mm cable).
- 7 x 5 hole prototyping board/veroboard.
- 25W/40W soldering iron and solder.
- RCA Cables, plugs and sockets/jacks.

To make it all come together and actually give us AV composite you are going to need to do the following. Read on!

![](/assets/images/2012/img_0143.jpg) Half-desoldered A937Q D PNP transistor on the Famicom mainboard. Note the ECB on the mainboard. Emitter, Collector and Base.

![](/assets/images/2012/img_0141.jpg) Desoldering the A937Q D PNP transistor from the Famicom mainboard. Flatblade screwdriver wedged underneath to help pull the legs through the mainboard.

![](/assets/images/2012/img_0142.jpg) Desoldering the A937Q D PNP transistor from the Famicom mainboard. Flatblade screwdriver wedged underneath to help pull the legs through the mainboard.

![](/assets/images/2012/img_0147.jpg) A937Q D PNP transistor desoldered from the Famicom mainboard.

![](/assets/images/2012/img_0144.jpg) Desoldering the A937Q D PNP transistor from the Famicom mainboard. Flatblade screwdriver wedged underneath to help pull the legs through the mainboard.

![](/assets/images/2012/img_0145.jpg) A937Q D PNP transistor desoldered from the Famicom mainboard. It fell into the Famicom...

Firstly, desolder the PNP transistor (three pin component - see above) from the mainboard. If you wedge a flatblade screwdriver underneath the transistor it will greatly help with removing it. Try and heat the three legs as fast and evenly as possible. It will take some time but keep at it and you'll get there. Be careful not to overheat the component, while they are pretty solid and can take a fair amount of heat - the less the better though! If you have desolder braid or a desolder pump you might be better off.

![](/assets/images/2012/img_0163.jpg)

![](/assets/images/2012/img_0164.jpg)

![](/assets/images/2012/img_0171.jpg)

![](/assets/images/2012/img_0172.jpg)

![](/assets/images/2012/img_0169.jpg)

![](/assets/images/2012/img_0166.jpg)

Next identify the four solder points required from the above photos. If your mainboard looks different, you have a model that is not this one. Sadly, I cannot help you with that.

![](/assets/images/2012/img_0162.jpg) +5V source

The top cable (purple) taps into the voltage regulator (LM7805) and provides us with a +5V power source.

![](/assets/images/2012/img_0159.jpg) Sound

The next cable (orange) is where we get our sound source from. You'll realise that you need two cables for sound, the other being ground - that's the next cable we'll look at.

![](/assets/images/2012/img_0160.jpg) Ground

The ground point cable (black) is where you wire all your grounds into. If you see a ground, it needs to make contact with this point. I ran a cable away from it to the prototyping board and split it off into three cables from there. We'll get to that later.

![](/assets/images/2012/img_0161.jpg) Composite Video

The final point is the video signal cable (green). Like the sound the AV cable will require two cables, one is the source (this!) and the other goes to ground - just like the sound will. Think of it as if the video point on the mainboard is the positive terminal and it needs to connect into a negative terminal (ground) to work properly.

The best method for soldering to these points is to reflow the solder. This way the solder will be nice and fresh and have great conductivity with the new cables you are adding. To do this you pretty much apply heat to the joint melting the existing solder and add some fresh solder in. I usually add enough so I do not have to tin the cables I am installing (Yes... I know... It sure is lazy isn't it!).

Once you have added in your four cables, grab your prototyping board. It is time to use a knife, flatblade or hacksaw (I used this once...) to cut the board down to size.

![](/assets/images/2012/img_0151.jpg)

![](/assets/images/2012/img_0152.jpg)

![](/assets/images/2012/img_0155.jpg)

As you can see above the board size I used has 5 x 7 holes. It also gives you an idea of the layout. Install all the components as you can see them in the pictures. Resistors do not mind polarity. Be very careful to ensure you get the capacitor installed the correct way around - they are polar!

![](/assets/images/2012/img_0153.jpg) Cut this track on your prototyping board

The track in the photo above has been cut on the underside of the board to prevent the capacitor juicing up the wrong components. Make sure that this one track is cut. I used a flatblade screwdriver to scrape away at the copper track. Use a multimeter to ensure there is no continuity between the two ends of the board once it has been scraped away. Failing to do this may result in a bit of a bang and some flames to boot.

![](/assets/images/2012/img_0165.jpg)

![](/assets/images/2012/img_0156.jpg)

What are all those coloured cables above? Purple is the +5V coming in from the voltage regulator (LM7805). Green is the video signal entering from the mainboard. The blacks and the grey (ran out of black) are all ground. One runs to the mainboard. The other two are for sound and video (although one ground cable can be used for both if you really want to). Yellow is video out that goes to the centre plug of the TV RCA jack.

![](/assets/images/2012/img_0146.jpg)

![](/assets/images/2012/img_0150.jpg)

![](/assets/images/2012/img_0151.jpg)

Be sure to solder the transistor you desoldered from the Famicom on the right way with the notch facing the correct side. Otherwise things will go funky and possibly explode. Once all this is done you should be able to get video to show on your TV screen. If nothing shows or you see flames, disconnect the unit from mains power and check your soldering and polarities.

![](/assets/images/2012/img_0158.jpg)

![](/assets/images/2012/img_0170.jpg)

![](/assets/images/2012/img_0154.jpg)

Next we move onto the sound, which is relatively easy. That orange cable that runs from pin 46 on the mainboard in the photos above needs to run into a 16V 220uF capacitor. Positive end goes toward the mainboard end as you are feeding the capacitor with voltage and then negative runs out of it. This other end then leads to your sound RCA cable (centre pin). Couple it with a ground cable and you are done. Make sure you get that polarity the right way around.

![](/assets/images/2012/img_0173.jpg)

![](/assets/images/2012/img_0174.jpg)

![](/assets/images/2012/img_0168.jpg)

Now all that's left is to enjoy your Kirby and Spelunker! Below are some videos of the unit while it was in pieces explaining where cables run and what their ratings are.

{% include youtube.html id="zfdA--W3E5A" %}

{% include youtube.html id="dPkrig13CxE" %}

{% include youtube.html id="VaGMn3mrMa4" %}

Additionally you can try to remove the jail bars that show by checking out this link [here](http://jpx72web.blogspot.com/2016/11/famicom-av-mod-new.html). This was the original guide that I followed. It has good schematics too if you are a schematicky sort of person. I had no luck with any of the jail bar reducing/removing methods listed. Your luck may vary. Good luck!

**Resources:**\
[Another Nintendo Famicom AV Mod](http://jpx72web.blogspot.com/2016/11/famicom-av-mod-new.html)\
[McRetro Photo Gallery](/goodies)
