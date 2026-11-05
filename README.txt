DROWSYGUARD MOBILE — PWA OFFLINE PROTOTYPE

FILES
- index.html: app interface and on-device Face Landmarker logic
- sw.js: service worker caches app shell and successful model/library/WASM requests
- manifest.webmanifest and icons: installable PWA metadata

FIRST INSTALL / FIRST RUN
1. Host this folder on an HTTPS static host (or localhost). PWA service workers do not work from file://.
2. Open index.html in current Chrome Android while online.
3. First load: allow service worker to install, then reload once if prompted.
4. Press "Aktifkan kamera & sistem" and allow camera.
5. Wait until model state says "Siap / tersimpan". Keep the app open until model loads.
6. Test offline: close app, enable airplane mode, reopen installed PWA. Verify camera and detection still work.

IMPORTANT LIMITATIONS
- Initial download requires internet; after the library, WASM and model have been successfully fetched while the service worker controls the page, requests are cached for offline use.
- Browser PWA cannot force Android media/alarm volume to maximum or guarantee alarm playback/vibration if the OS suspends the app, the screen is locked, or battery optimization stops it. Keep the screen awake, app in foreground, and media volume high.
- Camera access and service workers require HTTPS or localhost.
- PERCLOS alert waits for a minimum sample history (about 24 seconds at the current sampling interval); thresholds are prototype defaults and require calibration/validation. This is not a certified driver safety device.
