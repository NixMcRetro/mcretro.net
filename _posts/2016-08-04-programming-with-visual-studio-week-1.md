---
title: "Programming w/ Visual Studio - Week 1"
author: "Nix McRetro"
date: 2016-08-04T19:13:23.000+10:00
categories: [news, programming]
---

![vs2015](/assets/images/2016/img_0510.jpg)

I've begun my journey into the world of programming, with no experience apart from hackery of html and css I enter onto a new journey. Below is my first program in full that I wrote. I actually made another one that calculated BMI properly, but that has been lost for now. If I dig it up I'll post the source code. Either way, this one is commented to hell and back so I know what's happening. Starting with Visual Basic to get an idea of the logic of programming before moving onto Java I believe.

Anyway, the downside of this is that I will no longer have time to do any retro repair for a while. This course also collides with my university course starting next year so I hope I can get a good grasp of it before that happens and maybe, just maybe I'll be able to juggle two at once or perhaps move to a more part time role for programming. This also means that the shop will be very short lived. I've opened up shipping to worldwide and slashed the price to below cost to move it so I can move on. Anyway, enjoy the colourful code below!

```
Module Module1
    'Nix McRetro
    '2016-08-02
    Sub Main()
        'Set variables for names as strings, numbers as double.
        Dim favColour, firstName, timeDay As String
        Dim num1, num2, total1, total2, hapScale, hapScaleComp As Double
        'Introducing Glenmatic 2000, the smartest computational device since sliced bread.
        Console.WriteLine("Hello, I'm the Glenmatic 2000! What's your name?")
        'Accept user input and store as firstName variable.
        firstName = Console.ReadLine()
        'Spacer to help split the questions up.
        Console.WriteLine()
        'Feed the user back their firstName and ask another question.
        Console.WriteLine("Nice to meet you " & firstName & "! What's your favourite colour?")
        'Store the user input as favColour.
        favColour = Console.ReadLine()
        'Feed the user their answer back again, but make it the second favourite (there's no sides here).
        Console.WriteLine("Incredible, " & favColour & " is my second favourite colour after tangerine.")
        'Spacer to help split the questions up.
        Console.WriteLine()
        'Use stored variable firstName again.
        Console.WriteLine(firstName & ", my internal date/time battery is broken. Is it morning, afternoon or evening?")
        'Store the time of day as a variable for the goodbye section.
        timeDay = Console.ReadLine()
        'Feed the user their answer again.
        Console.WriteLine("Fantastic, " & timeDay & " is my favourite time of day!")
        'Spacer to help split the questions up.
        Console.WriteLine()
        'Throw in a reason to be dividing anything, D3 = Divide 3.
        Console.WriteLine("I am low on vitamin 'D3' so let us Divide by 3. Please input a number to divide by three.")
        'Save the number entered as num1 variable.
        num1 = Console.ReadLine
        'Calculate the total1 variable before writing out to console. 
        total1 = (num1 / 3)
        'Write the solution out to the console and thank the user by variable firstName.
        Console.WriteLine(num1 & " divided by 3 is " & total1 & "! Excellent, that vitamin D3 helped, thanks " & firstName & "!")
        'Spacer to help split the questions up.
        Console.WriteLine()
        'Ask the user to input a number that looks like a capital B
        Console.WriteLine("Next I need some vitamin B2, unfortunately I can't use B as input.")
        Console.WriteLine("Could you find a number that looks like a B and enter it? Hint: 8 looks close enough to me.")
        Console.WriteLine("We can then square that number to feed me more vitamins.")
        'Store the number (likely 8) as num2 variable. 
        num2 = Console.ReadLine
        'Calculate the total2 variable before writing out to console. 
        total2 = (num2 ^ 2)
        'Write the solution out to the console and thank the user by variable firstName.
        Console.WriteLine(total2 & " numbers administered, thanks " & firstName & ", numbers are really just like vitamins for me.")
        'Spacer to help split the questions up.
        Console.WriteLine()
        'Start of the multiplication section.
        Console.WriteLine("Now that you have fed me, how would you rate your happiness on a scale of 1 - 10")
        hapScale = Console.ReadLine()
        'The computer program is never as happy as the user giving the user a sense of self worth.
        hapScaleComp = (hapScale * 0.85624)
        'Display the user entered score and advise user that they are happier than the program.
        Console.WriteLine("You've given a score of " & hapScale & ", it seems you are happier than me.")
        'Display the computed happiness scale score for the computer (0.85624xuser score).
        Console.WriteLine("I've computed my happiness score to be around " & hapScaleComp & "!")
        'Spacer to help split the questions up.
        Console.WriteLine()
        'Call on timeDay variable and firstName to show the user we are paying attention to them.
        Console.WriteLine("Thanks for chatting with me today " & firstName & "! It's been lovely, enjoy the rest of your " & timeDay & "!")
        'Tell the user how to end the program.
        Console.WriteLine("Press enter to return to reality, I'll stay here for now...")
        'Keep the console open so text can be read.
        Console.ReadLine()
    End Sub

End Module

```

You might notice the name of it is the Glenmatic 2000, a throwback to the days of Glen. Haha! :)
