class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
          .hero {
            position: relative;
            width: 100%;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            overflow: hidden;
            z-index: 1;
          }

          .hero picture img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1; /* Supaya gambar berada di belakang konten */
          }

          .hero-content {
            position: relative;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
            color: white;
          }

          h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }

          p {
            font-size: 1.2rem;
          }

          @media screen and (max-width: 700px) {
            .hero {
              height: 200px;
            }

            h2 {
              font-size: 1.5rem;
            }

            p {
              font-size: 1rem;
              padding: 0 10px;
            }

            .hero-content {
              padding: 10px;
            }
          }
        </style>

        <div class="hero">
          <picture>
            <source media="(max-width: 700px)" srcset="./images/heros/hero-image_2-small.jpg" type="image/jpeg">

            <img src="./images/heros/hero-image_2-large.jpg" alt="Hero Image">
          </picture>
          <div class="hero-content">
            <h2>Temukan restoran favoritmu di Amba Food</h2>
            <p>Amba Food merupakan situs penyedia restoran dengan kualitas terbaik yang mungkin ada disekitar anda</p>
          </div>
        </div>
      `;
  }
}

customElements.define('hero-section', HeroSection);
