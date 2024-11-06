export default function Footer() {
  return (
    <div className="conter-footer">
      <footer class="bg-[#f2eded] py-12 px-10 font-sans tracking-wide">
        <div class="lg:max-w-[50%] mx-auto text-center">
          <h3 class="text-3xl font-bold text-gray-800">La Tienda</h3>
          <p class="text-sm mt-6 text-gray-500">
            Suscríbete a nuestro boletín informativo y mantente al día con las
            últimas novedades, actualizaciones y ofertas exclusivas. Obtén
            información valiosa. ¡Únete a nuestra comunidad hoy mismo!
          </p>

          <div class="bg-[#dddddd] flex px-2 py-1.5 rounded-full text-left mt-10">
            <input
              type="email"
              placeholder="Comunicarse vía WhatsApp"
              class="w-full outline-none bg-transparent text-sm pl-4"
            />
            <a
              href="https://api.whatsapp.com/send/?phone=3102055841&text&type=phone_number&app_absent=0"
              class="bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-full px-5 py-2.5 ml-4 transition-all"
            >
              Comunicar
            </a>
          </div>
        </div>

        <hr class="border-gray-300 my-12" />

        <div class="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 class="text-lg font-bold mb-6 text-gray-800">ASUPRO</h4>
            <p class="text-gray-500 mb-2 text-sm">
              Las Tiendas ASUPRO COLOMBIA proporcionan a todos sus clientes una
              amplia variedad de opciones, ofreciendo comodidad y acceso las 24
              horas día, para seleccionar sus productos y servicios.
            </p>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6 text-gray-800">Servicios</h4>
            <ul class="space-y-4">
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-gray-500 hover:text-gray-800 text-[15px]"
                >
                  Venta de alimetos & Mas.
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6 text-gray-800">Donde estamos</h4>
            <ul class="space-y-4">
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-gray-500 hover:text-gray-800 text-[15px]"
                >
                  <i className="fa fa-home mr-2" aria-hidden="true" />
                  Pitalito huila
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6 text-gray-800">About Us</h4>
            <ul class="space-y-4">
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-gray-500 hover:text-gray-800 text-[15px]"
                >
                  <i className="fa fa-envelope mr-2" aria-hidden="true" />
                  asupro@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-gray-500 hover:text-gray-800 text-[15px]"
                >
                  <i className="fa fa-mobile mr-2" aria-hidden="true" />
                  +57 310 2055841
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
