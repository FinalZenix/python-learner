import { CourseContent, Language } from './types';

export const ASSETS = {
  audio: [
    'die.ogg', 'die.wav',
    'hit.ogg', 'hit.wav',
    'point.ogg', 'point.wav',
    'swoosh.ogg', 'swoosh.wav',
    'wing.ogg', 'wing.wav'
  ],
  sprites: [
    '0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png',
    'background-day.png', 'background-night.png',
    'base.png',
    'bluebird-downflap.png', 'bluebird-midflap.png', 'bluebird-upflap.png',
    'redbird-downflap.png', 'redbird-midflap.png', 'redbird-upflap.png',
    'yellowbird-downflap.png', 'yellowbird-midflap.png', 'yellowbird-upflap.png',
    'gameover.png',
    'message.png',
    'pipe-green.png', 'pipe-red.png'
  ]
};

export const FULL_CODE = `import pgzrun
import random

# --- Configuration ---
TITLE = "Flappy Bird"
WIDTH = 288
HEIGHT = 512

# --- Constants ---
GRAVITY = 0.25
FLAP_FORCE = -5.5
SPEED = 2
GAP = 100

# --- Setup Actors ---
bg = Actor('background-day', center=(WIDTH/2, HEIGHT/2))

bird_images = ['yellowbird-downflap', 'yellowbird-midflap', 'yellowbird-upflap']
bird = Actor(bird_images[0], (50, HEIGHT/2))
bird.vy = 0
bird.frame = 0

ground1 = Actor('base', anchor=('left', 'bottom'))
ground1.pos = (0, HEIGHT)
ground2 = Actor('base', anchor=('left', 'bottom'))
ground2.pos = (ground1.width, HEIGHT)

pipes = []
score = 0
game_active = False
dead = False

def draw():
    screen.clear()
    bg.draw()
    for pipe in pipes:
        pipe.draw()
    ground1.draw()
    ground2.draw()
    bird.draw()
    
    if game_active:
        screen.draw.text(str(score), center=(WIDTH/2, 50), fontsize=40, owidth=1.5, ocolor="black")
    elif not dead:
        screen.draw.text("PRESS SPACE", center=(WIDTH/2, HEIGHT/2 - 50), fontsize=30, owidth=1, ocolor="black")
    else:
        Actor('gameover', center=(WIDTH/2, HEIGHT/2)).draw()

def update():
    global game_active, score, dead
    animate_bird()
    update_ground()

    if not game_active:
        return

    bird.vy += GRAVITY
    bird.y += bird.vy
    update_pipes()
    check_collisions()

def on_key_down(key):
    global game_active, dead, score, pipes
    if key == keys.SPACE:
        if not game_active and not dead:
            game_active = True
            bird.vy = FLAP_FORCE
            sounds.wing.play()
        elif game_active:
            bird.vy = FLAP_FORCE
            sounds.wing.play()
        elif dead:
            reset_game()

def animate_bird():
    if game_active:
        bird.frame += 0.2
        if bird.frame >= 3:
            bird.frame = 0
        bird.image = bird_images[int(bird.frame)]
        bird.angle = min(20, max(-90, -bird.vy * 3))
    else:
        bird.image = 'yellowbird-midflap'
        bird.angle = 0

def update_ground():
    ground1.x -= SPEED
    ground2.x -= SPEED
    if ground1.right < 0:
        ground1.left = ground2.right
    if ground2.right < 0:
        ground2.left = ground1.right

def update_pipes():
    global score
    for pipe in pipes:
        pipe.x -= SPEED
    if pipes and pipes[0].right < 0:
        pipes.pop(0)
        pipes.pop(0)
        score += 1
        sounds.point.play()
    if not pipes or pipes[-1].x < WIDTH - 150:
        create_pipe_pair()

def create_pipe_pair():
    ground_y = HEIGHT - 112
    gap_y = random.randint(150, ground_y - 150)
    bottom = Actor('pipe-green', anchor=('center', 'top'))
    bottom.pos = (WIDTH, gap_y + GAP/2)
    pipes.append(bottom)
    top = Actor('pipe-green', anchor=('center', 'top'))
    top.pos = (WIDTH, gap_y - GAP/2)
    top.angle = 180
    pipes.append(top)

def check_collisions():
    if bird.bottom >= HEIGHT - 112:
        game_over()
    if bird.top < 0:
        game_over()
    bird_box = Rect(bird.left, bird.top, bird.width, bird.height)
    hitbox = bird_box.inflate(-10, -10)
    for pipe in pipes:
        pipe_box = Rect(pipe.left, pipe.top, pipe.width, pipe.height)
        if hitbox.colliderect(pipe_box):
            game_over()

def game_over():
    global game_active, dead
    game_active = False
    dead = True
    sounds.hit.play()
    sounds.die.play()

def reset_game():
    global game_active, dead, score
    bird.pos = (50, HEIGHT/2)
    bird.vy = 0
    pipes.clear()
    score = 0
    dead = False
    game_active = False

pgzrun.go()`;

export const UI_TEXT: Record<Language, any> = {
  en: {
    curriculum: "Core Curriculum",
    extras: "Extras & Polish",
    resources: "Resources",
    fullCode: "Full Source Code",
    assets: "Game Assets",
    prev: "Previous",
    next: "Next Lesson",
    goal: "Goal",
    concept: "Concept",
    tip: "Tip:",
    tipText: "\"Type a little, play a lot.\" Run the game after every few lines!",
    fullCodeTitle: "Full Source Code",
    fullCodeDesc: "The complete Python script for the final game. Use this as a reference if you get stuck.",
    assetsTitle: "Game Assets",
    assetsDesc: "Download the images and sounds you need for the game. Place them in your project folder.",
    sprites: "Sprites (Images)",
    audio: "Audio (Sounds)",
    download: "Download"
  },
  de: {
    curriculum: "Kernlehrplan",
    extras: "Extras & Feinschliff",
    resources: "Ressourcen",
    fullCode: "Vollständiger Quellcode",
    assets: "Spiel-Assets",
    prev: "Zurück",
    next: "Nächste Lektion",
    goal: "Ziel",
    concept: "Konzept",
    tip: "Tipp:",
    tipText: "\"Wenig tippen, viel spielen.\" Starte das Spiel nach ein paar Zeilen Code!",
    fullCodeTitle: "Vollständiger Quellcode",
    fullCodeDesc: "Das komplette Python-Skript für das fertige Spiel. Nutze dies als Referenz, falls du nicht weiterkommst.",
    assetsTitle: "Spiel-Assets",
    assetsDesc: "Lade die Bilder und Sounds herunter, die du für das Spiel benötigst. Platziere sie in deinem Projektordner.",
    sprites: "Sprites (Bilder)",
    audio: "Audio (Töne)",
    download: "Herunterladen"
  }
};

export const CONTENT: Record<Language, CourseContent> = {
  en: {
    core: [
      {
        id: 'l1',
        number: 1,
        title: 'The Bird & Physics',
        goal: 'Make a bird that falls and jumps.',
        concept: 'Gravity is just "speed going down". Jumping is just "speed going up".',
        steps: [
          {
            title: 'Window Setup',
            description: 'Start with the basics. Every game needs a window to draw on.',
            codeSnippet: `import pgzrun\n\nTITLE = "Flappy Bird"\nWIDTH = 288\nHEIGHT = 512\n\npgzrun.go()`
          },
          {
            title: 'The Actor',
            description: 'We need a character. In Pygame Zero, we call this an Actor.',
            codeSnippet: `bird = Actor('yellowbird-midflap')\nbird.pos = (50, HEIGHT/2)\n\ndef draw():\n    screen.clear()\n    bird.draw()`
          },
          {
            title: 'Gravity Logic',
            description: 'Gravity pulls things down. We simulate this by constantly adding to the vertical speed (vy).',
            visualConcept: 'gravity',
            codeSnippet: `gravity = 0.25\nbird.vy = 0\n\ndef update():\n    bird.vy += gravity\n    bird.y += bird.vy`
          },
          {
            title: 'Flapping',
            description: 'When we press space, we reverse the velocity instantly to go up.',
            codeSnippet: `def on_key_down(key):\n    if key == keys.SPACE:\n        bird.vy = -5.5`
          }
        ]
      },
      {
        id: 'l2',
        number: 2,
        title: 'The World Moves',
        goal: 'Create the illusion of flying forward.',
        concept: 'The bird actually stays in the same X position. The world moves left!',
        steps: [
          {
            title: 'Background & Ground',
            description: 'Add the background and ground actors. Order matters in draw()! Background first, ground last.',
            codeSnippet: `bg = Actor('background-day')\nground = Actor('base')\nground.bottom = HEIGHT`
          },
          {
            title: 'Infinite Scroll',
            description: 'When the ground goes off-screen, reset it to the right. We need two ground pieces for this to look smooth.',
            visualConcept: 'scrolling',
            codeSnippet: `def update_ground():\n    ground1.x -= 2\n    if ground1.right < 0:\n        ground1.left = ground2.right`
          }
        ]
      },
      {
        id: 'l3',
        number: 3,
        title: 'The Pipes (Arrays)',
        goal: 'Obstacles that appear and move.',
        concept: 'We need many pipes, so we use a List [].',
        steps: [
          {
            title: 'Pipe List',
            description: 'Create an empty list to track all the active pipes.',
            codeSnippet: `pipes = []`
          },
          {
            title: 'Spawning Pairs',
            description: 'We need a top pipe and a bottom pipe with a gap in between.',
            visualConcept: 'arrays',
            codeSnippet: `def create_pipe_pair():\n    gap_y = random.randint(150, 400)\n    top = Actor('pipe-green', anchor=('center','bottom'))\n    top.pos = (WIDTH, gap_y - 100)\n    pipes.append(top)`
          },
          {
            title: 'Cleanup',
            description: 'Important! Remove pipes when they leave the screen to keep the game fast.',
            codeSnippet: `if pipes[0].right < 0:\n    pipes.pop(0)`
          }
        ]
      },
      {
        id: 'l4',
        number: 4,
        title: 'Collision & Loops',
        goal: 'Detect when the game ends.',
        concept: 'Checking if rectangles overlap (Collision).',
        steps: [
          {
            title: 'Collision Detection',
            description: 'Check if the bird hits the pipes or the ground.',
            visualConcept: 'collision',
            codeSnippet: `if bird.colliderect(pipe):\n    dead = True\n    sounds.hit.play()`
          },
          {
            title: 'Stop Everything',
            description: 'When dead is True, stop the pipes from moving.',
            codeSnippet: `if dead:\n    return # Stop updating`
          }
        ]
      }
    ],
    extras: [
      {
        id: 'e1',
        number: 5,
        title: 'Bringing it to Life',
        goal: 'Add wing flapping animation and rotation.',
        concept: 'Animation is just swapping images quickly. Rotation is based on speed.',
        steps: [
          {
            title: 'Image List',
            description: 'Instead of one image, we load a list of images for the flapping frames.',
            codeSnippet: `bird_images = [\n    'yellowbird-downflap',\n    'yellowbird-midflap',\n    'yellowbird-upflap'\n]\nbird = Actor(bird_images[0])`
          },
          {
            title: 'Frame Logic',
            description: 'We use a counter to cycle through the images. 0 -> 1 -> 2 -> 0.',
            visualConcept: 'animation',
            codeSnippet: `bird.frame = 0\n\ndef animate_bird():\n    bird.frame += 0.2\n    if bird.frame >= 3:\n        bird.frame = 0\n    bird.image = bird_images[int(bird.frame)]`
          },
          {
            title: 'Rotation',
            description: 'The bird should tilt up when jumping and nose-dive when falling.',
            codeSnippet: `bird.angle = min(20, max(-90, -bird.vy * 3))`
          }
        ]
      },
      {
        id: 'e2',
        number: 6,
        title: 'Game States & UI',
        goal: 'Manage the Menu, Playing, and Game Over states.',
        concept: 'Use Boolean flags to control what happens in the game loop.',
        steps: [
          {
            title: 'State Flags',
            description: 'We use two variables to track the state of the game.',
            visualConcept: 'states',
            codeSnippet: `game_active = False\ndead = False`
          },
          {
            title: 'Controlling Draw',
            description: 'If the game isn\'t active, show the "Get Ready" message instead of the score.',
            codeSnippet: `if not game_active:\n    screen.draw.text("PRESS SPACE", center=(WIDTH/2, HEIGHT/2))`
          },
          {
            title: 'Smart Input',
            description: 'The Space bar does different things depending on the state.',
            codeSnippet: `if not game_active and not dead:\n    game_active = True  # Start\nelif game_active:\n    bird.vy = -5.5      # Flap\nelif dead:\n    reset_game()        # Neustart`
          },
          {
             title: 'Scoring',
             description: 'Add to the score when the bird passes a pipe.',
             codeSnippet: `score += 1\nscreen.draw.text(str(score))`
          }
        ]
      },
      {
        id: 'e3',
        number: 7,
        title: 'Sound Effects',
        goal: 'Make the game feel alive with audio.',
        concept: 'Pygame Zero magic: Auto-loading sounds from the sounds/ folder.',
        steps: [
          {
            title: 'The Sounds Folder',
            description: 'Pygame Zero looks for a folder named "sounds" next to your script. Put your .wav or .ogg files there (e.g., wing.wav, point.wav, hit.wav).',
            codeSnippet: `# Folder Structure\n# my_game.py\n# images/\n# sounds/\n#   wing.wav\n#   point.wav\n#   hit.wav`
          },
          {
            title: 'Playing Sounds',
            description: 'You don\'t need to import anything! Just use sounds.filename.play().',
            codeSnippet: `def on_key_down(key):\n    if key == keys.SPACE:\n        bird.vy = -5.5\n        sounds.wing.play()`
          },
          {
            title: 'Scoring & Collision',
            description: 'Add sound effects when the player scores a point or hits a pipe.',
            codeSnippet: `# In update_pipes:\nscore += 1\nsounds.point.play()\n\n# In check_collisions:\nif bird.colliderect(pipe):\n    sounds.hit.play()`
          }
        ]
      }
    ]
  },
  de: {
    core: [
      {
        id: 'l1',
        number: 1,
        title: 'Der Vogel & Physik',
        goal: 'Erstelle einen Vogel, der fällt und springt.',
        concept: 'Schwerkraft ist nur "Geschwindigkeit nach unten". Springen ist "Geschwindigkeit nach oben".',
        steps: [
          {
            title: 'Fenstereinrichtung',
            description: 'Starte mit den Grundlagen. Jedes Spiel braucht ein Fenster zum Zeichnen.',
            codeSnippet: `import pgzrun\n\nTITLE = "Flappy Bird"\nWIDTH = 288\nHEIGHT = 512\n\npgzrun.go()`
          },
          {
            title: 'Der Akteur',
            description: 'Wir brauchen eine Figur. In Pygame Zero nennen wir das einen Actor.',
            codeSnippet: `bird = Actor('yellowbird-midflap')\nbird.pos = (50, HEIGHT/2)\n\ndef draw():\n    screen.clear()\n    bird.draw()`
          },
          {
            title: 'Schwerkraft-Logik',
            description: 'Schwerkraft zieht Dinge nach unten. Wir simulieren das, indem wir ständig zur vertikalen Geschwindigkeit (vy) addieren.',
            visualConcept: 'gravity',
            codeSnippet: `gravity = 0.25\nbird.vy = 0\n\ndef update():\n    bird.vy += gravity\n    bird.y += bird.vy`
          },
          {
            title: 'Flattern',
            description: 'Wenn wir Leertaste drücken, kehren wir die Geschwindigkeit sofort um.',
            codeSnippet: `def on_key_down(key):\n    if key == keys.SPACE:\n        bird.vy = -5.5`
          }
        ]
      },
      {
        id: 'l2',
        number: 2,
        title: 'Die Welt bewegt sich',
        goal: 'Erzeuge die Illusion des Vorwärtsfliegens.',
        concept: 'Der Vogel bleibt eigentlich auf der gleichen X-Position. Die Welt bewegt sich nach links!',
        steps: [
          {
            title: 'Hintergrund & Boden',
            description: 'Füge Hintergrund und Boden hinzu. Die Reihenfolge in draw() ist wichtig! Hintergrund zuerst, Boden zuletzt.',
            codeSnippet: `bg = Actor('background-day')\nground = Actor('base')\nground.bottom = HEIGHT`
          },
          {
            title: 'Unendliches Scrollen',
            description: 'Wenn der Boden den Bildschirm verlässt, setze ihn nach rechts zurück. Wir brauchen zwei Bodenteile, damit es flüssig aussieht.',
            visualConcept: 'scrolling',
            codeSnippet: `def update_ground():\n    ground1.x -= 2\n    if ground1.right < 0:\n        ground1.left = ground2.right`
          }
        ]
      },
      {
        id: 'l3',
        number: 3,
        title: 'Die Röhren (Arrays)',
        goal: 'Hindernisse, die erscheinen und sich bewegen.',
        concept: 'Wir brauchen viele Röhren, also nutzen wir eine Liste [].',
        steps: [
          {
            title: 'Röhren-Liste',
            description: 'Erstelle eine leere Liste, um alle aktiven Röhren zu verfolgen.',
            codeSnippet: `pipes = []`
          },
          {
            title: 'Paare erzeugen',
            description: 'Wir brauchen eine obere und eine untere Röhre mit einer Lücke dazwischen.',
            visualConcept: 'arrays',
            codeSnippet: `def create_pipe_pair():\n    gap_y = random.randint(150, 400)\n    top = Actor('pipe-green', anchor=('center','bottom'))\n    top.pos = (WIDTH, gap_y - 100)\n    pipes.append(top)`
          },
          {
            title: 'Aufräumen',
            description: 'Wichtig! Entferne Röhren, wenn sie den Bildschirm verlassen, um das Spiel schnell zu halten.',
            codeSnippet: `if pipes[0].right < 0:\n    pipes.pop(0)`
          }
        ]
      },
      {
        id: 'l4',
        number: 4,
        title: 'Kollision & Schleifen',
        goal: 'Erkenne, wann das Spiel vorbei ist.',
        concept: 'Prüfen, ob sich Rechtecke überschneiden (Kollision).',
        steps: [
          {
            title: 'Kollisionserkennung',
            description: 'Prüfe, ob der Vogel die Röhren oder den Boden trifft.',
            visualConcept: 'collision',
            codeSnippet: `if bird.colliderect(pipe):\n    dead = True\n    sounds.hit.play()`
          },
          {
            title: 'Alles stoppen',
            description: 'Wenn dead wahr ist, höre auf, die Röhren zu bewegen.',
            codeSnippet: `if dead:\n    return # Update stoppen`
          }
        ]
      }
    ],
    extras: [
      {
        id: 'e1',
        number: 5,
        title: 'Leben einhauchen',
        goal: 'Flügelschlag-Animation und Rotation hinzufügen.',
        concept: 'Animation ist nur der schnelle Austausch von Bildern. Rotation basiert auf Geschwindigkeit.',
        steps: [
          {
            title: 'Bilder-Liste',
            description: 'Statt einem Bild laden wir eine Liste von Bildern für die Flügelschlag-Frames.',
            codeSnippet: `bird_images = [\n    'yellowbird-downflap',\n    'yellowbird-midflap',\n    'yellowbird-upflap'\n]\nbird = Actor(bird_images[0])`
          },
          {
            title: 'Frame-Logik',
            description: 'Wir nutzen einen Zähler, um durch die Bilder zu wechseln. 0 -> 1 -> 2 -> 0.',
            visualConcept: 'animation',
            codeSnippet: `bird.frame = 0\n\ndef animate_bird():\n    bird.frame += 0.2\n    if bird.frame >= 3:\n        bird.frame = 0\n    bird.image = bird_images[int(bird.frame)]`
          },
          {
            title: 'Rotation',
            description: 'Der Vogel soll sich neigen: Nase hoch beim Springen, Nase runter beim Fallen.',
            codeSnippet: `bird.angle = min(20, max(-90, -bird.vy * 3))`
          }
        ]
      },
      {
        id: 'e2',
        number: 6,
        title: 'Spielzustände & UI',
        goal: 'Menü, Spielen und Game Over verwalten.',
        concept: 'Nutze Boolean-Flags, um den Spielfluss zu steuern.',
        steps: [
          {
            title: 'Zustands-Flags',
            description: 'Wir nutzen zwei Variablen, um den Zustand des Spiels zu verfolgen.',
            visualConcept: 'states',
            codeSnippet: `game_active = False\ndead = False`
          },
          {
            title: 'Zeichnen steuern',
            description: 'Wenn das Spiel nicht aktiv ist, zeige "Bereit machen" statt des Punktestands.',
            codeSnippet: `if not game_active:\n    screen.draw.text("DRÜCKE LEERTASTE", center=(WIDTH/2, HEIGHT/2))`
          },
          {
            title: 'Intelligente Eingabe',
            description: 'Die Leertaste macht je nach Zustand etwas anderes.',
            codeSnippet: `if not game_active and not dead:\n    game_active = True  # Start\nelif game_active:\n    bird.vy = -5.5      # Flattern\nelif dead:\n    reset_game()        # Neustart`
          },
          {
             title: 'Punktestand',
             description: 'Erhöhe den Score, wenn der Vogel eine Röhre passiert.',
             codeSnippet: `score += 1\nscreen.draw.text(str(score))`
          }
        ]
      },
      {
        id: 'e3',
        number: 7,
        title: 'Soundeffekte',
        goal: 'Erwecke das Spiel mit Audio zum Leben.',
        concept: 'Pygame Zero Magie: Automatisches Laden von Sounds aus dem sounds/ Ordner.',
        steps: [
          {
            title: 'Der Sounds-Ordner',
            description: 'Pygame Zero sucht nach einem Ordner namens "sounds" neben deinem Skript. Lege dort deine .wav oder .ogg Dateien ab (z.B. wing.wav, point.wav, hit.wav).',
            codeSnippet: `# Ordnerstruktur\n# mein_spiel.py\n# images/\n# sounds/\n#   wing.wav\n#   point.wav\n#   hit.wav`
          },
          {
            title: 'Sounds abspielen',
            description: 'Du musst nichts importieren! Nutze einfach sounds.dateiname.play().',
            codeSnippet: `def on_key_down(key):\n    if key == keys.SPACE:\n        bird.vy = -5.5\n        sounds.wing.play()`
          },
          {
            title: 'Punktestand & Kollision',
            description: 'Füge Soundeffekte hinzu, wenn der Spieler punktet oder eine Röhre trifft.',
            codeSnippet: `# In update_pipes:\nscore += 1\nsounds.point.play()\n\n# In check_collisions:\nif bird.colliderect(pipe):\n    sounds.hit.play()`
          }
        ]
      }
    ]
  }
};