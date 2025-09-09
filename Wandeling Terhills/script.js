// script.js
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('lightgallery');

    // Controleer eerst of de 'photoGalleryData' array (uit gallery-data.js) bestaat
    // en of de 'galleryContainer' (de div met id="lightgallery") in de HTML aanwezig is.
    if (typeof photoGalleryData !== 'undefined' && galleryContainer) {

        // Optioneel: Maak de container leeg voor het geval er (per ongeluk)
        // nog oude statische HTML-items in stonden.
        galleryContainer.innerHTML = '';

        // Loop door elk foto-object in de 'photoGalleryData' array
        photoGalleryData.forEach(photo => {
            // Bouw de 'data-sub-html' string.
            // De paragraaf <p> wordt alleen toegevoegd als photo.description een waarde heeft.
            let subHtmlContent = `<h4>${photo.title}</h4>`;
            if (photo.description && photo.description.trim() !== "") {
                subHtmlContent += `<p>${photo.description}</p>`;
            }

            // Bouw de HTML voor één galerij-item.
            // Let op het gebruik van template literals (backticks ``) voor makkelijke string interpolatie.
            // Dubbele aanhalingstekens binnen de subHtmlContent worden vervangen door "
            // om problemen met het data-sub-html attribuut te voorkomen.
            const galleryItemHTML = `
                <a class="gallery-item"
                   href="${photo.full}"
                   data-sub-html="${subHtmlContent.replace(/"/g, '"')}">
                    <img src="${photo.thumb}" alt="${photo.alt}" loading="lazy">
                    <div class="download-overlay">
                        <span class="download-icon">⬇</span>
                    </div>
                </a>
            `;
            // Voeg het zojuist gemaakte HTML-item toe aan het einde van de galleryContainer.
            galleryContainer.insertAdjacentHTML('beforeend', galleryItemHTML);
        });

        // NU alle HTML-items zijn toegevoegd aan de DOM, initialiseren we Lightgallery.
        lightGallery(galleryContainer, {
            plugins: [lgZoom, lgThumbnail], // Zorg dat lgZoom en lgThumbnail globaal beschikbaar zijn
                                            // (geladen via <script> tags in index.html)
            selector: '.gallery-item',      // Lightgallery zoekt naar elementen met deze class
            speed: 500,                     // Animatie snelheid
            download: true,                 // Toon download knop in lightbox toolbar
            getCaptionFromTitleOrAlt: false,// We gebruiken onze eigen data-sub-html
            controls: false,                 // Toon desktop navigatiepijlen (links/rechts naast foto).
                                            // Zet op false als je ze ook op desktop weg wilt (media query in CSS regelt mobiel).
            mobileSettings: {
               controls: true,              // Toon de toolbar bovenaan op mobiel
               showCloseIcon: true,         // Toon het sluitkruisje op mobiel
               download: true               // Toon de downloadknop op mobiel
            }
            // Voeg hier eventuele andere Lightgallery configuratieopties toe die je had of wilt.
        });

    } else {
        // Foutmeldingen voor als er iets essentieels mist.
        if (typeof photoGalleryData === 'undefined') {
            console.error("FOUT: De 'photoGalleryData' array is niet gevonden. Zorg ervoor dat 'gallery-data.js' correct is geladen vóór dit script, of dat de data array correct is gedefinieerd.");
        }
        if (!galleryContainer) {
            console.error("FOUT: De HTML container voor de galerij (een div met id='lightgallery') is niet gevonden in je index.html.");
        }
    }
	setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
}, 200);

});