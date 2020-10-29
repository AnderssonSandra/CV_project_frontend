# CV_project_frontend

## GULP 
Gulp används för att automatisera processer som för över filer från källkoden till publiceringskatalogen. 


### Följande paket används:
* **gulp:** används för att automatisera processen med att ta källkodsfilerna genom olika tasks och därefter skicka filerna till en mapp som används för publicering. 
* **gulp-concat:**  används för att sammanslå filer.
* **gulp-babel:**  används för att konvertera Typescript-kod till att vara bakåtkompatibelt  
* **gulp-imagemin:** används för att komprimera PNG, JPG, GIF och SVG filer.  
* **gulp-uglify-es:** används för att minifiera js filer.
* **del:** används för att radera kataloger eller filer. 
* **browser-sync:** den används för att kunna se ändringarna i webbläsaren direkt utan att manuellt uppdatera den.
* **gulp-sass-partials-imported:** behandlar scss "partials" filer och lägger till filer som importerar dem.
* **gulp-sourcemaps:** används för inbyggda "sourcemaps" som är inbäddade i källkodsfilen
* **gulp-uglify-es:** används för att konvertera js kod till den version som är installerad
* **node-sass:** används för att kompilera sccs kod till css kod.
* **gulp-sass:** används för att kompilera scss filer
* **concat:** används för att sammanslå filer
* **@babel/core:** används för att kompilera ts/js kod till att vara bakåtkompatibel
* **@babel/preset-env:** en babel förinställning för varje miljö


### TASKS

Nedan beskrivs funktionerna i Gulp.

* **clean:** Används för att radera inneåll katalogen "publish" innan gulp startas igång. 
* **copyHTML:** Kopierar över alla HTML filer till katalogen "publish". 
* **sassTask:** Används för att hämta alla SCSS filer i källkoden och sammansätta, minifiera samt konvertera till CSS kod. Skickar sedan till underkatalogen "css" i publiceringskatalogen "publish".
* **jsTask:** Hämtar JavsSctipt filer i källkoden och sammansättar, minifierar samt konverterar så koden är kompatibel i alla webbläsare. Skickas till underkatalogen "js" i publiceringskatalogen "publish".
* **imageTask:** Används för att komprimera bilder i formaten GIF, JPG, SVG samt PNG innan de skickas till underkatalogen "images" i publiceringskataliogen "pub". 
* **watchTask**: Den används för att lyssna på om det läggs till eller sker förändringar i någon av HTML, CSS, js filerna och då uppdatera filerna i publiceringskatalogen. Den gör densamma för bilder. Den används också för att uppdatera webbserven med hjälp av browser-Sync när någonting förändras. 
* **export.default**: Beskriver vad som ska göras när gulp startas. Först anropas funktionen clean för att rensa katalogen publish. Sedan anropas jsTask, copyHTML, scssTask och imageTask för att skicka över de filer som redan finns när gulp startas över till katalogen publish, sedan anropas funktionen watcher för att lyssna på uppdateringar och då föra över förändringarna till katalgoen publish samt uppdatera förändringarna på webservern. 


## Hur du bygger vidare på detta projekt

1. Se till att du har node.js och npm installerat på din dator.
2. Klona mitt projekt med följande kommando: git clone https://github.com/AnderssonSandra/CV_project_frontend.git
3. Installera node och de paket som används: använd kommandot npm install när du står i rotkatalogen. Då installeras node och alla paket som behövs för köra systemet 
4. Kör kommandot gulp när du står i rotkatalogen.  
5. Då ska katalogen "publish" skapats som innehåller de filer som ska användas för publicering. 
6. Fortsätt koda 
