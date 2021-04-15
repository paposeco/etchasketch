# Etch-a-Sketch implementation for the Odin Project

On [my implementation](https://paposeco.github.io/etchasketch/) the user is presented with a clear canvas ready to be painted, which gets activated with a click. The user can always click to stop/restart painting.

## Brushes

The default brush is a "spray": color gets progressively darker with each mouse over.

There are a couple more brushes:

- Random: random color on each mouse over;
- Pencil: solid color, which can be changed on the color picker.

## Clear Canvas and New Canvas

The Clear Canvas button clears the canvas, while maintaining its size.
The New Canvas button prompts the user for a new canvas size, given in squares/side. The minimum amount of squares is 5 and the maximum amount is 99.

## Turn wheels

The turn wheels don't really do anything, but I hope to change that in the future.

## Last thoughts

It was a fun challenge and by the end I was much better acquainted with events and page layout.

The page isn't responsive and doesn't work with touchscreens. Hopefully I will also change that in the future.
