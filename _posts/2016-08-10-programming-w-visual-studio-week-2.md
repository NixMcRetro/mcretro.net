---
title: "Programming w/ Visual Studio – Week 2"
author: "Nix McRetro"
date: 2016-08-10T19:56:02.000+10:00
categories: [programming]
---

![vb\_romans](/assets/images/2016/img_0523.jpg)

Ohhh those Romans! Honestly with so many Ifs and ElseIfs it feels like I'm typing in circles, but hey! My code worked for a few of the examples, albeit they were not what the solutions listed. Many ways to do the same thing, I honestly think mine was more efficient and answered their question better... which is odd - given they wrote the question and the answer! But that's fine, as long as I can continue to insert Hogan's Heroes catch phrases and Pentium FDIV references into my code then the world is a better place.

```
        '3. Write a program that accepts a number from 1 to 100. For multiples of three print “Fizz” instead of the number And for the multiples of five print “Buzz”. For numbers which are multiples of both three And five print “FizzBuzz”.
        Dim num1 As Integer

        Console.WriteLine("Enter a number between 1 and 100")
        num1 = Console.ReadLine()

        If num1 > 100 Or num1 < 1 Then
            Console.WriteLine("Your number is outside the parameters! Between 1 - 100 inclusive please.")
        ElseIf (num1 Mod 5 = 0) And (num1 Mod 3 = 0) Then
            Console.WriteLine("FizzBuzz")
        ElseIf num1 Mod 3 = 0 Then
            Console.WriteLine("Fizz")
        ElseIf num1 Mod 5 = 0 Then
            Console.WriteLine("Buzz")
        Else
            Console.WriteLine("Your number neither fizzes nor buzzes!")
        End If
        Console.ReadLine()
```

Pretty neat if you ask me. And I've learnt that 0.5 rounds to 0 using Integer. I guess 0.00 rounds to -1 then, right?
