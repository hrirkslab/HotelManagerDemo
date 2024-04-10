
# Hotel Manager Demo
Dieses Repository beinhaltet die Hotel Manager Demo, bestehend aus einem Backend, das mit Spring Boot entwickelt wurde, und einem Frontend, das Angular verwendet. Diese README bietet detaillierte Anweisungen für die Installation und Ausführung der Projekte.

## Erste Schritte
Folgen Sie diesen Schritten, um das Projekt auf Ihrem lokalen Rechner für Entwicklung und Testzwecke einzurichten und zu betreiben.

### Voraussetzungen
Stellen Sie sicher, dass Sie Folgendes installiert haben:

- Java Development Kit (JDK) 17 für die Spring Boot-Anwendung
- Node.js v18.13 und npm (wird mit Node.js geliefert) für die Angular-Anwendung
- Docker und Docker Compose für das Ausführen der Anwendungen in Containern

### Installation und Ausführung
1. #### Backend - Spring Boot-Anwendung (**/hotelmanager**) 
Die Backend-Anwendung ist ein Spring Boot-Projekt. Zum Kompilieren und Packen der Anwendung, wobei Tests übersprungen werden, navigieren Sie zum Verzeichnis hotelmanager und führen Sie aus:

```bash
mvn clean package -DskipTests
```

2. #### Frontend - Angular-Anwendung (**/hotelmanager_frontend**)
Die Frontend-Anwendung verwendet Angular. Bestätigen Sie zunächst, dass Sie sich im Verzeichnis hotelmanager_frontend befinden. Zum Installieren von Abhängigkeiten und Erstellen des Projekts für die Produktion führen Sie aus:

```bash
npm install
ng build --configuration production
```

Dies generiert das Verzeichnis dist/, das im Docker-Container verwendet wird.

### Docker und Docker Compose
Beide Projekte enthalten individuelle Dockerfiles zur Containerisierung. Ein docker-compose.yml-File im Wurzelverzeichnis des Projekts vereinfacht das Starten des gesamten Anwendungsstapels. Verwenden Sie den folgenden Befehl, um die Container im getrennten Modus zu bauen und zu starten:

```bash
docker-compose up --build -d
```

### Zugriff auf die Anwendung
Nach dem Starten der Spring Boot- und Angular-Anwendungen, entweder durch manuelles Starten oder über Docker Compose, können Sie auf die Anwendungen wie folgt zugreifen:

Frontend-Anwendung:

Beim lokalen Start mit `ng serve`: `http://localhost:4200`
Wenn im Docker-Container ausgeführt: `http://localhost:8085`
Backend-API: Direkter Zugriff unter `http://localhost:8080`
Adminer (Es bietet eine webbasierte Oberfläche zur Verwaltung Ihrer Datenbanken): `http://localhost:8081`
- System - Postgres
- Server - postgres
- user - testuser
- password - secret
- database - hotelmanager_db
