export default function Header() {
  return (
    <div class="bg-gradient-to-r from-blue-900 to-blue-900 font-[sans-serif]">
      <div class="relative overflow-hidden">
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div class="relative z-10 text-center lg:text-left">
            <h1 class="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl">
              Tienda
              <br class="xl:hidden" />
              <span class="text-orange-600"> La Tienda</span>
            </h1>
            <p class="max-w-md mx-auto text-lg text-white sm:text-xl mt-4 md:mt-6 md:max-w-3xl animate__animated animate__pulse animate__infinite">
              Las Tiendas <strong>La Tienda</strong> proporcionan a todos sus
              clientes una amplia variedad de opciones, ofreciendo comodidad y
              acceso las 24 horas día, para seleccionar sus productos y
              servicios.
            </p>

            <div class="mt-12 flex max-sm:flex-col sm:justify-center lg:justify-start gap-4">
              <div class="rounded-md shadow">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base tracking-wide rounded-md text-orange-600 bg-white hover:text-orange-500 transition duration-150 ease-in-out">
                  Get Started
                </button>
              </div>
              <div>
                <button class="w-full flex items-center justify-center px-8 py-3 text-base tracking-wide rounded-md text-white bg-orange-500 hover:bg-orange-400 transition duration-150 ease-in-out">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full img-bg"
            src="https://img.freepik.com/fotos-premium/exhibicion-verduras-frutas-tienda_902846-5856.jpg"
            alt="Delicious Food"
          />
        </div>
      </div>
    </div>
  );
}

/**
    <div className="text-home head-home-asupro">
        <a className="searchPro top-50" href="/">
          <p>TIENDA</p>
          <label>ASUPRO</label>
        </a>
        <div className="margin-90">
          <h4 className="color-naranja animate__animated animate__pulse animate__infinite top-20">
            Las Tiendas <strong>ASUPRO COLOMBIA</strong> proporcionan a todos
            sus clientes una amplia variedad de opciones, ofreciendo comodidad y
            acceso las 24 horas día, para seleccionar sus productos y servicios.
          </h4>
        </div>
      </div>
 */
