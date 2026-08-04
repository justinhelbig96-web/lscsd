# LSCSD-Bewerbung – Rainer Rose

Eine responsive Bewerbungswebsite im Sheriff-Department-Stil, umgesetzt mit React, TypeScript, Vite und normalem CSS.

## Entwicklung

```bash
npm install
npm run dev
```

## Produktions-Build

```bash
npm run build
```

Das erzeugte Verzeichnis `dist` kann direkt über Vercel bereitgestellt werden.

## Live-Besucherzähler auf Vercel

Der Besucherzähler verwendet Upstash Redis über die Vercel-Integration. Im Vercel-Projekt müssen diese Variablen vorhanden sein:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

Nach dem Verbinden der Datenbank muss das Projekt neu bereitgestellt werden. „Online“ zählt aktive Browser-Tabs der letzten Minute; „Total Viewer“ zählt jeden Browser dauerhaft einmal.
