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
        title: 'The Physics',
        goal: 'A bird that falls and jumps. No scrolling yet.',
        concept: 'Gravity is just "speed going down". Jumping is just "speed going up".',
        steps: [
          {
            title: 'Step 1: Setup',
            description: 'Start with the configuration. We need a window size and a title.',
            codeSnippet: `import pgzrun\n\n$$# --- Configuration ---\n$$TITLE = "Simple Bird"\n$$WIDTH = 288\n$$HEIGHT = 512\n\npgzrun.go()`
          },
          {
            title: 'Step 2: The Actor',
            description: 'We need to create the bird and background (Setup) and then make them appear (Draw).',
            codeSnippet: `# --- Setup Actors ---\n$$bg = Actor('background-day', center=(WIDTH/2, HEIGHT/2))\n$$ground = Actor('base', anchor=('left', 'bottom'))\n$$ground.pos = (0, HEIGHT)\n\n$$bird = Actor('yellowbird-midflap', (50, HEIGHT/2))\n$$bird.vy = 0  # Vertical velocity\n\n$$def draw():\n$$    screen.clear()\n$$    bg.draw()\n$$    ground.draw()\n$$    bird.draw()`
          },
          {
            title: 'Step 3: Gravity',
            description: 'Gravity is just adding speed to the Y position every frame.',
            visualConcept: 'gravity',
            checkpoint: 'Run the game. Does the bird fall to the bottom?',
            codeSnippet: `# --- Constants ---\n$$GRAVITY = 0.25\n\ndef update():\n$$    # Apply Gravity\n$$    bird.vy += GRAVITY\n$$    bird.y += bird.vy`
          },
          {
            title: 'Step 4: Jumping',
            description: 'When we press SPACE, we set the speed upwards to fight gravity.',
            checkpoint: 'Run the game. Can you keep the bird in the air?',
            codeSnippet: `FLAP_FORCE = -5.5\n\n$$def on_key_down(key):\n$$    if key == keys.SPACE:\n$$        bird.vy = FLAP_FORCE`
          }
        ]
      },
      {
        id: 'l2',
        number: 2,
        title: 'The Infinite World',
        goal: 'Background moves, Ground loops, Pipes appear.',
        concept: 'We don\'t move the bird forward. We move the world backward.',
        steps: [
          {
            title: 'Step 1: The Ground Trick',
            description: 'Use two pieces of ground. Moving them left makes it look like we are flying right.',
            visualConcept: 'scrolling',
            checkpoint: 'Run the game. Does the floor move continuously without gaps?',
            codeSnippet: `SPEED = 2\n\n# Change 'ground' to 'ground1'\n$$ground1 = Actor('base', anchor=('left', 'bottom'))\n$$ground1.pos = (0, HEIGHT)\n\n$$ground2 = Actor('base', anchor=('left', 'bottom'))\n$$ground2.pos = (ground1.width, HEIGHT)\n\ndef update():\n    # ... gravity code ...\n\n$$    # PART 1: Infinite Ground Scroll\n$$    ground1.x -= SPEED\n$$    ground2.x -= SPEED\n$$    \n$$    if ground1.right < 0:\n$$        ground1.left = ground2.right\n$$    if ground2.right < 0:\n$$        ground2.left = ground1.right`
          },
          {
            title: 'Step 2: Values from the Future',
            description: 'We need random numbers to make the pipe gaps different every time.',
            codeSnippet: `import pgzrun\n$$import random`
          },
          {
            title: 'Step 3: Pipes',
            description: 'Add pipes and make them move left. When they leave the screen, reset them to the right.',
            codeSnippet: `# --- Setup Actors ---\n$$pipe_top = Actor('pipe-green', anchor=('center', 'bottom'))\n$$pipe_top.pos = (WIDTH + 100, 200)\n$$pipe_top.angle = 180\n\n$$pipe_bottom = Actor('pipe-green', anchor=('center', 'top'))\n$$pipe_bottom.pos = (WIDTH + 100, 300)\n\ndef draw():\n    screen.clear()\n    bg.draw()\n$$    pipe_top.draw()\n$$    pipe_bottom.draw()\n    ground1.draw()\n    ground2.draw()\n    bird.draw()\n\ndef update():\n    # ... ground code ... \n\n$$    # PART 2: Simple Pipe Loop\n$$    pipe_top.x -= SPEED\n$$    pipe_bottom.x -= SPEED\n$$    \n$$    if pipe_top.right < 0:\n$$        pipe_top.left = WIDTH\n$$        pipe_bottom.left = WIDTH\n\n$$        # PART 3: Adding Randomness\n$$        gap_y = random.randint(150, 350)\n$$        pipe_top.y = gap_y - 60\n$$        pipe_bottom.y = gap_y + 60`
          },
          {
            title: 'Step 4: Game Over',
            description: 'If the bird hits the pipes or the ground, the game ends.',
            visualConcept: 'collision',
            checkpoint: 'Run. Do you die when hitting a pipe?',
            codeSnippet: `$$game_active = True\n\ndef draw():\n    # ... code ...\n$$    if not game_active:\n$$        screen.draw.text("GAME OVER", center=(WIDTH/2, HEIGHT/2), fontsize=50, color="orange")\n\ndef update():\n$$    global game_active\n$$    if not game_active:\n$$        return\n\n    # ... (Movement Code) ...\n\n$$    # PART 4: Collision Logic\n$$    if bird.colliderect(pipe_top) or bird.colliderect(pipe_bottom):\n$$        game_active = False\n$$        \n$$    if bird.top < 0 or bird.bottom > HEIGHT - 50:\n$$        game_active = False`
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