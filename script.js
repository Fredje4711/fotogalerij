document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('lightgallery');
    if (galleryContainer) {
        lightGallery(galleryContainer, {
            plugins: [lgZoom, lgThumbnail], // Activeer plugins
            selector: '.gallery-item',      // Zegt lightgallery welke items te gebruiken
            speed: 500,                     // Animatie snelheid
            download: true,                 // Toon download knop in lightbox toolbar
            getCaptionFromTitleOrAlt: false,// We gebruiken data-sub-html
            // enableSwipe: true, (standaard aan)
            // enableDrag: true, (standaard aan)
            // mode: 'lg-fade', // Bijv. 'lg-slide', 'lg-fade', 'lg-zoom-in-out'
            // mobileSettings: { // Specifieke instellingen voor mobiel indien nodig
            //    controls: true,
            //    showCloseIcon: true,
            //    download: true
            // }
            // ...meer opties zie documentatie: https://www.lightgalleryjs.com/docs/settings/
        });
    } else {
        console.error("Lightgallery container niet gevonden!");
    }

    // Optioneel: als je wilt dat klikken op de download overlay OOK downloadt
    // (dit is een beetje een hack en de lightgallery downloadknop is beter)
    // Dit is NIET de aanbevolen methode als je al de lightgallery download knop hebt.
    /*
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const downloadOverlay = item.querySelector('.download-overlay');
        if (downloadOverlay) {
            downloadOverlay.addEventListener('click', (event) => {
                event.preventDefault(); // Voorkom dat lightbox opent
                event.stopPropagation(); // Voorkom verdere bubbling

                const fullImageSrc = item.getAttribute('href');
                const fileName = fullImageSrc.split('/').pop(); // Haal bestandsnaam uit URL

                const link = document.createElement('a');
                link.href = fullImageSrc;
                link.download = fileName || 'download.jpg'; // Gebruik bestandsnaam of 'download.jpg'
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    });
    */
});