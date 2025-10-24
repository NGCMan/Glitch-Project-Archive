# The script of the game goes in this file.

# Declare characters used by this game. The color argument colorizes the
# name of the character.

define e = Character("Eileen")


# The game starts here.

label start:

    # Show a background. This uses a placeholder by default, but you can
    # add a file (named either "bg room.png" or "bg room.jpg") to the
    # images directory to show it.

    scene bg room

    # This shows a character sprite. A placeholder is used, but you can
    # replace it by adding a file named "eileen happy.png" to the images
    # directory.

    show eileen happy

    # These display lines of dialogue.
    "Today's the day I move into a new town."
    
    "It was nice to live there, but this new town might be even better than before!"

    "...At least that's what I told myself..."
    
    "[TYPE HERE]"
    
    e "[TYPE WITH AN e AT THE END IF YOU'RE SPEAKING.]"
    # This ends the game.

    return
    # oh no it's python i don't know python - crimson and TheIncrementalNerd (i heard of it before, so i know a bit of it, but forgot) # Don't worry, just type in some dialouge. - NGC Man
    # It's not that bad, I don't know python either, but you can read about Ren'Py here: https://www.renpy.org/doc/html/quickstart.html - NGC Man
    # I don't like Python format, Bringback the semicolon ! - Semi-Colon squad