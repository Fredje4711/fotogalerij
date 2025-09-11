document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('lightgallery');

    // Controleer eerst of de 'photoGalleryData' array (uit gallery-data.js) bestaat
    // en of de 'galleryContainer' (de div met id="lightgallery") in de HTML aanwezig is.
    if (typeof photoGalleryData !== 'undefined' && galleryContainer) {

        // Maak de container leeg (voor als er nog statische HTML-items stonden).
        galleryContainer.innerHTML = '';

        // Loop door elk foto-object in de 'photoGalleryData' array
        photoGalleryData.forEach(photo => {
            // Bouw de data-sub-html string.
            let subHtmlContent = `<h4>${photo.title}</h4>`;
            if (photo.description && photo.description.trim() !== "") {
                subHtmlContent += `<p>${photo.description}</p>`;
            }

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
            galleryContainer.insertAdjacentHTML('beforeend', galleryItemHTML);
        });

        // Initialiseer LightGallery
        lightGallery(galleryContainer, {
            plugins: [lgZoom, lgThumbnail],
            selector: '.gallery-item',
            speed: 500,
            download: true,
            getCaptionFromTitleOrAlt: false,
            controls: false,
            mobileSettings: {
                controls: true,
                showCloseIcon: true,
                download: true
            }
        });

    } else {
        // Foutmeldingen
        if (typeof photoGalleryData === 'undefined') {
            console.error("FOUT: De 'photoGalleryData' array is niet gevonden. Zorg ervoor dat 'gallery-data.js' correct is geladen vóór dit script.");
        }
        if (!galleryContainer) {
            console.error("FOUT: De HTML container voor de galerij (div met id='lightgallery') is niet gevonden in je index.html.");
        }
    }

    // Forceer hertekening layout na korte tijd
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 200);
});
