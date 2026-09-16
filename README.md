# Demokratien in der Welt – rotierende Weltkugel

Eine einfache, vollständig statische Unterrichtswebsite für den Beamer.

## Markierte Länder
- Deutschland
- Frankreich
- USA
- Kanada
- Japan
- Australien

Die sechs Länder werden grün hervorgehoben. Es stehen bewusst keine Ländernamen auf der Kugel. Über **„Lösung“** kann die Lehrkraft die Namen am Ende einblenden.

## Funktionen
- langsame automatische Drehung
- Pause / Weiter
- drei Geschwindigkeitsstufen
- Kugel mit Maus oder Finger verschieben
- Vollbildmodus
- Lösungsanzeige
- keine Anmeldung, keine Datenbank, kein Server notwendig

## Auf GitHub Pages veröffentlichen
1. Neues GitHub-Repository erstellen, z. B. `demokratie-weltkugel`.
2. Den **gesamten Inhalt dieses Ordners** hochladen (`index.html`, `style.css`, `app.js` und den Ordner `assets`).
3. In GitHub öffnen: **Settings → Pages**.
4. Unter **Build and deployment**: `Deploy from a branch` auswählen.
5. Branch `main` und Ordner `/ (root)` auswählen und speichern.
6. Nach kurzer Zeit zeigt GitHub die öffentliche Webadresse an.

## Länder ändern
Die farbigen Länder sind in der Bilddatei `assets/world-democracies.png` bereits fest eingezeichnet. Wenn andere Länder markiert werden sollen, muss die Kartentextur neu erzeugt werden.

## Technischer Hinweis
Die Darstellung ist bewusst robust gehalten: Die Weltkarte ist eine equirektanguläre Kartentextur, die hinter einer kreisförmigen, schattierten Kugelmaske läuft. Dadurch funktioniert die Seite ohne externe JavaScript-Kartenbibliotheken.

## Kartengrundlage
Kartengeometrien: Natural Earth (Public Domain), vereinfachter Welt-Datensatz.
