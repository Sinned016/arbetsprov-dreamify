# Arbetsprob från Dreamify

Skapa en enklare inloggningssida i Next.js (Frontend) + Node.js (Backend) enligt följande kravställning:

1. Användaren loggar in med e-post och lösenord via ett formulär. Lösenordet måste vara minst 8 tecken och innehålla minst en siffra. (Användarens uppgifter behöver nödvändigtvis inte hämtas från någon riktig databas, även om MongoDB är en bonus, men du avgör hur detta hanteras)

2. Vid felaktiga inloggningsuppgifter skall ett felmeddelande visas. Om lösenordet inte uppfyller ovanstående krav ska ett felmeddelande också visas.

3. Vid korrekta inloggningsuppgifter ska användaren skickas till en tack-sida på en ny URL

4. På tack-sidan ska det finnas en "logga ut" knapp. Klickar man på den ska man loggas ut och skickas tillbaka till inloggningssidan. Försöker man gå tillbaka till tack-sidan efter utloggning skett ska man dirigeras till inloggningssidan.
   Koden skall mejlas till mig i en zip-fil inklusive instruktioner hur den körs.

## Noter:

Valde att sätta JWT token i localStorage genom att jag är van med det från min utbildning KYH. Men genom att jag gjorde det så tvingades jag att använda useEffect genom att det ända sättet att hämta JWT tokenen är på clienten.

Jag har försökt dela upp det mesta i komponenter så att allt inte blir "use client".
